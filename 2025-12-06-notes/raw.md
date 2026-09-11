---
date: 2025-12-06 05:36:49
templateKey: dailyNote
title: 2025-12-06 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-12-05-notes]]

- [[advent-romans-8-24-25]]

- Ran into many issues installing `just` in my CI runner at buildtime... so maybe need my own image, but got it working for now and am trying to consolidate my docs builds
  - blog, uses markata and has 1 or 2 extra steps outside markata, wrapped in just
  - homelab-mono, uses zensical, wrapped in just
  - dotfiles, uses zensical, needs to be wrapped in just
- 2 workflows
  - 1 is a simple mirror
  - 1 builds and pushes the site branch... should this just be a mirror with "docs_enabled: true"?
- builds
  - markout and site dirs should be configurable in the action or the same
  - pages config and the root being `.` or `./markout` should be something I do maybe with terraform?
    - it is 2 clicks and 3 repos... why tf would I try to terraform that up?
      - .... for funsies
