---
article_html: "<p>I try to commit a lot, and I also try to write useful tests appropriate
  for the scope of work I'm focusing on, but sometimes I drop the ball...</p>\n<p>Whether
  by laziness, ignorance, or accepted tech debt I don't always code perfectly and
  recently I was dozens of commits into a new feature before realizing I broke something
  along the way that none of my tests caught...</p>\n<p>Before today I would've manually
  reviewed every commit to see if something obvious slipped by me (talk about a time
  suck \U0001F629)</p>\n<p><strong>There must be a better way</strong></p>\n<h1 id=\"bisect\">Bisect?</h1>\n<p><code>git
  bisect</code> is the magic sauce for this exact problem...</p>\n<p>You essentially
  create a range of commits to consider and let <code>git bisect</code> guide you
  through them in a manner akin to Newton's method for finding the root of a continuous
  function.</p>\n<h1 id=\"how-to-do-it\">How to do it?</h1>\n<p>Start with <code>git
  bisect start</code> and then choose the first <code>good</code> commit (ie. a commit
  you know the bug isn't present in)</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>bisect-post<span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>start\n\nsandbox<span class=\"w\">
  \ </span><span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
  class=\"o\">)</span><span class=\"w\">  </span><span class=\"w\"> </span>×1<span
  class=\"w\"> </span>via<span class=\"w\"> </span><span class=\"w\">  </span>v3.8.11<span
  class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
  class=\"w\"> </span><span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
  class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
  class=\"w\"> </span>good<span class=\"w\"> </span>655332b\nbisect-post<span class=\"w\">
  \ </span>HEAD<span class=\"w\">         </span>main<span class=\"w\">         </span>ORIG_HEAD\n5b31e1e<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
  class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
  class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
  class=\"m\">52</span><span class=\"w\"> </span>seconds<span class=\"w\"> </span>ago<span
  class=\"o\">)</span>\n308247b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
  class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span class=\"w\">   </span>init<span
  class=\"w\"> </span>another<span class=\"w\"> </span>loop<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">77</span><span class=\"w\"> </span>seconds<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span class=\"o\">]</span><span
  class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">2</span><span class=\"w\"> </span>minutes<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span class=\"o\">]</span><span
  class=\"w\">  </span>add<span class=\"w\"> </span>successful<span class=\"w\"> </span>loop<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">3</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\nbcb41c3<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~4<span
  class=\"o\">]</span><span class=\"w\">  </span>change<span class=\"w\"> </span>x<span
  class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">10</span><span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">4</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n3c34aac<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~5<span
  class=\"o\">]</span><span class=\"w\">  </span>init<span class=\"w\"> </span>x<span
  class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">1</span><span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">4</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n12e53bd<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~6<span
  class=\"o\">]</span><span class=\"w\">  </span>print<span class=\"w\"> </span>cwd<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">4</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n655332b<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~7<span
  class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>example.py<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">10</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span><span class=\"w\">
  \ </span><span class=\"c1\"># &lt;- I want to start at this commit</span>\n59e0048<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~8<span
  class=\"o\">]</span><span class=\"w\">  </span>gitignore<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">23</span><span class=\"w\"> </span>hours<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span class=\"o\">]</span><span
  class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">23</span><span class=\"w\"> </span>hours<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\n</code></pre></div>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\"> </span>5b31e1e\nbisect-post<span
  class=\"w\">                                                </span>ORIG_HEAD\nHEAD<span
  class=\"w\">                                                       </span>refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57\nmain\n5b31e1e<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
  class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
  class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
  class=\"m\">5</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
  class=\"o\">)</span><span class=\"w\">  </span><span class=\"c1\"># &lt;- I start
  here with the &quot;bad&quot; commit</span>\n308247b<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span
  class=\"w\">   </span>init<span class=\"w\"> </span>another<span class=\"w\"> </span>loop<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span
  class=\"o\">]</span><span class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span
  class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>successful<span
  class=\"w\"> </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span
  class=\"m\">7</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
  class=\"o\">)</span>\nbcb41c3<span class=\"w\">  </span>--<span class=\"w\"> </span><span
  class=\"o\">[</span>HEAD~4<span class=\"o\">]</span><span class=\"w\">  </span>change<span
  class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
  class=\"m\">10</span><span class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">8</span><span
  class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n3c34aac<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~5<span
  class=\"o\">]</span><span class=\"w\">  </span>init<span class=\"w\"> </span>x<span
  class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">1</span><span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">9</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n12e53bd<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~6<span
  class=\"o\">]</span><span class=\"w\">  </span>print<span class=\"w\"> </span>cwd<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">9</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n655332b<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~7<span
  class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>example.py<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">14</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n59e0048<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~8<span
  class=\"o\">]</span><span class=\"w\">  </span>gitignore<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">23</span><span class=\"w\"> </span>hours<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span class=\"o\">]</span><span
  class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">23</span><span class=\"w\"> </span>hours<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\n</code></pre></div>\n<p>After
  starting bisect with a \"good\" start commit and a \"bad\" ending commit we can
  let git to it's thing!</p>\n<p>Git checksout a commit somewhere about halfway between
  the good and bad commit so you can see if your bug is there or not.</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\"> </span>5b31e1e\nBisecting:<span
  class=\"w\"> </span><span class=\"m\">3</span><span class=\"w\"> </span>revisions<span
  class=\"w\"> </span>left<span class=\"w\"> </span>to<span class=\"w\"> </span><span
  class=\"nb\">test</span><span class=\"w\"> </span>after<span class=\"w\"> </span>this<span
  class=\"w\"> </span><span class=\"o\">(</span>roughly<span class=\"w\"> </span><span
  class=\"m\">2</span><span class=\"w\"> </span>steps<span class=\"o\">)</span>\n<span
  class=\"o\">[</span>bcb41c3854e343eade85353683f2c1c4ddde4e04<span class=\"o\">]</span><span
  class=\"w\"> </span>change<span class=\"w\"> </span>x<span class=\"w\"> </span>to<span
  class=\"w\"> </span><span class=\"m\">10</span>\n\nsandbox<span class=\"w\">  </span><span
  class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>bcb41c38<span
  class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
  class=\"o\">)</span><span class=\"w\">  </span><span class=\"w\"> </span>×1<span
  class=\"w\"> </span>via<span class=\"w\"> </span><span class=\"w\">  </span>v3.8.11<span
  class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
  class=\"w\"> </span><span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
  class=\"o\">)</span>\n❯\n</code></pre></div>\n<p>In my example here I have a python
  script with some loops and print statements - they aren't really relevant, I just
  wanted an easy to follow git history.</p>\n<p>So I check to see if the bug is present
  or not either by running/writing tests or replicating the bug somehow.</p>\n<p>In
  this session commit <code>bcb41c38</code> is actually just fine, so I do <code>git
  bisect good</code></p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
  class=\"o\">(</span>bcb41c38<span class=\"o\">)</span><span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>good\nBisecting:<span class=\"w\">
  </span><span class=\"m\">1</span><span class=\"w\"> </span>revision<span class=\"w\">
  </span>left<span class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span
  class=\"w\"> </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span
  class=\"o\">(</span>roughly<span class=\"w\"> </span><span class=\"m\">1</span><span
  class=\"w\"> </span>step<span class=\"o\">)</span>\n<span class=\"o\">[</span>4555c5979268dff6c475365fdc5ce1d4a12bd820<span
  class=\"o\">]</span><span class=\"w\"> </span>introduce<span class=\"w\"> </span>bug\n</code></pre></div>\n<p>And
  we see that git moves on to checkout another commit...</p>\n<p>In this case the
  next commit is the one where I introduced a bug</p>\n<p><code>git bisect bad</code>
  then gives me:</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
  class=\"o\">(</span>4555c597<span class=\"o\">)</span><span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>bad\nBisecting:<span class=\"w\">
  </span><span class=\"m\">0</span><span class=\"w\"> </span>revisions<span class=\"w\">
  </span>left<span class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span
  class=\"w\"> </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span
  class=\"o\">(</span>roughly<span class=\"w\"> </span><span class=\"m\">0</span><span
  class=\"w\"> </span>steps<span class=\"o\">)</span>\n<span class=\"o\">[</span>9cf6d55301560c51e2f55404d0d80b1f1e22a33d<span
  class=\"o\">]</span><span class=\"w\"> </span>add<span class=\"w\"> </span>successful<span
  class=\"w\"> </span>loop\n</code></pre></div>\n<p>At <code>4555c597</code> the script
  works as expected so one more <code>git bisect good</code> yields...</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
  class=\"o\">(</span>9cf6d553<span class=\"o\">)</span><span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>good\n4555c5979268dff6c475365fdc5ce1d4a12bd820<span
  class=\"w\"> </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>first<span
  class=\"w\"> </span>bad<span class=\"w\"> </span>commit\ncommit<span class=\"w\">
  </span>4555c5979268dff6c475365fdc5ce1d4a12bd820\nAuthor:<span class=\"w\"> </span><span
  class=\"c1\">########################### </span>\nDate:<span class=\"w\">   </span>Tue<span
  class=\"w\"> </span>May<span class=\"w\"> </span><span class=\"m\">3</span><span
  class=\"w\"> </span><span class=\"m\">09</span>:00:00<span class=\"w\"> </span><span
  class=\"m\">2022</span><span class=\"w\"> </span>-0500\n\n<span class=\"w\">    </span>introduce<span
  class=\"w\"> </span>bug\n\n<span class=\"w\"> </span>example.py<span class=\"w\">
  </span><span class=\"p\">|</span><span class=\"w\"> </span><span class=\"m\">2</span><span
  class=\"w\"> </span>+-\n<span class=\"w\"> </span><span class=\"m\">1</span><span
  class=\"w\"> </span>file<span class=\"w\"> </span>changed,<span class=\"w\"> </span><span
  class=\"m\">1</span><span class=\"w\"> </span>insertion<span class=\"o\">(</span>+<span
  class=\"o\">)</span>,<span class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\">
  </span>deletion<span class=\"o\">(</span>-<span class=\"o\">)</span>\n</code></pre></div>\n<h1
  id=\"what-happened\">What happened?</h1>\n<p>Git sliced up a range of commits based
  on me saying of the next one was good or bad and localized the commit that introduced
  a bug into my workflow!</p>\n<p>I didn't have to manually review commits, click
  through logs, etc... I just let git checkout relevant commits and I ran whatever
  was appropriate for reproducing the bug to learn when it was comitted!</p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/plug-snapshot-to-save-your-life'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Plug-Snapshot-To-Save-Your-Life</p>\n
  \       </div>\n    </a>\n\n    <a class='next' href='/dhcp-restart-to-save-ubuntu-22-04-server-networking'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>DHCP Restart to Save Ubuntu 22.04 Server Networking</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/git-bisect.png
date: 2022-05-03
datetime: 2022-05-03 00:00:00+00:00
description: I try to commit a lot, and I also try to write useful tests appropriate
  for the scope of work I Whether by laziness, ignorance, or accepted tech debt I
  don Befo
edit_link: https://github.com/edit/main/pages/til/git-bisect.md
html: "<p>I try to commit a lot, and I also try to write useful tests appropriate
  for the scope of work I'm focusing on, but sometimes I drop the ball...</p>\n<p>Whether
  by laziness, ignorance, or accepted tech debt I don't always code perfectly and
  recently I was dozens of commits into a new feature before realizing I broke something
  along the way that none of my tests caught...</p>\n<p>Before today I would've manually
  reviewed every commit to see if something obvious slipped by me (talk about a time
  suck \U0001F629)</p>\n<p><strong>There must be a better way</strong></p>\n<h1 id=\"bisect\">Bisect?</h1>\n<p><code>git
  bisect</code> is the magic sauce for this exact problem...</p>\n<p>You essentially
  create a range of commits to consider and let <code>git bisect</code> guide you
  through them in a manner akin to Newton's method for finding the root of a continuous
  function.</p>\n<h1 id=\"how-to-do-it\">How to do it?</h1>\n<p>Start with <code>git
  bisect start</code> and then choose the first <code>good</code> commit (ie. a commit
  you know the bug isn't present in)</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>bisect-post<span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>start\n\nsandbox<span class=\"w\">
  \ </span><span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
  class=\"o\">)</span><span class=\"w\">  </span><span class=\"w\"> </span>×1<span
  class=\"w\"> </span>via<span class=\"w\"> </span><span class=\"w\">  </span>v3.8.11<span
  class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
  class=\"w\"> </span><span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
  class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span class=\"w\"> </span>bisect<span
  class=\"w\"> </span>good<span class=\"w\"> </span>655332b\nbisect-post<span class=\"w\">
  \ </span>HEAD<span class=\"w\">         </span>main<span class=\"w\">         </span>ORIG_HEAD\n5b31e1e<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
  class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
  class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
  class=\"m\">52</span><span class=\"w\"> </span>seconds<span class=\"w\"> </span>ago<span
  class=\"o\">)</span>\n308247b<span class=\"w\">  </span>--<span class=\"w\"> </span><span
  class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span class=\"w\">   </span>init<span
  class=\"w\"> </span>another<span class=\"w\"> </span>loop<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">77</span><span class=\"w\"> </span>seconds<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span class=\"o\">]</span><span
  class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">2</span><span class=\"w\"> </span>minutes<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span class=\"o\">]</span><span
  class=\"w\">  </span>add<span class=\"w\"> </span>successful<span class=\"w\"> </span>loop<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">3</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\nbcb41c3<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~4<span
  class=\"o\">]</span><span class=\"w\">  </span>change<span class=\"w\"> </span>x<span
  class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">10</span><span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">4</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n3c34aac<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~5<span
  class=\"o\">]</span><span class=\"w\">  </span>init<span class=\"w\"> </span>x<span
  class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">1</span><span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">4</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n12e53bd<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~6<span
  class=\"o\">]</span><span class=\"w\">  </span>print<span class=\"w\"> </span>cwd<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">4</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n655332b<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~7<span
  class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>example.py<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">10</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span><span class=\"w\">
  \ </span><span class=\"c1\"># &lt;- I want to start at this commit</span>\n59e0048<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~8<span
  class=\"o\">]</span><span class=\"w\">  </span>gitignore<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">23</span><span class=\"w\"> </span>hours<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span class=\"o\">]</span><span
  class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">23</span><span class=\"w\"> </span>hours<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\n</code></pre></div>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\"> </span>5b31e1e\nbisect-post<span
  class=\"w\">                                                </span>ORIG_HEAD\nHEAD<span
  class=\"w\">                                                       </span>refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57\nmain\n5b31e1e<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD<span
  class=\"o\">]</span><span class=\"w\">    </span>add<span class=\"w\"> </span>successful<span
  class=\"w\"> </span>print<span class=\"w\"> </span><span class=\"o\">(</span><span
  class=\"m\">5</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
  class=\"o\">)</span><span class=\"w\">  </span><span class=\"c1\"># &lt;- I start
  here with the &quot;bad&quot; commit</span>\n308247b<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD^<span class=\"o\">]</span><span
  class=\"w\">   </span>init<span class=\"w\"> </span>another<span class=\"w\"> </span>loop<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n4555c59<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD^^<span
  class=\"o\">]</span><span class=\"w\">  </span>introduce<span class=\"w\"> </span>bug<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">6</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n9cf6d55<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~3<span
  class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>successful<span
  class=\"w\"> </span>loop<span class=\"w\"> </span><span class=\"o\">(</span><span
  class=\"m\">7</span><span class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span
  class=\"o\">)</span>\nbcb41c3<span class=\"w\">  </span>--<span class=\"w\"> </span><span
  class=\"o\">[</span>HEAD~4<span class=\"o\">]</span><span class=\"w\">  </span>change<span
  class=\"w\"> </span>x<span class=\"w\"> </span>to<span class=\"w\"> </span><span
  class=\"m\">10</span><span class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">8</span><span
  class=\"w\"> </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n3c34aac<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~5<span
  class=\"o\">]</span><span class=\"w\">  </span>init<span class=\"w\"> </span>x<span
  class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"m\">1</span><span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">9</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n12e53bd<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~6<span
  class=\"o\">]</span><span class=\"w\">  </span>print<span class=\"w\"> </span>cwd<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">9</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n655332b<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~7<span
  class=\"o\">]</span><span class=\"w\">  </span>add<span class=\"w\"> </span>example.py<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">14</span><span class=\"w\">
  </span>minutes<span class=\"w\"> </span>ago<span class=\"o\">)</span>\n59e0048<span
  class=\"w\">  </span>--<span class=\"w\"> </span><span class=\"o\">[</span>HEAD~8<span
  class=\"o\">]</span><span class=\"w\">  </span>gitignore<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">23</span><span class=\"w\"> </span>hours<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\nfb9e1fb<span class=\"w\">  </span>--<span
  class=\"w\"> </span><span class=\"o\">[</span>HEAD~9<span class=\"o\">]</span><span
  class=\"w\">  </span>add<span class=\"w\"> </span>reqs<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"m\">23</span><span class=\"w\"> </span>hours<span
  class=\"w\"> </span>ago<span class=\"o\">)</span>\n</code></pre></div>\n<p>After
  starting bisect with a \"good\" start commit and a \"bad\" ending commit we can
  let git to it's thing!</p>\n<p>Git checksout a commit somewhere about halfway between
  the good and bad commit so you can see if your bug is there or not.</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>bisect-post<span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>bad<span class=\"w\"> </span>5b31e1e\nBisecting:<span
  class=\"w\"> </span><span class=\"m\">3</span><span class=\"w\"> </span>revisions<span
  class=\"w\"> </span>left<span class=\"w\"> </span>to<span class=\"w\"> </span><span
  class=\"nb\">test</span><span class=\"w\"> </span>after<span class=\"w\"> </span>this<span
  class=\"w\"> </span><span class=\"o\">(</span>roughly<span class=\"w\"> </span><span
  class=\"m\">2</span><span class=\"w\"> </span>steps<span class=\"o\">)</span>\n<span
  class=\"o\">[</span>bcb41c3854e343eade85353683f2c1c4ddde4e04<span class=\"o\">]</span><span
  class=\"w\"> </span>change<span class=\"w\"> </span>x<span class=\"w\"> </span>to<span
  class=\"w\"> </span><span class=\"m\">10</span>\n\nsandbox<span class=\"w\">  </span><span
  class=\"w\"> </span>HEAD<span class=\"w\"> </span><span class=\"o\">(</span>bcb41c38<span
  class=\"o\">)</span><span class=\"w\"> </span><span class=\"o\">(</span>BISECTING<span
  class=\"o\">)</span><span class=\"w\">  </span><span class=\"w\"> </span>×1<span
  class=\"w\"> </span>via<span class=\"w\"> </span><span class=\"w\">  </span>v3.8.11<span
  class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">  </span>on<span
  class=\"w\"> </span><span class=\"w\"> </span><span class=\"o\">(</span>us-east-1<span
  class=\"o\">)</span>\n❯\n</code></pre></div>\n<p>In my example here I have a python
  script with some loops and print statements - they aren't really relevant, I just
  wanted an easy to follow git history.</p>\n<p>So I check to see if the bug is present
  or not either by running/writing tests or replicating the bug somehow.</p>\n<p>In
  this session commit <code>bcb41c38</code> is actually just fine, so I do <code>git
  bisect good</code></p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
  class=\"o\">(</span>bcb41c38<span class=\"o\">)</span><span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>good\nBisecting:<span class=\"w\">
  </span><span class=\"m\">1</span><span class=\"w\"> </span>revision<span class=\"w\">
  </span>left<span class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span
  class=\"w\"> </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span
  class=\"o\">(</span>roughly<span class=\"w\"> </span><span class=\"m\">1</span><span
  class=\"w\"> </span>step<span class=\"o\">)</span>\n<span class=\"o\">[</span>4555c5979268dff6c475365fdc5ce1d4a12bd820<span
  class=\"o\">]</span><span class=\"w\"> </span>introduce<span class=\"w\"> </span>bug\n</code></pre></div>\n<p>And
  we see that git moves on to checkout another commit...</p>\n<p>In this case the
  next commit is the one where I introduced a bug</p>\n<p><code>git bisect bad</code>
  then gives me:</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
  class=\"o\">(</span>4555c597<span class=\"o\">)</span><span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>bad\nBisecting:<span class=\"w\">
  </span><span class=\"m\">0</span><span class=\"w\"> </span>revisions<span class=\"w\">
  </span>left<span class=\"w\"> </span>to<span class=\"w\"> </span><span class=\"nb\">test</span><span
  class=\"w\"> </span>after<span class=\"w\"> </span>this<span class=\"w\"> </span><span
  class=\"o\">(</span>roughly<span class=\"w\"> </span><span class=\"m\">0</span><span
  class=\"w\"> </span>steps<span class=\"o\">)</span>\n<span class=\"o\">[</span>9cf6d55301560c51e2f55404d0d80b1f1e22a33d<span
  class=\"o\">]</span><span class=\"w\"> </span>add<span class=\"w\"> </span>successful<span
  class=\"w\"> </span>loop\n</code></pre></div>\n<p>At <code>4555c597</code> the script
  works as expected so one more <code>git bisect good</code> yields...</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span><span class=\"w\"> </span>HEAD<span class=\"w\"> </span><span
  class=\"o\">(</span>9cf6d553<span class=\"o\">)</span><span class=\"w\"> </span><span
  class=\"o\">(</span>BISECTING<span class=\"o\">)</span><span class=\"w\">  </span><span
  class=\"w\"> </span>×1<span class=\"w\"> </span>via<span class=\"w\"> </span><span
  class=\"w\">  </span>v3.8.11<span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span
  class=\"w\">  </span>on<span class=\"w\"> </span><span class=\"w\"> </span><span
  class=\"o\">(</span>us-east-1<span class=\"o\">)</span>\n❯<span class=\"w\"> </span>git<span
  class=\"w\"> </span>bisect<span class=\"w\"> </span>good\n4555c5979268dff6c475365fdc5ce1d4a12bd820<span
  class=\"w\"> </span>is<span class=\"w\"> </span>the<span class=\"w\"> </span>first<span
  class=\"w\"> </span>bad<span class=\"w\"> </span>commit\ncommit<span class=\"w\">
  </span>4555c5979268dff6c475365fdc5ce1d4a12bd820\nAuthor:<span class=\"w\"> </span><span
  class=\"c1\">########################### </span>\nDate:<span class=\"w\">   </span>Tue<span
  class=\"w\"> </span>May<span class=\"w\"> </span><span class=\"m\">3</span><span
  class=\"w\"> </span><span class=\"m\">09</span>:00:00<span class=\"w\"> </span><span
  class=\"m\">2022</span><span class=\"w\"> </span>-0500\n\n<span class=\"w\">    </span>introduce<span
  class=\"w\"> </span>bug\n\n<span class=\"w\"> </span>example.py<span class=\"w\">
  </span><span class=\"p\">|</span><span class=\"w\"> </span><span class=\"m\">2</span><span
  class=\"w\"> </span>+-\n<span class=\"w\"> </span><span class=\"m\">1</span><span
  class=\"w\"> </span>file<span class=\"w\"> </span>changed,<span class=\"w\"> </span><span
  class=\"m\">1</span><span class=\"w\"> </span>insertion<span class=\"o\">(</span>+<span
  class=\"o\">)</span>,<span class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\">
  </span>deletion<span class=\"o\">(</span>-<span class=\"o\">)</span>\n</code></pre></div>\n<h1
  id=\"what-happened\">What happened?</h1>\n<p>Git sliced up a range of commits based
  on me saying of the next one was good or bad and localized the commit that introduced
  a bug into my workflow!</p>\n<p>I didn't have to manually review commits, click
  through logs, etc... I just let git checkout relevant commits and I ran whatever
  was appropriate for reproducing the bug to learn when it was comitted!</p>\n<div
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
  \   </style>\n\n    <a class='prev' href='/plug-snapshot-to-save-your-life'>\n\n\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M13.5 8.25L9.75 12L13.5
  15.75\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"> </path>\n        </svg>\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>prev</p>\n            <p class='prevnext-title'>Plug-Snapshot-To-Save-Your-Life</p>\n
  \       </div>\n    </a>\n\n    <a class='next' href='/dhcp-restart-to-save-ubuntu-22-04-server-networking'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>DHCP Restart to Save Ubuntu 22.04 Server Networking</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I try to commit a lot, and I also try to write useful tests appropriate
  for the scope of work I Whether by laziness, ignorance, or accepted tech debt I
  don Before today I would git bisect You essentially create a range of commits to
  consider and let '
now: 2024-06-26 16:50:21.523902
path: pages/til/git-bisect.md
published: false
slug: git-bisect
super_description: I try to commit a lot, and I also try to write useful tests appropriate
  for the scope of work I Whether by laziness, ignorance, or accepted tech debt I
  don Before today I would git bisect You essentially create a range of commits to
  consider and let  Start with  After starting bisect with a  Git checksout a commit
  somewhere about halfway between the good and bad commit so you can see if your bug
  is there or not. In my example here I have a python script with some loops and print
  statements - the
tags:
- git
- tech
templateKey: til
title: Git-Bisect
today: 2024-06-26
---

I try to commit a lot, and I also try to write useful tests appropriate for the scope of work I'm focusing on, but sometimes I drop the ball...

Whether by laziness, ignorance, or accepted tech debt I don't always code perfectly and recently I was dozens of commits into a new feature before realizing I broke something along the way that none of my tests caught...

Before today I would've manually reviewed every commit to see if something obvious slipped by me (talk about a time suck 😩)

__There must be a better way__

# Bisect?

`git bisect` is the magic sauce for this exact problem...

You essentially create a range of commits to consider and let `git bisect` guide you through them in a manner akin to Newton's method for finding the root of a continuous function.

# How to do it?

Start with `git bisect start` and then choose the first `good` commit (ie. a commit you know the bug isn't present in)

```bash

sandbox   bisect-post   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect start

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good 655332b
bisect-post  HEAD         main         ORIG_HEAD
5b31e1e  -- [HEAD]    add successful print (52 seconds ago)
308247b  -- [HEAD^]   init another loop (77 seconds ago)
4555c59  -- [HEAD^^]  introduce bug (2 minutes ago)
9cf6d55  -- [HEAD~3]  add successful loop (3 minutes ago)
bcb41c3  -- [HEAD~4]  change x to 10 (4 minutes ago)
3c34aac  -- [HEAD~5]  init x to 1 (4 minutes ago)
12e53bd  -- [HEAD~6]  print cwd (4 minutes ago)
655332b  -- [HEAD~7]  add example.py (10 minutes ago)  # <- I want to start at this commit
59e0048  -- [HEAD~8]  gitignore (23 hours ago)
fb9e1fb  -- [HEAD~9]  add reqs (23 hours ago)

```

```bash

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad 5b31e1e
bisect-post                                                ORIG_HEAD
HEAD                                                       refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57
main
5b31e1e  -- [HEAD]    add successful print (5 minutes ago)  # <- I start here with the "bad" commit
308247b  -- [HEAD^]   init another loop (6 minutes ago)
4555c59  -- [HEAD^^]  introduce bug (6 minutes ago)
9cf6d55  -- [HEAD~3]  add successful loop (7 minutes ago)
bcb41c3  -- [HEAD~4]  change x to 10 (8 minutes ago)
3c34aac  -- [HEAD~5]  init x to 1 (9 minutes ago)
12e53bd  -- [HEAD~6]  print cwd (9 minutes ago)
655332b  -- [HEAD~7]  add example.py (14 minutes ago)
59e0048  -- [HEAD~8]  gitignore (23 hours ago)
fb9e1fb  -- [HEAD~9]  add reqs (23 hours ago)

```

After starting bisect with a "good" start commit and a "bad" ending commit we can let git to it's thing!

Git checksout a commit somewhere about halfway between the good and bad commit so you can see if your bug is there or not.

```bash

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad 5b31e1e
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[bcb41c3854e343eade85353683f2c1c4ddde4e04] change x to 10

sandbox   HEAD (bcb41c38) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯
```

In my example here I have a python script with some loops and print statements - they aren't really relevant, I just wanted an easy to follow git history.

So I check to see if the bug is present or not either by running/writing tests or replicating the bug somehow.

In this session commit `bcb41c38` is actually just fine, so I do `git bisect good`

```bash

sandbox   HEAD (bcb41c38) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good
Bisecting: 1 revision left to test after this (roughly 1 step)
[4555c5979268dff6c475365fdc5ce1d4a12bd820] introduce bug

```

And we see that git moves on to checkout another commit...

In this case the next commit is the one where I introduced a bug

`git bisect bad` then gives me:

```bash

sandbox   HEAD (4555c597) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[9cf6d55301560c51e2f55404d0d80b1f1e22a33d] add successful loop
```

At `4555c597` the script works as expected so one more `git bisect good` yields...

```bash
sandbox   HEAD (9cf6d553) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good
4555c5979268dff6c475365fdc5ce1d4a12bd820 is the first bad commit
commit 4555c5979268dff6c475365fdc5ce1d4a12bd820
Author: ########################### 
Date:   Tue May 3 09:00:00 2022 -0500

    introduce bug

 example.py | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)


```

# What happened?

Git sliced up a range of commits based on me saying of the next one was good or bad and localized the commit that introduced a bug into my workflow!

I didn't have to manually review commits, click through logs, etc... I just let git checkout relevant commits and I ran whatever was appropriate for reproducing the bug to learn when it was comitted!
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
    
    <a class='prev' href='/plug-snapshot-to-save-your-life'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Plug-Snapshot-To-Save-Your-Life</p>
        </div>
    </a>
    
    <a class='next' href='/dhcp-restart-to-save-ubuntu-22-04-server-networking'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>DHCP Restart to Save Ubuntu 22.04 Server Networking</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>