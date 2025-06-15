---
date: 2025-06-15 08:42:09
templateKey: blog-post
title: U-Blue Aurora Upgrade Broke HWA Docker
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250615211459_f9af91c6.png"
tags:
  - homelab
  - tech
  - universal-blue

---

I use Universal Blue's [Aurora](https://getaurora.dev/en) distribution on my daily driver desktop, and
I rebooted today which led what I imagine is a kernel update. This broke all of
my docker containers using a GPU.

```
nvidia-container-cli: detection error: open failed: /usr/lib/libnvidia-tls.so.570.153.02: no such file or directory: unknown
```

Thankfully a reboot and booting into the older environment fixes everything...
Linux and immutability FTW

## Related

* [Discorse Thread](https://universal-blue.discourse.group/t/cannot-use-nvidia-runtime-in-docker-since-update-to-fedora-42/8812/3)

