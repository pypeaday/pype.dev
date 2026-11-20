---
date: 2022-10-07 11:14:37
templateKey: til
title: Suddenly SSH requires a password
published: False
tags:
  - linux
  - cli
  - tech
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011090848_2ce41024.png"
---


ssh -v -i ~/.ssh/id_rsa nic@hogwarts

THen we can look at print outs

cat /var/log/auth.log  also showed me that I had too wide permissions on files in ~/.ssh -> probably changed from an rsync job
