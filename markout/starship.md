---
content: "If you spend time in the terminal then you'll want it to look somewhat pleasing
  to the eye.\nI used to ssh into servers with no customization, use `vi`  to edit
  a file or two, then get back to my regularly scheduled programming in VS C**e...\n\nOne
  of the first steps for me loving my terminal was a beautiful prompt... \n\n## Prompt\n\nThe
  default sh/bash/zsh prompts are... to put it lightly... garbage... I can't speak
  for other shells like fish simply because I do not use them but let me justify my
  trash talk.\n\nHere's the default `sh` prompt...\n\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/sh-prompt.png\"
  alt=\"sh\" title=\"A default sh prompt\" />\n\n\nThen switching to `zsh` you get
  something marginally better (plus tab completion!)\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-prompt.png\"
  alt=\"zsh\" title=\"A default zsh prompt\" />\n\nBut this still is super gross...
  there's nothing to indicate file types and no status information readily available
  (ie. `git status` etc.)\n\n## Oh-My-Zsh!\n\nNow there are several ways to make your
  prmompt nicer depending on your shell (terminal emulator plays a role too).\nNow
  I use `zsh` and there's a great tool out there [oh-my-zsh](https://ohmyz.sh/) that
  brings a crazy amount of customization to the terminal experience.\n\nI do not use
  `oh-my-zsh` for theming though and that's simply because of my other choices - I
  use `kitty` themes since I understood the implementation better.\nKitty themes though
  - do not give me a nice prompt.\n\nThe default prompt you get with `oh-my-zsh` themes
  isn't bad though (and you can pick from several default themes)...\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-oh-my-zsh-prompt.png\"
  alt=\"omz\" title=\"A default oh-my-zsh prompt\" />\n\nNotice that you get some
  nice coloring and some default `git` status stuff, mainly the branch you are on.\nThere's
  plugins to show you more and that's all well and good, but again it's not my choice...\n\nIf
  I don't use this then what's my goto?\n\n## Starship\n\n[starship](https://starship.rs/)
  is a cross-shell prompt with nice default and super easy customizaton!\n\nTo get
  started click that link and follow the \"Getting Started\" button - it's incredibly
  fast to get up and running with sane defaults.\n\nThe default starship config is
  plenty nice but I got a little tired of emojis in my prompt and wanted to switch
  to icons instead...\n\nTo get started with your own customizaton you add a `starship.toml`
  file to `~/.config` \nMy starship config is found [here](https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml).\n\n>Note
  you need a font installed patched with nerdfonts - I use JetBrains Mono\n\nNow I
  have a beautiful prompt with relevant information that's a dream to look at!\n\n<img
  src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
  alt=\"starship\" title=\"A starship prompt\" />\n\nI have configured my starship
  to show me relevant `git status` options (stashes, untracked files, etc etc.)\nI
  also have starship show me if I'm in a git repo, what branch I'm on, if I'm in a
  python project and if so what virtual environment is active.\nI do some work in
  AWS at work and so I have starship show me if my `aws cli` is configured to the
  right region for whichever project I'm in!\n\nThere's a billion more options and
  after a few minutes of play it becomes really easy and intuitive to customize colors,
  icons, etc."
date: 2022-03-25
description: 'If you spend time in the terminal then you&#x27;ll want it to look somewhat
  pleasing to the eye.

  I used to ssh into servers with no customization, use `vi`  to '
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Starship</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"If you spend time in the terminal then
    you&#x27;ll want it to look somewhat pleasing to the eye.\nI used to ssh into
    servers with no customization, use `vi`  to \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Starship | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/starship\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Starship | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"If
    you spend time in the terminal then you&#x27;ll want it to look somewhat pleasing
    to the eye.\nI used to ssh into servers with no customization, use `vi`  to \"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/starship</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Starship</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-25\">\n            March
    25, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>If you spend time in the terminal then
    you'll want it to look somewhat pleasing to the eye.\nI used to ssh into servers
    with no customization, use <code>vi</code>  to edit a file or two, then get back
    to my regularly scheduled programming in VS C**e...</p>\n<p>One of the first steps
    for me loving my terminal was a beautiful prompt...</p>\n<h2 id=\"prompt\">Prompt
    <a class=\"header-anchor\" href=\"#prompt\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The default sh/bash/zsh
    prompts are... to put it lightly... garbage... I can't speak for other shells
    like fish simply because I do not use them but let me justify my trash talk.</p>\n<p>Here's
    the default <code>sh</code> prompt...</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/sh-prompt.png\"
    alt=\"sh\" title=\"A default sh prompt\" />\n<p>Then switching to <code>zsh</code>
    you get something marginally better (plus tab completion!)</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-prompt.png\"
    alt=\"zsh\" title=\"A default zsh prompt\" />\n<p>But this still is super gross...
    there's nothing to indicate file types and no status information readily available
    (ie. <code>git status</code> etc.)</p>\n<h2 id=\"oh-my-zsh\">Oh-My-Zsh! <a class=\"header-anchor\"
    href=\"#oh-my-zsh\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now there are several
    ways to make your prmompt nicer depending on your shell (terminal emulator plays
    a role too).\nNow I use <code>zsh</code> and there's a great tool out there <a
    href=\"https://ohmyz.sh/\">oh-my-zsh</a> that brings a crazy amount of customization
    to the terminal experience.</p>\n<p>I do not use <code>oh-my-zsh</code> for theming
    though and that's simply because of my other choices - I use <code>kitty</code>
    themes since I understood the implementation better.\nKitty themes though - do
    not give me a nice prompt.</p>\n<p>The default prompt you get with <code>oh-my-zsh</code>
    themes isn't bad though (and you can pick from several default themes)...</p>\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-oh-my-zsh-prompt.png\"
    alt=\"omz\" title=\"A default oh-my-zsh prompt\" />\n<p>Notice that you get some
    nice coloring and some default <code>git</code> status stuff, mainly the branch
    you are on.\nThere's plugins to show you more and that's all well and good, but
    again it's not my choice...</p>\n<p>If I don't use this then what's my goto?</p>\n<h2
    id=\"starship\">Starship <a class=\"header-anchor\" href=\"#starship\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a href=\"https://starship.rs/\">starship</a>
    is a cross-shell prompt with nice default and super easy customizaton!</p>\n<p>To
    get started click that link and follow the &quot;Getting Started&quot; button
    - it's incredibly fast to get up and running with sane defaults.</p>\n<p>The default
    starship config is plenty nice but I got a little tired of emojis in my prompt
    and wanted to switch to icons instead...</p>\n<p>To get started with your own
    customizaton you add a <code>starship.toml</code> file to <code>~/.config</code>\nMy
    starship config is found <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml\">here</a>.</p>\n<blockquote>\n<p>Note
    you need a font installed patched with nerdfonts - I use JetBrains Mono</p>\n</blockquote>\n<p>Now
    I have a beautiful prompt with relevant information that's a dream to look at!</p>\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
    alt=\"starship\" title=\"A starship prompt\" />\n<p>I have configured my starship
    to show me relevant <code>git status</code> options (stashes, untracked files,
    etc etc.)\nI also have starship show me if I'm in a git repo, what branch I'm
    on, if I'm in a python project and if so what virtual environment is active.\nI
    do some work in AWS at work and so I have starship show me if my <code>aws cli</code>
    is configured to the right region for whichever project I'm in!</p>\n<p>There's
    a billion more options and after a few minutes of play it becomes really easy
    and intuitive to customize colors, icons, etc.</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Starship</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"If you spend time in the terminal then
    you&#x27;ll want it to look somewhat pleasing to the eye.\nI used to ssh into
    servers with no customization, use `vi`  to \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Starship | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/starship\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Starship | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"If
    you spend time in the terminal then you&#x27;ll want it to look somewhat pleasing
    to the eye.\nI used to ssh into servers with no customization, use `vi`  to \"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Starship</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-25\">\n            March
    25, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Starship</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-25\">\n            March
    25, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>If you spend time in the terminal then
    you'll want it to look somewhat pleasing to the eye.\nI used to ssh into servers
    with no customization, use <code>vi</code>  to edit a file or two, then get back
    to my regularly scheduled programming in VS C**e...</p>\n<p>One of the first steps
    for me loving my terminal was a beautiful prompt...</p>\n<h2 id=\"prompt\">Prompt
    <a class=\"header-anchor\" href=\"#prompt\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The default sh/bash/zsh
    prompts are... to put it lightly... garbage... I can't speak for other shells
    like fish simply because I do not use them but let me justify my trash talk.</p>\n<p>Here's
    the default <code>sh</code> prompt...</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/sh-prompt.png\"
    alt=\"sh\" title=\"A default sh prompt\" />\n<p>Then switching to <code>zsh</code>
    you get something marginally better (plus tab completion!)</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-prompt.png\"
    alt=\"zsh\" title=\"A default zsh prompt\" />\n<p>But this still is super gross...
    there's nothing to indicate file types and no status information readily available
    (ie. <code>git status</code> etc.)</p>\n<h2 id=\"oh-my-zsh\">Oh-My-Zsh! <a class=\"header-anchor\"
    href=\"#oh-my-zsh\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now there are several
    ways to make your prmompt nicer depending on your shell (terminal emulator plays
    a role too).\nNow I use <code>zsh</code> and there's a great tool out there <a
    href=\"https://ohmyz.sh/\">oh-my-zsh</a> that brings a crazy amount of customization
    to the terminal experience.</p>\n<p>I do not use <code>oh-my-zsh</code> for theming
    though and that's simply because of my other choices - I use <code>kitty</code>
    themes since I understood the implementation better.\nKitty themes though - do
    not give me a nice prompt.</p>\n<p>The default prompt you get with <code>oh-my-zsh</code>
    themes isn't bad though (and you can pick from several default themes)...</p>\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-oh-my-zsh-prompt.png\"
    alt=\"omz\" title=\"A default oh-my-zsh prompt\" />\n<p>Notice that you get some
    nice coloring and some default <code>git</code> status stuff, mainly the branch
    you are on.\nThere's plugins to show you more and that's all well and good, but
    again it's not my choice...</p>\n<p>If I don't use this then what's my goto?</p>\n<h2
    id=\"starship\">Starship <a class=\"header-anchor\" href=\"#starship\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a href=\"https://starship.rs/\">starship</a>
    is a cross-shell prompt with nice default and super easy customizaton!</p>\n<p>To
    get started click that link and follow the &quot;Getting Started&quot; button
    - it's incredibly fast to get up and running with sane defaults.</p>\n<p>The default
    starship config is plenty nice but I got a little tired of emojis in my prompt
    and wanted to switch to icons instead...</p>\n<p>To get started with your own
    customizaton you add a <code>starship.toml</code> file to <code>~/.config</code>\nMy
    starship config is found <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml\">here</a>.</p>\n<blockquote>\n<p>Note
    you need a font installed patched with nerdfonts - I use JetBrains Mono</p>\n</blockquote>\n<p>Now
    I have a beautiful prompt with relevant information that's a dream to look at!</p>\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
    alt=\"starship\" title=\"A starship prompt\" />\n<p>I have configured my starship
    to show me relevant <code>git status</code> options (stashes, untracked files,
    etc etc.)\nI also have starship show me if I'm in a git repo, what branch I'm
    on, if I'm in a python project and if so what virtual environment is active.\nI
    do some work in AWS at work and so I have starship show me if my <code>aws cli</code>
    is configured to the right region for whichever project I'm in!</p>\n<p>There's
    a billion more options and after a few minutes of play it becomes really easy
    and intuitive to customize colors, icons, etc.</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Starship</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"If you spend time in the terminal then
    you&#x27;ll want it to look somewhat pleasing to the eye.\nI used to ssh into
    servers with no customization, use `vi`  to \" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Starship | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/starship\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Starship | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"If
    you spend time in the terminal then you&#x27;ll want it to look somewhat pleasing
    to the eye.\nI used to ssh into servers with no customization, use `vi`  to \"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/starship</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>If you
    spend time in the terminal then you'll want it to look somewhat pleasing to the
    eye.\nI used to ssh into servers with no customization, use <code>vi</code>  to
    edit a file or two, then get back to my regularly scheduled programming in VS
    C**e...</p>\n<p>One of the first steps for me loving my terminal was a beautiful
    prompt...</p>\n<h2 id=\"prompt\">Prompt <a class=\"header-anchor\" href=\"#prompt\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The default sh/bash/zsh
    prompts are... to put it lightly... garbage... I can't speak for other shells
    like fish simply because I do not use them but let me justify my trash talk.</p>\n<p>Here's
    the default <code>sh</code> prompt...</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/sh-prompt.png\"
    alt=\"sh\" title=\"A default sh prompt\" />\n<p>Then switching to <code>zsh</code>
    you get something marginally better (plus tab completion!)</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-prompt.png\"
    alt=\"zsh\" title=\"A default zsh prompt\" />\n<p>But this still is super gross...
    there's nothing to indicate file types and no status information readily available
    (ie. <code>git status</code> etc.)</p>\n<h2 id=\"oh-my-zsh\">Oh-My-Zsh! <a class=\"header-anchor\"
    href=\"#oh-my-zsh\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now there are several
    ways to make your prmompt nicer depending on your shell (terminal emulator plays
    a role too).\nNow I use <code>zsh</code> and there's a great tool out there <a
    href=\"https://ohmyz.sh/\">oh-my-zsh</a> that brings a crazy amount of customization
    to the terminal experience.</p>\n<p>I do not use <code>oh-my-zsh</code> for theming
    though and that's simply because of my other choices - I use <code>kitty</code>
    themes since I understood the implementation better.\nKitty themes though - do
    not give me a nice prompt.</p>\n<p>The default prompt you get with <code>oh-my-zsh</code>
    themes isn't bad though (and you can pick from several default themes)...</p>\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-oh-my-zsh-prompt.png\"
    alt=\"omz\" title=\"A default oh-my-zsh prompt\" />\n<p>Notice that you get some
    nice coloring and some default <code>git</code> status stuff, mainly the branch
    you are on.\nThere's plugins to show you more and that's all well and good, but
    again it's not my choice...</p>\n<p>If I don't use this then what's my goto?</p>\n<h2
    id=\"starship\">Starship <a class=\"header-anchor\" href=\"#starship\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a href=\"https://starship.rs/\">starship</a>
    is a cross-shell prompt with nice default and super easy customizaton!</p>\n<p>To
    get started click that link and follow the &quot;Getting Started&quot; button
    - it's incredibly fast to get up and running with sane defaults.</p>\n<p>The default
    starship config is plenty nice but I got a little tired of emojis in my prompt
    and wanted to switch to icons instead...</p>\n<p>To get started with your own
    customizaton you add a <code>starship.toml</code> file to <code>~/.config</code>\nMy
    starship config is found <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml\">here</a>.</p>\n<blockquote>\n<p>Note
    you need a font installed patched with nerdfonts - I use JetBrains Mono</p>\n</blockquote>\n<p>Now
    I have a beautiful prompt with relevant information that's a dream to look at!</p>\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
    alt=\"starship\" title=\"A starship prompt\" />\n<p>I have configured my starship
    to show me relevant <code>git status</code> options (stashes, untracked files,
    etc etc.)\nI also have starship show me if I'm in a git repo, what branch I'm
    on, if I'm in a python project and if so what virtual environment is active.\nI
    do some work in AWS at work and so I have starship show me if my <code>aws cli</code>
    is configured to the right region for whichever project I'm in!</p>\n<p>There's
    a billion more options and after a few minutes of play it becomes really easy
    and intuitive to customize colors, icons, etc.</p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['linux', 'tech']\ntitle: Starship\ndate:
    2022-03-25T00:00:00\npublished: True\n#cover: \"media/starship.png\"\n\n---\n\nIf
    you spend time in the terminal then you'll want it to look somewhat pleasing to
    the eye.\nI used to ssh into servers with no customization, use `vi`  to edit
    a file or two, then get back to my regularly scheduled programming in VS C**e...\n\nOne
    of the first steps for me loving my terminal was a beautiful prompt... \n\n##
    Prompt\n\nThe default sh/bash/zsh prompts are... to put it lightly... garbage...
    I can't speak for other shells like fish simply because I do not use them but
    let me justify my trash talk.\n\nHere's the default `sh` prompt...\n\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/sh-prompt.png\"
    alt=\"sh\" title=\"A default sh prompt\" />\n\n\nThen switching to `zsh` you get
    something marginally better (plus tab completion!)\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-prompt.png\"
    alt=\"zsh\" title=\"A default zsh prompt\" />\n\nBut this still is super gross...
    there's nothing to indicate file types and no status information readily available
    (ie. `git status` etc.)\n\n## Oh-My-Zsh!\n\nNow there are several ways to make
    your prmompt nicer depending on your shell (terminal emulator plays a role too).\nNow
    I use `zsh` and there's a great tool out there [oh-my-zsh](https://ohmyz.sh/)
    that brings a crazy amount of customization to the terminal experience.\n\nI do
    not use `oh-my-zsh` for theming though and that's simply because of my other choices
    - I use `kitty` themes since I understood the implementation better.\nKitty themes
    though - do not give me a nice prompt.\n\nThe default prompt you get with `oh-my-zsh`
    themes isn't bad though (and you can pick from several default themes)...\n\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-oh-my-zsh-prompt.png\"
    alt=\"omz\" title=\"A default oh-my-zsh prompt\" />\n\nNotice that you get some
    nice coloring and some default `git` status stuff, mainly the branch you are on.\nThere's
    plugins to show you more and that's all well and good, but again it's not my choice...\n\nIf
    I don't use this then what's my goto?\n\n## Starship\n\n[starship](https://starship.rs/)
    is a cross-shell prompt with nice default and super easy customizaton!\n\nTo get
    started click that link and follow the \"Getting Started\" button - it's incredibly
    fast to get up and running with sane defaults.\n\nThe default starship config
    is plenty nice but I got a little tired of emojis in my prompt and wanted to switch
    to icons instead...\n\nTo get started with your own customizaton you add a `starship.toml`
    file to `~/.config` \nMy starship config is found [here](https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml).\n\n>Note
    you need a font installed patched with nerdfonts - I use JetBrains Mono\n\nNow
    I have a beautiful prompt with relevant information that's a dream to look at!\n\n<img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
    alt=\"starship\" title=\"A starship prompt\" />\n\nI have configured my starship
    to show me relevant `git status` options (stashes, untracked files, etc etc.)\nI
    also have starship show me if I'm in a git repo, what branch I'm on, if I'm in
    a python project and if so what virtual environment is active.\nI do some work
    in AWS at work and so I have starship show me if my `aws cli` is configured to
    the right region for whichever project I'm in!\n\nThere's a billion more options
    and after a few minutes of play it becomes really easy and intuitive to customize
    colors, icons, etc.\n"
published: true
slug: starship
title: Starship


---

If you spend time in the terminal then you'll want it to look somewhat pleasing to the eye.
I used to ssh into servers with no customization, use `vi`  to edit a file or two, then get back to my regularly scheduled programming in VS C**e...

One of the first steps for me loving my terminal was a beautiful prompt... 

## Prompt

The default sh/bash/zsh prompts are... to put it lightly... garbage... I can't speak for other shells like fish simply because I do not use them but let me justify my trash talk.

Here's the default `sh` prompt...


<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/sh-prompt.png" alt="sh" title="A default sh prompt" />


Then switching to `zsh` you get something marginally better (plus tab completion!)

<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-prompt.png" alt="zsh" title="A default zsh prompt" />

But this still is super gross... there's nothing to indicate file types and no status information readily available (ie. `git status` etc.)

## Oh-My-Zsh!

Now there are several ways to make your prmompt nicer depending on your shell (terminal emulator plays a role too).
Now I use `zsh` and there's a great tool out there [oh-my-zsh](https://ohmyz.sh/) that brings a crazy amount of customization to the terminal experience.

I do not use `oh-my-zsh` for theming though and that's simply because of my other choices - I use `kitty` themes since I understood the implementation better.
Kitty themes though - do not give me a nice prompt.

The default prompt you get with `oh-my-zsh` themes isn't bad though (and you can pick from several default themes)...

<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-oh-my-zsh-prompt.png" alt="omz" title="A default oh-my-zsh prompt" />

Notice that you get some nice coloring and some default `git` status stuff, mainly the branch you are on.
There's plugins to show you more and that's all well and good, but again it's not my choice...

If I don't use this then what's my goto?

## Starship

[starship](https://starship.rs/) is a cross-shell prompt with nice default and super easy customizaton!

To get started click that link and follow the "Getting Started" button - it's incredibly fast to get up and running with sane defaults.

The default starship config is plenty nice but I got a little tired of emojis in my prompt and wanted to switch to icons instead...

To get started with your own customizaton you add a `starship.toml` file to `~/.config` 
My starship config is found [here](https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml).

>Note you need a font installed patched with nerdfonts - I use JetBrains Mono

Now I have a beautiful prompt with relevant information that's a dream to look at!

<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png" alt="starship" title="A starship prompt" />

I have configured my starship to show me relevant `git status` options (stashes, untracked files, etc etc.)
I also have starship show me if I'm in a git repo, what branch I'm on, if I'm in a python project and if so what virtual environment is active.
I do some work in AWS at work and so I have starship show me if my `aws cli` is configured to the right region for whichever project I'm in!

There's a billion more options and after a few minutes of play it becomes really easy and intuitive to customize colors, icons, etc.