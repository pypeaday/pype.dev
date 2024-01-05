---
article_html: "<p>Markata uses python's powerful jinja2 templating library for its
  templates as well as giving authors the ability to inject variables right into their
  markdown posts. This post contains quite a few examples of using jinja variables,
  compare it's output in the browser to the raw markdown file in <code>pages/jinja.md</code>.</p>\n<h3
  id=\"__version__\"><code>__version__</code></h3>\n<p>The veresion of markata used
  to build the site. (0.6.4)</p>\n<h3 id=\"date\">date</h3>\n<p>A python datetime
  object. (2024-01-05) </p>\n<h3 id=\"frontmatter\">Frontmatter</h3>\n<p>All variables
  from your post frontmatter like <code>title</code> (Jinja Variables) and <code>tags</code>
  (['home', 'meta']). If you are not familiar with frontmatter it's the content at
  the top\nof a markdown file between <code>---</code>.  Markata uses the most common
  type of\nfrontmatter, <code>yaml</code>.</p>\n<div class=\"highlight\"><pre><span></span><code>---\n<span
  class=\"gh\"># this is the frontmatter</span>\ndate: 2022-09-29 13:26:33\ntitle:
  Home Page\n\n---\n\n<span class=\"gu\">## the post</span>\n\nmarkdown gets written
  after the frontmatter\n</code></pre></div>\n<h2 id=\"markata\">markata</h2>\n<p>The
  last variable exposed is an instance of <code>markata.Markata</code> called <code>markata</code>.\nThis
  allows you to reference all of your other posts in very interesting ways.\nsuch
  as getting the latest post -&gt; <a href=\"/git-repo-specific-ssh-key\">Git repo
  specific SSH Key!</a></p>\n<p>You can also map over posts to get more.</p>\n<h2
  id=\"last-three-posts\">Last Three Posts</h2>\n<ul>\n<li><a href=\"git-repo-specific-ssh-key\">Git
  repo specific SSH Key!</a></li>\n<li><a href=\"on-earth-as-it-is-in-heaven\">On
  Earth as It Is in Heaven</a></li>\n<li><a href=\"dhcp-restart-to-save-ubuntu-22-04-server-networking\">DHCP
  Restart to Save Ubuntu 22.04 Server Networking</a></li>\n</ul>\n<h2 id=\"last-three-python-posts\">Last
  Three Python posts</h2>\n<ul>\n<li><a href=\"your-own-style\">Your Own Style</a></li>\n<li><a
  href=\"ipython\">Loading Markata into Ipython</a></li>\n<li><a href=\"jinja\">Jinja
  Variables</a></li>\n</ul>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/ipython'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Loading Markata into Ipython</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/076-silent-years-sadducees'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>076 Silent Years - Sadducees</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
config_overrides:
  head:
    text: "<style>\n    ul {\n        list-style-type: None;\n    }\n    li a {\n
      \       background: rgba(255,255,255,.1);\n        margin: .2rem;\n    }\n</style>\n"
cover: ''
date: 2022-09-03
datetime: 2022-09-03 00:00:00+00:00
description: Markata uses python The veresion of markata used to build the site. ({{  A
  python datetime object. ({{date.today()}}) All variables from your post frontmatter
  l
edit_link: https://github.com/edit/main/pages/jinja.md
html: "<p>Markata uses python's powerful jinja2 templating library for its templates
  as well as giving authors the ability to inject variables right into their markdown
  posts. This post contains quite a few examples of using jinja variables, compare
  it's output in the browser to the raw markdown file in <code>pages/jinja.md</code>.</p>\n<h3
  id=\"__version__\"><code>__version__</code></h3>\n<p>The veresion of markata used
  to build the site. (0.6.4)</p>\n<h3 id=\"date\">date</h3>\n<p>A python datetime
  object. (2024-01-05) </p>\n<h3 id=\"frontmatter\">Frontmatter</h3>\n<p>All variables
  from your post frontmatter like <code>title</code> (Jinja Variables) and <code>tags</code>
  (['home', 'meta']). If you are not familiar with frontmatter it's the content at
  the top\nof a markdown file between <code>---</code>.  Markata uses the most common
  type of\nfrontmatter, <code>yaml</code>.</p>\n<div class=\"highlight\"><pre><span></span><code>---\n<span
  class=\"gh\"># this is the frontmatter</span>\ndate: 2022-09-29 13:26:33\ntitle:
  Home Page\n\n---\n\n<span class=\"gu\">## the post</span>\n\nmarkdown gets written
  after the frontmatter\n</code></pre></div>\n<h2 id=\"markata\">markata</h2>\n<p>The
  last variable exposed is an instance of <code>markata.Markata</code> called <code>markata</code>.\nThis
  allows you to reference all of your other posts in very interesting ways.\nsuch
  as getting the latest post -&gt; <a href=\"/git-repo-specific-ssh-key\">Git repo
  specific SSH Key!</a></p>\n<p>You can also map over posts to get more.</p>\n<h2
  id=\"last-three-posts\">Last Three Posts</h2>\n<ul>\n<li><a href=\"git-repo-specific-ssh-key\">Git
  repo specific SSH Key!</a></li>\n<li><a href=\"on-earth-as-it-is-in-heaven\">On
  Earth as It Is in Heaven</a></li>\n<li><a href=\"dhcp-restart-to-save-ubuntu-22-04-server-networking\">DHCP
  Restart to Save Ubuntu 22.04 Server Networking</a></li>\n</ul>\n<h2 id=\"last-three-python-posts\">Last
  Three Python posts</h2>\n<ul>\n<li><a href=\"your-own-style\">Your Own Style</a></li>\n<li><a
  href=\"ipython\">Loading Markata into Ipython</a></li>\n<li><a href=\"jinja\">Jinja
  Variables</a></li>\n</ul>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/ipython'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Loading Markata into Ipython</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/076-silent-years-sadducees'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>076 Silent Years - Sadducees</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: Markata uses python The veresion of markata used to build the site.
  ({{  A python datetime object. ({{date.today()}}) All variables from your post frontmatter
  like  The last variable exposed is an instance of  You can also map over posts to
  get more.
now: 2024-01-05 14:15:22.253288
path: pages/jinja.md
published: true
slug: jinja
super_description: Markata uses python The veresion of markata used to build the site.
  ({{  A python datetime object. ({{date.today()}}) All variables from your post frontmatter
  like  The last variable exposed is an instance of  You can also map over posts to
  get more. {% for post in markata.map( [ {% for post in markata.map( [
tags:
- home
- meta
templateKey: ''
title: Jinja Variables
today: 2024-01-05
---

Markata uses python's powerful jinja2 templating library for its templates as well as giving authors the ability to inject variables right into their markdown posts. This post contains quite a few examples of using jinja variables, compare it's output in the browser to the raw markdown file in `pages/jinja.md`.

### `__version__`

The veresion of markata used to build the site. (0.6.4)

### date

A python datetime object. (2024-01-05) 

### Frontmatter

All variables from your post frontmatter like `title` (Jinja Variables) and `tags` (['home', 'meta']). If you are not familiar with frontmatter it's the content at the top
of a markdown file between `---`.  Markata uses the most common type of
frontmatter, `yaml`.

```md
---
# this is the frontmatter
date: 2022-09-29 13:26:33
title: Home Page

---

## the post

markdown gets written after the frontmatter

```

##  markata

The last variable exposed is an instance of `markata.Markata` called `markata`.
This allows you to reference all of your other posts in very interesting ways.
such as getting the latest post -> [Git repo specific SSH Key!](/git-repo-specific-ssh-key)

You can also map over posts to get more.

## Last Three Posts


*  [Git repo specific SSH Key!](git-repo-specific-ssh-key)
*  [On Earth as It Is in Heaven](on-earth-as-it-is-in-heaven)
*  [DHCP Restart to Save Ubuntu 22.04 Server Networking](dhcp-restart-to-save-ubuntu-22-04-server-networking)

## Last Three Python posts


*  [Your Own Style](your-own-style)
*  [Loading Markata into Ipython](ipython)
*  [Jinja Variables](jinja)
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
    
    <a class='prev' href='/ipython'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Loading Markata into Ipython</p>
        </div>
    </a>
    
    <a class='next' href='/076-silent-years-sadducees'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>076 Silent Years - Sadducees</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>