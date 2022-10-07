---
date: 2022-08-29 06:30:27
templateKey: til
title: Check your SMART status with smartctl
status: published
tags:
  - homelab
  - linux

---

https://www.simplified.guide/linux/disk-health-check

# Install
For ubuntu/debian based distros (which is what I primarly use presently)

`sudo apt update -y && sudo apt install smartmontools -y`

# List hard drives

`lsblk | grep disk` is one way or `sudo lshw -c disk` is another

# smartctl 

Use a device's logical name such as `dev/sda`, not a partition of the disk

`sudo smartctl -t short /dev/sda`

```console
dotfiles   home   ×3  ×2  ×2 via   v3.10.6(dotfiles)  took 11s
❯ sudo smartctl -t short /dev/sda
smartctl 7.1 2019-12-30 r5022 [x86_64-linux-5.15.0-48-generic] (local build)
Copyright (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF OFFLINE IMMEDIATE AND SELF-TEST SECTION ===
Sending command: "Execute SMART Short self-test routine immediately in off-line mode".
Drive command "Execute SMART Short self-test routine immediately in off-line mode" successful.
Testing has begun.
Please wait 2 minutes for test to complete.
Test will complete after Fri Sep 23 05:59:39 2022 CDT
Use smartctl -X to abort test.
```

# check status

`sudo smartctl -H /dev/sda`

```console

dotfiles   home   ×3  ×2  ×2 via   v3.10.6(dotfiles)
❯ sudo smartctl -H /dev/sda
smartctl 7.1 2019-12-30 r5022 [x86_64-linux-5.15.0-48-generic] (local build)
Copyright (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED


```
