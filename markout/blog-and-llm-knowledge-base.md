---
content: '## Dev


  - Thinking about [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
  about LLM knowledge bases. I maintain a blog like this one at work, which is fairly
  well structured markdown files and I use markdown lsp for linking docs conceptually.
  It makes it easy for me to trace thoughts and search what I''ve written about. However
  I find that there''s a limit to what I am able to organize by myself... The hardest
  part of of a zettlekasten to me is breaking down a thought into the smallest most
  atomic unit so that I don''t end up duplicating thoughts in files and lose the real
  traceability. In my head I think there''s a mathematical way to solve this, some
  kine of embedding setup that''s beyond my actual comprehension. But I think I''m
  overlookking that agents are probably just good enough with raw markdown, at the
  scale that I keep notes, that I should start to move in the direction, at least
  at work, of making my working notse blog repo more agentically friendly: AGENTS.md
  file, using an agent with its own dumping ground for files, some pruning sessions,
  and maybe a simple chat interface where I open an agent with a skill for using myrepo
  as a knowledge base and see if that gives me any super powers for organization or
  problem solving.


  ```

  LLM Knowledge Bases


  Something I''m finding very useful recently: using LLMs to build personal knowledge
  bases for various topics of research interest. In this way, a large fraction of
  my recent token throughput is going less into manipulating code, and more into manipulating
  knowledge (stored as markdown and images). The latest LLMs are quite good at it.
  So:


  Data ingest:

  I index source documents (articles, papers, repos, datasets, images, etc.) into
  a raw/ directory, then I use an LLM to incrementally "compile" a wiki, which is
  just a collection of .md files in a directory structure. The wiki includes summaries
  of all the data in raw/, backlinks, and then it categorizes data into concepts,
  writes articles for them, and links them all. To convert web articles into .md files
  I like to use the Obsidian Web Clipper extension, and then I also use a hotkey to
  download all the related images to local so that my LLM can easily reference them.


  IDE:

  I use Obsidian as the IDE "frontend" where I can view the raw data, the the compiled
  wiki, and the derived visualizations. Important to note that the LLM writes and
  maintains all of the data of the wiki, I rarely touch it directly. I''ve played
  with a few Obsidian plugins to render and view data in other ways (e.g. Marp for
  slides).


  Q&A:

  Where things get interesting is that once your wiki is big enough (e.g. mine on
  some recent research is ~100 articles and ~400K words), you can ask your LLM agent
  all kinds of complex questions against the wiki, and it will go off, research the
  answers, etc. I thought I had to reach for fancy RAG, but the LLM has been pretty
  good about auto-maintaining index files and brief summaries of all the documents
  and it reads all the important related data fairly easily at this ~small scale.


  Output:

  Instead of getting answers in text/terminal, I like to have it render markdown files
  for me, or slide shows (Marp format), or matplotlib images, all of which I then
  view again in Obsidian. You can imagine many other visual output formats depending
  on the query. Often, I end up "filing" the outputs back into the wiki to enhance
  it for further queries. So my own explorations and queries always "add up" in the
  knowledge base.


  Linting:

  I''ve run some LLM "health checks" over the wiki to e.g. find inconsistent data,
  impute missing data (with web searchers), find interesting connections for new article
  candidates, etc., to incrementally clean up the wiki and enhance its overall data
  integrity. The LLMs are quite good at suggesting further questions to ask and look
  into.


  Extra tools:

  I find myself developing additional tools to process the data, e.g. I vibe coded
  a small and naive search engine over the wiki, which I both use directly (in a web
  ui), but more often I want to hand it off to an LLM via CLI as a tool for larger
  queries.


  Further explorations:

  As the repo grows, the natural desire is to also think about synthetic data generation
  + finetuning to have your LLM "know" the data in its weights instead of just context
  windows.


  TLDR: raw data from a given number of sources is collected, then compiled by an
  LLM into a .md wiki, then operated on by various CLIs by the LLM to do Q&A and to
  incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely ever
  write or edit the wiki manually, it''s the domain of the LLM. I think there is room
  here for an incredible new product instead of a hacky collection of scripts.

  ```'
date: 2026-05-13
description: Dev Thinking about [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
  about LLM knowledge bases. I maintain a blog like this one at w
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Blog and LLM Knowledge
    Base</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Dev Thinking about
    [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
    about LLM knowledge bases. I maintain a blog like this one at w\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Blog and LLM Knowledge Base | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/blog-and-llm-knowledge-base\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Blog and LLM Knowledge Base | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Dev Thinking about [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
    about LLM knowledge bases. I maintain a blog like this one at w\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/blog-and-llm-knowledge-base</span>\n
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
    mb-4 post-title-large\">Blog and LLM Knowledge Base</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-13\">\n
    \           May 13, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/ai/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #ai\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"dev\">Dev <a class=\"header-anchor\"
    href=\"#dev\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Thinking about
    <a href=\"https://x.com/i/status/2039805659525644595\">this tweet from Andrej
    Karpathy</a> about LLM knowledge bases. I maintain a blog like this one at work,
    which is fairly well structured markdown files and I use markdown lsp for linking
    docs conceptually. It makes it easy for me to trace thoughts and search what I've
    written about. However I find that there's a limit to what I am able to organize
    by myself... The hardest part of of a zettlekasten to me is breaking down a thought
    into the smallest most atomic unit so that I don't end up duplicating thoughts
    in files and lose the real traceability. In my head I think there's a mathematical
    way to solve this, some kine of embedding setup that's beyond my actual comprehension.
    But I think I'm overlookking that agents are probably just good enough with raw
    markdown, at the scale that I keep notes, that I should start to move in the direction,
    at least at work, of making my working notse blog repo more agentically friendly:
    <a href=\"http://AGENTS.md\">AGENTS.md</a> file, using an agent with its own dumping
    ground for files, some pruning sessions, and maybe a simple chat interface where
    I open an agent with a skill for using myrepo as a knowledge base and see if that
    gives me any super powers for organization or problem solving.</li>\n</ul>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>LLM Knowledge Bases\n\nSomething
    I&#39;m finding very useful recently: using LLMs to build personal knowledge bases
    for various topics of research interest. In this way, a large fraction of my recent
    token throughput is going less into manipulating code, and more into manipulating
    knowledge (stored as markdown and images). The latest LLMs are quite good at it.
    So:\n\nData ingest:\nI index source documents (articles, papers, repos, datasets,
    images, etc.) into a raw/ directory, then I use an LLM to incrementally &quot;compile&quot;
    a wiki, which is just a collection of .md files in a directory structure. The
    wiki includes summaries of all the data in raw/, backlinks, and then it categorizes
    data into concepts, writes articles for them, and links them all. To convert web
    articles into .md files I like to use the Obsidian Web Clipper extension, and
    then I also use a hotkey to download all the related images to local so that my
    LLM can easily reference them.\n\nIDE:\nI use Obsidian as the IDE &quot;frontend&quot;
    where I can view the raw data, the the compiled wiki, and the derived visualizations.
    Important to note that the LLM writes and maintains all of the data of the wiki,
    I rarely touch it directly. I&#39;ve played with a few Obsidian plugins to render
    and view data in other ways (e.g. Marp for slides).\n\nQ&amp;A:\nWhere things
    get interesting is that once your wiki is big enough (e.g. mine on some recent
    research is ~100 articles and ~400K words), you can ask your LLM agent all kinds
    of complex questions against the wiki, and it will go off, research the answers,
    etc. I thought I had to reach for fancy RAG, but the LLM has been pretty good
    about auto-maintaining index files and brief summaries of all the documents and
    it reads all the important related data fairly easily at this ~small scale.\n\nOutput:\nInstead
    of getting answers in text/terminal, I like to have it render markdown files for
    me, or slide shows (Marp format), or matplotlib images, all of which I then view
    again in Obsidian. You can imagine many other visual output formats depending
    on the query. Often, I end up &quot;filing&quot; the outputs back into the wiki
    to enhance it for further queries. So my own explorations and queries always &quot;add
    up&quot; in the knowledge base.\n\nLinting:\nI&#39;ve run some LLM &quot;health
    checks&quot; over the wiki to e.g. find inconsistent data, impute missing data
    (with web searchers), find interesting connections for new article candidates,
    etc., to incrementally clean up the wiki and enhance its overall data integrity.
    The LLMs are quite good at suggesting further questions to ask and look into.\n\nExtra
    tools:\nI find myself developing additional tools to process the data, e.g. I
    vibe coded a small and naive search engine over the wiki, which I both use directly
    (in a web ui), but more often I want to hand it off to an LLM via CLI as a tool
    for larger queries.\n\nFurther explorations:\nAs the repo grows, the natural desire
    is to also think about synthetic data generation + finetuning to have your LLM
    &quot;know&quot; the data in its weights instead of just context windows.\n\nTLDR:
    raw data from a given number of sources is collected, then compiled by an LLM
    into a .md wiki, then operated on by various CLIs by the LLM to do Q&amp;A and
    to incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely
    ever write or edit the wiki manually, it&#39;s the domain of the LLM. I think
    there is room here for an incredible new product instead of a hacky collection
    of scripts.\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Blog and LLM Knowledge
    Base</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Dev Thinking about
    [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
    about LLM knowledge bases. I maintain a blog like this one at w\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Blog and LLM Knowledge Base | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/blog-and-llm-knowledge-base\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Blog and LLM Knowledge Base | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Dev Thinking about [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
    about LLM knowledge bases. I maintain a blog like this one at w\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Blog and LLM Knowledge Base</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-13\">\n
    \           May 13, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/ai/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #ai\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Blog and LLM Knowledge Base</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-05-13\">\n
    \           May 13, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/ai/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #ai\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #note\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"dev\">Dev <a class=\"header-anchor\"
    href=\"#dev\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Thinking about
    <a href=\"https://x.com/i/status/2039805659525644595\">this tweet from Andrej
    Karpathy</a> about LLM knowledge bases. I maintain a blog like this one at work,
    which is fairly well structured markdown files and I use markdown lsp for linking
    docs conceptually. It makes it easy for me to trace thoughts and search what I've
    written about. However I find that there's a limit to what I am able to organize
    by myself... The hardest part of of a zettlekasten to me is breaking down a thought
    into the smallest most atomic unit so that I don't end up duplicating thoughts
    in files and lose the real traceability. In my head I think there's a mathematical
    way to solve this, some kine of embedding setup that's beyond my actual comprehension.
    But I think I'm overlookking that agents are probably just good enough with raw
    markdown, at the scale that I keep notes, that I should start to move in the direction,
    at least at work, of making my working notse blog repo more agentically friendly:
    <a href=\"http://AGENTS.md\">AGENTS.md</a> file, using an agent with its own dumping
    ground for files, some pruning sessions, and maybe a simple chat interface where
    I open an agent with a skill for using myrepo as a knowledge base and see if that
    gives me any super powers for organization or problem solving.</li>\n</ul>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>LLM Knowledge Bases\n\nSomething
    I&#39;m finding very useful recently: using LLMs to build personal knowledge bases
    for various topics of research interest. In this way, a large fraction of my recent
    token throughput is going less into manipulating code, and more into manipulating
    knowledge (stored as markdown and images). The latest LLMs are quite good at it.
    So:\n\nData ingest:\nI index source documents (articles, papers, repos, datasets,
    images, etc.) into a raw/ directory, then I use an LLM to incrementally &quot;compile&quot;
    a wiki, which is just a collection of .md files in a directory structure. The
    wiki includes summaries of all the data in raw/, backlinks, and then it categorizes
    data into concepts, writes articles for them, and links them all. To convert web
    articles into .md files I like to use the Obsidian Web Clipper extension, and
    then I also use a hotkey to download all the related images to local so that my
    LLM can easily reference them.\n\nIDE:\nI use Obsidian as the IDE &quot;frontend&quot;
    where I can view the raw data, the the compiled wiki, and the derived visualizations.
    Important to note that the LLM writes and maintains all of the data of the wiki,
    I rarely touch it directly. I&#39;ve played with a few Obsidian plugins to render
    and view data in other ways (e.g. Marp for slides).\n\nQ&amp;A:\nWhere things
    get interesting is that once your wiki is big enough (e.g. mine on some recent
    research is ~100 articles and ~400K words), you can ask your LLM agent all kinds
    of complex questions against the wiki, and it will go off, research the answers,
    etc. I thought I had to reach for fancy RAG, but the LLM has been pretty good
    about auto-maintaining index files and brief summaries of all the documents and
    it reads all the important related data fairly easily at this ~small scale.\n\nOutput:\nInstead
    of getting answers in text/terminal, I like to have it render markdown files for
    me, or slide shows (Marp format), or matplotlib images, all of which I then view
    again in Obsidian. You can imagine many other visual output formats depending
    on the query. Often, I end up &quot;filing&quot; the outputs back into the wiki
    to enhance it for further queries. So my own explorations and queries always &quot;add
    up&quot; in the knowledge base.\n\nLinting:\nI&#39;ve run some LLM &quot;health
    checks&quot; over the wiki to e.g. find inconsistent data, impute missing data
    (with web searchers), find interesting connections for new article candidates,
    etc., to incrementally clean up the wiki and enhance its overall data integrity.
    The LLMs are quite good at suggesting further questions to ask and look into.\n\nExtra
    tools:\nI find myself developing additional tools to process the data, e.g. I
    vibe coded a small and naive search engine over the wiki, which I both use directly
    (in a web ui), but more often I want to hand it off to an LLM via CLI as a tool
    for larger queries.\n\nFurther explorations:\nAs the repo grows, the natural desire
    is to also think about synthetic data generation + finetuning to have your LLM
    &quot;know&quot; the data in its weights instead of just context windows.\n\nTLDR:
    raw data from a given number of sources is collected, then compiled by an LLM
    into a .md wiki, then operated on by various CLIs by the LLM to do Q&amp;A and
    to incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely
    ever write or edit the wiki manually, it&#39;s the domain of the LLM. I think
    there is room here for an incredible new product instead of a hacky collection
    of scripts.\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Blog and
    LLM Knowledge Base</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Dev Thinking about [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
    about LLM knowledge bases. I maintain a blog like this one at w\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Blog and LLM Knowledge Base | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/blog-and-llm-knowledge-base\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Blog and LLM Knowledge Base | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Dev Thinking about [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
    about LLM knowledge bases. I maintain a blog like this one at w\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/blog-and-llm-knowledge-base</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"dev\">Dev
    <a class=\"header-anchor\" href=\"#dev\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Thinking about
    <a href=\"https://x.com/i/status/2039805659525644595\">this tweet from Andrej
    Karpathy</a> about LLM knowledge bases. I maintain a blog like this one at work,
    which is fairly well structured markdown files and I use markdown lsp for linking
    docs conceptually. It makes it easy for me to trace thoughts and search what I've
    written about. However I find that there's a limit to what I am able to organize
    by myself... The hardest part of of a zettlekasten to me is breaking down a thought
    into the smallest most atomic unit so that I don't end up duplicating thoughts
    in files and lose the real traceability. In my head I think there's a mathematical
    way to solve this, some kine of embedding setup that's beyond my actual comprehension.
    But I think I'm overlookking that agents are probably just good enough with raw
    markdown, at the scale that I keep notes, that I should start to move in the direction,
    at least at work, of making my working notse blog repo more agentically friendly:
    <a href=\"http://AGENTS.md\">AGENTS.md</a> file, using an agent with its own dumping
    ground for files, some pruning sessions, and maybe a simple chat interface where
    I open an agent with a skill for using myrepo as a knowledge base and see if that
    gives me any super powers for organization or problem solving.</li>\n</ul>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>LLM Knowledge Bases\n\nSomething
    I&#39;m finding very useful recently: using LLMs to build personal knowledge bases
    for various topics of research interest. In this way, a large fraction of my recent
    token throughput is going less into manipulating code, and more into manipulating
    knowledge (stored as markdown and images). The latest LLMs are quite good at it.
    So:\n\nData ingest:\nI index source documents (articles, papers, repos, datasets,
    images, etc.) into a raw/ directory, then I use an LLM to incrementally &quot;compile&quot;
    a wiki, which is just a collection of .md files in a directory structure. The
    wiki includes summaries of all the data in raw/, backlinks, and then it categorizes
    data into concepts, writes articles for them, and links them all. To convert web
    articles into .md files I like to use the Obsidian Web Clipper extension, and
    then I also use a hotkey to download all the related images to local so that my
    LLM can easily reference them.\n\nIDE:\nI use Obsidian as the IDE &quot;frontend&quot;
    where I can view the raw data, the the compiled wiki, and the derived visualizations.
    Important to note that the LLM writes and maintains all of the data of the wiki,
    I rarely touch it directly. I&#39;ve played with a few Obsidian plugins to render
    and view data in other ways (e.g. Marp for slides).\n\nQ&amp;A:\nWhere things
    get interesting is that once your wiki is big enough (e.g. mine on some recent
    research is ~100 articles and ~400K words), you can ask your LLM agent all kinds
    of complex questions against the wiki, and it will go off, research the answers,
    etc. I thought I had to reach for fancy RAG, but the LLM has been pretty good
    about auto-maintaining index files and brief summaries of all the documents and
    it reads all the important related data fairly easily at this ~small scale.\n\nOutput:\nInstead
    of getting answers in text/terminal, I like to have it render markdown files for
    me, or slide shows (Marp format), or matplotlib images, all of which I then view
    again in Obsidian. You can imagine many other visual output formats depending
    on the query. Often, I end up &quot;filing&quot; the outputs back into the wiki
    to enhance it for further queries. So my own explorations and queries always &quot;add
    up&quot; in the knowledge base.\n\nLinting:\nI&#39;ve run some LLM &quot;health
    checks&quot; over the wiki to e.g. find inconsistent data, impute missing data
    (with web searchers), find interesting connections for new article candidates,
    etc., to incrementally clean up the wiki and enhance its overall data integrity.
    The LLMs are quite good at suggesting further questions to ask and look into.\n\nExtra
    tools:\nI find myself developing additional tools to process the data, e.g. I
    vibe coded a small and naive search engine over the wiki, which I both use directly
    (in a web ui), but more often I want to hand it off to an LLM via CLI as a tool
    for larger queries.\n\nFurther explorations:\nAs the repo grows, the natural desire
    is to also think about synthetic data generation + finetuning to have your LLM
    &quot;know&quot; the data in its weights instead of just context windows.\n\nTLDR:
    raw data from a given number of sources is collected, then compiled by an LLM
    into a .md wiki, then operated on by various CLIs by the LLM to do Q&amp;A and
    to incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely
    ever write or edit the wiki manually, it&#39;s the domain of the LLM. I think
    there is room here for an incredible new product instead of a hacky collection
    of scripts.\n</pre></div>\n\n</pre>\n\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2026-05-13 06:23:42\ntemplateKey: note\ntitle: Blog and LLM
    Knowledge Base\npublished: True\ntags:\n  - ai\n  - note\n---\n\n## Dev\n\n- Thinking
    about [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595)
    about LLM knowledge bases. I maintain a blog like this one at work, which is fairly
    well structured markdown files and I use markdown lsp for linking docs conceptually.
    It makes it easy for me to trace thoughts and search what I've written about.
    However I find that there's a limit to what I am able to organize by myself...
    The hardest part of of a zettlekasten to me is breaking down a thought into the
    smallest most atomic unit so that I don't end up duplicating thoughts in files
    and lose the real traceability. In my head I think there's a mathematical way
    to solve this, some kine of embedding setup that's beyond my actual comprehension.
    But I think I'm overlookking that agents are probably just good enough with raw
    markdown, at the scale that I keep notes, that I should start to move in the direction,
    at least at work, of making my working notse blog repo more agentically friendly:
    AGENTS.md file, using an agent with its own dumping ground for files, some pruning
    sessions, and maybe a simple chat interface where I open an agent with a skill
    for using myrepo as a knowledge base and see if that gives me any super powers
    for organization or problem solving.\n\n```\nLLM Knowledge Bases\n\nSomething
    I'm finding very useful recently: using LLMs to build personal knowledge bases
    for various topics of research interest. In this way, a large fraction of my recent
    token throughput is going less into manipulating code, and more into manipulating
    knowledge (stored as markdown and images). The latest LLMs are quite good at it.
    So:\n\nData ingest:\nI index source documents (articles, papers, repos, datasets,
    images, etc.) into a raw/ directory, then I use an LLM to incrementally \"compile\"
    a wiki, which is just a collection of .md files in a directory structure. The
    wiki includes summaries of all the data in raw/, backlinks, and then it categorizes
    data into concepts, writes articles for them, and links them all. To convert web
    articles into .md files I like to use the Obsidian Web Clipper extension, and
    then I also use a hotkey to download all the related images to local so that my
    LLM can easily reference them.\n\nIDE:\nI use Obsidian as the IDE \"frontend\"
    where I can view the raw data, the the compiled wiki, and the derived visualizations.
    Important to note that the LLM writes and maintains all of the data of the wiki,
    I rarely touch it directly. I've played with a few Obsidian plugins to render
    and view data in other ways (e.g. Marp for slides).\n\nQ&A:\nWhere things get
    interesting is that once your wiki is big enough (e.g. mine on some recent research
    is ~100 articles and ~400K words), you can ask your LLM agent all kinds of complex
    questions against the wiki, and it will go off, research the answers, etc. I thought
    I had to reach for fancy RAG, but the LLM has been pretty good about auto-maintaining
    index files and brief summaries of all the documents and it reads all the important
    related data fairly easily at this ~small scale.\n\nOutput:\nInstead of getting
    answers in text/terminal, I like to have it render markdown files for me, or slide
    shows (Marp format), or matplotlib images, all of which I then view again in Obsidian.
    You can imagine many other visual output formats depending on the query. Often,
    I end up \"filing\" the outputs back into the wiki to enhance it for further queries.
    So my own explorations and queries always \"add up\" in the knowledge base.\n\nLinting:\nI've
    run some LLM \"health checks\" over the wiki to e.g. find inconsistent data, impute
    missing data (with web searchers), find interesting connections for new article
    candidates, etc., to incrementally clean up the wiki and enhance its overall data
    integrity. The LLMs are quite good at suggesting further questions to ask and
    look into.\n\nExtra tools:\nI find myself developing additional tools to process
    the data, e.g. I vibe coded a small and naive search engine over the wiki, which
    I both use directly (in a web ui), but more often I want to hand it off to an
    LLM via CLI as a tool for larger queries.\n\nFurther explorations:\nAs the repo
    grows, the natural desire is to also think about synthetic data generation + finetuning
    to have your LLM \"know\" the data in its weights instead of just context windows.\n\nTLDR:
    raw data from a given number of sources is collected, then compiled by an LLM
    into a .md wiki, then operated on by various CLIs by the LLM to do Q&A and to
    incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely
    ever write or edit the wiki manually, it's the domain of the LLM. I think there
    is room here for an incredible new product instead of a hacky collection of scripts.\n```\n"
published: true
slug: blog-and-llm-knowledge-base
title: Blog and LLM Knowledge Base


---

## Dev

- Thinking about [this tweet from Andrej Karpathy](https://x.com/i/status/2039805659525644595) about LLM knowledge bases. I maintain a blog like this one at work, which is fairly well structured markdown files and I use markdown lsp for linking docs conceptually. It makes it easy for me to trace thoughts and search what I've written about. However I find that there's a limit to what I am able to organize by myself... The hardest part of of a zettlekasten to me is breaking down a thought into the smallest most atomic unit so that I don't end up duplicating thoughts in files and lose the real traceability. In my head I think there's a mathematical way to solve this, some kine of embedding setup that's beyond my actual comprehension. But I think I'm overlookking that agents are probably just good enough with raw markdown, at the scale that I keep notes, that I should start to move in the direction, at least at work, of making my working notse blog repo more agentically friendly: AGENTS.md file, using an agent with its own dumping ground for files, some pruning sessions, and maybe a simple chat interface where I open an agent with a skill for using myrepo as a knowledge base and see if that gives me any super powers for organization or problem solving.

```
LLM Knowledge Bases

Something I'm finding very useful recently: using LLMs to build personal knowledge bases for various topics of research interest. In this way, a large fraction of my recent token throughput is going less into manipulating code, and more into manipulating knowledge (stored as markdown and images). The latest LLMs are quite good at it. So:

Data ingest:
I index source documents (articles, papers, repos, datasets, images, etc.) into a raw/ directory, then I use an LLM to incrementally "compile" a wiki, which is just a collection of .md files in a directory structure. The wiki includes summaries of all the data in raw/, backlinks, and then it categorizes data into concepts, writes articles for them, and links them all. To convert web articles into .md files I like to use the Obsidian Web Clipper extension, and then I also use a hotkey to download all the related images to local so that my LLM can easily reference them.

IDE:
I use Obsidian as the IDE "frontend" where I can view the raw data, the the compiled wiki, and the derived visualizations. Important to note that the LLM writes and maintains all of the data of the wiki, I rarely touch it directly. I've played with a few Obsidian plugins to render and view data in other ways (e.g. Marp for slides).

Q&A:
Where things get interesting is that once your wiki is big enough (e.g. mine on some recent research is ~100 articles and ~400K words), you can ask your LLM agent all kinds of complex questions against the wiki, and it will go off, research the answers, etc. I thought I had to reach for fancy RAG, but the LLM has been pretty good about auto-maintaining index files and brief summaries of all the documents and it reads all the important related data fairly easily at this ~small scale.

Output:
Instead of getting answers in text/terminal, I like to have it render markdown files for me, or slide shows (Marp format), or matplotlib images, all of which I then view again in Obsidian. You can imagine many other visual output formats depending on the query. Often, I end up "filing" the outputs back into the wiki to enhance it for further queries. So my own explorations and queries always "add up" in the knowledge base.

Linting:
I've run some LLM "health checks" over the wiki to e.g. find inconsistent data, impute missing data (with web searchers), find interesting connections for new article candidates, etc., to incrementally clean up the wiki and enhance its overall data integrity. The LLMs are quite good at suggesting further questions to ask and look into.

Extra tools:
I find myself developing additional tools to process the data, e.g. I vibe coded a small and naive search engine over the wiki, which I both use directly (in a web ui), but more often I want to hand it off to an LLM via CLI as a tool for larger queries.

Further explorations:
As the repo grows, the natural desire is to also think about synthetic data generation + finetuning to have your LLM "know" the data in its weights instead of just context windows.

TLDR: raw data from a given number of sources is collected, then compiled by an LLM into a .md wiki, then operated on by various CLIs by the LLM to do Q&A and to incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely ever write or edit the wiki manually, it's the domain of the LLM. I think there is room here for an incredible new product instead of a hacky collection of scripts.
```