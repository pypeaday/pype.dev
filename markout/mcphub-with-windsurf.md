---
content: "I came across [mcphub](https://github.com/samanhappy/mcphub) today and got
  the motivation to try it out... I use AI\ntools like Windsurf and Roo across multiple
  devices and it'd be awesome to have\na simple mcp config - ie. a centralized hub
  to serve all my mcp servers and BAM\nenter this github project. It was easy to spin
  up in docker, and then according\nto Windsurf's docs\n[here](https://docs.windsurf.com/windsurf/cascade/mcp#mcp-config-json)
  the\nsetup is just naming a server and passing a serverUrl\n\n```json\n{\n  \"mcpServers\":
  {\n    \"hub\": {\n      \"serverUrl\": \"http://localhost:3000/sse\"\n    }\n  }\n}\n```\n\n![20250703134426_2c9dfa01.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703134426_2c9dfa01.png)\n\n???+
  warning\n\n    The sse endpoint stuff is getting deprecated eventually - I didn't
  want to\n    spend any time right now trying to get the newer things to work...
  future\n    me/you will solve that problem\n\n## Setup\n\nI ran this in compose
  with this file\n\n```yaml\n\x02services:\n  mcphub:\n    image: samanhappy/mcphub\n
  \   ports:\n      - \"3000:3000\"\n    volumes:\n      - ./mcp_settings.json:/app/mcp_settings.json\n
  \     - ./data:/app/data\n  qdrant:\n    image: qdrant/qdrant\n    container_name:
  qdrant\n    restart: unless-stopped\n    ports:\n      - \"6333:6333\"\n    deploy:\n
  \     resources:\n        limits:\n          memory: \"500m\"\n```\n\nAnd at present
  the `mcp_settings.json` file looks like this mostly:\n\n```json\n{\n  \"mcpServers\":
  {\n    \"docker-mcp\": {\n      \"command\": \"uvx\",\n      \"args\": [\"docker-mcp\"]\n
  \   },\n    \"ragdocs\": {\n      \"command\": \"node\",\n      \"args\": [\n        \"./node_modules/@qpd-v/mcp-server-ragdocs/build/index.js\"\n
  \     ],\n      \"env\": {\n        \"QDRANT_URL\": \"http://localhost:6333\",\n
  \       \"EMBEDDING_PROVIDER\": \"ollama\",\n        \"OLLAMA_URL\": \"http://localhost:11434\"\n
  \     },\n      \"alwaysAllow\": [\n        \"search_documentation\",\n        \"list_sources\",\n
  \       \"test_ollama\",\n        \"add_documentation\"\n      ],\n      \"disabled\":
  false\n    },\n    \"sequential-thinking\": {\n      \"command\": \"npx\",\n      \"args\":
  [\"-y\", \"@modelcontextprotocol/server-sequential-thinking\"]\n    }\n  },\n  \"users\":
  [\n    {\n      \"username\": \"admin\",\n      \"password\": redacted,\n      \"isAdmin\":
  true\n    }\n  ]\n}\n\n\n```\n\n???+ note\n\n    I assume here you have ollama running
  for ragdocs (in my screenshot you see I actually don't right now anyways)\n\n`docker
  compose up` and we're cooking at <http://localhost:3000>"
date: 2025-07-03
description: 'I came across [mcphub](https://github.com/samanhappy/mcphub) today and
  got the motivation to try it out... I use AI

  tools like Windsurf and Roo across multiple '
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>MCPHub with Windsurf</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I came across [mcphub](https://github.com/samanhappy/mcphub)
    today and got the motivation to try it out... I use AI\ntools like Windsurf and
    Roo across multiple \" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"MCPHub with Windsurf | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/mcphub-with-windsurf\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"MCPHub with Windsurf | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I came across [mcphub](https://github.com/samanhappy/mcphub) today and
    got the motivation to try it out... I use AI\ntools like Windsurf and Roo across
    multiple \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"
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
    \           <span class=\"site-terminal__dir\">~/mcphub-with-windsurf</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"
    alt=\"MCPHub with Windsurf cover image\">\n        </div>\n    </figure>\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">MCPHub with Windsurf</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2025-07-03\">\n            July 03, 2025\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/mcp/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #mcp\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>I
    came across <a href=\"https://github.com/samanhappy/mcphub\">mcphub</a> today
    and got the motivation to try it out... I use AI\ntools like Windsurf and Roo
    across multiple devices and it'd be awesome to have\na simple mcp config - ie.
    a centralized hub to serve all my mcp servers and BAM\nenter this github project.
    It was easy to spin up in docker, and then according\nto Windsurf's docs\n<a href=\"https://docs.windsurf.com/windsurf/cascade/mcp#mcp-config-json\">here</a>
    the\nsetup is just naming a server and passing a serverUrl</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;mcpServers&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"nt\">&quot;hub&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;serverUrl&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:3000/sse&quot;</span>\n<span
    class=\"w\">    </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"p\">}</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<p><img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703134426_2c9dfa01.png\"
    alt=\"20250703134426_2c9dfa01.png\" /></p>\n<div class=\"admonition warning is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">Warning</p>\n<p>The sse endpoint
    stuff is getting deprecated eventually - I didn't want to\nspend any time right
    now trying to get the newer things to work... future\nme/you will solve that problem</p>\n</div>\n<h2
    id=\"setup\">Setup <a class=\"header-anchor\" href=\"#setup\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I ran this in compose
    with this file</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">\x02services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">mcphub</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">samanhappy/mcphub</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;3000:3000&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
    l-Scalar-Plain\">./mcp_settings.json:/app/mcp_settings.json</span>\n<span class=\"w\">
    \     </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">./data:/app/data</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">qdrant</span><span class=\"p\">:</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">qdrant/qdrant</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">qdrant</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;6333:6333&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">deploy</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"nt\">resources</span><span class=\"p\">:</span>\n<span class=\"w\">        </span><span
    class=\"nt\">limits</span><span class=\"p\">:</span>\n<span class=\"w\">          </span><span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;500m&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>And at present
    the <code>mcp_settings.json</code> file looks like this mostly:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;mcpServers&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"nt\">&quot;docker-mcp&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;uvx&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">[</span><span
    class=\"s2\">&quot;docker-mcp&quot;</span><span class=\"p\">]</span>\n<span class=\"w\">
    \   </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"nt\">&quot;ragdocs&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;node&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">[</span>\n<span class=\"w\">        </span><span
    class=\"s2\">&quot;./node_modules/@qpd-v/mcp-server-ragdocs/build/index.js&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">],</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;env&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;QDRANT_URL&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:6333&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;EMBEDDING_PROVIDER&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;ollama&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;OLLAMA_URL&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:11434&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;alwaysAllow&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">[</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;search_documentation&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;list_sources&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;test_ollama&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;add_documentation&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">],</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;disabled&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">false</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">    </span><span class=\"nt\">&quot;sequential-thinking&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;npx&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">[</span><span class=\"s2\">&quot;-y&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;@modelcontextprotocol/server-sequential-thinking&quot;</span><span
    class=\"p\">]</span>\n<span class=\"w\">    </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"w\">  </span><span
    class=\"nt\">&quot;users&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">[</span>\n<span class=\"w\">    </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;username&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;admin&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;password&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"err\">redac</span><span class=\"kc\">te</span><span
    class=\"err\">d</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;isAdmin&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">true</span>\n<span class=\"w\">    </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">]</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition note is-collapsible collapsible-open\">\n<p class=\"admonition-title\">Note</p>\n<p>I
    assume here you have ollama running for ragdocs (in my screenshot you see I actually
    don't right now anyways)</p>\n</div>\n<p><code>docker compose up</code> and we're
    cooking at <a href=\"http://localhost:3000\">http://localhost:3000</a></p>\n\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>MCPHub with Windsurf</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I came across [mcphub](https://github.com/samanhappy/mcphub)
    today and got the motivation to try it out... I use AI\ntools like Windsurf and
    Roo across multiple \" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"MCPHub with Windsurf | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/mcphub-with-windsurf\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"MCPHub with Windsurf | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I came across [mcphub](https://github.com/samanhappy/mcphub) today and
    got the motivation to try it out... I use AI\ntools like Windsurf and Roo across
    multiple \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"
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
    mb-4 post-title-large\">MCPHub with Windsurf</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-03\">\n            July
    03, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/mcp/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #mcp\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"
    alt=\"MCPHub with Windsurf cover image\">\n        </div>\n    </figure>\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">MCPHub with Windsurf</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2025-07-03\">\n            July 03, 2025\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/mcp/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #mcp\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>I
    came across <a href=\"https://github.com/samanhappy/mcphub\">mcphub</a> today
    and got the motivation to try it out... I use AI\ntools like Windsurf and Roo
    across multiple devices and it'd be awesome to have\na simple mcp config - ie.
    a centralized hub to serve all my mcp servers and BAM\nenter this github project.
    It was easy to spin up in docker, and then according\nto Windsurf's docs\n<a href=\"https://docs.windsurf.com/windsurf/cascade/mcp#mcp-config-json\">here</a>
    the\nsetup is just naming a server and passing a serverUrl</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;mcpServers&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"nt\">&quot;hub&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;serverUrl&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:3000/sse&quot;</span>\n<span
    class=\"w\">    </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"p\">}</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<p><img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703134426_2c9dfa01.png\"
    alt=\"20250703134426_2c9dfa01.png\" /></p>\n<div class=\"admonition warning is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">Warning</p>\n<p>The sse endpoint
    stuff is getting deprecated eventually - I didn't want to\nspend any time right
    now trying to get the newer things to work... future\nme/you will solve that problem</p>\n</div>\n<h2
    id=\"setup\">Setup <a class=\"header-anchor\" href=\"#setup\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I ran this in compose
    with this file</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">\x02services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">mcphub</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">samanhappy/mcphub</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;3000:3000&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
    l-Scalar-Plain\">./mcp_settings.json:/app/mcp_settings.json</span>\n<span class=\"w\">
    \     </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">./data:/app/data</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">qdrant</span><span class=\"p\">:</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">qdrant/qdrant</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">qdrant</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;6333:6333&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">deploy</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"nt\">resources</span><span class=\"p\">:</span>\n<span class=\"w\">        </span><span
    class=\"nt\">limits</span><span class=\"p\">:</span>\n<span class=\"w\">          </span><span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;500m&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>And at present
    the <code>mcp_settings.json</code> file looks like this mostly:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;mcpServers&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"nt\">&quot;docker-mcp&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;uvx&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">[</span><span
    class=\"s2\">&quot;docker-mcp&quot;</span><span class=\"p\">]</span>\n<span class=\"w\">
    \   </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"nt\">&quot;ragdocs&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;node&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">[</span>\n<span class=\"w\">        </span><span
    class=\"s2\">&quot;./node_modules/@qpd-v/mcp-server-ragdocs/build/index.js&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">],</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;env&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;QDRANT_URL&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:6333&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;EMBEDDING_PROVIDER&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;ollama&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;OLLAMA_URL&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:11434&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;alwaysAllow&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">[</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;search_documentation&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;list_sources&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;test_ollama&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;add_documentation&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">],</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;disabled&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">false</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">    </span><span class=\"nt\">&quot;sequential-thinking&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;npx&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">[</span><span class=\"s2\">&quot;-y&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;@modelcontextprotocol/server-sequential-thinking&quot;</span><span
    class=\"p\">]</span>\n<span class=\"w\">    </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"w\">  </span><span
    class=\"nt\">&quot;users&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">[</span>\n<span class=\"w\">    </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;username&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;admin&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;password&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"err\">redac</span><span class=\"kc\">te</span><span
    class=\"err\">d</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;isAdmin&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">true</span>\n<span class=\"w\">    </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">]</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition note is-collapsible collapsible-open\">\n<p class=\"admonition-title\">Note</p>\n<p>I
    assume here you have ollama running for ragdocs (in my screenshot you see I actually
    don't right now anyways)</p>\n</div>\n<p><code>docker compose up</code> and we're
    cooking at <a href=\"http://localhost:3000\">http://localhost:3000</a></p>\n\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>MCPHub
    with Windsurf</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I came across [mcphub](https://github.com/samanhappy/mcphub)
    today and got the motivation to try it out... I use AI\ntools like Windsurf and
    Roo across multiple \" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"MCPHub with Windsurf | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/mcphub-with-windsurf\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"MCPHub with Windsurf | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I came across [mcphub](https://github.com/samanhappy/mcphub) today and
    got the motivation to try it out... I use AI\ntools like Windsurf and Roo across
    multiple \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"
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
    \           <span class=\"site-terminal__dir\">~/mcphub-with-windsurf</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>I came
    across <a href=\"https://github.com/samanhappy/mcphub\">mcphub</a> today and got
    the motivation to try it out... I use AI\ntools like Windsurf and Roo across multiple
    devices and it'd be awesome to have\na simple mcp config - ie. a centralized hub
    to serve all my mcp servers and BAM\nenter this github project. It was easy to
    spin up in docker, and then according\nto Windsurf's docs\n<a href=\"https://docs.windsurf.com/windsurf/cascade/mcp#mcp-config-json\">here</a>
    the\nsetup is just naming a server and passing a serverUrl</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;mcpServers&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"nt\">&quot;hub&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;serverUrl&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:3000/sse&quot;</span>\n<span
    class=\"w\">    </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"p\">}</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<p><img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703134426_2c9dfa01.png\"
    alt=\"20250703134426_2c9dfa01.png\" /></p>\n<div class=\"admonition warning is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">Warning</p>\n<p>The sse endpoint
    stuff is getting deprecated eventually - I didn't want to\nspend any time right
    now trying to get the newer things to work... future\nme/you will solve that problem</p>\n</div>\n<h2
    id=\"setup\">Setup <a class=\"header-anchor\" href=\"#setup\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I ran this in compose
    with this file</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">\x02services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">mcphub</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">samanhappy/mcphub</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;3000:3000&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
    l-Scalar-Plain\">./mcp_settings.json:/app/mcp_settings.json</span>\n<span class=\"w\">
    \     </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
    class=\"l l-Scalar l-Scalar-Plain\">./data:/app/data</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">qdrant</span><span class=\"p\">:</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">image</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">qdrant/qdrant</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">qdrant</span>\n<span
    class=\"w\">    </span><span class=\"nt\">restart</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">unless-stopped</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;6333:6333&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">deploy</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"nt\">resources</span><span class=\"p\">:</span>\n<span class=\"w\">        </span><span
    class=\"nt\">limits</span><span class=\"p\">:</span>\n<span class=\"w\">          </span><span
    class=\"nt\">memory</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"s\">&quot;500m&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>And at present
    the <code>mcp_settings.json</code> file looks like this mostly:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;mcpServers&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"nt\">&quot;docker-mcp&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;uvx&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">[</span><span
    class=\"s2\">&quot;docker-mcp&quot;</span><span class=\"p\">]</span>\n<span class=\"w\">
    \   </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"nt\">&quot;ragdocs&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;node&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">[</span>\n<span class=\"w\">        </span><span
    class=\"s2\">&quot;./node_modules/@qpd-v/mcp-server-ragdocs/build/index.js&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">],</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;env&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">{</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;QDRANT_URL&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:6333&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;EMBEDDING_PROVIDER&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;ollama&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"nt\">&quot;OLLAMA_URL&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"s2\">&quot;http://localhost:11434&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;alwaysAllow&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">[</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;search_documentation&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;list_sources&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;test_ollama&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"s2\">&quot;add_documentation&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p\">],</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;disabled&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">false</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">    </span><span class=\"nt\">&quot;sequential-thinking&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;command&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;npx&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;args&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"p\">[</span><span class=\"s2\">&quot;-y&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;@modelcontextprotocol/server-sequential-thinking&quot;</span><span
    class=\"p\">]</span>\n<span class=\"w\">    </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"w\">  </span><span
    class=\"nt\">&quot;users&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"p\">[</span>\n<span class=\"w\">    </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;username&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;admin&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">      </span><span class=\"nt\">&quot;password&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"err\">redac</span><span class=\"kc\">te</span><span
    class=\"err\">d</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nt\">&quot;isAdmin&quot;</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">true</span>\n<span class=\"w\">    </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">]</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition note is-collapsible collapsible-open\">\n<p class=\"admonition-title\">Note</p>\n<p>I
    assume here you have ollama running for ragdocs (in my screenshot you see I actually
    don't right now anyways)</p>\n</div>\n<p><code>docker compose up</code> and we're
    cooking at <a href=\"http://localhost:3000\">http://localhost:3000</a></p>\n\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-07-03 08:42:31\ntemplateKey: blog-post\ntitle: MCPHub with
    Windsurf\npublished: True\ntags:\n  - mcp\n  - tech\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png\"\n---\n\nI
    came across [mcphub](https://github.com/samanhappy/mcphub) today and got the motivation
    to try it out... I use AI\ntools like Windsurf and Roo across multiple devices
    and it'd be awesome to have\na simple mcp config - ie. a centralized hub to serve
    all my mcp servers and BAM\nenter this github project. It was easy to spin up
    in docker, and then according\nto Windsurf's docs\n[here](https://docs.windsurf.com/windsurf/cascade/mcp#mcp-config-json)
    the\nsetup is just naming a server and passing a serverUrl\n\n```json\n{\n  \"mcpServers\":
    {\n    \"hub\": {\n      \"serverUrl\": \"http://localhost:3000/sse\"\n    }\n
    \ }\n}\n```\n\n![20250703134426_2c9dfa01.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703134426_2c9dfa01.png)\n\n???+
    warning\n\n    The sse endpoint stuff is getting deprecated eventually - I didn't
    want to\n    spend any time right now trying to get the newer things to work...
    future\n    me/you will solve that problem\n\n## Setup\n\nI ran this in compose
    with this file\n\n```yaml\n\x02services:\n  mcphub:\n    image: samanhappy/mcphub\n
    \   ports:\n      - \"3000:3000\"\n    volumes:\n      - ./mcp_settings.json:/app/mcp_settings.json\n
    \     - ./data:/app/data\n  qdrant:\n    image: qdrant/qdrant\n    container_name:
    qdrant\n    restart: unless-stopped\n    ports:\n      - \"6333:6333\"\n    deploy:\n
    \     resources:\n        limits:\n          memory: \"500m\"\n```\n\nAnd at present
    the `mcp_settings.json` file looks like this mostly:\n\n```json\n{\n  \"mcpServers\":
    {\n    \"docker-mcp\": {\n      \"command\": \"uvx\",\n      \"args\": [\"docker-mcp\"]\n
    \   },\n    \"ragdocs\": {\n      \"command\": \"node\",\n      \"args\": [\n
    \       \"./node_modules/@qpd-v/mcp-server-ragdocs/build/index.js\"\n      ],\n
    \     \"env\": {\n        \"QDRANT_URL\": \"http://localhost:6333\",\n        \"EMBEDDING_PROVIDER\":
    \"ollama\",\n        \"OLLAMA_URL\": \"http://localhost:11434\"\n      },\n      \"alwaysAllow\":
    [\n        \"search_documentation\",\n        \"list_sources\",\n        \"test_ollama\",\n
    \       \"add_documentation\"\n      ],\n      \"disabled\": false\n    },\n    \"sequential-thinking\":
    {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-sequential-thinking\"]\n
    \   }\n  },\n  \"users\": [\n    {\n      \"username\": \"admin\",\n      \"password\":
    redacted,\n      \"isAdmin\": true\n    }\n  ]\n}\n\n\n```\n\n???+ note\n\n    I
    assume here you have ollama running for ragdocs (in my screenshot you see I actually
    don't right now anyways)\n\n`docker compose up` and we're cooking at <http://localhost:3000>\n"
published: true
slug: mcphub-with-windsurf
title: MCPHub with Windsurf


---

I came across [mcphub](https://github.com/samanhappy/mcphub) today and got the motivation to try it out... I use AI
tools like Windsurf and Roo across multiple devices and it'd be awesome to have
a simple mcp config - ie. a centralized hub to serve all my mcp servers and BAM
enter this github project. It was easy to spin up in docker, and then according
to Windsurf's docs
[here](https://docs.windsurf.com/windsurf/cascade/mcp#mcp-config-json) the
setup is just naming a server and passing a serverUrl

```json
{
  "mcpServers": {
    "hub": {
      "serverUrl": "http://localhost:3000/sse"
    }
  }
}
```

![20250703134426_2c9dfa01.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703134426_2c9dfa01.png)

???+ warning

    The sse endpoint stuff is getting deprecated eventually - I didn't want to
    spend any time right now trying to get the newer things to work... future
    me/you will solve that problem

## Setup

I ran this in compose with this file

```yaml
services:
  mcphub:
    image: samanhappy/mcphub
    ports:
      - "3000:3000"
    volumes:
      - ./mcp_settings.json:/app/mcp_settings.json
      - ./data:/app/data
  qdrant:
    image: qdrant/qdrant
    container_name: qdrant
    restart: unless-stopped
    ports:
      - "6333:6333"
    deploy:
      resources:
        limits:
          memory: "500m"
```

And at present the `mcp_settings.json` file looks like this mostly:

```json
{
  "mcpServers": {
    "docker-mcp": {
      "command": "uvx",
      "args": ["docker-mcp"]
    },
    "ragdocs": {
      "command": "node",
      "args": [
        "./node_modules/@qpd-v/mcp-server-ragdocs/build/index.js"
      ],
      "env": {
        "QDRANT_URL": "http://localhost:6333",
        "EMBEDDING_PROVIDER": "ollama",
        "OLLAMA_URL": "http://localhost:11434"
      },
      "alwaysAllow": [
        "search_documentation",
        "list_sources",
        "test_ollama",
        "add_documentation"
      ],
      "disabled": false
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  },
  "users": [
    {
      "username": "admin",
      "password": redacted,
      "isAdmin": true
    }
  ]
}


```

???+ note

    I assume here you have ollama running for ragdocs (in my screenshot you see I actually don't right now anyways)

`docker compose up` and we're cooking at <http://localhost:3000>