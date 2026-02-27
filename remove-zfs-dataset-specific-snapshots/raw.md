---
date: 2022-05-19 05:49:16
templateKey: til
title: Remove ZFS Dataset Specific Snapshots
published: True
tags:
  - linux
  - zfs
  - cli
  - bash
  - homelab
  - til

---

I started my homelab journey being super naive about ZFS and how to manage the
filesystem... that bit me in the butt when transfering a ton of files out of
folders and into datasets because ZFS is copy on write so I was essentially
duplicating my storage until I got a hair smarter about removing files after
they're moved (rsync --remove-source-file ftw). But I had a ton of snapshots of
child datasets with a ton of data that I just never will need, so I learned
`zfs list -H -o name -t snapshot tank/dataset1/dataset2` will list just the
snapshots for dataset2 and if you pipe that into `xargs -n1 zfs destroy` then
you have a way to clear out some snapshots you don't need!
