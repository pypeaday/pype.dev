---
content: "## Streamlit\n\n\nI use `streamlit` for any EDA I ever have to do at work.\nIt's
  super easy to spin up a small dashboard to filter and view dataframes in, live,
  without the fallbacks of Jupyter notebooks (kernels dying, memory bloat, a billion
  \"Untitled N.ipynb\" files, etc.)\n\nAt the highest level, streamlit lets you write
  a python script and call `streamlit run my_script.py` which will open up a web server
  with your streamlit stuff. \nThe dashboard refreshes whenever you change the script
  so you can add capabilities in real time, super fast!\n\n\nI'll show an example
  of using `streamlit` and `plotly` to make a live dashboard to monitor system memory
  usage with `psutil`.\nThis is apart of my posts on [psutil](/psutil) and [deques](/deques)...\n\n__example
  at the bottom!__\n\n\n\n## Plotly\n\nI'm not going to make a big time intro to plotly
  here - there's a billion resources on the interwebs and the docs are really good.\n\nSuffice
  it to say it's my goto plotting library for basically any and all needs.\nI'm currently
  exploring it for live data streaming as I'm not sure it's the best solution but
  it's the one I'm familiar with.\n\nFor my [ not-netdata ](https://github.com/nicpayne713/not-netdata)
  project of visualizing live system resource data I  first need a way of appending
  data and popping data in and out of an array at every data refresh cycle to keep
  my plots looking nice with a fixed time window.\n\nSee [deques](/deques) for a short
  intro to the datatype I'm using.\n\nFirst step is to initialize some objects to
  store data in.\n\n```python\ndata: Dict[str, MutableSequence[Optional[float]]] =
  defaultdict(deque)\n\narr_size = 10\n\ndata[\"time\"] = deque([None] * arr_size)\ndata[\"used_memory\"]
  = deque([None] * arr_size)\n```\n\n`data` is a dictionary that I'll store deques
  in. The dictionary keys will be the type of data, in this case `time` and `used_memory`.\n\nI
  fix an array size, `arr_size` to just 10 for now\n\nThen I initialize the values
  for `time` and `used_memory` as `deque`s of length `arr_size`.\nSimple enough!\n\nNext
  is to fill those deques with some relevant data.\nI'm not actually sure if this
  is the best way to do this but here's what I have done so far:\n\n```python\ndef
  refresh_data():\n    global data\n    memory = psutil.virtual_memory()\n\n    data[\"time\"].append(time.strftime(\"%Y-%m-%d
  %H:%M:%S\", time.localtime()))\n    data[\"used_memory\"].append(memory.used //
  (1024**3))\n\n    data[\"time\"].popleft()\n    data[\"used_memory\"].popleft()\n```\n\nIf
  you ignore my usage of `global` you'll see that I can just `append` to each deque
  like it was a list.\n\nBut then to keep the relevant data in the deque, and to keep
  the length fixed, I simply `popleft` to remove the oldest datapoint!\n\n\n## A trivial
  dashboard\n\nNow I'll prove just how easy it is to get a live data dashboard up
  and running with just a few lines of code thanks to streamlit!\n\n```python\n\nif
  __name__ == \"__main__\":\n    st.header(\"memory chart\")\n    stats = st.empty()\n
  \   while True:\n        refresh_data()\n        stats.plotly_chart(\n            px.line(\n
  \               data,\n                x=\"time\",\n                y=\"used_memory\",\n
  \               title=f\"Memory usage stored in a deque!\",\n               )\n
  \           )\n        time.sleep(0.5)\n```\n\n`st` is the streamlit alias (imports
  shows at the bottom full example).\n`st.header` puts a nice header on the page.\n`st.empty`
  initializes an empty `streamlit container` in which we'll put a `plotly.express`
  figure.\n\nAt each iteration we'll `refresh_data()` which `appends` and `pops` data
  in the deques in the `data` dictionary.\nThen we update the `stats` container with
  a plotly graph and the refresh happens seamlessly.\n\nAll in all the script looks
  like this:\n\n```python\n\nfrom collections import defaultdict, deque\nimport time\nfrom
  typing import Dict, MutableSequence, Optional\n\nfrom plotly import express as px\nimport
  psutil\nimport streamlit as st\n\ndata: Dict[str, MutableSequence[Optional[float]]]
  = defaultdict(deque)\n\narr_size = 10\n\ndata[\"time\"] = deque([None] * arr_size)\ndata[\"used_memory\"]
  = deque([None] * arr_size)\n\n\ndef refresh_data():\n    global data\n    memory
  = psutil.virtual_memory()\n\n    data[\"time\"].append(time.strftime(\"%Y-%m-%d
  %H:%M:%S\", time.localtime()))\n    data[\"used_memory\"].append(memory.used //
  (1024**3))\n\n    data[\"time\"].popleft()\n    data[\"used_memory\"].popleft()\n\n\ndef
  memory_chart():\n    fig = px.line(\n        data,\n        x=\"time\",\n        y=\"used_memory\",\n
  \       title=f\"Memory usage stored in a deque!\",\n    )\n    return fig\n\n\nif
  __name__ == \"__main__\":\n    st.header(\"memory chart\")\n    stats = st.empty()\n
  \   while True:\n        refresh_data()\n        stats.plotly_chart(memory_chart())\n
  \       time.sleep(0.5)\n```\n\nYou can save this as `my_dash.py` and run with `streamlit
  run my_dash.py` and should see something like the following!\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/plotly-streamlit.gif\"
  alt=\"plotly\" title=\"Plotly in Streamlit\" />"
date: 2022-03-31
description: 'Streamlit I use `streamlit` for any EDA I ever have to do at work.

  It&#x27;s super easy to spin up a small dashboard to filter and view dataframes
  in, live, wit'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Plotly-And-Streamlit</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Streamlit I use `streamlit` for any EDA
    I ever have to do at work.\nIt&#x27;s super easy to spin up a small dashboard
    to filter and view dataframes in, live, wit\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Plotly-And-Streamlit | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/plotly-and-streamlit\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Plotly-And-Streamlit | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Streamlit I use `streamlit` for any EDA I ever have to do at work.\nIt&#x27;s
    super easy to spin up a small dashboard to filter and view dataframes in, live,
    wit\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/plotly-and-streamlit</span>\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Plotly-And-Streamlit</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-31\">\n            March
    31, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"streamlit\">Streamlit <a class=\"header-anchor\"
    href=\"#streamlit\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I use <code>streamlit</code>
    for any EDA I ever have to do at work.\nIt's super easy to spin up a small dashboard
    to filter and view dataframes in, live, without the fallbacks of Jupyter notebooks
    (kernels dying, memory bloat, a billion &quot;Untitled N.ipynb&quot; files, etc.)</p>\n<p>At
    the highest level, streamlit lets you write a python script and call <code>streamlit
    run my_script.py</code> which will open up a web server with your streamlit stuff.\nThe
    dashboard refreshes whenever you change the script so you can add capabilities
    in real time, super fast!</p>\n<p>I'll show an example of using <code>streamlit</code>
    and <code>plotly</code> to make a live dashboard to monitor system memory usage
    with <code>psutil</code>.\nThis is apart of my posts on <a href=\"/psutil\">psutil</a>
    and <a href=\"/deques\">deques</a>...</p>\n<p><strong>example at the bottom!</strong></p>\n<h2
    id=\"plotly\">Plotly <a class=\"header-anchor\" href=\"#plotly\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm not going to make
    a big time intro to plotly here - there's a billion resources on the interwebs
    and the docs are really good.</p>\n<p>Suffice it to say it's my goto plotting
    library for basically any and all needs.\nI'm currently exploring it for live
    data streaming as I'm not sure it's the best solution but it's the one I'm familiar
    with.</p>\n<p>For my <a href=\"https://github.com/nicpayne713/not-netdata\"> not-netdata
    </a> project of visualizing live system resource data I  first need a way of appending
    data and popping data in and out of an array at every data refresh cycle to keep
    my plots looking nice with a fixed time window.</p>\n<p>See <a href=\"/deques\">deques</a>
    for a short intro to the datatype I'm using.</p>\n<p>First step is to initialize
    some objects to store data in.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">data</span><span
    class=\"p\">:</span> <span class=\"n\">Dict</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span
    class=\"p\">[</span><span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">float</span><span class=\"p\">]]]</span> <span class=\"o\">=</span>
    <span class=\"n\">defaultdict</span><span class=\"p\">(</span><span class=\"n\">deque</span><span
    class=\"p\">)</span>\n\n<span class=\"n\">arr_size</span> <span class=\"o\">=</span>
    <span class=\"mi\">10</span>\n\n<span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">deque</span><span class=\"p\">([</span><span class=\"kc\">None</span><span
    class=\"p\">]</span> <span class=\"o\">*</span> <span class=\"n\">arr_size</span><span
    class=\"p\">)</span>\n<span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">deque</span><span class=\"p\">([</span><span class=\"kc\">None</span><span
    class=\"p\">]</span> <span class=\"o\">*</span> <span class=\"n\">arr_size</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><code>data</code> is a dictionary
    that I'll store deques in. The dictionary keys will be the type of data, in this
    case <code>time</code> and <code>used_memory</code>.</p>\n<p>I fix an array size,
    <code>arr_size</code> to just 10 for now</p>\n<p>Then I initialize the values
    for <code>time</code> and <code>used_memory</code> as <code>deque</code>s of length
    <code>arr_size</code>.\nSimple enough!</p>\n<p>Next is to fill those deques with
    some relevant data.\nI'm not actually sure if this is the best way to do this
    but here's what I have done so far:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
    <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
    class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
    class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
    class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
    \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
    class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
    class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
    class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
    class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
    class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
    class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<p>If
    you ignore my usage of <code>global</code> you'll see that I can just <code>append</code>
    to each deque like it was a list.</p>\n<p>But then to keep the relevant data in
    the deque, and to keep the length fixed, I simply <code>popleft</code> to remove
    the oldest datapoint!</p>\n<h2 id=\"a-trivial-dashboard\">A trivial dashboard
    <a class=\"header-anchor\" href=\"#a-trivial-dashboard\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now I'll prove just
    how easy it is to get a live data dashboard up and running with just a few lines
    of code thanks to streamlit!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">if</span>
    <span class=\"vm\">__name__</span> <span class=\"o\">==</span> <span class=\"s2\">&quot;__main__&quot;</span><span
    class=\"p\">:</span>\n    <span class=\"n\">st</span><span class=\"o\">.</span><span
    class=\"n\">header</span><span class=\"p\">(</span><span class=\"s2\">&quot;memory
    chart&quot;</span><span class=\"p\">)</span>\n    <span class=\"n\">stats</span>
    <span class=\"o\">=</span> <span class=\"n\">st</span><span class=\"o\">.</span><span
    class=\"n\">empty</span><span class=\"p\">()</span>\n    <span class=\"k\">while</span>
    <span class=\"kc\">True</span><span class=\"p\">:</span>\n        <span class=\"n\">refresh_data</span><span
    class=\"p\">()</span>\n        <span class=\"n\">stats</span><span class=\"o\">.</span><span
    class=\"n\">plotly_chart</span><span class=\"p\">(</span>\n            <span class=\"n\">px</span><span
    class=\"o\">.</span><span class=\"n\">line</span><span class=\"p\">(</span>\n
    \               <span class=\"n\">data</span><span class=\"p\">,</span>\n                <span
    class=\"n\">x</span><span class=\"o\">=</span><span class=\"s2\">&quot;time&quot;</span><span
    class=\"p\">,</span>\n                <span class=\"n\">y</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">,</span>\n                <span
    class=\"n\">title</span><span class=\"o\">=</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span class=\"p\">,</span>\n
    \              <span class=\"p\">)</span>\n            <span class=\"p\">)</span>\n
    \       <span class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">sleep</span><span
    class=\"p\">(</span><span class=\"mf\">0.5</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><code>st</code>
    is the streamlit alias (imports shows at the bottom full example).\n<code>st.header</code>
    puts a nice header on the page.\n<code>st.empty</code> initializes an empty <code>streamlit
    container</code> in which we'll put a <code>plotly.express</code> figure.</p>\n<p>At
    each iteration we'll <code>refresh_data()</code> which <code>appends</code> and
    <code>pops</code> data in the deques in the <code>data</code> dictionary.\nThen
    we update the <code>stats</code> container with a plotly graph and the refresh
    happens seamlessly.</p>\n<p>All in all the script looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">collections</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">defaultdict</span><span class=\"p\">,</span>
    <span class=\"n\">deque</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">time</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">Dict</span><span class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span
    class=\"p\">,</span> <span class=\"n\">Optional</span>\n\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">plotly</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">express</span> <span class=\"k\">as</span>
    <span class=\"n\">px</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">psutil</span>\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">streamlit</span><span class=\"w\"> </span><span
    class=\"k\">as</span><span class=\"w\"> </span><span class=\"nn\">st</span>\n\n<span
    class=\"n\">data</span><span class=\"p\">:</span> <span class=\"n\">Dict</span><span
    class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">MutableSequence</span><span class=\"p\">[</span><span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"nb\">float</span><span class=\"p\">]]]</span>
    <span class=\"o\">=</span> <span class=\"n\">defaultdict</span><span class=\"p\">(</span><span
    class=\"n\">deque</span><span class=\"p\">)</span>\n\n<span class=\"n\">arr_size</span>
    <span class=\"o\">=</span> <span class=\"mi\">10</span>\n\n<span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
    class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span>
    <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n<span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
    class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span>
    <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
    <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
    class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
    class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
    class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
    \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
    class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
    class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
    class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
    class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
    class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
    class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n\n\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">memory_chart</span><span
    class=\"p\">():</span>\n    <span class=\"n\">fig</span> <span class=\"o\">=</span>
    <span class=\"n\">px</span><span class=\"o\">.</span><span class=\"n\">line</span><span
    class=\"p\">(</span>\n        <span class=\"n\">data</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">x</span><span class=\"o\">=</span><span class=\"s2\">&quot;time&quot;</span><span
    class=\"p\">,</span>\n        <span class=\"n\">y</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">,</span>\n        <span
    class=\"n\">title</span><span class=\"o\">=</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span class=\"p\">,</span>\n
    \   <span class=\"p\">)</span>\n    <span class=\"k\">return</span> <span class=\"n\">fig</span>\n\n\n<span
    class=\"k\">if</span> <span class=\"vm\">__name__</span> <span class=\"o\">==</span>
    <span class=\"s2\">&quot;__main__&quot;</span><span class=\"p\">:</span>\n    <span
    class=\"n\">st</span><span class=\"o\">.</span><span class=\"n\">header</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;memory chart&quot;</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">stats</span> <span class=\"o\">=</span> <span class=\"n\">st</span><span
    class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">while</span> <span class=\"kc\">True</span><span class=\"p\">:</span>\n
    \       <span class=\"n\">refresh_data</span><span class=\"p\">()</span>\n        <span
    class=\"n\">stats</span><span class=\"o\">.</span><span class=\"n\">plotly_chart</span><span
    class=\"p\">(</span><span class=\"n\">memory_chart</span><span class=\"p\">())</span>\n
    \       <span class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">sleep</span><span
    class=\"p\">(</span><span class=\"mf\">0.5</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can save this as <code>my_dash.py</code> and run with <code>streamlit run my_dash.py</code>
    and should see something like the following!</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/plotly-streamlit.gif\"
    alt=\"plotly\" title=\"Plotly in Streamlit\" />\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Plotly-And-Streamlit</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Streamlit I use `streamlit` for any EDA
    I ever have to do at work.\nIt&#x27;s super easy to spin up a small dashboard
    to filter and view dataframes in, live, wit\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Plotly-And-Streamlit | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/plotly-and-streamlit\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Plotly-And-Streamlit | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Streamlit I use `streamlit` for any EDA I ever have to do at work.\nIt&#x27;s
    super easy to spin up a small dashboard to filter and view dataframes in, live,
    wit\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Plotly-And-Streamlit</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-31\">\n            March
    31, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Plotly-And-Streamlit</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-31\">\n            March
    31, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"streamlit\">Streamlit <a class=\"header-anchor\"
    href=\"#streamlit\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I use <code>streamlit</code>
    for any EDA I ever have to do at work.\nIt's super easy to spin up a small dashboard
    to filter and view dataframes in, live, without the fallbacks of Jupyter notebooks
    (kernels dying, memory bloat, a billion &quot;Untitled N.ipynb&quot; files, etc.)</p>\n<p>At
    the highest level, streamlit lets you write a python script and call <code>streamlit
    run my_script.py</code> which will open up a web server with your streamlit stuff.\nThe
    dashboard refreshes whenever you change the script so you can add capabilities
    in real time, super fast!</p>\n<p>I'll show an example of using <code>streamlit</code>
    and <code>plotly</code> to make a live dashboard to monitor system memory usage
    with <code>psutil</code>.\nThis is apart of my posts on <a href=\"/psutil\">psutil</a>
    and <a href=\"/deques\">deques</a>...</p>\n<p><strong>example at the bottom!</strong></p>\n<h2
    id=\"plotly\">Plotly <a class=\"header-anchor\" href=\"#plotly\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm not going to make
    a big time intro to plotly here - there's a billion resources on the interwebs
    and the docs are really good.</p>\n<p>Suffice it to say it's my goto plotting
    library for basically any and all needs.\nI'm currently exploring it for live
    data streaming as I'm not sure it's the best solution but it's the one I'm familiar
    with.</p>\n<p>For my <a href=\"https://github.com/nicpayne713/not-netdata\"> not-netdata
    </a> project of visualizing live system resource data I  first need a way of appending
    data and popping data in and out of an array at every data refresh cycle to keep
    my plots looking nice with a fixed time window.</p>\n<p>See <a href=\"/deques\">deques</a>
    for a short intro to the datatype I'm using.</p>\n<p>First step is to initialize
    some objects to store data in.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">data</span><span
    class=\"p\">:</span> <span class=\"n\">Dict</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span
    class=\"p\">[</span><span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">float</span><span class=\"p\">]]]</span> <span class=\"o\">=</span>
    <span class=\"n\">defaultdict</span><span class=\"p\">(</span><span class=\"n\">deque</span><span
    class=\"p\">)</span>\n\n<span class=\"n\">arr_size</span> <span class=\"o\">=</span>
    <span class=\"mi\">10</span>\n\n<span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">deque</span><span class=\"p\">([</span><span class=\"kc\">None</span><span
    class=\"p\">]</span> <span class=\"o\">*</span> <span class=\"n\">arr_size</span><span
    class=\"p\">)</span>\n<span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">deque</span><span class=\"p\">([</span><span class=\"kc\">None</span><span
    class=\"p\">]</span> <span class=\"o\">*</span> <span class=\"n\">arr_size</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><code>data</code> is a dictionary
    that I'll store deques in. The dictionary keys will be the type of data, in this
    case <code>time</code> and <code>used_memory</code>.</p>\n<p>I fix an array size,
    <code>arr_size</code> to just 10 for now</p>\n<p>Then I initialize the values
    for <code>time</code> and <code>used_memory</code> as <code>deque</code>s of length
    <code>arr_size</code>.\nSimple enough!</p>\n<p>Next is to fill those deques with
    some relevant data.\nI'm not actually sure if this is the best way to do this
    but here's what I have done so far:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
    <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
    class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
    class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
    class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
    \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
    class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
    class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
    class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
    class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
    class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
    class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<p>If
    you ignore my usage of <code>global</code> you'll see that I can just <code>append</code>
    to each deque like it was a list.</p>\n<p>But then to keep the relevant data in
    the deque, and to keep the length fixed, I simply <code>popleft</code> to remove
    the oldest datapoint!</p>\n<h2 id=\"a-trivial-dashboard\">A trivial dashboard
    <a class=\"header-anchor\" href=\"#a-trivial-dashboard\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now I'll prove just
    how easy it is to get a live data dashboard up and running with just a few lines
    of code thanks to streamlit!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">if</span>
    <span class=\"vm\">__name__</span> <span class=\"o\">==</span> <span class=\"s2\">&quot;__main__&quot;</span><span
    class=\"p\">:</span>\n    <span class=\"n\">st</span><span class=\"o\">.</span><span
    class=\"n\">header</span><span class=\"p\">(</span><span class=\"s2\">&quot;memory
    chart&quot;</span><span class=\"p\">)</span>\n    <span class=\"n\">stats</span>
    <span class=\"o\">=</span> <span class=\"n\">st</span><span class=\"o\">.</span><span
    class=\"n\">empty</span><span class=\"p\">()</span>\n    <span class=\"k\">while</span>
    <span class=\"kc\">True</span><span class=\"p\">:</span>\n        <span class=\"n\">refresh_data</span><span
    class=\"p\">()</span>\n        <span class=\"n\">stats</span><span class=\"o\">.</span><span
    class=\"n\">plotly_chart</span><span class=\"p\">(</span>\n            <span class=\"n\">px</span><span
    class=\"o\">.</span><span class=\"n\">line</span><span class=\"p\">(</span>\n
    \               <span class=\"n\">data</span><span class=\"p\">,</span>\n                <span
    class=\"n\">x</span><span class=\"o\">=</span><span class=\"s2\">&quot;time&quot;</span><span
    class=\"p\">,</span>\n                <span class=\"n\">y</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">,</span>\n                <span
    class=\"n\">title</span><span class=\"o\">=</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span class=\"p\">,</span>\n
    \              <span class=\"p\">)</span>\n            <span class=\"p\">)</span>\n
    \       <span class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">sleep</span><span
    class=\"p\">(</span><span class=\"mf\">0.5</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><code>st</code>
    is the streamlit alias (imports shows at the bottom full example).\n<code>st.header</code>
    puts a nice header on the page.\n<code>st.empty</code> initializes an empty <code>streamlit
    container</code> in which we'll put a <code>plotly.express</code> figure.</p>\n<p>At
    each iteration we'll <code>refresh_data()</code> which <code>appends</code> and
    <code>pops</code> data in the deques in the <code>data</code> dictionary.\nThen
    we update the <code>stats</code> container with a plotly graph and the refresh
    happens seamlessly.</p>\n<p>All in all the script looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">collections</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">defaultdict</span><span class=\"p\">,</span>
    <span class=\"n\">deque</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">time</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">Dict</span><span class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span
    class=\"p\">,</span> <span class=\"n\">Optional</span>\n\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">plotly</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">express</span> <span class=\"k\">as</span>
    <span class=\"n\">px</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">psutil</span>\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">streamlit</span><span class=\"w\"> </span><span
    class=\"k\">as</span><span class=\"w\"> </span><span class=\"nn\">st</span>\n\n<span
    class=\"n\">data</span><span class=\"p\">:</span> <span class=\"n\">Dict</span><span
    class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">MutableSequence</span><span class=\"p\">[</span><span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"nb\">float</span><span class=\"p\">]]]</span>
    <span class=\"o\">=</span> <span class=\"n\">defaultdict</span><span class=\"p\">(</span><span
    class=\"n\">deque</span><span class=\"p\">)</span>\n\n<span class=\"n\">arr_size</span>
    <span class=\"o\">=</span> <span class=\"mi\">10</span>\n\n<span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
    class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span>
    <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n<span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
    class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span>
    <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
    <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
    class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
    class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
    class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
    \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
    class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
    class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
    class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
    class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
    class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
    class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n\n\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">memory_chart</span><span
    class=\"p\">():</span>\n    <span class=\"n\">fig</span> <span class=\"o\">=</span>
    <span class=\"n\">px</span><span class=\"o\">.</span><span class=\"n\">line</span><span
    class=\"p\">(</span>\n        <span class=\"n\">data</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">x</span><span class=\"o\">=</span><span class=\"s2\">&quot;time&quot;</span><span
    class=\"p\">,</span>\n        <span class=\"n\">y</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">,</span>\n        <span
    class=\"n\">title</span><span class=\"o\">=</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span class=\"p\">,</span>\n
    \   <span class=\"p\">)</span>\n    <span class=\"k\">return</span> <span class=\"n\">fig</span>\n\n\n<span
    class=\"k\">if</span> <span class=\"vm\">__name__</span> <span class=\"o\">==</span>
    <span class=\"s2\">&quot;__main__&quot;</span><span class=\"p\">:</span>\n    <span
    class=\"n\">st</span><span class=\"o\">.</span><span class=\"n\">header</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;memory chart&quot;</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">stats</span> <span class=\"o\">=</span> <span class=\"n\">st</span><span
    class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">while</span> <span class=\"kc\">True</span><span class=\"p\">:</span>\n
    \       <span class=\"n\">refresh_data</span><span class=\"p\">()</span>\n        <span
    class=\"n\">stats</span><span class=\"o\">.</span><span class=\"n\">plotly_chart</span><span
    class=\"p\">(</span><span class=\"n\">memory_chart</span><span class=\"p\">())</span>\n
    \       <span class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">sleep</span><span
    class=\"p\">(</span><span class=\"mf\">0.5</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can save this as <code>my_dash.py</code> and run with <code>streamlit run my_dash.py</code>
    and should see something like the following!</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/plotly-streamlit.gif\"
    alt=\"plotly\" title=\"Plotly in Streamlit\" />\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Plotly-And-Streamlit</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Streamlit I use `streamlit` for any EDA
    I ever have to do at work.\nIt&#x27;s super easy to spin up a small dashboard
    to filter and view dataframes in, live, wit\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Plotly-And-Streamlit | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/plotly-and-streamlit\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Plotly-And-Streamlit | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Streamlit I use `streamlit` for any EDA I ever have to do at work.\nIt&#x27;s
    super easy to spin up a small dashboard to filter and view dataframes in, live,
    wit\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/plotly-and-streamlit</span>\n
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
    Content is handled by the password protection plugin -->\n    <h2 id=\"streamlit\">Streamlit
    <a class=\"header-anchor\" href=\"#streamlit\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I use <code>streamlit</code>
    for any EDA I ever have to do at work.\nIt's super easy to spin up a small dashboard
    to filter and view dataframes in, live, without the fallbacks of Jupyter notebooks
    (kernels dying, memory bloat, a billion &quot;Untitled N.ipynb&quot; files, etc.)</p>\n<p>At
    the highest level, streamlit lets you write a python script and call <code>streamlit
    run my_script.py</code> which will open up a web server with your streamlit stuff.\nThe
    dashboard refreshes whenever you change the script so you can add capabilities
    in real time, super fast!</p>\n<p>I'll show an example of using <code>streamlit</code>
    and <code>plotly</code> to make a live dashboard to monitor system memory usage
    with <code>psutil</code>.\nThis is apart of my posts on <a href=\"/psutil\">psutil</a>
    and <a href=\"/deques\">deques</a>...</p>\n<p><strong>example at the bottom!</strong></p>\n<h2
    id=\"plotly\">Plotly <a class=\"header-anchor\" href=\"#plotly\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm not going to make
    a big time intro to plotly here - there's a billion resources on the interwebs
    and the docs are really good.</p>\n<p>Suffice it to say it's my goto plotting
    library for basically any and all needs.\nI'm currently exploring it for live
    data streaming as I'm not sure it's the best solution but it's the one I'm familiar
    with.</p>\n<p>For my <a href=\"https://github.com/nicpayne713/not-netdata\"> not-netdata
    </a> project of visualizing live system resource data I  first need a way of appending
    data and popping data in and out of an array at every data refresh cycle to keep
    my plots looking nice with a fixed time window.</p>\n<p>See <a href=\"/deques\">deques</a>
    for a short intro to the datatype I'm using.</p>\n<p>First step is to initialize
    some objects to store data in.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">data</span><span
    class=\"p\">:</span> <span class=\"n\">Dict</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span
    class=\"p\">[</span><span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">float</span><span class=\"p\">]]]</span> <span class=\"o\">=</span>
    <span class=\"n\">defaultdict</span><span class=\"p\">(</span><span class=\"n\">deque</span><span
    class=\"p\">)</span>\n\n<span class=\"n\">arr_size</span> <span class=\"o\">=</span>
    <span class=\"mi\">10</span>\n\n<span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">deque</span><span class=\"p\">([</span><span class=\"kc\">None</span><span
    class=\"p\">]</span> <span class=\"o\">*</span> <span class=\"n\">arr_size</span><span
    class=\"p\">)</span>\n<span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">deque</span><span class=\"p\">([</span><span class=\"kc\">None</span><span
    class=\"p\">]</span> <span class=\"o\">*</span> <span class=\"n\">arr_size</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><code>data</code> is a dictionary
    that I'll store deques in. The dictionary keys will be the type of data, in this
    case <code>time</code> and <code>used_memory</code>.</p>\n<p>I fix an array size,
    <code>arr_size</code> to just 10 for now</p>\n<p>Then I initialize the values
    for <code>time</code> and <code>used_memory</code> as <code>deque</code>s of length
    <code>arr_size</code>.\nSimple enough!</p>\n<p>Next is to fill those deques with
    some relevant data.\nI'm not actually sure if this is the best way to do this
    but here's what I have done so far:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
    <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
    class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
    class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
    class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
    \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
    class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
    class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
    class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
    class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
    class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
    class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<p>If
    you ignore my usage of <code>global</code> you'll see that I can just <code>append</code>
    to each deque like it was a list.</p>\n<p>But then to keep the relevant data in
    the deque, and to keep the length fixed, I simply <code>popleft</code> to remove
    the oldest datapoint!</p>\n<h2 id=\"a-trivial-dashboard\">A trivial dashboard
    <a class=\"header-anchor\" href=\"#a-trivial-dashboard\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now I'll prove just
    how easy it is to get a live data dashboard up and running with just a few lines
    of code thanks to streamlit!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">if</span>
    <span class=\"vm\">__name__</span> <span class=\"o\">==</span> <span class=\"s2\">&quot;__main__&quot;</span><span
    class=\"p\">:</span>\n    <span class=\"n\">st</span><span class=\"o\">.</span><span
    class=\"n\">header</span><span class=\"p\">(</span><span class=\"s2\">&quot;memory
    chart&quot;</span><span class=\"p\">)</span>\n    <span class=\"n\">stats</span>
    <span class=\"o\">=</span> <span class=\"n\">st</span><span class=\"o\">.</span><span
    class=\"n\">empty</span><span class=\"p\">()</span>\n    <span class=\"k\">while</span>
    <span class=\"kc\">True</span><span class=\"p\">:</span>\n        <span class=\"n\">refresh_data</span><span
    class=\"p\">()</span>\n        <span class=\"n\">stats</span><span class=\"o\">.</span><span
    class=\"n\">plotly_chart</span><span class=\"p\">(</span>\n            <span class=\"n\">px</span><span
    class=\"o\">.</span><span class=\"n\">line</span><span class=\"p\">(</span>\n
    \               <span class=\"n\">data</span><span class=\"p\">,</span>\n                <span
    class=\"n\">x</span><span class=\"o\">=</span><span class=\"s2\">&quot;time&quot;</span><span
    class=\"p\">,</span>\n                <span class=\"n\">y</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">,</span>\n                <span
    class=\"n\">title</span><span class=\"o\">=</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span class=\"p\">,</span>\n
    \              <span class=\"p\">)</span>\n            <span class=\"p\">)</span>\n
    \       <span class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">sleep</span><span
    class=\"p\">(</span><span class=\"mf\">0.5</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><code>st</code>
    is the streamlit alias (imports shows at the bottom full example).\n<code>st.header</code>
    puts a nice header on the page.\n<code>st.empty</code> initializes an empty <code>streamlit
    container</code> in which we'll put a <code>plotly.express</code> figure.</p>\n<p>At
    each iteration we'll <code>refresh_data()</code> which <code>appends</code> and
    <code>pops</code> data in the deques in the <code>data</code> dictionary.\nThen
    we update the <code>stats</code> container with a plotly graph and the refresh
    happens seamlessly.</p>\n<p>All in all the script looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">collections</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">defaultdict</span><span class=\"p\">,</span>
    <span class=\"n\">deque</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">time</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">Dict</span><span class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span
    class=\"p\">,</span> <span class=\"n\">Optional</span>\n\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">plotly</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">express</span> <span class=\"k\">as</span>
    <span class=\"n\">px</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">psutil</span>\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">streamlit</span><span class=\"w\"> </span><span
    class=\"k\">as</span><span class=\"w\"> </span><span class=\"nn\">st</span>\n\n<span
    class=\"n\">data</span><span class=\"p\">:</span> <span class=\"n\">Dict</span><span
    class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"n\">MutableSequence</span><span class=\"p\">[</span><span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"nb\">float</span><span class=\"p\">]]]</span>
    <span class=\"o\">=</span> <span class=\"n\">defaultdict</span><span class=\"p\">(</span><span
    class=\"n\">deque</span><span class=\"p\">)</span>\n\n<span class=\"n\">arr_size</span>
    <span class=\"o\">=</span> <span class=\"mi\">10</span>\n\n<span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
    class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span>
    <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n<span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
    class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span>
    <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
    <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
    class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
    class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
    class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
    \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
    class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
    class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
    class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
    class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
    class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
    class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
    class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n\n\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">memory_chart</span><span
    class=\"p\">():</span>\n    <span class=\"n\">fig</span> <span class=\"o\">=</span>
    <span class=\"n\">px</span><span class=\"o\">.</span><span class=\"n\">line</span><span
    class=\"p\">(</span>\n        <span class=\"n\">data</span><span class=\"p\">,</span>\n
    \       <span class=\"n\">x</span><span class=\"o\">=</span><span class=\"s2\">&quot;time&quot;</span><span
    class=\"p\">,</span>\n        <span class=\"n\">y</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">,</span>\n        <span
    class=\"n\">title</span><span class=\"o\">=</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span class=\"p\">,</span>\n
    \   <span class=\"p\">)</span>\n    <span class=\"k\">return</span> <span class=\"n\">fig</span>\n\n\n<span
    class=\"k\">if</span> <span class=\"vm\">__name__</span> <span class=\"o\">==</span>
    <span class=\"s2\">&quot;__main__&quot;</span><span class=\"p\">:</span>\n    <span
    class=\"n\">st</span><span class=\"o\">.</span><span class=\"n\">header</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;memory chart&quot;</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">stats</span> <span class=\"o\">=</span> <span class=\"n\">st</span><span
    class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">while</span> <span class=\"kc\">True</span><span class=\"p\">:</span>\n
    \       <span class=\"n\">refresh_data</span><span class=\"p\">()</span>\n        <span
    class=\"n\">stats</span><span class=\"o\">.</span><span class=\"n\">plotly_chart</span><span
    class=\"p\">(</span><span class=\"n\">memory_chart</span><span class=\"p\">())</span>\n
    \       <span class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">sleep</span><span
    class=\"p\">(</span><span class=\"mf\">0.5</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>You
    can save this as <code>my_dash.py</code> and run with <code>streamlit run my_dash.py</code>
    and should see something like the following!</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/plotly-streamlit.gif\"
    alt=\"plotly\" title=\"Plotly in Streamlit\" />\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['python', 'tech']\ntitle: Plotly-And-Streamlit\ndate:
    2022-03-31T00:00:00\npublished: True\n#cover: \"media/plotly-and-streamlit.png\"\n\n---\n\n##
    Streamlit\n\n\nI use `streamlit` for any EDA I ever have to do at work.\nIt's
    super easy to spin up a small dashboard to filter and view dataframes in, live,
    without the fallbacks of Jupyter notebooks (kernels dying, memory bloat, a billion
    \"Untitled N.ipynb\" files, etc.)\n\nAt the highest level, streamlit lets you
    write a python script and call `streamlit run my_script.py` which will open up
    a web server with your streamlit stuff. \nThe dashboard refreshes whenever you
    change the script so you can add capabilities in real time, super fast!\n\n\nI'll
    show an example of using `streamlit` and `plotly` to make a live dashboard to
    monitor system memory usage with `psutil`.\nThis is apart of my posts on [psutil](/psutil)
    and [deques](/deques)...\n\n__example at the bottom!__\n\n\n\n## Plotly\n\nI'm
    not going to make a big time intro to plotly here - there's a billion resources
    on the interwebs and the docs are really good.\n\nSuffice it to say it's my goto
    plotting library for basically any and all needs.\nI'm currently exploring it
    for live data streaming as I'm not sure it's the best solution but it's the one
    I'm familiar with.\n\nFor my [ not-netdata ](https://github.com/nicpayne713/not-netdata)
    project of visualizing live system resource data I  first need a way of appending
    data and popping data in and out of an array at every data refresh cycle to keep
    my plots looking nice with a fixed time window.\n\nSee [deques](/deques) for a
    short intro to the datatype I'm using.\n\nFirst step is to initialize some objects
    to store data in.\n\n```python\ndata: Dict[str, MutableSequence[Optional[float]]]
    = defaultdict(deque)\n\narr_size = 10\n\ndata[\"time\"] = deque([None] * arr_size)\ndata[\"used_memory\"]
    = deque([None] * arr_size)\n```\n\n`data` is a dictionary that I'll store deques
    in. The dictionary keys will be the type of data, in this case `time` and `used_memory`.\n\nI
    fix an array size, `arr_size` to just 10 for now\n\nThen I initialize the values
    for `time` and `used_memory` as `deque`s of length `arr_size`.\nSimple enough!\n\nNext
    is to fill those deques with some relevant data.\nI'm not actually sure if this
    is the best way to do this but here's what I have done so far:\n\n```python\ndef
    refresh_data():\n    global data\n    memory = psutil.virtual_memory()\n\n    data[\"time\"].append(time.strftime(\"%Y-%m-%d
    %H:%M:%S\", time.localtime()))\n    data[\"used_memory\"].append(memory.used //
    (1024**3))\n\n    data[\"time\"].popleft()\n    data[\"used_memory\"].popleft()\n```\n\nIf
    you ignore my usage of `global` you'll see that I can just `append` to each deque
    like it was a list.\n\nBut then to keep the relevant data in the deque, and to
    keep the length fixed, I simply `popleft` to remove the oldest datapoint!\n\n\n##
    A trivial dashboard\n\nNow I'll prove just how easy it is to get a live data dashboard
    up and running with just a few lines of code thanks to streamlit!\n\n```python\n\nif
    __name__ == \"__main__\":\n    st.header(\"memory chart\")\n    stats = st.empty()\n
    \   while True:\n        refresh_data()\n        stats.plotly_chart(\n            px.line(\n
    \               data,\n                x=\"time\",\n                y=\"used_memory\",\n
    \               title=f\"Memory usage stored in a deque!\",\n               )\n
    \           )\n        time.sleep(0.5)\n```\n\n`st` is the streamlit alias (imports
    shows at the bottom full example).\n`st.header` puts a nice header on the page.\n`st.empty`
    initializes an empty `streamlit container` in which we'll put a `plotly.express`
    figure.\n\nAt each iteration we'll `refresh_data()` which `appends` and `pops`
    data in the deques in the `data` dictionary.\nThen we update the `stats` container
    with a plotly graph and the refresh happens seamlessly.\n\nAll in all the script
    looks like this:\n\n```python\n\nfrom collections import defaultdict, deque\nimport
    time\nfrom typing import Dict, MutableSequence, Optional\n\nfrom plotly import
    express as px\nimport psutil\nimport streamlit as st\n\ndata: Dict[str, MutableSequence[Optional[float]]]
    = defaultdict(deque)\n\narr_size = 10\n\ndata[\"time\"] = deque([None] * arr_size)\ndata[\"used_memory\"]
    = deque([None] * arr_size)\n\n\ndef refresh_data():\n    global data\n    memory
    = psutil.virtual_memory()\n\n    data[\"time\"].append(time.strftime(\"%Y-%m-%d
    %H:%M:%S\", time.localtime()))\n    data[\"used_memory\"].append(memory.used //
    (1024**3))\n\n    data[\"time\"].popleft()\n    data[\"used_memory\"].popleft()\n\n\ndef
    memory_chart():\n    fig = px.line(\n        data,\n        x=\"time\",\n        y=\"used_memory\",\n
    \       title=f\"Memory usage stored in a deque!\",\n    )\n    return fig\n\n\nif
    __name__ == \"__main__\":\n    st.header(\"memory chart\")\n    stats = st.empty()\n
    \   while True:\n        refresh_data()\n        stats.plotly_chart(memory_chart())\n
    \       time.sleep(0.5)\n```\n\nYou can save this as `my_dash.py` and run with
    `streamlit run my_dash.py` and should see something like the following!\n\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/plotly-streamlit.gif\"
    alt=\"plotly\" title=\"Plotly in Streamlit\" />\n\n"
published: true
slug: plotly-and-streamlit
title: Plotly-And-Streamlit


---

## Streamlit


I use `streamlit` for any EDA I ever have to do at work.
It's super easy to spin up a small dashboard to filter and view dataframes in, live, without the fallbacks of Jupyter notebooks (kernels dying, memory bloat, a billion "Untitled N.ipynb" files, etc.)

At the highest level, streamlit lets you write a python script and call `streamlit run my_script.py` which will open up a web server with your streamlit stuff. 
The dashboard refreshes whenever you change the script so you can add capabilities in real time, super fast!


I'll show an example of using `streamlit` and `plotly` to make a live dashboard to monitor system memory usage with `psutil`.
This is apart of my posts on [psutil](/psutil) and [deques](/deques)...

__example at the bottom!__



## Plotly

I'm not going to make a big time intro to plotly here - there's a billion resources on the interwebs and the docs are really good.

Suffice it to say it's my goto plotting library for basically any and all needs.
I'm currently exploring it for live data streaming as I'm not sure it's the best solution but it's the one I'm familiar with.

For my [ not-netdata ](https://github.com/nicpayne713/not-netdata) project of visualizing live system resource data I  first need a way of appending data and popping data in and out of an array at every data refresh cycle to keep my plots looking nice with a fixed time window.

See [deques](/deques) for a short intro to the datatype I'm using.

First step is to initialize some objects to store data in.

```python
data: Dict[str, MutableSequence[Optional[float]]] = defaultdict(deque)

arr_size = 10

data["time"] = deque([None] * arr_size)
data["used_memory"] = deque([None] * arr_size)
```

`data` is a dictionary that I'll store deques in. The dictionary keys will be the type of data, in this case `time` and `used_memory`.

I fix an array size, `arr_size` to just 10 for now

Then I initialize the values for `time` and `used_memory` as `deque`s of length `arr_size`.
Simple enough!

Next is to fill those deques with some relevant data.
I'm not actually sure if this is the best way to do this but here's what I have done so far:

```python
def refresh_data():
    global data
    memory = psutil.virtual_memory()

    data["time"].append(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    data["used_memory"].append(memory.used // (1024**3))

    data["time"].popleft()
    data["used_memory"].popleft()
```

If you ignore my usage of `global` you'll see that I can just `append` to each deque like it was a list.

But then to keep the relevant data in the deque, and to keep the length fixed, I simply `popleft` to remove the oldest datapoint!


## A trivial dashboard

Now I'll prove just how easy it is to get a live data dashboard up and running with just a few lines of code thanks to streamlit!

```python

if __name__ == "__main__":
    st.header("memory chart")
    stats = st.empty()
    while True:
        refresh_data()
        stats.plotly_chart(
            px.line(
                data,
                x="time",
                y="used_memory",
                title=f"Memory usage stored in a deque!",
               )
            )
        time.sleep(0.5)
```

`st` is the streamlit alias (imports shows at the bottom full example).
`st.header` puts a nice header on the page.
`st.empty` initializes an empty `streamlit container` in which we'll put a `plotly.express` figure.

At each iteration we'll `refresh_data()` which `appends` and `pops` data in the deques in the `data` dictionary.
Then we update the `stats` container with a plotly graph and the refresh happens seamlessly.

All in all the script looks like this:

```python

from collections import defaultdict, deque
import time
from typing import Dict, MutableSequence, Optional

from plotly import express as px
import psutil
import streamlit as st

data: Dict[str, MutableSequence[Optional[float]]] = defaultdict(deque)

arr_size = 10

data["time"] = deque([None] * arr_size)
data["used_memory"] = deque([None] * arr_size)


def refresh_data():
    global data
    memory = psutil.virtual_memory()

    data["time"].append(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    data["used_memory"].append(memory.used // (1024**3))

    data["time"].popleft()
    data["used_memory"].popleft()


def memory_chart():
    fig = px.line(
        data,
        x="time",
        y="used_memory",
        title=f"Memory usage stored in a deque!",
    )
    return fig


if __name__ == "__main__":
    st.header("memory chart")
    stats = st.empty()
    while True:
        refresh_data()
        stats.plotly_chart(memory_chart())
        time.sleep(0.5)
```

You can save this as `my_dash.py` and run with `streamlit run my_dash.py` and should see something like the following!

<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/plotly-streamlit.gif" alt="plotly" title="Plotly in Streamlit" />