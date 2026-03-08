---
content: "I host a lot of services in my homelab, but they're mostly dockerized applications
  so I have never had to care much about how content gets served up.\nToday I had
  several little concepts click into place regarding webservers, and it was a similar
  experience to when I started homelabing and didn't know what a \"server\" was in
  the first place.\n\n# Servers\n\nA \"server\" can have a lot of different meanings
  but specifically in my world it was a physical server, like my PowerEdge R610 which
  acts as my main \"home server\".\nBut then on my server, I have other servers...
  Jellyfin is my main media server - but that's obviously not a hardware thing, that's
  software. \nThis is certainly not a groundbreaking thing but it was a tiny piece
  to the puzzle that I was missing... that \"server\" is highly contextual.\n\n# Webservers
  \n\nSomething that confused the heck out of me when I first started down the road
  of having a server was what a webserver even was...\nI always thought the \"webserver\"
  was just \"a server that hosts a website\"... and yes, that's true, but also it
  wasn't true in how I understood \"server\".\nIt turns out that across my 40-odd
  dockerized services I have at home that I must have about 40-odd web servers running,
  each docker container is spinning up its own!\n\nSo something I have wanted to do
  for a long time is put my theology notes online for my small group to access whenever
  they might want... it doesn't need to be fancy or anything.\nMy issue was not knowing
  what to even Google. I tried \"How to serve up static html\" but that kind of search
  is for people who know what a \"static\" site is - I am not one of those people.\nI
  kept running across nginx and apache things, wordpress and other website building
  tools, etc.\nIn fact I only recently learned that JavaScript assets cann still be
  considered static so I am a complete baby in the web-dev space.\n\nWhat I really
  wanted was just a simple landing page with a link to each of my \"posts\" which
  are in the form of a single html file each that I can easily export from my tiddlywiki
  (I have a post about tiddlywiki [here](/tiddly-wiki))\n\nThe first win `python -m
  http.server` right in the directory I kept my html files in and that got me what
  I wanted functionally. \nBut then I wanted just a hair more organization...\nI started
  looking for a way to dynamically generate an index for a directory of html files
  but again the verbiage of that Google search just wasn't helping me - I didn't want
  anything complicated and I knew that what I wanted had to be easy...\n\n# The Index
  \n\nLuckily I randomly came across a SO that mentioned a Linux utility called `tree`
  which does exactly what I wanted!\n\nSee my TIL on `tree` [here]('/tree')\n\nSo
  now it goes like this:\n\n* Take notes on X in my tiddlywiki\n* Export that tiddler
  to a html file \n* Put that html file into a `notes` folder in my github repo for
  small group notes \n* Use `tree` to generate an `index.html` of each of those files
  in the `notes` directory\n* Use `python -m http.server` to start a web server that
  lands me at the `index.html` and now I can click through to any post!\n\nIt's not
  fancy but it's functional... \nThis site/blog is built with markdown and [markata](https://www.markata.dev)
  and I wanted way more functionality in my tech notes.\nBut for this simple use case
  I learned a ton about _how_ content gets served up on a webpage and my small group
  benefits from the easy access as well!"
date: 2022-03-06
description: 'I host a lot of services in my homelab, but they&#x27;re mostly dockerized
  applications so I have never had to care much about how content gets served up.

  Today'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Webservers-And-Indexes</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I host a lot of services in my homelab,
    but they&#x27;re mostly dockerized applications so I have never had to care much
    about how content gets served up.\nToday\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Webservers-And-Indexes | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/webservers-and-indexes\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Webservers-And-Indexes | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I host a lot of services in my homelab, but they&#x27;re mostly dockerized
    applications so I have never had to care much about how content gets served up.\nToday\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/webservers-and-indexes</span>\n
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
    class=\"post-terminal  post-terminal--til \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Webservers-And-Indexes</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-06\">\n            March
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I host a lot of services in my homelab,
    but they're mostly dockerized applications so I have never had to care much about
    how content gets served up.\nToday I had several little concepts click into place
    regarding webservers, and it was a similar experience to when I started homelabing
    and didn't know what a &quot;server&quot; was in the first place.</p>\n<h1 id=\"servers\">Servers
    <a class=\"header-anchor\" href=\"#servers\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>A &quot;server&quot;
    can have a lot of different meanings but specifically in my world it was a physical
    server, like my PowerEdge R610 which acts as my main &quot;home server&quot;.\nBut
    then on my server, I have other servers... Jellyfin is my main media server -
    but that's obviously not a hardware thing, that's software.\nThis is certainly
    not a groundbreaking thing but it was a tiny piece to the puzzle that I was missing...
    that &quot;server&quot; is highly contextual.</p>\n<h1 id=\"webservers\">Webservers
    <a class=\"header-anchor\" href=\"#webservers\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Something that confused
    the heck out of me when I first started down the road of having a server was what
    a webserver even was...\nI always thought the &quot;webserver&quot; was just &quot;a
    server that hosts a website&quot;... and yes, that's true, but also it wasn't
    true in how I understood &quot;server&quot;.\nIt turns out that across my 40-odd
    dockerized services I have at home that I must have about 40-odd web servers running,
    each docker container is spinning up its own!</p>\n<p>So something I have wanted
    to do for a long time is put my theology notes online for my small group to access
    whenever they might want... it doesn't need to be fancy or anything.\nMy issue
    was not knowing what to even Google. I tried &quot;How to serve up static html&quot;
    but that kind of search is for people who know what a &quot;static&quot; site
    is - I am not one of those people.\nI kept running across nginx and apache things,
    wordpress and other website building tools, etc.\nIn fact I only recently learned
    that JavaScript assets cann still be considered static so I am a complete baby
    in the web-dev space.</p>\n<p>What I really wanted was just a simple landing page
    with a link to each of my &quot;posts&quot; which are in the form of a single
    html file each that I can easily export from my tiddlywiki (I have a post about
    tiddlywiki <a href=\"/tiddly-wiki\">here</a>)</p>\n<p>The first win <code>python
    -m http.server</code> right in the directory I kept my html files in and that
    got me what I wanted functionally.\nBut then I wanted just a hair more organization...\nI
    started looking for a way to dynamically generate an index for a directory of
    html files but again the verbiage of that Google search just wasn't helping me
    - I didn't want anything complicated and I knew that what I wanted had to be easy...</p>\n<h1
    id=\"the-index\">The Index <a class=\"header-anchor\" href=\"#the-index\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Luckily I randomly came
    across a SO that mentioned a Linux utility called <code>tree</code> which does
    exactly what I wanted!</p>\n<p>See my TIL on <code>tree</code> <a href=\"'/tree'\">here</a></p>\n<p>So
    now it goes like this:</p>\n<ul>\n<li>Take notes on X in my tiddlywiki</li>\n<li>Export
    that tiddler to a html file</li>\n<li>Put that html file into a <code>notes</code>
    folder in my github repo for small group notes</li>\n<li>Use <code>tree</code>
    to generate an <code>index.html</code> of each of those files in the <code>notes</code>
    directory</li>\n<li>Use <code>python -m http.server</code> to start a web server
    that lands me at the <code>index.html</code> and now I can click through to any
    post!</li>\n</ul>\n<p>It's not fancy but it's functional...\nThis site/blog is
    built with markdown and <a href=\"https://www.markata.dev\">markata</a> and I
    wanted way more functionality in my tech notes.\nBut for this simple use case
    I learned a ton about <em>how</em> content gets served up on a webpage and my
    small group benefits from the easy access as well!</p>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Webservers-And-Indexes</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I host a lot of services in my homelab,
    but they&#x27;re mostly dockerized applications so I have never had to care much
    about how content gets served up.\nToday\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Webservers-And-Indexes | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/webservers-and-indexes\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Webservers-And-Indexes | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I host a lot of services in my homelab, but they&#x27;re mostly dockerized
    applications so I have never had to care much about how content gets served up.\nToday\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Webservers-And-Indexes</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-06\">\n            March
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal  post-terminal--til \">\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Webservers-And-Indexes</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-03-06\">\n            March 06, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #homelab\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>I
    host a lot of services in my homelab, but they're mostly dockerized applications
    so I have never had to care much about how content gets served up.\nToday I had
    several little concepts click into place regarding webservers, and it was a similar
    experience to when I started homelabing and didn't know what a &quot;server&quot;
    was in the first place.</p>\n<h1 id=\"servers\">Servers <a class=\"header-anchor\"
    href=\"#servers\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>A &quot;server&quot;
    can have a lot of different meanings but specifically in my world it was a physical
    server, like my PowerEdge R610 which acts as my main &quot;home server&quot;.\nBut
    then on my server, I have other servers... Jellyfin is my main media server -
    but that's obviously not a hardware thing, that's software.\nThis is certainly
    not a groundbreaking thing but it was a tiny piece to the puzzle that I was missing...
    that &quot;server&quot; is highly contextual.</p>\n<h1 id=\"webservers\">Webservers
    <a class=\"header-anchor\" href=\"#webservers\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Something that confused
    the heck out of me when I first started down the road of having a server was what
    a webserver even was...\nI always thought the &quot;webserver&quot; was just &quot;a
    server that hosts a website&quot;... and yes, that's true, but also it wasn't
    true in how I understood &quot;server&quot;.\nIt turns out that across my 40-odd
    dockerized services I have at home that I must have about 40-odd web servers running,
    each docker container is spinning up its own!</p>\n<p>So something I have wanted
    to do for a long time is put my theology notes online for my small group to access
    whenever they might want... it doesn't need to be fancy or anything.\nMy issue
    was not knowing what to even Google. I tried &quot;How to serve up static html&quot;
    but that kind of search is for people who know what a &quot;static&quot; site
    is - I am not one of those people.\nI kept running across nginx and apache things,
    wordpress and other website building tools, etc.\nIn fact I only recently learned
    that JavaScript assets cann still be considered static so I am a complete baby
    in the web-dev space.</p>\n<p>What I really wanted was just a simple landing page
    with a link to each of my &quot;posts&quot; which are in the form of a single
    html file each that I can easily export from my tiddlywiki (I have a post about
    tiddlywiki <a href=\"/tiddly-wiki\">here</a>)</p>\n<p>The first win <code>python
    -m http.server</code> right in the directory I kept my html files in and that
    got me what I wanted functionally.\nBut then I wanted just a hair more organization...\nI
    started looking for a way to dynamically generate an index for a directory of
    html files but again the verbiage of that Google search just wasn't helping me
    - I didn't want anything complicated and I knew that what I wanted had to be easy...</p>\n<h1
    id=\"the-index\">The Index <a class=\"header-anchor\" href=\"#the-index\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Luckily I randomly came
    across a SO that mentioned a Linux utility called <code>tree</code> which does
    exactly what I wanted!</p>\n<p>See my TIL on <code>tree</code> <a href=\"'/tree'\">here</a></p>\n<p>So
    now it goes like this:</p>\n<ul>\n<li>Take notes on X in my tiddlywiki</li>\n<li>Export
    that tiddler to a html file</li>\n<li>Put that html file into a <code>notes</code>
    folder in my github repo for small group notes</li>\n<li>Use <code>tree</code>
    to generate an <code>index.html</code> of each of those files in the <code>notes</code>
    directory</li>\n<li>Use <code>python -m http.server</code> to start a web server
    that lands me at the <code>index.html</code> and now I can click through to any
    post!</li>\n</ul>\n<p>It's not fancy but it's functional...\nThis site/blog is
    built with markdown and <a href=\"https://www.markata.dev\">markata</a> and I
    wanted way more functionality in my tech notes.\nBut for this simple use case
    I learned a ton about <em>how</em> content gets served up on a webpage and my
    small group benefits from the easy access as well!</p>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Webservers-And-Indexes</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I host a lot of services in my homelab,
    but they&#x27;re mostly dockerized applications so I have never had to care much
    about how content gets served up.\nToday\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Webservers-And-Indexes | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/webservers-and-indexes\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Webservers-And-Indexes | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I host a lot of services in my homelab, but they&#x27;re mostly dockerized
    applications so I have never had to care much about how content gets served up.\nToday\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/webservers-and-indexes</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>I host
    a lot of services in my homelab, but they're mostly dockerized applications so
    I have never had to care much about how content gets served up.\nToday I had several
    little concepts click into place regarding webservers, and it was a similar experience
    to when I started homelabing and didn't know what a &quot;server&quot; was in
    the first place.</p>\n<h1 id=\"servers\">Servers <a class=\"header-anchor\" href=\"#servers\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>A &quot;server&quot;
    can have a lot of different meanings but specifically in my world it was a physical
    server, like my PowerEdge R610 which acts as my main &quot;home server&quot;.\nBut
    then on my server, I have other servers... Jellyfin is my main media server -
    but that's obviously not a hardware thing, that's software.\nThis is certainly
    not a groundbreaking thing but it was a tiny piece to the puzzle that I was missing...
    that &quot;server&quot; is highly contextual.</p>\n<h1 id=\"webservers\">Webservers
    <a class=\"header-anchor\" href=\"#webservers\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Something that confused
    the heck out of me when I first started down the road of having a server was what
    a webserver even was...\nI always thought the &quot;webserver&quot; was just &quot;a
    server that hosts a website&quot;... and yes, that's true, but also it wasn't
    true in how I understood &quot;server&quot;.\nIt turns out that across my 40-odd
    dockerized services I have at home that I must have about 40-odd web servers running,
    each docker container is spinning up its own!</p>\n<p>So something I have wanted
    to do for a long time is put my theology notes online for my small group to access
    whenever they might want... it doesn't need to be fancy or anything.\nMy issue
    was not knowing what to even Google. I tried &quot;How to serve up static html&quot;
    but that kind of search is for people who know what a &quot;static&quot; site
    is - I am not one of those people.\nI kept running across nginx and apache things,
    wordpress and other website building tools, etc.\nIn fact I only recently learned
    that JavaScript assets cann still be considered static so I am a complete baby
    in the web-dev space.</p>\n<p>What I really wanted was just a simple landing page
    with a link to each of my &quot;posts&quot; which are in the form of a single
    html file each that I can easily export from my tiddlywiki (I have a post about
    tiddlywiki <a href=\"/tiddly-wiki\">here</a>)</p>\n<p>The first win <code>python
    -m http.server</code> right in the directory I kept my html files in and that
    got me what I wanted functionally.\nBut then I wanted just a hair more organization...\nI
    started looking for a way to dynamically generate an index for a directory of
    html files but again the verbiage of that Google search just wasn't helping me
    - I didn't want anything complicated and I knew that what I wanted had to be easy...</p>\n<h1
    id=\"the-index\">The Index <a class=\"header-anchor\" href=\"#the-index\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Luckily I randomly came
    across a SO that mentioned a Linux utility called <code>tree</code> which does
    exactly what I wanted!</p>\n<p>See my TIL on <code>tree</code> <a href=\"'/tree'\">here</a></p>\n<p>So
    now it goes like this:</p>\n<ul>\n<li>Take notes on X in my tiddlywiki</li>\n<li>Export
    that tiddler to a html file</li>\n<li>Put that html file into a <code>notes</code>
    folder in my github repo for small group notes</li>\n<li>Use <code>tree</code>
    to generate an <code>index.html</code> of each of those files in the <code>notes</code>
    directory</li>\n<li>Use <code>python -m http.server</code> to start a web server
    that lands me at the <code>index.html</code> and now I can click through to any
    post!</li>\n</ul>\n<p>It's not fancy but it's functional...\nThis site/blog is
    built with markdown and <a href=\"https://www.markata.dev\">markata</a> and I
    wanted way more functionality in my tech notes.\nBut for this simple use case
    I learned a ton about <em>how</em> content gets served up on a webpage and my
    small group benefits from the easy access as well!</p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: til\ntags: ['homelab', 'tech', 'til']\ntitle: Webservers-And-Indexes\ndate:
    2022-03-06T00:00:00\npublished: True\n#cover: \"media/webservers-and-indexes.png\"\n\n---\n\nI
    host a lot of services in my homelab, but they're mostly dockerized applications
    so I have never had to care much about how content gets served up.\nToday I had
    several little concepts click into place regarding webservers, and it was a similar
    experience to when I started homelabing and didn't know what a \"server\" was
    in the first place.\n\n# Servers\n\nA \"server\" can have a lot of different meanings
    but specifically in my world it was a physical server, like my PowerEdge R610
    which acts as my main \"home server\".\nBut then on my server, I have other servers...
    Jellyfin is my main media server - but that's obviously not a hardware thing,
    that's software. \nThis is certainly not a groundbreaking thing but it was a tiny
    piece to the puzzle that I was missing... that \"server\" is highly contextual.\n\n#
    Webservers \n\nSomething that confused the heck out of me when I first started
    down the road of having a server was what a webserver even was...\nI always thought
    the \"webserver\" was just \"a server that hosts a website\"... and yes, that's
    true, but also it wasn't true in how I understood \"server\".\nIt turns out that
    across my 40-odd dockerized services I have at home that I must have about 40-odd
    web servers running, each docker container is spinning up its own!\n\nSo something
    I have wanted to do for a long time is put my theology notes online for my small
    group to access whenever they might want... it doesn't need to be fancy or anything.\nMy
    issue was not knowing what to even Google. I tried \"How to serve up static html\"
    but that kind of search is for people who know what a \"static\" site is - I am
    not one of those people.\nI kept running across nginx and apache things, wordpress
    and other website building tools, etc.\nIn fact I only recently learned that JavaScript
    assets cann still be considered static so I am a complete baby in the web-dev
    space.\n\nWhat I really wanted was just a simple landing page with a link to each
    of my \"posts\" which are in the form of a single html file each that I can easily
    export from my tiddlywiki (I have a post about tiddlywiki [here](/tiddly-wiki))\n\nThe
    first win `python -m http.server` right in the directory I kept my html files
    in and that got me what I wanted functionally. \nBut then I wanted just a hair
    more organization...\nI started looking for a way to dynamically generate an index
    for a directory of html files but again the verbiage of that Google search just
    wasn't helping me - I didn't want anything complicated and I knew that what I
    wanted had to be easy...\n\n# The Index \n\nLuckily I randomly came across a SO
    that mentioned a Linux utility called `tree` which does exactly what I wanted!\n\nSee
    my TIL on `tree` [here]('/tree')\n\nSo now it goes like this:\n\n* Take notes
    on X in my tiddlywiki\n* Export that tiddler to a html file \n* Put that html
    file into a `notes` folder in my github repo for small group notes \n* Use `tree`
    to generate an `index.html` of each of those files in the `notes` directory\n*
    Use `python -m http.server` to start a web server that lands me at the `index.html`
    and now I can click through to any post!\n\nIt's not fancy but it's functional...
    \nThis site/blog is built with markdown and [markata](https://www.markata.dev)
    and I wanted way more functionality in my tech notes.\nBut for this simple use
    case I learned a ton about _how_ content gets served up on a webpage and my small
    group benefits from the easy access as well!\n"
published: true
slug: webservers-and-indexes
title: Webservers-And-Indexes


---

I host a lot of services in my homelab, but they're mostly dockerized applications so I have never had to care much about how content gets served up.
Today I had several little concepts click into place regarding webservers, and it was a similar experience to when I started homelabing and didn't know what a "server" was in the first place.

# Servers

A "server" can have a lot of different meanings but specifically in my world it was a physical server, like my PowerEdge R610 which acts as my main "home server".
But then on my server, I have other servers... Jellyfin is my main media server - but that's obviously not a hardware thing, that's software. 
This is certainly not a groundbreaking thing but it was a tiny piece to the puzzle that I was missing... that "server" is highly contextual.

# Webservers 

Something that confused the heck out of me when I first started down the road of having a server was what a webserver even was...
I always thought the "webserver" was just "a server that hosts a website"... and yes, that's true, but also it wasn't true in how I understood "server".
It turns out that across my 40-odd dockerized services I have at home that I must have about 40-odd web servers running, each docker container is spinning up its own!

So something I have wanted to do for a long time is put my theology notes online for my small group to access whenever they might want... it doesn't need to be fancy or anything.
My issue was not knowing what to even Google. I tried "How to serve up static html" but that kind of search is for people who know what a "static" site is - I am not one of those people.
I kept running across nginx and apache things, wordpress and other website building tools, etc.
In fact I only recently learned that JavaScript assets cann still be considered static so I am a complete baby in the web-dev space.

What I really wanted was just a simple landing page with a link to each of my "posts" which are in the form of a single html file each that I can easily export from my tiddlywiki (I have a post about tiddlywiki [here](/tiddly-wiki))

The first win `python -m http.server` right in the directory I kept my html files in and that got me what I wanted functionally. 
But then I wanted just a hair more organization...
I started looking for a way to dynamically generate an index for a directory of html files but again the verbiage of that Google search just wasn't helping me - I didn't want anything complicated and I knew that what I wanted had to be easy...

# The Index 

Luckily I randomly came across a SO that mentioned a Linux utility called `tree` which does exactly what I wanted!

See my TIL on `tree` [here]('/tree')

So now it goes like this:

* Take notes on X in my tiddlywiki
* Export that tiddler to a html file 
* Put that html file into a `notes` folder in my github repo for small group notes 
* Use `tree` to generate an `index.html` of each of those files in the `notes` directory
* Use `python -m http.server` to start a web server that lands me at the `index.html` and now I can click through to any post!

It's not fancy but it's functional... 
This site/blog is built with markdown and [markata](https://www.markata.dev) and I wanted way more functionality in my tech notes.
But for this simple use case I learned a ton about _how_ content gets served up on a webpage and my small group benefits from the easy access as well!