---
date: 2025-12-08 05:16:55
templateKey: til
title: COLUMNS Env Var For Nicer Screenshots
published: True
tags:
  - terminal
  - til
  - tech
cover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208114044_18c5fdd3.png
---

I was working on [[uv-run-pep-723-is-a-match-made-in-heaven]] and I wanted to grab a screenshot of a TUI, but my terminal is full screen and the TUI was then super stretched... Nice for working and using it, but not nice for a screenshot going into a blog post... see the difference `export COLUMNS=120` does here!

```
COLUMNS=120 mytui.py
```

![20251208111709_aa06bd03.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208111709_aa06bd03.png)

```
mytui.py
```

![20251208111820_a209638f.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208111820_a209638f.png)
