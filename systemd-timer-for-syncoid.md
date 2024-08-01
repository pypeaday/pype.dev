---
article_html: "<p>I have a bash script called <code>syncoid-job</code> which boils
  down to a barebones - </p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"ch\">#!/bin/bash</span>\n\nsyncoid<span class=\"w\"> </span>--no-sync-snap<span
  class=\"w\"> </span>--sendoptions<span class=\"o\">=</span>w<span class=\"w\"> </span>--no-privilege-elevation<span
  class=\"w\"> </span><span class=\"nv\">$SYNOIC_USER</span>@<span class=\"nv\">$SERVER</span>:tank/encrypted/nas<span
  class=\"w\"> </span>tank/encrypted/nas\n</code></pre></div>\n<p>I want to run this
  script hourly but as my user (notice the no-privilege-elevation flag)</p>\n<p>First
  - create a systemd unit file at <code>/etc/systemd/system/syncoid-replication.service</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"o\">[</span>Unit<span
  class=\"o\">]</span>\n<span class=\"nv\">Description</span><span class=\"o\">=</span>ZFS<span
  class=\"w\"> </span>Replication<span class=\"w\"> </span>With<span class=\"w\">
  </span>Syncoid\n\n<span class=\"o\">[</span>Service<span class=\"o\">]</span>\n<span
  class=\"nv\">Type</span><span class=\"o\">=</span>oneshot\n<span class=\"nv\">ExecStart</span><span
  class=\"o\">=</span>/<span class=\"nv\">$HOME</span>/dotfiles/syncoid-job\n<span
  class=\"nv\">User</span><span class=\"o\">=</span><span class=\"nv\">$USER</span>\n<span
  class=\"nv\">Group</span><span class=\"o\">=</span><span class=\"nv\">$GROUP</span>\n\n<span
  class=\"o\">[</span>Install<span class=\"o\">]</span>\n<span class=\"nv\">WantedBy</span><span
  class=\"o\">=</span>multi-user.target\n</code></pre></div>\n<p>Then we save the
  unit file, enable the service, and then start it</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"go\">systemctl enable syncoid-replication.service</span>\n<span class=\"go\">systemctl
  start syncoid-replication.service</span>\n</code></pre></div>\n<blockquote>\n<p>Note
  this will run that script... so be ready for syncoid to do its thing</p>\n</blockquote>\n<p>Now
  for the timer... We create <code>/etc/systemd/system/syncoid-replication.timer</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"o\">[</span>Unit<span
  class=\"o\">]</span>\n<span class=\"nv\">Description</span><span class=\"o\">=</span>Run<span
  class=\"w\"> </span>syncoid-replication<span class=\"w\"> </span>every<span class=\"w\">
  </span>hour\n\n<span class=\"o\">[</span>Timer<span class=\"o\">]</span>\n<span
  class=\"nv\">OnCalendar</span><span class=\"o\">=</span>hourly\n\n<span class=\"o\">[</span>Install<span
  class=\"o\">]</span>\n<span class=\"nv\">WantedBy</span><span class=\"o\">=</span>timers.target\n</code></pre></div>\n<p>Hit
  it with a <code>systemctl enable syncoid-replication.timer</code> and you're in
  business!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
  {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"] {\n
  \     --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
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
  \   </style>\n\n    <a class='prev' href='/suda-vim-for-sudo-access-to-files'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>suda.vim
  for sudo access to files</p>\n        </div>\n    </a>\n\n    <a class='next' href='/pipe-to-a-pager-to-preserve-console-output-in-ssh-session'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Pipe to a pager to preserve console output
  in SSH session</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-12-21
datetime: 2022-12-21 00:00:00+00:00
description: I have a bash script called  I want to run this script hourly but as
  my user (notice the no-privilege-elevation flag) First - create a systemd unit file
  at  The
edit_link: https://github.com/edit/main/pages/blog/systemd-timer-for-syncoid.md
html: "<p>I have a bash script called <code>syncoid-job</code> which boils down to
  a barebones - </p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"ch\">#!/bin/bash</span>\n\nsyncoid<span
  class=\"w\"> </span>--no-sync-snap<span class=\"w\"> </span>--sendoptions<span class=\"o\">=</span>w<span
  class=\"w\"> </span>--no-privilege-elevation<span class=\"w\"> </span><span class=\"nv\">$SYNOIC_USER</span>@<span
  class=\"nv\">$SERVER</span>:tank/encrypted/nas<span class=\"w\"> </span>tank/encrypted/nas\n</code></pre></div>\n<p>I
  want to run this script hourly but as my user (notice the no-privilege-elevation
  flag)</p>\n<p>First - create a systemd unit file at <code>/etc/systemd/system/syncoid-replication.service</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"o\">[</span>Unit<span
  class=\"o\">]</span>\n<span class=\"nv\">Description</span><span class=\"o\">=</span>ZFS<span
  class=\"w\"> </span>Replication<span class=\"w\"> </span>With<span class=\"w\">
  </span>Syncoid\n\n<span class=\"o\">[</span>Service<span class=\"o\">]</span>\n<span
  class=\"nv\">Type</span><span class=\"o\">=</span>oneshot\n<span class=\"nv\">ExecStart</span><span
  class=\"o\">=</span>/<span class=\"nv\">$HOME</span>/dotfiles/syncoid-job\n<span
  class=\"nv\">User</span><span class=\"o\">=</span><span class=\"nv\">$USER</span>\n<span
  class=\"nv\">Group</span><span class=\"o\">=</span><span class=\"nv\">$GROUP</span>\n\n<span
  class=\"o\">[</span>Install<span class=\"o\">]</span>\n<span class=\"nv\">WantedBy</span><span
  class=\"o\">=</span>multi-user.target\n</code></pre></div>\n<p>Then we save the
  unit file, enable the service, and then start it</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"go\">systemctl enable syncoid-replication.service</span>\n<span class=\"go\">systemctl
  start syncoid-replication.service</span>\n</code></pre></div>\n<blockquote>\n<p>Note
  this will run that script... so be ready for syncoid to do its thing</p>\n</blockquote>\n<p>Now
  for the timer... We create <code>/etc/systemd/system/syncoid-replication.timer</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"o\">[</span>Unit<span
  class=\"o\">]</span>\n<span class=\"nv\">Description</span><span class=\"o\">=</span>Run<span
  class=\"w\"> </span>syncoid-replication<span class=\"w\"> </span>every<span class=\"w\">
  </span>hour\n\n<span class=\"o\">[</span>Timer<span class=\"o\">]</span>\n<span
  class=\"nv\">OnCalendar</span><span class=\"o\">=</span>hourly\n\n<span class=\"o\">[</span>Install<span
  class=\"o\">]</span>\n<span class=\"nv\">WantedBy</span><span class=\"o\">=</span>timers.target\n</code></pre></div>\n<p>Hit
  it with a <code>systemctl enable syncoid-replication.timer</code> and you're in
  business!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
  {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"] {\n
  \     --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
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
  \   </style>\n\n    <a class='prev' href='/suda-vim-for-sudo-access-to-files'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>suda.vim
  for sudo access to files</p>\n        </div>\n    </a>\n\n    <a class='next' href='/pipe-to-a-pager-to-preserve-console-output-in-ssh-session'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Pipe to a pager to preserve console output
  in SSH session</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I have a bash script called  I want to run this script hourly but
  as my user (notice the no-privilege-elevation flag) First - create a systemd unit
  file at  Then we save the unit file, enable the service, and then start it Note
  this will run that scr
now: 2024-08-01 13:40:17.987227
path: pages/blog/systemd-timer-for-syncoid.md
published: true
slug: systemd-timer-for-syncoid
super_description: 'I have a bash script called  I want to run this script hourly
  but as my user (notice the no-privilege-elevation flag) First - create a systemd
  unit file at  Then we save the unit file, enable the service, and then start it
  Note this will run that script... so be ready for syncoid to do its thing Now for
  the timer... We create  Hit it with a '
tags:
- zfs
- homelab
- tech
templateKey: blog-post
title: Systemd timer for syncoid
today: 2024-08-01
---

I have a bash script called `syncoid-job` which boils down to a barebones - 

```bash
#!/bin/bash

syncoid --no-sync-snap --sendoptions=w --no-privilege-elevation $SYNOIC_USER@$SERVER:tank/encrypted/nas tank/encrypted/nas
```

I want to run this script hourly but as my user (notice the no-privilege-elevation flag)

First - create a systemd unit file at `/etc/systemd/system/syncoid-replication.service`

```bash
[Unit]
Description=ZFS Replication With Syncoid

[Service]
Type=oneshot
ExecStart=/$HOME/dotfiles/syncoid-job
User=$USER
Group=$GROUP

[Install]
WantedBy=multi-user.target

```

Then we save the unit file, enable the service, and then start it

```console
systemctl enable syncoid-replication.service
systemctl start syncoid-replication.service

```

> Note this will run that script... so be ready for syncoid to do its thing

Now for the timer... We create `/etc/systemd/system/syncoid-replication.timer`

```bash
[Unit]
Description=Run syncoid-replication every hour

[Timer]
OnCalendar=hourly

[Install]
WantedBy=timers.target

```

Hit it with a `systemctl enable syncoid-replication.timer` and you're in business!
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
    
    <a class='prev' href='/suda-vim-for-sudo-access-to-files'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>suda.vim for sudo access to files</p>
        </div>
    </a>
    
    <a class='next' href='/pipe-to-a-pager-to-preserve-console-output-in-ssh-session'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Pipe to a pager to preserve console output in SSH session</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>