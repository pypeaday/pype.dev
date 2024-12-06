---
date: 2022-07-08 15:54:58
templateKey: til
title: ZFS Permissions for Sanoid/Syncoid
published: False
tags:
  - zfs
  - homelab
  - tech

---


`zfs allow -u $USER clone,load-key,create,destroy,mount,mountpoint,receive,send,rollback,compression,snapshot,hold tank`

> load-key only needed if using encrypted datasets
