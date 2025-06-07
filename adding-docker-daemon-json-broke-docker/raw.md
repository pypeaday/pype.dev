---
date: 2022-12-21 10:02:25
templateKey: til
title: Adding docker daemon.json broke docker
published: True
tags:
  - linux
  - tech
  - docker

---

in /lib/systemd/system/docker.service there is an ExecStart command that got placed there when I setup Docker with Ansible - it threw the -H flag which told the daemon what hosts to setup. But I added the "hosts" key in my daemon.json and it broke - so removing the -H flag from the systemd unit fixed it
