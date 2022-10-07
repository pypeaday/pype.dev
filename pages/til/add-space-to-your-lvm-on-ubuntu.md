---
date: 2022-05-26 21:33:55
templateKey: til
title: Add space to your LVM on Ubuntu
published: True
tags:
  - homelab
  - linux

---

I ran out of space on the SSD in my server when doing some file transfers but only 100GB was used of a 256 GB SSD?

# LVM 

When installing Ubuntu live server the default option for how to partition the
disk (in my experience) has been to setup an LVM group that defaults to less
than the available space. Most recently I put Ubuntu server on a 256 GB SSD but
the main partition was formatted as an LVM group with 100GB of storage... I
didn't think anything of this even though I'm mostly used to EXT4.

I think the reason for LVMs is performance, but in hindsight, I don't really
care much about the performance differences, I really just want all my storage
that's fast enough

# Extending the LVM

 A moment of googling brought me to Ubuntu's wiki and I
learned that I can expand my LVM to the space I need...

`sudo lvdisplay` and `sudo pvdisplay` show detailed views of the logical volumes and physical volumes respectively.

Take a look at those and find the volume you need to extend. For me I found this:

```bash
  --- Logical volume ---
  LV Path                /dev/ubuntu-vg/ubuntu-lv
  LV Name                ubuntu-lv
  VG Name                ubuntu-vg
  LV Write Access        read/write
  LV Status              available
  ...
```

There's more that you'll see but this is what's relevant - I need to extend the
`ubuntu-lv` logical volume in the `ubuntu-vg` volume group.

`sudo lvextend -L +50g ubuntu-vg/ubuntu-lv` gives me 50 more GB of storage which should be enough for at least tonight 🤓

[RTFM](https://wiki.ubuntu.com/Lvm)
