---
content: "## network\n\nSpectrum brings internet in via coax to their modem. The modem
  feeds the Eero\n(acting as gateway, handing out 192.168.4.0/24). Downstream of the
  Eero is the\nold Spectrum router still emitting an SSID on 192.168.1.0/24 \u2014
  needs turning\noff (requires Spectrum admin access).\n\n## printer\n\nThe printer
  was originally self-assigned static IP 192.168.1.165. After\nswitching to Eero DHCP
  (192.168.4.0/24), it now gets 192.168.4.25. The admin\ndesktop has a static rule
  configured for it, but the port config on the desktop\nstill had the old 192.168.1.165
  address \u2014 had to update it to point to\n192.168.4.25. The port name is stuck
  as IP_192.168.1.165 (couldn't be changed).\n\nThe DHCP-assigned 192.168.4.25 is
  subject to change \u2014 need to iron that out.\n\n### admin password reset\n\n1.
  From the main menu, tap **Counter** \u2192 **Display Keyboard**\n2. Enter: `stop,
  0, 0, stop, 0, 1` via the on-display keypad\n3. A password prompt appears \u2014
  enter: `9272 9272 9272 9272` (9272 \xD7 4)\n4. Tap **End** (this is \"OK\")\n5.
  From the new menu: `stop, 0` on the on-display keypad, then `C` on the keypad\n6.
  This opens the admin password reset menu\n7. Set new password to: `12345678`\n\n>
  NOTE: I put a sticky note on the side of the printer with these instructions\n\n###
  how to get to network settings\n\nAfter the admin password reset, I navigated through
  the menus to find the\nnetwork settings and changed from static IP to **Auto (DHCP)**.
  Didn't write\ndown the exact path \u2014 next time I'm at the printer I need to
  document it.\n\n## todo\n\n- [ ] turn off \"Olivet Bible Church\" SSID on the old
  Spectrum router (requires admin portal access)\n- [ ] wall-mount Eero 2 to extend
  range to kid's wing\n- [ ] consider getting a 4th Eero for Fellowship Hall coverage\n-
  [ ] set the printer to a DHCP reservation on the Eero so its IP doesn't change\n-
  [ ] fix the shared password between OBC-Admin and OBC-Guest (currently the same)\n-
  [ ] re-run the damaged ethernet cable from the networking closet to the sanctuary\n
  \ - once done, plug blue #4 into the switch, feeding Eero 3 at the tech bar\n  -
  Eero 3 can then feed Switch 3 for the tech bar devices\n  - **Eero 3 might be able
  to do this without a new run depending on strength of their back-haul**\n\n## topology\n\n![20260517133911_bfaa446e.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260517133911_bfaa446e.png)"
date: 2026-05-16
description: 'network Spectrum brings internet in via coax to their modem. The modem
  feeds the Eero

  (acting as gateway, handing out 192.168.4.0/24). Downstream of the Eero is'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>OBC Networking</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"network Spectrum brings internet in via
    coax to their modem. The modem feeds the Eero\n(acting as gateway, handing out
    192.168.4.0/24). Downstream of the Eero is\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"OBC Networking | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/obc-networking\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"OBC Networking | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"network Spectrum brings internet in via coax to their modem. The modem
    feeds the Eero\n(acting as gateway, handing out 192.168.4.0/24). Downstream of
    the Eero is\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/obc-networking</span>\n        </div>\n
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
    mb-4 post-title-large\">OBC Networking</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-16\">\n            May
    16, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/olivet-bible-church/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #olivet-bible-church\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"network\">network <a class=\"header-anchor\"
    href=\"#network\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Spectrum brings internet
    in via coax to their modem. The modem feeds the Eero\n(acting as gateway, handing
    out 192.168.4.0/24). Downstream of the Eero is the\nold Spectrum router still
    emitting an SSID on 192.168.1.0/24 \u2014 needs turning\noff (requires Spectrum
    admin access).</p>\n<h2 id=\"printer\">printer <a class=\"header-anchor\" href=\"#printer\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The printer was originally
    self-assigned static IP 192.168.1.165. After\nswitching to Eero DHCP (192.168.4.0/24),
    it now gets 192.168.4.25. The admin\ndesktop has a static rule configured for
    it, but the port config on the desktop\nstill had the old 192.168.1.165 address
    \u2014 had to update it to point to\n192.168.4.25. The port name is stuck as IP_192.168.1.165
    (couldn't be changed).</p>\n<p>The DHCP-assigned 192.168.4.25 is subject to change
    \u2014 need to iron that out.</p>\n<h3>admin password reset</h3>\n<ol>\n<li>From
    the main menu, tap <strong>Counter</strong> \u2192 <strong>Display Keyboard</strong></li>\n<li>Enter:
    <code>stop, 0, 0, stop, 0, 1</code> via the on-display keypad</li>\n<li>A password
    prompt appears \u2014 enter: <code>9272 9272 9272 9272</code> (9272 \xD7 4)</li>\n<li>Tap
    <strong>End</strong> (this is &quot;OK&quot;)</li>\n<li>From the new menu: <code>stop,
    0</code> on the on-display keypad, then <code>C</code> on the keypad</li>\n<li>This
    opens the admin password reset menu</li>\n<li>Set new password to: <code>12345678</code></li>\n</ol>\n<blockquote>\n<p>NOTE:
    I put a sticky note on the side of the printer with these instructions</p>\n</blockquote>\n<h3>how
    to get to network settings</h3>\n<p>After the admin password reset, I navigated
    through the menus to find the\nnetwork settings and changed from static IP to
    <strong>Auto (DHCP)</strong>. Didn't write\ndown the exact path \u2014 next time
    I'm at the printer I need to document it.</p>\n<h2 id=\"todo\">todo <a class=\"header-anchor\"
    href=\"#todo\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>[ ] turn off
    &quot;Olivet Bible Church&quot; SSID on the old Spectrum router (requires admin
    portal access)</li>\n<li>[ ] wall-mount Eero 2 to extend range to kid's wing</li>\n<li>[
    ] consider getting a 4th Eero for Fellowship Hall coverage</li>\n<li>[ ] set the
    printer to a DHCP reservation on the Eero so its IP doesn't change</li>\n<li>[
    ] fix the shared password between OBC-Admin and OBC-Guest (currently the same)</li>\n<li>[
    ] re-run the damaged ethernet cable from the networking closet to the sanctuary\n<ul>\n<li>once
    done, plug blue #4 into the switch, feeding Eero 3 at the tech bar</li>\n<li>Eero
    3 can then feed Switch 3 for the tech bar devices</li>\n<li><strong>Eero 3 might
    be able to do this without a new run depending on strength of their back-haul</strong></li>\n</ul>\n</li>\n</ul>\n<h2
    id=\"topology\">topology <a class=\"header-anchor\" href=\"#topology\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260517133911_bfaa446e.png\"
    alt=\"20260517133911_bfaa446e.png\" /></p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>OBC Networking</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"network Spectrum brings internet in via
    coax to their modem. The modem feeds the Eero\n(acting as gateway, handing out
    192.168.4.0/24). Downstream of the Eero is\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"OBC Networking | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/obc-networking\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"OBC Networking | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"network Spectrum brings internet in via coax to their modem. The modem
    feeds the Eero\n(acting as gateway, handing out 192.168.4.0/24). Downstream of
    the Eero is\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">OBC Networking</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-16\">\n            May
    16, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/olivet-bible-church/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #olivet-bible-church\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">OBC Networking</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-16\">\n            May
    16, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/olivet-bible-church/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #olivet-bible-church\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"network\">network <a class=\"header-anchor\"
    href=\"#network\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Spectrum brings internet
    in via coax to their modem. The modem feeds the Eero\n(acting as gateway, handing
    out 192.168.4.0/24). Downstream of the Eero is the\nold Spectrum router still
    emitting an SSID on 192.168.1.0/24 \u2014 needs turning\noff (requires Spectrum
    admin access).</p>\n<h2 id=\"printer\">printer <a class=\"header-anchor\" href=\"#printer\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The printer was originally
    self-assigned static IP 192.168.1.165. After\nswitching to Eero DHCP (192.168.4.0/24),
    it now gets 192.168.4.25. The admin\ndesktop has a static rule configured for
    it, but the port config on the desktop\nstill had the old 192.168.1.165 address
    \u2014 had to update it to point to\n192.168.4.25. The port name is stuck as IP_192.168.1.165
    (couldn't be changed).</p>\n<p>The DHCP-assigned 192.168.4.25 is subject to change
    \u2014 need to iron that out.</p>\n<h3>admin password reset</h3>\n<ol>\n<li>From
    the main menu, tap <strong>Counter</strong> \u2192 <strong>Display Keyboard</strong></li>\n<li>Enter:
    <code>stop, 0, 0, stop, 0, 1</code> via the on-display keypad</li>\n<li>A password
    prompt appears \u2014 enter: <code>9272 9272 9272 9272</code> (9272 \xD7 4)</li>\n<li>Tap
    <strong>End</strong> (this is &quot;OK&quot;)</li>\n<li>From the new menu: <code>stop,
    0</code> on the on-display keypad, then <code>C</code> on the keypad</li>\n<li>This
    opens the admin password reset menu</li>\n<li>Set new password to: <code>12345678</code></li>\n</ol>\n<blockquote>\n<p>NOTE:
    I put a sticky note on the side of the printer with these instructions</p>\n</blockquote>\n<h3>how
    to get to network settings</h3>\n<p>After the admin password reset, I navigated
    through the menus to find the\nnetwork settings and changed from static IP to
    <strong>Auto (DHCP)</strong>. Didn't write\ndown the exact path \u2014 next time
    I'm at the printer I need to document it.</p>\n<h2 id=\"todo\">todo <a class=\"header-anchor\"
    href=\"#todo\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>[ ] turn off
    &quot;Olivet Bible Church&quot; SSID on the old Spectrum router (requires admin
    portal access)</li>\n<li>[ ] wall-mount Eero 2 to extend range to kid's wing</li>\n<li>[
    ] consider getting a 4th Eero for Fellowship Hall coverage</li>\n<li>[ ] set the
    printer to a DHCP reservation on the Eero so its IP doesn't change</li>\n<li>[
    ] fix the shared password between OBC-Admin and OBC-Guest (currently the same)</li>\n<li>[
    ] re-run the damaged ethernet cable from the networking closet to the sanctuary\n<ul>\n<li>once
    done, plug blue #4 into the switch, feeding Eero 3 at the tech bar</li>\n<li>Eero
    3 can then feed Switch 3 for the tech bar devices</li>\n<li><strong>Eero 3 might
    be able to do this without a new run depending on strength of their back-haul</strong></li>\n</ul>\n</li>\n</ul>\n<h2
    id=\"topology\">topology <a class=\"header-anchor\" href=\"#topology\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260517133911_bfaa446e.png\"
    alt=\"20260517133911_bfaa446e.png\" /></p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>OBC Networking</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"network Spectrum brings internet in via
    coax to their modem. The modem feeds the Eero\n(acting as gateway, handing out
    192.168.4.0/24). Downstream of the Eero is\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"OBC Networking | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/obc-networking\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"OBC Networking | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"network Spectrum brings internet in via coax to their modem. The modem
    feeds the Eero\n(acting as gateway, handing out 192.168.4.0/24). Downstream of
    the Eero is\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/obc-networking</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"network\">network
    <a class=\"header-anchor\" href=\"#network\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Spectrum brings internet
    in via coax to their modem. The modem feeds the Eero\n(acting as gateway, handing
    out 192.168.4.0/24). Downstream of the Eero is the\nold Spectrum router still
    emitting an SSID on 192.168.1.0/24 \u2014 needs turning\noff (requires Spectrum
    admin access).</p>\n<h2 id=\"printer\">printer <a class=\"header-anchor\" href=\"#printer\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The printer was originally
    self-assigned static IP 192.168.1.165. After\nswitching to Eero DHCP (192.168.4.0/24),
    it now gets 192.168.4.25. The admin\ndesktop has a static rule configured for
    it, but the port config on the desktop\nstill had the old 192.168.1.165 address
    \u2014 had to update it to point to\n192.168.4.25. The port name is stuck as IP_192.168.1.165
    (couldn't be changed).</p>\n<p>The DHCP-assigned 192.168.4.25 is subject to change
    \u2014 need to iron that out.</p>\n<h3>admin password reset</h3>\n<ol>\n<li>From
    the main menu, tap <strong>Counter</strong> \u2192 <strong>Display Keyboard</strong></li>\n<li>Enter:
    <code>stop, 0, 0, stop, 0, 1</code> via the on-display keypad</li>\n<li>A password
    prompt appears \u2014 enter: <code>9272 9272 9272 9272</code> (9272 \xD7 4)</li>\n<li>Tap
    <strong>End</strong> (this is &quot;OK&quot;)</li>\n<li>From the new menu: <code>stop,
    0</code> on the on-display keypad, then <code>C</code> on the keypad</li>\n<li>This
    opens the admin password reset menu</li>\n<li>Set new password to: <code>12345678</code></li>\n</ol>\n<blockquote>\n<p>NOTE:
    I put a sticky note on the side of the printer with these instructions</p>\n</blockquote>\n<h3>how
    to get to network settings</h3>\n<p>After the admin password reset, I navigated
    through the menus to find the\nnetwork settings and changed from static IP to
    <strong>Auto (DHCP)</strong>. Didn't write\ndown the exact path \u2014 next time
    I'm at the printer I need to document it.</p>\n<h2 id=\"todo\">todo <a class=\"header-anchor\"
    href=\"#todo\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>[ ] turn off
    &quot;Olivet Bible Church&quot; SSID on the old Spectrum router (requires admin
    portal access)</li>\n<li>[ ] wall-mount Eero 2 to extend range to kid's wing</li>\n<li>[
    ] consider getting a 4th Eero for Fellowship Hall coverage</li>\n<li>[ ] set the
    printer to a DHCP reservation on the Eero so its IP doesn't change</li>\n<li>[
    ] fix the shared password between OBC-Admin and OBC-Guest (currently the same)</li>\n<li>[
    ] re-run the damaged ethernet cable from the networking closet to the sanctuary\n<ul>\n<li>once
    done, plug blue #4 into the switch, feeding Eero 3 at the tech bar</li>\n<li>Eero
    3 can then feed Switch 3 for the tech bar devices</li>\n<li><strong>Eero 3 might
    be able to do this without a new run depending on strength of their back-haul</strong></li>\n</ul>\n</li>\n</ul>\n<h2
    id=\"topology\">topology <a class=\"header-anchor\" href=\"#topology\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260517133911_bfaa446e.png\"
    alt=\"20260517133911_bfaa446e.png\" /></p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2026-05-16 12:26:46\ntemplateKey: note\ntitle: OBC Networking\npublished:
    False\ntags:\n  - olivet-bible-church\n  - note\n---\n\n## network\n\nSpectrum
    brings internet in via coax to their modem. The modem feeds the Eero\n(acting
    as gateway, handing out 192.168.4.0/24). Downstream of the Eero is the\nold Spectrum
    router still emitting an SSID on 192.168.1.0/24 \u2014 needs turning\noff (requires
    Spectrum admin access).\n\n## printer\n\nThe printer was originally self-assigned
    static IP 192.168.1.165. After\nswitching to Eero DHCP (192.168.4.0/24), it now
    gets 192.168.4.25. The admin\ndesktop has a static rule configured for it, but
    the port config on the desktop\nstill had the old 192.168.1.165 address \u2014
    had to update it to point to\n192.168.4.25. The port name is stuck as IP_192.168.1.165
    (couldn't be changed).\n\nThe DHCP-assigned 192.168.4.25 is subject to change
    \u2014 need to iron that out.\n\n### admin password reset\n\n1. From the main
    menu, tap **Counter** \u2192 **Display Keyboard**\n2. Enter: `stop, 0, 0, stop,
    0, 1` via the on-display keypad\n3. A password prompt appears \u2014 enter: `9272
    9272 9272 9272` (9272 \xD7 4)\n4. Tap **End** (this is \"OK\")\n5. From the new
    menu: `stop, 0` on the on-display keypad, then `C` on the keypad\n6. This opens
    the admin password reset menu\n7. Set new password to: `12345678`\n\n> NOTE: I
    put a sticky note on the side of the printer with these instructions\n\n### how
    to get to network settings\n\nAfter the admin password reset, I navigated through
    the menus to find the\nnetwork settings and changed from static IP to **Auto (DHCP)**.
    Didn't write\ndown the exact path \u2014 next time I'm at the printer I need to
    document it.\n\n## todo\n\n- [ ] turn off \"Olivet Bible Church\" SSID on the
    old Spectrum router (requires admin portal access)\n- [ ] wall-mount Eero 2 to
    extend range to kid's wing\n- [ ] consider getting a 4th Eero for Fellowship Hall
    coverage\n- [ ] set the printer to a DHCP reservation on the Eero so its IP doesn't
    change\n- [ ] fix the shared password between OBC-Admin and OBC-Guest (currently
    the same)\n- [ ] re-run the damaged ethernet cable from the networking closet
    to the sanctuary\n  - once done, plug blue #4 into the switch, feeding Eero 3
    at the tech bar\n  - Eero 3 can then feed Switch 3 for the tech bar devices\n
    \ - **Eero 3 might be able to do this without a new run depending on strength
    of their back-haul**\n\n## topology\n\n![20260517133911_bfaa446e.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260517133911_bfaa446e.png)\n"
published: false
slug: obc-networking
title: OBC Networking


---

## network

Spectrum brings internet in via coax to their modem. The modem feeds the Eero
(acting as gateway, handing out 192.168.4.0/24). Downstream of the Eero is the
old Spectrum router still emitting an SSID on 192.168.1.0/24 — needs turning
off (requires Spectrum admin access).

## printer

The printer was originally self-assigned static IP 192.168.1.165. After
switching to Eero DHCP (192.168.4.0/24), it now gets 192.168.4.25. The admin
desktop has a static rule configured for it, but the port config on the desktop
still had the old 192.168.1.165 address — had to update it to point to
192.168.4.25. The port name is stuck as IP_192.168.1.165 (couldn't be changed).

The DHCP-assigned 192.168.4.25 is subject to change — need to iron that out.

### admin password reset

1. From the main menu, tap **Counter** → **Display Keyboard**
2. Enter: `stop, 0, 0, stop, 0, 1` via the on-display keypad
3. A password prompt appears — enter: `9272 9272 9272 9272` (9272 × 4)
4. Tap **End** (this is "OK")
5. From the new menu: `stop, 0` on the on-display keypad, then `C` on the keypad
6. This opens the admin password reset menu
7. Set new password to: `12345678`

> NOTE: I put a sticky note on the side of the printer with these instructions

### how to get to network settings

After the admin password reset, I navigated through the menus to find the
network settings and changed from static IP to **Auto (DHCP)**. Didn't write
down the exact path — next time I'm at the printer I need to document it.

## todo

- [ ] turn off "Olivet Bible Church" SSID on the old Spectrum router (requires admin portal access)
- [ ] wall-mount Eero 2 to extend range to kid's wing
- [ ] consider getting a 4th Eero for Fellowship Hall coverage
- [ ] set the printer to a DHCP reservation on the Eero so its IP doesn't change
- [ ] fix the shared password between OBC-Admin and OBC-Guest (currently the same)
- [ ] re-run the damaged ethernet cable from the networking closet to the sanctuary
  - once done, plug blue #4 into the switch, feeding Eero 3 at the tech bar
  - Eero 3 can then feed Switch 3 for the tech bar devices
  - **Eero 3 might be able to do this without a new run depending on strength of their back-haul**

## topology

![20260517133911_bfaa446e.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260517133911_bfaa446e.png)