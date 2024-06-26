---
article_html: "<p>I was introduced to tiling window managers through i3, which I use
  heavily on\none of my machines. I have switched to Pop_OS! at home though, which
  has a\ntiling window mode but the keybindings are not what I'm used to for i3. I\nwanted
  to at least navigate workspaces how I'm used to doing (cause I set\nworkspace 3
  for communication apps, 1 for my terminal, etc...)</p>\n<p>Here's how I set keybindings
  for:</p>\n<ul>\n<li><code>&lt;Super&gt; + &lt;number&gt;</code> sends me to that
  numbered workspace</li>\n<li><code>&lt;Shift&gt; + &lt;Super&gt; + &lt;number&gt;</code>
  moves the window I'm focused on to workspace <code>number</code></li>\n</ul>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"ch\">#!/bin/bash</span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.mutter<span
  class=\"w\"> </span>dynamic-workspaces<span class=\"w\"> </span><span class=\"nb\">false</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.preferences<span class=\"w\"> </span>num-workspaces<span
  class=\"w\"> </span><span class=\"m\">8</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-1<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-2<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-3<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-4<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-5<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-6<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-7<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-8<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-9<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-1<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;1&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-2<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;2&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-3<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;3&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-4<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;4&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-5<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;5&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-6<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;6&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-7<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;7&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-8<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;8&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-9<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;9&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-10<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;0&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-1<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;1&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-2<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;2&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-3<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;3&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-4<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;4&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-5<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;5&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-6<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;6&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-7<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;7&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-8<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;8&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-9<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;9&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-10<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;0&#39;]&quot;</span>\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/ffmpeg-10-bit-videos-to-8-bit'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>FFMPEG
  10-bit videos to 8-bit</p>\n        </div>\n    </a>\n\n    <a class='next' href='/use-non-standard-named-ssh-keys-with-github'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Use non-standard named ssh keys with github</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2023-01-12
datetime: 2023-01-12 00:00:00+00:00
description: I was introduced to tiling window managers through i3, which I use heavily
  on Here <Super> + <number> <Shift> + <Super> + <number>
edit_link: https://github.com/edit/main/pages/til/i3-like-keyboard-mapping-in-pop_os.md
html: "<p>I was introduced to tiling window managers through i3, which I use heavily
  on\none of my machines. I have switched to Pop_OS! at home though, which has a\ntiling
  window mode but the keybindings are not what I'm used to for i3. I\nwanted to at
  least navigate workspaces how I'm used to doing (cause I set\nworkspace 3 for communication
  apps, 1 for my terminal, etc...)</p>\n<p>Here's how I set keybindings for:</p>\n<ul>\n<li><code>&lt;Super&gt;
  + &lt;number&gt;</code> sends me to that numbered workspace</li>\n<li><code>&lt;Shift&gt;
  + &lt;Super&gt; + &lt;number&gt;</code> moves the window I'm focused on to workspace
  <code>number</code></li>\n</ul>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"ch\">#!/bin/bash</span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.mutter<span class=\"w\"> </span>dynamic-workspaces<span
  class=\"w\"> </span><span class=\"nb\">false</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.desktop.wm.preferences<span
  class=\"w\"> </span>num-workspaces<span class=\"w\"> </span><span class=\"m\">8</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-1<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-2<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-3<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-4<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-5<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-6<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-7<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.shell.keybindings<span
  class=\"w\"> </span>switch-to-application-8<span class=\"w\"> </span><span class=\"o\">[]</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.shell.keybindings<span class=\"w\"> </span>switch-to-application-9<span
  class=\"w\"> </span><span class=\"o\">[]</span><span class=\"w\"> </span>\ngsettings<span
  class=\"w\"> </span><span class=\"nb\">set</span><span class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span
  class=\"w\"> </span>switch-to-workspace-1<span class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;1&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-2<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;2&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-3<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;3&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-4<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;4&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-5<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;5&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-6<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;6&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-7<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;7&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-8<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;8&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-9<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;9&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>switch-to-workspace-10<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;0&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-1<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;1&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-2<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;2&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-3<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;3&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-4<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;4&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-5<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;5&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-6<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;6&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-7<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;7&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-8<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;8&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-9<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;9&#39;]&quot;</span><span
  class=\"w\"> </span>\ngsettings<span class=\"w\"> </span><span class=\"nb\">set</span><span
  class=\"w\"> </span>org.gnome.desktop.wm.keybindings<span class=\"w\"> </span>move-to-workspace-10<span
  class=\"w\"> </span><span class=\"s2\">&quot;[&#39;&lt;Super&gt;&lt;Shift&gt;0&#39;]&quot;</span>\n</code></pre></div>\n<div
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
  \   </style>\n\n    <a class='prev' href='/ffmpeg-10-bit-videos-to-8-bit'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>FFMPEG
  10-bit videos to 8-bit</p>\n        </div>\n    </a>\n\n    <a class='next' href='/use-non-standard-named-ssh-keys-with-github'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Use non-standard named ssh keys with github</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I was introduced to tiling window managers through i3, which I use
  heavily on Here <Super> + <number> <Shift> + <Super> + <number>
now: 2024-06-26 16:50:21.523891
path: pages/til/i3-like-keyboard-mapping-in-pop_os.md
published: true
slug: i3-like-keyboard-mapping-in-pop-os
super_description: I was introduced to tiling window managers through i3, which I
  use heavily on Here <Super> + <number> <Shift> + <Super> + <number>
tags:
- linux
- linux
- tech
templateKey: til
title: i3-Like keyboard mapping in Pop_OS
today: 2024-06-26
---

I was introduced to tiling window managers through i3, which I use heavily on
one of my machines. I have switched to Pop_OS! at home though, which has a
tiling window mode but the keybindings are not what I'm used to for i3. I
wanted to at least navigate workspaces how I'm used to doing (cause I set
workspace 3 for communication apps, 1 for my terminal, etc...)

Here's how I set keybindings for:

* `<Super> + <number>` sends me to that numbered workspace
* `<Shift> + <Super> + <number>` moves the window I'm focused on to workspace `number`

```bash
#!/bin/bash
gsettings set org.gnome.mutter dynamic-workspaces false 
gsettings set org.gnome.desktop.wm.preferences num-workspaces 8 
gsettings set org.gnome.shell.keybindings switch-to-application-1 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-2 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-3 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-4 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-5 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-6 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-7 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-8 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-9 [] 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-1 "['<Super>1']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-2 "['<Super>2']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-3 "['<Super>3']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-4 "['<Super>4']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-5 "['<Super>5']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-6 "['<Super>6']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-7 "['<Super>7']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-8 "['<Super>8']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-9 "['<Super>9']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-10 "['<Super>0']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-1 "['<Super><Shift>1']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-2 "['<Super><Shift>2']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-3 "['<Super><Shift>3']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-4 "['<Super><Shift>4']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-5 "['<Super><Shift>5']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-6 "['<Super><Shift>6']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-7 "['<Super><Shift>7']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-8 "['<Super><Shift>8']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-9 "['<Super><Shift>9']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-10 "['<Super><Shift>0']"
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
    
    <a class='prev' href='/ffmpeg-10-bit-videos-to-8-bit'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>FFMPEG 10-bit videos to 8-bit</p>
        </div>
    </a>
    
    <a class='next' href='/use-non-standard-named-ssh-keys-with-github'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Use non-standard named ssh keys with github</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>