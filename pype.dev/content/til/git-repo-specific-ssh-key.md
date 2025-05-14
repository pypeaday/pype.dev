---
date: 2024-01-04 15:42:15
templateKey: til
title: Git repo specific SSH Key!
published: True
tags:
  - cli
  - git

---

git config --add --local core.sshCommand 'ssh -i <<<PATH_TO_SSH_KEY>>>'
