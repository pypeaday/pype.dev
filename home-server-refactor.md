---
content: "My current homelab setup is not great but it works...\n\n# Proxmox on PowerEdge
  R610\n\nI boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array
  using a Dell H700 SAS controller.\nI cannot boot from a disk using this controller
  and I can't get the firmware configured in a way to allow it.\nSo I have 1 SSD as
  a ZFS array that I've been putting my VM images on, and the 5 HDDs are passed through
  to a TrueNAS VM where I handle all the ZFS stuff there... kind of meta because I
  then attached those drives to Proxmox as a CIFS share.\n\n# TrueNAS on dedicated
  box\n\nI have an on-prem backup that is just an old desktop running TrueNAS\nI regularly
  backup the 5 disk RAIDZ2 array from my Proxmox host (managed by a TrueNAS VM) to
  this backup box\n\nCurrently there is nothing else running on this machine since
  it's my \"backup\"\n\n# Jellyfin\n\nI was HWA for Jellyfin, but hardware passthrough
  on the R610 is finicky or broken so Jellyfin is running on an Ubuntu host.\n\nI
  could put UBuntu on the R610 and give up \"true virtualization\". Then I'd manage
  the SMB share myself.\nIf I do that then I would get rid of \"users\" I think, ie.
  basically forgo least-priviledges since I'm not sure how hard that is to manage.\n\nOn
  the other hand, direct access to the smb config might make it easier?\n\nI have
  the media array on Jellyfin box setup as NFS which was really easy with ZFS... I
  think SMB would be just as easy.\n\n# Plan of attack...\n\n1. Move all vm disks
  to individual datasets on the NAS \n2. Backup docker data... not sure how well this
  will work, maybe just start over?\n3. Clean up Ansible playbooks on the user side
  of things - stick with neville vs just using my own name?\n4. Install Ubuntu 20
  or 22 on a 2.5\" drive that I'll toss in this SSD enclosure (or a usb thumb stick?)\n5.
  Re-deploy everything with ansible-playbook and configure...\n\n## Configuration...\n\n0.
  THE FREAKING NAS -> just import zfs array and configure SMB?\n\n1.~~ Nextcloud users
  and connections.. might be able to just copy the data folder? not sure about the
  database... try spinning it up in the sandbox vm and see if stuff is there ~~\n2.~~
  *arr suite, media profiles and connections to transmission... nothing major~~\n3.
  transmission - should be deploy and go\n4. ombi and jackett should also just work
  after some config again\n5. ~~traefik should just work~~\n6. ~~try to bring up pi-hole
  from the vm that's already running~~\n7. ~~heimdall will hopefully just be copying
  the data folder from the existind docker one'~~\n8.~~ booksonic can be reconfigured
  easily~~\n9. ~~portainer... hopefully just copying data folder over?~~\n10. ~~littlelink~~,
  small-group-notes, and blog (at home) will need manually re-deployed once Ubuntu
  is installed bare-metal\n\n## BIG BIG BIG TODOS\n1. Sanoid/syncoid! Get snapshots
  going and backups configured with on prem TrueNAS\n2. Wireguard setup on DA.\n3.
  network share on printer for paperless\n~~4. update peperless in ansible-nas~~\n4.
  ~~Just deploy paperless manually... monitor/manage with portainer~~\n5. booksonic
  not seeing audiobooks/podcasts\n\n1. need a smb user to map nas/documents to the
  printer for paperless\n3. wireguard setup now on kps phone, desktop, server (and
  backup truenas?), and dad's pi\n4. ~~verify lan services work~~\n5. ~~Tdar so Jellyfin
  can work better~~\n\nSnapshot business might be cause of all the docker containers
  and docker using\nZFS backend... take everything down and try removing\n\n1. file
  browser - currently I just one-clicked in portainer, I want to make a stack with
  my own config file which I'll rip from techno tip and then add my traefik lables
  too\n\nForget filebrowser - going to just use Nextcloud for how it's supposed to
  be used.\n3. Need to organize those files in nextcloud\n## CHECK THIS ->  ran as
  'cp' utility in tmux window, no progress bars or anything. it's in ansible-nas session
  -> window 3\nOlivet bible stuff going to /tmp/olivet/ -> will move this to nextcloud,
  ideally by the app via appimage so that the db updates and I don't have to run that
  occ script\nI wnat to organize \"home\" still in nextcloud \n\nsetup Sanoid\n\n\nclean
  up bitwarden \nlearn nextcloud sharing -> maybe just give a link to grandma?\nrest
  of todos -> document db and sanoid + zfs.rent\n\nCheck on mom's will\ndo media thing
  for church - split vocals on mp3/4\n\npermission-data playbook changes everything
  to ansible-nas:ansible-nas but then samba task will re-permission some stuff to
  root:users... this looks fine\nI had to add `group` to the samba config in my playbook
  to get user auth to work with samba\nThis isn't fully working... it works from cli
  but my python process can't write to a folder in dump after 777.... need to learn
  more?\nSo I can make a file after adding the ansible-nas group to config, but I
  still cannot make a directory on the smb mount...\n\nADDING `inherit permission
  = yes` under `[global]` in the smb.conf worked!\n\nstill not working from printer...\nI
  think what I want is to setup 2 scan options - single docs right to paperless, or
  combined scans to dump, then manually split and send to paperless"
date: 2022-04-10
description: My current homelab setup is not great but it works... Proxmox on PowerEdge
  R610 I boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array
  using
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Home-Server-Refactor</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"My current homelab setup is not great
    but it works... Proxmox on PowerEdge R610 I boot off an SD card and have 1 SSD
    and 5 HDDs configured as a JBOD array using\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Home-Server-Refactor
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://pype.dev//media/home-server-refactor.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/home-server-refactor\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Home-Server-Refactor | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"My current homelab setup is not great but it works... Proxmox on PowerEdge
    R610 I boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array
    using\" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/home-server-refactor.png\"
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
    /* Even larger than text-7xl */\n        }\n    }\n    \n    /* Mobile-first responsive
    typography for article content */\n    .article-content.prose {\n        font-size:
    1.125rem !important; /* 18px - larger than default 16px */\n        line-height:
    1.7 !important;\n    }\n    \n    .article-content.prose p {\n        font-size:
    1.125rem !important; /* 18px */\n        line-height: 1.7 !important;\n    }\n
    \   \n    /* Tablet and up */\n    @media (min-width: 768px) {\n        .article-content.prose
    {\n            font-size: 1.25rem !important; /* 20px */\n            line-height:
    1.8 !important;\n        }\n        \n        .article-content.prose p {\n            font-size:
    1.25rem !important; /* 20px */\n            line-height: 1.8 !important;\n        }\n
    \   }\n    \n    /* Desktop */\n    @media (min-width: 1024px) {\n        .article-content.prose
    {\n            font-size: 1.375rem !important; /* 22px */\n            line-height:
    1.8 !important;\n        }\n        \n        .article-content.prose p {\n            font-size:
    1.375rem !important; /* 22px */\n            line-height: 1.8 !important;\n        }\n
    \   }\n    \n    /* Floating cover image above article */\n    .cover-floating-container
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
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"/media/home-server-refactor.png\"
    \n            alt=\"Home-Server-Refactor cover image\" \n            class=\"boundary-break-image\"\n
    \       >\n    </div>\n</div>\n\n<article class='w-full pattern-card glow-card
    p-4 md:p-6 post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Home-Server-Refactor</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-04-10\">\n            April 10, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/blog/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #blog\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section>
    \   <section class=\"article-content prose dark:prose-invert mx-auto mt-8\">\n
    \       <p>My current homelab setup is not great but it works...</p>\n<h1 id=\"proxmox-on-poweredge-r610\">Proxmox
    on PowerEdge R610 <a class=\"header-anchor\" href=\"#proxmox-on-poweredge-r610\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I boot off an SD card
    and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700 SAS controller.\nI
    cannot boot from a disk using this controller and I can't get the firmware configured
    in a way to allow it.\nSo I have 1 SSD as a ZFS array that I've been putting my
    VM images on, and the 5 HDDs are passed through to a TrueNAS VM where I handle
    all the ZFS stuff there... kind of meta because I then attached those drives to
    Proxmox as a CIFS share.</p>\n<h1 id=\"truenas-on-dedicated-box\">TrueNAS on dedicated
    box <a class=\"header-anchor\" href=\"#truenas-on-dedicated-box\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I have an on-prem backup
    that is just an old desktop running TrueNAS\nI regularly backup the 5 disk RAIDZ2
    array from my Proxmox host (managed by a TrueNAS VM) to this backup box</p>\n<p>Currently
    there is nothing else running on this machine since it's my &quot;backup&quot;</p>\n<h1
    id=\"jellyfin\">Jellyfin <a class=\"header-anchor\" href=\"#jellyfin\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I was HWA for Jellyfin,
    but hardware passthrough on the R610 is finicky or broken so Jellyfin is running
    on an Ubuntu host.</p>\n<p>I could put UBuntu on the R610 and give up &quot;true
    virtualization&quot;. Then I'd manage the SMB share myself.\nIf I do that then
    I would get rid of &quot;users&quot; I think, ie. basically forgo least-priviledges
    since I'm not sure how hard that is to manage.</p>\n<p>On the other hand, direct
    access to the smb config might make it easier?</p>\n<p>I have the media array
    on Jellyfin box setup as NFS which was really easy with ZFS... I think SMB would
    be just as easy.</p>\n<h1 id=\"plan-of-attack\">Plan of attack... <a class=\"header-anchor\"
    href=\"#plan-of-attack\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ol>\n<li>Move all vm disks
    to individual datasets on the NAS</li>\n<li>Backup docker data... not sure how
    well this will work, maybe just start over?</li>\n<li>Clean up Ansible playbooks
    on the user side of things - stick with neville vs just using my own name?</li>\n<li>Install
    Ubuntu 20 or 22 on a 2.5&quot; drive that I'll toss in this SSD enclosure (or
    a usb thumb stick?)</li>\n<li>Re-deploy everything with ansible-playbook and configure...</li>\n</ol>\n<h2
    id=\"configuration\">Configuration... <a class=\"header-anchor\" href=\"#configuration\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol start=\"0\">\n<li>THE
    FREAKING NAS -&gt; just import zfs array and configure SMB?</li>\n</ol>\n<p>1.~~
    Nextcloud users and connections.. might be able to just copy the data folder?
    not sure about the database... try spinning it up in the sandbox vm and see if
    stuff is there ~~\n2.~~ *arr suite, media profiles and connections to transmission...
    nothing major~~\n3. transmission - should be deploy and go\n4. ombi and jackett
    should also just work after some config again\n5. <s>traefik should just work</s>\n6.
    <s>try to bring up pi-hole from the vm that's already running</s>\n7. <s>heimdall
    will hopefully just be copying the data folder from the existind docker one'</s>\n8.~~
    booksonic can be reconfigured easily~~\n9. <s>portainer... hopefully just copying
    data folder over?</s>\n10. <s>littlelink</s>, small-group-notes, and blog (at
    home) will need manually re-deployed once Ubuntu is installed bare-metal</p>\n<h2
    id=\"big-big-big-todos\">BIG BIG BIG TODOS <a class=\"header-anchor\" href=\"#big-big-big-todos\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol>\n<li>\n<p>Sanoid/syncoid!
    Get snapshots going and backups configured with on prem TrueNAS</p>\n</li>\n<li>\n<p>Wireguard
    setup on DA.</p>\n</li>\n<li>\n<p>network share on printer for paperless\n<s>4.
    update peperless in ansible-nas</s></p>\n</li>\n<li>\n<p><s>Just deploy paperless
    manually... monitor/manage with portainer</s></p>\n</li>\n<li>\n<p>booksonic not
    seeing audiobooks/podcasts</p>\n</li>\n<li>\n<p>need a smb user to map nas/documents
    to the printer for paperless</p>\n</li>\n<li>\n<p>wireguard setup now on kps phone,
    desktop, server (and backup truenas?), and dad's pi</p>\n</li>\n<li>\n<p><s>verify
    lan services work</s></p>\n</li>\n<li>\n<p><s>Tdar so Jellyfin can work better</s></p>\n</li>\n</ol>\n<p>Snapshot
    business might be cause of all the docker containers and docker using\nZFS backend...
    take everything down and try removing</p>\n<ol>\n<li>file browser - currently
    I just one-clicked in portainer, I want to make a stack with my own config file
    which I'll rip from techno tip and then add my traefik lables too</li>\n</ol>\n<p>Forget
    filebrowser - going to just use Nextcloud for how it's supposed to be used.\n3.
    Need to organize those files in nextcloud</p>\n<h2 id=\"check-this----ran-as-cp-utility-in-tmux-window-no-progress-bars-or-anything-its-in-ansible-nas-session---window-3\">CHECK
    THIS -&gt;  ran as 'cp' utility in tmux window, no progress bars or anything.
    it's in ansible-nas session -&gt; window 3 <a class=\"header-anchor\" href=\"#check-this----ran-as-cp-utility-in-tmux-window-no-progress-bars-or-anything-its-in-ansible-nas-session---window-3\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Olivet bible stuff going
    to /tmp/olivet/ -&gt; will move this to nextcloud, ideally by the app via appimage
    so that the db updates and I don't have to run that occ script\nI wnat to organize
    &quot;home&quot; still in nextcloud</p>\n<p>setup Sanoid</p>\n<p>clean up bitwarden\nlearn
    nextcloud sharing -&gt; maybe just give a link to grandma?\nrest of todos -&gt;
    document db and sanoid + zfs.rent</p>\n<p>Check on mom's will\ndo media thing
    for church - split vocals on mp3/4</p>\n<p>permission-data playbook changes everything
    to ansible-nas:ansible-nas but then samba task will re-permission some stuff to
    root:users... this looks fine\nI had to add <code>group</code> to the samba config
    in my playbook to get user auth to work with samba\nThis isn't fully working...
    it works from cli but my python process can't write to a folder in dump after
    777.... need to learn more?\nSo I can make a file after adding the ansible-nas
    group to config, but I still cannot make a directory on the smb mount...</p>\n<p>ADDING
    <code>inherit permission = yes</code> under <code>[global]</code> in the smb.conf
    worked!</p>\n<p>still not working from printer...\nI think what I want is to setup
    2 scan options - single docs right to paperless, or combined scans to dump, then
    manually split and send to paperless</p>\n\n    </section>\n</article>        </div>\n
    \   </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Home-Server-Refactor</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"My current homelab setup is not great
    but it works... Proxmox on PowerEdge R610 I boot off an SD card and have 1 SSD
    and 5 HDDs configured as a JBOD array using\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Home-Server-Refactor
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://pype.dev//media/home-server-refactor.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/home-server-refactor\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Home-Server-Refactor | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"My current homelab setup is not great but it works... Proxmox on PowerEdge
    R610 I boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array
    using\" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/home-server-refactor.png\"
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
    mb-4 post-title-large\">Home-Server-Refactor</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-10\">\n            April
    10, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/blog/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #blog\n
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
    \       }\n    }\n    \n    /* Mobile-first responsive typography for article
    content */\n    .article-content.prose {\n        font-size: 1.125rem !important;
    /* 18px - larger than default 16px */\n        line-height: 1.7 !important;\n
    \   }\n    \n    .article-content.prose p {\n        font-size: 1.125rem !important;
    /* 18px */\n        line-height: 1.7 !important;\n    }\n    \n    /* Tablet and
    up */\n    @media (min-width: 768px) {\n        .article-content.prose {\n            font-size:
    1.25rem !important; /* 20px */\n            line-height: 1.8 !important;\n        }\n
    \       \n        .article-content.prose p {\n            font-size: 1.25rem !important;
    /* 20px */\n            line-height: 1.8 !important;\n        }\n    }\n    \n
    \   /* Desktop */\n    @media (min-width: 1024px) {\n        .article-content.prose
    {\n            font-size: 1.375rem !important; /* 22px */\n            line-height:
    1.8 !important;\n        }\n        \n        .article-content.prose p {\n            font-size:
    1.375rem !important; /* 22px */\n            line-height: 1.8 !important;\n        }\n
    \   }\n    \n    /* Floating cover image above article */\n    .cover-floating-container
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
    \       <div class=\"boundary-break-glow\"></div>\n        <img \n            src=\"/media/home-server-refactor.png\"
    \n            alt=\"Home-Server-Refactor cover image\" \n            class=\"boundary-break-image\"\n
    \       >\n    </div>\n</div>\n\n<article class='w-full pattern-card glow-card
    p-4 md:p-6 post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\"
    style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Home-Server-Refactor</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-04-10\">\n            April 10, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/blog/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #blog\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section>
    \   <section class=\"article-content prose dark:prose-invert mx-auto mt-8\">\n
    \       <p>My current homelab setup is not great but it works...</p>\n<h1 id=\"proxmox-on-poweredge-r610\">Proxmox
    on PowerEdge R610 <a class=\"header-anchor\" href=\"#proxmox-on-poweredge-r610\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I boot off an SD card
    and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700 SAS controller.\nI
    cannot boot from a disk using this controller and I can't get the firmware configured
    in a way to allow it.\nSo I have 1 SSD as a ZFS array that I've been putting my
    VM images on, and the 5 HDDs are passed through to a TrueNAS VM where I handle
    all the ZFS stuff there... kind of meta because I then attached those drives to
    Proxmox as a CIFS share.</p>\n<h1 id=\"truenas-on-dedicated-box\">TrueNAS on dedicated
    box <a class=\"header-anchor\" href=\"#truenas-on-dedicated-box\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I have an on-prem backup
    that is just an old desktop running TrueNAS\nI regularly backup the 5 disk RAIDZ2
    array from my Proxmox host (managed by a TrueNAS VM) to this backup box</p>\n<p>Currently
    there is nothing else running on this machine since it's my &quot;backup&quot;</p>\n<h1
    id=\"jellyfin\">Jellyfin <a class=\"header-anchor\" href=\"#jellyfin\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I was HWA for Jellyfin,
    but hardware passthrough on the R610 is finicky or broken so Jellyfin is running
    on an Ubuntu host.</p>\n<p>I could put UBuntu on the R610 and give up &quot;true
    virtualization&quot;. Then I'd manage the SMB share myself.\nIf I do that then
    I would get rid of &quot;users&quot; I think, ie. basically forgo least-priviledges
    since I'm not sure how hard that is to manage.</p>\n<p>On the other hand, direct
    access to the smb config might make it easier?</p>\n<p>I have the media array
    on Jellyfin box setup as NFS which was really easy with ZFS... I think SMB would
    be just as easy.</p>\n<h1 id=\"plan-of-attack\">Plan of attack... <a class=\"header-anchor\"
    href=\"#plan-of-attack\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ol>\n<li>Move all vm disks
    to individual datasets on the NAS</li>\n<li>Backup docker data... not sure how
    well this will work, maybe just start over?</li>\n<li>Clean up Ansible playbooks
    on the user side of things - stick with neville vs just using my own name?</li>\n<li>Install
    Ubuntu 20 or 22 on a 2.5&quot; drive that I'll toss in this SSD enclosure (or
    a usb thumb stick?)</li>\n<li>Re-deploy everything with ansible-playbook and configure...</li>\n</ol>\n<h2
    id=\"configuration\">Configuration... <a class=\"header-anchor\" href=\"#configuration\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol start=\"0\">\n<li>THE
    FREAKING NAS -&gt; just import zfs array and configure SMB?</li>\n</ol>\n<p>1.~~
    Nextcloud users and connections.. might be able to just copy the data folder?
    not sure about the database... try spinning it up in the sandbox vm and see if
    stuff is there ~~\n2.~~ *arr suite, media profiles and connections to transmission...
    nothing major~~\n3. transmission - should be deploy and go\n4. ombi and jackett
    should also just work after some config again\n5. <s>traefik should just work</s>\n6.
    <s>try to bring up pi-hole from the vm that's already running</s>\n7. <s>heimdall
    will hopefully just be copying the data folder from the existind docker one'</s>\n8.~~
    booksonic can be reconfigured easily~~\n9. <s>portainer... hopefully just copying
    data folder over?</s>\n10. <s>littlelink</s>, small-group-notes, and blog (at
    home) will need manually re-deployed once Ubuntu is installed bare-metal</p>\n<h2
    id=\"big-big-big-todos\">BIG BIG BIG TODOS <a class=\"header-anchor\" href=\"#big-big-big-todos\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol>\n<li>\n<p>Sanoid/syncoid!
    Get snapshots going and backups configured with on prem TrueNAS</p>\n</li>\n<li>\n<p>Wireguard
    setup on DA.</p>\n</li>\n<li>\n<p>network share on printer for paperless\n<s>4.
    update peperless in ansible-nas</s></p>\n</li>\n<li>\n<p><s>Just deploy paperless
    manually... monitor/manage with portainer</s></p>\n</li>\n<li>\n<p>booksonic not
    seeing audiobooks/podcasts</p>\n</li>\n<li>\n<p>need a smb user to map nas/documents
    to the printer for paperless</p>\n</li>\n<li>\n<p>wireguard setup now on kps phone,
    desktop, server (and backup truenas?), and dad's pi</p>\n</li>\n<li>\n<p><s>verify
    lan services work</s></p>\n</li>\n<li>\n<p><s>Tdar so Jellyfin can work better</s></p>\n</li>\n</ol>\n<p>Snapshot
    business might be cause of all the docker containers and docker using\nZFS backend...
    take everything down and try removing</p>\n<ol>\n<li>file browser - currently
    I just one-clicked in portainer, I want to make a stack with my own config file
    which I'll rip from techno tip and then add my traefik lables too</li>\n</ol>\n<p>Forget
    filebrowser - going to just use Nextcloud for how it's supposed to be used.\n3.
    Need to organize those files in nextcloud</p>\n<h2 id=\"check-this----ran-as-cp-utility-in-tmux-window-no-progress-bars-or-anything-its-in-ansible-nas-session---window-3\">CHECK
    THIS -&gt;  ran as 'cp' utility in tmux window, no progress bars or anything.
    it's in ansible-nas session -&gt; window 3 <a class=\"header-anchor\" href=\"#check-this----ran-as-cp-utility-in-tmux-window-no-progress-bars-or-anything-its-in-ansible-nas-session---window-3\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Olivet bible stuff going
    to /tmp/olivet/ -&gt; will move this to nextcloud, ideally by the app via appimage
    so that the db updates and I don't have to run that occ script\nI wnat to organize
    &quot;home&quot; still in nextcloud</p>\n<p>setup Sanoid</p>\n<p>clean up bitwarden\nlearn
    nextcloud sharing -&gt; maybe just give a link to grandma?\nrest of todos -&gt;
    document db and sanoid + zfs.rent</p>\n<p>Check on mom's will\ndo media thing
    for church - split vocals on mp3/4</p>\n<p>permission-data playbook changes everything
    to ansible-nas:ansible-nas but then samba task will re-permission some stuff to
    root:users... this looks fine\nI had to add <code>group</code> to the samba config
    in my playbook to get user auth to work with samba\nThis isn't fully working...
    it works from cli but my python process can't write to a folder in dump after
    777.... need to learn more?\nSo I can make a file after adding the ansible-nas
    group to config, but I still cannot make a directory on the smb mount...</p>\n<p>ADDING
    <code>inherit permission = yes</code> under <code>[global]</code> in the smb.conf
    worked!</p>\n<p>still not working from printer...\nI think what I want is to setup
    2 scan options - single docs right to paperless, or combined scans to dump, then
    manually split and send to paperless</p>\n\n    </section>\n</article>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Home-Server-Refactor</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"My current homelab setup is not great
    but it works... Proxmox on PowerEdge R610 I boot off an SD card and have 1 SSD
    and 5 HDDs configured as a JBOD array using\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Home-Server-Refactor
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://pype.dev//media/home-server-refactor.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/home-server-refactor\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Home-Server-Refactor | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"My current homelab setup is not great but it works... Proxmox on PowerEdge
    R610 I boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array
    using\" />\n<meta name=\"twitter:image\" content=\"https://pype.dev//media/home-server-refactor.png\"
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
    Content is handled by the password protection plugin -->\n    <p>My current homelab
    setup is not great but it works...</p>\n<h1 id=\"proxmox-on-poweredge-r610\">Proxmox
    on PowerEdge R610 <a class=\"header-anchor\" href=\"#proxmox-on-poweredge-r610\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I boot off an SD card
    and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700 SAS controller.\nI
    cannot boot from a disk using this controller and I can't get the firmware configured
    in a way to allow it.\nSo I have 1 SSD as a ZFS array that I've been putting my
    VM images on, and the 5 HDDs are passed through to a TrueNAS VM where I handle
    all the ZFS stuff there... kind of meta because I then attached those drives to
    Proxmox as a CIFS share.</p>\n<h1 id=\"truenas-on-dedicated-box\">TrueNAS on dedicated
    box <a class=\"header-anchor\" href=\"#truenas-on-dedicated-box\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I have an on-prem backup
    that is just an old desktop running TrueNAS\nI regularly backup the 5 disk RAIDZ2
    array from my Proxmox host (managed by a TrueNAS VM) to this backup box</p>\n<p>Currently
    there is nothing else running on this machine since it's my &quot;backup&quot;</p>\n<h1
    id=\"jellyfin\">Jellyfin <a class=\"header-anchor\" href=\"#jellyfin\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I was HWA for Jellyfin,
    but hardware passthrough on the R610 is finicky or broken so Jellyfin is running
    on an Ubuntu host.</p>\n<p>I could put UBuntu on the R610 and give up &quot;true
    virtualization&quot;. Then I'd manage the SMB share myself.\nIf I do that then
    I would get rid of &quot;users&quot; I think, ie. basically forgo least-priviledges
    since I'm not sure how hard that is to manage.</p>\n<p>On the other hand, direct
    access to the smb config might make it easier?</p>\n<p>I have the media array
    on Jellyfin box setup as NFS which was really easy with ZFS... I think SMB would
    be just as easy.</p>\n<h1 id=\"plan-of-attack\">Plan of attack... <a class=\"header-anchor\"
    href=\"#plan-of-attack\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<ol>\n<li>Move all vm disks
    to individual datasets on the NAS</li>\n<li>Backup docker data... not sure how
    well this will work, maybe just start over?</li>\n<li>Clean up Ansible playbooks
    on the user side of things - stick with neville vs just using my own name?</li>\n<li>Install
    Ubuntu 20 or 22 on a 2.5&quot; drive that I'll toss in this SSD enclosure (or
    a usb thumb stick?)</li>\n<li>Re-deploy everything with ansible-playbook and configure...</li>\n</ol>\n<h2
    id=\"configuration\">Configuration... <a class=\"header-anchor\" href=\"#configuration\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol start=\"0\">\n<li>THE
    FREAKING NAS -&gt; just import zfs array and configure SMB?</li>\n</ol>\n<p>1.~~
    Nextcloud users and connections.. might be able to just copy the data folder?
    not sure about the database... try spinning it up in the sandbox vm and see if
    stuff is there ~~\n2.~~ *arr suite, media profiles and connections to transmission...
    nothing major~~\n3. transmission - should be deploy and go\n4. ombi and jackett
    should also just work after some config again\n5. <s>traefik should just work</s>\n6.
    <s>try to bring up pi-hole from the vm that's already running</s>\n7. <s>heimdall
    will hopefully just be copying the data folder from the existind docker one'</s>\n8.~~
    booksonic can be reconfigured easily~~\n9. <s>portainer... hopefully just copying
    data folder over?</s>\n10. <s>littlelink</s>, small-group-notes, and blog (at
    home) will need manually re-deployed once Ubuntu is installed bare-metal</p>\n<h2
    id=\"big-big-big-todos\">BIG BIG BIG TODOS <a class=\"header-anchor\" href=\"#big-big-big-todos\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol>\n<li>\n<p>Sanoid/syncoid!
    Get snapshots going and backups configured with on prem TrueNAS</p>\n</li>\n<li>\n<p>Wireguard
    setup on DA.</p>\n</li>\n<li>\n<p>network share on printer for paperless\n<s>4.
    update peperless in ansible-nas</s></p>\n</li>\n<li>\n<p><s>Just deploy paperless
    manually... monitor/manage with portainer</s></p>\n</li>\n<li>\n<p>booksonic not
    seeing audiobooks/podcasts</p>\n</li>\n<li>\n<p>need a smb user to map nas/documents
    to the printer for paperless</p>\n</li>\n<li>\n<p>wireguard setup now on kps phone,
    desktop, server (and backup truenas?), and dad's pi</p>\n</li>\n<li>\n<p><s>verify
    lan services work</s></p>\n</li>\n<li>\n<p><s>Tdar so Jellyfin can work better</s></p>\n</li>\n</ol>\n<p>Snapshot
    business might be cause of all the docker containers and docker using\nZFS backend...
    take everything down and try removing</p>\n<ol>\n<li>file browser - currently
    I just one-clicked in portainer, I want to make a stack with my own config file
    which I'll rip from techno tip and then add my traefik lables too</li>\n</ol>\n<p>Forget
    filebrowser - going to just use Nextcloud for how it's supposed to be used.\n3.
    Need to organize those files in nextcloud</p>\n<h2 id=\"check-this----ran-as-cp-utility-in-tmux-window-no-progress-bars-or-anything-its-in-ansible-nas-session---window-3\">CHECK
    THIS -&gt;  ran as 'cp' utility in tmux window, no progress bars or anything.
    it's in ansible-nas session -&gt; window 3 <a class=\"header-anchor\" href=\"#check-this----ran-as-cp-utility-in-tmux-window-no-progress-bars-or-anything-its-in-ansible-nas-session---window-3\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Olivet bible stuff going
    to /tmp/olivet/ -&gt; will move this to nextcloud, ideally by the app via appimage
    so that the db updates and I don't have to run that occ script\nI wnat to organize
    &quot;home&quot; still in nextcloud</p>\n<p>setup Sanoid</p>\n<p>clean up bitwarden\nlearn
    nextcloud sharing -&gt; maybe just give a link to grandma?\nrest of todos -&gt;
    document db and sanoid + zfs.rent</p>\n<p>Check on mom's will\ndo media thing
    for church - split vocals on mp3/4</p>\n<p>permission-data playbook changes everything
    to ansible-nas:ansible-nas but then samba task will re-permission some stuff to
    root:users... this looks fine\nI had to add <code>group</code> to the samba config
    in my playbook to get user auth to work with samba\nThis isn't fully working...
    it works from cli but my python process can't write to a folder in dump after
    777.... need to learn more?\nSo I can make a file after adding the ansible-nas
    group to config, but I still cannot make a directory on the smb mount...</p>\n<p>ADDING
    <code>inherit permission = yes</code> under <code>[global]</code> in the smb.conf
    worked!</p>\n<p>still not working from printer...\nI think what I want is to setup
    2 scan options - single docs right to paperless, or combined scans to dump, then
    manually split and send to paperless</p>\n\n        </div>\n    </main>\n\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['blog', 'tech']\ntitle: Home-Server-Refactor\ndate:
    2022-04-10T00:00:00\npublished: False\ncover: \"media/home-server-refactor.png\"\n\n---\n\nMy
    current homelab setup is not great but it works...\n\n# Proxmox on PowerEdge R610\n\nI
    boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array using
    a Dell H700 SAS controller.\nI cannot boot from a disk using this controller and
    I can't get the firmware configured in a way to allow it.\nSo I have 1 SSD as
    a ZFS array that I've been putting my VM images on, and the 5 HDDs are passed
    through to a TrueNAS VM where I handle all the ZFS stuff there... kind of meta
    because I then attached those drives to Proxmox as a CIFS share.\n\n# TrueNAS
    on dedicated box\n\nI have an on-prem backup that is just an old desktop running
    TrueNAS\nI regularly backup the 5 disk RAIDZ2 array from my Proxmox host (managed
    by a TrueNAS VM) to this backup box\n\nCurrently there is nothing else running
    on this machine since it's my \"backup\"\n\n# Jellyfin\n\nI was HWA for Jellyfin,
    but hardware passthrough on the R610 is finicky or broken so Jellyfin is running
    on an Ubuntu host.\n\nI could put UBuntu on the R610 and give up \"true virtualization\".
    Then I'd manage the SMB share myself.\nIf I do that then I would get rid of \"users\"
    I think, ie. basically forgo least-priviledges since I'm not sure how hard that
    is to manage.\n\nOn the other hand, direct access to the smb config might make
    it easier?\n\nI have the media array on Jellyfin box setup as NFS which was really
    easy with ZFS... I think SMB would be just as easy.\n\n# Plan of attack...\n\n1.
    Move all vm disks to individual datasets on the NAS \n2. Backup docker data...
    not sure how well this will work, maybe just start over?\n3. Clean up Ansible
    playbooks on the user side of things - stick with neville vs just using my own
    name?\n4. Install Ubuntu 20 or 22 on a 2.5\" drive that I'll toss in this SSD
    enclosure (or a usb thumb stick?)\n5. Re-deploy everything with ansible-playbook
    and configure...\n\n## Configuration...\n\n0. THE FREAKING NAS -> just import
    zfs array and configure SMB?\n\n1.~~ Nextcloud users and connections.. might be
    able to just copy the data folder? not sure about the database... try spinning
    it up in the sandbox vm and see if stuff is there ~~\n2.~~ *arr suite, media profiles
    and connections to transmission... nothing major~~\n3. transmission - should be
    deploy and go\n4. ombi and jackett should also just work after some config again\n5.
    ~~traefik should just work~~\n6. ~~try to bring up pi-hole from the vm that's
    already running~~\n7. ~~heimdall will hopefully just be copying the data folder
    from the existind docker one'~~\n8.~~ booksonic can be reconfigured easily~~\n9.
    ~~portainer... hopefully just copying data folder over?~~\n10. ~~littlelink~~,
    small-group-notes, and blog (at home) will need manually re-deployed once Ubuntu
    is installed bare-metal\n\n## BIG BIG BIG TODOS\n1. Sanoid/syncoid! Get snapshots
    going and backups configured with on prem TrueNAS\n2. Wireguard setup on DA.\n3.
    network share on printer for paperless\n~~4. update peperless in ansible-nas~~\n4.
    ~~Just deploy paperless manually... monitor/manage with portainer~~\n5. booksonic
    not seeing audiobooks/podcasts\n\n1. need a smb user to map nas/documents to the
    printer for paperless\n3. wireguard setup now on kps phone, desktop, server (and
    backup truenas?), and dad's pi\n4. ~~verify lan services work~~\n5. ~~Tdar so
    Jellyfin can work better~~\n\nSnapshot business might be cause of all the docker
    containers and docker using\nZFS backend... take everything down and try removing\n\n1.
    file browser - currently I just one-clicked in portainer, I want to make a stack
    with my own config file which I'll rip from techno tip and then add my traefik
    lables too\n\nForget filebrowser - going to just use Nextcloud for how it's supposed
    to be used.\n3. Need to organize those files in nextcloud\n## CHECK THIS ->  ran
    as 'cp' utility in tmux window, no progress bars or anything. it's in ansible-nas
    session -> window 3\nOlivet bible stuff going to /tmp/olivet/ -> will move this
    to nextcloud, ideally by the app via appimage so that the db updates and I don't
    have to run that occ script\nI wnat to organize \"home\" still in nextcloud \n\nsetup
    Sanoid\n\n\nclean up bitwarden \nlearn nextcloud sharing -> maybe just give a
    link to grandma?\nrest of todos -> document db and sanoid + zfs.rent\n\nCheck
    on mom's will\ndo media thing for church - split vocals on mp3/4\n\npermission-data
    playbook changes everything to ansible-nas:ansible-nas but then samba task will
    re-permission some stuff to root:users... this looks fine\nI had to add `group`
    to the samba config in my playbook to get user auth to work with samba\nThis isn't
    fully working... it works from cli but my python process can't write to a folder
    in dump after 777.... need to learn more?\nSo I can make a file after adding the
    ansible-nas group to config, but I still cannot make a directory on the smb mount...\n\nADDING
    `inherit permission = yes` under `[global]` in the smb.conf worked!\n\nstill not
    working from printer...\nI think what I want is to setup 2 scan options - single
    docs right to paperless, or combined scans to dump, then manually split and send
    to paperless\n"
published: false
slug: home-server-refactor
title: Home-Server-Refactor


---

My current homelab setup is not great but it works...

# Proxmox on PowerEdge R610

I boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700 SAS controller.
I cannot boot from a disk using this controller and I can't get the firmware configured in a way to allow it.
So I have 1 SSD as a ZFS array that I've been putting my VM images on, and the 5 HDDs are passed through to a TrueNAS VM where I handle all the ZFS stuff there... kind of meta because I then attached those drives to Proxmox as a CIFS share.

# TrueNAS on dedicated box

I have an on-prem backup that is just an old desktop running TrueNAS
I regularly backup the 5 disk RAIDZ2 array from my Proxmox host (managed by a TrueNAS VM) to this backup box

Currently there is nothing else running on this machine since it's my "backup"

# Jellyfin

I was HWA for Jellyfin, but hardware passthrough on the R610 is finicky or broken so Jellyfin is running on an Ubuntu host.

I could put UBuntu on the R610 and give up "true virtualization". Then I'd manage the SMB share myself.
If I do that then I would get rid of "users" I think, ie. basically forgo least-priviledges since I'm not sure how hard that is to manage.

On the other hand, direct access to the smb config might make it easier?

I have the media array on Jellyfin box setup as NFS which was really easy with ZFS... I think SMB would be just as easy.

# Plan of attack...

1. Move all vm disks to individual datasets on the NAS 
2. Backup docker data... not sure how well this will work, maybe just start over?
3. Clean up Ansible playbooks on the user side of things - stick with neville vs just using my own name?
4. Install Ubuntu 20 or 22 on a 2.5" drive that I'll toss in this SSD enclosure (or a usb thumb stick?)
5. Re-deploy everything with ansible-playbook and configure...

## Configuration...

0. THE FREAKING NAS -> just import zfs array and configure SMB?

1.~~ Nextcloud users and connections.. might be able to just copy the data folder? not sure about the database... try spinning it up in the sandbox vm and see if stuff is there ~~
2.~~ *arr suite, media profiles and connections to transmission... nothing major~~
3. transmission - should be deploy and go
4. ombi and jackett should also just work after some config again
5. ~~traefik should just work~~
6. ~~try to bring up pi-hole from the vm that's already running~~
7. ~~heimdall will hopefully just be copying the data folder from the existind docker one'~~
8.~~ booksonic can be reconfigured easily~~
9. ~~portainer... hopefully just copying data folder over?~~
10. ~~littlelink~~, small-group-notes, and blog (at home) will need manually re-deployed once Ubuntu is installed bare-metal

## BIG BIG BIG TODOS
1. Sanoid/syncoid! Get snapshots going and backups configured with on prem TrueNAS
2. Wireguard setup on DA.
3. network share on printer for paperless
~~4. update peperless in ansible-nas~~
4. ~~Just deploy paperless manually... monitor/manage with portainer~~
5. booksonic not seeing audiobooks/podcasts

1. need a smb user to map nas/documents to the printer for paperless
3. wireguard setup now on kps phone, desktop, server (and backup truenas?), and dad's pi
4. ~~verify lan services work~~
5. ~~Tdar so Jellyfin can work better~~

Snapshot business might be cause of all the docker containers and docker using
ZFS backend... take everything down and try removing

1. file browser - currently I just one-clicked in portainer, I want to make a stack with my own config file which I'll rip from techno tip and then add my traefik lables too

Forget filebrowser - going to just use Nextcloud for how it's supposed to be used.
3. Need to organize those files in nextcloud
## CHECK THIS ->  ran as 'cp' utility in tmux window, no progress bars or anything. it's in ansible-nas session -> window 3
Olivet bible stuff going to /tmp/olivet/ -> will move this to nextcloud, ideally by the app via appimage so that the db updates and I don't have to run that occ script
I wnat to organize "home" still in nextcloud 

setup Sanoid


clean up bitwarden 
learn nextcloud sharing -> maybe just give a link to grandma?
rest of todos -> document db and sanoid + zfs.rent

Check on mom's will
do media thing for church - split vocals on mp3/4

permission-data playbook changes everything to ansible-nas:ansible-nas but then samba task will re-permission some stuff to root:users... this looks fine
I had to add `group` to the samba config in my playbook to get user auth to work with samba
This isn't fully working... it works from cli but my python process can't write to a folder in dump after 777.... need to learn more?
So I can make a file after adding the ansible-nas group to config, but I still cannot make a directory on the smb mount...

ADDING `inherit permission = yes` under `[global]` in the smb.conf worked!

still not working from printer...
I think what I want is to setup 2 scan options - single docs right to paperless, or combined scans to dump, then manually split and send to paperless