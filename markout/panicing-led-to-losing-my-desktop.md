---
content: 'Okay, I need to take a verbal note about what I did and what I should have
  done in trying to recover my desktop environment.

  So I had a backup based on restic for my home directory, but it was really lazy
  and I never really learned it.

  and that home directory got too big for where I was going to end up restoring it
  to.

  So my current  system was on a 4 terabyte drive and I was gonna have to drop to
  a 500 gig with a 2 terabyte external attached storage.

  Now the makeup of my desktop was a 4 terabyte SSD that was going bad.

  A 500 gig SSD, that was going to be my new operating system boot disk, a 2 terabyte
  disk that I never started using as storage but wanted to and then forgot about.

  But then the kicker is a 4 terabyte rust disk as well, which was a ZFS pool.

  And so what I did is I live booted into an Ubuntu server environment, mounted my
  home directory from the 4 terabyte SSD, and tried to continue my rustic backup to
  my NAS, like an idiot.

  But then I also tried to prune it by only backing up like a few projects because
  I was getting worried about time.

  But then over the course of the whole thing, it''s taken me now, you know, over
  a week to solve this.

  So this has just been a ridiculous waste.

  So I downloaded open code and had it help me write the right excludes and stuff,
  just write in my RESTIC backup script and got it back up going.

  And now I have failed to install POP or Ubuntu onto the new disc, but I reinstalled
  Aurora onto the new 500 gig disk and realized I don''t have Firefox tabs.

  My SSH keys are in that Restic backup.

  Everything is in that rustic backup.

  But you know what I have is I have that 2 terabyte disk mounted just fine as a ZFS
  dataset.

  And what I should have done was just our synced everything from the 4 terabyte SSD
  in my home directory to the 2 terabyte disk.

  which I had already formatted as a ZFS data, as a Z pool with data sets.

  So I could have made a data set for my home directory right then and there and could
  have just R synced everything.

  attached it here in the new Aurora instance, Arcing to everything back over, kind
  of done a little switcheroo with the direction of the back up there, or just flushed
  it and started the new one, and I''d be up and running.

  And anyway, I guess would also conclude the discussion of what I should have done,
  which is that.

  I should, and oh, and a detail I left out is after the Ubuntu live desktop environment,

  and before the Aurora install is I removed the 4 terabyte disk from the motherboard,
  which was like a full PC tear down.

  And that had to happen because I wasn''t really able to boot anywhere, because that
  4 terabyte disk had some bad blocks that were inhibiting the boot process.

  With everything I was loading as it was like trying to, you know, do disk discovery
  or whatever, I think anyway, that disk was holding everything up.

  When I finally got it to Aurora, I didn''t have the old one to just mount an R sync
  two, and I just feel so ridiculous that I had that 2 terabyte and the 4 terabyte
  disk that I completely have failed to even utilize in this whole situation, the
  spinning rust, to have uses a backup target.

  All local, didn''t even have to go to my house at all, didn''t have to use the network
  at all.

  Yeah, just feel so stupid about it.'
date: 2026-04-24
description: 'Okay, I need to take a verbal note about what I did and what I should
  have done in trying to recover my desktop environment.

  So I had a backup based on restic f'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Panicing Led to
    Losing My Desktop</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Okay, I need to take a verbal note about what I did and what I should
    have done in trying to recover my desktop environment.\nSo I had a backup based
    on restic f\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Panicing Led to Losing My Desktop | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/panicing-led-to-losing-my-desktop\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Panicing Led to Losing My Desktop | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Okay, I need to take a verbal note about what I did and what I should
    have done in trying to recover my desktop environment.\nSo I had a backup based
    on restic f\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/panicing-led-to-losing-my-desktop</span>\n
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
    mb-4 post-title-large\">Panicing Led to Losing My Desktop</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-24\">\n
    \           April 24, 2026\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/backup/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #backup\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>Okay, I need to take a verbal note
    about what I did and what I should have done in trying to recover my desktop environment.\nSo
    I had a backup based on restic for my home directory, but it was really lazy and
    I never really learned it.\nand that home directory got too big for where I was
    going to end up restoring it to.\nSo my current  system was on a 4 terabyte drive
    and I was gonna have to drop to a 500 gig with a 2 terabyte external attached
    storage.\nNow the makeup of my desktop was a 4 terabyte SSD that was going bad.\nA
    500 gig SSD, that was going to be my new operating system boot disk, a 2 terabyte
    disk that I never started using as storage but wanted to and then forgot about.\nBut
    then the kicker is a 4 terabyte rust disk as well, which was a ZFS pool.\nAnd
    so what I did is I live booted into an Ubuntu server environment, mounted my home
    directory from the 4 terabyte SSD, and tried to continue my rustic backup to my
    NAS, like an idiot.\nBut then I also tried to prune it by only backing up like
    a few projects because I was getting worried about time.\nBut then over the course
    of the whole thing, it's taken me now, you know, over a week to solve this.\nSo
    this has just been a ridiculous waste.\nSo I downloaded open code and had it help
    me write the right excludes and stuff, just write in my RESTIC backup script and
    got it back up going.\nAnd now I have failed to install POP or Ubuntu onto the
    new disc, but I reinstalled Aurora onto the new 500 gig disk and realized I don't
    have Firefox tabs.\nMy SSH keys are in that Restic backup.\nEverything is in that
    rustic backup.\nBut you know what I have is I have that 2 terabyte disk mounted
    just fine as a ZFS dataset.\nAnd what I should have done was just our synced everything
    from the 4 terabyte SSD in my home directory to the 2 terabyte disk.\nwhich I
    had already formatted as a ZFS data, as a Z pool with data sets.\nSo I could have
    made a data set for my home directory right then and there and could have just
    R synced everything.\nattached it here in the new Aurora instance, Arcing to everything
    back over, kind of done a little switcheroo with the direction of the back up
    there, or just flushed it and started the new one, and I'd be up and running.\nAnd
    anyway, I guess would also conclude the discussion of what I should have done,
    which is that.\nI should, and oh, and a detail I left out is after the Ubuntu
    live desktop environment,\nand before the Aurora install is I removed the 4 terabyte
    disk from the motherboard, which was like a full PC tear down.\nAnd that had to
    happen because I wasn't really able to boot anywhere, because that 4 terabyte
    disk had some bad blocks that were inhibiting the boot process.\nWith everything
    I was loading as it was like trying to, you know, do disk discovery or whatever,
    I think anyway, that disk was holding everything up.\nWhen I finally got it to
    Aurora, I didn't have the old one to just mount an R sync two, and I just feel
    so ridiculous that I had that 2 terabyte and the 4 terabyte disk that I completely
    have failed to even utilize in this whole situation, the spinning rust, to have
    uses a backup target.\nAll local, didn't even have to go to my house at all, didn't
    have to use the network at all.\nYeah, just feel so stupid about it.</p>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Panicing Led to Losing
    My Desktop</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Okay, I need to take
    a verbal note about what I did and what I should have done in trying to recover
    my desktop environment.\nSo I had a backup based on restic f\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Panicing Led to Losing My Desktop | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/panicing-led-to-losing-my-desktop\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Panicing Led to Losing My Desktop | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Okay, I need to take a verbal note about what I did and what I should
    have done in trying to recover my desktop environment.\nSo I had a backup based
    on restic f\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Panicing Led to Losing My Desktop</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-24\">\n
    \           April 24, 2026\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/backup/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #backup\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Panicing Led to Losing My Desktop</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-24\">\n
    \           April 24, 2026\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/backup/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #backup\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>Okay, I need to take a verbal note
    about what I did and what I should have done in trying to recover my desktop environment.\nSo
    I had a backup based on restic for my home directory, but it was really lazy and
    I never really learned it.\nand that home directory got too big for where I was
    going to end up restoring it to.\nSo my current  system was on a 4 terabyte drive
    and I was gonna have to drop to a 500 gig with a 2 terabyte external attached
    storage.\nNow the makeup of my desktop was a 4 terabyte SSD that was going bad.\nA
    500 gig SSD, that was going to be my new operating system boot disk, a 2 terabyte
    disk that I never started using as storage but wanted to and then forgot about.\nBut
    then the kicker is a 4 terabyte rust disk as well, which was a ZFS pool.\nAnd
    so what I did is I live booted into an Ubuntu server environment, mounted my home
    directory from the 4 terabyte SSD, and tried to continue my rustic backup to my
    NAS, like an idiot.\nBut then I also tried to prune it by only backing up like
    a few projects because I was getting worried about time.\nBut then over the course
    of the whole thing, it's taken me now, you know, over a week to solve this.\nSo
    this has just been a ridiculous waste.\nSo I downloaded open code and had it help
    me write the right excludes and stuff, just write in my RESTIC backup script and
    got it back up going.\nAnd now I have failed to install POP or Ubuntu onto the
    new disc, but I reinstalled Aurora onto the new 500 gig disk and realized I don't
    have Firefox tabs.\nMy SSH keys are in that Restic backup.\nEverything is in that
    rustic backup.\nBut you know what I have is I have that 2 terabyte disk mounted
    just fine as a ZFS dataset.\nAnd what I should have done was just our synced everything
    from the 4 terabyte SSD in my home directory to the 2 terabyte disk.\nwhich I
    had already formatted as a ZFS data, as a Z pool with data sets.\nSo I could have
    made a data set for my home directory right then and there and could have just
    R synced everything.\nattached it here in the new Aurora instance, Arcing to everything
    back over, kind of done a little switcheroo with the direction of the back up
    there, or just flushed it and started the new one, and I'd be up and running.\nAnd
    anyway, I guess would also conclude the discussion of what I should have done,
    which is that.\nI should, and oh, and a detail I left out is after the Ubuntu
    live desktop environment,\nand before the Aurora install is I removed the 4 terabyte
    disk from the motherboard, which was like a full PC tear down.\nAnd that had to
    happen because I wasn't really able to boot anywhere, because that 4 terabyte
    disk had some bad blocks that were inhibiting the boot process.\nWith everything
    I was loading as it was like trying to, you know, do disk discovery or whatever,
    I think anyway, that disk was holding everything up.\nWhen I finally got it to
    Aurora, I didn't have the old one to just mount an R sync two, and I just feel
    so ridiculous that I had that 2 terabyte and the 4 terabyte disk that I completely
    have failed to even utilize in this whole situation, the spinning rust, to have
    uses a backup target.\nAll local, didn't even have to go to my house at all, didn't
    have to use the network at all.\nYeah, just feel so stupid about it.</p>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Panicing
    Led to Losing My Desktop</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Okay, I need to take a verbal note about what I did and what I should
    have done in trying to recover my desktop environment.\nSo I had a backup based
    on restic f\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Panicing Led to Losing My Desktop | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/panicing-led-to-losing-my-desktop\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Panicing Led to Losing My Desktop | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Okay, I need to take a verbal note about what I did and what I should
    have done in trying to recover my desktop environment.\nSo I had a backup based
    on restic f\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/panicing-led-to-losing-my-desktop</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>Okay,
    I need to take a verbal note about what I did and what I should have done in trying
    to recover my desktop environment.\nSo I had a backup based on restic for my home
    directory, but it was really lazy and I never really learned it.\nand that home
    directory got too big for where I was going to end up restoring it to.\nSo my
    current  system was on a 4 terabyte drive and I was gonna have to drop to a 500
    gig with a 2 terabyte external attached storage.\nNow the makeup of my desktop
    was a 4 terabyte SSD that was going bad.\nA 500 gig SSD, that was going to be
    my new operating system boot disk, a 2 terabyte disk that I never started using
    as storage but wanted to and then forgot about.\nBut then the kicker is a 4 terabyte
    rust disk as well, which was a ZFS pool.\nAnd so what I did is I live booted into
    an Ubuntu server environment, mounted my home directory from the 4 terabyte SSD,
    and tried to continue my rustic backup to my NAS, like an idiot.\nBut then I also
    tried to prune it by only backing up like a few projects because I was getting
    worried about time.\nBut then over the course of the whole thing, it's taken me
    now, you know, over a week to solve this.\nSo this has just been a ridiculous
    waste.\nSo I downloaded open code and had it help me write the right excludes
    and stuff, just write in my RESTIC backup script and got it back up going.\nAnd
    now I have failed to install POP or Ubuntu onto the new disc, but I reinstalled
    Aurora onto the new 500 gig disk and realized I don't have Firefox tabs.\nMy SSH
    keys are in that Restic backup.\nEverything is in that rustic backup.\nBut you
    know what I have is I have that 2 terabyte disk mounted just fine as a ZFS dataset.\nAnd
    what I should have done was just our synced everything from the 4 terabyte SSD
    in my home directory to the 2 terabyte disk.\nwhich I had already formatted as
    a ZFS data, as a Z pool with data sets.\nSo I could have made a data set for my
    home directory right then and there and could have just R synced everything.\nattached
    it here in the new Aurora instance, Arcing to everything back over, kind of done
    a little switcheroo with the direction of the back up there, or just flushed it
    and started the new one, and I'd be up and running.\nAnd anyway, I guess would
    also conclude the discussion of what I should have done, which is that.\nI should,
    and oh, and a detail I left out is after the Ubuntu live desktop environment,\nand
    before the Aurora install is I removed the 4 terabyte disk from the motherboard,
    which was like a full PC tear down.\nAnd that had to happen because I wasn't really
    able to boot anywhere, because that 4 terabyte disk had some bad blocks that were
    inhibiting the boot process.\nWith everything I was loading as it was like trying
    to, you know, do disk discovery or whatever, I think anyway, that disk was holding
    everything up.\nWhen I finally got it to Aurora, I didn't have the old one to
    just mount an R sync two, and I just feel so ridiculous that I had that 2 terabyte
    and the 4 terabyte disk that I completely have failed to even utilize in this
    whole situation, the spinning rust, to have uses a backup target.\nAll local,
    didn't even have to go to my house at all, didn't have to use the network at all.\nYeah,
    just feel so stupid about it.</p>\n\n        </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2026-04-24 19:24:00\ntemplateKey: blog-post\ntitle: Panicing
    Led to Losing My Desktop\npublished: False\ntags:\n  - backup\n  - tech\n\n---\n\nOkay,
    I need to take a verbal note about what I did and what I should have done in trying
    to recover my desktop environment.\nSo I had a backup based on restic for my home
    directory, but it was really lazy and I never really learned it.\nand that home
    directory got too big for where I was going to end up restoring it to.\nSo my
    current  system was on a 4 terabyte drive and I was gonna have to drop to a 500
    gig with a 2 terabyte external attached storage.\nNow the makeup of my desktop
    was a 4 terabyte SSD that was going bad.\nA 500 gig SSD, that was going to be
    my new operating system boot disk, a 2 terabyte disk that I never started using
    as storage but wanted to and then forgot about.\nBut then the kicker is a 4 terabyte
    rust disk as well, which was a ZFS pool.\nAnd so what I did is I live booted into
    an Ubuntu server environment, mounted my home directory from the 4 terabyte SSD,
    and tried to continue my rustic backup to my NAS, like an idiot.\nBut then I also
    tried to prune it by only backing up like a few projects because I was getting
    worried about time.\nBut then over the course of the whole thing, it's taken me
    now, you know, over a week to solve this.\nSo this has just been a ridiculous
    waste.\nSo I downloaded open code and had it help me write the right excludes
    and stuff, just write in my RESTIC backup script and got it back up going.\nAnd
    now I have failed to install POP or Ubuntu onto the new disc, but I reinstalled
    Aurora onto the new 500 gig disk and realized I don't have Firefox tabs.\nMy SSH
    keys are in that Restic backup.\nEverything is in that rustic backup.\nBut you
    know what I have is I have that 2 terabyte disk mounted just fine as a ZFS dataset.\nAnd
    what I should have done was just our synced everything from the 4 terabyte SSD
    in my home directory to the 2 terabyte disk.\nwhich I had already formatted as
    a ZFS data, as a Z pool with data sets.\nSo I could have made a data set for my
    home directory right then and there and could have just R synced everything.\nattached
    it here in the new Aurora instance, Arcing to everything back over, kind of done
    a little switcheroo with the direction of the back up there, or just flushed it
    and started the new one, and I'd be up and running.\nAnd anyway, I guess would
    also conclude the discussion of what I should have done, which is that.\nI should,
    and oh, and a detail I left out is after the Ubuntu live desktop environment,\nand
    before the Aurora install is I removed the 4 terabyte disk from the motherboard,
    which was like a full PC tear down.\nAnd that had to happen because I wasn't really
    able to boot anywhere, because that 4 terabyte disk had some bad blocks that were
    inhibiting the boot process.\nWith everything I was loading as it was like trying
    to, you know, do disk discovery or whatever, I think anyway, that disk was holding
    everything up.\nWhen I finally got it to Aurora, I didn't have the old one to
    just mount an R sync two, and I just feel so ridiculous that I had that 2 terabyte
    and the 4 terabyte disk that I completely have failed to even utilize in this
    whole situation, the spinning rust, to have uses a backup target.\nAll local,
    didn't even have to go to my house at all, didn't have to use the network at all.\nYeah,
    just feel so stupid about it.\n\n\n"
published: false
slug: panicing-led-to-losing-my-desktop
title: Panicing Led to Losing My Desktop


---

Okay, I need to take a verbal note about what I did and what I should have done in trying to recover my desktop environment.
So I had a backup based on restic for my home directory, but it was really lazy and I never really learned it.
and that home directory got too big for where I was going to end up restoring it to.
So my current  system was on a 4 terabyte drive and I was gonna have to drop to a 500 gig with a 2 terabyte external attached storage.
Now the makeup of my desktop was a 4 terabyte SSD that was going bad.
A 500 gig SSD, that was going to be my new operating system boot disk, a 2 terabyte disk that I never started using as storage but wanted to and then forgot about.
But then the kicker is a 4 terabyte rust disk as well, which was a ZFS pool.
And so what I did is I live booted into an Ubuntu server environment, mounted my home directory from the 4 terabyte SSD, and tried to continue my rustic backup to my NAS, like an idiot.
But then I also tried to prune it by only backing up like a few projects because I was getting worried about time.
But then over the course of the whole thing, it's taken me now, you know, over a week to solve this.
So this has just been a ridiculous waste.
So I downloaded open code and had it help me write the right excludes and stuff, just write in my RESTIC backup script and got it back up going.
And now I have failed to install POP or Ubuntu onto the new disc, but I reinstalled Aurora onto the new 500 gig disk and realized I don't have Firefox tabs.
My SSH keys are in that Restic backup.
Everything is in that rustic backup.
But you know what I have is I have that 2 terabyte disk mounted just fine as a ZFS dataset.
And what I should have done was just our synced everything from the 4 terabyte SSD in my home directory to the 2 terabyte disk.
which I had already formatted as a ZFS data, as a Z pool with data sets.
So I could have made a data set for my home directory right then and there and could have just R synced everything.
attached it here in the new Aurora instance, Arcing to everything back over, kind of done a little switcheroo with the direction of the back up there, or just flushed it and started the new one, and I'd be up and running.
And anyway, I guess would also conclude the discussion of what I should have done, which is that.
I should, and oh, and a detail I left out is after the Ubuntu live desktop environment,
and before the Aurora install is I removed the 4 terabyte disk from the motherboard, which was like a full PC tear down.
And that had to happen because I wasn't really able to boot anywhere, because that 4 terabyte disk had some bad blocks that were inhibiting the boot process.
With everything I was loading as it was like trying to, you know, do disk discovery or whatever, I think anyway, that disk was holding everything up.
When I finally got it to Aurora, I didn't have the old one to just mount an R sync two, and I just feel so ridiculous that I had that 2 terabyte and the 4 terabyte disk that I completely have failed to even utilize in this whole situation, the spinning rust, to have uses a backup target.
All local, didn't even have to go to my house at all, didn't have to use the network at all.
Yeah, just feel so stupid about it.