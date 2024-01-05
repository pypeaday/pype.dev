---
article_html: "<h1 id=\"logging-instead-of-printing\">Logging instead of printing</h1>\n<p>I
  am trying to adopt <code>logger.debug</code> instead of <code>print</code> but ran
  into a confusing\nthing in ipython during Advent of Code... I riddled by script
  with\n<code>logger.debug</code> (yes after setting <code>logging.setLevel('DEBUG')</code>)
  but in ipython\nnone of my log messages showed up!</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">import</span> <span class=\"nn\">logging</span>\n\n<span class=\"n\">logger</span>
  <span class=\"o\">=</span> <span class=\"n\">logging</span><span class=\"o\">.</span><span
  class=\"n\">getLogger</span><span class=\"p\">(</span><span class=\"vm\">__name__</span><span
  class=\"p\">)</span>\n<span class=\"n\">logger</span><span class=\"o\">.</span><span
  class=\"n\">setLevel</span><span class=\"p\">(</span><span class=\"s2\">&quot;DEBUG&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>Turns out what I was missing was a
  call to <code>basicConfig</code></p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">import</span> <span class=\"nn\">logging</span>\n\n<span class=\"c1\">#
  forget this and your messages are in the ether! or at least not seen in ipython...</span>\n<span
  class=\"n\">logging</span><span class=\"o\">.</span><span class=\"n\">basicConfig</span><span
  class=\"p\">()</span>\n\n<span class=\"n\">logger</span> <span class=\"o\">=</span>
  <span class=\"n\">logging</span><span class=\"o\">.</span><span class=\"n\">getLogger</span><span
  class=\"p\">(</span><span class=\"vm\">__name__</span><span class=\"p\">)</span>\n<span
  class=\"n\">logger</span><span class=\"o\">.</span><span class=\"n\">setLevel</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;DEBUG&quot;</span><span class=\"p\">)</span>\n</code></pre></div>\n<h1
  id=\"bonus\">Bonus</h1>\n<p>Want your new messages to show up while iterating on
  something without killing\nthe ipython kernel?</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">importlib</span> <span class=\"kn\">import</span>
  <span class=\"n\">reload</span>\n<span class=\"n\">reload</span><span class=\"p\">(</span><span
  class=\"n\">logging</span><span class=\"p\">)</span> <span class=\"c1\"># to make
  sure you get new log messages you add while developing!</span>\n</code></pre></div>\n<div
  class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
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
  \   </style>\n\n    <a class='prev' href='/cron-for-nextcloud-in-docker'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Cron
  for Nextcloud in Docker</p>\n        </div>\n    </a>\n\n    <a class='next' href='/new-lines-in-markdown-tables'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>New lines in Markdown tables</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
cover: ''
date: 2022-12-10
datetime: 2022-12-10 00:00:00+00:00
description: I am trying to adopt  Turns out what I was missing was a call to  Want
  your new messages to show up while iterating on something without killing
edit_link: https://github.com/edit/main/pages/til/call-basicconfig-to-get-python-log-messages-in-ipython.md
html: "<h1 id=\"logging-instead-of-printing\">Logging instead of printing</h1>\n<p>I
  am trying to adopt <code>logger.debug</code> instead of <code>print</code> but ran
  into a confusing\nthing in ipython during Advent of Code... I riddled by script
  with\n<code>logger.debug</code> (yes after setting <code>logging.setLevel('DEBUG')</code>)
  but in ipython\nnone of my log messages showed up!</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">import</span> <span class=\"nn\">logging</span>\n\n<span class=\"n\">logger</span>
  <span class=\"o\">=</span> <span class=\"n\">logging</span><span class=\"o\">.</span><span
  class=\"n\">getLogger</span><span class=\"p\">(</span><span class=\"vm\">__name__</span><span
  class=\"p\">)</span>\n<span class=\"n\">logger</span><span class=\"o\">.</span><span
  class=\"n\">setLevel</span><span class=\"p\">(</span><span class=\"s2\">&quot;DEBUG&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>Turns out what I was missing was a
  call to <code>basicConfig</code></p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">import</span> <span class=\"nn\">logging</span>\n\n<span class=\"c1\">#
  forget this and your messages are in the ether! or at least not seen in ipython...</span>\n<span
  class=\"n\">logging</span><span class=\"o\">.</span><span class=\"n\">basicConfig</span><span
  class=\"p\">()</span>\n\n<span class=\"n\">logger</span> <span class=\"o\">=</span>
  <span class=\"n\">logging</span><span class=\"o\">.</span><span class=\"n\">getLogger</span><span
  class=\"p\">(</span><span class=\"vm\">__name__</span><span class=\"p\">)</span>\n<span
  class=\"n\">logger</span><span class=\"o\">.</span><span class=\"n\">setLevel</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;DEBUG&quot;</span><span class=\"p\">)</span>\n</code></pre></div>\n<h1
  id=\"bonus\">Bonus</h1>\n<p>Want your new messages to show up while iterating on
  something without killing\nthe ipython kernel?</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">importlib</span> <span class=\"kn\">import</span>
  <span class=\"n\">reload</span>\n<span class=\"n\">reload</span><span class=\"p\">(</span><span
  class=\"n\">logging</span><span class=\"p\">)</span> <span class=\"c1\"># to make
  sure you get new log messages you add while developing!</span>\n</code></pre></div>\n<div
  class='prevnext'>\n\n    <style type='text/css'>\n\n    :root {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
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
  \   </style>\n\n    <a class='prev' href='/cron-for-nextcloud-in-docker'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Cron
  for Nextcloud in Docker</p>\n        </div>\n    </a>\n\n    <a class='next' href='/new-lines-in-markdown-tables'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>New lines in Markdown tables</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
jinja: false
long_description: I am trying to adopt  Turns out what I was missing was a call to  Want
  your new messages to show up while iterating on something without killing
now: 2024-01-05 14:15:22.253752
path: pages/til/call-basicconfig-to-get-python-log-messages-in-ipython.md
published: true
slug: call-basicconfig-to-get-python-log-messages-in-ipython
super_description: I am trying to adopt  Turns out what I was missing was a call to  Want
  your new messages to show up while iterating on something without killing
tags:
- python
- cli
- tech
templateKey: til
title: Call basicConfig to get Python log messages in iPython
today: 2024-01-05
---

# Logging instead of printing

I am trying to adopt `logger.debug` instead of `print` but ran into a confusing
thing in ipython during Advent of Code... I riddled by script with
`logger.debug` (yes after setting `logging.setLevel('DEBUG')`) but in ipython
none of my log messages showed up!

```python
import logging

logger = logging.getLogger(__name__)
logger.setLevel("DEBUG")

```

Turns out what I was missing was a call to `basicConfig`

```python
import logging

# forget this and your messages are in the ether! or at least not seen in ipython...
logging.basicConfig()

logger = logging.getLogger(__name__)
logger.setLevel("DEBUG")
```


# Bonus

Want your new messages to show up while iterating on something without killing
the ipython kernel?

```python
from importlib import reload
reload(logging) # to make sure you get new log messages you add while developing!

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
    
    <a class='prev' href='/cron-for-nextcloud-in-docker'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Cron for Nextcloud in Docker</p>
        </div>
    </a>
    
    <a class='next' href='/new-lines-in-markdown-tables'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>New lines in Markdown tables</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>