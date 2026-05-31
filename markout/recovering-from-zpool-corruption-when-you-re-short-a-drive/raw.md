---
date: 2025-02-03 21:08:56
templateKey: blog-post
title: Recovering from zpool corruption when you're short a drive
published: True
tags:
  - infrastructure
  - zfs
  - tech

---

1. can only mount tank RO
  - so can't rename
  - also can't detach which is what I'd want

2. Could import pool witn -N to not mount any datasets
3. detach and attach
4. resilver...
