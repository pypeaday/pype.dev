---
content: "`man` can be a pain to read... and there's lots of alternatives out there
  and one I've just started playing with is [cheat](https://github.com/cheat/cheat)\n\n\n`man
  man` will give you this plus a billion more lines of docs, which is useful when
  you need it...\n\n```bash\nMAN(1)                                                                                                                       Manual
  pager utils                                                                                                                      MAN(1)\n\nNAME\n
  \      man - an interface to the on-line reference manuals\n\nSYNOPSIS\n       man
  \ [-C  file]  [-d] [-D] [--warnings[=warnings]] [-R encoding] [-L locale] [-m system[,...]]
  [-M path] [-S list] [-e extension] [-i|-I] [--regex|--wildcard] [--names-only] [-a]
  [-u] [--no-subpages] [-P pager] [-r prompt] [-7] [-E encoding] [--no-hyphenation]\n
  \      [--no-justification] [-p string] [-t] [-T[device]] [-H[browser]] [-X[dpi]]
  [-Z] [[section] page[.section] ...] ...\n       man -k [apropos options] regexp
  ...\n       man -K [-w|-W] [-S list] [-i|-I] [--regex] [section] term ...\n       man
  -f [whatis options] page ...\n       man -l [-C file] [-d] [-D] [--warnings[=warnings]]
  [-R encoding] [-L locale] [-P pager] [-r prompt] [-7] [-E encoding] [-p string]
  [-t] [-T[device]] [-H[browser]] [-X[dpi]] [-Z] file ...\n       man -w|-W [-C file]
  [-d] [-D] page ...\n       man -c [-C file] [-d] [-D] page ...\n       man [-?V]\n\nDESCRIPTION\n
  \      man is the system's manual pager.  Each page argument given to man is normally
  the name of a program, utility or function.  The manual page associated with each
  of these arguments is then found and displayed.  A section, if provided, will direct
  \ man  to  look\n       only  in  that  section of the manual.  The default action
  is to search in all of the available sections following a pre-defined order (\"1
  n l 8 3 2 3posix 3pm 3perl 3am 5 4 9 6 7\" by default, unless overridden by the
  SECTION directive in /etc/manpath.config),\n       and to show only the first page
  found, even if page exists in several sections.\n\n       The table below shows
  the section numbers of the manual followed by the types of pages they contain.\n\n
  \      1   Executable programs or shell commands\n       2   System calls (functions
  provided by the kernel)\n       3   Library calls (functions within program libraries)\n
  \      4   Special files (usually found in /dev)\n       5   File formats and conventions
  eg /etc/passwd\n       6   Games\n       7   Miscellaneous (including macro packages
  and conventions), e.g. man(7), groff(7)\n       8   System administration commands
  (usually only for root)\n       9   Kernel routines [Non standard]\n\n       A manual
  page consists of several sections.\n\n       Conventional section names include
  NAME, SYNOPSIS, CONFIGURATION, DESCRIPTION, OPTIONS, EXIT STATUS, RETURN VALUE,
  ERRORS, ENVIRONMENT, FILES, VERSIONS, CONFORMING TO, NOTES, BUGS, EXAMPLE, AUTHORS,
  and SEE ALSO.\n\n       The following conventions apply to the SYNOPSIS section
  and can be used as a guide in other sections.\n\n       bold text          type
  exactly as shown.\n       italic text        replace with appropriate argument.\n
  \      [-abc]             any or all arguments within [ ] are optional.\n       -a|-b
  \             options delimited by | cannot be used together.\n       argument ...
  \      argument is repeatable.\n       [expression] ...   entire expression within
  [ ] is repeatable.\n\n       Exact rendering may vary depending on the output device.
  \ For instance, man will usually not be able to render italics when running in a
  terminal, and will typically use underlined or coloured text instead.\n\n       The
  command or function illustration is a pattern that should match all possible invocations.
  \ In some cases it is advisable to illustrate several exclusive invocations as is
  shown in the SYNOPSIS section of this manual page.\n\nEXAMPLES\n       man ls\n
  \          Display the manual page for the item (program) ls.\n\n       man man.7\n
  \          Display the manual page for macro package man from section 7.\n```\n\n\n##
  But what if you don't?\n\n`cheat man`\n\n```bash\n# To convert a man page to pdf:\nman
  -t bash | ps2pdf - bash.pdf\n\n# To view the ascii chart:\nman 7 ascii\n```\n\nYou
  get tiny examples to remind you of what you **probably** are trying to do!"
date: 2022-06-23
description: '`man` can be a pain to read... and there&#x27;s lots of alternatives
  out there and one I&#x27;ve just started playing with is [cheat](https://github.com/cheat/c'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>cheat on your man</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"`man` can be a pain to read... and there&#x27;s
    lots of alternatives out there and one I&#x27;ve just started playing with is
    [cheat](https://github.com/cheat/c\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"cheat on your man | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/cheat-on-your-man\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"cheat on your man | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"`man` can be a pain to read... and there&#x27;s lots of alternatives
    out there and one I&#x27;ve just started playing with is [cheat](https://github.com/cheat/c\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/cheat-on-your-man</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header>    <div class=\"post-terminal__search\">\n<div
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    </div>\n<section
    class=\"post-terminal  post-terminal--til \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">cheat on your man</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-06-23\">\n            June
    23, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/cli/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #cli\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p><code>man</code> can be a pain to read...
    and there's lots of alternatives out there and one I've just started playing with
    is <a href=\"https://github.com/cheat/cheat\">cheat</a></p>\n<p><code>man man</code>
    will give you this plus a billion more lines of docs, which is useful when you
    need it...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>MAN<span class=\"o\">(</span><span
    class=\"m\">1</span><span class=\"o\">)</span><span class=\"w\">                                                                                                                       </span>Manual<span
    class=\"w\"> </span>pager<span class=\"w\"> </span>utils<span class=\"w\">                                                                                                                      </span>MAN<span
    class=\"o\">(</span><span class=\"m\">1</span><span class=\"o\">)</span>\n\nNAME\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>-<span class=\"w\"> </span>an<span
    class=\"w\"> </span>interface<span class=\"w\"> </span>to<span class=\"w\"> </span>the<span
    class=\"w\"> </span>on-line<span class=\"w\"> </span>reference<span class=\"w\">
    </span>manuals\n\nSYNOPSIS\n<span class=\"w\">       </span>man<span class=\"w\">
    \ </span><span class=\"o\">[</span>-C<span class=\"w\">  </span>file<span class=\"o\">]</span><span
    class=\"w\">  </span><span class=\"o\">[</span>-d<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-D<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--warnings<span class=\"o\">[=</span>warnings<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-R<span
    class=\"w\"> </span>encoding<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-m<span class=\"w\"> </span>system<span
    class=\"o\">[</span>,...<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-M<span class=\"w\"> </span>path<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-S<span class=\"w\"> </span>list<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-e<span
    class=\"w\"> </span>extension<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"p\">|</span>--wildcard<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--names-only<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-a<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-u<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-subpages<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
    class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-hyphenation<span
    class=\"o\">]</span>\n<span class=\"w\">       </span><span class=\"o\">[</span>--no-justification<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
    class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
    class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[[</span>section<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"o\">[</span>.section<span class=\"o\">]</span><span class=\"w\"> </span>...<span
    class=\"o\">]</span><span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>-k<span class=\"w\"> </span><span class=\"o\">[</span>apropos<span
    class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>regexp<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-K<span class=\"w\"> </span><span class=\"o\">[</span>-w<span class=\"p\">|</span>-W<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-S<span
    class=\"w\"> </span>list<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>section<span class=\"o\">]</span><span
    class=\"w\"> </span>term<span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>-f<span class=\"w\"> </span><span class=\"o\">[</span>whatis<span
    class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-l<span class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\">
    </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--warnings<span
    class=\"o\">[=</span>warnings<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-R<span class=\"w\"> </span>encoding<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
    class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
    class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
    class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span>file<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-w<span class=\"p\">|</span>-W<span class=\"w\"> </span><span class=\"o\">[</span>-C<span
    class=\"w\"> </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-d<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-D<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-c<span class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\">
    </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
    class=\"o\">]</span><span class=\"w\"> </span>page<span class=\"w\"> </span>...\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span><span class=\"o\">[</span>-?V<span
    class=\"o\">]</span>\n\nDESCRIPTION\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>system<span
    class=\"err\">&#39;</span>s<span class=\"w\"> </span>manual<span class=\"w\">
    </span>pager.<span class=\"w\">  </span>Each<span class=\"w\"> </span>page<span
    class=\"w\"> </span>argument<span class=\"w\"> </span>given<span class=\"w\">
    </span>to<span class=\"w\"> </span>man<span class=\"w\"> </span>is<span class=\"w\">
    </span>normally<span class=\"w\"> </span>the<span class=\"w\"> </span>name<span
    class=\"w\"> </span>of<span class=\"w\"> </span>a<span class=\"w\"> </span>program,<span
    class=\"w\"> </span>utility<span class=\"w\"> </span>or<span class=\"w\"> </span><span
    class=\"k\">function</span>.<span class=\"w\">  </span>The<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span>associated<span class=\"w\">
    </span>with<span class=\"w\"> </span>each<span class=\"w\"> </span>of<span class=\"w\">
    </span>these<span class=\"w\"> </span>arguments<span class=\"w\"> </span>is<span
    class=\"w\"> </span><span class=\"k\">then</span><span class=\"w\"> </span>found<span
    class=\"w\"> </span>and<span class=\"w\"> </span>displayed.<span class=\"w\">
    \ </span>A<span class=\"w\"> </span>section,<span class=\"w\"> </span><span class=\"k\">if</span><span
    class=\"w\"> </span>provided,<span class=\"w\"> </span>will<span class=\"w\">
    </span>direct<span class=\"w\">  </span>man<span class=\"w\">  </span>to<span
    class=\"w\">  </span>look\n<span class=\"w\">       </span>only<span class=\"w\">
    \ </span><span class=\"k\">in</span><span class=\"w\">  </span>that<span class=\"w\">
    \ </span>section<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
    class=\"w\"> </span>manual.<span class=\"w\">  </span>The<span class=\"w\"> </span>default<span
    class=\"w\"> </span>action<span class=\"w\"> </span>is<span class=\"w\"> </span>to<span
    class=\"w\"> </span>search<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>all<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
    class=\"w\"> </span>available<span class=\"w\"> </span>sections<span class=\"w\">
    </span>following<span class=\"w\"> </span>a<span class=\"w\"> </span>pre-defined<span
    class=\"w\"> </span>order<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"s2\">&quot;1 n l 8 3 2 3posix 3pm 3perl 3am 5 4 9 6 7&quot;</span><span
    class=\"w\"> </span>by<span class=\"w\"> </span>default,<span class=\"w\"> </span>unless<span
    class=\"w\"> </span>overridden<span class=\"w\"> </span>by<span class=\"w\"> </span>the<span
    class=\"w\"> </span>SECTION<span class=\"w\"> </span>directive<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>/etc/manpath.config<span
    class=\"o\">)</span>,\n<span class=\"w\">       </span>and<span class=\"w\"> </span>to<span
    class=\"w\"> </span>show<span class=\"w\"> </span>only<span class=\"w\"> </span>the<span
    class=\"w\"> </span>first<span class=\"w\"> </span>page<span class=\"w\"> </span>found,<span
    class=\"w\"> </span>even<span class=\"w\"> </span><span class=\"k\">if</span><span
    class=\"w\"> </span>page<span class=\"w\"> </span>exists<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span
    class=\"w\">       </span>The<span class=\"w\"> </span>table<span class=\"w\">
    </span>below<span class=\"w\"> </span>shows<span class=\"w\"> </span>the<span
    class=\"w\"> </span>section<span class=\"w\"> </span>numbers<span class=\"w\">
    </span>of<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span class=\"w\">
    </span>followed<span class=\"w\"> </span>by<span class=\"w\"> </span>the<span
    class=\"w\"> </span>types<span class=\"w\"> </span>of<span class=\"w\"> </span>pages<span
    class=\"w\"> </span>they<span class=\"w\"> </span>contain.\n\n<span class=\"w\">
    \      </span><span class=\"m\">1</span><span class=\"w\">   </span>Executable<span
    class=\"w\"> </span>programs<span class=\"w\"> </span>or<span class=\"w\"> </span>shell<span
    class=\"w\"> </span>commands\n<span class=\"w\">       </span><span class=\"m\">2</span><span
    class=\"w\">   </span>System<span class=\"w\"> </span>calls<span class=\"w\">
    </span><span class=\"o\">(</span>functions<span class=\"w\"> </span>provided<span
    class=\"w\"> </span>by<span class=\"w\"> </span>the<span class=\"w\"> </span>kernel<span
    class=\"o\">)</span>\n<span class=\"w\">       </span><span class=\"m\">3</span><span
    class=\"w\">   </span>Library<span class=\"w\"> </span>calls<span class=\"w\">
    </span><span class=\"o\">(</span>functions<span class=\"w\"> </span>within<span
    class=\"w\"> </span>program<span class=\"w\"> </span>libraries<span class=\"o\">)</span>\n<span
    class=\"w\">       </span><span class=\"m\">4</span><span class=\"w\">   </span>Special<span
    class=\"w\"> </span>files<span class=\"w\"> </span><span class=\"o\">(</span>usually<span
    class=\"w\"> </span>found<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>/dev<span class=\"o\">)</span>\n<span class=\"w\">       </span><span
    class=\"m\">5</span><span class=\"w\">   </span>File<span class=\"w\"> </span>formats<span
    class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span class=\"w\">
    </span>eg<span class=\"w\"> </span>/etc/passwd\n<span class=\"w\">       </span><span
    class=\"m\">6</span><span class=\"w\">   </span>Games\n<span class=\"w\">       </span><span
    class=\"m\">7</span><span class=\"w\">   </span>Miscellaneous<span class=\"w\">
    </span><span class=\"o\">(</span>including<span class=\"w\"> </span>macro<span
    class=\"w\"> </span>packages<span class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span
    class=\"o\">)</span>,<span class=\"w\"> </span>e.g.<span class=\"w\"> </span>man<span
    class=\"o\">(</span><span class=\"m\">7</span><span class=\"o\">)</span>,<span
    class=\"w\"> </span>groff<span class=\"o\">(</span><span class=\"m\">7</span><span
    class=\"o\">)</span>\n<span class=\"w\">       </span><span class=\"m\">8</span><span
    class=\"w\">   </span>System<span class=\"w\"> </span>administration<span class=\"w\">
    </span>commands<span class=\"w\"> </span><span class=\"o\">(</span>usually<span
    class=\"w\"> </span>only<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>root<span class=\"o\">)</span>\n<span class=\"w\">       </span><span
    class=\"m\">9</span><span class=\"w\">   </span>Kernel<span class=\"w\"> </span>routines<span
    class=\"w\"> </span><span class=\"o\">[</span>Non<span class=\"w\"> </span>standard<span
    class=\"o\">]</span>\n\n<span class=\"w\">       </span>A<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span>consists<span class=\"w\"> </span>of<span
    class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span class=\"w\">
    \      </span>Conventional<span class=\"w\"> </span>section<span class=\"w\">
    </span>names<span class=\"w\"> </span>include<span class=\"w\"> </span>NAME,<span
    class=\"w\"> </span>SYNOPSIS,<span class=\"w\"> </span>CONFIGURATION,<span class=\"w\">
    </span>DESCRIPTION,<span class=\"w\"> </span>OPTIONS,<span class=\"w\"> </span>EXIT<span
    class=\"w\"> </span>STATUS,<span class=\"w\"> </span>RETURN<span class=\"w\">
    </span>VALUE,<span class=\"w\"> </span>ERRORS,<span class=\"w\"> </span>ENVIRONMENT,<span
    class=\"w\"> </span>FILES,<span class=\"w\"> </span>VERSIONS,<span class=\"w\">
    </span>CONFORMING<span class=\"w\"> </span>TO,<span class=\"w\"> </span>NOTES,<span
    class=\"w\"> </span>BUGS,<span class=\"w\"> </span>EXAMPLE,<span class=\"w\">
    </span>AUTHORS,<span class=\"w\"> </span>and<span class=\"w\"> </span>SEE<span
    class=\"w\"> </span>ALSO.\n\n<span class=\"w\">       </span>The<span class=\"w\">
    </span>following<span class=\"w\"> </span>conventions<span class=\"w\"> </span>apply<span
    class=\"w\"> </span>to<span class=\"w\"> </span>the<span class=\"w\"> </span>SYNOPSIS<span
    class=\"w\"> </span>section<span class=\"w\"> </span>and<span class=\"w\"> </span>can<span
    class=\"w\"> </span>be<span class=\"w\"> </span>used<span class=\"w\"> </span>as<span
    class=\"w\"> </span>a<span class=\"w\"> </span>guide<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>other<span class=\"w\"> </span>sections.\n\n<span
    class=\"w\">       </span>bold<span class=\"w\"> </span>text<span class=\"w\">
    \         </span><span class=\"nb\">type</span><span class=\"w\"> </span>exactly<span
    class=\"w\"> </span>as<span class=\"w\"> </span>shown.\n<span class=\"w\">       </span>italic<span
    class=\"w\"> </span>text<span class=\"w\">        </span>replace<span class=\"w\">
    </span>with<span class=\"w\"> </span>appropriate<span class=\"w\"> </span>argument.\n<span
    class=\"w\">       </span><span class=\"o\">[</span>-abc<span class=\"o\">]</span><span
    class=\"w\">             </span>any<span class=\"w\"> </span>or<span class=\"w\">
    </span>all<span class=\"w\"> </span>arguments<span class=\"w\"> </span>within<span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"w\"> </span>are<span class=\"w\"> </span>optional.\n<span
    class=\"w\">       </span>-a<span class=\"p\">|</span>-b<span class=\"w\">              </span>options<span
    class=\"w\"> </span>delimited<span class=\"w\"> </span>by<span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>cannot<span class=\"w\"> </span>be<span
    class=\"w\"> </span>used<span class=\"w\"> </span>together.\n<span class=\"w\">
    \      </span>argument<span class=\"w\"> </span>...<span class=\"w\">       </span>argument<span
    class=\"w\"> </span>is<span class=\"w\"> </span>repeatable.\n<span class=\"w\">
    \      </span><span class=\"o\">[</span>expression<span class=\"o\">]</span><span
    class=\"w\"> </span>...<span class=\"w\">   </span>entire<span class=\"w\"> </span>expression<span
    class=\"w\"> </span>within<span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"w\"> </span>is<span
    class=\"w\"> </span>repeatable.\n\n<span class=\"w\">       </span>Exact<span
    class=\"w\"> </span>rendering<span class=\"w\"> </span>may<span class=\"w\"> </span>vary<span
    class=\"w\"> </span>depending<span class=\"w\"> </span>on<span class=\"w\"> </span>the<span
    class=\"w\"> </span>output<span class=\"w\"> </span>device.<span class=\"w\">
    \ </span>For<span class=\"w\"> </span>instance,<span class=\"w\"> </span>man<span
    class=\"w\"> </span>will<span class=\"w\"> </span>usually<span class=\"w\"> </span>not<span
    class=\"w\"> </span>be<span class=\"w\"> </span>able<span class=\"w\"> </span>to<span
    class=\"w\"> </span>render<span class=\"w\"> </span>italics<span class=\"w\">
    </span>when<span class=\"w\"> </span>running<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>a<span class=\"w\"> </span>terminal,<span class=\"w\"> </span>and<span
    class=\"w\"> </span>will<span class=\"w\"> </span>typically<span class=\"w\">
    </span>use<span class=\"w\"> </span>underlined<span class=\"w\"> </span>or<span
    class=\"w\"> </span>coloured<span class=\"w\"> </span>text<span class=\"w\"> </span>instead.\n\n<span
    class=\"w\">       </span>The<span class=\"w\"> </span><span class=\"nb\">command</span><span
    class=\"w\"> </span>or<span class=\"w\"> </span><span class=\"k\">function</span><span
    class=\"w\"> </span>illustration<span class=\"w\"> </span>is<span class=\"w\">
    </span>a<span class=\"w\"> </span>pattern<span class=\"w\"> </span>that<span class=\"w\">
    </span>should<span class=\"w\"> </span>match<span class=\"w\"> </span>all<span
    class=\"w\"> </span>possible<span class=\"w\"> </span>invocations.<span class=\"w\">
    \ </span>In<span class=\"w\"> </span>some<span class=\"w\"> </span>cases<span
    class=\"w\"> </span>it<span class=\"w\"> </span>is<span class=\"w\"> </span>advisable<span
    class=\"w\"> </span>to<span class=\"w\"> </span>illustrate<span class=\"w\"> </span>several<span
    class=\"w\"> </span>exclusive<span class=\"w\"> </span>invocations<span class=\"w\">
    </span>as<span class=\"w\"> </span>is<span class=\"w\"> </span>shown<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>the<span class=\"w\">
    </span>SYNOPSIS<span class=\"w\"> </span>section<span class=\"w\"> </span>of<span
    class=\"w\"> </span>this<span class=\"w\"> </span>manual<span class=\"w\"> </span>page.\n\nEXAMPLES\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>ls\n<span class=\"w\">
    \          </span>Display<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>the<span class=\"w\"> </span>item<span class=\"w\"> </span><span
    class=\"o\">(</span>program<span class=\"o\">)</span><span class=\"w\"> </span>ls.\n\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>man.7\n<span class=\"w\">
    \          </span>Display<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>macro<span class=\"w\"> </span>package<span class=\"w\"> </span>man<span
    class=\"w\"> </span>from<span class=\"w\"> </span>section<span class=\"w\"> </span><span
    class=\"m\">7</span>.\n</pre></div>\n\n</pre>\n\n<h2 id=\"but-what-if-you-dont\">But
    what if you don't? <a class=\"header-anchor\" href=\"#but-what-if-you-dont\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>cheat man</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># To convert
    a man page to pdf:</span>\nman<span class=\"w\"> </span>-t<span class=\"w\"> </span>bash<span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>ps2pdf<span
    class=\"w\"> </span>-<span class=\"w\"> </span>bash.pdf\n\n<span class=\"c1\">#
    To view the ascii chart:</span>\nman<span class=\"w\"> </span><span class=\"m\">7</span><span
    class=\"w\"> </span>ascii\n</pre></div>\n\n</pre>\n\n<p>You get tiny examples
    to remind you of what you <strong>probably</strong> are trying to do!</p>\n\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>cheat on your man</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"`man` can be a pain to read... and there&#x27;s
    lots of alternatives out there and one I&#x27;ve just started playing with is
    [cheat](https://github.com/cheat/c\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"cheat on your man | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/cheat-on-your-man\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"cheat on your man | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"`man` can be a pain to read... and there&#x27;s lots of alternatives
    out there and one I&#x27;ve just started playing with is [cheat](https://github.com/cheat/c\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">cheat on your man</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-06-23\">\n            June
    23, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/cli/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #cli\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal  post-terminal--til \">\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">cheat on your
    man</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2022-06-23\">\n            June 23, 2022\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/linux/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #linux\n            </a>\n            <a href=\"https://pype.dev//tags/cli/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #cli\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p><code>man</code>
    can be a pain to read... and there's lots of alternatives out there and one I've
    just started playing with is <a href=\"https://github.com/cheat/cheat\">cheat</a></p>\n<p><code>man
    man</code> will give you this plus a billion more lines of docs, which is useful
    when you need it...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>MAN<span class=\"o\">(</span><span
    class=\"m\">1</span><span class=\"o\">)</span><span class=\"w\">                                                                                                                       </span>Manual<span
    class=\"w\"> </span>pager<span class=\"w\"> </span>utils<span class=\"w\">                                                                                                                      </span>MAN<span
    class=\"o\">(</span><span class=\"m\">1</span><span class=\"o\">)</span>\n\nNAME\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>-<span class=\"w\"> </span>an<span
    class=\"w\"> </span>interface<span class=\"w\"> </span>to<span class=\"w\"> </span>the<span
    class=\"w\"> </span>on-line<span class=\"w\"> </span>reference<span class=\"w\">
    </span>manuals\n\nSYNOPSIS\n<span class=\"w\">       </span>man<span class=\"w\">
    \ </span><span class=\"o\">[</span>-C<span class=\"w\">  </span>file<span class=\"o\">]</span><span
    class=\"w\">  </span><span class=\"o\">[</span>-d<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-D<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--warnings<span class=\"o\">[=</span>warnings<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-R<span
    class=\"w\"> </span>encoding<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-m<span class=\"w\"> </span>system<span
    class=\"o\">[</span>,...<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-M<span class=\"w\"> </span>path<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-S<span class=\"w\"> </span>list<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-e<span
    class=\"w\"> </span>extension<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"p\">|</span>--wildcard<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--names-only<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-a<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-u<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-subpages<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
    class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-hyphenation<span
    class=\"o\">]</span>\n<span class=\"w\">       </span><span class=\"o\">[</span>--no-justification<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
    class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
    class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[[</span>section<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"o\">[</span>.section<span class=\"o\">]</span><span class=\"w\"> </span>...<span
    class=\"o\">]</span><span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>-k<span class=\"w\"> </span><span class=\"o\">[</span>apropos<span
    class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>regexp<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-K<span class=\"w\"> </span><span class=\"o\">[</span>-w<span class=\"p\">|</span>-W<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-S<span
    class=\"w\"> </span>list<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>section<span class=\"o\">]</span><span
    class=\"w\"> </span>term<span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>-f<span class=\"w\"> </span><span class=\"o\">[</span>whatis<span
    class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-l<span class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\">
    </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--warnings<span
    class=\"o\">[=</span>warnings<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-R<span class=\"w\"> </span>encoding<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
    class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
    class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
    class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span>file<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-w<span class=\"p\">|</span>-W<span class=\"w\"> </span><span class=\"o\">[</span>-C<span
    class=\"w\"> </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-d<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-D<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-c<span class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\">
    </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
    class=\"o\">]</span><span class=\"w\"> </span>page<span class=\"w\"> </span>...\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span><span class=\"o\">[</span>-?V<span
    class=\"o\">]</span>\n\nDESCRIPTION\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>system<span
    class=\"err\">&#39;</span>s<span class=\"w\"> </span>manual<span class=\"w\">
    </span>pager.<span class=\"w\">  </span>Each<span class=\"w\"> </span>page<span
    class=\"w\"> </span>argument<span class=\"w\"> </span>given<span class=\"w\">
    </span>to<span class=\"w\"> </span>man<span class=\"w\"> </span>is<span class=\"w\">
    </span>normally<span class=\"w\"> </span>the<span class=\"w\"> </span>name<span
    class=\"w\"> </span>of<span class=\"w\"> </span>a<span class=\"w\"> </span>program,<span
    class=\"w\"> </span>utility<span class=\"w\"> </span>or<span class=\"w\"> </span><span
    class=\"k\">function</span>.<span class=\"w\">  </span>The<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span>associated<span class=\"w\">
    </span>with<span class=\"w\"> </span>each<span class=\"w\"> </span>of<span class=\"w\">
    </span>these<span class=\"w\"> </span>arguments<span class=\"w\"> </span>is<span
    class=\"w\"> </span><span class=\"k\">then</span><span class=\"w\"> </span>found<span
    class=\"w\"> </span>and<span class=\"w\"> </span>displayed.<span class=\"w\">
    \ </span>A<span class=\"w\"> </span>section,<span class=\"w\"> </span><span class=\"k\">if</span><span
    class=\"w\"> </span>provided,<span class=\"w\"> </span>will<span class=\"w\">
    </span>direct<span class=\"w\">  </span>man<span class=\"w\">  </span>to<span
    class=\"w\">  </span>look\n<span class=\"w\">       </span>only<span class=\"w\">
    \ </span><span class=\"k\">in</span><span class=\"w\">  </span>that<span class=\"w\">
    \ </span>section<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
    class=\"w\"> </span>manual.<span class=\"w\">  </span>The<span class=\"w\"> </span>default<span
    class=\"w\"> </span>action<span class=\"w\"> </span>is<span class=\"w\"> </span>to<span
    class=\"w\"> </span>search<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>all<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
    class=\"w\"> </span>available<span class=\"w\"> </span>sections<span class=\"w\">
    </span>following<span class=\"w\"> </span>a<span class=\"w\"> </span>pre-defined<span
    class=\"w\"> </span>order<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"s2\">&quot;1 n l 8 3 2 3posix 3pm 3perl 3am 5 4 9 6 7&quot;</span><span
    class=\"w\"> </span>by<span class=\"w\"> </span>default,<span class=\"w\"> </span>unless<span
    class=\"w\"> </span>overridden<span class=\"w\"> </span>by<span class=\"w\"> </span>the<span
    class=\"w\"> </span>SECTION<span class=\"w\"> </span>directive<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>/etc/manpath.config<span
    class=\"o\">)</span>,\n<span class=\"w\">       </span>and<span class=\"w\"> </span>to<span
    class=\"w\"> </span>show<span class=\"w\"> </span>only<span class=\"w\"> </span>the<span
    class=\"w\"> </span>first<span class=\"w\"> </span>page<span class=\"w\"> </span>found,<span
    class=\"w\"> </span>even<span class=\"w\"> </span><span class=\"k\">if</span><span
    class=\"w\"> </span>page<span class=\"w\"> </span>exists<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span
    class=\"w\">       </span>The<span class=\"w\"> </span>table<span class=\"w\">
    </span>below<span class=\"w\"> </span>shows<span class=\"w\"> </span>the<span
    class=\"w\"> </span>section<span class=\"w\"> </span>numbers<span class=\"w\">
    </span>of<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span class=\"w\">
    </span>followed<span class=\"w\"> </span>by<span class=\"w\"> </span>the<span
    class=\"w\"> </span>types<span class=\"w\"> </span>of<span class=\"w\"> </span>pages<span
    class=\"w\"> </span>they<span class=\"w\"> </span>contain.\n\n<span class=\"w\">
    \      </span><span class=\"m\">1</span><span class=\"w\">   </span>Executable<span
    class=\"w\"> </span>programs<span class=\"w\"> </span>or<span class=\"w\"> </span>shell<span
    class=\"w\"> </span>commands\n<span class=\"w\">       </span><span class=\"m\">2</span><span
    class=\"w\">   </span>System<span class=\"w\"> </span>calls<span class=\"w\">
    </span><span class=\"o\">(</span>functions<span class=\"w\"> </span>provided<span
    class=\"w\"> </span>by<span class=\"w\"> </span>the<span class=\"w\"> </span>kernel<span
    class=\"o\">)</span>\n<span class=\"w\">       </span><span class=\"m\">3</span><span
    class=\"w\">   </span>Library<span class=\"w\"> </span>calls<span class=\"w\">
    </span><span class=\"o\">(</span>functions<span class=\"w\"> </span>within<span
    class=\"w\"> </span>program<span class=\"w\"> </span>libraries<span class=\"o\">)</span>\n<span
    class=\"w\">       </span><span class=\"m\">4</span><span class=\"w\">   </span>Special<span
    class=\"w\"> </span>files<span class=\"w\"> </span><span class=\"o\">(</span>usually<span
    class=\"w\"> </span>found<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>/dev<span class=\"o\">)</span>\n<span class=\"w\">       </span><span
    class=\"m\">5</span><span class=\"w\">   </span>File<span class=\"w\"> </span>formats<span
    class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span class=\"w\">
    </span>eg<span class=\"w\"> </span>/etc/passwd\n<span class=\"w\">       </span><span
    class=\"m\">6</span><span class=\"w\">   </span>Games\n<span class=\"w\">       </span><span
    class=\"m\">7</span><span class=\"w\">   </span>Miscellaneous<span class=\"w\">
    </span><span class=\"o\">(</span>including<span class=\"w\"> </span>macro<span
    class=\"w\"> </span>packages<span class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span
    class=\"o\">)</span>,<span class=\"w\"> </span>e.g.<span class=\"w\"> </span>man<span
    class=\"o\">(</span><span class=\"m\">7</span><span class=\"o\">)</span>,<span
    class=\"w\"> </span>groff<span class=\"o\">(</span><span class=\"m\">7</span><span
    class=\"o\">)</span>\n<span class=\"w\">       </span><span class=\"m\">8</span><span
    class=\"w\">   </span>System<span class=\"w\"> </span>administration<span class=\"w\">
    </span>commands<span class=\"w\"> </span><span class=\"o\">(</span>usually<span
    class=\"w\"> </span>only<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>root<span class=\"o\">)</span>\n<span class=\"w\">       </span><span
    class=\"m\">9</span><span class=\"w\">   </span>Kernel<span class=\"w\"> </span>routines<span
    class=\"w\"> </span><span class=\"o\">[</span>Non<span class=\"w\"> </span>standard<span
    class=\"o\">]</span>\n\n<span class=\"w\">       </span>A<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span>consists<span class=\"w\"> </span>of<span
    class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span class=\"w\">
    \      </span>Conventional<span class=\"w\"> </span>section<span class=\"w\">
    </span>names<span class=\"w\"> </span>include<span class=\"w\"> </span>NAME,<span
    class=\"w\"> </span>SYNOPSIS,<span class=\"w\"> </span>CONFIGURATION,<span class=\"w\">
    </span>DESCRIPTION,<span class=\"w\"> </span>OPTIONS,<span class=\"w\"> </span>EXIT<span
    class=\"w\"> </span>STATUS,<span class=\"w\"> </span>RETURN<span class=\"w\">
    </span>VALUE,<span class=\"w\"> </span>ERRORS,<span class=\"w\"> </span>ENVIRONMENT,<span
    class=\"w\"> </span>FILES,<span class=\"w\"> </span>VERSIONS,<span class=\"w\">
    </span>CONFORMING<span class=\"w\"> </span>TO,<span class=\"w\"> </span>NOTES,<span
    class=\"w\"> </span>BUGS,<span class=\"w\"> </span>EXAMPLE,<span class=\"w\">
    </span>AUTHORS,<span class=\"w\"> </span>and<span class=\"w\"> </span>SEE<span
    class=\"w\"> </span>ALSO.\n\n<span class=\"w\">       </span>The<span class=\"w\">
    </span>following<span class=\"w\"> </span>conventions<span class=\"w\"> </span>apply<span
    class=\"w\"> </span>to<span class=\"w\"> </span>the<span class=\"w\"> </span>SYNOPSIS<span
    class=\"w\"> </span>section<span class=\"w\"> </span>and<span class=\"w\"> </span>can<span
    class=\"w\"> </span>be<span class=\"w\"> </span>used<span class=\"w\"> </span>as<span
    class=\"w\"> </span>a<span class=\"w\"> </span>guide<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>other<span class=\"w\"> </span>sections.\n\n<span
    class=\"w\">       </span>bold<span class=\"w\"> </span>text<span class=\"w\">
    \         </span><span class=\"nb\">type</span><span class=\"w\"> </span>exactly<span
    class=\"w\"> </span>as<span class=\"w\"> </span>shown.\n<span class=\"w\">       </span>italic<span
    class=\"w\"> </span>text<span class=\"w\">        </span>replace<span class=\"w\">
    </span>with<span class=\"w\"> </span>appropriate<span class=\"w\"> </span>argument.\n<span
    class=\"w\">       </span><span class=\"o\">[</span>-abc<span class=\"o\">]</span><span
    class=\"w\">             </span>any<span class=\"w\"> </span>or<span class=\"w\">
    </span>all<span class=\"w\"> </span>arguments<span class=\"w\"> </span>within<span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"w\"> </span>are<span class=\"w\"> </span>optional.\n<span
    class=\"w\">       </span>-a<span class=\"p\">|</span>-b<span class=\"w\">              </span>options<span
    class=\"w\"> </span>delimited<span class=\"w\"> </span>by<span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>cannot<span class=\"w\"> </span>be<span
    class=\"w\"> </span>used<span class=\"w\"> </span>together.\n<span class=\"w\">
    \      </span>argument<span class=\"w\"> </span>...<span class=\"w\">       </span>argument<span
    class=\"w\"> </span>is<span class=\"w\"> </span>repeatable.\n<span class=\"w\">
    \      </span><span class=\"o\">[</span>expression<span class=\"o\">]</span><span
    class=\"w\"> </span>...<span class=\"w\">   </span>entire<span class=\"w\"> </span>expression<span
    class=\"w\"> </span>within<span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"w\"> </span>is<span
    class=\"w\"> </span>repeatable.\n\n<span class=\"w\">       </span>Exact<span
    class=\"w\"> </span>rendering<span class=\"w\"> </span>may<span class=\"w\"> </span>vary<span
    class=\"w\"> </span>depending<span class=\"w\"> </span>on<span class=\"w\"> </span>the<span
    class=\"w\"> </span>output<span class=\"w\"> </span>device.<span class=\"w\">
    \ </span>For<span class=\"w\"> </span>instance,<span class=\"w\"> </span>man<span
    class=\"w\"> </span>will<span class=\"w\"> </span>usually<span class=\"w\"> </span>not<span
    class=\"w\"> </span>be<span class=\"w\"> </span>able<span class=\"w\"> </span>to<span
    class=\"w\"> </span>render<span class=\"w\"> </span>italics<span class=\"w\">
    </span>when<span class=\"w\"> </span>running<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>a<span class=\"w\"> </span>terminal,<span class=\"w\"> </span>and<span
    class=\"w\"> </span>will<span class=\"w\"> </span>typically<span class=\"w\">
    </span>use<span class=\"w\"> </span>underlined<span class=\"w\"> </span>or<span
    class=\"w\"> </span>coloured<span class=\"w\"> </span>text<span class=\"w\"> </span>instead.\n\n<span
    class=\"w\">       </span>The<span class=\"w\"> </span><span class=\"nb\">command</span><span
    class=\"w\"> </span>or<span class=\"w\"> </span><span class=\"k\">function</span><span
    class=\"w\"> </span>illustration<span class=\"w\"> </span>is<span class=\"w\">
    </span>a<span class=\"w\"> </span>pattern<span class=\"w\"> </span>that<span class=\"w\">
    </span>should<span class=\"w\"> </span>match<span class=\"w\"> </span>all<span
    class=\"w\"> </span>possible<span class=\"w\"> </span>invocations.<span class=\"w\">
    \ </span>In<span class=\"w\"> </span>some<span class=\"w\"> </span>cases<span
    class=\"w\"> </span>it<span class=\"w\"> </span>is<span class=\"w\"> </span>advisable<span
    class=\"w\"> </span>to<span class=\"w\"> </span>illustrate<span class=\"w\"> </span>several<span
    class=\"w\"> </span>exclusive<span class=\"w\"> </span>invocations<span class=\"w\">
    </span>as<span class=\"w\"> </span>is<span class=\"w\"> </span>shown<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>the<span class=\"w\">
    </span>SYNOPSIS<span class=\"w\"> </span>section<span class=\"w\"> </span>of<span
    class=\"w\"> </span>this<span class=\"w\"> </span>manual<span class=\"w\"> </span>page.\n\nEXAMPLES\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>ls\n<span class=\"w\">
    \          </span>Display<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>the<span class=\"w\"> </span>item<span class=\"w\"> </span><span
    class=\"o\">(</span>program<span class=\"o\">)</span><span class=\"w\"> </span>ls.\n\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>man.7\n<span class=\"w\">
    \          </span>Display<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>macro<span class=\"w\"> </span>package<span class=\"w\"> </span>man<span
    class=\"w\"> </span>from<span class=\"w\"> </span>section<span class=\"w\"> </span><span
    class=\"m\">7</span>.\n</pre></div>\n\n</pre>\n\n<h2 id=\"but-what-if-you-dont\">But
    what if you don't? <a class=\"header-anchor\" href=\"#but-what-if-you-dont\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>cheat man</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># To convert
    a man page to pdf:</span>\nman<span class=\"w\"> </span>-t<span class=\"w\"> </span>bash<span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>ps2pdf<span
    class=\"w\"> </span>-<span class=\"w\"> </span>bash.pdf\n\n<span class=\"c1\">#
    To view the ascii chart:</span>\nman<span class=\"w\"> </span><span class=\"m\">7</span><span
    class=\"w\"> </span>ascii\n</pre></div>\n\n</pre>\n\n<p>You get tiny examples
    to remind you of what you <strong>probably</strong> are trying to do!</p>\n\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>cheat on
    your man</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"`man` can be a pain
    to read... and there&#x27;s lots of alternatives out there and one I&#x27;ve just
    started playing with is [cheat](https://github.com/cheat/c\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"cheat on your man | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/cheat-on-your-man\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"cheat on your man | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"`man` can be a pain to read... and there&#x27;s lots of alternatives
    out there and one I&#x27;ve just started playing with is [cheat](https://github.com/cheat/c\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/cheat-on-your-man</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header><div id='didyoumean'>\n    <div
    class=\"mb-0\">\n        <!-- <label for=\"search\" class=\"block text-sm font-medium
    mb-2\">Search for a page</label> -->\n        <input type=\"text\" id=\"search\"\n
    \              class=\"w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800
    focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/' Search for
    a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
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
    Content is handled by the password protection plugin -->\n    <p><code>man</code>
    can be a pain to read... and there's lots of alternatives out there and one I've
    just started playing with is <a href=\"https://github.com/cheat/cheat\">cheat</a></p>\n<p><code>man
    man</code> will give you this plus a billion more lines of docs, which is useful
    when you need it...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>MAN<span class=\"o\">(</span><span
    class=\"m\">1</span><span class=\"o\">)</span><span class=\"w\">                                                                                                                       </span>Manual<span
    class=\"w\"> </span>pager<span class=\"w\"> </span>utils<span class=\"w\">                                                                                                                      </span>MAN<span
    class=\"o\">(</span><span class=\"m\">1</span><span class=\"o\">)</span>\n\nNAME\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>-<span class=\"w\"> </span>an<span
    class=\"w\"> </span>interface<span class=\"w\"> </span>to<span class=\"w\"> </span>the<span
    class=\"w\"> </span>on-line<span class=\"w\"> </span>reference<span class=\"w\">
    </span>manuals\n\nSYNOPSIS\n<span class=\"w\">       </span>man<span class=\"w\">
    \ </span><span class=\"o\">[</span>-C<span class=\"w\">  </span>file<span class=\"o\">]</span><span
    class=\"w\">  </span><span class=\"o\">[</span>-d<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-D<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--warnings<span class=\"o\">[=</span>warnings<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-R<span
    class=\"w\"> </span>encoding<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-m<span class=\"w\"> </span>system<span
    class=\"o\">[</span>,...<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-M<span class=\"w\"> </span>path<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-S<span class=\"w\"> </span>list<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-e<span
    class=\"w\"> </span>extension<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"p\">|</span>--wildcard<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--names-only<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-a<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-u<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-subpages<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
    class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--no-hyphenation<span
    class=\"o\">]</span>\n<span class=\"w\">       </span><span class=\"o\">[</span>--no-justification<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
    class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
    class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[[</span>section<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"o\">[</span>.section<span class=\"o\">]</span><span class=\"w\"> </span>...<span
    class=\"o\">]</span><span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>-k<span class=\"w\"> </span><span class=\"o\">[</span>apropos<span
    class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>regexp<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-K<span class=\"w\"> </span><span class=\"o\">[</span>-w<span class=\"p\">|</span>-W<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-S<span
    class=\"w\"> </span>list<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-i<span class=\"p\">|</span>-I<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>--regex<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>section<span class=\"o\">]</span><span
    class=\"w\"> </span>term<span class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>-f<span class=\"w\"> </span><span class=\"o\">[</span>whatis<span
    class=\"w\"> </span>options<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-l<span class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\">
    </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>--warnings<span
    class=\"o\">[=</span>warnings<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-R<span class=\"w\"> </span>encoding<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-L<span class=\"w\"> </span>locale<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-P<span
    class=\"w\"> </span>pager<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-r<span class=\"w\"> </span>prompt<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-7<span class=\"o\">]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-E<span class=\"w\"> </span>encoding<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-p<span
    class=\"w\"> </span>string<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-t<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-T<span class=\"o\">[</span>device<span class=\"o\">]]</span><span
    class=\"w\"> </span><span class=\"o\">[</span>-H<span class=\"o\">[</span>browser<span
    class=\"o\">]]</span><span class=\"w\"> </span><span class=\"o\">[</span>-X<span
    class=\"o\">[</span>dpi<span class=\"o\">]]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-Z<span class=\"o\">]</span><span class=\"w\"> </span>file<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-w<span class=\"p\">|</span>-W<span class=\"w\"> </span><span class=\"o\">[</span>-C<span
    class=\"w\"> </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-d<span class=\"o\">]</span><span class=\"w\"> </span><span
    class=\"o\">[</span>-D<span class=\"o\">]</span><span class=\"w\"> </span>page<span
    class=\"w\"> </span>...\n<span class=\"w\">       </span>man<span class=\"w\">
    </span>-c<span class=\"w\"> </span><span class=\"o\">[</span>-C<span class=\"w\">
    </span>file<span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-d<span
    class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">[</span>-D<span
    class=\"o\">]</span><span class=\"w\"> </span>page<span class=\"w\"> </span>...\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span><span class=\"o\">[</span>-?V<span
    class=\"o\">]</span>\n\nDESCRIPTION\n<span class=\"w\">       </span>man<span
    class=\"w\"> </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>system<span
    class=\"err\">&#39;</span>s<span class=\"w\"> </span>manual<span class=\"w\">
    </span>pager.<span class=\"w\">  </span>Each<span class=\"w\"> </span>page<span
    class=\"w\"> </span>argument<span class=\"w\"> </span>given<span class=\"w\">
    </span>to<span class=\"w\"> </span>man<span class=\"w\"> </span>is<span class=\"w\">
    </span>normally<span class=\"w\"> </span>the<span class=\"w\"> </span>name<span
    class=\"w\"> </span>of<span class=\"w\"> </span>a<span class=\"w\"> </span>program,<span
    class=\"w\"> </span>utility<span class=\"w\"> </span>or<span class=\"w\"> </span><span
    class=\"k\">function</span>.<span class=\"w\">  </span>The<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span>associated<span class=\"w\">
    </span>with<span class=\"w\"> </span>each<span class=\"w\"> </span>of<span class=\"w\">
    </span>these<span class=\"w\"> </span>arguments<span class=\"w\"> </span>is<span
    class=\"w\"> </span><span class=\"k\">then</span><span class=\"w\"> </span>found<span
    class=\"w\"> </span>and<span class=\"w\"> </span>displayed.<span class=\"w\">
    \ </span>A<span class=\"w\"> </span>section,<span class=\"w\"> </span><span class=\"k\">if</span><span
    class=\"w\"> </span>provided,<span class=\"w\"> </span>will<span class=\"w\">
    </span>direct<span class=\"w\">  </span>man<span class=\"w\">  </span>to<span
    class=\"w\">  </span>look\n<span class=\"w\">       </span>only<span class=\"w\">
    \ </span><span class=\"k\">in</span><span class=\"w\">  </span>that<span class=\"w\">
    \ </span>section<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
    class=\"w\"> </span>manual.<span class=\"w\">  </span>The<span class=\"w\"> </span>default<span
    class=\"w\"> </span>action<span class=\"w\"> </span>is<span class=\"w\"> </span>to<span
    class=\"w\"> </span>search<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>all<span class=\"w\"> </span>of<span class=\"w\"> </span>the<span
    class=\"w\"> </span>available<span class=\"w\"> </span>sections<span class=\"w\">
    </span>following<span class=\"w\"> </span>a<span class=\"w\"> </span>pre-defined<span
    class=\"w\"> </span>order<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"s2\">&quot;1 n l 8 3 2 3posix 3pm 3perl 3am 5 4 9 6 7&quot;</span><span
    class=\"w\"> </span>by<span class=\"w\"> </span>default,<span class=\"w\"> </span>unless<span
    class=\"w\"> </span>overridden<span class=\"w\"> </span>by<span class=\"w\"> </span>the<span
    class=\"w\"> </span>SECTION<span class=\"w\"> </span>directive<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>/etc/manpath.config<span
    class=\"o\">)</span>,\n<span class=\"w\">       </span>and<span class=\"w\"> </span>to<span
    class=\"w\"> </span>show<span class=\"w\"> </span>only<span class=\"w\"> </span>the<span
    class=\"w\"> </span>first<span class=\"w\"> </span>page<span class=\"w\"> </span>found,<span
    class=\"w\"> </span>even<span class=\"w\"> </span><span class=\"k\">if</span><span
    class=\"w\"> </span>page<span class=\"w\"> </span>exists<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span
    class=\"w\">       </span>The<span class=\"w\"> </span>table<span class=\"w\">
    </span>below<span class=\"w\"> </span>shows<span class=\"w\"> </span>the<span
    class=\"w\"> </span>section<span class=\"w\"> </span>numbers<span class=\"w\">
    </span>of<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span class=\"w\">
    </span>followed<span class=\"w\"> </span>by<span class=\"w\"> </span>the<span
    class=\"w\"> </span>types<span class=\"w\"> </span>of<span class=\"w\"> </span>pages<span
    class=\"w\"> </span>they<span class=\"w\"> </span>contain.\n\n<span class=\"w\">
    \      </span><span class=\"m\">1</span><span class=\"w\">   </span>Executable<span
    class=\"w\"> </span>programs<span class=\"w\"> </span>or<span class=\"w\"> </span>shell<span
    class=\"w\"> </span>commands\n<span class=\"w\">       </span><span class=\"m\">2</span><span
    class=\"w\">   </span>System<span class=\"w\"> </span>calls<span class=\"w\">
    </span><span class=\"o\">(</span>functions<span class=\"w\"> </span>provided<span
    class=\"w\"> </span>by<span class=\"w\"> </span>the<span class=\"w\"> </span>kernel<span
    class=\"o\">)</span>\n<span class=\"w\">       </span><span class=\"m\">3</span><span
    class=\"w\">   </span>Library<span class=\"w\"> </span>calls<span class=\"w\">
    </span><span class=\"o\">(</span>functions<span class=\"w\"> </span>within<span
    class=\"w\"> </span>program<span class=\"w\"> </span>libraries<span class=\"o\">)</span>\n<span
    class=\"w\">       </span><span class=\"m\">4</span><span class=\"w\">   </span>Special<span
    class=\"w\"> </span>files<span class=\"w\"> </span><span class=\"o\">(</span>usually<span
    class=\"w\"> </span>found<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>/dev<span class=\"o\">)</span>\n<span class=\"w\">       </span><span
    class=\"m\">5</span><span class=\"w\">   </span>File<span class=\"w\"> </span>formats<span
    class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span class=\"w\">
    </span>eg<span class=\"w\"> </span>/etc/passwd\n<span class=\"w\">       </span><span
    class=\"m\">6</span><span class=\"w\">   </span>Games\n<span class=\"w\">       </span><span
    class=\"m\">7</span><span class=\"w\">   </span>Miscellaneous<span class=\"w\">
    </span><span class=\"o\">(</span>including<span class=\"w\"> </span>macro<span
    class=\"w\"> </span>packages<span class=\"w\"> </span>and<span class=\"w\"> </span>conventions<span
    class=\"o\">)</span>,<span class=\"w\"> </span>e.g.<span class=\"w\"> </span>man<span
    class=\"o\">(</span><span class=\"m\">7</span><span class=\"o\">)</span>,<span
    class=\"w\"> </span>groff<span class=\"o\">(</span><span class=\"m\">7</span><span
    class=\"o\">)</span>\n<span class=\"w\">       </span><span class=\"m\">8</span><span
    class=\"w\">   </span>System<span class=\"w\"> </span>administration<span class=\"w\">
    </span>commands<span class=\"w\"> </span><span class=\"o\">(</span>usually<span
    class=\"w\"> </span>only<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>root<span class=\"o\">)</span>\n<span class=\"w\">       </span><span
    class=\"m\">9</span><span class=\"w\">   </span>Kernel<span class=\"w\"> </span>routines<span
    class=\"w\"> </span><span class=\"o\">[</span>Non<span class=\"w\"> </span>standard<span
    class=\"o\">]</span>\n\n<span class=\"w\">       </span>A<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span>consists<span class=\"w\"> </span>of<span
    class=\"w\"> </span>several<span class=\"w\"> </span>sections.\n\n<span class=\"w\">
    \      </span>Conventional<span class=\"w\"> </span>section<span class=\"w\">
    </span>names<span class=\"w\"> </span>include<span class=\"w\"> </span>NAME,<span
    class=\"w\"> </span>SYNOPSIS,<span class=\"w\"> </span>CONFIGURATION,<span class=\"w\">
    </span>DESCRIPTION,<span class=\"w\"> </span>OPTIONS,<span class=\"w\"> </span>EXIT<span
    class=\"w\"> </span>STATUS,<span class=\"w\"> </span>RETURN<span class=\"w\">
    </span>VALUE,<span class=\"w\"> </span>ERRORS,<span class=\"w\"> </span>ENVIRONMENT,<span
    class=\"w\"> </span>FILES,<span class=\"w\"> </span>VERSIONS,<span class=\"w\">
    </span>CONFORMING<span class=\"w\"> </span>TO,<span class=\"w\"> </span>NOTES,<span
    class=\"w\"> </span>BUGS,<span class=\"w\"> </span>EXAMPLE,<span class=\"w\">
    </span>AUTHORS,<span class=\"w\"> </span>and<span class=\"w\"> </span>SEE<span
    class=\"w\"> </span>ALSO.\n\n<span class=\"w\">       </span>The<span class=\"w\">
    </span>following<span class=\"w\"> </span>conventions<span class=\"w\"> </span>apply<span
    class=\"w\"> </span>to<span class=\"w\"> </span>the<span class=\"w\"> </span>SYNOPSIS<span
    class=\"w\"> </span>section<span class=\"w\"> </span>and<span class=\"w\"> </span>can<span
    class=\"w\"> </span>be<span class=\"w\"> </span>used<span class=\"w\"> </span>as<span
    class=\"w\"> </span>a<span class=\"w\"> </span>guide<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>other<span class=\"w\"> </span>sections.\n\n<span
    class=\"w\">       </span>bold<span class=\"w\"> </span>text<span class=\"w\">
    \         </span><span class=\"nb\">type</span><span class=\"w\"> </span>exactly<span
    class=\"w\"> </span>as<span class=\"w\"> </span>shown.\n<span class=\"w\">       </span>italic<span
    class=\"w\"> </span>text<span class=\"w\">        </span>replace<span class=\"w\">
    </span>with<span class=\"w\"> </span>appropriate<span class=\"w\"> </span>argument.\n<span
    class=\"w\">       </span><span class=\"o\">[</span>-abc<span class=\"o\">]</span><span
    class=\"w\">             </span>any<span class=\"w\"> </span>or<span class=\"w\">
    </span>all<span class=\"w\"> </span>arguments<span class=\"w\"> </span>within<span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"o\">]</span><span class=\"w\"> </span>are<span class=\"w\"> </span>optional.\n<span
    class=\"w\">       </span>-a<span class=\"p\">|</span>-b<span class=\"w\">              </span>options<span
    class=\"w\"> </span>delimited<span class=\"w\"> </span>by<span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>cannot<span class=\"w\"> </span>be<span
    class=\"w\"> </span>used<span class=\"w\"> </span>together.\n<span class=\"w\">
    \      </span>argument<span class=\"w\"> </span>...<span class=\"w\">       </span>argument<span
    class=\"w\"> </span>is<span class=\"w\"> </span>repeatable.\n<span class=\"w\">
    \      </span><span class=\"o\">[</span>expression<span class=\"o\">]</span><span
    class=\"w\"> </span>...<span class=\"w\">   </span>entire<span class=\"w\"> </span>expression<span
    class=\"w\"> </span>within<span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"w\"> </span>is<span
    class=\"w\"> </span>repeatable.\n\n<span class=\"w\">       </span>Exact<span
    class=\"w\"> </span>rendering<span class=\"w\"> </span>may<span class=\"w\"> </span>vary<span
    class=\"w\"> </span>depending<span class=\"w\"> </span>on<span class=\"w\"> </span>the<span
    class=\"w\"> </span>output<span class=\"w\"> </span>device.<span class=\"w\">
    \ </span>For<span class=\"w\"> </span>instance,<span class=\"w\"> </span>man<span
    class=\"w\"> </span>will<span class=\"w\"> </span>usually<span class=\"w\"> </span>not<span
    class=\"w\"> </span>be<span class=\"w\"> </span>able<span class=\"w\"> </span>to<span
    class=\"w\"> </span>render<span class=\"w\"> </span>italics<span class=\"w\">
    </span>when<span class=\"w\"> </span>running<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>a<span class=\"w\"> </span>terminal,<span class=\"w\"> </span>and<span
    class=\"w\"> </span>will<span class=\"w\"> </span>typically<span class=\"w\">
    </span>use<span class=\"w\"> </span>underlined<span class=\"w\"> </span>or<span
    class=\"w\"> </span>coloured<span class=\"w\"> </span>text<span class=\"w\"> </span>instead.\n\n<span
    class=\"w\">       </span>The<span class=\"w\"> </span><span class=\"nb\">command</span><span
    class=\"w\"> </span>or<span class=\"w\"> </span><span class=\"k\">function</span><span
    class=\"w\"> </span>illustration<span class=\"w\"> </span>is<span class=\"w\">
    </span>a<span class=\"w\"> </span>pattern<span class=\"w\"> </span>that<span class=\"w\">
    </span>should<span class=\"w\"> </span>match<span class=\"w\"> </span>all<span
    class=\"w\"> </span>possible<span class=\"w\"> </span>invocations.<span class=\"w\">
    \ </span>In<span class=\"w\"> </span>some<span class=\"w\"> </span>cases<span
    class=\"w\"> </span>it<span class=\"w\"> </span>is<span class=\"w\"> </span>advisable<span
    class=\"w\"> </span>to<span class=\"w\"> </span>illustrate<span class=\"w\"> </span>several<span
    class=\"w\"> </span>exclusive<span class=\"w\"> </span>invocations<span class=\"w\">
    </span>as<span class=\"w\"> </span>is<span class=\"w\"> </span>shown<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>the<span class=\"w\">
    </span>SYNOPSIS<span class=\"w\"> </span>section<span class=\"w\"> </span>of<span
    class=\"w\"> </span>this<span class=\"w\"> </span>manual<span class=\"w\"> </span>page.\n\nEXAMPLES\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>ls\n<span class=\"w\">
    \          </span>Display<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>the<span class=\"w\"> </span>item<span class=\"w\"> </span><span
    class=\"o\">(</span>program<span class=\"o\">)</span><span class=\"w\"> </span>ls.\n\n<span
    class=\"w\">       </span>man<span class=\"w\"> </span>man.7\n<span class=\"w\">
    \          </span>Display<span class=\"w\"> </span>the<span class=\"w\"> </span>manual<span
    class=\"w\"> </span>page<span class=\"w\"> </span><span class=\"k\">for</span><span
    class=\"w\"> </span>macro<span class=\"w\"> </span>package<span class=\"w\"> </span>man<span
    class=\"w\"> </span>from<span class=\"w\"> </span>section<span class=\"w\"> </span><span
    class=\"m\">7</span>.\n</pre></div>\n\n</pre>\n\n<h2 id=\"but-what-if-you-dont\">But
    what if you don't? <a class=\"header-anchor\" href=\"#but-what-if-you-dont\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>cheat man</code></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># To convert
    a man page to pdf:</span>\nman<span class=\"w\"> </span>-t<span class=\"w\"> </span>bash<span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>ps2pdf<span
    class=\"w\"> </span>-<span class=\"w\"> </span>bash.pdf\n\n<span class=\"c1\">#
    To view the ascii chart:</span>\nman<span class=\"w\"> </span><span class=\"m\">7</span><span
    class=\"w\"> </span>ascii\n</pre></div>\n\n</pre>\n\n<p>You get tiny examples
    to remind you of what you <strong>probably</strong> are trying to do!</p>\n\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2022-06-23 09:35:31\ntemplateKey: til\ntitle: cheat on your
    man\npublished: True\ntags:\n  - linux\n  - cli\n  - tech\n  - til\n\n---\n\n\n`man`
    can be a pain to read... and there's lots of alternatives out there and one I've
    just started playing with is [cheat](https://github.com/cheat/cheat)\n\n\n`man
    man` will give you this plus a billion more lines of docs, which is useful when
    you need it...\n\n```bash\nMAN(1)                                                                                                                       Manual
    pager utils                                                                                                                      MAN(1)\n\nNAME\n
    \      man - an interface to the on-line reference manuals\n\nSYNOPSIS\n       man
    \ [-C  file]  [-d] [-D] [--warnings[=warnings]] [-R encoding] [-L locale] [-m
    system[,...]] [-M path] [-S list] [-e extension] [-i|-I] [--regex|--wildcard]
    [--names-only] [-a] [-u] [--no-subpages] [-P pager] [-r prompt] [-7] [-E encoding]
    [--no-hyphenation]\n       [--no-justification] [-p string] [-t] [-T[device]]
    [-H[browser]] [-X[dpi]] [-Z] [[section] page[.section] ...] ...\n       man -k
    [apropos options] regexp ...\n       man -K [-w|-W] [-S list] [-i|-I] [--regex]
    [section] term ...\n       man -f [whatis options] page ...\n       man -l [-C
    file] [-d] [-D] [--warnings[=warnings]] [-R encoding] [-L locale] [-P pager] [-r
    prompt] [-7] [-E encoding] [-p string] [-t] [-T[device]] [-H[browser]] [-X[dpi]]
    [-Z] file ...\n       man -w|-W [-C file] [-d] [-D] page ...\n       man -c [-C
    file] [-d] [-D] page ...\n       man [-?V]\n\nDESCRIPTION\n       man is the system's
    manual pager.  Each page argument given to man is normally the name of a program,
    utility or function.  The manual page associated with each of these arguments
    is then found and displayed.  A section, if provided, will direct  man  to  look\n
    \      only  in  that  section of the manual.  The default action is to search
    in all of the available sections following a pre-defined order (\"1 n l 8 3 2
    3posix 3pm 3perl 3am 5 4 9 6 7\" by default, unless overridden by the SECTION
    directive in /etc/manpath.config),\n       and to show only the first page found,
    even if page exists in several sections.\n\n       The table below shows the section
    numbers of the manual followed by the types of pages they contain.\n\n       1
    \  Executable programs or shell commands\n       2   System calls (functions provided
    by the kernel)\n       3   Library calls (functions within program libraries)\n
    \      4   Special files (usually found in /dev)\n       5   File formats and
    conventions eg /etc/passwd\n       6   Games\n       7   Miscellaneous (including
    macro packages and conventions), e.g. man(7), groff(7)\n       8   System administration
    commands (usually only for root)\n       9   Kernel routines [Non standard]\n\n
    \      A manual page consists of several sections.\n\n       Conventional section
    names include NAME, SYNOPSIS, CONFIGURATION, DESCRIPTION, OPTIONS, EXIT STATUS,
    RETURN VALUE, ERRORS, ENVIRONMENT, FILES, VERSIONS, CONFORMING TO, NOTES, BUGS,
    EXAMPLE, AUTHORS, and SEE ALSO.\n\n       The following conventions apply to the
    SYNOPSIS section and can be used as a guide in other sections.\n\n       bold
    text          type exactly as shown.\n       italic text        replace with appropriate
    argument.\n       [-abc]             any or all arguments within [ ] are optional.\n
    \      -a|-b              options delimited by | cannot be used together.\n       argument
    ...       argument is repeatable.\n       [expression] ...   entire expression
    within [ ] is repeatable.\n\n       Exact rendering may vary depending on the
    output device.  For instance, man will usually not be able to render italics when
    running in a terminal, and will typically use underlined or coloured text instead.\n\n
    \      The command or function illustration is a pattern that should match all
    possible invocations.  In some cases it is advisable to illustrate several exclusive
    invocations as is shown in the SYNOPSIS section of this manual page.\n\nEXAMPLES\n
    \      man ls\n           Display the manual page for the item (program) ls.\n\n
    \      man man.7\n           Display the manual page for macro package man from
    section 7.\n```\n\n\n## But what if you don't?\n\n`cheat man`\n\n```bash\n# To
    convert a man page to pdf:\nman -t bash | ps2pdf - bash.pdf\n\n# To view the ascii
    chart:\nman 7 ascii\n```\n\nYou get tiny examples to remind you of what you **probably**
    are trying to do!\n"
published: true
slug: cheat-on-your-man
title: cheat on your man


---

`man` can be a pain to read... and there's lots of alternatives out there and one I've just started playing with is [cheat](https://github.com/cheat/cheat)


`man man` will give you this plus a billion more lines of docs, which is useful when you need it...

```bash
MAN(1)                                                                                                                       Manual pager utils                                                                                                                      MAN(1)

NAME
       man - an interface to the on-line reference manuals

SYNOPSIS
       man  [-C  file]  [-d] [-D] [--warnings[=warnings]] [-R encoding] [-L locale] [-m system[,...]] [-M path] [-S list] [-e extension] [-i|-I] [--regex|--wildcard] [--names-only] [-a] [-u] [--no-subpages] [-P pager] [-r prompt] [-7] [-E encoding] [--no-hyphenation]
       [--no-justification] [-p string] [-t] [-T[device]] [-H[browser]] [-X[dpi]] [-Z] [[section] page[.section] ...] ...
       man -k [apropos options] regexp ...
       man -K [-w|-W] [-S list] [-i|-I] [--regex] [section] term ...
       man -f [whatis options] page ...
       man -l [-C file] [-d] [-D] [--warnings[=warnings]] [-R encoding] [-L locale] [-P pager] [-r prompt] [-7] [-E encoding] [-p string] [-t] [-T[device]] [-H[browser]] [-X[dpi]] [-Z] file ...
       man -w|-W [-C file] [-d] [-D] page ...
       man -c [-C file] [-d] [-D] page ...
       man [-?V]

DESCRIPTION
       man is the system's manual pager.  Each page argument given to man is normally the name of a program, utility or function.  The manual page associated with each of these arguments is then found and displayed.  A section, if provided, will direct  man  to  look
       only  in  that  section of the manual.  The default action is to search in all of the available sections following a pre-defined order ("1 n l 8 3 2 3posix 3pm 3perl 3am 5 4 9 6 7" by default, unless overridden by the SECTION directive in /etc/manpath.config),
       and to show only the first page found, even if page exists in several sections.

       The table below shows the section numbers of the manual followed by the types of pages they contain.

       1   Executable programs or shell commands
       2   System calls (functions provided by the kernel)
       3   Library calls (functions within program libraries)
       4   Special files (usually found in /dev)
       5   File formats and conventions eg /etc/passwd
       6   Games
       7   Miscellaneous (including macro packages and conventions), e.g. man(7), groff(7)
       8   System administration commands (usually only for root)
       9   Kernel routines [Non standard]

       A manual page consists of several sections.

       Conventional section names include NAME, SYNOPSIS, CONFIGURATION, DESCRIPTION, OPTIONS, EXIT STATUS, RETURN VALUE, ERRORS, ENVIRONMENT, FILES, VERSIONS, CONFORMING TO, NOTES, BUGS, EXAMPLE, AUTHORS, and SEE ALSO.

       The following conventions apply to the SYNOPSIS section and can be used as a guide in other sections.

       bold text          type exactly as shown.
       italic text        replace with appropriate argument.
       [-abc]             any or all arguments within [ ] are optional.
       -a|-b              options delimited by | cannot be used together.
       argument ...       argument is repeatable.
       [expression] ...   entire expression within [ ] is repeatable.

       Exact rendering may vary depending on the output device.  For instance, man will usually not be able to render italics when running in a terminal, and will typically use underlined or coloured text instead.

       The command or function illustration is a pattern that should match all possible invocations.  In some cases it is advisable to illustrate several exclusive invocations as is shown in the SYNOPSIS section of this manual page.

EXAMPLES
       man ls
           Display the manual page for the item (program) ls.

       man man.7
           Display the manual page for macro package man from section 7.
```


## But what if you don't?

`cheat man`

```bash
# To convert a man page to pdf:
man -t bash | ps2pdf - bash.pdf

# To view the ascii chart:
man 7 ascii
```

You get tiny examples to remind you of what you **probably** are trying to do!