---
date: 2025-07-09 06:40:22
templateKey: dailyNote
title: 2025-07-09 Notes
published: True
tags:
  - daily-note
---

[[2025-07-08-notes]] from yesterday

## [[thoughts-to-nostr]]

- I feel a litte stuck on this... kind of blocked on temporal organization and not knowing what to do next

## [[homelab-monitoring-agent]]

- working still on basic tool call, idk how much longer I'm gonna care about this...

## [[using-restic-to-backup-my-home-directory]]

- desktop backup
- it's in compose, but I might want to use the `restic` binary that comes with UBlue... systemd timer to run it or temporal?

???+ success ""

    This is setup as a user systemd service and only backing uping my dotfiles to /tank/sandbox for now... but it appears to be working

## Writing

The python -m issue - <https://chatgpt.com/c/686d2a05-5b54-800f-8b84-1638c1b96840>

## Organization

zfs-ops is in pypeaday github... should it be in doomlab7 with everything else? I kind of want a monorepo just so I can quit thinking about where to put stuff...

for example I have zfs-ops for zfs related things, but now I'm gonna use restic to backup from my desktop... so does that go in zfs-ops cause it's really more about backups? or shoudl that stay only for zfs things and put this restic/docker backup somewhere else... either a new repo or start a monorepo for all my homelab stuff...

- homelab-compose
- all terraform (including digital harbor stuff?)
- zfs-ops
- amcrest sync

## [[pilgrims-creek]]

- Meeting with Cam today

## Wins

- restic setup on systemd as a test - just doing dotfiles right now but it's working I think [[using-restic-to-backup-my-home-directory]]
