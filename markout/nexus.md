---
content: "Nexus is a task tracker and second-brain for collaborating with AI agents
  on software development. It keeps project boards, task details, subtasks, daily
  notes, and Git worktree context together in one system.\n\n## Why Nexus\n\nI built
  Nexus because I work with AI agents across multiple parallel work streams and need
  a way to:\n\n- Track what agents are working on and have them check-in regularly\n-
  Capture lightweight memories without forcing everything to become executable work
  immediately\n- Keep task-to-branch context when starting work\n- Use daily notes
  inside the same system\n\n## Architecture\n\n```\nHuman\n  |\n  +-- Agent Harness
  (GitHub Copilot CLI)\n  |     +-- Agents (orchestrator + specialists)\n  |     +--
  Platform hooks / commands\n  |\n  +-- nexus CLI (PEP 723 single-file script)\n  |
  \    |\n  |     +-- Nexus API (FastAPI, port 8090)\n  |           +-- Nexus DB (Postgres
  16 + pgvector)\n  |\n  +-- Go TUI (primary interface)\n  +-- Git (worktrees, branches)\n```\n\n##
  Components\n\n### Core Stack\n\n- **Nexus API** \u2014 FastAPI REST backend. Projects,
  tasks, tags, dependencies, comments, and global discoveries. Tasks flow through
  `backlog` \u2192 `wip` \u2192 `done` with first-class readiness (`is_ready`) and
  blocking (`is_blocked`) markers.\n- **Nexus DB** \u2014 Postgres 16 with pgvector
  for vector storage (future AI memory features).\n- **nexus CLI** \u2014 PEP 723
  single-file Python script. All agent-to-Nexus communication goes through this. JSON
  output for agents, human-readable for humans.\n- **Go TUI** \u2014 Terminal UI,
  the primary interface for dayFalse-to-day task management.\n\n### Agent Integration\n\n-
  **Copilot CLI plugin** (`copilot/`) \u2014 GitHub Copilot integration with custom
  skills:\n  - `nexus` \u2014 Core task and lifecycle commands\n  - `nexus-specialist`
  \u2014 Task-specific expertise\n  - `nexus-delegation` \u2014 Delegation patterns\n
  \ - `daily-summary` \u2014 Daily progress summaries\n- **Hooks** \u2014 Session
  lifecycle hooks that sync state between Nexus and agent sessions:\n  - `session-start.sh`
  \u2014 Initialize worktree metadata\n  - `session-end.sh` \u2014 Archive session
  state\n  - `session-sync.sh` \u2014 Periodic checkpoint\n  - Liveness probes for
  agent monitoring\n\n### Task Lifecycle\n\n```\nstart \u2192 implement \u2192 review
  \u2192 merge \u2192 done \u2192 finish\n```\n\n- `nexus start <id>` \u2014 Creates
  `nx-<id>` worktree from base branch\n- `nexus review <id> --verdict PASS` \u2014
  Authoritative merge gate\n- `nexus merge <id>` \u2014 Rebases and merges `--no-ff`\n-
  `nexus done <id>` \u2014 Marks task complete\n- `nexus finish <id>` \u2014 Removes
  worktree and deletes branch\n\n### Discoveries (Second Brain)\n\nDiscoveries are
  durable memory captures that may be global, project-linked, or task-linked. They're
  **not** executable work \u2014 they don't get branches, worktrees, or the full task
  lifecycle. When ready, they can be promoted into tasks.\n\n- `nexus discovery inbox`
  \u2014 Triage view for new/promotable/stale discoveries\n- `nexus discovery list`
  \u2014 Browse all discoveries\n- `nexus remember \"...\"` \u2014 Lightweight capture\n-
  `nexus discovery promote <id>` \u2014 Convert to executable task\n\n## Key Features\n\n-
  **Task tracking** \u2014 Projects, tasks, subtasks, tags, dependencies, comments\n-
  **Readiness tracking** \u2014 Explicit `is_ready` marker for backlog refinement\n-
  **First-class blocking** \u2014 `is_blocked` + `blocked_reason` with DB-enforced
  invariants\n- **Discoveries** \u2014 Lightweight memory that doesn't force work
  creation\n- **Typed memory links** \u2014 Graph-style relationships between discoveries,
  tasks, projects, and Copilot sessions\n- **Worktree management** \u2014 Automatic
  branch/worktree creation and cleanup\n- **Session persistence** \u2014 Agents can
  persist state to DB for cross-session continuity\n- **Archive + restore** \u2014
  Hygiene mechanism for discoveries (archived items stay durable but hidden from active
  views)\n- **Multi-timezone** \u2014 Daily notes default to `America/Chicago`, configurable
  via `NEXUS_TIMEZONE`\n\n## Scope\n\nNexus is scoped to **one machine** per deployment.
  No remote centralization planned. The client runs per-machine against a local Postgres
  instance.\n\nRationale: If you need cross-team collaboration and centralized tracking,
  existing solutions (GitHub Issues, Jira, Azure DevOps + MCP servers) already solve
  this well. Nexus focuses on the individual developer working with AI agents on a
  single workstation.\n\n## Future Wants\n\n- **Daemon agent** \u2014 Watch task tracker
  for new issues, spawn agent sessions in appropriate worktrees\n- **Daily reporting**
  \u2014 Ask an agent what all the other agents did today using Nexus as source of
  truth\n- **EOY goal tracking** \u2014 Agent summarization by Quarter or smart goal
  category\n- **EKS deployment** \u2014 Deploy API + Postgres to EKS to run more parallel
  agent stacks (work use case)\n- A canvas-style front-end that allows me to better
  visualize and plan out task-dependencies"
date: 2026-02-05
description: Nexus is a task tracker and second-brain for collaborating with AI agents
  on software development. It keeps project boards, task details, subtasks, daily
  notes,
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Nexus</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Nexus is a task tracker and second-brain
    for collaborating with AI agents on software development. It keeps project boards,
    task details, subtasks, daily notes,\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Nexus | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/nexus\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Nexus
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"Nexus is a task
    tracker and second-brain for collaborating with AI agents on software development.
    It keeps project boards, task details, subtasks, daily notes,\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/nexus</span>\n        </div>\n
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
    mb-4 post-title-large\">Nexus</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2026-02-05\">\n            February
    05, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/projects/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #projects\n
    \           </a>\n            <a href=\"https://pype.dev//tags/organization/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #organization\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>Nexus
    is a task tracker and second-brain for collaborating with AI agents on software
    development. It keeps project boards, task details, subtasks, daily notes, and
    Git worktree context together in one system.</p>\n<h2 id=\"why-nexus\">Why Nexus
    <a class=\"header-anchor\" href=\"#why-nexus\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I built Nexus because
    I work with AI agents across multiple parallel work streams and need a way to:</p>\n<ul>\n<li>Track
    what agents are working on and have them check-in regularly</li>\n<li>Capture
    lightweight memories without forcing everything to become executable work immediately</li>\n<li>Keep
    task-to-branch context when starting work</li>\n<li>Use daily notes inside the
    same system</li>\n</ul>\n<h2 id=\"architecture\">Architecture <a class=\"header-anchor\"
    href=\"#architecture\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>Human\n  |\n  +-- Agent Harness
    (GitHub Copilot CLI)\n  |     +-- Agents (orchestrator + specialists)\n  |     +--
    Platform hooks / commands\n  |\n  +-- nexus CLI (PEP 723 single-file script)\n
    \ |     |\n  |     +-- Nexus API (FastAPI, port 8090)\n  |           +-- Nexus
    DB (Postgres 16 + pgvector)\n  |\n  +-- Go TUI (primary interface)\n  +-- Git
    (worktrees, branches)\n</pre></div>\n\n</pre>\n\n<h2 id=\"components\">Components
    <a class=\"header-anchor\" href=\"#components\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<h3>Core Stack</h3>\n<ul>\n<li><strong>Nexus
    API</strong> \u2014 FastAPI REST backend. Projects, tasks, tags, dependencies,
    comments, and global discoveries. Tasks flow through <code>backlog</code> \u2192
    <code>wip</code> \u2192 <code>done</code> with first-class readiness (<code>is_ready</code>)
    and blocking (<code>is_blocked</code>) markers.</li>\n<li><strong>Nexus DB</strong>
    \u2014 Postgres 16 with pgvector for vector storage (future AI memory features).</li>\n<li><strong>nexus
    CLI</strong> \u2014 PEP 723 single-file Python script. All agent-to-Nexus communication
    goes through this. JSON output for agents, human-readable for humans.</li>\n<li><strong>Go
    TUI</strong> \u2014 Terminal UI, the primary interface for dayFalse-to-day task
    management.</li>\n</ul>\n<h3>Agent Integration</h3>\n<ul>\n<li><strong>Copilot
    CLI plugin</strong> (<code>copilot/</code>) \u2014 GitHub Copilot integration
    with custom skills:\n<ul>\n<li><code>nexus</code> \u2014 Core task and lifecycle
    commands</li>\n<li><code>nexus-specialist</code> \u2014 Task-specific expertise</li>\n<li><code>nexus-delegation</code>
    \u2014 Delegation patterns</li>\n<li><code>daily-summary</code> \u2014 Daily progress
    summaries</li>\n</ul>\n</li>\n<li><strong>Hooks</strong> \u2014 Session lifecycle
    hooks that sync state between Nexus and agent sessions:\n<ul>\n<li><code>session-start.sh</code>
    \u2014 Initialize worktree metadata</li>\n<li><code>session-end.sh</code> \u2014
    Archive session state</li>\n<li><code>session-sync.sh</code> \u2014 Periodic checkpoint</li>\n<li>Liveness
    probes for agent monitoring</li>\n</ul>\n</li>\n</ul>\n<h3>Task Lifecycle</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>start \u2192 implement \u2192
    review \u2192 merge \u2192 done \u2192 finish\n</pre></div>\n\n</pre>\n\n<ul>\n<li><code>nexus
    start &lt;id&gt;</code> \u2014 Creates <code>nx-&lt;id&gt;</code> worktree from
    base branch</li>\n<li><code>nexus review &lt;id&gt; --verdict PASS</code> \u2014
    Authoritative merge gate</li>\n<li><code>nexus merge &lt;id&gt;</code> \u2014
    Rebases and merges <code>--no-ff</code></li>\n<li><code>nexus done &lt;id&gt;</code>
    \u2014 Marks task complete</li>\n<li><code>nexus finish &lt;id&gt;</code> \u2014
    Removes worktree and deletes branch</li>\n</ul>\n<h3>Discoveries (Second Brain)</h3>\n<p>Discoveries
    are durable memory captures that may be global, project-linked, or task-linked.
    They're <strong>not</strong> executable work \u2014 they don't get branches, worktrees,
    or the full task lifecycle. When ready, they can be promoted into tasks.</p>\n<ul>\n<li><code>nexus
    discovery inbox</code> \u2014 Triage view for new/promotable/stale discoveries</li>\n<li><code>nexus
    discovery list</code> \u2014 Browse all discoveries</li>\n<li><code>nexus remember
    &quot;...&quot;</code> \u2014 Lightweight capture</li>\n<li><code>nexus discovery
    promote &lt;id&gt;</code> \u2014 Convert to executable task</li>\n</ul>\n<h2 id=\"key-features\">Key
    Features <a class=\"header-anchor\" href=\"#key-features\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>Task
    tracking</strong> \u2014 Projects, tasks, subtasks, tags, dependencies, comments</li>\n<li><strong>Readiness
    tracking</strong> \u2014 Explicit <code>is_ready</code> marker for backlog refinement</li>\n<li><strong>First-class
    blocking</strong> \u2014 <code>is_blocked</code> + <code>blocked_reason</code>
    with DB-enforced invariants</li>\n<li><strong>Discoveries</strong> \u2014 Lightweight
    memory that doesn't force work creation</li>\n<li><strong>Typed memory links</strong>
    \u2014 Graph-style relationships between discoveries, tasks, projects, and Copilot
    sessions</li>\n<li><strong>Worktree management</strong> \u2014 Automatic branch/worktree
    creation and cleanup</li>\n<li><strong>Session persistence</strong> \u2014 Agents
    can persist state to DB for cross-session continuity</li>\n<li><strong>Archive
    + restore</strong> \u2014 Hygiene mechanism for discoveries (archived items stay
    durable but hidden from active views)</li>\n<li><strong>Multi-timezone</strong>
    \u2014 Daily notes default to <code>America/Chicago</code>, configurable via <code>NEXUS_TIMEZONE</code></li>\n</ul>\n<h2
    id=\"scope\">Scope <a class=\"header-anchor\" href=\"#scope\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Nexus is scoped to <strong>one
    machine</strong> per deployment. No remote centralization planned. The client
    runs per-machine against a local Postgres instance.</p>\n<p>Rationale: If you
    need cross-team collaboration and centralized tracking, existing solutions (GitHub
    Issues, Jira, Azure DevOps + MCP servers) already solve this well. Nexus focuses
    on the individual developer working with AI agents on a single workstation.</p>\n<h2
    id=\"future-wants\">Future Wants <a class=\"header-anchor\" href=\"#future-wants\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>Daemon
    agent</strong> \u2014 Watch task tracker for new issues, spawn agent sessions
    in appropriate worktrees</li>\n<li><strong>Daily reporting</strong> \u2014 Ask
    an agent what all the other agents did today using Nexus as source of truth</li>\n<li><strong>EOY
    goal tracking</strong> \u2014 Agent summarization by Quarter or smart goal category</li>\n<li><strong>EKS
    deployment</strong> \u2014 Deploy API + Postgres to EKS to run more parallel agent
    stacks (work use case)</li>\n<li>A canvas-style front-end that allows me to better
    visualize and plan out task-dependencies</li>\n</ul>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Nexus</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Nexus is a task tracker and second-brain
    for collaborating with AI agents on software development. It keeps project boards,
    task details, subtasks, daily notes,\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Nexus | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/nexus\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Nexus
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"Nexus is a task
    tracker and second-brain for collaborating with AI agents on software development.
    It keeps project boards, task details, subtasks, daily notes,\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Nexus</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2026-02-05\">\n            February
    05, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/projects/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #projects\n
    \           </a>\n            <a href=\"https://pype.dev//tags/organization/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #organization\n            </a>\n    </div>\n</section></article>\n
    \    </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Nexus</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2026-02-05\">\n            February
    05, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/projects/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #projects\n
    \           </a>\n            <a href=\"https://pype.dev//tags/organization/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #organization\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>Nexus
    is a task tracker and second-brain for collaborating with AI agents on software
    development. It keeps project boards, task details, subtasks, daily notes, and
    Git worktree context together in one system.</p>\n<h2 id=\"why-nexus\">Why Nexus
    <a class=\"header-anchor\" href=\"#why-nexus\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I built Nexus because
    I work with AI agents across multiple parallel work streams and need a way to:</p>\n<ul>\n<li>Track
    what agents are working on and have them check-in regularly</li>\n<li>Capture
    lightweight memories without forcing everything to become executable work immediately</li>\n<li>Keep
    task-to-branch context when starting work</li>\n<li>Use daily notes inside the
    same system</li>\n</ul>\n<h2 id=\"architecture\">Architecture <a class=\"header-anchor\"
    href=\"#architecture\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>Human\n  |\n  +-- Agent Harness
    (GitHub Copilot CLI)\n  |     +-- Agents (orchestrator + specialists)\n  |     +--
    Platform hooks / commands\n  |\n  +-- nexus CLI (PEP 723 single-file script)\n
    \ |     |\n  |     +-- Nexus API (FastAPI, port 8090)\n  |           +-- Nexus
    DB (Postgres 16 + pgvector)\n  |\n  +-- Go TUI (primary interface)\n  +-- Git
    (worktrees, branches)\n</pre></div>\n\n</pre>\n\n<h2 id=\"components\">Components
    <a class=\"header-anchor\" href=\"#components\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<h3>Core Stack</h3>\n<ul>\n<li><strong>Nexus
    API</strong> \u2014 FastAPI REST backend. Projects, tasks, tags, dependencies,
    comments, and global discoveries. Tasks flow through <code>backlog</code> \u2192
    <code>wip</code> \u2192 <code>done</code> with first-class readiness (<code>is_ready</code>)
    and blocking (<code>is_blocked</code>) markers.</li>\n<li><strong>Nexus DB</strong>
    \u2014 Postgres 16 with pgvector for vector storage (future AI memory features).</li>\n<li><strong>nexus
    CLI</strong> \u2014 PEP 723 single-file Python script. All agent-to-Nexus communication
    goes through this. JSON output for agents, human-readable for humans.</li>\n<li><strong>Go
    TUI</strong> \u2014 Terminal UI, the primary interface for dayFalse-to-day task
    management.</li>\n</ul>\n<h3>Agent Integration</h3>\n<ul>\n<li><strong>Copilot
    CLI plugin</strong> (<code>copilot/</code>) \u2014 GitHub Copilot integration
    with custom skills:\n<ul>\n<li><code>nexus</code> \u2014 Core task and lifecycle
    commands</li>\n<li><code>nexus-specialist</code> \u2014 Task-specific expertise</li>\n<li><code>nexus-delegation</code>
    \u2014 Delegation patterns</li>\n<li><code>daily-summary</code> \u2014 Daily progress
    summaries</li>\n</ul>\n</li>\n<li><strong>Hooks</strong> \u2014 Session lifecycle
    hooks that sync state between Nexus and agent sessions:\n<ul>\n<li><code>session-start.sh</code>
    \u2014 Initialize worktree metadata</li>\n<li><code>session-end.sh</code> \u2014
    Archive session state</li>\n<li><code>session-sync.sh</code> \u2014 Periodic checkpoint</li>\n<li>Liveness
    probes for agent monitoring</li>\n</ul>\n</li>\n</ul>\n<h3>Task Lifecycle</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>start \u2192 implement \u2192
    review \u2192 merge \u2192 done \u2192 finish\n</pre></div>\n\n</pre>\n\n<ul>\n<li><code>nexus
    start &lt;id&gt;</code> \u2014 Creates <code>nx-&lt;id&gt;</code> worktree from
    base branch</li>\n<li><code>nexus review &lt;id&gt; --verdict PASS</code> \u2014
    Authoritative merge gate</li>\n<li><code>nexus merge &lt;id&gt;</code> \u2014
    Rebases and merges <code>--no-ff</code></li>\n<li><code>nexus done &lt;id&gt;</code>
    \u2014 Marks task complete</li>\n<li><code>nexus finish &lt;id&gt;</code> \u2014
    Removes worktree and deletes branch</li>\n</ul>\n<h3>Discoveries (Second Brain)</h3>\n<p>Discoveries
    are durable memory captures that may be global, project-linked, or task-linked.
    They're <strong>not</strong> executable work \u2014 they don't get branches, worktrees,
    or the full task lifecycle. When ready, they can be promoted into tasks.</p>\n<ul>\n<li><code>nexus
    discovery inbox</code> \u2014 Triage view for new/promotable/stale discoveries</li>\n<li><code>nexus
    discovery list</code> \u2014 Browse all discoveries</li>\n<li><code>nexus remember
    &quot;...&quot;</code> \u2014 Lightweight capture</li>\n<li><code>nexus discovery
    promote &lt;id&gt;</code> \u2014 Convert to executable task</li>\n</ul>\n<h2 id=\"key-features\">Key
    Features <a class=\"header-anchor\" href=\"#key-features\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>Task
    tracking</strong> \u2014 Projects, tasks, subtasks, tags, dependencies, comments</li>\n<li><strong>Readiness
    tracking</strong> \u2014 Explicit <code>is_ready</code> marker for backlog refinement</li>\n<li><strong>First-class
    blocking</strong> \u2014 <code>is_blocked</code> + <code>blocked_reason</code>
    with DB-enforced invariants</li>\n<li><strong>Discoveries</strong> \u2014 Lightweight
    memory that doesn't force work creation</li>\n<li><strong>Typed memory links</strong>
    \u2014 Graph-style relationships between discoveries, tasks, projects, and Copilot
    sessions</li>\n<li><strong>Worktree management</strong> \u2014 Automatic branch/worktree
    creation and cleanup</li>\n<li><strong>Session persistence</strong> \u2014 Agents
    can persist state to DB for cross-session continuity</li>\n<li><strong>Archive
    + restore</strong> \u2014 Hygiene mechanism for discoveries (archived items stay
    durable but hidden from active views)</li>\n<li><strong>Multi-timezone</strong>
    \u2014 Daily notes default to <code>America/Chicago</code>, configurable via <code>NEXUS_TIMEZONE</code></li>\n</ul>\n<h2
    id=\"scope\">Scope <a class=\"header-anchor\" href=\"#scope\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Nexus is scoped to <strong>one
    machine</strong> per deployment. No remote centralization planned. The client
    runs per-machine against a local Postgres instance.</p>\n<p>Rationale: If you
    need cross-team collaboration and centralized tracking, existing solutions (GitHub
    Issues, Jira, Azure DevOps + MCP servers) already solve this well. Nexus focuses
    on the individual developer working with AI agents on a single workstation.</p>\n<h2
    id=\"future-wants\">Future Wants <a class=\"header-anchor\" href=\"#future-wants\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>Daemon
    agent</strong> \u2014 Watch task tracker for new issues, spawn agent sessions
    in appropriate worktrees</li>\n<li><strong>Daily reporting</strong> \u2014 Ask
    an agent what all the other agents did today using Nexus as source of truth</li>\n<li><strong>EOY
    goal tracking</strong> \u2014 Agent summarization by Quarter or smart goal category</li>\n<li><strong>EKS
    deployment</strong> \u2014 Deploy API + Postgres to EKS to run more parallel agent
    stacks (work use case)</li>\n<li>A canvas-style front-end that allows me to better
    visualize and plan out task-dependencies</li>\n</ul>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Nexus</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Nexus is a task tracker and second-brain
    for collaborating with AI agents on software development. It keeps project boards,
    task details, subtasks, daily notes,\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Nexus | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/nexus\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"Nexus
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"Nexus is a task
    tracker and second-brain for collaborating with AI agents on software development.
    It keeps project boards, task details, subtasks, daily notes,\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/nexus</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>Nexus
    is a task tracker and second-brain for collaborating with AI agents on software
    development. It keeps project boards, task details, subtasks, daily notes, and
    Git worktree context together in one system.</p>\n<h2 id=\"why-nexus\">Why Nexus
    <a class=\"header-anchor\" href=\"#why-nexus\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I built Nexus because
    I work with AI agents across multiple parallel work streams and need a way to:</p>\n<ul>\n<li>Track
    what agents are working on and have them check-in regularly</li>\n<li>Capture
    lightweight memories without forcing everything to become executable work immediately</li>\n<li>Keep
    task-to-branch context when starting work</li>\n<li>Use daily notes inside the
    same system</li>\n</ul>\n<h2 id=\"architecture\">Architecture <a class=\"header-anchor\"
    href=\"#architecture\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>Human\n  |\n  +-- Agent Harness
    (GitHub Copilot CLI)\n  |     +-- Agents (orchestrator + specialists)\n  |     +--
    Platform hooks / commands\n  |\n  +-- nexus CLI (PEP 723 single-file script)\n
    \ |     |\n  |     +-- Nexus API (FastAPI, port 8090)\n  |           +-- Nexus
    DB (Postgres 16 + pgvector)\n  |\n  +-- Go TUI (primary interface)\n  +-- Git
    (worktrees, branches)\n</pre></div>\n\n</pre>\n\n<h2 id=\"components\">Components
    <a class=\"header-anchor\" href=\"#components\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<h3>Core Stack</h3>\n<ul>\n<li><strong>Nexus
    API</strong> \u2014 FastAPI REST backend. Projects, tasks, tags, dependencies,
    comments, and global discoveries. Tasks flow through <code>backlog</code> \u2192
    <code>wip</code> \u2192 <code>done</code> with first-class readiness (<code>is_ready</code>)
    and blocking (<code>is_blocked</code>) markers.</li>\n<li><strong>Nexus DB</strong>
    \u2014 Postgres 16 with pgvector for vector storage (future AI memory features).</li>\n<li><strong>nexus
    CLI</strong> \u2014 PEP 723 single-file Python script. All agent-to-Nexus communication
    goes through this. JSON output for agents, human-readable for humans.</li>\n<li><strong>Go
    TUI</strong> \u2014 Terminal UI, the primary interface for dayFalse-to-day task
    management.</li>\n</ul>\n<h3>Agent Integration</h3>\n<ul>\n<li><strong>Copilot
    CLI plugin</strong> (<code>copilot/</code>) \u2014 GitHub Copilot integration
    with custom skills:\n<ul>\n<li><code>nexus</code> \u2014 Core task and lifecycle
    commands</li>\n<li><code>nexus-specialist</code> \u2014 Task-specific expertise</li>\n<li><code>nexus-delegation</code>
    \u2014 Delegation patterns</li>\n<li><code>daily-summary</code> \u2014 Daily progress
    summaries</li>\n</ul>\n</li>\n<li><strong>Hooks</strong> \u2014 Session lifecycle
    hooks that sync state between Nexus and agent sessions:\n<ul>\n<li><code>session-start.sh</code>
    \u2014 Initialize worktree metadata</li>\n<li><code>session-end.sh</code> \u2014
    Archive session state</li>\n<li><code>session-sync.sh</code> \u2014 Periodic checkpoint</li>\n<li>Liveness
    probes for agent monitoring</li>\n</ul>\n</li>\n</ul>\n<h3>Task Lifecycle</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>start \u2192 implement \u2192
    review \u2192 merge \u2192 done \u2192 finish\n</pre></div>\n\n</pre>\n\n<ul>\n<li><code>nexus
    start &lt;id&gt;</code> \u2014 Creates <code>nx-&lt;id&gt;</code> worktree from
    base branch</li>\n<li><code>nexus review &lt;id&gt; --verdict PASS</code> \u2014
    Authoritative merge gate</li>\n<li><code>nexus merge &lt;id&gt;</code> \u2014
    Rebases and merges <code>--no-ff</code></li>\n<li><code>nexus done &lt;id&gt;</code>
    \u2014 Marks task complete</li>\n<li><code>nexus finish &lt;id&gt;</code> \u2014
    Removes worktree and deletes branch</li>\n</ul>\n<h3>Discoveries (Second Brain)</h3>\n<p>Discoveries
    are durable memory captures that may be global, project-linked, or task-linked.
    They're <strong>not</strong> executable work \u2014 they don't get branches, worktrees,
    or the full task lifecycle. When ready, they can be promoted into tasks.</p>\n<ul>\n<li><code>nexus
    discovery inbox</code> \u2014 Triage view for new/promotable/stale discoveries</li>\n<li><code>nexus
    discovery list</code> \u2014 Browse all discoveries</li>\n<li><code>nexus remember
    &quot;...&quot;</code> \u2014 Lightweight capture</li>\n<li><code>nexus discovery
    promote &lt;id&gt;</code> \u2014 Convert to executable task</li>\n</ul>\n<h2 id=\"key-features\">Key
    Features <a class=\"header-anchor\" href=\"#key-features\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>Task
    tracking</strong> \u2014 Projects, tasks, subtasks, tags, dependencies, comments</li>\n<li><strong>Readiness
    tracking</strong> \u2014 Explicit <code>is_ready</code> marker for backlog refinement</li>\n<li><strong>First-class
    blocking</strong> \u2014 <code>is_blocked</code> + <code>blocked_reason</code>
    with DB-enforced invariants</li>\n<li><strong>Discoveries</strong> \u2014 Lightweight
    memory that doesn't force work creation</li>\n<li><strong>Typed memory links</strong>
    \u2014 Graph-style relationships between discoveries, tasks, projects, and Copilot
    sessions</li>\n<li><strong>Worktree management</strong> \u2014 Automatic branch/worktree
    creation and cleanup</li>\n<li><strong>Session persistence</strong> \u2014 Agents
    can persist state to DB for cross-session continuity</li>\n<li><strong>Archive
    + restore</strong> \u2014 Hygiene mechanism for discoveries (archived items stay
    durable but hidden from active views)</li>\n<li><strong>Multi-timezone</strong>
    \u2014 Daily notes default to <code>America/Chicago</code>, configurable via <code>NEXUS_TIMEZONE</code></li>\n</ul>\n<h2
    id=\"scope\">Scope <a class=\"header-anchor\" href=\"#scope\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Nexus is scoped to <strong>one
    machine</strong> per deployment. No remote centralization planned. The client
    runs per-machine against a local Postgres instance.</p>\n<p>Rationale: If you
    need cross-team collaboration and centralized tracking, existing solutions (GitHub
    Issues, Jira, Azure DevOps + MCP servers) already solve this well. Nexus focuses
    on the individual developer working with AI agents on a single workstation.</p>\n<h2
    id=\"future-wants\">Future Wants <a class=\"header-anchor\" href=\"#future-wants\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>Daemon
    agent</strong> \u2014 Watch task tracker for new issues, spawn agent sessions
    in appropriate worktrees</li>\n<li><strong>Daily reporting</strong> \u2014 Ask
    an agent what all the other agents did today using Nexus as source of truth</li>\n<li><strong>EOY
    goal tracking</strong> \u2014 Agent summarization by Quarter or smart goal category</li>\n<li><strong>EKS
    deployment</strong> \u2014 Deploy API + Postgres to EKS to run more parallel agent
    stacks (work use case)</li>\n<li>A canvas-style front-end that allows me to better
    visualize and plan out task-dependencies</li>\n</ul>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2026-02-05 05:31:53\ntemplateKey: project\ntitle: Nexus\npublished:
    True\ntags:\n  - projects\n  - organization\n---\n\nNexus is a task tracker and
    second-brain for collaborating with AI agents on software development. It keeps
    project boards, task details, subtasks, daily notes, and Git worktree context
    together in one system.\n\n## Why Nexus\n\nI built Nexus because I work with AI
    agents across multiple parallel work streams and need a way to:\n\n- Track what
    agents are working on and have them check-in regularly\n- Capture lightweight
    memories without forcing everything to become executable work immediately\n- Keep
    task-to-branch context when starting work\n- Use daily notes inside the same system\n\n##
    Architecture\n\n```\nHuman\n  |\n  +-- Agent Harness (GitHub Copilot CLI)\n  |
    \    +-- Agents (orchestrator + specialists)\n  |     +-- Platform hooks / commands\n
    \ |\n  +-- nexus CLI (PEP 723 single-file script)\n  |     |\n  |     +-- Nexus
    API (FastAPI, port 8090)\n  |           +-- Nexus DB (Postgres 16 + pgvector)\n
    \ |\n  +-- Go TUI (primary interface)\n  +-- Git (worktrees, branches)\n```\n\n##
    Components\n\n### Core Stack\n\n- **Nexus API** \u2014 FastAPI REST backend. Projects,
    tasks, tags, dependencies, comments, and global discoveries. Tasks flow through
    `backlog` \u2192 `wip` \u2192 `done` with first-class readiness (`is_ready`) and
    blocking (`is_blocked`) markers.\n- **Nexus DB** \u2014 Postgres 16 with pgvector
    for vector storage (future AI memory features).\n- **nexus CLI** \u2014 PEP 723
    single-file Python script. All agent-to-Nexus communication goes through this.
    JSON output for agents, human-readable for humans.\n- **Go TUI** \u2014 Terminal
    UI, the primary interface for dayFalse-to-day task management.\n\n### Agent Integration\n\n-
    **Copilot CLI plugin** (`copilot/`) \u2014 GitHub Copilot integration with custom
    skills:\n  - `nexus` \u2014 Core task and lifecycle commands\n  - `nexus-specialist`
    \u2014 Task-specific expertise\n  - `nexus-delegation` \u2014 Delegation patterns\n
    \ - `daily-summary` \u2014 Daily progress summaries\n- **Hooks** \u2014 Session
    lifecycle hooks that sync state between Nexus and agent sessions:\n  - `session-start.sh`
    \u2014 Initialize worktree metadata\n  - `session-end.sh` \u2014 Archive session
    state\n  - `session-sync.sh` \u2014 Periodic checkpoint\n  - Liveness probes for
    agent monitoring\n\n### Task Lifecycle\n\n```\nstart \u2192 implement \u2192 review
    \u2192 merge \u2192 done \u2192 finish\n```\n\n- `nexus start <id>` \u2014 Creates
    `nx-<id>` worktree from base branch\n- `nexus review <id> --verdict PASS` \u2014
    Authoritative merge gate\n- `nexus merge <id>` \u2014 Rebases and merges `--no-ff`\n-
    `nexus done <id>` \u2014 Marks task complete\n- `nexus finish <id>` \u2014 Removes
    worktree and deletes branch\n\n### Discoveries (Second Brain)\n\nDiscoveries are
    durable memory captures that may be global, project-linked, or task-linked. They're
    **not** executable work \u2014 they don't get branches, worktrees, or the full
    task lifecycle. When ready, they can be promoted into tasks.\n\n- `nexus discovery
    inbox` \u2014 Triage view for new/promotable/stale discoveries\n- `nexus discovery
    list` \u2014 Browse all discoveries\n- `nexus remember \"...\"` \u2014 Lightweight
    capture\n- `nexus discovery promote <id>` \u2014 Convert to executable task\n\n##
    Key Features\n\n- **Task tracking** \u2014 Projects, tasks, subtasks, tags, dependencies,
    comments\n- **Readiness tracking** \u2014 Explicit `is_ready` marker for backlog
    refinement\n- **First-class blocking** \u2014 `is_blocked` + `blocked_reason`
    with DB-enforced invariants\n- **Discoveries** \u2014 Lightweight memory that
    doesn't force work creation\n- **Typed memory links** \u2014 Graph-style relationships
    between discoveries, tasks, projects, and Copilot sessions\n- **Worktree management**
    \u2014 Automatic branch/worktree creation and cleanup\n- **Session persistence**
    \u2014 Agents can persist state to DB for cross-session continuity\n- **Archive
    + restore** \u2014 Hygiene mechanism for discoveries (archived items stay durable
    but hidden from active views)\n- **Multi-timezone** \u2014 Daily notes default
    to `America/Chicago`, configurable via `NEXUS_TIMEZONE`\n\n## Scope\n\nNexus is
    scoped to **one machine** per deployment. No remote centralization planned. The
    client runs per-machine against a local Postgres instance.\n\nRationale: If you
    need cross-team collaboration and centralized tracking, existing solutions (GitHub
    Issues, Jira, Azure DevOps + MCP servers) already solve this well. Nexus focuses
    on the individual developer working with AI agents on a single workstation.\n\n##
    Future Wants\n\n- **Daemon agent** \u2014 Watch task tracker for new issues, spawn
    agent sessions in appropriate worktrees\n- **Daily reporting** \u2014 Ask an agent
    what all the other agents did today using Nexus as source of truth\n- **EOY goal
    tracking** \u2014 Agent summarization by Quarter or smart goal category\n- **EKS
    deployment** \u2014 Deploy API + Postgres to EKS to run more parallel agent stacks
    (work use case)\n- A canvas-style front-end that allows me to better visualize
    and plan out task-dependencies\n"
published: true
slug: nexus
title: Nexus


---

Nexus is a task tracker and second-brain for collaborating with AI agents on software development. It keeps project boards, task details, subtasks, daily notes, and Git worktree context together in one system.

## Why Nexus

I built Nexus because I work with AI agents across multiple parallel work streams and need a way to:

- Track what agents are working on and have them check-in regularly
- Capture lightweight memories without forcing everything to become executable work immediately
- Keep task-to-branch context when starting work
- Use daily notes inside the same system

## Architecture

```
Human
  |
  +-- Agent Harness (GitHub Copilot CLI)
  |     +-- Agents (orchestrator + specialists)
  |     +-- Platform hooks / commands
  |
  +-- nexus CLI (PEP 723 single-file script)
  |     |
  |     +-- Nexus API (FastAPI, port 8090)
  |           +-- Nexus DB (Postgres 16 + pgvector)
  |
  +-- Go TUI (primary interface)
  +-- Git (worktrees, branches)
```

## Components

### Core Stack

- **Nexus API** — FastAPI REST backend. Projects, tasks, tags, dependencies, comments, and global discoveries. Tasks flow through `backlog` → `wip` → `done` with first-class readiness (`is_ready`) and blocking (`is_blocked`) markers.
- **Nexus DB** — Postgres 16 with pgvector for vector storage (future AI memory features).
- **nexus CLI** — PEP 723 single-file Python script. All agent-to-Nexus communication goes through this. JSON output for agents, human-readable for humans.
- **Go TUI** — Terminal UI, the primary interface for dayFalse-to-day task management.

### Agent Integration

- **Copilot CLI plugin** (`copilot/`) — GitHub Copilot integration with custom skills:
  - `nexus` — Core task and lifecycle commands
  - `nexus-specialist` — Task-specific expertise
  - `nexus-delegation` — Delegation patterns
  - `daily-summary` — Daily progress summaries
- **Hooks** — Session lifecycle hooks that sync state between Nexus and agent sessions:
  - `session-start.sh` — Initialize worktree metadata
  - `session-end.sh` — Archive session state
  - `session-sync.sh` — Periodic checkpoint
  - Liveness probes for agent monitoring

### Task Lifecycle

```
start → implement → review → merge → done → finish
```

- `nexus start <id>` — Creates `nx-<id>` worktree from base branch
- `nexus review <id> --verdict PASS` — Authoritative merge gate
- `nexus merge <id>` — Rebases and merges `--no-ff`
- `nexus done <id>` — Marks task complete
- `nexus finish <id>` — Removes worktree and deletes branch

### Discoveries (Second Brain)

Discoveries are durable memory captures that may be global, project-linked, or task-linked. They're **not** executable work — they don't get branches, worktrees, or the full task lifecycle. When ready, they can be promoted into tasks.

- `nexus discovery inbox` — Triage view for new/promotable/stale discoveries
- `nexus discovery list` — Browse all discoveries
- `nexus remember "..."` — Lightweight capture
- `nexus discovery promote <id>` — Convert to executable task

## Key Features

- **Task tracking** — Projects, tasks, subtasks, tags, dependencies, comments
- **Readiness tracking** — Explicit `is_ready` marker for backlog refinement
- **First-class blocking** — `is_blocked` + `blocked_reason` with DB-enforced invariants
- **Discoveries** — Lightweight memory that doesn't force work creation
- **Typed memory links** — Graph-style relationships between discoveries, tasks, projects, and Copilot sessions
- **Worktree management** — Automatic branch/worktree creation and cleanup
- **Session persistence** — Agents can persist state to DB for cross-session continuity
- **Archive + restore** — Hygiene mechanism for discoveries (archived items stay durable but hidden from active views)
- **Multi-timezone** — Daily notes default to `America/Chicago`, configurable via `NEXUS_TIMEZONE`

## Scope

Nexus is scoped to **one machine** per deployment. No remote centralization planned. The client runs per-machine against a local Postgres instance.

Rationale: If you need cross-team collaboration and centralized tracking, existing solutions (GitHub Issues, Jira, Azure DevOps + MCP servers) already solve this well. Nexus focuses on the individual developer working with AI agents on a single workstation.

## Future Wants

- **Daemon agent** — Watch task tracker for new issues, spawn agent sessions in appropriate worktrees
- **Daily reporting** — Ask an agent what all the other agents did today using Nexus as source of truth
- **EOY goal tracking** — Agent summarization by Quarter or smart goal category
- **EKS deployment** — Deploy API + Postgres to EKS to run more parallel agent stacks (work use case)
- A canvas-style front-end that allows me to better visualize and plan out task-dependencies