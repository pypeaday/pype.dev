# Palette Reference

This reference explains the project-local palette format and how palettes affect generated CSS.

## Project Palette Location

For site-local palettes, create TOML files under:

```text
palettes/
```

Example:

```text
palettes/my-brand.toml
```

## File Shape

```toml
[palette]
name = "My Brand"
variant = "dark"  # or "light"
author = "Your Name"
license = "MIT"
homepage = "https://example.com"
description = "Brand palette for the site"

[palette.colors]
base = "#111827"
surface = "#1f2937"
text = "#f9fafb"
muted = "#9ca3af"
blue = "#60a5fa"
violet = "#a78bfa"
green = "#34d399"
yellow = "#fbbf24"
red = "#f87171"

[palette.semantic]
text-primary = "text"
text-secondary = "muted"
text-muted = "muted"
bg-primary = "base"
bg-surface = "surface"
accent = "violet"
accent-hover = "blue"
link = "blue"
link-hover = "violet"
success = "green"
warning = "yellow"
error = "red"
info = "blue"
border = "surface"

[palette.components]
code-bg = "surface"
code-text = "text"
button-primary-bg = "accent"
button-primary-text = "base"
card-bg = "surface"
card-border = "surface"
```

## Resolution Rules

- `palette.colors`: raw hex colors only
- `palette.semantic`: may reference raw colors or direct hex values
- `palette.components`: may reference raw colors, semantic colors, or direct hex values
- semantic colors should not reference other semantic colors
- component colors should not reference other component colors

## Important Semantic Roles

Most useful semantic names:

- `text-primary`
- `text-secondary`
- `text-muted`
- `bg-primary`
- `bg-secondary`
- `bg-surface`
- `bg-elevated`
- `accent`
- `accent-hover`
- `link`
- `link-hover`
- `link-visited`
- `success`
- `warning`
- `error`
- `info`
- `border`
- `border-focus`

## Common Component Roles

- `code-bg`
- `code-text`
- `code-comment`
- `code-keyword`
- `code-string`
- `code-number`
- `code-function`
- `code-type`
- `code-operator`
- `button-primary-bg`
- `button-primary-text`
- `button-secondary-bg`
- `button-secondary-text`
- `nav-bg`
- `nav-text`
- `nav-active`
- `card-bg`
- `card-border`
- `card-shadow`

## CSS Variables Generated From Palette Data

The palette CSS plugin maps palette roles into site CSS variables such as:

- `accent` -> `--color-primary`
- `accent-hover` -> `--color-primary-light` and `--color-primary-dark`
- `text-primary` -> `--color-text`
- `text-secondary` -> `--color-text-secondary`
- `text-muted` -> `--color-text-muted`
- `bg-primary` -> `--color-background`
- `bg-surface` -> `--color-surface`
- `border` -> `--color-border`
- `link` -> `--color-link`
- `link-hover` -> `--color-link-hover`
- `link-visited` -> `--color-link-visited`
- `code-bg` -> `--color-code-bg`
- `code-text` -> `--color-code-text`
- `code-comment` -> `--color-code-comment`
- `code-keyword` -> `--color-code-keyword`
- `code-string` -> `--color-code-string`
- `code-number` -> `--color-code-number`
- `code-function` -> `--color-code-function`
- `code-type` -> `--color-code-type`
- `code-operator` -> `--color-code-operator`

So if the task is “change the whole color system”, editing the palette is usually better than patching many CSS selectors.
