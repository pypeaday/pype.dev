---
templateKey: til
tags: ['homelab']
title: Cloudflare-Proxy-Kills-Gh-Dns
date: 2022-05-07T00:00:00
status: draft
cover: "/static/cloudflare-proxy-kills-gh-dns.png"

---

I recently moved my blog to GitHub pages at a new domain (pype.dev).

As I was learning about this I noticed that everytime I rebuilt/deployed my site the DNS broke...

# My setup

I use Cloudflare as my domain registrar and they super nicely automatically proxy traffic to your domains through one of their proxy servers!

This is super nice for masking your IP especially if you are self-host stuff on your personal/private WAN.

However, I noticed that that autoproxy feature actually killed my wireguard service because the VPN traffic was getting lost somewhere, so sadly I have Cloudflare only as DNS without any proxy protection...

# pype.dev

Thankfully I remembered what I just wrote above because everytime I've deployed my site with the autoproxy feature enabled in cloudflare, the site dies on GitHub!

The fix? Switch DNS settings in Cloudflare to just be DNS, that way GH can appropriately lookup the DNS record for pype.dev and everything works out magically.
