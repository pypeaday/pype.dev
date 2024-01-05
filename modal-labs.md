---
article_html: "<p>Playing around with Modal Labs</p>\n<p>One of the first things I
  tried was a regular cron job...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nd\">@stub</span><span class=\"o\">.</span><span class=\"n\">function</span><span
  class=\"p\">(</span>\n    <span class=\"n\">schedule</span><span class=\"o\">=</span><span
  class=\"n\">modal</span><span class=\"o\">.</span><span class=\"n\">Period</span><span
  class=\"p\">(</span><span class=\"n\">minutes</span><span class=\"o\">=</span><span
  class=\"mi\">59</span><span class=\"p\">),</span> <span class=\"n\">secret</span><span
  class=\"o\">=</span><span class=\"n\">modal</span><span class=\"o\">.</span><span
  class=\"n\">Secret</span><span class=\"o\">.</span><span class=\"n\">from_name</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;my-dummy-secret&quot;</span><span class=\"p\">)</span>\n<span
  class=\"p\">)</span>\n<span class=\"k\">def</span> <span class=\"nf\">say_hi</span><span
  class=\"p\">():</span>\n    <span class=\"n\">now</span> <span class=\"o\">=</span>
  <span class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">ctime</span><span
  class=\"p\">()</span>\n    <span class=\"n\">secret</span> <span class=\"o\">=</span>
  <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;dummy-secret&quot;</span><span class=\"p\">)</span>\n    <span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
  class=\"s2\">&quot;Hello </span><span class=\"si\">{</span><span class=\"n\">os</span><span
  class=\"o\">.</span><span class=\"n\">environ</span><span class=\"o\">.</span><span
  class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;USER&#39;</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Rodney&#39;</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\"> at </span><span
  class=\"si\">{</span><span class=\"n\">now</span><span class=\"si\">}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">)</span>\n    <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;</span><span
  class=\"si\">{</span><span class=\"n\">secret</span><span class=\"si\">=}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p>This
  can get deployed with <code>modal deploy --name &lt;app name&gt; &lt;path to .py
  file with the stub and function defined in it&gt;</code></p>\n<p>This function gets
  deployed as an app that I conveniently call <code>say_hi</code> (as far\nas I can
  tell the app name can be anything - as I add functions to this same\napp and deploy
  with the same name to get a new version)</p>\n<p>Notice that this also is an example
  of giving access to a secret - defined in the Modal Labs dashboard</p>\n<p>We can
  take a look at the apps running at <a href=\"https://modal.com/apps\">https://modal.com/apps</a></p>\n<p>I
  then added another function to experiment with custom container images and\nsaw
  then that Modal will just slap a new version on anything provisioned with\nthe same
  name (intuitive enough for sure) so when I add functions to my .py\nscript and run
  <code>modal deploy --name say_hi myscript.py</code> over and over, the app\ncalled
  <code>say_hi</code> in the Modal apps dashboard just gets a new version</p>\n<p>This
  means I can spin up several instances of functionally the same app but with different
  names/versions etc... \nQ: Maybe there's gitops or policy stuff builtin to app names
  then?</p>\n<p>I needed to take down an app I deployed as a duplicate but you don't
  stop apps\nby name, you stop them by an id... see below</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"go\">modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)</span>\n<span
  class=\"go\">✗ modal app stop --help</span>\n\n<span class=\"go\"> Usage: modal
  app stop [OPTIONS] APP_ID</span>\n\n<span class=\"go\"> Stop an app.</span>\n\n<span
  class=\"go\">╭─ Arguments ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮</span>\n<span
  class=\"go\">│ *    app_id      TEXT  [default: None] [required]                                                                                                │</span>\n<span
  class=\"go\">╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"go\">╭─ Options ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮</span>\n<span
  class=\"go\">│ --help          Show this message and exit.                                                                                                      │</span>\n<span
  class=\"go\">╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n\n\n<span
  class=\"go\">modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)</span>\n<span
  class=\"go\">❯ modal app list</span>\n<span class=\"go\">┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┓</span>\n<span
  class=\"go\">┃ App ID                    ┃ Description         ┃ State    ┃ Creation
  time             ┃ Stop time                 ┃</span>\n<span class=\"go\">┡━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━┩</span>\n<span
  class=\"go\">│ ap-lzy1AAuVy7POFkUcDKRxpQ │ print_info          │ deployed │ 2022-12-28
  20:59:07-06:00 │                           │</span>\n<span class=\"go\">│ ap-qYjE45dciqgT3C3CpNp3RL
  │ say_hi              │ deployed │ 2022-12-28 19:49:22-06:00 │                           │</span>\n<span
  class=\"go\">│ ap-X7FYneUeYV5IKHcyirSb87 │ link-scraper        │ stopped  │ 2022-12-28
  15:39:02-06:00 │ 2022-12-28 15:39:04-06:00 │</span>\n<span class=\"go\">│ ap-UOXTUU4uSRx2UZypJOcAsk
  │ example-get-started │ stopped  │ 2022-12-28 15:17:47-06:00 │ 2022-12-28 15:17:49-06:00
  │</span>\n<span class=\"go\">└───────────────────────────┴─────────────────────┴──────────┴───────────────────────────┴───────────────────────────┘</span>\n\n<span
  class=\"go\">modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)</span>\n<span
  class=\"go\">❯ modal app stop ap-lzy1AAuVy7POFkUcDKRxpQ</span>\n</code></pre></div>\n<h1
  id=\"git-warning\">Git warning!</h1>\n<p>I ran <code>modal deploy ...</code> after
  comitting some stuff I wanted to try BUT I had\nchanges in my file I didn't want
  to deploy... some git safety would be nice for\ndeployment!</p>\n<blockquote>\n<p>git
  stash &amp;&amp; modal deploy .. &amp;&amp; git stash pop</p>\n</blockquote>\n<p>Question
  for Modal team - in my modal sandbox repo at commit: \n<div class=\"highlight\"><pre><span></span><code>aab6162
  (HEAD -&gt; main) HEAD@{1}: commit: print base version of my own image to prove
  it to me\n 1 file changed, 2 insertions(+)\n</code></pre></div></p>\n<p>An environment
  variable, <code>BASE_VERSION</code> that I expect to be in my base image\nwas not
  available to the python function in my Modal app... hopefully the log\nis still\n<a
  href=\"https://modal.com/logs/ap-qYjE45dciqgT3C3CpNp3RL?functionId=fu-rOt31ShRE1W1CQfuf02fsq&amp;taskId=ta-dm8BfiblvFLwVIQyt75YC2&amp;inputId=in-n64klEFrLtbcm2BiykJEvW\">here</a></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/git-worktrees-01'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Git-Worktrees-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/jellyfin-media-players'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Jellyfin-Media-Players</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-12-28
datetime: 2022-12-28 00:00:00+00:00
description: 'Playing around with Modal Labs One of the first things I tried was a
  regular cron job... This can get deployed with  This function gets deployed as an
  app that '
edit_link: https://github.com/edit/main/pages/blog/modal-labs.md
html: "<p>Playing around with Modal Labs</p>\n<p>One of the first things I tried was
  a regular cron job...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"nd\">@stub</span><span class=\"o\">.</span><span class=\"n\">function</span><span
  class=\"p\">(</span>\n    <span class=\"n\">schedule</span><span class=\"o\">=</span><span
  class=\"n\">modal</span><span class=\"o\">.</span><span class=\"n\">Period</span><span
  class=\"p\">(</span><span class=\"n\">minutes</span><span class=\"o\">=</span><span
  class=\"mi\">59</span><span class=\"p\">),</span> <span class=\"n\">secret</span><span
  class=\"o\">=</span><span class=\"n\">modal</span><span class=\"o\">.</span><span
  class=\"n\">Secret</span><span class=\"o\">.</span><span class=\"n\">from_name</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;my-dummy-secret&quot;</span><span class=\"p\">)</span>\n<span
  class=\"p\">)</span>\n<span class=\"k\">def</span> <span class=\"nf\">say_hi</span><span
  class=\"p\">():</span>\n    <span class=\"n\">now</span> <span class=\"o\">=</span>
  <span class=\"n\">time</span><span class=\"o\">.</span><span class=\"n\">ctime</span><span
  class=\"p\">()</span>\n    <span class=\"n\">secret</span> <span class=\"o\">=</span>
  <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
  class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;dummy-secret&quot;</span><span class=\"p\">)</span>\n    <span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
  class=\"s2\">&quot;Hello </span><span class=\"si\">{</span><span class=\"n\">os</span><span
  class=\"o\">.</span><span class=\"n\">environ</span><span class=\"o\">.</span><span
  class=\"n\">get</span><span class=\"p\">(</span><span class=\"s1\">&#39;USER&#39;</span><span
  class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;Rodney&#39;</span><span
  class=\"p\">)</span><span class=\"si\">}</span><span class=\"s2\"> at </span><span
  class=\"si\">{</span><span class=\"n\">now</span><span class=\"si\">}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">)</span>\n    <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"sa\">f</span><span class=\"s2\">&quot;</span><span
  class=\"si\">{</span><span class=\"n\">secret</span><span class=\"si\">=}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p>This
  can get deployed with <code>modal deploy --name &lt;app name&gt; &lt;path to .py
  file with the stub and function defined in it&gt;</code></p>\n<p>This function gets
  deployed as an app that I conveniently call <code>say_hi</code> (as far\nas I can
  tell the app name can be anything - as I add functions to this same\napp and deploy
  with the same name to get a new version)</p>\n<p>Notice that this also is an example
  of giving access to a secret - defined in the Modal Labs dashboard</p>\n<p>We can
  take a look at the apps running at <a href=\"https://modal.com/apps\">https://modal.com/apps</a></p>\n<p>I
  then added another function to experiment with custom container images and\nsaw
  then that Modal will just slap a new version on anything provisioned with\nthe same
  name (intuitive enough for sure) so when I add functions to my .py\nscript and run
  <code>modal deploy --name say_hi myscript.py</code> over and over, the app\ncalled
  <code>say_hi</code> in the Modal apps dashboard just gets a new version</p>\n<p>This
  means I can spin up several instances of functionally the same app but with different
  names/versions etc... \nQ: Maybe there's gitops or policy stuff builtin to app names
  then?</p>\n<p>I needed to take down an app I deployed as a duplicate but you don't
  stop apps\nby name, you stop them by an id... see below</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"go\">modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)</span>\n<span
  class=\"go\">✗ modal app stop --help</span>\n\n<span class=\"go\"> Usage: modal
  app stop [OPTIONS] APP_ID</span>\n\n<span class=\"go\"> Stop an app.</span>\n\n<span
  class=\"go\">╭─ Arguments ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮</span>\n<span
  class=\"go\">│ *    app_id      TEXT  [default: None] [required]                                                                                                │</span>\n<span
  class=\"go\">╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"go\">╭─ Options ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮</span>\n<span
  class=\"go\">│ --help          Show this message and exit.                                                                                                      │</span>\n<span
  class=\"go\">╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n\n\n<span
  class=\"go\">modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)</span>\n<span
  class=\"go\">❯ modal app list</span>\n<span class=\"go\">┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┓</span>\n<span
  class=\"go\">┃ App ID                    ┃ Description         ┃ State    ┃ Creation
  time             ┃ Stop time                 ┃</span>\n<span class=\"go\">┡━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━┩</span>\n<span
  class=\"go\">│ ap-lzy1AAuVy7POFkUcDKRxpQ │ print_info          │ deployed │ 2022-12-28
  20:59:07-06:00 │                           │</span>\n<span class=\"go\">│ ap-qYjE45dciqgT3C3CpNp3RL
  │ say_hi              │ deployed │ 2022-12-28 19:49:22-06:00 │                           │</span>\n<span
  class=\"go\">│ ap-X7FYneUeYV5IKHcyirSb87 │ link-scraper        │ stopped  │ 2022-12-28
  15:39:02-06:00 │ 2022-12-28 15:39:04-06:00 │</span>\n<span class=\"go\">│ ap-UOXTUU4uSRx2UZypJOcAsk
  │ example-get-started │ stopped  │ 2022-12-28 15:17:47-06:00 │ 2022-12-28 15:17:49-06:00
  │</span>\n<span class=\"go\">└───────────────────────────┴─────────────────────┴──────────┴───────────────────────────┴───────────────────────────┘</span>\n\n<span
  class=\"go\">modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)</span>\n<span
  class=\"go\">❯ modal app stop ap-lzy1AAuVy7POFkUcDKRxpQ</span>\n</code></pre></div>\n<h1
  id=\"git-warning\">Git warning!</h1>\n<p>I ran <code>modal deploy ...</code> after
  comitting some stuff I wanted to try BUT I had\nchanges in my file I didn't want
  to deploy... some git safety would be nice for\ndeployment!</p>\n<blockquote>\n<p>git
  stash &amp;&amp; modal deploy .. &amp;&amp; git stash pop</p>\n</blockquote>\n<p>Question
  for Modal team - in my modal sandbox repo at commit: \n<div class=\"highlight\"><pre><span></span><code>aab6162
  (HEAD -&gt; main) HEAD@{1}: commit: print base version of my own image to prove
  it to me\n 1 file changed, 2 insertions(+)\n</code></pre></div></p>\n<p>An environment
  variable, <code>BASE_VERSION</code> that I expect to be in my base image\nwas not
  available to the python function in my Modal app... hopefully the log\nis still\n<a
  href=\"https://modal.com/logs/ap-qYjE45dciqgT3C3CpNp3RL?functionId=fu-rOt31ShRE1W1CQfuf02fsq&amp;taskId=ta-dm8BfiblvFLwVIQyt75YC2&amp;inputId=in-n64klEFrLtbcm2BiykJEvW\">here</a></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/git-worktrees-01'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Git-Worktrees-01</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/jellyfin-media-players'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Jellyfin-Media-Players</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Playing around with Modal Labs One of the first things I tried was
  a regular cron job... This can get deployed with  This function gets deployed as
  an app that I conveniently call  Notice that this also is an example of giving access
  to a secret - de
now: 2024-01-05 14:15:22.253507
path: pages/blog/modal-labs.md
published: false
slug: modal-labs
super_description: Playing around with Modal Labs One of the first things I tried
  was a regular cron job... This can get deployed with  This function gets deployed
  as an app that I conveniently call  Notice that this also is an example of giving
  access to a secret - defined in the Modal Labs dashboard We can take a look at the
  apps running at  I then added another function to experiment with custom container
  images and This means I can spin up several instances of functionally the same app
  but with different names
tags:
- python
- cli
- tech
templateKey: blog-post
title: Modal Labs
today: 2024-01-05
---

Playing around with Modal Labs


One of the first things I tried was a regular cron job...

```python
@stub.function(
    schedule=modal.Period(minutes=59), secret=modal.Secret.from_name("my-dummy-secret")
)
def say_hi():
    now = time.ctime()
    secret = os.environ.get("dummy-secret")
    print(f"Hello {os.environ.get('USER', 'Rodney')} at {now}")
    print(f"{secret=}")

```

This can get deployed with `modal deploy --name <app name> <path to .py file with the stub and function defined in it> `

This function gets deployed as an app that I conveniently call `say_hi` (as far
as I can tell the app name can be anything - as I add functions to this same
app and deploy with the same name to get a new version)

Notice that this also is an example of giving access to a secret - defined in the Modal Labs dashboard

We can take a look at the apps running at [https://modal.com/apps](https://modal.com/apps)

I then added another function to experiment with custom container images and
saw then that Modal will just slap a new version on anything provisioned with
the same name (intuitive enough for sure) so when I add functions to my .py
script and run `modal deploy --name say_hi myscript.py` over and over, the app
called `say_hi` in the Modal apps dashboard just gets a new version

This means I can spin up several instances of functionally the same app but with different names/versions etc... 
Q: Maybe there's gitops or policy stuff builtin to app names then?

I needed to take down an app I deployed as a duplicate but you don't stop apps
by name, you stop them by an id... see below


```console

modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)
✗ modal app stop --help

 Usage: modal app stop [OPTIONS] APP_ID

 Stop an app.

╭─ Arguments ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ *    app_id      TEXT  [default: None] [required]                                                                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ --help          Show this message and exit.                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯


modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)
❯ modal app list
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ App ID                    ┃ Description         ┃ State    ┃ Creation time             ┃ Stop time                 ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ ap-lzy1AAuVy7POFkUcDKRxpQ │ print_info          │ deployed │ 2022-12-28 20:59:07-06:00 │                           │
│ ap-qYjE45dciqgT3C3CpNp3RL │ say_hi              │ deployed │ 2022-12-28 19:49:22-06:00 │                           │
│ ap-X7FYneUeYV5IKHcyirSb87 │ link-scraper        │ stopped  │ 2022-12-28 15:39:02-06:00 │ 2022-12-28 15:39:04-06:00 │
│ ap-UOXTUU4uSRx2UZypJOcAsk │ example-get-started │ stopped  │ 2022-12-28 15:17:47-06:00 │ 2022-12-28 15:17:49-06:00 │
└───────────────────────────┴─────────────────────┴──────────┴───────────────────────────┴───────────────────────────┘

modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)
❯ modal app stop ap-lzy1AAuVy7POFkUcDKRxpQ

```

# Git warning!

I ran `modal deploy ...` after comitting some stuff I wanted to try BUT I had
changes in my file I didn't want to deploy... some git safety would be nice for
deployment!

> git stash && modal deploy .. && git stash pop

Question for Modal team - in my modal sandbox repo at commit: 
```
aab6162 (HEAD -> main) HEAD@{1}: commit: print base version of my own image to prove it to me
 1 file changed, 2 insertions(+)

```

An environment variable, `BASE_VERSION` that I expect to be in my base image
was not available to the python function in my Modal app... hopefully the log
is still
[here](https://modal.com/logs/ap-qYjE45dciqgT3C3CpNp3RL?functionId=fu-rOt31ShRE1W1CQfuf02fsq&taskId=ta-dm8BfiblvFLwVIQyt75YC2&inputId=in-n64klEFrLtbcm2BiykJEvW)
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
    
    <a class='prev' href='/git-worktrees-01'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Git-Worktrees-01</p>
        </div>
    </a>
    
    <a class='next' href='/jellyfin-media-players'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Jellyfin-Media-Players</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>