---
article_html: "<p><a href=\"https://tiddlywiki.com/\">Tiddly Wiki</a> is a great note
  taking utility for organizing non-linear notes.\nI used it to replace my OneNote
  workflow and my only complaint is I don't have an easy way to access and edit my
  tiddlers (posts) if I'm not at home.</p>\n<p>The tiddlywiki is just an <code>html</code>
  file with a ton of stuff above my head baked in. \nI have a barebones repo with
  some notes and a nice starter tiddly wiki init on <a href=\"https://github.com/nicpayne713/tiddlywiki-tutorial\">my
  github</a>.\nUsage is pretty basic... Just grab the <code>notebook/template.htlm</code>
  and save it to anywhere convenient on your computer.\nI put mine on my NAS to have
  the security of backups since I don't keep my tidldlywiki in a git repo (I don't
  really want to look at the diff).</p>\n<p>Taking notes in the tidlywiki is nice
  because it supports a format similar to Markdown although it is specific to tidlywiki.
  \nTiddlers (each post in the wiki) can be tagged and linked together and it's really
  easy to send notes to someone by just exporting an html file and emailing it since
  it'll open up by default in a broswer with all the nice formatting already apart
  of it.\nI was using it primarily for taking notes for a small group I lead and sending
  those notes each week.\nThe group benefited from nicely formatted notes and I benefited
  from a centralized place to keep them all that Microsoft didn't own!</p>\n<p>Here's
  an example of the body of a tiddler with some tiddlywiki specific formatting:</p>\n<div
  class=\"highlight\"><pre><span></span><code>! Static IPs on Linux\n\n//Ubuntu 20//\n\nSetting
  static IP on Ubuntu 20.04\n\n# Navigate to /etc/netplan\n# Open the yaml file (the
  name seems to be kind of random but it seems to starts with 00 or 05)\n# Change
  the file as below with your desired settings\n# Run `sudo netplan apply` to have
  changes reflected\n\n    ```yaml\n    network:\n      version: 2\n      ethernets:\n
  \       enp0s4:\n          addresses: [192.168.1.{Static IP}/24]\n          gateway4:
  192.168.1.1\n          nameservers:\n            addresses: [8.8.4.4, 8.8.8.8]\n
  \   ```\n</code></pre></div>\n<p><img alt=\"Alt text\" src=\"/images/tiddlywiki-example.png\"
  title=\"A Tiddler\" /></p>\n<p>The <code>#</code> create a numbered list, <code>//</code>
  creates an italicized heading, and <code>!</code> creates headings similar to Markdown's
  <code>#</code>. The differences aren't too bad to keep in mind and what renders
  out is totally depenent on the tidlywiki itself. \nMy template has a nice nord feel
  to it, feel free to download from my github and try it out!</p>\n<blockquote>\n<p>I
  have moved away from my tiddlywiki workflow in favor of sites like this since I
  can git commit markdown files and build with <a href=\"https://markata.dev/\">markata</a>
  pretty easily (credit <a href=\"www.waylonwalker.com\">waylon walker</a>)</p>\n<p>I
  still use tiddlywiki for tracking some todo items and questions --- I may have another
  solution in the future</p>\n</blockquote>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/webservers-and-indexes'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Webservers-And-Indexes</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/pandas-select-dtypes'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Pandas-Select-Dtypes</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/tiddly-wiki.png
date: 2022-03-05
datetime: 2022-03-05 00:00:00+00:00
description: The tiddlywiki is just an  Taking notes in the tidlywiki is nice because
  it supports a format similar to Markdown although it is specific to tidlywiki. Here
  The
edit_link: https://github.com/edit/main/pages/blog/tiddly-wiki.md
html: "<p><a href=\"https://tiddlywiki.com/\">Tiddly Wiki</a> is a great note taking
  utility for organizing non-linear notes.\nI used it to replace my OneNote workflow
  and my only complaint is I don't have an easy way to access and edit my tiddlers
  (posts) if I'm not at home.</p>\n<p>The tiddlywiki is just an <code>html</code>
  file with a ton of stuff above my head baked in. \nI have a barebones repo with
  some notes and a nice starter tiddly wiki init on <a href=\"https://github.com/nicpayne713/tiddlywiki-tutorial\">my
  github</a>.\nUsage is pretty basic... Just grab the <code>notebook/template.htlm</code>
  and save it to anywhere convenient on your computer.\nI put mine on my NAS to have
  the security of backups since I don't keep my tidldlywiki in a git repo (I don't
  really want to look at the diff).</p>\n<p>Taking notes in the tidlywiki is nice
  because it supports a format similar to Markdown although it is specific to tidlywiki.
  \nTiddlers (each post in the wiki) can be tagged and linked together and it's really
  easy to send notes to someone by just exporting an html file and emailing it since
  it'll open up by default in a broswer with all the nice formatting already apart
  of it.\nI was using it primarily for taking notes for a small group I lead and sending
  those notes each week.\nThe group benefited from nicely formatted notes and I benefited
  from a centralized place to keep them all that Microsoft didn't own!</p>\n<p>Here's
  an example of the body of a tiddler with some tiddlywiki specific formatting:</p>\n<div
  class=\"highlight\"><pre><span></span><code>! Static IPs on Linux\n\n//Ubuntu 20//\n\nSetting
  static IP on Ubuntu 20.04\n\n# Navigate to /etc/netplan\n# Open the yaml file (the
  name seems to be kind of random but it seems to starts with 00 or 05)\n# Change
  the file as below with your desired settings\n# Run `sudo netplan apply` to have
  changes reflected\n\n    ```yaml\n    network:\n      version: 2\n      ethernets:\n
  \       enp0s4:\n          addresses: [192.168.1.{Static IP}/24]\n          gateway4:
  192.168.1.1\n          nameservers:\n            addresses: [8.8.4.4, 8.8.8.8]\n
  \   ```\n</code></pre></div>\n<p><img alt=\"Alt text\" src=\"/images/tiddlywiki-example.png\"
  title=\"A Tiddler\" /></p>\n<p>The <code>#</code> create a numbered list, <code>//</code>
  creates an italicized heading, and <code>!</code> creates headings similar to Markdown's
  <code>#</code>. The differences aren't too bad to keep in mind and what renders
  out is totally depenent on the tidlywiki itself. \nMy template has a nice nord feel
  to it, feel free to download from my github and try it out!</p>\n<blockquote>\n<p>I
  have moved away from my tiddlywiki workflow in favor of sites like this since I
  can git commit markdown files and build with <a href=\"https://markata.dev/\">markata</a>
  pretty easily (credit <a href=\"www.waylonwalker.com\">waylon walker</a>)</p>\n<p>I
  still use tiddlywiki for tracking some todo items and questions --- I may have another
  solution in the future</p>\n</blockquote>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/webservers-and-indexes'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Webservers-And-Indexes</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/pandas-select-dtypes'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Pandas-Select-Dtypes</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: The tiddlywiki is just an  Taking notes in the tidlywiki is nice
  because it supports a format similar to Markdown although it is specific to tidlywiki.
  Here The  I have moved away from my tiddlywiki workflow in favor of sites like this
  since I can gi
now: 2024-06-26 16:50:21.524243
path: pages/blog/tiddly-wiki.md
published: true
slug: tiddly-wiki
super_description: The tiddlywiki is just an  Taking notes in the tidlywiki is nice
  because it supports a format similar to Markdown although it is specific to tidlywiki.
  Here The  I have moved away from my tiddlywiki workflow in favor of sites like this
  since I can git commit markdown files and build with  I still use tiddlywiki for
  tracking some todo items and questions --- I may have another solution in the future
tags:
- tech
templateKey: blog-post
title: Tiddly-Wiki
today: 2024-06-26
---

[Tiddly Wiki](https://tiddlywiki.com/) is a great note taking utility for organizing non-linear notes.
I used it to replace my OneNote workflow and my only complaint is I don't have an easy way to access and edit my tiddlers (posts) if I'm not at home.

The tiddlywiki is just an `html` file with a ton of stuff above my head baked in. 
I have a barebones repo with some notes and a nice starter tiddly wiki init on [my github](https://github.com/nicpayne713/tiddlywiki-tutorial).
Usage is pretty basic... Just grab the `notebook/template.htlm` and save it to anywhere convenient on your computer.
I put mine on my NAS to have the security of backups since I don't keep my tidldlywiki in a git repo (I don't really want to look at the diff).

Taking notes in the tidlywiki is nice because it supports a format similar to Markdown although it is specific to tidlywiki. 
Tiddlers (each post in the wiki) can be tagged and linked together and it's really easy to send notes to someone by just exporting an html file and emailing it since it'll open up by default in a broswer with all the nice formatting already apart of it.
I was using it primarily for taking notes for a small group I lead and sending those notes each week.
The group benefited from nicely formatted notes and I benefited from a centralized place to keep them all that Microsoft didn't own!

Here's an example of the body of a tiddler with some tiddlywiki specific formatting:

```
! Static IPs on Linux

//Ubuntu 20//

Setting static IP on Ubuntu 20.04

# Navigate to /etc/netplan
# Open the yaml file (the name seems to be kind of random but it seems to starts with 00 or 05)
# Change the file as below with your desired settings
# Run `sudo netplan apply` to have changes reflected

    ```yaml
    network:
      version: 2
      ethernets:
        enp0s4:
          addresses: [192.168.1.{Static IP}/24]
          gateway4: 192.168.1.1
          nameservers:
            addresses: [8.8.4.4, 8.8.8.8]
    ```

```


![Alt text](/images/tiddlywiki-example.png "A Tiddler")

The `#` create a numbered list, `//` creates an italicized heading, and `!` creates headings similar to Markdown's `#`. The differences aren't too bad to keep in mind and what renders out is totally depenent on the tidlywiki itself. 
My template has a nice nord feel to it, feel free to download from my github and try it out!

> I have moved away from my tiddlywiki workflow in favor of sites like this since I can git commit markdown files and build with [markata](https://markata.dev/) pretty easily (credit [waylon walker](www.waylonwalker.com))

> I still use tiddlywiki for tracking some todo items and questions --- I may have another solution in the future
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
    
    <a class='prev' href='/webservers-and-indexes'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Webservers-And-Indexes</p>
        </div>
    </a>
    
    <a class='next' href='/pandas-select-dtypes'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Pandas-Select-Dtypes</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>