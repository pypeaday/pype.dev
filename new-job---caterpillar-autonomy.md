---
content: 'In [[im-back-from-the-dead]] I mentioned my new role that started this year
  -

  it''s a return to Caterpillar Autonomy. I built some data pipelines and

  junior-grade infrastructure 5 years ago but left over burn-out at the prospect of

  a job with smaller scoped work and more technical guidance. That was a good

  move, and in God''s sovereignty he''s brought me back. Now I''m looking at code,

  thankfully not that I wrote, but that the guy after me wrote - it accomplished

  a job, like my original work did, but also like what I built back then -

  there''s better ways today. The amount of things in front of me is absolutely

  daunting, and the people on the team have been seeded with a very high opinion

  of me... I don''t know how much is valid and how much is hype, but I''m gonna try

  to live up to it.


  One way I''m striving to do that is to maximize my efficiency with the AI coding

  tools available to me. We have Github Copilot and I''ve picked up a lot over the

  course of the last few years (and especially more recently) in using agents,

  planning out work, documenting plans for agents to follow, splitting up work

  via worktrees, etc. I feel pretty good about where I''m going and someday I

  might even release Nexus. Nexus is serving as my second-brain at work, the hub

  where I collaborate with my fleet of agents on the work that must get done.

  Details to come on this, but the thing that matters is that in ironing out

  workflow I''ve moved from prompt + chat to really managing a long-lived stream

  of work. AI has been changing the world, and there''s been developer hype for

  years now. But "make me a cool app, no mistakes" isn''t going to cut it. Even

  "make an app but generate a plan first" isn''t going to cut it... Developers

  have to adopt a higher level role, a systems-oriented and architecture-driven

  worldview must become primary in order to keep up. Code-gen and syntax writing

  are not what developers were **ever** paid to do, although many believed so.

  Our jobs have been to solve problems and deliver code that solves the problem.

  The code is cheap now, but solving problems still is a human task.


  In the Autonomy group - there''s problems all up and down the stack. My focus is

  on infrastructure and developer operations - it''s become my bread and butter

  over the last several years. I''m excited to help the team grow, and I''m excited

  to grow personally/technically as I lean into the agentic workflow to produce

  code that I''m actually proud of, that has my name on the commit, and that

  solves real problems.


  ## Example - Local Development


  One of the first things I''m tackling is a developer-pain-point of working on

  their laptop. I''ve been in this space for years, mostly with python programmer

  who are writing data science code. They don''t know about virtual environments,

  checking $PATH, assuming bad state in their terminal session, how to configure

  VS Code, etc. Often they just want to write some scripts and somehow test it.

  The solution I see most often is for devs to write code in JupyterLab/Notebooks

  in AWS or some environment close to their data - this is fine I guess, but it''s

  not developing good pipelines, and it''s tedious as hell. In my last job I

  helped set developers up with workflows that allowed them to run their IDE of

  choice locally (getting all the goodies of syntax highlighting, LSP, etc) and a

  CLI that took their code and ran it in the cloud, right next to data, in the

  same way that prod runs. It was a hit. After that I introduced some tools to

  help them manage python environments - we had strict templating requirements in

  our projects, so making tools to automate those things wasn''t too hard - it''s

  much easier than trying to make something flexible for every use case. The

  opinions made the automation and tooling easy to make and distribute.


  Well I''m up against a similar task now, but oh so much worse... Larger team,

  larger environment sprawl, larger infrastructure mismanagement, the whole

  gambit. And I''m here for it... Here''s the first problem I''m addressing - local

  development for Airflow DAGs that run in an Airflow deployment on Kubernetes.

  The deployment itself is a little odd, Airflow is an orchestrator, all the

  pipelines run in external AWS Batch jobs - so a DAG hits the Batch API to run

  the code. The design there is actually nice, but how are devs testing code?


  Oh that''s easy... they SSH into the prod server, which is a 5 year old desktop

  THAT I BUILT WITH A CO-WORKER BEFORE I WAS IN AUTONOMY THE FIRST TIME... hold

  on, WHAT!? Yes, it''s true.. so they SSH into the prod server, run some bash

  scripts in their userspace that setup airflow and a few db utilities in a

  docker compose stack, authenticate with AWS themselves from that server, and

  then they run DAGs against real data to test it... I am beyond shook.


  Here''s what I''ve put together - a bootstrap process (I like `just` + PEP 723

  python scripts as opposed to bash, but to each their own, and bash of course

  has its place) that spins up a [kind](https://kind.sigs.k8s.io/) cluster on

  their laptop, the process pulls some private images and loads them into the

  kind cluster, it installs airflow from a helm chart (the same helm chart we''ll

  use in dev and prod... no more docker compose over here, kubectl over there),

  and everything just. comes. up. No SSH into ancient server, no touching cloud

  infra (they get MinIO and a DB container to emulate S3 and RDS in our AWS

  accounts), no sweat on testing DAGs. They stage some data in MinIO (`just open

  minio` handles the port-forward and opens the browser), then `just open

  airflow` (their DAGs are hot-reloaded via hostPath mounting), and they can run

  DAGs locally until they''re satisfied with the results.


  It''s taken me about a week of split-focused effort (I mentioned Nexus and I''ve

  been co-building and dogfooding that at the same time) but I''m proud of that

  local setup now. I am a bit shocked they''ve dealt with a brittle, hacky, often

  broken development workflow for the last 4 years or so, but that development I

  suppose.


  ## The Point


  This post wasn''t meant to be me glazing myself for awesome local development

  practices, I am simply excited about this new chapter. I love solving problems,

  and I love owning those solutions. There''s a whole mess of things to address,

  my mind is buzzing, and I feel like God has blessed me with renewed passion

  (again see [[im-back-from-the-dead]]). I''ve given up some pay and some freedom

  to take this role, but I think it''ll pay dividends.


  Life happens to all of us - this role change affected a lot for me, it''s been

  hard to digest some of those changes, but the work is good, the development is

  fun, the new world of using agents to fly through things you''re fluent in is

  exciting, and I''m here to help a team that desperately needs it to improve

  their lives and the work we do for Cat Autonomy.


  I''m still pissed at Caterpillar Executives for RTO ruining parts of my life,

  but in God''s sovereignty their idiocy has led to non-trivial blessing, so I can

  say "Praise the Lord"'
date: 2026-01-26
description: 'In [[im-back-from-the-dead]] I mentioned my new role that started this
  year -

  it&#x27;s a return to Caterpillar Autonomy. I built some data pipelines and

  junior'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>New Job - Caterpillar
    Autonomy</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"In [[im-back-from-the-dead]]
    I mentioned my new role that started this year -\nit&#x27;s a return to Caterpillar
    Autonomy. I built some data pipelines and\njunior\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"New Job - Caterpillar Autonomy | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/new-job-caterpillar-autonomy\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"New Job - Caterpillar Autonomy | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"In [[im-back-from-the-dead]] I mentioned my new role that started this
    year -\nit&#x27;s a return to Caterpillar Autonomy. I built some data pipelines
    and\njunior\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\"
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
    \           <span class=\"site-terminal__dir\">~/new-job-caterpillar-autonomy</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\"
    alt=\"New Job - Caterpillar Autonomy cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">New
    Job - Caterpillar Autonomy</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2026-01-26\">\n            January 26, 2026\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/work/\" class=\"inline-block bg-primary-light text-accent-cool
    text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80 transition-colors
    border border-accent-cool/20 hover-lift\">\n                #work\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>In <a class=\"wikilink\" href=\"/im-back-from-the-dead\">im-back-from-the-dead</a>
    I mentioned my new role that started this year -\nit's a return to Caterpillar
    Autonomy. I built some data pipelines and\njunior-grade infrastructure 5 years
    ago but left over burn-out at the prospect of\na job with smaller scoped work
    and more technical guidance. That was a good\nmove, and in God's sovereignty he's
    brought me back. Now I'm looking at code,\nthankfully not that I wrote, but that
    the guy after me wrote - it accomplished\na job, like my original work did, but
    also like what I built back then -\nthere's better ways today. The amount of things
    in front of me is absolutely\ndaunting, and the people on the team have been seeded
    with a very high opinion\nof me... I don't know how much is valid and how much
    is hype, but I'm gonna try\nto live up to it.</p>\n<p>One way I'm striving to
    do that is to maximize my efficiency with the AI coding\ntools available to me.
    We have Github Copilot and I've picked up a lot over the\ncourse of the last few
    years (and especially more recently) in using agents,\nplanning out work, documenting
    plans for agents to follow, splitting up work\nvia worktrees, etc. I feel pretty
    good about where I'm going and someday I\nmight even release Nexus. Nexus is serving
    as my second-brain at work, the hub\nwhere I collaborate with my fleet of agents
    on the work that must get done.\nDetails to come on this, but the thing that matters
    is that in ironing out\nworkflow I've moved from prompt + chat to really managing
    a long-lived stream\nof work. AI has been changing the world, and there's been
    developer hype for\nyears now. But &quot;make me a cool app, no mistakes&quot;
    isn't going to cut it. Even\n&quot;make an app but generate a plan first&quot;
    isn't going to cut it... Developers\nhave to adopt a higher level role, a systems-oriented
    and architecture-driven\nworldview must become primary in order to keep up. Code-gen
    and syntax writing\nare not what developers were <strong>ever</strong> paid to
    do, although many believed so.\nOur jobs have been to solve problems and deliver
    code that solves the problem.\nThe code is cheap now, but solving problems still
    is a human task.</p>\n<p>In the Autonomy group - there's problems all up and down
    the stack. My focus is\non infrastructure and developer operations - it's become
    my bread and butter\nover the last several years. I'm excited to help the team
    grow, and I'm excited\nto grow personally/technically as I lean into the agentic
    workflow to produce\ncode that I'm actually proud of, that has my name on the
    commit, and that\nsolves real problems.</p>\n<h2 id=\"example---local-development\">Example
    - Local Development <a class=\"header-anchor\" href=\"#example---local-development\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the first things
    I'm tackling is a developer-pain-point of working on\ntheir laptop. I've been
    in this space for years, mostly with python programmer\nwho are writing data science
    code. They don't know about virtual environments,\nchecking $PATH, assuming bad
    state in their terminal session, how to configure\nVS Code, etc. Often they just
    want to write some scripts and somehow test it.\nThe solution I see most often
    is for devs to write code in JupyterLab/Notebooks\nin AWS or some environment
    close to their data - this is fine I guess, but it's\nnot developing good pipelines,
    and it's tedious as hell. In my last job I\nhelped set developers up with workflows
    that allowed them to run their IDE of\nchoice locally (getting all the goodies
    of syntax highlighting, LSP, etc) and a\nCLI that took their code and ran it in
    the cloud, right next to data, in the\nsame way that prod runs. It was a hit.
    After that I introduced some tools to\nhelp them manage python environments -
    we had strict templating requirements in\nour projects, so making tools to automate
    those things wasn't too hard - it's\nmuch easier than trying to make something
    flexible for every use case. The\nopinions made the automation and tooling easy
    to make and distribute.</p>\n<p>Well I'm up against a similar task now, but oh
    so much worse... Larger team,\nlarger environment sprawl, larger infrastructure
    mismanagement, the whole\ngambit. And I'm here for it... Here's the first problem
    I'm addressing - local\ndevelopment for Airflow DAGs that run in an Airflow deployment
    on Kubernetes.\nThe deployment itself is a little odd, Airflow is an orchestrator,
    all the\npipelines run in external AWS Batch jobs - so a DAG hits the Batch API
    to run\nthe code. The design there is actually nice, but how are devs testing
    code?</p>\n<p>Oh that's easy... they SSH into the prod server, which is a 5 year
    old desktop\nTHAT I BUILT WITH A CO-WORKER BEFORE I WAS IN AUTONOMY THE FIRST
    TIME... hold\non, WHAT!? Yes, it's true.. so they SSH into the prod server, run
    some bash\nscripts in their userspace that setup airflow and a few db utilities
    in a\ndocker compose stack, authenticate with AWS themselves from that server,
    and\nthen they run DAGs against real data to test it... I am beyond shook.</p>\n<p>Here's
    what I've put together - a bootstrap process (I like <code>just</code> + PEP 723\npython
    scripts as opposed to bash, but to each their own, and bash of course\nhas its
    place) that spins up a <a href=\"https://kind.sigs.k8s.io/\">kind</a> cluster
    on\ntheir laptop, the process pulls some private images and loads them into the\nkind
    cluster, it installs airflow from a helm chart (the same helm chart we'll\nuse
    in dev and prod... no more docker compose over here, kubectl over there),\nand
    everything just. comes. up. No SSH into ancient server, no touching cloud\ninfra
    (they get MinIO and a DB container to emulate S3 and RDS in our AWS\naccounts),
    no sweat on testing DAGs. They stage some data in MinIO (<code>just open minio</code>
    handles the port-forward and opens the browser), then <code>just open airflow</code>
    (their DAGs are hot-reloaded via hostPath mounting), and they can run\nDAGs locally
    until they're satisfied with the results.</p>\n<p>It's taken me about a week of
    split-focused effort (I mentioned Nexus and I've\nbeen co-building and dogfooding
    that at the same time) but I'm proud of that\nlocal setup now. I am a bit shocked
    they've dealt with a brittle, hacky, often\nbroken development workflow for the
    last 4 years or so, but that development I\nsuppose.</p>\n<h2 id=\"the-point\">The
    Point <a class=\"header-anchor\" href=\"#the-point\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This post wasn't meant
    to be me glazing myself for awesome local development\npractices, I am simply
    excited about this new chapter. I love solving problems,\nand I love owning those
    solutions. There's a whole mess of things to address,\nmy mind is buzzing, and
    I feel like God has blessed me with renewed passion\n(again see <a class=\"wikilink\"
    href=\"/im-back-from-the-dead\">im-back-from-the-dead</a>). I've given up some
    pay and some freedom\nto take this role, but I think it'll pay dividends.</p>\n<p>Life
    happens to all of us - this role change affected a lot for me, it's been\nhard
    to digest some of those changes, but the work is good, the development is\nfun,
    the new world of using agents to fly through things you're fluent in is\nexciting,
    and I'm here to help a team that desperately needs it to improve\ntheir lives
    and the work we do for Cat Autonomy.</p>\n<p>I'm still pissed at Caterpillar Executives
    for RTO ruining parts of my life,\nbut in God's sovereignty their idiocy has led
    to non-trivial blessing, so I can\nsay &quot;Praise the Lord&quot;</p>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>New Job - Caterpillar
    Autonomy</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"In [[im-back-from-the-dead]]
    I mentioned my new role that started this year -\nit&#x27;s a return to Caterpillar
    Autonomy. I built some data pipelines and\njunior\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"New Job - Caterpillar Autonomy | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/new-job-caterpillar-autonomy\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"New Job - Caterpillar Autonomy | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"In [[im-back-from-the-dead]] I mentioned my new role that started this
    year -\nit&#x27;s a return to Caterpillar Autonomy. I built some data pipelines
    and\njunior\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\"
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
    mb-4 post-title-large\">New Job - Caterpillar Autonomy</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-01-26\">\n
    \           January 26, 2026\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/work/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #work\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\"
    alt=\"New Job - Caterpillar Autonomy cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">New
    Job - Caterpillar Autonomy</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2026-01-26\">\n            January 26, 2026\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/work/\" class=\"inline-block bg-primary-light text-accent-cool
    text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80 transition-colors
    border border-accent-cool/20 hover-lift\">\n                #work\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>In <a class=\"wikilink\" href=\"/im-back-from-the-dead\">im-back-from-the-dead</a>
    I mentioned my new role that started this year -\nit's a return to Caterpillar
    Autonomy. I built some data pipelines and\njunior-grade infrastructure 5 years
    ago but left over burn-out at the prospect of\na job with smaller scoped work
    and more technical guidance. That was a good\nmove, and in God's sovereignty he's
    brought me back. Now I'm looking at code,\nthankfully not that I wrote, but that
    the guy after me wrote - it accomplished\na job, like my original work did, but
    also like what I built back then -\nthere's better ways today. The amount of things
    in front of me is absolutely\ndaunting, and the people on the team have been seeded
    with a very high opinion\nof me... I don't know how much is valid and how much
    is hype, but I'm gonna try\nto live up to it.</p>\n<p>One way I'm striving to
    do that is to maximize my efficiency with the AI coding\ntools available to me.
    We have Github Copilot and I've picked up a lot over the\ncourse of the last few
    years (and especially more recently) in using agents,\nplanning out work, documenting
    plans for agents to follow, splitting up work\nvia worktrees, etc. I feel pretty
    good about where I'm going and someday I\nmight even release Nexus. Nexus is serving
    as my second-brain at work, the hub\nwhere I collaborate with my fleet of agents
    on the work that must get done.\nDetails to come on this, but the thing that matters
    is that in ironing out\nworkflow I've moved from prompt + chat to really managing
    a long-lived stream\nof work. AI has been changing the world, and there's been
    developer hype for\nyears now. But &quot;make me a cool app, no mistakes&quot;
    isn't going to cut it. Even\n&quot;make an app but generate a plan first&quot;
    isn't going to cut it... Developers\nhave to adopt a higher level role, a systems-oriented
    and architecture-driven\nworldview must become primary in order to keep up. Code-gen
    and syntax writing\nare not what developers were <strong>ever</strong> paid to
    do, although many believed so.\nOur jobs have been to solve problems and deliver
    code that solves the problem.\nThe code is cheap now, but solving problems still
    is a human task.</p>\n<p>In the Autonomy group - there's problems all up and down
    the stack. My focus is\non infrastructure and developer operations - it's become
    my bread and butter\nover the last several years. I'm excited to help the team
    grow, and I'm excited\nto grow personally/technically as I lean into the agentic
    workflow to produce\ncode that I'm actually proud of, that has my name on the
    commit, and that\nsolves real problems.</p>\n<h2 id=\"example---local-development\">Example
    - Local Development <a class=\"header-anchor\" href=\"#example---local-development\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the first things
    I'm tackling is a developer-pain-point of working on\ntheir laptop. I've been
    in this space for years, mostly with python programmer\nwho are writing data science
    code. They don't know about virtual environments,\nchecking $PATH, assuming bad
    state in their terminal session, how to configure\nVS Code, etc. Often they just
    want to write some scripts and somehow test it.\nThe solution I see most often
    is for devs to write code in JupyterLab/Notebooks\nin AWS or some environment
    close to their data - this is fine I guess, but it's\nnot developing good pipelines,
    and it's tedious as hell. In my last job I\nhelped set developers up with workflows
    that allowed them to run their IDE of\nchoice locally (getting all the goodies
    of syntax highlighting, LSP, etc) and a\nCLI that took their code and ran it in
    the cloud, right next to data, in the\nsame way that prod runs. It was a hit.
    After that I introduced some tools to\nhelp them manage python environments -
    we had strict templating requirements in\nour projects, so making tools to automate
    those things wasn't too hard - it's\nmuch easier than trying to make something
    flexible for every use case. The\nopinions made the automation and tooling easy
    to make and distribute.</p>\n<p>Well I'm up against a similar task now, but oh
    so much worse... Larger team,\nlarger environment sprawl, larger infrastructure
    mismanagement, the whole\ngambit. And I'm here for it... Here's the first problem
    I'm addressing - local\ndevelopment for Airflow DAGs that run in an Airflow deployment
    on Kubernetes.\nThe deployment itself is a little odd, Airflow is an orchestrator,
    all the\npipelines run in external AWS Batch jobs - so a DAG hits the Batch API
    to run\nthe code. The design there is actually nice, but how are devs testing
    code?</p>\n<p>Oh that's easy... they SSH into the prod server, which is a 5 year
    old desktop\nTHAT I BUILT WITH A CO-WORKER BEFORE I WAS IN AUTONOMY THE FIRST
    TIME... hold\non, WHAT!? Yes, it's true.. so they SSH into the prod server, run
    some bash\nscripts in their userspace that setup airflow and a few db utilities
    in a\ndocker compose stack, authenticate with AWS themselves from that server,
    and\nthen they run DAGs against real data to test it... I am beyond shook.</p>\n<p>Here's
    what I've put together - a bootstrap process (I like <code>just</code> + PEP 723\npython
    scripts as opposed to bash, but to each their own, and bash of course\nhas its
    place) that spins up a <a href=\"https://kind.sigs.k8s.io/\">kind</a> cluster
    on\ntheir laptop, the process pulls some private images and loads them into the\nkind
    cluster, it installs airflow from a helm chart (the same helm chart we'll\nuse
    in dev and prod... no more docker compose over here, kubectl over there),\nand
    everything just. comes. up. No SSH into ancient server, no touching cloud\ninfra
    (they get MinIO and a DB container to emulate S3 and RDS in our AWS\naccounts),
    no sweat on testing DAGs. They stage some data in MinIO (<code>just open minio</code>
    handles the port-forward and opens the browser), then <code>just open airflow</code>
    (their DAGs are hot-reloaded via hostPath mounting), and they can run\nDAGs locally
    until they're satisfied with the results.</p>\n<p>It's taken me about a week of
    split-focused effort (I mentioned Nexus and I've\nbeen co-building and dogfooding
    that at the same time) but I'm proud of that\nlocal setup now. I am a bit shocked
    they've dealt with a brittle, hacky, often\nbroken development workflow for the
    last 4 years or so, but that development I\nsuppose.</p>\n<h2 id=\"the-point\">The
    Point <a class=\"header-anchor\" href=\"#the-point\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This post wasn't meant
    to be me glazing myself for awesome local development\npractices, I am simply
    excited about this new chapter. I love solving problems,\nand I love owning those
    solutions. There's a whole mess of things to address,\nmy mind is buzzing, and
    I feel like God has blessed me with renewed passion\n(again see <a class=\"wikilink\"
    href=\"/im-back-from-the-dead\">im-back-from-the-dead</a>). I've given up some
    pay and some freedom\nto take this role, but I think it'll pay dividends.</p>\n<p>Life
    happens to all of us - this role change affected a lot for me, it's been\nhard
    to digest some of those changes, but the work is good, the development is\nfun,
    the new world of using agents to fly through things you're fluent in is\nexciting,
    and I'm here to help a team that desperately needs it to improve\ntheir lives
    and the work we do for Cat Autonomy.</p>\n<p>I'm still pissed at Caterpillar Executives
    for RTO ruining parts of my life,\nbut in God's sovereignty their idiocy has led
    to non-trivial blessing, so I can\nsay &quot;Praise the Lord&quot;</p>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>New Job
    - Caterpillar Autonomy</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"In [[im-back-from-the-dead]] I mentioned my new role that started this
    year -\nit&#x27;s a return to Caterpillar Autonomy. I built some data pipelines
    and\njunior\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"New Job - Caterpillar Autonomy | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/new-job-caterpillar-autonomy\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"New Job - Caterpillar Autonomy | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"In [[im-back-from-the-dead]] I mentioned my new role that started this
    year -\nit&#x27;s a return to Caterpillar Autonomy. I built some data pipelines
    and\njunior\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\"
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
    \           <span class=\"site-terminal__dir\">~/new-job-caterpillar-autonomy</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>In <a
    class=\"wikilink\" href=\"/im-back-from-the-dead\">im-back-from-the-dead</a> I
    mentioned my new role that started this year -\nit's a return to Caterpillar Autonomy.
    I built some data pipelines and\njunior-grade infrastructure 5 years ago but left
    over burn-out at the prospect of\na job with smaller scoped work and more technical
    guidance. That was a good\nmove, and in God's sovereignty he's brought me back.
    Now I'm looking at code,\nthankfully not that I wrote, but that the guy after
    me wrote - it accomplished\na job, like my original work did, but also like what
    I built back then -\nthere's better ways today. The amount of things in front
    of me is absolutely\ndaunting, and the people on the team have been seeded with
    a very high opinion\nof me... I don't know how much is valid and how much is hype,
    but I'm gonna try\nto live up to it.</p>\n<p>One way I'm striving to do that is
    to maximize my efficiency with the AI coding\ntools available to me. We have Github
    Copilot and I've picked up a lot over the\ncourse of the last few years (and especially
    more recently) in using agents,\nplanning out work, documenting plans for agents
    to follow, splitting up work\nvia worktrees, etc. I feel pretty good about where
    I'm going and someday I\nmight even release Nexus. Nexus is serving as my second-brain
    at work, the hub\nwhere I collaborate with my fleet of agents on the work that
    must get done.\nDetails to come on this, but the thing that matters is that in
    ironing out\nworkflow I've moved from prompt + chat to really managing a long-lived
    stream\nof work. AI has been changing the world, and there's been developer hype
    for\nyears now. But &quot;make me a cool app, no mistakes&quot; isn't going to
    cut it. Even\n&quot;make an app but generate a plan first&quot; isn't going to
    cut it... Developers\nhave to adopt a higher level role, a systems-oriented and
    architecture-driven\nworldview must become primary in order to keep up. Code-gen
    and syntax writing\nare not what developers were <strong>ever</strong> paid to
    do, although many believed so.\nOur jobs have been to solve problems and deliver
    code that solves the problem.\nThe code is cheap now, but solving problems still
    is a human task.</p>\n<p>In the Autonomy group - there's problems all up and down
    the stack. My focus is\non infrastructure and developer operations - it's become
    my bread and butter\nover the last several years. I'm excited to help the team
    grow, and I'm excited\nto grow personally/technically as I lean into the agentic
    workflow to produce\ncode that I'm actually proud of, that has my name on the
    commit, and that\nsolves real problems.</p>\n<h2 id=\"example---local-development\">Example
    - Local Development <a class=\"header-anchor\" href=\"#example---local-development\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the first things
    I'm tackling is a developer-pain-point of working on\ntheir laptop. I've been
    in this space for years, mostly with python programmer\nwho are writing data science
    code. They don't know about virtual environments,\nchecking $PATH, assuming bad
    state in their terminal session, how to configure\nVS Code, etc. Often they just
    want to write some scripts and somehow test it.\nThe solution I see most often
    is for devs to write code in JupyterLab/Notebooks\nin AWS or some environment
    close to their data - this is fine I guess, but it's\nnot developing good pipelines,
    and it's tedious as hell. In my last job I\nhelped set developers up with workflows
    that allowed them to run their IDE of\nchoice locally (getting all the goodies
    of syntax highlighting, LSP, etc) and a\nCLI that took their code and ran it in
    the cloud, right next to data, in the\nsame way that prod runs. It was a hit.
    After that I introduced some tools to\nhelp them manage python environments -
    we had strict templating requirements in\nour projects, so making tools to automate
    those things wasn't too hard - it's\nmuch easier than trying to make something
    flexible for every use case. The\nopinions made the automation and tooling easy
    to make and distribute.</p>\n<p>Well I'm up against a similar task now, but oh
    so much worse... Larger team,\nlarger environment sprawl, larger infrastructure
    mismanagement, the whole\ngambit. And I'm here for it... Here's the first problem
    I'm addressing - local\ndevelopment for Airflow DAGs that run in an Airflow deployment
    on Kubernetes.\nThe deployment itself is a little odd, Airflow is an orchestrator,
    all the\npipelines run in external AWS Batch jobs - so a DAG hits the Batch API
    to run\nthe code. The design there is actually nice, but how are devs testing
    code?</p>\n<p>Oh that's easy... they SSH into the prod server, which is a 5 year
    old desktop\nTHAT I BUILT WITH A CO-WORKER BEFORE I WAS IN AUTONOMY THE FIRST
    TIME... hold\non, WHAT!? Yes, it's true.. so they SSH into the prod server, run
    some bash\nscripts in their userspace that setup airflow and a few db utilities
    in a\ndocker compose stack, authenticate with AWS themselves from that server,
    and\nthen they run DAGs against real data to test it... I am beyond shook.</p>\n<p>Here's
    what I've put together - a bootstrap process (I like <code>just</code> + PEP 723\npython
    scripts as opposed to bash, but to each their own, and bash of course\nhas its
    place) that spins up a <a href=\"https://kind.sigs.k8s.io/\">kind</a> cluster
    on\ntheir laptop, the process pulls some private images and loads them into the\nkind
    cluster, it installs airflow from a helm chart (the same helm chart we'll\nuse
    in dev and prod... no more docker compose over here, kubectl over there),\nand
    everything just. comes. up. No SSH into ancient server, no touching cloud\ninfra
    (they get MinIO and a DB container to emulate S3 and RDS in our AWS\naccounts),
    no sweat on testing DAGs. They stage some data in MinIO (<code>just open minio</code>
    handles the port-forward and opens the browser), then <code>just open airflow</code>
    (their DAGs are hot-reloaded via hostPath mounting), and they can run\nDAGs locally
    until they're satisfied with the results.</p>\n<p>It's taken me about a week of
    split-focused effort (I mentioned Nexus and I've\nbeen co-building and dogfooding
    that at the same time) but I'm proud of that\nlocal setup now. I am a bit shocked
    they've dealt with a brittle, hacky, often\nbroken development workflow for the
    last 4 years or so, but that development I\nsuppose.</p>\n<h2 id=\"the-point\">The
    Point <a class=\"header-anchor\" href=\"#the-point\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>This post wasn't meant
    to be me glazing myself for awesome local development\npractices, I am simply
    excited about this new chapter. I love solving problems,\nand I love owning those
    solutions. There's a whole mess of things to address,\nmy mind is buzzing, and
    I feel like God has blessed me with renewed passion\n(again see <a class=\"wikilink\"
    href=\"/im-back-from-the-dead\">im-back-from-the-dead</a>). I've given up some
    pay and some freedom\nto take this role, but I think it'll pay dividends.</p>\n<p>Life
    happens to all of us - this role change affected a lot for me, it's been\nhard
    to digest some of those changes, but the work is good, the development is\nfun,
    the new world of using agents to fly through things you're fluent in is\nexciting,
    and I'm here to help a team that desperately needs it to improve\ntheir lives
    and the work we do for Cat Autonomy.</p>\n<p>I'm still pissed at Caterpillar Executives
    for RTO ruining parts of my life,\nbut in God's sovereignty their idiocy has led
    to non-trivial blessing, so I can\nsay &quot;Praise the Lord&quot;</p>\n\n        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2026-01-26 10:24:54\ntemplateKey: blog-post\ntitle: New Job
    - Caterpillar Autonomy\npublished: True\ntags:\n  - work\n  - tech\ncover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png\n---\n\nIn
    [[im-back-from-the-dead]] I mentioned my new role that started this year -\nit's
    a return to Caterpillar Autonomy. I built some data pipelines and\njunior-grade
    infrastructure 5 years ago but left over burn-out at the prospect of\na job with
    smaller scoped work and more technical guidance. That was a good\nmove, and in
    God's sovereignty he's brought me back. Now I'm looking at code,\nthankfully not
    that I wrote, but that the guy after me wrote - it accomplished\na job, like my
    original work did, but also like what I built back then -\nthere's better ways
    today. The amount of things in front of me is absolutely\ndaunting, and the people
    on the team have been seeded with a very high opinion\nof me... I don't know how
    much is valid and how much is hype, but I'm gonna try\nto live up to it.\n\nOne
    way I'm striving to do that is to maximize my efficiency with the AI coding\ntools
    available to me. We have Github Copilot and I've picked up a lot over the\ncourse
    of the last few years (and especially more recently) in using agents,\nplanning
    out work, documenting plans for agents to follow, splitting up work\nvia worktrees,
    etc. I feel pretty good about where I'm going and someday I\nmight even release
    Nexus. Nexus is serving as my second-brain at work, the hub\nwhere I collaborate
    with my fleet of agents on the work that must get done.\nDetails to come on this,
    but the thing that matters is that in ironing out\nworkflow I've moved from prompt
    + chat to really managing a long-lived stream\nof work. AI has been changing the
    world, and there's been developer hype for\nyears now. But \"make me a cool app,
    no mistakes\" isn't going to cut it. Even\n\"make an app but generate a plan first\"
    isn't going to cut it... Developers\nhave to adopt a higher level role, a systems-oriented
    and architecture-driven\nworldview must become primary in order to keep up. Code-gen
    and syntax writing\nare not what developers were **ever** paid to do, although
    many believed so.\nOur jobs have been to solve problems and deliver code that
    solves the problem.\nThe code is cheap now, but solving problems still is a human
    task.\n\nIn the Autonomy group - there's problems all up and down the stack. My
    focus is\non infrastructure and developer operations - it's become my bread and
    butter\nover the last several years. I'm excited to help the team grow, and I'm
    excited\nto grow personally/technically as I lean into the agentic workflow to
    produce\ncode that I'm actually proud of, that has my name on the commit, and
    that\nsolves real problems.\n\n## Example - Local Development\n\nOne of the first
    things I'm tackling is a developer-pain-point of working on\ntheir laptop. I've
    been in this space for years, mostly with python programmer\nwho are writing data
    science code. They don't know about virtual environments,\nchecking $PATH, assuming
    bad state in their terminal session, how to configure\nVS Code, etc. Often they
    just want to write some scripts and somehow test it.\nThe solution I see most
    often is for devs to write code in JupyterLab/Notebooks\nin AWS or some environment
    close to their data - this is fine I guess, but it's\nnot developing good pipelines,
    and it's tedious as hell. In my last job I\nhelped set developers up with workflows
    that allowed them to run their IDE of\nchoice locally (getting all the goodies
    of syntax highlighting, LSP, etc) and a\nCLI that took their code and ran it in
    the cloud, right next to data, in the\nsame way that prod runs. It was a hit.
    After that I introduced some tools to\nhelp them manage python environments -
    we had strict templating requirements in\nour projects, so making tools to automate
    those things wasn't too hard - it's\nmuch easier than trying to make something
    flexible for every use case. The\nopinions made the automation and tooling easy
    to make and distribute.\n\nWell I'm up against a similar task now, but oh so much
    worse... Larger team,\nlarger environment sprawl, larger infrastructure mismanagement,
    the whole\ngambit. And I'm here for it... Here's the first problem I'm addressing
    - local\ndevelopment for Airflow DAGs that run in an Airflow deployment on Kubernetes.\nThe
    deployment itself is a little odd, Airflow is an orchestrator, all the\npipelines
    run in external AWS Batch jobs - so a DAG hits the Batch API to run\nthe code.
    The design there is actually nice, but how are devs testing code?\n\nOh that's
    easy... they SSH into the prod server, which is a 5 year old desktop\nTHAT I BUILT
    WITH A CO-WORKER BEFORE I WAS IN AUTONOMY THE FIRST TIME... hold\non, WHAT!? Yes,
    it's true.. so they SSH into the prod server, run some bash\nscripts in their
    userspace that setup airflow and a few db utilities in a\ndocker compose stack,
    authenticate with AWS themselves from that server, and\nthen they run DAGs against
    real data to test it... I am beyond shook.\n\nHere's what I've put together -
    a bootstrap process (I like `just` + PEP 723\npython scripts as opposed to bash,
    but to each their own, and bash of course\nhas its place) that spins up a [kind](https://kind.sigs.k8s.io/)
    cluster on\ntheir laptop, the process pulls some private images and loads them
    into the\nkind cluster, it installs airflow from a helm chart (the same helm chart
    we'll\nuse in dev and prod... no more docker compose over here, kubectl over there),\nand
    everything just. comes. up. No SSH into ancient server, no touching cloud\ninfra
    (they get MinIO and a DB container to emulate S3 and RDS in our AWS\naccounts),
    no sweat on testing DAGs. They stage some data in MinIO (`just open\nminio` handles
    the port-forward and opens the browser), then `just open\nairflow` (their DAGs
    are hot-reloaded via hostPath mounting), and they can run\nDAGs locally until
    they're satisfied with the results.\n\nIt's taken me about a week of split-focused
    effort (I mentioned Nexus and I've\nbeen co-building and dogfooding that at the
    same time) but I'm proud of that\nlocal setup now. I am a bit shocked they've
    dealt with a brittle, hacky, often\nbroken development workflow for the last 4
    years or so, but that development I\nsuppose.\n\n## The Point\n\nThis post wasn't
    meant to be me glazing myself for awesome local development\npractices, I am simply
    excited about this new chapter. I love solving problems,\nand I love owning those
    solutions. There's a whole mess of things to address,\nmy mind is buzzing, and
    I feel like God has blessed me with renewed passion\n(again see [[im-back-from-the-dead]]).
    I've given up some pay and some freedom\nto take this role, but I think it'll
    pay dividends.\n\nLife happens to all of us - this role change affected a lot
    for me, it's been\nhard to digest some of those changes, but the work is good,
    the development is\nfun, the new world of using agents to fly through things you're
    fluent in is\nexciting, and I'm here to help a team that desperately needs it
    to improve\ntheir lives and the work we do for Cat Autonomy.\n\nI'm still pissed
    at Caterpillar Executives for RTO ruining parts of my life,\nbut in God's sovereignty
    their idiocy has led to non-trivial blessing, so I can\nsay \"Praise the Lord\"\n"
published: true
slug: new-job-caterpillar-autonomy
title: New Job - Caterpillar Autonomy


---

In [[im-back-from-the-dead]] I mentioned my new role that started this year -
it's a return to Caterpillar Autonomy. I built some data pipelines and
junior-grade infrastructure 5 years ago but left over burn-out at the prospect of
a job with smaller scoped work and more technical guidance. That was a good
move, and in God's sovereignty he's brought me back. Now I'm looking at code,
thankfully not that I wrote, but that the guy after me wrote - it accomplished
a job, like my original work did, but also like what I built back then -
there's better ways today. The amount of things in front of me is absolutely
daunting, and the people on the team have been seeded with a very high opinion
of me... I don't know how much is valid and how much is hype, but I'm gonna try
to live up to it.

One way I'm striving to do that is to maximize my efficiency with the AI coding
tools available to me. We have Github Copilot and I've picked up a lot over the
course of the last few years (and especially more recently) in using agents,
planning out work, documenting plans for agents to follow, splitting up work
via worktrees, etc. I feel pretty good about where I'm going and someday I
might even release Nexus. Nexus is serving as my second-brain at work, the hub
where I collaborate with my fleet of agents on the work that must get done.
Details to come on this, but the thing that matters is that in ironing out
workflow I've moved from prompt + chat to really managing a long-lived stream
of work. AI has been changing the world, and there's been developer hype for
years now. But "make me a cool app, no mistakes" isn't going to cut it. Even
"make an app but generate a plan first" isn't going to cut it... Developers
have to adopt a higher level role, a systems-oriented and architecture-driven
worldview must become primary in order to keep up. Code-gen and syntax writing
are not what developers were **ever** paid to do, although many believed so.
Our jobs have been to solve problems and deliver code that solves the problem.
The code is cheap now, but solving problems still is a human task.

In the Autonomy group - there's problems all up and down the stack. My focus is
on infrastructure and developer operations - it's become my bread and butter
over the last several years. I'm excited to help the team grow, and I'm excited
to grow personally/technically as I lean into the agentic workflow to produce
code that I'm actually proud of, that has my name on the commit, and that
solves real problems.

## Example - Local Development

One of the first things I'm tackling is a developer-pain-point of working on
their laptop. I've been in this space for years, mostly with python programmer
who are writing data science code. They don't know about virtual environments,
checking $PATH, assuming bad state in their terminal session, how to configure
VS Code, etc. Often they just want to write some scripts and somehow test it.
The solution I see most often is for devs to write code in JupyterLab/Notebooks
in AWS or some environment close to their data - this is fine I guess, but it's
not developing good pipelines, and it's tedious as hell. In my last job I
helped set developers up with workflows that allowed them to run their IDE of
choice locally (getting all the goodies of syntax highlighting, LSP, etc) and a
CLI that took their code and ran it in the cloud, right next to data, in the
same way that prod runs. It was a hit. After that I introduced some tools to
help them manage python environments - we had strict templating requirements in
our projects, so making tools to automate those things wasn't too hard - it's
much easier than trying to make something flexible for every use case. The
opinions made the automation and tooling easy to make and distribute.

Well I'm up against a similar task now, but oh so much worse... Larger team,
larger environment sprawl, larger infrastructure mismanagement, the whole
gambit. And I'm here for it... Here's the first problem I'm addressing - local
development for Airflow DAGs that run in an Airflow deployment on Kubernetes.
The deployment itself is a little odd, Airflow is an orchestrator, all the
pipelines run in external AWS Batch jobs - so a DAG hits the Batch API to run
the code. The design there is actually nice, but how are devs testing code?

Oh that's easy... they SSH into the prod server, which is a 5 year old desktop
THAT I BUILT WITH A CO-WORKER BEFORE I WAS IN AUTONOMY THE FIRST TIME... hold
on, WHAT!? Yes, it's true.. so they SSH into the prod server, run some bash
scripts in their userspace that setup airflow and a few db utilities in a
docker compose stack, authenticate with AWS themselves from that server, and
then they run DAGs against real data to test it... I am beyond shook.

Here's what I've put together - a bootstrap process (I like `just` + PEP 723
python scripts as opposed to bash, but to each their own, and bash of course
has its place) that spins up a [kind](https://kind.sigs.k8s.io/) cluster on
their laptop, the process pulls some private images and loads them into the
kind cluster, it installs airflow from a helm chart (the same helm chart we'll
use in dev and prod... no more docker compose over here, kubectl over there),
and everything just. comes. up. No SSH into ancient server, no touching cloud
infra (they get MinIO and a DB container to emulate S3 and RDS in our AWS
accounts), no sweat on testing DAGs. They stage some data in MinIO (`just open
minio` handles the port-forward and opens the browser), then `just open
airflow` (their DAGs are hot-reloaded via hostPath mounting), and they can run
DAGs locally until they're satisfied with the results.

It's taken me about a week of split-focused effort (I mentioned Nexus and I've
been co-building and dogfooding that at the same time) but I'm proud of that
local setup now. I am a bit shocked they've dealt with a brittle, hacky, often
broken development workflow for the last 4 years or so, but that development I
suppose.

## The Point

This post wasn't meant to be me glazing myself for awesome local development
practices, I am simply excited about this new chapter. I love solving problems,
and I love owning those solutions. There's a whole mess of things to address,
my mind is buzzing, and I feel like God has blessed me with renewed passion
(again see [[im-back-from-the-dead]]). I've given up some pay and some freedom
to take this role, but I think it'll pay dividends.

Life happens to all of us - this role change affected a lot for me, it's been
hard to digest some of those changes, but the work is good, the development is
fun, the new world of using agents to fly through things you're fluent in is
exciting, and I'm here to help a team that desperately needs it to improve
their lives and the work we do for Cat Autonomy.

I'm still pissed at Caterpillar Executives for RTO ruining parts of my life,
but in God's sovereignty their idiocy has led to non-trivial blessing, so I can
say "Praise the Lord"