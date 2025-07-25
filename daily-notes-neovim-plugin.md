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
  Code\n\nMy dotfiles are private at the moment for work reasons, and the plugin is
  in\nthere but here's the start of the code!\n\n```lua\n\n---@diagnostic disable:
  undefined-global\n-- vim is a global in Neovim Lua scripts\nlocal M = {}\n\nfunction
  M.check_and_open_daily_note()\n  local daily_dir = \"pages/daily\"\n  local today
  = os.date(\"%Y-%m-%d\")\n  local pattern = string.format(\"%s/%s*-notes.md\", daily_dir,
  today)\n  -- Check if today's note exists\n  local files = vim.fn.glob(pattern,
  false, true)\n\n  if vim.tbl_isempty(files) then\n    -- Create new note via copier\n
  \   os.execute(\"copier copy ~/dotfiles/copier/.copier_templates/daily .\")\n\n
  \   -- Re-glob to get the new file (may need to wait a moment for creation)\n    vim.wait(500,
  function()\n      return not vim.tbl_isempty(vim.fn.glob(pattern, false, true))\n
  \   end, 10)\n\n    files = vim.fn.glob(pattern, false, true)\n  end\n\n  -- Open
  the note (if multiple, just pick the first)\n  if not vim.tbl_isempty(files) then\n
  \   vim.cmd(\"edit \" .. files[1])\n  else\n    print(\"Failed to find or create
  today's note.\")\n  end\n  vim.cmd(\"mode\")\nend\n\n-- Find and copy a wikilink
  to the most recent previous daily note\nfunction M.copy_previous_daily_wikilink()\n
  \ local daily_dir = \"pages/daily\"\n  local today = os.date(\"%Y-%m-%d\")\n\n  --
  Get all daily note files\n  local pattern = string.format(\"%s/*-notes.md\", daily_dir)\n
  \ local all_files = vim.fn.glob(pattern, false, true)\n\n  if vim.tbl_isempty(all_files)
  then\n    vim.notify(\"No daily notes found\", vim.log.levels.WARN)\n    return\n
  \ end\n\n  -- Sort files by date (newest first)\n  table.sort(all_files, function(a,
  b)\n    -- Extract dates from filenames\n    local date_a = a:match(\"/(%d%d%d%d%-%d%d%-%d%d)\")\n
  \   local date_b = b:match(\"/(%d%d%d%d%-%d%d%-%d%d)\")\n\n    if not date_a or
  not date_b then\n      return false\n    end\n\n    return date_a > date_b\n  end)\n\n
  \ -- Find the most recent note before today\n  local previous_note = nil\n  for
  _, file in ipairs(all_files) do\n    local date = file:match(\"/(%d%d%d%d%-%d%d%-%d%d)\")\n
  \   if date and date < today then\n      previous_note = file\n      break\n    end\n
  \ end\n\n  if not previous_note then\n    vim.notify(\"No previous daily notes found\",
  vim.log.levels.WARN)\n    return\n  end\n\n  -- Extract the slug (filename without
  extension)\n  local filename = vim.fn.fnamemodify(previous_note, \":t\")\n  local
  slug = filename:match(\"(.+)%..+$\") or filename\n\n  -- Create wikilink format\n
  \ local wikilink = \"[[ \" .. slug .. \" ]]\"\n\n  -- Copy to system clipboard\n
  \ vim.fn.setreg(\"+\", wikilink)\n  vim.notify(\"Copied previous daily note link:
  \" .. wikilink, vim.log.levels.INFO)\nend\n\nfunction M.find_daily_files()\n  require(\"telescope.builtin\").find_files({\n
  \   cwd = \"pages/daily\",\n    sorting_strategy = \"ascending\",\n  })\nend\n\nfunction
  M.find_backlinks()\n  local slug = vim.fn.expand(\"%:t:r\")\n  if slug == \"\" then\n
  \   print(\"Cannot find backlinks for a file without a name.\")\n    return\n  end\n\n
  \ local pattern = string.format(\"\\\\[\\\\[[\\\\s]*%s[\\\\s]*\\\\]\\\\]\", slug)\n
  \ require(\"telescope.builtin\").live_grep({\n    default_text = pattern,\n    search_dirs
  = { \"pages\" },\n    prompt_title = \"Backlinks for [[\" .. slug .. \"]]\",\n    additional_args
  = { \"--pcre2\" },\n  })\nend\n\n-- Create user command for copying previous daily
  note wikilink\nvim.api.nvim_create_user_command(\"CopyPreviousDailyLink\", M.copy_previous_daily_wikilink,
  {})\n\nreturn M\n```"
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
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Daily
    Notes Neovim Plugin | Nic Payne\" />\n<meta property=\"og:description\" content=\"What?
    Windsurf helped me whip up a neovim plugin for my daily notes workflows. It has\na
    few features that make my note taking workflow day-to-day a tiny bit mor\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devdaily-notes-neovim-plugin\"
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
    /* Even larger than text-7xl */\n        }\n    }\n    \n    /* Floating cover
    image above article */\n    .cover-floating-container {\n        position: relative;\n
    \       width: 100%;\n        margin: 2.5rem auto 0; /* Space from search bar
    */\n        z-index: 20;\n    }\n    \n    /* True boundary-breaking cover image
    */\n    .boundary-break-container {\n        position: relative;\n        width:
    calc(100% + 3rem); /* Extend 1.5rem on each side beyond article */\n        left:
    -1.5rem; /* Pull left edge 1.5rem beyond container */\n        height: 380px;
    /* Reduced from 450px for smaller image */\n        overflow: visible;\n        z-index:
    20;\n    }\n    \n    /* Glow effect that extends beyond image */\n    .boundary-break-glow
    {\n        position: absolute;\n        top: -2rem;\n        left: -2rem;\n        right:
    -2rem;\n        bottom: -1rem;\n        background: linear-gradient(45deg, \n
    \           rgba(211, 124, 95, 0.7),  /* accent-warm */\n            rgba(96,
    138, 159, 0.7),  /* accent-cool */\n            rgba(106, 138, 130, 0.7)  /* accent-green
    */\n        );\n        filter: blur(2.5rem);\n        border-radius: 1rem;\n
    \       opacity: 0.8;\n        z-index: 10;\n        animation: boundary-break-pulse
    4s infinite alternate;\n    }\n    \n    @keyframes boundary-break-pulse {\n        0%
    { opacity: 0.7; filter: blur(2rem); }\n        100% { opacity: 0.9; filter: blur(3rem);
    }\n    }\n    \n    /* Image styling */\n    .boundary-break-image {\n        position:
    relative;\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n
    \       border-radius: 0.75rem;\n        border: 0.5rem solid white;\n        box-shadow:
    0 2rem 4rem -1rem rgba(0,0,0,0.8), 0 0 2.5rem 0.25rem rgba(0,0,0,0.5);\n        transform:
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
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    \n            alt=\"Daily Notes Neovim Plugin cover image\" \n            class=\"boundary-break-image\"\n
    \       >\n    </div>\n</div>\n\n<article class='w-full pattern-card glow-card
    p-4 md:p-6 post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Daily Notes Neovim
    Plugin</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2025-07-17\">\n            July 17, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/neovim/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #neovim\n            </a>\n            <a href=\"https://pype.dev//tags/note/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #note\n            </a>\n    </div>\n</section>
    \   <section class=\"article-content prose dark:prose-invert lg:prose-xl mx-auto
    mt-8\">\n        <h1 id=\"what\">What? <a class=\"header-anchor\" href=\"#what\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My dotfiles are private
    at the moment for work reasons, and the plugin is in\nthere but here's the start
    of the code!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">---@diagnostic
    disable: undefined-global</span>\n<span class=\"c1\">-- vim is a global in Neovim
    Lua scripts</span>\n<span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">M</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{}</span>\n\n<span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nc\">M</span><span class=\"p\">.</span><span
    class=\"nf\">check_and_open_daily_note</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">daily_dir</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">today</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">os.date</span><span class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-%d&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">pattern</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">string.format</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%s/%s*-notes.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">daily_dir</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">today</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"c1\">-- Check if
    today&#39;s note exists</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span class=\"nv\">files</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"c1\">-- Create new note via copier</span>\n<span
    class=\"w\">    </span><span class=\"nb\">os.execute</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;copier copy ~/dotfiles/copier/.copier_templates/daily .&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">    </span><span class=\"c1\">-- Re-glob
    to get the new file (may need to wait a moment for creation)</span>\n<span class=\"w\">
    \   </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">wait</span><span
    class=\"p\">(</span><span class=\"mi\">500</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kr\">function</span><span class=\"p\">()</span>\n<span
    class=\"w\">      </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">glob</span><span class=\"p\">(</span><span
    class=\"nv\">pattern</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">true</span><span class=\"p\">))</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"mi\">10</span><span class=\"p\">)</span>\n\n<span class=\"w\">    </span><span
    class=\"nv\">files</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">glob</span><span
    class=\"p\">(</span><span class=\"nv\">pattern</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">false</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Open the note (if multiple, just pick the first)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span
    class=\"nv\">files</span><span class=\"p\">)</span><span class=\"w\"> </span><span
    class=\"kr\">then</span>\n<span class=\"w\">    </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">cmd</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;edit &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"p\">[</span><span
    class=\"mi\">1</span><span class=\"p\">])</span>\n<span class=\"w\">  </span><span
    class=\"kr\">else</span>\n<span class=\"w\">    </span><span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;Failed to find or create today&#39;s
    note.&quot;</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">cmd</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;mode&quot;</span><span class=\"p\">)</span>\n<span class=\"kr\">end</span>\n\n<span
    class=\"c1\">-- Find and copy a wikilink to the most recent previous daily note</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">copy_previous_daily_wikilink</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">daily_dir</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">today</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">os.date</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%Y-%m-%d&quot;</span><span class=\"p\">)</span>\n\n<span class=\"w\">
    \ </span><span class=\"c1\">-- Get all daily note files</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">string.format</span><span class=\"p\">(</span><span class=\"s2\">&quot;%s/*-notes.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">daily_dir</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">all_files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span class=\"nv\">all_files</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">notify</span><span class=\"p\">(</span><span class=\"s2\">&quot;No
    daily notes found&quot;</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">log</span><span
    class=\"p\">.</span><span class=\"py\">levels</span><span class=\"p\">.</span><span
    class=\"py\">WARN</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\">-- Sort files by date (newest first)</span>\n<span
    class=\"w\">  </span><span class=\"nb\">table.sort</span><span class=\"p\">(</span><span
    class=\"nv\">all_files</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kr\">function</span><span class=\"p\">(</span><span class=\"nv\">a</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">b</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"c1\">-- Extract
    dates from filenames</span>\n<span class=\"w\">    </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">date_a</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">a</span><span
    class=\"p\">:</span><span class=\"nf\">match</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">    </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">date_b</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">b</span><span class=\"p\">:</span><span
    class=\"nf\">match</span><span class=\"p\">(</span><span class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">date_a</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">date_b</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">false</span>\n<span class=\"w\">    </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">date_a</span><span class=\"w\"> </span><span class=\"o\">&gt;</span><span
    class=\"w\"> </span><span class=\"nv\">date_b</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span><span class=\"p\">)</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Find the most recent note before today</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">previous_note</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">for</span><span
    class=\"w\"> </span><span class=\"nv\">_</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">file</span><span class=\"w\"> </span><span
    class=\"kr\">in</span><span class=\"w\"> </span><span class=\"nb\">ipairs</span><span
    class=\"p\">(</span><span class=\"nv\">all_files</span><span class=\"p\">)</span><span
    class=\"w\"> </span><span class=\"kr\">do</span>\n<span class=\"w\">    </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">date</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">file</span><span class=\"p\">:</span><span class=\"nf\">match</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">date</span><span class=\"w\"> </span><span
    class=\"ow\">and</span><span class=\"w\"> </span><span class=\"nv\">date</span><span
    class=\"w\"> </span><span class=\"o\">&lt;</span><span class=\"w\"> </span><span
    class=\"nv\">today</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"nv\">previous_note</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">file</span>\n<span
    class=\"w\">      </span><span class=\"kr\">break</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">previous_note</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;No previous daily notes found&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">WARN</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Extract the slug (filename without extension)</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">filename</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">fnamemodify</span><span class=\"p\">(</span><span
    class=\"nv\">previous_note</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;:t&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">slug</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">filename</span><span class=\"p\">:</span><span
    class=\"nf\">match</span><span class=\"p\">(</span><span class=\"s2\">&quot;(.+)%..+$&quot;</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"nv\">filename</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Create wikilink format</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">wikilink</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;[[ &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">slug</span><span class=\"w\"> </span><span
    class=\"o\">..</span><span class=\"w\"> </span><span class=\"s2\">&quot; ]]&quot;</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\">-- Copy to system clipboard</span>\n<span
    class=\"w\">  </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">setreg</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;+&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">wikilink</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">notify</span><span class=\"p\">(</span><span class=\"s2\">&quot;Copied
    previous daily note link: &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">wikilink</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">log</span><span class=\"p\">.</span><span class=\"py\">levels</span><span
    class=\"p\">.</span><span class=\"py\">INFO</span><span class=\"p\">)</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"kr\">function</span><span class=\"w\">
    </span><span class=\"nc\">M</span><span class=\"p\">.</span><span class=\"nf\">find_daily_files</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">).</span><span class=\"nf\">find_files</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">cwd</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">sorting_strategy</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;ascending&quot;</span><span class=\"p\">,</span>\n<span class=\"w\">
    \ </span><span class=\"p\">})</span>\n<span class=\"kr\">end</span>\n\n<span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nc\">M</span><span class=\"p\">.</span><span
    class=\"nf\">find_backlinks</span><span class=\"p\">()</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">expand</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%:t:r&quot;</span><span class=\"p\">)</span>\n<span class=\"w\">
    \ </span><span class=\"kr\">if</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"w\"> </span><span class=\"o\">==</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;&quot;</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Cannot find backlinks for a file without a name.&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">string.format</span><span class=\"p\">(</span><span class=\"s2\">&quot;</span><span
    class=\"se\">\\\\</span><span class=\"s2\">[</span><span class=\"se\">\\\\</span><span
    class=\"s2\">[[</span><span class=\"se\">\\\\</span><span class=\"s2\">s]*%s[</span><span
    class=\"se\">\\\\</span><span class=\"s2\">s]*</span><span class=\"se\">\\\\</span><span
    class=\"s2\">]</span><span class=\"se\">\\\\</span><span class=\"s2\">]&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">).</span><span class=\"nf\">live_grep</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">default_text</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">search_dirs</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span
    class=\"nv\">prompt_title</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Backlinks for [[&quot;</span><span
    class=\"w\"> </span><span class=\"o\">..</span><span class=\"w\"> </span><span
    class=\"nv\">slug</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;]]&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">    </span><span class=\"nv\">additional_args</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;--pcre2&quot;</span><span class=\"w\">
    </span><span class=\"p\">},</span>\n<span class=\"w\">  </span><span class=\"p\">})</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"c1\">-- Create user command for copying
    previous daily note wikilink</span>\n<span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">api</span><span class=\"p\">.</span><span class=\"nf\">nvim_create_user_command</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;CopyPreviousDailyLink&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">M</span><span
    class=\"p\">.</span><span class=\"py\">copy_previous_daily_wikilink</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{})</span>\n\n<span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"nv\">M</span>\n</pre></div>\n\n</pre>\n\n\n
    \   </section>\n</article>        </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Daily Notes Neovim
    Plugin</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"What? Windsurf helped
    me whip up a neovim plugin for my daily notes workflows. It has\na few features
    that make my note taking workflow day-to-day a tiny bit mor\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Daily
    Notes Neovim Plugin | Nic Payne\" />\n<meta property=\"og:description\" content=\"What?
    Windsurf helped me whip up a neovim plugin for my daily notes workflows. It has\na
    few features that make my note taking workflow day-to-day a tiny bit mor\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devdaily-notes-neovim-plugin\"
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
  partial: "<style>\n    /* Ultra-aggressive title styling override */\n    #title,
    h1#title, .post-header h1, h1.gradient-text {\n        font-size: 3.75rem !important;
    /* ~text-7xl */\n        font-weight: 800 !important;\n        line-height: 1.1
    !important;\n        letter-spacing: -0.025em !important;\n    }\n    \n    @media
    (min-width: 768px) {\n        #title, h1#title, .post-header h1, h1.gradient-text
    {\n            font-size: 4.5rem !important; /* Even larger than text-7xl */\n
    \       }\n    }\n    \n    /* Floating cover image above article */\n    .cover-floating-container
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
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    \n            alt=\"Daily Notes Neovim Plugin cover image\" \n            class=\"boundary-break-image\"\n
    \       >\n    </div>\n</div>\n\n<article class='w-full pattern-card glow-card
    p-4 md:p-6 post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Daily Notes Neovim
    Plugin</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2025-07-17\">\n            July 17, 2025\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/neovim/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #neovim\n            </a>\n            <a href=\"https://pype.dev//tags/note/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #note\n            </a>\n    </div>\n</section>
    \   <section class=\"article-content prose dark:prose-invert lg:prose-xl mx-auto
    mt-8\">\n        <h1 id=\"what\">What? <a class=\"header-anchor\" href=\"#what\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My dotfiles are private
    at the moment for work reasons, and the plugin is in\nthere but here's the start
    of the code!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">---@diagnostic
    disable: undefined-global</span>\n<span class=\"c1\">-- vim is a global in Neovim
    Lua scripts</span>\n<span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">M</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{}</span>\n\n<span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nc\">M</span><span class=\"p\">.</span><span
    class=\"nf\">check_and_open_daily_note</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">daily_dir</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">today</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">os.date</span><span class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-%d&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">pattern</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">string.format</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%s/%s*-notes.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">daily_dir</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">today</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"c1\">-- Check if
    today&#39;s note exists</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span class=\"nv\">files</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"c1\">-- Create new note via copier</span>\n<span
    class=\"w\">    </span><span class=\"nb\">os.execute</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;copier copy ~/dotfiles/copier/.copier_templates/daily .&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">    </span><span class=\"c1\">-- Re-glob
    to get the new file (may need to wait a moment for creation)</span>\n<span class=\"w\">
    \   </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">wait</span><span
    class=\"p\">(</span><span class=\"mi\">500</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kr\">function</span><span class=\"p\">()</span>\n<span
    class=\"w\">      </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">glob</span><span class=\"p\">(</span><span
    class=\"nv\">pattern</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">true</span><span class=\"p\">))</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"mi\">10</span><span class=\"p\">)</span>\n\n<span class=\"w\">    </span><span
    class=\"nv\">files</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">glob</span><span
    class=\"p\">(</span><span class=\"nv\">pattern</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">false</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Open the note (if multiple, just pick the first)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span
    class=\"nv\">files</span><span class=\"p\">)</span><span class=\"w\"> </span><span
    class=\"kr\">then</span>\n<span class=\"w\">    </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">cmd</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;edit &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"p\">[</span><span
    class=\"mi\">1</span><span class=\"p\">])</span>\n<span class=\"w\">  </span><span
    class=\"kr\">else</span>\n<span class=\"w\">    </span><span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;Failed to find or create today&#39;s
    note.&quot;</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">cmd</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;mode&quot;</span><span class=\"p\">)</span>\n<span class=\"kr\">end</span>\n\n<span
    class=\"c1\">-- Find and copy a wikilink to the most recent previous daily note</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">copy_previous_daily_wikilink</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">daily_dir</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">today</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">os.date</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%Y-%m-%d&quot;</span><span class=\"p\">)</span>\n\n<span class=\"w\">
    \ </span><span class=\"c1\">-- Get all daily note files</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">string.format</span><span class=\"p\">(</span><span class=\"s2\">&quot;%s/*-notes.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">daily_dir</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">all_files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span class=\"nv\">all_files</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">notify</span><span class=\"p\">(</span><span class=\"s2\">&quot;No
    daily notes found&quot;</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">log</span><span
    class=\"p\">.</span><span class=\"py\">levels</span><span class=\"p\">.</span><span
    class=\"py\">WARN</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\">-- Sort files by date (newest first)</span>\n<span
    class=\"w\">  </span><span class=\"nb\">table.sort</span><span class=\"p\">(</span><span
    class=\"nv\">all_files</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kr\">function</span><span class=\"p\">(</span><span class=\"nv\">a</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">b</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"c1\">-- Extract
    dates from filenames</span>\n<span class=\"w\">    </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">date_a</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">a</span><span
    class=\"p\">:</span><span class=\"nf\">match</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">    </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">date_b</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">b</span><span class=\"p\">:</span><span
    class=\"nf\">match</span><span class=\"p\">(</span><span class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">date_a</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">date_b</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">false</span>\n<span class=\"w\">    </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">date_a</span><span class=\"w\"> </span><span class=\"o\">&gt;</span><span
    class=\"w\"> </span><span class=\"nv\">date_b</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span><span class=\"p\">)</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Find the most recent note before today</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">previous_note</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">for</span><span
    class=\"w\"> </span><span class=\"nv\">_</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">file</span><span class=\"w\"> </span><span
    class=\"kr\">in</span><span class=\"w\"> </span><span class=\"nb\">ipairs</span><span
    class=\"p\">(</span><span class=\"nv\">all_files</span><span class=\"p\">)</span><span
    class=\"w\"> </span><span class=\"kr\">do</span>\n<span class=\"w\">    </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">date</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">file</span><span class=\"p\">:</span><span class=\"nf\">match</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">date</span><span class=\"w\"> </span><span
    class=\"ow\">and</span><span class=\"w\"> </span><span class=\"nv\">date</span><span
    class=\"w\"> </span><span class=\"o\">&lt;</span><span class=\"w\"> </span><span
    class=\"nv\">today</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"nv\">previous_note</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">file</span>\n<span
    class=\"w\">      </span><span class=\"kr\">break</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">previous_note</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;No previous daily notes found&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">WARN</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Extract the slug (filename without extension)</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">filename</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">fnamemodify</span><span class=\"p\">(</span><span
    class=\"nv\">previous_note</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;:t&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">slug</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">filename</span><span class=\"p\">:</span><span
    class=\"nf\">match</span><span class=\"p\">(</span><span class=\"s2\">&quot;(.+)%..+$&quot;</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"nv\">filename</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Create wikilink format</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">wikilink</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;[[ &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">slug</span><span class=\"w\"> </span><span
    class=\"o\">..</span><span class=\"w\"> </span><span class=\"s2\">&quot; ]]&quot;</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\">-- Copy to system clipboard</span>\n<span
    class=\"w\">  </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">setreg</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;+&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">wikilink</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">notify</span><span class=\"p\">(</span><span class=\"s2\">&quot;Copied
    previous daily note link: &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">wikilink</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">log</span><span class=\"p\">.</span><span class=\"py\">levels</span><span
    class=\"p\">.</span><span class=\"py\">INFO</span><span class=\"p\">)</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"kr\">function</span><span class=\"w\">
    </span><span class=\"nc\">M</span><span class=\"p\">.</span><span class=\"nf\">find_daily_files</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">).</span><span class=\"nf\">find_files</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">cwd</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">sorting_strategy</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;ascending&quot;</span><span class=\"p\">,</span>\n<span class=\"w\">
    \ </span><span class=\"p\">})</span>\n<span class=\"kr\">end</span>\n\n<span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nc\">M</span><span class=\"p\">.</span><span
    class=\"nf\">find_backlinks</span><span class=\"p\">()</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">expand</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%:t:r&quot;</span><span class=\"p\">)</span>\n<span class=\"w\">
    \ </span><span class=\"kr\">if</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"w\"> </span><span class=\"o\">==</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;&quot;</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Cannot find backlinks for a file without a name.&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">string.format</span><span class=\"p\">(</span><span class=\"s2\">&quot;</span><span
    class=\"se\">\\\\</span><span class=\"s2\">[</span><span class=\"se\">\\\\</span><span
    class=\"s2\">[[</span><span class=\"se\">\\\\</span><span class=\"s2\">s]*%s[</span><span
    class=\"se\">\\\\</span><span class=\"s2\">s]*</span><span class=\"se\">\\\\</span><span
    class=\"s2\">]</span><span class=\"se\">\\\\</span><span class=\"s2\">]&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">).</span><span class=\"nf\">live_grep</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">default_text</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">search_dirs</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span
    class=\"nv\">prompt_title</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Backlinks for [[&quot;</span><span
    class=\"w\"> </span><span class=\"o\">..</span><span class=\"w\"> </span><span
    class=\"nv\">slug</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;]]&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">    </span><span class=\"nv\">additional_args</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;--pcre2&quot;</span><span class=\"w\">
    </span><span class=\"p\">},</span>\n<span class=\"w\">  </span><span class=\"p\">})</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"c1\">-- Create user command for copying
    previous daily note wikilink</span>\n<span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">api</span><span class=\"p\">.</span><span class=\"nf\">nvim_create_user_command</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;CopyPreviousDailyLink&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">M</span><span
    class=\"p\">.</span><span class=\"py\">copy_previous_daily_wikilink</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{})</span>\n\n<span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"nv\">M</span>\n</pre></div>\n\n</pre>\n\n\n
    \   </section>\n</article>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Daily Notes
    Neovim Plugin</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"What? Windsurf helped
    me whip up a neovim plugin for my daily notes workflows. It has\na few features
    that make my note taking workflow day-to-day a tiny bit mor\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Daily
    Notes Neovim Plugin | Nic Payne\" />\n<meta property=\"og:description\" content=\"What?
    Windsurf helped me whip up a neovim plugin for my daily notes workflows. It has\na
    few features that make my note taking workflow day-to-day a tiny bit mor\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devdaily-notes-neovim-plugin\"
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
    Content is handled by the password protection plugin -->\n    <h1 id=\"what\">What?
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My dotfiles are private
    at the moment for work reasons, and the plugin is in\nthere but here's the start
    of the code!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">---@diagnostic
    disable: undefined-global</span>\n<span class=\"c1\">-- vim is a global in Neovim
    Lua scripts</span>\n<span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">M</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{}</span>\n\n<span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nc\">M</span><span class=\"p\">.</span><span
    class=\"nf\">check_and_open_daily_note</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">daily_dir</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">today</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">os.date</span><span class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-%d&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">pattern</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">string.format</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;%s/%s*-notes.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">daily_dir</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">today</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"c1\">-- Check if
    today&#39;s note exists</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span class=\"nv\">files</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"c1\">-- Create new note via copier</span>\n<span
    class=\"w\">    </span><span class=\"nb\">os.execute</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;copier copy ~/dotfiles/copier/.copier_templates/daily .&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">    </span><span class=\"c1\">-- Re-glob
    to get the new file (may need to wait a moment for creation)</span>\n<span class=\"w\">
    \   </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">wait</span><span
    class=\"p\">(</span><span class=\"mi\">500</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kr\">function</span><span class=\"p\">()</span>\n<span
    class=\"w\">      </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">glob</span><span class=\"p\">(</span><span
    class=\"nv\">pattern</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kc\">true</span><span class=\"p\">))</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"mi\">10</span><span class=\"p\">)</span>\n\n<span class=\"w\">    </span><span
    class=\"nv\">files</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">glob</span><span
    class=\"p\">(</span><span class=\"nv\">pattern</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">false</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Open the note (if multiple, just pick the first)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span
    class=\"nv\">files</span><span class=\"p\">)</span><span class=\"w\"> </span><span
    class=\"kr\">then</span>\n<span class=\"w\">    </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">cmd</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;edit &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"p\">[</span><span
    class=\"mi\">1</span><span class=\"p\">])</span>\n<span class=\"w\">  </span><span
    class=\"kr\">else</span>\n<span class=\"w\">    </span><span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;Failed to find or create today&#39;s
    note.&quot;</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">cmd</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;mode&quot;</span><span class=\"p\">)</span>\n<span class=\"kr\">end</span>\n\n<span
    class=\"c1\">-- Find and copy a wikilink to the most recent previous daily note</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">copy_previous_daily_wikilink</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">daily_dir</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">today</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">os.date</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%Y-%m-%d&quot;</span><span class=\"p\">)</span>\n\n<span class=\"w\">
    \ </span><span class=\"c1\">-- Get all daily note files</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">string.format</span><span class=\"p\">(</span><span class=\"s2\">&quot;%s/*-notes.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">daily_dir</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">all_files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">tbl_isempty</span><span class=\"p\">(</span><span class=\"nv\">all_files</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">notify</span><span class=\"p\">(</span><span class=\"s2\">&quot;No
    daily notes found&quot;</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">log</span><span
    class=\"p\">.</span><span class=\"py\">levels</span><span class=\"p\">.</span><span
    class=\"py\">WARN</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\">-- Sort files by date (newest first)</span>\n<span
    class=\"w\">  </span><span class=\"nb\">table.sort</span><span class=\"p\">(</span><span
    class=\"nv\">all_files</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"kr\">function</span><span class=\"p\">(</span><span class=\"nv\">a</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">b</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"c1\">-- Extract
    dates from filenames</span>\n<span class=\"w\">    </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">date_a</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">a</span><span
    class=\"p\">:</span><span class=\"nf\">match</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">    </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">date_b</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">b</span><span class=\"p\">:</span><span
    class=\"nf\">match</span><span class=\"p\">(</span><span class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">date_a</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">date_b</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">false</span>\n<span class=\"w\">    </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">date_a</span><span class=\"w\"> </span><span class=\"o\">&gt;</span><span
    class=\"w\"> </span><span class=\"nv\">date_b</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span><span class=\"p\">)</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Find the most recent note before today</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">previous_note</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">for</span><span
    class=\"w\"> </span><span class=\"nv\">_</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">file</span><span class=\"w\"> </span><span
    class=\"kr\">in</span><span class=\"w\"> </span><span class=\"nb\">ipairs</span><span
    class=\"p\">(</span><span class=\"nv\">all_files</span><span class=\"p\">)</span><span
    class=\"w\"> </span><span class=\"kr\">do</span>\n<span class=\"w\">    </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">date</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">file</span><span class=\"p\">:</span><span class=\"nf\">match</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/(%d%d%d%d%-%d%d%-%d%d)&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">date</span><span class=\"w\"> </span><span
    class=\"ow\">and</span><span class=\"w\"> </span><span class=\"nv\">date</span><span
    class=\"w\"> </span><span class=\"o\">&lt;</span><span class=\"w\"> </span><span
    class=\"nv\">today</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"nv\">previous_note</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">file</span>\n<span
    class=\"w\">      </span><span class=\"kr\">break</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">previous_note</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;No previous daily notes found&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">WARN</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Extract the slug (filename without extension)</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">filename</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">fnamemodify</span><span class=\"p\">(</span><span
    class=\"nv\">previous_note</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;:t&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">slug</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">filename</span><span class=\"p\">:</span><span
    class=\"nf\">match</span><span class=\"p\">(</span><span class=\"s2\">&quot;(.+)%..+$&quot;</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"nv\">filename</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Create wikilink format</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">wikilink</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;[[ &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">slug</span><span class=\"w\"> </span><span
    class=\"o\">..</span><span class=\"w\"> </span><span class=\"s2\">&quot; ]]&quot;</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\">-- Copy to system clipboard</span>\n<span
    class=\"w\">  </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">setreg</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;+&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">wikilink</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"nf\">notify</span><span class=\"p\">(</span><span class=\"s2\">&quot;Copied
    previous daily note link: &quot;</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"nv\">wikilink</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">log</span><span class=\"p\">.</span><span class=\"py\">levels</span><span
    class=\"p\">.</span><span class=\"py\">INFO</span><span class=\"p\">)</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"kr\">function</span><span class=\"w\">
    </span><span class=\"nc\">M</span><span class=\"p\">.</span><span class=\"nf\">find_daily_files</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">).</span><span class=\"nf\">find_files</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">cwd</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages/daily&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">sorting_strategy</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;ascending&quot;</span><span class=\"p\">,</span>\n<span class=\"w\">
    \ </span><span class=\"p\">})</span>\n<span class=\"kr\">end</span>\n\n<span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nc\">M</span><span class=\"p\">.</span><span
    class=\"nf\">find_backlinks</span><span class=\"p\">()</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">fn</span><span
    class=\"p\">.</span><span class=\"nf\">expand</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%:t:r&quot;</span><span class=\"p\">)</span>\n<span class=\"w\">
    \ </span><span class=\"kr\">if</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"w\"> </span><span class=\"o\">==</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;&quot;</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Cannot find backlinks for a file without a name.&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">string.format</span><span class=\"p\">(</span><span class=\"s2\">&quot;</span><span
    class=\"se\">\\\\</span><span class=\"s2\">[</span><span class=\"se\">\\\\</span><span
    class=\"s2\">[[</span><span class=\"se\">\\\\</span><span class=\"s2\">s]*%s[</span><span
    class=\"se\">\\\\</span><span class=\"s2\">s]*</span><span class=\"se\">\\\\</span><span
    class=\"s2\">]</span><span class=\"se\">\\\\</span><span class=\"s2\">]&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">slug</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">).</span><span class=\"nf\">live_grep</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">default_text</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">pattern</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">search_dirs</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"s2\">&quot;pages&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span
    class=\"nv\">prompt_title</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Backlinks for [[&quot;</span><span
    class=\"w\"> </span><span class=\"o\">..</span><span class=\"w\"> </span><span
    class=\"nv\">slug</span><span class=\"w\"> </span><span class=\"o\">..</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;]]&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">    </span><span class=\"nv\">additional_args</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;--pcre2&quot;</span><span class=\"w\">
    </span><span class=\"p\">},</span>\n<span class=\"w\">  </span><span class=\"p\">})</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"c1\">-- Create user command for copying
    previous daily note wikilink</span>\n<span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">api</span><span class=\"p\">.</span><span class=\"nf\">nvim_create_user_command</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;CopyPreviousDailyLink&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">M</span><span
    class=\"p\">.</span><span class=\"py\">copy_previous_daily_wikilink</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{})</span>\n\n<span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"nv\">M</span>\n</pre></div>\n\n</pre>\n\n\n
    \       </div>\n    </main>\n\n</div>\n     </body>\n</html>"
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
    Code\n\nMy dotfiles are private at the moment for work reasons, and the plugin
    is in\nthere but here's the start of the code!\n\n```lua\n\n---@diagnostic disable:
    undefined-global\n-- vim is a global in Neovim Lua scripts\nlocal M = {}\n\nfunction
    M.check_and_open_daily_note()\n  local daily_dir = \"pages/daily\"\n  local today
    = os.date(\"%Y-%m-%d\")\n  local pattern = string.format(\"%s/%s*-notes.md\",
    daily_dir, today)\n  -- Check if today's note exists\n  local files = vim.fn.glob(pattern,
    false, true)\n\n  if vim.tbl_isempty(files) then\n    -- Create new note via copier\n
    \   os.execute(\"copier copy ~/dotfiles/copier/.copier_templates/daily .\")\n\n
    \   -- Re-glob to get the new file (may need to wait a moment for creation)\n
    \   vim.wait(500, function()\n      return not vim.tbl_isempty(vim.fn.glob(pattern,
    false, true))\n    end, 10)\n\n    files = vim.fn.glob(pattern, false, true)\n
    \ end\n\n  -- Open the note (if multiple, just pick the first)\n  if not vim.tbl_isempty(files)
    then\n    vim.cmd(\"edit \" .. files[1])\n  else\n    print(\"Failed to find or
    create today's note.\")\n  end\n  vim.cmd(\"mode\")\nend\n\n-- Find and copy a
    wikilink to the most recent previous daily note\nfunction M.copy_previous_daily_wikilink()\n
    \ local daily_dir = \"pages/daily\"\n  local today = os.date(\"%Y-%m-%d\")\n\n
    \ -- Get all daily note files\n  local pattern = string.format(\"%s/*-notes.md\",
    daily_dir)\n  local all_files = vim.fn.glob(pattern, false, true)\n\n  if vim.tbl_isempty(all_files)
    then\n    vim.notify(\"No daily notes found\", vim.log.levels.WARN)\n    return\n
    \ end\n\n  -- Sort files by date (newest first)\n  table.sort(all_files, function(a,
    b)\n    -- Extract dates from filenames\n    local date_a = a:match(\"/(%d%d%d%d%-%d%d%-%d%d)\")\n
    \   local date_b = b:match(\"/(%d%d%d%d%-%d%d%-%d%d)\")\n\n    if not date_a or
    not date_b then\n      return false\n    end\n\n    return date_a > date_b\n  end)\n\n
    \ -- Find the most recent note before today\n  local previous_note = nil\n  for
    _, file in ipairs(all_files) do\n    local date = file:match(\"/(%d%d%d%d%-%d%d%-%d%d)\")\n
    \   if date and date < today then\n      previous_note = file\n      break\n    end\n
    \ end\n\n  if not previous_note then\n    vim.notify(\"No previous daily notes
    found\", vim.log.levels.WARN)\n    return\n  end\n\n  -- Extract the slug (filename
    without extension)\n  local filename = vim.fn.fnamemodify(previous_note, \":t\")\n
    \ local slug = filename:match(\"(.+)%..+$\") or filename\n\n  -- Create wikilink
    format\n  local wikilink = \"[[ \" .. slug .. \" ]]\"\n\n  -- Copy to system clipboard\n
    \ vim.fn.setreg(\"+\", wikilink)\n  vim.notify(\"Copied previous daily note link:
    \" .. wikilink, vim.log.levels.INFO)\nend\n\nfunction M.find_daily_files()\n  require(\"telescope.builtin\").find_files({\n
    \   cwd = \"pages/daily\",\n    sorting_strategy = \"ascending\",\n  })\nend\n\nfunction
    M.find_backlinks()\n  local slug = vim.fn.expand(\"%:t:r\")\n  if slug == \"\"
    then\n    print(\"Cannot find backlinks for a file without a name.\")\n    return\n
    \ end\n\n  local pattern = string.format(\"\\\\[\\\\[[\\\\s]*%s[\\\\s]*\\\\]\\\\]\",
    slug)\n  require(\"telescope.builtin\").live_grep({\n    default_text = pattern,\n
    \   search_dirs = { \"pages\" },\n    prompt_title = \"Backlinks for [[\" .. slug
    .. \"]]\",\n    additional_args = { \"--pcre2\" },\n  })\nend\n\n-- Create user
    command for copying previous daily note wikilink\nvim.api.nvim_create_user_command(\"CopyPreviousDailyLink\",
    M.copy_previous_daily_wikilink, {})\n\nreturn M\n```\n"
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

My dotfiles are private at the moment for work reasons, and the plugin is in
there but here's the start of the code!

```lua

---@diagnostic disable: undefined-global
-- vim is a global in Neovim Lua scripts
local M = {}

function M.check_and_open_daily_note()
  local daily_dir = "pages/daily"
  local today = os.date("%Y-%m-%d")
  local pattern = string.format("%s/%s*-notes.md", daily_dir, today)
  -- Check if today's note exists
  local files = vim.fn.glob(pattern, false, true)

  if vim.tbl_isempty(files) then
    -- Create new note via copier
    os.execute("copier copy ~/dotfiles/copier/.copier_templates/daily .")

    -- Re-glob to get the new file (may need to wait a moment for creation)
    vim.wait(500, function()
      return not vim.tbl_isempty(vim.fn.glob(pattern, false, true))
    end, 10)

    files = vim.fn.glob(pattern, false, true)
  end

  -- Open the note (if multiple, just pick the first)
  if not vim.tbl_isempty(files) then
    vim.cmd("edit " .. files[1])
  else
    print("Failed to find or create today's note.")
  end
  vim.cmd("mode")
end

-- Find and copy a wikilink to the most recent previous daily note
function M.copy_previous_daily_wikilink()
  local daily_dir = "pages/daily"
  local today = os.date("%Y-%m-%d")

  -- Get all daily note files
  local pattern = string.format("%s/*-notes.md", daily_dir)
  local all_files = vim.fn.glob(pattern, false, true)

  if vim.tbl_isempty(all_files) then
    vim.notify("No daily notes found", vim.log.levels.WARN)
    return
  end

  -- Sort files by date (newest first)
  table.sort(all_files, function(a, b)
    -- Extract dates from filenames
    local date_a = a:match("/(%d%d%d%d%-%d%d%-%d%d)")
    local date_b = b:match("/(%d%d%d%d%-%d%d%-%d%d)")

    if not date_a or not date_b then
      return false
    end

    return date_a > date_b
  end)

  -- Find the most recent note before today
  local previous_note = nil
  for _, file in ipairs(all_files) do
    local date = file:match("/(%d%d%d%d%-%d%d%-%d%d)")
    if date and date < today then
      previous_note = file
      break
    end
  end

  if not previous_note then
    vim.notify("No previous daily notes found", vim.log.levels.WARN)
    return
  end

  -- Extract the slug (filename without extension)
  local filename = vim.fn.fnamemodify(previous_note, ":t")
  local slug = filename:match("(.+)%..+$") or filename

  -- Create wikilink format
  local wikilink = "[[ " .. slug .. " ]]"

  -- Copy to system clipboard
  vim.fn.setreg("+", wikilink)
  vim.notify("Copied previous daily note link: " .. wikilink, vim.log.levels.INFO)
end

function M.find_daily_files()
  require("telescope.builtin").find_files({
    cwd = "pages/daily",
    sorting_strategy = "ascending",
  })
end

function M.find_backlinks()
  local slug = vim.fn.expand("%:t:r")
  if slug == "" then
    print("Cannot find backlinks for a file without a name.")
    return
  end

  local pattern = string.format("\\[\\[[\\s]*%s[\\s]*\\]\\]", slug)
  require("telescope.builtin").live_grep({
    default_text = pattern,
    search_dirs = { "pages" },
    prompt_title = "Backlinks for [[" .. slug .. "]]",
    additional_args = { "--pcre2" },
  })
end

-- Create user command for copying previous daily note wikilink
vim.api.nvim_create_user_command("CopyPreviousDailyLink", M.copy_previous_daily_wikilink, {})

return M
```