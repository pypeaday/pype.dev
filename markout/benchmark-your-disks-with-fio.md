---
content: "# Intro\n\nI use ZFS at home in my homelab for basically all of my storage...
  Docker uses\nZFS backend, all my VMs have their `.qcow2` images in their own zfs
  datasets,\nand all my shares are ZFS datasets. I love ZFS but my home hardware presently\nis
  the opposite of expensive or new... Thankfully I've had a lot of my orginal\nhomelab
  simply given to me but the cost of this is that I didn't put my\nmachines together,
  I didn't choose the disks, and I definitely didn't do the\nresearch I would've otherwise
  done had I bankrolled my server personally... \n\n## The Problem\n\nI run `glances`
  on basically all my machines and for the longest time I have\nbeen seeing big time
  `iowait` issues. Now, since everything was free I've\nlargely been able to ignore
  that however I'm now after some better performance\nwhich I think means new hardware!\n\nHere
  is a random screenshot of my glances homepage at time of writing - The\nonly major
  load on my server is some `ffmpeg` transcoding (about 60% CPU\nutilization)...\n\n<img
  src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/glances-iowait.png\"
  alt=\"glances\" title=\"glances with iowait\" />\n\n\nAs you can see... there's
  a lot of issues and _I don't even know what they mean_.\n\n# fio\n\nI heard about
  [fio](https://fio.readthedocs.io/en/latest/) through a friend and\ndecided to try
  it out quick. It installs with `apt` on ubuntu quick and easy...\n\nJim Saltar has
  a good blog post on it [here](https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/)\n\nBasically
  it's a handy tool for benchmarking your disks and the blog dives into\nwhat types
  of metrics matter - it's not just throughput, but also latency,\niops, etc.\n\n##
  Tests\n\nI ran a few basic commands inside a new zfs dataset on my server `tank/fio`\n\n```bash\nfio
  --name=random-write --ioengine=posixaio --rw=randwrite --bs=4k --size=4g --numjobs=1
  --runtime=60 --time_based --end_fsync=1 > single-4KiB-random-write.txt\nfio --name=random-write
  --ioengine=posixaio --rw=randwrite --bs=64k --size=256m --numjobs=16 --iodepth=16
  --runtime=60 --time_based --end_fsync=1 > 16-parallel-64KiB-random-write.txt\nfio
  --name=random-write --ioengine=posixaio --rw=randwrite --bs=1m --size=16g --numjobs=1
  --iodepth=1 --runtime=60 --time_based --end_fsync=1 > single-1MiB-random-write.txt\n```\n\n##
  Results\n\nThe single 4 KiB random write:\n\n`WRITE: bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s
  (8024kB/s-8024kB/s), io=523MiB (548MB), run=68317-68317msec`\n\nThe 16 parallel
  64KiB random writes:\n\n`WRITE: bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s (5734kB/s-6454kB/s),
  io=7642MiB (8013MB), run=81310-81418msec`\n\nThe single 1MiB random write:\n\n`WRITE:
  bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s), io=8177MiB (8574MB),
  run=100699-100699msec`\n\n# Summary\n\nSo I don't fully understand these numbers
  yet... 80-100 MiB/s isn't super fast\nand that's across a parallelized workload...
  The single threaded workloads have\nawful performance so this tells me something
  is wrong... I have a few ideas...\n\n1. ZFS dataset config options such as `ashift`
  or the blocksize might be way misconfigured\n2. The disks/pool which came from a
  TrueNAS/FreeBSD machine may have some artifacts that I need to clean up\n3. The
  SAS controller I am using, which I flashed with IT firmware to get it into JBOD
  mode might be messed up\n4. The data cables themselves could be a problem...\n\nPoints
  3 and 4 are less likely given that the write speed does increase in the parallelized
  job but I'm a newbie so it's time to dive in!"
date: 2022-08-27
description: 'Intro I use ZFS at home in my homelab for basically all of my storage...
  Docker uses

  ZFS backend, all my VMs have their `.qcow2` images in their own zfs dataset'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Benchmark your disks
    with fio</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Intro I use ZFS at
    home in my homelab for basically all of my storage... Docker uses\nZFS backend,
    all my VMs have their `.qcow2` images in their own zfs dataset\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Benchmark your disks with fio | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/benchmark-your-disks-with-fio\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Benchmark your disks with fio | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Intro I use ZFS at home in my homelab for basically all of my storage...
    Docker uses\nZFS backend, all my VMs have their `.qcow2` images in their own zfs
    dataset\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/benchmark-your-disks-with-fio</span>\n
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
    mb-4 post-title-large\">Benchmark your disks with fio</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-08-27\">\n
    \           August 27, 2022\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/zfs/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #zfs\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h1 id=\"intro\">Intro <a class=\"header-anchor\"
    href=\"#intro\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I use ZFS at home in
    my homelab for basically all of my storage... Docker uses\nZFS backend, all my
    VMs have their <code>.qcow2</code> images in their own zfs datasets,\nand all
    my shares are ZFS datasets. I love ZFS but my home hardware presently\nis the
    opposite of expensive or new... Thankfully I've had a lot of my orginal\nhomelab
    simply given to me but the cost of this is that I didn't put my\nmachines together,
    I didn't choose the disks, and I definitely didn't do the\nresearch I would've
    otherwise done had I bankrolled my server personally...</p>\n<h2 id=\"the-problem\">The
    Problem <a class=\"header-anchor\" href=\"#the-problem\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I run <code>glances</code>
    on basically all my machines and for the longest time I have\nbeen seeing big
    time <code>iowait</code> issues. Now, since everything was free I've\nlargely
    been able to ignore that however I'm now after some better performance\nwhich
    I think means new hardware!</p>\n<p>Here is a random screenshot of my glances
    homepage at time of writing - The\nonly major load on my server is some <code>ffmpeg</code>
    transcoding (about 60% CPU\nutilization)...</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/glances-iowait.png\"
    alt=\"glances\" title=\"glances with iowait\" />\n<p>As you can see... there's
    a lot of issues and <em>I don't even know what they mean</em>.</p>\n<h1 id=\"fio\">fio
    <a class=\"header-anchor\" href=\"#fio\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I heard about <a href=\"https://fio.readthedocs.io/en/latest/\">fio</a>
    through a friend and\ndecided to try it out quick. It installs with <code>apt</code>
    on ubuntu quick and easy...</p>\n<p>Jim Saltar has a good blog post on it <a href=\"https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/\">here</a></p>\n<p>Basically
    it's a handy tool for benchmarking your disks and the blog dives into\nwhat types
    of metrics matter - it's not just throughput, but also latency,\niops, etc.</p>\n<h2
    id=\"tests\">Tests <a class=\"header-anchor\" href=\"#tests\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I ran a few basic commands
    inside a new zfs dataset on my server <code>tank/fio</code></p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>fio<span class=\"w\"> </span>--name<span
    class=\"o\">=</span>random-write<span class=\"w\"> </span>--ioengine<span class=\"o\">=</span>posixaio<span
    class=\"w\"> </span>--rw<span class=\"o\">=</span>randwrite<span class=\"w\">
    </span>--bs<span class=\"o\">=</span>4k<span class=\"w\"> </span>--size<span class=\"o\">=</span>4g<span
    class=\"w\"> </span>--numjobs<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>--runtime<span class=\"o\">=</span><span class=\"m\">60</span><span
    class=\"w\"> </span>--time_based<span class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span
    class=\"m\">1</span><span class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-4KiB-random-write.txt\nfio<span
    class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
    </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
    class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>64k<span
    class=\"w\"> </span>--size<span class=\"o\">=</span>256m<span class=\"w\"> </span>--numjobs<span
    class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--iodepth<span
    class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--runtime<span
    class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
    class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span><span class=\"m\">16</span>-parallel-64KiB-random-write.txt\nfio<span
    class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
    </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
    class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>1m<span
    class=\"w\"> </span>--size<span class=\"o\">=</span>16g<span class=\"w\"> </span>--numjobs<span
    class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--iodepth<span
    class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--runtime<span
    class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
    class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-1MiB-random-write.txt\n</pre></div>\n\n</pre>\n\n<h2
    id=\"results\">Results <a class=\"header-anchor\" href=\"#results\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The single 4 KiB random
    write:</p>\n<p><code>WRITE: bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s (8024kB/s-8024kB/s),
    io=523MiB (548MB), run=68317-68317msec</code></p>\n<p>The 16 parallel 64KiB random
    writes:</p>\n<p><code>WRITE: bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s (5734kB/s-6454kB/s),
    io=7642MiB (8013MB), run=81310-81418msec</code></p>\n<p>The single 1MiB random
    write:</p>\n<p><code>WRITE: bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s),
    io=8177MiB (8574MB), run=100699-100699msec</code></p>\n<h1 id=\"summary\">Summary
    <a class=\"header-anchor\" href=\"#summary\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>So I don't fully understand
    these numbers yet... 80-100 MiB/s isn't super fast\nand that's across a parallelized
    workload... The single threaded workloads have\nawful performance so this tells
    me something is wrong... I have a few ideas...</p>\n<ol>\n<li>ZFS dataset config
    options such as <code>ashift</code> or the blocksize might be way misconfigured</li>\n<li>The
    disks/pool which came from a TrueNAS/FreeBSD machine may have some artifacts that
    I need to clean up</li>\n<li>The SAS controller I am using, which I flashed with
    IT firmware to get it into JBOD mode might be messed up</li>\n<li>The data cables
    themselves could be a problem...</li>\n</ol>\n<p>Points 3 and 4 are less likely
    given that the write speed does increase in the parallelized job but I'm a newbie
    so it's time to dive in!</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Benchmark your disks
    with fio</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Intro I use ZFS at
    home in my homelab for basically all of my storage... Docker uses\nZFS backend,
    all my VMs have their `.qcow2` images in their own zfs dataset\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Benchmark your disks with fio | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/benchmark-your-disks-with-fio\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Benchmark your disks with fio | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Intro I use ZFS at home in my homelab for basically all of my storage...
    Docker uses\nZFS backend, all my VMs have their `.qcow2` images in their own zfs
    dataset\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Benchmark your disks with fio</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-08-27\">\n
    \           August 27, 2022\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/zfs/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #zfs\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Benchmark your disks with fio</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-08-27\">\n
    \           August 27, 2022\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/zfs/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #zfs\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h1 id=\"intro\">Intro <a class=\"header-anchor\"
    href=\"#intro\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I use ZFS at home in
    my homelab for basically all of my storage... Docker uses\nZFS backend, all my
    VMs have their <code>.qcow2</code> images in their own zfs datasets,\nand all
    my shares are ZFS datasets. I love ZFS but my home hardware presently\nis the
    opposite of expensive or new... Thankfully I've had a lot of my orginal\nhomelab
    simply given to me but the cost of this is that I didn't put my\nmachines together,
    I didn't choose the disks, and I definitely didn't do the\nresearch I would've
    otherwise done had I bankrolled my server personally...</p>\n<h2 id=\"the-problem\">The
    Problem <a class=\"header-anchor\" href=\"#the-problem\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I run <code>glances</code>
    on basically all my machines and for the longest time I have\nbeen seeing big
    time <code>iowait</code> issues. Now, since everything was free I've\nlargely
    been able to ignore that however I'm now after some better performance\nwhich
    I think means new hardware!</p>\n<p>Here is a random screenshot of my glances
    homepage at time of writing - The\nonly major load on my server is some <code>ffmpeg</code>
    transcoding (about 60% CPU\nutilization)...</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/glances-iowait.png\"
    alt=\"glances\" title=\"glances with iowait\" />\n<p>As you can see... there's
    a lot of issues and <em>I don't even know what they mean</em>.</p>\n<h1 id=\"fio\">fio
    <a class=\"header-anchor\" href=\"#fio\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I heard about <a href=\"https://fio.readthedocs.io/en/latest/\">fio</a>
    through a friend and\ndecided to try it out quick. It installs with <code>apt</code>
    on ubuntu quick and easy...</p>\n<p>Jim Saltar has a good blog post on it <a href=\"https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/\">here</a></p>\n<p>Basically
    it's a handy tool for benchmarking your disks and the blog dives into\nwhat types
    of metrics matter - it's not just throughput, but also latency,\niops, etc.</p>\n<h2
    id=\"tests\">Tests <a class=\"header-anchor\" href=\"#tests\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I ran a few basic commands
    inside a new zfs dataset on my server <code>tank/fio</code></p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>fio<span class=\"w\"> </span>--name<span
    class=\"o\">=</span>random-write<span class=\"w\"> </span>--ioengine<span class=\"o\">=</span>posixaio<span
    class=\"w\"> </span>--rw<span class=\"o\">=</span>randwrite<span class=\"w\">
    </span>--bs<span class=\"o\">=</span>4k<span class=\"w\"> </span>--size<span class=\"o\">=</span>4g<span
    class=\"w\"> </span>--numjobs<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>--runtime<span class=\"o\">=</span><span class=\"m\">60</span><span
    class=\"w\"> </span>--time_based<span class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span
    class=\"m\">1</span><span class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-4KiB-random-write.txt\nfio<span
    class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
    </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
    class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>64k<span
    class=\"w\"> </span>--size<span class=\"o\">=</span>256m<span class=\"w\"> </span>--numjobs<span
    class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--iodepth<span
    class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--runtime<span
    class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
    class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span><span class=\"m\">16</span>-parallel-64KiB-random-write.txt\nfio<span
    class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
    </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
    class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>1m<span
    class=\"w\"> </span>--size<span class=\"o\">=</span>16g<span class=\"w\"> </span>--numjobs<span
    class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--iodepth<span
    class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--runtime<span
    class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
    class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-1MiB-random-write.txt\n</pre></div>\n\n</pre>\n\n<h2
    id=\"results\">Results <a class=\"header-anchor\" href=\"#results\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The single 4 KiB random
    write:</p>\n<p><code>WRITE: bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s (8024kB/s-8024kB/s),
    io=523MiB (548MB), run=68317-68317msec</code></p>\n<p>The 16 parallel 64KiB random
    writes:</p>\n<p><code>WRITE: bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s (5734kB/s-6454kB/s),
    io=7642MiB (8013MB), run=81310-81418msec</code></p>\n<p>The single 1MiB random
    write:</p>\n<p><code>WRITE: bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s),
    io=8177MiB (8574MB), run=100699-100699msec</code></p>\n<h1 id=\"summary\">Summary
    <a class=\"header-anchor\" href=\"#summary\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>So I don't fully understand
    these numbers yet... 80-100 MiB/s isn't super fast\nand that's across a parallelized
    workload... The single threaded workloads have\nawful performance so this tells
    me something is wrong... I have a few ideas...</p>\n<ol>\n<li>ZFS dataset config
    options such as <code>ashift</code> or the blocksize might be way misconfigured</li>\n<li>The
    disks/pool which came from a TrueNAS/FreeBSD machine may have some artifacts that
    I need to clean up</li>\n<li>The SAS controller I am using, which I flashed with
    IT firmware to get it into JBOD mode might be messed up</li>\n<li>The data cables
    themselves could be a problem...</li>\n</ol>\n<p>Points 3 and 4 are less likely
    given that the write speed does increase in the parallelized job but I'm a newbie
    so it's time to dive in!</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Benchmark
    your disks with fio</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Intro I use ZFS at home in my homelab for basically all of my storage...
    Docker uses\nZFS backend, all my VMs have their `.qcow2` images in their own zfs
    dataset\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Benchmark your disks with fio | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/benchmark-your-disks-with-fio\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Benchmark your disks with fio | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Intro I use ZFS at home in my homelab for basically all of my storage...
    Docker uses\nZFS backend, all my VMs have their `.qcow2` images in their own zfs
    dataset\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/benchmark-your-disks-with-fio</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h1 id=\"intro\">Intro
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I use ZFS at home in
    my homelab for basically all of my storage... Docker uses\nZFS backend, all my
    VMs have their <code>.qcow2</code> images in their own zfs datasets,\nand all
    my shares are ZFS datasets. I love ZFS but my home hardware presently\nis the
    opposite of expensive or new... Thankfully I've had a lot of my orginal\nhomelab
    simply given to me but the cost of this is that I didn't put my\nmachines together,
    I didn't choose the disks, and I definitely didn't do the\nresearch I would've
    otherwise done had I bankrolled my server personally...</p>\n<h2 id=\"the-problem\">The
    Problem <a class=\"header-anchor\" href=\"#the-problem\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I run <code>glances</code>
    on basically all my machines and for the longest time I have\nbeen seeing big
    time <code>iowait</code> issues. Now, since everything was free I've\nlargely
    been able to ignore that however I'm now after some better performance\nwhich
    I think means new hardware!</p>\n<p>Here is a random screenshot of my glances
    homepage at time of writing - The\nonly major load on my server is some <code>ffmpeg</code>
    transcoding (about 60% CPU\nutilization)...</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/glances-iowait.png\"
    alt=\"glances\" title=\"glances with iowait\" />\n<p>As you can see... there's
    a lot of issues and <em>I don't even know what they mean</em>.</p>\n<h1 id=\"fio\">fio
    <a class=\"header-anchor\" href=\"#fio\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I heard about <a href=\"https://fio.readthedocs.io/en/latest/\">fio</a>
    through a friend and\ndecided to try it out quick. It installs with <code>apt</code>
    on ubuntu quick and easy...</p>\n<p>Jim Saltar has a good blog post on it <a href=\"https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/\">here</a></p>\n<p>Basically
    it's a handy tool for benchmarking your disks and the blog dives into\nwhat types
    of metrics matter - it's not just throughput, but also latency,\niops, etc.</p>\n<h2
    id=\"tests\">Tests <a class=\"header-anchor\" href=\"#tests\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I ran a few basic commands
    inside a new zfs dataset on my server <code>tank/fio</code></p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>fio<span class=\"w\"> </span>--name<span
    class=\"o\">=</span>random-write<span class=\"w\"> </span>--ioengine<span class=\"o\">=</span>posixaio<span
    class=\"w\"> </span>--rw<span class=\"o\">=</span>randwrite<span class=\"w\">
    </span>--bs<span class=\"o\">=</span>4k<span class=\"w\"> </span>--size<span class=\"o\">=</span>4g<span
    class=\"w\"> </span>--numjobs<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>--runtime<span class=\"o\">=</span><span class=\"m\">60</span><span
    class=\"w\"> </span>--time_based<span class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span
    class=\"m\">1</span><span class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-4KiB-random-write.txt\nfio<span
    class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
    </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
    class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>64k<span
    class=\"w\"> </span>--size<span class=\"o\">=</span>256m<span class=\"w\"> </span>--numjobs<span
    class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--iodepth<span
    class=\"o\">=</span><span class=\"m\">16</span><span class=\"w\"> </span>--runtime<span
    class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
    class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span><span class=\"m\">16</span>-parallel-64KiB-random-write.txt\nfio<span
    class=\"w\"> </span>--name<span class=\"o\">=</span>random-write<span class=\"w\">
    </span>--ioengine<span class=\"o\">=</span>posixaio<span class=\"w\"> </span>--rw<span
    class=\"o\">=</span>randwrite<span class=\"w\"> </span>--bs<span class=\"o\">=</span>1m<span
    class=\"w\"> </span>--size<span class=\"o\">=</span>16g<span class=\"w\"> </span>--numjobs<span
    class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--iodepth<span
    class=\"o\">=</span><span class=\"m\">1</span><span class=\"w\"> </span>--runtime<span
    class=\"o\">=</span><span class=\"m\">60</span><span class=\"w\"> </span>--time_based<span
    class=\"w\"> </span>--end_fsync<span class=\"o\">=</span><span class=\"m\">1</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span>single-1MiB-random-write.txt\n</pre></div>\n\n</pre>\n\n<h2
    id=\"results\">Results <a class=\"header-anchor\" href=\"#results\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The single 4 KiB random
    write:</p>\n<p><code>WRITE: bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s (8024kB/s-8024kB/s),
    io=523MiB (548MB), run=68317-68317msec</code></p>\n<p>The 16 parallel 64KiB random
    writes:</p>\n<p><code>WRITE: bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s (5734kB/s-6454kB/s),
    io=7642MiB (8013MB), run=81310-81418msec</code></p>\n<p>The single 1MiB random
    write:</p>\n<p><code>WRITE: bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s),
    io=8177MiB (8574MB), run=100699-100699msec</code></p>\n<h1 id=\"summary\">Summary
    <a class=\"header-anchor\" href=\"#summary\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>So I don't fully understand
    these numbers yet... 80-100 MiB/s isn't super fast\nand that's across a parallelized
    workload... The single threaded workloads have\nawful performance so this tells
    me something is wrong... I have a few ideas...</p>\n<ol>\n<li>ZFS dataset config
    options such as <code>ashift</code> or the blocksize might be way misconfigured</li>\n<li>The
    disks/pool which came from a TrueNAS/FreeBSD machine may have some artifacts that
    I need to clean up</li>\n<li>The SAS controller I am using, which I flashed with
    IT firmware to get it into JBOD mode might be messed up</li>\n<li>The data cables
    themselves could be a problem...</li>\n</ol>\n<p>Points 3 and 4 are less likely
    given that the write speed does increase in the parallelized job but I'm a newbie
    so it's time to dive in!</p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2022-08-27 13:43:22\ntemplateKey: blog-post\ntitle: Benchmark
    your disks with fio\npublished: True\ntags:\n  - python\n  - zfs\n  - tech\n\n---\n\n#
    Intro\n\nI use ZFS at home in my homelab for basically all of my storage... Docker
    uses\nZFS backend, all my VMs have their `.qcow2` images in their own zfs datasets,\nand
    all my shares are ZFS datasets. I love ZFS but my home hardware presently\nis
    the opposite of expensive or new... Thankfully I've had a lot of my orginal\nhomelab
    simply given to me but the cost of this is that I didn't put my\nmachines together,
    I didn't choose the disks, and I definitely didn't do the\nresearch I would've
    otherwise done had I bankrolled my server personally... \n\n## The Problem\n\nI
    run `glances` on basically all my machines and for the longest time I have\nbeen
    seeing big time `iowait` issues. Now, since everything was free I've\nlargely
    been able to ignore that however I'm now after some better performance\nwhich
    I think means new hardware!\n\nHere is a random screenshot of my glances homepage
    at time of writing - The\nonly major load on my server is some `ffmpeg` transcoding
    (about 60% CPU\nutilization)...\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/glances-iowait.png\"
    alt=\"glances\" title=\"glances with iowait\" />\n\n\nAs you can see... there's
    a lot of issues and _I don't even know what they mean_.\n\n# fio\n\nI heard about
    [fio](https://fio.readthedocs.io/en/latest/) through a friend and\ndecided to
    try it out quick. It installs with `apt` on ubuntu quick and easy...\n\nJim Saltar
    has a good blog post on it [here](https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/)\n\nBasically
    it's a handy tool for benchmarking your disks and the blog dives into\nwhat types
    of metrics matter - it's not just throughput, but also latency,\niops, etc.\n\n##
    Tests\n\nI ran a few basic commands inside a new zfs dataset on my server `tank/fio`\n\n```bash\nfio
    --name=random-write --ioengine=posixaio --rw=randwrite --bs=4k --size=4g --numjobs=1
    --runtime=60 --time_based --end_fsync=1 > single-4KiB-random-write.txt\nfio --name=random-write
    --ioengine=posixaio --rw=randwrite --bs=64k --size=256m --numjobs=16 --iodepth=16
    --runtime=60 --time_based --end_fsync=1 > 16-parallel-64KiB-random-write.txt\nfio
    --name=random-write --ioengine=posixaio --rw=randwrite --bs=1m --size=16g --numjobs=1
    --iodepth=1 --runtime=60 --time_based --end_fsync=1 > single-1MiB-random-write.txt\n```\n\n##
    Results\n\nThe single 4 KiB random write:\n\n`WRITE: bw=7836KiB/s (8024kB/s),
    7836KiB/s-7836KiB/s (8024kB/s-8024kB/s), io=523MiB (548MB), run=68317-68317msec`\n\nThe
    16 parallel 64KiB random writes:\n\n`WRITE: bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s
    (5734kB/s-6454kB/s), io=7642MiB (8013MB), run=81310-81418msec`\n\nThe single 1MiB
    random write:\n\n`WRITE: bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s),
    io=8177MiB (8574MB), run=100699-100699msec`\n\n# Summary\n\nSo I don't fully understand
    these numbers yet... 80-100 MiB/s isn't super fast\nand that's across a parallelized
    workload... The single threaded workloads have\nawful performance so this tells
    me something is wrong... I have a few ideas...\n\n1. ZFS dataset config options
    such as `ashift` or the blocksize might be way misconfigured\n2. The disks/pool
    which came from a TrueNAS/FreeBSD machine may have some artifacts that I need
    to clean up\n3. The SAS controller I am using, which I flashed with IT firmware
    to get it into JBOD mode might be messed up\n4. The data cables themselves could
    be a problem...\n\nPoints 3 and 4 are less likely given that the write speed does
    increase in the parallelized job but I'm a newbie so it's time to dive in!\n"
published: true
slug: benchmark-your-disks-with-fio
title: Benchmark your disks with fio


---

# Intro

I use ZFS at home in my homelab for basically all of my storage... Docker uses
ZFS backend, all my VMs have their `.qcow2` images in their own zfs datasets,
and all my shares are ZFS datasets. I love ZFS but my home hardware presently
is the opposite of expensive or new... Thankfully I've had a lot of my orginal
homelab simply given to me but the cost of this is that I didn't put my
machines together, I didn't choose the disks, and I definitely didn't do the
research I would've otherwise done had I bankrolled my server personally... 

## The Problem

I run `glances` on basically all my machines and for the longest time I have
been seeing big time `iowait` issues. Now, since everything was free I've
largely been able to ignore that however I'm now after some better performance
which I think means new hardware!

Here is a random screenshot of my glances homepage at time of writing - The
only major load on my server is some `ffmpeg` transcoding (about 60% CPU
utilization)...

<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/glances-iowait.png" alt="glances" title="glances with iowait" />


As you can see... there's a lot of issues and _I don't even know what they mean_.

# fio

I heard about [fio](https://fio.readthedocs.io/en/latest/) through a friend and
decided to try it out quick. It installs with `apt` on ubuntu quick and easy...

Jim Saltar has a good blog post on it [here](https://arstechnica.com/gadgets/2020/02/how-fast-are-your-disks-find-out-the-open-source-way-with-fio/)

Basically it's a handy tool for benchmarking your disks and the blog dives into
what types of metrics matter - it's not just throughput, but also latency,
iops, etc.

## Tests

I ran a few basic commands inside a new zfs dataset on my server `tank/fio`

```bash
fio --name=random-write --ioengine=posixaio --rw=randwrite --bs=4k --size=4g --numjobs=1 --runtime=60 --time_based --end_fsync=1 > single-4KiB-random-write.txt
fio --name=random-write --ioengine=posixaio --rw=randwrite --bs=64k --size=256m --numjobs=16 --iodepth=16 --runtime=60 --time_based --end_fsync=1 > 16-parallel-64KiB-random-write.txt
fio --name=random-write --ioengine=posixaio --rw=randwrite --bs=1m --size=16g --numjobs=1 --iodepth=1 --runtime=60 --time_based --end_fsync=1 > single-1MiB-random-write.txt
```

## Results

The single 4 KiB random write:

`WRITE: bw=7836KiB/s (8024kB/s), 7836KiB/s-7836KiB/s (8024kB/s-8024kB/s), io=523MiB (548MB), run=68317-68317msec`

The 16 parallel 64KiB random writes:

`WRITE: bw=93.9MiB/s (98.4MB/s), 5599KiB/s-6303KiB/s (5734kB/s-6454kB/s), io=7642MiB (8013MB), run=81310-81418msec`

The single 1MiB random write:

`WRITE: bw=81.2MiB/s (85.1MB/s), 81.2MiB/s-81.2MiB/s (85.1MB/s-85.1MB/s), io=8177MiB (8574MB), run=100699-100699msec`

# Summary

So I don't fully understand these numbers yet... 80-100 MiB/s isn't super fast
and that's across a parallelized workload... The single threaded workloads have
awful performance so this tells me something is wrong... I have a few ideas...

1. ZFS dataset config options such as `ashift` or the blocksize might be way misconfigured
2. The disks/pool which came from a TrueNAS/FreeBSD machine may have some artifacts that I need to clean up
3. The SAS controller I am using, which I flashed with IT firmware to get it into JBOD mode might be messed up
4. The data cables themselves could be a problem...

Points 3 and 4 are less likely given that the write speed does increase in the parallelized job but I'm a newbie so it's time to dive in!