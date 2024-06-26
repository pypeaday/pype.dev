---
article_html: "<p><a href=\"https://github.com/polybar/polybar\">polybar</a> is an
  awesome and super customizable status bar for your desktop environment.</p>\n<p>I
  use it with i3-gaps on Ubuntu for work and it makes my day just that much better
  to have a clean and elegant bar with the things in it that I care about.</p>\n<p>The
  GitHub has all the instructions you'd need to install and get started with an example.</p>\n<p>I
  want to make some notes about how I use polybar and customize it.</p>\n<h2 id=\"organization\">Organization</h2>\n<p>First
  of all, I recently moved my polybar config out of one config file into a modular
  structure that keeps my config files small and easiser to edit.</p>\n<p>You can
  find my config <a href=\"https://github.com/nicpayne713/dotfiles/tree/main/polybar\">here</a></p>\n<p>The
  apps or services you put into polybar are called <code>modules</code>.\nI have moved
  all of my modules into their own config files and I source them with one centralized
  <code>include-modules.ini</code> config.</p>\n<p>This separation also makes it easier
  for me to keep my home and work polybars as in sync as possible without duplicating
  a ton of config!</p>\n<div class=\"highlight\"><pre><span></span><code>./polybar\n├──<span
  class=\"w\"> </span>colors.ini\n├──<span class=\"w\"> </span>config.ini\n├──<span
  class=\"w\"> </span>fonts.ini\n├──<span class=\"w\"> </span>home-modules.ini\n├──<span
  class=\"w\"> </span>include-modules.ini\n├──<span class=\"w\"> </span>launch.sh\n├──<span
  class=\"w\"> </span>modules\n│<span class=\"w\">   </span>├──<span class=\"w\">
  </span>aws.ini\n│<span class=\"w\">   </span>├──<span class=\"w\"> </span>battery.ini\n│<span
  class=\"w\">   </span>├──<span class=\"w\"> </span>bluetooth.ini\n│<span class=\"w\">  
  </span>├──<span class=\"w\"> </span>cisco.ini\n│<span class=\"w\">   </span>├──<span
  class=\"w\"> </span>cpu.ini\n│<span class=\"w\">   </span>├──<span class=\"w\">
  </span>date.ini\n│<span class=\"w\">   </span>├──<span class=\"w\"> </span>eth.ini\n│<span
  class=\"w\">   </span>├──<span class=\"w\"> </span>eth_work.ini\n│<span class=\"w\">  
  </span>├──<span class=\"w\"> </span>i3.ini\n│<span class=\"w\">   </span>├──<span
  class=\"w\"> </span>memory.ini\n│<span class=\"w\">   </span>├──<span class=\"w\">
  </span>nm-editor.ini\n│<span class=\"w\">   </span>├──<span class=\"w\"> </span>powermenu.ini\n│<span
  class=\"w\">   </span>├──<span class=\"w\"> </span>pulseaudio-control.ini\n│<span
  class=\"w\">   </span>├──<span class=\"w\"> </span>pulseaudio.ini\n│<span class=\"w\">  
  </span>├──<span class=\"w\"> </span>rofi.ini\n│<span class=\"w\">   </span>├──<span
  class=\"w\"> </span>vpn.ini\n│<span class=\"w\">   </span>└──<span class=\"w\">
  </span>wlan.ini\n└──<span class=\"w\"> </span>work-modules.ini\n\n<span class=\"m\">1</span><span
  class=\"w\"> </span>directory,<span class=\"w\"> </span><span class=\"m\">24</span><span
  class=\"w\"> </span>files\n</code></pre></div>\n<p>To break this down there are
  several configs to see:</p>\n<ol>\n<li><code>colors.ini</code> is what you'd expect
  - a set of defined colors like <code>foreground</code>, <code>underline</code>,
  etc.</li>\n<li><code>config.ini</code> is the general polybar config file where
  bars are defined. Currently in mine there is a <code>work</code> and <code>home</code>
  bar defined with the modules sourced in from the explicit config files.</li>\n<li><code>fonts.ini</code>
  is like <code>colors.ini</code> -&gt; you put fonts here. I recommend using a font
  patched with NerdFont so you get fancy icons! (I use JetBrains Mono)</li>\n<li><code>include-modules.ini</code>
  is where I list out all the config files in <code>modules/</code> so I can basically
  source just the <code>include-modules.ini</code> without explicitly sourcing every
  module's config in every polybar defintion.</li>\n<li><code>launch.sh</code> is
  a simple shell script to launch the polybar! You'll see mine takes multiple monitors
  into consideration which I manage via environment variables setup in my <code>.zshenv</code>
  file that is different for my work and home setups.</li>\n<li>Finally there are
  <code>home-modules.ini</code> and <code>work-modules.ini</code> which is where,
  for each of my bars, I define which modules I want!</li>\n</ol>\n<h2 id=\"config\">Config</h2>\n<p>My
  <code>config.ini</code> file has 2 bar definitions in it - here's my home one:</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"na\">include-file</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">$DOTFILES/polybar/include-modules.ini</span>\n\n<span
  class=\"k\">[bar/home]</span>\n<span class=\"na\">monitor</span><span class=\"w\">
  </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">${env:MONITOR:}</span>\n<span
  class=\"na\">width</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">100%</span>\n<span class=\"na\">height</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">25</span>\n<span
  class=\"na\">radius</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">8.0</span>\n<span class=\"na\">fixed-center</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">true</span>\n<span
  class=\"na\">bottom</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">false</span>\n\n<span class=\"na\">background</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">${colors.background}</span>\n<span
  class=\"na\">foreground</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">${colors.foreground}</span>\n\n<span class=\"na\">include-file</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">$DOTFILES/polybar/fonts.ini</span>\n<span
  class=\"na\">include-file</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">$DOTFILES/polybar/home-modules.ini</span>\n</code></pre></div>\n<p>It
  should be easy to follow - I bring in the <code>include-modules</code>, set a few
  colors for the bar like <code>background</code> and <code>foreground</code> which
  are sourced by the <code>colors.ini</code>, and finally bring in my fonts and home
  modules via their config files!</p>\n<p>It's super easy to then change one or two
  things in the appropriate places rather than combing through one massive config.
  This also makes it easy for me to seperate my work and home setups.</p>\n<h2 id=\"modules\">Modules</h2>\n<p>There
  are several builtin modules, like <code>wlan</code> which gives your wifi status
  right there in polybar.</p>\n<p>You can also make custom ones. \nA big-time custom
  one for me is an indicator of whether or not I have an active AWS token for working
  with the <code>aws</code> cli.</p>\n<p>This is defined in<code>modules/aws.ini</code>
  and it looks like this:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">[module/aws]</span>\n<span class=\"na\">interval</span><span class=\"w\">
  </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">5.0</span>\n<span
  class=\"na\">type</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">custom/script</span>\n<span class=\"na\">exec</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">has_aws_token</span>\n<span
  class=\"na\">click-left</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">$HOME/.local/bin/auto_get_aws_token</span>\n<span
  class=\"na\">click-right</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">rm -rf ~/.aws/credentials</span>\n</code></pre></div>\n<p>Every
  <code>5</code> seconds my <code>has_aws_token</code> script is ran.\nThat script
  looks like this:</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"ch\">#!/bin/bash</span>\n<span
  class=\"nb\">source</span><span class=\"w\"> </span>auto_proxy\naws<span class=\"w\">
  </span>sts<span class=\"w\"> </span>get-caller-identity<span class=\"w\"> </span><span
  class=\"p\">&amp;</span>&gt;<span class=\"w\"> </span>/dev/null<span class=\"w\">
  </span><span class=\"o\">&amp;&amp;</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#00ff00}  %{F-}%{T-}&quot;</span><span
  class=\"w\">  </span><span class=\"o\">||(</span><span class=\"w\"> </span><span
  class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#ff0000}
  %{F-}%{T-}&quot;</span><span class=\"w\"> </span><span class=\"o\">)</span>\n</code></pre></div>\n<p>See
  how the script echos out a colored icon to indicate the status of my token -&gt;
  that icon is displayed in the polybar so I have real-time (5 second latency) status
  of whether or not I can do things in my AWS environment.</p>\n<p>In the module I
  also configured actions for <code>click-left</code> and <code>click-right</code>
  which are as straight forward as could be.</p>\n<h2 id=\"my-issues-with-i3\">My
  issues with i3</h2>\n<p>There's a few things to be considerate of if you use <code>i3</code>
  such as needing a workaround for a centered bar that <strong>is not</strong> the
  full width of the monitor.\nPolybar can look really nice by not taking up the full
  width of the bar which you can configure in <code>config.ini</code> with these options:</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"na\">width</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">90%</span>\n<span
  class=\"na\">offset-x</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">5%</span><span class=\"w\">  </span><span
  class=\"c1\"># set to (100 - width) / 2</span>\n</code></pre></div>\n<p>However
  due to an issue with polybar and i3 you need to also set <code>override-redirect
  = true</code>. \nBUT then you'll notice that the bar overlaps your i3 windows...
  ARGH! what do we do?</p>\n<p>Quick work around is to set <code>gaps top</code> in
  your i3 config if you use i3-gaps... if not? well, idk... use gaps... lol</p>\n<p>However
  this introduces another issue - which is then full screen windows will  have polybar
  sitting on top of them...</p>\n<p>This isn't necessarily a deal breaker, but for
  me it's worth it to just have the bar go 100% width.</p>\n<h2 id=\"fin\">FIN</h2>\n<p>There's
  a tiny intro to polybar and how I organize my config files so things are easy to
  edit and manage!\nFeel free to grab mine and try it out!</p>\n<div class='prevnext'>\n\n
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
  \   <a class='next' href='/vim-spell-check'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Vim-Spell-Check</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/polybar-01.png
date: 2022-04-01
datetime: 2022-04-01 00:00:00+00:00
description: 'I use it with i3-gaps on Ubuntu for work and it makes my day just that
  much better to have a clean and elegant bar with the things in it that I care about.
  The '
edit_link: https://github.com/edit/main/pages/blog/polybar-01.md
html: "<p><a href=\"https://github.com/polybar/polybar\">polybar</a> is an awesome
  and super customizable status bar for your desktop environment.</p>\n<p>I use it
  with i3-gaps on Ubuntu for work and it makes my day just that much better to have
  a clean and elegant bar with the things in it that I care about.</p>\n<p>The GitHub
  has all the instructions you'd need to install and get started with an example.</p>\n<p>I
  want to make some notes about how I use polybar and customize it.</p>\n<h2 id=\"organization\">Organization</h2>\n<p>First
  of all, I recently moved my polybar config out of one config file into a modular
  structure that keeps my config files small and easiser to edit.</p>\n<p>You can
  find my config <a href=\"https://github.com/nicpayne713/dotfiles/tree/main/polybar\">here</a></p>\n<p>The
  apps or services you put into polybar are called <code>modules</code>.\nI have moved
  all of my modules into their own config files and I source them with one centralized
  <code>include-modules.ini</code> config.</p>\n<p>This separation also makes it easier
  for me to keep my home and work polybars as in sync as possible without duplicating
  a ton of config!</p>\n<div class=\"highlight\"><pre><span></span><code>./polybar\n├──<span
  class=\"w\"> </span>colors.ini\n├──<span class=\"w\"> </span>config.ini\n├──<span
  class=\"w\"> </span>fonts.ini\n├──<span class=\"w\"> </span>home-modules.ini\n├──<span
  class=\"w\"> </span>include-modules.ini\n├──<span class=\"w\"> </span>launch.sh\n├──<span
  class=\"w\"> </span>modules\n│<span class=\"w\">   </span>├──<span class=\"w\">
  </span>aws.ini\n│<span class=\"w\">   </span>├──<span class=\"w\"> </span>battery.ini\n│<span
  class=\"w\">   </span>├──<span class=\"w\"> </span>bluetooth.ini\n│<span class=\"w\">  
  </span>├──<span class=\"w\"> </span>cisco.ini\n│<span class=\"w\">   </span>├──<span
  class=\"w\"> </span>cpu.ini\n│<span class=\"w\">   </span>├──<span class=\"w\">
  </span>date.ini\n│<span class=\"w\">   </span>├──<span class=\"w\"> </span>eth.ini\n│<span
  class=\"w\">   </span>├──<span class=\"w\"> </span>eth_work.ini\n│<span class=\"w\">  
  </span>├──<span class=\"w\"> </span>i3.ini\n│<span class=\"w\">   </span>├──<span
  class=\"w\"> </span>memory.ini\n│<span class=\"w\">   </span>├──<span class=\"w\">
  </span>nm-editor.ini\n│<span class=\"w\">   </span>├──<span class=\"w\"> </span>powermenu.ini\n│<span
  class=\"w\">   </span>├──<span class=\"w\"> </span>pulseaudio-control.ini\n│<span
  class=\"w\">   </span>├──<span class=\"w\"> </span>pulseaudio.ini\n│<span class=\"w\">  
  </span>├──<span class=\"w\"> </span>rofi.ini\n│<span class=\"w\">   </span>├──<span
  class=\"w\"> </span>vpn.ini\n│<span class=\"w\">   </span>└──<span class=\"w\">
  </span>wlan.ini\n└──<span class=\"w\"> </span>work-modules.ini\n\n<span class=\"m\">1</span><span
  class=\"w\"> </span>directory,<span class=\"w\"> </span><span class=\"m\">24</span><span
  class=\"w\"> </span>files\n</code></pre></div>\n<p>To break this down there are
  several configs to see:</p>\n<ol>\n<li><code>colors.ini</code> is what you'd expect
  - a set of defined colors like <code>foreground</code>, <code>underline</code>,
  etc.</li>\n<li><code>config.ini</code> is the general polybar config file where
  bars are defined. Currently in mine there is a <code>work</code> and <code>home</code>
  bar defined with the modules sourced in from the explicit config files.</li>\n<li><code>fonts.ini</code>
  is like <code>colors.ini</code> -&gt; you put fonts here. I recommend using a font
  patched with NerdFont so you get fancy icons! (I use JetBrains Mono)</li>\n<li><code>include-modules.ini</code>
  is where I list out all the config files in <code>modules/</code> so I can basically
  source just the <code>include-modules.ini</code> without explicitly sourcing every
  module's config in every polybar defintion.</li>\n<li><code>launch.sh</code> is
  a simple shell script to launch the polybar! You'll see mine takes multiple monitors
  into consideration which I manage via environment variables setup in my <code>.zshenv</code>
  file that is different for my work and home setups.</li>\n<li>Finally there are
  <code>home-modules.ini</code> and <code>work-modules.ini</code> which is where,
  for each of my bars, I define which modules I want!</li>\n</ol>\n<h2 id=\"config\">Config</h2>\n<p>My
  <code>config.ini</code> file has 2 bar definitions in it - here's my home one:</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"na\">include-file</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">$DOTFILES/polybar/include-modules.ini</span>\n\n<span
  class=\"k\">[bar/home]</span>\n<span class=\"na\">monitor</span><span class=\"w\">
  </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">${env:MONITOR:}</span>\n<span
  class=\"na\">width</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">100%</span>\n<span class=\"na\">height</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">25</span>\n<span
  class=\"na\">radius</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">8.0</span>\n<span class=\"na\">fixed-center</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">true</span>\n<span
  class=\"na\">bottom</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">false</span>\n\n<span class=\"na\">background</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">${colors.background}</span>\n<span
  class=\"na\">foreground</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">${colors.foreground}</span>\n\n<span class=\"na\">include-file</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">$DOTFILES/polybar/fonts.ini</span>\n<span
  class=\"na\">include-file</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">$DOTFILES/polybar/home-modules.ini</span>\n</code></pre></div>\n<p>It
  should be easy to follow - I bring in the <code>include-modules</code>, set a few
  colors for the bar like <code>background</code> and <code>foreground</code> which
  are sourced by the <code>colors.ini</code>, and finally bring in my fonts and home
  modules via their config files!</p>\n<p>It's super easy to then change one or two
  things in the appropriate places rather than combing through one massive config.
  This also makes it easy for me to seperate my work and home setups.</p>\n<h2 id=\"modules\">Modules</h2>\n<p>There
  are several builtin modules, like <code>wlan</code> which gives your wifi status
  right there in polybar.</p>\n<p>You can also make custom ones. \nA big-time custom
  one for me is an indicator of whether or not I have an active AWS token for working
  with the <code>aws</code> cli.</p>\n<p>This is defined in<code>modules/aws.ini</code>
  and it looks like this:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">[module/aws]</span>\n<span class=\"na\">interval</span><span class=\"w\">
  </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">5.0</span>\n<span
  class=\"na\">type</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">custom/script</span>\n<span class=\"na\">exec</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">has_aws_token</span>\n<span
  class=\"na\">click-left</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">$HOME/.local/bin/auto_get_aws_token</span>\n<span
  class=\"na\">click-right</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">rm -rf ~/.aws/credentials</span>\n</code></pre></div>\n<p>Every
  <code>5</code> seconds my <code>has_aws_token</code> script is ran.\nThat script
  looks like this:</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"ch\">#!/bin/bash</span>\n<span
  class=\"nb\">source</span><span class=\"w\"> </span>auto_proxy\naws<span class=\"w\">
  </span>sts<span class=\"w\"> </span>get-caller-identity<span class=\"w\"> </span><span
  class=\"p\">&amp;</span>&gt;<span class=\"w\"> </span>/dev/null<span class=\"w\">
  </span><span class=\"o\">&amp;&amp;</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
  class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#00ff00}  %{F-}%{T-}&quot;</span><span
  class=\"w\">  </span><span class=\"o\">||(</span><span class=\"w\"> </span><span
  class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;%{T5}%{F#ff0000}
  %{F-}%{T-}&quot;</span><span class=\"w\"> </span><span class=\"o\">)</span>\n</code></pre></div>\n<p>See
  how the script echos out a colored icon to indicate the status of my token -&gt;
  that icon is displayed in the polybar so I have real-time (5 second latency) status
  of whether or not I can do things in my AWS environment.</p>\n<p>In the module I
  also configured actions for <code>click-left</code> and <code>click-right</code>
  which are as straight forward as could be.</p>\n<h2 id=\"my-issues-with-i3\">My
  issues with i3</h2>\n<p>There's a few things to be considerate of if you use <code>i3</code>
  such as needing a workaround for a centered bar that <strong>is not</strong> the
  full width of the monitor.\nPolybar can look really nice by not taking up the full
  width of the bar which you can configure in <code>config.ini</code> with these options:</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"na\">width</span><span
  class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span class=\"s\">90%</span>\n<span
  class=\"na\">offset-x</span><span class=\"w\"> </span><span class=\"o\">=</span><span
  class=\"w\"> </span><span class=\"s\">5%</span><span class=\"w\">  </span><span
  class=\"c1\"># set to (100 - width) / 2</span>\n</code></pre></div>\n<p>However
  due to an issue with polybar and i3 you need to also set <code>override-redirect
  = true</code>. \nBUT then you'll notice that the bar overlaps your i3 windows...
  ARGH! what do we do?</p>\n<p>Quick work around is to set <code>gaps top</code> in
  your i3 config if you use i3-gaps... if not? well, idk... use gaps... lol</p>\n<p>However
  this introduces another issue - which is then full screen windows will  have polybar
  sitting on top of them...</p>\n<p>This isn't necessarily a deal breaker, but for
  me it's worth it to just have the bar go 100% width.</p>\n<h2 id=\"fin\">FIN</h2>\n<p>There's
  a tiny intro to polybar and how I organize my config files so things are easy to
  edit and manage!\nFeel free to grab mine and try it out!</p>\n<div class='prevnext'>\n\n
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
  \   <a class='next' href='/vim-spell-check'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Vim-Spell-Check</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I use it with i3-gaps on Ubuntu for work and it makes my day just
  that much better to have a clean and elegant bar with the things in it that I care
  about. The GitHub has all the instructions you I want to make some notes about how
  I use polybar and '
now: 2024-06-26 16:50:21.524230
path: pages/blog/polybar-01.md
published: true
slug: polybar-01
super_description: I use it with i3-gaps on Ubuntu for work and it makes my day just
  that much better to have a clean and elegant bar with the things in it that I care
  about. The GitHub has all the instructions you I want to make some notes about how
  I use polybar and customize it. First of all, I recently moved my polybar config
  out of one config file into a modular structure that keeps my config files small
  and easiser to edit. You can find my config  The apps or services you put into polybar
  are called  This se
tags:
- linux
- tech
templateKey: blog-post
title: Polybar-01
today: 2024-06-26
---

[polybar](https://github.com/polybar/polybar) is an awesome and super customizable status bar for your desktop environment.

I use it with i3-gaps on Ubuntu for work and it makes my day just that much better to have a clean and elegant bar with the things in it that I care about.

The GitHub has all the instructions you'd need to install and get started with an example.

I want to make some notes about how I use polybar and customize it.

## Organization

First of all, I recently moved my polybar config out of one config file into a modular structure that keeps my config files small and easiser to edit.

You can find my config [here](https://github.com/nicpayne713/dotfiles/tree/main/polybar)

The apps or services you put into polybar are called `modules`.
I have moved all of my modules into their own config files and I source them with one centralized `include-modules.ini` config.

This separation also makes it easier for me to keep my home and work polybars as in sync as possible without duplicating a ton of config!

```bash
./polybar
├── colors.ini
├── config.ini
├── fonts.ini
├── home-modules.ini
├── include-modules.ini
├── launch.sh
├── modules
│   ├── aws.ini
│   ├── battery.ini
│   ├── bluetooth.ini
│   ├── cisco.ini
│   ├── cpu.ini
│   ├── date.ini
│   ├── eth.ini
│   ├── eth_work.ini
│   ├── i3.ini
│   ├── memory.ini
│   ├── nm-editor.ini
│   ├── powermenu.ini
│   ├── pulseaudio-control.ini
│   ├── pulseaudio.ini
│   ├── rofi.ini
│   ├── vpn.ini
│   └── wlan.ini
└── work-modules.ini

1 directory, 24 files
```

To break this down there are several configs to see:

1. `colors.ini` is what you'd expect - a set of defined colors like `foreground`, `underline`, etc.
2. `config.ini` is the general polybar config file where bars are defined. Currently in mine there is a `work` and `home` bar defined with the modules sourced in from the explicit config files.
3. `fonts.ini ` is like `colors.ini` -> you put fonts here. I recommend using a font patched with NerdFont so you get fancy icons! (I use JetBrains Mono)
4. `include-modules.ini` is where I list out all the config files in `modules/` so I can basically source just the `include-modules.ini` without explicitly sourcing every module's config in every polybar defintion.
5. `launch.sh` is a simple shell script to launch the polybar! You'll see mine takes multiple monitors into consideration which I manage via environment variables setup in my `.zshenv` file that is different for my work and home setups.
6. Finally there are `home-modules.ini` and `work-modules.ini` which is where, for each of my bars, I define which modules I want!

## Config

My `config.ini` file has 2 bar definitions in it - here's my home one:

```ini
include-file = $DOTFILES/polybar/include-modules.ini

[bar/home]
monitor = ${env:MONITOR:}
width = 100%
height = 25
radius = 8.0
fixed-center = true
bottom = false

background = ${colors.background}
foreground = ${colors.foreground}

include-file = $DOTFILES/polybar/fonts.ini
include-file = $DOTFILES/polybar/home-modules.ini
```

It should be easy to follow - I bring in the `include-modules`, set a few colors for the bar like `background` and `foreground` which are sourced by the `colors.ini`, and finally bring in my fonts and home modules via their config files!

It's super easy to then change one or two things in the appropriate places rather than combing through one massive config. This also makes it easy for me to seperate my work and home setups.


## Modules

There are several builtin modules, like `wlan` which gives your wifi status right there in polybar.

You can also make custom ones. 
A big-time custom one for me is an indicator of whether or not I have an active AWS token for working with the `aws` cli.

This is defined in` modules/aws.ini` and it looks like this:

```ini
[module/aws]
interval = 5.0
type = custom/script
exec = has_aws_token
click-left = $HOME/.local/bin/auto_get_aws_token
click-right = rm -rf ~/.aws/credentials
```

Every `5` seconds my `has_aws_token` script is ran.
That script looks like this:

```bash
#!/bin/bash
source auto_proxy
aws sts get-caller-identity &> /dev/null && echo "%{T5}%{F#00ff00}  %{F-}%{T-}"  ||( echo "%{T5}%{F#ff0000} %{F-}%{T-}" )
```

See how the script echos out a colored icon to indicate the status of my token -> that icon is displayed in the polybar so I have real-time (5 second latency) status of whether or not I can do things in my AWS environment.

In the module I also configured actions for `click-left` and `click-right` which are as straight forward as could be.

## My issues with i3


There's a few things to be considerate of if you use `i3` such as needing a workaround for a centered bar that __is not__ the full width of the monitor.
Polybar can look really nice by not taking up the full width of the bar which you can configure in `config.ini` with these options:

```ini
width = 90%
offset-x = 5%  # set to (100 - width) / 2
```

However due to an issue with polybar and i3 you need to also set `override-redirect = true`. 
BUT then you'll notice that the bar overlaps your i3 windows... ARGH! what do we do?

Quick work around is to set `gaps top` in your i3 config if you use i3-gaps... if not? well, idk... use gaps... lol

However this introduces another issue - which is then full screen windows will  have polybar sitting on top of them...

This isn't necessarily a deal breaker, but for me it's worth it to just have the bar go 100% width.


## FIN

There's a tiny intro to polybar and how I organize my config files so things are easy to edit and manage!
Feel free to grab mine and try it out!
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
    
    <a class='next' href='/vim-spell-check'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Vim-Spell-Check</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>