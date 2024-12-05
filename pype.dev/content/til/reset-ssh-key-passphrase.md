---
date: 2022-06-13 06:55:32
templateKey: til
title: Reset SSH key passphrase
published: True
tags:
  - homelab
  - cli
  - tech

---

I got into a pickle where I encrypted the ssh keys I use for my SSH connections on LAN, but then I couldn't run my ansible playbook on my server! ssh-keygen -p and leave the new passphrase blank saved my day (although password protected key files are safer!)

# TL;DR - just reset it to nothing

`ssh-keygen -p` will let you reset the passphrase on your ssh keys (good for you! yay security!)

But I needed to remove the passphrase to quickly deploy an ansible playbook 🤓
