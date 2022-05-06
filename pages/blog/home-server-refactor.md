---
templateKey: blog-post
tags: ['blog']
title: Home-Server-Refactor
date: 2022-04-10T00:00:00
status: draft
cover: "/static/home-server-refactor.png"

---

My current homelab setup is not great but it works...

## Proxmox on PowerEdge R610

I boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700 SAS controller.
I cannot boot from a disk using this controller and I can't get the firmware configured in a way to allow it.
So I have 1 SSD as a ZFS array that I've been putting my VM images on, and the 5 HDDs are passed through to a TrueNAS VM where I handle all the ZFS stuff there... kind of meta because I then attached those drives to Proxmox as a CIFS share.

## TrueNAS on dedicated box

I have an on-prem backup that is just an old desktop running TrueNAS
I regularly backup the 5 disk RAIDZ2 array from my Proxmox host (managed by a TrueNAS VM) to this backup box

Currently there is nothing else running on this machine since it's my "backup"

## Jellyfin

I was HWA for Jellyfin, but hardware passthrough on the R610 is finicky or broken so Jellyfin is running on an Ubuntu host.

I could put UBuntu on the R610 and give up "true virtualization". Then I'd manage the SMB share myself.
If I do that then I would get rid of "users" I think, ie. basically forgo least-priviledges since I'm not sure how hard that is to manage.

On the other hand, direct access to the smb config might make it easier?

**I'll play with this on the Jellyfin box which now has 2 disks in it that I can configure as ZFS array and expose over SMB**
