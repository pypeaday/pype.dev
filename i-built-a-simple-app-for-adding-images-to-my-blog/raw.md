---
date: 2025-06-07 13:30:28
templateKey: blog-post
title: I built a simple app for adding images to my blog
published: True
tags:
  - homelab
  - tech
  - python
  - uv

---

# Quick Deets

I built a simple fastAPI app called "shotput" that I run locally inside a git repo where I save images for my blog. The app is simple:

1. upload image from clipboard
2. app commits image to repo (path is configurable)
3. app pushes the commit (auto-push configurable)
4. app returns a markdown link I can paste in my blog that uses statically.io (see [[statically-io-to-help-me-out]]) to serve the image from the repo to my blog

See the image repo with app details at [images.pype.dev](https://github.com/pypeaday/images.pype.dev)

# Usage

Anyone could copy the script and config to their own git repo to put images in
and run this at home - instructions are in the readme but it's just `uv run`

# Example

![20250607130609_dadd33eb.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250607130609_dadd33eb.png)

pasting an image let's you copy the markdown link for easy pasting

```markdown
![20250607130609_dadd33eb.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250607130609_dadd33eb.png)
```
