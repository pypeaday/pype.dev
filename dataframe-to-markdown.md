---
content: "# Pandas\n\n`pandas.DataFrame`s are pretty sweet data structures in Python.\n\nI
  do a lot of work with tabular data and one thing I have incorporated into some of
  that work is automatic data summary reports by throwing the first few, or several
  relevant, rows of a dataframe at a point in a pipeline into a markdown file.\n\nPandas
  has a method on DataFrames that makes this 100% trivial!\n\n# The Method\n\nSay
  we have a dataframe, `df`... then it's literally just: `df.to_markdown()`\n\n```python\n\u276F
  df.head()\n\n          Unnamed: 0   mpg  cyl   disp   hp  drat     wt   qsec  vs
  \ am  gear  carb\n0          Mazda RX4  21.0    6  160.0  110  3.90  2.620  16.46
  \  0   1     4     4\n1      Mazda RX4 Wag  21.0    6  160.0  110  3.90  2.875  17.02
  \  0   1     4     4\n2         Datsun 710  22.8    4  108.0   93  3.85  2.320  18.61
  \  1   1     4     1\n3     Hornet 4 Drive  21.4    6  258.0  110  3.08  3.215  19.44
  \  1   0     3     1\n4  Hornet Sportabout  18.7    8  360.0  175  3.15  3.440  17.02
  \  0   0     3     2\n\n```\n\nIn ipython I can call the method and get a markdown
  table back as a string\n\n```python\n\nmental-data-lake \uF7A1  new-posts via 3.8.11(mental-data-lake)
  ipython\n\u276F df.head().to_markdown()\n'|    | Unnamed: 0        |   mpg |   cyl
  |   disp |   hp |   drat |    wt |   qsec |   vs |   am |   gear |   carb |\\n|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|\\n|
  \ 0 | Mazda RX4         |  21   |     6 |    160 |  110 |   3.9  | 2.62  |  16.46
  |    0 |    1 |      4 |      4 |\\n|  1 | Mazda RX4 Wag     |  21   |     6 |    160
  |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |\\n|  2 | Datsun
  710        |  22.8 |     4 |    108 |   93 |   3.85 | 2.32  |  18.61 |    1 |    1
  |      4 |      1 |\\n|  3 | Hornet 4 Drive    |  21.4 |     6 |    258 |  110 |
  \  3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |\\n|  4 | Hornet Sportabout
  |  18.7 |     8 |    360 |  175 |   3.15 | 3.44  |  17.02 |    0 |    0 |      3
  |      2 |'\n\n```\n\nYou can drop that string into a markdown file and using any
  reader that supports the rendering you'll have a nicely formated table of example
  data in whatever report you're making!\n\n# Bonus method\n\nJust like markdown,
  you can export a dataframe to html with `df.to_html()` and use that if it's more
  appropriate for your use case:\n\n```text\n\n'<table border=\"1\" class=\"dataframe\">\\n
  \ <thead>\\n    <tr style=\"text-align: right;\">\\n      <th></th>\\n      <th>Unnamed:
  0</th>\\n      <th>mpg</th>\\n      <th>cyl</th>\\n      <th>disp</th>\\n      <th>hp</th>\\n
  \     <th>drat</th>\\n      <th>wt</th>\\n      <th>qsec</th>\\n      <th>vs</th>\\n
  \     <th>am</th>\\n      <th>gear</th>\\n      <th>carb</th>\\n    </tr>\\n  </thead>\\n
  \ <tbody>\\n    <tr>\\n      <th>0</th>\\n      <td>Mazda RX4</td>\\n      <td>21.0</td>\\n
  \     <td>6</td>\\n      <td>160.0</td>\\n      <td>110</td>\\n      <td>3.90</td>\\n
  \     <td>2.620</td>\\n      <td>16.46</td>\\n      <td>0</td>\\n      <td>1</td>\\n
  \     <td>4</td>\\n      <td>4</td>\\n    </tr>\\n    <tr>\\n      <th>1</th>\\n
  \     <td>Mazda RX4 Wag</td>\\n      <td>21.0</td>\\n      <td>6</td>\\n      <td>160.0</td>\\n
  \     <td>110</td>\\n      <td>3.90</td>\\n      <td>2.875</td>\\n      <td>17.02</td>\\n
  \     <td>0</td>\\n      <td>1</td>\\n      <td>4</td>\\n      <td>4</td>\\n    </tr>\\n
  \   <tr>\\n      <th>2</th>\\n      <td>Datsun 710</td>\\n      <td>22.8</td>\\n
  \     <td>4</td>\\n      <td>108.0</td>\\n      <td>93</td>\\n      <td>3.85</td>\\n
  \     <td>2.320</td>\\n      <td>18.61</td>\\n      <td>1</td>\\n      <td>1</td>\\n
  \     <td>4</td>\\n      <td>1</td>\\n    </tr>\\n    <tr>\\n      <th>3</th>\\n
  \     <td>Hornet 4 Drive</td>\\n      <td>21.4</td>\\n      <td>6</td>\\n      <td>258.0</td>\\n
  \     <td>110</td>\\n      <td>3.08</td>\\n      <td>3.215</td>\\n      <td>19.44</td>\\n
  \     <td>1</td>\\n      <td>0</td>\\n      <td>3</td>\\n      <td>1</td>\\n    </tr>\\n
  \   <tr>\\n      <th>4</th>\\n      <td>Hornet Sportabout</td>\\n      <td>18.7</td>\\n
  \     <td>8</td>\\n      <td>360.0</td>\\n      <td>175</td>\\n      <td>3.15</td>\\n
  \     <td>3.440</td>\\n      <td>17.02</td>\\n      <td>0</td>\\n      <td>0</td>\\n
  \     <td>3</td>\\n      <td>2</td>\\n    </tr>\\n  </tbody>\\n</table>'\n\n```\n\nMy
  blog will render that html into a nice table! (After removing new line characters)\n\n<table
  border=\"1\" class=\"dataframe\">  <thead>    <tr style=\"text-align: right;\">
  \     <th>Unnamed: 0</th>      <th>mpg</th>      <th>cyl</th>      <th>disp</th>
  \     <th>hp</th>      <th>drat</th>      <th>wt</th>      <th>qsec</th>      <th>vs</th>
  \     <th>am</th>      <th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>
  \   <tr>      <td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
  \     <td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>      <td>0</td>
  \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Mazda
  RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>      <td>110</td>
  \     <td>3.90</td>      <td>2.875</td>      <td>17.02</td>      <td>0</td>      <td>1</td>
  \     <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Datsun 710</td>      <td>22.8</td>
  \     <td>4</td>      <td>108.0</td>      <td>93</td>      <td>3.85</td>      <td>2.320</td>
  \     <td>18.61</td>      <td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>
  \   </tr>    <tr>      <td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>
  \     <td>258.0</td>      <td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>
  \     <td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>
  \     <td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>      <td>360.0</td>
  \     <td>175</td>      <td>3.15</td>      <td>3.440</td>      <td>17.02</td>      <td>0</td>
  \     <td>0</td>      <td>3</td>      <td>2</td>    </tr>  </tbody></table>"
date: 2022-05-07
description: 'Pandas `pandas.DataFrame`s are pretty sweet data structures in Python.
  I do a lot of work with tabular data and one thing I have incorporated into some
  of that '
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Dataframe-To-Markdown</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Pandas `pandas.DataFrame`s are pretty
    sweet data structures in Python. I do a lot of work with tabular data and one
    thing I have incorporated into some of that \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Dataframe-To-Markdown
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://pype.dev//media/dataframe-to-markdown.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataframe-to-markdown\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Dataframe-To-Markdown | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Pandas `pandas.DataFrame`s are pretty sweet data structures in Python.
    I do a lot of work with tabular data and one thing I have incorporated into some
    of that \" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/dataframe-to-markdown.png\"
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
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"/media/dataframe-to-markdown.png\"
    \n            alt=\"Dataframe-To-Markdown cover image\" \n            class=\"boundary-break-image\"\n
    \       >\n    </div>\n</div>\n\n<article class='w-full pattern-card glow-card
    p-4 md:p-6 post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Dataframe-To-Markdown</h1>\n
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
    \   <section class=\"article-content prose dark:prose-invert mx-auto mt-8\">\n
    \       <h1 id=\"pandas\">Pandas <a class=\"header-anchor\" href=\"#pandas\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><code>pandas.DataFrame</code>s
    are pretty sweet data structures in Python.</p>\n<p>I do a lot of work with tabular
    data and one thing I have incorporated into some of that work is automatic data
    summary reports by throwing the first few, or several relevant, rows of a dataframe
    at a point in a pipeline into a markdown file.</p>\n<p>Pandas has a method on
    DataFrames that makes this 100% trivial!</p>\n<h1 id=\"the-method\">The Method
    <a class=\"header-anchor\" href=\"#the-method\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Say we have a dataframe,
    <code>df</code>... then it's literally just: <code>df.to_markdown()</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">head</span><span
    class=\"p\">()</span>\n\n          <span class=\"n\">Unnamed</span><span class=\"p\">:</span>
    <span class=\"mi\">0</span>   <span class=\"n\">mpg</span>  <span class=\"n\">cyl</span>
    \  <span class=\"n\">disp</span>   <span class=\"n\">hp</span>  <span class=\"n\">drat</span>
    \    <span class=\"n\">wt</span>   <span class=\"n\">qsec</span>  <span class=\"n\">vs</span>
    \ <span class=\"n\">am</span>  <span class=\"n\">gear</span>  <span class=\"n\">carb</span>\n<span
    class=\"mi\">0</span>          <span class=\"n\">Mazda</span> <span class=\"n\">RX4</span>
    \ <span class=\"mf\">21.0</span>    <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.90</span>  <span class=\"mf\">2.620</span>
    \ <span class=\"mf\">16.46</span>   <span class=\"mi\">0</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">4</span>\n<span class=\"mi\">1</span>
    \     <span class=\"n\">Mazda</span> <span class=\"n\">RX4</span> <span class=\"n\">Wag</span>
    \ <span class=\"mf\">21.0</span>    <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.90</span>  <span class=\"mf\">2.875</span>
    \ <span class=\"mf\">17.02</span>   <span class=\"mi\">0</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">4</span>\n<span class=\"mi\">2</span>
    \        <span class=\"n\">Datsun</span> <span class=\"mi\">710</span>  <span
    class=\"mf\">22.8</span>    <span class=\"mi\">4</span>  <span class=\"mf\">108.0</span>
    \  <span class=\"mi\">93</span>  <span class=\"mf\">3.85</span>  <span class=\"mf\">2.320</span>
    \ <span class=\"mf\">18.61</span>   <span class=\"mi\">1</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">1</span>\n<span class=\"mi\">3</span>
    \    <span class=\"n\">Hornet</span> <span class=\"mi\">4</span> <span class=\"n\">Drive</span>
    \ <span class=\"mf\">21.4</span>    <span class=\"mi\">6</span>  <span class=\"mf\">258.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.08</span>  <span class=\"mf\">3.215</span>
    \ <span class=\"mf\">19.44</span>   <span class=\"mi\">1</span>   <span class=\"mi\">0</span>
    \    <span class=\"mi\">3</span>     <span class=\"mi\">1</span>\n<span class=\"mi\">4</span>
    \ <span class=\"n\">Hornet</span> <span class=\"n\">Sportabout</span>  <span class=\"mf\">18.7</span>
    \   <span class=\"mi\">8</span>  <span class=\"mf\">360.0</span>  <span class=\"mi\">175</span>
    \ <span class=\"mf\">3.15</span>  <span class=\"mf\">3.440</span>  <span class=\"mf\">17.02</span>
    \  <span class=\"mi\">0</span>   <span class=\"mi\">0</span>     <span class=\"mi\">3</span>
    \    <span class=\"mi\">2</span>\n</pre></div>\n\n</pre>\n\n<p>In ipython I can
    call the method and get a markdown table back as a string</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">mental</span><span
    class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
    class=\"n\">lake</span> <span class=\"err\">\uF7A1</span>  <span class=\"n\">new</span><span
    class=\"o\">-</span><span class=\"n\">posts</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">mental</span><span
    class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
    class=\"n\">lake</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"n\">df</span><span class=\"o\">.</span><span
    class=\"n\">head</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"n\">to_markdown</span><span class=\"p\">()</span>\n<span class=\"s1\">&#39;|
    \   | Unnamed: 0        |   mpg |   cyl |   disp |   hp |   drat |    wt |   qsec
    |   vs |   am |   gear |   carb |</span><span class=\"se\">\\n</span><span class=\"s1\">|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  0 | Mazda RX4         |  21   |     6
    |    160 |  110 |   3.9  | 2.62  |  16.46 |    0 |    1 |      4 |      4 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  1 | Mazda RX4 Wag     |  21   |     6
    |    160 |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  2 | Datsun 710        |  22.8 |     4
    |    108 |   93 |   3.85 | 2.32  |  18.61 |    1 |    1 |      4 |      1 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  3 | Hornet 4 Drive    |  21.4 |     6
    |    258 |  110 |   3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  4 | Hornet Sportabout |  18.7 |     8
    |    360 |  175 |   3.15 | 3.44  |  17.02 |    0 |    0 |      3 |      2 |&#39;</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can drop that string into a markdown file and using any reader that supports the
    rendering you'll have a nicely formated table of example data in whatever report
    you're making!</p>\n<h1 id=\"bonus-method\">Bonus method <a class=\"header-anchor\"
    href=\"#bonus-method\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Just like markdown,
    you can export a dataframe to html with <code>df.to_html()</code> and use that
    if it's more appropriate for your use case:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>&#39;&lt;table border=&quot;1&quot;
    class=&quot;dataframe&quot;&gt;\\n  &lt;thead&gt;\\n    &lt;tr style=&quot;text-align:
    right;&quot;&gt;\\n      &lt;th&gt;&lt;/th&gt;\\n      &lt;th&gt;Unnamed: 0&lt;/th&gt;\\n
    \     &lt;th&gt;mpg&lt;/th&gt;\\n      &lt;th&gt;cyl&lt;/th&gt;\\n      &lt;th&gt;disp&lt;/th&gt;\\n
    \     &lt;th&gt;hp&lt;/th&gt;\\n      &lt;th&gt;drat&lt;/th&gt;\\n      &lt;th&gt;wt&lt;/th&gt;\\n
    \     &lt;th&gt;qsec&lt;/th&gt;\\n      &lt;th&gt;vs&lt;/th&gt;\\n      &lt;th&gt;am&lt;/th&gt;\\n
    \     &lt;th&gt;gear&lt;/th&gt;\\n      &lt;th&gt;carb&lt;/th&gt;\\n    &lt;/tr&gt;\\n
    \ &lt;/thead&gt;\\n  &lt;tbody&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;0&lt;/th&gt;\\n
    \     &lt;td&gt;Mazda RX4&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
    \     &lt;td&gt;2.620&lt;/td&gt;\\n      &lt;td&gt;16.46&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;1&lt;/th&gt;\\n      &lt;td&gt;Mazda
    RX4 Wag&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
    \     &lt;td&gt;2.875&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;2&lt;/th&gt;\\n      &lt;td&gt;Datsun
    710&lt;/td&gt;\\n      &lt;td&gt;22.8&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \     &lt;td&gt;108.0&lt;/td&gt;\\n      &lt;td&gt;93&lt;/td&gt;\\n      &lt;td&gt;3.85&lt;/td&gt;\\n
    \     &lt;td&gt;2.320&lt;/td&gt;\\n      &lt;td&gt;18.61&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;3&lt;/th&gt;\\n      &lt;td&gt;Hornet
    4 Drive&lt;/td&gt;\\n      &lt;td&gt;21.4&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;258.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.08&lt;/td&gt;\\n
    \     &lt;td&gt;3.215&lt;/td&gt;\\n      &lt;td&gt;19.44&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;4&lt;/th&gt;\\n      &lt;td&gt;Hornet
    Sportabout&lt;/td&gt;\\n      &lt;td&gt;18.7&lt;/td&gt;\\n      &lt;td&gt;8&lt;/td&gt;\\n
    \     &lt;td&gt;360.0&lt;/td&gt;\\n      &lt;td&gt;175&lt;/td&gt;\\n      &lt;td&gt;3.15&lt;/td&gt;\\n
    \     &lt;td&gt;3.440&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;2&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n  &lt;/tbody&gt;\\n&lt;/table&gt;&#39;\n</pre></div>\n\n</pre>\n\n<p>My
    blog will render that html into a nice table! (After removing new line characters)</p>\n<table
    border=\"1\" class=\"dataframe\">  <thead>    <tr style=\"text-align: right;\">
    \     <th>Unnamed: 0</th>      <th>mpg</th>      <th>cyl</th>      <th>disp</th>
    \     <th>hp</th>      <th>drat</th>      <th>wt</th>      <th>qsec</th>      <th>vs</th>
    \     <th>am</th>      <th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>
    \   <tr>      <td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
    \     <td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>
    \     <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
    \     <td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
    \     <td>110</td>      <td>3.90</td>      <td>2.875</td>      <td>17.02</td>
    \     <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
    \     <td>Datsun 710</td>      <td>22.8</td>      <td>4</td>      <td>108.0</td>
    \     <td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>      <td>1</td>
    \     <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>      <td>Hornet
    4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>      <td>110</td>
    \     <td>3.08</td>      <td>3.215</td>      <td>19.44</td>      <td>1</td>      <td>0</td>
    \     <td>3</td>      <td>1</td>    </tr>    <tr>      <td>Hornet Sportabout</td>
    \     <td>18.7</td>      <td>8</td>      <td>360.0</td>      <td>175</td>      <td>3.15</td>
    \     <td>3.440</td>      <td>17.02</td>      <td>0</td>      <td>0</td>      <td>3</td>
    \     <td>2</td>    </tr>  </tbody></table>\n    </section>\n</article>        </div>\n
    \   </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Dataframe-To-Markdown</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Pandas `pandas.DataFrame`s are pretty
    sweet data structures in Python. I do a lot of work with tabular data and one
    thing I have incorporated into some of that \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Dataframe-To-Markdown
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://pype.dev//media/dataframe-to-markdown.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataframe-to-markdown\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Dataframe-To-Markdown | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Pandas `pandas.DataFrame`s are pretty sweet data structures in Python.
    I do a lot of work with tabular data and one thing I have incorporated into some
    of that \" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/dataframe-to-markdown.png\"
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
    mb-4 post-title-large\">Dataframe-To-Markdown</h1>\n    <div class=\"flex items-center
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
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"/media/dataframe-to-markdown.png\"
    \n            alt=\"Dataframe-To-Markdown cover image\" \n            class=\"boundary-break-image\"\n
    \       >\n    </div>\n</div>\n\n<article class='w-full pattern-card glow-card
    p-4 md:p-6 post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Dataframe-To-Markdown</h1>\n
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
    \   <section class=\"article-content prose dark:prose-invert mx-auto mt-8\">\n
    \       <h1 id=\"pandas\">Pandas <a class=\"header-anchor\" href=\"#pandas\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><code>pandas.DataFrame</code>s
    are pretty sweet data structures in Python.</p>\n<p>I do a lot of work with tabular
    data and one thing I have incorporated into some of that work is automatic data
    summary reports by throwing the first few, or several relevant, rows of a dataframe
    at a point in a pipeline into a markdown file.</p>\n<p>Pandas has a method on
    DataFrames that makes this 100% trivial!</p>\n<h1 id=\"the-method\">The Method
    <a class=\"header-anchor\" href=\"#the-method\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Say we have a dataframe,
    <code>df</code>... then it's literally just: <code>df.to_markdown()</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">head</span><span
    class=\"p\">()</span>\n\n          <span class=\"n\">Unnamed</span><span class=\"p\">:</span>
    <span class=\"mi\">0</span>   <span class=\"n\">mpg</span>  <span class=\"n\">cyl</span>
    \  <span class=\"n\">disp</span>   <span class=\"n\">hp</span>  <span class=\"n\">drat</span>
    \    <span class=\"n\">wt</span>   <span class=\"n\">qsec</span>  <span class=\"n\">vs</span>
    \ <span class=\"n\">am</span>  <span class=\"n\">gear</span>  <span class=\"n\">carb</span>\n<span
    class=\"mi\">0</span>          <span class=\"n\">Mazda</span> <span class=\"n\">RX4</span>
    \ <span class=\"mf\">21.0</span>    <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.90</span>  <span class=\"mf\">2.620</span>
    \ <span class=\"mf\">16.46</span>   <span class=\"mi\">0</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">4</span>\n<span class=\"mi\">1</span>
    \     <span class=\"n\">Mazda</span> <span class=\"n\">RX4</span> <span class=\"n\">Wag</span>
    \ <span class=\"mf\">21.0</span>    <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.90</span>  <span class=\"mf\">2.875</span>
    \ <span class=\"mf\">17.02</span>   <span class=\"mi\">0</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">4</span>\n<span class=\"mi\">2</span>
    \        <span class=\"n\">Datsun</span> <span class=\"mi\">710</span>  <span
    class=\"mf\">22.8</span>    <span class=\"mi\">4</span>  <span class=\"mf\">108.0</span>
    \  <span class=\"mi\">93</span>  <span class=\"mf\">3.85</span>  <span class=\"mf\">2.320</span>
    \ <span class=\"mf\">18.61</span>   <span class=\"mi\">1</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">1</span>\n<span class=\"mi\">3</span>
    \    <span class=\"n\">Hornet</span> <span class=\"mi\">4</span> <span class=\"n\">Drive</span>
    \ <span class=\"mf\">21.4</span>    <span class=\"mi\">6</span>  <span class=\"mf\">258.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.08</span>  <span class=\"mf\">3.215</span>
    \ <span class=\"mf\">19.44</span>   <span class=\"mi\">1</span>   <span class=\"mi\">0</span>
    \    <span class=\"mi\">3</span>     <span class=\"mi\">1</span>\n<span class=\"mi\">4</span>
    \ <span class=\"n\">Hornet</span> <span class=\"n\">Sportabout</span>  <span class=\"mf\">18.7</span>
    \   <span class=\"mi\">8</span>  <span class=\"mf\">360.0</span>  <span class=\"mi\">175</span>
    \ <span class=\"mf\">3.15</span>  <span class=\"mf\">3.440</span>  <span class=\"mf\">17.02</span>
    \  <span class=\"mi\">0</span>   <span class=\"mi\">0</span>     <span class=\"mi\">3</span>
    \    <span class=\"mi\">2</span>\n</pre></div>\n\n</pre>\n\n<p>In ipython I can
    call the method and get a markdown table back as a string</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">mental</span><span
    class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
    class=\"n\">lake</span> <span class=\"err\">\uF7A1</span>  <span class=\"n\">new</span><span
    class=\"o\">-</span><span class=\"n\">posts</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">mental</span><span
    class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
    class=\"n\">lake</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"n\">df</span><span class=\"o\">.</span><span
    class=\"n\">head</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"n\">to_markdown</span><span class=\"p\">()</span>\n<span class=\"s1\">&#39;|
    \   | Unnamed: 0        |   mpg |   cyl |   disp |   hp |   drat |    wt |   qsec
    |   vs |   am |   gear |   carb |</span><span class=\"se\">\\n</span><span class=\"s1\">|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  0 | Mazda RX4         |  21   |     6
    |    160 |  110 |   3.9  | 2.62  |  16.46 |    0 |    1 |      4 |      4 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  1 | Mazda RX4 Wag     |  21   |     6
    |    160 |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  2 | Datsun 710        |  22.8 |     4
    |    108 |   93 |   3.85 | 2.32  |  18.61 |    1 |    1 |      4 |      1 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  3 | Hornet 4 Drive    |  21.4 |     6
    |    258 |  110 |   3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  4 | Hornet Sportabout |  18.7 |     8
    |    360 |  175 |   3.15 | 3.44  |  17.02 |    0 |    0 |      3 |      2 |&#39;</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can drop that string into a markdown file and using any reader that supports the
    rendering you'll have a nicely formated table of example data in whatever report
    you're making!</p>\n<h1 id=\"bonus-method\">Bonus method <a class=\"header-anchor\"
    href=\"#bonus-method\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Just like markdown,
    you can export a dataframe to html with <code>df.to_html()</code> and use that
    if it's more appropriate for your use case:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>&#39;&lt;table border=&quot;1&quot;
    class=&quot;dataframe&quot;&gt;\\n  &lt;thead&gt;\\n    &lt;tr style=&quot;text-align:
    right;&quot;&gt;\\n      &lt;th&gt;&lt;/th&gt;\\n      &lt;th&gt;Unnamed: 0&lt;/th&gt;\\n
    \     &lt;th&gt;mpg&lt;/th&gt;\\n      &lt;th&gt;cyl&lt;/th&gt;\\n      &lt;th&gt;disp&lt;/th&gt;\\n
    \     &lt;th&gt;hp&lt;/th&gt;\\n      &lt;th&gt;drat&lt;/th&gt;\\n      &lt;th&gt;wt&lt;/th&gt;\\n
    \     &lt;th&gt;qsec&lt;/th&gt;\\n      &lt;th&gt;vs&lt;/th&gt;\\n      &lt;th&gt;am&lt;/th&gt;\\n
    \     &lt;th&gt;gear&lt;/th&gt;\\n      &lt;th&gt;carb&lt;/th&gt;\\n    &lt;/tr&gt;\\n
    \ &lt;/thead&gt;\\n  &lt;tbody&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;0&lt;/th&gt;\\n
    \     &lt;td&gt;Mazda RX4&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
    \     &lt;td&gt;2.620&lt;/td&gt;\\n      &lt;td&gt;16.46&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;1&lt;/th&gt;\\n      &lt;td&gt;Mazda
    RX4 Wag&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
    \     &lt;td&gt;2.875&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;2&lt;/th&gt;\\n      &lt;td&gt;Datsun
    710&lt;/td&gt;\\n      &lt;td&gt;22.8&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \     &lt;td&gt;108.0&lt;/td&gt;\\n      &lt;td&gt;93&lt;/td&gt;\\n      &lt;td&gt;3.85&lt;/td&gt;\\n
    \     &lt;td&gt;2.320&lt;/td&gt;\\n      &lt;td&gt;18.61&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;3&lt;/th&gt;\\n      &lt;td&gt;Hornet
    4 Drive&lt;/td&gt;\\n      &lt;td&gt;21.4&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;258.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.08&lt;/td&gt;\\n
    \     &lt;td&gt;3.215&lt;/td&gt;\\n      &lt;td&gt;19.44&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;4&lt;/th&gt;\\n      &lt;td&gt;Hornet
    Sportabout&lt;/td&gt;\\n      &lt;td&gt;18.7&lt;/td&gt;\\n      &lt;td&gt;8&lt;/td&gt;\\n
    \     &lt;td&gt;360.0&lt;/td&gt;\\n      &lt;td&gt;175&lt;/td&gt;\\n      &lt;td&gt;3.15&lt;/td&gt;\\n
    \     &lt;td&gt;3.440&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;2&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n  &lt;/tbody&gt;\\n&lt;/table&gt;&#39;\n</pre></div>\n\n</pre>\n\n<p>My
    blog will render that html into a nice table! (After removing new line characters)</p>\n<table
    border=\"1\" class=\"dataframe\">  <thead>    <tr style=\"text-align: right;\">
    \     <th>Unnamed: 0</th>      <th>mpg</th>      <th>cyl</th>      <th>disp</th>
    \     <th>hp</th>      <th>drat</th>      <th>wt</th>      <th>qsec</th>      <th>vs</th>
    \     <th>am</th>      <th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>
    \   <tr>      <td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
    \     <td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>
    \     <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
    \     <td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
    \     <td>110</td>      <td>3.90</td>      <td>2.875</td>      <td>17.02</td>
    \     <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
    \     <td>Datsun 710</td>      <td>22.8</td>      <td>4</td>      <td>108.0</td>
    \     <td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>      <td>1</td>
    \     <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>      <td>Hornet
    4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>      <td>110</td>
    \     <td>3.08</td>      <td>3.215</td>      <td>19.44</td>      <td>1</td>      <td>0</td>
    \     <td>3</td>      <td>1</td>    </tr>    <tr>      <td>Hornet Sportabout</td>
    \     <td>18.7</td>      <td>8</td>      <td>360.0</td>      <td>175</td>      <td>3.15</td>
    \     <td>3.440</td>      <td>17.02</td>      <td>0</td>      <td>0</td>      <td>3</td>
    \     <td>2</td>    </tr>  </tbody></table>\n    </section>\n</article>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Dataframe-To-Markdown</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Pandas `pandas.DataFrame`s are pretty
    sweet data structures in Python. I do a lot of work with tabular data and one
    thing I have incorporated into some of that \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Dataframe-To-Markdown
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://pype.dev//media/dataframe-to-markdown.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataframe-to-markdown\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Dataframe-To-Markdown | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Pandas `pandas.DataFrame`s are pretty sweet data structures in Python.
    I do a lot of work with tabular data and one thing I have incorporated into some
    of that \" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/dataframe-to-markdown.png\"
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    <!--
    Content is handled by the password protection plugin -->\n    <h1 id=\"pandas\">Pandas
    <a class=\"header-anchor\" href=\"#pandas\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><code>pandas.DataFrame</code>s
    are pretty sweet data structures in Python.</p>\n<p>I do a lot of work with tabular
    data and one thing I have incorporated into some of that work is automatic data
    summary reports by throwing the first few, or several relevant, rows of a dataframe
    at a point in a pipeline into a markdown file.</p>\n<p>Pandas has a method on
    DataFrames that makes this 100% trivial!</p>\n<h1 id=\"the-method\">The Method
    <a class=\"header-anchor\" href=\"#the-method\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Say we have a dataframe,
    <code>df</code>... then it's literally just: <code>df.to_markdown()</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">head</span><span
    class=\"p\">()</span>\n\n          <span class=\"n\">Unnamed</span><span class=\"p\">:</span>
    <span class=\"mi\">0</span>   <span class=\"n\">mpg</span>  <span class=\"n\">cyl</span>
    \  <span class=\"n\">disp</span>   <span class=\"n\">hp</span>  <span class=\"n\">drat</span>
    \    <span class=\"n\">wt</span>   <span class=\"n\">qsec</span>  <span class=\"n\">vs</span>
    \ <span class=\"n\">am</span>  <span class=\"n\">gear</span>  <span class=\"n\">carb</span>\n<span
    class=\"mi\">0</span>          <span class=\"n\">Mazda</span> <span class=\"n\">RX4</span>
    \ <span class=\"mf\">21.0</span>    <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.90</span>  <span class=\"mf\">2.620</span>
    \ <span class=\"mf\">16.46</span>   <span class=\"mi\">0</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">4</span>\n<span class=\"mi\">1</span>
    \     <span class=\"n\">Mazda</span> <span class=\"n\">RX4</span> <span class=\"n\">Wag</span>
    \ <span class=\"mf\">21.0</span>    <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.90</span>  <span class=\"mf\">2.875</span>
    \ <span class=\"mf\">17.02</span>   <span class=\"mi\">0</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">4</span>\n<span class=\"mi\">2</span>
    \        <span class=\"n\">Datsun</span> <span class=\"mi\">710</span>  <span
    class=\"mf\">22.8</span>    <span class=\"mi\">4</span>  <span class=\"mf\">108.0</span>
    \  <span class=\"mi\">93</span>  <span class=\"mf\">3.85</span>  <span class=\"mf\">2.320</span>
    \ <span class=\"mf\">18.61</span>   <span class=\"mi\">1</span>   <span class=\"mi\">1</span>
    \    <span class=\"mi\">4</span>     <span class=\"mi\">1</span>\n<span class=\"mi\">3</span>
    \    <span class=\"n\">Hornet</span> <span class=\"mi\">4</span> <span class=\"n\">Drive</span>
    \ <span class=\"mf\">21.4</span>    <span class=\"mi\">6</span>  <span class=\"mf\">258.0</span>
    \ <span class=\"mi\">110</span>  <span class=\"mf\">3.08</span>  <span class=\"mf\">3.215</span>
    \ <span class=\"mf\">19.44</span>   <span class=\"mi\">1</span>   <span class=\"mi\">0</span>
    \    <span class=\"mi\">3</span>     <span class=\"mi\">1</span>\n<span class=\"mi\">4</span>
    \ <span class=\"n\">Hornet</span> <span class=\"n\">Sportabout</span>  <span class=\"mf\">18.7</span>
    \   <span class=\"mi\">8</span>  <span class=\"mf\">360.0</span>  <span class=\"mi\">175</span>
    \ <span class=\"mf\">3.15</span>  <span class=\"mf\">3.440</span>  <span class=\"mf\">17.02</span>
    \  <span class=\"mi\">0</span>   <span class=\"mi\">0</span>     <span class=\"mi\">3</span>
    \    <span class=\"mi\">2</span>\n</pre></div>\n\n</pre>\n\n<p>In ipython I can
    call the method and get a markdown table back as a string</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">mental</span><span
    class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
    class=\"n\">lake</span> <span class=\"err\">\uF7A1</span>  <span class=\"n\">new</span><span
    class=\"o\">-</span><span class=\"n\">posts</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">mental</span><span
    class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
    class=\"n\">lake</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"n\">df</span><span class=\"o\">.</span><span
    class=\"n\">head</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"n\">to_markdown</span><span class=\"p\">()</span>\n<span class=\"s1\">&#39;|
    \   | Unnamed: 0        |   mpg |   cyl |   disp |   hp |   drat |    wt |   qsec
    |   vs |   am |   gear |   carb |</span><span class=\"se\">\\n</span><span class=\"s1\">|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  0 | Mazda RX4         |  21   |     6
    |    160 |  110 |   3.9  | 2.62  |  16.46 |    0 |    1 |      4 |      4 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  1 | Mazda RX4 Wag     |  21   |     6
    |    160 |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  2 | Datsun 710        |  22.8 |     4
    |    108 |   93 |   3.85 | 2.32  |  18.61 |    1 |    1 |      4 |      1 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  3 | Hornet 4 Drive    |  21.4 |     6
    |    258 |  110 |   3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |</span><span
    class=\"se\">\\n</span><span class=\"s1\">|  4 | Hornet Sportabout |  18.7 |     8
    |    360 |  175 |   3.15 | 3.44  |  17.02 |    0 |    0 |      3 |      2 |&#39;</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can drop that string into a markdown file and using any reader that supports the
    rendering you'll have a nicely formated table of example data in whatever report
    you're making!</p>\n<h1 id=\"bonus-method\">Bonus method <a class=\"header-anchor\"
    href=\"#bonus-method\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Just like markdown,
    you can export a dataframe to html with <code>df.to_html()</code> and use that
    if it's more appropriate for your use case:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>&#39;&lt;table border=&quot;1&quot;
    class=&quot;dataframe&quot;&gt;\\n  &lt;thead&gt;\\n    &lt;tr style=&quot;text-align:
    right;&quot;&gt;\\n      &lt;th&gt;&lt;/th&gt;\\n      &lt;th&gt;Unnamed: 0&lt;/th&gt;\\n
    \     &lt;th&gt;mpg&lt;/th&gt;\\n      &lt;th&gt;cyl&lt;/th&gt;\\n      &lt;th&gt;disp&lt;/th&gt;\\n
    \     &lt;th&gt;hp&lt;/th&gt;\\n      &lt;th&gt;drat&lt;/th&gt;\\n      &lt;th&gt;wt&lt;/th&gt;\\n
    \     &lt;th&gt;qsec&lt;/th&gt;\\n      &lt;th&gt;vs&lt;/th&gt;\\n      &lt;th&gt;am&lt;/th&gt;\\n
    \     &lt;th&gt;gear&lt;/th&gt;\\n      &lt;th&gt;carb&lt;/th&gt;\\n    &lt;/tr&gt;\\n
    \ &lt;/thead&gt;\\n  &lt;tbody&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;0&lt;/th&gt;\\n
    \     &lt;td&gt;Mazda RX4&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
    \     &lt;td&gt;2.620&lt;/td&gt;\\n      &lt;td&gt;16.46&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;1&lt;/th&gt;\\n      &lt;td&gt;Mazda
    RX4 Wag&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
    \     &lt;td&gt;2.875&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;2&lt;/th&gt;\\n      &lt;td&gt;Datsun
    710&lt;/td&gt;\\n      &lt;td&gt;22.8&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
    \     &lt;td&gt;108.0&lt;/td&gt;\\n      &lt;td&gt;93&lt;/td&gt;\\n      &lt;td&gt;3.85&lt;/td&gt;\\n
    \     &lt;td&gt;2.320&lt;/td&gt;\\n      &lt;td&gt;18.61&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;3&lt;/th&gt;\\n      &lt;td&gt;Hornet
    4 Drive&lt;/td&gt;\\n      &lt;td&gt;21.4&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
    \     &lt;td&gt;258.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.08&lt;/td&gt;\\n
    \     &lt;td&gt;3.215&lt;/td&gt;\\n      &lt;td&gt;19.44&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;4&lt;/th&gt;\\n      &lt;td&gt;Hornet
    Sportabout&lt;/td&gt;\\n      &lt;td&gt;18.7&lt;/td&gt;\\n      &lt;td&gt;8&lt;/td&gt;\\n
    \     &lt;td&gt;360.0&lt;/td&gt;\\n      &lt;td&gt;175&lt;/td&gt;\\n      &lt;td&gt;3.15&lt;/td&gt;\\n
    \     &lt;td&gt;3.440&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
    \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;2&lt;/td&gt;\\n
    \   &lt;/tr&gt;\\n  &lt;/tbody&gt;\\n&lt;/table&gt;&#39;\n</pre></div>\n\n</pre>\n\n<p>My
    blog will render that html into a nice table! (After removing new line characters)</p>\n<table
    border=\"1\" class=\"dataframe\">  <thead>    <tr style=\"text-align: right;\">
    \     <th>Unnamed: 0</th>      <th>mpg</th>      <th>cyl</th>      <th>disp</th>
    \     <th>hp</th>      <th>drat</th>      <th>wt</th>      <th>qsec</th>      <th>vs</th>
    \     <th>am</th>      <th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>
    \   <tr>      <td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
    \     <td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>
    \     <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
    \     <td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
    \     <td>110</td>      <td>3.90</td>      <td>2.875</td>      <td>17.02</td>
    \     <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
    \     <td>Datsun 710</td>      <td>22.8</td>      <td>4</td>      <td>108.0</td>
    \     <td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>      <td>1</td>
    \     <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>      <td>Hornet
    4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>      <td>110</td>
    \     <td>3.08</td>      <td>3.215</td>      <td>19.44</td>      <td>1</td>      <td>0</td>
    \     <td>3</td>      <td>1</td>    </tr>    <tr>      <td>Hornet Sportabout</td>
    \     <td>18.7</td>      <td>8</td>      <td>360.0</td>      <td>175</td>      <td>3.15</td>
    \     <td>3.440</td>      <td>17.02</td>      <td>0</td>      <td>0</td>      <td>3</td>
    \     <td>2</td>    </tr>  </tbody></table>\n        </div>\n    </main>\n\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: til\ntags: ['python', 'tech', 'til']\ntitle: Dataframe-To-Markdown\ndate:
    2022-05-07T00:00:00\npublished: True\ncover: \"media/dataframe-to-markdown.png\"\n\n---\n\n#
    Pandas\n\n`pandas.DataFrame`s are pretty sweet data structures in Python.\n\nI
    do a lot of work with tabular data and one thing I have incorporated into some
    of that work is automatic data summary reports by throwing the first few, or several
    relevant, rows of a dataframe at a point in a pipeline into a markdown file.\n\nPandas
    has a method on DataFrames that makes this 100% trivial!\n\n# The Method\n\nSay
    we have a dataframe, `df`... then it's literally just: `df.to_markdown()`\n\n```python\n\u276F
    df.head()\n\n          Unnamed: 0   mpg  cyl   disp   hp  drat     wt   qsec  vs
    \ am  gear  carb\n0          Mazda RX4  21.0    6  160.0  110  3.90  2.620  16.46
    \  0   1     4     4\n1      Mazda RX4 Wag  21.0    6  160.0  110  3.90  2.875
    \ 17.02   0   1     4     4\n2         Datsun 710  22.8    4  108.0   93  3.85
    \ 2.320  18.61   1   1     4     1\n3     Hornet 4 Drive  21.4    6  258.0  110
    \ 3.08  3.215  19.44   1   0     3     1\n4  Hornet Sportabout  18.7    8  360.0
    \ 175  3.15  3.440  17.02   0   0     3     2\n\n```\n\nIn ipython I can call
    the method and get a markdown table back as a string\n\n```python\n\nmental-data-lake
    \uF7A1  new-posts via 3.8.11(mental-data-lake) ipython\n\u276F df.head().to_markdown()\n'|
    \   | Unnamed: 0        |   mpg |   cyl |   disp |   hp |   drat |    wt |   qsec
    |   vs |   am |   gear |   carb |\\n|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|\\n|
    \ 0 | Mazda RX4         |  21   |     6 |    160 |  110 |   3.9  | 2.62  |  16.46
    |    0 |    1 |      4 |      4 |\\n|  1 | Mazda RX4 Wag     |  21   |     6 |
    \   160 |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |\\n|
    \ 2 | Datsun 710        |  22.8 |     4 |    108 |   93 |   3.85 | 2.32  |  18.61
    |    1 |    1 |      4 |      1 |\\n|  3 | Hornet 4 Drive    |  21.4 |     6 |
    \   258 |  110 |   3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |\\n|
    \ 4 | Hornet Sportabout |  18.7 |     8 |    360 |  175 |   3.15 | 3.44  |  17.02
    |    0 |    0 |      3 |      2 |'\n\n```\n\nYou can drop that string into a markdown
    file and using any reader that supports the rendering you'll have a nicely formated
    table of example data in whatever report you're making!\n\n# Bonus method\n\nJust
    like markdown, you can export a dataframe to html with `df.to_html()` and use
    that if it's more appropriate for your use case:\n\n```text\n\n'<table border=\"1\"
    class=\"dataframe\">\\n  <thead>\\n    <tr style=\"text-align: right;\">\\n      <th></th>\\n
    \     <th>Unnamed: 0</th>\\n      <th>mpg</th>\\n      <th>cyl</th>\\n      <th>disp</th>\\n
    \     <th>hp</th>\\n      <th>drat</th>\\n      <th>wt</th>\\n      <th>qsec</th>\\n
    \     <th>vs</th>\\n      <th>am</th>\\n      <th>gear</th>\\n      <th>carb</th>\\n
    \   </tr>\\n  </thead>\\n  <tbody>\\n    <tr>\\n      <th>0</th>\\n      <td>Mazda
    RX4</td>\\n      <td>21.0</td>\\n      <td>6</td>\\n      <td>160.0</td>\\n      <td>110</td>\\n
    \     <td>3.90</td>\\n      <td>2.620</td>\\n      <td>16.46</td>\\n      <td>0</td>\\n
    \     <td>1</td>\\n      <td>4</td>\\n      <td>4</td>\\n    </tr>\\n    <tr>\\n
    \     <th>1</th>\\n      <td>Mazda RX4 Wag</td>\\n      <td>21.0</td>\\n      <td>6</td>\\n
    \     <td>160.0</td>\\n      <td>110</td>\\n      <td>3.90</td>\\n      <td>2.875</td>\\n
    \     <td>17.02</td>\\n      <td>0</td>\\n      <td>1</td>\\n      <td>4</td>\\n
    \     <td>4</td>\\n    </tr>\\n    <tr>\\n      <th>2</th>\\n      <td>Datsun
    710</td>\\n      <td>22.8</td>\\n      <td>4</td>\\n      <td>108.0</td>\\n      <td>93</td>\\n
    \     <td>3.85</td>\\n      <td>2.320</td>\\n      <td>18.61</td>\\n      <td>1</td>\\n
    \     <td>1</td>\\n      <td>4</td>\\n      <td>1</td>\\n    </tr>\\n    <tr>\\n
    \     <th>3</th>\\n      <td>Hornet 4 Drive</td>\\n      <td>21.4</td>\\n      <td>6</td>\\n
    \     <td>258.0</td>\\n      <td>110</td>\\n      <td>3.08</td>\\n      <td>3.215</td>\\n
    \     <td>19.44</td>\\n      <td>1</td>\\n      <td>0</td>\\n      <td>3</td>\\n
    \     <td>1</td>\\n    </tr>\\n    <tr>\\n      <th>4</th>\\n      <td>Hornet
    Sportabout</td>\\n      <td>18.7</td>\\n      <td>8</td>\\n      <td>360.0</td>\\n
    \     <td>175</td>\\n      <td>3.15</td>\\n      <td>3.440</td>\\n      <td>17.02</td>\\n
    \     <td>0</td>\\n      <td>0</td>\\n      <td>3</td>\\n      <td>2</td>\\n    </tr>\\n
    \ </tbody>\\n</table>'\n\n```\n\nMy blog will render that html into a nice table!
    (After removing new line characters)\n\n<table border=\"1\" class=\"dataframe\">
    \ <thead>    <tr style=\"text-align: right;\">      <th>Unnamed: 0</th>      <th>mpg</th>
    \     <th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>      <th>wt</th>
    \     <th>qsec</th>      <th>vs</th>      <th>am</th>      <th>gear</th>      <th>carb</th>
    \   </tr>  </thead>  <tbody>    <tr>      <td>Mazda RX4</td>      <td>21.0</td>
    \     <td>6</td>      <td>160.0</td>      <td>110</td>      <td>3.90</td>      <td>2.620</td>
    \     <td>16.46</td>      <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>
    \   </tr>    <tr>      <td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>
    \     <td>160.0</td>      <td>110</td>      <td>3.90</td>      <td>2.875</td>
    \     <td>17.02</td>      <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>
    \   </tr>    <tr>      <td>Datsun 710</td>      <td>22.8</td>      <td>4</td>
    \     <td>108.0</td>      <td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>
    \     <td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>
    \     <td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>
    \     <td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>
    \     <td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>
    \     <td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>      <td>360.0</td>
    \     <td>175</td>      <td>3.15</td>      <td>3.440</td>      <td>17.02</td>
    \     <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>    </tr>  </tbody></table>\n"
published: true
slug: dataframe-to-markdown
title: Dataframe-To-Markdown


---

# Pandas

`pandas.DataFrame`s are pretty sweet data structures in Python.

I do a lot of work with tabular data and one thing I have incorporated into some of that work is automatic data summary reports by throwing the first few, or several relevant, rows of a dataframe at a point in a pipeline into a markdown file.

Pandas has a method on DataFrames that makes this 100% trivial!

# The Method

Say we have a dataframe, `df`... then it's literally just: `df.to_markdown()`

```python
❯ df.head()

          Unnamed: 0   mpg  cyl   disp   hp  drat     wt   qsec  vs  am  gear  carb
0          Mazda RX4  21.0    6  160.0  110  3.90  2.620  16.46   0   1     4     4
1      Mazda RX4 Wag  21.0    6  160.0  110  3.90  2.875  17.02   0   1     4     4
2         Datsun 710  22.8    4  108.0   93  3.85  2.320  18.61   1   1     4     1
3     Hornet 4 Drive  21.4    6  258.0  110  3.08  3.215  19.44   1   0     3     1
4  Hornet Sportabout  18.7    8  360.0  175  3.15  3.440  17.02   0   0     3     2

```

In ipython I can call the method and get a markdown table back as a string

```python

mental-data-lake   new-posts via 3.8.11(mental-data-lake) ipython
❯ df.head().to_markdown()
'|    | Unnamed: 0        |   mpg |   cyl |   disp |   hp |   drat |    wt |   qsec |   vs |   am |   gear |   carb |\n|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|\n|  0 | Mazda RX4         |  21   |     6 |    160 |  110 |   3.9  | 2.62  |  16.46 |    0 |    1 |      4 |      4 |\n|  1 | Mazda RX4 Wag     |  21   |     6 |    160 |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |\n|  2 | Datsun 710        |  22.8 |     4 |    108 |   93 |   3.85 | 2.32  |  18.61 |    1 |    1 |      4 |      1 |\n|  3 | Hornet 4 Drive    |  21.4 |     6 |    258 |  110 |   3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |\n|  4 | Hornet Sportabout |  18.7 |     8 |    360 |  175 |   3.15 | 3.44  |  17.02 |    0 |    0 |      3 |      2 |'

```

You can drop that string into a markdown file and using any reader that supports the rendering you'll have a nicely formated table of example data in whatever report you're making!

# Bonus method

Just like markdown, you can export a dataframe to html with `df.to_html()` and use that if it's more appropriate for your use case:

```text

'<table border="1" class="dataframe">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Unnamed: 0</th>\n      <th>mpg</th>\n      <th>cyl</th>\n      <th>disp</th>\n      <th>hp</th>\n      <th>drat</th>\n      <th>wt</th>\n      <th>qsec</th>\n      <th>vs</th>\n      <th>am</th>\n      <th>gear</th>\n      <th>carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0</th>\n      <td>Mazda RX4</td>\n      <td>21.0</td>\n      <td>6</td>\n      <td>160.0</td>\n      <td>110</td>\n      <td>3.90</td>\n      <td>2.620</td>\n      <td>16.46</td>\n      <td>0</td>\n      <td>1</td>\n      <td>4</td>\n      <td>4</td>\n    </tr>\n    <tr>\n      <th>1</th>\n      <td>Mazda RX4 Wag</td>\n      <td>21.0</td>\n      <td>6</td>\n      <td>160.0</td>\n      <td>110</td>\n      <td>3.90</td>\n      <td>2.875</td>\n      <td>17.02</td>\n      <td>0</td>\n      <td>1</td>\n      <td>4</td>\n      <td>4</td>\n    </tr>\n    <tr>\n      <th>2</th>\n      <td>Datsun 710</td>\n      <td>22.8</td>\n      <td>4</td>\n      <td>108.0</td>\n      <td>93</td>\n      <td>3.85</td>\n      <td>2.320</td>\n      <td>18.61</td>\n      <td>1</td>\n      <td>1</td>\n      <td>4</td>\n      <td>1</td>\n    </tr>\n    <tr>\n      <th>3</th>\n      <td>Hornet 4 Drive</td>\n      <td>21.4</td>\n      <td>6</td>\n      <td>258.0</td>\n      <td>110</td>\n      <td>3.08</td>\n      <td>3.215</td>\n      <td>19.44</td>\n      <td>1</td>\n      <td>0</td>\n      <td>3</td>\n      <td>1</td>\n    </tr>\n    <tr>\n      <th>4</th>\n      <td>Hornet Sportabout</td>\n      <td>18.7</td>\n      <td>8</td>\n      <td>360.0</td>\n      <td>175</td>\n      <td>3.15</td>\n      <td>3.440</td>\n      <td>17.02</td>\n      <td>0</td>\n      <td>0</td>\n      <td>3</td>\n      <td>2</td>\n    </tr>\n  </tbody>\n</table>'

```

My blog will render that html into a nice table! (After removing new line characters)

<table border="1" class="dataframe">  <thead>    <tr style="text-align: right;">      <th>Unnamed: 0</th>      <th>mpg</th>      <th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>      <th>wt</th>      <th>qsec</th>      <th>vs</th>      <th>am</th>      <th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>    <tr>      <td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>      <td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>      <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>      <td>110</td>      <td>3.90</td>      <td>2.875</td>      <td>17.02</td>      <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Datsun 710</td>      <td>22.8</td>      <td>4</td>      <td>108.0</td>      <td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>      <td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>      <td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>      <td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>      <td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>      <td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>      <td>360.0</td>      <td>175</td>      <td>3.15</td>      <td>3.440</td>      <td>17.02</td>      <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>    </tr>  </tbody></table>