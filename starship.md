---
article_html: "<p>If you spend time in the terminal then you'll want it to look somewhat
  pleasing to the eye.\nI used to ssh into servers with no customization, use <code>vi</code>
  \ to edit a file or two, then get back to my regularly scheduled programming in
  VS C**e...</p>\n<p>One of the first steps for me loving my terminal was a beautiful
  prompt... </p>\n<h2 id=\"prompt\">Prompt</h2>\n<p>The default sh/bash/zsh prompts
  are... to put it lightly... garbage... I can't speak for other shells like fish
  simply because I do not use them but let me justify my trash talk.</p>\n<p>Here's
  the default <code>sh</code> prompt...</p>\n<p><img alt=\"Alt Text\" src=\"/images/sh-prompt.png\"
  /></p>\n<p>Then switching to <code>zsh</code> you get something marginally better
  (plus tab completion!)</p>\n<p><img alt=\"Alt Text\" src=\"/images/zsh-prompt.png\"
  /></p>\n<p>But this still is super gross... there's nothing to indicate file types
  and no status information readily available (ie. <code>git status</code> etc.)</p>\n<h2
  id=\"oh-my-zsh\">Oh-My-Zsh!</h2>\n<p>Now there are several ways to make your prmompt
  nicer depending on your shell (terminal emulator plays a role too).\nNow I use <code>zsh</code>
  and there's a great tool out there <a href=\"https://ohmyz.sh/\">oh-my-zsh</a> that
  brings a crazy amount of customization to the terminal experience.</p>\n<p>I do
  not use <code>oh-my-zsh</code> for theming though and that's simply because of my
  other choices - I use <code>kitty</code> themes since I understood the implementation
  better.\nKitty themes though - do not give me a nice prompt.</p>\n<p>The default
  prompt you get with <code>oh-my-zsh</code> themes isn't bad though (and you can
  pick from several default themes)...</p>\n<p><img alt=\"Alt Text\" src=\"/images/zsh-oh-my-zsh-prompt.png\"
  /></p>\n<p>Notice that you get some nice coloring and some default <code>git</code>
  status stuff, mainly the branch you are on.\nThere's plugins to show you more and
  that's all well and good, but again it's not my choice...</p>\n<p>If I don't use
  this then what's my goto?</p>\n<h2 id=\"starship\">Starship</h2>\n<p><a href=\"https://starship.rs/\">starship</a>
  is a cross-shell prompt with nice default and super easy customizaton!</p>\n<p>To
  get started click that link and follow the \"Getting Started\" button - it's incredibly
  fast to get up and running with sane defaults.</p>\n<p>The default starship config
  is plenty nice but I got a little tired of emojis in my prompt and wanted to switch
  to icons instead...</p>\n<p>To get started with your own customizaton you add a
  <code>starship.toml</code> file to <code>~/.config</code> \nMy starship config is
  found <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml\">here</a>.</p>\n<blockquote>\n<p>Note
  you need a font installed patched with nerdfonts - I use JetBrains Mono</p>\n</blockquote>\n<p>Now
  I have a beautiful prompt with relevant information that's a dream to look at!</p>\n<p><img
  alt=\"Alt Text\" src=\"/images/zsh-starship-prompt.png\" /></p>\n<p>I have configured
  my starship to show me relevant <code>git status</code> options (stashes, untracked
  files, etc etc.)\nI also have starship show me if I'm in a git repo, what branch
  I'm on, if I'm in a python project and if so what virtual environment is active.\nI
  do some work in AWS at work and so I have starship show me if my <code>aws cli</code>
  is configured to the right region for whichever project I'm in!</p>\n<p>There's
  a billion more options and after a few minutes of play it becomes really easy and
  intuitive to customize colors, icons, etc.</p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </style>\n\n    <a class='prev' href='/deques'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Deques</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/self-hosted-media'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>self-hosted-media</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/starship.png
date: 2022-03-25
datetime: 2022-03-25 00:00:00+00:00
description: 'If you spend time in the terminal then you One of the first steps for
  me loving my terminal was a beautiful prompt... The default sh/bash/zsh prompts
  are... to '
edit_link: https://github.com/edit/main/pages/blog/starship.md
html: "<p>If you spend time in the terminal then you'll want it to look somewhat pleasing
  to the eye.\nI used to ssh into servers with no customization, use <code>vi</code>
  \ to edit a file or two, then get back to my regularly scheduled programming in
  VS C**e...</p>\n<p>One of the first steps for me loving my terminal was a beautiful
  prompt... </p>\n<h2 id=\"prompt\">Prompt</h2>\n<p>The default sh/bash/zsh prompts
  are... to put it lightly... garbage... I can't speak for other shells like fish
  simply because I do not use them but let me justify my trash talk.</p>\n<p>Here's
  the default <code>sh</code> prompt...</p>\n<p><img alt=\"Alt Text\" src=\"/images/sh-prompt.png\"
  /></p>\n<p>Then switching to <code>zsh</code> you get something marginally better
  (plus tab completion!)</p>\n<p><img alt=\"Alt Text\" src=\"/images/zsh-prompt.png\"
  /></p>\n<p>But this still is super gross... there's nothing to indicate file types
  and no status information readily available (ie. <code>git status</code> etc.)</p>\n<h2
  id=\"oh-my-zsh\">Oh-My-Zsh!</h2>\n<p>Now there are several ways to make your prmompt
  nicer depending on your shell (terminal emulator plays a role too).\nNow I use <code>zsh</code>
  and there's a great tool out there <a href=\"https://ohmyz.sh/\">oh-my-zsh</a> that
  brings a crazy amount of customization to the terminal experience.</p>\n<p>I do
  not use <code>oh-my-zsh</code> for theming though and that's simply because of my
  other choices - I use <code>kitty</code> themes since I understood the implementation
  better.\nKitty themes though - do not give me a nice prompt.</p>\n<p>The default
  prompt you get with <code>oh-my-zsh</code> themes isn't bad though (and you can
  pick from several default themes)...</p>\n<p><img alt=\"Alt Text\" src=\"/images/zsh-oh-my-zsh-prompt.png\"
  /></p>\n<p>Notice that you get some nice coloring and some default <code>git</code>
  status stuff, mainly the branch you are on.\nThere's plugins to show you more and
  that's all well and good, but again it's not my choice...</p>\n<p>If I don't use
  this then what's my goto?</p>\n<h2 id=\"starship\">Starship</h2>\n<p><a href=\"https://starship.rs/\">starship</a>
  is a cross-shell prompt with nice default and super easy customizaton!</p>\n<p>To
  get started click that link and follow the \"Getting Started\" button - it's incredibly
  fast to get up and running with sane defaults.</p>\n<p>The default starship config
  is plenty nice but I got a little tired of emojis in my prompt and wanted to switch
  to icons instead...</p>\n<p>To get started with your own customizaton you add a
  <code>starship.toml</code> file to <code>~/.config</code> \nMy starship config is
  found <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml\">here</a>.</p>\n<blockquote>\n<p>Note
  you need a font installed patched with nerdfonts - I use JetBrains Mono</p>\n</blockquote>\n<p>Now
  I have a beautiful prompt with relevant information that's a dream to look at!</p>\n<p><img
  alt=\"Alt Text\" src=\"/images/zsh-starship-prompt.png\" /></p>\n<p>I have configured
  my starship to show me relevant <code>git status</code> options (stashes, untracked
  files, etc etc.)\nI also have starship show me if I'm in a git repo, what branch
  I'm on, if I'm in a python project and if so what virtual environment is active.\nI
  do some work in AWS at work and so I have starship show me if my <code>aws cli</code>
  is configured to the right region for whichever project I'm in!</p>\n<p>There's
  a billion more options and after a few minutes of play it becomes really easy and
  intuitive to customize colors, icons, etc.</p>\n<div class='prevnext'>\n\n    <style
  type='text/css'>\n\n    :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
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
  \   </style>\n\n    <a class='prev' href='/deques'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Deques</p>\n        </div>\n    </a>\n\n    <a
  class='next' href='/self-hosted-media'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>self-hosted-media</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: If you spend time in the terminal then you One of the first steps
  for me loving my terminal was a beautiful prompt... The default sh/bash/zsh prompts
  are... to put it lightly... garbage... I can Here Then switching to  But this still
  is super gross..
now: 2024-06-26 16:50:21.524209
path: pages/blog/starship.md
published: true
slug: starship
super_description: If you spend time in the terminal then you One of the first steps
  for me loving my terminal was a beautiful prompt... The default sh/bash/zsh prompts
  are... to put it lightly... garbage... I can Here Then switching to  But this still
  is super gross... there Now there are several ways to make your prmompt nicer depending
  on your shell (terminal emulator plays a role too). I do not use  The default prompt
  you get with  Notice that you get some nice coloring and some default  If I don
  To get starte
tags:
- linux
- tech
templateKey: blog-post
title: Starship
today: 2024-06-26
---

If you spend time in the terminal then you'll want it to look somewhat pleasing to the eye.
I used to ssh into servers with no customization, use `vi`  to edit a file or two, then get back to my regularly scheduled programming in VS C**e...

One of the first steps for me loving my terminal was a beautiful prompt... 

## Prompt

The default sh/bash/zsh prompts are... to put it lightly... garbage... I can't speak for other shells like fish simply because I do not use them but let me justify my trash talk.

Here's the default `sh` prompt...

![Alt Text](/images/sh-prompt.png)

Then switching to `zsh` you get something marginally better (plus tab completion!)

![Alt Text](/images/zsh-prompt.png)

But this still is super gross... there's nothing to indicate file types and no status information readily available (ie. `git status` etc.)

## Oh-My-Zsh!

Now there are several ways to make your prmompt nicer depending on your shell (terminal emulator plays a role too).
Now I use `zsh` and there's a great tool out there [oh-my-zsh](https://ohmyz.sh/) that brings a crazy amount of customization to the terminal experience.

I do not use `oh-my-zsh` for theming though and that's simply because of my other choices - I use `kitty` themes since I understood the implementation better.
Kitty themes though - do not give me a nice prompt.

The default prompt you get with `oh-my-zsh` themes isn't bad though (and you can pick from several default themes)...

![Alt Text](/images/zsh-oh-my-zsh-prompt.png)

Notice that you get some nice coloring and some default `git` status stuff, mainly the branch you are on.
There's plugins to show you more and that's all well and good, but again it's not my choice...

If I don't use this then what's my goto?

## Starship

[starship](https://starship.rs/) is a cross-shell prompt with nice default and super easy customizaton!

To get started click that link and follow the "Getting Started" button - it's incredibly fast to get up and running with sane defaults.

The default starship config is plenty nice but I got a little tired of emojis in my prompt and wanted to switch to icons instead...

To get started with your own customizaton you add a `starship.toml` file to `~/.config` 
My starship config is found [here](https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml).

>Note you need a font installed patched with nerdfonts - I use JetBrains Mono

Now I have a beautiful prompt with relevant information that's a dream to look at!

![Alt Text](/images/zsh-starship-prompt.png)

I have configured my starship to show me relevant `git status` options (stashes, untracked files, etc etc.)
I also have starship show me if I'm in a git repo, what branch I'm on, if I'm in a python project and if so what virtual environment is active.
I do some work in AWS at work and so I have starship show me if my `aws cli` is configured to the right region for whichever project I'm in!

There's a billion more options and after a few minutes of play it becomes really easy and intuitive to customize colors, icons, etc.
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
    
    <a class='prev' href='/deques'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Deques</p>
        </div>
    </a>
    
    <a class='next' href='/self-hosted-media'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>self-hosted-media</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>