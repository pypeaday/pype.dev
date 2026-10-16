---
date: 2026-04-27 09:25:43
templateKey: dailyNote
title: 2026-04-27 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2026-04-26-notes]]

## Wins

- updated Nextcloud from 30.x to 32.x today
  - NOTE: after every upgrade, go to /settings/admin/overview and perform any of the `occ` commands in the nextcloud container that it says are relevant. Typically these are DB updates and are relatively easy to run. It's fine to run them in the container because they typically affect the DB, not the container state itself, the nextcloud container is just the runtime
