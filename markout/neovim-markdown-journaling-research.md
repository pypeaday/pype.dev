---
content: "Research on the current Neovim plugin landscape for writing/journaling in\nMarkdown,
  oriented around this site's workflow: a markata blog with YAML\nfrontmatter, mkdocs-material-style
  `!!! scripture` / `??? scripture`\nadmonitions, `[[ slug ]]` wikilinks, and a custom
  `pypeaday.daily` module\n(copier templates + telescope/fzf pickers + live_grep backlinks).\n\n##
  1. LazyVim `lang.markdown` extra \u2014 what it actually does\n\nSource of truth
  (current `main`):\n<https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua>\nDocs:
  <https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md>\n\nAs
  of 2026, the extra installs/configures:\n\n- **marksman** via nvim-lspconfig (`servers
  = { marksman = {} }`) \u2014 markdown\n  LSP with `[[wikilink]]` completion, go-to-definition,
  references\n  (backlinks), and dead-link diagnostics. Big deal: most of what\n  `pypeaday.daily.find_backlinks()`
  does via telescope live_grep, marksman\n  gives via `grr`/`vim.lsp.buf.references`.\n-
  **markdownlint-cli2** via nvim-lint (and none-ls if installed), plus\n  conform.nvim
  formatters `prettier`, `markdownlint-cli2`, and `markdown-toc`\n  (the last only
  runs when the buffer contains `<!-- toc -->`). Mason\n  auto-installs `markdownlint-cli2`
  + `markdown-toc`. LazyVim switched from\n  markdownlint-cli to cli2 in 2024:\n  <https://github.com/LazyVim/LazyVim/pull/3843>\n-
  **markdown-preview.nvim** (`iamcco/markdown-preview.nvim`) \u2014 browser\n  preview
  on `<leader>cp` (markdown buffers only).\n- **render-markdown.nvim** (`MeanderingProgrammer/render-markdown.nvim`)
  \u2014\n  in-buffer rendering. LazyVim replaced `headlines.nvim` with this plugin\n
  \ back in 2024:\n  <https://github.com/LazyVim/LazyVim/pull/4139>. LazyVim's config
  disables\n  heading icons and checkbox rendering, and maps a\n  `<leader>um` toggle
  via `Snacks.toggle`.\n\nThere is **no prose/spell/grammar extra** in LazyVim \u2014
  the full extras list\ncontains nothing like a `lang.text` or `extras.spelling`.
  Prose tooling has\nto be added by hand.\n\nThe import already exists in `~/.config/nvim/lua/config/lazy.lua`
  (line 53)\nalongside ~15 other extras \u2014 verified 2026-10-04. If plugins look
  missing,\n`:Lazy sync` will reconcile; `:LazyExtras` shows what's active.\n\nBuilt-in
  LazyVim defaults that matter for prose (no plugin needed):\n\n- FileType autocmd
  already sets `wrap` and `spell` for markdown:\n  `lazyvim/config/autocmds.lua` (`wrap_spell`
  augroup, patterns include\n  `markdown`). So spell+wrap are already on.\n- Toggles
  already mapped: `<leader>us` spell, `<leader>uw` wrap,\n  `<leader>um` render-markdown
  (with the extra), `<leader>uz` Snacks zen\n  mode, `<leader>uD` Snacks dim \u2014
  see `lazyvim/config/keymaps.lua`.\n\n## 2. render-markdown.nvim \u2014 capabilities
  and the admonition gap\n\nRepo: <https://github.com/MeanderingProgrammer/render-markdown.nvim>\n\n-
  Renders headings, code blocks, inline code, horizontal rules, list\n  bullets, **checkboxes
  (with user-defined states)**, block quotes,\n  **callouts**, tables, links, LaTeX,
  per the README feature list.\n- Callouts: supports GitHub (`[!NOTE]`, `[!TIP]`,
  `[!IMPORTANT]`,\n  `[!WARNING]`, `[!CAUTION]`) and the full Obsidian set (`[!QUOTE]`,\n
  \ `[!TODO]`, etc.). Custom callouts are fully supported \u2014 each entry is\n  `name
  = { raw = '[!SCRIPTURE]', rendered = ' Scripture', highlight = '...' }`.\n  Wiki
  reference:\n  <https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts>\n-
  Custom callout titles (`> [!quote] Psalm 119`) are supported:\n  <https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109>\n-
  Checkboxes: `- [ ]` / `- [x]` render as icons, and arbitrary custom states\n  (`-
  [/]`, `- [>]`, etc.) are configurable (`checkbox.custom`).\n- **mkdocs `!!!`/`???`
  admonitions are NOT supported.** The plugin is\n  treesitter-driven over the standard
  markdown parser; admonition blocks\n  are just indented text to it. Callout support
  was added for the\n  `> [!x]` blockquote syntax only\n  (<https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20>).\n-
  The main alternative, `OXY2DEV/markview.nvim`, also only renders\n  `> [!x]` callouts
  for markdown \u2014 its \"admonitions\" support is for\n  **Asciidoc**, not mkdocs:\n
  \ <https://github.com/OXY2DEV/markview.nvim/wiki/Markdown>\n- Even `markdown-preview.nvim`
  can't preview mkdocs admonitions \u2014 open\n  feature request: <https://github.com/iamcco/markdown-preview.nvim/issues/618>.\n
  \ The faithful preview for `!!! scripture` is the markata/mkdocs build\n  itself,
  not an editor plugin.\n- Conceal/anti-conceal: `anti_conceal` hides the plugin's
  virtual text on\n  the cursor line so you can edit raw source; `win_options.conceallevel`\n
  \ is managed per rendered/raw view. Known upstream limitation: concealed\n  text
  + `wrap` keeps stale line breaks (neovim issue #14409), documented\n  in <https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md>.\n
  \ Practical tradeoff: rendered mode is great for reading/journaling review;\n  expect
  to live with `<leader>um` toggling or anti-conceal while editing.\n\n## 3. obsidian.nvim
  \u2014 fit for a non-Obsidian vault\n\nRepo (community fork, actively maintained;
  `epwalsh/obsidian.nvim` is the\nlegacy upstream): <https://github.com/obsidian-nvim/obsidian.nvim>\n\n-
  A \"workspace\" is just a directory of markdown \u2014 no `.obsidian/` config\n
  \ required. `workspaces = { { name = \"pype.dev\", path = \"~/projects/personal/pype.dev\"
  } }`\n  is a valid setup.\n- Provides `:Obsidian today [OFFSET]` / `dailies`, `new_from_template`,\n
  \ `template` (substitutions, date/time formats), `backlinks`,\n  `follow_link`,
  `search`, `link`, `links`. See command list in README.\n- Completion of `[[` wiki
  links and `#` tags via blink.cmp or nvim-cmp;\n  newer versions do this through
  an in-process LSP so it works with any\n  completion engine.\n- Caveats:\n  - Search/backlinks
  require `ripgrep`.\n  - Only activates inside workspace paths; the whole pype.dev
  repo would be\n    one workspace, so `:Obsidian search` scans posts+pages together\n
  \   (probably fine).\n  - Default wikilink style is `[[id|alias]]`-ish (`wiki_link_id_prefix`);\n
  \   the `[[ slug ]]`-with-spaces convention used by markata is configured\n    via
  `wiki_link_func`. Also `disable_frontmatter`/custom\n    `note_frontmatter_func`
  matters since it would otherwise write\n    Obsidian-style frontmatter (`id`, `aliases`,
  `tags`) that markata\n    doesn't want.\n  - Its built-in checkbox/conceal UI is
  deprecated in favor of\n    render-markdown.nvim \u2014 set `ui.enable = false`
  and let\n    render-markdown handle visuals.\n- Verdict: overlaps ~80% with the
  existing `pypeaday.daily` module (daily\n  notes, templates, backlinks). The genuinely
  new capability is `[[`\n  completion and structured wikilink following \u2014 but
  **marksman (already\n  in lang.markdown) gives wikilink completion, `gd` link following,
  and\n  `grr` backlinks for free**, so obsidian.nvim is optional rather than\n  foundational.
  If adopted, keep `pypeaday.daily` for copier template\n  creation and use obsidian.nvim
  only for links/completion.\n\n## 4. Alternatives \u2014 brief survey\n\n- **telekasten.nvim**
  (<https://github.com/nvim-telekasten/telekasten.nvim>):\n  telescope-based zettelkasten
  + journal; daily/weekly notes, templates,\n  backlinks, calendar. Works, but low
  recent activity and it duplicates\n  the existing copier+telescope workflow. Not
  recommended here.\n- **zk-nvim** (<https://github.com/zk-org/zk-nvim>): Neovim frontend
  for\n  the `zk` CLI (a real LSP + note DB). Solid and maintained, but it wants\n
  \ the `zk` binary and a `zk`-style notebook \u2014 another parallel system, not\n
  \ a fit for markata frontmatter/slugs.\n- **neorg** (<https://github.com/nvim-neorg/neorg>):
  still releasing (9.x),\n  but it's its own `.norg` file format \u2014 incompatible
  with a markdown\n  blog. Maintainer activity is low (focus shifted to the `lux`
  Lua package\n  manager): <https://github.com/nvim-neorg/neorg/discussions/1673>.
  Skip.\n- **Preview**: `markdown-preview.nvim` (browser, in the extra, `<leader>cp`)\n
  \ is the maintained option. `glow.nvim` is abandoned \u2014 its own README\n  points
  at render-markdown.nvim:\n  <https://github.com/ellisonleao/glow.nvim/> (fork `shcode/nvim-glow`\n
  \ exists but is a terminal renderer, no help for admonitions). For this\n  site,
  `markata`'s own build/serve is the only faithful preview.\n- **Focus**: don't install
  zen-mode/twilight. LazyVim already maps\n  `Snacks.zen()` to `<leader>uz` and `Snacks.toggle.dim()`
  to `<leader>uD`\n  (folke's snacks.nvim replaced his standalone plugins:\n  <https://github.com/folke/snacks.nvim/blob/main/docs/zen.md>).\n-
  **Tables**: `tabular` is already installed (`:Tabularize /|`), and\n  prettier (via
  conform `<leader>cf`) aligns markdown tables automatically.\n  If auto-growing tables
  are wanted, `Kicamon/markdown-table-mode.nvim` or\n  `dhruvasagar/vim-table-mode`
  are the options \u2014 probably unnecessary.\n- **List/checkbox ergonomics**: `bullets.vim`\n
  \ (<https://github.com/bullets-vim/bullets.vim>) auto-continues lists on\n  `<CR>`/`o`,
  renumbers with `gN`, indents with `>>`/`<<`, and toggles\n  checkboxes with `<leader>x`
  \u2014 including partial-completion parent\n  checkboxes. Perfect fit for prayer-request
  checklists.\n- **Link editing nicety**: `antonk52/markdowny.nvim` adds vim-style\n
  \ surround ops for `[text](url)` links. Optional quality-of-life.\n\n## 5. Spell
  / wrap / prose ergonomics\n\n- Already handled by LazyVim core: `spell` + `wrap`
  FileType autocmd for\n  markdown; `<leader>us` / `<leader>uw` toggles; `spelllang
  = \"en\"`.\n- Worth adding in an ftplugin/autocmd: `linebreak` (wrap at words, not\n
  \ mid-word), `breakindent` (wrapped lines keep list indent), `wrapmargin`/\n  `colorcolumn`
  hygiene, and `conceallevel=2` + `concealcursor=nc` if you\n  want rendered-markdown
  to look clean while keeping cursor-line raw.\n  Note `smoothscroll` is globally
  disabled in this config\n  (`vim.opt.smoothscroll = false`) \u2014 re-enable it
  locally for markdown if\n  long wrapped paragraphs feel jumpy.\n- Prose LSPs:\n
  \ - **harper-ls** (<https://github.com/Automattic/harper>,\n    <https://writewithharper.com>):
  Rust grammar/spelling LSP aimed at\n    developers; markdown-aware, fast, no Java.
  Installable via mason\n    (`harper_ls` in lspconfig), every linter toggleable\n
  \   (`linters.sentence_capitalization`, `long_sentences`, etc.). Best\n    current
  default for prose grammar. Caution: it flags in every buffer\n    it attaches to
  \u2014 scope it to `markdown` filetype only.\n  - **ltex-ls is dead** \u2014 `valentjn/ltex-ls`
  is archived\n    (<https://github.com/valentjn/ltex-ls>). Maintained fork:\n    **ltex-plus/ltex-ls-plus**
  (<https://github.com/ltex-plus/ltex-ls-plus>),\n    still LanguageTool-based (heavy
  JVM, but deeper grammar rules).\n  - **vale** (<https://vale.sh>): CLI style-guide
  linter; usable through\n    nvim-lint's `vale` linter. Best if you want house-style
  rules\n    (write-good/proselint packs), more setup than value for journaling.\n-
  Soft punctuation niceties: `pensieve`/`cmp-dictionary` are mostly dead\n  ends;
  the spell dictionary via `zg` + blink `buffer`/`spell` source\n  covers the practical
  case.\n\n## Recommended additions for this setup\n\nOrdered by value \xF7 effort.\n\n###
  1. lang.markdown extra is already enabled (zero new code)\n\n`~/.config/nvim/lua/config/lazy.lua`
  line 53 already imports it. Verify\nmarksman attaches with `:LspInfo` in a note
  buffer. Then:\n\n- `gd` on `[[ 2025-09-13-notes ]]` jumps to the note\n- `grr` (LSP
  references) is a richer backlinks view than the live_grep\n  pattern in `find_daily_files`/`find_backlinks`
  \u2014 keep the telescope one,\n  it searches the spaced `[[ slug ]]` convention
  regardless of whether\n  marksman resolves it.\n- Caveat: marksman treats the git
  root (`pype.dev`) as the workspace, which\n  is what we want. Verify it resolves
  the spaced `[[ slug ]]` form; if not,\n  completion still works for `[[slug]]` and
  markata tolerates both.\n\n### 2. Markdown writing-mode ftplugin (tiny, high value)\n\n`~/.config/nvim/after/ftplugin/markdown.lua`
  (LazyVim loads `after/ftplugin`\nautomatically \u2014 no spec needed):\n\n```lua\nvim.opt_local.linebreak
  = true      -- wrap at word boundaries\nvim.opt_local.breakindent = true    -- keep
  list indentation on wrapped lines\nvim.opt_local.smoothscroll = true   -- undo the
  global `false` for prose\nvim.opt_local.conceallevel = 2      -- conceal markup
  for rendered view\nvim.opt_local.concealcursor = \"nc\"  -- show raw text on the
  cursor line in insert\nvim.opt_local.spell = true          -- redundant w/ LazyVim
  autocmd, explicit is fine\n-- map j/k to gj/gk for wrapped-line navigation (markdown
  buffers only)\nvim.keymap.set({ \"n\", \"x\" }, \"j\", \"gj\", { buffer = true,
  remap = false })\nvim.keymap.set({ \"n\", \"x\" }, \"k\", \"gk\", { buffer = true,
  remap = false })\n```\n\n### 3. render-markdown tweaks + a `scripture` callout +
  checkbox states\n\n```lua\n-- lua/plugins/markdown.lua\nreturn {\n  {\n    \"MeanderingProgrammer/render-markdown.nvim\",\n
  \   opts = {\n      -- re-enable what LazyVim's extra disables\n      checkbox =
  {\n        enabled = true,\n        unchecked = { icon = \"\U000F0131 \" },\n        checked
  = { icon = \"\U000F0C52 \" },\n        custom = {\n          praying = { raw = \"[/]\",
  rendered = \"\U000F1442 \", highlight = \"RenderMarkdownWarn\" },\n        },\n
  \     },\n      callout = {\n        -- !!! scripture has no renderer; if you ever
  write\n        -- > [!scripture] in blog posts this makes it pretty.\n        scripture
  = {\n          raw = \"[!SCRIPTURE]\",\n          rendered = \"\U000F05F6 Scripture\",\n
  \         highlight = \"RenderMarkdownHint\",\n        },\n      },\n      anti_conceal
  = { enabled = true }, -- cursor line shows raw markdown\n    },\n  },\n}\n```\n\nReality
  check: **nothing renders `!!! scripture` blocks in the editor** \u2014\nthey'll
  show as plain indented text (which is honest: markata is the only\nreal renderer).
  If visual distinction matters, `util.mini-hipatterns` is\nalready enabled \u2014
  add a pattern:\n\n```lua\n-- inside the existing mini.hipatterns spec\nlocal hipatterns
  = require(\"mini.hipatterns\")\nopts = {\n  highlighters = {\n    admonition = {
  pattern = \"^!?%?+ +%w+.*\", group = \"Special\" },\n  },\n}\n```\n\n### 4. bullets.vim
  for prayer-request checklists (one line, high value)\n\n```lua\n{ \"bullets-vim/bullets.vim\",
  ft = \"markdown\" },\n```\n\n`<leader>x` toggles `- [ ]`/`- [x]`, `<CR>`/`o` continue
  list items,\n`>>`/`<<` adjust nesting. Docs:\n<https://github.com/bullets-vim/bullets.vim>\n\n###
  5. Optional, heavier lifts (only if felt needed)\n\n- **harper-ls** grammar checking,
  scoped to markdown:\n\n  ```lua\n  {\n    \"neovim/nvim-lspconfig\",\n    opts =
  {\n      servers = {\n        harper_ls = {\n          filetypes = { \"markdown\"
  },\n          settings = {\n            [\"harper-ls\"] = {\n              linters
  = { sentence_capitalization = false, long_sentences = false },\n            },\n
  \         },\n        },\n      },\n    },\n  }\n  ```\n\n- **obsidian.nvim** for
  `[[` completion + `:Obsidian backlinks` \u2014 only if\n  marksman's LSP completion
  of wikilinks proves insufficient. Keep\n  `ui.enable = false` and continue using
  `pypeaday.daily` + copier for note\n  creation. Expect to write a `wiki_link_func`
  to emit `[[ slug ]]` and a\n  `note_frontmatter_func` matching markata's frontmatter.\n\n##
  Bottom line\n\nThe copier+telescope daily-notes system is already doing the job
  of an\nentire plugin category (telekasten/zk/obsidian daily notes). The real gaps\nare:
  marksman wikilink navigation (free, already enabled via lang.markdown),\nrendered
  checkboxes/callouts (render-markdown, in the extra), checkbox\ntoggling (bullets.vim),
  wrapped-line ergonomics (a 6-line ftplugin), and\noptional grammar checking (harper-ls).
  `!!!` admonitions are a markata-side\nconcern \u2014 no editor plugin renders them;
  at most, highlight the marker line."
date: 2026-10-04
description: 'Research on the current Neovim plugin landscape for writing/journaling
  in

  Markdown, oriented around this site&#x27;s workflow: a markata blog with YAML

  frontmat'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Neovim Markdown
    Journaling Research</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Research on the current Neovim plugin landscape for writing/journaling
    in\nMarkdown, oriented around this site&#x27;s workflow: a markata blog with YAML\nfrontmat\"
    />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\" />\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Neovim
    Markdown Journaling Research | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/neovim-markdown-journaling-research\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Neovim Markdown Journaling Research | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Research on the current Neovim plugin landscape for writing/journaling
    in\nMarkdown, oriented around this site&#x27;s workflow: a markata blog with YAML\nfrontmat\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/neovim-markdown-journaling-research</span>\n
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<header
    class=\"post-header\">\n    <h1 id=\"title\" class=\"post-header__title\">Neovim
    Markdown Journaling Research</h1>\n    <div class=\"post-header__meta\">\n        <time
    datetime=\"2026-10-04\">\n            October 04, 2026\n        </time>\n    </div>\n
    \   <div class=\"post-header__tags\">\n            <a href=\"https://pype.dev//tags/neovim/\"
    class=\"post-header__tag\">\n                #neovim\n            </a>\n            <a
    href=\"https://pype.dev//tags/markdown/\" class=\"post-header__tag\">\n                #markdown\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"post-header__tag\">\n
    \               #note\n            </a>\n    </div>\n</header>        <section
    class=\"post-terminal__body prose dark:prose-invert\">\n            <p>Research
    on the current Neovim plugin landscape for writing/journaling in\nMarkdown, oriented
    around this site's workflow: a markata blog with YAML\nfrontmatter, mkdocs-material-style
    <code>!!! scripture</code> / <code>??? scripture</code>\nadmonitions, <code>[[
    slug ]]</code> wikilinks, and a custom <code>pypeaday.daily</code> module\n(copier
    templates + telescope/fzf pickers + live_grep backlinks).</p>\n<h2 id=\"1-lazyvim-langmarkdown-extra--what-it-actually-does\">1.
    LazyVim <code>lang.markdown</code> extra \u2014 what it actually does <a class=\"header-anchor\"
    href=\"#1-lazyvim-langmarkdown-extra--what-it-actually-does\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Source of truth (current
    <code>main</code>):\n<a href=\"https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua\">https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua</a>\nDocs:
    <a href=\"https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md\">https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md</a></p>\n<p>As
    of 2026, the extra installs/configures:</p>\n<ul>\n<li><strong>marksman</strong>
    via nvim-lspconfig (<code>servers = { marksman = {} }</code>) \u2014 markdown\nLSP
    with <code>[[wikilink]]</code> completion, go-to-definition, references\n(backlinks),
    and dead-link diagnostics. Big deal: most of what\n<code>pypeaday.daily.find_backlinks()</code>
    does via telescope live_grep, marksman\ngives via <code>grr</code>/<code>vim.lsp.buf.references</code>.</li>\n<li><strong>markdownlint-cli2</strong>
    via nvim-lint (and none-ls if installed), plus\nconform.nvim formatters <code>prettier</code>,
    <code>markdownlint-cli2</code>, and <code>markdown-toc</code>\n(the last only
    runs when the buffer contains <code>&lt;!-- toc --&gt;</code>). Mason\nauto-installs
    <code>markdownlint-cli2</code> + <code>markdown-toc</code>. LazyVim switched from\nmarkdownlint-cli
    to cli2 in 2024:\n<a href=\"https://github.com/LazyVim/LazyVim/pull/3843\">https://github.com/LazyVim/LazyVim/pull/3843</a></li>\n<li><strong>markdown-preview.nvim</strong>
    (<code>iamcco/markdown-preview.nvim</code>) \u2014 browser\npreview on <code>&lt;leader&gt;cp</code>
    (markdown buffers only).</li>\n<li><strong>render-markdown.nvim</strong> (<code>MeanderingProgrammer/render-markdown.nvim</code>)
    \u2014\nin-buffer rendering. LazyVim replaced <code>headlines.nvim</code> with
    this plugin\nback in 2024:\n<a href=\"https://github.com/LazyVim/LazyVim/pull/4139\">https://github.com/LazyVim/LazyVim/pull/4139</a>.
    LazyVim's config disables\nheading icons and checkbox rendering, and maps a\n<code>&lt;leader&gt;um</code>
    toggle via <code>Snacks.toggle</code>.</li>\n</ul>\n<p>There is <strong>no prose/spell/grammar
    extra</strong> in LazyVim \u2014 the full extras list\ncontains nothing like a
    <code>lang.text</code> or <code>extras.spelling</code>. Prose tooling has\nto
    be added by hand.</p>\n<p>The import already exists in <code>~/.config/nvim/lua/config/lazy.lua</code>
    (line 53)\nalongside ~15 other extras \u2014 verified 2026-10-04. If plugins look
    missing,\n<code>:Lazy sync</code> will reconcile; <code>:LazyExtras</code> shows
    what's active.</p>\n<p>Built-in LazyVim defaults that matter for prose (no plugin
    needed):</p>\n<ul>\n<li>FileType autocmd already sets <code>wrap</code> and <code>spell</code>
    for markdown:\n<code>lazyvim/config/autocmds.lua</code> (<code>wrap_spell</code>
    augroup, patterns include\n<code>markdown</code>). So spell+wrap are already on.</li>\n<li>Toggles
    already mapped: <code>&lt;leader&gt;us</code> spell, <code>&lt;leader&gt;uw</code>
    wrap,\n<code>&lt;leader&gt;um</code> render-markdown (with the extra), <code>&lt;leader&gt;uz</code>
    Snacks zen\nmode, <code>&lt;leader&gt;uD</code> Snacks dim \u2014 see <code>lazyvim/config/keymaps.lua</code>.</li>\n</ul>\n<h2
    id=\"2-render-markdownnvim--capabilities-and-the-admonition-gap\">2. render-markdown.nvim
    \u2014 capabilities and the admonition gap <a class=\"header-anchor\" href=\"#2-render-markdownnvim--capabilities-and-the-admonition-gap\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Repo: <a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim\">https://github.com/MeanderingProgrammer/render-markdown.nvim</a></p>\n<ul>\n<li>Renders
    headings, code blocks, inline code, horizontal rules, list\nbullets, <strong>checkboxes
    (with user-defined states)</strong>, block quotes,\n<strong>callouts</strong>,
    tables, links, LaTeX, per the README feature list.</li>\n<li>Callouts: supports
    GitHub (<code>[!NOTE]</code>, <code>[!TIP]</code>, <code>[!IMPORTANT]</code>,\n<code>[!WARNING]</code>,
    <code>[!CAUTION]</code>) and the full Obsidian set (<code>[!QUOTE]</code>,\n<code>[!TODO]</code>,
    etc.). Custom callouts are fully supported \u2014 each entry is\n<code>name =
    { raw = '[!SCRIPTURE]', rendered = ' Scripture', highlight = '...' }</code>.\nWiki
    reference:\n<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts\">https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts</a></li>\n<li>Custom
    callout titles (<code>&gt; [!quote] Psalm 119</code>) are supported:\n<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109\">https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109</a></li>\n<li>Checkboxes:
    <code>- [ ]</code> / <code>- [x]</code> render as icons, and arbitrary custom
    states\n(<code>- [/]</code>, <code>- [&gt;]</code>, etc.) are configurable (<code>checkbox.custom</code>).</li>\n<li><strong>mkdocs
    <code>!!!</code>/<code>???</code> admonitions are NOT supported.</strong> The
    plugin is\ntreesitter-driven over the standard markdown parser; admonition blocks\nare
    just indented text to it. Callout support was added for the\n<code>&gt; [!x]</code>
    blockquote syntax only\n(<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20\">https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20</a>).</li>\n<li>The
    main alternative, <code>OXY2DEV/markview.nvim</code>, also only renders\n<code>&gt;
    [!x]</code> callouts for markdown \u2014 its &quot;admonitions&quot; support is
    for\n<strong>Asciidoc</strong>, not mkdocs:\n<a href=\"https://github.com/OXY2DEV/markview.nvim/wiki/Markdown\">https://github.com/OXY2DEV/markview.nvim/wiki/Markdown</a></li>\n<li>Even
    <code>markdown-preview.nvim</code> can't preview mkdocs admonitions \u2014 open\nfeature
    request: <a href=\"https://github.com/iamcco/markdown-preview.nvim/issues/618\">https://github.com/iamcco/markdown-preview.nvim/issues/618</a>.\nThe
    faithful preview for <code>!!! scripture</code> is the markata/mkdocs build\nitself,
    not an editor plugin.</li>\n<li>Conceal/anti-conceal: <code>anti_conceal</code>
    hides the plugin's virtual text on\nthe cursor line so you can edit raw source;
    <code>win_options.conceallevel</code>\nis managed per rendered/raw view. Known
    upstream limitation: concealed\ntext + <code>wrap</code> keeps stale line breaks
    (neovim issue #14409), documented\nin <a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md\">https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md</a>.\nPractical
    tradeoff: rendered mode is great for reading/journaling review;\nexpect to live
    with <code>&lt;leader&gt;um</code> toggling or anti-conceal while editing.</li>\n</ul>\n<h2
    id=\"3-obsidiannvim--fit-for-a-non-obsidian-vault\">3. obsidian.nvim \u2014 fit
    for a non-Obsidian vault <a class=\"header-anchor\" href=\"#3-obsidiannvim--fit-for-a-non-obsidian-vault\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Repo (community fork,
    actively maintained; <code>epwalsh/obsidian.nvim</code> is the\nlegacy upstream):
    <a href=\"https://github.com/obsidian-nvim/obsidian.nvim\">https://github.com/obsidian-nvim/obsidian.nvim</a></p>\n<ul>\n<li>A
    &quot;workspace&quot; is just a directory of markdown \u2014 no <code>.obsidian/</code>
    config\nrequired. <code>workspaces = { { name = &quot;pype.dev&quot;, path = &quot;~/projects/personal/pype.dev&quot;
    } }</code>\nis a valid setup.</li>\n<li>Provides <code>:Obsidian today [OFFSET]</code>
    / <code>dailies</code>, <code>new_from_template</code>,\n<code>template</code>
    (substitutions, date/time formats), <code>backlinks</code>,\n<code>follow_link</code>,
    <code>search</code>, <code>link</code>, <code>links</code>. See command list in
    README.</li>\n<li>Completion of <code>[[</code> wiki links and <code>#</code>
    tags via blink.cmp or nvim-cmp;\nnewer versions do this through an in-process
    LSP so it works with any\ncompletion engine.</li>\n<li>Caveats:\n<ul>\n<li>Search/backlinks
    require <code>ripgrep</code>.</li>\n<li>Only activates inside workspace paths;
    the whole pype.dev repo would be\none workspace, so <code>:Obsidian search</code>
    scans posts+pages together\n(probably fine).</li>\n<li>Default wikilink style
    is <code>[[id|alias]]</code>-ish (<code>wiki_link_id_prefix</code>);\nthe <code>[[
    slug ]]</code>-with-spaces convention used by markata is configured\nvia <code>wiki_link_func</code>.
    Also <code>disable_frontmatter</code>/custom\n<code>note_frontmatter_func</code>
    matters since it would otherwise write\nObsidian-style frontmatter (<code>id</code>,
    <code>aliases</code>, <code>tags</code>) that markata\ndoesn't want.</li>\n<li>Its
    built-in checkbox/conceal UI is deprecated in favor of\nrender-markdown.nvim \u2014
    set <code>ui.enable = false</code> and let\nrender-markdown handle visuals.</li>\n</ul>\n</li>\n<li>Verdict:
    overlaps ~80% with the existing <code>pypeaday.daily</code> module (daily\nnotes,
    templates, backlinks). The genuinely new capability is <code>[[</code>\ncompletion
    and structured wikilink following \u2014 but <strong>marksman (already\nin lang.markdown)
    gives wikilink completion, <code>gd</code> link following, and\n<code>grr</code>
    backlinks for free</strong>, so obsidian.nvim is optional rather than\nfoundational.
    If adopted, keep <code>pypeaday.daily</code> for copier template\ncreation and
    use obsidian.nvim only for links/completion.</li>\n</ul>\n<h2 id=\"4-alternatives--brief-survey\">4.
    Alternatives \u2014 brief survey <a class=\"header-anchor\" href=\"#4-alternatives--brief-survey\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>telekasten.nvim</strong>
    (<a href=\"https://github.com/nvim-telekasten/telekasten.nvim\">https://github.com/nvim-telekasten/telekasten.nvim</a>):\ntelescope-based
    zettelkasten + journal; daily/weekly notes, templates,\nbacklinks, calendar. Works,
    but low recent activity and it duplicates\nthe existing copier+telescope workflow.
    Not recommended here.</li>\n<li><strong>zk-nvim</strong> (<a href=\"https://github.com/zk-org/zk-nvim\">https://github.com/zk-org/zk-nvim</a>):
    Neovim frontend for\nthe <code>zk</code> CLI (a real LSP + note DB). Solid and
    maintained, but it wants\nthe <code>zk</code> binary and a <code>zk</code>-style
    notebook \u2014 another parallel system, not\na fit for markata frontmatter/slugs.</li>\n<li><strong>neorg</strong>
    (<a href=\"https://github.com/nvim-neorg/neorg\">https://github.com/nvim-neorg/neorg</a>):
    still releasing (9.x),\nbut it's its own <code>.norg</code> file format \u2014
    incompatible with a markdown\nblog. Maintainer activity is low (focus shifted
    to the <code>lux</code> Lua package\nmanager): <a href=\"https://github.com/nvim-neorg/neorg/discussions/1673\">https://github.com/nvim-neorg/neorg/discussions/1673</a>.
    Skip.</li>\n<li><strong>Preview</strong>: <code>markdown-preview.nvim</code> (browser,
    in the extra, <code>&lt;leader&gt;cp</code>)\nis the maintained option. <code>glow.nvim</code>
    is abandoned \u2014 its own README\npoints at render-markdown.nvim:\n<a href=\"https://github.com/ellisonleao/glow.nvim/\">https://github.com/ellisonleao/glow.nvim/</a>
    (fork <code>shcode/nvim-glow</code>\nexists but is a terminal renderer, no help
    for admonitions). For this\nsite, <code>markata</code>'s own build/serve is the
    only faithful preview.</li>\n<li><strong>Focus</strong>: don't install zen-mode/twilight.
    LazyVim already maps\n<code>Snacks.zen()</code> to <code>&lt;leader&gt;uz</code>
    and <code>Snacks.toggle.dim()</code> to <code>&lt;leader&gt;uD</code>\n(folke's
    snacks.nvim replaced his standalone plugins:\n<a href=\"https://github.com/folke/snacks.nvim/blob/main/docs/zen.md\">https://github.com/folke/snacks.nvim/blob/main/docs/zen.md</a>).</li>\n<li><strong>Tables</strong>:
    <code>tabular</code> is already installed (<code>:Tabularize /|</code>), and\nprettier
    (via conform <code>&lt;leader&gt;cf</code>) aligns markdown tables automatically.\nIf
    auto-growing tables are wanted, <code>Kicamon/markdown-table-mode.nvim</code>
    or\n<code>dhruvasagar/vim-table-mode</code> are the options \u2014 probably unnecessary.</li>\n<li><strong>List/checkbox
    ergonomics</strong>: <code>bullets.vim</code>\n(<a href=\"https://github.com/bullets-vim/bullets.vim\">https://github.com/bullets-vim/bullets.vim</a>)
    auto-continues lists on\n<code>&lt;CR&gt;</code>/<code>o</code>, renumbers with
    <code>gN</code>, indents with <code>&gt;&gt;</code>/<code>&lt;&lt;</code>, and
    toggles\ncheckboxes with <code>&lt;leader&gt;x</code> \u2014 including partial-completion
    parent\ncheckboxes. Perfect fit for prayer-request checklists.</li>\n<li><strong>Link
    editing nicety</strong>: <code>antonk52/markdowny.nvim</code> adds vim-style\nsurround
    ops for <code>[text](url)</code> links. Optional quality-of-life.</li>\n</ul>\n<h2
    id=\"5-spell--wrap--prose-ergonomics\">5. Spell / wrap / prose ergonomics <a class=\"header-anchor\"
    href=\"#5-spell--wrap--prose-ergonomics\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Already handled
    by LazyVim core: <code>spell</code> + <code>wrap</code> FileType autocmd for\nmarkdown;
    <code>&lt;leader&gt;us</code> / <code>&lt;leader&gt;uw</code> toggles; <code>spelllang
    = &quot;en&quot;</code>.</li>\n<li>Worth adding in an ftplugin/autocmd: <code>linebreak</code>
    (wrap at words, not\nmid-word), <code>breakindent</code> (wrapped lines keep list
    indent), <code>wrapmargin</code>/\n<code>colorcolumn</code> hygiene, and <code>conceallevel=2</code>
    + <code>concealcursor=nc</code> if you\nwant rendered-markdown to look clean while
    keeping cursor-line raw.\nNote <code>smoothscroll</code> is globally disabled
    in this config\n(<code>vim.opt.smoothscroll = false</code>) \u2014 re-enable it
    locally for markdown if\nlong wrapped paragraphs feel jumpy.</li>\n<li>Prose LSPs:\n<ul>\n<li><strong>harper-ls</strong>
    (<a href=\"https://github.com/Automattic/harper\">https://github.com/Automattic/harper</a>,\n<a
    href=\"https://writewithharper.com\">https://writewithharper.com</a>): Rust grammar/spelling
    LSP aimed at\ndevelopers; markdown-aware, fast, no Java. Installable via mason\n(<code>harper_ls</code>
    in lspconfig), every linter toggleable\n(<code>linters.sentence_capitalization</code>,
    <code>long_sentences</code>, etc.). Best\ncurrent default for prose grammar. Caution:
    it flags in every buffer\nit attaches to \u2014 scope it to <code>markdown</code>
    filetype only.</li>\n<li><strong>ltex-ls is dead</strong> \u2014 <code>valentjn/ltex-ls</code>
    is archived\n(<a href=\"https://github.com/valentjn/ltex-ls\">https://github.com/valentjn/ltex-ls</a>).
    Maintained fork:\n<strong>ltex-plus/ltex-ls-plus</strong> (<a href=\"https://github.com/ltex-plus/ltex-ls-plus\">https://github.com/ltex-plus/ltex-ls-plus</a>),\nstill
    LanguageTool-based (heavy JVM, but deeper grammar rules).</li>\n<li><strong>vale</strong>
    (<a href=\"https://vale.sh\">https://vale.sh</a>): CLI style-guide linter; usable
    through\nnvim-lint's <code>vale</code> linter. Best if you want house-style rules\n(write-good/proselint
    packs), more setup than value for journaling.</li>\n</ul>\n</li>\n<li>Soft punctuation
    niceties: <code>pensieve</code>/<code>cmp-dictionary</code> are mostly dead\nends;
    the spell dictionary via <code>zg</code> + blink <code>buffer</code>/<code>spell</code>
    source\ncovers the practical case.</li>\n</ul>\n<h2 id=\"recommended-additions-for-this-setup\">Recommended
    additions for this setup <a class=\"header-anchor\" href=\"#recommended-additions-for-this-setup\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Ordered by value \xF7
    effort.</p>\n<h3>1. lang.markdown extra is already enabled (zero new code)</h3>\n<p><code>~/.config/nvim/lua/config/lazy.lua</code>
    line 53 already imports it. Verify\nmarksman attaches with <code>:LspInfo</code>
    in a note buffer. Then:</p>\n<ul>\n<li><code>gd</code> on <code>[[ 2025-09-13-notes
    ]]</code> jumps to the note</li>\n<li><code>grr</code> (LSP references) is a richer
    backlinks view than the live_grep\npattern in <code>find_daily_files</code>/<code>find_backlinks</code>
    \u2014 keep the telescope one,\nit searches the spaced <code>[[ slug ]]</code>
    convention regardless of whether\nmarksman resolves it.</li>\n<li>Caveat: marksman
    treats the git root (<code>pype.dev</code>) as the workspace, which\nis what we
    want. Verify it resolves the spaced <code>[[ slug ]]</code> form; if not,\ncompletion
    still works for <code>[[slug]]</code> and markata tolerates both.</li>\n</ul>\n<h3>2.
    Markdown writing-mode ftplugin (tiny, high value)</h3>\n<p><code>~/.config/nvim/after/ftplugin/markdown.lua</code>
    (LazyVim loads <code>after/ftplugin</code>\nautomatically \u2014 no spec needed):</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">linebreak</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">      </span><span
    class=\"c1\">-- wrap at word boundaries</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">breakindent</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">    </span><span
    class=\"c1\">-- keep list indentation on wrapped lines</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">smoothscroll</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">   </span><span
    class=\"c1\">-- undo the global `false` for prose</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">conceallevel</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"mi\">2</span><span class=\"w\">      </span><span
    class=\"c1\">-- conceal markup for rendered view</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">concealcursor</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;nc&quot;</span><span class=\"w\">
    \ </span><span class=\"c1\">-- show raw text on the cursor line in insert</span>\n<span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">opt_local</span><span
    class=\"p\">.</span><span class=\"py\">spell</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"w\">          </span><span class=\"c1\">-- redundant w/ LazyVim autocmd,
    explicit is fine</span>\n<span class=\"c1\">-- map j/k to gj/gk for wrapped-line
    navigation (markdown buffers only)</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">keymap</span><span class=\"p\">.</span><span
    class=\"nf\">set</span><span class=\"p\">({</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;n&quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;x&quot;</span><span class=\"w\"> </span><span
    class=\"p\">},</span><span class=\"w\"> </span><span class=\"s2\">&quot;j&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;gj&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">buffer</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">remap</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"w\"> </span><span class=\"p\">})</span>\n<span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">keymap</span><span
    class=\"p\">.</span><span class=\"nf\">set</span><span class=\"p\">({</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;n&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;x&quot;</span><span class=\"w\">
    </span><span class=\"p\">},</span><span class=\"w\"> </span><span class=\"s2\">&quot;k&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;gk&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">buffer</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">remap</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"w\"> </span><span class=\"p\">})</span>\n</pre></div>\n\n</pre>\n\n<h3>3.
    render-markdown tweaks + a <code>scripture</code> callout + checkbox states</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">-- lua/plugins/markdown.lua</span>\n<span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"s2\">&quot;MeanderingProgrammer/render-markdown.nvim&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">opts</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"c1\">-- re-enable
    what LazyVim&#39;s extra disables</span>\n<span class=\"w\">      </span><span
    class=\"nv\">checkbox</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">        </span><span
    class=\"nv\">enabled</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"p\">,</span>\n<span
    class=\"w\">        </span><span class=\"nv\">unchecked</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">icon</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;\U000F0131
    &quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">checked</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">icon</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;\U000F0C52
    &quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">custom</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">          </span><span class=\"nv\">praying</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">raw</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;[/]&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">rendered</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;\U000F1442 &quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"nv\">highlight</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;RenderMarkdownWarn&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">        </span><span
    class=\"p\">},</span>\n<span class=\"w\">      </span><span class=\"p\">},</span>\n<span
    class=\"w\">      </span><span class=\"nv\">callout</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">        </span><span class=\"c1\">-- !!! scripture has no renderer;
    if you ever write</span>\n<span class=\"w\">        </span><span class=\"c1\">--
    &gt; [!scripture] in blog posts this makes it pretty.</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">scripture</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">          </span><span class=\"nv\">raw</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;[!SCRIPTURE]&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">          </span><span class=\"nv\">rendered</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;\U000F05F6 Scripture&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">          </span><span class=\"nv\">highlight</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;RenderMarkdownHint&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"p\">},</span>\n<span
    class=\"w\">      </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"nv\">anti_conceal</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"nv\">enabled</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\"> </span><span
    class=\"p\">},</span><span class=\"w\"> </span><span class=\"c1\">-- cursor line
    shows raw markdown</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<p>Reality
    check: <strong>nothing renders <code>!!! scripture</code> blocks in the editor</strong>
    \u2014\nthey'll show as plain indented text (which is honest: markata is the only\nreal
    renderer). If visual distinction matters, <code>util.mini-hipatterns</code> is\nalready
    enabled \u2014 add a pattern:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">-- inside
    the existing mini.hipatterns spec</span>\n<span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">hipatterns</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;mini.hipatterns&quot;</span><span
    class=\"p\">)</span>\n<span class=\"nv\">opts</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nv\">highlighters</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">    </span><span class=\"nv\">admonition</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">pattern</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;^!?%?+
    +%w+.*&quot;</span><span class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">group</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Special&quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<h3>4.
    bullets.vim for prayer-request checklists (one line, high value)</h3>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;bullets-vim/bullets.vim&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">ft</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;markdown&quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n</pre></div>\n\n</pre>\n\n<p><code>&lt;leader&gt;x</code>
    toggles <code>- [ ]</code>/<code>- [x]</code>, <code>&lt;CR&gt;</code>/<code>o</code>
    continue list items,\n<code>&gt;&gt;</code>/<code>&lt;&lt;</code> adjust nesting.
    Docs:\n<a href=\"https://github.com/bullets-vim/bullets.vim\">https://github.com/bullets-vim/bullets.vim</a></p>\n<h3>5.
    Optional, heavier lifts (only if felt needed)</h3>\n<ul>\n<li>\n<p><strong>harper-ls</strong>
    grammar checking, scoped to markdown:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;neovim/nvim-lspconfig&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">  </span><span class=\"nv\">opts</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">    </span><span class=\"nv\">servers</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nv\">harper_ls</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">        </span><span class=\"nv\">filetypes</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"s2\">&quot;markdown&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">        </span><span
    class=\"nv\">settings</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">          </span><span
    class=\"p\">[</span><span class=\"s2\">&quot;harper-ls&quot;</span><span class=\"p\">]</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">            </span><span class=\"nv\">linters</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"nv\">sentence_capitalization</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">long_sentences</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">false</span><span class=\"w\"> </span><span
    class=\"p\">},</span>\n<span class=\"w\">          </span><span class=\"p\">},</span>\n<span
    class=\"w\">        </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n</li>\n<li>\n<p><strong>obsidian.nvim</strong>
    for <code>[[</code> completion + <code>:Obsidian backlinks</code> \u2014 only
    if\nmarksman's LSP completion of wikilinks proves insufficient. Keep\n<code>ui.enable
    = false</code> and continue using <code>pypeaday.daily</code> + copier for note\ncreation.
    Expect to write a <code>wiki_link_func</code> to emit <code>[[ slug ]]</code>
    and a\n<code>note_frontmatter_func</code> matching markata's frontmatter.</p>\n</li>\n</ul>\n<h2
    id=\"bottom-line\">Bottom line <a class=\"header-anchor\" href=\"#bottom-line\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The copier+telescope
    daily-notes system is already doing the job of an\nentire plugin category (telekasten/zk/obsidian
    daily notes). The real gaps\nare: marksman wikilink navigation (free, already
    enabled via lang.markdown),\nrendered checkboxes/callouts (render-markdown, in
    the extra), checkbox\ntoggling (bullets.vim), wrapped-line ergonomics (a 6-line
    ftplugin), and\noptional grammar checking (harper-ls). <code>!!!</code> admonitions
    are a markata-side\nconcern \u2014 no editor plugin renders them; at most, highlight
    the marker line.</p>\n\n        </section>\n    </article>\n</section>        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Neovim Markdown Journaling
    Research</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"Research on the current
    Neovim plugin landscape for writing/journaling in\nMarkdown, oriented around this
    site&#x27;s workflow: a markata blog with YAML\nfrontmat\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\" />\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Neovim
    Markdown Journaling Research | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/neovim-markdown-journaling-research\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Neovim Markdown Journaling Research | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Research on the current Neovim plugin landscape for writing/journaling
    in\nMarkdown, oriented around this site&#x27;s workflow: a markata blog with YAML\nfrontmat\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \       .edit {\n            display: none;\n        }\n    </style>\n<header
    class=\"post-header\">\n    <h1 id=\"title\" class=\"post-header__title\">Neovim
    Markdown Journaling Research</h1>\n    <div class=\"post-header__meta\">\n        <time
    datetime=\"2026-10-04\">\n            October 04, 2026\n        </time>\n    </div>\n
    \   <div class=\"post-header__tags\">\n            <a href=\"https://pype.dev//tags/neovim/\"
    class=\"post-header__tag\">\n                #neovim\n            </a>\n            <a
    href=\"https://pype.dev//tags/markdown/\" class=\"post-header__tag\">\n                #markdown\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"post-header__tag\">\n
    \               #note\n            </a>\n    </div>\n</header></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<header
    class=\"post-header\">\n    <h1 id=\"title\" class=\"post-header__title\">Neovim
    Markdown Journaling Research</h1>\n    <div class=\"post-header__meta\">\n        <time
    datetime=\"2026-10-04\">\n            October 04, 2026\n        </time>\n    </div>\n
    \   <div class=\"post-header__tags\">\n            <a href=\"https://pype.dev//tags/neovim/\"
    class=\"post-header__tag\">\n                #neovim\n            </a>\n            <a
    href=\"https://pype.dev//tags/markdown/\" class=\"post-header__tag\">\n                #markdown\n
    \           </a>\n            <a href=\"https://pype.dev//tags/note/\" class=\"post-header__tag\">\n
    \               #note\n            </a>\n    </div>\n</header>        <section
    class=\"post-terminal__body prose dark:prose-invert\">\n            <p>Research
    on the current Neovim plugin landscape for writing/journaling in\nMarkdown, oriented
    around this site's workflow: a markata blog with YAML\nfrontmatter, mkdocs-material-style
    <code>!!! scripture</code> / <code>??? scripture</code>\nadmonitions, <code>[[
    slug ]]</code> wikilinks, and a custom <code>pypeaday.daily</code> module\n(copier
    templates + telescope/fzf pickers + live_grep backlinks).</p>\n<h2 id=\"1-lazyvim-langmarkdown-extra--what-it-actually-does\">1.
    LazyVim <code>lang.markdown</code> extra \u2014 what it actually does <a class=\"header-anchor\"
    href=\"#1-lazyvim-langmarkdown-extra--what-it-actually-does\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Source of truth (current
    <code>main</code>):\n<a href=\"https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua\">https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua</a>\nDocs:
    <a href=\"https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md\">https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md</a></p>\n<p>As
    of 2026, the extra installs/configures:</p>\n<ul>\n<li><strong>marksman</strong>
    via nvim-lspconfig (<code>servers = { marksman = {} }</code>) \u2014 markdown\nLSP
    with <code>[[wikilink]]</code> completion, go-to-definition, references\n(backlinks),
    and dead-link diagnostics. Big deal: most of what\n<code>pypeaday.daily.find_backlinks()</code>
    does via telescope live_grep, marksman\ngives via <code>grr</code>/<code>vim.lsp.buf.references</code>.</li>\n<li><strong>markdownlint-cli2</strong>
    via nvim-lint (and none-ls if installed), plus\nconform.nvim formatters <code>prettier</code>,
    <code>markdownlint-cli2</code>, and <code>markdown-toc</code>\n(the last only
    runs when the buffer contains <code>&lt;!-- toc --&gt;</code>). Mason\nauto-installs
    <code>markdownlint-cli2</code> + <code>markdown-toc</code>. LazyVim switched from\nmarkdownlint-cli
    to cli2 in 2024:\n<a href=\"https://github.com/LazyVim/LazyVim/pull/3843\">https://github.com/LazyVim/LazyVim/pull/3843</a></li>\n<li><strong>markdown-preview.nvim</strong>
    (<code>iamcco/markdown-preview.nvim</code>) \u2014 browser\npreview on <code>&lt;leader&gt;cp</code>
    (markdown buffers only).</li>\n<li><strong>render-markdown.nvim</strong> (<code>MeanderingProgrammer/render-markdown.nvim</code>)
    \u2014\nin-buffer rendering. LazyVim replaced <code>headlines.nvim</code> with
    this plugin\nback in 2024:\n<a href=\"https://github.com/LazyVim/LazyVim/pull/4139\">https://github.com/LazyVim/LazyVim/pull/4139</a>.
    LazyVim's config disables\nheading icons and checkbox rendering, and maps a\n<code>&lt;leader&gt;um</code>
    toggle via <code>Snacks.toggle</code>.</li>\n</ul>\n<p>There is <strong>no prose/spell/grammar
    extra</strong> in LazyVim \u2014 the full extras list\ncontains nothing like a
    <code>lang.text</code> or <code>extras.spelling</code>. Prose tooling has\nto
    be added by hand.</p>\n<p>The import already exists in <code>~/.config/nvim/lua/config/lazy.lua</code>
    (line 53)\nalongside ~15 other extras \u2014 verified 2026-10-04. If plugins look
    missing,\n<code>:Lazy sync</code> will reconcile; <code>:LazyExtras</code> shows
    what's active.</p>\n<p>Built-in LazyVim defaults that matter for prose (no plugin
    needed):</p>\n<ul>\n<li>FileType autocmd already sets <code>wrap</code> and <code>spell</code>
    for markdown:\n<code>lazyvim/config/autocmds.lua</code> (<code>wrap_spell</code>
    augroup, patterns include\n<code>markdown</code>). So spell+wrap are already on.</li>\n<li>Toggles
    already mapped: <code>&lt;leader&gt;us</code> spell, <code>&lt;leader&gt;uw</code>
    wrap,\n<code>&lt;leader&gt;um</code> render-markdown (with the extra), <code>&lt;leader&gt;uz</code>
    Snacks zen\nmode, <code>&lt;leader&gt;uD</code> Snacks dim \u2014 see <code>lazyvim/config/keymaps.lua</code>.</li>\n</ul>\n<h2
    id=\"2-render-markdownnvim--capabilities-and-the-admonition-gap\">2. render-markdown.nvim
    \u2014 capabilities and the admonition gap <a class=\"header-anchor\" href=\"#2-render-markdownnvim--capabilities-and-the-admonition-gap\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Repo: <a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim\">https://github.com/MeanderingProgrammer/render-markdown.nvim</a></p>\n<ul>\n<li>Renders
    headings, code blocks, inline code, horizontal rules, list\nbullets, <strong>checkboxes
    (with user-defined states)</strong>, block quotes,\n<strong>callouts</strong>,
    tables, links, LaTeX, per the README feature list.</li>\n<li>Callouts: supports
    GitHub (<code>[!NOTE]</code>, <code>[!TIP]</code>, <code>[!IMPORTANT]</code>,\n<code>[!WARNING]</code>,
    <code>[!CAUTION]</code>) and the full Obsidian set (<code>[!QUOTE]</code>,\n<code>[!TODO]</code>,
    etc.). Custom callouts are fully supported \u2014 each entry is\n<code>name =
    { raw = '[!SCRIPTURE]', rendered = ' Scripture', highlight = '...' }</code>.\nWiki
    reference:\n<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts\">https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts</a></li>\n<li>Custom
    callout titles (<code>&gt; [!quote] Psalm 119</code>) are supported:\n<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109\">https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109</a></li>\n<li>Checkboxes:
    <code>- [ ]</code> / <code>- [x]</code> render as icons, and arbitrary custom
    states\n(<code>- [/]</code>, <code>- [&gt;]</code>, etc.) are configurable (<code>checkbox.custom</code>).</li>\n<li><strong>mkdocs
    <code>!!!</code>/<code>???</code> admonitions are NOT supported.</strong> The
    plugin is\ntreesitter-driven over the standard markdown parser; admonition blocks\nare
    just indented text to it. Callout support was added for the\n<code>&gt; [!x]</code>
    blockquote syntax only\n(<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20\">https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20</a>).</li>\n<li>The
    main alternative, <code>OXY2DEV/markview.nvim</code>, also only renders\n<code>&gt;
    [!x]</code> callouts for markdown \u2014 its &quot;admonitions&quot; support is
    for\n<strong>Asciidoc</strong>, not mkdocs:\n<a href=\"https://github.com/OXY2DEV/markview.nvim/wiki/Markdown\">https://github.com/OXY2DEV/markview.nvim/wiki/Markdown</a></li>\n<li>Even
    <code>markdown-preview.nvim</code> can't preview mkdocs admonitions \u2014 open\nfeature
    request: <a href=\"https://github.com/iamcco/markdown-preview.nvim/issues/618\">https://github.com/iamcco/markdown-preview.nvim/issues/618</a>.\nThe
    faithful preview for <code>!!! scripture</code> is the markata/mkdocs build\nitself,
    not an editor plugin.</li>\n<li>Conceal/anti-conceal: <code>anti_conceal</code>
    hides the plugin's virtual text on\nthe cursor line so you can edit raw source;
    <code>win_options.conceallevel</code>\nis managed per rendered/raw view. Known
    upstream limitation: concealed\ntext + <code>wrap</code> keeps stale line breaks
    (neovim issue #14409), documented\nin <a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md\">https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md</a>.\nPractical
    tradeoff: rendered mode is great for reading/journaling review;\nexpect to live
    with <code>&lt;leader&gt;um</code> toggling or anti-conceal while editing.</li>\n</ul>\n<h2
    id=\"3-obsidiannvim--fit-for-a-non-obsidian-vault\">3. obsidian.nvim \u2014 fit
    for a non-Obsidian vault <a class=\"header-anchor\" href=\"#3-obsidiannvim--fit-for-a-non-obsidian-vault\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Repo (community fork,
    actively maintained; <code>epwalsh/obsidian.nvim</code> is the\nlegacy upstream):
    <a href=\"https://github.com/obsidian-nvim/obsidian.nvim\">https://github.com/obsidian-nvim/obsidian.nvim</a></p>\n<ul>\n<li>A
    &quot;workspace&quot; is just a directory of markdown \u2014 no <code>.obsidian/</code>
    config\nrequired. <code>workspaces = { { name = &quot;pype.dev&quot;, path = &quot;~/projects/personal/pype.dev&quot;
    } }</code>\nis a valid setup.</li>\n<li>Provides <code>:Obsidian today [OFFSET]</code>
    / <code>dailies</code>, <code>new_from_template</code>,\n<code>template</code>
    (substitutions, date/time formats), <code>backlinks</code>,\n<code>follow_link</code>,
    <code>search</code>, <code>link</code>, <code>links</code>. See command list in
    README.</li>\n<li>Completion of <code>[[</code> wiki links and <code>#</code>
    tags via blink.cmp or nvim-cmp;\nnewer versions do this through an in-process
    LSP so it works with any\ncompletion engine.</li>\n<li>Caveats:\n<ul>\n<li>Search/backlinks
    require <code>ripgrep</code>.</li>\n<li>Only activates inside workspace paths;
    the whole pype.dev repo would be\none workspace, so <code>:Obsidian search</code>
    scans posts+pages together\n(probably fine).</li>\n<li>Default wikilink style
    is <code>[[id|alias]]</code>-ish (<code>wiki_link_id_prefix</code>);\nthe <code>[[
    slug ]]</code>-with-spaces convention used by markata is configured\nvia <code>wiki_link_func</code>.
    Also <code>disable_frontmatter</code>/custom\n<code>note_frontmatter_func</code>
    matters since it would otherwise write\nObsidian-style frontmatter (<code>id</code>,
    <code>aliases</code>, <code>tags</code>) that markata\ndoesn't want.</li>\n<li>Its
    built-in checkbox/conceal UI is deprecated in favor of\nrender-markdown.nvim \u2014
    set <code>ui.enable = false</code> and let\nrender-markdown handle visuals.</li>\n</ul>\n</li>\n<li>Verdict:
    overlaps ~80% with the existing <code>pypeaday.daily</code> module (daily\nnotes,
    templates, backlinks). The genuinely new capability is <code>[[</code>\ncompletion
    and structured wikilink following \u2014 but <strong>marksman (already\nin lang.markdown)
    gives wikilink completion, <code>gd</code> link following, and\n<code>grr</code>
    backlinks for free</strong>, so obsidian.nvim is optional rather than\nfoundational.
    If adopted, keep <code>pypeaday.daily</code> for copier template\ncreation and
    use obsidian.nvim only for links/completion.</li>\n</ul>\n<h2 id=\"4-alternatives--brief-survey\">4.
    Alternatives \u2014 brief survey <a class=\"header-anchor\" href=\"#4-alternatives--brief-survey\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>telekasten.nvim</strong>
    (<a href=\"https://github.com/nvim-telekasten/telekasten.nvim\">https://github.com/nvim-telekasten/telekasten.nvim</a>):\ntelescope-based
    zettelkasten + journal; daily/weekly notes, templates,\nbacklinks, calendar. Works,
    but low recent activity and it duplicates\nthe existing copier+telescope workflow.
    Not recommended here.</li>\n<li><strong>zk-nvim</strong> (<a href=\"https://github.com/zk-org/zk-nvim\">https://github.com/zk-org/zk-nvim</a>):
    Neovim frontend for\nthe <code>zk</code> CLI (a real LSP + note DB). Solid and
    maintained, but it wants\nthe <code>zk</code> binary and a <code>zk</code>-style
    notebook \u2014 another parallel system, not\na fit for markata frontmatter/slugs.</li>\n<li><strong>neorg</strong>
    (<a href=\"https://github.com/nvim-neorg/neorg\">https://github.com/nvim-neorg/neorg</a>):
    still releasing (9.x),\nbut it's its own <code>.norg</code> file format \u2014
    incompatible with a markdown\nblog. Maintainer activity is low (focus shifted
    to the <code>lux</code> Lua package\nmanager): <a href=\"https://github.com/nvim-neorg/neorg/discussions/1673\">https://github.com/nvim-neorg/neorg/discussions/1673</a>.
    Skip.</li>\n<li><strong>Preview</strong>: <code>markdown-preview.nvim</code> (browser,
    in the extra, <code>&lt;leader&gt;cp</code>)\nis the maintained option. <code>glow.nvim</code>
    is abandoned \u2014 its own README\npoints at render-markdown.nvim:\n<a href=\"https://github.com/ellisonleao/glow.nvim/\">https://github.com/ellisonleao/glow.nvim/</a>
    (fork <code>shcode/nvim-glow</code>\nexists but is a terminal renderer, no help
    for admonitions). For this\nsite, <code>markata</code>'s own build/serve is the
    only faithful preview.</li>\n<li><strong>Focus</strong>: don't install zen-mode/twilight.
    LazyVim already maps\n<code>Snacks.zen()</code> to <code>&lt;leader&gt;uz</code>
    and <code>Snacks.toggle.dim()</code> to <code>&lt;leader&gt;uD</code>\n(folke's
    snacks.nvim replaced his standalone plugins:\n<a href=\"https://github.com/folke/snacks.nvim/blob/main/docs/zen.md\">https://github.com/folke/snacks.nvim/blob/main/docs/zen.md</a>).</li>\n<li><strong>Tables</strong>:
    <code>tabular</code> is already installed (<code>:Tabularize /|</code>), and\nprettier
    (via conform <code>&lt;leader&gt;cf</code>) aligns markdown tables automatically.\nIf
    auto-growing tables are wanted, <code>Kicamon/markdown-table-mode.nvim</code>
    or\n<code>dhruvasagar/vim-table-mode</code> are the options \u2014 probably unnecessary.</li>\n<li><strong>List/checkbox
    ergonomics</strong>: <code>bullets.vim</code>\n(<a href=\"https://github.com/bullets-vim/bullets.vim\">https://github.com/bullets-vim/bullets.vim</a>)
    auto-continues lists on\n<code>&lt;CR&gt;</code>/<code>o</code>, renumbers with
    <code>gN</code>, indents with <code>&gt;&gt;</code>/<code>&lt;&lt;</code>, and
    toggles\ncheckboxes with <code>&lt;leader&gt;x</code> \u2014 including partial-completion
    parent\ncheckboxes. Perfect fit for prayer-request checklists.</li>\n<li><strong>Link
    editing nicety</strong>: <code>antonk52/markdowny.nvim</code> adds vim-style\nsurround
    ops for <code>[text](url)</code> links. Optional quality-of-life.</li>\n</ul>\n<h2
    id=\"5-spell--wrap--prose-ergonomics\">5. Spell / wrap / prose ergonomics <a class=\"header-anchor\"
    href=\"#5-spell--wrap--prose-ergonomics\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Already handled
    by LazyVim core: <code>spell</code> + <code>wrap</code> FileType autocmd for\nmarkdown;
    <code>&lt;leader&gt;us</code> / <code>&lt;leader&gt;uw</code> toggles; <code>spelllang
    = &quot;en&quot;</code>.</li>\n<li>Worth adding in an ftplugin/autocmd: <code>linebreak</code>
    (wrap at words, not\nmid-word), <code>breakindent</code> (wrapped lines keep list
    indent), <code>wrapmargin</code>/\n<code>colorcolumn</code> hygiene, and <code>conceallevel=2</code>
    + <code>concealcursor=nc</code> if you\nwant rendered-markdown to look clean while
    keeping cursor-line raw.\nNote <code>smoothscroll</code> is globally disabled
    in this config\n(<code>vim.opt.smoothscroll = false</code>) \u2014 re-enable it
    locally for markdown if\nlong wrapped paragraphs feel jumpy.</li>\n<li>Prose LSPs:\n<ul>\n<li><strong>harper-ls</strong>
    (<a href=\"https://github.com/Automattic/harper\">https://github.com/Automattic/harper</a>,\n<a
    href=\"https://writewithharper.com\">https://writewithharper.com</a>): Rust grammar/spelling
    LSP aimed at\ndevelopers; markdown-aware, fast, no Java. Installable via mason\n(<code>harper_ls</code>
    in lspconfig), every linter toggleable\n(<code>linters.sentence_capitalization</code>,
    <code>long_sentences</code>, etc.). Best\ncurrent default for prose grammar. Caution:
    it flags in every buffer\nit attaches to \u2014 scope it to <code>markdown</code>
    filetype only.</li>\n<li><strong>ltex-ls is dead</strong> \u2014 <code>valentjn/ltex-ls</code>
    is archived\n(<a href=\"https://github.com/valentjn/ltex-ls\">https://github.com/valentjn/ltex-ls</a>).
    Maintained fork:\n<strong>ltex-plus/ltex-ls-plus</strong> (<a href=\"https://github.com/ltex-plus/ltex-ls-plus\">https://github.com/ltex-plus/ltex-ls-plus</a>),\nstill
    LanguageTool-based (heavy JVM, but deeper grammar rules).</li>\n<li><strong>vale</strong>
    (<a href=\"https://vale.sh\">https://vale.sh</a>): CLI style-guide linter; usable
    through\nnvim-lint's <code>vale</code> linter. Best if you want house-style rules\n(write-good/proselint
    packs), more setup than value for journaling.</li>\n</ul>\n</li>\n<li>Soft punctuation
    niceties: <code>pensieve</code>/<code>cmp-dictionary</code> are mostly dead\nends;
    the spell dictionary via <code>zg</code> + blink <code>buffer</code>/<code>spell</code>
    source\ncovers the practical case.</li>\n</ul>\n<h2 id=\"recommended-additions-for-this-setup\">Recommended
    additions for this setup <a class=\"header-anchor\" href=\"#recommended-additions-for-this-setup\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Ordered by value \xF7
    effort.</p>\n<h3>1. lang.markdown extra is already enabled (zero new code)</h3>\n<p><code>~/.config/nvim/lua/config/lazy.lua</code>
    line 53 already imports it. Verify\nmarksman attaches with <code>:LspInfo</code>
    in a note buffer. Then:</p>\n<ul>\n<li><code>gd</code> on <code>[[ 2025-09-13-notes
    ]]</code> jumps to the note</li>\n<li><code>grr</code> (LSP references) is a richer
    backlinks view than the live_grep\npattern in <code>find_daily_files</code>/<code>find_backlinks</code>
    \u2014 keep the telescope one,\nit searches the spaced <code>[[ slug ]]</code>
    convention regardless of whether\nmarksman resolves it.</li>\n<li>Caveat: marksman
    treats the git root (<code>pype.dev</code>) as the workspace, which\nis what we
    want. Verify it resolves the spaced <code>[[ slug ]]</code> form; if not,\ncompletion
    still works for <code>[[slug]]</code> and markata tolerates both.</li>\n</ul>\n<h3>2.
    Markdown writing-mode ftplugin (tiny, high value)</h3>\n<p><code>~/.config/nvim/after/ftplugin/markdown.lua</code>
    (LazyVim loads <code>after/ftplugin</code>\nautomatically \u2014 no spec needed):</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">linebreak</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">      </span><span
    class=\"c1\">-- wrap at word boundaries</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">breakindent</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">    </span><span
    class=\"c1\">-- keep list indentation on wrapped lines</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">smoothscroll</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">   </span><span
    class=\"c1\">-- undo the global `false` for prose</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">conceallevel</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"mi\">2</span><span class=\"w\">      </span><span
    class=\"c1\">-- conceal markup for rendered view</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">concealcursor</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;nc&quot;</span><span class=\"w\">
    \ </span><span class=\"c1\">-- show raw text on the cursor line in insert</span>\n<span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">opt_local</span><span
    class=\"p\">.</span><span class=\"py\">spell</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"w\">          </span><span class=\"c1\">-- redundant w/ LazyVim autocmd,
    explicit is fine</span>\n<span class=\"c1\">-- map j/k to gj/gk for wrapped-line
    navigation (markdown buffers only)</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">keymap</span><span class=\"p\">.</span><span
    class=\"nf\">set</span><span class=\"p\">({</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;n&quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;x&quot;</span><span class=\"w\"> </span><span
    class=\"p\">},</span><span class=\"w\"> </span><span class=\"s2\">&quot;j&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;gj&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">buffer</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">remap</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"w\"> </span><span class=\"p\">})</span>\n<span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">keymap</span><span
    class=\"p\">.</span><span class=\"nf\">set</span><span class=\"p\">({</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;n&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;x&quot;</span><span class=\"w\">
    </span><span class=\"p\">},</span><span class=\"w\"> </span><span class=\"s2\">&quot;k&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;gk&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">buffer</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">remap</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"w\"> </span><span class=\"p\">})</span>\n</pre></div>\n\n</pre>\n\n<h3>3.
    render-markdown tweaks + a <code>scripture</code> callout + checkbox states</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">-- lua/plugins/markdown.lua</span>\n<span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"s2\">&quot;MeanderingProgrammer/render-markdown.nvim&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">opts</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"c1\">-- re-enable
    what LazyVim&#39;s extra disables</span>\n<span class=\"w\">      </span><span
    class=\"nv\">checkbox</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">        </span><span
    class=\"nv\">enabled</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"p\">,</span>\n<span
    class=\"w\">        </span><span class=\"nv\">unchecked</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">icon</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;\U000F0131
    &quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">checked</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">icon</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;\U000F0C52
    &quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">custom</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">          </span><span class=\"nv\">praying</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">raw</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;[/]&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">rendered</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;\U000F1442 &quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"nv\">highlight</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;RenderMarkdownWarn&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">        </span><span
    class=\"p\">},</span>\n<span class=\"w\">      </span><span class=\"p\">},</span>\n<span
    class=\"w\">      </span><span class=\"nv\">callout</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">        </span><span class=\"c1\">-- !!! scripture has no renderer;
    if you ever write</span>\n<span class=\"w\">        </span><span class=\"c1\">--
    &gt; [!scripture] in blog posts this makes it pretty.</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">scripture</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">          </span><span class=\"nv\">raw</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;[!SCRIPTURE]&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">          </span><span class=\"nv\">rendered</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;\U000F05F6 Scripture&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">          </span><span class=\"nv\">highlight</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;RenderMarkdownHint&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"p\">},</span>\n<span
    class=\"w\">      </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"nv\">anti_conceal</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"nv\">enabled</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\"> </span><span
    class=\"p\">},</span><span class=\"w\"> </span><span class=\"c1\">-- cursor line
    shows raw markdown</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<p>Reality
    check: <strong>nothing renders <code>!!! scripture</code> blocks in the editor</strong>
    \u2014\nthey'll show as plain indented text (which is honest: markata is the only\nreal
    renderer). If visual distinction matters, <code>util.mini-hipatterns</code> is\nalready
    enabled \u2014 add a pattern:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">-- inside
    the existing mini.hipatterns spec</span>\n<span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">hipatterns</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;mini.hipatterns&quot;</span><span
    class=\"p\">)</span>\n<span class=\"nv\">opts</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nv\">highlighters</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">    </span><span class=\"nv\">admonition</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">pattern</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;^!?%?+
    +%w+.*&quot;</span><span class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">group</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Special&quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<h3>4.
    bullets.vim for prayer-request checklists (one line, high value)</h3>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;bullets-vim/bullets.vim&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">ft</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;markdown&quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n</pre></div>\n\n</pre>\n\n<p><code>&lt;leader&gt;x</code>
    toggles <code>- [ ]</code>/<code>- [x]</code>, <code>&lt;CR&gt;</code>/<code>o</code>
    continue list items,\n<code>&gt;&gt;</code>/<code>&lt;&lt;</code> adjust nesting.
    Docs:\n<a href=\"https://github.com/bullets-vim/bullets.vim\">https://github.com/bullets-vim/bullets.vim</a></p>\n<h3>5.
    Optional, heavier lifts (only if felt needed)</h3>\n<ul>\n<li>\n<p><strong>harper-ls</strong>
    grammar checking, scoped to markdown:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;neovim/nvim-lspconfig&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">  </span><span class=\"nv\">opts</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">    </span><span class=\"nv\">servers</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nv\">harper_ls</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">        </span><span class=\"nv\">filetypes</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"s2\">&quot;markdown&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">        </span><span
    class=\"nv\">settings</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">          </span><span
    class=\"p\">[</span><span class=\"s2\">&quot;harper-ls&quot;</span><span class=\"p\">]</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">            </span><span class=\"nv\">linters</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"nv\">sentence_capitalization</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">long_sentences</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">false</span><span class=\"w\"> </span><span
    class=\"p\">},</span>\n<span class=\"w\">          </span><span class=\"p\">},</span>\n<span
    class=\"w\">        </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n</li>\n<li>\n<p><strong>obsidian.nvim</strong>
    for <code>[[</code> completion + <code>:Obsidian backlinks</code> \u2014 only
    if\nmarksman's LSP completion of wikilinks proves insufficient. Keep\n<code>ui.enable
    = false</code> and continue using <code>pypeaday.daily</code> + copier for note\ncreation.
    Expect to write a <code>wiki_link_func</code> to emit <code>[[ slug ]]</code>
    and a\n<code>note_frontmatter_func</code> matching markata's frontmatter.</p>\n</li>\n</ul>\n<h2
    id=\"bottom-line\">Bottom line <a class=\"header-anchor\" href=\"#bottom-line\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The copier+telescope
    daily-notes system is already doing the job of an\nentire plugin category (telekasten/zk/obsidian
    daily notes). The real gaps\nare: marksman wikilink navigation (free, already
    enabled via lang.markdown),\nrendered checkboxes/callouts (render-markdown, in
    the extra), checkbox\ntoggling (bullets.vim), wrapped-line ergonomics (a 6-line
    ftplugin), and\noptional grammar checking (harper-ls). <code>!!!</code> admonitions
    are a markata-side\nconcern \u2014 no editor plugin renders them; at most, highlight
    the marker line.</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Neovim
    Markdown Journaling Research</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"Research on the current Neovim plugin landscape for writing/journaling
    in\nMarkdown, oriented around this site&#x27;s workflow: a markata blog with YAML\nfrontmat\"
    />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\"
    href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\"
    crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\" />\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"Neovim
    Markdown Journaling Research | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/neovim-markdown-journaling-research\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Neovim Markdown Journaling Research | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Research on the current Neovim plugin landscape for writing/journaling
    in\nMarkdown, oriented around this site&#x27;s workflow: a markata blog with YAML\nfrontmat\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/neovim-markdown-journaling-research</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <section
    class=\"post-terminal\">\n        <article class=\"post-terminal__article\">\n
    \           <p>Research on the current Neovim plugin landscape for writing/journaling
    in\nMarkdown, oriented around this site's workflow: a markata blog with YAML\nfrontmatter,
    mkdocs-material-style <code>!!! scripture</code> / <code>??? scripture</code>\nadmonitions,
    <code>[[ slug ]]</code> wikilinks, and a custom <code>pypeaday.daily</code> module\n(copier
    templates + telescope/fzf pickers + live_grep backlinks).</p>\n<h2 id=\"1-lazyvim-langmarkdown-extra--what-it-actually-does\">1.
    LazyVim <code>lang.markdown</code> extra \u2014 what it actually does <a class=\"header-anchor\"
    href=\"#1-lazyvim-langmarkdown-extra--what-it-actually-does\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Source of truth (current
    <code>main</code>):\n<a href=\"https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua\">https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua</a>\nDocs:
    <a href=\"https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md\">https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md</a></p>\n<p>As
    of 2026, the extra installs/configures:</p>\n<ul>\n<li><strong>marksman</strong>
    via nvim-lspconfig (<code>servers = { marksman = {} }</code>) \u2014 markdown\nLSP
    with <code>[[wikilink]]</code> completion, go-to-definition, references\n(backlinks),
    and dead-link diagnostics. Big deal: most of what\n<code>pypeaday.daily.find_backlinks()</code>
    does via telescope live_grep, marksman\ngives via <code>grr</code>/<code>vim.lsp.buf.references</code>.</li>\n<li><strong>markdownlint-cli2</strong>
    via nvim-lint (and none-ls if installed), plus\nconform.nvim formatters <code>prettier</code>,
    <code>markdownlint-cli2</code>, and <code>markdown-toc</code>\n(the last only
    runs when the buffer contains <code>&lt;!-- toc --&gt;</code>). Mason\nauto-installs
    <code>markdownlint-cli2</code> + <code>markdown-toc</code>. LazyVim switched from\nmarkdownlint-cli
    to cli2 in 2024:\n<a href=\"https://github.com/LazyVim/LazyVim/pull/3843\">https://github.com/LazyVim/LazyVim/pull/3843</a></li>\n<li><strong>markdown-preview.nvim</strong>
    (<code>iamcco/markdown-preview.nvim</code>) \u2014 browser\npreview on <code>&lt;leader&gt;cp</code>
    (markdown buffers only).</li>\n<li><strong>render-markdown.nvim</strong> (<code>MeanderingProgrammer/render-markdown.nvim</code>)
    \u2014\nin-buffer rendering. LazyVim replaced <code>headlines.nvim</code> with
    this plugin\nback in 2024:\n<a href=\"https://github.com/LazyVim/LazyVim/pull/4139\">https://github.com/LazyVim/LazyVim/pull/4139</a>.
    LazyVim's config disables\nheading icons and checkbox rendering, and maps a\n<code>&lt;leader&gt;um</code>
    toggle via <code>Snacks.toggle</code>.</li>\n</ul>\n<p>There is <strong>no prose/spell/grammar
    extra</strong> in LazyVim \u2014 the full extras list\ncontains nothing like a
    <code>lang.text</code> or <code>extras.spelling</code>. Prose tooling has\nto
    be added by hand.</p>\n<p>The import already exists in <code>~/.config/nvim/lua/config/lazy.lua</code>
    (line 53)\nalongside ~15 other extras \u2014 verified 2026-10-04. If plugins look
    missing,\n<code>:Lazy sync</code> will reconcile; <code>:LazyExtras</code> shows
    what's active.</p>\n<p>Built-in LazyVim defaults that matter for prose (no plugin
    needed):</p>\n<ul>\n<li>FileType autocmd already sets <code>wrap</code> and <code>spell</code>
    for markdown:\n<code>lazyvim/config/autocmds.lua</code> (<code>wrap_spell</code>
    augroup, patterns include\n<code>markdown</code>). So spell+wrap are already on.</li>\n<li>Toggles
    already mapped: <code>&lt;leader&gt;us</code> spell, <code>&lt;leader&gt;uw</code>
    wrap,\n<code>&lt;leader&gt;um</code> render-markdown (with the extra), <code>&lt;leader&gt;uz</code>
    Snacks zen\nmode, <code>&lt;leader&gt;uD</code> Snacks dim \u2014 see <code>lazyvim/config/keymaps.lua</code>.</li>\n</ul>\n<h2
    id=\"2-render-markdownnvim--capabilities-and-the-admonition-gap\">2. render-markdown.nvim
    \u2014 capabilities and the admonition gap <a class=\"header-anchor\" href=\"#2-render-markdownnvim--capabilities-and-the-admonition-gap\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Repo: <a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim\">https://github.com/MeanderingProgrammer/render-markdown.nvim</a></p>\n<ul>\n<li>Renders
    headings, code blocks, inline code, horizontal rules, list\nbullets, <strong>checkboxes
    (with user-defined states)</strong>, block quotes,\n<strong>callouts</strong>,
    tables, links, LaTeX, per the README feature list.</li>\n<li>Callouts: supports
    GitHub (<code>[!NOTE]</code>, <code>[!TIP]</code>, <code>[!IMPORTANT]</code>,\n<code>[!WARNING]</code>,
    <code>[!CAUTION]</code>) and the full Obsidian set (<code>[!QUOTE]</code>,\n<code>[!TODO]</code>,
    etc.). Custom callouts are fully supported \u2014 each entry is\n<code>name =
    { raw = '[!SCRIPTURE]', rendered = ' Scripture', highlight = '...' }</code>.\nWiki
    reference:\n<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts\">https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts</a></li>\n<li>Custom
    callout titles (<code>&gt; [!quote] Psalm 119</code>) are supported:\n<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109\">https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109</a></li>\n<li>Checkboxes:
    <code>- [ ]</code> / <code>- [x]</code> render as icons, and arbitrary custom
    states\n(<code>- [/]</code>, <code>- [&gt;]</code>, etc.) are configurable (<code>checkbox.custom</code>).</li>\n<li><strong>mkdocs
    <code>!!!</code>/<code>???</code> admonitions are NOT supported.</strong> The
    plugin is\ntreesitter-driven over the standard markdown parser; admonition blocks\nare
    just indented text to it. Callout support was added for the\n<code>&gt; [!x]</code>
    blockquote syntax only\n(<a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20\">https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20</a>).</li>\n<li>The
    main alternative, <code>OXY2DEV/markview.nvim</code>, also only renders\n<code>&gt;
    [!x]</code> callouts for markdown \u2014 its &quot;admonitions&quot; support is
    for\n<strong>Asciidoc</strong>, not mkdocs:\n<a href=\"https://github.com/OXY2DEV/markview.nvim/wiki/Markdown\">https://github.com/OXY2DEV/markview.nvim/wiki/Markdown</a></li>\n<li>Even
    <code>markdown-preview.nvim</code> can't preview mkdocs admonitions \u2014 open\nfeature
    request: <a href=\"https://github.com/iamcco/markdown-preview.nvim/issues/618\">https://github.com/iamcco/markdown-preview.nvim/issues/618</a>.\nThe
    faithful preview for <code>!!! scripture</code> is the markata/mkdocs build\nitself,
    not an editor plugin.</li>\n<li>Conceal/anti-conceal: <code>anti_conceal</code>
    hides the plugin's virtual text on\nthe cursor line so you can edit raw source;
    <code>win_options.conceallevel</code>\nis managed per rendered/raw view. Known
    upstream limitation: concealed\ntext + <code>wrap</code> keeps stale line breaks
    (neovim issue #14409), documented\nin <a href=\"https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md\">https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md</a>.\nPractical
    tradeoff: rendered mode is great for reading/journaling review;\nexpect to live
    with <code>&lt;leader&gt;um</code> toggling or anti-conceal while editing.</li>\n</ul>\n<h2
    id=\"3-obsidiannvim--fit-for-a-non-obsidian-vault\">3. obsidian.nvim \u2014 fit
    for a non-Obsidian vault <a class=\"header-anchor\" href=\"#3-obsidiannvim--fit-for-a-non-obsidian-vault\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Repo (community fork,
    actively maintained; <code>epwalsh/obsidian.nvim</code> is the\nlegacy upstream):
    <a href=\"https://github.com/obsidian-nvim/obsidian.nvim\">https://github.com/obsidian-nvim/obsidian.nvim</a></p>\n<ul>\n<li>A
    &quot;workspace&quot; is just a directory of markdown \u2014 no <code>.obsidian/</code>
    config\nrequired. <code>workspaces = { { name = &quot;pype.dev&quot;, path = &quot;~/projects/personal/pype.dev&quot;
    } }</code>\nis a valid setup.</li>\n<li>Provides <code>:Obsidian today [OFFSET]</code>
    / <code>dailies</code>, <code>new_from_template</code>,\n<code>template</code>
    (substitutions, date/time formats), <code>backlinks</code>,\n<code>follow_link</code>,
    <code>search</code>, <code>link</code>, <code>links</code>. See command list in
    README.</li>\n<li>Completion of <code>[[</code> wiki links and <code>#</code>
    tags via blink.cmp or nvim-cmp;\nnewer versions do this through an in-process
    LSP so it works with any\ncompletion engine.</li>\n<li>Caveats:\n<ul>\n<li>Search/backlinks
    require <code>ripgrep</code>.</li>\n<li>Only activates inside workspace paths;
    the whole pype.dev repo would be\none workspace, so <code>:Obsidian search</code>
    scans posts+pages together\n(probably fine).</li>\n<li>Default wikilink style
    is <code>[[id|alias]]</code>-ish (<code>wiki_link_id_prefix</code>);\nthe <code>[[
    slug ]]</code>-with-spaces convention used by markata is configured\nvia <code>wiki_link_func</code>.
    Also <code>disable_frontmatter</code>/custom\n<code>note_frontmatter_func</code>
    matters since it would otherwise write\nObsidian-style frontmatter (<code>id</code>,
    <code>aliases</code>, <code>tags</code>) that markata\ndoesn't want.</li>\n<li>Its
    built-in checkbox/conceal UI is deprecated in favor of\nrender-markdown.nvim \u2014
    set <code>ui.enable = false</code> and let\nrender-markdown handle visuals.</li>\n</ul>\n</li>\n<li>Verdict:
    overlaps ~80% with the existing <code>pypeaday.daily</code> module (daily\nnotes,
    templates, backlinks). The genuinely new capability is <code>[[</code>\ncompletion
    and structured wikilink following \u2014 but <strong>marksman (already\nin lang.markdown)
    gives wikilink completion, <code>gd</code> link following, and\n<code>grr</code>
    backlinks for free</strong>, so obsidian.nvim is optional rather than\nfoundational.
    If adopted, keep <code>pypeaday.daily</code> for copier template\ncreation and
    use obsidian.nvim only for links/completion.</li>\n</ul>\n<h2 id=\"4-alternatives--brief-survey\">4.
    Alternatives \u2014 brief survey <a class=\"header-anchor\" href=\"#4-alternatives--brief-survey\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li><strong>telekasten.nvim</strong>
    (<a href=\"https://github.com/nvim-telekasten/telekasten.nvim\">https://github.com/nvim-telekasten/telekasten.nvim</a>):\ntelescope-based
    zettelkasten + journal; daily/weekly notes, templates,\nbacklinks, calendar. Works,
    but low recent activity and it duplicates\nthe existing copier+telescope workflow.
    Not recommended here.</li>\n<li><strong>zk-nvim</strong> (<a href=\"https://github.com/zk-org/zk-nvim\">https://github.com/zk-org/zk-nvim</a>):
    Neovim frontend for\nthe <code>zk</code> CLI (a real LSP + note DB). Solid and
    maintained, but it wants\nthe <code>zk</code> binary and a <code>zk</code>-style
    notebook \u2014 another parallel system, not\na fit for markata frontmatter/slugs.</li>\n<li><strong>neorg</strong>
    (<a href=\"https://github.com/nvim-neorg/neorg\">https://github.com/nvim-neorg/neorg</a>):
    still releasing (9.x),\nbut it's its own <code>.norg</code> file format \u2014
    incompatible with a markdown\nblog. Maintainer activity is low (focus shifted
    to the <code>lux</code> Lua package\nmanager): <a href=\"https://github.com/nvim-neorg/neorg/discussions/1673\">https://github.com/nvim-neorg/neorg/discussions/1673</a>.
    Skip.</li>\n<li><strong>Preview</strong>: <code>markdown-preview.nvim</code> (browser,
    in the extra, <code>&lt;leader&gt;cp</code>)\nis the maintained option. <code>glow.nvim</code>
    is abandoned \u2014 its own README\npoints at render-markdown.nvim:\n<a href=\"https://github.com/ellisonleao/glow.nvim/\">https://github.com/ellisonleao/glow.nvim/</a>
    (fork <code>shcode/nvim-glow</code>\nexists but is a terminal renderer, no help
    for admonitions). For this\nsite, <code>markata</code>'s own build/serve is the
    only faithful preview.</li>\n<li><strong>Focus</strong>: don't install zen-mode/twilight.
    LazyVim already maps\n<code>Snacks.zen()</code> to <code>&lt;leader&gt;uz</code>
    and <code>Snacks.toggle.dim()</code> to <code>&lt;leader&gt;uD</code>\n(folke's
    snacks.nvim replaced his standalone plugins:\n<a href=\"https://github.com/folke/snacks.nvim/blob/main/docs/zen.md\">https://github.com/folke/snacks.nvim/blob/main/docs/zen.md</a>).</li>\n<li><strong>Tables</strong>:
    <code>tabular</code> is already installed (<code>:Tabularize /|</code>), and\nprettier
    (via conform <code>&lt;leader&gt;cf</code>) aligns markdown tables automatically.\nIf
    auto-growing tables are wanted, <code>Kicamon/markdown-table-mode.nvim</code>
    or\n<code>dhruvasagar/vim-table-mode</code> are the options \u2014 probably unnecessary.</li>\n<li><strong>List/checkbox
    ergonomics</strong>: <code>bullets.vim</code>\n(<a href=\"https://github.com/bullets-vim/bullets.vim\">https://github.com/bullets-vim/bullets.vim</a>)
    auto-continues lists on\n<code>&lt;CR&gt;</code>/<code>o</code>, renumbers with
    <code>gN</code>, indents with <code>&gt;&gt;</code>/<code>&lt;&lt;</code>, and
    toggles\ncheckboxes with <code>&lt;leader&gt;x</code> \u2014 including partial-completion
    parent\ncheckboxes. Perfect fit for prayer-request checklists.</li>\n<li><strong>Link
    editing nicety</strong>: <code>antonk52/markdowny.nvim</code> adds vim-style\nsurround
    ops for <code>[text](url)</code> links. Optional quality-of-life.</li>\n</ul>\n<h2
    id=\"5-spell--wrap--prose-ergonomics\">5. Spell / wrap / prose ergonomics <a class=\"header-anchor\"
    href=\"#5-spell--wrap--prose-ergonomics\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<ul>\n<li>Already handled
    by LazyVim core: <code>spell</code> + <code>wrap</code> FileType autocmd for\nmarkdown;
    <code>&lt;leader&gt;us</code> / <code>&lt;leader&gt;uw</code> toggles; <code>spelllang
    = &quot;en&quot;</code>.</li>\n<li>Worth adding in an ftplugin/autocmd: <code>linebreak</code>
    (wrap at words, not\nmid-word), <code>breakindent</code> (wrapped lines keep list
    indent), <code>wrapmargin</code>/\n<code>colorcolumn</code> hygiene, and <code>conceallevel=2</code>
    + <code>concealcursor=nc</code> if you\nwant rendered-markdown to look clean while
    keeping cursor-line raw.\nNote <code>smoothscroll</code> is globally disabled
    in this config\n(<code>vim.opt.smoothscroll = false</code>) \u2014 re-enable it
    locally for markdown if\nlong wrapped paragraphs feel jumpy.</li>\n<li>Prose LSPs:\n<ul>\n<li><strong>harper-ls</strong>
    (<a href=\"https://github.com/Automattic/harper\">https://github.com/Automattic/harper</a>,\n<a
    href=\"https://writewithharper.com\">https://writewithharper.com</a>): Rust grammar/spelling
    LSP aimed at\ndevelopers; markdown-aware, fast, no Java. Installable via mason\n(<code>harper_ls</code>
    in lspconfig), every linter toggleable\n(<code>linters.sentence_capitalization</code>,
    <code>long_sentences</code>, etc.). Best\ncurrent default for prose grammar. Caution:
    it flags in every buffer\nit attaches to \u2014 scope it to <code>markdown</code>
    filetype only.</li>\n<li><strong>ltex-ls is dead</strong> \u2014 <code>valentjn/ltex-ls</code>
    is archived\n(<a href=\"https://github.com/valentjn/ltex-ls\">https://github.com/valentjn/ltex-ls</a>).
    Maintained fork:\n<strong>ltex-plus/ltex-ls-plus</strong> (<a href=\"https://github.com/ltex-plus/ltex-ls-plus\">https://github.com/ltex-plus/ltex-ls-plus</a>),\nstill
    LanguageTool-based (heavy JVM, but deeper grammar rules).</li>\n<li><strong>vale</strong>
    (<a href=\"https://vale.sh\">https://vale.sh</a>): CLI style-guide linter; usable
    through\nnvim-lint's <code>vale</code> linter. Best if you want house-style rules\n(write-good/proselint
    packs), more setup than value for journaling.</li>\n</ul>\n</li>\n<li>Soft punctuation
    niceties: <code>pensieve</code>/<code>cmp-dictionary</code> are mostly dead\nends;
    the spell dictionary via <code>zg</code> + blink <code>buffer</code>/<code>spell</code>
    source\ncovers the practical case.</li>\n</ul>\n<h2 id=\"recommended-additions-for-this-setup\">Recommended
    additions for this setup <a class=\"header-anchor\" href=\"#recommended-additions-for-this-setup\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Ordered by value \xF7
    effort.</p>\n<h3>1. lang.markdown extra is already enabled (zero new code)</h3>\n<p><code>~/.config/nvim/lua/config/lazy.lua</code>
    line 53 already imports it. Verify\nmarksman attaches with <code>:LspInfo</code>
    in a note buffer. Then:</p>\n<ul>\n<li><code>gd</code> on <code>[[ 2025-09-13-notes
    ]]</code> jumps to the note</li>\n<li><code>grr</code> (LSP references) is a richer
    backlinks view than the live_grep\npattern in <code>find_daily_files</code>/<code>find_backlinks</code>
    \u2014 keep the telescope one,\nit searches the spaced <code>[[ slug ]]</code>
    convention regardless of whether\nmarksman resolves it.</li>\n<li>Caveat: marksman
    treats the git root (<code>pype.dev</code>) as the workspace, which\nis what we
    want. Verify it resolves the spaced <code>[[ slug ]]</code> form; if not,\ncompletion
    still works for <code>[[slug]]</code> and markata tolerates both.</li>\n</ul>\n<h3>2.
    Markdown writing-mode ftplugin (tiny, high value)</h3>\n<p><code>~/.config/nvim/after/ftplugin/markdown.lua</code>
    (LazyVim loads <code>after/ftplugin</code>\nautomatically \u2014 no spec needed):</p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">linebreak</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">      </span><span
    class=\"c1\">-- wrap at word boundaries</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">breakindent</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">    </span><span
    class=\"c1\">-- keep list indentation on wrapped lines</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">smoothscroll</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\">   </span><span
    class=\"c1\">-- undo the global `false` for prose</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">conceallevel</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"mi\">2</span><span class=\"w\">      </span><span
    class=\"c1\">-- conceal markup for rendered view</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">opt_local</span><span class=\"p\">.</span><span
    class=\"py\">concealcursor</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;nc&quot;</span><span class=\"w\">
    \ </span><span class=\"c1\">-- show raw text on the cursor line in insert</span>\n<span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">opt_local</span><span
    class=\"p\">.</span><span class=\"py\">spell</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"w\">          </span><span class=\"c1\">-- redundant w/ LazyVim autocmd,
    explicit is fine</span>\n<span class=\"c1\">-- map j/k to gj/gk for wrapped-line
    navigation (markdown buffers only)</span>\n<span class=\"nv\">vim</span><span
    class=\"p\">.</span><span class=\"py\">keymap</span><span class=\"p\">.</span><span
    class=\"nf\">set</span><span class=\"p\">({</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;n&quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"s2\">&quot;x&quot;</span><span class=\"w\"> </span><span
    class=\"p\">},</span><span class=\"w\"> </span><span class=\"s2\">&quot;j&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;gj&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">buffer</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">remap</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"w\"> </span><span class=\"p\">})</span>\n<span
    class=\"nv\">vim</span><span class=\"p\">.</span><span class=\"py\">keymap</span><span
    class=\"p\">.</span><span class=\"nf\">set</span><span class=\"p\">({</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;n&quot;</span><span class=\"p\">,</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;x&quot;</span><span class=\"w\">
    </span><span class=\"p\">},</span><span class=\"w\"> </span><span class=\"s2\">&quot;k&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s2\">&quot;gk&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">buffer</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"kc\">true</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">remap</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"w\"> </span><span class=\"p\">})</span>\n</pre></div>\n\n</pre>\n\n<h3>3.
    render-markdown tweaks + a <code>scripture</code> callout + checkbox states</h3>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">-- lua/plugins/markdown.lua</span>\n<span
    class=\"kr\">return</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"p\">{</span>\n<span class=\"w\">    </span><span
    class=\"s2\">&quot;MeanderingProgrammer/render-markdown.nvim&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">    </span><span class=\"nv\">opts</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"c1\">-- re-enable
    what LazyVim&#39;s extra disables</span>\n<span class=\"w\">      </span><span
    class=\"nv\">checkbox</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">        </span><span
    class=\"nv\">enabled</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"p\">,</span>\n<span
    class=\"w\">        </span><span class=\"nv\">unchecked</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">icon</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;\U000F0131
    &quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">checked</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">icon</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;\U000F0C52
    &quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">custom</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">          </span><span class=\"nv\">praying</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">raw</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;[/]&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">rendered</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;\U000F1442 &quot;</span><span class=\"p\">,</span><span class=\"w\">
    </span><span class=\"nv\">highlight</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;RenderMarkdownWarn&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">        </span><span
    class=\"p\">},</span>\n<span class=\"w\">      </span><span class=\"p\">},</span>\n<span
    class=\"w\">      </span><span class=\"nv\">callout</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">        </span><span class=\"c1\">-- !!! scripture has no renderer;
    if you ever write</span>\n<span class=\"w\">        </span><span class=\"c1\">--
    &gt; [!scripture] in blog posts this makes it pretty.</span>\n<span class=\"w\">
    \       </span><span class=\"nv\">scripture</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">          </span><span class=\"nv\">raw</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;[!SCRIPTURE]&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">          </span><span class=\"nv\">rendered</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;\U000F05F6 Scripture&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">          </span><span class=\"nv\">highlight</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;RenderMarkdownHint&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">        </span><span class=\"p\">},</span>\n<span
    class=\"w\">      </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"nv\">anti_conceal</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span
    class=\"nv\">enabled</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">true</span><span class=\"w\"> </span><span
    class=\"p\">},</span><span class=\"w\"> </span><span class=\"c1\">-- cursor line
    shows raw markdown</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<p>Reality
    check: <strong>nothing renders <code>!!! scripture</code> blocks in the editor</strong>
    \u2014\nthey'll show as plain indented text (which is honest: markata is the only\nreal
    renderer). If visual distinction matters, <code>util.mini-hipatterns</code> is\nalready
    enabled \u2014 add a pattern:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\">-- inside
    the existing mini.hipatterns spec</span>\n<span class=\"kd\">local</span><span
    class=\"w\"> </span><span class=\"nv\">hipatterns</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"nb\">require</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;mini.hipatterns&quot;</span><span
    class=\"p\">)</span>\n<span class=\"nv\">opts</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nv\">highlighters</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span>\n<span
    class=\"w\">    </span><span class=\"nv\">admonition</span><span class=\"w\">
    </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"nv\">pattern</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;^!?%?+
    +%w+.*&quot;</span><span class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">group</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;Special&quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n<h3>4.
    bullets.vim for prayer-request checklists (one line, high value)</h3>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;bullets-vim/bullets.vim&quot;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"nv\">ft</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;markdown&quot;</span><span class=\"w\"> </span><span class=\"p\">},</span>\n</pre></div>\n\n</pre>\n\n<p><code>&lt;leader&gt;x</code>
    toggles <code>- [ ]</code>/<code>- [x]</code>, <code>&lt;CR&gt;</code>/<code>o</code>
    continue list items,\n<code>&gt;&gt;</code>/<code>&lt;&lt;</code> adjust nesting.
    Docs:\n<a href=\"https://github.com/bullets-vim/bullets.vim\">https://github.com/bullets-vim/bullets.vim</a></p>\n<h3>5.
    Optional, heavier lifts (only if felt needed)</h3>\n<ul>\n<li>\n<p><strong>harper-ls</strong>
    grammar checking, scoped to markdown:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"s2\">&quot;neovim/nvim-lspconfig&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">  </span><span class=\"nv\">opts</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">    </span><span class=\"nv\">servers</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">      </span><span class=\"nv\">harper_ls</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">        </span><span class=\"nv\">filetypes</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"s2\">&quot;markdown&quot;</span><span
    class=\"w\"> </span><span class=\"p\">},</span>\n<span class=\"w\">        </span><span
    class=\"nv\">settings</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"p\">{</span>\n<span class=\"w\">          </span><span
    class=\"p\">[</span><span class=\"s2\">&quot;harper-ls&quot;</span><span class=\"p\">]</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span>\n<span class=\"w\">            </span><span class=\"nv\">linters</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"p\">{</span><span class=\"w\"> </span><span class=\"nv\">sentence_capitalization</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"kc\">false</span><span class=\"p\">,</span><span class=\"w\"> </span><span
    class=\"nv\">long_sentences</span><span class=\"w\"> </span><span class=\"o\">=</span><span
    class=\"w\"> </span><span class=\"kc\">false</span><span class=\"w\"> </span><span
    class=\"p\">},</span>\n<span class=\"w\">          </span><span class=\"p\">},</span>\n<span
    class=\"w\">        </span><span class=\"p\">},</span>\n<span class=\"w\">      </span><span
    class=\"p\">},</span>\n<span class=\"w\">    </span><span class=\"p\">},</span>\n<span
    class=\"w\">  </span><span class=\"p\">},</span>\n<span class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n</li>\n<li>\n<p><strong>obsidian.nvim</strong>
    for <code>[[</code> completion + <code>:Obsidian backlinks</code> \u2014 only
    if\nmarksman's LSP completion of wikilinks proves insufficient. Keep\n<code>ui.enable
    = false</code> and continue using <code>pypeaday.daily</code> + copier for note\ncreation.
    Expect to write a <code>wiki_link_func</code> to emit <code>[[ slug ]]</code>
    and a\n<code>note_frontmatter_func</code> matching markata's frontmatter.</p>\n</li>\n</ul>\n<h2
    id=\"bottom-line\">Bottom line <a class=\"header-anchor\" href=\"#bottom-line\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>The copier+telescope
    daily-notes system is already doing the job of an\nentire plugin category (telekasten/zk/obsidian
    daily notes). The real gaps\nare: marksman wikilink navigation (free, already
    enabled via lang.markdown),\nrendered checkboxes/callouts (render-markdown, in
    the extra), checkbox\ntoggling (bullets.vim), wrapped-line ergonomics (a 6-line
    ftplugin), and\noptional grammar checking (harper-ls). <code>!!!</code> admonitions
    are a markata-side\nconcern \u2014 no editor plugin renders them; at most, highlight
    the marker line.</p>\n\n        </article>\n    </section>\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2026-10-04 06:00:00\ntemplateKey: note\ntitle: Neovim Markdown
    Journaling Research\npublished: False\ntags:\n  - neovim\n  - markdown\n  - note\n---\n\nResearch
    on the current Neovim plugin landscape for writing/journaling in\nMarkdown, oriented
    around this site's workflow: a markata blog with YAML\nfrontmatter, mkdocs-material-style
    `!!! scripture` / `??? scripture`\nadmonitions, `[[ slug ]]` wikilinks, and a
    custom `pypeaday.daily` module\n(copier templates + telescope/fzf pickers + live_grep
    backlinks).\n\n## 1. LazyVim `lang.markdown` extra \u2014 what it actually does\n\nSource
    of truth (current `main`):\n<https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua>\nDocs:
    <https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md>\n\nAs
    of 2026, the extra installs/configures:\n\n- **marksman** via nvim-lspconfig (`servers
    = { marksman = {} }`) \u2014 markdown\n  LSP with `[[wikilink]]` completion, go-to-definition,
    references\n  (backlinks), and dead-link diagnostics. Big deal: most of what\n
    \ `pypeaday.daily.find_backlinks()` does via telescope live_grep, marksman\n  gives
    via `grr`/`vim.lsp.buf.references`.\n- **markdownlint-cli2** via nvim-lint (and
    none-ls if installed), plus\n  conform.nvim formatters `prettier`, `markdownlint-cli2`,
    and `markdown-toc`\n  (the last only runs when the buffer contains `<!-- toc -->`).
    Mason\n  auto-installs `markdownlint-cli2` + `markdown-toc`. LazyVim switched
    from\n  markdownlint-cli to cli2 in 2024:\n  <https://github.com/LazyVim/LazyVim/pull/3843>\n-
    **markdown-preview.nvim** (`iamcco/markdown-preview.nvim`) \u2014 browser\n  preview
    on `<leader>cp` (markdown buffers only).\n- **render-markdown.nvim** (`MeanderingProgrammer/render-markdown.nvim`)
    \u2014\n  in-buffer rendering. LazyVim replaced `headlines.nvim` with this plugin\n
    \ back in 2024:\n  <https://github.com/LazyVim/LazyVim/pull/4139>. LazyVim's config
    disables\n  heading icons and checkbox rendering, and maps a\n  `<leader>um` toggle
    via `Snacks.toggle`.\n\nThere is **no prose/spell/grammar extra** in LazyVim \u2014
    the full extras list\ncontains nothing like a `lang.text` or `extras.spelling`.
    Prose tooling has\nto be added by hand.\n\nThe import already exists in `~/.config/nvim/lua/config/lazy.lua`
    (line 53)\nalongside ~15 other extras \u2014 verified 2026-10-04. If plugins look
    missing,\n`:Lazy sync` will reconcile; `:LazyExtras` shows what's active.\n\nBuilt-in
    LazyVim defaults that matter for prose (no plugin needed):\n\n- FileType autocmd
    already sets `wrap` and `spell` for markdown:\n  `lazyvim/config/autocmds.lua`
    (`wrap_spell` augroup, patterns include\n  `markdown`). So spell+wrap are already
    on.\n- Toggles already mapped: `<leader>us` spell, `<leader>uw` wrap,\n  `<leader>um`
    render-markdown (with the extra), `<leader>uz` Snacks zen\n  mode, `<leader>uD`
    Snacks dim \u2014 see `lazyvim/config/keymaps.lua`.\n\n## 2. render-markdown.nvim
    \u2014 capabilities and the admonition gap\n\nRepo: <https://github.com/MeanderingProgrammer/render-markdown.nvim>\n\n-
    Renders headings, code blocks, inline code, horizontal rules, list\n  bullets,
    **checkboxes (with user-defined states)**, block quotes,\n  **callouts**, tables,
    links, LaTeX, per the README feature list.\n- Callouts: supports GitHub (`[!NOTE]`,
    `[!TIP]`, `[!IMPORTANT]`,\n  `[!WARNING]`, `[!CAUTION]`) and the full Obsidian
    set (`[!QUOTE]`,\n  `[!TODO]`, etc.). Custom callouts are fully supported \u2014
    each entry is\n  `name = { raw = '[!SCRIPTURE]', rendered = ' Scripture', highlight
    = '...' }`.\n  Wiki reference:\n  <https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts>\n-
    Custom callout titles (`> [!quote] Psalm 119`) are supported:\n  <https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109>\n-
    Checkboxes: `- [ ]` / `- [x]` render as icons, and arbitrary custom states\n  (`-
    [/]`, `- [>]`, etc.) are configurable (`checkbox.custom`).\n- **mkdocs `!!!`/`???`
    admonitions are NOT supported.** The plugin is\n  treesitter-driven over the standard
    markdown parser; admonition blocks\n  are just indented text to it. Callout support
    was added for the\n  `> [!x]` blockquote syntax only\n  (<https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20>).\n-
    The main alternative, `OXY2DEV/markview.nvim`, also only renders\n  `> [!x]` callouts
    for markdown \u2014 its \"admonitions\" support is for\n  **Asciidoc**, not mkdocs:\n
    \ <https://github.com/OXY2DEV/markview.nvim/wiki/Markdown>\n- Even `markdown-preview.nvim`
    can't preview mkdocs admonitions \u2014 open\n  feature request: <https://github.com/iamcco/markdown-preview.nvim/issues/618>.\n
    \ The faithful preview for `!!! scripture` is the markata/mkdocs build\n  itself,
    not an editor plugin.\n- Conceal/anti-conceal: `anti_conceal` hides the plugin's
    virtual text on\n  the cursor line so you can edit raw source; `win_options.conceallevel`\n
    \ is managed per rendered/raw view. Known upstream limitation: concealed\n  text
    + `wrap` keeps stale line breaks (neovim issue #14409), documented\n  in <https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md>.\n
    \ Practical tradeoff: rendered mode is great for reading/journaling review;\n
    \ expect to live with `<leader>um` toggling or anti-conceal while editing.\n\n##
    3. obsidian.nvim \u2014 fit for a non-Obsidian vault\n\nRepo (community fork,
    actively maintained; `epwalsh/obsidian.nvim` is the\nlegacy upstream): <https://github.com/obsidian-nvim/obsidian.nvim>\n\n-
    A \"workspace\" is just a directory of markdown \u2014 no `.obsidian/` config\n
    \ required. `workspaces = { { name = \"pype.dev\", path = \"~/projects/personal/pype.dev\"
    } }`\n  is a valid setup.\n- Provides `:Obsidian today [OFFSET]` / `dailies`,
    `new_from_template`,\n  `template` (substitutions, date/time formats), `backlinks`,\n
    \ `follow_link`, `search`, `link`, `links`. See command list in README.\n- Completion
    of `[[` wiki links and `#` tags via blink.cmp or nvim-cmp;\n  newer versions do
    this through an in-process LSP so it works with any\n  completion engine.\n- Caveats:\n
    \ - Search/backlinks require `ripgrep`.\n  - Only activates inside workspace paths;
    the whole pype.dev repo would be\n    one workspace, so `:Obsidian search` scans
    posts+pages together\n    (probably fine).\n  - Default wikilink style is `[[id|alias]]`-ish
    (`wiki_link_id_prefix`);\n    the `[[ slug ]]`-with-spaces convention used by
    markata is configured\n    via `wiki_link_func`. Also `disable_frontmatter`/custom\n
    \   `note_frontmatter_func` matters since it would otherwise write\n    Obsidian-style
    frontmatter (`id`, `aliases`, `tags`) that markata\n    doesn't want.\n  - Its
    built-in checkbox/conceal UI is deprecated in favor of\n    render-markdown.nvim
    \u2014 set `ui.enable = false` and let\n    render-markdown handle visuals.\n-
    Verdict: overlaps ~80% with the existing `pypeaday.daily` module (daily\n  notes,
    templates, backlinks). The genuinely new capability is `[[`\n  completion and
    structured wikilink following \u2014 but **marksman (already\n  in lang.markdown)
    gives wikilink completion, `gd` link following, and\n  `grr` backlinks for free**,
    so obsidian.nvim is optional rather than\n  foundational. If adopted, keep `pypeaday.daily`
    for copier template\n  creation and use obsidian.nvim only for links/completion.\n\n##
    4. Alternatives \u2014 brief survey\n\n- **telekasten.nvim** (<https://github.com/nvim-telekasten/telekasten.nvim>):\n
    \ telescope-based zettelkasten + journal; daily/weekly notes, templates,\n  backlinks,
    calendar. Works, but low recent activity and it duplicates\n  the existing copier+telescope
    workflow. Not recommended here.\n- **zk-nvim** (<https://github.com/zk-org/zk-nvim>):
    Neovim frontend for\n  the `zk` CLI (a real LSP + note DB). Solid and maintained,
    but it wants\n  the `zk` binary and a `zk`-style notebook \u2014 another parallel
    system, not\n  a fit for markata frontmatter/slugs.\n- **neorg** (<https://github.com/nvim-neorg/neorg>):
    still releasing (9.x),\n  but it's its own `.norg` file format \u2014 incompatible
    with a markdown\n  blog. Maintainer activity is low (focus shifted to the `lux`
    Lua package\n  manager): <https://github.com/nvim-neorg/neorg/discussions/1673>.
    Skip.\n- **Preview**: `markdown-preview.nvim` (browser, in the extra, `<leader>cp`)\n
    \ is the maintained option. `glow.nvim` is abandoned \u2014 its own README\n  points
    at render-markdown.nvim:\n  <https://github.com/ellisonleao/glow.nvim/> (fork
    `shcode/nvim-glow`\n  exists but is a terminal renderer, no help for admonitions).
    For this\n  site, `markata`'s own build/serve is the only faithful preview.\n-
    **Focus**: don't install zen-mode/twilight. LazyVim already maps\n  `Snacks.zen()`
    to `<leader>uz` and `Snacks.toggle.dim()` to `<leader>uD`\n  (folke's snacks.nvim
    replaced his standalone plugins:\n  <https://github.com/folke/snacks.nvim/blob/main/docs/zen.md>).\n-
    **Tables**: `tabular` is already installed (`:Tabularize /|`), and\n  prettier
    (via conform `<leader>cf`) aligns markdown tables automatically.\n  If auto-growing
    tables are wanted, `Kicamon/markdown-table-mode.nvim` or\n  `dhruvasagar/vim-table-mode`
    are the options \u2014 probably unnecessary.\n- **List/checkbox ergonomics**:
    `bullets.vim`\n  (<https://github.com/bullets-vim/bullets.vim>) auto-continues
    lists on\n  `<CR>`/`o`, renumbers with `gN`, indents with `>>`/`<<`, and toggles\n
    \ checkboxes with `<leader>x` \u2014 including partial-completion parent\n  checkboxes.
    Perfect fit for prayer-request checklists.\n- **Link editing nicety**: `antonk52/markdowny.nvim`
    adds vim-style\n  surround ops for `[text](url)` links. Optional quality-of-life.\n\n##
    5. Spell / wrap / prose ergonomics\n\n- Already handled by LazyVim core: `spell`
    + `wrap` FileType autocmd for\n  markdown; `<leader>us` / `<leader>uw` toggles;
    `spelllang = \"en\"`.\n- Worth adding in an ftplugin/autocmd: `linebreak` (wrap
    at words, not\n  mid-word), `breakindent` (wrapped lines keep list indent), `wrapmargin`/\n
    \ `colorcolumn` hygiene, and `conceallevel=2` + `concealcursor=nc` if you\n  want
    rendered-markdown to look clean while keeping cursor-line raw.\n  Note `smoothscroll`
    is globally disabled in this config\n  (`vim.opt.smoothscroll = false`) \u2014
    re-enable it locally for markdown if\n  long wrapped paragraphs feel jumpy.\n-
    Prose LSPs:\n  - **harper-ls** (<https://github.com/Automattic/harper>,\n    <https://writewithharper.com>):
    Rust grammar/spelling LSP aimed at\n    developers; markdown-aware, fast, no Java.
    Installable via mason\n    (`harper_ls` in lspconfig), every linter toggleable\n
    \   (`linters.sentence_capitalization`, `long_sentences`, etc.). Best\n    current
    default for prose grammar. Caution: it flags in every buffer\n    it attaches
    to \u2014 scope it to `markdown` filetype only.\n  - **ltex-ls is dead** \u2014
    `valentjn/ltex-ls` is archived\n    (<https://github.com/valentjn/ltex-ls>). Maintained
    fork:\n    **ltex-plus/ltex-ls-plus** (<https://github.com/ltex-plus/ltex-ls-plus>),\n
    \   still LanguageTool-based (heavy JVM, but deeper grammar rules).\n  - **vale**
    (<https://vale.sh>): CLI style-guide linter; usable through\n    nvim-lint's `vale`
    linter. Best if you want house-style rules\n    (write-good/proselint packs),
    more setup than value for journaling.\n- Soft punctuation niceties: `pensieve`/`cmp-dictionary`
    are mostly dead\n  ends; the spell dictionary via `zg` + blink `buffer`/`spell`
    source\n  covers the practical case.\n\n## Recommended additions for this setup\n\nOrdered
    by value \xF7 effort.\n\n### 1. lang.markdown extra is already enabled (zero new
    code)\n\n`~/.config/nvim/lua/config/lazy.lua` line 53 already imports it. Verify\nmarksman
    attaches with `:LspInfo` in a note buffer. Then:\n\n- `gd` on `[[ 2025-09-13-notes
    ]]` jumps to the note\n- `grr` (LSP references) is a richer backlinks view than
    the live_grep\n  pattern in `find_daily_files`/`find_backlinks` \u2014 keep the
    telescope one,\n  it searches the spaced `[[ slug ]]` convention regardless of
    whether\n  marksman resolves it.\n- Caveat: marksman treats the git root (`pype.dev`)
    as the workspace, which\n  is what we want. Verify it resolves the spaced `[[
    slug ]]` form; if not,\n  completion still works for `[[slug]]` and markata tolerates
    both.\n\n### 2. Markdown writing-mode ftplugin (tiny, high value)\n\n`~/.config/nvim/after/ftplugin/markdown.lua`
    (LazyVim loads `after/ftplugin`\nautomatically \u2014 no spec needed):\n\n```lua\nvim.opt_local.linebreak
    = true      -- wrap at word boundaries\nvim.opt_local.breakindent = true    --
    keep list indentation on wrapped lines\nvim.opt_local.smoothscroll = true   --
    undo the global `false` for prose\nvim.opt_local.conceallevel = 2      -- conceal
    markup for rendered view\nvim.opt_local.concealcursor = \"nc\"  -- show raw text
    on the cursor line in insert\nvim.opt_local.spell = true          -- redundant
    w/ LazyVim autocmd, explicit is fine\n-- map j/k to gj/gk for wrapped-line navigation
    (markdown buffers only)\nvim.keymap.set({ \"n\", \"x\" }, \"j\", \"gj\", { buffer
    = true, remap = false })\nvim.keymap.set({ \"n\", \"x\" }, \"k\", \"gk\", { buffer
    = true, remap = false })\n```\n\n### 3. render-markdown tweaks + a `scripture`
    callout + checkbox states\n\n```lua\n-- lua/plugins/markdown.lua\nreturn {\n  {\n
    \   \"MeanderingProgrammer/render-markdown.nvim\",\n    opts = {\n      -- re-enable
    what LazyVim's extra disables\n      checkbox = {\n        enabled = true,\n        unchecked
    = { icon = \"\U000F0131 \" },\n        checked = { icon = \"\U000F0C52 \" },\n
    \       custom = {\n          praying = { raw = \"[/]\", rendered = \"\U000F1442
    \", highlight = \"RenderMarkdownWarn\" },\n        },\n      },\n      callout
    = {\n        -- !!! scripture has no renderer; if you ever write\n        -- >
    [!scripture] in blog posts this makes it pretty.\n        scripture = {\n          raw
    = \"[!SCRIPTURE]\",\n          rendered = \"\U000F05F6 Scripture\",\n          highlight
    = \"RenderMarkdownHint\",\n        },\n      },\n      anti_conceal = { enabled
    = true }, -- cursor line shows raw markdown\n    },\n  },\n}\n```\n\nReality check:
    **nothing renders `!!! scripture` blocks in the editor** \u2014\nthey'll show
    as plain indented text (which is honest: markata is the only\nreal renderer).
    If visual distinction matters, `util.mini-hipatterns` is\nalready enabled \u2014
    add a pattern:\n\n```lua\n-- inside the existing mini.hipatterns spec\nlocal hipatterns
    = require(\"mini.hipatterns\")\nopts = {\n  highlighters = {\n    admonition =
    { pattern = \"^!?%?+ +%w+.*\", group = \"Special\" },\n  },\n}\n```\n\n### 4.
    bullets.vim for prayer-request checklists (one line, high value)\n\n```lua\n{
    \"bullets-vim/bullets.vim\", ft = \"markdown\" },\n```\n\n`<leader>x` toggles
    `- [ ]`/`- [x]`, `<CR>`/`o` continue list items,\n`>>`/`<<` adjust nesting. Docs:\n<https://github.com/bullets-vim/bullets.vim>\n\n###
    5. Optional, heavier lifts (only if felt needed)\n\n- **harper-ls** grammar checking,
    scoped to markdown:\n\n  ```lua\n  {\n    \"neovim/nvim-lspconfig\",\n    opts
    = {\n      servers = {\n        harper_ls = {\n          filetypes = { \"markdown\"
    },\n          settings = {\n            [\"harper-ls\"] = {\n              linters
    = { sentence_capitalization = false, long_sentences = false },\n            },\n
    \         },\n        },\n      },\n    },\n  }\n  ```\n\n- **obsidian.nvim**
    for `[[` completion + `:Obsidian backlinks` \u2014 only if\n  marksman's LSP completion
    of wikilinks proves insufficient. Keep\n  `ui.enable = false` and continue using
    `pypeaday.daily` + copier for note\n  creation. Expect to write a `wiki_link_func`
    to emit `[[ slug ]]` and a\n  `note_frontmatter_func` matching markata's frontmatter.\n\n##
    Bottom line\n\nThe copier+telescope daily-notes system is already doing the job
    of an\nentire plugin category (telekasten/zk/obsidian daily notes). The real gaps\nare:
    marksman wikilink navigation (free, already enabled via lang.markdown),\nrendered
    checkboxes/callouts (render-markdown, in the extra), checkbox\ntoggling (bullets.vim),
    wrapped-line ergonomics (a 6-line ftplugin), and\noptional grammar checking (harper-ls).
    `!!!` admonitions are a markata-side\nconcern \u2014 no editor plugin renders
    them; at most, highlight the marker line.\n"
published: false
slug: neovim-markdown-journaling-research
title: Neovim Markdown Journaling Research


---

Research on the current Neovim plugin landscape for writing/journaling in
Markdown, oriented around this site's workflow: a markata blog with YAML
frontmatter, mkdocs-material-style `!!! scripture` / `??? scripture`
admonitions, `[[ slug ]]` wikilinks, and a custom `pypeaday.daily` module
(copier templates + telescope/fzf pickers + live_grep backlinks).

## 1. LazyVim `lang.markdown` extra — what it actually does

Source of truth (current `main`):
<https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/plugins/extras/lang/markdown.lua>
Docs: <https://github.com/LazyVim/lazyvim.github.io/blob/main/docs/extras/lang/markdown.md>

As of 2026, the extra installs/configures:

- **marksman** via nvim-lspconfig (`servers = { marksman = {} }`) — markdown
  LSP with `[[wikilink]]` completion, go-to-definition, references
  (backlinks), and dead-link diagnostics. Big deal: most of what
  `pypeaday.daily.find_backlinks()` does via telescope live_grep, marksman
  gives via `grr`/`vim.lsp.buf.references`.
- **markdownlint-cli2** via nvim-lint (and none-ls if installed), plus
  conform.nvim formatters `prettier`, `markdownlint-cli2`, and `markdown-toc`
  (the last only runs when the buffer contains `<!-- toc -->`). Mason
  auto-installs `markdownlint-cli2` + `markdown-toc`. LazyVim switched from
  markdownlint-cli to cli2 in 2024:
  <https://github.com/LazyVim/LazyVim/pull/3843>
- **markdown-preview.nvim** (`iamcco/markdown-preview.nvim`) — browser
  preview on `<leader>cp` (markdown buffers only).
- **render-markdown.nvim** (`MeanderingProgrammer/render-markdown.nvim`) —
  in-buffer rendering. LazyVim replaced `headlines.nvim` with this plugin
  back in 2024:
  <https://github.com/LazyVim/LazyVim/pull/4139>. LazyVim's config disables
  heading icons and checkbox rendering, and maps a
  `<leader>um` toggle via `Snacks.toggle`.

There is **no prose/spell/grammar extra** in LazyVim — the full extras list
contains nothing like a `lang.text` or `extras.spelling`. Prose tooling has
to be added by hand.

The import already exists in `~/.config/nvim/lua/config/lazy.lua` (line 53)
alongside ~15 other extras — verified 2026-10-04. If plugins look missing,
`:Lazy sync` will reconcile; `:LazyExtras` shows what's active.

Built-in LazyVim defaults that matter for prose (no plugin needed):

- FileType autocmd already sets `wrap` and `spell` for markdown:
  `lazyvim/config/autocmds.lua` (`wrap_spell` augroup, patterns include
  `markdown`). So spell+wrap are already on.
- Toggles already mapped: `<leader>us` spell, `<leader>uw` wrap,
  `<leader>um` render-markdown (with the extra), `<leader>uz` Snacks zen
  mode, `<leader>uD` Snacks dim — see `lazyvim/config/keymaps.lua`.

## 2. render-markdown.nvim — capabilities and the admonition gap

Repo: <https://github.com/MeanderingProgrammer/render-markdown.nvim>

- Renders headings, code blocks, inline code, horizontal rules, list
  bullets, **checkboxes (with user-defined states)**, block quotes,
  **callouts**, tables, links, LaTeX, per the README feature list.
- Callouts: supports GitHub (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`,
  `[!WARNING]`, `[!CAUTION]`) and the full Obsidian set (`[!QUOTE]`,
  `[!TODO]`, etc.). Custom callouts are fully supported — each entry is
  `name = { raw = '[!SCRIPTURE]', rendered = ' Scripture', highlight = '...' }`.
  Wiki reference:
  <https://github.com/MeanderingProgrammer/render-markdown.nvim/wiki/Callouts>
- Custom callout titles (`> [!quote] Psalm 119`) are supported:
  <https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/109>
- Checkboxes: `- [ ]` / `- [x]` render as icons, and arbitrary custom states
  (`- [/]`, `- [>]`, etc.) are configurable (`checkbox.custom`).
- **mkdocs `!!!`/`???` admonitions are NOT supported.** The plugin is
  treesitter-driven over the standard markdown parser; admonition blocks
  are just indented text to it. Callout support was added for the
  `> [!x]` blockquote syntax only
  (<https://github.com/MeanderingProgrammer/render-markdown.nvim/issues/20>).
- The main alternative, `OXY2DEV/markview.nvim`, also only renders
  `> [!x]` callouts for markdown — its "admonitions" support is for
  **Asciidoc**, not mkdocs:
  <https://github.com/OXY2DEV/markview.nvim/wiki/Markdown>
- Even `markdown-preview.nvim` can't preview mkdocs admonitions — open
  feature request: <https://github.com/iamcco/markdown-preview.nvim/issues/618>.
  The faithful preview for `!!! scripture` is the markata/mkdocs build
  itself, not an editor plugin.
- Conceal/anti-conceal: `anti_conceal` hides the plugin's virtual text on
  the cursor line so you can edit raw source; `win_options.conceallevel`
  is managed per rendered/raw view. Known upstream limitation: concealed
  text + `wrap` keeps stale line breaks (neovim issue #14409), documented
  in <https://github.com/MeanderingProgrammer/render-markdown.nvim/blob/HEAD/doc/limitations.md>.
  Practical tradeoff: rendered mode is great for reading/journaling review;
  expect to live with `<leader>um` toggling or anti-conceal while editing.

## 3. obsidian.nvim — fit for a non-Obsidian vault

Repo (community fork, actively maintained; `epwalsh/obsidian.nvim` is the
legacy upstream): <https://github.com/obsidian-nvim/obsidian.nvim>

- A "workspace" is just a directory of markdown — no `.obsidian/` config
  required. `workspaces = { { name = "pype.dev", path = "~/projects/personal/pype.dev" } }`
  is a valid setup.
- Provides `:Obsidian today [OFFSET]` / `dailies`, `new_from_template`,
  `template` (substitutions, date/time formats), `backlinks`,
  `follow_link`, `search`, `link`, `links`. See command list in README.
- Completion of `[[` wiki links and `#` tags via blink.cmp or nvim-cmp;
  newer versions do this through an in-process LSP so it works with any
  completion engine.
- Caveats:
  - Search/backlinks require `ripgrep`.
  - Only activates inside workspace paths; the whole pype.dev repo would be
    one workspace, so `:Obsidian search` scans posts+pages together
    (probably fine).
  - Default wikilink style is `[[id|alias]]`-ish (`wiki_link_id_prefix`);
    the `[[ slug ]]`-with-spaces convention used by markata is configured
    via `wiki_link_func`. Also `disable_frontmatter`/custom
    `note_frontmatter_func` matters since it would otherwise write
    Obsidian-style frontmatter (`id`, `aliases`, `tags`) that markata
    doesn't want.
  - Its built-in checkbox/conceal UI is deprecated in favor of
    render-markdown.nvim — set `ui.enable = false` and let
    render-markdown handle visuals.
- Verdict: overlaps ~80% with the existing `pypeaday.daily` module (daily
  notes, templates, backlinks). The genuinely new capability is `[[`
  completion and structured wikilink following — but **marksman (already
  in lang.markdown) gives wikilink completion, `gd` link following, and
  `grr` backlinks for free**, so obsidian.nvim is optional rather than
  foundational. If adopted, keep `pypeaday.daily` for copier template
  creation and use obsidian.nvim only for links/completion.

## 4. Alternatives — brief survey

- **telekasten.nvim** (<https://github.com/nvim-telekasten/telekasten.nvim>):
  telescope-based zettelkasten + journal; daily/weekly notes, templates,
  backlinks, calendar. Works, but low recent activity and it duplicates
  the existing copier+telescope workflow. Not recommended here.
- **zk-nvim** (<https://github.com/zk-org/zk-nvim>): Neovim frontend for
  the `zk` CLI (a real LSP + note DB). Solid and maintained, but it wants
  the `zk` binary and a `zk`-style notebook — another parallel system, not
  a fit for markata frontmatter/slugs.
- **neorg** (<https://github.com/nvim-neorg/neorg>): still releasing (9.x),
  but it's its own `.norg` file format — incompatible with a markdown
  blog. Maintainer activity is low (focus shifted to the `lux` Lua package
  manager): <https://github.com/nvim-neorg/neorg/discussions/1673>. Skip.
- **Preview**: `markdown-preview.nvim` (browser, in the extra, `<leader>cp`)
  is the maintained option. `glow.nvim` is abandoned — its own README
  points at render-markdown.nvim:
  <https://github.com/ellisonleao/glow.nvim/> (fork `shcode/nvim-glow`
  exists but is a terminal renderer, no help for admonitions). For this
  site, `markata`'s own build/serve is the only faithful preview.
- **Focus**: don't install zen-mode/twilight. LazyVim already maps
  `Snacks.zen()` to `<leader>uz` and `Snacks.toggle.dim()` to `<leader>uD`
  (folke's snacks.nvim replaced his standalone plugins:
  <https://github.com/folke/snacks.nvim/blob/main/docs/zen.md>).
- **Tables**: `tabular` is already installed (`:Tabularize /|`), and
  prettier (via conform `<leader>cf`) aligns markdown tables automatically.
  If auto-growing tables are wanted, `Kicamon/markdown-table-mode.nvim` or
  `dhruvasagar/vim-table-mode` are the options — probably unnecessary.
- **List/checkbox ergonomics**: `bullets.vim`
  (<https://github.com/bullets-vim/bullets.vim>) auto-continues lists on
  `<CR>`/`o`, renumbers with `gN`, indents with `>>`/`<<`, and toggles
  checkboxes with `<leader>x` — including partial-completion parent
  checkboxes. Perfect fit for prayer-request checklists.
- **Link editing nicety**: `antonk52/markdowny.nvim` adds vim-style
  surround ops for `[text](url)` links. Optional quality-of-life.

## 5. Spell / wrap / prose ergonomics

- Already handled by LazyVim core: `spell` + `wrap` FileType autocmd for
  markdown; `<leader>us` / `<leader>uw` toggles; `spelllang = "en"`.
- Worth adding in an ftplugin/autocmd: `linebreak` (wrap at words, not
  mid-word), `breakindent` (wrapped lines keep list indent), `wrapmargin`/
  `colorcolumn` hygiene, and `conceallevel=2` + `concealcursor=nc` if you
  want rendered-markdown to look clean while keeping cursor-line raw.
  Note `smoothscroll` is globally disabled in this config
  (`vim.opt.smoothscroll = false`) — re-enable it locally for markdown if
  long wrapped paragraphs feel jumpy.
- Prose LSPs:
  - **harper-ls** (<https://github.com/Automattic/harper>,
    <https://writewithharper.com>): Rust grammar/spelling LSP aimed at
    developers; markdown-aware, fast, no Java. Installable via mason
    (`harper_ls` in lspconfig), every linter toggleable
    (`linters.sentence_capitalization`, `long_sentences`, etc.). Best
    current default for prose grammar. Caution: it flags in every buffer
    it attaches to — scope it to `markdown` filetype only.
  - **ltex-ls is dead** — `valentjn/ltex-ls` is archived
    (<https://github.com/valentjn/ltex-ls>). Maintained fork:
    **ltex-plus/ltex-ls-plus** (<https://github.com/ltex-plus/ltex-ls-plus>),
    still LanguageTool-based (heavy JVM, but deeper grammar rules).
  - **vale** (<https://vale.sh>): CLI style-guide linter; usable through
    nvim-lint's `vale` linter. Best if you want house-style rules
    (write-good/proselint packs), more setup than value for journaling.
- Soft punctuation niceties: `pensieve`/`cmp-dictionary` are mostly dead
  ends; the spell dictionary via `zg` + blink `buffer`/`spell` source
  covers the practical case.

## Recommended additions for this setup

Ordered by value ÷ effort.

### 1. lang.markdown extra is already enabled (zero new code)

`~/.config/nvim/lua/config/lazy.lua` line 53 already imports it. Verify
marksman attaches with `:LspInfo` in a note buffer. Then:

- `gd` on `[[ 2025-09-13-notes ]]` jumps to the note
- `grr` (LSP references) is a richer backlinks view than the live_grep
  pattern in `find_daily_files`/`find_backlinks` — keep the telescope one,
  it searches the spaced `[[ slug ]]` convention regardless of whether
  marksman resolves it.
- Caveat: marksman treats the git root (`pype.dev`) as the workspace, which
  is what we want. Verify it resolves the spaced `[[ slug ]]` form; if not,
  completion still works for `[[slug]]` and markata tolerates both.

### 2. Markdown writing-mode ftplugin (tiny, high value)

`~/.config/nvim/after/ftplugin/markdown.lua` (LazyVim loads `after/ftplugin`
automatically — no spec needed):

```lua
vim.opt_local.linebreak = true      -- wrap at word boundaries
vim.opt_local.breakindent = true    -- keep list indentation on wrapped lines
vim.opt_local.smoothscroll = true   -- undo the global `false` for prose
vim.opt_local.conceallevel = 2      -- conceal markup for rendered view
vim.opt_local.concealcursor = "nc"  -- show raw text on the cursor line in insert
vim.opt_local.spell = true          -- redundant w/ LazyVim autocmd, explicit is fine
-- map j/k to gj/gk for wrapped-line navigation (markdown buffers only)
vim.keymap.set({ "n", "x" }, "j", "gj", { buffer = true, remap = false })
vim.keymap.set({ "n", "x" }, "k", "gk", { buffer = true, remap = false })
```

### 3. render-markdown tweaks + a `scripture` callout + checkbox states

```lua
-- lua/plugins/markdown.lua
return {
  {
    "MeanderingProgrammer/render-markdown.nvim",
    opts = {
      -- re-enable what LazyVim's extra disables
      checkbox = {
        enabled = true,
        unchecked = { icon = "󰄱 " },
        checked = { icon = "󰱒 " },
        custom = {
          praying = { raw = "[/]", rendered = "󱑂 ", highlight = "RenderMarkdownWarn" },
        },
      },
      callout = {
        -- !!! scripture has no renderer; if you ever write
        -- > [!scripture] in blog posts this makes it pretty.
        scripture = {
          raw = "[!SCRIPTURE]",
          rendered = "󰗶 Scripture",
          highlight = "RenderMarkdownHint",
        },
      },
      anti_conceal = { enabled = true }, -- cursor line shows raw markdown
    },
  },
}
```

Reality check: **nothing renders `!!! scripture` blocks in the editor** —
they'll show as plain indented text (which is honest: markata is the only
real renderer). If visual distinction matters, `util.mini-hipatterns` is
already enabled — add a pattern:

```lua
-- inside the existing mini.hipatterns spec
local hipatterns = require("mini.hipatterns")
opts = {
  highlighters = {
    admonition = { pattern = "^!?%?+ +%w+.*", group = "Special" },
  },
}
```

### 4. bullets.vim for prayer-request checklists (one line, high value)

```lua
{ "bullets-vim/bullets.vim", ft = "markdown" },
```

`<leader>x` toggles `- [ ]`/`- [x]`, `<CR>`/`o` continue list items,
`>>`/`<<` adjust nesting. Docs:
<https://github.com/bullets-vim/bullets.vim>

### 5. Optional, heavier lifts (only if felt needed)

- **harper-ls** grammar checking, scoped to markdown:

  ```lua
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        harper_ls = {
          filetypes = { "markdown" },
          settings = {
            ["harper-ls"] = {
              linters = { sentence_capitalization = false, long_sentences = false },
            },
          },
        },
      },
    },
  }
  ```

- **obsidian.nvim** for `[[` completion + `:Obsidian backlinks` — only if
  marksman's LSP completion of wikilinks proves insufficient. Keep
  `ui.enable = false` and continue using `pypeaday.daily` + copier for note
  creation. Expect to write a `wiki_link_func` to emit `[[ slug ]]` and a
  `note_frontmatter_func` matching markata's frontmatter.

## Bottom line

The copier+telescope daily-notes system is already doing the job of an
entire plugin category (telekasten/zk/obsidian daily notes). The real gaps
are: marksman wikilink navigation (free, already enabled via lang.markdown),
rendered checkboxes/callouts (render-markdown, in the extra), checkbox
toggling (bullets.vim), wrapped-line ergonomics (a 6-line ftplugin), and
optional grammar checking (harper-ls). `!!!` admonitions are a markata-side
concern — no editor plugin renders them; at most, highlight the marker line.