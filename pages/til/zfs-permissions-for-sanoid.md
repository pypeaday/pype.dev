---
date: 2022-07-08 15:54:58
templateKey: til
title: ZFS Permissions for Sanoid/Syncoid
published: True
tags:
  - zfs
  - homelab
  - cli
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011091058_17c28d1e.png"
---


`zfs allow -u $USER clone,load-key,create,destroy,mount,mountpoint,receive,send,rollback,compression,snapshot,hold,keylocation,bookmark tank`

> load-key only needed if using encrypted datasets
