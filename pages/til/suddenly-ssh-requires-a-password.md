---
date: 2022-10-07 11:14:37
templateKey: til
title: Suddenly SSH requires a password
status: draft
tags:
  - linux
  - cli

---


ssh -v -i ~/.ssh/id_rsa nic@hogwarts

THen we can look at print outs

cat /var/log/auth.log  also showed me that I had too wide permissions on files in ~/.ssh -> probably changed from an rsync job
