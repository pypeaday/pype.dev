---
date: 2022-12-28 13:33:07
templateKey: til
title: Reminder about ssh-copy-id for SSH and Ansible
published: True
tags:
  - homelab
  - linux
  - tech

---

`ssh-copy-id -i my.key.pub <hostname probably from tailscale>` 
this makes sure I can run ansible from my desktop against VMs on my server
easily if they have tailscale for the hostname - otherwise use the IP
