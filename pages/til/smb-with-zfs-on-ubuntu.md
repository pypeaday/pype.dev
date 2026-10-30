---
date: 2025-02-20 09:18:35
templateKey: til
title: SMB with ZFS on Ubuntu
published: True
tags:
  - zfs
  - linux
  - tech
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011090756_073993cc.png"
---

sudo apt-get install -y samba \\ then set sharesmb=on \\ chown the user \\ smbpasswd <user> -a \\ then mount with user/password from other machine
