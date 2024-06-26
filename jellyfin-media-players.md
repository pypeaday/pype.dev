---
article_html: "<p>I use Jellyfin at home for serving up most of our media - movies
  and shows etc.</p>\n<p>My dream is to have a GPU capable of transcoding any and
  all of our media for smooth playback on any device...\nNow, I thought I'd have that
  by now with my Nvidia Quadro P400 however I have issues left and right with 4k content.</p>\n<p>What
  can I do to still use Jellyfin but get smooth playback?</p>\n<p>THe first answer
  is figure out why I suck with GPUs, but pausing that there's shorter solutions -&gt;
  namely, use a media player that's compatabile with the encoded content!</p>\n<h2
  id=\"vlc\">VLC</h2>\n<p>I'll keep this one short - VLC is great and if you don't
  need a netflix like experience, I'd recommend just using it to browse your network
  drives and play whatever you have</p>\n<h2 id=\"jellyfin-web-player\">Jellyfin Web
  Player</h2>\n<p>This is the reason I'm writing this post... the web player is great
  but not everything is supported on all devices</p>\n<h2 id=\"jellyfin-mpv-shim\">Jellyfin
  MPV Shim</h2>\n<p>This cross-platform cast client is my answer now.\nYou can find
  the project <a href=\"https://github.com/jellyfin/jellyfin-mpv-shim/blob/master/README.md#linux-installation\">here</a></p>\n<p>The
  installation instrauctions are super straightforward for Windows, Mac OS, or Linux.</p>\n<p>I'm
  on Linux and so my install went like this:</p>\n<div class=\"highlight\"><pre><span></span><code>sudo<span
  class=\"w\"> </span>apt<span class=\"w\"> </span>update\nsudo<span class=\"w\">
  </span>apt<span class=\"w\"> </span>install<span class=\"w\"> </span>mpv<span class=\"w\">
  </span>\n\npipx<span class=\"w\"> </span>install<span class=\"w\"> </span>jellyfin-mpv-shim\npipx<span
  class=\"w\"> </span>inject<span class=\"w\"> </span>jellyfin-mpv-shim<span class=\"w\">
  </span>pystray\n\n<span class=\"c1\">#profit</span>\n</code></pre></div>\n<p>I used
  <code>pipx</code> to install the player as I prefer it for stand alone utilities
  over pip installing anything globally.</p>\n<p>Afer that I just start the player
  at the terminal with <code>jellyfin-mpv-shim</code>\nThen in the web browser I can
  cast my content to the player and bypass the web player (and thus solve much of
  my transcoding issues) trivially!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/fx-json'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Fx-Json</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/typeddict'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Typeddict</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/jellyfin-media-players.png
date: 2022-04-17
datetime: 2022-04-17 00:00:00+00:00
description: I use Jellyfin at home for serving up most of our media - movies and
  shows etc. My dream is to have a GPU capable of transcoding any and all of our media
  for sm
edit_link: https://github.com/edit/main/pages/blog/jellyfin-media-players.md
html: "<p>I use Jellyfin at home for serving up most of our media - movies and shows
  etc.</p>\n<p>My dream is to have a GPU capable of transcoding any and all of our
  media for smooth playback on any device...\nNow, I thought I'd have that by now
  with my Nvidia Quadro P400 however I have issues left and right with 4k content.</p>\n<p>What
  can I do to still use Jellyfin but get smooth playback?</p>\n<p>THe first answer
  is figure out why I suck with GPUs, but pausing that there's shorter solutions -&gt;
  namely, use a media player that's compatabile with the encoded content!</p>\n<h2
  id=\"vlc\">VLC</h2>\n<p>I'll keep this one short - VLC is great and if you don't
  need a netflix like experience, I'd recommend just using it to browse your network
  drives and play whatever you have</p>\n<h2 id=\"jellyfin-web-player\">Jellyfin Web
  Player</h2>\n<p>This is the reason I'm writing this post... the web player is great
  but not everything is supported on all devices</p>\n<h2 id=\"jellyfin-mpv-shim\">Jellyfin
  MPV Shim</h2>\n<p>This cross-platform cast client is my answer now.\nYou can find
  the project <a href=\"https://github.com/jellyfin/jellyfin-mpv-shim/blob/master/README.md#linux-installation\">here</a></p>\n<p>The
  installation instrauctions are super straightforward for Windows, Mac OS, or Linux.</p>\n<p>I'm
  on Linux and so my install went like this:</p>\n<div class=\"highlight\"><pre><span></span><code>sudo<span
  class=\"w\"> </span>apt<span class=\"w\"> </span>update\nsudo<span class=\"w\">
  </span>apt<span class=\"w\"> </span>install<span class=\"w\"> </span>mpv<span class=\"w\">
  </span>\n\npipx<span class=\"w\"> </span>install<span class=\"w\"> </span>jellyfin-mpv-shim\npipx<span
  class=\"w\"> </span>inject<span class=\"w\"> </span>jellyfin-mpv-shim<span class=\"w\">
  </span>pystray\n\n<span class=\"c1\">#profit</span>\n</code></pre></div>\n<p>I used
  <code>pipx</code> to install the player as I prefer it for stand alone utilities
  over pip installing anything globally.</p>\n<p>Afer that I just start the player
  at the terminal with <code>jellyfin-mpv-shim</code>\nThen in the web browser I can
  cast my content to the player and bypass the web player (and thus solve much of
  my transcoding issues) trivially!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/fx-json'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Fx-Json</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/typeddict'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Typeddict</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I use Jellyfin at home for serving up most of our media - movies
  and shows etc. My dream is to have a GPU capable of transcoding any and all of our
  media for smooth playback on any device... What can I do to still use Jellyfin but
  get smooth playback
now: 2024-06-26 16:50:21.524233
path: pages/blog/jellyfin-media-players.md
published: true
slug: jellyfin-media-players
super_description: I use Jellyfin at home for serving up most of our media - movies
  and shows etc. My dream is to have a GPU capable of transcoding any and all of our
  media for smooth playback on any device... What can I do to still use Jellyfin but
  get smooth playback? THe first answer is figure out why I suck with GPUs, but pausing
  that there I This is the reason I This cross-platform cast client is my answer now.
  The installation instrauctions are super straightforward for Windows, Mac OS, or
  Linux. I I used  A
tags:
- homelab
- tech
templateKey: blog-post
title: Jellyfin-Media-Players
today: 2024-06-26
---

I use Jellyfin at home for serving up most of our media - movies and shows etc.

My dream is to have a GPU capable of transcoding any and all of our media for smooth playback on any device...
Now, I thought I'd have that by now with my Nvidia Quadro P400 however I have issues left and right with 4k content.

What can I do to still use Jellyfin but get smooth playback?

THe first answer is figure out why I suck with GPUs, but pausing that there's shorter solutions -> namely, use a media player that's compatabile with the encoded content!

## VLC

I'll keep this one short - VLC is great and if you don't need a netflix like experience, I'd recommend just using it to browse your network drives and play whatever you have

## Jellyfin Web Player

This is the reason I'm writing this post... the web player is great but not everything is supported on all devices

## Jellyfin MPV Shim

This cross-platform cast client is my answer now.
You can find the project [here](https://github.com/jellyfin/jellyfin-mpv-shim/blob/master/README.md#linux-installation)

The installation instrauctions are super straightforward for Windows, Mac OS, or Linux.

I'm on Linux and so my install went like this:

```bash

sudo apt update
sudo apt install mpv 

pipx install jellyfin-mpv-shim
pipx inject jellyfin-mpv-shim pystray

#profit

```

I used `pipx` to install the player as I prefer it for stand alone utilities over pip installing anything globally.

Afer that I just start the player at the terminal with `jellyfin-mpv-shim`
Then in the web browser I can cast my content to the player and bypass the web player (and thus solve much of my transcoding issues) trivially!
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
    
    <a class='prev' href='/fx-json'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Fx-Json</p>
        </div>
    </a>
    
    <a class='next' href='/typeddict'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Typeddict</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>