---
date: 2026-11-18
title: The Lab
slug: lab
published: True
tags:
  - homelab
  - tech
description: An introduction to my homelab - the machines, the services, and why an office full of computers beats the cloud.
---

It started with a pi-hole on a Raspberry Pi Zero in 2019. It's been downhill ever since.

This is the public face of my homelab: a small fleet of machines running somewhere north of 80 services. No hyperscalers - just a Docker host in my office, a daily-driver desktop that moonlights as the GPU box, a backup vault, and a Tailscale mesh tying it all together.

## The machines

| Name | Role | One-liner |
|------|------|-----------|
| **ghost** | app server | Ryzen 7 5700G, 128 GB RAM, ~80 containers |
| **aurora** | desktop + GPU | Ryzen 7 5700X, RTX 3090, the AI workloads |
| **ghost-vault** | backups | the offsite-ish ZFS replica |
| **pihole3** | DNS | network-wide ad blocking, still the gateway drug that started this |

Full specs and the stories behind them: **[hardware](/lab/hardware)**.

## The services

Jellyfin for media, Immich for photos, Paperless for the filing cabinet I never had, FreshRSS because feeds aren't dead, Forgejo for git, SigNoz for watching it all burn (slowly, hopefully), plus a pile of little apps I built myself - some useful, some seasonal, some just because.

Two ways in: **[the service shelf](/lab/apps)** - every service as a card, filterable - or the prose tour: **[services](/lab/services)**.

## Why

Because it's mine. Because a $229 CPU and some patience replaces a shocking number of subscriptions. Because breaking prod is more fun when prod is yours. And because the best way to learn a thing is to be on call for it.

## Naming

The machines were once going to follow a consistent Harry Potter naming scheme. That collapsed under its own weight, so now they're just short aliases that are easy to type: `ghost`, `aurora`, `orbit`. The backup server is `ghost-vault`, which at least kept the theme for one generation.

## The posts

The long-form version of all this lives in the blog:

- [[homelab-journey-part-1]] - how I got here
- [[the-homelab]] - the original overview stub this section replaces
- [[ghost]] - the main server, spec by spec
- [the homelab feed](/homelab) - everything tagged, newest first
