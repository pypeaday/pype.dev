---
date: 2024-12-11 10:48:10
templateKey: til
title: D and uninterruptable sleep
published: True
tags:
  - linux
  - zfs
  - tech

---

## Htop

I recently have been having significant home server issues, and that's not the point of this - today I learned what `D` state is when looking at htop.


<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/d-htop.png" alt="htop-d" title="htop with D state" />

Apparently this means "uninterruptable sleep" and it's a dev's nightmare... 

### Context

The issue I was having was that some `zfs rollback` commands were hung - for hours... I wasn't sure what was going on, rollbacks should be instant but I figured it was just an artifact of these issues.

Turns out I still don't know what locked the disks up but I learned why `<C>-c` did __nothing__...
the more you know
