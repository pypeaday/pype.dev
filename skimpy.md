---
article_html: "<h2 id=\"eda\">EDA</h2>\n<p>I work with data a lot, but the nature
  of my job isn't to dive super deep into a small amount of datasets,\nI'm often jumping
  between several projects every day and need to just get a super quick glance at
  some tables to get a high level view.</p>\n<p>When I'm doing more interactive exploration
  I've graduated from Jupyter cells with <code>df_N.head()</code> to using an amazing
  tool called <a href=\"https://www.visidata.org/\">visidata</a></p>\n<p>However,
  Visidata is a terminal based application and I'm often in an iPython console...
  so is there a way to move even faster for my super quick summary views?</p>\n<p><strong>yes!</strong>
  </p>\n<h2 id=\"skimpy\">Skimpy</h2>\n<p>First thing to do is <code>pip install skimpy</code>
  and then it's as easy to get some summary stats with <code>skimpy &lt;data&gt;</code></p>\n<p><img
  alt=\"Alt Text\" src=\"/images/skimpy-zsh.png\" title=\"skimpy-zsh\" /></p>\n<p>This
  is super nice for seeing missing values in particular as well as the distribution
  shape of the data.</p>\n<h2 id=\"ipython\">iPython</h2>\n<p>But wait... I just said
  I'm normally in an iPython session but that was called from zsh.. If I'm hoping
  back into zsh I might as well use visidata to have more powerful exploration at
  my fingertips.\nSo... can I see this table quickly without breaking my iPython workflow?</p>\n<p><strong>Of
  course you can with magic!</strong></p>\n<p><img alt=\"Alt Text\" src=\"/images/skimpy-ipython.png\"
  title=\"skimpy-ipython\" /></p>\n<p>The above assumes you're looking at a file,
  like you would in the terminal. \n<code>skimpy</code> works even better in iPython
  with <code>from skimpy import skim</code> then pass any DataFrame to <code>skim</code>!</p>\n<p><img
  alt=\"Alt Text\" src=\"/images/skimpy-ipython2.png\" title=\"skimpy-ipython2\" /></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/truenas-and-wireguard'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Truenas-And-Wireguard</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/pyclean'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Pyclean</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/skimpy.png
date: 2022-03-23
datetime: 2022-03-23 00:00:00+00:00
description: I work with data a lot, but the nature of my job isn When I However,
  Visidata is a terminal based application and I First thing to do is  This is super
  nice for
edit_link: https://github.com/edit/main/pages/til/skimpy.md
html: "<h2 id=\"eda\">EDA</h2>\n<p>I work with data a lot, but the nature of my job
  isn't to dive super deep into a small amount of datasets,\nI'm often jumping between
  several projects every day and need to just get a super quick glance at some tables
  to get a high level view.</p>\n<p>When I'm doing more interactive exploration I've
  graduated from Jupyter cells with <code>df_N.head()</code> to using an amazing tool
  called <a href=\"https://www.visidata.org/\">visidata</a></p>\n<p>However, Visidata
  is a terminal based application and I'm often in an iPython console... so is there
  a way to move even faster for my super quick summary views?</p>\n<p><strong>yes!</strong>
  </p>\n<h2 id=\"skimpy\">Skimpy</h2>\n<p>First thing to do is <code>pip install skimpy</code>
  and then it's as easy to get some summary stats with <code>skimpy &lt;data&gt;</code></p>\n<p><img
  alt=\"Alt Text\" src=\"/images/skimpy-zsh.png\" title=\"skimpy-zsh\" /></p>\n<p>This
  is super nice for seeing missing values in particular as well as the distribution
  shape of the data.</p>\n<h2 id=\"ipython\">iPython</h2>\n<p>But wait... I just said
  I'm normally in an iPython session but that was called from zsh.. If I'm hoping
  back into zsh I might as well use visidata to have more powerful exploration at
  my fingertips.\nSo... can I see this table quickly without breaking my iPython workflow?</p>\n<p><strong>Of
  course you can with magic!</strong></p>\n<p><img alt=\"Alt Text\" src=\"/images/skimpy-ipython.png\"
  title=\"skimpy-ipython\" /></p>\n<p>The above assumes you're looking at a file,
  like you would in the terminal. \n<code>skimpy</code> works even better in iPython
  with <code>from skimpy import skim</code> then pass any DataFrame to <code>skim</code>!</p>\n<p><img
  alt=\"Alt Text\" src=\"/images/skimpy-ipython2.png\" title=\"skimpy-ipython2\" /></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/truenas-and-wireguard'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Truenas-And-Wireguard</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/pyclean'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Pyclean</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I work with data a lot, but the nature of my job isn When I However,
  Visidata is a terminal based application and I First thing to do is  This is super
  nice for seeing missing values in particular as well as the distribution shape of
  the data. But wa
now: 2024-06-26 16:50:21.524105
path: pages/til/skimpy.md
published: true
slug: skimpy
super_description: I work with data a lot, but the nature of my job isn When I However,
  Visidata is a terminal based application and I First thing to do is  This is super
  nice for seeing missing values in particular as well as the distribution shape of
  the data. But wait... I just said I The above assumes you
tags:
- python
- homepage
- tech
templateKey: til
title: Skimpy
today: 2024-06-26
---

## EDA

I work with data a lot, but the nature of my job isn't to dive super deep into a small amount of datasets,
I'm often jumping between several projects every day and need to just get a super quick glance at some tables to get a high level view.

When I'm doing more interactive exploration I've graduated from Jupyter cells with `df_N.head()` to using an amazing tool called [visidata](https://www.visidata.org/)

However, Visidata is a terminal based application and I'm often in an iPython console... so is there a way to move even faster for my super quick summary views?

__yes!__ 

## Skimpy

First thing to do is `pip install skimpy` and then it's as easy to get some summary stats with `skimpy <data>`

![Alt Text](/images/skimpy-zsh.png "skimpy-zsh")

This is super nice for seeing missing values in particular as well as the distribution shape of the data.

## iPython

But wait... I just said I'm normally in an iPython session but that was called from zsh.. If I'm hoping back into zsh I might as well use visidata to have more powerful exploration at my fingertips.
So... can I see this table quickly without breaking my iPython workflow?

__Of course you can with magic!__


![Alt Text](/images/skimpy-ipython.png "skimpy-ipython")


The above assumes you're looking at a file, like you would in the terminal. 
`skimpy` works even better in iPython with `from skimpy import skim` then pass any DataFrame to `skim`!

![Alt Text](/images/skimpy-ipython2.png "skimpy-ipython2")
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
    
    <a class='prev' href='/truenas-and-wireguard'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Truenas-And-Wireguard</p>
        </div>
    </a>
    
    <a class='next' href='/pyclean'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Pyclean</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>