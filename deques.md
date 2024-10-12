---
article_html: "<p>I am working on a project to create a small system monitoring dashboard
  using the python <code>psutil</code> library.</p>\n<p>The repo is <a href=\"https://github.com/nicpayne713/not-netdata\">here</a>
  (if you want actual system monitoring please use <a href=\"https://www.netdata.cloud/\">netdata</a>).</p>\n<p>I'm
  using <code>streamlit</code> and <code>plotly</code> for the webserver, design,
  and plotting at the moment.</p>\n<h2 id=\"my-use-case\">My Use Case</h2>\n<p>I needed
  a way to refresh my plotly charts with a fixed window of time so that I'm able to
  just see relevant recent data instead of cramming all data for all time into one
  plot that's 500 pixels wide...</p>\n<p>Checking the length of arrays or lists every
  time I get a new piece of data feels kind of dumb and I thought \"python must have
  a way to do this\"...</p>\n<blockquote>\n<p>\"This\" meaning, update values in a
  fixed length array without reallocating memory or recreating a copy of the list</p>\n</blockquote>\n<h2
  id=\"deques\">Deques</h2>\n<p>Enter the <code>deque</code>. \nIt means \"double
  ended queue\" and is in general an <code>Iterable</code> that you can append values
  to either side or pop values from either side.</p>\n<p>The init signature is straightforward
  enough and I'm sure there's more to them than I know yet but here's how I use it...</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kn\">from</span> <span
  class=\"nn\">collections</span> <span class=\"kn\">import</span> <span class=\"n\">deque</span>\n\n<span
  class=\"n\">my_deque</span> <span class=\"o\">=</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span><span
  class=\"mi\">2</span><span class=\"p\">,</span><span class=\"mi\">3</span><span
  class=\"p\">])</span>\n</code></pre></div>\n<p>This gives us <code>my_deque</code>,
  created from an iterable, with several familiar methods like <code>index</code>,
  <code>extend</code>, <code>append</code>, etc.\nHowever there's some new ones too
  such as <code>appendleft</code> and <code>popleft</code>.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">my_deque</span><span class=\"o\">.</span><span class=\"n\">appendleft</span><span
  class=\"p\">(</span><span class=\"s1\">&#39;a&#39;</span><span class=\"p\">)</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"n\">my_dequqe</span><span
  class=\"p\">)</span>\n<span class=\"o\">&gt;&gt;&gt;</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"s1\">&#39;a&#39;</span><span class=\"p\">,</span>
  <span class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">2</span><span
  class=\"p\">,</span> <span class=\"mi\">3</span><span class=\"p\">])</span>\n\n<span
  class=\"n\">my_deque</span><span class=\"o\">.</span><span class=\"n\">popleft</span><span
  class=\"p\">()</span>\n<span class=\"o\">&gt;&gt;&gt;</span> <span class=\"s1\">&#39;a&#39;</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"n\">my_deque</span><span
  class=\"p\">)</span>\n<span class=\"o\">&gt;&gt;&gt;</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"mi\">3</span><span
  class=\"p\">])</span>\n</code></pre></div>\n<p>These are handy ways to manipulate
  the iterable that I needed for the arrays I plot with plotly!</p>\n<p><strong>See
  my follow-up to this on using Deques with plotly and streamlit to create a quick
  \"dashboard\" with live streaming data!</strong></p>\n<p><a href=\"/plotly-and-streamlit\">follow-up</a></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/plotly-and-streamlit'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Plotly-And-Streamlit</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/starship'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Starship</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/deques.png
date: 2022-03-31
datetime: 2022-03-31 00:00:00+00:00
description: I am working on a project to create a small system monitoring dashboard
  using the python  The repo is  I I needed a way to refresh my plotly charts with
  a fixed
edit_link: https://github.com/edit/main/pages/til/deques.md
html: "<p>I am working on a project to create a small system monitoring dashboard
  using the python <code>psutil</code> library.</p>\n<p>The repo is <a href=\"https://github.com/nicpayne713/not-netdata\">here</a>
  (if you want actual system monitoring please use <a href=\"https://www.netdata.cloud/\">netdata</a>).</p>\n<p>I'm
  using <code>streamlit</code> and <code>plotly</code> for the webserver, design,
  and plotting at the moment.</p>\n<h2 id=\"my-use-case\">My Use Case</h2>\n<p>I needed
  a way to refresh my plotly charts with a fixed window of time so that I'm able to
  just see relevant recent data instead of cramming all data for all time into one
  plot that's 500 pixels wide...</p>\n<p>Checking the length of arrays or lists every
  time I get a new piece of data feels kind of dumb and I thought \"python must have
  a way to do this\"...</p>\n<blockquote>\n<p>\"This\" meaning, update values in a
  fixed length array without reallocating memory or recreating a copy of the list</p>\n</blockquote>\n<h2
  id=\"deques\">Deques</h2>\n<p>Enter the <code>deque</code>. \nIt means \"double
  ended queue\" and is in general an <code>Iterable</code> that you can append values
  to either side or pop values from either side.</p>\n<p>The init signature is straightforward
  enough and I'm sure there's more to them than I know yet but here's how I use it...</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kn\">from</span> <span
  class=\"nn\">collections</span> <span class=\"kn\">import</span> <span class=\"n\">deque</span>\n\n<span
  class=\"n\">my_deque</span> <span class=\"o\">=</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span><span
  class=\"mi\">2</span><span class=\"p\">,</span><span class=\"mi\">3</span><span
  class=\"p\">])</span>\n</code></pre></div>\n<p>This gives us <code>my_deque</code>,
  created from an iterable, with several familiar methods like <code>index</code>,
  <code>extend</code>, <code>append</code>, etc.\nHowever there's some new ones too
  such as <code>appendleft</code> and <code>popleft</code>.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">my_deque</span><span class=\"o\">.</span><span class=\"n\">appendleft</span><span
  class=\"p\">(</span><span class=\"s1\">&#39;a&#39;</span><span class=\"p\">)</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"n\">my_dequqe</span><span
  class=\"p\">)</span>\n<span class=\"o\">&gt;&gt;&gt;</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"s1\">&#39;a&#39;</span><span class=\"p\">,</span>
  <span class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">2</span><span
  class=\"p\">,</span> <span class=\"mi\">3</span><span class=\"p\">])</span>\n\n<span
  class=\"n\">my_deque</span><span class=\"o\">.</span><span class=\"n\">popleft</span><span
  class=\"p\">()</span>\n<span class=\"o\">&gt;&gt;&gt;</span> <span class=\"s1\">&#39;a&#39;</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"n\">my_deque</span><span
  class=\"p\">)</span>\n<span class=\"o\">&gt;&gt;&gt;</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"mi\">3</span><span
  class=\"p\">])</span>\n</code></pre></div>\n<p>These are handy ways to manipulate
  the iterable that I needed for the arrays I plot with plotly!</p>\n<p><strong>See
  my follow-up to this on using Deques with plotly and streamlit to create a quick
  \"dashboard\" with live streaming data!</strong></p>\n<p><a href=\"/plotly-and-streamlit\">follow-up</a></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/plotly-and-streamlit'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Plotly-And-Streamlit</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/starship'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Starship</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I am working on a project to create a small system monitoring dashboard
  using the python  The repo is  I I needed a way to refresh my plotly charts with
  a fixed window of time so that I Checking the length of arrays or lists every time
  I get a new pi
now: 2024-10-12 11:09:11.872138
path: pages/til/deques.md
published: true
slug: deques
super_description: I am working on a project to create a small system monitoring dashboard
  using the python  The repo is  I I needed a way to refresh my plotly charts with
  a fixed window of time so that I Checking the length of arrays or lists every time
  I get a new piece of data feels kind of dumb and I thought  " Enter the  The init
  signature is straightforward enough and I This gives us  These are handy ways to
  manipulate the iterable that I needed for the arrays I plot with plotly
tags:
- python
- tech
templateKey: til
title: Deques
today: 2024-10-12
---

I am working on a project to create a small system monitoring dashboard using the python `psutil` library.

The repo is [here](https://github.com/nicpayne713/not-netdata) (if you want actual system monitoring please use [netdata](https://www.netdata.cloud/)).

I'm using `streamlit` and `plotly` for the webserver, design, and plotting at the moment.

## My Use Case

I needed a way to refresh my plotly charts with a fixed window of time so that I'm able to just see relevant recent data instead of cramming all data for all time into one plot that's 500 pixels wide...

Checking the length of arrays or lists every time I get a new piece of data feels kind of dumb and I thought "python must have a way to do this"...

> "This" meaning, update values in a fixed length array without reallocating memory or recreating a copy of the list

## Deques

Enter the `deque`. 
It means "double ended queue" and is in general an `Iterable` that you can append values to either side or pop values from either side.

The init signature is straightforward enough and I'm sure there's more to them than I know yet but here's how I use it...

```python
from collections import deque

my_deque = deque([1,2,3])
```

This gives us `my_deque`, created from an iterable, with several familiar methods like `index`, `extend`, `append`, etc.
However there's some new ones too such as `appendleft` and `popleft`.

```python
my_deque.appendleft('a')
print(my_dequqe)
>>> deque(['a', 1, 2, 3])

my_deque.popleft()
>>> 'a'
print(my_deque)
>>> deque([1, 2, 3])
```

These are handy ways to manipulate the iterable that I needed for the arrays I plot with plotly!


__See my follow-up to this on using Deques with plotly and streamlit to create a quick "dashboard" with live streaming data!__

[follow-up](/plotly-and-streamlit)
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
    
    <a class='prev' href='/plotly-and-streamlit'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Plotly-And-Streamlit</p>
        </div>
    </a>
    
    <a class='next' href='/starship'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Starship</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>