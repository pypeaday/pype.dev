---
date: 2023-04-08 20:12:22
templateKey: til
title: Changing ZFS key for child datasets of encrypted dataset after migration
published: True
tags:
  - zfs
  - homelab
  - tech
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011085659_6fefe2f2.png"
---

➜ pihole sudo zfs load-key -L file:///path/to/.zfs.tank.key tank/encrypted/vms/arch-sandbox
➜ pihole sudo zfs change-key -o keylocation=file:///path/to/.zfs.tank.key -o keyformat=raw tank/encrypted/vms/arch-sandbox
Need to load-key for each individual dataset, then change key location to be a file instead of the prompt
