---
date: 2025-06-07 07:27:31
templateKey: til
title: Double check your CIDR blocks!
published: True
tags:
  - homelab
  - tech
  - tailscale

---

I use tailscale at home and generally love it. One thing I use it for is
whitelisting - so I have some apps publically available and my homelab ones
have DNS with SSL certs by LE but I whitelist to only my private IPs so that I
can use https at home basically. However I have had a few issues
with a couple apps, and I kind of chaulked it up to "network protocol this"
"need to figure out that header that" but ultimately I was being lazy and the
issues weren't catastrophic... it was things like:

1. couldn't get to my NVR by DNS, so I'd have to use tailscale_ip:port
2. couldn't login with my user in jellyfin cause I lock me down to LAN only
   since I dont' use a password
3. gotify wouldn't connect using DNS

These things aren't huge but they are annoying and today I decided to figure it
out.

I'm not an expert yet but I think the main problem was the CIDR block I was
using in my traefik config.

This'll shock some of you but `10.64.0.0/10` and `100.64.0.0/10` are not the
same blocks!

!!! warning "Check your CIDRs"

    It's always DNS, and even when it's not, it's still probably networking
