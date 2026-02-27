---
content: "docker bind mounts are specified as filepaths - this is very intuitive.
  I want\n/path/to/directory on my host to be shared with /another/path/foo in a\ncontainer.
  But what if /path/to/directory on the host is moved?\n\nThis is a situation I have
  found myself in at home and it turns out that I'm\nactually in almost zero trouble
  thankfully...\n\nTLDR - I have a bunch of compose stacks in\n/home/projects/homelab-compose/<host>/<application>
  and I want to move them to\n/home/projects/homelap-mono/compose/<host>/<application>\n\nI
  don't want to take down all my stacks to do this because I don't yet have a\nconvenient
  way to do it - but can I just `mv .../homelab-compose\n.../homelab-mono/compose`
  and be done with it?\n\nThe issue is that some of my stacks use local volume mounts
  - ie. there is a\ndata volume on the host in\n/home/projects/homelab-compose/<host><application>/docker-data
  for some of the\napplications... can I just move everything and docker is nonethewiser?\n\nTurns
  out the answer is mostly `yes` with some caveats to keep in mind..\n\nLet's start
  with why it works and then show an example...\n\n## Why\n\nThis works because of
  how docker interprets the bind mount location initially\nand with how `mv` is different
  from `cp`. When you speicify a volume mount for\ndocker, the engine determines which
  [[inode]] contains the metadata for the\nfilesystem object referenced by the original
  volume path `/path/to/directory`.\nI think about this like a string path is a pointer
  to a lower level identifier\ncloser to the filesystem - if that pointer changes
  it doesn't affect the\npre-existing inode or data. So docker uses the inode that
  `/path/to/directory`\npoints to when the container starts up.\n\nThe slight convenience
  in my case is that `mv` maintains the existing inode and\nso the new filepath is
  irrelevant to that existing container that was spun up\nwith a now-non-existent
  host filepath.\n\nSo if you can imagine then - I spun up several containers in\n`///homelab-compose/...`
  with many stacks - and I want to just move all the\nconfig files to new repo...
  thankfully, I actually can *just `mv`* everything\nand because the `inode` locations
  dont' change, the stacks are fine!\n\n!!! warning \"caveat\"\n\n    Is the next
  issue apparent? What happens to those files whose volume mount configurations specify
  .../homelab-compose/...? Well, if the stacks are brought down and back up then docker
  will create that filepath on the host and a new inode reference will be had by all...
  so that's a problem easily mitigated by some string replacement!\n\n!!! note \"another
  note\"\n\n\n    Perhaps just don't keep data next to your configuration either...
  In most of my stacks I have a determined docker volume that's backed up etc. on
  my hosts and that's what I'm moving towards on my desktop, but as of right now I've
  put myself in an odd situation via not participating in a proper thinking exercise
  when standing up all these stacks on my desktop\n\n## Example\n\nFinally let's just
  see it in action quickly...\n\nI have a directory `/tmp/foo/source` with a compose
  file in it.\n\n```\n\u276F tree source       \nsource\n\u2514\u2500\u2500 docker-compose.yml\n```\n\nThat
  file is simple:\n\n```yaml\nservices:\n  app:\n    image: nginx\n    ports:\n      -
  \"8070:80\"\n    volumes:\n      - /tmp/foo/source:/usr/share/nginx/html\n```\n\nNow
  I can spin that container up, exec in, drop a file in `/usr/share/nginx/html` and
  we'll see it in `/tmp/foo/source` as expected...\n\n```bash\nnic in /tmp/foo  \uF427
  (dev)\n\u276F docker exec source-app-1 touch /usr/share/nginx/html/file.txt\n\nnic
  in /tmp/foo  \uF427 (dev)\n\u276F tree source                                                       \nsource\n\u251C\u2500\u2500
  docker-compose.yml\n\u2514\u2500\u2500 file.txt\n\n1 directory, 2 files\n\n```\n\nNow
  let's `mv` the `source` directory somewhere else and see what happens\n\n```\nnic
  in /tmp/foo  \uF427 (dev)\n\u276F mv source target \n\nnic in /tmp/foo  \uF427 (dev)\n\u276F
  tree target \ntarget\n\u2514\u2500\u2500 source\n    \u251C\u2500\u2500 docker-compose.yml\n
  \   \u2514\u2500\u2500 file.txt\n\n2 directories, 2 files\n\n```\n\nOK everything
  is there - now let's drop another file in the container - remember the compose file
  still has the host path as `/tmp/foo/source`, not `/tmp/foo/target/source`.\n\n```\nnic
  in /tmp/foo  \uF427 (dev)\n\u276F docker exec source-app-1 touch /usr/share/nginx/html/another-file.txt\n\nnic
  in /tmp/foo  \uF427 (dev)\n\u276F tree target                                                          \ntarget\n\u2514\u2500\u2500
  source\n    \u251C\u2500\u2500 another-file.txt  # BAM! New file still here...\n
  \   \u251C\u2500\u2500 docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2
  directories, 3 files\n```\n## Few Things\n1. `cp` as noted before, creates new `inodes`
  and so if I were to have `cp -r`\n   that `source` directory to `target` then the
  container would've dropped\ner exec source-app-1 touch /usr/share/nginx/html/another-file.txc
  in /tmp/foo  \uF427 (dev) \U000F0484 \U000F150E NO PYTHON ENVIORNMENT SET t\n`another-file.txt`
  to `/tmp/source` and we'd be in a pretty confusing state\n\n2. Let me stress again
  the importance of managing your docker volumes in a sane\n   way... I have on any
  of my hosts a `/path/to/docker/data` which is backed up\nin a way that makes sense
  for the host (usually zfs + sanoid, otherwise restic\nbackup TO a remote zfs dataset
  - see\n[[using-restic-to-backup-my-home-directory#Intro]])"
date: 2025-08-02
description: 'docker bind mounts are specified as filepaths - this is very intuitive.
  I want

  /path/to/directory on my host to be shared with /another/path/foo in a

  container.'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Docker Volume Mounts
    Link to an Inode</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"docker bind mounts are specified as filepaths - this is very intuitive.
    I want\n/path/to/directory on my host to be shared with /another/path/foo in a\ncontainer.\"
    />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Docker Volume Mounts Link to an Inode | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/docker-volume-mounts-link-to-an-inode\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Docker Volume Mounts Link to an Inode | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"docker bind mounts are specified as filepaths - this is very intuitive.
    I want\n/path/to/directory on my host to be shared with /another/path/foo in a\ncontainer.\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"
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
    \           <span class=\"site-terminal__dir\">~/docker-volume-mounts-link-to-an-inode</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"
    alt=\"Docker Volume Mounts Link to an Inode cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Docker
    Volume Mounts Link to an Inode</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-02\">\n            August
    02, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/docker/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #docker\n
    \           </a>\n            <a href=\"https://pype.dev//tags/compose/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #compose\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>docker bind mounts are specified as
    filepaths - this is very intuitive. I want\n/path/to/directory on my host to be
    shared with /another/path/foo in a\ncontainer. But what if /path/to/directory
    on the host is moved?</p>\n<p>This is a situation I have found myself in at home
    and it turns out that I'm\nactually in almost zero trouble thankfully...</p>\n<p>TLDR
    - I have a bunch of compose stacks in\n/home/projects/homelab-compose/<host>/<application>
    and I want to move them to\n/home/projects/homelap-mono/compose/<host>/<application></p>\n<p>I
    don't want to take down all my stacks to do this because I don't yet have a\nconvenient
    way to do it - but can I just <code>mv .../homelab-compose .../homelab-mono/compose</code>
    and be done with it?</p>\n<p>The issue is that some of my stacks use local volume
    mounts - ie. there is a\ndata volume on the host in\n/home/projects/homelab-compose/<host><application>/docker-data
    for some of the\napplications... can I just move everything and docker is nonethewiser?</p>\n<p>Turns
    out the answer is mostly <code>yes</code> with some caveats to keep in mind..</p>\n<p>Let's
    start with why it works and then show an example...</p>\n<h2 id=\"why\">Why <a
    class=\"header-anchor\" href=\"#why\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This works because of
    how docker interprets the bind mount location initially\nand with how <code>mv</code>
    is different from <code>cp</code>. When you speicify a volume mount for\ndocker,
    the engine determines which <a class=\"wikilink\" href=\"/inode\">inode</a> contains
    the metadata for the\nfilesystem object referenced by the original volume path
    <code>/path/to/directory</code>.\nI think about this like a string path is a pointer
    to a lower level identifier\ncloser to the filesystem - if that pointer changes
    it doesn't affect the\npre-existing inode or data. So docker uses the inode that
    <code>/path/to/directory</code>\npoints to when the container starts up.</p>\n<p>The
    slight convenience in my case is that <code>mv</code> maintains the existing inode
    and\nso the new filepath is irrelevant to that existing container that was spun
    up\nwith a now-non-existent host filepath.</p>\n<p>So if you can imagine then
    - I spun up several containers in\n<code>///homelab-compose/...</code> with many
    stacks - and I want to just move all the\nconfig files to new repo... thankfully,
    I actually can <em>just <code>mv</code></em> everything\nand because the <code>inode</code>
    locations dont' change, the stacks are fine!</p>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">caveat</p>\n<p>Is the next issue apparent? What happens
    to those files whose volume mount configurations specify .../homelab-compose/...?
    Well, if the stacks are brought down and back up then docker will create that
    filepath on the host and a new inode reference will be had by all... so that's
    a problem easily mitigated by some string replacement!</p>\n</div>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">another note</p>\n</div>\n<pre><code>Perhaps
    just don't keep data next to your configuration either... In most of my stacks
    I have a determined docker volume that's backed up etc. on my hosts and that's
    what I'm moving towards on my desktop, but as of right now I've put myself in
    an odd situation via not participating in a proper thinking exercise when standing
    up all these stacks on my desktop\n</code></pre>\n<h2 id=\"example\">Example <a
    class=\"header-anchor\" href=\"#example\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Finally let's just see
    it in action quickly...</p>\n<p>I have a directory <code>/tmp/foo/source</code>
    with a compose file in it.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F tree source       \nsource\n\u2514\u2500\u2500
    docker-compose.yml\n</pre></div>\n\n</pre>\n\n<p>That file is simple:</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">app</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nginx</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;8070:80&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
    l-Scalar-Plain\">/tmp/foo/source:/usr/share/nginx/html</span>\n</pre></div>\n\n</pre>\n\n<p>Now
    I can spin that container up, exec in, drop a file in <code>/usr/share/nginx/html</code>
    and we'll see it in <code>/tmp/foo/source</code> as expected...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>/tmp/foo<span class=\"w\">  </span>\uF427<span
    class=\"w\"> </span><span class=\"o\">(</span>dev<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>docker<span class=\"w\"> </span><span class=\"nb\">exec</span><span
    class=\"w\"> </span>source-app-1<span class=\"w\"> </span>touch<span class=\"w\">
    </span>/usr/share/nginx/html/file.txt\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>/tmp/foo<span class=\"w\">  </span>\uF427<span class=\"w\">
    </span><span class=\"o\">(</span>dev<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>tree<span class=\"w\"> </span><span class=\"nb\">source</span><span class=\"w\">
    \                                                      </span>\n<span class=\"nb\">source</span>\n\u251C\u2500\u2500<span
    class=\"w\"> </span>docker-compose.yml\n\u2514\u2500\u2500<span class=\"w\"> </span>file.txt\n\n<span
    class=\"m\">1</span><span class=\"w\"> </span>directory,<span class=\"w\"> </span><span
    class=\"m\">2</span><span class=\"w\"> </span>files\n</pre></div>\n\n</pre>\n\n<p>Now
    let's <code>mv</code> the <code>source</code> directory somewhere else and see
    what happens</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in /tmp/foo  \uF427 (dev)\n\u276F
    mv source target \n\nnic in /tmp/foo  \uF427 (dev)\n\u276F tree target \ntarget\n\u2514\u2500\u2500
    source\n    \u251C\u2500\u2500 docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2
    directories, 2 files\n</pre></div>\n\n</pre>\n\n<p>OK everything is there - now
    let's drop another file in the container - remember the compose file still has
    the host path as <code>/tmp/foo/source</code>, not <code>/tmp/foo/target/source</code>.</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in /tmp/foo  \uF427 (dev)\n\u276F
    docker exec source-app-1 touch /usr/share/nginx/html/another-file.txt\n\nnic in
    /tmp/foo  \uF427 (dev)\n\u276F tree target                                                          \ntarget\n\u2514\u2500\u2500
    source\n    \u251C\u2500\u2500 another-file.txt  # BAM! New file still here...\n
    \   \u251C\u2500\u2500 docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2
    directories, 3 files\n</pre></div>\n\n</pre>\n\n<h2 id=\"few-things\">Few Things
    <a class=\"header-anchor\" href=\"#few-things\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol>\n<li>\n<p><code>cp</code>
    as noted before, creates new <code>inodes</code> and so if I were to have <code>cp
    -r</code>\nthat <code>source</code> directory to <code>target</code> then the
    container would've dropped\ner exec source-app-1 touch /usr/share/nginx/html/another-file.txc
    in /tmp/foo  \uF427 (dev) \U000F0484 \U000F150E NO PYTHON ENVIORNMENT SET t\n<code>another-file.txt</code>
    to <code>/tmp/source</code> and we'd be in a pretty confusing state</p>\n</li>\n<li>\n<p>Let
    me stress again the importance of managing your docker volumes in a sane\nway...
    I have on any of my hosts a <code>/path/to/docker/data</code> which is backed
    up\nin a way that makes sense for the host (usually zfs + sanoid, otherwise restic\nbackup
    TO a remote zfs dataset - see\n<a class=\"wikilink\" href=\"/using-restic-to-backup-my-home-directory#Intro\">using-restic-to-backup-my-home-directory#Intro</a>)</p>\n</li>\n</ol>\n\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Docker Volume Mounts
    Link to an Inode</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"docker bind mounts are specified as filepaths - this is very intuitive.
    I want\n/path/to/directory on my host to be shared with /another/path/foo in a\ncontainer.\"
    />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Docker Volume Mounts Link to an Inode | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/docker-volume-mounts-link-to-an-inode\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Docker Volume Mounts Link to an Inode | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"docker bind mounts are specified as filepaths - this is very intuitive.
    I want\n/path/to/directory on my host to be shared with /another/path/foo in a\ncontainer.\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"
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
    mb-4 post-title-large\">Docker Volume Mounts Link to an Inode</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-02\">\n
    \           August 02, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/docker/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #docker\n
    \           </a>\n            <a href=\"https://pype.dev//tags/compose/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #compose\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"
    alt=\"Docker Volume Mounts Link to an Inode cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Docker
    Volume Mounts Link to an Inode</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-02\">\n            August
    02, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/docker/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #docker\n
    \           </a>\n            <a href=\"https://pype.dev//tags/compose/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #compose\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>docker bind mounts are specified as
    filepaths - this is very intuitive. I want\n/path/to/directory on my host to be
    shared with /another/path/foo in a\ncontainer. But what if /path/to/directory
    on the host is moved?</p>\n<p>This is a situation I have found myself in at home
    and it turns out that I'm\nactually in almost zero trouble thankfully...</p>\n<p>TLDR
    - I have a bunch of compose stacks in\n/home/projects/homelab-compose/<host>/<application>
    and I want to move them to\n/home/projects/homelap-mono/compose/<host>/<application></p>\n<p>I
    don't want to take down all my stacks to do this because I don't yet have a\nconvenient
    way to do it - but can I just <code>mv .../homelab-compose .../homelab-mono/compose</code>
    and be done with it?</p>\n<p>The issue is that some of my stacks use local volume
    mounts - ie. there is a\ndata volume on the host in\n/home/projects/homelab-compose/<host><application>/docker-data
    for some of the\napplications... can I just move everything and docker is nonethewiser?</p>\n<p>Turns
    out the answer is mostly <code>yes</code> with some caveats to keep in mind..</p>\n<p>Let's
    start with why it works and then show an example...</p>\n<h2 id=\"why\">Why <a
    class=\"header-anchor\" href=\"#why\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This works because of
    how docker interprets the bind mount location initially\nand with how <code>mv</code>
    is different from <code>cp</code>. When you speicify a volume mount for\ndocker,
    the engine determines which <a class=\"wikilink\" href=\"/inode\">inode</a> contains
    the metadata for the\nfilesystem object referenced by the original volume path
    <code>/path/to/directory</code>.\nI think about this like a string path is a pointer
    to a lower level identifier\ncloser to the filesystem - if that pointer changes
    it doesn't affect the\npre-existing inode or data. So docker uses the inode that
    <code>/path/to/directory</code>\npoints to when the container starts up.</p>\n<p>The
    slight convenience in my case is that <code>mv</code> maintains the existing inode
    and\nso the new filepath is irrelevant to that existing container that was spun
    up\nwith a now-non-existent host filepath.</p>\n<p>So if you can imagine then
    - I spun up several containers in\n<code>///homelab-compose/...</code> with many
    stacks - and I want to just move all the\nconfig files to new repo... thankfully,
    I actually can <em>just <code>mv</code></em> everything\nand because the <code>inode</code>
    locations dont' change, the stacks are fine!</p>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">caveat</p>\n<p>Is the next issue apparent? What happens
    to those files whose volume mount configurations specify .../homelab-compose/...?
    Well, if the stacks are brought down and back up then docker will create that
    filepath on the host and a new inode reference will be had by all... so that's
    a problem easily mitigated by some string replacement!</p>\n</div>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">another note</p>\n</div>\n<pre><code>Perhaps
    just don't keep data next to your configuration either... In most of my stacks
    I have a determined docker volume that's backed up etc. on my hosts and that's
    what I'm moving towards on my desktop, but as of right now I've put myself in
    an odd situation via not participating in a proper thinking exercise when standing
    up all these stacks on my desktop\n</code></pre>\n<h2 id=\"example\">Example <a
    class=\"header-anchor\" href=\"#example\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Finally let's just see
    it in action quickly...</p>\n<p>I have a directory <code>/tmp/foo/source</code>
    with a compose file in it.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F tree source       \nsource\n\u2514\u2500\u2500
    docker-compose.yml\n</pre></div>\n\n</pre>\n\n<p>That file is simple:</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">app</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nginx</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;8070:80&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
    l-Scalar-Plain\">/tmp/foo/source:/usr/share/nginx/html</span>\n</pre></div>\n\n</pre>\n\n<p>Now
    I can spin that container up, exec in, drop a file in <code>/usr/share/nginx/html</code>
    and we'll see it in <code>/tmp/foo/source</code> as expected...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>/tmp/foo<span class=\"w\">  </span>\uF427<span
    class=\"w\"> </span><span class=\"o\">(</span>dev<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>docker<span class=\"w\"> </span><span class=\"nb\">exec</span><span
    class=\"w\"> </span>source-app-1<span class=\"w\"> </span>touch<span class=\"w\">
    </span>/usr/share/nginx/html/file.txt\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>/tmp/foo<span class=\"w\">  </span>\uF427<span class=\"w\">
    </span><span class=\"o\">(</span>dev<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>tree<span class=\"w\"> </span><span class=\"nb\">source</span><span class=\"w\">
    \                                                      </span>\n<span class=\"nb\">source</span>\n\u251C\u2500\u2500<span
    class=\"w\"> </span>docker-compose.yml\n\u2514\u2500\u2500<span class=\"w\"> </span>file.txt\n\n<span
    class=\"m\">1</span><span class=\"w\"> </span>directory,<span class=\"w\"> </span><span
    class=\"m\">2</span><span class=\"w\"> </span>files\n</pre></div>\n\n</pre>\n\n<p>Now
    let's <code>mv</code> the <code>source</code> directory somewhere else and see
    what happens</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in /tmp/foo  \uF427 (dev)\n\u276F
    mv source target \n\nnic in /tmp/foo  \uF427 (dev)\n\u276F tree target \ntarget\n\u2514\u2500\u2500
    source\n    \u251C\u2500\u2500 docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2
    directories, 2 files\n</pre></div>\n\n</pre>\n\n<p>OK everything is there - now
    let's drop another file in the container - remember the compose file still has
    the host path as <code>/tmp/foo/source</code>, not <code>/tmp/foo/target/source</code>.</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in /tmp/foo  \uF427 (dev)\n\u276F
    docker exec source-app-1 touch /usr/share/nginx/html/another-file.txt\n\nnic in
    /tmp/foo  \uF427 (dev)\n\u276F tree target                                                          \ntarget\n\u2514\u2500\u2500
    source\n    \u251C\u2500\u2500 another-file.txt  # BAM! New file still here...\n
    \   \u251C\u2500\u2500 docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2
    directories, 3 files\n</pre></div>\n\n</pre>\n\n<h2 id=\"few-things\">Few Things
    <a class=\"header-anchor\" href=\"#few-things\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol>\n<li>\n<p><code>cp</code>
    as noted before, creates new <code>inodes</code> and so if I were to have <code>cp
    -r</code>\nthat <code>source</code> directory to <code>target</code> then the
    container would've dropped\ner exec source-app-1 touch /usr/share/nginx/html/another-file.txc
    in /tmp/foo  \uF427 (dev) \U000F0484 \U000F150E NO PYTHON ENVIORNMENT SET t\n<code>another-file.txt</code>
    to <code>/tmp/source</code> and we'd be in a pretty confusing state</p>\n</li>\n<li>\n<p>Let
    me stress again the importance of managing your docker volumes in a sane\nway...
    I have on any of my hosts a <code>/path/to/docker/data</code> which is backed
    up\nin a way that makes sense for the host (usually zfs + sanoid, otherwise restic\nbackup
    TO a remote zfs dataset - see\n<a class=\"wikilink\" href=\"/using-restic-to-backup-my-home-directory#Intro\">using-restic-to-backup-my-home-directory#Intro</a>)</p>\n</li>\n</ol>\n\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Docker
    Volume Mounts Link to an Inode</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"docker bind mounts are specified as filepaths - this is very intuitive.
    I want\n/path/to/directory on my host to be shared with /another/path/foo in a\ncontainer.\"
    />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Docker Volume Mounts Link to an Inode | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/docker-volume-mounts-link-to-an-inode\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Docker Volume Mounts Link to an Inode | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"docker bind mounts are specified as filepaths - this is very intuitive.
    I want\n/path/to/directory on my host to be shared with /another/path/foo in a\ncontainer.\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"
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
    \           <span class=\"site-terminal__dir\">~/docker-volume-mounts-link-to-an-inode</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>docker
    bind mounts are specified as filepaths - this is very intuitive. I want\n/path/to/directory
    on my host to be shared with /another/path/foo in a\ncontainer. But what if /path/to/directory
    on the host is moved?</p>\n<p>This is a situation I have found myself in at home
    and it turns out that I'm\nactually in almost zero trouble thankfully...</p>\n<p>TLDR
    - I have a bunch of compose stacks in\n/home/projects/homelab-compose/<host>/<application>
    and I want to move them to\n/home/projects/homelap-mono/compose/<host>/<application></p>\n<p>I
    don't want to take down all my stacks to do this because I don't yet have a\nconvenient
    way to do it - but can I just <code>mv .../homelab-compose .../homelab-mono/compose</code>
    and be done with it?</p>\n<p>The issue is that some of my stacks use local volume
    mounts - ie. there is a\ndata volume on the host in\n/home/projects/homelab-compose/<host><application>/docker-data
    for some of the\napplications... can I just move everything and docker is nonethewiser?</p>\n<p>Turns
    out the answer is mostly <code>yes</code> with some caveats to keep in mind..</p>\n<p>Let's
    start with why it works and then show an example...</p>\n<h2 id=\"why\">Why <a
    class=\"header-anchor\" href=\"#why\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This works because of
    how docker interprets the bind mount location initially\nand with how <code>mv</code>
    is different from <code>cp</code>. When you speicify a volume mount for\ndocker,
    the engine determines which <a class=\"wikilink\" href=\"/inode\">inode</a> contains
    the metadata for the\nfilesystem object referenced by the original volume path
    <code>/path/to/directory</code>.\nI think about this like a string path is a pointer
    to a lower level identifier\ncloser to the filesystem - if that pointer changes
    it doesn't affect the\npre-existing inode or data. So docker uses the inode that
    <code>/path/to/directory</code>\npoints to when the container starts up.</p>\n<p>The
    slight convenience in my case is that <code>mv</code> maintains the existing inode
    and\nso the new filepath is irrelevant to that existing container that was spun
    up\nwith a now-non-existent host filepath.</p>\n<p>So if you can imagine then
    - I spun up several containers in\n<code>///homelab-compose/...</code> with many
    stacks - and I want to just move all the\nconfig files to new repo... thankfully,
    I actually can <em>just <code>mv</code></em> everything\nand because the <code>inode</code>
    locations dont' change, the stacks are fine!</p>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">caveat</p>\n<p>Is the next issue apparent? What happens
    to those files whose volume mount configurations specify .../homelab-compose/...?
    Well, if the stacks are brought down and back up then docker will create that
    filepath on the host and a new inode reference will be had by all... so that's
    a problem easily mitigated by some string replacement!</p>\n</div>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">another note</p>\n</div>\n<pre><code>Perhaps
    just don't keep data next to your configuration either... In most of my stacks
    I have a determined docker volume that's backed up etc. on my hosts and that's
    what I'm moving towards on my desktop, but as of right now I've put myself in
    an odd situation via not participating in a proper thinking exercise when standing
    up all these stacks on my desktop\n</code></pre>\n<h2 id=\"example\">Example <a
    class=\"header-anchor\" href=\"#example\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Finally let's just see
    it in action quickly...</p>\n<p>I have a directory <code>/tmp/foo/source</code>
    with a compose file in it.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u276F tree source       \nsource\n\u2514\u2500\u2500
    docker-compose.yml\n</pre></div>\n\n</pre>\n\n<p>That file is simple:</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">services</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">app</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">image</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">nginx</span>\n<span
    class=\"w\">    </span><span class=\"nt\">ports</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"s\">&quot;8070:80&quot;</span>\n<span class=\"w\">    </span><span
    class=\"nt\">volumes</span><span class=\"p\">:</span>\n<span class=\"w\">      </span><span
    class=\"p p-Indicator\">-</span><span class=\"w\"> </span><span class=\"l l-Scalar
    l-Scalar-Plain\">/tmp/foo/source:/usr/share/nginx/html</span>\n</pre></div>\n\n</pre>\n\n<p>Now
    I can spin that container up, exec in, drop a file in <code>/usr/share/nginx/html</code>
    and we'll see it in <code>/tmp/foo/source</code> as expected...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>/tmp/foo<span class=\"w\">  </span>\uF427<span
    class=\"w\"> </span><span class=\"o\">(</span>dev<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>docker<span class=\"w\"> </span><span class=\"nb\">exec</span><span
    class=\"w\"> </span>source-app-1<span class=\"w\"> </span>touch<span class=\"w\">
    </span>/usr/share/nginx/html/file.txt\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>/tmp/foo<span class=\"w\">  </span>\uF427<span class=\"w\">
    </span><span class=\"o\">(</span>dev<span class=\"o\">)</span>\n\u276F<span class=\"w\">
    </span>tree<span class=\"w\"> </span><span class=\"nb\">source</span><span class=\"w\">
    \                                                      </span>\n<span class=\"nb\">source</span>\n\u251C\u2500\u2500<span
    class=\"w\"> </span>docker-compose.yml\n\u2514\u2500\u2500<span class=\"w\"> </span>file.txt\n\n<span
    class=\"m\">1</span><span class=\"w\"> </span>directory,<span class=\"w\"> </span><span
    class=\"m\">2</span><span class=\"w\"> </span>files\n</pre></div>\n\n</pre>\n\n<p>Now
    let's <code>mv</code> the <code>source</code> directory somewhere else and see
    what happens</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in /tmp/foo  \uF427 (dev)\n\u276F
    mv source target \n\nnic in /tmp/foo  \uF427 (dev)\n\u276F tree target \ntarget\n\u2514\u2500\u2500
    source\n    \u251C\u2500\u2500 docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2
    directories, 2 files\n</pre></div>\n\n</pre>\n\n<p>OK everything is there - now
    let's drop another file in the container - remember the compose file still has
    the host path as <code>/tmp/foo/source</code>, not <code>/tmp/foo/target/source</code>.</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in /tmp/foo  \uF427 (dev)\n\u276F
    docker exec source-app-1 touch /usr/share/nginx/html/another-file.txt\n\nnic in
    /tmp/foo  \uF427 (dev)\n\u276F tree target                                                          \ntarget\n\u2514\u2500\u2500
    source\n    \u251C\u2500\u2500 another-file.txt  # BAM! New file still here...\n
    \   \u251C\u2500\u2500 docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2
    directories, 3 files\n</pre></div>\n\n</pre>\n\n<h2 id=\"few-things\">Few Things
    <a class=\"header-anchor\" href=\"#few-things\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ol>\n<li>\n<p><code>cp</code>
    as noted before, creates new <code>inodes</code> and so if I were to have <code>cp
    -r</code>\nthat <code>source</code> directory to <code>target</code> then the
    container would've dropped\ner exec source-app-1 touch /usr/share/nginx/html/another-file.txc
    in /tmp/foo  \uF427 (dev) \U000F0484 \U000F150E NO PYTHON ENVIORNMENT SET t\n<code>another-file.txt</code>
    to <code>/tmp/source</code> and we'd be in a pretty confusing state</p>\n</li>\n<li>\n<p>Let
    me stress again the importance of managing your docker volumes in a sane\nway...
    I have on any of my hosts a <code>/path/to/docker/data</code> which is backed
    up\nin a way that makes sense for the host (usually zfs + sanoid, otherwise restic\nbackup
    TO a remote zfs dataset - see\n<a class=\"wikilink\" href=\"/using-restic-to-backup-my-home-directory#Intro\">using-restic-to-backup-my-home-directory#Intro</a>)</p>\n</li>\n</ol>\n\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-08-02 13:01:58\ntemplateKey: blog-post\ntitle: Docker Volume
    Mounts Link to an Inode\npublished: True\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png\"\ntags:\n
    \ - docker\n  - compose\n  - tech\n\n---\n\ndocker bind mounts are specified as
    filepaths - this is very intuitive. I want\n/path/to/directory on my host to be
    shared with /another/path/foo in a\ncontainer. But what if /path/to/directory
    on the host is moved?\n\nThis is a situation I have found myself in at home and
    it turns out that I'm\nactually in almost zero trouble thankfully...\n\nTLDR -
    I have a bunch of compose stacks in\n/home/projects/homelab-compose/<host>/<application>
    and I want to move them to\n/home/projects/homelap-mono/compose/<host>/<application>\n\nI
    don't want to take down all my stacks to do this because I don't yet have a\nconvenient
    way to do it - but can I just `mv .../homelab-compose\n.../homelab-mono/compose`
    and be done with it?\n\nThe issue is that some of my stacks use local volume mounts
    - ie. there is a\ndata volume on the host in\n/home/projects/homelab-compose/<host><application>/docker-data
    for some of the\napplications... can I just move everything and docker is nonethewiser?\n\nTurns
    out the answer is mostly `yes` with some caveats to keep in mind..\n\nLet's start
    with why it works and then show an example...\n\n## Why\n\nThis works because
    of how docker interprets the bind mount location initially\nand with how `mv`
    is different from `cp`. When you speicify a volume mount for\ndocker, the engine
    determines which [[inode]] contains the metadata for the\nfilesystem object referenced
    by the original volume path `/path/to/directory`.\nI think about this like a string
    path is a pointer to a lower level identifier\ncloser to the filesystem - if that
    pointer changes it doesn't affect the\npre-existing inode or data. So docker uses
    the inode that `/path/to/directory`\npoints to when the container starts up.\n\nThe
    slight convenience in my case is that `mv` maintains the existing inode and\nso
    the new filepath is irrelevant to that existing container that was spun up\nwith
    a now-non-existent host filepath.\n\nSo if you can imagine then - I spun up several
    containers in\n`///homelab-compose/...` with many stacks - and I want to just
    move all the\nconfig files to new repo... thankfully, I actually can *just `mv`*
    everything\nand because the `inode` locations dont' change, the stacks are fine!\n\n!!!
    warning \"caveat\"\n\n    Is the next issue apparent? What happens to those files
    whose volume mount configurations specify .../homelab-compose/...? Well, if the
    stacks are brought down and back up then docker will create that filepath on the
    host and a new inode reference will be had by all... so that's a problem easily
    mitigated by some string replacement!\n\n!!! note \"another note\"\n\n\n    Perhaps
    just don't keep data next to your configuration either... In most of my stacks
    I have a determined docker volume that's backed up etc. on my hosts and that's
    what I'm moving towards on my desktop, but as of right now I've put myself in
    an odd situation via not participating in a proper thinking exercise when standing
    up all these stacks on my desktop\n\n## Example\n\nFinally let's just see it in
    action quickly...\n\nI have a directory `/tmp/foo/source` with a compose file
    in it.\n\n```\n\u276F tree source       \nsource\n\u2514\u2500\u2500 docker-compose.yml\n```\n\nThat
    file is simple:\n\n```yaml\nservices:\n  app:\n    image: nginx\n    ports:\n
    \     - \"8070:80\"\n    volumes:\n      - /tmp/foo/source:/usr/share/nginx/html\n```\n\nNow
    I can spin that container up, exec in, drop a file in `/usr/share/nginx/html`
    and we'll see it in `/tmp/foo/source` as expected...\n\n```bash\nnic in /tmp/foo
    \ \uF427 (dev)\n\u276F docker exec source-app-1 touch /usr/share/nginx/html/file.txt\n\nnic
    in /tmp/foo  \uF427 (dev)\n\u276F tree source                                                       \nsource\n\u251C\u2500\u2500
    docker-compose.yml\n\u2514\u2500\u2500 file.txt\n\n1 directory, 2 files\n\n```\n\nNow
    let's `mv` the `source` directory somewhere else and see what happens\n\n```\nnic
    in /tmp/foo  \uF427 (dev)\n\u276F mv source target \n\nnic in /tmp/foo  \uF427
    (dev)\n\u276F tree target \ntarget\n\u2514\u2500\u2500 source\n    \u251C\u2500\u2500
    docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2 directories, 2 files\n\n```\n\nOK
    everything is there - now let's drop another file in the container - remember
    the compose file still has the host path as `/tmp/foo/source`, not `/tmp/foo/target/source`.\n\n```\nnic
    in /tmp/foo  \uF427 (dev)\n\u276F docker exec source-app-1 touch /usr/share/nginx/html/another-file.txt\n\nnic
    in /tmp/foo  \uF427 (dev)\n\u276F tree target                                                          \ntarget\n\u2514\u2500\u2500
    source\n    \u251C\u2500\u2500 another-file.txt  # BAM! New file still here...\n
    \   \u251C\u2500\u2500 docker-compose.yml\n    \u2514\u2500\u2500 file.txt\n\n2
    directories, 3 files\n```\n## Few Things\n1. `cp` as noted before, creates new
    `inodes` and so if I were to have `cp -r`\n   that `source` directory to `target`
    then the container would've dropped\ner exec source-app-1 touch /usr/share/nginx/html/another-file.txc
    in /tmp/foo  \uF427 (dev) \U000F0484 \U000F150E NO PYTHON ENVIORNMENT SET t\n`another-file.txt`
    to `/tmp/source` and we'd be in a pretty confusing state\n\n2. Let me stress again
    the importance of managing your docker volumes in a sane\n   way... I have on
    any of my hosts a `/path/to/docker/data` which is backed up\nin a way that makes
    sense for the host (usually zfs + sanoid, otherwise restic\nbackup TO a remote
    zfs dataset - see\n[[using-restic-to-backup-my-home-directory#Intro]])\n"
published: true
slug: docker-volume-mounts-link-to-an-inode
title: Docker Volume Mounts Link to an Inode


---

docker bind mounts are specified as filepaths - this is very intuitive. I want
/path/to/directory on my host to be shared with /another/path/foo in a
container. But what if /path/to/directory on the host is moved?

This is a situation I have found myself in at home and it turns out that I'm
actually in almost zero trouble thankfully...

TLDR - I have a bunch of compose stacks in
/home/projects/homelab-compose/<host>/<application> and I want to move them to
/home/projects/homelap-mono/compose/<host>/<application>

I don't want to take down all my stacks to do this because I don't yet have a
convenient way to do it - but can I just `mv .../homelab-compose
.../homelab-mono/compose` and be done with it?

The issue is that some of my stacks use local volume mounts - ie. there is a
data volume on the host in
/home/projects/homelab-compose/<host><application>/docker-data for some of the
applications... can I just move everything and docker is nonethewiser?

Turns out the answer is mostly `yes` with some caveats to keep in mind..

Let's start with why it works and then show an example...

## Why

This works because of how docker interprets the bind mount location initially
and with how `mv` is different from `cp`. When you speicify a volume mount for
docker, the engine determines which [[inode]] contains the metadata for the
filesystem object referenced by the original volume path `/path/to/directory`.
I think about this like a string path is a pointer to a lower level identifier
closer to the filesystem - if that pointer changes it doesn't affect the
pre-existing inode or data. So docker uses the inode that `/path/to/directory`
points to when the container starts up.

The slight convenience in my case is that `mv` maintains the existing inode and
so the new filepath is irrelevant to that existing container that was spun up
with a now-non-existent host filepath.

So if you can imagine then - I spun up several containers in
`///homelab-compose/...` with many stacks - and I want to just move all the
config files to new repo... thankfully, I actually can *just `mv`* everything
and because the `inode` locations dont' change, the stacks are fine!

!!! warning "caveat"

    Is the next issue apparent? What happens to those files whose volume mount configurations specify .../homelab-compose/...? Well, if the stacks are brought down and back up then docker will create that filepath on the host and a new inode reference will be had by all... so that's a problem easily mitigated by some string replacement!

!!! note "another note"


    Perhaps just don't keep data next to your configuration either... In most of my stacks I have a determined docker volume that's backed up etc. on my hosts and that's what I'm moving towards on my desktop, but as of right now I've put myself in an odd situation via not participating in a proper thinking exercise when standing up all these stacks on my desktop

## Example

Finally let's just see it in action quickly...

I have a directory `/tmp/foo/source` with a compose file in it.

```
❯ tree source       
source
└── docker-compose.yml
```

That file is simple:

```yaml
services:
  app:
    image: nginx
    ports:
      - "8070:80"
    volumes:
      - /tmp/foo/source:/usr/share/nginx/html
```

Now I can spin that container up, exec in, drop a file in `/usr/share/nginx/html` and we'll see it in `/tmp/foo/source` as expected...

```bash
nic in /tmp/foo   (dev)
❯ docker exec source-app-1 touch /usr/share/nginx/html/file.txt

nic in /tmp/foo   (dev)
❯ tree source                                                       
source
├── docker-compose.yml
└── file.txt

1 directory, 2 files

```

Now let's `mv` the `source` directory somewhere else and see what happens

```
nic in /tmp/foo   (dev)
❯ mv source target 

nic in /tmp/foo   (dev)
❯ tree target 
target
└── source
    ├── docker-compose.yml
    └── file.txt

2 directories, 2 files

```

OK everything is there - now let's drop another file in the container - remember the compose file still has the host path as `/tmp/foo/source`, not `/tmp/foo/target/source`.

```
nic in /tmp/foo   (dev)
❯ docker exec source-app-1 touch /usr/share/nginx/html/another-file.txt

nic in /tmp/foo   (dev)
❯ tree target                                                          
target
└── source
    ├── another-file.txt  # BAM! New file still here...
    ├── docker-compose.yml
    └── file.txt

2 directories, 3 files
```
## Few Things
1. `cp` as noted before, creates new `inodes` and so if I were to have `cp -r`
   that `source` directory to `target` then the container would've dropped
er exec source-app-1 touch /usr/share/nginx/html/another-file.txc in /tmp/foo   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET t
`another-file.txt` to `/tmp/source` and we'd be in a pretty confusing state

2. Let me stress again the importance of managing your docker volumes in a sane
   way... I have on any of my hosts a `/path/to/docker/data` which is backed up
in a way that makes sense for the host (usually zfs + sanoid, otherwise restic
backup TO a remote zfs dataset - see
[[using-restic-to-backup-my-home-directory#Intro]])