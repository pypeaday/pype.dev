---
article_html: "<p>Sometimes I need to manually set a static IP of a Linux machine.
  I generally run the latest version of Ubuntu server in my VMs at home.</p>\n<p>In
  Ubuntu 20 I'm able to change up <code>/etc/netplan/&lt;something&gt;.yml</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"nt\">network</span><span
  class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">version</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">2</span>\n<span
  class=\"w\">  </span><span class=\"nt\">ethernets</span><span class=\"p\">:</span>\n<span
  class=\"w\">    </span><span class=\"nt\">enp0s4</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">addresses</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span class=\"nv\">192.168.1.</span><span
  class=\"p p-Indicator\">{</span><span class=\"nv\">Static IP</span><span class=\"p
  p-Indicator\">}</span><span class=\"nv\">/24</span><span class=\"p p-Indicator\">]</span>\n<span
  class=\"w\">      </span><span class=\"nt\">gateway4</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">192.168.1.1</span>\n<span
  class=\"w\">      </span><span class=\"nt\">nameservers</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">addresses</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span class=\"nv\">192.168.1.1</span><span
  class=\"p p-Indicator\">,</span><span class=\"w\"> </span><span class=\"nv\">1.1.1.1</span><span
  class=\"p p-Indicator\">]</span>\n</code></pre></div>\n<p><code>gateway4</code>
  is your router address\n<code>nameservers</code> is a list of desired DNS servers
  for that machine to use. I  usually use my router which is configured to use my
  pi-hole as my primary DNS, then set  <code>1.1.1.1</code> (CloudFlare) as a backup</p>\n<p>Hit
  it with the <code>sudo netplan apply</code> and you should be good to go!</p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/vim-auto-space'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Vim-Auto-Space</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/038-a-donkey-herder-to-lead-us'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>038
  A Donkey Herder to Lead Us</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/ubuntu-static-ip.png
date: 2022-03-03
datetime: 2022-03-03 00:00:00+00:00
description: 'Sometimes I need to manually set a static IP of a Linux machine. I generally
  run the latest version of Ubuntu server in my VMs at home. In Ubuntu 20 I gateway4 '
edit_link: https://github.com/edit/main/pages/til/ubuntu-static-ip.md
html: "<p>Sometimes I need to manually set a static IP of a Linux machine. I generally
  run the latest version of Ubuntu server in my VMs at home.</p>\n<p>In Ubuntu 20
  I'm able to change up <code>/etc/netplan/&lt;something&gt;.yml</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"nt\">network</span><span
  class=\"p\">:</span>\n<span class=\"w\">  </span><span class=\"nt\">version</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">2</span>\n<span
  class=\"w\">  </span><span class=\"nt\">ethernets</span><span class=\"p\">:</span>\n<span
  class=\"w\">    </span><span class=\"nt\">enp0s4</span><span class=\"p\">:</span>\n<span
  class=\"w\">      </span><span class=\"nt\">addresses</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span class=\"nv\">192.168.1.</span><span
  class=\"p p-Indicator\">{</span><span class=\"nv\">Static IP</span><span class=\"p
  p-Indicator\">}</span><span class=\"nv\">/24</span><span class=\"p p-Indicator\">]</span>\n<span
  class=\"w\">      </span><span class=\"nt\">gateway4</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"l l-Scalar l-Scalar-Plain\">192.168.1.1</span>\n<span
  class=\"w\">      </span><span class=\"nt\">nameservers</span><span class=\"p\">:</span>\n<span
  class=\"w\">        </span><span class=\"nt\">addresses</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"p p-Indicator\">[</span><span class=\"nv\">192.168.1.1</span><span
  class=\"p p-Indicator\">,</span><span class=\"w\"> </span><span class=\"nv\">1.1.1.1</span><span
  class=\"p p-Indicator\">]</span>\n</code></pre></div>\n<p><code>gateway4</code>
  is your router address\n<code>nameservers</code> is a list of desired DNS servers
  for that machine to use. I  usually use my router which is configured to use my
  pi-hole as my primary DNS, then set  <code>1.1.1.1</code> (CloudFlare) as a backup</p>\n<p>Hit
  it with the <code>sudo netplan apply</code> and you should be good to go!</p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/vim-auto-space'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Vim-Auto-Space</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/038-a-donkey-herder-to-lead-us'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>038
  A Donkey Herder to Lead Us</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'Sometimes I need to manually set a static IP of a Linux machine.
  I generally run the latest version of Ubuntu server in my VMs at home. In Ubuntu
  20 I gateway4 Hit it with the '
now: 2024-10-12 11:09:11.872112
path: pages/til/ubuntu-static-ip.md
published: true
slug: ubuntu-static-ip
super_description: 'Sometimes I need to manually set a static IP of a Linux machine.
  I generally run the latest version of Ubuntu server in my VMs at home. In Ubuntu
  20 I gateway4 Hit it with the '
tags:
- linux
- tech
templateKey: til
title: Ubuntu-Static-Ip
today: 2024-10-12
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
    
    <a class='prev' href='/vim-auto-space'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Vim-Auto-Space</p>
        </div>
    </a>
    
    <a class='next' href='/038-a-donkey-herder-to-lead-us'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>038 A Donkey Herder to Lead Us</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>