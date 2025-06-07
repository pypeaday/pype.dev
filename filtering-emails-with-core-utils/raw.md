---
date: 2022-05-30 06:09:27
templateKey: til
title: Filtering emails with core utils
published: False
tags:
  - linux
  - cli
  - tech

---

```text
email1@me.com
somebody_else@gmail.com

```

```bash
#! /bin/bash
# pick multiple emails from list and combine into comma seperated array
emails=`cat .../emails | fzf -m | sed 's/^\|$/"/g'|paste -sd,` 

echo $emails

```
