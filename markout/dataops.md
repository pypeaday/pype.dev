---
content: "old: [[using-restic-to-backup-my-home-directory]]\n\nNOTE: zfs-ops is now
  in my forgejo instance. ghost, ghost-vault, and my desktop clone from forgejo\nNOTE:
  zfs-ops and homelab-mono/dataops are separate, they could be combined\n\n## Things
  to Backup\n\n- Desktop\n  - projects + workspaces\n    sans .venv and other stuff\n
  \ - home directory\n- Server\n  - zfs datasets in tank (nas, docker, etc.)\n\n##
  Aurora (Desktop) Disk Layout\n\n| Device               | Size   | Pool                                     |
  Datasets                            | Mounts                                  |
  Role                                |\n| -------------------- | ------ | ----------------------------------------
  | ----------------------------------- | ---------------------------------------
  | ----------------------------------- |\n| Samsung 970 EVO NVMe | 500 GB | \u2014
  \                                       | \u2014                                   |
  `/`, `/home`, `/boot`                   | Boot + OS                           |\n|
  Samsung 870 EVO SATA | 1 TB   | \u2014                                        |
  \u2014                                   | \u2014                                       |
  VMs / scratch / future              |\n| Crucial BX500 SATA   | 2 TB   | `docker-storage-zfs`
  \U0001F852 `orbit` (planned) | `volumes/`, `projects/`             | `/var/docker-storage-zfs`,
  `~/projects` | Primary \u2014 Docker volumes + projects |\n| Seagate IronWolf HDD
  | 4 TB   | `depot`                                  | `sanoid/`, `restic/`, `nvme-rsync/`
  | \u2014                                       | Backup target                       |\n\n##
  How\n\n- Desktop\n  - Will use 2TB disk, renaming docker-storage-zfs to orbin for
  kicks, I knew I'd regret naming it docker-storage-zfs anyways from [[desktop-crash-2026]]\n
  \ - `projects`\n    - zfs dataset mounted to ~/projects\n    - [ ] will need to
  ignore it in the $HOME backup solution\n  - `docker-volumes` will just be named
  `volumes`\n    - mounted to `/var/docker-storage-zfs/`, might change mountpoint,
  only relevant to my compose files\n  - `$HOME` directory is NOT zfs\n    - rsync
  to a zfs dataset on an external SSD, same one that projects is on but the difference
  is that projects is mounted from there and the home directory is just backed up
  to it.\n    - from there backup to NAS just like projects... so no matter what we'll
  go from the 2 or 4 TB disk in my desktop to ghost:/tank/... and then tank replicates
  to to the harbor zpool, and that's all local in my house across 2 machines (desktop
  and NAS, NAS has tank and harbor)\n  - Local backup to 4TB disk on device, pool
  will be `depot` and I can setup `depot` -> `tank` if I find it relevant...\n    -
  the redundancy to my NAS would give me only redundancy, maybe for off-site set something
  up from `depot` -> `ghost-vault:/tank`\n    - [ ] ?? $HOME\n    - [ ] ?? projects\n
  \   - [ ] ??docker volumes\n      - specific volumes maybe?\n- Server\n  - tank
  -> harbor is local redundancy\n  - sanoid sends configured zfs datasets from tank
  -> ghost-vault\n\n## TODOs\n\n- [x] rename `docker-storage-zfs` to `orbit`\n- [x]
  create `projects` zfs dataset in `orbit`\n- [ ] setup zfs dataset for home directory
  backup on `orbit`\n- [x] set mountpoint for projects\n- [x] set mountpoint for docker
  volumes dataset\n- [x] restart the ai stack containers after validating compose
  file volume path is correct\n  - the \".../volume/\" part will probably be wrong\n
  \ - just kept the mountpoint as /var/docker-storage-zfs/_for orbit/volumes/_\n-
  [ ] setup appropriate backup (rsync, restic, etc.) for home directory to `orbit`'s
  backup dataset\n- [ ] setup sanoid snapshot schedule in zfs-ops\n- [ ] setup syncoid
  script/systemd for `orbit` to `depot`\n- [ ] recover the rest of my projects from
  emergency or home-restore\n- [ ] remove orbit/emergency\n- [ ] remove orgit/home-restore\n-
  [ ] remove orbit/volumes/mcphub\n- [ ] remove orbit/volumes/tdarr maybe?"
date: 2026-05-07
description: 'old: [[using-restic-to-backup-my-home-directory]] NOTE: zfs-ops is now
  in my forgejo instance. ghost, ghost-vault, and my desktop clone from forgejo

  NOTE: zfs-o'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>DataOps</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"old: [[using-restic-to-backup-my-home-directory]]
    NOTE: zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop
    clone from forgejo\nNOTE: zfs-o\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"DataOps | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataops\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"DataOps
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"old: [[using-restic-to-backup-my-home-directory]]
    NOTE: zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop
    clone from forgejo\nNOTE: zfs-o\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/dataops</span>\n        </div>\n
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
    mb-4 post-title-large\">DataOps</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-07\">\n            May
    07, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/dataops/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #dataops\n
    \           </a>\n            <a href=\"https://pype.dev//tags/jira/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #jira\n
    \           </a>\n            <a href=\"https://pype.dev//tags/doing/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #doing\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>old: <a class=\"wikilink\" href=\"/using-restic-to-backup-my-home-directory\">using-restic-to-backup-my-home-directory</a></p>\n<p>NOTE:
    zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop clone
    from forgejo\nNOTE: zfs-ops and homelab-mono/dataops are separate, they could
    be combined</p>\n<h2 id=\"things-to-backup\">Things to Backup <a class=\"header-anchor\"
    href=\"#things-to-backup\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Desktop\n<ul>\n<li>projects
    + workspaces\nsans .venv and other stuff</li>\n<li>home directory</li>\n</ul>\n</li>\n<li>Server\n<ul>\n<li>zfs
    datasets in tank (nas, docker, etc.)</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"aurora-desktop-disk-layout\">Aurora
    (Desktop) Disk Layout <a class=\"header-anchor\" href=\"#aurora-desktop-disk-layout\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<table>\n<thead>\n<tr>\n<th>Device</th>\n<th>Size</th>\n<th>Pool</th>\n<th>Datasets</th>\n<th>Mounts</th>\n<th>Role</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Samsung
    970 EVO NVMe</td>\n<td>500 GB</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td><code>/</code>,
    <code>/home</code>, <code>/boot</code></td>\n<td>Boot + OS</td>\n</tr>\n<tr>\n<td>Samsung
    870 EVO SATA</td>\n<td>1 TB</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td>VMs
    / scratch / future</td>\n</tr>\n<tr>\n<td>Crucial BX500 SATA</td>\n<td>2 TB</td>\n<td><code>docker-storage-zfs</code>
    \U0001F852 <code>orbit</code> (planned)</td>\n<td><code>volumes/</code>, <code>projects/</code></td>\n<td><code>/var/docker-storage-zfs</code>,
    <code>~/projects</code></td>\n<td>Primary \u2014 Docker volumes + projects</td>\n</tr>\n<tr>\n<td>Seagate
    IronWolf HDD</td>\n<td>4 TB</td>\n<td><code>depot</code></td>\n<td><code>sanoid/</code>,
    <code>restic/</code>, <code>nvme-rsync/</code></td>\n<td>\u2014</td>\n<td>Backup
    target</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"how\">How <a class=\"header-anchor\"
    href=\"#how\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Desktop\n<ul>\n<li>Will
    use 2TB disk, renaming docker-storage-zfs to orbin for kicks, I knew I'd regret
    naming it docker-storage-zfs anyways from <a class=\"wikilink\" href=\"/desktop-crash-2026\">desktop-crash-2026</a></li>\n<li><code>projects</code>\n<ul>\n<li>zfs
    dataset mounted to ~/projects</li>\n<li>[ ] will need to ignore it in the $HOME
    backup solution</li>\n</ul>\n</li>\n<li><code>docker-volumes</code> will just
    be named <code>volumes</code>\n<ul>\n<li>mounted to <code>/var/docker-storage-zfs/</code>,
    might change mountpoint, only relevant to my compose files</li>\n</ul>\n</li>\n<li><code>$HOME</code>
    directory is NOT zfs\n<ul>\n<li>rsync to a zfs dataset on an external SSD, same
    one that projects is on but the difference is that projects is mounted from there
    and the home directory is just backed up to it.</li>\n<li>from there backup to
    NAS just like projects... so no matter what we'll go from the 2 or 4 TB disk in
    my desktop to ghost:/tank/... and then tank replicates to to the harbor zpool,
    and that's all local in my house across 2 machines (desktop and NAS, NAS has tank
    and harbor)</li>\n</ul>\n</li>\n<li>Local backup to 4TB disk on device, pool will
    be <code>depot</code> and I can setup <code>depot</code> -&gt; <code>tank</code>
    if I find it relevant...\n<ul>\n<li>the redundancy to my NAS would give me only
    redundancy, maybe for off-site set something up from <code>depot</code> -&gt;
    <code>ghost-vault:/tank</code></li>\n<li>[ ] ?? $HOME</li>\n<li>[ ] ?? projects</li>\n<li>[
    ] ??docker volumes\n<ul>\n<li>specific volumes maybe?</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>Server\n<ul>\n<li>tank
    -&gt; harbor is local redundancy</li>\n<li>sanoid sends configured zfs datasets
    from tank -&gt; ghost-vault</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"todos\">TODOs
    <a class=\"header-anchor\" href=\"#todos\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>[x] rename <code>docker-storage-zfs</code>
    to <code>orbit</code></li>\n<li>[x] create <code>projects</code> zfs dataset in
    <code>orbit</code></li>\n<li>[ ] setup zfs dataset for home directory backup on
    <code>orbit</code></li>\n<li>[x] set mountpoint for projects</li>\n<li>[x] set
    mountpoint for docker volumes dataset</li>\n<li>[x] restart the ai stack containers
    after validating compose file volume path is correct\n<ul>\n<li>the &quot;.../volume/&quot;
    part will probably be wrong</li>\n<li>just kept the mountpoint as /var/docker-storage-zfs/<em>for
    orbit/volumes/</em></li>\n</ul>\n</li>\n<li>[ ] setup appropriate backup (rsync,
    restic, etc.) for home directory to <code>orbit</code>'s backup dataset</li>\n<li>[
    ] setup sanoid snapshot schedule in zfs-ops</li>\n<li>[ ] setup syncoid script/systemd
    for <code>orbit</code> to <code>depot</code></li>\n<li>[ ] recover the rest of
    my projects from emergency or home-restore</li>\n<li>[ ] remove orbit/emergency</li>\n<li>[
    ] remove orgit/home-restore</li>\n<li>[ ] remove orbit/volumes/mcphub</li>\n<li>[
    ] remove orbit/volumes/tdarr maybe?</li>\n</ul>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>DataOps</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"old: [[using-restic-to-backup-my-home-directory]]
    NOTE: zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop
    clone from forgejo\nNOTE: zfs-o\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"DataOps | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataops\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"DataOps
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"old: [[using-restic-to-backup-my-home-directory]]
    NOTE: zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop
    clone from forgejo\nNOTE: zfs-o\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">DataOps</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-07\">\n            May
    07, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/dataops/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #dataops\n
    \           </a>\n            <a href=\"https://pype.dev//tags/jira/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #jira\n
    \           </a>\n            <a href=\"https://pype.dev//tags/doing/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #doing\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">DataOps</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-07\">\n            May
    07, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/dataops/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #dataops\n
    \           </a>\n            <a href=\"https://pype.dev//tags/jira/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #jira\n
    \           </a>\n            <a href=\"https://pype.dev//tags/doing/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #doing\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>old: <a class=\"wikilink\" href=\"/using-restic-to-backup-my-home-directory\">using-restic-to-backup-my-home-directory</a></p>\n<p>NOTE:
    zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop clone
    from forgejo\nNOTE: zfs-ops and homelab-mono/dataops are separate, they could
    be combined</p>\n<h2 id=\"things-to-backup\">Things to Backup <a class=\"header-anchor\"
    href=\"#things-to-backup\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Desktop\n<ul>\n<li>projects
    + workspaces\nsans .venv and other stuff</li>\n<li>home directory</li>\n</ul>\n</li>\n<li>Server\n<ul>\n<li>zfs
    datasets in tank (nas, docker, etc.)</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"aurora-desktop-disk-layout\">Aurora
    (Desktop) Disk Layout <a class=\"header-anchor\" href=\"#aurora-desktop-disk-layout\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<table>\n<thead>\n<tr>\n<th>Device</th>\n<th>Size</th>\n<th>Pool</th>\n<th>Datasets</th>\n<th>Mounts</th>\n<th>Role</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Samsung
    970 EVO NVMe</td>\n<td>500 GB</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td><code>/</code>,
    <code>/home</code>, <code>/boot</code></td>\n<td>Boot + OS</td>\n</tr>\n<tr>\n<td>Samsung
    870 EVO SATA</td>\n<td>1 TB</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td>VMs
    / scratch / future</td>\n</tr>\n<tr>\n<td>Crucial BX500 SATA</td>\n<td>2 TB</td>\n<td><code>docker-storage-zfs</code>
    \U0001F852 <code>orbit</code> (planned)</td>\n<td><code>volumes/</code>, <code>projects/</code></td>\n<td><code>/var/docker-storage-zfs</code>,
    <code>~/projects</code></td>\n<td>Primary \u2014 Docker volumes + projects</td>\n</tr>\n<tr>\n<td>Seagate
    IronWolf HDD</td>\n<td>4 TB</td>\n<td><code>depot</code></td>\n<td><code>sanoid/</code>,
    <code>restic/</code>, <code>nvme-rsync/</code></td>\n<td>\u2014</td>\n<td>Backup
    target</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"how\">How <a class=\"header-anchor\"
    href=\"#how\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Desktop\n<ul>\n<li>Will
    use 2TB disk, renaming docker-storage-zfs to orbin for kicks, I knew I'd regret
    naming it docker-storage-zfs anyways from <a class=\"wikilink\" href=\"/desktop-crash-2026\">desktop-crash-2026</a></li>\n<li><code>projects</code>\n<ul>\n<li>zfs
    dataset mounted to ~/projects</li>\n<li>[ ] will need to ignore it in the $HOME
    backup solution</li>\n</ul>\n</li>\n<li><code>docker-volumes</code> will just
    be named <code>volumes</code>\n<ul>\n<li>mounted to <code>/var/docker-storage-zfs/</code>,
    might change mountpoint, only relevant to my compose files</li>\n</ul>\n</li>\n<li><code>$HOME</code>
    directory is NOT zfs\n<ul>\n<li>rsync to a zfs dataset on an external SSD, same
    one that projects is on but the difference is that projects is mounted from there
    and the home directory is just backed up to it.</li>\n<li>from there backup to
    NAS just like projects... so no matter what we'll go from the 2 or 4 TB disk in
    my desktop to ghost:/tank/... and then tank replicates to to the harbor zpool,
    and that's all local in my house across 2 machines (desktop and NAS, NAS has tank
    and harbor)</li>\n</ul>\n</li>\n<li>Local backup to 4TB disk on device, pool will
    be <code>depot</code> and I can setup <code>depot</code> -&gt; <code>tank</code>
    if I find it relevant...\n<ul>\n<li>the redundancy to my NAS would give me only
    redundancy, maybe for off-site set something up from <code>depot</code> -&gt;
    <code>ghost-vault:/tank</code></li>\n<li>[ ] ?? $HOME</li>\n<li>[ ] ?? projects</li>\n<li>[
    ] ??docker volumes\n<ul>\n<li>specific volumes maybe?</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>Server\n<ul>\n<li>tank
    -&gt; harbor is local redundancy</li>\n<li>sanoid sends configured zfs datasets
    from tank -&gt; ghost-vault</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"todos\">TODOs
    <a class=\"header-anchor\" href=\"#todos\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>[x] rename <code>docker-storage-zfs</code>
    to <code>orbit</code></li>\n<li>[x] create <code>projects</code> zfs dataset in
    <code>orbit</code></li>\n<li>[ ] setup zfs dataset for home directory backup on
    <code>orbit</code></li>\n<li>[x] set mountpoint for projects</li>\n<li>[x] set
    mountpoint for docker volumes dataset</li>\n<li>[x] restart the ai stack containers
    after validating compose file volume path is correct\n<ul>\n<li>the &quot;.../volume/&quot;
    part will probably be wrong</li>\n<li>just kept the mountpoint as /var/docker-storage-zfs/<em>for
    orbit/volumes/</em></li>\n</ul>\n</li>\n<li>[ ] setup appropriate backup (rsync,
    restic, etc.) for home directory to <code>orbit</code>'s backup dataset</li>\n<li>[
    ] setup sanoid snapshot schedule in zfs-ops</li>\n<li>[ ] setup syncoid script/systemd
    for <code>orbit</code> to <code>depot</code></li>\n<li>[ ] recover the rest of
    my projects from emergency or home-restore</li>\n<li>[ ] remove orbit/emergency</li>\n<li>[
    ] remove orgit/home-restore</li>\n<li>[ ] remove orbit/volumes/mcphub</li>\n<li>[
    ] remove orbit/volumes/tdarr maybe?</li>\n</ul>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>DataOps</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"old: [[using-restic-to-backup-my-home-directory]]
    NOTE: zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop
    clone from forgejo\nNOTE: zfs-o\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"DataOps | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/dataops\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"DataOps
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"old: [[using-restic-to-backup-my-home-directory]]
    NOTE: zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop
    clone from forgejo\nNOTE: zfs-o\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/dataops</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>old:
    <a class=\"wikilink\" href=\"/using-restic-to-backup-my-home-directory\">using-restic-to-backup-my-home-directory</a></p>\n<p>NOTE:
    zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop clone
    from forgejo\nNOTE: zfs-ops and homelab-mono/dataops are separate, they could
    be combined</p>\n<h2 id=\"things-to-backup\">Things to Backup <a class=\"header-anchor\"
    href=\"#things-to-backup\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Desktop\n<ul>\n<li>projects
    + workspaces\nsans .venv and other stuff</li>\n<li>home directory</li>\n</ul>\n</li>\n<li>Server\n<ul>\n<li>zfs
    datasets in tank (nas, docker, etc.)</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"aurora-desktop-disk-layout\">Aurora
    (Desktop) Disk Layout <a class=\"header-anchor\" href=\"#aurora-desktop-disk-layout\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<table>\n<thead>\n<tr>\n<th>Device</th>\n<th>Size</th>\n<th>Pool</th>\n<th>Datasets</th>\n<th>Mounts</th>\n<th>Role</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Samsung
    970 EVO NVMe</td>\n<td>500 GB</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td><code>/</code>,
    <code>/home</code>, <code>/boot</code></td>\n<td>Boot + OS</td>\n</tr>\n<tr>\n<td>Samsung
    870 EVO SATA</td>\n<td>1 TB</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td>\u2014</td>\n<td>VMs
    / scratch / future</td>\n</tr>\n<tr>\n<td>Crucial BX500 SATA</td>\n<td>2 TB</td>\n<td><code>docker-storage-zfs</code>
    \U0001F852 <code>orbit</code> (planned)</td>\n<td><code>volumes/</code>, <code>projects/</code></td>\n<td><code>/var/docker-storage-zfs</code>,
    <code>~/projects</code></td>\n<td>Primary \u2014 Docker volumes + projects</td>\n</tr>\n<tr>\n<td>Seagate
    IronWolf HDD</td>\n<td>4 TB</td>\n<td><code>depot</code></td>\n<td><code>sanoid/</code>,
    <code>restic/</code>, <code>nvme-rsync/</code></td>\n<td>\u2014</td>\n<td>Backup
    target</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"how\">How <a class=\"header-anchor\"
    href=\"#how\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Desktop\n<ul>\n<li>Will
    use 2TB disk, renaming docker-storage-zfs to orbin for kicks, I knew I'd regret
    naming it docker-storage-zfs anyways from <a class=\"wikilink\" href=\"/desktop-crash-2026\">desktop-crash-2026</a></li>\n<li><code>projects</code>\n<ul>\n<li>zfs
    dataset mounted to ~/projects</li>\n<li>[ ] will need to ignore it in the $HOME
    backup solution</li>\n</ul>\n</li>\n<li><code>docker-volumes</code> will just
    be named <code>volumes</code>\n<ul>\n<li>mounted to <code>/var/docker-storage-zfs/</code>,
    might change mountpoint, only relevant to my compose files</li>\n</ul>\n</li>\n<li><code>$HOME</code>
    directory is NOT zfs\n<ul>\n<li>rsync to a zfs dataset on an external SSD, same
    one that projects is on but the difference is that projects is mounted from there
    and the home directory is just backed up to it.</li>\n<li>from there backup to
    NAS just like projects... so no matter what we'll go from the 2 or 4 TB disk in
    my desktop to ghost:/tank/... and then tank replicates to to the harbor zpool,
    and that's all local in my house across 2 machines (desktop and NAS, NAS has tank
    and harbor)</li>\n</ul>\n</li>\n<li>Local backup to 4TB disk on device, pool will
    be <code>depot</code> and I can setup <code>depot</code> -&gt; <code>tank</code>
    if I find it relevant...\n<ul>\n<li>the redundancy to my NAS would give me only
    redundancy, maybe for off-site set something up from <code>depot</code> -&gt;
    <code>ghost-vault:/tank</code></li>\n<li>[ ] ?? $HOME</li>\n<li>[ ] ?? projects</li>\n<li>[
    ] ??docker volumes\n<ul>\n<li>specific volumes maybe?</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>Server\n<ul>\n<li>tank
    -&gt; harbor is local redundancy</li>\n<li>sanoid sends configured zfs datasets
    from tank -&gt; ghost-vault</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"todos\">TODOs
    <a class=\"header-anchor\" href=\"#todos\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>[x] rename <code>docker-storage-zfs</code>
    to <code>orbit</code></li>\n<li>[x] create <code>projects</code> zfs dataset in
    <code>orbit</code></li>\n<li>[ ] setup zfs dataset for home directory backup on
    <code>orbit</code></li>\n<li>[x] set mountpoint for projects</li>\n<li>[x] set
    mountpoint for docker volumes dataset</li>\n<li>[x] restart the ai stack containers
    after validating compose file volume path is correct\n<ul>\n<li>the &quot;.../volume/&quot;
    part will probably be wrong</li>\n<li>just kept the mountpoint as /var/docker-storage-zfs/<em>for
    orbit/volumes/</em></li>\n</ul>\n</li>\n<li>[ ] setup appropriate backup (rsync,
    restic, etc.) for home directory to <code>orbit</code>'s backup dataset</li>\n<li>[
    ] setup sanoid snapshot schedule in zfs-ops</li>\n<li>[ ] setup syncoid script/systemd
    for <code>orbit</code> to <code>depot</code></li>\n<li>[ ] recover the rest of
    my projects from emergency or home-restore</li>\n<li>[ ] remove orbit/emergency</li>\n<li>[
    ] remove orgit/home-restore</li>\n<li>[ ] remove orbit/volumes/mcphub</li>\n<li>[
    ] remove orbit/volumes/tdarr maybe?</li>\n</ul>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2026-05-07 06:33:03\ntemplateKey: jira\ntitle: DataOps\npublished:
    False\ntags:\n  - dataops\n  - jira\n  - doing\n---\n\nold: [[using-restic-to-backup-my-home-directory]]\n\nNOTE:
    zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop clone
    from forgejo\nNOTE: zfs-ops and homelab-mono/dataops are separate, they could
    be combined\n\n## Things to Backup\n\n- Desktop\n  - projects + workspaces\n    sans
    .venv and other stuff\n  - home directory\n- Server\n  - zfs datasets in tank
    (nas, docker, etc.)\n\n## Aurora (Desktop) Disk Layout\n\n| Device               |
    Size   | Pool                                     | Datasets                            |
    Mounts                                  | Role                                |\n|
    -------------------- | ------ | ---------------------------------------- | -----------------------------------
    | --------------------------------------- | -----------------------------------
    |\n| Samsung 970 EVO NVMe | 500 GB | \u2014                                        |
    \u2014                                   | `/`, `/home`, `/boot`                   |
    Boot + OS                           |\n| Samsung 870 EVO SATA | 1 TB   | \u2014
    \                                       | \u2014                                   |
    \u2014                                       | VMs / scratch / future              |\n|
    Crucial BX500 SATA   | 2 TB   | `docker-storage-zfs` \U0001F852 `orbit` (planned)
    | `volumes/`, `projects/`             | `/var/docker-storage-zfs`, `~/projects`
    | Primary \u2014 Docker volumes + projects |\n| Seagate IronWolf HDD | 4 TB   |
    `depot`                                  | `sanoid/`, `restic/`, `nvme-rsync/`
    | \u2014                                       | Backup target                       |\n\n##
    How\n\n- Desktop\n  - Will use 2TB disk, renaming docker-storage-zfs to orbin
    for kicks, I knew I'd regret naming it docker-storage-zfs anyways from [[desktop-crash-2026]]\n
    \ - `projects`\n    - zfs dataset mounted to ~/projects\n    - [ ] will need to
    ignore it in the $HOME backup solution\n  - `docker-volumes` will just be named
    `volumes`\n    - mounted to `/var/docker-storage-zfs/`, might change mountpoint,
    only relevant to my compose files\n  - `$HOME` directory is NOT zfs\n    - rsync
    to a zfs dataset on an external SSD, same one that projects is on but the difference
    is that projects is mounted from there and the home directory is just backed up
    to it.\n    - from there backup to NAS just like projects... so no matter what
    we'll go from the 2 or 4 TB disk in my desktop to ghost:/tank/... and then tank
    replicates to to the harbor zpool, and that's all local in my house across 2 machines
    (desktop and NAS, NAS has tank and harbor)\n  - Local backup to 4TB disk on device,
    pool will be `depot` and I can setup `depot` -> `tank` if I find it relevant...\n
    \   - the redundancy to my NAS would give me only redundancy, maybe for off-site
    set something up from `depot` -> `ghost-vault:/tank`\n    - [ ] ?? $HOME\n    -
    [ ] ?? projects\n    - [ ] ??docker volumes\n      - specific volumes maybe?\n-
    Server\n  - tank -> harbor is local redundancy\n  - sanoid sends configured zfs
    datasets from tank -> ghost-vault\n\n## TODOs\n\n- [x] rename `docker-storage-zfs`
    to `orbit`\n- [x] create `projects` zfs dataset in `orbit`\n- [ ] setup zfs dataset
    for home directory backup on `orbit`\n- [x] set mountpoint for projects\n- [x]
    set mountpoint for docker volumes dataset\n- [x] restart the ai stack containers
    after validating compose file volume path is correct\n  - the \".../volume/\"
    part will probably be wrong\n  - just kept the mountpoint as /var/docker-storage-zfs/_for
    orbit/volumes/_\n- [ ] setup appropriate backup (rsync, restic, etc.) for home
    directory to `orbit`'s backup dataset\n- [ ] setup sanoid snapshot schedule in
    zfs-ops\n- [ ] setup syncoid script/systemd for `orbit` to `depot`\n- [ ] recover
    the rest of my projects from emergency or home-restore\n- [ ] remove orbit/emergency\n-
    [ ] remove orgit/home-restore\n- [ ] remove orbit/volumes/mcphub\n- [ ] remove
    orbit/volumes/tdarr maybe?\n"
published: false
slug: dataops
title: DataOps


---

old: [[using-restic-to-backup-my-home-directory]]

NOTE: zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop clone from forgejo
NOTE: zfs-ops and homelab-mono/dataops are separate, they could be combined

## Things to Backup

- Desktop
  - projects + workspaces
    sans .venv and other stuff
  - home directory
- Server
  - zfs datasets in tank (nas, docker, etc.)

## Aurora (Desktop) Disk Layout

| Device               | Size   | Pool                                     | Datasets                            | Mounts                                  | Role                                |
| -------------------- | ------ | ---------------------------------------- | ----------------------------------- | --------------------------------------- | ----------------------------------- |
| Samsung 970 EVO NVMe | 500 GB | —                                        | —                                   | `/`, `/home`, `/boot`                   | Boot + OS                           |
| Samsung 870 EVO SATA | 1 TB   | —                                        | —                                   | —                                       | VMs / scratch / future              |
| Crucial BX500 SATA   | 2 TB   | `docker-storage-zfs` 🡒 `orbit` (planned) | `volumes/`, `projects/`             | `/var/docker-storage-zfs`, `~/projects` | Primary — Docker volumes + projects |
| Seagate IronWolf HDD | 4 TB   | `depot`                                  | `sanoid/`, `restic/`, `nvme-rsync/` | —                                       | Backup target                       |

## How

- Desktop
  - Will use 2TB disk, renaming docker-storage-zfs to orbin for kicks, I knew I'd regret naming it docker-storage-zfs anyways from [[desktop-crash-2026]]
  - `projects`
    - zfs dataset mounted to ~/projects
    - [ ] will need to ignore it in the $HOME backup solution
  - `docker-volumes` will just be named `volumes`
    - mounted to `/var/docker-storage-zfs/`, might change mountpoint, only relevant to my compose files
  - `$HOME` directory is NOT zfs
    - rsync to a zfs dataset on an external SSD, same one that projects is on but the difference is that projects is mounted from there and the home directory is just backed up to it.
    - from there backup to NAS just like projects... so no matter what we'll go from the 2 or 4 TB disk in my desktop to ghost:/tank/... and then tank replicates to to the harbor zpool, and that's all local in my house across 2 machines (desktop and NAS, NAS has tank and harbor)
  - Local backup to 4TB disk on device, pool will be `depot` and I can setup `depot` -> `tank` if I find it relevant...
    - the redundancy to my NAS would give me only redundancy, maybe for off-site set something up from `depot` -> `ghost-vault:/tank`
    - [ ] ?? $HOME
    - [ ] ?? projects
    - [ ] ??docker volumes
      - specific volumes maybe?
- Server
  - tank -> harbor is local redundancy
  - sanoid sends configured zfs datasets from tank -> ghost-vault

## TODOs

- [x] rename `docker-storage-zfs` to `orbit`
- [x] create `projects` zfs dataset in `orbit`
- [ ] setup zfs dataset for home directory backup on `orbit`
- [x] set mountpoint for projects
- [x] set mountpoint for docker volumes dataset
- [x] restart the ai stack containers after validating compose file volume path is correct
  - the ".../volume/" part will probably be wrong
  - just kept the mountpoint as /var/docker-storage-zfs/_for orbit/volumes/_
- [ ] setup appropriate backup (rsync, restic, etc.) for home directory to `orbit`'s backup dataset
- [ ] setup sanoid snapshot schedule in zfs-ops
- [ ] setup syncoid script/systemd for `orbit` to `depot`
- [ ] recover the rest of my projects from emergency or home-restore
- [ ] remove orbit/emergency
- [ ] remove orgit/home-restore
- [ ] remove orbit/volumes/mcphub
- [ ] remove orbit/volumes/tdarr maybe?