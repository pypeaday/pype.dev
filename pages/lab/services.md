---
date: 2026-11-18
title: Lab Services
slug: lab/services
published: True
tags:
  - homelab
  - tech
description: What's actually running in the lab - roughly 80 containers worth of media, docs, AI, and self-built odds and ends.
---

Everything below runs on [the hardware](/lab/hardware) - mostly `ghost` (~80 containers), with the GPU-hungry stuff on `aurora`. Names only; the good stuff lives behind the tailnet.

!!! note

    Prefer cards over prose? The same fleet lives at [/lab/apps](/lab/apps) - every service as a filterable card.

## Media

| Service | What it does |
|---------|--------------|
| **Jellyfin** | Movies and TV, hardware-transcoded on ghost's iGPU |
| **Audiobookshelf** | Audiobooks and podcasts |
| **Immich** | Photo backup - two instances, because memes are not family photos |
| **Pinchflat** | Archives YouTube channels into the media library |
| **Ubooquity** | Comics and ebooks |
| **Frigate** | NVR with object detection, on its own dedicated drive |
| **tdarr** | Distributed transcoding (ghost + aurora nodes) |
| **Jellystat** | Jellyfin watch stats |

## The arr suite

Sonarr, Radarr, Lidarr, Readarr, a second Readarr for audio, Bazarr for subtitles, Prowlarr for indexers, Jellyseerr/Ombi for requests, and Transmission tucked behind a Gluetun VPN container. The usual suspects - a self-hosted media pipeline is basically a rite of passage.

## Documents & knowledge

| Service | What it does |
|---------|--------------|
| **Paperless-ngx** | The filing cabinet I never kept, OCR'd and searchable |
| **Karakeep** | Bookmark hoarding with search |
| **Linkding** | More bookmarks (yes, both - it's a long story) |
| **FreshRSS** | RSS is not dead |
| **ArchiveBox** | Save pages before they 404 |
| **AFFiNE** | Notes/docs workspace |

## Home ops

| Service | What it does |
|---------|--------------|
| **Actual** | Household budget, self-hosted |
| **Nextcloud** | Files, shares, and a sermon-audio drop for church |
| **Homebox** | Home inventory |
| **Kanboard** | Personal kanban - where the lab's todo list lives |
| **SearXNG** | Metasearch |
| **Stirling PDF** | PDF tools |
| **Gotify** | Push notifications for all the things |
| **webtop** | A browser desktop for Dad (thinkorswim preinstalled) |

## AI (on the 3090)

Ollama + Open WebUI for local chat, Whisper + Speakr for transcription, Khoj for search over my notes, meme-search (pgvector over the meme library), and Stable Diffusion for generating things I definitely needed.

## Dev & platform

| Service | What it does |
|---------|--------------|
| **Forgejo** | Self-hosted git + Actions runners - the lab's GitHub |
| **Registry** | Private container registry |
| **code-server** | VS Code in a browser tab |
| **Temporal** | Workflow orchestration for the apps I build |
| **MinIO** | S3-compatible object storage (also hosts terraform state) |
| **Komodo** | Stack management across the fleet |
| **Traefik** | Reverse proxy for ~80 routes |
| **SigNoz** | Metrics, logs, traces, alerts - the lab's eyes |
| **Netdata / Glances / Beszel** | Host-level monitoring, because three is apparently the right number |
| **installer** | Serves my shell-script installers at `i.*` - `curl | bash`, but mine |

## Things I built

The services section I'm proudest of - little apps with big opinions:

| App | What it does |
|-----|--------------|
| **Notifiq** | Notification/reminder service ([app.notifiq.net](https://app.notifiq.net)) |
| **sermon-prep** | Markdown sermon notes with verse autocomplete |
| **pype.dev** | This site - my own SSG ([markata](https://markata.dev)) builds it |
| **olivet-snow** | Snow-crew scheduler for church - weather-aware, volunteer signups |
| **halloween-timeline** | Interactive Halloween history site |
| **dad-can-i-wear-this** | Answers what it says |
| **whose-turn-is-it** | Settles household debates |
| **santa-tracker** | Seasonal, obviously |
| **clocks** | Big display clocks |
| **blantons-watch** | Monitors bourbon letter-set prices |
| **names-api** | Name meanings/origins REST API |

## The dashboard

`home.*` runs gethomepage - one page with links to all of the above. It's the map; this page is the tour guide.
