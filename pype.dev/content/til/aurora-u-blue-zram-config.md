---
date: 2025-05-27 13:51:27
templateKey: til
title: Aurora U-Blue ZRAM Config
published: True
tags:
  - infrastructure
  - infrastructure
  - tech
  - til

---

I keep running out of space with my swap getting maxxed out... I don't know why but U-Blue uses Zram already and apparently I can easily override the defaults:

in `usr/lib/systemd/zram-generator.conf`

```conf

# This config file enables a /dev/zram0 device with the default settings:
# — size — same as available RAM or 8GB, whichever is less
# — compression — most likely lzo-rle
#
# To disable, uninstall zram-generator-defaults or create empty
# /etc/systemd/zram-generator.conf file.
[zram0]
zram-size = min(ram, 8192)

```

And so I just made my own file in `/etc/systemd/zram-generator.conf`:

```conf

[zram0]
zram-size = min(ram, 16384)

```
