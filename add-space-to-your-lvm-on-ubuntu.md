---
article_html: "<p>I ran out of space on the SSD in my server when doing some file
  transfers but only 100GB was used of a 256 GB SSD?</p>\n<h1 id=\"lvm\">LVM</h1>\n<p>When
  installing Ubuntu live server the default option for how to partition the\ndisk
  (in my experience) has been to setup an LVM group that defaults to less\nthan the
  available space. Most recently I put Ubuntu server on a 256 GB SSD but\nthe main
  partition was formatted as an LVM group with 100GB of storage... I\ndidn't think
  anything of this even though I'm mostly used to EXT4.</p>\n<p>I think the reason
  for LVMs is performance, but in hindsight, I don't really\ncare much about the performance
  differences, I really just want all my storage\nthat's fast enough</p>\n<h1 id=\"extending-the-lvm\">Extending
  the LVM</h1>\n<p>A moment of googling brought me to Ubuntu's wiki and I\nlearned
  that I can expand my LVM to the space I need...</p>\n<p><code>sudo lvdisplay</code>
  and <code>sudo pvdisplay</code> show detailed views of the logical volumes and physical
  volumes respectively.</p>\n<p>Take a look at those and find the volume you need
  to extend. For me I found this:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"w\">  </span>---<span class=\"w\"> </span>Logical<span class=\"w\"> </span>volume<span
  class=\"w\"> </span>---\n<span class=\"w\">  </span>LV<span class=\"w\"> </span>Path<span
  class=\"w\">                </span>/dev/ubuntu-vg/ubuntu-lv\n<span class=\"w\">
  \ </span>LV<span class=\"w\"> </span>Name<span class=\"w\">                </span>ubuntu-lv\n<span
  class=\"w\">  </span>VG<span class=\"w\"> </span>Name<span class=\"w\">                </span>ubuntu-vg\n<span
  class=\"w\">  </span>LV<span class=\"w\"> </span>Write<span class=\"w\"> </span>Access<span
  class=\"w\">        </span>read/write\n<span class=\"w\">  </span>LV<span class=\"w\">
  </span>Status<span class=\"w\">              </span>available\n<span class=\"w\">
  \ </span>...\n</code></pre></div>\n<p>There's more that you'll see but this is what's
  relevant - I need to extend the\n<code>ubuntu-lv</code> logical volume in the <code>ubuntu-vg</code>
  volume group.</p>\n<p><code>sudo lvextend -L +50g ubuntu-vg/ubuntu-lv</code> gives
  me 50 more GB of storage which should be enough for at least tonight \U0001F913</p>\n<p><a
  href=\"https://wiki.ubuntu.com/Lvm\">RTFM</a></p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </style>\n\n    <a class='prev' href='/arr-download-client-config'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>arr client config</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/netplan-change-from-focal-to-jammy'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Netplan change from Focal to Jammy</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
cover: ''
date: 2022-05-26
datetime: 2022-05-26 00:00:00+00:00
description: I ran out of space on the SSD in my server when doing some file transfers
  but only 100GB was used of a 256 GB SSD? When installing Ubuntu live server the
  defaul
edit_link: https://github.com/edit/main/pages/til/add-space-to-your-lvm-on-ubuntu.md
html: "<p>I ran out of space on the SSD in my server when doing some file transfers
  but only 100GB was used of a 256 GB SSD?</p>\n<h1 id=\"lvm\">LVM</h1>\n<p>When installing
  Ubuntu live server the default option for how to partition the\ndisk (in my experience)
  has been to setup an LVM group that defaults to less\nthan the available space.
  Most recently I put Ubuntu server on a 256 GB SSD but\nthe main partition was formatted
  as an LVM group with 100GB of storage... I\ndidn't think anything of this even though
  I'm mostly used to EXT4.</p>\n<p>I think the reason for LVMs is performance, but
  in hindsight, I don't really\ncare much about the performance differences, I really
  just want all my storage\nthat's fast enough</p>\n<h1 id=\"extending-the-lvm\">Extending
  the LVM</h1>\n<p>A moment of googling brought me to Ubuntu's wiki and I\nlearned
  that I can expand my LVM to the space I need...</p>\n<p><code>sudo lvdisplay</code>
  and <code>sudo pvdisplay</code> show detailed views of the logical volumes and physical
  volumes respectively.</p>\n<p>Take a look at those and find the volume you need
  to extend. For me I found this:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"w\">  </span>---<span class=\"w\"> </span>Logical<span class=\"w\"> </span>volume<span
  class=\"w\"> </span>---\n<span class=\"w\">  </span>LV<span class=\"w\"> </span>Path<span
  class=\"w\">                </span>/dev/ubuntu-vg/ubuntu-lv\n<span class=\"w\">
  \ </span>LV<span class=\"w\"> </span>Name<span class=\"w\">                </span>ubuntu-lv\n<span
  class=\"w\">  </span>VG<span class=\"w\"> </span>Name<span class=\"w\">                </span>ubuntu-vg\n<span
  class=\"w\">  </span>LV<span class=\"w\"> </span>Write<span class=\"w\"> </span>Access<span
  class=\"w\">        </span>read/write\n<span class=\"w\">  </span>LV<span class=\"w\">
  </span>Status<span class=\"w\">              </span>available\n<span class=\"w\">
  \ </span>...\n</code></pre></div>\n<p>There's more that you'll see but this is what's
  relevant - I need to extend the\n<code>ubuntu-lv</code> logical volume in the <code>ubuntu-vg</code>
  volume group.</p>\n<p><code>sudo lvextend -L +50g ubuntu-vg/ubuntu-lv</code> gives
  me 50 more GB of storage which should be enough for at least tonight \U0001F913</p>\n<p><a
  href=\"https://wiki.ubuntu.com/Lvm\">RTFM</a></p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </style>\n\n    <a class='prev' href='/arr-download-client-config'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>arr client config</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/netplan-change-from-focal-to-jammy'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Netplan change from Focal to Jammy</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
jinja: false
long_description: I ran out of space on the SSD in my server when doing some file
  transfers but only 100GB was used of a 256 GB SSD? When installing Ubuntu live server
  the default option for how to partition the I think the reason for LVMs is performance,
  but in hinds
now: 2024-06-26 16:50:21.524068
path: pages/til/add-space-to-your-lvm-on-ubuntu.md
published: true
slug: add-space-to-your-lvm-on-ubuntu
super_description: 'I ran out of space on the SSD in my server when doing some file
  transfers but only 100GB was used of a 256 GB SSD? When installing Ubuntu live server
  the default option for how to partition the I think the reason for LVMs is performance,
  but in hindsight, I don A moment of googling brought me to Ubuntu sudo lvdisplay
  Take a look at those and find the volume you need to extend. For me I found this:
  There sudo lvextend -L +50g ubuntu-vg/ubuntu-lv'
tags:
- homelab
- linux
- tech
templateKey: til
title: Add space to your LVM on Ubuntu
today: 2024-06-26
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
    
    <a class='prev' href='/arr-download-client-config'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>arr client config</p>
        </div>
    </a>
    
    <a class='next' href='/netplan-change-from-focal-to-jammy'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Netplan change from Focal to Jammy</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>