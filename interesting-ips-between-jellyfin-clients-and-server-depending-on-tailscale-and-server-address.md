---
article_html: "<p>When connecting from my phone to jellyfin I'm seeing some interesting
  patterns.</p>\n<h2 id=\"scenarios\">Scenarios</h2>\n<h3 id=\"tailscale-ip-of-phone-is-listed-as-local-network-to-jellyfin\">Tailscale
  IP of phone is listed as local network to jellyfin</h3>\n<p>Wifi: off\nTailscale:
  on\nUse exit node: on\nLAN access: on\nJellyfin: LAN IP</p>\n<p>Jellyfin sees 192.168.1.1,
  my router address</p>\n<hr />\n<p>Wifi: off\ntailscale: on\nUse exit node: on \nLAN
  access: on\nJellyfin: Tailscale magic DNS</p>\n<p>Jellyfin sees the docker bridge
  network</p>\n<p>Q: This might be because of traefik somehow</p>\n<hr />\n<p>Wifi:
  off\ntailsacale: on\nUse exit node: on\nLAN access: off\nJellyfin: LAN IP</p>\n<p>Jellyfin
  sees the 192.168.1.1</p>\n<p>Q: Why did this work even work?</p>\n<hr />\n<p>Wifi:
  off\ntailsacale: on\nUse exit node: on\nLAN access: off\nJellyfin: Tailscale magic
  DNS</p>\n<p>Jellyfin sees the docker bridge network</p>\n<hr />\n<p>Wifi: off\ntailsacale:
  on\nUse exit node: off\nLAN access: off\nJellyfin: LAN IP</p>\n<p>Jellyfin sees
  the 192.168.1.1</p>\n<p>Q: Why did this work?</p>\n<hr />\n<p>Wifi: off\ntailsacale:
  on\nUse exit node: off\nLAN access: off\nJellyfin: Tailscale magic DNS</p>\n<p>Jellyfin
  sees the docker bridge network</p>\n<hr />\n<p>Wifi: on\ntailsacale: of\nUse exit
  node: off\nLAN access: off\nJellyfin: LAN IP (via pihole DNS)</p>\n<p>Jellyfin sees
  the IP of my phone</p>\n<hr />\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/how-i-use-nextcloud-for-safe-central-storage'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>How
  I use Nextcloud for safe central storage</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/tiddly-wiki'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Tiddly-Wiki</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2024-07-12
datetime: 2024-07-12 00:00:00+00:00
description: 'When connecting from my phone to jellyfin I Wifi: off Jellyfin sees
  192.168.1.1, my router address Wifi: off Jellyfin sees the docker bridge network
  Q: This mig'
edit_link: https://github.com/edit/main/pages/blog/interesting-ips-between-jellyfin-clients-and-server-depending-on-tailscale-and-server-address.md
html: "<p>When connecting from my phone to jellyfin I'm seeing some interesting patterns.</p>\n<h2
  id=\"scenarios\">Scenarios</h2>\n<h3 id=\"tailscale-ip-of-phone-is-listed-as-local-network-to-jellyfin\">Tailscale
  IP of phone is listed as local network to jellyfin</h3>\n<p>Wifi: off\nTailscale:
  on\nUse exit node: on\nLAN access: on\nJellyfin: LAN IP</p>\n<p>Jellyfin sees 192.168.1.1,
  my router address</p>\n<hr />\n<p>Wifi: off\ntailscale: on\nUse exit node: on \nLAN
  access: on\nJellyfin: Tailscale magic DNS</p>\n<p>Jellyfin sees the docker bridge
  network</p>\n<p>Q: This might be because of traefik somehow</p>\n<hr />\n<p>Wifi:
  off\ntailsacale: on\nUse exit node: on\nLAN access: off\nJellyfin: LAN IP</p>\n<p>Jellyfin
  sees the 192.168.1.1</p>\n<p>Q: Why did this work even work?</p>\n<hr />\n<p>Wifi:
  off\ntailsacale: on\nUse exit node: on\nLAN access: off\nJellyfin: Tailscale magic
  DNS</p>\n<p>Jellyfin sees the docker bridge network</p>\n<hr />\n<p>Wifi: off\ntailsacale:
  on\nUse exit node: off\nLAN access: off\nJellyfin: LAN IP</p>\n<p>Jellyfin sees
  the 192.168.1.1</p>\n<p>Q: Why did this work?</p>\n<hr />\n<p>Wifi: off\ntailsacale:
  on\nUse exit node: off\nLAN access: off\nJellyfin: Tailscale magic DNS</p>\n<p>Jellyfin
  sees the docker bridge network</p>\n<hr />\n<p>Wifi: on\ntailsacale: of\nUse exit
  node: off\nLAN access: off\nJellyfin: LAN IP (via pihole DNS)</p>\n<p>Jellyfin sees
  the IP of my phone</p>\n<hr />\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/how-i-use-nextcloud-for-safe-central-storage'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>How
  I use Nextcloud for safe central storage</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/tiddly-wiki'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Tiddly-Wiki</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'When connecting from my phone to jellyfin I Wifi: off Jellyfin
  sees 192.168.1.1, my router address Wifi: off Jellyfin sees the docker bridge network
  Q: This might be because of traefik somehow Wifi: off Jellyfin sees the 192.168.1.1
  Q: Why did this w'
now: 2024-10-12 11:09:11.872352
path: pages/blog/interesting-ips-between-jellyfin-clients-and-server-depending-on-tailscale-and-server-address.md
published: false
slug: interesting-ips-between-jellyfin-clients-and-server-depending-on-tailscale-and-server-address
super_description: 'When connecting from my phone to jellyfin I Wifi: off Jellyfin
  sees 192.168.1.1, my router address Wifi: off Jellyfin sees the docker bridge network
  Q: This might be because of traefik somehow Wifi: off Jellyfin sees the 192.168.1.1
  Q: Why did this work even work? Wifi: off Jellyfin sees the docker bridge network
  Wifi: off Jellyfin sees the 192.168.1.1 Q: Why did this work? Wifi: off Jellyfin
  sees the docker bridge network Wifi: on Jellyfin sees the IP of my phone'
tags:
- homelab
- linux
- tech
templateKey: blog-post
title: Interesting IPs between Jellyfin clients and server depending on tailscale
  and server address
today: 2024-10-12
---

When connecting from my phone to jellyfin I'm seeing some interesting patterns.

## Scenarios

### Tailscale IP of phone is listed as local network to jellyfin

Wifi: off
Tailscale: on
Use exit node: on
LAN access: on
Jellyfin: LAN IP

Jellyfin sees 192.168.1.1, my router address

***

Wifi: off
tailscale: on
Use exit node: on 
LAN access: on
Jellyfin: Tailscale magic DNS

Jellyfin sees the docker bridge network

Q: This might be because of traefik somehow

***

Wifi: off
tailsacale: on
Use exit node: on
LAN access: off
Jellyfin: LAN IP

Jellyfin sees the 192.168.1.1

Q: Why did this work even work?

***

Wifi: off
tailsacale: on
Use exit node: on
LAN access: off
Jellyfin: Tailscale magic DNS

Jellyfin sees the docker bridge network

***

Wifi: off
tailsacale: on
Use exit node: off
LAN access: off
Jellyfin: LAN IP

Jellyfin sees the 192.168.1.1

Q: Why did this work?

***

Wifi: off
tailsacale: on
Use exit node: off
LAN access: off
Jellyfin: Tailscale magic DNS

Jellyfin sees the docker bridge network

***

Wifi: on
tailsacale: of
Use exit node: off
LAN access: off
Jellyfin: LAN IP (via pihole DNS)

Jellyfin sees the IP of my phone

***
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
    
    <a class='prev' href='/how-i-use-nextcloud-for-safe-central-storage'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>How I use Nextcloud for safe central storage</p>
        </div>
    </a>
    
    <a class='next' href='/tiddly-wiki'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Tiddly-Wiki</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>