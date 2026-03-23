---
date: 2025-12-09 05:05:57
templateKey: dailyNote
title: 2025-12-09 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-12-08-notes]]

## Dev

Stood up [Domain Locker](https://github.com/lissy93/domain-locker) today and it looks dope, we'll see how it fits into the lab over the next year or so

Decided to see if I can get GPU acceleration in K3s and if so then probably just jump ship to it

- got stuck on the install... `sudo k3sup --local` for the win
- appears to be some issues with sharing the GPU between the host an pod, working through some of that tonight
