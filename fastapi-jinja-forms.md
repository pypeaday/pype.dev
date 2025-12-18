---
content: "I just started using FastAPI for a home project and needed to pass back
  a\ndynamic number of values from a form rendered with jinja...\n\n\n# Dynamic Values
  \n\nThe jinja templating for rendering HTML based on something like a python iterable
  is nice and easy\n\n> data is the result of a database query, and item is each row,
  so the dot notation is the value of each column basically in that row\n\n```jinja\n<form
  method=\"post\">\n  {% for item in data %}\n    <div class=\"form-check \">\n        <input
  class=\"form-check-input\"  name=\"item_{{ item.id }}\" id=\"{{ item.name }}\" value=\"{{
  item.id }}\" type=\"checkbox\">\n        <label class=\"form-check-label\" for=\"{{
  item.id }}\" > Label for: {{ item.name }} </label>\n    </div>\n  {% endfor %}\n\n<button
  type=\"submit\" class=\"submit btn btn-xl btn-outline-danger\" >Remove</button>\n</form>\n\n```\n\nThis
  form generates a row with a checkbox for every `item` in `data` (in my\ncase each
  `item` is an existing row in my table). it?\n\nThe way to pass back all those values
  is pretty straight forward (after hours of messing around that is!)\n\n```python\n#
  I hate it when tutorials don't show ALL relevant pieces to the blurb\nimport starlette.status
  as status\nfrom fastapi import APIRouter, Depends, Form, Request\nfrom fastapi.encoders
  import jsonable_encoder\nfrom fastapi.responses import HTMLResponse, RedirectResponse\nfrom
  fastapi.templating import Jinja2Templates\nfrom sqlalchemy.orm import Session\n\nfrom
  app.session.session import create_get_session\n\nrouter = APIRouter()\ntemplates
  = Jinja2Templates(directory=\"templates/\")\n\n@router.post(\"/my_route/do_something_with_form\",
  response_class=HTMLResponse)\nasync def delete_rows(\n    request: Request,\n    db:
  Session = Depends(create_get_session),\n):\n    form_data = await request.get_form()\n
  \   data = jsonable_encoder(form_data)\n    # data = {\"item_1\": 1, \"item_2\":
  2, ... \"item_N\": N}\n    return RedirectResponse(\"/\", status_code=status.HTTP_302_FOUND)\n```\n\nWe
  `await request.get_form()` and after encoding the data we get a dictionary with
  key/value pairs of the name/value from the form!\n\nThis took me quite a long time
  to figure out in part because most of the Google-able resources are still on Flask..."
date: 2022-05-15
description: 'I just started using FastAPI for a home project and needed to pass back
  a

  dynamic number of values from a form rendered with jinja... Dynamic Values The jinja
  t'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Forms with FastAPI
    and Jinja</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I just started using
    FastAPI for a home project and needed to pass back a\ndynamic number of values
    from a form rendered with jinja... Dynamic Values The jinja t\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Forms with FastAPI and Jinja | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/fastapi-jinja-forms\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Forms with FastAPI and Jinja | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I just started using FastAPI for a home project and needed to pass back
    a\ndynamic number of values from a form rendered with jinja... Dynamic Values
    The jinja t\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/fastapi-jinja-forms</span>\n
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
    mb-4 post-title-large\">Forms with FastAPI and Jinja</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-15\">\n
    \           May 15, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/python/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I just started using FastAPI for a
    home project and needed to pass back a\ndynamic number of values from a form rendered
    with jinja...</p>\n<h1 id=\"dynamic-values\">Dynamic Values <a class=\"header-anchor\"
    href=\"#dynamic-values\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>The jinja templating
    for rendering HTML based on something like a python iterable is nice and easy</p>\n<blockquote>\n<p>data
    is the result of a database query, and item is each row, so the dot notation is
    the value of each column basically in that row</p>\n</blockquote>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"x\">&lt;form
    method=&quot;post&quot;&gt;</span>\n<span class=\"x\">  </span><span class=\"cp\">{%</span>
    <span class=\"k\">for</span> <span class=\"nv\">item</span> <span class=\"k\">in</span>
    <span class=\"nv\">data</span> <span class=\"cp\">%}</span>\n<span class=\"x\">
    \   &lt;div class=&quot;form-check &quot;&gt;</span>\n<span class=\"x\">        &lt;input
    class=&quot;form-check-input&quot;  name=&quot;item_</span><span class=\"cp\">{{</span>
    <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span class=\"x\">&quot;
    id=&quot;</span><span class=\"cp\">{{</span> <span class=\"nv\">item.name</span>
    <span class=\"cp\">}}</span><span class=\"x\">&quot; value=&quot;</span><span
    class=\"cp\">{{</span> <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span
    class=\"x\">&quot; type=&quot;checkbox&quot;&gt;</span>\n<span class=\"x\">        &lt;label
    class=&quot;form-check-label&quot; for=&quot;</span><span class=\"cp\">{{</span>
    <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span class=\"x\">&quot;
    &gt; Label for: </span><span class=\"cp\">{{</span> <span class=\"nv\">item.name</span>
    <span class=\"cp\">}}</span><span class=\"x\"> &lt;/label&gt;</span>\n<span class=\"x\">
    \   &lt;/div&gt;</span>\n<span class=\"x\">  </span><span class=\"cp\">{%</span>
    <span class=\"k\">endfor</span> <span class=\"cp\">%}</span>\n\n<span class=\"x\">&lt;button
    type=&quot;submit&quot; class=&quot;submit btn btn-xl btn-outline-danger&quot;
    &gt;Remove&lt;/button&gt;</span>\n<span class=\"x\">&lt;/form&gt;</span>\n</pre></div>\n\n</pre>\n\n<p>This
    form generates a row with a checkbox for every <code>item</code> in <code>data</code>
    (in my\ncase each <code>item</code> is an existing row in my table). it?</p>\n<p>The
    way to pass back all those values is pretty straight forward (after hours of messing
    around that is!)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># I hate
    it when tutorials don&#39;t show ALL relevant pieces to the blurb</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">starlette.status</span><span
    class=\"w\"> </span><span class=\"k\">as</span><span class=\"w\"> </span><span
    class=\"nn\">status</span>\n<span class=\"kn\">from</span><span class=\"w\"> </span><span
    class=\"nn\">fastapi</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">APIRouter</span><span class=\"p\">,</span> <span class=\"n\">Depends</span><span
    class=\"p\">,</span> <span class=\"n\">Form</span><span class=\"p\">,</span> <span
    class=\"n\">Request</span>\n<span class=\"kn\">from</span><span class=\"w\"> </span><span
    class=\"nn\">fastapi.encoders</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">jsonable_encoder</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi.responses</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">HTMLResponse</span><span
    class=\"p\">,</span> <span class=\"n\">RedirectResponse</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi.templating</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">Jinja2Templates</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Session</span>\n\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">app.session.session</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
    class=\"n\">router</span> <span class=\"o\">=</span> <span class=\"n\">APIRouter</span><span
    class=\"p\">()</span>\n<span class=\"n\">templates</span> <span class=\"o\">=</span>
    <span class=\"n\">Jinja2Templates</span><span class=\"p\">(</span><span class=\"n\">directory</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;templates/&quot;</span><span class=\"p\">)</span>\n\n<span
    class=\"nd\">@router</span><span class=\"o\">.</span><span class=\"n\">post</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/my_route/do_something_with_form&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">response_class</span><span class=\"o\">=</span><span
    class=\"n\">HTMLResponse</span><span class=\"p\">)</span>\n<span class=\"k\">async</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">delete_rows</span><span
    class=\"p\">(</span>\n    <span class=\"n\">request</span><span class=\"p\">:</span>
    <span class=\"n\">Request</span><span class=\"p\">,</span>\n    <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">),</span>\n<span class=\"p\">):</span>\n    <span class=\"n\">form_data</span>
    <span class=\"o\">=</span> <span class=\"k\">await</span> <span class=\"n\">request</span><span
    class=\"o\">.</span><span class=\"n\">get_form</span><span class=\"p\">()</span>\n
    \   <span class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">jsonable_encoder</span><span
    class=\"p\">(</span><span class=\"n\">form_data</span><span class=\"p\">)</span>\n
    \   <span class=\"c1\"># data = {&quot;item_1&quot;: 1, &quot;item_2&quot;: 2,
    ... &quot;item_N&quot;: N}</span>\n    <span class=\"k\">return</span> <span class=\"n\">RedirectResponse</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"n\">status</span><span
    class=\"o\">.</span><span class=\"n\">HTTP_302_FOUND</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>We
    <code>await request.get_form()</code> and after encoding the data we get a dictionary
    with key/value pairs of the name/value from the form!</p>\n<p>This took me quite
    a long time to figure out in part because most of the Google-able resources are
    still on Flask...</p>\n\n        </section>\n    </article>\n</section>        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Forms with FastAPI
    and Jinja</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I just started using
    FastAPI for a home project and needed to pass back a\ndynamic number of values
    from a form rendered with jinja... Dynamic Values The jinja t\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Forms with FastAPI and Jinja | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/fastapi-jinja-forms\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Forms with FastAPI and Jinja | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I just started using FastAPI for a home project and needed to pass back
    a\ndynamic number of values from a form rendered with jinja... Dynamic Values
    The jinja t\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Forms with FastAPI and Jinja</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-15\">\n
    \           May 15, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/python/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
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
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Forms with FastAPI
    and Jinja</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2022-05-15\">\n            May 15, 2022\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\"
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
    just started using FastAPI for a home project and needed to pass back a\ndynamic
    number of values from a form rendered with jinja...</p>\n<h1 id=\"dynamic-values\">Dynamic
    Values <a class=\"header-anchor\" href=\"#dynamic-values\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>The jinja templating
    for rendering HTML based on something like a python iterable is nice and easy</p>\n<blockquote>\n<p>data
    is the result of a database query, and item is each row, so the dot notation is
    the value of each column basically in that row</p>\n</blockquote>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"x\">&lt;form
    method=&quot;post&quot;&gt;</span>\n<span class=\"x\">  </span><span class=\"cp\">{%</span>
    <span class=\"k\">for</span> <span class=\"nv\">item</span> <span class=\"k\">in</span>
    <span class=\"nv\">data</span> <span class=\"cp\">%}</span>\n<span class=\"x\">
    \   &lt;div class=&quot;form-check &quot;&gt;</span>\n<span class=\"x\">        &lt;input
    class=&quot;form-check-input&quot;  name=&quot;item_</span><span class=\"cp\">{{</span>
    <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span class=\"x\">&quot;
    id=&quot;</span><span class=\"cp\">{{</span> <span class=\"nv\">item.name</span>
    <span class=\"cp\">}}</span><span class=\"x\">&quot; value=&quot;</span><span
    class=\"cp\">{{</span> <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span
    class=\"x\">&quot; type=&quot;checkbox&quot;&gt;</span>\n<span class=\"x\">        &lt;label
    class=&quot;form-check-label&quot; for=&quot;</span><span class=\"cp\">{{</span>
    <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span class=\"x\">&quot;
    &gt; Label for: </span><span class=\"cp\">{{</span> <span class=\"nv\">item.name</span>
    <span class=\"cp\">}}</span><span class=\"x\"> &lt;/label&gt;</span>\n<span class=\"x\">
    \   &lt;/div&gt;</span>\n<span class=\"x\">  </span><span class=\"cp\">{%</span>
    <span class=\"k\">endfor</span> <span class=\"cp\">%}</span>\n\n<span class=\"x\">&lt;button
    type=&quot;submit&quot; class=&quot;submit btn btn-xl btn-outline-danger&quot;
    &gt;Remove&lt;/button&gt;</span>\n<span class=\"x\">&lt;/form&gt;</span>\n</pre></div>\n\n</pre>\n\n<p>This
    form generates a row with a checkbox for every <code>item</code> in <code>data</code>
    (in my\ncase each <code>item</code> is an existing row in my table). it?</p>\n<p>The
    way to pass back all those values is pretty straight forward (after hours of messing
    around that is!)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># I hate
    it when tutorials don&#39;t show ALL relevant pieces to the blurb</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">starlette.status</span><span
    class=\"w\"> </span><span class=\"k\">as</span><span class=\"w\"> </span><span
    class=\"nn\">status</span>\n<span class=\"kn\">from</span><span class=\"w\"> </span><span
    class=\"nn\">fastapi</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">APIRouter</span><span class=\"p\">,</span> <span class=\"n\">Depends</span><span
    class=\"p\">,</span> <span class=\"n\">Form</span><span class=\"p\">,</span> <span
    class=\"n\">Request</span>\n<span class=\"kn\">from</span><span class=\"w\"> </span><span
    class=\"nn\">fastapi.encoders</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">jsonable_encoder</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi.responses</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">HTMLResponse</span><span
    class=\"p\">,</span> <span class=\"n\">RedirectResponse</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi.templating</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">Jinja2Templates</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Session</span>\n\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">app.session.session</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
    class=\"n\">router</span> <span class=\"o\">=</span> <span class=\"n\">APIRouter</span><span
    class=\"p\">()</span>\n<span class=\"n\">templates</span> <span class=\"o\">=</span>
    <span class=\"n\">Jinja2Templates</span><span class=\"p\">(</span><span class=\"n\">directory</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;templates/&quot;</span><span class=\"p\">)</span>\n\n<span
    class=\"nd\">@router</span><span class=\"o\">.</span><span class=\"n\">post</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/my_route/do_something_with_form&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">response_class</span><span class=\"o\">=</span><span
    class=\"n\">HTMLResponse</span><span class=\"p\">)</span>\n<span class=\"k\">async</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">delete_rows</span><span
    class=\"p\">(</span>\n    <span class=\"n\">request</span><span class=\"p\">:</span>
    <span class=\"n\">Request</span><span class=\"p\">,</span>\n    <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">),</span>\n<span class=\"p\">):</span>\n    <span class=\"n\">form_data</span>
    <span class=\"o\">=</span> <span class=\"k\">await</span> <span class=\"n\">request</span><span
    class=\"o\">.</span><span class=\"n\">get_form</span><span class=\"p\">()</span>\n
    \   <span class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">jsonable_encoder</span><span
    class=\"p\">(</span><span class=\"n\">form_data</span><span class=\"p\">)</span>\n
    \   <span class=\"c1\"># data = {&quot;item_1&quot;: 1, &quot;item_2&quot;: 2,
    ... &quot;item_N&quot;: N}</span>\n    <span class=\"k\">return</span> <span class=\"n\">RedirectResponse</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"n\">status</span><span
    class=\"o\">.</span><span class=\"n\">HTTP_302_FOUND</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>We
    <code>await request.get_form()</code> and after encoding the data we get a dictionary
    with key/value pairs of the name/value from the form!</p>\n<p>This took me quite
    a long time to figure out in part because most of the Google-able resources are
    still on Flask...</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Forms with
    FastAPI and Jinja</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I just started using FastAPI for a home project and needed to pass back
    a\ndynamic number of values from a form rendered with jinja... Dynamic Values
    The jinja t\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Forms with FastAPI and Jinja | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/fastapi-jinja-forms\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Forms with FastAPI and Jinja | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I just started using FastAPI for a home project and needed to pass back
    a\ndynamic number of values from a form rendered with jinja... Dynamic Values
    The jinja t\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/fastapi-jinja-forms</span>\n
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
    Content is handled by the password protection plugin -->\n    <p>I just started
    using FastAPI for a home project and needed to pass back a\ndynamic number of
    values from a form rendered with jinja...</p>\n<h1 id=\"dynamic-values\">Dynamic
    Values <a class=\"header-anchor\" href=\"#dynamic-values\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>The jinja templating
    for rendering HTML based on something like a python iterable is nice and easy</p>\n<blockquote>\n<p>data
    is the result of a database query, and item is each row, so the dot notation is
    the value of each column basically in that row</p>\n</blockquote>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"x\">&lt;form
    method=&quot;post&quot;&gt;</span>\n<span class=\"x\">  </span><span class=\"cp\">{%</span>
    <span class=\"k\">for</span> <span class=\"nv\">item</span> <span class=\"k\">in</span>
    <span class=\"nv\">data</span> <span class=\"cp\">%}</span>\n<span class=\"x\">
    \   &lt;div class=&quot;form-check &quot;&gt;</span>\n<span class=\"x\">        &lt;input
    class=&quot;form-check-input&quot;  name=&quot;item_</span><span class=\"cp\">{{</span>
    <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span class=\"x\">&quot;
    id=&quot;</span><span class=\"cp\">{{</span> <span class=\"nv\">item.name</span>
    <span class=\"cp\">}}</span><span class=\"x\">&quot; value=&quot;</span><span
    class=\"cp\">{{</span> <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span
    class=\"x\">&quot; type=&quot;checkbox&quot;&gt;</span>\n<span class=\"x\">        &lt;label
    class=&quot;form-check-label&quot; for=&quot;</span><span class=\"cp\">{{</span>
    <span class=\"nv\">item.id</span> <span class=\"cp\">}}</span><span class=\"x\">&quot;
    &gt; Label for: </span><span class=\"cp\">{{</span> <span class=\"nv\">item.name</span>
    <span class=\"cp\">}}</span><span class=\"x\"> &lt;/label&gt;</span>\n<span class=\"x\">
    \   &lt;/div&gt;</span>\n<span class=\"x\">  </span><span class=\"cp\">{%</span>
    <span class=\"k\">endfor</span> <span class=\"cp\">%}</span>\n\n<span class=\"x\">&lt;button
    type=&quot;submit&quot; class=&quot;submit btn btn-xl btn-outline-danger&quot;
    &gt;Remove&lt;/button&gt;</span>\n<span class=\"x\">&lt;/form&gt;</span>\n</pre></div>\n\n</pre>\n\n<p>This
    form generates a row with a checkbox for every <code>item</code> in <code>data</code>
    (in my\ncase each <code>item</code> is an existing row in my table). it?</p>\n<p>The
    way to pass back all those values is pretty straight forward (after hours of messing
    around that is!)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># I hate
    it when tutorials don&#39;t show ALL relevant pieces to the blurb</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">starlette.status</span><span
    class=\"w\"> </span><span class=\"k\">as</span><span class=\"w\"> </span><span
    class=\"nn\">status</span>\n<span class=\"kn\">from</span><span class=\"w\"> </span><span
    class=\"nn\">fastapi</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">APIRouter</span><span class=\"p\">,</span> <span class=\"n\">Depends</span><span
    class=\"p\">,</span> <span class=\"n\">Form</span><span class=\"p\">,</span> <span
    class=\"n\">Request</span>\n<span class=\"kn\">from</span><span class=\"w\"> </span><span
    class=\"nn\">fastapi.encoders</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">jsonable_encoder</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi.responses</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">HTMLResponse</span><span
    class=\"p\">,</span> <span class=\"n\">RedirectResponse</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi.templating</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">Jinja2Templates</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Session</span>\n\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">app.session.session</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
    class=\"n\">router</span> <span class=\"o\">=</span> <span class=\"n\">APIRouter</span><span
    class=\"p\">()</span>\n<span class=\"n\">templates</span> <span class=\"o\">=</span>
    <span class=\"n\">Jinja2Templates</span><span class=\"p\">(</span><span class=\"n\">directory</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;templates/&quot;</span><span class=\"p\">)</span>\n\n<span
    class=\"nd\">@router</span><span class=\"o\">.</span><span class=\"n\">post</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/my_route/do_something_with_form&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">response_class</span><span class=\"o\">=</span><span
    class=\"n\">HTMLResponse</span><span class=\"p\">)</span>\n<span class=\"k\">async</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">delete_rows</span><span
    class=\"p\">(</span>\n    <span class=\"n\">request</span><span class=\"p\">:</span>
    <span class=\"n\">Request</span><span class=\"p\">,</span>\n    <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">),</span>\n<span class=\"p\">):</span>\n    <span class=\"n\">form_data</span>
    <span class=\"o\">=</span> <span class=\"k\">await</span> <span class=\"n\">request</span><span
    class=\"o\">.</span><span class=\"n\">get_form</span><span class=\"p\">()</span>\n
    \   <span class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">jsonable_encoder</span><span
    class=\"p\">(</span><span class=\"n\">form_data</span><span class=\"p\">)</span>\n
    \   <span class=\"c1\"># data = {&quot;item_1&quot;: 1, &quot;item_2&quot;: 2,
    ... &quot;item_N&quot;: N}</span>\n    <span class=\"k\">return</span> <span class=\"n\">RedirectResponse</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"n\">status</span><span
    class=\"o\">.</span><span class=\"n\">HTTP_302_FOUND</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>We
    <code>await request.get_form()</code> and after encoding the data we get a dictionary
    with key/value pairs of the name/value from the form!</p>\n<p>This took me quite
    a long time to figure out in part because most of the Google-able resources are
    still on Flask...</p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ntemplateKey: til\ntags: ['python', 'tech', 'til']\ntitle: Forms with
    FastAPI and Jinja\ndate: 2022-05-15T00:00:00\npublished: False\n#cover: \"media/forms-with-fast-api-and-jinja.png\"\n\n---\n\nI
    just started using FastAPI for a home project and needed to pass back a\ndynamic
    number of values from a form rendered with jinja...\n\n\n# Dynamic Values \n\nThe
    jinja templating for rendering HTML based on something like a python iterable
    is nice and easy\n\n> data is the result of a database query, and item is each
    row, so the dot notation is the value of each column basically in that row\n\n```jinja\n<form
    method=\"post\">\n  {% for item in data %}\n    <div class=\"form-check \">\n
    \       <input class=\"form-check-input\"  name=\"item_{{ item.id }}\" id=\"{{
    item.name }}\" value=\"{{ item.id }}\" type=\"checkbox\">\n        <label class=\"form-check-label\"
    for=\"{{ item.id }}\" > Label for: {{ item.name }} </label>\n    </div>\n  {%
    endfor %}\n\n<button type=\"submit\" class=\"submit btn btn-xl btn-outline-danger\"
    >Remove</button>\n</form>\n\n```\n\nThis form generates a row with a checkbox
    for every `item` in `data` (in my\ncase each `item` is an existing row in my table).
    it?\n\nThe way to pass back all those values is pretty straight forward (after
    hours of messing around that is!)\n\n```python\n# I hate it when tutorials don't
    show ALL relevant pieces to the blurb\nimport starlette.status as status\nfrom
    fastapi import APIRouter, Depends, Form, Request\nfrom fastapi.encoders import
    jsonable_encoder\nfrom fastapi.responses import HTMLResponse, RedirectResponse\nfrom
    fastapi.templating import Jinja2Templates\nfrom sqlalchemy.orm import Session\n\nfrom
    app.session.session import create_get_session\n\nrouter = APIRouter()\ntemplates
    = Jinja2Templates(directory=\"templates/\")\n\n@router.post(\"/my_route/do_something_with_form\",
    response_class=HTMLResponse)\nasync def delete_rows(\n    request: Request,\n
    \   db: Session = Depends(create_get_session),\n):\n    form_data = await request.get_form()\n
    \   data = jsonable_encoder(form_data)\n    # data = {\"item_1\": 1, \"item_2\":
    2, ... \"item_N\": N}\n    return RedirectResponse(\"/\", status_code=status.HTTP_302_FOUND)\n```\n\nWe
    `await request.get_form()` and after encoding the data we get a dictionary with
    key/value pairs of the name/value from the form!\n\nThis took me quite a long
    time to figure out in part because most of the Google-able resources are still
    on Flask...\n"
published: false
slug: fastapi-jinja-forms
title: Forms with FastAPI and Jinja


---

I just started using FastAPI for a home project and needed to pass back a
dynamic number of values from a form rendered with jinja...


# Dynamic Values 

The jinja templating for rendering HTML based on something like a python iterable is nice and easy

> data is the result of a database query, and item is each row, so the dot notation is the value of each column basically in that row

```jinja
<form method="post">
  {% for item in data %}
    <div class="form-check ">
        <input class="form-check-input"  name="item_{{ item.id }}" id="{{ item.name }}" value="{{ item.id }}" type="checkbox">
        <label class="form-check-label" for="{{ item.id }}" > Label for: {{ item.name }} </label>
    </div>
  {% endfor %}

<button type="submit" class="submit btn btn-xl btn-outline-danger" >Remove</button>
</form>

```

This form generates a row with a checkbox for every `item` in `data` (in my
case each `item` is an existing row in my table). it?

The way to pass back all those values is pretty straight forward (after hours of messing around that is!)

```python
# I hate it when tutorials don't show ALL relevant pieces to the blurb
import starlette.status as status
from fastapi import APIRouter, Depends, Form, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.session.session import create_get_session

router = APIRouter()
templates = Jinja2Templates(directory="templates/")

@router.post("/my_route/do_something_with_form", response_class=HTMLResponse)
async def delete_rows(
    request: Request,
    db: Session = Depends(create_get_session),
):
    form_data = await request.get_form()
    data = jsonable_encoder(form_data)
    # data = {"item_1": 1, "item_2": 2, ... "item_N": N}
    return RedirectResponse("/", status_code=status.HTTP_302_FOUND)
```

We `await request.get_form()` and after encoding the data we get a dictionary with key/value pairs of the name/value from the form!

This took me quite a long time to figure out in part because most of the Google-able resources are still on Flask...