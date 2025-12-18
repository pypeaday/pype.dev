---
content: "I am cooking up some stuff at home and want to put it on the interwebs,
  but I\ndon't want it on the same infra as my homelab. Now... I only have a server
  or\n2, so to some degree it will be, but networking-wise I didn't want to funnel\nextra
  traffic through my reverse proxy.\n\nSo, I'd heard about Cloudflare Tunnels - they
  sound like P2P VPN to me, but I\nknow there's layers of the networking stack I'm
  blatantly ignoring. \"What the\ntunnel is\" isn't much the point - I'm here to show
  you how to set one up and\nget yourself a fancy <https://app.mydomain.com> for your
  web app running\nkind of wherever you want\n\n> Example Repo linked at the bottom\n\n##
  Requirements\n\n0. Terraform or open-tofu. I currently use open-tofu but either
  would be fine.\n   `brew install open-tofu` is a simple way to get going\n1. Cloudflare
  account with a domain\n2. API token with permissions:\n   - `Account:Cloudflare
  Tunnel:Edit`\n   - `Zone:DNS:Edit`\n3. `cloudflared` (the example repo runs cloudflared
  in a docker compose stack)\n\n## Tunnel\n\nThe module is simple and has just a few
  resources:\n\n```bash\n\u276F tofu state list\nmodule.tunnel.cloudflare_record.tunnel\nmodule.tunnel.cloudflare_tunnel_config.this\nmodule.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this\nmodule.tunnel.random_id.tunnel_secret\n\n```\n\nWe
  see there will be the a DNS record that tofu references by the key \"tunnel\".\nThere
  is a tunnel configuration resource, the tunnel resource itself, and\nfinally the
  associated secret required for the cloudflared daemon that will run\nalongside your
  webapp.\n\nTo get started you'll need to fill out the example `terraform.tfvars`
  file with\nyour info:\n\n```hcl\n# Copy to terraform.tfvars and fill in values\n#
  DO NOT commit terraform.tfvars to git\n\ncloudflare_api_token  = \"your-api-token-here\"\ncloudflare_account_id
  = \"your-account-id\"\ncloudflare_zone_id    = \"your-zone-id\"\ndomain                =
  \"example.com\"\nsubdomain             = \"app\"\ntunnel_name           = \"my-tunnel\"\norigin_service
  \       = \"http://localhost:8000\"\n```\n\nYou can grab your account id and zone
  id from Cloudflare's dashboard for your\ndomain. It's near the bottom of the Overview
  page\n\n![20251213113332_0e0f09b8.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213113332_0e0f09b8.png)\n\nThen
  I presume you have a domain already, but if not hop over to namecheap to\nsnag one
  and then register it with cloudflare so they can manage your DNS. I\nhave terraform
  for this as well, a future blog post will combine this with a\nfuller terraform'd
  cloudflare setup for simple domain use cases\n\nOnce you fill those out, hit it
  with the `tofu init` and `tofu plan` to see what's up\n\n> NOTE: `terraform.tfvars`
  is automatically sourced by terraform/tofu, you can name the file differently and
  then pass `-var-file=myvars.tfvars` to the commands\n\nThe initial plan should look
  something like this:\n\n```bash\n\nOpenTofu used the selected providers to generate
  the following execution plan. Resource actions are indicated with the following
  symbols:\n  + create\n\nOpenTofu will perform the following actions:\n\n  # module.tunnel.cloudflare_record.tunnel
  will be created\n  + resource \"cloudflare_record\" \"tunnel\" {\n      + allow_overwrite
  = false\n      + comment         = \"Managed by Terraform - soonish-tunnel\"\n      +
  content         = (known after apply)\n      + created_on      = (known after apply)\n
  \     + hostname        = (known after apply)\n      + id              = (known
  after apply)\n      + metadata        = (known after apply)\n      + modified_on
  \    = (known after apply)\n      + name            = \"app\"\n      + proxiable
  \      = (known after apply)\n      + proxied         = true\n      + ttl             =
  (known after apply)\n      + type            = \"CNAME\"\n      + value           =
  (known after apply)\n      + zone_id         = \"<REDACTED>\"\n    }\n\n  # module.tunnel.cloudflare_tunnel_config.this
  will be created\n  + resource \"cloudflare_tunnel_config\" \"this\" {\n      + account_id
  = \"<REDACTED>\"\n      + id         = (known after apply)\n      + tunnel_id  =
  (known after apply)\n\n      + config {\n          + ingress_rule {\n              +
  hostname = \"app.notifiq.net\"\n              + service  = \"http://localhost:8000\"\n
  \           }\n          + ingress_rule {\n              + service = \"http_status:404\"\n
  \           }\n        }\n    }\n\n  # module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this
  will be created\n  + resource \"cloudflare_zero_trust_tunnel_cloudflared\" \"this\"
  {\n      + account_id   = \"<REDACTED>\"\n      + cname        = (known after apply)\n
  \     + id           = (known after apply)\n      + name         = \"soonish-tunnel\"\n
  \     + secret       = (sensitive value)\n      + tunnel_token = (sensitive value)\n
  \   }\n\n  # module.tunnel.random_id.tunnel_secret will be created\n  + resource
  \"random_id\" \"tunnel_secret\" {\n      + b64_std     = (known after apply)\n      +
  b64_url     = (known after apply)\n      + byte_length = 32\n      + dec         =
  (known after apply)\n      + hex         = (known after apply)\n      + id          =
  (known after apply)\n    }\n\nPlan: 4 to add, 0 to change, 0 to destroy.\n\n```\n\nAs
  long as that looks good you to, then we `tofu apply` next (type `yes` when\nasked
  or pass `-auto-approve`)\n\nAfterwards `tofu state list` should show you the 4 resources,
  and if you go to\nyour cloudflare zone's dashboard you should see the CNAME associated
  with the\ntunnel address\n\n![20251213120004_d199e5fd.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213120004_d199e5fd.png)\n\n##
  Daemon\n\nRun the compose stack or the binary itself. Get the token from terraform
  state with `tofu output -raw tunnel_token`.\n\n`TUNNEL_TOKEN=$(tofu output -raw
  tunnel_token) docker compose up -d` will do you nicely\n\nEnjoy your tunnel!\n\n[example
  repo](https://github.com/pypeaday/example-terraform-cloudflare-tunnel)"
date: 2025-12-12
description: 'I am cooking up some stuff at home and want to put it on the interwebs,
  but I

  don&#x27;t want it on the same infra as my homelab. Now... I only have a server
  or'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Setup A Cloudflare
    Tunnel With Terraform</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I am cooking up some stuff at home and want to put it on the interwebs,
    but I\ndon&#x27;t want it on the same infra as my homelab. Now... I only have
    a server or\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Setup A Cloudflare Tunnel With Terraform | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/setup-a-cloudflare-tunnel-with-terraform\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Setup A Cloudflare Tunnel With Terraform | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I am cooking up some stuff at home and want to put it on the interwebs,
    but I\ndon&#x27;t want it on the same infra as my homelab. Now... I only have
    a server or\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"
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
    \           <span class=\"site-terminal__dir\">~/setup-a-cloudflare-tunnel-with-terraform</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header>    <div class=\"post-terminal__search\">\n<div
    id='didyoumean'>\n    <div class=\"mb-0\">\n        <!-- <label for=\"search\"
    class=\"block text-sm font-medium mb-2\">Search for a page</label> -->\n        <input
    type=\"text\" id=\"search\"\n               class=\"w-full p-2 border rounded-md
    bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/'
    Search for a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
    gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"
    alt=\"Setup A Cloudflare Tunnel With Terraform cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Setup
    A Cloudflare Tunnel With Terraform</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-12-12\">\n            December
    12, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/tofu/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tofu\n
    \           </a>\n            <a href=\"https://pype.dev//tags/terraform/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #terraform\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I am cooking up some stuff at home
    and want to put it on the interwebs, but I\ndon't want it on the same infra as
    my homelab. Now... I only have a server or\n2, so to some degree it will be, but
    networking-wise I didn't want to funnel\nextra traffic through my reverse proxy.</p>\n<p>So,
    I'd heard about Cloudflare Tunnels - they sound like P2P VPN to me, but I\nknow
    there's layers of the networking stack I'm blatantly ignoring. &quot;What the\ntunnel
    is&quot; isn't much the point - I'm here to show you how to set one up and\nget
    yourself a fancy <a href=\"https://app.mydomain.com\">https://app.mydomain.com</a>
    for your web app running\nkind of wherever you want</p>\n<blockquote>\n<p>Example
    Repo linked at the bottom</p>\n</blockquote>\n<h2 id=\"requirements\">Requirements
    <a class=\"header-anchor\" href=\"#requirements\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol start=\"0\">\n<li>Terraform
    or open-tofu. I currently use open-tofu but either would be fine.\n<code>brew
    install open-tofu</code> is a simple way to get going</li>\n<li>Cloudflare account
    with a domain</li>\n<li>API token with permissions:\n<ul>\n<li><code>Account:Cloudflare
    Tunnel:Edit</code></li>\n<li><code>Zone:DNS:Edit</code></li>\n</ul>\n</li>\n<li><code>cloudflared</code>
    (the example repo runs cloudflared in a docker compose stack)</li>\n</ol>\n<h2
    id=\"tunnel\">Tunnel <a class=\"header-anchor\" href=\"#tunnel\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The module is simple
    and has just a few resources:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F<span class=\"w\">
    </span>tofu<span class=\"w\"> </span>state<span class=\"w\"> </span>list\nmodule.tunnel.cloudflare_record.tunnel\nmodule.tunnel.cloudflare_tunnel_config.this\nmodule.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this\nmodule.tunnel.random_id.tunnel_secret\n</pre></div>\n\n</pre>\n\n<p>We
    see there will be the a DNS record that tofu references by the key &quot;tunnel&quot;.\nThere
    is a tunnel configuration resource, the tunnel resource itself, and\nfinally the
    associated secret required for the cloudflared daemon that will run\nalongside
    your webapp.</p>\n<p>To get started you'll need to fill out the example <code>terraform.tfvars</code>
    file with\nyour info:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># Copy
    to terraform.tfvars and fill in values</span>\n<span class=\"c1\"># DO NOT commit
    terraform.tfvars to git</span>\n\n<span class=\"na\">cloudflare_api_token</span><span
    class=\"w\">  </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-api-token-here&quot;</span>\n<span class=\"na\">cloudflare_account_id</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-account-id&quot;</span>\n<span class=\"na\">cloudflare_zone_id</span><span
    class=\"w\">    </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-zone-id&quot;</span>\n<span class=\"na\">domain</span><span
    class=\"w\">                </span><span class=\"o\">=</span><span class=\"w\">
    </span><span class=\"s2\">&quot;example.com&quot;</span>\n<span class=\"na\">subdomain</span><span
    class=\"w\">             </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;app&quot;</span>\n<span class=\"na\">tunnel_name</span><span
    class=\"w\">           </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;my-tunnel&quot;</span>\n<span class=\"na\">origin_service</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;http://localhost:8000&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can grab your account id and zone id from Cloudflare's dashboard for your\ndomain.
    It's near the bottom of the Overview page</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213113332_0e0f09b8.png\"
    alt=\"20251213113332_0e0f09b8.png\" /></p>\n<p>Then I presume you have a domain
    already, but if not hop over to namecheap to\nsnag one and then register it with
    cloudflare so they can manage your DNS. I\nhave terraform for this as well, a
    future blog post will combine this with a\nfuller terraform'd cloudflare setup
    for simple domain use cases</p>\n<p>Once you fill those out, hit it with the <code>tofu
    init</code> and <code>tofu plan</code> to see what's up</p>\n<blockquote>\n<p>NOTE:
    <code>terraform.tfvars</code> is automatically sourced by terraform/tofu, you
    can name the file differently and then pass <code>-var-file=myvars.tfvars</code>
    to the commands</p>\n</blockquote>\n<p>The initial plan should look something
    like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>OpenTofu<span class=\"w\">
    </span>used<span class=\"w\"> </span>the<span class=\"w\"> </span>selected<span
    class=\"w\"> </span>providers<span class=\"w\"> </span>to<span class=\"w\"> </span>generate<span
    class=\"w\"> </span>the<span class=\"w\"> </span>following<span class=\"w\"> </span>execution<span
    class=\"w\"> </span>plan.<span class=\"w\"> </span>Resource<span class=\"w\">
    </span>actions<span class=\"w\"> </span>are<span class=\"w\"> </span>indicated<span
    class=\"w\"> </span>with<span class=\"w\"> </span>the<span class=\"w\"> </span>following<span
    class=\"w\"> </span>symbols:\n<span class=\"w\">  </span>+<span class=\"w\"> </span>create\n\nOpenTofu<span
    class=\"w\"> </span>will<span class=\"w\"> </span>perform<span class=\"w\"> </span>the<span
    class=\"w\"> </span>following<span class=\"w\"> </span>actions:\n\n<span class=\"w\">
    \ </span><span class=\"c1\"># module.tunnel.cloudflare_record.tunnel will be created</span>\n<span
    class=\"w\">  </span>+<span class=\"w\"> </span>resource<span class=\"w\"> </span><span
    class=\"s2\">&quot;cloudflare_record&quot;</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;tunnel&quot;</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">allow_overwrite</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">false</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">comment</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;Managed
    by Terraform - soonish-tunnel&quot;</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">content</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">created_on</span><span
    class=\"w\">      </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">hostname</span><span class=\"w\">        </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">id</span><span class=\"w\">              </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">metadata</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">modified_on</span><span class=\"w\">     </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">name</span><span class=\"w\">            </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;app&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">proxiable</span><span
    class=\"w\">       </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">proxied</span><span class=\"w\">         </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">true</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">ttl</span><span class=\"w\">             </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nb\">type</span><span
    class=\"w\">            </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;CNAME&quot;</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">value</span><span class=\"w\">           </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">zone_id</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># module.tunnel.cloudflare_tunnel_config.this
    will be created</span>\n<span class=\"w\">  </span>+<span class=\"w\"> </span>resource<span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare_tunnel_config&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;this&quot;</span><span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">account_id</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">id</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">tunnel_id</span><span class=\"w\">  </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span>config<span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">          </span>+<span class=\"w\"> </span>ingress_rule<span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">              </span>+<span
    class=\"w\"> </span><span class=\"nv\">hostname</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;app.notifiq.net&quot;</span>\n<span
    class=\"w\">              </span>+<span class=\"w\"> </span><span class=\"nv\">service</span><span
    class=\"w\">  </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;http://localhost:8000&quot;</span>\n<span class=\"w\">            </span><span
    class=\"o\">}</span>\n<span class=\"w\">          </span>+<span class=\"w\"> </span>ingress_rule<span
    class=\"w\"> </span><span class=\"o\">{</span>\n<span class=\"w\">              </span>+<span
    class=\"w\"> </span><span class=\"nv\">service</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;http_status:404&quot;</span>\n<span
    class=\"w\">            </span><span class=\"o\">}</span>\n<span class=\"w\">
    \       </span><span class=\"o\">}</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this
    will be created</span>\n<span class=\"w\">  </span>+<span class=\"w\"> </span>resource<span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare_zero_trust_tunnel_cloudflared&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;this&quot;</span><span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">account_id</span><span class=\"w\">   </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">cname</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">id</span><span class=\"w\">           </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">name</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;soonish-tunnel&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">secret</span><span
    class=\"w\">       </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>sensitive<span class=\"w\"> </span>value<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">tunnel_token</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>sensitive<span class=\"w\"> </span>value<span class=\"o\">)</span>\n<span
    class=\"w\">    </span><span class=\"o\">}</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\"># module.tunnel.random_id.tunnel_secret will be created</span>\n<span
    class=\"w\">  </span>+<span class=\"w\"> </span>resource<span class=\"w\"> </span><span
    class=\"s2\">&quot;random_id&quot;</span><span class=\"w\"> </span><span class=\"s2\">&quot;tunnel_secret&quot;</span><span
    class=\"w\"> </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">b64_std</span><span class=\"w\">     </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">b64_url</span><span
    class=\"w\">     </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">byte_length</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"m\">32</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">dec</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">hex</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">id</span><span class=\"w\">          </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\nPlan:<span class=\"w\"> </span><span class=\"m\">4</span><span
    class=\"w\"> </span>to<span class=\"w\"> </span>add,<span class=\"w\"> </span><span
    class=\"m\">0</span><span class=\"w\"> </span>to<span class=\"w\"> </span>change,<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span>to<span
    class=\"w\"> </span>destroy.\n</pre></div>\n\n</pre>\n\n<p>As long as that looks
    good you to, then we <code>tofu apply</code> next (type <code>yes</code> when\nasked
    or pass <code>-auto-approve</code>)</p>\n<p>Afterwards <code>tofu state list</code>
    should show you the 4 resources, and if you go to\nyour cloudflare zone's dashboard
    you should see the CNAME associated with the\ntunnel address</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213120004_d199e5fd.png\"
    alt=\"20251213120004_d199e5fd.png\" /></p>\n<h2 id=\"daemon\">Daemon <a class=\"header-anchor\"
    href=\"#daemon\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Run the compose stack
    or the binary itself. Get the token from terraform state with <code>tofu output
    -raw tunnel_token</code>.</p>\n<p><code>TUNNEL_TOKEN=$(tofu output -raw tunnel_token)
    docker compose up -d</code> will do you nicely</p>\n<p>Enjoy your tunnel!</p>\n<p><a
    href=\"https://github.com/pypeaday/example-terraform-cloudflare-tunnel\">example
    repo</a></p>\n\n        </section>\n    </article>\n</section>        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Setup A Cloudflare
    Tunnel With Terraform</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I am cooking up some stuff at home and want to put it on the interwebs,
    but I\ndon&#x27;t want it on the same infra as my homelab. Now... I only have
    a server or\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Setup A Cloudflare Tunnel With Terraform | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/setup-a-cloudflare-tunnel-with-terraform\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Setup A Cloudflare Tunnel With Terraform | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I am cooking up some stuff at home and want to put it on the interwebs,
    but I\ndon&#x27;t want it on the same infra as my homelab. Now... I only have
    a server or\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"
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
    mb-4 post-title-large\">Setup A Cloudflare Tunnel With Terraform</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-12-12\">\n
    \           December 12, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/tofu/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tofu\n
    \           </a>\n            <a href=\"https://pype.dev//tags/terraform/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #terraform\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"
    alt=\"Setup A Cloudflare Tunnel With Terraform cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Setup
    A Cloudflare Tunnel With Terraform</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-12-12\">\n            December
    12, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/tofu/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tofu\n
    \           </a>\n            <a href=\"https://pype.dev//tags/terraform/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #terraform\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I am cooking up some stuff at home
    and want to put it on the interwebs, but I\ndon't want it on the same infra as
    my homelab. Now... I only have a server or\n2, so to some degree it will be, but
    networking-wise I didn't want to funnel\nextra traffic through my reverse proxy.</p>\n<p>So,
    I'd heard about Cloudflare Tunnels - they sound like P2P VPN to me, but I\nknow
    there's layers of the networking stack I'm blatantly ignoring. &quot;What the\ntunnel
    is&quot; isn't much the point - I'm here to show you how to set one up and\nget
    yourself a fancy <a href=\"https://app.mydomain.com\">https://app.mydomain.com</a>
    for your web app running\nkind of wherever you want</p>\n<blockquote>\n<p>Example
    Repo linked at the bottom</p>\n</blockquote>\n<h2 id=\"requirements\">Requirements
    <a class=\"header-anchor\" href=\"#requirements\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol start=\"0\">\n<li>Terraform
    or open-tofu. I currently use open-tofu but either would be fine.\n<code>brew
    install open-tofu</code> is a simple way to get going</li>\n<li>Cloudflare account
    with a domain</li>\n<li>API token with permissions:\n<ul>\n<li><code>Account:Cloudflare
    Tunnel:Edit</code></li>\n<li><code>Zone:DNS:Edit</code></li>\n</ul>\n</li>\n<li><code>cloudflared</code>
    (the example repo runs cloudflared in a docker compose stack)</li>\n</ol>\n<h2
    id=\"tunnel\">Tunnel <a class=\"header-anchor\" href=\"#tunnel\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The module is simple
    and has just a few resources:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F<span class=\"w\">
    </span>tofu<span class=\"w\"> </span>state<span class=\"w\"> </span>list\nmodule.tunnel.cloudflare_record.tunnel\nmodule.tunnel.cloudflare_tunnel_config.this\nmodule.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this\nmodule.tunnel.random_id.tunnel_secret\n</pre></div>\n\n</pre>\n\n<p>We
    see there will be the a DNS record that tofu references by the key &quot;tunnel&quot;.\nThere
    is a tunnel configuration resource, the tunnel resource itself, and\nfinally the
    associated secret required for the cloudflared daemon that will run\nalongside
    your webapp.</p>\n<p>To get started you'll need to fill out the example <code>terraform.tfvars</code>
    file with\nyour info:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># Copy
    to terraform.tfvars and fill in values</span>\n<span class=\"c1\"># DO NOT commit
    terraform.tfvars to git</span>\n\n<span class=\"na\">cloudflare_api_token</span><span
    class=\"w\">  </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-api-token-here&quot;</span>\n<span class=\"na\">cloudflare_account_id</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-account-id&quot;</span>\n<span class=\"na\">cloudflare_zone_id</span><span
    class=\"w\">    </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-zone-id&quot;</span>\n<span class=\"na\">domain</span><span
    class=\"w\">                </span><span class=\"o\">=</span><span class=\"w\">
    </span><span class=\"s2\">&quot;example.com&quot;</span>\n<span class=\"na\">subdomain</span><span
    class=\"w\">             </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;app&quot;</span>\n<span class=\"na\">tunnel_name</span><span
    class=\"w\">           </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;my-tunnel&quot;</span>\n<span class=\"na\">origin_service</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;http://localhost:8000&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can grab your account id and zone id from Cloudflare's dashboard for your\ndomain.
    It's near the bottom of the Overview page</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213113332_0e0f09b8.png\"
    alt=\"20251213113332_0e0f09b8.png\" /></p>\n<p>Then I presume you have a domain
    already, but if not hop over to namecheap to\nsnag one and then register it with
    cloudflare so they can manage your DNS. I\nhave terraform for this as well, a
    future blog post will combine this with a\nfuller terraform'd cloudflare setup
    for simple domain use cases</p>\n<p>Once you fill those out, hit it with the <code>tofu
    init</code> and <code>tofu plan</code> to see what's up</p>\n<blockquote>\n<p>NOTE:
    <code>terraform.tfvars</code> is automatically sourced by terraform/tofu, you
    can name the file differently and then pass <code>-var-file=myvars.tfvars</code>
    to the commands</p>\n</blockquote>\n<p>The initial plan should look something
    like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>OpenTofu<span class=\"w\">
    </span>used<span class=\"w\"> </span>the<span class=\"w\"> </span>selected<span
    class=\"w\"> </span>providers<span class=\"w\"> </span>to<span class=\"w\"> </span>generate<span
    class=\"w\"> </span>the<span class=\"w\"> </span>following<span class=\"w\"> </span>execution<span
    class=\"w\"> </span>plan.<span class=\"w\"> </span>Resource<span class=\"w\">
    </span>actions<span class=\"w\"> </span>are<span class=\"w\"> </span>indicated<span
    class=\"w\"> </span>with<span class=\"w\"> </span>the<span class=\"w\"> </span>following<span
    class=\"w\"> </span>symbols:\n<span class=\"w\">  </span>+<span class=\"w\"> </span>create\n\nOpenTofu<span
    class=\"w\"> </span>will<span class=\"w\"> </span>perform<span class=\"w\"> </span>the<span
    class=\"w\"> </span>following<span class=\"w\"> </span>actions:\n\n<span class=\"w\">
    \ </span><span class=\"c1\"># module.tunnel.cloudflare_record.tunnel will be created</span>\n<span
    class=\"w\">  </span>+<span class=\"w\"> </span>resource<span class=\"w\"> </span><span
    class=\"s2\">&quot;cloudflare_record&quot;</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;tunnel&quot;</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">allow_overwrite</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">false</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">comment</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;Managed
    by Terraform - soonish-tunnel&quot;</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">content</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">created_on</span><span
    class=\"w\">      </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">hostname</span><span class=\"w\">        </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">id</span><span class=\"w\">              </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">metadata</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">modified_on</span><span class=\"w\">     </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">name</span><span class=\"w\">            </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;app&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">proxiable</span><span
    class=\"w\">       </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">proxied</span><span class=\"w\">         </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">true</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">ttl</span><span class=\"w\">             </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nb\">type</span><span
    class=\"w\">            </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;CNAME&quot;</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">value</span><span class=\"w\">           </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">zone_id</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># module.tunnel.cloudflare_tunnel_config.this
    will be created</span>\n<span class=\"w\">  </span>+<span class=\"w\"> </span>resource<span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare_tunnel_config&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;this&quot;</span><span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">account_id</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">id</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">tunnel_id</span><span class=\"w\">  </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span>config<span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">          </span>+<span class=\"w\"> </span>ingress_rule<span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">              </span>+<span
    class=\"w\"> </span><span class=\"nv\">hostname</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;app.notifiq.net&quot;</span>\n<span
    class=\"w\">              </span>+<span class=\"w\"> </span><span class=\"nv\">service</span><span
    class=\"w\">  </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;http://localhost:8000&quot;</span>\n<span class=\"w\">            </span><span
    class=\"o\">}</span>\n<span class=\"w\">          </span>+<span class=\"w\"> </span>ingress_rule<span
    class=\"w\"> </span><span class=\"o\">{</span>\n<span class=\"w\">              </span>+<span
    class=\"w\"> </span><span class=\"nv\">service</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;http_status:404&quot;</span>\n<span
    class=\"w\">            </span><span class=\"o\">}</span>\n<span class=\"w\">
    \       </span><span class=\"o\">}</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this
    will be created</span>\n<span class=\"w\">  </span>+<span class=\"w\"> </span>resource<span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare_zero_trust_tunnel_cloudflared&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;this&quot;</span><span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">account_id</span><span class=\"w\">   </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">cname</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">id</span><span class=\"w\">           </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">name</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;soonish-tunnel&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">secret</span><span
    class=\"w\">       </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>sensitive<span class=\"w\"> </span>value<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">tunnel_token</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>sensitive<span class=\"w\"> </span>value<span class=\"o\">)</span>\n<span
    class=\"w\">    </span><span class=\"o\">}</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\"># module.tunnel.random_id.tunnel_secret will be created</span>\n<span
    class=\"w\">  </span>+<span class=\"w\"> </span>resource<span class=\"w\"> </span><span
    class=\"s2\">&quot;random_id&quot;</span><span class=\"w\"> </span><span class=\"s2\">&quot;tunnel_secret&quot;</span><span
    class=\"w\"> </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">b64_std</span><span class=\"w\">     </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">b64_url</span><span
    class=\"w\">     </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">byte_length</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"m\">32</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">dec</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">hex</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">id</span><span class=\"w\">          </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\nPlan:<span class=\"w\"> </span><span class=\"m\">4</span><span
    class=\"w\"> </span>to<span class=\"w\"> </span>add,<span class=\"w\"> </span><span
    class=\"m\">0</span><span class=\"w\"> </span>to<span class=\"w\"> </span>change,<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span>to<span
    class=\"w\"> </span>destroy.\n</pre></div>\n\n</pre>\n\n<p>As long as that looks
    good you to, then we <code>tofu apply</code> next (type <code>yes</code> when\nasked
    or pass <code>-auto-approve</code>)</p>\n<p>Afterwards <code>tofu state list</code>
    should show you the 4 resources, and if you go to\nyour cloudflare zone's dashboard
    you should see the CNAME associated with the\ntunnel address</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213120004_d199e5fd.png\"
    alt=\"20251213120004_d199e5fd.png\" /></p>\n<h2 id=\"daemon\">Daemon <a class=\"header-anchor\"
    href=\"#daemon\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Run the compose stack
    or the binary itself. Get the token from terraform state with <code>tofu output
    -raw tunnel_token</code>.</p>\n<p><code>TUNNEL_TOKEN=$(tofu output -raw tunnel_token)
    docker compose up -d</code> will do you nicely</p>\n<p>Enjoy your tunnel!</p>\n<p><a
    href=\"https://github.com/pypeaday/example-terraform-cloudflare-tunnel\">example
    repo</a></p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Setup A
    Cloudflare Tunnel With Terraform</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I am cooking up some stuff at home and want to put it on the interwebs,
    but I\ndon&#x27;t want it on the same infra as my homelab. Now... I only have
    a server or\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Setup A Cloudflare Tunnel With Terraform | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/setup-a-cloudflare-tunnel-with-terraform\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Setup A Cloudflare Tunnel With Terraform | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I am cooking up some stuff at home and want to put it on the interwebs,
    but I\ndon&#x27;t want it on the same infra as my homelab. Now... I only have
    a server or\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"
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
    \           <span class=\"site-terminal__dir\">~/setup-a-cloudflare-tunnel-with-terraform</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header><div id='didyoumean'>\n    <div
    class=\"mb-0\">\n        <!-- <label for=\"search\" class=\"block text-sm font-medium
    mb-2\">Search for a page</label> -->\n        <input type=\"text\" id=\"search\"\n
    \              class=\"w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800
    focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/' Search for
    a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
    gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    <!--
    Content is handled by the password protection plugin -->\n    <p>I am cooking
    up some stuff at home and want to put it on the interwebs, but I\ndon't want it
    on the same infra as my homelab. Now... I only have a server or\n2, so to some
    degree it will be, but networking-wise I didn't want to funnel\nextra traffic
    through my reverse proxy.</p>\n<p>So, I'd heard about Cloudflare Tunnels - they
    sound like P2P VPN to me, but I\nknow there's layers of the networking stack I'm
    blatantly ignoring. &quot;What the\ntunnel is&quot; isn't much the point - I'm
    here to show you how to set one up and\nget yourself a fancy <a href=\"https://app.mydomain.com\">https://app.mydomain.com</a>
    for your web app running\nkind of wherever you want</p>\n<blockquote>\n<p>Example
    Repo linked at the bottom</p>\n</blockquote>\n<h2 id=\"requirements\">Requirements
    <a class=\"header-anchor\" href=\"#requirements\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol start=\"0\">\n<li>Terraform
    or open-tofu. I currently use open-tofu but either would be fine.\n<code>brew
    install open-tofu</code> is a simple way to get going</li>\n<li>Cloudflare account
    with a domain</li>\n<li>API token with permissions:\n<ul>\n<li><code>Account:Cloudflare
    Tunnel:Edit</code></li>\n<li><code>Zone:DNS:Edit</code></li>\n</ul>\n</li>\n<li><code>cloudflared</code>
    (the example repo runs cloudflared in a docker compose stack)</li>\n</ol>\n<h2
    id=\"tunnel\">Tunnel <a class=\"header-anchor\" href=\"#tunnel\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The module is simple
    and has just a few resources:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F<span class=\"w\">
    </span>tofu<span class=\"w\"> </span>state<span class=\"w\"> </span>list\nmodule.tunnel.cloudflare_record.tunnel\nmodule.tunnel.cloudflare_tunnel_config.this\nmodule.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this\nmodule.tunnel.random_id.tunnel_secret\n</pre></div>\n\n</pre>\n\n<p>We
    see there will be the a DNS record that tofu references by the key &quot;tunnel&quot;.\nThere
    is a tunnel configuration resource, the tunnel resource itself, and\nfinally the
    associated secret required for the cloudflared daemon that will run\nalongside
    your webapp.</p>\n<p>To get started you'll need to fill out the example <code>terraform.tfvars</code>
    file with\nyour info:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># Copy
    to terraform.tfvars and fill in values</span>\n<span class=\"c1\"># DO NOT commit
    terraform.tfvars to git</span>\n\n<span class=\"na\">cloudflare_api_token</span><span
    class=\"w\">  </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-api-token-here&quot;</span>\n<span class=\"na\">cloudflare_account_id</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-account-id&quot;</span>\n<span class=\"na\">cloudflare_zone_id</span><span
    class=\"w\">    </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;your-zone-id&quot;</span>\n<span class=\"na\">domain</span><span
    class=\"w\">                </span><span class=\"o\">=</span><span class=\"w\">
    </span><span class=\"s2\">&quot;example.com&quot;</span>\n<span class=\"na\">subdomain</span><span
    class=\"w\">             </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;app&quot;</span>\n<span class=\"na\">tunnel_name</span><span
    class=\"w\">           </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;my-tunnel&quot;</span>\n<span class=\"na\">origin_service</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;http://localhost:8000&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can grab your account id and zone id from Cloudflare's dashboard for your\ndomain.
    It's near the bottom of the Overview page</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213113332_0e0f09b8.png\"
    alt=\"20251213113332_0e0f09b8.png\" /></p>\n<p>Then I presume you have a domain
    already, but if not hop over to namecheap to\nsnag one and then register it with
    cloudflare so they can manage your DNS. I\nhave terraform for this as well, a
    future blog post will combine this with a\nfuller terraform'd cloudflare setup
    for simple domain use cases</p>\n<p>Once you fill those out, hit it with the <code>tofu
    init</code> and <code>tofu plan</code> to see what's up</p>\n<blockquote>\n<p>NOTE:
    <code>terraform.tfvars</code> is automatically sourced by terraform/tofu, you
    can name the file differently and then pass <code>-var-file=myvars.tfvars</code>
    to the commands</p>\n</blockquote>\n<p>The initial plan should look something
    like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>OpenTofu<span class=\"w\">
    </span>used<span class=\"w\"> </span>the<span class=\"w\"> </span>selected<span
    class=\"w\"> </span>providers<span class=\"w\"> </span>to<span class=\"w\"> </span>generate<span
    class=\"w\"> </span>the<span class=\"w\"> </span>following<span class=\"w\"> </span>execution<span
    class=\"w\"> </span>plan.<span class=\"w\"> </span>Resource<span class=\"w\">
    </span>actions<span class=\"w\"> </span>are<span class=\"w\"> </span>indicated<span
    class=\"w\"> </span>with<span class=\"w\"> </span>the<span class=\"w\"> </span>following<span
    class=\"w\"> </span>symbols:\n<span class=\"w\">  </span>+<span class=\"w\"> </span>create\n\nOpenTofu<span
    class=\"w\"> </span>will<span class=\"w\"> </span>perform<span class=\"w\"> </span>the<span
    class=\"w\"> </span>following<span class=\"w\"> </span>actions:\n\n<span class=\"w\">
    \ </span><span class=\"c1\"># module.tunnel.cloudflare_record.tunnel will be created</span>\n<span
    class=\"w\">  </span>+<span class=\"w\"> </span>resource<span class=\"w\"> </span><span
    class=\"s2\">&quot;cloudflare_record&quot;</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;tunnel&quot;</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">allow_overwrite</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">false</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">comment</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;Managed
    by Terraform - soonish-tunnel&quot;</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">content</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">created_on</span><span
    class=\"w\">      </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">hostname</span><span class=\"w\">        </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">id</span><span class=\"w\">              </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">metadata</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">modified_on</span><span class=\"w\">     </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">name</span><span class=\"w\">            </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;app&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">proxiable</span><span
    class=\"w\">       </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">proxied</span><span class=\"w\">         </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">true</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">ttl</span><span class=\"w\">             </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nb\">type</span><span
    class=\"w\">            </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;CNAME&quot;</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">value</span><span class=\"w\">           </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">zone_id</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># module.tunnel.cloudflare_tunnel_config.this
    will be created</span>\n<span class=\"w\">  </span>+<span class=\"w\"> </span>resource<span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare_tunnel_config&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;this&quot;</span><span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">account_id</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">id</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">tunnel_id</span><span class=\"w\">  </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span>config<span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">          </span>+<span class=\"w\"> </span>ingress_rule<span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">              </span>+<span
    class=\"w\"> </span><span class=\"nv\">hostname</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;app.notifiq.net&quot;</span>\n<span
    class=\"w\">              </span>+<span class=\"w\"> </span><span class=\"nv\">service</span><span
    class=\"w\">  </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;http://localhost:8000&quot;</span>\n<span class=\"w\">            </span><span
    class=\"o\">}</span>\n<span class=\"w\">          </span>+<span class=\"w\"> </span>ingress_rule<span
    class=\"w\"> </span><span class=\"o\">{</span>\n<span class=\"w\">              </span>+<span
    class=\"w\"> </span><span class=\"nv\">service</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;http_status:404&quot;</span>\n<span
    class=\"w\">            </span><span class=\"o\">}</span>\n<span class=\"w\">
    \       </span><span class=\"o\">}</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this
    will be created</span>\n<span class=\"w\">  </span>+<span class=\"w\"> </span>resource<span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare_zero_trust_tunnel_cloudflared&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;this&quot;</span><span class=\"w\">
    </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span class=\"w\">
    </span><span class=\"nv\">account_id</span><span class=\"w\">   </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&lt;REDACTED&gt;&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">cname</span><span
    class=\"w\">        </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">id</span><span class=\"w\">           </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">name</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;soonish-tunnel&quot;</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">secret</span><span
    class=\"w\">       </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>sensitive<span class=\"w\"> </span>value<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">tunnel_token</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>sensitive<span class=\"w\"> </span>value<span class=\"o\">)</span>\n<span
    class=\"w\">    </span><span class=\"o\">}</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\"># module.tunnel.random_id.tunnel_secret will be created</span>\n<span
    class=\"w\">  </span>+<span class=\"w\"> </span>resource<span class=\"w\"> </span><span
    class=\"s2\">&quot;random_id&quot;</span><span class=\"w\"> </span><span class=\"s2\">&quot;tunnel_secret&quot;</span><span
    class=\"w\"> </span><span class=\"o\">{</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">b64_std</span><span class=\"w\">     </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">b64_url</span><span
    class=\"w\">     </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">byte_length</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"m\">32</span>\n<span class=\"w\">      </span>+<span
    class=\"w\"> </span><span class=\"nv\">dec</span><span class=\"w\">         </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"o\">(</span>known<span
    class=\"w\"> </span>after<span class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span
    class=\"w\">      </span>+<span class=\"w\"> </span><span class=\"nv\">hex</span><span
    class=\"w\">         </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"o\">(</span>known<span class=\"w\"> </span>after<span class=\"w\"> </span>apply<span
    class=\"o\">)</span>\n<span class=\"w\">      </span>+<span class=\"w\"> </span><span
    class=\"nv\">id</span><span class=\"w\">          </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"o\">(</span>known<span class=\"w\"> </span>after<span
    class=\"w\"> </span>apply<span class=\"o\">)</span>\n<span class=\"w\">    </span><span
    class=\"o\">}</span>\n\nPlan:<span class=\"w\"> </span><span class=\"m\">4</span><span
    class=\"w\"> </span>to<span class=\"w\"> </span>add,<span class=\"w\"> </span><span
    class=\"m\">0</span><span class=\"w\"> </span>to<span class=\"w\"> </span>change,<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span>to<span
    class=\"w\"> </span>destroy.\n</pre></div>\n\n</pre>\n\n<p>As long as that looks
    good you to, then we <code>tofu apply</code> next (type <code>yes</code> when\nasked
    or pass <code>-auto-approve</code>)</p>\n<p>Afterwards <code>tofu state list</code>
    should show you the 4 resources, and if you go to\nyour cloudflare zone's dashboard
    you should see the CNAME associated with the\ntunnel address</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213120004_d199e5fd.png\"
    alt=\"20251213120004_d199e5fd.png\" /></p>\n<h2 id=\"daemon\">Daemon <a class=\"header-anchor\"
    href=\"#daemon\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Run the compose stack
    or the binary itself. Get the token from terraform state with <code>tofu output
    -raw tunnel_token</code>.</p>\n<p><code>TUNNEL_TOKEN=$(tofu output -raw tunnel_token)
    docker compose up -d</code> will do you nicely</p>\n<p>Enjoy your tunnel!</p>\n<p><a
    href=\"https://github.com/pypeaday/example-terraform-cloudflare-tunnel\">example
    repo</a></p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-12-12 21:06:59\ntemplateKey: blog-post\ntitle: Setup A
    Cloudflare Tunnel With Terraform\npublished: True\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213115609_2fc160d8.png\"\ntags:\n
    \ - tofu\n  - terraform\n  - tech\n---\n\nI am cooking up some stuff at home and
    want to put it on the interwebs, but I\ndon't want it on the same infra as my
    homelab. Now... I only have a server or\n2, so to some degree it will be, but
    networking-wise I didn't want to funnel\nextra traffic through my reverse proxy.\n\nSo,
    I'd heard about Cloudflare Tunnels - they sound like P2P VPN to me, but I\nknow
    there's layers of the networking stack I'm blatantly ignoring. \"What the\ntunnel
    is\" isn't much the point - I'm here to show you how to set one up and\nget yourself
    a fancy <https://app.mydomain.com> for your web app running\nkind of wherever
    you want\n\n> Example Repo linked at the bottom\n\n## Requirements\n\n0. Terraform
    or open-tofu. I currently use open-tofu but either would be fine.\n   `brew install
    open-tofu` is a simple way to get going\n1. Cloudflare account with a domain\n2.
    API token with permissions:\n   - `Account:Cloudflare Tunnel:Edit`\n   - `Zone:DNS:Edit`\n3.
    `cloudflared` (the example repo runs cloudflared in a docker compose stack)\n\n##
    Tunnel\n\nThe module is simple and has just a few resources:\n\n```bash\n\u276F
    tofu state list\nmodule.tunnel.cloudflare_record.tunnel\nmodule.tunnel.cloudflare_tunnel_config.this\nmodule.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this\nmodule.tunnel.random_id.tunnel_secret\n\n```\n\nWe
    see there will be the a DNS record that tofu references by the key \"tunnel\".\nThere
    is a tunnel configuration resource, the tunnel resource itself, and\nfinally the
    associated secret required for the cloudflared daemon that will run\nalongside
    your webapp.\n\nTo get started you'll need to fill out the example `terraform.tfvars`
    file with\nyour info:\n\n```hcl\n# Copy to terraform.tfvars and fill in values\n#
    DO NOT commit terraform.tfvars to git\n\ncloudflare_api_token  = \"your-api-token-here\"\ncloudflare_account_id
    = \"your-account-id\"\ncloudflare_zone_id    = \"your-zone-id\"\ndomain                =
    \"example.com\"\nsubdomain             = \"app\"\ntunnel_name           = \"my-tunnel\"\norigin_service
    \       = \"http://localhost:8000\"\n```\n\nYou can grab your account id and zone
    id from Cloudflare's dashboard for your\ndomain. It's near the bottom of the Overview
    page\n\n![20251213113332_0e0f09b8.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213113332_0e0f09b8.png)\n\nThen
    I presume you have a domain already, but if not hop over to namecheap to\nsnag
    one and then register it with cloudflare so they can manage your DNS. I\nhave
    terraform for this as well, a future blog post will combine this with a\nfuller
    terraform'd cloudflare setup for simple domain use cases\n\nOnce you fill those
    out, hit it with the `tofu init` and `tofu plan` to see what's up\n\n> NOTE: `terraform.tfvars`
    is automatically sourced by terraform/tofu, you can name the file differently
    and then pass `-var-file=myvars.tfvars` to the commands\n\nThe initial plan should
    look something like this:\n\n```bash\n\nOpenTofu used the selected providers to
    generate the following execution plan. Resource actions are indicated with the
    following symbols:\n  + create\n\nOpenTofu will perform the following actions:\n\n
    \ # module.tunnel.cloudflare_record.tunnel will be created\n  + resource \"cloudflare_record\"
    \"tunnel\" {\n      + allow_overwrite = false\n      + comment         = \"Managed
    by Terraform - soonish-tunnel\"\n      + content         = (known after apply)\n
    \     + created_on      = (known after apply)\n      + hostname        = (known
    after apply)\n      + id              = (known after apply)\n      + metadata
    \       = (known after apply)\n      + modified_on     = (known after apply)\n
    \     + name            = \"app\"\n      + proxiable       = (known after apply)\n
    \     + proxied         = true\n      + ttl             = (known after apply)\n
    \     + type            = \"CNAME\"\n      + value           = (known after apply)\n
    \     + zone_id         = \"<REDACTED>\"\n    }\n\n  # module.tunnel.cloudflare_tunnel_config.this
    will be created\n  + resource \"cloudflare_tunnel_config\" \"this\" {\n      +
    account_id = \"<REDACTED>\"\n      + id         = (known after apply)\n      +
    tunnel_id  = (known after apply)\n\n      + config {\n          + ingress_rule
    {\n              + hostname = \"app.notifiq.net\"\n              + service  =
    \"http://localhost:8000\"\n            }\n          + ingress_rule {\n              +
    service = \"http_status:404\"\n            }\n        }\n    }\n\n  # module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this
    will be created\n  + resource \"cloudflare_zero_trust_tunnel_cloudflared\" \"this\"
    {\n      + account_id   = \"<REDACTED>\"\n      + cname        = (known after
    apply)\n      + id           = (known after apply)\n      + name         = \"soonish-tunnel\"\n
    \     + secret       = (sensitive value)\n      + tunnel_token = (sensitive value)\n
    \   }\n\n  # module.tunnel.random_id.tunnel_secret will be created\n  + resource
    \"random_id\" \"tunnel_secret\" {\n      + b64_std     = (known after apply)\n
    \     + b64_url     = (known after apply)\n      + byte_length = 32\n      + dec
    \        = (known after apply)\n      + hex         = (known after apply)\n      +
    id          = (known after apply)\n    }\n\nPlan: 4 to add, 0 to change, 0 to
    destroy.\n\n```\n\nAs long as that looks good you to, then we `tofu apply` next
    (type `yes` when\nasked or pass `-auto-approve`)\n\nAfterwards `tofu state list`
    should show you the 4 resources, and if you go to\nyour cloudflare zone's dashboard
    you should see the CNAME associated with the\ntunnel address\n\n![20251213120004_d199e5fd.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213120004_d199e5fd.png)\n\n##
    Daemon\n\nRun the compose stack or the binary itself. Get the token from terraform
    state with `tofu output -raw tunnel_token`.\n\n`TUNNEL_TOKEN=$(tofu output -raw
    tunnel_token) docker compose up -d` will do you nicely\n\nEnjoy your tunnel!\n\n[example
    repo](https://github.com/pypeaday/example-terraform-cloudflare-tunnel)\n"
published: true
slug: setup-a-cloudflare-tunnel-with-terraform
title: Setup A Cloudflare Tunnel With Terraform


---

I am cooking up some stuff at home and want to put it on the interwebs, but I
don't want it on the same infra as my homelab. Now... I only have a server or
2, so to some degree it will be, but networking-wise I didn't want to funnel
extra traffic through my reverse proxy.

So, I'd heard about Cloudflare Tunnels - they sound like P2P VPN to me, but I
know there's layers of the networking stack I'm blatantly ignoring. "What the
tunnel is" isn't much the point - I'm here to show you how to set one up and
get yourself a fancy <https://app.mydomain.com> for your web app running
kind of wherever you want

> Example Repo linked at the bottom

## Requirements

0. Terraform or open-tofu. I currently use open-tofu but either would be fine.
   `brew install open-tofu` is a simple way to get going
1. Cloudflare account with a domain
2. API token with permissions:
   - `Account:Cloudflare Tunnel:Edit`
   - `Zone:DNS:Edit`
3. `cloudflared` (the example repo runs cloudflared in a docker compose stack)

## Tunnel

The module is simple and has just a few resources:

```bash
❯ tofu state list
module.tunnel.cloudflare_record.tunnel
module.tunnel.cloudflare_tunnel_config.this
module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this
module.tunnel.random_id.tunnel_secret

```

We see there will be the a DNS record that tofu references by the key "tunnel".
There is a tunnel configuration resource, the tunnel resource itself, and
finally the associated secret required for the cloudflared daemon that will run
alongside your webapp.

To get started you'll need to fill out the example `terraform.tfvars` file with
your info:

```hcl
# Copy to terraform.tfvars and fill in values
# DO NOT commit terraform.tfvars to git

cloudflare_api_token  = "your-api-token-here"
cloudflare_account_id = "your-account-id"
cloudflare_zone_id    = "your-zone-id"
domain                = "example.com"
subdomain             = "app"
tunnel_name           = "my-tunnel"
origin_service        = "http://localhost:8000"
```

You can grab your account id and zone id from Cloudflare's dashboard for your
domain. It's near the bottom of the Overview page

![20251213113332_0e0f09b8.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213113332_0e0f09b8.png)

Then I presume you have a domain already, but if not hop over to namecheap to
snag one and then register it with cloudflare so they can manage your DNS. I
have terraform for this as well, a future blog post will combine this with a
fuller terraform'd cloudflare setup for simple domain use cases

Once you fill those out, hit it with the `tofu init` and `tofu plan` to see what's up

> NOTE: `terraform.tfvars` is automatically sourced by terraform/tofu, you can name the file differently and then pass `-var-file=myvars.tfvars` to the commands

The initial plan should look something like this:

```bash

OpenTofu used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

OpenTofu will perform the following actions:

  # module.tunnel.cloudflare_record.tunnel will be created
  + resource "cloudflare_record" "tunnel" {
      + allow_overwrite = false
      + comment         = "Managed by Terraform - soonish-tunnel"
      + content         = (known after apply)
      + created_on      = (known after apply)
      + hostname        = (known after apply)
      + id              = (known after apply)
      + metadata        = (known after apply)
      + modified_on     = (known after apply)
      + name            = "app"
      + proxiable       = (known after apply)
      + proxied         = true
      + ttl             = (known after apply)
      + type            = "CNAME"
      + value           = (known after apply)
      + zone_id         = "<REDACTED>"
    }

  # module.tunnel.cloudflare_tunnel_config.this will be created
  + resource "cloudflare_tunnel_config" "this" {
      + account_id = "<REDACTED>"
      + id         = (known after apply)
      + tunnel_id  = (known after apply)

      + config {
          + ingress_rule {
              + hostname = "app.notifiq.net"
              + service  = "http://localhost:8000"
            }
          + ingress_rule {
              + service = "http_status:404"
            }
        }
    }

  # module.tunnel.cloudflare_zero_trust_tunnel_cloudflared.this will be created
  + resource "cloudflare_zero_trust_tunnel_cloudflared" "this" {
      + account_id   = "<REDACTED>"
      + cname        = (known after apply)
      + id           = (known after apply)
      + name         = "soonish-tunnel"
      + secret       = (sensitive value)
      + tunnel_token = (sensitive value)
    }

  # module.tunnel.random_id.tunnel_secret will be created
  + resource "random_id" "tunnel_secret" {
      + b64_std     = (known after apply)
      + b64_url     = (known after apply)
      + byte_length = 32
      + dec         = (known after apply)
      + hex         = (known after apply)
      + id          = (known after apply)
    }

Plan: 4 to add, 0 to change, 0 to destroy.

```

As long as that looks good you to, then we `tofu apply` next (type `yes` when
asked or pass `-auto-approve`)

Afterwards `tofu state list` should show you the 4 resources, and if you go to
your cloudflare zone's dashboard you should see the CNAME associated with the
tunnel address

![20251213120004_d199e5fd.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251213120004_d199e5fd.png)

## Daemon

Run the compose stack or the binary itself. Get the token from terraform state with `tofu output -raw tunnel_token`.

`TUNNEL_TOKEN=$(tofu output -raw tunnel_token) docker compose up -d` will do you nicely

Enjoy your tunnel!

[example repo](https://github.com/pypeaday/example-terraform-cloudflare-tunnel)