---
date: 2025-07-16 06:05:39
templateKey: dailyNote
title: 2025-07-16 Notes
published: True
tags:
  - daily-note
---

yesterday - [[2025-07-15-notes]]

## Notes

- working on parking signs for heidi
  - need to buy black and green PETG probably

## For Today

I'm going to try replacing my "for today" and "for tomorrow" sections of notes with just updating [[now]]

[[pilgrims-creek---about-me#Hello]]

I'm migrating my homelab stuff to its own repo called `homelab-mono`

- starting with the restic stuff going into a `dataops` folder
- will move `homelab-compose` to there eventually

- restic is backing up ok I think, but I want just recipes for quickly checking the health and so I'm working on that with windsurf right now

- I started working on [[gotify-cli-for-notifying-me-of-nextcloud-uploads]] and it's got me thinking that I was going to be using temporal for this kind of stuff... how far out to I branch out at home?

## Wants

I'm struggling with some homelab setup... Between
[[using-restic-to-backup-my-home-directory#Intro]] and building my blog with temporal
(oh and [[shotput]] which pushes images to my images.pype.dev repo ) I'm
finding that I need an ssh key in a container... My restic backup uses my ssh
key and runs out of my dotfiles repo right now. But I need to think about a way
to generate or share a restricted user's keypair with a container or many
containers for homelab use...

- ssh
- restic
- zfs operations? probably not
- github permissions / self-hosted git repo
  - should be github for images.pype.dev because statically.io works well specifically with github

This is where something like vault would come in handy... a central place to
store these types of credentials. But I suppose I could hack something up on a
zfs dataset... I could generate a key pair for a user in my lab, or even me but
with restricted permissions, and then put that in
`/tank/encrypted/docker/something-zfs` and then use that as a host mount into
any containers that need a key? `-v
/tank/enctyped/docker/something-zfs:/home/appuser/.ssh` something like that...

## Wins

- got [[using-restic-to-backup-my-home-directory#Intro]] written today
- Started working on using [[gotify-cli-for-notifying-me-of-nextcloud-uploads]]
