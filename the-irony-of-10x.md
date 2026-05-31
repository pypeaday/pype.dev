---
content: "## Opener\n\nAgentic coding has been an exciting change to me over the last
  couple of months\nspecifically. I've been using AI tools for a few years now but
  something really\nshifted with Opus 4.5 as well as the tools/harnesses getting better
  and more\nuseful around the same time. I've been influenced by people like Simon
  Willison\nand Steve Yegge who have been on the forefront of agentic coding and [vibe\nengineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/)
  since the\ndawn of ChatGPT and in my small circles of work I'm definitely on the
  bloodiest\nbleeding edge of the adoption of these practices. Are they the future?
  I don't\nknow - I tried to maintain a skeptical posture but until the bubble pops
  it's\nlooking like this is at least a direction the future of my line of work is\ngoing.\n\n!!!
  danger \"\"\n\n    The tough part is mixing the new world of agentic coding with\n
  \   developers on wildly different points in the spectrum of adoption and maturity.\n\nHere's
  a short anecdote about what I mean...\n\nIn a new project that I'm on, I've refactored/reimplemented
  a lot of legacy\ncode, producing about 140k lines of code, configuration, and\ndocs
  in about 2 months. It's an insane amount of \"product\" and I've done it\nentirely
  with agents. But I didn't do it with a handful of vanilla chat\nsessions like \"Hey
  Copilot, reimplement this API, no mistakes\". I've been building\nout my own process
  for using LLMs effectively. I have no actual idea besides my\nown experience if
  what I'm building is useful, but it feels pretty good -\nagents for planning, building,
  reviewing, testing, etc. My \"harness\" includes\nspecialized agents and opinionated
  development workflows\nto try to ensure that code is never one-shotted into production.\n\nThe
  catch though is that I'm working with a handful of developers and they are not\nearly-adopters
  or aggressive experimenters with these new agentic tools. Most\nof them are still
  in Steve Yegge's stage 2 or 3 of AI coding as he's outlined\n[in this medium\narticle
  introducing\nGasTown](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04).
  They\nopen a chat session, and say yes or no to Opus. I've been in-between stages\n6
  and 7 for a while now - managing multiple agentic sessions that themselves\nrun
  specialized subagents primarily for context management, although I don't\nfeel quite
  ready for full blown stage 8 (agents running agents running agents).\nSo this isn't
  me saying that I'm\n\"better\" than the guys I'm working with, just the project
  we're on\ntogether is now being touched by people on wildly different ends of the
  agentic\ncoding spectrum, and the project itself is an experiment to me of living
  in the \"New World\".\n\nFinally the anecdote - I'm getting PRs from guys in stages
  2 and 3,\nthousands of lines of code and config, that I know they are not necessarily\nexperts
  in, but they're producing that code with fairly vanilla practices. How\ndo I verify
  it? I know my own prompts, I know what agents generated my code, I know\nthe direction
  and prodding I gave as they're building, but all\nI know in a PR review from someone
  else is the diff - not how they tested it\n(unless of course there's tests, and
  there must be, but tests are only as good\nas the tests are...), not the steering
  they gave, not the manual UAT validation\nthey did, or even the full intent... And
  ultimately I own the code they merge\nbecause chances are I outlast their contract
  with the team. It's kind of a\nscary thing to review and accept... do I trust my\nagentic
  practices to validate their work? Cause I certainly don't trust myself\nto validate
  it perfectly.\n\n!!! note \"a note about contractors\"\n\n    I'm not implying anything
  about anyone who works contract, I think the facts is that contractors are typically
  dis-incentivized to really \"own\" something - an unfortunate consequence of the
  world.\n\n## This is about me, not everyone\n\nI want to make sure to reiterate
  the context of this post and my thoughts -\nit's really about me. I'm not saying
  anything here is true for anyone else, I'm\nnot making predictions about tomorrow,
  and I'm not a prominent FOSS developer or a\nhigh-profile ex-FAANG engineer. I'm
  not talking about every project under the sun.\nI work at a big company, not a fast-paced
  startup. I work on internal tooling,\nnothing that should even be seen outside our
  network. I'm also a self-taught\ndeveloper, not a trained software engineer.\n\nAs
  far as AI goes, lately I'm mostly all in on Github Copilot\nCLI with a sprinkling
  of Opencode. I'm not using Claude Code or Codex which\nseem to have their own communities
  around plugins and usage.\n\nAnd since we're so focused on me right now, the important
  thing to keep as the\nbackdrop for this post is my temperament and make-up. I'm
  definitely made a\ncertain kind of way, not different than every single person necessarily,
  but\ndifferent enough, from enough people, to not blend in with the 9-5 guy who
  can\nlog out and not think about work until the morning (I'm not saying that's a\nstrength
  either, my boundary problems are for another time).\n\nI feel an aggressive burden
  to solve problems and own those solutions, call it\nwhite-knighting or a savior
  complex if you want, but I've got enough of a\nreputation at Caterpillar now (and
  anywhere else I've worked) to become a go-to\nperson for more than I think is necessarily
  appropriate. And with that burden\nI'll bring results - if a problem hooks into
  my brain it. will. be. solved. I\nprobably won't do the best most clean-code solution
  right out of the gate, but\nI'll do whatever I can to find a solution.\n\n## Who
  I was before agents\n\nThat is who I was before agents made code easy to produce.
  My first boss at\nCaterpillar used the phrase \"tenacious learner\" to describe
  me in several\nreviews. I kind of rejected the description because I basically refused
  to\nbelieve that I was really any different, any harder of a worker, than my peers.\n\nBut
  with almost a decade of experience in the corporate world, and some adult\nperspective
  on my life, I think it's accurate... I am a harder worker, to my\ndetriment sometimes,
  than a fair number of people I've worked with\\*\\*.\n\nI'm not brilliant but I
  can focus for a long time in the right circumstances.\nThe gift of perseverance
  (or the curse of not being able to let something go,\ndepending on how you look
  at it) has led to blessing in my life in both reward\nand skill.\n\n!!! note \"\\*\\*\"\n\n
  \   There's nothing wrong with it either, Cat's somewhat noticed that work in my
  EOY reviews and I'm certainly not against \"just doing your job\".\n\nAnd then AI
  came along and with another set of the right circumstances\ncatalyzed a new way
  to work.\n\n## Leaning into \"Agentic Engineering\"\n\nI jumped onto experimenting
  with AI coding tools as soon as they became\navailable, but mostly I just tried
  vibe coding rather than using tools for real\nengineering work. I vibed up an API
  at one of my jobs that went into production\nway too early, with far too little
  validation, and it was scary to support it\nfrom then on out. I also did the meme,
  vibe-coded a TODO app, and threw that\npuppy into the internet without locking down
  my API endpoints... That was\nbefore agents were quite as useful as they can be\nnow,
  but that experience along with a handful of other stepping stones (like\nlearning
  some real actual fundamentals about security) began to\ngive me confidence in using
  the AI as a tool, like my IDE is a tool, for\nproducing **solutions** that take
  the form of code.\n\n!!! note \"\"\n\n    As one-shot apps got better and better,
  and as I learned about scoping work\n    more appropriately for agentic tools my
  confidence in them grew.\n\nThere's quite a difference between \"Claude make me
  a todo app, no mistakes\" and\nscoping out a solution in natural language, with
  some technical guardrails, and\nhaving agents tackle the implementation methodically.\n\n##
  What actually changed\n\nWhat's actually changed for me is quite a lot... I haven't
  opened my IDE to\nseriously write code for months now. I've oscillated between Opencode
  and\nCopilot CLI, leaning moreso into Copilot since it's an approved tool at work\nand
  as of mid-February is quite good. Mentally I'm approaching problems with a\nlittle
  more thought on the front-end than before because prior to agents I\nwould think
  as I implemented. At the scale of work that I do, this was really\nfine - working
  on CLI utilities to solve simple problems, developing an\niterative testing cycle
  for each problem that allowed me to move fast, and once\nI found a groove I was
  cooking. But now I don't even need to find it, I open\nOpencode or Copilot CLI with
  my Planner agent, describe what I want to happen and have\nOpus or GPT scope out
  a plan for me. Usually there's some back and forth on\nfeature scoping, then I review
  a markdown file it produces, and once it looks\ndecent enough to me I say \"go\"
  and it goes.\n\nThat works a lot better than I even care to admit because at the
  same time as\nI've been leaning harder into agents, I've been building my own harness
  of\nsorts - not a replacement for Copilot CLI or a competitor to Opencode, but\nmoreso
  an opinionated workflow spine that I force agents into to give strict\ngates to
  the SDLC (software development lifecycle).\n\n!!! warning \"Problem Solving Workflows\"\n\n
  \   Plan and implement is fine for a lot of things, and I do think it's only getting
  better. My harness,\n    mentioned a few times around here before, called Nexus,
  is a set of agents and\n    rules that I want the code I'll be responsible for to
  go through before it\n    lands in production. That cycle isn't too complex, and
  there's only about\n    10,000 similar tools to Nexus on Github trending right now.
  I've thought about dropping my idea and picking up\n    something more popular,
  like\n    [superpowers](https://www.github.com/obra/superpowers) but at the moment
  I'm\n    continuing to develop on and lean into my own idea here.\n\n!!! note \"Mini
  post on Nexus\"\n\n    I keep saying a blog post is coming, but the high level of
  Nexus is that it's a task\n    tracker with a CLI that agents use to advance a ticket
  through a plan -> build\n    -> test -> review -> verify -> merge lifecycle that
  is almost exactly how I\n    would otherwise have solved a problem by hand. I think
  it needs work, I need to\n    be harder on TDD methodlogies with agents, and work
  on verification gating a\n    bit more (shoutout to [showboat](https://github.com/simonw/showboat)
  by Simon\n    Willison) but overall it's a system of thinking that I already participate
  in\n    so I'm doing my best to farm out specific parts of my workflow to agents
  rather\n    than trying to one-shot enterprise problems and solutions.\n\n!!! danger
  \"Who's doing the thinking?\"\n\n    I've noticed that as I've developed Nexus out
  though, I lean on the agents for\n    more and more of my own thinking, and am trusting
  my problem solving\n    **process** moreso than my actual problem solving abilities.\n\n##
  Hidden costs\n\nThe cost of this increase in speed is a lack of familiarity - and
  the fallout\nof lack of familiarity is hard to express. There's also many facets
  to it.\nFor me, the first facet is that Nexus helps me move fast, but as I've leaned\ninto
  it for more and more of the planning, I'm less and less familiar with the\nstate
  of the code. I find myself asking my reviewer agents in fresh sessions\noften to
  explain it to me, and thankfully they're usually consistent, but\nnonetheless I'm
  still not intimately familiar with the code. And on Nexus it's\nnot a big deal,
  that's low stakes, it's just me and my workflow.\n\nI'm using Nexus + Copilot at
  work and that feels like higher\nstakes... I have my agents explain the status of
  our project and although they're\nalso somewhat consistent the thing that's scary
  is that other people are\nworking on that repo with me, and that's where another
  layer of complexity\nmanifests itself. If it's just me and my [[clankers]], let's
  go all day long,\nrebuild, ask questions, etc... but I have other developers I rub
  shoulders with\nnow, and if they ask me a question what am I going to say? \"Hold
  on, let me prompt\nmy agent for you\" - it's LMGTFY on steroids. And the burden
  becomes if I\nfeel like I can own and support what those other developers push into
  the repo.\n\n## Murky responsibility boundaries\n\nWhy do I own their work? Well
  for the third time, this post is pretty\nself-centered and all about me, and my
  situation is that the other developers I\nwork with presently are all contractors.
  Their work agreement with Cat could\nend at any second, for practically any reason.
  The incentive structure isn't\nthere for these guys who technically work for an
  agency... Their bonuses aren't\nbigger (or even exist) if Cat performs well, there's
  no extra vacation days in\nit for em (aye, contractors don't get vacation days anyways),
  and not that it's\na problem, moreso just the nature of the world we're in - but
  they're basically\nmercenaries out to the highest bidder and I happen to know of
  **multiple times\nwhere Cat lost a good person to a higher bidder**.\n\nSo this
  isn't really me trying to be negative about contractors at all, I'm\nhere for a
  pay-check as well but Cat at least gives me SOME incentive to work\nhard with the
  goal of compensation regardless of how altruistic I feel in my\nown circumstances.\n\n!!!
  note \"Incentive\"\n\n    Better ratings mean marginally better end-of-year salary
  increases, and I've received some other awards that certainly give me pause about
  jumping ship to another long-term place even when things can be crazy at Cat.\n\nIt's
  more than just the contrator-ownership dilema, I've dug myself quite a\nhole over
  the last 8-10 years, gaining a reputation that I think many would\nappreciate, but
  for me only lately increases the stress. I don't need to parrot\nevery accolade
  I've ever received, that's not the point, but to make the point\nas clear as I can
  - I have a lot of respect from quite a few people at\nCaterpillar. I'm blessed to
  have that reputation, and it's not like I haven't\nworked hard for it - but people
  talk about me in a way so flattering I feel\nlike the main character in a fictional
  story sometimes.\n\nIn a fictional story I can check out the ending, hit up spark
  notes, or ask AI\nhow it ends... but there isn't an \"end\" in my real world scenario,
  there's only\ntomorrow and I feel the pressure of not knowing what tomorrow holds
  now more\nthan ever.\n\n!!! danger \"\"\n\n    Being noticed is starting to feel
  more costly than rewarding...\n\n## Financial irony\n\nWhat's the cost? It's hard
  to get specific without writing a novel but here's\nthe TLDR - because I've been
  pretty good at what I do I've been able to do this\ntype of work outside my normal
  9-5 responsibilities and with that extra work\nhas been some pretty great financial
  benefits. However with Cat changes,\nresponsibility increases, and now owning code
  that others (and their clankers)\nwrite, the extra time I gained for myself is eaten-up
  and has been reclaimed by\nthe mega-corp... \"Exceeding expectations\" every year
  just meant the bar is\nraised, the expectations are higher, the time-commitment
  requirement is higher,\nand as I've had to meet the requirements of both the new
  world and the curse of\nbeing noticed, I've lost the time for the extra work...
  For years I've realized\nthe benefit of my own skills and drive, but the irony of
  agents (and a handful\nof other things) is that with the dramatic increase in expectations,
  not only\non me but on those I work with and therefore their output, I don't get
  to\nrealize the benefits of my own gifts anymore.\n\n## Meaning and fatigue\n\nI
  feel very torn because the work I've been called into with Cat is good, I\nsaid
  in [[cat-autonomy-2-0]] that autonomy will save people's lives. I love\ngetting
  to participate in that mission, it's the primary reason I didn't jump\nship to try
  to maintain the levels, and type, of work I was doing before... But\nin a few short
  months the mission is being drowned out by expectations and\nrequirements that are
  so high I'm losing the grip on my own life.\n\n## Open questions\n\nThat leads me
  to questions that I can't answer, the question I ask daily now of\n\"What about
  tomorrow?\". What will agents do for us tomorrow, what problems will\nbe solved,
  what bugs will I create (by agents of course because I've never\nwritten a bug by
  hand in my whole life \\s). If I stopped using agents would\npeople still be impressed?
  Would it even matter?\n\n## Fin\n\nI'm certainly not anti-AI, it's typing all my
  code. I'm not anti-collaboration,\nalthough I do wish I could work alone with just
  my clanker-army to worry about.\nI'm not sure what I am anymore though... AI has
  changed how I work, what I work\non, and who I work with... Everything has changed
  in such a short period of\ntime and like the ending of this post, it's pretty jarring.\n\n!!!
  danger \"\"\n\n    Death comes to us all - James Acaster.\n\nThanks for reading."
date: 2026-03-26
description: 'Opener Agentic coding has been an exciting change to me over the last
  couple of months

  specifically. I&#x27;ve been using AI tools for a few years now but somet'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>The Irony of 10x</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Opener Agentic coding has been an exciting
    change to me over the last couple of months\nspecifically. I&#x27;ve been using
    AI tools for a few years now but somet\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"The Irony of 10x | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/the-irony-of-10x\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"The Irony of 10x | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Opener Agentic coding has been an exciting change to me over the last
    couple of months\nspecifically. I&#x27;ve been using AI tools for a few years
    now but somet\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\"
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
    \           <span class=\"site-terminal__dir\">~/the-irony-of-10x</span>\n        </div>\n
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
    class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n        <div
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\"
    alt=\"The Irony of 10x cover image\">\n        </div>\n    </figure>\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">The Irony of
    10x</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2026-03-26\">\n            March 26, 2026\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/ai/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #ai\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/agents/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #agents\n            </a>\n            <a href=\"https://pype.dev//tags/personal/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #personal\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <h2
    id=\"opener\">Opener <a class=\"header-anchor\" href=\"#opener\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Agentic coding has been
    an exciting change to me over the last couple of months\nspecifically. I've been
    using AI tools for a few years now but something really\nshifted with Opus 4.5
    as well as the tools/harnesses getting better and more\nuseful around the same
    time. I've been influenced by people like Simon Willison\nand Steve Yegge who
    have been on the forefront of agentic coding and <a href=\"https://simonwillison.net/2025/Oct/7/vibe-engineering/\">vibe\nengineering</a>
    since the\ndawn of ChatGPT and in my small circles of work I'm definitely on the
    bloodiest\nbleeding edge of the adoption of these practices. Are they the future?
    I don't\nknow - I tried to maintain a skeptical posture but until the bubble pops
    it's\nlooking like this is at least a direction the future of my line of work
    is\ngoing.</p>\n<div class=\"admonition danger\">\n<p>The tough part is mixing
    the new world of agentic coding with\ndevelopers on wildly different points in
    the spectrum of adoption and maturity.</p>\n</div>\n<p>Here's a short anecdote
    about what I mean...</p>\n<p>In a new project that I'm on, I've refactored/reimplemented
    a lot of legacy\ncode, producing about 140k lines of code, configuration, and\ndocs
    in about 2 months. It's an insane amount of &quot;product&quot; and I've done
    it\nentirely with agents. But I didn't do it with a handful of vanilla chat\nsessions
    like &quot;Hey Copilot, reimplement this API, no mistakes&quot;. I've been building\nout
    my own process for using LLMs effectively. I have no actual idea besides my\nown
    experience if what I'm building is useful, but it feels pretty good -\nagents
    for planning, building, reviewing, testing, etc. My &quot;harness&quot; includes\nspecialized
    agents and opinionated development workflows\nto try to ensure that code is never
    one-shotted into production.</p>\n<p>The catch though is that I'm working with
    a handful of developers and they are not\nearly-adopters or aggressive experimenters
    with these new agentic tools. Most\nof them are still in Steve Yegge's stage 2
    or 3 of AI coding as he's outlined\n<a href=\"https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04\">in
    this medium\narticle introducing\nGasTown</a>. They\nopen a chat session, and
    say yes or no to Opus. I've been in-between stages\n6 and 7 for a while now -
    managing multiple agentic sessions that themselves\nrun specialized subagents
    primarily for context management, although I don't\nfeel quite ready for full
    blown stage 8 (agents running agents running agents).\nSo this isn't me saying
    that I'm\n&quot;better&quot; than the guys I'm working with, just the project
    we're on\ntogether is now being touched by people on wildly different ends of
    the agentic\ncoding spectrum, and the project itself is an experiment to me of
    living in the &quot;New World&quot;.</p>\n<p>Finally the anecdote - I'm getting
    PRs from guys in stages 2 and 3,\nthousands of lines of code and config, that
    I know they are not necessarily\nexperts in, but they're producing that code with
    fairly vanilla practices. How\ndo I verify it? I know my own prompts, I know what
    agents generated my code, I know\nthe direction and prodding I gave as they're
    building, but all\nI know in a PR review from someone else is the diff - not how
    they tested it\n(unless of course there's tests, and there must be, but tests
    are only as good\nas the tests are...), not the steering they gave, not the manual
    UAT validation\nthey did, or even the full intent... And ultimately I own the
    code they merge\nbecause chances are I outlast their contract with the team. It's
    kind of a\nscary thing to review and accept... do I trust my\nagentic practices
    to validate their work? Cause I certainly don't trust myself\nto validate it perfectly.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">a note about contractors</p>\n<p>I'm
    not implying anything about anyone who works contract, I think the facts is that
    contractors are typically dis-incentivized to really &quot;own&quot; something
    - an unfortunate consequence of the world.</p>\n</div>\n<h2 id=\"this-is-about-me-not-everyone\">This
    is about me, not everyone <a class=\"header-anchor\" href=\"#this-is-about-me-not-everyone\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I want to make sure
    to reiterate the context of this post and my thoughts -\nit's really about me.
    I'm not saying anything here is true for anyone else, I'm\nnot making predictions
    about tomorrow, and I'm not a prominent FOSS developer or a\nhigh-profile ex-FAANG
    engineer. I'm not talking about every project under the sun.\nI work at a big
    company, not a fast-paced startup. I work on internal tooling,\nnothing that should
    even be seen outside our network. I'm also a self-taught\ndeveloper, not a trained
    software engineer.</p>\n<p>As far as AI goes, lately I'm mostly all in on Github
    Copilot\nCLI with a sprinkling of Opencode. I'm not using Claude Code or Codex
    which\nseem to have their own communities around plugins and usage.</p>\n<p>And
    since we're so focused on me right now, the important thing to keep as the\nbackdrop
    for this post is my temperament and make-up. I'm definitely made a\ncertain kind
    of way, not different than every single person necessarily, but\ndifferent enough,
    from enough people, to not blend in with the 9-5 guy who can\nlog out and not
    think about work until the morning (I'm not saying that's a\nstrength either,
    my boundary problems are for another time).</p>\n<p>I feel an aggressive burden
    to solve problems and own those solutions, call it\nwhite-knighting or a savior
    complex if you want, but I've got enough of a\nreputation at Caterpillar now (and
    anywhere else I've worked) to become a go-to\nperson for more than I think is
    necessarily appropriate. And with that burden\nI'll bring results - if a problem
    hooks into my brain it. will. be. solved. I\nprobably won't do the best most clean-code
    solution right out of the gate, but\nI'll do whatever I can to find a solution.</p>\n<h2
    id=\"who-i-was-before-agents\">Who I was before agents <a class=\"header-anchor\"
    href=\"#who-i-was-before-agents\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>That is who I was before
    agents made code easy to produce. My first boss at\nCaterpillar used the phrase
    &quot;tenacious learner&quot; to describe me in several\nreviews. I kind of rejected
    the description because I basically refused to\nbelieve that I was really any
    different, any harder of a worker, than my peers.</p>\n<p>But with almost a decade
    of experience in the corporate world, and some adult\nperspective on my life,
    I think it's accurate... I am a harder worker, to my\ndetriment sometimes, than
    a fair number of people I've worked with**.</p>\n<p>I'm not brilliant but I can
    focus for a long time in the right circumstances.\nThe gift of perseverance (or
    the curse of not being able to let something go,\ndepending on how you look at
    it) has led to blessing in my life in both reward\nand skill.</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">**</p>\n<p>There's nothing wrong with it
    either, Cat's somewhat noticed that work in my EOY reviews and I'm certainly not
    against &quot;just doing your job&quot;.</p>\n</div>\n<p>And then AI came along
    and with another set of the right circumstances\ncatalyzed a new way to work.</p>\n<h2
    id=\"leaning-into-agentic-engineering\">Leaning into &quot;Agentic Engineering&quot;
    <a class=\"header-anchor\" href=\"#leaning-into-agentic-engineering\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I jumped onto experimenting
    with AI coding tools as soon as they became\navailable, but mostly I just tried
    vibe coding rather than using tools for real\nengineering work. I vibed up an
    API at one of my jobs that went into production\nway too early, with far too little
    validation, and it was scary to support it\nfrom then on out. I also did the meme,
    vibe-coded a TODO app, and threw that\npuppy into the internet without locking
    down my API endpoints... That was\nbefore agents were quite as useful as they
    can be\nnow, but that experience along with a handful of other stepping stones
    (like\nlearning some real actual fundamentals about security) began to\ngive me
    confidence in using the AI as a tool, like my IDE is a tool, for\nproducing <strong>solutions</strong>
    that take the form of code.</p>\n<div class=\"admonition note\">\n<p>As one-shot
    apps got better and better, and as I learned about scoping work\nmore appropriately
    for agentic tools my confidence in them grew.</p>\n</div>\n<p>There's quite a
    difference between &quot;Claude make me a todo app, no mistakes&quot; and\nscoping
    out a solution in natural language, with some technical guardrails, and\nhaving
    agents tackle the implementation methodically.</p>\n<h2 id=\"what-actually-changed\">What
    actually changed <a class=\"header-anchor\" href=\"#what-actually-changed\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What's actually changed
    for me is quite a lot... I haven't opened my IDE to\nseriously write code for
    months now. I've oscillated between Opencode and\nCopilot CLI, leaning moreso
    into Copilot since it's an approved tool at work\nand as of mid-February is quite
    good. Mentally I'm approaching problems with a\nlittle more thought on the front-end
    than before because prior to agents I\nwould think as I implemented. At the scale
    of work that I do, this was really\nfine - working on CLI utilities to solve simple
    problems, developing an\niterative testing cycle for each problem that allowed
    me to move fast, and once\nI found a groove I was cooking. But now I don't even
    need to find it, I open\nOpencode or Copilot CLI with my Planner agent, describe
    what I want to happen and have\nOpus or GPT scope out a plan for me. Usually there's
    some back and forth on\nfeature scoping, then I review a markdown file it produces,
    and once it looks\ndecent enough to me I say &quot;go&quot; and it goes.</p>\n<p>That
    works a lot better than I even care to admit because at the same time as\nI've
    been leaning harder into agents, I've been building my own harness of\nsorts -
    not a replacement for Copilot CLI or a competitor to Opencode, but\nmoreso an
    opinionated workflow spine that I force agents into to give strict\ngates to the
    SDLC (software development lifecycle).</p>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">Problem Solving Workflows</p>\n<p>Plan and implement
    is fine for a lot of things, and I do think it's only getting better. My harness,\nmentioned
    a few times around here before, called Nexus, is a set of agents and\nrules that
    I want the code I'll be responsible for to go through before it\nlands in production.
    That cycle isn't too complex, and there's only about\n10,000 similar tools to
    Nexus on Github trending right now. I've thought about dropping my idea and picking
    up\nsomething more popular, like\n<a href=\"https://www.github.com/obra/superpowers\">superpowers</a>
    but at the moment I'm\ncontinuing to develop on and lean into my own idea here.</p>\n</div>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">Mini post on Nexus</p>\n<p>I
    keep saying a blog post is coming, but the high level of Nexus is that it's a
    task\ntracker with a CLI that agents use to advance a ticket through a plan -&gt;
    build\n-&gt; test -&gt; review -&gt; verify -&gt; merge lifecycle that is almost
    exactly how I\nwould otherwise have solved a problem by hand. I think it needs
    work, I need to\nbe harder on TDD methodlogies with agents, and work on verification
    gating a\nbit more (shoutout to <a href=\"https://github.com/simonw/showboat\">showboat</a>
    by Simon\nWillison) but overall it's a system of thinking that I already participate
    in\nso I'm doing my best to farm out specific parts of my workflow to agents rather\nthan
    trying to one-shot enterprise problems and solutions.</p>\n</div>\n<div class=\"admonition
    danger\">\n<p class=\"admonition-title\">Who's doing the thinking?</p>\n<p>I've
    noticed that as I've developed Nexus out though, I lean on the agents for\nmore
    and more of my own thinking, and am trusting my problem solving\n<strong>process</strong>
    moreso than my actual problem solving abilities.</p>\n</div>\n<h2 id=\"hidden-costs\">Hidden
    costs <a class=\"header-anchor\" href=\"#hidden-costs\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The cost of this increase
    in speed is a lack of familiarity - and the fallout\nof lack of familiarity is
    hard to express. There's also many facets to it.\nFor me, the first facet is that
    Nexus helps me move fast, but as I've leaned\ninto it for more and more of the
    planning, I'm less and less familiar with the\nstate of the code. I find myself
    asking my reviewer agents in fresh sessions\noften to explain it to me, and thankfully
    they're usually consistent, but\nnonetheless I'm still not intimately familiar
    with the code. And on Nexus it's\nnot a big deal, that's low stakes, it's just
    me and my workflow.</p>\n<p>I'm using Nexus + Copilot at work and that feels like
    higher\nstakes... I have my agents explain the status of our project and although
    they're\nalso somewhat consistent the thing that's scary is that other people
    are\nworking on that repo with me, and that's where another layer of complexity\nmanifests
    itself. If it's just me and my <a class=\"wikilink\" href=\"/clankers\">clankers</a>,
    let's go all day long,\nrebuild, ask questions, etc... but I have other developers
    I rub shoulders with\nnow, and if they ask me a question what am I going to say?
    &quot;Hold on, let me prompt\nmy agent for you&quot; - it's LMGTFY on steroids.
    And the burden becomes if I\nfeel like I can own and support what those other
    developers push into the repo.</p>\n<h2 id=\"murky-responsibility-boundaries\">Murky
    responsibility boundaries <a class=\"header-anchor\" href=\"#murky-responsibility-boundaries\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Why do I own their work?
    Well for the third time, this post is pretty\nself-centered and all about me,
    and my situation is that the other developers I\nwork with presently are all contractors.
    Their work agreement with Cat could\nend at any second, for practically any reason.
    The incentive structure isn't\nthere for these guys who technically work for an
    agency... Their bonuses aren't\nbigger (or even exist) if Cat performs well, there's
    no extra vacation days in\nit for em (aye, contractors don't get vacation days
    anyways), and not that it's\na problem, moreso just the nature of the world we're
    in - but they're basically\nmercenaries out to the highest bidder and I happen
    to know of <strong>multiple times\nwhere Cat lost a good person to a higher bidder</strong>.</p>\n<p>So
    this isn't really me trying to be negative about contractors at all, I'm\nhere
    for a pay-check as well but Cat at least gives me SOME incentive to work\nhard
    with the goal of compensation regardless of how altruistic I feel in my\nown circumstances.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">Incentive</p>\n<p>Better
    ratings mean marginally better end-of-year salary increases, and I've received
    some other awards that certainly give me pause about jumping ship to another long-term
    place even when things can be crazy at Cat.</p>\n</div>\n<p>It's more than just
    the contrator-ownership dilema, I've dug myself quite a\nhole over the last 8-10
    years, gaining a reputation that I think many would\nappreciate, but for me only
    lately increases the stress. I don't need to parrot\nevery accolade I've ever
    received, that's not the point, but to make the point\nas clear as I can - I have
    a lot of respect from quite a few people at\nCaterpillar. I'm blessed to have
    that reputation, and it's not like I haven't\nworked hard for it - but people
    talk about me in a way so flattering I feel\nlike the main character in a fictional
    story sometimes.</p>\n<p>In a fictional story I can check out the ending, hit
    up spark notes, or ask AI\nhow it ends... but there isn't an &quot;end&quot; in
    my real world scenario, there's only\ntomorrow and I feel the pressure of not
    knowing what tomorrow holds now more\nthan ever.</p>\n<div class=\"admonition
    danger\">\n<p>Being noticed is starting to feel more costly than rewarding...</p>\n</div>\n<h2
    id=\"financial-irony\">Financial irony <a class=\"header-anchor\" href=\"#financial-irony\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What's the cost? It's
    hard to get specific without writing a novel but here's\nthe TLDR - because I've
    been pretty good at what I do I've been able to do this\ntype of work outside
    my normal 9-5 responsibilities and with that extra work\nhas been some pretty
    great financial benefits. However with Cat changes,\nresponsibility increases,
    and now owning code that others (and their clankers)\nwrite, the extra time I
    gained for myself is eaten-up and has been reclaimed by\nthe mega-corp... &quot;Exceeding
    expectations&quot; every year just meant the bar is\nraised, the expectations
    are higher, the time-commitment requirement is higher,\nand as I've had to meet
    the requirements of both the new world and the curse of\nbeing noticed, I've lost
    the time for the extra work... For years I've realized\nthe benefit of my own
    skills and drive, but the irony of agents (and a handful\nof other things) is
    that with the dramatic increase in expectations, not only\non me but on those
    I work with and therefore their output, I don't get to\nrealize the benefits of
    my own gifts anymore.</p>\n<h2 id=\"meaning-and-fatigue\">Meaning and fatigue
    <a class=\"header-anchor\" href=\"#meaning-and-fatigue\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I feel very torn because
    the work I've been called into with Cat is good, I\nsaid in <a class=\"wikilink\"
    href=\"/cat-autonomy-2-0\">cat-autonomy-2-0</a> that autonomy will save people's
    lives. I love\ngetting to participate in that mission, it's the primary reason
    I didn't jump\nship to try to maintain the levels, and type, of work I was doing
    before... But\nin a few short months the mission is being drowned out by expectations
    and\nrequirements that are so high I'm losing the grip on my own life.</p>\n<h2
    id=\"open-questions\">Open questions <a class=\"header-anchor\" href=\"#open-questions\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>That leads me to questions
    that I can't answer, the question I ask daily now of\n&quot;What about tomorrow?&quot;.
    What will agents do for us tomorrow, what problems will\nbe solved, what bugs
    will I create (by agents of course because I've never\nwritten a bug by hand in
    my whole life \\s). If I stopped using agents would\npeople still be impressed?
    Would it even matter?</p>\n<h2 id=\"fin\">Fin <a class=\"header-anchor\" href=\"#fin\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm certainly not anti-AI,
    it's typing all my code. I'm not anti-collaboration,\nalthough I do wish I could
    work alone with just my clanker-army to worry about.\nI'm not sure what I am anymore
    though... AI has changed how I work, what I work\non, and who I work with... Everything
    has changed in such a short period of\ntime and like the ending of this post,
    it's pretty jarring.</p>\n<div class=\"admonition danger\">\n<p>Death comes to
    us all - James Acaster.</p>\n</div>\n<p>Thanks for reading.</p>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>The Irony of 10x</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Opener Agentic coding has been an exciting
    change to me over the last couple of months\nspecifically. I&#x27;ve been using
    AI tools for a few years now but somet\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"The Irony of 10x | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/the-irony-of-10x\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"The Irony of 10x | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Opener Agentic coding has been an exciting change to me over the last
    couple of months\nspecifically. I&#x27;ve been using AI tools for a few years
    now but somet\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\"
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
    mb-4 post-title-large\">The Irony of 10x</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2026-03-26\">\n            March
    26, 2026\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/ai/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #ai\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/agents/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #agents\n
    \           </a>\n            <a href=\"https://pype.dev//tags/personal/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #personal\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\"
    alt=\"The Irony of 10x cover image\">\n        </div>\n    </figure>\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">The Irony of
    10x</h1>\n    <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n
    \       <time datetime=\"2026-03-26\">\n            March 26, 2026\n        </time>\n
    \   </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/ai/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #ai\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/agents/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #agents\n            </a>\n            <a href=\"https://pype.dev//tags/personal/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #personal\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <h2
    id=\"opener\">Opener <a class=\"header-anchor\" href=\"#opener\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Agentic coding has been
    an exciting change to me over the last couple of months\nspecifically. I've been
    using AI tools for a few years now but something really\nshifted with Opus 4.5
    as well as the tools/harnesses getting better and more\nuseful around the same
    time. I've been influenced by people like Simon Willison\nand Steve Yegge who
    have been on the forefront of agentic coding and <a href=\"https://simonwillison.net/2025/Oct/7/vibe-engineering/\">vibe\nengineering</a>
    since the\ndawn of ChatGPT and in my small circles of work I'm definitely on the
    bloodiest\nbleeding edge of the adoption of these practices. Are they the future?
    I don't\nknow - I tried to maintain a skeptical posture but until the bubble pops
    it's\nlooking like this is at least a direction the future of my line of work
    is\ngoing.</p>\n<div class=\"admonition danger\">\n<p>The tough part is mixing
    the new world of agentic coding with\ndevelopers on wildly different points in
    the spectrum of adoption and maturity.</p>\n</div>\n<p>Here's a short anecdote
    about what I mean...</p>\n<p>In a new project that I'm on, I've refactored/reimplemented
    a lot of legacy\ncode, producing about 140k lines of code, configuration, and\ndocs
    in about 2 months. It's an insane amount of &quot;product&quot; and I've done
    it\nentirely with agents. But I didn't do it with a handful of vanilla chat\nsessions
    like &quot;Hey Copilot, reimplement this API, no mistakes&quot;. I've been building\nout
    my own process for using LLMs effectively. I have no actual idea besides my\nown
    experience if what I'm building is useful, but it feels pretty good -\nagents
    for planning, building, reviewing, testing, etc. My &quot;harness&quot; includes\nspecialized
    agents and opinionated development workflows\nto try to ensure that code is never
    one-shotted into production.</p>\n<p>The catch though is that I'm working with
    a handful of developers and they are not\nearly-adopters or aggressive experimenters
    with these new agentic tools. Most\nof them are still in Steve Yegge's stage 2
    or 3 of AI coding as he's outlined\n<a href=\"https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04\">in
    this medium\narticle introducing\nGasTown</a>. They\nopen a chat session, and
    say yes or no to Opus. I've been in-between stages\n6 and 7 for a while now -
    managing multiple agentic sessions that themselves\nrun specialized subagents
    primarily for context management, although I don't\nfeel quite ready for full
    blown stage 8 (agents running agents running agents).\nSo this isn't me saying
    that I'm\n&quot;better&quot; than the guys I'm working with, just the project
    we're on\ntogether is now being touched by people on wildly different ends of
    the agentic\ncoding spectrum, and the project itself is an experiment to me of
    living in the &quot;New World&quot;.</p>\n<p>Finally the anecdote - I'm getting
    PRs from guys in stages 2 and 3,\nthousands of lines of code and config, that
    I know they are not necessarily\nexperts in, but they're producing that code with
    fairly vanilla practices. How\ndo I verify it? I know my own prompts, I know what
    agents generated my code, I know\nthe direction and prodding I gave as they're
    building, but all\nI know in a PR review from someone else is the diff - not how
    they tested it\n(unless of course there's tests, and there must be, but tests
    are only as good\nas the tests are...), not the steering they gave, not the manual
    UAT validation\nthey did, or even the full intent... And ultimately I own the
    code they merge\nbecause chances are I outlast their contract with the team. It's
    kind of a\nscary thing to review and accept... do I trust my\nagentic practices
    to validate their work? Cause I certainly don't trust myself\nto validate it perfectly.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">a note about contractors</p>\n<p>I'm
    not implying anything about anyone who works contract, I think the facts is that
    contractors are typically dis-incentivized to really &quot;own&quot; something
    - an unfortunate consequence of the world.</p>\n</div>\n<h2 id=\"this-is-about-me-not-everyone\">This
    is about me, not everyone <a class=\"header-anchor\" href=\"#this-is-about-me-not-everyone\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I want to make sure
    to reiterate the context of this post and my thoughts -\nit's really about me.
    I'm not saying anything here is true for anyone else, I'm\nnot making predictions
    about tomorrow, and I'm not a prominent FOSS developer or a\nhigh-profile ex-FAANG
    engineer. I'm not talking about every project under the sun.\nI work at a big
    company, not a fast-paced startup. I work on internal tooling,\nnothing that should
    even be seen outside our network. I'm also a self-taught\ndeveloper, not a trained
    software engineer.</p>\n<p>As far as AI goes, lately I'm mostly all in on Github
    Copilot\nCLI with a sprinkling of Opencode. I'm not using Claude Code or Codex
    which\nseem to have their own communities around plugins and usage.</p>\n<p>And
    since we're so focused on me right now, the important thing to keep as the\nbackdrop
    for this post is my temperament and make-up. I'm definitely made a\ncertain kind
    of way, not different than every single person necessarily, but\ndifferent enough,
    from enough people, to not blend in with the 9-5 guy who can\nlog out and not
    think about work until the morning (I'm not saying that's a\nstrength either,
    my boundary problems are for another time).</p>\n<p>I feel an aggressive burden
    to solve problems and own those solutions, call it\nwhite-knighting or a savior
    complex if you want, but I've got enough of a\nreputation at Caterpillar now (and
    anywhere else I've worked) to become a go-to\nperson for more than I think is
    necessarily appropriate. And with that burden\nI'll bring results - if a problem
    hooks into my brain it. will. be. solved. I\nprobably won't do the best most clean-code
    solution right out of the gate, but\nI'll do whatever I can to find a solution.</p>\n<h2
    id=\"who-i-was-before-agents\">Who I was before agents <a class=\"header-anchor\"
    href=\"#who-i-was-before-agents\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>That is who I was before
    agents made code easy to produce. My first boss at\nCaterpillar used the phrase
    &quot;tenacious learner&quot; to describe me in several\nreviews. I kind of rejected
    the description because I basically refused to\nbelieve that I was really any
    different, any harder of a worker, than my peers.</p>\n<p>But with almost a decade
    of experience in the corporate world, and some adult\nperspective on my life,
    I think it's accurate... I am a harder worker, to my\ndetriment sometimes, than
    a fair number of people I've worked with**.</p>\n<p>I'm not brilliant but I can
    focus for a long time in the right circumstances.\nThe gift of perseverance (or
    the curse of not being able to let something go,\ndepending on how you look at
    it) has led to blessing in my life in both reward\nand skill.</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">**</p>\n<p>There's nothing wrong with it
    either, Cat's somewhat noticed that work in my EOY reviews and I'm certainly not
    against &quot;just doing your job&quot;.</p>\n</div>\n<p>And then AI came along
    and with another set of the right circumstances\ncatalyzed a new way to work.</p>\n<h2
    id=\"leaning-into-agentic-engineering\">Leaning into &quot;Agentic Engineering&quot;
    <a class=\"header-anchor\" href=\"#leaning-into-agentic-engineering\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I jumped onto experimenting
    with AI coding tools as soon as they became\navailable, but mostly I just tried
    vibe coding rather than using tools for real\nengineering work. I vibed up an
    API at one of my jobs that went into production\nway too early, with far too little
    validation, and it was scary to support it\nfrom then on out. I also did the meme,
    vibe-coded a TODO app, and threw that\npuppy into the internet without locking
    down my API endpoints... That was\nbefore agents were quite as useful as they
    can be\nnow, but that experience along with a handful of other stepping stones
    (like\nlearning some real actual fundamentals about security) began to\ngive me
    confidence in using the AI as a tool, like my IDE is a tool, for\nproducing <strong>solutions</strong>
    that take the form of code.</p>\n<div class=\"admonition note\">\n<p>As one-shot
    apps got better and better, and as I learned about scoping work\nmore appropriately
    for agentic tools my confidence in them grew.</p>\n</div>\n<p>There's quite a
    difference between &quot;Claude make me a todo app, no mistakes&quot; and\nscoping
    out a solution in natural language, with some technical guardrails, and\nhaving
    agents tackle the implementation methodically.</p>\n<h2 id=\"what-actually-changed\">What
    actually changed <a class=\"header-anchor\" href=\"#what-actually-changed\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What's actually changed
    for me is quite a lot... I haven't opened my IDE to\nseriously write code for
    months now. I've oscillated between Opencode and\nCopilot CLI, leaning moreso
    into Copilot since it's an approved tool at work\nand as of mid-February is quite
    good. Mentally I'm approaching problems with a\nlittle more thought on the front-end
    than before because prior to agents I\nwould think as I implemented. At the scale
    of work that I do, this was really\nfine - working on CLI utilities to solve simple
    problems, developing an\niterative testing cycle for each problem that allowed
    me to move fast, and once\nI found a groove I was cooking. But now I don't even
    need to find it, I open\nOpencode or Copilot CLI with my Planner agent, describe
    what I want to happen and have\nOpus or GPT scope out a plan for me. Usually there's
    some back and forth on\nfeature scoping, then I review a markdown file it produces,
    and once it looks\ndecent enough to me I say &quot;go&quot; and it goes.</p>\n<p>That
    works a lot better than I even care to admit because at the same time as\nI've
    been leaning harder into agents, I've been building my own harness of\nsorts -
    not a replacement for Copilot CLI or a competitor to Opencode, but\nmoreso an
    opinionated workflow spine that I force agents into to give strict\ngates to the
    SDLC (software development lifecycle).</p>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">Problem Solving Workflows</p>\n<p>Plan and implement
    is fine for a lot of things, and I do think it's only getting better. My harness,\nmentioned
    a few times around here before, called Nexus, is a set of agents and\nrules that
    I want the code I'll be responsible for to go through before it\nlands in production.
    That cycle isn't too complex, and there's only about\n10,000 similar tools to
    Nexus on Github trending right now. I've thought about dropping my idea and picking
    up\nsomething more popular, like\n<a href=\"https://www.github.com/obra/superpowers\">superpowers</a>
    but at the moment I'm\ncontinuing to develop on and lean into my own idea here.</p>\n</div>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">Mini post on Nexus</p>\n<p>I
    keep saying a blog post is coming, but the high level of Nexus is that it's a
    task\ntracker with a CLI that agents use to advance a ticket through a plan -&gt;
    build\n-&gt; test -&gt; review -&gt; verify -&gt; merge lifecycle that is almost
    exactly how I\nwould otherwise have solved a problem by hand. I think it needs
    work, I need to\nbe harder on TDD methodlogies with agents, and work on verification
    gating a\nbit more (shoutout to <a href=\"https://github.com/simonw/showboat\">showboat</a>
    by Simon\nWillison) but overall it's a system of thinking that I already participate
    in\nso I'm doing my best to farm out specific parts of my workflow to agents rather\nthan
    trying to one-shot enterprise problems and solutions.</p>\n</div>\n<div class=\"admonition
    danger\">\n<p class=\"admonition-title\">Who's doing the thinking?</p>\n<p>I've
    noticed that as I've developed Nexus out though, I lean on the agents for\nmore
    and more of my own thinking, and am trusting my problem solving\n<strong>process</strong>
    moreso than my actual problem solving abilities.</p>\n</div>\n<h2 id=\"hidden-costs\">Hidden
    costs <a class=\"header-anchor\" href=\"#hidden-costs\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The cost of this increase
    in speed is a lack of familiarity - and the fallout\nof lack of familiarity is
    hard to express. There's also many facets to it.\nFor me, the first facet is that
    Nexus helps me move fast, but as I've leaned\ninto it for more and more of the
    planning, I'm less and less familiar with the\nstate of the code. I find myself
    asking my reviewer agents in fresh sessions\noften to explain it to me, and thankfully
    they're usually consistent, but\nnonetheless I'm still not intimately familiar
    with the code. And on Nexus it's\nnot a big deal, that's low stakes, it's just
    me and my workflow.</p>\n<p>I'm using Nexus + Copilot at work and that feels like
    higher\nstakes... I have my agents explain the status of our project and although
    they're\nalso somewhat consistent the thing that's scary is that other people
    are\nworking on that repo with me, and that's where another layer of complexity\nmanifests
    itself. If it's just me and my <a class=\"wikilink\" href=\"/clankers\">clankers</a>,
    let's go all day long,\nrebuild, ask questions, etc... but I have other developers
    I rub shoulders with\nnow, and if they ask me a question what am I going to say?
    &quot;Hold on, let me prompt\nmy agent for you&quot; - it's LMGTFY on steroids.
    And the burden becomes if I\nfeel like I can own and support what those other
    developers push into the repo.</p>\n<h2 id=\"murky-responsibility-boundaries\">Murky
    responsibility boundaries <a class=\"header-anchor\" href=\"#murky-responsibility-boundaries\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Why do I own their work?
    Well for the third time, this post is pretty\nself-centered and all about me,
    and my situation is that the other developers I\nwork with presently are all contractors.
    Their work agreement with Cat could\nend at any second, for practically any reason.
    The incentive structure isn't\nthere for these guys who technically work for an
    agency... Their bonuses aren't\nbigger (or even exist) if Cat performs well, there's
    no extra vacation days in\nit for em (aye, contractors don't get vacation days
    anyways), and not that it's\na problem, moreso just the nature of the world we're
    in - but they're basically\nmercenaries out to the highest bidder and I happen
    to know of <strong>multiple times\nwhere Cat lost a good person to a higher bidder</strong>.</p>\n<p>So
    this isn't really me trying to be negative about contractors at all, I'm\nhere
    for a pay-check as well but Cat at least gives me SOME incentive to work\nhard
    with the goal of compensation regardless of how altruistic I feel in my\nown circumstances.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">Incentive</p>\n<p>Better
    ratings mean marginally better end-of-year salary increases, and I've received
    some other awards that certainly give me pause about jumping ship to another long-term
    place even when things can be crazy at Cat.</p>\n</div>\n<p>It's more than just
    the contrator-ownership dilema, I've dug myself quite a\nhole over the last 8-10
    years, gaining a reputation that I think many would\nappreciate, but for me only
    lately increases the stress. I don't need to parrot\nevery accolade I've ever
    received, that's not the point, but to make the point\nas clear as I can - I have
    a lot of respect from quite a few people at\nCaterpillar. I'm blessed to have
    that reputation, and it's not like I haven't\nworked hard for it - but people
    talk about me in a way so flattering I feel\nlike the main character in a fictional
    story sometimes.</p>\n<p>In a fictional story I can check out the ending, hit
    up spark notes, or ask AI\nhow it ends... but there isn't an &quot;end&quot; in
    my real world scenario, there's only\ntomorrow and I feel the pressure of not
    knowing what tomorrow holds now more\nthan ever.</p>\n<div class=\"admonition
    danger\">\n<p>Being noticed is starting to feel more costly than rewarding...</p>\n</div>\n<h2
    id=\"financial-irony\">Financial irony <a class=\"header-anchor\" href=\"#financial-irony\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What's the cost? It's
    hard to get specific without writing a novel but here's\nthe TLDR - because I've
    been pretty good at what I do I've been able to do this\ntype of work outside
    my normal 9-5 responsibilities and with that extra work\nhas been some pretty
    great financial benefits. However with Cat changes,\nresponsibility increases,
    and now owning code that others (and their clankers)\nwrite, the extra time I
    gained for myself is eaten-up and has been reclaimed by\nthe mega-corp... &quot;Exceeding
    expectations&quot; every year just meant the bar is\nraised, the expectations
    are higher, the time-commitment requirement is higher,\nand as I've had to meet
    the requirements of both the new world and the curse of\nbeing noticed, I've lost
    the time for the extra work... For years I've realized\nthe benefit of my own
    skills and drive, but the irony of agents (and a handful\nof other things) is
    that with the dramatic increase in expectations, not only\non me but on those
    I work with and therefore their output, I don't get to\nrealize the benefits of
    my own gifts anymore.</p>\n<h2 id=\"meaning-and-fatigue\">Meaning and fatigue
    <a class=\"header-anchor\" href=\"#meaning-and-fatigue\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I feel very torn because
    the work I've been called into with Cat is good, I\nsaid in <a class=\"wikilink\"
    href=\"/cat-autonomy-2-0\">cat-autonomy-2-0</a> that autonomy will save people's
    lives. I love\ngetting to participate in that mission, it's the primary reason
    I didn't jump\nship to try to maintain the levels, and type, of work I was doing
    before... But\nin a few short months the mission is being drowned out by expectations
    and\nrequirements that are so high I'm losing the grip on my own life.</p>\n<h2
    id=\"open-questions\">Open questions <a class=\"header-anchor\" href=\"#open-questions\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>That leads me to questions
    that I can't answer, the question I ask daily now of\n&quot;What about tomorrow?&quot;.
    What will agents do for us tomorrow, what problems will\nbe solved, what bugs
    will I create (by agents of course because I've never\nwritten a bug by hand in
    my whole life \\s). If I stopped using agents would\npeople still be impressed?
    Would it even matter?</p>\n<h2 id=\"fin\">Fin <a class=\"header-anchor\" href=\"#fin\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm certainly not anti-AI,
    it's typing all my code. I'm not anti-collaboration,\nalthough I do wish I could
    work alone with just my clanker-army to worry about.\nI'm not sure what I am anymore
    though... AI has changed how I work, what I work\non, and who I work with... Everything
    has changed in such a short period of\ntime and like the ending of this post,
    it's pretty jarring.</p>\n<div class=\"admonition danger\">\n<p>Death comes to
    us all - James Acaster.</p>\n</div>\n<p>Thanks for reading.</p>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>The Irony
    of 10x</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Opener Agentic coding
    has been an exciting change to me over the last couple of months\nspecifically.
    I&#x27;ve been using AI tools for a few years now but somet\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"The Irony of 10x | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/the-irony-of-10x\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"The Irony of 10x | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Opener Agentic coding has been an exciting change to me over the last
    couple of months\nspecifically. I&#x27;ve been using AI tools for a few years
    now but somet\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\"
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
    \           <span class=\"site-terminal__dir\">~/the-irony-of-10x</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <h2 id=\"opener\">Opener
    <a class=\"header-anchor\" href=\"#opener\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Agentic coding has been
    an exciting change to me over the last couple of months\nspecifically. I've been
    using AI tools for a few years now but something really\nshifted with Opus 4.5
    as well as the tools/harnesses getting better and more\nuseful around the same
    time. I've been influenced by people like Simon Willison\nand Steve Yegge who
    have been on the forefront of agentic coding and <a href=\"https://simonwillison.net/2025/Oct/7/vibe-engineering/\">vibe\nengineering</a>
    since the\ndawn of ChatGPT and in my small circles of work I'm definitely on the
    bloodiest\nbleeding edge of the adoption of these practices. Are they the future?
    I don't\nknow - I tried to maintain a skeptical posture but until the bubble pops
    it's\nlooking like this is at least a direction the future of my line of work
    is\ngoing.</p>\n<div class=\"admonition danger\">\n<p>The tough part is mixing
    the new world of agentic coding with\ndevelopers on wildly different points in
    the spectrum of adoption and maturity.</p>\n</div>\n<p>Here's a short anecdote
    about what I mean...</p>\n<p>In a new project that I'm on, I've refactored/reimplemented
    a lot of legacy\ncode, producing about 140k lines of code, configuration, and\ndocs
    in about 2 months. It's an insane amount of &quot;product&quot; and I've done
    it\nentirely with agents. But I didn't do it with a handful of vanilla chat\nsessions
    like &quot;Hey Copilot, reimplement this API, no mistakes&quot;. I've been building\nout
    my own process for using LLMs effectively. I have no actual idea besides my\nown
    experience if what I'm building is useful, but it feels pretty good -\nagents
    for planning, building, reviewing, testing, etc. My &quot;harness&quot; includes\nspecialized
    agents and opinionated development workflows\nto try to ensure that code is never
    one-shotted into production.</p>\n<p>The catch though is that I'm working with
    a handful of developers and they are not\nearly-adopters or aggressive experimenters
    with these new agentic tools. Most\nof them are still in Steve Yegge's stage 2
    or 3 of AI coding as he's outlined\n<a href=\"https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04\">in
    this medium\narticle introducing\nGasTown</a>. They\nopen a chat session, and
    say yes or no to Opus. I've been in-between stages\n6 and 7 for a while now -
    managing multiple agentic sessions that themselves\nrun specialized subagents
    primarily for context management, although I don't\nfeel quite ready for full
    blown stage 8 (agents running agents running agents).\nSo this isn't me saying
    that I'm\n&quot;better&quot; than the guys I'm working with, just the project
    we're on\ntogether is now being touched by people on wildly different ends of
    the agentic\ncoding spectrum, and the project itself is an experiment to me of
    living in the &quot;New World&quot;.</p>\n<p>Finally the anecdote - I'm getting
    PRs from guys in stages 2 and 3,\nthousands of lines of code and config, that
    I know they are not necessarily\nexperts in, but they're producing that code with
    fairly vanilla practices. How\ndo I verify it? I know my own prompts, I know what
    agents generated my code, I know\nthe direction and prodding I gave as they're
    building, but all\nI know in a PR review from someone else is the diff - not how
    they tested it\n(unless of course there's tests, and there must be, but tests
    are only as good\nas the tests are...), not the steering they gave, not the manual
    UAT validation\nthey did, or even the full intent... And ultimately I own the
    code they merge\nbecause chances are I outlast their contract with the team. It's
    kind of a\nscary thing to review and accept... do I trust my\nagentic practices
    to validate their work? Cause I certainly don't trust myself\nto validate it perfectly.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">a note about contractors</p>\n<p>I'm
    not implying anything about anyone who works contract, I think the facts is that
    contractors are typically dis-incentivized to really &quot;own&quot; something
    - an unfortunate consequence of the world.</p>\n</div>\n<h2 id=\"this-is-about-me-not-everyone\">This
    is about me, not everyone <a class=\"header-anchor\" href=\"#this-is-about-me-not-everyone\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I want to make sure
    to reiterate the context of this post and my thoughts -\nit's really about me.
    I'm not saying anything here is true for anyone else, I'm\nnot making predictions
    about tomorrow, and I'm not a prominent FOSS developer or a\nhigh-profile ex-FAANG
    engineer. I'm not talking about every project under the sun.\nI work at a big
    company, not a fast-paced startup. I work on internal tooling,\nnothing that should
    even be seen outside our network. I'm also a self-taught\ndeveloper, not a trained
    software engineer.</p>\n<p>As far as AI goes, lately I'm mostly all in on Github
    Copilot\nCLI with a sprinkling of Opencode. I'm not using Claude Code or Codex
    which\nseem to have their own communities around plugins and usage.</p>\n<p>And
    since we're so focused on me right now, the important thing to keep as the\nbackdrop
    for this post is my temperament and make-up. I'm definitely made a\ncertain kind
    of way, not different than every single person necessarily, but\ndifferent enough,
    from enough people, to not blend in with the 9-5 guy who can\nlog out and not
    think about work until the morning (I'm not saying that's a\nstrength either,
    my boundary problems are for another time).</p>\n<p>I feel an aggressive burden
    to solve problems and own those solutions, call it\nwhite-knighting or a savior
    complex if you want, but I've got enough of a\nreputation at Caterpillar now (and
    anywhere else I've worked) to become a go-to\nperson for more than I think is
    necessarily appropriate. And with that burden\nI'll bring results - if a problem
    hooks into my brain it. will. be. solved. I\nprobably won't do the best most clean-code
    solution right out of the gate, but\nI'll do whatever I can to find a solution.</p>\n<h2
    id=\"who-i-was-before-agents\">Who I was before agents <a class=\"header-anchor\"
    href=\"#who-i-was-before-agents\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>That is who I was before
    agents made code easy to produce. My first boss at\nCaterpillar used the phrase
    &quot;tenacious learner&quot; to describe me in several\nreviews. I kind of rejected
    the description because I basically refused to\nbelieve that I was really any
    different, any harder of a worker, than my peers.</p>\n<p>But with almost a decade
    of experience in the corporate world, and some adult\nperspective on my life,
    I think it's accurate... I am a harder worker, to my\ndetriment sometimes, than
    a fair number of people I've worked with**.</p>\n<p>I'm not brilliant but I can
    focus for a long time in the right circumstances.\nThe gift of perseverance (or
    the curse of not being able to let something go,\ndepending on how you look at
    it) has led to blessing in my life in both reward\nand skill.</p>\n<div class=\"admonition
    note\">\n<p class=\"admonition-title\">**</p>\n<p>There's nothing wrong with it
    either, Cat's somewhat noticed that work in my EOY reviews and I'm certainly not
    against &quot;just doing your job&quot;.</p>\n</div>\n<p>And then AI came along
    and with another set of the right circumstances\ncatalyzed a new way to work.</p>\n<h2
    id=\"leaning-into-agentic-engineering\">Leaning into &quot;Agentic Engineering&quot;
    <a class=\"header-anchor\" href=\"#leaning-into-agentic-engineering\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I jumped onto experimenting
    with AI coding tools as soon as they became\navailable, but mostly I just tried
    vibe coding rather than using tools for real\nengineering work. I vibed up an
    API at one of my jobs that went into production\nway too early, with far too little
    validation, and it was scary to support it\nfrom then on out. I also did the meme,
    vibe-coded a TODO app, and threw that\npuppy into the internet without locking
    down my API endpoints... That was\nbefore agents were quite as useful as they
    can be\nnow, but that experience along with a handful of other stepping stones
    (like\nlearning some real actual fundamentals about security) began to\ngive me
    confidence in using the AI as a tool, like my IDE is a tool, for\nproducing <strong>solutions</strong>
    that take the form of code.</p>\n<div class=\"admonition note\">\n<p>As one-shot
    apps got better and better, and as I learned about scoping work\nmore appropriately
    for agentic tools my confidence in them grew.</p>\n</div>\n<p>There's quite a
    difference between &quot;Claude make me a todo app, no mistakes&quot; and\nscoping
    out a solution in natural language, with some technical guardrails, and\nhaving
    agents tackle the implementation methodically.</p>\n<h2 id=\"what-actually-changed\">What
    actually changed <a class=\"header-anchor\" href=\"#what-actually-changed\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What's actually changed
    for me is quite a lot... I haven't opened my IDE to\nseriously write code for
    months now. I've oscillated between Opencode and\nCopilot CLI, leaning moreso
    into Copilot since it's an approved tool at work\nand as of mid-February is quite
    good. Mentally I'm approaching problems with a\nlittle more thought on the front-end
    than before because prior to agents I\nwould think as I implemented. At the scale
    of work that I do, this was really\nfine - working on CLI utilities to solve simple
    problems, developing an\niterative testing cycle for each problem that allowed
    me to move fast, and once\nI found a groove I was cooking. But now I don't even
    need to find it, I open\nOpencode or Copilot CLI with my Planner agent, describe
    what I want to happen and have\nOpus or GPT scope out a plan for me. Usually there's
    some back and forth on\nfeature scoping, then I review a markdown file it produces,
    and once it looks\ndecent enough to me I say &quot;go&quot; and it goes.</p>\n<p>That
    works a lot better than I even care to admit because at the same time as\nI've
    been leaning harder into agents, I've been building my own harness of\nsorts -
    not a replacement for Copilot CLI or a competitor to Opencode, but\nmoreso an
    opinionated workflow spine that I force agents into to give strict\ngates to the
    SDLC (software development lifecycle).</p>\n<div class=\"admonition warning\">\n<p
    class=\"admonition-title\">Problem Solving Workflows</p>\n<p>Plan and implement
    is fine for a lot of things, and I do think it's only getting better. My harness,\nmentioned
    a few times around here before, called Nexus, is a set of agents and\nrules that
    I want the code I'll be responsible for to go through before it\nlands in production.
    That cycle isn't too complex, and there's only about\n10,000 similar tools to
    Nexus on Github trending right now. I've thought about dropping my idea and picking
    up\nsomething more popular, like\n<a href=\"https://www.github.com/obra/superpowers\">superpowers</a>
    but at the moment I'm\ncontinuing to develop on and lean into my own idea here.</p>\n</div>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">Mini post on Nexus</p>\n<p>I
    keep saying a blog post is coming, but the high level of Nexus is that it's a
    task\ntracker with a CLI that agents use to advance a ticket through a plan -&gt;
    build\n-&gt; test -&gt; review -&gt; verify -&gt; merge lifecycle that is almost
    exactly how I\nwould otherwise have solved a problem by hand. I think it needs
    work, I need to\nbe harder on TDD methodlogies with agents, and work on verification
    gating a\nbit more (shoutout to <a href=\"https://github.com/simonw/showboat\">showboat</a>
    by Simon\nWillison) but overall it's a system of thinking that I already participate
    in\nso I'm doing my best to farm out specific parts of my workflow to agents rather\nthan
    trying to one-shot enterprise problems and solutions.</p>\n</div>\n<div class=\"admonition
    danger\">\n<p class=\"admonition-title\">Who's doing the thinking?</p>\n<p>I've
    noticed that as I've developed Nexus out though, I lean on the agents for\nmore
    and more of my own thinking, and am trusting my problem solving\n<strong>process</strong>
    moreso than my actual problem solving abilities.</p>\n</div>\n<h2 id=\"hidden-costs\">Hidden
    costs <a class=\"header-anchor\" href=\"#hidden-costs\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The cost of this increase
    in speed is a lack of familiarity - and the fallout\nof lack of familiarity is
    hard to express. There's also many facets to it.\nFor me, the first facet is that
    Nexus helps me move fast, but as I've leaned\ninto it for more and more of the
    planning, I'm less and less familiar with the\nstate of the code. I find myself
    asking my reviewer agents in fresh sessions\noften to explain it to me, and thankfully
    they're usually consistent, but\nnonetheless I'm still not intimately familiar
    with the code. And on Nexus it's\nnot a big deal, that's low stakes, it's just
    me and my workflow.</p>\n<p>I'm using Nexus + Copilot at work and that feels like
    higher\nstakes... I have my agents explain the status of our project and although
    they're\nalso somewhat consistent the thing that's scary is that other people
    are\nworking on that repo with me, and that's where another layer of complexity\nmanifests
    itself. If it's just me and my <a class=\"wikilink\" href=\"/clankers\">clankers</a>,
    let's go all day long,\nrebuild, ask questions, etc... but I have other developers
    I rub shoulders with\nnow, and if they ask me a question what am I going to say?
    &quot;Hold on, let me prompt\nmy agent for you&quot; - it's LMGTFY on steroids.
    And the burden becomes if I\nfeel like I can own and support what those other
    developers push into the repo.</p>\n<h2 id=\"murky-responsibility-boundaries\">Murky
    responsibility boundaries <a class=\"header-anchor\" href=\"#murky-responsibility-boundaries\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Why do I own their work?
    Well for the third time, this post is pretty\nself-centered and all about me,
    and my situation is that the other developers I\nwork with presently are all contractors.
    Their work agreement with Cat could\nend at any second, for practically any reason.
    The incentive structure isn't\nthere for these guys who technically work for an
    agency... Their bonuses aren't\nbigger (or even exist) if Cat performs well, there's
    no extra vacation days in\nit for em (aye, contractors don't get vacation days
    anyways), and not that it's\na problem, moreso just the nature of the world we're
    in - but they're basically\nmercenaries out to the highest bidder and I happen
    to know of <strong>multiple times\nwhere Cat lost a good person to a higher bidder</strong>.</p>\n<p>So
    this isn't really me trying to be negative about contractors at all, I'm\nhere
    for a pay-check as well but Cat at least gives me SOME incentive to work\nhard
    with the goal of compensation regardless of how altruistic I feel in my\nown circumstances.</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">Incentive</p>\n<p>Better
    ratings mean marginally better end-of-year salary increases, and I've received
    some other awards that certainly give me pause about jumping ship to another long-term
    place even when things can be crazy at Cat.</p>\n</div>\n<p>It's more than just
    the contrator-ownership dilema, I've dug myself quite a\nhole over the last 8-10
    years, gaining a reputation that I think many would\nappreciate, but for me only
    lately increases the stress. I don't need to parrot\nevery accolade I've ever
    received, that's not the point, but to make the point\nas clear as I can - I have
    a lot of respect from quite a few people at\nCaterpillar. I'm blessed to have
    that reputation, and it's not like I haven't\nworked hard for it - but people
    talk about me in a way so flattering I feel\nlike the main character in a fictional
    story sometimes.</p>\n<p>In a fictional story I can check out the ending, hit
    up spark notes, or ask AI\nhow it ends... but there isn't an &quot;end&quot; in
    my real world scenario, there's only\ntomorrow and I feel the pressure of not
    knowing what tomorrow holds now more\nthan ever.</p>\n<div class=\"admonition
    danger\">\n<p>Being noticed is starting to feel more costly than rewarding...</p>\n</div>\n<h2
    id=\"financial-irony\">Financial irony <a class=\"header-anchor\" href=\"#financial-irony\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>What's the cost? It's
    hard to get specific without writing a novel but here's\nthe TLDR - because I've
    been pretty good at what I do I've been able to do this\ntype of work outside
    my normal 9-5 responsibilities and with that extra work\nhas been some pretty
    great financial benefits. However with Cat changes,\nresponsibility increases,
    and now owning code that others (and their clankers)\nwrite, the extra time I
    gained for myself is eaten-up and has been reclaimed by\nthe mega-corp... &quot;Exceeding
    expectations&quot; every year just meant the bar is\nraised, the expectations
    are higher, the time-commitment requirement is higher,\nand as I've had to meet
    the requirements of both the new world and the curse of\nbeing noticed, I've lost
    the time for the extra work... For years I've realized\nthe benefit of my own
    skills and drive, but the irony of agents (and a handful\nof other things) is
    that with the dramatic increase in expectations, not only\non me but on those
    I work with and therefore their output, I don't get to\nrealize the benefits of
    my own gifts anymore.</p>\n<h2 id=\"meaning-and-fatigue\">Meaning and fatigue
    <a class=\"header-anchor\" href=\"#meaning-and-fatigue\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I feel very torn because
    the work I've been called into with Cat is good, I\nsaid in <a class=\"wikilink\"
    href=\"/cat-autonomy-2-0\">cat-autonomy-2-0</a> that autonomy will save people's
    lives. I love\ngetting to participate in that mission, it's the primary reason
    I didn't jump\nship to try to maintain the levels, and type, of work I was doing
    before... But\nin a few short months the mission is being drowned out by expectations
    and\nrequirements that are so high I'm losing the grip on my own life.</p>\n<h2
    id=\"open-questions\">Open questions <a class=\"header-anchor\" href=\"#open-questions\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>That leads me to questions
    that I can't answer, the question I ask daily now of\n&quot;What about tomorrow?&quot;.
    What will agents do for us tomorrow, what problems will\nbe solved, what bugs
    will I create (by agents of course because I've never\nwritten a bug by hand in
    my whole life \\s). If I stopped using agents would\npeople still be impressed?
    Would it even matter?</p>\n<h2 id=\"fin\">Fin <a class=\"header-anchor\" href=\"#fin\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm certainly not anti-AI,
    it's typing all my code. I'm not anti-collaboration,\nalthough I do wish I could
    work alone with just my clanker-army to worry about.\nI'm not sure what I am anymore
    though... AI has changed how I work, what I work\non, and who I work with... Everything
    has changed in such a short period of\ntime and like the ending of this post,
    it's pretty jarring.</p>\n<div class=\"admonition danger\">\n<p>Death comes to
    us all - James Acaster.</p>\n</div>\n<p>Thanks for reading.</p>\n\n        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2026-03-26 06:00:50\ntemplateKey: blog-post\ntitle: The Irony
    of 10x\ncover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png\npublished:
    True\ntags:\n  - ai\n  - tech\n  - agents\n  - personal\n---\n\n## Opener\n\nAgentic
    coding has been an exciting change to me over the last couple of months\nspecifically.
    I've been using AI tools for a few years now but something really\nshifted with
    Opus 4.5 as well as the tools/harnesses getting better and more\nuseful around
    the same time. I've been influenced by people like Simon Willison\nand Steve Yegge
    who have been on the forefront of agentic coding and [vibe\nengineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/)
    since the\ndawn of ChatGPT and in my small circles of work I'm definitely on the
    bloodiest\nbleeding edge of the adoption of these practices. Are they the future?
    I don't\nknow - I tried to maintain a skeptical posture but until the bubble pops
    it's\nlooking like this is at least a direction the future of my line of work
    is\ngoing.\n\n!!! danger \"\"\n\n    The tough part is mixing the new world of
    agentic coding with\n    developers on wildly different points in the spectrum
    of adoption and maturity.\n\nHere's a short anecdote about what I mean...\n\nIn
    a new project that I'm on, I've refactored/reimplemented a lot of legacy\ncode,
    producing about 140k lines of code, configuration, and\ndocs in about 2 months.
    It's an insane amount of \"product\" and I've done it\nentirely with agents. But
    I didn't do it with a handful of vanilla chat\nsessions like \"Hey Copilot, reimplement
    this API, no mistakes\". I've been building\nout my own process for using LLMs
    effectively. I have no actual idea besides my\nown experience if what I'm building
    is useful, but it feels pretty good -\nagents for planning, building, reviewing,
    testing, etc. My \"harness\" includes\nspecialized agents and opinionated development
    workflows\nto try to ensure that code is never one-shotted into production.\n\nThe
    catch though is that I'm working with a handful of developers and they are not\nearly-adopters
    or aggressive experimenters with these new agentic tools. Most\nof them are still
    in Steve Yegge's stage 2 or 3 of AI coding as he's outlined\n[in this medium\narticle
    introducing\nGasTown](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04).
    They\nopen a chat session, and say yes or no to Opus. I've been in-between stages\n6
    and 7 for a while now - managing multiple agentic sessions that themselves\nrun
    specialized subagents primarily for context management, although I don't\nfeel
    quite ready for full blown stage 8 (agents running agents running agents).\nSo
    this isn't me saying that I'm\n\"better\" than the guys I'm working with, just
    the project we're on\ntogether is now being touched by people on wildly different
    ends of the agentic\ncoding spectrum, and the project itself is an experiment
    to me of living in the \"New World\".\n\nFinally the anecdote - I'm getting PRs
    from guys in stages 2 and 3,\nthousands of lines of code and config, that I know
    they are not necessarily\nexperts in, but they're producing that code with fairly
    vanilla practices. How\ndo I verify it? I know my own prompts, I know what agents
    generated my code, I know\nthe direction and prodding I gave as they're building,
    but all\nI know in a PR review from someone else is the diff - not how they tested
    it\n(unless of course there's tests, and there must be, but tests are only as
    good\nas the tests are...), not the steering they gave, not the manual UAT validation\nthey
    did, or even the full intent... And ultimately I own the code they merge\nbecause
    chances are I outlast their contract with the team. It's kind of a\nscary thing
    to review and accept... do I trust my\nagentic practices to validate their work?
    Cause I certainly don't trust myself\nto validate it perfectly.\n\n!!! note \"a
    note about contractors\"\n\n    I'm not implying anything about anyone who works
    contract, I think the facts is that contractors are typically dis-incentivized
    to really \"own\" something - an unfortunate consequence of the world.\n\n## This
    is about me, not everyone\n\nI want to make sure to reiterate the context of this
    post and my thoughts -\nit's really about me. I'm not saying anything here is
    true for anyone else, I'm\nnot making predictions about tomorrow, and I'm not
    a prominent FOSS developer or a\nhigh-profile ex-FAANG engineer. I'm not talking
    about every project under the sun.\nI work at a big company, not a fast-paced
    startup. I work on internal tooling,\nnothing that should even be seen outside
    our network. I'm also a self-taught\ndeveloper, not a trained software engineer.\n\nAs
    far as AI goes, lately I'm mostly all in on Github Copilot\nCLI with a sprinkling
    of Opencode. I'm not using Claude Code or Codex which\nseem to have their own
    communities around plugins and usage.\n\nAnd since we're so focused on me right
    now, the important thing to keep as the\nbackdrop for this post is my temperament
    and make-up. I'm definitely made a\ncertain kind of way, not different than every
    single person necessarily, but\ndifferent enough, from enough people, to not blend
    in with the 9-5 guy who can\nlog out and not think about work until the morning
    (I'm not saying that's a\nstrength either, my boundary problems are for another
    time).\n\nI feel an aggressive burden to solve problems and own those solutions,
    call it\nwhite-knighting or a savior complex if you want, but I've got enough
    of a\nreputation at Caterpillar now (and anywhere else I've worked) to become
    a go-to\nperson for more than I think is necessarily appropriate. And with that
    burden\nI'll bring results - if a problem hooks into my brain it. will. be. solved.
    I\nprobably won't do the best most clean-code solution right out of the gate,
    but\nI'll do whatever I can to find a solution.\n\n## Who I was before agents\n\nThat
    is who I was before agents made code easy to produce. My first boss at\nCaterpillar
    used the phrase \"tenacious learner\" to describe me in several\nreviews. I kind
    of rejected the description because I basically refused to\nbelieve that I was
    really any different, any harder of a worker, than my peers.\n\nBut with almost
    a decade of experience in the corporate world, and some adult\nperspective on
    my life, I think it's accurate... I am a harder worker, to my\ndetriment sometimes,
    than a fair number of people I've worked with\\*\\*.\n\nI'm not brilliant but
    I can focus for a long time in the right circumstances.\nThe gift of perseverance
    (or the curse of not being able to let something go,\ndepending on how you look
    at it) has led to blessing in my life in both reward\nand skill.\n\n!!! note \"\\*\\*\"\n\n
    \   There's nothing wrong with it either, Cat's somewhat noticed that work in
    my EOY reviews and I'm certainly not against \"just doing your job\".\n\nAnd then
    AI came along and with another set of the right circumstances\ncatalyzed a new
    way to work.\n\n## Leaning into \"Agentic Engineering\"\n\nI jumped onto experimenting
    with AI coding tools as soon as they became\navailable, but mostly I just tried
    vibe coding rather than using tools for real\nengineering work. I vibed up an
    API at one of my jobs that went into production\nway too early, with far too little
    validation, and it was scary to support it\nfrom then on out. I also did the meme,
    vibe-coded a TODO app, and threw that\npuppy into the internet without locking
    down my API endpoints... That was\nbefore agents were quite as useful as they
    can be\nnow, but that experience along with a handful of other stepping stones
    (like\nlearning some real actual fundamentals about security) began to\ngive me
    confidence in using the AI as a tool, like my IDE is a tool, for\nproducing **solutions**
    that take the form of code.\n\n!!! note \"\"\n\n    As one-shot apps got better
    and better, and as I learned about scoping work\n    more appropriately for agentic
    tools my confidence in them grew.\n\nThere's quite a difference between \"Claude
    make me a todo app, no mistakes\" and\nscoping out a solution in natural language,
    with some technical guardrails, and\nhaving agents tackle the implementation methodically.\n\n##
    What actually changed\n\nWhat's actually changed for me is quite a lot... I haven't
    opened my IDE to\nseriously write code for months now. I've oscillated between
    Opencode and\nCopilot CLI, leaning moreso into Copilot since it's an approved
    tool at work\nand as of mid-February is quite good. Mentally I'm approaching problems
    with a\nlittle more thought on the front-end than before because prior to agents
    I\nwould think as I implemented. At the scale of work that I do, this was really\nfine
    - working on CLI utilities to solve simple problems, developing an\niterative
    testing cycle for each problem that allowed me to move fast, and once\nI found
    a groove I was cooking. But now I don't even need to find it, I open\nOpencode
    or Copilot CLI with my Planner agent, describe what I want to happen and have\nOpus
    or GPT scope out a plan for me. Usually there's some back and forth on\nfeature
    scoping, then I review a markdown file it produces, and once it looks\ndecent
    enough to me I say \"go\" and it goes.\n\nThat works a lot better than I even
    care to admit because at the same time as\nI've been leaning harder into agents,
    I've been building my own harness of\nsorts - not a replacement for Copilot CLI
    or a competitor to Opencode, but\nmoreso an opinionated workflow spine that I
    force agents into to give strict\ngates to the SDLC (software development lifecycle).\n\n!!!
    warning \"Problem Solving Workflows\"\n\n    Plan and implement is fine for a
    lot of things, and I do think it's only getting better. My harness,\n    mentioned
    a few times around here before, called Nexus, is a set of agents and\n    rules
    that I want the code I'll be responsible for to go through before it\n    lands
    in production. That cycle isn't too complex, and there's only about\n    10,000
    similar tools to Nexus on Github trending right now. I've thought about dropping
    my idea and picking up\n    something more popular, like\n    [superpowers](https://www.github.com/obra/superpowers)
    but at the moment I'm\n    continuing to develop on and lean into my own idea
    here.\n\n!!! note \"Mini post on Nexus\"\n\n    I keep saying a blog post is coming,
    but the high level of Nexus is that it's a task\n    tracker with a CLI that agents
    use to advance a ticket through a plan -> build\n    -> test -> review -> verify
    -> merge lifecycle that is almost exactly how I\n    would otherwise have solved
    a problem by hand. I think it needs work, I need to\n    be harder on TDD methodlogies
    with agents, and work on verification gating a\n    bit more (shoutout to [showboat](https://github.com/simonw/showboat)
    by Simon\n    Willison) but overall it's a system of thinking that I already participate
    in\n    so I'm doing my best to farm out specific parts of my workflow to agents
    rather\n    than trying to one-shot enterprise problems and solutions.\n\n!!!
    danger \"Who's doing the thinking?\"\n\n    I've noticed that as I've developed
    Nexus out though, I lean on the agents for\n    more and more of my own thinking,
    and am trusting my problem solving\n    **process** moreso than my actual problem
    solving abilities.\n\n## Hidden costs\n\nThe cost of this increase in speed is
    a lack of familiarity - and the fallout\nof lack of familiarity is hard to express.
    There's also many facets to it.\nFor me, the first facet is that Nexus helps me
    move fast, but as I've leaned\ninto it for more and more of the planning, I'm
    less and less familiar with the\nstate of the code. I find myself asking my reviewer
    agents in fresh sessions\noften to explain it to me, and thankfully they're usually
    consistent, but\nnonetheless I'm still not intimately familiar with the code.
    And on Nexus it's\nnot a big deal, that's low stakes, it's just me and my workflow.\n\nI'm
    using Nexus + Copilot at work and that feels like higher\nstakes... I have my
    agents explain the status of our project and although they're\nalso somewhat consistent
    the thing that's scary is that other people are\nworking on that repo with me,
    and that's where another layer of complexity\nmanifests itself. If it's just me
    and my [[clankers]], let's go all day long,\nrebuild, ask questions, etc... but
    I have other developers I rub shoulders with\nnow, and if they ask me a question
    what am I going to say? \"Hold on, let me prompt\nmy agent for you\" - it's LMGTFY
    on steroids. And the burden becomes if I\nfeel like I can own and support what
    those other developers push into the repo.\n\n## Murky responsibility boundaries\n\nWhy
    do I own their work? Well for the third time, this post is pretty\nself-centered
    and all about me, and my situation is that the other developers I\nwork with presently
    are all contractors. Their work agreement with Cat could\nend at any second, for
    practically any reason. The incentive structure isn't\nthere for these guys who
    technically work for an agency... Their bonuses aren't\nbigger (or even exist)
    if Cat performs well, there's no extra vacation days in\nit for em (aye, contractors
    don't get vacation days anyways), and not that it's\na problem, moreso just the
    nature of the world we're in - but they're basically\nmercenaries out to the highest
    bidder and I happen to know of **multiple times\nwhere Cat lost a good person
    to a higher bidder**.\n\nSo this isn't really me trying to be negative about contractors
    at all, I'm\nhere for a pay-check as well but Cat at least gives me SOME incentive
    to work\nhard with the goal of compensation regardless of how altruistic I feel
    in my\nown circumstances.\n\n!!! note \"Incentive\"\n\n    Better ratings mean
    marginally better end-of-year salary increases, and I've received some other awards
    that certainly give me pause about jumping ship to another long-term place even
    when things can be crazy at Cat.\n\nIt's more than just the contrator-ownership
    dilema, I've dug myself quite a\nhole over the last 8-10 years, gaining a reputation
    that I think many would\nappreciate, but for me only lately increases the stress.
    I don't need to parrot\nevery accolade I've ever received, that's not the point,
    but to make the point\nas clear as I can - I have a lot of respect from quite
    a few people at\nCaterpillar. I'm blessed to have that reputation, and it's not
    like I haven't\nworked hard for it - but people talk about me in a way so flattering
    I feel\nlike the main character in a fictional story sometimes.\n\nIn a fictional
    story I can check out the ending, hit up spark notes, or ask AI\nhow it ends...
    but there isn't an \"end\" in my real world scenario, there's only\ntomorrow and
    I feel the pressure of not knowing what tomorrow holds now more\nthan ever.\n\n!!!
    danger \"\"\n\n    Being noticed is starting to feel more costly than rewarding...\n\n##
    Financial irony\n\nWhat's the cost? It's hard to get specific without writing
    a novel but here's\nthe TLDR - because I've been pretty good at what I do I've
    been able to do this\ntype of work outside my normal 9-5 responsibilities and
    with that extra work\nhas been some pretty great financial benefits. However with
    Cat changes,\nresponsibility increases, and now owning code that others (and their
    clankers)\nwrite, the extra time I gained for myself is eaten-up and has been
    reclaimed by\nthe mega-corp... \"Exceeding expectations\" every year just meant
    the bar is\nraised, the expectations are higher, the time-commitment requirement
    is higher,\nand as I've had to meet the requirements of both the new world and
    the curse of\nbeing noticed, I've lost the time for the extra work... For years
    I've realized\nthe benefit of my own skills and drive, but the irony of agents
    (and a handful\nof other things) is that with the dramatic increase in expectations,
    not only\non me but on those I work with and therefore their output, I don't get
    to\nrealize the benefits of my own gifts anymore.\n\n## Meaning and fatigue\n\nI
    feel very torn because the work I've been called into with Cat is good, I\nsaid
    in [[cat-autonomy-2-0]] that autonomy will save people's lives. I love\ngetting
    to participate in that mission, it's the primary reason I didn't jump\nship to
    try to maintain the levels, and type, of work I was doing before... But\nin a
    few short months the mission is being drowned out by expectations and\nrequirements
    that are so high I'm losing the grip on my own life.\n\n## Open questions\n\nThat
    leads me to questions that I can't answer, the question I ask daily now of\n\"What
    about tomorrow?\". What will agents do for us tomorrow, what problems will\nbe
    solved, what bugs will I create (by agents of course because I've never\nwritten
    a bug by hand in my whole life \\s). If I stopped using agents would\npeople still
    be impressed? Would it even matter?\n\n## Fin\n\nI'm certainly not anti-AI, it's
    typing all my code. I'm not anti-collaboration,\nalthough I do wish I could work
    alone with just my clanker-army to worry about.\nI'm not sure what I am anymore
    though... AI has changed how I work, what I work\non, and who I work with... Everything
    has changed in such a short period of\ntime and like the ending of this post,
    it's pretty jarring.\n\n!!! danger \"\"\n\n    Death comes to us all - James Acaster.\n\nThanks
    for reading.\n"
published: true
slug: the-irony-of-10x
title: The Irony of 10x


---

## Opener

Agentic coding has been an exciting change to me over the last couple of months
specifically. I've been using AI tools for a few years now but something really
shifted with Opus 4.5 as well as the tools/harnesses getting better and more
useful around the same time. I've been influenced by people like Simon Willison
and Steve Yegge who have been on the forefront of agentic coding and [vibe
engineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/) since the
dawn of ChatGPT and in my small circles of work I'm definitely on the bloodiest
bleeding edge of the adoption of these practices. Are they the future? I don't
know - I tried to maintain a skeptical posture but until the bubble pops it's
looking like this is at least a direction the future of my line of work is
going.

!!! danger ""

    The tough part is mixing the new world of agentic coding with
    developers on wildly different points in the spectrum of adoption and maturity.

Here's a short anecdote about what I mean...

In a new project that I'm on, I've refactored/reimplemented a lot of legacy
code, producing about 140k lines of code, configuration, and
docs in about 2 months. It's an insane amount of "product" and I've done it
entirely with agents. But I didn't do it with a handful of vanilla chat
sessions like "Hey Copilot, reimplement this API, no mistakes". I've been building
out my own process for using LLMs effectively. I have no actual idea besides my
own experience if what I'm building is useful, but it feels pretty good -
agents for planning, building, reviewing, testing, etc. My "harness" includes
specialized agents and opinionated development workflows
to try to ensure that code is never one-shotted into production.

The catch though is that I'm working with a handful of developers and they are not
early-adopters or aggressive experimenters with these new agentic tools. Most
of them are still in Steve Yegge's stage 2 or 3 of AI coding as he's outlined
[in this medium
article introducing
GasTown](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04). They
open a chat session, and say yes or no to Opus. I've been in-between stages
6 and 7 for a while now - managing multiple agentic sessions that themselves
run specialized subagents primarily for context management, although I don't
feel quite ready for full blown stage 8 (agents running agents running agents).
So this isn't me saying that I'm
"better" than the guys I'm working with, just the project we're on
together is now being touched by people on wildly different ends of the agentic
coding spectrum, and the project itself is an experiment to me of living in the "New World".

Finally the anecdote - I'm getting PRs from guys in stages 2 and 3,
thousands of lines of code and config, that I know they are not necessarily
experts in, but they're producing that code with fairly vanilla practices. How
do I verify it? I know my own prompts, I know what agents generated my code, I know
the direction and prodding I gave as they're building, but all
I know in a PR review from someone else is the diff - not how they tested it
(unless of course there's tests, and there must be, but tests are only as good
as the tests are...), not the steering they gave, not the manual UAT validation
they did, or even the full intent... And ultimately I own the code they merge
because chances are I outlast their contract with the team. It's kind of a
scary thing to review and accept... do I trust my
agentic practices to validate their work? Cause I certainly don't trust myself
to validate it perfectly.

!!! note "a note about contractors"

    I'm not implying anything about anyone who works contract, I think the facts is that contractors are typically dis-incentivized to really "own" something - an unfortunate consequence of the world.

## This is about me, not everyone

I want to make sure to reiterate the context of this post and my thoughts -
it's really about me. I'm not saying anything here is true for anyone else, I'm
not making predictions about tomorrow, and I'm not a prominent FOSS developer or a
high-profile ex-FAANG engineer. I'm not talking about every project under the sun.
I work at a big company, not a fast-paced startup. I work on internal tooling,
nothing that should even be seen outside our network. I'm also a self-taught
developer, not a trained software engineer.

As far as AI goes, lately I'm mostly all in on Github Copilot
CLI with a sprinkling of Opencode. I'm not using Claude Code or Codex which
seem to have their own communities around plugins and usage.

And since we're so focused on me right now, the important thing to keep as the
backdrop for this post is my temperament and make-up. I'm definitely made a
certain kind of way, not different than every single person necessarily, but
different enough, from enough people, to not blend in with the 9-5 guy who can
log out and not think about work until the morning (I'm not saying that's a
strength either, my boundary problems are for another time).

I feel an aggressive burden to solve problems and own those solutions, call it
white-knighting or a savior complex if you want, but I've got enough of a
reputation at Caterpillar now (and anywhere else I've worked) to become a go-to
person for more than I think is necessarily appropriate. And with that burden
I'll bring results - if a problem hooks into my brain it. will. be. solved. I
probably won't do the best most clean-code solution right out of the gate, but
I'll do whatever I can to find a solution.

## Who I was before agents

That is who I was before agents made code easy to produce. My first boss at
Caterpillar used the phrase "tenacious learner" to describe me in several
reviews. I kind of rejected the description because I basically refused to
believe that I was really any different, any harder of a worker, than my peers.

But with almost a decade of experience in the corporate world, and some adult
perspective on my life, I think it's accurate... I am a harder worker, to my
detriment sometimes, than a fair number of people I've worked with\*\*.

I'm not brilliant but I can focus for a long time in the right circumstances.
The gift of perseverance (or the curse of not being able to let something go,
depending on how you look at it) has led to blessing in my life in both reward
and skill.

!!! note "\*\*"

    There's nothing wrong with it either, Cat's somewhat noticed that work in my EOY reviews and I'm certainly not against "just doing your job".

And then AI came along and with another set of the right circumstances
catalyzed a new way to work.

## Leaning into "Agentic Engineering"

I jumped onto experimenting with AI coding tools as soon as they became
available, but mostly I just tried vibe coding rather than using tools for real
engineering work. I vibed up an API at one of my jobs that went into production
way too early, with far too little validation, and it was scary to support it
from then on out. I also did the meme, vibe-coded a TODO app, and threw that
puppy into the internet without locking down my API endpoints... That was
before agents were quite as useful as they can be
now, but that experience along with a handful of other stepping stones (like
learning some real actual fundamentals about security) began to
give me confidence in using the AI as a tool, like my IDE is a tool, for
producing **solutions** that take the form of code.

!!! note ""

    As one-shot apps got better and better, and as I learned about scoping work
    more appropriately for agentic tools my confidence in them grew.

There's quite a difference between "Claude make me a todo app, no mistakes" and
scoping out a solution in natural language, with some technical guardrails, and
having agents tackle the implementation methodically.

## What actually changed

What's actually changed for me is quite a lot... I haven't opened my IDE to
seriously write code for months now. I've oscillated between Opencode and
Copilot CLI, leaning moreso into Copilot since it's an approved tool at work
and as of mid-February is quite good. Mentally I'm approaching problems with a
little more thought on the front-end than before because prior to agents I
would think as I implemented. At the scale of work that I do, this was really
fine - working on CLI utilities to solve simple problems, developing an
iterative testing cycle for each problem that allowed me to move fast, and once
I found a groove I was cooking. But now I don't even need to find it, I open
Opencode or Copilot CLI with my Planner agent, describe what I want to happen and have
Opus or GPT scope out a plan for me. Usually there's some back and forth on
feature scoping, then I review a markdown file it produces, and once it looks
decent enough to me I say "go" and it goes.

That works a lot better than I even care to admit because at the same time as
I've been leaning harder into agents, I've been building my own harness of
sorts - not a replacement for Copilot CLI or a competitor to Opencode, but
moreso an opinionated workflow spine that I force agents into to give strict
gates to the SDLC (software development lifecycle).

!!! warning "Problem Solving Workflows"

    Plan and implement is fine for a lot of things, and I do think it's only getting better. My harness,
    mentioned a few times around here before, called Nexus, is a set of agents and
    rules that I want the code I'll be responsible for to go through before it
    lands in production. That cycle isn't too complex, and there's only about
    10,000 similar tools to Nexus on Github trending right now. I've thought about dropping my idea and picking up
    something more popular, like
    [superpowers](https://www.github.com/obra/superpowers) but at the moment I'm
    continuing to develop on and lean into my own idea here.

!!! note "Mini post on Nexus"

    I keep saying a blog post is coming, but the high level of Nexus is that it's a task
    tracker with a CLI that agents use to advance a ticket through a plan -> build
    -> test -> review -> verify -> merge lifecycle that is almost exactly how I
    would otherwise have solved a problem by hand. I think it needs work, I need to
    be harder on TDD methodlogies with agents, and work on verification gating a
    bit more (shoutout to [showboat](https://github.com/simonw/showboat) by Simon
    Willison) but overall it's a system of thinking that I already participate in
    so I'm doing my best to farm out specific parts of my workflow to agents rather
    than trying to one-shot enterprise problems and solutions.

!!! danger "Who's doing the thinking?"

    I've noticed that as I've developed Nexus out though, I lean on the agents for
    more and more of my own thinking, and am trusting my problem solving
    **process** moreso than my actual problem solving abilities.

## Hidden costs

The cost of this increase in speed is a lack of familiarity - and the fallout
of lack of familiarity is hard to express. There's also many facets to it.
For me, the first facet is that Nexus helps me move fast, but as I've leaned
into it for more and more of the planning, I'm less and less familiar with the
state of the code. I find myself asking my reviewer agents in fresh sessions
often to explain it to me, and thankfully they're usually consistent, but
nonetheless I'm still not intimately familiar with the code. And on Nexus it's
not a big deal, that's low stakes, it's just me and my workflow.

I'm using Nexus + Copilot at work and that feels like higher
stakes... I have my agents explain the status of our project and although they're
also somewhat consistent the thing that's scary is that other people are
working on that repo with me, and that's where another layer of complexity
manifests itself. If it's just me and my [[clankers]], let's go all day long,
rebuild, ask questions, etc... but I have other developers I rub shoulders with
now, and if they ask me a question what am I going to say? "Hold on, let me prompt
my agent for you" - it's LMGTFY on steroids. And the burden becomes if I
feel like I can own and support what those other developers push into the repo.

## Murky responsibility boundaries

Why do I own their work? Well for the third time, this post is pretty
self-centered and all about me, and my situation is that the other developers I
work with presently are all contractors. Their work agreement with Cat could
end at any second, for practically any reason. The incentive structure isn't
there for these guys who technically work for an agency... Their bonuses aren't
bigger (or even exist) if Cat performs well, there's no extra vacation days in
it for em (aye, contractors don't get vacation days anyways), and not that it's
a problem, moreso just the nature of the world we're in - but they're basically
mercenaries out to the highest bidder and I happen to know of **multiple times
where Cat lost a good person to a higher bidder**.

So this isn't really me trying to be negative about contractors at all, I'm
here for a pay-check as well but Cat at least gives me SOME incentive to work
hard with the goal of compensation regardless of how altruistic I feel in my
own circumstances.

!!! note "Incentive"

    Better ratings mean marginally better end-of-year salary increases, and I've received some other awards that certainly give me pause about jumping ship to another long-term place even when things can be crazy at Cat.

It's more than just the contrator-ownership dilema, I've dug myself quite a
hole over the last 8-10 years, gaining a reputation that I think many would
appreciate, but for me only lately increases the stress. I don't need to parrot
every accolade I've ever received, that's not the point, but to make the point
as clear as I can - I have a lot of respect from quite a few people at
Caterpillar. I'm blessed to have that reputation, and it's not like I haven't
worked hard for it - but people talk about me in a way so flattering I feel
like the main character in a fictional story sometimes.

In a fictional story I can check out the ending, hit up spark notes, or ask AI
how it ends... but there isn't an "end" in my real world scenario, there's only
tomorrow and I feel the pressure of not knowing what tomorrow holds now more
than ever.

!!! danger ""

    Being noticed is starting to feel more costly than rewarding...

## Financial irony

What's the cost? It's hard to get specific without writing a novel but here's
the TLDR - because I've been pretty good at what I do I've been able to do this
type of work outside my normal 9-5 responsibilities and with that extra work
has been some pretty great financial benefits. However with Cat changes,
responsibility increases, and now owning code that others (and their clankers)
write, the extra time I gained for myself is eaten-up and has been reclaimed by
the mega-corp... "Exceeding expectations" every year just meant the bar is
raised, the expectations are higher, the time-commitment requirement is higher,
and as I've had to meet the requirements of both the new world and the curse of
being noticed, I've lost the time for the extra work... For years I've realized
the benefit of my own skills and drive, but the irony of agents (and a handful
of other things) is that with the dramatic increase in expectations, not only
on me but on those I work with and therefore their output, I don't get to
realize the benefits of my own gifts anymore.

## Meaning and fatigue

I feel very torn because the work I've been called into with Cat is good, I
said in [[cat-autonomy-2-0]] that autonomy will save people's lives. I love
getting to participate in that mission, it's the primary reason I didn't jump
ship to try to maintain the levels, and type, of work I was doing before... But
in a few short months the mission is being drowned out by expectations and
requirements that are so high I'm losing the grip on my own life.

## Open questions

That leads me to questions that I can't answer, the question I ask daily now of
"What about tomorrow?". What will agents do for us tomorrow, what problems will
be solved, what bugs will I create (by agents of course because I've never
written a bug by hand in my whole life \s). If I stopped using agents would
people still be impressed? Would it even matter?

## Fin

I'm certainly not anti-AI, it's typing all my code. I'm not anti-collaboration,
although I do wish I could work alone with just my clanker-army to worry about.
I'm not sure what I am anymore though... AI has changed how I work, what I work
on, and who I work with... Everything has changed in such a short period of
time and like the ending of this post, it's pretty jarring.

!!! danger ""

    Death comes to us all - James Acaster.

Thanks for reading.