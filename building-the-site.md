---
article_html: "<p>The first thing you will want to do is make sure that you can build
  your site and see it in the browser.  Markata builds static websites using a python
  based cli that can be setup with very few steps once you have python 3.7+ installed.
  \ You will have to become at least a little bit comfortable running some commands
  from the command line to run the build.</p>\n<h2 id=\"installation\">Installation</h2>\n<p>This
  site comes with a <code>pyproject.toml</code> that can be used by hatch to\nautomatically
  take care of your virtual environments for you.</p>\n<div class=\"highlight\"><pre><span></span><code>pip<span
  class=\"w\"> </span>install<span class=\"w\"> </span>hatch\n</code></pre></div>\n<h2
  id=\"building-the-site-leveraging-hatch\">Building the site, Leveraging Hatch</h2>\n<p>Hatch
  comes with a nice system for creating scirpts that you can run in your\nmanaged
  virtual environment with less effort of managing.  You can create any\nthat you
  want in your own <code>pyproject.toml</code>, but these come with the template\nout
  of the box.</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"c1\">#
  builds the site</span>\nhatch<span class=\"w\"> </span>run<span class=\"w\"> </span>build\n\n<span
  class=\"c1\"># clean&#39;s cache and output directory</span>\nhatch<span class=\"w\">
  </span>run<span class=\"w\"> </span>clean\n\n<span class=\"c1\"># clean&#39;s cache
  and output directory, and builds</span>\nhatch<span class=\"w\"> </span>run<span
  class=\"w\"> </span>clean-build\n\n<span class=\"c1\"># runs a development server,
  watches for changes and rebuilds.</span>\nhatch<span class=\"w\"> </span>run<span
  class=\"w\"> </span>tui\n\n<span class=\"c1\"># run&#39;s clean then start&#39;s
  the tui</span>\nhatch<span class=\"w\"> </span>run<span class=\"w\"> </span>clean-tui\n\n<span
  class=\"c1\"># just serve markout at localhost:8000</span>\nhatch<span class=\"w\">
  </span>run<span class=\"w\"> </span>serve\n</code></pre></div>\n<p>Once you have
  the site up and running, open your browser to\n<a href=\"http://localhost:8000\">http://localhost:8000</a>.</p>\n<blockquote>\n<p>Note,if
  you already have something running on port <code>8000</code> hatch run serve will
  give\nyou an error, but hatch run tui will automatically choose the next available
  port.\nMake sure you open the right link in your browser.</p>\n</blockquote>\n<h2
  id=\"building-the-site-vanilla\">Building the site, vanilla</h2>\n<p>You will want
  to install everything in a virtual environment to prevent\nyourself from clogging
  up your system python, or trying to run two versions of\n<code>markata</code> for
  different projects.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"c1\"># using hatch for the virtual environment</span>\nhatch<span class=\"w\">
  </span>shell\n\n<span class=\"c1\"># using venv</span>\npython<span class=\"w\">
  </span>-m<span class=\"w\"> </span>venv<span class=\"w\"> </span>.venv\n.<span class=\"w\">
  </span>./.venv/bin/activate\npip<span class=\"w\"> </span>install<span class=\"w\">
  </span>-e<span class=\"w\"> </span>.\n</code></pre></div>\n<p>Once you have your
  virtual environment created and activated you can use the\nmarkata cli plugin to
  build your site.</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"c1\">#
  builds the site</span>\nmarkata<span class=\"w\"> </span>build\n\n<span class=\"c1\">#
  clean&#39;s cache and output directory</span>\nmarkata<span class=\"w\"> </span>clean\n\n<span
  class=\"c1\"># runs a development server, watches for changes and rebuilds.</span>\nmarkata<span
  class=\"w\"> </span>tui\n</code></pre></div>\n<h2 id=\"repl-or-script\">repl or
  script</h2>\n<p>It's also possible to run the build from a repl like ipython or
  a python\nscript.</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"kn\">from</span>
  <span class=\"nn\">markata</span> <span class=\"kn\">import</span> <span class=\"n\">Markata</span>\n\n<span
  class=\"n\">m</span> <span class=\"o\">=</span> <span class=\"n\">Markata</span><span
  class=\"p\">()</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">run</span><span class=\"p\">()</span>\n</code></pre></div>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/076-silent-years-sadducees'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>076 Silent Years - Sadducees</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/075-silent-years-welcome-to-hellenism'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>075 Silent Years - Welcome to Hellenism</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-09-02
datetime: 2022-09-02 00:00:00+00:00
description: The first thing you will want to do is make sure that you can build your
  site and see it in the browser.  Markata builds static websites using a python based
  cl
edit_link: https://github.com/edit/main/pages/building-the-site.md
html: "<p>The first thing you will want to do is make sure that you can build your
  site and see it in the browser.  Markata builds static websites using a python based
  cli that can be setup with very few steps once you have python 3.7+ installed.  You
  will have to become at least a little bit comfortable running some commands from
  the command line to run the build.</p>\n<h2 id=\"installation\">Installation</h2>\n<p>This
  site comes with a <code>pyproject.toml</code> that can be used by hatch to\nautomatically
  take care of your virtual environments for you.</p>\n<div class=\"highlight\"><pre><span></span><code>pip<span
  class=\"w\"> </span>install<span class=\"w\"> </span>hatch\n</code></pre></div>\n<h2
  id=\"building-the-site-leveraging-hatch\">Building the site, Leveraging Hatch</h2>\n<p>Hatch
  comes with a nice system for creating scirpts that you can run in your\nmanaged
  virtual environment with less effort of managing.  You can create any\nthat you
  want in your own <code>pyproject.toml</code>, but these come with the template\nout
  of the box.</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"c1\">#
  builds the site</span>\nhatch<span class=\"w\"> </span>run<span class=\"w\"> </span>build\n\n<span
  class=\"c1\"># clean&#39;s cache and output directory</span>\nhatch<span class=\"w\">
  </span>run<span class=\"w\"> </span>clean\n\n<span class=\"c1\"># clean&#39;s cache
  and output directory, and builds</span>\nhatch<span class=\"w\"> </span>run<span
  class=\"w\"> </span>clean-build\n\n<span class=\"c1\"># runs a development server,
  watches for changes and rebuilds.</span>\nhatch<span class=\"w\"> </span>run<span
  class=\"w\"> </span>tui\n\n<span class=\"c1\"># run&#39;s clean then start&#39;s
  the tui</span>\nhatch<span class=\"w\"> </span>run<span class=\"w\"> </span>clean-tui\n\n<span
  class=\"c1\"># just serve markout at localhost:8000</span>\nhatch<span class=\"w\">
  </span>run<span class=\"w\"> </span>serve\n</code></pre></div>\n<p>Once you have
  the site up and running, open your browser to\n<a href=\"http://localhost:8000\">http://localhost:8000</a>.</p>\n<blockquote>\n<p>Note,if
  you already have something running on port <code>8000</code> hatch run serve will
  give\nyou an error, but hatch run tui will automatically choose the next available
  port.\nMake sure you open the right link in your browser.</p>\n</blockquote>\n<h2
  id=\"building-the-site-vanilla\">Building the site, vanilla</h2>\n<p>You will want
  to install everything in a virtual environment to prevent\nyourself from clogging
  up your system python, or trying to run two versions of\n<code>markata</code> for
  different projects.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"c1\"># using hatch for the virtual environment</span>\nhatch<span class=\"w\">
  </span>shell\n\n<span class=\"c1\"># using venv</span>\npython<span class=\"w\">
  </span>-m<span class=\"w\"> </span>venv<span class=\"w\"> </span>.venv\n.<span class=\"w\">
  </span>./.venv/bin/activate\npip<span class=\"w\"> </span>install<span class=\"w\">
  </span>-e<span class=\"w\"> </span>.\n</code></pre></div>\n<p>Once you have your
  virtual environment created and activated you can use the\nmarkata cli plugin to
  build your site.</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"c1\">#
  builds the site</span>\nmarkata<span class=\"w\"> </span>build\n\n<span class=\"c1\">#
  clean&#39;s cache and output directory</span>\nmarkata<span class=\"w\"> </span>clean\n\n<span
  class=\"c1\"># runs a development server, watches for changes and rebuilds.</span>\nmarkata<span
  class=\"w\"> </span>tui\n</code></pre></div>\n<h2 id=\"repl-or-script\">repl or
  script</h2>\n<p>It's also possible to run the build from a repl like ipython or
  a python\nscript.</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"kn\">from</span>
  <span class=\"nn\">markata</span> <span class=\"kn\">import</span> <span class=\"n\">Markata</span>\n\n<span
  class=\"n\">m</span> <span class=\"o\">=</span> <span class=\"n\">Markata</span><span
  class=\"p\">()</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">run</span><span class=\"p\">()</span>\n</code></pre></div>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/076-silent-years-sadducees'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>076 Silent Years - Sadducees</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/075-silent-years-welcome-to-hellenism'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>075 Silent Years - Welcome to Hellenism</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: The first thing you will want to do is make sure that you can build
  your site and see it in the browser.  Markata builds static websites using a python
  based cli that can be setup with very few steps once you have python 3.7+ installed.  You
  will hav
now: 2024-08-01 13:40:17.986997
path: pages/building-the-site.md
published: true
slug: building-the-site
super_description: The first thing you will want to do is make sure that you can build
  your site and see it in the browser.  Markata builds static websites using a python
  based cli that can be setup with very few steps once you have python 3.7+ installed.  You
  will have to become at least a little bit comfortable running some commands from
  the command line to run the build. This site comes with a  Hatch comes with a nice
  system for creating scirpts that you can run in your Once you have the site up and
  running, op
tags:
- home
- meta
templateKey: ''
title: Building the Site
today: 2024-08-01
---

The first thing you will want to do is make sure that you can build your site and see it in the browser.  Markata builds static websites using a python based cli that can be setup with very few steps once you have python 3.7+ installed.  You will have to become at least a little bit comfortable running some commands from the command line to run the build.


## Installation

This site comes with a `pyproject.toml` that can be used by hatch to
automatically take care of your virtual environments for you.

``` bash
pip install hatch
```

## Building the site, Leveraging Hatch

Hatch comes with a nice system for creating scirpts that you can run in your
managed virtual environment with less effort of managing.  You can create any
that you want in your own `pyproject.toml`, but these come with the template
out of the box.

``` bash
# builds the site
hatch run build

# clean's cache and output directory
hatch run clean

# clean's cache and output directory, and builds
hatch run clean-build

# runs a development server, watches for changes and rebuilds.
hatch run tui

# run's clean then start's the tui
hatch run clean-tui

# just serve markout at localhost:8000
hatch run serve
```

Once you have the site up and running, open your browser to
[http://localhost:8000](http://localhost:8000).

> Note,if you already have something running on port `8000` hatch run serve will give
> you an error, but hatch run tui will automatically choose the next available port.
> Make sure you open the right link in your browser.

## Building the site, vanilla

You will want to install everything in a virtual environment to prevent
yourself from clogging up your system python, or trying to run two versions of
`markata` for different projects.

``` bash
# using hatch for the virtual environment
hatch shell

# using venv
python -m venv .venv
. ./.venv/bin/activate
pip install -e .
```

Once you have your virtual environment created and activated you can use the
markata cli plugin to build your site.

``` bash
# builds the site
markata build

# clean's cache and output directory
markata clean

# runs a development server, watches for changes and rebuilds.
markata tui
```

## repl or script

It's also possible to run the build from a repl like ipython or a python
script.

``` python
from markata import Markata

m = Markata()
m.run()
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
    
    <a class='prev' href='/076-silent-years-sadducees'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>076 Silent Years - Sadducees</p>
        </div>
    </a>
    
    <a class='next' href='/075-silent-years-welcome-to-hellenism'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>075 Silent Years - Welcome to Hellenism</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>