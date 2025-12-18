---
content: "I wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)\n\nBut
  I've been playing with a web app for with lists and while I'm toying around I learned
  you can actually give your tables some style with some simple css classes! \n\n#
  To HTML\n\nReminder that if you have a dataframe, `df`, you can `df.to_html()` to
  get an HTML table of your dataframe.\n\nWell you can pass some `classes` to make
  it look super nice!\n\n# Classes and CSS\n\nI don't know anything really about CSS
  so I won't pretend otherwise, but as I was learning about bootstrap that's where
  I stumbled upon this...\n\nThere are several classes you can pass but I found really
  good luck with `table-bordered` and `table-dark` for my use case\n\n`df.to_html(classes=[\"table
  table-bordered table-dark\"])`\n\n<table border=\"1\" class=\"dataframe table table-bordered
  table-dark\">  <thead>\n<tr style=\"text-align: right;\">      <th>Unnamed: 0</th>
  \     <th>mpg</th>\n<th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>\n<th>wt</th>
  \     <th>qsec</th>      <th>vs</th>      <th>am</th>\n<th>gear</th>      <th>carb</th>
  \   </tr>  </thead>  <tbody>    <tr>\n<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>
  \     <td>160.0</td>\n<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>\n<td>0</td>
  \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Mazda RX4
  Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>\n<td>110</td>      <td>3.90</td>
  \     <td>2.875</td>      <td>17.02</td>\n<td>0</td>      <td>1</td>      <td>4</td>
  \     <td>4</td>    </tr>    <tr>\n<td>Datsun 710</td>      <td>22.8</td>      <td>4</td>
  \     <td>108.0</td>\n<td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>\n<td>1</td>
  \     <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet 4
  Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>\n<td>110</td>
  \     <td>3.08</td>      <td>3.215</td>      <td>19.44</td>\n<td>1</td>      <td>0</td>
  \     <td>3</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet Sportabout</td>      <td>18.7</td>
  \     <td>8</td>\n<td>360.0</td>      <td>175</td>      <td>3.15</td>      <td>3.440</td>\n<td>17.02</td>
  \     <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>\n</tr>  </tbody></table>\n\n\n#
  You try it!\n\nCrack open ipython and make a dataframe, then `df.to_html(classes=[\"table
  table-bordered table-dark\"])`, copy the output (minus the quote marks ipython uses
  to denote the string type) that into `my-file.html`, open that up in a browser and
  be amazed!\n\n> For added effeciency try using pyperclip to copy the output right
  to your clipboard!\n\n`pip install pyperclip` and then `pyperclip.copy(df.to_html(classes=[\"table
  table-bordered table-dark\"]))`"
date: 2022-05-07
description: I wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)
  But I&#x27;ve been playing with a web app for with lists and whi
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Dataframe-To-Styled-Html</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I wrote up a little on exporting DataFrames
    to markdown and html [here](/dataframe-to-markdown) But I&#x27;ve been playing
    with a web app for with lists and whi\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Dataframe-To-Styled-Html | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataframe-to-styled-html\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Dataframe-To-Styled-Html | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)
    But I&#x27;ve been playing with a web app for with lists and whi\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/dataframe-to-styled-html</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    mb-4 post-title-large\">Dataframe-To-Styled-Html</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-07\">\n            May
    07, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I wrote up a little on exporting DataFrames
    to markdown and html <a href=\"/dataframe-to-markdown\">here</a></p>\n<p>But I've
    been playing with a web app for with lists and while I'm toying around I learned
    you can actually give your tables some style with some simple css classes!</p>\n<h1
    id=\"to-html\">To HTML <a class=\"header-anchor\" href=\"#to-html\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Reminder that if you
    have a dataframe, <code>df</code>, you can <code>df.to_html()</code> to get an
    HTML table of your dataframe.</p>\n<p>Well you can pass some <code>classes</code>
    to make it look super nice!</p>\n<h1 id=\"classes-and-css\">Classes and CSS <a
    class=\"header-anchor\" href=\"#classes-and-css\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I don't know anything
    really about CSS so I won't pretend otherwise, but as I was learning about bootstrap
    that's where I stumbled upon this...</p>\n<p>There are several classes you can
    pass but I found really good luck with <code>table-bordered</code> and <code>table-dark</code>
    for my use case</p>\n<p><code>df.to_html(classes=[&quot;table table-bordered table-dark&quot;])</code></p>\n<table
    border=\"1\" class=\"dataframe table table-bordered table-dark\">  <thead>\n<tr
    style=\"text-align: right;\">      <th>Unnamed: 0</th>      <th>mpg</th>\n<th>cyl</th>
    \     <th>disp</th>      <th>hp</th>      <th>drat</th>\n<th>wt</th>      <th>qsec</th>
    \     <th>vs</th>      <th>am</th>\n<th>gear</th>      <th>carb</th>    </tr>
    \ </thead>  <tbody>    <tr>\n<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>
    \     <td>160.0</td>\n<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>\n<td>0</td>
    \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Mazda RX4
    Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>\n<td>110</td>
    \     <td>3.90</td>      <td>2.875</td>      <td>17.02</td>\n<td>0</td>      <td>1</td>
    \     <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Datsun 710</td>      <td>22.8</td>
    \     <td>4</td>      <td>108.0</td>\n<td>93</td>      <td>3.85</td>      <td>2.320</td>
    \     <td>18.61</td>\n<td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>
    \   </tr>    <tr>\n<td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>
    \     <td>258.0</td>\n<td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>\n<td>1</td>
    \     <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet
    Sportabout</td>      <td>18.7</td>      <td>8</td>\n<td>360.0</td>      <td>175</td>
    \     <td>3.15</td>      <td>3.440</td>\n<td>17.02</td>      <td>0</td>      <td>0</td>
    \     <td>3</td>      <td>2</td>\n</tr>  </tbody></table>\n<h1 id=\"you-try-it\">You
    try it! <a class=\"header-anchor\" href=\"#you-try-it\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Crack open ipython and
    make a dataframe, then <code>df.to_html(classes=[&quot;table table-bordered table-dark&quot;])</code>,
    copy the output (minus the quote marks ipython uses to denote the string type)
    that into <code>my-file.html</code>, open that up in a browser and be amazed!</p>\n<blockquote>\n<p>For
    added effeciency try using pyperclip to copy the output right to your clipboard!</p>\n</blockquote>\n<p><code>pip
    install pyperclip</code> and then <code>pyperclip.copy(df.to_html(classes=[&quot;table
    table-bordered table-dark&quot;]))</code></p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Dataframe-To-Styled-Html</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I wrote up a little on exporting DataFrames
    to markdown and html [here](/dataframe-to-markdown) But I&#x27;ve been playing
    with a web app for with lists and whi\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Dataframe-To-Styled-Html | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataframe-to-styled-html\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Dataframe-To-Styled-Html | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)
    But I&#x27;ve been playing with a web app for with lists and whi\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Dataframe-To-Styled-Html</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-07\">\n            May
    07, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
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
  partial: "<section class=\"post-terminal  post-terminal--til \">\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Dataframe-To-Styled-Html</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-05-07\">\n            May 07, 2022\n        </time>\n    </div>\n
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
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>I
    wrote up a little on exporting DataFrames to markdown and html <a href=\"/dataframe-to-markdown\">here</a></p>\n<p>But
    I've been playing with a web app for with lists and while I'm toying around I
    learned you can actually give your tables some style with some simple css classes!</p>\n<h1
    id=\"to-html\">To HTML <a class=\"header-anchor\" href=\"#to-html\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Reminder that if you
    have a dataframe, <code>df</code>, you can <code>df.to_html()</code> to get an
    HTML table of your dataframe.</p>\n<p>Well you can pass some <code>classes</code>
    to make it look super nice!</p>\n<h1 id=\"classes-and-css\">Classes and CSS <a
    class=\"header-anchor\" href=\"#classes-and-css\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I don't know anything
    really about CSS so I won't pretend otherwise, but as I was learning about bootstrap
    that's where I stumbled upon this...</p>\n<p>There are several classes you can
    pass but I found really good luck with <code>table-bordered</code> and <code>table-dark</code>
    for my use case</p>\n<p><code>df.to_html(classes=[&quot;table table-bordered table-dark&quot;])</code></p>\n<table
    border=\"1\" class=\"dataframe table table-bordered table-dark\">  <thead>\n<tr
    style=\"text-align: right;\">      <th>Unnamed: 0</th>      <th>mpg</th>\n<th>cyl</th>
    \     <th>disp</th>      <th>hp</th>      <th>drat</th>\n<th>wt</th>      <th>qsec</th>
    \     <th>vs</th>      <th>am</th>\n<th>gear</th>      <th>carb</th>    </tr>
    \ </thead>  <tbody>    <tr>\n<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>
    \     <td>160.0</td>\n<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>\n<td>0</td>
    \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Mazda RX4
    Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>\n<td>110</td>
    \     <td>3.90</td>      <td>2.875</td>      <td>17.02</td>\n<td>0</td>      <td>1</td>
    \     <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Datsun 710</td>      <td>22.8</td>
    \     <td>4</td>      <td>108.0</td>\n<td>93</td>      <td>3.85</td>      <td>2.320</td>
    \     <td>18.61</td>\n<td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>
    \   </tr>    <tr>\n<td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>
    \     <td>258.0</td>\n<td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>\n<td>1</td>
    \     <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet
    Sportabout</td>      <td>18.7</td>      <td>8</td>\n<td>360.0</td>      <td>175</td>
    \     <td>3.15</td>      <td>3.440</td>\n<td>17.02</td>      <td>0</td>      <td>0</td>
    \     <td>3</td>      <td>2</td>\n</tr>  </tbody></table>\n<h1 id=\"you-try-it\">You
    try it! <a class=\"header-anchor\" href=\"#you-try-it\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Crack open ipython and
    make a dataframe, then <code>df.to_html(classes=[&quot;table table-bordered table-dark&quot;])</code>,
    copy the output (minus the quote marks ipython uses to denote the string type)
    that into <code>my-file.html</code>, open that up in a browser and be amazed!</p>\n<blockquote>\n<p>For
    added effeciency try using pyperclip to copy the output right to your clipboard!</p>\n</blockquote>\n<p><code>pip
    install pyperclip</code> and then <code>pyperclip.copy(df.to_html(classes=[&quot;table
    table-bordered table-dark&quot;]))</code></p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Dataframe-To-Styled-Html</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I wrote up a little on exporting DataFrames
    to markdown and html [here](/dataframe-to-markdown) But I&#x27;ve been playing
    with a web app for with lists and whi\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Dataframe-To-Styled-Html | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataframe-to-styled-html\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Dataframe-To-Styled-Html | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)
    But I&#x27;ve been playing with a web app for with lists and whi\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/dataframe-to-styled-html</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    Content is handled by the password protection plugin -->\n    <p>I wrote up a
    little on exporting DataFrames to markdown and html <a href=\"/dataframe-to-markdown\">here</a></p>\n<p>But
    I've been playing with a web app for with lists and while I'm toying around I
    learned you can actually give your tables some style with some simple css classes!</p>\n<h1
    id=\"to-html\">To HTML <a class=\"header-anchor\" href=\"#to-html\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Reminder that if you
    have a dataframe, <code>df</code>, you can <code>df.to_html()</code> to get an
    HTML table of your dataframe.</p>\n<p>Well you can pass some <code>classes</code>
    to make it look super nice!</p>\n<h1 id=\"classes-and-css\">Classes and CSS <a
    class=\"header-anchor\" href=\"#classes-and-css\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I don't know anything
    really about CSS so I won't pretend otherwise, but as I was learning about bootstrap
    that's where I stumbled upon this...</p>\n<p>There are several classes you can
    pass but I found really good luck with <code>table-bordered</code> and <code>table-dark</code>
    for my use case</p>\n<p><code>df.to_html(classes=[&quot;table table-bordered table-dark&quot;])</code></p>\n<table
    border=\"1\" class=\"dataframe table table-bordered table-dark\">  <thead>\n<tr
    style=\"text-align: right;\">      <th>Unnamed: 0</th>      <th>mpg</th>\n<th>cyl</th>
    \     <th>disp</th>      <th>hp</th>      <th>drat</th>\n<th>wt</th>      <th>qsec</th>
    \     <th>vs</th>      <th>am</th>\n<th>gear</th>      <th>carb</th>    </tr>
    \ </thead>  <tbody>    <tr>\n<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>
    \     <td>160.0</td>\n<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>\n<td>0</td>
    \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Mazda RX4
    Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>\n<td>110</td>
    \     <td>3.90</td>      <td>2.875</td>      <td>17.02</td>\n<td>0</td>      <td>1</td>
    \     <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Datsun 710</td>      <td>22.8</td>
    \     <td>4</td>      <td>108.0</td>\n<td>93</td>      <td>3.85</td>      <td>2.320</td>
    \     <td>18.61</td>\n<td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>
    \   </tr>    <tr>\n<td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>
    \     <td>258.0</td>\n<td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>\n<td>1</td>
    \     <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet
    Sportabout</td>      <td>18.7</td>      <td>8</td>\n<td>360.0</td>      <td>175</td>
    \     <td>3.15</td>      <td>3.440</td>\n<td>17.02</td>      <td>0</td>      <td>0</td>
    \     <td>3</td>      <td>2</td>\n</tr>  </tbody></table>\n<h1 id=\"you-try-it\">You
    try it! <a class=\"header-anchor\" href=\"#you-try-it\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Crack open ipython and
    make a dataframe, then <code>df.to_html(classes=[&quot;table table-bordered table-dark&quot;])</code>,
    copy the output (minus the quote marks ipython uses to denote the string type)
    that into <code>my-file.html</code>, open that up in a browser and be amazed!</p>\n<blockquote>\n<p>For
    added effeciency try using pyperclip to copy the output right to your clipboard!</p>\n</blockquote>\n<p><code>pip
    install pyperclip</code> and then <code>pyperclip.copy(df.to_html(classes=[&quot;table
    table-bordered table-dark&quot;]))</code></p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: til\ntags: ['python', 'tech', 'til']\ntitle: Dataframe-To-Styled-Html\ndate:
    2022-05-07T00:00:00\npublished: True\n#cover: \"media/dataframe-to-styled-html.png\"\n\n---\n\nI
    wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)\n\nBut
    I've been playing with a web app for with lists and while I'm toying around I
    learned you can actually give your tables some style with some simple css classes!
    \n\n# To HTML\n\nReminder that if you have a dataframe, `df`, you can `df.to_html()`
    to get an HTML table of your dataframe.\n\nWell you can pass some `classes` to
    make it look super nice!\n\n# Classes and CSS\n\nI don't know anything really
    about CSS so I won't pretend otherwise, but as I was learning about bootstrap
    that's where I stumbled upon this...\n\nThere are several classes you can pass
    but I found really good luck with `table-bordered` and `table-dark` for my use
    case\n\n`df.to_html(classes=[\"table table-bordered table-dark\"])`\n\n<table
    border=\"1\" class=\"dataframe table table-bordered table-dark\">  <thead>\n<tr
    style=\"text-align: right;\">      <th>Unnamed: 0</th>      <th>mpg</th>\n<th>cyl</th>
    \     <th>disp</th>      <th>hp</th>      <th>drat</th>\n<th>wt</th>      <th>qsec</th>
    \     <th>vs</th>      <th>am</th>\n<th>gear</th>      <th>carb</th>    </tr>
    \ </thead>  <tbody>    <tr>\n<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>
    \     <td>160.0</td>\n<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>\n<td>0</td>
    \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Mazda RX4
    Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>\n<td>110</td>
    \     <td>3.90</td>      <td>2.875</td>      <td>17.02</td>\n<td>0</td>      <td>1</td>
    \     <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Datsun 710</td>      <td>22.8</td>
    \     <td>4</td>      <td>108.0</td>\n<td>93</td>      <td>3.85</td>      <td>2.320</td>
    \     <td>18.61</td>\n<td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>
    \   </tr>    <tr>\n<td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>
    \     <td>258.0</td>\n<td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>\n<td>1</td>
    \     <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet
    Sportabout</td>      <td>18.7</td>      <td>8</td>\n<td>360.0</td>      <td>175</td>
    \     <td>3.15</td>      <td>3.440</td>\n<td>17.02</td>      <td>0</td>      <td>0</td>
    \     <td>3</td>      <td>2</td>\n</tr>  </tbody></table>\n\n\n# You try it!\n\nCrack
    open ipython and make a dataframe, then `df.to_html(classes=[\"table table-bordered
    table-dark\"])`, copy the output (minus the quote marks ipython uses to denote
    the string type) that into `my-file.html`, open that up in a browser and be amazed!\n\n>
    For added effeciency try using pyperclip to copy the output right to your clipboard!\n\n`pip
    install pyperclip` and then `pyperclip.copy(df.to_html(classes=[\"table table-bordered
    table-dark\"]))`\n"
published: true
slug: dataframe-to-styled-html
title: Dataframe-To-Styled-Html


---

I wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)

But I've been playing with a web app for with lists and while I'm toying around I learned you can actually give your tables some style with some simple css classes! 

# To HTML

Reminder that if you have a dataframe, `df`, you can `df.to_html()` to get an HTML table of your dataframe.

Well you can pass some `classes` to make it look super nice!

# Classes and CSS

I don't know anything really about CSS so I won't pretend otherwise, but as I was learning about bootstrap that's where I stumbled upon this...

There are several classes you can pass but I found really good luck with `table-bordered` and `table-dark` for my use case

`df.to_html(classes=["table table-bordered table-dark"])`

<table border="1" class="dataframe table table-bordered table-dark">  <thead>
<tr style="text-align: right;">      <th>Unnamed: 0</th>      <th>mpg</th>
<th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>
<th>wt</th>      <th>qsec</th>      <th>vs</th>      <th>am</th>
<th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>    <tr>
<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>
<td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
<td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
<td>110</td>      <td>3.90</td>      <td>2.875</td>      <td>17.02</td>
<td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
<td>Datsun 710</td>      <td>22.8</td>      <td>4</td>      <td>108.0</td>
<td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>
<td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>
<td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>
<td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>
<td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>
<td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>
<td>360.0</td>      <td>175</td>      <td>3.15</td>      <td>3.440</td>
<td>17.02</td>      <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>
</tr>  </tbody></table>


# You try it!

Crack open ipython and make a dataframe, then `df.to_html(classes=["table table-bordered table-dark"])`, copy the output (minus the quote marks ipython uses to denote the string type) that into `my-file.html`, open that up in a browser and be amazed!

> For added effeciency try using pyperclip to copy the output right to your clipboard!

`pip install pyperclip` and then `pyperclip.copy(df.to_html(classes=["table table-bordered table-dark"]))`