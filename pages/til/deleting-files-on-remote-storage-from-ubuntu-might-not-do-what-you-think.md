---
date: 2022-05-19 05:51:50
templateKey: til
title: Deleting files on remote storage from Ubuntu might not do what you think
status: draft
tags:
  - linux
  - cli
  - cli

---

From my daily driver Ubuntu machine I often open nautilus, dolphin, etc. and delete a file here or there on my NAS... turns out Ubuntu sends thse file to `.Trash-100` ON THE NAS so I'm effectively just moving that file and not freeing up any space...
