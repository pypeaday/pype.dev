---
content: "## TODO\n\n```python\n\nimport os\n\nimport boto3\nimport pytest\nfrom moto
  import mock_s3\n\nMY_BUCKET = \"bucket\"\n# BAD PREFIX\nMY_PREFIX = \"bucket/project/data/layer/dataset/\"\n\n\n@pytest.fixture(scope=\"function\")\ndef
  aws_credentials():\n    \"\"\"Mocked AWS Credentials for moto.\"\"\"\n    os.environ[\"AWS_ACCESS_KEY_ID\"]
  = \"testing\"\n    os.environ[\"AWS_SECRET_ACCESS_KEY\"] = \"testing\"\n    os.environ[\"AWS_SECURITY_TOKEN\"]
  = \"testing\"\n    os.environ[\"AWS_SESSION_TOKEN\"] = \"testing\"\n    os.environ[\"AWS_DEFAULT_REGION\"]
  = \"us-east-1\"\n\n\n@pytest.fixture(scope=\"function\")\ndef s3(aws_credentials):\n
  \   with mock_s3():\n        yield boto3.client(\"s3\", region_name=\"us-east-1\")\n\n\ndef
  _upload_fixtures(s3) -> None:\n    s3.put_object(Bucket=MY_BUCKET, Key=\"project/data/layer/dataset\",
  Body=b\"some data\")\n\n\ndef test_get_list_of_dataset_versions(s3):\n    # We need
  to create the bucket since this is all in Moto's 'virtual' AWS account\n    s3.create_bucket(Bucket=MY_BUCKET)\n
  \   _upload_fixtures(s3)\n\n    objs = s3.list_objects_v2(Bucket=MY_BUCKET)  # ,
  Prefix=MY_PREFIX)\n    assert objs.get(\"Contents\") is not None\n\n    # test_datasets
  = [\n    #     c[\"Key\"]\n    #     for c in s3.list_objects_v2(Bucket=MY_BUCKET,
  Prefix=MY_PREFIX)[\"Contents\"]\n    #     if c[\"Key\"] != MY_PREFIX\n    # ]\n\n```"
date: 2022-05-12
description: TODO
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n<title>Mocking-S3-With-Moto</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"TODO\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n\n<link rel=\"stylesheet\" href=\"/post.css\"
    />\n<link rel=\"stylesheet\" href=\"/app.css\" />\n<script src=\"/theme.js\"></script>\n\n\n
    \       <meta property=\"og:author_email\" content=\"nic@pype.dev\" />\n\n    <head>\n
    \       <script src=\"https://unpkg.com/@tailwindcss/browser@4\"></script>\n<title>Mocking-S3-With-Moto</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"TODO\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n\n<link rel=\"stylesheet\" href=\"/post.css\"
    />\n<link rel=\"stylesheet\" href=\"/app.css\" />\n<script src=\"/theme.js\"></script>\n\n\n
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
    \       </style>\n    </head>\n    <body>\n<div class='container flex flex-row
    min-h-screen'>\n    <div>\n    </div>\n    <div class='flex-grow px-8 mx-auto
    min-h-screen'>\n<header class='flex justify-center items-center p-8'>\n\n    <nav
    class='flex justify-center items-center my-8'>\n        <a\n            href='/'>Home</a>\n
    \       <a\n            href='https://github.com/pypeaday/pype.dev'>GitHub</a>\n
    \       <a\n            href='https://mydigitalharbor.com/pypeaday'>DigitalHarbor</a>\n
    \   </nav>\n\n    <div>\n        <label id=\"theme-switch\" class=\"theme-switch\"
    for=\"checkbox-theme\" title=\"light/dark mode toggle\">\n            <input type=\"checkbox\"
    id=\"checkbox-theme\" />\n            <div class=\"slider round\"></div>\n        </label>\n
    \   </div>\n</header><div id='didyoumean'>\n    <div class=\"mb-0\">\n        <!--
    <label for=\"search\" class=\"block text-sm font-medium mb-2\">Search for a page</label>
    -->\n        <input type=\"text\" id=\"search\"\n               class=\"w-full
    p-2 border rounded-md bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-pink-500\"\n
    \              placeholder=\"'/' Search for a page\">\n    </div>\n\n    <!--
    <div id=\"didyoumean_results\" class=\"grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\">
    -->\n    <ul id=\"didyoumean_results\" class='grid gap-4'>\n        <!-- Results
    will be populated here -->\n    </ul>\n</div>\n<script type='module'>\n// All
    available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
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
    class='w-full'>\n<section class=\"title\">\n    <h1 id=\"title\">\n        Mocking-S3-With-Moto\n
    \   </h1>\n</section>    <section class=\"body\">\n        <h2 id=\"todo\">TODO
    <a class=\"header-anchor\" href=\"#todo\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">os</span>\n\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">boto3</span>\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">pytest</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">moto</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">mock_s3</span>\n\n<span class=\"n\">MY_BUCKET</span>
    <span class=\"o\">=</span> <span class=\"s2\">&quot;bucket&quot;</span>\n<span
    class=\"c1\"># BAD PREFIX</span>\n<span class=\"n\">MY_PREFIX</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;bucket/project/data/layer/dataset/&quot;</span>\n\n\n<span
    class=\"nd\">@pytest</span><span class=\"o\">.</span><span class=\"n\">fixture</span><span
    class=\"p\">(</span><span class=\"n\">scope</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;function&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">aws_credentials</span><span class=\"p\">():</span>\n<span
    class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Mocked AWS Credentials
    for moto.&quot;&quot;&quot;</span>\n    <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">environ</span><span class=\"p\">[</span><span class=\"s2\">&quot;AWS_ACCESS_KEY_ID&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
    \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;AWS_SECRET_ACCESS_KEY&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
    \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;AWS_SECURITY_TOKEN&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
    \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;AWS_SESSION_TOKEN&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
    \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;AWS_DEFAULT_REGION&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;us-east-1&quot;</span>\n\n\n<span
    class=\"nd\">@pytest</span><span class=\"o\">.</span><span class=\"n\">fixture</span><span
    class=\"p\">(</span><span class=\"n\">scope</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;function&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">s3</span><span class=\"p\">(</span><span
    class=\"n\">aws_credentials</span><span class=\"p\">):</span>\n    <span class=\"k\">with</span>
    <span class=\"n\">mock_s3</span><span class=\"p\">():</span>\n        <span class=\"k\">yield</span>
    <span class=\"n\">boto3</span><span class=\"o\">.</span><span class=\"n\">client</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;s3&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">region_name</span><span class=\"o\">=</span><span class=\"s2\">&quot;us-east-1&quot;</span><span
    class=\"p\">)</span>\n\n\n<span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">_upload_fixtures</span><span class=\"p\">(</span><span class=\"n\">s3</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n    <span class=\"n\">s3</span><span class=\"o\">.</span><span
    class=\"n\">put_object</span><span class=\"p\">(</span><span class=\"n\">Bucket</span><span
    class=\"o\">=</span><span class=\"n\">MY_BUCKET</span><span class=\"p\">,</span>
    <span class=\"n\">Key</span><span class=\"o\">=</span><span class=\"s2\">&quot;project/data/layer/dataset&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">Body</span><span class=\"o\">=</span><span
    class=\"sa\">b</span><span class=\"s2\">&quot;some data&quot;</span><span class=\"p\">)</span>\n\n\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">test_get_list_of_dataset_versions</span><span
    class=\"p\">(</span><span class=\"n\">s3</span><span class=\"p\">):</span>\n    <span
    class=\"c1\"># We need to create the bucket since this is all in Moto&#39;s &#39;virtual&#39;
    AWS account</span>\n    <span class=\"n\">s3</span><span class=\"o\">.</span><span
    class=\"n\">create_bucket</span><span class=\"p\">(</span><span class=\"n\">Bucket</span><span
    class=\"o\">=</span><span class=\"n\">MY_BUCKET</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">_upload_fixtures</span><span class=\"p\">(</span><span class=\"n\">s3</span><span
    class=\"p\">)</span>\n\n    <span class=\"n\">objs</span> <span class=\"o\">=</span>
    <span class=\"n\">s3</span><span class=\"o\">.</span><span class=\"n\">list_objects_v2</span><span
    class=\"p\">(</span><span class=\"n\">Bucket</span><span class=\"o\">=</span><span
    class=\"n\">MY_BUCKET</span><span class=\"p\">)</span>  <span class=\"c1\"># ,
    Prefix=MY_PREFIX)</span>\n    <span class=\"k\">assert</span> <span class=\"n\">objs</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Contents&quot;</span><span class=\"p\">)</span> <span class=\"ow\">is</span>
    <span class=\"ow\">not</span> <span class=\"kc\">None</span>\n\n    <span class=\"c1\">#
    test_datasets = [</span>\n    <span class=\"c1\">#     c[&quot;Key&quot;]</span>\n
    \   <span class=\"c1\">#     for c in s3.list_objects_v2(Bucket=MY_BUCKET, Prefix=MY_PREFIX)[&quot;Contents&quot;]</span>\n
    \   <span class=\"c1\">#     if c[&quot;Key&quot;] != MY_PREFIX</span>\n    <span
    class=\"c1\"># ]</span>\n</pre></div>\n\n</pre>\n\n\n    </section>\n</article>
    \   </div>\n    <div></div>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n<title>Mocking-S3-With-Moto</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"TODO\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n\n<link rel=\"stylesheet\" href=\"/post.css\"
    />\n<link rel=\"stylesheet\" href=\"/app.css\" />\n<script src=\"/theme.js\"></script>\n\n\n
    \       <meta property=\"og:author_email\" content=\"nic@pype.dev\" />\n\n    <head>\n
    \       <script src=\"https://unpkg.com/@tailwindcss/browser@4\"></script>\n<title>Mocking-S3-With-Moto</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"TODO\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n\n<link rel=\"stylesheet\" href=\"/post.css\"
    />\n<link rel=\"stylesheet\" href=\"/app.css\" />\n<script src=\"/theme.js\"></script>\n\n\n
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
    \       </style>\n    </head>\n    <body>\n<article style=\"text-align: center;\">\n
    \   <style>\n        section {\n            font-size: 200%;\n        }\n\n\n
    \       .edit {\n            display: none;\n        }\n    </style>\n<section
    class=\"title\">\n    <h1 id=\"title\">\n        Mocking-S3-With-Moto\n    </h1>\n</section></article>\n
    \    </body>\n</html>"
  partial: "<article class='w-full'>\n<section class=\"title\">\n    <h1 id=\"title\">\n
    \       Mocking-S3-With-Moto\n    </h1>\n</section>    <section class=\"body\">\n
    \       <h2 id=\"todo\">TODO <a class=\"header-anchor\" href=\"#todo\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">os</span>\n\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">boto3</span>\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">pytest</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">moto</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">mock_s3</span>\n\n<span class=\"n\">MY_BUCKET</span>
    <span class=\"o\">=</span> <span class=\"s2\">&quot;bucket&quot;</span>\n<span
    class=\"c1\"># BAD PREFIX</span>\n<span class=\"n\">MY_PREFIX</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;bucket/project/data/layer/dataset/&quot;</span>\n\n\n<span
    class=\"nd\">@pytest</span><span class=\"o\">.</span><span class=\"n\">fixture</span><span
    class=\"p\">(</span><span class=\"n\">scope</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;function&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">aws_credentials</span><span class=\"p\">():</span>\n<span
    class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Mocked AWS Credentials
    for moto.&quot;&quot;&quot;</span>\n    <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">environ</span><span class=\"p\">[</span><span class=\"s2\">&quot;AWS_ACCESS_KEY_ID&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
    \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;AWS_SECRET_ACCESS_KEY&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
    \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;AWS_SECURITY_TOKEN&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
    \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;AWS_SESSION_TOKEN&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;testing&quot;</span>\n
    \   <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;AWS_DEFAULT_REGION&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;us-east-1&quot;</span>\n\n\n<span
    class=\"nd\">@pytest</span><span class=\"o\">.</span><span class=\"n\">fixture</span><span
    class=\"p\">(</span><span class=\"n\">scope</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;function&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">s3</span><span class=\"p\">(</span><span
    class=\"n\">aws_credentials</span><span class=\"p\">):</span>\n    <span class=\"k\">with</span>
    <span class=\"n\">mock_s3</span><span class=\"p\">():</span>\n        <span class=\"k\">yield</span>
    <span class=\"n\">boto3</span><span class=\"o\">.</span><span class=\"n\">client</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;s3&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">region_name</span><span class=\"o\">=</span><span class=\"s2\">&quot;us-east-1&quot;</span><span
    class=\"p\">)</span>\n\n\n<span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">_upload_fixtures</span><span class=\"p\">(</span><span class=\"n\">s3</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"kc\">None</span><span
    class=\"p\">:</span>\n    <span class=\"n\">s3</span><span class=\"o\">.</span><span
    class=\"n\">put_object</span><span class=\"p\">(</span><span class=\"n\">Bucket</span><span
    class=\"o\">=</span><span class=\"n\">MY_BUCKET</span><span class=\"p\">,</span>
    <span class=\"n\">Key</span><span class=\"o\">=</span><span class=\"s2\">&quot;project/data/layer/dataset&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">Body</span><span class=\"o\">=</span><span
    class=\"sa\">b</span><span class=\"s2\">&quot;some data&quot;</span><span class=\"p\">)</span>\n\n\n<span
    class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">test_get_list_of_dataset_versions</span><span
    class=\"p\">(</span><span class=\"n\">s3</span><span class=\"p\">):</span>\n    <span
    class=\"c1\"># We need to create the bucket since this is all in Moto&#39;s &#39;virtual&#39;
    AWS account</span>\n    <span class=\"n\">s3</span><span class=\"o\">.</span><span
    class=\"n\">create_bucket</span><span class=\"p\">(</span><span class=\"n\">Bucket</span><span
    class=\"o\">=</span><span class=\"n\">MY_BUCKET</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">_upload_fixtures</span><span class=\"p\">(</span><span class=\"n\">s3</span><span
    class=\"p\">)</span>\n\n    <span class=\"n\">objs</span> <span class=\"o\">=</span>
    <span class=\"n\">s3</span><span class=\"o\">.</span><span class=\"n\">list_objects_v2</span><span
    class=\"p\">(</span><span class=\"n\">Bucket</span><span class=\"o\">=</span><span
    class=\"n\">MY_BUCKET</span><span class=\"p\">)</span>  <span class=\"c1\"># ,
    Prefix=MY_PREFIX)</span>\n    <span class=\"k\">assert</span> <span class=\"n\">objs</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Contents&quot;</span><span class=\"p\">)</span> <span class=\"ow\">is</span>
    <span class=\"ow\">not</span> <span class=\"kc\">None</span>\n\n    <span class=\"c1\">#
    test_datasets = [</span>\n    <span class=\"c1\">#     c[&quot;Key&quot;]</span>\n
    \   <span class=\"c1\">#     for c in s3.list_objects_v2(Bucket=MY_BUCKET, Prefix=MY_PREFIX)[&quot;Contents&quot;]</span>\n
    \   <span class=\"c1\">#     if c[&quot;Key&quot;] != MY_PREFIX</span>\n    <span
    class=\"c1\"># ]</span>\n</pre></div>\n\n</pre>\n\n\n    </section>\n</article>"
  raw.md: "---\ntemplateKey: til\ntitle: Mocking-S3-With-Moto\ndate: 2022-05-12T00:00:00\npublished:
    False\ncover: \"media/mocking-s3-with-moto.png\"\ntags:\n  - python\n\n---\n\n##
    TODO\n\n```python\n\nimport os\n\nimport boto3\nimport pytest\nfrom moto import
    mock_s3\n\nMY_BUCKET = \"bucket\"\n# BAD PREFIX\nMY_PREFIX = \"bucket/project/data/layer/dataset/\"\n\n\n@pytest.fixture(scope=\"function\")\ndef
    aws_credentials():\n    \"\"\"Mocked AWS Credentials for moto.\"\"\"\n    os.environ[\"AWS_ACCESS_KEY_ID\"]
    = \"testing\"\n    os.environ[\"AWS_SECRET_ACCESS_KEY\"] = \"testing\"\n    os.environ[\"AWS_SECURITY_TOKEN\"]
    = \"testing\"\n    os.environ[\"AWS_SESSION_TOKEN\"] = \"testing\"\n    os.environ[\"AWS_DEFAULT_REGION\"]
    = \"us-east-1\"\n\n\n@pytest.fixture(scope=\"function\")\ndef s3(aws_credentials):\n
    \   with mock_s3():\n        yield boto3.client(\"s3\", region_name=\"us-east-1\")\n\n\ndef
    _upload_fixtures(s3) -> None:\n    s3.put_object(Bucket=MY_BUCKET, Key=\"project/data/layer/dataset\",
    Body=b\"some data\")\n\n\ndef test_get_list_of_dataset_versions(s3):\n    # We
    need to create the bucket since this is all in Moto's 'virtual' AWS account\n
    \   s3.create_bucket(Bucket=MY_BUCKET)\n    _upload_fixtures(s3)\n\n    objs =
    s3.list_objects_v2(Bucket=MY_BUCKET)  # , Prefix=MY_PREFIX)\n    assert objs.get(\"Contents\")
    is not None\n\n    # test_datasets = [\n    #     c[\"Key\"]\n    #     for c
    in s3.list_objects_v2(Bucket=MY_BUCKET, Prefix=MY_PREFIX)[\"Contents\"]\n    #
    \    if c[\"Key\"] != MY_PREFIX\n    # ]\n\n```\n"
published: false
slug: mocking-s3-with-moto
title: Mocking-S3-With-Moto


---

## TODO

```python

import os

import boto3
import pytest
from moto import mock_s3

MY_BUCKET = "bucket"
# BAD PREFIX
MY_PREFIX = "bucket/project/data/layer/dataset/"


@pytest.fixture(scope="function")
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    os.environ["AWS_ACCESS_KEY_ID"] = "testing"
    os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
    os.environ["AWS_SECURITY_TOKEN"] = "testing"
    os.environ["AWS_SESSION_TOKEN"] = "testing"
    os.environ["AWS_DEFAULT_REGION"] = "us-east-1"


@pytest.fixture(scope="function")
def s3(aws_credentials):
    with mock_s3():
        yield boto3.client("s3", region_name="us-east-1")


def _upload_fixtures(s3) -> None:
    s3.put_object(Bucket=MY_BUCKET, Key="project/data/layer/dataset", Body=b"some data")


def test_get_list_of_dataset_versions(s3):
    # We need to create the bucket since this is all in Moto's 'virtual' AWS account
    s3.create_bucket(Bucket=MY_BUCKET)
    _upload_fixtures(s3)

    objs = s3.list_objects_v2(Bucket=MY_BUCKET)  # , Prefix=MY_PREFIX)
    assert objs.get("Contents") is not None

    # test_datasets = [
    #     c["Key"]
    #     for c in s3.list_objects_v2(Bucket=MY_BUCKET, Prefix=MY_PREFIX)["Contents"]
    #     if c["Key"] != MY_PREFIX
    # ]

```