---
date: 2022-09-21 11:26:02
templateKey: til
title: Append string to list of files with xarg
published: True
tags:
  - linux
  - bash
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011085608_4946e86c.png"
---

❯ find . -name "requirements.in" -print0 | xargs -0 sh -c 'for arg in "$@"; do echo "awscli" >>"$arg"; done'

