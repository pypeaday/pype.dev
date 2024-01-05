---
article_html: "<h2 id=\"abcmeta\">ABCMeta</h2>\n<p>I don't do a lot of OOP currently,
  but I have been on a few heavy OOP projects and this <code>ABCMeta</code> and <code>abstractmethod</code>
  from <code>abc</code> would've been super nice to know about!</p>\n<p>If you are
  creating a library with classes that you expect your users to extend, but you want
  to ensure that any extension has explicit methods defined then this is for you!.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kn\">from</span> <span
  class=\"nn\">abc</span> <span class=\"kn\">import</span> <span class=\"n\">ABCMeta</span><span
  class=\"p\">,</span> <span class=\"n\">abstractmethod</span>\n<span class=\"k\">class</span>
  <span class=\"nc\">Family</span><span class=\"p\">(</span><span class=\"n\">metaclass</span><span
  class=\"o\">=</span><span class=\"n\">ABCMeta</span><span class=\"p\">):</span>\n
  \   <span class=\"nd\">@abstractmethod</span>\n    <span class=\"k\">def</span>
  <span class=\"nf\">get_dad</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
  class=\"p\">):</span>\n<span class=\"w\">        </span><span class=\"sd\">&quot;&quot;&quot;Any
  extension of the Family class must implement a `get_dad` method&quot;&quot;&quot;</span>\n\n<span
  class=\"k\">class</span> <span class=\"nc\">MyFamily</span><span class=\"p\">(</span><span
  class=\"n\">Family</span><span class=\"p\">):</span>\n    <span class=\"k\">pass</span>\n</code></pre></div>\n<p>If
  I try to instantiate <code>MyFamily</code> I will not be allowed:\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"err\">❯</span> <span class=\"n\">my_fam</span> <span class=\"o\">=</span>
  <span class=\"n\">MyFamily</span><span class=\"p\">()</span>\n<span class=\"err\">╭───────────────────────────────</span>
  <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
  <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
  class=\"p\">)</span> <span class=\"err\">────────────────────────────────╮</span>\n<span
  class=\"err\">│</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
  class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
  class=\"mi\">8</span><span class=\"o\">-</span><span class=\"n\">ecb8e21ce815</span><span
  class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
  class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">module</span><span
  class=\"o\">&gt;</span>                                                     <span
  class=\"err\">│</span>\n<span class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"ne\">TypeError</span><span class=\"p\">:</span> <span class=\"n\">Can</span><span
  class=\"s1\">&#39;t instantiate abstract class MyFamily with abstract methods get_dad</span>\n</code></pre></div></p>\n<p><img
  alt=\"Alt text\" src=\"/images/py-abc-meta.png\" title=\"abcmeta\" /></p>\n<p>In
  order for me to extend <code>Family</code> I have to implement the method <code>get_dad</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"k\">class</span> <span
  class=\"nc\">MyFamily</span><span class=\"p\">(</span><span class=\"n\">Family</span><span
  class=\"p\">):</span>\n    <span class=\"k\">def</span> <span class=\"nf\">get_dad</span><span
  class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>\n
  \       <span class=\"k\">return</span> <span class=\"s2\">&quot;Me&quot;</span>\n</code></pre></div>\n<p>Now
  everything works as expected and I can sleep well knowing no one can extend my base
  class without creating methods I know they need.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">my_fam</span> <span class=\"o\">=</span> <span class=\"n\">MyFamily</span><span
  class=\"p\">()</span>\n\n<span class=\"n\">my_fam</span><span class=\"o\">.</span><span
  class=\"n\">get_dad</span><span class=\"p\">()</span>\n<span class=\"s1\">&#39;Me&#39;</span>\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/wireguard'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Wireguard</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/python-f-string-align'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Python-F-String-Align</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/abstract-base-class.png
date: 2022-03-09
datetime: 2022-03-09 00:00:00+00:00
description: I don If you are creating a library with classes that you expect your
  users to extend, but you want to ensure that any extension has explicit methods
  defined th
edit_link: https://github.com/edit/main/pages/til/abstract-base-class.md
html: "<h2 id=\"abcmeta\">ABCMeta</h2>\n<p>I don't do a lot of OOP currently, but
  I have been on a few heavy OOP projects and this <code>ABCMeta</code> and <code>abstractmethod</code>
  from <code>abc</code> would've been super nice to know about!</p>\n<p>If you are
  creating a library with classes that you expect your users to extend, but you want
  to ensure that any extension has explicit methods defined then this is for you!.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kn\">from</span> <span
  class=\"nn\">abc</span> <span class=\"kn\">import</span> <span class=\"n\">ABCMeta</span><span
  class=\"p\">,</span> <span class=\"n\">abstractmethod</span>\n<span class=\"k\">class</span>
  <span class=\"nc\">Family</span><span class=\"p\">(</span><span class=\"n\">metaclass</span><span
  class=\"o\">=</span><span class=\"n\">ABCMeta</span><span class=\"p\">):</span>\n
  \   <span class=\"nd\">@abstractmethod</span>\n    <span class=\"k\">def</span>
  <span class=\"nf\">get_dad</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
  class=\"p\">):</span>\n<span class=\"w\">        </span><span class=\"sd\">&quot;&quot;&quot;Any
  extension of the Family class must implement a `get_dad` method&quot;&quot;&quot;</span>\n\n<span
  class=\"k\">class</span> <span class=\"nc\">MyFamily</span><span class=\"p\">(</span><span
  class=\"n\">Family</span><span class=\"p\">):</span>\n    <span class=\"k\">pass</span>\n</code></pre></div>\n<p>If
  I try to instantiate <code>MyFamily</code> I will not be allowed:\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"err\">❯</span> <span class=\"n\">my_fam</span> <span class=\"o\">=</span>
  <span class=\"n\">MyFamily</span><span class=\"p\">()</span>\n<span class=\"err\">╭───────────────────────────────</span>
  <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
  <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
  class=\"p\">)</span> <span class=\"err\">────────────────────────────────╮</span>\n<span
  class=\"err\">│</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
  class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
  class=\"mi\">8</span><span class=\"o\">-</span><span class=\"n\">ecb8e21ce815</span><span
  class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
  class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">module</span><span
  class=\"o\">&gt;</span>                                                     <span
  class=\"err\">│</span>\n<span class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"ne\">TypeError</span><span class=\"p\">:</span> <span class=\"n\">Can</span><span
  class=\"s1\">&#39;t instantiate abstract class MyFamily with abstract methods get_dad</span>\n</code></pre></div></p>\n<p><img
  alt=\"Alt text\" src=\"/images/py-abc-meta.png\" title=\"abcmeta\" /></p>\n<p>In
  order for me to extend <code>Family</code> I have to implement the method <code>get_dad</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"k\">class</span> <span
  class=\"nc\">MyFamily</span><span class=\"p\">(</span><span class=\"n\">Family</span><span
  class=\"p\">):</span>\n    <span class=\"k\">def</span> <span class=\"nf\">get_dad</span><span
  class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>\n
  \       <span class=\"k\">return</span> <span class=\"s2\">&quot;Me&quot;</span>\n</code></pre></div>\n<p>Now
  everything works as expected and I can sleep well knowing no one can extend my base
  class without creating methods I know they need.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">my_fam</span> <span class=\"o\">=</span> <span class=\"n\">MyFamily</span><span
  class=\"p\">()</span>\n\n<span class=\"n\">my_fam</span><span class=\"o\">.</span><span
  class=\"n\">get_dad</span><span class=\"p\">()</span>\n<span class=\"s1\">&#39;Me&#39;</span>\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/wireguard'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Wireguard</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/python-f-string-align'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Python-F-String-Align</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I don If you are creating a library with classes that you expect
  your users to extend, but you want to ensure that any extension has explicit methods
  defined then this is for you If I try to instantiate  In order for me to extend  Now
  everything work
now: 2024-01-05 14:15:22.253885
path: pages/til/abstract-base-class.md
published: true
slug: abstract-base-class
super_description: I don If you are creating a library with classes that you expect
  your users to extend, but you want to ensure that any extension has explicit methods
  defined then this is for you If I try to instantiate  In order for me to extend  Now
  everything works as expected and I can sleep well knowing no one can extend my base
  class without creating methods I know they need.
tags:
- python
- tech
templateKey: til
title: Abstract-Base-Class
today: 2024-01-05
---

## ABCMeta

I don't do a lot of OOP currently, but I have been on a few heavy OOP projects and this `ABCMeta` and `abstractmethod` from `abc` would've been super nice to know about!

If you are creating a library with classes that you expect your users to extend, but you want to ensure that any extension has explicit methods defined then this is for you!.

```python
from abc import ABCMeta, abstractmethod
class Family(metaclass=ABCMeta):
    @abstractmethod
    def get_dad(self):
        """Any extension of the Family class must implement a `get_dad` method"""

class MyFamily(Family):
    pass

```

If I try to instantiate `MyFamily` I will not be allowed:
```python

❯ my_fam = MyFamily()
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-8-ecb8e21ce815>:1 in <module>                                                     │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
TypeError: Can't instantiate abstract class MyFamily with abstract methods get_dad

```

![Alt text](/images/py-abc-meta.png "abcmeta")

In order for me to extend `Family` I have to implement the method `get_dad`

```python
class MyFamily(Family):
    def get_dad(self):
        return "Me"
```

Now everything works as expected and I can sleep well knowing no one can extend my base class without creating methods I know they need.


```python

my_fam = MyFamily()

my_fam.get_dad()
'Me'

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
    
    <a class='prev' href='/wireguard'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Wireguard</p>
        </div>
    </a>
    
    <a class='next' href='/python-f-string-align'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Python-F-String-Align</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>