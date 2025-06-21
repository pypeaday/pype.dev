---
content: "<a href=\"https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/\">\n
  \   <img\n        src=\"https://shots.wayl.one/shot/?url=https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/&height=450&width=800&scaled_width=800&scaled_height=450&selectors=\"\"\n
  \       alt=\"shot of post - \U0001F4AD Exploiting Copilot AI for SharePoint | Pen
  Test Partners\"\n        height=450\n        width=800\n    >\n</a>\n\nHere's my
  thought on <a href=\"https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/\">\U0001F4AD
  Exploiting Copilot AI for SharePoint | Pen Test Partners</a>\n\n---\n\nIn hindsight
  this vulnerability isn't even that clever, hopefully the share holders of the companies
  that rushed to throw AI into everything will make it out ok\n\n---\n\n!!! note\n
  \    This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com).
  It's a short note that I make about someone else's\n     content online.  Learn
  more about the process [[ thoughts ]]\n\n\n---\n\n['security', 'infosec', 'sharepoint',
  'microsoft', 'ai', 'copilot', 'thoughts']"
date: 2025-06-13
description: In hindsight this vulnerability isn't even that clever, hopefully the
  share holders of the companies that rushed to thro
html:
  index: "<html lang=\"en\">\n    <head>\n<title>\U0001F4AD Exploiting Copilot AI
    for SharePoint | Pen Test Partners</title>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\">\n<meta name=\"description\" content=\"In
    hindsight this vulnerability isn't even that clever, hopefully the share holders
    of the companies that rushed to thro\">\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\">\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&amp;display=swap\"
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
    class=\"text-4xl md:text-5xl font-bold text-text-heading mb-4\">\U0001F4AD Exploiting
    Copilot AI for SharePoint | Pen Test Partners</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-06-13\">\n            June
    13, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/security/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #security\n
    \           </a>\n            <a href=\"https://pype.dev//tags/infosec/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #infosec\n
    \           </a>\n            <a href=\"https://pype.dev//tags/sharepoint/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #sharepoint\n
    \           </a>\n            <a href=\"https://pype.dev//tags/microsoft/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #microsoft\n
    \           </a>\n            <a href=\"https://pype.dev//tags/ai/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #ai\n            </a>\n
    \           <a href=\"https://pype.dev//tags/copilot/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #copilot\n
    \           </a>\n            <a href=\"https://pype.dev//tags/thoughts/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #thoughts\n
    \           </a>\n    </div>\n</section>    <section class=\"article-content prose
    dark:prose-invert lg:prose-xl max-w-none mx-auto mt-8\">\n        <a href=\"https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/\">\n
    \   <img src=\"https://shots.wayl.one/shot/?url=https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/&amp;height=450&amp;width=800&amp;scaled_width=800&amp;scaled_height=450&amp;selectors=\"
    alt=\"shot of post - \U0001F4AD Exploiting Copilot AI for SharePoint | Pen Test
    Partners\" height=\"450\" width=\"800\">\n</a>\n<p>Here's my thought on <a href=\"https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/\">\U0001F4AD
    Exploiting Copilot AI for SharePoint | Pen Test Partners</a></p>\n<hr>\n<p>In
    hindsight this vulnerability isn't even that clever, hopefully the share holders
    of the companies that rushed to throw AI into everything will make it out ok</p>\n<hr>\n<div
    class=\"admonition note hover:z-20 hover:z-20\">\n<p class=\"admonition-title\">Note</p>\n<p
    class=\"hover:z-20 relative hover:z-20 relative\">This is one of <span class=\"z-10
    group group-hover:z-20 relative inline-block\">\n        <a class=\"wikilink text-green-500
    hover:underline\" href=\"https://pype.dev/my-thoughts\" title=\"my-thoughts\"
    hx-boost=\"true\"> my-thoughts</a>\n        <button class=\"ml-2 text-green-500
    hover:underline focus:outline-none\" aria-label=\"Preview\">\n            <svg
    xmlns=\"https://www.w3.org/2000/svg\" fill=\"none\" viewbox=\"0 0 24 24\" stroke-width=\"1.5\"
    stroke=\"currentColor\" class=\"h-5 w-5 inline align-middle\">\n                <path
    stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m2.25 15.75 5.159-5.159a2.25
    2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909
    2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5
    0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375
    0 1 1-.75 0 .375.375 0 0 1 .75 0Z\"></path>\n            </svg>\n        </button>\n
    \       <a href=\"https://pype.dev/my-thoughts\" class=\"hidden absolute top-6
    left-0 z-20 group-hover:block \">\n            <img alt=\"a screenshot of https://pype.dev/my-thoughts\"
    class=\"rounded-xl transition-height ease-in duration-75 h-0 opacity-0 group-hover:opacity-100
    group-hover:h-[800px] max-w-none \" height=\"800\" width=\"600\" style=\" box-shadow:
    rgba(0, 0, 0, 0.6) 0 0 500rem 500rem; \" src=\"https://shots.wayl.one/shot/?url=https://pype.dev/my-thoughts&amp;height=1600&amp;width=1200&amp;scaled_width=600&amp;scaled_height=800&amp;selectors=\">\n
    \       </a>\n    </span>. I picked this up from <a href=\"https://waylonwalker.com\">Waylon
    Walker</a>(<a href=\"https://thoughts.waylonwalker.com\">https://thoughts.waylonwalker.com</a>).
    It's a short note that I make about someone else's\ncontent online.  Learn more
    about the process <span class=\"z-10 group group-hover:z-20 relative inline-block\">\n
    \       <a class=\"wikilink text-green-500 hover:underline\" href=\"https://pype.dev/thoughts\"
    title=\"thoughts\" hx-boost=\"true\"> thoughts</a>\n        <button class=\"ml-2
    text-green-500 hover:underline focus:outline-none\" aria-label=\"Preview\">\n
    \           <svg xmlns=\"https://www.w3.org/2000/svg\" fill=\"none\" viewbox=\"0
    0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"h-5 w-5 inline
    align-middle\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\"
    d=\"m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25
    2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0
    0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375
    0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z\"></path>\n            </svg>\n        </button>\n
    \       <a href=\"https://pype.dev/thoughts\" class=\"hidden absolute top-6 left-0
    z-20 group-hover:block \">\n            <img alt=\"a screenshot of https://pype.dev/thoughts\"
    class=\"rounded-xl transition-height ease-in duration-75 h-0 opacity-0 group-hover:opacity-100
    group-hover:h-[800px] max-w-none \" height=\"800\" width=\"600\" style=\" box-shadow:
    rgba(0, 0, 0, 0.6) 0 0 500rem 500rem; \" src=\"https://shots.wayl.one/shot/?url=https://pype.dev/thoughts&amp;height=1600&amp;width=1200&amp;scaled_width=600&amp;scaled_height=800&amp;selectors=\">\n
    \       </a>\n    </span>\n</p>\n</div>\n<hr>\n<p>['security', 'infosec', 'sharepoint',
    'microsoft', 'ai', 'copilot', 'thoughts']</p>\n\n    </section>\n</article>        </div>\n
    \   </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>\U0001F4AD Exploiting
    Copilot AI for SharePoint | Pen Test Partners</title>\n<meta charset=\"UTF-8\"
    />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta
    name=\"description\" content=\"In hindsight this vulnerability isn't even that
    clever, hopefully the share holders of the companies that rushed to thro\" />\n
    <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
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
    font-bold text-text-heading mb-4\">\U0001F4AD Exploiting Copilot AI for SharePoint
    | Pen Test Partners</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2025-06-13\">\n            June 13, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/security/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #security\n            </a>\n            <a href=\"https://pype.dev//tags/infosec/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #infosec\n            </a>\n            <a href=\"https://pype.dev//tags/sharepoint/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #sharepoint\n            </a>\n            <a href=\"https://pype.dev//tags/microsoft/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #microsoft\n            </a>\n            <a href=\"https://pype.dev//tags/ai/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #ai\n            </a>\n            <a href=\"https://pype.dev//tags/copilot/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #copilot\n            </a>\n            <a href=\"https://pype.dev//tags/thoughts/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20\">\n
    \               #thoughts\n            </a>\n    </div>\n</section></article>\n
    \    </body>\n</html>"
  partial: "<article class=\"w-full\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" class=\"text-4xl md:text-5xl font-bold text-text-heading mb-4\">\U0001F4AD
    Exploiting Copilot AI for SharePoint | Pen Test Partners</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-06-13\">\n
    \           June 13, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/security/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #security\n
    \           </a>\n            <a href=\"https://pype.dev//tags/infosec/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #infosec\n
    \           </a>\n            <a href=\"https://pype.dev//tags/sharepoint/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #sharepoint\n
    \           </a>\n            <a href=\"https://pype.dev//tags/microsoft/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #microsoft\n
    \           </a>\n            <a href=\"https://pype.dev//tags/ai/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #ai\n            </a>\n
    \           <a href=\"https://pype.dev//tags/copilot/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #copilot\n
    \           </a>\n            <a href=\"https://pype.dev//tags/thoughts/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20\">\n                #thoughts\n
    \           </a>\n    </div>\n</section>    <section class=\"article-content prose
    dark:prose-invert lg:prose-xl max-w-none mx-auto mt-8\">\n        <a href=\"https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/\">\n
    \   <img src=\"https://shots.wayl.one/shot/?url=https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/&amp;height=450&amp;width=800&amp;scaled_width=800&amp;scaled_height=450&amp;selectors=\"
    alt=\"shot of post - \U0001F4AD Exploiting Copilot AI for SharePoint | Pen Test
    Partners\" height=\"450\" width=\"800\">\n</a>\n<p>Here's my thought on <a href=\"https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/\">\U0001F4AD
    Exploiting Copilot AI for SharePoint | Pen Test Partners</a></p>\n<hr>\n<p>In
    hindsight this vulnerability isn't even that clever, hopefully the share holders
    of the companies that rushed to throw AI into everything will make it out ok</p>\n<hr>\n<div
    class=\"admonition note hover:z-20 hover:z-20\">\n<p class=\"admonition-title\">Note</p>\n<p
    class=\"hover:z-20 relative hover:z-20 relative\">This is one of <span class=\"z-10
    group group-hover:z-20 relative inline-block\">\n        <a class=\"wikilink text-green-500
    hover:underline\" href=\"https://pype.dev/my-thoughts\" title=\"my-thoughts\"
    hx-boost=\"true\"> my-thoughts</a>\n        <button class=\"ml-2 text-green-500
    hover:underline focus:outline-none\" aria-label=\"Preview\">\n            <svg
    xmlns=\"https://www.w3.org/2000/svg\" fill=\"none\" viewbox=\"0 0 24 24\" stroke-width=\"1.5\"
    stroke=\"currentColor\" class=\"h-5 w-5 inline align-middle\">\n                <path
    stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m2.25 15.75 5.159-5.159a2.25
    2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909
    2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5
    0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375
    0 1 1-.75 0 .375.375 0 0 1 .75 0Z\"></path>\n            </svg>\n        </button>\n
    \       <a href=\"https://pype.dev/my-thoughts\" class=\"hidden absolute top-6
    left-0 z-20 group-hover:block \">\n            <img alt=\"a screenshot of https://pype.dev/my-thoughts\"
    class=\"rounded-xl transition-height ease-in duration-75 h-0 opacity-0 group-hover:opacity-100
    group-hover:h-[800px] max-w-none \" height=\"800\" width=\"600\" style=\" box-shadow:
    rgba(0, 0, 0, 0.6) 0 0 500rem 500rem; \" src=\"https://shots.wayl.one/shot/?url=https://pype.dev/my-thoughts&amp;height=1600&amp;width=1200&amp;scaled_width=600&amp;scaled_height=800&amp;selectors=\">\n
    \       </a>\n    </span>. I picked this up from <a href=\"https://waylonwalker.com\">Waylon
    Walker</a>(<a href=\"https://thoughts.waylonwalker.com\">https://thoughts.waylonwalker.com</a>).
    It's a short note that I make about someone else's\ncontent online.  Learn more
    about the process <span class=\"z-10 group group-hover:z-20 relative inline-block\">\n
    \       <a class=\"wikilink text-green-500 hover:underline\" href=\"https://pype.dev/thoughts\"
    title=\"thoughts\" hx-boost=\"true\"> thoughts</a>\n        <button class=\"ml-2
    text-green-500 hover:underline focus:outline-none\" aria-label=\"Preview\">\n
    \           <svg xmlns=\"https://www.w3.org/2000/svg\" fill=\"none\" viewbox=\"0
    0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"h-5 w-5 inline
    align-middle\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\"
    d=\"m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25
    2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0
    0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375
    0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z\"></path>\n            </svg>\n        </button>\n
    \       <a href=\"https://pype.dev/thoughts\" class=\"hidden absolute top-6 left-0
    z-20 group-hover:block \">\n            <img alt=\"a screenshot of https://pype.dev/thoughts\"
    class=\"rounded-xl transition-height ease-in duration-75 h-0 opacity-0 group-hover:opacity-100
    group-hover:h-[800px] max-w-none \" height=\"800\" width=\"600\" style=\" box-shadow:
    rgba(0, 0, 0, 0.6) 0 0 500rem 500rem; \" src=\"https://shots.wayl.one/shot/?url=https://pype.dev/thoughts&amp;height=1600&amp;width=1200&amp;scaled_width=600&amp;scaled_height=800&amp;selectors=\">\n
    \       </a>\n    </span>\n</p>\n</div>\n<hr>\n<p>['security', 'infosec', 'sharepoint',
    'microsoft', 'ai', 'copilot', 'thoughts']</p>\n\n    </section>\n</article>"
  raw.md: "\n<a href=\"https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/\">\n
    \   <img\n        src=\"https://shots.wayl.one/shot/?url=https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/&height=450&width=800&scaled_width=800&scaled_height=450&selectors=\"\"\n
    \       alt=\"shot of post - \U0001F4AD Exploiting Copilot AI for SharePoint |
    Pen Test Partners\"\n        height=450\n        width=800\n    >\n</a>\n\nHere's
    my thought on <a href=\"https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/\">\U0001F4AD
    Exploiting Copilot AI for SharePoint | Pen Test Partners</a>\n\n---\n\nIn hindsight
    this vulnerability isn't even that clever, hopefully the share holders of the
    companies that rushed to throw AI into everything will make it out ok\n\n---\n\n!!!
    note\n     This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com).
    It's a short note that I make about someone else's\n     content online.  Learn
    more about the process [[ thoughts ]]\n\n\n---\n\n['security', 'infosec', 'sharepoint',
    'microsoft', 'ai', 'copilot', 'thoughts']\n        "
published: true
slug: thoughts-689
title: "\U0001F4AD Exploiting Copilot AI for SharePoint | Pen Test Partners"


---

<a href="https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/">
    <img
        src="https://shots.wayl.one/shot/?url=https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/&height=450&width=800&scaled_width=800&scaled_height=450&selectors=""
        alt="shot of post - 💭 Exploiting Copilot AI for SharePoint | Pen Test Partners"
        height=450
        width=800
    >
</a>

Here's my thought on <a href="https://www.pentestpartners.com/security-blog/exploiting-copilot-ai-for-sharepoint/">💭 Exploiting Copilot AI for SharePoint | Pen Test Partners</a>

---

In hindsight this vulnerability isn't even that clever, hopefully the share holders of the companies that rushed to throw AI into everything will make it out ok

---

!!! note
     This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com). It's a short note that I make about someone else's
     content online.  Learn more about the process [[ thoughts ]]


---

['security', 'infosec', 'sharepoint', 'microsoft', 'ai', 'copilot', 'thoughts']