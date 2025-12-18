---
content: "## TL;DR\n\nIf state matters then check it in the beginning or handle it
  on a failure... Let me explain\n\nI ran into some trouble recently _almost_ losing
  some encrypted data... Now\nthis would be the second time I've had that happen,
  so I'm going to write a\nlittle bit about it now that I figured it out\n\n## The
  Stage\n\nHere's the scenario - I use `ansible-vault` to keep some sensitive data
  in a\nfew public repos, and I keep the keys I use in Bitwarden Secrets Manager.\n\nI
  use `just` as a command runner and have common `just encrypt` and `just\ndecrypt`
  recipes throughout many justfiles. It might look something like this\n\n```bash\n\nget-vault-key:\n
  \   bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\n\nencrypt:\n    #!/bin/bash\n
  \   set +e\n    just get-vault-key > key\n    ansible-vault encrypt ./secret-file
  --vault-password-file key\n    ansible-vault encrypt ./secret-file2 --vault-password-file
  key\n    rm key\n\ndecrypt:\n    #!/bin/bash\n    set +e\n    just get-vault-key
  > key\n    ansible-vault decrypt ./secret-file --vault-password-file key\n    ansible-vault
  decrypt ./secret-file2 --vault-password-file key\n    rm key\n```\n\n## Spoiler\n\nAbove
  is a good example of the 2 recipes, but prior to this morning they looked like this\n\n```bash\n\nget-vault-key:\n
  \   bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\n\n# BAD EXAMPLES!
  DO NOT DO THIS\n\nencrypt:\n    set -e\n    just get-vault-key >> key\n    ansible-vault
  encrypt ./secret-file --vault-password-file key\n    ansible-vault encrypt ./secret-file2
  --vault-password-file key\n    rm key\n\ndecrypt:\n    set -e\n    just get-vault-key
  >> key\n    ansible-vault decrypt ./secret-file --vault-password-file key\n    ansible-vault
  decrypt ./secret-file2 --vault-password-file key\n    rm key\n```\n\n## Problem\n\nSo
  here's the story - in real life I started using distrobox when I ran into\nthis
  and I thought it was an issue with different versions of ansible installed\nin distrobox
  and on my desktop. After a few more odd deployment workflows I\nthink I've determined
  that the real problem is that `>>` appends to a file (see\nthe issue yet?), but
  if my recipes fail (say I try to encrypt an already\nencrypted file) then the command
  exits but what's left on my disk? `key` is\nstill there... and the next time I go
  to run a command I'll echo the real key\nto the `key` file again and if I called
  `encrypt` when the first or more files\nin the list were `decrypted` then they'll
  be encrypted not with my key, but\nwith my key repeated as many times as I ran a
  command with `just get-vault-key >> key`\nbefore ever removing the key file!\n\n```bash\n\nnic
  in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)
  \ \uF427 (dev) \U000F0484 \n\u276F cat secret-file\nDanger, Will Robinson\n\nnic
  in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)
  \ \uF427 (dev) \U000F0484 \n\u276F just encrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID
  \ | jq -r '.value'\nEncryption successful\n\nnic in pype.dev  \uE725 main  \uE79B
  \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
  \n\u276F cat secret-file\n$ANSIBLE_VAULT;1.1;AES256\n39616332393662346639633030633766666336323939346138633238626239363733316431333737\n6463663763366434376437303335643431663431326135300a636261663636336139323033316232\n37666439383131393631333332353731633661396431633834326432363936613331623135666565\n6364363039663933620a326563323931643632323031396664646363613636613562366166386439\n63653661653037393538356461323239396630643338393231306163343964623866\n\nnic
  in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)
  \ \uF427 (dev) \U000F0484 \n\u276F just decrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID
  \ | jq -r '.value'\nDecryption successful\n\nnic in pype.dev  \uE725 main  \uE79B
  \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
  \n\u276F cat secret-file\nDanger, Will Robinson\n```\n\nSo as you can see, I have
  `secret-file` here, and I can encrypt and decrypt\njust fine. But if I have that
  `>>` in the recipe, add a second file, and a\nfailure in a command - well then I'll
  start getting confused...\n\nFollow along with the workflow of adding a file that
  I'll need encrypted\n\n> Only secret-file is in the just recipe here - I add secret-file2
  after\n\n```bash\nnic in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B
  \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484 \n\u276F just decrypt\nbws
  secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\nERROR! input is not vault
  encrypted data. /var/home/nic/projects/personal/pype.dev/secret-file is not a vault
  encrypted file for /var/home/nic/projects/personal/pype.dev/secret-file\nerror:
  Recipe `decrypt` failed with exit code 1\n\nnic in pype.dev  \uE725 main  \uE79B
  \xD72 \uF6C1 \xD73 \uF21B \xD78 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
  \n\u2717 echo \"Good - secret-file is already decrypted! So lets add another file\"\nGood
  - secret-file is already decrypted! So lets add another file\n\nnic in pype.dev
  \ \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)
  \ \uF427 (dev) \U000F0484 \n\u276F echo \"Foo Bar Bam Baz\" > secret-file2                                    \n\nnic
  in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD78 via \uE235  v3.11.10(pype-dev)
  \ \uF427 (dev) \U000F0484 \n\u276F echo \"Added secret-file2 to my Just recipes\"\nAdded
  secret-file2 to my Just recipes\n\nnic in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1
  \xD73 \uF21B \xD78 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484 \n\u276F
  just encrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\nEncryption
  successful\nEncryption successful\n\nnic in pype.dev  \uE725 main  \uE79B \xD72
  \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
  \n\u276F just decrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\nERROR!
  Decryption failed (no vault secrets were found that could decrypt) on /var/home/nic/projects/personal/pype.dev/secret-file
  for /var/home/nic/projects/personal/pype.dev/secret-file\nerror: Recipe `decrypt`
  failed with exit code 1\n\nnic in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73
  \uF21B \xD78 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484 \n\u2717 echo
  \"Oh no!\"\n```\n\nSo what happened?\n\nRecall that my recipes originally had `set
  -e` at the top and used `>>` to cat\nmy secret to a file `key`. Well, when the fir|
  decryption recipe failed the\n`key` file was left behind. Then when I went to encrypt
  both of my files the\nrecipe got the key again and made a keyfile like this:\n\n```bash\nsecretKey\nsecretKey\n```\n\nThe
  encryption recipe encrypted the files with this key, removed the key file,\nand
  then the next decryption recipe failed because when it got the key and made\nthe
  file it looked like\n\n```\nsecretKey\n```\n\nSo the solution in the end is to remake
  the `key` file every time (`>` instead\nof `>>`), or check if it exists, or handle
  the error when the recipe fails, or\njust keep going (`set +e`)\n\n## Fin\n\nAnd
  that's how I lost some secrets in my homelab once, and how I almost lost a\nsecond
  time if I hadn't noticed the `key` file in my file tree"
date: 2025-04-23
description: TL;DR If state matters then check it in the beginning or handle it on
  a failure... Let me explain I ran into some trouble recently _almost_ losing some
  encrypte
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>I was wrecked by
    a weird combo of >> and -e</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"TL;DR If state matters then check it in the beginning or handle it on
    a failure... Let me explain I ran into some trouble recently _almost_ losing some
    encrypte\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"I was wrecked by a weird combo of >> and -e |
    Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/i-was-wrecked-by-a-weird-combo-of-and-e\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"I was wrecked by a weird combo of >> and -e | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"TL;DR If state matters then check it in
    the beginning or handle it on a failure... Let me explain I ran into some trouble
    recently _almost_ losing some encrypte\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/i-was-wrecked-by-a-weird-combo-of-and-e</span>\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">I was wrecked by a weird combo of >> and -e</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-04-23\">\n
    \           April 23, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/cli/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #cli\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"tldr\">TL;DR <a class=\"header-anchor\"
    href=\"#tldr\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If state matters then
    check it in the beginning or handle it on a failure... Let me explain</p>\n<p>I
    ran into some trouble recently <em>almost</em> losing some encrypted data... Now\nthis
    would be the second time I've had that happen, so I'm going to write a\nlittle
    bit about it now that I figured it out</p>\n<h2 id=\"the-stage\">The Stage <a
    class=\"header-anchor\" href=\"#the-stage\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Here's the scenario
    - I use <code>ansible-vault</code> to keep some sensitive data in a\nfew public
    repos, and I keep the keys I use in Bitwarden Secrets Manager.</p>\n<p>I use <code>just</code>
    as a command runner and have common <code>just encrypt</code> and <code>just decrypt</code>
    recipes throughout many justfiles. It might look something like this</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>get-vault-key:\n<span class=\"w\">
    \   </span>bws<span class=\"w\"> </span>secret<span class=\"w\"> </span>get<span
    class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\n\nencrypt:\n<span
    class=\"w\">    </span><span class=\"c1\">#!/bin/bash</span>\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>+e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n\ndecrypt:\n<span
    class=\"w\">    </span><span class=\"c1\">#!/bin/bash</span>\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>+e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>decrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>decrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n</pre></div>\n\n</pre>\n\n<h2
    id=\"spoiler\">Spoiler <a class=\"header-anchor\" href=\"#spoiler\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Above is a good example
    of the 2 recipes, but prior to this morning they looked like this</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>get-vault-key:\n<span class=\"w\">
    \   </span>bws<span class=\"w\"> </span>secret<span class=\"w\"> </span>get<span
    class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\n\n<span
    class=\"c1\"># BAD EXAMPLES! DO NOT DO THIS</span>\n\nencrypt:\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>-e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n\ndecrypt:\n<span
    class=\"w\">    </span><span class=\"nb\">set</span><span class=\"w\"> </span>-e\n<span
    class=\"w\">    </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\">
    </span>&gt;&gt;<span class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span
    class=\"w\"> </span>decrypt<span class=\"w\"> </span>./secret-file<span class=\"w\">
    </span>--vault-password-file<span class=\"w\"> </span>key\n<span class=\"w\">
    \   </span>ansible-vault<span class=\"w\"> </span>decrypt<span class=\"w\"> </span>./secret-file2<span
    class=\"w\"> </span>--vault-password-file<span class=\"w\"> </span>key\n<span
    class=\"w\">    </span>rm<span class=\"w\"> </span>key\n</pre></div>\n\n</pre>\n\n<h2
    id=\"problem\">Problem <a class=\"header-anchor\" href=\"#problem\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So here's the story
    - in real life I started using distrobox when I ran into\nthis and I thought it
    was an issue with different versions of ansible installed\nin distrobox and on
    my desktop. After a few more odd deployment workflows I\nthink I've determined
    that the real problem is that <code>&gt;&gt;</code> appends to a file (see\nthe
    issue yet?), but if my recipes fail (say I try to encrypt an already\nencrypted
    file) then the command exits but what's left on my disk? <code>key</code> is\nstill
    there... and the next time I go to run a command I'll echo the real key\nto the
    <code>key</code> file again and if I called <code>encrypt</code> when the first
    or more files\nin the list were <code>decrypted</code> then they'll be encrypted
    not with my key, but\nwith my key repeated as many times as I ran a command with
    <code>just get-vault-key &gt;&gt; key</code>\nbefore ever removing the key file!</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\nDanger,<span class=\"w\">
    </span>Will<span class=\"w\"> </span>Robinson\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>just<span class=\"w\"> </span>encrypt\nbws<span class=\"w\">
    </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span
    class=\"w\">  </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nEncryption<span
    class=\"w\"> </span>successful\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span class=\"w\">
    </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\n<span class=\"nv\">$ANSIBLE_VAULT</span><span
    class=\"p\">;</span><span class=\"m\">1</span>.1<span class=\"p\">;</span>AES256\n<span
    class=\"m\">39616332393662346639633030633766666336323939346138633238626239363733316431333737</span>\n6463663763366434376437303335643431663431326135300a636261663636336139323033316232\n<span
    class=\"m\">37666439383131393631333332353731633661396431633834326432363936613331623135666565</span>\n6364363039663933620a326563323931643632323031396664646363613636613562366166386439\n<span
    class=\"m\">63653661653037393538356461323239396630643338393231306163343964623866</span>\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nDecryption<span
    class=\"w\"> </span>successful\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span class=\"w\">
    </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\nDanger,<span class=\"w\">
    </span>Will<span class=\"w\"> </span>Robinson\n</pre></div>\n\n</pre>\n\n<p>So
    as you can see, I have <code>secret-file</code> here, and I can encrypt and decrypt\njust
    fine. But if I have that <code>&gt;&gt;</code> in the recipe, add a second file,
    and a\nfailure in a command - well then I'll start getting confused...</p>\n<p>Follow
    along with the workflow of adding a file that I'll need encrypted</p>\n<blockquote>\n<p>Only
    secret-file is in the just recipe here - I add secret-file2 after</p>\n</blockquote>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span class=\"w\">
    </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span
    class=\"w\">  </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nERROR!<span
    class=\"w\"> </span>input<span class=\"w\"> </span>is<span class=\"w\"> </span>not<span
    class=\"w\"> </span>vault<span class=\"w\"> </span>encrypted<span class=\"w\">
    </span>data.<span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file<span
    class=\"w\"> </span>is<span class=\"w\"> </span>not<span class=\"w\"> </span>a<span
    class=\"w\"> </span>vault<span class=\"w\"> </span>encrypted<span class=\"w\">
    </span>file<span class=\"w\"> </span><span class=\"k\">for</span><span class=\"w\">
    </span>/var/home/nic/projects/personal/pype.dev/secret-file\nerror:<span class=\"w\">
    </span>Recipe<span class=\"w\"> </span><span class=\"sb\">`</span>decrypt<span
    class=\"sb\">`</span><span class=\"w\"> </span>failed<span class=\"w\"> </span>with<span
    class=\"w\"> </span><span class=\"nb\">exit</span><span class=\"w\"> </span>code<span
    class=\"w\"> </span><span class=\"m\">1</span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u2717<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Good - secret-file is already decrypted! So lets add another
    file&quot;</span>\nGood<span class=\"w\"> </span>-<span class=\"w\"> </span>secret-file<span
    class=\"w\"> </span>is<span class=\"w\"> </span>already<span class=\"w\"> </span>decrypted!<span
    class=\"w\"> </span>So<span class=\"w\"> </span>lets<span class=\"w\"> </span>add<span
    class=\"w\"> </span>another<span class=\"w\"> </span>file\n\nnic<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Foo Bar Bam Baz&quot;</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span>secret-file2<span class=\"w\">
    \                                   </span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Added secret-file2 to my Just recipes&quot;</span>\nAdded<span
    class=\"w\"> </span>secret-file2<span class=\"w\"> </span>to<span class=\"w\">
    </span>my<span class=\"w\"> </span>Just<span class=\"w\"> </span>recipes\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>encrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nEncryption<span
    class=\"w\"> </span>successful\nEncryption<span class=\"w\"> </span>successful\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nERROR!<span class=\"w\">
    </span>Decryption<span class=\"w\"> </span>failed<span class=\"w\"> </span><span
    class=\"o\">(</span>no<span class=\"w\"> </span>vault<span class=\"w\"> </span>secrets<span
    class=\"w\"> </span>were<span class=\"w\"> </span>found<span class=\"w\"> </span>that<span
    class=\"w\"> </span>could<span class=\"w\"> </span>decrypt<span class=\"o\">)</span><span
    class=\"w\"> </span>on<span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file<span
    class=\"w\"> </span><span class=\"k\">for</span><span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file\nerror:<span
    class=\"w\"> </span>Recipe<span class=\"w\"> </span><span class=\"sb\">`</span>decrypt<span
    class=\"sb\">`</span><span class=\"w\"> </span>failed<span class=\"w\"> </span>with<span
    class=\"w\"> </span><span class=\"nb\">exit</span><span class=\"w\"> </span>code<span
    class=\"w\"> </span><span class=\"m\">1</span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u2717<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Oh no!&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>So what happened?</p>\n<p>Recall
    that my recipes originally had <code>set -e</code> at the top and used <code>&gt;&gt;</code>
    to cat\nmy secret to a file <code>key</code>. Well, when the fir| decryption recipe
    failed the\n<code>key</code> file was left behind. Then when I went to encrypt
    both of my files the\nrecipe got the key again and made a keyfile like this:</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>secretKey\nsecretKey\n</pre></div>\n\n</pre>\n\n<p>The
    encryption recipe encrypted the files with this key, removed the key file,\nand
    then the next decryption recipe failed because when it got the key and made\nthe
    file it looked like</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>secretKey\n</pre></div>\n\n</pre>\n\n<p>So
    the solution in the end is to remake the <code>key</code> file every time (<code>&gt;</code>
    instead\nof <code>&gt;&gt;</code>), or check if it exists, or handle the error
    when the recipe fails, or\njust keep going (<code>set +e</code>)</p>\n<h2 id=\"fin\">Fin
    <a class=\"header-anchor\" href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>And that's how I lost
    some secrets in my homelab once, and how I almost lost a\nsecond time if I hadn't
    noticed the <code>key</code> file in my file tree</p>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>I was wrecked by a
    weird combo of >> and -e</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"TL;DR If state matters then check it in the beginning or handle it on
    a failure... Let me explain I ran into some trouble recently _almost_ losing some
    encrypte\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"I was wrecked by a weird combo of >> and -e |
    Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/i-was-wrecked-by-a-weird-combo-of-and-e\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"I was wrecked by a weird combo of >> and -e | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"TL;DR If state matters then check it in
    the beginning or handle it on a failure... Let me explain I ran into some trouble
    recently _almost_ losing some encrypte\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">I was wrecked by a weird combo of >> and -e</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-04-23\">\n
    \           April 23, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/cli/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #cli\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">I was wrecked by a weird combo of >> and -e</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-04-23\">\n
    \           April 23, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/linux/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #linux\n
    \           </a>\n            <a href=\"https://pype.dev//tags/cli/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #cli\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h2 id=\"tldr\">TL;DR <a class=\"header-anchor\"
    href=\"#tldr\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If state matters then
    check it in the beginning or handle it on a failure... Let me explain</p>\n<p>I
    ran into some trouble recently <em>almost</em> losing some encrypted data... Now\nthis
    would be the second time I've had that happen, so I'm going to write a\nlittle
    bit about it now that I figured it out</p>\n<h2 id=\"the-stage\">The Stage <a
    class=\"header-anchor\" href=\"#the-stage\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Here's the scenario
    - I use <code>ansible-vault</code> to keep some sensitive data in a\nfew public
    repos, and I keep the keys I use in Bitwarden Secrets Manager.</p>\n<p>I use <code>just</code>
    as a command runner and have common <code>just encrypt</code> and <code>just decrypt</code>
    recipes throughout many justfiles. It might look something like this</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>get-vault-key:\n<span class=\"w\">
    \   </span>bws<span class=\"w\"> </span>secret<span class=\"w\"> </span>get<span
    class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\n\nencrypt:\n<span
    class=\"w\">    </span><span class=\"c1\">#!/bin/bash</span>\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>+e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n\ndecrypt:\n<span
    class=\"w\">    </span><span class=\"c1\">#!/bin/bash</span>\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>+e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>decrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>decrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n</pre></div>\n\n</pre>\n\n<h2
    id=\"spoiler\">Spoiler <a class=\"header-anchor\" href=\"#spoiler\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Above is a good example
    of the 2 recipes, but prior to this morning they looked like this</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>get-vault-key:\n<span class=\"w\">
    \   </span>bws<span class=\"w\"> </span>secret<span class=\"w\"> </span>get<span
    class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\n\n<span
    class=\"c1\"># BAD EXAMPLES! DO NOT DO THIS</span>\n\nencrypt:\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>-e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n\ndecrypt:\n<span
    class=\"w\">    </span><span class=\"nb\">set</span><span class=\"w\"> </span>-e\n<span
    class=\"w\">    </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\">
    </span>&gt;&gt;<span class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span
    class=\"w\"> </span>decrypt<span class=\"w\"> </span>./secret-file<span class=\"w\">
    </span>--vault-password-file<span class=\"w\"> </span>key\n<span class=\"w\">
    \   </span>ansible-vault<span class=\"w\"> </span>decrypt<span class=\"w\"> </span>./secret-file2<span
    class=\"w\"> </span>--vault-password-file<span class=\"w\"> </span>key\n<span
    class=\"w\">    </span>rm<span class=\"w\"> </span>key\n</pre></div>\n\n</pre>\n\n<h2
    id=\"problem\">Problem <a class=\"header-anchor\" href=\"#problem\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So here's the story
    - in real life I started using distrobox when I ran into\nthis and I thought it
    was an issue with different versions of ansible installed\nin distrobox and on
    my desktop. After a few more odd deployment workflows I\nthink I've determined
    that the real problem is that <code>&gt;&gt;</code> appends to a file (see\nthe
    issue yet?), but if my recipes fail (say I try to encrypt an already\nencrypted
    file) then the command exits but what's left on my disk? <code>key</code> is\nstill
    there... and the next time I go to run a command I'll echo the real key\nto the
    <code>key</code> file again and if I called <code>encrypt</code> when the first
    or more files\nin the list were <code>decrypted</code> then they'll be encrypted
    not with my key, but\nwith my key repeated as many times as I ran a command with
    <code>just get-vault-key &gt;&gt; key</code>\nbefore ever removing the key file!</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\nDanger,<span class=\"w\">
    </span>Will<span class=\"w\"> </span>Robinson\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>just<span class=\"w\"> </span>encrypt\nbws<span class=\"w\">
    </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span
    class=\"w\">  </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nEncryption<span
    class=\"w\"> </span>successful\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span class=\"w\">
    </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\n<span class=\"nv\">$ANSIBLE_VAULT</span><span
    class=\"p\">;</span><span class=\"m\">1</span>.1<span class=\"p\">;</span>AES256\n<span
    class=\"m\">39616332393662346639633030633766666336323939346138633238626239363733316431333737</span>\n6463663763366434376437303335643431663431326135300a636261663636336139323033316232\n<span
    class=\"m\">37666439383131393631333332353731633661396431633834326432363936613331623135666565</span>\n6364363039663933620a326563323931643632323031396664646363613636613562366166386439\n<span
    class=\"m\">63653661653037393538356461323239396630643338393231306163343964623866</span>\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nDecryption<span
    class=\"w\"> </span>successful\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span class=\"w\">
    </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\nDanger,<span class=\"w\">
    </span>Will<span class=\"w\"> </span>Robinson\n</pre></div>\n\n</pre>\n\n<p>So
    as you can see, I have <code>secret-file</code> here, and I can encrypt and decrypt\njust
    fine. But if I have that <code>&gt;&gt;</code> in the recipe, add a second file,
    and a\nfailure in a command - well then I'll start getting confused...</p>\n<p>Follow
    along with the workflow of adding a file that I'll need encrypted</p>\n<blockquote>\n<p>Only
    secret-file is in the just recipe here - I add secret-file2 after</p>\n</blockquote>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span class=\"w\">
    </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span
    class=\"w\">  </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nERROR!<span
    class=\"w\"> </span>input<span class=\"w\"> </span>is<span class=\"w\"> </span>not<span
    class=\"w\"> </span>vault<span class=\"w\"> </span>encrypted<span class=\"w\">
    </span>data.<span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file<span
    class=\"w\"> </span>is<span class=\"w\"> </span>not<span class=\"w\"> </span>a<span
    class=\"w\"> </span>vault<span class=\"w\"> </span>encrypted<span class=\"w\">
    </span>file<span class=\"w\"> </span><span class=\"k\">for</span><span class=\"w\">
    </span>/var/home/nic/projects/personal/pype.dev/secret-file\nerror:<span class=\"w\">
    </span>Recipe<span class=\"w\"> </span><span class=\"sb\">`</span>decrypt<span
    class=\"sb\">`</span><span class=\"w\"> </span>failed<span class=\"w\"> </span>with<span
    class=\"w\"> </span><span class=\"nb\">exit</span><span class=\"w\"> </span>code<span
    class=\"w\"> </span><span class=\"m\">1</span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u2717<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Good - secret-file is already decrypted! So lets add another
    file&quot;</span>\nGood<span class=\"w\"> </span>-<span class=\"w\"> </span>secret-file<span
    class=\"w\"> </span>is<span class=\"w\"> </span>already<span class=\"w\"> </span>decrypted!<span
    class=\"w\"> </span>So<span class=\"w\"> </span>lets<span class=\"w\"> </span>add<span
    class=\"w\"> </span>another<span class=\"w\"> </span>file\n\nnic<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Foo Bar Bam Baz&quot;</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span>secret-file2<span class=\"w\">
    \                                   </span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Added secret-file2 to my Just recipes&quot;</span>\nAdded<span
    class=\"w\"> </span>secret-file2<span class=\"w\"> </span>to<span class=\"w\">
    </span>my<span class=\"w\"> </span>Just<span class=\"w\"> </span>recipes\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>encrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nEncryption<span
    class=\"w\"> </span>successful\nEncryption<span class=\"w\"> </span>successful\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nERROR!<span class=\"w\">
    </span>Decryption<span class=\"w\"> </span>failed<span class=\"w\"> </span><span
    class=\"o\">(</span>no<span class=\"w\"> </span>vault<span class=\"w\"> </span>secrets<span
    class=\"w\"> </span>were<span class=\"w\"> </span>found<span class=\"w\"> </span>that<span
    class=\"w\"> </span>could<span class=\"w\"> </span>decrypt<span class=\"o\">)</span><span
    class=\"w\"> </span>on<span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file<span
    class=\"w\"> </span><span class=\"k\">for</span><span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file\nerror:<span
    class=\"w\"> </span>Recipe<span class=\"w\"> </span><span class=\"sb\">`</span>decrypt<span
    class=\"sb\">`</span><span class=\"w\"> </span>failed<span class=\"w\"> </span>with<span
    class=\"w\"> </span><span class=\"nb\">exit</span><span class=\"w\"> </span>code<span
    class=\"w\"> </span><span class=\"m\">1</span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u2717<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Oh no!&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>So what happened?</p>\n<p>Recall
    that my recipes originally had <code>set -e</code> at the top and used <code>&gt;&gt;</code>
    to cat\nmy secret to a file <code>key</code>. Well, when the fir| decryption recipe
    failed the\n<code>key</code> file was left behind. Then when I went to encrypt
    both of my files the\nrecipe got the key again and made a keyfile like this:</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>secretKey\nsecretKey\n</pre></div>\n\n</pre>\n\n<p>The
    encryption recipe encrypted the files with this key, removed the key file,\nand
    then the next decryption recipe failed because when it got the key and made\nthe
    file it looked like</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>secretKey\n</pre></div>\n\n</pre>\n\n<p>So
    the solution in the end is to remake the <code>key</code> file every time (<code>&gt;</code>
    instead\nof <code>&gt;&gt;</code>), or check if it exists, or handle the error
    when the recipe fails, or\njust keep going (<code>set +e</code>)</p>\n<h2 id=\"fin\">Fin
    <a class=\"header-anchor\" href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>And that's how I lost
    some secrets in my homelab once, and how I almost lost a\nsecond time if I hadn't
    noticed the <code>key</code> file in my file tree</p>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>I was wrecked
    by a weird combo of >> and -e</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"TL;DR If state matters then check it in the beginning or handle it on
    a failure... Let me explain I ran into some trouble recently _almost_ losing some
    encrypte\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"I was wrecked by a weird combo of >> and -e |
    Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/i-was-wrecked-by-a-weird-combo-of-and-e\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"I was wrecked by a weird combo of >> and -e | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"TL;DR If state matters then check it in
    the beginning or handle it on a failure... Let me explain I ran into some trouble
    recently _almost_ losing some encrypte\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/i-was-wrecked-by-a-weird-combo-of-and-e</span>\n
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
    Content is handled by the password protection plugin -->\n    <h2 id=\"tldr\">TL;DR
    <a class=\"header-anchor\" href=\"#tldr\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>If state matters then
    check it in the beginning or handle it on a failure... Let me explain</p>\n<p>I
    ran into some trouble recently <em>almost</em> losing some encrypted data... Now\nthis
    would be the second time I've had that happen, so I'm going to write a\nlittle
    bit about it now that I figured it out</p>\n<h2 id=\"the-stage\">The Stage <a
    class=\"header-anchor\" href=\"#the-stage\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Here's the scenario
    - I use <code>ansible-vault</code> to keep some sensitive data in a\nfew public
    repos, and I keep the keys I use in Bitwarden Secrets Manager.</p>\n<p>I use <code>just</code>
    as a command runner and have common <code>just encrypt</code> and <code>just decrypt</code>
    recipes throughout many justfiles. It might look something like this</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>get-vault-key:\n<span class=\"w\">
    \   </span>bws<span class=\"w\"> </span>secret<span class=\"w\"> </span>get<span
    class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\n\nencrypt:\n<span
    class=\"w\">    </span><span class=\"c1\">#!/bin/bash</span>\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>+e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n\ndecrypt:\n<span
    class=\"w\">    </span><span class=\"c1\">#!/bin/bash</span>\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>+e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>decrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>decrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n</pre></div>\n\n</pre>\n\n<h2
    id=\"spoiler\">Spoiler <a class=\"header-anchor\" href=\"#spoiler\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Above is a good example
    of the 2 recipes, but prior to this morning they looked like this</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>get-vault-key:\n<span class=\"w\">
    \   </span>bws<span class=\"w\"> </span>secret<span class=\"w\"> </span>get<span
    class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">
    \ </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\">
    </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\n\n<span
    class=\"c1\"># BAD EXAMPLES! DO NOT DO THIS</span>\n\nencrypt:\n<span class=\"w\">
    \   </span><span class=\"nb\">set</span><span class=\"w\"> </span>-e\n<span class=\"w\">
    \   </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\"> </span>&gt;&gt;<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span class=\"w\">
    </span>encrypt<span class=\"w\"> </span>./secret-file2<span class=\"w\"> </span>--vault-password-file<span
    class=\"w\"> </span>key\n<span class=\"w\">    </span>rm<span class=\"w\"> </span>key\n\ndecrypt:\n<span
    class=\"w\">    </span><span class=\"nb\">set</span><span class=\"w\"> </span>-e\n<span
    class=\"w\">    </span>just<span class=\"w\"> </span>get-vault-key<span class=\"w\">
    </span>&gt;&gt;<span class=\"w\"> </span>key\n<span class=\"w\">    </span>ansible-vault<span
    class=\"w\"> </span>decrypt<span class=\"w\"> </span>./secret-file<span class=\"w\">
    </span>--vault-password-file<span class=\"w\"> </span>key\n<span class=\"w\">
    \   </span>ansible-vault<span class=\"w\"> </span>decrypt<span class=\"w\"> </span>./secret-file2<span
    class=\"w\"> </span>--vault-password-file<span class=\"w\"> </span>key\n<span
    class=\"w\">    </span>rm<span class=\"w\"> </span>key\n</pre></div>\n\n</pre>\n\n<h2
    id=\"problem\">Problem <a class=\"header-anchor\" href=\"#problem\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>So here's the story
    - in real life I started using distrobox when I ran into\nthis and I thought it
    was an issue with different versions of ansible installed\nin distrobox and on
    my desktop. After a few more odd deployment workflows I\nthink I've determined
    that the real problem is that <code>&gt;&gt;</code> appends to a file (see\nthe
    issue yet?), but if my recipes fail (say I try to encrypt an already\nencrypted
    file) then the command exits but what's left on my disk? <code>key</code> is\nstill
    there... and the next time I go to run a command I'll echo the real key\nto the
    <code>key</code> file again and if I called <code>encrypt</code> when the first
    or more files\nin the list were <code>decrypted</code> then they'll be encrypted
    not with my key, but\nwith my key repeated as many times as I ran a command with
    <code>just get-vault-key &gt;&gt; key</code>\nbefore ever removing the key file!</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\nDanger,<span class=\"w\">
    </span>Will<span class=\"w\"> </span>Robinson\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>just<span class=\"w\"> </span>encrypt\nbws<span class=\"w\">
    </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span
    class=\"w\">  </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nEncryption<span
    class=\"w\"> </span>successful\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span class=\"w\">
    </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\n<span class=\"nv\">$ANSIBLE_VAULT</span><span
    class=\"p\">;</span><span class=\"m\">1</span>.1<span class=\"p\">;</span>AES256\n<span
    class=\"m\">39616332393662346639633030633766666336323939346138633238626239363733316431333737</span>\n6463663763366434376437303335643431663431326135300a636261663636336139323033316232\n<span
    class=\"m\">37666439383131393631333332353731633661396431633834326432363936613331623135666565</span>\n6364363039663933620a326563323931643632323031396664646363613636613562366166386439\n<span
    class=\"m\">63653661653037393538356461323239396630643338393231306163343964623866</span>\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nDecryption<span
    class=\"w\"> </span>successful\n\nnic<span class=\"w\"> </span><span class=\"k\">in</span><span
    class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span class=\"w\">
    </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>cat<span class=\"w\"> </span>secret-file\nDanger,<span class=\"w\">
    </span>Will<span class=\"w\"> </span>Robinson\n</pre></div>\n\n</pre>\n\n<p>So
    as you can see, I have <code>secret-file</code> here, and I can encrypt and decrypt\njust
    fine. But if I have that <code>&gt;&gt;</code> in the recipe, add a second file,
    and a\nfailure in a command - well then I'll start getting confused...</p>\n<p>Follow
    along with the workflow of adding a file that I'll need encrypted</p>\n<blockquote>\n<p>Only
    secret-file is in the just recipe here - I add secret-file2 after</p>\n</blockquote>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>nic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span class=\"w\">
    </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span
    class=\"w\">  </span><span class=\"p\">|</span><span class=\"w\"> </span>jq<span
    class=\"w\"> </span>-r<span class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nERROR!<span
    class=\"w\"> </span>input<span class=\"w\"> </span>is<span class=\"w\"> </span>not<span
    class=\"w\"> </span>vault<span class=\"w\"> </span>encrypted<span class=\"w\">
    </span>data.<span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file<span
    class=\"w\"> </span>is<span class=\"w\"> </span>not<span class=\"w\"> </span>a<span
    class=\"w\"> </span>vault<span class=\"w\"> </span>encrypted<span class=\"w\">
    </span>file<span class=\"w\"> </span><span class=\"k\">for</span><span class=\"w\">
    </span>/var/home/nic/projects/personal/pype.dev/secret-file\nerror:<span class=\"w\">
    </span>Recipe<span class=\"w\"> </span><span class=\"sb\">`</span>decrypt<span
    class=\"sb\">`</span><span class=\"w\"> </span>failed<span class=\"w\"> </span>with<span
    class=\"w\"> </span><span class=\"nb\">exit</span><span class=\"w\"> </span>code<span
    class=\"w\"> </span><span class=\"m\">1</span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u2717<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Good - secret-file is already decrypted! So lets add another
    file&quot;</span>\nGood<span class=\"w\"> </span>-<span class=\"w\"> </span>secret-file<span
    class=\"w\"> </span>is<span class=\"w\"> </span>already<span class=\"w\"> </span>decrypted!<span
    class=\"w\"> </span>So<span class=\"w\"> </span>lets<span class=\"w\"> </span>add<span
    class=\"w\"> </span>another<span class=\"w\"> </span>file\n\nnic<span class=\"w\">
    </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">
    \ </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Foo Bar Bam Baz&quot;</span><span
    class=\"w\"> </span>&gt;<span class=\"w\"> </span>secret-file2<span class=\"w\">
    \                                   </span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u276F<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Added secret-file2 to my Just recipes&quot;</span>\nAdded<span
    class=\"w\"> </span>secret-file2<span class=\"w\"> </span>to<span class=\"w\">
    </span>my<span class=\"w\"> </span>Just<span class=\"w\"> </span>recipes\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>encrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nEncryption<span
    class=\"w\"> </span>successful\nEncryption<span class=\"w\"> </span>successful\n\nnic<span
    class=\"w\"> </span><span class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span
    class=\"w\">  </span>\uE725<span class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span
    class=\"w\"> </span>\xD72<span class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span
    class=\"w\"> </span>\uF21B<span class=\"w\"> </span>\xD77<span class=\"w\"> </span>via<span
    class=\"w\"> </span>\uE235<span class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span
    class=\"o\">)</span><span class=\"w\">  </span>\uF427<span class=\"w\"> </span><span
    class=\"o\">(</span>dev<span class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span
    class=\"w\"> </span>\n\u276F<span class=\"w\"> </span>just<span class=\"w\"> </span>decrypt\nbws<span
    class=\"w\"> </span>secret<span class=\"w\"> </span>get<span class=\"w\"> </span><span
    class=\"nv\">$HOMELAB_BOT_VAULT_KEY_ID</span><span class=\"w\">  </span><span
    class=\"p\">|</span><span class=\"w\"> </span>jq<span class=\"w\"> </span>-r<span
    class=\"w\"> </span><span class=\"s1\">&#39;.value&#39;</span>\nERROR!<span class=\"w\">
    </span>Decryption<span class=\"w\"> </span>failed<span class=\"w\"> </span><span
    class=\"o\">(</span>no<span class=\"w\"> </span>vault<span class=\"w\"> </span>secrets<span
    class=\"w\"> </span>were<span class=\"w\"> </span>found<span class=\"w\"> </span>that<span
    class=\"w\"> </span>could<span class=\"w\"> </span>decrypt<span class=\"o\">)</span><span
    class=\"w\"> </span>on<span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file<span
    class=\"w\"> </span><span class=\"k\">for</span><span class=\"w\"> </span>/var/home/nic/projects/personal/pype.dev/secret-file\nerror:<span
    class=\"w\"> </span>Recipe<span class=\"w\"> </span><span class=\"sb\">`</span>decrypt<span
    class=\"sb\">`</span><span class=\"w\"> </span>failed<span class=\"w\"> </span>with<span
    class=\"w\"> </span><span class=\"nb\">exit</span><span class=\"w\"> </span>code<span
    class=\"w\"> </span><span class=\"m\">1</span>\n\nnic<span class=\"w\"> </span><span
    class=\"k\">in</span><span class=\"w\"> </span>pype.dev<span class=\"w\">  </span>\uE725<span
    class=\"w\"> </span>main<span class=\"w\">  </span>\uE79B<span class=\"w\"> </span>\xD72<span
    class=\"w\"> </span>\uF6C1<span class=\"w\"> </span>\xD73<span class=\"w\"> </span>\uF21B<span
    class=\"w\"> </span>\xD78<span class=\"w\"> </span>via<span class=\"w\"> </span>\uE235<span
    class=\"w\">  </span>v3.11.10<span class=\"o\">(</span>pype-dev<span class=\"o\">)</span><span
    class=\"w\">  </span>\uF427<span class=\"w\"> </span><span class=\"o\">(</span>dev<span
    class=\"o\">)</span><span class=\"w\"> </span>\U000F0484<span class=\"w\"> </span>\n\u2717<span
    class=\"w\"> </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Oh no!&quot;</span>\n</pre></div>\n\n</pre>\n\n<p>So what happened?</p>\n<p>Recall
    that my recipes originally had <code>set -e</code> at the top and used <code>&gt;&gt;</code>
    to cat\nmy secret to a file <code>key</code>. Well, when the fir| decryption recipe
    failed the\n<code>key</code> file was left behind. Then when I went to encrypt
    both of my files the\nrecipe got the key again and made a keyfile like this:</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span>secretKey\nsecretKey\n</pre></div>\n\n</pre>\n\n<p>The
    encryption recipe encrypted the files with this key, removed the key file,\nand
    then the next decryption recipe failed because when it got the key and made\nthe
    file it looked like</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>secretKey\n</pre></div>\n\n</pre>\n\n<p>So
    the solution in the end is to remake the <code>key</code> file every time (<code>&gt;</code>
    instead\nof <code>&gt;&gt;</code>), or check if it exists, or handle the error
    when the recipe fails, or\njust keep going (<code>set +e</code>)</p>\n<h2 id=\"fin\">Fin
    <a class=\"header-anchor\" href=\"#fin\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>And that's how I lost
    some secrets in my homelab once, and how I almost lost a\nsecond time if I hadn't
    noticed the <code>key</code> file in my file tree</p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2025-04-23 08:44:59\ntemplateKey: blog-post\ntitle: I was wrecked
    by a weird combo of >> and -e\npublished: True\ntags:\n  - linux\n  - cli\n  -
    tech\n\n---\n\n## TL;DR\n\nIf state matters then check it in the beginning or
    handle it on a failure... Let me explain\n\nI ran into some trouble recently _almost_
    losing some encrypted data... Now\nthis would be the second time I've had that
    happen, so I'm going to write a\nlittle bit about it now that I figured it out\n\n##
    The Stage\n\nHere's the scenario - I use `ansible-vault` to keep some sensitive
    data in a\nfew public repos, and I keep the keys I use in Bitwarden Secrets Manager.\n\nI
    use `just` as a command runner and have common `just encrypt` and `just\ndecrypt`
    recipes throughout many justfiles. It might look something like this\n\n```bash\n\nget-vault-key:\n
    \   bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\n\nencrypt:\n    #!/bin/bash\n
    \   set +e\n    just get-vault-key > key\n    ansible-vault encrypt ./secret-file
    --vault-password-file key\n    ansible-vault encrypt ./secret-file2 --vault-password-file
    key\n    rm key\n\ndecrypt:\n    #!/bin/bash\n    set +e\n    just get-vault-key
    > key\n    ansible-vault decrypt ./secret-file --vault-password-file key\n    ansible-vault
    decrypt ./secret-file2 --vault-password-file key\n    rm key\n```\n\n## Spoiler\n\nAbove
    is a good example of the 2 recipes, but prior to this morning they looked like
    this\n\n```bash\n\nget-vault-key:\n    bws secret get $HOMELAB_BOT_VAULT_KEY_ID
    \ | jq -r '.value'\n\n# BAD EXAMPLES! DO NOT DO THIS\n\nencrypt:\n    set -e\n
    \   just get-vault-key >> key\n    ansible-vault encrypt ./secret-file --vault-password-file
    key\n    ansible-vault encrypt ./secret-file2 --vault-password-file key\n    rm
    key\n\ndecrypt:\n    set -e\n    just get-vault-key >> key\n    ansible-vault
    decrypt ./secret-file --vault-password-file key\n    ansible-vault decrypt ./secret-file2
    --vault-password-file key\n    rm key\n```\n\n## Problem\n\nSo here's the story
    - in real life I started using distrobox when I ran into\nthis and I thought it
    was an issue with different versions of ansible installed\nin distrobox and on
    my desktop. After a few more odd deployment workflows I\nthink I've determined
    that the real problem is that `>>` appends to a file (see\nthe issue yet?), but
    if my recipes fail (say I try to encrypt an already\nencrypted file) then the
    command exits but what's left on my disk? `key` is\nstill there... and the next
    time I go to run a command I'll echo the real key\nto the `key` file again and
    if I called `encrypt` when the first or more files\nin the list were `decrypted`
    then they'll be encrypted not with my key, but\nwith my key repeated as many times
    as I ran a command with `just get-vault-key >> key`\nbefore ever removing the
    key file!\n\n```bash\n\nnic in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73
    \uF21B \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484 \n\u276F
    cat secret-file\nDanger, Will Robinson\n\nnic in pype.dev  \uE725 main  \uE79B
    \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
    \n\u276F just encrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\nEncryption
    successful\n\nnic in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD77
    via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484 \n\u276F cat secret-file\n$ANSIBLE_VAULT;1.1;AES256\n39616332393662346639633030633766666336323939346138633238626239363733316431333737\n6463663763366434376437303335643431663431326135300a636261663636336139323033316232\n37666439383131393631333332353731633661396431633834326432363936613331623135666565\n6364363039663933620a326563323931643632323031396664646363613636613562366166386439\n63653661653037393538356461323239396630643338393231306163343964623866\n\nnic
    in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)
    \ \uF427 (dev) \U000F0484 \n\u276F just decrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID
    \ | jq -r '.value'\nDecryption successful\n\nnic in pype.dev  \uE725 main  \uE79B
    \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
    \n\u276F cat secret-file\nDanger, Will Robinson\n```\n\nSo as you can see, I have
    `secret-file` here, and I can encrypt and decrypt\njust fine. But if I have that
    `>>` in the recipe, add a second file, and a\nfailure in a command - well then
    I'll start getting confused...\n\nFollow along with the workflow of adding a file
    that I'll need encrypted\n\n> Only secret-file is in the just recipe here - I
    add secret-file2 after\n\n```bash\nnic in pype.dev  \uE725 main  \uE79B \xD72
    \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
    \n\u276F just decrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\nERROR!
    input is not vault encrypted data. /var/home/nic/projects/personal/pype.dev/secret-file
    is not a vault encrypted file for /var/home/nic/projects/personal/pype.dev/secret-file\nerror:
    Recipe `decrypt` failed with exit code 1\n\nnic in pype.dev  \uE725 main  \uE79B
    \xD72 \uF6C1 \xD73 \uF21B \xD78 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
    \n\u2717 echo \"Good - secret-file is already decrypted! So lets add another file\"\nGood
    - secret-file is already decrypted! So lets add another file\n\nnic in pype.dev
    \ \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)
    \ \uF427 (dev) \U000F0484 \n\u276F echo \"Foo Bar Bam Baz\" > secret-file2                                    \n\nnic
    in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73 \uF21B \xD78 via \uE235  v3.11.10(pype-dev)
    \ \uF427 (dev) \U000F0484 \n\u276F echo \"Added secret-file2 to my Just recipes\"\nAdded
    secret-file2 to my Just recipes\n\nnic in pype.dev  \uE725 main  \uE79B \xD72
    \uF6C1 \xD73 \uF21B \xD78 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
    \n\u276F just encrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\nEncryption
    successful\nEncryption successful\n\nnic in pype.dev  \uE725 main  \uE79B \xD72
    \uF6C1 \xD73 \uF21B \xD77 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484
    \n\u276F just decrypt\nbws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'\nERROR!
    Decryption failed (no vault secrets were found that could decrypt) on /var/home/nic/projects/personal/pype.dev/secret-file
    for /var/home/nic/projects/personal/pype.dev/secret-file\nerror: Recipe `decrypt`
    failed with exit code 1\n\nnic in pype.dev  \uE725 main  \uE79B \xD72 \uF6C1 \xD73
    \uF21B \xD78 via \uE235  v3.11.10(pype-dev)  \uF427 (dev) \U000F0484 \n\u2717
    echo \"Oh no!\"\n```\n\nSo what happened?\n\nRecall that my recipes originally
    had `set -e` at the top and used `>>` to cat\nmy secret to a file `key`. Well,
    when the fir| decryption recipe failed the\n`key` file was left behind. Then when
    I went to encrypt both of my files the\nrecipe got the key again and made a keyfile
    like this:\n\n```bash\nsecretKey\nsecretKey\n```\n\nThe encryption recipe encrypted
    the files with this key, removed the key file,\nand then the next decryption recipe
    failed because when it got the key and made\nthe file it looked like\n\n```\nsecretKey\n```\n\nSo
    the solution in the end is to remake the `key` file every time (`>` instead\nof
    `>>`), or check if it exists, or handle the error when the recipe fails, or\njust
    keep going (`set +e`)\n\n## Fin\n\nAnd that's how I lost some secrets in my homelab
    once, and how I almost lost a\nsecond time if I hadn't noticed the `key` file
    in my file tree\n"
published: true
slug: i-was-wrecked-by-a-weird-combo-of-and-e
title: I was wrecked by a weird combo of >> and -e


---

## TL;DR

If state matters then check it in the beginning or handle it on a failure... Let me explain

I ran into some trouble recently _almost_ losing some encrypted data... Now
this would be the second time I've had that happen, so I'm going to write a
little bit about it now that I figured it out

## The Stage

Here's the scenario - I use `ansible-vault` to keep some sensitive data in a
few public repos, and I keep the keys I use in Bitwarden Secrets Manager.

I use `just` as a command runner and have common `just encrypt` and `just
decrypt` recipes throughout many justfiles. It might look something like this

```bash

get-vault-key:
    bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'

encrypt:
    #!/bin/bash
    set +e
    just get-vault-key > key
    ansible-vault encrypt ./secret-file --vault-password-file key
    ansible-vault encrypt ./secret-file2 --vault-password-file key
    rm key

decrypt:
    #!/bin/bash
    set +e
    just get-vault-key > key
    ansible-vault decrypt ./secret-file --vault-password-file key
    ansible-vault decrypt ./secret-file2 --vault-password-file key
    rm key
```

## Spoiler

Above is a good example of the 2 recipes, but prior to this morning they looked like this

```bash

get-vault-key:
    bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'

# BAD EXAMPLES! DO NOT DO THIS

encrypt:
    set -e
    just get-vault-key >> key
    ansible-vault encrypt ./secret-file --vault-password-file key
    ansible-vault encrypt ./secret-file2 --vault-password-file key
    rm key

decrypt:
    set -e
    just get-vault-key >> key
    ansible-vault decrypt ./secret-file --vault-password-file key
    ansible-vault decrypt ./secret-file2 --vault-password-file key
    rm key
```

## Problem

So here's the story - in real life I started using distrobox when I ran into
this and I thought it was an issue with different versions of ansible installed
in distrobox and on my desktop. After a few more odd deployment workflows I
think I've determined that the real problem is that `>>` appends to a file (see
the issue yet?), but if my recipes fail (say I try to encrypt an already
encrypted file) then the command exits but what's left on my disk? `key` is
still there... and the next time I go to run a command I'll echo the real key
to the `key` file again and if I called `encrypt` when the first or more files
in the list were `decrypted` then they'll be encrypted not with my key, but
with my key repeated as many times as I ran a command with `just get-vault-key >> key`
before ever removing the key file!

```bash

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ cat secret-file
Danger, Will Robinson

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just encrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
Encryption successful

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ cat secret-file
$ANSIBLE_VAULT;1.1;AES256
39616332393662346639633030633766666336323939346138633238626239363733316431333737
6463663763366434376437303335643431663431326135300a636261663636336139323033316232
37666439383131393631333332353731633661396431633834326432363936613331623135666565
6364363039663933620a326563323931643632323031396664646363613636613562366166386439
63653661653037393538356461323239396630643338393231306163343964623866

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just decrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
Decryption successful

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ cat secret-file
Danger, Will Robinson
```

So as you can see, I have `secret-file` here, and I can encrypt and decrypt
just fine. But if I have that `>>` in the recipe, add a second file, and a
failure in a command - well then I'll start getting confused...

Follow along with the workflow of adding a file that I'll need encrypted

> Only secret-file is in the just recipe here - I add secret-file2 after

```bash
nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just decrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
ERROR! input is not vault encrypted data. /var/home/nic/projects/personal/pype.dev/secret-file is not a vault encrypted file for /var/home/nic/projects/personal/pype.dev/secret-file
error: Recipe `decrypt` failed with exit code 1

nic in pype.dev   main   ×2  ×3  ×8 via   v3.11.10(pype-dev)   (dev) 󰒄 
✗ echo "Good - secret-file is already decrypted! So lets add another file"
Good - secret-file is already decrypted! So lets add another file

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ echo "Foo Bar Bam Baz" > secret-file2                                    

nic in pype.dev   main   ×2  ×3  ×8 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ echo "Added secret-file2 to my Just recipes"
Added secret-file2 to my Just recipes

nic in pype.dev   main   ×2  ×3  ×8 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just encrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
Encryption successful
Encryption successful

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just decrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
ERROR! Decryption failed (no vault secrets were found that could decrypt) on /var/home/nic/projects/personal/pype.dev/secret-file for /var/home/nic/projects/personal/pype.dev/secret-file
error: Recipe `decrypt` failed with exit code 1

nic in pype.dev   main   ×2  ×3  ×8 via   v3.11.10(pype-dev)   (dev) 󰒄 
✗ echo "Oh no!"
```

So what happened?

Recall that my recipes originally had `set -e` at the top and used `>>` to cat
my secret to a file `key`. Well, when the fir| decryption recipe failed the
`key` file was left behind. Then when I went to encrypt both of my files the
recipe got the key again and made a keyfile like this:

```bash
secretKey
secretKey
```

The encryption recipe encrypted the files with this key, removed the key file,
and then the next decryption recipe failed because when it got the key and made
the file it looked like

```
secretKey
```

So the solution in the end is to remake the `key` file every time (`>` instead
of `>>`), or check if it exists, or handle the error when the recipe fails, or
just keep going (`set +e`)

## Fin

And that's how I lost some secrets in my homelab once, and how I almost lost a
second time if I hadn't noticed the `key` file in my file tree