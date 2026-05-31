---
content: "## Setup\n\nI am working on a pipeline at home to integrate my blog with
  social media a\nlittle more. One of the things I want to do is automatically post\n[[my-thoughts]]
  to [[nostr]]. [[postiz]] has nostr support that works just fine - login\nwith your
  [[nostr-hex-key]] and you're good to go to post notes to several of\nthe common
  relays. However for my testing I just wanted to post to a\n[self-hosetd nostr relay](https://github.com/scsibug/nostr-rs-relay)\nbut
  there wasn't a way to override which relays were used. Well I submitted [this pr](https://github.com/gitroomhq/postiz-app/pull/824)\nand
  hopefully it goes through. But before it did I was able to test the changes\nby
  simply building the postiz image from my feature branch and deploying it at\nhome
  in leiu of the published image. It was super cool to see it work\n\n## Build and
  Deploy\n\nThe build was easy after cloning the repo - I happened to already have
  `buildx` installed... it came with [aurora](https://docs.getaurora.dev/)\n\n`docker
  buildx build --platform linux/amd64 -f Dockerfile.dev -t registry.example.com/gitroomhq/postiz-app:nostr-test
  .`\n\nAfter building then I just update my compose file easy-peasy\n\n```yaml\nservices:\n
  \ postiz:\n    # updated the image to my own from my registry\n    image: resitry.example.com/gitroomhq/postiz-app:latest\n
  \   container_name: postiz\n    restart: always\n    env_file: .env\n#####################\n###
  REST OF COMPOSE FILE FROM THEIR REPO\n```\n\n## Pics\n\nTo test this my methodlogy
  was: 0. spin up nostr relay\n\n1. start postiz with my NOSTR_RELAY_OVERRIDES configuration
  for only my local relay\n2. use an existing script to schedule a nostr post via
  the postiz REST API\n3. use the UI to send the note to nostr\n4. validate the note
  came through my relay\n\nSo step 1 - does my script to schedule via the REST API
  work?\n\n```\npostiz  | [0] 1|backend  | {\npostiz  | [0] 1|backend  |   \"type\":
  \"draft\",\npostiz  | [0] 1|backend  |   \"shortLink\": false,\npostiz  | [0] 1|backend
  \ |   \"tags\": [],\npostiz  | [0] 1|backend  |   \"posts\": [\npostiz  | [0] 1|backend
  \ |     {\npostiz  | [0] 1|backend  |       \"integration\": {\npostiz  | [0] 1|backend
  \ |         \"id\": \"cmbgf5oko0001ra99r9vzv1fj\"\npostiz  | [0] 1|backend  |       },\npostiz
  \ | [0] 1|backend  |       \"value\": [\npostiz  | [0] 1|backend  |         {\npostiz
  \ | [0] 1|backend  |           \"content\": \"\\nHere's a thought I had a while
  back:\\n\\n> matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n\\nThis article
  was longer than I had time to really consume but a heading caught my eye that I
  wanted to agree with - the author says k8s 2.0 may consider HCL instead of YAML.
  And as a recent terraform / open-tofu adopter I gotta say I would be ALL FOR THIS\\n\\nHere's
  the original link for more context: https://matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n
  \       \\n\\n# devops # tech #k8s #nostr #plebchain\",\npostiz  | [0] 1|backend
  \ |           \"image\": []\npostiz  | [0] 1|backend  |         }\npostiz  | [0]
  1|backend  |       ]\npostiz  | [0] 1|backend  |     }\npostiz  | [0] 1|backend
  \ |   ],\npostiz  | [0] 1|backend  |   \"date\": \"2025-07-02T13:27:07.028Z\"\npostiz
  \ | [0] 1|backend  | }\n```\n\n???+ success\n\n    After the first step my local
  build looks to have not broken this part of the app!\n\nNext was spinning up my
  own nostr relay - it's actually just `docker compose up`\n\n```yaml\nservices:\n
  \ nostr-relay:\n    image: nostr-rs-relay:latest\n    container_name: nostr-relay\n
  \   ports:\n      - \"7000:8080\"\n    environment:\n      TZ: America/Chicago\n
  \   volumes:\n      - ./data:/usr/src/app/db\n      - ./config.toml:/usr/src/app/config.toml\n
  \   restart: unless-stopped\n```\n\nFinally, can I send my note to my relay?\n\nI
  hit post in the UI and then checked coracle...\n\nYes! Using [coracle.social](https://coracle.social)
  I can verify that my note went to my relay only\n\n![20250706122123_47b06d96.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706122123_47b06d96.png)\n\n##
  Fin\n\nSo that was a fun way to get into postiz a little more and start to flesh
  out\nwhat will be a testing-scenario for some pipelines I'm building at home"
date: 2025-07-06
description: 'Setup I am working on a pipeline at home to integrate my blog with social
  media a

  little more. One of the things I want to do is automatically post

  [[my-thought'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Testing a Postiz
    Change Locally (IT WORKS!)</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Setup I am working on a pipeline at home to integrate my blog with social
    media a\nlittle more. One of the things I want to do is automatically post\n[[my-thought\"
    />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Testing a Postiz Change Locally (IT WORKS!) |
    Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/testing-a-postiz-change-locally\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Testing a Postiz Change Locally (IT WORKS!) | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"Setup I am working on a pipeline at home
    to integrate my blog with social media a\nlittle more. One of the things I want
    to do is automatically post\n[[my-thought\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"
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
    \           <span class=\"site-terminal__dir\">~/testing-a-postiz-change-locally</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"
    alt=\"Testing a Postiz Change Locally (IT WORKS!) cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Testing
    a Postiz Change Locally (IT WORKS!)</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-06\">\n            July
    06, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/postiz/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #postiz\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"setup\">Setup <a class=\"header-anchor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I am working on a pipeline
    at home to integrate my blog with social media a\nlittle more. One of the things
    I want to do is automatically post\n<a class=\"wikilink\" href=\"/my-thoughts\">my-thoughts</a>
    to <a class=\"wikilink\" href=\"/nostr\">nostr</a>. <a class=\"wikilink\" href=\"/postiz\">postiz</a>
    has nostr support that works just fine - login\nwith your <a class=\"wikilink\"
    href=\"/nostr-hex-key\">nostr-hex-key</a> and you're good to go to post notes
    to several of\nthe common relays. However for my testing I just wanted to post
    to a\n<a href=\"https://github.com/scsibug/nostr-rs-relay\">self-hosetd nostr
    relay</a>\nbut there wasn't a way to override which relays were used. Well I submitted
    <a href=\"https://github.com/gitroomhq/postiz-app/pull/824\">this pr</a>\nand
    hopefully it goes through. But before it did I was able to test the changes\nby
    simply building the postiz image from my feature branch and deploying it at\nhome
    in leiu of the published image. It was super cool to see it work</p>\n<h2 id=\"build-and-deploy\">Build
    and Deploy <a class=\"header-anchor\" href=\"#build-and-deploy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The build was easy after
    cloning the repo - I happened to already have <code>buildx</code> installed...
    it came with <a href=\"https://docs.getaurora.dev/\">aurora</a></p>\n<p><code>docker
    buildx build --platform linux/amd64 -f Dockerfile.dev -t registry.example.com/gitroomhq/postiz-app:nostr-test
    .</code></p>\n<p>After building then I just update my compose file easy-peasy</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">postiz</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"c1\"># updated
    the image to my own from my registry</span>\n<span class=\"w\">    </span><span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">resitry.example.com/gitroomhq/postiz-app:latest</span>\n<span
    class=\"w\">    </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">postiz</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">always</span>\n<span
    class=\"w\">    </span><span class=\"nt\">env_file</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">.env</span>\n<span
    class=\"c1\">#####################</span>\n<span class=\"c1\">### REST OF COMPOSE
    FILE FROM THEIR REPO</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"pics\">Pics <a
    class=\"header-anchor\" href=\"#pics\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>To test this my methodlogy
    was: 0. spin up nostr relay</p>\n<ol>\n<li>start postiz with my NOSTR_RELAY_OVERRIDES
    configuration for only my local relay</li>\n<li>use an existing script to schedule
    a nostr post via the postiz REST API</li>\n<li>use the UI to send the note to
    nostr</li>\n<li>validate the note came through my relay</li>\n</ol>\n<p>So step
    1 - does my script to schedule via the REST API work?</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>postiz  | [0] 1|backend  |
    {\npostiz  | [0] 1|backend  |   &quot;type&quot;: &quot;draft&quot;,\npostiz  |
    [0] 1|backend  |   &quot;shortLink&quot;: false,\npostiz  | [0] 1|backend  |   &quot;tags&quot;:
    [],\npostiz  | [0] 1|backend  |   &quot;posts&quot;: [\npostiz  | [0] 1|backend
    \ |     {\npostiz  | [0] 1|backend  |       &quot;integration&quot;: {\npostiz
    \ | [0] 1|backend  |         &quot;id&quot;: &quot;cmbgf5oko0001ra99r9vzv1fj&quot;\npostiz
    \ | [0] 1|backend  |       },\npostiz  | [0] 1|backend  |       &quot;value&quot;:
    [\npostiz  | [0] 1|backend  |         {\npostiz  | [0] 1|backend  |           &quot;content&quot;:
    &quot;\\nHere&#39;s a thought I had a while back:\\n\\n&gt; matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n\\nThis
    article was longer than I had time to really consume but a heading caught my eye
    that I wanted to agree with - the author says k8s 2.0 may consider HCL instead
    of YAML. And as a recent terraform / open-tofu adopter I gotta say I would be
    ALL FOR THIS\\n\\nHere&#39;s the original link for more context: https://matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n
    \       \\n\\n# devops # tech #k8s #nostr #plebchain&quot;,\npostiz  | [0] 1|backend
    \ |           &quot;image&quot;: []\npostiz  | [0] 1|backend  |         }\npostiz
    \ | [0] 1|backend  |       ]\npostiz  | [0] 1|backend  |     }\npostiz  | [0]
    1|backend  |   ],\npostiz  | [0] 1|backend  |   &quot;date&quot;: &quot;2025-07-02T13:27:07.028Z&quot;\npostiz
    \ | [0] 1|backend  | }\n</pre></div>\n\n</pre>\n\n<div class=\"admonition success
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">Success</p>\n<p>After
    the first step my local build looks to have not broken this part of the app!</p>\n</div>\n<p>Next
    was spinning up my own nostr relay - it's actually just <code>docker compose up</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">nostr-relay</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nostr-rs-relay:latest</span>\n<span
    class=\"w\">    </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nostr-relay</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;7000:8080&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">environment</span><span class=\"p\">:</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">TZ</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">America/Chicago</span>\n<span
    class=\"w\">    </span><span class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">./data:/usr/src/app/db</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">./config.toml:/usr/src/app/config.toml</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n</pre></div>\n\n</pre>\n\n<p>Finally,
    can I send my note to my relay?</p>\n<p>I hit post in the UI and then checked
    coracle...</p>\n<p>Yes! Using <a href=\"https://coracle.social\">coracle.social</a>
    I can verify that my note went to my relay only</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706122123_47b06d96.png\"
    alt=\"20250706122123_47b06d96.png\" /></p>\n<h2 id=\"fin\">Fin <a class=\"header-anchor\"
    href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So that was a fun way
    to get into postiz a little more and start to flesh out\nwhat will be a testing-scenario
    for some pipelines I'm building at home</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Testing a Postiz Change
    Locally (IT WORKS!)</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Setup I am working on a pipeline at home to integrate my blog with social
    media a\nlittle more. One of the things I want to do is automatically post\n[[my-thought\"
    />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Testing a Postiz Change Locally (IT WORKS!) |
    Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/testing-a-postiz-change-locally\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Testing a Postiz Change Locally (IT WORKS!) | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"Setup I am working on a pipeline at home
    to integrate my blog with social media a\nlittle more. One of the things I want
    to do is automatically post\n[[my-thought\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"
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
    mb-4 post-title-large\">Testing a Postiz Change Locally (IT WORKS!)</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-06\">\n
    \           July 06, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/postiz/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #postiz\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"
    alt=\"Testing a Postiz Change Locally (IT WORKS!) cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Testing
    a Postiz Change Locally (IT WORKS!)</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-06\">\n            July
    06, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/postiz/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #postiz\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"setup\">Setup <a class=\"header-anchor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I am working on a pipeline
    at home to integrate my blog with social media a\nlittle more. One of the things
    I want to do is automatically post\n<a class=\"wikilink\" href=\"/my-thoughts\">my-thoughts</a>
    to <a class=\"wikilink\" href=\"/nostr\">nostr</a>. <a class=\"wikilink\" href=\"/postiz\">postiz</a>
    has nostr support that works just fine - login\nwith your <a class=\"wikilink\"
    href=\"/nostr-hex-key\">nostr-hex-key</a> and you're good to go to post notes
    to several of\nthe common relays. However for my testing I just wanted to post
    to a\n<a href=\"https://github.com/scsibug/nostr-rs-relay\">self-hosetd nostr
    relay</a>\nbut there wasn't a way to override which relays were used. Well I submitted
    <a href=\"https://github.com/gitroomhq/postiz-app/pull/824\">this pr</a>\nand
    hopefully it goes through. But before it did I was able to test the changes\nby
    simply building the postiz image from my feature branch and deploying it at\nhome
    in leiu of the published image. It was super cool to see it work</p>\n<h2 id=\"build-and-deploy\">Build
    and Deploy <a class=\"header-anchor\" href=\"#build-and-deploy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The build was easy after
    cloning the repo - I happened to already have <code>buildx</code> installed...
    it came with <a href=\"https://docs.getaurora.dev/\">aurora</a></p>\n<p><code>docker
    buildx build --platform linux/amd64 -f Dockerfile.dev -t registry.example.com/gitroomhq/postiz-app:nostr-test
    .</code></p>\n<p>After building then I just update my compose file easy-peasy</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">postiz</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"c1\"># updated
    the image to my own from my registry</span>\n<span class=\"w\">    </span><span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">resitry.example.com/gitroomhq/postiz-app:latest</span>\n<span
    class=\"w\">    </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">postiz</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">always</span>\n<span
    class=\"w\">    </span><span class=\"nt\">env_file</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">.env</span>\n<span
    class=\"c1\">#####################</span>\n<span class=\"c1\">### REST OF COMPOSE
    FILE FROM THEIR REPO</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"pics\">Pics <a
    class=\"header-anchor\" href=\"#pics\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>To test this my methodlogy
    was: 0. spin up nostr relay</p>\n<ol>\n<li>start postiz with my NOSTR_RELAY_OVERRIDES
    configuration for only my local relay</li>\n<li>use an existing script to schedule
    a nostr post via the postiz REST API</li>\n<li>use the UI to send the note to
    nostr</li>\n<li>validate the note came through my relay</li>\n</ol>\n<p>So step
    1 - does my script to schedule via the REST API work?</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>postiz  | [0] 1|backend  |
    {\npostiz  | [0] 1|backend  |   &quot;type&quot;: &quot;draft&quot;,\npostiz  |
    [0] 1|backend  |   &quot;shortLink&quot;: false,\npostiz  | [0] 1|backend  |   &quot;tags&quot;:
    [],\npostiz  | [0] 1|backend  |   &quot;posts&quot;: [\npostiz  | [0] 1|backend
    \ |     {\npostiz  | [0] 1|backend  |       &quot;integration&quot;: {\npostiz
    \ | [0] 1|backend  |         &quot;id&quot;: &quot;cmbgf5oko0001ra99r9vzv1fj&quot;\npostiz
    \ | [0] 1|backend  |       },\npostiz  | [0] 1|backend  |       &quot;value&quot;:
    [\npostiz  | [0] 1|backend  |         {\npostiz  | [0] 1|backend  |           &quot;content&quot;:
    &quot;\\nHere&#39;s a thought I had a while back:\\n\\n&gt; matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n\\nThis
    article was longer than I had time to really consume but a heading caught my eye
    that I wanted to agree with - the author says k8s 2.0 may consider HCL instead
    of YAML. And as a recent terraform / open-tofu adopter I gotta say I would be
    ALL FOR THIS\\n\\nHere&#39;s the original link for more context: https://matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n
    \       \\n\\n# devops # tech #k8s #nostr #plebchain&quot;,\npostiz  | [0] 1|backend
    \ |           &quot;image&quot;: []\npostiz  | [0] 1|backend  |         }\npostiz
    \ | [0] 1|backend  |       ]\npostiz  | [0] 1|backend  |     }\npostiz  | [0]
    1|backend  |   ],\npostiz  | [0] 1|backend  |   &quot;date&quot;: &quot;2025-07-02T13:27:07.028Z&quot;\npostiz
    \ | [0] 1|backend  | }\n</pre></div>\n\n</pre>\n\n<div class=\"admonition success
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">Success</p>\n<p>After
    the first step my local build looks to have not broken this part of the app!</p>\n</div>\n<p>Next
    was spinning up my own nostr relay - it's actually just <code>docker compose up</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">nostr-relay</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nostr-rs-relay:latest</span>\n<span
    class=\"w\">    </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nostr-relay</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;7000:8080&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">environment</span><span class=\"p\">:</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">TZ</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">America/Chicago</span>\n<span
    class=\"w\">    </span><span class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">./data:/usr/src/app/db</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">./config.toml:/usr/src/app/config.toml</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n</pre></div>\n\n</pre>\n\n<p>Finally,
    can I send my note to my relay?</p>\n<p>I hit post in the UI and then checked
    coracle...</p>\n<p>Yes! Using <a href=\"https://coracle.social\">coracle.social</a>
    I can verify that my note went to my relay only</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706122123_47b06d96.png\"
    alt=\"20250706122123_47b06d96.png\" /></p>\n<h2 id=\"fin\">Fin <a class=\"header-anchor\"
    href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So that was a fun way
    to get into postiz a little more and start to flesh out\nwhat will be a testing-scenario
    for some pipelines I'm building at home</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Testing
    a Postiz Change Locally (IT WORKS!)</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Setup I am working on a pipeline at home to integrate my blog with social
    media a\nlittle more. One of the things I want to do is automatically post\n[[my-thought\"
    />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Testing a Postiz Change Locally (IT WORKS!) |
    Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/testing-a-postiz-change-locally\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Testing a Postiz Change Locally (IT WORKS!) | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"Setup I am working on a pipeline at home
    to integrate my blog with social media a\nlittle more. One of the things I want
    to do is automatically post\n[[my-thought\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"
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
    \           <span class=\"site-terminal__dir\">~/testing-a-postiz-change-locally</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"setup\">Setup
    <a class=\"header-anchor\" href=\"#setup\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I am working on a pipeline
    at home to integrate my blog with social media a\nlittle more. One of the things
    I want to do is automatically post\n<a class=\"wikilink\" href=\"/my-thoughts\">my-thoughts</a>
    to <a class=\"wikilink\" href=\"/nostr\">nostr</a>. <a class=\"wikilink\" href=\"/postiz\">postiz</a>
    has nostr support that works just fine - login\nwith your <a class=\"wikilink\"
    href=\"/nostr-hex-key\">nostr-hex-key</a> and you're good to go to post notes
    to several of\nthe common relays. However for my testing I just wanted to post
    to a\n<a href=\"https://github.com/scsibug/nostr-rs-relay\">self-hosetd nostr
    relay</a>\nbut there wasn't a way to override which relays were used. Well I submitted
    <a href=\"https://github.com/gitroomhq/postiz-app/pull/824\">this pr</a>\nand
    hopefully it goes through. But before it did I was able to test the changes\nby
    simply building the postiz image from my feature branch and deploying it at\nhome
    in leiu of the published image. It was super cool to see it work</p>\n<h2 id=\"build-and-deploy\">Build
    and Deploy <a class=\"header-anchor\" href=\"#build-and-deploy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The build was easy after
    cloning the repo - I happened to already have <code>buildx</code> installed...
    it came with <a href=\"https://docs.getaurora.dev/\">aurora</a></p>\n<p><code>docker
    buildx build --platform linux/amd64 -f Dockerfile.dev -t registry.example.com/gitroomhq/postiz-app:nostr-test
    .</code></p>\n<p>After building then I just update my compose file easy-peasy</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">postiz</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"c1\"># updated
    the image to my own from my registry</span>\n<span class=\"w\">    </span><span
    class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">resitry.example.com/gitroomhq/postiz-app:latest</span>\n<span
    class=\"w\">    </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">postiz</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">always</span>\n<span
    class=\"w\">    </span><span class=\"nt\">env_file</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">.env</span>\n<span
    class=\"c1\">#####################</span>\n<span class=\"c1\">### REST OF COMPOSE
    FILE FROM THEIR REPO</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"pics\">Pics <a
    class=\"header-anchor\" href=\"#pics\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>To test this my methodlogy
    was: 0. spin up nostr relay</p>\n<ol>\n<li>start postiz with my NOSTR_RELAY_OVERRIDES
    configuration for only my local relay</li>\n<li>use an existing script to schedule
    a nostr post via the postiz REST API</li>\n<li>use the UI to send the note to
    nostr</li>\n<li>validate the note came through my relay</li>\n</ol>\n<p>So step
    1 - does my script to schedule via the REST API work?</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>postiz  | [0] 1|backend  |
    {\npostiz  | [0] 1|backend  |   &quot;type&quot;: &quot;draft&quot;,\npostiz  |
    [0] 1|backend  |   &quot;shortLink&quot;: false,\npostiz  | [0] 1|backend  |   &quot;tags&quot;:
    [],\npostiz  | [0] 1|backend  |   &quot;posts&quot;: [\npostiz  | [0] 1|backend
    \ |     {\npostiz  | [0] 1|backend  |       &quot;integration&quot;: {\npostiz
    \ | [0] 1|backend  |         &quot;id&quot;: &quot;cmbgf5oko0001ra99r9vzv1fj&quot;\npostiz
    \ | [0] 1|backend  |       },\npostiz  | [0] 1|backend  |       &quot;value&quot;:
    [\npostiz  | [0] 1|backend  |         {\npostiz  | [0] 1|backend  |           &quot;content&quot;:
    &quot;\\nHere&#39;s a thought I had a while back:\\n\\n&gt; matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n\\nThis
    article was longer than I had time to really consume but a heading caught my eye
    that I wanted to agree with - the author says k8s 2.0 may consider HCL instead
    of YAML. And as a recent terraform / open-tofu adopter I gotta say I would be
    ALL FOR THIS\\n\\nHere&#39;s the original link for more context: https://matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n
    \       \\n\\n# devops # tech #k8s #nostr #plebchain&quot;,\npostiz  | [0] 1|backend
    \ |           &quot;image&quot;: []\npostiz  | [0] 1|backend  |         }\npostiz
    \ | [0] 1|backend  |       ]\npostiz  | [0] 1|backend  |     }\npostiz  | [0]
    1|backend  |   ],\npostiz  | [0] 1|backend  |   &quot;date&quot;: &quot;2025-07-02T13:27:07.028Z&quot;\npostiz
    \ | [0] 1|backend  | }\n</pre></div>\n\n</pre>\n\n<div class=\"admonition success
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">Success</p>\n<p>After
    the first step my local build looks to have not broken this part of the app!</p>\n</div>\n<p>Next
    was spinning up my own nostr relay - it's actually just <code>docker compose up</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">nostr-relay</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nostr-rs-relay:latest</span>\n<span
    class=\"w\">    </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nostr-relay</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;7000:8080&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">environment</span><span class=\"p\">:</span>\n<span class=\"w\">
    \     </span><span class=\"nt\">TZ</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">America/Chicago</span>\n<span
    class=\"w\">    </span><span class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">./data:/usr/src/app/db</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">./config.toml:/usr/src/app/config.toml</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n</pre></div>\n\n</pre>\n\n<p>Finally,
    can I send my note to my relay?</p>\n<p>I hit post in the UI and then checked
    coracle...</p>\n<p>Yes! Using <a href=\"https://coracle.social\">coracle.social</a>
    I can verify that my note went to my relay only</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706122123_47b06d96.png\"
    alt=\"20250706122123_47b06d96.png\" /></p>\n<h2 id=\"fin\">Fin <a class=\"header-anchor\"
    href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So that was a fun way
    to get into postiz a little more and start to flesh out\nwhat will be a testing-scenario
    for some pipelines I'm building at home</p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2025-07-06 08:42:44\ntemplateKey: blog-post\ntitle: Testing
    a Postiz Change Locally (IT WORKS!)\npublished: True\ntags:\n  - postiz\n  - tech\ncover:
    \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png\"\n---\n\n##
    Setup\n\nI am working on a pipeline at home to integrate my blog with social media
    a\nlittle more. One of the things I want to do is automatically post\n[[my-thoughts]]
    to [[nostr]]. [[postiz]] has nostr support that works just fine - login\nwith
    your [[nostr-hex-key]] and you're good to go to post notes to several of\nthe
    common relays. However for my testing I just wanted to post to a\n[self-hosetd
    nostr relay](https://github.com/scsibug/nostr-rs-relay)\nbut there wasn't a way
    to override which relays were used. Well I submitted [this pr](https://github.com/gitroomhq/postiz-app/pull/824)\nand
    hopefully it goes through. But before it did I was able to test the changes\nby
    simply building the postiz image from my feature branch and deploying it at\nhome
    in leiu of the published image. It was super cool to see it work\n\n## Build and
    Deploy\n\nThe build was easy after cloning the repo - I happened to already have
    `buildx` installed... it came with [aurora](https://docs.getaurora.dev/)\n\n`docker
    buildx build --platform linux/amd64 -f Dockerfile.dev -t registry.example.com/gitroomhq/postiz-app:nostr-test
    .`\n\nAfter building then I just update my compose file easy-peasy\n\n```yaml\nservices:\n
    \ postiz:\n    # updated the image to my own from my registry\n    image: resitry.example.com/gitroomhq/postiz-app:latest\n
    \   container_name: postiz\n    restart: always\n    env_file: .env\n#####################\n###
    REST OF COMPOSE FILE FROM THEIR REPO\n```\n\n## Pics\n\nTo test this my methodlogy
    was: 0. spin up nostr relay\n\n1. start postiz with my NOSTR_RELAY_OVERRIDES configuration
    for only my local relay\n2. use an existing script to schedule a nostr post via
    the postiz REST API\n3. use the UI to send the note to nostr\n4. validate the
    note came through my relay\n\nSo step 1 - does my script to schedule via the REST
    API work?\n\n```\npostiz  | [0] 1|backend  | {\npostiz  | [0] 1|backend  |   \"type\":
    \"draft\",\npostiz  | [0] 1|backend  |   \"shortLink\": false,\npostiz  | [0]
    1|backend  |   \"tags\": [],\npostiz  | [0] 1|backend  |   \"posts\": [\npostiz
    \ | [0] 1|backend  |     {\npostiz  | [0] 1|backend  |       \"integration\":
    {\npostiz  | [0] 1|backend  |         \"id\": \"cmbgf5oko0001ra99r9vzv1fj\"\npostiz
    \ | [0] 1|backend  |       },\npostiz  | [0] 1|backend  |       \"value\": [\npostiz
    \ | [0] 1|backend  |         {\npostiz  | [0] 1|backend  |           \"content\":
    \"\\nHere's a thought I had a while back:\\n\\n> matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n\\nThis
    article was longer than I had time to really consume but a heading caught my eye
    that I wanted to agree with - the author says k8s 2.0 may consider HCL instead
    of YAML. And as a recent terraform / open-tofu adopter I gotta say I would be
    ALL FOR THIS\\n\\nHere's the original link for more context: https://matduggan.com/what-would-a-kubernetes-2-0-look-like/\\n
    \       \\n\\n# devops # tech #k8s #nostr #plebchain\",\npostiz  | [0] 1|backend
    \ |           \"image\": []\npostiz  | [0] 1|backend  |         }\npostiz  | [0]
    1|backend  |       ]\npostiz  | [0] 1|backend  |     }\npostiz  | [0] 1|backend
    \ |   ],\npostiz  | [0] 1|backend  |   \"date\": \"2025-07-02T13:27:07.028Z\"\npostiz
    \ | [0] 1|backend  | }\n```\n\n???+ success\n\n    After the first step my local
    build looks to have not broken this part of the app!\n\nNext was spinning up my
    own nostr relay - it's actually just `docker compose up`\n\n```yaml\nservices:\n
    \ nostr-relay:\n    image: nostr-rs-relay:latest\n    container_name: nostr-relay\n
    \   ports:\n      - \"7000:8080\"\n    environment:\n      TZ: America/Chicago\n
    \   volumes:\n      - ./data:/usr/src/app/db\n      - ./config.toml:/usr/src/app/config.toml\n
    \   restart: unless-stopped\n```\n\nFinally, can I send my note to my relay?\n\nI
    hit post in the UI and then checked coracle...\n\nYes! Using [coracle.social](https://coracle.social)
    I can verify that my note went to my relay only\n\n![20250706122123_47b06d96.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706122123_47b06d96.png)\n\n##
    Fin\n\nSo that was a fun way to get into postiz a little more and start to flesh
    out\nwhat will be a testing-scenario for some pipelines I'm building at home\n"
published: true
slug: testing-a-postiz-change-locally
title: Testing a Postiz Change Locally (IT WORKS!)


---

## Setup

I am working on a pipeline at home to integrate my blog with social media a
little more. One of the things I want to do is automatically post
[[my-thoughts]] to [[nostr]]. [[postiz]] has nostr support that works just fine - login
with your [[nostr-hex-key]] and you're good to go to post notes to several of
the common relays. However for my testing I just wanted to post to a
[self-hosetd nostr relay](https://github.com/scsibug/nostr-rs-relay)
but there wasn't a way to override which relays were used. Well I submitted [this pr](https://github.com/gitroomhq/postiz-app/pull/824)
and hopefully it goes through. But before it did I was able to test the changes
by simply building the postiz image from my feature branch and deploying it at
home in leiu of the published image. It was super cool to see it work

## Build and Deploy

The build was easy after cloning the repo - I happened to already have `buildx` installed... it came with [aurora](https://docs.getaurora.dev/)

`docker buildx build --platform linux/amd64 -f Dockerfile.dev -t registry.example.com/gitroomhq/postiz-app:nostr-test .`

After building then I just update my compose file easy-peasy

```yaml
services:
  postiz:
    # updated the image to my own from my registry
    image: resitry.example.com/gitroomhq/postiz-app:latest
    container_name: postiz
    restart: always
    env_file: .env
#####################
### REST OF COMPOSE FILE FROM THEIR REPO
```

## Pics

To test this my methodlogy was: 0. spin up nostr relay

1. start postiz with my NOSTR_RELAY_OVERRIDES configuration for only my local relay
2. use an existing script to schedule a nostr post via the postiz REST API
3. use the UI to send the note to nostr
4. validate the note came through my relay

So step 1 - does my script to schedule via the REST API work?

```
postiz  | [0] 1|backend  | {
postiz  | [0] 1|backend  |   "type": "draft",
postiz  | [0] 1|backend  |   "shortLink": false,
postiz  | [0] 1|backend  |   "tags": [],
postiz  | [0] 1|backend  |   "posts": [
postiz  | [0] 1|backend  |     {
postiz  | [0] 1|backend  |       "integration": {
postiz  | [0] 1|backend  |         "id": "cmbgf5oko0001ra99r9vzv1fj"
postiz  | [0] 1|backend  |       },
postiz  | [0] 1|backend  |       "value": [
postiz  | [0] 1|backend  |         {
postiz  | [0] 1|backend  |           "content": "\nHere's a thought I had a while back:\n\n> matduggan.com/what-would-a-kubernetes-2-0-look-like/\n\nThis article was longer than I had time to really consume but a heading caught my eye that I wanted to agree with - the author says k8s 2.0 may consider HCL instead of YAML. And as a recent terraform / open-tofu adopter I gotta say I would be ALL FOR THIS\n\nHere's the original link for more context: https://matduggan.com/what-would-a-kubernetes-2-0-look-like/\n        \n\n# devops # tech #k8s #nostr #plebchain",
postiz  | [0] 1|backend  |           "image": []
postiz  | [0] 1|backend  |         }
postiz  | [0] 1|backend  |       ]
postiz  | [0] 1|backend  |     }
postiz  | [0] 1|backend  |   ],
postiz  | [0] 1|backend  |   "date": "2025-07-02T13:27:07.028Z"
postiz  | [0] 1|backend  | }
```

???+ success

    After the first step my local build looks to have not broken this part of the app!

Next was spinning up my own nostr relay - it's actually just `docker compose up`

```yaml
services:
  nostr-relay:
    image: nostr-rs-relay:latest
    container_name: nostr-relay
    ports:
      - "7000:8080"
    environment:
      TZ: America/Chicago
    volumes:
      - ./data:/usr/src/app/db
      - ./config.toml:/usr/src/app/config.toml
    restart: unless-stopped
```

Finally, can I send my note to my relay?

I hit post in the UI and then checked coracle...

Yes! Using [coracle.social](https://coracle.social) I can verify that my note went to my relay only

![20250706122123_47b06d96.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706122123_47b06d96.png)

## Fin

So that was a fun way to get into postiz a little more and start to flesh out
what will be a testing-scenario for some pipelines I'm building at home