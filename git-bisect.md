---
content: "I try to commit a lot, and I also try to write useful tests appropriate
  for the scope of work I'm focusing on, but sometimes I drop the ball...\n\nWhether
  by laziness, ignorance, or accepted tech debt I don't always code perfectly and
  recently I was dozens of commits into a new feature before realizing I broke something
  along the way that none of my tests caught...\n\nBefore today I would've manually
  reviewed every commit to see if something obvious slipped by me (talk about a time
  suck \U0001F629)\n\n__There must be a better way__\n\n# Bisect?\n\n`git bisect`
  is the magic sauce for this exact problem...\n\nYou essentially create a range of
  commits to consider and let `git bisect` guide you through them in a manner akin
  to Newton's method for finding the root of a continuous function.\n\n# How to do
  it?\n\nStart with `git bisect start` and then choose the first `good` commit (ie.
  a commit you know the bug isn't present in)\n\n```bash\n\nsandbox  \uE725 bisect-post
  \ \uF21B \xD71 via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F git bisect
  start\n\nsandbox  \uE725 bisect-post (BISECTING)  \uF21B \xD71 via \uE235  v3.8.11(sandbox)
  \ on \uE33D (us-east-1)\n\u276F git bisect good 655332b\nbisect-post  HEAD         main
  \        ORIG_HEAD\n5b31e1e  -- [HEAD]    add successful print (52 seconds ago)\n308247b
  \ -- [HEAD^]   init another loop (77 seconds ago)\n4555c59  -- [HEAD^^]  introduce
  bug (2 minutes ago)\n9cf6d55  -- [HEAD~3]  add successful loop (3 minutes ago)\nbcb41c3
  \ -- [HEAD~4]  change x to 10 (4 minutes ago)\n3c34aac  -- [HEAD~5]  init x to 1
  (4 minutes ago)\n12e53bd  -- [HEAD~6]  print cwd (4 minutes ago)\n655332b  -- [HEAD~7]
  \ add example.py (10 minutes ago)  # <- I want to start at this commit\n59e0048
  \ -- [HEAD~8]  gitignore (23 hours ago)\nfb9e1fb  -- [HEAD~9]  add reqs (23 hours
  ago)\n\n```\n\n```bash\n\nsandbox  \uE725 bisect-post (BISECTING)  \uF21B \xD71
  via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F git bisect bad 5b31e1e\nbisect-post
  \                                               ORIG_HEAD\nHEAD                                                       refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57\nmain\n5b31e1e
  \ -- [HEAD]    add successful print (5 minutes ago)  # <- I start here with the
  \"bad\" commit\n308247b  -- [HEAD^]   init another loop (6 minutes ago)\n4555c59
  \ -- [HEAD^^]  introduce bug (6 minutes ago)\n9cf6d55  -- [HEAD~3]  add successful
  loop (7 minutes ago)\nbcb41c3  -- [HEAD~4]  change x to 10 (8 minutes ago)\n3c34aac
  \ -- [HEAD~5]  init x to 1 (9 minutes ago)\n12e53bd  -- [HEAD~6]  print cwd (9 minutes
  ago)\n655332b  -- [HEAD~7]  add example.py (14 minutes ago)\n59e0048  -- [HEAD~8]
  \ gitignore (23 hours ago)\nfb9e1fb  -- [HEAD~9]  add reqs (23 hours ago)\n\n```\n\nAfter
  starting bisect with a \"good\" start commit and a \"bad\" ending commit we can
  let git to it's thing!\n\nGit checksout a commit somewhere about halfway between
  the good and bad commit so you can see if your bug is there or not.\n\n```bash\n\nsandbox
  \ \uE725 bisect-post (BISECTING)  \uF21B \xD71 via \uE235  v3.8.11(sandbox)  on
  \uE33D (us-east-1)\n\u276F git bisect bad 5b31e1e\nBisecting: 3 revisions left to
  test after this (roughly 2 steps)\n[bcb41c3854e343eade85353683f2c1c4ddde4e04] change
  x to 10\n\nsandbox  \uE725 HEAD (bcb41c38) (BISECTING)  \uF21B \xD71 via \uE235
  \ v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F\n```\n\nIn my example here I have
  a python script with some loops and print statements - they aren't really relevant,
  I just wanted an easy to follow git history.\n\nSo I check to see if the bug is
  present or not either by running/writing tests or replicating the bug somehow.\n\nIn
  this session commit `bcb41c38` is actually just fine, so I do `git bisect good`\n\n```bash\n\nsandbox
  \ \uE725 HEAD (bcb41c38) (BISECTING)  \uF21B \xD71 via \uE235  v3.8.11(sandbox)
  \ on \uE33D (us-east-1)\n\u276F git bisect good\nBisecting: 1 revision left to test
  after this (roughly 1 step)\n[4555c5979268dff6c475365fdc5ce1d4a12bd820] introduce
  bug\n\n```\n\nAnd we see that git moves on to checkout another commit...\n\nIn this
  case the next commit is the one where I introduced a bug\n\n`git bisect bad` then
  gives me:\n\n```bash\n\nsandbox  \uE725 HEAD (4555c597) (BISECTING)  \uF21B \xD71
  via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F git bisect bad\nBisecting:
  0 revisions left to test after this (roughly 0 steps)\n[9cf6d55301560c51e2f55404d0d80b1f1e22a33d]
  add successful loop\n```\n\nAt `4555c597` the script works as expected so one more
  `git bisect good` yields...\n\n```bash\nsandbox  \uE725 HEAD (9cf6d553) (BISECTING)
  \ \uF21B \xD71 via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F git bisect
  good\n4555c5979268dff6c475365fdc5ce1d4a12bd820 is the first bad commit\ncommit 4555c5979268dff6c475365fdc5ce1d4a12bd820\nAuthor:
  ########################### \nDate:   Tue May 3 09:00:00 2022 -0500\n\n    introduce
  bug\n\n example.py | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)\n\n\n```\n\n#
  What happened?\n\nGit sliced up a range of commits based on me saying of the next
  one was good or bad and localized the commit that introduced a bug into my workflow!\n\nI
  didn't have to manually review commits, click through logs, etc... I just let git
  checkout relevant commits and I ran whatever was appropriate for reproducing the
  bug to learn when it was comitted!"
date: 2022-05-03
description: 'I try to commit a lot, and I also try to write useful tests appropriate
  for the scope of work I&#x27;m focusing on, but sometimes I drop the ball... Whether
  by '
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Git-Bisect</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I try to commit a lot, and I also try
    to write useful tests appropriate for the scope of work I&#x27;m focusing on,
    but sometimes I drop the ball... Whether by \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Git-Bisect | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/git-bisect\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Git-Bisect | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I
    try to commit a lot, and I also try to write useful tests appropriate for the
    scope of work I&#x27;m focusing on, but sometimes I drop the ball... Whether by
    \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/git-bisect</span>\n        </div>\n
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
    mb-4 post-title-large\">Git-Bisect</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-03\">\n            May
    03, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/git/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #git\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I try to commit a lot, and I also try
    to write useful tests appropriate for the scope of work I'm focusing on, but sometimes
    I drop the ball...</p>\n<p>Whether by laziness, ignorance, or accepted tech debt
    I don't always code perfectly and recently I was dozens of commits into a new
    feature before realizing I broke something along the way that none of my tests
    caught...</p>\n<p>Before today I would've manually reviewed every commit to see
    if something obvious slipped by me (talk about a time suck \U0001F629)</p>\n<p><strong>There
    must be a better way</strong></p>\n<h1 id=\"bisect\">Bisect? <a class=\"header-anchor\"
    href=\"#bisect\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><code>git bisect</code>
    is the magic sauce for this exact problem...</p>\n<p>You essentially create a
    range of commits to consider and let <code>git bisect</code> guide you through
    them in a manner akin to Newton's method for finding the root of a continuous
    function.</p>\n<h1 id=\"how-to-do-it\">How to do it? <a class=\"header-anchor\"
    href=\"#how-to-do-it\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Start with <code>git
    bisect start</code> and then choose the first <code>good</code> commit (ie. a
    commit you know the bug isn't present in)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>start\n\nsandbox<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\">
    </span><span class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">
    \ </span>\uF21B<span class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span
    class=\"o\">)</span><span class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span
    class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>good<span
    class=\"w\"> </span>655332b\nbisect-post<span class=\"w\">  </span>HEAD<span class=\"w\">
    \        </span>main<span class=\"w\">         </span>ORIG_HEAD\n5b31e1e<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
    class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">52</span><span class=\"w\"> </span>seconds<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n308247b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span class=\"w\">   </span>init<span
    class=\"w\"> </span>another<span class=\"w\"> </span>loop<span class=\"w\"> </span><span
    class=\"o\">(</span><span class=\"m\">77</span><span class=\"w\"> </span>seconds<span
    class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span class=\"w\">  </span>--<span
    class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span class=\"o\">]</span><span
    class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span class=\"w\">
    </span><span class=\"o\">(</span><span class=\"m\">2</span><span class=\"w\">
    </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">3</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\nbcb41c3<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~4<span class=\"o\">]</span><span class=\"w\">  </span>change<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">10</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n3c34aac<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~5<span class=\"o\">]</span><span class=\"w\">  </span>init<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">1</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n12e53bd<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~6<span class=\"o\">]</span><span class=\"w\">  </span>print<span
    class=\"w\"> </span>cwd<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n655332b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~7<span class=\"o\">]</span><span class=\"w\">  </span>add<span
    class=\"w\"> </span>example.py<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">10</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span><span class=\"w\">  </span><span class=\"c1\"># &lt;- I want
    to start at this commit</span>\n59e0048<span class=\"w\">  </span>--<span class=\"w\">
    </span><span class=\"o\">[</span>HEAD~8<span class=\"o\">]</span><span class=\"w\">
    \ </span>gitignore<span class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\">
    </span>5b31e1e\nbisect-post<span class=\"w\">                                                </span>ORIG_HEAD\nHEAD<span
    class=\"w\">                                                       </span>refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57\nmain\n5b31e1e<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
    class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">5</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span><span class=\"w\">  </span><span class=\"c1\"># &lt;- I start
    here with the &quot;bad&quot; commit</span>\n308247b<span class=\"w\">  </span>--<span
    class=\"w\"> </span><span class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span
    class=\"w\">   </span>init<span class=\"w\"> </span>another<span class=\"w\">
    </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span
    class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span
    class=\"o\">]</span><span class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span
    class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">7</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\nbcb41c3<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~4<span class=\"o\">]</span><span class=\"w\">  </span>change<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">10</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">8</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n3c34aac<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~5<span class=\"o\">]</span><span class=\"w\">  </span>init<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">1</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">9</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n12e53bd<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~6<span class=\"o\">]</span><span class=\"w\">  </span>print<span
    class=\"w\"> </span>cwd<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">9</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n655332b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~7<span class=\"o\">]</span><span class=\"w\">  </span>add<span
    class=\"w\"> </span>example.py<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">14</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n59e0048<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~8<span class=\"o\">]</span><span class=\"w\">  </span>gitignore<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>After
    starting bisect with a &quot;good&quot; start commit and a &quot;bad&quot; ending
    commit we can let git to it's thing!</p>\n<p>Git checksout a commit somewhere
    about halfway between the good and bad commit so you can see if your bug is there
    or not.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\">
    </span>5b31e1e\nBisecting:<span class=\"w\"> </span><span class=\"m\">3</span><span
    class=\"w\"> </span>revisions<span class=\"w\"> </span>left<span class=\"w\">
    </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\">
    </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">2</span><span class=\"w\"> </span>steps<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>bcb41c3854e343eade85353683f2c1c4ddde4e04<span
    class=\"o\">]</span><span class=\"w\"> </span>change<span class=\"w\"> </span>x<span
    class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">10</span>\n\nsandbox<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
    class=\"o\">(</span>bcb41c38<span class=\"o\">)</span><span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F\n</pre></div>\n\n</pre>\n\n<p>In
    my example here I have a python script with some loops and print statements -
    they aren't really relevant, I just wanted an easy to follow git history.</p>\n<p>So
    I check to see if the bug is present or not either by running/writing tests or
    replicating the bug somehow.</p>\n<p>In this session commit <code>bcb41c38</code>
    is actually just fine, so I do <code>git bisect good</code></p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>bcb41c38<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>good\nBisecting:<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>revision<span class=\"w\"> </span>left<span class=\"w\"> </span>to<span
    class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\"> </span>after<span
    class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\"> </span>step<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>4555c5979268dff6c475365fdc5ce1d4a12bd820<span
    class=\"o\">]</span><span class=\"w\"> </span>introduce<span class=\"w\"> </span>bug\n</pre></div>\n\n</pre>\n\n<p>And
    we see that git moves on to checkout another commit...</p>\n<p>In this case the
    next commit is the one where I introduced a bug</p>\n<p><code>git bisect bad</code>
    then gives me:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>4555c597<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>bad\nBisecting:<span class=\"w\"> </span><span class=\"m\">0</span><span
    class=\"w\"> </span>revisions<span class=\"w\"> </span>left<span class=\"w\">
    </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\">
    </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span>steps<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>9cf6d55301560c51e2f55404d0d80b1f1e22a33d<span
    class=\"o\">]</span><span class=\"w\"> </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop\n</pre></div>\n\n</pre>\n\n<p>At <code>4555c597</code>
    the script works as expected so one more <code>git bisect good</code> yields...</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>9cf6d553<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>good\n4555c5979268dff6c475365fdc5ce1d4a12bd820<span class=\"w\">
    </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>first<span class=\"w\">
    </span>bad<span class=\"w\"> </span>commit\ncommit<span class=\"w\"> </span>4555c5979268dff6c475365fdc5ce1d4a12bd820\nAuthor:<span
    class=\"w\"> </span><span class=\"c1\">########################### </span>\nDate:<span
    class=\"w\">   </span>Tue<span class=\"w\"> </span>May<span class=\"w\"> </span><span
    class=\"m\">3</span><span class=\"w\"> </span><span class=\"m\">09</span>:00:00<span
    class=\"w\"> </span><span class=\"m\">2022</span><span class=\"w\"> </span>-0500\n\n<span
    class=\"w\">    </span>introduce<span class=\"w\"> </span>bug\n\n<span class=\"w\">
    </span>example.py<span class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\">
    </span><span class=\"m\">2</span><span class=\"w\"> </span>+-\n<span class=\"w\">
    </span><span class=\"m\">1</span><span class=\"w\"> </span>file<span class=\"w\">
    </span>changed,<span class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\">
    </span>insertion<span class=\"o\">(</span>+<span class=\"o\">)</span>,<span class=\"w\">
    </span><span class=\"m\">1</span><span class=\"w\"> </span>deletion<span class=\"o\">(</span>-<span
    class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"what-happened\">What
    happened? <a class=\"header-anchor\" href=\"#what-happened\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Git sliced up a range
    of commits based on me saying of the next one was good or bad and localized the
    commit that introduced a bug into my workflow!</p>\n<p>I didn't have to manually
    review commits, click through logs, etc... I just let git checkout relevant commits
    and I ran whatever was appropriate for reproducing the bug to learn when it was
    comitted!</p>\n\n        </section>\n    </article>\n</section>        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Git-Bisect</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I try to commit a lot, and I also try
    to write useful tests appropriate for the scope of work I&#x27;m focusing on,
    but sometimes I drop the ball... Whether by \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Git-Bisect | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/git-bisect\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Git-Bisect | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I
    try to commit a lot, and I also try to write useful tests appropriate for the
    scope of work I&#x27;m focusing on, but sometimes I drop the ball... Whether by
    \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Git-Bisect</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-03\">\n            May
    03, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/git/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #git\n
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
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Git-Bisect</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-05-03\">\n            May 03, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/git/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #git\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>I
    try to commit a lot, and I also try to write useful tests appropriate for the
    scope of work I'm focusing on, but sometimes I drop the ball...</p>\n<p>Whether
    by laziness, ignorance, or accepted tech debt I don't always code perfectly and
    recently I was dozens of commits into a new feature before realizing I broke something
    along the way that none of my tests caught...</p>\n<p>Before today I would've
    manually reviewed every commit to see if something obvious slipped by me (talk
    about a time suck \U0001F629)</p>\n<p><strong>There must be a better way</strong></p>\n<h1
    id=\"bisect\">Bisect? <a class=\"header-anchor\" href=\"#bisect\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><code>git bisect</code>
    is the magic sauce for this exact problem...</p>\n<p>You essentially create a
    range of commits to consider and let <code>git bisect</code> guide you through
    them in a manner akin to Newton's method for finding the root of a continuous
    function.</p>\n<h1 id=\"how-to-do-it\">How to do it? <a class=\"header-anchor\"
    href=\"#how-to-do-it\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Start with <code>git
    bisect start</code> and then choose the first <code>good</code> commit (ie. a
    commit you know the bug isn't present in)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>start\n\nsandbox<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\">
    </span><span class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">
    \ </span>\uF21B<span class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span
    class=\"o\">)</span><span class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span
    class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>good<span
    class=\"w\"> </span>655332b\nbisect-post<span class=\"w\">  </span>HEAD<span class=\"w\">
    \        </span>main<span class=\"w\">         </span>ORIG_HEAD\n5b31e1e<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
    class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">52</span><span class=\"w\"> </span>seconds<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n308247b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span class=\"w\">   </span>init<span
    class=\"w\"> </span>another<span class=\"w\"> </span>loop<span class=\"w\"> </span><span
    class=\"o\">(</span><span class=\"m\">77</span><span class=\"w\"> </span>seconds<span
    class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span class=\"w\">  </span>--<span
    class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span class=\"o\">]</span><span
    class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span class=\"w\">
    </span><span class=\"o\">(</span><span class=\"m\">2</span><span class=\"w\">
    </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">3</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\nbcb41c3<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~4<span class=\"o\">]</span><span class=\"w\">  </span>change<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">10</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n3c34aac<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~5<span class=\"o\">]</span><span class=\"w\">  </span>init<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">1</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n12e53bd<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~6<span class=\"o\">]</span><span class=\"w\">  </span>print<span
    class=\"w\"> </span>cwd<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n655332b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~7<span class=\"o\">]</span><span class=\"w\">  </span>add<span
    class=\"w\"> </span>example.py<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">10</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span><span class=\"w\">  </span><span class=\"c1\"># &lt;- I want
    to start at this commit</span>\n59e0048<span class=\"w\">  </span>--<span class=\"w\">
    </span><span class=\"o\">[</span>HEAD~8<span class=\"o\">]</span><span class=\"w\">
    \ </span>gitignore<span class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\">
    </span>5b31e1e\nbisect-post<span class=\"w\">                                                </span>ORIG_HEAD\nHEAD<span
    class=\"w\">                                                       </span>refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57\nmain\n5b31e1e<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
    class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">5</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span><span class=\"w\">  </span><span class=\"c1\"># &lt;- I start
    here with the &quot;bad&quot; commit</span>\n308247b<span class=\"w\">  </span>--<span
    class=\"w\"> </span><span class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span
    class=\"w\">   </span>init<span class=\"w\"> </span>another<span class=\"w\">
    </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span
    class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span
    class=\"o\">]</span><span class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span
    class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">7</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\nbcb41c3<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~4<span class=\"o\">]</span><span class=\"w\">  </span>change<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">10</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">8</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n3c34aac<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~5<span class=\"o\">]</span><span class=\"w\">  </span>init<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">1</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">9</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n12e53bd<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~6<span class=\"o\">]</span><span class=\"w\">  </span>print<span
    class=\"w\"> </span>cwd<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">9</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n655332b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~7<span class=\"o\">]</span><span class=\"w\">  </span>add<span
    class=\"w\"> </span>example.py<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">14</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n59e0048<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~8<span class=\"o\">]</span><span class=\"w\">  </span>gitignore<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>After
    starting bisect with a &quot;good&quot; start commit and a &quot;bad&quot; ending
    commit we can let git to it's thing!</p>\n<p>Git checksout a commit somewhere
    about halfway between the good and bad commit so you can see if your bug is there
    or not.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\">
    </span>5b31e1e\nBisecting:<span class=\"w\"> </span><span class=\"m\">3</span><span
    class=\"w\"> </span>revisions<span class=\"w\"> </span>left<span class=\"w\">
    </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\">
    </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">2</span><span class=\"w\"> </span>steps<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>bcb41c3854e343eade85353683f2c1c4ddde4e04<span
    class=\"o\">]</span><span class=\"w\"> </span>change<span class=\"w\"> </span>x<span
    class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">10</span>\n\nsandbox<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
    class=\"o\">(</span>bcb41c38<span class=\"o\">)</span><span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F\n</pre></div>\n\n</pre>\n\n<p>In
    my example here I have a python script with some loops and print statements -
    they aren't really relevant, I just wanted an easy to follow git history.</p>\n<p>So
    I check to see if the bug is present or not either by running/writing tests or
    replicating the bug somehow.</p>\n<p>In this session commit <code>bcb41c38</code>
    is actually just fine, so I do <code>git bisect good</code></p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>bcb41c38<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>good\nBisecting:<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>revision<span class=\"w\"> </span>left<span class=\"w\"> </span>to<span
    class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\"> </span>after<span
    class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\"> </span>step<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>4555c5979268dff6c475365fdc5ce1d4a12bd820<span
    class=\"o\">]</span><span class=\"w\"> </span>introduce<span class=\"w\"> </span>bug\n</pre></div>\n\n</pre>\n\n<p>And
    we see that git moves on to checkout another commit...</p>\n<p>In this case the
    next commit is the one where I introduced a bug</p>\n<p><code>git bisect bad</code>
    then gives me:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>4555c597<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>bad\nBisecting:<span class=\"w\"> </span><span class=\"m\">0</span><span
    class=\"w\"> </span>revisions<span class=\"w\"> </span>left<span class=\"w\">
    </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\">
    </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span>steps<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>9cf6d55301560c51e2f55404d0d80b1f1e22a33d<span
    class=\"o\">]</span><span class=\"w\"> </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop\n</pre></div>\n\n</pre>\n\n<p>At <code>4555c597</code>
    the script works as expected so one more <code>git bisect good</code> yields...</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>9cf6d553<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>good\n4555c5979268dff6c475365fdc5ce1d4a12bd820<span class=\"w\">
    </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>first<span class=\"w\">
    </span>bad<span class=\"w\"> </span>commit\ncommit<span class=\"w\"> </span>4555c5979268dff6c475365fdc5ce1d4a12bd820\nAuthor:<span
    class=\"w\"> </span><span class=\"c1\">########################### </span>\nDate:<span
    class=\"w\">   </span>Tue<span class=\"w\"> </span>May<span class=\"w\"> </span><span
    class=\"m\">3</span><span class=\"w\"> </span><span class=\"m\">09</span>:00:00<span
    class=\"w\"> </span><span class=\"m\">2022</span><span class=\"w\"> </span>-0500\n\n<span
    class=\"w\">    </span>introduce<span class=\"w\"> </span>bug\n\n<span class=\"w\">
    </span>example.py<span class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\">
    </span><span class=\"m\">2</span><span class=\"w\"> </span>+-\n<span class=\"w\">
    </span><span class=\"m\">1</span><span class=\"w\"> </span>file<span class=\"w\">
    </span>changed,<span class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\">
    </span>insertion<span class=\"o\">(</span>+<span class=\"o\">)</span>,<span class=\"w\">
    </span><span class=\"m\">1</span><span class=\"w\"> </span>deletion<span class=\"o\">(</span>-<span
    class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"what-happened\">What
    happened? <a class=\"header-anchor\" href=\"#what-happened\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Git sliced up a range
    of commits based on me saying of the next one was good or bad and localized the
    commit that introduced a bug into my workflow!</p>\n<p>I didn't have to manually
    review commits, click through logs, etc... I just let git checkout relevant commits
    and I ran whatever was appropriate for reproducing the bug to learn when it was
    comitted!</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Git-Bisect</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I try to commit a lot, and I also try
    to write useful tests appropriate for the scope of work I&#x27;m focusing on,
    but sometimes I drop the ball... Whether by \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Git-Bisect | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/git-bisect\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Git-Bisect | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I
    try to commit a lot, and I also try to write useful tests appropriate for the
    scope of work I&#x27;m focusing on, but sometimes I drop the ball... Whether by
    \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/git-bisect</span>\n        </div>\n
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
    Content is handled by the password protection plugin -->\n    <p>I try to commit
    a lot, and I also try to write useful tests appropriate for the scope of work
    I'm focusing on, but sometimes I drop the ball...</p>\n<p>Whether by laziness,
    ignorance, or accepted tech debt I don't always code perfectly and recently I
    was dozens of commits into a new feature before realizing I broke something along
    the way that none of my tests caught...</p>\n<p>Before today I would've manually
    reviewed every commit to see if something obvious slipped by me (talk about a
    time suck \U0001F629)</p>\n<p><strong>There must be a better way</strong></p>\n<h1
    id=\"bisect\">Bisect? <a class=\"header-anchor\" href=\"#bisect\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><code>git bisect</code>
    is the magic sauce for this exact problem...</p>\n<p>You essentially create a
    range of commits to consider and let <code>git bisect</code> guide you through
    them in a manner akin to Newton's method for finding the root of a continuous
    function.</p>\n<h1 id=\"how-to-do-it\">How to do it? <a class=\"header-anchor\"
    href=\"#how-to-do-it\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Start with <code>git
    bisect start</code> and then choose the first <code>good</code> commit (ie. a
    commit you know the bug isn't present in)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>start\n\nsandbox<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\">
    </span><span class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">
    \ </span>\uF21B<span class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span
    class=\"o\">)</span><span class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span
    class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>good<span
    class=\"w\"> </span>655332b\nbisect-post<span class=\"w\">  </span>HEAD<span class=\"w\">
    \        </span>main<span class=\"w\">         </span>ORIG_HEAD\n5b31e1e<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
    class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">52</span><span class=\"w\"> </span>seconds<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n308247b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span class=\"w\">   </span>init<span
    class=\"w\"> </span>another<span class=\"w\"> </span>loop<span class=\"w\"> </span><span
    class=\"o\">(</span><span class=\"m\">77</span><span class=\"w\"> </span>seconds<span
    class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span class=\"w\">  </span>--<span
    class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span class=\"o\">]</span><span
    class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span class=\"w\">
    </span><span class=\"o\">(</span><span class=\"m\">2</span><span class=\"w\">
    </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">3</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\nbcb41c3<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~4<span class=\"o\">]</span><span class=\"w\">  </span>change<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">10</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n3c34aac<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~5<span class=\"o\">]</span><span class=\"w\">  </span>init<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">1</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n12e53bd<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~6<span class=\"o\">]</span><span class=\"w\">  </span>print<span
    class=\"w\"> </span>cwd<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n655332b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~7<span class=\"o\">]</span><span class=\"w\">  </span>add<span
    class=\"w\"> </span>example.py<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">10</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span><span class=\"w\">  </span><span class=\"c1\"># &lt;- I want
    to start at this commit</span>\n59e0048<span class=\"w\">  </span>--<span class=\"w\">
    </span><span class=\"o\">[</span>HEAD~8<span class=\"o\">]</span><span class=\"w\">
    \ </span>gitignore<span class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\">
    </span>5b31e1e\nbisect-post<span class=\"w\">                                                </span>ORIG_HEAD\nHEAD<span
    class=\"w\">                                                       </span>refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57\nmain\n5b31e1e<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
    class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">5</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span><span class=\"w\">  </span><span class=\"c1\"># &lt;- I start
    here with the &quot;bad&quot; commit</span>\n308247b<span class=\"w\">  </span>--<span
    class=\"w\"> </span><span class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span
    class=\"w\">   </span>init<span class=\"w\"> </span>another<span class=\"w\">
    </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span
    class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span
    class=\"o\">]</span><span class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span
    class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">7</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\nbcb41c3<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~4<span class=\"o\">]</span><span class=\"w\">  </span>change<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">10</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">8</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n3c34aac<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~5<span class=\"o\">]</span><span class=\"w\">  </span>init<span
    class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
    class=\"m\">1</span><span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">9</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n12e53bd<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~6<span class=\"o\">]</span><span class=\"w\">  </span>print<span
    class=\"w\"> </span>cwd<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">9</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n655332b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~7<span class=\"o\">]</span><span class=\"w\">  </span>add<span
    class=\"w\"> </span>example.py<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">14</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"o\">)</span>\n59e0048<span class=\"w\">  </span>--<span class=\"w\"> </span><span
    class=\"o\">[</span>HEAD~8<span class=\"o\">]</span><span class=\"w\">  </span>gitignore<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span
    class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span
    class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span
    class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">23</span><span
    class=\"w\"> </span>hours<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>After
    starting bisect with a &quot;good&quot; start commit and a &quot;bad&quot; ending
    commit we can let git to it's thing!</p>\n<p>Git checksout a commit somewhere
    about halfway between the good and bad commit so you can see if your bug is there
    or not.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>git<span class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\">
    </span>5b31e1e\nBisecting:<span class=\"w\"> </span><span class=\"m\">3</span><span
    class=\"w\"> </span>revisions<span class=\"w\"> </span>left<span class=\"w\">
    </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\">
    </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">2</span><span class=\"w\"> </span>steps<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>bcb41c3854e343eade85353683f2c1c4ddde4e04<span
    class=\"o\">]</span><span class=\"w\"> </span>change<span class=\"w\"> </span>x<span
    class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">10</span>\n\nsandbox<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
    class=\"o\">(</span>bcb41c38<span class=\"o\">)</span><span class=\"w\"> </span><span
    class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span
    class=\"w\"> </span>\xD71<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
    class=\"w\">  </span>on<span class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span
    class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n\u276F\n</pre></div>\n\n</pre>\n\n<p>In
    my example here I have a python script with some loops and print statements -
    they aren't really relevant, I just wanted an easy to follow git history.</p>\n<p>So
    I check to see if the bug is present or not either by running/writing tests or
    replicating the bug somehow.</p>\n<p>In this session commit <code>bcb41c38</code>
    is actually just fine, so I do <code>git bisect good</code></p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>bcb41c38<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>good\nBisecting:<span class=\"w\"> </span><span class=\"m\">1</span><span
    class=\"w\"> </span>revision<span class=\"w\"> </span>left<span class=\"w\"> </span>to<span
    class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\"> </span>after<span
    class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\"> </span>step<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>4555c5979268dff6c475365fdc5ce1d4a12bd820<span
    class=\"o\">]</span><span class=\"w\"> </span>introduce<span class=\"w\"> </span>bug\n</pre></div>\n\n</pre>\n\n<p>And
    we see that git moves on to checkout another commit...</p>\n<p>In this case the
    next commit is the one where I introduced a bug</p>\n<p><code>git bisect bad</code>
    then gives me:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>4555c597<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>bad\nBisecting:<span class=\"w\"> </span><span class=\"m\">0</span><span
    class=\"w\"> </span>revisions<span class=\"w\"> </span>left<span class=\"w\">
    </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span class=\"w\">
    </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"o\">(</span>roughly<span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"w\"> </span>steps<span
    class=\"o\">)</span>\n<span class=\"o\">[</span>9cf6d55301560c51e2f55404d0d80b1f1e22a33d<span
    class=\"o\">]</span><span class=\"w\"> </span>add<span class=\"w\"> </span>successful<span
    class=\"w\"> </span>loop\n</pre></div>\n\n</pre>\n\n<p>At <code>4555c597</code>
    the script works as expected so one more <code>git bisect good</code> yields...</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>9cf6d553<span
    class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF21B<span class=\"w\"> </span>\xD71<span
    class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.8.11<span
    class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
    class=\"w\"> </span>\uE33D<span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
    class=\"o\">)</span>\n\u276F<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
    class=\"w\"> </span>good\n4555c5979268dff6c475365fdc5ce1d4a12bd820<span class=\"w\">
    </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>first<span class=\"w\">
    </span>bad<span class=\"w\"> </span>commit\ncommit<span class=\"w\"> </span>4555c5979268dff6c475365fdc5ce1d4a12bd820\nAuthor:<span
    class=\"w\"> </span><span class=\"c1\">########################### </span>\nDate:<span
    class=\"w\">   </span>Tue<span class=\"w\"> </span>May<span class=\"w\"> </span><span
    class=\"m\">3</span><span class=\"w\"> </span><span class=\"m\">09</span>:00:00<span
    class=\"w\"> </span><span class=\"m\">2022</span><span class=\"w\"> </span>-0500\n\n<span
    class=\"w\">    </span>introduce<span class=\"w\"> </span>bug\n\n<span class=\"w\">
    </span>example.py<span class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\">
    </span><span class=\"m\">2</span><span class=\"w\"> </span>+-\n<span class=\"w\">
    </span><span class=\"m\">1</span><span class=\"w\"> </span>file<span class=\"w\">
    </span>changed,<span class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\">
    </span>insertion<span class=\"o\">(</span>+<span class=\"o\">)</span>,<span class=\"w\">
    </span><span class=\"m\">1</span><span class=\"w\"> </span>deletion<span class=\"o\">(</span>-<span
    class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"what-happened\">What
    happened? <a class=\"header-anchor\" href=\"#what-happened\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Git sliced up a range
    of commits based on me saying of the next one was good or bad and localized the
    commit that introduced a bug into my workflow!</p>\n<p>I didn't have to manually
    review commits, click through logs, etc... I just let git checkout relevant commits
    and I ran whatever was appropriate for reproducing the bug to learn when it was
    comitted!</p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ntemplateKey: til\ntags: ['git', 'tech', 'til']\ntitle: Git-Bisect\ndate:
    2022-05-03T00:00:00\npublished: True\n#cover: \"media/git-bisect.png\"\n\n---\n\nI
    try to commit a lot, and I also try to write useful tests appropriate for the
    scope of work I'm focusing on, but sometimes I drop the ball...\n\nWhether by
    laziness, ignorance, or accepted tech debt I don't always code perfectly and recently
    I was dozens of commits into a new feature before realizing I broke something
    along the way that none of my tests caught...\n\nBefore today I would've manually
    reviewed every commit to see if something obvious slipped by me (talk about a
    time suck \U0001F629)\n\n__There must be a better way__\n\n# Bisect?\n\n`git bisect`
    is the magic sauce for this exact problem...\n\nYou essentially create a range
    of commits to consider and let `git bisect` guide you through them in a manner
    akin to Newton's method for finding the root of a continuous function.\n\n# How
    to do it?\n\nStart with `git bisect start` and then choose the first `good` commit
    (ie. a commit you know the bug isn't present in)\n\n```bash\n\nsandbox  \uE725
    bisect-post  \uF21B \xD71 via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F
    git bisect start\n\nsandbox  \uE725 bisect-post (BISECTING)  \uF21B \xD71 via
    \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F git bisect good 655332b\nbisect-post
    \ HEAD         main         ORIG_HEAD\n5b31e1e  -- [HEAD]    add successful print
    (52 seconds ago)\n308247b  -- [HEAD^]   init another loop (77 seconds ago)\n4555c59
    \ -- [HEAD^^]  introduce bug (2 minutes ago)\n9cf6d55  -- [HEAD~3]  add successful
    loop (3 minutes ago)\nbcb41c3  -- [HEAD~4]  change x to 10 (4 minutes ago)\n3c34aac
    \ -- [HEAD~5]  init x to 1 (4 minutes ago)\n12e53bd  -- [HEAD~6]  print cwd (4
    minutes ago)\n655332b  -- [HEAD~7]  add example.py (10 minutes ago)  # <- I want
    to start at this commit\n59e0048  -- [HEAD~8]  gitignore (23 hours ago)\nfb9e1fb
    \ -- [HEAD~9]  add reqs (23 hours ago)\n\n```\n\n```bash\n\nsandbox  \uE725 bisect-post
    (BISECTING)  \uF21B \xD71 via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F
    git bisect bad 5b31e1e\nbisect-post                                                ORIG_HEAD\nHEAD
    \                                                      refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57\nmain\n5b31e1e
    \ -- [HEAD]    add successful print (5 minutes ago)  # <- I start here with the
    \"bad\" commit\n308247b  -- [HEAD^]   init another loop (6 minutes ago)\n4555c59
    \ -- [HEAD^^]  introduce bug (6 minutes ago)\n9cf6d55  -- [HEAD~3]  add successful
    loop (7 minutes ago)\nbcb41c3  -- [HEAD~4]  change x to 10 (8 minutes ago)\n3c34aac
    \ -- [HEAD~5]  init x to 1 (9 minutes ago)\n12e53bd  -- [HEAD~6]  print cwd (9
    minutes ago)\n655332b  -- [HEAD~7]  add example.py (14 minutes ago)\n59e0048  --
    [HEAD~8]  gitignore (23 hours ago)\nfb9e1fb  -- [HEAD~9]  add reqs (23 hours ago)\n\n```\n\nAfter
    starting bisect with a \"good\" start commit and a \"bad\" ending commit we can
    let git to it's thing!\n\nGit checksout a commit somewhere about halfway between
    the good and bad commit so you can see if your bug is there or not.\n\n```bash\n\nsandbox
    \ \uE725 bisect-post (BISECTING)  \uF21B \xD71 via \uE235  v3.8.11(sandbox)  on
    \uE33D (us-east-1)\n\u276F git bisect bad 5b31e1e\nBisecting: 3 revisions left
    to test after this (roughly 2 steps)\n[bcb41c3854e343eade85353683f2c1c4ddde4e04]
    change x to 10\n\nsandbox  \uE725 HEAD (bcb41c38) (BISECTING)  \uF21B \xD71 via
    \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F\n```\n\nIn my example
    here I have a python script with some loops and print statements - they aren't
    really relevant, I just wanted an easy to follow git history.\n\nSo I check to
    see if the bug is present or not either by running/writing tests or replicating
    the bug somehow.\n\nIn this session commit `bcb41c38` is actually just fine, so
    I do `git bisect good`\n\n```bash\n\nsandbox  \uE725 HEAD (bcb41c38) (BISECTING)
    \ \uF21B \xD71 via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F git
    bisect good\nBisecting: 1 revision left to test after this (roughly 1 step)\n[4555c5979268dff6c475365fdc5ce1d4a12bd820]
    introduce bug\n\n```\n\nAnd we see that git moves on to checkout another commit...\n\nIn
    this case the next commit is the one where I introduced a bug\n\n`git bisect bad`
    then gives me:\n\n```bash\n\nsandbox  \uE725 HEAD (4555c597) (BISECTING)  \uF21B
    \xD71 via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F git bisect bad\nBisecting:
    0 revisions left to test after this (roughly 0 steps)\n[9cf6d55301560c51e2f55404d0d80b1f1e22a33d]
    add successful loop\n```\n\nAt `4555c597` the script works as expected so one
    more `git bisect good` yields...\n\n```bash\nsandbox  \uE725 HEAD (9cf6d553) (BISECTING)
    \ \uF21B \xD71 via \uE235  v3.8.11(sandbox)  on \uE33D (us-east-1)\n\u276F git
    bisect good\n4555c5979268dff6c475365fdc5ce1d4a12bd820 is the first bad commit\ncommit
    4555c5979268dff6c475365fdc5ce1d4a12bd820\nAuthor: ###########################
    \nDate:   Tue May 3 09:00:00 2022 -0500\n\n    introduce bug\n\n example.py |
    2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)\n\n\n```\n\n# What happened?\n\nGit
    sliced up a range of commits based on me saying of the next one was good or bad
    and localized the commit that introduced a bug into my workflow!\n\nI didn't have
    to manually review commits, click through logs, etc... I just let git checkout
    relevant commits and I ran whatever was appropriate for reproducing the bug to
    learn when it was comitted!\n"
published: true
slug: git-bisect
title: Git-Bisect


---

I try to commit a lot, and I also try to write useful tests appropriate for the scope of work I'm focusing on, but sometimes I drop the ball...

Whether by laziness, ignorance, or accepted tech debt I don't always code perfectly and recently I was dozens of commits into a new feature before realizing I broke something along the way that none of my tests caught...

Before today I would've manually reviewed every commit to see if something obvious slipped by me (talk about a time suck 😩)

__There must be a better way__

# Bisect?

`git bisect` is the magic sauce for this exact problem...

You essentially create a range of commits to consider and let `git bisect` guide you through them in a manner akin to Newton's method for finding the root of a continuous function.

# How to do it?

Start with `git bisect start` and then choose the first `good` commit (ie. a commit you know the bug isn't present in)

```bash

sandbox   bisect-post   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect start

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good 655332b
bisect-post  HEAD         main         ORIG_HEAD
5b31e1e  -- [HEAD]    add successful print (52 seconds ago)
308247b  -- [HEAD^]   init another loop (77 seconds ago)
4555c59  -- [HEAD^^]  introduce bug (2 minutes ago)
9cf6d55  -- [HEAD~3]  add successful loop (3 minutes ago)
bcb41c3  -- [HEAD~4]  change x to 10 (4 minutes ago)
3c34aac  -- [HEAD~5]  init x to 1 (4 minutes ago)
12e53bd  -- [HEAD~6]  print cwd (4 minutes ago)
655332b  -- [HEAD~7]  add example.py (10 minutes ago)  # <- I want to start at this commit
59e0048  -- [HEAD~8]  gitignore (23 hours ago)
fb9e1fb  -- [HEAD~9]  add reqs (23 hours ago)

```

```bash

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad 5b31e1e
bisect-post                                                ORIG_HEAD
HEAD                                                       refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57
main
5b31e1e  -- [HEAD]    add successful print (5 minutes ago)  # <- I start here with the "bad" commit
308247b  -- [HEAD^]   init another loop (6 minutes ago)
4555c59  -- [HEAD^^]  introduce bug (6 minutes ago)
9cf6d55  -- [HEAD~3]  add successful loop (7 minutes ago)
bcb41c3  -- [HEAD~4]  change x to 10 (8 minutes ago)
3c34aac  -- [HEAD~5]  init x to 1 (9 minutes ago)
12e53bd  -- [HEAD~6]  print cwd (9 minutes ago)
655332b  -- [HEAD~7]  add example.py (14 minutes ago)
59e0048  -- [HEAD~8]  gitignore (23 hours ago)
fb9e1fb  -- [HEAD~9]  add reqs (23 hours ago)

```

After starting bisect with a "good" start commit and a "bad" ending commit we can let git to it's thing!

Git checksout a commit somewhere about halfway between the good and bad commit so you can see if your bug is there or not.

```bash

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad 5b31e1e
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[bcb41c3854e343eade85353683f2c1c4ddde4e04] change x to 10

sandbox   HEAD (bcb41c38) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯
```

In my example here I have a python script with some loops and print statements - they aren't really relevant, I just wanted an easy to follow git history.

So I check to see if the bug is present or not either by running/writing tests or replicating the bug somehow.

In this session commit `bcb41c38` is actually just fine, so I do `git bisect good`

```bash

sandbox   HEAD (bcb41c38) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good
Bisecting: 1 revision left to test after this (roughly 1 step)
[4555c5979268dff6c475365fdc5ce1d4a12bd820] introduce bug

```

And we see that git moves on to checkout another commit...

In this case the next commit is the one where I introduced a bug

`git bisect bad` then gives me:

```bash

sandbox   HEAD (4555c597) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[9cf6d55301560c51e2f55404d0d80b1f1e22a33d] add successful loop
```

At `4555c597` the script works as expected so one more `git bisect good` yields...

```bash
sandbox   HEAD (9cf6d553) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good
4555c5979268dff6c475365fdc5ce1d4a12bd820 is the first bad commit
commit 4555c5979268dff6c475365fdc5ce1d4a12bd820
Author: ########################### 
Date:   Tue May 3 09:00:00 2022 -0500

    introduce bug

 example.py | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)


```

# What happened?

Git sliced up a range of commits based on me saying of the next one was good or bad and localized the commit that introduced a bug into my workflow!

I didn't have to manually review commits, click through logs, etc... I just let git checkout relevant commits and I ran whatever was appropriate for reproducing the bug to learn when it was comitted!