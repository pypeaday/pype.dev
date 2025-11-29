---
date: 2025-07-11 20:23:35
templateKey: blog-post
title: Ghost
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250712020248_bc77aa80.png"
tags:
  - homelab
  - tech
---

# Intro

Ghost is my primary application server. These are the specs...

> I wrote about some of the specs in [[homelab-journey-part-1#current-homelab-setup]] but here is where I will keep up to date information

## Why

Why `ghost`? I don't know... I was going for a theme at one point it time, or
several points rather... and after giving up on the theatrics of a fully
consistent harry potter naming scheme across all my homelab entities, I decided
to just come up with some short aliases that were easy to type. So `ghost` was
born, and the backup server is `ghost-vault`.

## CPU

I have a `AMD Ryzen 7 5700G with Radeon Graphics @ 16x 4.426GHz` in this bad
boy... why this chip? Well I knew I wanted many cores, and I was previously on
a Ryzn 5 3600, which was fine but I noticed that as I started to develop with
containers more that I was going to want to take advnaatage of more cores...

I also was pretty sure that the built-in graphics would be enough for the
acceleration requirements I had in mind - which was primarily [[jellyfin]].

At this point in time, I think AMD was still beating Intel on most of the
benchmarks I tended to care about (I was watching channels like Bitwit and LTT
at the time of building this machine)

So because of the moderate amount of cores and built-in GPU, I paid $229 for it
according to my Amazon history, and it's currently priced at $174, so that's a
pretty sweet deal if you're on AM4 and looking to upgrade in July of 2025

## Memory

I maxxed her out at 128 Gee Beez. I snagged that kit of Crucial that's all
black that we've all seen on Amazon. I paid aboaut $90 for it, it's currently
priced way high for some reason, which is unfortunate. It's been totally fine
for me as far as memory performance goes - in that it's stable and I don't
think about it...

## Boot

I have a 1 TB NVMe in here to boot from. I think it's a Crucial P3

## Storage

Storage is the interesting bit, it's supposed to be the most rock solid but
it's also been the most fluid for me from a hardware perspective, and as of my
most recent case migration I think I'm in a good spot..

> The case is a Sagitatius 8-bay NAS Chassis from aliexpress

I use
[zfs](https://openzfs.github.io/openzfs-docs/Getting%20Started/index.html)
and recommend you do to.... but this isn't a post about that

My primary zpool is a 12TB ZFS Mirror, and I have another 12TB ZFS Mirror as an
on-prem replica plugged into this same box.

There is a 4TB drive that serves as frigate's media directory - I wanted a
dedicated drive due to the write-intensive nature of the NVR.

> I backup to an offsite box using syncoid

## OS

I am currently running Ubuntu Server 24.04

I am eager for Ubuntu to get zfs in their release that contains the zfs data
corruption with encrypted datasets but I don't expect to see it until 26.04 at
the earliest _fingers crossed_.

## KVM

I recently purchased a [jetkvm](https://www.jetkvm.com/) and it's exactly what
I need for both my main server and my backup off-site... An amazingly simple
and elegant solution to remote KVM.

## Applications

Currently I use `docker compose` to manage practically everything. Stay tuned
for more about those things

I also have a few ansible playbooks for setting up my shell and some utilities
on my computers, including the server. They're in
[github](https://github.com/pypeaday/ansible-playbooks)

Find more at [[the-homelab]]
