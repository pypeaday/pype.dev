---
content: "I wanted a quick way to generate an `index.html` for a directory of html
  files that grows by 1 or 2 files a week.\nI don't know any html (the files are exports
  from my [tiddlywiki](/tiddly-wiki))...\n\n`tree` is just the answer.\n\nSay I have
  a file structure like this:\n\n```\n./html-files\n\u251C\u2500\u2500 file1.html\n\u2514\u2500\u2500
  file2.html\n```\n\nTo generate a barebones simple `index.html` we can use tree as
  follows:\n\n`tree ./html-files -H \".\" -L 1 -P \"*.html\"`\n\nand get the following:\n\n```html\n\n<!DOCTYPE
  html>\n<html>\n<head>\n <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n
  <meta name=\"Author\" content=\"Made by 'tree'\">\n <meta name=\"GENERATOR\" content=\"$Version:
  $ tree v1.8.0 (c) 1996 - 2018 by Steve Baker, Thomas Moore, Francesc Rocher, Florian
  Sesser, Kyosuke Tokoro $\">\n <title>Directory Tree</title>\n <style type=\"text/css\">\n
  \ <!--\n  BODY { font-family : ariel, monospace, sans-serif; }\n  P { font-weight:
  normal; font-family : ariel, monospace, sans-serif; color: black; background-color:
  transparent;}\n  B { font-weight: normal; color: black; background-color: transparent;}\n
  \ A:visited { font-weight : normal; text-decoration : none; background-color : transparent;
  margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }\n  A:link
  \   { font-weight : normal; text-decoration : none; margin : 0px 0px 0px 0px; padding
  : 0px 0px 0px 0px; display: inline; }\n  A:hover   { color : #000000; font-weight
  : normal; text-decoration : underline; background-color : yellow; margin : 0px 0px
  0px 0px; padding : 0px 0px 0px 0px; display: inline; }\n  A:active  { color : #000000;
  font-weight: normal; background-color : transparent; margin : 0px 0px 0px 0px; padding
  : 0px 0px 0px 0px; display: inline; }\n  .VERSION { font-size: small; font-family
  : arial, sans-serif; }\n  .NORM  { color: black;  background-color: transparent;}\n
  \ .FIFO  { color: purple; background-color: transparent;}\n  .CHAR  { color: yellow;
  background-color: transparent;}\n  .DIR   { color: blue;   background-color: transparent;}\n
  \ .BLOCK { color: yellow; background-color: transparent;}\n  .LINK  { color: aqua;
  \  background-color: transparent;}\n  .SOCK  { color: fuchsia;background-color:
  transparent;}\n  .EXEC  { color: green;  background-color: transparent;}\n  -->\n
  </style>\n</head>\n<body>\n        <h1>Directory Tree</h1><p>\n        <a href=\".\">.</a><br>\n
  \       \u251C\u2500\u2500 <a href=\"./file1.html\">file1.html</a><br>\n        \u2514\u2500\u2500
  <a href=\"./file2.html\">file2.html</a><br>\n        <br><br>\n        </p>\n        <p>\n\n0
  directories, 2 files\n        <br><br>\n        </p>\n        <hr>\n        <p class=\"VERSION\">\n
  \                tree v1.8.0 \xA9 1996 - 2018 by Steve Baker and Thomas Moore <br>\n
  \                HTML output hacked and copyleft \xA9 1998 by Francesc Rocher <br>\n
  \                JSON output hacked and copyleft \xA9 2014 by Florian Sesser <br>\n
  \                Charsets / OS/2 support \xA9 2001 by Kyosuke Tokoro\n        </p>\n</body>\n</html>\n\n```\n\n\nwhich
  [looks like this](/tree-index-example.html) when you serve it up with `python -m
  http.server`"
date: 2022-03-06
description: 'I wanted a quick way to generate an `index.html` for a directory of
  html files that grows by 1 or 2 files a week.

  I don&#x27;t know any html (the files are expo'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Tree</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I wanted a quick way to generate an `index.html`
    for a directory of html files that grows by 1 or 2 files a week.\nI don&#x27;t
    know any html (the files are expo\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Tree | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/tree\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Tree
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I wanted a quick
    way to generate an `index.html` for a directory of html files that grows by 1
    or 2 files a week.\nI don&#x27;t know any html (the files are expo\" />\n<meta
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
    \           <span class=\"site-terminal__dir\">~/tree</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header>    <div class=\"post-terminal__search\">\n<div
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    </div>\n<section
    class=\"post-terminal  post-terminal--til \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Tree</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-06\">\n            March
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I wanted a quick way to generate an
    <code>index.html</code> for a directory of html files that grows by 1 or 2 files
    a week.\nI don't know any html (the files are exports from my <a href=\"/tiddly-wiki\">tiddlywiki</a>)...</p>\n<p><code>tree</code>
    is just the answer.</p>\n<p>Say I have a file structure like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>./html-files\n\u251C\u2500\u2500
    file1.html\n\u2514\u2500\u2500 file2.html\n</pre></div>\n\n</pre>\n\n<p>To generate
    a barebones simple <code>index.html</code> we can use tree as follows:</p>\n<p><code>tree
    ./html-files -H &quot;.&quot; -L 1 -P &quot;*.html&quot;</code></p>\n<p>and get
    the following:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"cp\">&lt;!DOCTYPE
    html&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">html</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">head</span><span
    class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">meta</span>
    <span class=\"na\">http-equiv</span><span class=\"o\">=</span><span class=\"s\">&quot;Content-Type&quot;</span>
    <span class=\"na\">content</span><span class=\"o\">=</span><span class=\"s\">&quot;text/html;
    charset=UTF-8&quot;</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">meta</span> <span class=\"na\">name</span><span class=\"o\">=</span><span
    class=\"s\">&quot;Author&quot;</span> <span class=\"na\">content</span><span class=\"o\">=</span><span
    class=\"s\">&quot;Made by &#39;tree&#39;&quot;</span><span class=\"p\">&gt;</span>\n
    <span class=\"p\">&lt;</span><span class=\"nt\">meta</span> <span class=\"na\">name</span><span
    class=\"o\">=</span><span class=\"s\">&quot;GENERATOR&quot;</span> <span class=\"na\">content</span><span
    class=\"o\">=</span><span class=\"s\">&quot;$Version: $ tree v1.8.0 (c) 1996 -
    2018 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro
    $&quot;</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">title</span><span class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span
    class=\"nt\">title</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">style</span> <span class=\"na\">type</span><span class=\"o\">=</span><span
    class=\"s\">&quot;text/css&quot;</span><span class=\"p\">&gt;</span>\n<span class=\"w\">
    \ </span><span class=\"o\">&lt;!</span><span class=\"nt\">--</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">BODY</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">font-family</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">ariel</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">monospace</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">P</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"n\">ariel</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">monospace</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">sans-serif</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">black</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">B</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">visited</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">none</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"w\">
    </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">padding</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">display</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">inline</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"p\">}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">link</span><span class=\"w\">    </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">none</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">margin</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
    class=\"nd\">hover</span><span class=\"w\">   </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mh\">#000000</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">underline</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"w\">
    </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">padding</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">display</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">inline</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"p\">}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">active</span><span class=\"w\">  </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mh\">#000000</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">font-weight</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">margin</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">VERSION</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">font-size</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">small</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">font-family</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"n\">arial</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">sans-serif</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"p\">.</span><span class=\"nc\">NORM</span><span class=\"w\">  </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
    class=\"p\">;</span><span class=\"w\">  </span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
    class=\"nc\">FIFO</span><span class=\"w\">  </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">purple</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">CHAR</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">yellow</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">DIR</span><span
    class=\"w\">   </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">blue</span><span class=\"p\">;</span><span class=\"w\">   </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">BLOCK</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">yellow</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">LINK</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">aqua</span><span class=\"p\">;</span><span class=\"w\">   </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">SOCK</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">fuchsia</span><span class=\"p\">;</span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
    class=\"nc\">EXEC</span><span class=\"w\">  </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">green</span><span class=\"p\">;</span><span
    class=\"w\">  </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">--</span><span class=\"o\">&gt;</span>\n<span
    class=\"w\"> </span><span class=\"p\">&lt;/</span><span class=\"nt\">style</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">head</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">body</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">h1</span><span
    class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span class=\"nt\">h1</span><span
    class=\"p\">&gt;&lt;</span><span class=\"nt\">p</span><span class=\"p\">&gt;</span>\n
    \       <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;.&quot;</span><span class=\"p\">&gt;</span>.<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        \u251C\u2500\u2500
    <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;./file1.html&quot;</span><span class=\"p\">&gt;</span>file1.html<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        \u2514\u2500\u2500
    <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;./file2.html&quot;</span><span class=\"p\">&gt;</span>file2.html<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n\n0 directories, 2 files\n        <span class=\"p\">&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">hr</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span>
    <span class=\"na\">class</span><span class=\"o\">=</span><span class=\"s\">&quot;VERSION&quot;</span><span
    class=\"p\">&gt;</span>\n                 tree v1.8.0 \xA9 1996 - 2018 by Steve
    Baker and Thomas Moore <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 HTML output hacked and copyleft \xA9
    1998 by Francesc Rocher <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 JSON output hacked and copyleft \xA9
    2014 by Florian Sesser <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 Charsets / OS/2 support \xA9 2001 by
    Kyosuke Tokoro\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">body</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">html</span><span
    class=\"p\">&gt;</span>\n</pre></div>\n\n</pre>\n\n<p>which <a href=\"/tree-index-example.html\">looks
    like this</a> when you serve it up with <code>python -m http.server</code></p>\n\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Tree</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I wanted a quick way to generate an `index.html`
    for a directory of html files that grows by 1 or 2 files a week.\nI don&#x27;t
    know any html (the files are expo\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Tree | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/tree\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Tree
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I wanted a quick
    way to generate an `index.html` for a directory of html files that grows by 1
    or 2 files a week.\nI don&#x27;t know any html (the files are expo\" />\n<meta
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
    mb-4 post-title-large\">Tree</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-06\">\n            March
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
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
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Tree</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-06\">\n
    \           March 06, 2022\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I wanted a quick way to generate an
    <code>index.html</code> for a directory of html files that grows by 1 or 2 files
    a week.\nI don't know any html (the files are exports from my <a href=\"/tiddly-wiki\">tiddlywiki</a>)...</p>\n<p><code>tree</code>
    is just the answer.</p>\n<p>Say I have a file structure like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>./html-files\n\u251C\u2500\u2500
    file1.html\n\u2514\u2500\u2500 file2.html\n</pre></div>\n\n</pre>\n\n<p>To generate
    a barebones simple <code>index.html</code> we can use tree as follows:</p>\n<p><code>tree
    ./html-files -H &quot;.&quot; -L 1 -P &quot;*.html&quot;</code></p>\n<p>and get
    the following:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"cp\">&lt;!DOCTYPE
    html&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">html</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">head</span><span
    class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">meta</span>
    <span class=\"na\">http-equiv</span><span class=\"o\">=</span><span class=\"s\">&quot;Content-Type&quot;</span>
    <span class=\"na\">content</span><span class=\"o\">=</span><span class=\"s\">&quot;text/html;
    charset=UTF-8&quot;</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">meta</span> <span class=\"na\">name</span><span class=\"o\">=</span><span
    class=\"s\">&quot;Author&quot;</span> <span class=\"na\">content</span><span class=\"o\">=</span><span
    class=\"s\">&quot;Made by &#39;tree&#39;&quot;</span><span class=\"p\">&gt;</span>\n
    <span class=\"p\">&lt;</span><span class=\"nt\">meta</span> <span class=\"na\">name</span><span
    class=\"o\">=</span><span class=\"s\">&quot;GENERATOR&quot;</span> <span class=\"na\">content</span><span
    class=\"o\">=</span><span class=\"s\">&quot;$Version: $ tree v1.8.0 (c) 1996 -
    2018 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro
    $&quot;</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">title</span><span class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span
    class=\"nt\">title</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">style</span> <span class=\"na\">type</span><span class=\"o\">=</span><span
    class=\"s\">&quot;text/css&quot;</span><span class=\"p\">&gt;</span>\n<span class=\"w\">
    \ </span><span class=\"o\">&lt;!</span><span class=\"nt\">--</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">BODY</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">font-family</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">ariel</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">monospace</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">P</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"n\">ariel</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">monospace</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">sans-serif</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">black</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">B</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">visited</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">none</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"w\">
    </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">padding</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">display</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">inline</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"p\">}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">link</span><span class=\"w\">    </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">none</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">margin</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
    class=\"nd\">hover</span><span class=\"w\">   </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mh\">#000000</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">underline</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"w\">
    </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">padding</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">display</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">inline</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"p\">}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">active</span><span class=\"w\">  </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mh\">#000000</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">font-weight</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">margin</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">VERSION</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">font-size</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">small</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">font-family</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"n\">arial</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">sans-serif</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"p\">.</span><span class=\"nc\">NORM</span><span class=\"w\">  </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
    class=\"p\">;</span><span class=\"w\">  </span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
    class=\"nc\">FIFO</span><span class=\"w\">  </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">purple</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">CHAR</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">yellow</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">DIR</span><span
    class=\"w\">   </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">blue</span><span class=\"p\">;</span><span class=\"w\">   </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">BLOCK</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">yellow</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">LINK</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">aqua</span><span class=\"p\">;</span><span class=\"w\">   </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">SOCK</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">fuchsia</span><span class=\"p\">;</span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
    class=\"nc\">EXEC</span><span class=\"w\">  </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">green</span><span class=\"p\">;</span><span
    class=\"w\">  </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">--</span><span class=\"o\">&gt;</span>\n<span
    class=\"w\"> </span><span class=\"p\">&lt;/</span><span class=\"nt\">style</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">head</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">body</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">h1</span><span
    class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span class=\"nt\">h1</span><span
    class=\"p\">&gt;&lt;</span><span class=\"nt\">p</span><span class=\"p\">&gt;</span>\n
    \       <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;.&quot;</span><span class=\"p\">&gt;</span>.<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        \u251C\u2500\u2500
    <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;./file1.html&quot;</span><span class=\"p\">&gt;</span>file1.html<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        \u2514\u2500\u2500
    <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;./file2.html&quot;</span><span class=\"p\">&gt;</span>file2.html<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n\n0 directories, 2 files\n        <span class=\"p\">&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">hr</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span>
    <span class=\"na\">class</span><span class=\"o\">=</span><span class=\"s\">&quot;VERSION&quot;</span><span
    class=\"p\">&gt;</span>\n                 tree v1.8.0 \xA9 1996 - 2018 by Steve
    Baker and Thomas Moore <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 HTML output hacked and copyleft \xA9
    1998 by Francesc Rocher <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 JSON output hacked and copyleft \xA9
    2014 by Florian Sesser <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 Charsets / OS/2 support \xA9 2001 by
    Kyosuke Tokoro\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">body</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">html</span><span
    class=\"p\">&gt;</span>\n</pre></div>\n\n</pre>\n\n<p>which <a href=\"/tree-index-example.html\">looks
    like this</a> when you serve it up with <code>python -m http.server</code></p>\n\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Tree</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I wanted a quick way to generate an `index.html`
    for a directory of html files that grows by 1 or 2 files a week.\nI don&#x27;t
    know any html (the files are expo\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Tree | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/tree\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Tree
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I wanted a quick
    way to generate an `index.html` for a directory of html files that grows by 1
    or 2 files a week.\nI don&#x27;t know any html (the files are expo\" />\n<meta
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
    \           <span class=\"site-terminal__dir\">~/tree</span>\n        </div>\n
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
    Content is handled by the password protection plugin -->\n    <p>I wanted a quick
    way to generate an <code>index.html</code> for a directory of html files that
    grows by 1 or 2 files a week.\nI don't know any html (the files are exports from
    my <a href=\"/tiddly-wiki\">tiddlywiki</a>)...</p>\n<p><code>tree</code> is just
    the answer.</p>\n<p>Say I have a file structure like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>./html-files\n\u251C\u2500\u2500
    file1.html\n\u2514\u2500\u2500 file2.html\n</pre></div>\n\n</pre>\n\n<p>To generate
    a barebones simple <code>index.html</code> we can use tree as follows:</p>\n<p><code>tree
    ./html-files -H &quot;.&quot; -L 1 -P &quot;*.html&quot;</code></p>\n<p>and get
    the following:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"cp\">&lt;!DOCTYPE
    html&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">html</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">head</span><span
    class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">meta</span>
    <span class=\"na\">http-equiv</span><span class=\"o\">=</span><span class=\"s\">&quot;Content-Type&quot;</span>
    <span class=\"na\">content</span><span class=\"o\">=</span><span class=\"s\">&quot;text/html;
    charset=UTF-8&quot;</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">meta</span> <span class=\"na\">name</span><span class=\"o\">=</span><span
    class=\"s\">&quot;Author&quot;</span> <span class=\"na\">content</span><span class=\"o\">=</span><span
    class=\"s\">&quot;Made by &#39;tree&#39;&quot;</span><span class=\"p\">&gt;</span>\n
    <span class=\"p\">&lt;</span><span class=\"nt\">meta</span> <span class=\"na\">name</span><span
    class=\"o\">=</span><span class=\"s\">&quot;GENERATOR&quot;</span> <span class=\"na\">content</span><span
    class=\"o\">=</span><span class=\"s\">&quot;$Version: $ tree v1.8.0 (c) 1996 -
    2018 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro
    $&quot;</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">title</span><span class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span
    class=\"nt\">title</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
    class=\"nt\">style</span> <span class=\"na\">type</span><span class=\"o\">=</span><span
    class=\"s\">&quot;text/css&quot;</span><span class=\"p\">&gt;</span>\n<span class=\"w\">
    \ </span><span class=\"o\">&lt;!</span><span class=\"nt\">--</span>\n<span class=\"w\">
    \ </span><span class=\"nt\">BODY</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">font-family</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">ariel</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">monospace</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">P</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"n\">ariel</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">monospace</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">sans-serif</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">black</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">B</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">visited</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">none</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"w\">
    </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">padding</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">display</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">inline</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"p\">}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">link</span><span class=\"w\">    </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">none</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">margin</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
    class=\"nd\">hover</span><span class=\"w\">   </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mh\">#000000</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">text-decoration</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">underline</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"w\">
    </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"w\"> </span><span
    class=\"mi\">0</span><span class=\"kt\">px</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">padding</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">display</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">inline</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"p\">}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
    class=\"p\">:</span><span class=\"nd\">active</span><span class=\"w\">  </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"mh\">#000000</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">font-weight</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">normal</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">margin</span><span class=\"w\"> </span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">VERSION</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">font-size</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">small</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">font-family</span><span class=\"w\"> </span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"n\">arial</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">sans-serif</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"p\">.</span><span class=\"nc\">NORM</span><span class=\"w\">  </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
    class=\"p\">;</span><span class=\"w\">  </span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
    class=\"nc\">FIFO</span><span class=\"w\">  </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">purple</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">CHAR</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">yellow</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">DIR</span><span
    class=\"w\">   </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">blue</span><span class=\"p\">;</span><span class=\"w\">   </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">BLOCK</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">yellow</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">LINK</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">aqua</span><span class=\"p\">;</span><span class=\"w\">   </span><span
    class=\"k\">background-color</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">SOCK</span><span
    class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"k\">color</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"kc\">fuchsia</span><span class=\"p\">;</span><span class=\"k\">background-color</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
    class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
    class=\"nc\">EXEC</span><span class=\"w\">  </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">green</span><span class=\"p\">;</span><span
    class=\"w\">  </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
    class=\"w\">  </span><span class=\"nt\">--</span><span class=\"o\">&gt;</span>\n<span
    class=\"w\"> </span><span class=\"p\">&lt;/</span><span class=\"nt\">style</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">head</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">body</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">h1</span><span
    class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span class=\"nt\">h1</span><span
    class=\"p\">&gt;&lt;</span><span class=\"nt\">p</span><span class=\"p\">&gt;</span>\n
    \       <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;.&quot;</span><span class=\"p\">&gt;</span>.<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        \u251C\u2500\u2500
    <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;./file1.html&quot;</span><span class=\"p\">&gt;</span>file1.html<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        \u2514\u2500\u2500
    <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
    class=\"o\">=</span><span class=\"s\">&quot;./file2.html&quot;</span><span class=\"p\">&gt;</span>file2.html<span
    class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n\n0 directories, 2 files\n        <span class=\"p\">&lt;</span><span
    class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">hr</span><span
    class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span>
    <span class=\"na\">class</span><span class=\"o\">=</span><span class=\"s\">&quot;VERSION&quot;</span><span
    class=\"p\">&gt;</span>\n                 tree v1.8.0 \xA9 1996 - 2018 by Steve
    Baker and Thomas Moore <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 HTML output hacked and copyleft \xA9
    1998 by Francesc Rocher <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 JSON output hacked and copyleft \xA9
    2014 by Florian Sesser <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
    class=\"p\">&gt;</span>\n                 Charsets / OS/2 support \xA9 2001 by
    Kyosuke Tokoro\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">body</span><span
    class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span class=\"nt\">html</span><span
    class=\"p\">&gt;</span>\n</pre></div>\n\n</pre>\n\n<p>which <a href=\"/tree-index-example.html\">looks
    like this</a> when you serve it up with <code>python -m http.server</code></p>\n\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ntemplateKey: til\ntags: ['linux', 'tech', 'til']\ntitle: Tree\ndate:
    2022-03-06T00:00:00\npublished: True\n#cover: \"media/tree.png\"\n\n---\n\nI wanted
    a quick way to generate an `index.html` for a directory of html files that grows
    by 1 or 2 files a week.\nI don't know any html (the files are exports from my
    [tiddlywiki](/tiddly-wiki))...\n\n`tree` is just the answer.\n\nSay I have a file
    structure like this:\n\n```\n./html-files\n\u251C\u2500\u2500 file1.html\n\u2514\u2500\u2500
    file2.html\n```\n\nTo generate a barebones simple `index.html` we can use tree
    as follows:\n\n`tree ./html-files -H \".\" -L 1 -P \"*.html\"`\n\nand get the
    following:\n\n```html\n\n<!DOCTYPE html>\n<html>\n<head>\n <meta http-equiv=\"Content-Type\"
    content=\"text/html; charset=UTF-8\">\n <meta name=\"Author\" content=\"Made by
    'tree'\">\n <meta name=\"GENERATOR\" content=\"$Version: $ tree v1.8.0 (c) 1996
    - 2018 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke
    Tokoro $\">\n <title>Directory Tree</title>\n <style type=\"text/css\">\n  <!--\n
    \ BODY { font-family : ariel, monospace, sans-serif; }\n  P { font-weight: normal;
    font-family : ariel, monospace, sans-serif; color: black; background-color: transparent;}\n
    \ B { font-weight: normal; color: black; background-color: transparent;}\n  A:visited
    { font-weight : normal; text-decoration : none; background-color : transparent;
    margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }\n  A:link
    \   { font-weight : normal; text-decoration : none; margin : 0px 0px 0px 0px;
    padding : 0px 0px 0px 0px; display: inline; }\n  A:hover   { color : #000000;
    font-weight : normal; text-decoration : underline; background-color : yellow;
    margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }\n  A:active
    \ { color : #000000; font-weight: normal; background-color : transparent; margin
    : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }\n  .VERSION {
    font-size: small; font-family : arial, sans-serif; }\n  .NORM  { color: black;
    \ background-color: transparent;}\n  .FIFO  { color: purple; background-color:
    transparent;}\n  .CHAR  { color: yellow; background-color: transparent;}\n  .DIR
    \  { color: blue;   background-color: transparent;}\n  .BLOCK { color: yellow;
    background-color: transparent;}\n  .LINK  { color: aqua;   background-color: transparent;}\n
    \ .SOCK  { color: fuchsia;background-color: transparent;}\n  .EXEC  { color: green;
    \ background-color: transparent;}\n  -->\n </style>\n</head>\n<body>\n        <h1>Directory
    Tree</h1><p>\n        <a href=\".\">.</a><br>\n        \u251C\u2500\u2500 <a href=\"./file1.html\">file1.html</a><br>\n
    \       \u2514\u2500\u2500 <a href=\"./file2.html\">file2.html</a><br>\n        <br><br>\n
    \       </p>\n        <p>\n\n0 directories, 2 files\n        <br><br>\n        </p>\n
    \       <hr>\n        <p class=\"VERSION\">\n                 tree v1.8.0 \xA9
    1996 - 2018 by Steve Baker and Thomas Moore <br>\n                 HTML output
    hacked and copyleft \xA9 1998 by Francesc Rocher <br>\n                 JSON output
    hacked and copyleft \xA9 2014 by Florian Sesser <br>\n                 Charsets
    / OS/2 support \xA9 2001 by Kyosuke Tokoro\n        </p>\n</body>\n</html>\n\n```\n\n\nwhich
    [looks like this](/tree-index-example.html) when you serve it up with `python
    -m http.server`\n"
published: true
slug: tree
title: Tree


---

I wanted a quick way to generate an `index.html` for a directory of html files that grows by 1 or 2 files a week.
I don't know any html (the files are exports from my [tiddlywiki](/tiddly-wiki))...

`tree` is just the answer.

Say I have a file structure like this:

```
./html-files
├── file1.html
└── file2.html
```

To generate a barebones simple `index.html` we can use tree as follows:

`tree ./html-files -H "." -L 1 -P "*.html"`

and get the following:

```html

<!DOCTYPE html>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <meta name="Author" content="Made by 'tree'">
 <meta name="GENERATOR" content="$Version: $ tree v1.8.0 (c) 1996 - 2018 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro $">
 <title>Directory Tree</title>
 <style type="text/css">
  <!--
  BODY { font-family : ariel, monospace, sans-serif; }
  P { font-weight: normal; font-family : ariel, monospace, sans-serif; color: black; background-color: transparent;}
  B { font-weight: normal; color: black; background-color: transparent;}
  A:visited { font-weight : normal; text-decoration : none; background-color : transparent; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:link    { font-weight : normal; text-decoration : none; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:hover   { color : #000000; font-weight : normal; text-decoration : underline; background-color : yellow; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:active  { color : #000000; font-weight: normal; background-color : transparent; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  .VERSION { font-size: small; font-family : arial, sans-serif; }
  .NORM  { color: black;  background-color: transparent;}
  .FIFO  { color: purple; background-color: transparent;}
  .CHAR  { color: yellow; background-color: transparent;}
  .DIR   { color: blue;   background-color: transparent;}
  .BLOCK { color: yellow; background-color: transparent;}
  .LINK  { color: aqua;   background-color: transparent;}
  .SOCK  { color: fuchsia;background-color: transparent;}
  .EXEC  { color: green;  background-color: transparent;}
  -->
 </style>
</head>
<body>
        <h1>Directory Tree</h1><p>
        <a href=".">.</a><br>
        ├── <a href="./file1.html">file1.html</a><br>
        └── <a href="./file2.html">file2.html</a><br>
        <br><br>
        </p>
        <p>

0 directories, 2 files
        <br><br>
        </p>
        <hr>
        <p class="VERSION">
                 tree v1.8.0 © 1996 - 2018 by Steve Baker and Thomas Moore <br>
                 HTML output hacked and copyleft © 1998 by Francesc Rocher <br>
                 JSON output hacked and copyleft © 2014 by Florian Sesser <br>
                 Charsets / OS/2 support © 2001 by Kyosuke Tokoro
        </p>
</body>
</html>

```


which [looks like this](/tree-index-example.html) when you serve it up with `python -m http.server`