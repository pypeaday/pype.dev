---
content: "## Git is for everyone\n\nI just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)\npodcast
  and would recommend it after 2 episodes. In the first episode, the\nhosts discuss
  where the term `localfirst` comes from, what it means, and\nexamples of some localfirst,
  or semi-localfirst projects. One of them is `git`\n\n- the de-facto standard by
  which developers share code today.\n\nThere's a reason it's the standard. I'm not
  arguing that it's perfect, and\nthere's new abstractions that may help people adopt
  usage like\n[jujutsu](https://github.com/jj-vcs/jj), but ultimately `git` is a great
  tool,\nand anyone can use it who works with text files (lookin at you book-writing\nnerds)\n\nBut
  as I was enjoying the pod the co-host/guest said \"and we all know the git user\nexperience
  isn't that great\"\n\n!!! danger \"heavy sigh\"\n\n    Git isn't that hard - you
  probably just aren't that good at it\n\n## It's OK\n\nDon't hear me say that you
  suck at git like that's a bad thing... It's _totally\nfine_ to not be a wizard.
  Many people can use git like 80-90% efficiently for\ntheir own use cases. In fact,
  my usage of git doesn't fall into any perfectly\nestablished patterns, and the decisions
  I make are not always the same (the\noverplayed rebase vs merge-upstream argument...
  I do both, it doesn't matter,\nsquash your crap at the end anyways...)\n\nSo continue
  to collaborate - checkout your feature branches, pull in\n`origin/main` after a
  PR, ask for help with a rebase for the 69th time if you\nneed to\n\n!!! danger \"\"\n\n
  \   But quit your stupid annoying bitching\n\n## Seriously\n\nHonestly, I learned
  _about_ git 8 years ago when I started my first job as a\ndata scientist. I was
  told by another developer, Jokko,\nthat it was the standard for collaboration...
  only issue was that almost no one\nin our division even used it. Or if they did
  it was at the end of a project,\nafter sharing code on share drives and OneDrive,
  at the very end we'd see `git\ninit`, `git add .`, `git commit -m \"pushed to git\"`,
  `git push`... literally 0\nvalue, or at least no more value than\n`my_project_final_FINAL_v2_project-over-now.zip`\n\nIt
  took me a few weeks of on-the-job git usage, practicing way over complicated\ngit
  flows and talking about git with the few people around me who knew it, for\nme to
  become a go-to resource... I was and am honestly still annoyed about\nit... It didn't
  take that long, or that much effort, to get pretty comfortable\nwith git. There's
  tons of UIs (with their own flaws), TUIs, and resources for\nlearning the few things
  that will make you stand out as a git wizard:\n\n1. can you rebase onto a new root
  commit?\n2. can you pull in changes from someone else's feature branch?\n3. if you
  find yourself in `detached HEAD state` are you panicked?\n\nJust make a directory,
  `git init`, and start shitting all over text files...\nmake branches, reconcile
  differences, just freaking practice for 10 minutes\n\n## End\n\nI was triggered
  I guess listening to this podcast episode... It's fine to not\nbe an expert, it's
  fine to just use the 3 or 4 commands you probably need (`git\ncheckout -b, rebase
  origin/main, merge feature/branch, push`), I am happy to\nhelp people with git everyday
  - like I said above, I am somehow a go-to\nresource for git in my workplace....
  (heck, even one of my managers asks me to\nsquash all the commits on his feature
  branches for him before it's merged to\nmain... it's fine)\n\nBut the user experience
  isn't bad, so quit your bitching.\n\n---\n\n??? note \"phone notes\"\n\n    hot
  take, if you complain about git then you don't it... and that's fine but\n    shut
  up. I love git,I use it in a way that's productive for me, and when I hear\n    people
  complain all they ever say is \"git is hard\" and \"why is rebasing so\n    hard?!?!\"\n
  \   but they don't get it, and that's fine. you can use git inefficiently, as a\n
  \   requirement of your job, and not enjoy it. but don't bitch, because with 10\n
  \   minutes of practice you could gain some real fluency in rebasing"
date: 2025-07-21
description: 'Git is for everyone I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)

  podcast and would recommend it after 2 episodes. In the firs'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>You suck at git
    - but it's honestly fine</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Git is for everyone I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)\npodcast
    and would recommend it after 2 episodes. In the firs\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"You suck at git - but it's honestly fine | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/you-suck-at-git-but-its-honestly-fine\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"You suck at git - but it's honestly fine | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Git is for everyone I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)\npodcast
    and would recommend it after 2 episodes. In the firs\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"
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
    \           <span class=\"site-terminal__dir\">~/you-suck-at-git-but-its-honestly-fine</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"
    alt=\"You suck at git - but it's honestly fine cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">You
    suck at git - but it's honestly fine</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-21\">\n            July
    21, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/git/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #git\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"git-is-for-everyone\">Git is
    for everyone <a class=\"header-anchor\" href=\"#git-is-for-everyone\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I just started listening
    to <a href=\"https://www.localfirst.fm/\">localfirst.fm podcast</a>\npodcast and
    would recommend it after 2 episodes. In the first episode, the\nhosts discuss
    where the term <code>localfirst</code> comes from, what it means, and\nexamples
    of some localfirst, or semi-localfirst projects. One of them is <code>git</code></p>\n<ul>\n<li>the
    de-facto standard by which developers share code today.</li>\n</ul>\n<p>There's
    a reason it's the standard. I'm not arguing that it's perfect, and\nthere's new
    abstractions that may help people adopt usage like\n<a href=\"https://github.com/jj-vcs/jj\">jujutsu</a>,
    but ultimately <code>git</code> is a great tool,\nand anyone can use it who works
    with text files (lookin at you book-writing\nnerds)</p>\n<p>But as I was enjoying
    the pod the co-host/guest said &quot;and we all know the git user\nexperience
    isn't that great&quot;</p>\n<div class=\"admonition danger\">\n<p class=\"admonition-title\">heavy
    sigh</p>\n<p>Git isn't that hard - you probably just aren't that good at it</p>\n</div>\n<h2
    id=\"its-ok\">It's OK <a class=\"header-anchor\" href=\"#its-ok\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Don't hear me say that
    you suck at git like that's a bad thing... It's <em>totally\nfine</em> to not
    be a wizard. Many people can use git like 80-90% efficiently for\ntheir own use
    cases. In fact, my usage of git doesn't fall into any perfectly\nestablished patterns,
    and the decisions I make are not always the same (the\noverplayed rebase vs merge-upstream
    argument... I do both, it doesn't matter,\nsquash your crap at the end anyways...)</p>\n<p>So
    continue to collaborate - checkout your feature branches, pull in\n<code>origin/main</code>
    after a PR, ask for help with a rebase for the 69th time if you\nneed to</p>\n<div
    class=\"admonition danger\">\n<p>But quit your stupid annoying bitching</p>\n</div>\n<h2
    id=\"seriously\">Seriously <a class=\"header-anchor\" href=\"#seriously\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Honestly, I learned
    <em>about</em> git 8 years ago when I started my first job as a\ndata scientist.
    I was told by another developer, Jokko,\nthat it was the standard for collaboration...
    only issue was that almost no one\nin our division even used it. Or if they did
    it was at the end of a project,\nafter sharing code on share drives and OneDrive,
    at the very end we'd see <code>git init</code>, <code>git add .</code>, <code>git
    commit -m &quot;pushed to git&quot;</code>, <code>git push</code>... literally
    0\nvalue, or at least no more value than\n<code>my_project_final_FINAL_v2_project-over-now.zip</code></p>\n<p>It
    took me a few weeks of on-the-job git usage, practicing way over complicated\ngit
    flows and talking about git with the few people around me who knew it, for\nme
    to become a go-to resource... I was and am honestly still annoyed about\nit...
    It didn't take that long, or that much effort, to get pretty comfortable\nwith
    git. There's tons of UIs (with their own flaws), TUIs, and resources for\nlearning
    the few things that will make you stand out as a git wizard:</p>\n<ol>\n<li>can
    you rebase onto a new root commit?</li>\n<li>can you pull in changes from someone
    else's feature branch?</li>\n<li>if you find yourself in <code>detached HEAD state</code>
    are you panicked?</li>\n</ol>\n<p>Just make a directory, <code>git init</code>,
    and start shitting all over text files...\nmake branches, reconcile differences,
    just freaking practice for 10 minutes</p>\n<h2 id=\"end\">End <a class=\"header-anchor\"
    href=\"#end\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I was triggered I guess
    listening to this podcast episode... It's fine to not\nbe an expert, it's fine
    to just use the 3 or 4 commands you probably need (<code>git checkout -b, rebase
    origin/main, merge feature/branch, push</code>), I am happy to\nhelp people with
    git everyday - like I said above, I am somehow a go-to\nresource for git in my
    workplace.... (heck, even one of my managers asks me to\nsquash all the commits
    on his feature branches for him before it's merged to\nmain... it's fine)</p>\n<p>But
    the user experience isn't bad, so quit your bitching.</p>\n<hr />\n<div class=\"admonition
    note is-collapsible collapsible-closed\">\n<p class=\"admonition-title\">phone
    notes</p>\n<p>hot take, if you complain about git then you don't it... and that's
    fine but\nshut up. I love git,I use it in a way that's productive for me, and
    when I hear\npeople complain all they ever say is &quot;git is hard&quot; and
    &quot;why is rebasing so\nhard?!?!&quot;\nbut they don't get it, and that's fine.
    you can use git inefficiently, as a\nrequirement of your job, and not enjoy it.
    but don't bitch, because with 10\nminutes of practice you could gain some real
    fluency in rebasing</p>\n</div>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>You suck at git - but
    it's honestly fine</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Git is for everyone I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)\npodcast
    and would recommend it after 2 episodes. In the firs\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"You suck at git - but it's honestly fine | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/you-suck-at-git-but-its-honestly-fine\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"You suck at git - but it's honestly fine | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Git is for everyone I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)\npodcast
    and would recommend it after 2 episodes. In the firs\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"
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
    mb-4 post-title-large\">You suck at git - but it's honestly fine</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-21\">\n
    \           July 21, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/git/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #git\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"
    alt=\"You suck at git - but it's honestly fine cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">You
    suck at git - but it's honestly fine</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-21\">\n            July
    21, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/git/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #git\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"git-is-for-everyone\">Git is
    for everyone <a class=\"header-anchor\" href=\"#git-is-for-everyone\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I just started listening
    to <a href=\"https://www.localfirst.fm/\">localfirst.fm podcast</a>\npodcast and
    would recommend it after 2 episodes. In the first episode, the\nhosts discuss
    where the term <code>localfirst</code> comes from, what it means, and\nexamples
    of some localfirst, or semi-localfirst projects. One of them is <code>git</code></p>\n<ul>\n<li>the
    de-facto standard by which developers share code today.</li>\n</ul>\n<p>There's
    a reason it's the standard. I'm not arguing that it's perfect, and\nthere's new
    abstractions that may help people adopt usage like\n<a href=\"https://github.com/jj-vcs/jj\">jujutsu</a>,
    but ultimately <code>git</code> is a great tool,\nand anyone can use it who works
    with text files (lookin at you book-writing\nnerds)</p>\n<p>But as I was enjoying
    the pod the co-host/guest said &quot;and we all know the git user\nexperience
    isn't that great&quot;</p>\n<div class=\"admonition danger\">\n<p class=\"admonition-title\">heavy
    sigh</p>\n<p>Git isn't that hard - you probably just aren't that good at it</p>\n</div>\n<h2
    id=\"its-ok\">It's OK <a class=\"header-anchor\" href=\"#its-ok\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Don't hear me say that
    you suck at git like that's a bad thing... It's <em>totally\nfine</em> to not
    be a wizard. Many people can use git like 80-90% efficiently for\ntheir own use
    cases. In fact, my usage of git doesn't fall into any perfectly\nestablished patterns,
    and the decisions I make are not always the same (the\noverplayed rebase vs merge-upstream
    argument... I do both, it doesn't matter,\nsquash your crap at the end anyways...)</p>\n<p>So
    continue to collaborate - checkout your feature branches, pull in\n<code>origin/main</code>
    after a PR, ask for help with a rebase for the 69th time if you\nneed to</p>\n<div
    class=\"admonition danger\">\n<p>But quit your stupid annoying bitching</p>\n</div>\n<h2
    id=\"seriously\">Seriously <a class=\"header-anchor\" href=\"#seriously\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Honestly, I learned
    <em>about</em> git 8 years ago when I started my first job as a\ndata scientist.
    I was told by another developer, Jokko,\nthat it was the standard for collaboration...
    only issue was that almost no one\nin our division even used it. Or if they did
    it was at the end of a project,\nafter sharing code on share drives and OneDrive,
    at the very end we'd see <code>git init</code>, <code>git add .</code>, <code>git
    commit -m &quot;pushed to git&quot;</code>, <code>git push</code>... literally
    0\nvalue, or at least no more value than\n<code>my_project_final_FINAL_v2_project-over-now.zip</code></p>\n<p>It
    took me a few weeks of on-the-job git usage, practicing way over complicated\ngit
    flows and talking about git with the few people around me who knew it, for\nme
    to become a go-to resource... I was and am honestly still annoyed about\nit...
    It didn't take that long, or that much effort, to get pretty comfortable\nwith
    git. There's tons of UIs (with their own flaws), TUIs, and resources for\nlearning
    the few things that will make you stand out as a git wizard:</p>\n<ol>\n<li>can
    you rebase onto a new root commit?</li>\n<li>can you pull in changes from someone
    else's feature branch?</li>\n<li>if you find yourself in <code>detached HEAD state</code>
    are you panicked?</li>\n</ol>\n<p>Just make a directory, <code>git init</code>,
    and start shitting all over text files...\nmake branches, reconcile differences,
    just freaking practice for 10 minutes</p>\n<h2 id=\"end\">End <a class=\"header-anchor\"
    href=\"#end\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I was triggered I guess
    listening to this podcast episode... It's fine to not\nbe an expert, it's fine
    to just use the 3 or 4 commands you probably need (<code>git checkout -b, rebase
    origin/main, merge feature/branch, push</code>), I am happy to\nhelp people with
    git everyday - like I said above, I am somehow a go-to\nresource for git in my
    workplace.... (heck, even one of my managers asks me to\nsquash all the commits
    on his feature branches for him before it's merged to\nmain... it's fine)</p>\n<p>But
    the user experience isn't bad, so quit your bitching.</p>\n<hr />\n<div class=\"admonition
    note is-collapsible collapsible-closed\">\n<p class=\"admonition-title\">phone
    notes</p>\n<p>hot take, if you complain about git then you don't it... and that's
    fine but\nshut up. I love git,I use it in a way that's productive for me, and
    when I hear\npeople complain all they ever say is &quot;git is hard&quot; and
    &quot;why is rebasing so\nhard?!?!&quot;\nbut they don't get it, and that's fine.
    you can use git inefficiently, as a\nrequirement of your job, and not enjoy it.
    but don't bitch, because with 10\nminutes of practice you could gain some real
    fluency in rebasing</p>\n</div>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>You suck
    at git - but it's honestly fine</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Git is for everyone I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)\npodcast
    and would recommend it after 2 episodes. In the firs\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"You suck at git - but it's honestly fine | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/you-suck-at-git-but-its-honestly-fine\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"You suck at git - but it's honestly fine | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Git is for everyone I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)\npodcast
    and would recommend it after 2 episodes. In the firs\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"
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
    \           <span class=\"site-terminal__dir\">~/you-suck-at-git-but-its-honestly-fine</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"git-is-for-everyone\">Git
    is for everyone <a class=\"header-anchor\" href=\"#git-is-for-everyone\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I just started listening
    to <a href=\"https://www.localfirst.fm/\">localfirst.fm podcast</a>\npodcast and
    would recommend it after 2 episodes. In the first episode, the\nhosts discuss
    where the term <code>localfirst</code> comes from, what it means, and\nexamples
    of some localfirst, or semi-localfirst projects. One of them is <code>git</code></p>\n<ul>\n<li>the
    de-facto standard by which developers share code today.</li>\n</ul>\n<p>There's
    a reason it's the standard. I'm not arguing that it's perfect, and\nthere's new
    abstractions that may help people adopt usage like\n<a href=\"https://github.com/jj-vcs/jj\">jujutsu</a>,
    but ultimately <code>git</code> is a great tool,\nand anyone can use it who works
    with text files (lookin at you book-writing\nnerds)</p>\n<p>But as I was enjoying
    the pod the co-host/guest said &quot;and we all know the git user\nexperience
    isn't that great&quot;</p>\n<div class=\"admonition danger\">\n<p class=\"admonition-title\">heavy
    sigh</p>\n<p>Git isn't that hard - you probably just aren't that good at it</p>\n</div>\n<h2
    id=\"its-ok\">It's OK <a class=\"header-anchor\" href=\"#its-ok\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Don't hear me say that
    you suck at git like that's a bad thing... It's <em>totally\nfine</em> to not
    be a wizard. Many people can use git like 80-90% efficiently for\ntheir own use
    cases. In fact, my usage of git doesn't fall into any perfectly\nestablished patterns,
    and the decisions I make are not always the same (the\noverplayed rebase vs merge-upstream
    argument... I do both, it doesn't matter,\nsquash your crap at the end anyways...)</p>\n<p>So
    continue to collaborate - checkout your feature branches, pull in\n<code>origin/main</code>
    after a PR, ask for help with a rebase for the 69th time if you\nneed to</p>\n<div
    class=\"admonition danger\">\n<p>But quit your stupid annoying bitching</p>\n</div>\n<h2
    id=\"seriously\">Seriously <a class=\"header-anchor\" href=\"#seriously\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Honestly, I learned
    <em>about</em> git 8 years ago when I started my first job as a\ndata scientist.
    I was told by another developer, Jokko,\nthat it was the standard for collaboration...
    only issue was that almost no one\nin our division even used it. Or if they did
    it was at the end of a project,\nafter sharing code on share drives and OneDrive,
    at the very end we'd see <code>git init</code>, <code>git add .</code>, <code>git
    commit -m &quot;pushed to git&quot;</code>, <code>git push</code>... literally
    0\nvalue, or at least no more value than\n<code>my_project_final_FINAL_v2_project-over-now.zip</code></p>\n<p>It
    took me a few weeks of on-the-job git usage, practicing way over complicated\ngit
    flows and talking about git with the few people around me who knew it, for\nme
    to become a go-to resource... I was and am honestly still annoyed about\nit...
    It didn't take that long, or that much effort, to get pretty comfortable\nwith
    git. There's tons of UIs (with their own flaws), TUIs, and resources for\nlearning
    the few things that will make you stand out as a git wizard:</p>\n<ol>\n<li>can
    you rebase onto a new root commit?</li>\n<li>can you pull in changes from someone
    else's feature branch?</li>\n<li>if you find yourself in <code>detached HEAD state</code>
    are you panicked?</li>\n</ol>\n<p>Just make a directory, <code>git init</code>,
    and start shitting all over text files...\nmake branches, reconcile differences,
    just freaking practice for 10 minutes</p>\n<h2 id=\"end\">End <a class=\"header-anchor\"
    href=\"#end\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I was triggered I guess
    listening to this podcast episode... It's fine to not\nbe an expert, it's fine
    to just use the 3 or 4 commands you probably need (<code>git checkout -b, rebase
    origin/main, merge feature/branch, push</code>), I am happy to\nhelp people with
    git everyday - like I said above, I am somehow a go-to\nresource for git in my
    workplace.... (heck, even one of my managers asks me to\nsquash all the commits
    on his feature branches for him before it's merged to\nmain... it's fine)</p>\n<p>But
    the user experience isn't bad, so quit your bitching.</p>\n<hr />\n<div class=\"admonition
    note is-collapsible collapsible-closed\">\n<p class=\"admonition-title\">phone
    notes</p>\n<p>hot take, if you complain about git then you don't it... and that's
    fine but\nshut up. I love git,I use it in a way that's productive for me, and
    when I hear\npeople complain all they ever say is &quot;git is hard&quot; and
    &quot;why is rebasing so\nhard?!?!&quot;\nbut they don't get it, and that's fine.
    you can use git inefficiently, as a\nrequirement of your job, and not enjoy it.
    but don't bitch, because with 10\nminutes of practice you could gain some real
    fluency in rebasing</p>\n</div>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-07-21 05:20:07\ntemplateKey: blog-post\ntitle: You suck
    at git - but it's honestly fine\npublished: True\ntags:\n  - git\n  - tech\ncover:
    \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png\"\n---\n\n##
    Git is for everyone\n\nI just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)\npodcast
    and would recommend it after 2 episodes. In the first episode, the\nhosts discuss
    where the term `localfirst` comes from, what it means, and\nexamples of some localfirst,
    or semi-localfirst projects. One of them is `git`\n\n- the de-facto standard by
    which developers share code today.\n\nThere's a reason it's the standard. I'm
    not arguing that it's perfect, and\nthere's new abstractions that may help people
    adopt usage like\n[jujutsu](https://github.com/jj-vcs/jj), but ultimately `git`
    is a great tool,\nand anyone can use it who works with text files (lookin at you
    book-writing\nnerds)\n\nBut as I was enjoying the pod the co-host/guest said \"and
    we all know the git user\nexperience isn't that great\"\n\n!!! danger \"heavy
    sigh\"\n\n    Git isn't that hard - you probably just aren't that good at it\n\n##
    It's OK\n\nDon't hear me say that you suck at git like that's a bad thing... It's
    _totally\nfine_ to not be a wizard. Many people can use git like 80-90% efficiently
    for\ntheir own use cases. In fact, my usage of git doesn't fall into any perfectly\nestablished
    patterns, and the decisions I make are not always the same (the\noverplayed rebase
    vs merge-upstream argument... I do both, it doesn't matter,\nsquash your crap
    at the end anyways...)\n\nSo continue to collaborate - checkout your feature branches,
    pull in\n`origin/main` after a PR, ask for help with a rebase for the 69th time
    if you\nneed to\n\n!!! danger \"\"\n\n    But quit your stupid annoying bitching\n\n##
    Seriously\n\nHonestly, I learned _about_ git 8 years ago when I started my first
    job as a\ndata scientist. I was told by another developer, Jokko,\nthat it was
    the standard for collaboration... only issue was that almost no one\nin our division
    even used it. Or if they did it was at the end of a project,\nafter sharing code
    on share drives and OneDrive, at the very end we'd see `git\ninit`, `git add .`,
    `git commit -m \"pushed to git\"`, `git push`... literally 0\nvalue, or at least
    no more value than\n`my_project_final_FINAL_v2_project-over-now.zip`\n\nIt took
    me a few weeks of on-the-job git usage, practicing way over complicated\ngit flows
    and talking about git with the few people around me who knew it, for\nme to become
    a go-to resource... I was and am honestly still annoyed about\nit... It didn't
    take that long, or that much effort, to get pretty comfortable\nwith git. There's
    tons of UIs (with their own flaws), TUIs, and resources for\nlearning the few
    things that will make you stand out as a git wizard:\n\n1. can you rebase onto
    a new root commit?\n2. can you pull in changes from someone else's feature branch?\n3.
    if you find yourself in `detached HEAD state` are you panicked?\n\nJust make a
    directory, `git init`, and start shitting all over text files...\nmake branches,
    reconcile differences, just freaking practice for 10 minutes\n\n## End\n\nI was
    triggered I guess listening to this podcast episode... It's fine to not\nbe an
    expert, it's fine to just use the 3 or 4 commands you probably need (`git\ncheckout
    -b, rebase origin/main, merge feature/branch, push`), I am happy to\nhelp people
    with git everyday - like I said above, I am somehow a go-to\nresource for git
    in my workplace.... (heck, even one of my managers asks me to\nsquash all the
    commits on his feature branches for him before it's merged to\nmain... it's fine)\n\nBut
    the user experience isn't bad, so quit your bitching.\n\n---\n\n??? note \"phone
    notes\"\n\n    hot take, if you complain about git then you don't it... and that's
    fine but\n    shut up. I love git,I use it in a way that's productive for me,
    and when I hear\n    people complain all they ever say is \"git is hard\" and
    \"why is rebasing so\n    hard?!?!\"\n    but they don't get it, and that's fine.
    you can use git inefficiently, as a\n    requirement of your job, and not enjoy
    it. but don't bitch, because with 10\n    minutes of practice you could gain some
    real fluency in rebasing\n"
published: true
slug: you-suck-at-git-but-its-honestly-fine
title: You suck at git - but it's honestly fine


---

## Git is for everyone

I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)
podcast and would recommend it after 2 episodes. In the first episode, the
hosts discuss where the term `localfirst` comes from, what it means, and
examples of some localfirst, or semi-localfirst projects. One of them is `git`

- the de-facto standard by which developers share code today.

There's a reason it's the standard. I'm not arguing that it's perfect, and
there's new abstractions that may help people adopt usage like
[jujutsu](https://github.com/jj-vcs/jj), but ultimately `git` is a great tool,
and anyone can use it who works with text files (lookin at you book-writing
nerds)

But as I was enjoying the pod the co-host/guest said "and we all know the git user
experience isn't that great"

!!! danger "heavy sigh"

    Git isn't that hard - you probably just aren't that good at it

## It's OK

Don't hear me say that you suck at git like that's a bad thing... It's _totally
fine_ to not be a wizard. Many people can use git like 80-90% efficiently for
their own use cases. In fact, my usage of git doesn't fall into any perfectly
established patterns, and the decisions I make are not always the same (the
overplayed rebase vs merge-upstream argument... I do both, it doesn't matter,
squash your crap at the end anyways...)

So continue to collaborate - checkout your feature branches, pull in
`origin/main` after a PR, ask for help with a rebase for the 69th time if you
need to

!!! danger ""

    But quit your stupid annoying bitching

## Seriously

Honestly, I learned _about_ git 8 years ago when I started my first job as a
data scientist. I was told by another developer, Jokko,
that it was the standard for collaboration... only issue was that almost no one
in our division even used it. Or if they did it was at the end of a project,
after sharing code on share drives and OneDrive, at the very end we'd see `git
init`, `git add .`, `git commit -m "pushed to git"`, `git push`... literally 0
value, or at least no more value than
`my_project_final_FINAL_v2_project-over-now.zip`

It took me a few weeks of on-the-job git usage, practicing way over complicated
git flows and talking about git with the few people around me who knew it, for
me to become a go-to resource... I was and am honestly still annoyed about
it... It didn't take that long, or that much effort, to get pretty comfortable
with git. There's tons of UIs (with their own flaws), TUIs, and resources for
learning the few things that will make you stand out as a git wizard:

1. can you rebase onto a new root commit?
2. can you pull in changes from someone else's feature branch?
3. if you find yourself in `detached HEAD state` are you panicked?

Just make a directory, `git init`, and start shitting all over text files...
make branches, reconcile differences, just freaking practice for 10 minutes

## End

I was triggered I guess listening to this podcast episode... It's fine to not
be an expert, it's fine to just use the 3 or 4 commands you probably need (`git
checkout -b, rebase origin/main, merge feature/branch, push`), I am happy to
help people with git everyday - like I said above, I am somehow a go-to
resource for git in my workplace.... (heck, even one of my managers asks me to
squash all the commits on his feature branches for him before it's merged to
main... it's fine)

But the user experience isn't bad, so quit your bitching.

---

??? note "phone notes"

    hot take, if you complain about git then you don't it... and that's fine but
    shut up. I love git,I use it in a way that's productive for me, and when I hear
    people complain all they ever say is "git is hard" and "why is rebasing so
    hard?!?!"
    but they don't get it, and that's fine. you can use git inefficiently, as a
    requirement of your job, and not enjoy it. but don't bitch, because with 10
    minutes of practice you could gain some real fluency in rebasing