---
article_html: "<p>Stow is a great tool for managing dotfiles. My usage looks like
  cloning my dotfiles to my home directory, setting some environment variables via
  a script, then stowing relevant packages and boom my config is good to go...</p>\n<p><div
  class=\"highlight\"><pre><span></span><code><span class=\"nb\">cd</span><span class=\"w\">
  </span>~\ngit<span class=\"w\"> </span>clone<span class=\"w\"> </span>&lt;my<span
  class=\"w\"> </span>dotfiles<span class=\"w\"> </span>repo&gt;\n<span class=\"nb\">cd</span><span
  class=\"w\"> </span>dotfiles\n<span class=\"c1\"># env variable stuff ignored here</span>\nstow<span
  class=\"w\"> </span>zsh<span class=\"w\">  </span><span class=\"c1\"># This will
  symlink my .zshrc file which is in ~/dotfiles/zsh to ~/.zshrc</span>\n</code></pre></div>\nBy
  default stow will stow packages up one directory from the root directory. \nIn this
  example the root directory is <code>~/dotfiles</code> and the package is <code>zsh</code>.\nSo
  the files in the <code>zsh</code> package will symlinked into <code>~/</code>.</p>\n<p><code>stow</code>
  makes it easy to share dotfiles across machines, or safely experiment with config
  changes while always being protected by <code>git</code> since your dotfiles are
  in a git repo!\n...They are in a git repo... right?</p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/stow-target'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Stow-Target</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/git-ammend-no-edit'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Git
  ammend to a commit</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/stow.png
date: 2022-03-04
datetime: 2022-03-04 00:00:00+00:00
description: 'Stow is a great tool for managing dotfiles. My usage looks like cloning
  my dotfiles to my home directory, setting some environment variables via a script,
  then '
edit_link: https://github.com/edit/main/pages/til/stow.md
html: "<p>Stow is a great tool for managing dotfiles. My usage looks like cloning
  my dotfiles to my home directory, setting some environment variables via a script,
  then stowing relevant packages and boom my config is good to go...</p>\n<p><div
  class=\"highlight\"><pre><span></span><code><span class=\"nb\">cd</span><span class=\"w\">
  </span>~\ngit<span class=\"w\"> </span>clone<span class=\"w\"> </span>&lt;my<span
  class=\"w\"> </span>dotfiles<span class=\"w\"> </span>repo&gt;\n<span class=\"nb\">cd</span><span
  class=\"w\"> </span>dotfiles\n<span class=\"c1\"># env variable stuff ignored here</span>\nstow<span
  class=\"w\"> </span>zsh<span class=\"w\">  </span><span class=\"c1\"># This will
  symlink my .zshrc file which is in ~/dotfiles/zsh to ~/.zshrc</span>\n</code></pre></div>\nBy
  default stow will stow packages up one directory from the root directory. \nIn this
  example the root directory is <code>~/dotfiles</code> and the package is <code>zsh</code>.\nSo
  the files in the <code>zsh</code> package will symlinked into <code>~/</code>.</p>\n<p><code>stow</code>
  makes it easy to share dotfiles across machines, or safely experiment with config
  changes while always being protected by <code>git</code> since your dotfiles are
  in a git repo!\n...They are in a git repo... right?</p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/stow-target'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Stow-Target</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/git-ammend-no-edit'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Git
  ammend to a commit</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Stow is a great tool for managing dotfiles. My usage looks like
  cloning my dotfiles to my home directory, setting some environment variables via
  a script, then stowing relevant packages and boom my config is good to go... By
  default stow will stow pa
now: 2024-06-26 16:50:21.523961
path: pages/til/stow.md
published: true
slug: stow
super_description: Stow is a great tool for managing dotfiles. My usage looks like
  cloning my dotfiles to my home directory, setting some environment variables via
  a script, then stowing relevant packages and boom my config is good to go... By
  default stow will stow packages up one directory from the root directory. stow
tags:
- bash
- linux
- tech
templateKey: til
title: Stow
today: 2024-06-26
---

Stow is a great tool for managing dotfiles. My usage looks like cloning my dotfiles to my home directory, setting some environment variables via a script, then stowing relevant packages and boom my config is good to go...

```bash
cd ~
git clone <my dotfiles repo>
cd dotfiles
# env variable stuff ignored here
stow zsh  # This will symlink my .zshrc file which is in ~/dotfiles/zsh to ~/.zshrc
```
By default stow will stow packages up one directory from the root directory. 
In this example the root directory is `~/dotfiles` and the package is `zsh`.
So the files in the `zsh` package will symlinked into `~/`.

`stow` makes it easy to share dotfiles across machines, or safely experiment with config changes while always being protected by `git` since your dotfiles are in a git repo!
...They are in a git repo... right?
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
    
    <a class='prev' href='/stow-target'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Stow-Target</p>
        </div>
    </a>
    
    <a class='next' href='/git-ammend-no-edit'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Git ammend to a commit</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>