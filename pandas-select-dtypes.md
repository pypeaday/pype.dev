---
article_html: "<p>On my team we often have to change data types of columns in a <code>pandas.DataFrame</code>
  for a variety of reasons.\nThe main one is it tends to be an artifact of EDA whereby
  a file is read in via <code>pandas</code> but the data types are somewhat wonky
  (ie. dates show up as strings, or a column that <em>should</em> be a integer comes
  in as float, etc.).\nThe best solution I think is to leverage the <code>dtypes</code>
  keyword argument in which <code>pd.read_X</code> method is used. \nHowever there
  is another way which is to coerce the data types at runtime instead of loadtime.</p>\n<p>A
  handy way to do this is by using <code>pandas.DataFrame.select_dtypes</code>...</p>\n<p>Here
  is an example of finding columns read in as <code>datetime64</code> and the developer
  would prefer to use pandas datetimes.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">df</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
  class=\"o\">.</span><span class=\"n\">read_csv</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;./file-with-confusing-dtypes.csv&quot;</span><span class=\"p\">)</span>\n<span
  class=\"k\">for</span> <span class=\"n\">c</span> <span class=\"ow\">in</span> <span
  class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">columns</span><span
  class=\"p\">:</span>\n    <span class=\"k\">if</span> <span class=\"n\">df</span><span
  class=\"p\">[</span><span class=\"n\">c</span><span class=\"p\">]</span><span class=\"o\">.</span><span
  class=\"n\">dtype</span> <span class=\"o\">==</span> <span class=\"s2\">&quot;datetime64&quot;</span><span
  class=\"p\">:</span>\n        <span class=\"n\">df</span><span class=\"p\">[</span><span
  class=\"n\">c</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
  class=\"n\">pd</span><span class=\"o\">.</span><span class=\"n\">to_datetime</span><span
  class=\"p\">(</span><span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">c</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>Here is the difference in code flow
  between <code>select_dtypes</code> and manually finding the <code>datetype64</code>
  columns:</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"n\">df</span>
  <span class=\"o\">=</span> <span class=\"n\">pd</span><span class=\"o\">.</span><span
  class=\"n\">read_csv</span><span class=\"p\">(</span><span class=\"s2\">&quot;./file-with-confusing-dtypes.csv&quot;</span><span
  class=\"p\">)</span>\n<span class=\"k\">for</span> <span class=\"n\">c</span> <span
  class=\"ow\">in</span> <span class=\"n\">df</span><span class=\"o\">.</span><span
  class=\"n\">select_dtypes</span><span class=\"p\">(</span><span class=\"s1\">&#39;datetime64&#39;</span><span
  class=\"p\">):</span>\n    <span class=\"n\">df</span><span class=\"p\">[</span><span
  class=\"n\">c</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
  class=\"n\">pd</span><span class=\"o\">.</span><span class=\"n\">to_datetime</span><span
  class=\"p\">(</span><span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">c</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>The difference isn't huge but it's
  the little steps in leveling up that turn script-kitty scripts into clean looking
  functions.</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
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
  \   </style>\n\n    <a class='prev' href='/tiddly-wiki'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Tiddly-Wiki</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/stow'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Stow</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/pandas-select-dtypes.png
date: 2022-03-05
datetime: 2022-03-05 00:00:00+00:00
description: On my team we often have to change data types of columns in a  A handy
  way to do this is by using  Here is an example of finding columns read in as  Here
  is the
edit_link: https://github.com/edit/main/pages/til/pandas-select-dtypes.md
html: "<p>On my team we often have to change data types of columns in a <code>pandas.DataFrame</code>
  for a variety of reasons.\nThe main one is it tends to be an artifact of EDA whereby
  a file is read in via <code>pandas</code> but the data types are somewhat wonky
  (ie. dates show up as strings, or a column that <em>should</em> be a integer comes
  in as float, etc.).\nThe best solution I think is to leverage the <code>dtypes</code>
  keyword argument in which <code>pd.read_X</code> method is used. \nHowever there
  is another way which is to coerce the data types at runtime instead of loadtime.</p>\n<p>A
  handy way to do this is by using <code>pandas.DataFrame.select_dtypes</code>...</p>\n<p>Here
  is an example of finding columns read in as <code>datetime64</code> and the developer
  would prefer to use pandas datetimes.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">df</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
  class=\"o\">.</span><span class=\"n\">read_csv</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;./file-with-confusing-dtypes.csv&quot;</span><span class=\"p\">)</span>\n<span
  class=\"k\">for</span> <span class=\"n\">c</span> <span class=\"ow\">in</span> <span
  class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">columns</span><span
  class=\"p\">:</span>\n    <span class=\"k\">if</span> <span class=\"n\">df</span><span
  class=\"p\">[</span><span class=\"n\">c</span><span class=\"p\">]</span><span class=\"o\">.</span><span
  class=\"n\">dtype</span> <span class=\"o\">==</span> <span class=\"s2\">&quot;datetime64&quot;</span><span
  class=\"p\">:</span>\n        <span class=\"n\">df</span><span class=\"p\">[</span><span
  class=\"n\">c</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
  class=\"n\">pd</span><span class=\"o\">.</span><span class=\"n\">to_datetime</span><span
  class=\"p\">(</span><span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">c</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>Here is the difference in code flow
  between <code>select_dtypes</code> and manually finding the <code>datetype64</code>
  columns:</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"n\">df</span>
  <span class=\"o\">=</span> <span class=\"n\">pd</span><span class=\"o\">.</span><span
  class=\"n\">read_csv</span><span class=\"p\">(</span><span class=\"s2\">&quot;./file-with-confusing-dtypes.csv&quot;</span><span
  class=\"p\">)</span>\n<span class=\"k\">for</span> <span class=\"n\">c</span> <span
  class=\"ow\">in</span> <span class=\"n\">df</span><span class=\"o\">.</span><span
  class=\"n\">select_dtypes</span><span class=\"p\">(</span><span class=\"s1\">&#39;datetime64&#39;</span><span
  class=\"p\">):</span>\n    <span class=\"n\">df</span><span class=\"p\">[</span><span
  class=\"n\">c</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
  class=\"n\">pd</span><span class=\"o\">.</span><span class=\"n\">to_datetime</span><span
  class=\"p\">(</span><span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">c</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>The difference isn't huge but it's
  the little steps in leveling up that turn script-kitty scripts into clean looking
  functions.</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
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
  \   </style>\n\n    <a class='prev' href='/tiddly-wiki'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Tiddly-Wiki</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/stow'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Stow</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: On my team we often have to change data types of columns in a  A
  handy way to do this is by using  Here is an example of finding columns read in
  as  Here is the difference in code flow between  The difference isn
now: 2024-10-12 11:09:11.872022
path: pages/til/pandas-select-dtypes.md
published: true
slug: pandas-select-dtypes
super_description: On my team we often have to change data types of columns in a  A
  handy way to do this is by using  Here is an example of finding columns read in
  as  Here is the difference in code flow between  The difference isn
tags:
- python
- tech
templateKey: til
title: Pandas-Select-Dtypes
today: 2024-10-12
---

On my team we often have to change data types of columns in a `pandas.DataFrame` for a variety of reasons.
The main one is it tends to be an artifact of EDA whereby a file is read in via `pandas` but the data types are somewhat wonky (ie. dates show up as strings, or a column that *should* be a integer comes in as float, etc.).
The best solution I think is to leverage the `dtypes` keyword argument in which `pd.read_X` method is used. 
However there is another way which is to coerce the data types at runtime instead of loadtime.

A handy way to do this is by using `pandas.DataFrame.select_dtypes`...

Here is an example of finding columns read in as `datetime64` and the developer would prefer to use pandas datetimes.

```python
df = pd.read_csv("./file-with-confusing-dtypes.csv")
for c in df.columns:
    if df[c].dtype == "datetime64":
        df[c] = pd.to_datetime(df.c)

```

Here is the difference in code flow between `select_dtypes` and manually finding the `datetype64` columns:

```python
df = pd.read_csv("./file-with-confusing-dtypes.csv")
for c in df.select_dtypes('datetime64'):
    df[c] = pd.to_datetime(df.c)

```


The difference isn't huge but it's the little steps in leveling up that turn script-kitty scripts into clean looking functions.
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
    
    <a class='prev' href='/tiddly-wiki'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Tiddly-Wiki</p>
        </div>
    </a>
    
    <a class='next' href='/stow'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Stow</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>