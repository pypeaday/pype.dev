---
date: 2026-04-18 20:00:38
templateKey: dailyNote
title: 2026-04-18 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2026-04-05-notes]]

## PC Crash

Desktop crashed days ago, apparently my primary drive has been going bad for a while and eventually it just died.

- live-booted to ubuntu server
- found restic backup script to NAS
- edited to be smaller, but did the backup to the NAS
- rsync'd docker volumes to BX500 SSD which is a zfs pool

- captured what I did on ghost at /home/nic/aurora-recovery-report.md and /home/nic/aurora-crash-disk-health-report.md

### PLAN

- install ubunto on 500 GB Samsung
- create zfs dataset for projects /tank/volumes/projects
- mount zfs dataset /tank/volumes/projects to /home/nic/projects
- zfs for home? probably not, keep home on ext4
- mount old home and sync directly

### Outcome

This is going terribly... blog post coming on what I should've done. What's
actually happening is that I basically just lost everything on that desktop
except my homelab repo thank God... 
