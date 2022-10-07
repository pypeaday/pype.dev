---
date: 2022-05-19 06:05:23
templateKey: til
title: See ZFS snapshot disk usage
status: draft
tags:
  - zfs
  - homelab
  - 

---

As I was cleaning up my NAS recently I noticed that I ran out of storage even
though my disk usage looked pretty low... turns out I was keeping a mega-ton of
ZFS snapshots and due to my own ignorance at the time didn't realize the
storage cost of this!

`zfs list-o space tank/home` will show the disk usage of the dataset and snapshots in `tank/home`
