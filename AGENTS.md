# pype.dev (markata-go migration)

## Homepage

- `/` is `pages/index.md` with `slug: ""` + `template: home.html`. Without the empty slug, markata-go's implicit root feed claims `/index.html`.
- `templates-go/home.html` is a standalone page (no `extends`); styles live in `static/home.css` only.
- `static/index.html` can never own `/` — generated output overwrites static copies.
- Recent posts come from `feed_posts("all", 6)`. Post maps expose frontmatter like `cover` directly.

## Template gotchas

- pongo2 cannot parse dict literals (`{"limit": 6}`). A parse error makes the page silently fall back to `post.html` — check the built HTML for your markup after every template edit.
- markata injects `/css/fonts.css` after custom stylesheets; its element rules (`h1`, `blockquote`) beat inheritance unless you scope `font-family: inherit` on `.tx *`.
- Template-only edits can skip incremental rebuilds. Rebuild clean, but stop `markata-go serve` first or it races your `rm -rf markout-go`.

## markata-go fork

- CI pins a fork release in `.forgejo/workflows/gh-pages.yml` (currently `v0.13.0-pype.4`). Patches live on branch `pype-patches` in `~/projects/personal/markata-go`.
- Releases are built by hand, not goreleaser: `CGO_ENABLED=0 /usr/local/go/bin/go build -trimpath -o markata-go ./cmd/markata-go`, tar the lone binary as `markata-go_<ver>_linux_x86_64.tar.gz`, `gh release create <tag> -R pypeaday/markata-go --target pype-patches <tarball>`, then bump the workflow URL.
- `go` is not on PATH in the distrobox; use `/usr/local/go/bin/go`.
- og:image comes from `social_image` > `image` > `cover` > `seo.default_image`. Structured data is cached: verify SEO changes with a clean build.

## Verify

- `markata-go build --fast`, then grep `markout-go/index.html` for the expected classes.
- Screenshot: `~/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome --headless=new --no-sandbox --disable-gpu --window-size=1440,1000 --screenshot=/tmp/x.png http://localhost:8643/` (no `--virtual-time-budget`: the status-bar clock interval hangs it).
