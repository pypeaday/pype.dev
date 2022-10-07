---
templateKey: blog-post
tags: ['homelab']
title: Truenas-And-Wireguard
date: 2022-03-23T00:00:00
published: True
cover: "/static/truenas-and-wireguard.png"

---

## NAS

One of the most common use cases for self-hosting anything is a file share system. 
I have been a fan of [TrueNAS](https://www.truenas.com/) for a while. 
I currently use TrueNAS Core at home, and plan to consider transitioning to TrueNAS Scale soon.

__Blog post forthcoming on that!__ 


## VPN 

I don't write a ton about homelabbing yet but one of the first things to set up whether you have a massive homelab or a little raspberry pi would be a self-hosted VPN.
I have notes on wireguard [here]("/wireguard").

I finally have a need to put my TrueNAS box on my wireguard network in order to transfer files to other devices that are outside my LAN.

There is a handy tutorial on setting this up via the GUI [here](https://www.truenas.com/docs/core/network/wireguard/).
They walk you through setting up 2 tunables wireguard. One to enable the the connection and one to setup the network interface.
Next you create a `Post Init` script which will check that the right directories exist and will copy the wireguard config that hasn't been made yet to the proper location and finally starts wireguard.

The above is just copy/paste from the tutorial but the final step, although not super tricky, isn't the same for everyone as it depends on your wireguard config and network setup.

The final step is for you create the relevant wireguard config (see my post but I just use `pivpn -a`) and send that config over to your TrueNAS box!

For me this final work flow looked like this:

```bash

ssh user@vpn-server

pivpn -a

<follow prompts>

scp ~/configs/truenas.conf root@<truenas ip>:/root/wg0.conf

```

## Bug?

The script in the tutorial for starting the wireguard service is straight forward enough however my TrueNAS box didn't get the wireguard interface up and running on reboot.

Easy enough solution:

```bash
ssh root@<truenas ip>
/usr/local/etc/rc.d/wireguard start
```

We can check that the interface is now working with `ifconfig` and should see something like the following:

```bash 
wg0: flags=8051<UP,POINTOPOINT,RUNNING,MULTICAST> metric 0 mtu 1420
        options=80000<LINKSTATE>
        inet x.x.x.x --> x.x.x.x netmask 0xffffff00
        groups: tun
        nd6 options=101<PERFORMNUD,NO_DAD>
        Opened by PID 1325
```


## Gotcha!

Here's another thing I had to navigate when setting this up.

My `pivpn` configuration sets the endpoint for my wireguard clients to `paynepride.com:<port forwarded to wireguard server>`

What this means is that when I check the wireguard config for TrueNAS which is on my home network it resolves `paynepride.com` to the server I have running my reverse proxy.
However! My reverse proxy is not responsible for my vpn traffic and so the traffic was just getting dropped - instead I needed to change the wireguard config just for my truenas box to piont to the local address of my vpn server.
This really threw me for a loop today but is just another reminder that if you have network problems it's probably DNS...

Give her the 'ol reboot and now if I check `wg` I should see some traffic on my wireguard tunnel!

![Alt text](/images/truenas-wireguard.png "truenas-wireguard")




