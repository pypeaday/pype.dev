---
content: "I'm working on some spring cleaning in my homelab and backed myself into
  a\nhilarious corner yesterday. I use Open Tofu for any of my Terraform needs now,\nand
  although I don't manage a ton with terraform, I do manage all my cloudflare\nstuff
  with it. I decided I wanted to use my own minio instance as the s3 remote\nstate
  backend for my workspaces so I could rely on my typical NAS data\nbackup/retention
  workflow for the buckets in case anything went wrong, as\nopposed to a local state
  file that I'm not taking a lot of precautions with.\nWell during my Spring Cleaning
  I was working towards replacing ingress into my\nhome network with Cloudflare tunnels
  and in the midst of that update I took\ndown traefik, no matter a simple 'tofu apply'
  should get me right back to\nworking order...\n\n```hcl\n\u2577\n\u2502 Error: Error
  inspecting states in the \"s3\" backend:\n\u2502     operation error S3: ListObjectsV2,
  https response error StatusCode: 404, RequestID: , HostID: , api error NotFound:
  Not Found\n```\n\nHilarious problem with thankfully an easy fix... downloading the
  state file\nfrom Minio wasn't a big deal since the container was still running without\nissue,
  and placing the state file in the folder to use as the local state\nsolution for
  the interim went totally smooth, but this highlights the set of\ninterdependencies
  I'm creating for myself and as I take the next few days/weeks\nto do some spring
  cleaning I'm hoping I can separate out the external ingress\nfrom internal with
  a bit more clear boundaries so that I never lock myself out\nof a workflow I only
  execute on my LAN in the first place!"
date: 2026-03-23
description: 'I&#x27;m working on some spring cleaning in my homelab and backed myself
  into a

  hilarious corner yesterday. I use Open Tofu for any of my Terraform needs now,

  a'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Remote Terraform
    State Requires Working Traefik... DUH!</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I&#x27;m working on some spring cleaning in my homelab and backed myself
    into a\nhilarious corner yesterday. I use Open Tofu for any of my Terraform needs
    now,\na\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Remote Terraform State Requires Working Traefik...
    DUH! | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/remote-terraform-state-requires-working-traefik-duh\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Remote Terraform State Requires Working Traefik... DUH! | Nic Payne\"
    />\n<meta name=\"twitter:description\" content=\"I&#x27;m working on some spring
    cleaning in my homelab and backed myself into a\nhilarious corner yesterday. I
    use Open Tofu for any of my Terraform needs now,\na\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\"
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
    \           <span class=\"site-terminal__dir\">~/remote-terraform-state-requires-working-traefik-duh</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\"
    alt=\"Remote Terraform State Requires Working Traefik... DUH! cover image\">\n
    \       </div>\n    </figure>\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Remote Terraform State Requires Working Traefik... DUH!</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2026-03-23\">\n            March 23, 2026\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/traefik/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #traefik\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>I'm
    working on some spring cleaning in my homelab and backed myself into a\nhilarious
    corner yesterday. I use Open Tofu for any of my Terraform needs now,\nand although
    I don't manage a ton with terraform, I do manage all my cloudflare\nstuff with
    it. I decided I wanted to use my own minio instance as the s3 remote\nstate backend
    for my workspaces so I could rely on my typical NAS data\nbackup/retention workflow
    for the buckets in case anything went wrong, as\nopposed to a local state file
    that I'm not taking a lot of precautions with.\nWell during my Spring Cleaning
    I was working towards replacing ingress into my\nhome network with Cloudflare
    tunnels and in the midst of that update I took\ndown traefik, no matter a simple
    'tofu apply' should get me right back to\nworking order...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u2577</span>\n<span
    class=\"err\">\u2502</span><span class=\"w\"> </span><span class=\"err\">Error</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">Error</span><span
    class=\"w\"> </span><span class=\"err\">inspecting</span><span class=\"w\"> </span><span
    class=\"err\">states</span><span class=\"w\"> </span><span class=\"err\">in</span><span
    class=\"w\"> </span><span class=\"err\">the</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;s3&quot;</span><span class=\"w\"> </span><span class=\"err\">backend</span><span
    class=\"p\">:</span>\n<span class=\"err\">\u2502</span><span class=\"w\">     </span><span
    class=\"err\">operation</span><span class=\"w\"> </span><span class=\"err\">error</span><span
    class=\"w\"> </span><span class=\"err\">S</span><span class=\"m\">3</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">ListObjectsV</span><span
    class=\"m\">2</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"err\">https</span><span class=\"w\"> </span><span class=\"err\">response</span><span
    class=\"w\"> </span><span class=\"err\">error</span><span class=\"w\"> </span><span
    class=\"err\">StatusCode</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"m\">404</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"err\">RequestID</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"err\">HostID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"err\">api</span><span class=\"w\"> </span><span
    class=\"err\">error</span><span class=\"w\"> </span><span class=\"err\">NotFound</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">Not</span><span
    class=\"w\"> </span><span class=\"err\">Found</span>\n</pre></div>\n\n</pre>\n\n<p>Hilarious
    problem with thankfully an easy fix... downloading the state file\nfrom Minio
    wasn't a big deal since the container was still running without\nissue, and placing
    the state file in the folder to use as the local state\nsolution for the interim
    went totally smooth, but this highlights the set of\ninterdependencies I'm creating
    for myself and as I take the next few days/weeks\nto do some spring cleaning I'm
    hoping I can separate out the external ingress\nfrom internal with a bit more
    clear boundaries so that I never lock myself out\nof a workflow I only execute
    on my LAN in the first place!</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Remote Terraform State
    Requires Working Traefik... DUH!</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I&#x27;m working on some spring cleaning in my homelab and backed myself
    into a\nhilarious corner yesterday. I use Open Tofu for any of my Terraform needs
    now,\na\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Remote Terraform State Requires Working Traefik...
    DUH! | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/remote-terraform-state-requires-working-traefik-duh\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Remote Terraform State Requires Working Traefik... DUH! | Nic Payne\"
    />\n<meta name=\"twitter:description\" content=\"I&#x27;m working on some spring
    cleaning in my homelab and backed myself into a\nhilarious corner yesterday. I
    use Open Tofu for any of my Terraform needs now,\na\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\"
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
    mb-4 post-title-large\">Remote Terraform State Requires Working Traefik... DUH!</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2026-03-23\">\n            March 23, 2026\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/traefik/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #traefik\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section></article>\n
    \    </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\"
    alt=\"Remote Terraform State Requires Working Traefik... DUH! cover image\">\n
    \       </div>\n    </figure>\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Remote Terraform State Requires Working Traefik... DUH!</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2026-03-23\">\n            March 23, 2026\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/traefik/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #traefik\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>I'm
    working on some spring cleaning in my homelab and backed myself into a\nhilarious
    corner yesterday. I use Open Tofu for any of my Terraform needs now,\nand although
    I don't manage a ton with terraform, I do manage all my cloudflare\nstuff with
    it. I decided I wanted to use my own minio instance as the s3 remote\nstate backend
    for my workspaces so I could rely on my typical NAS data\nbackup/retention workflow
    for the buckets in case anything went wrong, as\nopposed to a local state file
    that I'm not taking a lot of precautions with.\nWell during my Spring Cleaning
    I was working towards replacing ingress into my\nhome network with Cloudflare
    tunnels and in the midst of that update I took\ndown traefik, no matter a simple
    'tofu apply' should get me right back to\nworking order...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u2577</span>\n<span
    class=\"err\">\u2502</span><span class=\"w\"> </span><span class=\"err\">Error</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">Error</span><span
    class=\"w\"> </span><span class=\"err\">inspecting</span><span class=\"w\"> </span><span
    class=\"err\">states</span><span class=\"w\"> </span><span class=\"err\">in</span><span
    class=\"w\"> </span><span class=\"err\">the</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;s3&quot;</span><span class=\"w\"> </span><span class=\"err\">backend</span><span
    class=\"p\">:</span>\n<span class=\"err\">\u2502</span><span class=\"w\">     </span><span
    class=\"err\">operation</span><span class=\"w\"> </span><span class=\"err\">error</span><span
    class=\"w\"> </span><span class=\"err\">S</span><span class=\"m\">3</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">ListObjectsV</span><span
    class=\"m\">2</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"err\">https</span><span class=\"w\"> </span><span class=\"err\">response</span><span
    class=\"w\"> </span><span class=\"err\">error</span><span class=\"w\"> </span><span
    class=\"err\">StatusCode</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"m\">404</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"err\">RequestID</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"err\">HostID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"err\">api</span><span class=\"w\"> </span><span
    class=\"err\">error</span><span class=\"w\"> </span><span class=\"err\">NotFound</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">Not</span><span
    class=\"w\"> </span><span class=\"err\">Found</span>\n</pre></div>\n\n</pre>\n\n<p>Hilarious
    problem with thankfully an easy fix... downloading the state file\nfrom Minio
    wasn't a big deal since the container was still running without\nissue, and placing
    the state file in the folder to use as the local state\nsolution for the interim
    went totally smooth, but this highlights the set of\ninterdependencies I'm creating
    for myself and as I take the next few days/weeks\nto do some spring cleaning I'm
    hoping I can separate out the external ingress\nfrom internal with a bit more
    clear boundaries so that I never lock myself out\nof a workflow I only execute
    on my LAN in the first place!</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Remote
    Terraform State Requires Working Traefik... DUH!</title>\n<meta charset=\"UTF-8\"
    />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta
    name=\"description\" content=\"I&#x27;m working on some spring cleaning in my
    homelab and backed myself into a\nhilarious corner yesterday. I use Open Tofu
    for any of my Terraform needs now,\na\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Remote Terraform State Requires Working Traefik...
    DUH! | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/remote-terraform-state-requires-working-traefik-duh\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Remote Terraform State Requires Working Traefik... DUH! | Nic Payne\"
    />\n<meta name=\"twitter:description\" content=\"I&#x27;m working on some spring
    cleaning in my homelab and backed myself into a\nhilarious corner yesterday. I
    use Open Tofu for any of my Terraform needs now,\na\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\"
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
    \           <span class=\"site-terminal__dir\">~/remote-terraform-state-requires-working-traefik-duh</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>I'm
    working on some spring cleaning in my homelab and backed myself into a\nhilarious
    corner yesterday. I use Open Tofu for any of my Terraform needs now,\nand although
    I don't manage a ton with terraform, I do manage all my cloudflare\nstuff with
    it. I decided I wanted to use my own minio instance as the s3 remote\nstate backend
    for my workspaces so I could rely on my typical NAS data\nbackup/retention workflow
    for the buckets in case anything went wrong, as\nopposed to a local state file
    that I'm not taking a lot of precautions with.\nWell during my Spring Cleaning
    I was working towards replacing ingress into my\nhome network with Cloudflare
    tunnels and in the midst of that update I took\ndown traefik, no matter a simple
    'tofu apply' should get me right back to\nworking order...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u2577</span>\n<span
    class=\"err\">\u2502</span><span class=\"w\"> </span><span class=\"err\">Error</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">Error</span><span
    class=\"w\"> </span><span class=\"err\">inspecting</span><span class=\"w\"> </span><span
    class=\"err\">states</span><span class=\"w\"> </span><span class=\"err\">in</span><span
    class=\"w\"> </span><span class=\"err\">the</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;s3&quot;</span><span class=\"w\"> </span><span class=\"err\">backend</span><span
    class=\"p\">:</span>\n<span class=\"err\">\u2502</span><span class=\"w\">     </span><span
    class=\"err\">operation</span><span class=\"w\"> </span><span class=\"err\">error</span><span
    class=\"w\"> </span><span class=\"err\">S</span><span class=\"m\">3</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">ListObjectsV</span><span
    class=\"m\">2</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"err\">https</span><span class=\"w\"> </span><span class=\"err\">response</span><span
    class=\"w\"> </span><span class=\"err\">error</span><span class=\"w\"> </span><span
    class=\"err\">StatusCode</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"m\">404</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"err\">RequestID</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"err\">HostID</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"err\">api</span><span class=\"w\"> </span><span
    class=\"err\">error</span><span class=\"w\"> </span><span class=\"err\">NotFound</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"err\">Not</span><span
    class=\"w\"> </span><span class=\"err\">Found</span>\n</pre></div>\n\n</pre>\n\n<p>Hilarious
    problem with thankfully an easy fix... downloading the state file\nfrom Minio
    wasn't a big deal since the container was still running without\nissue, and placing
    the state file in the folder to use as the local state\nsolution for the interim
    went totally smooth, but this highlights the set of\ninterdependencies I'm creating
    for myself and as I take the next few days/weeks\nto do some spring cleaning I'm
    hoping I can separate out the external ingress\nfrom internal with a bit more
    clear boundaries so that I never lock myself out\nof a workflow I only execute
    on my LAN in the first place!</p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2026-03-23 08:12:25\ntemplateKey: blog-post\ntitle: Remote Terraform
    State Requires Working Traefik... DUH!\npublished: True\ncover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png\ntags:\n
    \ - traefik\n  - tech\n---\n\nI'm working on some spring cleaning in my homelab
    and backed myself into a\nhilarious corner yesterday. I use Open Tofu for any
    of my Terraform needs now,\nand although I don't manage a ton with terraform,
    I do manage all my cloudflare\nstuff with it. I decided I wanted to use my own
    minio instance as the s3 remote\nstate backend for my workspaces so I could rely
    on my typical NAS data\nbackup/retention workflow for the buckets in case anything
    went wrong, as\nopposed to a local state file that I'm not taking a lot of precautions
    with.\nWell during my Spring Cleaning I was working towards replacing ingress
    into my\nhome network with Cloudflare tunnels and in the midst of that update
    I took\ndown traefik, no matter a simple 'tofu apply' should get me right back
    to\nworking order...\n\n```hcl\n\u2577\n\u2502 Error: Error inspecting states
    in the \"s3\" backend:\n\u2502     operation error S3: ListObjectsV2, https response
    error StatusCode: 404, RequestID: , HostID: , api error NotFound: Not Found\n```\n\nHilarious
    problem with thankfully an easy fix... downloading the state file\nfrom Minio
    wasn't a big deal since the container was still running without\nissue, and placing
    the state file in the folder to use as the local state\nsolution for the interim
    went totally smooth, but this highlights the set of\ninterdependencies I'm creating
    for myself and as I take the next few days/weeks\nto do some spring cleaning I'm
    hoping I can separate out the external ingress\nfrom internal with a bit more
    clear boundaries so that I never lock myself out\nof a workflow I only execute
    on my LAN in the first place!\n"
published: true
slug: remote-terraform-state-requires-working-traefik-duh
title: Remote Terraform State Requires Working Traefik... DUH!


---

I'm working on some spring cleaning in my homelab and backed myself into a
hilarious corner yesterday. I use Open Tofu for any of my Terraform needs now,
and although I don't manage a ton with terraform, I do manage all my cloudflare
stuff with it. I decided I wanted to use my own minio instance as the s3 remote
state backend for my workspaces so I could rely on my typical NAS data
backup/retention workflow for the buckets in case anything went wrong, as
opposed to a local state file that I'm not taking a lot of precautions with.
Well during my Spring Cleaning I was working towards replacing ingress into my
home network with Cloudflare tunnels and in the midst of that update I took
down traefik, no matter a simple 'tofu apply' should get me right back to
working order...

```hcl
╷
│ Error: Error inspecting states in the "s3" backend:
│     operation error S3: ListObjectsV2, https response error StatusCode: 404, RequestID: , HostID: , api error NotFound: Not Found
```

Hilarious problem with thankfully an easy fix... downloading the state file
from Minio wasn't a big deal since the container was still running without
issue, and placing the state file in the folder to use as the local state
solution for the interim went totally smooth, but this highlights the set of
interdependencies I'm creating for myself and as I take the next few days/weeks
to do some spring cleaning I'm hoping I can separate out the external ingress
from internal with a bit more clear boundaries so that I never lock myself out
of a workflow I only execute on my LAN in the first place!