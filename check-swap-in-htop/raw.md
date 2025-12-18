---
date: 2025-11-15 06:52:14
templateKey: til
title: Check SWAP in htop
published: True
tags:
  - dev
  - til
  - tech
---

I struggle with maxxing swap on all my machines, I am sure it's a neovim config
that I've propagated everywhere and I'm too lazy to figure it out. Instead I
just swapoff and swapon kind of often... but this morning I had to know how to
see what's using all that swap....

![20251115125424_a1ddbd7c.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251115125424_a1ddbd7c.png)

The way to see SWAP usage by process in htop is:

1. open htop
2. Slam `F2` (`f` if you're just in old school `top`)
3. see the screenshot, find M_SWAP
4. move M_SWAP to `Active Columns`

![20251115125603_5d4af687.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251115125603_5d4af687.png)

> Credit to [this superuser post](https://superuser.com/questions/206424/whats-using-my-swap-ubuntu)
