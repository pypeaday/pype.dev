---
article_html: "<p>My current homelab setup is not great but it works...</p>\n<h1 id=\"proxmox-on-poweredge-r610\">Proxmox
  on PowerEdge R610</h1>\n<p>I boot off an SD card and have 1 SSD and 5 HDDs configured
  as a JBOD array using a Dell H700 SAS controller.\nI cannot boot from a disk using
  this controller and I can't get the firmware configured in a way to allow it.\nSo
  I have 1 SSD as a ZFS array that I've been putting my VM images on, and the 5 HDDs
  are passed through to a TrueNAS VM where I handle all the ZFS stuff there... kind
  of meta because I then attached those drives to Proxmox as a CIFS share.</p>\n<h1
  id=\"truenas-on-dedicated-box\">TrueNAS on dedicated box</h1>\n<p>I have an on-prem
  backup that is just an old desktop running TrueNAS\nI regularly backup the 5 disk
  RAIDZ2 array from my Proxmox host (managed by a TrueNAS VM) to this backup box</p>\n<p>Currently
  there is nothing else running on this machine since it's my \"backup\"</p>\n<h1
  id=\"jellyfin\">Jellyfin</h1>\n<p>I was HWA for Jellyfin, but hardware passthrough
  on the R610 is finicky or broken so Jellyfin is running on an Ubuntu host.</p>\n<p>I
  could put UBuntu on the R610 and give up \"true virtualization\". Then I'd manage
  the SMB share myself.\nIf I do that then I would get rid of \"users\" I think, ie.
  basically forgo least-priviledges since I'm not sure how hard that is to manage.</p>\n<p>On
  the other hand, direct access to the smb config might make it easier?</p>\n<p>I
  have the media array on Jellyfin box setup as NFS which was really easy with ZFS...
  I think SMB would be just as easy.</p>\n<h1 id=\"plan-of-attack\">Plan of attack...</h1>\n<ol>\n<li>Move
  all vm disks to individual datasets on the NAS </li>\n<li>Backup docker data...
  not sure how well this will work, maybe just start over?</li>\n<li>Clean up Ansible
  playbooks on the user side of things - stick with neville vs just using my own name?</li>\n<li>Install
  Ubuntu 20 or 22 on a 2.5\" drive that I'll toss in this SSD enclosure (or a usb
  thumb stick?)</li>\n<li>Re-deploy everything with ansible-playbook and configure...</li>\n</ol>\n<h2
  id=\"configuration\">Configuration...</h2>\n<ol>\n<li>THE FREAKING NAS -&gt; just
  import zfs array and configure SMB?</li>\n</ol>\n<p>1.~~ Nextcloud users and connections..
  might be able to just copy the data folder? not sure about the database... try spinning
  it up in the sandbox vm and see if stuff is there ~~\n2.~~ *arr suite, media profiles
  and connections to transmission... nothing major~~\n3. transmission - should be
  deploy and go\n4. ombi and jackett should also just work after some config again\n5.
  <del>traefik should just work</del>\n6. <del>try to bring up pi-hole from the vm
  that's already running</del>\n7. <del>heimdall will hopefully just be copying the
  data folder from the existind docker one'</del>\n8.~~ booksonic can be reconfigured
  easily~~\n9. <del>portainer... hopefully just copying data folder over?</del>\n10.
  <del>littlelink</del>, small-group-notes, and blog (at home) will need manually
  re-deployed once Ubuntu is installed bare-metal</p>\n<h2 id=\"big-big-big-todos\">BIG
  BIG BIG TODOS</h2>\n<ol>\n<li>Sanoid/syncoid! Get snapshots going and backups configured
  with on prem TrueNAS</li>\n<li>Wireguard setup on DA.</li>\n<li>network share on
  printer for paperless\n<del>4. update peperless in ansible-nas</del></li>\n<li><del>Just
  deploy paperless manually... monitor/manage with portainer</del></li>\n<li>\n<p>booksonic
  not seeing audiobooks/podcasts</p>\n</li>\n<li>\n<p>need a smb user to map nas/documents
  to the printer for paperless</p>\n</li>\n<li>wireguard setup now on kps phone, desktop,
  server (and backup truenas?), and dad's pi</li>\n<li><del>verify lan services work</del></li>\n<li><del>Tdar
  so Jellyfin can work better</del></li>\n</ol>\n<p>Snapshot business might be cause
  of all the docker containers and docker using\nZFS backend... take everything down
  and try removing</p>\n<ol>\n<li>file browser - currently I just one-clicked in portainer,
  I want to make a stack with my own config file which I'll rip from techno tip and
  then add my traefik lables too</li>\n</ol>\n<p>Forget filebrowser - going to just
  use Nextcloud for how it's supposed to be used.\n3. Need to organize those files
  in nextcloud</p>\n<h2 id=\"check-this-ran-as-cp-utility-in-tmux-window-no-progress-bars-or-anything-its-in-ansible-nas-session-window-3\">CHECK
  THIS -&gt;  ran as 'cp' utility in tmux window, no progress bars or anything. it's
  in ansible-nas session -&gt; window 3</h2>\n<p>Olivet bible stuff going to /tmp/olivet/
  -&gt; will move this to nextcloud, ideally by the app via appimage so that the db
  updates and I don't have to run that occ script\nI wnat to organize \"home\" still
  in nextcloud </p>\n<p>setup Sanoid</p>\n<p>clean up bitwarden \nlearn nextcloud
  sharing -&gt; maybe just give a link to grandma?\nrest of todos -&gt; document db
  and sanoid + zfs.rent</p>\n<p>Check on mom's will\ndo media thing for church - split
  vocals on mp3/4</p>\n<p>permission-data playbook changes everything to ansible-nas:ansible-nas
  but then samba task will re-permission some stuff to root:users... this looks fine\nI
  had to add <code>group</code> to the samba config in my playbook to get user auth
  to work with samba\nThis isn't fully working... it works from cli but my python
  process can't write to a folder in dump after 777.... need to learn more?\nSo I
  can make a file after adding the ansible-nas group to config, but I still cannot
  make a directory on the smb mount...</p>\n<p>ADDING <code>inherit permission = yes</code>
  under <code>[global]</code> in the smb.conf worked!</p>\n<p>still not working from
  printer...\nI think what I want is to setup 2 scan options - single docs right to
  paperless, or combined scans to dump, then manually split and send to paperless</p>\n<div
  class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    [data-theme=\"light\"] {\n      --prevnext-color-text: #1f2022;\n
  \     --prevnext-color-angle: #ffeb00;\n      --prevnext-subtitle-brightness: 3;\n
  \   }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    .prevnext {\n      display:
  flex;\n      flex-direction: row;\n      justify-content: space-around;\n      align-items:
  flex-start;\n    }\n    .prevnext a {\n      display: flex;\n      align-items:
  center;\n      width: 100%;\n      text-decoration: none;\n    }\n    a.next {\n
  \     justify-content: flex-end;\n    }\n    .prevnext a:hover {\n      background:
  #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/plotly-and-streamlit'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Plotly-And-Streamlit</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/jellyfin-media-players'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Jellyfin-Media-Players</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: /static/home-server-refactor.png
date: 2022-04-10
datetime: 2022-04-10 00:00:00+00:00
description: My current homelab setup is not great but it works... I boot off an SD
  card and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700 SAS
  controlle
edit_link: https://github.com/edit/main/pages/blog/home-server-refactor.md
html: "<p>My current homelab setup is not great but it works...</p>\n<h1 id=\"proxmox-on-poweredge-r610\">Proxmox
  on PowerEdge R610</h1>\n<p>I boot off an SD card and have 1 SSD and 5 HDDs configured
  as a JBOD array using a Dell H700 SAS controller.\nI cannot boot from a disk using
  this controller and I can't get the firmware configured in a way to allow it.\nSo
  I have 1 SSD as a ZFS array that I've been putting my VM images on, and the 5 HDDs
  are passed through to a TrueNAS VM where I handle all the ZFS stuff there... kind
  of meta because I then attached those drives to Proxmox as a CIFS share.</p>\n<h1
  id=\"truenas-on-dedicated-box\">TrueNAS on dedicated box</h1>\n<p>I have an on-prem
  backup that is just an old desktop running TrueNAS\nI regularly backup the 5 disk
  RAIDZ2 array from my Proxmox host (managed by a TrueNAS VM) to this backup box</p>\n<p>Currently
  there is nothing else running on this machine since it's my \"backup\"</p>\n<h1
  id=\"jellyfin\">Jellyfin</h1>\n<p>I was HWA for Jellyfin, but hardware passthrough
  on the R610 is finicky or broken so Jellyfin is running on an Ubuntu host.</p>\n<p>I
  could put UBuntu on the R610 and give up \"true virtualization\". Then I'd manage
  the SMB share myself.\nIf I do that then I would get rid of \"users\" I think, ie.
  basically forgo least-priviledges since I'm not sure how hard that is to manage.</p>\n<p>On
  the other hand, direct access to the smb config might make it easier?</p>\n<p>I
  have the media array on Jellyfin box setup as NFS which was really easy with ZFS...
  I think SMB would be just as easy.</p>\n<h1 id=\"plan-of-attack\">Plan of attack...</h1>\n<ol>\n<li>Move
  all vm disks to individual datasets on the NAS </li>\n<li>Backup docker data...
  not sure how well this will work, maybe just start over?</li>\n<li>Clean up Ansible
  playbooks on the user side of things - stick with neville vs just using my own name?</li>\n<li>Install
  Ubuntu 20 or 22 on a 2.5\" drive that I'll toss in this SSD enclosure (or a usb
  thumb stick?)</li>\n<li>Re-deploy everything with ansible-playbook and configure...</li>\n</ol>\n<h2
  id=\"configuration\">Configuration...</h2>\n<ol>\n<li>THE FREAKING NAS -&gt; just
  import zfs array and configure SMB?</li>\n</ol>\n<p>1.~~ Nextcloud users and connections..
  might be able to just copy the data folder? not sure about the database... try spinning
  it up in the sandbox vm and see if stuff is there ~~\n2.~~ *arr suite, media profiles
  and connections to transmission... nothing major~~\n3. transmission - should be
  deploy and go\n4. ombi and jackett should also just work after some config again\n5.
  <del>traefik should just work</del>\n6. <del>try to bring up pi-hole from the vm
  that's already running</del>\n7. <del>heimdall will hopefully just be copying the
  data folder from the existind docker one'</del>\n8.~~ booksonic can be reconfigured
  easily~~\n9. <del>portainer... hopefully just copying data folder over?</del>\n10.
  <del>littlelink</del>, small-group-notes, and blog (at home) will need manually
  re-deployed once Ubuntu is installed bare-metal</p>\n<h2 id=\"big-big-big-todos\">BIG
  BIG BIG TODOS</h2>\n<ol>\n<li>Sanoid/syncoid! Get snapshots going and backups configured
  with on prem TrueNAS</li>\n<li>Wireguard setup on DA.</li>\n<li>network share on
  printer for paperless\n<del>4. update peperless in ansible-nas</del></li>\n<li><del>Just
  deploy paperless manually... monitor/manage with portainer</del></li>\n<li>\n<p>booksonic
  not seeing audiobooks/podcasts</p>\n</li>\n<li>\n<p>need a smb user to map nas/documents
  to the printer for paperless</p>\n</li>\n<li>wireguard setup now on kps phone, desktop,
  server (and backup truenas?), and dad's pi</li>\n<li><del>verify lan services work</del></li>\n<li><del>Tdar
  so Jellyfin can work better</del></li>\n</ol>\n<p>Snapshot business might be cause
  of all the docker containers and docker using\nZFS backend... take everything down
  and try removing</p>\n<ol>\n<li>file browser - currently I just one-clicked in portainer,
  I want to make a stack with my own config file which I'll rip from techno tip and
  then add my traefik lables too</li>\n</ol>\n<p>Forget filebrowser - going to just
  use Nextcloud for how it's supposed to be used.\n3. Need to organize those files
  in nextcloud</p>\n<h2 id=\"check-this-ran-as-cp-utility-in-tmux-window-no-progress-bars-or-anything-its-in-ansible-nas-session-window-3\">CHECK
  THIS -&gt;  ran as 'cp' utility in tmux window, no progress bars or anything. it's
  in ansible-nas session -&gt; window 3</h2>\n<p>Olivet bible stuff going to /tmp/olivet/
  -&gt; will move this to nextcloud, ideally by the app via appimage so that the db
  updates and I don't have to run that occ script\nI wnat to organize \"home\" still
  in nextcloud </p>\n<p>setup Sanoid</p>\n<p>clean up bitwarden \nlearn nextcloud
  sharing -&gt; maybe just give a link to grandma?\nrest of todos -&gt; document db
  and sanoid + zfs.rent</p>\n<p>Check on mom's will\ndo media thing for church - split
  vocals on mp3/4</p>\n<p>permission-data playbook changes everything to ansible-nas:ansible-nas
  but then samba task will re-permission some stuff to root:users... this looks fine\nI
  had to add <code>group</code> to the samba config in my playbook to get user auth
  to work with samba\nThis isn't fully working... it works from cli but my python
  process can't write to a folder in dump after 777.... need to learn more?\nSo I
  can make a file after adding the ansible-nas group to config, but I still cannot
  make a directory on the smb mount...</p>\n<p>ADDING <code>inherit permission = yes</code>
  under <code>[global]</code> in the smb.conf worked!</p>\n<p>still not working from
  printer...\nI think what I want is to setup 2 scan options - single docs right to
  paperless, or combined scans to dump, then manually split and send to paperless</p>\n<div
  class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    [data-theme=\"light\"] {\n      --prevnext-color-text: #1f2022;\n
  \     --prevnext-color-angle: #ffeb00;\n      --prevnext-subtitle-brightness: 3;\n
  \   }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    .prevnext {\n      display:
  flex;\n      flex-direction: row;\n      justify-content: space-around;\n      align-items:
  flex-start;\n    }\n    .prevnext a {\n      display: flex;\n      align-items:
  center;\n      width: 100%;\n      text-decoration: none;\n    }\n    a.next {\n
  \     justify-content: flex-end;\n    }\n    .prevnext a:hover {\n      background:
  #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/plotly-and-streamlit'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Plotly-And-Streamlit</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/jellyfin-media-players'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Jellyfin-Media-Players</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: My current homelab setup is not great but it works... I boot off
  an SD card and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700
  SAS controller. I have an on-prem backup that is just an old desktop running TrueNAS
  Currently there is
now: 2024-08-01 13:40:17.987263
path: pages/blog/home-server-refactor.md
published: false
slug: home-server-refactor
super_description: My current homelab setup is not great but it works... I boot off
  an SD card and have 1 SSD and 5 HDDs configured as a JBOD array using a Dell H700
  SAS controller. I have an on-prem backup that is just an old desktop running TrueNAS
  Currently there is nothing else running on this machine since it I was HWA for Jellyfin,
  but hardware passthrough on the R610 is finicky or broken so Jellyfin is running
  on an Ubuntu host. I could put UBuntu on the R610 and give up  On the other hand,
  direct access to
tags:
- blog
- tech
templateKey: blog-post
title: Home-Server-Refactor
today: 2024-08-01
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

permission-data playbook changes everything to ansible-nas:ansible-nas but then samba task will re-permission some stuff to root:users... this looks fine
I had to add `group` to the samba config in my playbook to get user auth to work with samba
This isn't fully working... it works from cli but my python process can't write to a folder in dump after 777.... need to learn more?
So I can make a file after adding the ansible-nas group to config, but I still cannot make a directory on the smb mount...

ADDING `inherit permission = yes` under `[global]` in the smb.conf worked!

still not working from printer...
I think what I want is to setup 2 scan options - single docs right to paperless, or combined scans to dump, then manually split and send to paperless
<div class='prevnext'>

    <style type='text/css'>

    :root {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="light"] {
      --prevnext-color-text: #1f2022;
      --prevnext-color-angle: #ffeb00;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="dark"] {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    .prevnext {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }
    .prevnext a {
      display: flex;
      align-items: center;
      width: 100%;
      text-decoration: none;
    }
    a.next {
      justify-content: flex-end;
    }
    .prevnext a:hover {
      background: #00000006;
    }
    .prevnext-subtitle {
      color: var(--prevnext-color-text);
      filter: brightness(var(--prevnext-subtitle-brightness));
      font-size: .8rem;
    }
    .prevnext-title {
      color: var(--prevnext-color-text);
      font-size: 1rem;
    }
    .prevnext-text {
      max-width: 30vw;
    }
    </style>
    
    <a class='prev' href='/plotly-and-streamlit'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Plotly-And-Streamlit</p>
        </div>
    </a>
    
    <a class='next' href='/jellyfin-media-players'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Jellyfin-Media-Players</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>