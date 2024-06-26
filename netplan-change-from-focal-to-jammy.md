---
article_html: "<p>I am revamping my home server and bumped myself early up to Jammy
  Jellyfish...\nhowever to my peril I reused my netplan config and after hitting my
  server with\nthe 'ol <code>netplan apply</code> I lost connection...\nDNS still
  seemed to kinda work externally, but internally nothing was up... </p>\n<p>Turns
  out Netplan got a little change in how to express the <code>gateway</code> key in
  the netplan config!</p>\n<p>Old Ubuntu 20.04 way</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">network</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"nt\">version</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">2</span>\n<span class=\"w\">  </span><span class=\"nt\">ethernets</span><span
  class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">enp0s4</span><span
  class=\"p\">:</span>\n<span class=\"w\">      </span><span class=\"nt\">addresses</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span
  class=\"nv\">192.168.1.</span><span class=\"p p-Indicator\">{</span><span class=\"nv\">Static
  IP</span><span class=\"p p-Indicator\">}</span><span class=\"nv\">/24</span><span
  class=\"p p-Indicator\">]</span>\n<span class=\"w\">      </span><span class=\"nt\">gateway4</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">192.168.1.1</span><span
  class=\"w\">  </span><span class=\"c1\"># &lt;-- This changes!</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">nameservers</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">addresses</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span class=\"nv\">192.168.1.1</span><span
  class=\"p p-Indicator\">,</span><span class=\"w\"> </span><span class=\"nv\">1.1.1.1</span><span
  class=\"p p-Indicator\">]</span>\n</code></pre></div>\n<p>New jammin way for Jammy
  Jellyfish (<strong>at least that worked for me</strong>)\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">network</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"nt\">version</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">2</span>\n<span class=\"w\">  </span><span class=\"nt\">ethernets</span><span
  class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">enp0s4</span><span
  class=\"p\">:</span>\n<span class=\"w\">      </span><span class=\"nt\">addresses</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span
  class=\"nv\">192.168.1.</span><span class=\"p p-Indicator\">{</span><span class=\"nv\">Static
  IP</span><span class=\"p p-Indicator\">}</span><span class=\"nv\">/24</span><span
  class=\"p p-Indicator\">]</span>\n<span class=\"w\">      </span><span class=\"nt\">routes</span><span
  class=\"p\">:</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
  class=\"w\"> </span><span class=\"nt\">to</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">default</span>\n<span
  class=\"w\">          </span><span class=\"nt\">via</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">192.168.1.1</span><span
  class=\"w\"> </span>\n<span class=\"w\">      </span><span class=\"nt\">nameservers</span><span
  class=\"p\">:</span>\n<span class=\"w\">        </span><span class=\"nt\">addresses</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span
  class=\"nv\">192.168.1.1</span><span class=\"p p-Indicator\">,</span><span class=\"w\">
  </span><span class=\"nv\">1.1.1.1</span><span class=\"p p-Indicator\">]</span>\n</code></pre></div></p>\n<div
  class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    [data-theme=\"light\"] {\n      --prevnext-color-text: #1f2022;\n
  \     --prevnext-color-angle: #ffeb00;\n      --prevnext-subtitle-brightness: 3;\n
  \   }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    .prevnext {\n      display:
  flex;\n      flex-direction: row;\n      justify-content: space-around;\n      align-items:
  flex-start;\n    }\n    .prevnext a {\n      display: flex;\n      align-items:
  center;\n      width: 100%;\n      text-decoration: none;\n    }\n    a.next {\n
  \     justify-content: flex-end;\n    }\n    .prevnext a:hover {\n      background:
  #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/add-space-to-your-lvm-on-ubuntu'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Add
  space to your LVM on Ubuntu</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/nextcloud-permissions-with-zfs-and-ansible-nas'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Nextcloud
  permissions with ZFS and Ansible-NAS</p>\n        </div>\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: ''
date: 2022-05-22
datetime: 2022-05-22 00:00:00+00:00
description: I am revamping my home server and bumped myself early up to Jammy Jellyfish...
  Turns out Netplan got a little change in how to express the  Old Ubuntu 20.04 way
edit_link: https://github.com/edit/main/pages/til/netplan-change-from-focal-to-jammy.md
html: "<p>I am revamping my home server and bumped myself early up to Jammy Jellyfish...\nhowever
  to my peril I reused my netplan config and after hitting my server with\nthe 'ol
  <code>netplan apply</code> I lost connection...\nDNS still seemed to kinda work
  externally, but internally nothing was up... </p>\n<p>Turns out Netplan got a little
  change in how to express the <code>gateway</code> key in the netplan config!</p>\n<p>Old
  Ubuntu 20.04 way</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"nt\">network</span><span
  class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">version</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">2</span>\n<span
  class=\"w\">  </span><span class=\"nt\">ethernets</span><span class=\"p\">:</span>\n<span
  class=\"w\">    </span><span class=\"nt\">enp0s4</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">addresses</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span class=\"nv\">192.168.1.</span><span
  class=\"p p-Indicator\">{</span><span class=\"nv\">Static IP</span><span class=\"p
  p-Indicator\">}</span><span class=\"nv\">/24</span><span class=\"p p-Indicator\">]</span>\n<span
  class=\"w\">      </span><span class=\"nt\">gateway4</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">192.168.1.1</span><span
  class=\"w\">  </span><span class=\"c1\"># &lt;-- This changes!</span>\n<span class=\"w\">
  \     </span><span class=\"nt\">nameservers</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">addresses</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span class=\"nv\">192.168.1.1</span><span
  class=\"p p-Indicator\">,</span><span class=\"w\"> </span><span class=\"nv\">1.1.1.1</span><span
  class=\"p p-Indicator\">]</span>\n</code></pre></div>\n<p>New jammin way for Jammy
  Jellyfish (<strong>at least that worked for me</strong>)\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nt\">network</span><span class=\"p\">:</span>\n<span class=\"w\">  </span><span
  class=\"nt\">version</span><span class=\"p\">:</span><span class=\"w\"> </span><span
  class=\"l l-Scalar l-Scalar-Plain\">2</span>\n<span class=\"w\">  </span><span class=\"nt\">ethernets</span><span
  class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"nt\">enp0s4</span><span
  class=\"p\">:</span>\n<span class=\"w\">      </span><span class=\"nt\">addresses</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span
  class=\"nv\">192.168.1.</span><span class=\"p p-Indicator\">{</span><span class=\"nv\">Static
  IP</span><span class=\"p p-Indicator\">}</span><span class=\"nv\">/24</span><span
  class=\"p p-Indicator\">]</span>\n<span class=\"w\">      </span><span class=\"nt\">routes</span><span
  class=\"p\">:</span>\n<span class=\"w\">        </span><span class=\"p p-Indicator\">-</span><span
  class=\"w\"> </span><span class=\"nt\">to</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">default</span>\n<span
  class=\"w\">          </span><span class=\"nt\">via</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">192.168.1.1</span><span
  class=\"w\"> </span>\n<span class=\"w\">      </span><span class=\"nt\">nameservers</span><span
  class=\"p\">:</span>\n<span class=\"w\">        </span><span class=\"nt\">addresses</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span
  class=\"nv\">192.168.1.1</span><span class=\"p p-Indicator\">,</span><span class=\"w\">
  </span><span class=\"nv\">1.1.1.1</span><span class=\"p p-Indicator\">]</span>\n</code></pre></div></p>\n<div
  class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    [data-theme=\"light\"] {\n      --prevnext-color-text: #1f2022;\n
  \     --prevnext-color-angle: #ffeb00;\n      --prevnext-subtitle-brightness: 3;\n
  \   }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    .prevnext {\n      display:
  flex;\n      flex-direction: row;\n      justify-content: space-around;\n      align-items:
  flex-start;\n    }\n    .prevnext a {\n      display: flex;\n      align-items:
  center;\n      width: 100%;\n      text-decoration: none;\n    }\n    a.next {\n
  \     justify-content: flex-end;\n    }\n    .prevnext a:hover {\n      background:
  #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/add-space-to-your-lvm-on-ubuntu'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Add
  space to your LVM on Ubuntu</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/nextcloud-permissions-with-zfs-and-ansible-nas'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Nextcloud
  permissions with ZFS and Ansible-NAS</p>\n        </div>\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: I am revamping my home server and bumped myself early up to Jammy
  Jellyfish... Turns out Netplan got a little change in how to express the  Old Ubuntu
  20.04 way New jammin way for Jammy Jellyfish (
now: 2024-06-26 16:50:21.523856
path: pages/til/netplan-change-from-focal-to-jammy.md
published: true
slug: netplan-change-from-focal-to-jammy
super_description: I am revamping my home server and bumped myself early up to Jammy
  Jellyfish... Turns out Netplan got a little change in how to express the  Old Ubuntu
  20.04 way New jammin way for Jammy Jellyfish (
tags:
- homelab
- linux
- tech
templateKey: til
title: Netplan change from Focal to Jammy
today: 2024-06-26
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
    
    <a class='prev' href='/add-space-to-your-lvm-on-ubuntu'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Add space to your LVM on Ubuntu</p>
        </div>
    </a>
    
    <a class='next' href='/nextcloud-permissions-with-zfs-and-ansible-nas'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Nextcloud permissions with ZFS and Ansible-NAS</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>