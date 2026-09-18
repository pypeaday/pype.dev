---
content: "## $HOME\n\nI don't know what to call my opinionated homelab distribution
  yet but I will try to have some goals for today or tomorrow for simple steps\n  -
  drawing up all the pieces will take a while but is necessary\n  - ansible playbook
  to make zfs datasets for vms or containers is easy first utility to bank somewhere\n\n\n##
  Homelab\n\n- started chatting with jipity about some automation... I have so many
  ideas that circle my head and I have a hard time implementing anything for fear
  of committing halfway to something... \n- I think I can take baby steps to mitigate
  that issue and one way is to automate the first thing that annoys me - zfs dataset
  creation for new apps. I assume that I want a new zfs dataset if I'm going to provision
  something into my homelab so that means\n  - dataset creation on the appropriate
  node\n  - permissions\n  - updates to `zfs-ops` (eventually dataops in homelab-mono)
  for the backup to be added explicitly (or removed if I'm removing one - for example
  some old VM datasets I no longer need)\n\n- I also mind-dumped after starting the
  convo with jipity, using speakr to get a short summary of a brain dump is pretty
  awesome especially considering the purely local self-hosted nature. Here's the summary
  of a pretty concentrated 6 minute monologue on things I'm thinking about:\n  - Summary
  is imperfect - but again, for self-hosted hardware and getting purely private LLM-assisted
  brainstorming is really cool. However, I do plan on sinking some thought into the
  big boys (claude or jippity) as I very slowly begin construction\n\n!!! note \"speakr
  self-hosted summary\"\n\n    Key Issues Discussed\n\n        Platform and service
  idea for consulting\n        Product as an opinionated home lab targeting small
  teams or on-prem setups with Docker Swarm + ZFS\n        Focus on privacy, data
  ownership, compute ownership while providing cloud options (AWS)\n        Hardware
  recommendations part of services\n        Use AWS resources when possible but self-hosting
  is also viable option\n        Tail scale for business networking and network ACLs
  provided by the vendor\n\n    Key Decisions Made\n\n        Deploy servers using
  Docker Swarm + ZFS with an opinionated approach to data management, backups, application
  deployment monitoring.\n        Cloud options include Terraform set up in AWS (and
  possibly Azure later)\n        Use U-Corps as a base for containers on top of Ubuntu
  distro box; consider KeyCloak or Aphalia for authentication\n        DNS and public
  services will be handled with NameCheap and Cloudflare using Terraform, not picking
  each other\u2019s features.\n        CERT management is Let\u2019s Encrypt\n        Observability
  through Harbor telemetry data gathering\n\nI brainstormed a little more witih jipity
  this morning and got this set of pillars\n\n!!! note \"pillars\"\n\n    Infrastructure
  (hardware, OS, baseline networking)\n\n    DataOps (storage, backup, placement)\n\n
  \   Orchestration (containers, jobs, IaC)\n\n    Networking & Connectivity (service-to-service,
  ingress/egress)\n\n    Security & Identity (auth, secrets, policies, hardening)\n\n
  \   Observability (metrics, logging, tracing, health)\n\n    Automation & CI/CD
  (playbooks, pipelines, GitOps)\n\n    Resilience & Recovery (HA, redundancy, DR,
  self-healing)\n\n    Experience (DX, onboarding, docs, templates)\n\n## Features\n\nI'm
  taking notes in affine\n[here](https://affine.paynepride.com/workspace/068b2d03-00ee-4b4b-9a8d-d7b98e85f1f2/pufV8iRo_XoCpVuPgQ6vA)\nto
  capture requirements grouped by feature or relevant level of the stack (ie.\nOS
  package installs vs repository setup vs pipeline recommendations etc.)\n\n## Tools\n\n-
  [komodo](https://github.com/pypeaday/komodo) for server deployment etc... it actaully
  has a ton of things in it for managing compose stacks on multiple nodes right now,
  with [swarm support coming](https://github.com/moghtech/komodo/issues/37)\n  - in
  the mean time [this comment](https://github.com/moghtech/komodo/issues/37#issuecomment-3106074124)
  gives a short example on using swarm's overlay network and managing the stack from
  within komodo (kind of)"
date: 2025-09-01
description: $HOME I don&#x27;t know what to call my opinionated homelab distribution
  yet but I will try to have some goals for today or tomorrow for simple steps drawing
  up
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Homelab As A Service</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"$HOME I don&#x27;t know what to call
    my opinionated homelab distribution yet but I will try to have some goals for
    today or tomorrow for simple steps drawing up\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Homelab As A Service | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/homelab-as-a-service\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Homelab As A Service | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"$HOME I don&#x27;t know what to call my opinionated homelab distribution
    yet but I will try to have some goals for today or tomorrow for simple steps drawing
    up\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/homelab-as-a-service</span>\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Homelab As A Service</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-09-01\">\n            September
    01, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/projects/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #projects\n
    \           </a>\n            <a href=\"https://pype.dev//tags/product/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #product\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"home\">$HOME <a class=\"header-anchor\"
    href=\"#home\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I don't know what to
    call my opinionated homelab distribution yet but I will try to have some goals
    for today or tomorrow for simple steps</p>\n<ul>\n<li>drawing up all the pieces
    will take a while but is necessary</li>\n<li>ansible playbook to make zfs datasets
    for vms or containers is easy first utility to bank somewhere</li>\n</ul>\n<h2
    id=\"homelab\">Homelab <a class=\"header-anchor\" href=\"#homelab\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>\n<p>started
    chatting with jipity about some automation... I have so many ideas that circle
    my head and I have a hard time implementing anything for fear of committing halfway
    to something...</p>\n</li>\n<li>\n<p>I think I can take baby steps to mitigate
    that issue and one way is to automate the first thing that annoys me - zfs dataset
    creation for new apps. I assume that I want a new zfs dataset if I'm going to
    provision something into my homelab so that means</p>\n<ul>\n<li>dataset creation
    on the appropriate node</li>\n<li>permissions</li>\n<li>updates to <code>zfs-ops</code>
    (eventually dataops in homelab-mono) for the backup to be added explicitly (or
    removed if I'm removing one - for example some old VM datasets I no longer need)</li>\n</ul>\n</li>\n<li>\n<p>I
    also mind-dumped after starting the convo with jipity, using speakr to get a short
    summary of a brain dump is pretty awesome especially considering the purely local
    self-hosted nature. Here's the summary of a pretty concentrated 6 minute monologue
    on things I'm thinking about:</p>\n<ul>\n<li>Summary is imperfect - but again,
    for self-hosted hardware and getting purely private LLM-assisted brainstorming
    is really cool. However, I do plan on sinking some thought into the big boys (claude
    or jippity) as I very slowly begin construction</li>\n</ul>\n</li>\n</ul>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">speakr self-hosted summary</p>\n<p>Key
    Issues Discussed</p>\n<pre><code>Platform and service idea for consulting\nProduct
    as an opinionated home lab targeting small teams or on-prem setups with Docker
    Swarm + ZFS\nFocus on privacy, data ownership, compute ownership while providing
    cloud options (AWS)\nHardware recommendations part of services\nUse AWS resources
    when possible but self-hosting is also viable option\nTail scale for business
    networking and network ACLs provided by the vendor\n</code></pre>\n<p>Key Decisions
    Made</p>\n<pre><code>Deploy servers using Docker Swarm + ZFS with an opinionated
    approach to data management, backups, application deployment monitoring.\nCloud
    options include Terraform set up in AWS (and possibly Azure later)\nUse U-Corps
    as a base for containers on top of Ubuntu distro box; consider KeyCloak or Aphalia
    for authentication\nDNS and public services will be handled with NameCheap and
    Cloudflare using Terraform, not picking each other\u2019s features.\nCERT management
    is Let\u2019s Encrypt\nObservability through Harbor telemetry data gathering\n</code></pre>\n</div>\n<p>I
    brainstormed a little more witih jipity this morning and got this set of pillars</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">pillars</p>\n<p>Infrastructure
    (hardware, OS, baseline networking)</p>\n<p>DataOps (storage, backup, placement)</p>\n<p>Orchestration
    (containers, jobs, IaC)</p>\n<p>Networking &amp; Connectivity (service-to-service,
    ingress/egress)</p>\n<p>Security &amp; Identity (auth, secrets, policies, hardening)</p>\n<p>Observability
    (metrics, logging, tracing, health)</p>\n<p>Automation &amp; CI/CD (playbooks,
    pipelines, GitOps)</p>\n<p>Resilience &amp; Recovery (HA, redundancy, DR, self-healing)</p>\n<p>Experience
    (DX, onboarding, docs, templates)</p>\n</div>\n<h2 id=\"features\">Features <a
    class=\"header-anchor\" href=\"#features\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm taking notes in
    affine\n<a href=\"https://affine.paynepride.com/workspace/068b2d03-00ee-4b4b-9a8d-d7b98e85f1f2/pufV8iRo_XoCpVuPgQ6vA\">here</a>\nto
    capture requirements grouped by feature or relevant level of the stack (ie.\nOS
    package installs vs repository setup vs pipeline recommendations etc.)</p>\n<h2
    id=\"tools\">Tools <a class=\"header-anchor\" href=\"#tools\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><a href=\"https://github.com/pypeaday/komodo\">komodo</a>
    for server deployment etc... it actaully has a ton of things in it for managing
    compose stacks on multiple nodes right now, with <a href=\"https://github.com/moghtech/komodo/issues/37\">swarm
    support coming</a>\n<ul>\n<li>in the mean time <a href=\"https://github.com/moghtech/komodo/issues/37#issuecomment-3106074124\">this
    comment</a> gives a short example on using swarm's overlay network and managing
    the stack from within komodo (kind of)</li>\n</ul>\n</li>\n</ul>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Homelab As A Service</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"$HOME I don&#x27;t know what to call
    my opinionated homelab distribution yet but I will try to have some goals for
    today or tomorrow for simple steps drawing up\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Homelab As A Service | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/homelab-as-a-service\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Homelab As A Service | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"$HOME I don&#x27;t know what to call my opinionated homelab distribution
    yet but I will try to have some goals for today or tomorrow for simple steps drawing
    up\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Homelab As A Service</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-09-01\">\n            September
    01, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/projects/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #projects\n
    \           </a>\n            <a href=\"https://pype.dev//tags/product/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #product\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Homelab As A Service</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-09-01\">\n            September
    01, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/projects/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #projects\n
    \           </a>\n            <a href=\"https://pype.dev//tags/product/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #product\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"home\">$HOME <a class=\"header-anchor\"
    href=\"#home\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I don't know what to
    call my opinionated homelab distribution yet but I will try to have some goals
    for today or tomorrow for simple steps</p>\n<ul>\n<li>drawing up all the pieces
    will take a while but is necessary</li>\n<li>ansible playbook to make zfs datasets
    for vms or containers is easy first utility to bank somewhere</li>\n</ul>\n<h2
    id=\"homelab\">Homelab <a class=\"header-anchor\" href=\"#homelab\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>\n<p>started
    chatting with jipity about some automation... I have so many ideas that circle
    my head and I have a hard time implementing anything for fear of committing halfway
    to something...</p>\n</li>\n<li>\n<p>I think I can take baby steps to mitigate
    that issue and one way is to automate the first thing that annoys me - zfs dataset
    creation for new apps. I assume that I want a new zfs dataset if I'm going to
    provision something into my homelab so that means</p>\n<ul>\n<li>dataset creation
    on the appropriate node</li>\n<li>permissions</li>\n<li>updates to <code>zfs-ops</code>
    (eventually dataops in homelab-mono) for the backup to be added explicitly (or
    removed if I'm removing one - for example some old VM datasets I no longer need)</li>\n</ul>\n</li>\n<li>\n<p>I
    also mind-dumped after starting the convo with jipity, using speakr to get a short
    summary of a brain dump is pretty awesome especially considering the purely local
    self-hosted nature. Here's the summary of a pretty concentrated 6 minute monologue
    on things I'm thinking about:</p>\n<ul>\n<li>Summary is imperfect - but again,
    for self-hosted hardware and getting purely private LLM-assisted brainstorming
    is really cool. However, I do plan on sinking some thought into the big boys (claude
    or jippity) as I very slowly begin construction</li>\n</ul>\n</li>\n</ul>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">speakr self-hosted summary</p>\n<p>Key
    Issues Discussed</p>\n<pre><code>Platform and service idea for consulting\nProduct
    as an opinionated home lab targeting small teams or on-prem setups with Docker
    Swarm + ZFS\nFocus on privacy, data ownership, compute ownership while providing
    cloud options (AWS)\nHardware recommendations part of services\nUse AWS resources
    when possible but self-hosting is also viable option\nTail scale for business
    networking and network ACLs provided by the vendor\n</code></pre>\n<p>Key Decisions
    Made</p>\n<pre><code>Deploy servers using Docker Swarm + ZFS with an opinionated
    approach to data management, backups, application deployment monitoring.\nCloud
    options include Terraform set up in AWS (and possibly Azure later)\nUse U-Corps
    as a base for containers on top of Ubuntu distro box; consider KeyCloak or Aphalia
    for authentication\nDNS and public services will be handled with NameCheap and
    Cloudflare using Terraform, not picking each other\u2019s features.\nCERT management
    is Let\u2019s Encrypt\nObservability through Harbor telemetry data gathering\n</code></pre>\n</div>\n<p>I
    brainstormed a little more witih jipity this morning and got this set of pillars</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">pillars</p>\n<p>Infrastructure
    (hardware, OS, baseline networking)</p>\n<p>DataOps (storage, backup, placement)</p>\n<p>Orchestration
    (containers, jobs, IaC)</p>\n<p>Networking &amp; Connectivity (service-to-service,
    ingress/egress)</p>\n<p>Security &amp; Identity (auth, secrets, policies, hardening)</p>\n<p>Observability
    (metrics, logging, tracing, health)</p>\n<p>Automation &amp; CI/CD (playbooks,
    pipelines, GitOps)</p>\n<p>Resilience &amp; Recovery (HA, redundancy, DR, self-healing)</p>\n<p>Experience
    (DX, onboarding, docs, templates)</p>\n</div>\n<h2 id=\"features\">Features <a
    class=\"header-anchor\" href=\"#features\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm taking notes in
    affine\n<a href=\"https://affine.paynepride.com/workspace/068b2d03-00ee-4b4b-9a8d-d7b98e85f1f2/pufV8iRo_XoCpVuPgQ6vA\">here</a>\nto
    capture requirements grouped by feature or relevant level of the stack (ie.\nOS
    package installs vs repository setup vs pipeline recommendations etc.)</p>\n<h2
    id=\"tools\">Tools <a class=\"header-anchor\" href=\"#tools\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><a href=\"https://github.com/pypeaday/komodo\">komodo</a>
    for server deployment etc... it actaully has a ton of things in it for managing
    compose stacks on multiple nodes right now, with <a href=\"https://github.com/moghtech/komodo/issues/37\">swarm
    support coming</a>\n<ul>\n<li>in the mean time <a href=\"https://github.com/moghtech/komodo/issues/37#issuecomment-3106074124\">this
    comment</a> gives a short example on using swarm's overlay network and managing
    the stack from within komodo (kind of)</li>\n</ul>\n</li>\n</ul>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Homelab
    As A Service</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"$HOME I don&#x27;t
    know what to call my opinionated homelab distribution yet but I will try to have
    some goals for today or tomorrow for simple steps drawing up\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Homelab As A Service | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/homelab-as-a-service\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Homelab As A Service | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"$HOME I don&#x27;t know what to call my opinionated homelab distribution
    yet but I will try to have some goals for today or tomorrow for simple steps drawing
    up\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/homelab-as-a-service</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"home\">$HOME
    <a class=\"header-anchor\" href=\"#home\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I don't know what to
    call my opinionated homelab distribution yet but I will try to have some goals
    for today or tomorrow for simple steps</p>\n<ul>\n<li>drawing up all the pieces
    will take a while but is necessary</li>\n<li>ansible playbook to make zfs datasets
    for vms or containers is easy first utility to bank somewhere</li>\n</ul>\n<h2
    id=\"homelab\">Homelab <a class=\"header-anchor\" href=\"#homelab\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>\n<p>started
    chatting with jipity about some automation... I have so many ideas that circle
    my head and I have a hard time implementing anything for fear of committing halfway
    to something...</p>\n</li>\n<li>\n<p>I think I can take baby steps to mitigate
    that issue and one way is to automate the first thing that annoys me - zfs dataset
    creation for new apps. I assume that I want a new zfs dataset if I'm going to
    provision something into my homelab so that means</p>\n<ul>\n<li>dataset creation
    on the appropriate node</li>\n<li>permissions</li>\n<li>updates to <code>zfs-ops</code>
    (eventually dataops in homelab-mono) for the backup to be added explicitly (or
    removed if I'm removing one - for example some old VM datasets I no longer need)</li>\n</ul>\n</li>\n<li>\n<p>I
    also mind-dumped after starting the convo with jipity, using speakr to get a short
    summary of a brain dump is pretty awesome especially considering the purely local
    self-hosted nature. Here's the summary of a pretty concentrated 6 minute monologue
    on things I'm thinking about:</p>\n<ul>\n<li>Summary is imperfect - but again,
    for self-hosted hardware and getting purely private LLM-assisted brainstorming
    is really cool. However, I do plan on sinking some thought into the big boys (claude
    or jippity) as I very slowly begin construction</li>\n</ul>\n</li>\n</ul>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">speakr self-hosted summary</p>\n<p>Key
    Issues Discussed</p>\n<pre><code>Platform and service idea for consulting\nProduct
    as an opinionated home lab targeting small teams or on-prem setups with Docker
    Swarm + ZFS\nFocus on privacy, data ownership, compute ownership while providing
    cloud options (AWS)\nHardware recommendations part of services\nUse AWS resources
    when possible but self-hosting is also viable option\nTail scale for business
    networking and network ACLs provided by the vendor\n</code></pre>\n<p>Key Decisions
    Made</p>\n<pre><code>Deploy servers using Docker Swarm + ZFS with an opinionated
    approach to data management, backups, application deployment monitoring.\nCloud
    options include Terraform set up in AWS (and possibly Azure later)\nUse U-Corps
    as a base for containers on top of Ubuntu distro box; consider KeyCloak or Aphalia
    for authentication\nDNS and public services will be handled with NameCheap and
    Cloudflare using Terraform, not picking each other\u2019s features.\nCERT management
    is Let\u2019s Encrypt\nObservability through Harbor telemetry data gathering\n</code></pre>\n</div>\n<p>I
    brainstormed a little more witih jipity this morning and got this set of pillars</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">pillars</p>\n<p>Infrastructure
    (hardware, OS, baseline networking)</p>\n<p>DataOps (storage, backup, placement)</p>\n<p>Orchestration
    (containers, jobs, IaC)</p>\n<p>Networking &amp; Connectivity (service-to-service,
    ingress/egress)</p>\n<p>Security &amp; Identity (auth, secrets, policies, hardening)</p>\n<p>Observability
    (metrics, logging, tracing, health)</p>\n<p>Automation &amp; CI/CD (playbooks,
    pipelines, GitOps)</p>\n<p>Resilience &amp; Recovery (HA, redundancy, DR, self-healing)</p>\n<p>Experience
    (DX, onboarding, docs, templates)</p>\n</div>\n<h2 id=\"features\">Features <a
    class=\"header-anchor\" href=\"#features\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm taking notes in
    affine\n<a href=\"https://affine.paynepride.com/workspace/068b2d03-00ee-4b4b-9a8d-d7b98e85f1f2/pufV8iRo_XoCpVuPgQ6vA\">here</a>\nto
    capture requirements grouped by feature or relevant level of the stack (ie.\nOS
    package installs vs repository setup vs pipeline recommendations etc.)</p>\n<h2
    id=\"tools\">Tools <a class=\"header-anchor\" href=\"#tools\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><a href=\"https://github.com/pypeaday/komodo\">komodo</a>
    for server deployment etc... it actaully has a ton of things in it for managing
    compose stacks on multiple nodes right now, with <a href=\"https://github.com/moghtech/komodo/issues/37\">swarm
    support coming</a>\n<ul>\n<li>in the mean time <a href=\"https://github.com/moghtech/komodo/issues/37#issuecomment-3106074124\">this
    comment</a> gives a short example on using swarm's overlay network and managing
    the stack from within komodo (kind of)</li>\n</ul>\n</li>\n</ul>\n\n        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-09-01 07:09:49\ntemplateKey: project\ntitle: Homelab As
    A Service\npublished: False\ntags:\n  - projects\n  - product\n---\n\n\n## $HOME\n\nI
    don't know what to call my opinionated homelab distribution yet but I will try
    to have some goals for today or tomorrow for simple steps\n  - drawing up all
    the pieces will take a while but is necessary\n  - ansible playbook to make zfs
    datasets for vms or containers is easy first utility to bank somewhere\n\n\n##
    Homelab\n\n- started chatting with jipity about some automation... I have so many
    ideas that circle my head and I have a hard time implementing anything for fear
    of committing halfway to something... \n- I think I can take baby steps to mitigate
    that issue and one way is to automate the first thing that annoys me - zfs dataset
    creation for new apps. I assume that I want a new zfs dataset if I'm going to
    provision something into my homelab so that means\n  - dataset creation on the
    appropriate node\n  - permissions\n  - updates to `zfs-ops` (eventually dataops
    in homelab-mono) for the backup to be added explicitly (or removed if I'm removing
    one - for example some old VM datasets I no longer need)\n\n- I also mind-dumped
    after starting the convo with jipity, using speakr to get a short summary of a
    brain dump is pretty awesome especially considering the purely local self-hosted
    nature. Here's the summary of a pretty concentrated 6 minute monologue on things
    I'm thinking about:\n  - Summary is imperfect - but again, for self-hosted hardware
    and getting purely private LLM-assisted brainstorming is really cool. However,
    I do plan on sinking some thought into the big boys (claude or jippity) as I very
    slowly begin construction\n\n!!! note \"speakr self-hosted summary\"\n\n    Key
    Issues Discussed\n\n        Platform and service idea for consulting\n        Product
    as an opinionated home lab targeting small teams or on-prem setups with Docker
    Swarm + ZFS\n        Focus on privacy, data ownership, compute ownership while
    providing cloud options (AWS)\n        Hardware recommendations part of services\n
    \       Use AWS resources when possible but self-hosting is also viable option\n
    \       Tail scale for business networking and network ACLs provided by the vendor\n\n
    \   Key Decisions Made\n\n        Deploy servers using Docker Swarm + ZFS with
    an opinionated approach to data management, backups, application deployment monitoring.\n
    \       Cloud options include Terraform set up in AWS (and possibly Azure later)\n
    \       Use U-Corps as a base for containers on top of Ubuntu distro box; consider
    KeyCloak or Aphalia for authentication\n        DNS and public services will be
    handled with NameCheap and Cloudflare using Terraform, not picking each other\u2019s
    features.\n        CERT management is Let\u2019s Encrypt\n        Observability
    through Harbor telemetry data gathering\n\nI brainstormed a little more witih
    jipity this morning and got this set of pillars\n\n!!! note \"pillars\"\n\n    Infrastructure
    (hardware, OS, baseline networking)\n\n    DataOps (storage, backup, placement)\n\n
    \   Orchestration (containers, jobs, IaC)\n\n    Networking & Connectivity (service-to-service,
    ingress/egress)\n\n    Security & Identity (auth, secrets, policies, hardening)\n\n
    \   Observability (metrics, logging, tracing, health)\n\n    Automation & CI/CD
    (playbooks, pipelines, GitOps)\n\n    Resilience & Recovery (HA, redundancy, DR,
    self-healing)\n\n    Experience (DX, onboarding, docs, templates)\n\n## Features\n\nI'm
    taking notes in affine\n[here](https://affine.paynepride.com/workspace/068b2d03-00ee-4b4b-9a8d-d7b98e85f1f2/pufV8iRo_XoCpVuPgQ6vA)\nto
    capture requirements grouped by feature or relevant level of the stack (ie.\nOS
    package installs vs repository setup vs pipeline recommendations etc.)\n\n## Tools\n\n-
    [komodo](https://github.com/pypeaday/komodo) for server deployment etc... it actaully
    has a ton of things in it for managing compose stacks on multiple nodes right
    now, with [swarm support coming](https://github.com/moghtech/komodo/issues/37)\n
    \ - in the mean time [this comment](https://github.com/moghtech/komodo/issues/37#issuecomment-3106074124)
    gives a short example on using swarm's overlay network and managing the stack
    from within komodo (kind of)\n"
published: false
slug: homelab-as-a-service
title: Homelab As A Service


---

## $HOME

I don't know what to call my opinionated homelab distribution yet but I will try to have some goals for today or tomorrow for simple steps
  - drawing up all the pieces will take a while but is necessary
  - ansible playbook to make zfs datasets for vms or containers is easy first utility to bank somewhere


## Homelab

- started chatting with jipity about some automation... I have so many ideas that circle my head and I have a hard time implementing anything for fear of committing halfway to something... 
- I think I can take baby steps to mitigate that issue and one way is to automate the first thing that annoys me - zfs dataset creation for new apps. I assume that I want a new zfs dataset if I'm going to provision something into my homelab so that means
  - dataset creation on the appropriate node
  - permissions
  - updates to `zfs-ops` (eventually dataops in homelab-mono) for the backup to be added explicitly (or removed if I'm removing one - for example some old VM datasets I no longer need)

- I also mind-dumped after starting the convo with jipity, using speakr to get a short summary of a brain dump is pretty awesome especially considering the purely local self-hosted nature. Here's the summary of a pretty concentrated 6 minute monologue on things I'm thinking about:
  - Summary is imperfect - but again, for self-hosted hardware and getting purely private LLM-assisted brainstorming is really cool. However, I do plan on sinking some thought into the big boys (claude or jippity) as I very slowly begin construction

!!! note "speakr self-hosted summary"

    Key Issues Discussed

        Platform and service idea for consulting
        Product as an opinionated home lab targeting small teams or on-prem setups with Docker Swarm + ZFS
        Focus on privacy, data ownership, compute ownership while providing cloud options (AWS)
        Hardware recommendations part of services
        Use AWS resources when possible but self-hosting is also viable option
        Tail scale for business networking and network ACLs provided by the vendor

    Key Decisions Made

        Deploy servers using Docker Swarm + ZFS with an opinionated approach to data management, backups, application deployment monitoring.
        Cloud options include Terraform set up in AWS (and possibly Azure later)
        Use U-Corps as a base for containers on top of Ubuntu distro box; consider KeyCloak or Aphalia for authentication
        DNS and public services will be handled with NameCheap and Cloudflare using Terraform, not picking each other’s features.
        CERT management is Let’s Encrypt
        Observability through Harbor telemetry data gathering

I brainstormed a little more witih jipity this morning and got this set of pillars

!!! note "pillars"

    Infrastructure (hardware, OS, baseline networking)

    DataOps (storage, backup, placement)

    Orchestration (containers, jobs, IaC)

    Networking & Connectivity (service-to-service, ingress/egress)

    Security & Identity (auth, secrets, policies, hardening)

    Observability (metrics, logging, tracing, health)

    Automation & CI/CD (playbooks, pipelines, GitOps)

    Resilience & Recovery (HA, redundancy, DR, self-healing)

    Experience (DX, onboarding, docs, templates)

## Features

I'm taking notes in affine
[here](https://affine.paynepride.com/workspace/068b2d03-00ee-4b4b-9a8d-d7b98e85f1f2/pufV8iRo_XoCpVuPgQ6vA)
to capture requirements grouped by feature or relevant level of the stack (ie.
OS package installs vs repository setup vs pipeline recommendations etc.)

## Tools

- [komodo](https://github.com/pypeaday/komodo) for server deployment etc... it actaully has a ton of things in it for managing compose stacks on multiple nodes right now, with [swarm support coming](https://github.com/moghtech/komodo/issues/37)
  - in the mean time [this comment](https://github.com/moghtech/komodo/issues/37#issuecomment-3106074124) gives a short example on using swarm's overlay network and managing the stack from within komodo (kind of)