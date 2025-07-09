---
date: 2025-06-14 08:51:21
templateKey: blog-post
title: Homelab Pinchflat
published: True
tags:
  - homelab
  - tech
cover: "https://github.com/kieraneglin/pinchflat/raw/master/priv/static/images/originals/logo-white-wordmark-with-background.png"

---

# Why?

I've written about [[self-hosted-media]] before and addressed some thoughts with YouTube. 

Lately though I've had 2 use cases for offline YouTube media and I'm now
solving this problem by using [pinchflat](https://pinchflat.com/) as my `ytdl`
solution + file system organization for use throughout my homelab.

## Use Case 1

At church we use pre-recorded music to sing along to, or at least we used to,
thankfully as of June 2025 we're doing live-music every week. But in the before
times I would strip the audio out of song files we had purchased and then made
lyric videos with the instrumental tracks. As we wanted to try new songs out we
didn't want to purchase them in case they didn't work out for us to use and
that ends up being a waste (church budget is very tight). So using songs
available on YouTube is an easy solution, but the only way to strip the vocals
and see if the song sounded right with our singers and equipment was to make
the lyric video and rehearse it... Chicken or Egg problem unless we can freely
try it before purchasing... So using Pinchflat we can download songs in that
playlist, I can edit the files, the team can try it out, and if we like it we
can use it without hitting the budget any harder than necessary.

> Pinchflat syncs that playlist to a folder on my NAS that another process
> watches and performs the audio stripping workflow

## Use Case 2

I just wrote about [[if-you-want-something-make-it-so-song-style]] which is the
second use case - cutting mashups of my favorite songs on youtube and then
hosting them myself for easy listening

# The Setup

I run it in docker compose like practically all my other services

```yml
services:
  pinchflat:
    container_name: "pinchflat"
    image: "ghcr.io/kieraneglin/pinchflat:latest"
    ports:
      - "8945:8945"
    volumes:
      - "/tank/encrypted/docker/the-pit-zfs/pinchflat/config:/config:rw"
      - "/tank/encrypted/nas/media/downloads/pinchflat/downloads:/downloads:rw"
    environment:
      TZ: "America/Chicago"
      PUID: "1000"
      PGID: "1000"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: "4g"
```

# The GUI

The WebUI is easy to navigate - you organize your downloads however you want with "sources", and here's how I setup the source for these mashups that I want to edit... I add them to my playlist and Pinchflat grabs them for me automatically
![20250614144201_fa16e7ac.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250614144201_fa16e7ac.png)

![20250614144307_bdf12ee0.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250614144307_bdf12ee0.png)

That's basically it - then as you can see in the compose file, I get the files in a folder on my NAS and from there I can edit them as I need.

## Example

The church app that does the audio processing is in a compose stack with the
pinchflat download directory on the host mounted in - this is how containers in
different stacks can share data, by sharing a filesystem bind mount

```yml
services:
  olivet_watcher_app:
    image: pypeaday/vocal-remover-watcher
    container_name: olivet-youtube-watcher
    volumes:
      - /tank/encrypted/nas/media/downloads/pinchflat/downloads:/input:ro
      - /tank/encrypted/docker/vocal_remover_app/watcher-app/processed_mp3s:/output
      - /tank/encrypted/docker/vocal_remover_app/watcher-app/db:/data
    working_dir: /app
```

