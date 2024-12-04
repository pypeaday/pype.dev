---
date: 2022-09-21 11:26:02
templateKey: til
title: Append string to list of files with xarg
published: True
tags:
  - linux
  - bash

---

❯ find . -name "requirements.in" -print0 | xargs -0 sh -c 'for arg in "$@"; do echo "awscli" >>"$arg"; done'

