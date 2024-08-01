---
article_html: "<h2 id=\"vpn\">VPN</h2>\n<p>Virtual Private Networks are a big deal,
  and this shouldn't be considered anything even close to a guide on using them.\nHere
  are just my notes and some setup for how I use <a href=\"https://www.wireguard.com/\">wireguard</a>
  at home.</p>\n<h2 id=\"wireguard\">Wireguard</h2>\n<p>Wireguard is an awesome peer-to-peer
  VPN tunnel that makes it really easy for me to get into my home network when I'm
  out and about.\nMy main reasons for this are 1. I don't trust public wi-fi and 2.
  I want to use pi-hole for ad blocking when I'm not at home</p>\n<p>Wireguard can
  be configured as a \"peer-to-site\" VPN tunnel as well.\nMy vpn setup let's me jump
  to various machines on my network from anywhere!</p>\n<p>I use <a href=\"https://pivpn.io/\">pivpn</a>
  in a VM that's already running <code>pi-hole</code> to host my wireguard server.\nIt's
  super easy to setup just by following the instructions on the pivpn site.</p>\n<p>The
  reason I like it is that I have a nice <code>cli</code> for managing wireguard configs.</p>\n<div
  class=\"highlight\"><pre><span></span><code>dumbledore@pihole-vpn:~$<span class=\"w\">
  </span>pivpn\n:::<span class=\"w\"> </span>Control<span class=\"w\"> </span>all<span
  class=\"w\"> </span>PiVPN<span class=\"w\"> </span>specific<span class=\"w\"> </span>functions!\n:::\n:::<span
  class=\"w\"> </span>Usage:<span class=\"w\"> </span>pivpn<span class=\"w\"> </span>&lt;command&gt;<span
  class=\"w\"> </span><span class=\"o\">[</span>option<span class=\"o\">]</span>\n:::\n:::<span
  class=\"w\"> </span>Commands:\n:::<span class=\"w\">    </span>-a,<span class=\"w\">
  </span>add<span class=\"w\">              </span>Create<span class=\"w\"> </span>a<span
  class=\"w\"> </span>client<span class=\"w\"> </span>conf<span class=\"w\"> </span>profile\n:::<span
  class=\"w\">    </span>-c,<span class=\"w\"> </span>clients<span class=\"w\">          </span>List<span
  class=\"w\"> </span>any<span class=\"w\"> </span>connected<span class=\"w\"> </span>clients<span
  class=\"w\"> </span>to<span class=\"w\"> </span>the<span class=\"w\"> </span>server\n:::<span
  class=\"w\">    </span>-d,<span class=\"w\"> </span>debug<span class=\"w\">            </span>Start<span
  class=\"w\"> </span>a<span class=\"w\"> </span>debugging<span class=\"w\"> </span>session<span
  class=\"w\"> </span><span class=\"k\">if</span><span class=\"w\"> </span>having<span
  class=\"w\"> </span>trouble\n:::<span class=\"w\">    </span>-l,<span class=\"w\">
  </span>list<span class=\"w\">             </span>List<span class=\"w\"> </span>all<span
  class=\"w\"> </span>clients\n:::<span class=\"w\">   </span>-qr,<span class=\"w\">
  </span>qrcode<span class=\"w\">           </span>Show<span class=\"w\"> </span>the<span
  class=\"w\"> </span>qrcode<span class=\"w\"> </span>of<span class=\"w\"> </span>a<span
  class=\"w\"> </span>client<span class=\"w\"> </span><span class=\"k\">for</span><span
  class=\"w\"> </span>use<span class=\"w\"> </span>with<span class=\"w\"> </span>the<span
  class=\"w\"> </span>mobile<span class=\"w\"> </span>app\n:::<span class=\"w\">    </span>-r,<span
  class=\"w\"> </span>remove<span class=\"w\">           </span>Remove<span class=\"w\">
  </span>a<span class=\"w\"> </span>client\n:::<span class=\"w\">  </span>-off,<span
  class=\"w\"> </span>off<span class=\"w\">              </span>Disable<span class=\"w\">
  </span>a<span class=\"w\"> </span>user\n:::<span class=\"w\">   </span>-on,<span
  class=\"w\"> </span>on<span class=\"w\">               </span>Enable<span class=\"w\">
  </span>a<span class=\"w\"> </span>user\n:::<span class=\"w\">    </span>-h,<span
  class=\"w\"> </span><span class=\"nb\">help</span><span class=\"w\">             </span>Show<span
  class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"nb\">help</span><span
  class=\"w\"> </span>dialog\n:::<span class=\"w\">    </span>-u,<span class=\"w\">
  </span>uninstall<span class=\"w\">        </span>Uninstall<span class=\"w\"> </span>pivpn<span
  class=\"w\"> </span>from<span class=\"w\"> </span>your<span class=\"w\"> </span>system!\n:::<span
  class=\"w\">   </span>-up,<span class=\"w\"> </span>update<span class=\"w\">           </span>Updates<span
  class=\"w\"> </span>PiVPN<span class=\"w\"> </span>Scripts\n:::<span class=\"w\">
  \  </span>-bk,<span class=\"w\"> </span>backup<span class=\"w\">           </span>Backup<span
  class=\"w\"> </span>VPN<span class=\"w\"> </span>configs<span class=\"w\"> </span>and<span
  class=\"w\"> </span>user<span class=\"w\"> </span>profiles\n</code></pre></div>\n<p>When
  I'm ready to add a new client to my <code>wg</code> network, it's as easy as <code>pivpn
  add</code> and follow the instructions.\nThe easiest part here is that you'll be
  given a QR code in the terminal that you can just scan with the client (like a smart
  phone) and you'll have your wireguard config handled by the app (oh right, download
  the wireguard app) in no time!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/mu'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Mu</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/abstract-base-class'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Abstract-Base-Class</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/wireguard.png
date: 2022-03-12
datetime: 2022-03-12 00:00:00+00:00
description: Virtual Private Networks are a big deal, and this shouldn Wireguard is
  an awesome peer-to-peer VPN tunnel that makes it really easy for me to get into
  my home n
edit_link: https://github.com/edit/main/pages/blog/wireguard.md
html: "<h2 id=\"vpn\">VPN</h2>\n<p>Virtual Private Networks are a big deal, and this
  shouldn't be considered anything even close to a guide on using them.\nHere are
  just my notes and some setup for how I use <a href=\"https://www.wireguard.com/\">wireguard</a>
  at home.</p>\n<h2 id=\"wireguard\">Wireguard</h2>\n<p>Wireguard is an awesome peer-to-peer
  VPN tunnel that makes it really easy for me to get into my home network when I'm
  out and about.\nMy main reasons for this are 1. I don't trust public wi-fi and 2.
  I want to use pi-hole for ad blocking when I'm not at home</p>\n<p>Wireguard can
  be configured as a \"peer-to-site\" VPN tunnel as well.\nMy vpn setup let's me jump
  to various machines on my network from anywhere!</p>\n<p>I use <a href=\"https://pivpn.io/\">pivpn</a>
  in a VM that's already running <code>pi-hole</code> to host my wireguard server.\nIt's
  super easy to setup just by following the instructions on the pivpn site.</p>\n<p>The
  reason I like it is that I have a nice <code>cli</code> for managing wireguard configs.</p>\n<div
  class=\"highlight\"><pre><span></span><code>dumbledore@pihole-vpn:~$<span class=\"w\">
  </span>pivpn\n:::<span class=\"w\"> </span>Control<span class=\"w\"> </span>all<span
  class=\"w\"> </span>PiVPN<span class=\"w\"> </span>specific<span class=\"w\"> </span>functions!\n:::\n:::<span
  class=\"w\"> </span>Usage:<span class=\"w\"> </span>pivpn<span class=\"w\"> </span>&lt;command&gt;<span
  class=\"w\"> </span><span class=\"o\">[</span>option<span class=\"o\">]</span>\n:::\n:::<span
  class=\"w\"> </span>Commands:\n:::<span class=\"w\">    </span>-a,<span class=\"w\">
  </span>add<span class=\"w\">              </span>Create<span class=\"w\"> </span>a<span
  class=\"w\"> </span>client<span class=\"w\"> </span>conf<span class=\"w\"> </span>profile\n:::<span
  class=\"w\">    </span>-c,<span class=\"w\"> </span>clients<span class=\"w\">          </span>List<span
  class=\"w\"> </span>any<span class=\"w\"> </span>connected<span class=\"w\"> </span>clients<span
  class=\"w\"> </span>to<span class=\"w\"> </span>the<span class=\"w\"> </span>server\n:::<span
  class=\"w\">    </span>-d,<span class=\"w\"> </span>debug<span class=\"w\">            </span>Start<span
  class=\"w\"> </span>a<span class=\"w\"> </span>debugging<span class=\"w\"> </span>session<span
  class=\"w\"> </span><span class=\"k\">if</span><span class=\"w\"> </span>having<span
  class=\"w\"> </span>trouble\n:::<span class=\"w\">    </span>-l,<span class=\"w\">
  </span>list<span class=\"w\">             </span>List<span class=\"w\"> </span>all<span
  class=\"w\"> </span>clients\n:::<span class=\"w\">   </span>-qr,<span class=\"w\">
  </span>qrcode<span class=\"w\">           </span>Show<span class=\"w\"> </span>the<span
  class=\"w\"> </span>qrcode<span class=\"w\"> </span>of<span class=\"w\"> </span>a<span
  class=\"w\"> </span>client<span class=\"w\"> </span><span class=\"k\">for</span><span
  class=\"w\"> </span>use<span class=\"w\"> </span>with<span class=\"w\"> </span>the<span
  class=\"w\"> </span>mobile<span class=\"w\"> </span>app\n:::<span class=\"w\">    </span>-r,<span
  class=\"w\"> </span>remove<span class=\"w\">           </span>Remove<span class=\"w\">
  </span>a<span class=\"w\"> </span>client\n:::<span class=\"w\">  </span>-off,<span
  class=\"w\"> </span>off<span class=\"w\">              </span>Disable<span class=\"w\">
  </span>a<span class=\"w\"> </span>user\n:::<span class=\"w\">   </span>-on,<span
  class=\"w\"> </span>on<span class=\"w\">               </span>Enable<span class=\"w\">
  </span>a<span class=\"w\"> </span>user\n:::<span class=\"w\">    </span>-h,<span
  class=\"w\"> </span><span class=\"nb\">help</span><span class=\"w\">             </span>Show<span
  class=\"w\"> </span>this<span class=\"w\"> </span><span class=\"nb\">help</span><span
  class=\"w\"> </span>dialog\n:::<span class=\"w\">    </span>-u,<span class=\"w\">
  </span>uninstall<span class=\"w\">        </span>Uninstall<span class=\"w\"> </span>pivpn<span
  class=\"w\"> </span>from<span class=\"w\"> </span>your<span class=\"w\"> </span>system!\n:::<span
  class=\"w\">   </span>-up,<span class=\"w\"> </span>update<span class=\"w\">           </span>Updates<span
  class=\"w\"> </span>PiVPN<span class=\"w\"> </span>Scripts\n:::<span class=\"w\">
  \  </span>-bk,<span class=\"w\"> </span>backup<span class=\"w\">           </span>Backup<span
  class=\"w\"> </span>VPN<span class=\"w\"> </span>configs<span class=\"w\"> </span>and<span
  class=\"w\"> </span>user<span class=\"w\"> </span>profiles\n</code></pre></div>\n<p>When
  I'm ready to add a new client to my <code>wg</code> network, it's as easy as <code>pivpn
  add</code> and follow the instructions.\nThe easiest part here is that you'll be
  given a QR code in the terminal that you can just scan with the client (like a smart
  phone) and you'll have your wireguard config handled by the app (oh right, download
  the wireguard app) in no time!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/mu'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Mu</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/abstract-base-class'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Abstract-Base-Class</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Virtual Private Networks are a big deal, and this shouldn Wireguard
  is an awesome peer-to-peer VPN tunnel that makes it really easy for me to get into
  my home network when I Wireguard can be configured as a  I use  The reason I like
  it is that I have
now: 2024-08-01 13:40:17.987243
path: pages/blog/wireguard.md
published: true
slug: wireguard
super_description: Virtual Private Networks are a big deal, and this shouldn Wireguard
  is an awesome peer-to-peer VPN tunnel that makes it really easy for me to get into
  my home network when I Wireguard can be configured as a  I use  The reason I like
  it is that I have a nice  When I
tags:
- homelab
- homepage
- tech
templateKey: blog-post
title: Wireguard
today: 2024-08-01
---

## VPN

Virtual Private Networks are a big deal, and this shouldn't be considered anything even close to a guide on using them.
Here are just my notes and some setup for how I use [wireguard](https://www.wireguard.com/) at home.

## Wireguard

Wireguard is an awesome peer-to-peer VPN tunnel that makes it really easy for me to get into my home network when I'm out and about.
My main reasons for this are 1. I don't trust public wi-fi and 2. I want to use pi-hole for ad blocking when I'm not at home

Wireguard can be configured as a "peer-to-site" VPN tunnel as well.
My vpn setup let's me jump to various machines on my network from anywhere!

I use [pivpn](https://pivpn.io/) in a VM that's already running `pi-hole` to host my wireguard server.
It's super easy to setup just by following the instructions on the pivpn site.

The reason I like it is that I have a nice `cli` for managing wireguard configs.

```bash
dumbledore@pihole-vpn:~$ pivpn
::: Control all PiVPN specific functions!
:::
::: Usage: pivpn <command> [option]
:::
::: Commands:
:::    -a, add              Create a client conf profile
:::    -c, clients          List any connected clients to the server
:::    -d, debug            Start a debugging session if having trouble
:::    -l, list             List all clients
:::   -qr, qrcode           Show the qrcode of a client for use with the mobile app
:::    -r, remove           Remove a client
:::  -off, off              Disable a user
:::   -on, on               Enable a user
:::    -h, help             Show this help dialog
:::    -u, uninstall        Uninstall pivpn from your system!
:::   -up, update           Updates PiVPN Scripts
:::   -bk, backup           Backup VPN configs and user profiles
```


When I'm ready to add a new client to my `wg` network, it's as easy as `pivpn add` and follow the instructions.
The easiest part here is that you'll be given a QR code in the terminal that you can just scan with the client (like a smart phone) and you'll have your wireguard config handled by the app (oh right, download the wireguard app) in no time!
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
    
    <a class='prev' href='/mu'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Mu</p>
        </div>
    </a>
    
    <a class='next' href='/abstract-base-class'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Abstract-Base-Class</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>