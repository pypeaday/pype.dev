# Feed Patterns Reference

Feeds are filtered, sorted, paginated collections of posts. In markata-go, many archive and index pages are feeds.

## Minimal Feed

```toml
[[markata-go.feeds]]
slug = "blog"
title = "Blog"
filter = "published == True"
sort = "date"
reverse = true
```

## Common Patterns

### Saved Links (Pins)

For a link board, use the built-in `/pins/` feed: published posts with non-empty
`link` or `url` frontmatter appear newest first. A configured `pins` feed takes
precedence; a publishable authored `pins` post keeps the route. Generic `link`
frontmatter remains render-neutral outside Pins. Disabling subscription feeds
also disables implicit Pins injection.

The default Pins board uses the viewport width and 100 items per page. It reuses
explicit cover fields or already-rendered embed media; plain `link` frontmatter
does not fetch metadata. Authored notes expand inline with the native **Note**
control. Cover art and commentary work without JavaScript. Prefer configuring
the feed's pagination before creating site-specific template or CSS overrides.

### Home Feed

```toml
[[markata-go.feeds]]
slug = ""
title = "Home"
filter = "published == True"
sort = "date"
reverse = true
items_per_page = 5
```

### Blog Archive

```toml
[[markata-go.feeds]]
slug = "blog"
title = "All Posts"
filter = "published == True"
sort = "date"
reverse = true
items_per_page = 10
```

### Presentation Views

For requests to hide Simple or Calendar, inspect `feed_defaults.views` and the
feed's `views` before editing templates. Use a subset of `default`, `simple`,
and `calendar`; always retain `default`. Omitted per-feed lists inherit global
views, while explicit lists replace them. Empty lists are invalid.

```toml
[markata-go.feed_defaults]
views = ["default", "simple"]

[[markata-go.feeds]]
slug = "archive"
views = ["default", "calendar"]
```

Disabling Simple suppresses `/simple/` output even if `formats.simple_html` is
true and removes stale generated pages on rebuild. Disabling Calendar removes
its controls, assets, and hidden source payload. Syndication formats remain
independent. Rebuild and inspect rendered links before completing the change.

### Calendar View

Normal built-in HTML feeds expose Calendar by default. Do not duplicate the feed or replace its primary template just to show publishing rhythm.

For a feed at `/blog/`, Calendar is available from the feed's view controls and can be deep-linked as:

```text
/blog/?view=calendar
```

The calendar reads the complete `feed.posts` collection, so ordinary primary-view pagination does not truncate its history. It renders one populated year at a time, defaults to the newest year, and supports `?view=calendar&year=2024` links. Older/newer controls and the year selector preserve URL state and browser history. Month widths adapt to the actual container. The full-history source still exists; annual paging bounds active grid DOM rather than transfer size. The post sidebar also exposes a calendar link for the currently selected feed.

The dedicated `calendar-feed.html` template still exists for intentional calendar-first customization, not as the normal enablement path.

### Tag-Like Feed

```toml
[[markata-go.feeds]]
slug = "go"
title = "Go Posts"
filter = "'go' in tags and published == True"
sort = "date"
reverse = true
```

### Docs Feed

```toml
[[markata-go.feeds]]
slug = "docs"
title = "Documentation"
filter = "published == True"
sort = "title"
reverse = false
items_per_page = 0
```

## Global Feed Formats

This is a top-level setting that controls which output formats are generated for all feeds. It is NOT placed inside a `[[markata-go.feeds]]` entry.

```toml
[markata-go.feeds.formats]
html = true
rss = true
atom = true
json = true
markdown = false
text = false
```

Calendar is a presentation of HTML feed data, not a syndication/export format, so there is no `calendar_html` format toggle.

## Feed Defaults

If the site uses shared feed defaults, check those before editing each feed:

```toml
[markata-go.feeds.defaults]
items_per_page = 10
pagination_type = "manual"

[markata-go.feeds.defaults.formats]
html = true
rss = true
atom = true
sitemap = true

[markata-go.feeds.defaults.syndication]
max_items = 20
include_content = true
```

## Pagination Types

Each feed can set `pagination_type` to control how page navigation works:

- `"manual"` (default): traditional page links with full page reloads
- `"htmx"`: HTMX-powered seamless page loading
- `"htmx-infinite"`: HTMX-powered infinite scroll
- `"js"`: client-side JavaScript pagination

Calendar intentionally uses the complete `feed.posts` collection even when the visible primary view uses a paginated `page.posts` slice.

## Auto-Generated Feeds

Markata-go can automatically generate feeds from tags, categories, and date archives without manually defining each one.

```toml
[markata-go.feeds.auto_tags]
enabled = true
slug_prefix = "tags"

[markata-go.feeds.auto_categories]
enabled = true
slug_prefix = "categories"

[markata-go.feeds.auto_archives]
enabled = true
slug_prefix = "archive"
yearly_feeds = true
monthly_feeds = false
```

**Defaults**: `auto_tags` is enabled by default; `auto_categories` and `auto_archives` are disabled by default.

Auto-tag feeds generate one feed per unique tag (e.g., `/tags/python/`). Auto-category feeds generate one feed per unique `category` frontmatter value. Auto-archive feeds generate per-year (and optionally per-month) feeds.

## Subscription Feeds

Two built-in subscription feeds are injected automatically:

- Root feed (slug `""`) at `/rss.xml` and `/atom.xml` (HTML output disabled)
- Archive feed (slug `"archive"`) at `/archive/rss.xml` and `/archive/atom.xml`

To disable:

```toml
[markata-go]
subscription_feeds_disabled = true
```

Private posts stay out of feeds unless a feed explicitly sets
`include_private = true` (or the compatibility alias `private = true`).
Opted-in feed outputs use encrypted article HTML and safe metadata only; they
do not expose raw body text, key names, derived descriptions, or private media.
Their encrypted wrappers omit the key name, so feed entries decrypt individually
without shared session storage or cross-entry unlocking.

## Sitemap Generation

Sitemaps are generated automatically:

- A site-level `sitemap.xml` includes the homepage (priority 1.0), all published posts (priority 0.8), and all feed index pages (priority 0.6).
- Per-feed `sitemap.xml` files are generated when the feed format `sitemap = true` (default: enabled).

No additional config is needed. The sitemap plugin runs in the Write stage after all content is rendered.

## Template Touchpoints

- list/archive HTML usually uses `feed.html`
- built-in normal and photo-grid feed templates expose primary, Simple, and Calendar presentations
- per-feed HTML can still switch to another built-in primary template such as `[markata-go.feeds.templates] html = "feed-photo-grid.html"`
- Calendar enhancement reads a hidden complete `feed.posts` source and toggles against the existing primary presentation; preserve that full-feed source when customizing built-in calendar hooks
- `calendar-feed.html` is a dedicated calendar-first template for compatibility/customization, not a required calendar setting
- card rendering often happens in a partial
- RSS and Atom can use separate XML templates
- `/rss.xsl` and `/atom.xsl` render with the site theme via the `<!-- markata:theme-head -->` ... `<!-- /markata:theme-head -->` region; keep that region when overriding them in `templates/` (customize the injected head with `partials/feed-xsl-head.html`)

## Feed Sidebar Windowing

Large feeds can make post sidebars expensive and noisy. Use `max_posts` under `[markata-go.components.feed_sidebar]` to cap sidebar entries while keeping the current post visible.

```toml
[markata-go.components.feed_sidebar]
enabled = true
feeds = ["blog", "docs"]
max_posts = 51
```

A value of `0` or an omitted value means no cap. When capped, markata-go renders a contiguous window around the current post when possible.

## Agent Guidance

- if the task is “change an index page”, check whether that page is backed by a feed first
- if the task is “show only X posts”, check `filter`, `limit`, `offset`, and `items_per_page`
- if the task is “make post sidebars shorter” or “speed up huge series sidebars”, check `components.feed_sidebar.max_posts`
- if the task is “change archive card layout”, change the feed template or card partial before changing content
- if the task is “show publishing cadence/history as a calendar”, first use the feed's built-in Calendar view (`?view=calendar` for a deep link); do not create a duplicate calendar feed unless the site intentionally needs a separate custom route

Wide dedicated calendar pages show four theme-surface month panels per row (three rows per year); smaller containers reduce columns to keep days readable. The year selector follows theme text and surface colors.
