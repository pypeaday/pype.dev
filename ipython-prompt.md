---
article_html: "<p>I have a <a href=\"/starship\">post on starship</a> where I have
  some notes on how I use starship to make my zsh experience great with a sweet terminal
  prompt.</p>\n<p>Now... I spend quite a bit of time in ipython every day and I got
  kind of sick of the vanilla experience and wanted something that more closely matched
  my starship prompt.</p>\n<p>There's more to customizing ipython I know for sure
  but here's 2 things I have going for me...</p>\n<ol>\n<li>\n<p>I use <a href=\"https://pypi.org/project/rich/\"><code>rich</code></a>
  authored by @<a href=\"https://twitter.com/willmcgugan\">Will McGugan</a> which
  makes much of my ipython experience great.\nI won't write about that here but you
  can find my <code>rich</code> config <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py\">here</a></p>\n</li>\n<li>\n<p>I
  used <code>pygments</code> to customize the ipython prompt with my <code>ipython_config.py</code>
  and a startup script, next to my <code>rich</code> one, called <code>99-prompt.py</code>.</p>\n</li>\n</ol>\n<blockquote>\n<p>The
  scripts inside <code>~/.ipython/&lt;profile&gt;/startup</code> are executed in lexigraphical
  order, so it's nice to name things in the 10's to give room for adding scripts in
  between others down the line.</p>\n</blockquote>\n<h2 id=\"my-prompt\">My prompt</h2>\n<p>My
  zsh prompt looks a little something like this:</p>\n<p><img alt=\"Alt Text\" src=\"/images/zsh-starship-prompt.png\"
  /></p>\n<p>And after my ipython customiztion it currently (subject to much change
  but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece on
  <code>main</code>).</p>\n<p><img alt=\"Alt Text\" src=\"/images/ipython-prompt.png\"
  /></p>\n<p>Now in ipython I have an indicator of my working directory, git branch,
  python environment, and a note that I'm in <code>ipython</code> and not <code>zsh</code>.\nI
  also configured my prompt to warn me if I'm <em>not</em> in a git directory!</p>\n<p><img
  alt=\"Alt Text\" src=\"/images/ipython-prompt-no-git.png\" /></p>\n<p>All in all
  the customization isn't too bad with just 2 specific files.</p>\n<h2 id=\"ipython_configpy\">ipython_config.py</h2>\n<p>There's
  several use cases for <code>ipython_config.py</code> files in several areas on a
  pc - sometimes you want a common config across users, so you'd drop one in <code>/etc/ipython</code>
  and othertimes you have your own which is probably at <code>~/.ipython</code></p>\n<p>My
  ipython config mostly has colors defined on <code>pygment tokens</code> plus a few
  autorun commands and <code>pyflyby</code> (see my friend Waylon's post on pyflyby
  <a href=\"https://waylonwalker.com/pyflyby/\">here</a>)</p>\n<p>I wanted to match
  my ipython somewhat to my tmux and vim color schemes, which I model after the vim-airline
  theme <code>night owl</code>.</p>\n<p>After picking some some colors and saving
  variables it's a matter of setting colors per token and then referencing those tokens
  in your version of <code>99-prompt.py</code>.</p>\n<p>You can check out my <code>ipython_config.py</code>
  <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py\">here</a></p>\n<p>For
  example, I can set <code>Token.Name.Function</code> to black, and in <code>ipython</code>
  then a function's definition will appear in black text. I set mine to cyan to match
  my theme.</p>\n<p>For the prompt colors just match the keyword in <code>c.TerminalInteractiveShell.highlighting_style_overrides</code>
  with what is referenced inside <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py\">99-prompt.py</a></p>\n<p>For
  example, <code>Token.Prompt</code> is set to <code>bold grey</code> which gives
  me the bold chevron symbol you see in the above image that looks like my zsh prompt
  </p>\n<p>Then in <code>99-prompt.py</code> I have this set for the prompt:</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">Token</span><span
  class=\"o\">.</span><span class=\"n\">Prompt</span> <span class=\"s2\">&quot;❯ &quot;</span>\n</code></pre></div>\n<h2
  id=\"99-promptpy\">99-prompt.py</h2>\n<p>You don't need to name your script <code>99-prompt.py</code>,
  but I wanted to know that it was for my prompt and I wanted it executed last so
  it made sense.</p>\n<p>Here I have <code>MyPrompt</code> class with the prompt symbol
  defined as above and several other things... </p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">class</span> <span class=\"nc\">MyPrompt</span><span class=\"p\">(</span><span
  class=\"n\">Prompts</span><span class=\"p\">):</span>\n    <span class=\"k\">def</span>
  <span class=\"nf\">in_prompt_tokens</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
  class=\"p\">,</span> <span class=\"n\">cli</span><span class=\"o\">=</span><span
  class=\"kc\">None</span><span class=\"p\">):</span>\n        <span class=\"k\">return</span>
  <span class=\"p\">[</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot;&quot;</span><span class=\"p\">),</span>\n
  \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
  class=\"n\">OutPrompt</span><span class=\"p\">,</span> <span class=\"n\">Path</span><span
  class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">absolute</span><span
  class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">stem</span><span
  class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n
  \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
  class=\"n\">Generic</span><span class=\"o\">.</span><span class=\"n\">Subheading</span><span
  class=\"p\">,</span> <span class=\"n\">get_branch</span><span class=\"p\">()[</span><span
  class=\"mi\">0</span><span class=\"p\">]),</span>\n            <span class=\"p\">(</span><span
  class=\"n\">Token</span><span class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span
  class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
  class=\"o\">.</span><span class=\"n\">Generic</span><span class=\"o\">.</span><span
  class=\"n\">Heading</span><span class=\"p\">,</span> <span class=\"n\">get_branch</span><span
  class=\"p\">()[</span><span class=\"mi\">1</span><span class=\"p\">]),</span>\n
  \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
  class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
  class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Class</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot;via &quot;</span> <span class=\"o\">+</span>
  <span class=\"n\">get_venv</span><span class=\"p\">()),</span>\n            <span
  class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span> <span
  class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
  class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
  class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Entity</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot;ipython&quot;</span><span class=\"p\">),</span>\n
  \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
  class=\"p\">),</span>\n            <span class=\"p\">(</span>\n                <span
  class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Prompt</span>\n
  \               <span class=\"k\">if</span> <span class=\"bp\">self</span><span
  class=\"o\">.</span><span class=\"n\">shell</span><span class=\"o\">.</span><span
  class=\"n\">last_execution_succeeded</span>\n                <span class=\"k\">else</span>
  <span class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Generic</span><span
  class=\"o\">.</span><span class=\"n\">Error</span><span class=\"p\">,</span>\n                <span
  class=\"s2\">&quot;❯ &quot;</span><span class=\"p\">,</span>\n            <span
  class=\"p\">),</span>\n        <span class=\"p\">]</span>\n</code></pre></div>\n<p>Notice
  I have 2 custom functions here, <code>get_branch</code> and <code>get_venv</code>
  which grab some git info and python env info and return strings I can dump into
  my prompt as shown above.</p>\n<p>To finish you drop <code>ip = get_ipython()</code>
  and <code>ip.prompts = MyPrompt(ip)</code> at the bottom of your prompt script and
  you should be in custom prompt city!</p>\n<h2 id=\"end\">End</h2>\n<p>This is more
  or less notes for myself on how this works - drop by my <a href=\"https://github.com/nicpayne713/dotfiles/tree/home/ipython\">ipython
  config</a> in my dotfiles repo to see my full configs for ipython!</p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/file-length'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>File-Length</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/polybar-01'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Polybar-01</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/ipython-prompt.png
date: 2022-04-02
datetime: 2022-04-02 00:00:00+00:00
description: I have a  Now... I spend quite a bit of time in ipython every day and
  I got kind of sick of the vanilla experience and wanted something that more closely
  matche
edit_link: https://github.com/edit/main/pages/blog/ipython-prompt.md
html: "<p>I have a <a href=\"/starship\">post on starship</a> where I have some notes
  on how I use starship to make my zsh experience great with a sweet terminal prompt.</p>\n<p>Now...
  I spend quite a bit of time in ipython every day and I got kind of sick of the vanilla
  experience and wanted something that more closely matched my starship prompt.</p>\n<p>There's
  more to customizing ipython I know for sure but here's 2 things I have going for
  me...</p>\n<ol>\n<li>\n<p>I use <a href=\"https://pypi.org/project/rich/\"><code>rich</code></a>
  authored by @<a href=\"https://twitter.com/willmcgugan\">Will McGugan</a> which
  makes much of my ipython experience great.\nI won't write about that here but you
  can find my <code>rich</code> config <a href=\"https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py\">here</a></p>\n</li>\n<li>\n<p>I
  used <code>pygments</code> to customize the ipython prompt with my <code>ipython_config.py</code>
  and a startup script, next to my <code>rich</code> one, called <code>99-prompt.py</code>.</p>\n</li>\n</ol>\n<blockquote>\n<p>The
  scripts inside <code>~/.ipython/&lt;profile&gt;/startup</code> are executed in lexigraphical
  order, so it's nice to name things in the 10's to give room for adding scripts in
  between others down the line.</p>\n</blockquote>\n<h2 id=\"my-prompt\">My prompt</h2>\n<p>My
  zsh prompt looks a little something like this:</p>\n<p><img alt=\"Alt Text\" src=\"/images/zsh-starship-prompt.png\"
  /></p>\n<p>And after my ipython customiztion it currently (subject to much change
  but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece on
  <code>main</code>).</p>\n<p><img alt=\"Alt Text\" src=\"/images/ipython-prompt.png\"
  /></p>\n<p>Now in ipython I have an indicator of my working directory, git branch,
  python environment, and a note that I'm in <code>ipython</code> and not <code>zsh</code>.\nI
  also configured my prompt to warn me if I'm <em>not</em> in a git directory!</p>\n<p><img
  alt=\"Alt Text\" src=\"/images/ipython-prompt-no-git.png\" /></p>\n<p>All in all
  the customization isn't too bad with just 2 specific files.</p>\n<h2 id=\"ipython_configpy\">ipython_config.py</h2>\n<p>There's
  several use cases for <code>ipython_config.py</code> files in several areas on a
  pc - sometimes you want a common config across users, so you'd drop one in <code>/etc/ipython</code>
  and othertimes you have your own which is probably at <code>~/.ipython</code></p>\n<p>My
  ipython config mostly has colors defined on <code>pygment tokens</code> plus a few
  autorun commands and <code>pyflyby</code> (see my friend Waylon's post on pyflyby
  <a href=\"https://waylonwalker.com/pyflyby/\">here</a>)</p>\n<p>I wanted to match
  my ipython somewhat to my tmux and vim color schemes, which I model after the vim-airline
  theme <code>night owl</code>.</p>\n<p>After picking some some colors and saving
  variables it's a matter of setting colors per token and then referencing those tokens
  in your version of <code>99-prompt.py</code>.</p>\n<p>You can check out my <code>ipython_config.py</code>
  <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py\">here</a></p>\n<p>For
  example, I can set <code>Token.Name.Function</code> to black, and in <code>ipython</code>
  then a function's definition will appear in black text. I set mine to cyan to match
  my theme.</p>\n<p>For the prompt colors just match the keyword in <code>c.TerminalInteractiveShell.highlighting_style_overrides</code>
  with what is referenced inside <a href=\"https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py\">99-prompt.py</a></p>\n<p>For
  example, <code>Token.Prompt</code> is set to <code>bold grey</code> which gives
  me the bold chevron symbol you see in the above image that looks like my zsh prompt
  </p>\n<p>Then in <code>99-prompt.py</code> I have this set for the prompt:</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">Token</span><span
  class=\"o\">.</span><span class=\"n\">Prompt</span> <span class=\"s2\">&quot;❯ &quot;</span>\n</code></pre></div>\n<h2
  id=\"99-promptpy\">99-prompt.py</h2>\n<p>You don't need to name your script <code>99-prompt.py</code>,
  but I wanted to know that it was for my prompt and I wanted it executed last so
  it made sense.</p>\n<p>Here I have <code>MyPrompt</code> class with the prompt symbol
  defined as above and several other things... </p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"k\">class</span> <span class=\"nc\">MyPrompt</span><span class=\"p\">(</span><span
  class=\"n\">Prompts</span><span class=\"p\">):</span>\n    <span class=\"k\">def</span>
  <span class=\"nf\">in_prompt_tokens</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
  class=\"p\">,</span> <span class=\"n\">cli</span><span class=\"o\">=</span><span
  class=\"kc\">None</span><span class=\"p\">):</span>\n        <span class=\"k\">return</span>
  <span class=\"p\">[</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot;&quot;</span><span class=\"p\">),</span>\n
  \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
  class=\"n\">OutPrompt</span><span class=\"p\">,</span> <span class=\"n\">Path</span><span
  class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">absolute</span><span
  class=\"p\">()</span><span class=\"o\">.</span><span class=\"n\">stem</span><span
  class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n
  \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
  class=\"n\">Generic</span><span class=\"o\">.</span><span class=\"n\">Subheading</span><span
  class=\"p\">,</span> <span class=\"n\">get_branch</span><span class=\"p\">()[</span><span
  class=\"mi\">0</span><span class=\"p\">]),</span>\n            <span class=\"p\">(</span><span
  class=\"n\">Token</span><span class=\"p\">,</span> <span class=\"s2\">&quot; &quot;</span><span
  class=\"p\">),</span>\n            <span class=\"p\">(</span><span class=\"n\">Token</span><span
  class=\"o\">.</span><span class=\"n\">Generic</span><span class=\"o\">.</span><span
  class=\"n\">Heading</span><span class=\"p\">,</span> <span class=\"n\">get_branch</span><span
  class=\"p\">()[</span><span class=\"mi\">1</span><span class=\"p\">]),</span>\n
  \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
  class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
  class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Class</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot;via &quot;</span> <span class=\"o\">+</span>
  <span class=\"n\">get_venv</span><span class=\"p\">()),</span>\n            <span
  class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span> <span
  class=\"s2\">&quot; &quot;</span><span class=\"p\">),</span>\n            <span
  class=\"p\">(</span><span class=\"n\">Token</span><span class=\"o\">.</span><span
  class=\"n\">Name</span><span class=\"o\">.</span><span class=\"n\">Entity</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot;ipython&quot;</span><span class=\"p\">),</span>\n
  \           <span class=\"p\">(</span><span class=\"n\">Token</span><span class=\"p\">,</span>
  <span class=\"s2\">&quot;</span><span class=\"se\">\\n</span><span class=\"s2\">&quot;</span><span
  class=\"p\">),</span>\n            <span class=\"p\">(</span>\n                <span
  class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Prompt</span>\n
  \               <span class=\"k\">if</span> <span class=\"bp\">self</span><span
  class=\"o\">.</span><span class=\"n\">shell</span><span class=\"o\">.</span><span
  class=\"n\">last_execution_succeeded</span>\n                <span class=\"k\">else</span>
  <span class=\"n\">Token</span><span class=\"o\">.</span><span class=\"n\">Generic</span><span
  class=\"o\">.</span><span class=\"n\">Error</span><span class=\"p\">,</span>\n                <span
  class=\"s2\">&quot;❯ &quot;</span><span class=\"p\">,</span>\n            <span
  class=\"p\">),</span>\n        <span class=\"p\">]</span>\n</code></pre></div>\n<p>Notice
  I have 2 custom functions here, <code>get_branch</code> and <code>get_venv</code>
  which grab some git info and python env info and return strings I can dump into
  my prompt as shown above.</p>\n<p>To finish you drop <code>ip = get_ipython()</code>
  and <code>ip.prompts = MyPrompt(ip)</code> at the bottom of your prompt script and
  you should be in custom prompt city!</p>\n<h2 id=\"end\">End</h2>\n<p>This is more
  or less notes for myself on how this works - drop by my <a href=\"https://github.com/nicpayne713/dotfiles/tree/home/ipython\">ipython
  config</a> in my dotfiles repo to see my full configs for ipython!</p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/file-length'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>File-Length</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/polybar-01'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Polybar-01</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: I have a  Now... I spend quite a bit of time in ipython every day
  and I got kind of sick of the vanilla experience and wanted something that more
  closely matched my starship prompt. There I use  I used  The scripts inside  My
  zsh prompt looks a littl
now: 2024-10-12 11:09:11.872358
path: pages/blog/ipython-prompt.md
published: true
slug: ipython-prompt
super_description: 'I have a  Now... I spend quite a bit of time in ipython every
  day and I got kind of sick of the vanilla experience and wanted something that more
  closely matched my starship prompt. There I use  I used  The scripts inside  My
  zsh prompt looks a little something like this: And after my ipython customiztion
  it currently (subject to much change but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece
  on  Now in ipython I have an indicator of my working directory, git branch, p'
tags:
- python
- tech
templateKey: blog-post
title: Ipython-Prompt
today: 2024-10-12
---

I have a [post on starship](/starship) where I have some notes on how I use starship to make my zsh experience great with a sweet terminal prompt.

Now... I spend quite a bit of time in ipython every day and I got kind of sick of the vanilla experience and wanted something that more closely matched my starship prompt.

There's more to customizing ipython I know for sure but here's 2 things I have going for me...

1. I use [`rich`](https://pypi.org/project/rich/) authored by @[Will McGugan](https://twitter.com/willmcgugan) which makes much of my ipython experience great.
I won't write about that here but you can find my `rich` config [here](https://github.com/nicpayne713/dotfiles/blob/main/ipython/.ipython/profile_default/startup/01-rich_init.py)

2. I used `pygments` to customize the ipython prompt with my `ipython_config.py` and a startup script, next to my `rich` one, called `99-prompt.py`.

> The scripts inside `~/.ipython/<profile>/startup` are executed in lexigraphical order, so it's nice to name things in the 10's to give room for adding scripts in between others down the line.

## My prompt

My zsh prompt looks a little something like this:

![Alt Text](/images/zsh-starship-prompt.png)

And after my ipython customiztion it currently (subject to much change but this is as of my dotfiles commit #d22088f6be81a58b5f7dfb73b7a4088cbdd9fece on `main`).

![Alt Text](/images/ipython-prompt.png)

Now in ipython I have an indicator of my working directory, git branch, python environment, and a note that I'm in `ipython` and not `zsh`.
I also configured my prompt to warn me if I'm _not_ in a git directory!

![Alt Text](/images/ipython-prompt-no-git.png)

All in all the customization isn't too bad with just 2 specific files.

## ipython_config.py

There's several use cases for `ipython_config.py` files in several areas on a pc - sometimes you want a common config across users, so you'd drop one in `/etc/ipython` and othertimes you have your own which is probably at `~/.ipython`

My ipython config mostly has colors defined on `pygment tokens` plus a few autorun commands and `pyflyby` (see my friend Waylon's post on pyflyby [here](https://waylonwalker.com/pyflyby/))

I wanted to match my ipython somewhat to my tmux and vim color schemes, which I model after the vim-airline theme `night owl`.

After picking some some colors and saving variables it's a matter of setting colors per token and then referencing those tokens in your version of `99-prompt.py`.

You can check out my `ipython_config.py` [here](https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/ipython_config.py)

For example, I can set `Token.Name.Function` to black, and in `ipython` then a function's definition will appear in black text. I set mine to cyan to match my theme.

For the prompt colors just match the keyword in `c.TerminalInteractiveShell.highlighting_style_overrides` with what is referenced inside [99-prompt.py](https://github.com/nicpayne713/dotfiles/blob/home/ipython/.ipython/profile_default/startup/99-prompt.py)

For example, `Token.Prompt` is set to `bold grey` which gives me the bold chevron symbol you see in the above image that looks like my zsh prompt 

Then in `99-prompt.py` I have this set for the prompt:

```python
Token.Prompt "❯ "
```

## 99-prompt.py

You don't need to name your script `99-prompt.py`, but I wanted to know that it was for my prompt and I wanted it executed last so it made sense.

Here I have `MyPrompt` class with the prompt symbol defined as above and several other things... 

```python
class MyPrompt(Prompts):
    def in_prompt_tokens(self, cli=None):
        return [
            (Token, ""),
            (Token.OutPrompt, Path().absolute().stem),
            (Token, " "),
            (Token.Generic.Subheading, get_branch()[0]),
            (Token, " "),
            (Token.Generic.Heading, get_branch()[1]),
            (Token, " "),
            (Token.Name.Class, "via " + get_venv()),
            (Token, " "),
            (Token.Name.Entity, "ipython"),
            (Token, "\n"),
            (
                Token.Prompt
                if self.shell.last_execution_succeeded
                else Token.Generic.Error,
                "❯ ",
            ),
        ]

```

Notice I have 2 custom functions here, `get_branch` and `get_venv` which grab some git info and python env info and return strings I can dump into my prompt as shown above.

To finish you drop `ip = get_ipython()` and `ip.prompts = MyPrompt(ip)` at the bottom of your prompt script and you should be in custom prompt city!

## End

This is more or less notes for myself on how this works - drop by my [ipython config](https://github.com/nicpayne713/dotfiles/tree/home/ipython) in my dotfiles repo to see my full configs for ipython!
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
    
    <a class='prev' href='/file-length'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>File-Length</p>
        </div>
    </a>
    
    <a class='next' href='/polybar-01'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Polybar-01</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>