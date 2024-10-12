---
article_html: "<p>I use Tmux and Vim for most of my workflow, but I end up with a
  lot of dangling\ntmux sessions that dont' really need to persist... but killing
  them one at a\ntime is a pain so I wrote a little script-kitty nonsense to pipe
  multiple\nchoices from fzf into <code>tmux kill-session</code></p>\n<p>I defined
  a little function in my <code>.zshrc</code>\n<div class=\"highlight\"><pre><span></span><code>destroy<span
  class=\"o\">()</span><span class=\"w\"> </span><span class=\"o\">{</span><span class=\"w\">
  </span>\n<span class=\"w\">    </span>tmux<span class=\"w\"> </span>list-sessions<span
  class=\"w\"> </span>-F<span class=\"w\"> </span><span class=\"s1\">&#39;#{session_name}&#39;</span><span
  class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>fzf<span
  class=\"w\"> </span>-m<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>xargs<span class=\"w\"> </span>-d<span class=\"w\"> </span><span
  class=\"s1\">$&#39;\\n&#39;</span><span class=\"w\"> </span>sh<span class=\"w\">
  </span>-c<span class=\"w\"> </span><span class=\"s1\">&#39;echo &quot;killing $0&quot;;
  tmux kill-session -t &quot;$0&quot;; for arg;do echo &quot;killing $arg&quot;;tmux
  kill-session -t &quot;$arg&quot;; done&#39;</span>\n<span class=\"o\">}</span>\nbindkey<span
  class=\"w\"> </span>-s<span class=\"w\"> </span><span class=\"s1\">&#39;^d&#39;</span><span
  class=\"w\"> </span><span class=\"s1\">&#39;destroy \\n&#39;</span>\n</code></pre></div></p>\n<p><code>tmux
  list-sessions -F '#{session_name}'</code> prints all my active tmux sessions to
  the console with the format of just their name</p>\n<div class=\"highlight\"><pre><span></span><code>pype.dev<span
  class=\"w\">  </span><span class=\"w\"> </span>main<span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>pype.dev<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span><span class=\"w\"> </span>proxy\n❯<span
  class=\"w\"> </span>tmux<span class=\"w\"> </span>list-sessions<span class=\"w\">
  </span>-F<span class=\"w\"> </span><span class=\"s1\">&#39;#{session_name}&#39;</span>\nsession-01\nsession-02\nsession-03\n...\n</code></pre></div>\n<p>Pipe
  that to <code>fzf -m</code> to allow multiple choices to be made using tab</p>\n<p>Then
  the nasty bit in <code>xargs</code>... I echo <code>killing @0</code> and <code>killing
  $arg</code> because the <code>sh -c</code> passes the first tmux session name to
  <code>@0</code> (it's just what bash does) and then the rest get handled in the
  for loop.</p>\n<p>Basically then I get an fzf list to choose multiple tmux sessions
  to destroy to clean up some RAM!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/078-silent-years-essenes'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>078 Silent Years - Essenes</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/your-own-style'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Your
  Own Style</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0
  0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-09-15
datetime: 2022-09-15 00:00:00+00:00
description: I use Tmux and Vim for most of my workflow, but I end up with a lot of
  dangling I defined a little function in my  tmux list-sessions -F '#{session_name}'  Pipe
edit_link: https://github.com/edit/main/pages/til/destroying-tmux-sessions-with-fzf.md
html: "<p>I use Tmux and Vim for most of my workflow, but I end up with a lot of dangling\ntmux
  sessions that dont' really need to persist... but killing them one at a\ntime is
  a pain so I wrote a little script-kitty nonsense to pipe multiple\nchoices from
  fzf into <code>tmux kill-session</code></p>\n<p>I defined a little function in my
  <code>.zshrc</code>\n<div class=\"highlight\"><pre><span></span><code>destroy<span
  class=\"o\">()</span><span class=\"w\"> </span><span class=\"o\">{</span><span class=\"w\">
  </span>\n<span class=\"w\">    </span>tmux<span class=\"w\"> </span>list-sessions<span
  class=\"w\"> </span>-F<span class=\"w\"> </span><span class=\"s1\">&#39;#{session_name}&#39;</span><span
  class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>fzf<span
  class=\"w\"> </span>-m<span class=\"w\"> </span><span class=\"p\">|</span><span
  class=\"w\"> </span>xargs<span class=\"w\"> </span>-d<span class=\"w\"> </span><span
  class=\"s1\">$&#39;\\n&#39;</span><span class=\"w\"> </span>sh<span class=\"w\">
  </span>-c<span class=\"w\"> </span><span class=\"s1\">&#39;echo &quot;killing $0&quot;;
  tmux kill-session -t &quot;$0&quot;; for arg;do echo &quot;killing $arg&quot;;tmux
  kill-session -t &quot;$arg&quot;; done&#39;</span>\n<span class=\"o\">}</span>\nbindkey<span
  class=\"w\"> </span>-s<span class=\"w\"> </span><span class=\"s1\">&#39;^d&#39;</span><span
  class=\"w\"> </span><span class=\"s1\">&#39;destroy \\n&#39;</span>\n</code></pre></div></p>\n<p><code>tmux
  list-sessions -F '#{session_name}'</code> prints all my active tmux sessions to
  the console with the format of just their name</p>\n<div class=\"highlight\"><pre><span></span><code>pype.dev<span
  class=\"w\">  </span><span class=\"w\"> </span>main<span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>pype.dev<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span><span class=\"w\"> </span>proxy\n❯<span
  class=\"w\"> </span>tmux<span class=\"w\"> </span>list-sessions<span class=\"w\">
  </span>-F<span class=\"w\"> </span><span class=\"s1\">&#39;#{session_name}&#39;</span>\nsession-01\nsession-02\nsession-03\n...\n</code></pre></div>\n<p>Pipe
  that to <code>fzf -m</code> to allow multiple choices to be made using tab</p>\n<p>Then
  the nasty bit in <code>xargs</code>... I echo <code>killing @0</code> and <code>killing
  $arg</code> because the <code>sh -c</code> passes the first tmux session name to
  <code>@0</code> (it's just what bash does) and then the rest get handled in the
  for loop.</p>\n<p>Basically then I get an fzf list to choose multiple tmux sessions
  to destroy to clean up some RAM!</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/078-silent-years-essenes'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>078 Silent Years - Essenes</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/your-own-style'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Your
  Own Style</p>\n        </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0
  0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path
  d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I use Tmux and Vim for most of my workflow, but I end up with a
  lot of dangling I defined a little function in my  tmux list-sessions -F ''#{session_name}''  Pipe
  that to  Then the nasty bit in  Basically then I get an fzf list to choose multiple
  tmux '
now: 2024-10-12 11:09:11.872079
path: pages/til/destroying-tmux-sessions-with-fzf.md
published: true
slug: destroying-tmux-sessions-with-fzf
super_description: I use Tmux and Vim for most of my workflow, but I end up with a
  lot of dangling I defined a little function in my  tmux list-sessions -F '#{session_name}'  Pipe
  that to  Then the nasty bit in  Basically then I get an fzf list to choose multiple
  tmux sessions to destroy to clean up some RAM
tags:
- cli
- bash
- tech
templateKey: til
title: Destroying Tmux sessions with fzf
today: 2024-10-12
---

I use Tmux and Vim for most of my workflow, but I end up with a lot of dangling
tmux sessions that dont' really need to persist... but killing them one at a
time is a pain so I wrote a little script-kitty nonsense to pipe multiple
choices from fzf into `tmux kill-session`

I defined a little function in my `.zshrc`
```bash 
destroy() { 
    tmux list-sessions -F '#{session_name}' | fzf -m | xargs -d $'\n' sh -c 'echo "killing $0"; tmux kill-session -t "$0"; for arg;do echo "killing $arg";tmux kill-session -t "$arg"; done'
}
bindkey -s '^d' 'destroy \n'
```

`tmux list-sessions -F '#{session_name}' ` prints all my active tmux sessions to the console with the format of just their name

```bash 
pype.dev   main   ×1 via   v3.8.11(pype.dev)  on  (us-east-1) proxy
❯ tmux list-sessions -F '#{session_name}'
session-01
session-02
session-03
...
```

Pipe that to `fzf -m` to allow multiple choices to be made using tab

Then the nasty bit in `xargs`... I echo `killing @0` and `killing $arg` because the `sh -c` passes the first tmux session name to `@0` (it's just what bash does) and then the rest get handled in the for loop.

Basically then I get an fzf list to choose multiple tmux sessions to destroy to clean up some RAM!
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
    
    <a class='prev' href='/078-silent-years-essenes'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>078 Silent Years - Essenes</p>
        </div>
    </a>
    
    <a class='next' href='/your-own-style'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Your Own Style</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>