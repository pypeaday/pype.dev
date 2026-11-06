---
date: 2022-05-30 06:09:27
templateKey: til
title: Filtering emails with core utils
published: True
tags:
  - linux
  - cli
  - tech
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011090105_eee7e9c0.png"
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
