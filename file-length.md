---
article_html: "<p>I have a specific need for counting the number of lines in a file
  quickly.\nAt work we use S3 for data storage during our Kedro pipeline development,
  and in the development process we may end up orphaning several datasets.\nIn order
  to keep our workspace clean I have a short utility that compares the datasets in
  a Kedro DataCatalog with the files in the relevant S3 location.</p>\n<p>To get that
  list I run an internal tool like this:</p>\n<div class=\"highlight\"><pre><span></span><code>kedro<span
  class=\"w\"> </span>our-liter<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>grep<span class=\"w\"> </span>s3<span class=\"w\"> </span>&gt;&gt;<span
  class=\"w\"> </span>orphaned_datasets.txt\n</code></pre></div>\n<p>This simply parses
  our internal linter for the lines releated to my s3 linter utility and pipes those
  lines to a file.</p>\n<p>To get a quick idea of how out of wack a pipeline is I
  could open the text file in vim, git it with the <code>G</code> and see what line
  number I'm on but I'm way too lazy for that...</p>\n<h2 id=\"awk\">AWK</h2>\n<p><code>awk
  'END {print NR}' orphaned_datasets.txt</code> gives me the number of lines and I
  can alias this to whatever feels appropriate in my <code>zshrc</code>!</p>\n<p><strong>built-ins
  for the win!</strong></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/and-vs'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>And-vs-&</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/ipython-prompt'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Ipython-Prompt</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/file-length.png
date: 2022-04-04
datetime: 2022-04-04 00:00:00+00:00
description: 'I have a specific need for counting the number of lines in a file quickly.
  To get that list I run an internal tool like this: This simply parses our internal
  li'
edit_link: https://github.com/edit/main/pages/til/file-length.md
html: "<p>I have a specific need for counting the number of lines in a file quickly.\nAt
  work we use S3 for data storage during our Kedro pipeline development, and in the
  development process we may end up orphaning several datasets.\nIn order to keep
  our workspace clean I have a short utility that compares the datasets in a Kedro
  DataCatalog with the files in the relevant S3 location.</p>\n<p>To get that list
  I run an internal tool like this:</p>\n<div class=\"highlight\"><pre><span></span><code>kedro<span
  class=\"w\"> </span>our-liter<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>grep<span class=\"w\"> </span>s3<span class=\"w\"> </span>&gt;&gt;<span
  class=\"w\"> </span>orphaned_datasets.txt\n</code></pre></div>\n<p>This simply parses
  our internal linter for the lines releated to my s3 linter utility and pipes those
  lines to a file.</p>\n<p>To get a quick idea of how out of wack a pipeline is I
  could open the text file in vim, git it with the <code>G</code> and see what line
  number I'm on but I'm way too lazy for that...</p>\n<h2 id=\"awk\">AWK</h2>\n<p><code>awk
  'END {print NR}' orphaned_datasets.txt</code> gives me the number of lines and I
  can alias this to whatever feels appropriate in my <code>zshrc</code>!</p>\n<p><strong>built-ins
  for the win!</strong></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/and-vs'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>And-vs-&</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/ipython-prompt'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Ipython-Prompt</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I have a specific need for counting the number of lines in a file
  quickly. To get that list I run an internal tool like this: This simply parses our
  internal linter for the lines releated to my s3 linter utility and pipes those lines
  to a file. To ge'
now: 2024-06-26 16:50:21.524128
path: pages/til/file-length.md
published: true
slug: file-length
super_description: 'I have a specific need for counting the number of lines in a file
  quickly. To get that list I run an internal tool like this: This simply parses our
  internal linter for the lines releated to my s3 linter utility and pipes those lines
  to a file. To get a quick idea of how out of wack a pipeline is I could open the
  text file in vim, git it with the  awk ''END {print NR}'' orphaned_datasets.txt'
tags:
- linux
- tech
templateKey: til
title: File-Length
today: 2024-06-26
---

I have a specific need for counting the number of lines in a file quickly.
At work we use S3 for data storage during our Kedro pipeline development, and in the development process we may end up orphaning several datasets.
In order to keep our workspace clean I have a short utility that compares the datasets in a Kedro DataCatalog with the files in the relevant S3 location.

To get that list I run an internal tool like this:

```bash
kedro our-liter | grep s3 >> orphaned_datasets.txt
```

This simply parses our internal linter for the lines releated to my s3 linter utility and pipes those lines to a file.

To get a quick idea of how out of wack a pipeline is I could open the text file in vim, git it with the `G` and see what line number I'm on but I'm way too lazy for that...

## AWK

`awk 'END {print NR}' orphaned_datasets.txt` gives me the number of lines and I can alias this to whatever feels appropriate in my `zshrc`!

__built-ins for the win!__
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
    
    <a class='prev' href='/and-vs'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>And-vs-&</p>
        </div>
    </a>
    
    <a class='next' href='/ipython-prompt'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Ipython-Prompt</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>