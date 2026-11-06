---
date: 2026-10-06 19:30:00
templateKey: note
title: markata-go Migration Research
published: False
tags:
  - markata
  - markata-go
  - note
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011084011_40254394.png"
---

Research on [markata-go](https://github.com/WaylonWalker/markata-go), the Go rewrite of the Python [markata](https://markata.dev) static site generator, to support migrating pype.dev. All sources are primary: the GitHub repo (README, `docs/`, `spec/`, releases, issues, commit history), pkg.go.dev, and Waylon's own sites (waylonwalker.com now runs on markata-go; `go.waylonwalker.com` is the deployment).

Repo state as of research date: **v0.13.0, "Beta (0.x) - API may change between minor versions"**, created 2026-01-22, 2 stars, 51 open issues, essentially solo-maintained by WaylonWalker (853 contributions) + dependabot. [Source](https://github.com/WaylonWalker/markata-go), [pkg.go.dev](https://pkg.go.dev/github.com/WaylonWalker/markata-go)

**Important caveat:** the project is "open source but **not open contribution**" — PRs are not reviewed or merged; bugs/feature requests go through issues only. [CONTRIBUTING.md](https://github.com/WaylonWalker/markata-go/blob/main/CONTRIBUTING.md)

## 1. Installation + CLI

### Install options
[docs/installation.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/installation.md), [README](https://github.com/WaylonWalker/markata-go)

```bash
# One-liner (Linux/macOS)
curl -sSL https://raw.githubusercontent.com/WaylonWalker/markata-go/main/install.sh | bash
# (also published at https://waylonwalker.github.io/markata-go/install.sh)

# jpillora installer
curl -sL https://i.jpillora.com/WaylonWalker/markata-go | bash

# eget
eget WaylonWalker/markata-go

# mise (from GitHub releases)
mise use -g github:WaylonWalker/markata-go

# Go install (Go 1.22+; v0.13.0 toolchain reports Go 1.26)
go install github.com/WaylonWalker/markata-go/cmd/markata-go@latest
# or pinned: ...@v0.13.0
```

Distributed as a single dependency-free binary. `markata-go update` is a built-in self-update command. [v0.5.0 release notes](https://github.com/WaylonWalker/markata-go/releases/tag/v0.5.0)

### CLI commands
[docs/reference/cli.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/cli.md)

Global flags: `-c/--config`, `-m/--merge-config` (repeatable), `-o/--output`, `-q/--quiet`, `-v/--verbose`, `--color/--no-color`, `--log-format`, `--no-input`.

| Command | What it does |
|---|---|
| `build` | Full build. Flags: `--clean`, `--dry-run`, `--fast` (skip minify/CSS purge/Tailwind/Pagefind), `--benchmark-json`, `--benchmark-detailed` |
| `serve` | Dev server + live reload. `-p/--port`, `-H/--host`, `--no-reload`, `--no-watch`, `--open`, `--fast` |
| `new [title]` | Create post. `--dir`, `--draft`, `--tags`; interactive mode via charmbracelet/huh. Built-in content templates: post, page, docs, article, note, photo, video, link, quote, guide, inline, contact, author |
| `init` | Scaffold a new site |
| `config show/get/set/validate/init` | Resolved config in YAML/JSON/TOML; dot-notation get (`feeds.defaults.items_per_page`); `set` preserves formatting |
| `migrate` | **Python-markata migration tool** (see §2) |
| `tui` | k9s-style interactive TUI: posts/tags/feeds views, `/` filter expressions |
| `lsp` / `lsp setup --editor helix` | Language server: wikilink completion, frontmatter completion/hover, diagnostics |
| `list` | List posts/tags/feeds (`--format table|json|csv|path`, `--filter`, `--feed`) |
| `search` | Content search: `--filter`, `--fields`, `--fuzzy`, `--limit` |
| `lint` | Frontmatter/content checks with fixers (incl. natural-language datetime fixing) |
| `explain <topic>` | Built-in docs, e.g. `markata-go explain feeds` |
| `benchmark` | Build benchmarks + pprof |
| `import` | Import external content (PESOS pattern) |
| `encryption` | `check`, `generate-password`, `encrypt-posts` subcommands |
| `aesthetic` | Theme/aesthetic tooling |
| `agent` | Install/doctor bundled agent-skill integrations (`agent doctor` drift-checks installed skill) |
| `blogroll` | Blogroll commands incl. `blogroll update` |
| `version` | `--short` supported |

## 2. Config format

### File discovery
markata-go does **not** auto-read `markata.toml`. It looks for (first found wins): `./markata-go.toml`, `./markata-go.yaml`, `./markata-go.yml`, `./markata-go.json`, `.markata-go.*`, `~/.config/markata-go/config.toml`, or `--config`/`--merge-config`. [configuration.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/configuration.md), [cli.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/cli.md)

All config is namespaced under `[markata-go]` (also accepts YAML/JSON). Env overrides use `MARKATA_GO_` prefix (e.g. `MARKATA_GO_OUTPUT_DIR=dist`). Config `include = [...]` supports splitting config across files; `[[markata-go.feeds]]` merges by `slug`. [configuration.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/configuration.md)

### Core schema (`[markata-go]`)
`output_dir` (default `"output"`), `url`, `title`, `description`, `author`, `license`, `assets_dir` (default `"static"`), `templates_dir` (default `"templates"`), `hooks` (default `["default"]`), `disabled_hooks`, `concurrency` (0=auto). PWA-ish fields also present in the schema: `icon`, `lang`, `theme_color`, `background_color`, `start_url`, `display`, `short_name`, `site_name`, `repo_url`, `repo_branch`, `twitter_card`, `twitter_handle`/`twitter_site`, `rss_description`, `site_version`. [configuration.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/configuration.md) + this repo's own `markata-go.toml` which already carries them.

Other sections seen in docs: `[markata-go.glob]` (`patterns` default `["pages/**/*.md","posts/**/*.md"]`, `use_gitignore`, `slug_mode`, `slug_rules`), `[markata-go.markdown]` + `[markata-go.markdown.highlight]`, `[markata-go.wikilinks]` (`warn_broken`, `strict_wikilinks` under `[markata-go]`), `[markata-go.theme]`, `[markata-go.feed_defaults]`, `[[markata-go.feeds]]`, `[[markata-go.nav]]` (`label`, `url`, `external`), `[markata-go.components.nav]`, `[markata-go.sidebar]`/`[[markata-go.sidebar.nav]]`, `[markata-go.encryption]`, `[embeds]`, `[markata-go.head]` + `[[markata-go.head.alternate_feeds]]`, `[markata-go.blogroll]`, `[content_templates]`. [configuration.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/configuration.md)

### Migration tooling — `markata-go migrate`
[cli.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/cli.md)

```bash
markata-go migrate                          # full analysis
markata-go migrate --dry-run
markata-go migrate config -i markata.toml -o markata-go.toml   # also accepts pyproject.toml
markata-go migrate filter "templateKey in ['blog', 'til']"     # check a filter expression
markata-go migrate templates [path]                           # check pongo2 compat
```

Exit codes: 0 clean, 1 warnings, 2 incompatibilities, 3 error. There is a `docs/guides/migration.md` in the repo.

**Known bug:** the migrate tool has emitted invalid TOML (nested `[markata-go.description.description]` tables from a `[markata.auto_description.description]`-style Python config) — [WaylonWalker/waylonwalker.com issue #20](https://github.com/WaylonWalker/waylonwalker.com/issues/20), supposedly fixed by `fix(migrate): generate valid TOML for string fields (#208)` in [v0.5.0](https://github.com/WaylonWalker/markata-go/releases/tag/v0.5.0). Always run `markata-go config validate` after migrating.

This repo's `markata-go.toml` already exists and appears to be migrate-tool output — feed filter strings carried over verbatim, `page_size` preserved.

## 3. Markdown features

Engine: **goldmark** (deps include `yuin/goldmark`, `goldmark-highlighting`, `goldmark-emoji`, `goldmark-figure`, `goldmark-anchor`, CJK ext, `abhg.dev/goldmark/*`). [pkg.go.dev deps](https://pkg.go.dev/github.com/WaylonWalker/markata-go), [v0.10.0 changelog](https://github.com/WaylonWalker/markata-go/compare/v0.9.0...v0.10.0)

Config: `[markata-go.markdown] extensions = ["tables","strikethrough","autolinks","tasklist"]`; spec also lists `typographer` (smart quotes, **default true**), `definition_list`, `footnote`. [configuration.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/configuration.md), [spec/CONTENT.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/CONTENT.md)

- **Admonitions `!!!`:** supported via a goldmark extension in the render stage. **Verified against source: types are a hardcoded whitelist** — `note, info, tip, hint, success, warning, caution, important, danger, error, bug, example, quote, abstract, aside, seealso, reminder, attention, todo, settings, vsplit, chat, chat-reply` (`admonitionTypes` map in `pkg/plugins/admonitions.go`). Unknown types are NOT parsed — they render as literal paragraphs. `!!! scripture` / `!!! background-thought` do **not** work. Confirmed live: `???+ success` in this repo rendered `<details class="admonition success" open>` while `!!! scripture` rendered literal text. No config option for custom types exists. [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md), [markdown.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/markdown.md), `pkg/plugins/admonitions.go:17`
- **Collapsible `???` / `???+`:** supported (`???` collapsed, `???+` open), renders native `<details>/<summary>`. [markdown.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/markdown.md)
- **Wikilinks:** `[[slug]]`, `[[slug|text]]`, `[[slug#fragment]]`, `[[slug#frag|text]]`; case-insensitive slug lookup, then `aliases` frontmatter (synonyms: `alias`, `handle`, `handles`); unresolved → rendered literal + `wikilink_warnings` in `post.Extra`; `strict_wikilinks = true` fails the build. **`[[ slug ]]` WITH SPACES WORKS** — `wikilinks.go:151` does `strings.TrimSpace(groups[1])`, verified against this repo's build output (spaced daily-note links resolve with full hover-preview data attributes). [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md), `pkg/plugins/wikilinks.go:151`
- **Attrs `{#id .class}`:** supported — spec shows `![alt](img.png){.shadow .bordered}`, `*em*{.accent}`, `` `code`{.inline-code} ``, `[[link]]{.wikilink-pill}`, `{#hero-image}`. [spec/CONTENT.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/CONTENT.md)
- **Code highlighting:** goldmark-highlighting (chroma); `[markata-go.markdown.highlight] theme = "dracula"`, `line_numbers`. [markdown.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/markdown.md)
- **Tables:** via `tables` extension. Typographer/smart quotes: `typographer = true` default in spec. [configuration.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/configuration.md), [spec/CONTENT.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/CONTENT.md)
- **Heading anchors/permalinks:** `heading_anchors` plugin + `goldmark-anchor`; TOC plugin (`toc`, `post.Extra.toc_html`). [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md)
- **Markdown containers:** generic `::: name` fenced divs with `{#id .class data-attr}` — a possible escape hatch for admonition-like custom blocks (no title/collapse semantics). [markdown-containers.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/markdown-containers.md)
- **Extras present:** mermaid (incl. lightbox/pan-zoom, CLI/Chromium pre-render), chartjs fenced blocks, `contribution-graph` fenced block, csv_fence, glossary, webawesome components, Obsidian-style `![[attachment]]` embeds, oEmbed external link cards. [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md), [v0.7.0](https://github.com/WaylonWalker/markata-go/releases/tag/v0.7.0)

## 4. Frontmatter

[frontmatter.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/frontmatter.md), [plugins.md load section](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md), [spec/DATA_MODEL.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/DATA_MODEL.md)

Built-in fields: `title`, `slug`, `date` (+ `modified`, and date aliases for cross-SSG compat), `published` (default **false**), `draft` (never rendered), `skip`, `tags`, `description` (auto-generated if absent), `template` (default `post.html`; also object form `{default:, card:, feed:}`), `aliases`, `authors`/`author`/`writer`, `image`/`video`/`cover_image`/`thumbnail`/`og_image`/`hero_video`, `private`, `jinja` (bool gate for jinja_md), `config_overrides`, `css_class`. Unknown fields land in `Extra` and are filterable (`Extra.series == 'X'`).

- **`published` semantics match Python markata:** `false` = rendered but excluded from feeds/sitemap/RSS ("shadow page"); `true` = included. `draft: true` = not rendered at all.
- **`templateKey`:** still a real field — filters like `templateKey in ['blog-post']` are used in migrate docs, and `encryption.private_tags` matches against templateKey as well as tags. [cli.md migrate section](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/cli.md), [v0.8.0 changelog](https://github.com/WaylonWalker/markata-go/releases/tag/v0.8.0)
- **Slugs:** auto-generated from filename by default (`flat` mode): lowercase, spaces→hyphens, strip special chars, collapse hyphens. `[markata-go.glob] slug_mode = "flat" | "path"` plus per-prefix `[[markata-go.glob.slug_rules]]` (longest prefix wins) — the "hybrid" v0.9.0 capability. `index.md`/`README.md` map to directory root; `slug: ""` or `/` = homepage; frontmatter `slug` always wins; nested `slug: "a/b"` allowed; leading/trailing slashes stripped. [configuration.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/configuration.md), [spec/DATA_MODEL.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/DATA_MODEL.md)
- **Dates:** accepts RFC3339, `YYYY-MM-DD HH:MM:SS`, `YYYY-MM-DD`, US `01/15/2024`, European `15-01-2024`, `January 15, 2024`, `Jan 15, 2024`. [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md)

## 5. Feeds + filter language

**Filters are Python-like expressions — the same syntax family as Python markata.** This site's existing filters port verbatim. [frontmatter.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/frontmatter.md), [spec/DATA_MODEL.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/DATA_MODEL.md)

```toml
filter = "published == True"
filter = "draft == False"
filter = "'go' in tags"
filter = "date >= '2024-01-01' and date < '2025-01-01'"
filter = "slug.startswith('tutorials/')"
filter = "template == 'tutorial.html'"
filter = "Extra.series == 'Web Scraping with Go'"
filter = "published == True and ('go' in tags or 'python' in tags)"
filter = "not draft"
```

Operators: `==` `!=` `>` `>=` `<` `<=` `in` `and` `or` `not`; string methods `startswith`, `lower().contains(...)`; built-ins `today`, `now`, `True`, `False`, `None`; `date(2024,1,1)` constructor in spec. (Python markata extras `timedelta`/`parse` not confirmed — check `migrate filter`.) Note the TUI/CLI search uses a slightly different dialect (`tags contains "go"`, `title startswith "How"`).

### Feed config
[pkg.go.dev README](https://pkg.go.dev/github.com/WaylonWalker/markata-go)

```toml
[markata-go.feed_defaults]
items_per_page = 10
orphan_threshold = 3
[markata-go.feed_defaults.formats]
html = true
rss = true
atom = false
json = false
[markata-go.feed_defaults.templates]
html = "feed.html"
card = "card.html"

[[markata-go.feeds]]
slug = "blog"            # slug = "" → homepage index.html
title = "Blog"
description = "All blog posts"
filter = "published == True"
sort = "date"            # or "Extra.series_order" etc.
reverse = true
items_per_page = 10
[markata-go.feeds.formats]
html = true
rss = true
atom = true
json = true
```

Formats per feed: `html` → `/{slug}/index.html` (paginated), `rss` → `/{slug}/rss.xml`, `atom` → `atom.xml`, `json` → `feed.json`, `markdown` → `index.md`, `text` → `index.txt`, plus a `sitemap` per-feed format. Pagination via `items_per_page`/`page_size`, `orphan_threshold`. `auto_feeds` generates per-tag feeds automatically. [pkg.go.dev](https://pkg.go.dev/github.com/WaylonWalker/markata-go), [v0.10.0 changelog](https://github.com/WaylonWalker/markata-go/releases/tag/v0.10.0)

## 6. Templates

Engine: **pongo2** ("Jinja2-like") — `{{ }}`, `{% %}` syntax, `|safe` etc. [pkg.go.dev](https://pkg.go.dev/github.com/WaylonWalker/markata-go)

Lookup order for `post.template`: project `templates/` dir → theme templates → default theme fallback. Missing template → raw `article_html`. [frontmatter.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/frontmatter.md), [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md)

Template context: `post`, `body` (= `post.ArticleHTML`), `config`, `core`; in jinja_md content templates also `posts`, `filter`, `map`, `today`, `now`. Field access is Go-style exported names in examples (`post.Title`, `post.Date.Format`, `post.Extra.toc_html`) — but template-variable casing has been a moving target (documented in agent-skill commit c7923e3); pongo2 generally resolves case-insensitively. Custom filters: `media_url`, `is_video`, `length/first/last/sort/reverse/selectattr/map/join/default/upper/lower/title`, `forloop` vars. Template helpers `render_feed`/`feed_posts` exist. [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md), [frontmatter.md media fields](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/frontmatter.md), [spec/CONTENT.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/CONTENT.md)

```django
{% if post.Extra.toc_html %}<aside>{{ post.Extra.toc_html|safe }}</aside>{% endif %}
{% for p in filter("published == true")[:5] %}- {{ p.Title }}{% endfor %}
{% with post.image|media_url:post.video as m %}{% if m|is_video %}<video src="{{ m }}">{% endif %}{% endwith %}
```

`jinja_md` plugin = jinja-in-markdown equivalent; gated per-post by `jinja: true` frontmatter. [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md), [spec/CONTENT.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/CONTENT.md)

**Migration note:** `markata-go migrate templates` checks pongo2 compat, but Jinja2↔pongo2 differences (e.g. `{% with %}`, macro support gaps, different autoescape behavior) mean the 30 templates in `templates/` need manual review. Verified live: `templates/base_head.html` `{% include "head.html" %}` fails (file absent — Python markata may have supplied it) and poisons the whole project-template chain → 697 parse errors → every page falls back to built-in theme.

## 7. Feature parity vs this site's Python plugins

| Python markata feature/plugin | markata-go equivalent | Source |
|---|---|---|
| `plugins.password_protection` (client-side decrypt) | **`encryption` plugin + CLI.** `[markata-go.encryption]`, `private_tags` map tag/**templateKey**→key name, keys from env vars, `enforce_strength`, `min_password_length`, `default_key`; `markata-go encryption check/generate-password/encrypt-posts`; `private: true` frontmatter + robots.txt; encrypted cards on feed pages; plaintext-leak sealing. Configured in this repo's `markata-go.toml` (`protected-post = "default"`, key via `MARKATA_GO_ENCRYPTION_KEY_DEFAULT`); both protected posts verified encrypted in `markout-go`. | [v0.7.0](https://github.com/WaylonWalker/markata-go/releases/tag/v0.7.0), [v0.8.0](https://github.com/WaylonWalker/markata-go/releases/tag/v0.8.0), [encryption.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/encryption.md) |
| `plugins.wikilinks_hover` (disabled here) | **`wikilink_hover` — built-in, enabled by default** since v0.7.0; renders `data-title`/`data-description`/`data-date` on `.wikilink` anchors. Verified in this site's build output. | [v0.7.0](https://github.com/WaylonWalker/markata-go/releases/tag/v0.7.0) |
| `plugins.md_video` (`![]()`→`<video>`) | **Built-in `md_video` plugin** (same name) exists in markata-go; also `youtube` plugin (URL-on-own-line → lite/nocookie embed), `embeds` (oEmbed, Obsidian `![[file]]`), `is_video`/`media_url` filters. | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| `plugins.analytics` (disabled here) | `stats` plugin (post/feed/site stats), `contribution-graph` fenced block, chartjs blocks; analytics guide at `docs/guides/analytics.md`. | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| `plugins.build_thoughts` (custom: builds thoughts feed from external API) | **No equivalent.** `import` command only does RSS/Atom/JSONFeed — thoughts API has no feed endpoint (verified: `/feed.json` → 404). Port as pre-build script generating `pages/thoughts/*.md` (fix `scripts/sync-thoughts.py` — wrong output dir, no frontmatter), or keep calling it before builds. | this repo `plugins/build_thoughts.py`, `scripts/sync-thoughts.py` |
| `markata.plugins.prevnext` (disabled here) | `prevnext` built-in (Collect stage). | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| `markata.plugins.publish_source` (enabled here — serves `.md`/`.txt` sources) | Feed `markdown`/`text` output formats cover per-feed sources; per-post `.md` source publishing unconfirmed. | [pkg.go.dev feed formats](https://pkg.go.dev/github.com/WaylonWalker/markata-go) |
| `markata.plugins.service_worker` (disabled here) | Not in built-in plugin list. **Probably absent.** | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| `markata.plugins.manifest` / PWA fields | PWA config keys exist (`theme_color`, `start_url`, `display`, `short_name`…); a dedicated manifest.json writer not confirmed in plugin list. | this repo's markata-go.toml, [configuration.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/guides/configuration.md) |
| RSS | `rss`/`atom`/`jsonfeed` write-stage plugins + per-feed formats + head `alternate_feeds` | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| Sitemap | `sitemap` plugin + per-feed sitemap format | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| 404 page | Built-in 404 mechanism w/ slug suggestions + live-search fallback (v0.7.0); `didyoumean`-style suggestions | [v0.7.0](https://github.com/WaylonWalker/markata-go/releases/tag/v0.7.0) |
| Covers / OG images | `structured_data` (JSON-LD/OG/Twitter), `og_image` frontmatter, themed OG card templates, `og_image_service` screenshot-based OG images | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md), [v0.7.0](https://github.com/WaylonWalker/markata-go/releases/tag/v0.7.0) |
| jinja_md | `jinja_md` built-in (`jinja: true` frontmatter) | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| redirects | `redirects` write plugin | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| `markata summary` TUI counts | `markata-go tui` + `list`/`search` cover similar ground | [cli.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/cli.md) |
| `heading_link` permalinks | `heading_anchors` built-in | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| Search | `pagefind` built-in (skipped by `--fast`); optional bleve/searchcraft work in flight | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md) |
| Bundled agent skill for site repos | `markata-go agent install` ships a `markata-go-site` skill (SKILL.md + topics/reference/examples) | `spec/spec/AGENTS.md`, `markata-go agent --help` |
| Extras not in Python version | tailwind CDN automation, cdn_assets vendoring, mermaid, chartjs, glossary, series, webmentions, blogroll/reader, garden view w/ knowledge graph, mentions, link_collector/link graph, keyboard nav, view transitions, random_post, image optimization, LSP, serve control center | [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md), release notes |

## 8. Extensibility

- Built-in plugin set is large (30+) and configurable via `hooks`/`disabled_hooks` (`hooks = ["default", "python_docs"]` style). [plugins.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/plugins.md)
- **True external plugins: Go-only and effectively compile-time.** `pkg/plugins/registry.go` registers built-ins. The practical paths: **fork + recompile** (we already build from source via `go install`), or template/jinja_md + config for most needs. There's a `docs/guides/plugin-development.md` and an agent-skill topic `plugin-creation.md`. [spec/PLUGINS.md](https://github.com/WaylonWalker/markata-go/blob/main/spec/spec/PLUGINS.md), [CONTRIBUTING.md](https://github.com/WaylonWalker/markata-go/blob/main/CONTRIBUTING.md)
- Policy: PRs not accepted — so a needed feature means a fork or an issue request. [CONTRIBUTING.md](https://github.com/WaylonWalker/markata-go/blob/main/CONTRIBUTING.md)
- Escape hatches: `jinja_md` for computed content, `config_overrides` per post, `import` command, feed `markdown`/`text` outputs, `::: name` containers, env-var-driven scripts pre-build.

## 9. Development pace & maturity

- Repo created **2026-01-22**; releases: v0.4.0 (2026-01-24), v0.5.0 (~01-25), v0.6.0 (01-31), v0.7.0 (02-19), v0.8.0 (02-21), v0.9.0, v0.10.0 (04-20), … v0.13.0 (2026-10-02) — **roughly monthly minors, hundreds of commits each** (v0.9→v0.10 = 772 commits). [pkg.go.dev versions](https://pkg.go.dev/github.com/WaylonWalker/markata-go), [releases](https://github.com/WaylonWalker/markata-go/releases)
- Self-described **"Beta (0.x) — API may change between minor versions"**; release notes explicitly warn to smoke-test custom templates/themes on upgrade. [README](https://github.com/WaylonWalker/markata-go), [v0.9.0 notes](https://github.com/WaylonWalker/markata-go/releases)
- **Waylon dogfoods heavily:** waylonwalker.com homepage says "Building markata-go, the engine behind this site"; `go.waylonwalker.com` is live; repo `WaylonWalker/waylonwalker.com` has `markata-go.toml` + split `config/*.toml`; he runs a "builder admin" for live builds and edits via `md.waylonwalker.com`. [homepage](https://waylonwalker.com//), [waylonwalker.com repo](https://github.com/WaylonWalker/waylonwalker.com), [fast-mode post](https://waylonwalker.com/shots/new-fast-mode-in-markata-go-is-fun/)
- Community: 2 stars, 2 forks, 51 open issues, 2 contributors — **solo project**, not open to PRs. [repo](https://github.com/WaylonWalker/markata-go)
- Ecosystem extras already in flight: LSP (`markata-go lsp`), TUI, agent-skill bundle, helm/k8s deploy docs, builder-admin service, local admin CMS issue (#986). [cli.md](https://github.com/WaylonWalker/markata-go/blob/main/docs/reference/cli.md), [issues](https://github.com/WaylonWalker/markata-go/issues)

## 10. Known gotchas (issues + observed)

- **`markata-go migrate` can emit invalid TOML** for nested Python config sections (`auto_description`) — validate with `config validate`. [waylonwalker.com#20](https://github.com/WaylonWalker/waylonwalker.com/issues/20)
- **Slug mode changes URLs**: `path`/`hybrid` modes change URL structure — "review links and redirects before switching". [v0.9.0 notes](https://github.com/WaylonWalker/markata-go/releases)
- **Tailwind managed preflight off by default** since v0.9.0 — sites depending on it must re-enable. [v0.9.0 notes](https://github.com/WaylonWalker/markata-go/releases)
- **0.x breaking changes are routine** — pin the version (`eget`/mise pin, or `go install …@vX.Y.Z`), smoke-test templates on upgrade. [README](https://github.com/WaylonWalker/markata-go)
- Encryption pitfalls were real (plaintext leaks, missing decryption assets on feed pages) — fixed in v0.8.0; keep the version ≥0.8 and read `docs/guides/encryption.md` before relying on it. [v0.8.0](https://github.com/WaylonWalker/markata-go/releases/tag/v0.8.0)
- Optional theme assets (lite-yt CSS/JS, GLightbox, mermaid, webmentions, encryption) loaded site-wide rather than per-need — cosmetic/perf, open issue [#980](https://github.com/WaylonWalker/markata-go/issues/980).
- pongo2 ≠ Jinja2: `migrate templates` is a checker, not a rewriter — expect manual edits to custom templates.
- Case sensitivity in templates (`post.Title` vs `post.title`) has churned — check the agent-skill `template-context` reference and test.
- Private posts stay out of `auto_feeds` public tag feeds — intended behavior, don't be surprised if private-tagged posts are missing from tag pages. [PR #979](https://github.com/WaylonWalker/markata-go/pull/979)
- Env var for encryption keys is `MARKATA_GO_ENCRYPTION_KEY_DEFAULT` (not `_DEFAULT_KEY` as the spec table says) — verified by build error message.

## MIGRATION RISK SUMMARY (for pype.dev)

**Ports cleanly (verified in local markout-go build):**
- All feed `filter` strings — same Python-like expression language; all 17 feeds generated (192 output dirs incl. archive/variants).
- `published`/`draft` frontmatter semantics, `tags`, `templateKey` filtering, `YYYY-MM-DD HH:MM:SS` dates.
- `!!!`/`???`/`???+` admonitions for whitelisted types, `[[slug]]` **and** `[[ slug ]]` spaced wikilinks (resolve + hover previews), GFM tables, typographer, heading anchors, syntax highlighting.
- Nav, RSS/Atom/JSON per feed, sitemap, 404, prevnext, OG/structured data, pagefind search, tailwind automation.
- Encryption: `templateKey: protected-post` posts encrypted via `private_tags` map + `MARKATA_GO_ENCRYPTION_KEY_DEFAULT`.

**Needs custom work:**
- **Custom admonition types** (`scripture` ×70, `background-thought` ×14, `source` ×2) — hardcoded whitelist, no PRs accepted → file upstream issue and/or codemod to a supported type (e.g. `quote`) with matching title.
- **`plugins/build_thoughts.py`** — pre-build script writing `pages/thoughts/*.md`.
- **30 Jinja templates** — every `markata.config.*`/`post.*` var reference needs rewriting to the go context; the `head.html` include alone poisons the chain. Recommendation: adopt the default theme + palette/aesthetic CSS instead of porting.
- **Admonition typos in content**: `waring`, `Scripture`, `Exodusds` (were silently unstyled under Python markata too).

**No equivalent (probably):**
- Custom Python plugins generally — no Python plugin runtime.
- `service_worker` plugin; per-post `publish_source` (feed-level markdown/text exists); PWA manifest writer unconfirmed.
- Python-specific filter helpers (`timedelta`, `parse`) — verify in `migrate filter`.
