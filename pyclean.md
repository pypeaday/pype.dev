---
article_html: "<p>I like to keep my workspace clean and one thing that I don't personally
  love looking at is the <code>__pycache__</code> directory that pops up after running
  some code.\nThe <code>*.pyc</code> files that show up there are python bytecode
  and they are cached to make subsequent runs a tad faster. \nMy stuff never really
  needs this bonus speed boost and so I came across a neat tool called <code>pyclean</code>!</p>\n<h2
  id=\"pyclean\">Pyclean</h2>\n<p>The easiest way (<strong>in my opinion</strong>)
  to run <code>pyclean</code> is to just use <code>pipx run</code>.</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox/src<span
  class=\"w\">  </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\">
  </span>\U0001F5D1️<span class=\"w\">  </span>×3\U0001F6E4️<span class=\"w\">  </span>×2via<span
  class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
  </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
  \ </span>took<span class=\"w\"> </span>9s\n❯<span class=\"w\"> </span>ls\nabcmeta.py<span
  class=\"w\">  </span>__pycache__<span class=\"w\">  </span>python-print-align.py<span
  class=\"w\">  </span>system-monitor-psutils.py\n\nsandbox/src<span class=\"w\">
  \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1️<span
  class=\"w\">  </span>×3\U0001F6E4️<span class=\"w\">  </span>×2via<span class=\"w\">
  </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\"> </span><span
  class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>pipx<span
  class=\"w\"> </span>run<span class=\"w\"> </span>pyclean<span class=\"w\"> </span>.\n⚠️<span
  class=\"w\">  </span>pyclean<span class=\"w\"> </span>is<span class=\"w\"> </span>already<span
  class=\"w\"> </span>on<span class=\"w\"> </span>your<span class=\"w\"> </span>PATH<span
  class=\"w\"> </span>and<span class=\"w\"> </span>installed<span class=\"w\"> </span>at<span
  class=\"w\"> </span>/usr/bin/pyclean.<span class=\"w\"> </span>Downloading<span
  class=\"w\"> </span>and<span class=\"w\"> </span>running<span class=\"w\"> </span>anyway.\nCleaning<span
  class=\"w\"> </span>directory<span class=\"w\"> </span>.\nTotal<span class=\"w\">
  </span><span class=\"m\">1</span><span class=\"w\"> </span>files,<span class=\"w\">
  </span><span class=\"m\">1</span><span class=\"w\"> </span>directories<span class=\"w\">
  </span>removed.\n\nsandbox/src<span class=\"w\">  </span>\U0001F331<span class=\"w\">
  </span>main<span class=\"w\"> </span>\U0001F5D1️<span class=\"w\">  </span>×3\U0001F6E4️<span
  class=\"w\">  </span>×2via<span class=\"w\"> </span>\U0001F40D<span class=\"w\">
  </span>v3.8.11<span class=\"w\"> </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n❯<span
  class=\"w\"> </span>ls\nabcmeta.py<span class=\"w\">  </span>python-print-align.py<span
  class=\"w\">  </span>system-monitor-psutils.py\n</code></pre></div>\n<h2 id=\"why-not-bash\">Why
  not bash?</h2>\n<p>You could accomplish something similar with <code>rm **/*.pyc</code>
  or <code>find -n '*.py?' -delete</code> but there's a chance you'll find something
  you don't love gone.\nAlso this won't help our poor Windows friends out there!\n<code>pyclean</code>
  is fully python so it's OS independent.</p>\n<h2 id=\"credits\">Credits!</h2>\n<p><a
  href=\"https://github.com/bittner/pyclean\">repo</a></p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/truenas-and-wireguard'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Truenas-And-Wireguard</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/psutils-01'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Psutil-01</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/pyclean.png
date: 2022-03-22
datetime: 2022-03-22 00:00:00+00:00
description: 'I like to keep my workspace clean and one thing that I don The easiest
  way ( You could accomplish something similar with '
edit_link: https://github.com/edit/main/pages/til/pyclean.md
html: "<p>I like to keep my workspace clean and one thing that I don't personally
  love looking at is the <code>__pycache__</code> directory that pops up after running
  some code.\nThe <code>*.pyc</code> files that show up there are python bytecode
  and they are cached to make subsequent runs a tad faster. \nMy stuff never really
  needs this bonus speed boost and so I came across a neat tool called <code>pyclean</code>!</p>\n<h2
  id=\"pyclean\">Pyclean</h2>\n<p>The easiest way (<strong>in my opinion</strong>)
  to run <code>pyclean</code> is to just use <code>pipx run</code>.</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox/src<span
  class=\"w\">  </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\">
  </span>\U0001F5D1️<span class=\"w\">  </span>×3\U0001F6E4️<span class=\"w\">  </span>×2via<span
  class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
  </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
  \ </span>took<span class=\"w\"> </span>9s\n❯<span class=\"w\"> </span>ls\nabcmeta.py<span
  class=\"w\">  </span>__pycache__<span class=\"w\">  </span>python-print-align.py<span
  class=\"w\">  </span>system-monitor-psutils.py\n\nsandbox/src<span class=\"w\">
  \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1️<span
  class=\"w\">  </span>×3\U0001F6E4️<span class=\"w\">  </span>×2via<span class=\"w\">
  </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\"> </span><span
  class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>pipx<span
  class=\"w\"> </span>run<span class=\"w\"> </span>pyclean<span class=\"w\"> </span>.\n⚠️<span
  class=\"w\">  </span>pyclean<span class=\"w\"> </span>is<span class=\"w\"> </span>already<span
  class=\"w\"> </span>on<span class=\"w\"> </span>your<span class=\"w\"> </span>PATH<span
  class=\"w\"> </span>and<span class=\"w\"> </span>installed<span class=\"w\"> </span>at<span
  class=\"w\"> </span>/usr/bin/pyclean.<span class=\"w\"> </span>Downloading<span
  class=\"w\"> </span>and<span class=\"w\"> </span>running<span class=\"w\"> </span>anyway.\nCleaning<span
  class=\"w\"> </span>directory<span class=\"w\"> </span>.\nTotal<span class=\"w\">
  </span><span class=\"m\">1</span><span class=\"w\"> </span>files,<span class=\"w\">
  </span><span class=\"m\">1</span><span class=\"w\"> </span>directories<span class=\"w\">
  </span>removed.\n\nsandbox/src<span class=\"w\">  </span>\U0001F331<span class=\"w\">
  </span>main<span class=\"w\"> </span>\U0001F5D1️<span class=\"w\">  </span>×3\U0001F6E4️<span
  class=\"w\">  </span>×2via<span class=\"w\"> </span>\U0001F40D<span class=\"w\">
  </span>v3.8.11<span class=\"w\"> </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n❯<span
  class=\"w\"> </span>ls\nabcmeta.py<span class=\"w\">  </span>python-print-align.py<span
  class=\"w\">  </span>system-monitor-psutils.py\n</code></pre></div>\n<h2 id=\"why-not-bash\">Why
  not bash?</h2>\n<p>You could accomplish something similar with <code>rm **/*.pyc</code>
  or <code>find -n '*.py?' -delete</code> but there's a chance you'll find something
  you don't love gone.\nAlso this won't help our poor Windows friends out there!\n<code>pyclean</code>
  is fully python so it's OS independent.</p>\n<h2 id=\"credits\">Credits!</h2>\n<p><a
  href=\"https://github.com/bittner/pyclean\">repo</a></p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/truenas-and-wireguard'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Truenas-And-Wireguard</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/psutils-01'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Psutil-01</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I like to keep my workspace clean and one thing that I don The
  easiest way ( You could accomplish something similar with '
now: 2024-08-01 13:40:17.987385
path: pages/til/pyclean.md
published: true
slug: pyclean
super_description: 'I like to keep my workspace clean and one thing that I don The
  easiest way ( You could accomplish something similar with '
tags:
- python
- tech
templateKey: til
title: Pyclean
today: 2024-08-01
---

I like to keep my workspace clean and one thing that I don't personally love looking at is the `__pycache__` directory that pops up after running some code.
The `*.pyc` files that show up there are python bytecode and they are cached to make subsequent runs a tad faster. 
My stuff never really needs this bonus speed boost and so I came across a neat tool called `pyclean`!

## Pyclean

The easiest way (**in my opinion**) to run `pyclean` is to just use `pipx run`.

```bash
sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)  took 9s
❯ ls
abcmeta.py  __pycache__  python-print-align.py  system-monitor-psutils.py

sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)
❯ pipx run pyclean .
⚠️  pyclean is already on your PATH and installed at /usr/bin/pyclean. Downloading and running anyway.
Cleaning directory .
Total 1 files, 1 directories removed.

sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)
❯ ls
abcmeta.py  python-print-align.py  system-monitor-psutils.py

```

## Why not bash?

You could accomplish something similar with `rm **/*.pyc` or `find -n '*.py?' -delete` but there's a chance you'll find something you don't love gone.
Also this won't help our poor Windows friends out there!
`pyclean` is fully python so it's OS independent.

## Credits!

[repo](https://github.com/bittner/pyclean)
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
    
    <a class='prev' href='/truenas-and-wireguard'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Truenas-And-Wireguard</p>
        </div>
    </a>
    
    <a class='next' href='/psutils-01'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Psutil-01</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>