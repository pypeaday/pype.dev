---
content: "I have a [post on starship](/starship) where I have some notes on how I
  use starship to make my zsh experience great with a sweet terminal prompt.\n\nNow...
  I spend quite a bit of time in ipython every day and I got kind of sick of the vanilla
  experience and wanted something that more closely matched my starship prompt.\n\nThere's
  more to customizing ipython I know for sure but here's 2 things I have going for
  me...\n\n1. I use [`rich`](https://pypi.org/project/rich/) authored by @[Will McGugan](https://twitter.com/willmcgugan)
  which makes much of my ipython experience great.\nI won't write about that here
  but you can find my `rich` config [here](https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py)\n\n2.
  I used `pygments` to customize the ipython prompt with my `ipython_config.py` and
  a startup script, next to my `rich` one, called `99-prompt.py`.\n\n> The scripts
  inside `~/.ipython/<profile>/startup` are executed in lexigraphical order, so it's
  nice to name things in the 10's to give room for adding scripts in between others
  down the line.\n\n## My prompt\n\nMy zsh prompt looks a little something like this:\n\n<img
  src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
  alt=\"starship\" title=\"A starship prompt\" />\n\n\nAnd after my ipython customiztion
  it currently (subject to much change but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece
  on `main`).\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt.png\"
  alt=\"ipython\" title=\"A starship inspired ipython prompt\" />\n\nNow in ipython
  I have an indicator of my working directory, git branch, python environment, and
  a note that I'm in `ipython` and not `zsh`.\nI also configured my prompt to warn
  me if I'm _not_ in a git directory!\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt-no-git.png\"
  alt=\"ipython-ng\" title=\"A starship inspired ipython prompt without git\" />\n\nAll
  in all the customization isn't too bad with just 2 specific files.\n\n## ipython_config.py\n\nThere's
  several use cases for `ipython_config.py` files in several areas on a pc - sometimes
  you want a common config across users, so you'd drop one in `/etc/ipython` and othertimes
  you have your own which is probably at `~/.ipython`\n\nMy ipython config mostly
  has colors defined on `pygment tokens` plus a few autorun commands and `pyflyby`
  (see my friend Waylon's post on pyflyby [here](https://waylonwalker.com/pyflyby/))\n\nI
  wanted to match my ipython somewhat to my tmux and vim color schemes, which I model
  after the vim-airline theme `night owl`.\n\nAfter picking some some colors and saving
  variables it's a matter of setting colors per token and then referencing those tokens
  in your version of `99-prompt.py`.\n\nYou can check out my `ipython_config.py` [here](https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py)\n\nFor
  example, I can set `Token.Name.Function` to black, and in `ipython` then a function's
  definition will appear in black text. I set mine to cyan to match my theme.\n\nFor
  the prompt colors just match the keyword in `c.TerminalInteractiveShell.highlighting_style_overrides`
  with what is referenced inside [99-prompt.py](https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py)\n\nFor
  example, `Token.Prompt` is set to `bold grey` which gives me the bold chevron symbol
  you see in the above image that looks like my zsh prompt \n\nThen in `99-prompt.py`
  I have this set for the prompt:\n\n```python\nToken.Prompt \"\u276F \"\n```\n\n##
  99-prompt.py\n\nYou don't need to name your script `99-prompt.py`, but I wanted
  to know that it was for my prompt and I wanted it executed last so it made sense.\n\nHere
  I have `MyPrompt` class with the prompt symbol defined as above and several other
  things... \n\n```python\nclass MyPrompt(Prompts):\n    def in_prompt_tokens(self,
  cli=None):\n        return [\n            (Token, \"\"),\n            (Token.OutPrompt,
  Path().absolute().stem),\n            (Token, \" \"),\n            (Token.Generic.Subheading,
  get_branch()[0]),\n            (Token, \" \"),\n            (Token.Generic.Heading,
  get_branch()[1]),\n            (Token, \" \"),\n            (Token.Name.Class, \"via
  \" + get_venv()),\n            (Token, \" \"),\n            (Token.Name.Entity,
  \"ipython\"),\n            (Token, \"\\n\"),\n            (\n                Token.Prompt\n
  \               if self.shell.last_execution_succeeded\n                else Token.Generic.Error,\n
  \               \"\u276F \",\n            ),\n        ]\n\n```\n\nNotice I have
  2 custom functions here, `get_branch` and `get_venv` which grab some git info and
  python env info and return strings I can dump into my prompt as shown above.\n\nTo
  finish you drop `ip = get_ipython()` and `ip.prompts = MyPrompt(ip)` at the bottom
  of your prompt script and you should be in custom prompt city!\n\n## End\n\nThis
  is more or less notes for myself on how this works - drop by my [ipython config](https://github.com/nicpayne713/dotfiles/tree/home/ipython)
  in my dotfiles repo to see my full configs for ipython!"
date: 2022-04-02
description: I have a [post on starship](/starship) where I have some notes on how
  I use starship to make my zsh experience great with a sweet terminal prompt. Now...
  I spen
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Ipython-Prompt</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I have a [post on starship](/starship)
    where I have some notes on how I use starship to make my zsh experience great
    with a sweet terminal prompt. Now... I spen\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Ipython-Prompt | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/ipython-prompt\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Ipython-Prompt | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I have a [post on starship](/starship) where I have some notes on how
    I use starship to make my zsh experience great with a sweet terminal prompt. Now...
    I spen\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/ipython-prompt</span>\n        </div>\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Ipython-Prompt</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-02\">\n            April
    02, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I have a <a href=\"/starship\">post
    on starship</a> where I have some notes on how I use starship to make my zsh experience
    great with a sweet terminal prompt.</p>\n<p>Now... I spend quite a bit of time
    in ipython every day and I got kind of sick of the vanilla experience and wanted
    something that more closely matched my starship prompt.</p>\n<p>There's more to
    customizing ipython I know for sure but here's 2 things I have going for me...</p>\n<ol>\n<li>\n<p>I
    use <a href=\"https://pypi.org/project/rich/\"><code>rich</code></a> authored
    by @<a href=\"https://twitter.com/willmcgugan\">Will McGugan</a> which makes much
    of my ipython experience great.\nI won't write about that here but you can find
    my <code>rich</code> config <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py\">here</a></p>\n</li>\n<li>\n<p>I
    used <code>pygments</code> to customize the ipython prompt with my <code>ipython_config.py</code>
    and a startup script, next to my <code>rich</code> one, called <code>99-prompt.py</code>.</p>\n</li>\n</ol>\n<blockquote>\n<p>The
    scripts inside <code>~/.ipython/&lt;profile&gt;/startup</code> are executed in
    lexigraphical order, so it's nice to name things in the 10's to give room for
    adding scripts in between others down the line.</p>\n</blockquote>\n<h2 id=\"my-prompt\">My
    prompt <a class=\"header-anchor\" href=\"#my-prompt\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My zsh prompt looks
    a little something like this:</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
    alt=\"starship\" title=\"A starship prompt\" />\n<p>And after my ipython customiztion
    it currently (subject to much change but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece
    on <code>main</code>).</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt.png\"
    alt=\"ipython\" title=\"A starship inspired ipython prompt\" />\n<p>Now in ipython
    I have an indicator of my working directory, git branch, python environment, and
    a note that I'm in <code>ipython</code> and not <code>zsh</code>.\nI also configured
    my prompt to warn me if I'm <em>not</em> in a git directory!</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt-no-git.png\"
    alt=\"ipython-ng\" title=\"A starship inspired ipython prompt without git\" />\n<p>All
    in all the customization isn't too bad with just 2 specific files.</p>\n<h2 id=\"ipython_configpy\">ipython_config.py
    <a class=\"header-anchor\" href=\"#ipython_configpy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's several use
    cases for <code>ipython_config.py</code> files in several areas on a pc - sometimes
    you want a common config across users, so you'd drop one in <code>/etc/ipython</code>
    and othertimes you have your own which is probably at <code>~/.ipython</code></p>\n<p>My
    ipython config mostly has colors defined on <code>pygment tokens</code> plus a
    few autorun commands and <code>pyflyby</code> (see my friend Waylon's post on
    pyflyby <a href=\"https://waylonwalker.com/pyflyby/\">here</a>)</p>\n<p>I wanted
    to match my ipython somewhat to my tmux and vim color schemes, which I model after
    the vim-airline theme <code>night owl</code>.</p>\n<p>After picking some some
    colors and saving variables it's a matter of setting colors per token and then
    referencing those tokens in your version of <code>99-prompt.py</code>.</p>\n<p>You
    can check out my <code>ipython_config.py</code> <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py\">here</a></p>\n<p>For
    example, I can set <code>Token.Name.Function</code> to black, and in <code>ipython</code>
    then a function's definition will appear in black text. I set mine to cyan to
    match my theme.</p>\n<p>For the prompt colors just match the keyword in <code>c.TerminalInteractiveShell.highlighting_style_overrides</code>
    with what is referenced inside <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py\">99-prompt.py</a></p>\n<p>For
    example, <code>Token.Prompt</code> is set to <code>bold grey</code> which gives
    me the bold chevron symbol you see in the above image that looks like my zsh prompt</p>\n<p>Then
    in <code>99-prompt.py</code> I have this set for the prompt:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">Token</span><span
    class=\"o\">.</span><span class=\"n\">Prompt</span> <span class=\"s2\">&quot;\u276F
    &quot;</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"99-promptpy\"><a href=\"http://99-prompt.py\">99-prompt.py</a>
    <a class=\"header-anchor\" href=\"#99-promptpy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>You don't need to name
    your script <code>99-prompt.py</code>, but I wanted to know that it was for my
    prompt and I wanted it executed last so it made sense.</p>\n<p>Here I have <code>MyPrompt</code>
    class with the prompt symbol defined as above and several other things...</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">MyPrompt</span><span class=\"p\">(</span><span
    class=\"n\">Prompts</span><span class=\"p\">):</span>\n    <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">in_prompt_tokens</span><span class=\"p\">(</span><span
    class=\"bp\">self</span><span class=\"p\">,</span> <span class=\"n\">cli</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">):</span>\n
    \       <span class=\"k\">return</span> <span class=\"p\">[</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot;&quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">OutPrompt</span><span class=\"p\">,</span> <span class=\"n\">Path</span><span
    class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">absolute</span><span
    class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">stem</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Generic</span><span class=\"o\">.</span><span class=\"n\">Subheading</span><span
    class=\"p\">,</span> <span class=\"n\">get_branch</span><span class=\"p\">()[</span><span
    class=\"mi\">0</span><span class=\"p\">]),</span>\n            <span class=\"p\">(</span><span
    class=\"n\">Token</span><span class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
    class=\"o\">.</span><span class=\"n\">Generic</span><span class=\"o\">.</span><span
    class=\"n\">Heading</span><span class=\"p\">,</span> <span class=\"n\">get_branch</span><span
    class=\"p\">()[</span><span class=\"mi\">1</span><span class=\"p\">]),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Class</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;via &quot;</span> <span class=\"o\">+</span>
    <span class=\"n\">get_venv</span><span class=\"p\">()),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Entity</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;ipython&quot;</span><span class=\"p\">),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span>\n                <span
    class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Prompt</span>\n
    \               <span class=\"k\">if</span> <span class=\"bp\">self</span><span
    class=\"o\">.</span><span class=\"n\">shell</span><span class=\"o\">.</span><span
    class=\"n\">last_execution_succeeded</span>\n                <span class=\"k\">else</span>
    <span class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Generic</span><span
    class=\"o\">.</span><span class=\"n\">Error</span><span class=\"p\">,</span>\n
    \               <span class=\"s2\">&quot;\u276F &quot;</span><span class=\"p\">,</span>\n
    \           <span class=\"p\">),</span>\n        <span class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<p>Notice
    I have 2 custom functions here, <code>get_branch</code> and <code>get_venv</code>
    which grab some git info and python env info and return strings I can dump into
    my prompt as shown above.</p>\n<p>To finish you drop <code>ip = get_ipython()</code>
    and <code>ip.prompts = MyPrompt(ip)</code> at the bottom of your prompt script
    and you should be in custom prompt city!</p>\n<h2 id=\"end\">End <a class=\"header-anchor\"
    href=\"#end\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This is more or less
    notes for myself on how this works - drop by my <a href=\"https://github.com/nicpayne713/dotfiles/tree/home/ipython\">ipython
    config</a> in my dotfiles repo to see my full configs for ipython!</p>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Ipython-Prompt</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I have a [post on starship](/starship)
    where I have some notes on how I use starship to make my zsh experience great
    with a sweet terminal prompt. Now... I spen\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Ipython-Prompt | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/ipython-prompt\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Ipython-Prompt | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I have a [post on starship](/starship) where I have some notes on how
    I use starship to make my zsh experience great with a sweet terminal prompt. Now...
    I spen\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Ipython-Prompt</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-02\">\n            April
    02, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Ipython-Prompt</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-02\">\n            April
    02, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I have a <a href=\"/starship\">post
    on starship</a> where I have some notes on how I use starship to make my zsh experience
    great with a sweet terminal prompt.</p>\n<p>Now... I spend quite a bit of time
    in ipython every day and I got kind of sick of the vanilla experience and wanted
    something that more closely matched my starship prompt.</p>\n<p>There's more to
    customizing ipython I know for sure but here's 2 things I have going for me...</p>\n<ol>\n<li>\n<p>I
    use <a href=\"https://pypi.org/project/rich/\"><code>rich</code></a> authored
    by @<a href=\"https://twitter.com/willmcgugan\">Will McGugan</a> which makes much
    of my ipython experience great.\nI won't write about that here but you can find
    my <code>rich</code> config <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py\">here</a></p>\n</li>\n<li>\n<p>I
    used <code>pygments</code> to customize the ipython prompt with my <code>ipython_config.py</code>
    and a startup script, next to my <code>rich</code> one, called <code>99-prompt.py</code>.</p>\n</li>\n</ol>\n<blockquote>\n<p>The
    scripts inside <code>~/.ipython/&lt;profile&gt;/startup</code> are executed in
    lexigraphical order, so it's nice to name things in the 10's to give room for
    adding scripts in between others down the line.</p>\n</blockquote>\n<h2 id=\"my-prompt\">My
    prompt <a class=\"header-anchor\" href=\"#my-prompt\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My zsh prompt looks
    a little something like this:</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
    alt=\"starship\" title=\"A starship prompt\" />\n<p>And after my ipython customiztion
    it currently (subject to much change but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece
    on <code>main</code>).</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt.png\"
    alt=\"ipython\" title=\"A starship inspired ipython prompt\" />\n<p>Now in ipython
    I have an indicator of my working directory, git branch, python environment, and
    a note that I'm in <code>ipython</code> and not <code>zsh</code>.\nI also configured
    my prompt to warn me if I'm <em>not</em> in a git directory!</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt-no-git.png\"
    alt=\"ipython-ng\" title=\"A starship inspired ipython prompt without git\" />\n<p>All
    in all the customization isn't too bad with just 2 specific files.</p>\n<h2 id=\"ipython_configpy\">ipython_config.py
    <a class=\"header-anchor\" href=\"#ipython_configpy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's several use
    cases for <code>ipython_config.py</code> files in several areas on a pc - sometimes
    you want a common config across users, so you'd drop one in <code>/etc/ipython</code>
    and othertimes you have your own which is probably at <code>~/.ipython</code></p>\n<p>My
    ipython config mostly has colors defined on <code>pygment tokens</code> plus a
    few autorun commands and <code>pyflyby</code> (see my friend Waylon's post on
    pyflyby <a href=\"https://waylonwalker.com/pyflyby/\">here</a>)</p>\n<p>I wanted
    to match my ipython somewhat to my tmux and vim color schemes, which I model after
    the vim-airline theme <code>night owl</code>.</p>\n<p>After picking some some
    colors and saving variables it's a matter of setting colors per token and then
    referencing those tokens in your version of <code>99-prompt.py</code>.</p>\n<p>You
    can check out my <code>ipython_config.py</code> <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py\">here</a></p>\n<p>For
    example, I can set <code>Token.Name.Function</code> to black, and in <code>ipython</code>
    then a function's definition will appear in black text. I set mine to cyan to
    match my theme.</p>\n<p>For the prompt colors just match the keyword in <code>c.TerminalInteractiveShell.highlighting_style_overrides</code>
    with what is referenced inside <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py\">99-prompt.py</a></p>\n<p>For
    example, <code>Token.Prompt</code> is set to <code>bold grey</code> which gives
    me the bold chevron symbol you see in the above image that looks like my zsh prompt</p>\n<p>Then
    in <code>99-prompt.py</code> I have this set for the prompt:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">Token</span><span
    class=\"o\">.</span><span class=\"n\">Prompt</span> <span class=\"s2\">&quot;\u276F
    &quot;</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"99-promptpy\"><a href=\"http://99-prompt.py\">99-prompt.py</a>
    <a class=\"header-anchor\" href=\"#99-promptpy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>You don't need to name
    your script <code>99-prompt.py</code>, but I wanted to know that it was for my
    prompt and I wanted it executed last so it made sense.</p>\n<p>Here I have <code>MyPrompt</code>
    class with the prompt symbol defined as above and several other things...</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">MyPrompt</span><span class=\"p\">(</span><span
    class=\"n\">Prompts</span><span class=\"p\">):</span>\n    <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">in_prompt_tokens</span><span class=\"p\">(</span><span
    class=\"bp\">self</span><span class=\"p\">,</span> <span class=\"n\">cli</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">):</span>\n
    \       <span class=\"k\">return</span> <span class=\"p\">[</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot;&quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">OutPrompt</span><span class=\"p\">,</span> <span class=\"n\">Path</span><span
    class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">absolute</span><span
    class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">stem</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Generic</span><span class=\"o\">.</span><span class=\"n\">Subheading</span><span
    class=\"p\">,</span> <span class=\"n\">get_branch</span><span class=\"p\">()[</span><span
    class=\"mi\">0</span><span class=\"p\">]),</span>\n            <span class=\"p\">(</span><span
    class=\"n\">Token</span><span class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
    class=\"o\">.</span><span class=\"n\">Generic</span><span class=\"o\">.</span><span
    class=\"n\">Heading</span><span class=\"p\">,</span> <span class=\"n\">get_branch</span><span
    class=\"p\">()[</span><span class=\"mi\">1</span><span class=\"p\">]),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Class</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;via &quot;</span> <span class=\"o\">+</span>
    <span class=\"n\">get_venv</span><span class=\"p\">()),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Entity</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;ipython&quot;</span><span class=\"p\">),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span>\n                <span
    class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Prompt</span>\n
    \               <span class=\"k\">if</span> <span class=\"bp\">self</span><span
    class=\"o\">.</span><span class=\"n\">shell</span><span class=\"o\">.</span><span
    class=\"n\">last_execution_succeeded</span>\n                <span class=\"k\">else</span>
    <span class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Generic</span><span
    class=\"o\">.</span><span class=\"n\">Error</span><span class=\"p\">,</span>\n
    \               <span class=\"s2\">&quot;\u276F &quot;</span><span class=\"p\">,</span>\n
    \           <span class=\"p\">),</span>\n        <span class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<p>Notice
    I have 2 custom functions here, <code>get_branch</code> and <code>get_venv</code>
    which grab some git info and python env info and return strings I can dump into
    my prompt as shown above.</p>\n<p>To finish you drop <code>ip = get_ipython()</code>
    and <code>ip.prompts = MyPrompt(ip)</code> at the bottom of your prompt script
    and you should be in custom prompt city!</p>\n<h2 id=\"end\">End <a class=\"header-anchor\"
    href=\"#end\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This is more or less
    notes for myself on how this works - drop by my <a href=\"https://github.com/nicpayne713/dotfiles/tree/home/ipython\">ipython
    config</a> in my dotfiles repo to see my full configs for ipython!</p>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Ipython-Prompt</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I have a [post on starship](/starship)
    where I have some notes on how I use starship to make my zsh experience great
    with a sweet terminal prompt. Now... I spen\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Ipython-Prompt | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/ipython-prompt\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Ipython-Prompt | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I have a [post on starship](/starship) where I have some notes on how
    I use starship to make my zsh experience great with a sweet terminal prompt. Now...
    I spen\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/ipython-prompt</span>\n        </div>\n
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
    Content is handled by the password protection plugin -->\n    <p>I have a <a href=\"/starship\">post
    on starship</a> where I have some notes on how I use starship to make my zsh experience
    great with a sweet terminal prompt.</p>\n<p>Now... I spend quite a bit of time
    in ipython every day and I got kind of sick of the vanilla experience and wanted
    something that more closely matched my starship prompt.</p>\n<p>There's more to
    customizing ipython I know for sure but here's 2 things I have going for me...</p>\n<ol>\n<li>\n<p>I
    use <a href=\"https://pypi.org/project/rich/\"><code>rich</code></a> authored
    by @<a href=\"https://twitter.com/willmcgugan\">Will McGugan</a> which makes much
    of my ipython experience great.\nI won't write about that here but you can find
    my <code>rich</code> config <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py\">here</a></p>\n</li>\n<li>\n<p>I
    used <code>pygments</code> to customize the ipython prompt with my <code>ipython_config.py</code>
    and a startup script, next to my <code>rich</code> one, called <code>99-prompt.py</code>.</p>\n</li>\n</ol>\n<blockquote>\n<p>The
    scripts inside <code>~/.ipython/&lt;profile&gt;/startup</code> are executed in
    lexigraphical order, so it's nice to name things in the 10's to give room for
    adding scripts in between others down the line.</p>\n</blockquote>\n<h2 id=\"my-prompt\">My
    prompt <a class=\"header-anchor\" href=\"#my-prompt\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My zsh prompt looks
    a little something like this:</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
    alt=\"starship\" title=\"A starship prompt\" />\n<p>And after my ipython customiztion
    it currently (subject to much change but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece
    on <code>main</code>).</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt.png\"
    alt=\"ipython\" title=\"A starship inspired ipython prompt\" />\n<p>Now in ipython
    I have an indicator of my working directory, git branch, python environment, and
    a note that I'm in <code>ipython</code> and not <code>zsh</code>.\nI also configured
    my prompt to warn me if I'm <em>not</em> in a git directory!</p>\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt-no-git.png\"
    alt=\"ipython-ng\" title=\"A starship inspired ipython prompt without git\" />\n<p>All
    in all the customization isn't too bad with just 2 specific files.</p>\n<h2 id=\"ipython_configpy\">ipython_config.py
    <a class=\"header-anchor\" href=\"#ipython_configpy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's several use
    cases for <code>ipython_config.py</code> files in several areas on a pc - sometimes
    you want a common config across users, so you'd drop one in <code>/etc/ipython</code>
    and othertimes you have your own which is probably at <code>~/.ipython</code></p>\n<p>My
    ipython config mostly has colors defined on <code>pygment tokens</code> plus a
    few autorun commands and <code>pyflyby</code> (see my friend Waylon's post on
    pyflyby <a href=\"https://waylonwalker.com/pyflyby/\">here</a>)</p>\n<p>I wanted
    to match my ipython somewhat to my tmux and vim color schemes, which I model after
    the vim-airline theme <code>night owl</code>.</p>\n<p>After picking some some
    colors and saving variables it's a matter of setting colors per token and then
    referencing those tokens in your version of <code>99-prompt.py</code>.</p>\n<p>You
    can check out my <code>ipython_config.py</code> <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py\">here</a></p>\n<p>For
    example, I can set <code>Token.Name.Function</code> to black, and in <code>ipython</code>
    then a function's definition will appear in black text. I set mine to cyan to
    match my theme.</p>\n<p>For the prompt colors just match the keyword in <code>c.TerminalInteractiveShell.highlighting_style_overrides</code>
    with what is referenced inside <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py\">99-prompt.py</a></p>\n<p>For
    example, <code>Token.Prompt</code> is set to <code>bold grey</code> which gives
    me the bold chevron symbol you see in the above image that looks like my zsh prompt</p>\n<p>Then
    in <code>99-prompt.py</code> I have this set for the prompt:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">Token</span><span
    class=\"o\">.</span><span class=\"n\">Prompt</span> <span class=\"s2\">&quot;\u276F
    &quot;</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"99-promptpy\"><a href=\"http://99-prompt.py\">99-prompt.py</a>
    <a class=\"header-anchor\" href=\"#99-promptpy\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>You don't need to name
    your script <code>99-prompt.py</code>, but I wanted to know that it was for my
    prompt and I wanted it executed last so it made sense.</p>\n<p>Here I have <code>MyPrompt</code>
    class with the prompt symbol defined as above and several other things...</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">MyPrompt</span><span class=\"p\">(</span><span
    class=\"n\">Prompts</span><span class=\"p\">):</span>\n    <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">in_prompt_tokens</span><span class=\"p\">(</span><span
    class=\"bp\">self</span><span class=\"p\">,</span> <span class=\"n\">cli</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">):</span>\n
    \       <span class=\"k\">return</span> <span class=\"p\">[</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot;&quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">OutPrompt</span><span class=\"p\">,</span> <span class=\"n\">Path</span><span
    class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">absolute</span><span
    class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">stem</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Generic</span><span class=\"o\">.</span><span class=\"n\">Subheading</span><span
    class=\"p\">,</span> <span class=\"n\">get_branch</span><span class=\"p\">()[</span><span
    class=\"mi\">0</span><span class=\"p\">]),</span>\n            <span class=\"p\">(</span><span
    class=\"n\">Token</span><span class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
    class=\"o\">.</span><span class=\"n\">Generic</span><span class=\"o\">.</span><span
    class=\"n\">Heading</span><span class=\"p\">,</span> <span class=\"n\">get_branch</span><span
    class=\"p\">()[</span><span class=\"mi\">1</span><span class=\"p\">]),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Class</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;via &quot;</span> <span class=\"o\">+</span>
    <span class=\"n\">get_venv</span><span class=\"p\">()),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
    class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
    class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Entity</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;ipython&quot;</span><span class=\"p\">),</span>\n
    \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
    class=\"p\">),</span>\n            <span class=\"p\">(</span>\n                <span
    class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Prompt</span>\n
    \               <span class=\"k\">if</span> <span class=\"bp\">self</span><span
    class=\"o\">.</span><span class=\"n\">shell</span><span class=\"o\">.</span><span
    class=\"n\">last_execution_succeeded</span>\n                <span class=\"k\">else</span>
    <span class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Generic</span><span
    class=\"o\">.</span><span class=\"n\">Error</span><span class=\"p\">,</span>\n
    \               <span class=\"s2\">&quot;\u276F &quot;</span><span class=\"p\">,</span>\n
    \           <span class=\"p\">),</span>\n        <span class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<p>Notice
    I have 2 custom functions here, <code>get_branch</code> and <code>get_venv</code>
    which grab some git info and python env info and return strings I can dump into
    my prompt as shown above.</p>\n<p>To finish you drop <code>ip = get_ipython()</code>
    and <code>ip.prompts = MyPrompt(ip)</code> at the bottom of your prompt script
    and you should be in custom prompt city!</p>\n<h2 id=\"end\">End <a class=\"header-anchor\"
    href=\"#end\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This is more or less
    notes for myself on how this works - drop by my <a href=\"https://github.com/nicpayne713/dotfiles/tree/home/ipython\">ipython
    config</a> in my dotfiles repo to see my full configs for ipython!</p>\n\n        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['python', 'tech']\ntitle: Ipython-Prompt\ndate:
    2022-04-02T00:00:00\npublished: True\n#cover: \"media/ipython-prompt.png\"\n\n---\n\nI
    have a [post on starship](/starship) where I have some notes on how I use starship
    to make my zsh experience great with a sweet terminal prompt.\n\nNow... I spend
    quite a bit of time in ipython every day and I got kind of sick of the vanilla
    experience and wanted something that more closely matched my starship prompt.\n\nThere's
    more to customizing ipython I know for sure but here's 2 things I have going for
    me...\n\n1. I use [`rich`](https://pypi.org/project/rich/) authored by @[Will
    McGugan](https://twitter.com/willmcgugan) which makes much of my ipython experience
    great.\nI won't write about that here but you can find my `rich` config [here](https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py)\n\n2.
    I used `pygments` to customize the ipython prompt with my `ipython_config.py`
    and a startup script, next to my `rich` one, called `99-prompt.py`.\n\n> The scripts
    inside `~/.ipython/<profile>/startup` are executed in lexigraphical order, so
    it's nice to name things in the 10's to give room for adding scripts in between
    others down the line.\n\n## My prompt\n\nMy zsh prompt looks a little something
    like this:\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png\"
    alt=\"starship\" title=\"A starship prompt\" />\n\n\nAnd after my ipython customiztion
    it currently (subject to much change but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece
    on `main`).\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt.png\"
    alt=\"ipython\" title=\"A starship inspired ipython prompt\" />\n\nNow in ipython
    I have an indicator of my working directory, git branch, python environment, and
    a note that I'm in `ipython` and not `zsh`.\nI also configured my prompt to warn
    me if I'm _not_ in a git directory!\n\n<img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt-no-git.png\"
    alt=\"ipython-ng\" title=\"A starship inspired ipython prompt without git\" />\n\nAll
    in all the customization isn't too bad with just 2 specific files.\n\n## ipython_config.py\n\nThere's
    several use cases for `ipython_config.py` files in several areas on a pc - sometimes
    you want a common config across users, so you'd drop one in `/etc/ipython` and
    othertimes you have your own which is probably at `~/.ipython`\n\nMy ipython config
    mostly has colors defined on `pygment tokens` plus a few autorun commands and
    `pyflyby` (see my friend Waylon's post on pyflyby [here](https://waylonwalker.com/pyflyby/))\n\nI
    wanted to match my ipython somewhat to my tmux and vim color schemes, which I
    model after the vim-airline theme `night owl`.\n\nAfter picking some some colors
    and saving variables it's a matter of setting colors per token and then referencing
    those tokens in your version of `99-prompt.py`.\n\nYou can check out my `ipython_config.py`
    [here](https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py)\n\nFor
    example, I can set `Token.Name.Function` to black, and in `ipython` then a function's
    definition will appear in black text. I set mine to cyan to match my theme.\n\nFor
    the prompt colors just match the keyword in `c.TerminalInteractiveShell.highlighting_style_overrides`
    with what is referenced inside [99-prompt.py](https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py)\n\nFor
    example, `Token.Prompt` is set to `bold grey` which gives me the bold chevron
    symbol you see in the above image that looks like my zsh prompt \n\nThen in `99-prompt.py`
    I have this set for the prompt:\n\n```python\nToken.Prompt \"\u276F \"\n```\n\n##
    99-prompt.py\n\nYou don't need to name your script `99-prompt.py`, but I wanted
    to know that it was for my prompt and I wanted it executed last so it made sense.\n\nHere
    I have `MyPrompt` class with the prompt symbol defined as above and several other
    things... \n\n```python\nclass MyPrompt(Prompts):\n    def in_prompt_tokens(self,
    cli=None):\n        return [\n            (Token, \"\"),\n            (Token.OutPrompt,
    Path().absolute().stem),\n            (Token, \" \"),\n            (Token.Generic.Subheading,
    get_branch()[0]),\n            (Token, \" \"),\n            (Token.Generic.Heading,
    get_branch()[1]),\n            (Token, \" \"),\n            (Token.Name.Class,
    \"via \" + get_venv()),\n            (Token, \" \"),\n            (Token.Name.Entity,
    \"ipython\"),\n            (Token, \"\\n\"),\n            (\n                Token.Prompt\n
    \               if self.shell.last_execution_succeeded\n                else Token.Generic.Error,\n
    \               \"\u276F \",\n            ),\n        ]\n\n```\n\nNotice I have
    2 custom functions here, `get_branch` and `get_venv` which grab some git info
    and python env info and return strings I can dump into my prompt as shown above.\n\nTo
    finish you drop `ip = get_ipython()` and `ip.prompts = MyPrompt(ip)` at the bottom
    of your prompt script and you should be in custom prompt city!\n\n## End\n\nThis
    is more or less notes for myself on how this works - drop by my [ipython config](https://github.com/nicpayne713/dotfiles/tree/home/ipython)
    in my dotfiles repo to see my full configs for ipython!\n"
published: true
slug: ipython-prompt
title: Ipython-Prompt


---

I have a [post on starship](/starship) where I have some notes on how I use starship to make my zsh experience great with a sweet terminal prompt.

Now... I spend quite a bit of time in ipython every day and I got kind of sick of the vanilla experience and wanted something that more closely matched my starship prompt.

There's more to customizing ipython I know for sure but here's 2 things I have going for me...

1. I use [`rich`](https://pypi.org/project/rich/) authored by @[Will McGugan](https://twitter.com/willmcgugan) which makes much of my ipython experience great.
I won't write about that here but you can find my `rich` config [here](https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py)

2. I used `pygments` to customize the ipython prompt with my `ipython_config.py` and a startup script, next to my `rich` one, called `99-prompt.py`.

> The scripts inside `~/.ipython/<profile>/startup` are executed in lexigraphical order, so it's nice to name things in the 10's to give room for adding scripts in between others down the line.

## My prompt

My zsh prompt looks a little something like this:

<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/zsh-starship-prompt.png" alt="starship" title="A starship prompt" />


And after my ipython customiztion it currently (subject to much change but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece on `main`).

<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt.png" alt="ipython" title="A starship inspired ipython prompt" />

Now in ipython I have an indicator of my working directory, git branch, python environment, and a note that I'm in `ipython` and not `zsh`.
I also configured my prompt to warn me if I'm _not_ in a git directory!

<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/ipython-prompt-no-git.png" alt="ipython-ng" title="A starship inspired ipython prompt without git" />

All in all the customization isn't too bad with just 2 specific files.

## ipython_config.py

There's several use cases for `ipython_config.py` files in several areas on a pc - sometimes you want a common config across users, so you'd drop one in `/etc/ipython` and othertimes you have your own which is probably at `~/.ipython`

My ipython config mostly has colors defined on `pygment tokens` plus a few autorun commands and `pyflyby` (see my friend Waylon's post on pyflyby [here](https://waylonwalker.com/pyflyby/))

I wanted to match my ipython somewhat to my tmux and vim color schemes, which I model after the vim-airline theme `night owl`.

After picking some some colors and saving variables it's a matter of setting colors per token and then referencing those tokens in your version of `99-prompt.py`.

You can check out my `ipython_config.py` [here](https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py)

For example, I can set `Token.Name.Function` to black, and in `ipython` then a function's definition will appear in black text. I set mine to cyan to match my theme.

For the prompt colors just match the keyword in `c.TerminalInteractiveShell.highlighting_style_overrides` with what is referenced inside [99-prompt.py](https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py)

For example, `Token.Prompt` is set to `bold grey` which gives me the bold chevron symbol you see in the above image that looks like my zsh prompt 

Then in `99-prompt.py` I have this set for the prompt:

```python
Token.Prompt "❯ "
```

## 99-prompt.py

You don't need to name your script `99-prompt.py`, but I wanted to know that it was for my prompt and I wanted it executed last so it made sense.

Here I have `MyPrompt` class with the prompt symbol defined as above and several other things... 

```python
class MyPrompt(Prompts):
    def in_prompt_tokens(self, cli=None):
        return [
            (Token, ""),
            (Token.OutPrompt, Path().absolute().stem),
            (Token, " "),
            (Token.Generic.Subheading, get_branch()[0]),
            (Token, " "),
            (Token.Generic.Heading, get_branch()[1]),
            (Token, " "),
            (Token.Name.Class, "via " + get_venv()),
            (Token, " "),
            (Token.Name.Entity, "ipython"),
            (Token, "\n"),
            (
                Token.Prompt
                if self.shell.last_execution_succeeded
                else Token.Generic.Error,
                "❯ ",
            ),
        ]

```

Notice I have 2 custom functions here, `get_branch` and `get_venv` which grab some git info and python env info and return strings I can dump into my prompt as shown above.

To finish you drop `ip = get_ipython()` and `ip.prompts = MyPrompt(ip)` at the bottom of your prompt script and you should be in custom prompt city!

## End

This is more or less notes for myself on how this works - drop by my [ipython config](https://github.com/nicpayne713/dotfiles/tree/home/ipython) in my dotfiles repo to see my full configs for ipython!