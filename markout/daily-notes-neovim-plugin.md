---
content: "# What?\n\nWindsurf helped me whip up a neovim plugin for my daily notes
  workflows. It has\na few features that make my note taking workflow day-to-day a
  tiny bit more\nfluid\n\n!!! note \"credit due\"\n\n    Honestly my zettlekasten
  and this daily notes stuff is only possible with the help of [Waylon Walker](https://waylonwalker.com)\n\n##
  Context\n\nI learned about the concept of a [zettlekasten]() recently and it really
  spoke\nto me. I've sought for YEARS to have a nice note-taking workflow, where I
  never\nthink about _where_ to put something, it's searchable, portable to some degree,\nand
  customizable... I've used OneNote and its derivatives, different\nself-hosted container
  based note taking apps, raw markdown files scattered on\nmy file system, etc...
  I think I've finally landed on a solution which is\nbasically this blog + some tooling
  to achieve the things I want...\n\n- [markata](https://markata.dev) is the build
  system, it's what lets me keep all my notes in markdown files, and build them into
  a cohesive searchable experience on the web\n- [neovim](https://neovim.io) is my
  primary note taking environment - using tools like `marksman` I get the ability
  to \"jump\" to wiki-linked posts and grep content easily for searching\n- [copier](https://copier.readthedocs.io)
  is used for generating note templates - whether it's a `til`, blog post, or starting
  my daily note page - copier makes it quick to stub out the file in the right place
  with the right tags and frontmatter for markata\n\n## Usage\n\nI'll explain the
  daily notes workflow here, the code is below...\n\nThere's basically just a couple
  things I wanted smoothed out in my note-taking as I am getting started here...\n\n1.
  I need an immediate way to get to my daily notes page... I have started keeping
  a new note for each day and it's a chore to copy paste the old note, update the
  date, delete content, etc... instead `check_and_open_daily_note` checks the directory
  I keep my daily notes in `pages/daily` in my blog repo, checks the date for a note
  for today and either creates it from the copier template or opened it as my current
  buffer\n\n> I could maybe improve this by making it global so that no matter what
  directory I'm in I could open the daily note with a keymap or lua function call
  instead of swapping tmux sessions and then opening the file\n\n2. I need a way to
  link to _yesterday_'s notes so it's easy to \"go to definition\" on the wiki link
  which opens the file...\n3. I wanted to track page linking... this is something
  core for me as I am building out my personal knowledge base, but I have key areas
  in my life where I want to see graphical links, or at least make it easy to trace
  thoughts I've had like clicking through wikipedia, so the `find_backlinks` function
  brings up a menu of all the pages that link to the one I'm in\n\nI'm sure I'll add
  more functions as time goes on - it'd be ncie to open certain slash pages like [[now]]
  with a keymap... drop me a note at `nic@pype.dev` if you've got any great ideas!\n\n##
  Code\n\nsee the [gist](https://gist.github.com/pypeaday/38192f6db4d77c7c3be2b9213e14db6c)"
date: 2025-07-17
description: 'What? Windsurf helped me whip up a neovim plugin for my daily notes
  workflows. It has

  a few features that make my note taking workflow day-to-day a tiny bit mor'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Daily Notes Neovim
    Plugin</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"What? Windsurf helped
    me whip up a neovim plugin for my daily notes workflows. It has\na few features
    that make my note taking workflow day-to-day a tiny bit mor\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Daily Notes Neovim Plugin | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/daily-notes-neovim-plugin\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Daily Notes Neovim Plugin | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"What? Windsurf helped me whip up a neovim plugin for my daily notes
    workflows. It has\na few features that make my note taking workflow day-to-day
    a tiny bit mor\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
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
    \           <span class=\"site-terminal__dir\">~/daily-notes-neovim-plugin</span>\n
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
    class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n        <div
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    alt=\"Daily Notes Neovim Plugin cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Daily
    Notes Neovim Plugin</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2025-07-17\">\n            July 17, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/neovim/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #neovim\n            </a>\n            <a href=\"https://pype.dev//tags/note/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #note\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <h1
    id=\"what\">What? <a class=\"header-anchor\" href=\"#what\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Windsurf helped me whip
    up a neovim plugin for my daily notes workflows. It has\na few features that make
    my note taking workflow day-to-day a tiny bit more\nfluid</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">credit due</p>\n<p>Honestly my zettlekasten
    and this daily notes stuff is only possible with the help of <a href=\"https://waylonwalker.com\">Waylon
    Walker</a></p>\n</div>\n<h2 id=\"context\">Context <a class=\"header-anchor\"
    href=\"#context\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I learned about the
    concept of a <a href=\"\">zettlekasten</a> recently and it really spoke\nto me.
    I've sought for YEARS to have a nice note-taking workflow, where I never\nthink
    about <em>where</em> to put something, it's searchable, portable to some degree,\nand
    customizable... I've used OneNote and its derivatives, different\nself-hosted
    container based note taking apps, raw markdown files scattered on\nmy file system,
    etc... I think I've finally landed on a solution which is\nbasically this blog
    + some tooling to achieve the things I want...</p>\n<ul>\n<li><a href=\"https://markata.dev\">markata</a>
    is the build system, it's what lets me keep all my notes in markdown files, and
    build them into a cohesive searchable experience on the web</li>\n<li><a href=\"https://neovim.io\">neovim</a>
    is my primary note taking environment - using tools like <code>marksman</code>
    I get the ability to &quot;jump&quot; to wiki-linked posts and grep content easily
    for searching</li>\n<li><a href=\"https://copier.readthedocs.io\">copier</a> is
    used for generating note templates - whether it's a <code>til</code>, blog post,
    or starting my daily note page - copier makes it quick to stub out the file in
    the right place with the right tags and frontmatter for markata</li>\n</ul>\n<h2
    id=\"usage\">Usage <a class=\"header-anchor\" href=\"#usage\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'll explain the daily
    notes workflow here, the code is below...</p>\n<p>There's basically just a couple
    things I wanted smoothed out in my note-taking as I am getting started here...</p>\n<ol>\n<li>I
    need an immediate way to get to my daily notes page... I have started keeping
    a new note for each day and it's a chore to copy paste the old note, update the
    date, delete content, etc... instead <code>check_and_open_daily_note</code> checks
    the directory I keep my daily notes in <code>pages/daily</code> in my blog repo,
    checks the date for a note for today and either creates it from the copier template
    or opened it as my current buffer</li>\n</ol>\n<blockquote>\n<p>I could maybe
    improve this by making it global so that no matter what directory I'm in I could
    open the daily note with a keymap or lua function call instead of swapping tmux
    sessions and then opening the file</p>\n</blockquote>\n<ol start=\"2\">\n<li>I
    need a way to link to <em>yesterday</em>'s notes so it's easy to &quot;go to definition&quot;
    on the wiki link which opens the file...</li>\n<li>I wanted to track page linking...
    this is something core for me as I am building out my personal knowledge base,
    but I have key areas in my life where I want to see graphical links, or at least
    make it easy to trace thoughts I've had like clicking through wikipedia, so the
    <code>find_backlinks</code> function brings up a menu of all the pages that link
    to the one I'm in</li>\n</ol>\n<p>I'm sure I'll add more functions as time goes
    on - it'd be ncie to open certain slash pages like <a class=\"wikilink\" href=\"/now\">now</a>
    with a keymap... drop me a note at <code>nic@pype.dev</code> if you've got any
    great ideas!</p>\n<h2 id=\"code\">Code <a class=\"header-anchor\" href=\"#code\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>see the <a href=\"https://gist.github.com/pypeaday/38192f6db4d77c7c3be2b9213e14db6c\">gist</a></p>\n\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Daily Notes Neovim
    Plugin</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"What? Windsurf helped
    me whip up a neovim plugin for my daily notes workflows. It has\na few features
    that make my note taking workflow day-to-day a tiny bit mor\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Daily Notes Neovim Plugin | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/daily-notes-neovim-plugin\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Daily Notes Neovim Plugin | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"What? Windsurf helped me whip up a neovim plugin for my daily notes
    workflows. It has\na few features that make my note taking workflow day-to-day
    a tiny bit mor\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
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
    mb-4 post-title-large\">Daily Notes Neovim Plugin</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-17\">\n
    \           July 17, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/neovim/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #neovim\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    alt=\"Daily Notes Neovim Plugin cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Daily
    Notes Neovim Plugin</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2025-07-17\">\n            July 17, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/neovim/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #neovim\n            </a>\n            <a href=\"https://pype.dev//tags/note/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #note\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <h1
    id=\"what\">What? <a class=\"header-anchor\" href=\"#what\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Windsurf helped me whip
    up a neovim plugin for my daily notes workflows. It has\na few features that make
    my note taking workflow day-to-day a tiny bit more\nfluid</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">credit due</p>\n<p>Honestly my zettlekasten
    and this daily notes stuff is only possible with the help of <a href=\"https://waylonwalker.com\">Waylon
    Walker</a></p>\n</div>\n<h2 id=\"context\">Context <a class=\"header-anchor\"
    href=\"#context\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I learned about the
    concept of a <a href=\"\">zettlekasten</a> recently and it really spoke\nto me.
    I've sought for YEARS to have a nice note-taking workflow, where I never\nthink
    about <em>where</em> to put something, it's searchable, portable to some degree,\nand
    customizable... I've used OneNote and its derivatives, different\nself-hosted
    container based note taking apps, raw markdown files scattered on\nmy file system,
    etc... I think I've finally landed on a solution which is\nbasically this blog
    + some tooling to achieve the things I want...</p>\n<ul>\n<li><a href=\"https://markata.dev\">markata</a>
    is the build system, it's what lets me keep all my notes in markdown files, and
    build them into a cohesive searchable experience on the web</li>\n<li><a href=\"https://neovim.io\">neovim</a>
    is my primary note taking environment - using tools like <code>marksman</code>
    I get the ability to &quot;jump&quot; to wiki-linked posts and grep content easily
    for searching</li>\n<li><a href=\"https://copier.readthedocs.io\">copier</a> is
    used for generating note templates - whether it's a <code>til</code>, blog post,
    or starting my daily note page - copier makes it quick to stub out the file in
    the right place with the right tags and frontmatter for markata</li>\n</ul>\n<h2
    id=\"usage\">Usage <a class=\"header-anchor\" href=\"#usage\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'll explain the daily
    notes workflow here, the code is below...</p>\n<p>There's basically just a couple
    things I wanted smoothed out in my note-taking as I am getting started here...</p>\n<ol>\n<li>I
    need an immediate way to get to my daily notes page... I have started keeping
    a new note for each day and it's a chore to copy paste the old note, update the
    date, delete content, etc... instead <code>check_and_open_daily_note</code> checks
    the directory I keep my daily notes in <code>pages/daily</code> in my blog repo,
    checks the date for a note for today and either creates it from the copier template
    or opened it as my current buffer</li>\n</ol>\n<blockquote>\n<p>I could maybe
    improve this by making it global so that no matter what directory I'm in I could
    open the daily note with a keymap or lua function call instead of swapping tmux
    sessions and then opening the file</p>\n</blockquote>\n<ol start=\"2\">\n<li>I
    need a way to link to <em>yesterday</em>'s notes so it's easy to &quot;go to definition&quot;
    on the wiki link which opens the file...</li>\n<li>I wanted to track page linking...
    this is something core for me as I am building out my personal knowledge base,
    but I have key areas in my life where I want to see graphical links, or at least
    make it easy to trace thoughts I've had like clicking through wikipedia, so the
    <code>find_backlinks</code> function brings up a menu of all the pages that link
    to the one I'm in</li>\n</ol>\n<p>I'm sure I'll add more functions as time goes
    on - it'd be ncie to open certain slash pages like <a class=\"wikilink\" href=\"/now\">now</a>
    with a keymap... drop me a note at <code>nic@pype.dev</code> if you've got any
    great ideas!</p>\n<h2 id=\"code\">Code <a class=\"header-anchor\" href=\"#code\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>see the <a href=\"https://gist.github.com/pypeaday/38192f6db4d77c7c3be2b9213e14db6c\">gist</a></p>\n\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Daily Notes
    Neovim Plugin</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"What? Windsurf helped
    me whip up a neovim plugin for my daily notes workflows. It has\na few features
    that make my note taking workflow day-to-day a tiny bit mor\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Daily Notes Neovim Plugin | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/daily-notes-neovim-plugin\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Daily Notes Neovim Plugin | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"What? Windsurf helped me whip up a neovim plugin for my daily notes
    workflows. It has\na few features that make my note taking workflow day-to-day
    a tiny bit mor\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
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
    \           <span class=\"site-terminal__dir\">~/daily-notes-neovim-plugin</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h1 id=\"what\">What?
    <a class=\"header-anchor\" href=\"#what\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Windsurf helped me whip
    up a neovim plugin for my daily notes workflows. It has\na few features that make
    my note taking workflow day-to-day a tiny bit more\nfluid</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">credit due</p>\n<p>Honestly my zettlekasten
    and this daily notes stuff is only possible with the help of <a href=\"https://waylonwalker.com\">Waylon
    Walker</a></p>\n</div>\n<h2 id=\"context\">Context <a class=\"header-anchor\"
    href=\"#context\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I learned about the
    concept of a <a href=\"\">zettlekasten</a> recently and it really spoke\nto me.
    I've sought for YEARS to have a nice note-taking workflow, where I never\nthink
    about <em>where</em> to put something, it's searchable, portable to some degree,\nand
    customizable... I've used OneNote and its derivatives, different\nself-hosted
    container based note taking apps, raw markdown files scattered on\nmy file system,
    etc... I think I've finally landed on a solution which is\nbasically this blog
    + some tooling to achieve the things I want...</p>\n<ul>\n<li><a href=\"https://markata.dev\">markata</a>
    is the build system, it's what lets me keep all my notes in markdown files, and
    build them into a cohesive searchable experience on the web</li>\n<li><a href=\"https://neovim.io\">neovim</a>
    is my primary note taking environment - using tools like <code>marksman</code>
    I get the ability to &quot;jump&quot; to wiki-linked posts and grep content easily
    for searching</li>\n<li><a href=\"https://copier.readthedocs.io\">copier</a> is
    used for generating note templates - whether it's a <code>til</code>, blog post,
    or starting my daily note page - copier makes it quick to stub out the file in
    the right place with the right tags and frontmatter for markata</li>\n</ul>\n<h2
    id=\"usage\">Usage <a class=\"header-anchor\" href=\"#usage\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'll explain the daily
    notes workflow here, the code is below...</p>\n<p>There's basically just a couple
    things I wanted smoothed out in my note-taking as I am getting started here...</p>\n<ol>\n<li>I
    need an immediate way to get to my daily notes page... I have started keeping
    a new note for each day and it's a chore to copy paste the old note, update the
    date, delete content, etc... instead <code>check_and_open_daily_note</code> checks
    the directory I keep my daily notes in <code>pages/daily</code> in my blog repo,
    checks the date for a note for today and either creates it from the copier template
    or opened it as my current buffer</li>\n</ol>\n<blockquote>\n<p>I could maybe
    improve this by making it global so that no matter what directory I'm in I could
    open the daily note with a keymap or lua function call instead of swapping tmux
    sessions and then opening the file</p>\n</blockquote>\n<ol start=\"2\">\n<li>I
    need a way to link to <em>yesterday</em>'s notes so it's easy to &quot;go to definition&quot;
    on the wiki link which opens the file...</li>\n<li>I wanted to track page linking...
    this is something core for me as I am building out my personal knowledge base,
    but I have key areas in my life where I want to see graphical links, or at least
    make it easy to trace thoughts I've had like clicking through wikipedia, so the
    <code>find_backlinks</code> function brings up a menu of all the pages that link
    to the one I'm in</li>\n</ol>\n<p>I'm sure I'll add more functions as time goes
    on - it'd be ncie to open certain slash pages like <a class=\"wikilink\" href=\"/now\">now</a>
    with a keymap... drop me a note at <code>nic@pype.dev</code> if you've got any
    great ideas!</p>\n<h2 id=\"code\">Code <a class=\"header-anchor\" href=\"#code\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>see the <a href=\"https://gist.github.com/pypeaday/38192f6db4d77c7c3be2b9213e14db6c\">gist</a></p>\n\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-07-17 21:11:32\ntemplateKey: note\ntitle: Daily Notes Neovim
    Plugin\npublished: True\ntags:\n  - neovim\n  - note\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"\n---\n\n#
    What?\n\nWindsurf helped me whip up a neovim plugin for my daily notes workflows.
    It has\na few features that make my note taking workflow day-to-day a tiny bit
    more\nfluid\n\n!!! note \"credit due\"\n\n    Honestly my zettlekasten and this
    daily notes stuff is only possible with the help of [Waylon Walker](https://waylonwalker.com)\n\n##
    Context\n\nI learned about the concept of a [zettlekasten]() recently and it really
    spoke\nto me. I've sought for YEARS to have a nice note-taking workflow, where
    I never\nthink about _where_ to put something, it's searchable, portable to some
    degree,\nand customizable... I've used OneNote and its derivatives, different\nself-hosted
    container based note taking apps, raw markdown files scattered on\nmy file system,
    etc... I think I've finally landed on a solution which is\nbasically this blog
    + some tooling to achieve the things I want...\n\n- [markata](https://markata.dev)
    is the build system, it's what lets me keep all my notes in markdown files, and
    build them into a cohesive searchable experience on the web\n- [neovim](https://neovim.io)
    is my primary note taking environment - using tools like `marksman` I get the
    ability to \"jump\" to wiki-linked posts and grep content easily for searching\n-
    [copier](https://copier.readthedocs.io) is used for generating note templates
    - whether it's a `til`, blog post, or starting my daily note page - copier makes
    it quick to stub out the file in the right place with the right tags and frontmatter
    for markata\n\n## Usage\n\nI'll explain the daily notes workflow here, the code
    is below...\n\nThere's basically just a couple things I wanted smoothed out in
    my note-taking as I am getting started here...\n\n1. I need an immediate way to
    get to my daily notes page... I have started keeping a new note for each day and
    it's a chore to copy paste the old note, update the date, delete content, etc...
    instead `check_and_open_daily_note` checks the directory I keep my daily notes
    in `pages/daily` in my blog repo, checks the date for a note for today and either
    creates it from the copier template or opened it as my current buffer\n\n> I could
    maybe improve this by making it global so that no matter what directory I'm in
    I could open the daily note with a keymap or lua function call instead of swapping
    tmux sessions and then opening the file\n\n2. I need a way to link to _yesterday_'s
    notes so it's easy to \"go to definition\" on the wiki link which opens the file...\n3.
    I wanted to track page linking... this is something core for me as I am building
    out my personal knowledge base, but I have key areas in my life where I want to
    see graphical links, or at least make it easy to trace thoughts I've had like
    clicking through wikipedia, so the `find_backlinks` function brings up a menu
    of all the pages that link to the one I'm in\n\nI'm sure I'll add more functions
    as time goes on - it'd be ncie to open certain slash pages like [[now]] with a
    keymap... drop me a note at `nic@pype.dev` if you've got any great ideas!\n\n##
    Code\n\nsee the [gist](https://gist.github.com/pypeaday/38192f6db4d77c7c3be2b9213e14db6c)\n\n"
published: true
slug: daily-notes-neovim-plugin
title: Daily Notes Neovim Plugin


---

# What?

Windsurf helped me whip up a neovim plugin for my daily notes workflows. It has
a few features that make my note taking workflow day-to-day a tiny bit more
fluid

!!! note "credit due"

    Honestly my zettlekasten and this daily notes stuff is only possible with the help of [Waylon Walker](https://waylonwalker.com)

## Context

I learned about the concept of a [zettlekasten]() recently and it really spoke
to me. I've sought for YEARS to have a nice note-taking workflow, where I never
think about _where_ to put something, it's searchable, portable to some degree,
and customizable... I've used OneNote and its derivatives, different
self-hosted container based note taking apps, raw markdown files scattered on
my file system, etc... I think I've finally landed on a solution which is
basically this blog + some tooling to achieve the things I want...

- [markata](https://markata.dev) is the build system, it's what lets me keep all my notes in markdown files, and build them into a cohesive searchable experience on the web
- [neovim](https://neovim.io) is my primary note taking environment - using tools like `marksman` I get the ability to "jump" to wiki-linked posts and grep content easily for searching
- [copier](https://copier.readthedocs.io) is used for generating note templates - whether it's a `til`, blog post, or starting my daily note page - copier makes it quick to stub out the file in the right place with the right tags and frontmatter for markata

## Usage

I'll explain the daily notes workflow here, the code is below...

There's basically just a couple things I wanted smoothed out in my note-taking as I am getting started here...

1. I need an immediate way to get to my daily notes page... I have started keeping a new note for each day and it's a chore to copy paste the old note, update the date, delete content, etc... instead `check_and_open_daily_note` checks the directory I keep my daily notes in `pages/daily` in my blog repo, checks the date for a note for today and either creates it from the copier template or opened it as my current buffer

> I could maybe improve this by making it global so that no matter what directory I'm in I could open the daily note with a keymap or lua function call instead of swapping tmux sessions and then opening the file

2. I need a way to link to _yesterday_'s notes so it's easy to "go to definition" on the wiki link which opens the file...
3. I wanted to track page linking... this is something core for me as I am building out my personal knowledge base, but I have key areas in my life where I want to see graphical links, or at least make it easy to trace thoughts I've had like clicking through wikipedia, so the `find_backlinks` function brings up a menu of all the pages that link to the one I'm in

I'm sure I'll add more functions as time goes on - it'd be ncie to open certain slash pages like [[now]] with a keymap... drop me a note at `nic@pype.dev` if you've got any great ideas!

## Code

see the [gist](https://gist.github.com/pypeaday/38192f6db4d77c7c3be2b9213e14db6c)