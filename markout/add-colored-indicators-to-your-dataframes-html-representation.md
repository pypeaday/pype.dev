---
content: "[Mike Driscoll](https://twitter.com/driscollis) recently tweeted about making\ncolored
  out with pandas DataFrames and I just had to try it for myself\n\n# Use Case\n\nFirst
  though... why?\nMy biggest use case is a monitoring pipeline of mine... The details
  aside, the\noutput of my pipeline is a dataframe where each row has information
  about a\nfailed pipeline that I need to go look into. I dump that result to a simle
  html\nfile that's hosted on an internal site and the file is updated every couple
  of\nhours. Adding some colored indicators automatically to the rows to help me\nassess
  severity of each record would be a handy way to quickly get an\nunderstanding the
  state of our pipelines.\n\n# How?\n\nThe docs for the `applymap` method state simply:\n\n```\nApply
  a CSS-styling function elementwise.\n\nUpdates the HTML representation with the
  result.\n\n```\n\nSo we can write a function that returns `color: {color}` based
  on the dataframe\nvalues and when we drop that dataframe to html we'll have some
  simple css\nstyling applied automagically!\n\nBy default the function will be applied
  to all columns of the dataframe, but\nthat's not useful if the columns are different
  types which is usually the case.\nLuckily there is a `subset` keyword to only apply
  to the columns you need!\n\nConsider my example\n\n```python \nsandbox \uF7A1  main
  via 3.8.11(sandbox) ipython\n\u276F df = pd.read_csv(\"cars.csv\")\n\nsandbox \uF7A1
  \ main via 3.8.11(sandbox) ipython\n\u276F def mpg_color(val: float):\n...:     color
  = \"red\" if val < 21 else \"green\"\n...:     return f\"color: {color}\"\n\nsandbox
  \uF7A1  main via 3.8.11(sandbox) ipython\n\u276F df.style.applymap(mpg_color, subset=\"mpg\").to_html(\"color.html\")\n```\n\nI
  want to quickly see if the `mpg` is any good for the cars in the cars dataset\nand
  I'll define \"good\" as better than 21 mpg (not great I know but just for the\nsake
  of discussion...)\n\nThe function returns an appropriate css string and after I
  `style.applymap` on just the `mpg` column we get this!\n\n\n<style type=\"text/css\">\n#T_95e99_row0_col1,
  #T_95e99_row1_col1, #T_95e99_row2_col1, #T_95e99_row3_col1 {\n  color: green;\n}\n#T_95e99_row4_col1
  {\n  color: red;\n}\n</style>\n<table id=\"T_95e99\">\n  <thead>\n    <tr>\n      <th
  class=\"blank level0\" >&nbsp;</th>\n      <th id=\"T_95e99_level0_col0\" class=\"col_heading
  level0 col0\" >Unnamed: 0</th>\n      <th id=\"T_95e99_level0_col1\" class=\"col_heading
  level0 col1\" >mpg</th>\n      <th id=\"T_95e99_level0_col2\" class=\"col_heading
  level0 col2\" >cyl</th>\n      <th id=\"T_95e99_level0_col3\" class=\"col_heading
  level0 col3\" >disp</th>\n      <th id=\"T_95e99_level0_col4\" class=\"col_heading
  level0 col4\" >hp</th>\n      <th id=\"T_95e99_level0_col5\" class=\"col_heading
  level0 col5\" >drat</th>\n      <th id=\"T_95e99_level0_col6\" class=\"col_heading
  level0 col6\" >wt</th>\n      <th id=\"T_95e99_level0_col7\" class=\"col_heading
  level0 col7\" >qsec</th>\n      <th id=\"T_95e99_level0_col8\" class=\"col_heading
  level0 col8\" >vs</th>\n      <th id=\"T_95e99_level0_col9\" class=\"col_heading
  level0 col9\" >am</th>\n      <th id=\"T_95e99_level0_col10\" class=\"col_heading
  level0 col10\" >gear</th>\n      <th id=\"T_95e99_level0_col11\" class=\"col_heading
  level0 col11\" >carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th
  id=\"T_95e99_level0_row0\" class=\"row_heading level0 row0\" >0</th>\n      <td
  id=\"T_95e99_row0_col0\" class=\"data row0 col0\" >Mazda RX4</td>\n      <td id=\"T_95e99_row0_col1\"
  class=\"data row0 col1\" >21.000000</td>\n      <td id=\"T_95e99_row0_col2\" class=\"data
  row0 col2\" >6</td>\n      <td id=\"T_95e99_row0_col3\" class=\"data row0 col3\"
  >160.000000</td>\n      <td id=\"T_95e99_row0_col4\" class=\"data row0 col4\" >110</td>\n
  \     <td id=\"T_95e99_row0_col5\" class=\"data row0 col5\" >3.900000</td>\n      <td
  id=\"T_95e99_row0_col6\" class=\"data row0 col6\" >2.620000</td>\n      <td id=\"T_95e99_row0_col7\"
  class=\"data row0 col7\" >16.460000</td>\n      <td id=\"T_95e99_row0_col8\" class=\"data
  row0 col8\" >0</td>\n      <td id=\"T_95e99_row0_col9\" class=\"data row0 col9\"
  >1</td>\n      <td id=\"T_95e99_row0_col10\" class=\"data row0 col10\" >4</td>\n
  \     <td id=\"T_95e99_row0_col11\" class=\"data row0 col11\" >4</td>\n    </tr>\n
  \   <tr>\n      <th id=\"T_95e99_level0_row1\" class=\"row_heading level0 row1\"
  >1</th>\n      <td id=\"T_95e99_row1_col0\" class=\"data row1 col0\" >Mazda RX4
  Wag</td>\n      <td id=\"T_95e99_row1_col1\" class=\"data row1 col1\" >21.000000</td>\n
  \     <td id=\"T_95e99_row1_col2\" class=\"data row1 col2\" >6</td>\n      <td id=\"T_95e99_row1_col3\"
  class=\"data row1 col3\" >160.000000</td>\n      <td id=\"T_95e99_row1_col4\" class=\"data
  row1 col4\" >110</td>\n      <td id=\"T_95e99_row1_col5\" class=\"data row1 col5\"
  >3.900000</td>\n      <td id=\"T_95e99_row1_col6\" class=\"data row1 col6\" >2.875000</td>\n
  \     <td id=\"T_95e99_row1_col7\" class=\"data row1 col7\" >17.020000</td>\n      <td
  id=\"T_95e99_row1_col8\" class=\"data row1 col8\" >0</td>\n      <td id=\"T_95e99_row1_col9\"
  class=\"data row1 col9\" >1</td>\n      <td id=\"T_95e99_row1_col10\" class=\"data
  row1 col10\" >4</td>\n      <td id=\"T_95e99_row1_col11\" class=\"data row1 col11\"
  >4</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row2\" class=\"row_heading
  level0 row2\" >2</th>\n      <td id=\"T_95e99_row2_col0\" class=\"data row2 col0\"
  >Datsun 710</td>\n      <td id=\"T_95e99_row2_col1\" class=\"data row2 col1\" >22.800000</td>\n
  \     <td id=\"T_95e99_row2_col2\" class=\"data row2 col2\" >4</td>\n      <td id=\"T_95e99_row2_col3\"
  class=\"data row2 col3\" >108.000000</td>\n      <td id=\"T_95e99_row2_col4\" class=\"data
  row2 col4\" >93</td>\n      <td id=\"T_95e99_row2_col5\" class=\"data row2 col5\"
  >3.850000</td>\n      <td id=\"T_95e99_row2_col6\" class=\"data row2 col6\" >2.320000</td>\n
  \     <td id=\"T_95e99_row2_col7\" class=\"data row2 col7\" >18.610000</td>\n      <td
  id=\"T_95e99_row2_col8\" class=\"data row2 col8\" >1</td>\n      <td id=\"T_95e99_row2_col9\"
  class=\"data row2 col9\" >1</td>\n      <td id=\"T_95e99_row2_col10\" class=\"data
  row2 col10\" >4</td>\n      <td id=\"T_95e99_row2_col11\" class=\"data row2 col11\"
  >1</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row3\" class=\"row_heading
  level0 row3\" >3</th>\n      <td id=\"T_95e99_row3_col0\" class=\"data row3 col0\"
  >Hornet 4 Drive</td>\n      <td id=\"T_95e99_row3_col1\" class=\"data row3 col1\"
  >21.400000</td>\n      <td id=\"T_95e99_row3_col2\" class=\"data row3 col2\" >6</td>\n
  \     <td id=\"T_95e99_row3_col3\" class=\"data row3 col3\" >258.000000</td>\n      <td
  id=\"T_95e99_row3_col4\" class=\"data row3 col4\" >110</td>\n      <td id=\"T_95e99_row3_col5\"
  class=\"data row3 col5\" >3.080000</td>\n      <td id=\"T_95e99_row3_col6\" class=\"data
  row3 col6\" >3.215000</td>\n      <td id=\"T_95e99_row3_col7\" class=\"data row3
  col7\" >19.440000</td>\n      <td id=\"T_95e99_row3_col8\" class=\"data row3 col8\"
  >1</td>\n      <td id=\"T_95e99_row3_col9\" class=\"data row3 col9\" >0</td>\n      <td
  id=\"T_95e99_row3_col10\" class=\"data row3 col10\" >3</td>\n      <td id=\"T_95e99_row3_col11\"
  class=\"data row3 col11\" >1</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row4\"
  class=\"row_heading level0 row4\" >4</th>\n      <td id=\"T_95e99_row4_col0\" class=\"data
  row4 col0\" >Hornet Sportabout</td>\n      <td id=\"T_95e99_row4_col1\" class=\"data
  row4 col1\" >18.700000</td>\n      <td id=\"T_95e99_row4_col2\" class=\"data row4
  col2\" >8</td>\n      <td id=\"T_95e99_row4_col3\" class=\"data row4 col3\" >360.000000</td>\n
  \     <td id=\"T_95e99_row4_col4\" class=\"data row4 col4\" >175</td>\n      <td
  id=\"T_95e99_row4_col5\" class=\"data row4 col5\" >3.150000</td>\n      <td id=\"T_95e99_row4_col6\"
  class=\"data row4 col6\" >3.440000</td>\n      <td id=\"T_95e99_row4_col7\" class=\"data
  row4 col7\" >17.020000</td>\n      <td id=\"T_95e99_row4_col8\" class=\"data row4
  col8\" >0</td>\n      <td id=\"T_95e99_row4_col9\" class=\"data row4 col9\" >0</td>\n
  \     <td id=\"T_95e99_row4_col10\" class=\"data row4 col10\" >3</td>\n      <td
  id=\"T_95e99_row4_col11\" class=\"data row4 col11\" >2</td>\n    </tr>\n  </tbody>\n</table>"
date: 2022-06-04
description: '[Mike Driscoll](https://twitter.com/driscollis) recently tweeted about
  making

  colored out with pandas DataFrames and I just had to try it for myself Use Case
  Fi'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Add colored indicators
    to your dataframes html representation</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"[Mike Driscoll](https://twitter.com/driscollis) recently tweeted about
    making\ncolored out with pandas DataFrames and I just had to try it for myself
    Use Case Fi\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Add colored indicators to your dataframes html
    representation | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/add-colored-indicators-to-your-dataframes-html-representation\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Add colored indicators to your dataframes html representation | Nic
    Payne\" />\n<meta name=\"twitter:description\" content=\"[Mike Driscoll](https://twitter.com/driscollis)
    recently tweeted about making\ncolored out with pandas DataFrames and I just had
    to try it for myself Use Case Fi\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/add-colored-indicators-to-your-dataframes-html-representation</span>\n
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
    mb-4 post-title-large\">Add colored indicators to your dataframes html representation</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-06-04\">\n            June 04, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #python\n            </a>\n            <a href=\"https://pype.dev//tags/data/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #data\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p><a
    href=\"https://twitter.com/driscollis\">Mike Driscoll</a> recently tweeted about
    making\ncolored out with pandas DataFrames and I just had to try it for myself</p>\n<h1
    id=\"use-case\">Use Case <a class=\"header-anchor\" href=\"#use-case\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>First though... why?\nMy
    biggest use case is a monitoring pipeline of mine... The details aside, the\noutput
    of my pipeline is a dataframe where each row has information about a\nfailed pipeline
    that I need to go look into. I dump that result to a simle html\nfile that's hosted
    on an internal site and the file is updated every couple of\nhours. Adding some
    colored indicators automatically to the rows to help me\nassess severity of each
    record would be a handy way to quickly get an\nunderstanding the state of our
    pipelines.</p>\n<h1 id=\"how\">How? <a class=\"header-anchor\" href=\"#how\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>The docs for the <code>applymap</code>
    method state simply:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>Apply a CSS-styling function
    elementwise.\n\nUpdates the HTML representation with the result.\n</pre></div>\n\n</pre>\n\n<p>So
    we can write a function that returns <code>color: {color}</code> based on the
    dataframe\nvalues and when we drop that dataframe to html we'll have some simple
    css\nstyling applied automagically!</p>\n<p>By default the function will be applied
    to all columns of the dataframe, but\nthat's not useful if the columns are different
    types which is usually the case.\nLuckily there is a <code>subset</code> keyword
    to only apply to the columns you need!</p>\n<p>Consider my example</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
    class=\"o\">.</span><span class=\"n\">read_csv</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;cars.csv&quot;</span><span class=\"p\">)</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">mpg_color</span><span
    class=\"p\">(</span><span class=\"n\">val</span><span class=\"p\">:</span> <span
    class=\"nb\">float</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"n\">color</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;red&quot;</span> <span class=\"k\">if</span> <span class=\"n\">val</span>
    <span class=\"o\">&lt;</span> <span class=\"mi\">21</span> <span class=\"k\">else</span>
    <span class=\"s2\">&quot;green&quot;</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"k\">return</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;color: </span><span class=\"si\">{</span><span class=\"n\">color</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">style</span><span
    class=\"o\">.</span><span class=\"n\">applymap</span><span class=\"p\">(</span><span
    class=\"n\">mpg_color</span><span class=\"p\">,</span> <span class=\"n\">subset</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mpg&quot;</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">to_html</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;color.html&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>I
    want to quickly see if the <code>mpg</code> is any good for the cars in the cars
    dataset\nand I'll define &quot;good&quot; as better than 21 mpg (not great I know
    but just for the\nsake of discussion...)</p>\n<p>The function returns an appropriate
    css string and after I <code>style.applymap</code> on just the <code>mpg</code>
    column we get this!</p>\n<style type=\"text/css\">\n#T_95e99_row0_col1, #T_95e99_row1_col1,
    #T_95e99_row2_col1, #T_95e99_row3_col1 {\n  color: green;\n}\n#T_95e99_row4_col1
    {\n  color: red;\n}\n</style>\n<table id=\"T_95e99\">\n  <thead>\n    <tr>\n      <th
    class=\"blank level0\" >&nbsp;</th>\n      <th id=\"T_95e99_level0_col0\" class=\"col_heading
    level0 col0\" >Unnamed: 0</th>\n      <th id=\"T_95e99_level0_col1\" class=\"col_heading
    level0 col1\" >mpg</th>\n      <th id=\"T_95e99_level0_col2\" class=\"col_heading
    level0 col2\" >cyl</th>\n      <th id=\"T_95e99_level0_col3\" class=\"col_heading
    level0 col3\" >disp</th>\n      <th id=\"T_95e99_level0_col4\" class=\"col_heading
    level0 col4\" >hp</th>\n      <th id=\"T_95e99_level0_col5\" class=\"col_heading
    level0 col5\" >drat</th>\n      <th id=\"T_95e99_level0_col6\" class=\"col_heading
    level0 col6\" >wt</th>\n      <th id=\"T_95e99_level0_col7\" class=\"col_heading
    level0 col7\" >qsec</th>\n      <th id=\"T_95e99_level0_col8\" class=\"col_heading
    level0 col8\" >vs</th>\n      <th id=\"T_95e99_level0_col9\" class=\"col_heading
    level0 col9\" >am</th>\n      <th id=\"T_95e99_level0_col10\" class=\"col_heading
    level0 col10\" >gear</th>\n      <th id=\"T_95e99_level0_col11\" class=\"col_heading
    level0 col11\" >carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th
    id=\"T_95e99_level0_row0\" class=\"row_heading level0 row0\" >0</th>\n      <td
    id=\"T_95e99_row0_col0\" class=\"data row0 col0\" >Mazda RX4</td>\n      <td id=\"T_95e99_row0_col1\"
    class=\"data row0 col1\" >21.000000</td>\n      <td id=\"T_95e99_row0_col2\" class=\"data
    row0 col2\" >6</td>\n      <td id=\"T_95e99_row0_col3\" class=\"data row0 col3\"
    >160.000000</td>\n      <td id=\"T_95e99_row0_col4\" class=\"data row0 col4\"
    >110</td>\n      <td id=\"T_95e99_row0_col5\" class=\"data row0 col5\" >3.900000</td>\n
    \     <td id=\"T_95e99_row0_col6\" class=\"data row0 col6\" >2.620000</td>\n      <td
    id=\"T_95e99_row0_col7\" class=\"data row0 col7\" >16.460000</td>\n      <td id=\"T_95e99_row0_col8\"
    class=\"data row0 col8\" >0</td>\n      <td id=\"T_95e99_row0_col9\" class=\"data
    row0 col9\" >1</td>\n      <td id=\"T_95e99_row0_col10\" class=\"data row0 col10\"
    >4</td>\n      <td id=\"T_95e99_row0_col11\" class=\"data row0 col11\" >4</td>\n
    \   </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row1\" class=\"row_heading
    level0 row1\" >1</th>\n      <td id=\"T_95e99_row1_col0\" class=\"data row1 col0\"
    >Mazda RX4 Wag</td>\n      <td id=\"T_95e99_row1_col1\" class=\"data row1 col1\"
    >21.000000</td>\n      <td id=\"T_95e99_row1_col2\" class=\"data row1 col2\" >6</td>\n
    \     <td id=\"T_95e99_row1_col3\" class=\"data row1 col3\" >160.000000</td>\n
    \     <td id=\"T_95e99_row1_col4\" class=\"data row1 col4\" >110</td>\n      <td
    id=\"T_95e99_row1_col5\" class=\"data row1 col5\" >3.900000</td>\n      <td id=\"T_95e99_row1_col6\"
    class=\"data row1 col6\" >2.875000</td>\n      <td id=\"T_95e99_row1_col7\" class=\"data
    row1 col7\" >17.020000</td>\n      <td id=\"T_95e99_row1_col8\" class=\"data row1
    col8\" >0</td>\n      <td id=\"T_95e99_row1_col9\" class=\"data row1 col9\" >1</td>\n
    \     <td id=\"T_95e99_row1_col10\" class=\"data row1 col10\" >4</td>\n      <td
    id=\"T_95e99_row1_col11\" class=\"data row1 col11\" >4</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row2\" class=\"row_heading level0 row2\" >2</th>\n
    \     <td id=\"T_95e99_row2_col0\" class=\"data row2 col0\" >Datsun 710</td>\n
    \     <td id=\"T_95e99_row2_col1\" class=\"data row2 col1\" >22.800000</td>\n
    \     <td id=\"T_95e99_row2_col2\" class=\"data row2 col2\" >4</td>\n      <td
    id=\"T_95e99_row2_col3\" class=\"data row2 col3\" >108.000000</td>\n      <td
    id=\"T_95e99_row2_col4\" class=\"data row2 col4\" >93</td>\n      <td id=\"T_95e99_row2_col5\"
    class=\"data row2 col5\" >3.850000</td>\n      <td id=\"T_95e99_row2_col6\" class=\"data
    row2 col6\" >2.320000</td>\n      <td id=\"T_95e99_row2_col7\" class=\"data row2
    col7\" >18.610000</td>\n      <td id=\"T_95e99_row2_col8\" class=\"data row2 col8\"
    >1</td>\n      <td id=\"T_95e99_row2_col9\" class=\"data row2 col9\" >1</td>\n
    \     <td id=\"T_95e99_row2_col10\" class=\"data row2 col10\" >4</td>\n      <td
    id=\"T_95e99_row2_col11\" class=\"data row2 col11\" >1</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row3\" class=\"row_heading level0 row3\" >3</th>\n
    \     <td id=\"T_95e99_row3_col0\" class=\"data row3 col0\" >Hornet 4 Drive</td>\n
    \     <td id=\"T_95e99_row3_col1\" class=\"data row3 col1\" >21.400000</td>\n
    \     <td id=\"T_95e99_row3_col2\" class=\"data row3 col2\" >6</td>\n      <td
    id=\"T_95e99_row3_col3\" class=\"data row3 col3\" >258.000000</td>\n      <td
    id=\"T_95e99_row3_col4\" class=\"data row3 col4\" >110</td>\n      <td id=\"T_95e99_row3_col5\"
    class=\"data row3 col5\" >3.080000</td>\n      <td id=\"T_95e99_row3_col6\" class=\"data
    row3 col6\" >3.215000</td>\n      <td id=\"T_95e99_row3_col7\" class=\"data row3
    col7\" >19.440000</td>\n      <td id=\"T_95e99_row3_col8\" class=\"data row3 col8\"
    >1</td>\n      <td id=\"T_95e99_row3_col9\" class=\"data row3 col9\" >0</td>\n
    \     <td id=\"T_95e99_row3_col10\" class=\"data row3 col10\" >3</td>\n      <td
    id=\"T_95e99_row3_col11\" class=\"data row3 col11\" >1</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row4\" class=\"row_heading level0 row4\" >4</th>\n
    \     <td id=\"T_95e99_row4_col0\" class=\"data row4 col0\" >Hornet Sportabout</td>\n
    \     <td id=\"T_95e99_row4_col1\" class=\"data row4 col1\" >18.700000</td>\n
    \     <td id=\"T_95e99_row4_col2\" class=\"data row4 col2\" >8</td>\n      <td
    id=\"T_95e99_row4_col3\" class=\"data row4 col3\" >360.000000</td>\n      <td
    id=\"T_95e99_row4_col4\" class=\"data row4 col4\" >175</td>\n      <td id=\"T_95e99_row4_col5\"
    class=\"data row4 col5\" >3.150000</td>\n      <td id=\"T_95e99_row4_col6\" class=\"data
    row4 col6\" >3.440000</td>\n      <td id=\"T_95e99_row4_col7\" class=\"data row4
    col7\" >17.020000</td>\n      <td id=\"T_95e99_row4_col8\" class=\"data row4 col8\"
    >0</td>\n      <td id=\"T_95e99_row4_col9\" class=\"data row4 col9\" >0</td>\n
    \     <td id=\"T_95e99_row4_col10\" class=\"data row4 col10\" >3</td>\n      <td
    id=\"T_95e99_row4_col11\" class=\"data row4 col11\" >2</td>\n    </tr>\n  </tbody>\n</table>\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Add colored indicators
    to your dataframes html representation</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"[Mike Driscoll](https://twitter.com/driscollis) recently tweeted about
    making\ncolored out with pandas DataFrames and I just had to try it for myself
    Use Case Fi\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Add colored indicators to your dataframes html
    representation | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/add-colored-indicators-to-your-dataframes-html-representation\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Add colored indicators to your dataframes html representation | Nic
    Payne\" />\n<meta name=\"twitter:description\" content=\"[Mike Driscoll](https://twitter.com/driscollis)
    recently tweeted about making\ncolored out with pandas DataFrames and I just had
    to try it for myself Use Case Fi\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Add colored indicators to your dataframes html representation</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-06-04\">\n            June 04, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #python\n            </a>\n            <a href=\"https://pype.dev//tags/data/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #data\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section></article>\n
    \    </body>\n</html>"
  partial: "<section class=\"post-terminal  post-terminal--til \">\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Add colored indicators
    to your dataframes html representation</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-06-04\">\n            June
    04, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/data/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #data\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p><a href=\"https://twitter.com/driscollis\">Mike
    Driscoll</a> recently tweeted about making\ncolored out with pandas DataFrames
    and I just had to try it for myself</p>\n<h1 id=\"use-case\">Use Case <a class=\"header-anchor\"
    href=\"#use-case\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>First though... why?\nMy
    biggest use case is a monitoring pipeline of mine... The details aside, the\noutput
    of my pipeline is a dataframe where each row has information about a\nfailed pipeline
    that I need to go look into. I dump that result to a simle html\nfile that's hosted
    on an internal site and the file is updated every couple of\nhours. Adding some
    colored indicators automatically to the rows to help me\nassess severity of each
    record would be a handy way to quickly get an\nunderstanding the state of our
    pipelines.</p>\n<h1 id=\"how\">How? <a class=\"header-anchor\" href=\"#how\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>The docs for the <code>applymap</code>
    method state simply:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>Apply a CSS-styling function
    elementwise.\n\nUpdates the HTML representation with the result.\n</pre></div>\n\n</pre>\n\n<p>So
    we can write a function that returns <code>color: {color}</code> based on the
    dataframe\nvalues and when we drop that dataframe to html we'll have some simple
    css\nstyling applied automagically!</p>\n<p>By default the function will be applied
    to all columns of the dataframe, but\nthat's not useful if the columns are different
    types which is usually the case.\nLuckily there is a <code>subset</code> keyword
    to only apply to the columns you need!</p>\n<p>Consider my example</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
    class=\"o\">.</span><span class=\"n\">read_csv</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;cars.csv&quot;</span><span class=\"p\">)</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">mpg_color</span><span
    class=\"p\">(</span><span class=\"n\">val</span><span class=\"p\">:</span> <span
    class=\"nb\">float</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"n\">color</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;red&quot;</span> <span class=\"k\">if</span> <span class=\"n\">val</span>
    <span class=\"o\">&lt;</span> <span class=\"mi\">21</span> <span class=\"k\">else</span>
    <span class=\"s2\">&quot;green&quot;</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"k\">return</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;color: </span><span class=\"si\">{</span><span class=\"n\">color</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">style</span><span
    class=\"o\">.</span><span class=\"n\">applymap</span><span class=\"p\">(</span><span
    class=\"n\">mpg_color</span><span class=\"p\">,</span> <span class=\"n\">subset</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mpg&quot;</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">to_html</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;color.html&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>I
    want to quickly see if the <code>mpg</code> is any good for the cars in the cars
    dataset\nand I'll define &quot;good&quot; as better than 21 mpg (not great I know
    but just for the\nsake of discussion...)</p>\n<p>The function returns an appropriate
    css string and after I <code>style.applymap</code> on just the <code>mpg</code>
    column we get this!</p>\n<style type=\"text/css\">\n#T_95e99_row0_col1, #T_95e99_row1_col1,
    #T_95e99_row2_col1, #T_95e99_row3_col1 {\n  color: green;\n}\n#T_95e99_row4_col1
    {\n  color: red;\n}\n</style>\n<table id=\"T_95e99\">\n  <thead>\n    <tr>\n      <th
    class=\"blank level0\" >&nbsp;</th>\n      <th id=\"T_95e99_level0_col0\" class=\"col_heading
    level0 col0\" >Unnamed: 0</th>\n      <th id=\"T_95e99_level0_col1\" class=\"col_heading
    level0 col1\" >mpg</th>\n      <th id=\"T_95e99_level0_col2\" class=\"col_heading
    level0 col2\" >cyl</th>\n      <th id=\"T_95e99_level0_col3\" class=\"col_heading
    level0 col3\" >disp</th>\n      <th id=\"T_95e99_level0_col4\" class=\"col_heading
    level0 col4\" >hp</th>\n      <th id=\"T_95e99_level0_col5\" class=\"col_heading
    level0 col5\" >drat</th>\n      <th id=\"T_95e99_level0_col6\" class=\"col_heading
    level0 col6\" >wt</th>\n      <th id=\"T_95e99_level0_col7\" class=\"col_heading
    level0 col7\" >qsec</th>\n      <th id=\"T_95e99_level0_col8\" class=\"col_heading
    level0 col8\" >vs</th>\n      <th id=\"T_95e99_level0_col9\" class=\"col_heading
    level0 col9\" >am</th>\n      <th id=\"T_95e99_level0_col10\" class=\"col_heading
    level0 col10\" >gear</th>\n      <th id=\"T_95e99_level0_col11\" class=\"col_heading
    level0 col11\" >carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th
    id=\"T_95e99_level0_row0\" class=\"row_heading level0 row0\" >0</th>\n      <td
    id=\"T_95e99_row0_col0\" class=\"data row0 col0\" >Mazda RX4</td>\n      <td id=\"T_95e99_row0_col1\"
    class=\"data row0 col1\" >21.000000</td>\n      <td id=\"T_95e99_row0_col2\" class=\"data
    row0 col2\" >6</td>\n      <td id=\"T_95e99_row0_col3\" class=\"data row0 col3\"
    >160.000000</td>\n      <td id=\"T_95e99_row0_col4\" class=\"data row0 col4\"
    >110</td>\n      <td id=\"T_95e99_row0_col5\" class=\"data row0 col5\" >3.900000</td>\n
    \     <td id=\"T_95e99_row0_col6\" class=\"data row0 col6\" >2.620000</td>\n      <td
    id=\"T_95e99_row0_col7\" class=\"data row0 col7\" >16.460000</td>\n      <td id=\"T_95e99_row0_col8\"
    class=\"data row0 col8\" >0</td>\n      <td id=\"T_95e99_row0_col9\" class=\"data
    row0 col9\" >1</td>\n      <td id=\"T_95e99_row0_col10\" class=\"data row0 col10\"
    >4</td>\n      <td id=\"T_95e99_row0_col11\" class=\"data row0 col11\" >4</td>\n
    \   </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row1\" class=\"row_heading
    level0 row1\" >1</th>\n      <td id=\"T_95e99_row1_col0\" class=\"data row1 col0\"
    >Mazda RX4 Wag</td>\n      <td id=\"T_95e99_row1_col1\" class=\"data row1 col1\"
    >21.000000</td>\n      <td id=\"T_95e99_row1_col2\" class=\"data row1 col2\" >6</td>\n
    \     <td id=\"T_95e99_row1_col3\" class=\"data row1 col3\" >160.000000</td>\n
    \     <td id=\"T_95e99_row1_col4\" class=\"data row1 col4\" >110</td>\n      <td
    id=\"T_95e99_row1_col5\" class=\"data row1 col5\" >3.900000</td>\n      <td id=\"T_95e99_row1_col6\"
    class=\"data row1 col6\" >2.875000</td>\n      <td id=\"T_95e99_row1_col7\" class=\"data
    row1 col7\" >17.020000</td>\n      <td id=\"T_95e99_row1_col8\" class=\"data row1
    col8\" >0</td>\n      <td id=\"T_95e99_row1_col9\" class=\"data row1 col9\" >1</td>\n
    \     <td id=\"T_95e99_row1_col10\" class=\"data row1 col10\" >4</td>\n      <td
    id=\"T_95e99_row1_col11\" class=\"data row1 col11\" >4</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row2\" class=\"row_heading level0 row2\" >2</th>\n
    \     <td id=\"T_95e99_row2_col0\" class=\"data row2 col0\" >Datsun 710</td>\n
    \     <td id=\"T_95e99_row2_col1\" class=\"data row2 col1\" >22.800000</td>\n
    \     <td id=\"T_95e99_row2_col2\" class=\"data row2 col2\" >4</td>\n      <td
    id=\"T_95e99_row2_col3\" class=\"data row2 col3\" >108.000000</td>\n      <td
    id=\"T_95e99_row2_col4\" class=\"data row2 col4\" >93</td>\n      <td id=\"T_95e99_row2_col5\"
    class=\"data row2 col5\" >3.850000</td>\n      <td id=\"T_95e99_row2_col6\" class=\"data
    row2 col6\" >2.320000</td>\n      <td id=\"T_95e99_row2_col7\" class=\"data row2
    col7\" >18.610000</td>\n      <td id=\"T_95e99_row2_col8\" class=\"data row2 col8\"
    >1</td>\n      <td id=\"T_95e99_row2_col9\" class=\"data row2 col9\" >1</td>\n
    \     <td id=\"T_95e99_row2_col10\" class=\"data row2 col10\" >4</td>\n      <td
    id=\"T_95e99_row2_col11\" class=\"data row2 col11\" >1</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row3\" class=\"row_heading level0 row3\" >3</th>\n
    \     <td id=\"T_95e99_row3_col0\" class=\"data row3 col0\" >Hornet 4 Drive</td>\n
    \     <td id=\"T_95e99_row3_col1\" class=\"data row3 col1\" >21.400000</td>\n
    \     <td id=\"T_95e99_row3_col2\" class=\"data row3 col2\" >6</td>\n      <td
    id=\"T_95e99_row3_col3\" class=\"data row3 col3\" >258.000000</td>\n      <td
    id=\"T_95e99_row3_col4\" class=\"data row3 col4\" >110</td>\n      <td id=\"T_95e99_row3_col5\"
    class=\"data row3 col5\" >3.080000</td>\n      <td id=\"T_95e99_row3_col6\" class=\"data
    row3 col6\" >3.215000</td>\n      <td id=\"T_95e99_row3_col7\" class=\"data row3
    col7\" >19.440000</td>\n      <td id=\"T_95e99_row3_col8\" class=\"data row3 col8\"
    >1</td>\n      <td id=\"T_95e99_row3_col9\" class=\"data row3 col9\" >0</td>\n
    \     <td id=\"T_95e99_row3_col10\" class=\"data row3 col10\" >3</td>\n      <td
    id=\"T_95e99_row3_col11\" class=\"data row3 col11\" >1</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row4\" class=\"row_heading level0 row4\" >4</th>\n
    \     <td id=\"T_95e99_row4_col0\" class=\"data row4 col0\" >Hornet Sportabout</td>\n
    \     <td id=\"T_95e99_row4_col1\" class=\"data row4 col1\" >18.700000</td>\n
    \     <td id=\"T_95e99_row4_col2\" class=\"data row4 col2\" >8</td>\n      <td
    id=\"T_95e99_row4_col3\" class=\"data row4 col3\" >360.000000</td>\n      <td
    id=\"T_95e99_row4_col4\" class=\"data row4 col4\" >175</td>\n      <td id=\"T_95e99_row4_col5\"
    class=\"data row4 col5\" >3.150000</td>\n      <td id=\"T_95e99_row4_col6\" class=\"data
    row4 col6\" >3.440000</td>\n      <td id=\"T_95e99_row4_col7\" class=\"data row4
    col7\" >17.020000</td>\n      <td id=\"T_95e99_row4_col8\" class=\"data row4 col8\"
    >0</td>\n      <td id=\"T_95e99_row4_col9\" class=\"data row4 col9\" >0</td>\n
    \     <td id=\"T_95e99_row4_col10\" class=\"data row4 col10\" >3</td>\n      <td
    id=\"T_95e99_row4_col11\" class=\"data row4 col11\" >2</td>\n    </tr>\n  </tbody>\n</table>\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Add colored
    indicators to your dataframes html representation</title>\n<meta charset=\"UTF-8\"
    />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta
    name=\"description\" content=\"[Mike Driscoll](https://twitter.com/driscollis)
    recently tweeted about making\ncolored out with pandas DataFrames and I just had
    to try it for myself Use Case Fi\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Add colored indicators to your dataframes html
    representation | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/add-colored-indicators-to-your-dataframes-html-representation\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Add colored indicators to your dataframes html representation | Nic
    Payne\" />\n<meta name=\"twitter:description\" content=\"[Mike Driscoll](https://twitter.com/driscollis)
    recently tweeted about making\ncolored out with pandas DataFrames and I just had
    to try it for myself Use Case Fi\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/add-colored-indicators-to-your-dataframes-html-representation</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p><a href=\"https://twitter.com/driscollis\">Mike
    Driscoll</a> recently tweeted about making\ncolored out with pandas DataFrames
    and I just had to try it for myself</p>\n<h1 id=\"use-case\">Use Case <a class=\"header-anchor\"
    href=\"#use-case\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>First though... why?\nMy
    biggest use case is a monitoring pipeline of mine... The details aside, the\noutput
    of my pipeline is a dataframe where each row has information about a\nfailed pipeline
    that I need to go look into. I dump that result to a simle html\nfile that's hosted
    on an internal site and the file is updated every couple of\nhours. Adding some
    colored indicators automatically to the rows to help me\nassess severity of each
    record would be a handy way to quickly get an\nunderstanding the state of our
    pipelines.</p>\n<h1 id=\"how\">How? <a class=\"header-anchor\" href=\"#how\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>The docs for the <code>applymap</code>
    method state simply:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>Apply a CSS-styling function
    elementwise.\n\nUpdates the HTML representation with the result.\n</pre></div>\n\n</pre>\n\n<p>So
    we can write a function that returns <code>color: {color}</code> based on the
    dataframe\nvalues and when we drop that dataframe to html we'll have some simple
    css\nstyling applied automagically!</p>\n<p>By default the function will be applied
    to all columns of the dataframe, but\nthat's not useful if the columns are different
    types which is usually the case.\nLuckily there is a <code>subset</code> keyword
    to only apply to the columns you need!</p>\n<p>Consider my example</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
    class=\"o\">.</span><span class=\"n\">read_csv</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;cars.csv&quot;</span><span class=\"p\">)</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">mpg_color</span><span
    class=\"p\">(</span><span class=\"n\">val</span><span class=\"p\">:</span> <span
    class=\"nb\">float</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"n\">color</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;red&quot;</span> <span class=\"k\">if</span> <span class=\"n\">val</span>
    <span class=\"o\">&lt;</span> <span class=\"mi\">21</span> <span class=\"k\">else</span>
    <span class=\"s2\">&quot;green&quot;</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"k\">return</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;color: </span><span class=\"si\">{</span><span class=\"n\">color</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"err\">\uF7A1</span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">style</span><span
    class=\"o\">.</span><span class=\"n\">applymap</span><span class=\"p\">(</span><span
    class=\"n\">mpg_color</span><span class=\"p\">,</span> <span class=\"n\">subset</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mpg&quot;</span><span class=\"p\">)</span><span
    class=\"o\">.</span><span class=\"n\">to_html</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;color.html&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>I
    want to quickly see if the <code>mpg</code> is any good for the cars in the cars
    dataset\nand I'll define &quot;good&quot; as better than 21 mpg (not great I know
    but just for the\nsake of discussion...)</p>\n<p>The function returns an appropriate
    css string and after I <code>style.applymap</code> on just the <code>mpg</code>
    column we get this!</p>\n<style type=\"text/css\">\n#T_95e99_row0_col1, #T_95e99_row1_col1,
    #T_95e99_row2_col1, #T_95e99_row3_col1 {\n  color: green;\n}\n#T_95e99_row4_col1
    {\n  color: red;\n}\n</style>\n<table id=\"T_95e99\">\n  <thead>\n    <tr>\n      <th
    class=\"blank level0\" >&nbsp;</th>\n      <th id=\"T_95e99_level0_col0\" class=\"col_heading
    level0 col0\" >Unnamed: 0</th>\n      <th id=\"T_95e99_level0_col1\" class=\"col_heading
    level0 col1\" >mpg</th>\n      <th id=\"T_95e99_level0_col2\" class=\"col_heading
    level0 col2\" >cyl</th>\n      <th id=\"T_95e99_level0_col3\" class=\"col_heading
    level0 col3\" >disp</th>\n      <th id=\"T_95e99_level0_col4\" class=\"col_heading
    level0 col4\" >hp</th>\n      <th id=\"T_95e99_level0_col5\" class=\"col_heading
    level0 col5\" >drat</th>\n      <th id=\"T_95e99_level0_col6\" class=\"col_heading
    level0 col6\" >wt</th>\n      <th id=\"T_95e99_level0_col7\" class=\"col_heading
    level0 col7\" >qsec</th>\n      <th id=\"T_95e99_level0_col8\" class=\"col_heading
    level0 col8\" >vs</th>\n      <th id=\"T_95e99_level0_col9\" class=\"col_heading
    level0 col9\" >am</th>\n      <th id=\"T_95e99_level0_col10\" class=\"col_heading
    level0 col10\" >gear</th>\n      <th id=\"T_95e99_level0_col11\" class=\"col_heading
    level0 col11\" >carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th
    id=\"T_95e99_level0_row0\" class=\"row_heading level0 row0\" >0</th>\n      <td
    id=\"T_95e99_row0_col0\" class=\"data row0 col0\" >Mazda RX4</td>\n      <td id=\"T_95e99_row0_col1\"
    class=\"data row0 col1\" >21.000000</td>\n      <td id=\"T_95e99_row0_col2\" class=\"data
    row0 col2\" >6</td>\n      <td id=\"T_95e99_row0_col3\" class=\"data row0 col3\"
    >160.000000</td>\n      <td id=\"T_95e99_row0_col4\" class=\"data row0 col4\"
    >110</td>\n      <td id=\"T_95e99_row0_col5\" class=\"data row0 col5\" >3.900000</td>\n
    \     <td id=\"T_95e99_row0_col6\" class=\"data row0 col6\" >2.620000</td>\n      <td
    id=\"T_95e99_row0_col7\" class=\"data row0 col7\" >16.460000</td>\n      <td id=\"T_95e99_row0_col8\"
    class=\"data row0 col8\" >0</td>\n      <td id=\"T_95e99_row0_col9\" class=\"data
    row0 col9\" >1</td>\n      <td id=\"T_95e99_row0_col10\" class=\"data row0 col10\"
    >4</td>\n      <td id=\"T_95e99_row0_col11\" class=\"data row0 col11\" >4</td>\n
    \   </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row1\" class=\"row_heading
    level0 row1\" >1</th>\n      <td id=\"T_95e99_row1_col0\" class=\"data row1 col0\"
    >Mazda RX4 Wag</td>\n      <td id=\"T_95e99_row1_col1\" class=\"data row1 col1\"
    >21.000000</td>\n      <td id=\"T_95e99_row1_col2\" class=\"data row1 col2\" >6</td>\n
    \     <td id=\"T_95e99_row1_col3\" class=\"data row1 col3\" >160.000000</td>\n
    \     <td id=\"T_95e99_row1_col4\" class=\"data row1 col4\" >110</td>\n      <td
    id=\"T_95e99_row1_col5\" class=\"data row1 col5\" >3.900000</td>\n      <td id=\"T_95e99_row1_col6\"
    class=\"data row1 col6\" >2.875000</td>\n      <td id=\"T_95e99_row1_col7\" class=\"data
    row1 col7\" >17.020000</td>\n      <td id=\"T_95e99_row1_col8\" class=\"data row1
    col8\" >0</td>\n      <td id=\"T_95e99_row1_col9\" class=\"data row1 col9\" >1</td>\n
    \     <td id=\"T_95e99_row1_col10\" class=\"data row1 col10\" >4</td>\n      <td
    id=\"T_95e99_row1_col11\" class=\"data row1 col11\" >4</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row2\" class=\"row_heading level0 row2\" >2</th>\n
    \     <td id=\"T_95e99_row2_col0\" class=\"data row2 col0\" >Datsun 710</td>\n
    \     <td id=\"T_95e99_row2_col1\" class=\"data row2 col1\" >22.800000</td>\n
    \     <td id=\"T_95e99_row2_col2\" class=\"data row2 col2\" >4</td>\n      <td
    id=\"T_95e99_row2_col3\" class=\"data row2 col3\" >108.000000</td>\n      <td
    id=\"T_95e99_row2_col4\" class=\"data row2 col4\" >93</td>\n      <td id=\"T_95e99_row2_col5\"
    class=\"data row2 col5\" >3.850000</td>\n      <td id=\"T_95e99_row2_col6\" class=\"data
    row2 col6\" >2.320000</td>\n      <td id=\"T_95e99_row2_col7\" class=\"data row2
    col7\" >18.610000</td>\n      <td id=\"T_95e99_row2_col8\" class=\"data row2 col8\"
    >1</td>\n      <td id=\"T_95e99_row2_col9\" class=\"data row2 col9\" >1</td>\n
    \     <td id=\"T_95e99_row2_col10\" class=\"data row2 col10\" >4</td>\n      <td
    id=\"T_95e99_row2_col11\" class=\"data row2 col11\" >1</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row3\" class=\"row_heading level0 row3\" >3</th>\n
    \     <td id=\"T_95e99_row3_col0\" class=\"data row3 col0\" >Hornet 4 Drive</td>\n
    \     <td id=\"T_95e99_row3_col1\" class=\"data row3 col1\" >21.400000</td>\n
    \     <td id=\"T_95e99_row3_col2\" class=\"data row3 col2\" >6</td>\n      <td
    id=\"T_95e99_row3_col3\" class=\"data row3 col3\" >258.000000</td>\n      <td
    id=\"T_95e99_row3_col4\" class=\"data row3 col4\" >110</td>\n      <td id=\"T_95e99_row3_col5\"
    class=\"data row3 col5\" >3.080000</td>\n      <td id=\"T_95e99_row3_col6\" class=\"data
    row3 col6\" >3.215000</td>\n      <td id=\"T_95e99_row3_col7\" class=\"data row3
    col7\" >19.440000</td>\n      <td id=\"T_95e99_row3_col8\" class=\"data row3 col8\"
    >1</td>\n      <td id=\"T_95e99_row3_col9\" class=\"data row3 col9\" >0</td>\n
    \     <td id=\"T_95e99_row3_col10\" class=\"data row3 col10\" >3</td>\n      <td
    id=\"T_95e99_row3_col11\" class=\"data row3 col11\" >1</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row4\" class=\"row_heading level0 row4\" >4</th>\n
    \     <td id=\"T_95e99_row4_col0\" class=\"data row4 col0\" >Hornet Sportabout</td>\n
    \     <td id=\"T_95e99_row4_col1\" class=\"data row4 col1\" >18.700000</td>\n
    \     <td id=\"T_95e99_row4_col2\" class=\"data row4 col2\" >8</td>\n      <td
    id=\"T_95e99_row4_col3\" class=\"data row4 col3\" >360.000000</td>\n      <td
    id=\"T_95e99_row4_col4\" class=\"data row4 col4\" >175</td>\n      <td id=\"T_95e99_row4_col5\"
    class=\"data row4 col5\" >3.150000</td>\n      <td id=\"T_95e99_row4_col6\" class=\"data
    row4 col6\" >3.440000</td>\n      <td id=\"T_95e99_row4_col7\" class=\"data row4
    col7\" >17.020000</td>\n      <td id=\"T_95e99_row4_col8\" class=\"data row4 col8\"
    >0</td>\n      <td id=\"T_95e99_row4_col9\" class=\"data row4 col9\" >0</td>\n
    \     <td id=\"T_95e99_row4_col10\" class=\"data row4 col10\" >3</td>\n      <td
    id=\"T_95e99_row4_col11\" class=\"data row4 col11\" >2</td>\n    </tr>\n  </tbody>\n</table>\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2022-06-04 06:12:33\ntemplateKey: til\ntitle: Add colored indicators
    to your dataframes html representation\npublished: True\ntags:\n  - python\n  -
    data\n  - tech\n  - til\n\n---\n\n[Mike Driscoll](https://twitter.com/driscollis)
    recently tweeted about making\ncolored out with pandas DataFrames and I just had
    to try it for myself\n\n# Use Case\n\nFirst though... why?\nMy biggest use case
    is a monitoring pipeline of mine... The details aside, the\noutput of my pipeline
    is a dataframe where each row has information about a\nfailed pipeline that I
    need to go look into. I dump that result to a simle html\nfile that's hosted on
    an internal site and the file is updated every couple of\nhours. Adding some colored
    indicators automatically to the rows to help me\nassess severity of each record
    would be a handy way to quickly get an\nunderstanding the state of our pipelines.\n\n#
    How?\n\nThe docs for the `applymap` method state simply:\n\n```\nApply a CSS-styling
    function elementwise.\n\nUpdates the HTML representation with the result.\n\n```\n\nSo
    we can write a function that returns `color: {color}` based on the dataframe\nvalues
    and when we drop that dataframe to html we'll have some simple css\nstyling applied
    automagically!\n\nBy default the function will be applied to all columns of the
    dataframe, but\nthat's not useful if the columns are different types which is
    usually the case.\nLuckily there is a `subset` keyword to only apply to the columns
    you need!\n\nConsider my example\n\n```python \nsandbox \uF7A1  main via 3.8.11(sandbox)
    ipython\n\u276F df = pd.read_csv(\"cars.csv\")\n\nsandbox \uF7A1  main via 3.8.11(sandbox)
    ipython\n\u276F def mpg_color(val: float):\n...:     color = \"red\" if val <
    21 else \"green\"\n...:     return f\"color: {color}\"\n\nsandbox \uF7A1  main
    via 3.8.11(sandbox) ipython\n\u276F df.style.applymap(mpg_color, subset=\"mpg\").to_html(\"color.html\")\n```\n\nI
    want to quickly see if the `mpg` is any good for the cars in the cars dataset\nand
    I'll define \"good\" as better than 21 mpg (not great I know but just for the\nsake
    of discussion...)\n\nThe function returns an appropriate css string and after
    I `style.applymap` on just the `mpg` column we get this!\n\n\n<style type=\"text/css\">\n#T_95e99_row0_col1,
    #T_95e99_row1_col1, #T_95e99_row2_col1, #T_95e99_row3_col1 {\n  color: green;\n}\n#T_95e99_row4_col1
    {\n  color: red;\n}\n</style>\n<table id=\"T_95e99\">\n  <thead>\n    <tr>\n      <th
    class=\"blank level0\" >&nbsp;</th>\n      <th id=\"T_95e99_level0_col0\" class=\"col_heading
    level0 col0\" >Unnamed: 0</th>\n      <th id=\"T_95e99_level0_col1\" class=\"col_heading
    level0 col1\" >mpg</th>\n      <th id=\"T_95e99_level0_col2\" class=\"col_heading
    level0 col2\" >cyl</th>\n      <th id=\"T_95e99_level0_col3\" class=\"col_heading
    level0 col3\" >disp</th>\n      <th id=\"T_95e99_level0_col4\" class=\"col_heading
    level0 col4\" >hp</th>\n      <th id=\"T_95e99_level0_col5\" class=\"col_heading
    level0 col5\" >drat</th>\n      <th id=\"T_95e99_level0_col6\" class=\"col_heading
    level0 col6\" >wt</th>\n      <th id=\"T_95e99_level0_col7\" class=\"col_heading
    level0 col7\" >qsec</th>\n      <th id=\"T_95e99_level0_col8\" class=\"col_heading
    level0 col8\" >vs</th>\n      <th id=\"T_95e99_level0_col9\" class=\"col_heading
    level0 col9\" >am</th>\n      <th id=\"T_95e99_level0_col10\" class=\"col_heading
    level0 col10\" >gear</th>\n      <th id=\"T_95e99_level0_col11\" class=\"col_heading
    level0 col11\" >carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th
    id=\"T_95e99_level0_row0\" class=\"row_heading level0 row0\" >0</th>\n      <td
    id=\"T_95e99_row0_col0\" class=\"data row0 col0\" >Mazda RX4</td>\n      <td id=\"T_95e99_row0_col1\"
    class=\"data row0 col1\" >21.000000</td>\n      <td id=\"T_95e99_row0_col2\" class=\"data
    row0 col2\" >6</td>\n      <td id=\"T_95e99_row0_col3\" class=\"data row0 col3\"
    >160.000000</td>\n      <td id=\"T_95e99_row0_col4\" class=\"data row0 col4\"
    >110</td>\n      <td id=\"T_95e99_row0_col5\" class=\"data row0 col5\" >3.900000</td>\n
    \     <td id=\"T_95e99_row0_col6\" class=\"data row0 col6\" >2.620000</td>\n      <td
    id=\"T_95e99_row0_col7\" class=\"data row0 col7\" >16.460000</td>\n      <td id=\"T_95e99_row0_col8\"
    class=\"data row0 col8\" >0</td>\n      <td id=\"T_95e99_row0_col9\" class=\"data
    row0 col9\" >1</td>\n      <td id=\"T_95e99_row0_col10\" class=\"data row0 col10\"
    >4</td>\n      <td id=\"T_95e99_row0_col11\" class=\"data row0 col11\" >4</td>\n
    \   </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row1\" class=\"row_heading
    level0 row1\" >1</th>\n      <td id=\"T_95e99_row1_col0\" class=\"data row1 col0\"
    >Mazda RX4 Wag</td>\n      <td id=\"T_95e99_row1_col1\" class=\"data row1 col1\"
    >21.000000</td>\n      <td id=\"T_95e99_row1_col2\" class=\"data row1 col2\" >6</td>\n
    \     <td id=\"T_95e99_row1_col3\" class=\"data row1 col3\" >160.000000</td>\n
    \     <td id=\"T_95e99_row1_col4\" class=\"data row1 col4\" >110</td>\n      <td
    id=\"T_95e99_row1_col5\" class=\"data row1 col5\" >3.900000</td>\n      <td id=\"T_95e99_row1_col6\"
    class=\"data row1 col6\" >2.875000</td>\n      <td id=\"T_95e99_row1_col7\" class=\"data
    row1 col7\" >17.020000</td>\n      <td id=\"T_95e99_row1_col8\" class=\"data row1
    col8\" >0</td>\n      <td id=\"T_95e99_row1_col9\" class=\"data row1 col9\" >1</td>\n
    \     <td id=\"T_95e99_row1_col10\" class=\"data row1 col10\" >4</td>\n      <td
    id=\"T_95e99_row1_col11\" class=\"data row1 col11\" >4</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row2\" class=\"row_heading level0 row2\" >2</th>\n
    \     <td id=\"T_95e99_row2_col0\" class=\"data row2 col0\" >Datsun 710</td>\n
    \     <td id=\"T_95e99_row2_col1\" class=\"data row2 col1\" >22.800000</td>\n
    \     <td id=\"T_95e99_row2_col2\" class=\"data row2 col2\" >4</td>\n      <td
    id=\"T_95e99_row2_col3\" class=\"data row2 col3\" >108.000000</td>\n      <td
    id=\"T_95e99_row2_col4\" class=\"data row2 col4\" >93</td>\n      <td id=\"T_95e99_row2_col5\"
    class=\"data row2 col5\" >3.850000</td>\n      <td id=\"T_95e99_row2_col6\" class=\"data
    row2 col6\" >2.320000</td>\n      <td id=\"T_95e99_row2_col7\" class=\"data row2
    col7\" >18.610000</td>\n      <td id=\"T_95e99_row2_col8\" class=\"data row2 col8\"
    >1</td>\n      <td id=\"T_95e99_row2_col9\" class=\"data row2 col9\" >1</td>\n
    \     <td id=\"T_95e99_row2_col10\" class=\"data row2 col10\" >4</td>\n      <td
    id=\"T_95e99_row2_col11\" class=\"data row2 col11\" >1</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row3\" class=\"row_heading level0 row3\" >3</th>\n
    \     <td id=\"T_95e99_row3_col0\" class=\"data row3 col0\" >Hornet 4 Drive</td>\n
    \     <td id=\"T_95e99_row3_col1\" class=\"data row3 col1\" >21.400000</td>\n
    \     <td id=\"T_95e99_row3_col2\" class=\"data row3 col2\" >6</td>\n      <td
    id=\"T_95e99_row3_col3\" class=\"data row3 col3\" >258.000000</td>\n      <td
    id=\"T_95e99_row3_col4\" class=\"data row3 col4\" >110</td>\n      <td id=\"T_95e99_row3_col5\"
    class=\"data row3 col5\" >3.080000</td>\n      <td id=\"T_95e99_row3_col6\" class=\"data
    row3 col6\" >3.215000</td>\n      <td id=\"T_95e99_row3_col7\" class=\"data row3
    col7\" >19.440000</td>\n      <td id=\"T_95e99_row3_col8\" class=\"data row3 col8\"
    >1</td>\n      <td id=\"T_95e99_row3_col9\" class=\"data row3 col9\" >0</td>\n
    \     <td id=\"T_95e99_row3_col10\" class=\"data row3 col10\" >3</td>\n      <td
    id=\"T_95e99_row3_col11\" class=\"data row3 col11\" >1</td>\n    </tr>\n    <tr>\n
    \     <th id=\"T_95e99_level0_row4\" class=\"row_heading level0 row4\" >4</th>\n
    \     <td id=\"T_95e99_row4_col0\" class=\"data row4 col0\" >Hornet Sportabout</td>\n
    \     <td id=\"T_95e99_row4_col1\" class=\"data row4 col1\" >18.700000</td>\n
    \     <td id=\"T_95e99_row4_col2\" class=\"data row4 col2\" >8</td>\n      <td
    id=\"T_95e99_row4_col3\" class=\"data row4 col3\" >360.000000</td>\n      <td
    id=\"T_95e99_row4_col4\" class=\"data row4 col4\" >175</td>\n      <td id=\"T_95e99_row4_col5\"
    class=\"data row4 col5\" >3.150000</td>\n      <td id=\"T_95e99_row4_col6\" class=\"data
    row4 col6\" >3.440000</td>\n      <td id=\"T_95e99_row4_col7\" class=\"data row4
    col7\" >17.020000</td>\n      <td id=\"T_95e99_row4_col8\" class=\"data row4 col8\"
    >0</td>\n      <td id=\"T_95e99_row4_col9\" class=\"data row4 col9\" >0</td>\n
    \     <td id=\"T_95e99_row4_col10\" class=\"data row4 col10\" >3</td>\n      <td
    id=\"T_95e99_row4_col11\" class=\"data row4 col11\" >2</td>\n    </tr>\n  </tbody>\n</table>\n\n\n"
published: true
slug: add-colored-indicators-to-your-dataframes-html-representation
title: Add colored indicators to your dataframes html representation


---

[Mike Driscoll](https://twitter.com/driscollis) recently tweeted about making
colored out with pandas DataFrames and I just had to try it for myself

# Use Case

First though... why?
My biggest use case is a monitoring pipeline of mine... The details aside, the
output of my pipeline is a dataframe where each row has information about a
failed pipeline that I need to go look into. I dump that result to a simle html
file that's hosted on an internal site and the file is updated every couple of
hours. Adding some colored indicators automatically to the rows to help me
assess severity of each record would be a handy way to quickly get an
understanding the state of our pipelines.

# How?

The docs for the `applymap` method state simply:

```
Apply a CSS-styling function elementwise.

Updates the HTML representation with the result.

```

So we can write a function that returns `color: {color}` based on the dataframe
values and when we drop that dataframe to html we'll have some simple css
styling applied automagically!

By default the function will be applied to all columns of the dataframe, but
that's not useful if the columns are different types which is usually the case.
Luckily there is a `subset` keyword to only apply to the columns you need!

Consider my example

```python 
sandbox   main via 3.8.11(sandbox) ipython
❯ df = pd.read_csv("cars.csv")

sandbox   main via 3.8.11(sandbox) ipython
❯ def mpg_color(val: float):
...:     color = "red" if val < 21 else "green"
...:     return f"color: {color}"

sandbox   main via 3.8.11(sandbox) ipython
❯ df.style.applymap(mpg_color, subset="mpg").to_html("color.html")
```

I want to quickly see if the `mpg` is any good for the cars in the cars dataset
and I'll define "good" as better than 21 mpg (not great I know but just for the
sake of discussion...)

The function returns an appropriate css string and after I `style.applymap` on just the `mpg` column we get this!


<style type="text/css">
#T_95e99_row0_col1, #T_95e99_row1_col1, #T_95e99_row2_col1, #T_95e99_row3_col1 {
  color: green;
}
#T_95e99_row4_col1 {
  color: red;
}
</style>
<table id="T_95e99">
  <thead>
    <tr>
      <th class="blank level0" >&nbsp;</th>
      <th id="T_95e99_level0_col0" class="col_heading level0 col0" >Unnamed: 0</th>
      <th id="T_95e99_level0_col1" class="col_heading level0 col1" >mpg</th>
      <th id="T_95e99_level0_col2" class="col_heading level0 col2" >cyl</th>
      <th id="T_95e99_level0_col3" class="col_heading level0 col3" >disp</th>
      <th id="T_95e99_level0_col4" class="col_heading level0 col4" >hp</th>
      <th id="T_95e99_level0_col5" class="col_heading level0 col5" >drat</th>
      <th id="T_95e99_level0_col6" class="col_heading level0 col6" >wt</th>
      <th id="T_95e99_level0_col7" class="col_heading level0 col7" >qsec</th>
      <th id="T_95e99_level0_col8" class="col_heading level0 col8" >vs</th>
      <th id="T_95e99_level0_col9" class="col_heading level0 col9" >am</th>
      <th id="T_95e99_level0_col10" class="col_heading level0 col10" >gear</th>
      <th id="T_95e99_level0_col11" class="col_heading level0 col11" >carb</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_95e99_level0_row0" class="row_heading level0 row0" >0</th>
      <td id="T_95e99_row0_col0" class="data row0 col0" >Mazda RX4</td>
      <td id="T_95e99_row0_col1" class="data row0 col1" >21.000000</td>
      <td id="T_95e99_row0_col2" class="data row0 col2" >6</td>
      <td id="T_95e99_row0_col3" class="data row0 col3" >160.000000</td>
      <td id="T_95e99_row0_col4" class="data row0 col4" >110</td>
      <td id="T_95e99_row0_col5" class="data row0 col5" >3.900000</td>
      <td id="T_95e99_row0_col6" class="data row0 col6" >2.620000</td>
      <td id="T_95e99_row0_col7" class="data row0 col7" >16.460000</td>
      <td id="T_95e99_row0_col8" class="data row0 col8" >0</td>
      <td id="T_95e99_row0_col9" class="data row0 col9" >1</td>
      <td id="T_95e99_row0_col10" class="data row0 col10" >4</td>
      <td id="T_95e99_row0_col11" class="data row0 col11" >4</td>
    </tr>
    <tr>
      <th id="T_95e99_level0_row1" class="row_heading level0 row1" >1</th>
      <td id="T_95e99_row1_col0" class="data row1 col0" >Mazda RX4 Wag</td>
      <td id="T_95e99_row1_col1" class="data row1 col1" >21.000000</td>
      <td id="T_95e99_row1_col2" class="data row1 col2" >6</td>
      <td id="T_95e99_row1_col3" class="data row1 col3" >160.000000</td>
      <td id="T_95e99_row1_col4" class="data row1 col4" >110</td>
      <td id="T_95e99_row1_col5" class="data row1 col5" >3.900000</td>
      <td id="T_95e99_row1_col6" class="data row1 col6" >2.875000</td>
      <td id="T_95e99_row1_col7" class="data row1 col7" >17.020000</td>
      <td id="T_95e99_row1_col8" class="data row1 col8" >0</td>
      <td id="T_95e99_row1_col9" class="data row1 col9" >1</td>
      <td id="T_95e99_row1_col10" class="data row1 col10" >4</td>
      <td id="T_95e99_row1_col11" class="data row1 col11" >4</td>
    </tr>
    <tr>
      <th id="T_95e99_level0_row2" class="row_heading level0 row2" >2</th>
      <td id="T_95e99_row2_col0" class="data row2 col0" >Datsun 710</td>
      <td id="T_95e99_row2_col1" class="data row2 col1" >22.800000</td>
      <td id="T_95e99_row2_col2" class="data row2 col2" >4</td>
      <td id="T_95e99_row2_col3" class="data row2 col3" >108.000000</td>
      <td id="T_95e99_row2_col4" class="data row2 col4" >93</td>
      <td id="T_95e99_row2_col5" class="data row2 col5" >3.850000</td>
      <td id="T_95e99_row2_col6" class="data row2 col6" >2.320000</td>
      <td id="T_95e99_row2_col7" class="data row2 col7" >18.610000</td>
      <td id="T_95e99_row2_col8" class="data row2 col8" >1</td>
      <td id="T_95e99_row2_col9" class="data row2 col9" >1</td>
      <td id="T_95e99_row2_col10" class="data row2 col10" >4</td>
      <td id="T_95e99_row2_col11" class="data row2 col11" >1</td>
    </tr>
    <tr>
      <th id="T_95e99_level0_row3" class="row_heading level0 row3" >3</th>
      <td id="T_95e99_row3_col0" class="data row3 col0" >Hornet 4 Drive</td>
      <td id="T_95e99_row3_col1" class="data row3 col1" >21.400000</td>
      <td id="T_95e99_row3_col2" class="data row3 col2" >6</td>
      <td id="T_95e99_row3_col3" class="data row3 col3" >258.000000</td>
      <td id="T_95e99_row3_col4" class="data row3 col4" >110</td>
      <td id="T_95e99_row3_col5" class="data row3 col5" >3.080000</td>
      <td id="T_95e99_row3_col6" class="data row3 col6" >3.215000</td>
      <td id="T_95e99_row3_col7" class="data row3 col7" >19.440000</td>
      <td id="T_95e99_row3_col8" class="data row3 col8" >1</td>
      <td id="T_95e99_row3_col9" class="data row3 col9" >0</td>
      <td id="T_95e99_row3_col10" class="data row3 col10" >3</td>
      <td id="T_95e99_row3_col11" class="data row3 col11" >1</td>
    </tr>
    <tr>
      <th id="T_95e99_level0_row4" class="row_heading level0 row4" >4</th>
      <td id="T_95e99_row4_col0" class="data row4 col0" >Hornet Sportabout</td>
      <td id="T_95e99_row4_col1" class="data row4 col1" >18.700000</td>
      <td id="T_95e99_row4_col2" class="data row4 col2" >8</td>
      <td id="T_95e99_row4_col3" class="data row4 col3" >360.000000</td>
      <td id="T_95e99_row4_col4" class="data row4 col4" >175</td>
      <td id="T_95e99_row4_col5" class="data row4 col5" >3.150000</td>
      <td id="T_95e99_row4_col6" class="data row4 col6" >3.440000</td>
      <td id="T_95e99_row4_col7" class="data row4 col7" >17.020000</td>
      <td id="T_95e99_row4_col8" class="data row4 col8" >0</td>
      <td id="T_95e99_row4_col9" class="data row4 col9" >0</td>
      <td id="T_95e99_row4_col10" class="data row4 col10" >3</td>
      <td id="T_95e99_row4_col11" class="data row4 col11" >2</td>
    </tr>
  </tbody>
</table>