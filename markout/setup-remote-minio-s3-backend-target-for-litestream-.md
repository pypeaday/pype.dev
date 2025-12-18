---
content: "## Intro\n\nI am starting to think through some patterns for replicating
  sqlite databases,\nexploring them, standardizing on schemas/models I use across
  projects, etc...\nThanks to [Waylon](https://waylonwalker.com) I know about [[litestream]]
  and\nfinally I started playing with it. Their\n[quickstart](https://litestream.io/getting-started/)
  is good, but it assumes\nyou'll run MinIO on the same machine you run litestream
  on.\n\nI, however, have MinIO setup in my homelab with the api endpoint accessible
  via\nDNS - `s3.mydomain.com`.\n\nBefore starting - I realize I left the credential
  aspect out - Litestream\nexplains how to setup API keys in MinIO for their application\n[here](https://litestream.io/getting-started/#setting-up-minio)\n\nBasically
  after generating the keys I set `LITESTREAM_ACCESS_KEY_ID` and `LITESTREAM_SECRET_ACCESS_KEY`
  as env vars\n\nSo let's see what happens and then get to [the fix]\n\n\n```\n\u2B22
  [devbox] \u276F litestream replicate quadtask-prod.db s3://s3.example.com/litestream/qt.db
  \   \n2025/08/05 08:50:09 INFO litestream version=v0.3.13\n2025/08/05 08:50:09 INFO
  initialized db path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n2025/08/05
  08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
  path=litestream/qt.db region=\"\" endpoint=\"\"\n2025/08/05 08:50:10 INFO sync:
  new generation db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  generation=209692854ccd85d5 reason=\"no generation exists\"\n2025/08/05 08:50:10
  ERROR monitor error db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=s3 error=\"cannot lookup bucket region: InvalidAccessKeyId: The AWS Access
  Key Id you provided does not exist in our records.\\n\\tstatus code: 403, request
  id: ERHZD4RD61Y8ADMD, host id: dOjPn5j8Oa+mkwOqROXDvCdKNxzxG0B8JJOPtGXDZA7qKxwAWqaSXhGYzK2mkoJQV7hJhaoJcag=\"\n\n```\n\nSo
  that `403` is pretty simple... my login is wrong... but wait...\n\n`2025/08/05 08:50:09
  INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com path=litestream/qt.db
  region=\"\" endpoint=\"\"`\n\nNotice this line - `endpoint=\"\"`... so `s3://s3.example.com`
  was not the right replacement for `s3://mybkt.localhost:9000/target.db`. Also the
  inferred `bucket` is the entire `s3.example.com`... \n\nOh! Well I didn't specify
  a bucket in the subdomain - I did it with a route on the URL... \n\nok let's try
  `litestream replicate quadtask-prod.db s3://litestream.example.com/qt.db`\n\nWe
  got the same kind of error...\n\n`2025/08/05 08:53:45 INFO replicating to name=s3
  type=s3 sync-interval=1s bucket=litestream.example.com path=qt.db region=\"\" endpoint=\"\"`\n\nThis
  time the inferred bucket was `litestream.example.com`... ok that's consistent with
  above as well - so the endpoint is still wrong/null and the bucket inference is
  wrong...\n\nTurns out for Litestream, and probably many other tools that use s3-compatible
  storage, that there's an inference problem if the configuration leans on the shorthand
  `s3://` - [see this GitHub issue](https://github.com/benbjohnson/litestream/issues/398)
  and [this one about localhost](https://github.com/benbjohnson/litestream/issues/219).
  There's a few options for using your own `s3.mydomain.example`.\n\n## The Fix\n\nIf
  you're familiar with the `awscli` then maybe you've heard of a config option `AWS_S3_ENDPOINT_URL`
  which allows you to use the boto sdk with s3-compatibile resources while still using
  the `s3://` shorthand. Litestream has a way to set this configuration right on config:\n\n```yaml\ndbs:\n
  \ - path: /home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n
  \   replicas:\n      - type: s3\n        bucket: litestream\n        endpoint: s3.example.com
  \ # <---- right here!\n        skip-verify: true  # set to false if you have TLS
  and want more security\n        # note you acn set these sensitive values as env
  vars per the Litestream Quickstart\n        # access-key-id: <ACCESS-KEY-ID>\n        #
  secret-access-key: <SECRET-ACCESS-KEY>\n```\n\n???+ danger \"UPDATE\"\n\n    I added
  a `path` key to give the backups a folder basically on s3, so under \"bucket: listream\"
  I have \"path: <my desired path>\"\n\nSo with that config in place we can actually
  JUST `litestream replicate` from anywhere...\n\n```bash\n\u2B22 [devbox] \u276F
  litestream replicate                                                      \ntime=2025-08-05T08:56:11.353-05:00
  level=INFO msg=litestream version=v0.3.13\ntime=2025-08-05T08:56:11.353-05:00 level=INFO
  msg=\"initialized db\" path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\ntime=2025-08-05T08:56:11.353-05:00
  level=INFO msg=\"replicating to\" name=s3 type=s3 sync-interval=1s bucket=litestream
  path=\"\" region=\"\" endpoint=s3.example.com\ntime=2025-08-05T08:56:12.399-05:00
  level=INFO msg=\"write snapshot\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=s3 position=209692854ccd85d5/00000000:4152\ntime=2025-08-05T08:56:12.489-05:00
  level=INFO msg=\"snapshot written\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=s3 position=209692854ccd85d5/00000000:4152 elapsed=89.994626ms sz=909437\ntime=2025-08-05T08:56:12.492-05:00
  level=INFO msg=\"write wal segment\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=s3 position=209692854ccd85d5/00000000:0\ntime=2025-08-05T08:56:12.510-05:00
  level=INFO msg=\"wal segment written\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=s3 position=209692854ccd85d5/00000000:0 elapsed=17.572784ms sz=4152\n```\n\n!!!
  success \"It works!\"\n    \n    Notice that the endpoint is properly s3.example.com,
  and the bucket is litestream (the name of my taret bucket in MinIO)\n\n> You can
  use a local config with `-c config.yaml` or something if you want to avoid the global
  `/etc/litestream.yml`\n\n## What About Restore?\n\nShould work just fine... Let's
  move the database on my host and see if I can use litestream to restore it\n\n```\nnic
  in quadtask/litestream  \uE725 database-clean-up  \uE79B \xD721 \uF6C1 \xD72 \uF21B
  \xD79 via \uE235  v3.11.10(quadtask)  \uF427 (dev) \U000F0484 \n\u2B22 [devbox]
  \u276F mv ./source/quadtask-prod.db ./source/quadtask-prod.db.backup                 \n\nnic
  in quadtask/litestream  \uE725 database-clean-up  \uE79B \xD721 \uF6C1 \xD72 \uF21B
  \xD79 via \uE235  v3.11.10(quadtask)  \uF427 (dev) \U000F0484 \n\u2B22 [devbox]
  \u276F litestream restore ./source/quadtask-prod.db              \ntime=2025-08-05T09:06:25.826-05:00
  level=INFO msg=\"restoring snapshot\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db.tmp\ntime=2025-08-05T09:06:25.843-05:00
  level=INFO msg=\"restoring wal files\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:06:25.845-05:00
  level=INFO msg=\"downloaded wal\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.103514ms\ntime=2025-08-05T09:06:25.856-05:00
  level=INFO msg=\"applied wal\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=10.871034ms\ntime=2025-08-05T09:06:25.856-05:00
  level=INFO msg=\"renaming database from temporary location\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod\n\n```\n\nThe command `litestream restore <db path>` was confusing
  at first because I was trying to replicate to a new place, but couldn't get the
  config to line up. The general understanding here is DR I believe - so the configuration
  is relatively static and when you `restore` you are restoring a specific database,
  not just standing up a copy from a backup... \n\n!!! note \"But would we setup a
  copy from a backup?\"\n\n    ie. restore to a different file?\n\nYes, but it's confusing
  - at least it was to me... it looks to me like litestream uses the path of a db
  as the identifier in the config, and you reference the config not by an object's
  name (if it has one) but by the `path`...\n\nSo the command is `litestream restore
  -o <output path> <db path>`. This makes sense in light of the fact that the configuration
  is relative to this host - so `<db path>` being the path of the source db whose
  backup you are restoring from to `<output path>` makes some amount of sense... if
  I wanted to replicate to another machine, then THAT machine would need `/etc/litestream.yaml`
  and if the filesystem hierarchy was different then an appropriate `path` for the
  \"source\" of the db to replicate back to.\n\n```\n\u2B22 [devbox] \u276F litestream
  restore -o /tmp/db ./source/quadtask-prod.db          \ntime=2025-08-05T09:09:04.784-05:00
  level=INFO msg=\"restoring snapshot\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/tmp/db.tmp\ntime=2025-08-05T09:09:04.797-05:00
  level=INFO msg=\"restoring wal files\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:09:04.799-05:00
  level=INFO msg=\"downloaded wal\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.128594ms\ntime=2025-08-05T09:09:04.800-05:00
  level=INFO msg=\"applied wal\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=610.75\xB5s\ntime=2025-08-05T09:09:04.800-05:00
  level=INFO msg=\"renaming database from temporary location\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
  replica=quadtask-prod\n\n```"
date: 2025-08-05
description: 'Intro I am starting to think through some patterns for replicating sqlite
  databases,

  exploring them, standardizing on schemas/models I use across projects, etc.'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Setup Remote MinIO
    S3 Backend Target for Litestream</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Intro I am starting to think through some patterns for replicating sqlite
    databases,\nexploring them, standardizing on schemas/models I use across projects,
    etc.\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Setup Remote MinIO S3 Backend Target for Litestream
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/setup-remote-minio-s3-backend-target-for-litestream\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Setup Remote MinIO S3 Backend Target for Litestream | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"Intro I am starting to think through some
    patterns for replicating sqlite databases,\nexploring them, standardizing on schemas/models
    I use across projects, etc.\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"
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
    \           <span class=\"site-terminal__dir\">~/setup-remote-minio-s3-backend-target-for-litestream</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n        <div
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"
    alt=\"Setup Remote MinIO S3 Backend Target for Litestream cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Setup
    Remote MinIO S3 Backend Target for Litestream</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-05\">\n            August
    05, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/litestream/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #litestream\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"intro\">Intro <a class=\"header-anchor\"
    href=\"#intro\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I am starting to think
    through some patterns for replicating sqlite databases,\nexploring them, standardizing
    on schemas/models I use across projects, etc...\nThanks to <a href=\"https://waylonwalker.com\">Waylon</a>
    I know about <a class=\"wikilink\" href=\"/litestream\">litestream</a> and\nfinally
    I started playing with it. Their\n<a href=\"https://litestream.io/getting-started/\">quickstart</a>
    is good, but it assumes\nyou'll run MinIO on the same machine you run litestream
    on.</p>\n<p>I, however, have MinIO setup in my homelab with the api endpoint accessible
    via\nDNS - <code>s3.mydomain.com</code>.</p>\n<p>Before starting - I realize I
    left the credential aspect out - Litestream\nexplains how to setup API keys in
    MinIO for their application\n<a href=\"https://litestream.io/getting-started/#setting-up-minio\">here</a></p>\n<p>Basically
    after generating the keys I set <code>LITESTREAM_ACCESS_KEY_ID</code> and <code>LITESTREAM_SECRET_ACCESS_KEY</code>
    as env vars</p>\n<p>So let's see what happens and then get to [the fix]</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22 [devbox] \u276F litestream
    replicate quadtask-prod.db s3://s3.example.com/litestream/qt.db    \n2025/08/05
    08:50:09 INFO litestream version=v0.3.13\n2025/08/05 08:50:09 INFO initialized
    db path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n2025/08/05
    08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
    path=litestream/qt.db region=&quot;&quot; endpoint=&quot;&quot;\n2025/08/05 08:50:10
    INFO sync: new generation db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    generation=209692854ccd85d5 reason=&quot;no generation exists&quot;\n2025/08/05
    08:50:10 ERROR monitor error db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=s3 error=&quot;cannot lookup bucket region: InvalidAccessKeyId: The AWS
    Access Key Id you provided does not exist in our records.\\n\\tstatus code: 403,
    request id: ERHZD4RD61Y8ADMD, host id: dOjPn5j8Oa+mkwOqROXDvCdKNxzxG0B8JJOPtGXDZA7qKxwAWqaSXhGYzK2mkoJQV7hJhaoJcag=&quot;\n</pre></div>\n\n</pre>\n\n<p>So
    that <code>403</code> is pretty simple... my login is wrong... but wait...</p>\n<p><code>2025/08/05
    08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
    path=litestream/qt.db region=&quot;&quot; endpoint=&quot;&quot;</code></p>\n<p>Notice
    this line - <code>endpoint=&quot;&quot;</code>... so <code>s3://s3.example.com</code>
    was not the right replacement for <code>s3://mybkt.localhost:9000/target.db</code>.
    Also the inferred <code>bucket</code> is the entire <code>s3.example.com</code>...</p>\n<p>Oh!
    Well I didn't specify a bucket in the subdomain - I did it with a route on the
    URL...</p>\n<p>ok let's try <code>litestream replicate quadtask-prod.db s3://litestream.example.com/qt.db</code></p>\n<p>We
    got the same kind of error...</p>\n<p><code>2025/08/05 08:53:45 INFO replicating
    to name=s3 type=s3 sync-interval=1s bucket=litestream.example.com path=qt.db region=&quot;&quot;
    endpoint=&quot;&quot;</code></p>\n<p>This time the inferred bucket was <code>litestream.example.com</code>...
    ok that's consistent with above as well - so the endpoint is still wrong/null
    and the bucket inference is wrong...</p>\n<p>Turns out for Litestream, and probably
    many other tools that use s3-compatible storage, that there's an inference problem
    if the configuration leans on the shorthand <code>s3://</code> - <a href=\"https://github.com/benbjohnson/litestream/issues/398\">see
    this GitHub issue</a> and <a href=\"https://github.com/benbjohnson/litestream/issues/219\">this
    one about localhost</a>. There's a few options for using your own <code>s3.mydomain.example</code>.</p>\n<h2
    id=\"the-fix\">The Fix <a class=\"header-anchor\" href=\"#the-fix\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If you're familiar with
    the <code>awscli</code> then maybe you've heard of a config option <code>AWS_S3_ENDPOINT_URL</code>
    which allows you to use the boto sdk with s3-compatibile resources while still
    using the <code>s3://</code> shorthand. Litestream has a way to set this configuration
    right on config:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">dbs</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"nt\">path</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db</span>\n<span
    class=\"w\">    </span><span class=\"nt\">replicas</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"nt\">type</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">s3</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">bucket</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">litestream</span>\n<span
    class=\"w\">        </span><span class=\"nt\">endpoint</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">s3.example.com</span><span
    class=\"w\">  </span><span class=\"c1\"># &lt;---- right here!</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">skip-verify</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span><span
    class=\"w\">  </span><span class=\"c1\"># set to false if you have TLS and want
    more security</span>\n<span class=\"w\">        </span><span class=\"c1\"># note
    you acn set these sensitive values as env vars per the Litestream Quickstart</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># access-key-id: &lt;ACCESS-KEY-ID&gt;</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># secret-access-key: &lt;SECRET-ACCESS-KEY&gt;</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition danger is-collapsible collapsible-open\">\n<p class=\"admonition-title\">UPDATE</p>\n<p>I
    added a <code>path</code> key to give the backups a folder basically on s3, so
    under &quot;bucket: listream&quot; I have &quot;path: <my desired path>&quot;</p>\n</div>\n<p>So
    with that config in place we can actually JUST <code>litestream replicate</code>
    from anywhere...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22<span class=\"w\">
    </span><span class=\"o\">[</span>devbox<span class=\"o\">]</span><span class=\"w\">
    </span>\u276F<span class=\"w\"> </span>litestream<span class=\"w\"> </span>replicate<span
    class=\"w\">                                                      </span>\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span>litestream<span
    class=\"w\"> </span><span class=\"nv\">version</span><span class=\"o\">=</span>v0.3.13\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;initialized db&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">path</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;replicating to&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">name</span><span class=\"o\">=</span>s3<span class=\"w\"> </span><span
    class=\"nv\">type</span><span class=\"o\">=</span>s3<span class=\"w\"> </span>sync-interval<span
    class=\"o\">=</span>1s<span class=\"w\"> </span><span class=\"nv\">bucket</span><span
    class=\"o\">=</span>litestream<span class=\"w\"> </span><span class=\"nv\">path</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">region</span><span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">endpoint</span><span class=\"o\">=</span>s3.example.com\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.399-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;write snapshot&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:4152\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.489-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;snapshot written&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:4152<span
    class=\"w\"> </span><span class=\"nv\">elapsed</span><span class=\"o\">=</span><span
    class=\"m\">89</span>.994626ms<span class=\"w\"> </span><span class=\"nv\">sz</span><span
    class=\"o\">=</span><span class=\"m\">909437</span>\n<span class=\"nv\">time</span><span
    class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.492-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;write wal segment&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:0\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.510-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;wal segment written&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:0<span
    class=\"w\"> </span><span class=\"nv\">elapsed</span><span class=\"o\">=</span><span
    class=\"m\">17</span>.572784ms<span class=\"w\"> </span><span class=\"nv\">sz</span><span
    class=\"o\">=</span><span class=\"m\">4152</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition success\">\n<p class=\"admonition-title\">It works!</p>\n<p>Notice
    that the endpoint is properly <a href=\"http://s3.example.com\">s3.example.com</a>,
    and the bucket is litestream (the name of my taret bucket in MinIO)</p>\n</div>\n<blockquote>\n<p>You
    can use a local config with <code>-c config.yaml</code> or something if you want
    to avoid the global <code>/etc/litestream.yml</code></p>\n</blockquote>\n<h2 id=\"what-about-restore\">What
    About Restore? <a class=\"header-anchor\" href=\"#what-about-restore\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Should work just fine...
    Let's move the database on my host and see if I can use litestream to restore
    it</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in quadtask/litestream
    \ \uE725 database-clean-up  \uE79B \xD721 \uF6C1 \xD72 \uF21B \xD79 via \uE235
    \ v3.11.10(quadtask)  \uF427 (dev) \U000F0484 \n\u2B22 [devbox] \u276F mv ./source/quadtask-prod.db
    ./source/quadtask-prod.db.backup                 \n\nnic in quadtask/litestream
    \ \uE725 database-clean-up  \uE79B \xD721 \uF6C1 \xD72 \uF21B \xD79 via \uE235
    \ v3.11.10(quadtask)  \uF427 (dev) \U000F0484 \n\u2B22 [devbox] \u276F litestream
    restore ./source/quadtask-prod.db              \ntime=2025-08-05T09:06:25.826-05:00
    level=INFO msg=&quot;restoring snapshot&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db.tmp\ntime=2025-08-05T09:06:25.843-05:00
    level=INFO msg=&quot;restoring wal files&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:06:25.845-05:00
    level=INFO msg=&quot;downloaded wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.103514ms\ntime=2025-08-05T09:06:25.856-05:00
    level=INFO msg=&quot;applied wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=10.871034ms\ntime=2025-08-05T09:06:25.856-05:00
    level=INFO msg=&quot;renaming database from temporary location&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod\n</pre></div>\n\n</pre>\n\n<p>The command <code>litestream
    restore &lt;db path&gt;</code> was confusing at first because I was trying to
    replicate to a new place, but couldn't get the config to line up. The general
    understanding here is DR I believe - so the configuration is relatively static
    and when you <code>restore</code> you are restoring a specific database, not just
    standing up a copy from a backup...</p>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">But
    would we setup a copy from a backup?</p>\n<p>ie. restore to a different file?</p>\n</div>\n<p>Yes,
    but it's confusing - at least it was to me... it looks to me like litestream uses
    the path of a db as the identifier in the config, and you reference the config
    not by an object's name (if it has one) but by the <code>path</code>...</p>\n<p>So
    the command is <code>litestream restore -o &lt;output path&gt; &lt;db path&gt;</code>.
    This makes sense in light of the fact that the configuration is relative to this
    host - so <code>&lt;db path&gt;</code> being the path of the source db whose backup
    you are restoring from to <code>&lt;output path&gt;</code> makes some amount of
    sense... if I wanted to replicate to another machine, then THAT machine would
    need <code>/etc/litestream.yaml</code> and if the filesystem hierarchy was different
    then an appropriate <code>path</code> for the &quot;source&quot; of the db to
    replicate back to.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22 [devbox] \u276F litestream
    restore -o /tmp/db ./source/quadtask-prod.db          \ntime=2025-08-05T09:09:04.784-05:00
    level=INFO msg=&quot;restoring snapshot&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/tmp/db.tmp\ntime=2025-08-05T09:09:04.797-05:00
    level=INFO msg=&quot;restoring wal files&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:09:04.799-05:00
    level=INFO msg=&quot;downloaded wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.128594ms\ntime=2025-08-05T09:09:04.800-05:00
    level=INFO msg=&quot;applied wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=610.75\xB5s\ntime=2025-08-05T09:09:04.800-05:00
    level=INFO msg=&quot;renaming database from temporary location&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Setup Remote MinIO
    S3 Backend Target for Litestream</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Intro I am starting to think through some patterns for replicating sqlite
    databases,\nexploring them, standardizing on schemas/models I use across projects,
    etc.\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Setup Remote MinIO S3 Backend Target for Litestream
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/setup-remote-minio-s3-backend-target-for-litestream\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Setup Remote MinIO S3 Backend Target for Litestream | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"Intro I am starting to think through some
    patterns for replicating sqlite databases,\nexploring them, standardizing on schemas/models
    I use across projects, etc.\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"
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
    mb-4 post-title-large\">Setup Remote MinIO S3 Backend Target for Litestream</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2025-08-05\">\n            August 05, 2025\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/litestream/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #litestream\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n    </div>\n</section></article>\n
    \    </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"
    alt=\"Setup Remote MinIO S3 Backend Target for Litestream cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Setup
    Remote MinIO S3 Backend Target for Litestream</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-05\">\n            August
    05, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/litestream/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #litestream\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"intro\">Intro <a class=\"header-anchor\"
    href=\"#intro\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I am starting to think
    through some patterns for replicating sqlite databases,\nexploring them, standardizing
    on schemas/models I use across projects, etc...\nThanks to <a href=\"https://waylonwalker.com\">Waylon</a>
    I know about <a class=\"wikilink\" href=\"/litestream\">litestream</a> and\nfinally
    I started playing with it. Their\n<a href=\"https://litestream.io/getting-started/\">quickstart</a>
    is good, but it assumes\nyou'll run MinIO on the same machine you run litestream
    on.</p>\n<p>I, however, have MinIO setup in my homelab with the api endpoint accessible
    via\nDNS - <code>s3.mydomain.com</code>.</p>\n<p>Before starting - I realize I
    left the credential aspect out - Litestream\nexplains how to setup API keys in
    MinIO for their application\n<a href=\"https://litestream.io/getting-started/#setting-up-minio\">here</a></p>\n<p>Basically
    after generating the keys I set <code>LITESTREAM_ACCESS_KEY_ID</code> and <code>LITESTREAM_SECRET_ACCESS_KEY</code>
    as env vars</p>\n<p>So let's see what happens and then get to [the fix]</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22 [devbox] \u276F litestream
    replicate quadtask-prod.db s3://s3.example.com/litestream/qt.db    \n2025/08/05
    08:50:09 INFO litestream version=v0.3.13\n2025/08/05 08:50:09 INFO initialized
    db path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n2025/08/05
    08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
    path=litestream/qt.db region=&quot;&quot; endpoint=&quot;&quot;\n2025/08/05 08:50:10
    INFO sync: new generation db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    generation=209692854ccd85d5 reason=&quot;no generation exists&quot;\n2025/08/05
    08:50:10 ERROR monitor error db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=s3 error=&quot;cannot lookup bucket region: InvalidAccessKeyId: The AWS
    Access Key Id you provided does not exist in our records.\\n\\tstatus code: 403,
    request id: ERHZD4RD61Y8ADMD, host id: dOjPn5j8Oa+mkwOqROXDvCdKNxzxG0B8JJOPtGXDZA7qKxwAWqaSXhGYzK2mkoJQV7hJhaoJcag=&quot;\n</pre></div>\n\n</pre>\n\n<p>So
    that <code>403</code> is pretty simple... my login is wrong... but wait...</p>\n<p><code>2025/08/05
    08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
    path=litestream/qt.db region=&quot;&quot; endpoint=&quot;&quot;</code></p>\n<p>Notice
    this line - <code>endpoint=&quot;&quot;</code>... so <code>s3://s3.example.com</code>
    was not the right replacement for <code>s3://mybkt.localhost:9000/target.db</code>.
    Also the inferred <code>bucket</code> is the entire <code>s3.example.com</code>...</p>\n<p>Oh!
    Well I didn't specify a bucket in the subdomain - I did it with a route on the
    URL...</p>\n<p>ok let's try <code>litestream replicate quadtask-prod.db s3://litestream.example.com/qt.db</code></p>\n<p>We
    got the same kind of error...</p>\n<p><code>2025/08/05 08:53:45 INFO replicating
    to name=s3 type=s3 sync-interval=1s bucket=litestream.example.com path=qt.db region=&quot;&quot;
    endpoint=&quot;&quot;</code></p>\n<p>This time the inferred bucket was <code>litestream.example.com</code>...
    ok that's consistent with above as well - so the endpoint is still wrong/null
    and the bucket inference is wrong...</p>\n<p>Turns out for Litestream, and probably
    many other tools that use s3-compatible storage, that there's an inference problem
    if the configuration leans on the shorthand <code>s3://</code> - <a href=\"https://github.com/benbjohnson/litestream/issues/398\">see
    this GitHub issue</a> and <a href=\"https://github.com/benbjohnson/litestream/issues/219\">this
    one about localhost</a>. There's a few options for using your own <code>s3.mydomain.example</code>.</p>\n<h2
    id=\"the-fix\">The Fix <a class=\"header-anchor\" href=\"#the-fix\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If you're familiar with
    the <code>awscli</code> then maybe you've heard of a config option <code>AWS_S3_ENDPOINT_URL</code>
    which allows you to use the boto sdk with s3-compatibile resources while still
    using the <code>s3://</code> shorthand. Litestream has a way to set this configuration
    right on config:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">dbs</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"nt\">path</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db</span>\n<span
    class=\"w\">    </span><span class=\"nt\">replicas</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"nt\">type</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">s3</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">bucket</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">litestream</span>\n<span
    class=\"w\">        </span><span class=\"nt\">endpoint</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">s3.example.com</span><span
    class=\"w\">  </span><span class=\"c1\"># &lt;---- right here!</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">skip-verify</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span><span
    class=\"w\">  </span><span class=\"c1\"># set to false if you have TLS and want
    more security</span>\n<span class=\"w\">        </span><span class=\"c1\"># note
    you acn set these sensitive values as env vars per the Litestream Quickstart</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># access-key-id: &lt;ACCESS-KEY-ID&gt;</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># secret-access-key: &lt;SECRET-ACCESS-KEY&gt;</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition danger is-collapsible collapsible-open\">\n<p class=\"admonition-title\">UPDATE</p>\n<p>I
    added a <code>path</code> key to give the backups a folder basically on s3, so
    under &quot;bucket: listream&quot; I have &quot;path: <my desired path>&quot;</p>\n</div>\n<p>So
    with that config in place we can actually JUST <code>litestream replicate</code>
    from anywhere...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22<span class=\"w\">
    </span><span class=\"o\">[</span>devbox<span class=\"o\">]</span><span class=\"w\">
    </span>\u276F<span class=\"w\"> </span>litestream<span class=\"w\"> </span>replicate<span
    class=\"w\">                                                      </span>\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span>litestream<span
    class=\"w\"> </span><span class=\"nv\">version</span><span class=\"o\">=</span>v0.3.13\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;initialized db&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">path</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;replicating to&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">name</span><span class=\"o\">=</span>s3<span class=\"w\"> </span><span
    class=\"nv\">type</span><span class=\"o\">=</span>s3<span class=\"w\"> </span>sync-interval<span
    class=\"o\">=</span>1s<span class=\"w\"> </span><span class=\"nv\">bucket</span><span
    class=\"o\">=</span>litestream<span class=\"w\"> </span><span class=\"nv\">path</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">region</span><span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">endpoint</span><span class=\"o\">=</span>s3.example.com\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.399-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;write snapshot&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:4152\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.489-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;snapshot written&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:4152<span
    class=\"w\"> </span><span class=\"nv\">elapsed</span><span class=\"o\">=</span><span
    class=\"m\">89</span>.994626ms<span class=\"w\"> </span><span class=\"nv\">sz</span><span
    class=\"o\">=</span><span class=\"m\">909437</span>\n<span class=\"nv\">time</span><span
    class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.492-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;write wal segment&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:0\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.510-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;wal segment written&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:0<span
    class=\"w\"> </span><span class=\"nv\">elapsed</span><span class=\"o\">=</span><span
    class=\"m\">17</span>.572784ms<span class=\"w\"> </span><span class=\"nv\">sz</span><span
    class=\"o\">=</span><span class=\"m\">4152</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition success\">\n<p class=\"admonition-title\">It works!</p>\n<p>Notice
    that the endpoint is properly <a href=\"http://s3.example.com\">s3.example.com</a>,
    and the bucket is litestream (the name of my taret bucket in MinIO)</p>\n</div>\n<blockquote>\n<p>You
    can use a local config with <code>-c config.yaml</code> or something if you want
    to avoid the global <code>/etc/litestream.yml</code></p>\n</blockquote>\n<h2 id=\"what-about-restore\">What
    About Restore? <a class=\"header-anchor\" href=\"#what-about-restore\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Should work just fine...
    Let's move the database on my host and see if I can use litestream to restore
    it</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in quadtask/litestream
    \ \uE725 database-clean-up  \uE79B \xD721 \uF6C1 \xD72 \uF21B \xD79 via \uE235
    \ v3.11.10(quadtask)  \uF427 (dev) \U000F0484 \n\u2B22 [devbox] \u276F mv ./source/quadtask-prod.db
    ./source/quadtask-prod.db.backup                 \n\nnic in quadtask/litestream
    \ \uE725 database-clean-up  \uE79B \xD721 \uF6C1 \xD72 \uF21B \xD79 via \uE235
    \ v3.11.10(quadtask)  \uF427 (dev) \U000F0484 \n\u2B22 [devbox] \u276F litestream
    restore ./source/quadtask-prod.db              \ntime=2025-08-05T09:06:25.826-05:00
    level=INFO msg=&quot;restoring snapshot&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db.tmp\ntime=2025-08-05T09:06:25.843-05:00
    level=INFO msg=&quot;restoring wal files&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:06:25.845-05:00
    level=INFO msg=&quot;downloaded wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.103514ms\ntime=2025-08-05T09:06:25.856-05:00
    level=INFO msg=&quot;applied wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=10.871034ms\ntime=2025-08-05T09:06:25.856-05:00
    level=INFO msg=&quot;renaming database from temporary location&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod\n</pre></div>\n\n</pre>\n\n<p>The command <code>litestream
    restore &lt;db path&gt;</code> was confusing at first because I was trying to
    replicate to a new place, but couldn't get the config to line up. The general
    understanding here is DR I believe - so the configuration is relatively static
    and when you <code>restore</code> you are restoring a specific database, not just
    standing up a copy from a backup...</p>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">But
    would we setup a copy from a backup?</p>\n<p>ie. restore to a different file?</p>\n</div>\n<p>Yes,
    but it's confusing - at least it was to me... it looks to me like litestream uses
    the path of a db as the identifier in the config, and you reference the config
    not by an object's name (if it has one) but by the <code>path</code>...</p>\n<p>So
    the command is <code>litestream restore -o &lt;output path&gt; &lt;db path&gt;</code>.
    This makes sense in light of the fact that the configuration is relative to this
    host - so <code>&lt;db path&gt;</code> being the path of the source db whose backup
    you are restoring from to <code>&lt;output path&gt;</code> makes some amount of
    sense... if I wanted to replicate to another machine, then THAT machine would
    need <code>/etc/litestream.yaml</code> and if the filesystem hierarchy was different
    then an appropriate <code>path</code> for the &quot;source&quot; of the db to
    replicate back to.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22 [devbox] \u276F litestream
    restore -o /tmp/db ./source/quadtask-prod.db          \ntime=2025-08-05T09:09:04.784-05:00
    level=INFO msg=&quot;restoring snapshot&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/tmp/db.tmp\ntime=2025-08-05T09:09:04.797-05:00
    level=INFO msg=&quot;restoring wal files&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:09:04.799-05:00
    level=INFO msg=&quot;downloaded wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.128594ms\ntime=2025-08-05T09:09:04.800-05:00
    level=INFO msg=&quot;applied wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=610.75\xB5s\ntime=2025-08-05T09:09:04.800-05:00
    level=INFO msg=&quot;renaming database from temporary location&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Setup Remote
    MinIO S3 Backend Target for Litestream</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Intro I am starting to think through some patterns for replicating sqlite
    databases,\nexploring them, standardizing on schemas/models I use across projects,
    etc.\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Setup Remote MinIO S3 Backend Target for Litestream
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/setup-remote-minio-s3-backend-target-for-litestream\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Setup Remote MinIO S3 Backend Target for Litestream | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"Intro I am starting to think through some
    patterns for replicating sqlite databases,\nexploring them, standardizing on schemas/models
    I use across projects, etc.\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"
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
    \           <span class=\"site-terminal__dir\">~/setup-remote-minio-s3-backend-target-for-litestream</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    Content is handled by the password protection plugin -->\n    <h2 id=\"intro\">Intro
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I am starting to think
    through some patterns for replicating sqlite databases,\nexploring them, standardizing
    on schemas/models I use across projects, etc...\nThanks to <a href=\"https://waylonwalker.com\">Waylon</a>
    I know about <a class=\"wikilink\" href=\"/litestream\">litestream</a> and\nfinally
    I started playing with it. Their\n<a href=\"https://litestream.io/getting-started/\">quickstart</a>
    is good, but it assumes\nyou'll run MinIO on the same machine you run litestream
    on.</p>\n<p>I, however, have MinIO setup in my homelab with the api endpoint accessible
    via\nDNS - <code>s3.mydomain.com</code>.</p>\n<p>Before starting - I realize I
    left the credential aspect out - Litestream\nexplains how to setup API keys in
    MinIO for their application\n<a href=\"https://litestream.io/getting-started/#setting-up-minio\">here</a></p>\n<p>Basically
    after generating the keys I set <code>LITESTREAM_ACCESS_KEY_ID</code> and <code>LITESTREAM_SECRET_ACCESS_KEY</code>
    as env vars</p>\n<p>So let's see what happens and then get to [the fix]</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22 [devbox] \u276F litestream
    replicate quadtask-prod.db s3://s3.example.com/litestream/qt.db    \n2025/08/05
    08:50:09 INFO litestream version=v0.3.13\n2025/08/05 08:50:09 INFO initialized
    db path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n2025/08/05
    08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
    path=litestream/qt.db region=&quot;&quot; endpoint=&quot;&quot;\n2025/08/05 08:50:10
    INFO sync: new generation db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    generation=209692854ccd85d5 reason=&quot;no generation exists&quot;\n2025/08/05
    08:50:10 ERROR monitor error db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=s3 error=&quot;cannot lookup bucket region: InvalidAccessKeyId: The AWS
    Access Key Id you provided does not exist in our records.\\n\\tstatus code: 403,
    request id: ERHZD4RD61Y8ADMD, host id: dOjPn5j8Oa+mkwOqROXDvCdKNxzxG0B8JJOPtGXDZA7qKxwAWqaSXhGYzK2mkoJQV7hJhaoJcag=&quot;\n</pre></div>\n\n</pre>\n\n<p>So
    that <code>403</code> is pretty simple... my login is wrong... but wait...</p>\n<p><code>2025/08/05
    08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
    path=litestream/qt.db region=&quot;&quot; endpoint=&quot;&quot;</code></p>\n<p>Notice
    this line - <code>endpoint=&quot;&quot;</code>... so <code>s3://s3.example.com</code>
    was not the right replacement for <code>s3://mybkt.localhost:9000/target.db</code>.
    Also the inferred <code>bucket</code> is the entire <code>s3.example.com</code>...</p>\n<p>Oh!
    Well I didn't specify a bucket in the subdomain - I did it with a route on the
    URL...</p>\n<p>ok let's try <code>litestream replicate quadtask-prod.db s3://litestream.example.com/qt.db</code></p>\n<p>We
    got the same kind of error...</p>\n<p><code>2025/08/05 08:53:45 INFO replicating
    to name=s3 type=s3 sync-interval=1s bucket=litestream.example.com path=qt.db region=&quot;&quot;
    endpoint=&quot;&quot;</code></p>\n<p>This time the inferred bucket was <code>litestream.example.com</code>...
    ok that's consistent with above as well - so the endpoint is still wrong/null
    and the bucket inference is wrong...</p>\n<p>Turns out for Litestream, and probably
    many other tools that use s3-compatible storage, that there's an inference problem
    if the configuration leans on the shorthand <code>s3://</code> - <a href=\"https://github.com/benbjohnson/litestream/issues/398\">see
    this GitHub issue</a> and <a href=\"https://github.com/benbjohnson/litestream/issues/219\">this
    one about localhost</a>. There's a few options for using your own <code>s3.mydomain.example</code>.</p>\n<h2
    id=\"the-fix\">The Fix <a class=\"header-anchor\" href=\"#the-fix\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If you're familiar with
    the <code>awscli</code> then maybe you've heard of a config option <code>AWS_S3_ENDPOINT_URL</code>
    which allows you to use the boto sdk with s3-compatibile resources while still
    using the <code>s3://</code> shorthand. Litestream has a way to set this configuration
    right on config:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nt\">dbs</span><span
    class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"p p-Indicator\">-</span><span
    class=\"w\"> </span><span class=\"nt\">path</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db</span>\n<span
    class=\"w\">    </span><span class=\"nt\">replicas</span><span class=\"p\">:</span>\n<span
    class=\"w\">      </span><span class=\"p p-Indicator\">-</span><span class=\"w\">
    </span><span class=\"nt\">type</span><span class=\"p\">:</span><span class=\"w\">
    </span><span class=\"l l-Scalar l-Scalar-Plain\">s3</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">bucket</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">litestream</span>\n<span
    class=\"w\">        </span><span class=\"nt\">endpoint</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">s3.example.com</span><span
    class=\"w\">  </span><span class=\"c1\"># &lt;---- right here!</span>\n<span class=\"w\">
    \       </span><span class=\"nt\">skip-verify</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">true</span><span
    class=\"w\">  </span><span class=\"c1\"># set to false if you have TLS and want
    more security</span>\n<span class=\"w\">        </span><span class=\"c1\"># note
    you acn set these sensitive values as env vars per the Litestream Quickstart</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># access-key-id: &lt;ACCESS-KEY-ID&gt;</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># secret-access-key: &lt;SECRET-ACCESS-KEY&gt;</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition danger is-collapsible collapsible-open\">\n<p class=\"admonition-title\">UPDATE</p>\n<p>I
    added a <code>path</code> key to give the backups a folder basically on s3, so
    under &quot;bucket: listream&quot; I have &quot;path: <my desired path>&quot;</p>\n</div>\n<p>So
    with that config in place we can actually JUST <code>litestream replicate</code>
    from anywhere...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22<span class=\"w\">
    </span><span class=\"o\">[</span>devbox<span class=\"o\">]</span><span class=\"w\">
    </span>\u276F<span class=\"w\"> </span>litestream<span class=\"w\"> </span>replicate<span
    class=\"w\">                                                      </span>\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span>litestream<span
    class=\"w\"> </span><span class=\"nv\">version</span><span class=\"o\">=</span>v0.3.13\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;initialized db&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">path</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:11.353-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;replicating to&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">name</span><span class=\"o\">=</span>s3<span class=\"w\"> </span><span
    class=\"nv\">type</span><span class=\"o\">=</span>s3<span class=\"w\"> </span>sync-interval<span
    class=\"o\">=</span>1s<span class=\"w\"> </span><span class=\"nv\">bucket</span><span
    class=\"o\">=</span>litestream<span class=\"w\"> </span><span class=\"nv\">path</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">region</span><span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">endpoint</span><span class=\"o\">=</span>s3.example.com\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.399-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;write snapshot&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:4152\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.489-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;snapshot written&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:4152<span
    class=\"w\"> </span><span class=\"nv\">elapsed</span><span class=\"o\">=</span><span
    class=\"m\">89</span>.994626ms<span class=\"w\"> </span><span class=\"nv\">sz</span><span
    class=\"o\">=</span><span class=\"m\">909437</span>\n<span class=\"nv\">time</span><span
    class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.492-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;write wal segment&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:0\n<span
    class=\"nv\">time</span><span class=\"o\">=</span><span class=\"m\">2025</span>-08-05T08:56:12.510-05:00<span
    class=\"w\"> </span><span class=\"nv\">level</span><span class=\"o\">=</span>INFO<span
    class=\"w\"> </span><span class=\"nv\">msg</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;wal segment written&quot;</span><span class=\"w\"> </span><span
    class=\"nv\">db</span><span class=\"o\">=</span>/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db<span
    class=\"w\"> </span><span class=\"nv\">replica</span><span class=\"o\">=</span>s3<span
    class=\"w\"> </span><span class=\"nv\">position</span><span class=\"o\">=</span>209692854ccd85d5/00000000:0<span
    class=\"w\"> </span><span class=\"nv\">elapsed</span><span class=\"o\">=</span><span
    class=\"m\">17</span>.572784ms<span class=\"w\"> </span><span class=\"nv\">sz</span><span
    class=\"o\">=</span><span class=\"m\">4152</span>\n</pre></div>\n\n</pre>\n\n<div
    class=\"admonition success\">\n<p class=\"admonition-title\">It works!</p>\n<p>Notice
    that the endpoint is properly <a href=\"http://s3.example.com\">s3.example.com</a>,
    and the bucket is litestream (the name of my taret bucket in MinIO)</p>\n</div>\n<blockquote>\n<p>You
    can use a local config with <code>-c config.yaml</code> or something if you want
    to avoid the global <code>/etc/litestream.yml</code></p>\n</blockquote>\n<h2 id=\"what-about-restore\">What
    About Restore? <a class=\"header-anchor\" href=\"#what-about-restore\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Should work just fine...
    Let's move the database on my host and see if I can use litestream to restore
    it</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span>nic in quadtask/litestream
    \ \uE725 database-clean-up  \uE79B \xD721 \uF6C1 \xD72 \uF21B \xD79 via \uE235
    \ v3.11.10(quadtask)  \uF427 (dev) \U000F0484 \n\u2B22 [devbox] \u276F mv ./source/quadtask-prod.db
    ./source/quadtask-prod.db.backup                 \n\nnic in quadtask/litestream
    \ \uE725 database-clean-up  \uE79B \xD721 \uF6C1 \xD72 \uF21B \xD79 via \uE235
    \ v3.11.10(quadtask)  \uF427 (dev) \U000F0484 \n\u2B22 [devbox] \u276F litestream
    restore ./source/quadtask-prod.db              \ntime=2025-08-05T09:06:25.826-05:00
    level=INFO msg=&quot;restoring snapshot&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db.tmp\ntime=2025-08-05T09:06:25.843-05:00
    level=INFO msg=&quot;restoring wal files&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:06:25.845-05:00
    level=INFO msg=&quot;downloaded wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.103514ms\ntime=2025-08-05T09:06:25.856-05:00
    level=INFO msg=&quot;applied wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=10.871034ms\ntime=2025-08-05T09:06:25.856-05:00
    level=INFO msg=&quot;renaming database from temporary location&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod\n</pre></div>\n\n</pre>\n\n<p>The command <code>litestream
    restore &lt;db path&gt;</code> was confusing at first because I was trying to
    replicate to a new place, but couldn't get the config to line up. The general
    understanding here is DR I believe - so the configuration is relatively static
    and when you <code>restore</code> you are restoring a specific database, not just
    standing up a copy from a backup...</p>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">But
    would we setup a copy from a backup?</p>\n<p>ie. restore to a different file?</p>\n</div>\n<p>Yes,
    but it's confusing - at least it was to me... it looks to me like litestream uses
    the path of a db as the identifier in the config, and you reference the config
    not by an object's name (if it has one) but by the <code>path</code>...</p>\n<p>So
    the command is <code>litestream restore -o &lt;output path&gt; &lt;db path&gt;</code>.
    This makes sense in light of the fact that the configuration is relative to this
    host - so <code>&lt;db path&gt;</code> being the path of the source db whose backup
    you are restoring from to <code>&lt;output path&gt;</code> makes some amount of
    sense... if I wanted to replicate to another machine, then THAT machine would
    need <code>/etc/litestream.yaml</code> and if the filesystem hierarchy was different
    then an appropriate <code>path</code> for the &quot;source&quot; of the db to
    replicate back to.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>\u2B22 [devbox] \u276F litestream
    restore -o /tmp/db ./source/quadtask-prod.db          \ntime=2025-08-05T09:09:04.784-05:00
    level=INFO msg=&quot;restoring snapshot&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/tmp/db.tmp\ntime=2025-08-05T09:09:04.797-05:00
    level=INFO msg=&quot;restoring wal files&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:09:04.799-05:00
    level=INFO msg=&quot;downloaded wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.128594ms\ntime=2025-08-05T09:09:04.800-05:00
    level=INFO msg=&quot;applied wal&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=610.75\xB5s\ntime=2025-08-05T09:09:04.800-05:00
    level=INFO msg=&quot;renaming database from temporary location&quot; db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod\n</pre></div>\n\n</pre>\n\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2025-08-05 08:39:16\ntemplateKey: blog-post\ntitle: Setup Remote
    MinIO S3 Backend Target for Litestream \npublished: True\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png\"\ntags:\n
    \ - litestream\n  - tech\n\n---\n\n## Intro\n\nI am starting to think through
    some patterns for replicating sqlite databases,\nexploring them, standardizing
    on schemas/models I use across projects, etc...\nThanks to [Waylon](https://waylonwalker.com)
    I know about [[litestream]] and\nfinally I started playing with it. Their\n[quickstart](https://litestream.io/getting-started/)
    is good, but it assumes\nyou'll run MinIO on the same machine you run litestream
    on.\n\nI, however, have MinIO setup in my homelab with the api endpoint accessible
    via\nDNS - `s3.mydomain.com`.\n\nBefore starting - I realize I left the credential
    aspect out - Litestream\nexplains how to setup API keys in MinIO for their application\n[here](https://litestream.io/getting-started/#setting-up-minio)\n\nBasically
    after generating the keys I set `LITESTREAM_ACCESS_KEY_ID` and `LITESTREAM_SECRET_ACCESS_KEY`
    as env vars\n\nSo let's see what happens and then get to [the fix]\n\n\n```\n\u2B22
    [devbox] \u276F litestream replicate quadtask-prod.db s3://s3.example.com/litestream/qt.db
    \   \n2025/08/05 08:50:09 INFO litestream version=v0.3.13\n2025/08/05 08:50:09
    INFO initialized db path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n2025/08/05
    08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
    path=litestream/qt.db region=\"\" endpoint=\"\"\n2025/08/05 08:50:10 INFO sync:
    new generation db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    generation=209692854ccd85d5 reason=\"no generation exists\"\n2025/08/05 08:50:10
    ERROR monitor error db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=s3 error=\"cannot lookup bucket region: InvalidAccessKeyId: The AWS Access
    Key Id you provided does not exist in our records.\\n\\tstatus code: 403, request
    id: ERHZD4RD61Y8ADMD, host id: dOjPn5j8Oa+mkwOqROXDvCdKNxzxG0B8JJOPtGXDZA7qKxwAWqaSXhGYzK2mkoJQV7hJhaoJcag=\"\n\n```\n\nSo
    that `403` is pretty simple... my login is wrong... but wait...\n\n`2025/08/05
    08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com
    path=litestream/qt.db region=\"\" endpoint=\"\"`\n\nNotice this line - `endpoint=\"\"`...
    so `s3://s3.example.com` was not the right replacement for `s3://mybkt.localhost:9000/target.db`.
    Also the inferred `bucket` is the entire `s3.example.com`... \n\nOh! Well I didn't
    specify a bucket in the subdomain - I did it with a route on the URL... \n\nok
    let's try `litestream replicate quadtask-prod.db s3://litestream.example.com/qt.db`\n\nWe
    got the same kind of error...\n\n`2025/08/05 08:53:45 INFO replicating to name=s3
    type=s3 sync-interval=1s bucket=litestream.example.com path=qt.db region=\"\"
    endpoint=\"\"`\n\nThis time the inferred bucket was `litestream.example.com`...
    ok that's consistent with above as well - so the endpoint is still wrong/null
    and the bucket inference is wrong...\n\nTurns out for Litestream, and probably
    many other tools that use s3-compatible storage, that there's an inference problem
    if the configuration leans on the shorthand `s3://` - [see this GitHub issue](https://github.com/benbjohnson/litestream/issues/398)
    and [this one about localhost](https://github.com/benbjohnson/litestream/issues/219).
    There's a few options for using your own `s3.mydomain.example`.\n\n## The Fix\n\nIf
    you're familiar with the `awscli` then maybe you've heard of a config option `AWS_S3_ENDPOINT_URL`
    which allows you to use the boto sdk with s3-compatibile resources while still
    using the `s3://` shorthand. Litestream has a way to set this configuration right
    on config:\n\n```yaml\ndbs:\n  - path: /home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\n
    \   replicas:\n      - type: s3\n        bucket: litestream\n        endpoint:
    s3.example.com  # <---- right here!\n        skip-verify: true  # set to false
    if you have TLS and want more security\n        # note you acn set these sensitive
    values as env vars per the Litestream Quickstart\n        # access-key-id: <ACCESS-KEY-ID>\n
    \       # secret-access-key: <SECRET-ACCESS-KEY>\n```\n\n???+ danger \"UPDATE\"\n\n
    \   I added a `path` key to give the backups a folder basically on s3, so under
    \"bucket: listream\" I have \"path: <my desired path>\"\n\nSo with that config
    in place we can actually JUST `litestream replicate` from anywhere...\n\n```bash\n\u2B22
    [devbox] \u276F litestream replicate                                                      \ntime=2025-08-05T08:56:11.353-05:00
    level=INFO msg=litestream version=v0.3.13\ntime=2025-08-05T08:56:11.353-05:00
    level=INFO msg=\"initialized db\" path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db\ntime=2025-08-05T08:56:11.353-05:00
    level=INFO msg=\"replicating to\" name=s3 type=s3 sync-interval=1s bucket=litestream
    path=\"\" region=\"\" endpoint=s3.example.com\ntime=2025-08-05T08:56:12.399-05:00
    level=INFO msg=\"write snapshot\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=s3 position=209692854ccd85d5/00000000:4152\ntime=2025-08-05T08:56:12.489-05:00
    level=INFO msg=\"snapshot written\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=s3 position=209692854ccd85d5/00000000:4152 elapsed=89.994626ms sz=909437\ntime=2025-08-05T08:56:12.492-05:00
    level=INFO msg=\"write wal segment\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=s3 position=209692854ccd85d5/00000000:0\ntime=2025-08-05T08:56:12.510-05:00
    level=INFO msg=\"wal segment written\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=s3 position=209692854ccd85d5/00000000:0 elapsed=17.572784ms sz=4152\n```\n\n!!!
    success \"It works!\"\n    \n    Notice that the endpoint is properly s3.example.com,
    and the bucket is litestream (the name of my taret bucket in MinIO)\n\n> You can
    use a local config with `-c config.yaml` or something if you want to avoid the
    global `/etc/litestream.yml`\n\n## What About Restore?\n\nShould work just fine...
    Let's move the database on my host and see if I can use litestream to restore
    it\n\n```\nnic in quadtask/litestream  \uE725 database-clean-up  \uE79B \xD721
    \uF6C1 \xD72 \uF21B \xD79 via \uE235  v3.11.10(quadtask)  \uF427 (dev) \U000F0484
    \n\u2B22 [devbox] \u276F mv ./source/quadtask-prod.db ./source/quadtask-prod.db.backup
    \                \n\nnic in quadtask/litestream  \uE725 database-clean-up  \uE79B
    \xD721 \uF6C1 \xD72 \uF21B \xD79 via \uE235  v3.11.10(quadtask)  \uF427 (dev)
    \U000F0484 \n\u2B22 [devbox] \u276F litestream restore ./source/quadtask-prod.db
    \             \ntime=2025-08-05T09:06:25.826-05:00 level=INFO msg=\"restoring
    snapshot\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db.tmp\ntime=2025-08-05T09:06:25.843-05:00
    level=INFO msg=\"restoring wal files\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:06:25.845-05:00
    level=INFO msg=\"downloaded wal\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.103514ms\ntime=2025-08-05T09:06:25.856-05:00
    level=INFO msg=\"applied wal\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=10.871034ms\ntime=2025-08-05T09:06:25.856-05:00
    level=INFO msg=\"renaming database from temporary location\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod\n\n```\n\nThe command `litestream restore <db path>` was
    confusing at first because I was trying to replicate to a new place, but couldn't
    get the config to line up. The general understanding here is DR I believe - so
    the configuration is relatively static and when you `restore` you are restoring
    a specific database, not just standing up a copy from a backup... \n\n!!! note
    \"But would we setup a copy from a backup?\"\n\n    ie. restore to a different
    file?\n\nYes, but it's confusing - at least it was to me... it looks to me like
    litestream uses the path of a db as the identifier in the config, and you reference
    the config not by an object's name (if it has one) but by the `path`...\n\nSo
    the command is `litestream restore -o <output path> <db path>`. This makes sense
    in light of the fact that the configuration is relative to this host - so `<db
    path>` being the path of the source db whose backup you are restoring from to
    `<output path>` makes some amount of sense... if I wanted to replicate to another
    machine, then THAT machine would need `/etc/litestream.yaml` and if the filesystem
    hierarchy was different then an appropriate `path` for the \"source\" of the db
    to replicate back to.\n\n```\n\u2B22 [devbox] \u276F litestream restore -o /tmp/db
    ./source/quadtask-prod.db          \ntime=2025-08-05T09:09:04.784-05:00 level=INFO
    msg=\"restoring snapshot\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/tmp/db.tmp\ntime=2025-08-05T09:09:04.797-05:00
    level=INFO msg=\"restoring wal files\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0\ntime=2025-08-05T09:09:04.799-05:00
    level=INFO msg=\"downloaded wal\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.128594ms\ntime=2025-08-05T09:09:04.800-05:00
    level=INFO msg=\"applied wal\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=610.75\xB5s\ntime=2025-08-05T09:09:04.800-05:00
    level=INFO msg=\"renaming database from temporary location\" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replica=quadtask-prod\n\n```\n\n"
published: true
slug: setup-remote-minio-s3-backend-target-for-litestream
title: Setup Remote MinIO S3 Backend Target for Litestream


---

## Intro

I am starting to think through some patterns for replicating sqlite databases,
exploring them, standardizing on schemas/models I use across projects, etc...
Thanks to [Waylon](https://waylonwalker.com) I know about [[litestream]] and
finally I started playing with it. Their
[quickstart](https://litestream.io/getting-started/) is good, but it assumes
you'll run MinIO on the same machine you run litestream on.

I, however, have MinIO setup in my homelab with the api endpoint accessible via
DNS - `s3.mydomain.com`.

Before starting - I realize I left the credential aspect out - Litestream
explains how to setup API keys in MinIO for their application
[here](https://litestream.io/getting-started/#setting-up-minio)

Basically after generating the keys I set `LITESTREAM_ACCESS_KEY_ID` and `LITESTREAM_SECRET_ACCESS_KEY` as env vars

So let's see what happens and then get to [the fix]


```
⬢ [devbox] ❯ litestream replicate quadtask-prod.db s3://s3.example.com/litestream/qt.db    
2025/08/05 08:50:09 INFO litestream version=v0.3.13
2025/08/05 08:50:09 INFO initialized db path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
2025/08/05 08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com path=litestream/qt.db region="" endpoint=""
2025/08/05 08:50:10 INFO sync: new generation db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db generation=209692854ccd85d5 reason="no generation exists"
2025/08/05 08:50:10 ERROR monitor error db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 error="cannot lookup bucket region: InvalidAccessKeyId: The AWS Access Key Id you provided does not exist in our records.\n\tstatus code: 403, request id: ERHZD4RD61Y8ADMD, host id: dOjPn5j8Oa+mkwOqROXDvCdKNxzxG0B8JJOPtGXDZA7qKxwAWqaSXhGYzK2mkoJQV7hJhaoJcag="

```

So that `403` is pretty simple... my login is wrong... but wait...

`2025/08/05 08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com path=litestream/qt.db region="" endpoint=""`

Notice this line - `endpoint=""`... so `s3://s3.example.com` was not the right replacement for `s3://mybkt.localhost:9000/target.db`. Also the inferred `bucket` is the entire `s3.example.com`... 

Oh! Well I didn't specify a bucket in the subdomain - I did it with a route on the URL... 

ok let's try `litestream replicate quadtask-prod.db s3://litestream.example.com/qt.db`

We got the same kind of error...

`2025/08/05 08:53:45 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=litestream.example.com path=qt.db region="" endpoint=""`

This time the inferred bucket was `litestream.example.com`... ok that's consistent with above as well - so the endpoint is still wrong/null and the bucket inference is wrong...

Turns out for Litestream, and probably many other tools that use s3-compatible storage, that there's an inference problem if the configuration leans on the shorthand `s3://` - [see this GitHub issue](https://github.com/benbjohnson/litestream/issues/398) and [this one about localhost](https://github.com/benbjohnson/litestream/issues/219). There's a few options for using your own `s3.mydomain.example`.

## The Fix

If you're familiar with the `awscli` then maybe you've heard of a config option `AWS_S3_ENDPOINT_URL` which allows you to use the boto sdk with s3-compatibile resources while still using the `s3://` shorthand. Litestream has a way to set this configuration right on config:

```yaml
dbs:
  - path: /home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replicas:
      - type: s3
        bucket: litestream
        endpoint: s3.example.com  # <---- right here!
        skip-verify: true  # set to false if you have TLS and want more security
        # note you acn set these sensitive values as env vars per the Litestream Quickstart
        # access-key-id: <ACCESS-KEY-ID>
        # secret-access-key: <SECRET-ACCESS-KEY>
```

???+ danger "UPDATE"

    I added a `path` key to give the backups a folder basically on s3, so under "bucket: listream" I have "path: <my desired path>"

So with that config in place we can actually JUST `litestream replicate` from anywhere...

```bash
⬢ [devbox] ❯ litestream replicate                                                      
time=2025-08-05T08:56:11.353-05:00 level=INFO msg=litestream version=v0.3.13
time=2025-08-05T08:56:11.353-05:00 level=INFO msg="initialized db" path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
time=2025-08-05T08:56:11.353-05:00 level=INFO msg="replicating to" name=s3 type=s3 sync-interval=1s bucket=litestream path="" region="" endpoint=s3.example.com
time=2025-08-05T08:56:12.399-05:00 level=INFO msg="write snapshot" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 position=209692854ccd85d5/00000000:4152
time=2025-08-05T08:56:12.489-05:00 level=INFO msg="snapshot written" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 position=209692854ccd85d5/00000000:4152 elapsed=89.994626ms sz=909437
time=2025-08-05T08:56:12.492-05:00 level=INFO msg="write wal segment" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 position=209692854ccd85d5/00000000:0
time=2025-08-05T08:56:12.510-05:00 level=INFO msg="wal segment written" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 position=209692854ccd85d5/00000000:0 elapsed=17.572784ms sz=4152
```

!!! success "It works!"
    
    Notice that the endpoint is properly s3.example.com, and the bucket is litestream (the name of my taret bucket in MinIO)

> You can use a local config with `-c config.yaml` or something if you want to avoid the global `/etc/litestream.yml`

## What About Restore?

Should work just fine... Let's move the database on my host and see if I can use litestream to restore it

```
nic in quadtask/litestream   database-clean-up   ×21  ×2  ×9 via   v3.11.10(quadtask)   (dev) 󰒄 
⬢ [devbox] ❯ mv ./source/quadtask-prod.db ./source/quadtask-prod.db.backup                 

nic in quadtask/litestream   database-clean-up   ×21  ×2  ×9 via   v3.11.10(quadtask)   (dev) 󰒄 
⬢ [devbox] ❯ litestream restore ./source/quadtask-prod.db              
time=2025-08-05T09:06:25.826-05:00 level=INFO msg="restoring snapshot" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db.tmp
time=2025-08-05T09:06:25.843-05:00 level=INFO msg="restoring wal files" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0
time=2025-08-05T09:06:25.845-05:00 level=INFO msg="downloaded wal" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.103514ms
time=2025-08-05T09:06:25.856-05:00 level=INFO msg="applied wal" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=10.871034ms
time=2025-08-05T09:06:25.856-05:00 level=INFO msg="renaming database from temporary location" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod

```

The command `litestream restore <db path>` was confusing at first because I was trying to replicate to a new place, but couldn't get the config to line up. The general understanding here is DR I believe - so the configuration is relatively static and when you `restore` you are restoring a specific database, not just standing up a copy from a backup... 

!!! note "But would we setup a copy from a backup?"

    ie. restore to a different file?

Yes, but it's confusing - at least it was to me... it looks to me like litestream uses the path of a db as the identifier in the config, and you reference the config not by an object's name (if it has one) but by the `path`...

So the command is `litestream restore -o <output path> <db path>`. This makes sense in light of the fact that the configuration is relative to this host - so `<db path>` being the path of the source db whose backup you are restoring from to `<output path>` makes some amount of sense... if I wanted to replicate to another machine, then THAT machine would need `/etc/litestream.yaml` and if the filesystem hierarchy was different then an appropriate `path` for the "source" of the db to replicate back to.

```
⬢ [devbox] ❯ litestream restore -o /tmp/db ./source/quadtask-prod.db          
time=2025-08-05T09:09:04.784-05:00 level=INFO msg="restoring snapshot" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/tmp/db.tmp
time=2025-08-05T09:09:04.797-05:00 level=INFO msg="restoring wal files" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0
time=2025-08-05T09:09:04.799-05:00 level=INFO msg="downloaded wal" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.128594ms
time=2025-08-05T09:09:04.800-05:00 level=INFO msg="applied wal" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=610.75µs
time=2025-08-05T09:09:04.800-05:00 level=INFO msg="renaming database from temporary location" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod

```