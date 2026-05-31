---
date: 2024-11-22 08:08:40
templateKey: til
title: DNS Broke After Reboot - Ubuntu 22.04
published: True
tags:
  - homelab
  - linux
  - tech
  - til
---

I rebooted by server and DNS broke randomly. I have no idea if it was from a kernel update or what but that's the issue with Ubuntu I guess...

After much toil and none of the other options working for me (sorry to not have those documented here) this is what got me the vic from this [SO Post](https://askubuntu.com/questions/1406827/how-to-set-dns-on-ubuntu-22-04-when-you-have-no-netplan-config)

sudo mkdir /etc/systemd/resolved.conf.d/
sudo $EDITOR /etc/systemd/resolved.conf.d/dns_servers.conf

Most folks probably are good with google (8.8.8.8) and cloudflare (1.1.1.1)

```
[Resolve]
DNS=8.8.8.8 1.1.1.1
```

But I decided to use tailscale

```
[Resolve]
DNS=100.100.100.100
```

Then restart systemd-resolved

sudo systemctl restart systemd-resolved
