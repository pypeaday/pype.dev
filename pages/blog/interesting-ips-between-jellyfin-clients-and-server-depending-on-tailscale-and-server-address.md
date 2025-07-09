---
date: 2024-07-12 06:24:57
templateKey: blog-post
title: Interesting IPs between Jellyfin clients and server depending on tailscale and server address
published: False
tags:
  - homelab
  - linux
  - tech
---

When connecting from my phone to jellyfin I'm seeing some interesting patterns.

## Scenarios

### Tailscale IP of phone is listed as local network to jellyfin

Wifi: off
Tailscale: on
Use exit node: on
LAN access: on
Jellyfin: LAN IP

Jellyfin sees 192.168.1.1, my router address

***

Wifi: off
tailscale: on
Use exit node: on 
LAN access: on
Jellyfin: Tailscale magic DNS

Jellyfin sees the docker bridge network

Q: This might be because of traefik somehow

***

Wifi: off
tailsacale: on
Use exit node: on
LAN access: off
Jellyfin: LAN IP

Jellyfin sees the 192.168.1.1

Q: Why did this work even work?

***

Wifi: off
tailsacale: on
Use exit node: on
LAN access: off
Jellyfin: Tailscale magic DNS

Jellyfin sees the docker bridge network

***

Wifi: off
tailsacale: on
Use exit node: off
LAN access: off
Jellyfin: LAN IP

Jellyfin sees the 192.168.1.1

Q: Why did this work?

***

Wifi: off
tailsacale: on
Use exit node: off
LAN access: off
Jellyfin: Tailscale magic DNS

Jellyfin sees the docker bridge network

***

Wifi: on
tailsacale: of
Use exit node: off
LAN access: off
Jellyfin: LAN IP (via pihole DNS)

Jellyfin sees the IP of my phone

***
