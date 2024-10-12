---
article_html: "<p>I wrote up a little on exporting DataFrames to markdown and html
  <a href=\"/dataframe-to-markdown\">here</a></p>\n<p>But I've been playing with a
  web app for with lists and while I'm toying around I learned you can actually give
  your tables some style with some simple css classes! </p>\n<h1 id=\"to-html\">To
  HTML</h1>\n<p>Reminder that if you have a dataframe, <code>df</code>, you can <code>df.to_html()</code>
  to get an HTML table of your dataframe.</p>\n<p>Well you can pass some <code>classes</code>
  to make it look super nice!</p>\n<h1 id=\"classes-and-css\">Classes and CSS</h1>\n<p>I
  don't know anything really about CSS so I won't pretend otherwise, but as I was
  learning about bootstrap that's where I stumbled upon this...</p>\n<p>There are
  several classes you can pass but I found really good luck with <code>table-bordered</code>
  and <code>table-dark</code> for my use case</p>\n<p><code>df.to_html(classes=[\"table
  table-bordered table-dark\"])</code></p>\n<table border=\"1\" class=\"dataframe
  table table-bordered table-dark\">  <thead>\n<tr style=\"text-align: right;\">      <th>Unnamed:
  0</th>      <th>mpg</th>\n<th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>\n<th>wt</th>
  \     <th>qsec</th>      <th>vs</th>      <th>am</th>\n<th>gear</th>      <th>carb</th>
  \   </tr>  </thead>  <tbody>    <tr>\n<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>
  \     <td>160.0</td>\n<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>\n<td>0</td>
  \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Mazda RX4
  Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>\n<td>110</td>      <td>3.90</td>
  \     <td>2.875</td>      <td>17.02</td>\n<td>0</td>      <td>1</td>      <td>4</td>
  \     <td>4</td>    </tr>    <tr>\n<td>Datsun 710</td>      <td>22.8</td>      <td>4</td>
  \     <td>108.0</td>\n<td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>\n<td>1</td>
  \     <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet 4
  Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>\n<td>110</td>
  \     <td>3.08</td>      <td>3.215</td>      <td>19.44</td>\n<td>1</td>      <td>0</td>
  \     <td>3</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet Sportabout</td>      <td>18.7</td>
  \     <td>8</td>\n<td>360.0</td>      <td>175</td>      <td>3.15</td>      <td>3.440</td>\n<td>17.02</td>
  \     <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>\n</tr>  </tbody></table>\n\n<h1
  id=\"you-try-it\">You try it!</h1>\n<p>Crack open ipython and make a dataframe,
  then <code>df.to_html(classes=[\"table table-bordered table-dark\"])</code>, copy
  the output (minus the quote marks ipython uses to denote the string type) that into
  <code>my-file.html</code>, open that up in a browser and be amazed!</p>\n<blockquote>\n<p>For
  added effeciency try using pyperclip to copy the output right to your clipboard!</p>\n</blockquote>\n<p><code>pip
  install pyperclip</code> and then <code>pyperclip.copy(df.to_html(classes=[\"table
  table-bordered table-dark\"]))</code></p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </style>\n\n    <a class='prev' href='/upgrading-your-kernel-can-f-you-up-whoops'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Upgrading
  your kernel can F you up... whoops</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/mounting-exfat-usb-in-linux'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Mounting
  exFAT USB in Linux</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/dataframe-to-styled-html.png
date: 2022-05-07
datetime: 2022-05-07 00:00:00+00:00
description: 'I wrote up a little on exporting DataFrames to markdown and html  But
  I Reminder that if you have a dataframe,  Well you can pass some  I don There are
  several '
edit_link: https://github.com/edit/main/pages/til/dataframe-to-styled-html.md
html: "<p>I wrote up a little on exporting DataFrames to markdown and html <a href=\"/dataframe-to-markdown\">here</a></p>\n<p>But
  I've been playing with a web app for with lists and while I'm toying around I learned
  you can actually give your tables some style with some simple css classes! </p>\n<h1
  id=\"to-html\">To HTML</h1>\n<p>Reminder that if you have a dataframe, <code>df</code>,
  you can <code>df.to_html()</code> to get an HTML table of your dataframe.</p>\n<p>Well
  you can pass some <code>classes</code> to make it look super nice!</p>\n<h1 id=\"classes-and-css\">Classes
  and CSS</h1>\n<p>I don't know anything really about CSS so I won't pretend otherwise,
  but as I was learning about bootstrap that's where I stumbled upon this...</p>\n<p>There
  are several classes you can pass but I found really good luck with <code>table-bordered</code>
  and <code>table-dark</code> for my use case</p>\n<p><code>df.to_html(classes=[\"table
  table-bordered table-dark\"])</code></p>\n<table border=\"1\" class=\"dataframe
  table table-bordered table-dark\">  <thead>\n<tr style=\"text-align: right;\">      <th>Unnamed:
  0</th>      <th>mpg</th>\n<th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>\n<th>wt</th>
  \     <th>qsec</th>      <th>vs</th>      <th>am</th>\n<th>gear</th>      <th>carb</th>
  \   </tr>  </thead>  <tbody>    <tr>\n<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>
  \     <td>160.0</td>\n<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>\n<td>0</td>
  \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>\n<td>Mazda RX4
  Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>\n<td>110</td>      <td>3.90</td>
  \     <td>2.875</td>      <td>17.02</td>\n<td>0</td>      <td>1</td>      <td>4</td>
  \     <td>4</td>    </tr>    <tr>\n<td>Datsun 710</td>      <td>22.8</td>      <td>4</td>
  \     <td>108.0</td>\n<td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>\n<td>1</td>
  \     <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet 4
  Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>\n<td>110</td>
  \     <td>3.08</td>      <td>3.215</td>      <td>19.44</td>\n<td>1</td>      <td>0</td>
  \     <td>3</td>      <td>1</td>    </tr>    <tr>\n<td>Hornet Sportabout</td>      <td>18.7</td>
  \     <td>8</td>\n<td>360.0</td>      <td>175</td>      <td>3.15</td>      <td>3.440</td>\n<td>17.02</td>
  \     <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>\n</tr>  </tbody></table>\n\n<h1
  id=\"you-try-it\">You try it!</h1>\n<p>Crack open ipython and make a dataframe,
  then <code>df.to_html(classes=[\"table table-bordered table-dark\"])</code>, copy
  the output (minus the quote marks ipython uses to denote the string type) that into
  <code>my-file.html</code>, open that up in a browser and be amazed!</p>\n<blockquote>\n<p>For
  added effeciency try using pyperclip to copy the output right to your clipboard!</p>\n</blockquote>\n<p><code>pip
  install pyperclip</code> and then <code>pyperclip.copy(df.to_html(classes=[\"table
  table-bordered table-dark\"]))</code></p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </style>\n\n    <a class='prev' href='/upgrading-your-kernel-can-f-you-up-whoops'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Upgrading
  your kernel can F you up... whoops</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/mounting-exfat-usb-in-linux'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Mounting
  exFAT USB in Linux</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I wrote up a little on exporting DataFrames to markdown and html  But
  I Reminder that if you have a dataframe,  Well you can pass some  I don There are
  several classes you can pass but I found really good luck with  df.to_html(classes=["table
  table-b
now: 2024-10-12 11:09:11.872187
path: pages/til/dataframe-to-styled-html.md
published: false
slug: dataframe-to-styled-html
super_description: I wrote up a little on exporting DataFrames to markdown and html  But
  I Reminder that if you have a dataframe,  Well you can pass some  I don There are
  several classes you can pass but I found really good luck with  df.to_html(classes=["table
  table-bordered table-dark"]) Crack open ipython and make a dataframe, then  For
  added effeciency try using pyperclip to copy the output right to your clipboard
  pip install pyperclip
tags:
- python
- tech
templateKey: til
title: Dataframe-To-Styled-Html
today: 2024-10-12
---

I wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)

But I've been playing with a web app for with lists and while I'm toying around I learned you can actually give your tables some style with some simple css classes! 

# To HTML

Reminder that if you have a dataframe, `df`, you can `df.to_html()` to get an HTML table of your dataframe.

Well you can pass some `classes` to make it look super nice!

# Classes and CSS

I don't know anything really about CSS so I won't pretend otherwise, but as I was learning about bootstrap that's where I stumbled upon this...

There are several classes you can pass but I found really good luck with `table-bordered` and `table-dark` for my use case

`df.to_html(classes=["table table-bordered table-dark"])`

<table border="1" class="dataframe table table-bordered table-dark">  <thead>
<tr style="text-align: right;">      <th>Unnamed: 0</th>      <th>mpg</th>
<th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>
<th>wt</th>      <th>qsec</th>      <th>vs</th>      <th>am</th>
<th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>    <tr>
<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>
<td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
<td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
<td>110</td>      <td>3.90</td>      <td>2.875</td>      <td>17.02</td>
<td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
<td>Datsun 710</td>      <td>22.8</td>      <td>4</td>      <td>108.0</td>
<td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>
<td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>
<td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>
<td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>
<td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>
<td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>
<td>360.0</td>      <td>175</td>      <td>3.15</td>      <td>3.440</td>
<td>17.02</td>      <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>
</tr>  </tbody></table>


# You try it!

Crack open ipython and make a dataframe, then `df.to_html(classes=["table table-bordered table-dark"])`, copy the output (minus the quote marks ipython uses to denote the string type) that into `my-file.html`, open that up in a browser and be amazed!

> For added effeciency try using pyperclip to copy the output right to your clipboard!

`pip install pyperclip` and then `pyperclip.copy(df.to_html(classes=["table table-bordered table-dark"]))`
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
    
    <a class='prev' href='/upgrading-your-kernel-can-f-you-up-whoops'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Upgrading your kernel can F you up... whoops</p>
        </div>
    </a>
    
    <a class='next' href='/mounting-exfat-usb-in-linux'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Mounting exFAT USB in Linux</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>