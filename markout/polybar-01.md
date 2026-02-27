---
content: "[polybar](https://github.com/polybar/polybar) is an awesome and super customizable
  status bar for your desktop environment.\n\nI use it with i3-gaps on Ubuntu for
  work and it makes my day just that much better to have a clean and elegant bar with
  the things in it that I care about.\n\nThe GitHub has all the instructions you'd
  need to install and get started with an example.\n\nI want to make some notes about
  how I use polybar and customize it.\n\n## Organization\n\nFirst of all, I recently
  moved my polybar config out of one config file into a modular structure that keeps
  my config files small and easiser to edit.\n\nYou can find my config [here](https://github.com/nicpayne713/dotfiles/tree/main/polybar)\n\nThe
  apps or services you put into polybar are called `modules`.\nI have moved all of
  my modules into their own config files and I source them with one centralized `include-modules.ini`
  config.\n\nThis separation also makes it easier for me to keep my home and work
  polybars as in sync as possible without duplicating a ton of config!\n\n```bash\n./polybar\n\u251C\u2500\u2500
  colors.ini\n\u251C\u2500\u2500 config.ini\n\u251C\u2500\u2500 fonts.ini\n\u251C\u2500\u2500
  home-modules.ini\n\u251C\u2500\u2500 include-modules.ini\n\u251C\u2500\u2500 launch.sh\n\u251C\u2500\u2500
  modules\n\u2502\_\_ \u251C\u2500\u2500 aws.ini\n\u2502\_\_ \u251C\u2500\u2500 battery.ini\n\u2502\_\_
  \u251C\u2500\u2500 bluetooth.ini\n\u2502\_\_ \u251C\u2500\u2500 cisco.ini\n\u2502\_\_
  \u251C\u2500\u2500 cpu.ini\n\u2502\_\_ \u251C\u2500\u2500 date.ini\n\u2502\_\_ \u251C\u2500\u2500
  eth.ini\n\u2502\_\_ \u251C\u2500\u2500 eth_work.ini\n\u2502\_\_ \u251C\u2500\u2500
  i3.ini\n\u2502\_\_ \u251C\u2500\u2500 memory.ini\n\u2502\_\_ \u251C\u2500\u2500
  nm-editor.ini\n\u2502\_\_ \u251C\u2500\u2500 powermenu.ini\n\u2502\_\_ \u251C\u2500\u2500
  pulseaudio-control.ini\n\u2502\_\_ \u251C\u2500\u2500 pulseaudio.ini\n\u2502\_\_
  \u251C\u2500\u2500 rofi.ini\n\u2502\_\_ \u251C\u2500\u2500 vpn.ini\n\u2502\_\_ \u2514\u2500\u2500
  wlan.ini\n\u2514\u2500\u2500 work-modules.ini\n\n1 directory, 24 files\n```\n\nTo
  break this down there are several configs to see:\n\n1. `colors.ini` is what you'd
  expect - a set of defined colors like `foreground`, `underline`, etc.\n2. `config.ini`
  is the general polybar config file where bars are defined. Currently in mine there
  is a `work` and `home` bar defined with the modules sourced in from the explicit
  config files.\n3. `fonts.ini ` is like `colors.ini` -> you put fonts here. I recommend
  using a font patched with NerdFont so you get fancy icons! (I use JetBrains Mono)\n4.
  `include-modules.ini` is where I list out all the config files in `modules/` so
  I can basically source just the `include-modules.ini` without explicitly sourcing
  every module's config in every polybar defintion.\n5. `launch.sh` is a simple shell
  script to launch the polybar! You'll see mine takes multiple monitors into consideration
  which I manage via environment variables setup in my `.zshenv` file that is different
  for my work and home setups.\n6. Finally there are `home-modules.ini` and `work-modules.ini`
  which is where, for each of my bars, I define which modules I want!\n\n## Config\n\nMy
  `config.ini` file has 2 bar definitions in it - here's my home one:\n\n```ini\ninclude-file
  = $DOTFILES/polybar/include-modules.ini\n\n[bar/home]\nmonitor = ${env:MONITOR:}\nwidth
  = 100%\nheight = 25\nradius = 8.0\nfixed-center = true\nbottom = false\n\nbackground
  = ${colors.background}\nforeground = ${colors.foreground}\n\ninclude-file = $DOTFILES/polybar/fonts.ini\ninclude-file
  = $DOTFILES/polybar/home-modules.ini\n```\n\nIt should be easy to follow - I bring
  in the `include-modules`, set a few colors for the bar like `background` and `foreground`
  which are sourced by the `colors.ini`, and finally bring in my fonts and home modules
  via their config files!\n\nIt's super easy to then change one or two things in the
  appropriate places rather than combing through one massive config. This also makes
  it easy for me to seperate my work and home setups.\n\n\n## Modules\n\nThere are
  several builtin modules, like `wlan` which gives your wifi status right there in
  polybar.\n\nYou can also make custom ones. \nA big-time custom one for me is an
  indicator of whether or not I have an active AWS token for working with the `aws`
  cli.\n\nThis is defined in` modules/aws.ini` and it looks like this:\n\n```ini\n[module/aws]\ninterval
  = 5.0\ntype = custom/script\nexec = has_aws_token\nclick-left = $HOME/.local/bin/auto_get_aws_token\nclick-right
  = rm -rf ~/.aws/credentials\n```\n\nEvery `5` seconds my `has_aws_token` script
  is ran.\nThat script looks like this:\n\n```bash\n#!/bin/bash\nsource auto_proxy\naws
  sts get-caller-identity &> /dev/null && echo \"%{T5}%{F#00ff00}\uE26B  %{F-}%{T-}\"
  \ ||( echo \"%{T5}%{F#ff0000}\uF12A %{F-}%{T-}\" )\n```\n\nSee how the script echos
  out a colored icon to indicate the status of my token -> that icon is displayed
  in the polybar so I have real-time (5 second latency) status of whether or not I
  can do things in my AWS environment.\n\nIn the module I also configured actions
  for `click-left` and `click-right` which are as straight forward as could be.\n\n##
  My issues with i3\n\n\nThere's a few things to be considerate of if you use `i3`
  such as needing a workaround for a centered bar that __is not__ the full width of
  the monitor.\nPolybar can look really nice by not taking up the full width of the
  bar which you can configure in `config.ini` with these options:\n\n```ini\nwidth
  = 90%\noffset-x = 5%  # set to (100 - width) / 2\n```\n\nHowever due to an issue
  with polybar and i3 you need to also set `override-redirect = true`. \nBUT then
  you'll notice that the bar overlaps your i3 windows... ARGH! what do we do?\n\nQuick
  work around is to set `gaps top` in your i3 config if you use i3-gaps... if not?
  well, idk... use gaps... lol\n\nHowever this introduces another issue - which is
  then full screen windows will  have polybar sitting on top of them...\n\nThis isn't
  necessarily a deal breaker, but for me it's worth it to just have the bar go 100%
  width.\n\n\n## FIN\n\nThere's a tiny intro to polybar and how I organize my config
  files so things are easy to edit and manage!\nFeel free to grab mine and try it
  out!"
date: 2022-04-01
description: '[polybar](https://github.com/polybar/polybar) is an awesome and super
  customizable status bar for your desktop environment. I use it with i3-gaps on Ubuntu
  for '
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Polybar-01</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"[polybar](https://github.com/polybar/polybar)
    is an awesome and super customizable status bar for your desktop environment.
    I use it with i3-gaps on Ubuntu for \" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Polybar-01 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/polybar-01\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Polybar-01 | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"[polybar](https://github.com/polybar/polybar)
    is an awesome and super customizable status bar for your desktop environment.
    I use it with i3-gaps on Ubuntu for \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/polybar-01</span>\n        </div>\n
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
    mb-4 post-title-large\">Polybar-01</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-01\">\n            April
    01, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p><a href=\"https://github.com/polybar/polybar\">polybar</a>
    is an awesome and super customizable status bar for your desktop environment.</p>\n<p>I
    use it with i3-gaps on Ubuntu for work and it makes my day just that much better
    to have a clean and elegant bar with the things in it that I care about.</p>\n<p>The
    GitHub has all the instructions you'd need to install and get started with an
    example.</p>\n<p>I want to make some notes about how I use polybar and customize
    it.</p>\n<h2 id=\"organization\">Organization <a class=\"header-anchor\" href=\"#organization\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>First of all, I recently
    moved my polybar config out of one config file into a modular structure that keeps
    my config files small and easiser to edit.</p>\n<p>You can find my config <a href=\"https://github.com/nicpayne713/dotfiles/tree/main/polybar\">here</a></p>\n<p>The
    apps or services you put into polybar are called <code>modules</code>.\nI have
    moved all of my modules into their own config files and I source them with one
    centralized <code>include-modules.ini</code> config.</p>\n<p>This separation also
    makes it easier for me to keep my home and work polybars as in sync as possible
    without duplicating a ton of config!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>./polybar\n\u251C\u2500\u2500<span
    class=\"w\"> </span>colors.ini\n\u251C\u2500\u2500<span class=\"w\"> </span>config.ini\n\u251C\u2500\u2500<span
    class=\"w\"> </span>fonts.ini\n\u251C\u2500\u2500<span class=\"w\"> </span>home-modules.ini\n\u251C\u2500\u2500<span
    class=\"w\"> </span>include-modules.ini\n\u251C\u2500\u2500<span class=\"w\">
    </span>launch.sh\n\u251C\u2500\u2500<span class=\"w\"> </span>modules\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>aws.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>battery.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>bluetooth.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>cisco.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>cpu.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>date.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>eth.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>eth_work.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>i3.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>memory.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>nm-editor.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>powermenu.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>pulseaudio-control.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>pulseaudio.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>rofi.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>vpn.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u2514\u2500\u2500<span class=\"w\"> </span>wlan.ini\n\u2514\u2500\u2500<span
    class=\"w\"> </span>work-modules.ini\n\n<span class=\"m\">1</span><span class=\"w\">
    </span>directory,<span class=\"w\"> </span><span class=\"m\">24</span><span class=\"w\">
    </span>files\n</pre></div>\n\n</pre>\n\n<p>To break this down there are several
    configs to see:</p>\n<ol>\n<li><code>colors.ini</code> is what you'd expect -
    a set of defined colors like <code>foreground</code>, <code>underline</code>,
    etc.</li>\n<li><code>config.ini</code> is the general polybar config file where
    bars are defined. Currently in mine there is a <code>work</code> and <code>home</code>
    bar defined with the modules sourced in from the explicit config files.</li>\n<li><code>fonts.ini
    </code> is like <code>colors.ini</code> -&gt; you put fonts here. I recommend
    using a font patched with NerdFont so you get fancy icons! (I use JetBrains Mono)</li>\n<li><code>include-modules.ini</code>
    is where I list out all the config files in <code>modules/</code> so I can basically
    source just the <code>include-modules.ini</code> without explicitly sourcing every
    module's config in every polybar defintion.</li>\n<li><code>launch.sh</code> is
    a simple shell script to launch the polybar! You'll see mine takes multiple monitors
    into consideration which I manage via environment variables setup in my <code>.zshenv</code>
    file that is different for my work and home setups.</li>\n<li>Finally there are
    <code>home-modules.ini</code> and <code>work-modules.ini</code> which is where,
    for each of my bars, I define which modules I want!</li>\n</ol>\n<h2 id=\"config\">Config
    <a class=\"header-anchor\" href=\"#config\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My <code>config.ini</code>
    file has 2 bar definitions in it - here's my home one:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/include-modules.ini</span>\n\n<span class=\"k\">[bar/home]</span>\n<span
    class=\"na\">monitor</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">${env:MONITOR:}</span>\n<span class=\"na\">width</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">100%</span>\n<span class=\"na\">height</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">25</span>\n<span
    class=\"na\">radius</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">8.0</span>\n<span class=\"na\">fixed-center</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">true</span>\n<span class=\"na\">bottom</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">false</span>\n\n<span
    class=\"na\">background</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">${colors.background}</span>\n<span class=\"na\">foreground</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">${colors.foreground}</span>\n\n<span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/fonts.ini</span>\n<span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/home-modules.ini</span>\n</pre></div>\n\n</pre>\n\n<p>It
    should be easy to follow - I bring in the <code>include-modules</code>, set a
    few colors for the bar like <code>background</code> and <code>foreground</code>
    which are sourced by the <code>colors.ini</code>, and finally bring in my fonts
    and home modules via their config files!</p>\n<p>It's super easy to then change
    one or two things in the appropriate places rather than combing through one massive
    config. This also makes it easy for me to seperate my work and home setups.</p>\n<h2
    id=\"modules\">Modules <a class=\"header-anchor\" href=\"#modules\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There are several builtin
    modules, like <code>wlan</code> which gives your wifi status right there in polybar.</p>\n<p>You
    can also make custom ones.\nA big-time custom one for me is an indicator of whether
    or not I have an active AWS token for working with the <code>aws</code> cli.</p>\n<p>This
    is defined in<code> modules/aws.ini</code> and it looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[module/aws]</span>\n<span
    class=\"na\">interval</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">5.0</span>\n<span class=\"na\">type</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">custom/script</span>\n<span class=\"na\">exec</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">has_aws_token</span>\n<span
    class=\"na\">click-left</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">$HOME/.local/bin/auto_get_aws_token</span>\n<span
    class=\"na\">click-right</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">rm -rf ~/.aws/credentials</span>\n</pre></div>\n\n</pre>\n\n<p>Every
    <code>5</code> seconds my <code>has_aws_token</code> script is ran.\nThat script
    looks like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n<span
    class=\"nb\">source</span><span class=\"w\"> </span>auto_proxy\naws<span class=\"w\">
    </span>sts<span class=\"w\"> </span>get-caller-identity<span class=\"w\"> </span><span
    class=\"p\">&amp;</span>&gt;<span class=\"w\"> </span>/dev/null<span class=\"w\">
    </span><span class=\"o\">&amp;&amp;</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#00ff00}\uE26B  %{F-}%{T-}&quot;</span><span
    class=\"w\">  </span><span class=\"o\">||(</span><span class=\"w\"> </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#ff0000}\uF12A
    %{F-}%{T-}&quot;</span><span class=\"w\"> </span><span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>See
    how the script echos out a colored icon to indicate the status of my token -&gt;
    that icon is displayed in the polybar so I have real-time (5 second latency) status
    of whether or not I can do things in my AWS environment.</p>\n<p>In the module
    I also configured actions for <code>click-left</code> and <code>click-right</code>
    which are as straight forward as could be.</p>\n<h2 id=\"my-issues-with-i3\">My
    issues with i3 <a class=\"header-anchor\" href=\"#my-issues-with-i3\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's a few things
    to be considerate of if you use <code>i3</code> such as needing a workaround for
    a centered bar that <strong>is not</strong> the full width of the monitor.\nPolybar
    can look really nice by not taking up the full width of the bar which you can
    configure in <code>config.ini</code> with these options:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"na\">width</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">90%</span>\n<span class=\"na\">offset-x</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">5%</span><span
    class=\"w\">  </span><span class=\"c1\"># set to (100 - width) / 2</span>\n</pre></div>\n\n</pre>\n\n<p>However
    due to an issue with polybar and i3 you need to also set <code>override-redirect
    = true</code>.\nBUT then you'll notice that the bar overlaps your i3 windows...
    ARGH! what do we do?</p>\n<p>Quick work around is to set <code>gaps top</code>
    in your i3 config if you use i3-gaps... if not? well, idk... use gaps... lol</p>\n<p>However
    this introduces another issue - which is then full screen windows will  have polybar
    sitting on top of them...</p>\n<p>This isn't necessarily a deal breaker, but for
    me it's worth it to just have the bar go 100% width.</p>\n<h2 id=\"fin\">FIN <a
    class=\"header-anchor\" href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's a tiny intro
    to polybar and how I organize my config files so things are easy to edit and manage!\nFeel
    free to grab mine and try it out!</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Polybar-01</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"[polybar](https://github.com/polybar/polybar)
    is an awesome and super customizable status bar for your desktop environment.
    I use it with i3-gaps on Ubuntu for \" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Polybar-01 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/polybar-01\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Polybar-01 | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"[polybar](https://github.com/polybar/polybar)
    is an awesome and super customizable status bar for your desktop environment.
    I use it with i3-gaps on Ubuntu for \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Polybar-01</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-01\">\n            April
    01, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Polybar-01</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-01\">\n            April
    01, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p><a href=\"https://github.com/polybar/polybar\">polybar</a>
    is an awesome and super customizable status bar for your desktop environment.</p>\n<p>I
    use it with i3-gaps on Ubuntu for work and it makes my day just that much better
    to have a clean and elegant bar with the things in it that I care about.</p>\n<p>The
    GitHub has all the instructions you'd need to install and get started with an
    example.</p>\n<p>I want to make some notes about how I use polybar and customize
    it.</p>\n<h2 id=\"organization\">Organization <a class=\"header-anchor\" href=\"#organization\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>First of all, I recently
    moved my polybar config out of one config file into a modular structure that keeps
    my config files small and easiser to edit.</p>\n<p>You can find my config <a href=\"https://github.com/nicpayne713/dotfiles/tree/main/polybar\">here</a></p>\n<p>The
    apps or services you put into polybar are called <code>modules</code>.\nI have
    moved all of my modules into their own config files and I source them with one
    centralized <code>include-modules.ini</code> config.</p>\n<p>This separation also
    makes it easier for me to keep my home and work polybars as in sync as possible
    without duplicating a ton of config!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>./polybar\n\u251C\u2500\u2500<span
    class=\"w\"> </span>colors.ini\n\u251C\u2500\u2500<span class=\"w\"> </span>config.ini\n\u251C\u2500\u2500<span
    class=\"w\"> </span>fonts.ini\n\u251C\u2500\u2500<span class=\"w\"> </span>home-modules.ini\n\u251C\u2500\u2500<span
    class=\"w\"> </span>include-modules.ini\n\u251C\u2500\u2500<span class=\"w\">
    </span>launch.sh\n\u251C\u2500\u2500<span class=\"w\"> </span>modules\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>aws.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>battery.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>bluetooth.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>cisco.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>cpu.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>date.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>eth.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>eth_work.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>i3.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>memory.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>nm-editor.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>powermenu.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>pulseaudio-control.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>pulseaudio.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>rofi.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>vpn.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u2514\u2500\u2500<span class=\"w\"> </span>wlan.ini\n\u2514\u2500\u2500<span
    class=\"w\"> </span>work-modules.ini\n\n<span class=\"m\">1</span><span class=\"w\">
    </span>directory,<span class=\"w\"> </span><span class=\"m\">24</span><span class=\"w\">
    </span>files\n</pre></div>\n\n</pre>\n\n<p>To break this down there are several
    configs to see:</p>\n<ol>\n<li><code>colors.ini</code> is what you'd expect -
    a set of defined colors like <code>foreground</code>, <code>underline</code>,
    etc.</li>\n<li><code>config.ini</code> is the general polybar config file where
    bars are defined. Currently in mine there is a <code>work</code> and <code>home</code>
    bar defined with the modules sourced in from the explicit config files.</li>\n<li><code>fonts.ini
    </code> is like <code>colors.ini</code> -&gt; you put fonts here. I recommend
    using a font patched with NerdFont so you get fancy icons! (I use JetBrains Mono)</li>\n<li><code>include-modules.ini</code>
    is where I list out all the config files in <code>modules/</code> so I can basically
    source just the <code>include-modules.ini</code> without explicitly sourcing every
    module's config in every polybar defintion.</li>\n<li><code>launch.sh</code> is
    a simple shell script to launch the polybar! You'll see mine takes multiple monitors
    into consideration which I manage via environment variables setup in my <code>.zshenv</code>
    file that is different for my work and home setups.</li>\n<li>Finally there are
    <code>home-modules.ini</code> and <code>work-modules.ini</code> which is where,
    for each of my bars, I define which modules I want!</li>\n</ol>\n<h2 id=\"config\">Config
    <a class=\"header-anchor\" href=\"#config\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My <code>config.ini</code>
    file has 2 bar definitions in it - here's my home one:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/include-modules.ini</span>\n\n<span class=\"k\">[bar/home]</span>\n<span
    class=\"na\">monitor</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">${env:MONITOR:}</span>\n<span class=\"na\">width</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">100%</span>\n<span class=\"na\">height</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">25</span>\n<span
    class=\"na\">radius</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">8.0</span>\n<span class=\"na\">fixed-center</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">true</span>\n<span class=\"na\">bottom</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">false</span>\n\n<span
    class=\"na\">background</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">${colors.background}</span>\n<span class=\"na\">foreground</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">${colors.foreground}</span>\n\n<span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/fonts.ini</span>\n<span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/home-modules.ini</span>\n</pre></div>\n\n</pre>\n\n<p>It
    should be easy to follow - I bring in the <code>include-modules</code>, set a
    few colors for the bar like <code>background</code> and <code>foreground</code>
    which are sourced by the <code>colors.ini</code>, and finally bring in my fonts
    and home modules via their config files!</p>\n<p>It's super easy to then change
    one or two things in the appropriate places rather than combing through one massive
    config. This also makes it easy for me to seperate my work and home setups.</p>\n<h2
    id=\"modules\">Modules <a class=\"header-anchor\" href=\"#modules\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There are several builtin
    modules, like <code>wlan</code> which gives your wifi status right there in polybar.</p>\n<p>You
    can also make custom ones.\nA big-time custom one for me is an indicator of whether
    or not I have an active AWS token for working with the <code>aws</code> cli.</p>\n<p>This
    is defined in<code> modules/aws.ini</code> and it looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[module/aws]</span>\n<span
    class=\"na\">interval</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">5.0</span>\n<span class=\"na\">type</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">custom/script</span>\n<span class=\"na\">exec</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">has_aws_token</span>\n<span
    class=\"na\">click-left</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">$HOME/.local/bin/auto_get_aws_token</span>\n<span
    class=\"na\">click-right</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">rm -rf ~/.aws/credentials</span>\n</pre></div>\n\n</pre>\n\n<p>Every
    <code>5</code> seconds my <code>has_aws_token</code> script is ran.\nThat script
    looks like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n<span
    class=\"nb\">source</span><span class=\"w\"> </span>auto_proxy\naws<span class=\"w\">
    </span>sts<span class=\"w\"> </span>get-caller-identity<span class=\"w\"> </span><span
    class=\"p\">&amp;</span>&gt;<span class=\"w\"> </span>/dev/null<span class=\"w\">
    </span><span class=\"o\">&amp;&amp;</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#00ff00}\uE26B  %{F-}%{T-}&quot;</span><span
    class=\"w\">  </span><span class=\"o\">||(</span><span class=\"w\"> </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#ff0000}\uF12A
    %{F-}%{T-}&quot;</span><span class=\"w\"> </span><span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>See
    how the script echos out a colored icon to indicate the status of my token -&gt;
    that icon is displayed in the polybar so I have real-time (5 second latency) status
    of whether or not I can do things in my AWS environment.</p>\n<p>In the module
    I also configured actions for <code>click-left</code> and <code>click-right</code>
    which are as straight forward as could be.</p>\n<h2 id=\"my-issues-with-i3\">My
    issues with i3 <a class=\"header-anchor\" href=\"#my-issues-with-i3\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's a few things
    to be considerate of if you use <code>i3</code> such as needing a workaround for
    a centered bar that <strong>is not</strong> the full width of the monitor.\nPolybar
    can look really nice by not taking up the full width of the bar which you can
    configure in <code>config.ini</code> with these options:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"na\">width</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">90%</span>\n<span class=\"na\">offset-x</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">5%</span><span
    class=\"w\">  </span><span class=\"c1\"># set to (100 - width) / 2</span>\n</pre></div>\n\n</pre>\n\n<p>However
    due to an issue with polybar and i3 you need to also set <code>override-redirect
    = true</code>.\nBUT then you'll notice that the bar overlaps your i3 windows...
    ARGH! what do we do?</p>\n<p>Quick work around is to set <code>gaps top</code>
    in your i3 config if you use i3-gaps... if not? well, idk... use gaps... lol</p>\n<p>However
    this introduces another issue - which is then full screen windows will  have polybar
    sitting on top of them...</p>\n<p>This isn't necessarily a deal breaker, but for
    me it's worth it to just have the bar go 100% width.</p>\n<h2 id=\"fin\">FIN <a
    class=\"header-anchor\" href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's a tiny intro
    to polybar and how I organize my config files so things are easy to edit and manage!\nFeel
    free to grab mine and try it out!</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Polybar-01</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"[polybar](https://github.com/polybar/polybar)
    is an awesome and super customizable status bar for your desktop environment.
    I use it with i3-gaps on Ubuntu for \" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Polybar-01 | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/polybar-01\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Polybar-01 | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"[polybar](https://github.com/polybar/polybar)
    is an awesome and super customizable status bar for your desktop environment.
    I use it with i3-gaps on Ubuntu for \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/polybar-01</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p><a href=\"https://github.com/polybar/polybar\">polybar</a>
    is an awesome and super customizable status bar for your desktop environment.</p>\n<p>I
    use it with i3-gaps on Ubuntu for work and it makes my day just that much better
    to have a clean and elegant bar with the things in it that I care about.</p>\n<p>The
    GitHub has all the instructions you'd need to install and get started with an
    example.</p>\n<p>I want to make some notes about how I use polybar and customize
    it.</p>\n<h2 id=\"organization\">Organization <a class=\"header-anchor\" href=\"#organization\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>First of all, I recently
    moved my polybar config out of one config file into a modular structure that keeps
    my config files small and easiser to edit.</p>\n<p>You can find my config <a href=\"https://github.com/nicpayne713/dotfiles/tree/main/polybar\">here</a></p>\n<p>The
    apps or services you put into polybar are called <code>modules</code>.\nI have
    moved all of my modules into their own config files and I source them with one
    centralized <code>include-modules.ini</code> config.</p>\n<p>This separation also
    makes it easier for me to keep my home and work polybars as in sync as possible
    without duplicating a ton of config!</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>./polybar\n\u251C\u2500\u2500<span
    class=\"w\"> </span>colors.ini\n\u251C\u2500\u2500<span class=\"w\"> </span>config.ini\n\u251C\u2500\u2500<span
    class=\"w\"> </span>fonts.ini\n\u251C\u2500\u2500<span class=\"w\"> </span>home-modules.ini\n\u251C\u2500\u2500<span
    class=\"w\"> </span>include-modules.ini\n\u251C\u2500\u2500<span class=\"w\">
    </span>launch.sh\n\u251C\u2500\u2500<span class=\"w\"> </span>modules\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>aws.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>battery.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>bluetooth.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>cisco.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>cpu.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>date.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>eth.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>eth_work.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>i3.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>memory.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>nm-editor.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>powermenu.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>pulseaudio-control.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>pulseaudio.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>rofi.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u251C\u2500\u2500<span class=\"w\"> </span>vpn.ini\n\u2502<span
    class=\"w\">\_\_ </span>\u2514\u2500\u2500<span class=\"w\"> </span>wlan.ini\n\u2514\u2500\u2500<span
    class=\"w\"> </span>work-modules.ini\n\n<span class=\"m\">1</span><span class=\"w\">
    </span>directory,<span class=\"w\"> </span><span class=\"m\">24</span><span class=\"w\">
    </span>files\n</pre></div>\n\n</pre>\n\n<p>To break this down there are several
    configs to see:</p>\n<ol>\n<li><code>colors.ini</code> is what you'd expect -
    a set of defined colors like <code>foreground</code>, <code>underline</code>,
    etc.</li>\n<li><code>config.ini</code> is the general polybar config file where
    bars are defined. Currently in mine there is a <code>work</code> and <code>home</code>
    bar defined with the modules sourced in from the explicit config files.</li>\n<li><code>fonts.ini
    </code> is like <code>colors.ini</code> -&gt; you put fonts here. I recommend
    using a font patched with NerdFont so you get fancy icons! (I use JetBrains Mono)</li>\n<li><code>include-modules.ini</code>
    is where I list out all the config files in <code>modules/</code> so I can basically
    source just the <code>include-modules.ini</code> without explicitly sourcing every
    module's config in every polybar defintion.</li>\n<li><code>launch.sh</code> is
    a simple shell script to launch the polybar! You'll see mine takes multiple monitors
    into consideration which I manage via environment variables setup in my <code>.zshenv</code>
    file that is different for my work and home setups.</li>\n<li>Finally there are
    <code>home-modules.ini</code> and <code>work-modules.ini</code> which is where,
    for each of my bars, I define which modules I want!</li>\n</ol>\n<h2 id=\"config\">Config
    <a class=\"header-anchor\" href=\"#config\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My <code>config.ini</code>
    file has 2 bar definitions in it - here's my home one:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/include-modules.ini</span>\n\n<span class=\"k\">[bar/home]</span>\n<span
    class=\"na\">monitor</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">${env:MONITOR:}</span>\n<span class=\"na\">width</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">100%</span>\n<span class=\"na\">height</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">25</span>\n<span
    class=\"na\">radius</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">8.0</span>\n<span class=\"na\">fixed-center</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">true</span>\n<span class=\"na\">bottom</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">false</span>\n\n<span
    class=\"na\">background</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">${colors.background}</span>\n<span class=\"na\">foreground</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">${colors.foreground}</span>\n\n<span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/fonts.ini</span>\n<span class=\"na\">include-file</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">$DOTFILES/polybar/home-modules.ini</span>\n</pre></div>\n\n</pre>\n\n<p>It
    should be easy to follow - I bring in the <code>include-modules</code>, set a
    few colors for the bar like <code>background</code> and <code>foreground</code>
    which are sourced by the <code>colors.ini</code>, and finally bring in my fonts
    and home modules via their config files!</p>\n<p>It's super easy to then change
    one or two things in the appropriate places rather than combing through one massive
    config. This also makes it easy for me to seperate my work and home setups.</p>\n<h2
    id=\"modules\">Modules <a class=\"header-anchor\" href=\"#modules\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There are several builtin
    modules, like <code>wlan</code> which gives your wifi status right there in polybar.</p>\n<p>You
    can also make custom ones.\nA big-time custom one for me is an indicator of whether
    or not I have an active AWS token for working with the <code>aws</code> cli.</p>\n<p>This
    is defined in<code> modules/aws.ini</code> and it looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">[module/aws]</span>\n<span
    class=\"na\">interval</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">5.0</span>\n<span class=\"na\">type</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">custom/script</span>\n<span class=\"na\">exec</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">has_aws_token</span>\n<span
    class=\"na\">click-left</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">$HOME/.local/bin/auto_get_aws_token</span>\n<span
    class=\"na\">click-right</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s\">rm -rf ~/.aws/credentials</span>\n</pre></div>\n\n</pre>\n\n<p>Every
    <code>5</code> seconds my <code>has_aws_token</code> script is ran.\nThat script
    looks like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n<span
    class=\"nb\">source</span><span class=\"w\"> </span>auto_proxy\naws<span class=\"w\">
    </span>sts<span class=\"w\"> </span>get-caller-identity<span class=\"w\"> </span><span
    class=\"p\">&amp;</span>&gt;<span class=\"w\"> </span>/dev/null<span class=\"w\">
    </span><span class=\"o\">&amp;&amp;</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#00ff00}\uE26B  %{F-}%{T-}&quot;</span><span
    class=\"w\">  </span><span class=\"o\">||(</span><span class=\"w\"> </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#ff0000}\uF12A
    %{F-}%{T-}&quot;</span><span class=\"w\"> </span><span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>See
    how the script echos out a colored icon to indicate the status of my token -&gt;
    that icon is displayed in the polybar so I have real-time (5 second latency) status
    of whether or not I can do things in my AWS environment.</p>\n<p>In the module
    I also configured actions for <code>click-left</code> and <code>click-right</code>
    which are as straight forward as could be.</p>\n<h2 id=\"my-issues-with-i3\">My
    issues with i3 <a class=\"header-anchor\" href=\"#my-issues-with-i3\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's a few things
    to be considerate of if you use <code>i3</code> such as needing a workaround for
    a centered bar that <strong>is not</strong> the full width of the monitor.\nPolybar
    can look really nice by not taking up the full width of the bar which you can
    configure in <code>config.ini</code> with these options:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"na\">width</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s\">90%</span>\n<span class=\"na\">offset-x</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">5%</span><span
    class=\"w\">  </span><span class=\"c1\"># set to (100 - width) / 2</span>\n</pre></div>\n\n</pre>\n\n<p>However
    due to an issue with polybar and i3 you need to also set <code>override-redirect
    = true</code>.\nBUT then you'll notice that the bar overlaps your i3 windows...
    ARGH! what do we do?</p>\n<p>Quick work around is to set <code>gaps top</code>
    in your i3 config if you use i3-gaps... if not? well, idk... use gaps... lol</p>\n<p>However
    this introduces another issue - which is then full screen windows will  have polybar
    sitting on top of them...</p>\n<p>This isn't necessarily a deal breaker, but for
    me it's worth it to just have the bar go 100% width.</p>\n<h2 id=\"fin\">FIN <a
    class=\"header-anchor\" href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's a tiny intro
    to polybar and how I organize my config files so things are easy to edit and manage!\nFeel
    free to grab mine and try it out!</p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['linux', 'tech']\ntitle: Polybar-01\ndate:
    2022-04-01T00:00:00\npublished: True\n#cover: \"media/polybar-01.png\"\n\n---\n\n[polybar](https://github.com/polybar/polybar)
    is an awesome and super customizable status bar for your desktop environment.\n\nI
    use it with i3-gaps on Ubuntu for work and it makes my day just that much better
    to have a clean and elegant bar with the things in it that I care about.\n\nThe
    GitHub has all the instructions you'd need to install and get started with an
    example.\n\nI want to make some notes about how I use polybar and customize it.\n\n##
    Organization\n\nFirst of all, I recently moved my polybar config out of one config
    file into a modular structure that keeps my config files small and easiser to
    edit.\n\nYou can find my config [here](https://github.com/nicpayne713/dotfiles/tree/main/polybar)\n\nThe
    apps or services you put into polybar are called `modules`.\nI have moved all
    of my modules into their own config files and I source them with one centralized
    `include-modules.ini` config.\n\nThis separation also makes it easier for me to
    keep my home and work polybars as in sync as possible without duplicating a ton
    of config!\n\n```bash\n./polybar\n\u251C\u2500\u2500 colors.ini\n\u251C\u2500\u2500
    config.ini\n\u251C\u2500\u2500 fonts.ini\n\u251C\u2500\u2500 home-modules.ini\n\u251C\u2500\u2500
    include-modules.ini\n\u251C\u2500\u2500 launch.sh\n\u251C\u2500\u2500 modules\n\u2502\_\_
    \u251C\u2500\u2500 aws.ini\n\u2502\_\_ \u251C\u2500\u2500 battery.ini\n\u2502\_\_
    \u251C\u2500\u2500 bluetooth.ini\n\u2502\_\_ \u251C\u2500\u2500 cisco.ini\n\u2502\_\_
    \u251C\u2500\u2500 cpu.ini\n\u2502\_\_ \u251C\u2500\u2500 date.ini\n\u2502\_\_
    \u251C\u2500\u2500 eth.ini\n\u2502\_\_ \u251C\u2500\u2500 eth_work.ini\n\u2502\_\_
    \u251C\u2500\u2500 i3.ini\n\u2502\_\_ \u251C\u2500\u2500 memory.ini\n\u2502\_\_
    \u251C\u2500\u2500 nm-editor.ini\n\u2502\_\_ \u251C\u2500\u2500 powermenu.ini\n\u2502\_\_
    \u251C\u2500\u2500 pulseaudio-control.ini\n\u2502\_\_ \u251C\u2500\u2500 pulseaudio.ini\n\u2502\_\_
    \u251C\u2500\u2500 rofi.ini\n\u2502\_\_ \u251C\u2500\u2500 vpn.ini\n\u2502\_\_
    \u2514\u2500\u2500 wlan.ini\n\u2514\u2500\u2500 work-modules.ini\n\n1 directory,
    24 files\n```\n\nTo break this down there are several configs to see:\n\n1. `colors.ini`
    is what you'd expect - a set of defined colors like `foreground`, `underline`,
    etc.\n2. `config.ini` is the general polybar config file where bars are defined.
    Currently in mine there is a `work` and `home` bar defined with the modules sourced
    in from the explicit config files.\n3. `fonts.ini ` is like `colors.ini` -> you
    put fonts here. I recommend using a font patched with NerdFont so you get fancy
    icons! (I use JetBrains Mono)\n4. `include-modules.ini` is where I list out all
    the config files in `modules/` so I can basically source just the `include-modules.ini`
    without explicitly sourcing every module's config in every polybar defintion.\n5.
    `launch.sh` is a simple shell script to launch the polybar! You'll see mine takes
    multiple monitors into consideration which I manage via environment variables
    setup in my `.zshenv` file that is different for my work and home setups.\n6.
    Finally there are `home-modules.ini` and `work-modules.ini` which is where, for
    each of my bars, I define which modules I want!\n\n## Config\n\nMy `config.ini`
    file has 2 bar definitions in it - here's my home one:\n\n```ini\ninclude-file
    = $DOTFILES/polybar/include-modules.ini\n\n[bar/home]\nmonitor = ${env:MONITOR:}\nwidth
    = 100%\nheight = 25\nradius = 8.0\nfixed-center = true\nbottom = false\n\nbackground
    = ${colors.background}\nforeground = ${colors.foreground}\n\ninclude-file = $DOTFILES/polybar/fonts.ini\ninclude-file
    = $DOTFILES/polybar/home-modules.ini\n```\n\nIt should be easy to follow - I bring
    in the `include-modules`, set a few colors for the bar like `background` and `foreground`
    which are sourced by the `colors.ini`, and finally bring in my fonts and home
    modules via their config files!\n\nIt's super easy to then change one or two things
    in the appropriate places rather than combing through one massive config. This
    also makes it easy for me to seperate my work and home setups.\n\n\n## Modules\n\nThere
    are several builtin modules, like `wlan` which gives your wifi status right there
    in polybar.\n\nYou can also make custom ones. \nA big-time custom one for me is
    an indicator of whether or not I have an active AWS token for working with the
    `aws` cli.\n\nThis is defined in` modules/aws.ini` and it looks like this:\n\n```ini\n[module/aws]\ninterval
    = 5.0\ntype = custom/script\nexec = has_aws_token\nclick-left = $HOME/.local/bin/auto_get_aws_token\nclick-right
    = rm -rf ~/.aws/credentials\n```\n\nEvery `5` seconds my `has_aws_token` script
    is ran.\nThat script looks like this:\n\n```bash\n#!/bin/bash\nsource auto_proxy\naws
    sts get-caller-identity &> /dev/null && echo \"%{T5}%{F#00ff00}\uE26B  %{F-}%{T-}\"
    \ ||( echo \"%{T5}%{F#ff0000}\uF12A %{F-}%{T-}\" )\n```\n\nSee how the script
    echos out a colored icon to indicate the status of my token -> that icon is displayed
    in the polybar so I have real-time (5 second latency) status of whether or not
    I can do things in my AWS environment.\n\nIn the module I also configured actions
    for `click-left` and `click-right` which are as straight forward as could be.\n\n##
    My issues with i3\n\n\nThere's a few things to be considerate of if you use `i3`
    such as needing a workaround for a centered bar that __is not__ the full width
    of the monitor.\nPolybar can look really nice by not taking up the full width
    of the bar which you can configure in `config.ini` with these options:\n\n```ini\nwidth
    = 90%\noffset-x = 5%  # set to (100 - width) / 2\n```\n\nHowever due to an issue
    with polybar and i3 you need to also set `override-redirect = true`. \nBUT then
    you'll notice that the bar overlaps your i3 windows... ARGH! what do we do?\n\nQuick
    work around is to set `gaps top` in your i3 config if you use i3-gaps... if not?
    well, idk... use gaps... lol\n\nHowever this introduces another issue - which
    is then full screen windows will  have polybar sitting on top of them...\n\nThis
    isn't necessarily a deal breaker, but for me it's worth it to just have the bar
    go 100% width.\n\n\n## FIN\n\nThere's a tiny intro to polybar and how I organize
    my config files so things are easy to edit and manage!\nFeel free to grab mine
    and try it out!\n"
published: true
slug: polybar-01
title: Polybar-01


---

[polybar](https://github.com/polybar/polybar) is an awesome and super customizable status bar for your desktop environment.

I use it with i3-gaps on Ubuntu for work and it makes my day just that much better to have a clean and elegant bar with the things in it that I care about.

The GitHub has all the instructions you'd need to install and get started with an example.

I want to make some notes about how I use polybar and customize it.

## Organization

First of all, I recently moved my polybar config out of one config file into a modular structure that keeps my config files small and easiser to edit.

You can find my config [here](https://github.com/nicpayne713/dotfiles/tree/main/polybar)

The apps or services you put into polybar are called `modules`.
I have moved all of my modules into their own config files and I source them with one centralized `include-modules.ini` config.

This separation also makes it easier for me to keep my home and work polybars as in sync as possible without duplicating a ton of config!

```bash
./polybar
├── colors.ini
├── config.ini
├── fonts.ini
├── home-modules.ini
├── include-modules.ini
├── launch.sh
├── modules
│   ├── aws.ini
│   ├── battery.ini
│   ├── bluetooth.ini
│   ├── cisco.ini
│   ├── cpu.ini
│   ├── date.ini
│   ├── eth.ini
│   ├── eth_work.ini
│   ├── i3.ini
│   ├── memory.ini
│   ├── nm-editor.ini
│   ├── powermenu.ini
│   ├── pulseaudio-control.ini
│   ├── pulseaudio.ini
│   ├── rofi.ini
│   ├── vpn.ini
│   └── wlan.ini
└── work-modules.ini

1 directory, 24 files
```

To break this down there are several configs to see:

1. `colors.ini` is what you'd expect - a set of defined colors like `foreground`, `underline`, etc.
2. `config.ini` is the general polybar config file where bars are defined. Currently in mine there is a `work` and `home` bar defined with the modules sourced in from the explicit config files.
3. `fonts.ini ` is like `colors.ini` -> you put fonts here. I recommend using a font patched with NerdFont so you get fancy icons! (I use JetBrains Mono)
4. `include-modules.ini` is where I list out all the config files in `modules/` so I can basically source just the `include-modules.ini` without explicitly sourcing every module's config in every polybar defintion.
5. `launch.sh` is a simple shell script to launch the polybar! You'll see mine takes multiple monitors into consideration which I manage via environment variables setup in my `.zshenv` file that is different for my work and home setups.
6. Finally there are `home-modules.ini` and `work-modules.ini` which is where, for each of my bars, I define which modules I want!

## Config

My `config.ini` file has 2 bar definitions in it - here's my home one:

```ini
include-file = $DOTFILES/polybar/include-modules.ini

[bar/home]
monitor = ${env:MONITOR:}
width = 100%
height = 25
radius = 8.0
fixed-center = true
bottom = false

background = ${colors.background}
foreground = ${colors.foreground}

include-file = $DOTFILES/polybar/fonts.ini
include-file = $DOTFILES/polybar/home-modules.ini
```

It should be easy to follow - I bring in the `include-modules`, set a few colors for the bar like `background` and `foreground` which are sourced by the `colors.ini`, and finally bring in my fonts and home modules via their config files!

It's super easy to then change one or two things in the appropriate places rather than combing through one massive config. This also makes it easy for me to seperate my work and home setups.


## Modules

There are several builtin modules, like `wlan` which gives your wifi status right there in polybar.

You can also make custom ones. 
A big-time custom one for me is an indicator of whether or not I have an active AWS token for working with the `aws` cli.

This is defined in` modules/aws.ini` and it looks like this:

```ini
[module/aws]
interval = 5.0
type = custom/script
exec = has_aws_token
click-left = $HOME/.local/bin/auto_get_aws_token
click-right = rm -rf ~/.aws/credentials
```

Every `5` seconds my `has_aws_token` script is ran.
That script looks like this:

```bash
#!/bin/bash
source auto_proxy
aws sts get-caller-identity &> /dev/null && echo "%{T5}%{F#00ff00}  %{F-}%{T-}"  ||( echo "%{T5}%{F#ff0000} %{F-}%{T-}" )
```

See how the script echos out a colored icon to indicate the status of my token -> that icon is displayed in the polybar so I have real-time (5 second latency) status of whether or not I can do things in my AWS environment.

In the module I also configured actions for `click-left` and `click-right` which are as straight forward as could be.

## My issues with i3


There's a few things to be considerate of if you use `i3` such as needing a workaround for a centered bar that __is not__ the full width of the monitor.
Polybar can look really nice by not taking up the full width of the bar which you can configure in `config.ini` with these options:

```ini
width = 90%
offset-x = 5%  # set to (100 - width) / 2
```

However due to an issue with polybar and i3 you need to also set `override-redirect = true`. 
BUT then you'll notice that the bar overlaps your i3 windows... ARGH! what do we do?

Quick work around is to set `gaps top` in your i3 config if you use i3-gaps... if not? well, idk... use gaps... lol

However this introduces another issue - which is then full screen windows will  have polybar sitting on top of them...

This isn't necessarily a deal breaker, but for me it's worth it to just have the bar go 100% width.


## FIN

There's a tiny intro to polybar and how I organize my config files so things are easy to edit and manage!
Feel free to grab mine and try it out!