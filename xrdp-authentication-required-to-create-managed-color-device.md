---
article_html: "<p>I just need to RDP into an Ubuntu box via Remmina and everytime
  I login I have\nto authenticate to create a color managed device... which I don't
  even know\nwhat that is!</p>\n<p>To fix it?</p>\n<p><code>vim /etc/polkit-1/localauthority.conf.d/02-allow-colord.conf</code></p>\n<div
  class=\"highlight\"><pre><span></span><code>polkit.addRule(function(action, subject)
  {\n if ((action.id == &quot;org.freedesktop.color-manager.create-device&quot; ||\n
  action.id == &quot;org.freedesktop.color-manager.create-profile&quot; ||\n action.id
  == &quot;org.freedesktop.color-manager.delete-device&quot; ||\n action.id == &quot;org.freedesktop.color-manager.delete-profile&quot;
  ||\n action.id == &quot;org.freedesktop.color-manager.modify-device&quot; ||\n action.id
  == &quot;org.freedesktop.color-manager.modify-profile&quot;) &amp;&amp;\n subject.isInGroup(&quot;{users}&quot;))
  {\n return polkit.Result.YES;\n }\n });\n</code></pre></div>\n<p>Give'r the <code>:x</code>,
  logout, and you're good to go</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/mounting-exfat-usb-in-linux'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Mounting exFAT USB in Linux</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/kvm-network-interface-via-nat-ubuntu-20'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>kvm-network-interface-via-nat-ubuntu-20</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/xrdp-authentication-required-to-create-managed-color-device.png
date: 2022-07-18
datetime: 2022-07-18 00:00:00+00:00
description: I just need to RDP into an Ubuntu box via Remmina and everytime I login
  I have To fix it? vim /etc/polkit-1/localauthority.conf.d/02-allow-colord.conf Give
edit_link: https://github.com/edit/main/pages/til/xrdp-authentication-required-to-create-managed-color-device.md
html: "<p>I just need to RDP into an Ubuntu box via Remmina and everytime I login
  I have\nto authenticate to create a color managed device... which I don't even know\nwhat
  that is!</p>\n<p>To fix it?</p>\n<p><code>vim /etc/polkit-1/localauthority.conf.d/02-allow-colord.conf</code></p>\n<div
  class=\"highlight\"><pre><span></span><code>polkit.addRule(function(action, subject)
  {\n if ((action.id == &quot;org.freedesktop.color-manager.create-device&quot; ||\n
  action.id == &quot;org.freedesktop.color-manager.create-profile&quot; ||\n action.id
  == &quot;org.freedesktop.color-manager.delete-device&quot; ||\n action.id == &quot;org.freedesktop.color-manager.delete-profile&quot;
  ||\n action.id == &quot;org.freedesktop.color-manager.modify-device&quot; ||\n action.id
  == &quot;org.freedesktop.color-manager.modify-profile&quot;) &amp;&amp;\n subject.isInGroup(&quot;{users}&quot;))
  {\n return polkit.Result.YES;\n }\n });\n</code></pre></div>\n<p>Give'r the <code>:x</code>,
  logout, and you're good to go</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/mounting-exfat-usb-in-linux'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Mounting exFAT USB in Linux</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/kvm-network-interface-via-nat-ubuntu-20'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>kvm-network-interface-via-nat-ubuntu-20</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I just need to RDP into an Ubuntu box via Remmina and everytime
  I login I have To fix it? vim /etc/polkit-1/localauthority.conf.d/02-allow-colord.conf
  Give
now: 2024-08-01 13:40:17.987486
path: pages/til/xrdp-authentication-required-to-create-managed-color-device.md
published: true
slug: xrdp-authentication-required-to-create-managed-color-device
super_description: I just need to RDP into an Ubuntu box via Remmina and everytime
  I login I have To fix it? vim /etc/polkit-1/localauthority.conf.d/02-allow-colord.conf
  Give
tags:
- homelab
- tech
templateKey: til
title: Xrdp-Authentication-Required-To-Create-Managed-Color-Device
today: 2024-08-01
---

I just need to RDP into an Ubuntu box via Remmina and everytime I login I have
to authenticate to create a color managed device... which I don't even know
what that is!


To fix it?

`vim /etc/polkit-1/localauthority.conf.d/02-allow-colord.conf`

```
polkit.addRule(function(action, subject) {
 if ((action.id == "org.freedesktop.color-manager.create-device" ||
 action.id == "org.freedesktop.color-manager.create-profile" ||
 action.id == "org.freedesktop.color-manager.delete-device" ||
 action.id == "org.freedesktop.color-manager.delete-profile" ||
 action.id == "org.freedesktop.color-manager.modify-device" ||
 action.id == "org.freedesktop.color-manager.modify-profile") &&
 subject.isInGroup("{users}")) {
 return polkit.Result.YES;
 }
 });
```

Give'r the `:x`, logout, and you're good to go
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
    
    <a class='prev' href='/mounting-exfat-usb-in-linux'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Mounting exFAT USB in Linux</p>
        </div>
    </a>
    
    <a class='next' href='/kvm-network-interface-via-nat-ubuntu-20'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>kvm-network-interface-via-nat-ubuntu-20</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>