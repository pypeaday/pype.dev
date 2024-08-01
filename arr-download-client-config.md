---
article_html: "<p>TIL that when setting up download clients for\nradarr/sonarr/lidarr/readarr/bazarr/prowlarr
  that you can utilize internal DNS\nand instead of hardcoding an IP address of your
  download client server, can use\njust the CNAME record (ie. instead of 172.10.14.13
  I can use\ntransmission.mydomain.com... notice the lact of http(s)://... adding
  that won't\nallow the connection to work/</p>\n<p>Furthermore, you can use internal
  DNS to lookup the domain, not the subdomain,\nand expose the port, like <code>mydomain.com:7878</code>
  for sonarr. This was simpler to\nmaintain because I don't change which ports an
  application exposes or utilizes\nhardly ever, plus I don't need to maintain CNAME
  records for every service!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/reindex-nextcloud-after-adding-data-via-cli'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Reindex
  Nextcloud After Adding Data via CLI</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/add-space-to-your-lvm-on-ubuntu'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Add
  space to your LVM on Ubuntu</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-05-28
datetime: 2022-05-28 00:00:00+00:00
description: TIL that when setting up download clients for Furthermore, you can use
  internal DNS to lookup the domain, not the subdomain,
edit_link: https://github.com/edit/main/pages/til/arr-download-client-config.md
html: "<p>TIL that when setting up download clients for\nradarr/sonarr/lidarr/readarr/bazarr/prowlarr
  that you can utilize internal DNS\nand instead of hardcoding an IP address of your
  download client server, can use\njust the CNAME record (ie. instead of 172.10.14.13
  I can use\ntransmission.mydomain.com... notice the lact of http(s)://... adding
  that won't\nallow the connection to work/</p>\n<p>Furthermore, you can use internal
  DNS to lookup the domain, not the subdomain,\nand expose the port, like <code>mydomain.com:7878</code>
  for sonarr. This was simpler to\nmaintain because I don't change which ports an
  application exposes or utilizes\nhardly ever, plus I don't need to maintain CNAME
  records for every service!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/reindex-nextcloud-after-adding-data-via-cli'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Reindex
  Nextcloud After Adding Data via CLI</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/add-space-to-your-lvm-on-ubuntu'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Add
  space to your LVM on Ubuntu</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: TIL that when setting up download clients for Furthermore, you can
  use internal DNS to lookup the domain, not the subdomain,
now: 2024-08-01 13:40:17.987489
path: pages/til/arr-download-client-config.md
published: true
slug: arr-download-client-config
super_description: TIL that when setting up download clients for Furthermore, you
  can use internal DNS to lookup the domain, not the subdomain,
tags:
- homelab
- tech
templateKey: til
title: arr client config
today: 2024-08-01
---

TIL that when setting up download clients for
radarr/sonarr/lidarr/readarr/bazarr/prowlarr that you can utilize internal DNS
and instead of hardcoding an IP address of your download client server, can use
just the CNAME record (ie. instead of 172.10.14.13 I can use
transmission.mydomain.com... notice the lact of http(s)://... adding that won't
allow the connection to work/

Furthermore, you can use internal DNS to lookup the domain, not the subdomain,
and expose the port, like `mydomain.com:7878` for sonarr. This was simpler to
maintain because I don't change which ports an application exposes or utilizes
hardly ever, plus I don't need to maintain CNAME records for every service!
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
    
    <a class='prev' href='/reindex-nextcloud-after-adding-data-via-cli'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Reindex Nextcloud After Adding Data via CLI</p>
        </div>
    </a>
    
    <a class='next' href='/add-space-to-your-lvm-on-ubuntu'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Add space to your LVM on Ubuntu</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>