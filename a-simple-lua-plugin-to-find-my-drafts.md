---
content: "I used windsurf to write [[daily-notes-neovim-plugin]] for navigating my
  daily notes in neovim.\n\nFor a while now I've wanted a way to see my blog drafts...
  and tonight finally got the massive courage to prompt gpt-5 to build it for me...\n\n##
  Screenshot\n\n\n![20250811020234_e0c02600.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020234_e0c02600.png)\n\n##
  Code\n\n```lua\n---@diagnostic disable: undefined-global\n-- Blogging plugin: find
  draft blog posts under `pages/`\n-- Draft = YAML front matter contains `published:
  false` (case-insensitive)\n\nlocal M = {}\n\n-- Read file and return YAML front
  matter block as string, or nil\nlocal function read_front_matter(path)\n  local
  fh = io.open(path, \"r\")\n  if not fh then\n    return nil\n  end\n  local content
  = fh:read(\"*a\")\n  fh:close()\n  if not content then\n    return nil\n  end\n\n
  \ -- Front matter starts with --- on first line and ends with --- on its own line\n
  \ -- Support optional CRLF\n  local start_s, start_e = content:find(\"^%-%-%-%s*\\r?\\n\")\n
  \ if not start_e then\n    return nil\n  end\n  local fm_end_s, fm_end_e = content:find(\"\\n%-%-%-%s*\\r?\\n\",
  start_e + 1)\n  if not fm_end_s then\n    return nil\n  end\n  -- Extract between
  the fence lines (exclude the starting and ending --- lines)\n  local front_matter
  = content:sub(start_e + 1, fm_end_s)\n  return front_matter\nend\n\n-- Determine
  if a file is a draft by inspecting front matter for published: false\nfunction M._is_draft(path)\n
  \ local fm = read_front_matter(path)\n  if not fm then\n    return false\n  end\n
  \ -- Find a line starting with `published:` and capture the value\n  -- Trim comments
  and quotes, compare case-insensitively\n  local value = fm:match(\"[Pp][Uu][Bb][Ll][Ii][Ss][Hh][Ee][Dd]%s*:%s*([^\\n\\r]+)\")\n
  \ if not value then\n    return false\n  end\n  -- strip inline comments starting
  with # and surrounding quotes/space\n  value = value:gsub(\"#.*$\", \"\")\n  value
  = value:gsub('\"', \"\"):gsub(\"'\", \"\")\n  value = value:gsub(\"^%s+\", \"\"):gsub(\"%s+$\",
  \"\")\n  local v = value:lower()\n  if v == \"false\" or v == \"no\" or v == \"0\"
  then\n    return true\n  end\n  return false\nend\n\n-- Telescope picker for draft
  posts\nfunction M.find_drafts()\n  local ok_pickers, pickers = pcall(require, \"telescope.pickers\")\n
  \ if not ok_pickers then\n    vim.notify(\"telescope.nvim not available\", vim.log.levels.ERROR)\n
  \   return\n  end\n  local finders = require(\"telescope.finders\")\n  local previewers
  = require(\"telescope.previewers\")\n  local conf = require(\"telescope.config\").values\n
  \ local actions = require(\"telescope.actions\")\n  local action_state = require(\"telescope.actions.state\")\n\n
  \ -- Collect markdown files under pages/\n  local files = vim.fn.glob(\"pages/**/*.md\",
  false, true)\n  local drafts = {}\n  for _, f in ipairs(files) do\n    if M._is_draft(f)
  then\n      table.insert(drafts, f)\n    end\n  end\n\n  if #drafts == 0 then\n
  \   vim.notify(\"No draft blog posts found in pages/\", vim.log.levels.INFO)\n    return\n
  \ end\n\n  -- Simple, version-agnostic entry maker\n  local function entry_maker_fn(line)\n
  \   return {\n      value = line,\n      ordinal = line,\n      display = vim.fn.fnamemodify(line,
  \":~:.\") or line,\n      path = line,\n    }\n  end\n\n  -- Use Telescope builtin
  find_files with a custom command that lists only drafts.\n  -- This guarantees previews
  and matches the style of other file pickers.\n  local tmpfile = vim.fn.tempname()\n
  \ local ok_write, err = pcall(function()\n    local fh = assert(io.open(tmpfile,
  \"w\"))\n    for _, f in ipairs(drafts) do\n      fh:write(f .. \"\\n\")\n    end\n
  \   fh:close()\n  end)\n  if not ok_write then\n    vim.notify(\"Failed to prepare
  drafts list: \" .. tostring(err), vim.log.levels.ERROR)\n    return\n  end\n\n  local
  builtin = require(\"telescope.builtin\")\n  builtin.find_files({\n    prompt_title
  = \"Draft Blog Posts\",\n    -- cat the tmp list so Telescope treats it like find
  output\n    find_command = { \"bash\", \"-lc\", string.format('cat %q', tmpfile)
  },\n    attach_mappings = function(prompt_bufnr, map)\n      local actions = require(\"telescope.actions\")\n
  \     actions.close:enhance({\n        post = function()\n          os.remove(tmpfile)\n
  \       end,\n      })\n      return true\n    end,\n  })\nend\n\n-- Expose a user
  command similar to daily plugin style\nvim.api.nvim_create_user_command(\"BlogDrafts\",
  function()\n  M.find_drafts()\nend, {})\n\nreturn M\n\n\n```"
date: 2025-08-10
description: 'I used windsurf to write [[daily-notes-neovim-plugin]] for navigating
  my daily notes in neovim. For a while now I&#x27;ve wanted a way to see my blog
  drafts... '
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>A Simple Lua Plugin
    To Find My Drafts</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I used windsurf to write [[daily-notes-neovim-plugin]] for navigating
    my daily notes in neovim. For a while now I&#x27;ve wanted a way to see my blog
    drafts... \" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"A Simple Lua Plugin To Find My Drafts | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/a-simple-lua-plugin-to-find-my-drafts\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"A Simple Lua Plugin To Find My Drafts | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I used windsurf to write [[daily-notes-neovim-plugin]] for navigating
    my daily notes in neovim. For a while now I&#x27;ve wanted a way to see my blog
    drafts... \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"
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
    \           <span class=\"site-terminal__dir\">~/a-simple-lua-plugin-to-find-my-drafts</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"
    alt=\"A Simple Lua Plugin To Find My Drafts cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">A
    Simple Lua Plugin To Find My Drafts</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-10\">\n            August
    10, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/neovim/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #neovim\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I used windsurf to write <a class=\"wikilink\"
    href=\"/daily-notes-neovim-plugin\">daily-notes-neovim-plugin</a> for navigating
    my daily notes in neovim.</p>\n<p>For a while now I've wanted a way to see my
    blog drafts... and tonight finally got the massive courage to prompt gpt-5 to
    build it for me...</p>\n<h2 id=\"screenshot\">Screenshot <a class=\"header-anchor\"
    href=\"#screenshot\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020234_e0c02600.png\"
    alt=\"20250811020234_e0c02600.png\" /></p>\n<h2 id=\"code\">Code <a class=\"header-anchor\"
    href=\"#code\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">---@diagnostic
    disable: undefined-global</span>\n<span class=\"c1\">-- Blogging plugin: find
    draft blog posts under `pages/`</span>\n<span class=\"c1\">-- Draft = YAML front
    matter contains `published: false` (case-insensitive)</span>\n\n<span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">M</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{}</span>\n\n<span
    class=\"c1\">-- Read file and return YAML front matter block as string, or nil</span>\n<span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nf\">read_front_matter</span><span class=\"p\">(</span><span
    class=\"nv\">path</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fh</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">io.open</span><span class=\"p\">(</span><span class=\"nv\">path</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;r&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fh</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">content</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">read</span><span class=\"p\">(</span><span class=\"s2\">&quot;*a&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">fh</span><span
    class=\"p\">:</span><span class=\"nf\">close</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">nil</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Front matter starts with --- on first line and ends with --- on
    its own line</span>\n<span class=\"w\">  </span><span class=\"c1\">-- Support
    optional CRLF</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">start_s</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">start_e</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"p\">:</span><span class=\"nf\">find</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;^%-%-%-%s*</span><span class=\"se\">\\r</span><span class=\"s2\">?</span><span
    class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">start_e</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">nil</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fm_end_s</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">fm_end_e</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">content</span><span class=\"p\">:</span><span class=\"nf\">find</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span
    class=\"s2\">%-%-%-%s*</span><span class=\"se\">\\r</span><span class=\"s2\">?</span><span
    class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">start_e</span><span class=\"w\"> </span><span
    class=\"o\">+</span><span class=\"w\"> </span><span class=\"mi\">1</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fm_end_s</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- Extract between the fence lines (exclude
    the starting and ending --- lines)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">front_matter</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"p\">:</span><span class=\"nf\">sub</span><span class=\"p\">(</span><span
    class=\"nv\">start_e</span><span class=\"w\"> </span><span class=\"o\">+</span><span
    class=\"w\"> </span><span class=\"mi\">1</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">fm_end_s</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">front_matter</span>\n<span class=\"kr\">end</span>\n\n<span class=\"c1\">--
    Determine if a file is a draft by inspecting front matter for published: false</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">_is_draft</span><span class=\"p\">(</span><span
    class=\"nv\">path</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fm</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nf\">read_front_matter</span><span class=\"p\">(</span><span class=\"nv\">path</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fm</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">false</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- Find a line starting with `published:`
    and capture the value</span>\n<span class=\"w\">  </span><span class=\"c1\">--
    Trim comments and quotes, compare case-insensitively</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">fm</span><span class=\"p\">:</span><span class=\"nf\">match</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;[Pp][Uu][Bb][Ll][Ii][Ss][Hh][Ee][Dd]%s*:%s*([^</span><span
    class=\"se\">\\n\\r</span><span class=\"s2\">]+)&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">false</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"c1\">-- strip inline comments starting with # and surrounding quotes/space</span>\n<span
    class=\"w\">  </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">gsub</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;#.*$&quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">gsub</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;&quot;&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">):</span><span
    class=\"nf\">gsub</span><span class=\"p\">(</span><span class=\"s2\">&quot;&#39;&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">value</span><span class=\"p\">:</span><span class=\"nf\">gsub</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;^%s+&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">):</span><span
    class=\"nf\">gsub</span><span class=\"p\">(</span><span class=\"s2\">&quot;%s+$&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">v</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">lower</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"nv\">v</span><span class=\"w\"> </span><span class=\"o\">==</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;false&quot;</span><span class=\"w\">
    </span><span class=\"ow\">or</span><span class=\"w\"> </span><span class=\"nv\">v</span><span
    class=\"w\"> </span><span class=\"o\">==</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;no&quot;</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"nv\">v</span><span class=\"w\"> </span><span
    class=\"o\">==</span><span class=\"w\"> </span><span class=\"s2\">&quot;0&quot;</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">true</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">false</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"c1\">-- Telescope picker for draft posts</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">find_drafts</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">ok_pickers</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">pickers</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">pcall</span><span class=\"p\">(</span><span
    class=\"nb\">require</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;telescope.pickers&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">ok_pickers</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.nvim not available&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">ERROR</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">finders</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">require</span><span class=\"p\">(</span><span class=\"s2\">&quot;telescope.finders&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">previewers</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.previewers&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">conf</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.config&quot;</span><span
    class=\"p\">).</span><span class=\"nv\">values</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">actions</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">require</span><span class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">action_state</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions.state&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"c1\">-- Collect
    markdown files under pages/</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"s2\">&quot;pages/**/*.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">drafts</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{}</span>\n<span
    class=\"w\">  </span><span class=\"kr\">for</span><span class=\"w\"> </span><span
    class=\"nv\">_</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">f</span><span class=\"w\"> </span><span class=\"kr\">in</span><span
    class=\"w\"> </span><span class=\"nb\">ipairs</span><span class=\"p\">(</span><span
    class=\"nv\">files</span><span class=\"p\">)</span><span class=\"w\"> </span><span
    class=\"kr\">do</span>\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">M</span><span class=\"p\">.</span><span
    class=\"nf\">_is_draft</span><span class=\"p\">(</span><span class=\"nv\">f</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"nb\">table.insert</span><span class=\"p\">(</span><span
    class=\"nv\">drafts</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">f</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"o\">#</span><span class=\"nv\">drafts</span><span class=\"w\"> </span><span
    class=\"o\">==</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;No draft blog posts found in pages/&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">INFO</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Simple, version-agnostic entry maker</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nf\">entry_maker_fn</span><span class=\"p\">(</span><span
    class=\"nv\">line</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">line</span><span
    class=\"p\">,</span>\n<span class=\"w\">      </span><span class=\"nv\">ordinal</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">line</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nv\">display</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">fnamemodify</span><span
    class=\"p\">(</span><span class=\"nv\">line</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:~:.&quot;</span><span class=\"p\">)</span><span
    class=\"w\"> </span><span class=\"ow\">or</span><span class=\"w\"> </span><span
    class=\"nv\">line</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nv\">path</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">line</span><span class=\"p\">,</span>\n<span
    class=\"w\">    </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span class=\"c1\">-- Use
    Telescope builtin find_files with a custom command that lists only drafts.</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- This guarantees previews and matches
    the style of other file pickers.</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">tmpfile</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">tempname</span><span class=\"p\">()</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">ok_write</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">err</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">pcall</span><span class=\"p\">(</span><span class=\"kr\">function</span><span
    class=\"p\">()</span>\n<span class=\"w\">    </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">fh</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">assert</span><span
    class=\"p\">(</span><span class=\"nb\">io.open</span><span class=\"p\">(</span><span
    class=\"nv\">tmpfile</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;w&quot;</span><span class=\"p\">))</span>\n<span class=\"w\">
    \   </span><span class=\"kr\">for</span><span class=\"w\"> </span><span class=\"nv\">_</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">f</span><span
    class=\"w\"> </span><span class=\"kr\">in</span><span class=\"w\"> </span><span
    class=\"nb\">ipairs</span><span class=\"p\">(</span><span class=\"nv\">drafts</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">do</span>\n<span
    class=\"w\">      </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">write</span><span class=\"p\">(</span><span class=\"nv\">f</span><span
    class=\"w\"> </span><span class=\"o\">..</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">end</span>\n<span
    class=\"w\">    </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">close</span><span class=\"p\">()</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kr\">if</span><span class=\"w\"> </span><span class=\"ow\">not</span><span
    class=\"w\"> </span><span class=\"nv\">ok_write</span><span class=\"w\"> </span><span
    class=\"kr\">then</span>\n<span class=\"w\">    </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">notify</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Failed to prepare drafts list: &quot;</span><span class=\"w\">
    </span><span class=\"o\">..</span><span class=\"w\"> </span><span class=\"nb\">tostring</span><span
    class=\"p\">(</span><span class=\"nv\">err</span><span class=\"p\">),</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">log</span><span class=\"p\">.</span><span class=\"py\">levels</span><span
    class=\"p\">.</span><span class=\"py\">ERROR</span><span class=\"p\">)</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">builtin</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">builtin</span><span
    class=\"p\">.</span><span class=\"nf\">find_files</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">prompt_title</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;Draft
    Blog Posts&quot;</span><span class=\"p\">,</span>\n<span class=\"w\">    </span><span
    class=\"c1\">-- cat the tmp list so Telescope treats it like find output</span>\n<span
    class=\"w\">    </span><span class=\"nv\">find_command</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;bash&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;-lc&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nb\">string.format</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;cat %q&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"nv\">tmpfile</span><span class=\"p\">)</span><span class=\"w\">
    </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"nv\">attach_mappings</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kr\">function</span><span class=\"p\">(</span><span class=\"nv\">prompt_bufnr</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">map</span><span
    class=\"p\">)</span>\n<span class=\"w\">      </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">actions</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">      </span><span class=\"nv\">actions</span><span
    class=\"p\">.</span><span class=\"py\">close</span><span class=\"p\">:</span><span
    class=\"nf\">enhance</span><span class=\"p\">({</span>\n<span class=\"w\">        </span><span
    class=\"nv\">post</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kr\">function</span><span class=\"p\">()</span>\n<span
    class=\"w\">          </span><span class=\"nb\">os.remove</span><span class=\"p\">(</span><span
    class=\"nv\">tmpfile</span><span class=\"p\">)</span>\n<span class=\"w\">        </span><span
    class=\"kr\">end</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"p\">})</span>\n<span class=\"w\">      </span><span class=\"kr\">return</span><span
    class=\"w\"> </span><span class=\"kc\">true</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span><span class=\"p\">,</span>\n<span class=\"w\">  </span><span
    class=\"p\">})</span>\n<span class=\"kr\">end</span>\n\n<span class=\"c1\">--
    Expose a user command similar to daily plugin style</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">api</span><span class=\"p\">.</span><span
    class=\"nf\">nvim_create_user_command</span><span class=\"p\">(</span><span class=\"s2\">&quot;BlogDrafts&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"nv\">M</span><span
    class=\"p\">.</span><span class=\"nf\">find_drafts</span><span class=\"p\">()</span>\n<span
    class=\"kr\">end</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"p\">{})</span>\n\n<span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">M</span>\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>A Simple Lua Plugin
    To Find My Drafts</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I used windsurf to write [[daily-notes-neovim-plugin]] for navigating
    my daily notes in neovim. For a while now I&#x27;ve wanted a way to see my blog
    drafts... \" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"A Simple Lua Plugin To Find My Drafts | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/a-simple-lua-plugin-to-find-my-drafts\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"A Simple Lua Plugin To Find My Drafts | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I used windsurf to write [[daily-notes-neovim-plugin]] for navigating
    my daily notes in neovim. For a while now I&#x27;ve wanted a way to see my blog
    drafts... \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"
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
    mb-4 post-title-large\">A Simple Lua Plugin To Find My Drafts</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-10\">\n
    \           August 10, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/neovim/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #neovim\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"
    alt=\"A Simple Lua Plugin To Find My Drafts cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">A
    Simple Lua Plugin To Find My Drafts</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2025-08-10\">\n            August
    10, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/neovim/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #neovim\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I used windsurf to write <a class=\"wikilink\"
    href=\"/daily-notes-neovim-plugin\">daily-notes-neovim-plugin</a> for navigating
    my daily notes in neovim.</p>\n<p>For a while now I've wanted a way to see my
    blog drafts... and tonight finally got the massive courage to prompt gpt-5 to
    build it for me...</p>\n<h2 id=\"screenshot\">Screenshot <a class=\"header-anchor\"
    href=\"#screenshot\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020234_e0c02600.png\"
    alt=\"20250811020234_e0c02600.png\" /></p>\n<h2 id=\"code\">Code <a class=\"header-anchor\"
    href=\"#code\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">---@diagnostic
    disable: undefined-global</span>\n<span class=\"c1\">-- Blogging plugin: find
    draft blog posts under `pages/`</span>\n<span class=\"c1\">-- Draft = YAML front
    matter contains `published: false` (case-insensitive)</span>\n\n<span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">M</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{}</span>\n\n<span
    class=\"c1\">-- Read file and return YAML front matter block as string, or nil</span>\n<span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nf\">read_front_matter</span><span class=\"p\">(</span><span
    class=\"nv\">path</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fh</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">io.open</span><span class=\"p\">(</span><span class=\"nv\">path</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;r&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fh</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">content</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">read</span><span class=\"p\">(</span><span class=\"s2\">&quot;*a&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">fh</span><span
    class=\"p\">:</span><span class=\"nf\">close</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">nil</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Front matter starts with --- on first line and ends with --- on
    its own line</span>\n<span class=\"w\">  </span><span class=\"c1\">-- Support
    optional CRLF</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">start_s</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">start_e</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"p\">:</span><span class=\"nf\">find</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;^%-%-%-%s*</span><span class=\"se\">\\r</span><span class=\"s2\">?</span><span
    class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">start_e</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">nil</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fm_end_s</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">fm_end_e</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">content</span><span class=\"p\">:</span><span class=\"nf\">find</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span
    class=\"s2\">%-%-%-%s*</span><span class=\"se\">\\r</span><span class=\"s2\">?</span><span
    class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">start_e</span><span class=\"w\"> </span><span
    class=\"o\">+</span><span class=\"w\"> </span><span class=\"mi\">1</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fm_end_s</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- Extract between the fence lines (exclude
    the starting and ending --- lines)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">front_matter</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"p\">:</span><span class=\"nf\">sub</span><span class=\"p\">(</span><span
    class=\"nv\">start_e</span><span class=\"w\"> </span><span class=\"o\">+</span><span
    class=\"w\"> </span><span class=\"mi\">1</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">fm_end_s</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">front_matter</span>\n<span class=\"kr\">end</span>\n\n<span class=\"c1\">--
    Determine if a file is a draft by inspecting front matter for published: false</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">_is_draft</span><span class=\"p\">(</span><span
    class=\"nv\">path</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fm</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nf\">read_front_matter</span><span class=\"p\">(</span><span class=\"nv\">path</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fm</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">false</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- Find a line starting with `published:`
    and capture the value</span>\n<span class=\"w\">  </span><span class=\"c1\">--
    Trim comments and quotes, compare case-insensitively</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">fm</span><span class=\"p\">:</span><span class=\"nf\">match</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;[Pp][Uu][Bb][Ll][Ii][Ss][Hh][Ee][Dd]%s*:%s*([^</span><span
    class=\"se\">\\n\\r</span><span class=\"s2\">]+)&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">false</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"c1\">-- strip inline comments starting with # and surrounding quotes/space</span>\n<span
    class=\"w\">  </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">gsub</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;#.*$&quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">gsub</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;&quot;&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">):</span><span
    class=\"nf\">gsub</span><span class=\"p\">(</span><span class=\"s2\">&quot;&#39;&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">value</span><span class=\"p\">:</span><span class=\"nf\">gsub</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;^%s+&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">):</span><span
    class=\"nf\">gsub</span><span class=\"p\">(</span><span class=\"s2\">&quot;%s+$&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">v</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">lower</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"nv\">v</span><span class=\"w\"> </span><span class=\"o\">==</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;false&quot;</span><span class=\"w\">
    </span><span class=\"ow\">or</span><span class=\"w\"> </span><span class=\"nv\">v</span><span
    class=\"w\"> </span><span class=\"o\">==</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;no&quot;</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"nv\">v</span><span class=\"w\"> </span><span
    class=\"o\">==</span><span class=\"w\"> </span><span class=\"s2\">&quot;0&quot;</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">true</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">false</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"c1\">-- Telescope picker for draft posts</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">find_drafts</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">ok_pickers</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">pickers</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">pcall</span><span class=\"p\">(</span><span
    class=\"nb\">require</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;telescope.pickers&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">ok_pickers</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.nvim not available&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">ERROR</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">finders</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">require</span><span class=\"p\">(</span><span class=\"s2\">&quot;telescope.finders&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">previewers</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.previewers&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">conf</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.config&quot;</span><span
    class=\"p\">).</span><span class=\"nv\">values</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">actions</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">require</span><span class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">action_state</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions.state&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"c1\">-- Collect
    markdown files under pages/</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"s2\">&quot;pages/**/*.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">drafts</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{}</span>\n<span
    class=\"w\">  </span><span class=\"kr\">for</span><span class=\"w\"> </span><span
    class=\"nv\">_</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">f</span><span class=\"w\"> </span><span class=\"kr\">in</span><span
    class=\"w\"> </span><span class=\"nb\">ipairs</span><span class=\"p\">(</span><span
    class=\"nv\">files</span><span class=\"p\">)</span><span class=\"w\"> </span><span
    class=\"kr\">do</span>\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">M</span><span class=\"p\">.</span><span
    class=\"nf\">_is_draft</span><span class=\"p\">(</span><span class=\"nv\">f</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"nb\">table.insert</span><span class=\"p\">(</span><span
    class=\"nv\">drafts</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">f</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"o\">#</span><span class=\"nv\">drafts</span><span class=\"w\"> </span><span
    class=\"o\">==</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;No draft blog posts found in pages/&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">INFO</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Simple, version-agnostic entry maker</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nf\">entry_maker_fn</span><span class=\"p\">(</span><span
    class=\"nv\">line</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">line</span><span
    class=\"p\">,</span>\n<span class=\"w\">      </span><span class=\"nv\">ordinal</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">line</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nv\">display</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">fnamemodify</span><span
    class=\"p\">(</span><span class=\"nv\">line</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:~:.&quot;</span><span class=\"p\">)</span><span
    class=\"w\"> </span><span class=\"ow\">or</span><span class=\"w\"> </span><span
    class=\"nv\">line</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nv\">path</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">line</span><span class=\"p\">,</span>\n<span
    class=\"w\">    </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span class=\"c1\">-- Use
    Telescope builtin find_files with a custom command that lists only drafts.</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- This guarantees previews and matches
    the style of other file pickers.</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">tmpfile</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">tempname</span><span class=\"p\">()</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">ok_write</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">err</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">pcall</span><span class=\"p\">(</span><span class=\"kr\">function</span><span
    class=\"p\">()</span>\n<span class=\"w\">    </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">fh</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">assert</span><span
    class=\"p\">(</span><span class=\"nb\">io.open</span><span class=\"p\">(</span><span
    class=\"nv\">tmpfile</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;w&quot;</span><span class=\"p\">))</span>\n<span class=\"w\">
    \   </span><span class=\"kr\">for</span><span class=\"w\"> </span><span class=\"nv\">_</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">f</span><span
    class=\"w\"> </span><span class=\"kr\">in</span><span class=\"w\"> </span><span
    class=\"nb\">ipairs</span><span class=\"p\">(</span><span class=\"nv\">drafts</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">do</span>\n<span
    class=\"w\">      </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">write</span><span class=\"p\">(</span><span class=\"nv\">f</span><span
    class=\"w\"> </span><span class=\"o\">..</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">end</span>\n<span
    class=\"w\">    </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">close</span><span class=\"p\">()</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kr\">if</span><span class=\"w\"> </span><span class=\"ow\">not</span><span
    class=\"w\"> </span><span class=\"nv\">ok_write</span><span class=\"w\"> </span><span
    class=\"kr\">then</span>\n<span class=\"w\">    </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">notify</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Failed to prepare drafts list: &quot;</span><span class=\"w\">
    </span><span class=\"o\">..</span><span class=\"w\"> </span><span class=\"nb\">tostring</span><span
    class=\"p\">(</span><span class=\"nv\">err</span><span class=\"p\">),</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">log</span><span class=\"p\">.</span><span class=\"py\">levels</span><span
    class=\"p\">.</span><span class=\"py\">ERROR</span><span class=\"p\">)</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">builtin</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">builtin</span><span
    class=\"p\">.</span><span class=\"nf\">find_files</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">prompt_title</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;Draft
    Blog Posts&quot;</span><span class=\"p\">,</span>\n<span class=\"w\">    </span><span
    class=\"c1\">-- cat the tmp list so Telescope treats it like find output</span>\n<span
    class=\"w\">    </span><span class=\"nv\">find_command</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;bash&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;-lc&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nb\">string.format</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;cat %q&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"nv\">tmpfile</span><span class=\"p\">)</span><span class=\"w\">
    </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"nv\">attach_mappings</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kr\">function</span><span class=\"p\">(</span><span class=\"nv\">prompt_bufnr</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">map</span><span
    class=\"p\">)</span>\n<span class=\"w\">      </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">actions</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">      </span><span class=\"nv\">actions</span><span
    class=\"p\">.</span><span class=\"py\">close</span><span class=\"p\">:</span><span
    class=\"nf\">enhance</span><span class=\"p\">({</span>\n<span class=\"w\">        </span><span
    class=\"nv\">post</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kr\">function</span><span class=\"p\">()</span>\n<span
    class=\"w\">          </span><span class=\"nb\">os.remove</span><span class=\"p\">(</span><span
    class=\"nv\">tmpfile</span><span class=\"p\">)</span>\n<span class=\"w\">        </span><span
    class=\"kr\">end</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"p\">})</span>\n<span class=\"w\">      </span><span class=\"kr\">return</span><span
    class=\"w\"> </span><span class=\"kc\">true</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span><span class=\"p\">,</span>\n<span class=\"w\">  </span><span
    class=\"p\">})</span>\n<span class=\"kr\">end</span>\n\n<span class=\"c1\">--
    Expose a user command similar to daily plugin style</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">api</span><span class=\"p\">.</span><span
    class=\"nf\">nvim_create_user_command</span><span class=\"p\">(</span><span class=\"s2\">&quot;BlogDrafts&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"nv\">M</span><span
    class=\"p\">.</span><span class=\"nf\">find_drafts</span><span class=\"p\">()</span>\n<span
    class=\"kr\">end</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"p\">{})</span>\n\n<span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">M</span>\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>A Simple
    Lua Plugin To Find My Drafts</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"I used windsurf to write [[daily-notes-neovim-plugin]] for navigating
    my daily notes in neovim. For a while now I&#x27;ve wanted a way to see my blog
    drafts... \" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"A Simple Lua Plugin To Find My Drafts | Nic Payne\"
    />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/a-simple-lua-plugin-to-find-my-drafts\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"A Simple Lua Plugin To Find My Drafts | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I used windsurf to write [[daily-notes-neovim-plugin]] for navigating
    my daily notes in neovim. For a while now I&#x27;ve wanted a way to see my blog
    drafts... \" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"
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
    \           <span class=\"site-terminal__dir\">~/a-simple-lua-plugin-to-find-my-drafts</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>I used
    windsurf to write <a class=\"wikilink\" href=\"/daily-notes-neovim-plugin\">daily-notes-neovim-plugin</a>
    for navigating my daily notes in neovim.</p>\n<p>For a while now I've wanted a
    way to see my blog drafts... and tonight finally got the massive courage to prompt
    gpt-5 to build it for me...</p>\n<h2 id=\"screenshot\">Screenshot <a class=\"header-anchor\"
    href=\"#screenshot\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020234_e0c02600.png\"
    alt=\"20250811020234_e0c02600.png\" /></p>\n<h2 id=\"code\">Code <a class=\"header-anchor\"
    href=\"#code\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">---@diagnostic
    disable: undefined-global</span>\n<span class=\"c1\">-- Blogging plugin: find
    draft blog posts under `pages/`</span>\n<span class=\"c1\">-- Draft = YAML front
    matter contains `published: false` (case-insensitive)</span>\n\n<span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">M</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{}</span>\n\n<span
    class=\"c1\">-- Read file and return YAML front matter block as string, or nil</span>\n<span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nf\">read_front_matter</span><span class=\"p\">(</span><span
    class=\"nv\">path</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fh</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">io.open</span><span class=\"p\">(</span><span class=\"nv\">path</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;r&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fh</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">content</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">read</span><span class=\"p\">(</span><span class=\"s2\">&quot;*a&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">fh</span><span
    class=\"p\">:</span><span class=\"nf\">close</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">nil</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Front matter starts with --- on first line and ends with --- on
    its own line</span>\n<span class=\"w\">  </span><span class=\"c1\">-- Support
    optional CRLF</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">start_s</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">start_e</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"p\">:</span><span class=\"nf\">find</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;^%-%-%-%s*</span><span class=\"se\">\\r</span><span class=\"s2\">?</span><span
    class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">start_e</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">nil</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fm_end_s</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">fm_end_e</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">content</span><span class=\"p\">:</span><span class=\"nf\">find</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span
    class=\"s2\">%-%-%-%s*</span><span class=\"se\">\\r</span><span class=\"s2\">?</span><span
    class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">start_e</span><span class=\"w\"> </span><span
    class=\"o\">+</span><span class=\"w\"> </span><span class=\"mi\">1</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fm_end_s</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">nil</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- Extract between the fence lines (exclude
    the starting and ending --- lines)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">front_matter</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">content</span><span
    class=\"p\">:</span><span class=\"nf\">sub</span><span class=\"p\">(</span><span
    class=\"nv\">start_e</span><span class=\"w\"> </span><span class=\"o\">+</span><span
    class=\"w\"> </span><span class=\"mi\">1</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nv\">fm_end_s</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">front_matter</span>\n<span class=\"kr\">end</span>\n\n<span class=\"c1\">--
    Determine if a file is a draft by inspecting front matter for published: false</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">_is_draft</span><span class=\"p\">(</span><span
    class=\"nv\">path</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">fm</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nf\">read_front_matter</span><span class=\"p\">(</span><span class=\"nv\">path</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"ow\">not</span><span class=\"w\"> </span><span
    class=\"nv\">fm</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"kc\">false</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- Find a line starting with `published:`
    and capture the value</span>\n<span class=\"w\">  </span><span class=\"c1\">--
    Trim comments and quotes, compare case-insensitively</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">fm</span><span class=\"p\">:</span><span class=\"nf\">match</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;[Pp][Uu][Bb][Ll][Ii][Ss][Hh][Ee][Dd]%s*:%s*([^</span><span
    class=\"se\">\\n\\r</span><span class=\"s2\">]+)&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">false</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"c1\">-- strip inline comments starting with # and surrounding quotes/space</span>\n<span
    class=\"w\">  </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">gsub</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;#.*$&quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">gsub</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;&quot;&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">):</span><span
    class=\"nf\">gsub</span><span class=\"p\">(</span><span class=\"s2\">&quot;&#39;&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">value</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">value</span><span class=\"p\">:</span><span class=\"nf\">gsub</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;^%s+&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span class=\"p\">):</span><span
    class=\"nf\">gsub</span><span class=\"p\">(</span><span class=\"s2\">&quot;%s+$&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">v</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">value</span><span
    class=\"p\">:</span><span class=\"nf\">lower</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"nv\">v</span><span class=\"w\"> </span><span class=\"o\">==</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;false&quot;</span><span class=\"w\">
    </span><span class=\"ow\">or</span><span class=\"w\"> </span><span class=\"nv\">v</span><span
    class=\"w\"> </span><span class=\"o\">==</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;no&quot;</span><span class=\"w\"> </span><span class=\"ow\">or</span><span
    class=\"w\"> </span><span class=\"nv\">v</span><span class=\"w\"> </span><span
    class=\"o\">==</span><span class=\"w\"> </span><span class=\"s2\">&quot;0&quot;</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">true</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"kc\">false</span>\n<span
    class=\"kr\">end</span>\n\n<span class=\"c1\">-- Telescope picker for draft posts</span>\n<span
    class=\"kr\">function</span><span class=\"w\"> </span><span class=\"nc\">M</span><span
    class=\"p\">.</span><span class=\"nf\">find_drafts</span><span class=\"p\">()</span>\n<span
    class=\"w\">  </span><span class=\"kd\">local</span><span class=\"w\"> </span><span
    class=\"nv\">ok_pickers</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">pickers</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nb\">pcall</span><span class=\"p\">(</span><span
    class=\"nb\">require</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;telescope.pickers&quot;</span><span class=\"p\">)</span>\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"ow\">not</span><span class=\"w\"> </span><span class=\"nv\">ok_pickers</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.nvim not available&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">ERROR</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">finders</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">require</span><span class=\"p\">(</span><span class=\"s2\">&quot;telescope.finders&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">previewers</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.previewers&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">conf</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.config&quot;</span><span
    class=\"p\">).</span><span class=\"nv\">values</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">actions</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">require</span><span class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">action_state</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions.state&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"w\">  </span><span class=\"c1\">-- Collect
    markdown files under pages/</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">files</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">glob</span><span class=\"p\">(</span><span class=\"s2\">&quot;pages/**/*.md&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">false</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">drafts</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{}</span>\n<span
    class=\"w\">  </span><span class=\"kr\">for</span><span class=\"w\"> </span><span
    class=\"nv\">_</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">f</span><span class=\"w\"> </span><span class=\"kr\">in</span><span
    class=\"w\"> </span><span class=\"nb\">ipairs</span><span class=\"p\">(</span><span
    class=\"nv\">files</span><span class=\"p\">)</span><span class=\"w\"> </span><span
    class=\"kr\">do</span>\n<span class=\"w\">    </span><span class=\"kr\">if</span><span
    class=\"w\"> </span><span class=\"nv\">M</span><span class=\"p\">.</span><span
    class=\"nf\">_is_draft</span><span class=\"p\">(</span><span class=\"nv\">f</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">then</span>\n<span
    class=\"w\">      </span><span class=\"nb\">table.insert</span><span class=\"p\">(</span><span
    class=\"nv\">drafts</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">f</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span>\n<span class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span
    class=\"w\">  </span><span class=\"kr\">if</span><span class=\"w\"> </span><span
    class=\"o\">#</span><span class=\"nv\">drafts</span><span class=\"w\"> </span><span
    class=\"o\">==</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
    class=\"w\"> </span><span class=\"kr\">then</span>\n<span class=\"w\">    </span><span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"nf\">notify</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;No draft blog posts found in pages/&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">log</span><span class=\"p\">.</span><span
    class=\"py\">levels</span><span class=\"p\">.</span><span class=\"py\">INFO</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">return</span>\n<span
    class=\"w\">  </span><span class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span
    class=\"c1\">-- Simple, version-agnostic entry maker</span>\n<span class=\"w\">
    \ </span><span class=\"kd\">local</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"w\"> </span><span class=\"nf\">entry_maker_fn</span><span class=\"p\">(</span><span
    class=\"nv\">line</span><span class=\"p\">)</span>\n<span class=\"w\">    </span><span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">      </span><span class=\"nv\">value</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">line</span><span
    class=\"p\">,</span>\n<span class=\"w\">      </span><span class=\"nv\">ordinal</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nv\">line</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nv\">display</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">fn</span><span class=\"p\">.</span><span class=\"nf\">fnamemodify</span><span
    class=\"p\">(</span><span class=\"nv\">line</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;:~:.&quot;</span><span class=\"p\">)</span><span
    class=\"w\"> </span><span class=\"ow\">or</span><span class=\"w\"> </span><span
    class=\"nv\">line</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"nv\">path</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"nv\">line</span><span class=\"p\">,</span>\n<span
    class=\"w\">    </span><span class=\"p\">}</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span class=\"c1\">-- Use
    Telescope builtin find_files with a custom command that lists only drafts.</span>\n<span
    class=\"w\">  </span><span class=\"c1\">-- This guarantees previews and matches
    the style of other file pickers.</span>\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">tmpfile</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">fn</span><span class=\"p\">.</span><span
    class=\"nf\">tempname</span><span class=\"p\">()</span>\n<span class=\"w\">  </span><span
    class=\"kd\">local</span><span class=\"w\"> </span><span class=\"nv\">ok_write</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">err</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"nb\">pcall</span><span class=\"p\">(</span><span class=\"kr\">function</span><span
    class=\"p\">()</span>\n<span class=\"w\">    </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">fh</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">assert</span><span
    class=\"p\">(</span><span class=\"nb\">io.open</span><span class=\"p\">(</span><span
    class=\"nv\">tmpfile</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;w&quot;</span><span class=\"p\">))</span>\n<span class=\"w\">
    \   </span><span class=\"kr\">for</span><span class=\"w\"> </span><span class=\"nv\">_</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">f</span><span
    class=\"w\"> </span><span class=\"kr\">in</span><span class=\"w\"> </span><span
    class=\"nb\">ipairs</span><span class=\"p\">(</span><span class=\"nv\">drafts</span><span
    class=\"p\">)</span><span class=\"w\"> </span><span class=\"kr\">do</span>\n<span
    class=\"w\">      </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">write</span><span class=\"p\">(</span><span class=\"nv\">f</span><span
    class=\"w\"> </span><span class=\"o\">..</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">    </span><span class=\"kr\">end</span>\n<span
    class=\"w\">    </span><span class=\"nv\">fh</span><span class=\"p\">:</span><span
    class=\"nf\">close</span><span class=\"p\">()</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span><span class=\"p\">)</span>\n<span class=\"w\">  </span><span
    class=\"kr\">if</span><span class=\"w\"> </span><span class=\"ow\">not</span><span
    class=\"w\"> </span><span class=\"nv\">ok_write</span><span class=\"w\"> </span><span
    class=\"kr\">then</span>\n<span class=\"w\">    </span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"nf\">notify</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Failed to prepare drafts list: &quot;</span><span class=\"w\">
    </span><span class=\"o\">..</span><span class=\"w\"> </span><span class=\"nb\">tostring</span><span
    class=\"p\">(</span><span class=\"nv\">err</span><span class=\"p\">),</span><span
    class=\"w\"> </span><span class=\"nv\">vim</span><span class=\"p\">.</span><span
    class=\"py\">log</span><span class=\"p\">.</span><span class=\"py\">levels</span><span
    class=\"p\">.</span><span class=\"py\">ERROR</span><span class=\"p\">)</span>\n<span
    class=\"w\">    </span><span class=\"kr\">return</span>\n<span class=\"w\">  </span><span
    class=\"kr\">end</span>\n\n<span class=\"w\">  </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">builtin</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.builtin&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">  </span><span class=\"nv\">builtin</span><span
    class=\"p\">.</span><span class=\"nf\">find_files</span><span class=\"p\">({</span>\n<span
    class=\"w\">    </span><span class=\"nv\">prompt_title</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;Draft
    Blog Posts&quot;</span><span class=\"p\">,</span>\n<span class=\"w\">    </span><span
    class=\"c1\">-- cat the tmp list so Telescope treats it like find output</span>\n<span
    class=\"w\">    </span><span class=\"nv\">find_command</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;bash&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;-lc&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"nb\">string.format</span><span class=\"p\">(</span><span
    class=\"s1\">&#39;cat %q&#39;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"nv\">tmpfile</span><span class=\"p\">)</span><span class=\"w\">
    </span><span class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"nv\">attach_mappings</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kr\">function</span><span class=\"p\">(</span><span class=\"nv\">prompt_bufnr</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">map</span><span
    class=\"p\">)</span>\n<span class=\"w\">      </span><span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">actions</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;telescope.actions&quot;</span><span
    class=\"p\">)</span>\n<span class=\"w\">      </span><span class=\"nv\">actions</span><span
    class=\"p\">.</span><span class=\"py\">close</span><span class=\"p\">:</span><span
    class=\"nf\">enhance</span><span class=\"p\">({</span>\n<span class=\"w\">        </span><span
    class=\"nv\">post</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kr\">function</span><span class=\"p\">()</span>\n<span
    class=\"w\">          </span><span class=\"nb\">os.remove</span><span class=\"p\">(</span><span
    class=\"nv\">tmpfile</span><span class=\"p\">)</span>\n<span class=\"w\">        </span><span
    class=\"kr\">end</span><span class=\"p\">,</span>\n<span class=\"w\">      </span><span
    class=\"p\">})</span>\n<span class=\"w\">      </span><span class=\"kr\">return</span><span
    class=\"w\"> </span><span class=\"kc\">true</span>\n<span class=\"w\">    </span><span
    class=\"kr\">end</span><span class=\"p\">,</span>\n<span class=\"w\">  </span><span
    class=\"p\">})</span>\n<span class=\"kr\">end</span>\n\n<span class=\"c1\">--
    Expose a user command similar to daily plugin style</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">api</span><span class=\"p\">.</span><span
    class=\"nf\">nvim_create_user_command</span><span class=\"p\">(</span><span class=\"s2\">&quot;BlogDrafts&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"kr\">function</span><span
    class=\"p\">()</span>\n<span class=\"w\">  </span><span class=\"nv\">M</span><span
    class=\"p\">.</span><span class=\"nf\">find_drafts</span><span class=\"p\">()</span>\n<span
    class=\"kr\">end</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"p\">{})</span>\n\n<span class=\"kr\">return</span><span class=\"w\"> </span><span
    class=\"nv\">M</span>\n</pre></div>\n\n</pre>\n\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2025-08-10 20:56:33\ntemplateKey: blog-post\ntitle: A Simple
    Lua Plugin To Find My Drafts\npublished: True\ntags:\n  - neovim\n  - tech\ncover:
    \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png\"\n---\n\nI
    used windsurf to write [[daily-notes-neovim-plugin]] for navigating my daily notes
    in neovim.\n\nFor a while now I've wanted a way to see my blog drafts... and tonight
    finally got the massive courage to prompt gpt-5 to build it for me...\n\n## Screenshot\n\n\n![20250811020234_e0c02600.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020234_e0c02600.png)\n\n##
    Code\n\n```lua\n---@diagnostic disable: undefined-global\n-- Blogging plugin:
    find draft blog posts under `pages/`\n-- Draft = YAML front matter contains `published:
    false` (case-insensitive)\n\nlocal M = {}\n\n-- Read file and return YAML front
    matter block as string, or nil\nlocal function read_front_matter(path)\n  local
    fh = io.open(path, \"r\")\n  if not fh then\n    return nil\n  end\n  local content
    = fh:read(\"*a\")\n  fh:close()\n  if not content then\n    return nil\n  end\n\n
    \ -- Front matter starts with --- on first line and ends with --- on its own line\n
    \ -- Support optional CRLF\n  local start_s, start_e = content:find(\"^%-%-%-%s*\\r?\\n\")\n
    \ if not start_e then\n    return nil\n  end\n  local fm_end_s, fm_end_e = content:find(\"\\n%-%-%-%s*\\r?\\n\",
    start_e + 1)\n  if not fm_end_s then\n    return nil\n  end\n  -- Extract between
    the fence lines (exclude the starting and ending --- lines)\n  local front_matter
    = content:sub(start_e + 1, fm_end_s)\n  return front_matter\nend\n\n-- Determine
    if a file is a draft by inspecting front matter for published: false\nfunction
    M._is_draft(path)\n  local fm = read_front_matter(path)\n  if not fm then\n    return
    false\n  end\n  -- Find a line starting with `published:` and capture the value\n
    \ -- Trim comments and quotes, compare case-insensitively\n  local value = fm:match(\"[Pp][Uu][Bb][Ll][Ii][Ss][Hh][Ee][Dd]%s*:%s*([^\\n\\r]+)\")\n
    \ if not value then\n    return false\n  end\n  -- strip inline comments starting
    with # and surrounding quotes/space\n  value = value:gsub(\"#.*$\", \"\")\n  value
    = value:gsub('\"', \"\"):gsub(\"'\", \"\")\n  value = value:gsub(\"^%s+\", \"\"):gsub(\"%s+$\",
    \"\")\n  local v = value:lower()\n  if v == \"false\" or v == \"no\" or v == \"0\"
    then\n    return true\n  end\n  return false\nend\n\n-- Telescope picker for draft
    posts\nfunction M.find_drafts()\n  local ok_pickers, pickers = pcall(require,
    \"telescope.pickers\")\n  if not ok_pickers then\n    vim.notify(\"telescope.nvim
    not available\", vim.log.levels.ERROR)\n    return\n  end\n  local finders = require(\"telescope.finders\")\n
    \ local previewers = require(\"telescope.previewers\")\n  local conf = require(\"telescope.config\").values\n
    \ local actions = require(\"telescope.actions\")\n  local action_state = require(\"telescope.actions.state\")\n\n
    \ -- Collect markdown files under pages/\n  local files = vim.fn.glob(\"pages/**/*.md\",
    false, true)\n  local drafts = {}\n  for _, f in ipairs(files) do\n    if M._is_draft(f)
    then\n      table.insert(drafts, f)\n    end\n  end\n\n  if #drafts == 0 then\n
    \   vim.notify(\"No draft blog posts found in pages/\", vim.log.levels.INFO)\n
    \   return\n  end\n\n  -- Simple, version-agnostic entry maker\n  local function
    entry_maker_fn(line)\n    return {\n      value = line,\n      ordinal = line,\n
    \     display = vim.fn.fnamemodify(line, \":~:.\") or line,\n      path = line,\n
    \   }\n  end\n\n  -- Use Telescope builtin find_files with a custom command that
    lists only drafts.\n  -- This guarantees previews and matches the style of other
    file pickers.\n  local tmpfile = vim.fn.tempname()\n  local ok_write, err = pcall(function()\n
    \   local fh = assert(io.open(tmpfile, \"w\"))\n    for _, f in ipairs(drafts)
    do\n      fh:write(f .. \"\\n\")\n    end\n    fh:close()\n  end)\n  if not ok_write
    then\n    vim.notify(\"Failed to prepare drafts list: \" .. tostring(err), vim.log.levels.ERROR)\n
    \   return\n  end\n\n  local builtin = require(\"telescope.builtin\")\n  builtin.find_files({\n
    \   prompt_title = \"Draft Blog Posts\",\n    -- cat the tmp list so Telescope
    treats it like find output\n    find_command = { \"bash\", \"-lc\", string.format('cat
    %q', tmpfile) },\n    attach_mappings = function(prompt_bufnr, map)\n      local
    actions = require(\"telescope.actions\")\n      actions.close:enhance({\n        post
    = function()\n          os.remove(tmpfile)\n        end,\n      })\n      return
    true\n    end,\n  })\nend\n\n-- Expose a user command similar to daily plugin
    style\nvim.api.nvim_create_user_command(\"BlogDrafts\", function()\n  M.find_drafts()\nend,
    {})\n\nreturn M\n\n\n```\n\n\n"
published: true
slug: a-simple-lua-plugin-to-find-my-drafts
title: A Simple Lua Plugin To Find My Drafts


---

I used windsurf to write [[daily-notes-neovim-plugin]] for navigating my daily notes in neovim.

For a while now I've wanted a way to see my blog drafts... and tonight finally got the massive courage to prompt gpt-5 to build it for me...

## Screenshot


![20250811020234_e0c02600.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020234_e0c02600.png)

## Code

```lua
---@diagnostic disable: undefined-global
-- Blogging plugin: find draft blog posts under `pages/`
-- Draft = YAML front matter contains `published: false` (case-insensitive)

local M = {}

-- Read file and return YAML front matter block as string, or nil
local function read_front_matter(path)
  local fh = io.open(path, "r")
  if not fh then
    return nil
  end
  local content = fh:read("*a")
  fh:close()
  if not content then
    return nil
  end

  -- Front matter starts with --- on first line and ends with --- on its own line
  -- Support optional CRLF
  local start_s, start_e = content:find("^%-%-%-%s*\r?\n")
  if not start_e then
    return nil
  end
  local fm_end_s, fm_end_e = content:find("\n%-%-%-%s*\r?\n", start_e + 1)
  if not fm_end_s then
    return nil
  end
  -- Extract between the fence lines (exclude the starting and ending --- lines)
  local front_matter = content:sub(start_e + 1, fm_end_s)
  return front_matter
end

-- Determine if a file is a draft by inspecting front matter for published: false
function M._is_draft(path)
  local fm = read_front_matter(path)
  if not fm then
    return false
  end
  -- Find a line starting with `published:` and capture the value
  -- Trim comments and quotes, compare case-insensitively
  local value = fm:match("[Pp][Uu][Bb][Ll][Ii][Ss][Hh][Ee][Dd]%s*:%s*([^\n\r]+)")
  if not value then
    return false
  end
  -- strip inline comments starting with # and surrounding quotes/space
  value = value:gsub("#.*$", "")
  value = value:gsub('"', ""):gsub("'", "")
  value = value:gsub("^%s+", ""):gsub("%s+$", "")
  local v = value:lower()
  if v == "false" or v == "no" or v == "0" then
    return true
  end
  return false
end

-- Telescope picker for draft posts
function M.find_drafts()
  local ok_pickers, pickers = pcall(require, "telescope.pickers")
  if not ok_pickers then
    vim.notify("telescope.nvim not available", vim.log.levels.ERROR)
    return
  end
  local finders = require("telescope.finders")
  local previewers = require("telescope.previewers")
  local conf = require("telescope.config").values
  local actions = require("telescope.actions")
  local action_state = require("telescope.actions.state")

  -- Collect markdown files under pages/
  local files = vim.fn.glob("pages/**/*.md", false, true)
  local drafts = {}
  for _, f in ipairs(files) do
    if M._is_draft(f) then
      table.insert(drafts, f)
    end
  end

  if #drafts == 0 then
    vim.notify("No draft blog posts found in pages/", vim.log.levels.INFO)
    return
  end

  -- Simple, version-agnostic entry maker
  local function entry_maker_fn(line)
    return {
      value = line,
      ordinal = line,
      display = vim.fn.fnamemodify(line, ":~:.") or line,
      path = line,
    }
  end

  -- Use Telescope builtin find_files with a custom command that lists only drafts.
  -- This guarantees previews and matches the style of other file pickers.
  local tmpfile = vim.fn.tempname()
  local ok_write, err = pcall(function()
    local fh = assert(io.open(tmpfile, "w"))
    for _, f in ipairs(drafts) do
      fh:write(f .. "\n")
    end
    fh:close()
  end)
  if not ok_write then
    vim.notify("Failed to prepare drafts list: " .. tostring(err), vim.log.levels.ERROR)
    return
  end

  local builtin = require("telescope.builtin")
  builtin.find_files({
    prompt_title = "Draft Blog Posts",
    -- cat the tmp list so Telescope treats it like find output
    find_command = { "bash", "-lc", string.format('cat %q', tmpfile) },
    attach_mappings = function(prompt_bufnr, map)
      local actions = require("telescope.actions")
      actions.close:enhance({
        post = function()
          os.remove(tmpfile)
        end,
      })
      return true
    end,
  })
end

-- Expose a user command similar to daily plugin style
vim.api.nvim_create_user_command("BlogDrafts", function()
  M.find_drafts()
end, {})

return M


```