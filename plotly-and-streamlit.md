---
article_html: "<h2 id=\"streamlit\">Streamlit</h2>\n<p>I use <code>streamlit</code>
  for any EDA I ever have to do at work.\nIt's super easy to spin up a small dashboard
  to filter and view dataframes in, live, without the fallbacks of Jupyter notebooks
  (kernels dying, memory bloat, a billion \"Untitled N.ipynb\" files, etc.)</p>\n<p>At
  the highest level, streamlit lets you write a python script and call <code>streamlit
  run my_script.py</code> which will open up a web server with your streamlit stuff.
  \nThe dashboard refreshes whenever you change the script so you can add capabilities
  in real time, super fast!</p>\n<p>I'll show an example of using <code>streamlit</code>
  and <code>plotly</code> to make a live dashboard to monitor system memory usage
  with <code>psutil</code>.\nThis is apart of my posts on <a href=\"/psutil\">psutil</a>
  and <a href=\"/deques\">deques</a>...</p>\n<p><strong>example at the bottom!</strong></p>\n<h2
  id=\"plotly\">Plotly</h2>\n<p>I'm not going to make a big time intro to plotly here
  - there's a billion resources on the interwebs and the docs are really good.</p>\n<p>Suffice
  it to say it's my goto plotting library for basically any and all needs.\nI'm currently
  exploring it for live data streaming as I'm not sure it's the best solution but
  it's the one I'm familiar with.</p>\n<p>For my <a href=\"https://github.com/nicpayne713/not-netdata\">
  not-netdata </a> project of visualizing live system resource data I  first need
  a way of appending data and popping data in and out of an array at every data refresh
  cycle to keep my plots looking nice with a fixed time window.</p>\n<p>See <a href=\"/deques\">deques</a>
  for a short intro to the datatype I'm using.</p>\n<p>First step is to initialize
  some objects to store data in.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">data</span><span class=\"p\">:</span> <span class=\"n\">Dict</span><span
  class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">,</span> <span
  class=\"n\">MutableSequence</span><span class=\"p\">[</span><span class=\"n\">Optional</span><span
  class=\"p\">[</span><span class=\"nb\">float</span><span class=\"p\">]]]</span>
  <span class=\"o\">=</span> <span class=\"n\">defaultdict</span><span class=\"p\">(</span><span
  class=\"n\">deque</span><span class=\"p\">)</span>\n\n<span class=\"n\">arr_size</span>
  <span class=\"o\">=</span> <span class=\"mi\">10</span>\n\n<span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span>
  <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
  class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span> <span
  class=\"n\">arr_size</span><span class=\"p\">)</span>\n<span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span>
  <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
  class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span> <span
  class=\"n\">arr_size</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><code>data</code>
  is a dictionary that I'll store deques in. The dictionary keys will be the type
  of data, in this case <code>time</code> and <code>used_memory</code>.</p>\n<p>I
  fix an array size, <code>arr_size</code> to just 10 for now</p>\n<p>Then I initialize
  the values for <code>time</code> and <code>used_memory</code> as <code>deque</code>s
  of length <code>arr_size</code>.\nSimple enough!</p>\n<p>Next is to fill those deques
  with some relevant data.\nI'm not actually sure if this is the best way to do this
  but here's what I have done so far:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">def</span> <span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
  \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
  <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
  class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
  class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
  class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
  class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
  class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
  \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
  class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
  class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
  class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
  class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
  class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
  class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
  class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n</code></pre></div>\n<p>If
  you ignore my usage of <code>global</code> you'll see that I can just <code>append</code>
  to each deque like it was a list.</p>\n<p>But then to keep the relevant data in
  the deque, and to keep the length fixed, I simply <code>popleft</code> to remove
  the oldest datapoint!</p>\n<h2 id=\"a-trivial-dashboard\">A trivial dashboard</h2>\n<p>Now
  I'll prove just how easy it is to get a live data dashboard up and running with
  just a few lines of code thanks to streamlit!</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">if</span> <span class=\"vm\">__name__</span> <span class=\"o\">==</span>
  <span class=\"s2\">&quot;__main__&quot;</span><span class=\"p\">:</span>\n    <span
  class=\"n\">st</span><span class=\"o\">.</span><span class=\"n\">header</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;memory chart&quot;</span><span class=\"p\">)</span>\n
  \   <span class=\"n\">stats</span> <span class=\"o\">=</span> <span class=\"n\">st</span><span
  class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">()</span>\n
  \   <span class=\"k\">while</span> <span class=\"kc\">True</span><span class=\"p\">:</span>\n
  \       <span class=\"n\">refresh_data</span><span class=\"p\">()</span>\n        <span
  class=\"n\">stats</span><span class=\"o\">.</span><span class=\"n\">plotly_chart</span><span
  class=\"p\">(</span>\n            <span class=\"n\">px</span><span class=\"o\">.</span><span
  class=\"n\">line</span><span class=\"p\">(</span>\n                <span class=\"n\">data</span><span
  class=\"p\">,</span>\n                <span class=\"n\">x</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;time&quot;</span><span class=\"p\">,</span>\n                <span
  class=\"n\">y</span><span class=\"o\">=</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">,</span>\n                <span class=\"n\">title</span><span class=\"o\">=</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span
  class=\"p\">,</span>\n               <span class=\"p\">)</span>\n            <span
  class=\"p\">)</span>\n        <span class=\"n\">time</span><span class=\"o\">.</span><span
  class=\"n\">sleep</span><span class=\"p\">(</span><span class=\"mf\">0.5</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p><code>st</code> is the streamlit alias
  (imports shows at the bottom full example).\n<code>st.header</code> puts a nice
  header on the page.\n<code>st.empty</code> initializes an empty <code>streamlit
  container</code> in which we'll put a <code>plotly.express</code> figure.</p>\n<p>At
  each iteration we'll <code>refresh_data()</code> which <code>appends</code> and
  <code>pops</code> data in the deques in the <code>data</code> dictionary.\nThen
  we update the <code>stats</code> container with a plotly graph and the refresh happens
  seamlessly.</p>\n<p>All in all the script looks like this:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">collections</span> <span class=\"kn\">import</span>
  <span class=\"n\">defaultdict</span><span class=\"p\">,</span> <span class=\"n\">deque</span>\n<span
  class=\"kn\">import</span> <span class=\"nn\">time</span>\n<span class=\"kn\">from</span>
  <span class=\"nn\">typing</span> <span class=\"kn\">import</span> <span class=\"n\">Dict</span><span
  class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span class=\"p\">,</span>
  <span class=\"n\">Optional</span>\n\n<span class=\"kn\">from</span> <span class=\"nn\">plotly</span>
  <span class=\"kn\">import</span> <span class=\"n\">express</span> <span class=\"k\">as</span>
  <span class=\"n\">px</span>\n<span class=\"kn\">import</span> <span class=\"nn\">psutil</span>\n<span
  class=\"kn\">import</span> <span class=\"nn\">streamlit</span> <span class=\"k\">as</span>
  <span class=\"nn\">st</span>\n\n<span class=\"n\">data</span><span class=\"p\">:</span>
  <span class=\"n\">Dict</span><span class=\"p\">[</span><span class=\"nb\">str</span><span
  class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span class=\"p\">[</span><span
  class=\"n\">Optional</span><span class=\"p\">[</span><span class=\"nb\">float</span><span
  class=\"p\">]]]</span> <span class=\"o\">=</span> <span class=\"n\">defaultdict</span><span
  class=\"p\">(</span><span class=\"n\">deque</span><span class=\"p\">)</span>\n\n<span
  class=\"n\">arr_size</span> <span class=\"o\">=</span> <span class=\"mi\">10</span>\n\n<span
  class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"kc\">None</span><span class=\"p\">]</span> <span
  class=\"o\">*</span> <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n<span
  class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"kc\">None</span><span class=\"p\">]</span> <span
  class=\"o\">*</span> <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n\n\n<span
  class=\"k\">def</span> <span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
  \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
  <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
  class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
  class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
  class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
  class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
  class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
  \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
  class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
  class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
  class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
  class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
  class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
  class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
  class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n\n\n<span
  class=\"k\">def</span> <span class=\"nf\">memory_chart</span><span class=\"p\">():</span>\n
  \   <span class=\"n\">fig</span> <span class=\"o\">=</span> <span class=\"n\">px</span><span
  class=\"o\">.</span><span class=\"n\">line</span><span class=\"p\">(</span>\n        <span
  class=\"n\">data</span><span class=\"p\">,</span>\n        <span class=\"n\">x</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">,</span>\n
  \       <span class=\"n\">y</span><span class=\"o\">=</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">,</span>\n        <span class=\"n\">title</span><span class=\"o\">=</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span
  class=\"p\">,</span>\n    <span class=\"p\">)</span>\n    <span class=\"k\">return</span>
  <span class=\"n\">fig</span>\n\n\n<span class=\"k\">if</span> <span class=\"vm\">__name__</span>
  <span class=\"o\">==</span> <span class=\"s2\">&quot;__main__&quot;</span><span
  class=\"p\">:</span>\n    <span class=\"n\">st</span><span class=\"o\">.</span><span
  class=\"n\">header</span><span class=\"p\">(</span><span class=\"s2\">&quot;memory
  chart&quot;</span><span class=\"p\">)</span>\n    <span class=\"n\">stats</span>
  <span class=\"o\">=</span> <span class=\"n\">st</span><span class=\"o\">.</span><span
  class=\"n\">empty</span><span class=\"p\">()</span>\n    <span class=\"k\">while</span>
  <span class=\"kc\">True</span><span class=\"p\">:</span>\n        <span class=\"n\">refresh_data</span><span
  class=\"p\">()</span>\n        <span class=\"n\">stats</span><span class=\"o\">.</span><span
  class=\"n\">plotly_chart</span><span class=\"p\">(</span><span class=\"n\">memory_chart</span><span
  class=\"p\">())</span>\n        <span class=\"n\">time</span><span class=\"o\">.</span><span
  class=\"n\">sleep</span><span class=\"p\">(</span><span class=\"mf\">0.5</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>You can save this as <code>my_dash.py</code>
  and run with <code>streamlit run my_dash.py</code> and should see something like
  the following!</p>\n<p><img alt=\"Alt Text\" src=\"/images/plotly-streamlit.gif\"
  title=\"plotly-streamlit-gif\" /></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/vim-spell-check'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Vim-Spell-Check</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/deques'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Deques</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/plotly-and-streamlit.png
date: 2022-03-31
datetime: 2022-03-31 00:00:00+00:00
description: I use  At the highest level, streamlit lets you write a python script
  and call  I I Suffice it to say it For my  See  First step is to initialize some
  objects t
edit_link: https://github.com/edit/main/pages/blog/plotly-and-streamlit.md
html: "<h2 id=\"streamlit\">Streamlit</h2>\n<p>I use <code>streamlit</code> for any
  EDA I ever have to do at work.\nIt's super easy to spin up a small dashboard to
  filter and view dataframes in, live, without the fallbacks of Jupyter notebooks
  (kernels dying, memory bloat, a billion \"Untitled N.ipynb\" files, etc.)</p>\n<p>At
  the highest level, streamlit lets you write a python script and call <code>streamlit
  run my_script.py</code> which will open up a web server with your streamlit stuff.
  \nThe dashboard refreshes whenever you change the script so you can add capabilities
  in real time, super fast!</p>\n<p>I'll show an example of using <code>streamlit</code>
  and <code>plotly</code> to make a live dashboard to monitor system memory usage
  with <code>psutil</code>.\nThis is apart of my posts on <a href=\"/psutil\">psutil</a>
  and <a href=\"/deques\">deques</a>...</p>\n<p><strong>example at the bottom!</strong></p>\n<h2
  id=\"plotly\">Plotly</h2>\n<p>I'm not going to make a big time intro to plotly here
  - there's a billion resources on the interwebs and the docs are really good.</p>\n<p>Suffice
  it to say it's my goto plotting library for basically any and all needs.\nI'm currently
  exploring it for live data streaming as I'm not sure it's the best solution but
  it's the one I'm familiar with.</p>\n<p>For my <a href=\"https://github.com/nicpayne713/not-netdata\">
  not-netdata </a> project of visualizing live system resource data I  first need
  a way of appending data and popping data in and out of an array at every data refresh
  cycle to keep my plots looking nice with a fixed time window.</p>\n<p>See <a href=\"/deques\">deques</a>
  for a short intro to the datatype I'm using.</p>\n<p>First step is to initialize
  some objects to store data in.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">data</span><span class=\"p\">:</span> <span class=\"n\">Dict</span><span
  class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">,</span> <span
  class=\"n\">MutableSequence</span><span class=\"p\">[</span><span class=\"n\">Optional</span><span
  class=\"p\">[</span><span class=\"nb\">float</span><span class=\"p\">]]]</span>
  <span class=\"o\">=</span> <span class=\"n\">defaultdict</span><span class=\"p\">(</span><span
  class=\"n\">deque</span><span class=\"p\">)</span>\n\n<span class=\"n\">arr_size</span>
  <span class=\"o\">=</span> <span class=\"mi\">10</span>\n\n<span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span>
  <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
  class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span> <span
  class=\"n\">arr_size</span><span class=\"p\">)</span>\n<span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span>
  <span class=\"o\">=</span> <span class=\"n\">deque</span><span class=\"p\">([</span><span
  class=\"kc\">None</span><span class=\"p\">]</span> <span class=\"o\">*</span> <span
  class=\"n\">arr_size</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><code>data</code>
  is a dictionary that I'll store deques in. The dictionary keys will be the type
  of data, in this case <code>time</code> and <code>used_memory</code>.</p>\n<p>I
  fix an array size, <code>arr_size</code> to just 10 for now</p>\n<p>Then I initialize
  the values for <code>time</code> and <code>used_memory</code> as <code>deque</code>s
  of length <code>arr_size</code>.\nSimple enough!</p>\n<p>Next is to fill those deques
  with some relevant data.\nI'm not actually sure if this is the best way to do this
  but here's what I have done so far:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">def</span> <span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
  \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
  <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
  class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
  class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
  class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
  class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
  class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
  \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
  class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
  class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
  class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
  class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
  class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
  class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
  class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n</code></pre></div>\n<p>If
  you ignore my usage of <code>global</code> you'll see that I can just <code>append</code>
  to each deque like it was a list.</p>\n<p>But then to keep the relevant data in
  the deque, and to keep the length fixed, I simply <code>popleft</code> to remove
  the oldest datapoint!</p>\n<h2 id=\"a-trivial-dashboard\">A trivial dashboard</h2>\n<p>Now
  I'll prove just how easy it is to get a live data dashboard up and running with
  just a few lines of code thanks to streamlit!</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">if</span> <span class=\"vm\">__name__</span> <span class=\"o\">==</span>
  <span class=\"s2\">&quot;__main__&quot;</span><span class=\"p\">:</span>\n    <span
  class=\"n\">st</span><span class=\"o\">.</span><span class=\"n\">header</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;memory chart&quot;</span><span class=\"p\">)</span>\n
  \   <span class=\"n\">stats</span> <span class=\"o\">=</span> <span class=\"n\">st</span><span
  class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">()</span>\n
  \   <span class=\"k\">while</span> <span class=\"kc\">True</span><span class=\"p\">:</span>\n
  \       <span class=\"n\">refresh_data</span><span class=\"p\">()</span>\n        <span
  class=\"n\">stats</span><span class=\"o\">.</span><span class=\"n\">plotly_chart</span><span
  class=\"p\">(</span>\n            <span class=\"n\">px</span><span class=\"o\">.</span><span
  class=\"n\">line</span><span class=\"p\">(</span>\n                <span class=\"n\">data</span><span
  class=\"p\">,</span>\n                <span class=\"n\">x</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;time&quot;</span><span class=\"p\">,</span>\n                <span
  class=\"n\">y</span><span class=\"o\">=</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">,</span>\n                <span class=\"n\">title</span><span class=\"o\">=</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span
  class=\"p\">,</span>\n               <span class=\"p\">)</span>\n            <span
  class=\"p\">)</span>\n        <span class=\"n\">time</span><span class=\"o\">.</span><span
  class=\"n\">sleep</span><span class=\"p\">(</span><span class=\"mf\">0.5</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p><code>st</code> is the streamlit alias
  (imports shows at the bottom full example).\n<code>st.header</code> puts a nice
  header on the page.\n<code>st.empty</code> initializes an empty <code>streamlit
  container</code> in which we'll put a <code>plotly.express</code> figure.</p>\n<p>At
  each iteration we'll <code>refresh_data()</code> which <code>appends</code> and
  <code>pops</code> data in the deques in the <code>data</code> dictionary.\nThen
  we update the <code>stats</code> container with a plotly graph and the refresh happens
  seamlessly.</p>\n<p>All in all the script looks like this:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">collections</span> <span class=\"kn\">import</span>
  <span class=\"n\">defaultdict</span><span class=\"p\">,</span> <span class=\"n\">deque</span>\n<span
  class=\"kn\">import</span> <span class=\"nn\">time</span>\n<span class=\"kn\">from</span>
  <span class=\"nn\">typing</span> <span class=\"kn\">import</span> <span class=\"n\">Dict</span><span
  class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span class=\"p\">,</span>
  <span class=\"n\">Optional</span>\n\n<span class=\"kn\">from</span> <span class=\"nn\">plotly</span>
  <span class=\"kn\">import</span> <span class=\"n\">express</span> <span class=\"k\">as</span>
  <span class=\"n\">px</span>\n<span class=\"kn\">import</span> <span class=\"nn\">psutil</span>\n<span
  class=\"kn\">import</span> <span class=\"nn\">streamlit</span> <span class=\"k\">as</span>
  <span class=\"nn\">st</span>\n\n<span class=\"n\">data</span><span class=\"p\">:</span>
  <span class=\"n\">Dict</span><span class=\"p\">[</span><span class=\"nb\">str</span><span
  class=\"p\">,</span> <span class=\"n\">MutableSequence</span><span class=\"p\">[</span><span
  class=\"n\">Optional</span><span class=\"p\">[</span><span class=\"nb\">float</span><span
  class=\"p\">]]]</span> <span class=\"o\">=</span> <span class=\"n\">defaultdict</span><span
  class=\"p\">(</span><span class=\"n\">deque</span><span class=\"p\">)</span>\n\n<span
  class=\"n\">arr_size</span> <span class=\"o\">=</span> <span class=\"mi\">10</span>\n\n<span
  class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"kc\">None</span><span class=\"p\">]</span> <span
  class=\"o\">*</span> <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n<span
  class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">deque</span><span
  class=\"p\">([</span><span class=\"kc\">None</span><span class=\"p\">]</span> <span
  class=\"o\">*</span> <span class=\"n\">arr_size</span><span class=\"p\">)</span>\n\n\n<span
  class=\"k\">def</span> <span class=\"nf\">refresh_data</span><span class=\"p\">():</span>\n
  \   <span class=\"k\">global</span> <span class=\"n\">data</span>\n    <span class=\"n\">memory</span>
  <span class=\"o\">=</span> <span class=\"n\">psutil</span><span class=\"o\">.</span><span
  class=\"n\">virtual_memory</span><span class=\"p\">()</span>\n\n    <span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span
  class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
  class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">strftime</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span
  class=\"s2\"> %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
  class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">()))</span>\n
  \   <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">]</span><span class=\"o\">.</span><span class=\"n\">append</span><span
  class=\"p\">(</span><span class=\"n\">memory</span><span class=\"o\">.</span><span
  class=\"n\">used</span> <span class=\"o\">//</span> <span class=\"p\">(</span><span
  class=\"mi\">1024</span><span class=\"o\">**</span><span class=\"mi\">3</span><span
  class=\"p\">))</span>\n\n    <span class=\"n\">data</span><span class=\"p\">[</span><span
  class=\"s2\">&quot;time&quot;</span><span class=\"p\">]</span><span class=\"o\">.</span><span
  class=\"n\">popleft</span><span class=\"p\">()</span>\n    <span class=\"n\">data</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;used_memory&quot;</span><span class=\"p\">]</span><span
  class=\"o\">.</span><span class=\"n\">popleft</span><span class=\"p\">()</span>\n\n\n<span
  class=\"k\">def</span> <span class=\"nf\">memory_chart</span><span class=\"p\">():</span>\n
  \   <span class=\"n\">fig</span> <span class=\"o\">=</span> <span class=\"n\">px</span><span
  class=\"o\">.</span><span class=\"n\">line</span><span class=\"p\">(</span>\n        <span
  class=\"n\">data</span><span class=\"p\">,</span>\n        <span class=\"n\">x</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;time&quot;</span><span class=\"p\">,</span>\n
  \       <span class=\"n\">y</span><span class=\"o\">=</span><span class=\"s2\">&quot;used_memory&quot;</span><span
  class=\"p\">,</span>\n        <span class=\"n\">title</span><span class=\"o\">=</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Memory usage stored in a deque!&quot;</span><span
  class=\"p\">,</span>\n    <span class=\"p\">)</span>\n    <span class=\"k\">return</span>
  <span class=\"n\">fig</span>\n\n\n<span class=\"k\">if</span> <span class=\"vm\">__name__</span>
  <span class=\"o\">==</span> <span class=\"s2\">&quot;__main__&quot;</span><span
  class=\"p\">:</span>\n    <span class=\"n\">st</span><span class=\"o\">.</span><span
  class=\"n\">header</span><span class=\"p\">(</span><span class=\"s2\">&quot;memory
  chart&quot;</span><span class=\"p\">)</span>\n    <span class=\"n\">stats</span>
  <span class=\"o\">=</span> <span class=\"n\">st</span><span class=\"o\">.</span><span
  class=\"n\">empty</span><span class=\"p\">()</span>\n    <span class=\"k\">while</span>
  <span class=\"kc\">True</span><span class=\"p\">:</span>\n        <span class=\"n\">refresh_data</span><span
  class=\"p\">()</span>\n        <span class=\"n\">stats</span><span class=\"o\">.</span><span
  class=\"n\">plotly_chart</span><span class=\"p\">(</span><span class=\"n\">memory_chart</span><span
  class=\"p\">())</span>\n        <span class=\"n\">time</span><span class=\"o\">.</span><span
  class=\"n\">sleep</span><span class=\"p\">(</span><span class=\"mf\">0.5</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>You can save this as <code>my_dash.py</code>
  and run with <code>streamlit run my_dash.py</code> and should see something like
  the following!</p>\n<p><img alt=\"Alt Text\" src=\"/images/plotly-streamlit.gif\"
  title=\"plotly-streamlit-gif\" /></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/vim-spell-check'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Vim-Spell-Check</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/deques'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Deques</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I use  At the highest level, streamlit lets you write a python script
  and call  I I Suffice it to say it For my  See  First step is to initialize some
  objects to store data in. data I fix an array size,  Then I initialize the values
  for  Next is to f
now: 2024-10-12 11:09:11.872377
path: pages/blog/plotly-and-streamlit.md
published: true
slug: plotly-and-streamlit
super_description: 'I use  At the highest level, streamlit lets you write a python
  script and call  I I Suffice it to say it For my  See  First step is to initialize
  some objects to store data in. data I fix an array size,  Then I initialize the
  values for  Next is to fill those deques with some relevant data. If you ignore
  my usage of  But then to keep the relevant data in the deque, and to keep the length
  fixed, I simply  Now I st At each iteration we All in all the script looks like
  this: You can save this as '
tags:
- python
- tech
templateKey: blog-post
title: Plotly-And-Streamlit
today: 2024-10-12
---

## Streamlit


I use `streamlit` for any EDA I ever have to do at work.
It's super easy to spin up a small dashboard to filter and view dataframes in, live, without the fallbacks of Jupyter notebooks (kernels dying, memory bloat, a billion "Untitled N.ipynb" files, etc.)

At the highest level, streamlit lets you write a python script and call `streamlit run my_script.py` which will open up a web server with your streamlit stuff. 
The dashboard refreshes whenever you change the script so you can add capabilities in real time, super fast!


I'll show an example of using `streamlit` and `plotly` to make a live dashboard to monitor system memory usage with `psutil`.
This is apart of my posts on [psutil](/psutil) and [deques](/deques)...

__example at the bottom!__



## Plotly

I'm not going to make a big time intro to plotly here - there's a billion resources on the interwebs and the docs are really good.

Suffice it to say it's my goto plotting library for basically any and all needs.
I'm currently exploring it for live data streaming as I'm not sure it's the best solution but it's the one I'm familiar with.

For my [ not-netdata ](https://github.com/nicpayne713/not-netdata) project of visualizing live system resource data I  first need a way of appending data and popping data in and out of an array at every data refresh cycle to keep my plots looking nice with a fixed time window.

See [deques](/deques) for a short intro to the datatype I'm using.

First step is to initialize some objects to store data in.

```python
data: Dict[str, MutableSequence[Optional[float]]] = defaultdict(deque)

arr_size = 10

data["time"] = deque([None] * arr_size)
data["used_memory"] = deque([None] * arr_size)
```

`data` is a dictionary that I'll store deques in. The dictionary keys will be the type of data, in this case `time` and `used_memory`.

I fix an array size, `arr_size` to just 10 for now

Then I initialize the values for `time` and `used_memory` as `deque`s of length `arr_size`.
Simple enough!

Next is to fill those deques with some relevant data.
I'm not actually sure if this is the best way to do this but here's what I have done so far:

```python
def refresh_data():
    global data
    memory = psutil.virtual_memory()

    data["time"].append(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    data["used_memory"].append(memory.used // (1024**3))

    data["time"].popleft()
    data["used_memory"].popleft()
```

If you ignore my usage of `global` you'll see that I can just `append` to each deque like it was a list.

But then to keep the relevant data in the deque, and to keep the length fixed, I simply `popleft` to remove the oldest datapoint!


## A trivial dashboard

Now I'll prove just how easy it is to get a live data dashboard up and running with just a few lines of code thanks to streamlit!

```python

if __name__ == "__main__":
    st.header("memory chart")
    stats = st.empty()
    while True:
        refresh_data()
        stats.plotly_chart(
            px.line(
                data,
                x="time",
                y="used_memory",
                title=f"Memory usage stored in a deque!",
               )
            )
        time.sleep(0.5)
```

`st` is the streamlit alias (imports shows at the bottom full example).
`st.header` puts a nice header on the page.
`st.empty` initializes an empty `streamlit container` in which we'll put a `plotly.express` figure.

At each iteration we'll `refresh_data()` which `appends` and `pops` data in the deques in the `data` dictionary.
Then we update the `stats` container with a plotly graph and the refresh happens seamlessly.

All in all the script looks like this:

```python

from collections import defaultdict, deque
import time
from typing import Dict, MutableSequence, Optional

from plotly import express as px
import psutil
import streamlit as st

data: Dict[str, MutableSequence[Optional[float]]] = defaultdict(deque)

arr_size = 10

data["time"] = deque([None] * arr_size)
data["used_memory"] = deque([None] * arr_size)


def refresh_data():
    global data
    memory = psutil.virtual_memory()

    data["time"].append(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    data["used_memory"].append(memory.used // (1024**3))

    data["time"].popleft()
    data["used_memory"].popleft()


def memory_chart():
    fig = px.line(
        data,
        x="time",
        y="used_memory",
        title=f"Memory usage stored in a deque!",
    )
    return fig


if __name__ == "__main__":
    st.header("memory chart")
    stats = st.empty()
    while True:
        refresh_data()
        stats.plotly_chart(memory_chart())
        time.sleep(0.5)
```

You can save this as `my_dash.py` and run with `streamlit run my_dash.py` and should see something like the following!

![Alt Text](/images/plotly-streamlit.gif "plotly-streamlit-gif")
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
    
    <a class='prev' href='/vim-spell-check'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Vim-Spell-Check</p>
        </div>
    </a>
    
    <a class='next' href='/deques'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Deques</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>