---
date: 2025-06-01 14:30:43
templateKey: blog-post
title: Windows Update Broke Wifi
published: False
tags:
  - tech
  - windows

---

# Windows Update Behind My Back

After an unapproved windows update on a machine I help administer for my church, the wifi
became super finnicky. I had installed a pretty standard AX5400 WiFi 6 PCIe
adapter and things were great for a while.

## ISP and Top-Tier Laziness

The ISP installed the modem and router/AP combo all in one room encased in CMU block in the basement...
That is in the worst possible spot in the entire building and the Windows
computer of note is as far away from it as possible - but we were cooking just fine with that PCIe card. 
Suddenly though, after the update and reboot the machine quit receiving an IPv4
address via that interface... Many applications broke in odd ways, and the
browser connected to some websites but not others. 

## State Matters

It took a lot of troubleshooting because of 2 things in the mix...

* Tailscale
* A second Wi-Fi adapter via USB dongle that was installed while I was out of town (due to the WiFi issues)

So because of these 2 things, and mostly the USB adapter I think, we saw odd
behavior that was inconsistent and hard to explain. After having sorted through a bit, I think the intermittent nature of the problems was due to the USB dongle getting an IPv4 address when the connectivity via the default interface was messed up - I can't claim to know if or how Windows would handle this, but it's the only thing that makes sense to me as to why some of the appliations would work and then randomly fail - it's the USB dongle losing connection... The extra layer is that the bad NIC (the PCIe card) was getting an IPv6 address so the internet connectivity worked EXCEPT FOR THINGS ON MY TAILNET - for example the Nextcloud instance the church backs some data up to... So the issues were hard to pin-point.

## Medium Term Plan...

Our medium term plan is to move the AP of the church to somewhere more
convenient after we figure out busting through some concrete walls...

