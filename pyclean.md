---
content: "I like to keep my workspace clean and one thing that I don't personally
  love looking at is the `__pycache__` directory that pops up after running some code.\nThe
  `*.pyc` files that show up there are python bytecode and they are cached to make
  subsequent runs a tad faster. \nMy stuff never really needs this bonus speed boost
  and so I came across a neat tool called `pyclean`!\n\n## Pyclean\n\nThe easiest
  way (**in my opinion**) to run `pyclean` is to just use `pipx run`.\n\n```bash\nsandbox/src
  \ \U0001F331 main \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F  \xD72via \U0001F40D v3.8.11
  (sandbox)  took 9s\n\u276F ls\nabcmeta.py  __pycache__  python-print-align.py  system-monitor-psutils.py\n\nsandbox/src
  \ \U0001F331 main \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F  \xD72via \U0001F40D v3.8.11
  (sandbox)\n\u276F pipx run pyclean .\n\u26A0\uFE0F  pyclean is already on your PATH
  and installed at /usr/bin/pyclean. Downloading and running anyway.\nCleaning directory
  .\nTotal 1 files, 1 directories removed.\n\nsandbox/src  \U0001F331 main \U0001F5D1\uFE0F
  \ \xD73\U0001F6E4\uFE0F  \xD72via \U0001F40D v3.8.11 (sandbox)\n\u276F ls\nabcmeta.py
  \ python-print-align.py  system-monitor-psutils.py\n\n```\n\n## Why not bash?\n\nYou
  could accomplish something similar with `rm **/*.pyc` or `find -n '*.py?' -delete`
  but there's a chance you'll find something you don't love gone.\nAlso this won't
  help our poor Windows friends out there!\n`pyclean` is fully python so it's OS independent.\n\n##
  Credits!\n\n[repo](https://github.com/bittner/pyclean)"
date: 2022-03-22
description: I like to keep my workspace clean and one thing that I don&#x27;t personally
  love looking at is the `__pycache__` directory that pops up after running some code
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Pyclean</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I like to keep my workspace clean and
    one thing that I don&#x27;t personally love looking at is the `__pycache__` directory
    that pops up after running some code\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Pyclean | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://pype.dev//media/pyclean.png\" />\n<meta property=\"og:url\"
    content=\"https://pype.dev/pyclean\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta
    name=\"twitter:title\" content=\"Pyclean | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I like to keep my workspace clean and one thing that I don&#x27;t personally
    love looking at is the `__pycache__` directory that pops up after running some
    code\" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/pyclean.png\"
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
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class='flex
    flex-row w-full min-h-screen bg-pattern-gradient text-text-main'>\n    <main class=\"flex-grow
    fade-in overflow-visible\">\n        <div class='container flex-grow p-2 sm:p-6
    mx-auto bg-content-blend overflow-visible'>\n<header class=\"site-terminal\">\n\n
    \   <div class=\"site-terminal__bar\">\n        <div class=\"site-terminal__lights\"
    aria-hidden=\"true\"><span></span><span></span><span></span></div>\n        <div
    class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/pyclean</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script><style>\n
    \   /* Ultra-aggressive title styling override */\n    #title, h1#title, .post-header
    h1, h1.gradient-text {\n        font-size: 3.75rem !important; /* ~text-7xl */\n
    \       font-weight: 800 !important;\n        line-height: 1.1 !important;\n        letter-spacing:
    -0.025em !important;\n    }\n    \n    @media (min-width: 768px) {\n        #title,
    h1#title, .post-header h1, h1.gradient-text {\n            font-size: 4.5rem !important;
    /* Even larger than text-7xl */\n        }\n    }\n    \n    /* Mobile-first responsive
    typography for article content */\n    .article-content.prose {\n        font-size:
    1.125rem !important; /* 18px - larger than default 16px */\n        line-height:
    1.7 !important;\n    }\n    \n    .article-content.prose p {\n        font-size:
    1.125rem !important; /* 18px */\n        line-height: 1.7 !important;\n    }\n
    \   \n    /* Tablet and up */\n    @media (min-width: 768px) {\n        .article-content.prose
    {\n            font-size: 1.25rem !important; /* 20px */\n            line-height:
    1.8 !important;\n        }\n        \n        .article-content.prose p {\n            font-size:
    1.25rem !important; /* 20px */\n            line-height: 1.8 !important;\n        }\n
    \   }\n    \n    /* Desktop */\n    @media (min-width: 1024px) {\n        .article-content.prose
    {\n            font-size: 1.375rem !important; /* 22px */\n            line-height:
    1.8 !important;\n        }\n        \n        .article-content.prose p {\n            font-size:
    1.375rem !important; /* 22px */\n            line-height: 1.8 !important;\n        }\n
    \   }\n    \n    /* Floating cover image above article */\n    .cover-floating-container
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
    \   }\n</style>\n\n<div class=\"cover-floating-container\">\n    <div class=\"boundary-break-container\">\n
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"/media/pyclean.png\"
    \n            alt=\"Pyclean cover image\" \n            class=\"boundary-break-image\"\n
    \       >\n    </div>\n</div>\n\n<article class='w-full pattern-card glow-card
    p-4 md:p-6 post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Pyclean</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-03-22\">\n            March 22, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #python\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section>
    \   <section class=\"article-content prose dark:prose-invert mx-auto mt-8\">\n
    \       <p>I like to keep my workspace clean and one thing that I don't personally
    love looking at is the <code>__pycache__</code> directory that pops up after running
    some code.\nThe <code>*.pyc</code> files that show up there are python bytecode
    and they are cached to make subsequent runs a tad faster.\nMy stuff never really
    needs this bonus speed boost and so I came across a neat tool called <code>pyclean</code>!</p>\n<h2
    id=\"pyclean\">Pyclean <a class=\"header-anchor\" href=\"#pyclean\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The easiest way (<strong>in
    my opinion</strong>) to run <code>pyclean</code> is to just use <code>pipx run</code>.</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox/src<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD72via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>9s\n\u276F<span class=\"w\"> </span>ls\nabcmeta.py<span
    class=\"w\">  </span>__pycache__<span class=\"w\">  </span>python-print-align.py<span
    class=\"w\">  </span>system-monitor-psutils.py\n\nsandbox/src<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD72via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>pipx<span class=\"w\"> </span>run<span class=\"w\"> </span>pyclean<span
    class=\"w\"> </span>.\n\u26A0\uFE0F<span class=\"w\">  </span>pyclean<span class=\"w\">
    </span>is<span class=\"w\"> </span>already<span class=\"w\"> </span>on<span class=\"w\">
    </span>your<span class=\"w\"> </span>PATH<span class=\"w\"> </span>and<span class=\"w\">
    </span>installed<span class=\"w\"> </span>at<span class=\"w\"> </span>/usr/bin/pyclean.<span
    class=\"w\"> </span>Downloading<span class=\"w\"> </span>and<span class=\"w\">
    </span>running<span class=\"w\"> </span>anyway.\nCleaning<span class=\"w\"> </span>directory<span
    class=\"w\"> </span>.\nTotal<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>files,<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>directories<span class=\"w\"> </span>removed.\n\nsandbox/src<span
    class=\"w\">  </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\">
    </span>\U0001F5D1\uFE0F<span class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">
    \ </span>\xD72via<span class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span
    class=\"w\"> </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>ls\nabcmeta.py<span class=\"w\">  </span>python-print-align.py<span
    class=\"w\">  </span>system-monitor-psutils.py\n</pre></div>\n\n</pre>\n\n<h2
    id=\"why-not-bash\">Why not bash? <a class=\"header-anchor\" href=\"#why-not-bash\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>You could accomplish
    something similar with <code>rm **/*.pyc</code> or <code>find -n '*.py?' -delete</code>
    but there's a chance you'll find something you don't love gone.\nAlso this won't
    help our poor Windows friends out there!\n<code>pyclean</code> is fully python
    so it's OS independent.</p>\n<h2 id=\"credits\">Credits! <a class=\"header-anchor\"
    href=\"#credits\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a href=\"https://github.com/bittner/pyclean\">repo</a></p>\n\n
    \   </section>\n</article>        </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Pyclean</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I like to keep my workspace clean and
    one thing that I don&#x27;t personally love looking at is the `__pycache__` directory
    that pops up after running some code\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Pyclean | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://pype.dev//media/pyclean.png\" />\n<meta property=\"og:url\"
    content=\"https://pype.dev/pyclean\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta
    name=\"twitter:title\" content=\"Pyclean | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I like to keep my workspace clean and one thing that I don&#x27;t personally
    love looking at is the `__pycache__` directory that pops up after running some
    code\" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/pyclean.png\"
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
    mb-4 post-title-large\">Pyclean</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-22\">\n            March
    22, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
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
    \       }\n    }\n    \n    /* Mobile-first responsive typography for article
    content */\n    .article-content.prose {\n        font-size: 1.125rem !important;
    /* 18px - larger than default 16px */\n        line-height: 1.7 !important;\n
    \   }\n    \n    .article-content.prose p {\n        font-size: 1.125rem !important;
    /* 18px */\n        line-height: 1.7 !important;\n    }\n    \n    /* Tablet and
    up */\n    @media (min-width: 768px) {\n        .article-content.prose {\n            font-size:
    1.25rem !important; /* 20px */\n            line-height: 1.8 !important;\n        }\n
    \       \n        .article-content.prose p {\n            font-size: 1.25rem !important;
    /* 20px */\n            line-height: 1.8 !important;\n        }\n    }\n    \n
    \   /* Desktop */\n    @media (min-width: 1024px) {\n        .article-content.prose
    {\n            font-size: 1.375rem !important; /* 22px */\n            line-height:
    1.8 !important;\n        }\n        \n        .article-content.prose p {\n            font-size:
    1.375rem !important; /* 22px */\n            line-height: 1.8 !important;\n        }\n
    \   }\n    \n    /* Floating cover image above article */\n    .cover-floating-container
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
    \   }\n</style>\n\n<div class=\"cover-floating-container\">\n    <div class=\"boundary-break-container\">\n
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"/media/pyclean.png\"
    \n            alt=\"Pyclean cover image\" \n            class=\"boundary-break-image\"\n
    \       >\n    </div>\n</div>\n\n<article class='w-full pattern-card glow-card
    p-4 md:p-6 post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Pyclean</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-03-22\">\n            March 22, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #python\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section>
    \   <section class=\"article-content prose dark:prose-invert mx-auto mt-8\">\n
    \       <p>I like to keep my workspace clean and one thing that I don't personally
    love looking at is the <code>__pycache__</code> directory that pops up after running
    some code.\nThe <code>*.pyc</code> files that show up there are python bytecode
    and they are cached to make subsequent runs a tad faster.\nMy stuff never really
    needs this bonus speed boost and so I came across a neat tool called <code>pyclean</code>!</p>\n<h2
    id=\"pyclean\">Pyclean <a class=\"header-anchor\" href=\"#pyclean\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The easiest way (<strong>in
    my opinion</strong>) to run <code>pyclean</code> is to just use <code>pipx run</code>.</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox/src<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD72via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>9s\n\u276F<span class=\"w\"> </span>ls\nabcmeta.py<span
    class=\"w\">  </span>__pycache__<span class=\"w\">  </span>python-print-align.py<span
    class=\"w\">  </span>system-monitor-psutils.py\n\nsandbox/src<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD72via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>pipx<span class=\"w\"> </span>run<span class=\"w\"> </span>pyclean<span
    class=\"w\"> </span>.\n\u26A0\uFE0F<span class=\"w\">  </span>pyclean<span class=\"w\">
    </span>is<span class=\"w\"> </span>already<span class=\"w\"> </span>on<span class=\"w\">
    </span>your<span class=\"w\"> </span>PATH<span class=\"w\"> </span>and<span class=\"w\">
    </span>installed<span class=\"w\"> </span>at<span class=\"w\"> </span>/usr/bin/pyclean.<span
    class=\"w\"> </span>Downloading<span class=\"w\"> </span>and<span class=\"w\">
    </span>running<span class=\"w\"> </span>anyway.\nCleaning<span class=\"w\"> </span>directory<span
    class=\"w\"> </span>.\nTotal<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>files,<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>directories<span class=\"w\"> </span>removed.\n\nsandbox/src<span
    class=\"w\">  </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\">
    </span>\U0001F5D1\uFE0F<span class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">
    \ </span>\xD72via<span class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span
    class=\"w\"> </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>ls\nabcmeta.py<span class=\"w\">  </span>python-print-align.py<span
    class=\"w\">  </span>system-monitor-psutils.py\n</pre></div>\n\n</pre>\n\n<h2
    id=\"why-not-bash\">Why not bash? <a class=\"header-anchor\" href=\"#why-not-bash\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>You could accomplish
    something similar with <code>rm **/*.pyc</code> or <code>find -n '*.py?' -delete</code>
    but there's a chance you'll find something you don't love gone.\nAlso this won't
    help our poor Windows friends out there!\n<code>pyclean</code> is fully python
    so it's OS independent.</p>\n<h2 id=\"credits\">Credits! <a class=\"header-anchor\"
    href=\"#credits\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a href=\"https://github.com/bittner/pyclean\">repo</a></p>\n\n
    \   </section>\n</article>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Pyclean</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I like to keep my workspace clean and
    one thing that I don&#x27;t personally love looking at is the `__pycache__` directory
    that pops up after running some code\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Pyclean | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://pype.dev//media/pyclean.png\" />\n<meta property=\"og:url\"
    content=\"https://pype.dev/pyclean\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta
    name=\"twitter:title\" content=\"Pyclean | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I like to keep my workspace clean and one thing that I don&#x27;t personally
    love looking at is the `__pycache__` directory that pops up after running some
    code\" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/pyclean.png\"
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
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class='flex
    flex-row w-full min-h-screen bg-pattern-gradient text-text-main'>\n    <main class=\"flex-grow
    fade-in overflow-visible\">\n        <div class='container flex-grow p-2 sm:p-6
    mx-auto bg-content-blend overflow-visible'>\n<header class=\"site-terminal\">\n\n
    \   <div class=\"site-terminal__bar\">\n        <div class=\"site-terminal__lights\"
    aria-hidden=\"true\"><span></span><span></span><span></span></div>\n        <div
    class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/pyclean</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    Content is handled by the password protection plugin -->\n    <p>I like to keep
    my workspace clean and one thing that I don't personally love looking at is the
    <code>__pycache__</code> directory that pops up after running some code.\nThe
    <code>*.pyc</code> files that show up there are python bytecode and they are cached
    to make subsequent runs a tad faster.\nMy stuff never really needs this bonus
    speed boost and so I came across a neat tool called <code>pyclean</code>!</p>\n<h2
    id=\"pyclean\">Pyclean <a class=\"header-anchor\" href=\"#pyclean\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The easiest way (<strong>in
    my opinion</strong>) to run <code>pyclean</code> is to just use <code>pipx run</code>.</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox/src<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD72via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>9s\n\u276F<span class=\"w\"> </span>ls\nabcmeta.py<span
    class=\"w\">  </span>__pycache__<span class=\"w\">  </span>python-print-align.py<span
    class=\"w\">  </span>system-monitor-psutils.py\n\nsandbox/src<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD72via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>pipx<span class=\"w\"> </span>run<span class=\"w\"> </span>pyclean<span
    class=\"w\"> </span>.\n\u26A0\uFE0F<span class=\"w\">  </span>pyclean<span class=\"w\">
    </span>is<span class=\"w\"> </span>already<span class=\"w\"> </span>on<span class=\"w\">
    </span>your<span class=\"w\"> </span>PATH<span class=\"w\"> </span>and<span class=\"w\">
    </span>installed<span class=\"w\"> </span>at<span class=\"w\"> </span>/usr/bin/pyclean.<span
    class=\"w\"> </span>Downloading<span class=\"w\"> </span>and<span class=\"w\">
    </span>running<span class=\"w\"> </span>anyway.\nCleaning<span class=\"w\"> </span>directory<span
    class=\"w\"> </span>.\nTotal<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>files,<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>directories<span class=\"w\"> </span>removed.\n\nsandbox/src<span
    class=\"w\">  </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\">
    </span>\U0001F5D1\uFE0F<span class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">
    \ </span>\xD72via<span class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span
    class=\"w\"> </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>ls\nabcmeta.py<span class=\"w\">  </span>python-print-align.py<span
    class=\"w\">  </span>system-monitor-psutils.py\n</pre></div>\n\n</pre>\n\n<h2
    id=\"why-not-bash\">Why not bash? <a class=\"header-anchor\" href=\"#why-not-bash\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>You could accomplish
    something similar with <code>rm **/*.pyc</code> or <code>find -n '*.py?' -delete</code>
    but there's a chance you'll find something you don't love gone.\nAlso this won't
    help our poor Windows friends out there!\n<code>pyclean</code> is fully python
    so it's OS independent.</p>\n<h2 id=\"credits\">Credits! <a class=\"header-anchor\"
    href=\"#credits\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a href=\"https://github.com/bittner/pyclean\">repo</a></p>\n\n
    \       </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  raw.md: "---\ntemplateKey: til\ntags: ['python', 'tech', 'til']\ntitle: Pyclean\ndate:
    2022-03-22T00:00:00\npublished: True\ncover: \"media/pyclean.png\"\n\n---\n\nI
    like to keep my workspace clean and one thing that I don't personally love looking
    at is the `__pycache__` directory that pops up after running some code.\nThe `*.pyc`
    files that show up there are python bytecode and they are cached to make subsequent
    runs a tad faster. \nMy stuff never really needs this bonus speed boost and so
    I came across a neat tool called `pyclean`!\n\n## Pyclean\n\nThe easiest way (**in
    my opinion**) to run `pyclean` is to just use `pipx run`.\n\n```bash\nsandbox/src
    \ \U0001F331 main \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F  \xD72via \U0001F40D
    v3.8.11 (sandbox)  took 9s\n\u276F ls\nabcmeta.py  __pycache__  python-print-align.py
    \ system-monitor-psutils.py\n\nsandbox/src  \U0001F331 main \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F
    \ \xD72via \U0001F40D v3.8.11 (sandbox)\n\u276F pipx run pyclean .\n\u26A0\uFE0F
    \ pyclean is already on your PATH and installed at /usr/bin/pyclean. Downloading
    and running anyway.\nCleaning directory .\nTotal 1 files, 1 directories removed.\n\nsandbox/src
    \ \U0001F331 main \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F  \xD72via \U0001F40D
    v3.8.11 (sandbox)\n\u276F ls\nabcmeta.py  python-print-align.py  system-monitor-psutils.py\n\n```\n\n##
    Why not bash?\n\nYou could accomplish something similar with `rm **/*.pyc` or
    `find -n '*.py?' -delete` but there's a chance you'll find something you don't
    love gone.\nAlso this won't help our poor Windows friends out there!\n`pyclean`
    is fully python so it's OS independent.\n\n## Credits!\n\n[repo](https://github.com/bittner/pyclean)\n"
published: true
slug: pyclean
title: Pyclean


---

I like to keep my workspace clean and one thing that I don't personally love looking at is the `__pycache__` directory that pops up after running some code.
The `*.pyc` files that show up there are python bytecode and they are cached to make subsequent runs a tad faster. 
My stuff never really needs this bonus speed boost and so I came across a neat tool called `pyclean`!

## Pyclean

The easiest way (**in my opinion**) to run `pyclean` is to just use `pipx run`.

```bash
sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)  took 9s
❯ ls
abcmeta.py  __pycache__  python-print-align.py  system-monitor-psutils.py

sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)
❯ pipx run pyclean .
⚠️  pyclean is already on your PATH and installed at /usr/bin/pyclean. Downloading and running anyway.
Cleaning directory .
Total 1 files, 1 directories removed.

sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)
❯ ls
abcmeta.py  python-print-align.py  system-monitor-psutils.py

```

## Why not bash?

You could accomplish something similar with `rm **/*.pyc` or `find -n '*.py?' -delete` but there's a chance you'll find something you don't love gone.
Also this won't help our poor Windows friends out there!
`pyclean` is fully python so it's OS independent.

## Credits!

[repo](https://github.com/bittner/pyclean)