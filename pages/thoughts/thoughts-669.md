---
title: "💭 What are these 100.x.y.z addresses? · Tailscale Docs"
date: 2025-06-07T11:27:43.985208
slug: thoughts-669
templateKey: thoughts
description: "I have had serious issues with a whitelist I set in my traefik config and then reaching some services on my tailnet... t"
published: true
link: "https://tailscale.com/kb/1015/100.x-addresses"
tags:
  - tailscale
  - thoughts
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011084718_007fd9ed.png"
---

<a href="https://tailscale.com/kb/1015/100.x-addresses">
    <img
        src="https://shots.wayl.one/shot/?url=https://tailscale.com/kb/1015/100.x-addresses&height=450&width=800&scaled_width=800&scaled_height=450&selectors="
        alt="shot of post - What are these 100.x.y.z addresses? · Tailscale Docs"
        height=450
        width=800
    >
</a>

Here's my thought on <a href="https://tailscale.com/kb/1015/100.x-addresses">What are these 100.x.y.z addresses? · Tailscale Docs</a>

---

I have had serious issues with a whitelist I set in my traefik config and then reaching some services on my tailnet... turns out I whitelisted 10.64.0.0/10 instead of 100.64.0.0/10 in my traefik configuration file... 

---

!!! note
    This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com). It's a short note that I make about someone else's content online.  Learn more about the process [[ thoughts ]]
