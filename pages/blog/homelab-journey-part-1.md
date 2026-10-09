---
date: 2025-06-05 08:19:57
templateKey: blog-post
title: homelab-journey-part-1
published: True
tags:
  - homelab
  - tech
  - series-homelab
---

# Introduction

I want to start writing about my homelab and this first post can be a short
introduction to how I got into homelabbing and a review of my current hardware.
I'll hopefully write about the evolution of my homelab to get to this
current point and then start writing about updates as new things hit the lab.

# The Journey

## Applications | Pi-Hole

I started with a pi-hole appliance running on a pi-0 I
had lying around. So, a little introduction into SSH and foreign operating
systems (I was loosely familiar with Linux and so Raspbian wasn't a huge deal
to start with) and then you could just [install pi-hole](https://docs.pi-hole.net/main/basic-install/).
After installing it I got to learn a little bit about networking, DNS, DHCP,
etc. all from just exploring and trying out the features of pi-hole.

## Hardware

From there I happened to come into a few computers kind of for free that a church was
recycling and so now with new-to-me x86 hardware and armed with a tiny bit of
docker experience at work - I thought "well I wonder if I could run pi-hole in
docker on a Linux machine?" and that opened the door to running other things in docker.

# Applications | Free-NAS

I quickly decided I wanted a NAS after talking with a friend at work, and one
of those computers that I inherited was the perfect target for Freenas by iX
systems (Freenas has since morphed into a few things - primarily TrueNAS Core
for the homelabber). That got me somewhat familiar with jails (which is a BSD
concept as FreeNAS was based on FreeBSD, not Linux) and running
containers in different ways and then I decided I wanted Linux so I rebuilt with
Ubuntu.

!!! note ""

    there's been several hardware changes and such in there but that
    does more or less get me to arrive at where I'm at today which is I have a
    few different boxes running pretty standard operating systems for their
    purposes and they are as follows.

# Current Homelab Setup

!!! note "Find updated information at [[the-homelab]]"

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

## NAS / Server

!!! note "stats"

    CPU: Ryzen 7 5700G

    GPU: None right now

    Memory: 128 GB

    Storage: 2x12 TB ZFS Mirror + another 2x12 TB ZFS Mirror + 500GB disk for NVR

    OS: Ubuntu Server 24.04

At the moment I am managing containers using Docker Compose stacks. Many
applications have their own stack but then I also have stacks of many
applications. The Compose files are all organized by host and they're in git
and I use GitHub as my main get back and remote storage.

### Applications

There are currently 74 containers running on my server, I will not list them all but here's some highlights:

- traefik
- portainer
- nextcloud
- jellyfin
- \*arr stack
- code-server
- kanboard

I regularly spin up compose stacks to try new things as I hear about them in
newsletters and such - I will be making an attempt to write about them more
frequently in a homelabbing series
