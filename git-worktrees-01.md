---
article_html: "<h2 id=\"git\">Git</h2>\n<p>Hopefully if you write code you are using
  git, if not go learn the basics of <code>commit</code>, <code>pull</code>, <code>push</code>,
  and <code>pull request</code>/<code>merge request</code> like... right now.</p>\n<p>Assuming
  you are at least familiar with git then you probably work the same way I have since
  I've been using it.</p>\n<ol>\n<li>clone or initialize a repo</li>\n<li>checkout
  a branch, <code>git checkout -b my-feature</code></li>\n<li>work on <code>my-feature</code>
  and when ready open a PR into <code>main</code></li>\n<li><code>git pull main</code>
  then <code>git checkout -b another-feature</code></li>\n<li>etc...</li>\n</ol>\n<p>What
  if you need to switch between branches for some reason? Often I'm jumping into projects
  with my co-workers left and right, and I'll have changes that I'm either working
  on or exploring for them.\nWhen it's time to switch branches I think there's more
  elegant ways than this but I've always done this:</p>\n<ol>\n<li><code>stash</code>
  the current changes</li>\n<li>checkout out the relevant branch </li>\n<li>helped
  out </li>\n<li>re-checkout my original branch</li>\n<li><code>pop</code> the <code>stash</code></li>\n</ol>\n<p>Now,
  that's not awful but I think <code>worktrees</code> will make this nicer for a few
  reasons!</p>\n<h2 id=\"worktrees\">Worktrees</h2>\n<p>Worktrees are linked branches
  that have their own directories somewhere on your computer.\nTo checkout a branch
  you don't have to worry about stashing any changes, you just <code>cd</code> into
  the directory of that branch.</p>\n<blockquote>\n<p>The branch can be literally
  anywhere - it doesn't have to be in the repo folder</p>\n</blockquote>\n<h2 id=\"use-case\">Use
  Case</h2>\n<p>I've seen ThePrimeagean argue for worktrees for several reasons, see
  a YT video <a href=\"https://www.youtube.com/watch?v=2uEqYw-N8uE\">here</a></p>\n<p>I'm
  entirely in Python at the moment, or working with projects that dont' have that
  kind of requirement (ie. this website).\nMy reason for wanting worktrees is 3 fold.</p>\n<h3
  id=\"files-that-could-have-been-gitignored-but-aint\">Files that could have been
  gitignored but ain't</h3>\n<p>I have a <code>.envrc</code> I put in every project,
  but it's not gitignored for reasons that aren't relevant right now...\nIf I switch
  branches I'll stash everything I have at the time, including my .envrc, but then
  if I forget to pop the stash and I move on and come back then my environment isn't
  active and I have to go find the stash, pop it, cd out, and then back in and honestly....
  that sucks.\nWorktrees will let me have the .envrc in every branch, and if I checkout
  or switch to a new one, my personal branch is unaffected.</p>\n<h3 id=\"symlinks\">Symlinks</h3>\n<p>In
  my team's <a href=\"https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html\">Kedro</a>
  workflow we keep a specific directory, the <code>conf</code> directory at a different
  spot than the Kedro team has in their templates (the why is outside the scope here).\nThe
  way I preserve every kedro utility for my own benefit is to symlink our <code>conf</code>
  to where the Kedro template expects it to be. \nBut then everytime I stash changes
  I lose that symlink so I either just don't have it for the time being or I recreate
  it which is a hassle\nWorktrees will let me have that present and persistent on
  all my branches at once.</p>\n<h3 id=\"foo\">Foo</h3>\n<p>Because why not!? This
  workflow feels future-proof, and if my toolset changes down the line then having
  this worktree centric workflow might be helpful and I'm just prepping for that possibility!</p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/kanboard-to-keep-me-focused-on-my-own-ideas'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Kanboard
  to keep me focused on my own ideas</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/systemd-timer-for-syncoid'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Systemd
  timer for syncoid</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/git-worktrees-01.png
date: 2022-03-11
datetime: 2022-03-11 00:00:00+00:00
description: 'Hopefully if you write code you are using git, if not go learn the basics
  of  Assuming you are at least familiar with git then you probably work the same
  way I '
edit_link: https://github.com/edit/main/pages/blog/git-worktrees-01.md
html: "<h2 id=\"git\">Git</h2>\n<p>Hopefully if you write code you are using git,
  if not go learn the basics of <code>commit</code>, <code>pull</code>, <code>push</code>,
  and <code>pull request</code>/<code>merge request</code> like... right now.</p>\n<p>Assuming
  you are at least familiar with git then you probably work the same way I have since
  I've been using it.</p>\n<ol>\n<li>clone or initialize a repo</li>\n<li>checkout
  a branch, <code>git checkout -b my-feature</code></li>\n<li>work on <code>my-feature</code>
  and when ready open a PR into <code>main</code></li>\n<li><code>git pull main</code>
  then <code>git checkout -b another-feature</code></li>\n<li>etc...</li>\n</ol>\n<p>What
  if you need to switch between branches for some reason? Often I'm jumping into projects
  with my co-workers left and right, and I'll have changes that I'm either working
  on or exploring for them.\nWhen it's time to switch branches I think there's more
  elegant ways than this but I've always done this:</p>\n<ol>\n<li><code>stash</code>
  the current changes</li>\n<li>checkout out the relevant branch </li>\n<li>helped
  out </li>\n<li>re-checkout my original branch</li>\n<li><code>pop</code> the <code>stash</code></li>\n</ol>\n<p>Now,
  that's not awful but I think <code>worktrees</code> will make this nicer for a few
  reasons!</p>\n<h2 id=\"worktrees\">Worktrees</h2>\n<p>Worktrees are linked branches
  that have their own directories somewhere on your computer.\nTo checkout a branch
  you don't have to worry about stashing any changes, you just <code>cd</code> into
  the directory of that branch.</p>\n<blockquote>\n<p>The branch can be literally
  anywhere - it doesn't have to be in the repo folder</p>\n</blockquote>\n<h2 id=\"use-case\">Use
  Case</h2>\n<p>I've seen ThePrimeagean argue for worktrees for several reasons, see
  a YT video <a href=\"https://www.youtube.com/watch?v=2uEqYw-N8uE\">here</a></p>\n<p>I'm
  entirely in Python at the moment, or working with projects that dont' have that
  kind of requirement (ie. this website).\nMy reason for wanting worktrees is 3 fold.</p>\n<h3
  id=\"files-that-could-have-been-gitignored-but-aint\">Files that could have been
  gitignored but ain't</h3>\n<p>I have a <code>.envrc</code> I put in every project,
  but it's not gitignored for reasons that aren't relevant right now...\nIf I switch
  branches I'll stash everything I have at the time, including my .envrc, but then
  if I forget to pop the stash and I move on and come back then my environment isn't
  active and I have to go find the stash, pop it, cd out, and then back in and honestly....
  that sucks.\nWorktrees will let me have the .envrc in every branch, and if I checkout
  or switch to a new one, my personal branch is unaffected.</p>\n<h3 id=\"symlinks\">Symlinks</h3>\n<p>In
  my team's <a href=\"https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html\">Kedro</a>
  workflow we keep a specific directory, the <code>conf</code> directory at a different
  spot than the Kedro team has in their templates (the why is outside the scope here).\nThe
  way I preserve every kedro utility for my own benefit is to symlink our <code>conf</code>
  to where the Kedro template expects it to be. \nBut then everytime I stash changes
  I lose that symlink so I either just don't have it for the time being or I recreate
  it which is a hassle\nWorktrees will let me have that present and persistent on
  all my branches at once.</p>\n<h3 id=\"foo\">Foo</h3>\n<p>Because why not!? This
  workflow feels future-proof, and if my toolset changes down the line then having
  this worktree centric workflow might be helpful and I'm just prepping for that possibility!</p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/kanboard-to-keep-me-focused-on-my-own-ideas'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Kanboard
  to keep me focused on my own ideas</p>\n        </div>\n    </a>\n\n    <a class='next'
  href='/systemd-timer-for-syncoid'>\n\n        <div class='prevnext-text'>\n            <p
  class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Systemd
  timer for syncoid</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\"
  viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'Hopefully if you write code you are using git, if not go learn
  the basics of  Assuming you are at least familiar with git then you probably work
  the same way I have since I clone or initialize a repo checkout a branch,  work
  on  git pull main etc... '
now: 2024-06-26 16:50:21.524177
path: pages/blog/git-worktrees-01.md
published: false
slug: git-worktrees-01
super_description: Hopefully if you write code you are using git, if not go learn
  the basics of  Assuming you are at least familiar with git then you probably work
  the same way I have since I clone or initialize a repo checkout a branch,  work
  on  git pull main etc... What if you need to switch between branches for some reason?
  Often I stash checkout out the relevant branch helped out re-checkout my original
  branch pop Now, that Worktrees are linked branches that have their own directories
  somewhere on your comput
tags:
- git
- tech
templateKey: blog-post
title: Git-Worktrees-01
today: 2024-06-26
---

## Git 

Hopefully if you write code you are using git, if not go learn the basics of `commit`, `pull`, `push`, and `pull request`/`merge request` like... right now.

Assuming you are at least familiar with git then you probably work the same way I have since I've been using it.

1. clone or initialize a repo
2. checkout a branch, `git checkout -b my-feature`
3. work on `my-feature` and when ready open a PR into `main`
4. `git pull main` then `git checkout -b another-feature`
5. etc...


What if you need to switch between branches for some reason? Often I'm jumping into projects with my co-workers left and right, and I'll have changes that I'm either working on or exploring for them.
When it's time to switch branches I think there's more elegant ways than this but I've always done this:

1. `stash` the current changes
2. checkout out the relevant branch 
3. helped out 
4. re-checkout my original branch
5. `pop` the `stash`

Now, that's not awful but I think `worktrees` will make this nicer for a few reasons!

## Worktrees

Worktrees are linked branches that have their own directories somewhere on your computer.
To checkout a branch you don't have to worry about stashing any changes, you just `cd` into the directory of that branch.

> The branch can be literally anywhere - it doesn't have to be in the repo folder


## Use Case

I've seen ThePrimeagean argue for worktrees for several reasons, see a YT video [here](https://www.youtube.com/watch?v=2uEqYw-N8uE)

I'm entirely in Python at the moment, or working with projects that dont' have that kind of requirement (ie. this website).
My reason for wanting worktrees is 3 fold.

### Files that could have been gitignored but ain't

I have a `.envrc` I put in every project, but it's not gitignored for reasons that aren't relevant right now...
If I switch branches I'll stash everything I have at the time, including my .envrc, but then if I forget to pop the stash and I move on and come back then my environment isn't active and I have to go find the stash, pop it, cd out, and then back in and honestly.... that sucks.
Worktrees will let me have the .envrc in every branch, and if I checkout or switch to a new one, my personal branch is unaffected.


### Symlinks

In my team's [Kedro](https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html) workflow we keep a specific directory, the `conf` directory at a different spot than the Kedro team has in their templates (the why is outside the scope here).
The way I preserve every kedro utility for my own benefit is to symlink our `conf` to where the Kedro template expects it to be. 
But then everytime I stash changes I lose that symlink so I either just don't have it for the time being or I recreate it which is a hassle
Worktrees will let me have that present and persistent on all my branches at once.

### Foo

Because why not!? This workflow feels future-proof, and if my toolset changes down the line then having this worktree centric workflow might be helpful and I'm just prepping for that possibility!
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
    
    <a class='prev' href='/kanboard-to-keep-me-focused-on-my-own-ideas'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Kanboard to keep me focused on my own ideas</p>
        </div>
    </a>
    
    <a class='next' href='/systemd-timer-for-syncoid'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Systemd timer for syncoid</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>