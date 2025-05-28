---
date: 2025-05-27 19:42:27
templateKey: til
title: Backups are dope
published: True
tags:
  - tech
  - homelab
  - zfs

---

I accidently chown'd -R an app directory and it totally screwed up the database
folder. Luckily I zfs replicate my docker volumes to another drive even on the
same host, so a quick [rsync] from /harbor/encrypted/docker/manyfold to
/tank/encrypted/docker/manyfold got me back up and running since I hadn't
replicated the messed up permission set yet

Q: How to link to my rsync like a pro post?
