---
article_html: "<h1 id=\"steps\">Steps</h1>\n<p><code>sudo fdisk -l</code></p>\n<p>then
  look for the device and partition</p>\n<p>get the Type column</p>\n<p>mount</p>\n<h2
  id=\"example\">Example</h2>\n<div class=\"highlight\"><pre><span></span><code>dumbledore
  in /media  NO PYTHON VENV SET \n❯ sudo fdisk -l\n\n...\n\nDevice     Boot    Start
  \     End  Sectors  Size Id Type\n/dev/sdk1  *        2048 60371951 60369904 28.8G
  \ 7 HPFS/NTFS/exFAT\n/dev/sdk2       60371952 60437487    65536   32M ef EFI (FAT-12/16/32)\n\n\ndumbledore
  in /media  NO PYTHON VENV SET \n❯ sudo mount -t ntfs /dev/sdk1 /media/ventoy-usb
  -o uid=1000                       \nNTFS signature is missing.\nFailed to mount
  &#39;/dev/sdk1&#39;: Invalid argument\nThe device &#39;/dev/sdk1&#39; doesn&#39;t
  seem to have a valid NTFS.\nMaybe the wrong device is used? Or the whole disk instead
  of a\npartition (e.g. /dev/sda, not /dev/sda1)? Or the other way around?\n\ndumbledore
  in /media  NO PYTHON VENV SET \n✗ sudo mount -t exfat /dev/sdk1 /media/ventoy-usb
  -o uid=1000\n</code></pre></div>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/paperless-ngx-filtering-on-ids-instead-of-values'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Paperless-NGX
  filtering on IDs instead of values</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/xrdp-authentication-required-to-create-managed-color-device'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Xrdp-Authentication-Required-To-Create-Managed-Color-Device</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-07-31
datetime: 2022-07-31 00:00:00+00:00
description: sudo fdisk -l then look for the device and partition get the Type column
  mount
edit_link: https://github.com/edit/main/pages/til/mounting-exfat-usb-in-linux.md
html: "<h1 id=\"steps\">Steps</h1>\n<p><code>sudo fdisk -l</code></p>\n<p>then look
  for the device and partition</p>\n<p>get the Type column</p>\n<p>mount</p>\n<h2
  id=\"example\">Example</h2>\n<div class=\"highlight\"><pre><span></span><code>dumbledore
  in /media  NO PYTHON VENV SET \n❯ sudo fdisk -l\n\n...\n\nDevice     Boot    Start
  \     End  Sectors  Size Id Type\n/dev/sdk1  *        2048 60371951 60369904 28.8G
  \ 7 HPFS/NTFS/exFAT\n/dev/sdk2       60371952 60437487    65536   32M ef EFI (FAT-12/16/32)\n\n\ndumbledore
  in /media  NO PYTHON VENV SET \n❯ sudo mount -t ntfs /dev/sdk1 /media/ventoy-usb
  -o uid=1000                       \nNTFS signature is missing.\nFailed to mount
  &#39;/dev/sdk1&#39;: Invalid argument\nThe device &#39;/dev/sdk1&#39; doesn&#39;t
  seem to have a valid NTFS.\nMaybe the wrong device is used? Or the whole disk instead
  of a\npartition (e.g. /dev/sda, not /dev/sda1)? Or the other way around?\n\ndumbledore
  in /media  NO PYTHON VENV SET \n✗ sudo mount -t exfat /dev/sdk1 /media/ventoy-usb
  -o uid=1000\n</code></pre></div>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/paperless-ngx-filtering-on-ids-instead-of-values'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Paperless-NGX
  filtering on IDs instead of values</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/xrdp-authentication-required-to-create-managed-color-device'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Xrdp-Authentication-Required-To-Create-Managed-Color-Device</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: sudo fdisk -l then look for the device and partition get the Type
  column mount
now: 2024-01-05 14:15:22.253787
path: pages/til/mounting-exfat-usb-in-linux.md
published: true
slug: mounting-exfat-usb-in-linux
super_description: sudo fdisk -l then look for the device and partition get the Type
  column mount
tags:
- linux
- homelab
- tech
templateKey: til
title: Mounting exFAT USB in Linux
today: 2024-01-05
---

# Steps

`sudo fdisk -l`

then look for the device and partition

get the Type column

mount

## Example

```

dumbledore in /media  NO PYTHON VENV SET 
❯ sudo fdisk -l

...

Device     Boot    Start      End  Sectors  Size Id Type
/dev/sdk1  *        2048 60371951 60369904 28.8G  7 HPFS/NTFS/exFAT
/dev/sdk2       60371952 60437487    65536   32M ef EFI (FAT-12/16/32)


dumbledore in /media  NO PYTHON VENV SET 
❯ sudo mount -t ntfs /dev/sdk1 /media/ventoy-usb -o uid=1000                       
NTFS signature is missing.
Failed to mount '/dev/sdk1': Invalid argument
The device '/dev/sdk1' doesn't seem to have a valid NTFS.
Maybe the wrong device is used? Or the whole disk instead of a
partition (e.g. /dev/sda, not /dev/sda1)? Or the other way around?

dumbledore in /media  NO PYTHON VENV SET 
✗ sudo mount -t exfat /dev/sdk1 /media/ventoy-usb -o uid=1000

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
    
    <a class='prev' href='/paperless-ngx-filtering-on-ids-instead-of-values'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Paperless-NGX filtering on IDs instead of values</p>
        </div>
    </a>
    
    <a class='next' href='/xrdp-authentication-required-to-create-managed-color-device'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Xrdp-Authentication-Required-To-Create-Managed-Color-Device</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>