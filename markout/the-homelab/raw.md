---
date: 2025-07-11 20:22:51
templateKey: blog-post
title: The Homelab
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250712020401_a9dd5237.png"
tags:
  - homelab
  - tech
---

# The Lab

This is the landing page for my homelab posts. It isn't a feed because I will
write things here and link out to relevant parts of the homelab.

I'll probably have notes about the hardware mostly here.

## Primary Application Server

My main server is called [[ghost]]

## Current Homelab Setup

> I copied this our of [[homelab-journey-part-1#current-homelab-setup]] for now to stub out what this page will link to

## Ad blocking | Pi-Hole

Hardware: pi-3

I have a Raspberry Pi 3 hardwired in that is running pi-hole so that's been a
part of my infrastructure now for a long time.

## Router | OPNSense

!!! note "stats"

    CPU: i5-8700

    Memory: 8GB of whatever was in the box

    Storage: 1TB SSD

My router is an old Optiplex SFF 5060 I got from Amazon for less than $100.
So I'm running a x86 system for my router with
OpenSense on it. Just seemed it to be another home lab standard and I'd like to
someday bring pi-hole over there or use AdGuard or integrate those two things
maybe a little bit more completely but right now they are mostly separate.

## Networking | VLANs

There's a
managed switch in there for some VLAN tomfoolery for my cameras and an IOT
network type of a thing.

## Networking | VPN | Tailscale

They're on tailscale as well so my DNS happens over tailscale.

## My Desktop

!!! note "stats"

    CPU: Ryzen 7 5700X

    GPU: Nvidia 3090

    Memory: 64 GB

    Storage: 4TB SSD + 2 TB HDD for zfs backup

    OS: Universal Blue Aurora

My daily-driver desktop is somewhat apart of my homelab now as I have a 3090 in
there with 20 GB of VRAM so I can run some heavier LLMs for self-hosted AI
workloads. Everything in that space runs in a container and then I manage
docker containers with compose stacks and portainer for visibility.

### Applications

Some of the apps I run here are ollama, open-webui, automatic1111's stable diffusion webui, whisper-webui
