---
date: 2023-09-23 12:45:06
templateKey: til
title: Refresh Nextcloud Groupfolders after messing around on the filesystem
published: True
tags:
  - homelab
  - linux
  - tech

---

Exec in as www-data and run ./occ groupfolders:scan folder_id -v (the -v to see what it's doing)
