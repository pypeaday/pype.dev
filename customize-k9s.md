---
article_html: "<p>To customize k9s use the skins from catppuccin or the ones k9s supplies</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"nv\">OUT</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"nv\">XDG_CONFIG_HOME</span><span
  class=\"k\">:-</span><span class=\"nv\">$HOME</span><span class=\"p\">/.config</span><span
  class=\"si\">}</span><span class=\"s2\">/k9s/skins&quot;</span>\nmkdir<span class=\"w\">
  </span>-p<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$OUT</span><span
  class=\"s2\">&quot;</span>\ncurl<span class=\"w\"> </span>-L<span class=\"w\"> </span>https://github.com/catppuccin/k9s/archive/main.tar.gz<span
  class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>tar<span
  class=\"w\"> </span>xz<span class=\"w\"> </span>-C<span class=\"w\"> </span><span
  class=\"s2\">&quot;</span><span class=\"nv\">$OUT</span><span class=\"s2\">&quot;</span><span
  class=\"w\"> </span>--strip-components<span class=\"o\">=</span><span class=\"m\">2</span><span
  class=\"w\"> </span>k9s-main/dist\n</code></pre></div>\n<p>Then edit your k9s config</p>\n<div
  class=\"highlight\"><pre><span></span><code># ~/.config/k9s/config.yml\nk9s:\n  ui:\n
  \   skin: catppuccin-mocha\n    # ...or another flavor:\n    # skin: catppuccin-macchiato\n
  \   # skin: catppuccin-frappe\n    # skin: catppuccin-latte\n\n    # ...or the transparent
  variants:\n    # skin: catppuccin-mocha-transparent\n    # skin: catppuccin-macchiato-transparent\n
  \   # skin: catppuccin-frappe-transparent\n    # skin: catppuccin-latte-transparent\n</code></pre></div>\n<p>Other
  k9s skins are available <a href=\"https://github.com/derailed/k9s/tree/master/skins\">here</a></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/fonts-in-vs-c-e'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Fonts in VS C**e</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/git-fetch-failing-check-your-config'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Git fetch failing - check your config</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
cover: ''
date: 2024-05-06
datetime: 2024-05-06 00:00:00+00:00
description: 'To customize k9s use the skins from catppuccin or the ones k9s supplies
  Then edit your k9s config Other k9s skins are available '
edit_link: https://github.com/edit/main/pages/til/customize-k9s.md
html: "<p>To customize k9s use the skins from catppuccin or the ones k9s supplies</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"nv\">OUT</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;</span><span class=\"si\">${</span><span class=\"nv\">XDG_CONFIG_HOME</span><span
  class=\"k\">:-</span><span class=\"nv\">$HOME</span><span class=\"p\">/.config</span><span
  class=\"si\">}</span><span class=\"s2\">/k9s/skins&quot;</span>\nmkdir<span class=\"w\">
  </span>-p<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$OUT</span><span
  class=\"s2\">&quot;</span>\ncurl<span class=\"w\"> </span>-L<span class=\"w\"> </span>https://github.com/catppuccin/k9s/archive/main.tar.gz<span
  class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>tar<span
  class=\"w\"> </span>xz<span class=\"w\"> </span>-C<span class=\"w\"> </span><span
  class=\"s2\">&quot;</span><span class=\"nv\">$OUT</span><span class=\"s2\">&quot;</span><span
  class=\"w\"> </span>--strip-components<span class=\"o\">=</span><span class=\"m\">2</span><span
  class=\"w\"> </span>k9s-main/dist\n</code></pre></div>\n<p>Then edit your k9s config</p>\n<div
  class=\"highlight\"><pre><span></span><code># ~/.config/k9s/config.yml\nk9s:\n  ui:\n
  \   skin: catppuccin-mocha\n    # ...or another flavor:\n    # skin: catppuccin-macchiato\n
  \   # skin: catppuccin-frappe\n    # skin: catppuccin-latte\n\n    # ...or the transparent
  variants:\n    # skin: catppuccin-mocha-transparent\n    # skin: catppuccin-macchiato-transparent\n
  \   # skin: catppuccin-frappe-transparent\n    # skin: catppuccin-latte-transparent\n</code></pre></div>\n<p>Other
  k9s skins are available <a href=\"https://github.com/derailed/k9s/tree/master/skins\">here</a></p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/fonts-in-vs-c-e'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Fonts in VS C**e</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/git-fetch-failing-check-your-config'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Git fetch failing - check your config</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
jinja: false
long_description: 'To customize k9s use the skins from catppuccin or the ones k9s
  supplies Then edit your k9s config Other k9s skins are available '
now: 2024-10-12 11:09:11.872214
path: pages/til/customize-k9s.md
published: true
slug: customize-k9s
super_description: 'To customize k9s use the skins from catppuccin or the ones k9s
  supplies Then edit your k9s config Other k9s skins are available '
tags:
- cli
- homelab
- tech
templateKey: til
title: Customize K9s
today: 2024-10-12
---

To customize k9s use the skins from catppuccin or the ones k9s supplies

```bash
OUT="${XDG_CONFIG_HOME:-$HOME/.config}/k9s/skins"
mkdir -p "$OUT"
curl -L https://github.com/catppuccin/k9s/archive/main.tar.gz | tar xz -C "$OUT" --strip-components=2 k9s-main/dist
```

Then edit your k9s config

```
# ~/.config/k9s/config.yml
k9s:
  ui:
    skin: catppuccin-mocha
    # ...or another flavor:
    # skin: catppuccin-macchiato
    # skin: catppuccin-frappe
    # skin: catppuccin-latte

    # ...or the transparent variants:
    # skin: catppuccin-mocha-transparent
    # skin: catppuccin-macchiato-transparent
    # skin: catppuccin-frappe-transparent
    # skin: catppuccin-latte-transparent
```

Other k9s skins are available [here](https://github.com/derailed/k9s/tree/master/skins)
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
    
    <a class='prev' href='/fonts-in-vs-c-e'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Fonts in VS C**e</p>
        </div>
    </a>
    
    <a class='next' href='/git-fetch-failing-check-your-config'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Git fetch failing - check your config</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>