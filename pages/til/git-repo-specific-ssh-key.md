---
date: 2024-01-04 15:42:15
templateKey: til
title: Git repo specific SSH Key!
published: True
tags:
  - cli
  - git
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011090152_cb302f17.png"
---

git config --add --local core.sshCommand 'ssh -i <<<PATH_TO_SSH_KEY>>>'
