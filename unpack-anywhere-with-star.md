---
article_html: "<p>Unpacking iterables in python with <code>*</code> is a pretty handy
  trick for writing code that is just a tiny bit more pythonic than not.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">arr</span><span class=\"p\">:</span>
  <span class=\"n\">Tuple</span><span class=\"p\">[</span><span class=\"n\">Union</span><span
  class=\"p\">[</span><span class=\"nb\">int</span><span class=\"p\">,</span> <span
  class=\"nb\">str</span><span class=\"p\">]]</span> <span class=\"o\">=</span> <span
  class=\"p\">(</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"mi\">3</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;a&#39;</span><span class=\"p\">,</span>
  <span class=\"s1\">&#39;b&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;c&#39;</span><span
  class=\"p\">)</span>\n\n\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"n\">arr</span><span class=\"p\">)</span>\n<span class=\"o\">&gt;&gt;&gt;</span>
  <span class=\"p\">(</span><span class=\"mi\">1</span><span class=\"p\">,</span>
  <span class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"mi\">3</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;a&#39;</span><span class=\"p\">,</span>
  <span class=\"s1\">&#39;b&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;c&#39;</span><span
  class=\"p\">)</span>\n\n<span class=\"c1\"># the * unpacks the tuple into the individual
  elements</span>\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"o\">*</span><span class=\"n\">arr</span><span class=\"p\">)</span>\n<span
  class=\"o\">&gt;&gt;&gt;</span> <span class=\"mi\">1</span><span class=\"p\">,</span>
  <span class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"mi\">3</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;a&#39;</span><span class=\"p\">,</span>
  <span class=\"s1\">&#39;b&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;c&#39;</span>\n\n<span
  class=\"n\">x</span><span class=\"p\">,</span> <span class=\"n\">y</span><span class=\"p\">,</span>
  <span class=\"n\">z</span><span class=\"p\">,</span> <span class=\"o\">*</span><span
  class=\"n\">alphas</span> <span class=\"o\">=</span> <span class=\"n\">arr</span>\n\n<span
  class=\"c1\"># x = 1, y = 2, z = 3</span>\n<span class=\"c1\"># alphas = [ &#39;a&#39;,
  &#39;b&#39;, &#39;c&#39; ]</span>\n</code></pre></div>\n<p>But <a href=\"https://twitter.com/nedbat\">@Ned
  Batchelder</a> showed me via Twitter than you can arbitrarily unpack arguments based
  on position - it doesn't have to be done at the beginning or the end!</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">x</span><span class=\"p\">,</span>
  <span class=\"n\">y</span><span class=\"p\">,</span> <span class=\"o\">*</span><span
  class=\"n\">mixed</span><span class=\"p\">,</span> <span class=\"n\">alpha</span>
  <span class=\"o\">=</span> <span class=\"n\">arr</span>\n\n<span class=\"c1\">#
  x = 1, y = 2</span>\n<span class=\"c1\"># mixed = [3, &#39;a&#39;, &#39;b&#39;]</span>\n<span
  class=\"c1\"># alpha = &#39;c&#39;</span>\n</code></pre></div>\n<p>I'm not entirely
  sure when I'll need this but it definitley shows me another example of how flexible
  python is!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
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
  \   </style>\n\n    <a class='prev' href='/htop'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Htop</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/pipx'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Pipx</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/unpack-anywhere-with-star.png
date: 2022-04-24
datetime: 2022-04-24 00:00:00+00:00
description: Unpacking iterables in python with  But  I
edit_link: https://github.com/edit/main/pages/til/unpack-anywhere-with-star.md
html: "<p>Unpacking iterables in python with <code>*</code> is a pretty handy trick
  for writing code that is just a tiny bit more pythonic than not.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">arr</span><span class=\"p\">:</span> <span class=\"n\">Tuple</span><span
  class=\"p\">[</span><span class=\"n\">Union</span><span class=\"p\">[</span><span
  class=\"nb\">int</span><span class=\"p\">,</span> <span class=\"nb\">str</span><span
  class=\"p\">]]</span> <span class=\"o\">=</span> <span class=\"p\">(</span><span
  class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">2</span><span
  class=\"p\">,</span> <span class=\"mi\">3</span><span class=\"p\">,</span> <span
  class=\"s1\">&#39;a&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;b&#39;</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;c&#39;</span><span class=\"p\">)</span>\n\n\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"n\">arr</span><span
  class=\"p\">)</span>\n<span class=\"o\">&gt;&gt;&gt;</span> <span class=\"p\">(</span><span
  class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">2</span><span
  class=\"p\">,</span> <span class=\"mi\">3</span><span class=\"p\">,</span> <span
  class=\"s1\">&#39;a&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;b&#39;</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;c&#39;</span><span class=\"p\">)</span>\n\n<span
  class=\"c1\"># the * unpacks the tuple into the individual elements</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"o\">*</span><span
  class=\"n\">arr</span><span class=\"p\">)</span>\n<span class=\"o\">&gt;&gt;&gt;</span>
  <span class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">2</span><span
  class=\"p\">,</span> <span class=\"mi\">3</span><span class=\"p\">,</span> <span
  class=\"s1\">&#39;a&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;b&#39;</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;c&#39;</span>\n\n<span class=\"n\">x</span><span
  class=\"p\">,</span> <span class=\"n\">y</span><span class=\"p\">,</span> <span
  class=\"n\">z</span><span class=\"p\">,</span> <span class=\"o\">*</span><span class=\"n\">alphas</span>
  <span class=\"o\">=</span> <span class=\"n\">arr</span>\n\n<span class=\"c1\">#
  x = 1, y = 2, z = 3</span>\n<span class=\"c1\"># alphas = [ &#39;a&#39;, &#39;b&#39;,
  &#39;c&#39; ]</span>\n</code></pre></div>\n<p>But <a href=\"https://twitter.com/nedbat\">@Ned
  Batchelder</a> showed me via Twitter than you can arbitrarily unpack arguments based
  on position - it doesn't have to be done at the beginning or the end!</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">x</span><span class=\"p\">,</span>
  <span class=\"n\">y</span><span class=\"p\">,</span> <span class=\"o\">*</span><span
  class=\"n\">mixed</span><span class=\"p\">,</span> <span class=\"n\">alpha</span>
  <span class=\"o\">=</span> <span class=\"n\">arr</span>\n\n<span class=\"c1\">#
  x = 1, y = 2</span>\n<span class=\"c1\"># mixed = [3, &#39;a&#39;, &#39;b&#39;]</span>\n<span
  class=\"c1\"># alpha = &#39;c&#39;</span>\n</code></pre></div>\n<p>I'm not entirely
  sure when I'll need this but it definitley shows me another example of how flexible
  python is!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
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
  \   </style>\n\n    <a class='prev' href='/htop'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Htop</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/pipx'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Pipx</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Unpacking iterables in python with  But  I
now: 2024-06-26 16:50:21.523912
path: pages/til/unpack-anywhere-with-star.md
published: true
slug: unpack-anywhere-with-star
super_description: Unpacking iterables in python with  But  I
tags:
- python
- tech
templateKey: til
title: Unpack-Anywhere-With-Star
today: 2024-06-26
---

Unpacking iterables in python with `*` is a pretty handy trick for writing code that is just a tiny bit more pythonic than not.

```python
arr: Tuple[Union[int, str]] = (1, 2, 3, 'a', 'b', 'c')


print(arr)
>>> (1, 2, 3, 'a', 'b', 'c')

# the * unpacks the tuple into the individual elements
print(*arr)
>>> 1, 2, 3, 'a', 'b', 'c'

x, y, z, *alphas = arr

# x = 1, y = 2, z = 3
# alphas = [ 'a', 'b', 'c' ]

```

But [@Ned Batchelder](https://twitter.com/nedbat) showed me via Twitter than you can arbitrarily unpack arguments based on position - it doesn't have to be done at the beginning or the end!

```python
x, y, *mixed, alpha = arr

# x = 1, y = 2
# mixed = [3, 'a', 'b']
# alpha = 'c'
```

I'm not entirely sure when I'll need this but it definitley shows me another example of how flexible python is!
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
    
    <a class='next' href='/pipx'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Pipx</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>