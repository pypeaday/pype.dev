---
date: 2025-02-20 09:18:35
templateKey: til
title: SMB with ZFS on Ubuntu
published: True
tags:
  - zfs
  - linux
  - tech

---

sudo apt-get install -y samba \\ then set sharesmb=on \\ chown the user \\ smbpasswd <user> -a \\ then mount with user/password from other machine
