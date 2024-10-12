---
article_html: "<p><a href=\"https://www.simplified.guide/linux/disk-health-check\">https://www.simplified.guide/linux/disk-health-check</a></p>\n<h1
  id=\"install\">Install</h1>\n<p>For ubuntu/debian based distros (which is what I
  primarly use presently)</p>\n<p><code>sudo apt update -y &amp;&amp; sudo apt install
  smartmontools -y</code></p>\n<h1 id=\"list-hard-drives\">List hard drives</h1>\n<p><code>lsblk
  | grep disk</code> is one way or <code>sudo lshw -c disk</code> is another</p>\n<h1
  id=\"smartctl\">smartctl</h1>\n<p>Use a device's logical name such as <code>dev/sda</code>,
  not a partition of the disk</p>\n<p><code>sudo smartctl -t short /dev/sda</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"go\">dotfiles   home
  \  ×3  ×2  ×2 via   v3.10.6(dotfiles)  took 11s</span>\n<span class=\"go\">❯
  sudo smartctl -t short /dev/sda</span>\n<span class=\"go\">smartctl 7.1 2019-12-30
  r5022 [x86_64-linux-5.15.0-48-generic] (local build)</span>\n<span class=\"go\">Copyright
  (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org</span>\n\n<span
  class=\"go\">=== START OF OFFLINE IMMEDIATE AND SELF-TEST SECTION ===</span>\n<span
  class=\"go\">Sending command: &quot;Execute SMART Short self-test routine immediately
  in off-line mode&quot;.</span>\n<span class=\"go\">Drive command &quot;Execute SMART
  Short self-test routine immediately in off-line mode&quot; successful.</span>\n<span
  class=\"go\">Testing has begun.</span>\n<span class=\"go\">Please wait 2 minutes
  for test to complete.</span>\n<span class=\"go\">Test will complete after Fri Sep
  23 05:59:39 2022 CDT</span>\n<span class=\"go\">Use smartctl -X to abort test.</span>\n</code></pre></div>\n<h1
  id=\"check-status\">check status</h1>\n<p><code>sudo smartctl -H /dev/sda</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"go\">dotfiles   home
  \  ×3  ×2  ×2 via   v3.10.6(dotfiles)</span>\n<span class=\"go\">❯ sudo smartctl
  -H /dev/sda</span>\n<span class=\"go\">smartctl 7.1 2019-12-30 r5022 [x86_64-linux-5.15.0-48-generic]
  (local build)</span>\n<span class=\"go\">Copyright (C) 2002-19, Bruce Allen, Christian
  Franke, www.smartmontools.org</span>\n\n<span class=\"go\">=== START OF READ SMART
  DATA SECTION ===</span>\n<span class=\"go\">SMART overall-health self-assessment
  test result: PASSED</span>\n</code></pre></div>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/session-3-intro'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Session 3 Intro</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/benchmark-your-disks-with-fio'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Benchmark
  your disks with fio</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-08-29
datetime: 2022-08-29 00:00:00+00:00
description: https://www.simplified.guide/linux/disk-health-check For ubuntu/debian
  based distros (which is what I primarly use presently) sudo apt update -y && sudo
  apt ins
edit_link: https://github.com/edit/main/pages/til/check-your-smart-status-with-smartctl.md
html: "<p><a href=\"https://www.simplified.guide/linux/disk-health-check\">https://www.simplified.guide/linux/disk-health-check</a></p>\n<h1
  id=\"install\">Install</h1>\n<p>For ubuntu/debian based distros (which is what I
  primarly use presently)</p>\n<p><code>sudo apt update -y &amp;&amp; sudo apt install
  smartmontools -y</code></p>\n<h1 id=\"list-hard-drives\">List hard drives</h1>\n<p><code>lsblk
  | grep disk</code> is one way or <code>sudo lshw -c disk</code> is another</p>\n<h1
  id=\"smartctl\">smartctl</h1>\n<p>Use a device's logical name such as <code>dev/sda</code>,
  not a partition of the disk</p>\n<p><code>sudo smartctl -t short /dev/sda</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"go\">dotfiles   home
  \  ×3  ×2  ×2 via   v3.10.6(dotfiles)  took 11s</span>\n<span class=\"go\">❯
  sudo smartctl -t short /dev/sda</span>\n<span class=\"go\">smartctl 7.1 2019-12-30
  r5022 [x86_64-linux-5.15.0-48-generic] (local build)</span>\n<span class=\"go\">Copyright
  (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org</span>\n\n<span
  class=\"go\">=== START OF OFFLINE IMMEDIATE AND SELF-TEST SECTION ===</span>\n<span
  class=\"go\">Sending command: &quot;Execute SMART Short self-test routine immediately
  in off-line mode&quot;.</span>\n<span class=\"go\">Drive command &quot;Execute SMART
  Short self-test routine immediately in off-line mode&quot; successful.</span>\n<span
  class=\"go\">Testing has begun.</span>\n<span class=\"go\">Please wait 2 minutes
  for test to complete.</span>\n<span class=\"go\">Test will complete after Fri Sep
  23 05:59:39 2022 CDT</span>\n<span class=\"go\">Use smartctl -X to abort test.</span>\n</code></pre></div>\n<h1
  id=\"check-status\">check status</h1>\n<p><code>sudo smartctl -H /dev/sda</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"go\">dotfiles   home
  \  ×3  ×2  ×2 via   v3.10.6(dotfiles)</span>\n<span class=\"go\">❯ sudo smartctl
  -H /dev/sda</span>\n<span class=\"go\">smartctl 7.1 2019-12-30 r5022 [x86_64-linux-5.15.0-48-generic]
  (local build)</span>\n<span class=\"go\">Copyright (C) 2002-19, Bruce Allen, Christian
  Franke, www.smartmontools.org</span>\n\n<span class=\"go\">=== START OF READ SMART
  DATA SECTION ===</span>\n<span class=\"go\">SMART overall-health self-assessment
  test result: PASSED</span>\n</code></pre></div>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/session-3-intro'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Session 3 Intro</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/benchmark-your-disks-with-fio'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Benchmark
  your disks with fio</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'https://www.simplified.guide/linux/disk-health-check For ubuntu/debian
  based distros (which is what I primarly use presently) sudo apt update -y && sudo
  apt install smartmontools -y lsblk | grep disk Use a device sudo smartctl -t short
  /dev/sda sudo '
now: 2024-10-12 11:09:11.872208
path: pages/til/check-your-smart-status-with-smartctl.md
published: true
slug: check-your-smart-status-with-smartctl
super_description: https://www.simplified.guide/linux/disk-health-check For ubuntu/debian
  based distros (which is what I primarly use presently) sudo apt update -y && sudo
  apt install smartmontools -y lsblk | grep disk Use a device sudo smartctl -t short
  /dev/sda sudo smartctl -H /dev/sda
tags:
- homelab
- linux
- tech
templateKey: til
title: Check your SMART status with smartctl
today: 2024-10-12
---

https://www.simplified.guide/linux/disk-health-check

# Install
For ubuntu/debian based distros (which is what I primarly use presently)

`sudo apt update -y && sudo apt install smartmontools -y`

# List hard drives

`lsblk | grep disk` is one way or `sudo lshw -c disk` is another

# smartctl 

Use a device's logical name such as `dev/sda`, not a partition of the disk

`sudo smartctl -t short /dev/sda`

```console
dotfiles   home   ×3  ×2  ×2 via   v3.10.6(dotfiles)  took 11s
❯ sudo smartctl -t short /dev/sda
smartctl 7.1 2019-12-30 r5022 [x86_64-linux-5.15.0-48-generic] (local build)
Copyright (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF OFFLINE IMMEDIATE AND SELF-TEST SECTION ===
Sending command: "Execute SMART Short self-test routine immediately in off-line mode".
Drive command "Execute SMART Short self-test routine immediately in off-line mode" successful.
Testing has begun.
Please wait 2 minutes for test to complete.
Test will complete after Fri Sep 23 05:59:39 2022 CDT
Use smartctl -X to abort test.
```

# check status

`sudo smartctl -H /dev/sda`

```console

dotfiles   home   ×3  ×2  ×2 via   v3.10.6(dotfiles)
❯ sudo smartctl -H /dev/sda
smartctl 7.1 2019-12-30 r5022 [x86_64-linux-5.15.0-48-generic] (local build)
Copyright (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED


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
    
    <a class='prev' href='/session-3-intro'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Session 3 Intro</p>
        </div>
    </a>
    
    <a class='next' href='/benchmark-your-disks-with-fio'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Benchmark your disks with fio</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>