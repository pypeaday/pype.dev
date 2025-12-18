---
content: "If you use vim-plug for managing your vim plugins, do yourself a favor and
  snapshot your plugins before upgrading!\n\n\n`:PlugSnapshot`  creates a vim.snapshot
  file that you can use to restore your plugin versions with `vim -S snapshot.vim`\n\nThe
  snapshot file looks like this:\n\n```console\n\u276F cat snapshot.vim\n\" Generated
  by vim-plug\n\" Tue 17 May 2022 03:44:29 PM CDT\n\" :source this file in vim to
  restore the snapshot\n\" or execute: vim -S snapshot.vim\n\nsilent! let g:plugs['Telegraph.nvim'].commit
  = '92e472f4e83acd60eb3766168e66d02718bfefe0'\nsilent! let g:plugs['TrueZen.nvim'].commit
  = '508b977d71650da5c9243698614a9a1416f116d4'\nsilent! let g:plugs['ariake-vim-colors'].commit
  = '9fb35f1255e475631c9df24ecc5485a40360cc7b'\nsilent! let g:plugs['auto-pairs'].commit
  = '39f06b873a8449af8ff6a3eee716d3da14d63a76'\nsilent! let g:plugs['bufutils.vim'].commit
  = '4634feb1312fd73fab66cfaa860e7af3abde935b'\nsilent! let g:plugs['cmp-buffer'].commit
  = '12463cfcd9b14052f9effccbf1d84caa7a2d57f0'\nsilent! let g:plugs['cmp-cmdline'].commit
  = 'c36ca4bc1dedb12b4ba6546b96c43896fd6e7252'\nsilent! let g:plugs['cmp-nvim-lsp'].commit
  = 'e6b5feb2e6560b61f31c756fb9231a0d7b10c73d'\nsilent! let g:plugs['cmp-nvim-ultisnips'].commit
  = '21f02b62deb409ce69928a23406076bd0043ddbc'\nsilent! let g:plugs['cmp-path'].commit
  = '466b6b8270f7ba89abd59f402c73f63c7331ff6e'\nsilent! let g:plugs['cmp-spell'].commit
  = '5602f1a0de7831f8dad5b0c6db45328fbd539971'\nsilent! let g:plugs['compe-tabnine'].commit
  = '33e4af509c27da9ef2c9c3002c01e3ec031797d4'\nsilent! let g:plugs['coverage-highlight.vim'].commit
  = '864e03679ea4168661501246147893cc82020917'\nsilent! let g:plugs['diffurcate.vim'].commit
  = 'b804675072220ff7c7ebcd24a028aa4aa35f09cc'\nsilent! let g:plugs['fzf'].commit
  = '6dcf5c3d7d6c321b17e6a5673f1533d6e8350462'\nsilent! let g:plugs['fzf.vim'].commit
  = 'd5f1f8641b24c0fd5b10a299824362a2a1b20ae0'\nsilent! let g:plugs['git-blame.vim'].commit
  = '9d144b7bed5d8f1c9259551768b7f3b3d1294917'\nsilent! let g:plugs['harpoon'].commit
  = 'd3d3d22b6207f46f8ca64946f4d781e975aec0fc'\nsilent! let g:plugs['instant.nvim'].commit
  = 'c02d72267b12130609b7ad39b76cf7f4a3bc9554'\nsilent! let g:plugs['lsp-colors.nvim'].commit
  = '517fe3ab6b63f9907b093bc9443ef06b56f804f3'\nsilent! let g:plugs['lsp_extensions.nvim'].commit
  = '4011f4aec61ba59c734f5dbf52e91f258b99d985'\nsilent! let g:plugs['lspkind-nvim'].commit
  = '57e5b5dfbe991151b07d272a06e365a77cc3d0e7'\nsilent! let g:plugs['lspsaga.nvim'].commit
  = '8dde091a61ab07f639baaa82b456d3508d0aa7e8'\nsilent! let g:plugs['neoformat'].commit
  = '409ebbba9f4b568ea87ab4f2de90a645cf5d000a'\nsilent! let g:plugs['neovim-fuzzy'].commit
  = '0bef4e1a81c65fc05d31380dd74454bd67733837'\nsilent! let g:plugs['nerdtree'].commit
  = 'eed488b1cd1867bd25f19f90e10440c5cc7d6424'\nsilent! let g:plugs['nerdtree-visual-selection'].commit
  = '05427635ff053a2c542fcf8d7c3744c72575e76c'\nsilent! let g:plugs['nvim-cmp'].commit
  = 'a226b6a4ff72e5e809ed17734318233fb25c87f3'\nsilent! let g:plugs['nvim-compe'].commit
  = 'd186d739c54823e0b010feb205c6f97792322c08'\nsilent! let g:plugs['nvim-lspconfig'].commit
  = '9ff2a06cebd4c8c3af5259d713959ab310125bec'\nsilent! let g:plugs['nvim-lspinstall'].commit
  = '79ec2425d6b39cdcb69d379f3e56847f49be73eb'\nsilent! let g:plugs['nvim-treesitter'].commit
  = '10d57b3ec14cac0b6b759e1eb5594617b8a7e883'\nsilent! let g:plugs['nvim-treesitter-textobjects'].commit
  = '094e8ad3cc839e825f8dcc91352837653e365a8f'\nsilent! let g:plugs['nvim-web-devicons'].commit
  = 'bdd43421437f2ef037e0dafeaaaa62b31d35ef2f'\nsilent! let g:plugs['playground'].commit
  = '71b00a3c665298e5155ad64a9020135808d4e3e8'\nsilent! let g:plugs['plenary.nvim'].commit
  = '25b3475b97f241e6f76249747bc209e70c5d2ec8'\nsilent! let g:plugs['popup.nvim'].commit
  = 'b7404d35d5d3548a82149238289fa71f7f6de4ac'\nsilent! let g:plugs['syntastic'].commit
  = 'b7f4f71539038d33f173bfa72631737da049575a'\nsilent! let g:plugs['tabular'].commit
  = '339091ac4dd1f17e225fe7d57b48aff55f99b23a'\nsilent! let g:plugs['targets.vim'].commit
  = '8d6ff2984cdfaebe5b7a6eee8f226a6dd1226f2d'\nsilent! let g:plugs['telescope-fzy-native.nvim'].commit
  = '7b3d2528102f858036627a68821ccf5fc1d78ce4'\nsilent! let g:plugs['telescope.nvim'].commit
  = '39b12d84e86f5054e2ed98829b367598ae53ab41'\nsilent! let g:plugs['termopen.vim'].commit
  = '3194a991a18a9be2fd9fcf8c4c55fe990c04b2bd'\nsilent! let g:plugs['tokyonight.nvim'].commit
  = '8223c970677e4d88c9b6b6d81bda23daf11062bb'\nsilent! let g:plugs['trouble.nvim'].commit
  = 'da61737d860ddc12f78e638152834487eabf0ee5'\nsilent! let g:plugs['ultisnips'].commit
  = 'f5ccf0977c611ffd774ca180774959301baaffad'\nsilent! let g:plugs['undotree'].commit
  = '08e259be24d4476c1ee745dc735eefd44f90efdc'\nsilent! let g:plugs['vim-airline'].commit
  = 'c4655701431a9c79704c827fd88a4783ec946879'\nsilent! let g:plugs['vim-airline-themes'].commit
  = '97cf3e6e638f936187d5f6e9b5eb1bdf0a4df256'\nsilent! let g:plugs['vim-be-good'].commit
  = 'bc499a06c14c729b22a6cc7e730a9fbc44d4e737'\nsilent! let g:plugs['vim-commentary'].commit
  = '3654775824337f466109f00eaf6759760f65be34'\nsilent! let g:plugs['vim-devicons'].commit
  = 'a2258658661e42dd4cdba4958805dbad1fe29ef4'\nsilent! let g:plugs['vim-dispatch'].commit
  = '00e77d90452e3c710014b26dc61ea919bc895e92'\nsilent! let g:plugs['vim-flake8'].commit
  = 'a99054ef98e8fdaefa1315af4649138bcadbfdf7'\nsilent! let g:plugs['vim-floaterm'].commit
  = 'ab7876f86c05c1935eb23a193f4f276132902ac1'\nsilent! let g:plugs['vim-fugitive'].commit
  = 'f529acef74b4266d94f22414c60b4a8930c1e0f3'\nsilent! let g:plugs['vim-gitbranch'].commit
  = '1a8ba866f3eaf0194783b9f8573339d6ede8f1ed'\nsilent! let g:plugs['vim-indent-object'].commit
  = '5c5b24c959478929b54a9e831a8e2e651a465965'\nsilent! let g:plugs['vim-nerdtree-syntax-highlight'].commit
  = '5178ee4d7f4e7761187df30bb709f703d91df18a'\nsilent! let g:plugs['vim-polyglot'].commit
  = '38282d58387cff48ac203f6912c05e4c8686141b'\nsilent! let g:plugs['vim-pydocstring'].commit
  = 'f6e3c52bfaf4b4f76dab4d84e75b94199d5f3b9c'\nsilent! let g:plugs['vim-quicklink'].commit
  = '021167741588555501594e1fc31f130b16acefa0'\nsilent! let g:plugs['vim-repeat'].commit
  = '24afe922e6a05891756ecf331f39a1f6743d3d5a'\nsilent! let g:plugs['vim-signify'].commit
  = '69498f6d49f3eeac06870012416dd9bf867b84f3'\nsilent! let g:plugs['vim-sneak'].commit
  = '94c2de47ab301d476a2baec9ffda07367046bec9'\nsilent! let g:plugs['vim-snippets'].commit
  = '6f270bb2d26c38765ff2243e9337c65f8a96a28b'\nsilent! let g:plugs['vim-startify'].commit
  = '81e36c352a8deea54df5ec1e2f4348685569bed2'\nsilent! let g:plugs['vim-surround'].commit
  = 'bf3480dc9ae7bea34c78fbba4c65b4548b5b1fea'\nsilent! let g:plugs['vim-test'].commit
  = '2240d7a4b868cb594b7d83544e1b6db4df806e5e'\nsilent! let g:plugs['vim-tmux-runner'].commit
  = '54767911fd5e6e2d8e493847149e315ac2e6531a'\nsilent! let g:plugs['vim-ultest'].commit
  = '6978fd32e3ca2c1c5591884eea0d57a7ee43d212'\nsilent! let g:plugs['vim-visualstar'].commit
  = 'a18cd0e7a03311ac709595c1d261ed44b45c9098'\nsilent! let g:plugs['vimtex'].commit
  = 'dfaca59bbbf0079ab1b4f159337ae7f17d1b5289'\nsilent! let g:plugs['which-key.nvim'].commit
  = 'bd4411a2ed4dd8bb69c125e339d837028a6eea71'\n\nPlugUpdate!\n\n```"
date: 2022-05-13
description: 'If you use vim-plug for managing your vim plugins, do yourself a favor
  and snapshot your plugins before upgrading! `:PlugSnapshot`  creates a vim.snapshot
  file '
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Plug-Snapshot-To-Save-Your-Life</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"If you use vim-plug for managing your
    vim plugins, do yourself a favor and snapshot your plugins before upgrading! `:PlugSnapshot`
    \ creates a vim.snapshot file \" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Plug-Snapshot-To-Save-Your-Life | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/plug-snapshot-to-save-your-life\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Plug-Snapshot-To-Save-Your-Life | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"If you use vim-plug for managing your vim plugins, do yourself a favor
    and snapshot your plugins before upgrading! `:PlugSnapshot`  creates a vim.snapshot
    file \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/plug-snapshot-to-save-your-life</span>\n
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
    class=\"post-terminal  post-terminal--til \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Plug-Snapshot-To-Save-Your-Life</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-13\">\n
    \           May 13, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>If you use vim-plug for managing your
    vim plugins, do yourself a favor and snapshot your plugins before upgrading!</p>\n<p><code>:PlugSnapshot</code>
    \ creates a vim.snapshot file that you can use to restore your plugin versions
    with <code>vim -S snapshot.vim</code></p>\n<p>The snapshot file looks like this:</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"go\">\u276F
    cat snapshot.vim</span>\n<span class=\"go\">&quot; Generated by vim-plug</span>\n<span
    class=\"go\">&quot; Tue 17 May 2022 03:44:29 PM CDT</span>\n<span class=\"go\">&quot;
    :source this file in vim to restore the snapshot</span>\n<span class=\"go\">&quot;
    or execute: vim -S snapshot.vim</span>\n\n<span class=\"go\">silent! let g:plugs[&#39;Telegraph.nvim&#39;].commit
    = &#39;92e472f4e83acd60eb3766168e66d02718bfefe0&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;TrueZen.nvim&#39;].commit = &#39;508b977d71650da5c9243698614a9a1416f116d4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;ariake-vim-colors&#39;].commit = &#39;9fb35f1255e475631c9df24ecc5485a40360cc7b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;auto-pairs&#39;].commit = &#39;39f06b873a8449af8ff6a3eee716d3da14d63a76&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;bufutils.vim&#39;].commit = &#39;4634feb1312fd73fab66cfaa860e7af3abde935b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-buffer&#39;].commit = &#39;12463cfcd9b14052f9effccbf1d84caa7a2d57f0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-cmdline&#39;].commit = &#39;c36ca4bc1dedb12b4ba6546b96c43896fd6e7252&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-nvim-lsp&#39;].commit = &#39;e6b5feb2e6560b61f31c756fb9231a0d7b10c73d&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-nvim-ultisnips&#39;].commit = &#39;21f02b62deb409ce69928a23406076bd0043ddbc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-path&#39;].commit = &#39;466b6b8270f7ba89abd59f402c73f63c7331ff6e&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-spell&#39;].commit = &#39;5602f1a0de7831f8dad5b0c6db45328fbd539971&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;compe-tabnine&#39;].commit = &#39;33e4af509c27da9ef2c9c3002c01e3ec031797d4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;coverage-highlight.vim&#39;].commit = &#39;864e03679ea4168661501246147893cc82020917&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;diffurcate.vim&#39;].commit = &#39;b804675072220ff7c7ebcd24a028aa4aa35f09cc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;fzf&#39;].commit = &#39;6dcf5c3d7d6c321b17e6a5673f1533d6e8350462&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;fzf.vim&#39;].commit = &#39;d5f1f8641b24c0fd5b10a299824362a2a1b20ae0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;git-blame.vim&#39;].commit = &#39;9d144b7bed5d8f1c9259551768b7f3b3d1294917&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;harpoon&#39;].commit = &#39;d3d3d22b6207f46f8ca64946f4d781e975aec0fc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;instant.nvim&#39;].commit = &#39;c02d72267b12130609b7ad39b76cf7f4a3bc9554&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lsp-colors.nvim&#39;].commit = &#39;517fe3ab6b63f9907b093bc9443ef06b56f804f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lsp_extensions.nvim&#39;].commit = &#39;4011f4aec61ba59c734f5dbf52e91f258b99d985&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lspkind-nvim&#39;].commit = &#39;57e5b5dfbe991151b07d272a06e365a77cc3d0e7&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lspsaga.nvim&#39;].commit = &#39;8dde091a61ab07f639baaa82b456d3508d0aa7e8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;neoformat&#39;].commit = &#39;409ebbba9f4b568ea87ab4f2de90a645cf5d000a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;neovim-fuzzy&#39;].commit = &#39;0bef4e1a81c65fc05d31380dd74454bd67733837&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nerdtree&#39;].commit = &#39;eed488b1cd1867bd25f19f90e10440c5cc7d6424&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nerdtree-visual-selection&#39;].commit =
    &#39;05427635ff053a2c542fcf8d7c3744c72575e76c&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;nvim-cmp&#39;].commit = &#39;a226b6a4ff72e5e809ed17734318233fb25c87f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-compe&#39;].commit = &#39;d186d739c54823e0b010feb205c6f97792322c08&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-lspconfig&#39;].commit = &#39;9ff2a06cebd4c8c3af5259d713959ab310125bec&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-lspinstall&#39;].commit = &#39;79ec2425d6b39cdcb69d379f3e56847f49be73eb&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-treesitter&#39;].commit = &#39;10d57b3ec14cac0b6b759e1eb5594617b8a7e883&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-treesitter-textobjects&#39;].commit
    = &#39;094e8ad3cc839e825f8dcc91352837653e365a8f&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;nvim-web-devicons&#39;].commit = &#39;bdd43421437f2ef037e0dafeaaaa62b31d35ef2f&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;playground&#39;].commit = &#39;71b00a3c665298e5155ad64a9020135808d4e3e8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;plenary.nvim&#39;].commit = &#39;25b3475b97f241e6f76249747bc209e70c5d2ec8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;popup.nvim&#39;].commit = &#39;b7404d35d5d3548a82149238289fa71f7f6de4ac&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;syntastic&#39;].commit = &#39;b7f4f71539038d33f173bfa72631737da049575a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;tabular&#39;].commit = &#39;339091ac4dd1f17e225fe7d57b48aff55f99b23a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;targets.vim&#39;].commit = &#39;8d6ff2984cdfaebe5b7a6eee8f226a6dd1226f2d&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;telescope-fzy-native.nvim&#39;].commit =
    &#39;7b3d2528102f858036627a68821ccf5fc1d78ce4&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;telescope.nvim&#39;].commit = &#39;39b12d84e86f5054e2ed98829b367598ae53ab41&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;termopen.vim&#39;].commit = &#39;3194a991a18a9be2fd9fcf8c4c55fe990c04b2bd&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;tokyonight.nvim&#39;].commit = &#39;8223c970677e4d88c9b6b6d81bda23daf11062bb&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;trouble.nvim&#39;].commit = &#39;da61737d860ddc12f78e638152834487eabf0ee5&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;ultisnips&#39;].commit = &#39;f5ccf0977c611ffd774ca180774959301baaffad&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;undotree&#39;].commit = &#39;08e259be24d4476c1ee745dc735eefd44f90efdc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-airline&#39;].commit = &#39;c4655701431a9c79704c827fd88a4783ec946879&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-airline-themes&#39;].commit = &#39;97cf3e6e638f936187d5f6e9b5eb1bdf0a4df256&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-be-good&#39;].commit = &#39;bc499a06c14c729b22a6cc7e730a9fbc44d4e737&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-commentary&#39;].commit = &#39;3654775824337f466109f00eaf6759760f65be34&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-devicons&#39;].commit = &#39;a2258658661e42dd4cdba4958805dbad1fe29ef4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-dispatch&#39;].commit = &#39;00e77d90452e3c710014b26dc61ea919bc895e92&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-flake8&#39;].commit = &#39;a99054ef98e8fdaefa1315af4649138bcadbfdf7&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-floaterm&#39;].commit = &#39;ab7876f86c05c1935eb23a193f4f276132902ac1&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-fugitive&#39;].commit = &#39;f529acef74b4266d94f22414c60b4a8930c1e0f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-gitbranch&#39;].commit = &#39;1a8ba866f3eaf0194783b9f8573339d6ede8f1ed&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-indent-object&#39;].commit = &#39;5c5b24c959478929b54a9e831a8e2e651a465965&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-nerdtree-syntax-highlight&#39;].commit
    = &#39;5178ee4d7f4e7761187df30bb709f703d91df18a&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;vim-polyglot&#39;].commit = &#39;38282d58387cff48ac203f6912c05e4c8686141b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-pydocstring&#39;].commit = &#39;f6e3c52bfaf4b4f76dab4d84e75b94199d5f3b9c&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-quicklink&#39;].commit = &#39;021167741588555501594e1fc31f130b16acefa0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-repeat&#39;].commit = &#39;24afe922e6a05891756ecf331f39a1f6743d3d5a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-signify&#39;].commit = &#39;69498f6d49f3eeac06870012416dd9bf867b84f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-sneak&#39;].commit = &#39;94c2de47ab301d476a2baec9ffda07367046bec9&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-snippets&#39;].commit = &#39;6f270bb2d26c38765ff2243e9337c65f8a96a28b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-startify&#39;].commit = &#39;81e36c352a8deea54df5ec1e2f4348685569bed2&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-surround&#39;].commit = &#39;bf3480dc9ae7bea34c78fbba4c65b4548b5b1fea&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-test&#39;].commit = &#39;2240d7a4b868cb594b7d83544e1b6db4df806e5e&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-tmux-runner&#39;].commit = &#39;54767911fd5e6e2d8e493847149e315ac2e6531a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-ultest&#39;].commit = &#39;6978fd32e3ca2c1c5591884eea0d57a7ee43d212&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-visualstar&#39;].commit = &#39;a18cd0e7a03311ac709595c1d261ed44b45c9098&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vimtex&#39;].commit = &#39;dfaca59bbbf0079ab1b4f159337ae7f17d1b5289&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;which-key.nvim&#39;].commit = &#39;bd4411a2ed4dd8bb69c125e339d837028a6eea71&#39;</span>\n\n<span
    class=\"go\">PlugUpdate!</span>\n</pre></div>\n\n</pre>\n\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Plug-Snapshot-To-Save-Your-Life</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"If you use vim-plug for managing your
    vim plugins, do yourself a favor and snapshot your plugins before upgrading! `:PlugSnapshot`
    \ creates a vim.snapshot file \" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Plug-Snapshot-To-Save-Your-Life | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/plug-snapshot-to-save-your-life\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Plug-Snapshot-To-Save-Your-Life | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"If you use vim-plug for managing your vim plugins, do yourself a favor
    and snapshot your plugins before upgrading! `:PlugSnapshot`  creates a vim.snapshot
    file \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Plug-Snapshot-To-Save-Your-Life</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-13\">\n
    \           May 13, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap
    gap-2\">\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/til/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal  post-terminal--til \">\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Plug-Snapshot-To-Save-Your-Life</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-05-13\">\n            May 13, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/til/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #til\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>If
    you use vim-plug for managing your vim plugins, do yourself a favor and snapshot
    your plugins before upgrading!</p>\n<p><code>:PlugSnapshot</code>  creates a vim.snapshot
    file that you can use to restore your plugin versions with <code>vim -S snapshot.vim</code></p>\n<p>The
    snapshot file looks like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"go\">\u276F
    cat snapshot.vim</span>\n<span class=\"go\">&quot; Generated by vim-plug</span>\n<span
    class=\"go\">&quot; Tue 17 May 2022 03:44:29 PM CDT</span>\n<span class=\"go\">&quot;
    :source this file in vim to restore the snapshot</span>\n<span class=\"go\">&quot;
    or execute: vim -S snapshot.vim</span>\n\n<span class=\"go\">silent! let g:plugs[&#39;Telegraph.nvim&#39;].commit
    = &#39;92e472f4e83acd60eb3766168e66d02718bfefe0&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;TrueZen.nvim&#39;].commit = &#39;508b977d71650da5c9243698614a9a1416f116d4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;ariake-vim-colors&#39;].commit = &#39;9fb35f1255e475631c9df24ecc5485a40360cc7b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;auto-pairs&#39;].commit = &#39;39f06b873a8449af8ff6a3eee716d3da14d63a76&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;bufutils.vim&#39;].commit = &#39;4634feb1312fd73fab66cfaa860e7af3abde935b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-buffer&#39;].commit = &#39;12463cfcd9b14052f9effccbf1d84caa7a2d57f0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-cmdline&#39;].commit = &#39;c36ca4bc1dedb12b4ba6546b96c43896fd6e7252&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-nvim-lsp&#39;].commit = &#39;e6b5feb2e6560b61f31c756fb9231a0d7b10c73d&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-nvim-ultisnips&#39;].commit = &#39;21f02b62deb409ce69928a23406076bd0043ddbc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-path&#39;].commit = &#39;466b6b8270f7ba89abd59f402c73f63c7331ff6e&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-spell&#39;].commit = &#39;5602f1a0de7831f8dad5b0c6db45328fbd539971&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;compe-tabnine&#39;].commit = &#39;33e4af509c27da9ef2c9c3002c01e3ec031797d4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;coverage-highlight.vim&#39;].commit = &#39;864e03679ea4168661501246147893cc82020917&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;diffurcate.vim&#39;].commit = &#39;b804675072220ff7c7ebcd24a028aa4aa35f09cc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;fzf&#39;].commit = &#39;6dcf5c3d7d6c321b17e6a5673f1533d6e8350462&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;fzf.vim&#39;].commit = &#39;d5f1f8641b24c0fd5b10a299824362a2a1b20ae0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;git-blame.vim&#39;].commit = &#39;9d144b7bed5d8f1c9259551768b7f3b3d1294917&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;harpoon&#39;].commit = &#39;d3d3d22b6207f46f8ca64946f4d781e975aec0fc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;instant.nvim&#39;].commit = &#39;c02d72267b12130609b7ad39b76cf7f4a3bc9554&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lsp-colors.nvim&#39;].commit = &#39;517fe3ab6b63f9907b093bc9443ef06b56f804f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lsp_extensions.nvim&#39;].commit = &#39;4011f4aec61ba59c734f5dbf52e91f258b99d985&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lspkind-nvim&#39;].commit = &#39;57e5b5dfbe991151b07d272a06e365a77cc3d0e7&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lspsaga.nvim&#39;].commit = &#39;8dde091a61ab07f639baaa82b456d3508d0aa7e8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;neoformat&#39;].commit = &#39;409ebbba9f4b568ea87ab4f2de90a645cf5d000a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;neovim-fuzzy&#39;].commit = &#39;0bef4e1a81c65fc05d31380dd74454bd67733837&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nerdtree&#39;].commit = &#39;eed488b1cd1867bd25f19f90e10440c5cc7d6424&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nerdtree-visual-selection&#39;].commit =
    &#39;05427635ff053a2c542fcf8d7c3744c72575e76c&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;nvim-cmp&#39;].commit = &#39;a226b6a4ff72e5e809ed17734318233fb25c87f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-compe&#39;].commit = &#39;d186d739c54823e0b010feb205c6f97792322c08&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-lspconfig&#39;].commit = &#39;9ff2a06cebd4c8c3af5259d713959ab310125bec&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-lspinstall&#39;].commit = &#39;79ec2425d6b39cdcb69d379f3e56847f49be73eb&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-treesitter&#39;].commit = &#39;10d57b3ec14cac0b6b759e1eb5594617b8a7e883&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-treesitter-textobjects&#39;].commit
    = &#39;094e8ad3cc839e825f8dcc91352837653e365a8f&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;nvim-web-devicons&#39;].commit = &#39;bdd43421437f2ef037e0dafeaaaa62b31d35ef2f&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;playground&#39;].commit = &#39;71b00a3c665298e5155ad64a9020135808d4e3e8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;plenary.nvim&#39;].commit = &#39;25b3475b97f241e6f76249747bc209e70c5d2ec8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;popup.nvim&#39;].commit = &#39;b7404d35d5d3548a82149238289fa71f7f6de4ac&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;syntastic&#39;].commit = &#39;b7f4f71539038d33f173bfa72631737da049575a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;tabular&#39;].commit = &#39;339091ac4dd1f17e225fe7d57b48aff55f99b23a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;targets.vim&#39;].commit = &#39;8d6ff2984cdfaebe5b7a6eee8f226a6dd1226f2d&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;telescope-fzy-native.nvim&#39;].commit =
    &#39;7b3d2528102f858036627a68821ccf5fc1d78ce4&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;telescope.nvim&#39;].commit = &#39;39b12d84e86f5054e2ed98829b367598ae53ab41&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;termopen.vim&#39;].commit = &#39;3194a991a18a9be2fd9fcf8c4c55fe990c04b2bd&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;tokyonight.nvim&#39;].commit = &#39;8223c970677e4d88c9b6b6d81bda23daf11062bb&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;trouble.nvim&#39;].commit = &#39;da61737d860ddc12f78e638152834487eabf0ee5&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;ultisnips&#39;].commit = &#39;f5ccf0977c611ffd774ca180774959301baaffad&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;undotree&#39;].commit = &#39;08e259be24d4476c1ee745dc735eefd44f90efdc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-airline&#39;].commit = &#39;c4655701431a9c79704c827fd88a4783ec946879&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-airline-themes&#39;].commit = &#39;97cf3e6e638f936187d5f6e9b5eb1bdf0a4df256&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-be-good&#39;].commit = &#39;bc499a06c14c729b22a6cc7e730a9fbc44d4e737&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-commentary&#39;].commit = &#39;3654775824337f466109f00eaf6759760f65be34&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-devicons&#39;].commit = &#39;a2258658661e42dd4cdba4958805dbad1fe29ef4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-dispatch&#39;].commit = &#39;00e77d90452e3c710014b26dc61ea919bc895e92&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-flake8&#39;].commit = &#39;a99054ef98e8fdaefa1315af4649138bcadbfdf7&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-floaterm&#39;].commit = &#39;ab7876f86c05c1935eb23a193f4f276132902ac1&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-fugitive&#39;].commit = &#39;f529acef74b4266d94f22414c60b4a8930c1e0f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-gitbranch&#39;].commit = &#39;1a8ba866f3eaf0194783b9f8573339d6ede8f1ed&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-indent-object&#39;].commit = &#39;5c5b24c959478929b54a9e831a8e2e651a465965&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-nerdtree-syntax-highlight&#39;].commit
    = &#39;5178ee4d7f4e7761187df30bb709f703d91df18a&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;vim-polyglot&#39;].commit = &#39;38282d58387cff48ac203f6912c05e4c8686141b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-pydocstring&#39;].commit = &#39;f6e3c52bfaf4b4f76dab4d84e75b94199d5f3b9c&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-quicklink&#39;].commit = &#39;021167741588555501594e1fc31f130b16acefa0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-repeat&#39;].commit = &#39;24afe922e6a05891756ecf331f39a1f6743d3d5a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-signify&#39;].commit = &#39;69498f6d49f3eeac06870012416dd9bf867b84f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-sneak&#39;].commit = &#39;94c2de47ab301d476a2baec9ffda07367046bec9&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-snippets&#39;].commit = &#39;6f270bb2d26c38765ff2243e9337c65f8a96a28b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-startify&#39;].commit = &#39;81e36c352a8deea54df5ec1e2f4348685569bed2&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-surround&#39;].commit = &#39;bf3480dc9ae7bea34c78fbba4c65b4548b5b1fea&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-test&#39;].commit = &#39;2240d7a4b868cb594b7d83544e1b6db4df806e5e&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-tmux-runner&#39;].commit = &#39;54767911fd5e6e2d8e493847149e315ac2e6531a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-ultest&#39;].commit = &#39;6978fd32e3ca2c1c5591884eea0d57a7ee43d212&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-visualstar&#39;].commit = &#39;a18cd0e7a03311ac709595c1d261ed44b45c9098&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vimtex&#39;].commit = &#39;dfaca59bbbf0079ab1b4f159337ae7f17d1b5289&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;which-key.nvim&#39;].commit = &#39;bd4411a2ed4dd8bb69c125e339d837028a6eea71&#39;</span>\n\n<span
    class=\"go\">PlugUpdate!</span>\n</pre></div>\n\n</pre>\n\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Plug-Snapshot-To-Save-Your-Life</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"If you use vim-plug for managing your
    vim plugins, do yourself a favor and snapshot your plugins before upgrading! `:PlugSnapshot`
    \ creates a vim.snapshot file \" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Plug-Snapshot-To-Save-Your-Life | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/plug-snapshot-to-save-your-life\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Plug-Snapshot-To-Save-Your-Life | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"If you use vim-plug for managing your vim plugins, do yourself a favor
    and snapshot your plugins before upgrading! `:PlugSnapshot`  creates a vim.snapshot
    file \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/plug-snapshot-to-save-your-life</span>\n
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
    Content is handled by the password protection plugin -->\n    <p>If you use vim-plug
    for managing your vim plugins, do yourself a favor and snapshot your plugins before
    upgrading!</p>\n<p><code>:PlugSnapshot</code>  creates a vim.snapshot file that
    you can use to restore your plugin versions with <code>vim -S snapshot.vim</code></p>\n<p>The
    snapshot file looks like this:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"go\">\u276F
    cat snapshot.vim</span>\n<span class=\"go\">&quot; Generated by vim-plug</span>\n<span
    class=\"go\">&quot; Tue 17 May 2022 03:44:29 PM CDT</span>\n<span class=\"go\">&quot;
    :source this file in vim to restore the snapshot</span>\n<span class=\"go\">&quot;
    or execute: vim -S snapshot.vim</span>\n\n<span class=\"go\">silent! let g:plugs[&#39;Telegraph.nvim&#39;].commit
    = &#39;92e472f4e83acd60eb3766168e66d02718bfefe0&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;TrueZen.nvim&#39;].commit = &#39;508b977d71650da5c9243698614a9a1416f116d4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;ariake-vim-colors&#39;].commit = &#39;9fb35f1255e475631c9df24ecc5485a40360cc7b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;auto-pairs&#39;].commit = &#39;39f06b873a8449af8ff6a3eee716d3da14d63a76&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;bufutils.vim&#39;].commit = &#39;4634feb1312fd73fab66cfaa860e7af3abde935b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-buffer&#39;].commit = &#39;12463cfcd9b14052f9effccbf1d84caa7a2d57f0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-cmdline&#39;].commit = &#39;c36ca4bc1dedb12b4ba6546b96c43896fd6e7252&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-nvim-lsp&#39;].commit = &#39;e6b5feb2e6560b61f31c756fb9231a0d7b10c73d&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-nvim-ultisnips&#39;].commit = &#39;21f02b62deb409ce69928a23406076bd0043ddbc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-path&#39;].commit = &#39;466b6b8270f7ba89abd59f402c73f63c7331ff6e&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;cmp-spell&#39;].commit = &#39;5602f1a0de7831f8dad5b0c6db45328fbd539971&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;compe-tabnine&#39;].commit = &#39;33e4af509c27da9ef2c9c3002c01e3ec031797d4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;coverage-highlight.vim&#39;].commit = &#39;864e03679ea4168661501246147893cc82020917&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;diffurcate.vim&#39;].commit = &#39;b804675072220ff7c7ebcd24a028aa4aa35f09cc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;fzf&#39;].commit = &#39;6dcf5c3d7d6c321b17e6a5673f1533d6e8350462&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;fzf.vim&#39;].commit = &#39;d5f1f8641b24c0fd5b10a299824362a2a1b20ae0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;git-blame.vim&#39;].commit = &#39;9d144b7bed5d8f1c9259551768b7f3b3d1294917&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;harpoon&#39;].commit = &#39;d3d3d22b6207f46f8ca64946f4d781e975aec0fc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;instant.nvim&#39;].commit = &#39;c02d72267b12130609b7ad39b76cf7f4a3bc9554&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lsp-colors.nvim&#39;].commit = &#39;517fe3ab6b63f9907b093bc9443ef06b56f804f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lsp_extensions.nvim&#39;].commit = &#39;4011f4aec61ba59c734f5dbf52e91f258b99d985&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lspkind-nvim&#39;].commit = &#39;57e5b5dfbe991151b07d272a06e365a77cc3d0e7&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;lspsaga.nvim&#39;].commit = &#39;8dde091a61ab07f639baaa82b456d3508d0aa7e8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;neoformat&#39;].commit = &#39;409ebbba9f4b568ea87ab4f2de90a645cf5d000a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;neovim-fuzzy&#39;].commit = &#39;0bef4e1a81c65fc05d31380dd74454bd67733837&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nerdtree&#39;].commit = &#39;eed488b1cd1867bd25f19f90e10440c5cc7d6424&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nerdtree-visual-selection&#39;].commit =
    &#39;05427635ff053a2c542fcf8d7c3744c72575e76c&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;nvim-cmp&#39;].commit = &#39;a226b6a4ff72e5e809ed17734318233fb25c87f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-compe&#39;].commit = &#39;d186d739c54823e0b010feb205c6f97792322c08&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-lspconfig&#39;].commit = &#39;9ff2a06cebd4c8c3af5259d713959ab310125bec&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-lspinstall&#39;].commit = &#39;79ec2425d6b39cdcb69d379f3e56847f49be73eb&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-treesitter&#39;].commit = &#39;10d57b3ec14cac0b6b759e1eb5594617b8a7e883&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;nvim-treesitter-textobjects&#39;].commit
    = &#39;094e8ad3cc839e825f8dcc91352837653e365a8f&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;nvim-web-devicons&#39;].commit = &#39;bdd43421437f2ef037e0dafeaaaa62b31d35ef2f&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;playground&#39;].commit = &#39;71b00a3c665298e5155ad64a9020135808d4e3e8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;plenary.nvim&#39;].commit = &#39;25b3475b97f241e6f76249747bc209e70c5d2ec8&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;popup.nvim&#39;].commit = &#39;b7404d35d5d3548a82149238289fa71f7f6de4ac&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;syntastic&#39;].commit = &#39;b7f4f71539038d33f173bfa72631737da049575a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;tabular&#39;].commit = &#39;339091ac4dd1f17e225fe7d57b48aff55f99b23a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;targets.vim&#39;].commit = &#39;8d6ff2984cdfaebe5b7a6eee8f226a6dd1226f2d&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;telescope-fzy-native.nvim&#39;].commit =
    &#39;7b3d2528102f858036627a68821ccf5fc1d78ce4&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;telescope.nvim&#39;].commit = &#39;39b12d84e86f5054e2ed98829b367598ae53ab41&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;termopen.vim&#39;].commit = &#39;3194a991a18a9be2fd9fcf8c4c55fe990c04b2bd&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;tokyonight.nvim&#39;].commit = &#39;8223c970677e4d88c9b6b6d81bda23daf11062bb&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;trouble.nvim&#39;].commit = &#39;da61737d860ddc12f78e638152834487eabf0ee5&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;ultisnips&#39;].commit = &#39;f5ccf0977c611ffd774ca180774959301baaffad&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;undotree&#39;].commit = &#39;08e259be24d4476c1ee745dc735eefd44f90efdc&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-airline&#39;].commit = &#39;c4655701431a9c79704c827fd88a4783ec946879&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-airline-themes&#39;].commit = &#39;97cf3e6e638f936187d5f6e9b5eb1bdf0a4df256&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-be-good&#39;].commit = &#39;bc499a06c14c729b22a6cc7e730a9fbc44d4e737&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-commentary&#39;].commit = &#39;3654775824337f466109f00eaf6759760f65be34&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-devicons&#39;].commit = &#39;a2258658661e42dd4cdba4958805dbad1fe29ef4&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-dispatch&#39;].commit = &#39;00e77d90452e3c710014b26dc61ea919bc895e92&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-flake8&#39;].commit = &#39;a99054ef98e8fdaefa1315af4649138bcadbfdf7&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-floaterm&#39;].commit = &#39;ab7876f86c05c1935eb23a193f4f276132902ac1&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-fugitive&#39;].commit = &#39;f529acef74b4266d94f22414c60b4a8930c1e0f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-gitbranch&#39;].commit = &#39;1a8ba866f3eaf0194783b9f8573339d6ede8f1ed&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-indent-object&#39;].commit = &#39;5c5b24c959478929b54a9e831a8e2e651a465965&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-nerdtree-syntax-highlight&#39;].commit
    = &#39;5178ee4d7f4e7761187df30bb709f703d91df18a&#39;</span>\n<span class=\"go\">silent!
    let g:plugs[&#39;vim-polyglot&#39;].commit = &#39;38282d58387cff48ac203f6912c05e4c8686141b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-pydocstring&#39;].commit = &#39;f6e3c52bfaf4b4f76dab4d84e75b94199d5f3b9c&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-quicklink&#39;].commit = &#39;021167741588555501594e1fc31f130b16acefa0&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-repeat&#39;].commit = &#39;24afe922e6a05891756ecf331f39a1f6743d3d5a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-signify&#39;].commit = &#39;69498f6d49f3eeac06870012416dd9bf867b84f3&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-sneak&#39;].commit = &#39;94c2de47ab301d476a2baec9ffda07367046bec9&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-snippets&#39;].commit = &#39;6f270bb2d26c38765ff2243e9337c65f8a96a28b&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-startify&#39;].commit = &#39;81e36c352a8deea54df5ec1e2f4348685569bed2&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-surround&#39;].commit = &#39;bf3480dc9ae7bea34c78fbba4c65b4548b5b1fea&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-test&#39;].commit = &#39;2240d7a4b868cb594b7d83544e1b6db4df806e5e&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-tmux-runner&#39;].commit = &#39;54767911fd5e6e2d8e493847149e315ac2e6531a&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-ultest&#39;].commit = &#39;6978fd32e3ca2c1c5591884eea0d57a7ee43d212&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vim-visualstar&#39;].commit = &#39;a18cd0e7a03311ac709595c1d261ed44b45c9098&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;vimtex&#39;].commit = &#39;dfaca59bbbf0079ab1b4f159337ae7f17d1b5289&#39;</span>\n<span
    class=\"go\">silent! let g:plugs[&#39;which-key.nvim&#39;].commit = &#39;bd4411a2ed4dd8bb69c125e339d837028a6eea71&#39;</span>\n\n<span
    class=\"go\">PlugUpdate!</span>\n</pre></div>\n\n</pre>\n\n\n        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ntemplateKey: til\ntags: [tech, til]\ntitle: Plug-Snapshot-To-Save-Your-Life\ndate:
    2022-05-13T00:00:00\npublished: True\n#cover: \"media/plug-snapshot-to-save-your-life.png\"\n\n---\n\nIf
    you use vim-plug for managing your vim plugins, do yourself a favor and snapshot
    your plugins before upgrading!\n\n\n`:PlugSnapshot`  creates a vim.snapshot file
    that you can use to restore your plugin versions with `vim -S snapshot.vim`\n\nThe
    snapshot file looks like this:\n\n```console\n\u276F cat snapshot.vim\n\" Generated
    by vim-plug\n\" Tue 17 May 2022 03:44:29 PM CDT\n\" :source this file in vim to
    restore the snapshot\n\" or execute: vim -S snapshot.vim\n\nsilent! let g:plugs['Telegraph.nvim'].commit
    = '92e472f4e83acd60eb3766168e66d02718bfefe0'\nsilent! let g:plugs['TrueZen.nvim'].commit
    = '508b977d71650da5c9243698614a9a1416f116d4'\nsilent! let g:plugs['ariake-vim-colors'].commit
    = '9fb35f1255e475631c9df24ecc5485a40360cc7b'\nsilent! let g:plugs['auto-pairs'].commit
    = '39f06b873a8449af8ff6a3eee716d3da14d63a76'\nsilent! let g:plugs['bufutils.vim'].commit
    = '4634feb1312fd73fab66cfaa860e7af3abde935b'\nsilent! let g:plugs['cmp-buffer'].commit
    = '12463cfcd9b14052f9effccbf1d84caa7a2d57f0'\nsilent! let g:plugs['cmp-cmdline'].commit
    = 'c36ca4bc1dedb12b4ba6546b96c43896fd6e7252'\nsilent! let g:plugs['cmp-nvim-lsp'].commit
    = 'e6b5feb2e6560b61f31c756fb9231a0d7b10c73d'\nsilent! let g:plugs['cmp-nvim-ultisnips'].commit
    = '21f02b62deb409ce69928a23406076bd0043ddbc'\nsilent! let g:plugs['cmp-path'].commit
    = '466b6b8270f7ba89abd59f402c73f63c7331ff6e'\nsilent! let g:plugs['cmp-spell'].commit
    = '5602f1a0de7831f8dad5b0c6db45328fbd539971'\nsilent! let g:plugs['compe-tabnine'].commit
    = '33e4af509c27da9ef2c9c3002c01e3ec031797d4'\nsilent! let g:plugs['coverage-highlight.vim'].commit
    = '864e03679ea4168661501246147893cc82020917'\nsilent! let g:plugs['diffurcate.vim'].commit
    = 'b804675072220ff7c7ebcd24a028aa4aa35f09cc'\nsilent! let g:plugs['fzf'].commit
    = '6dcf5c3d7d6c321b17e6a5673f1533d6e8350462'\nsilent! let g:plugs['fzf.vim'].commit
    = 'd5f1f8641b24c0fd5b10a299824362a2a1b20ae0'\nsilent! let g:plugs['git-blame.vim'].commit
    = '9d144b7bed5d8f1c9259551768b7f3b3d1294917'\nsilent! let g:plugs['harpoon'].commit
    = 'd3d3d22b6207f46f8ca64946f4d781e975aec0fc'\nsilent! let g:plugs['instant.nvim'].commit
    = 'c02d72267b12130609b7ad39b76cf7f4a3bc9554'\nsilent! let g:plugs['lsp-colors.nvim'].commit
    = '517fe3ab6b63f9907b093bc9443ef06b56f804f3'\nsilent! let g:plugs['lsp_extensions.nvim'].commit
    = '4011f4aec61ba59c734f5dbf52e91f258b99d985'\nsilent! let g:plugs['lspkind-nvim'].commit
    = '57e5b5dfbe991151b07d272a06e365a77cc3d0e7'\nsilent! let g:plugs['lspsaga.nvim'].commit
    = '8dde091a61ab07f639baaa82b456d3508d0aa7e8'\nsilent! let g:plugs['neoformat'].commit
    = '409ebbba9f4b568ea87ab4f2de90a645cf5d000a'\nsilent! let g:plugs['neovim-fuzzy'].commit
    = '0bef4e1a81c65fc05d31380dd74454bd67733837'\nsilent! let g:plugs['nerdtree'].commit
    = 'eed488b1cd1867bd25f19f90e10440c5cc7d6424'\nsilent! let g:plugs['nerdtree-visual-selection'].commit
    = '05427635ff053a2c542fcf8d7c3744c72575e76c'\nsilent! let g:plugs['nvim-cmp'].commit
    = 'a226b6a4ff72e5e809ed17734318233fb25c87f3'\nsilent! let g:plugs['nvim-compe'].commit
    = 'd186d739c54823e0b010feb205c6f97792322c08'\nsilent! let g:plugs['nvim-lspconfig'].commit
    = '9ff2a06cebd4c8c3af5259d713959ab310125bec'\nsilent! let g:plugs['nvim-lspinstall'].commit
    = '79ec2425d6b39cdcb69d379f3e56847f49be73eb'\nsilent! let g:plugs['nvim-treesitter'].commit
    = '10d57b3ec14cac0b6b759e1eb5594617b8a7e883'\nsilent! let g:plugs['nvim-treesitter-textobjects'].commit
    = '094e8ad3cc839e825f8dcc91352837653e365a8f'\nsilent! let g:plugs['nvim-web-devicons'].commit
    = 'bdd43421437f2ef037e0dafeaaaa62b31d35ef2f'\nsilent! let g:plugs['playground'].commit
    = '71b00a3c665298e5155ad64a9020135808d4e3e8'\nsilent! let g:plugs['plenary.nvim'].commit
    = '25b3475b97f241e6f76249747bc209e70c5d2ec8'\nsilent! let g:plugs['popup.nvim'].commit
    = 'b7404d35d5d3548a82149238289fa71f7f6de4ac'\nsilent! let g:plugs['syntastic'].commit
    = 'b7f4f71539038d33f173bfa72631737da049575a'\nsilent! let g:plugs['tabular'].commit
    = '339091ac4dd1f17e225fe7d57b48aff55f99b23a'\nsilent! let g:plugs['targets.vim'].commit
    = '8d6ff2984cdfaebe5b7a6eee8f226a6dd1226f2d'\nsilent! let g:plugs['telescope-fzy-native.nvim'].commit
    = '7b3d2528102f858036627a68821ccf5fc1d78ce4'\nsilent! let g:plugs['telescope.nvim'].commit
    = '39b12d84e86f5054e2ed98829b367598ae53ab41'\nsilent! let g:plugs['termopen.vim'].commit
    = '3194a991a18a9be2fd9fcf8c4c55fe990c04b2bd'\nsilent! let g:plugs['tokyonight.nvim'].commit
    = '8223c970677e4d88c9b6b6d81bda23daf11062bb'\nsilent! let g:plugs['trouble.nvim'].commit
    = 'da61737d860ddc12f78e638152834487eabf0ee5'\nsilent! let g:plugs['ultisnips'].commit
    = 'f5ccf0977c611ffd774ca180774959301baaffad'\nsilent! let g:plugs['undotree'].commit
    = '08e259be24d4476c1ee745dc735eefd44f90efdc'\nsilent! let g:plugs['vim-airline'].commit
    = 'c4655701431a9c79704c827fd88a4783ec946879'\nsilent! let g:plugs['vim-airline-themes'].commit
    = '97cf3e6e638f936187d5f6e9b5eb1bdf0a4df256'\nsilent! let g:plugs['vim-be-good'].commit
    = 'bc499a06c14c729b22a6cc7e730a9fbc44d4e737'\nsilent! let g:plugs['vim-commentary'].commit
    = '3654775824337f466109f00eaf6759760f65be34'\nsilent! let g:plugs['vim-devicons'].commit
    = 'a2258658661e42dd4cdba4958805dbad1fe29ef4'\nsilent! let g:plugs['vim-dispatch'].commit
    = '00e77d90452e3c710014b26dc61ea919bc895e92'\nsilent! let g:plugs['vim-flake8'].commit
    = 'a99054ef98e8fdaefa1315af4649138bcadbfdf7'\nsilent! let g:plugs['vim-floaterm'].commit
    = 'ab7876f86c05c1935eb23a193f4f276132902ac1'\nsilent! let g:plugs['vim-fugitive'].commit
    = 'f529acef74b4266d94f22414c60b4a8930c1e0f3'\nsilent! let g:plugs['vim-gitbranch'].commit
    = '1a8ba866f3eaf0194783b9f8573339d6ede8f1ed'\nsilent! let g:plugs['vim-indent-object'].commit
    = '5c5b24c959478929b54a9e831a8e2e651a465965'\nsilent! let g:plugs['vim-nerdtree-syntax-highlight'].commit
    = '5178ee4d7f4e7761187df30bb709f703d91df18a'\nsilent! let g:plugs['vim-polyglot'].commit
    = '38282d58387cff48ac203f6912c05e4c8686141b'\nsilent! let g:plugs['vim-pydocstring'].commit
    = 'f6e3c52bfaf4b4f76dab4d84e75b94199d5f3b9c'\nsilent! let g:plugs['vim-quicklink'].commit
    = '021167741588555501594e1fc31f130b16acefa0'\nsilent! let g:plugs['vim-repeat'].commit
    = '24afe922e6a05891756ecf331f39a1f6743d3d5a'\nsilent! let g:plugs['vim-signify'].commit
    = '69498f6d49f3eeac06870012416dd9bf867b84f3'\nsilent! let g:plugs['vim-sneak'].commit
    = '94c2de47ab301d476a2baec9ffda07367046bec9'\nsilent! let g:plugs['vim-snippets'].commit
    = '6f270bb2d26c38765ff2243e9337c65f8a96a28b'\nsilent! let g:plugs['vim-startify'].commit
    = '81e36c352a8deea54df5ec1e2f4348685569bed2'\nsilent! let g:plugs['vim-surround'].commit
    = 'bf3480dc9ae7bea34c78fbba4c65b4548b5b1fea'\nsilent! let g:plugs['vim-test'].commit
    = '2240d7a4b868cb594b7d83544e1b6db4df806e5e'\nsilent! let g:plugs['vim-tmux-runner'].commit
    = '54767911fd5e6e2d8e493847149e315ac2e6531a'\nsilent! let g:plugs['vim-ultest'].commit
    = '6978fd32e3ca2c1c5591884eea0d57a7ee43d212'\nsilent! let g:plugs['vim-visualstar'].commit
    = 'a18cd0e7a03311ac709595c1d261ed44b45c9098'\nsilent! let g:plugs['vimtex'].commit
    = 'dfaca59bbbf0079ab1b4f159337ae7f17d1b5289'\nsilent! let g:plugs['which-key.nvim'].commit
    = 'bd4411a2ed4dd8bb69c125e339d837028a6eea71'\n\nPlugUpdate!\n\n```\n"
published: true
slug: plug-snapshot-to-save-your-life
title: Plug-Snapshot-To-Save-Your-Life


---

If you use vim-plug for managing your vim plugins, do yourself a favor and snapshot your plugins before upgrading!


`:PlugSnapshot`  creates a vim.snapshot file that you can use to restore your plugin versions with `vim -S snapshot.vim`

The snapshot file looks like this:

```console
❯ cat snapshot.vim
" Generated by vim-plug
" Tue 17 May 2022 03:44:29 PM CDT
" :source this file in vim to restore the snapshot
" or execute: vim -S snapshot.vim

silent! let g:plugs['Telegraph.nvim'].commit = '92e472f4e83acd60eb3766168e66d02718bfefe0'
silent! let g:plugs['TrueZen.nvim'].commit = '508b977d71650da5c9243698614a9a1416f116d4'
silent! let g:plugs['ariake-vim-colors'].commit = '9fb35f1255e475631c9df24ecc5485a40360cc7b'
silent! let g:plugs['auto-pairs'].commit = '39f06b873a8449af8ff6a3eee716d3da14d63a76'
silent! let g:plugs['bufutils.vim'].commit = '4634feb1312fd73fab66cfaa860e7af3abde935b'
silent! let g:plugs['cmp-buffer'].commit = '12463cfcd9b14052f9effccbf1d84caa7a2d57f0'
silent! let g:plugs['cmp-cmdline'].commit = 'c36ca4bc1dedb12b4ba6546b96c43896fd6e7252'
silent! let g:plugs['cmp-nvim-lsp'].commit = 'e6b5feb2e6560b61f31c756fb9231a0d7b10c73d'
silent! let g:plugs['cmp-nvim-ultisnips'].commit = '21f02b62deb409ce69928a23406076bd0043ddbc'
silent! let g:plugs['cmp-path'].commit = '466b6b8270f7ba89abd59f402c73f63c7331ff6e'
silent! let g:plugs['cmp-spell'].commit = '5602f1a0de7831f8dad5b0c6db45328fbd539971'
silent! let g:plugs['compe-tabnine'].commit = '33e4af509c27da9ef2c9c3002c01e3ec031797d4'
silent! let g:plugs['coverage-highlight.vim'].commit = '864e03679ea4168661501246147893cc82020917'
silent! let g:plugs['diffurcate.vim'].commit = 'b804675072220ff7c7ebcd24a028aa4aa35f09cc'
silent! let g:plugs['fzf'].commit = '6dcf5c3d7d6c321b17e6a5673f1533d6e8350462'
silent! let g:plugs['fzf.vim'].commit = 'd5f1f8641b24c0fd5b10a299824362a2a1b20ae0'
silent! let g:plugs['git-blame.vim'].commit = '9d144b7bed5d8f1c9259551768b7f3b3d1294917'
silent! let g:plugs['harpoon'].commit = 'd3d3d22b6207f46f8ca64946f4d781e975aec0fc'
silent! let g:plugs['instant.nvim'].commit = 'c02d72267b12130609b7ad39b76cf7f4a3bc9554'
silent! let g:plugs['lsp-colors.nvim'].commit = '517fe3ab6b63f9907b093bc9443ef06b56f804f3'
silent! let g:plugs['lsp_extensions.nvim'].commit = '4011f4aec61ba59c734f5dbf52e91f258b99d985'
silent! let g:plugs['lspkind-nvim'].commit = '57e5b5dfbe991151b07d272a06e365a77cc3d0e7'
silent! let g:plugs['lspsaga.nvim'].commit = '8dde091a61ab07f639baaa82b456d3508d0aa7e8'
silent! let g:plugs['neoformat'].commit = '409ebbba9f4b568ea87ab4f2de90a645cf5d000a'
silent! let g:plugs['neovim-fuzzy'].commit = '0bef4e1a81c65fc05d31380dd74454bd67733837'
silent! let g:plugs['nerdtree'].commit = 'eed488b1cd1867bd25f19f90e10440c5cc7d6424'
silent! let g:plugs['nerdtree-visual-selection'].commit = '05427635ff053a2c542fcf8d7c3744c72575e76c'
silent! let g:plugs['nvim-cmp'].commit = 'a226b6a4ff72e5e809ed17734318233fb25c87f3'
silent! let g:plugs['nvim-compe'].commit = 'd186d739c54823e0b010feb205c6f97792322c08'
silent! let g:plugs['nvim-lspconfig'].commit = '9ff2a06cebd4c8c3af5259d713959ab310125bec'
silent! let g:plugs['nvim-lspinstall'].commit = '79ec2425d6b39cdcb69d379f3e56847f49be73eb'
silent! let g:plugs['nvim-treesitter'].commit = '10d57b3ec14cac0b6b759e1eb5594617b8a7e883'
silent! let g:plugs['nvim-treesitter-textobjects'].commit = '094e8ad3cc839e825f8dcc91352837653e365a8f'
silent! let g:plugs['nvim-web-devicons'].commit = 'bdd43421437f2ef037e0dafeaaaa62b31d35ef2f'
silent! let g:plugs['playground'].commit = '71b00a3c665298e5155ad64a9020135808d4e3e8'
silent! let g:plugs['plenary.nvim'].commit = '25b3475b97f241e6f76249747bc209e70c5d2ec8'
silent! let g:plugs['popup.nvim'].commit = 'b7404d35d5d3548a82149238289fa71f7f6de4ac'
silent! let g:plugs['syntastic'].commit = 'b7f4f71539038d33f173bfa72631737da049575a'
silent! let g:plugs['tabular'].commit = '339091ac4dd1f17e225fe7d57b48aff55f99b23a'
silent! let g:plugs['targets.vim'].commit = '8d6ff2984cdfaebe5b7a6eee8f226a6dd1226f2d'
silent! let g:plugs['telescope-fzy-native.nvim'].commit = '7b3d2528102f858036627a68821ccf5fc1d78ce4'
silent! let g:plugs['telescope.nvim'].commit = '39b12d84e86f5054e2ed98829b367598ae53ab41'
silent! let g:plugs['termopen.vim'].commit = '3194a991a18a9be2fd9fcf8c4c55fe990c04b2bd'
silent! let g:plugs['tokyonight.nvim'].commit = '8223c970677e4d88c9b6b6d81bda23daf11062bb'
silent! let g:plugs['trouble.nvim'].commit = 'da61737d860ddc12f78e638152834487eabf0ee5'
silent! let g:plugs['ultisnips'].commit = 'f5ccf0977c611ffd774ca180774959301baaffad'
silent! let g:plugs['undotree'].commit = '08e259be24d4476c1ee745dc735eefd44f90efdc'
silent! let g:plugs['vim-airline'].commit = 'c4655701431a9c79704c827fd88a4783ec946879'
silent! let g:plugs['vim-airline-themes'].commit = '97cf3e6e638f936187d5f6e9b5eb1bdf0a4df256'
silent! let g:plugs['vim-be-good'].commit = 'bc499a06c14c729b22a6cc7e730a9fbc44d4e737'
silent! let g:plugs['vim-commentary'].commit = '3654775824337f466109f00eaf6759760f65be34'
silent! let g:plugs['vim-devicons'].commit = 'a2258658661e42dd4cdba4958805dbad1fe29ef4'
silent! let g:plugs['vim-dispatch'].commit = '00e77d90452e3c710014b26dc61ea919bc895e92'
silent! let g:plugs['vim-flake8'].commit = 'a99054ef98e8fdaefa1315af4649138bcadbfdf7'
silent! let g:plugs['vim-floaterm'].commit = 'ab7876f86c05c1935eb23a193f4f276132902ac1'
silent! let g:plugs['vim-fugitive'].commit = 'f529acef74b4266d94f22414c60b4a8930c1e0f3'
silent! let g:plugs['vim-gitbranch'].commit = '1a8ba866f3eaf0194783b9f8573339d6ede8f1ed'
silent! let g:plugs['vim-indent-object'].commit = '5c5b24c959478929b54a9e831a8e2e651a465965'
silent! let g:plugs['vim-nerdtree-syntax-highlight'].commit = '5178ee4d7f4e7761187df30bb709f703d91df18a'
silent! let g:plugs['vim-polyglot'].commit = '38282d58387cff48ac203f6912c05e4c8686141b'
silent! let g:plugs['vim-pydocstring'].commit = 'f6e3c52bfaf4b4f76dab4d84e75b94199d5f3b9c'
silent! let g:plugs['vim-quicklink'].commit = '021167741588555501594e1fc31f130b16acefa0'
silent! let g:plugs['vim-repeat'].commit = '24afe922e6a05891756ecf331f39a1f6743d3d5a'
silent! let g:plugs['vim-signify'].commit = '69498f6d49f3eeac06870012416dd9bf867b84f3'
silent! let g:plugs['vim-sneak'].commit = '94c2de47ab301d476a2baec9ffda07367046bec9'
silent! let g:plugs['vim-snippets'].commit = '6f270bb2d26c38765ff2243e9337c65f8a96a28b'
silent! let g:plugs['vim-startify'].commit = '81e36c352a8deea54df5ec1e2f4348685569bed2'
silent! let g:plugs['vim-surround'].commit = 'bf3480dc9ae7bea34c78fbba4c65b4548b5b1fea'
silent! let g:plugs['vim-test'].commit = '2240d7a4b868cb594b7d83544e1b6db4df806e5e'
silent! let g:plugs['vim-tmux-runner'].commit = '54767911fd5e6e2d8e493847149e315ac2e6531a'
silent! let g:plugs['vim-ultest'].commit = '6978fd32e3ca2c1c5591884eea0d57a7ee43d212'
silent! let g:plugs['vim-visualstar'].commit = 'a18cd0e7a03311ac709595c1d261ed44b45c9098'
silent! let g:plugs['vimtex'].commit = 'dfaca59bbbf0079ab1b4f159337ae7f17d1b5289'
silent! let g:plugs['which-key.nvim'].commit = 'bd4411a2ed4dd8bb69c125e339d837028a6eea71'

PlugUpdate!

```