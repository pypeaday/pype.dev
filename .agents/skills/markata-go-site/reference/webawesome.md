# Web Awesome Reference

This reference is for agents working in a markata-go site repo without the markata-go source tree.

Use it when you need the exact supported Web Awesome shortcuts, aliases, config keys, or asset behavior instead of general workflow guidance.

## Scope

This reference covers the built-in `webawesome` hook support in markata-go for markdown container shortcuts and raw `wa-*` HTML.

It does not imply that every Web Awesome component has a markdown shortcut. Some components may only be practical through raw custom-element HTML.

## Supported Shortcut Components

The built-in shortcut/component set is:

- `wa-comparison`
- `wa-details`
- `wa-tabs`
- `wa-tab` inside `wa-tabs`
- `wa-copy`
- `wa-copy-button`
- `wa-qr`
- `wa-qr-code`
- `wa-badge`
- `wa-tag`
- `wa-tooltip`
- `wa-carousel`
- `wa-animated-image`

## Supported Container Aliases

Recommended form:

```markdown
::: wa-details {summary="Advanced options"}
Hidden content.
:::
```

Long alias form:

```markdown
::: webawesome details {summary="Advanced options"}
Hidden content.
:::
```

General rule:

- `::: wa-<component>` is the preferred authoring form
- `::: webawesome <component>` remains supported as an alias
- Web Awesome classes can be combined with other container classes; `wa-*` or the `webawesome <component>` class pair may appear anywhere in the rendered `class` attribute.

## Raw HTML Support

Raw Web Awesome custom elements are also supported:

```html
<wa-callout variant="brand">Raw Web Awesome also works.</wa-callout>
```

Important rule:

- any page containing rendered `<wa-*>` elements should trigger Web Awesome asset loading automatically
- built-in template wiring imports `webawesome.loader.js`, sets the configured base path, and calls `startLoader()`; a passive module script alone does not initialize component discovery
- markata-go loads the focused Web Awesome theme stylesheet, such as `/assets/vendor/webawesome/styles/themes/default.css`, rather than the global `styles/webawesome.css` bundle so Web Awesome native-element styles do not override the site's normal typography and link styling
- `source = "vendor"` is the default; `markata-go assets download` prefetches the Web Awesome npm archive into the asset cache so offline builder images can serve `/assets/vendor/webawesome/` without runtime registry access

## Component Reference

### Comparison

Recommended markdown:

```markdown
::: wa-comparison {position=35 caption="Homepage redesign"}
![Before](/images/before.webp)
![After](/images/after.webp)
:::
```

Also valid:

```markdown
::: webawesome comparison {position=35}
![Before](/images/before.webp)
![After](/images/after.webp)
:::
```

Rules:

- expects exactly two images
- author images in natural left-to-right order
- first image starts on the left side of the divider
- second image starts on the right side of the divider
- common attrs include `position` and `caption`

### Details

```markdown
::: wa-details {summary="Advanced options"}
Hidden content.
:::
```

Rules:

- `summary` is preferred
- `label` can act as a fallback for summary text
- if neither is provided, the rendered summary defaults to `Details`

### Tabs

Container form:

````markdown
::: wa-tabs

:::: wa-tab {label="macOS"}
```bash
brew install markata-go
```
::::

:::: wa-tab {label="Linux"}
```bash
curl -fsSL https://example.com/install.sh | sh
```
::::
:::
````

Rules:

- `wa-tabs` becomes `wa-tab-group`
- nested `wa-tab` blocks become nav tabs plus `wa-tab-panel` blocks
- tab labels come from `label`, then `title`, then a generated fallback
- panel names are slugified from the label

Raw HTML is also valid:

```html
<wa-tab-group>
  <wa-tab slot="nav" panel="macos">macOS</wa-tab>
  <wa-tab-panel name="macos">...</wa-tab-panel>
</wa-tab-group>
```

### Copy Button

Body-driven form:

````markdown
::: wa-copy
`go test ./...`
:::
````

Attribute-driven form:

```markdown
::: wa-copy {value="go test ./..."}
:::
```

Rules:

- supports both `wa-copy` and `wa-copy-button`
- `value` is preferred when you already know the string
- when `value` is omitted, body text is converted into the copied value

Generated HTML shape:

```html
<wa-copy-button value="go test ./..."></wa-copy-button>
```

### QR Code

Body-driven form:

```markdown
::: wa-qr
https://example.com/post
:::
```

Attribute-driven form:

```markdown
::: wa-qr {value="https://example.com/post"}
:::
```

Rules:

- supports both `wa-qr` and `wa-qr-code`
- `value` is preferred when the target URL is already available as data
- when `value` is omitted, body text becomes the QR value

Generated HTML shape:

```html
<wa-qr-code value="https://example.com/post"></wa-qr-code>
```

### Badge

Body-driven form:

```markdown
::: wa-badge {variant="brand"}
New
:::
```

Label fallback form:

```markdown
::: wa-badge {variant="brand" label="New"}
:::
```

Rules:

- body content is preferred
- `label` can provide fallback text when the body is empty

### Tag

Body-driven form:

```markdown
::: wa-tag {variant="success"}
Stable
:::
```

Label fallback form:

```markdown
::: wa-tag {variant="success" label="Stable"}
:::
```

Rules:

- body content is preferred
- `label` can provide fallback text when the body is empty

### Tooltip

Recommended form:

```markdown
::: wa-tooltip {content="Static Site Generator"}
SSG
:::
```

Alias forms:

```markdown
::: wa-tooltip {text="Static Site Generator"}
SSG
:::
```

```markdown
::: wa-tooltip {content="Static Site Generator" label="SSG"}
:::
```

Rules:

- `content` is preferred for popup text
- `text` is accepted as an alias for popup text
- body content is preferred for the trigger text
- `label` can provide fallback trigger text when the body is empty
- `id` or `data-tooltip-id` can explicitly control the trigger id
- otherwise the renderer generates a unique trigger id

Rendered shape:

```html
<span class="markata-wa-tooltip-anchor" id="wa-tt-..." tabindex="0">SSG</span>
<wa-tooltip for="wa-tt-...">Static Site Generator</wa-tooltip>
```

### Carousel

```markdown
::: wa-carousel {navigation="true" pagination="true"}
![First screenshot](/images/one.webp)
First screenshot caption
![Second screenshot](/images/two.webp)
Second screenshot caption
:::
```

Rules:

- the body should contain one or more images
- each image becomes a `wa-carousel-item`
- optional plain text or `<figcaption>` content immediately after an image becomes that slide's caption
- common attrs include `navigation` and `pagination`

### Animated Image

```markdown
::: wa-animated-image
![Animated demo](/images/demo.gif)
:::
```

Rules:

- expects an image in the body
- the image `src` and `alt` are extracted into `<wa-animated-image ...>`

Raw HTML is also valid:

```html
<wa-animated-image src="/images/demo.gif" alt="Demo animation"></wa-animated-image>
```

## Attribute Notes

Commonly useful attrs by component:

- comparison: `position`, `caption`
- details: `summary`, `label`
- tabs/tab: `label`, `title`
- copy/copy-button: `value`
- qr/qr-code: `value`
- badge/tag: `label`, `variant`
- tooltip: `content`, `text`, `label`, `id`, `data-tooltip-id`
- carousel: `navigation`, `pagination`

When in doubt, preserve existing attrs from the site’s current usage instead of inventing new ones.

## Configuration

Typical config:

```toml
[markata-go]
hooks = ["default", "webawesome"]

[markata-go.webawesome]
enabled = true
source = "vendor"
version = "3.5.0"
output_dir = "assets/vendor/webawesome"
theme = "default"
palette = "default"
brand = "blue"
```

Key config fields:

- `enabled`
- `source`
- `version`
- `cdn_base_url`
- `output_dir`
- `theme`
- `palette`
- `brand`

## Asset Behavior

Vendor mode:

- `source = "vendor"`
- self-hosts Web Awesome assets
- uses the shared `[markata-go.assets]` cache and vendor root
- `webawesome.output_dir` controls the published Web Awesome subpath under that shared vendor root

CDN mode:

- `source = "cdn"`
- serves Web Awesome assets from `cdn_base_url`
- the default `cdn_base_url` uses Web Awesome's browser-ready `dist-cdn` subtree; avoid the package `dist` subtree unless the site also provides the import map/bundling needed for bare module specifiers

Important rules:

- do not hardcode duplicate Web Awesome `<script>` or `<link>` tags before checking existing template wiring
- do not assume the published path is always `/assets/vendor/webawesome/`; it may change when `webawesome.output_dir` changes
- if the page already contains rendered `wa-*` elements, the built-in plugin should usually handle asset activation

## Template/Config Extras You May See

Common resolved extras include:

- `needs_webawesome`
- `config.Extra.webawesome_enabled`
- `config.Extra.webawesome_css_url`
- `config.Extra.webawesome_loader_url`
- `config.Extra.webawesome_theme_class`

Inspect the current site templates before relying on these directly. Some sites depend on the default base template behavior and do not expose custom guards in project templates.
