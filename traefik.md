---
content: "# Traefik\n\nIf you don't know about [traefik](https://doc.traefik.io/traefik/)
  and you need a reverse-proxy then you might want to check it out.\nI used to use
  nginx for my reverse proxy but the config was over my head, and once it was working
  I was afraid to touch it.\nTraefik brings a lot to the table, my main uses are reverse
  proxy and ip whitelisting, but it's doing even more under the hood that I don't
  have a full-grasp of yet.\n\nI like Traefik a lot because once I get some basic
  config up it's incredibly easy to add services into my homelab whether they run
  on my primary server or not.\nThis will not be exhaustive but I'll outline my simple
  setup process of traefik and how I add services whether they are in docker or not.\n\n#
  Docker\n\nIn 2022 I'm still a docker fan-boy and I run my traefik instance in a
  docker container. \nThis isn't necessary but I love the portability since my homelab
  is very dynamic at the moment.\nAnd even if it wasn't I'd still want to keep traefik
  in docker because deployment and updating are just so flipping easy\n\nA simple
  docker-compose file for traefik might look like this:\n\n```yaml\nname: traefik\nimage:
  \"traefik:v2.4\"\nnetwork_mode: host\nvolumes:\n  - \"docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro\"\n
  \ - \"docker-data/traefik/config.yml:/etc/traefik/config.yml:ro\"\n  - \"docker-data/traefik/letsencrypt:/letsencrypt:rw\"\n
  \ - \"/var/run/docker.sock:/var/run/docker.sock:ro\"  # for auto-discovery\nenv:
  \"{{ traefik_environment_variables }}\"\nrestart_policy: unless-stopped\nmemory:
  \"1g\"\n```\n\n# Ansible deployment\n\n__I plan to have more on my homelab and Ansible
  on this site eventually...__\n\nI use Ansible to deploy most of my services at home,
  including traefik. My main homelab repo is [here](https://github.com/nicpayne713/ansible-nas)
  which is a fork of [Ansible NAS](https://github.com/davestephens/ansible-nas).\n\n>
  If you want my stuff then be sure to go to the `user/nic` branch on my fork\n\nYou
  can see the ansible stuff for traefik [here](https://github.com/davestephens/ansible-nas/tree/master/roles/traefik)\n\n#
  Config\n\nI use a `traefik.toml` as the main config and it looks something like
  this.\nWith ansible a lot of this is done through template variables but this is
  the general idea.\nThis config tells traefik what ports to listen and forward on,
  and gives the names to be referenced by docker labels (down below). \n\nTraefik
  also has a handy web ui that with this config you can find on port `8080`.\nThere
  is a `providers` section - which is one of the biggest selling points of traefik
  for me.\nI have a docker provider configured  and a static file. \n\nThe docker
  provider lets traefik auto-discover new services that I deploy and automatically
  handle the routing!\nThe static file lets me easily add non-dockerized service routing,
  or routing to dockerized services on another host (I think traefik has an easier
  way to do this automatically but I don't do it often enough to need that kind of
  automation).\nThen at the bottom is the SSL cert stuff. \nUsing Let's Encrypt is
  pretty easy and I use Cloudflare as my DNS provider\n\n```toml\n\n[entryPoints]\n[entryPoints.web]\naddress
  = \":80\"\n\n[entryPoints.web.http.redirections.entryPoint]\nto = \"websecure\"\n\n[entryPoints.websecure]\naddress
  = \":443\"\n\n[entryPoints.websecure.http.tls]\ncertResolver = \"letsencrypt\"\n\n[entryPoints.websecure.http.tls.domains]\nmain
  = \"example.com\"\nsans = [\n\"*.example.com\"\n]\n\n[entryPoints.traefik]\naddress
  = \":8080\"\n\n[providers]\nprovidersThrottleDuration = \"1s\"\n[providers.docker]\nexposedbydefault
  = false\n[providers.file]\nfilename = \"/etc/traefik/config.yml\"\n\n[api]\ninsecure
  = true\ndashboard = true\n\n[log]\nlevel = \"INFO\"\n\n[ping]\nterminatingStatusCode
  = 0\n\n[certificatesResolvers]\n[certificatesResolvers.letsencrypt]\n[certificatesResolvers.letsencrypt.acme]\nemail
  = \"my_email@example.com\"\nstorage = \"/letsencrypt/acme.json\"\ncaserver = \"https://acme-staging-v02.api.letsencrypt.org/directory\"
  \ # le staging, not prod\n\n[certificatesResolvers.letsencrypt.acme.dnsChallenge]\nprovider
  = \"cloudflare\"\n```\n\n# Providers.file\n\nTo my knowledge there isn't much to
  configure on the docker provider side of things until you deploy a service.\nBut
  the provider config file should get a little screen time here.\n\nThe file defines
  a traefik http router for each service you define, in this case just `pihole`. \n\nHere
  I am adding my pihole instance which is not run inside docker but is inside a VM
  on another host.\nI want the `entryPoints` to be set to `websecure` which is configured
  above in the http redirects.\nI want some middlewares, `addprefix-pihole` and `default-headers`,
  which I'll explain below.\nI set letsencrypt as the cert certResolver.\nFinally
  I name the service `pihole`.\n\nThen in the `services` section I configure where
  pihole is located by just giving the internal IP for traefik to route to.\nFinally
  I define my middlewares. \nTo get to the pihole homepage you need to use the route
  `/admin` so I want that added automatically when I go to `pihole.example.com` so
  I come to `pihole.example.com/admin`.\nAnd I wanted to restrict access to just my
  internal network and my wireguard network - this is done with the `default-whitelist`.
  \nThe last thing is to configure a chain of middlewares that I called `secured`
  which is just easier for the docker labels later on.\n\nWith this config in play
  though, traefik will know about the route `pihole.example.com` and handle the ip
  whitelisting and load balancing for me.\n\n```yaml\nhttp:\n #region routers \n  routers:\n
  \   pihole:\n      entryPoints:\n        - \"websecure\"\n      rule: \"Host(`pihole.example.com`)\"\n
  \     middlewares:\n        # - default-headers\n        - addprefix-pihole\n        -
  default-whitelist\n      tls: \n        certResolver: letsencrypt\n      service:
  pihole\n  #region services\n  services:\n    pihole:\n      loadBalancer:\n        servers:\n
  \         - url: \"http://192.168.1.3:80\"\n        passHostHeader: true\n  #endregion\n
  \ middlewares:\n    addprefix-pihole:\n      addPrefix:\n        prefix: \"/admin\"\n
  \   https-redirect:\n      redirectScheme:\n        scheme: https\n\n    default-headers:\n
  \     headers:\n        frameDeny: true\n        sslRedirect: true\n        browserXssFilter:
  true\n        contentTypeNosniff: true\n        forceSTSHeader: true\n        stsIncludeSubdomains:
  true\n        stsPreload: true\n        stsSeconds: 15552000\n        customFrameOptionsValue:
  SAMEORIGIN\n\n    default-whitelist:\n      ipWhiteList:\n        sourceRange:\n
  \       - \"10.6.0.0/24\"  # wg\n        - \"192.168.1.0/24\"  # lan\n        -
  \"172.17.0.0/16\"  # docker\n\n    secured:\n      chain:\n        middlewares:\n
  \       - default-whitelist\n        - default-headers\n```\n\n\n# Docker labels\n\nNow
  the real magic is with Docker.\nHere is an example docker-compose file for spinning
  up a [jellyfin](https://jellyfin.org/) server that you want to expose to the world,
  or at least access at home with `jellyfin.example.com` instead of `http://192.168.1.N:8096`...\n\nI
  left some of the ansible variable stuff in here, but the main part to be concerned
  with is the `labels` section...\n\nWe define just a few labels to throw onto this
  docker container which let's traefik discover it automatically and apply any settings
  necessary (like my `ipWhiteList`).\n\n* `traefik.enable` is either True or False.
  \n* `traefik.http.router.jellyfin.rule` defines an http router called jellyfin and
  sets the url to `jellyfin.example.com` (if example.com was my `ansible_nas_domain`)\n*
  `traefik.http.routers.jellyfin.tls.certresolver` is set to letsencrypt since I use
  LE for my wildcard certs.\n* `traefik.http.routers.jellyfin.tls.domains[0].main`
  will just be `example.com` -> and this should remind you of the toml file above\n*
  `traefik.http.routers.jellyfin.tls.domains[0].sans` is set to `*.example.com`\n*
  `traefik.http.services.jellyfin.loadbalancer.server.port` is set to jellyfin's default
  http port of 8096, which tells traefik which port to point to for this service.\n\n```yaml\nname:
  jellyfin\nimage: linuxserver/jellyfin\nvolumes:\n  - \"{{ jellyfin_config_directory
  }}:/config:rw\"\n  - \"{{ jellyfin_movies_directory }}:/movies:{{ jellyfin_movies_permissions
  }}\"\n  - \"{{ jellyfin_music_directory }}:/music:{{ jellyfin_music_permissions
  }}\"\n  - \"{{ jellyfin_photos_directory }}:/photos:{{ jellyfin_photos_permissions
  }}\"\n  - \"{{ jellyfin_tv_directory }}:/tv:{{ jellyfin_tv_permissions }}\"\n  -
  \"{{ jellyfin_books_directory }}:/books:{{ jellyfin_books_permissions }}\"\n  -
  \"{{ jellyfin_audiobooks_directory }}:/audiobooks:{{ jellyfin_audiobooks_permissions
  }}\"\nports:\n  - \"{{ jellyfin_port_http }}:8096\"\n  - \"{{ jellyfin_port_https
  }}:8920\"\nenv:\n  TZ: \"{{ ansible_nas_timezone }}\"\n  PUID: \"{{ jellyfin_user_id
  }}\"\n  PGID: \"{{ jellyfin_group_id }}\"\nrestart_policy: unless-stopped\nmemory:
  1g\nlabels:\n  traefik.enable: \"{{ jellyfin_available_externally }}\"\n  traefik.http.routers.jellyfin.rule:
  \"Host(`jellyfin.{{ ansible_nas_domain }}`)\"\n  traefik.http.routers.jellyfin.tls.certresolver:
  \"letsencrypt\"\n  traefik.http.routers.jellyfin.tls.domains[0].main: \"{{ ansible_nas_domain
  }}\"\n  traefik.http.routers.jellyfin.tls.domains[0].sans: \"*.{{ ansible_nas_domain
  }}\"\n  traefik.http.services.jellyfin.loadbalancer.server.port: \"8096\"\n```\n\n\nAnd
  just like that traefik will automagically find your jellyfin container and route
  `jellyfin.example.com` to it!"
date: 2022-03-06
description: 'Traefik If you don&#x27;t know about [traefik](https://doc.traefik.io/traefik/)
  and you need a reverse-proxy then you might want to check it out.

  I used to use '
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Traefik</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Traefik If you don&#x27;t know about
    [traefik](https://doc.traefik.io/traefik/) and you need a reverse-proxy then you
    might want to check it out.\nI used to use \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Traefik | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/traefik\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Traefik
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"Traefik If you
    don&#x27;t know about [traefik](https://doc.traefik.io/traefik/) and you need
    a reverse-proxy then you might want to check it out.\nI used to use \" />\n<meta
    name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/traefik</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Traefik</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-06\">\n            March
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h1 id=\"traefik\">Traefik <a class=\"header-anchor\"
    href=\"#traefik\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>If you don't know about
    <a href=\"https://doc.traefik.io/traefik/\">traefik</a> and you need a reverse-proxy
    then you might want to check it out.\nI used to use nginx for my reverse proxy
    but the config was over my head, and once it was working I was afraid to touch
    it.\nTraefik brings a lot to the table, my main uses are reverse proxy and ip
    whitelisting, but it's doing even more under the hood that I don't have a full-grasp
    of yet.</p>\n<p>I like Traefik a lot because once I get some basic config up it's
    incredibly easy to add services into my homelab whether they run on my primary
    server or not.\nThis will not be exhaustive but I'll outline my simple setup process
    of traefik and how I add services whether they are in docker or not.</p>\n<h1
    id=\"docker\">Docker <a class=\"header-anchor\" href=\"#docker\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>In 2022 I'm still a
    docker fan-boy and I run my traefik instance in a docker container.\nThis isn't
    necessary but I love the portability since my homelab is very dynamic at the moment.\nAnd
    even if it wasn't I'd still want to keep traefik in docker because deployment
    and updating are just so flipping easy</p>\n<p>A simple docker-compose file for
    traefik might look like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">name</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik</span>\n<span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;traefik:v2.4&quot;</span>\n<span class=\"nt\">network_mode</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">host</span>\n<span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;docker-data/traefik/config.yml:/etc/traefik/config.yml:ro&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;docker-data/traefik/letsencrypt:/letsencrypt:rw&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;/var/run/docker.sock:/var/run/docker.sock:ro&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># for auto-discovery</span>\n<span class=\"nt\">env</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">traefik_environment_variables</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">restart_policy</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;1g&quot;</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"ansible-deployment\">Ansible
    deployment <a class=\"header-anchor\" href=\"#ansible-deployment\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>I plan to have
    more on my homelab and Ansible on this site eventually...</strong></p>\n<p>I use
    Ansible to deploy most of my services at home, including traefik. My main homelab
    repo is <a href=\"https://github.com/nicpayne713/ansible-nas\">here</a> which
    is a fork of <a href=\"https://github.com/davestephens/ansible-nas\">Ansible NAS</a>.</p>\n<blockquote>\n<p>If
    you want my stuff then be sure to go to the <code>user/nic</code> branch on my
    fork</p>\n</blockquote>\n<p>You can see the ansible stuff for traefik <a href=\"https://github.com/davestephens/ansible-nas/tree/master/roles/traefik\">here</a></p>\n<h1
    id=\"config\">Config <a class=\"header-anchor\" href=\"#config\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I use a <code>traefik.toml</code>
    as the main config and it looks something like this.\nWith ansible a lot of this
    is done through template variables but this is the general idea.\nThis config
    tells traefik what ports to listen and forward on, and gives the names to be referenced
    by docker labels (down below).</p>\n<p>Traefik also has a handy web ui that with
    this config you can find on port <code>8080</code>.\nThere is a <code>providers</code>
    section - which is one of the biggest selling points of traefik for me.\nI have
    a docker provider configured  and a static file.</p>\n<p>The docker provider lets
    traefik auto-discover new services that I deploy and automatically handle the
    routing!\nThe static file lets me easily add non-dockerized service routing, or
    routing to dockerized services on another host (I think traefik has an easier
    way to do this automatically but I don't do it often enough to need that kind
    of automation).\nThen at the bottom is the SSL cert stuff.\nUsing Let's Encrypt
    is pretty easy and I use Cloudflare as my DNS provider</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[entryPoints]</span>\n<span
    class=\"k\">[entryPoints.web]</span>\n<span class=\"n\">address</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:80&quot;</span>\n\n<span
    class=\"k\">[entryPoints.web.http.redirections.entryPoint]</span>\n<span class=\"n\">to</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;websecure&quot;</span>\n\n<span class=\"k\">[entryPoints.websecure]</span>\n<span
    class=\"n\">address</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:443&quot;</span>\n\n<span class=\"k\">[entryPoints.websecure.http.tls]</span>\n<span
    class=\"n\">certResolver</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;letsencrypt&quot;</span>\n\n<span
    class=\"k\">[entryPoints.websecure.http.tls.domains]</span>\n<span class=\"n\">main</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;example.com&quot;</span>\n<span class=\"n\">sans</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">[</span>\n<span class=\"s2\">&quot;*.example.com&quot;</span>\n<span
    class=\"p\">]</span>\n\n<span class=\"k\">[entryPoints.traefik]</span>\n<span
    class=\"n\">address</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:8080&quot;</span>\n\n<span class=\"k\">[providers]</span>\n<span
    class=\"n\">providersThrottleDuration</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;1s&quot;</span>\n<span class=\"k\">[providers.docker]</span>\n<span
    class=\"n\">exposedbydefault</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">false</span>\n<span class=\"k\">[providers.file]</span>\n<span
    class=\"n\">filename</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;/etc/traefik/config.yml&quot;</span>\n\n<span
    class=\"k\">[api]</span>\n<span class=\"n\">insecure</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span>\n<span
    class=\"n\">dashboard</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span>\n\n<span class=\"k\">[log]</span>\n<span
    class=\"n\">level</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;INFO&quot;</span>\n\n<span class=\"k\">[ping]</span>\n<span
    class=\"n\">terminatingStatusCode</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"mi\">0</span>\n\n<span class=\"k\">[certificatesResolvers]</span>\n<span
    class=\"k\">[certificatesResolvers.letsencrypt]</span>\n<span class=\"k\">[certificatesResolvers.letsencrypt.acme]</span>\n<span
    class=\"n\">email</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;my_email@example.com&quot;</span>\n<span
    class=\"n\">storage</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;/letsencrypt/acme.json&quot;</span>\n<span
    class=\"n\">caserver</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;https://acme-staging-v02.api.letsencrypt.org/directory&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># le staging, not prod</span>\n\n<span
    class=\"k\">[certificatesResolvers.letsencrypt.acme.dnsChallenge]</span>\n<span
    class=\"n\">provider</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare&quot;</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"providersfile\">Providers.file <a class=\"header-anchor\" href=\"#providersfile\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>To my knowledge there
    isn't much to configure on the docker provider side of things until you deploy
    a service.\nBut the provider config file should get a little screen time here.</p>\n<p>The
    file defines a traefik http router for each service you define, in this case just
    <code>pihole</code>.</p>\n<p>Here I am adding my pihole instance which is not
    run inside docker but is inside a VM on another host.\nI want the <code>entryPoints</code>
    to be set to <code>websecure</code> which is configured above in the http redirects.\nI
    want some middlewares, <code>addprefix-pihole</code> and <code>default-headers</code>,
    which I'll explain below.\nI set letsencrypt as the cert certResolver.\nFinally
    I name the service <code>pihole</code>.</p>\n<p>Then in the <code>services</code>
    section I configure where pihole is located by just giving the internal IP for
    traefik to route to.\nFinally I define my middlewares.\nTo get to the pihole homepage
    you need to use the route <code>/admin</code> so I want that added automatically
    when I go to <code>pihole.example.com</code> so I come to <code>pihole.example.com/admin</code>.\nAnd
    I wanted to restrict access to just my internal network and my wireguard network
    - this is done with the <code>default-whitelist</code>.\nThe last thing is to
    configure a chain of middlewares that I called <code>secured</code> which is just
    easier for the docker labels later on.</p>\n<p>With this config in play though,
    traefik will know about the route <code>pihole.example.com</code> and handle the
    ip whitelisting and load balancing for me.</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">http</span><span
    class=\"p\">:</span>\n<span class=\"w\"> </span><span class=\"c1\">#region routers
    </span>\n<span class=\"w\">  </span><span class=\"nt\">routers</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"nt\">pihole</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">entryPoints</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;websecure&quot;</span>\n<span class=\"w\">      </span><span
    class=\"nt\">rule</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;Host(`pihole.example.com`)&quot;</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># - default-headers</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">addprefix-pihole</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-whitelist</span>\n<span
    class=\"w\">      </span><span class=\"nt\">tls</span><span class=\"p\">:</span><span
    class=\"w\"> </span>\n<span class=\"w\">        </span><span class=\"nt\">certResolver</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">letsencrypt</span>\n<span
    class=\"w\">      </span><span class=\"nt\">service</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">pihole</span>\n<span
    class=\"w\">  </span><span class=\"c1\">#region services</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">services</span><span class=\"p\">:</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">pihole</span><span class=\"p\">:</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">loadBalancer</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">servers</span><span class=\"p\">:</span>\n<span
    class=\"w\">          </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"nt\">url</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"s\">&quot;http://192.168.1.3:80&quot;</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">passHostHeader</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">  </span><span class=\"c1\">#endregion</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"nt\">addprefix-pihole</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">addPrefix</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">prefix</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s\">&quot;/admin&quot;</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">https-redirect</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">redirectScheme</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">scheme</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">https</span>\n\n<span
    class=\"w\">    </span><span class=\"nt\">default-headers</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">headers</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">frameDeny</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">sslRedirect</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">browserXssFilter</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">contentTypeNosniff</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">forceSTSHeader</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsIncludeSubdomains</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsPreload</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsSeconds</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">15552000</span>\n<span
    class=\"w\">        </span><span class=\"nt\">customFrameOptionsValue</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">SAMEORIGIN</span>\n\n<span
    class=\"w\">    </span><span class=\"nt\">default-whitelist</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">ipWhiteList</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">sourceRange</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;10.6.0.0/24&quot;</span><span class=\"w\">  </span><span
    class=\"c1\"># wg</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;192.168.1.0/24&quot;</span><span class=\"w\">
    \ </span><span class=\"c1\"># lan</span>\n<span class=\"w\">        </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;172.17.0.0/16&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># docker</span>\n\n<span class=\"w\">
    \   </span><span class=\"nt\">secured</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">chain</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-whitelist</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-headers</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"docker-labels\">Docker labels <a class=\"header-anchor\" href=\"#docker-labels\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Now the real magic is
    with Docker.\nHere is an example docker-compose file for spinning up a <a href=\"https://jellyfin.org/\">jellyfin</a>
    server that you want to expose to the world, or at least access at home with <code>jellyfin.example.com</code>
    instead of <code>http://192.168.1.N:8096</code>...</p>\n<p>I left some of the
    ansible variable stuff in here, but the main part to be concerned with is the
    <code>labels</code> section...</p>\n<p>We define just a few labels to throw onto
    this docker container which let's traefik discover it automatically and apply
    any settings necessary (like my <code>ipWhiteList</code>).</p>\n<ul>\n<li><code>traefik.enable</code>
    is either True or False.</li>\n<li><code>traefik.http.router.jellyfin.rule</code>
    defines an http router called jellyfin and sets the url to <code>jellyfin.example.com</code>
    (if <a href=\"http://example.com\">example.com</a> was my <code>ansible_nas_domain</code>)</li>\n<li><code>traefik.http.routers.jellyfin.tls.certresolver</code>
    is set to letsencrypt since I use LE for my wildcard certs.</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].main</code>
    will just be <code>example.com</code> -&gt; and this should remind you of the
    toml file above</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].sans</code>
    is set to <code>*.example.com</code></li>\n<li><code>traefik.http.services.jellyfin.loadbalancer.server.port</code>
    is set to jellyfin's default http port of 8096, which tells traefik which port
    to point to for this service.</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">name</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">jellyfin</span>\n<span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">linuxserver/jellyfin</span>\n<span class=\"nt\">volumes</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_config_directory</span><span class=\"nv\"> </span><span class=\"s\">}}:/config:rw&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_movies_directory</span><span
    class=\"nv\"> </span><span class=\"s\">}}:/movies:{{</span><span class=\"nv\">
    </span><span class=\"s\">jellyfin_movies_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p
    p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_music_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/music:{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_music_permissions</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_photos_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/photos:{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_photos_permissions</span><span class=\"nv\"> </span><span
    class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_tv_directory</span><span class=\"nv\"> </span><span class=\"s\">}}:/tv:{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_tv_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p
    p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_books_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/books:{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_books_permissions</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_audiobooks_directory</span><span
    class=\"nv\"> </span><span class=\"s\">}}:/audiobooks:{{</span><span class=\"nv\">
    </span><span class=\"s\">jellyfin_audiobooks_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">ports</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_port_http</span><span class=\"nv\"> </span><span class=\"s\">}}:8096&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_port_https</span><span
    class=\"nv\"> </span><span class=\"s\">}}:8920&quot;</span>\n<span class=\"nt\">env</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">TZ</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_timezone</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">PUID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_user_id</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">PGID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_group_id</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">restart_policy</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">1g</span>\n<span class=\"nt\">labels</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.enable</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_available_externally</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"nt\">traefik.http.routers.jellyfin.rule</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s\">&quot;Host(`jellyfin.{{</span><span class=\"nv\">
    </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\"> </span><span
    class=\"s\">}}`)&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.http.routers.jellyfin.tls.certresolver</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;letsencrypt&quot;</span>\n<span
    class=\"w\">  </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].main</span><span
    class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"l
    l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].sans</span><span
    class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;*.{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.http.services.jellyfin.loadbalancer.server.port</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;8096&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>And
    just like that traefik will automagically find your jellyfin container and route
    <code>jellyfin.example.com</code> to it!</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Traefik</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Traefik If you don&#x27;t know about
    [traefik](https://doc.traefik.io/traefik/) and you need a reverse-proxy then you
    might want to check it out.\nI used to use \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Traefik | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/traefik\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Traefik
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"Traefik If you
    don&#x27;t know about [traefik](https://doc.traefik.io/traefik/) and you need
    a reverse-proxy then you might want to check it out.\nI used to use \" />\n<meta
    name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Traefik</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-06\">\n            March
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Traefik</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-06\">\n            March
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h1 id=\"traefik\">Traefik <a class=\"header-anchor\"
    href=\"#traefik\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>If you don't know about
    <a href=\"https://doc.traefik.io/traefik/\">traefik</a> and you need a reverse-proxy
    then you might want to check it out.\nI used to use nginx for my reverse proxy
    but the config was over my head, and once it was working I was afraid to touch
    it.\nTraefik brings a lot to the table, my main uses are reverse proxy and ip
    whitelisting, but it's doing even more under the hood that I don't have a full-grasp
    of yet.</p>\n<p>I like Traefik a lot because once I get some basic config up it's
    incredibly easy to add services into my homelab whether they run on my primary
    server or not.\nThis will not be exhaustive but I'll outline my simple setup process
    of traefik and how I add services whether they are in docker or not.</p>\n<h1
    id=\"docker\">Docker <a class=\"header-anchor\" href=\"#docker\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>In 2022 I'm still a
    docker fan-boy and I run my traefik instance in a docker container.\nThis isn't
    necessary but I love the portability since my homelab is very dynamic at the moment.\nAnd
    even if it wasn't I'd still want to keep traefik in docker because deployment
    and updating are just so flipping easy</p>\n<p>A simple docker-compose file for
    traefik might look like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">name</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik</span>\n<span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;traefik:v2.4&quot;</span>\n<span class=\"nt\">network_mode</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">host</span>\n<span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;docker-data/traefik/config.yml:/etc/traefik/config.yml:ro&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;docker-data/traefik/letsencrypt:/letsencrypt:rw&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;/var/run/docker.sock:/var/run/docker.sock:ro&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># for auto-discovery</span>\n<span class=\"nt\">env</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">traefik_environment_variables</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">restart_policy</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;1g&quot;</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"ansible-deployment\">Ansible
    deployment <a class=\"header-anchor\" href=\"#ansible-deployment\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>I plan to have
    more on my homelab and Ansible on this site eventually...</strong></p>\n<p>I use
    Ansible to deploy most of my services at home, including traefik. My main homelab
    repo is <a href=\"https://github.com/nicpayne713/ansible-nas\">here</a> which
    is a fork of <a href=\"https://github.com/davestephens/ansible-nas\">Ansible NAS</a>.</p>\n<blockquote>\n<p>If
    you want my stuff then be sure to go to the <code>user/nic</code> branch on my
    fork</p>\n</blockquote>\n<p>You can see the ansible stuff for traefik <a href=\"https://github.com/davestephens/ansible-nas/tree/master/roles/traefik\">here</a></p>\n<h1
    id=\"config\">Config <a class=\"header-anchor\" href=\"#config\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I use a <code>traefik.toml</code>
    as the main config and it looks something like this.\nWith ansible a lot of this
    is done through template variables but this is the general idea.\nThis config
    tells traefik what ports to listen and forward on, and gives the names to be referenced
    by docker labels (down below).</p>\n<p>Traefik also has a handy web ui that with
    this config you can find on port <code>8080</code>.\nThere is a <code>providers</code>
    section - which is one of the biggest selling points of traefik for me.\nI have
    a docker provider configured  and a static file.</p>\n<p>The docker provider lets
    traefik auto-discover new services that I deploy and automatically handle the
    routing!\nThe static file lets me easily add non-dockerized service routing, or
    routing to dockerized services on another host (I think traefik has an easier
    way to do this automatically but I don't do it often enough to need that kind
    of automation).\nThen at the bottom is the SSL cert stuff.\nUsing Let's Encrypt
    is pretty easy and I use Cloudflare as my DNS provider</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[entryPoints]</span>\n<span
    class=\"k\">[entryPoints.web]</span>\n<span class=\"n\">address</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:80&quot;</span>\n\n<span
    class=\"k\">[entryPoints.web.http.redirections.entryPoint]</span>\n<span class=\"n\">to</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;websecure&quot;</span>\n\n<span class=\"k\">[entryPoints.websecure]</span>\n<span
    class=\"n\">address</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:443&quot;</span>\n\n<span class=\"k\">[entryPoints.websecure.http.tls]</span>\n<span
    class=\"n\">certResolver</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;letsencrypt&quot;</span>\n\n<span
    class=\"k\">[entryPoints.websecure.http.tls.domains]</span>\n<span class=\"n\">main</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;example.com&quot;</span>\n<span class=\"n\">sans</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">[</span>\n<span class=\"s2\">&quot;*.example.com&quot;</span>\n<span
    class=\"p\">]</span>\n\n<span class=\"k\">[entryPoints.traefik]</span>\n<span
    class=\"n\">address</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:8080&quot;</span>\n\n<span class=\"k\">[providers]</span>\n<span
    class=\"n\">providersThrottleDuration</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;1s&quot;</span>\n<span class=\"k\">[providers.docker]</span>\n<span
    class=\"n\">exposedbydefault</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">false</span>\n<span class=\"k\">[providers.file]</span>\n<span
    class=\"n\">filename</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;/etc/traefik/config.yml&quot;</span>\n\n<span
    class=\"k\">[api]</span>\n<span class=\"n\">insecure</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span>\n<span
    class=\"n\">dashboard</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span>\n\n<span class=\"k\">[log]</span>\n<span
    class=\"n\">level</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;INFO&quot;</span>\n\n<span class=\"k\">[ping]</span>\n<span
    class=\"n\">terminatingStatusCode</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"mi\">0</span>\n\n<span class=\"k\">[certificatesResolvers]</span>\n<span
    class=\"k\">[certificatesResolvers.letsencrypt]</span>\n<span class=\"k\">[certificatesResolvers.letsencrypt.acme]</span>\n<span
    class=\"n\">email</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;my_email@example.com&quot;</span>\n<span
    class=\"n\">storage</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;/letsencrypt/acme.json&quot;</span>\n<span
    class=\"n\">caserver</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;https://acme-staging-v02.api.letsencrypt.org/directory&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># le staging, not prod</span>\n\n<span
    class=\"k\">[certificatesResolvers.letsencrypt.acme.dnsChallenge]</span>\n<span
    class=\"n\">provider</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare&quot;</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"providersfile\">Providers.file <a class=\"header-anchor\" href=\"#providersfile\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>To my knowledge there
    isn't much to configure on the docker provider side of things until you deploy
    a service.\nBut the provider config file should get a little screen time here.</p>\n<p>The
    file defines a traefik http router for each service you define, in this case just
    <code>pihole</code>.</p>\n<p>Here I am adding my pihole instance which is not
    run inside docker but is inside a VM on another host.\nI want the <code>entryPoints</code>
    to be set to <code>websecure</code> which is configured above in the http redirects.\nI
    want some middlewares, <code>addprefix-pihole</code> and <code>default-headers</code>,
    which I'll explain below.\nI set letsencrypt as the cert certResolver.\nFinally
    I name the service <code>pihole</code>.</p>\n<p>Then in the <code>services</code>
    section I configure where pihole is located by just giving the internal IP for
    traefik to route to.\nFinally I define my middlewares.\nTo get to the pihole homepage
    you need to use the route <code>/admin</code> so I want that added automatically
    when I go to <code>pihole.example.com</code> so I come to <code>pihole.example.com/admin</code>.\nAnd
    I wanted to restrict access to just my internal network and my wireguard network
    - this is done with the <code>default-whitelist</code>.\nThe last thing is to
    configure a chain of middlewares that I called <code>secured</code> which is just
    easier for the docker labels later on.</p>\n<p>With this config in play though,
    traefik will know about the route <code>pihole.example.com</code> and handle the
    ip whitelisting and load balancing for me.</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">http</span><span
    class=\"p\">:</span>\n<span class=\"w\"> </span><span class=\"c1\">#region routers
    </span>\n<span class=\"w\">  </span><span class=\"nt\">routers</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"nt\">pihole</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">entryPoints</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;websecure&quot;</span>\n<span class=\"w\">      </span><span
    class=\"nt\">rule</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;Host(`pihole.example.com`)&quot;</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># - default-headers</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">addprefix-pihole</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-whitelist</span>\n<span
    class=\"w\">      </span><span class=\"nt\">tls</span><span class=\"p\">:</span><span
    class=\"w\"> </span>\n<span class=\"w\">        </span><span class=\"nt\">certResolver</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">letsencrypt</span>\n<span
    class=\"w\">      </span><span class=\"nt\">service</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">pihole</span>\n<span
    class=\"w\">  </span><span class=\"c1\">#region services</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">services</span><span class=\"p\">:</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">pihole</span><span class=\"p\">:</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">loadBalancer</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">servers</span><span class=\"p\">:</span>\n<span
    class=\"w\">          </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"nt\">url</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"s\">&quot;http://192.168.1.3:80&quot;</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">passHostHeader</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">  </span><span class=\"c1\">#endregion</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"nt\">addprefix-pihole</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">addPrefix</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">prefix</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s\">&quot;/admin&quot;</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">https-redirect</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">redirectScheme</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">scheme</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">https</span>\n\n<span
    class=\"w\">    </span><span class=\"nt\">default-headers</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">headers</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">frameDeny</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">sslRedirect</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">browserXssFilter</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">contentTypeNosniff</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">forceSTSHeader</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsIncludeSubdomains</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsPreload</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsSeconds</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">15552000</span>\n<span
    class=\"w\">        </span><span class=\"nt\">customFrameOptionsValue</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">SAMEORIGIN</span>\n\n<span
    class=\"w\">    </span><span class=\"nt\">default-whitelist</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">ipWhiteList</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">sourceRange</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;10.6.0.0/24&quot;</span><span class=\"w\">  </span><span
    class=\"c1\"># wg</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;192.168.1.0/24&quot;</span><span class=\"w\">
    \ </span><span class=\"c1\"># lan</span>\n<span class=\"w\">        </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;172.17.0.0/16&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># docker</span>\n\n<span class=\"w\">
    \   </span><span class=\"nt\">secured</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">chain</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-whitelist</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-headers</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"docker-labels\">Docker labels <a class=\"header-anchor\" href=\"#docker-labels\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Now the real magic is
    with Docker.\nHere is an example docker-compose file for spinning up a <a href=\"https://jellyfin.org/\">jellyfin</a>
    server that you want to expose to the world, or at least access at home with <code>jellyfin.example.com</code>
    instead of <code>http://192.168.1.N:8096</code>...</p>\n<p>I left some of the
    ansible variable stuff in here, but the main part to be concerned with is the
    <code>labels</code> section...</p>\n<p>We define just a few labels to throw onto
    this docker container which let's traefik discover it automatically and apply
    any settings necessary (like my <code>ipWhiteList</code>).</p>\n<ul>\n<li><code>traefik.enable</code>
    is either True or False.</li>\n<li><code>traefik.http.router.jellyfin.rule</code>
    defines an http router called jellyfin and sets the url to <code>jellyfin.example.com</code>
    (if <a href=\"http://example.com\">example.com</a> was my <code>ansible_nas_domain</code>)</li>\n<li><code>traefik.http.routers.jellyfin.tls.certresolver</code>
    is set to letsencrypt since I use LE for my wildcard certs.</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].main</code>
    will just be <code>example.com</code> -&gt; and this should remind you of the
    toml file above</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].sans</code>
    is set to <code>*.example.com</code></li>\n<li><code>traefik.http.services.jellyfin.loadbalancer.server.port</code>
    is set to jellyfin's default http port of 8096, which tells traefik which port
    to point to for this service.</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">name</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">jellyfin</span>\n<span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">linuxserver/jellyfin</span>\n<span class=\"nt\">volumes</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_config_directory</span><span class=\"nv\"> </span><span class=\"s\">}}:/config:rw&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_movies_directory</span><span
    class=\"nv\"> </span><span class=\"s\">}}:/movies:{{</span><span class=\"nv\">
    </span><span class=\"s\">jellyfin_movies_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p
    p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_music_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/music:{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_music_permissions</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_photos_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/photos:{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_photos_permissions</span><span class=\"nv\"> </span><span
    class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_tv_directory</span><span class=\"nv\"> </span><span class=\"s\">}}:/tv:{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_tv_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p
    p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_books_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/books:{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_books_permissions</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_audiobooks_directory</span><span
    class=\"nv\"> </span><span class=\"s\">}}:/audiobooks:{{</span><span class=\"nv\">
    </span><span class=\"s\">jellyfin_audiobooks_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">ports</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_port_http</span><span class=\"nv\"> </span><span class=\"s\">}}:8096&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_port_https</span><span
    class=\"nv\"> </span><span class=\"s\">}}:8920&quot;</span>\n<span class=\"nt\">env</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">TZ</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_timezone</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">PUID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_user_id</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">PGID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_group_id</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">restart_policy</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">1g</span>\n<span class=\"nt\">labels</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.enable</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_available_externally</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"nt\">traefik.http.routers.jellyfin.rule</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s\">&quot;Host(`jellyfin.{{</span><span class=\"nv\">
    </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\"> </span><span
    class=\"s\">}}`)&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.http.routers.jellyfin.tls.certresolver</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;letsencrypt&quot;</span>\n<span
    class=\"w\">  </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].main</span><span
    class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"l
    l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].sans</span><span
    class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;*.{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.http.services.jellyfin.loadbalancer.server.port</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;8096&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>And
    just like that traefik will automagically find your jellyfin container and route
    <code>jellyfin.example.com</code> to it!</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Traefik</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Traefik If you don&#x27;t know about
    [traefik](https://doc.traefik.io/traefik/) and you need a reverse-proxy then you
    might want to check it out.\nI used to use \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Traefik | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/traefik\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Traefik
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"Traefik If you
    don&#x27;t know about [traefik](https://doc.traefik.io/traefik/) and you need
    a reverse-proxy then you might want to check it out.\nI used to use \" />\n<meta
    name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/traefik</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h1 id=\"traefik\">Traefik
    <a class=\"header-anchor\" href=\"#traefik\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>If you don't know about
    <a href=\"https://doc.traefik.io/traefik/\">traefik</a> and you need a reverse-proxy
    then you might want to check it out.\nI used to use nginx for my reverse proxy
    but the config was over my head, and once it was working I was afraid to touch
    it.\nTraefik brings a lot to the table, my main uses are reverse proxy and ip
    whitelisting, but it's doing even more under the hood that I don't have a full-grasp
    of yet.</p>\n<p>I like Traefik a lot because once I get some basic config up it's
    incredibly easy to add services into my homelab whether they run on my primary
    server or not.\nThis will not be exhaustive but I'll outline my simple setup process
    of traefik and how I add services whether they are in docker or not.</p>\n<h1
    id=\"docker\">Docker <a class=\"header-anchor\" href=\"#docker\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>In 2022 I'm still a
    docker fan-boy and I run my traefik instance in a docker container.\nThis isn't
    necessary but I love the portability since my homelab is very dynamic at the moment.\nAnd
    even if it wasn't I'd still want to keep traefik in docker because deployment
    and updating are just so flipping easy</p>\n<p>A simple docker-compose file for
    traefik might look like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">name</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik</span>\n<span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;traefik:v2.4&quot;</span>\n<span class=\"nt\">network_mode</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">host</span>\n<span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;docker-data/traefik/config.yml:/etc/traefik/config.yml:ro&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;docker-data/traefik/letsencrypt:/letsencrypt:rw&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;/var/run/docker.sock:/var/run/docker.sock:ro&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># for auto-discovery</span>\n<span class=\"nt\">env</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">traefik_environment_variables</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">restart_policy</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;1g&quot;</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"ansible-deployment\">Ansible
    deployment <a class=\"header-anchor\" href=\"#ansible-deployment\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>I plan to have
    more on my homelab and Ansible on this site eventually...</strong></p>\n<p>I use
    Ansible to deploy most of my services at home, including traefik. My main homelab
    repo is <a href=\"https://github.com/nicpayne713/ansible-nas\">here</a> which
    is a fork of <a href=\"https://github.com/davestephens/ansible-nas\">Ansible NAS</a>.</p>\n<blockquote>\n<p>If
    you want my stuff then be sure to go to the <code>user/nic</code> branch on my
    fork</p>\n</blockquote>\n<p>You can see the ansible stuff for traefik <a href=\"https://github.com/davestephens/ansible-nas/tree/master/roles/traefik\">here</a></p>\n<h1
    id=\"config\">Config <a class=\"header-anchor\" href=\"#config\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I use a <code>traefik.toml</code>
    as the main config and it looks something like this.\nWith ansible a lot of this
    is done through template variables but this is the general idea.\nThis config
    tells traefik what ports to listen and forward on, and gives the names to be referenced
    by docker labels (down below).</p>\n<p>Traefik also has a handy web ui that with
    this config you can find on port <code>8080</code>.\nThere is a <code>providers</code>
    section - which is one of the biggest selling points of traefik for me.\nI have
    a docker provider configured  and a static file.</p>\n<p>The docker provider lets
    traefik auto-discover new services that I deploy and automatically handle the
    routing!\nThe static file lets me easily add non-dockerized service routing, or
    routing to dockerized services on another host (I think traefik has an easier
    way to do this automatically but I don't do it often enough to need that kind
    of automation).\nThen at the bottom is the SSL cert stuff.\nUsing Let's Encrypt
    is pretty easy and I use Cloudflare as my DNS provider</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[entryPoints]</span>\n<span
    class=\"k\">[entryPoints.web]</span>\n<span class=\"n\">address</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;:80&quot;</span>\n\n<span
    class=\"k\">[entryPoints.web.http.redirections.entryPoint]</span>\n<span class=\"n\">to</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;websecure&quot;</span>\n\n<span class=\"k\">[entryPoints.websecure]</span>\n<span
    class=\"n\">address</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:443&quot;</span>\n\n<span class=\"k\">[entryPoints.websecure.http.tls]</span>\n<span
    class=\"n\">certResolver</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;letsencrypt&quot;</span>\n\n<span
    class=\"k\">[entryPoints.websecure.http.tls.domains]</span>\n<span class=\"n\">main</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;example.com&quot;</span>\n<span class=\"n\">sans</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">[</span>\n<span class=\"s2\">&quot;*.example.com&quot;</span>\n<span
    class=\"p\">]</span>\n\n<span class=\"k\">[entryPoints.traefik]</span>\n<span
    class=\"n\">address</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:8080&quot;</span>\n\n<span class=\"k\">[providers]</span>\n<span
    class=\"n\">providersThrottleDuration</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;1s&quot;</span>\n<span class=\"k\">[providers.docker]</span>\n<span
    class=\"n\">exposedbydefault</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">false</span>\n<span class=\"k\">[providers.file]</span>\n<span
    class=\"n\">filename</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;/etc/traefik/config.yml&quot;</span>\n\n<span
    class=\"k\">[api]</span>\n<span class=\"n\">insecure</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span>\n<span
    class=\"n\">dashboard</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span>\n\n<span class=\"k\">[log]</span>\n<span
    class=\"n\">level</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;INFO&quot;</span>\n\n<span class=\"k\">[ping]</span>\n<span
    class=\"n\">terminatingStatusCode</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"mi\">0</span>\n\n<span class=\"k\">[certificatesResolvers]</span>\n<span
    class=\"k\">[certificatesResolvers.letsencrypt]</span>\n<span class=\"k\">[certificatesResolvers.letsencrypt.acme]</span>\n<span
    class=\"n\">email</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;my_email@example.com&quot;</span>\n<span
    class=\"n\">storage</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;/letsencrypt/acme.json&quot;</span>\n<span
    class=\"n\">caserver</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;https://acme-staging-v02.api.letsencrypt.org/directory&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># le staging, not prod</span>\n\n<span
    class=\"k\">[certificatesResolvers.letsencrypt.acme.dnsChallenge]</span>\n<span
    class=\"n\">provider</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;cloudflare&quot;</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"providersfile\">Providers.file <a class=\"header-anchor\" href=\"#providersfile\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>To my knowledge there
    isn't much to configure on the docker provider side of things until you deploy
    a service.\nBut the provider config file should get a little screen time here.</p>\n<p>The
    file defines a traefik http router for each service you define, in this case just
    <code>pihole</code>.</p>\n<p>Here I am adding my pihole instance which is not
    run inside docker but is inside a VM on another host.\nI want the <code>entryPoints</code>
    to be set to <code>websecure</code> which is configured above in the http redirects.\nI
    want some middlewares, <code>addprefix-pihole</code> and <code>default-headers</code>,
    which I'll explain below.\nI set letsencrypt as the cert certResolver.\nFinally
    I name the service <code>pihole</code>.</p>\n<p>Then in the <code>services</code>
    section I configure where pihole is located by just giving the internal IP for
    traefik to route to.\nFinally I define my middlewares.\nTo get to the pihole homepage
    you need to use the route <code>/admin</code> so I want that added automatically
    when I go to <code>pihole.example.com</code> so I come to <code>pihole.example.com/admin</code>.\nAnd
    I wanted to restrict access to just my internal network and my wireguard network
    - this is done with the <code>default-whitelist</code>.\nThe last thing is to
    configure a chain of middlewares that I called <code>secured</code> which is just
    easier for the docker labels later on.</p>\n<p>With this config in play though,
    traefik will know about the route <code>pihole.example.com</code> and handle the
    ip whitelisting and load balancing for me.</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">http</span><span
    class=\"p\">:</span>\n<span class=\"w\"> </span><span class=\"c1\">#region routers
    </span>\n<span class=\"w\">  </span><span class=\"nt\">routers</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"nt\">pihole</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">entryPoints</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;websecure&quot;</span>\n<span class=\"w\">      </span><span
    class=\"nt\">rule</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;Host(`pihole.example.com`)&quot;</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># - default-headers</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">addprefix-pihole</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-whitelist</span>\n<span
    class=\"w\">      </span><span class=\"nt\">tls</span><span class=\"p\">:</span><span
    class=\"w\"> </span>\n<span class=\"w\">        </span><span class=\"nt\">certResolver</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">letsencrypt</span>\n<span
    class=\"w\">      </span><span class=\"nt\">service</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">pihole</span>\n<span
    class=\"w\">  </span><span class=\"c1\">#region services</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">services</span><span class=\"p\">:</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">pihole</span><span class=\"p\">:</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">loadBalancer</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">servers</span><span class=\"p\">:</span>\n<span
    class=\"w\">          </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"nt\">url</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"s\">&quot;http://192.168.1.3:80&quot;</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">passHostHeader</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">  </span><span class=\"c1\">#endregion</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"nt\">addprefix-pihole</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">addPrefix</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">prefix</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s\">&quot;/admin&quot;</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">https-redirect</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">redirectScheme</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">scheme</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">https</span>\n\n<span
    class=\"w\">    </span><span class=\"nt\">default-headers</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">headers</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">frameDeny</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">sslRedirect</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">browserXssFilter</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">contentTypeNosniff</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">forceSTSHeader</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsIncludeSubdomains</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsPreload</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span>\n<span
    class=\"w\">        </span><span class=\"nt\">stsSeconds</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">15552000</span>\n<span
    class=\"w\">        </span><span class=\"nt\">customFrameOptionsValue</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">SAMEORIGIN</span>\n\n<span
    class=\"w\">    </span><span class=\"nt\">default-whitelist</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">ipWhiteList</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">sourceRange</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;10.6.0.0/24&quot;</span><span class=\"w\">  </span><span
    class=\"c1\"># wg</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;192.168.1.0/24&quot;</span><span class=\"w\">
    \ </span><span class=\"c1\"># lan</span>\n<span class=\"w\">        </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;172.17.0.0/16&quot;</span><span
    class=\"w\">  </span><span class=\"c1\"># docker</span>\n\n<span class=\"w\">
    \   </span><span class=\"nt\">secured</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"nt\">chain</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"nt\">middlewares</span><span class=\"p\">:</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-whitelist</span>\n<span
    class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">default-headers</span>\n</pre></div>\n\n</pre>\n\n<h1
    id=\"docker-labels\">Docker labels <a class=\"header-anchor\" href=\"#docker-labels\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Now the real magic is
    with Docker.\nHere is an example docker-compose file for spinning up a <a href=\"https://jellyfin.org/\">jellyfin</a>
    server that you want to expose to the world, or at least access at home with <code>jellyfin.example.com</code>
    instead of <code>http://192.168.1.N:8096</code>...</p>\n<p>I left some of the
    ansible variable stuff in here, but the main part to be concerned with is the
    <code>labels</code> section...</p>\n<p>We define just a few labels to throw onto
    this docker container which let's traefik discover it automatically and apply
    any settings necessary (like my <code>ipWhiteList</code>).</p>\n<ul>\n<li><code>traefik.enable</code>
    is either True or False.</li>\n<li><code>traefik.http.router.jellyfin.rule</code>
    defines an http router called jellyfin and sets the url to <code>jellyfin.example.com</code>
    (if <a href=\"http://example.com\">example.com</a> was my <code>ansible_nas_domain</code>)</li>\n<li><code>traefik.http.routers.jellyfin.tls.certresolver</code>
    is set to letsencrypt since I use LE for my wildcard certs.</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].main</code>
    will just be <code>example.com</code> -&gt; and this should remind you of the
    toml file above</li>\n<li><code>traefik.http.routers.jellyfin.tls.domains[0].sans</code>
    is set to <code>*.example.com</code></li>\n<li><code>traefik.http.services.jellyfin.loadbalancer.server.port</code>
    is set to jellyfin's default http port of 8096, which tells traefik which port
    to point to for this service.</li>\n</ul>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">name</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">jellyfin</span>\n<span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">linuxserver/jellyfin</span>\n<span class=\"nt\">volumes</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_config_directory</span><span class=\"nv\"> </span><span class=\"s\">}}:/config:rw&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_movies_directory</span><span
    class=\"nv\"> </span><span class=\"s\">}}:/movies:{{</span><span class=\"nv\">
    </span><span class=\"s\">jellyfin_movies_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p
    p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_music_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/music:{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_music_permissions</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_photos_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/photos:{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_photos_permissions</span><span class=\"nv\"> </span><span
    class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_tv_directory</span><span class=\"nv\"> </span><span class=\"s\">}}:/tv:{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_tv_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"p
    p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_books_directory</span><span class=\"nv\">
    </span><span class=\"s\">}}:/books:{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_books_permissions</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_audiobooks_directory</span><span
    class=\"nv\"> </span><span class=\"s\">}}:/audiobooks:{{</span><span class=\"nv\">
    </span><span class=\"s\">jellyfin_audiobooks_permissions</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">ports</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span
    class=\"s\">jellyfin_port_http</span><span class=\"nv\"> </span><span class=\"s\">}}:8096&quot;</span>\n<span
    class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;{{</span><span class=\"nv\"> </span><span class=\"s\">jellyfin_port_https</span><span
    class=\"nv\"> </span><span class=\"s\">}}:8920&quot;</span>\n<span class=\"nt\">env</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">TZ</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_timezone</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">PUID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_user_id</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">PGID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_group_id</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"nt\">restart_policy</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">1g</span>\n<span class=\"nt\">labels</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.enable</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">jellyfin_available_externally</span><span
    class=\"nv\"> </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span
    class=\"nt\">traefik.http.routers.jellyfin.rule</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s\">&quot;Host(`jellyfin.{{</span><span class=\"nv\">
    </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\"> </span><span
    class=\"s\">}}`)&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.http.routers.jellyfin.tls.certresolver</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;letsencrypt&quot;</span>\n<span
    class=\"w\">  </span><span class=\"l l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].main</span><span
    class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"l
    l-Scalar l-Scalar-Plain\">traefik.http.routers.jellyfin.tls.domains[0].sans</span><span
    class=\"p p-Indicator\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;*.{{</span><span
    class=\"nv\"> </span><span class=\"s\">ansible_nas_domain</span><span class=\"nv\">
    </span><span class=\"s\">}}&quot;</span>\n<span class=\"w\">  </span><span class=\"nt\">traefik.http.services.jellyfin.loadbalancer.server.port</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s\">&quot;8096&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>And
    just like that traefik will automagically find your jellyfin container and route
    <code>jellyfin.example.com</code> to it!</p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['homelab', 'tech']\ntitle: Traefik\ndate:
    2022-03-06T00:00:00\npublished: True\n#cover: \"media/traefik-01.png\"\n\n---\n\n#
    Traefik\n\nIf you don't know about [traefik](https://doc.traefik.io/traefik/)
    and you need a reverse-proxy then you might want to check it out.\nI used to use
    nginx for my reverse proxy but the config was over my head, and once it was working
    I was afraid to touch it.\nTraefik brings a lot to the table, my main uses are
    reverse proxy and ip whitelisting, but it's doing even more under the hood that
    I don't have a full-grasp of yet.\n\nI like Traefik a lot because once I get some
    basic config up it's incredibly easy to add services into my homelab whether they
    run on my primary server or not.\nThis will not be exhaustive but I'll outline
    my simple setup process of traefik and how I add services whether they are in
    docker or not.\n\n# Docker\n\nIn 2022 I'm still a docker fan-boy and I run my
    traefik instance in a docker container. \nThis isn't necessary but I love the
    portability since my homelab is very dynamic at the moment.\nAnd even if it wasn't
    I'd still want to keep traefik in docker because deployment and updating are just
    so flipping easy\n\nA simple docker-compose file for traefik might look like this:\n\n```yaml\nname:
    traefik\nimage: \"traefik:v2.4\"\nnetwork_mode: host\nvolumes:\n  - \"docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro\"\n
    \ - \"docker-data/traefik/config.yml:/etc/traefik/config.yml:ro\"\n  - \"docker-data/traefik/letsencrypt:/letsencrypt:rw\"\n
    \ - \"/var/run/docker.sock:/var/run/docker.sock:ro\"  # for auto-discovery\nenv:
    \"{{ traefik_environment_variables }}\"\nrestart_policy: unless-stopped\nmemory:
    \"1g\"\n```\n\n# Ansible deployment\n\n__I plan to have more on my homelab and
    Ansible on this site eventually...__\n\nI use Ansible to deploy most of my services
    at home, including traefik. My main homelab repo is [here](https://github.com/nicpayne713/ansible-nas)
    which is a fork of [Ansible NAS](https://github.com/davestephens/ansible-nas).\n\n>
    If you want my stuff then be sure to go to the `user/nic` branch on my fork\n\nYou
    can see the ansible stuff for traefik [here](https://github.com/davestephens/ansible-nas/tree/master/roles/traefik)\n\n#
    Config\n\nI use a `traefik.toml` as the main config and it looks something like
    this.\nWith ansible a lot of this is done through template variables but this
    is the general idea.\nThis config tells traefik what ports to listen and forward
    on, and gives the names to be referenced by docker labels (down below). \n\nTraefik
    also has a handy web ui that with this config you can find on port `8080`.\nThere
    is a `providers` section - which is one of the biggest selling points of traefik
    for me.\nI have a docker provider configured  and a static file. \n\nThe docker
    provider lets traefik auto-discover new services that I deploy and automatically
    handle the routing!\nThe static file lets me easily add non-dockerized service
    routing, or routing to dockerized services on another host (I think traefik has
    an easier way to do this automatically but I don't do it often enough to need
    that kind of automation).\nThen at the bottom is the SSL cert stuff. \nUsing Let's
    Encrypt is pretty easy and I use Cloudflare as my DNS provider\n\n```toml\n\n[entryPoints]\n[entryPoints.web]\naddress
    = \":80\"\n\n[entryPoints.web.http.redirections.entryPoint]\nto = \"websecure\"\n\n[entryPoints.websecure]\naddress
    = \":443\"\n\n[entryPoints.websecure.http.tls]\ncertResolver = \"letsencrypt\"\n\n[entryPoints.websecure.http.tls.domains]\nmain
    = \"example.com\"\nsans = [\n\"*.example.com\"\n]\n\n[entryPoints.traefik]\naddress
    = \":8080\"\n\n[providers]\nprovidersThrottleDuration = \"1s\"\n[providers.docker]\nexposedbydefault
    = false\n[providers.file]\nfilename = \"/etc/traefik/config.yml\"\n\n[api]\ninsecure
    = true\ndashboard = true\n\n[log]\nlevel = \"INFO\"\n\n[ping]\nterminatingStatusCode
    = 0\n\n[certificatesResolvers]\n[certificatesResolvers.letsencrypt]\n[certificatesResolvers.letsencrypt.acme]\nemail
    = \"my_email@example.com\"\nstorage = \"/letsencrypt/acme.json\"\ncaserver = \"https://acme-staging-v02.api.letsencrypt.org/directory\"
    \ # le staging, not prod\n\n[certificatesResolvers.letsencrypt.acme.dnsChallenge]\nprovider
    = \"cloudflare\"\n```\n\n# Providers.file\n\nTo my knowledge there isn't much
    to configure on the docker provider side of things until you deploy a service.\nBut
    the provider config file should get a little screen time here.\n\nThe file defines
    a traefik http router for each service you define, in this case just `pihole`.
    \n\nHere I am adding my pihole instance which is not run inside docker but is
    inside a VM on another host.\nI want the `entryPoints` to be set to `websecure`
    which is configured above in the http redirects.\nI want some middlewares, `addprefix-pihole`
    and `default-headers`, which I'll explain below.\nI set letsencrypt as the cert
    certResolver.\nFinally I name the service `pihole`.\n\nThen in the `services`
    section I configure where pihole is located by just giving the internal IP for
    traefik to route to.\nFinally I define my middlewares. \nTo get to the pihole
    homepage you need to use the route `/admin` so I want that added automatically
    when I go to `pihole.example.com` so I come to `pihole.example.com/admin`.\nAnd
    I wanted to restrict access to just my internal network and my wireguard network
    - this is done with the `default-whitelist`. \nThe last thing is to configure
    a chain of middlewares that I called `secured` which is just easier for the docker
    labels later on.\n\nWith this config in play though, traefik will know about the
    route `pihole.example.com` and handle the ip whitelisting and load balancing for
    me.\n\n```yaml\nhttp:\n #region routers \n  routers:\n    pihole:\n      entryPoints:\n
    \       - \"websecure\"\n      rule: \"Host(`pihole.example.com`)\"\n      middlewares:\n
    \       # - default-headers\n        - addprefix-pihole\n        - default-whitelist\n
    \     tls: \n        certResolver: letsencrypt\n      service: pihole\n  #region
    services\n  services:\n    pihole:\n      loadBalancer:\n        servers:\n          -
    url: \"http://192.168.1.3:80\"\n        passHostHeader: true\n  #endregion\n  middlewares:\n
    \   addprefix-pihole:\n      addPrefix:\n        prefix: \"/admin\"\n    https-redirect:\n
    \     redirectScheme:\n        scheme: https\n\n    default-headers:\n      headers:\n
    \       frameDeny: true\n        sslRedirect: true\n        browserXssFilter:
    true\n        contentTypeNosniff: true\n        forceSTSHeader: true\n        stsIncludeSubdomains:
    true\n        stsPreload: true\n        stsSeconds: 15552000\n        customFrameOptionsValue:
    SAMEORIGIN\n\n    default-whitelist:\n      ipWhiteList:\n        sourceRange:\n
    \       - \"10.6.0.0/24\"  # wg\n        - \"192.168.1.0/24\"  # lan\n        -
    \"172.17.0.0/16\"  # docker\n\n    secured:\n      chain:\n        middlewares:\n
    \       - default-whitelist\n        - default-headers\n```\n\n\n# Docker labels\n\nNow
    the real magic is with Docker.\nHere is an example docker-compose file for spinning
    up a [jellyfin](https://jellyfin.org/) server that you want to expose to the world,
    or at least access at home with `jellyfin.example.com` instead of `http://192.168.1.N:8096`...\n\nI
    left some of the ansible variable stuff in here, but the main part to be concerned
    with is the `labels` section...\n\nWe define just a few labels to throw onto this
    docker container which let's traefik discover it automatically and apply any settings
    necessary (like my `ipWhiteList`).\n\n* `traefik.enable` is either True or False.
    \n* `traefik.http.router.jellyfin.rule` defines an http router called jellyfin
    and sets the url to `jellyfin.example.com` (if example.com was my `ansible_nas_domain`)\n*
    `traefik.http.routers.jellyfin.tls.certresolver` is set to letsencrypt since I
    use LE for my wildcard certs.\n* `traefik.http.routers.jellyfin.tls.domains[0].main`
    will just be `example.com` -> and this should remind you of the toml file above\n*
    `traefik.http.routers.jellyfin.tls.domains[0].sans` is set to `*.example.com`\n*
    `traefik.http.services.jellyfin.loadbalancer.server.port` is set to jellyfin's
    default http port of 8096, which tells traefik which port to point to for this
    service.\n\n```yaml\nname: jellyfin\nimage: linuxserver/jellyfin\nvolumes:\n  -
    \"{{ jellyfin_config_directory }}:/config:rw\"\n  - \"{{ jellyfin_movies_directory
    }}:/movies:{{ jellyfin_movies_permissions }}\"\n  - \"{{ jellyfin_music_directory
    }}:/music:{{ jellyfin_music_permissions }}\"\n  - \"{{ jellyfin_photos_directory
    }}:/photos:{{ jellyfin_photos_permissions }}\"\n  - \"{{ jellyfin_tv_directory
    }}:/tv:{{ jellyfin_tv_permissions }}\"\n  - \"{{ jellyfin_books_directory }}:/books:{{
    jellyfin_books_permissions }}\"\n  - \"{{ jellyfin_audiobooks_directory }}:/audiobooks:{{
    jellyfin_audiobooks_permissions }}\"\nports:\n  - \"{{ jellyfin_port_http }}:8096\"\n
    \ - \"{{ jellyfin_port_https }}:8920\"\nenv:\n  TZ: \"{{ ansible_nas_timezone
    }}\"\n  PUID: \"{{ jellyfin_user_id }}\"\n  PGID: \"{{ jellyfin_group_id }}\"\nrestart_policy:
    unless-stopped\nmemory: 1g\nlabels:\n  traefik.enable: \"{{ jellyfin_available_externally
    }}\"\n  traefik.http.routers.jellyfin.rule: \"Host(`jellyfin.{{ ansible_nas_domain
    }}`)\"\n  traefik.http.routers.jellyfin.tls.certresolver: \"letsencrypt\"\n  traefik.http.routers.jellyfin.tls.domains[0].main:
    \"{{ ansible_nas_domain }}\"\n  traefik.http.routers.jellyfin.tls.domains[0].sans:
    \"*.{{ ansible_nas_domain }}\"\n  traefik.http.services.jellyfin.loadbalancer.server.port:
    \"8096\"\n```\n\n\nAnd just like that traefik will automagically find your jellyfin
    container and route `jellyfin.example.com` to it!\n"
published: true
slug: traefik
title: Traefik


---

# Traefik

If you don't know about [traefik](https://doc.traefik.io/traefik/) and you need a reverse-proxy then you might want to check it out.
I used to use nginx for my reverse proxy but the config was over my head, and once it was working I was afraid to touch it.
Traefik brings a lot to the table, my main uses are reverse proxy and ip whitelisting, but it's doing even more under the hood that I don't have a full-grasp of yet.

I like Traefik a lot because once I get some basic config up it's incredibly easy to add services into my homelab whether they run on my primary server or not.
This will not be exhaustive but I'll outline my simple setup process of traefik and how I add services whether they are in docker or not.

# Docker

In 2022 I'm still a docker fan-boy and I run my traefik instance in a docker container. 
This isn't necessary but I love the portability since my homelab is very dynamic at the moment.
And even if it wasn't I'd still want to keep traefik in docker because deployment and updating are just so flipping easy

A simple docker-compose file for traefik might look like this:

```yaml
name: traefik
image: "traefik:v2.4"
network_mode: host
volumes:
  - "docker-data/traefik/traefik.toml:/etc/traefik/traefik.toml:ro"
  - "docker-data/traefik/config.yml:/etc/traefik/config.yml:ro"
  - "docker-data/traefik/letsencrypt:/letsencrypt:rw"
  - "/var/run/docker.sock:/var/run/docker.sock:ro"  # for auto-discovery
env: "{{ traefik_environment_variables }}"
restart_policy: unless-stopped
memory: "1g"
```

# Ansible deployment

__I plan to have more on my homelab and Ansible on this site eventually...__

I use Ansible to deploy most of my services at home, including traefik. My main homelab repo is [here](https://github.com/nicpayne713/ansible-nas) which is a fork of [Ansible NAS](https://github.com/davestephens/ansible-nas).

> If you want my stuff then be sure to go to the `user/nic` branch on my fork

You can see the ansible stuff for traefik [here](https://github.com/davestephens/ansible-nas/tree/master/roles/traefik)

# Config

I use a `traefik.toml` as the main config and it looks something like this.
With ansible a lot of this is done through template variables but this is the general idea.
This config tells traefik what ports to listen and forward on, and gives the names to be referenced by docker labels (down below). 

Traefik also has a handy web ui that with this config you can find on port `8080`.
There is a `providers` section - which is one of the biggest selling points of traefik for me.
I have a docker provider configured  and a static file. 

The docker provider lets traefik auto-discover new services that I deploy and automatically handle the routing!
The static file lets me easily add non-dockerized service routing, or routing to dockerized services on another host (I think traefik has an easier way to do this automatically but I don't do it often enough to need that kind of automation).
Then at the bottom is the SSL cert stuff. 
Using Let's Encrypt is pretty easy and I use Cloudflare as my DNS provider

```toml

[entryPoints]
[entryPoints.web]
address = ":80"

[entryPoints.web.http.redirections.entryPoint]
to = "websecure"

[entryPoints.websecure]
address = ":443"

[entryPoints.websecure.http.tls]
certResolver = "letsencrypt"

[entryPoints.websecure.http.tls.domains]
main = "example.com"
sans = [
"*.example.com"
]

[entryPoints.traefik]
address = ":8080"

[providers]
providersThrottleDuration = "1s"
[providers.docker]
exposedbydefault = false
[providers.file]
filename = "/etc/traefik/config.yml"

[api]
insecure = true
dashboard = true

[log]
level = "INFO"

[ping]
terminatingStatusCode = 0

[certificatesResolvers]
[certificatesResolvers.letsencrypt]
[certificatesResolvers.letsencrypt.acme]
email = "my_email@example.com"
storage = "/letsencrypt/acme.json"
caserver = "https://acme-staging-v02.api.letsencrypt.org/directory"  # le staging, not prod

[certificatesResolvers.letsencrypt.acme.dnsChallenge]
provider = "cloudflare"
```

# Providers.file

To my knowledge there isn't much to configure on the docker provider side of things until you deploy a service.
But the provider config file should get a little screen time here.

The file defines a traefik http router for each service you define, in this case just `pihole`. 

Here I am adding my pihole instance which is not run inside docker but is inside a VM on another host.
I want the `entryPoints` to be set to `websecure` which is configured above in the http redirects.
I want some middlewares, `addprefix-pihole` and `default-headers`, which I'll explain below.
I set letsencrypt as the cert certResolver.
Finally I name the service `pihole`.

Then in the `services` section I configure where pihole is located by just giving the internal IP for traefik to route to.
Finally I define my middlewares. 
To get to the pihole homepage you need to use the route `/admin` so I want that added automatically when I go to `pihole.example.com` so I come to `pihole.example.com/admin`.
And I wanted to restrict access to just my internal network and my wireguard network - this is done with the `default-whitelist`. 
The last thing is to configure a chain of middlewares that I called `secured` which is just easier for the docker labels later on.

With this config in play though, traefik will know about the route `pihole.example.com` and handle the ip whitelisting and load balancing for me.

```yaml
http:
 #region routers 
  routers:
    pihole:
      entryPoints:
        - "websecure"
      rule: "Host(`pihole.example.com`)"
      middlewares:
        # - default-headers
        - addprefix-pihole
        - default-whitelist
      tls: 
        certResolver: letsencrypt
      service: pihole
  #region services
  services:
    pihole:
      loadBalancer:
        servers:
          - url: "http://192.168.1.3:80"
        passHostHeader: true
  #endregion
  middlewares:
    addprefix-pihole:
      addPrefix:
        prefix: "/admin"
    https-redirect:
      redirectScheme:
        scheme: https

    default-headers:
      headers:
        frameDeny: true
        sslRedirect: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 15552000
        customFrameOptionsValue: SAMEORIGIN

    default-whitelist:
      ipWhiteList:
        sourceRange:
        - "10.6.0.0/24"  # wg
        - "192.168.1.0/24"  # lan
        - "172.17.0.0/16"  # docker

    secured:
      chain:
        middlewares:
        - default-whitelist
        - default-headers
```


# Docker labels

Now the real magic is with Docker.
Here is an example docker-compose file for spinning up a [jellyfin](https://jellyfin.org/) server that you want to expose to the world, or at least access at home with `jellyfin.example.com` instead of `http://192.168.1.N:8096`...

I left some of the ansible variable stuff in here, but the main part to be concerned with is the `labels` section...

We define just a few labels to throw onto this docker container which let's traefik discover it automatically and apply any settings necessary (like my `ipWhiteList`).

* `traefik.enable` is either True or False. 
* `traefik.http.router.jellyfin.rule` defines an http router called jellyfin and sets the url to `jellyfin.example.com` (if example.com was my `ansible_nas_domain`)
* `traefik.http.routers.jellyfin.tls.certresolver` is set to letsencrypt since I use LE for my wildcard certs.
* `traefik.http.routers.jellyfin.tls.domains[0].main` will just be `example.com` -> and this should remind you of the toml file above
* `traefik.http.routers.jellyfin.tls.domains[0].sans` is set to `*.example.com`
* `traefik.http.services.jellyfin.loadbalancer.server.port` is set to jellyfin's default http port of 8096, which tells traefik which port to point to for this service.

```yaml
name: jellyfin
image: linuxserver/jellyfin
volumes:
  - "{{ jellyfin_config_directory }}:/config:rw"
  - "{{ jellyfin_movies_directory }}:/movies:{{ jellyfin_movies_permissions }}"
  - "{{ jellyfin_music_directory }}:/music:{{ jellyfin_music_permissions }}"
  - "{{ jellyfin_photos_directory }}:/photos:{{ jellyfin_photos_permissions }}"
  - "{{ jellyfin_tv_directory }}:/tv:{{ jellyfin_tv_permissions }}"
  - "{{ jellyfin_books_directory }}:/books:{{ jellyfin_books_permissions }}"
  - "{{ jellyfin_audiobooks_directory }}:/audiobooks:{{ jellyfin_audiobooks_permissions }}"
ports:
  - "{{ jellyfin_port_http }}:8096"
  - "{{ jellyfin_port_https }}:8920"
env:
  TZ: "{{ ansible_nas_timezone }}"
  PUID: "{{ jellyfin_user_id }}"
  PGID: "{{ jellyfin_group_id }}"
restart_policy: unless-stopped
memory: 1g
labels:
  traefik.enable: "{{ jellyfin_available_externally }}"
  traefik.http.routers.jellyfin.rule: "Host(`jellyfin.{{ ansible_nas_domain }}`)"
  traefik.http.routers.jellyfin.tls.certresolver: "letsencrypt"
  traefik.http.routers.jellyfin.tls.domains[0].main: "{{ ansible_nas_domain }}"
  traefik.http.routers.jellyfin.tls.domains[0].sans: "*.{{ ansible_nas_domain }}"
  traefik.http.services.jellyfin.loadbalancer.server.port: "8096"
```


And just like that traefik will automagically find your jellyfin container and route `jellyfin.example.com` to it!