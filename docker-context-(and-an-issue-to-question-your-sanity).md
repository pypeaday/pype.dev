---
content: "docker contexts are great, would recommend putting them in your prompt though
  (via starship or something else)... here's why\n\nI like to manage my containers
  remotely - I have a nice development setup on my desktop and I try to keep my server
  as bare-bones as possible. For a while I've been using ansible which makes it easy
  to manage configuration etc on other machines. But I recently learned about docker
  contexts and I'm planning to scale down my homelab management to just docker-compose
  stacks rather than a bunch of super complicated ansible playbooks\n\nSo, setting
  up a context is easy - it's basically an ssh connection to another machine!\n\n`docker
  context create koober --docker \"host=ssh://nic@koober\"`\n\n`koober` is one of
  my dev machines and my `~/.ssh/config` is setup such that I can `ssh nic@koober`,
  this makes the context work really seamlessly.\n\nSo there's the `default` context
  (the machine you're on) and now I have `koober`\n\nTo use it you run `docker context
  use koober`\n\nAnd then to check we can `ls` the contexts\n\n```\ndocker context
  ls\nNAME       DESCRIPTION                               DOCKER ENDPOINT               ERROR\ndefault
  \   Current DOCKER_HOST based configuration   unix:///var/run/docker.sock   \nkoober
  *                                             ssh://nic@koober\n```\n\n> Notice
  the * - that indicates that's our current context.\n\n## Trouble\n\nNow here's where
  things get hairy... you've gotta be super-aware of what context you're using. I
  have an indicator in my starship prompt that shows the current context, but since
  I'm new to using them I kind of didn't notice it until I ran into this issue...\n\nI'm
  working on a python application in docker but was not able to execute the entrypoint
  even though I KNEW the file was there... let's take a look\n\n### Example\n\nHere's
  a minimal hello world applycation in docker to illustrate the issue\n\n```python\n#
  main.py\nprint(\"hello world\")\n```\n\n```Dockerfile\n# Use an official Python
  runtime as a parent image\nFROM python:3.11-slim\n\n# Set the working directory
  in the container\nWORKDIR /app\n\n# Copy the current directory contents into the
  container at /app\nCOPY . /app\n\n# Run the main.py script as the container's main
  process\nCMD [\"python\", \"main.py\"]\n```\n\n```yaml\nservices:\n  hello-world:\n
  \   build: .\n    volumes:\n      - .:/app\n```\n\nNotice volume mounting in my
  project directory `.` to `/app` as a common practice to develop inside the container\n\nHere's
  where I started to question my sanity...\n\n```bash\n\u2717 docker compose up                                            \n[+]
  Running 1/0\n \u2714 Container docker-context-example-hello-world-1  Created                                                                                                                                                                                                                                                              0.0s
  \nAttaching to hello-world-1\nhello-world-1  | python: can't open file '/app/main.py':
  [Errno 2] No such file or directory\nhello-world-1 exited with code 2\n```\n\n`python
  can't open file`? hmm... Let's take a look at the image\n\nFirst let's make sure
  we get the image name right\n\n```bash\n\u2717 docker container ls -a              \nCONTAINER
  ID   IMAGE                                           COMMAND                  CREATED
  \         STATUS                       PORTS                                                                                  NAMES\n3d7285fc39e2
  \  docker-context-example-hello-world              \"python main.py\"         10
  minutes ago   Exited (2) 44 seconds ago                                                                                           docker-context-example-hello-world-1\n```\n\nNow
  we can `docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world`\n\n```bash\n\u276F
  docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world
  \ \nroot@ee46d0e22de8:/app# python main.py\nHello, World!\nroot@ee46d0e22de8:/app#
  \n```\n\nWHAT THE HECK??\n\n## What happened...\n\nWhat happened turns out to be
  pretty simple once we realize I'm using contexts...\n\n`koboer` is a remote context,
  the `docker run` and `docker compose up` commands are interacting with the docker
  socket on that machine.\n\nSo if I compose up the stack notice that there's a volume
  bind mount in there - well those do _not_ work with contexts (or at least I'm not
  aware of hose to make it work) and so the `/app` directory was getting blown away
  essentially with an empty overlay...\n\nBut when running with just `docker run`
  with no volume mount, the code was copied in during the build and is right where
  we expect it...\n\n### Let's prove it\n\n```bash\n\u276F docker run --rm -it --entrypoint
  /bin/bash --name debug -v .:/app docker-context-example-hello-world\nroot@903f591c0384:/app#
  python main.py\npython: can't open file '/app/main.py': [Errno 2] No such file or
  directory\nroot@903f591c0384:/app# \n```\n```\nAdding a `-v .:/app` to match the
  compose file, we get the same error...\n```\n\nIf we switch to the default context
  we are back up and running as expected\n\n```bash\n\u2717 docker context use default\ndefault\nCurrent
  context is now \"default\"\n\nnic in /tmp/docker-context-example  via \uE235  v3.13.0
  \uF427 (dev) \U000F0484 \U000F150E NO PYTHON ENVIORNMENT SET \n\u276F docker compose
  up         \n[+] Running 1/0\n \u2714 Container docker-context-example-hello-world-1
  \ Created                                                                                                                                                                                                                                                              0.0s
  \nAttaching to hello-world-1\nhello-world-1  | Hello, World!\nhello-world-1 exited
  with code 0\n\nnic in /tmp/docker-context-example  via \uE235  v3.13.0 \uF427 (dev)
  \U000F0484 \U000F150E NO PYTHON ENVIORNMENT SET \n\u276F docker run --rm -it --entrypoint
  /bin/bash --name debug -v .:/app docker-context-example-hello-world\nroot@4045b6aa8883:/app#
  python main.py\nHello, World!\nroot@4045b6aa8883:/app# \n```\n\nSuccessful runs
  on both accounts with the volume mount\n\n## TLDR\n\nContext is king"
date: 2024-12-19
description: docker contexts are great, would recommend putting them in your prompt
  though (via starship or something else)... here&#x27;s why I like to manage my containers
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>docker context (and
    an issue to question your sanity)</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"docker contexts are great, would recommend putting them in your prompt
    though (via starship or something else)... here&#x27;s why I like to manage my
    containers\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Meta tags from original file -->\n<meta
    property=\"og:title\" content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:title\"
    content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta
    property=\"og:image\" name=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\"
    />\n<meta name=\"twitter:image\" name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev\" />\n<meta name=\"twitter:creator\"
    content=\"@pypeaday\">\n<meta name=\"twitter:site\" content=\"@pypeaday\">\n\n\n
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
    \   }\n</style>\n\n\n<article class='w-full pattern-card glow-card p-4 md:p-6
    post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size:
    4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold
    gradient-text mb-4 post-title-large\">docker context (and an issue to question
    your sanity)</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2024-12-19\">\n            December 19, 2024\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/terminal/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #terminal\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>    <section class=\"article-content prose
    dark:prose-invert lg:prose-xl mx-auto mt-8\">\n        <p>docker contexts are
    great, would recommend putting them in your prompt though (via starship or something
    else)... here's why</p>\n<p>I like to manage my containers remotely - I have a
    nice development setup on my desktop and I try to keep my server as bare-bones
    as possible. For a while I've been using ansible which makes it easy to manage
    configuration etc on other machines. But I recently learned about docker contexts
    and I'm planning to scale down my homelab management to just docker-compose stacks
    rather than a bunch of super complicated ansible playbooks</p>\n<p>So, setting
    up a context is easy - it's basically an ssh connection to another machine!</p>\n<p><code>docker
    context create koober --docker &quot;host=ssh://nic@koober&quot;</code></p>\n<p><code>koober</code>
    is one of my dev machines and my <code>~/.ssh/config</code> is setup such that
    I can <code>ssh nic@koober</code>, this makes the context work really seamlessly.</p>\n<p>So
    there's the <code>default</code> context (the machine you're on) and now I have
    <code>koober</code></p>\n<p>To use it you run <code>docker context use koober</code></p>\n<p>And
    then to check we can <code>ls</code> the contexts</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>docker context ls\nNAME       DESCRIPTION
    \                              DOCKER ENDPOINT               ERROR\ndefault    Current
    DOCKER_HOST based configuration   unix:///var/run/docker.sock   \nkoober *                                             ssh://nic@koober\n</pre></div>\n\n</pre>\n\n<blockquote>\n<p>Notice
    the * - that indicates that's our current context.</p>\n</blockquote>\n<h2 id=\"trouble\">Trouble
    <a class=\"header-anchor\" href=\"#trouble\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now here's where things
    get hairy... you've gotta be super-aware of what context you're using. I have
    an indicator in my starship prompt that shows the current context, but since I'm
    new to using them I kind of didn't notice it until I ran into this issue...</p>\n<p>I'm
    working on a python application in docker but was not able to execute the entrypoint
    even though I KNEW the file was there... let's take a look</p>\n<h3>Example</h3>\n<p>Here's
    a minimal hello world applycation in docker to illustrate the issue</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># main.py</span>\n<span
    class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;hello
    world&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c\"># Use an
    official Python runtime as a parent image</span>\n<span class=\"k\">FROM</span><span
    class=\"w\"> </span><span class=\"s\">python:3.11-slim</span>\n\n<span class=\"c\">#
    Set the working directory in the container</span>\n<span class=\"k\">WORKDIR</span><span
    class=\"w\"> </span><span class=\"s\">/app</span>\n\n<span class=\"c\"># Copy
    the current directory contents into the container at /app</span>\n<span class=\"k\">COPY</span><span
    class=\"w\"> </span>.<span class=\"w\"> </span>/app\n\n<span class=\"c\"># Run
    the main.py script as the container&#39;s main process</span>\n<span class=\"k\">CMD</span><span
    class=\"w\"> </span><span class=\"p\">[</span><span class=\"s2\">&quot;python&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;main.py&quot;</span><span
    class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">hello-world</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">build</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">.</span>\n<span
    class=\"w\">    </span><span class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">.:/app</span>\n</pre></div>\n\n</pre>\n\n<p>Notice
    volume mounting in my project directory <code>.</code> to <code>/app</code> as
    a common practice to develop inside the container</p>\n<p>Here's where I started
    to question my sanity...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2717<span class=\"w\">
    </span>docker<span class=\"w\"> </span>compose<span class=\"w\"> </span>up<span
    class=\"w\">                                            </span>\n<span class=\"o\">[</span>+<span
    class=\"o\">]</span><span class=\"w\"> </span>Running<span class=\"w\"> </span><span
    class=\"m\">1</span>/0\n<span class=\"w\"> </span>\u2714<span class=\"w\"> </span>Container<span
    class=\"w\"> </span>docker-context-example-hello-world-1<span class=\"w\">  </span>Created<span
    class=\"w\">                                                                                                                                                                                                                                                              </span><span
    class=\"m\">0</span>.0s<span class=\"w\"> </span>\nAttaching<span class=\"w\">
    </span>to<span class=\"w\"> </span>hello-world-1\nhello-world-1<span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>python:<span class=\"w\">
    </span>can<span class=\"s1\">&#39;t open file &#39;</span>/app/main.py<span class=\"err\">&#39;</span>:<span
    class=\"w\"> </span><span class=\"o\">[</span>Errno<span class=\"w\"> </span><span
    class=\"m\">2</span><span class=\"o\">]</span><span class=\"w\"> </span>No<span
    class=\"w\"> </span>such<span class=\"w\"> </span>file<span class=\"w\"> </span>or<span
    class=\"w\"> </span>directory\nhello-world-1<span class=\"w\"> </span>exited<span
    class=\"w\"> </span>with<span class=\"w\"> </span>code<span class=\"w\"> </span><span
    class=\"m\">2</span>\n</pre></div>\n\n</pre>\n\n<p><code>python can't open file</code>?
    hmm... Let's take a look at the image</p>\n<p>First let's make sure we get the
    image name right</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2717<span class=\"w\">
    </span>docker<span class=\"w\"> </span>container<span class=\"w\"> </span>ls<span
    class=\"w\"> </span>-a<span class=\"w\">              </span>\nCONTAINER<span
    class=\"w\"> </span>ID<span class=\"w\">   </span>IMAGE<span class=\"w\">                                           </span>COMMAND<span
    class=\"w\">                  </span>CREATED<span class=\"w\">          </span>STATUS<span
    class=\"w\">                       </span>PORTS<span class=\"w\">                                                                                  </span>NAMES\n3d7285fc39e2<span
    class=\"w\">   </span>docker-context-example-hello-world<span class=\"w\">              </span><span
    class=\"s2\">&quot;python main.py&quot;</span><span class=\"w\">         </span><span
    class=\"m\">10</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"w\">   </span>Exited<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">2</span><span class=\"o\">)</span><span class=\"w\"> </span><span
    class=\"m\">44</span><span class=\"w\"> </span>seconds<span class=\"w\"> </span>ago<span
    class=\"w\">                                                                                           </span>docker-context-example-hello-world-1\n</pre></div>\n\n</pre>\n\n<p>Now
    we can <code>docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F<span class=\"w\">
    </span>docker<span class=\"w\"> </span>run<span class=\"w\"> </span>--rm<span
    class=\"w\"> </span>-it<span class=\"w\"> </span>--entrypoint<span class=\"w\">
    </span>/bin/bash<span class=\"w\"> </span>--name<span class=\"w\"> </span>debug<span
    class=\"w\"> </span>docker-context-example-hello-world<span class=\"w\">  </span>\nroot@ee46d0e22de8:/app#<span
    class=\"w\"> </span>python<span class=\"w\"> </span>main.py\nHello,<span class=\"w\">
    </span>World!\nroot@ee46d0e22de8:/app#<span class=\"w\"> </span>\n</pre></div>\n\n</pre>\n\n<p>WHAT
    THE HECK??</p>\n<h2 id=\"what-happened\">What happened... <a class=\"header-anchor\"
    href=\"#what-happened\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What happened turns
    out to be pretty simple once we realize I'm using contexts...</p>\n<p><code>koboer</code>
    is a remote context, the <code>docker run</code> and <code>docker compose up</code>
    commands are interacting with the docker socket on that machine.</p>\n<p>So if
    I compose up the stack notice that there's a volume bind mount in there - well
    those do <em>not</em> work with contexts (or at least I'm not aware of hose to
    make it work) and so the <code>/app</code> directory was getting blown away essentially
    with an empty overlay...</p>\n<p>But when running with just <code>docker run</code>
    with no volume mount, the code was copied in during the build and is right where
    we expect it...</p>\n<h3>Let's prove it</h3>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F<span class=\"w\">
    </span>docker<span class=\"w\"> </span>run<span class=\"w\"> </span>--rm<span
    class=\"w\"> </span>-it<span class=\"w\"> </span>--entrypoint<span class=\"w\">
    </span>/bin/bash<span class=\"w\"> </span>--name<span class=\"w\"> </span>debug<span
    class=\"w\"> </span>-v<span class=\"w\"> </span>.:/app<span class=\"w\"> </span>docker-context-example-hello-world\nroot@903f591c0384:/app#<span
    class=\"w\"> </span>python<span class=\"w\"> </span>main.py\npython:<span class=\"w\">
    </span>can<span class=\"s1\">&#39;t open file &#39;</span>/app/main.py<span class=\"err\">&#39;</span>:<span
    class=\"w\"> </span><span class=\"o\">[</span>Errno<span class=\"w\"> </span><span
    class=\"m\">2</span><span class=\"o\">]</span><span class=\"w\"> </span>No<span
    class=\"w\"> </span>such<span class=\"w\"> </span>file<span class=\"w\"> </span>or<span
    class=\"w\"> </span>directory\nroot@903f591c0384:/app#<span class=\"w\"> </span>\n</pre></div>\n\n</pre>\n\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>Adding a `-v .:/app` to match
    the compose file, we get the same error...\n</pre></div>\n\n</pre>\n\n<p>If we
    switch to the default context we are back up and running as expected</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2717<span class=\"w\">
    </span>docker<span class=\"w\"> </span>context<span class=\"w\"> </span>use<span
    class=\"w\"> </span>default\ndefault\nCurrent<span class=\"w\"> </span>context<span
    class=\"w\"> </span>is<span class=\"w\"> </span>now<span class=\"w\"> </span><span
    class=\"s2\">&quot;default&quot;</span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>/tmp/docker-context-example<span
    class=\"w\">  </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.13.0<span
    class=\"w\"> </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\U000F150E<span
    class=\"w\"> </span>NO<span class=\"w\"> </span>PYTHON<span class=\"w\"> </span>ENVIORNMENT<span
    class=\"w\"> </span>SET<span class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>docker<span
    class=\"w\"> </span>compose<span class=\"w\"> </span>up<span class=\"w\">         </span>\n<span
    class=\"o\">[</span>+<span class=\"o\">]</span><span class=\"w\"> </span>Running<span
    class=\"w\"> </span><span class=\"m\">1</span>/0\n<span class=\"w\"> </span>\u2714<span
    class=\"w\"> </span>Container<span class=\"w\"> </span>docker-context-example-hello-world-1<span
    class=\"w\">  </span>Created<span class=\"w\">                                                                                                                                                                                                                                                              </span><span
    class=\"m\">0</span>.0s<span class=\"w\"> </span>\nAttaching<span class=\"w\">
    </span>to<span class=\"w\"> </span>hello-world-1\nhello-world-1<span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>Hello,<span class=\"w\">
    </span>World!\nhello-world-1<span class=\"w\"> </span>exited<span class=\"w\">
    </span>with<span class=\"w\"> </span>code<span class=\"w\"> </span><span class=\"m\">0</span>\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>/tmp/docker-context-example<span
    class=\"w\">  </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.13.0<span
    class=\"w\"> </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\U000F150E<span
    class=\"w\"> </span>NO<span class=\"w\"> </span>PYTHON<span class=\"w\"> </span>ENVIORNMENT<span
    class=\"w\"> </span>SET<span class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>docker<span
    class=\"w\"> </span>run<span class=\"w\"> </span>--rm<span class=\"w\"> </span>-it<span
    class=\"w\"> </span>--entrypoint<span class=\"w\"> </span>/bin/bash<span class=\"w\">
    </span>--name<span class=\"w\"> </span>debug<span class=\"w\"> </span>-v<span
    class=\"w\"> </span>.:/app<span class=\"w\"> </span>docker-context-example-hello-world\nroot@4045b6aa8883:/app#<span
    class=\"w\"> </span>python<span class=\"w\"> </span>main.py\nHello,<span class=\"w\">
    </span>World!\nroot@4045b6aa8883:/app#<span class=\"w\"> </span>\n</pre></div>\n\n</pre>\n\n<p>Successful
    runs on both accounts with the volume mount</p>\n<h2 id=\"tldr\">TLDR <a class=\"header-anchor\"
    href=\"#tldr\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Context is king</p>\n\n
    \   </section>\n</article>        </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>docker context (and
    an issue to question your sanity)</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"docker contexts are great, would recommend putting them in your prompt
    though (via starship or something else)... here&#x27;s why I like to manage my
    containers\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Meta tags from original file -->\n<meta
    property=\"og:title\" content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:title\"
    content=\"Pype.dev | Nic Payne\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta
    property=\"og:image\" name=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\"
    />\n<meta name=\"twitter:image\" name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pype.dev/content/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev\" />\n<meta name=\"twitter:creator\"
    content=\"@pypeaday\">\n<meta name=\"twitter:site\" content=\"@pypeaday\">\n\n\n
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
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<article style=\"text-align:
    center;\">\n    <style>\n        section {\n            font-size: 200%;\n        }\n\n\n
    \       .edit {\n            display: none;\n        }\n    </style>\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">docker context (and an issue to question your sanity)</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2024-12-19\">\n            December 19, 2024\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #python\n            </a>\n            <a href=\"https://pype.dev//tags/terminal/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #terminal\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section></article>\n
    \    </body>\n</html>"
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
    \   }\n</style>\n\n\n<article class='w-full pattern-card glow-card p-4 md:p-6
    post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size:
    4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold
    gradient-text mb-4 post-title-large\">docker context (and an issue to question
    your sanity)</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2024-12-19\">\n            December 19, 2024\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/terminal/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #terminal\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>    <section class=\"article-content prose
    dark:prose-invert lg:prose-xl mx-auto mt-8\">\n        <p>docker contexts are
    great, would recommend putting them in your prompt though (via starship or something
    else)... here's why</p>\n<p>I like to manage my containers remotely - I have a
    nice development setup on my desktop and I try to keep my server as bare-bones
    as possible. For a while I've been using ansible which makes it easy to manage
    configuration etc on other machines. But I recently learned about docker contexts
    and I'm planning to scale down my homelab management to just docker-compose stacks
    rather than a bunch of super complicated ansible playbooks</p>\n<p>So, setting
    up a context is easy - it's basically an ssh connection to another machine!</p>\n<p><code>docker
    context create koober --docker &quot;host=ssh://nic@koober&quot;</code></p>\n<p><code>koober</code>
    is one of my dev machines and my <code>~/.ssh/config</code> is setup such that
    I can <code>ssh nic@koober</code>, this makes the context work really seamlessly.</p>\n<p>So
    there's the <code>default</code> context (the machine you're on) and now I have
    <code>koober</code></p>\n<p>To use it you run <code>docker context use koober</code></p>\n<p>And
    then to check we can <code>ls</code> the contexts</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>docker context ls\nNAME       DESCRIPTION
    \                              DOCKER ENDPOINT               ERROR\ndefault    Current
    DOCKER_HOST based configuration   unix:///var/run/docker.sock   \nkoober *                                             ssh://nic@koober\n</pre></div>\n\n</pre>\n\n<blockquote>\n<p>Notice
    the * - that indicates that's our current context.</p>\n</blockquote>\n<h2 id=\"trouble\">Trouble
    <a class=\"header-anchor\" href=\"#trouble\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now here's where things
    get hairy... you've gotta be super-aware of what context you're using. I have
    an indicator in my starship prompt that shows the current context, but since I'm
    new to using them I kind of didn't notice it until I ran into this issue...</p>\n<p>I'm
    working on a python application in docker but was not able to execute the entrypoint
    even though I KNEW the file was there... let's take a look</p>\n<h3>Example</h3>\n<p>Here's
    a minimal hello world applycation in docker to illustrate the issue</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># main.py</span>\n<span
    class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;hello
    world&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c\"># Use an
    official Python runtime as a parent image</span>\n<span class=\"k\">FROM</span><span
    class=\"w\"> </span><span class=\"s\">python:3.11-slim</span>\n\n<span class=\"c\">#
    Set the working directory in the container</span>\n<span class=\"k\">WORKDIR</span><span
    class=\"w\"> </span><span class=\"s\">/app</span>\n\n<span class=\"c\"># Copy
    the current directory contents into the container at /app</span>\n<span class=\"k\">COPY</span><span
    class=\"w\"> </span>.<span class=\"w\"> </span>/app\n\n<span class=\"c\"># Run
    the main.py script as the container&#39;s main process</span>\n<span class=\"k\">CMD</span><span
    class=\"w\"> </span><span class=\"p\">[</span><span class=\"s2\">&quot;python&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;main.py&quot;</span><span
    class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">hello-world</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">build</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">.</span>\n<span
    class=\"w\">    </span><span class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">.:/app</span>\n</pre></div>\n\n</pre>\n\n<p>Notice
    volume mounting in my project directory <code>.</code> to <code>/app</code> as
    a common practice to develop inside the container</p>\n<p>Here's where I started
    to question my sanity...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2717<span class=\"w\">
    </span>docker<span class=\"w\"> </span>compose<span class=\"w\"> </span>up<span
    class=\"w\">                                            </span>\n<span class=\"o\">[</span>+<span
    class=\"o\">]</span><span class=\"w\"> </span>Running<span class=\"w\"> </span><span
    class=\"m\">1</span>/0\n<span class=\"w\"> </span>\u2714<span class=\"w\"> </span>Container<span
    class=\"w\"> </span>docker-context-example-hello-world-1<span class=\"w\">  </span>Created<span
    class=\"w\">                                                                                                                                                                                                                                                              </span><span
    class=\"m\">0</span>.0s<span class=\"w\"> </span>\nAttaching<span class=\"w\">
    </span>to<span class=\"w\"> </span>hello-world-1\nhello-world-1<span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>python:<span class=\"w\">
    </span>can<span class=\"s1\">&#39;t open file &#39;</span>/app/main.py<span class=\"err\">&#39;</span>:<span
    class=\"w\"> </span><span class=\"o\">[</span>Errno<span class=\"w\"> </span><span
    class=\"m\">2</span><span class=\"o\">]</span><span class=\"w\"> </span>No<span
    class=\"w\"> </span>such<span class=\"w\"> </span>file<span class=\"w\"> </span>or<span
    class=\"w\"> </span>directory\nhello-world-1<span class=\"w\"> </span>exited<span
    class=\"w\"> </span>with<span class=\"w\"> </span>code<span class=\"w\"> </span><span
    class=\"m\">2</span>\n</pre></div>\n\n</pre>\n\n<p><code>python can't open file</code>?
    hmm... Let's take a look at the image</p>\n<p>First let's make sure we get the
    image name right</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2717<span class=\"w\">
    </span>docker<span class=\"w\"> </span>container<span class=\"w\"> </span>ls<span
    class=\"w\"> </span>-a<span class=\"w\">              </span>\nCONTAINER<span
    class=\"w\"> </span>ID<span class=\"w\">   </span>IMAGE<span class=\"w\">                                           </span>COMMAND<span
    class=\"w\">                  </span>CREATED<span class=\"w\">          </span>STATUS<span
    class=\"w\">                       </span>PORTS<span class=\"w\">                                                                                  </span>NAMES\n3d7285fc39e2<span
    class=\"w\">   </span>docker-context-example-hello-world<span class=\"w\">              </span><span
    class=\"s2\">&quot;python main.py&quot;</span><span class=\"w\">         </span><span
    class=\"m\">10</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
    class=\"w\">   </span>Exited<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">2</span><span class=\"o\">)</span><span class=\"w\"> </span><span
    class=\"m\">44</span><span class=\"w\"> </span>seconds<span class=\"w\"> </span>ago<span
    class=\"w\">                                                                                           </span>docker-context-example-hello-world-1\n</pre></div>\n\n</pre>\n\n<p>Now
    we can <code>docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F<span class=\"w\">
    </span>docker<span class=\"w\"> </span>run<span class=\"w\"> </span>--rm<span
    class=\"w\"> </span>-it<span class=\"w\"> </span>--entrypoint<span class=\"w\">
    </span>/bin/bash<span class=\"w\"> </span>--name<span class=\"w\"> </span>debug<span
    class=\"w\"> </span>docker-context-example-hello-world<span class=\"w\">  </span>\nroot@ee46d0e22de8:/app#<span
    class=\"w\"> </span>python<span class=\"w\"> </span>main.py\nHello,<span class=\"w\">
    </span>World!\nroot@ee46d0e22de8:/app#<span class=\"w\"> </span>\n</pre></div>\n\n</pre>\n\n<p>WHAT
    THE HECK??</p>\n<h2 id=\"what-happened\">What happened... <a class=\"header-anchor\"
    href=\"#what-happened\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What happened turns
    out to be pretty simple once we realize I'm using contexts...</p>\n<p><code>koboer</code>
    is a remote context, the <code>docker run</code> and <code>docker compose up</code>
    commands are interacting with the docker socket on that machine.</p>\n<p>So if
    I compose up the stack notice that there's a volume bind mount in there - well
    those do <em>not</em> work with contexts (or at least I'm not aware of hose to
    make it work) and so the <code>/app</code> directory was getting blown away essentially
    with an empty overlay...</p>\n<p>But when running with just <code>docker run</code>
    with no volume mount, the code was copied in during the build and is right where
    we expect it...</p>\n<h3>Let's prove it</h3>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F<span class=\"w\">
    </span>docker<span class=\"w\"> </span>run<span class=\"w\"> </span>--rm<span
    class=\"w\"> </span>-it<span class=\"w\"> </span>--entrypoint<span class=\"w\">
    </span>/bin/bash<span class=\"w\"> </span>--name<span class=\"w\"> </span>debug<span
    class=\"w\"> </span>-v<span class=\"w\"> </span>.:/app<span class=\"w\"> </span>docker-context-example-hello-world\nroot@903f591c0384:/app#<span
    class=\"w\"> </span>python<span class=\"w\"> </span>main.py\npython:<span class=\"w\">
    </span>can<span class=\"s1\">&#39;t open file &#39;</span>/app/main.py<span class=\"err\">&#39;</span>:<span
    class=\"w\"> </span><span class=\"o\">[</span>Errno<span class=\"w\"> </span><span
    class=\"m\">2</span><span class=\"o\">]</span><span class=\"w\"> </span>No<span
    class=\"w\"> </span>such<span class=\"w\"> </span>file<span class=\"w\"> </span>or<span
    class=\"w\"> </span>directory\nroot@903f591c0384:/app#<span class=\"w\"> </span>\n</pre></div>\n\n</pre>\n\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>Adding a `-v .:/app` to match
    the compose file, we get the same error...\n</pre></div>\n\n</pre>\n\n<p>If we
    switch to the default context we are back up and running as expected</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2717<span class=\"w\">
    </span>docker<span class=\"w\"> </span>context<span class=\"w\"> </span>use<span
    class=\"w\"> </span>default\ndefault\nCurrent<span class=\"w\"> </span>context<span
    class=\"w\"> </span>is<span class=\"w\"> </span>now<span class=\"w\"> </span><span
    class=\"s2\">&quot;default&quot;</span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>/tmp/docker-context-example<span
    class=\"w\">  </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.13.0<span
    class=\"w\"> </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\U000F150E<span
    class=\"w\"> </span>NO<span class=\"w\"> </span>PYTHON<span class=\"w\"> </span>ENVIORNMENT<span
    class=\"w\"> </span>SET<span class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>docker<span
    class=\"w\"> </span>compose<span class=\"w\"> </span>up<span class=\"w\">         </span>\n<span
    class=\"o\">[</span>+<span class=\"o\">]</span><span class=\"w\"> </span>Running<span
    class=\"w\"> </span><span class=\"m\">1</span>/0\n<span class=\"w\"> </span>\u2714<span
    class=\"w\"> </span>Container<span class=\"w\"> </span>docker-context-example-hello-world-1<span
    class=\"w\">  </span>Created<span class=\"w\">                                                                                                                                                                                                                                                              </span><span
    class=\"m\">0</span>.0s<span class=\"w\"> </span>\nAttaching<span class=\"w\">
    </span>to<span class=\"w\"> </span>hello-world-1\nhello-world-1<span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>Hello,<span class=\"w\">
    </span>World!\nhello-world-1<span class=\"w\"> </span>exited<span class=\"w\">
    </span>with<span class=\"w\"> </span>code<span class=\"w\"> </span><span class=\"m\">0</span>\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>/tmp/docker-context-example<span
    class=\"w\">  </span>via<span class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.13.0<span
    class=\"w\"> </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\U000F150E<span
    class=\"w\"> </span>NO<span class=\"w\"> </span>PYTHON<span class=\"w\"> </span>ENVIORNMENT<span
    class=\"w\"> </span>SET<span class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>docker<span
    class=\"w\"> </span>run<span class=\"w\"> </span>--rm<span class=\"w\"> </span>-it<span
    class=\"w\"> </span>--entrypoint<span class=\"w\"> </span>/bin/bash<span class=\"w\">
    </span>--name<span class=\"w\"> </span>debug<span class=\"w\"> </span>-v<span
    class=\"w\"> </span>.:/app<span class=\"w\"> </span>docker-context-example-hello-world\nroot@4045b6aa8883:/app#<span
    class=\"w\"> </span>python<span class=\"w\"> </span>main.py\nHello,<span class=\"w\">
    </span>World!\nroot@4045b6aa8883:/app#<span class=\"w\"> </span>\n</pre></div>\n\n</pre>\n\n<p>Successful
    runs on both accounts with the volume mount</p>\n<h2 id=\"tldr\">TLDR <a class=\"header-anchor\"
    href=\"#tldr\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Context is king</p>\n\n
    \   </section>\n</article>"
  raw.md: "---\ndate: 2024-12-19 05:59:30\ntemplateKey: til\ntitle: docker context
    (and an issue to question your sanity)\npublished: True\ntags:\n  - python\n  -
    terminal\n  - tech\n  - til\n\n---\n\ndocker contexts are great, would recommend
    putting them in your prompt though (via starship or something else)... here's
    why\n\nI like to manage my containers remotely - I have a nice development setup
    on my desktop and I try to keep my server as bare-bones as possible. For a while
    I've been using ansible which makes it easy to manage configuration etc on other
    machines. But I recently learned about docker contexts and I'm planning to scale
    down my homelab management to just docker-compose stacks rather than a bunch of
    super complicated ansible playbooks\n\nSo, setting up a context is easy - it's
    basically an ssh connection to another machine!\n\n`docker context create koober
    --docker \"host=ssh://nic@koober\"`\n\n`koober` is one of my dev machines and
    my `~/.ssh/config` is setup such that I can `ssh nic@koober`, this makes the context
    work really seamlessly.\n\nSo there's the `default` context (the machine you're
    on) and now I have `koober`\n\nTo use it you run `docker context use koober`\n\nAnd
    then to check we can `ls` the contexts\n\n```\ndocker context ls\nNAME       DESCRIPTION
    \                              DOCKER ENDPOINT               ERROR\ndefault    Current
    DOCKER_HOST based configuration   unix:///var/run/docker.sock   \nkoober *                                             ssh://nic@koober\n```\n\n>
    Notice the * - that indicates that's our current context.\n\n## Trouble\n\nNow
    here's where things get hairy... you've gotta be super-aware of what context you're
    using. I have an indicator in my starship prompt that shows the current context,
    but since I'm new to using them I kind of didn't notice it until I ran into this
    issue...\n\nI'm working on a python application in docker but was not able to
    execute the entrypoint even though I KNEW the file was there... let's take a look\n\n###
    Example\n\nHere's a minimal hello world applycation in docker to illustrate the
    issue\n\n```python\n# main.py\nprint(\"hello world\")\n```\n\n```Dockerfile\n#
    Use an official Python runtime as a parent image\nFROM python:3.11-slim\n\n# Set
    the working directory in the container\nWORKDIR /app\n\n# Copy the current directory
    contents into the container at /app\nCOPY . /app\n\n# Run the main.py script as
    the container's main process\nCMD [\"python\", \"main.py\"]\n```\n\n```yaml\nservices:\n
    \ hello-world:\n    build: .\n    volumes:\n      - .:/app\n```\n\nNotice volume
    mounting in my project directory `.` to `/app` as a common practice to develop
    inside the container\n\nHere's where I started to question my sanity...\n\n```bash\n\u2717
    docker compose up                                            \n[+] Running 1/0\n
    \u2714 Container docker-context-example-hello-world-1  Created                                                                                                                                                                                                                                                              0.0s
    \nAttaching to hello-world-1\nhello-world-1  | python: can't open file '/app/main.py':
    [Errno 2] No such file or directory\nhello-world-1 exited with code 2\n```\n\n`python
    can't open file`? hmm... Let's take a look at the image\n\nFirst let's make sure
    we get the image name right\n\n```bash\n\u2717 docker container ls -a              \nCONTAINER
    ID   IMAGE                                           COMMAND                  CREATED
    \         STATUS                       PORTS                                                                                  NAMES\n3d7285fc39e2
    \  docker-context-example-hello-world              \"python main.py\"         10
    minutes ago   Exited (2) 44 seconds ago                                                                                           docker-context-example-hello-world-1\n```\n\nNow
    we can `docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world`\n\n```bash\n\u276F
    docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world
    \ \nroot@ee46d0e22de8:/app# python main.py\nHello, World!\nroot@ee46d0e22de8:/app#
    \n```\n\nWHAT THE HECK??\n\n## What happened...\n\nWhat happened turns out to
    be pretty simple once we realize I'm using contexts...\n\n`koboer` is a remote
    context, the `docker run` and `docker compose up` commands are interacting with
    the docker socket on that machine.\n\nSo if I compose up the stack notice that
    there's a volume bind mount in there - well those do _not_ work with contexts
    (or at least I'm not aware of hose to make it work) and so the `/app` directory
    was getting blown away essentially with an empty overlay...\n\nBut when running
    with just `docker run` with no volume mount, the code was copied in during the
    build and is right where we expect it...\n\n### Let's prove it\n\n```bash\n\u276F
    docker run --rm -it --entrypoint /bin/bash --name debug -v .:/app docker-context-example-hello-world\nroot@903f591c0384:/app#
    python main.py\npython: can't open file '/app/main.py': [Errno 2] No such file
    or directory\nroot@903f591c0384:/app# \n```\n```\nAdding a `-v .:/app` to match
    the compose file, we get the same error...\n```\n\nIf we switch to the default
    context we are back up and running as expected\n\n```bash\n\u2717 docker context
    use default\ndefault\nCurrent context is now \"default\"\n\nnic in /tmp/docker-context-example
    \ via \uE235  v3.13.0 \uF427 (dev) \U000F0484 \U000F150E NO PYTHON ENVIORNMENT
    SET \n\u276F docker compose up         \n[+] Running 1/0\n \u2714 Container docker-context-example-hello-world-1
    \ Created                                                                                                                                                                                                                                                              0.0s
    \nAttaching to hello-world-1\nhello-world-1  | Hello, World!\nhello-world-1 exited
    with code 0\n\nnic in /tmp/docker-context-example  via \uE235  v3.13.0 \uF427
    (dev) \U000F0484 \U000F150E NO PYTHON ENVIORNMENT SET \n\u276F docker run --rm
    -it --entrypoint /bin/bash --name debug -v .:/app docker-context-example-hello-world\nroot@4045b6aa8883:/app#
    python main.py\nHello, World!\nroot@4045b6aa8883:/app# \n```\n\nSuccessful runs
    on both accounts with the volume mount\n\n## TLDR\n\nContext is king\n"
published: true
slug: docker-context-and-an-issue-to-question-your-sanity
title: docker context (and an issue to question your sanity)


---

docker contexts are great, would recommend putting them in your prompt though (via starship or something else)... here's why

I like to manage my containers remotely - I have a nice development setup on my desktop and I try to keep my server as bare-bones as possible. For a while I've been using ansible which makes it easy to manage configuration etc on other machines. But I recently learned about docker contexts and I'm planning to scale down my homelab management to just docker-compose stacks rather than a bunch of super complicated ansible playbooks

So, setting up a context is easy - it's basically an ssh connection to another machine!

`docker context create koober --docker "host=ssh://nic@koober"`

`koober` is one of my dev machines and my `~/.ssh/config` is setup such that I can `ssh nic@koober`, this makes the context work really seamlessly.

So there's the `default` context (the machine you're on) and now I have `koober`

To use it you run `docker context use koober`

And then to check we can `ls` the contexts

```
docker context ls
NAME       DESCRIPTION                               DOCKER ENDPOINT               ERROR
default    Current DOCKER_HOST based configuration   unix:///var/run/docker.sock   
koober *                                             ssh://nic@koober
```

> Notice the * - that indicates that's our current context.

## Trouble

Now here's where things get hairy... you've gotta be super-aware of what context you're using. I have an indicator in my starship prompt that shows the current context, but since I'm new to using them I kind of didn't notice it until I ran into this issue...

I'm working on a python application in docker but was not able to execute the entrypoint even though I KNEW the file was there... let's take a look

### Example

Here's a minimal hello world applycation in docker to illustrate the issue

```python
# main.py
print("hello world")
```

```Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Run the main.py script as the container's main process
CMD ["python", "main.py"]
```

```yaml
services:
  hello-world:
    build: .
    volumes:
      - .:/app
```

Notice volume mounting in my project directory `.` to `/app` as a common practice to develop inside the container

Here's where I started to question my sanity...

```bash
✗ docker compose up                                            
[+] Running 1/0
 ✔ Container docker-context-example-hello-world-1  Created                                                                                                                                                                                                                                                              0.0s 
Attaching to hello-world-1
hello-world-1  | python: can't open file '/app/main.py': [Errno 2] No such file or directory
hello-world-1 exited with code 2
```

`python can't open file`? hmm... Let's take a look at the image

First let's make sure we get the image name right

```bash
✗ docker container ls -a              
CONTAINER ID   IMAGE                                           COMMAND                  CREATED          STATUS                       PORTS                                                                                  NAMES
3d7285fc39e2   docker-context-example-hello-world              "python main.py"         10 minutes ago   Exited (2) 44 seconds ago                                                                                           docker-context-example-hello-world-1
```

Now we can `docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world`

```bash
❯ docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world  
root@ee46d0e22de8:/app# python main.py
Hello, World!
root@ee46d0e22de8:/app# 
```

WHAT THE HECK??

## What happened...

What happened turns out to be pretty simple once we realize I'm using contexts...

`koboer` is a remote context, the `docker run` and `docker compose up` commands are interacting with the docker socket on that machine.

So if I compose up the stack notice that there's a volume bind mount in there - well those do _not_ work with contexts (or at least I'm not aware of hose to make it work) and so the `/app` directory was getting blown away essentially with an empty overlay...

But when running with just `docker run` with no volume mount, the code was copied in during the build and is right where we expect it...

### Let's prove it

```bash
❯ docker run --rm -it --entrypoint /bin/bash --name debug -v .:/app docker-context-example-hello-world
root@903f591c0384:/app# python main.py
python: can't open file '/app/main.py': [Errno 2] No such file or directory
root@903f591c0384:/app# 
```
```
Adding a `-v .:/app` to match the compose file, we get the same error...
```

If we switch to the default context we are back up and running as expected

```bash
✗ docker context use default
default
Current context is now "default"

nic in /tmp/docker-context-example  via   v3.13.0  (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET 
❯ docker compose up         
[+] Running 1/0
 ✔ Container docker-context-example-hello-world-1  Created                                                                                                                                                                                                                                                              0.0s 
Attaching to hello-world-1
hello-world-1  | Hello, World!
hello-world-1 exited with code 0

nic in /tmp/docker-context-example  via   v3.13.0  (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET 
❯ docker run --rm -it --entrypoint /bin/bash --name debug -v .:/app docker-context-example-hello-world
root@4045b6aa8883:/app# python main.py
Hello, World!
root@4045b6aa8883:/app# 
```

Successful runs on both accounts with the volume mount

## TLDR

Context is king