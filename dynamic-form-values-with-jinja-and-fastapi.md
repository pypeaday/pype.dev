---
article_html: "<p>I'm currently working on a self-hostable wish list app using FastAPI
  so we can\nfinally drop Amazon forever. (The lists funcionality has been super handy
  for\nsharing holiday gift ideas with the famj!)</p>\n<h1 id=\"fastapi\">FastAPI</h1>\n<p>FastAPI
  is an amazing framework for quickly building APIs with Python. I will have a slightly
  longer post about my brief experience with it coming later...</p>\n<h1 id=\"jinja-forms-and-fastapi\">Jinja,
  Forms, and FastAPI</h1>\n<p>One of the last things I needed to figure out in my
  app was how to generate a\nform in a Jinja template with a dynamic number of inputs
  and then pass all the\ninputs to the backend to perform a database operation (my
  exact case was\nremoving rows from a table).</p>\n<h2 id=\"explicit-values\">Explicit
  Values</h2>\n<p>The way to pass back explicit variables is really easy...</p>\n<p>Our
  form would look like this (I'm using bootstrap CSS)</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"x\">&lt;form method=&quot;post&quot;&gt;</span>\n<span class=\"x\">    &lt;div
  class=&quot;form-check &quot;&gt;</span>\n<span class=\"x\">        &lt;input class=&quot;form-check-input&quot;
  \ name=&quot;item_1&quot; id=&quot;itemOne&quot; value=&quot;1&quot; type=&quot;checkbox&quot;&gt;</span>\n<span
  class=\"x\">        &lt;label class=&quot;form-check-label&quot; for=&quot;itemOne&quot;
  &gt; A label for this item &lt;/label&gt;</span>\n<span class=\"x\">    &lt;/div&gt;</span>\n<span
  class=\"x\">    &lt;div class=&quot;form-check &quot;&gt;</span>\n<span class=\"x\">
  \       &lt;input class=&quot;form-check-input&quot;  name=&quot;item_2&quot; id=&quot;itemTwo&quot;
  value=&quot;2&quot; type=&quot;checkbox&quot;&gt;</span>\n<span class=\"x\">        &lt;label
  class=&quot;form-check-label&quot; for=&quot;itemTwo&quot; &gt; A label for item
  2 &lt;/label&gt;</span>\n<span class=\"x\">    &lt;/div&gt;</span>\n\n<span class=\"x\">&lt;button
  type=&quot;submit&quot; class=&quot;submit btn btn-xl&quot; &gt;Submit&lt;/button&gt;</span>\n<span
  class=\"x\">&lt;/form&gt;</span>\n</code></pre></div>\n<p>So what is this? This
  form will have 2 rows with the lables you see in <code>&lt;label&gt;\n&lt;/label&gt;</code>
  and checkboxes that when checked would have the value <code>value</code> in each\n<code>&lt;input&gt;</code>
  line.</p>\n<p>So our backend might looks something like this...</p>\n<p><strong>I'm
  keeping all the imports and stuff here to show where they come from but I won't
  discuss it all here - that'll be in a future post</strong></p>\n<div class=\"highlight\"><pre><span></span><code><span
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
  class=\"p\">,</span>\n    <span class=\"n\">item_1</span><span class=\"p\">:</span>
  <span class=\"nb\">int</span> <span class=\"o\">=</span> <span class=\"n\">Form</span><span
  class=\"p\">(</span><span class=\"o\">...</span><span class=\"p\">),</span>\n    <span
  class=\"n\">item_2</span><span class=\"p\">:</span> <span class=\"nb\">int</span>
  <span class=\"o\">=</span> <span class=\"n\">Form</span><span class=\"p\">(</span><span
  class=\"o\">...</span><span class=\"p\">)</span>\n    <span class=\"n\">db</span><span
  class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
  <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
  class=\"p\">),</span>\n<span class=\"p\">):</span>\n    <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"n\">item_1</span><span class=\"p\">)</span>  <span
  class=\"c1\"># will just print 1 to the console where fastapi is running if the
  checkbox was checked</span>\n    <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"n\">item_2</span><span class=\"p\">)</span>  <span class=\"c1\"># will just
  print 1 to the console where fastapi is running if the checkbox was checked</span>\n
  \   <span class=\"k\">return</span> <span class=\"n\">RedirectResponse</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span class=\"p\">,</span>
  <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"n\">status</span><span
  class=\"o\">.</span><span class=\"n\">HTTP_302_FOUND</span><span class=\"p\">)</span>\n</code></pre></div>\n<h2
  id=\"dynamic-values\">Dynamic values</h2>\n<p>That's all pretty simple... pass back
  values by the name in the form...</p>\n<p>What about a form that's generated dynamically?
  This is my case since I display a row/checkbox for every row in my table so my form
  looks like this...</p>\n<blockquote>\n<p>data is the result of a database query,
  and item is each row, so the dot notation is the value of each column basically
  in that row</p>\n</blockquote>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"x\">&lt;form method=&quot;post&quot;&gt;</span>\n\n\n<span class=\"x\">&lt;button
  type=&quot;submit&quot; class=&quot;submit btn btn-xl btn-outline-danger&quot; &gt;Remove&lt;/button&gt;</span>\n<span
  class=\"x\">&lt;/form&gt;</span>\n</code></pre></div>\n<p>This form generates a
  row with a checkbox for every <code>item</code> in <code>data</code> (in my\ncase
  each <code>item</code> is an existing row in my table). Now I started scratching
  my\nhead on how to pass an unknown number of inputs to my backend of FastAPI wants\neach
  input explicitly defined and typed... I can't just pass the form back\nbecuase that's
  not a thing so what's the way to do it?</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"c1\"># same stuff as above, only showing post method here</span>\n<span
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
  still on Flask...</p>\n<p>I look forward to my wish list app maturing and I hope
  this helps someone working with FastAPI!</p>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/traefik-01'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Traefik-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/how-i-use-nextcloud-for-safe-central-storage'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>How I use Nextcloud for safe central storage</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
cover: /static/dynamic-form-values-with-jinja-and-fastapi.png
date: 2022-05-15
datetime: 2022-05-15 00:00:00+00:00
description: I FastAPI is an amazing framework for quickly building APIs with Python.
  I will have a slightly longer post about my brief experience with it coming later...
  On
edit_link: https://github.com/edit/main/pages/blog/dynamic-form-values-with-jinja-and-fastapi.md
html: "<p>I'm currently working on a self-hostable wish list app using FastAPI so
  we can\nfinally drop Amazon forever. (The lists funcionality has been super handy
  for\nsharing holiday gift ideas with the famj!)</p>\n<h1 id=\"fastapi\">FastAPI</h1>\n<p>FastAPI
  is an amazing framework for quickly building APIs with Python. I will have a slightly
  longer post about my brief experience with it coming later...</p>\n<h1 id=\"jinja-forms-and-fastapi\">Jinja,
  Forms, and FastAPI</h1>\n<p>One of the last things I needed to figure out in my
  app was how to generate a\nform in a Jinja template with a dynamic number of inputs
  and then pass all the\ninputs to the backend to perform a database operation (my
  exact case was\nremoving rows from a table).</p>\n<h2 id=\"explicit-values\">Explicit
  Values</h2>\n<p>The way to pass back explicit variables is really easy...</p>\n<p>Our
  form would look like this (I'm using bootstrap CSS)</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"x\">&lt;form method=&quot;post&quot;&gt;</span>\n<span class=\"x\">    &lt;div
  class=&quot;form-check &quot;&gt;</span>\n<span class=\"x\">        &lt;input class=&quot;form-check-input&quot;
  \ name=&quot;item_1&quot; id=&quot;itemOne&quot; value=&quot;1&quot; type=&quot;checkbox&quot;&gt;</span>\n<span
  class=\"x\">        &lt;label class=&quot;form-check-label&quot; for=&quot;itemOne&quot;
  &gt; A label for this item &lt;/label&gt;</span>\n<span class=\"x\">    &lt;/div&gt;</span>\n<span
  class=\"x\">    &lt;div class=&quot;form-check &quot;&gt;</span>\n<span class=\"x\">
  \       &lt;input class=&quot;form-check-input&quot;  name=&quot;item_2&quot; id=&quot;itemTwo&quot;
  value=&quot;2&quot; type=&quot;checkbox&quot;&gt;</span>\n<span class=\"x\">        &lt;label
  class=&quot;form-check-label&quot; for=&quot;itemTwo&quot; &gt; A label for item
  2 &lt;/label&gt;</span>\n<span class=\"x\">    &lt;/div&gt;</span>\n\n<span class=\"x\">&lt;button
  type=&quot;submit&quot; class=&quot;submit btn btn-xl&quot; &gt;Submit&lt;/button&gt;</span>\n<span
  class=\"x\">&lt;/form&gt;</span>\n</code></pre></div>\n<p>So what is this? This
  form will have 2 rows with the lables you see in <code>&lt;label&gt;\n&lt;/label&gt;</code>
  and checkboxes that when checked would have the value <code>value</code> in each\n<code>&lt;input&gt;</code>
  line.</p>\n<p>So our backend might looks something like this...</p>\n<p><strong>I'm
  keeping all the imports and stuff here to show where they come from but I won't
  discuss it all here - that'll be in a future post</strong></p>\n<div class=\"highlight\"><pre><span></span><code><span
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
  class=\"p\">,</span>\n    <span class=\"n\">item_1</span><span class=\"p\">:</span>
  <span class=\"nb\">int</span> <span class=\"o\">=</span> <span class=\"n\">Form</span><span
  class=\"p\">(</span><span class=\"o\">...</span><span class=\"p\">),</span>\n    <span
  class=\"n\">item_2</span><span class=\"p\">:</span> <span class=\"nb\">int</span>
  <span class=\"o\">=</span> <span class=\"n\">Form</span><span class=\"p\">(</span><span
  class=\"o\">...</span><span class=\"p\">)</span>\n    <span class=\"n\">db</span><span
  class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
  <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
  class=\"p\">),</span>\n<span class=\"p\">):</span>\n    <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"n\">item_1</span><span class=\"p\">)</span>  <span
  class=\"c1\"># will just print 1 to the console where fastapi is running if the
  checkbox was checked</span>\n    <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"n\">item_2</span><span class=\"p\">)</span>  <span class=\"c1\"># will just
  print 1 to the console where fastapi is running if the checkbox was checked</span>\n
  \   <span class=\"k\">return</span> <span class=\"n\">RedirectResponse</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span class=\"p\">,</span>
  <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"n\">status</span><span
  class=\"o\">.</span><span class=\"n\">HTTP_302_FOUND</span><span class=\"p\">)</span>\n</code></pre></div>\n<h2
  id=\"dynamic-values\">Dynamic values</h2>\n<p>That's all pretty simple... pass back
  values by the name in the form...</p>\n<p>What about a form that's generated dynamically?
  This is my case since I display a row/checkbox for every row in my table so my form
  looks like this...</p>\n<blockquote>\n<p>data is the result of a database query,
  and item is each row, so the dot notation is the value of each column basically
  in that row</p>\n</blockquote>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"x\">&lt;form method=&quot;post&quot;&gt;</span>\n\n\n<span class=\"x\">&lt;button
  type=&quot;submit&quot; class=&quot;submit btn btn-xl btn-outline-danger&quot; &gt;Remove&lt;/button&gt;</span>\n<span
  class=\"x\">&lt;/form&gt;</span>\n</code></pre></div>\n<p>This form generates a
  row with a checkbox for every <code>item</code> in <code>data</code> (in my\ncase
  each <code>item</code> is an existing row in my table). Now I started scratching
  my\nhead on how to pass an unknown number of inputs to my backend of FastAPI wants\neach
  input explicitly defined and typed... I can't just pass the form back\nbecuase that's
  not a thing so what's the way to do it?</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"c1\"># same stuff as above, only showing post method here</span>\n<span
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
  still on Flask...</p>\n<p>I look forward to my wish list app maturing and I hope
  this helps someone working with FastAPI!</p>\n<div class='prevnext'>\n\n    <style
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
  \   </style>\n\n    <a class='prev' href='/traefik-01'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Traefik-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/how-i-use-nextcloud-for-safe-central-storage'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>How I use Nextcloud for safe central storage</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
jinja: false
long_description: I FastAPI is an amazing framework for quickly building APIs with
  Python. I will have a slightly longer post about my brief experience with it coming
  later... One of the last things I needed to figure out in my app was how to generate
  a The way to pas
now: 2024-08-01 13:40:17.987279
path: pages/blog/dynamic-form-values-with-jinja-and-fastapi.md
published: false
slug: dynamic-form-values-with-jinja-and-fastapi
super_description: I FastAPI is an amazing framework for quickly building APIs with
  Python. I will have a slightly longer post about my brief experience with it coming
  later... One of the last things I needed to figure out in my app was how to generate
  a The way to pass back explicit variables is really easy... Our form would look
  like this (I So what is this? This form will have 2 rows with the lables you see
  in  So our backend might looks something like this... That What about a form that
  data is the result of a
tags:
- python
- tech
templateKey: blog-post
title: Dynamic-Form-Values-With-Jinja-And-Fastapi
today: 2024-08-01
---

I'm currently working on a self-hostable wish list app using FastAPI so we can
finally drop Amazon forever. (The lists funcionality has been super handy for
sharing holiday gift ideas with the famj!)

# FastAPI

FastAPI is an amazing framework for quickly building APIs with Python. I will have a slightly longer post about my brief experience with it coming later...

# Jinja, Forms, and FastAPI

One of the last things I needed to figure out in my app was how to generate a
form in a Jinja template with a dynamic number of inputs and then pass all the
inputs to the backend to perform a database operation (my exact case was
removing rows from a table).

## Explicit Values

The way to pass back explicit variables is really easy...

Our form would look like this (I'm using bootstrap CSS)

```jinja
<form method="post">
    <div class="form-check ">
        <input class="form-check-input"  name="item_1" id="itemOne" value="1" type="checkbox">
        <label class="form-check-label" for="itemOne" > A label for this item </label>
    </div>
    <div class="form-check ">
        <input class="form-check-input"  name="item_2" id="itemTwo" value="2" type="checkbox">
        <label class="form-check-label" for="itemTwo" > A label for item 2 </label>
    </div>

<button type="submit" class="submit btn btn-xl" >Submit</button>
</form>
```

So what is this? This form will have 2 rows with the lables you see in `<label>
</label>` and checkboxes that when checked would have the value `value` in each
`<input>` line.

So our backend might looks something like this...

__I'm keeping all the imports and stuff here to show where they come from but I won't discuss it all here - that'll be in a future post__

```python
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
    item_1: int = Form(...),
    item_2: int = Form(...)
    db: Session = Depends(create_get_session),
):
    print(item_1)  # will just print 1 to the console where fastapi is running if the checkbox was checked
    print(item_2)  # will just print 1 to the console where fastapi is running if the checkbox was checked
    return RedirectResponse("/", status_code=status.HTTP_302_FOUND)
```


## Dynamic values

That's all pretty simple... pass back values by the name in the form...

What about a form that's generated dynamically? This is my case since I display a row/checkbox for every row in my table so my form looks like this...

> data is the result of a database query, and item is each row, so the dot notation is the value of each column basically in that row

```jinja
<form method="post">
  

<button type="submit" class="submit btn btn-xl btn-outline-danger" >Remove</button>
</form>

```

This form generates a row with a checkbox for every `item` in `data` (in my
case each `item` is an existing row in my table). Now I started scratching my
head on how to pass an unknown number of inputs to my backend of FastAPI wants
each input explicitly defined and typed... I can't just pass the form back
becuase that's not a thing so what's the way to do it?


```python
# same stuff as above, only showing post method here
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

I look forward to my wish list app maturing and I hope this helps someone working with FastAPI!
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
    
    <a class='prev' href='/traefik-01'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Traefik-01</p>
        </div>
    </a>
    
    <a class='next' href='/how-i-use-nextcloud-for-safe-central-storage'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>How I use Nextcloud for safe central storage</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>