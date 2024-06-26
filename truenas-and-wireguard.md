---
article_html: "<h2 id=\"nas\">NAS</h2>\n<p>One of the most common use cases for self-hosting
  anything is a file share system. \nI have been a fan of <a href=\"https://www.truenas.com/\">TrueNAS</a>
  for a while. \nI currently use TrueNAS Core at home, and plan to consider transitioning
  to TrueNAS Scale soon.</p>\n<p><strong>Blog post forthcoming on that!</strong> </p>\n<h2
  id=\"vpn\">VPN</h2>\n<p>I don't write a ton about homelabbing yet but one of the
  first things to set up whether you have a massive homelab or a little raspberry
  pi would be a self-hosted VPN.\nI have notes on wireguard <a href=\"\" title=\"/wireguard\">here</a>.</p>\n<p>I
  finally have a need to put my TrueNAS box on my wireguard network in order to transfer
  files to other devices that are outside my LAN.</p>\n<p>There is a handy tutorial
  on setting this up via the GUI <a href=\"https://www.truenas.com/docs/core/network/wireguard/\">here</a>.\nThey
  walk you through setting up 2 tunables wireguard. One to enable the the connection
  and one to setup the network interface.\nNext you create a <code>Post Init</code>
  script which will check that the right directories exist and will copy the wireguard
  config that hasn't been made yet to the proper location and finally starts wireguard.</p>\n<p>The
  above is just copy/paste from the tutorial but the final step, although not super
  tricky, isn't the same for everyone as it depends on your wireguard config and network
  setup.</p>\n<p>The final step is for you create the relevant wireguard config (see
  my post but I just use <code>pivpn -a</code>) and send that config over to your
  TrueNAS box!</p>\n<p>For me this final work flow looked like this:</p>\n<div class=\"highlight\"><pre><span></span><code>ssh<span
  class=\"w\"> </span>user@vpn-server\n\npivpn<span class=\"w\"> </span>-a\n\n&lt;follow<span
  class=\"w\"> </span>prompts&gt;\n\nscp<span class=\"w\"> </span>~/configs/truenas.conf<span
  class=\"w\"> </span>root@&lt;truenas<span class=\"w\"> </span>ip&gt;:/root/wg0.conf\n</code></pre></div>\n<h2
  id=\"bug\">Bug?</h2>\n<p>The script in the tutorial for starting the wireguard service
  is straight forward enough however my TrueNAS box didn't get the wireguard interface
  up and running on reboot.</p>\n<p>Easy enough solution:</p>\n<div class=\"highlight\"><pre><span></span><code>ssh<span
  class=\"w\"> </span>root@&lt;truenas<span class=\"w\"> </span>ip&gt;\n/usr/local/etc/rc.d/wireguard<span
  class=\"w\"> </span>start\n</code></pre></div>\n<p>We can check that the interface
  is now working with <code>ifconfig</code> and should see something like the following:</p>\n<div
  class=\"highlight\"><pre><span></span><code>wg0:<span class=\"w\"> </span><span
  class=\"nv\">flags</span><span class=\"o\">=</span><span class=\"m\">8051</span>&lt;UP,POINTOPOINT,RUNNING,MULTICAST&gt;<span
  class=\"w\"> </span>metric<span class=\"w\"> </span><span class=\"m\">0</span><span
  class=\"w\"> </span>mtu<span class=\"w\"> </span><span class=\"m\">1420</span>\n<span
  class=\"w\">        </span><span class=\"nv\">options</span><span class=\"o\">=</span><span
  class=\"m\">80000</span>&lt;LINKSTATE&gt;\n<span class=\"w\">        </span>inet<span
  class=\"w\"> </span>x.x.x.x<span class=\"w\"> </span>--&gt;<span class=\"w\"> </span>x.x.x.x<span
  class=\"w\"> </span>netmask<span class=\"w\"> </span>0xffffff00\n<span class=\"w\">
  \       </span>groups:<span class=\"w\"> </span>tun\n<span class=\"w\">        </span>nd6<span
  class=\"w\"> </span><span class=\"nv\">options</span><span class=\"o\">=</span><span
  class=\"m\">101</span>&lt;PERFORMNUD,NO_DAD&gt;\n<span class=\"w\">        </span>Opened<span
  class=\"w\"> </span>by<span class=\"w\"> </span>PID<span class=\"w\"> </span><span
  class=\"m\">1325</span>\n</code></pre></div>\n<h2 id=\"gotcha\">Gotcha!</h2>\n<p>Here's
  another thing I had to navigate when setting this up.</p>\n<p>My <code>pivpn</code>
  configuration sets the endpoint for my wireguard clients to <code>paynepride.com:&lt;port
  forwarded to wireguard server&gt;</code></p>\n<p>What this means is that when I
  check the wireguard config for TrueNAS which is on my home network it resolves <code>paynepride.com</code>
  to the server I have running my reverse proxy.\nHowever! My reverse proxy is not
  responsible for my vpn traffic and so the traffic was just getting dropped - instead
  I needed to change the wireguard config just for my truenas box to piont to the
  local address of my vpn server.\nThis really threw me for a loop today but is just
  another reminder that if you have network problems it's probably DNS...</p>\n<p>Give
  her the 'ol reboot and now if I check <code>wg</code> I should see some traffic
  on my wireguard tunnel!</p>\n<p><img alt=\"Alt text\" src=\"/images/truenas-wireguard.png\"
  title=\"truenas-wireguard\" /></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
  \   :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/self-hosted-media'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>self-hosted-media</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/skimpy'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Skimpy</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/truenas-and-wireguard.png
date: 2022-03-23
datetime: 2022-03-23 00:00:00+00:00
description: 'One of the most common use cases for self-hosting anything is a file
  share system. I don I finally have a need to put my TrueNAS box on my wireguard
  network in '
edit_link: https://github.com/edit/main/pages/blog/truenas-and-wireguard.md
html: "<h2 id=\"nas\">NAS</h2>\n<p>One of the most common use cases for self-hosting
  anything is a file share system. \nI have been a fan of <a href=\"https://www.truenas.com/\">TrueNAS</a>
  for a while. \nI currently use TrueNAS Core at home, and plan to consider transitioning
  to TrueNAS Scale soon.</p>\n<p><strong>Blog post forthcoming on that!</strong> </p>\n<h2
  id=\"vpn\">VPN</h2>\n<p>I don't write a ton about homelabbing yet but one of the
  first things to set up whether you have a massive homelab or a little raspberry
  pi would be a self-hosted VPN.\nI have notes on wireguard <a href=\"\" title=\"/wireguard\">here</a>.</p>\n<p>I
  finally have a need to put my TrueNAS box on my wireguard network in order to transfer
  files to other devices that are outside my LAN.</p>\n<p>There is a handy tutorial
  on setting this up via the GUI <a href=\"https://www.truenas.com/docs/core/network/wireguard/\">here</a>.\nThey
  walk you through setting up 2 tunables wireguard. One to enable the the connection
  and one to setup the network interface.\nNext you create a <code>Post Init</code>
  script which will check that the right directories exist and will copy the wireguard
  config that hasn't been made yet to the proper location and finally starts wireguard.</p>\n<p>The
  above is just copy/paste from the tutorial but the final step, although not super
  tricky, isn't the same for everyone as it depends on your wireguard config and network
  setup.</p>\n<p>The final step is for you create the relevant wireguard config (see
  my post but I just use <code>pivpn -a</code>) and send that config over to your
  TrueNAS box!</p>\n<p>For me this final work flow looked like this:</p>\n<div class=\"highlight\"><pre><span></span><code>ssh<span
  class=\"w\"> </span>user@vpn-server\n\npivpn<span class=\"w\"> </span>-a\n\n&lt;follow<span
  class=\"w\"> </span>prompts&gt;\n\nscp<span class=\"w\"> </span>~/configs/truenas.conf<span
  class=\"w\"> </span>root@&lt;truenas<span class=\"w\"> </span>ip&gt;:/root/wg0.conf\n</code></pre></div>\n<h2
  id=\"bug\">Bug?</h2>\n<p>The script in the tutorial for starting the wireguard service
  is straight forward enough however my TrueNAS box didn't get the wireguard interface
  up and running on reboot.</p>\n<p>Easy enough solution:</p>\n<div class=\"highlight\"><pre><span></span><code>ssh<span
  class=\"w\"> </span>root@&lt;truenas<span class=\"w\"> </span>ip&gt;\n/usr/local/etc/rc.d/wireguard<span
  class=\"w\"> </span>start\n</code></pre></div>\n<p>We can check that the interface
  is now working with <code>ifconfig</code> and should see something like the following:</p>\n<div
  class=\"highlight\"><pre><span></span><code>wg0:<span class=\"w\"> </span><span
  class=\"nv\">flags</span><span class=\"o\">=</span><span class=\"m\">8051</span>&lt;UP,POINTOPOINT,RUNNING,MULTICAST&gt;<span
  class=\"w\"> </span>metric<span class=\"w\"> </span><span class=\"m\">0</span><span
  class=\"w\"> </span>mtu<span class=\"w\"> </span><span class=\"m\">1420</span>\n<span
  class=\"w\">        </span><span class=\"nv\">options</span><span class=\"o\">=</span><span
  class=\"m\">80000</span>&lt;LINKSTATE&gt;\n<span class=\"w\">        </span>inet<span
  class=\"w\"> </span>x.x.x.x<span class=\"w\"> </span>--&gt;<span class=\"w\"> </span>x.x.x.x<span
  class=\"w\"> </span>netmask<span class=\"w\"> </span>0xffffff00\n<span class=\"w\">
  \       </span>groups:<span class=\"w\"> </span>tun\n<span class=\"w\">        </span>nd6<span
  class=\"w\"> </span><span class=\"nv\">options</span><span class=\"o\">=</span><span
  class=\"m\">101</span>&lt;PERFORMNUD,NO_DAD&gt;\n<span class=\"w\">        </span>Opened<span
  class=\"w\"> </span>by<span class=\"w\"> </span>PID<span class=\"w\"> </span><span
  class=\"m\">1325</span>\n</code></pre></div>\n<h2 id=\"gotcha\">Gotcha!</h2>\n<p>Here's
  another thing I had to navigate when setting this up.</p>\n<p>My <code>pivpn</code>
  configuration sets the endpoint for my wireguard clients to <code>paynepride.com:&lt;port
  forwarded to wireguard server&gt;</code></p>\n<p>What this means is that when I
  check the wireguard config for TrueNAS which is on my home network it resolves <code>paynepride.com</code>
  to the server I have running my reverse proxy.\nHowever! My reverse proxy is not
  responsible for my vpn traffic and so the traffic was just getting dropped - instead
  I needed to change the wireguard config just for my truenas box to piont to the
  local address of my vpn server.\nThis really threw me for a loop today but is just
  another reminder that if you have network problems it's probably DNS...</p>\n<p>Give
  her the 'ol reboot and now if I check <code>wg</code> I should see some traffic
  on my wireguard tunnel!</p>\n<p><img alt=\"Alt text\" src=\"/images/truenas-wireguard.png\"
  title=\"truenas-wireguard\" /></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
  \   :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/self-hosted-media'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>self-hosted-media</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/skimpy'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Skimpy</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: One of the most common use cases for self-hosting anything is a
  file share system. I don I finally have a need to put my TrueNAS box on my wireguard
  network in order to transfer files to other devices that are outside my LAN. There
  is a handy tutoria
now: 2024-06-26 16:50:21.524213
path: pages/blog/truenas-and-wireguard.md
published: true
slug: truenas-and-wireguard
super_description: One of the most common use cases for self-hosting anything is a
  file share system. I don I finally have a need to put my TrueNAS box on my wireguard
  network in order to transfer files to other devices that are outside my LAN. There
  is a handy tutorial on setting this up via the GUI  The above is just copy/paste
  from the tutorial but the final step, although not super tricky, isn The final step
  is for you create the relevant wireguard config (see my post but I just use  For
  me this final work flo
tags:
- homelab
- tech
templateKey: blog-post
title: Truenas-And-Wireguard
today: 2024-06-26
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
<div class='prevnext'>

    <style type='text/css'>

    :root {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="light"] {
      --prevnext-color-text: #1f2022;
      --prevnext-color-angle: #ffeb00;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="dark"] {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    .prevnext {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }
    .prevnext a {
      display: flex;
      align-items: center;
      width: 100%;
      text-decoration: none;
    }
    a.next {
      justify-content: flex-end;
    }
    .prevnext a:hover {
      background: #00000006;
    }
    .prevnext-subtitle {
      color: var(--prevnext-color-text);
      filter: brightness(var(--prevnext-subtitle-brightness));
      font-size: .8rem;
    }
    .prevnext-title {
      color: var(--prevnext-color-text);
      font-size: 1rem;
    }
    .prevnext-text {
      max-width: 30vw;
    }
    </style>
    
    <a class='prev' href='/self-hosted-media'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>self-hosted-media</p>
        </div>
    </a>
    
    <a class='next' href='/skimpy'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Skimpy</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>