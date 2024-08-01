---
article_html: "<p>I just started using FastAPI for a home project and needed to pass
  back a\ndynamic number of values from a form rendered with jinja...</p>\n<h1 id=\"dynamic-values\">Dynamic
  Values</h1>\n<p>The jinja templating for rendering HTML based on something like
  a python iterable is nice and easy</p>\n<blockquote>\n<p>data is the result of a
  database query, and item is each row, so the dot notation is the value of each column
  basically in that row</p>\n</blockquote>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"x\">&lt;form method=&quot;post&quot;&gt;</span>\n\n\n<span class=\"x\">&lt;button
  type=&quot;submit&quot; class=&quot;submit btn btn-xl btn-outline-danger&quot; &gt;Remove&lt;/button&gt;</span>\n<span
  class=\"x\">&lt;/form&gt;</span>\n</code></pre></div>\n<p>This form generates a
  row with a checkbox for every <code>item</code> in <code>data</code> (in my\ncase
  each <code>item</code> is an existing row in my table). it?</p>\n<p>The way to pass
  back all those values is pretty straight forward (after hours of messing around
  that is!)</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"c1\">#
  I hate it when tutorials don&#39;t show ALL relevant pieces to the blurb</span>\n<span
  class=\"kn\">import</span> <span class=\"nn\">starlette.status</span> <span class=\"k\">as</span>
  <span class=\"nn\">status</span>\n<span class=\"kn\">from</span> <span class=\"nn\">fastapi</span>
  <span class=\"kn\">import</span> <span class=\"n\">APIRouter</span><span class=\"p\">,</span>
  <span class=\"n\">Depends</span><span class=\"p\">,</span> <span class=\"n\">Form</span><span
  class=\"p\">,</span> <span class=\"n\">Request</span>\n<span class=\"kn\">from</span>
  <span class=\"nn\">fastapi.encoders</span> <span class=\"kn\">import</span> <span
  class=\"n\">jsonable_encoder</span>\n<span class=\"kn\">from</span> <span class=\"nn\">fastapi.responses</span>
  <span class=\"kn\">import</span> <span class=\"n\">HTMLResponse</span><span class=\"p\">,</span>
  <span class=\"n\">RedirectResponse</span>\n<span class=\"kn\">from</span> <span
  class=\"nn\">fastapi.templating</span> <span class=\"kn\">import</span> <span class=\"n\">Jinja2Templates</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.orm</span> <span class=\"kn\">import</span>
  <span class=\"n\">Session</span>\n\n<span class=\"kn\">from</span> <span class=\"nn\">app.session.session</span>
  <span class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
  class=\"n\">router</span> <span class=\"o\">=</span> <span class=\"n\">APIRouter</span><span
  class=\"p\">()</span>\n<span class=\"n\">templates</span> <span class=\"o\">=</span>
  <span class=\"n\">Jinja2Templates</span><span class=\"p\">(</span><span class=\"n\">directory</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;templates/&quot;</span><span class=\"p\">)</span>\n\n<span
  class=\"nd\">@router</span><span class=\"o\">.</span><span class=\"n\">post</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/my_route/do_something_with_form&quot;</span><span
  class=\"p\">,</span> <span class=\"n\">response_class</span><span class=\"o\">=</span><span
  class=\"n\">HTMLResponse</span><span class=\"p\">)</span>\n<span class=\"k\">async</span>
  <span class=\"k\">def</span> <span class=\"nf\">delete_rows</span><span class=\"p\">(</span>\n
  \   <span class=\"n\">request</span><span class=\"p\">:</span> <span class=\"n\">Request</span><span
  class=\"p\">,</span>\n    <span class=\"n\">db</span><span class=\"p\">:</span>
  <span class=\"n\">Session</span> <span class=\"o\">=</span> <span class=\"n\">Depends</span><span
  class=\"p\">(</span><span class=\"n\">create_get_session</span><span class=\"p\">),</span>\n<span
  class=\"p\">):</span>\n    <span class=\"n\">form_data</span> <span class=\"o\">=</span>
  <span class=\"k\">await</span> <span class=\"n\">request</span><span class=\"o\">.</span><span
  class=\"n\">get_form</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span>
  <span class=\"o\">=</span> <span class=\"n\">jsonable_encoder</span><span class=\"p\">(</span><span
  class=\"n\">form_data</span><span class=\"p\">)</span>\n    <span class=\"c1\">#
  data = {&quot;item_1&quot;: 1, &quot;item_2&quot;: 2, ... &quot;item_N&quot;: N}</span>\n
  \   <span class=\"k\">return</span> <span class=\"n\">RedirectResponse</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span class=\"p\">,</span>
  <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"n\">status</span><span
  class=\"o\">.</span><span class=\"n\">HTTP_302_FOUND</span><span class=\"p\">)</span>\n</code></pre></div>\n<p>We
  <code>await request.get_form()</code> and after encoding the data we get a dictionary
  with key/value pairs of the name/value from the form!</p>\n<p>This took me quite
  a long time to figure out in part because most of the Google-able resources are
  still on Flask...</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/ffmpeg-10-bit-videos-to-8-bit'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>FFMPEG
  10-bit videos to 8-bit</p>\n        </div>\n    </a>\n\n    <a class='next' href='/abstract-base-class'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Abstract-Base-Class</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
cover: /static/forms-with-fast-api-and-jinja.png
date: 2022-05-15
datetime: 2022-05-15 00:00:00+00:00
description: I just started using FastAPI for a home project and needed to pass back
  a The jinja templating for rendering HTML based on something like a python iterable
  is n
edit_link: https://github.com/edit/main/pages/til/fastapi-jinja-forms.md
html: "<p>I just started using FastAPI for a home project and needed to pass back
  a\ndynamic number of values from a form rendered with jinja...</p>\n<h1 id=\"dynamic-values\">Dynamic
  Values</h1>\n<p>The jinja templating for rendering HTML based on something like
  a python iterable is nice and easy</p>\n<blockquote>\n<p>data is the result of a
  database query, and item is each row, so the dot notation is the value of each column
  basically in that row</p>\n</blockquote>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"x\">&lt;form method=&quot;post&quot;&gt;</span>\n\n\n<span class=\"x\">&lt;button
  type=&quot;submit&quot; class=&quot;submit btn btn-xl btn-outline-danger&quot; &gt;Remove&lt;/button&gt;</span>\n<span
  class=\"x\">&lt;/form&gt;</span>\n</code></pre></div>\n<p>This form generates a
  row with a checkbox for every <code>item</code> in <code>data</code> (in my\ncase
  each <code>item</code> is an existing row in my table). it?</p>\n<p>The way to pass
  back all those values is pretty straight forward (after hours of messing around
  that is!)</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"c1\">#
  I hate it when tutorials don&#39;t show ALL relevant pieces to the blurb</span>\n<span
  class=\"kn\">import</span> <span class=\"nn\">starlette.status</span> <span class=\"k\">as</span>
  <span class=\"nn\">status</span>\n<span class=\"kn\">from</span> <span class=\"nn\">fastapi</span>
  <span class=\"kn\">import</span> <span class=\"n\">APIRouter</span><span class=\"p\">,</span>
  <span class=\"n\">Depends</span><span class=\"p\">,</span> <span class=\"n\">Form</span><span
  class=\"p\">,</span> <span class=\"n\">Request</span>\n<span class=\"kn\">from</span>
  <span class=\"nn\">fastapi.encoders</span> <span class=\"kn\">import</span> <span
  class=\"n\">jsonable_encoder</span>\n<span class=\"kn\">from</span> <span class=\"nn\">fastapi.responses</span>
  <span class=\"kn\">import</span> <span class=\"n\">HTMLResponse</span><span class=\"p\">,</span>
  <span class=\"n\">RedirectResponse</span>\n<span class=\"kn\">from</span> <span
  class=\"nn\">fastapi.templating</span> <span class=\"kn\">import</span> <span class=\"n\">Jinja2Templates</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.orm</span> <span class=\"kn\">import</span>
  <span class=\"n\">Session</span>\n\n<span class=\"kn\">from</span> <span class=\"nn\">app.session.session</span>
  <span class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
  class=\"n\">router</span> <span class=\"o\">=</span> <span class=\"n\">APIRouter</span><span
  class=\"p\">()</span>\n<span class=\"n\">templates</span> <span class=\"o\">=</span>
  <span class=\"n\">Jinja2Templates</span><span class=\"p\">(</span><span class=\"n\">directory</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;templates/&quot;</span><span class=\"p\">)</span>\n\n<span
  class=\"nd\">@router</span><span class=\"o\">.</span><span class=\"n\">post</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/my_route/do_something_with_form&quot;</span><span
  class=\"p\">,</span> <span class=\"n\">response_class</span><span class=\"o\">=</span><span
  class=\"n\">HTMLResponse</span><span class=\"p\">)</span>\n<span class=\"k\">async</span>
  <span class=\"k\">def</span> <span class=\"nf\">delete_rows</span><span class=\"p\">(</span>\n
  \   <span class=\"n\">request</span><span class=\"p\">:</span> <span class=\"n\">Request</span><span
  class=\"p\">,</span>\n    <span class=\"n\">db</span><span class=\"p\">:</span>
  <span class=\"n\">Session</span> <span class=\"o\">=</span> <span class=\"n\">Depends</span><span
  class=\"p\">(</span><span class=\"n\">create_get_session</span><span class=\"p\">),</span>\n<span
  class=\"p\">):</span>\n    <span class=\"n\">form_data</span> <span class=\"o\">=</span>
  <span class=\"k\">await</span> <span class=\"n\">request</span><span class=\"o\">.</span><span
  class=\"n\">get_form</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span>
  <span class=\"o\">=</span> <span class=\"n\">jsonable_encoder</span><span class=\"p\">(</span><span
  class=\"n\">form_data</span><span class=\"p\">)</span>\n    <span class=\"c1\">#
  data = {&quot;item_1&quot;: 1, &quot;item_2&quot;: 2, ... &quot;item_N&quot;: N}</span>\n
  \   <span class=\"k\">return</span> <span class=\"n\">RedirectResponse</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span class=\"p\">,</span>
  <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"n\">status</span><span
  class=\"o\">.</span><span class=\"n\">HTTP_302_FOUND</span><span class=\"p\">)</span>\n</code></pre></div>\n<p>We
  <code>await request.get_form()</code> and after encoding the data we get a dictionary
  with key/value pairs of the name/value from the form!</p>\n<p>This took me quite
  a long time to figure out in part because most of the Google-able resources are
  still on Flask...</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/ffmpeg-10-bit-videos-to-8-bit'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>FFMPEG
  10-bit videos to 8-bit</p>\n        </div>\n    </a>\n\n    <a class='next' href='/abstract-base-class'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Abstract-Base-Class</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
jinja: false
long_description: I just started using FastAPI for a home project and needed to pass
  back a The jinja templating for rendering HTML based on something like a python
  iterable is nice and easy data is the result of a database query, and item is each
  row, so the dot nota
now: 2024-08-01 13:40:17.987425
path: pages/til/fastapi-jinja-forms.md
published: false
slug: fastapi-jinja-forms
super_description: 'I just started using FastAPI for a home project and needed to
  pass back a The jinja templating for rendering HTML based on something like a python
  iterable is nice and easy data is the result of a database query, and item is each
  row, so the dot notation is the value of each column basically in that row This
  form generates a row with a checkbox for every  The way to pass back all those values
  is pretty straight forward (after hours of messing around that is We  This took
  me quite a long time to '
tags:
- python
- tech
templateKey: til
title: Forms with FastAPI and Jinja
today: 2024-08-01
---

I just started using FastAPI for a home project and needed to pass back a
dynamic number of values from a form rendered with jinja...


# Dynamic Values 

The jinja templating for rendering HTML based on something like a python iterable is nice and easy

> data is the result of a database query, and item is each row, so the dot notation is the value of each column basically in that row

```jinja
<form method="post">
  

<button type="submit" class="submit btn btn-xl btn-outline-danger" >Remove</button>
</form>

```

This form generates a row with a checkbox for every `item` in `data` (in my
case each `item` is an existing row in my table). it?

The way to pass back all those values is pretty straight forward (after hours of messing around that is!)

```python
# I hate it when tutorials don't show ALL relevant pieces to the blurb
import starlette.status as status
from fastapi import APIRouter, Depends, Form, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from app.session.session import create_get_session

router = APIRouter()
templates = Jinja2Templates(directory="templates/")

@router.post("/my_route/do_something_with_form", response_class=HTMLResponse)
async def delete_rows(
    request: Request,
    db: Session = Depends(create_get_session),
):
    form_data = await request.get_form()
    data = jsonable_encoder(form_data)
    # data = {"item_1": 1, "item_2": 2, ... "item_N": N}
    return RedirectResponse("/", status_code=status.HTTP_302_FOUND)
```

We `await request.get_form()` and after encoding the data we get a dictionary with key/value pairs of the name/value from the form!

This took me quite a long time to figure out in part because most of the Google-able resources are still on Flask...
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
    
    <a class='prev' href='/ffmpeg-10-bit-videos-to-8-bit'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>FFMPEG 10-bit videos to 8-bit</p>
        </div>
    </a>
    
    <a class='next' href='/abstract-base-class'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Abstract-Base-Class</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>