---
article_html: "<p>I've had <code>Plug 'hrsh7th/cmp-path'</code> in my plugins for
  ever but didn't notice\nuntil recently that I wasn't getting any filepath completion
  in vim!</p>\n<p><strong>Fuller setup instructions below the TLDR</strong></p>\n<h1
  id=\"tldr\">TL;DR</h1>\n<p>Turns out I need to not be a dope and configure nvim-cmp
  to actually use it...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kd\">local</span> <span class=\"n\">cmp</span> <span class=\"o\">=</span>
  <span class=\"nb\">require</span><span class=\"s1\">&#39;cmp&#39;</span>\n\n<span
  class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">setup</span><span
  class=\"p\">({</span>\n    <span class=\"c1\">-- removed rest of setup - see the
  rest in my dotfiles</span>\n  <span class=\"n\">sources</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">config</span><span
  class=\"p\">.</span><span class=\"n\">sources</span><span class=\"p\">({</span>\n
  \   <span class=\"p\">{</span> <span class=\"n\">name</span> <span class=\"o\">=</span>
  <span class=\"s1\">&#39;path&#39;</span> <span class=\"p\">},</span>  <span class=\"c1\">--
  This needs to be here!</span>\n    <span class=\"p\">})</span>\n<span class=\"p\">})</span>\n</code></pre></div>\n<h1
  id=\"my-setup\">My Setup</h1>\n<p>For the sake of completeness here is how I currently
  (May 2022) configure completion in Neovim usin <code>nvim-cmp</code></p>\n<h2 id=\"plugins\">Plugins</h2>\n<p>I
  keep all my plugins in <code>plugins.vim</code></p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">call</span> plug#begin<span class=\"p\">(</span>s:plug_dir<span class=\"p\">)</span>\nPlug
  <span class=\"s1\">&#39;neovim/nvim-lspconfig&#39;</span>\nPlug <span class=\"s1\">&#39;hrsh7th/cmp-nvim-lsp&#39;</span>\nPlug
  <span class=\"s1\">&#39;hrsh7th/cmp-buffer&#39;</span>\nPlug <span class=\"s1\">&#39;hrsh7th/cmp-path&#39;</span>\nPlug
  <span class=\"s1\">&#39;hrsh7th/cmp-cmdline&#39;</span>\nPlug <span class=\"s1\">&#39;hrsh7th/nvim-cmp&#39;</span>\n\n<span
  class=\"c\">&quot; For ultisnips users.</span>\n<span class=\"p\">&lt;!--</span>
  <span class=\"c\">&quot; Plug &#39;SirVer/ultisnips&#39; --&gt;</span>\n<span class=\"p\">&lt;!--</span>
  <span class=\"c\">&quot; Plug &#39;quangnguyen30192/cmp-nvim-ultisnips&#39; --&gt;</span>\n\n<span
  class=\"k\">call</span> plug#<span class=\"k\">end</span><span class=\"p\">()</span>\n</code></pre></div>\n<h2
  id=\"vim-settings\">Vim Settings</h2>\n<p>My vim settings are also kept in their
  own file, <code>settings.vim</code></p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">set</span> <span class=\"nb\">completeopt</span><span class=\"p\">=</span>menu<span
  class=\"p\">,</span>menuone<span class=\"p\">,</span>noselect\n</code></pre></div>\n<h2
  id=\"nvim-cmp-configuration\">nvim-cmp configuration</h2>\n<p>I have a <code>cmp.lua</code>
  file that gets sourced in <code>init.lua</code> (file structure explained below)
  for configuring cmp.</p>\n<div class=\"highlight\"><pre><span></span><code>  <span
  class=\"c1\">-- Setup nvim-cmp.</span>\n<span class=\"kd\">local</span> <span class=\"n\">cmp</span>
  <span class=\"o\">=</span> <span class=\"nb\">require</span><span class=\"s1\">&#39;cmp&#39;</span>\n\n<span
  class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">setup</span><span
  class=\"p\">({</span>\n  <span class=\"n\">snippet</span> <span class=\"o\">=</span>
  <span class=\"p\">{</span>\n    <span class=\"c1\">-- REQUIRED - you must specify
  a snippet engine</span>\n    <span class=\"n\">expand</span> <span class=\"o\">=</span>
  <span class=\"kr\">function</span><span class=\"p\">(</span><span class=\"n\">args</span><span
  class=\"p\">)</span>\n      <span class=\"c1\">-- For `ultisnips` user.</span>\n
  \     <span class=\"n\">vim</span><span class=\"p\">.</span><span class=\"n\">fn</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;UltiSnips#Anon&quot;</span><span class=\"p\">](</span><span
  class=\"n\">args</span><span class=\"p\">.</span><span class=\"n\">body</span><span
  class=\"p\">)</span>\n    <span class=\"kr\">end</span><span class=\"p\">,</span>\n
  \ <span class=\"p\">},</span>\n  <span class=\"n\">window</span> <span class=\"o\">=</span>
  <span class=\"p\">{</span>\n      <span class=\"n\">completion</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">config</span><span
  class=\"p\">.</span><span class=\"n\">window</span><span class=\"p\">.</span><span
  class=\"n\">bordered</span><span class=\"p\">(),</span>\n  <span class=\"p\">},</span>\n
  \ <span class=\"n\">mapping</span> <span class=\"o\">=</span> <span class=\"p\">{</span>\n
  \   <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;Down&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">select_next_item</span><span class=\"p\">({</span> <span class=\"n\">behavior</span>
  <span class=\"o\">=</span> <span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">SelectBehavior</span><span class=\"p\">.</span><span class=\"n\">Select</span>
  <span class=\"p\">}),</span>\n    <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;Up&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">select_prev_item</span><span class=\"p\">({</span> <span class=\"n\">behavior</span>
  <span class=\"o\">=</span> <span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">SelectBehavior</span><span class=\"p\">.</span><span class=\"n\">Select</span>
  <span class=\"p\">}),</span>\n    <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;C-d&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">scroll_docs</span><span class=\"p\">(</span><span class=\"o\">-</span><span
  class=\"mi\">4</span><span class=\"p\">),</span>\n    <span class=\"p\">[</span><span
  class=\"s1\">&#39;&lt;C-f&gt;&#39;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">mapping</span><span
  class=\"p\">.</span><span class=\"n\">scroll_docs</span><span class=\"p\">(</span><span
  class=\"mi\">4</span><span class=\"p\">),</span>\n    <span class=\"p\">[</span><span
  class=\"s1\">&#39;&lt;C-Space&gt;&#39;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">mapping</span><span
  class=\"p\">.</span><span class=\"n\">complete</span><span class=\"p\">(),</span>\n
  \   <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;C-e&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">close</span><span class=\"p\">(),</span>\n    <span class=\"p\">[</span><span
  class=\"s1\">&#39;&lt;Tab&gt;&#39;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">mapping</span><span
  class=\"p\">(</span><span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">mapping</span><span class=\"p\">.</span><span class=\"n\">select_next_item</span><span
  class=\"p\">(),</span> <span class=\"p\">{</span> <span class=\"s1\">&#39;i&#39;</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;s&#39;</span> <span class=\"p\">}),</span>\n
  \   <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;CR&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">confirm</span><span class=\"p\">({</span>\n      <span class=\"n\">behavior</span>
  <span class=\"o\">=</span> <span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">ConfirmBehavior</span><span class=\"p\">.</span><span class=\"n\">Replace</span><span
  class=\"p\">,</span>\n      <span class=\"nb\">select</span> <span class=\"o\">=</span>
  <span class=\"kc\">true</span><span class=\"p\">,</span>\n    <span class=\"p\">})</span>\n
  \ <span class=\"p\">},</span>\n  <span class=\"n\">sources</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">config</span><span
  class=\"p\">.</span><span class=\"n\">sources</span><span class=\"p\">({</span>\n
  \   <span class=\"p\">{</span> <span class=\"n\">name</span> <span class=\"o\">=</span>
  <span class=\"s1\">&#39;nvim_lsp&#39;</span> <span class=\"p\">},</span>\n    <span
  class=\"p\">{</span> <span class=\"n\">name</span> <span class=\"o\">=</span> <span
  class=\"s1\">&#39;ultisnips&#39;</span> <span class=\"p\">},</span>\n    <span class=\"p\">{</span>
  <span class=\"n\">name</span> <span class=\"o\">=</span> <span class=\"s1\">&#39;buffer&#39;</span>
  <span class=\"p\">},</span>\n    <span class=\"p\">{</span> <span class=\"n\">name</span>
  <span class=\"o\">=</span> <span class=\"s1\">&#39;path&#39;</span> <span class=\"p\">},</span>\n
  \   <span class=\"p\">{</span> <span class=\"n\">name</span> <span class=\"o\">=</span>
  <span class=\"s1\">&#39;tmux&#39;</span> <span class=\"p\">},</span>\n    <span
  class=\"p\">})</span>\n<span class=\"p\">})</span>\n</code></pre></div>\n<p>The
  <code>sources</code> section is what was key for this post...</p>\n<h1 id=\"piecing-it-together\">Piecing
  it together!</h1>\n<p>My <code>init.vim</code> sources plugins and then settings
  and then finally calls <code>init.lua</code>.\n<code>init.lua</code> sources my
  <code>cmp.lua</code> file and BANG! auto-completion.</p>\n<h2 id=\"more-sources\">More
  sources</h2>\n<p>hrsh7th's wiki for <code>nvim-cmp</code> is <a href=\"https://github.com/hrsh7th/nvim-cmp/wiki/List-of-sources\">here</a>
  and has example configs as well as a list of sources...</p>\n<p><strong>Don't forget
  to configure and not just install!</strong></p>\n<p><a href=\"https://github.com/nicpayne713/dotfiles\">my
  dotfiles</a></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
  {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"] {\n
  \     --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
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
  \   </style>\n\n    <a class='prev' href='/plug-snapshot'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Plug Snapshot!</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/plug-snapshot-to-save-your-life'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Plug-Snapshot-To-Save-Your-Life</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-05-17
datetime: 2022-05-17 00:00:00+00:00
description: I Turns out I need to not be a dope and configure nvim-cmp to actually
  use it... For the sake of completeness here is how I currently (May 2022) configure
  compl
edit_link: https://github.com/edit/main/pages/til/filepath-completion-in-neovim.md
html: "<p>I've had <code>Plug 'hrsh7th/cmp-path'</code> in my plugins for ever but
  didn't notice\nuntil recently that I wasn't getting any filepath completion in vim!</p>\n<p><strong>Fuller
  setup instructions below the TLDR</strong></p>\n<h1 id=\"tldr\">TL;DR</h1>\n<p>Turns
  out I need to not be a dope and configure nvim-cmp to actually use it...</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"kd\">local</span> <span
  class=\"n\">cmp</span> <span class=\"o\">=</span> <span class=\"nb\">require</span><span
  class=\"s1\">&#39;cmp&#39;</span>\n\n<span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">setup</span><span class=\"p\">({</span>\n    <span class=\"c1\">-- removed
  rest of setup - see the rest in my dotfiles</span>\n  <span class=\"n\">sources</span>
  <span class=\"o\">=</span> <span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">config</span><span class=\"p\">.</span><span class=\"n\">sources</span><span
  class=\"p\">({</span>\n    <span class=\"p\">{</span> <span class=\"n\">name</span>
  <span class=\"o\">=</span> <span class=\"s1\">&#39;path&#39;</span> <span class=\"p\">},</span>
  \ <span class=\"c1\">-- This needs to be here!</span>\n    <span class=\"p\">})</span>\n<span
  class=\"p\">})</span>\n</code></pre></div>\n<h1 id=\"my-setup\">My Setup</h1>\n<p>For
  the sake of completeness here is how I currently (May 2022) configure completion
  in Neovim usin <code>nvim-cmp</code></p>\n<h2 id=\"plugins\">Plugins</h2>\n<p>I
  keep all my plugins in <code>plugins.vim</code></p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">call</span> plug#begin<span class=\"p\">(</span>s:plug_dir<span class=\"p\">)</span>\nPlug
  <span class=\"s1\">&#39;neovim/nvim-lspconfig&#39;</span>\nPlug <span class=\"s1\">&#39;hrsh7th/cmp-nvim-lsp&#39;</span>\nPlug
  <span class=\"s1\">&#39;hrsh7th/cmp-buffer&#39;</span>\nPlug <span class=\"s1\">&#39;hrsh7th/cmp-path&#39;</span>\nPlug
  <span class=\"s1\">&#39;hrsh7th/cmp-cmdline&#39;</span>\nPlug <span class=\"s1\">&#39;hrsh7th/nvim-cmp&#39;</span>\n\n<span
  class=\"c\">&quot; For ultisnips users.</span>\n<span class=\"p\">&lt;!--</span>
  <span class=\"c\">&quot; Plug &#39;SirVer/ultisnips&#39; --&gt;</span>\n<span class=\"p\">&lt;!--</span>
  <span class=\"c\">&quot; Plug &#39;quangnguyen30192/cmp-nvim-ultisnips&#39; --&gt;</span>\n\n<span
  class=\"k\">call</span> plug#<span class=\"k\">end</span><span class=\"p\">()</span>\n</code></pre></div>\n<h2
  id=\"vim-settings\">Vim Settings</h2>\n<p>My vim settings are also kept in their
  own file, <code>settings.vim</code></p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">set</span> <span class=\"nb\">completeopt</span><span class=\"p\">=</span>menu<span
  class=\"p\">,</span>menuone<span class=\"p\">,</span>noselect\n</code></pre></div>\n<h2
  id=\"nvim-cmp-configuration\">nvim-cmp configuration</h2>\n<p>I have a <code>cmp.lua</code>
  file that gets sourced in <code>init.lua</code> (file structure explained below)
  for configuring cmp.</p>\n<div class=\"highlight\"><pre><span></span><code>  <span
  class=\"c1\">-- Setup nvim-cmp.</span>\n<span class=\"kd\">local</span> <span class=\"n\">cmp</span>
  <span class=\"o\">=</span> <span class=\"nb\">require</span><span class=\"s1\">&#39;cmp&#39;</span>\n\n<span
  class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">setup</span><span
  class=\"p\">({</span>\n  <span class=\"n\">snippet</span> <span class=\"o\">=</span>
  <span class=\"p\">{</span>\n    <span class=\"c1\">-- REQUIRED - you must specify
  a snippet engine</span>\n    <span class=\"n\">expand</span> <span class=\"o\">=</span>
  <span class=\"kr\">function</span><span class=\"p\">(</span><span class=\"n\">args</span><span
  class=\"p\">)</span>\n      <span class=\"c1\">-- For `ultisnips` user.</span>\n
  \     <span class=\"n\">vim</span><span class=\"p\">.</span><span class=\"n\">fn</span><span
  class=\"p\">[</span><span class=\"s2\">&quot;UltiSnips#Anon&quot;</span><span class=\"p\">](</span><span
  class=\"n\">args</span><span class=\"p\">.</span><span class=\"n\">body</span><span
  class=\"p\">)</span>\n    <span class=\"kr\">end</span><span class=\"p\">,</span>\n
  \ <span class=\"p\">},</span>\n  <span class=\"n\">window</span> <span class=\"o\">=</span>
  <span class=\"p\">{</span>\n      <span class=\"n\">completion</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">config</span><span
  class=\"p\">.</span><span class=\"n\">window</span><span class=\"p\">.</span><span
  class=\"n\">bordered</span><span class=\"p\">(),</span>\n  <span class=\"p\">},</span>\n
  \ <span class=\"n\">mapping</span> <span class=\"o\">=</span> <span class=\"p\">{</span>\n
  \   <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;Down&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">select_next_item</span><span class=\"p\">({</span> <span class=\"n\">behavior</span>
  <span class=\"o\">=</span> <span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">SelectBehavior</span><span class=\"p\">.</span><span class=\"n\">Select</span>
  <span class=\"p\">}),</span>\n    <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;Up&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">select_prev_item</span><span class=\"p\">({</span> <span class=\"n\">behavior</span>
  <span class=\"o\">=</span> <span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">SelectBehavior</span><span class=\"p\">.</span><span class=\"n\">Select</span>
  <span class=\"p\">}),</span>\n    <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;C-d&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">scroll_docs</span><span class=\"p\">(</span><span class=\"o\">-</span><span
  class=\"mi\">4</span><span class=\"p\">),</span>\n    <span class=\"p\">[</span><span
  class=\"s1\">&#39;&lt;C-f&gt;&#39;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">mapping</span><span
  class=\"p\">.</span><span class=\"n\">scroll_docs</span><span class=\"p\">(</span><span
  class=\"mi\">4</span><span class=\"p\">),</span>\n    <span class=\"p\">[</span><span
  class=\"s1\">&#39;&lt;C-Space&gt;&#39;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">mapping</span><span
  class=\"p\">.</span><span class=\"n\">complete</span><span class=\"p\">(),</span>\n
  \   <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;C-e&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">close</span><span class=\"p\">(),</span>\n    <span class=\"p\">[</span><span
  class=\"s1\">&#39;&lt;Tab&gt;&#39;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">mapping</span><span
  class=\"p\">(</span><span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">mapping</span><span class=\"p\">.</span><span class=\"n\">select_next_item</span><span
  class=\"p\">(),</span> <span class=\"p\">{</span> <span class=\"s1\">&#39;i&#39;</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;s&#39;</span> <span class=\"p\">}),</span>\n
  \   <span class=\"p\">[</span><span class=\"s1\">&#39;&lt;CR&gt;&#39;</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">cmp</span><span
  class=\"p\">.</span><span class=\"n\">mapping</span><span class=\"p\">.</span><span
  class=\"n\">confirm</span><span class=\"p\">({</span>\n      <span class=\"n\">behavior</span>
  <span class=\"o\">=</span> <span class=\"n\">cmp</span><span class=\"p\">.</span><span
  class=\"n\">ConfirmBehavior</span><span class=\"p\">.</span><span class=\"n\">Replace</span><span
  class=\"p\">,</span>\n      <span class=\"nb\">select</span> <span class=\"o\">=</span>
  <span class=\"kc\">true</span><span class=\"p\">,</span>\n    <span class=\"p\">})</span>\n
  \ <span class=\"p\">},</span>\n  <span class=\"n\">sources</span> <span class=\"o\">=</span>
  <span class=\"n\">cmp</span><span class=\"p\">.</span><span class=\"n\">config</span><span
  class=\"p\">.</span><span class=\"n\">sources</span><span class=\"p\">({</span>\n
  \   <span class=\"p\">{</span> <span class=\"n\">name</span> <span class=\"o\">=</span>
  <span class=\"s1\">&#39;nvim_lsp&#39;</span> <span class=\"p\">},</span>\n    <span
  class=\"p\">{</span> <span class=\"n\">name</span> <span class=\"o\">=</span> <span
  class=\"s1\">&#39;ultisnips&#39;</span> <span class=\"p\">},</span>\n    <span class=\"p\">{</span>
  <span class=\"n\">name</span> <span class=\"o\">=</span> <span class=\"s1\">&#39;buffer&#39;</span>
  <span class=\"p\">},</span>\n    <span class=\"p\">{</span> <span class=\"n\">name</span>
  <span class=\"o\">=</span> <span class=\"s1\">&#39;path&#39;</span> <span class=\"p\">},</span>\n
  \   <span class=\"p\">{</span> <span class=\"n\">name</span> <span class=\"o\">=</span>
  <span class=\"s1\">&#39;tmux&#39;</span> <span class=\"p\">},</span>\n    <span
  class=\"p\">})</span>\n<span class=\"p\">})</span>\n</code></pre></div>\n<p>The
  <code>sources</code> section is what was key for this post...</p>\n<h1 id=\"piecing-it-together\">Piecing
  it together!</h1>\n<p>My <code>init.vim</code> sources plugins and then settings
  and then finally calls <code>init.lua</code>.\n<code>init.lua</code> sources my
  <code>cmp.lua</code> file and BANG! auto-completion.</p>\n<h2 id=\"more-sources\">More
  sources</h2>\n<p>hrsh7th's wiki for <code>nvim-cmp</code> is <a href=\"https://github.com/hrsh7th/nvim-cmp/wiki/List-of-sources\">here</a>
  and has example configs as well as a list of sources...</p>\n<p><strong>Don't forget
  to configure and not just install!</strong></p>\n<p><a href=\"https://github.com/nicpayne713/dotfiles\">my
  dotfiles</a></p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n    :root
  {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"] {\n
  \     --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
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
  \   </style>\n\n    <a class='prev' href='/plug-snapshot'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Plug Snapshot!</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/plug-snapshot-to-save-your-life'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Plug-Snapshot-To-Save-Your-Life</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I Turns out I need to not be a dope and configure nvim-cmp to actually
  use it... For the sake of completeness here is how I currently (May 2022) configure
  completion in Neovim usin  I keep all my plugins in  My vim settings are also kept
  in their own
now: 2024-08-01 13:40:17.987516
path: pages/til/filepath-completion-in-neovim.md
published: true
slug: filepath-completion-in-neovim
super_description: I Turns out I need to not be a dope and configure nvim-cmp to actually
  use it... For the sake of completeness here is how I currently (May 2022) configure
  completion in Neovim usin  I keep all my plugins in  My vim settings are also kept
  in their own file,  I have a  The  My  hrsh7th
tags:
- vim
- tech
templateKey: til
title: Filepath Completion in Neovim
today: 2024-08-01
---

I've had `Plug 'hrsh7th/cmp-path'` in my plugins for ever but didn't notice
until recently that I wasn't getting any filepath completion in vim!

__Fuller setup instructions below the TLDR__

# TL;DR

Turns out I need to not be a dope and configure nvim-cmp to actually use it...


```lua
local cmp = require'cmp'

cmp.setup({
    -- removed rest of setup - see the rest in my dotfiles
  sources = cmp.config.sources({
    { name = 'path' },  -- This needs to be here!
    })
})
```

# My Setup

For the sake of completeness here is how I currently (May 2022) configure completion in Neovim usin `nvim-cmp`

## Plugins

I keep all my plugins in `plugins.vim`

```vim
call plug#begin(s:plug_dir)
Plug 'neovim/nvim-lspconfig'
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
Plug 'hrsh7th/cmp-cmdline'
Plug 'hrsh7th/nvim-cmp'

" For ultisnips users.
<!-- " Plug 'SirVer/ultisnips' -->
<!-- " Plug 'quangnguyen30192/cmp-nvim-ultisnips' -->

call plug#end()

```

## Vim Settings

My vim settings are also kept in their own file, `settings.vim`

```vim

set completeopt=menu,menuone,noselect

```

## nvim-cmp configuration

I have a `cmp.lua` file that gets sourced in `init.lua` (file structure explained below) for configuring cmp.

```lua

  -- Setup nvim-cmp.
local cmp = require'cmp'

cmp.setup({
  snippet = {
    -- REQUIRED - you must specify a snippet engine
    expand = function(args)
      -- For `ultisnips` user.
      vim.fn["UltiSnips#Anon"](args.body)
    end,
  },
  window = {
      completion = cmp.config.window.bordered(),
  },
  mapping = {
    ['<Down>'] = cmp.mapping.select_next_item({ behavior = cmp.SelectBehavior.Select }),
    ['<Up>'] = cmp.mapping.select_prev_item({ behavior = cmp.SelectBehavior.Select }),
    ['<C-d>'] = cmp.mapping.scroll_docs(-4),
    ['<C-f>'] = cmp.mapping.scroll_docs(4),
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<C-e>'] = cmp.mapping.close(),
    ['<Tab>'] = cmp.mapping(cmp.mapping.select_next_item(), { 'i', 's' }),
    ['<CR>'] = cmp.mapping.confirm({
      behavior = cmp.ConfirmBehavior.Replace,
      select = true,
    })
  },
  sources = cmp.config.sources({
    { name = 'nvim_lsp' },
    { name = 'ultisnips' },
    { name = 'buffer' },
    { name = 'path' },
    { name = 'tmux' },
    })
})

```


The `sources` section is what was key for this post...

# Piecing it together!

My `init.vim` sources plugins and then settings and then finally calls `init.lua`.
`init.lua` sources my `cmp.lua` file and BANG! auto-completion.

## More sources

hrsh7th's wiki for `nvim-cmp` is [here](https://github.com/hrsh7th/nvim-cmp/wiki/List-of-sources) and has example configs as well as a list of sources...

__Don't forget to configure and not just install!__

[my dotfiles](https://github.com/nicpayne713/dotfiles)
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
    
    <a class='prev' href='/plug-snapshot'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Plug Snapshot!</p>
        </div>
    </a>
    
    <a class='next' href='/plug-snapshot-to-save-your-life'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Plug-Snapshot-To-Save-Your-Life</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>