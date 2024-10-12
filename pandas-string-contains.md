---
article_html: "<h1 id=\"tldr\">TL;DR</h1>\n<p><code>pandas.Series.str.contains</code>
  accepts regular expressions and this is turned on by <strong>default</strong>!</p>\n<h1
  id=\"use-case\">Use case</h1>\n<p>We often need to filter pandas DataFrames based
  on several string values in a Series.</p>\n<blockquote>\n<p>Notice that sweet pyflyby
  import \U0001F601!</p>\n</blockquote>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"err\"></span>  <span class=\"n\">main</span>
  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">df</span> <span class=\"o\">=</span> <span
  class=\"n\">pd</span><span class=\"o\">.</span><span class=\"n\">DataFrame</span><span
  class=\"p\">({</span><span class=\"s2\">&quot;A&quot;</span><span class=\"p\">:</span>
  <span class=\"p\">[</span><span class=\"s2\">&quot;string1&quot;</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot;string2&quot;</span><span class=\"p\">,</span> <span class=\"s2\">&quot;string3&quot;</span><span
  class=\"p\">]})</span>\n<span class=\"p\">[</span><span class=\"n\">PYFLYBY</span><span
  class=\"p\">]</span> <span class=\"kn\">import</span> <span class=\"nn\">pandas</span>
  <span class=\"k\">as</span> <span class=\"nn\">pd</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"err\"></span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">df</span>\n\n         <span class=\"n\">A</span>\n<span class=\"mi\">0</span>
  \ <span class=\"n\">string1</span>\n<span class=\"mi\">1</span>  <span class=\"n\">string2</span>\n<span
  class=\"mi\">2</span>  <span class=\"n\">string3</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"err\"></span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">df</span><span class=\"p\">[</span><span class=\"n\">df</span><span
  class=\"o\">.</span><span class=\"n\">A</span><span class=\"o\">.</span><span class=\"n\">str</span><span
  class=\"o\">.</span><span class=\"n\">contains</span><span class=\"p\">(</span><span
  class=\"s1\">&#39;1&#39;</span><span class=\"p\">)</span> <span class=\"o\">|</span>
  <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">A</span><span
  class=\"o\">.</span><span class=\"n\">str</span><span class=\"o\">.</span><span
  class=\"n\">contains</span><span class=\"p\">(</span><span class=\"s1\">&#39;2&#39;</span><span
  class=\"p\">)]</span>\n\n         <span class=\"n\">A</span>\n<span class=\"mi\">0</span>
  \ <span class=\"n\">string1</span>\n<span class=\"mi\">1</span>  <span class=\"n\">string2</span>\n</code></pre></div>\n<p>And
  this isn't the worst thing in the world, especially for such a tiny example...</p>\n<p>But
  what if we had dozens or more values to filter on?</p>\n<p>Then it looks so much
  nicer to create an iterable of the values we want to filter on and join them with
  an apropriate regex operator (in this case <code>|</code> for <em>inclusive or</em>)</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span> <span
  class=\"err\"></span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">vals</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
  class=\"s2\">&quot;1&quot;</span><span class=\"p\">,</span> <span class=\"s2\">&quot;2&quot;</span><span
  class=\"p\">]</span>  <span class=\"c1\"># iterable with whatever is appropriate
  for your use case</span>\n\n<span class=\"n\">sandbox</span> <span class=\"err\"></span>
  \ <span class=\"n\">main</span> <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"n\">df</span><span
  class=\"p\">[</span><span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">A</span><span
  class=\"o\">.</span><span class=\"n\">str</span><span class=\"o\">.</span><span
  class=\"n\">contains</span><span class=\"p\">(</span><span class=\"s2\">&quot;|&quot;</span><span
  class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
  class=\"n\">vals</span><span class=\"p\">),</span> <span class=\"n\">regex</span><span
  class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">)]</span>\n\n
  \        <span class=\"n\">A</span>\n<span class=\"mi\">0</span>  <span class=\"n\">string1</span>\n<span
  class=\"mi\">1</span>  <span class=\"n\">string2</span>\n</code></pre></div>\n<h1
  id=\"fin\">Fin</h1>\n<p>This is a super nice and concise way to do the kind of filtering
  my team does on a daily basis!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
  \   :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </a>\n\n    <a class='next' href='/simple-port-forwarding-opnsense'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Simple Port Forwarding OPNSense</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: /static/pandas-string-contains.png
date: 2022-05-02
datetime: 2022-05-02 00:00:00+00:00
description: "pandas.Series.str.contains We often need to filter pandas DataFrames
  based on several string values in a Series. Notice that sweet pyflyby import \U0001F601
  And this isn"
edit_link: https://github.com/edit/main/pages/til/pandas-string-contains.md
html: "<h1 id=\"tldr\">TL;DR</h1>\n<p><code>pandas.Series.str.contains</code> accepts
  regular expressions and this is turned on by <strong>default</strong>!</p>\n<h1
  id=\"use-case\">Use case</h1>\n<p>We often need to filter pandas DataFrames based
  on several string values in a Series.</p>\n<blockquote>\n<p>Notice that sweet pyflyby
  import \U0001F601!</p>\n</blockquote>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"err\"></span>  <span class=\"n\">main</span>
  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">df</span> <span class=\"o\">=</span> <span
  class=\"n\">pd</span><span class=\"o\">.</span><span class=\"n\">DataFrame</span><span
  class=\"p\">({</span><span class=\"s2\">&quot;A&quot;</span><span class=\"p\">:</span>
  <span class=\"p\">[</span><span class=\"s2\">&quot;string1&quot;</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot;string2&quot;</span><span class=\"p\">,</span> <span class=\"s2\">&quot;string3&quot;</span><span
  class=\"p\">]})</span>\n<span class=\"p\">[</span><span class=\"n\">PYFLYBY</span><span
  class=\"p\">]</span> <span class=\"kn\">import</span> <span class=\"nn\">pandas</span>
  <span class=\"k\">as</span> <span class=\"nn\">pd</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"err\"></span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">df</span>\n\n         <span class=\"n\">A</span>\n<span class=\"mi\">0</span>
  \ <span class=\"n\">string1</span>\n<span class=\"mi\">1</span>  <span class=\"n\">string2</span>\n<span
  class=\"mi\">2</span>  <span class=\"n\">string3</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"err\"></span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">df</span><span class=\"p\">[</span><span class=\"n\">df</span><span
  class=\"o\">.</span><span class=\"n\">A</span><span class=\"o\">.</span><span class=\"n\">str</span><span
  class=\"o\">.</span><span class=\"n\">contains</span><span class=\"p\">(</span><span
  class=\"s1\">&#39;1&#39;</span><span class=\"p\">)</span> <span class=\"o\">|</span>
  <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">A</span><span
  class=\"o\">.</span><span class=\"n\">str</span><span class=\"o\">.</span><span
  class=\"n\">contains</span><span class=\"p\">(</span><span class=\"s1\">&#39;2&#39;</span><span
  class=\"p\">)]</span>\n\n         <span class=\"n\">A</span>\n<span class=\"mi\">0</span>
  \ <span class=\"n\">string1</span>\n<span class=\"mi\">1</span>  <span class=\"n\">string2</span>\n</code></pre></div>\n<p>And
  this isn't the worst thing in the world, especially for such a tiny example...</p>\n<p>But
  what if we had dozens or more values to filter on?</p>\n<p>Then it looks so much
  nicer to create an iterable of the values we want to filter on and join them with
  an apropriate regex operator (in this case <code>|</code> for <em>inclusive or</em>)</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span> <span
  class=\"err\"></span>  <span class=\"n\">main</span> <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">vals</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
  class=\"s2\">&quot;1&quot;</span><span class=\"p\">,</span> <span class=\"s2\">&quot;2&quot;</span><span
  class=\"p\">]</span>  <span class=\"c1\"># iterable with whatever is appropriate
  for your use case</span>\n\n<span class=\"n\">sandbox</span> <span class=\"err\"></span>
  \ <span class=\"n\">main</span> <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"n\">df</span><span
  class=\"p\">[</span><span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">A</span><span
  class=\"o\">.</span><span class=\"n\">str</span><span class=\"o\">.</span><span
  class=\"n\">contains</span><span class=\"p\">(</span><span class=\"s2\">&quot;|&quot;</span><span
  class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
  class=\"n\">vals</span><span class=\"p\">),</span> <span class=\"n\">regex</span><span
  class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">)]</span>\n\n
  \        <span class=\"n\">A</span>\n<span class=\"mi\">0</span>  <span class=\"n\">string1</span>\n<span
  class=\"mi\">1</span>  <span class=\"n\">string2</span>\n</code></pre></div>\n<h1
  id=\"fin\">Fin</h1>\n<p>This is a super nice and concise way to do the kind of filtering
  my team does on a daily basis!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
  \   :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </a>\n\n    <a class='next' href='/simple-port-forwarding-opnsense'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Simple Port Forwarding OPNSense</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: "pandas.Series.str.contains We often need to filter pandas DataFrames
  based on several string values in a Series. Notice that sweet pyflyby import \U0001F601
  And this isn But what if we had dozens or more values to filter on? Then it looks
  so much nicer to cre"
now: 2024-10-12 11:09:11.872103
path: pages/til/pandas-string-contains.md
published: false
slug: pandas-string-contains
super_description: "pandas.Series.str.contains We often need to filter pandas DataFrames
  based on several string values in a Series. Notice that sweet pyflyby import \U0001F601
  And this isn But what if we had dozens or more values to filter on? Then it looks
  so much nicer to create an iterable of the values we want to filter on and join
  them with an apropriate regex operator (in this case  This is a super nice and concise
  way to do the kind of filtering my team does on a daily basis"
tags:
- python
- tech
templateKey: til
title: Pandas-String-Contains
today: 2024-10-12
---

# TL;DR 

`pandas.Series.str.contains` accepts regular expressions and this is turned on by __default__!

# Use case

We often need to filter pandas DataFrames based on several string values in a Series.

> Notice that sweet pyflyby import 😁!

```python
sandbox   main via 3.8.11(sandbox) ipython
❯ df = pd.DataFrame({"A": ["string1", "string2", "string3"]})
[PYFLYBY] import pandas as pd

sandbox   main via 3.8.11(sandbox) ipython
❯ df

         A
0  string1
1  string2
2  string3

sandbox   main via 3.8.11(sandbox) ipython
❯ df[df.A.str.contains('1') | df.A.str.contains('2')]

         A
0  string1
1  string2

```

And this isn't the worst thing in the world, especially for such a tiny example...

But what if we had dozens or more values to filter on?

Then it looks so much nicer to create an iterable of the values we want to filter on and join them with an apropriate regex operator (in this case `|` for _inclusive or_)

```python

sandbox   main via 3.8.11(sandbox) ipython
❯ vals = ["1", "2"]  # iterable with whatever is appropriate for your use case

sandbox   main via 3.8.11(sandbox) ipython
❯ df[df.A.str.contains("|".join(vals), regex=True)]

         A
0  string1
1  string2

```

# Fin

This is a super nice and concise way to do the kind of filtering my team does on a daily basis!
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
    
    <a class='next' href='/simple-port-forwarding-opnsense'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Simple Port Forwarding OPNSense</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>