---
content: Bought some DDR4-3600 speed RAM but only seeing 2666? Load up the BIOS, find
  DRAM config or something similar, and make sure to load the XMP profile to get that
  advertised RAM speed!
date: 2022-10-09
description: Bought some DDR4-3600 speed RAM but only seeing 2666? Load up the BIOS,
  find DRAM config or something similar, and make sure to load the XMP profile to
  get that
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Don't forget to
    load XMP!</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Bought some DDR4-3600
    speed RAM but only seeing 2666? Load up the BIOS, find DRAM config or something
    similar, and make sure to load the XMP profile to get that\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Meta tags from original file -->\n<meta
    property=\"og:title\" content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:title\"
    content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta
    property=\"og:image\" name=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\"
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
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class='flex
    flex-row w-full min-h-screen bg-pattern-gradient text-text-main'>\n    <main class=\"flex-grow
    fade-in overflow-visible\">\n        <div class='container flex-grow p-2 sm:p-6
    mx-auto bg-content-blend overflow-visible'>\n<header class='py-4'>\n\n    <nav
    class='flex flex-wrap justify-center sm:justify-start items-center'>\n        <a
    class=\"nav-link accent-glow\"\n            href='/'>Home</a>\n        <a class=\"nav-link
    accent-glow\"\n            href='https://github.com/pypeaday/pype.dev'>GitHub</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='https://mydigitalharbor.com/pypeaday'>DigitalHarbor</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/slash'>Start Here</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/my-thoughts'>My
    Thoughts</a>\n    </nav>\n\n    <!-- <div>\n        <label id=\"theme-switch\"
    class=\"theme-switch\" for=\"checkbox-theme\" title=\"light/dark mode toggle\">\n
    \           <input type=\"checkbox\" id=\"checkbox-theme\" />\n            <div
    class=\"slider round\"></div>\n        </label>\n    </div> -->\n</header><div
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script><style>\n
    \   /* Ultra-aggressive title styling override */\n    #title, h1#title, .post-header
    h1, h1.gradient-text {\n        font-size: 3.75rem !important; /* ~text-7xl */\n
    \       font-weight: 800 !important;\n        line-height: 1.1 !important;\n        letter-spacing:
    -0.025em !important;\n    }\n    \n    @media (min-width: 768px) {\n        #title,
    h1#title, .post-header h1, h1.gradient-text {\n            font-size: 4.5rem !important;
    /* Even larger than text-7xl */\n        }\n    }\n    \n    /* Floating cover
    image above article */\n    .cover-floating-container {\n        position: relative;\n
    \       width: 100%;\n        margin: 2.5rem auto 0; /* Space from search bar
    */\n        z-index: 20;\n    }\n    \n    /* True boundary-breaking cover image
    */\n    .boundary-break-container {\n        position: relative;\n        width:
    calc(100% + 3rem); /* Extend 1.5rem on each side beyond article */\n        left:
    -1.5rem; /* Pull left edge 1.5rem beyond container */\n        height: 380px;
    /* Reduced from 450px for smaller image */\n        overflow: visible;\n        z-index:
    20;\n    }\n    \n    /* Glow effect that extends beyond image */\n    .boundary-break-glow
    {\n        position: absolute;\n        top: -2rem;\n        left: -2rem;\n        right:
    -2rem;\n        bottom: -1rem;\n        background: linear-gradient(45deg, \n
    \           rgba(211, 124, 95, 0.7),  /* accent-warm */\n            rgba(96,
    138, 159, 0.7),  /* accent-cool */\n            rgba(106, 138, 130, 0.7)  /* accent-green
    */\n        );\n        filter: blur(2.5rem);\n        border-radius: 1rem;\n
    \       opacity: 0.8;\n        z-index: 10;\n        animation: boundary-break-pulse
    4s infinite alternate;\n    }\n    \n    @keyframes boundary-break-pulse {\n        0%
    { opacity: 0.7; filter: blur(2rem); }\n        100% { opacity: 0.9; filter: blur(3rem);
    }\n    }\n    \n    /* Image styling */\n    .boundary-break-image {\n        position:
    relative;\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n
    \       border-radius: 0.75rem;\n        border: 0.5rem solid white;\n        box-shadow:
    0 2rem 4rem -1rem rgba(0,0,0,0.8), 0 0 2.5rem 0.25rem rgba(0,0,0,0.5);\n        transform:
    scale(1.05);\n        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44,
    1),\n                    box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n
    \       z-index: 20;\n    }\n    \n    /* Hover effect */\n    .boundary-break-image:hover
    {\n        transform: scale(1.08) translateY(-0.5rem);\n        box-shadow: 0
    2.5rem 4.5rem -1rem rgba(0,0,0,0.85), 0 0 3rem 0.25rem rgba(0,0,0,0.6);\n    }\n
    \   \n    /* Article container styling */\n    .post-container {\n        margin-top:
    -3.5rem; /* Reduced overlap for breathing room */\n        padding-top: 5rem;
    /* Adjusted padding to maintain proper spacing */\n        position: relative;\n
    \       z-index: 10;\n    }\n    \n    /* Responsive adjustments */\n    @media
    (max-width: 768px) {\n        .boundary-break-container {\n            width:
    calc(100% + 2rem);\n            left: -1rem;\n            height: auto; /* Auto
    height to prevent cropping */\n            max-height: 350px; /* Maximum height
    constraint */\n        }\n        \n        .boundary-break-glow {\n            top:
    -1.5rem;\n            left: -1.5rem;\n            right: -1.5rem;\n            bottom:
    -0.75rem;\n        }\n        \n        .boundary-break-image {\n            height:
    auto; /* Let height be determined by aspect ratio */\n            max-height:
    350px;\n            object-fit: contain; /* Show entire image without cropping
    */\n            transform: scale(1.02); /* Slightly reduced scale for mobile */\n
    \       }\n        \n        .post-container {\n            margin-top: -5rem;\n
    \           padding-top: 6rem;\n        }\n    }\n    \n    /* Small mobile devices
    */\n    @media (max-width: 480px) {\n        .boundary-break-container {\n            height:
    auto;\n            max-height: 280px;\n        }\n        \n        .boundary-break-image
    {\n            max-height: 280px;\n            border-width: 0.25rem;\n        }\n
    \   }\n</style>\n\n\n<article class='w-full pattern-card glow-card p-4 md:p-6
    post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size:
    4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold
    gradient-text mb-4 post-title-large\">Don't forget to load XMP!</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-10-09\">\n
    \           October 09, 2022\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>    <section class=\"article-content prose
    dark:prose-invert lg:prose-xl mx-auto mt-8\">\n        <p>Bought some DDR4-3600
    speed RAM but only seeing 2666? Load up the BIOS, find DRAM config or something
    similar, and make sure to load the XMP profile to get that advertised RAM speed!</p>\n\n
    \   </section>\n</article>        </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Don't forget to load
    XMP!</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Bought some DDR4-3600
    speed RAM but only seeing 2666? Load up the BIOS, find DRAM config or something
    similar, and make sure to load the XMP profile to get that\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Meta tags from original file -->\n<meta
    property=\"og:title\" content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:title\"
    content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta
    property=\"og:image\" name=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\"
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
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Don't forget to load XMP!</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-10-09\">\n
    \           October 09, 2022\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<style>\n    /* Ultra-aggressive title styling override */\n    #title,
    h1#title, .post-header h1, h1.gradient-text {\n        font-size: 3.75rem !important;
    /* ~text-7xl */\n        font-weight: 800 !important;\n        line-height: 1.1
    !important;\n        letter-spacing: -0.025em !important;\n    }\n    \n    @media
    (min-width: 768px) {\n        #title, h1#title, .post-header h1, h1.gradient-text
    {\n            font-size: 4.5rem !important; /* Even larger than text-7xl */\n
    \       }\n    }\n    \n    /* Floating cover image above article */\n    .cover-floating-container
    {\n        position: relative;\n        width: 100%;\n        margin: 2.5rem auto
    0; /* Space from search bar */\n        z-index: 20;\n    }\n    \n    /* True
    boundary-breaking cover image */\n    .boundary-break-container {\n        position:
    relative;\n        width: calc(100% + 3rem); /* Extend 1.5rem on each side beyond
    article */\n        left: -1.5rem; /* Pull left edge 1.5rem beyond container */\n
    \       height: 380px; /* Reduced from 450px for smaller image */\n        overflow:
    visible;\n        z-index: 20;\n    }\n    \n    /* Glow effect that extends beyond
    image */\n    .boundary-break-glow {\n        position: absolute;\n        top:
    -2rem;\n        left: -2rem;\n        right: -2rem;\n        bottom: -1rem;\n
    \       background: linear-gradient(45deg, \n            rgba(211, 124, 95, 0.7),
    \ /* accent-warm */\n            rgba(96, 138, 159, 0.7),  /* accent-cool */\n
    \           rgba(106, 138, 130, 0.7)  /* accent-green */\n        );\n        filter:
    blur(2.5rem);\n        border-radius: 1rem;\n        opacity: 0.8;\n        z-index:
    10;\n        animation: boundary-break-pulse 4s infinite alternate;\n    }\n    \n
    \   @keyframes boundary-break-pulse {\n        0% { opacity: 0.7; filter: blur(2rem);
    }\n        100% { opacity: 0.9; filter: blur(3rem); }\n    }\n    \n    /* Image
    styling */\n    .boundary-break-image {\n        position: relative;\n        width:
    100%;\n        height: 100%;\n        object-fit: cover;\n        border-radius:
    0.75rem;\n        border: 0.5rem solid white;\n        box-shadow: 0 2rem 4rem
    -1rem rgba(0,0,0,0.8), 0 0 2.5rem 0.25rem rgba(0,0,0,0.5);\n        transform:
    scale(1.05);\n        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44,
    1),\n                    box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n
    \       z-index: 20;\n    }\n    \n    /* Hover effect */\n    .boundary-break-image:hover
    {\n        transform: scale(1.08) translateY(-0.5rem);\n        box-shadow: 0
    2.5rem 4.5rem -1rem rgba(0,0,0,0.85), 0 0 3rem 0.25rem rgba(0,0,0,0.6);\n    }\n
    \   \n    /* Article container styling */\n    .post-container {\n        margin-top:
    -3.5rem; /* Reduced overlap for breathing room */\n        padding-top: 5rem;
    /* Adjusted padding to maintain proper spacing */\n        position: relative;\n
    \       z-index: 10;\n    }\n    \n    /* Responsive adjustments */\n    @media
    (max-width: 768px) {\n        .boundary-break-container {\n            width:
    calc(100% + 2rem);\n            left: -1rem;\n            height: auto; /* Auto
    height to prevent cropping */\n            max-height: 350px; /* Maximum height
    constraint */\n        }\n        \n        .boundary-break-glow {\n            top:
    -1.5rem;\n            left: -1.5rem;\n            right: -1.5rem;\n            bottom:
    -0.75rem;\n        }\n        \n        .boundary-break-image {\n            height:
    auto; /* Let height be determined by aspect ratio */\n            max-height:
    350px;\n            object-fit: contain; /* Show entire image without cropping
    */\n            transform: scale(1.02); /* Slightly reduced scale for mobile */\n
    \       }\n        \n        .post-container {\n            margin-top: -5rem;\n
    \           padding-top: 6rem;\n        }\n    }\n    \n    /* Small mobile devices
    */\n    @media (max-width: 480px) {\n        .boundary-break-container {\n            height:
    auto;\n            max-height: 280px;\n        }\n        \n        .boundary-break-image
    {\n            max-height: 280px;\n            border-width: 0.25rem;\n        }\n
    \   }\n</style>\n\n\n<article class='w-full pattern-card glow-card p-4 md:p-6
    post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size:
    4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold
    gradient-text mb-4 post-title-large\">Don't forget to load XMP!</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-10-09\">\n
    \           October 09, 2022\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>    <section class=\"article-content prose
    dark:prose-invert lg:prose-xl mx-auto mt-8\">\n        <p>Bought some DDR4-3600
    speed RAM but only seeing 2666? Load up the BIOS, find DRAM config or something
    similar, and make sure to load the XMP profile to get that advertised RAM speed!</p>\n\n
    \   </section>\n</article>"
  raw.md: "---\ndate: 2022-10-09 07:17:43\ntemplateKey: til\ntitle: Don't forget to
    load XMP!\npublished: True\ntags:\n  - homelab\n  - linux\n  - tech\n  - til\n\n---\n\nBought
    some DDR4-3600 speed RAM but only seeing 2666? Load up the BIOS, find DRAM config
    or something similar, and make sure to load the XMP profile to get that advertised
    RAM speed!\n"
published: true
slug: dont-forget-to-load-xmp
title: Don't forget to load XMP!


---

Bought some DDR4-3600 speed RAM but only seeing 2666? Load up the BIOS, find DRAM config or something similar, and make sure to load the XMP profile to get that advertised RAM speed!