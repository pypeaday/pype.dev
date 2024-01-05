---
article_html: "<p><code>pipx</code> is a tool I've been using to solve a few problems
  of mine...</p>\n<ol>\n<li>pinning formatting tools like <code>black</code>, <code>flake8</code>,
  <code>isort</code>, etc. to the same version for all my projects</li>\n<li>keeping
  virtual environments clean of things like <code>cookiecutter</code></li>\n<li>python
  utilities I want system wide but not in the global environment, like <code>visidata</code></li>\n</ol>\n<h2
  id=\"what-is-it\">What is it?</h2>\n<p><code>pip</code> itself is just a package
  manager like <code>homebrew</code>, <code>apt</code>, etc. But it is tied to a python
  environment.\nIf you aren't using a virtual environment then <code>pip</code> will
  operate inside the global installation of python.</p>\n<p>Operating within that
  environment has burned me several times and now I have a strict virtual environment
  usage policy.</p>\n<p>But there are still things I don't want to have to put in
  every virtual environment - enter <code>pipx</code></p>\n<h2 id=\"whats-it-do\">What's
  it do?</h2>\n<p>When you <code>pipx install {package}</code> a stand alone virtual
  environment gets created (by default in <code>~/.local/pipx/venvs</code>).\nTHen
  you can install extra dependencies with <code>pipx inject {package} {dependency}</code></p>\n<blockquote>\n<p>ex.
  After <code>pipx install visidata</code> in order to open Excel files you need to
  <code>pipx inject visidata xlrd</code></p>\n</blockquote>\n<p>In the example with
  <code>visidata</code>, I can then use it anywhere, in any project, without re-installing
  with <code>pip</code> in every env.</p>\n<p>Also for the formatting tools - I configure
  vim to run the <code>pipx</code> versions of them on save - this way I don't have
  to put them in every project's virtual environment!</p>\n<h2 id=\"what-about-pip\">What
  about pip?</h2>\n<p>So obviously you can't <code>pipx</code> everything, nor do
  you want to. \nI see it as a safe and better alternative to global package installation.</p>\n<p>How
  can you then be sure that you never <code>pip install</code> into the global env?</p>\n<p>Add
  <code>require-virtualenv = True</code> to your <code>pip.conf</code> and you're
  good to go!</p>\n<p>With that set, if you try to <code>pip install pandas</code>
  into the global env you'll get a message like this:</p>\n<div class=\"highlight\"><pre><span></span><code>~<span
  class=\"w\"> </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span><span class=\"w\">  </span>NO<span
  class=\"w\"> </span>PYTHON<span class=\"w\"> </span>VENV<span class=\"w\"> </span>SET\n❯<span
  class=\"w\"> </span>pip<span class=\"w\"> </span>install<span class=\"w\"> </span>pandas\nERROR:<span
  class=\"w\"> </span>Could<span class=\"w\"> </span>not<span class=\"w\"> </span>find<span
  class=\"w\"> </span>an<span class=\"w\"> </span>activated<span class=\"w\"> </span>virtualenv<span
  class=\"w\"> </span><span class=\"o\">(</span>required<span class=\"o\">)</span>.\n</code></pre></div>\n<h2
  id=\"end\">End</h2>\n<ol>\n<li>Disable your system <code>pip</code> to keep your
  base python safe</li>\n<li>Use <code>pipx</code> for tools you want available everywhere
  or don't have to need in a virtual environment!</li>\n</ol>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/htop'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Htop</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/fx-json'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Fx-Json</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/pipx.png
date: 2022-04-22
datetime: 2022-04-22 00:00:00+00:00
description: pipx pinning formatting tools like  keeping virtual environments clean
  of things like  python utilities I want system wide but not in the global environment,
  li
edit_link: https://github.com/edit/main/pages/blog/pipx.md
html: "<p><code>pipx</code> is a tool I've been using to solve a few problems of mine...</p>\n<ol>\n<li>pinning
  formatting tools like <code>black</code>, <code>flake8</code>, <code>isort</code>,
  etc. to the same version for all my projects</li>\n<li>keeping virtual environments
  clean of things like <code>cookiecutter</code></li>\n<li>python utilities I want
  system wide but not in the global environment, like <code>visidata</code></li>\n</ol>\n<h2
  id=\"what-is-it\">What is it?</h2>\n<p><code>pip</code> itself is just a package
  manager like <code>homebrew</code>, <code>apt</code>, etc. But it is tied to a python
  environment.\nIf you aren't using a virtual environment then <code>pip</code> will
  operate inside the global installation of python.</p>\n<p>Operating within that
  environment has burned me several times and now I have a strict virtual environment
  usage policy.</p>\n<p>But there are still things I don't want to have to put in
  every virtual environment - enter <code>pipx</code></p>\n<h2 id=\"whats-it-do\">What's
  it do?</h2>\n<p>When you <code>pipx install {package}</code> a stand alone virtual
  environment gets created (by default in <code>~/.local/pipx/venvs</code>).\nTHen
  you can install extra dependencies with <code>pipx inject {package} {dependency}</code></p>\n<blockquote>\n<p>ex.
  After <code>pipx install visidata</code> in order to open Excel files you need to
  <code>pipx inject visidata xlrd</code></p>\n</blockquote>\n<p>In the example with
  <code>visidata</code>, I can then use it anywhere, in any project, without re-installing
  with <code>pip</code> in every env.</p>\n<p>Also for the formatting tools - I configure
  vim to run the <code>pipx</code> versions of them on save - this way I don't have
  to put them in every project's virtual environment!</p>\n<h2 id=\"what-about-pip\">What
  about pip?</h2>\n<p>So obviously you can't <code>pipx</code> everything, nor do
  you want to. \nI see it as a safe and better alternative to global package installation.</p>\n<p>How
  can you then be sure that you never <code>pip install</code> into the global env?</p>\n<p>Add
  <code>require-virtualenv = True</code> to your <code>pip.conf</code> and you're
  good to go!</p>\n<p>With that set, if you try to <code>pip install pandas</code>
  into the global env you'll get a message like this:</p>\n<div class=\"highlight\"><pre><span></span><code>~<span
  class=\"w\"> </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span><span class=\"w\">  </span>NO<span
  class=\"w\"> </span>PYTHON<span class=\"w\"> </span>VENV<span class=\"w\"> </span>SET\n❯<span
  class=\"w\"> </span>pip<span class=\"w\"> </span>install<span class=\"w\"> </span>pandas\nERROR:<span
  class=\"w\"> </span>Could<span class=\"w\"> </span>not<span class=\"w\"> </span>find<span
  class=\"w\"> </span>an<span class=\"w\"> </span>activated<span class=\"w\"> </span>virtualenv<span
  class=\"w\"> </span><span class=\"o\">(</span>required<span class=\"o\">)</span>.\n</code></pre></div>\n<h2
  id=\"end\">End</h2>\n<ol>\n<li>Disable your system <code>pip</code> to keep your
  base python safe</li>\n<li>Use <code>pipx</code> for tools you want available everywhere
  or don't have to need in a virtual environment!</li>\n</ol>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/htop'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Htop</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/fx-json'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Fx-Json</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: pipx pinning formatting tools like  keeping virtual environments
  clean of things like  python utilities I want system wide but not in the global
  environment, like  pip Operating within that environment has burned me several times
  and now I have a str
now: 2024-01-05 14:15:22.253540
path: pages/blog/pipx.md
published: true
slug: pipx
super_description: 'pipx pinning formatting tools like  keeping virtual environments
  clean of things like  python utilities I want system wide but not in the global
  environment, like  pip Operating within that environment has burned me several times
  and now I have a strict virtual environment usage policy. But there are still things
  I don When you  ex. After  In the example with  Also for the formatting tools -
  I configure vim to run the  So obviously you can How can you then be sure that you
  never  Add  With that '
tags:
- til
- python
- tech
templateKey: blog-post
title: Pipx
today: 2024-01-05
---

`pipx` is a tool I've been using to solve a few problems of mine...

1. pinning formatting tools like `black`, `flake8`, `isort`, etc. to the same version for all my projects
2. keeping virtual environments clean of things like `cookiecutter`
3. python utilities I want system wide but not in the global environment, like `visidata`

## What is it?

`pip` itself is just a package manager like `homebrew`, `apt`, etc. But it is tied to a python environment.
If you aren't using a virtual environment then `pip` will operate inside the global installation of python.

Operating within that environment has burned me several times and now I have a strict virtual environment usage policy.

But there are still things I don't want to have to put in every virtual environment - enter `pipx`

## What's it do?

When you `pipx install {package}` a stand alone virtual environment gets created (by default in `~/.local/pipx/venvs`).
THen you can install extra dependencies with `pipx inject {package} {dependency}`

> ex. After `pipx install visidata` in order to open Excel files you need to `pipx inject visidata xlrd`

In the example with `visidata`, I can then use it anywhere, in any project, without re-installing with `pip` in every env.

Also for the formatting tools - I configure vim to run the `pipx` versions of them on save - this way I don't have to put them in every project's virtual environment!

## What about pip?

So obviously you can't `pipx` everything, nor do you want to. 
I see it as a safe and better alternative to global package installation.

How can you then be sure that you never `pip install` into the global env?

Add `require-virtualenv = True` to your `pip.conf` and you're good to go!

With that set, if you try to `pip install pandas` into the global env you'll get a message like this:


```bash

~ on  (us-east-1)  NO PYTHON VENV SET
❯ pip install pandas
ERROR: Could not find an activated virtualenv (required).


```

## End

1. Disable your system `pip` to keep your base python safe
2. Use `pipx` for tools you want available everywhere or don't have to need in a virtual environment!
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
    
    <a class='prev' href='/htop'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Htop</p>
        </div>
    </a>
    
    <a class='next' href='/fx-json'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Fx-Json</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>