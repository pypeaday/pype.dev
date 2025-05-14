---
date: 2024-12-11 10:52:23
templateKey: til
title: rsync like a pro
published: True
tags:
  - linux
  - terminal
  - cli

---


I am moving a hefty amount of data to a new ZFS pool due to some corruption and I want to avoid using `zfs send/recv` for this just to make sure I don't propagate any corrupted data to my new pool.

I've used `rsync` for simple things before but I needed this to be a little smarter and I wanted to see simple progress without flooding my terminal with a billion filenames.

## TLDR
TLDR: 
`rsync -aHAX --chmod=Da+s --info=progress2 --inplace --exclude='encrypted/docker/frigate-media' /tank/ /harbor/`

## Explanation

-aHAX: Preserves attributes (archive mode, hard links, ACLs, extended attributes).
--chmod=Da+s: Ensures the setgid bit is applied to directories.
--info=progress2: Provides detailed progress information, including overall data transfer stats.
--inplace: Writes directly to the destination file, avoiding temporary files (useful for large files).
--exclude='encrypted/docker/frigate-media': Excludes the specified path (relative to the /tank root).
/tank/ /harbor/: Ensures the contents of /tank are copied directly into /harbor.


