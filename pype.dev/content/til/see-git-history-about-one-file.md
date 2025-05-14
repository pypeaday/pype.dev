---
date: 2022-05-19 06:43:32
templateKey: til
title: See git history about one file
published: False
tags:
  - cli
  - vim
  - git

---

In vim `G clog %` does a `git clog {current file}`. You get every commit that the target file is apart of (so there might be info in those commits unrelated)
