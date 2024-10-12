---
article_html: "<p>in /lib/systemd/system/docker.service there is an ExecStart command
  that got placed there when I setup Docker with Ansible - it threw the -H flag which
  told the daemon what hosts to setup. But I added the \"hosts\" key in my daemon.json
  and it broke - so removing the -H flag from the systemd unit fixed it</p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/systemd-timer-for-syncoid'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Systemd timer for syncoid</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/suda-vim-for-sudo-access-to-files'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>suda.vim for sudo access to files</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: ''
date: 2022-12-21
datetime: 2022-12-21 00:00:00+00:00
description: in /lib/systemd/system/docker.service there is an ExecStart command that
  got placed there when I setup Docker with Ansible - it threw the -H flag which told
  the
edit_link: https://github.com/edit/main/pages/til/adding-docker-daemon.json-broke-docker.md
html: "<p>in /lib/systemd/system/docker.service there is an ExecStart command that
  got placed there when I setup Docker with Ansible - it threw the -H flag which told
  the daemon what hosts to setup. But I added the \"hosts\" key in my daemon.json
  and it broke - so removing the -H flag from the systemd unit fixed it</p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/systemd-timer-for-syncoid'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Systemd timer for syncoid</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/suda-vim-for-sudo-access-to-files'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>suda.vim for sudo access to files</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: 'in /lib/systemd/system/docker.service there is an ExecStart command
  that got placed there when I setup Docker with Ansible - it threw the -H flag which
  told the daemon what hosts to setup. But I added the '
now: 2024-10-12 11:09:11.872290
path: pages/til/adding-docker-daemon.json-broke-docker.md
published: true
slug: adding-docker-daemon-json-broke-docker
super_description: 'in /lib/systemd/system/docker.service there is an ExecStart command
  that got placed there when I setup Docker with Ansible - it threw the -H flag which
  told the daemon what hosts to setup. But I added the '
tags:
- linux
- linux
- tech
templateKey: til
title: Adding docker daemon.json broke docker
today: 2024-10-12
---

in /lib/systemd/system/docker.service there is an ExecStart command that got placed there when I setup Docker with Ansible - it threw the -H flag which told the daemon what hosts to setup. But I added the "hosts" key in my daemon.json and it broke - so removing the -H flag from the systemd unit fixed it
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
    
    <a class='prev' href='/systemd-timer-for-syncoid'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Systemd timer for syncoid</p>
        </div>
    </a>
    
    <a class='next' href='/suda-vim-for-sudo-access-to-files'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>suda.vim for sudo access to files</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>