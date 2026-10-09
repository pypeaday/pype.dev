---
date: 2026-10-04 06:00:00
templateKey: note
title: Neovim Markdown Journaling Research
published: False
tags:
  - neovim
  - markdown
  - note
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
