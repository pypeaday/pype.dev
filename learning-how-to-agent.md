---
content: "## Introduction & Background\n\nI've been using AI tools for codegen for
  a few years now, but not super\nheavily. I either use the in-line copilot stuff,
  which is like LSP on\nseteroids, or I have gone all the way to the other side of
  full on vibecoding\nwith Windsurf. That's been fun enough, but not super fulfilling
  and at the end\nof that I either have a simple webapp that does what I want but
  I don't\nunderstand, or else a half-broken thing I tried to understand but couldn't\nprompt
  in the right direction.\n\n!!! note \"One Caveat\"\n\n    My one caveat with Windsurf,
  which is a full IDE that I don't have a lot of comfortable navigation in due to
  all the Cascade keybindings clobbaring my own keymaps - is that with a HEAVY spec,
  it's done will with the Claude models at implementing a real idea I have. It's closer
  to vibe-engineering than vibe-coding, but that's my only instance, the rest of my
  Windsurf usage is \"make me a cool app - no mistakes\"\n\nThis year it feels like
  some tools exploded and\nI mentioned this in [[new-job-caterpillar-autonomy]]. I've
  been using\n[opencode](https://opencode.ai) a lot over the last few weeks and have
  iterated\nmany times already on a system of work that I'm trying to lean into for\nimproving
  my efficiency.\n\n## The Problem Space\n\nMy desire for a great Developer Experience
  is years old now, shout out to\nThePrimeagen for his [FEM\ncourse](https://frontendmasters.com/courses/developer-productivity-v2/)
  and\n[Waylon Walker](https://waylonwalker.com) for being a constant source of\nencouragement
  to be the best developer I can be. I sometimes (often) get\ntunnel-visioned on developer-productivity
  initiatives and lose the forest\nthrough the trees when ironing out a workflow -
  generally to find out I way\nover complicated the solution OR worse, started solving
  a problem I don't even\nhave.\n\n## First Attempt: Local Progress Tracker\n\nWell
  that's where I've been for a few weeks... I'm building Nexus, my\nsecond-brain at
  work to collaborate with agents on the truckload of stuff I'm\nexpected to get done.
  For a while now I've had a \"working-notes\" repo, which is\nbasically a blog, built
  with markata and navigated via markdown-lsp, where I do\nlike what I do here - take
  daily notes, track projects and status, and it gets\nbuilt into a nice little website
  I can reference with my boss.\n\nNow that we have copilot in full-swing, I'm trying
  to integrate agents a bit\nmore. Opencode has made this so nice - so many tools
  and modes of interaction,\nhighly customizable interface but also an amazing default
  experience... So I\nwas trying to lean into using agents and subagents for more
  work I started down\nthe path of building out a progress tracker. I started with
  a simple \"skill\"\nthat told the agent to put some info into a sqlite file, and
  even create the\nfile and schema based on the work. This worked fine, but was specific
  to each\nrepo (and actually each worktree I was in) and it was hard for me to get\nvisibility
  into all the work my fleet of agents was doing. Now that's actually\nproblem 1 -
  I don't have a fleet of agents, I had some terminal sessions going\nwith opencode,
  but I got it in my head that I was going to have an army of\nClaude's on my computer,
  constantly and autonomously knocking out tickets and I\nneeded to know who was doing
  what, where, when, and why..\n\n## Nexus V1 & V2: The Over-Engineering Phase\n\nSo,
  I dropped the local \"progress tracker\" and jumped into a huge FastAPI\nproject
  that I called Nexus. It was a python cli + api, with a server for\ncentralized management.
  It presented a kanban board, had policy gates on\n\"plans\" being approved before
  work could start on an Epic (and therefore any\nchild tickets). It has worktree
  tracking and automation, etc. It had a lot...\nit didn't all work, and it was hard
  to build the autonomous system... I wanted\nagentic feedback loops where `voidshaper`
  and I made epic plans for Epics (see the pun?) and then once the Plan was approved
  `star-commander` comes on the scene and makes tickets or checks tickets, depending
  on what's already ready to go it farmed out the work to `starsmith` (and variants
  for complexity) to build and then automatically calls in `recon-officer` and `qa-engineer`
  and at the end of it `gatekeeper` came in and\napproved or denied the changes. If
  denied - automatically start the loop again,\ntracking the work in Nexus, if approved
  - rebase and merge the branch, clean up\nthe worktree, update the ticket, close
  it, and get working on the next thing\nthat opens up. Ticket dependencies were in
  there, tracking stale agent\nsessions, clever routing of tasks to smaller models
  where appropriate.... you\ncan see that I went too far too fast too hard.\n\n![20260203124603_d5948740.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203124603_d5948740.png)\n\nNexus
  went through 2 or 3 iterations of this feature set. I was building it with several
  constraints in mind - specifically at work. 1. rate-limiting on large models (so
  not just using opus for everything), 2. good stewardship (not burning down cities
  for docstrings - farm out that work to haiku or a -mini model), 3. Copilot support
  - even though I like to use opencode, I wanted to supper copilot cli and in vscode
  as a means to share this with my coworkers who were mostly using vscode, 4. agent
  sessions were dying so I needed some kind of liveness probe for manual intervention
  in sessions where maybe the vpn died and the agent lost network... stuff like this
  was on my mind - but you know what wasn't? actually doing some work... I was solving
  problems I don't have, but were fun to think about.\n\n## The Reality Check\n\nSo,
  what are my problems? I boiled them down to a few things...\n\n1. I want to manage
  my workstreams in workspaces - folders on my computer where I put git worktrees\n2.
  I want varying levels of ai automation in my workflows... some things could be handled
  by an agent fully autonmously, but most things I'm at least paired up, reviewing
  diffs still, doing research while working, etc.\n3. In those varying levels of automation,
  I wanted the same amount of task tracking to a centralized location\n\nAnd after
  2 weeks of ADHD-driven hyper focus, and many iterations on Nexus,\nthen Nexus V2....
  what happened is that Nexus V2 died, and we say long live\nNexus V3!\n\n## Nexus
  V3: The Pragmatic Pivot\n\nNexus V3 is the same idea, but different approach...
  I'm leaning into opencode\ntooling specifically, dropping my care to support copilot
  given the lack of\nfeatures. I'm using a few opencode [plugins](https://opencode.ai/docs/plugins/)\n([opencode-notify](https://github.com/kdcokenny/opencode-notify)
  and\n[opencode-background-agents](https://github.com/kdcokenny/opencode-background-agents)\nand
  a few [commands](https://opencode.ai/docs/commands/). Instead of building\nmy own
  tracker, I'm using [kanboard](https://kanboard.org/) because it's\nbasically a feature-complete
  agile/sprint/kanban board that I use at home, has\na simple plugin ecosystem for
  light customization, and solves practically every\nstatus-tracking problem I tried
  to build from the ground up initially - ticket\ndependencies/linkages, actions to
  change ticket colors for a simple intuitive\nUI based on state, easy columns and
  tagging configuration, a simple API and\nthere's even an [mcp server](https://github.com/bivex/kanboard-mcp).\n\nSo,
  I've given up on the full automation for now, although\n[opencode-pilot](https://github.com/athal7/opencode-pilot)
  looks VERY PROMISING\nfor this in the future. Today though, through some simple
  commands to give to\nagents for updating kanboard, I manually put them in worktrees,
  and they get to\nwork - the tracking and human-in-the-loop model is going well for
  the work I\nneed done.\n\n## Lessons Learned\n\nI learned and relearned plenty of
  lessons on this over the last 2 weeks... Data\nmodels matter more than almost anything,
  well-defined workflows are required if\nyou want agents to help you iterate, and
  not everything has to be a product...\nThat last one's personal, but every time
  I have an idea I **think** is good,\nI'm sure it'll be something to share, but a
  good lesson for me is to just build\nthe things I need for me, and **eventually**
  maybe it can be cleaned up to\nshare, but when I start building something with anyone
  other than **me** in\nmind, I'm in for a long hard journey\n\n## Current State &
  Future\n\nSo what's the summary? I don't think I know how to agent super well yet
  - but\nI'm trying to get better to stay on the forefront of my co-workers who I
  see\nusing AI in simple and sometimes scary ways\n\n!!! danger \"Copilot x sudo\"\n\n
  \   Do not give copilot `sudo` on your CI server and say \"fix my problem\"... are
  you retarded???\n\nI am not going hardcore with [ralph\nwiggum](https://awesomeclaude.ai/ralph-wiggum)
  or\n[gastown](https://github.com/steveyegge/gastown) - although those inspired\nNexus
  v1 and v2, but I am dialing in my agentic workflow with some simple\nspecialized
  agents, farming out work to subagents for context management,\nplanning ahead of
  time to put appropriate context in a ticket, and getting\nclose to having agents
  check out tickets, make worktrees, and do simple work by\nthemselves (this was working
  in Nexus V2 but only intermittenly).\n\nSomeday I'll open-source Nexus and share
  the configuration and workflow, for\nnow it's private as I'm actually using it to
  build out what I want rather than\ntrying to recreate gastown with a cool space
  theme."
date: 2026-02-03
description: 'Introduction &amp; Background I&#x27;ve been using AI tools for codegen
  for a few years now, but not super

  heavily. I either use the in-line copilot stuff, whic'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Learning How To
    Agent</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Introduction &amp;
    Background I&#x27;ve been using AI tools for codegen for a few years now, but
    not super\nheavily. I either use the in-line copilot stuff, whic\" />\n <link
    href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Learning How To Agent | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/learning-how-to-agent\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Learning How To Agent | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Introduction &amp; Background I&#x27;ve been using AI tools for codegen
    for a few years now, but not super\nheavily. I either use the in-line copilot
    stuff, whic\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\"
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
    \           <span class=\"site-terminal__dir\">~/learning-how-to-agent</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\"
    alt=\"Learning How To Agent cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Learning
    How To Agent</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2026-02-03\">\n            February 03, 2026\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/genai/\" class=\"inline-block bg-primary-light text-accent-cool
    text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80 transition-colors
    border border-accent-cool/20 hover-lift\">\n                #genai\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"introduction--background\">Introduction
    &amp; Background <a class=\"header-anchor\" href=\"#introduction--background\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I've been using AI tools
    for codegen for a few years now, but not super\nheavily. I either use the in-line
    copilot stuff, which is like LSP on\nseteroids, or I have gone all the way to
    the other side of full on vibecoding\nwith Windsurf. That's been fun enough, but
    not super fulfilling and at the end\nof that I either have a simple webapp that
    does what I want but I don't\nunderstand, or else a half-broken thing I tried
    to understand but couldn't\nprompt in the right direction.</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">One Caveat</p>\n<p>My one caveat with Windsurf,
    which is a full IDE that I don't have a lot of comfortable navigation in due to
    all the Cascade keybindings clobbaring my own keymaps - is that with a HEAVY spec,
    it's done will with the Claude models at implementing a real idea I have. It's
    closer to vibe-engineering than vibe-coding, but that's my only instance, the
    rest of my Windsurf usage is &quot;make me a cool app - no mistakes&quot;</p>\n</div>\n<p>This
    year it feels like some tools exploded and\nI mentioned this in <a class=\"wikilink\"
    href=\"/new-job-caterpillar-autonomy\">new-job-caterpillar-autonomy</a>. I've
    been using\n<a href=\"https://opencode.ai\">opencode</a> a lot over the last few
    weeks and have iterated\nmany times already on a system of work that I'm trying
    to lean into for\nimproving my efficiency.</p>\n<h2 id=\"the-problem-space\">The
    Problem Space <a class=\"header-anchor\" href=\"#the-problem-space\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My desire for a great
    Developer Experience is years old now, shout out to\nThePrimeagen for his <a href=\"https://frontendmasters.com/courses/developer-productivity-v2/\">FEM\ncourse</a>
    and\n<a href=\"https://waylonwalker.com\">Waylon Walker</a> for being a constant
    source of\nencouragement to be the best developer I can be. I sometimes (often)
    get\ntunnel-visioned on developer-productivity initiatives and lose the forest\nthrough
    the trees when ironing out a workflow - generally to find out I way\nover complicated
    the solution OR worse, started solving a problem I don't even\nhave.</p>\n<h2
    id=\"first-attempt-local-progress-tracker\">First Attempt: Local Progress Tracker
    <a class=\"header-anchor\" href=\"#first-attempt-local-progress-tracker\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Well that's where I've
    been for a few weeks... I'm building Nexus, my\nsecond-brain at work to collaborate
    with agents on the truckload of stuff I'm\nexpected to get done. For a while now
    I've had a &quot;working-notes&quot; repo, which is\nbasically a blog, built with
    markata and navigated via markdown-lsp, where I do\nlike what I do here - take
    daily notes, track projects and status, and it gets\nbuilt into a nice little
    website I can reference with my boss.</p>\n<p>Now that we have copilot in full-swing,
    I'm trying to integrate agents a bit\nmore. Opencode has made this so nice - so
    many tools and modes of interaction,\nhighly customizable interface but also an
    amazing default experience... So I\nwas trying to lean into using agents and subagents
    for more work I started down\nthe path of building out a progress tracker. I started
    with a simple &quot;skill&quot;\nthat told the agent to put some info into a sqlite
    file, and even create the\nfile and schema based on the work. This worked fine,
    but was specific to each\nrepo (and actually each worktree I was in) and it was
    hard for me to get\nvisibility into all the work my fleet of agents was doing.
    Now that's actually\nproblem 1 - I don't have a fleet of agents, I had some terminal
    sessions going\nwith opencode, but I got it in my head that I was going to have
    an army of\nClaude's on my computer, constantly and autonomously knocking out
    tickets and I\nneeded to know who was doing what, where, when, and why..</p>\n<h2
    id=\"nexus-v1--v2-the-over-engineering-phase\">Nexus V1 &amp; V2: The Over-Engineering
    Phase <a class=\"header-anchor\" href=\"#nexus-v1--v2-the-over-engineering-phase\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So, I dropped the local
    &quot;progress tracker&quot; and jumped into a huge FastAPI\nproject that I called
    Nexus. It was a python cli + api, with a server for\ncentralized management. It
    presented a kanban board, had policy gates on\n&quot;plans&quot; being approved
    before work could start on an Epic (and therefore any\nchild tickets). It has
    worktree tracking and automation, etc. It had a lot...\nit didn't all work, and
    it was hard to build the autonomous system... I wanted\nagentic feedback loops
    where <code>voidshaper</code> and I made epic plans for Epics (see the pun?) and
    then once the Plan was approved <code>star-commander</code> comes on the scene
    and makes tickets or checks tickets, depending on what's already ready to go it
    farmed out the work to <code>starsmith</code> (and variants for complexity) to
    build and then automatically calls in <code>recon-officer</code> and <code>qa-engineer</code>
    and at the end of it <code>gatekeeper</code> came in and\napproved or denied the
    changes. If denied - automatically start the loop again,\ntracking the work in
    Nexus, if approved - rebase and merge the branch, clean up\nthe worktree, update
    the ticket, close it, and get working on the next thing\nthat opens up. Ticket
    dependencies were in there, tracking stale agent\nsessions, clever routing of
    tasks to smaller models where appropriate.... you\ncan see that I went too far
    too fast too hard.</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203124603_d5948740.png\"
    alt=\"20260203124603_d5948740.png\" /></p>\n<p>Nexus went through 2 or 3 iterations
    of this feature set. I was building it with several constraints in mind - specifically
    at work. 1. rate-limiting on large models (so not just using opus for everything),
    2. good stewardship (not burning down cities for docstrings - farm out that work
    to haiku or a -mini model), 3. Copilot support - even though I like to use opencode,
    I wanted to supper copilot cli and in vscode as a means to share this with my
    coworkers who were mostly using vscode, 4. agent sessions were dying so I needed
    some kind of liveness probe for manual intervention in sessions where maybe the
    vpn died and the agent lost network... stuff like this was on my mind - but you
    know what wasn't? actually doing some work... I was solving problems I don't have,
    but were fun to think about.</p>\n<h2 id=\"the-reality-check\">The Reality Check
    <a class=\"header-anchor\" href=\"#the-reality-check\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So, what are my problems?
    I boiled them down to a few things...</p>\n<ol>\n<li>I want to manage my workstreams
    in workspaces - folders on my computer where I put git worktrees</li>\n<li>I want
    varying levels of ai automation in my workflows... some things could be handled
    by an agent fully autonmously, but most things I'm at least paired up, reviewing
    diffs still, doing research while working, etc.</li>\n<li>In those varying levels
    of automation, I wanted the same amount of task tracking to a centralized location</li>\n</ol>\n<p>And
    after 2 weeks of ADHD-driven hyper focus, and many iterations on Nexus,\nthen
    Nexus V2.... what happened is that Nexus V2 died, and we say long live\nNexus
    V3!</p>\n<h2 id=\"nexus-v3-the-pragmatic-pivot\">Nexus V3: The Pragmatic Pivot
    <a class=\"header-anchor\" href=\"#nexus-v3-the-pragmatic-pivot\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Nexus V3 is the same
    idea, but different approach... I'm leaning into opencode\ntooling specifically,
    dropping my care to support copilot given the lack of\nfeatures. I'm using a few
    opencode <a href=\"https://opencode.ai/docs/plugins/\">plugins</a>\n(<a href=\"https://github.com/kdcokenny/opencode-notify\">opencode-notify</a>
    and\n<a href=\"https://github.com/kdcokenny/opencode-background-agents\">opencode-background-agents</a>\nand
    a few <a href=\"https://opencode.ai/docs/commands/\">commands</a>. Instead of
    building\nmy own tracker, I'm using <a href=\"https://kanboard.org/\">kanboard</a>
    because it's\nbasically a feature-complete agile/sprint/kanban board that I use
    at home, has\na simple plugin ecosystem for light customization, and solves practically
    every\nstatus-tracking problem I tried to build from the ground up initially -
    ticket\ndependencies/linkages, actions to change ticket colors for a simple intuitive\nUI
    based on state, easy columns and tagging configuration, a simple API and\nthere's
    even an <a href=\"https://github.com/bivex/kanboard-mcp\">mcp server</a>.</p>\n<p>So,
    I've given up on the full automation for now, although\n<a href=\"https://github.com/athal7/opencode-pilot\">opencode-pilot</a>
    looks VERY PROMISING\nfor this in the future. Today though, through some simple
    commands to give to\nagents for updating kanboard, I manually put them in worktrees,
    and they get to\nwork - the tracking and human-in-the-loop model is going well
    for the work I\nneed done.</p>\n<h2 id=\"lessons-learned\">Lessons Learned <a
    class=\"header-anchor\" href=\"#lessons-learned\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I learned and relearned
    plenty of lessons on this over the last 2 weeks... Data\nmodels matter more than
    almost anything, well-defined workflows are required if\nyou want agents to help
    you iterate, and not everything has to be a product...\nThat last one's personal,
    but every time I have an idea I <strong>think</strong> is good,\nI'm sure it'll
    be something to share, but a good lesson for me is to just build\nthe things I
    need for me, and <strong>eventually</strong> maybe it can be cleaned up to\nshare,
    but when I start building something with anyone other than <strong>me</strong>
    in\nmind, I'm in for a long hard journey</p>\n<h2 id=\"current-state--future\">Current
    State &amp; Future <a class=\"header-anchor\" href=\"#current-state--future\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So what's the summary?
    I don't think I know how to agent super well yet - but\nI'm trying to get better
    to stay on the forefront of my co-workers who I see\nusing AI in simple and sometimes
    scary ways</p>\n<div class=\"admonition danger\">\n<p class=\"admonition-title\">Copilot
    x sudo</p>\n<p>Do not give copilot <code>sudo</code> on your CI server and say
    &quot;fix my problem&quot;... are you retarded???</p>\n</div>\n<p>I am not going
    hardcore with <a href=\"https://awesomeclaude.ai/ralph-wiggum\">ralph\nwiggum</a>
    or\n<a href=\"https://github.com/steveyegge/gastown\">gastown</a> - although those
    inspired\nNexus v1 and v2, but I am dialing in my agentic workflow with some simple\nspecialized
    agents, farming out work to subagents for context management,\nplanning ahead
    of time to put appropriate context in a ticket, and getting\nclose to having agents
    check out tickets, make worktrees, and do simple work by\nthemselves (this was
    working in Nexus V2 but only intermittenly).</p>\n<p>Someday I'll open-source
    Nexus and share the configuration and workflow, for\nnow it's private as I'm actually
    using it to build out what I want rather than\ntrying to recreate gastown with
    a cool space theme.</p>\n\n        </section>\n    </article>\n</section>        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Learning How To Agent</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Introduction &amp; Background I&#x27;ve
    been using AI tools for codegen for a few years now, but not super\nheavily. I
    either use the in-line copilot stuff, whic\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Learning How To Agent | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/learning-how-to-agent\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Learning How To Agent | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Introduction &amp; Background I&#x27;ve been using AI tools for codegen
    for a few years now, but not super\nheavily. I either use the in-line copilot
    stuff, whic\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\"
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
    mb-4 post-title-large\">Learning How To Agent</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-02-03\">\n            February
    03, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/genai/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #genai\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\"
    alt=\"Learning How To Agent cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Learning
    How To Agent</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2026-02-03\">\n            February 03, 2026\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/genai/\" class=\"inline-block bg-primary-light text-accent-cool
    text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80 transition-colors
    border border-accent-cool/20 hover-lift\">\n                #genai\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"introduction--background\">Introduction
    &amp; Background <a class=\"header-anchor\" href=\"#introduction--background\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I've been using AI tools
    for codegen for a few years now, but not super\nheavily. I either use the in-line
    copilot stuff, which is like LSP on\nseteroids, or I have gone all the way to
    the other side of full on vibecoding\nwith Windsurf. That's been fun enough, but
    not super fulfilling and at the end\nof that I either have a simple webapp that
    does what I want but I don't\nunderstand, or else a half-broken thing I tried
    to understand but couldn't\nprompt in the right direction.</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">One Caveat</p>\n<p>My one caveat with Windsurf,
    which is a full IDE that I don't have a lot of comfortable navigation in due to
    all the Cascade keybindings clobbaring my own keymaps - is that with a HEAVY spec,
    it's done will with the Claude models at implementing a real idea I have. It's
    closer to vibe-engineering than vibe-coding, but that's my only instance, the
    rest of my Windsurf usage is &quot;make me a cool app - no mistakes&quot;</p>\n</div>\n<p>This
    year it feels like some tools exploded and\nI mentioned this in <a class=\"wikilink\"
    href=\"/new-job-caterpillar-autonomy\">new-job-caterpillar-autonomy</a>. I've
    been using\n<a href=\"https://opencode.ai\">opencode</a> a lot over the last few
    weeks and have iterated\nmany times already on a system of work that I'm trying
    to lean into for\nimproving my efficiency.</p>\n<h2 id=\"the-problem-space\">The
    Problem Space <a class=\"header-anchor\" href=\"#the-problem-space\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My desire for a great
    Developer Experience is years old now, shout out to\nThePrimeagen for his <a href=\"https://frontendmasters.com/courses/developer-productivity-v2/\">FEM\ncourse</a>
    and\n<a href=\"https://waylonwalker.com\">Waylon Walker</a> for being a constant
    source of\nencouragement to be the best developer I can be. I sometimes (often)
    get\ntunnel-visioned on developer-productivity initiatives and lose the forest\nthrough
    the trees when ironing out a workflow - generally to find out I way\nover complicated
    the solution OR worse, started solving a problem I don't even\nhave.</p>\n<h2
    id=\"first-attempt-local-progress-tracker\">First Attempt: Local Progress Tracker
    <a class=\"header-anchor\" href=\"#first-attempt-local-progress-tracker\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Well that's where I've
    been for a few weeks... I'm building Nexus, my\nsecond-brain at work to collaborate
    with agents on the truckload of stuff I'm\nexpected to get done. For a while now
    I've had a &quot;working-notes&quot; repo, which is\nbasically a blog, built with
    markata and navigated via markdown-lsp, where I do\nlike what I do here - take
    daily notes, track projects and status, and it gets\nbuilt into a nice little
    website I can reference with my boss.</p>\n<p>Now that we have copilot in full-swing,
    I'm trying to integrate agents a bit\nmore. Opencode has made this so nice - so
    many tools and modes of interaction,\nhighly customizable interface but also an
    amazing default experience... So I\nwas trying to lean into using agents and subagents
    for more work I started down\nthe path of building out a progress tracker. I started
    with a simple &quot;skill&quot;\nthat told the agent to put some info into a sqlite
    file, and even create the\nfile and schema based on the work. This worked fine,
    but was specific to each\nrepo (and actually each worktree I was in) and it was
    hard for me to get\nvisibility into all the work my fleet of agents was doing.
    Now that's actually\nproblem 1 - I don't have a fleet of agents, I had some terminal
    sessions going\nwith opencode, but I got it in my head that I was going to have
    an army of\nClaude's on my computer, constantly and autonomously knocking out
    tickets and I\nneeded to know who was doing what, where, when, and why..</p>\n<h2
    id=\"nexus-v1--v2-the-over-engineering-phase\">Nexus V1 &amp; V2: The Over-Engineering
    Phase <a class=\"header-anchor\" href=\"#nexus-v1--v2-the-over-engineering-phase\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So, I dropped the local
    &quot;progress tracker&quot; and jumped into a huge FastAPI\nproject that I called
    Nexus. It was a python cli + api, with a server for\ncentralized management. It
    presented a kanban board, had policy gates on\n&quot;plans&quot; being approved
    before work could start on an Epic (and therefore any\nchild tickets). It has
    worktree tracking and automation, etc. It had a lot...\nit didn't all work, and
    it was hard to build the autonomous system... I wanted\nagentic feedback loops
    where <code>voidshaper</code> and I made epic plans for Epics (see the pun?) and
    then once the Plan was approved <code>star-commander</code> comes on the scene
    and makes tickets or checks tickets, depending on what's already ready to go it
    farmed out the work to <code>starsmith</code> (and variants for complexity) to
    build and then automatically calls in <code>recon-officer</code> and <code>qa-engineer</code>
    and at the end of it <code>gatekeeper</code> came in and\napproved or denied the
    changes. If denied - automatically start the loop again,\ntracking the work in
    Nexus, if approved - rebase and merge the branch, clean up\nthe worktree, update
    the ticket, close it, and get working on the next thing\nthat opens up. Ticket
    dependencies were in there, tracking stale agent\nsessions, clever routing of
    tasks to smaller models where appropriate.... you\ncan see that I went too far
    too fast too hard.</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203124603_d5948740.png\"
    alt=\"20260203124603_d5948740.png\" /></p>\n<p>Nexus went through 2 or 3 iterations
    of this feature set. I was building it with several constraints in mind - specifically
    at work. 1. rate-limiting on large models (so not just using opus for everything),
    2. good stewardship (not burning down cities for docstrings - farm out that work
    to haiku or a -mini model), 3. Copilot support - even though I like to use opencode,
    I wanted to supper copilot cli and in vscode as a means to share this with my
    coworkers who were mostly using vscode, 4. agent sessions were dying so I needed
    some kind of liveness probe for manual intervention in sessions where maybe the
    vpn died and the agent lost network... stuff like this was on my mind - but you
    know what wasn't? actually doing some work... I was solving problems I don't have,
    but were fun to think about.</p>\n<h2 id=\"the-reality-check\">The Reality Check
    <a class=\"header-anchor\" href=\"#the-reality-check\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So, what are my problems?
    I boiled them down to a few things...</p>\n<ol>\n<li>I want to manage my workstreams
    in workspaces - folders on my computer where I put git worktrees</li>\n<li>I want
    varying levels of ai automation in my workflows... some things could be handled
    by an agent fully autonmously, but most things I'm at least paired up, reviewing
    diffs still, doing research while working, etc.</li>\n<li>In those varying levels
    of automation, I wanted the same amount of task tracking to a centralized location</li>\n</ol>\n<p>And
    after 2 weeks of ADHD-driven hyper focus, and many iterations on Nexus,\nthen
    Nexus V2.... what happened is that Nexus V2 died, and we say long live\nNexus
    V3!</p>\n<h2 id=\"nexus-v3-the-pragmatic-pivot\">Nexus V3: The Pragmatic Pivot
    <a class=\"header-anchor\" href=\"#nexus-v3-the-pragmatic-pivot\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Nexus V3 is the same
    idea, but different approach... I'm leaning into opencode\ntooling specifically,
    dropping my care to support copilot given the lack of\nfeatures. I'm using a few
    opencode <a href=\"https://opencode.ai/docs/plugins/\">plugins</a>\n(<a href=\"https://github.com/kdcokenny/opencode-notify\">opencode-notify</a>
    and\n<a href=\"https://github.com/kdcokenny/opencode-background-agents\">opencode-background-agents</a>\nand
    a few <a href=\"https://opencode.ai/docs/commands/\">commands</a>. Instead of
    building\nmy own tracker, I'm using <a href=\"https://kanboard.org/\">kanboard</a>
    because it's\nbasically a feature-complete agile/sprint/kanban board that I use
    at home, has\na simple plugin ecosystem for light customization, and solves practically
    every\nstatus-tracking problem I tried to build from the ground up initially -
    ticket\ndependencies/linkages, actions to change ticket colors for a simple intuitive\nUI
    based on state, easy columns and tagging configuration, a simple API and\nthere's
    even an <a href=\"https://github.com/bivex/kanboard-mcp\">mcp server</a>.</p>\n<p>So,
    I've given up on the full automation for now, although\n<a href=\"https://github.com/athal7/opencode-pilot\">opencode-pilot</a>
    looks VERY PROMISING\nfor this in the future. Today though, through some simple
    commands to give to\nagents for updating kanboard, I manually put them in worktrees,
    and they get to\nwork - the tracking and human-in-the-loop model is going well
    for the work I\nneed done.</p>\n<h2 id=\"lessons-learned\">Lessons Learned <a
    class=\"header-anchor\" href=\"#lessons-learned\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I learned and relearned
    plenty of lessons on this over the last 2 weeks... Data\nmodels matter more than
    almost anything, well-defined workflows are required if\nyou want agents to help
    you iterate, and not everything has to be a product...\nThat last one's personal,
    but every time I have an idea I <strong>think</strong> is good,\nI'm sure it'll
    be something to share, but a good lesson for me is to just build\nthe things I
    need for me, and <strong>eventually</strong> maybe it can be cleaned up to\nshare,
    but when I start building something with anyone other than <strong>me</strong>
    in\nmind, I'm in for a long hard journey</p>\n<h2 id=\"current-state--future\">Current
    State &amp; Future <a class=\"header-anchor\" href=\"#current-state--future\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So what's the summary?
    I don't think I know how to agent super well yet - but\nI'm trying to get better
    to stay on the forefront of my co-workers who I see\nusing AI in simple and sometimes
    scary ways</p>\n<div class=\"admonition danger\">\n<p class=\"admonition-title\">Copilot
    x sudo</p>\n<p>Do not give copilot <code>sudo</code> on your CI server and say
    &quot;fix my problem&quot;... are you retarded???</p>\n</div>\n<p>I am not going
    hardcore with <a href=\"https://awesomeclaude.ai/ralph-wiggum\">ralph\nwiggum</a>
    or\n<a href=\"https://github.com/steveyegge/gastown\">gastown</a> - although those
    inspired\nNexus v1 and v2, but I am dialing in my agentic workflow with some simple\nspecialized
    agents, farming out work to subagents for context management,\nplanning ahead
    of time to put appropriate context in a ticket, and getting\nclose to having agents
    check out tickets, make worktrees, and do simple work by\nthemselves (this was
    working in Nexus V2 but only intermittenly).</p>\n<p>Someday I'll open-source
    Nexus and share the configuration and workflow, for\nnow it's private as I'm actually
    using it to build out what I want rather than\ntrying to recreate gastown with
    a cool space theme.</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Learning
    How To Agent</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Introduction &amp;
    Background I&#x27;ve been using AI tools for codegen for a few years now, but
    not super\nheavily. I either use the in-line copilot stuff, whic\" />\n <link
    href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Learning How To Agent | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/learning-how-to-agent\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Learning How To Agent | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Introduction &amp; Background I&#x27;ve been using AI tools for codegen
    for a few years now, but not super\nheavily. I either use the in-line copilot
    stuff, whic\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\"
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
    \           <span class=\"site-terminal__dir\">~/learning-how-to-agent</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"introduction--background\">Introduction
    &amp; Background <a class=\"header-anchor\" href=\"#introduction--background\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I've been using AI tools
    for codegen for a few years now, but not super\nheavily. I either use the in-line
    copilot stuff, which is like LSP on\nseteroids, or I have gone all the way to
    the other side of full on vibecoding\nwith Windsurf. That's been fun enough, but
    not super fulfilling and at the end\nof that I either have a simple webapp that
    does what I want but I don't\nunderstand, or else a half-broken thing I tried
    to understand but couldn't\nprompt in the right direction.</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">One Caveat</p>\n<p>My one caveat with Windsurf,
    which is a full IDE that I don't have a lot of comfortable navigation in due to
    all the Cascade keybindings clobbaring my own keymaps - is that with a HEAVY spec,
    it's done will with the Claude models at implementing a real idea I have. It's
    closer to vibe-engineering than vibe-coding, but that's my only instance, the
    rest of my Windsurf usage is &quot;make me a cool app - no mistakes&quot;</p>\n</div>\n<p>This
    year it feels like some tools exploded and\nI mentioned this in <a class=\"wikilink\"
    href=\"/new-job-caterpillar-autonomy\">new-job-caterpillar-autonomy</a>. I've
    been using\n<a href=\"https://opencode.ai\">opencode</a> a lot over the last few
    weeks and have iterated\nmany times already on a system of work that I'm trying
    to lean into for\nimproving my efficiency.</p>\n<h2 id=\"the-problem-space\">The
    Problem Space <a class=\"header-anchor\" href=\"#the-problem-space\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My desire for a great
    Developer Experience is years old now, shout out to\nThePrimeagen for his <a href=\"https://frontendmasters.com/courses/developer-productivity-v2/\">FEM\ncourse</a>
    and\n<a href=\"https://waylonwalker.com\">Waylon Walker</a> for being a constant
    source of\nencouragement to be the best developer I can be. I sometimes (often)
    get\ntunnel-visioned on developer-productivity initiatives and lose the forest\nthrough
    the trees when ironing out a workflow - generally to find out I way\nover complicated
    the solution OR worse, started solving a problem I don't even\nhave.</p>\n<h2
    id=\"first-attempt-local-progress-tracker\">First Attempt: Local Progress Tracker
    <a class=\"header-anchor\" href=\"#first-attempt-local-progress-tracker\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Well that's where I've
    been for a few weeks... I'm building Nexus, my\nsecond-brain at work to collaborate
    with agents on the truckload of stuff I'm\nexpected to get done. For a while now
    I've had a &quot;working-notes&quot; repo, which is\nbasically a blog, built with
    markata and navigated via markdown-lsp, where I do\nlike what I do here - take
    daily notes, track projects and status, and it gets\nbuilt into a nice little
    website I can reference with my boss.</p>\n<p>Now that we have copilot in full-swing,
    I'm trying to integrate agents a bit\nmore. Opencode has made this so nice - so
    many tools and modes of interaction,\nhighly customizable interface but also an
    amazing default experience... So I\nwas trying to lean into using agents and subagents
    for more work I started down\nthe path of building out a progress tracker. I started
    with a simple &quot;skill&quot;\nthat told the agent to put some info into a sqlite
    file, and even create the\nfile and schema based on the work. This worked fine,
    but was specific to each\nrepo (and actually each worktree I was in) and it was
    hard for me to get\nvisibility into all the work my fleet of agents was doing.
    Now that's actually\nproblem 1 - I don't have a fleet of agents, I had some terminal
    sessions going\nwith opencode, but I got it in my head that I was going to have
    an army of\nClaude's on my computer, constantly and autonomously knocking out
    tickets and I\nneeded to know who was doing what, where, when, and why..</p>\n<h2
    id=\"nexus-v1--v2-the-over-engineering-phase\">Nexus V1 &amp; V2: The Over-Engineering
    Phase <a class=\"header-anchor\" href=\"#nexus-v1--v2-the-over-engineering-phase\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So, I dropped the local
    &quot;progress tracker&quot; and jumped into a huge FastAPI\nproject that I called
    Nexus. It was a python cli + api, with a server for\ncentralized management. It
    presented a kanban board, had policy gates on\n&quot;plans&quot; being approved
    before work could start on an Epic (and therefore any\nchild tickets). It has
    worktree tracking and automation, etc. It had a lot...\nit didn't all work, and
    it was hard to build the autonomous system... I wanted\nagentic feedback loops
    where <code>voidshaper</code> and I made epic plans for Epics (see the pun?) and
    then once the Plan was approved <code>star-commander</code> comes on the scene
    and makes tickets or checks tickets, depending on what's already ready to go it
    farmed out the work to <code>starsmith</code> (and variants for complexity) to
    build and then automatically calls in <code>recon-officer</code> and <code>qa-engineer</code>
    and at the end of it <code>gatekeeper</code> came in and\napproved or denied the
    changes. If denied - automatically start the loop again,\ntracking the work in
    Nexus, if approved - rebase and merge the branch, clean up\nthe worktree, update
    the ticket, close it, and get working on the next thing\nthat opens up. Ticket
    dependencies were in there, tracking stale agent\nsessions, clever routing of
    tasks to smaller models where appropriate.... you\ncan see that I went too far
    too fast too hard.</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203124603_d5948740.png\"
    alt=\"20260203124603_d5948740.png\" /></p>\n<p>Nexus went through 2 or 3 iterations
    of this feature set. I was building it with several constraints in mind - specifically
    at work. 1. rate-limiting on large models (so not just using opus for everything),
    2. good stewardship (not burning down cities for docstrings - farm out that work
    to haiku or a -mini model), 3. Copilot support - even though I like to use opencode,
    I wanted to supper copilot cli and in vscode as a means to share this with my
    coworkers who were mostly using vscode, 4. agent sessions were dying so I needed
    some kind of liveness probe for manual intervention in sessions where maybe the
    vpn died and the agent lost network... stuff like this was on my mind - but you
    know what wasn't? actually doing some work... I was solving problems I don't have,
    but were fun to think about.</p>\n<h2 id=\"the-reality-check\">The Reality Check
    <a class=\"header-anchor\" href=\"#the-reality-check\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So, what are my problems?
    I boiled them down to a few things...</p>\n<ol>\n<li>I want to manage my workstreams
    in workspaces - folders on my computer where I put git worktrees</li>\n<li>I want
    varying levels of ai automation in my workflows... some things could be handled
    by an agent fully autonmously, but most things I'm at least paired up, reviewing
    diffs still, doing research while working, etc.</li>\n<li>In those varying levels
    of automation, I wanted the same amount of task tracking to a centralized location</li>\n</ol>\n<p>And
    after 2 weeks of ADHD-driven hyper focus, and many iterations on Nexus,\nthen
    Nexus V2.... what happened is that Nexus V2 died, and we say long live\nNexus
    V3!</p>\n<h2 id=\"nexus-v3-the-pragmatic-pivot\">Nexus V3: The Pragmatic Pivot
    <a class=\"header-anchor\" href=\"#nexus-v3-the-pragmatic-pivot\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Nexus V3 is the same
    idea, but different approach... I'm leaning into opencode\ntooling specifically,
    dropping my care to support copilot given the lack of\nfeatures. I'm using a few
    opencode <a href=\"https://opencode.ai/docs/plugins/\">plugins</a>\n(<a href=\"https://github.com/kdcokenny/opencode-notify\">opencode-notify</a>
    and\n<a href=\"https://github.com/kdcokenny/opencode-background-agents\">opencode-background-agents</a>\nand
    a few <a href=\"https://opencode.ai/docs/commands/\">commands</a>. Instead of
    building\nmy own tracker, I'm using <a href=\"https://kanboard.org/\">kanboard</a>
    because it's\nbasically a feature-complete agile/sprint/kanban board that I use
    at home, has\na simple plugin ecosystem for light customization, and solves practically
    every\nstatus-tracking problem I tried to build from the ground up initially -
    ticket\ndependencies/linkages, actions to change ticket colors for a simple intuitive\nUI
    based on state, easy columns and tagging configuration, a simple API and\nthere's
    even an <a href=\"https://github.com/bivex/kanboard-mcp\">mcp server</a>.</p>\n<p>So,
    I've given up on the full automation for now, although\n<a href=\"https://github.com/athal7/opencode-pilot\">opencode-pilot</a>
    looks VERY PROMISING\nfor this in the future. Today though, through some simple
    commands to give to\nagents for updating kanboard, I manually put them in worktrees,
    and they get to\nwork - the tracking and human-in-the-loop model is going well
    for the work I\nneed done.</p>\n<h2 id=\"lessons-learned\">Lessons Learned <a
    class=\"header-anchor\" href=\"#lessons-learned\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I learned and relearned
    plenty of lessons on this over the last 2 weeks... Data\nmodels matter more than
    almost anything, well-defined workflows are required if\nyou want agents to help
    you iterate, and not everything has to be a product...\nThat last one's personal,
    but every time I have an idea I <strong>think</strong> is good,\nI'm sure it'll
    be something to share, but a good lesson for me is to just build\nthe things I
    need for me, and <strong>eventually</strong> maybe it can be cleaned up to\nshare,
    but when I start building something with anyone other than <strong>me</strong>
    in\nmind, I'm in for a long hard journey</p>\n<h2 id=\"current-state--future\">Current
    State &amp; Future <a class=\"header-anchor\" href=\"#current-state--future\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So what's the summary?
    I don't think I know how to agent super well yet - but\nI'm trying to get better
    to stay on the forefront of my co-workers who I see\nusing AI in simple and sometimes
    scary ways</p>\n<div class=\"admonition danger\">\n<p class=\"admonition-title\">Copilot
    x sudo</p>\n<p>Do not give copilot <code>sudo</code> on your CI server and say
    &quot;fix my problem&quot;... are you retarded???</p>\n</div>\n<p>I am not going
    hardcore with <a href=\"https://awesomeclaude.ai/ralph-wiggum\">ralph\nwiggum</a>
    or\n<a href=\"https://github.com/steveyegge/gastown\">gastown</a> - although those
    inspired\nNexus v1 and v2, but I am dialing in my agentic workflow with some simple\nspecialized
    agents, farming out work to subagents for context management,\nplanning ahead
    of time to put appropriate context in a ticket, and getting\nclose to having agents
    check out tickets, make worktrees, and do simple work by\nthemselves (this was
    working in Nexus V2 but only intermittenly).</p>\n<p>Someday I'll open-source
    Nexus and share the configuration and workflow, for\nnow it's private as I'm actually
    using it to build out what I want rather than\ntrying to recreate gastown with
    a cool space theme.</p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2026-02-03 05:50:33\ntemplateKey: blog-post\ntitle: Learning
    How To Agent\npublished: True\ncover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png\ntags:\n
    \ - genai\n  - tech\n---\n\n## Introduction & Background\n\nI've been using AI
    tools for codegen for a few years now, but not super\nheavily. I either use the
    in-line copilot stuff, which is like LSP on\nseteroids, or I have gone all the
    way to the other side of full on vibecoding\nwith Windsurf. That's been fun enough,
    but not super fulfilling and at the end\nof that I either have a simple webapp
    that does what I want but I don't\nunderstand, or else a half-broken thing I tried
    to understand but couldn't\nprompt in the right direction.\n\n!!! note \"One Caveat\"\n\n
    \   My one caveat with Windsurf, which is a full IDE that I don't have a lot of
    comfortable navigation in due to all the Cascade keybindings clobbaring my own
    keymaps - is that with a HEAVY spec, it's done will with the Claude models at
    implementing a real idea I have. It's closer to vibe-engineering than vibe-coding,
    but that's my only instance, the rest of my Windsurf usage is \"make me a cool
    app - no mistakes\"\n\nThis year it feels like some tools exploded and\nI mentioned
    this in [[new-job-caterpillar-autonomy]]. I've been using\n[opencode](https://opencode.ai)
    a lot over the last few weeks and have iterated\nmany times already on a system
    of work that I'm trying to lean into for\nimproving my efficiency.\n\n## The Problem
    Space\n\nMy desire for a great Developer Experience is years old now, shout out
    to\nThePrimeagen for his [FEM\ncourse](https://frontendmasters.com/courses/developer-productivity-v2/)
    and\n[Waylon Walker](https://waylonwalker.com) for being a constant source of\nencouragement
    to be the best developer I can be. I sometimes (often) get\ntunnel-visioned on
    developer-productivity initiatives and lose the forest\nthrough the trees when
    ironing out a workflow - generally to find out I way\nover complicated the solution
    OR worse, started solving a problem I don't even\nhave.\n\n## First Attempt: Local
    Progress Tracker\n\nWell that's where I've been for a few weeks... I'm building
    Nexus, my\nsecond-brain at work to collaborate with agents on the truckload of
    stuff I'm\nexpected to get done. For a while now I've had a \"working-notes\"
    repo, which is\nbasically a blog, built with markata and navigated via markdown-lsp,
    where I do\nlike what I do here - take daily notes, track projects and status,
    and it gets\nbuilt into a nice little website I can reference with my boss.\n\nNow
    that we have copilot in full-swing, I'm trying to integrate agents a bit\nmore.
    Opencode has made this so nice - so many tools and modes of interaction,\nhighly
    customizable interface but also an amazing default experience... So I\nwas trying
    to lean into using agents and subagents for more work I started down\nthe path
    of building out a progress tracker. I started with a simple \"skill\"\nthat told
    the agent to put some info into a sqlite file, and even create the\nfile and schema
    based on the work. This worked fine, but was specific to each\nrepo (and actually
    each worktree I was in) and it was hard for me to get\nvisibility into all the
    work my fleet of agents was doing. Now that's actually\nproblem 1 - I don't have
    a fleet of agents, I had some terminal sessions going\nwith opencode, but I got
    it in my head that I was going to have an army of\nClaude's on my computer, constantly
    and autonomously knocking out tickets and I\nneeded to know who was doing what,
    where, when, and why..\n\n## Nexus V1 & V2: The Over-Engineering Phase\n\nSo,
    I dropped the local \"progress tracker\" and jumped into a huge FastAPI\nproject
    that I called Nexus. It was a python cli + api, with a server for\ncentralized
    management. It presented a kanban board, had policy gates on\n\"plans\" being
    approved before work could start on an Epic (and therefore any\nchild tickets).
    It has worktree tracking and automation, etc. It had a lot...\nit didn't all work,
    and it was hard to build the autonomous system... I wanted\nagentic feedback loops
    where `voidshaper` and I made epic plans for Epics (see the pun?) and then once
    the Plan was approved `star-commander` comes on the scene and makes tickets or
    checks tickets, depending on what's already ready to go it farmed out the work
    to `starsmith` (and variants for complexity) to build and then automatically calls
    in `recon-officer` and `qa-engineer` and at the end of it `gatekeeper` came in
    and\napproved or denied the changes. If denied - automatically start the loop
    again,\ntracking the work in Nexus, if approved - rebase and merge the branch,
    clean up\nthe worktree, update the ticket, close it, and get working on the next
    thing\nthat opens up. Ticket dependencies were in there, tracking stale agent\nsessions,
    clever routing of tasks to smaller models where appropriate.... you\ncan see that
    I went too far too fast too hard.\n\n![20260203124603_d5948740.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203124603_d5948740.png)\n\nNexus
    went through 2 or 3 iterations of this feature set. I was building it with several
    constraints in mind - specifically at work. 1. rate-limiting on large models (so
    not just using opus for everything), 2. good stewardship (not burning down cities
    for docstrings - farm out that work to haiku or a -mini model), 3. Copilot support
    - even though I like to use opencode, I wanted to supper copilot cli and in vscode
    as a means to share this with my coworkers who were mostly using vscode, 4. agent
    sessions were dying so I needed some kind of liveness probe for manual intervention
    in sessions where maybe the vpn died and the agent lost network... stuff like
    this was on my mind - but you know what wasn't? actually doing some work... I
    was solving problems I don't have, but were fun to think about.\n\n## The Reality
    Check\n\nSo, what are my problems? I boiled them down to a few things...\n\n1.
    I want to manage my workstreams in workspaces - folders on my computer where I
    put git worktrees\n2. I want varying levels of ai automation in my workflows...
    some things could be handled by an agent fully autonmously, but most things I'm
    at least paired up, reviewing diffs still, doing research while working, etc.\n3.
    In those varying levels of automation, I wanted the same amount of task tracking
    to a centralized location\n\nAnd after 2 weeks of ADHD-driven hyper focus, and
    many iterations on Nexus,\nthen Nexus V2.... what happened is that Nexus V2 died,
    and we say long live\nNexus V3!\n\n## Nexus V3: The Pragmatic Pivot\n\nNexus V3
    is the same idea, but different approach... I'm leaning into opencode\ntooling
    specifically, dropping my care to support copilot given the lack of\nfeatures.
    I'm using a few opencode [plugins](https://opencode.ai/docs/plugins/)\n([opencode-notify](https://github.com/kdcokenny/opencode-notify)
    and\n[opencode-background-agents](https://github.com/kdcokenny/opencode-background-agents)\nand
    a few [commands](https://opencode.ai/docs/commands/). Instead of building\nmy
    own tracker, I'm using [kanboard](https://kanboard.org/) because it's\nbasically
    a feature-complete agile/sprint/kanban board that I use at home, has\na simple
    plugin ecosystem for light customization, and solves practically every\nstatus-tracking
    problem I tried to build from the ground up initially - ticket\ndependencies/linkages,
    actions to change ticket colors for a simple intuitive\nUI based on state, easy
    columns and tagging configuration, a simple API and\nthere's even an [mcp server](https://github.com/bivex/kanboard-mcp).\n\nSo,
    I've given up on the full automation for now, although\n[opencode-pilot](https://github.com/athal7/opencode-pilot)
    looks VERY PROMISING\nfor this in the future. Today though, through some simple
    commands to give to\nagents for updating kanboard, I manually put them in worktrees,
    and they get to\nwork - the tracking and human-in-the-loop model is going well
    for the work I\nneed done.\n\n## Lessons Learned\n\nI learned and relearned plenty
    of lessons on this over the last 2 weeks... Data\nmodels matter more than almost
    anything, well-defined workflows are required if\nyou want agents to help you
    iterate, and not everything has to be a product...\nThat last one's personal,
    but every time I have an idea I **think** is good,\nI'm sure it'll be something
    to share, but a good lesson for me is to just build\nthe things I need for me,
    and **eventually** maybe it can be cleaned up to\nshare, but when I start building
    something with anyone other than **me** in\nmind, I'm in for a long hard journey\n\n##
    Current State & Future\n\nSo what's the summary? I don't think I know how to agent
    super well yet - but\nI'm trying to get better to stay on the forefront of my
    co-workers who I see\nusing AI in simple and sometimes scary ways\n\n!!! danger
    \"Copilot x sudo\"\n\n    Do not give copilot `sudo` on your CI server and say
    \"fix my problem\"... are you retarded???\n\nI am not going hardcore with [ralph\nwiggum](https://awesomeclaude.ai/ralph-wiggum)
    or\n[gastown](https://github.com/steveyegge/gastown) - although those inspired\nNexus
    v1 and v2, but I am dialing in my agentic workflow with some simple\nspecialized
    agents, farming out work to subagents for context management,\nplanning ahead
    of time to put appropriate context in a ticket, and getting\nclose to having agents
    check out tickets, make worktrees, and do simple work by\nthemselves (this was
    working in Nexus V2 but only intermittenly).\n\nSomeday I'll open-source Nexus
    and share the configuration and workflow, for\nnow it's private as I'm actually
    using it to build out what I want rather than\ntrying to recreate gastown with
    a cool space theme.\n"
published: true
slug: learning-how-to-agent
title: Learning How To Agent


---

## Introduction & Background

I've been using AI tools for codegen for a few years now, but not super
heavily. I either use the in-line copilot stuff, which is like LSP on
seteroids, or I have gone all the way to the other side of full on vibecoding
with Windsurf. That's been fun enough, but not super fulfilling and at the end
of that I either have a simple webapp that does what I want but I don't
understand, or else a half-broken thing I tried to understand but couldn't
prompt in the right direction.

!!! note "One Caveat"

    My one caveat with Windsurf, which is a full IDE that I don't have a lot of comfortable navigation in due to all the Cascade keybindings clobbaring my own keymaps - is that with a HEAVY spec, it's done will with the Claude models at implementing a real idea I have. It's closer to vibe-engineering than vibe-coding, but that's my only instance, the rest of my Windsurf usage is "make me a cool app - no mistakes"

This year it feels like some tools exploded and
I mentioned this in [[new-job-caterpillar-autonomy]]. I've been using
[opencode](https://opencode.ai) a lot over the last few weeks and have iterated
many times already on a system of work that I'm trying to lean into for
improving my efficiency.

## The Problem Space

My desire for a great Developer Experience is years old now, shout out to
ThePrimeagen for his [FEM
course](https://frontendmasters.com/courses/developer-productivity-v2/) and
[Waylon Walker](https://waylonwalker.com) for being a constant source of
encouragement to be the best developer I can be. I sometimes (often) get
tunnel-visioned on developer-productivity initiatives and lose the forest
through the trees when ironing out a workflow - generally to find out I way
over complicated the solution OR worse, started solving a problem I don't even
have.

## First Attempt: Local Progress Tracker

Well that's where I've been for a few weeks... I'm building Nexus, my
second-brain at work to collaborate with agents on the truckload of stuff I'm
expected to get done. For a while now I've had a "working-notes" repo, which is
basically a blog, built with markata and navigated via markdown-lsp, where I do
like what I do here - take daily notes, track projects and status, and it gets
built into a nice little website I can reference with my boss.

Now that we have copilot in full-swing, I'm trying to integrate agents a bit
more. Opencode has made this so nice - so many tools and modes of interaction,
highly customizable interface but also an amazing default experience... So I
was trying to lean into using agents and subagents for more work I started down
the path of building out a progress tracker. I started with a simple "skill"
that told the agent to put some info into a sqlite file, and even create the
file and schema based on the work. This worked fine, but was specific to each
repo (and actually each worktree I was in) and it was hard for me to get
visibility into all the work my fleet of agents was doing. Now that's actually
problem 1 - I don't have a fleet of agents, I had some terminal sessions going
with opencode, but I got it in my head that I was going to have an army of
Claude's on my computer, constantly and autonomously knocking out tickets and I
needed to know who was doing what, where, when, and why..

## Nexus V1 & V2: The Over-Engineering Phase

So, I dropped the local "progress tracker" and jumped into a huge FastAPI
project that I called Nexus. It was a python cli + api, with a server for
centralized management. It presented a kanban board, had policy gates on
"plans" being approved before work could start on an Epic (and therefore any
child tickets). It has worktree tracking and automation, etc. It had a lot...
it didn't all work, and it was hard to build the autonomous system... I wanted
agentic feedback loops where `voidshaper` and I made epic plans for Epics (see the pun?) and then once the Plan was approved `star-commander` comes on the scene and makes tickets or checks tickets, depending on what's already ready to go it farmed out the work to `starsmith` (and variants for complexity) to build and then automatically calls in `recon-officer` and `qa-engineer` and at the end of it `gatekeeper` came in and
approved or denied the changes. If denied - automatically start the loop again,
tracking the work in Nexus, if approved - rebase and merge the branch, clean up
the worktree, update the ticket, close it, and get working on the next thing
that opens up. Ticket dependencies were in there, tracking stale agent
sessions, clever routing of tasks to smaller models where appropriate.... you
can see that I went too far too fast too hard.

![20260203124603_d5948740.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203124603_d5948740.png)

Nexus went through 2 or 3 iterations of this feature set. I was building it with several constraints in mind - specifically at work. 1. rate-limiting on large models (so not just using opus for everything), 2. good stewardship (not burning down cities for docstrings - farm out that work to haiku or a -mini model), 3. Copilot support - even though I like to use opencode, I wanted to supper copilot cli and in vscode as a means to share this with my coworkers who were mostly using vscode, 4. agent sessions were dying so I needed some kind of liveness probe for manual intervention in sessions where maybe the vpn died and the agent lost network... stuff like this was on my mind - but you know what wasn't? actually doing some work... I was solving problems I don't have, but were fun to think about.

## The Reality Check

So, what are my problems? I boiled them down to a few things...

1. I want to manage my workstreams in workspaces - folders on my computer where I put git worktrees
2. I want varying levels of ai automation in my workflows... some things could be handled by an agent fully autonmously, but most things I'm at least paired up, reviewing diffs still, doing research while working, etc.
3. In those varying levels of automation, I wanted the same amount of task tracking to a centralized location

And after 2 weeks of ADHD-driven hyper focus, and many iterations on Nexus,
then Nexus V2.... what happened is that Nexus V2 died, and we say long live
Nexus V3!

## Nexus V3: The Pragmatic Pivot

Nexus V3 is the same idea, but different approach... I'm leaning into opencode
tooling specifically, dropping my care to support copilot given the lack of
features. I'm using a few opencode [plugins](https://opencode.ai/docs/plugins/)
([opencode-notify](https://github.com/kdcokenny/opencode-notify) and
[opencode-background-agents](https://github.com/kdcokenny/opencode-background-agents)
and a few [commands](https://opencode.ai/docs/commands/). Instead of building
my own tracker, I'm using [kanboard](https://kanboard.org/) because it's
basically a feature-complete agile/sprint/kanban board that I use at home, has
a simple plugin ecosystem for light customization, and solves practically every
status-tracking problem I tried to build from the ground up initially - ticket
dependencies/linkages, actions to change ticket colors for a simple intuitive
UI based on state, easy columns and tagging configuration, a simple API and
there's even an [mcp server](https://github.com/bivex/kanboard-mcp).

So, I've given up on the full automation for now, although
[opencode-pilot](https://github.com/athal7/opencode-pilot) looks VERY PROMISING
for this in the future. Today though, through some simple commands to give to
agents for updating kanboard, I manually put them in worktrees, and they get to
work - the tracking and human-in-the-loop model is going well for the work I
need done.

## Lessons Learned

I learned and relearned plenty of lessons on this over the last 2 weeks... Data
models matter more than almost anything, well-defined workflows are required if
you want agents to help you iterate, and not everything has to be a product...
That last one's personal, but every time I have an idea I **think** is good,
I'm sure it'll be something to share, but a good lesson for me is to just build
the things I need for me, and **eventually** maybe it can be cleaned up to
share, but when I start building something with anyone other than **me** in
mind, I'm in for a long hard journey

## Current State & Future

So what's the summary? I don't think I know how to agent super well yet - but
I'm trying to get better to stay on the forefront of my co-workers who I see
using AI in simple and sometimes scary ways

!!! danger "Copilot x sudo"

    Do not give copilot `sudo` on your CI server and say "fix my problem"... are you retarded???

I am not going hardcore with [ralph
wiggum](https://awesomeclaude.ai/ralph-wiggum) or
[gastown](https://github.com/steveyegge/gastown) - although those inspired
Nexus v1 and v2, but I am dialing in my agentic workflow with some simple
specialized agents, farming out work to subagents for context management,
planning ahead of time to put appropriate context in a ticket, and getting
close to having agents check out tickets, make worktrees, and do simple work by
themselves (this was working in Nexus V2 but only intermittenly).

Someday I'll open-source Nexus and share the configuration and workflow, for
now it's private as I'm actually using it to build out what I want rather than
trying to recreate gastown with a cool space theme.