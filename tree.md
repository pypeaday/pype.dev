---
article_html: "<p>I wanted a quick way to generate an <code>index.html</code> for
  a directory of html files that grows by 1 or 2 files a week.\nI don't know any html
  (the files are exports from my <a href=\"/tiddly-wiki\">tiddlywiki</a>)...</p>\n<p><code>tree</code>
  is just the answer.</p>\n<p>Say I have a file structure like this:</p>\n<div class=\"highlight\"><pre><span></span><code>./html-files\n├──
  file1.html\n└── file2.html\n</code></pre></div>\n<p>To generate a barebones simple
  <code>index.html</code> we can use tree as follows:</p>\n<p><code>tree ./html-files
  -H \".\" -L 1 -P \"*.html\"</code></p>\n<p>and get the following:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"cp\">&lt;!DOCTYPE html&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">html</span><span
  class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">head</span><span
  class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">meta</span>
  <span class=\"na\">http-equiv</span><span class=\"o\">=</span><span class=\"s\">&quot;Content-Type&quot;</span>
  <span class=\"na\">content</span><span class=\"o\">=</span><span class=\"s\">&quot;text/html;
  charset=UTF-8&quot;</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
  class=\"nt\">meta</span> <span class=\"na\">name</span><span class=\"o\">=</span><span
  class=\"s\">&quot;Author&quot;</span> <span class=\"na\">content</span><span class=\"o\">=</span><span
  class=\"s\">&quot;Made by &#39;tree&#39;&quot;</span><span class=\"p\">&gt;</span>\n
  <span class=\"p\">&lt;</span><span class=\"nt\">meta</span> <span class=\"na\">name</span><span
  class=\"o\">=</span><span class=\"s\">&quot;GENERATOR&quot;</span> <span class=\"na\">content</span><span
  class=\"o\">=</span><span class=\"s\">&quot;$Version: $ tree v1.8.0 (c) 1996 - 2018
  by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro $&quot;</span><span
  class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">title</span><span
  class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span class=\"nt\">title</span><span
  class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">style</span>
  <span class=\"na\">type</span><span class=\"o\">=</span><span class=\"s\">&quot;text/css&quot;</span><span
  class=\"p\">&gt;</span>\n<span class=\"w\">  </span><span class=\"o\">&lt;!</span><span
  class=\"nt\">--</span>\n<span class=\"w\">  </span><span class=\"nt\">BODY</span><span
  class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">ariel</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">monospace</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"nt\">P</span><span class=\"w\"> </span><span
  class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">ariel</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">monospace</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">B</span><span
  class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
  class=\"p\">:</span><span class=\"nd\">visited</span><span class=\"w\"> </span><span
  class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">text-decoration</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">none</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
  class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
  class=\"nd\">link</span><span class=\"w\">    </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">font-weight</span><span class=\"w\"> </span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">text-decoration</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">none</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
  class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
  class=\"nd\">hover</span><span class=\"w\">   </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"w\"> </span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"mh\">#000000</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">text-decoration</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">underline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
  class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
  class=\"nd\">active</span><span class=\"w\">  </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"w\"> </span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"mh\">#000000</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
  class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">VERSION</span><span
  class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-size</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">small</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">arial</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">NORM</span><span
  class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
  class=\"p\">;</span><span class=\"w\">  </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
  class=\"nc\">FIFO</span><span class=\"w\">  </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">purple</span><span class=\"p\">;</span><span
  class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">CHAR</span><span
  class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
  class=\"nc\">DIR</span><span class=\"w\">   </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">blue</span><span class=\"p\">;</span><span
  class=\"w\">   </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">BLOCK</span><span
  class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
  class=\"nc\">LINK</span><span class=\"w\">  </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">aqua</span><span class=\"p\">;</span><span
  class=\"w\">   </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">SOCK</span><span
  class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">fuchsia</span><span
  class=\"p\">;</span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">EXEC</span><span
  class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">green</span><span
  class=\"p\">;</span><span class=\"w\">  </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">--</span><span
  class=\"o\">&gt;</span>\n<span class=\"w\"> </span><span class=\"p\">&lt;/</span><span
  class=\"nt\">style</span><span class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span
  class=\"nt\">head</span><span class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span
  class=\"nt\">body</span><span class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span
  class=\"nt\">h1</span><span class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span
  class=\"nt\">h1</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">p</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">a</span>
  <span class=\"na\">href</span><span class=\"o\">=</span><span class=\"s\">&quot;.&quot;</span><span
  class=\"p\">&gt;</span>.<span class=\"p\">&lt;/</span><span class=\"nt\">a</span><span
  class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span class=\"p\">&gt;</span>\n
  \       ├── <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
  class=\"o\">=</span><span class=\"s\">&quot;./file1.html&quot;</span><span class=\"p\">&gt;</span>file1.html<span
  class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
  class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        └── <span class=\"p\">&lt;</span><span
  class=\"nt\">a</span> <span class=\"na\">href</span><span class=\"o\">=</span><span
  class=\"s\">&quot;./file2.html&quot;</span><span class=\"p\">&gt;</span>file2.html<span
  class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
  class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span
  class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span><span
  class=\"p\">&gt;</span>\n\n0 directories, 2 files\n        <span class=\"p\">&lt;</span><span
  class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">hr</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span>
  <span class=\"na\">class</span><span class=\"o\">=</span><span class=\"s\">&quot;VERSION&quot;</span><span
  class=\"p\">&gt;</span>\n                 tree v1.8.0 © 1996 - 2018 by Steve Baker
  and Thomas Moore <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n                 HTML output hacked and copyleft © 1998
  by Francesc Rocher <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n                 JSON output hacked and copyleft © 2014
  by Florian Sesser <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n                 Charsets / OS/2 support © 2001 by Kyosuke
  Tokoro\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span class=\"p\">&gt;</span>\n<span
  class=\"p\">&lt;/</span><span class=\"nt\">body</span><span class=\"p\">&gt;</span>\n<span
  class=\"p\">&lt;/</span><span class=\"nt\">html</span><span class=\"p\">&gt;</span>\n</code></pre></div>\n<p>which
  <a href=\"/tree-index-example.html\">looks like this</a> when you serve it up with
  <code>python -m http.server</code></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/traefik-01'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Traefik-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/webservers-and-indexes'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Webservers-And-Indexes</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/tree.png
date: 2022-03-06
datetime: 2022-03-06 00:00:00+00:00
description: 'I wanted a quick way to generate an  tree Say I have a file structure
  like this: To generate a barebones simple  tree ./html-files -H "." -L 1 -P "*.html"
  and g'
edit_link: https://github.com/edit/main/pages/til/tree.md
html: "<p>I wanted a quick way to generate an <code>index.html</code> for a directory
  of html files that grows by 1 or 2 files a week.\nI don't know any html (the files
  are exports from my <a href=\"/tiddly-wiki\">tiddlywiki</a>)...</p>\n<p><code>tree</code>
  is just the answer.</p>\n<p>Say I have a file structure like this:</p>\n<div class=\"highlight\"><pre><span></span><code>./html-files\n├──
  file1.html\n└── file2.html\n</code></pre></div>\n<p>To generate a barebones simple
  <code>index.html</code> we can use tree as follows:</p>\n<p><code>tree ./html-files
  -H \".\" -L 1 -P \"*.html\"</code></p>\n<p>and get the following:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"cp\">&lt;!DOCTYPE html&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">html</span><span
  class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span class=\"nt\">head</span><span
  class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">meta</span>
  <span class=\"na\">http-equiv</span><span class=\"o\">=</span><span class=\"s\">&quot;Content-Type&quot;</span>
  <span class=\"na\">content</span><span class=\"o\">=</span><span class=\"s\">&quot;text/html;
  charset=UTF-8&quot;</span><span class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span
  class=\"nt\">meta</span> <span class=\"na\">name</span><span class=\"o\">=</span><span
  class=\"s\">&quot;Author&quot;</span> <span class=\"na\">content</span><span class=\"o\">=</span><span
  class=\"s\">&quot;Made by &#39;tree&#39;&quot;</span><span class=\"p\">&gt;</span>\n
  <span class=\"p\">&lt;</span><span class=\"nt\">meta</span> <span class=\"na\">name</span><span
  class=\"o\">=</span><span class=\"s\">&quot;GENERATOR&quot;</span> <span class=\"na\">content</span><span
  class=\"o\">=</span><span class=\"s\">&quot;$Version: $ tree v1.8.0 (c) 1996 - 2018
  by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro $&quot;</span><span
  class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">title</span><span
  class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span class=\"nt\">title</span><span
  class=\"p\">&gt;</span>\n <span class=\"p\">&lt;</span><span class=\"nt\">style</span>
  <span class=\"na\">type</span><span class=\"o\">=</span><span class=\"s\">&quot;text/css&quot;</span><span
  class=\"p\">&gt;</span>\n<span class=\"w\">  </span><span class=\"o\">&lt;!</span><span
  class=\"nt\">--</span>\n<span class=\"w\">  </span><span class=\"nt\">BODY</span><span
  class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">ariel</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">monospace</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"nt\">P</span><span class=\"w\"> </span><span
  class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">ariel</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">monospace</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">B</span><span
  class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">A</span><span
  class=\"p\">:</span><span class=\"nd\">visited</span><span class=\"w\"> </span><span
  class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">text-decoration</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">none</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
  class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
  class=\"nd\">link</span><span class=\"w\">    </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">font-weight</span><span class=\"w\"> </span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">text-decoration</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">none</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
  class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
  class=\"nd\">hover</span><span class=\"w\">   </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"w\"> </span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"mh\">#000000</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">text-decoration</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">underline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
  class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"nt\">A</span><span class=\"p\">:</span><span
  class=\"nd\">active</span><span class=\"w\">  </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"w\"> </span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"mh\">#000000</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-weight</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">normal</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">margin</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"w\"> </span><span class=\"mi\">0</span><span
  class=\"kt\">px</span><span class=\"p\">;</span><span class=\"w\"> </span><span
  class=\"k\">padding</span><span class=\"w\"> </span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"w\"> </span><span class=\"mi\">0</span><span class=\"kt\">px</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">display</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">inline</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">VERSION</span><span
  class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">font-size</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">small</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">font-family</span><span
  class=\"w\"> </span><span class=\"p\">:</span><span class=\"w\"> </span><span class=\"n\">arial</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"kc\">sans-serif</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"p\">}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">NORM</span><span
  class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">black</span><span
  class=\"p\">;</span><span class=\"w\">  </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
  class=\"nc\">FIFO</span><span class=\"w\">  </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">purple</span><span class=\"p\">;</span><span
  class=\"w\"> </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">CHAR</span><span
  class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
  class=\"nc\">DIR</span><span class=\"w\">   </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">blue</span><span class=\"p\">;</span><span
  class=\"w\">   </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">BLOCK</span><span
  class=\"w\"> </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">yellow</span><span
  class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"p\">.</span><span
  class=\"nc\">LINK</span><span class=\"w\">  </span><span class=\"p\">{</span><span
  class=\"w\"> </span><span class=\"k\">color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">aqua</span><span class=\"p\">;</span><span
  class=\"w\">   </span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">SOCK</span><span
  class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">fuchsia</span><span
  class=\"p\">;</span><span class=\"k\">background-color</span><span class=\"p\">:</span><span
  class=\"w\"> </span><span class=\"kc\">transparent</span><span class=\"p\">;}</span>\n<span
  class=\"w\">  </span><span class=\"p\">.</span><span class=\"nc\">EXEC</span><span
  class=\"w\">  </span><span class=\"p\">{</span><span class=\"w\"> </span><span class=\"k\">color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">green</span><span
  class=\"p\">;</span><span class=\"w\">  </span><span class=\"k\">background-color</span><span
  class=\"p\">:</span><span class=\"w\"> </span><span class=\"kc\">transparent</span><span
  class=\"p\">;}</span>\n<span class=\"w\">  </span><span class=\"nt\">--</span><span
  class=\"o\">&gt;</span>\n<span class=\"w\"> </span><span class=\"p\">&lt;/</span><span
  class=\"nt\">style</span><span class=\"p\">&gt;</span>\n<span class=\"p\">&lt;/</span><span
  class=\"nt\">head</span><span class=\"p\">&gt;</span>\n<span class=\"p\">&lt;</span><span
  class=\"nt\">body</span><span class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span
  class=\"nt\">h1</span><span class=\"p\">&gt;</span>Directory Tree<span class=\"p\">&lt;/</span><span
  class=\"nt\">h1</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">p</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">a</span>
  <span class=\"na\">href</span><span class=\"o\">=</span><span class=\"s\">&quot;.&quot;</span><span
  class=\"p\">&gt;</span>.<span class=\"p\">&lt;/</span><span class=\"nt\">a</span><span
  class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span class=\"p\">&gt;</span>\n
  \       ├── <span class=\"p\">&lt;</span><span class=\"nt\">a</span> <span class=\"na\">href</span><span
  class=\"o\">=</span><span class=\"s\">&quot;./file1.html&quot;</span><span class=\"p\">&gt;</span>file1.html<span
  class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
  class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        └── <span class=\"p\">&lt;</span><span
  class=\"nt\">a</span> <span class=\"na\">href</span><span class=\"o\">=</span><span
  class=\"s\">&quot;./file2.html&quot;</span><span class=\"p\">&gt;</span>file2.html<span
  class=\"p\">&lt;/</span><span class=\"nt\">a</span><span class=\"p\">&gt;&lt;</span><span
  class=\"nt\">br</span><span class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span
  class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span><span
  class=\"p\">&gt;</span>\n\n0 directories, 2 files\n        <span class=\"p\">&lt;</span><span
  class=\"nt\">br</span><span class=\"p\">&gt;&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">hr</span><span
  class=\"p\">&gt;</span>\n        <span class=\"p\">&lt;</span><span class=\"nt\">p</span>
  <span class=\"na\">class</span><span class=\"o\">=</span><span class=\"s\">&quot;VERSION&quot;</span><span
  class=\"p\">&gt;</span>\n                 tree v1.8.0 © 1996 - 2018 by Steve Baker
  and Thomas Moore <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n                 HTML output hacked and copyleft © 1998
  by Francesc Rocher <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n                 JSON output hacked and copyleft © 2014
  by Florian Sesser <span class=\"p\">&lt;</span><span class=\"nt\">br</span><span
  class=\"p\">&gt;</span>\n                 Charsets / OS/2 support © 2001 by Kyosuke
  Tokoro\n        <span class=\"p\">&lt;/</span><span class=\"nt\">p</span><span class=\"p\">&gt;</span>\n<span
  class=\"p\">&lt;/</span><span class=\"nt\">body</span><span class=\"p\">&gt;</span>\n<span
  class=\"p\">&lt;/</span><span class=\"nt\">html</span><span class=\"p\">&gt;</span>\n</code></pre></div>\n<p>which
  <a href=\"/tree-index-example.html\">looks like this</a> when you serve it up with
  <code>python -m http.server</code></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/traefik-01'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Traefik-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/webservers-and-indexes'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Webservers-And-Indexes</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I wanted a quick way to generate an  tree Say I have a file structure
  like this: To generate a barebones simple  tree ./html-files -H "." -L 1 -P "*.html"
  and get the following: which '
now: 2024-06-26 16:50:21.523835
path: pages/til/tree.md
published: true
slug: tree
super_description: 'I wanted a quick way to generate an  tree Say I have a file structure
  like this: To generate a barebones simple  tree ./html-files -H "." -L 1 -P "*.html"
  and get the following: which '
tags:
- linux
- tech
templateKey: til
title: Tree
today: 2024-06-26
---

I wanted a quick way to generate an `index.html` for a directory of html files that grows by 1 or 2 files a week.
I don't know any html (the files are exports from my [tiddlywiki](/tiddly-wiki))...

`tree` is just the answer.

Say I have a file structure like this:

```
./html-files
├── file1.html
└── file2.html
```

To generate a barebones simple `index.html` we can use tree as follows:

`tree ./html-files -H "." -L 1 -P "*.html"`

and get the following:

```html

<!DOCTYPE html>
<html>
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <meta name="Author" content="Made by 'tree'">
 <meta name="GENERATOR" content="$Version: $ tree v1.8.0 (c) 1996 - 2018 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro $">
 <title>Directory Tree</title>
 <style type="text/css">
  <!--
  BODY { font-family : ariel, monospace, sans-serif; }
  P { font-weight: normal; font-family : ariel, monospace, sans-serif; color: black; background-color: transparent;}
  B { font-weight: normal; color: black; background-color: transparent;}
  A:visited { font-weight : normal; text-decoration : none; background-color : transparent; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:link    { font-weight : normal; text-decoration : none; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:hover   { color : #000000; font-weight : normal; text-decoration : underline; background-color : yellow; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  A:active  { color : #000000; font-weight: normal; background-color : transparent; margin : 0px 0px 0px 0px; padding : 0px 0px 0px 0px; display: inline; }
  .VERSION { font-size: small; font-family : arial, sans-serif; }
  .NORM  { color: black;  background-color: transparent;}
  .FIFO  { color: purple; background-color: transparent;}
  .CHAR  { color: yellow; background-color: transparent;}
  .DIR   { color: blue;   background-color: transparent;}
  .BLOCK { color: yellow; background-color: transparent;}
  .LINK  { color: aqua;   background-color: transparent;}
  .SOCK  { color: fuchsia;background-color: transparent;}
  .EXEC  { color: green;  background-color: transparent;}
  -->
 </style>
</head>
<body>
        <h1>Directory Tree</h1><p>
        <a href=".">.</a><br>
        ├── <a href="./file1.html">file1.html</a><br>
        └── <a href="./file2.html">file2.html</a><br>
        <br><br>
        </p>
        <p>

0 directories, 2 files
        <br><br>
        </p>
        <hr>
        <p class="VERSION">
                 tree v1.8.0 © 1996 - 2018 by Steve Baker and Thomas Moore <br>
                 HTML output hacked and copyleft © 1998 by Francesc Rocher <br>
                 JSON output hacked and copyleft © 2014 by Florian Sesser <br>
                 Charsets / OS/2 support © 2001 by Kyosuke Tokoro
        </p>
</body>
</html>

```


which [looks like this](/tree-index-example.html) when you serve it up with `python -m http.server`
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
    
    <a class='next' href='/webservers-and-indexes'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Webservers-And-Indexes</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>