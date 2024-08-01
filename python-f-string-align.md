---
article_html: "<p>I am personally trying to use <code>logger</code> instead of <code>print</code>
  in all of my code, \nhowever I learned from [@Python-Hub] that you can align printouts
  using <code>print</code> with <code>f</code>-strings!.</p>\n<p>This little python
  script shows how options in the <code>f</code>-string can format the printout.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kn\">import</span> <span
  class=\"nn\">random</span>\n\n<span class=\"n\">variables</span> <span class=\"o\">=</span>
  <span class=\"s2\">&quot;Foo Bar Baz Bing&quot;</span><span class=\"o\">.</span><span
  class=\"n\">split</span><span class=\"p\">()</span>\n<span class=\"n\">scores</span>
  <span class=\"o\">=</span> <span class=\"n\">random</span><span class=\"o\">.</span><span
  class=\"n\">sample</span><span class=\"p\">(</span><span class=\"nb\">range</span><span
  class=\"p\">(</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"mi\">11</span><span class=\"p\">),</span> <span class=\"nb\">len</span><span
  class=\"p\">(</span><span class=\"n\">variables</span><span class=\"p\">))</span>\n\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;*&quot;</span>
  <span class=\"o\">*</span> <span class=\"mi\">30</span><span class=\"p\">)</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;</span><span
  class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;With
  &#39;varable&#39; left aligned&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">for</span>
  <span class=\"n\">varable</span><span class=\"p\">,</span> <span class=\"n\">score</span>
  <span class=\"ow\">in</span> <span class=\"nb\">zip</span><span class=\"p\">(</span><span
  class=\"n\">variables</span><span class=\"p\">,</span> <span class=\"n\">scores</span><span
  class=\"p\">):</span>\n    <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;</span><span class=\"si\">{</span><span
  class=\"n\">varable</span><span class=\"si\">:</span><span class=\"s2\">&lt;10</span><span
  class=\"si\">}</span><span class=\"s2\"> | </span><span class=\"si\">{</span><span
  class=\"n\">score</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
  class=\"p\">)</span>\n\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;*&quot;</span> <span class=\"o\">*</span> <span class=\"mi\">30</span><span
  class=\"p\">)</span>\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
  class=\"p\">)</span>\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;With &#39;varable&#39; right aligned&quot;</span><span class=\"p\">)</span>\n<span
  class=\"k\">for</span> <span class=\"n\">varable</span><span class=\"p\">,</span>
  <span class=\"n\">score</span> <span class=\"ow\">in</span> <span class=\"nb\">zip</span><span
  class=\"p\">(</span><span class=\"n\">variables</span><span class=\"p\">,</span>
  <span class=\"n\">scores</span><span class=\"p\">):</span>\n    <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;</span><span
  class=\"si\">{</span><span class=\"n\">varable</span><span class=\"si\">:</span><span
  class=\"s2\">&gt;15</span><span class=\"si\">}</span><span class=\"s2\"> | </span><span
  class=\"si\">{</span><span class=\"n\">score</span><span class=\"si\">}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">)</span>\n\n<span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;*&quot;</span> <span class=\"o\">*</span>
  <span class=\"mi\">30</span><span class=\"p\">)</span>\n<span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span
  class=\"s2\">&quot;</span><span class=\"p\">)</span>\n<span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;With &#39;varable&#39; center aligned&quot;</span><span
  class=\"p\">)</span>\n<span class=\"k\">for</span> <span class=\"n\">varable</span><span
  class=\"p\">,</span> <span class=\"n\">score</span> <span class=\"ow\">in</span>
  <span class=\"nb\">zip</span><span class=\"p\">(</span><span class=\"n\">variables</span><span
  class=\"p\">,</span> <span class=\"n\">scores</span><span class=\"p\">):</span>\n
  \   <span class=\"nb\">print</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
  class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">varable</span><span
  class=\"si\">:</span><span class=\"s2\">^5</span><span class=\"si\">}</span><span
  class=\"s2\"> | </span><span class=\"si\">{</span><span class=\"n\">score</span><span
  class=\"si\">}</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><img
  alt=\"Alt text\" src=\"/images/py-print-align.png\" title=\"python print\" /></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/abstract-base-class'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Abstract-Base-Class</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/python-builtin-calendar'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Python-Builtin-Calendar</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: /static/python-f-string-align.png
date: 2022-03-08
datetime: 2022-03-08 00:00:00+00:00
description: 'I am personally trying to use  This little python script shows how options
  in the '
edit_link: https://github.com/edit/main/pages/til/python-f-string-align.md
html: "<p>I am personally trying to use <code>logger</code> instead of <code>print</code>
  in all of my code, \nhowever I learned from [@Python-Hub] that you can align printouts
  using <code>print</code> with <code>f</code>-strings!.</p>\n<p>This little python
  script shows how options in the <code>f</code>-string can format the printout.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kn\">import</span> <span
  class=\"nn\">random</span>\n\n<span class=\"n\">variables</span> <span class=\"o\">=</span>
  <span class=\"s2\">&quot;Foo Bar Baz Bing&quot;</span><span class=\"o\">.</span><span
  class=\"n\">split</span><span class=\"p\">()</span>\n<span class=\"n\">scores</span>
  <span class=\"o\">=</span> <span class=\"n\">random</span><span class=\"o\">.</span><span
  class=\"n\">sample</span><span class=\"p\">(</span><span class=\"nb\">range</span><span
  class=\"p\">(</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"mi\">11</span><span class=\"p\">),</span> <span class=\"nb\">len</span><span
  class=\"p\">(</span><span class=\"n\">variables</span><span class=\"p\">))</span>\n\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;*&quot;</span>
  <span class=\"o\">*</span> <span class=\"mi\">30</span><span class=\"p\">)</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;</span><span
  class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n<span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;With
  &#39;varable&#39; left aligned&quot;</span><span class=\"p\">)</span>\n<span class=\"k\">for</span>
  <span class=\"n\">varable</span><span class=\"p\">,</span> <span class=\"n\">score</span>
  <span class=\"ow\">in</span> <span class=\"nb\">zip</span><span class=\"p\">(</span><span
  class=\"n\">variables</span><span class=\"p\">,</span> <span class=\"n\">scores</span><span
  class=\"p\">):</span>\n    <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;</span><span class=\"si\">{</span><span
  class=\"n\">varable</span><span class=\"si\">:</span><span class=\"s2\">&lt;10</span><span
  class=\"si\">}</span><span class=\"s2\"> | </span><span class=\"si\">{</span><span
  class=\"n\">score</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
  class=\"p\">)</span>\n\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;*&quot;</span> <span class=\"o\">*</span> <span class=\"mi\">30</span><span
  class=\"p\">)</span>\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
  class=\"p\">)</span>\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;With &#39;varable&#39; right aligned&quot;</span><span class=\"p\">)</span>\n<span
  class=\"k\">for</span> <span class=\"n\">varable</span><span class=\"p\">,</span>
  <span class=\"n\">score</span> <span class=\"ow\">in</span> <span class=\"nb\">zip</span><span
  class=\"p\">(</span><span class=\"n\">variables</span><span class=\"p\">,</span>
  <span class=\"n\">scores</span><span class=\"p\">):</span>\n    <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;</span><span
  class=\"si\">{</span><span class=\"n\">varable</span><span class=\"si\">:</span><span
  class=\"s2\">&gt;15</span><span class=\"si\">}</span><span class=\"s2\"> | </span><span
  class=\"si\">{</span><span class=\"n\">score</span><span class=\"si\">}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">)</span>\n\n<span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;*&quot;</span> <span class=\"o\">*</span>
  <span class=\"mi\">30</span><span class=\"p\">)</span>\n<span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span
  class=\"s2\">&quot;</span><span class=\"p\">)</span>\n<span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;With &#39;varable&#39; center aligned&quot;</span><span
  class=\"p\">)</span>\n<span class=\"k\">for</span> <span class=\"n\">varable</span><span
  class=\"p\">,</span> <span class=\"n\">score</span> <span class=\"ow\">in</span>
  <span class=\"nb\">zip</span><span class=\"p\">(</span><span class=\"n\">variables</span><span
  class=\"p\">,</span> <span class=\"n\">scores</span><span class=\"p\">):</span>\n
  \   <span class=\"nb\">print</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
  class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">varable</span><span
  class=\"si\">:</span><span class=\"s2\">^5</span><span class=\"si\">}</span><span
  class=\"s2\"> | </span><span class=\"si\">{</span><span class=\"n\">score</span><span
  class=\"si\">}</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><img
  alt=\"Alt text\" src=\"/images/py-print-align.png\" title=\"python print\" /></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/abstract-base-class'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Abstract-Base-Class</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/python-builtin-calendar'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Python-Builtin-Calendar</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: 'I am personally trying to use  This little python script shows
  how options in the '
now: 2024-08-01 13:40:17.987509
path: pages/til/python-f-string-align.md
published: true
slug: python-f-string-align
super_description: 'I am personally trying to use  This little python script shows
  how options in the '
tags:
- python
- tech
templateKey: til
title: Python-F-String-Align
today: 2024-08-01
---

I am personally trying to use `logger` instead of `print` in all of my code, 
however I learned from [@Python-Hub] that you can align printouts using `print` with `f`-strings!.

This little python script shows how options in the `f`-string can format the printout.

```python

import random

variables = "Foo Bar Baz Bing".split()
scores = random.sample(range(1, 11), len(variables))

print("*" * 30)
print("\n")
print("With 'varable' left aligned")
for varable, score in zip(variables, scores):
    print(f"{varable:<10} | {score}")

print("*" * 30)
print("\n")
print("With 'varable' right aligned")
for varable, score in zip(variables, scores):
    print(f"{varable:>15} | {score}")

print("*" * 30)
print("\n")
print("With 'varable' center aligned")
for varable, score in zip(variables, scores):
    print(f"{varable:^5} | {score}")

```




![Alt text](/images/py-print-align.png "python print")
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
    
    <a class='prev' href='/abstract-base-class'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Abstract-Base-Class</p>
        </div>
    </a>
    
    <a class='next' href='/python-builtin-calendar'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Python-Builtin-Calendar</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>