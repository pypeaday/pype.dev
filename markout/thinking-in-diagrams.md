---
content: '# Intro


  Something I didn''t appreciate earlier on in my career (and I''m only 8 as far as

  the age of that career goes anyways) was thinking through problems with

  diagrams... I''ve often approached a problem with code first, and immediately

  started implementing a solution. There''s nothing actually wrong with that especially
  when considering:


  1. people think differently

  2. some people think with their fingers

  3. recognizing that the first thing you build should be thrown away should give
  you freedom to "just start"


  Now with that said, let''s chat about how awesome diagrams are though...


  1. they put context in front of you without details

  2. you can express many more components of a system in a consumable way when compared
  to code

  3. diagrams help prioritize work and bubble up maybe unforseen dependencies

  4. they force you to wireframe before getting lost in the details


  ## Wireframing


  One of my biggest issue when I "just start coding" is not having a direction...

  I can put a few place holders `def this:` `def that:` in a few python modules,

  but without having every place holder in front of me it is hard to keep them

  straight, know the order or dependencies, etc.


  Diagrams aren''t beholden to a text file or series of them, and you can fit much

  more on your screen because you have all the X-Y available to you instead of

  the height of your monitor times your formatted lined length (usually 120 for

  me).


  Diagrams also make it easy to spew out onto a page the different components you

  need for a solution, without committing to an order (something that I cannot

  express well in scripts)


  ## A Plan


  Diagramming with purpose can get you to the place of having almost a

  paint-by-number experience building your app/system/etc. Beecause you separate

  the implemetation from the design and when you implement BASED on a design

  rather than implement to DISCOVER a design you will be more efficient and in my

  experience I''ve improved my ability to forsee issues that I wouldn''t have seen,

  or have historically missed, by putting the design down in front of me, the

  details of any integrations, etc. before starting to "just code".


  ## Good Enough


  A final note about diagrams for right now is that they''re easy to leave as

  "good enough". The point was to get a guide for solving a problem.


  Diagrams don''t have to be picture perfect, even for documentation''s sake. They

  can even remain somewhat unfinished (permitted you don''t get yourself into a

  bind of treating diagrams as docs that you didn''t clean up)


  Here''s an example of what I mean - I''m working on a simple workflow to take [my-thoughts](/my-thoughts)
  and post them to [[nostr]]. I started with a diagram like this...


  ![20250622112223_f1838d9b.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112223_f1838d9b.png)


  > In parallel I''m working on posting my blog to other social media - this small

  > workflow is apart of a larger initiative I''m working on at home


  AS you can see this diagram isn''t super detailed or pretty. But what it does it

  help me see the high level points of bringing my published thoughts to nostr as

  posts.


  After I have the simple steps, I''ve started diagramming out more details of each
  step:


  ![20250622112415_f18663e3.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112415_f18663e3.png)


  The diagram is easy to put notes on, add some color to for problems not yet solved,
  etc.


  And then with this diagram in front of me, it''s easy to begin building

  small-scoped components that will be assembled to my larger system, but without

  the pressure of constructing every part of the system at once


  # Fin


  Diagrams help me break up a problem into manageable chunks so that I can put

  the things I need later on the back-burner and can focus on one achievable

  thing at a time.'
date: 2025-06-20
description: 'Intro Something I didn&#x27;t appreciate earlier on in my career (and
  I&#x27;m only 8 as far as

  the age of that career goes anyways) was thinking through proble'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Thinking In Diagrams</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Intro Something I didn&#x27;t appreciate
    earlier on in my career (and I&#x27;m only 8 as far as\nthe age of that career
    goes anyways) was thinking through proble\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Thinking In Diagrams | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/thinking-in-diagrams\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Thinking In Diagrams | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Intro Something I didn&#x27;t appreciate earlier on in my career (and
    I&#x27;m only 8 as far as\nthe age of that career goes anyways) was thinking through
    proble\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"
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
    \           <span class=\"site-terminal__dir\">~/thinking-in-diagrams</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"
    alt=\"Thinking In Diagrams cover image\">\n        </div>\n    </figure>\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Thinking In Diagrams</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2025-06-20\">\n            June 20, 2025\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #homelab\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/dev-ops/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #dev-ops\n            </a>\n            <a href=\"https://pype.dev//tags/planning/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #planning\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <h1
    id=\"intro\">Intro <a class=\"header-anchor\" href=\"#intro\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Something I didn't appreciate
    earlier on in my career (and I'm only 8 as far as\nthe age of that career goes
    anyways) was thinking through problems with\ndiagrams... I've often approached
    a problem with code first, and immediately\nstarted implementing a solution. There's
    nothing actually wrong with that especially when considering:</p>\n<ol>\n<li>people
    think differently</li>\n<li>some people think with their fingers</li>\n<li>recognizing
    that the first thing you build should be thrown away should give you freedom to
    &quot;just start&quot;</li>\n</ol>\n<p>Now with that said, let's chat about how
    awesome diagrams are though...</p>\n<ol>\n<li>they put context in front of you
    without details</li>\n<li>you can express many more components of a system in
    a consumable way when compared to code</li>\n<li>diagrams help prioritize work
    and bubble up maybe unforseen dependencies</li>\n<li>they force you to wireframe
    before getting lost in the details</li>\n</ol>\n<h2 id=\"wireframing\">Wireframing
    <a class=\"header-anchor\" href=\"#wireframing\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of my biggest issue
    when I &quot;just start coding&quot; is not having a direction...\nI can put a
    few place holders <code>def this:</code> <code>def that:</code> in a few python
    modules,\nbut without having every place holder in front of me it is hard to keep
    them\nstraight, know the order or dependencies, etc.</p>\n<p>Diagrams aren't beholden
    to a text file or series of them, and you can fit much\nmore on your screen because
    you have all the X-Y available to you instead of\nthe height of your monitor times
    your formatted lined length (usually 120 for\nme).</p>\n<p>Diagrams also make
    it easy to spew out onto a page the different components you\nneed for a solution,
    without committing to an order (something that I cannot\nexpress well in scripts)</p>\n<h2
    id=\"a-plan\">A Plan <a class=\"header-anchor\" href=\"#a-plan\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Diagramming with purpose
    can get you to the place of having almost a\npaint-by-number experience building
    your app/system/etc. Beecause you separate\nthe implemetation from the design
    and when you implement BASED on a design\nrather than implement to DISCOVER a
    design you will be more efficient and in my\nexperience I've improved my ability
    to forsee issues that I wouldn't have seen,\nor have historically missed, by putting
    the design down in front of me, the\ndetails of any integrations, etc. before
    starting to &quot;just code&quot;.</p>\n<h2 id=\"good-enough\">Good Enough <a
    class=\"header-anchor\" href=\"#good-enough\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>A final note about diagrams
    for right now is that they're easy to leave as\n&quot;good enough&quot;. The point
    was to get a guide for solving a problem.</p>\n<p>Diagrams don't have to be picture
    perfect, even for documentation's sake. They\ncan even remain somewhat unfinished
    (permitted you don't get yourself into a\nbind of treating diagrams as docs that
    you didn't clean up)</p>\n<p>Here's an example of what I mean - I'm working on
    a simple workflow to take <a href=\"/my-thoughts\">my-thoughts</a> and post them
    to <a class=\"wikilink\" href=\"/nostr\">nostr</a>. I started with a diagram like
    this...</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112223_f1838d9b.png\"
    alt=\"20250622112223_f1838d9b.png\" /></p>\n<blockquote>\n<p>In parallel I'm working
    on posting my blog to other social media - this small\nworkflow is apart of a
    larger initiative I'm working on at home</p>\n</blockquote>\n<p>AS you can see
    this diagram isn't super detailed or pretty. But what it does it\nhelp me see
    the high level points of bringing my published thoughts to nostr as\nposts.</p>\n<p>After
    I have the simple steps, I've started diagramming out more details of each step:</p>\n<p><img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112415_f18663e3.png\"
    alt=\"20250622112415_f18663e3.png\" /></p>\n<p>The diagram is easy to put notes
    on, add some color to for problems not yet solved, etc.</p>\n<p>And then with
    this diagram in front of me, it's easy to begin building\nsmall-scoped components
    that will be assembled to my larger system, but without\nthe pressure of constructing
    every part of the system at once</p>\n<h1 id=\"fin\">Fin <a class=\"header-anchor\"
    href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Diagrams help me break
    up a problem into manageable chunks so that I can put\nthe things I need later
    on the back-burner and can focus on one achievable\nthing at a time.</p>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Thinking In Diagrams</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Intro Something I didn&#x27;t appreciate
    earlier on in my career (and I&#x27;m only 8 as far as\nthe age of that career
    goes anyways) was thinking through proble\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Thinking In Diagrams | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/thinking-in-diagrams\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Thinking In Diagrams | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Intro Something I didn&#x27;t appreciate earlier on in my career (and
    I&#x27;m only 8 as far as\nthe age of that career goes anyways) was thinking through
    proble\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"
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
    mb-4 post-title-large\">Thinking In Diagrams</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-06-20\">\n            June
    20, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/dev-ops/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #dev-ops\n
    \           </a>\n            <a href=\"https://pype.dev//tags/planning/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #planning\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"
    alt=\"Thinking In Diagrams cover image\">\n        </div>\n    </figure>\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Thinking In Diagrams</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2025-06-20\">\n            June 20, 2025\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #homelab\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/dev-ops/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #dev-ops\n            </a>\n            <a href=\"https://pype.dev//tags/planning/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #planning\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <h1
    id=\"intro\">Intro <a class=\"header-anchor\" href=\"#intro\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Something I didn't appreciate
    earlier on in my career (and I'm only 8 as far as\nthe age of that career goes
    anyways) was thinking through problems with\ndiagrams... I've often approached
    a problem with code first, and immediately\nstarted implementing a solution. There's
    nothing actually wrong with that especially when considering:</p>\n<ol>\n<li>people
    think differently</li>\n<li>some people think with their fingers</li>\n<li>recognizing
    that the first thing you build should be thrown away should give you freedom to
    &quot;just start&quot;</li>\n</ol>\n<p>Now with that said, let's chat about how
    awesome diagrams are though...</p>\n<ol>\n<li>they put context in front of you
    without details</li>\n<li>you can express many more components of a system in
    a consumable way when compared to code</li>\n<li>diagrams help prioritize work
    and bubble up maybe unforseen dependencies</li>\n<li>they force you to wireframe
    before getting lost in the details</li>\n</ol>\n<h2 id=\"wireframing\">Wireframing
    <a class=\"header-anchor\" href=\"#wireframing\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of my biggest issue
    when I &quot;just start coding&quot; is not having a direction...\nI can put a
    few place holders <code>def this:</code> <code>def that:</code> in a few python
    modules,\nbut without having every place holder in front of me it is hard to keep
    them\nstraight, know the order or dependencies, etc.</p>\n<p>Diagrams aren't beholden
    to a text file or series of them, and you can fit much\nmore on your screen because
    you have all the X-Y available to you instead of\nthe height of your monitor times
    your formatted lined length (usually 120 for\nme).</p>\n<p>Diagrams also make
    it easy to spew out onto a page the different components you\nneed for a solution,
    without committing to an order (something that I cannot\nexpress well in scripts)</p>\n<h2
    id=\"a-plan\">A Plan <a class=\"header-anchor\" href=\"#a-plan\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Diagramming with purpose
    can get you to the place of having almost a\npaint-by-number experience building
    your app/system/etc. Beecause you separate\nthe implemetation from the design
    and when you implement BASED on a design\nrather than implement to DISCOVER a
    design you will be more efficient and in my\nexperience I've improved my ability
    to forsee issues that I wouldn't have seen,\nor have historically missed, by putting
    the design down in front of me, the\ndetails of any integrations, etc. before
    starting to &quot;just code&quot;.</p>\n<h2 id=\"good-enough\">Good Enough <a
    class=\"header-anchor\" href=\"#good-enough\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>A final note about diagrams
    for right now is that they're easy to leave as\n&quot;good enough&quot;. The point
    was to get a guide for solving a problem.</p>\n<p>Diagrams don't have to be picture
    perfect, even for documentation's sake. They\ncan even remain somewhat unfinished
    (permitted you don't get yourself into a\nbind of treating diagrams as docs that
    you didn't clean up)</p>\n<p>Here's an example of what I mean - I'm working on
    a simple workflow to take <a href=\"/my-thoughts\">my-thoughts</a> and post them
    to <a class=\"wikilink\" href=\"/nostr\">nostr</a>. I started with a diagram like
    this...</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112223_f1838d9b.png\"
    alt=\"20250622112223_f1838d9b.png\" /></p>\n<blockquote>\n<p>In parallel I'm working
    on posting my blog to other social media - this small\nworkflow is apart of a
    larger initiative I'm working on at home</p>\n</blockquote>\n<p>AS you can see
    this diagram isn't super detailed or pretty. But what it does it\nhelp me see
    the high level points of bringing my published thoughts to nostr as\nposts.</p>\n<p>After
    I have the simple steps, I've started diagramming out more details of each step:</p>\n<p><img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112415_f18663e3.png\"
    alt=\"20250622112415_f18663e3.png\" /></p>\n<p>The diagram is easy to put notes
    on, add some color to for problems not yet solved, etc.</p>\n<p>And then with
    this diagram in front of me, it's easy to begin building\nsmall-scoped components
    that will be assembled to my larger system, but without\nthe pressure of constructing
    every part of the system at once</p>\n<h1 id=\"fin\">Fin <a class=\"header-anchor\"
    href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Diagrams help me break
    up a problem into manageable chunks so that I can put\nthe things I need later
    on the back-burner and can focus on one achievable\nthing at a time.</p>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Thinking
    In Diagrams</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Intro Something I didn&#x27;t
    appreciate earlier on in my career (and I&#x27;m only 8 as far as\nthe age of
    that career goes anyways) was thinking through proble\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Thinking In Diagrams | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/thinking-in-diagrams\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Thinking In Diagrams | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Intro Something I didn&#x27;t appreciate earlier on in my career (and
    I&#x27;m only 8 as far as\nthe age of that career goes anyways) was thinking through
    proble\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"
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
    \           <span class=\"site-terminal__dir\">~/thinking-in-diagrams</span>\n
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Something I didn't appreciate
    earlier on in my career (and I'm only 8 as far as\nthe age of that career goes
    anyways) was thinking through problems with\ndiagrams... I've often approached
    a problem with code first, and immediately\nstarted implementing a solution. There's
    nothing actually wrong with that especially when considering:</p>\n<ol>\n<li>people
    think differently</li>\n<li>some people think with their fingers</li>\n<li>recognizing
    that the first thing you build should be thrown away should give you freedom to
    &quot;just start&quot;</li>\n</ol>\n<p>Now with that said, let's chat about how
    awesome diagrams are though...</p>\n<ol>\n<li>they put context in front of you
    without details</li>\n<li>you can express many more components of a system in
    a consumable way when compared to code</li>\n<li>diagrams help prioritize work
    and bubble up maybe unforseen dependencies</li>\n<li>they force you to wireframe
    before getting lost in the details</li>\n</ol>\n<h2 id=\"wireframing\">Wireframing
    <a class=\"header-anchor\" href=\"#wireframing\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of my biggest issue
    when I &quot;just start coding&quot; is not having a direction...\nI can put a
    few place holders <code>def this:</code> <code>def that:</code> in a few python
    modules,\nbut without having every place holder in front of me it is hard to keep
    them\nstraight, know the order or dependencies, etc.</p>\n<p>Diagrams aren't beholden
    to a text file or series of them, and you can fit much\nmore on your screen because
    you have all the X-Y available to you instead of\nthe height of your monitor times
    your formatted lined length (usually 120 for\nme).</p>\n<p>Diagrams also make
    it easy to spew out onto a page the different components you\nneed for a solution,
    without committing to an order (something that I cannot\nexpress well in scripts)</p>\n<h2
    id=\"a-plan\">A Plan <a class=\"header-anchor\" href=\"#a-plan\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Diagramming with purpose
    can get you to the place of having almost a\npaint-by-number experience building
    your app/system/etc. Beecause you separate\nthe implemetation from the design
    and when you implement BASED on a design\nrather than implement to DISCOVER a
    design you will be more efficient and in my\nexperience I've improved my ability
    to forsee issues that I wouldn't have seen,\nor have historically missed, by putting
    the design down in front of me, the\ndetails of any integrations, etc. before
    starting to &quot;just code&quot;.</p>\n<h2 id=\"good-enough\">Good Enough <a
    class=\"header-anchor\" href=\"#good-enough\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>A final note about diagrams
    for right now is that they're easy to leave as\n&quot;good enough&quot;. The point
    was to get a guide for solving a problem.</p>\n<p>Diagrams don't have to be picture
    perfect, even for documentation's sake. They\ncan even remain somewhat unfinished
    (permitted you don't get yourself into a\nbind of treating diagrams as docs that
    you didn't clean up)</p>\n<p>Here's an example of what I mean - I'm working on
    a simple workflow to take <a href=\"/my-thoughts\">my-thoughts</a> and post them
    to <a class=\"wikilink\" href=\"/nostr\">nostr</a>. I started with a diagram like
    this...</p>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112223_f1838d9b.png\"
    alt=\"20250622112223_f1838d9b.png\" /></p>\n<blockquote>\n<p>In parallel I'm working
    on posting my blog to other social media - this small\nworkflow is apart of a
    larger initiative I'm working on at home</p>\n</blockquote>\n<p>AS you can see
    this diagram isn't super detailed or pretty. But what it does it\nhelp me see
    the high level points of bringing my published thoughts to nostr as\nposts.</p>\n<p>After
    I have the simple steps, I've started diagramming out more details of each step:</p>\n<p><img
    src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112415_f18663e3.png\"
    alt=\"20250622112415_f18663e3.png\" /></p>\n<p>The diagram is easy to put notes
    on, add some color to for problems not yet solved, etc.</p>\n<p>And then with
    this diagram in front of me, it's easy to begin building\nsmall-scoped components
    that will be assembled to my larger system, but without\nthe pressure of constructing
    every part of the system at once</p>\n<h1 id=\"fin\">Fin <a class=\"header-anchor\"
    href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>Diagrams help me break
    up a problem into manageable chunks so that I can put\nthe things I need later
    on the back-burner and can focus on one achievable\nthing at a time.</p>\n\n        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-06-20 06:55:31\ntemplateKey: blog-post\ntitle: Thinking
    In Diagrams\npublished: True\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png\"\ntags:\n
    \ - homelab\n  - tech\n  - dev-ops\n  - planning\n---\n\n# Intro\n\nSomething
    I didn't appreciate earlier on in my career (and I'm only 8 as far as\nthe age
    of that career goes anyways) was thinking through problems with\ndiagrams... I've
    often approached a problem with code first, and immediately\nstarted implementing
    a solution. There's nothing actually wrong with that especially when considering:\n\n1.
    people think differently\n2. some people think with their fingers\n3. recognizing
    that the first thing you build should be thrown away should give you freedom to
    \"just start\"\n\nNow with that said, let's chat about how awesome diagrams are
    though...\n\n1. they put context in front of you without details\n2. you can express
    many more components of a system in a consumable way when compared to code\n3.
    diagrams help prioritize work and bubble up maybe unforseen dependencies\n4. they
    force you to wireframe before getting lost in the details\n\n## Wireframing\n\nOne
    of my biggest issue when I \"just start coding\" is not having a direction...\nI
    can put a few place holders `def this:` `def that:` in a few python modules,\nbut
    without having every place holder in front of me it is hard to keep them\nstraight,
    know the order or dependencies, etc.\n\nDiagrams aren't beholden to a text file
    or series of them, and you can fit much\nmore on your screen because you have
    all the X-Y available to you instead of\nthe height of your monitor times your
    formatted lined length (usually 120 for\nme).\n\nDiagrams also make it easy to
    spew out onto a page the different components you\nneed for a solution, without
    committing to an order (something that I cannot\nexpress well in scripts)\n\n##
    A Plan\n\nDiagramming with purpose can get you to the place of having almost a\npaint-by-number
    experience building your app/system/etc. Beecause you separate\nthe implemetation
    from the design and when you implement BASED on a design\nrather than implement
    to DISCOVER a design you will be more efficient and in my\nexperience I've improved
    my ability to forsee issues that I wouldn't have seen,\nor have historically missed,
    by putting the design down in front of me, the\ndetails of any integrations, etc.
    before starting to \"just code\".\n\n## Good Enough\n\nA final note about diagrams
    for right now is that they're easy to leave as\n\"good enough\". The point was
    to get a guide for solving a problem.\n\nDiagrams don't have to be picture perfect,
    even for documentation's sake. They\ncan even remain somewhat unfinished (permitted
    you don't get yourself into a\nbind of treating diagrams as docs that you didn't
    clean up)\n\nHere's an example of what I mean - I'm working on a simple workflow
    to take [my-thoughts](/my-thoughts) and post them to [[nostr]]. I started with
    a diagram like this...\n\n![20250622112223_f1838d9b.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112223_f1838d9b.png)\n\n>
    In parallel I'm working on posting my blog to other social media - this small\n>
    workflow is apart of a larger initiative I'm working on at home\n\nAS you can
    see this diagram isn't super detailed or pretty. But what it does it\nhelp me
    see the high level points of bringing my published thoughts to nostr as\nposts.\n\nAfter
    I have the simple steps, I've started diagramming out more details of each step:\n\n![20250622112415_f18663e3.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112415_f18663e3.png)\n\nThe
    diagram is easy to put notes on, add some color to for problems not yet solved,
    etc.\n\nAnd then with this diagram in front of me, it's easy to begin building\nsmall-scoped
    components that will be assembled to my larger system, but without\nthe pressure
    of constructing every part of the system at once\n\n# Fin\n\nDiagrams help me
    break up a problem into manageable chunks so that I can put\nthe things I need
    later on the back-burner and can focus on one achievable\nthing at a time.\n"
published: true
slug: thinking-in-diagrams
title: Thinking In Diagrams


---

# Intro

Something I didn't appreciate earlier on in my career (and I'm only 8 as far as
the age of that career goes anyways) was thinking through problems with
diagrams... I've often approached a problem with code first, and immediately
started implementing a solution. There's nothing actually wrong with that especially when considering:

1. people think differently
2. some people think with their fingers
3. recognizing that the first thing you build should be thrown away should give you freedom to "just start"

Now with that said, let's chat about how awesome diagrams are though...

1. they put context in front of you without details
2. you can express many more components of a system in a consumable way when compared to code
3. diagrams help prioritize work and bubble up maybe unforseen dependencies
4. they force you to wireframe before getting lost in the details

## Wireframing

One of my biggest issue when I "just start coding" is not having a direction...
I can put a few place holders `def this:` `def that:` in a few python modules,
but without having every place holder in front of me it is hard to keep them
straight, know the order or dependencies, etc.

Diagrams aren't beholden to a text file or series of them, and you can fit much
more on your screen because you have all the X-Y available to you instead of
the height of your monitor times your formatted lined length (usually 120 for
me).

Diagrams also make it easy to spew out onto a page the different components you
need for a solution, without committing to an order (something that I cannot
express well in scripts)

## A Plan

Diagramming with purpose can get you to the place of having almost a
paint-by-number experience building your app/system/etc. Beecause you separate
the implemetation from the design and when you implement BASED on a design
rather than implement to DISCOVER a design you will be more efficient and in my
experience I've improved my ability to forsee issues that I wouldn't have seen,
or have historically missed, by putting the design down in front of me, the
details of any integrations, etc. before starting to "just code".

## Good Enough

A final note about diagrams for right now is that they're easy to leave as
"good enough". The point was to get a guide for solving a problem.

Diagrams don't have to be picture perfect, even for documentation's sake. They
can even remain somewhat unfinished (permitted you don't get yourself into a
bind of treating diagrams as docs that you didn't clean up)

Here's an example of what I mean - I'm working on a simple workflow to take [my-thoughts](/my-thoughts) and post them to [[nostr]]. I started with a diagram like this...

![20250622112223_f1838d9b.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112223_f1838d9b.png)

> In parallel I'm working on posting my blog to other social media - this small
> workflow is apart of a larger initiative I'm working on at home

AS you can see this diagram isn't super detailed or pretty. But what it does it
help me see the high level points of bringing my published thoughts to nostr as
posts.

After I have the simple steps, I've started diagramming out more details of each step:

![20250622112415_f18663e3.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112415_f18663e3.png)

The diagram is easy to put notes on, add some color to for problems not yet solved, etc.

And then with this diagram in front of me, it's easy to begin building
small-scoped components that will be assembled to my larger system, but without
the pressure of constructing every part of the system at once

# Fin

Diagrams help me break up a problem into manageable chunks so that I can put
the things I need later on the back-burner and can focus on one achievable
thing at a time.