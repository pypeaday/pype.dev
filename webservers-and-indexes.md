---
article_html: "<p>I host a lot of services in my homelab, but they're mostly dockerized
  applications so I have never had to care much about how content gets served up.\nToday
  I had several little concepts click into place regarding webservers, and it was
  a similar experience to when I started homelabing and didn't know what a \"server\"
  was in the first place.</p>\n<h1 id=\"servers\">Servers</h1>\n<p>A \"server\" can
  have a lot of different meanings but specifically in my world it was a physical
  server, like my PowerEdge R610 which acts as my main \"home server\".\nBut then
  on my server, I have other servers... Jellyfin is my main media server - but that's
  obviously not a hardware thing, that's software. \nThis is certainly not a groundbreaking
  thing but it was a tiny piece to the puzzle that I was missing... that \"server\"
  is highly contextual.</p>\n<h1 id=\"webservers\">Webservers</h1>\n<p>Something that
  confused the heck out of me when I first started down the road of having a server
  was what a webserver even was...\nI always thought the \"webserver\" was just \"a
  server that hosts a website\"... and yes, that's true, but also it wasn't true in
  how I understood \"server\".\nIt turns out that across my 40-odd dockerized services
  I have at home that I must have about 40-odd web servers running, each docker container
  is spinning up its own!</p>\n<p>So something I have wanted to do for a long time
  is put my theology notes online for my small group to access whenever they might
  want... it doesn't need to be fancy or anything.\nMy issue was not knowing what
  to even Google. I tried \"How to serve up static html\" but that kind of search
  is for people who know what a \"static\" site is - I am not one of those people.\nI
  kept running across nginx and apache things, wordpress and other website building
  tools, etc.\nIn fact I only recently learned that JavaScript assets cann still be
  considered static so I am a complete baby in the web-dev space.</p>\n<p>What I really
  wanted was just a simple landing page with a link to each of my \"posts\" which
  are in the form of a single html file each that I can easily export from my tiddlywiki
  (I have a post about tiddlywiki <a href=\"/tiddly-wiki\">here</a>)</p>\n<p>The first
  win <code>python -m http.server</code> right in the directory I kept my html files
  in and that got me what I wanted functionally. \nBut then I wanted just a hair more
  organization...\nI started looking for a way to dynamically generate an index for
  a directory of html files but again the verbiage of that Google search just wasn't
  helping me - I didn't want anything complicated and I knew that what I wanted had
  to be easy...</p>\n<h1 id=\"the-index\">The Index</h1>\n<p>Luckily I randomly came
  across a SO that mentioned a Linux utility called <code>tree</code> which does exactly
  what I wanted!</p>\n<p>See my TIL on <code>tree</code> <a href=\"\" title=\"/tree\">here</a></p>\n<p>So
  now it goes like this:</p>\n<ul>\n<li>Take notes on X in my tiddlywiki</li>\n<li>Export
  that tiddler to a html file </li>\n<li>Put that html file into a <code>notes</code>
  folder in my github repo for small group notes </li>\n<li>Use <code>tree</code>
  to generate an <code>index.html</code> of each of those files in the <code>notes</code>
  directory</li>\n<li>Use <code>python -m http.server</code> to start a web server
  that lands me at the <code>index.html</code> and now I can click through to any
  post!</li>\n</ul>\n<p>It's not fancy but it's functional... \nThis site/blog is
  built with markdown and <a href=\"https://www.markata.dev\">markata</a> and I wanted
  way more functionality in my tech notes.\nBut for this simple use case I learned
  a ton about <em>how</em> content gets served up on a webpage and my small group
  benefits from the easy access as well!</p>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/adblock-coverage'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Adblock-Coverage</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/tree'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Tree</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/webservers-and-indexes.png
date: 2022-03-06
datetime: 2022-03-06 00:00:00+00:00
description: 'I host a lot of services in my homelab, but they A  Something that confused
  the heck out of me when I first started down the road of having a server was what
  a '
edit_link: https://github.com/edit/main/pages/til/webservers-and-indexes.md
html: "<p>I host a lot of services in my homelab, but they're mostly dockerized applications
  so I have never had to care much about how content gets served up.\nToday I had
  several little concepts click into place regarding webservers, and it was a similar
  experience to when I started homelabing and didn't know what a \"server\" was in
  the first place.</p>\n<h1 id=\"servers\">Servers</h1>\n<p>A \"server\" can have
  a lot of different meanings but specifically in my world it was a physical server,
  like my PowerEdge R610 which acts as my main \"home server\".\nBut then on my server,
  I have other servers... Jellyfin is my main media server - but that's obviously
  not a hardware thing, that's software. \nThis is certainly not a groundbreaking
  thing but it was a tiny piece to the puzzle that I was missing... that \"server\"
  is highly contextual.</p>\n<h1 id=\"webservers\">Webservers</h1>\n<p>Something that
  confused the heck out of me when I first started down the road of having a server
  was what a webserver even was...\nI always thought the \"webserver\" was just \"a
  server that hosts a website\"... and yes, that's true, but also it wasn't true in
  how I understood \"server\".\nIt turns out that across my 40-odd dockerized services
  I have at home that I must have about 40-odd web servers running, each docker container
  is spinning up its own!</p>\n<p>So something I have wanted to do for a long time
  is put my theology notes online for my small group to access whenever they might
  want... it doesn't need to be fancy or anything.\nMy issue was not knowing what
  to even Google. I tried \"How to serve up static html\" but that kind of search
  is for people who know what a \"static\" site is - I am not one of those people.\nI
  kept running across nginx and apache things, wordpress and other website building
  tools, etc.\nIn fact I only recently learned that JavaScript assets cann still be
  considered static so I am a complete baby in the web-dev space.</p>\n<p>What I really
  wanted was just a simple landing page with a link to each of my \"posts\" which
  are in the form of a single html file each that I can easily export from my tiddlywiki
  (I have a post about tiddlywiki <a href=\"/tiddly-wiki\">here</a>)</p>\n<p>The first
  win <code>python -m http.server</code> right in the directory I kept my html files
  in and that got me what I wanted functionally. \nBut then I wanted just a hair more
  organization...\nI started looking for a way to dynamically generate an index for
  a directory of html files but again the verbiage of that Google search just wasn't
  helping me - I didn't want anything complicated and I knew that what I wanted had
  to be easy...</p>\n<h1 id=\"the-index\">The Index</h1>\n<p>Luckily I randomly came
  across a SO that mentioned a Linux utility called <code>tree</code> which does exactly
  what I wanted!</p>\n<p>See my TIL on <code>tree</code> <a href=\"\" title=\"/tree\">here</a></p>\n<p>So
  now it goes like this:</p>\n<ul>\n<li>Take notes on X in my tiddlywiki</li>\n<li>Export
  that tiddler to a html file </li>\n<li>Put that html file into a <code>notes</code>
  folder in my github repo for small group notes </li>\n<li>Use <code>tree</code>
  to generate an <code>index.html</code> of each of those files in the <code>notes</code>
  directory</li>\n<li>Use <code>python -m http.server</code> to start a web server
  that lands me at the <code>index.html</code> and now I can click through to any
  post!</li>\n</ul>\n<p>It's not fancy but it's functional... \nThis site/blog is
  built with markdown and <a href=\"https://www.markata.dev\">markata</a> and I wanted
  way more functionality in my tech notes.\nBut for this simple use case I learned
  a ton about <em>how</em> content gets served up on a webpage and my small group
  benefits from the easy access as well!</p>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/adblock-coverage'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Adblock-Coverage</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/tree'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Tree</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I host a lot of services in my homelab, but they A  Something that
  confused the heck out of me when I first started down the road of having a server
  was what a webserver even was... So something I have wanted to do for a long time
  is put my theology '
now: 2024-01-05 14:15:22.253838
path: pages/til/webservers-and-indexes.md
published: true
slug: webservers-and-indexes
super_description: I host a lot of services in my homelab, but they A  Something that
  confused the heck out of me when I first started down the road of having a server
  was what a webserver even was... So something I have wanted to do for a long time
  is put my theology notes online for my small group to access whenever they might
  want... it doesn What I really wanted was just a simple landing page with a link
  to each of my  The first win  Luckily I randomly came across a SO that mentioned
  a Linux utility called  Se
tags:
- homelab
- tech
templateKey: til
title: Webservers-And-Indexes
today: 2024-01-05
---

I host a lot of services in my homelab, but they're mostly dockerized applications so I have never had to care much about how content gets served up.
Today I had several little concepts click into place regarding webservers, and it was a similar experience to when I started homelabing and didn't know what a "server" was in the first place.

# Servers

A "server" can have a lot of different meanings but specifically in my world it was a physical server, like my PowerEdge R610 which acts as my main "home server".
But then on my server, I have other servers... Jellyfin is my main media server - but that's obviously not a hardware thing, that's software. 
This is certainly not a groundbreaking thing but it was a tiny piece to the puzzle that I was missing... that "server" is highly contextual.

# Webservers 

Something that confused the heck out of me when I first started down the road of having a server was what a webserver even was...
I always thought the "webserver" was just "a server that hosts a website"... and yes, that's true, but also it wasn't true in how I understood "server".
It turns out that across my 40-odd dockerized services I have at home that I must have about 40-odd web servers running, each docker container is spinning up its own!

So something I have wanted to do for a long time is put my theology notes online for my small group to access whenever they might want... it doesn't need to be fancy or anything.
My issue was not knowing what to even Google. I tried "How to serve up static html" but that kind of search is for people who know what a "static" site is - I am not one of those people.
I kept running across nginx and apache things, wordpress and other website building tools, etc.
In fact I only recently learned that JavaScript assets cann still be considered static so I am a complete baby in the web-dev space.

What I really wanted was just a simple landing page with a link to each of my "posts" which are in the form of a single html file each that I can easily export from my tiddlywiki (I have a post about tiddlywiki [here](/tiddly-wiki))

The first win `python -m http.server` right in the directory I kept my html files in and that got me what I wanted functionally. 
But then I wanted just a hair more organization...
I started looking for a way to dynamically generate an index for a directory of html files but again the verbiage of that Google search just wasn't helping me - I didn't want anything complicated and I knew that what I wanted had to be easy...

# The Index 

Luckily I randomly came across a SO that mentioned a Linux utility called `tree` which does exactly what I wanted!

See my TIL on `tree` [here]('/tree')

So now it goes like this:

* Take notes on X in my tiddlywiki
* Export that tiddler to a html file 
* Put that html file into a `notes` folder in my github repo for small group notes 
* Use `tree` to generate an `index.html` of each of those files in the `notes` directory
* Use `python -m http.server` to start a web server that lands me at the `index.html` and now I can click through to any post!

It's not fancy but it's functional... 
This site/blog is built with markdown and [markata](https://www.markata.dev) and I wanted way more functionality in my tech notes.
But for this simple use case I learned a ton about _how_ content gets served up on a webpage and my small group benefits from the easy access as well!
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
    
    <a class='prev' href='/adblock-coverage'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Adblock-Coverage</p>
        </div>
    </a>
    
    <a class='next' href='/tree'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Tree</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>