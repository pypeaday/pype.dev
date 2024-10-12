---
article_html: "<div class=\"highlight\"><pre><span></span><code>email1@me.com\nsomebody_else@gmail.com\n</code></pre></div>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"ch\">#! /bin/bash</span>\n<span
  class=\"c1\"># pick multiple emails from list and combine into comma seperated array</span>\n<span
  class=\"nv\">emails</span><span class=\"o\">=</span><span class=\"sb\">`</span>cat<span
  class=\"w\"> </span>.../emails<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>fzf<span class=\"w\"> </span>-m<span class=\"w\"> </span><span
  class=\"p\">|</span><span class=\"w\"> </span>sed<span class=\"w\"> </span><span
  class=\"s1\">&#39;s/^\\|$/&quot;/g&#39;</span><span class=\"p\">|</span>paste<span
  class=\"w\"> </span>-sd,<span class=\"sb\">`</span><span class=\"w\"> </span>\n\n<span
  class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"nv\">$emails</span>\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/configure-bridge-network-on-ubuntu-22-04-with-netplan'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Configure
  bridge network on Ubuntu 22.04 with Netplan</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/destroying-tmux-sessions-with-fzf'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Destroying
  Tmux sessions with fzf</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-05-30
datetime: 2022-05-30 00:00:00+00:00
description: ''
edit_link: https://github.com/edit/main/pages/til/filtering-emails-with-core-utils.md
html: "<div class=\"highlight\"><pre><span></span><code>email1@me.com\nsomebody_else@gmail.com\n</code></pre></div>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"ch\">#! /bin/bash</span>\n<span
  class=\"c1\"># pick multiple emails from list and combine into comma seperated array</span>\n<span
  class=\"nv\">emails</span><span class=\"o\">=</span><span class=\"sb\">`</span>cat<span
  class=\"w\"> </span>.../emails<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>fzf<span class=\"w\"> </span>-m<span class=\"w\"> </span><span
  class=\"p\">|</span><span class=\"w\"> </span>sed<span class=\"w\"> </span><span
  class=\"s1\">&#39;s/^\\|$/&quot;/g&#39;</span><span class=\"p\">|</span>paste<span
  class=\"w\"> </span>-sd,<span class=\"sb\">`</span><span class=\"w\"> </span>\n\n<span
  class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"nv\">$emails</span>\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/configure-bridge-network-on-ubuntu-22-04-with-netplan'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Configure
  bridge network on Ubuntu 22.04 with Netplan</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/destroying-tmux-sessions-with-fzf'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Destroying
  Tmux sessions with fzf</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: ''
now: 2024-10-12 11:09:11.872083
path: pages/til/filtering-emails-with-core-utils.md
published: false
slug: filtering-emails-with-core-utils
super_description: ''
tags:
- linux
- cli
- tech
templateKey: til
title: Filtering emails with core utils
today: 2024-10-12
---

```text
email1@me.com
somebody_else@gmail.com

```

```bash
#! /bin/bash
# pick multiple emails from list and combine into comma seperated array
emails=`cat .../emails | fzf -m | sed 's/^\|$/"/g'|paste -sd,` 

echo $emails

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
    
    <a class='prev' href='/configure-bridge-network-on-ubuntu-22-04-with-netplan'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Configure bridge network on Ubuntu 22.04 with Netplan</p>
        </div>
    </a>
    
    <a class='next' href='/destroying-tmux-sessions-with-fzf'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Destroying Tmux sessions with fzf</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>