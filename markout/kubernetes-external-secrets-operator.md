---
content: "I wanted to put a short demo together of using External Secrets Operator
  (ESO)\nto expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager,
  etc)\nto services running in kubernetes\n\nDemo code is [here in this github repo](https://github.com/pypeaday/blog-kubernetes-external-secrets-operator-demo)\n\nThis
  post is a high level overview of the components, see the repo for the full example.\n\n##
  Setup\n\n- [[docker]] for containerized development\n- [[kind]] for setting up a
  quick cluster\n- [[kubectl]] for accessing the cluster\n- [[helm]] for installing
  ArgoCD and ESO\n\n- and then [justfile](https://github.com/casey/just) is there
  to wrap the commands to easier execution\n\n## Step 0 - Vault\n\n- for the demo
  we'll setup Hashicorp Vault in docker compose to easily bring it\n  up and down\n-
  and the init-script is in the repo - it uses curl to make some secrets in\n  vault
  that we'll reference later\n\n```yml\nservices:\n  vault:\n    image: hashicorp/vault:1.18\n
  \   container_name: vault\n    ports:\n      - \"58200:8200\n    environment:\n
  \     VAULT_DEV_ROOT_TOKEN_ID: root\n      VAULT_DEV_LISTEN_ADDRESS: 0.0.0.0:8200\n
  \   volumes:\n      - vault-data:/vault/file\n    cap_add:\n      - IPC_LOCK\n    command:
  server -dev -dev-root-token-id=root\n\nvolumes:\n  vault-data:\n```\n\n- bringing
  up the vault instance is a simple `docker compose up` (use the just recipes which
  some `curl` commands for checking status etc.)\n\n```bash\ncurl -s http://localhost:58200/v1/sys/health
  | jq .  # or just vault-status\n{\n  \"initialized\": true,\n  \"sealed\": false,\n
  \ \"standby\": false,\n  \"performance_standby\": false,\n  \"replication_performance_mode\":
  \"disabled\",\n  \"replication_dr_mode\": \"disabled\",\n  \"server_time_utc\":
  1770893657,\n  \"version\": \"1.18.5\",\n  \"enterprise\": false,\n  \"cluster_name\":
  \"vault-cluster-acfb9930\",\n  \"cluster_id\": \"4d9162f4-e501-371b-7f94-bd60052b40a3\",\n
  \ \"echo_duration_ms\": 0,\n  \"clock_skew_ms\": 0,\n  \"replication_primary_canary_age_ms\":
  0\n}\n```\n\n## Step 1 - App\n\n- We need an app that requires secrets\n- app code
  in repo, essentially it's a python webserver to show the vault\n  values (obviously
  this would expose real secrets so it's just a demo)\n- Below is one of the endpoints
  in the vibe-coded app, just to illustrate that\n  we're going to give secrets to
  the app as environment variables (or as mounted\n  files!)\n- In the repo, the app
  is included and there's a `just build` which builds the docker image\n- There is
  also `just deploy` which handles loading the image into `kind`'s image cache\n\n```py\n\n#
  example route from demo-app - see git repo\n@app.get(\"/env\", response_class=HTMLResponse)\ndef
  show_env():\n    # ESO brings Vault secrets into environment variables\n    env_vars
  = dict(os.environ)\n\n    # Sort by category, then by key\n    sorted_items = sorted(env_vars.items(),
  key=lambda x: (classify_env(x[0]), x[0]))\n\n    cards = \"\".join(create_card(k,
  v) for k, v in sorted_items)\n\n    secret_count = sum(1 for k in env_vars if k
  in SECRET_KEYS)\n    config_count = sum(1 for k in env_vars if k in CONFIG_KEYS)\n
  \   system_count = len(env_vars) - secret_count - config_count\n\n    html = HTML_TEMPLATE.format(\n
  \       cards=cards,\n        secret_count=secret_count,\n        config_count=config_count,\n
  \       system_count=system_count,\n    )\n\n    return HTMLResponse(content=html)\n\ndef
  read_mounted_files(directory: str) -> dict:\n    \"\"\"Read all files from a mounted
  directory.\"\"\"\n    files_data = {}\n    if os.path.exists(directory) and os.path.isdir(directory):\n
  \       for filename in os.listdir(directory):\n            filepath = os.path.join(directory,
  filename)\n            if os.path.isfile(filepath):\n                try:\n                    with
  open(filepath, \"r\") as f:\n                        files_data[filename] = f.read().strip()\n
  \               except Exception as e:\n                    files_data[filename]
  = f\"<Error reading file: {e}>\"\n    return files_data\n\n```\n\n## Step 2 - Cluster\n\n-
  use `kind` to bring up a cluster\n- this will start a few docker containers to act
  as your control-plane and workers\n\n```yml\n# kind-config.yml\nkind: Cluster\napiVersion:
  kind.x-k8s.io/v1alpha4\nname: eso-demo\nnodes:\n  - role: control-plane\n    extraPortMappings:\n
  \     - containerPort: 30080\n        hostPort: 58080\n        protocol: TCP\n  -
  role: worker\n```\n\n```\nkind create cluster --config kind-config.yaml --name eso-demo\n```\n\n##
  Step 3 - External Secrets Operator\n\n- installed with [[helm]] from the official
  helm chart\n- NOTE: this is the Operator, not the secrets... this is the thing which
  goes\n  to the secrets backend and creates kubernetes secrets\n\n```\nhelm repo
  add external-secrets https://charts.external-secrets.io 2>/dev/null || true\nhelm
  repo update\nhelm install external-secrets external-secrets/external-secrets \\\n
  \ --namespace external-secrets \\\n  --create-namespace \\\n  --wait\n```\n\nIn
  the repo this is mostly `just eso-install`\n\n## Step 3.5 - Secretstore\n\n- You
  need a `clustersecretstore` to be the place that ESO puts secrets\n\n```\napiVersion:
  external-secrets.io/v1\nkind: ClusterSecretStore\nmetadata:\n  name: vault-backend\nspec:\n
  \ provider:\n    vault:\n      server: \"http://10.10.0.1:58200\"\n      path: \"secret\"\n
  \     version: \"v2\"\n      auth:\n        tokenSecretRef:\n          name: vault-token\n
  \         key: token\n          namespace: external-secrets\n\n```\n\n## Step 4
  - Secrets\n\n- Secrets go in the `clustersecretstore`\n  - in this example it's
  called 'vault-backend'\n- In the demo we can just `kubectl apply -f <manifest>`
  to deploy the secret to\n  the cluster\n- In practice this should be handled by
  something more mature than raw-doggin\n  kubectl commands\n\n```yml\n# manifests/external-secrets.yml\n---\napiVersion:
  external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n  name: demo-app-secrets\n
  \ namespace: default\nspec:\n  refreshInterval: \"10s\"\n  secretStoreRef:\n    kind:
  ClusterSecretStore\n    name: vault-backend\n  target:\n    name: demo-app-secrets\n
  \   creationPolicy: Owner\n  data:\n    - secretKey: DATABASE_PASSWORD\n      remoteRef:\n
  \       key: secret/data/demo-app/secrets\n        property: database_password\n
  \   - secretKey: API_KEY\n      remoteRef:\n        key: secret/data/demo-app/secrets\n
  \       property: api_key\n```\n\n## Step 4.1 - Files\n\n- ESO supports mounting
  files to containers as well through special `ExternalSecret` resources\n- One of
  the example seecrets is a TLS certificate\n\n```yml\n# manifests/external-secrets-files.yml\n---\n#
  File-based ExternalSecret for TLS certificates\n# These will be mounted as files
  in /etc/secrets/\napiVersion: external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n
  \ name: demo-app-tls-files\n  namespace: default\nspec:\n  refreshInterval: \"10s\"\n
  \ secretStoreRef:\n    kind: ClusterSecretStore\n    name: vault-backend\n  target:\n
  \   name: demo-app-tls-files\n    creationPolicy: Owner\n    # Template to ensure
  proper file formatting\n    template:\n      type: Opaque\n      data:\n        tls.crt:
  \"{{ .tls_crt }}\"\n        tls.key: \"{{ .tls_key }}\"\n  data:\n    - secretKey:
  tls_crt\n      remoteRef:\n        key: secret/data/demo-app/tls-files\n        property:
  tls.crt\n    - secretKey: tls_key\n      remoteRef:\n        key: secret/data/demo-app/tls-files\n
  \       property: tls.key\n```\n\n- Notice how there's a `spec.target.template`
  which templates out the file\n  contents from the secret contents\n\n## Step 5 -
  Helm Chart\n\n- This isn't about setting up a helm chart so I'm not going to explain
  a lot\n  but the working example is simple, not secure, and in the repo\n- The helm
  chart renders manifests - I've paired one down and added comments to\n  the relevant
  things\n- The thing to just take note of is the reference of the secrets in the
  `envFrom` section\n\n```yml\n# deployment.yml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n
  \ annotations:\n    meta.helm.sh/release-name: demo-app\n    meta.helm.sh/release-namespace:
  default\n  name: demo-app\n  namespace: default\nspec:\n  replicas: 1\n  template:\n
  \   metadata:\n      labels:\n        app.kubernetes.io/instance: demo-app\n        app.kubernetes.io/name:
  demo-app\n    spec:\n      containers:\n        - envFrom:\n            - secretRef:\n
  \               name: demo-app-secrets # name of example secret from section 4\n
  \           - secretRef:\n                name: demo-app-config # another example
  in the repo\n          image: demo-app:latest # the image you built and loaded into
  kind - simple 'just' recipe in the repo\n          imagePullPolicy: Never\n          name:
  demo-app\n          volumeMounts:\n            - mountPath: /etc/secrets\n              name:
  secrets-volume\n              readOnly: true\n            - mountPath: /etc/config\n
  \             name: configs-volume\n              readOnly: true\n      volumes:\n
  \       - name: secrets-volume\n          secret:\n            defaultMode: 420\n
  \           secretName: demo-app-tls-files # example secret file from section 4.1\n
  \       - name: configs-volume\n          secret:\n            defaultMode: 420\n
  \           secretName: demo-app-config-files\n```\n\n## Step 5.1 - Deploy\n\n-
  We can deploy the demo-app from the git repo to the cluster\n- For a local demo
  a few things happen\n  - local image build\n  - loading that image into [[kind]]
  (`kind` doesn't have access to your host's docker image cache, so images need to
  be loaded into the cluster cache)\n- `just deploy` takes care of this for you, read
  the recipe in the repo if\n  you're interested in more there, the focus of this
  post and example are to\n  briefly show how to use ESO though\n\n## Step 6 - Profit\n\nThe
  example app just displays things that are mounted in - totally vibe-coded\nto illustrate
  the secrets mounting, not the appropriate way to leak secrets.\n\n![20260210233804_614254b7.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233804_614254b7.png)\n\n![20260210233828_19852225.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233828_19852225.png)"
date: 2026-02-10
description: 'I wanted to put a short demo together of using External Secrets Operator
  (ESO)

  to expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager, etc)

  t'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Kubernetes External
    Secrets Operator</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I wanted to put a short demo together of using External Secrets Operator
    (ESO)\nto expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager,
    etc)\nt\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Kubernetes External Secrets Operator | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/kubernetes-external-secrets-operator\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Kubernetes External Secrets Operator | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I wanted to put a short demo together of using External Secrets Operator
    (ESO)\nto expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager,
    etc)\nt\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"terminal-page\">\n
    \   <main class=\"terminal-page__main\">\n        <div class=\"terminal-page__content\">\n<header
    class=\"site-terminal\">\n\n    <div class=\"site-terminal__bar\">\n        <div
    class=\"site-terminal__lights\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n
    \       <div class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/kubernetes-external-secrets-operator</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <div class=\"post-terminal__search\">\n<div id='didyoumean'>\n    <div class=\"mb-0\">\n
    \       <!-- <label for=\"search\" class=\"block text-sm font-medium mb-2\">Search
    for a page</label> -->\n        <input type=\"text\" id=\"search\"\n               class=\"w-full
    px-4 py-2 bg-transparent border-b-2 border-terminal-border text-terminal-text
    placeholder-terminal-text/40 focus:outline-none focus:border-terminal-accent transition-colors\"\n
    \              placeholder=\"'/' search...\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\"
    class=\"grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
    class='grid gap-4'>\n        <!-- Results will be populated here -->\n    </ul>\n</div>\n<script
    type='module'>\n// All available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
    filter=config.didyoumean_filter, sort='True')|tojson;\n    // fetch pages from
    config.output_dir / didyoumean.json\n\n    const pages = await fetch('/didyoumean.json').then(response
    => response.json());\n    const populate_search_input = false\n    const search_hotkey
    = \"/\"\n\n// Get current path from URL, removing leading/trailing slashes\n    if
    (populate_search_input) {\n        const currentPath = window.location.pathname.replace(/^\\/|\\/$/g,
    '');\n        document.getElementById('search').value = currentPath;\n    }\n\n//
    Search across all fields in an object\n    function searchObject(needle, obj)
    {\n        needle = needle.toLowerCase();\n        let score = 0;\n\n    // Helper
    to search a single field\n        const searchField = (value) => {\n            if
    (!value) return 0;\n            value = String(value).toLowerCase();\n\n            //
    Exact matches\n            if (value === needle) return 15;\n\n            //
    Word boundary matches (complete words)\n            if (value.match(new RegExp(`\\\\b${needle}\\\\b`)))
    return 10;\n\n            // Contains full search term\n            if (value.includes(needle))
    return 8;\n\n            // Most parts match (for multi-word searches)\n            const
    needleParts = needle.split(/\\W+/).filter(p => p.length > 2);\n            const
    valueParts = value.split(/\\W+/).filter(p => p.length > 2);\n\n            if
    (needleParts.length === 0) return 0;\n\n            let matchCount = 0;\n            for
    (const part of needleParts) {\n                for (const valuePart of valueParts)
    {\n                    if (valuePart.includes(part) || part.includes(valuePart))
    {\n                        matchCount++;\n                        break;\n                    }\n
    \               }\n            }\n\n            // Only count if most parts match\n
    \           const matchRatio = matchCount / needleParts.length;\n            if
    (matchRatio >= 0.75) {\n                return matchRatio * 6;\n            }\n\n
    \           return 0;\n        };\n\n    // Search each field with different weights\n
    \       const slugScore = searchField(obj.slug) * 3;  // Slug is most important\n
    \       const titleScore = searchField(obj.title) * 2;  // Title is next\n        const
    descScore = searchField(obj.description) * 1;  // Description\n        const tagScore
    = (obj.tags || []).reduce((sum, tag) => sum + searchField(tag), 0);  // Tags\n\n
    \       score = slugScore + titleScore + descScore + tagScore;\n\n    // Path
    segment matches for slug (only if we have some other match)\n        if (score
    > 0 && obj.slug) {\n            const inputParts = needle.split('/').filter(p
    => p.length > 0);\n            const slugParts = obj.slug.toLowerCase().split('/');\n\n
    \           // Bonus for matching path structure\n            for (let i = 0;
    i < inputParts.length && i < slugParts.length; i++) {\n                if (slugParts[i].includes(inputParts[i]))
    {\n                    score += 5;  // Matching segments in order is valuable\n
    \               }\n            }\n        }\n\n        return score;\n    }\n\n//
    Find similar pages\n    function findSimilar(input) {\n        if (!input || input.length
    < 2) return [];\n        const normalizedInput = input.toLowerCase().trim();\n\n
    \   // Score each page\n        const scored = pages.map(page => ({\n            ...page,\n
    \           score: searchObject(normalizedInput, page)\n        }));\n\n    //
    Sort by score (higher is better) and take top matches\n        return scored\n
    \           .sort((a, b) => b.score - a.score)\n            .slice(0, 12)  //
    Show more results in the grid\n            .filter(item => item.score > 15); //
    Only show strong matches\n    }\n\n// Update results in the DOM\n    function
    updateResults(results) {\n        const resultsDiv = document.getElementById('didyoumean_results');\n\n
    \       if (results.length === 0) {\n            resultsDiv.innerHTML = '<p class=\"text-gray-500
    col-span-full text-center py-8\">No similar pages found.</p>';\n            return;\n
    \       }\n\n        const html = results.map(page => `\n        <li class=\"p-4
    bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow first:mt-4\">\n
    \           <a href=\"/${page.slug}\" class=\"block\">\n                <h3 class=\"text-lg
    font-semibold text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300
    mb-2\">\n                    ${page.title || page.slug}\n                </h3>\n
    \               ${page.description ? `\n            <p class=\"text-sm text-gray-600
    dark:text-gray-300 mb-3 line-clamp-2\">\n            ${page.description}\n            </p>\n
    \           ` : ''}\n                <div class=\"flex flex-wrap gap-2 text-xs
    text-gray-500 dark:text-gray-400\">\n                </div>\n                ${page.tags
    && page.tags.length > 0 ? `\n            <div class=\"mt-3 flex flex-wrap gap-2\">\n
    \           ${page.tags.map(tag => `\n                            <span class=\"px-2
    py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs\">\n                                ${tag}\n
    \                           </span>\n                        `).join('')}\n            </div>\n
    \           ` : ''}\n            </a>\n        </li>\n    `).join('');\n\n        resultsDiv.innerHTML
    = html;\n    }\n\n// Set up hotkey for search if configured\n    if (search_hotkey)
    {\n        document.addEventListener('keydown', (e) => {\n            // Don't
    trigger if user is typing in an input or textarea\n            if (e.target.tagName
    === 'INPUT' || e.target.tagName === 'TEXTAREA') {\n                return;\n            }\n\n
    \           // Check if the pressed key matches the hotkey\n            if (e.key
    === search_hotkey) {\n                e.preventDefault();  // Prevent the '/'
    from being typed\n                const searchInput = document.getElementById('search');\n
    \               searchInput.focus();\n                searchInput.select();  //
    Select any existing text\n            }\n        });\n    }\n\n// Set up search
    input handler with debounce\n    let debounceTimeout;\n    const searchInput =
    document.getElementById('search');\n    searchInput.addEventListener('input',
    (e) => {\n        clearTimeout(debounceTimeout);\n        debounceTimeout = setTimeout(()
    => {\n            const results = findSimilar(e.target.value);\n            updateResults(results);\n
    \       }, 100);\n    });\n\n// Initial search with current path\n    if (populate_search_input)
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    </div>\n<section
    class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n        <div
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\"
    alt=\"Kubernetes External Secrets Operator cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Kubernetes
    External Secrets Operator</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2026-02-10\">\n            February 10, 2026\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/devops/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #devops\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I wanted to put a short demo together
    of using External Secrets Operator (ESO)\nto expose secrets from a vault (like
    Hashicorp Vault, AWS Secrets Manager, etc)\nto services running in kubernetes</p>\n<p>Demo
    code is <a href=\"https://github.com/pypeaday/blog-kubernetes-external-secrets-operator-demo\">here
    in this github repo</a></p>\n<p>This post is a high level overview of the components,
    see the repo for the full example.</p>\n<h2 id=\"setup\">Setup <a class=\"header-anchor\"
    href=\"#setup\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
    focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>\n<p><a class=\"wikilink\"
    href=\"/docker\">docker</a> for containerized development</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/kind\">kind</a> for setting up a quick cluster</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/kubectl\">kubectl</a> for accessing the cluster</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/helm\">helm</a> for installing ArgoCD and ESO</p>\n</li>\n<li>\n<p>and
    then <a href=\"https://github.com/casey/just\">justfile</a> is there to wrap the
    commands to easier execution</p>\n</li>\n</ul>\n<h2 id=\"step-0---vault\">Step
    0 - Vault <a class=\"header-anchor\" href=\"#step-0---vault\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>for the demo
    we'll setup Hashicorp Vault in docker compose to easily bring it\nup and down</li>\n<li>and
    the init-script is in the repo - it uses curl to make some secrets in\nvault that
    we'll reference later</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>services:\n  vault:\n    image:
    hashicorp/vault:1.18\n    container_name: vault\n    ports:\n      - &quot;58200:8200\n
    \   environment:\n      VAULT_DEV_ROOT_TOKEN_ID: root\n      VAULT_DEV_LISTEN_ADDRESS:
    0.0.0.0:8200\n    volumes:\n      - vault-data:/vault/file\n    cap_add:\n      -
    IPC_LOCK\n    command: server -dev -dev-root-token-id=root\n\nvolumes:\n  vault-data:\n</pre></div>\n\n</pre>\n\n<ul>\n<li>bringing
    up the vault instance is a simple <code>docker compose up</code> (use the just
    recipes which some <code>curl</code> commands for checking status etc.)</li>\n</ul>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>curl<span class=\"w\"> </span>-s<span
    class=\"w\"> </span>http://localhost:58200/v1/sys/health<span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>.<span
    class=\"w\">  </span><span class=\"c1\"># or just vault-status</span>\n<span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;initialized&quot;</span>:<span class=\"w\">
    </span>true,\n<span class=\"w\">  </span><span class=\"s2\">&quot;sealed&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;standby&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;performance_standby&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;replication_performance_mode&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;disabled&quot;</span>,\n<span class=\"w\">
    \ </span><span class=\"s2\">&quot;replication_dr_mode&quot;</span>:<span class=\"w\">
    </span><span class=\"s2\">&quot;disabled&quot;</span>,\n<span class=\"w\">  </span><span
    class=\"s2\">&quot;server_time_utc&quot;</span>:<span class=\"w\"> </span><span
    class=\"m\">1770893657</span>,\n<span class=\"w\">  </span><span class=\"s2\">&quot;version&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;1.18.5&quot;</span>,\n<span class=\"w\">
    \ </span><span class=\"s2\">&quot;enterprise&quot;</span>:<span class=\"w\"> </span>false,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;cluster_name&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;vault-cluster-acfb9930&quot;</span>,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;cluster_id&quot;</span>:<span class=\"w\">
    </span><span class=\"s2\">&quot;4d9162f4-e501-371b-7f94-bd60052b40a3&quot;</span>,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;echo_duration_ms&quot;</span>:<span
    class=\"w\"> </span><span class=\"m\">0</span>,\n<span class=\"w\">  </span><span
    class=\"s2\">&quot;clock_skew_ms&quot;</span>:<span class=\"w\"> </span><span
    class=\"m\">0</span>,\n<span class=\"w\">  </span><span class=\"s2\">&quot;replication_primary_canary_age_ms&quot;</span>:<span
    class=\"w\"> </span><span class=\"m\">0</span>\n<span class=\"o\">}</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-1---app\">Step 1 - App <a class=\"header-anchor\" href=\"#step-1---app\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>We need an app
    that requires secrets</li>\n<li>app code in repo, essentially it's a python webserver
    to show the vault\nvalues (obviously this would expose real secrets so it's just
    a demo)</li>\n<li>Below is one of the endpoints in the vibe-coded app, just to
    illustrate that\nwe're going to give secrets to the app as environment variables
    (or as mounted\nfiles!)</li>\n<li>In the repo, the app is included and there's
    a <code>just build</code> which builds the docker image</li>\n<li>There is also
    <code>just deploy</code> which handles loading the image into <code>kind</code>'s
    image cache</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># example
    route from demo-app - see git repo</span>\n<span class=\"nd\">@app</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;/env&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_class</span><span
    class=\"o\">=</span><span class=\"n\">HTMLResponse</span><span class=\"p\">)</span>\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">show_env</span><span
    class=\"p\">():</span>\n    <span class=\"c1\"># ESO brings Vault secrets into
    environment variables</span>\n    <span class=\"n\">env_vars</span> <span class=\"o\">=</span>
    <span class=\"nb\">dict</span><span class=\"p\">(</span><span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">environ</span><span class=\"p\">)</span>\n\n
    \   <span class=\"c1\"># Sort by category, then by key</span>\n    <span class=\"n\">sorted_items</span>
    <span class=\"o\">=</span> <span class=\"nb\">sorted</span><span class=\"p\">(</span><span
    class=\"n\">env_vars</span><span class=\"o\">.</span><span class=\"n\">items</span><span
    class=\"p\">(),</span> <span class=\"n\">key</span><span class=\"o\">=</span><span
    class=\"k\">lambda</span> <span class=\"n\">x</span><span class=\"p\">:</span>
    <span class=\"p\">(</span><span class=\"n\">classify_env</span><span class=\"p\">(</span><span
    class=\"n\">x</span><span class=\"p\">[</span><span class=\"mi\">0</span><span
    class=\"p\">]),</span> <span class=\"n\">x</span><span class=\"p\">[</span><span
    class=\"mi\">0</span><span class=\"p\">]))</span>\n\n    <span class=\"n\">cards</span>
    <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span><span class=\"o\">.</span><span
    class=\"n\">join</span><span class=\"p\">(</span><span class=\"n\">create_card</span><span
    class=\"p\">(</span><span class=\"n\">k</span><span class=\"p\">,</span> <span
    class=\"n\">v</span><span class=\"p\">)</span> <span class=\"k\">for</span> <span
    class=\"n\">k</span><span class=\"p\">,</span> <span class=\"n\">v</span> <span
    class=\"ow\">in</span> <span class=\"n\">sorted_items</span><span class=\"p\">)</span>\n\n
    \   <span class=\"n\">secret_count</span> <span class=\"o\">=</span> <span class=\"nb\">sum</span><span
    class=\"p\">(</span><span class=\"mi\">1</span> <span class=\"k\">for</span> <span
    class=\"n\">k</span> <span class=\"ow\">in</span> <span class=\"n\">env_vars</span>
    <span class=\"k\">if</span> <span class=\"n\">k</span> <span class=\"ow\">in</span>
    <span class=\"n\">SECRET_KEYS</span><span class=\"p\">)</span>\n    <span class=\"n\">config_count</span>
    <span class=\"o\">=</span> <span class=\"nb\">sum</span><span class=\"p\">(</span><span
    class=\"mi\">1</span> <span class=\"k\">for</span> <span class=\"n\">k</span>
    <span class=\"ow\">in</span> <span class=\"n\">env_vars</span> <span class=\"k\">if</span>
    <span class=\"n\">k</span> <span class=\"ow\">in</span> <span class=\"n\">CONFIG_KEYS</span><span
    class=\"p\">)</span>\n    <span class=\"n\">system_count</span> <span class=\"o\">=</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">env_vars</span><span
    class=\"p\">)</span> <span class=\"o\">-</span> <span class=\"n\">secret_count</span>
    <span class=\"o\">-</span> <span class=\"n\">config_count</span>\n\n    <span
    class=\"n\">html</span> <span class=\"o\">=</span> <span class=\"n\">HTML_TEMPLATE</span><span
    class=\"o\">.</span><span class=\"n\">format</span><span class=\"p\">(</span>\n
    \       <span class=\"n\">cards</span><span class=\"o\">=</span><span class=\"n\">cards</span><span
    class=\"p\">,</span>\n        <span class=\"n\">secret_count</span><span class=\"o\">=</span><span
    class=\"n\">secret_count</span><span class=\"p\">,</span>\n        <span class=\"n\">config_count</span><span
    class=\"o\">=</span><span class=\"n\">config_count</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">system_count</span><span class=\"o\">=</span><span class=\"n\">system_count</span><span
    class=\"p\">,</span>\n    <span class=\"p\">)</span>\n\n    <span class=\"k\">return</span>
    <span class=\"n\">HTMLResponse</span><span class=\"p\">(</span><span class=\"n\">content</span><span
    class=\"o\">=</span><span class=\"n\">html</span><span class=\"p\">)</span>\n\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">read_mounted_files</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">)</span> <span class=\"o\">-&gt;</span>
    <span class=\"nb\">dict</span><span class=\"p\">:</span>\n<span class=\"w\">    </span><span
    class=\"sd\">&quot;&quot;&quot;Read all files from a mounted directory.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">files_data</span> <span class=\"o\">=</span> <span class=\"p\">{}</span>\n
    \   <span class=\"k\">if</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">exists</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">)</span>
    <span class=\"ow\">and</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">isdir</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">):</span>\n
    \       <span class=\"k\">for</span> <span class=\"n\">filename</span> <span class=\"ow\">in</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">listdir</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">):</span>\n
    \           <span class=\"n\">filepath</span> <span class=\"o\">=</span> <span
    class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">path</span><span
    class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">directory</span><span class=\"p\">,</span> <span class=\"n\">filename</span><span
    class=\"p\">)</span>\n            <span class=\"k\">if</span> <span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">path</span><span class=\"o\">.</span><span
    class=\"n\">isfile</span><span class=\"p\">(</span><span class=\"n\">filepath</span><span
    class=\"p\">):</span>\n                <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \                   <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">filepath</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;r&quot;</span><span class=\"p\">)</span> <span class=\"k\">as</span>
    <span class=\"n\">f</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">files_data</span><span class=\"p\">[</span><span class=\"n\">filename</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">f</span><span
    class=\"o\">.</span><span class=\"n\">read</span><span class=\"p\">()</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">files_data</span><span class=\"p\">[</span><span
    class=\"n\">filename</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;Error reading file: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&gt;&quot;</span>\n    <span class=\"k\">return</span> <span class=\"n\">files_data</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-2---cluster\">Step 2 - Cluster <a class=\"header-anchor\" href=\"#step-2---cluster\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>use <code>kind</code>
    to bring up a cluster</li>\n<li>this will start a few docker containers to act
    as your control-plane and workers</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># kind-config.yml\nkind:
    Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nname: eso-demo\nnodes:\n  - role:
    control-plane\n    extraPortMappings:\n      - containerPort: 30080\n        hostPort:
    58080\n        protocol: TCP\n  - role: worker\n</pre></div>\n\n</pre>\n\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>kind create cluster --config
    kind-config.yaml --name eso-demo\n</pre></div>\n\n</pre>\n\n<h2 id=\"step-3---external-secrets-operator\">Step
    3 - External Secrets Operator <a class=\"header-anchor\" href=\"#step-3---external-secrets-operator\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>installed with
    <a class=\"wikilink\" href=\"/helm\">helm</a> from the official helm chart</li>\n<li>NOTE:
    this is the Operator, not the secrets... this is the thing which goes\nto the
    secrets backend and creates kubernetes secrets</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>helm repo add external-secrets
    https://charts.external-secrets.io 2&gt;/dev/null || true\nhelm repo update\nhelm
    install external-secrets external-secrets/external-secrets \\\n  --namespace external-secrets
    \\\n  --create-namespace \\\n  --wait\n</pre></div>\n\n</pre>\n\n<p>In the repo
    this is mostly <code>just eso-install</code></p>\n<h2 id=\"step-35---secretstore\">Step
    3.5 - Secretstore <a class=\"header-anchor\" href=\"#step-35---secretstore\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>You need a <code>clustersecretstore</code>
    to be the place that ESO puts secrets</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>apiVersion: external-secrets.io/v1\nkind:
    ClusterSecretStore\nmetadata:\n  name: vault-backend\nspec:\n  provider:\n    vault:\n
    \     server: &quot;http://10.10.0.1:58200&quot;\n      path: &quot;secret&quot;\n
    \     version: &quot;v2&quot;\n      auth:\n        tokenSecretRef:\n          name:
    vault-token\n          key: token\n          namespace: external-secrets\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-4---secrets\">Step 4 - Secrets <a class=\"header-anchor\" href=\"#step-4---secrets\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Secrets go in
    the <code>clustersecretstore</code>\n<ul>\n<li>in this example it's called 'vault-backend'</li>\n</ul>\n</li>\n<li>In
    the demo we can just <code>kubectl apply -f &lt;manifest&gt;</code> to deploy
    the secret to\nthe cluster</li>\n<li>In practice this should be handled by something
    more mature than raw-doggin\nkubectl commands</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># manifests/external-secrets.yml\n---\napiVersion:
    external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n  name: demo-app-secrets\n
    \ namespace: default\nspec:\n  refreshInterval: &quot;10s&quot;\n  secretStoreRef:\n
    \   kind: ClusterSecretStore\n    name: vault-backend\n  target:\n    name: demo-app-secrets\n
    \   creationPolicy: Owner\n  data:\n    - secretKey: DATABASE_PASSWORD\n      remoteRef:\n
    \       key: secret/data/demo-app/secrets\n        property: database_password\n
    \   - secretKey: API_KEY\n      remoteRef:\n        key: secret/data/demo-app/secrets\n
    \       property: api_key\n</pre></div>\n\n</pre>\n\n<h2 id=\"step-41---files\">Step
    4.1 - Files <a class=\"header-anchor\" href=\"#step-41---files\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>ESO supports
    mounting files to containers as well through special <code>ExternalSecret</code>
    resources</li>\n<li>One of the example seecrets is a TLS certificate</li>\n</ul>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># manifests/external-secrets-files.yml\n---\n#
    File-based ExternalSecret for TLS certificates\n# These will be mounted as files
    in /etc/secrets/\napiVersion: external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n
    \ name: demo-app-tls-files\n  namespace: default\nspec:\n  refreshInterval: &quot;10s&quot;\n
    \ secretStoreRef:\n    kind: ClusterSecretStore\n    name: vault-backend\n  target:\n
    \   name: demo-app-tls-files\n    creationPolicy: Owner\n    # Template to ensure
    proper file formatting\n    template:\n      type: Opaque\n      data:\n        tls.crt:
    &quot;{{ .tls_crt }}&quot;\n        tls.key: &quot;{{ .tls_key }}&quot;\n  data:\n
    \   - secretKey: tls_crt\n      remoteRef:\n        key: secret/data/demo-app/tls-files\n
    \       property: tls.crt\n    - secretKey: tls_key\n      remoteRef:\n        key:
    secret/data/demo-app/tls-files\n        property: tls.key\n</pre></div>\n\n</pre>\n\n<ul>\n<li>Notice
    how there's a <code>spec.target.template</code> which templates out the file\ncontents
    from the secret contents</li>\n</ul>\n<h2 id=\"step-5---helm-chart\">Step 5 -
    Helm Chart <a class=\"header-anchor\" href=\"#step-5---helm-chart\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>This isn't about
    setting up a helm chart so I'm not going to explain a lot\nbut the working example
    is simple, not secure, and in the repo</li>\n<li>The helm chart renders manifests
    - I've paired one down and added comments to\nthe relevant things</li>\n<li>The
    thing to just take note of is the reference of the secrets in the <code>envFrom</code>
    section</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># deployment.yml\napiVersion:
    apps/v1\nkind: Deployment\nmetadata:\n  annotations:\n    meta.helm.sh/release-name:
    demo-app\n    meta.helm.sh/release-namespace: default\n  name: demo-app\n  namespace:
    default\nspec:\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app.kubernetes.io/instance:
    demo-app\n        app.kubernetes.io/name: demo-app\n    spec:\n      containers:\n
    \       - envFrom:\n            - secretRef:\n                name: demo-app-secrets
    # name of example secret from section 4\n            - secretRef:\n                name:
    demo-app-config # another example in the repo\n          image: demo-app:latest
    # the image you built and loaded into kind - simple &#39;just&#39; recipe in the
    repo\n          imagePullPolicy: Never\n          name: demo-app\n          volumeMounts:\n
    \           - mountPath: /etc/secrets\n              name: secrets-volume\n              readOnly:
    true\n            - mountPath: /etc/config\n              name: configs-volume\n
    \             readOnly: true\n      volumes:\n        - name: secrets-volume\n
    \         secret:\n            defaultMode: 420\n            secretName: demo-app-tls-files
    # example secret file from section 4.1\n        - name: configs-volume\n          secret:\n
    \           defaultMode: 420\n            secretName: demo-app-config-files\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-51---deploy\">Step 5.1 - Deploy <a class=\"header-anchor\" href=\"#step-51---deploy\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>We can deploy
    the demo-app from the git repo to the cluster</li>\n<li>For a local demo a few
    things happen\n<ul>\n<li>local image build</li>\n<li>loading that image into <a
    class=\"wikilink\" href=\"/kind\">kind</a> (<code>kind</code> doesn't have access
    to your host's docker image cache, so images need to be loaded into the cluster
    cache)</li>\n</ul>\n</li>\n<li><code>just deploy</code> takes care of this for
    you, read the recipe in the repo if\nyou're interested in more there, the focus
    of this post and example are to\nbriefly show how to use ESO though</li>\n</ul>\n<h2
    id=\"step-6---profit\">Step 6 - Profit <a class=\"header-anchor\" href=\"#step-6---profit\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The example app just
    displays things that are mounted in - totally vibe-coded\nto illustrate the secrets
    mounting, not the appropriate way to leak secrets.</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233804_614254b7.png\"
    alt=\"20260210233804_614254b7.png\" /></p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233828_19852225.png\"
    alt=\"20260210233828_19852225.png\" /></p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Kubernetes External
    Secrets Operator</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I wanted to put a short demo together of using External Secrets Operator
    (ESO)\nto expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager,
    etc)\nt\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Kubernetes External Secrets Operator | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/kubernetes-external-secrets-operator\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Kubernetes External Secrets Operator | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I wanted to put a short demo together of using External Secrets Operator
    (ESO)\nto expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager,
    etc)\nt\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<article style=\"text-align:
    center;\">\n    <style>\n        section {\n            font-size: 200%;\n        }\n\n\n
    \       .edit {\n            display: none;\n        }\n    </style>\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Kubernetes External Secrets Operator</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-02-10\">\n
    \           February 10, 2026\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/devops/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #devops\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\"
    alt=\"Kubernetes External Secrets Operator cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Kubernetes
    External Secrets Operator</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2026-02-10\">\n            February 10, 2026\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/devops/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #devops\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I wanted to put a short demo together
    of using External Secrets Operator (ESO)\nto expose secrets from a vault (like
    Hashicorp Vault, AWS Secrets Manager, etc)\nto services running in kubernetes</p>\n<p>Demo
    code is <a href=\"https://github.com/pypeaday/blog-kubernetes-external-secrets-operator-demo\">here
    in this github repo</a></p>\n<p>This post is a high level overview of the components,
    see the repo for the full example.</p>\n<h2 id=\"setup\">Setup <a class=\"header-anchor\"
    href=\"#setup\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
    focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>\n<p><a class=\"wikilink\"
    href=\"/docker\">docker</a> for containerized development</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/kind\">kind</a> for setting up a quick cluster</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/kubectl\">kubectl</a> for accessing the cluster</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/helm\">helm</a> for installing ArgoCD and ESO</p>\n</li>\n<li>\n<p>and
    then <a href=\"https://github.com/casey/just\">justfile</a> is there to wrap the
    commands to easier execution</p>\n</li>\n</ul>\n<h2 id=\"step-0---vault\">Step
    0 - Vault <a class=\"header-anchor\" href=\"#step-0---vault\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>for the demo
    we'll setup Hashicorp Vault in docker compose to easily bring it\nup and down</li>\n<li>and
    the init-script is in the repo - it uses curl to make some secrets in\nvault that
    we'll reference later</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>services:\n  vault:\n    image:
    hashicorp/vault:1.18\n    container_name: vault\n    ports:\n      - &quot;58200:8200\n
    \   environment:\n      VAULT_DEV_ROOT_TOKEN_ID: root\n      VAULT_DEV_LISTEN_ADDRESS:
    0.0.0.0:8200\n    volumes:\n      - vault-data:/vault/file\n    cap_add:\n      -
    IPC_LOCK\n    command: server -dev -dev-root-token-id=root\n\nvolumes:\n  vault-data:\n</pre></div>\n\n</pre>\n\n<ul>\n<li>bringing
    up the vault instance is a simple <code>docker compose up</code> (use the just
    recipes which some <code>curl</code> commands for checking status etc.)</li>\n</ul>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>curl<span class=\"w\"> </span>-s<span
    class=\"w\"> </span>http://localhost:58200/v1/sys/health<span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>.<span
    class=\"w\">  </span><span class=\"c1\"># or just vault-status</span>\n<span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;initialized&quot;</span>:<span class=\"w\">
    </span>true,\n<span class=\"w\">  </span><span class=\"s2\">&quot;sealed&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;standby&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;performance_standby&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;replication_performance_mode&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;disabled&quot;</span>,\n<span class=\"w\">
    \ </span><span class=\"s2\">&quot;replication_dr_mode&quot;</span>:<span class=\"w\">
    </span><span class=\"s2\">&quot;disabled&quot;</span>,\n<span class=\"w\">  </span><span
    class=\"s2\">&quot;server_time_utc&quot;</span>:<span class=\"w\"> </span><span
    class=\"m\">1770893657</span>,\n<span class=\"w\">  </span><span class=\"s2\">&quot;version&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;1.18.5&quot;</span>,\n<span class=\"w\">
    \ </span><span class=\"s2\">&quot;enterprise&quot;</span>:<span class=\"w\"> </span>false,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;cluster_name&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;vault-cluster-acfb9930&quot;</span>,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;cluster_id&quot;</span>:<span class=\"w\">
    </span><span class=\"s2\">&quot;4d9162f4-e501-371b-7f94-bd60052b40a3&quot;</span>,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;echo_duration_ms&quot;</span>:<span
    class=\"w\"> </span><span class=\"m\">0</span>,\n<span class=\"w\">  </span><span
    class=\"s2\">&quot;clock_skew_ms&quot;</span>:<span class=\"w\"> </span><span
    class=\"m\">0</span>,\n<span class=\"w\">  </span><span class=\"s2\">&quot;replication_primary_canary_age_ms&quot;</span>:<span
    class=\"w\"> </span><span class=\"m\">0</span>\n<span class=\"o\">}</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-1---app\">Step 1 - App <a class=\"header-anchor\" href=\"#step-1---app\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>We need an app
    that requires secrets</li>\n<li>app code in repo, essentially it's a python webserver
    to show the vault\nvalues (obviously this would expose real secrets so it's just
    a demo)</li>\n<li>Below is one of the endpoints in the vibe-coded app, just to
    illustrate that\nwe're going to give secrets to the app as environment variables
    (or as mounted\nfiles!)</li>\n<li>In the repo, the app is included and there's
    a <code>just build</code> which builds the docker image</li>\n<li>There is also
    <code>just deploy</code> which handles loading the image into <code>kind</code>'s
    image cache</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># example
    route from demo-app - see git repo</span>\n<span class=\"nd\">@app</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;/env&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_class</span><span
    class=\"o\">=</span><span class=\"n\">HTMLResponse</span><span class=\"p\">)</span>\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">show_env</span><span
    class=\"p\">():</span>\n    <span class=\"c1\"># ESO brings Vault secrets into
    environment variables</span>\n    <span class=\"n\">env_vars</span> <span class=\"o\">=</span>
    <span class=\"nb\">dict</span><span class=\"p\">(</span><span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">environ</span><span class=\"p\">)</span>\n\n
    \   <span class=\"c1\"># Sort by category, then by key</span>\n    <span class=\"n\">sorted_items</span>
    <span class=\"o\">=</span> <span class=\"nb\">sorted</span><span class=\"p\">(</span><span
    class=\"n\">env_vars</span><span class=\"o\">.</span><span class=\"n\">items</span><span
    class=\"p\">(),</span> <span class=\"n\">key</span><span class=\"o\">=</span><span
    class=\"k\">lambda</span> <span class=\"n\">x</span><span class=\"p\">:</span>
    <span class=\"p\">(</span><span class=\"n\">classify_env</span><span class=\"p\">(</span><span
    class=\"n\">x</span><span class=\"p\">[</span><span class=\"mi\">0</span><span
    class=\"p\">]),</span> <span class=\"n\">x</span><span class=\"p\">[</span><span
    class=\"mi\">0</span><span class=\"p\">]))</span>\n\n    <span class=\"n\">cards</span>
    <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span><span class=\"o\">.</span><span
    class=\"n\">join</span><span class=\"p\">(</span><span class=\"n\">create_card</span><span
    class=\"p\">(</span><span class=\"n\">k</span><span class=\"p\">,</span> <span
    class=\"n\">v</span><span class=\"p\">)</span> <span class=\"k\">for</span> <span
    class=\"n\">k</span><span class=\"p\">,</span> <span class=\"n\">v</span> <span
    class=\"ow\">in</span> <span class=\"n\">sorted_items</span><span class=\"p\">)</span>\n\n
    \   <span class=\"n\">secret_count</span> <span class=\"o\">=</span> <span class=\"nb\">sum</span><span
    class=\"p\">(</span><span class=\"mi\">1</span> <span class=\"k\">for</span> <span
    class=\"n\">k</span> <span class=\"ow\">in</span> <span class=\"n\">env_vars</span>
    <span class=\"k\">if</span> <span class=\"n\">k</span> <span class=\"ow\">in</span>
    <span class=\"n\">SECRET_KEYS</span><span class=\"p\">)</span>\n    <span class=\"n\">config_count</span>
    <span class=\"o\">=</span> <span class=\"nb\">sum</span><span class=\"p\">(</span><span
    class=\"mi\">1</span> <span class=\"k\">for</span> <span class=\"n\">k</span>
    <span class=\"ow\">in</span> <span class=\"n\">env_vars</span> <span class=\"k\">if</span>
    <span class=\"n\">k</span> <span class=\"ow\">in</span> <span class=\"n\">CONFIG_KEYS</span><span
    class=\"p\">)</span>\n    <span class=\"n\">system_count</span> <span class=\"o\">=</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">env_vars</span><span
    class=\"p\">)</span> <span class=\"o\">-</span> <span class=\"n\">secret_count</span>
    <span class=\"o\">-</span> <span class=\"n\">config_count</span>\n\n    <span
    class=\"n\">html</span> <span class=\"o\">=</span> <span class=\"n\">HTML_TEMPLATE</span><span
    class=\"o\">.</span><span class=\"n\">format</span><span class=\"p\">(</span>\n
    \       <span class=\"n\">cards</span><span class=\"o\">=</span><span class=\"n\">cards</span><span
    class=\"p\">,</span>\n        <span class=\"n\">secret_count</span><span class=\"o\">=</span><span
    class=\"n\">secret_count</span><span class=\"p\">,</span>\n        <span class=\"n\">config_count</span><span
    class=\"o\">=</span><span class=\"n\">config_count</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">system_count</span><span class=\"o\">=</span><span class=\"n\">system_count</span><span
    class=\"p\">,</span>\n    <span class=\"p\">)</span>\n\n    <span class=\"k\">return</span>
    <span class=\"n\">HTMLResponse</span><span class=\"p\">(</span><span class=\"n\">content</span><span
    class=\"o\">=</span><span class=\"n\">html</span><span class=\"p\">)</span>\n\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">read_mounted_files</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">)</span> <span class=\"o\">-&gt;</span>
    <span class=\"nb\">dict</span><span class=\"p\">:</span>\n<span class=\"w\">    </span><span
    class=\"sd\">&quot;&quot;&quot;Read all files from a mounted directory.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">files_data</span> <span class=\"o\">=</span> <span class=\"p\">{}</span>\n
    \   <span class=\"k\">if</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">exists</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">)</span>
    <span class=\"ow\">and</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">isdir</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">):</span>\n
    \       <span class=\"k\">for</span> <span class=\"n\">filename</span> <span class=\"ow\">in</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">listdir</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">):</span>\n
    \           <span class=\"n\">filepath</span> <span class=\"o\">=</span> <span
    class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">path</span><span
    class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">directory</span><span class=\"p\">,</span> <span class=\"n\">filename</span><span
    class=\"p\">)</span>\n            <span class=\"k\">if</span> <span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">path</span><span class=\"o\">.</span><span
    class=\"n\">isfile</span><span class=\"p\">(</span><span class=\"n\">filepath</span><span
    class=\"p\">):</span>\n                <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \                   <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">filepath</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;r&quot;</span><span class=\"p\">)</span> <span class=\"k\">as</span>
    <span class=\"n\">f</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">files_data</span><span class=\"p\">[</span><span class=\"n\">filename</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">f</span><span
    class=\"o\">.</span><span class=\"n\">read</span><span class=\"p\">()</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">files_data</span><span class=\"p\">[</span><span
    class=\"n\">filename</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;Error reading file: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&gt;&quot;</span>\n    <span class=\"k\">return</span> <span class=\"n\">files_data</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-2---cluster\">Step 2 - Cluster <a class=\"header-anchor\" href=\"#step-2---cluster\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>use <code>kind</code>
    to bring up a cluster</li>\n<li>this will start a few docker containers to act
    as your control-plane and workers</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># kind-config.yml\nkind:
    Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nname: eso-demo\nnodes:\n  - role:
    control-plane\n    extraPortMappings:\n      - containerPort: 30080\n        hostPort:
    58080\n        protocol: TCP\n  - role: worker\n</pre></div>\n\n</pre>\n\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>kind create cluster --config
    kind-config.yaml --name eso-demo\n</pre></div>\n\n</pre>\n\n<h2 id=\"step-3---external-secrets-operator\">Step
    3 - External Secrets Operator <a class=\"header-anchor\" href=\"#step-3---external-secrets-operator\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>installed with
    <a class=\"wikilink\" href=\"/helm\">helm</a> from the official helm chart</li>\n<li>NOTE:
    this is the Operator, not the secrets... this is the thing which goes\nto the
    secrets backend and creates kubernetes secrets</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>helm repo add external-secrets
    https://charts.external-secrets.io 2&gt;/dev/null || true\nhelm repo update\nhelm
    install external-secrets external-secrets/external-secrets \\\n  --namespace external-secrets
    \\\n  --create-namespace \\\n  --wait\n</pre></div>\n\n</pre>\n\n<p>In the repo
    this is mostly <code>just eso-install</code></p>\n<h2 id=\"step-35---secretstore\">Step
    3.5 - Secretstore <a class=\"header-anchor\" href=\"#step-35---secretstore\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>You need a <code>clustersecretstore</code>
    to be the place that ESO puts secrets</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>apiVersion: external-secrets.io/v1\nkind:
    ClusterSecretStore\nmetadata:\n  name: vault-backend\nspec:\n  provider:\n    vault:\n
    \     server: &quot;http://10.10.0.1:58200&quot;\n      path: &quot;secret&quot;\n
    \     version: &quot;v2&quot;\n      auth:\n        tokenSecretRef:\n          name:
    vault-token\n          key: token\n          namespace: external-secrets\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-4---secrets\">Step 4 - Secrets <a class=\"header-anchor\" href=\"#step-4---secrets\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Secrets go in
    the <code>clustersecretstore</code>\n<ul>\n<li>in this example it's called 'vault-backend'</li>\n</ul>\n</li>\n<li>In
    the demo we can just <code>kubectl apply -f &lt;manifest&gt;</code> to deploy
    the secret to\nthe cluster</li>\n<li>In practice this should be handled by something
    more mature than raw-doggin\nkubectl commands</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># manifests/external-secrets.yml\n---\napiVersion:
    external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n  name: demo-app-secrets\n
    \ namespace: default\nspec:\n  refreshInterval: &quot;10s&quot;\n  secretStoreRef:\n
    \   kind: ClusterSecretStore\n    name: vault-backend\n  target:\n    name: demo-app-secrets\n
    \   creationPolicy: Owner\n  data:\n    - secretKey: DATABASE_PASSWORD\n      remoteRef:\n
    \       key: secret/data/demo-app/secrets\n        property: database_password\n
    \   - secretKey: API_KEY\n      remoteRef:\n        key: secret/data/demo-app/secrets\n
    \       property: api_key\n</pre></div>\n\n</pre>\n\n<h2 id=\"step-41---files\">Step
    4.1 - Files <a class=\"header-anchor\" href=\"#step-41---files\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>ESO supports
    mounting files to containers as well through special <code>ExternalSecret</code>
    resources</li>\n<li>One of the example seecrets is a TLS certificate</li>\n</ul>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># manifests/external-secrets-files.yml\n---\n#
    File-based ExternalSecret for TLS certificates\n# These will be mounted as files
    in /etc/secrets/\napiVersion: external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n
    \ name: demo-app-tls-files\n  namespace: default\nspec:\n  refreshInterval: &quot;10s&quot;\n
    \ secretStoreRef:\n    kind: ClusterSecretStore\n    name: vault-backend\n  target:\n
    \   name: demo-app-tls-files\n    creationPolicy: Owner\n    # Template to ensure
    proper file formatting\n    template:\n      type: Opaque\n      data:\n        tls.crt:
    &quot;{{ .tls_crt }}&quot;\n        tls.key: &quot;{{ .tls_key }}&quot;\n  data:\n
    \   - secretKey: tls_crt\n      remoteRef:\n        key: secret/data/demo-app/tls-files\n
    \       property: tls.crt\n    - secretKey: tls_key\n      remoteRef:\n        key:
    secret/data/demo-app/tls-files\n        property: tls.key\n</pre></div>\n\n</pre>\n\n<ul>\n<li>Notice
    how there's a <code>spec.target.template</code> which templates out the file\ncontents
    from the secret contents</li>\n</ul>\n<h2 id=\"step-5---helm-chart\">Step 5 -
    Helm Chart <a class=\"header-anchor\" href=\"#step-5---helm-chart\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>This isn't about
    setting up a helm chart so I'm not going to explain a lot\nbut the working example
    is simple, not secure, and in the repo</li>\n<li>The helm chart renders manifests
    - I've paired one down and added comments to\nthe relevant things</li>\n<li>The
    thing to just take note of is the reference of the secrets in the <code>envFrom</code>
    section</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># deployment.yml\napiVersion:
    apps/v1\nkind: Deployment\nmetadata:\n  annotations:\n    meta.helm.sh/release-name:
    demo-app\n    meta.helm.sh/release-namespace: default\n  name: demo-app\n  namespace:
    default\nspec:\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app.kubernetes.io/instance:
    demo-app\n        app.kubernetes.io/name: demo-app\n    spec:\n      containers:\n
    \       - envFrom:\n            - secretRef:\n                name: demo-app-secrets
    # name of example secret from section 4\n            - secretRef:\n                name:
    demo-app-config # another example in the repo\n          image: demo-app:latest
    # the image you built and loaded into kind - simple &#39;just&#39; recipe in the
    repo\n          imagePullPolicy: Never\n          name: demo-app\n          volumeMounts:\n
    \           - mountPath: /etc/secrets\n              name: secrets-volume\n              readOnly:
    true\n            - mountPath: /etc/config\n              name: configs-volume\n
    \             readOnly: true\n      volumes:\n        - name: secrets-volume\n
    \         secret:\n            defaultMode: 420\n            secretName: demo-app-tls-files
    # example secret file from section 4.1\n        - name: configs-volume\n          secret:\n
    \           defaultMode: 420\n            secretName: demo-app-config-files\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-51---deploy\">Step 5.1 - Deploy <a class=\"header-anchor\" href=\"#step-51---deploy\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>We can deploy
    the demo-app from the git repo to the cluster</li>\n<li>For a local demo a few
    things happen\n<ul>\n<li>local image build</li>\n<li>loading that image into <a
    class=\"wikilink\" href=\"/kind\">kind</a> (<code>kind</code> doesn't have access
    to your host's docker image cache, so images need to be loaded into the cluster
    cache)</li>\n</ul>\n</li>\n<li><code>just deploy</code> takes care of this for
    you, read the recipe in the repo if\nyou're interested in more there, the focus
    of this post and example are to\nbriefly show how to use ESO though</li>\n</ul>\n<h2
    id=\"step-6---profit\">Step 6 - Profit <a class=\"header-anchor\" href=\"#step-6---profit\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The example app just
    displays things that are mounted in - totally vibe-coded\nto illustrate the secrets
    mounting, not the appropriate way to leak secrets.</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233804_614254b7.png\"
    alt=\"20260210233804_614254b7.png\" /></p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233828_19852225.png\"
    alt=\"20260210233828_19852225.png\" /></p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Kubernetes
    External Secrets Operator</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I wanted to put a short demo together of using External Secrets Operator
    (ESO)\nto expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager,
    etc)\nt\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Kubernetes External Secrets Operator | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/kubernetes-external-secrets-operator\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Kubernetes External Secrets Operator | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I wanted to put a short demo together of using External Secrets Operator
    (ESO)\nto expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager,
    etc)\nt\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"terminal-page\">\n
    \   <main class=\"terminal-page__main\">\n        <div class=\"terminal-page__content\">\n<header
    class=\"site-terminal\">\n\n    <div class=\"site-terminal__bar\">\n        <div
    class=\"site-terminal__lights\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n
    \       <div class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/kubernetes-external-secrets-operator</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>I wanted
    to put a short demo together of using External Secrets Operator (ESO)\nto expose
    secrets from a vault (like Hashicorp Vault, AWS Secrets Manager, etc)\nto services
    running in kubernetes</p>\n<p>Demo code is <a href=\"https://github.com/pypeaday/blog-kubernetes-external-secrets-operator-demo\">here
    in this github repo</a></p>\n<p>This post is a high level overview of the components,
    see the repo for the full example.</p>\n<h2 id=\"setup\">Setup <a class=\"header-anchor\"
    href=\"#setup\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
    focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>\n<p><a class=\"wikilink\"
    href=\"/docker\">docker</a> for containerized development</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/kind\">kind</a> for setting up a quick cluster</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/kubectl\">kubectl</a> for accessing the cluster</p>\n</li>\n<li>\n<p><a
    class=\"wikilink\" href=\"/helm\">helm</a> for installing ArgoCD and ESO</p>\n</li>\n<li>\n<p>and
    then <a href=\"https://github.com/casey/just\">justfile</a> is there to wrap the
    commands to easier execution</p>\n</li>\n</ul>\n<h2 id=\"step-0---vault\">Step
    0 - Vault <a class=\"header-anchor\" href=\"#step-0---vault\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>for the demo
    we'll setup Hashicorp Vault in docker compose to easily bring it\nup and down</li>\n<li>and
    the init-script is in the repo - it uses curl to make some secrets in\nvault that
    we'll reference later</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>services:\n  vault:\n    image:
    hashicorp/vault:1.18\n    container_name: vault\n    ports:\n      - &quot;58200:8200\n
    \   environment:\n      VAULT_DEV_ROOT_TOKEN_ID: root\n      VAULT_DEV_LISTEN_ADDRESS:
    0.0.0.0:8200\n    volumes:\n      - vault-data:/vault/file\n    cap_add:\n      -
    IPC_LOCK\n    command: server -dev -dev-root-token-id=root\n\nvolumes:\n  vault-data:\n</pre></div>\n\n</pre>\n\n<ul>\n<li>bringing
    up the vault instance is a simple <code>docker compose up</code> (use the just
    recipes which some <code>curl</code> commands for checking status etc.)</li>\n</ul>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>curl<span class=\"w\"> </span>-s<span
    class=\"w\"> </span>http://localhost:58200/v1/sys/health<span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>.<span
    class=\"w\">  </span><span class=\"c1\"># or just vault-status</span>\n<span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;initialized&quot;</span>:<span class=\"w\">
    </span>true,\n<span class=\"w\">  </span><span class=\"s2\">&quot;sealed&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;standby&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;performance_standby&quot;</span>:<span
    class=\"w\"> </span>false,\n<span class=\"w\">  </span><span class=\"s2\">&quot;replication_performance_mode&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;disabled&quot;</span>,\n<span class=\"w\">
    \ </span><span class=\"s2\">&quot;replication_dr_mode&quot;</span>:<span class=\"w\">
    </span><span class=\"s2\">&quot;disabled&quot;</span>,\n<span class=\"w\">  </span><span
    class=\"s2\">&quot;server_time_utc&quot;</span>:<span class=\"w\"> </span><span
    class=\"m\">1770893657</span>,\n<span class=\"w\">  </span><span class=\"s2\">&quot;version&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;1.18.5&quot;</span>,\n<span class=\"w\">
    \ </span><span class=\"s2\">&quot;enterprise&quot;</span>:<span class=\"w\"> </span>false,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;cluster_name&quot;</span>:<span
    class=\"w\"> </span><span class=\"s2\">&quot;vault-cluster-acfb9930&quot;</span>,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;cluster_id&quot;</span>:<span class=\"w\">
    </span><span class=\"s2\">&quot;4d9162f4-e501-371b-7f94-bd60052b40a3&quot;</span>,\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;echo_duration_ms&quot;</span>:<span
    class=\"w\"> </span><span class=\"m\">0</span>,\n<span class=\"w\">  </span><span
    class=\"s2\">&quot;clock_skew_ms&quot;</span>:<span class=\"w\"> </span><span
    class=\"m\">0</span>,\n<span class=\"w\">  </span><span class=\"s2\">&quot;replication_primary_canary_age_ms&quot;</span>:<span
    class=\"w\"> </span><span class=\"m\">0</span>\n<span class=\"o\">}</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-1---app\">Step 1 - App <a class=\"header-anchor\" href=\"#step-1---app\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>We need an app
    that requires secrets</li>\n<li>app code in repo, essentially it's a python webserver
    to show the vault\nvalues (obviously this would expose real secrets so it's just
    a demo)</li>\n<li>Below is one of the endpoints in the vibe-coded app, just to
    illustrate that\nwe're going to give secrets to the app as environment variables
    (or as mounted\nfiles!)</li>\n<li>In the repo, the app is included and there's
    a <code>just build</code> which builds the docker image</li>\n<li>There is also
    <code>just deploy</code> which handles loading the image into <code>kind</code>'s
    image cache</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># example
    route from demo-app - see git repo</span>\n<span class=\"nd\">@app</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;/env&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_class</span><span
    class=\"o\">=</span><span class=\"n\">HTMLResponse</span><span class=\"p\">)</span>\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">show_env</span><span
    class=\"p\">():</span>\n    <span class=\"c1\"># ESO brings Vault secrets into
    environment variables</span>\n    <span class=\"n\">env_vars</span> <span class=\"o\">=</span>
    <span class=\"nb\">dict</span><span class=\"p\">(</span><span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">environ</span><span class=\"p\">)</span>\n\n
    \   <span class=\"c1\"># Sort by category, then by key</span>\n    <span class=\"n\">sorted_items</span>
    <span class=\"o\">=</span> <span class=\"nb\">sorted</span><span class=\"p\">(</span><span
    class=\"n\">env_vars</span><span class=\"o\">.</span><span class=\"n\">items</span><span
    class=\"p\">(),</span> <span class=\"n\">key</span><span class=\"o\">=</span><span
    class=\"k\">lambda</span> <span class=\"n\">x</span><span class=\"p\">:</span>
    <span class=\"p\">(</span><span class=\"n\">classify_env</span><span class=\"p\">(</span><span
    class=\"n\">x</span><span class=\"p\">[</span><span class=\"mi\">0</span><span
    class=\"p\">]),</span> <span class=\"n\">x</span><span class=\"p\">[</span><span
    class=\"mi\">0</span><span class=\"p\">]))</span>\n\n    <span class=\"n\">cards</span>
    <span class=\"o\">=</span> <span class=\"s2\">&quot;&quot;</span><span class=\"o\">.</span><span
    class=\"n\">join</span><span class=\"p\">(</span><span class=\"n\">create_card</span><span
    class=\"p\">(</span><span class=\"n\">k</span><span class=\"p\">,</span> <span
    class=\"n\">v</span><span class=\"p\">)</span> <span class=\"k\">for</span> <span
    class=\"n\">k</span><span class=\"p\">,</span> <span class=\"n\">v</span> <span
    class=\"ow\">in</span> <span class=\"n\">sorted_items</span><span class=\"p\">)</span>\n\n
    \   <span class=\"n\">secret_count</span> <span class=\"o\">=</span> <span class=\"nb\">sum</span><span
    class=\"p\">(</span><span class=\"mi\">1</span> <span class=\"k\">for</span> <span
    class=\"n\">k</span> <span class=\"ow\">in</span> <span class=\"n\">env_vars</span>
    <span class=\"k\">if</span> <span class=\"n\">k</span> <span class=\"ow\">in</span>
    <span class=\"n\">SECRET_KEYS</span><span class=\"p\">)</span>\n    <span class=\"n\">config_count</span>
    <span class=\"o\">=</span> <span class=\"nb\">sum</span><span class=\"p\">(</span><span
    class=\"mi\">1</span> <span class=\"k\">for</span> <span class=\"n\">k</span>
    <span class=\"ow\">in</span> <span class=\"n\">env_vars</span> <span class=\"k\">if</span>
    <span class=\"n\">k</span> <span class=\"ow\">in</span> <span class=\"n\">CONFIG_KEYS</span><span
    class=\"p\">)</span>\n    <span class=\"n\">system_count</span> <span class=\"o\">=</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">env_vars</span><span
    class=\"p\">)</span> <span class=\"o\">-</span> <span class=\"n\">secret_count</span>
    <span class=\"o\">-</span> <span class=\"n\">config_count</span>\n\n    <span
    class=\"n\">html</span> <span class=\"o\">=</span> <span class=\"n\">HTML_TEMPLATE</span><span
    class=\"o\">.</span><span class=\"n\">format</span><span class=\"p\">(</span>\n
    \       <span class=\"n\">cards</span><span class=\"o\">=</span><span class=\"n\">cards</span><span
    class=\"p\">,</span>\n        <span class=\"n\">secret_count</span><span class=\"o\">=</span><span
    class=\"n\">secret_count</span><span class=\"p\">,</span>\n        <span class=\"n\">config_count</span><span
    class=\"o\">=</span><span class=\"n\">config_count</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">system_count</span><span class=\"o\">=</span><span class=\"n\">system_count</span><span
    class=\"p\">,</span>\n    <span class=\"p\">)</span>\n\n    <span class=\"k\">return</span>
    <span class=\"n\">HTMLResponse</span><span class=\"p\">(</span><span class=\"n\">content</span><span
    class=\"o\">=</span><span class=\"n\">html</span><span class=\"p\">)</span>\n\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">read_mounted_files</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">:</span>
    <span class=\"nb\">str</span><span class=\"p\">)</span> <span class=\"o\">-&gt;</span>
    <span class=\"nb\">dict</span><span class=\"p\">:</span>\n<span class=\"w\">    </span><span
    class=\"sd\">&quot;&quot;&quot;Read all files from a mounted directory.&quot;&quot;&quot;</span>\n
    \   <span class=\"n\">files_data</span> <span class=\"o\">=</span> <span class=\"p\">{}</span>\n
    \   <span class=\"k\">if</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">exists</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">)</span>
    <span class=\"ow\">and</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">isdir</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">):</span>\n
    \       <span class=\"k\">for</span> <span class=\"n\">filename</span> <span class=\"ow\">in</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">listdir</span><span
    class=\"p\">(</span><span class=\"n\">directory</span><span class=\"p\">):</span>\n
    \           <span class=\"n\">filepath</span> <span class=\"o\">=</span> <span
    class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">path</span><span
    class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">directory</span><span class=\"p\">,</span> <span class=\"n\">filename</span><span
    class=\"p\">)</span>\n            <span class=\"k\">if</span> <span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">path</span><span class=\"o\">.</span><span
    class=\"n\">isfile</span><span class=\"p\">(</span><span class=\"n\">filepath</span><span
    class=\"p\">):</span>\n                <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \                   <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">filepath</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;r&quot;</span><span class=\"p\">)</span> <span class=\"k\">as</span>
    <span class=\"n\">f</span><span class=\"p\">:</span>\n                        <span
    class=\"n\">files_data</span><span class=\"p\">[</span><span class=\"n\">filename</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">f</span><span
    class=\"o\">.</span><span class=\"n\">read</span><span class=\"p\">()</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \               <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">files_data</span><span class=\"p\">[</span><span
    class=\"n\">filename</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"sa\">f</span><span class=\"s2\">&quot;&lt;Error reading file: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&gt;&quot;</span>\n    <span class=\"k\">return</span> <span class=\"n\">files_data</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-2---cluster\">Step 2 - Cluster <a class=\"header-anchor\" href=\"#step-2---cluster\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>use <code>kind</code>
    to bring up a cluster</li>\n<li>this will start a few docker containers to act
    as your control-plane and workers</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># kind-config.yml\nkind:
    Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nname: eso-demo\nnodes:\n  - role:
    control-plane\n    extraPortMappings:\n      - containerPort: 30080\n        hostPort:
    58080\n        protocol: TCP\n  - role: worker\n</pre></div>\n\n</pre>\n\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>kind create cluster --config
    kind-config.yaml --name eso-demo\n</pre></div>\n\n</pre>\n\n<h2 id=\"step-3---external-secrets-operator\">Step
    3 - External Secrets Operator <a class=\"header-anchor\" href=\"#step-3---external-secrets-operator\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>installed with
    <a class=\"wikilink\" href=\"/helm\">helm</a> from the official helm chart</li>\n<li>NOTE:
    this is the Operator, not the secrets... this is the thing which goes\nto the
    secrets backend and creates kubernetes secrets</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>helm repo add external-secrets
    https://charts.external-secrets.io 2&gt;/dev/null || true\nhelm repo update\nhelm
    install external-secrets external-secrets/external-secrets \\\n  --namespace external-secrets
    \\\n  --create-namespace \\\n  --wait\n</pre></div>\n\n</pre>\n\n<p>In the repo
    this is mostly <code>just eso-install</code></p>\n<h2 id=\"step-35---secretstore\">Step
    3.5 - Secretstore <a class=\"header-anchor\" href=\"#step-35---secretstore\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>You need a <code>clustersecretstore</code>
    to be the place that ESO puts secrets</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>apiVersion: external-secrets.io/v1\nkind:
    ClusterSecretStore\nmetadata:\n  name: vault-backend\nspec:\n  provider:\n    vault:\n
    \     server: &quot;http://10.10.0.1:58200&quot;\n      path: &quot;secret&quot;\n
    \     version: &quot;v2&quot;\n      auth:\n        tokenSecretRef:\n          name:
    vault-token\n          key: token\n          namespace: external-secrets\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-4---secrets\">Step 4 - Secrets <a class=\"header-anchor\" href=\"#step-4---secrets\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Secrets go in
    the <code>clustersecretstore</code>\n<ul>\n<li>in this example it's called 'vault-backend'</li>\n</ul>\n</li>\n<li>In
    the demo we can just <code>kubectl apply -f &lt;manifest&gt;</code> to deploy
    the secret to\nthe cluster</li>\n<li>In practice this should be handled by something
    more mature than raw-doggin\nkubectl commands</li>\n</ul>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># manifests/external-secrets.yml\n---\napiVersion:
    external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n  name: demo-app-secrets\n
    \ namespace: default\nspec:\n  refreshInterval: &quot;10s&quot;\n  secretStoreRef:\n
    \   kind: ClusterSecretStore\n    name: vault-backend\n  target:\n    name: demo-app-secrets\n
    \   creationPolicy: Owner\n  data:\n    - secretKey: DATABASE_PASSWORD\n      remoteRef:\n
    \       key: secret/data/demo-app/secrets\n        property: database_password\n
    \   - secretKey: API_KEY\n      remoteRef:\n        key: secret/data/demo-app/secrets\n
    \       property: api_key\n</pre></div>\n\n</pre>\n\n<h2 id=\"step-41---files\">Step
    4.1 - Files <a class=\"header-anchor\" href=\"#step-41---files\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>ESO supports
    mounting files to containers as well through special <code>ExternalSecret</code>
    resources</li>\n<li>One of the example seecrets is a TLS certificate</li>\n</ul>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># manifests/external-secrets-files.yml\n---\n#
    File-based ExternalSecret for TLS certificates\n# These will be mounted as files
    in /etc/secrets/\napiVersion: external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n
    \ name: demo-app-tls-files\n  namespace: default\nspec:\n  refreshInterval: &quot;10s&quot;\n
    \ secretStoreRef:\n    kind: ClusterSecretStore\n    name: vault-backend\n  target:\n
    \   name: demo-app-tls-files\n    creationPolicy: Owner\n    # Template to ensure
    proper file formatting\n    template:\n      type: Opaque\n      data:\n        tls.crt:
    &quot;{{ .tls_crt }}&quot;\n        tls.key: &quot;{{ .tls_key }}&quot;\n  data:\n
    \   - secretKey: tls_crt\n      remoteRef:\n        key: secret/data/demo-app/tls-files\n
    \       property: tls.crt\n    - secretKey: tls_key\n      remoteRef:\n        key:
    secret/data/demo-app/tls-files\n        property: tls.key\n</pre></div>\n\n</pre>\n\n<ul>\n<li>Notice
    how there's a <code>spec.target.template</code> which templates out the file\ncontents
    from the secret contents</li>\n</ul>\n<h2 id=\"step-5---helm-chart\">Step 5 -
    Helm Chart <a class=\"header-anchor\" href=\"#step-5---helm-chart\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>This isn't about
    setting up a helm chart so I'm not going to explain a lot\nbut the working example
    is simple, not secure, and in the repo</li>\n<li>The helm chart renders manifests
    - I've paired one down and added comments to\nthe relevant things</li>\n<li>The
    thing to just take note of is the reference of the secrets in the <code>envFrom</code>
    section</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span># deployment.yml\napiVersion:
    apps/v1\nkind: Deployment\nmetadata:\n  annotations:\n    meta.helm.sh/release-name:
    demo-app\n    meta.helm.sh/release-namespace: default\n  name: demo-app\n  namespace:
    default\nspec:\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app.kubernetes.io/instance:
    demo-app\n        app.kubernetes.io/name: demo-app\n    spec:\n      containers:\n
    \       - envFrom:\n            - secretRef:\n                name: demo-app-secrets
    # name of example secret from section 4\n            - secretRef:\n                name:
    demo-app-config # another example in the repo\n          image: demo-app:latest
    # the image you built and loaded into kind - simple &#39;just&#39; recipe in the
    repo\n          imagePullPolicy: Never\n          name: demo-app\n          volumeMounts:\n
    \           - mountPath: /etc/secrets\n              name: secrets-volume\n              readOnly:
    true\n            - mountPath: /etc/config\n              name: configs-volume\n
    \             readOnly: true\n      volumes:\n        - name: secrets-volume\n
    \         secret:\n            defaultMode: 420\n            secretName: demo-app-tls-files
    # example secret file from section 4.1\n        - name: configs-volume\n          secret:\n
    \           defaultMode: 420\n            secretName: demo-app-config-files\n</pre></div>\n\n</pre>\n\n<h2
    id=\"step-51---deploy\">Step 5.1 - Deploy <a class=\"header-anchor\" href=\"#step-51---deploy\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>We can deploy
    the demo-app from the git repo to the cluster</li>\n<li>For a local demo a few
    things happen\n<ul>\n<li>local image build</li>\n<li>loading that image into <a
    class=\"wikilink\" href=\"/kind\">kind</a> (<code>kind</code> doesn't have access
    to your host's docker image cache, so images need to be loaded into the cluster
    cache)</li>\n</ul>\n</li>\n<li><code>just deploy</code> takes care of this for
    you, read the recipe in the repo if\nyou're interested in more there, the focus
    of this post and example are to\nbriefly show how to use ESO though</li>\n</ul>\n<h2
    id=\"step-6---profit\">Step 6 - Profit <a class=\"header-anchor\" href=\"#step-6---profit\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The example app just
    displays things that are mounted in - totally vibe-coded\nto illustrate the secrets
    mounting, not the appropriate way to leak secrets.</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233804_614254b7.png\"
    alt=\"20260210233804_614254b7.png\" /></p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233828_19852225.png\"
    alt=\"20260210233828_19852225.png\" /></p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2026-02-10 07:48:34\ntemplateKey: blog-post\ntitle: Kubernetes
    External Secrets Operator\npublished: True\ncover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210234805_a8bbed9a.png\ntags:\n
    \ - devops\n  - tech\n---\n\nI wanted to put a short demo together of using External
    Secrets Operator (ESO)\nto expose secrets from a vault (like Hashicorp Vault,
    AWS Secrets Manager, etc)\nto services running in kubernetes\n\nDemo code is [here
    in this github repo](https://github.com/pypeaday/blog-kubernetes-external-secrets-operator-demo)\n\nThis
    post is a high level overview of the components, see the repo for the full example.\n\n##
    Setup\n\n- [[docker]] for containerized development\n- [[kind]] for setting up
    a quick cluster\n- [[kubectl]] for accessing the cluster\n- [[helm]] for installing
    ArgoCD and ESO\n\n- and then [justfile](https://github.com/casey/just) is there
    to wrap the commands to easier execution\n\n## Step 0 - Vault\n\n- for the demo
    we'll setup Hashicorp Vault in docker compose to easily bring it\n  up and down\n-
    and the init-script is in the repo - it uses curl to make some secrets in\n  vault
    that we'll reference later\n\n```yml\nservices:\n  vault:\n    image: hashicorp/vault:1.18\n
    \   container_name: vault\n    ports:\n      - \"58200:8200\n    environment:\n
    \     VAULT_DEV_ROOT_TOKEN_ID: root\n      VAULT_DEV_LISTEN_ADDRESS: 0.0.0.0:8200\n
    \   volumes:\n      - vault-data:/vault/file\n    cap_add:\n      - IPC_LOCK\n
    \   command: server -dev -dev-root-token-id=root\n\nvolumes:\n  vault-data:\n```\n\n-
    bringing up the vault instance is a simple `docker compose up` (use the just recipes
    which some `curl` commands for checking status etc.)\n\n```bash\ncurl -s http://localhost:58200/v1/sys/health
    | jq .  # or just vault-status\n{\n  \"initialized\": true,\n  \"sealed\": false,\n
    \ \"standby\": false,\n  \"performance_standby\": false,\n  \"replication_performance_mode\":
    \"disabled\",\n  \"replication_dr_mode\": \"disabled\",\n  \"server_time_utc\":
    1770893657,\n  \"version\": \"1.18.5\",\n  \"enterprise\": false,\n  \"cluster_name\":
    \"vault-cluster-acfb9930\",\n  \"cluster_id\": \"4d9162f4-e501-371b-7f94-bd60052b40a3\",\n
    \ \"echo_duration_ms\": 0,\n  \"clock_skew_ms\": 0,\n  \"replication_primary_canary_age_ms\":
    0\n}\n```\n\n## Step 1 - App\n\n- We need an app that requires secrets\n- app
    code in repo, essentially it's a python webserver to show the vault\n  values
    (obviously this would expose real secrets so it's just a demo)\n- Below is one
    of the endpoints in the vibe-coded app, just to illustrate that\n  we're going
    to give secrets to the app as environment variables (or as mounted\n  files!)\n-
    In the repo, the app is included and there's a `just build` which builds the docker
    image\n- There is also `just deploy` which handles loading the image into `kind`'s
    image cache\n\n```py\n\n# example route from demo-app - see git repo\n@app.get(\"/env\",
    response_class=HTMLResponse)\ndef show_env():\n    # ESO brings Vault secrets
    into environment variables\n    env_vars = dict(os.environ)\n\n    # Sort by category,
    then by key\n    sorted_items = sorted(env_vars.items(), key=lambda x: (classify_env(x[0]),
    x[0]))\n\n    cards = \"\".join(create_card(k, v) for k, v in sorted_items)\n\n
    \   secret_count = sum(1 for k in env_vars if k in SECRET_KEYS)\n    config_count
    = sum(1 for k in env_vars if k in CONFIG_KEYS)\n    system_count = len(env_vars)
    - secret_count - config_count\n\n    html = HTML_TEMPLATE.format(\n        cards=cards,\n
    \       secret_count=secret_count,\n        config_count=config_count,\n        system_count=system_count,\n
    \   )\n\n    return HTMLResponse(content=html)\n\ndef read_mounted_files(directory:
    str) -> dict:\n    \"\"\"Read all files from a mounted directory.\"\"\"\n    files_data
    = {}\n    if os.path.exists(directory) and os.path.isdir(directory):\n        for
    filename in os.listdir(directory):\n            filepath = os.path.join(directory,
    filename)\n            if os.path.isfile(filepath):\n                try:\n                    with
    open(filepath, \"r\") as f:\n                        files_data[filename] = f.read().strip()\n
    \               except Exception as e:\n                    files_data[filename]
    = f\"<Error reading file: {e}>\"\n    return files_data\n\n```\n\n## Step 2 -
    Cluster\n\n- use `kind` to bring up a cluster\n- this will start a few docker
    containers to act as your control-plane and workers\n\n```yml\n# kind-config.yml\nkind:
    Cluster\napiVersion: kind.x-k8s.io/v1alpha4\nname: eso-demo\nnodes:\n  - role:
    control-plane\n    extraPortMappings:\n      - containerPort: 30080\n        hostPort:
    58080\n        protocol: TCP\n  - role: worker\n```\n\n```\nkind create cluster
    --config kind-config.yaml --name eso-demo\n```\n\n## Step 3 - External Secrets
    Operator\n\n- installed with [[helm]] from the official helm chart\n- NOTE: this
    is the Operator, not the secrets... this is the thing which goes\n  to the secrets
    backend and creates kubernetes secrets\n\n```\nhelm repo add external-secrets
    https://charts.external-secrets.io 2>/dev/null || true\nhelm repo update\nhelm
    install external-secrets external-secrets/external-secrets \\\n  --namespace external-secrets
    \\\n  --create-namespace \\\n  --wait\n```\n\nIn the repo this is mostly `just
    eso-install`\n\n## Step 3.5 - Secretstore\n\n- You need a `clustersecretstore`
    to be the place that ESO puts secrets\n\n```\napiVersion: external-secrets.io/v1\nkind:
    ClusterSecretStore\nmetadata:\n  name: vault-backend\nspec:\n  provider:\n    vault:\n
    \     server: \"http://10.10.0.1:58200\"\n      path: \"secret\"\n      version:
    \"v2\"\n      auth:\n        tokenSecretRef:\n          name: vault-token\n          key:
    token\n          namespace: external-secrets\n\n```\n\n## Step 4 - Secrets\n\n-
    Secrets go in the `clustersecretstore`\n  - in this example it's called 'vault-backend'\n-
    In the demo we can just `kubectl apply -f <manifest>` to deploy the secret to\n
    \ the cluster\n- In practice this should be handled by something more mature than
    raw-doggin\n  kubectl commands\n\n```yml\n# manifests/external-secrets.yml\n---\napiVersion:
    external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n  name: demo-app-secrets\n
    \ namespace: default\nspec:\n  refreshInterval: \"10s\"\n  secretStoreRef:\n    kind:
    ClusterSecretStore\n    name: vault-backend\n  target:\n    name: demo-app-secrets\n
    \   creationPolicy: Owner\n  data:\n    - secretKey: DATABASE_PASSWORD\n      remoteRef:\n
    \       key: secret/data/demo-app/secrets\n        property: database_password\n
    \   - secretKey: API_KEY\n      remoteRef:\n        key: secret/data/demo-app/secrets\n
    \       property: api_key\n```\n\n## Step 4.1 - Files\n\n- ESO supports mounting
    files to containers as well through special `ExternalSecret` resources\n- One
    of the example seecrets is a TLS certificate\n\n```yml\n# manifests/external-secrets-files.yml\n---\n#
    File-based ExternalSecret for TLS certificates\n# These will be mounted as files
    in /etc/secrets/\napiVersion: external-secrets.io/v1\nkind: ExternalSecret\nmetadata:\n
    \ name: demo-app-tls-files\n  namespace: default\nspec:\n  refreshInterval: \"10s\"\n
    \ secretStoreRef:\n    kind: ClusterSecretStore\n    name: vault-backend\n  target:\n
    \   name: demo-app-tls-files\n    creationPolicy: Owner\n    # Template to ensure
    proper file formatting\n    template:\n      type: Opaque\n      data:\n        tls.crt:
    \"{{ .tls_crt }}\"\n        tls.key: \"{{ .tls_key }}\"\n  data:\n    - secretKey:
    tls_crt\n      remoteRef:\n        key: secret/data/demo-app/tls-files\n        property:
    tls.crt\n    - secretKey: tls_key\n      remoteRef:\n        key: secret/data/demo-app/tls-files\n
    \       property: tls.key\n```\n\n- Notice how there's a `spec.target.template`
    which templates out the file\n  contents from the secret contents\n\n## Step 5
    - Helm Chart\n\n- This isn't about setting up a helm chart so I'm not going to
    explain a lot\n  but the working example is simple, not secure, and in the repo\n-
    The helm chart renders manifests - I've paired one down and added comments to\n
    \ the relevant things\n- The thing to just take note of is the reference of the
    secrets in the `envFrom` section\n\n```yml\n# deployment.yml\napiVersion: apps/v1\nkind:
    Deployment\nmetadata:\n  annotations:\n    meta.helm.sh/release-name: demo-app\n
    \   meta.helm.sh/release-namespace: default\n  name: demo-app\n  namespace: default\nspec:\n
    \ replicas: 1\n  template:\n    metadata:\n      labels:\n        app.kubernetes.io/instance:
    demo-app\n        app.kubernetes.io/name: demo-app\n    spec:\n      containers:\n
    \       - envFrom:\n            - secretRef:\n                name: demo-app-secrets
    # name of example secret from section 4\n            - secretRef:\n                name:
    demo-app-config # another example in the repo\n          image: demo-app:latest
    # the image you built and loaded into kind - simple 'just' recipe in the repo\n
    \         imagePullPolicy: Never\n          name: demo-app\n          volumeMounts:\n
    \           - mountPath: /etc/secrets\n              name: secrets-volume\n              readOnly:
    true\n            - mountPath: /etc/config\n              name: configs-volume\n
    \             readOnly: true\n      volumes:\n        - name: secrets-volume\n
    \         secret:\n            defaultMode: 420\n            secretName: demo-app-tls-files
    # example secret file from section 4.1\n        - name: configs-volume\n          secret:\n
    \           defaultMode: 420\n            secretName: demo-app-config-files\n```\n\n##
    Step 5.1 - Deploy\n\n- We can deploy the demo-app from the git repo to the cluster\n-
    For a local demo a few things happen\n  - local image build\n  - loading that
    image into [[kind]] (`kind` doesn't have access to your host's docker image cache,
    so images need to be loaded into the cluster cache)\n- `just deploy` takes care
    of this for you, read the recipe in the repo if\n  you're interested in more there,
    the focus of this post and example are to\n  briefly show how to use ESO though\n\n##
    Step 6 - Profit\n\nThe example app just displays things that are mounted in -
    totally vibe-coded\nto illustrate the secrets mounting, not the appropriate way
    to leak secrets.\n\n![20260210233804_614254b7.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233804_614254b7.png)\n\n![20260210233828_19852225.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233828_19852225.png)\n"
published: true
slug: kubernetes-external-secrets-operator
title: Kubernetes External Secrets Operator


---

I wanted to put a short demo together of using External Secrets Operator (ESO)
to expose secrets from a vault (like Hashicorp Vault, AWS Secrets Manager, etc)
to services running in kubernetes

Demo code is [here in this github repo](https://github.com/pypeaday/blog-kubernetes-external-secrets-operator-demo)

This post is a high level overview of the components, see the repo for the full example.

## Setup

- [[docker]] for containerized development
- [[kind]] for setting up a quick cluster
- [[kubectl]] for accessing the cluster
- [[helm]] for installing ArgoCD and ESO

- and then [justfile](https://github.com/casey/just) is there to wrap the commands to easier execution

## Step 0 - Vault

- for the demo we'll setup Hashicorp Vault in docker compose to easily bring it
  up and down
- and the init-script is in the repo - it uses curl to make some secrets in
  vault that we'll reference later

```yml
services:
  vault:
    image: hashicorp/vault:1.18
    container_name: vault
    ports:
      - "58200:8200
    environment:
      VAULT_DEV_ROOT_TOKEN_ID: root
      VAULT_DEV_LISTEN_ADDRESS: 0.0.0.0:8200
    volumes:
      - vault-data:/vault/file
    cap_add:
      - IPC_LOCK
    command: server -dev -dev-root-token-id=root

volumes:
  vault-data:
```

- bringing up the vault instance is a simple `docker compose up` (use the just recipes which some `curl` commands for checking status etc.)

```bash
curl -s http://localhost:58200/v1/sys/health | jq .  # or just vault-status
{
  "initialized": true,
  "sealed": false,
  "standby": false,
  "performance_standby": false,
  "replication_performance_mode": "disabled",
  "replication_dr_mode": "disabled",
  "server_time_utc": 1770893657,
  "version": "1.18.5",
  "enterprise": false,
  "cluster_name": "vault-cluster-acfb9930",
  "cluster_id": "4d9162f4-e501-371b-7f94-bd60052b40a3",
  "echo_duration_ms": 0,
  "clock_skew_ms": 0,
  "replication_primary_canary_age_ms": 0
}
```

## Step 1 - App

- We need an app that requires secrets
- app code in repo, essentially it's a python webserver to show the vault
  values (obviously this would expose real secrets so it's just a demo)
- Below is one of the endpoints in the vibe-coded app, just to illustrate that
  we're going to give secrets to the app as environment variables (or as mounted
  files!)
- In the repo, the app is included and there's a `just build` which builds the docker image
- There is also `just deploy` which handles loading the image into `kind`'s image cache

```py

# example route from demo-app - see git repo
@app.get("/env", response_class=HTMLResponse)
def show_env():
    # ESO brings Vault secrets into environment variables
    env_vars = dict(os.environ)

    # Sort by category, then by key
    sorted_items = sorted(env_vars.items(), key=lambda x: (classify_env(x[0]), x[0]))

    cards = "".join(create_card(k, v) for k, v in sorted_items)

    secret_count = sum(1 for k in env_vars if k in SECRET_KEYS)
    config_count = sum(1 for k in env_vars if k in CONFIG_KEYS)
    system_count = len(env_vars) - secret_count - config_count

    html = HTML_TEMPLATE.format(
        cards=cards,
        secret_count=secret_count,
        config_count=config_count,
        system_count=system_count,
    )

    return HTMLResponse(content=html)

def read_mounted_files(directory: str) -> dict:
    """Read all files from a mounted directory."""
    files_data = {}
    if os.path.exists(directory) and os.path.isdir(directory):
        for filename in os.listdir(directory):
            filepath = os.path.join(directory, filename)
            if os.path.isfile(filepath):
                try:
                    with open(filepath, "r") as f:
                        files_data[filename] = f.read().strip()
                except Exception as e:
                    files_data[filename] = f"<Error reading file: {e}>"
    return files_data

```

## Step 2 - Cluster

- use `kind` to bring up a cluster
- this will start a few docker containers to act as your control-plane and workers

```yml
# kind-config.yml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: eso-demo
nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 30080
        hostPort: 58080
        protocol: TCP
  - role: worker
```

```
kind create cluster --config kind-config.yaml --name eso-demo
```

## Step 3 - External Secrets Operator

- installed with [[helm]] from the official helm chart
- NOTE: this is the Operator, not the secrets... this is the thing which goes
  to the secrets backend and creates kubernetes secrets

```
helm repo add external-secrets https://charts.external-secrets.io 2>/dev/null || true
helm repo update
helm install external-secrets external-secrets/external-secrets \
  --namespace external-secrets \
  --create-namespace \
  --wait
```

In the repo this is mostly `just eso-install`

## Step 3.5 - Secretstore

- You need a `clustersecretstore` to be the place that ESO puts secrets

```
apiVersion: external-secrets.io/v1
kind: ClusterSecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "http://10.10.0.1:58200"
      path: "secret"
      version: "v2"
      auth:
        tokenSecretRef:
          name: vault-token
          key: token
          namespace: external-secrets

```

## Step 4 - Secrets

- Secrets go in the `clustersecretstore`
  - in this example it's called 'vault-backend'
- In the demo we can just `kubectl apply -f <manifest>` to deploy the secret to
  the cluster
- In practice this should be handled by something more mature than raw-doggin
  kubectl commands

```yml
# manifests/external-secrets.yml
---
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: demo-app-secrets
  namespace: default
spec:
  refreshInterval: "10s"
  secretStoreRef:
    kind: ClusterSecretStore
    name: vault-backend
  target:
    name: demo-app-secrets
    creationPolicy: Owner
  data:
    - secretKey: DATABASE_PASSWORD
      remoteRef:
        key: secret/data/demo-app/secrets
        property: database_password
    - secretKey: API_KEY
      remoteRef:
        key: secret/data/demo-app/secrets
        property: api_key
```

## Step 4.1 - Files

- ESO supports mounting files to containers as well through special `ExternalSecret` resources
- One of the example seecrets is a TLS certificate

```yml
# manifests/external-secrets-files.yml
---
# File-based ExternalSecret for TLS certificates
# These will be mounted as files in /etc/secrets/
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: demo-app-tls-files
  namespace: default
spec:
  refreshInterval: "10s"
  secretStoreRef:
    kind: ClusterSecretStore
    name: vault-backend
  target:
    name: demo-app-tls-files
    creationPolicy: Owner
    # Template to ensure proper file formatting
    template:
      type: Opaque
      data:
        tls.crt: "{{ .tls_crt }}"
        tls.key: "{{ .tls_key }}"
  data:
    - secretKey: tls_crt
      remoteRef:
        key: secret/data/demo-app/tls-files
        property: tls.crt
    - secretKey: tls_key
      remoteRef:
        key: secret/data/demo-app/tls-files
        property: tls.key
```

- Notice how there's a `spec.target.template` which templates out the file
  contents from the secret contents

## Step 5 - Helm Chart

- This isn't about setting up a helm chart so I'm not going to explain a lot
  but the working example is simple, not secure, and in the repo
- The helm chart renders manifests - I've paired one down and added comments to
  the relevant things
- The thing to just take note of is the reference of the secrets in the `envFrom` section

```yml
# deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    meta.helm.sh/release-name: demo-app
    meta.helm.sh/release-namespace: default
  name: demo-app
  namespace: default
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app.kubernetes.io/instance: demo-app
        app.kubernetes.io/name: demo-app
    spec:
      containers:
        - envFrom:
            - secretRef:
                name: demo-app-secrets # name of example secret from section 4
            - secretRef:
                name: demo-app-config # another example in the repo
          image: demo-app:latest # the image you built and loaded into kind - simple 'just' recipe in the repo
          imagePullPolicy: Never
          name: demo-app
          volumeMounts:
            - mountPath: /etc/secrets
              name: secrets-volume
              readOnly: true
            - mountPath: /etc/config
              name: configs-volume
              readOnly: true
      volumes:
        - name: secrets-volume
          secret:
            defaultMode: 420
            secretName: demo-app-tls-files # example secret file from section 4.1
        - name: configs-volume
          secret:
            defaultMode: 420
            secretName: demo-app-config-files
```

## Step 5.1 - Deploy

- We can deploy the demo-app from the git repo to the cluster
- For a local demo a few things happen
  - local image build
  - loading that image into [[kind]] (`kind` doesn't have access to your host's docker image cache, so images need to be loaded into the cluster cache)
- `just deploy` takes care of this for you, read the recipe in the repo if
  you're interested in more there, the focus of this post and example are to
  briefly show how to use ESO though

## Step 6 - Profit

The example app just displays things that are mounted in - totally vibe-coded
to illustrate the secrets mounting, not the appropriate way to leak secrets.

![20260210233804_614254b7.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233804_614254b7.png)

![20260210233828_19852225.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260210233828_19852225.png)