---
content: "I've been thinking about the work I am doing and have to do in my role at
  Cat,\nin Cat Autonomy, building Forge (see [[forge-ahead]]). I feel like I have\nlittle
  revelations almost every day now, not that it means I'm writing\nsomething amazing
  and producing it really fast but there's just a whole suite\nof problems that different
  technologies solve at different levels and the more\nI become aware of the problems
  that exist, the more the existence of some\nsolutions makes sense.\n\n!!! note \"The
  Problem Perspective\"\n\n    I don't know if this is a real thinking technique or
  if I'm onto something\n    novel(doubt) but I think a lot in terms of problems -
  \"what problem needs\n    solving?\" and that's how I've come to prioritize my work,
  it's only been very\n    recently that I've realized I do this and I think I should
  highlight it's very\n    important to document the problem, otherwise every day
  you might try to solve a\n    different problem but be working on the same code\n\n!!!
  note \"Problem Space\"\n\n    Kedro solves a lot of these problems, so when making
  rada in Reman the problem\n    space was already more contained and narrow, Forge's
  problem-space is much more\n    vast\n\nThe one problem I'm really fixated on right
  now is data loading, the problem I\nneed to solve is accessing data from a wide-variety
  of scripts/tools, without a\nframework or standard method/library of accessing data
  in the first place. I've\nseen lots of projects on GitHub claim to make data loading
  easier and I didn't\nquite understand what problem they were solving... one example
  to name is [Data\nLoad Tool](https://dlthub.com/). I've seen similar ones I don't
  have the name\nfor right now that claim to make it easy/fast to load data from s3,
  or ways to\nmake s3 and a database both abstract in the user-experience for loading
  data.\nBut I hadn't really understood why these tools existed. I have a lot of\nexperience
  with [Kedro](https://dlthub.com/) and their\n[DataCatalog](https://docs.kedro.org/en/latest/catalog-data/introduction/)\nwhich
  provides a python object over a set of yamlfiles that makes it pretty\nsimple to
  load and save data in a way that isolates I/O from the business\nlogic. But what
  I didn't realize at the time how powerful that catalog was, the\npower of standard
  patterns and shared libraries. Now that I don't have it\navailable to me, I'm quite
  aware of the absence.\n\nIn my new role something I'm realizing is that for all
  the developers my team\nnow supports, there isn't a canonical way to access data.
  When I was in Reman\nand working with kedro, the DataCatalog was the access pattern
  and so when I\nwas developing a platform I never really had to think about it -
  it was an\nestablished pattern that I treated as a constraint and then built processes\naround
  it. I've been battling some mental block for weeks on Forge because of\nthe lack
  of that canonical pattern, and as I've talked with other engineers it\nseems like
  the baseline assumption is that data is just available on a\nfilesystem, but everyone's
  code loads data in different ways. On my small Reman\nteam, with common patterns
  to build on, it was easy to make things cloud-native\nor shim in some devops to
  improve people's lives. But when everyone's doing\ntheir own thing, and everyone's
  \"own thing\" is very much built-on some rigid tribal\npatterns then it's hard to
  really move fast cause everyone isn't already moving\nin the same direction.\n\nThat
  made me realize that the first problem Forge needed to solve was in\nproviding a
  way for engineers to have filesystem-native data access in the\nCloud, where we
  are S3-first in our storage philosophy. I didn't need to figure\nout a way for everyone
  to name a dataset, define the dataset in the first\nplace, and give a nice `my_dataset.load`
  that worked in python, bash, cpp, and\nwho knows what else.... I reframed the problem
  from \"how do engineers load up\nthe data\" to \"how do engineers have access to
  the data\". The requirements of\nthe Cat Autonomy group was pretty simple: POSIX-compliant
  storage.\n\nMy pathway to solving this problem is initially underway, I can't imagine
  it'll\nbe too difficult to setup for FSx instances for teams and give them an api
  to\nrun a Batch Job with the FSx mounted. From there, their code can load data from\n`/mnt/fsx/<whatever>`
  just like they otherwise could be doing locally. Or maybe\nFSx will let us setup
  mounts to very flexible mount points and their local\nscripts will \"just work\"
  :shrugs:. I don't know the exact shape, but after\nrealizing the loading data is
  a big deal, I'm thankful I have a narrower\nproblem to solve first.\n\n!!! note
  \"S3 Files\"\n\n    Literally yesterday, AWS launched \"S3 Files\" offering an NFS
  filesystem service over buckets. I'm not sure if NFS is going to be a viable filesystem
  protocol for all of our use cases, but looks like we're not the only people who
  need the filesystem access patterns over S3.\n\n!!! warning \"A Future Problem -
  Canonical Reference\"\n\n    Another high-value thing Forge needs to solve is \"what
  is data\". The data\n    formats we have are not super simple, it's not just a set
  of SQL tables. We\n    have files that relate to each other based on hard-filepath
  patterns, and those\n    patterns are full of tribal knowledge and distributed processes.
  So a simple\n    question like \"How do I use forge to access my data\" is hard.
  In Reman a data\n    scientist would ask \"how do I use rada to access my data?\"
  and the answer is\n    \"We use Kedro, and Kedro solved that problem for us via
  the Catalog\" but\n    without Kedro, without 100% being in python (devs are also
  in embedded systems,\n    cpp code, and more), without even consistent practices
  in the existing \"how do\n    I access my data\" workflows, it's really impossible
  to systemetize and codify\n    it. It is my next challenge to tackle though..."
date: 2026-04-08
description: 'I&#x27;ve been thinking about the work I am doing and have to do in
  my role at Cat,

  in Cat Autonomy, building Forge (see [[forge-ahead]]). I feel like I have

  li'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Data Loading is
    a Huge Deal</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I&#x27;ve been thinking
    about the work I am doing and have to do in my role at Cat,\nin Cat Autonomy,
    building Forge (see [[forge-ahead]]). I feel like I have\nli\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Data Loading is a Huge Deal | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/data-loading-is-a-huge-deal\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Data Loading is a Huge Deal | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I&#x27;ve been thinking about the work I am doing and have to do in
    my role at Cat,\nin Cat Autonomy, building Forge (see [[forge-ahead]]). I feel
    like I have\nli\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/data-loading-is-a-huge-deal</span>\n
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
    mb-4 post-title-large\">Data Loading is a Huge Deal</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-08\">\n
    \           April 08, 2026\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/forge/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #forge\n
    \           </a>\n            <a href=\"https://pype.dev//tags/rada/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #rada\n
    \           </a>\n            <a href=\"https://pype.dev//tags/kedro/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #kedro\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I've been thinking about the work I
    am doing and have to do in my role at Cat,\nin Cat Autonomy, building Forge (see
    <a class=\"wikilink\" href=\"/forge-ahead\">forge-ahead</a>). I feel like I have\nlittle
    revelations almost every day now, not that it means I'm writing\nsomething amazing
    and producing it really fast but there's just a whole suite\nof problems that
    different technologies solve at different levels and the more\nI become aware
    of the problems that exist, the more the existence of some\nsolutions makes sense.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">The Problem Perspective</p>\n<p>I
    don't know if this is a real thinking technique or if I'm onto something\nnovel(doubt)
    but I think a lot in terms of problems - &quot;what problem needs\nsolving?&quot;
    and that's how I've come to prioritize my work, it's only been very\nrecently
    that I've realized I do this and I think I should highlight it's very\nimportant
    to document the problem, otherwise every day you might try to solve a\ndifferent
    problem but be working on the same code</p>\n</div>\n<div class=\"admonition note\">\n<p
    class=\"admonition-title\">Problem Space</p>\n<p>Kedro solves a lot of these problems,
    so when making rada in Reman the problem\nspace was already more contained and
    narrow, Forge's problem-space is much more\nvast</p>\n</div>\n<p>The one problem
    I'm really fixated on right now is data loading, the problem I\nneed to solve
    is accessing data from a wide-variety of scripts/tools, without a\nframework or
    standard method/library of accessing data in the first place. I've\nseen lots
    of projects on GitHub claim to make data loading easier and I didn't\nquite understand
    what problem they were solving... one example to name is <a href=\"https://dlthub.com/\">Data\nLoad
    Tool</a>. I've seen similar ones I don't have the name\nfor right now that claim
    to make it easy/fast to load data from s3, or ways to\nmake s3 and a database
    both abstract in the user-experience for loading data.\nBut I hadn't really understood
    why these tools existed. I have a lot of\nexperience with <a href=\"https://dlthub.com/\">Kedro</a>
    and their\n<a href=\"https://docs.kedro.org/en/latest/catalog-data/introduction/\">DataCatalog</a>\nwhich
    provides a python object over a set of yamlfiles that makes it pretty\nsimple
    to load and save data in a way that isolates I/O from the business\nlogic. But
    what I didn't realize at the time how powerful that catalog was, the\npower of
    standard patterns and shared libraries. Now that I don't have it\navailable to
    me, I'm quite aware of the absence.</p>\n<p>In my new role something I'm realizing
    is that for all the developers my team\nnow supports, there isn't a canonical
    way to access data. When I was in Reman\nand working with kedro, the DataCatalog
    was the access pattern and so when I\nwas developing a platform I never really
    had to think about it - it was an\nestablished pattern that I treated as a constraint
    and then built processes\naround it. I've been battling some mental block for
    weeks on Forge because of\nthe lack of that canonical pattern, and as I've talked
    with other engineers it\nseems like the baseline assumption is that data is just
    available on a\nfilesystem, but everyone's code loads data in different ways.
    On my small Reman\nteam, with common patterns to build on, it was easy to make
    things cloud-native\nor shim in some devops to improve people's lives. But when
    everyone's doing\ntheir own thing, and everyone's &quot;own thing&quot; is very
    much built-on some rigid tribal\npatterns then it's hard to really move fast cause
    everyone isn't already moving\nin the same direction.</p>\n<p>That made me realize
    that the first problem Forge needed to solve was in\nproviding a way for engineers
    to have filesystem-native data access in the\nCloud, where we are S3-first in
    our storage philosophy. I didn't need to figure\nout a way for everyone to name
    a dataset, define the dataset in the first\nplace, and give a nice <code>my_dataset.load</code>
    that worked in python, bash, cpp, and\nwho knows what else.... I reframed the
    problem from &quot;how do engineers load up\nthe data&quot; to &quot;how do engineers
    have access to the data&quot;. The requirements of\nthe Cat Autonomy group was
    pretty simple: POSIX-compliant storage.</p>\n<p>My pathway to solving this problem
    is initially underway, I can't imagine it'll\nbe too difficult to setup for FSx
    instances for teams and give them an api to\nrun a Batch Job with the FSx mounted.
    From there, their code can load data from\n<code>/mnt/fsx/&lt;whatever&gt;</code>
    just like they otherwise could be doing locally. Or maybe\nFSx will let us setup
    mounts to very flexible mount points and their local\nscripts will &quot;just
    work&quot; :shrugs:. I don't know the exact shape, but after\nrealizing the loading
    data is a big deal, I'm thankful I have a narrower\nproblem to solve first.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">S3 Files</p>\n<p>Literally
    yesterday, AWS launched &quot;S3 Files&quot; offering an NFS filesystem service
    over buckets. I'm not sure if NFS is going to be a viable filesystem protocol
    for all of our use cases, but looks like we're not the only people who need the
    filesystem access patterns over S3.</p>\n</div>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">A Future Problem - Canonical Reference</p>\n<p>Another
    high-value thing Forge needs to solve is &quot;what is data&quot;. The data\nformats
    we have are not super simple, it's not just a set of SQL tables. We\nhave files
    that relate to each other based on hard-filepath patterns, and those\npatterns
    are full of tribal knowledge and distributed processes. So a simple\nquestion
    like &quot;How do I use forge to access my data&quot; is hard. In Reman a data\nscientist
    would ask &quot;how do I use rada to access my data?&quot; and the answer is\n&quot;We
    use Kedro, and Kedro solved that problem for us via the Catalog&quot; but\nwithout
    Kedro, without 100% being in python (devs are also in embedded systems,\ncpp code,
    and more), without even consistent practices in the existing &quot;how do\nI access
    my data&quot; workflows, it's really impossible to systemetize and codify\nit.
    It is my next challenge to tackle though...</p>\n</div>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Data Loading is a Huge
    Deal</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I&#x27;ve been thinking
    about the work I am doing and have to do in my role at Cat,\nin Cat Autonomy,
    building Forge (see [[forge-ahead]]). I feel like I have\nli\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Data Loading is a Huge Deal | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/data-loading-is-a-huge-deal\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Data Loading is a Huge Deal | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I&#x27;ve been thinking about the work I am doing and have to do in
    my role at Cat,\nin Cat Autonomy, building Forge (see [[forge-ahead]]). I feel
    like I have\nli\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Data Loading is a Huge Deal</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-08\">\n
    \           April 08, 2026\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/forge/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #forge\n
    \           </a>\n            <a href=\"https://pype.dev//tags/rada/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #rada\n
    \           </a>\n            <a href=\"https://pype.dev//tags/kedro/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #kedro\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Data Loading is a Huge Deal</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-04-08\">\n
    \           April 08, 2026\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/forge/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #forge\n
    \           </a>\n            <a href=\"https://pype.dev//tags/rada/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #rada\n
    \           </a>\n            <a href=\"https://pype.dev//tags/kedro/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #kedro\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I've been thinking about the work I
    am doing and have to do in my role at Cat,\nin Cat Autonomy, building Forge (see
    <a class=\"wikilink\" href=\"/forge-ahead\">forge-ahead</a>). I feel like I have\nlittle
    revelations almost every day now, not that it means I'm writing\nsomething amazing
    and producing it really fast but there's just a whole suite\nof problems that
    different technologies solve at different levels and the more\nI become aware
    of the problems that exist, the more the existence of some\nsolutions makes sense.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">The Problem Perspective</p>\n<p>I
    don't know if this is a real thinking technique or if I'm onto something\nnovel(doubt)
    but I think a lot in terms of problems - &quot;what problem needs\nsolving?&quot;
    and that's how I've come to prioritize my work, it's only been very\nrecently
    that I've realized I do this and I think I should highlight it's very\nimportant
    to document the problem, otherwise every day you might try to solve a\ndifferent
    problem but be working on the same code</p>\n</div>\n<div class=\"admonition note\">\n<p
    class=\"admonition-title\">Problem Space</p>\n<p>Kedro solves a lot of these problems,
    so when making rada in Reman the problem\nspace was already more contained and
    narrow, Forge's problem-space is much more\nvast</p>\n</div>\n<p>The one problem
    I'm really fixated on right now is data loading, the problem I\nneed to solve
    is accessing data from a wide-variety of scripts/tools, without a\nframework or
    standard method/library of accessing data in the first place. I've\nseen lots
    of projects on GitHub claim to make data loading easier and I didn't\nquite understand
    what problem they were solving... one example to name is <a href=\"https://dlthub.com/\">Data\nLoad
    Tool</a>. I've seen similar ones I don't have the name\nfor right now that claim
    to make it easy/fast to load data from s3, or ways to\nmake s3 and a database
    both abstract in the user-experience for loading data.\nBut I hadn't really understood
    why these tools existed. I have a lot of\nexperience with <a href=\"https://dlthub.com/\">Kedro</a>
    and their\n<a href=\"https://docs.kedro.org/en/latest/catalog-data/introduction/\">DataCatalog</a>\nwhich
    provides a python object over a set of yamlfiles that makes it pretty\nsimple
    to load and save data in a way that isolates I/O from the business\nlogic. But
    what I didn't realize at the time how powerful that catalog was, the\npower of
    standard patterns and shared libraries. Now that I don't have it\navailable to
    me, I'm quite aware of the absence.</p>\n<p>In my new role something I'm realizing
    is that for all the developers my team\nnow supports, there isn't a canonical
    way to access data. When I was in Reman\nand working with kedro, the DataCatalog
    was the access pattern and so when I\nwas developing a platform I never really
    had to think about it - it was an\nestablished pattern that I treated as a constraint
    and then built processes\naround it. I've been battling some mental block for
    weeks on Forge because of\nthe lack of that canonical pattern, and as I've talked
    with other engineers it\nseems like the baseline assumption is that data is just
    available on a\nfilesystem, but everyone's code loads data in different ways.
    On my small Reman\nteam, with common patterns to build on, it was easy to make
    things cloud-native\nor shim in some devops to improve people's lives. But when
    everyone's doing\ntheir own thing, and everyone's &quot;own thing&quot; is very
    much built-on some rigid tribal\npatterns then it's hard to really move fast cause
    everyone isn't already moving\nin the same direction.</p>\n<p>That made me realize
    that the first problem Forge needed to solve was in\nproviding a way for engineers
    to have filesystem-native data access in the\nCloud, where we are S3-first in
    our storage philosophy. I didn't need to figure\nout a way for everyone to name
    a dataset, define the dataset in the first\nplace, and give a nice <code>my_dataset.load</code>
    that worked in python, bash, cpp, and\nwho knows what else.... I reframed the
    problem from &quot;how do engineers load up\nthe data&quot; to &quot;how do engineers
    have access to the data&quot;. The requirements of\nthe Cat Autonomy group was
    pretty simple: POSIX-compliant storage.</p>\n<p>My pathway to solving this problem
    is initially underway, I can't imagine it'll\nbe too difficult to setup for FSx
    instances for teams and give them an api to\nrun a Batch Job with the FSx mounted.
    From there, their code can load data from\n<code>/mnt/fsx/&lt;whatever&gt;</code>
    just like they otherwise could be doing locally. Or maybe\nFSx will let us setup
    mounts to very flexible mount points and their local\nscripts will &quot;just
    work&quot; :shrugs:. I don't know the exact shape, but after\nrealizing the loading
    data is a big deal, I'm thankful I have a narrower\nproblem to solve first.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">S3 Files</p>\n<p>Literally
    yesterday, AWS launched &quot;S3 Files&quot; offering an NFS filesystem service
    over buckets. I'm not sure if NFS is going to be a viable filesystem protocol
    for all of our use cases, but looks like we're not the only people who need the
    filesystem access patterns over S3.</p>\n</div>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">A Future Problem - Canonical Reference</p>\n<p>Another
    high-value thing Forge needs to solve is &quot;what is data&quot;. The data\nformats
    we have are not super simple, it's not just a set of SQL tables. We\nhave files
    that relate to each other based on hard-filepath patterns, and those\npatterns
    are full of tribal knowledge and distributed processes. So a simple\nquestion
    like &quot;How do I use forge to access my data&quot; is hard. In Reman a data\nscientist
    would ask &quot;how do I use rada to access my data?&quot; and the answer is\n&quot;We
    use Kedro, and Kedro solved that problem for us via the Catalog&quot; but\nwithout
    Kedro, without 100% being in python (devs are also in embedded systems,\ncpp code,
    and more), without even consistent practices in the existing &quot;how do\nI access
    my data&quot; workflows, it's really impossible to systemetize and codify\nit.
    It is my next challenge to tackle though...</p>\n</div>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Data Loading
    is a Huge Deal</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I&#x27;ve been thinking
    about the work I am doing and have to do in my role at Cat,\nin Cat Autonomy,
    building Forge (see [[forge-ahead]]). I feel like I have\nli\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Data Loading is a Huge Deal | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/data-loading-is-a-huge-deal\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Data Loading is a Huge Deal | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I&#x27;ve been thinking about the work I am doing and have to do in
    my role at Cat,\nin Cat Autonomy, building Forge (see [[forge-ahead]]). I feel
    like I have\nli\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/data-loading-is-a-huge-deal</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>I've
    been thinking about the work I am doing and have to do in my role at Cat,\nin
    Cat Autonomy, building Forge (see <a class=\"wikilink\" href=\"/forge-ahead\">forge-ahead</a>).
    I feel like I have\nlittle revelations almost every day now, not that it means
    I'm writing\nsomething amazing and producing it really fast but there's just a
    whole suite\nof problems that different technologies solve at different levels
    and the more\nI become aware of the problems that exist, the more the existence
    of some\nsolutions makes sense.</p>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">The
    Problem Perspective</p>\n<p>I don't know if this is a real thinking technique
    or if I'm onto something\nnovel(doubt) but I think a lot in terms of problems
    - &quot;what problem needs\nsolving?&quot; and that's how I've come to prioritize
    my work, it's only been very\nrecently that I've realized I do this and I think
    I should highlight it's very\nimportant to document the problem, otherwise every
    day you might try to solve a\ndifferent problem but be working on the same code</p>\n</div>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">Problem Space</p>\n<p>Kedro
    solves a lot of these problems, so when making rada in Reman the problem\nspace
    was already more contained and narrow, Forge's problem-space is much more\nvast</p>\n</div>\n<p>The
    one problem I'm really fixated on right now is data loading, the problem I\nneed
    to solve is accessing data from a wide-variety of scripts/tools, without a\nframework
    or standard method/library of accessing data in the first place. I've\nseen lots
    of projects on GitHub claim to make data loading easier and I didn't\nquite understand
    what problem they were solving... one example to name is <a href=\"https://dlthub.com/\">Data\nLoad
    Tool</a>. I've seen similar ones I don't have the name\nfor right now that claim
    to make it easy/fast to load data from s3, or ways to\nmake s3 and a database
    both abstract in the user-experience for loading data.\nBut I hadn't really understood
    why these tools existed. I have a lot of\nexperience with <a href=\"https://dlthub.com/\">Kedro</a>
    and their\n<a href=\"https://docs.kedro.org/en/latest/catalog-data/introduction/\">DataCatalog</a>\nwhich
    provides a python object over a set of yamlfiles that makes it pretty\nsimple
    to load and save data in a way that isolates I/O from the business\nlogic. But
    what I didn't realize at the time how powerful that catalog was, the\npower of
    standard patterns and shared libraries. Now that I don't have it\navailable to
    me, I'm quite aware of the absence.</p>\n<p>In my new role something I'm realizing
    is that for all the developers my team\nnow supports, there isn't a canonical
    way to access data. When I was in Reman\nand working with kedro, the DataCatalog
    was the access pattern and so when I\nwas developing a platform I never really
    had to think about it - it was an\nestablished pattern that I treated as a constraint
    and then built processes\naround it. I've been battling some mental block for
    weeks on Forge because of\nthe lack of that canonical pattern, and as I've talked
    with other engineers it\nseems like the baseline assumption is that data is just
    available on a\nfilesystem, but everyone's code loads data in different ways.
    On my small Reman\nteam, with common patterns to build on, it was easy to make
    things cloud-native\nor shim in some devops to improve people's lives. But when
    everyone's doing\ntheir own thing, and everyone's &quot;own thing&quot; is very
    much built-on some rigid tribal\npatterns then it's hard to really move fast cause
    everyone isn't already moving\nin the same direction.</p>\n<p>That made me realize
    that the first problem Forge needed to solve was in\nproviding a way for engineers
    to have filesystem-native data access in the\nCloud, where we are S3-first in
    our storage philosophy. I didn't need to figure\nout a way for everyone to name
    a dataset, define the dataset in the first\nplace, and give a nice <code>my_dataset.load</code>
    that worked in python, bash, cpp, and\nwho knows what else.... I reframed the
    problem from &quot;how do engineers load up\nthe data&quot; to &quot;how do engineers
    have access to the data&quot;. The requirements of\nthe Cat Autonomy group was
    pretty simple: POSIX-compliant storage.</p>\n<p>My pathway to solving this problem
    is initially underway, I can't imagine it'll\nbe too difficult to setup for FSx
    instances for teams and give them an api to\nrun a Batch Job with the FSx mounted.
    From there, their code can load data from\n<code>/mnt/fsx/&lt;whatever&gt;</code>
    just like they otherwise could be doing locally. Or maybe\nFSx will let us setup
    mounts to very flexible mount points and their local\nscripts will &quot;just
    work&quot; :shrugs:. I don't know the exact shape, but after\nrealizing the loading
    data is a big deal, I'm thankful I have a narrower\nproblem to solve first.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">S3 Files</p>\n<p>Literally
    yesterday, AWS launched &quot;S3 Files&quot; offering an NFS filesystem service
    over buckets. I'm not sure if NFS is going to be a viable filesystem protocol
    for all of our use cases, but looks like we're not the only people who need the
    filesystem access patterns over S3.</p>\n</div>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">A Future Problem - Canonical Reference</p>\n<p>Another
    high-value thing Forge needs to solve is &quot;what is data&quot;. The data\nformats
    we have are not super simple, it's not just a set of SQL tables. We\nhave files
    that relate to each other based on hard-filepath patterns, and those\npatterns
    are full of tribal knowledge and distributed processes. So a simple\nquestion
    like &quot;How do I use forge to access my data&quot; is hard. In Reman a data\nscientist
    would ask &quot;how do I use rada to access my data?&quot; and the answer is\n&quot;We
    use Kedro, and Kedro solved that problem for us via the Catalog&quot; but\nwithout
    Kedro, without 100% being in python (devs are also in embedded systems,\ncpp code,
    and more), without even consistent practices in the existing &quot;how do\nI access
    my data&quot; workflows, it's really impossible to systemetize and codify\nit.
    It is my next challenge to tackle though...</p>\n</div>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2026-04-08 07:40:14\ntemplateKey: blog-post\ntitle: Data Loading
    is a Huge Deal\npublished: True\ntags:\n  - forge\n  - rada\n  - kedro\n  - tech\n---\n\nI've
    been thinking about the work I am doing and have to do in my role at Cat,\nin
    Cat Autonomy, building Forge (see [[forge-ahead]]). I feel like I have\nlittle
    revelations almost every day now, not that it means I'm writing\nsomething amazing
    and producing it really fast but there's just a whole suite\nof problems that
    different technologies solve at different levels and the more\nI become aware
    of the problems that exist, the more the existence of some\nsolutions makes sense.\n\n!!!
    note \"The Problem Perspective\"\n\n    I don't know if this is a real thinking
    technique or if I'm onto something\n    novel(doubt) but I think a lot in terms
    of problems - \"what problem needs\n    solving?\" and that's how I've come to
    prioritize my work, it's only been very\n    recently that I've realized I do
    this and I think I should highlight it's very\n    important to document the problem,
    otherwise every day you might try to solve a\n    different problem but be working
    on the same code\n\n!!! note \"Problem Space\"\n\n    Kedro solves a lot of these
    problems, so when making rada in Reman the problem\n    space was already more
    contained and narrow, Forge's problem-space is much more\n    vast\n\nThe one
    problem I'm really fixated on right now is data loading, the problem I\nneed to
    solve is accessing data from a wide-variety of scripts/tools, without a\nframework
    or standard method/library of accessing data in the first place. I've\nseen lots
    of projects on GitHub claim to make data loading easier and I didn't\nquite understand
    what problem they were solving... one example to name is [Data\nLoad Tool](https://dlthub.com/).
    I've seen similar ones I don't have the name\nfor right now that claim to make
    it easy/fast to load data from s3, or ways to\nmake s3 and a database both abstract
    in the user-experience for loading data.\nBut I hadn't really understood why these
    tools existed. I have a lot of\nexperience with [Kedro](https://dlthub.com/) and
    their\n[DataCatalog](https://docs.kedro.org/en/latest/catalog-data/introduction/)\nwhich
    provides a python object over a set of yamlfiles that makes it pretty\nsimple
    to load and save data in a way that isolates I/O from the business\nlogic. But
    what I didn't realize at the time how powerful that catalog was, the\npower of
    standard patterns and shared libraries. Now that I don't have it\navailable to
    me, I'm quite aware of the absence.\n\nIn my new role something I'm realizing
    is that for all the developers my team\nnow supports, there isn't a canonical
    way to access data. When I was in Reman\nand working with kedro, the DataCatalog
    was the access pattern and so when I\nwas developing a platform I never really
    had to think about it - it was an\nestablished pattern that I treated as a constraint
    and then built processes\naround it. I've been battling some mental block for
    weeks on Forge because of\nthe lack of that canonical pattern, and as I've talked
    with other engineers it\nseems like the baseline assumption is that data is just
    available on a\nfilesystem, but everyone's code loads data in different ways.
    On my small Reman\nteam, with common patterns to build on, it was easy to make
    things cloud-native\nor shim in some devops to improve people's lives. But when
    everyone's doing\ntheir own thing, and everyone's \"own thing\" is very much built-on
    some rigid tribal\npatterns then it's hard to really move fast cause everyone
    isn't already moving\nin the same direction.\n\nThat made me realize that the
    first problem Forge needed to solve was in\nproviding a way for engineers to have
    filesystem-native data access in the\nCloud, where we are S3-first in our storage
    philosophy. I didn't need to figure\nout a way for everyone to name a dataset,
    define the dataset in the first\nplace, and give a nice `my_dataset.load` that
    worked in python, bash, cpp, and\nwho knows what else.... I reframed the problem
    from \"how do engineers load up\nthe data\" to \"how do engineers have access
    to the data\". The requirements of\nthe Cat Autonomy group was pretty simple:
    POSIX-compliant storage.\n\nMy pathway to solving this problem is initially underway,
    I can't imagine it'll\nbe too difficult to setup for FSx instances for teams and
    give them an api to\nrun a Batch Job with the FSx mounted. From there, their code
    can load data from\n`/mnt/fsx/<whatever>` just like they otherwise could be doing
    locally. Or maybe\nFSx will let us setup mounts to very flexible mount points
    and their local\nscripts will \"just work\" :shrugs:. I don't know the exact shape,
    but after\nrealizing the loading data is a big deal, I'm thankful I have a narrower\nproblem
    to solve first.\n\n!!! note \"S3 Files\"\n\n    Literally yesterday, AWS launched
    \"S3 Files\" offering an NFS filesystem service over buckets. I'm not sure if
    NFS is going to be a viable filesystem protocol for all of our use cases, but
    looks like we're not the only people who need the filesystem access patterns over
    S3.\n\n!!! warning \"A Future Problem - Canonical Reference\"\n\n    Another high-value
    thing Forge needs to solve is \"what is data\". The data\n    formats we have
    are not super simple, it's not just a set of SQL tables. We\n    have files that
    relate to each other based on hard-filepath patterns, and those\n    patterns
    are full of tribal knowledge and distributed processes. So a simple\n    question
    like \"How do I use forge to access my data\" is hard. In Reman a data\n    scientist
    would ask \"how do I use rada to access my data?\" and the answer is\n    \"We
    use Kedro, and Kedro solved that problem for us via the Catalog\" but\n    without
    Kedro, without 100% being in python (devs are also in embedded systems,\n    cpp
    code, and more), without even consistent practices in the existing \"how do\n
    \   I access my data\" workflows, it's really impossible to systemetize and codify\n
    \   it. It is my next challenge to tackle though...\n"
published: true
slug: data-loading-is-a-huge-deal
title: Data Loading is a Huge Deal


---

I've been thinking about the work I am doing and have to do in my role at Cat,
in Cat Autonomy, building Forge (see [[forge-ahead]]). I feel like I have
little revelations almost every day now, not that it means I'm writing
something amazing and producing it really fast but there's just a whole suite
of problems that different technologies solve at different levels and the more
I become aware of the problems that exist, the more the existence of some
solutions makes sense.

!!! note "The Problem Perspective"

    I don't know if this is a real thinking technique or if I'm onto something
    novel(doubt) but I think a lot in terms of problems - "what problem needs
    solving?" and that's how I've come to prioritize my work, it's only been very
    recently that I've realized I do this and I think I should highlight it's very
    important to document the problem, otherwise every day you might try to solve a
    different problem but be working on the same code

!!! note "Problem Space"

    Kedro solves a lot of these problems, so when making rada in Reman the problem
    space was already more contained and narrow, Forge's problem-space is much more
    vast

The one problem I'm really fixated on right now is data loading, the problem I
need to solve is accessing data from a wide-variety of scripts/tools, without a
framework or standard method/library of accessing data in the first place. I've
seen lots of projects on GitHub claim to make data loading easier and I didn't
quite understand what problem they were solving... one example to name is [Data
Load Tool](https://dlthub.com/). I've seen similar ones I don't have the name
for right now that claim to make it easy/fast to load data from s3, or ways to
make s3 and a database both abstract in the user-experience for loading data.
But I hadn't really understood why these tools existed. I have a lot of
experience with [Kedro](https://dlthub.com/) and their
[DataCatalog](https://docs.kedro.org/en/latest/catalog-data/introduction/)
which provides a python object over a set of yamlfiles that makes it pretty
simple to load and save data in a way that isolates I/O from the business
logic. But what I didn't realize at the time how powerful that catalog was, the
power of standard patterns and shared libraries. Now that I don't have it
available to me, I'm quite aware of the absence.

In my new role something I'm realizing is that for all the developers my team
now supports, there isn't a canonical way to access data. When I was in Reman
and working with kedro, the DataCatalog was the access pattern and so when I
was developing a platform I never really had to think about it - it was an
established pattern that I treated as a constraint and then built processes
around it. I've been battling some mental block for weeks on Forge because of
the lack of that canonical pattern, and as I've talked with other engineers it
seems like the baseline assumption is that data is just available on a
filesystem, but everyone's code loads data in different ways. On my small Reman
team, with common patterns to build on, it was easy to make things cloud-native
or shim in some devops to improve people's lives. But when everyone's doing
their own thing, and everyone's "own thing" is very much built-on some rigid tribal
patterns then it's hard to really move fast cause everyone isn't already moving
in the same direction.

That made me realize that the first problem Forge needed to solve was in
providing a way for engineers to have filesystem-native data access in the
Cloud, where we are S3-first in our storage philosophy. I didn't need to figure
out a way for everyone to name a dataset, define the dataset in the first
place, and give a nice `my_dataset.load` that worked in python, bash, cpp, and
who knows what else.... I reframed the problem from "how do engineers load up
the data" to "how do engineers have access to the data". The requirements of
the Cat Autonomy group was pretty simple: POSIX-compliant storage.

My pathway to solving this problem is initially underway, I can't imagine it'll
be too difficult to setup for FSx instances for teams and give them an api to
run a Batch Job with the FSx mounted. From there, their code can load data from
`/mnt/fsx/<whatever>` just like they otherwise could be doing locally. Or maybe
FSx will let us setup mounts to very flexible mount points and their local
scripts will "just work" :shrugs:. I don't know the exact shape, but after
realizing the loading data is a big deal, I'm thankful I have a narrower
problem to solve first.

!!! note "S3 Files"

    Literally yesterday, AWS launched "S3 Files" offering an NFS filesystem service over buckets. I'm not sure if NFS is going to be a viable filesystem protocol for all of our use cases, but looks like we're not the only people who need the filesystem access patterns over S3.

!!! warning "A Future Problem - Canonical Reference"

    Another high-value thing Forge needs to solve is "what is data". The data
    formats we have are not super simple, it's not just a set of SQL tables. We
    have files that relate to each other based on hard-filepath patterns, and those
    patterns are full of tribal knowledge and distributed processes. So a simple
    question like "How do I use forge to access my data" is hard. In Reman a data
    scientist would ask "how do I use rada to access my data?" and the answer is
    "We use Kedro, and Kedro solved that problem for us via the Catalog" but
    without Kedro, without 100% being in python (devs are also in embedded systems,
    cpp code, and more), without even consistent practices in the existing "how do
    I access my data" workflows, it's really impossible to systemetize and codify
    it. It is my next challenge to tackle though...