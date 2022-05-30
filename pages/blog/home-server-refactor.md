---
templateKey: blog-post
tags: ['blog']
title: Home-Server-Refactor
date: 2022-04-10T00:00:00
status: draft
cover: "/static/home-server-refactor.png"

---

My current homelab setup is not great but it works...

# Proxmox on PowerEdge R610

I boot off an SD card and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700 SAS controller.
I cannot boot from a disk using this controller and I can't get the firmware configured in a way to allow it.
So I have 1 SSD as a ZFS array that I've been putting my VM images on, and the 5 HDDs are passed through to a TrueNAS VM where I handle all the ZFS stuff there... kind of meta because I then attached those drives to Proxmox as a CIFS share.

# TrueNAS on dedicated box

I have an on-prem backup that is just an old desktop running TrueNAS
I regularly backup the 5 disk RAIDZ2 array from my Proxmox host (managed by a TrueNAS VM) to this backup box

Currently there is nothing else running on this machine since it's my "backup"

# Jellyfin

I was HWA for Jellyfin, but hardware passthrough on the R610 is finicky or broken so Jellyfin is running on an Ubuntu host.

I could put UBuntu on the R610 and give up "true virtualization". Then I'd manage the SMB share myself.
If I do that then I would get rid of "users" I think, ie. basically forgo least-priviledges since I'm not sure how hard that is to manage.

On the other hand, direct access to the smb config might make it easier?

I have the media array on Jellyfin box setup as NFS which was really easy with ZFS... I think SMB would be just as easy.

# Plan of attack...

1. Move all vm disks to individual datasets on the NAS 
2. Backup docker data... not sure how well this will work, maybe just start over?
3. Clean up Ansible playbooks on the user side of things - stick with neville vs just using my own name?
4. Install Ubuntu 20 or 22 on a 2.5" drive that I'll toss in this SSD enclosure (or a usb thumb stick?)
5. Re-deploy everything with ansible-playbook and configure...

## Configuration...

0. THE FREAKING NAS -> just import zfs array and configure SMB?

1.~~ Nextcloud users and connections.. might be able to just copy the data folder? not sure about the database... try spinning it up in the sandbox vm and see if stuff is there ~~
2.~~ *arr suite, media profiles and connections to transmission... nothing major~~
3. transmission - should be deploy and go
4. ombi and jackett should also just work after some config again
5. ~~traefik should just work~~
6. ~~try to bring up pi-hole from the vm that's already running~~
7. ~~heimdall will hopefully just be copying the data folder from the existind docker one'~~
8.~~ booksonic can be reconfigured easily~~
9. ~~portainer... hopefully just copying data folder over?~~
10. ~~littlelink~~, small-group-notes, and blog (at home) will need manually re-deployed once Ubuntu is installed bare-metal

## BIG BIG BIG TODOS
1. Sanoid/syncoid! Get snapshots going and backups configured with on prem TrueNAS
2. Wireguard setup on DA.
3. network share on printer for paperless
~~4. update peperless in ansible-nas~~
4. ~~Just deploy paperless manually... monitor/manage with portainer~~
5. booksonic not seeing audiobooks/podcasts

1. need a smb user to map nas/documents to the printer for paperless
3. wireguard setup now on kps phone, desktop, server (and backup truenas?), and dad's pi
4. ~~verify lan services work~~
5. ~~Tdar so Jellyfin can work better~~

Snapshot business might be cause of all the docker containers and docker using
ZFS backend... take everything down and try removing

1. file browser - currently I just one-clicked in portainer, I want to make a stack with my own config file which I'll rip from techno tip and then add my traefik lables too

Forget filebrowser - going to just use Nextcloud for how it's supposed to be used.
3. Need to organize those files in nextcloud
## CHECK THIS ->  ran as 'cp' utility in tmux window, no progress bars or anything. it's in ansible-nas session -> window 3
Olivet bible stuff going to /tmp/olivet/ -> will move this to nextcloud, ideally by the app via appimage so that the db updates and I don't have to run that occ script
I wnat to organize "home" still in nextcloud 

setup Sanoid


clean up bitwarden 
learn nextcloud sharing -> maybe just give a link to grandma?
rest of todos -> document db and sanoid + zfs.rent

Check on mom's will


do media thing for church - split vocals on mp3/4
