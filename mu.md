---
article_html: "<p>If you work with a template for several projects then you might
  sometimes need to do the same action across all repos.\nA good example of this is
  updating a package in <code>requirements.txt</code> in every project, or refactoring
  a common module.\nIf you have several repos to do this across then it can be time
  consuming... enter <code>mu-repo</code></p>\n<h2 id=\"mu\">Mu</h2>\n<p><a href=\"https://fabioz.github.io/mu-repo/\">mu-repo</a>
  is an awesome cli tool for working with multiple git repositories at the same time.
  \nThere are several things you can do:</p>\n<ol>\n<li><code>mu status</code> will
  give you the <code>git status</code> of every registered repo (see below)</li>\n<li><code>mu
  sh</code> will let you execute system level commands in every repo</li>\n<li><code>mu
  stash</code> will stash all changes across all registered repos</li>\n<li>There's
  literally a ton more but these are some handy ones</li>\n</ol>\n<h2 id=\"registration\">Registration</h2>\n<p><code>mu</code>
  tracks its own <code>groups</code>, and there is a default group when no particular
  one is active.\nIt's as simple as <code>mu register proj1 prog2 ...</code> to get
  repos registered</p>\n<div class=\"highlight\"><pre><span></span><code>❯<span class=\"w\">
  </span>mu<span class=\"w\"> </span>register<span class=\"w\"> </span>proj1<span
  class=\"w\"> </span>proj2\nRepository:<span class=\"w\"> </span>proj1<span class=\"w\">
  </span>registered\nRepository:<span class=\"w\"> </span>proj2<span class=\"w\">
  </span>registered\n\n❯<span class=\"w\"> </span>mu<span class=\"w\"> </span>status\n\n<span
  class=\"w\">  </span>proj1<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span
  class=\"w\"> </span>status\n<span class=\"w\">    </span>On<span class=\"w\"> </span>branch<span
  class=\"w\"> </span>main\n\n<span class=\"w\">    </span>No<span class=\"w\"> </span>commits<span
  class=\"w\"> </span>yet\n\n<span class=\"w\">    </span>Untracked<span class=\"w\">
  </span>files:\n<span class=\"w\">    </span><span class=\"o\">(</span>use<span class=\"w\">
  </span><span class=\"s2\">&quot;git add &lt;file&gt;...&quot;</span><span class=\"w\">
  </span>to<span class=\"w\"> </span>include<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>what<span class=\"w\"> </span>will<span class=\"w\"> </span>be<span
  class=\"w\"> </span>committed<span class=\"o\">)</span>\n<span class=\"w\">    </span>requirements.txt\n\n<span
  class=\"w\">    </span>nothing<span class=\"w\"> </span>added<span class=\"w\">
  </span>to<span class=\"w\"> </span>commit<span class=\"w\"> </span>but<span class=\"w\">
  </span>untracked<span class=\"w\"> </span>files<span class=\"w\"> </span>present<span
  class=\"w\"> </span><span class=\"o\">(</span>use<span class=\"w\"> </span><span
  class=\"s2\">&quot;git add&quot;</span><span class=\"w\"> </span>to<span class=\"w\">
  </span>track<span class=\"o\">)</span>\n\n<span class=\"w\">  </span>proj2<span
  class=\"w\"> </span>:<span class=\"w\"> </span>git<span class=\"w\"> </span>status\n<span
  class=\"w\">    </span>On<span class=\"w\"> </span>branch<span class=\"w\"> </span>main\n\n<span
  class=\"w\">    </span>No<span class=\"w\"> </span>commits<span class=\"w\"> </span>yet\n\n<span
  class=\"w\">    </span>Changes<span class=\"w\"> </span>to<span class=\"w\"> </span>be<span
  class=\"w\"> </span>committed:\n<span class=\"w\">    </span><span class=\"o\">(</span>use<span
  class=\"w\"> </span><span class=\"s2\">&quot;git rm --cached &lt;file&gt;...&quot;</span><span
  class=\"w\"> </span>to<span class=\"w\"> </span>unstage<span class=\"o\">)</span>\n<span
  class=\"w\">    </span>new<span class=\"w\"> </span>file:<span class=\"w\">   </span>requirements.txt\n</code></pre></div>\n<h2
  id=\"working-with-mu\">Working with mu</h2>\n<p>As you can see above I have two
  projects each with a <code>requirements.txt</code> added but not committed yet.\nUsing
  <code>mu</code> I can stage this change across both repos at once.</p>\n<div class=\"highlight\"><pre><span></span><code>❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>add<span class=\"w\"> </span>requirements.txt\n\n<span
  class=\"w\">  </span>proj1<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span
  class=\"w\"> </span>add<span class=\"w\"> </span>requirements.txt\n\n<span class=\"w\">
  \ </span>proj2<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span class=\"w\">
  </span>add<span class=\"w\"> </span>requirements.txt\n</code></pre></div>\n<p>Then
  as you might imagine, I can make the commit in each repo</p>\n<div class=\"highlight\"><pre><span></span><code>❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>commit<span class=\"w\"> </span>-m<span
  class=\"w\"> </span><span class=\"s2\">&quot;Add requirements.txts&quot;</span>\n\n<span
  class=\"w\">  </span>proj1<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span
  class=\"w\"> </span>commit<span class=\"w\"> </span>-m<span class=\"w\"> </span>Add<span
  class=\"w\"> </span>requirements.txts\n<span class=\"w\">    </span><span class=\"o\">[</span>main<span
  class=\"w\"> </span><span class=\"o\">(</span>root-commit<span class=\"o\">)</span><span
  class=\"w\"> </span>18376d7<span class=\"o\">]</span><span class=\"w\"> </span>Add<span
  class=\"w\"> </span>requirements.txts\n<span class=\"w\">    </span><span class=\"m\">1</span><span
  class=\"w\"> </span>file<span class=\"w\"> </span>changed,<span class=\"w\"> </span><span
  class=\"m\">1</span><span class=\"w\"> </span>insertion<span class=\"o\">(</span>+<span
  class=\"o\">)</span>\n<span class=\"w\">    </span>create<span class=\"w\"> </span>mode<span
  class=\"w\"> </span><span class=\"m\">100644</span><span class=\"w\"> </span>requirements.txt\n\n<span
  class=\"w\">  </span>proj2<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span
  class=\"w\"> </span>commit<span class=\"w\"> </span>-m<span class=\"w\"> </span>Add<span
  class=\"w\"> </span>requirements.txts\n<span class=\"w\">    </span><span class=\"o\">[</span>main<span
  class=\"w\"> </span><span class=\"o\">(</span>root-commit<span class=\"o\">)</span><span
  class=\"w\"> </span>18376d7<span class=\"o\">]</span><span class=\"w\"> </span>Add<span
  class=\"w\"> </span>requirements.txts\n<span class=\"w\">    </span><span class=\"m\">1</span><span
  class=\"w\"> </span>file<span class=\"w\"> </span>changed,<span class=\"w\"> </span><span
  class=\"m\">1</span><span class=\"w\"> </span>insertion<span class=\"o\">(</span>+<span
  class=\"o\">)</span>\n<span class=\"w\">    </span>create<span class=\"w\"> </span>mode<span
  class=\"w\"> </span><span class=\"m\">100644</span><span class=\"w\"> </span>requirements.txt\n</code></pre></div>\n<h2
  id=\"mu-groups\">mu groups</h2>\n<p>The other thing I got a lot of use out of recently
  was <code>mu</code>'s groups.\nAt work I have about 40 repos cloned that are all
  based on the same kedro pipeline template.\nSome of these projects have been deprecated.\nI
  also have several more repos that are not kedro template - custom libraries or something.\n<code>group</code>
  let me utilize <code>mu</code> across different groups of repos.</p>\n<p>Say <code>proj2</code>
  is a deprecated project that I don't need to worry about making changes to anymore.\nI
  don't just have to unregister it, instead I can make a group called \"active\" and
  register <code>proj1</code> in that group</p>\n<div class=\"highlight\"><pre><span></span><code>❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>group<span class=\"w\"> </span>add<span
  class=\"w\"> </span>active<span class=\"w\"> </span>--empty\n\n~/personal\n❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>group<span class=\"w\"> </span>add<span
  class=\"w\"> </span>deprecated<span class=\"w\"> </span>--empty\n\n~/personal\n❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>group\n<span class=\"w\">  </span>active\n*<span
  class=\"w\"> </span>deprecated\n</code></pre></div>\n<p>The <code>*</code> tells
  me which group is active. \nThe <code>--empty</code> flag tells <code>mu</code>
  to not add all registered repos to that group.\nIf I don't want to use any groups
  then <code>mu group reset</code> will go back to the default group with all registered
  repos.</p>\n<p>With groups I can register only the repos that I want to be working
  across in their own group and not worry about affecting other repos with my batch
  changes!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
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
  \   </style>\n\n    <a class='prev' href='/psutils-01'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Psutil-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/wireguard'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Wireguard</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/mu.png
date: 2022-03-15
datetime: 2022-03-15 00:00:00+00:00
description: 'If you work with a template for several projects then you might sometimes
  need to do the same action across all repos. mu status mu sh mu stash There mu As
  you '
edit_link: https://github.com/edit/main/pages/til/mu.md
html: "<p>If you work with a template for several projects then you might sometimes
  need to do the same action across all repos.\nA good example of this is updating
  a package in <code>requirements.txt</code> in every project, or refactoring a common
  module.\nIf you have several repos to do this across then it can be time consuming...
  enter <code>mu-repo</code></p>\n<h2 id=\"mu\">Mu</h2>\n<p><a href=\"https://fabioz.github.io/mu-repo/\">mu-repo</a>
  is an awesome cli tool for working with multiple git repositories at the same time.
  \nThere are several things you can do:</p>\n<ol>\n<li><code>mu status</code> will
  give you the <code>git status</code> of every registered repo (see below)</li>\n<li><code>mu
  sh</code> will let you execute system level commands in every repo</li>\n<li><code>mu
  stash</code> will stash all changes across all registered repos</li>\n<li>There's
  literally a ton more but these are some handy ones</li>\n</ol>\n<h2 id=\"registration\">Registration</h2>\n<p><code>mu</code>
  tracks its own <code>groups</code>, and there is a default group when no particular
  one is active.\nIt's as simple as <code>mu register proj1 prog2 ...</code> to get
  repos registered</p>\n<div class=\"highlight\"><pre><span></span><code>❯<span class=\"w\">
  </span>mu<span class=\"w\"> </span>register<span class=\"w\"> </span>proj1<span
  class=\"w\"> </span>proj2\nRepository:<span class=\"w\"> </span>proj1<span class=\"w\">
  </span>registered\nRepository:<span class=\"w\"> </span>proj2<span class=\"w\">
  </span>registered\n\n❯<span class=\"w\"> </span>mu<span class=\"w\"> </span>status\n\n<span
  class=\"w\">  </span>proj1<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span
  class=\"w\"> </span>status\n<span class=\"w\">    </span>On<span class=\"w\"> </span>branch<span
  class=\"w\"> </span>main\n\n<span class=\"w\">    </span>No<span class=\"w\"> </span>commits<span
  class=\"w\"> </span>yet\n\n<span class=\"w\">    </span>Untracked<span class=\"w\">
  </span>files:\n<span class=\"w\">    </span><span class=\"o\">(</span>use<span class=\"w\">
  </span><span class=\"s2\">&quot;git add &lt;file&gt;...&quot;</span><span class=\"w\">
  </span>to<span class=\"w\"> </span>include<span class=\"w\"> </span><span class=\"k\">in</span><span
  class=\"w\"> </span>what<span class=\"w\"> </span>will<span class=\"w\"> </span>be<span
  class=\"w\"> </span>committed<span class=\"o\">)</span>\n<span class=\"w\">    </span>requirements.txt\n\n<span
  class=\"w\">    </span>nothing<span class=\"w\"> </span>added<span class=\"w\">
  </span>to<span class=\"w\"> </span>commit<span class=\"w\"> </span>but<span class=\"w\">
  </span>untracked<span class=\"w\"> </span>files<span class=\"w\"> </span>present<span
  class=\"w\"> </span><span class=\"o\">(</span>use<span class=\"w\"> </span><span
  class=\"s2\">&quot;git add&quot;</span><span class=\"w\"> </span>to<span class=\"w\">
  </span>track<span class=\"o\">)</span>\n\n<span class=\"w\">  </span>proj2<span
  class=\"w\"> </span>:<span class=\"w\"> </span>git<span class=\"w\"> </span>status\n<span
  class=\"w\">    </span>On<span class=\"w\"> </span>branch<span class=\"w\"> </span>main\n\n<span
  class=\"w\">    </span>No<span class=\"w\"> </span>commits<span class=\"w\"> </span>yet\n\n<span
  class=\"w\">    </span>Changes<span class=\"w\"> </span>to<span class=\"w\"> </span>be<span
  class=\"w\"> </span>committed:\n<span class=\"w\">    </span><span class=\"o\">(</span>use<span
  class=\"w\"> </span><span class=\"s2\">&quot;git rm --cached &lt;file&gt;...&quot;</span><span
  class=\"w\"> </span>to<span class=\"w\"> </span>unstage<span class=\"o\">)</span>\n<span
  class=\"w\">    </span>new<span class=\"w\"> </span>file:<span class=\"w\">   </span>requirements.txt\n</code></pre></div>\n<h2
  id=\"working-with-mu\">Working with mu</h2>\n<p>As you can see above I have two
  projects each with a <code>requirements.txt</code> added but not committed yet.\nUsing
  <code>mu</code> I can stage this change across both repos at once.</p>\n<div class=\"highlight\"><pre><span></span><code>❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>add<span class=\"w\"> </span>requirements.txt\n\n<span
  class=\"w\">  </span>proj1<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span
  class=\"w\"> </span>add<span class=\"w\"> </span>requirements.txt\n\n<span class=\"w\">
  \ </span>proj2<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span class=\"w\">
  </span>add<span class=\"w\"> </span>requirements.txt\n</code></pre></div>\n<p>Then
  as you might imagine, I can make the commit in each repo</p>\n<div class=\"highlight\"><pre><span></span><code>❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>commit<span class=\"w\"> </span>-m<span
  class=\"w\"> </span><span class=\"s2\">&quot;Add requirements.txts&quot;</span>\n\n<span
  class=\"w\">  </span>proj1<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span
  class=\"w\"> </span>commit<span class=\"w\"> </span>-m<span class=\"w\"> </span>Add<span
  class=\"w\"> </span>requirements.txts\n<span class=\"w\">    </span><span class=\"o\">[</span>main<span
  class=\"w\"> </span><span class=\"o\">(</span>root-commit<span class=\"o\">)</span><span
  class=\"w\"> </span>18376d7<span class=\"o\">]</span><span class=\"w\"> </span>Add<span
  class=\"w\"> </span>requirements.txts\n<span class=\"w\">    </span><span class=\"m\">1</span><span
  class=\"w\"> </span>file<span class=\"w\"> </span>changed,<span class=\"w\"> </span><span
  class=\"m\">1</span><span class=\"w\"> </span>insertion<span class=\"o\">(</span>+<span
  class=\"o\">)</span>\n<span class=\"w\">    </span>create<span class=\"w\"> </span>mode<span
  class=\"w\"> </span><span class=\"m\">100644</span><span class=\"w\"> </span>requirements.txt\n\n<span
  class=\"w\">  </span>proj2<span class=\"w\"> </span>:<span class=\"w\"> </span>git<span
  class=\"w\"> </span>commit<span class=\"w\"> </span>-m<span class=\"w\"> </span>Add<span
  class=\"w\"> </span>requirements.txts\n<span class=\"w\">    </span><span class=\"o\">[</span>main<span
  class=\"w\"> </span><span class=\"o\">(</span>root-commit<span class=\"o\">)</span><span
  class=\"w\"> </span>18376d7<span class=\"o\">]</span><span class=\"w\"> </span>Add<span
  class=\"w\"> </span>requirements.txts\n<span class=\"w\">    </span><span class=\"m\">1</span><span
  class=\"w\"> </span>file<span class=\"w\"> </span>changed,<span class=\"w\"> </span><span
  class=\"m\">1</span><span class=\"w\"> </span>insertion<span class=\"o\">(</span>+<span
  class=\"o\">)</span>\n<span class=\"w\">    </span>create<span class=\"w\"> </span>mode<span
  class=\"w\"> </span><span class=\"m\">100644</span><span class=\"w\"> </span>requirements.txt\n</code></pre></div>\n<h2
  id=\"mu-groups\">mu groups</h2>\n<p>The other thing I got a lot of use out of recently
  was <code>mu</code>'s groups.\nAt work I have about 40 repos cloned that are all
  based on the same kedro pipeline template.\nSome of these projects have been deprecated.\nI
  also have several more repos that are not kedro template - custom libraries or something.\n<code>group</code>
  let me utilize <code>mu</code> across different groups of repos.</p>\n<p>Say <code>proj2</code>
  is a deprecated project that I don't need to worry about making changes to anymore.\nI
  don't just have to unregister it, instead I can make a group called \"active\" and
  register <code>proj1</code> in that group</p>\n<div class=\"highlight\"><pre><span></span><code>❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>group<span class=\"w\"> </span>add<span
  class=\"w\"> </span>active<span class=\"w\"> </span>--empty\n\n~/personal\n❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>group<span class=\"w\"> </span>add<span
  class=\"w\"> </span>deprecated<span class=\"w\"> </span>--empty\n\n~/personal\n❯<span
  class=\"w\"> </span>mu<span class=\"w\"> </span>group\n<span class=\"w\">  </span>active\n*<span
  class=\"w\"> </span>deprecated\n</code></pre></div>\n<p>The <code>*</code> tells
  me which group is active. \nThe <code>--empty</code> flag tells <code>mu</code>
  to not add all registered repos to that group.\nIf I don't want to use any groups
  then <code>mu group reset</code> will go back to the default group with all registered
  repos.</p>\n<p>With groups I can register only the repos that I want to be working
  across in their own group and not worry about affecting other repos with my batch
  changes!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
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
  \   </style>\n\n    <a class='prev' href='/psutils-01'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Psutil-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/wireguard'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Wireguard</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: If you work with a template for several projects then you might
  sometimes need to do the same action across all repos. mu status mu sh mu stash
  There mu As you can see above I have two projects each with a  Then as you might
  imagine, I can make the c
now: 2024-01-05 14:15:22.253637
path: pages/til/mu.md
published: true
slug: mu
super_description: If you work with a template for several projects then you might
  sometimes need to do the same action across all repos. mu status mu sh mu stash
  There mu As you can see above I have two projects each with a  Then as you might
  imagine, I can make the commit in each repo The other thing I got a lot of use out
  of recently was  Say  The  With groups I can register only the repos that I want
  to be working across in their own group and not worry about affecting other repos
  with my batch changes
tags:
- python
- git
- tech
templateKey: til
title: Mu
today: 2024-01-05
---

If you work with a template for several projects then you might sometimes need to do the same action across all repos.
A good example of this is updating a package in `requirements.txt` in every project, or refactoring a common module.
If you have several repos to do this across then it can be time consuming... enter `mu-repo`


## Mu

[mu-repo](https://fabioz.github.io/mu-repo/) is an awesome cli tool for working with multiple git repositories at the same time. 
There are several things you can do:

1. `mu status` will give you the `git status` of every registered repo (see below)
2. `mu sh` will let you execute system level commands in every repo
3. `mu stash` will stash all changes across all registered repos
4. There's literally a ton more but these are some handy ones


## Registration

`mu` tracks its own `groups`, and there is a default group when no particular one is active.
It's as simple as `mu register proj1 prog2 ...` to get repos registered

```bash 

❯ mu register proj1 proj2
Repository: proj1 registered
Repository: proj2 registered

❯ mu status

  proj1 : git status
    On branch main

    No commits yet

    Untracked files:
    (use "git add <file>..." to include in what will be committed)
    requirements.txt

    nothing added to commit but untracked files present (use "git add" to track)

  proj2 : git status
    On branch main

    No commits yet

    Changes to be committed:
    (use "git rm --cached <file>..." to unstage)
    new file:   requirements.txt


```

## Working with mu

As you can see above I have two projects each with a `requirements.txt` added but not committed yet.
Using `mu` I can stage this change across both repos at once.

```bash  

❯ mu add requirements.txt

  proj1 : git add requirements.txt

  proj2 : git add requirements.txt
```

Then as you might imagine, I can make the commit in each repo


```bash

❯ mu commit -m "Add requirements.txts"

  proj1 : git commit -m Add requirements.txts
    [main (root-commit) 18376d7] Add requirements.txts
    1 file changed, 1 insertion(+)
    create mode 100644 requirements.txt

  proj2 : git commit -m Add requirements.txts
    [main (root-commit) 18376d7] Add requirements.txts
    1 file changed, 1 insertion(+)
    create mode 100644 requirements.txt
```

## mu groups

The other thing I got a lot of use out of recently was `mu`'s groups.
At work I have about 40 repos cloned that are all based on the same kedro pipeline template.
Some of these projects have been deprecated.
I also have several more repos that are not kedro template - custom libraries or something.
`group` let me utilize `mu` across different groups of repos.

Say `proj2` is a deprecated project that I don't need to worry about making changes to anymore.
I don't just have to unregister it, instead I can make a group called "active" and register `proj1` in that group

```bash

❯ mu group add active --empty

~/personal
❯ mu group add deprecated --empty

~/personal
❯ mu group
  active
* deprecated

```


The `*` tells me which group is active. 
The `--empty` flag tells `mu` to not add all registered repos to that group.
If I don't want to use any groups then `mu group reset` will go back to the default group with all registered repos.

With groups I can register only the repos that I want to be working across in their own group and not worry about affecting other repos with my batch changes!
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
    
    <a class='prev' href='/psutils-01'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Psutil-01</p>
        </div>
    </a>
    
    <a class='next' href='/wireguard'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Wireguard</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>