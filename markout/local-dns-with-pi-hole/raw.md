---
date: 2022-05-23 09:40:59
templateKey: til
title: Local DNS with Pi-hole
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706115604_6215ab44.png"
tags:
  - homelab
  - tech
  - til
---

## Spoilers

Tailscale is way easier than this... I was doing this local DNS overwrite in
Pi-hole before running tailscale and I haven't just totally "kicked the habit"
yet, so for anyone NOT running tailcale, but wanting local HTTPS and using
Pi-Hole this method would work fine

## Intro

I use [pihole](https://pi-hole.net/) as my DNS server at home. I run unbound as
well and have a pretty standard setup from their docs.

Pi-hole does 2 primary things for me:

1. dns sink-hold, the primary use case I believe
2. local SSL for all my self-hosted apps

## Caveat

I know for sure there are better ways to do this, but there's also worse
ones... so for now this has been my pattern, and it's only bitten me in the
butt when I've forgotten to add the final CNAME record... which'll make sense
in a sec.

## Process

It's really quite simple - in pihole I have a DNS record for my domain pointing
to my primary server

![20250706114501_8c34a31e.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706114501_8c34a31e.png)

Then for each service that I want to keep everything resolved locally for I add a CNAME

![20250706114557_916fb4c4.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706114557_916fb4c4.png)

With DNS resolving this way for clients using my pihole, the networking all
stays local and I still get HTTPS for my wildcard cert in cloudflare

## Why?

The reasons I do this are simple:

1. I've been doing it since I started homelabbing and it started out of misunderstanding of how networking works _at all_
2. I use a home dashboard with https:// links, and it's nice to just use that
   same dashbaord publically or at home. With local DNS resolution then I can
   whitelist some services, but conveniently access over the public url with https
   but routing such that my whitelist let's me in when it wouldn't if I tried to
   access the service from an external client
3. it's my homelab - I can do what I want

## It's too complicated

Honestly, as simple as this is, it is tedious and kind of complicated...
There's options to make it better...

1. script any service deployment to update the pihole /etc/host file
2. just use tailscale...
