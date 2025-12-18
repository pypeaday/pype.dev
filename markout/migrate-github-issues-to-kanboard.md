---
content: "I am working on shifting everything, or as much as I reasonably can, related
  to\ndev for myself to on-prem, including git and CI/CD. So for Quadtask I had a\nbunch
  of Github issues that I wanted to migrate to my kanboard instance, gpt-5\ndid a
  bang-up job on this script\n\nIt gets each issue, creates a tag for each label,
  creates the kanboard ticket, then closes the github issue\n\n```bash\n\n#!/bin/bash\n\n#
  GitHub to Kanboard Issue Migration Script\n# Uses GitHub CLI (gh) and curl to migrate
  issues\n\n# Exit on error\nset -e\n\n# Check required environment variables\nfor
  var in KANBOARD_URL KANBOARD_TOKEN GH_TOKEN QUADTASK_KANBOARD_PROJECT_ID; do\n    if
  [ -z \"${!var}\" ]; then\n        echo \"Error: $var is not set\"\n        exit
  1\n    fi\ndone\n\n# GitHub repository (default: pypeaday/quadtask)\nGITHUB_REPO=${GITHUB_REPO:-\"pypeaday/quadtask\"}\n\n#
  Kanboard API endpoint\nKANBOARD_API=\"$KANBOARD_URL/jsonrpc.php\"\n\n# Get all open
  issues from GitHub\necho \"Fetching open issues from $GITHUB_REPO...\"\nISSUES_JSON=$(gh
  issue list --repo \"$GITHUB_REPO\" --state open --limit 1000 --json number,title,body,labels)\n\n#
  Count issues\nISSUE_COUNT=$(echo \"$ISSUES_JSON\" | jq '. | length')\necho \"Found
  $ISSUE_COUNT open issues\"\n\n# Process each issue\necho \"$ISSUES_JSON\" | jq -c
  '.[]' | while read -r issue; do\n    # Extract issue details\n    NUMBER=$(echo
  \"$issue\" | jq -r '.number')\n    TITLE=$(echo \"$issue\" | jq -r '.title')\n    BODY=$(echo
  \"$issue\" | jq -r '.body // \"\"')\n    # Extract label names as a JSON array\n
  \   LABELS_JSON=$(echo \"$issue\" | jq -c '[.labels[]?.name] // []')\n    \n    #
  Prepare Kanboard task data\n    REQUEST_DATA=$(jq -n \\\n        --arg method \"createTask\"
  \\\n        --argjson id 1 \\\n        --arg jsonrpc \"2.0\" \\\n        --arg title
  \"$TITLE\" \\\n        --arg description \"$BODY\" \\\n        --arg project_id
  \"$QUADTASK_KANBOARD_PROJECT_ID\" \\\n        '{\n            \"jsonrpc\": $jsonrpc,\n
  \           \"method\": $method,\n            \"id\": $id,\n            \"params\":
  {\n                \"title\": $title,\n                \"description\": $description,\n
  \               \"project_id\": $project_id\n            }\n        }')\n    \n
  \   # Create task in Kanboard\n    echo \"Creating task: $TITLE\"\n    RESPONSE=$(curl
  -s -X POST \\\n        -H \"Content-Type: application/json\" \\\n        -u \"jsonrpc:$KANBOARD_TOKEN\"
  \\\n        -d \"$REQUEST_DATA\" \\\n        \"$KANBOARD_API\")\n    \n    # Check
  for errors\n    if echo \"$RESPONSE\" | jq -e '.error' > /dev/null; then\n        echo
  \"Error creating task: $(echo \"$RESPONSE\" | jq -r '.error.message')\"\n    else\n
  \       TASK_ID=$(echo \"$RESPONSE\" | jq -r '.result')\n        echo \"Created
  task ID: $TASK_ID\"\n\n        # If there are labels, set them as Kanboard tags
  on the task\n        if [ \"$(echo \"$LABELS_JSON\" | jq 'length')\" -gt 0 ]; then\n
  \           echo \"Setting tags on task $TASK_ID: $(echo \"$LABELS_JSON\" | jq -r
  'join(\", \")')\"\n            TAGS_REQUEST=$(jq -n \\\n                --arg jsonrpc
  \"2.0\" \\\n                --arg method \"setTaskTags\" \\\n                --argjson
  id 2 \\\n                --arg project_id \"$QUADTASK_KANBOARD_PROJECT_ID\" \\\n
  \               --arg task_id \"$TASK_ID\" \\\n                --argjson tags \"$LABELS_JSON\"
  \\\n                '{\n                    jsonrpc: $jsonrpc,\n                    method:
  $method,\n                    id: $id,\n                    params: {\n                        project_id:
  $project_id,\n                        task_id: $task_id,\n                        tags:
  $tags\n                    }\n                }')\n\n            TAGS_RESPONSE=$(curl
  -s -X POST \\\n                -H \"Content-Type: application/json\" \\\n                -u
  \"jsonrpc:$KANBOARD_TOKEN\" \\\n                -d \"$TAGS_REQUEST\" \\\n                \"$KANBOARD_API\")\n\n
  \           if echo \"$TAGS_RESPONSE\" | jq -e '.error' > /dev/null; then\n                echo
  \"Warning: Failed to set tags: $(echo \"$TAGS_RESPONSE\" | jq -r '.error.message')\"\n
  \           else\n                echo \"Tags set successfully\"\n            fi\n
  \       fi\n\n        # Close the corresponding GitHub issue to avoid duplicates\n
  \       TASK_URL=\"${KANBOARD_URL}/?controller=TaskViewController&action=show&task_id=${TASK_ID}\"\n
  \       echo \"Closing GitHub issue #$NUMBER with comment linking to Kanboard task...\"\n
  \       if gh issue close \"$NUMBER\" --repo \"$GITHUB_REPO\" --comment \"Migrated
  to Kanboard task $TASK_ID: $TASK_URL\" >/dev/null; then\n            echo \"Closed
  GitHub issue #$NUMBER\"\n        else\n            echo \"Warning: Failed to close
  GitHub issue #$NUMBER\"\n        fi\n    fi\n    \n    echo \"----------------------------------------\"\ndone\n\necho
  \"Migration completed\"\n```"
date: 2025-08-07
description: 'I am working on shifting everything, or as much as I reasonably can,
  related to

  dev for myself to on-prem, including git and CI/CD. So for Quadtask I had a

  bunc'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Migrate Github Issues
    to Kanboard</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I am working on shifting
    everything, or as much as I reasonably can, related to\ndev for myself to on-prem,
    including git and CI/CD. So for Quadtask I had a\nbunc\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Migrate Github Issues to Kanboard | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/migrate-github-issues-to-kanboard\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Migrate Github Issues to Kanboard | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I am working on shifting everything, or as much as I reasonably can,
    related to\ndev for myself to on-prem, including git and CI/CD. So for Quadtask
    I had a\nbunc\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/migrate-github-issues-to-kanboard</span>\n
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
    mb-4 post-title-large\">Migrate Github Issues to Kanboard</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-07\">\n
    \           August 07, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/kanboard/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #kanboard\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I am working on shifting everything,
    or as much as I reasonably can, related to\ndev for myself to on-prem, including
    git and CI/CD. So for Quadtask I had a\nbunch of Github issues that I wanted to
    migrate to my kanboard instance, gpt-5\ndid a bang-up job on this script</p>\n<p>It
    gets each issue, creates a tag for each label, creates the kanboard ticket, then
    closes the github issue</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n\n<span
    class=\"c1\"># GitHub to Kanboard Issue Migration Script</span>\n<span class=\"c1\">#
    Uses GitHub CLI (gh) and curl to migrate issues</span>\n\n<span class=\"c1\">#
    Exit on error</span>\n<span class=\"nb\">set</span><span class=\"w\"> </span>-e\n\n<span
    class=\"c1\"># Check required environment variables</span>\n<span class=\"k\">for</span><span
    class=\"w\"> </span>var<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>KANBOARD_URL<span class=\"w\"> </span>KANBOARD_TOKEN<span
    class=\"w\"> </span>GH_TOKEN<span class=\"w\"> </span>QUADTASK_KANBOARD_PROJECT_ID<span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">do</span>\n<span
    class=\"w\">    </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span>-z<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"p\">!var</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">then</span>\n<span class=\"w\">        </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Error: </span><span class=\"nv\">$var</span><span
    class=\"s2\"> is not set&quot;</span>\n<span class=\"w\">        </span><span
    class=\"nb\">exit</span><span class=\"w\"> </span><span class=\"m\">1</span>\n<span
    class=\"w\">    </span><span class=\"k\">fi</span>\n<span class=\"k\">done</span>\n\n<span
    class=\"c1\"># GitHub repository (default: pypeaday/quadtask)</span>\n<span class=\"nv\">GITHUB_REPO</span><span
    class=\"o\">=</span><span class=\"si\">${</span><span class=\"nv\">GITHUB_REPO</span><span
    class=\"k\">:-</span><span class=\"s2\">&quot;pypeaday/quadtask&quot;</span><span
    class=\"si\">}</span>\n\n<span class=\"c1\"># Kanboard API endpoint</span>\n<span
    class=\"nv\">KANBOARD_API</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$KANBOARD_URL</span><span class=\"s2\">/jsonrpc.php&quot;</span>\n\n<span
    class=\"c1\"># Get all open issues from GitHub</span>\n<span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Fetching open issues from </span><span
    class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">...&quot;</span>\n<span class=\"nv\">ISSUES_JSON</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>gh<span class=\"w\"> </span>issue<span
    class=\"w\"> </span>list<span class=\"w\"> </span>--repo<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>--state<span class=\"w\"> </span>open<span class=\"w\"> </span>--limit<span
    class=\"w\"> </span><span class=\"m\">1000</span><span class=\"w\"> </span>--json<span
    class=\"w\"> </span>number,title,body,labels<span class=\"k\">)</span>\n\n<span
    class=\"c1\"># Count issues</span>\n<span class=\"nv\">ISSUE_COUNT</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$ISSUES_JSON</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span><span class=\"s1\">&#39;. | length&#39;</span><span
    class=\"k\">)</span>\n<span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Found </span><span class=\"nv\">$ISSUE_COUNT</span><span class=\"s2\">
    open issues&quot;</span>\n\n<span class=\"c1\"># Process each issue</span>\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$ISSUES_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-c<span class=\"w\"> </span><span class=\"s1\">&#39;.[]&#39;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span><span
    class=\"k\">while</span><span class=\"w\"> </span><span class=\"nb\">read</span><span
    class=\"w\"> </span>-r<span class=\"w\"> </span>issue<span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">do</span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Extract issue details</span>\n<span class=\"w\">    </span><span
    class=\"nv\">NUMBER</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.number&#39;</span><span class=\"k\">)</span>\n<span
    class=\"w\">    </span><span class=\"nv\">TITLE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.title&#39;</span><span
    class=\"k\">)</span>\n<span class=\"w\">    </span><span class=\"nv\">BODY</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span class=\"w\"> </span><span
    class=\"s1\">&#39;.body // &quot;&quot;&#39;</span><span class=\"k\">)</span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Extract label names as a JSON array</span>\n<span
    class=\"w\">    </span><span class=\"nv\">LABELS_JSON</span><span class=\"o\">=</span><span
    class=\"k\">$(</span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-c<span class=\"w\"> </span><span class=\"s1\">&#39;[.labels[]?.name]
    // []&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Prepare Kanboard task data</span>\n<span
    class=\"w\">    </span><span class=\"nv\">REQUEST_DATA</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>jq<span class=\"w\"> </span>-n<span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>method<span class=\"w\"> </span><span class=\"s2\">&quot;createTask&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--argjson<span
    class=\"w\"> </span>id<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span
    class=\"w\"> </span>jsonrpc<span class=\"w\"> </span><span class=\"s2\">&quot;2.0&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span
    class=\"w\"> </span>title<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>description<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$BODY</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>project_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$QUADTASK_KANBOARD_PROJECT_ID</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span><span
    class=\"s1\">&#39;{</span>\n<span class=\"s1\">            &quot;jsonrpc&quot;:
    $jsonrpc,</span>\n<span class=\"s1\">            &quot;method&quot;: $method,</span>\n<span
    class=\"s1\">            &quot;id&quot;: $id,</span>\n<span class=\"s1\">            &quot;params&quot;:
    {</span>\n<span class=\"s1\">                &quot;title&quot;: $title,</span>\n<span
    class=\"s1\">                &quot;description&quot;: $description,</span>\n<span
    class=\"s1\">                &quot;project_id&quot;: $project_id</span>\n<span
    class=\"s1\">            }</span>\n<span class=\"s1\">        }&#39;</span><span
    class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Create task in Kanboard</span>\n<span class=\"w\">    </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Creating
    task: </span><span class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">    </span><span class=\"nv\">RESPONSE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>curl<span class=\"w\"> </span>-s<span class=\"w\"> </span>-X<span
    class=\"w\"> </span>POST<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span>-H<span class=\"w\"> </span><span class=\"s2\">&quot;Content-Type:
    application/json&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span>-u<span class=\"w\"> </span><span class=\"s2\">&quot;jsonrpc:</span><span
    class=\"nv\">$KANBOARD_TOKEN</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$REQUEST_DATA</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span><span class=\"s2\">&quot;</span><span class=\"nv\">$KANBOARD_API</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Check for errors</span>\n<span class=\"w\">
    \   </span><span class=\"k\">if</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-e<span class=\"w\"> </span><span
    class=\"s1\">&#39;.error&#39;</span><span class=\"w\"> </span>&gt;<span class=\"w\">
    </span>/dev/null<span class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">        </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Error creating task: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$RESPONSE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.error.message&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">    </span><span
    class=\"k\">else</span>\n<span class=\"w\">        </span><span class=\"nv\">TASK_ID</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span class=\"w\"> </span><span
    class=\"s1\">&#39;.result&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">
    \       </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Created
    task ID: </span><span class=\"nv\">$TASK_ID</span><span class=\"s2\">&quot;</span>\n\n<span
    class=\"w\">        </span><span class=\"c1\"># If there are labels, set them
    as Kanboard tags on the task</span>\n<span class=\"w\">        </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LABELS_JSON</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span><span class=\"s1\">&#39;length&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span>-gt<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">then</span>\n<span class=\"w\">            </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Setting tags on task </span><span
    class=\"nv\">$TASK_ID</span><span class=\"s2\">: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LABELS_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;join(&quot;, &quot;)&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">            </span><span
    class=\"nv\">TAGS_REQUEST</span><span class=\"o\">=</span><span class=\"k\">$(</span>jq<span
    class=\"w\"> </span>-n<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>--arg<span class=\"w\"> </span>jsonrpc<span
    class=\"w\"> </span><span class=\"s2\">&quot;2.0&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>method<span class=\"w\"> </span><span class=\"s2\">&quot;setTaskTags&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--argjson<span
    class=\"w\"> </span>id<span class=\"w\"> </span><span class=\"m\">2</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>project_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$QUADTASK_KANBOARD_PROJECT_ID</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>task_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TASK_ID</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--argjson<span
    class=\"w\"> </span>tags<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LABELS_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span><span
    class=\"s1\">&#39;{</span>\n<span class=\"s1\">                    jsonrpc: $jsonrpc,</span>\n<span
    class=\"s1\">                    method: $method,</span>\n<span class=\"s1\">
    \                   id: $id,</span>\n<span class=\"s1\">                    params:
    {</span>\n<span class=\"s1\">                        project_id: $project_id,</span>\n<span
    class=\"s1\">                        task_id: $task_id,</span>\n<span class=\"s1\">
    \                       tags: $tags</span>\n<span class=\"s1\">                    }</span>\n<span
    class=\"s1\">                }&#39;</span><span class=\"k\">)</span>\n\n<span
    class=\"w\">            </span><span class=\"nv\">TAGS_RESPONSE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>curl<span class=\"w\"> </span>-s<span class=\"w\"> </span>-X<span
    class=\"w\"> </span>POST<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>-H<span class=\"w\"> </span><span class=\"s2\">&quot;Content-Type:
    application/json&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>-u<span class=\"w\"> </span><span class=\"s2\">&quot;jsonrpc:</span><span
    class=\"nv\">$KANBOARD_TOKEN</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$TAGS_REQUEST</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span><span class=\"s2\">&quot;</span><span class=\"nv\">$KANBOARD_API</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span>\n\n<span class=\"w\">            </span><span
    class=\"k\">if</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$TAGS_RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-e<span class=\"w\"> </span><span
    class=\"s1\">&#39;.error&#39;</span><span class=\"w\"> </span>&gt;<span class=\"w\">
    </span>/dev/null<span class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">                </span><span class=\"nb\">echo</span><span class=\"w\">
    </span><span class=\"s2\">&quot;Warning: Failed to set tags: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TAGS_RESPONSE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.error.message&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">            </span><span
    class=\"k\">else</span>\n<span class=\"w\">                </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Tags set successfully&quot;</span>\n<span
    class=\"w\">            </span><span class=\"k\">fi</span>\n<span class=\"w\">
    \       </span><span class=\"k\">fi</span>\n\n<span class=\"w\">        </span><span
    class=\"c1\"># Close the corresponding GitHub issue to avoid duplicates</span>\n<span
    class=\"w\">        </span><span class=\"nv\">TASK_URL</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"nv\">KANBOARD_URL</span><span
    class=\"si\">}</span><span class=\"s2\">/?controller=TaskViewController&amp;action=show&amp;task_id=</span><span
    class=\"si\">${</span><span class=\"nv\">TASK_ID</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"w\">        </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Closing GitHub issue #</span><span
    class=\"nv\">$NUMBER</span><span class=\"s2\"> with comment linking to Kanboard
    task...&quot;</span>\n<span class=\"w\">        </span><span class=\"k\">if</span><span
    class=\"w\"> </span>gh<span class=\"w\"> </span>issue<span class=\"w\"> </span>close<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NUMBER</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>--repo<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>--comment<span class=\"w\"> </span><span class=\"s2\">&quot;Migrated
    to Kanboard task </span><span class=\"nv\">$TASK_ID</span><span class=\"s2\">:
    </span><span class=\"nv\">$TASK_URL</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>&gt;/dev/null<span class=\"p\">;</span><span class=\"w\">
    </span><span class=\"k\">then</span>\n<span class=\"w\">            </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Closed
    GitHub issue #</span><span class=\"nv\">$NUMBER</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">        </span><span class=\"k\">else</span>\n<span class=\"w\">            </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Warning:
    Failed to close GitHub issue #</span><span class=\"nv\">$NUMBER</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">        </span><span class=\"k\">fi</span>\n<span class=\"w\">    </span><span
    class=\"k\">fi</span>\n<span class=\"w\">    </span>\n<span class=\"w\">    </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;----------------------------------------&quot;</span>\n<span
    class=\"k\">done</span>\n\n<span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Migration completed&quot;</span>\n</pre></div>\n\n</pre>\n\n\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Migrate Github Issues
    to Kanboard</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I am working on shifting
    everything, or as much as I reasonably can, related to\ndev for myself to on-prem,
    including git and CI/CD. So for Quadtask I had a\nbunc\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Migrate Github Issues to Kanboard | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/migrate-github-issues-to-kanboard\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Migrate Github Issues to Kanboard | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I am working on shifting everything, or as much as I reasonably can,
    related to\ndev for myself to on-prem, including git and CI/CD. So for Quadtask
    I had a\nbunc\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Migrate Github Issues to Kanboard</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-07\">\n
    \           August 07, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/kanboard/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #kanboard\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal  post-terminal--til \">\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Migrate Github
    Issues to Kanboard</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2025-08-07\">\n            August 07, 2025\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/kanboard/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #kanboard\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I am working on shifting everything,
    or as much as I reasonably can, related to\ndev for myself to on-prem, including
    git and CI/CD. So for Quadtask I had a\nbunch of Github issues that I wanted to
    migrate to my kanboard instance, gpt-5\ndid a bang-up job on this script</p>\n<p>It
    gets each issue, creates a tag for each label, creates the kanboard ticket, then
    closes the github issue</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n\n<span
    class=\"c1\"># GitHub to Kanboard Issue Migration Script</span>\n<span class=\"c1\">#
    Uses GitHub CLI (gh) and curl to migrate issues</span>\n\n<span class=\"c1\">#
    Exit on error</span>\n<span class=\"nb\">set</span><span class=\"w\"> </span>-e\n\n<span
    class=\"c1\"># Check required environment variables</span>\n<span class=\"k\">for</span><span
    class=\"w\"> </span>var<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>KANBOARD_URL<span class=\"w\"> </span>KANBOARD_TOKEN<span
    class=\"w\"> </span>GH_TOKEN<span class=\"w\"> </span>QUADTASK_KANBOARD_PROJECT_ID<span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">do</span>\n<span
    class=\"w\">    </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span>-z<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"p\">!var</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">then</span>\n<span class=\"w\">        </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Error: </span><span class=\"nv\">$var</span><span
    class=\"s2\"> is not set&quot;</span>\n<span class=\"w\">        </span><span
    class=\"nb\">exit</span><span class=\"w\"> </span><span class=\"m\">1</span>\n<span
    class=\"w\">    </span><span class=\"k\">fi</span>\n<span class=\"k\">done</span>\n\n<span
    class=\"c1\"># GitHub repository (default: pypeaday/quadtask)</span>\n<span class=\"nv\">GITHUB_REPO</span><span
    class=\"o\">=</span><span class=\"si\">${</span><span class=\"nv\">GITHUB_REPO</span><span
    class=\"k\">:-</span><span class=\"s2\">&quot;pypeaday/quadtask&quot;</span><span
    class=\"si\">}</span>\n\n<span class=\"c1\"># Kanboard API endpoint</span>\n<span
    class=\"nv\">KANBOARD_API</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$KANBOARD_URL</span><span class=\"s2\">/jsonrpc.php&quot;</span>\n\n<span
    class=\"c1\"># Get all open issues from GitHub</span>\n<span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Fetching open issues from </span><span
    class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">...&quot;</span>\n<span class=\"nv\">ISSUES_JSON</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>gh<span class=\"w\"> </span>issue<span
    class=\"w\"> </span>list<span class=\"w\"> </span>--repo<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>--state<span class=\"w\"> </span>open<span class=\"w\"> </span>--limit<span
    class=\"w\"> </span><span class=\"m\">1000</span><span class=\"w\"> </span>--json<span
    class=\"w\"> </span>number,title,body,labels<span class=\"k\">)</span>\n\n<span
    class=\"c1\"># Count issues</span>\n<span class=\"nv\">ISSUE_COUNT</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$ISSUES_JSON</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span><span class=\"s1\">&#39;. | length&#39;</span><span
    class=\"k\">)</span>\n<span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Found </span><span class=\"nv\">$ISSUE_COUNT</span><span class=\"s2\">
    open issues&quot;</span>\n\n<span class=\"c1\"># Process each issue</span>\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$ISSUES_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-c<span class=\"w\"> </span><span class=\"s1\">&#39;.[]&#39;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span><span
    class=\"k\">while</span><span class=\"w\"> </span><span class=\"nb\">read</span><span
    class=\"w\"> </span>-r<span class=\"w\"> </span>issue<span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">do</span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Extract issue details</span>\n<span class=\"w\">    </span><span
    class=\"nv\">NUMBER</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.number&#39;</span><span class=\"k\">)</span>\n<span
    class=\"w\">    </span><span class=\"nv\">TITLE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.title&#39;</span><span
    class=\"k\">)</span>\n<span class=\"w\">    </span><span class=\"nv\">BODY</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span class=\"w\"> </span><span
    class=\"s1\">&#39;.body // &quot;&quot;&#39;</span><span class=\"k\">)</span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Extract label names as a JSON array</span>\n<span
    class=\"w\">    </span><span class=\"nv\">LABELS_JSON</span><span class=\"o\">=</span><span
    class=\"k\">$(</span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-c<span class=\"w\"> </span><span class=\"s1\">&#39;[.labels[]?.name]
    // []&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Prepare Kanboard task data</span>\n<span
    class=\"w\">    </span><span class=\"nv\">REQUEST_DATA</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>jq<span class=\"w\"> </span>-n<span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>method<span class=\"w\"> </span><span class=\"s2\">&quot;createTask&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--argjson<span
    class=\"w\"> </span>id<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span
    class=\"w\"> </span>jsonrpc<span class=\"w\"> </span><span class=\"s2\">&quot;2.0&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span
    class=\"w\"> </span>title<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>description<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$BODY</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>project_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$QUADTASK_KANBOARD_PROJECT_ID</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span><span
    class=\"s1\">&#39;{</span>\n<span class=\"s1\">            &quot;jsonrpc&quot;:
    $jsonrpc,</span>\n<span class=\"s1\">            &quot;method&quot;: $method,</span>\n<span
    class=\"s1\">            &quot;id&quot;: $id,</span>\n<span class=\"s1\">            &quot;params&quot;:
    {</span>\n<span class=\"s1\">                &quot;title&quot;: $title,</span>\n<span
    class=\"s1\">                &quot;description&quot;: $description,</span>\n<span
    class=\"s1\">                &quot;project_id&quot;: $project_id</span>\n<span
    class=\"s1\">            }</span>\n<span class=\"s1\">        }&#39;</span><span
    class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Create task in Kanboard</span>\n<span class=\"w\">    </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Creating
    task: </span><span class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">    </span><span class=\"nv\">RESPONSE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>curl<span class=\"w\"> </span>-s<span class=\"w\"> </span>-X<span
    class=\"w\"> </span>POST<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span>-H<span class=\"w\"> </span><span class=\"s2\">&quot;Content-Type:
    application/json&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span>-u<span class=\"w\"> </span><span class=\"s2\">&quot;jsonrpc:</span><span
    class=\"nv\">$KANBOARD_TOKEN</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$REQUEST_DATA</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span><span class=\"s2\">&quot;</span><span class=\"nv\">$KANBOARD_API</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Check for errors</span>\n<span class=\"w\">
    \   </span><span class=\"k\">if</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-e<span class=\"w\"> </span><span
    class=\"s1\">&#39;.error&#39;</span><span class=\"w\"> </span>&gt;<span class=\"w\">
    </span>/dev/null<span class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">        </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Error creating task: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$RESPONSE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.error.message&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">    </span><span
    class=\"k\">else</span>\n<span class=\"w\">        </span><span class=\"nv\">TASK_ID</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span class=\"w\"> </span><span
    class=\"s1\">&#39;.result&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">
    \       </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Created
    task ID: </span><span class=\"nv\">$TASK_ID</span><span class=\"s2\">&quot;</span>\n\n<span
    class=\"w\">        </span><span class=\"c1\"># If there are labels, set them
    as Kanboard tags on the task</span>\n<span class=\"w\">        </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LABELS_JSON</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span><span class=\"s1\">&#39;length&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span>-gt<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">then</span>\n<span class=\"w\">            </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Setting tags on task </span><span
    class=\"nv\">$TASK_ID</span><span class=\"s2\">: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LABELS_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;join(&quot;, &quot;)&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">            </span><span
    class=\"nv\">TAGS_REQUEST</span><span class=\"o\">=</span><span class=\"k\">$(</span>jq<span
    class=\"w\"> </span>-n<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>--arg<span class=\"w\"> </span>jsonrpc<span
    class=\"w\"> </span><span class=\"s2\">&quot;2.0&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>method<span class=\"w\"> </span><span class=\"s2\">&quot;setTaskTags&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--argjson<span
    class=\"w\"> </span>id<span class=\"w\"> </span><span class=\"m\">2</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>project_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$QUADTASK_KANBOARD_PROJECT_ID</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>task_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TASK_ID</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--argjson<span
    class=\"w\"> </span>tags<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LABELS_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span><span
    class=\"s1\">&#39;{</span>\n<span class=\"s1\">                    jsonrpc: $jsonrpc,</span>\n<span
    class=\"s1\">                    method: $method,</span>\n<span class=\"s1\">
    \                   id: $id,</span>\n<span class=\"s1\">                    params:
    {</span>\n<span class=\"s1\">                        project_id: $project_id,</span>\n<span
    class=\"s1\">                        task_id: $task_id,</span>\n<span class=\"s1\">
    \                       tags: $tags</span>\n<span class=\"s1\">                    }</span>\n<span
    class=\"s1\">                }&#39;</span><span class=\"k\">)</span>\n\n<span
    class=\"w\">            </span><span class=\"nv\">TAGS_RESPONSE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>curl<span class=\"w\"> </span>-s<span class=\"w\"> </span>-X<span
    class=\"w\"> </span>POST<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>-H<span class=\"w\"> </span><span class=\"s2\">&quot;Content-Type:
    application/json&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>-u<span class=\"w\"> </span><span class=\"s2\">&quot;jsonrpc:</span><span
    class=\"nv\">$KANBOARD_TOKEN</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$TAGS_REQUEST</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span><span class=\"s2\">&quot;</span><span class=\"nv\">$KANBOARD_API</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span>\n\n<span class=\"w\">            </span><span
    class=\"k\">if</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$TAGS_RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-e<span class=\"w\"> </span><span
    class=\"s1\">&#39;.error&#39;</span><span class=\"w\"> </span>&gt;<span class=\"w\">
    </span>/dev/null<span class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">                </span><span class=\"nb\">echo</span><span class=\"w\">
    </span><span class=\"s2\">&quot;Warning: Failed to set tags: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TAGS_RESPONSE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.error.message&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">            </span><span
    class=\"k\">else</span>\n<span class=\"w\">                </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Tags set successfully&quot;</span>\n<span
    class=\"w\">            </span><span class=\"k\">fi</span>\n<span class=\"w\">
    \       </span><span class=\"k\">fi</span>\n\n<span class=\"w\">        </span><span
    class=\"c1\"># Close the corresponding GitHub issue to avoid duplicates</span>\n<span
    class=\"w\">        </span><span class=\"nv\">TASK_URL</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"nv\">KANBOARD_URL</span><span
    class=\"si\">}</span><span class=\"s2\">/?controller=TaskViewController&amp;action=show&amp;task_id=</span><span
    class=\"si\">${</span><span class=\"nv\">TASK_ID</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"w\">        </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Closing GitHub issue #</span><span
    class=\"nv\">$NUMBER</span><span class=\"s2\"> with comment linking to Kanboard
    task...&quot;</span>\n<span class=\"w\">        </span><span class=\"k\">if</span><span
    class=\"w\"> </span>gh<span class=\"w\"> </span>issue<span class=\"w\"> </span>close<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NUMBER</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>--repo<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>--comment<span class=\"w\"> </span><span class=\"s2\">&quot;Migrated
    to Kanboard task </span><span class=\"nv\">$TASK_ID</span><span class=\"s2\">:
    </span><span class=\"nv\">$TASK_URL</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>&gt;/dev/null<span class=\"p\">;</span><span class=\"w\">
    </span><span class=\"k\">then</span>\n<span class=\"w\">            </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Closed
    GitHub issue #</span><span class=\"nv\">$NUMBER</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">        </span><span class=\"k\">else</span>\n<span class=\"w\">            </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Warning:
    Failed to close GitHub issue #</span><span class=\"nv\">$NUMBER</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">        </span><span class=\"k\">fi</span>\n<span class=\"w\">    </span><span
    class=\"k\">fi</span>\n<span class=\"w\">    </span>\n<span class=\"w\">    </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;----------------------------------------&quot;</span>\n<span
    class=\"k\">done</span>\n\n<span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Migration completed&quot;</span>\n</pre></div>\n\n</pre>\n\n\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Migrate
    Github Issues to Kanboard</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I am working on shifting everything, or as much as I reasonably can,
    related to\ndev for myself to on-prem, including git and CI/CD. So for Quadtask
    I had a\nbunc\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Migrate Github Issues to Kanboard | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/migrate-github-issues-to-kanboard\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Migrate Github Issues to Kanboard | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I am working on shifting everything, or as much as I reasonably can,
    related to\ndev for myself to on-prem, including git and CI/CD. So for Quadtask
    I had a\nbunc\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/migrate-github-issues-to-kanboard</span>\n
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
    Content is handled by the password protection plugin -->\n    <p>I am working
    on shifting everything, or as much as I reasonably can, related to\ndev for myself
    to on-prem, including git and CI/CD. So for Quadtask I had a\nbunch of Github
    issues that I wanted to migrate to my kanboard instance, gpt-5\ndid a bang-up
    job on this script</p>\n<p>It gets each issue, creates a tag for each label, creates
    the kanboard ticket, then closes the github issue</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n\n<span
    class=\"c1\"># GitHub to Kanboard Issue Migration Script</span>\n<span class=\"c1\">#
    Uses GitHub CLI (gh) and curl to migrate issues</span>\n\n<span class=\"c1\">#
    Exit on error</span>\n<span class=\"nb\">set</span><span class=\"w\"> </span>-e\n\n<span
    class=\"c1\"># Check required environment variables</span>\n<span class=\"k\">for</span><span
    class=\"w\"> </span>var<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>KANBOARD_URL<span class=\"w\"> </span>KANBOARD_TOKEN<span
    class=\"w\"> </span>GH_TOKEN<span class=\"w\"> </span>QUADTASK_KANBOARD_PROJECT_ID<span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">do</span>\n<span
    class=\"w\">    </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span>-z<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"p\">!var</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">then</span>\n<span class=\"w\">        </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Error: </span><span class=\"nv\">$var</span><span
    class=\"s2\"> is not set&quot;</span>\n<span class=\"w\">        </span><span
    class=\"nb\">exit</span><span class=\"w\"> </span><span class=\"m\">1</span>\n<span
    class=\"w\">    </span><span class=\"k\">fi</span>\n<span class=\"k\">done</span>\n\n<span
    class=\"c1\"># GitHub repository (default: pypeaday/quadtask)</span>\n<span class=\"nv\">GITHUB_REPO</span><span
    class=\"o\">=</span><span class=\"si\">${</span><span class=\"nv\">GITHUB_REPO</span><span
    class=\"k\">:-</span><span class=\"s2\">&quot;pypeaday/quadtask&quot;</span><span
    class=\"si\">}</span>\n\n<span class=\"c1\"># Kanboard API endpoint</span>\n<span
    class=\"nv\">KANBOARD_API</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$KANBOARD_URL</span><span class=\"s2\">/jsonrpc.php&quot;</span>\n\n<span
    class=\"c1\"># Get all open issues from GitHub</span>\n<span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Fetching open issues from </span><span
    class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">...&quot;</span>\n<span class=\"nv\">ISSUES_JSON</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>gh<span class=\"w\"> </span>issue<span
    class=\"w\"> </span>list<span class=\"w\"> </span>--repo<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>--state<span class=\"w\"> </span>open<span class=\"w\"> </span>--limit<span
    class=\"w\"> </span><span class=\"m\">1000</span><span class=\"w\"> </span>--json<span
    class=\"w\"> </span>number,title,body,labels<span class=\"k\">)</span>\n\n<span
    class=\"c1\"># Count issues</span>\n<span class=\"nv\">ISSUE_COUNT</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$ISSUES_JSON</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span><span class=\"s1\">&#39;. | length&#39;</span><span
    class=\"k\">)</span>\n<span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Found </span><span class=\"nv\">$ISSUE_COUNT</span><span class=\"s2\">
    open issues&quot;</span>\n\n<span class=\"c1\"># Process each issue</span>\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$ISSUES_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-c<span class=\"w\"> </span><span class=\"s1\">&#39;.[]&#39;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span><span
    class=\"k\">while</span><span class=\"w\"> </span><span class=\"nb\">read</span><span
    class=\"w\"> </span>-r<span class=\"w\"> </span>issue<span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">do</span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Extract issue details</span>\n<span class=\"w\">    </span><span
    class=\"nv\">NUMBER</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.number&#39;</span><span class=\"k\">)</span>\n<span
    class=\"w\">    </span><span class=\"nv\">TITLE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.title&#39;</span><span
    class=\"k\">)</span>\n<span class=\"w\">    </span><span class=\"nv\">BODY</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span class=\"w\"> </span><span
    class=\"s1\">&#39;.body // &quot;&quot;&#39;</span><span class=\"k\">)</span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Extract label names as a JSON array</span>\n<span
    class=\"w\">    </span><span class=\"nv\">LABELS_JSON</span><span class=\"o\">=</span><span
    class=\"k\">$(</span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$issue</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-c<span class=\"w\"> </span><span class=\"s1\">&#39;[.labels[]?.name]
    // []&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Prepare Kanboard task data</span>\n<span
    class=\"w\">    </span><span class=\"nv\">REQUEST_DATA</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>jq<span class=\"w\"> </span>-n<span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>method<span class=\"w\"> </span><span class=\"s2\">&quot;createTask&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--argjson<span
    class=\"w\"> </span>id<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span
    class=\"w\"> </span>jsonrpc<span class=\"w\"> </span><span class=\"s2\">&quot;2.0&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span
    class=\"w\"> </span>title<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>description<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$BODY</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">        </span>--arg<span class=\"w\">
    </span>project_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$QUADTASK_KANBOARD_PROJECT_ID</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span><span
    class=\"s1\">&#39;{</span>\n<span class=\"s1\">            &quot;jsonrpc&quot;:
    $jsonrpc,</span>\n<span class=\"s1\">            &quot;method&quot;: $method,</span>\n<span
    class=\"s1\">            &quot;id&quot;: $id,</span>\n<span class=\"s1\">            &quot;params&quot;:
    {</span>\n<span class=\"s1\">                &quot;title&quot;: $title,</span>\n<span
    class=\"s1\">                &quot;description&quot;: $description,</span>\n<span
    class=\"s1\">                &quot;project_id&quot;: $project_id</span>\n<span
    class=\"s1\">            }</span>\n<span class=\"s1\">        }&#39;</span><span
    class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Create task in Kanboard</span>\n<span class=\"w\">    </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Creating
    task: </span><span class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">    </span><span class=\"nv\">RESPONSE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>curl<span class=\"w\"> </span>-s<span class=\"w\"> </span>-X<span
    class=\"w\"> </span>POST<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span>-H<span class=\"w\"> </span><span class=\"s2\">&quot;Content-Type:
    application/json&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span>-u<span class=\"w\"> </span><span class=\"s2\">&quot;jsonrpc:</span><span
    class=\"nv\">$KANBOARD_TOKEN</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">        </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$REQUEST_DATA</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">        </span><span class=\"s2\">&quot;</span><span class=\"nv\">$KANBOARD_API</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span>\n<span class=\"w\">    </span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Check for errors</span>\n<span class=\"w\">
    \   </span><span class=\"k\">if</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-e<span class=\"w\"> </span><span
    class=\"s1\">&#39;.error&#39;</span><span class=\"w\"> </span>&gt;<span class=\"w\">
    </span>/dev/null<span class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">        </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Error creating task: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$RESPONSE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.error.message&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">    </span><span
    class=\"k\">else</span>\n<span class=\"w\">        </span><span class=\"nv\">TASK_ID</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span class=\"w\"> </span><span
    class=\"s1\">&#39;.result&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">
    \       </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Created
    task ID: </span><span class=\"nv\">$TASK_ID</span><span class=\"s2\">&quot;</span>\n\n<span
    class=\"w\">        </span><span class=\"c1\"># If there are labels, set them
    as Kanboard tags on the task</span>\n<span class=\"w\">        </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LABELS_JSON</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span><span class=\"s1\">&#39;length&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span>-gt<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\"> </span><span
    class=\"k\">then</span>\n<span class=\"w\">            </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Setting tags on task </span><span
    class=\"nv\">$TASK_ID</span><span class=\"s2\">: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LABELS_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;join(&quot;, &quot;)&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">            </span><span
    class=\"nv\">TAGS_REQUEST</span><span class=\"o\">=</span><span class=\"k\">$(</span>jq<span
    class=\"w\"> </span>-n<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>--arg<span class=\"w\"> </span>jsonrpc<span
    class=\"w\"> </span><span class=\"s2\">&quot;2.0&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>method<span class=\"w\"> </span><span class=\"s2\">&quot;setTaskTags&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--argjson<span
    class=\"w\"> </span>id<span class=\"w\"> </span><span class=\"m\">2</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>project_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$QUADTASK_KANBOARD_PROJECT_ID</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--arg<span
    class=\"w\"> </span>task_id<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TASK_ID</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>--argjson<span
    class=\"w\"> </span>tags<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LABELS_JSON</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span><span
    class=\"s1\">&#39;{</span>\n<span class=\"s1\">                    jsonrpc: $jsonrpc,</span>\n<span
    class=\"s1\">                    method: $method,</span>\n<span class=\"s1\">
    \                   id: $id,</span>\n<span class=\"s1\">                    params:
    {</span>\n<span class=\"s1\">                        project_id: $project_id,</span>\n<span
    class=\"s1\">                        task_id: $task_id,</span>\n<span class=\"s1\">
    \                       tags: $tags</span>\n<span class=\"s1\">                    }</span>\n<span
    class=\"s1\">                }&#39;</span><span class=\"k\">)</span>\n\n<span
    class=\"w\">            </span><span class=\"nv\">TAGS_RESPONSE</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>curl<span class=\"w\"> </span>-s<span class=\"w\"> </span>-X<span
    class=\"w\"> </span>POST<span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>-H<span class=\"w\"> </span><span class=\"s2\">&quot;Content-Type:
    application/json&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span>-u<span class=\"w\"> </span><span class=\"s2\">&quot;jsonrpc:</span><span
    class=\"nv\">$KANBOARD_TOKEN</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"se\">\\</span>\n<span class=\"w\">                </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$TAGS_REQUEST</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">                </span><span class=\"s2\">&quot;</span><span class=\"nv\">$KANBOARD_API</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span>\n\n<span class=\"w\">            </span><span
    class=\"k\">if</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$TAGS_RESPONSE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>jq<span class=\"w\"> </span>-e<span class=\"w\"> </span><span
    class=\"s1\">&#39;.error&#39;</span><span class=\"w\"> </span>&gt;<span class=\"w\">
    </span>/dev/null<span class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">                </span><span class=\"nb\">echo</span><span class=\"w\">
    </span><span class=\"s2\">&quot;Warning: Failed to set tags: </span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TAGS_RESPONSE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.error.message&#39;</span><span
    class=\"k\">)</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">            </span><span
    class=\"k\">else</span>\n<span class=\"w\">                </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Tags set successfully&quot;</span>\n<span
    class=\"w\">            </span><span class=\"k\">fi</span>\n<span class=\"w\">
    \       </span><span class=\"k\">fi</span>\n\n<span class=\"w\">        </span><span
    class=\"c1\"># Close the corresponding GitHub issue to avoid duplicates</span>\n<span
    class=\"w\">        </span><span class=\"nv\">TASK_URL</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"nv\">KANBOARD_URL</span><span
    class=\"si\">}</span><span class=\"s2\">/?controller=TaskViewController&amp;action=show&amp;task_id=</span><span
    class=\"si\">${</span><span class=\"nv\">TASK_ID</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"w\">        </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Closing GitHub issue #</span><span
    class=\"nv\">$NUMBER</span><span class=\"s2\"> with comment linking to Kanboard
    task...&quot;</span>\n<span class=\"w\">        </span><span class=\"k\">if</span><span
    class=\"w\"> </span>gh<span class=\"w\"> </span>issue<span class=\"w\"> </span>close<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NUMBER</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>--repo<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$GITHUB_REPO</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>--comment<span class=\"w\"> </span><span class=\"s2\">&quot;Migrated
    to Kanboard task </span><span class=\"nv\">$TASK_ID</span><span class=\"s2\">:
    </span><span class=\"nv\">$TASK_URL</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>&gt;/dev/null<span class=\"p\">;</span><span class=\"w\">
    </span><span class=\"k\">then</span>\n<span class=\"w\">            </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Closed
    GitHub issue #</span><span class=\"nv\">$NUMBER</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">        </span><span class=\"k\">else</span>\n<span class=\"w\">            </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Warning:
    Failed to close GitHub issue #</span><span class=\"nv\">$NUMBER</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">        </span><span class=\"k\">fi</span>\n<span class=\"w\">    </span><span
    class=\"k\">fi</span>\n<span class=\"w\">    </span>\n<span class=\"w\">    </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;----------------------------------------&quot;</span>\n<span
    class=\"k\">done</span>\n\n<span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Migration completed&quot;</span>\n</pre></div>\n\n</pre>\n\n\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-08-07 14:43:27\ntemplateKey: til\ntitle: Migrate Github
    Issues to Kanboard\npublished: True\ntags:\n  - kanboard\n  - til\n  - tech\n---\n\nI
    am working on shifting everything, or as much as I reasonably can, related to\ndev
    for myself to on-prem, including git and CI/CD. So for Quadtask I had a\nbunch
    of Github issues that I wanted to migrate to my kanboard instance, gpt-5\ndid
    a bang-up job on this script\n\nIt gets each issue, creates a tag for each label,
    creates the kanboard ticket, then closes the github issue\n\n```bash\n\n#!/bin/bash\n\n#
    GitHub to Kanboard Issue Migration Script\n# Uses GitHub CLI (gh) and curl to
    migrate issues\n\n# Exit on error\nset -e\n\n# Check required environment variables\nfor
    var in KANBOARD_URL KANBOARD_TOKEN GH_TOKEN QUADTASK_KANBOARD_PROJECT_ID; do\n
    \   if [ -z \"${!var}\" ]; then\n        echo \"Error: $var is not set\"\n        exit
    1\n    fi\ndone\n\n# GitHub repository (default: pypeaday/quadtask)\nGITHUB_REPO=${GITHUB_REPO:-\"pypeaday/quadtask\"}\n\n#
    Kanboard API endpoint\nKANBOARD_API=\"$KANBOARD_URL/jsonrpc.php\"\n\n# Get all
    open issues from GitHub\necho \"Fetching open issues from $GITHUB_REPO...\"\nISSUES_JSON=$(gh
    issue list --repo \"$GITHUB_REPO\" --state open --limit 1000 --json number,title,body,labels)\n\n#
    Count issues\nISSUE_COUNT=$(echo \"$ISSUES_JSON\" | jq '. | length')\necho \"Found
    $ISSUE_COUNT open issues\"\n\n# Process each issue\necho \"$ISSUES_JSON\" | jq
    -c '.[]' | while read -r issue; do\n    # Extract issue details\n    NUMBER=$(echo
    \"$issue\" | jq -r '.number')\n    TITLE=$(echo \"$issue\" | jq -r '.title')\n
    \   BODY=$(echo \"$issue\" | jq -r '.body // \"\"')\n    # Extract label names
    as a JSON array\n    LABELS_JSON=$(echo \"$issue\" | jq -c '[.labels[]?.name]
    // []')\n    \n    # Prepare Kanboard task data\n    REQUEST_DATA=$(jq -n \\\n
    \       --arg method \"createTask\" \\\n        --argjson id 1 \\\n        --arg
    jsonrpc \"2.0\" \\\n        --arg title \"$TITLE\" \\\n        --arg description
    \"$BODY\" \\\n        --arg project_id \"$QUADTASK_KANBOARD_PROJECT_ID\" \\\n
    \       '{\n            \"jsonrpc\": $jsonrpc,\n            \"method\": $method,\n
    \           \"id\": $id,\n            \"params\": {\n                \"title\":
    $title,\n                \"description\": $description,\n                \"project_id\":
    $project_id\n            }\n        }')\n    \n    # Create task in Kanboard\n
    \   echo \"Creating task: $TITLE\"\n    RESPONSE=$(curl -s -X POST \\\n        -H
    \"Content-Type: application/json\" \\\n        -u \"jsonrpc:$KANBOARD_TOKEN\"
    \\\n        -d \"$REQUEST_DATA\" \\\n        \"$KANBOARD_API\")\n    \n    # Check
    for errors\n    if echo \"$RESPONSE\" | jq -e '.error' > /dev/null; then\n        echo
    \"Error creating task: $(echo \"$RESPONSE\" | jq -r '.error.message')\"\n    else\n
    \       TASK_ID=$(echo \"$RESPONSE\" | jq -r '.result')\n        echo \"Created
    task ID: $TASK_ID\"\n\n        # If there are labels, set them as Kanboard tags
    on the task\n        if [ \"$(echo \"$LABELS_JSON\" | jq 'length')\" -gt 0 ];
    then\n            echo \"Setting tags on task $TASK_ID: $(echo \"$LABELS_JSON\"
    | jq -r 'join(\", \")')\"\n            TAGS_REQUEST=$(jq -n \\\n                --arg
    jsonrpc \"2.0\" \\\n                --arg method \"setTaskTags\" \\\n                --argjson
    id 2 \\\n                --arg project_id \"$QUADTASK_KANBOARD_PROJECT_ID\" \\\n
    \               --arg task_id \"$TASK_ID\" \\\n                --argjson tags
    \"$LABELS_JSON\" \\\n                '{\n                    jsonrpc: $jsonrpc,\n
    \                   method: $method,\n                    id: $id,\n                    params:
    {\n                        project_id: $project_id,\n                        task_id:
    $task_id,\n                        tags: $tags\n                    }\n                }')\n\n
    \           TAGS_RESPONSE=$(curl -s -X POST \\\n                -H \"Content-Type:
    application/json\" \\\n                -u \"jsonrpc:$KANBOARD_TOKEN\" \\\n                -d
    \"$TAGS_REQUEST\" \\\n                \"$KANBOARD_API\")\n\n            if echo
    \"$TAGS_RESPONSE\" | jq -e '.error' > /dev/null; then\n                echo \"Warning:
    Failed to set tags: $(echo \"$TAGS_RESPONSE\" | jq -r '.error.message')\"\n            else\n
    \               echo \"Tags set successfully\"\n            fi\n        fi\n\n
    \       # Close the corresponding GitHub issue to avoid duplicates\n        TASK_URL=\"${KANBOARD_URL}/?controller=TaskViewController&action=show&task_id=${TASK_ID}\"\n
    \       echo \"Closing GitHub issue #$NUMBER with comment linking to Kanboard
    task...\"\n        if gh issue close \"$NUMBER\" --repo \"$GITHUB_REPO\" --comment
    \"Migrated to Kanboard task $TASK_ID: $TASK_URL\" >/dev/null; then\n            echo
    \"Closed GitHub issue #$NUMBER\"\n        else\n            echo \"Warning: Failed
    to close GitHub issue #$NUMBER\"\n        fi\n    fi\n    \n    echo \"----------------------------------------\"\ndone\n\necho
    \"Migration completed\"\n```\n"
published: true
slug: migrate-github-issues-to-kanboard
title: Migrate Github Issues to Kanboard


---

I am working on shifting everything, or as much as I reasonably can, related to
dev for myself to on-prem, including git and CI/CD. So for Quadtask I had a
bunch of Github issues that I wanted to migrate to my kanboard instance, gpt-5
did a bang-up job on this script

It gets each issue, creates a tag for each label, creates the kanboard ticket, then closes the github issue

```bash

#!/bin/bash

# GitHub to Kanboard Issue Migration Script
# Uses GitHub CLI (gh) and curl to migrate issues

# Exit on error
set -e

# Check required environment variables
for var in KANBOARD_URL KANBOARD_TOKEN GH_TOKEN QUADTASK_KANBOARD_PROJECT_ID; do
    if [ -z "${!var}" ]; then
        echo "Error: $var is not set"
        exit 1
    fi
done

# GitHub repository (default: pypeaday/quadtask)
GITHUB_REPO=${GITHUB_REPO:-"pypeaday/quadtask"}

# Kanboard API endpoint
KANBOARD_API="$KANBOARD_URL/jsonrpc.php"

# Get all open issues from GitHub
echo "Fetching open issues from $GITHUB_REPO..."
ISSUES_JSON=$(gh issue list --repo "$GITHUB_REPO" --state open --limit 1000 --json number,title,body,labels)

# Count issues
ISSUE_COUNT=$(echo "$ISSUES_JSON" | jq '. | length')
echo "Found $ISSUE_COUNT open issues"

# Process each issue
echo "$ISSUES_JSON" | jq -c '.[]' | while read -r issue; do
    # Extract issue details
    NUMBER=$(echo "$issue" | jq -r '.number')
    TITLE=$(echo "$issue" | jq -r '.title')
    BODY=$(echo "$issue" | jq -r '.body // ""')
    # Extract label names as a JSON array
    LABELS_JSON=$(echo "$issue" | jq -c '[.labels[]?.name] // []')
    
    # Prepare Kanboard task data
    REQUEST_DATA=$(jq -n \
        --arg method "createTask" \
        --argjson id 1 \
        --arg jsonrpc "2.0" \
        --arg title "$TITLE" \
        --arg description "$BODY" \
        --arg project_id "$QUADTASK_KANBOARD_PROJECT_ID" \
        '{
            "jsonrpc": $jsonrpc,
            "method": $method,
            "id": $id,
            "params": {
                "title": $title,
                "description": $description,
                "project_id": $project_id
            }
        }')
    
    # Create task in Kanboard
    echo "Creating task: $TITLE"
    RESPONSE=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -u "jsonrpc:$KANBOARD_TOKEN" \
        -d "$REQUEST_DATA" \
        "$KANBOARD_API")
    
    # Check for errors
    if echo "$RESPONSE" | jq -e '.error' > /dev/null; then
        echo "Error creating task: $(echo "$RESPONSE" | jq -r '.error.message')"
    else
        TASK_ID=$(echo "$RESPONSE" | jq -r '.result')
        echo "Created task ID: $TASK_ID"

        # If there are labels, set them as Kanboard tags on the task
        if [ "$(echo "$LABELS_JSON" | jq 'length')" -gt 0 ]; then
            echo "Setting tags on task $TASK_ID: $(echo "$LABELS_JSON" | jq -r 'join(", ")')"
            TAGS_REQUEST=$(jq -n \
                --arg jsonrpc "2.0" \
                --arg method "setTaskTags" \
                --argjson id 2 \
                --arg project_id "$QUADTASK_KANBOARD_PROJECT_ID" \
                --arg task_id "$TASK_ID" \
                --argjson tags "$LABELS_JSON" \
                '{
                    jsonrpc: $jsonrpc,
                    method: $method,
                    id: $id,
                    params: {
                        project_id: $project_id,
                        task_id: $task_id,
                        tags: $tags
                    }
                }')

            TAGS_RESPONSE=$(curl -s -X POST \
                -H "Content-Type: application/json" \
                -u "jsonrpc:$KANBOARD_TOKEN" \
                -d "$TAGS_REQUEST" \
                "$KANBOARD_API")

            if echo "$TAGS_RESPONSE" | jq -e '.error' > /dev/null; then
                echo "Warning: Failed to set tags: $(echo "$TAGS_RESPONSE" | jq -r '.error.message')"
            else
                echo "Tags set successfully"
            fi
        fi

        # Close the corresponding GitHub issue to avoid duplicates
        TASK_URL="${KANBOARD_URL}/?controller=TaskViewController&action=show&task_id=${TASK_ID}"
        echo "Closing GitHub issue #$NUMBER with comment linking to Kanboard task..."
        if gh issue close "$NUMBER" --repo "$GITHUB_REPO" --comment "Migrated to Kanboard task $TASK_ID: $TASK_URL" >/dev/null; then
            echo "Closed GitHub issue #$NUMBER"
        else
            echo "Warning: Failed to close GitHub issue #$NUMBER"
        fi
    fi
    
    echo "----------------------------------------"
done

echo "Migration completed"
```