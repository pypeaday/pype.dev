---
content: "## Git \n\nHopefully if you write code you are using git, if not go learn
  the basics of `commit`, `pull`, `push`, and `pull request`/`merge request` like...
  right now.\n\nAssuming you are at least familiar with git then you probably work
  the same way I have since I've been using it.\n\n1. clone or initialize a repo\n2.
  checkout a branch, `git checkout -b my-feature`\n3. work on `my-feature` and when
  ready open a PR into `main`\n4. `git pull main` then `git checkout -b another-feature`\n5.
  etc...\n\n\nWhat if you need to switch between branches for some reason? Often I'm
  jumping into projects with my co-workers left and right, and I'll have changes that
  I'm either working on or exploring for them.\nWhen it's time to switch branches
  I think there's more elegant ways than this but I've always done this:\n\n1. `stash`
  the current changes\n2. checkout out the relevant branch \n3. helped out \n4. re-checkout
  my original branch\n5. `pop` the `stash`\n\nNow, that's not awful but I think `worktrees`
  will make this nicer for a few reasons!\n\n## Worktrees\n\nWorktrees are linked
  branches that have their own directories somewhere on your computer.\nTo checkout
  a branch you don't have to worry about stashing any changes, you just `cd` into
  the directory of that branch.\n\n> The branch can be literally anywhere - it doesn't
  have to be in the repo folder\n\n\n## Use Case\n\nI've seen ThePrimeagean argue
  for worktrees for several reasons, see a YT video [here](https://www.youtube.com/watch?v=2uEqYw-N8uE)\n\nI'm
  entirely in Python at the moment, or working with projects that dont' have that
  kind of requirement (ie. this website).\nMy reason for wanting worktrees is 3 fold.\n\n###
  Files that could have been gitignored but ain't\n\nI have a `.envrc` I put in every
  project, but it's not gitignored for reasons that aren't relevant right now...\nIf
  I switch branches I'll stash everything I have at the time, including my .envrc,
  but then if I forget to pop the stash and I move on and come back then my environment
  isn't active and I have to go find the stash, pop it, cd out, and then back in and
  honestly.... that sucks.\nWorktrees will let me have the .envrc in every branch,
  and if I checkout or switch to a new one, my personal branch is unaffected.\n\n\n###
  Symlinks\n\nIn my team's [Kedro](https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html)
  workflow we keep a specific directory, the `conf` directory at a different spot
  than the Kedro team has in their templates (the why is outside the scope here).\nThe
  way I preserve every kedro utility for my own benefit is to symlink our `conf` to
  where the Kedro template expects it to be. \nBut then everytime I stash changes
  I lose that symlink so I either just don't have it for the time being or I recreate
  it which is a hassle\nWorktrees will let me have that present and persistent on
  all my branches at once.\n\n### Foo\n\nBecause why not!? This workflow feels future-proof,
  and if my toolset changes down the line then having this worktree centric workflow
  might be helpful and I'm just prepping for that possibility!"
date: 2022-03-11
description: Git Hopefully if you write code you are using git, if not go learn the
  basics of `commit`, `pull`, `push`, and `pull request`/`merge request` like... right
  now.
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Git-Worktrees-01</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Git Hopefully if you write code you are
    using git, if not go learn the basics of `commit`, `pull`, `push`, and `pull request`/`merge
    request` like... right now.\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Git-Worktrees-01 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/git-worktrees-01\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Git-Worktrees-01 | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Git Hopefully if you write code you are using git, if not go learn the
    basics of `commit`, `pull`, `push`, and `pull request`/`merge request` like...
    right now.\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/git-worktrees-01</span>\n        </div>\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Git-Worktrees-01</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-11\">\n            March
    11, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/git/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #git\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"git\">Git <a class=\"header-anchor\"
    href=\"#git\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Hopefully if you write
    code you are using git, if not go learn the basics of <code>commit</code>, <code>pull</code>,
    <code>push</code>, and <code>pull request</code>/<code>merge request</code> like...
    right now.</p>\n<p>Assuming you are at least familiar with git then you probably
    work the same way I have since I've been using it.</p>\n<ol>\n<li>clone or initialize
    a repo</li>\n<li>checkout a branch, <code>git checkout -b my-feature</code></li>\n<li>work
    on <code>my-feature</code> and when ready open a PR into <code>main</code></li>\n<li><code>git
    pull main</code> then <code>git checkout -b another-feature</code></li>\n<li>etc...</li>\n</ol>\n<p>What
    if you need to switch between branches for some reason? Often I'm jumping into
    projects with my co-workers left and right, and I'll have changes that I'm either
    working on or exploring for them.\nWhen it's time to switch branches I think there's
    more elegant ways than this but I've always done this:</p>\n<ol>\n<li><code>stash</code>
    the current changes</li>\n<li>checkout out the relevant branch</li>\n<li>helped
    out</li>\n<li>re-checkout my original branch</li>\n<li><code>pop</code> the <code>stash</code></li>\n</ol>\n<p>Now,
    that's not awful but I think <code>worktrees</code> will make this nicer for a
    few reasons!</p>\n<h2 id=\"worktrees\">Worktrees <a class=\"header-anchor\" href=\"#worktrees\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Worktrees are linked
    branches that have their own directories somewhere on your computer.\nTo checkout
    a branch you don't have to worry about stashing any changes, you just <code>cd</code>
    into the directory of that branch.</p>\n<blockquote>\n<p>The branch can be literally
    anywhere - it doesn't have to be in the repo folder</p>\n</blockquote>\n<h2 id=\"use-case\">Use
    Case <a class=\"header-anchor\" href=\"#use-case\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I've seen ThePrimeagean
    argue for worktrees for several reasons, see a YT video <a href=\"https://www.youtube.com/watch?v=2uEqYw-N8uE\">here</a></p>\n<p>I'm
    entirely in Python at the moment, or working with projects that dont' have that
    kind of requirement (ie. this website).\nMy reason for wanting worktrees is 3
    fold.</p>\n<h3>Files that could have been gitignored but ain't</h3>\n<p>I have
    a <code>.envrc</code> I put in every project, but it's not gitignored for reasons
    that aren't relevant right now...\nIf I switch branches I'll stash everything
    I have at the time, including my .envrc, but then if I forget to pop the stash
    and I move on and come back then my environment isn't active and I have to go
    find the stash, pop it, cd out, and then back in and honestly.... that sucks.\nWorktrees
    will let me have the .envrc in every branch, and if I checkout or switch to a
    new one, my personal branch is unaffected.</p>\n<h3>Symlinks</h3>\n<p>In my team's
    <a href=\"https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html\">Kedro</a>
    workflow we keep a specific directory, the <code>conf</code> directory at a different
    spot than the Kedro team has in their templates (the why is outside the scope
    here).\nThe way I preserve every kedro utility for my own benefit is to symlink
    our <code>conf</code> to where the Kedro template expects it to be.\nBut then
    everytime I stash changes I lose that symlink so I either just don't have it for
    the time being or I recreate it which is a hassle\nWorktrees will let me have
    that present and persistent on all my branches at once.</p>\n<h3>Foo</h3>\n<p>Because
    why not!? This workflow feels future-proof, and if my toolset changes down the
    line then having this worktree centric workflow might be helpful and I'm just
    prepping for that possibility!</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Git-Worktrees-01</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Git Hopefully if you write code you are
    using git, if not go learn the basics of `commit`, `pull`, `push`, and `pull request`/`merge
    request` like... right now.\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Git-Worktrees-01 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/git-worktrees-01\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Git-Worktrees-01 | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Git Hopefully if you write code you are using git, if not go learn the
    basics of `commit`, `pull`, `push`, and `pull request`/`merge request` like...
    right now.\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Git-Worktrees-01</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-11\">\n            March
    11, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/git/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #git\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Git-Worktrees-01</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-11\">\n            March
    11, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/git/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #git\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"git\">Git <a class=\"header-anchor\"
    href=\"#git\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Hopefully if you write
    code you are using git, if not go learn the basics of <code>commit</code>, <code>pull</code>,
    <code>push</code>, and <code>pull request</code>/<code>merge request</code> like...
    right now.</p>\n<p>Assuming you are at least familiar with git then you probably
    work the same way I have since I've been using it.</p>\n<ol>\n<li>clone or initialize
    a repo</li>\n<li>checkout a branch, <code>git checkout -b my-feature</code></li>\n<li>work
    on <code>my-feature</code> and when ready open a PR into <code>main</code></li>\n<li><code>git
    pull main</code> then <code>git checkout -b another-feature</code></li>\n<li>etc...</li>\n</ol>\n<p>What
    if you need to switch between branches for some reason? Often I'm jumping into
    projects with my co-workers left and right, and I'll have changes that I'm either
    working on or exploring for them.\nWhen it's time to switch branches I think there's
    more elegant ways than this but I've always done this:</p>\n<ol>\n<li><code>stash</code>
    the current changes</li>\n<li>checkout out the relevant branch</li>\n<li>helped
    out</li>\n<li>re-checkout my original branch</li>\n<li><code>pop</code> the <code>stash</code></li>\n</ol>\n<p>Now,
    that's not awful but I think <code>worktrees</code> will make this nicer for a
    few reasons!</p>\n<h2 id=\"worktrees\">Worktrees <a class=\"header-anchor\" href=\"#worktrees\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Worktrees are linked
    branches that have their own directories somewhere on your computer.\nTo checkout
    a branch you don't have to worry about stashing any changes, you just <code>cd</code>
    into the directory of that branch.</p>\n<blockquote>\n<p>The branch can be literally
    anywhere - it doesn't have to be in the repo folder</p>\n</blockquote>\n<h2 id=\"use-case\">Use
    Case <a class=\"header-anchor\" href=\"#use-case\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I've seen ThePrimeagean
    argue for worktrees for several reasons, see a YT video <a href=\"https://www.youtube.com/watch?v=2uEqYw-N8uE\">here</a></p>\n<p>I'm
    entirely in Python at the moment, or working with projects that dont' have that
    kind of requirement (ie. this website).\nMy reason for wanting worktrees is 3
    fold.</p>\n<h3>Files that could have been gitignored but ain't</h3>\n<p>I have
    a <code>.envrc</code> I put in every project, but it's not gitignored for reasons
    that aren't relevant right now...\nIf I switch branches I'll stash everything
    I have at the time, including my .envrc, but then if I forget to pop the stash
    and I move on and come back then my environment isn't active and I have to go
    find the stash, pop it, cd out, and then back in and honestly.... that sucks.\nWorktrees
    will let me have the .envrc in every branch, and if I checkout or switch to a
    new one, my personal branch is unaffected.</p>\n<h3>Symlinks</h3>\n<p>In my team's
    <a href=\"https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html\">Kedro</a>
    workflow we keep a specific directory, the <code>conf</code> directory at a different
    spot than the Kedro team has in their templates (the why is outside the scope
    here).\nThe way I preserve every kedro utility for my own benefit is to symlink
    our <code>conf</code> to where the Kedro template expects it to be.\nBut then
    everytime I stash changes I lose that symlink so I either just don't have it for
    the time being or I recreate it which is a hassle\nWorktrees will let me have
    that present and persistent on all my branches at once.</p>\n<h3>Foo</h3>\n<p>Because
    why not!? This workflow feels future-proof, and if my toolset changes down the
    line then having this worktree centric workflow might be helpful and I'm just
    prepping for that possibility!</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Git-Worktrees-01</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Git Hopefully if you write code you are
    using git, if not go learn the basics of `commit`, `pull`, `push`, and `pull request`/`merge
    request` like... right now.\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Git-Worktrees-01 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/git-worktrees-01\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Git-Worktrees-01 | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Git Hopefully if you write code you are using git, if not go learn the
    basics of `commit`, `pull`, `push`, and `pull request`/`merge request` like...
    right now.\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/git-worktrees-01</span>\n        </div>\n
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
    Content is handled by the password protection plugin -->\n    <h2 id=\"git\">Git
    <a class=\"header-anchor\" href=\"#git\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Hopefully if you write
    code you are using git, if not go learn the basics of <code>commit</code>, <code>pull</code>,
    <code>push</code>, and <code>pull request</code>/<code>merge request</code> like...
    right now.</p>\n<p>Assuming you are at least familiar with git then you probably
    work the same way I have since I've been using it.</p>\n<ol>\n<li>clone or initialize
    a repo</li>\n<li>checkout a branch, <code>git checkout -b my-feature</code></li>\n<li>work
    on <code>my-feature</code> and when ready open a PR into <code>main</code></li>\n<li><code>git
    pull main</code> then <code>git checkout -b another-feature</code></li>\n<li>etc...</li>\n</ol>\n<p>What
    if you need to switch between branches for some reason? Often I'm jumping into
    projects with my co-workers left and right, and I'll have changes that I'm either
    working on or exploring for them.\nWhen it's time to switch branches I think there's
    more elegant ways than this but I've always done this:</p>\n<ol>\n<li><code>stash</code>
    the current changes</li>\n<li>checkout out the relevant branch</li>\n<li>helped
    out</li>\n<li>re-checkout my original branch</li>\n<li><code>pop</code> the <code>stash</code></li>\n</ol>\n<p>Now,
    that's not awful but I think <code>worktrees</code> will make this nicer for a
    few reasons!</p>\n<h2 id=\"worktrees\">Worktrees <a class=\"header-anchor\" href=\"#worktrees\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Worktrees are linked
    branches that have their own directories somewhere on your computer.\nTo checkout
    a branch you don't have to worry about stashing any changes, you just <code>cd</code>
    into the directory of that branch.</p>\n<blockquote>\n<p>The branch can be literally
    anywhere - it doesn't have to be in the repo folder</p>\n</blockquote>\n<h2 id=\"use-case\">Use
    Case <a class=\"header-anchor\" href=\"#use-case\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I've seen ThePrimeagean
    argue for worktrees for several reasons, see a YT video <a href=\"https://www.youtube.com/watch?v=2uEqYw-N8uE\">here</a></p>\n<p>I'm
    entirely in Python at the moment, or working with projects that dont' have that
    kind of requirement (ie. this website).\nMy reason for wanting worktrees is 3
    fold.</p>\n<h3>Files that could have been gitignored but ain't</h3>\n<p>I have
    a <code>.envrc</code> I put in every project, but it's not gitignored for reasons
    that aren't relevant right now...\nIf I switch branches I'll stash everything
    I have at the time, including my .envrc, but then if I forget to pop the stash
    and I move on and come back then my environment isn't active and I have to go
    find the stash, pop it, cd out, and then back in and honestly.... that sucks.\nWorktrees
    will let me have the .envrc in every branch, and if I checkout or switch to a
    new one, my personal branch is unaffected.</p>\n<h3>Symlinks</h3>\n<p>In my team's
    <a href=\"https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html\">Kedro</a>
    workflow we keep a specific directory, the <code>conf</code> directory at a different
    spot than the Kedro team has in their templates (the why is outside the scope
    here).\nThe way I preserve every kedro utility for my own benefit is to symlink
    our <code>conf</code> to where the Kedro template expects it to be.\nBut then
    everytime I stash changes I lose that symlink so I either just don't have it for
    the time being or I recreate it which is a hassle\nWorktrees will let me have
    that present and persistent on all my branches at once.</p>\n<h3>Foo</h3>\n<p>Because
    why not!? This workflow feels future-proof, and if my toolset changes down the
    line then having this worktree centric workflow might be helpful and I'm just
    prepping for that possibility!</p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['git', 'tech']\ntitle: Git-Worktrees-01\ndate:
    2022-03-11T00:00:00\npublished: False\n#cover: \"media/git-worktrees-01.png\"\n\n---\n\n##
    Git \n\nHopefully if you write code you are using git, if not go learn the basics
    of `commit`, `pull`, `push`, and `pull request`/`merge request` like... right
    now.\n\nAssuming you are at least familiar with git then you probably work the
    same way I have since I've been using it.\n\n1. clone or initialize a repo\n2.
    checkout a branch, `git checkout -b my-feature`\n3. work on `my-feature` and when
    ready open a PR into `main`\n4. `git pull main` then `git checkout -b another-feature`\n5.
    etc...\n\n\nWhat if you need to switch between branches for some reason? Often
    I'm jumping into projects with my co-workers left and right, and I'll have changes
    that I'm either working on or exploring for them.\nWhen it's time to switch branches
    I think there's more elegant ways than this but I've always done this:\n\n1. `stash`
    the current changes\n2. checkout out the relevant branch \n3. helped out \n4.
    re-checkout my original branch\n5. `pop` the `stash`\n\nNow, that's not awful
    but I think `worktrees` will make this nicer for a few reasons!\n\n## Worktrees\n\nWorktrees
    are linked branches that have their own directories somewhere on your computer.\nTo
    checkout a branch you don't have to worry about stashing any changes, you just
    `cd` into the directory of that branch.\n\n> The branch can be literally anywhere
    - it doesn't have to be in the repo folder\n\n\n## Use Case\n\nI've seen ThePrimeagean
    argue for worktrees for several reasons, see a YT video [here](https://www.youtube.com/watch?v=2uEqYw-N8uE)\n\nI'm
    entirely in Python at the moment, or working with projects that dont' have that
    kind of requirement (ie. this website).\nMy reason for wanting worktrees is 3
    fold.\n\n### Files that could have been gitignored but ain't\n\nI have a `.envrc`
    I put in every project, but it's not gitignored for reasons that aren't relevant
    right now...\nIf I switch branches I'll stash everything I have at the time, including
    my .envrc, but then if I forget to pop the stash and I move on and come back then
    my environment isn't active and I have to go find the stash, pop it, cd out, and
    then back in and honestly.... that sucks.\nWorktrees will let me have the .envrc
    in every branch, and if I checkout or switch to a new one, my personal branch
    is unaffected.\n\n\n### Symlinks\n\nIn my team's [Kedro](https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html)
    workflow we keep a specific directory, the `conf` directory at a different spot
    than the Kedro team has in their templates (the why is outside the scope here).\nThe
    way I preserve every kedro utility for my own benefit is to symlink our `conf`
    to where the Kedro template expects it to be. \nBut then everytime I stash changes
    I lose that symlink so I either just don't have it for the time being or I recreate
    it which is a hassle\nWorktrees will let me have that present and persistent on
    all my branches at once.\n\n### Foo\n\nBecause why not!? This workflow feels future-proof,
    and if my toolset changes down the line then having this worktree centric workflow
    might be helpful and I'm just prepping for that possibility!\n"
published: false
slug: git-worktrees-01
title: Git-Worktrees-01


---

## Git 

Hopefully if you write code you are using git, if not go learn the basics of `commit`, `pull`, `push`, and `pull request`/`merge request` like... right now.

Assuming you are at least familiar with git then you probably work the same way I have since I've been using it.

1. clone or initialize a repo
2. checkout a branch, `git checkout -b my-feature`
3. work on `my-feature` and when ready open a PR into `main`
4. `git pull main` then `git checkout -b another-feature`
5. etc...


What if you need to switch between branches for some reason? Often I'm jumping into projects with my co-workers left and right, and I'll have changes that I'm either working on or exploring for them.
When it's time to switch branches I think there's more elegant ways than this but I've always done this:

1. `stash` the current changes
2. checkout out the relevant branch 
3. helped out 
4. re-checkout my original branch
5. `pop` the `stash`

Now, that's not awful but I think `worktrees` will make this nicer for a few reasons!

## Worktrees

Worktrees are linked branches that have their own directories somewhere on your computer.
To checkout a branch you don't have to worry about stashing any changes, you just `cd` into the directory of that branch.

> The branch can be literally anywhere - it doesn't have to be in the repo folder


## Use Case

I've seen ThePrimeagean argue for worktrees for several reasons, see a YT video [here](https://www.youtube.com/watch?v=2uEqYw-N8uE)

I'm entirely in Python at the moment, or working with projects that dont' have that kind of requirement (ie. this website).
My reason for wanting worktrees is 3 fold.

### Files that could have been gitignored but ain't

I have a `.envrc` I put in every project, but it's not gitignored for reasons that aren't relevant right now...
If I switch branches I'll stash everything I have at the time, including my .envrc, but then if I forget to pop the stash and I move on and come back then my environment isn't active and I have to go find the stash, pop it, cd out, and then back in and honestly.... that sucks.
Worktrees will let me have the .envrc in every branch, and if I checkout or switch to a new one, my personal branch is unaffected.


### Symlinks

In my team's [Kedro](https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html) workflow we keep a specific directory, the `conf` directory at a different spot than the Kedro team has in their templates (the why is outside the scope here).
The way I preserve every kedro utility for my own benefit is to symlink our `conf` to where the Kedro template expects it to be. 
But then everytime I stash changes I lose that symlink so I either just don't have it for the time being or I recreate it which is a hassle
Worktrees will let me have that present and persistent on all my branches at once.

### Foo

Because why not!? This workflow feels future-proof, and if my toolset changes down the line then having this worktree centric workflow might be helpful and I'm just prepping for that possibility!