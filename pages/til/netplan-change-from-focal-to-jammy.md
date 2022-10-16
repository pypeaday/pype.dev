---
date: 2022-05-22 13:23:17
templateKey: til
title: Netplan change from Focal to Jammy
published: True
tags:
  - homelab
  - linux
  - tech

---

I am revamping my home server and bumped myself early up to Jammy Jellyfish...
however to my peril I reused my netplan config and after hitting my server with
the 'ol `netplan apply` I lost connection...
DNS still seemed to kinda work externally, but internally nothing was up... 

Turns out Netplan got a little change in how to express the `gateway` key in the netplan config!

Old Ubuntu 20.04 way

```yaml
network:
  version: 2
  ethernets:
    enp0s4:
      addresses: [192.168.1.{Static IP}/24]
      gateway4: 192.168.1.1  # <-- This changes!
      nameservers:
        addresses: [192.168.1.1, 1.1.1.1]
```

New jammin way for Jammy Jellyfish (__at least that worked for me__)
```yaml
network:
  version: 2
  ethernets:
    enp0s4:
      addresses: [192.168.1.{Static IP}/24]
      routes:
        - to: default
          via: 192.168.1.1 
      nameservers:
        addresses: [192.168.1.1, 1.1.1.1]
```
