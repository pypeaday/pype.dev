---
content: "## False Sense of Security\n\nI thought I had backups handled... can you
  imagine how the rest of this post is\ngoing to go with that intro?\n\nTo be fair,
  I do have backups figured out on my NAS - simple ZFS +\nsanoid/syncoid + replica
  pool + off-site backup with simple restore pathways.\nHowever, my desktop has been
  another story entirely. My desktop OS didn't\nsupport ZFS when I started checking
  it out, and I spent weeks thinking through\nhow I would backup my HOME directory
  and projects mostly. I landed on a\nsolution that I did validate once, but it fell
  off my radar and lo' and behold\nthat was problematic...\n\nSo that backup was based
  on restic for my home directory, but it was lazy. I\nverified it one time but I
  had built it with ai, thought I understood the\nrestic repo part, and then promptly
  moved on with my life never buttoning it\nall up. That home directory backup got
  too big for where I was going to end up\nrestoring it. My desktop system was installed
  on a 4 TB NVMe drive and due to\nthe circumstances spawning this blog post I was
  gonna have to drop to a 500 GB\nboot drive with some extra disks as the storage
  layer. Overall it looked like:\n\n- A 4 TB SSD that was going bad - old OS\n- A
  500 GB SSD, that was going to be my new operating system boot disk\n- A 2 TB SSD
  that was originally going to be this external storage volume\n  anyways but I never
  set it up because the version of Aurora I was running\n  didn't have ZFS, I was
  married to the idea of using ZFS, so I never ended up\n  taking advantage of the
  space. However it was moot to me because my boot drive\n  was 4 TB, high quality
  drive, so I was \"just sure\" I didn't need it.\n- AND a 4 TB rust disk as well,
  which was already a ZFS pool, left over from a\n  previous desktop configuration,
  and admittedly I had forgotten it was even in the system.\n\n## The Storm\n\nIf
  it wasn't clear the problem is that my super-nice high-speed 4TB NVMe drive\nwas
  going bad, like really bad. Eventually my OS stopped booting, it was even\ndifficult
  to live-boot from any other ISO due to, I think ultimately, that disk\ncausing such
  extreme latency in the start-up processes that they just failed.\nSo I quickly found
  myself with little-to-no access to my primary desktop's\ndata...\n\n## Where It
  Went Wrong\n\nWhat I did is I live booted into an Ubuntu server environment (which
  took blood\nsweat and tears to successfully get into), mounted my home directory
  from the 4 TB SSD, and\ntried to continue my restic backup to my NAS, like an idiot.
  But at the same\ntime I also tried to prune it by only backing up a few projects
  because I\nwas getting worried about time. This was the first primary mistake -
  trying to\nmuck with my backup script under duress.\n\nThen over the course of the
  whole thing it ended up taking over a week to solve\nthis when it could've been
  2-3 days. So say it with me kids - \"Don't make\ndecisions under duress\"\n\n##
  Climbing Out\n\nI downloaded opencode and had it help me write the right excludes
  syntax in my\nrestic backup script and got it back up going. That went ok but opencode
  agents\nhad no historical context for why anything was the way it was, and frankly
  an\nagent would've been misled thinking the backup solution was much more solid\nthan
  it was due to how I documented it.\n\nAgents also miss things... in my chat sessions
  it knew about the other 2\navailable disks on the desktop system, I could have done
  a fresh backup to the 4 TB\nspinning rust disk no problem: install zfs, mount the
  pool, change target of\nrestic, run full... that would've been beautifully simple.
  But instead I\ntrimmed it down and backed not-everything up to the NAS over the
  network, and\nto a different backup target nonetheless... SMH.\n\nAs I started to
  consider which OS I was going to go with next I failed to\ninstall Pop_OS! or Ubuntu
  onto the new disc... Then I tried Omarchy and the\ninstall script just looped. So,
  I reinstalled Aurora onto the new 500 GB disk\nand then quickly realized I don't
  have Firefox tabs, my SSH keys are in that\nrestic backup, my ssh config, api keys
  in hidden files.... Everything is in\nthat restic backup... The backup that's too
  big to restore to my new boot drive.\n\nBut you know what I have? That 2 terabyte
  disk mounted just fine as a\nZFS dataset. And I could mount the 4 TB rust disk with
  zfs as well because this\nversion of Aurora has zfs working flawlessly!\n\n## Hindsight\n\nWhat
  I should've done is so simple... While in that ubuntu live environment I\nshould've
  just either updated restic to be a local backup to the 4 TB rust\ndisk, or rsync'd
  my home directory to it plain and simple... I got all in my\nhead about not backing
  up python venvs, node_modules, etc. that I didn't think\nto just basically carbon
  copy it all to a healthy disk and then prune it later.\nThen I could've synced everything
  back over that I needed to the new Desktop's\n$HOME and then scheduled the rsync
  or restic again to that locally mounted disk.\n\n## The Detail I Left Out\n\nThe
  keen reader might stop to think... why not just mount the old 4TB disk and\ncopy
  what you need to your new desktop? And that's a prudent question...\nHowever, in
  order to get anything installed I had to physically remove the 4TB\nSSD from the
  motherboard, which was basically a full PC tear-down. From there I\nwas able to
  at least boot in and out of iso's like you'd otherwise expect, and\nI have a USB/NVMe
  adapter so I planned to mount the old drive and copy things over from\nthere...
  But sadly... it won't mount. it's dead-dead and it appears that\nanything I didn't
  save in my days-long-panicked-state is just. gone.\n\nI feel pretty stupid to have
  not taken advantage of the 2 available disks local\nto the machine, to have naively
  copied stuff over and dealt with the\norganization later once my OS was back up.
  I tried to be smart and efficient\nand ended up wasting so much time and losing
  quite a lot of \"stuff\"... ideas,\nblog posts that I never committed, etc.\n\n##
  Current Status\n\nSo a few lessons...\n\n1. untested backups are not backups\n2.
  false backups might be worse than none, although I did at least save a few things
  so maybe the jury is out here\n3. making decisions while stressed out will lead
  to missing obviously better pathways... slow down, talk it out\n\nAs for my current
  status - I'm working on [[desktop-setup-2026]] and recovering what I can from my
  haphazard'd rsyncs in the live ubuntu env I got into. I'm also setting up a new
  Linux laptop at work at the same time so maybe I'll hve some workflow changes to
  write about in the future. For now, it's nice to be forced to accept that not every
  idea was that important, the good stuff will come back around, and ultimately computers
  and shit are just things, they're not life."
date: 2026-05-13
description: 'False Sense of Security I thought I had backups handled... can you imagine
  how the rest of this post is

  going to go with that intro? To be fair, I do have backu'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Panicking Led to
    Losing My Desktop</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"False Sense of Security I thought I had backups handled... can you imagine
    how the rest of this post is\ngoing to go with that intro? To be fair, I do have
    backu\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Panicking Led to Losing My Desktop | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/panicking-led-to-losing-my-desktop\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Panicking Led to Losing My Desktop | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"False Sense of Security I thought I had backups handled... can you imagine
    how the rest of this post is\ngoing to go with that intro? To be fair, I do have
    backu\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/panicking-led-to-losing-my-desktop</span>\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Panicking Led to Losing My Desktop</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-13\">\n
    \           May 13, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/backup/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #backup\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"false-sense-of-security\">False
    Sense of Security <a class=\"header-anchor\" href=\"#false-sense-of-security\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I thought I had backups
    handled... can you imagine how the rest of this post is\ngoing to go with that
    intro?</p>\n<p>To be fair, I do have backups figured out on my NAS - simple ZFS
    +\nsanoid/syncoid + replica pool + off-site backup with simple restore pathways.\nHowever,
    my desktop has been another story entirely. My desktop OS didn't\nsupport ZFS
    when I started checking it out, and I spent weeks thinking through\nhow I would
    backup my HOME directory and projects mostly. I landed on a\nsolution that I did
    validate once, but it fell off my radar and lo' and behold\nthat was problematic...</p>\n<p>So
    that backup was based on restic for my home directory, but it was lazy. I\nverified
    it one time but I had built it with ai, thought I understood the\nrestic repo
    part, and then promptly moved on with my life never buttoning it\nall up. That
    home directory backup got too big for where I was going to end up\nrestoring it.
    My desktop system was installed on a 4 TB NVMe drive and due to\nthe circumstances
    spawning this blog post I was gonna have to drop to a 500 GB\nboot drive with
    some extra disks as the storage layer. Overall it looked like:</p>\n<ul>\n<li>A
    4 TB SSD that was going bad - old OS</li>\n<li>A 500 GB SSD, that was going to
    be my new operating system boot disk</li>\n<li>A 2 TB SSD that was originally
    going to be this external storage volume\nanyways but I never set it up because
    the version of Aurora I was running\ndidn't have ZFS, I was married to the idea
    of using ZFS, so I never ended up\ntaking advantage of the space. However it was
    moot to me because my boot drive\nwas 4 TB, high quality drive, so I was &quot;just
    sure&quot; I didn't need it.</li>\n<li>AND a 4 TB rust disk as well, which was
    already a ZFS pool, left over from a\nprevious desktop configuration, and admittedly
    I had forgotten it was even in the system.</li>\n</ul>\n<h2 id=\"the-storm\">The
    Storm <a class=\"header-anchor\" href=\"#the-storm\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If it wasn't clear the
    problem is that my super-nice high-speed 4TB NVMe drive\nwas going bad, like really
    bad. Eventually my OS stopped booting, it was even\ndifficult to live-boot from
    any other ISO due to, I think ultimately, that disk\ncausing such extreme latency
    in the start-up processes that they just failed.\nSo I quickly found myself with
    little-to-no access to my primary desktop's\ndata...</p>\n<h2 id=\"where-it-went-wrong\">Where
    It Went Wrong <a class=\"header-anchor\" href=\"#where-it-went-wrong\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What I did is I live
    booted into an Ubuntu server environment (which took blood\nsweat and tears to
    successfully get into), mounted my home directory from the 4 TB SSD, and\ntried
    to continue my restic backup to my NAS, like an idiot. But at the same\ntime I
    also tried to prune it by only backing up a few projects because I\nwas getting
    worried about time. This was the first primary mistake - trying to\nmuck with
    my backup script under duress.</p>\n<p>Then over the course of the whole thing
    it ended up taking over a week to solve\nthis when it could've been 2-3 days.
    So say it with me kids - &quot;Don't make\ndecisions under duress&quot;</p>\n<h2
    id=\"climbing-out\">Climbing Out <a class=\"header-anchor\" href=\"#climbing-out\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I downloaded opencode
    and had it help me write the right excludes syntax in my\nrestic backup script
    and got it back up going. That went ok but opencode agents\nhad no historical
    context for why anything was the way it was, and frankly an\nagent would've been
    misled thinking the backup solution was much more solid\nthan it was due to how
    I documented it.</p>\n<p>Agents also miss things... in my chat sessions it knew
    about the other 2\navailable disks on the desktop system, I could have done a
    fresh backup to the 4 TB\nspinning rust disk no problem: install zfs, mount the
    pool, change target of\nrestic, run full... that would've been beautifully simple.
    But instead I\ntrimmed it down and backed not-everything up to the NAS over the
    network, and\nto a different backup target nonetheless... SMH.</p>\n<p>As I started
    to consider which OS I was going to go with next I failed to\ninstall Pop_OS!
    or Ubuntu onto the new disc... Then I tried Omarchy and the\ninstall script just
    looped. So, I reinstalled Aurora onto the new 500 GB disk\nand then quickly realized
    I don't have Firefox tabs, my SSH keys are in that\nrestic backup, my ssh config,
    api keys in hidden files.... Everything is in\nthat restic backup... The backup
    that's too big to restore to my new boot drive.</p>\n<p>But you know what I have?
    That 2 terabyte disk mounted just fine as a\nZFS dataset. And I could mount the
    4 TB rust disk with zfs as well because this\nversion of Aurora has zfs working
    flawlessly!</p>\n<h2 id=\"hindsight\">Hindsight <a class=\"header-anchor\" href=\"#hindsight\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What I should've done
    is so simple... While in that ubuntu live environment I\nshould've just either
    updated restic to be a local backup to the 4 TB rust\ndisk, or rsync'd my home
    directory to it plain and simple... I got all in my\nhead about not backing up
    python venvs, node_modules, etc. that I didn't think\nto just basically carbon
    copy it all to a healthy disk and then prune it later.\nThen I could've synced
    everything back over that I needed to the new Desktop's\n$HOME and then scheduled
    the rsync or restic again to that locally mounted disk.</p>\n<h2 id=\"the-detail-i-left-out\">The
    Detail I Left Out <a class=\"header-anchor\" href=\"#the-detail-i-left-out\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The keen reader might
    stop to think... why not just mount the old 4TB disk and\ncopy what you need to
    your new desktop? And that's a prudent question...\nHowever, in order to get anything
    installed I had to physically remove the 4TB\nSSD from the motherboard, which
    was basically a full PC tear-down. From there I\nwas able to at least boot in
    and out of iso's like you'd otherwise expect, and\nI have a USB/NVMe adapter so
    I planned to mount the old drive and copy things over from\nthere... But sadly...
    it won't mount. it's dead-dead and it appears that\nanything I didn't save in
    my days-long-panicked-state is just. gone.</p>\n<p>I feel pretty stupid to have
    not taken advantage of the 2 available disks local\nto the machine, to have naively
    copied stuff over and dealt with the\norganization later once my OS was back up.
    I tried to be smart and efficient\nand ended up wasting so much time and losing
    quite a lot of &quot;stuff&quot;... ideas,\nblog posts that I never committed,
    etc.</p>\n<h2 id=\"current-status\">Current Status <a class=\"header-anchor\"
    href=\"#current-status\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So a few lessons...</p>\n<ol>\n<li>untested
    backups are not backups</li>\n<li>false backups might be worse than none, although
    I did at least save a few things so maybe the jury is out here</li>\n<li>making
    decisions while stressed out will lead to missing obviously better pathways...
    slow down, talk it out</li>\n</ol>\n<p>As for my current status - I'm working
    on <a class=\"wikilink\" href=\"/desktop-setup-2026\">desktop-setup-2026</a> and
    recovering what I can from my haphazard'd rsyncs in the live ubuntu env I got
    into. I'm also setting up a new Linux laptop at work at the same time so maybe
    I'll hve some workflow changes to write about in the future. For now, it's nice
    to be forced to accept that not every idea was that important, the good stuff
    will come back around, and ultimately computers and shit are just things, they're
    not life.</p>\n\n        </section>\n    </article>\n</section>        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Panicking Led to Losing
    My Desktop</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"False Sense of Security
    I thought I had backups handled... can you imagine how the rest of this post is\ngoing
    to go with that intro? To be fair, I do have backu\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Panicking Led to Losing My Desktop | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/panicking-led-to-losing-my-desktop\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Panicking Led to Losing My Desktop | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"False Sense of Security I thought I had backups handled... can you imagine
    how the rest of this post is\ngoing to go with that intro? To be fair, I do have
    backu\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Panicking Led to Losing My Desktop</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-13\">\n
    \           May 13, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/backup/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #backup\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Panicking Led to Losing My Desktop</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-13\">\n
    \           May 13, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/backup/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #backup\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"false-sense-of-security\">False
    Sense of Security <a class=\"header-anchor\" href=\"#false-sense-of-security\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I thought I had backups
    handled... can you imagine how the rest of this post is\ngoing to go with that
    intro?</p>\n<p>To be fair, I do have backups figured out on my NAS - simple ZFS
    +\nsanoid/syncoid + replica pool + off-site backup with simple restore pathways.\nHowever,
    my desktop has been another story entirely. My desktop OS didn't\nsupport ZFS
    when I started checking it out, and I spent weeks thinking through\nhow I would
    backup my HOME directory and projects mostly. I landed on a\nsolution that I did
    validate once, but it fell off my radar and lo' and behold\nthat was problematic...</p>\n<p>So
    that backup was based on restic for my home directory, but it was lazy. I\nverified
    it one time but I had built it with ai, thought I understood the\nrestic repo
    part, and then promptly moved on with my life never buttoning it\nall up. That
    home directory backup got too big for where I was going to end up\nrestoring it.
    My desktop system was installed on a 4 TB NVMe drive and due to\nthe circumstances
    spawning this blog post I was gonna have to drop to a 500 GB\nboot drive with
    some extra disks as the storage layer. Overall it looked like:</p>\n<ul>\n<li>A
    4 TB SSD that was going bad - old OS</li>\n<li>A 500 GB SSD, that was going to
    be my new operating system boot disk</li>\n<li>A 2 TB SSD that was originally
    going to be this external storage volume\nanyways but I never set it up because
    the version of Aurora I was running\ndidn't have ZFS, I was married to the idea
    of using ZFS, so I never ended up\ntaking advantage of the space. However it was
    moot to me because my boot drive\nwas 4 TB, high quality drive, so I was &quot;just
    sure&quot; I didn't need it.</li>\n<li>AND a 4 TB rust disk as well, which was
    already a ZFS pool, left over from a\nprevious desktop configuration, and admittedly
    I had forgotten it was even in the system.</li>\n</ul>\n<h2 id=\"the-storm\">The
    Storm <a class=\"header-anchor\" href=\"#the-storm\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If it wasn't clear the
    problem is that my super-nice high-speed 4TB NVMe drive\nwas going bad, like really
    bad. Eventually my OS stopped booting, it was even\ndifficult to live-boot from
    any other ISO due to, I think ultimately, that disk\ncausing such extreme latency
    in the start-up processes that they just failed.\nSo I quickly found myself with
    little-to-no access to my primary desktop's\ndata...</p>\n<h2 id=\"where-it-went-wrong\">Where
    It Went Wrong <a class=\"header-anchor\" href=\"#where-it-went-wrong\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What I did is I live
    booted into an Ubuntu server environment (which took blood\nsweat and tears to
    successfully get into), mounted my home directory from the 4 TB SSD, and\ntried
    to continue my restic backup to my NAS, like an idiot. But at the same\ntime I
    also tried to prune it by only backing up a few projects because I\nwas getting
    worried about time. This was the first primary mistake - trying to\nmuck with
    my backup script under duress.</p>\n<p>Then over the course of the whole thing
    it ended up taking over a week to solve\nthis when it could've been 2-3 days.
    So say it with me kids - &quot;Don't make\ndecisions under duress&quot;</p>\n<h2
    id=\"climbing-out\">Climbing Out <a class=\"header-anchor\" href=\"#climbing-out\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I downloaded opencode
    and had it help me write the right excludes syntax in my\nrestic backup script
    and got it back up going. That went ok but opencode agents\nhad no historical
    context for why anything was the way it was, and frankly an\nagent would've been
    misled thinking the backup solution was much more solid\nthan it was due to how
    I documented it.</p>\n<p>Agents also miss things... in my chat sessions it knew
    about the other 2\navailable disks on the desktop system, I could have done a
    fresh backup to the 4 TB\nspinning rust disk no problem: install zfs, mount the
    pool, change target of\nrestic, run full... that would've been beautifully simple.
    But instead I\ntrimmed it down and backed not-everything up to the NAS over the
    network, and\nto a different backup target nonetheless... SMH.</p>\n<p>As I started
    to consider which OS I was going to go with next I failed to\ninstall Pop_OS!
    or Ubuntu onto the new disc... Then I tried Omarchy and the\ninstall script just
    looped. So, I reinstalled Aurora onto the new 500 GB disk\nand then quickly realized
    I don't have Firefox tabs, my SSH keys are in that\nrestic backup, my ssh config,
    api keys in hidden files.... Everything is in\nthat restic backup... The backup
    that's too big to restore to my new boot drive.</p>\n<p>But you know what I have?
    That 2 terabyte disk mounted just fine as a\nZFS dataset. And I could mount the
    4 TB rust disk with zfs as well because this\nversion of Aurora has zfs working
    flawlessly!</p>\n<h2 id=\"hindsight\">Hindsight <a class=\"header-anchor\" href=\"#hindsight\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What I should've done
    is so simple... While in that ubuntu live environment I\nshould've just either
    updated restic to be a local backup to the 4 TB rust\ndisk, or rsync'd my home
    directory to it plain and simple... I got all in my\nhead about not backing up
    python venvs, node_modules, etc. that I didn't think\nto just basically carbon
    copy it all to a healthy disk and then prune it later.\nThen I could've synced
    everything back over that I needed to the new Desktop's\n$HOME and then scheduled
    the rsync or restic again to that locally mounted disk.</p>\n<h2 id=\"the-detail-i-left-out\">The
    Detail I Left Out <a class=\"header-anchor\" href=\"#the-detail-i-left-out\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The keen reader might
    stop to think... why not just mount the old 4TB disk and\ncopy what you need to
    your new desktop? And that's a prudent question...\nHowever, in order to get anything
    installed I had to physically remove the 4TB\nSSD from the motherboard, which
    was basically a full PC tear-down. From there I\nwas able to at least boot in
    and out of iso's like you'd otherwise expect, and\nI have a USB/NVMe adapter so
    I planned to mount the old drive and copy things over from\nthere... But sadly...
    it won't mount. it's dead-dead and it appears that\nanything I didn't save in
    my days-long-panicked-state is just. gone.</p>\n<p>I feel pretty stupid to have
    not taken advantage of the 2 available disks local\nto the machine, to have naively
    copied stuff over and dealt with the\norganization later once my OS was back up.
    I tried to be smart and efficient\nand ended up wasting so much time and losing
    quite a lot of &quot;stuff&quot;... ideas,\nblog posts that I never committed,
    etc.</p>\n<h2 id=\"current-status\">Current Status <a class=\"header-anchor\"
    href=\"#current-status\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So a few lessons...</p>\n<ol>\n<li>untested
    backups are not backups</li>\n<li>false backups might be worse than none, although
    I did at least save a few things so maybe the jury is out here</li>\n<li>making
    decisions while stressed out will lead to missing obviously better pathways...
    slow down, talk it out</li>\n</ol>\n<p>As for my current status - I'm working
    on <a class=\"wikilink\" href=\"/desktop-setup-2026\">desktop-setup-2026</a> and
    recovering what I can from my haphazard'd rsyncs in the live ubuntu env I got
    into. I'm also setting up a new Linux laptop at work at the same time so maybe
    I'll hve some workflow changes to write about in the future. For now, it's nice
    to be forced to accept that not every idea was that important, the good stuff
    will come back around, and ultimately computers and shit are just things, they're
    not life.</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Panicking
    Led to Losing My Desktop</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"False Sense of Security I thought I had backups handled... can you imagine
    how the rest of this post is\ngoing to go with that intro? To be fair, I do have
    backu\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Panicking Led to Losing My Desktop | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/panicking-led-to-losing-my-desktop\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Panicking Led to Losing My Desktop | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"False Sense of Security I thought I had backups handled... can you imagine
    how the rest of this post is\ngoing to go with that intro? To be fair, I do have
    backu\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/panicking-led-to-losing-my-desktop</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"false-sense-of-security\">False
    Sense of Security <a class=\"header-anchor\" href=\"#false-sense-of-security\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I thought I had backups
    handled... can you imagine how the rest of this post is\ngoing to go with that
    intro?</p>\n<p>To be fair, I do have backups figured out on my NAS - simple ZFS
    +\nsanoid/syncoid + replica pool + off-site backup with simple restore pathways.\nHowever,
    my desktop has been another story entirely. My desktop OS didn't\nsupport ZFS
    when I started checking it out, and I spent weeks thinking through\nhow I would
    backup my HOME directory and projects mostly. I landed on a\nsolution that I did
    validate once, but it fell off my radar and lo' and behold\nthat was problematic...</p>\n<p>So
    that backup was based on restic for my home directory, but it was lazy. I\nverified
    it one time but I had built it with ai, thought I understood the\nrestic repo
    part, and then promptly moved on with my life never buttoning it\nall up. That
    home directory backup got too big for where I was going to end up\nrestoring it.
    My desktop system was installed on a 4 TB NVMe drive and due to\nthe circumstances
    spawning this blog post I was gonna have to drop to a 500 GB\nboot drive with
    some extra disks as the storage layer. Overall it looked like:</p>\n<ul>\n<li>A
    4 TB SSD that was going bad - old OS</li>\n<li>A 500 GB SSD, that was going to
    be my new operating system boot disk</li>\n<li>A 2 TB SSD that was originally
    going to be this external storage volume\nanyways but I never set it up because
    the version of Aurora I was running\ndidn't have ZFS, I was married to the idea
    of using ZFS, so I never ended up\ntaking advantage of the space. However it was
    moot to me because my boot drive\nwas 4 TB, high quality drive, so I was &quot;just
    sure&quot; I didn't need it.</li>\n<li>AND a 4 TB rust disk as well, which was
    already a ZFS pool, left over from a\nprevious desktop configuration, and admittedly
    I had forgotten it was even in the system.</li>\n</ul>\n<h2 id=\"the-storm\">The
    Storm <a class=\"header-anchor\" href=\"#the-storm\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If it wasn't clear the
    problem is that my super-nice high-speed 4TB NVMe drive\nwas going bad, like really
    bad. Eventually my OS stopped booting, it was even\ndifficult to live-boot from
    any other ISO due to, I think ultimately, that disk\ncausing such extreme latency
    in the start-up processes that they just failed.\nSo I quickly found myself with
    little-to-no access to my primary desktop's\ndata...</p>\n<h2 id=\"where-it-went-wrong\">Where
    It Went Wrong <a class=\"header-anchor\" href=\"#where-it-went-wrong\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What I did is I live
    booted into an Ubuntu server environment (which took blood\nsweat and tears to
    successfully get into), mounted my home directory from the 4 TB SSD, and\ntried
    to continue my restic backup to my NAS, like an idiot. But at the same\ntime I
    also tried to prune it by only backing up a few projects because I\nwas getting
    worried about time. This was the first primary mistake - trying to\nmuck with
    my backup script under duress.</p>\n<p>Then over the course of the whole thing
    it ended up taking over a week to solve\nthis when it could've been 2-3 days.
    So say it with me kids - &quot;Don't make\ndecisions under duress&quot;</p>\n<h2
    id=\"climbing-out\">Climbing Out <a class=\"header-anchor\" href=\"#climbing-out\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I downloaded opencode
    and had it help me write the right excludes syntax in my\nrestic backup script
    and got it back up going. That went ok but opencode agents\nhad no historical
    context for why anything was the way it was, and frankly an\nagent would've been
    misled thinking the backup solution was much more solid\nthan it was due to how
    I documented it.</p>\n<p>Agents also miss things... in my chat sessions it knew
    about the other 2\navailable disks on the desktop system, I could have done a
    fresh backup to the 4 TB\nspinning rust disk no problem: install zfs, mount the
    pool, change target of\nrestic, run full... that would've been beautifully simple.
    But instead I\ntrimmed it down and backed not-everything up to the NAS over the
    network, and\nto a different backup target nonetheless... SMH.</p>\n<p>As I started
    to consider which OS I was going to go with next I failed to\ninstall Pop_OS!
    or Ubuntu onto the new disc... Then I tried Omarchy and the\ninstall script just
    looped. So, I reinstalled Aurora onto the new 500 GB disk\nand then quickly realized
    I don't have Firefox tabs, my SSH keys are in that\nrestic backup, my ssh config,
    api keys in hidden files.... Everything is in\nthat restic backup... The backup
    that's too big to restore to my new boot drive.</p>\n<p>But you know what I have?
    That 2 terabyte disk mounted just fine as a\nZFS dataset. And I could mount the
    4 TB rust disk with zfs as well because this\nversion of Aurora has zfs working
    flawlessly!</p>\n<h2 id=\"hindsight\">Hindsight <a class=\"header-anchor\" href=\"#hindsight\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What I should've done
    is so simple... While in that ubuntu live environment I\nshould've just either
    updated restic to be a local backup to the 4 TB rust\ndisk, or rsync'd my home
    directory to it plain and simple... I got all in my\nhead about not backing up
    python venvs, node_modules, etc. that I didn't think\nto just basically carbon
    copy it all to a healthy disk and then prune it later.\nThen I could've synced
    everything back over that I needed to the new Desktop's\n$HOME and then scheduled
    the rsync or restic again to that locally mounted disk.</p>\n<h2 id=\"the-detail-i-left-out\">The
    Detail I Left Out <a class=\"header-anchor\" href=\"#the-detail-i-left-out\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The keen reader might
    stop to think... why not just mount the old 4TB disk and\ncopy what you need to
    your new desktop? And that's a prudent question...\nHowever, in order to get anything
    installed I had to physically remove the 4TB\nSSD from the motherboard, which
    was basically a full PC tear-down. From there I\nwas able to at least boot in
    and out of iso's like you'd otherwise expect, and\nI have a USB/NVMe adapter so
    I planned to mount the old drive and copy things over from\nthere... But sadly...
    it won't mount. it's dead-dead and it appears that\nanything I didn't save in
    my days-long-panicked-state is just. gone.</p>\n<p>I feel pretty stupid to have
    not taken advantage of the 2 available disks local\nto the machine, to have naively
    copied stuff over and dealt with the\norganization later once my OS was back up.
    I tried to be smart and efficient\nand ended up wasting so much time and losing
    quite a lot of &quot;stuff&quot;... ideas,\nblog posts that I never committed,
    etc.</p>\n<h2 id=\"current-status\">Current Status <a class=\"header-anchor\"
    href=\"#current-status\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So a few lessons...</p>\n<ol>\n<li>untested
    backups are not backups</li>\n<li>false backups might be worse than none, although
    I did at least save a few things so maybe the jury is out here</li>\n<li>making
    decisions while stressed out will lead to missing obviously better pathways...
    slow down, talk it out</li>\n</ol>\n<p>As for my current status - I'm working
    on <a class=\"wikilink\" href=\"/desktop-setup-2026\">desktop-setup-2026</a> and
    recovering what I can from my haphazard'd rsyncs in the live ubuntu env I got
    into. I'm also setting up a new Linux laptop at work at the same time so maybe
    I'll hve some workflow changes to write about in the future. For now, it's nice
    to be forced to accept that not every idea was that important, the good stuff
    will come back around, and ultimately computers and shit are just things, they're
    not life.</p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2026-05-13 08:24:00\ntemplateKey: blog-post\ntitle: Panicking
    Led to Losing My Desktop\npublished: True\ntags:\n  - backup\n  - tech\n---\n\n##
    False Sense of Security\n\nI thought I had backups handled... can you imagine
    how the rest of this post is\ngoing to go with that intro?\n\nTo be fair, I do
    have backups figured out on my NAS - simple ZFS +\nsanoid/syncoid + replica pool
    + off-site backup with simple restore pathways.\nHowever, my desktop has been
    another story entirely. My desktop OS didn't\nsupport ZFS when I started checking
    it out, and I spent weeks thinking through\nhow I would backup my HOME directory
    and projects mostly. I landed on a\nsolution that I did validate once, but it
    fell off my radar and lo' and behold\nthat was problematic...\n\nSo that backup
    was based on restic for my home directory, but it was lazy. I\nverified it one
    time but I had built it with ai, thought I understood the\nrestic repo part, and
    then promptly moved on with my life never buttoning it\nall up. That home directory
    backup got too big for where I was going to end up\nrestoring it. My desktop system
    was installed on a 4 TB NVMe drive and due to\nthe circumstances spawning this
    blog post I was gonna have to drop to a 500 GB\nboot drive with some extra disks
    as the storage layer. Overall it looked like:\n\n- A 4 TB SSD that was going bad
    - old OS\n- A 500 GB SSD, that was going to be my new operating system boot disk\n-
    A 2 TB SSD that was originally going to be this external storage volume\n  anyways
    but I never set it up because the version of Aurora I was running\n  didn't have
    ZFS, I was married to the idea of using ZFS, so I never ended up\n  taking advantage
    of the space. However it was moot to me because my boot drive\n  was 4 TB, high
    quality drive, so I was \"just sure\" I didn't need it.\n- AND a 4 TB rust disk
    as well, which was already a ZFS pool, left over from a\n  previous desktop configuration,
    and admittedly I had forgotten it was even in the system.\n\n## The Storm\n\nIf
    it wasn't clear the problem is that my super-nice high-speed 4TB NVMe drive\nwas
    going bad, like really bad. Eventually my OS stopped booting, it was even\ndifficult
    to live-boot from any other ISO due to, I think ultimately, that disk\ncausing
    such extreme latency in the start-up processes that they just failed.\nSo I quickly
    found myself with little-to-no access to my primary desktop's\ndata...\n\n## Where
    It Went Wrong\n\nWhat I did is I live booted into an Ubuntu server environment
    (which took blood\nsweat and tears to successfully get into), mounted my home
    directory from the 4 TB SSD, and\ntried to continue my restic backup to my NAS,
    like an idiot. But at the same\ntime I also tried to prune it by only backing
    up a few projects because I\nwas getting worried about time. This was the first
    primary mistake - trying to\nmuck with my backup script under duress.\n\nThen
    over the course of the whole thing it ended up taking over a week to solve\nthis
    when it could've been 2-3 days. So say it with me kids - \"Don't make\ndecisions
    under duress\"\n\n## Climbing Out\n\nI downloaded opencode and had it help me
    write the right excludes syntax in my\nrestic backup script and got it back up
    going. That went ok but opencode agents\nhad no historical context for why anything
    was the way it was, and frankly an\nagent would've been misled thinking the backup
    solution was much more solid\nthan it was due to how I documented it.\n\nAgents
    also miss things... in my chat sessions it knew about the other 2\navailable disks
    on the desktop system, I could have done a fresh backup to the 4 TB\nspinning
    rust disk no problem: install zfs, mount the pool, change target of\nrestic, run
    full... that would've been beautifully simple. But instead I\ntrimmed it down
    and backed not-everything up to the NAS over the network, and\nto a different
    backup target nonetheless... SMH.\n\nAs I started to consider which OS I was going
    to go with next I failed to\ninstall Pop_OS! or Ubuntu onto the new disc... Then
    I tried Omarchy and the\ninstall script just looped. So, I reinstalled Aurora
    onto the new 500 GB disk\nand then quickly realized I don't have Firefox tabs,
    my SSH keys are in that\nrestic backup, my ssh config, api keys in hidden files....
    Everything is in\nthat restic backup... The backup that's too big to restore to
    my new boot drive.\n\nBut you know what I have? That 2 terabyte disk mounted just
    fine as a\nZFS dataset. And I could mount the 4 TB rust disk with zfs as well
    because this\nversion of Aurora has zfs working flawlessly!\n\n## Hindsight\n\nWhat
    I should've done is so simple... While in that ubuntu live environment I\nshould've
    just either updated restic to be a local backup to the 4 TB rust\ndisk, or rsync'd
    my home directory to it plain and simple... I got all in my\nhead about not backing
    up python venvs, node_modules, etc. that I didn't think\nto just basically carbon
    copy it all to a healthy disk and then prune it later.\nThen I could've synced
    everything back over that I needed to the new Desktop's\n$HOME and then scheduled
    the rsync or restic again to that locally mounted disk.\n\n## The Detail I Left
    Out\n\nThe keen reader might stop to think... why not just mount the old 4TB disk
    and\ncopy what you need to your new desktop? And that's a prudent question...\nHowever,
    in order to get anything installed I had to physically remove the 4TB\nSSD from
    the motherboard, which was basically a full PC tear-down. From there I\nwas able
    to at least boot in and out of iso's like you'd otherwise expect, and\nI have
    a USB/NVMe adapter so I planned to mount the old drive and copy things over from\nthere...
    But sadly... it won't mount. it's dead-dead and it appears that\nanything I didn't
    save in my days-long-panicked-state is just. gone.\n\nI feel pretty stupid to
    have not taken advantage of the 2 available disks local\nto the machine, to have
    naively copied stuff over and dealt with the\norganization later once my OS was
    back up. I tried to be smart and efficient\nand ended up wasting so much time
    and losing quite a lot of \"stuff\"... ideas,\nblog posts that I never committed,
    etc.\n\n## Current Status\n\nSo a few lessons...\n\n1. untested backups are not
    backups\n2. false backups might be worse than none, although I did at least save
    a few things so maybe the jury is out here\n3. making decisions while stressed
    out will lead to missing obviously better pathways... slow down, talk it out\n\nAs
    for my current status - I'm working on [[desktop-setup-2026]] and recovering what
    I can from my haphazard'd rsyncs in the live ubuntu env I got into. I'm also setting
    up a new Linux laptop at work at the same time so maybe I'll hve some workflow
    changes to write about in the future. For now, it's nice to be forced to accept
    that not every idea was that important, the good stuff will come back around,
    and ultimately computers and shit are just things, they're not life.\n"
published: true
slug: panicking-led-to-losing-my-desktop
title: Panicking Led to Losing My Desktop


---

## False Sense of Security

I thought I had backups handled... can you imagine how the rest of this post is
going to go with that intro?

To be fair, I do have backups figured out on my NAS - simple ZFS +
sanoid/syncoid + replica pool + off-site backup with simple restore pathways.
However, my desktop has been another story entirely. My desktop OS didn't
support ZFS when I started checking it out, and I spent weeks thinking through
how I would backup my HOME directory and projects mostly. I landed on a
solution that I did validate once, but it fell off my radar and lo' and behold
that was problematic...

So that backup was based on restic for my home directory, but it was lazy. I
verified it one time but I had built it with ai, thought I understood the
restic repo part, and then promptly moved on with my life never buttoning it
all up. That home directory backup got too big for where I was going to end up
restoring it. My desktop system was installed on a 4 TB NVMe drive and due to
the circumstances spawning this blog post I was gonna have to drop to a 500 GB
boot drive with some extra disks as the storage layer. Overall it looked like:

- A 4 TB SSD that was going bad - old OS
- A 500 GB SSD, that was going to be my new operating system boot disk
- A 2 TB SSD that was originally going to be this external storage volume
  anyways but I never set it up because the version of Aurora I was running
  didn't have ZFS, I was married to the idea of using ZFS, so I never ended up
  taking advantage of the space. However it was moot to me because my boot drive
  was 4 TB, high quality drive, so I was "just sure" I didn't need it.
- AND a 4 TB rust disk as well, which was already a ZFS pool, left over from a
  previous desktop configuration, and admittedly I had forgotten it was even in the system.

## The Storm

If it wasn't clear the problem is that my super-nice high-speed 4TB NVMe drive
was going bad, like really bad. Eventually my OS stopped booting, it was even
difficult to live-boot from any other ISO due to, I think ultimately, that disk
causing such extreme latency in the start-up processes that they just failed.
So I quickly found myself with little-to-no access to my primary desktop's
data...

## Where It Went Wrong

What I did is I live booted into an Ubuntu server environment (which took blood
sweat and tears to successfully get into), mounted my home directory from the 4 TB SSD, and
tried to continue my restic backup to my NAS, like an idiot. But at the same
time I also tried to prune it by only backing up a few projects because I
was getting worried about time. This was the first primary mistake - trying to
muck with my backup script under duress.

Then over the course of the whole thing it ended up taking over a week to solve
this when it could've been 2-3 days. So say it with me kids - "Don't make
decisions under duress"

## Climbing Out

I downloaded opencode and had it help me write the right excludes syntax in my
restic backup script and got it back up going. That went ok but opencode agents
had no historical context for why anything was the way it was, and frankly an
agent would've been misled thinking the backup solution was much more solid
than it was due to how I documented it.

Agents also miss things... in my chat sessions it knew about the other 2
available disks on the desktop system, I could have done a fresh backup to the 4 TB
spinning rust disk no problem: install zfs, mount the pool, change target of
restic, run full... that would've been beautifully simple. But instead I
trimmed it down and backed not-everything up to the NAS over the network, and
to a different backup target nonetheless... SMH.

As I started to consider which OS I was going to go with next I failed to
install Pop_OS! or Ubuntu onto the new disc... Then I tried Omarchy and the
install script just looped. So, I reinstalled Aurora onto the new 500 GB disk
and then quickly realized I don't have Firefox tabs, my SSH keys are in that
restic backup, my ssh config, api keys in hidden files.... Everything is in
that restic backup... The backup that's too big to restore to my new boot drive.

But you know what I have? That 2 terabyte disk mounted just fine as a
ZFS dataset. And I could mount the 4 TB rust disk with zfs as well because this
version of Aurora has zfs working flawlessly!

## Hindsight

What I should've done is so simple... While in that ubuntu live environment I
should've just either updated restic to be a local backup to the 4 TB rust
disk, or rsync'd my home directory to it plain and simple... I got all in my
head about not backing up python venvs, node_modules, etc. that I didn't think
to just basically carbon copy it all to a healthy disk and then prune it later.
Then I could've synced everything back over that I needed to the new Desktop's
$HOME and then scheduled the rsync or restic again to that locally mounted disk.

## The Detail I Left Out

The keen reader might stop to think... why not just mount the old 4TB disk and
copy what you need to your new desktop? And that's a prudent question...
However, in order to get anything installed I had to physically remove the 4TB
SSD from the motherboard, which was basically a full PC tear-down. From there I
was able to at least boot in and out of iso's like you'd otherwise expect, and
I have a USB/NVMe adapter so I planned to mount the old drive and copy things over from
there... But sadly... it won't mount. it's dead-dead and it appears that
anything I didn't save in my days-long-panicked-state is just. gone.

I feel pretty stupid to have not taken advantage of the 2 available disks local
to the machine, to have naively copied stuff over and dealt with the
organization later once my OS was back up. I tried to be smart and efficient
and ended up wasting so much time and losing quite a lot of "stuff"... ideas,
blog posts that I never committed, etc.

## Current Status

So a few lessons...

1. untested backups are not backups
2. false backups might be worse than none, although I did at least save a few things so maybe the jury is out here
3. making decisions while stressed out will lead to missing obviously better pathways... slow down, talk it out

As for my current status - I'm working on [[desktop-setup-2026]] and recovering what I can from my haphazard'd rsyncs in the live ubuntu env I got into. I'm also setting up a new Linux laptop at work at the same time so maybe I'll hve some workflow changes to write about in the future. For now, it's nice to be forced to accept that not every idea was that important, the good stuff will come back around, and ultimately computers and shit are just things, they're not life.