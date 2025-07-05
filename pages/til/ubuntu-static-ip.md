---
templateKey: til
tags: ['linux', 'til']
title: Ubuntu-Static-Ip
date: 2022-03-03T00:00:00
published: True
cover: "media/ubuntu-static-ip.png"

---

Sometimes I need to manually set a static IP of a Linux machine. I generally run the latest version of Ubuntu server in my VMs at home.

In Ubuntu 20 I'm able to change up `/etc/netplan/<something>.yml`

```yaml
network:
  version: 2
  ethernets:
    enp0s4:
      addresses: [192.168.1.{Static IP}/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [192.168.1.1, 1.1.1.1]
```

`gateway4` is your router address
`nameservers` is a list of desired DNS servers for that machine to use. I  usually use my router which is configured to use my pi-hole as my primary DNS, then set  `1.1.1.1` (CloudFlare) as a backup

Hit it with the `sudo netplan apply` and you should be good to go!
