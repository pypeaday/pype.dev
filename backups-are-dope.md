---
content: 'I accidently chown''d -R an app directory and it totally screwed up the
  database

  folder. Luckily I zfs replicate my docker volumes to another drive even on the

  same host, so a quick [rsync] from /harbor/encrypted/docker/manyfold to

  /tank/encrypted/docker/manyfold got me back up and running since I hadn''t

  replicated the messed up permission set yet


  Q: How to link to my rsync like a pro post?


  A: Wikilinks `[[rsync-like-a-pro]]` [[rsync-like-a-pro]]'
date: 2025-05-27
description: 'I accidently chown&#x27;d -R an app directory and it totally screwed
  up the database

  folder. Luckily I zfs replicate my docker volumes to another drive even on '
html:
  index: "<html lang=\"en\">\n    <head>\n<title>Backups are dope</title>\n<meta charset=\"UTF-8\">\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<meta name=\"description\"
    content=\"I accidently chown'd -R an app directory and it totally screwed up the
    database\nfolder. Luckily I zfs replicate my docker volumes to another drive even
    on \">\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\">\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&amp;display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\">\n<link rel=\"stylesheet\"
    href=\"/app.css\">\n<script src=\"/theme.js\"></script>\n\n<!-- Meta tags from
    original file -->\n<meta property=\"og:title\" content=\"Pype.dev | Nic Payne\">\n<meta
    name=\"twitter:title\" content=\"Pype.dev | Nic Payne\">\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta property=\"og:image\" name=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\">\n<meta
    name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\">\n<meta
    property=\"og:url\" content=\"https://pype.dev\">\n<meta name=\"twitter:creator\"
    content=\"@pypeaday\">\n<meta name=\"twitter:site\" content=\"@pypeaday\">\n\n\n
    \       <meta property=\"og:author_email\" content=\"nic@pype.dev\">\n\n        <script>\n
    \           document.addEventListener(\"DOMContentLoaded\", () => {\n                const
    collapsibleElements = document.querySelectorAll('.is-collapsible');\n                collapsibleElements.forEach(el
    => {\n                    const summary = el.querySelector('.admonition-title');\n
    \                   if (summary) {\n                        summary.style.cursor
    = 'pointer';\n                        summary.addEventListener('click', () =>
    {\n                            el.classList.toggle('collapsible-open');\n                        });\n
    \                   }\n                });\n            });\n        </script>\n\n
    \       <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"flex
    flex-row w-full min-h-screen bg-primary-dark text-text-main\">\n    <main class=\"flex-grow\">\n
    \       <div class=\"container mx-auto px-4 py-8 bg-primary-light\">\n<header
    class=\"flex justify-between items-center py-8\">\n\n    <nav class=\"flex items-center\">\n
    \       <a href=\"/\">Home</a>\n        <a href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a
    href=\"/slash\">Start Here</a>\n    </nav>\n\n    <!-- <div>\n        <label id=\"theme-switch\"
    class=\"theme-switch\" for=\"checkbox-theme\" title=\"light/dark mode toggle\">\n
    \           <input type=\"checkbox\" id=\"checkbox-theme\" />\n            <div
    class=\"slider round\"></div>\n        </label>\n    </div> -->\n</header><div
    id=\"didyoumean\">\n    <div class=\"mb-0\">\n        <!-- <label for=\"search\"
    class=\"block text-sm font-medium mb-2\">Search for a page</label> -->\n        <input
    type=\"text\" id=\"search\" class=\"w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800
    focus:ring-2 focus:ring-pink-500\" placeholder=\"'/' Search for a page\">\n    </div>\n\n
    \   <!-- <div id=\"didyoumean_results\" class=\"grid gap-4 grid-cols-1 md:grid-cols-2
    lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\" class=\"grid gap-4\">\n
    \       <!-- Results will be populated here -->\n    </ul>\n</div>\n<script type=\"module\">\n//
    All available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script><article
    class=\"w-full\">\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    class=\"text-4xl md:text-5xl font-bold text-text-heading mb-4\">Backups are dope</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2025-05-27\">\n            May 27, 2025\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #tech\n            </a>\n            <a href=\"https://pype.dev//tags/homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #homelab\n            </a>\n            <a href=\"https://pype.dev//tags/zfs/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #zfs\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #til\n            </a>\n    </div>\n</section>    <section class=\"article-content
    prose dark:prose-invert lg:prose-xl max-w-none mx-auto mt-8\">\n        <p>I accidently
    chown'd -R an app directory and it totally screwed up the database\nfolder. Luckily
    I zfs replicate my docker volumes to another drive even on the\nsame host, so
    a quick [rsync] from /harbor/encrypted/docker/manyfold to\n/tank/encrypted/docker/manyfold
    got me back up and running since I hadn't\nreplicated the messed up permission
    set yet</p>\n<p>Q: How to link to my rsync like a pro post?</p>\n<p class=\"hover:z-20
    relative\">A: Wikilinks <code>[[rsync-like-a-pro]]</code> <span class=\"z-10 group
    group-hover:z-20 relative inline-block\">\n        <a class=\"wikilink text-green-500
    hover:underline\" href=\"https://pype.dev/rsync-like-a-pro\" title=\"rsync-like-a-pro\"
    hx-boost=\"true\"> rsync-like-a-pro</a>\n        <button class=\"ml-2 text-green-500
    hover:underline focus:outline-none\" aria-label=\"Preview\">\n            <svg
    xmlns=\"https://www.w3.org/2000/svg\" fill=\"none\" viewbox=\"0 0 24 24\" stroke-width=\"1.5\"
    stroke=\"currentColor\" class=\"h-5 w-5 inline align-middle\">\n                <path
    stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m2.25 15.75 5.159-5.159a2.25
    2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909
    2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5
    0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375
    0 1 1-.75 0 .375.375 0 0 1 .75 0Z\"></path>\n            </svg>\n        </button>\n
    \       <a href=\"https://pype.dev/rsync-like-a-pro\" class=\"hidden absolute
    top-6 left-0 z-20 group-hover:block \">\n            <img alt=\"a screenshot of
    https://pype.dev/rsync-like-a-pro\" class=\"rounded-xl transition-height ease-in
    duration-75 h-0 opacity-0 group-hover:opacity-100 group-hover:h-[800px] max-w-none
    \" height=\"800\" width=\"600\" style=\" box-shadow: rgba(0, 0, 0, 0.6) 0 0 500rem
    500rem; \" src=\"https://shots.wayl.one/shot/?url=https://pype.dev/rsync-like-a-pro&amp;height=1600&amp;width=1200&amp;scaled_width=600&amp;scaled_height=800&amp;selectors=\">\n
    \       </a>\n    </span>\n</p>\n\n    </section>\n</article>        </div>\n
    \   </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Backups are dope</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I accidently chown&#x27;d -R an app directory
    and it totally screwed up the database\nfolder. Luckily I zfs replicate my docker
    volumes to another drive even on \" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<script src=\"/theme.js\"></script>\n\n<!-- Meta tags from
    original file -->\n<meta property=\"og:title\" content=\"Pype.dev | Nic Payne\"
    />\n<meta name=\"twitter:title\" content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta property=\"og:image\" name=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\"
    />\n<meta name=\"twitter:image\" name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev\" />\n<meta name=\"twitter:creator\"
    content=\"@pypeaday\">\n<meta name=\"twitter:site\" content=\"@pypeaday\">\n\n\n
    \       <meta property=\"og:author_email\" content=\"nic@pype.dev\" />\n\n        <script>\n
    \           document.addEventListener(\"DOMContentLoaded\", () => {\n                const
    collapsibleElements = document.querySelectorAll('.is-collapsible');\n                collapsibleElements.forEach(el
    => {\n                    const summary = el.querySelector('.admonition-title');\n
    \                   if (summary) {\n                        summary.style.cursor
    = 'pointer';\n                        summary.addEventListener('click', () =>
    {\n                            el.classList.toggle('collapsible-open');\n                        });\n
    \                   }\n                });\n            });\n        </script>\n\n
    \       <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<article style=\"text-align:
    center;\">\n    <style>\n        section {\n            font-size: 200%;\n        }\n\n\n
    \       .edit {\n            display: none;\n        }\n    </style>\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" class=\"text-4xl md:text-5xl
    font-bold text-text-heading mb-4\">Backups are dope</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-05-27\">\n
    \           May 27, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #tech\n            </a>\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/zfs/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #zfs\n            </a>\n
    \           <a href=\"https://pype.dev//tags/til/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #til\n            </a>\n
    \   </div>\n</section></article>\n     </body>\n</html>"
  partial: "<article class=\"w-full\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" class=\"text-4xl md:text-5xl font-bold text-text-heading mb-4\">Backups
    are dope</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2025-05-27\">\n            May 27, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #tech\n            </a>\n            <a href=\"https://pype.dev//tags/homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #homelab\n            </a>\n            <a href=\"https://pype.dev//tags/zfs/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #zfs\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #til\n            </a>\n    </div>\n</section>    <section class=\"article-content
    prose dark:prose-invert lg:prose-xl max-w-none mx-auto mt-8\">\n        <p>I accidently
    chown'd -R an app directory and it totally screwed up the database\nfolder. Luckily
    I zfs replicate my docker volumes to another drive even on the\nsame host, so
    a quick [rsync] from /harbor/encrypted/docker/manyfold to\n/tank/encrypted/docker/manyfold
    got me back up and running since I hadn't\nreplicated the messed up permission
    set yet</p>\n<p>Q: How to link to my rsync like a pro post?</p>\n<p class=\"hover:z-20
    relative\">A: Wikilinks <code>[[rsync-like-a-pro]]</code> <span class=\"z-10 group
    group-hover:z-20 relative inline-block\">\n        <a class=\"wikilink text-green-500
    hover:underline\" href=\"https://pype.dev/rsync-like-a-pro\" title=\"rsync-like-a-pro\"
    hx-boost=\"true\"> rsync-like-a-pro</a>\n        <button class=\"ml-2 text-green-500
    hover:underline focus:outline-none\" aria-label=\"Preview\">\n            <svg
    xmlns=\"https://www.w3.org/2000/svg\" fill=\"none\" viewbox=\"0 0 24 24\" stroke-width=\"1.5\"
    stroke=\"currentColor\" class=\"h-5 w-5 inline align-middle\">\n                <path
    stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m2.25 15.75 5.159-5.159a2.25
    2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909
    2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5
    0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375
    0 1 1-.75 0 .375.375 0 0 1 .75 0Z\"></path>\n            </svg>\n        </button>\n
    \       <a href=\"https://pype.dev/rsync-like-a-pro\" class=\"hidden absolute
    top-6 left-0 z-20 group-hover:block \">\n            <img alt=\"a screenshot of
    https://pype.dev/rsync-like-a-pro\" class=\"rounded-xl transition-height ease-in
    duration-75 h-0 opacity-0 group-hover:opacity-100 group-hover:h-[800px] max-w-none
    \" height=\"800\" width=\"600\" style=\" box-shadow: rgba(0, 0, 0, 0.6) 0 0 500rem
    500rem; \" src=\"https://shots.wayl.one/shot/?url=https://pype.dev/rsync-like-a-pro&amp;height=1600&amp;width=1200&amp;scaled_width=600&amp;scaled_height=800&amp;selectors=\">\n
    \       </a>\n    </span>\n</p>\n\n    </section>\n</article>"
  raw.md: "---\ndate: 2025-05-27 19:42:27\ntemplateKey: til\ntitle: Backups are dope\npublished:
    True\ntags:\n  - tech\n  - homelab\n  - zfs\n  - til\n\n---\n\nI accidently chown'd
    -R an app directory and it totally screwed up the database\nfolder. Luckily I
    zfs replicate my docker volumes to another drive even on the\nsame host, so a
    quick [rsync] from /harbor/encrypted/docker/manyfold to\n/tank/encrypted/docker/manyfold
    got me back up and running since I hadn't\nreplicated the messed up permission
    set yet\n\nQ: How to link to my rsync like a pro post?\n\nA: Wikilinks `[[rsync-like-a-pro]]`
    [[rsync-like-a-pro]]\n"
published: true
slug: backups-are-dope
title: Backups are dope


---

I accidently chown'd -R an app directory and it totally screwed up the database
folder. Luckily I zfs replicate my docker volumes to another drive even on the
same host, so a quick [rsync] from /harbor/encrypted/docker/manyfold to
/tank/encrypted/docker/manyfold got me back up and running since I hadn't
replicated the messed up permission set yet

Q: How to link to my rsync like a pro post?

A: Wikilinks `[[rsync-like-a-pro]]` [[rsync-like-a-pro]]