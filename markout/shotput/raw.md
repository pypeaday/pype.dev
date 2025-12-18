---
date: 2025-07-16 06:18:00
templateKey: project
title: Shotput
published: True
tags:
  - projects
  - blog
---

This is from [[i-built-a-simple-app-for-adding-images-to-my-blog]]

## Overview

Shotput is a simple webapp backed by a git repo that allows you to paste a screenshot from your clipboard, it gets put into the repo and pushed, and you get a link back to using that image via statically's CDN in your website.

## Example

![20250607130609_dadd33eb.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250607130609_dadd33eb.png)

pasting an image let's you copy the markdown link for easy pasting

```markdown
![20250607130609_dadd33eb.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250607130609_dadd33eb.png)
```

## Concerns

Currently this is deployed with an ssh key mounted into the container that I
put into a zfs dataset manually. Per [[2025-07-16-notes#Wants]] I'm struggling
with the key sharing model...
