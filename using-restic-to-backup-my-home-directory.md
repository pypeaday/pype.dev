---
content: "# Intro\n\nI need to backup my personal $HOME to my NAS cause there's a
  lot in there, and\nmostly my git projects with .env files all over. Plus some docker
  data\n\n## Why Not ZFS?\n\nGREAT QUESTION! It's because I struggled getting all
  the syncoid/sanoid\nrequirements installed on my Aurora OS.... I like the immutable
  desktop trend,\nbut I don't understand rpm-ostree enough to properly get all the
  lower level\nkernel stuff setup in a way I trust. So because I don't have ZFS at
  $HOME\nwhat's a boy to do?\n\n`rsync` would probably work fine especially if I [[rsync-like-a-pro]]
  but I figured I could cobble together some other tech and broaden my horizons...\n\n##
  Enter restic\n\nApparently [restic](https://restic.net/) has been around for a while,
  and you can run it in a container... awesome that's all I needed to hear...\n\n##
  How?\n\nI'll use a docker compose stack for this... typically I think running `restic`\nright
  on the host is the way to go, but on my desktop I float between my host\nand distroboxes
  and to keep things as simple as possible, even though less\nefficient, I want to
  manage everything through containers as my homelab gets\nbuilt out and eventually
  I'll have a more full-featured ecosystem.\n\n## The Value\n\nYou can find code below
  and an example repo that more or less is what I use for my desktop backup but that's
  primarily what I was after.... backing up the data on my desktop to my NAS in a
  way that:\n\n1. I wouldn't have to \"remember\" how I was doing it\n\n- I accomplish
  this by having good git repo organization and README files that explain my own usage
  patterns\n\n2. Tracked snapshots\n\n- I need some kind of snapshotting - `zfs` has
  spoiled me, and turns out `restic` has some amount of support for it\n\n3. Running
  in docker would be ideal for now so that I don't need to worry about installing
  specific binaries across machine while I build out my patterns\n\nWith this setup
  I get to backup my $HOME to my NAS which contains 1. docker\nvolume info for all
  the AI workloads I run on my desktop and 2. all my\nsensitive info in my git repos
  is at least backed up in a way that I can\nrecover `.env` files with relative ease...\n\n#
  Code\n\nCheck out the [Example GH\nRepo](https://github.com/pypeaday/docker-compose-restic)
  but I'll drop key file\ncontents here for a quick read if you're interested in some
  of the setup... but\nthe blog post mostly ends here\n\n## The Files\n\nWe have a
  `docker-compose.yml` of course\n\n```yaml\nservices:\n  backup:\n    image: restic/restic:latest\n
  \   network_mode: host\n    container_name: restic_backup\n    hostname: restic-backup-runner\n
  \   env_file:\n      - .env\n    environment:\n      # The location of the backup
  repository inside the container\n      - RESTIC_REPOSITORY=/target\n      # The
  location of the password file inside the container\n      - RESTIC_PASSWORD_FILE=/password\n
  \   volumes:\n      # --- Source and Config Mounts ---\n      - \"${BACKUP_SOURCE}:/source:ro\"\n
  \     - \"${RESTIC_PASSWORD_FILE}:/password:ro\"\n      - \"./backup-and-prune.sh:/usr/local/bin/backup-and-prune:ro\"\n\n
  \     # --- Persistent Data Mounts ---\n      - \"./.ssh:/root/.ssh:rw\"\n      -
  \"./.cache:/root/.cache:rw\"\n\n    # Set the default entrypoint to our new script.
  This will be executed when\n    # the container starts, unless overridden.\n    entrypoint:
  [\"/usr/local/bin/backup-and-prune\"]\n```\n\nYour `.env` file will need to look
  like this\n\n```bash\n``# HOST related variables\n# The source directory to back
  up (absolute path)\nBACKUP_SOURCE=/home/nic\n\n# --- Restic Configuration ---\n#
  The file containing the restic repository password (absolute path on host)\nHOST_RESTIC_PASSWORD_FILE=/home/nic/projects/personal/homelab-mono/dataops/docker/.restic-password\n#
  The SSH private key to use for connecting to the NAS (absolute path on host)\n#
  It's recommended to use a dedicated key for this purpose.\nSSH_PRIVATE_KEY_FILE=/home/nic/.skm/ghost/id_rsa\n\n#
  Container Env Vars\n# the container makes the sftp connection using my credentials,
  but nonetheless the container needs them, so this isn't envrc stuff\n\n# --- SFTP/SSH
  Connection Details for the NAS ---\nSFTP_USER=nic\nSFTP_HOST=ghost\n# The path on
  the NAS where the restic repository will be stored\nSFTP_PATH=/tank/encrypted/nas/nic-home/\n\n#
  --- Restic Configuration ---\n\nRESTIC_REPOSITORY=/target\nRESTIC_PASSWORD_FILE=/password\n```\n\nAnd
  then the backup script that the container will execute is something like this:\n\n```bash\n\n#!/bin/sh\nset
  -e # Exit immediately if a command exits with a non-zero status.\n\n# Construct
  the repository path from environment variables passed by docker-compose\nREPO=\"sftp:${SFTP_USER}@${SFTP_HOST}:${SFTP_PATH}\"\n\n#
  1. Run the backup\n# -----------------\necho \"--- Starting backup for ${BACKUP_SOURCE}
  ---\"\nrestic backup /source --verbose -r \"${REPO}\"\necho \"--- Backup complete
  ---\"\n\n# 2. Clean up old snapshots according to the policy\n# --------------------------------------------------\necho
  \"--- Pruning old snapshots ---\n(Policy: keep last 7 daily, 4 weekly, 6 monthly)\"\nrestic
  forget \\\n    --prune \\\n    --keep-daily 7 \\\n    --keep-weekly 4 \\\n    --keep-monthly
  6 \\\n    -r \"${REPO}\"\n\necho \"--- Backup and prune process finished successfully
  ---\"\n```\n\n## Systemd\n\nFinally there's a systemd unit and timer file in there
  so you can setup a systemd service for the backup\n\n### service\n\n```bash\n\n[Unit]\nDescription=Run
  Restic backup to NAS using Docker Compose\n# We are running this as a user service,
  so we assume that the system-level\n# docker.service is already running.\nAfter=network-online.target\n\n[Service]\nType=oneshot\n#
  Set the working directory to where your docker-compose.yml and .env file are located\nWorkingDirectory=/home/user/nas-backup/docker\n\n#
  The command to execute. We use the full path to docker-compose for reliability.\n#
  You may need to adjust this path if 'docker compose' is installed elsewhere.\nExecStart=/usr/bin/docker
  compose run --rm backup\n\n[Install]\nWantedBy=default.target\n```\n\n### timer\n\n```bash\n\n[Unit]\nDescription=Run
  Restic backup job daily\n\n[Timer]\n# Run daily at 2:00 AM\nOnCalendar=daily\n#
  Or uncomment for a specific time:\n# OnCalendar=*-*-* 02:00:00\n\n# Run the backup
  immediately if the last scheduled run was missed (e.g., if the computer was off)\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n```"
date: 2025-07-16
description: 'Intro I need to backup my personal $HOME to my NAS cause there&#x27;s
  a lot in there, and

  mostly my git projects with .env files all over. Plus some docker data'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Using restic to
    backup my home directory</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Intro I need to backup my personal $HOME to my NAS cause there&#x27;s
    a lot in there, and\nmostly my git projects with .env files all over. Plus some
    docker data\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
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
    \   }\n</style>\n\n<div class=\"cover-floating-container\">\n    <div class=\"boundary-break-container\">\n
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250716145216_a3234af9.png\"
    \n            alt=\"Using restic to backup my home directory cover image\" \n
    \           class=\"boundary-break-image\"\n        >\n    </div>\n</div>\n\n<article
    class='w-full pattern-card glow-card p-4 md:p-6 post-container'>\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Using
    restic to backup my home directory</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-16\">\n            July
    16, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>    <section class=\"article-content prose
    dark:prose-invert lg:prose-xl mx-auto mt-8\">\n        <h1 id=\"intro\">Intro
    <a class=\"header-anchor\" href=\"#intro\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I need to backup my
    personal $HOME to my NAS cause there's a lot in there, and\nmostly my git projects
    with .env files all over. Plus some docker data</p>\n<h2 id=\"why-not-zfs\">Why
    Not ZFS? <a class=\"header-anchor\" href=\"#why-not-zfs\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>GREAT QUESTION! It's
    because I struggled getting all the syncoid/sanoid\nrequirements installed on
    my Aurora OS.... I like the immutable desktop trend,\nbut I don't understand rpm-ostree
    enough to properly get all the lower level\nkernel stuff setup in a way I trust.
    So because I don't have ZFS at $HOME\nwhat's a boy to do?</p>\n<p><code>rsync</code>
    would probably work fine especially if I <a class=\"wikilink\" href=\"/rsync-like-a-pro\">rsync-like-a-pro</a>
    but I figured I could cobble together some other tech and broaden my horizons...</p>\n<h2
    id=\"enter-restic\">Enter restic <a class=\"header-anchor\" href=\"#enter-restic\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Apparently <a href=\"https://restic.net/\">restic</a>
    has been around for a while, and you can run it in a container... awesome that's
    all I needed to hear...</p>\n<h2 id=\"how\">How? <a class=\"header-anchor\" href=\"#how\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'll use a docker compose
    stack for this... typically I think running <code>restic</code>\nright on the
    host is the way to go, but on my desktop I float between my host\nand distroboxes
    and to keep things as simple as possible, even though less\nefficient, I want
    to manage everything through containers as my homelab gets\nbuilt out and eventually
    I'll have a more full-featured ecosystem.</p>\n<h2 id=\"the-value\">The Value
    <a class=\"header-anchor\" href=\"#the-value\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>You can find code below
    and an example repo that more or less is what I use for my desktop backup but
    that's primarily what I was after.... backing up the data on my desktop to my
    NAS in a way that:</p>\n<ol>\n<li>I wouldn't have to &quot;remember&quot; how
    I was doing it</li>\n</ol>\n<ul>\n<li>I accomplish this by having good git repo
    organization and README files that explain my own usage patterns</li>\n</ul>\n<ol
    start=\"2\">\n<li>Tracked snapshots</li>\n</ol>\n<ul>\n<li>I need some kind of
    snapshotting - <code>zfs</code> has spoiled me, and turns out <code>restic</code>
    has some amount of support for it</li>\n</ul>\n<ol start=\"3\">\n<li>Running in
    docker would be ideal for now so that I don't need to worry about installing specific
    binaries across machine while I build out my patterns</li>\n</ol>\n<p>With this
    setup I get to backup my $HOME to my NAS which contains 1. docker\nvolume info
    for all the AI workloads I run on my desktop and 2. all my\nsensitive info in
    my git repos is at least backed up in a way that I can\nrecover <code>.env</code>
    files with relative ease...</p>\n<h1 id=\"code\">Code <a class=\"header-anchor\"
    href=\"#code\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Check out the <a href=\"https://github.com/pypeaday/docker-compose-restic\">Example
    GH\nRepo</a> but I'll drop key file\ncontents here for a quick read if you're
    interested in some of the setup... but\nthe blog post mostly ends here</p>\n<h2
    id=\"the-files\">The Files <a class=\"header-anchor\" href=\"#the-files\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>We have a <code>docker-compose.yml</code>
    of course</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">backup</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">restic/restic:latest</span>\n<span
    class=\"w\">    </span><span class=\"nt\">network_mode</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">host</span>\n<span
    class=\"w\">    </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">restic_backup</span>\n<span
    class=\"w\">    </span><span class=\"nt\">hostname</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">restic-backup-runner</span>\n<span
    class=\"w\">    </span><span class=\"nt\">env_file</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">.env</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">environment</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># The location of the backup repository
    inside the container</span>\n<span class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">RESTIC_REPOSITORY=/target</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># The location of the password file
    inside the container</span>\n<span class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">RESTIC_PASSWORD_FILE=/password</span>\n<span
    class=\"w\">    </span><span class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># --- Source and Config Mounts ---</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;${BACKUP_SOURCE}:/source:ro&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;${RESTIC_PASSWORD_FILE}:/password:ro&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;./backup-and-prune.sh:/usr/local/bin/backup-and-prune:ro&quot;</span>\n\n<span
    class=\"w\">      </span><span class=\"c1\"># --- Persistent Data Mounts ---</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;./.ssh:/root/.ssh:rw&quot;</span>\n<span class=\"w\">
    \     </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
    class=\"s\">&quot;./.cache:/root/.cache:rw&quot;</span>\n\n<span class=\"w\">
    \   </span><span class=\"c1\"># Set the default entrypoint to our new script.
    This will be executed when</span>\n<span class=\"w\">    </span><span class=\"c1\">#
    the container starts, unless overridden.</span>\n<span class=\"w\">    </span><span
    class=\"nt\">entrypoint</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"p p-Indicator\">[</span><span class=\"s\">&quot;/usr/local/bin/backup-and-prune&quot;</span><span
    class=\"p p-Indicator\">]</span>\n</pre></div>\n\n</pre>\n\n<p>Your <code>.env</code>
    file will need to look like this</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"sb\">``</span><span
    class=\"c1\"># HOST related variables</span>\n<span class=\"c1\"># The source
    directory to back up (absolute path)</span>\n<span class=\"nv\">BACKUP_SOURCE</span><span
    class=\"o\">=</span>/home/nic\n\n<span class=\"c1\"># --- Restic Configuration
    ---</span>\n<span class=\"c1\"># The file containing the restic repository password
    (absolute path on host)</span>\n<span class=\"nv\">HOST_RESTIC_PASSWORD_FILE</span><span
    class=\"o\">=</span>/home/nic/projects/personal/homelab-mono/dataops/docker/.restic-password\n<span
    class=\"c1\"># The SSH private key to use for connecting to the NAS (absolute
    path on host)</span>\n<span class=\"c1\"># It&#39;s recommended to use a dedicated
    key for this purpose.</span>\n<span class=\"nv\">SSH_PRIVATE_KEY_FILE</span><span
    class=\"o\">=</span>/home/nic/.skm/ghost/id_rsa\n\n<span class=\"c1\"># Container
    Env Vars</span>\n<span class=\"c1\"># the container makes the sftp connection
    using my credentials, but nonetheless the container needs them, so this isn&#39;t
    envrc stuff</span>\n\n<span class=\"c1\"># --- SFTP/SSH Connection Details for
    the NAS ---</span>\n<span class=\"nv\">SFTP_USER</span><span class=\"o\">=</span>nic\n<span
    class=\"nv\">SFTP_HOST</span><span class=\"o\">=</span>ghost\n<span class=\"c1\">#
    The path on the NAS where the restic repository will be stored</span>\n<span class=\"nv\">SFTP_PATH</span><span
    class=\"o\">=</span>/tank/encrypted/nas/nic-home/\n\n<span class=\"c1\"># ---
    Restic Configuration ---</span>\n\n<span class=\"nv\">RESTIC_REPOSITORY</span><span
    class=\"o\">=</span>/target\n<span class=\"nv\">RESTIC_PASSWORD_FILE</span><span
    class=\"o\">=</span>/password\n</pre></div>\n\n</pre>\n\n<p>And then the backup
    script that the container will execute is something like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/sh</span>\n<span
    class=\"nb\">set</span><span class=\"w\"> </span>-e<span class=\"w\"> </span><span
    class=\"c1\"># Exit immediately if a command exits with a non-zero status.</span>\n\n<span
    class=\"c1\"># Construct the repository path from environment variables passed
    by docker-compose</span>\n<span class=\"nv\">REPO</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;sftp:</span><span class=\"si\">${</span><span class=\"nv\">SFTP_USER</span><span
    class=\"si\">}</span><span class=\"s2\">@</span><span class=\"si\">${</span><span
    class=\"nv\">SFTP_HOST</span><span class=\"si\">}</span><span class=\"s2\">:</span><span
    class=\"si\">${</span><span class=\"nv\">SFTP_PATH</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n\n<span class=\"c1\"># 1. Run the backup</span>\n<span
    class=\"c1\"># -----------------</span>\n<span class=\"nb\">echo</span><span class=\"w\">
    </span><span class=\"s2\">&quot;--- Starting backup for </span><span class=\"si\">${</span><span
    class=\"nv\">BACKUP_SOURCE</span><span class=\"si\">}</span><span class=\"s2\">
    ---&quot;</span>\nrestic<span class=\"w\"> </span>backup<span class=\"w\"> </span>/source<span
    class=\"w\"> </span>--verbose<span class=\"w\"> </span>-r<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"nv\">REPO</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;--- Backup complete ---&quot;</span>\n\n<span
    class=\"c1\"># 2. Clean up old snapshots according to the policy</span>\n<span
    class=\"c1\"># --------------------------------------------------</span>\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;---
    Pruning old snapshots ---</span>\n<span class=\"s2\">(Policy: keep last 7 daily,
    4 weekly, 6 monthly)&quot;</span>\nrestic<span class=\"w\"> </span>forget<span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span>--prune<span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span>--keep-daily<span
    class=\"w\"> </span><span class=\"m\">7</span><span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">    </span>--keep-weekly<span class=\"w\">
    </span><span class=\"m\">4</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">    </span>--keep-monthly<span class=\"w\"> </span><span class=\"m\">6</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span>-r<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"si\">${</span><span
    class=\"nv\">REPO</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span>\n\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;---
    Backup and prune process finished successfully ---&quot;</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"systemd\">Systemd <a class=\"header-anchor\" href=\"#systemd\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Finally there's a systemd
    unit and timer file in there so you can setup a systemd service for the backup</p>\n<h3>service</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"o\">[</span>Unit<span
    class=\"o\">]</span>\n<span class=\"nv\">Description</span><span class=\"o\">=</span>Run<span
    class=\"w\"> </span>Restic<span class=\"w\"> </span>backup<span class=\"w\"> </span>to<span
    class=\"w\"> </span>NAS<span class=\"w\"> </span>using<span class=\"w\"> </span>Docker<span
    class=\"w\"> </span>Compose\n<span class=\"c1\"># We are running this as a user
    service, so we assume that the system-level</span>\n<span class=\"c1\"># docker.service
    is already running.</span>\n<span class=\"nv\">After</span><span class=\"o\">=</span>network-online.target\n\n<span
    class=\"o\">[</span>Service<span class=\"o\">]</span>\n<span class=\"nv\">Type</span><span
    class=\"o\">=</span>oneshot\n<span class=\"c1\"># Set the working directory to
    where your docker-compose.yml and .env file are located</span>\n<span class=\"nv\">WorkingDirectory</span><span
    class=\"o\">=</span>/home/user/nas-backup/docker\n\n<span class=\"c1\"># The command
    to execute. We use the full path to docker-compose for reliability.</span>\n<span
    class=\"c1\"># You may need to adjust this path if &#39;docker compose&#39; is
    installed elsewhere.</span>\n<span class=\"nv\">ExecStart</span><span class=\"o\">=</span>/usr/bin/docker<span
    class=\"w\"> </span>compose<span class=\"w\"> </span>run<span class=\"w\"> </span>--rm<span
    class=\"w\"> </span>backup\n\n<span class=\"o\">[</span>Install<span class=\"o\">]</span>\n<span
    class=\"nv\">WantedBy</span><span class=\"o\">=</span>default.target\n</pre></div>\n\n</pre>\n\n<h3>timer</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"o\">[</span>Unit<span
    class=\"o\">]</span>\n<span class=\"nv\">Description</span><span class=\"o\">=</span>Run<span
    class=\"w\"> </span>Restic<span class=\"w\"> </span>backup<span class=\"w\"> </span>job<span
    class=\"w\"> </span>daily\n\n<span class=\"o\">[</span>Timer<span class=\"o\">]</span>\n<span
    class=\"c1\"># Run daily at 2:00 AM</span>\n<span class=\"nv\">OnCalendar</span><span
    class=\"o\">=</span>daily\n<span class=\"c1\"># Or uncomment for a specific time:</span>\n<span
    class=\"c1\"># OnCalendar=*-*-* 02:00:00</span>\n\n<span class=\"c1\"># Run the
    backup immediately if the last scheduled run was missed (e.g., if the computer
    was off)</span>\n<span class=\"nv\">Persistent</span><span class=\"o\">=</span><span
    class=\"nb\">true</span>\n\n<span class=\"o\">[</span>Install<span class=\"o\">]</span>\n<span
    class=\"nv\">WantedBy</span><span class=\"o\">=</span>timers.target\n</pre></div>\n\n</pre>\n\n\n
    \   </section>\n</article>        </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Using restic to backup
    my home directory</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Intro I need to backup my personal $HOME to my NAS cause there&#x27;s
    a lot in there, and\nmostly my git projects with .env files all over. Plus some
    docker data\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
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
    mb-4 post-title-large\">Using restic to backup my home directory</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-16\">\n
    \           July 16, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
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
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250716145216_a3234af9.png\"
    \n            alt=\"Using restic to backup my home directory cover image\" \n
    \           class=\"boundary-break-image\"\n        >\n    </div>\n</div>\n\n<article
    class='w-full pattern-card glow-card p-4 md:p-6 post-container'>\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Using
    restic to backup my home directory</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-16\">\n            July
    16, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>    <section class=\"article-content prose
    dark:prose-invert lg:prose-xl mx-auto mt-8\">\n        <h1 id=\"intro\">Intro
    <a class=\"header-anchor\" href=\"#intro\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I need to backup my
    personal $HOME to my NAS cause there's a lot in there, and\nmostly my git projects
    with .env files all over. Plus some docker data</p>\n<h2 id=\"why-not-zfs\">Why
    Not ZFS? <a class=\"header-anchor\" href=\"#why-not-zfs\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>GREAT QUESTION! It's
    because I struggled getting all the syncoid/sanoid\nrequirements installed on
    my Aurora OS.... I like the immutable desktop trend,\nbut I don't understand rpm-ostree
    enough to properly get all the lower level\nkernel stuff setup in a way I trust.
    So because I don't have ZFS at $HOME\nwhat's a boy to do?</p>\n<p><code>rsync</code>
    would probably work fine especially if I <a class=\"wikilink\" href=\"/rsync-like-a-pro\">rsync-like-a-pro</a>
    but I figured I could cobble together some other tech and broaden my horizons...</p>\n<h2
    id=\"enter-restic\">Enter restic <a class=\"header-anchor\" href=\"#enter-restic\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Apparently <a href=\"https://restic.net/\">restic</a>
    has been around for a while, and you can run it in a container... awesome that's
    all I needed to hear...</p>\n<h2 id=\"how\">How? <a class=\"header-anchor\" href=\"#how\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'll use a docker compose
    stack for this... typically I think running <code>restic</code>\nright on the
    host is the way to go, but on my desktop I float between my host\nand distroboxes
    and to keep things as simple as possible, even though less\nefficient, I want
    to manage everything through containers as my homelab gets\nbuilt out and eventually
    I'll have a more full-featured ecosystem.</p>\n<h2 id=\"the-value\">The Value
    <a class=\"header-anchor\" href=\"#the-value\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>You can find code below
    and an example repo that more or less is what I use for my desktop backup but
    that's primarily what I was after.... backing up the data on my desktop to my
    NAS in a way that:</p>\n<ol>\n<li>I wouldn't have to &quot;remember&quot; how
    I was doing it</li>\n</ol>\n<ul>\n<li>I accomplish this by having good git repo
    organization and README files that explain my own usage patterns</li>\n</ul>\n<ol
    start=\"2\">\n<li>Tracked snapshots</li>\n</ol>\n<ul>\n<li>I need some kind of
    snapshotting - <code>zfs</code> has spoiled me, and turns out <code>restic</code>
    has some amount of support for it</li>\n</ul>\n<ol start=\"3\">\n<li>Running in
    docker would be ideal for now so that I don't need to worry about installing specific
    binaries across machine while I build out my patterns</li>\n</ol>\n<p>With this
    setup I get to backup my $HOME to my NAS which contains 1. docker\nvolume info
    for all the AI workloads I run on my desktop and 2. all my\nsensitive info in
    my git repos is at least backed up in a way that I can\nrecover <code>.env</code>
    files with relative ease...</p>\n<h1 id=\"code\">Code <a class=\"header-anchor\"
    href=\"#code\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Check out the <a href=\"https://github.com/pypeaday/docker-compose-restic\">Example
    GH\nRepo</a> but I'll drop key file\ncontents here for a quick read if you're
    interested in some of the setup... but\nthe blog post mostly ends here</p>\n<h2
    id=\"the-files\">The Files <a class=\"header-anchor\" href=\"#the-files\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>We have a <code>docker-compose.yml</code>
    of course</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">backup</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">restic/restic:latest</span>\n<span
    class=\"w\">    </span><span class=\"nt\">network_mode</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">host</span>\n<span
    class=\"w\">    </span><span class=\"nt\">container_name</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">restic_backup</span>\n<span
    class=\"w\">    </span><span class=\"nt\">hostname</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">restic-backup-runner</span>\n<span
    class=\"w\">    </span><span class=\"nt\">env_file</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">.env</span>\n<span class=\"w\">
    \   </span><span class=\"nt\">environment</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># The location of the backup repository
    inside the container</span>\n<span class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">RESTIC_REPOSITORY=/target</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># The location of the password file
    inside the container</span>\n<span class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">RESTIC_PASSWORD_FILE=/password</span>\n<span
    class=\"w\">    </span><span class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># --- Source and Config Mounts ---</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;${BACKUP_SOURCE}:/source:ro&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;${RESTIC_PASSWORD_FILE}:/password:ro&quot;</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;./backup-and-prune.sh:/usr/local/bin/backup-and-prune:ro&quot;</span>\n\n<span
    class=\"w\">      </span><span class=\"c1\"># --- Persistent Data Mounts ---</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;./.ssh:/root/.ssh:rw&quot;</span>\n<span class=\"w\">
    \     </span><span class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span
    class=\"s\">&quot;./.cache:/root/.cache:rw&quot;</span>\n\n<span class=\"w\">
    \   </span><span class=\"c1\"># Set the default entrypoint to our new script.
    This will be executed when</span>\n<span class=\"w\">    </span><span class=\"c1\">#
    the container starts, unless overridden.</span>\n<span class=\"w\">    </span><span
    class=\"nt\">entrypoint</span><span class=\"p\">:</span><span class=\"w\"> </span><span
    class=\"p p-Indicator\">[</span><span class=\"s\">&quot;/usr/local/bin/backup-and-prune&quot;</span><span
    class=\"p p-Indicator\">]</span>\n</pre></div>\n\n</pre>\n\n<p>Your <code>.env</code>
    file will need to look like this</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"sb\">``</span><span
    class=\"c1\"># HOST related variables</span>\n<span class=\"c1\"># The source
    directory to back up (absolute path)</span>\n<span class=\"nv\">BACKUP_SOURCE</span><span
    class=\"o\">=</span>/home/nic\n\n<span class=\"c1\"># --- Restic Configuration
    ---</span>\n<span class=\"c1\"># The file containing the restic repository password
    (absolute path on host)</span>\n<span class=\"nv\">HOST_RESTIC_PASSWORD_FILE</span><span
    class=\"o\">=</span>/home/nic/projects/personal/homelab-mono/dataops/docker/.restic-password\n<span
    class=\"c1\"># The SSH private key to use for connecting to the NAS (absolute
    path on host)</span>\n<span class=\"c1\"># It&#39;s recommended to use a dedicated
    key for this purpose.</span>\n<span class=\"nv\">SSH_PRIVATE_KEY_FILE</span><span
    class=\"o\">=</span>/home/nic/.skm/ghost/id_rsa\n\n<span class=\"c1\"># Container
    Env Vars</span>\n<span class=\"c1\"># the container makes the sftp connection
    using my credentials, but nonetheless the container needs them, so this isn&#39;t
    envrc stuff</span>\n\n<span class=\"c1\"># --- SFTP/SSH Connection Details for
    the NAS ---</span>\n<span class=\"nv\">SFTP_USER</span><span class=\"o\">=</span>nic\n<span
    class=\"nv\">SFTP_HOST</span><span class=\"o\">=</span>ghost\n<span class=\"c1\">#
    The path on the NAS where the restic repository will be stored</span>\n<span class=\"nv\">SFTP_PATH</span><span
    class=\"o\">=</span>/tank/encrypted/nas/nic-home/\n\n<span class=\"c1\"># ---
    Restic Configuration ---</span>\n\n<span class=\"nv\">RESTIC_REPOSITORY</span><span
    class=\"o\">=</span>/target\n<span class=\"nv\">RESTIC_PASSWORD_FILE</span><span
    class=\"o\">=</span>/password\n</pre></div>\n\n</pre>\n\n<p>And then the backup
    script that the container will execute is something like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/sh</span>\n<span
    class=\"nb\">set</span><span class=\"w\"> </span>-e<span class=\"w\"> </span><span
    class=\"c1\"># Exit immediately if a command exits with a non-zero status.</span>\n\n<span
    class=\"c1\"># Construct the repository path from environment variables passed
    by docker-compose</span>\n<span class=\"nv\">REPO</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;sftp:</span><span class=\"si\">${</span><span class=\"nv\">SFTP_USER</span><span
    class=\"si\">}</span><span class=\"s2\">@</span><span class=\"si\">${</span><span
    class=\"nv\">SFTP_HOST</span><span class=\"si\">}</span><span class=\"s2\">:</span><span
    class=\"si\">${</span><span class=\"nv\">SFTP_PATH</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n\n<span class=\"c1\"># 1. Run the backup</span>\n<span
    class=\"c1\"># -----------------</span>\n<span class=\"nb\">echo</span><span class=\"w\">
    </span><span class=\"s2\">&quot;--- Starting backup for </span><span class=\"si\">${</span><span
    class=\"nv\">BACKUP_SOURCE</span><span class=\"si\">}</span><span class=\"s2\">
    ---&quot;</span>\nrestic<span class=\"w\"> </span>backup<span class=\"w\"> </span>/source<span
    class=\"w\"> </span>--verbose<span class=\"w\"> </span>-r<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"nv\">REPO</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;--- Backup complete ---&quot;</span>\n\n<span
    class=\"c1\"># 2. Clean up old snapshots according to the policy</span>\n<span
    class=\"c1\"># --------------------------------------------------</span>\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;---
    Pruning old snapshots ---</span>\n<span class=\"s2\">(Policy: keep last 7 daily,
    4 weekly, 6 monthly)&quot;</span>\nrestic<span class=\"w\"> </span>forget<span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span>--prune<span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span>--keep-daily<span
    class=\"w\"> </span><span class=\"m\">7</span><span class=\"w\"> </span><span
    class=\"se\">\\</span>\n<span class=\"w\">    </span>--keep-weekly<span class=\"w\">
    </span><span class=\"m\">4</span><span class=\"w\"> </span><span class=\"se\">\\</span>\n<span
    class=\"w\">    </span>--keep-monthly<span class=\"w\"> </span><span class=\"m\">6</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span>-r<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"si\">${</span><span
    class=\"nv\">REPO</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span>\n\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;---
    Backup and prune process finished successfully ---&quot;</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"systemd\">Systemd <a class=\"header-anchor\" href=\"#systemd\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Finally there's a systemd
    unit and timer file in there so you can setup a systemd service for the backup</p>\n<h3>service</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"o\">[</span>Unit<span
    class=\"o\">]</span>\n<span class=\"nv\">Description</span><span class=\"o\">=</span>Run<span
    class=\"w\"> </span>Restic<span class=\"w\"> </span>backup<span class=\"w\"> </span>to<span
    class=\"w\"> </span>NAS<span class=\"w\"> </span>using<span class=\"w\"> </span>Docker<span
    class=\"w\"> </span>Compose\n<span class=\"c1\"># We are running this as a user
    service, so we assume that the system-level</span>\n<span class=\"c1\"># docker.service
    is already running.</span>\n<span class=\"nv\">After</span><span class=\"o\">=</span>network-online.target\n\n<span
    class=\"o\">[</span>Service<span class=\"o\">]</span>\n<span class=\"nv\">Type</span><span
    class=\"o\">=</span>oneshot\n<span class=\"c1\"># Set the working directory to
    where your docker-compose.yml and .env file are located</span>\n<span class=\"nv\">WorkingDirectory</span><span
    class=\"o\">=</span>/home/user/nas-backup/docker\n\n<span class=\"c1\"># The command
    to execute. We use the full path to docker-compose for reliability.</span>\n<span
    class=\"c1\"># You may need to adjust this path if &#39;docker compose&#39; is
    installed elsewhere.</span>\n<span class=\"nv\">ExecStart</span><span class=\"o\">=</span>/usr/bin/docker<span
    class=\"w\"> </span>compose<span class=\"w\"> </span>run<span class=\"w\"> </span>--rm<span
    class=\"w\"> </span>backup\n\n<span class=\"o\">[</span>Install<span class=\"o\">]</span>\n<span
    class=\"nv\">WantedBy</span><span class=\"o\">=</span>default.target\n</pre></div>\n\n</pre>\n\n<h3>timer</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"o\">[</span>Unit<span
    class=\"o\">]</span>\n<span class=\"nv\">Description</span><span class=\"o\">=</span>Run<span
    class=\"w\"> </span>Restic<span class=\"w\"> </span>backup<span class=\"w\"> </span>job<span
    class=\"w\"> </span>daily\n\n<span class=\"o\">[</span>Timer<span class=\"o\">]</span>\n<span
    class=\"c1\"># Run daily at 2:00 AM</span>\n<span class=\"nv\">OnCalendar</span><span
    class=\"o\">=</span>daily\n<span class=\"c1\"># Or uncomment for a specific time:</span>\n<span
    class=\"c1\"># OnCalendar=*-*-* 02:00:00</span>\n\n<span class=\"c1\"># Run the
    backup immediately if the last scheduled run was missed (e.g., if the computer
    was off)</span>\n<span class=\"nv\">Persistent</span><span class=\"o\">=</span><span
    class=\"nb\">true</span>\n\n<span class=\"o\">[</span>Install<span class=\"o\">]</span>\n<span
    class=\"nv\">WantedBy</span><span class=\"o\">=</span>timers.target\n</pre></div>\n\n</pre>\n\n\n
    \   </section>\n</article>"
  raw.md: "---\ndate: 2025-07-16 09:12:26\ntemplateKey: blog-post\ntitle: Using restic
    to backup my home directory\npublished: True\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250716145216_a3234af9.png\"\ntags:\n
    \ - homelab\n  - tech\n---\n\n# Intro\n\nI need to backup my personal $HOME to
    my NAS cause there's a lot in there, and\nmostly my git projects with .env files
    all over. Plus some docker data\n\n## Why Not ZFS?\n\nGREAT QUESTION! It's because
    I struggled getting all the syncoid/sanoid\nrequirements installed on my Aurora
    OS.... I like the immutable desktop trend,\nbut I don't understand rpm-ostree
    enough to properly get all the lower level\nkernel stuff setup in a way I trust.
    So because I don't have ZFS at $HOME\nwhat's a boy to do?\n\n`rsync` would probably
    work fine especially if I [[rsync-like-a-pro]] but I figured I could cobble together
    some other tech and broaden my horizons...\n\n## Enter restic\n\nApparently [restic](https://restic.net/)
    has been around for a while, and you can run it in a container... awesome that's
    all I needed to hear...\n\n## How?\n\nI'll use a docker compose stack for this...
    typically I think running `restic`\nright on the host is the way to go, but on
    my desktop I float between my host\nand distroboxes and to keep things as simple
    as possible, even though less\nefficient, I want to manage everything through
    containers as my homelab gets\nbuilt out and eventually I'll have a more full-featured
    ecosystem.\n\n## The Value\n\nYou can find code below and an example repo that
    more or less is what I use for my desktop backup but that's primarily what I was
    after.... backing up the data on my desktop to my NAS in a way that:\n\n1. I wouldn't
    have to \"remember\" how I was doing it\n\n- I accomplish this by having good
    git repo organization and README files that explain my own usage patterns\n\n2.
    Tracked snapshots\n\n- I need some kind of snapshotting - `zfs` has spoiled me,
    and turns out `restic` has some amount of support for it\n\n3. Running in docker
    would be ideal for now so that I don't need to worry about installing specific
    binaries across machine while I build out my patterns\n\nWith this setup I get
    to backup my $HOME to my NAS which contains 1. docker\nvolume info for all the
    AI workloads I run on my desktop and 2. all my\nsensitive info in my git repos
    is at least backed up in a way that I can\nrecover `.env` files with relative
    ease...\n\n# Code\n\nCheck out the [Example GH\nRepo](https://github.com/pypeaday/docker-compose-restic)
    but I'll drop key file\ncontents here for a quick read if you're interested in
    some of the setup... but\nthe blog post mostly ends here\n\n## The Files\n\nWe
    have a `docker-compose.yml` of course\n\n```yaml\nservices:\n  backup:\n    image:
    restic/restic:latest\n    network_mode: host\n    container_name: restic_backup\n
    \   hostname: restic-backup-runner\n    env_file:\n      - .env\n    environment:\n
    \     # The location of the backup repository inside the container\n      - RESTIC_REPOSITORY=/target\n
    \     # The location of the password file inside the container\n      - RESTIC_PASSWORD_FILE=/password\n
    \   volumes:\n      # --- Source and Config Mounts ---\n      - \"${BACKUP_SOURCE}:/source:ro\"\n
    \     - \"${RESTIC_PASSWORD_FILE}:/password:ro\"\n      - \"./backup-and-prune.sh:/usr/local/bin/backup-and-prune:ro\"\n\n
    \     # --- Persistent Data Mounts ---\n      - \"./.ssh:/root/.ssh:rw\"\n      -
    \"./.cache:/root/.cache:rw\"\n\n    # Set the default entrypoint to our new script.
    This will be executed when\n    # the container starts, unless overridden.\n    entrypoint:
    [\"/usr/local/bin/backup-and-prune\"]\n```\n\nYour `.env` file will need to look
    like this\n\n```bash\n``# HOST related variables\n# The source directory to back
    up (absolute path)\nBACKUP_SOURCE=/home/nic\n\n# --- Restic Configuration ---\n#
    The file containing the restic repository password (absolute path on host)\nHOST_RESTIC_PASSWORD_FILE=/home/nic/projects/personal/homelab-mono/dataops/docker/.restic-password\n#
    The SSH private key to use for connecting to the NAS (absolute path on host)\n#
    It's recommended to use a dedicated key for this purpose.\nSSH_PRIVATE_KEY_FILE=/home/nic/.skm/ghost/id_rsa\n\n#
    Container Env Vars\n# the container makes the sftp connection using my credentials,
    but nonetheless the container needs them, so this isn't envrc stuff\n\n# --- SFTP/SSH
    Connection Details for the NAS ---\nSFTP_USER=nic\nSFTP_HOST=ghost\n# The path
    on the NAS where the restic repository will be stored\nSFTP_PATH=/tank/encrypted/nas/nic-home/\n\n#
    --- Restic Configuration ---\n\nRESTIC_REPOSITORY=/target\nRESTIC_PASSWORD_FILE=/password\n```\n\nAnd
    then the backup script that the container will execute is something like this:\n\n```bash\n\n#!/bin/sh\nset
    -e # Exit immediately if a command exits with a non-zero status.\n\n# Construct
    the repository path from environment variables passed by docker-compose\nREPO=\"sftp:${SFTP_USER}@${SFTP_HOST}:${SFTP_PATH}\"\n\n#
    1. Run the backup\n# -----------------\necho \"--- Starting backup for ${BACKUP_SOURCE}
    ---\"\nrestic backup /source --verbose -r \"${REPO}\"\necho \"--- Backup complete
    ---\"\n\n# 2. Clean up old snapshots according to the policy\n# --------------------------------------------------\necho
    \"--- Pruning old snapshots ---\n(Policy: keep last 7 daily, 4 weekly, 6 monthly)\"\nrestic
    forget \\\n    --prune \\\n    --keep-daily 7 \\\n    --keep-weekly 4 \\\n    --keep-monthly
    6 \\\n    -r \"${REPO}\"\n\necho \"--- Backup and prune process finished successfully
    ---\"\n```\n\n## Systemd\n\nFinally there's a systemd unit and timer file in there
    so you can setup a systemd service for the backup\n\n### service\n\n```bash\n\n[Unit]\nDescription=Run
    Restic backup to NAS using Docker Compose\n# We are running this as a user service,
    so we assume that the system-level\n# docker.service is already running.\nAfter=network-online.target\n\n[Service]\nType=oneshot\n#
    Set the working directory to where your docker-compose.yml and .env file are located\nWorkingDirectory=/home/user/nas-backup/docker\n\n#
    The command to execute. We use the full path to docker-compose for reliability.\n#
    You may need to adjust this path if 'docker compose' is installed elsewhere.\nExecStart=/usr/bin/docker
    compose run --rm backup\n\n[Install]\nWantedBy=default.target\n```\n\n### timer\n\n```bash\n\n[Unit]\nDescription=Run
    Restic backup job daily\n\n[Timer]\n# Run daily at 2:00 AM\nOnCalendar=daily\n#
    Or uncomment for a specific time:\n# OnCalendar=*-*-* 02:00:00\n\n# Run the backup
    immediately if the last scheduled run was missed (e.g., if the computer was off)\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n```\n"
published: true
slug: using-restic-to-backup-my-home-directory
title: Using restic to backup my home directory


---

# Intro

I need to backup my personal $HOME to my NAS cause there's a lot in there, and
mostly my git projects with .env files all over. Plus some docker data

## Why Not ZFS?

GREAT QUESTION! It's because I struggled getting all the syncoid/sanoid
requirements installed on my Aurora OS.... I like the immutable desktop trend,
but I don't understand rpm-ostree enough to properly get all the lower level
kernel stuff setup in a way I trust. So because I don't have ZFS at $HOME
what's a boy to do?

`rsync` would probably work fine especially if I [[rsync-like-a-pro]] but I figured I could cobble together some other tech and broaden my horizons...

## Enter restic

Apparently [restic](https://restic.net/) has been around for a while, and you can run it in a container... awesome that's all I needed to hear...

## How?

I'll use a docker compose stack for this... typically I think running `restic`
right on the host is the way to go, but on my desktop I float between my host
and distroboxes and to keep things as simple as possible, even though less
efficient, I want to manage everything through containers as my homelab gets
built out and eventually I'll have a more full-featured ecosystem.

## The Value

You can find code below and an example repo that more or less is what I use for my desktop backup but that's primarily what I was after.... backing up the data on my desktop to my NAS in a way that:

1. I wouldn't have to "remember" how I was doing it

- I accomplish this by having good git repo organization and README files that explain my own usage patterns

2. Tracked snapshots

- I need some kind of snapshotting - `zfs` has spoiled me, and turns out `restic` has some amount of support for it

3. Running in docker would be ideal for now so that I don't need to worry about installing specific binaries across machine while I build out my patterns

With this setup I get to backup my $HOME to my NAS which contains 1. docker
volume info for all the AI workloads I run on my desktop and 2. all my
sensitive info in my git repos is at least backed up in a way that I can
recover `.env` files with relative ease...

# Code

Check out the [Example GH
Repo](https://github.com/pypeaday/docker-compose-restic) but I'll drop key file
contents here for a quick read if you're interested in some of the setup... but
the blog post mostly ends here

## The Files

We have a `docker-compose.yml` of course

```yaml
services:
  backup:
    image: restic/restic:latest
    network_mode: host
    container_name: restic_backup
    hostname: restic-backup-runner
    env_file:
      - .env
    environment:
      # The location of the backup repository inside the container
      - RESTIC_REPOSITORY=/target
      # The location of the password file inside the container
      - RESTIC_PASSWORD_FILE=/password
    volumes:
      # --- Source and Config Mounts ---
      - "${BACKUP_SOURCE}:/source:ro"
      - "${RESTIC_PASSWORD_FILE}:/password:ro"
      - "./backup-and-prune.sh:/usr/local/bin/backup-and-prune:ro"

      # --- Persistent Data Mounts ---
      - "./.ssh:/root/.ssh:rw"
      - "./.cache:/root/.cache:rw"

    # Set the default entrypoint to our new script. This will be executed when
    # the container starts, unless overridden.
    entrypoint: ["/usr/local/bin/backup-and-prune"]
```

Your `.env` file will need to look like this

```bash
``# HOST related variables
# The source directory to back up (absolute path)
BACKUP_SOURCE=/home/nic

# --- Restic Configuration ---
# The file containing the restic repository password (absolute path on host)
HOST_RESTIC_PASSWORD_FILE=/home/nic/projects/personal/homelab-mono/dataops/docker/.restic-password
# The SSH private key to use for connecting to the NAS (absolute path on host)
# It's recommended to use a dedicated key for this purpose.
SSH_PRIVATE_KEY_FILE=/home/nic/.skm/ghost/id_rsa

# Container Env Vars
# the container makes the sftp connection using my credentials, but nonetheless the container needs them, so this isn't envrc stuff

# --- SFTP/SSH Connection Details for the NAS ---
SFTP_USER=nic
SFTP_HOST=ghost
# The path on the NAS where the restic repository will be stored
SFTP_PATH=/tank/encrypted/nas/nic-home/

# --- Restic Configuration ---

RESTIC_REPOSITORY=/target
RESTIC_PASSWORD_FILE=/password
```

And then the backup script that the container will execute is something like this:

```bash

#!/bin/sh
set -e # Exit immediately if a command exits with a non-zero status.

# Construct the repository path from environment variables passed by docker-compose
REPO="sftp:${SFTP_USER}@${SFTP_HOST}:${SFTP_PATH}"

# 1. Run the backup
# -----------------
echo "--- Starting backup for ${BACKUP_SOURCE} ---"
restic backup /source --verbose -r "${REPO}"
echo "--- Backup complete ---"

# 2. Clean up old snapshots according to the policy
# --------------------------------------------------
echo "--- Pruning old snapshots ---
(Policy: keep last 7 daily, 4 weekly, 6 monthly)"
restic forget \
    --prune \
    --keep-daily 7 \
    --keep-weekly 4 \
    --keep-monthly 6 \
    -r "${REPO}"

echo "--- Backup and prune process finished successfully ---"
```

## Systemd

Finally there's a systemd unit and timer file in there so you can setup a systemd service for the backup

### service

```bash

[Unit]
Description=Run Restic backup to NAS using Docker Compose
# We are running this as a user service, so we assume that the system-level
# docker.service is already running.
After=network-online.target

[Service]
Type=oneshot
# Set the working directory to where your docker-compose.yml and .env file are located
WorkingDirectory=/home/user/nas-backup/docker

# The command to execute. We use the full path to docker-compose for reliability.
# You may need to adjust this path if 'docker compose' is installed elsewhere.
ExecStart=/usr/bin/docker compose run --rm backup

[Install]
WantedBy=default.target
```

### timer

```bash

[Unit]
Description=Run Restic backup job daily

[Timer]
# Run daily at 2:00 AM
OnCalendar=daily
# Or uncomment for a specific time:
# OnCalendar=*-*-* 02:00:00

# Run the backup immediately if the last scheduled run was missed (e.g., if the computer was off)
Persistent=true

[Install]
WantedBy=timers.target
```