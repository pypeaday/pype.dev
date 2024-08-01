---
article_html: "<p><a href=\"https://twitter.com/driscollis\">Mike Driscoll</a> has
  been posting some awesome posts about <code>psutil</code> lately.\nI'm interested
  in making my own system monitoring dashboard now using this library.\nI don't expect
  it to compete with Netdata or Glances but it'll just be for fun to see how Python
  can solve this problem!</p>\n<p><strong>Repo coming soon</strong></p>\n<h2 id=\"example-code\">Example
  code:</h2>\n<p>Here's a short snippit to get used/available/total RAM and disk space
  (on partitions that you probably care about)\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">import</span> <span class=\"nn\">psutil</span>\n<span class=\"kn\">import</span>
  <span class=\"nn\">socket</span>\n\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;System Memory used: </span><span class=\"si\">{</span><span
  class=\"n\">psutil</span><span class=\"o\">.</span><span class=\"n\">virtual_memory</span><span
  class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">used</span><span
  class=\"w\"> </span><span class=\"o\">//</span><span class=\"w\"> </span><span class=\"p\">(</span><span
  class=\"mi\">1024</span><span class=\"w\"> </span><span class=\"o\">**</span><span
  class=\"w\"> </span><span class=\"mi\">3</span><span class=\"p\">)</span><span class=\"si\">}</span><span
  class=\"s2\"> GB&quot;</span><span class=\"p\">)</span>\n<span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;System Memory
  available: </span><span class=\"si\">{</span><span class=\"n\">psutil</span><span
  class=\"o\">.</span><span class=\"n\">virtual_memory</span><span class=\"p\">()</span><span
  class=\"o\">.</span><span class=\"n\">available</span><span class=\"w\"> </span><span
  class=\"o\">//</span><span class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\"> GB&quot;</span><span
  class=\"p\">)</span>\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;System Memory total: </span><span
  class=\"si\">{</span><span class=\"n\">psutil</span><span class=\"o\">.</span><span
  class=\"n\">virtual_memory</span><span class=\"p\">()</span><span class=\"o\">.</span><span
  class=\"n\">total</span><span class=\"w\"> </span><span class=\"o\">//</span><span
  class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\"> GB&quot;</span><span
  class=\"p\">)</span>\n\n\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Hostname: </span><span class=\"si\">{</span><span
  class=\"n\">socket</span><span class=\"o\">.</span><span class=\"n\">gethostname</span><span
  class=\"p\">()</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
  class=\"p\">)</span>\n\n<span class=\"n\">partitions</span> <span class=\"o\">=</span>
  <span class=\"n\">psutil</span><span class=\"o\">.</span><span class=\"n\">disk_partitions</span><span
  class=\"p\">()</span>\n\n<span class=\"k\">for</span> <span class=\"n\">part</span>
  <span class=\"ow\">in</span> <span class=\"n\">partitions</span><span class=\"p\">:</span>\n
  \   <span class=\"n\">mnt</span> <span class=\"o\">=</span> <span class=\"n\">part</span><span
  class=\"o\">.</span><span class=\"n\">mountpoint</span>\n    <span class=\"k\">if</span>
  <span class=\"s2\">&quot;snap&quot;</span> <span class=\"ow\">in</span> <span class=\"n\">mnt</span>
  <span class=\"ow\">or</span> <span class=\"s2\">&quot;boot&quot;</span> <span class=\"ow\">in</span>
  <span class=\"n\">mnt</span><span class=\"p\">:</span>\n        <span class=\"k\">continue</span>\n
  \   <span class=\"n\">disk</span> <span class=\"o\">=</span> <span class=\"n\">psutil</span><span
  class=\"o\">.</span><span class=\"n\">disk_usage</span><span class=\"p\">(</span><span
  class=\"n\">mnt</span><span class=\"p\">)</span>\n    <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;Usage at
  </span><span class=\"si\">{</span><span class=\"n\">mnt</span><span class=\"si\">}</span><span
  class=\"s2\"> on </span><span class=\"si\">{</span><span class=\"n\">part</span><span
  class=\"o\">.</span><span class=\"n\">device</span><span class=\"si\">}</span><span
  class=\"s2\">: </span><span class=\"si\">{</span><span class=\"n\">disk</span><span
  class=\"o\">.</span><span class=\"n\">used</span><span class=\"w\"> </span><span
  class=\"o\">//</span><span class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\"> GB&quot;</span><span
  class=\"p\">)</span>\n    <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Free at </span><span class=\"si\">{</span><span
  class=\"n\">mnt</span><span class=\"si\">}</span><span class=\"s2\"> on </span><span
  class=\"si\">{</span><span class=\"n\">part</span><span class=\"o\">.</span><span
  class=\"n\">device</span><span class=\"si\">}</span><span class=\"s2\">: </span><span
  class=\"si\">{</span><span class=\"n\">disk</span><span class=\"o\">.</span><span
  class=\"n\">free</span><span class=\"w\"> </span><span class=\"o\">//</span><span
  class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">GB&quot;</span><span
  class=\"p\">)</span>\n    <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Total at </span><span class=\"si\">{</span><span
  class=\"n\">mnt</span><span class=\"si\">}</span><span class=\"s2\"> on </span><span
  class=\"si\">{</span><span class=\"n\">part</span><span class=\"o\">.</span><span
  class=\"n\">device</span><span class=\"si\">}</span><span class=\"s2\">: </span><span
  class=\"si\">{</span><span class=\"n\">disk</span><span class=\"o\">.</span><span
  class=\"n\">total</span><span class=\"w\"> </span><span class=\"o\">//</span><span
  class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">GB&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div></p>\n<blockquote>\n<p>Bonus Ipython tip!
  Save this to a script called my_script.py and in Ipython you can %run -m my_script
  to run it!</p>\n</blockquote>\n<div class=\"highlight\"><pre><span></span><code>project<span
  class=\"w\"> </span>↪<span class=\"w\"> </span>main<span class=\"w\"> </span>v3.8.11<span
  class=\"w\"> </span>ipython\n❯<span class=\"w\"> </span>%run<span class=\"w\"> </span>-m<span
  class=\"w\"> </span>system-monitor-psutils\nSystem<span class=\"w\"> </span>Memory<span
  class=\"w\"> </span>used:<span class=\"w\"> </span><span class=\"m\">25</span><span
  class=\"w\"> </span>GB\nSystem<span class=\"w\"> </span>Memory<span class=\"w\">
  </span>available:<span class=\"w\"> </span><span class=\"m\">5</span><span class=\"w\">
  </span>GB\nSystem<span class=\"w\"> </span>Memory<span class=\"w\"> </span>total:<span
  class=\"w\"> </span><span class=\"m\">31</span><span class=\"w\"> </span>GB\nHostname:<span
  class=\"w\"> </span>ryzen-3600x\nUsage<span class=\"w\"> </span>at<span class=\"w\">
  </span>/<span class=\"w\"> </span>on<span class=\"w\"> </span>/dev/nvme1n1p2:<span
  class=\"w\"> </span><span class=\"m\">81</span><span class=\"w\"> </span>GB\nFree<span
  class=\"w\"> </span>at<span class=\"w\"> </span>/<span class=\"w\"> </span>on<span
  class=\"w\"> </span>/dev/nvme1n1p2:<span class=\"w\"> </span><span class=\"m\">351</span><span
  class=\"w\"> </span>GB\nTotal<span class=\"w\"> </span>at<span class=\"w\"> </span>/<span
  class=\"w\"> </span>on<span class=\"w\"> </span>/dev/nvme1n1p2:<span class=\"w\">
  </span><span class=\"m\">456</span><span class=\"w\"> </span>GB\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/pyclean'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Pyclean</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/mu'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Mu</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/psutil-01.png
date: 2022-03-16
datetime: 2022-03-16 00:00:00+00:00
description: Here Bonus Ipython tip
edit_link: https://github.com/edit/main/pages/til/psutils-01.md
html: "<p><a href=\"https://twitter.com/driscollis\">Mike Driscoll</a> has been posting
  some awesome posts about <code>psutil</code> lately.\nI'm interested in making my
  own system monitoring dashboard now using this library.\nI don't expect it to compete
  with Netdata or Glances but it'll just be for fun to see how Python can solve this
  problem!</p>\n<p><strong>Repo coming soon</strong></p>\n<h2 id=\"example-code\">Example
  code:</h2>\n<p>Here's a short snippit to get used/available/total RAM and disk space
  (on partitions that you probably care about)\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">import</span> <span class=\"nn\">psutil</span>\n<span class=\"kn\">import</span>
  <span class=\"nn\">socket</span>\n\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;System Memory used: </span><span class=\"si\">{</span><span
  class=\"n\">psutil</span><span class=\"o\">.</span><span class=\"n\">virtual_memory</span><span
  class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">used</span><span
  class=\"w\"> </span><span class=\"o\">//</span><span class=\"w\"> </span><span class=\"p\">(</span><span
  class=\"mi\">1024</span><span class=\"w\"> </span><span class=\"o\">**</span><span
  class=\"w\"> </span><span class=\"mi\">3</span><span class=\"p\">)</span><span class=\"si\">}</span><span
  class=\"s2\"> GB&quot;</span><span class=\"p\">)</span>\n<span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;System Memory
  available: </span><span class=\"si\">{</span><span class=\"n\">psutil</span><span
  class=\"o\">.</span><span class=\"n\">virtual_memory</span><span class=\"p\">()</span><span
  class=\"o\">.</span><span class=\"n\">available</span><span class=\"w\"> </span><span
  class=\"o\">//</span><span class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\"> GB&quot;</span><span
  class=\"p\">)</span>\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;System Memory total: </span><span
  class=\"si\">{</span><span class=\"n\">psutil</span><span class=\"o\">.</span><span
  class=\"n\">virtual_memory</span><span class=\"p\">()</span><span class=\"o\">.</span><span
  class=\"n\">total</span><span class=\"w\"> </span><span class=\"o\">//</span><span
  class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\"> GB&quot;</span><span
  class=\"p\">)</span>\n\n\n<span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Hostname: </span><span class=\"si\">{</span><span
  class=\"n\">socket</span><span class=\"o\">.</span><span class=\"n\">gethostname</span><span
  class=\"p\">()</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
  class=\"p\">)</span>\n\n<span class=\"n\">partitions</span> <span class=\"o\">=</span>
  <span class=\"n\">psutil</span><span class=\"o\">.</span><span class=\"n\">disk_partitions</span><span
  class=\"p\">()</span>\n\n<span class=\"k\">for</span> <span class=\"n\">part</span>
  <span class=\"ow\">in</span> <span class=\"n\">partitions</span><span class=\"p\">:</span>\n
  \   <span class=\"n\">mnt</span> <span class=\"o\">=</span> <span class=\"n\">part</span><span
  class=\"o\">.</span><span class=\"n\">mountpoint</span>\n    <span class=\"k\">if</span>
  <span class=\"s2\">&quot;snap&quot;</span> <span class=\"ow\">in</span> <span class=\"n\">mnt</span>
  <span class=\"ow\">or</span> <span class=\"s2\">&quot;boot&quot;</span> <span class=\"ow\">in</span>
  <span class=\"n\">mnt</span><span class=\"p\">:</span>\n        <span class=\"k\">continue</span>\n
  \   <span class=\"n\">disk</span> <span class=\"o\">=</span> <span class=\"n\">psutil</span><span
  class=\"o\">.</span><span class=\"n\">disk_usage</span><span class=\"p\">(</span><span
  class=\"n\">mnt</span><span class=\"p\">)</span>\n    <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;Usage at
  </span><span class=\"si\">{</span><span class=\"n\">mnt</span><span class=\"si\">}</span><span
  class=\"s2\"> on </span><span class=\"si\">{</span><span class=\"n\">part</span><span
  class=\"o\">.</span><span class=\"n\">device</span><span class=\"si\">}</span><span
  class=\"s2\">: </span><span class=\"si\">{</span><span class=\"n\">disk</span><span
  class=\"o\">.</span><span class=\"n\">used</span><span class=\"w\"> </span><span
  class=\"o\">//</span><span class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\"> GB&quot;</span><span
  class=\"p\">)</span>\n    <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Free at </span><span class=\"si\">{</span><span
  class=\"n\">mnt</span><span class=\"si\">}</span><span class=\"s2\"> on </span><span
  class=\"si\">{</span><span class=\"n\">part</span><span class=\"o\">.</span><span
  class=\"n\">device</span><span class=\"si\">}</span><span class=\"s2\">: </span><span
  class=\"si\">{</span><span class=\"n\">disk</span><span class=\"o\">.</span><span
  class=\"n\">free</span><span class=\"w\"> </span><span class=\"o\">//</span><span
  class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">GB&quot;</span><span
  class=\"p\">)</span>\n    <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"sa\">f</span><span class=\"s2\">&quot;Total at </span><span class=\"si\">{</span><span
  class=\"n\">mnt</span><span class=\"si\">}</span><span class=\"s2\"> on </span><span
  class=\"si\">{</span><span class=\"n\">part</span><span class=\"o\">.</span><span
  class=\"n\">device</span><span class=\"si\">}</span><span class=\"s2\">: </span><span
  class=\"si\">{</span><span class=\"n\">disk</span><span class=\"o\">.</span><span
  class=\"n\">total</span><span class=\"w\"> </span><span class=\"o\">//</span><span
  class=\"w\"> </span><span class=\"p\">(</span><span class=\"mi\">1024</span><span
  class=\"w\"> </span><span class=\"o\">**</span><span class=\"w\"> </span><span class=\"mi\">3</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\">GB&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div></p>\n<blockquote>\n<p>Bonus Ipython tip!
  Save this to a script called my_script.py and in Ipython you can %run -m my_script
  to run it!</p>\n</blockquote>\n<div class=\"highlight\"><pre><span></span><code>project<span
  class=\"w\"> </span>↪<span class=\"w\"> </span>main<span class=\"w\"> </span>v3.8.11<span
  class=\"w\"> </span>ipython\n❯<span class=\"w\"> </span>%run<span class=\"w\"> </span>-m<span
  class=\"w\"> </span>system-monitor-psutils\nSystem<span class=\"w\"> </span>Memory<span
  class=\"w\"> </span>used:<span class=\"w\"> </span><span class=\"m\">25</span><span
  class=\"w\"> </span>GB\nSystem<span class=\"w\"> </span>Memory<span class=\"w\">
  </span>available:<span class=\"w\"> </span><span class=\"m\">5</span><span class=\"w\">
  </span>GB\nSystem<span class=\"w\"> </span>Memory<span class=\"w\"> </span>total:<span
  class=\"w\"> </span><span class=\"m\">31</span><span class=\"w\"> </span>GB\nHostname:<span
  class=\"w\"> </span>ryzen-3600x\nUsage<span class=\"w\"> </span>at<span class=\"w\">
  </span>/<span class=\"w\"> </span>on<span class=\"w\"> </span>/dev/nvme1n1p2:<span
  class=\"w\"> </span><span class=\"m\">81</span><span class=\"w\"> </span>GB\nFree<span
  class=\"w\"> </span>at<span class=\"w\"> </span>/<span class=\"w\"> </span>on<span
  class=\"w\"> </span>/dev/nvme1n1p2:<span class=\"w\"> </span><span class=\"m\">351</span><span
  class=\"w\"> </span>GB\nTotal<span class=\"w\"> </span>at<span class=\"w\"> </span>/<span
  class=\"w\"> </span>on<span class=\"w\"> </span>/dev/nvme1n1p2:<span class=\"w\">
  </span><span class=\"m\">456</span><span class=\"w\"> </span>GB\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/pyclean'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Pyclean</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/mu'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Mu</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Here Bonus Ipython tip
now: 2024-08-01 13:40:17.987438
path: pages/til/psutils-01.md
published: true
slug: psutils-01
super_description: Here Bonus Ipython tip
tags:
- python
- tech
templateKey: til
title: Psutil-01
today: 2024-08-01
---

[Mike Driscoll](https://twitter.com/driscollis) has been posting some awesome posts about `psutil` lately.
I'm interested in making my own system monitoring dashboard now using this library.
I don't expect it to compete with Netdata or Glances but it'll just be for fun to see how Python can solve this problem!

__Repo coming soon__

## Example code:
Here's a short snippit to get used/available/total RAM and disk space (on partitions that you probably care about)
```python

import psutil
import socket

print(f"System Memory used: {psutil.virtual_memory().used // (1024 ** 3)} GB")
print(f"System Memory available: {psutil.virtual_memory().available // (1024 ** 3)} GB")
print(f"System Memory total: {psutil.virtual_memory().total // (1024 ** 3)} GB")


print(f"Hostname: {socket.gethostname()}")

partitions = psutil.disk_partitions()

for part in partitions:
    mnt = part.mountpoint
    if "snap" in mnt or "boot" in mnt:
        continue
    disk = psutil.disk_usage(mnt)
    print(f"Usage at {mnt} on {part.device}: {disk.used // (1024 ** 3)} GB")
    print(f"Free at {mnt} on {part.device}: {disk.free // (1024 ** 3)}GB")
    print(f"Total at {mnt} on {part.device}: {disk.total // (1024 ** 3)}GB")
```

> Bonus Ipython tip! Save this to a script called my_script.py and in Ipython you can %run -m my_script to run it!

```bash
project ↪ main v3.8.11 ipython
❯ %run -m system-monitor-psutils
System Memory used: 25 GB
System Memory available: 5 GB
System Memory total: 31 GB
Hostname: ryzen-3600x
Usage at / on /dev/nvme1n1p2: 81 GB
Free at / on /dev/nvme1n1p2: 351 GB
Total at / on /dev/nvme1n1p2: 456 GB
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
    
    <a class='prev' href='/pyclean'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Pyclean</p>
        </div>
    </a>
    
    <a class='next' href='/mu'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Mu</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>