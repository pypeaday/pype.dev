---
article_html: "<h2 id=\"ipython-extension\">Ipython extension</h2>\n<p>Setting up
  the ipython extension is completely optional, and not\nrequired, but there for pure
  convenience.</p>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">##
  <a href=\"building-the-site\">Building the Site</a></p>\n<p>The first thing you
  will want to do is make sure that you can build your site and see it in the browser.
  \ Markata builds static websites using a python based cl</p>\n</div>\n<div class=\"admonition
  note\">\n<p class=\"admonition-title\">## <a href=\"jinja\">Jinja Variables</a></p>\n<p>Markata
  uses python The veresion of markata used to build the site. ({{  A python datetime
  object. ({{date.today()}}) All variables from your post frontmatter l</p>\n</div>\n<div
  class=\"admonition note\">\n<p class=\"admonition-title\">## <a href=\"ipython\">Loading
  Markata into Ipython</a></p>\n<p>Setting up the ipython extension is completely
  optional, and not You can add markata to your I don If you have the extension active
  an instance will automatical</p>\n</div>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">##
  <a href=\"your-own-style\">Your Own Style</a></p>\n</div>\n<p>You can add markata
  to your\n<code>~/.ipython/profile_default/ipython_config.py</code> as reccomended
  by\nipython with the snippet below.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">c</span><span class=\"o\">.</span><span class=\"n\">InteractiveShellApp</span><span
  class=\"o\">.</span><span class=\"n\">extensions</span><span class=\"o\">.</span><span
  class=\"n\">append</span><span class=\"p\">(</span><span class=\"s1\">&#39;markata&#39;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>I don't prefer this because I also
  have ipython installed in\nenvironments without markata installed, so I do the following
  in\nmy personal config so that it does not error when missing markata.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kn\">import</span> <span
  class=\"nn\">importlib</span>\n\n\n<span class=\"k\">def</span> <span class=\"nf\">activate_extension</span><span
  class=\"p\">(</span><span class=\"n\">extension</span><span class=\"p\">):</span>\n
  \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">mod</span>
  <span class=\"o\">=</span> <span class=\"n\">importlib</span><span class=\"o\">.</span><span
  class=\"n\">import_module</span><span class=\"p\">(</span><span class=\"n\">extension</span><span
  class=\"p\">)</span>\n        <span class=\"nb\">getattr</span><span class=\"p\">(</span><span
  class=\"n\">mod</span><span class=\"p\">,</span> <span class=\"s2\">&quot;load_ipython_extension&quot;</span><span
  class=\"p\">)</span>\n        <span class=\"n\">c</span><span class=\"o\">.</span><span
  class=\"n\">InteractiveShellApp</span><span class=\"o\">.</span><span class=\"n\">extensions</span><span
  class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
  class=\"n\">extension</span><span class=\"p\">)</span>\n    <span class=\"k\">except</span>
  <span class=\"ne\">ModuleNotFoundError</span><span class=\"p\">:</span>\n        <span
  class=\"s2\">&quot;extension is not installed&quot;</span>\n    <span class=\"k\">except</span>
  <span class=\"ne\">AttributeError</span><span class=\"p\">:</span>\n        <span
  class=\"s2\">&quot;extension does not have a &#39;load_ipython_extension&#39; function&quot;</span>\n\n\n<span
  class=\"n\">extensions</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
  class=\"s2\">&quot;markata&quot;</span><span class=\"p\">,</span> <span class=\"p\">]</span>\n<span
  class=\"k\">for</span> <span class=\"n\">extension</span> <span class=\"ow\">in</span>
  <span class=\"n\">extensions</span><span class=\"p\">:</span>\n    <span class=\"n\">activate_extension</span><span
  class=\"p\">(</span><span class=\"n\">extension</span><span class=\"p\">)</span>\n</code></pre></div>\n<h2
  id=\"loading-a-markata-instance\">Loading a markata instance</h2>\n<p>If you have
  the extension active an instance will automatically be created and\navailable as
  <code>m</code> as well as <code>markata</code>.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">m</span>\n<span class=\"c1\"># or</span>\n<span class=\"n\">markata</span>\n</code></pre></div>\n<p>If
  you opt out of setting up the extension or use something other than ipython\nyou
  can make an instance yourself.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">markata</span> <span class=\"kn\">import</span>
  <span class=\"n\">Markata</span>\n\n<span class=\"n\">m</span> <span class=\"o\">=</span>
  <span class=\"n\">Markata</span><span class=\"p\">()</span>\n</code></pre></div>\n<h2
  id=\"looking-through-articles\">Looking through articles</h2>\n<p>Once you have
  an instance of <code>markata</code> in memory you can look through your\narticles
  using the list of articles, or the map function.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"c1\"># get a list of frontmatter.Post objects</span>\n<span class=\"n\">m</span><span
  class=\"o\">.</span><span class=\"n\">articles</span>\n\n<span class=\"c1\"># leverage
  the map function to filter</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;post&#39;</span><span
  class=\"p\">,</span> <span class=\"nb\">filter</span><span class=\"o\">=</span><span
  class=\"s1\">&#39;&quot;python&quot; in tags&#39;</span><span class=\"p\">)</span>\n<span
  class=\"n\">m</span><span class=\"o\">.</span><span class=\"n\">map</span><span
  class=\"p\">(</span><span class=\"s1\">&#39;post&#39;</span><span class=\"p\">,</span>
  <span class=\"nb\">filter</span><span class=\"o\">=</span><span class=\"s1\">&#39;date&gt;today&#39;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<h2 id=\"map\">Map</h2>\n<p>The map function
  </p>\n<p><code>func</code>: What to return as the item in the list. This can ve
  a single attribute\nlike <code>title</code>, or <code>tags</code>, or the full post
  <code>post</code>.  It can also be any string of\npython like <code>'date&gt;today'</code>
  or something more complicated like\n<code>f'''\"{markata.config['url']}/\" + slug'''</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;post&#39;</span><span
  class=\"p\">)</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
  class=\"p\">)</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;slug&#39;</span><span
  class=\"p\">)</span>\n\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;&quot;python&quot;
  in tags&#39;</span><span class=\"p\">)</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
  class=\"s1\">&#39;&#39;&#39;&quot;</span><span class=\"si\">{</span><span class=\"n\">markata</span><span
  class=\"o\">.</span><span class=\"n\">config</span><span class=\"p\">[</span><span
  class=\"s1\">&#39;url&#39;</span><span class=\"p\">]</span><span class=\"si\">}</span><span
  class=\"s1\">/&quot; + slug&#39;&#39;&#39;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><code>filter</code>:
  Filter is also just a string of python similar to the <code>func</code>\nargument,
  but it filters based on the boolean value of the result.  You can do\nthings like
  look for published posts <code>published</code>, check for posts posted before\ntoday
  <code>date&lt;today</code>, or articles with certain tags <code>\"python\" in tags</code>.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"nb\">filter</span><span
  class=\"o\">=</span><span class=\"s1\">&#39;published&#39;</span><span class=\"p\">)</span>\n<span
  class=\"n\">m</span><span class=\"o\">.</span><span class=\"n\">map</span><span
  class=\"p\">(</span><span class=\"nb\">filter</span><span class=\"o\">=</span><span
  class=\"s1\">&#39;date&lt;today&#39;</span><span class=\"p\">)</span>\n<span class=\"n\">m</span><span
  class=\"o\">.</span><span class=\"n\">map</span><span class=\"p\">(</span><span
  class=\"nb\">filter</span><span class=\"o\">=</span><span class=\"s1\">&#39;&quot;python&quot;
  in tags&#39;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><code>sort</code>:
  Sort will try to sort your articles based on the value returned.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">m</span><span class=\"o\">.</span><span class=\"n\">map</span><span
  class=\"p\">(</span><span class=\"n\">sort</span><span class=\"o\">=</span><span
  class=\"s1\">&#39;title&#39;</span><span class=\"p\">)</span>\n<span class=\"n\">m</span><span
  class=\"o\">.</span><span class=\"n\">map</span><span class=\"p\">(</span><span
  class=\"n\">sort</span><span class=\"o\">=</span><span class=\"s1\">&#39;date&#39;</span><span
  class=\"p\">)</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"n\">sort</span><span
  class=\"o\">=</span><span class=\"s1\">&#39;order&#39;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><code>reverse</code>:
  Reverse the results returned by map with the <code>reverse</code> flag.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"n\">reverse</span><span
  class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">)</span>\n<span
  class=\"n\">m</span><span class=\"o\">.</span><span class=\"n\">map</span><span
  class=\"p\">(</span><span class=\"n\">reverse</span><span class=\"o\">=</span><span
  class=\"kc\">True</span><span class=\"p\">)</span>\n</code></pre></div>\n<div class='prevnext'>\n\n
  \   <style type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n
  \     --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
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
  \   </style>\n\n    <a class='prev' href='/077-silent-years-herodians'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>077 Silent Years - Herodians</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/jinja'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Jinja
  Variables</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0
  0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-09-04
datetime: 2022-09-04 00:00:00+00:00
description: Setting up the ipython extension is completely optional, and not You
  can add markata to your I don If you have the extension active an instance will
  automatical
edit_link: https://github.com/edit/main/pages/ipython.md
html: "<h2 id=\"ipython-extension\">Ipython extension</h2>\n<p>Setting up the ipython
  extension is completely optional, and not\nrequired, but there for pure convenience.</p>\n<div
  class=\"admonition note\">\n<p class=\"admonition-title\">## <a href=\"building-the-site\">Building
  the Site</a></p>\n<p>The first thing you will want to do is make sure that you can
  build your site and see it in the browser.  Markata builds static websites using
  a python based cl</p>\n</div>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">##
  <a href=\"jinja\">Jinja Variables</a></p>\n<p>Markata uses python The veresion of
  markata used to build the site. ({{  A python datetime object. ({{date.today()}})
  All variables from your post frontmatter l</p>\n</div>\n<div class=\"admonition
  note\">\n<p class=\"admonition-title\">## <a href=\"ipython\">Loading Markata into
  Ipython</a></p>\n<p>Setting up the ipython extension is completely optional, and
  not You can add markata to your I don If you have the extension active an instance
  will automatical</p>\n</div>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">##
  <a href=\"your-own-style\">Your Own Style</a></p>\n</div>\n<p>You can add markata
  to your\n<code>~/.ipython/profile_default/ipython_config.py</code> as reccomended
  by\nipython with the snippet below.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">c</span><span class=\"o\">.</span><span class=\"n\">InteractiveShellApp</span><span
  class=\"o\">.</span><span class=\"n\">extensions</span><span class=\"o\">.</span><span
  class=\"n\">append</span><span class=\"p\">(</span><span class=\"s1\">&#39;markata&#39;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>I don't prefer this because I also
  have ipython installed in\nenvironments without markata installed, so I do the following
  in\nmy personal config so that it does not error when missing markata.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kn\">import</span> <span
  class=\"nn\">importlib</span>\n\n\n<span class=\"k\">def</span> <span class=\"nf\">activate_extension</span><span
  class=\"p\">(</span><span class=\"n\">extension</span><span class=\"p\">):</span>\n
  \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">mod</span>
  <span class=\"o\">=</span> <span class=\"n\">importlib</span><span class=\"o\">.</span><span
  class=\"n\">import_module</span><span class=\"p\">(</span><span class=\"n\">extension</span><span
  class=\"p\">)</span>\n        <span class=\"nb\">getattr</span><span class=\"p\">(</span><span
  class=\"n\">mod</span><span class=\"p\">,</span> <span class=\"s2\">&quot;load_ipython_extension&quot;</span><span
  class=\"p\">)</span>\n        <span class=\"n\">c</span><span class=\"o\">.</span><span
  class=\"n\">InteractiveShellApp</span><span class=\"o\">.</span><span class=\"n\">extensions</span><span
  class=\"o\">.</span><span class=\"n\">append</span><span class=\"p\">(</span><span
  class=\"n\">extension</span><span class=\"p\">)</span>\n    <span class=\"k\">except</span>
  <span class=\"ne\">ModuleNotFoundError</span><span class=\"p\">:</span>\n        <span
  class=\"s2\">&quot;extension is not installed&quot;</span>\n    <span class=\"k\">except</span>
  <span class=\"ne\">AttributeError</span><span class=\"p\">:</span>\n        <span
  class=\"s2\">&quot;extension does not have a &#39;load_ipython_extension&#39; function&quot;</span>\n\n\n<span
  class=\"n\">extensions</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
  class=\"s2\">&quot;markata&quot;</span><span class=\"p\">,</span> <span class=\"p\">]</span>\n<span
  class=\"k\">for</span> <span class=\"n\">extension</span> <span class=\"ow\">in</span>
  <span class=\"n\">extensions</span><span class=\"p\">:</span>\n    <span class=\"n\">activate_extension</span><span
  class=\"p\">(</span><span class=\"n\">extension</span><span class=\"p\">)</span>\n</code></pre></div>\n<h2
  id=\"loading-a-markata-instance\">Loading a markata instance</h2>\n<p>If you have
  the extension active an instance will automatically be created and\navailable as
  <code>m</code> as well as <code>markata</code>.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">m</span>\n<span class=\"c1\"># or</span>\n<span class=\"n\">markata</span>\n</code></pre></div>\n<p>If
  you opt out of setting up the extension or use something other than ipython\nyou
  can make an instance yourself.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">markata</span> <span class=\"kn\">import</span>
  <span class=\"n\">Markata</span>\n\n<span class=\"n\">m</span> <span class=\"o\">=</span>
  <span class=\"n\">Markata</span><span class=\"p\">()</span>\n</code></pre></div>\n<h2
  id=\"looking-through-articles\">Looking through articles</h2>\n<p>Once you have
  an instance of <code>markata</code> in memory you can look through your\narticles
  using the list of articles, or the map function.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"c1\"># get a list of frontmatter.Post objects</span>\n<span class=\"n\">m</span><span
  class=\"o\">.</span><span class=\"n\">articles</span>\n\n<span class=\"c1\"># leverage
  the map function to filter</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;post&#39;</span><span
  class=\"p\">,</span> <span class=\"nb\">filter</span><span class=\"o\">=</span><span
  class=\"s1\">&#39;&quot;python&quot; in tags&#39;</span><span class=\"p\">)</span>\n<span
  class=\"n\">m</span><span class=\"o\">.</span><span class=\"n\">map</span><span
  class=\"p\">(</span><span class=\"s1\">&#39;post&#39;</span><span class=\"p\">,</span>
  <span class=\"nb\">filter</span><span class=\"o\">=</span><span class=\"s1\">&#39;date&gt;today&#39;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<h2 id=\"map\">Map</h2>\n<p>The map function
  </p>\n<p><code>func</code>: What to return as the item in the list. This can ve
  a single attribute\nlike <code>title</code>, or <code>tags</code>, or the full post
  <code>post</code>.  It can also be any string of\npython like <code>'date&gt;today'</code>
  or something more complicated like\n<code>f'''\"{markata.config['url']}/\" + slug'''</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;post&#39;</span><span
  class=\"p\">)</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;title&#39;</span><span
  class=\"p\">)</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;slug&#39;</span><span
  class=\"p\">)</span>\n\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"s1\">&#39;&quot;python&quot;
  in tags&#39;</span><span class=\"p\">)</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
  class=\"s1\">&#39;&#39;&#39;&quot;</span><span class=\"si\">{</span><span class=\"n\">markata</span><span
  class=\"o\">.</span><span class=\"n\">config</span><span class=\"p\">[</span><span
  class=\"s1\">&#39;url&#39;</span><span class=\"p\">]</span><span class=\"si\">}</span><span
  class=\"s1\">/&quot; + slug&#39;&#39;&#39;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><code>filter</code>:
  Filter is also just a string of python similar to the <code>func</code>\nargument,
  but it filters based on the boolean value of the result.  You can do\nthings like
  look for published posts <code>published</code>, check for posts posted before\ntoday
  <code>date&lt;today</code>, or articles with certain tags <code>\"python\" in tags</code>.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"nb\">filter</span><span
  class=\"o\">=</span><span class=\"s1\">&#39;published&#39;</span><span class=\"p\">)</span>\n<span
  class=\"n\">m</span><span class=\"o\">.</span><span class=\"n\">map</span><span
  class=\"p\">(</span><span class=\"nb\">filter</span><span class=\"o\">=</span><span
  class=\"s1\">&#39;date&lt;today&#39;</span><span class=\"p\">)</span>\n<span class=\"n\">m</span><span
  class=\"o\">.</span><span class=\"n\">map</span><span class=\"p\">(</span><span
  class=\"nb\">filter</span><span class=\"o\">=</span><span class=\"s1\">&#39;&quot;python&quot;
  in tags&#39;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><code>sort</code>:
  Sort will try to sort your articles based on the value returned.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">m</span><span class=\"o\">.</span><span class=\"n\">map</span><span
  class=\"p\">(</span><span class=\"n\">sort</span><span class=\"o\">=</span><span
  class=\"s1\">&#39;title&#39;</span><span class=\"p\">)</span>\n<span class=\"n\">m</span><span
  class=\"o\">.</span><span class=\"n\">map</span><span class=\"p\">(</span><span
  class=\"n\">sort</span><span class=\"o\">=</span><span class=\"s1\">&#39;date&#39;</span><span
  class=\"p\">)</span>\n<span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"n\">sort</span><span
  class=\"o\">=</span><span class=\"s1\">&#39;order&#39;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p><code>reverse</code>:
  Reverse the results returned by map with the <code>reverse</code> flag.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">m</span><span class=\"o\">.</span><span
  class=\"n\">map</span><span class=\"p\">(</span><span class=\"n\">reverse</span><span
  class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">)</span>\n<span
  class=\"n\">m</span><span class=\"o\">.</span><span class=\"n\">map</span><span
  class=\"p\">(</span><span class=\"n\">reverse</span><span class=\"o\">=</span><span
  class=\"kc\">True</span><span class=\"p\">)</span>\n</code></pre></div>\n<div class='prevnext'>\n\n
  \   <style type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n
  \     --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
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
  \   </style>\n\n    <a class='prev' href='/077-silent-years-herodians'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>077 Silent Years - Herodians</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/jinja'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Jinja
  Variables</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0
  0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Setting up the ipython extension is completely optional, and not
  You can add markata to your I don If you have the extension active an instance will
  automatically be created and If you opt out of setting up the extension or use something
  other than i
now: 2024-06-26 16:50:21.523817
path: pages/ipython.md
published: true
slug: ipython
super_description: Setting up the ipython extension is completely optional, and not
  You can add markata to your I don If you have the extension active an instance will
  automatically be created and If you opt out of setting up the extension or use something
  other than ipython Once you have an instance of  The map function func filter sort
  reverse
tags:
- home
- meta
templateKey: ''
title: Loading Markata into Ipython
today: 2024-06-26
---

## Ipython extension

Setting up the ipython extension is completely optional, and not
required, but there for pure convenience.

!!! note "## [Building the Site](building-the-site)"
    The first thing you will want to do is make sure that you can build your site and see it in the browser.  Markata builds static websites using a python based cl

!!! note "## [Jinja Variables](jinja)"
    Markata uses python The veresion of markata used to build the site. ({{  A python datetime object. ({{date.today()}}) All variables from your post frontmatter l

!!! note "## [Loading Markata into Ipython](ipython)"
    Setting up the ipython extension is completely optional, and not You can add markata to your I don If you have the extension active an instance will automatical

!!! note "## [Your Own Style](your-own-style)"
    





You can add markata to your
`~/.ipython/profile_default/ipython_config.py` as reccomended by
ipython with the snippet below.

``` python
c.InteractiveShellApp.extensions.append('markata')
```

I don't prefer this because I also have ipython installed in
environments without markata installed, so I do the following in
my personal config so that it does not error when missing markata.

``` python
import importlib


def activate_extension(extension):
    try:
        mod = importlib.import_module(extension)
        getattr(mod, "load_ipython_extension")
        c.InteractiveShellApp.extensions.append(extension)
    except ModuleNotFoundError:
        "extension is not installed"
    except AttributeError:
        "extension does not have a 'load_ipython_extension' function"


extensions = ["markata", ]
for extension in extensions:
    activate_extension(extension)
```

## Loading a markata instance

If you have the extension active an instance will automatically be created and
available as `m` as well as `markata`.

``` python
m
# or
markata
```

If you opt out of setting up the extension or use something other than ipython
you can make an instance yourself.

``` python
from markata import Markata

m = Markata()
```

## Looking through articles

Once you have an instance of `markata` in memory you can look through your
articles using the list of articles, or the map function.


``` python
# get a list of frontmatter.Post objects
m.articles

# leverage the map function to filter
m.map('post', filter='"python" in tags')
m.map('post', filter='date>today')
```

## Map

The map function 

`func`: What to return as the item in the list. This can ve a single attribute
like `title`, or `tags`, or the full post `post`.  It can also be any string of
python like `'date>today'` or something more complicated like
`f'''"{markata.config['url']}/" + slug'''`

``` python
m.map('post')
m.map('title')
m.map('slug')

m.map('"python" in tags')
m.map(f'''"{markata.config['url']}/" + slug''')
```

`filter`: Filter is also just a string of python similar to the `func`
argument, but it filters based on the boolean value of the result.  You can do
things like look for published posts `published`, check for posts posted before
today `date<today`, or articles with certain tags `"python" in tags`.

``` python
m.map(filter='published')
m.map(filter='date<today')
m.map(filter='"python" in tags')
```

`sort`: Sort will try to sort your articles based on the value returned.

``` python
m.map(sort='title')
m.map(sort='date')
m.map(sort='order')
```

`reverse`: Reverse the results returned by map with the `reverse` flag.

``` python
m.map(reverse=False)
m.map(reverse=True)
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
    
    <a class='prev' href='/077-silent-years-herodians'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>077 Silent Years - Herodians</p>
        </div>
    </a>
    
    <a class='next' href='/jinja'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Jinja Variables</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>