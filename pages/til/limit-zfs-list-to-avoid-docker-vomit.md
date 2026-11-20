---
date: 2022-10-20 06:39:18
templateKey: til
title: Limit zfs list to avoid docker vomit
published: True
tags:
  - zfs
  - cli
  - tech
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011090237_6c40f36b.png"
---

zfs list has a flag -r, but if you use zfs driver for docker then you'll get
flooded with every docker volume in the world. zfs list -r -d N will limit the
dept of the print out, so zfs list -r -d 2 gives me tank, tank/encrypted,
tank/encrypted/docker -> but then I don't see all the continer volumes
