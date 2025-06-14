---
date: 2022-05-23 06:19:13
templateKey: blog-post
title: Initial Proxmox Setup
published: False
tags:
  - homelab
  - tech
  - linux

---

1. `apt-get` by default wil go to the pve.enterprise repos so we need to point it to the non-enterprise ones.
```
rm /etc/apt/sources.list.d/pve-enterprise.list
vim /etc/apt/sources.list.d/pve-no-subscription.list
# add deb http://download.proxmox.com/debian/pve buster pve-no-subscription
```
