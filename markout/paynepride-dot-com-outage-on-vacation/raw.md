---
date: 2026-03-16 13:21:31
templateKey: blog-post
title: paynepride dot com outage on vacation
published: True
tags:
  - ofc
  - tech
---

The day after I leave for vacation I start getting SSL errors on every homelab
service I host for myself and others. The culprit was my Cloudflare API token
expiring. It was easy to find the 403s in the logs for Traefik (thank goodness
for Tailscale getting me into the lab from afar). The solution was to rotate the
API token, replace the value in Traefik's .env file, and hit it with the "just
deploy" button. Now I don't know why this expired - the key looks like it has
no expiration to me - and I'm too tired from the beach to dig in further.
Until next time, I expect this error to come back March 16 2027 I suppose.
