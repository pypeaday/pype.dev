---
date: 2023-12-31 20:26:50
templateKey: til
title: DHCP Restart to Save Ubuntu 22.04 Server Networking
published: True
tags:
  - homelab
  - linux
  - tech
  - til
---

I moved a computer to a remote location for an off-site backup but when it was powered on it wouldn't show up on any networks. A solution that got me back in was a friend restarting the dhcp client for me:

```bash
sudo dhclient -r -v <interface> && sudo dhclient -v <interface>
```
