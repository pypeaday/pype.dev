---
date: 2025-05-31 08:19:57
templateKey: blog-post
title: homelab-journey-part-1
published: False
tags:
  - homelab
  - tech

---

Done in 13 seconds! Subtitle and audio files are in the outputs folder.

I want to start writing about my homelab and this first post can be a short
introduction to how I got into homelabbing and a review of my current
hardware. I think I'll hopefully write about the evolution of my homelab to get
to this current point and then start writing about updates as new things hit
the lab. So the brief overview is I started with a pi-hole appliance running
on a pi-0 I think. It might have been a pi-3. I think it was a pi-0. So a little
introduction into SSH and foreign operating systems. I was briefly familiar
loosely familiar with Linux so Raspbian. I think I put Debian on it probably. No
probably Raspbian and it seemed like most things were already compiled or the
things I needed had been compiled and so you could just install pi-hole and then
that got me to learn a little bit about networking, DNS, DHCP. From there I came
into a few computers kind of for free that a church was recycling and so now
with new hardware I was starting to play with docker at work and I thought well I
wonder if I could run pi-hole in docker and that opened the door to running
other things in docker. I spun up nextcloud and got myself a reverse proxy
pretty quickly with nginx at first. Oh no it was Freenas. That's what I started
with. I started with Freenas by IX systems. That got me somewhat familiar
with jails and running containers in different ways and then I decided I
wanted Linux so I rebuilt on Ubuntu and there's been several hardware changes
and such in there but that does more or less I guess get me to arrive at where
I'm at today which is I have a few different boxes running pretty standard
operating systems for their purposes and they are as follows. I have a Raspberry
Pi 3 hardwired in that is running pi-hole so that's been a part of my
infrastructure now for a long time. My router is an old Optiplex. I'll find the
link to that. So I'm running a x86 system for my router with OpenSense on
it. Just seemed it to be another home lab standard and I'd like to someday bring
pi-hole over there or use AdGuard or integrate those two things maybe a
little bit more completely but right now they are mostly separate. They're on
tailscale as well so my DNS happens over tailscale. There's a managed switch in
there for some VLAN tomfoolery for my cameras and an IOT network type of a
thing. And then the main appliance I guess well I have a desktop that is my
daily driver but it also runs several containerized workloads for my AI
related activities because I have a 3090 in there. I will do a hardware review
down below. And then the primary application box is running Ubuntu 22 or
24. Most of my applications are containerized and at this moment I am
managing containers using Docker Compose stacks. So many applications have their
own stack but then I also have stacks of many applications. The Compose files are
all organized by host and they're in Git and I use GitHub as my main get back
and remote storage. In that box are two, so for storage there are four
hard drives. They are segmented into two zpools that each have one VDEV in a
mirror. I am using 12 terabyte drives across the board, a few ironwolves, and a
few recycled enterprise drives from serverpartdeals.com. There's another hard
drive in there that's its own zpool that I use as the write cache for my
camera NVR and I boot from NVMe SSD.
So here's the hardware breakdown and then in another post I'll do an overview
of the applications that I run. And here I need to run NeoFetch a bunch for all
of these different machines.

