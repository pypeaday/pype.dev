---
article_html: "<p>I have often wanted to dive into memory usage for pandas DataFrames
  when it comes to cloud deployment.\nIf I have a python process running on a server
  at home I can use <code>glances</code> or a number of other tools to diagnose a
  memory issue...\nHowever at work I normally deploy dockerized processes on AWS Batch
  and it's much more challenging to get info on the dockerized process without more
  AWS integration that my team isn't quite ready for.\nSo TIL that I can get some
  of the info I want from pandas directly!</p>\n<h1 id=\"dataframeinfo\">DataFrame.info()</h1>\n<p>I
  didn't realize that <code>df.info()</code> was able to give me more info than just
  dtypes and some summary stats...\nThere is a kwarg <code>memory_usage</code> that
  can configure what you need to get back, so <code>df.memory_usage=\"deep\"</code>
  will give you how much RAM any given DataFrame is using!\nAmazing tool for finding
  issues with joins or renegade source data files.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">df</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
  class=\"o\">.</span><span class=\"n\">read_csv</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;cars.csv&quot;</span><span class=\"p\">)</span>\n\n<span class=\"n\">df</span><span
  class=\"o\">.</span><span class=\"n\">info</span><span class=\"p\">(</span><span
  class=\"n\">memory_usage</span><span class=\"o\">=</span><span class=\"s2\">&quot;deep&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p><img alt=\"Alt text\" src=\"/images/df-memory-usage.png\"
  title=\"DF memory\" /></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/python-builtin-calendar'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Python-Builtin-Calendar</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/adblock-coverage'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Adblock-Coverage</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/dataframe-memory-usage.png
date: 2022-03-07
datetime: 2022-03-07 00:00:00+00:00
description: I have often wanted to dive into memory usage for pandas DataFrames when
  it comes to cloud deployment. I didn
edit_link: https://github.com/edit/main/pages/til/dataframe-memory-usage.md
html: "<p>I have often wanted to dive into memory usage for pandas DataFrames when
  it comes to cloud deployment.\nIf I have a python process running on a server at
  home I can use <code>glances</code> or a number of other tools to diagnose a memory
  issue...\nHowever at work I normally deploy dockerized processes on AWS Batch and
  it's much more challenging to get info on the dockerized process without more AWS
  integration that my team isn't quite ready for.\nSo TIL that I can get some of the
  info I want from pandas directly!</p>\n<h1 id=\"dataframeinfo\">DataFrame.info()</h1>\n<p>I
  didn't realize that <code>df.info()</code> was able to give me more info than just
  dtypes and some summary stats...\nThere is a kwarg <code>memory_usage</code> that
  can configure what you need to get back, so <code>df.memory_usage=\"deep\"</code>
  will give you how much RAM any given DataFrame is using!\nAmazing tool for finding
  issues with joins or renegade source data files.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">df</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
  class=\"o\">.</span><span class=\"n\">read_csv</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;cars.csv&quot;</span><span class=\"p\">)</span>\n\n<span class=\"n\">df</span><span
  class=\"o\">.</span><span class=\"n\">info</span><span class=\"p\">(</span><span
  class=\"n\">memory_usage</span><span class=\"o\">=</span><span class=\"s2\">&quot;deep&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p><img alt=\"Alt text\" src=\"/images/df-memory-usage.png\"
  title=\"DF memory\" /></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/python-builtin-calendar'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Python-Builtin-Calendar</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/adblock-coverage'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Adblock-Coverage</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I have often wanted to dive into memory usage for pandas DataFrames
  when it comes to cloud deployment. I didn
now: 2024-01-05 14:15:22.253832
path: pages/til/dataframe-memory-usage.md
published: true
slug: dataframe-memory-usage
super_description: I have often wanted to dive into memory usage for pandas DataFrames
  when it comes to cloud deployment. I didn
tags:
- python
- tech
templateKey: til
title: Dataframe-Memory-Usage
today: 2024-01-05
---

I have often wanted to dive into memory usage for pandas DataFrames when it comes to cloud deployment.
If I have a python process running on a server at home I can use `glances` or a number of other tools to diagnose a memory issue...
However at work I normally deploy dockerized processes on AWS Batch and it's much more challenging to get info on the dockerized process without more AWS integration that my team isn't quite ready for.
So TIL that I can get some of the info I want from pandas directly!

# DataFrame.info()

I didn't realize that `df.info()` was able to give me more info than just dtypes and some summary stats...
There is a kwarg `memory_usage` that can configure what you need to get back, so `df.memory_usage="deep"` will give you how much RAM any given DataFrame is using!
Amazing tool for finding issues with joins or renegade source data files.

```python
df = pd.read_csv("cars.csv")

df.info(memory_usage="deep")
```

![Alt text](/images/df-memory-usage.png "DF memory")
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
    
    <a class='prev' href='/python-builtin-calendar'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Python-Builtin-Calendar</p>
        </div>
    </a>
    
    <a class='next' href='/adblock-coverage'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Adblock-Coverage</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>