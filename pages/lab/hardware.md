---
date: 2026-11-18
title: Lab Hardware
slug: lab/hardware
published: True
tags:
  - homelab
  - tech
description: The machines behind the lab - specs, roles, and why each exists.
---

Most of this was purchased for exactly the job it does - a few pieces found their way to me for free along the way. It works great.

## ghost - the app server

The heart of the lab. Practically everything in the [services list](/lab/services) runs here.

- **CPU:** AMD Ryzen 7 5700G (8c/16t, integrated graphics for Jellyfin transcodes)
- **RAM:** 128 GB
- **Boot:** 1 TB NVMe (Crucial P3)
- **Storage:** 12 TB ZFS mirror (primary) + 12 TB ZFS mirror (on-box replica), plus a dedicated 4 TB drive for Frigate's NVR writes
- **Chassis:** Sagitarius 8-bay NAS chassis from AliExpress
- **OS:** Ubuntu Server 24.04
- **KVM:** JetKVM for remote hands
- **Runs:** ~80 docker containers - media, docs, git, observability, the works. Traefik fronts it all; Komodo manages the stacks; Forgejo hosts the code.

More detail in [[ghost]].

## aurora - desktop + GPU box

My daily driver that doubles as the lab's GPU worker.

- **CPU:** Ryzen 7 5700X
- **GPU:** RTX 3090 - the whole reason the AI stack exists
- **RAM:** 64 GB
- **Storage:** 2 TB SSD (the `orbit` ZFS pool)
- **OS:** Aurora-dx (Fedora Atomic / Kinoite flavor)
- **Runs:** the AI stack - ollama, Open WebUI, whisper, Speakr, Khoj - plus Immich's ML offloading and a tdarr transcode node.

## ghost-vault - the backup vault

A second box that exists to receive ZFS snapshots via syncoid. It's on the tailnet, running the same observability collectors as everything else. Boring by design - its job is to be there when everything else isn't.

## OPNSense router

An old Optiplex SFF 5060 (i5-8700, 8 GB, 1 TB SSD) picked up for under $100. Runs OPNSense, plus a managed switch downstream for VLAN shenanigans - cameras and IoT get their own network.

## pihole3

The third iteration of the pi-hole appliance that started all this. Dedicated hardware, network-wide DNS ad blocking. Where the addiction began.

## The mesh

Everything is on **Tailscale** - ghost, aurora, ghost-vault, phones. DNS over the tailnet means `ssh ghost` works from a coffee shop like it's the next room. Cloudflare Tunnel handles the few things that need to be actually public.
