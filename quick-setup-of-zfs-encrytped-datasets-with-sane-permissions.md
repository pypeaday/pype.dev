---
article_html: "<p>Assuming you have a pool called <code>tank</code>...</p>\n<p>And
  assuming you have an encrypted dataset (See <a href=\"https://arstechnica.com/gadgets/2021/06/a-quick-start-guide-to-openzfs-native-encryption/\">Jim
  Saltar's short\nintro</a>)</p>\n<ol>\n<li>Create a group for permissions - in my
  case I have one called <code>home</code></li>\n<li>Then if there's anything in <code>/tank/encrypted</code>
  his it with <code>chgrp -R home\n   /tank/encrypted</code> to give the <code>home</code>
  group ownership</li>\n<li>Next we need to make sure that the members of <code>home</code>
  can do the writing...\n   so <code>chmod 775 -R /tank/encrypted</code> will do the
  trick</li>\n<li>Finally we want to make sure that all data created inside our dataset
  has\n   the same set of permissions with <code>chmod g+s /tank/encrypted</code>
  and <code>chmod g+w\n   /tank/encrypted</code></li>\n</ol>\n<div class='prevnext'>\n\n
  \   <style type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n
  \     --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
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
  \   </style>\n\n    <a class='prev' href='/chara-joy'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Chara-Joy</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/abraham-and-melchizedek'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Abraham
  and Melchizedek</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-10-06
datetime: 2022-10-06 00:00:00+00:00
description: Assuming you have a pool called  And assuming you have an encrypted dataset
  (See  Create a group for permissions - in my case I have one called  Then if there
  N
edit_link: https://github.com/edit/main/pages/til/quick-setup-of-zfs-encrytped-datasets-with-sane-permissions.md
html: "<p>Assuming you have a pool called <code>tank</code>...</p>\n<p>And assuming
  you have an encrypted dataset (See <a href=\"https://arstechnica.com/gadgets/2021/06/a-quick-start-guide-to-openzfs-native-encryption/\">Jim
  Saltar's short\nintro</a>)</p>\n<ol>\n<li>Create a group for permissions - in my
  case I have one called <code>home</code></li>\n<li>Then if there's anything in <code>/tank/encrypted</code>
  his it with <code>chgrp -R home\n   /tank/encrypted</code> to give the <code>home</code>
  group ownership</li>\n<li>Next we need to make sure that the members of <code>home</code>
  can do the writing...\n   so <code>chmod 775 -R /tank/encrypted</code> will do the
  trick</li>\n<li>Finally we want to make sure that all data created inside our dataset
  has\n   the same set of permissions with <code>chmod g+s /tank/encrypted</code>
  and <code>chmod g+w\n   /tank/encrypted</code></li>\n</ol>\n<div class='prevnext'>\n\n
  \   <style type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n
  \     --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
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
  \   </style>\n\n    <a class='prev' href='/chara-joy'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Chara-Joy</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/abraham-and-melchizedek'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Abraham
  and Melchizedek</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Assuming you have a pool called  And assuming you have an encrypted
  dataset (See  Create a group for permissions - in my case I have one called  Then
  if there Next we need to make sure that the members of  Finally we want to make
  sure that all data c
now: 2024-10-12 11:09:11.872274
path: pages/til/quick-setup-of-zfs-encrytped-datasets-with-sane-permissions.md
published: true
slug: quick-setup-of-zfs-encrytped-datasets-with-sane-permissions
super_description: Assuming you have a pool called  And assuming you have an encrypted
  dataset (See  Create a group for permissions - in my case I have one called  Then
  if there Next we need to make sure that the members of  Finally we want to make
  sure that all data created inside our dataset has
tags:
- zfs
- homelab
- tech
templateKey: til
title: Quick setup of ZFS encrytped datasets with sane permissions
today: 2024-10-12
---

Assuming you have a pool called `tank`...

And assuming you have an encrypted dataset (See [Jim Saltar's short
intro](https://arstechnica.com/gadgets/2021/06/a-quick-start-guide-to-openzfs-native-encryption/))

1. Create a group for permissions - in my case I have one called `home`
2. Then if there's anything in `/tank/encrypted` his it with `chgrp -R home
   /tank/encrypted` to give the `home` group ownership
3. Next we need to make sure that the members of `home` can do the writing...
   so `chmod 775 -R /tank/encrypted` will do the trick
4. Finally we want to make sure that all data created inside our dataset has
   the same set of permissions with `chmod g+s /tank/encrypted` and `chmod g+w
   /tank/encrypted`
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
    
    <a class='prev' href='/chara-joy'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Chara-Joy</p>
        </div>
    </a>
    
    <a class='next' href='/abraham-and-melchizedek'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Abraham and Melchizedek</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>