---
article_html: "<h2 id=\"tldr\">TL;DR</h2>\n<p>I've been using kanboard as a self-hosted
  kanban board. It's keeping me focused on <a href=\"https://myditialharbor.com\">Digital
  Harbor</a> when I'd rather be doing something less productive.</p>\n<h2 id=\"my-todos\">My
  TODOs</h2>\n<p>Here's the thing about my TODOs... they're everywhere. I've tried
  a crazy amount of different organizational tactics for my todo items. I've tried
  post-it notes, a journal, <code>TODO.md</code> in specific repos, a master <code>todo</code>
  repo, todo CLIs, etc... </p>\n<p>The problem for me was consistency... I would regularly
  forget what I was using for TODOs at that moment in my life... was there a todo
  file in this project? Do I have a todo repo cloned on this computer? Is this stuff
  in my journal or on post-it notes?</p>\n<p>And what do I do with new ideas? Do I
  organize them centrally or use a repo for the idea I have?</p>\n<p>It was getting
  out of hand to a debilitating degree... For a while I just gave up on being organized
  at all... Things would get done as necessary and if I got some motivation to work
  on something it was immediately smothered with the anxiety of how I was going to
  organize my work...</p>\n<p>At some point it became too much... Now, I have some
  experience with Azure DevOps/Jira for project management and then I came across
  Kanboard...</p>\n<h2 id=\"kanboard\">Kanboard</h2>\n<p><a href=\"https://kanboard.org/\">Kanboard</a></p>\n<p>Kanboard
  is just a self-hosted kanban style todo app. I know there's a ton of these so the
  TL;DR of my lesson is I picked an app that I would just use based on simplicity
  of managing and hosting.</p>\n<p>I have had kanboard running in my homelab for a
  long time, but I only barely use it intermittenly. And at that rate I didn't spend
  any real time organizing my tickets, so I wasn't akshuallly using it - it was just
  a post-it note replacement. </p>\n<p>But then I had an idea for a genuine business
  idea, and if I was going to ever have a hope of making it a reality, I needed to
  stay organized. This was when I decided to give kanboard a little more effort...
  I knew I could always remember that I'd chosen an app as my TODO solution (given
  all the time I spent questioning what I was using at any given point in time). I
  also knew I could host kanboard so that I could get to it from wherever was necessary
  because my homelab is relatively easy to add another public service to.</p>\n<p>So
  once I just decided to lean into this thing, I would take advantage of any moments
  of motivation and just jot down ideas for things that had to get done... Simple
  stuff like explore an infra management option, add one feature to a config, or migrate
  one website to another stack... And I would just write these things downs until
  I have enough time free to crack down on a task. The beautiful thing is, when I
  am struck with just enough time to do something, and the motivation to do something,
  I don't waste any time deciding what to do - past-me did present-me a favor and
  decided what was important already... So as long as I do myself the favor, when
  I'm ready to go I am never beaten by the anxiety of not knowing what I ant to do
  or how I'll track what I'm doing... I chose kanboard and even though it's not as
  fast as a terminal TUI,  it is reliable, simple, and keeps me focused on what I
  need to do.</p>\n<h2 id=\"the-biggest-benefit\">The biggest benefit</h2>\n<p>Not
  only is just having one app as the solution nice because it's centrally managed
  and accessible from wherever I need to get it, but the TOP feature of kanboard I
  use is comments on tickets... I get to continue to do future-me favors, my jotting
  down where I'm at in a task, what's left to do, what I'm trying, etc... and future-me
  is in a great mood, because when I have that free few minutes, I can just read my
  own past thoughts and get back up to speed without wasting time trying to remember
  things I never would've remembered if I hadn't written them down!</p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/ipython-prompt'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Ipython-Prompt</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/git-worktrees-01'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Git-Worktrees-01</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2024-04-20
datetime: 2024-04-20 00:00:00+00:00
description: I Here The problem for me was consistency... I would regularly forget
  what I was using for TODOs at that moment in my life... was there a todo file in
  this proj
edit_link: https://github.com/edit/main/pages/blog/kanboard-to-keep-me-focused-on-my-own-ideas.md
html: "<h2 id=\"tldr\">TL;DR</h2>\n<p>I've been using kanboard as a self-hosted kanban
  board. It's keeping me focused on <a href=\"https://myditialharbor.com\">Digital
  Harbor</a> when I'd rather be doing something less productive.</p>\n<h2 id=\"my-todos\">My
  TODOs</h2>\n<p>Here's the thing about my TODOs... they're everywhere. I've tried
  a crazy amount of different organizational tactics for my todo items. I've tried
  post-it notes, a journal, <code>TODO.md</code> in specific repos, a master <code>todo</code>
  repo, todo CLIs, etc... </p>\n<p>The problem for me was consistency... I would regularly
  forget what I was using for TODOs at that moment in my life... was there a todo
  file in this project? Do I have a todo repo cloned on this computer? Is this stuff
  in my journal or on post-it notes?</p>\n<p>And what do I do with new ideas? Do I
  organize them centrally or use a repo for the idea I have?</p>\n<p>It was getting
  out of hand to a debilitating degree... For a while I just gave up on being organized
  at all... Things would get done as necessary and if I got some motivation to work
  on something it was immediately smothered with the anxiety of how I was going to
  organize my work...</p>\n<p>At some point it became too much... Now, I have some
  experience with Azure DevOps/Jira for project management and then I came across
  Kanboard...</p>\n<h2 id=\"kanboard\">Kanboard</h2>\n<p><a href=\"https://kanboard.org/\">Kanboard</a></p>\n<p>Kanboard
  is just a self-hosted kanban style todo app. I know there's a ton of these so the
  TL;DR of my lesson is I picked an app that I would just use based on simplicity
  of managing and hosting.</p>\n<p>I have had kanboard running in my homelab for a
  long time, but I only barely use it intermittenly. And at that rate I didn't spend
  any real time organizing my tickets, so I wasn't akshuallly using it - it was just
  a post-it note replacement. </p>\n<p>But then I had an idea for a genuine business
  idea, and if I was going to ever have a hope of making it a reality, I needed to
  stay organized. This was when I decided to give kanboard a little more effort...
  I knew I could always remember that I'd chosen an app as my TODO solution (given
  all the time I spent questioning what I was using at any given point in time). I
  also knew I could host kanboard so that I could get to it from wherever was necessary
  because my homelab is relatively easy to add another public service to.</p>\n<p>So
  once I just decided to lean into this thing, I would take advantage of any moments
  of motivation and just jot down ideas for things that had to get done... Simple
  stuff like explore an infra management option, add one feature to a config, or migrate
  one website to another stack... And I would just write these things downs until
  I have enough time free to crack down on a task. The beautiful thing is, when I
  am struck with just enough time to do something, and the motivation to do something,
  I don't waste any time deciding what to do - past-me did present-me a favor and
  decided what was important already... So as long as I do myself the favor, when
  I'm ready to go I am never beaten by the anxiety of not knowing what I ant to do
  or how I'll track what I'm doing... I chose kanboard and even though it's not as
  fast as a terminal TUI,  it is reliable, simple, and keeps me focused on what I
  need to do.</p>\n<h2 id=\"the-biggest-benefit\">The biggest benefit</h2>\n<p>Not
  only is just having one app as the solution nice because it's centrally managed
  and accessible from wherever I need to get it, but the TOP feature of kanboard I
  use is comments on tickets... I get to continue to do future-me favors, my jotting
  down where I'm at in a task, what's left to do, what I'm trying, etc... and future-me
  is in a great mood, because when I have that free few minutes, I can just read my
  own past thoughts and get back up to speed without wasting time trying to remember
  things I never would've remembered if I hadn't written them down!</p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/ipython-prompt'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Ipython-Prompt</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/git-worktrees-01'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Git-Worktrees-01</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I Here The problem for me was consistency... I would regularly forget
  what I was using for TODOs at that moment in my life... was there a todo file in
  this project? Do I have a todo repo cloned on this computer? Is this stuff in my
  journal or on post
now: 2024-06-26 16:50:21.524181
path: pages/blog/kanboard-to-keep-me-focused-on-my-own-ideas.md
published: false
slug: kanboard-to-keep-me-focused-on-my-own-ideas
super_description: I Here The problem for me was consistency... I would regularly
  forget what I was using for TODOs at that moment in my life... was there a todo
  file in this project? Do I have a todo repo cloned on this computer? Is this stuff
  in my journal or on post-it notes? And what do I do with new ideas? Do I organize
  them centrally or use a repo for the idea I have? It was getting out of hand to
  a debilitating degree... For a while I just gave up on being organized at all...
  Things would get done as necess
tags:
- homelab
- tech
templateKey: blog-post
title: Kanboard to keep me focused on my own ideas
today: 2024-06-26
---

## TL;DR

I've been using kanboard as a self-hosted kanban board. It's keeping me focused on [Digital Harbor](https://myditialharbor.com) when I'd rather be doing something less productive.

## My TODOs

Here's the thing about my TODOs... they're everywhere. I've tried a crazy amount of different organizational tactics for my todo items. I've tried post-it notes, a journal, `TODO.md` in specific repos, a master `todo` repo, todo CLIs, etc... 

The problem for me was consistency... I would regularly forget what I was using for TODOs at that moment in my life... was there a todo file in this project? Do I have a todo repo cloned on this computer? Is this stuff in my journal or on post-it notes?

And what do I do with new ideas? Do I organize them centrally or use a repo for the idea I have?

It was getting out of hand to a debilitating degree... For a while I just gave up on being organized at all... Things would get done as necessary and if I got some motivation to work on something it was immediately smothered with the anxiety of how I was going to organize my work...

At some point it became too much... Now, I have some experience with Azure DevOps/Jira for project management and then I came across Kanboard...

## Kanboard

[Kanboard]( https://kanboard.org/ )

Kanboard is just a self-hosted kanban style todo app. I know there's a ton of these so the TL;DR of my lesson is I picked an app that I would just use based on simplicity of managing and hosting.

I have had kanboard running in my homelab for a long time, but I only barely use it intermittenly. And at that rate I didn't spend any real time organizing my tickets, so I wasn't akshuallly using it - it was just a post-it note replacement. 

But then I had an idea for a genuine business idea, and if I was going to ever have a hope of making it a reality, I needed to stay organized. This was when I decided to give kanboard a little more effort... I knew I could always remember that I'd chosen an app as my TODO solution (given all the time I spent questioning what I was using at any given point in time). I also knew I could host kanboard so that I could get to it from wherever was necessary because my homelab is relatively easy to add another public service to.

So once I just decided to lean into this thing, I would take advantage of any moments of motivation and just jot down ideas for things that had to get done... Simple stuff like explore an infra management option, add one feature to a config, or migrate one website to another stack... And I would just write these things downs until I have enough time free to crack down on a task. The beautiful thing is, when I am struck with just enough time to do something, and the motivation to do something, I don't waste any time deciding what to do - past-me did present-me a favor and decided what was important already... So as long as I do myself the favor, when I'm ready to go I am never beaten by the anxiety of not knowing what I ant to do or how I'll track what I'm doing... I chose kanboard and even though it's not as fast as a terminal TUI,  it is reliable, simple, and keeps me focused on what I need to do.

## The biggest benefit

Not only is just having one app as the solution nice because it's centrally managed and accessible from wherever I need to get it, but the TOP feature of kanboard I use is comments on tickets... I get to continue to do future-me favors, my jotting down where I'm at in a task, what's left to do, what I'm trying, etc... and future-me is in a great mood, because when I have that free few minutes, I can just read my own past thoughts and get back up to speed without wasting time trying to remember things I never would've remembered if I hadn't written them down!
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
    
    <a class='prev' href='/ipython-prompt'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Ipython-Prompt</p>
        </div>
    </a>
    
    <a class='next' href='/git-worktrees-01'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Git-Worktrees-01</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>