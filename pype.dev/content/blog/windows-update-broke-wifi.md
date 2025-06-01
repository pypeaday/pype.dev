---
date: 2025-06-01 14:30:43
templateKey: blog-post
title: Windows Update Broke Wifi
published: False
tags:
  - tech
  - windows

---

After a windows update on a machine I help administer for my church, the wifi
became super finnicky. I had installed a pretty standard AX5400 WiFi 6 PCIe
adapter and things were great for a while. 
The access point is in the worst possible spot in the entire building and that
computer is as far away from it as possible, but we were cooking. Suddenly
though, after an update and reboot the machine quit receiving an IPv4
address... Many applications broke in odd ways, and the
browser connected to some websites but not others. 

It took a lot of troubleshooting because tailscale was in the mix
and in this case, even the DNS issues I think boiled down the network card of
the windows computer not receiving an IPv4 address on the network pired with
there being another USB wifi adapter plugged in that has weak connection (when I
tested it with the WiFi) that might've been causing intermittent succsful
connectivity... Well it's now production because of the update issue with the
PCIe card.

Our medium term plan is to move the AP of the church to somewhere more
convenient after we figure out busting through some concrete walls...

