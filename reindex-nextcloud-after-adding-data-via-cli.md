---
article_html: "<h1 id=\"my-nextcloud-woes\">My Nextcloud woes</h1>\n<p>I wrote <a
  href=\"\" title=\"nextcloud-permissions-with-zfs-and-ansible-nas\">here</a> about
  setting\nup <code>www-data</code> as the owner of any directories you want nextcloud
  to manage.\nHowever, I regularly struggle wtih permissions issues on my NAS because
  of the\nexternal storage app anyways so I've decided to just put our photos in the
  spot\nNextcloud would otherwise put them, and use this as healthy pressure on our\nfamily
  to organize our photos and put the ones we care about with the rest of\nour family
  media.</p>\n<h1 id=\"migration\">Migration</h1>\n<p>Because I had a ton of photos
  on the NAS anyways that I wanted moved over to\nNextcloud I just rsync'd the photos
  directory on my NAS to the user's photos\ndirectory in nextcloud but they weren't
  showing up in the web UI!</p>\n<h1 id=\"the-fix\">The Fix?</h1>\n<p>As www-data
  I needed to <code>php /var/www/nextcloud/occ files:scan --all</code> inside my\nnextcloud
  docker container AFTER moving a bunch of photos off my \"NAS\" into the\nfolder
  mounted to the nextcloud container as its data folder! Before I did this\nthey weren't
  showing up in the web UI/</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/add-colored-indicators-to-your-dataframes-html-representation'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Add
  colored indicators to your dataframes html representation</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/arr-download-client-config'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>arr client config</p>\n        </div>\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: ''
date: 2022-05-29
datetime: 2022-05-29 00:00:00+00:00
description: 'I wrote  Because I had a ton of photos on the NAS anyways that I wanted
  moved over to As www-data I needed to '
edit_link: https://github.com/edit/main/pages/til/reindex-nextcloud-after-adding-data-via-cli.md
html: "<h1 id=\"my-nextcloud-woes\">My Nextcloud woes</h1>\n<p>I wrote <a href=\"\"
  title=\"nextcloud-permissions-with-zfs-and-ansible-nas\">here</a> about setting\nup
  <code>www-data</code> as the owner of any directories you want nextcloud to manage.\nHowever,
  I regularly struggle wtih permissions issues on my NAS because of the\nexternal
  storage app anyways so I've decided to just put our photos in the spot\nNextcloud
  would otherwise put them, and use this as healthy pressure on our\nfamily to organize
  our photos and put the ones we care about with the rest of\nour family media.</p>\n<h1
  id=\"migration\">Migration</h1>\n<p>Because I had a ton of photos on the NAS anyways
  that I wanted moved over to\nNextcloud I just rsync'd the photos directory on my
  NAS to the user's photos\ndirectory in nextcloud but they weren't showing up in
  the web UI!</p>\n<h1 id=\"the-fix\">The Fix?</h1>\n<p>As www-data I needed to <code>php
  /var/www/nextcloud/occ files:scan --all</code> inside my\nnextcloud docker container
  AFTER moving a bunch of photos off my \"NAS\" into the\nfolder mounted to the nextcloud
  container as its data folder! Before I did this\nthey weren't showing up in the
  web UI/</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
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
  \   </style>\n\n    <a class='prev' href='/add-colored-indicators-to-your-dataframes-html-representation'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Add
  colored indicators to your dataframes html representation</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/arr-download-client-config'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>arr client config</p>\n        </div>\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: 'I wrote  Because I had a ton of photos on the NAS anyways that
  I wanted moved over to As www-data I needed to '
now: 2024-01-05 14:15:22.253677
path: pages/til/reindex-nextcloud-after-adding-data-via-cli.md
published: true
slug: reindex-nextcloud-after-adding-data-via-cli
super_description: 'I wrote  Because I had a ton of photos on the NAS anyways that
  I wanted moved over to As www-data I needed to '
tags:
- homelab
- linux
- tech
templateKey: til
title: Reindex Nextcloud After Adding Data via CLI
today: 2024-01-05
---

# My Nextcloud woes

I wrote [here]("nextcloud-permissions-with-zfs-and-ansible-nas") about setting
up `www-data` as the owner of any directories you want nextcloud to manage.
However, I regularly struggle wtih permissions issues on my NAS because of the
external storage app anyways so I've decided to just put our photos in the spot
Nextcloud would otherwise put them, and use this as healthy pressure on our
family to organize our photos and put the ones we care about with the rest of
our family media.

# Migration

Because I had a ton of photos on the NAS anyways that I wanted moved over to
Nextcloud I just rsync'd the photos directory on my NAS to the user's photos
directory in nextcloud but they weren't showing up in the web UI!

# The Fix?

As www-data I needed to `php /var/www/nextcloud/occ files:scan --all` inside my
nextcloud docker container AFTER moving a bunch of photos off my "NAS" into the
folder mounted to the nextcloud container as its data folder! Before I did this
they weren't showing up in the web UI/
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
    
    <a class='prev' href='/add-colored-indicators-to-your-dataframes-html-representation'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Add colored indicators to your dataframes html representation</p>
        </div>
    </a>
    
    <a class='next' href='/arr-download-client-config'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>arr client config</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>