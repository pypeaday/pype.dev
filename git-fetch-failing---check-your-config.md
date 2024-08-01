---
article_html: "<p>I started deploying a website to Cloudflare on a branch called <code>pages</code>.
  Similar to one of the GH Pages deployment patterns. But when my CI was pushing the
  branch I couldn't see it locally...</p>\n<p><code>git fetch -a</code> wasn't pulling
  any new branches, and <code>git branch -a</code> was only showing my development
  and main branches at the remote... so what gives?</p>\n<p>I checked my git config,
  and to this moment I have no idea how this happened but check out my fetch config:\n<div
  class=\"highlight\"><pre><span></span><code>git config --get remote.origin.fetch\n+refs/tags/*:refs/tags/*\n</code></pre></div></p>\n<p>So
  to fix this:</p>\n<div class=\"highlight\"><pre><span></span><code>git config remote.origin.fetch
  &#39;+refs/heads/*:refs/remotes/origin/*&#39;\n</code></pre></div>\n<p>Now <code>git
  fetch -a</code> works again\n<div class=\"highlight\"><pre><span></span><code>&gt;
  git fetch -a\n\nFrom github.com:DigitalHarbor7/DigitalHarbor\n   357a28a..969b027
  \ develop    -&gt; origin/develop\n   c052ac9..6d40210  main       -&gt; origin/main\n
  * [new branch]      pages      -&gt; origin/pages\n</code></pre></div></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/customize-k9s'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Customize K9s</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/git-repo-specific-ssh-key'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Git
  repo specific SSH Key!</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2024-04-18
datetime: 2024-04-18 00:00:00+00:00
description: I started deploying a website to Cloudflare on a branch called  git fetch
  -a I checked my git config, and to this moment I have no idea how this happened
  but ch
edit_link: https://github.com/edit/main/pages/til/git-fetch-failing---check-your-config.md
html: "<p>I started deploying a website to Cloudflare on a branch called <code>pages</code>.
  Similar to one of the GH Pages deployment patterns. But when my CI was pushing the
  branch I couldn't see it locally...</p>\n<p><code>git fetch -a</code> wasn't pulling
  any new branches, and <code>git branch -a</code> was only showing my development
  and main branches at the remote... so what gives?</p>\n<p>I checked my git config,
  and to this moment I have no idea how this happened but check out my fetch config:\n<div
  class=\"highlight\"><pre><span></span><code>git config --get remote.origin.fetch\n+refs/tags/*:refs/tags/*\n</code></pre></div></p>\n<p>So
  to fix this:</p>\n<div class=\"highlight\"><pre><span></span><code>git config remote.origin.fetch
  &#39;+refs/heads/*:refs/remotes/origin/*&#39;\n</code></pre></div>\n<p>Now <code>git
  fetch -a</code> works again\n<div class=\"highlight\"><pre><span></span><code>&gt;
  git fetch -a\n\nFrom github.com:DigitalHarbor7/DigitalHarbor\n   357a28a..969b027
  \ develop    -&gt; origin/develop\n   c052ac9..6d40210  main       -&gt; origin/main\n
  * [new branch]      pages      -&gt; origin/pages\n</code></pre></div></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/customize-k9s'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Customize K9s</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/git-repo-specific-ssh-key'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Git
  repo specific SSH Key!</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I started deploying a website to Cloudflare on a branch called  git
  fetch -a I checked my git config, and to this moment I have no idea how this happened
  but check out my fetch config: So to fix this: Now '
now: 2024-08-01 13:40:17.987568
path: pages/til/git-fetch-failing---check-your-config.md
published: true
slug: git-fetch-failing-check-your-config
super_description: 'I started deploying a website to Cloudflare on a branch called  git
  fetch -a I checked my git config, and to this moment I have no idea how this happened
  but check out my fetch config: So to fix this: Now '
tags:
- cli
- data
- tech
templateKey: til
title: Git fetch failing - check your config
today: 2024-08-01
---

I started deploying a website to Cloudflare on a branch called `pages`. Similar to one of the GH Pages deployment patterns. But when my CI was pushing the branch I couldn't see it locally...

`git fetch -a` wasn't pulling any new branches, and `git branch -a` was only showing my development and main branches at the remote... so what gives?

I checked my git config, and to this moment I have no idea how this happened but check out my fetch config:
```
git config --get remote.origin.fetch
+refs/tags/*:refs/tags/*
```

So to fix this:

```
git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
```

Now `git fetch -a` works again
```
> git fetch -a

From github.com:DigitalHarbor7/DigitalHarbor
   357a28a..969b027  develop    -> origin/develop
   c052ac9..6d40210  main       -> origin/main
 * [new branch]      pages      -> origin/pages
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
    
    <a class='prev' href='/customize-k9s'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Customize K9s</p>
        </div>
    </a>
    
    <a class='next' href='/git-repo-specific-ssh-key'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Git repo specific SSH Key!</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>