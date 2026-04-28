---
content: "## PC Crash\n\nDesktop crashed days ago, apparently my primary drive has
  been going bad for a while and eventually it just died.\n\n- live-booted to ubuntu
  server\n- found restic backup script to NAS\n- edited to be smaller, but did the
  backup to the NAS\n- rsync'd docker volumes to BX500 SSD which is a zfs pool\n\n-
  captured what I did on ghost at /home/nic/aurora-recovery-report.md and /home/nic/aurora-crash-disk-health-report.md\n\n###
  PLAN\n\n- [x] install ~ubunto~ Aurora on 500 GB Samsung\n- [ ] create zfs dataset
  for projects /tank/volumes/projects\n  - [ ] which disk?\n- [ ] mount zfs dataset
  /tank/volumes/projects to /home/nic/projects\n- [ ] zfs for home? probably not,
  keep home on ext4\n- [ ] mount old home and sync directly\n  - restoring old backups
  to 2TB disk, will selectively copy things over\n- [x] jetkvm key rotation\n  - I
  recovered the old id_rsa one but I'm going to simplify my ssh key usage, so sticking
  with my default key, updated this in the jetkvm /settings/advanced webui\n- [x]
  restore restic backup to a temp location `/var/docker-storage-zfs/home-restore/`\n
  \ - [ ] figure out what to keep\n    - .skm (or consolidate keys)\n    - \n    -
  ???\n- [x] install windsurf in an ubuntu distrobox\n  - [x] `distroboc create UbuntuDev
  --image=ubuntu:22.04`\n  - [x] https://windsurf.com/download/editor?os=linux\n  -
  [x] manual install method from distrobox\n  - [ ] restore .windsurf? it's super
  old...\n\n### Services\n\n- [x] speakr\n  - took it, and all the \"ai\" stack off
  'phantomlink'\n  - it came back with all my data after shifting it around disks\n-
  [ ] ollama\n  - need to repull some models I guess\n- [x] whisper_asr\n  - up just
  fine, speakr using it for transcription\n- [ ] open-webui\n  - corrupted database,
  not sure what to do\n\n### Outcome\n\nThis is going terribly... blog post coming
  on what I should've done. What's\nactually happening is that I basically just lost
  everything on that desktop\nexcept my homelab repo thank God... \n\n\n## Plans to
  build\n\n- vibe code an observability thing that\n  - runs a restore in a container\n
  \ - run some kind of setup in that container at least for my shell and neovim and
  things\n- networking for babyblue-aurora -> aurora transition\n- lament draft posts
  that are lost\n- ssh keys... lost .skm directory, look if it's copied anywhere otherwise
  rotate keys and simplify\n- workspace backup everynight... abuse git for this\n
  \ - or rsync to external drive, you have zfs on aurora now\n- opencode to address
  neovim logs\n- switch to zellij?\n  - what would have to translate from tmux? probably
  quite a few keybindings\n\n\nI've been drowning in anxiety and depression over tech
  and AI, work and requirements, and my desktop SSD catastrophically failing while
  I didn't have an up to date backup... projects, ssh keys, ideas... gone. And that's
  ok, life goes on, so here's my start of a hectic list of what I'm doing to setup
  my desktop again. This will turn into a small post, a sister-post to the one I need
  to write about how I should've recovered from my live boot environment"
date: 2026-04-22
description: PC Crash Desktop crashed days ago, apparently my primary drive has been
  going bad for a while and eventually it just died. live-booted to ubuntu server
  found re
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Desktop Crash 2026</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"PC Crash Desktop crashed days ago, apparently
    my primary drive has been going bad for a while and eventually it just died. live-booted
    to ubuntu server found re\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Desktop Crash 2026 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/desktop-crash-2026\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Desktop Crash 2026 | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"PC Crash Desktop crashed days ago, apparently my primary drive has been
    going bad for a while and eventually it just died. live-booted to ubuntu server
    found re\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/desktop-crash-2026</span>\n        </div>\n
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
    mb-4 post-title-large\">Desktop Crash 2026</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-22\">\n            April
    22, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/advent/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #advent\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"pc-crash\">PC Crash <a class=\"header-anchor\"
    href=\"#pc-crash\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Desktop crashed days
    ago, apparently my primary drive has been going bad for a while and eventually
    it just died.</p>\n<ul>\n<li>\n<p>live-booted to ubuntu server</p>\n</li>\n<li>\n<p>found
    restic backup script to NAS</p>\n</li>\n<li>\n<p>edited to be smaller, but did
    the backup to the NAS</p>\n</li>\n<li>\n<p>rsync'd docker volumes to BX500 SSD
    which is a zfs pool</p>\n</li>\n<li>\n<p>captured what I did on ghost at /home/nic/aurora-recovery-report.md
    and /home/nic/aurora-crash-disk-health-report.md</p>\n</li>\n</ul>\n<h3>PLAN</h3>\n<ul>\n<li>[x]
    install ~ubunto~ Aurora on 500 GB Samsung</li>\n<li>[ ] create zfs dataset for
    projects /tank/volumes/projects\n<ul>\n<li>[ ] which disk?</li>\n</ul>\n</li>\n<li>[
    ] mount zfs dataset /tank/volumes/projects to /home/nic/projects</li>\n<li>[ ]
    zfs for home? probably not, keep home on ext4</li>\n<li>[ ] mount old home and
    sync directly\n<ul>\n<li>restoring old backups to 2TB disk, will selectively copy
    things over</li>\n</ul>\n</li>\n<li>[x] jetkvm key rotation\n<ul>\n<li>I recovered
    the old id_rsa one but I'm going to simplify my ssh key usage, so sticking with
    my default key, updated this in the jetkvm /settings/advanced webui</li>\n</ul>\n</li>\n<li>[x]
    restore restic backup to a temp location <code>/var/docker-storage-zfs/home-restore/</code>\n<ul>\n<li>[
    ] figure out what to keep\n<ul>\n<li>.skm (or consolidate keys)</li>\n<li></li>\n<li>???</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>[x]
    install windsurf in an ubuntu distrobox\n<ul>\n<li>[x] <code>distroboc create
    UbuntuDev --image=ubuntu:22.04</code></li>\n<li>[x] <a href=\"https://windsurf.com/download/editor?os=linux\">https://windsurf.com/download/editor?os=linux</a></li>\n<li>[x]
    manual install method from distrobox</li>\n<li>[ ] restore .windsurf? it's super
    old...</li>\n</ul>\n</li>\n</ul>\n<h3>Services</h3>\n<ul>\n<li>[x] speakr\n<ul>\n<li>took
    it, and all the &quot;ai&quot; stack off 'phantomlink'</li>\n<li>it came back
    with all my data after shifting it around disks</li>\n</ul>\n</li>\n<li>[ ] ollama\n<ul>\n<li>need
    to repull some models I guess</li>\n</ul>\n</li>\n<li>[x] whisper_asr\n<ul>\n<li>up
    just fine, speakr using it for transcription</li>\n</ul>\n</li>\n<li>[ ] open-webui\n<ul>\n<li>corrupted
    database, not sure what to do</li>\n</ul>\n</li>\n</ul>\n<h3>Outcome</h3>\n<p>This
    is going terribly... blog post coming on what I should've done. What's\nactually
    happening is that I basically just lost everything on that desktop\nexcept my
    homelab repo thank God...</p>\n<h2 id=\"plans-to-build\">Plans to build <a class=\"header-anchor\"
    href=\"#plans-to-build\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>vibe code an
    observability thing that\n<ul>\n<li>runs a restore in a container</li>\n<li>run
    some kind of setup in that container at least for my shell and neovim and things</li>\n</ul>\n</li>\n<li>networking
    for babyblue-aurora -&gt; aurora transition</li>\n<li>lament draft posts that
    are lost</li>\n<li>ssh keys... lost .skm directory, look if it's copied anywhere
    otherwise rotate keys and simplify</li>\n<li>workspace backup everynight... abuse
    git for this\n<ul>\n<li>or rsync to external drive, you have zfs on aurora now</li>\n</ul>\n</li>\n<li>opencode
    to address neovim logs</li>\n<li>switch to zellij?\n<ul>\n<li>what would have
    to translate from tmux? probably quite a few keybindings</li>\n</ul>\n</li>\n</ul>\n<p>I've
    been drowning in anxiety and depression over tech and AI, work and requirements,
    and my desktop SSD catastrophically failing while I didn't have an up to date
    backup... projects, ssh keys, ideas... gone. And that's ok, life goes on, so here's
    my start of a hectic list of what I'm doing to setup my desktop again. This will
    turn into a small post, a sister-post to the one I need to write about how I should've
    recovered from my live boot environment</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Desktop Crash 2026</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"PC Crash Desktop crashed days ago, apparently
    my primary drive has been going bad for a while and eventually it just died. live-booted
    to ubuntu server found re\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Desktop Crash 2026 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/desktop-crash-2026\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Desktop Crash 2026 | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"PC Crash Desktop crashed days ago, apparently my primary drive has been
    going bad for a while and eventually it just died. live-booted to ubuntu server
    found re\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Desktop Crash 2026</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-22\">\n            April
    22, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/advent/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #advent\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Desktop Crash 2026</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-22\">\n            April
    22, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/advent/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #advent\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"pc-crash\">PC Crash <a class=\"header-anchor\"
    href=\"#pc-crash\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Desktop crashed days
    ago, apparently my primary drive has been going bad for a while and eventually
    it just died.</p>\n<ul>\n<li>\n<p>live-booted to ubuntu server</p>\n</li>\n<li>\n<p>found
    restic backup script to NAS</p>\n</li>\n<li>\n<p>edited to be smaller, but did
    the backup to the NAS</p>\n</li>\n<li>\n<p>rsync'd docker volumes to BX500 SSD
    which is a zfs pool</p>\n</li>\n<li>\n<p>captured what I did on ghost at /home/nic/aurora-recovery-report.md
    and /home/nic/aurora-crash-disk-health-report.md</p>\n</li>\n</ul>\n<h3>PLAN</h3>\n<ul>\n<li>[x]
    install ~ubunto~ Aurora on 500 GB Samsung</li>\n<li>[ ] create zfs dataset for
    projects /tank/volumes/projects\n<ul>\n<li>[ ] which disk?</li>\n</ul>\n</li>\n<li>[
    ] mount zfs dataset /tank/volumes/projects to /home/nic/projects</li>\n<li>[ ]
    zfs for home? probably not, keep home on ext4</li>\n<li>[ ] mount old home and
    sync directly\n<ul>\n<li>restoring old backups to 2TB disk, will selectively copy
    things over</li>\n</ul>\n</li>\n<li>[x] jetkvm key rotation\n<ul>\n<li>I recovered
    the old id_rsa one but I'm going to simplify my ssh key usage, so sticking with
    my default key, updated this in the jetkvm /settings/advanced webui</li>\n</ul>\n</li>\n<li>[x]
    restore restic backup to a temp location <code>/var/docker-storage-zfs/home-restore/</code>\n<ul>\n<li>[
    ] figure out what to keep\n<ul>\n<li>.skm (or consolidate keys)</li>\n<li></li>\n<li>???</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>[x]
    install windsurf in an ubuntu distrobox\n<ul>\n<li>[x] <code>distroboc create
    UbuntuDev --image=ubuntu:22.04</code></li>\n<li>[x] <a href=\"https://windsurf.com/download/editor?os=linux\">https://windsurf.com/download/editor?os=linux</a></li>\n<li>[x]
    manual install method from distrobox</li>\n<li>[ ] restore .windsurf? it's super
    old...</li>\n</ul>\n</li>\n</ul>\n<h3>Services</h3>\n<ul>\n<li>[x] speakr\n<ul>\n<li>took
    it, and all the &quot;ai&quot; stack off 'phantomlink'</li>\n<li>it came back
    with all my data after shifting it around disks</li>\n</ul>\n</li>\n<li>[ ] ollama\n<ul>\n<li>need
    to repull some models I guess</li>\n</ul>\n</li>\n<li>[x] whisper_asr\n<ul>\n<li>up
    just fine, speakr using it for transcription</li>\n</ul>\n</li>\n<li>[ ] open-webui\n<ul>\n<li>corrupted
    database, not sure what to do</li>\n</ul>\n</li>\n</ul>\n<h3>Outcome</h3>\n<p>This
    is going terribly... blog post coming on what I should've done. What's\nactually
    happening is that I basically just lost everything on that desktop\nexcept my
    homelab repo thank God...</p>\n<h2 id=\"plans-to-build\">Plans to build <a class=\"header-anchor\"
    href=\"#plans-to-build\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>vibe code an
    observability thing that\n<ul>\n<li>runs a restore in a container</li>\n<li>run
    some kind of setup in that container at least for my shell and neovim and things</li>\n</ul>\n</li>\n<li>networking
    for babyblue-aurora -&gt; aurora transition</li>\n<li>lament draft posts that
    are lost</li>\n<li>ssh keys... lost .skm directory, look if it's copied anywhere
    otherwise rotate keys and simplify</li>\n<li>workspace backup everynight... abuse
    git for this\n<ul>\n<li>or rsync to external drive, you have zfs on aurora now</li>\n</ul>\n</li>\n<li>opencode
    to address neovim logs</li>\n<li>switch to zellij?\n<ul>\n<li>what would have
    to translate from tmux? probably quite a few keybindings</li>\n</ul>\n</li>\n</ul>\n<p>I've
    been drowning in anxiety and depression over tech and AI, work and requirements,
    and my desktop SSD catastrophically failing while I didn't have an up to date
    backup... projects, ssh keys, ideas... gone. And that's ok, life goes on, so here's
    my start of a hectic list of what I'm doing to setup my desktop again. This will
    turn into a small post, a sister-post to the one I need to write about how I should've
    recovered from my live boot environment</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Desktop
    Crash 2026</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"PC Crash Desktop crashed
    days ago, apparently my primary drive has been going bad for a while and eventually
    it just died. live-booted to ubuntu server found re\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Desktop Crash 2026 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/desktop-crash-2026\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Desktop Crash 2026 | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"PC Crash Desktop crashed days ago, apparently my primary drive has been
    going bad for a while and eventually it just died. live-booted to ubuntu server
    found re\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/desktop-crash-2026</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"pc-crash\">PC
    Crash <a class=\"header-anchor\" href=\"#pc-crash\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Desktop crashed days
    ago, apparently my primary drive has been going bad for a while and eventually
    it just died.</p>\n<ul>\n<li>\n<p>live-booted to ubuntu server</p>\n</li>\n<li>\n<p>found
    restic backup script to NAS</p>\n</li>\n<li>\n<p>edited to be smaller, but did
    the backup to the NAS</p>\n</li>\n<li>\n<p>rsync'd docker volumes to BX500 SSD
    which is a zfs pool</p>\n</li>\n<li>\n<p>captured what I did on ghost at /home/nic/aurora-recovery-report.md
    and /home/nic/aurora-crash-disk-health-report.md</p>\n</li>\n</ul>\n<h3>PLAN</h3>\n<ul>\n<li>[x]
    install ~ubunto~ Aurora on 500 GB Samsung</li>\n<li>[ ] create zfs dataset for
    projects /tank/volumes/projects\n<ul>\n<li>[ ] which disk?</li>\n</ul>\n</li>\n<li>[
    ] mount zfs dataset /tank/volumes/projects to /home/nic/projects</li>\n<li>[ ]
    zfs for home? probably not, keep home on ext4</li>\n<li>[ ] mount old home and
    sync directly\n<ul>\n<li>restoring old backups to 2TB disk, will selectively copy
    things over</li>\n</ul>\n</li>\n<li>[x] jetkvm key rotation\n<ul>\n<li>I recovered
    the old id_rsa one but I'm going to simplify my ssh key usage, so sticking with
    my default key, updated this in the jetkvm /settings/advanced webui</li>\n</ul>\n</li>\n<li>[x]
    restore restic backup to a temp location <code>/var/docker-storage-zfs/home-restore/</code>\n<ul>\n<li>[
    ] figure out what to keep\n<ul>\n<li>.skm (or consolidate keys)</li>\n<li></li>\n<li>???</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>[x]
    install windsurf in an ubuntu distrobox\n<ul>\n<li>[x] <code>distroboc create
    UbuntuDev --image=ubuntu:22.04</code></li>\n<li>[x] <a href=\"https://windsurf.com/download/editor?os=linux\">https://windsurf.com/download/editor?os=linux</a></li>\n<li>[x]
    manual install method from distrobox</li>\n<li>[ ] restore .windsurf? it's super
    old...</li>\n</ul>\n</li>\n</ul>\n<h3>Services</h3>\n<ul>\n<li>[x] speakr\n<ul>\n<li>took
    it, and all the &quot;ai&quot; stack off 'phantomlink'</li>\n<li>it came back
    with all my data after shifting it around disks</li>\n</ul>\n</li>\n<li>[ ] ollama\n<ul>\n<li>need
    to repull some models I guess</li>\n</ul>\n</li>\n<li>[x] whisper_asr\n<ul>\n<li>up
    just fine, speakr using it for transcription</li>\n</ul>\n</li>\n<li>[ ] open-webui\n<ul>\n<li>corrupted
    database, not sure what to do</li>\n</ul>\n</li>\n</ul>\n<h3>Outcome</h3>\n<p>This
    is going terribly... blog post coming on what I should've done. What's\nactually
    happening is that I basically just lost everything on that desktop\nexcept my
    homelab repo thank God...</p>\n<h2 id=\"plans-to-build\">Plans to build <a class=\"header-anchor\"
    href=\"#plans-to-build\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>vibe code an
    observability thing that\n<ul>\n<li>runs a restore in a container</li>\n<li>run
    some kind of setup in that container at least for my shell and neovim and things</li>\n</ul>\n</li>\n<li>networking
    for babyblue-aurora -&gt; aurora transition</li>\n<li>lament draft posts that
    are lost</li>\n<li>ssh keys... lost .skm directory, look if it's copied anywhere
    otherwise rotate keys and simplify</li>\n<li>workspace backup everynight... abuse
    git for this\n<ul>\n<li>or rsync to external drive, you have zfs on aurora now</li>\n</ul>\n</li>\n<li>opencode
    to address neovim logs</li>\n<li>switch to zellij?\n<ul>\n<li>what would have
    to translate from tmux? probably quite a few keybindings</li>\n</ul>\n</li>\n</ul>\n<p>I've
    been drowning in anxiety and depression over tech and AI, work and requirements,
    and my desktop SSD catastrophically failing while I didn't have an up to date
    backup... projects, ssh keys, ideas... gone. And that's ok, life goes on, so here's
    my start of a hectic list of what I'm doing to setup my desktop again. This will
    turn into a small post, a sister-post to the one I need to write about how I should've
    recovered from my live boot environment</p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2026-04-22 05:57:40\ntemplateKey: note\ntitle: Desktop Crash
    2026\npublished: False\ntags:\n  - advent\n  - note\n---\n\n## PC Crash\n\nDesktop
    crashed days ago, apparently my primary drive has been going bad for a while and
    eventually it just died.\n\n- live-booted to ubuntu server\n- found restic backup
    script to NAS\n- edited to be smaller, but did the backup to the NAS\n- rsync'd
    docker volumes to BX500 SSD which is a zfs pool\n\n- captured what I did on ghost
    at /home/nic/aurora-recovery-report.md and /home/nic/aurora-crash-disk-health-report.md\n\n###
    PLAN\n\n- [x] install ~ubunto~ Aurora on 500 GB Samsung\n- [ ] create zfs dataset
    for projects /tank/volumes/projects\n  - [ ] which disk?\n- [ ] mount zfs dataset
    /tank/volumes/projects to /home/nic/projects\n- [ ] zfs for home? probably not,
    keep home on ext4\n- [ ] mount old home and sync directly\n  - restoring old backups
    to 2TB disk, will selectively copy things over\n- [x] jetkvm key rotation\n  -
    I recovered the old id_rsa one but I'm going to simplify my ssh key usage, so
    sticking with my default key, updated this in the jetkvm /settings/advanced webui\n-
    [x] restore restic backup to a temp location `/var/docker-storage-zfs/home-restore/`\n
    \ - [ ] figure out what to keep\n    - .skm (or consolidate keys)\n    - \n    -
    ???\n- [x] install windsurf in an ubuntu distrobox\n  - [x] `distroboc create
    UbuntuDev --image=ubuntu:22.04`\n  - [x] https://windsurf.com/download/editor?os=linux\n
    \ - [x] manual install method from distrobox\n  - [ ] restore .windsurf? it's
    super old...\n\n### Services\n\n- [x] speakr\n  - took it, and all the \"ai\"
    stack off 'phantomlink'\n  - it came back with all my data after shifting it around
    disks\n- [ ] ollama\n  - need to repull some models I guess\n- [x] whisper_asr\n
    \ - up just fine, speakr using it for transcription\n- [ ] open-webui\n  - corrupted
    database, not sure what to do\n\n### Outcome\n\nThis is going terribly... blog
    post coming on what I should've done. What's\nactually happening is that I basically
    just lost everything on that desktop\nexcept my homelab repo thank God... \n\n\n##
    Plans to build\n\n- vibe code an observability thing that\n  - runs a restore
    in a container\n  - run some kind of setup in that container at least for my shell
    and neovim and things\n- networking for babyblue-aurora -> aurora transition\n-
    lament draft posts that are lost\n- ssh keys... lost .skm directory, look if it's
    copied anywhere otherwise rotate keys and simplify\n- workspace backup everynight...
    abuse git for this\n  - or rsync to external drive, you have zfs on aurora now\n-
    opencode to address neovim logs\n- switch to zellij?\n  - what would have to translate
    from tmux? probably quite a few keybindings\n\n\nI've been drowning in anxiety
    and depression over tech and AI, work and requirements, and my desktop SSD catastrophically
    failing while I didn't have an up to date backup... projects, ssh keys, ideas...
    gone. And that's ok, life goes on, so here's my start of a hectic list of what
    I'm doing to setup my desktop again. This will turn into a small post, a sister-post
    to the one I need to write about how I should've recovered from my live boot environment\n"
published: false
slug: desktop-crash-2026
title: Desktop Crash 2026


---

## PC Crash

Desktop crashed days ago, apparently my primary drive has been going bad for a while and eventually it just died.

- live-booted to ubuntu server
- found restic backup script to NAS
- edited to be smaller, but did the backup to the NAS
- rsync'd docker volumes to BX500 SSD which is a zfs pool

- captured what I did on ghost at /home/nic/aurora-recovery-report.md and /home/nic/aurora-crash-disk-health-report.md

### PLAN

- [x] install ~ubunto~ Aurora on 500 GB Samsung
- [ ] create zfs dataset for projects /tank/volumes/projects
  - [ ] which disk?
- [ ] mount zfs dataset /tank/volumes/projects to /home/nic/projects
- [ ] zfs for home? probably not, keep home on ext4
- [ ] mount old home and sync directly
  - restoring old backups to 2TB disk, will selectively copy things over
- [x] jetkvm key rotation
  - I recovered the old id_rsa one but I'm going to simplify my ssh key usage, so sticking with my default key, updated this in the jetkvm /settings/advanced webui
- [x] restore restic backup to a temp location `/var/docker-storage-zfs/home-restore/`
  - [ ] figure out what to keep
    - .skm (or consolidate keys)
    - 
    - ???
- [x] install windsurf in an ubuntu distrobox
  - [x] `distroboc create UbuntuDev --image=ubuntu:22.04`
  - [x] https://windsurf.com/download/editor?os=linux
  - [x] manual install method from distrobox
  - [ ] restore .windsurf? it's super old...

### Services

- [x] speakr
  - took it, and all the "ai" stack off 'phantomlink'
  - it came back with all my data after shifting it around disks
- [ ] ollama
  - need to repull some models I guess
- [x] whisper_asr
  - up just fine, speakr using it for transcription
- [ ] open-webui
  - corrupted database, not sure what to do

### Outcome

This is going terribly... blog post coming on what I should've done. What's
actually happening is that I basically just lost everything on that desktop
except my homelab repo thank God... 


## Plans to build

- vibe code an observability thing that
  - runs a restore in a container
  - run some kind of setup in that container at least for my shell and neovim and things
- networking for babyblue-aurora -> aurora transition
- lament draft posts that are lost
- ssh keys... lost .skm directory, look if it's copied anywhere otherwise rotate keys and simplify
- workspace backup everynight... abuse git for this
  - or rsync to external drive, you have zfs on aurora now
- opencode to address neovim logs
- switch to zellij?
  - what would have to translate from tmux? probably quite a few keybindings


I've been drowning in anxiety and depression over tech and AI, work and requirements, and my desktop SSD catastrophically failing while I didn't have an up to date backup... projects, ssh keys, ideas... gone. And that's ok, life goes on, so here's my start of a hectic list of what I'm doing to setup my desktop again. This will turn into a small post, a sister-post to the one I need to write about how I should've recovered from my live boot environment