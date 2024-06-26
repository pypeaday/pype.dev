---
article_html: "<p>When working with tdarr remote nodes, they need to have access not
  only to the\nsame libraries but also the same transcode cache as the server otherwise
  the\ntranscodes will fail...</p>\n<h1 id=\"network-setup\">Network Setup</h1>\n<p>To
  explain I'll give a brief overview of my home setup  </p>\n<p>I have an old Dell
  PowerEdge R610 as my main server running a live server distribution of Ubuntu.\nI
  use ZFS for my NAS file system, and most of my datasets are accesible over my home
  network.\nI have a Tdarr server running in a docker container on the R610.</p>\n<p>In
  my office I dailyi drive a gaming desktop with an Nvidia 2060 Super running Ubuntu
  as well.\nOn that desktop I am running a Tdarr node in a docker container. \nThe
  container has access to the network folders with my media. </p>\n<h1 id=\"initial-magic\">Initial
  Magic</h1>\n<p>When I spun up  a tdarr node on my desktop, the tdarr server running
  on my R610 automatically registered the node, which was freaking amazing.\nThat
  magic though spoiled me and I thought that I didn't need to read the rest of the
  docs...</p>\n<h1 id=\"initial-fail\">Initial Fail</h1>\n<p>I setup a transcode cache
  directory on the R610 locally and a separate transcode cache on my desktop that
  the remote tdarr node would use.\nHaving them separated led to 2 main issues:\n1.
  Transcodes were not being migrated back to my library properly\n2. I was running
  out of disk space on my desktop because tdarr wasn't deleting the completed cache
  files properly.</p>\n<h1 id=\"the-fix\">The Fix</h1>\n<p>Make a transcode cache
  directory accessible on my network, and give access to that directory to the docker
  container running my remote tdarr node.</p>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/customize-k9s'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Customize K9s</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/python-builtin-calendar'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Python-Builtin-Calendar</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-05-25
datetime: 2022-05-25 00:00:00+00:00
description: When working with tdarr remote nodes, they need to have access not only
  to the To explain I I have an old Dell PowerEdge R610 as my main server running
  a live s
edit_link: https://github.com/edit/main/pages/til/tdarr-worker-nodes-share-the-cache.md
html: "<p>When working with tdarr remote nodes, they need to have access not only
  to the\nsame libraries but also the same transcode cache as the server otherwise
  the\ntranscodes will fail...</p>\n<h1 id=\"network-setup\">Network Setup</h1>\n<p>To
  explain I'll give a brief overview of my home setup  </p>\n<p>I have an old Dell
  PowerEdge R610 as my main server running a live server distribution of Ubuntu.\nI
  use ZFS for my NAS file system, and most of my datasets are accesible over my home
  network.\nI have a Tdarr server running in a docker container on the R610.</p>\n<p>In
  my office I dailyi drive a gaming desktop with an Nvidia 2060 Super running Ubuntu
  as well.\nOn that desktop I am running a Tdarr node in a docker container. \nThe
  container has access to the network folders with my media. </p>\n<h1 id=\"initial-magic\">Initial
  Magic</h1>\n<p>When I spun up  a tdarr node on my desktop, the tdarr server running
  on my R610 automatically registered the node, which was freaking amazing.\nThat
  magic though spoiled me and I thought that I didn't need to read the rest of the
  docs...</p>\n<h1 id=\"initial-fail\">Initial Fail</h1>\n<p>I setup a transcode cache
  directory on the R610 locally and a separate transcode cache on my desktop that
  the remote tdarr node would use.\nHaving them separated led to 2 main issues:\n1.
  Transcodes were not being migrated back to my library properly\n2. I was running
  out of disk space on my desktop because tdarr wasn't deleting the completed cache
  files properly.</p>\n<h1 id=\"the-fix\">The Fix</h1>\n<p>Make a transcode cache
  directory accessible on my network, and give access to that directory to the docker
  container running my remote tdarr node.</p>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/customize-k9s'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Customize K9s</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/python-builtin-calendar'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Python-Builtin-Calendar</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'When working with tdarr remote nodes, they need to have access
  not only to the To explain I I have an old Dell PowerEdge R610 as my main server
  running a live server distribution of Ubuntu. In my office I dailyi drive a gaming
  desktop with an Nvidia '
now: 2024-06-26 16:50:21.523936
path: pages/til/tdarr-worker-nodes-share-the-cache.md
published: false
slug: tdarr-worker-nodes-share-the-cache
super_description: When working with tdarr remote nodes, they need to have access
  not only to the To explain I I have an old Dell PowerEdge R610 as my main server
  running a live server distribution of Ubuntu. In my office I dailyi drive a gaming
  desktop with an Nvidia 2060 Super running Ubuntu as well. When I spun up  a tdarr
  node on my desktop, the tdarr server running on my R610 automatically registered
  the node, which was freaking amazing. I setup a transcode cache directory on the
  R610 locally and a separate t
tags:
- homelab
- tech
templateKey: til
title: Tdarr worker nodes share the cache!
today: 2024-06-26
---

When working with tdarr remote nodes, they need to have access not only to the
same libraries but also the same transcode cache as the server otherwise the
transcodes will fail...

# Network Setup

To explain I'll give a brief overview of my home setup  

I have an old Dell PowerEdge R610 as my main server running a live server distribution of Ubuntu.
I use ZFS for my NAS file system, and most of my datasets are accesible over my home network.
I have a Tdarr server running in a docker container on the R610.

In my office I dailyi drive a gaming desktop with an Nvidia 2060 Super running Ubuntu as well.
On that desktop I am running a Tdarr node in a docker container. 
The container has access to the network folders with my media. 

# Initial Magic 

When I spun up  a tdarr node on my desktop, the tdarr server running on my R610 automatically registered the node, which was freaking amazing.
That magic though spoiled me and I thought that I didn't need to read the rest of the docs...

# Initial Fail 

I setup a transcode cache directory on the R610 locally and a separate transcode cache on my desktop that the remote tdarr node would use.
Having them separated led to 2 main issues:
1. Transcodes were not being migrated back to my library properly
2. I was running out of disk space on my desktop because tdarr wasn't deleting the completed cache files properly.

# The Fix

Make a transcode cache directory accessible on my network, and give access to that directory to the docker container running my remote tdarr node.
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
    
    <a class='prev' href='/customize-k9s'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Customize K9s</p>
        </div>
    </a>
    
    <a class='next' href='/python-builtin-calendar'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Python-Builtin-Calendar</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>