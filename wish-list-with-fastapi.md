---
article_html: "<p>Amazon has crossed the line with me just one too many times now
  so we are looking to drop them like every other Big Tech provider....</p>\n<p>However,
  one key feature of Amazon that has been so useful for us is Lists... We can just
  maintain a list for each of us and then family members can login anytime and check
  it out... \nThis really alleviates any last minute gift idea stress right before
  a birthday or something.</p>\n<p>So I need a nice gift list service but I don't
  want to be locked into one company (like a Target registry or something) and I'd
  like to host it myself</p>\n<p>The internets had a few options but nothing looked/felt
  like I wanted to I decided to build my own.</p>\n<h1 id=\"the-frontend\">The Frontend</h1>\n<p><strong>I
  have no idea how to do front end so stay tuned</strong></p>\n<h1 id=\"the-backend\">The
  Backend</h1>\n<p>FastAPI for the win on this one... I followed a few examples online
  and what I was able to build in just a few minutes is pretty impressive thanks to
  the design of FastAPI.</p>\n<p>Some key features are:\n1. Auto doc generation\n2.
  Required typing (which makes #1 possible)\n3. Built-in api testing in the browser\n4.
  Easy integration with sqlalchemy\n5. Development time so short you won't be done
  with your coffee before having something up and running!</p>\n<h2 id=\"database\">Database</h2>\n<p>Starting
  with a simple <code>database.py</code> we can create a sqlalchemy session with a
  base model with about 7 lines of code...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">sqlalchemy</span> <span class=\"kn\">import</span>
  <span class=\"n\">create_engine</span>\n<span class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.ext.declarative</span>
  <span class=\"kn\">import</span> <span class=\"n\">declarative_base</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.orm</span> <span class=\"kn\">import</span>
  <span class=\"n\">sessionmaker</span>\n\n\n<span class=\"n\">SQLALCHEMY_DATABASE_URL</span>
  <span class=\"o\">=</span> <span class=\"s2\">&quot;sqlite:///wishes.sqlite3&quot;</span>\n<span
  class=\"n\">engine</span> <span class=\"o\">=</span> <span class=\"n\">create_engine</span><span
  class=\"p\">(</span><span class=\"n\">SQLALCHEMY_DATABASE_URL</span><span class=\"p\">)</span>\n<span
  class=\"n\">SessionLocal</span> <span class=\"o\">=</span> <span class=\"n\">sessionmaker</span><span
  class=\"p\">(</span><span class=\"n\">autocommit</span><span class=\"o\">=</span><span
  class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"n\">autoflush</span><span
  class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span> <span
  class=\"n\">bind</span><span class=\"o\">=</span><span class=\"n\">engine</span><span
  class=\"p\">)</span>\n<span class=\"n\">Base</span> <span class=\"o\">=</span> <span
  class=\"n\">declarative_base</span><span class=\"p\">()</span>\n</code></pre></div>\n<h2
  id=\"model\">Model</h2>\n<p>For my wish list I needed just a simple table:</p>\n<table>\n<thead>\n<tr>\n<th
  style=\"text-align: right;\">id</th>\n<th style=\"text-align: left;\">person</th>\n<th
  style=\"text-align: left;\">item</th>\n<th style=\"text-align: left;\">link</th>\n<th
  style=\"text-align: left;\">purchased</th>\n<th style=\"text-align: left;\">purchased_by</th>\n<th
  style=\"text-align: left;\">date_added</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td
  style=\"text-align: right;\">1</td>\n<td style=\"text-align: left;\">pypeaday</td>\n<td
  style=\"text-align: left;\">A sweet item</td>\n<td style=\"text-align: left;\"><a
  href=\"http://www.mystore.store\">www.mystore.store</a></td>\n<td style=\"text-align:
  left;\">False</td>\n<td style=\"text-align: left;\">dad</td>\n<td style=\"text-align:
  left;\">2022-05-05 21:55:09</td>\n</tr>\n<tr>\n<td style=\"text-align: right;\">2</td>\n<td
  style=\"text-align: left;\">pypeaday</td>\n<td style=\"text-align: left;\">A bitter
  item</td>\n<td style=\"text-align: left;\"><a href=\"http://www.bitterstore.com\">www.bitterstore.com</a></td>\n<td
  style=\"text-align: left;\">True</td>\n<td style=\"text-align: left;\">Mrs. pypeaday</td>\n<td
  style=\"text-align: left;\">2022-05-06 06:55:54</td>\n</tr>\n</tbody>\n</table>\n<p>The
  table is simple enough... A unique key, the person who the wish belongs to, the
  item (or wish), a link to the item, whether it's been purchased or not and by whom,
  and the date it was added.</p>\n<p>To make this model with sqlalchemy we can make
  a <code>model.py</code> like so:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">database</span> <span class=\"kn\">import</span>
  <span class=\"n\">Base</span>\n<span class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.schema</span>
  <span class=\"kn\">import</span> <span class=\"n\">Column</span>\n<span class=\"kn\">from</span>
  <span class=\"nn\">sqlalchemy.types</span> <span class=\"kn\">import</span> <span
  class=\"n\">Boolean</span><span class=\"p\">,</span> <span class=\"n\">Integer</span><span
  class=\"p\">,</span> <span class=\"n\">String</span><span class=\"p\">,</span> <span
  class=\"n\">Text</span>\n\n\n<span class=\"k\">class</span> <span class=\"nc\">Wishes</span><span
  class=\"p\">(</span><span class=\"n\">Base</span><span class=\"p\">):</span>\n    <span
  class=\"n\">__tablename__</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;Wishes&quot;</span>\n
  \   <span class=\"nb\">id</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
  class=\"p\">(</span><span class=\"n\">Integer</span><span class=\"p\">,</span> <span
  class=\"n\">primary_key</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
  class=\"p\">,</span> <span class=\"n\">index</span><span class=\"o\">=</span><span
  class=\"kc\">True</span><span class=\"p\">)</span>\n    <span class=\"n\">person</span>
  <span class=\"o\">=</span> <span class=\"n\">Column</span><span class=\"p\">(</span><span
  class=\"n\">String</span><span class=\"p\">(</span><span class=\"mi\">20</span><span
  class=\"p\">))</span>\n    <span class=\"n\">item</span> <span class=\"o\">=</span>
  <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
  class=\"p\">())</span>\n    <span class=\"n\">link</span> <span class=\"o\">=</span>
  <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
  class=\"p\">())</span>\n    <span class=\"n\">purchased</span> <span class=\"o\">=</span>
  <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Boolean</span><span
  class=\"p\">())</span>\n    <span class=\"n\">purchased_by</span> <span class=\"o\">=</span>
  <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">String</span><span
  class=\"p\">(</span><span class=\"mi\">90</span><span class=\"p\">))</span>\n    <span
  class=\"n\">date_added</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
  class=\"p\">(</span><span class=\"n\">String</span><span class=\"p\">(</span><span
  class=\"mi\">15</span><span class=\"p\">))</span>\n</code></pre></div>\n<h2 id=\"schema\">Schema</h2>\n<p>One
  of the best things about FastAPI is trivial integration with pydantic.\nWe can define
  a schema to ensure any data posted is not missing anything!</p>\n<p>Make a <code>schema.py</code>
  with the following:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">pydantic</span> <span class=\"kn\">import</span>
  <span class=\"n\">BaseModel</span>\n<span class=\"kn\">import</span> <span class=\"nn\">time</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">typing</span> <span class=\"kn\">import</span>
  <span class=\"n\">Optional</span>\n\n\n<span class=\"k\">class</span> <span class=\"nc\">wish_schema</span><span
  class=\"p\">(</span><span class=\"n\">BaseModel</span><span class=\"p\">):</span>\n\n
  \   <span class=\"n\">person</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
  \   <span class=\"n\">item</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
  \   <span class=\"n\">link</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
  \   <span class=\"n\">purchased</span><span class=\"p\">:</span> <span class=\"nb\">bool</span>
  <span class=\"o\">=</span> <span class=\"kc\">False</span>\n    <span class=\"n\">purchased_by</span><span
  class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
  class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
  class=\"kc\">None</span>\n    <span class=\"n\">date_added</span><span class=\"p\">:</span>
  <span class=\"n\">Optional</span><span class=\"p\">[</span><span class=\"nb\">str</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">time</span><span
  class=\"o\">.</span><span class=\"n\">strftime</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span class=\"s2\">
  %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
  class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">())</span>\n\n
  \   <span class=\"k\">class</span> <span class=\"nc\">Config</span><span class=\"p\">:</span>\n
  \       <span class=\"n\">orm_mode</span> <span class=\"o\">=</span> <span class=\"kc\">True</span>\n\n\n<span
  class=\"k\">class</span> <span class=\"nc\">patch_schema</span><span class=\"p\">(</span><span
  class=\"n\">BaseModel</span><span class=\"p\">):</span>\n\n    <span class=\"n\">purchased</span><span
  class=\"p\">:</span> <span class=\"nb\">bool</span>\n    <span class=\"n\">purchased_by</span><span
  class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
  class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
  class=\"kc\">None</span>\n\n    <span class=\"k\">class</span> <span class=\"nc\">Config</span><span
  class=\"p\">:</span>\n        <span class=\"n\">orm_mode</span> <span class=\"o\">=</span>
  <span class=\"kc\">True</span>\n</code></pre></div>\n<p>I have 2 schemas - one for
  a <code>wish</code> which you'll see down below is used to validate any <code>post</code>
  requests.</p>\n<p>To simplify things for me I made another schema, <code>patch_schema</code>
  which I use for the route that updates the table (ie. marking an existing wish as
  purchased) </p>\n<h2 id=\"session\">Session</h2>\n<p>One of the last things we need
  is a Session</p>\n<p>So make a <code>session.py</code>...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">database</span> <span class=\"kn\">import</span>
  <span class=\"n\">SessionLocal</span><span class=\"p\">,</span> <span class=\"n\">engine</span>\n<span
  class=\"kn\">import</span> <span class=\"nn\">model</span>\n\n<span class=\"n\">model</span><span
  class=\"o\">.</span><span class=\"n\">Base</span><span class=\"o\">.</span><span
  class=\"n\">metadata</span><span class=\"o\">.</span><span class=\"n\">create_all</span><span
  class=\"p\">(</span><span class=\"n\">bind</span><span class=\"o\">=</span><span
  class=\"n\">engine</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span>
  <span class=\"nf\">create_get_session</span><span class=\"p\">():</span>\n    <span
  class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">db</span>
  <span class=\"o\">=</span> <span class=\"n\">SessionLocal</span><span class=\"p\">()</span>\n
  \       <span class=\"k\">yield</span> <span class=\"n\">db</span>\n    <span class=\"k\">finally</span><span
  class=\"p\">:</span>\n        <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">close</span><span class=\"p\">()</span>\n</code></pre></div>\n<p>Our
  routes will depend on this <code>create_get_session</code> function that will yield
  a <code>db</code> object through which we'll udpate our database</p>\n<h1 id=\"ok-just-do-it-already\">Ok
  just do it already!</h1>\n<p>So our <code>main.py</code> will have a few routes
  in it...</p>\n<p>What do we want to support?</p>\n<ol>\n<li>Getting all wishes</li>\n<li>Getting
  a specific wish</li>\n<li>Updating a specific wish</li>\n<li>Deleting a wish</li>\n</ol>\n<p>I
  think the script is fairly self explanatory but here's a few notes...</p>\n<ol>\n<li>We
  decorate each function with <code>@app.&lt;method&gt;</code> and define <code>response_model</code>
  as well as <code>status_code</code></li>\n<li>The functions are defined with <code>async</code>
  (this was my first exposure to this so I can't go in depth on it yet)</li>\n<li>The
  functions all take a <code>db</code> which is from <code>session.py</code> and that
  <code>db</code> depends on the <code>create_get_session</code> function</li>\n<li>If
  the db is being updtes then we type the object used for the update with the appropriate
  schema (either <code>wish_schema</code> or <code>patch_schema</code>)</li>\n</ol>\n<p>From
  there we're in true python-land where you can basically guess the methods on <code>db</code>
  and you'd probably be right... (like <code>query</code>, <code>upddate</code>, <code>delete</code>
  etc.)</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"kn\">from</span>
  <span class=\"nn\">fastapi</span> <span class=\"kn\">import</span> <span class=\"n\">FastAPI</span><span
  class=\"p\">,</span> <span class=\"n\">Depends</span><span class=\"p\">,</span>
  <span class=\"n\">HTTPException</span>\n<span class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.orm</span>
  <span class=\"kn\">import</span> <span class=\"n\">Session</span>\n<span class=\"kn\">from</span>
  <span class=\"nn\">typing</span> <span class=\"kn\">import</span> <span class=\"n\">List</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">model</span> <span class=\"kn\">import</span>
  <span class=\"n\">Wishes</span>\n<span class=\"kn\">from</span> <span class=\"nn\">schema</span>
  <span class=\"kn\">import</span> <span class=\"n\">wish_schema</span><span class=\"p\">,</span>
  <span class=\"n\">patch_schema</span>\n<span class=\"kn\">from</span> <span class=\"nn\">session</span>
  <span class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
  class=\"n\">app</span> <span class=\"o\">=</span> <span class=\"n\">FastAPI</span><span
  class=\"p\">()</span>\n\n\n<span class=\"nd\">@app</span><span class=\"o\">.</span><span
  class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span
  class=\"p\">)</span>\n<span class=\"k\">def</span> <span class=\"nf\">read_root</span><span
  class=\"p\">():</span>\n    <span class=\"k\">return</span> <span class=\"p\">{</span><span
  class=\"s2\">&quot;message&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;server
  is up!&quot;</span><span class=\"p\">}</span>\n\n\n<span class=\"nd\">@app</span><span
  class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;/wishes&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
  class=\"o\">=</span><span class=\"n\">List</span><span class=\"p\">[</span><span
  class=\"n\">wish_schema</span><span class=\"p\">],</span> <span class=\"n\">status_code</span><span
  class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
  class=\"k\">async</span> <span class=\"k\">def</span> <span class=\"nf\">read_wishes</span><span
  class=\"p\">(</span><span class=\"n\">db</span><span class=\"p\">:</span> <span
  class=\"n\">Session</span> <span class=\"o\">=</span> <span class=\"n\">Depends</span><span
  class=\"p\">(</span><span class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n
  \   <span class=\"n\">wishes</span> <span class=\"o\">=</span> <span class=\"n\">db</span><span
  class=\"o\">.</span><span class=\"n\">query</span><span class=\"p\">(</span><span
  class=\"n\">Wishes</span><span class=\"p\">)</span><span class=\"o\">.</span><span
  class=\"n\">all</span><span class=\"p\">()</span>\n    <span class=\"k\">return</span>
  <span class=\"n\">wishes</span>\n\n\n<span class=\"nd\">@app</span><span class=\"o\">.</span><span
  class=\"n\">post</span><span class=\"p\">(</span><span class=\"s2\">&quot;/wishes&quot;</span><span
  class=\"p\">,</span> <span class=\"n\">response_model</span><span class=\"o\">=</span><span
  class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
  class=\"o\">=</span><span class=\"mi\">201</span><span class=\"p\">)</span>\n<span
  class=\"k\">async</span> <span class=\"k\">def</span> <span class=\"nf\">add_wish</span><span
  class=\"p\">(</span><span class=\"n\">wish</span><span class=\"p\">:</span> <span
  class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
  class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
  <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
  class=\"p\">)):</span>\n    <span class=\"n\">new_wish</span> <span class=\"o\">=</span>
  <span class=\"n\">Wishes</span><span class=\"p\">(</span>\n        <span class=\"n\">person</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">person</span><span class=\"p\">,</span>\n        <span class=\"n\">item</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">item</span><span class=\"p\">,</span>\n        <span class=\"n\">link</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">link</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">purchased</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased_by</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">purchased_by</span><span class=\"p\">,</span>\n        <span class=\"n\">date_added</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">date_added</span><span class=\"p\">,</span>\n    <span class=\"p\">)</span>\n
  \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">add</span><span
  class=\"p\">(</span><span class=\"n\">new_wish</span><span class=\"p\">)</span>\n
  \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">commit</span><span
  class=\"p\">()</span>\n\n    <span class=\"k\">return</span> <span class=\"n\">new_wish</span>\n\n\n<span
  class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">get</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
  class=\"o\">=</span><span class=\"n\">wish_schema</span><span class=\"p\">,</span>
  <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
  class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span>
  <span class=\"nf\">get_wish</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
  class=\"p\">:</span> <span class=\"nb\">int</span><span class=\"p\">,</span> <span
  class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
  <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
  class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n    <span class=\"n\">wish</span>
  <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
  class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">get</span><span
  class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">)</span>\n    <span
  class=\"k\">return</span> <span class=\"n\">wish</span>\n\n\n<span class=\"nd\">@app</span><span
  class=\"o\">.</span><span class=\"n\">patch</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span class=\"s2\">&quot;</span><span
  class=\"p\">,</span> <span class=\"n\">response_model</span><span class=\"o\">=</span><span
  class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
  class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
  class=\"k\">async</span> <span class=\"k\">def</span> <span class=\"nf\">update_wish</span><span
  class=\"p\">(</span>\n    <span class=\"nb\">id</span><span class=\"p\">:</span>
  <span class=\"nb\">int</span><span class=\"p\">,</span> <span class=\"n\">patch</span><span
  class=\"p\">:</span> <span class=\"n\">patch_schema</span><span class=\"p\">,</span>
  <span class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
  <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
  class=\"n\">create_get_session</span><span class=\"p\">)</span>\n<span class=\"p\">):</span>\n
  \   <span class=\"n\">db_wish</span> <span class=\"o\">=</span> <span class=\"n\">db</span><span
  class=\"o\">.</span><span class=\"n\">query</span><span class=\"p\">(</span><span
  class=\"n\">Wishes</span><span class=\"p\">)</span><span class=\"o\">.</span><span
  class=\"n\">get</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
  class=\"p\">)</span>\n    <span class=\"n\">db_wish</span><span class=\"o\">.</span><span
  class=\"n\">purchased</span> <span class=\"o\">=</span> <span class=\"n\">patch</span><span
  class=\"o\">.</span><span class=\"n\">purchased</span>\n    <span class=\"n\">db_wish</span><span
  class=\"o\">.</span><span class=\"n\">purchased_by</span> <span class=\"o\">=</span>
  <span class=\"n\">patch</span><span class=\"o\">.</span><span class=\"n\">purchased_by</span>\n
  \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">commit</span><span
  class=\"p\">()</span>\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">refresh</span><span class=\"p\">(</span><span class=\"n\">db_wish</span><span
  class=\"p\">)</span>\n\n    <span class=\"k\">return</span> <span class=\"n\">db_wish</span>\n\n\n<span
  class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">delete</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
  class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
  class=\"k\">async</span> <span class=\"k\">def</span> <span class=\"nf\">delete_wish</span><span
  class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">:</span> <span
  class=\"nb\">int</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
  class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
  <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
  class=\"p\">)):</span>\n    <span class=\"n\">db_wish</span> <span class=\"o\">=</span>
  <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">query</span><span
  class=\"p\">(</span><span class=\"n\">Wishes</span><span class=\"p\">)</span><span
  class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
  class=\"nb\">id</span><span class=\"p\">)</span>\n    <span class=\"k\">if</span>
  <span class=\"ow\">not</span> <span class=\"n\">db_wish</span><span class=\"p\">:</span>\n
  \       <span class=\"k\">raise</span> <span class=\"n\">HTTPException</span><span
  class=\"p\">(</span><span class=\"n\">status_code</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;404&quot;</span><span class=\"p\">,</span> <span class=\"n\">detail</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;Wish id does not exist&quot;</span><span
  class=\"p\">)</span>\n\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">delete</span><span class=\"p\">(</span><span class=\"n\">db_wish</span><span
  class=\"p\">)</span>\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">commit</span><span class=\"p\">()</span>\n\n    <span class=\"k\">return</span>
  <span class=\"kc\">None</span>\n</code></pre></div>\n<h1 id=\"my-code\">My Code</h1>\n<p>You
  can find my repo <a href=\"https://github.com/nicpayne713/wish-lists\">here</a>.</p>\n<p>I'll
  plan to update and maintain for as long as I use it</p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/dataframe-to-markdown'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Dataframe-To-Markdown</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/unpack-anywhere-with-star'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Unpack-Anywhere-With-Star</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
cover: /static/wish-list-with-fastapi.png
date: 2022-05-06
datetime: 2022-05-06 00:00:00+00:00
description: Amazon has crossed the line with me just one too many times now so we
  are looking to drop them like every other Big Tech provider.... However, one key
  feature o
edit_link: https://github.com/edit/main/pages/blog/wish-list-with-fastapi.md
html: "<p>Amazon has crossed the line with me just one too many times now so we are
  looking to drop them like every other Big Tech provider....</p>\n<p>However, one
  key feature of Amazon that has been so useful for us is Lists... We can just maintain
  a list for each of us and then family members can login anytime and check it out...
  \nThis really alleviates any last minute gift idea stress right before a birthday
  or something.</p>\n<p>So I need a nice gift list service but I don't want to be
  locked into one company (like a Target registry or something) and I'd like to host
  it myself</p>\n<p>The internets had a few options but nothing looked/felt like I
  wanted to I decided to build my own.</p>\n<h1 id=\"the-frontend\">The Frontend</h1>\n<p><strong>I
  have no idea how to do front end so stay tuned</strong></p>\n<h1 id=\"the-backend\">The
  Backend</h1>\n<p>FastAPI for the win on this one... I followed a few examples online
  and what I was able to build in just a few minutes is pretty impressive thanks to
  the design of FastAPI.</p>\n<p>Some key features are:\n1. Auto doc generation\n2.
  Required typing (which makes #1 possible)\n3. Built-in api testing in the browser\n4.
  Easy integration with sqlalchemy\n5. Development time so short you won't be done
  with your coffee before having something up and running!</p>\n<h2 id=\"database\">Database</h2>\n<p>Starting
  with a simple <code>database.py</code> we can create a sqlalchemy session with a
  base model with about 7 lines of code...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">sqlalchemy</span> <span class=\"kn\">import</span>
  <span class=\"n\">create_engine</span>\n<span class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.ext.declarative</span>
  <span class=\"kn\">import</span> <span class=\"n\">declarative_base</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.orm</span> <span class=\"kn\">import</span>
  <span class=\"n\">sessionmaker</span>\n\n\n<span class=\"n\">SQLALCHEMY_DATABASE_URL</span>
  <span class=\"o\">=</span> <span class=\"s2\">&quot;sqlite:///wishes.sqlite3&quot;</span>\n<span
  class=\"n\">engine</span> <span class=\"o\">=</span> <span class=\"n\">create_engine</span><span
  class=\"p\">(</span><span class=\"n\">SQLALCHEMY_DATABASE_URL</span><span class=\"p\">)</span>\n<span
  class=\"n\">SessionLocal</span> <span class=\"o\">=</span> <span class=\"n\">sessionmaker</span><span
  class=\"p\">(</span><span class=\"n\">autocommit</span><span class=\"o\">=</span><span
  class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"n\">autoflush</span><span
  class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span> <span
  class=\"n\">bind</span><span class=\"o\">=</span><span class=\"n\">engine</span><span
  class=\"p\">)</span>\n<span class=\"n\">Base</span> <span class=\"o\">=</span> <span
  class=\"n\">declarative_base</span><span class=\"p\">()</span>\n</code></pre></div>\n<h2
  id=\"model\">Model</h2>\n<p>For my wish list I needed just a simple table:</p>\n<table>\n<thead>\n<tr>\n<th
  style=\"text-align: right;\">id</th>\n<th style=\"text-align: left;\">person</th>\n<th
  style=\"text-align: left;\">item</th>\n<th style=\"text-align: left;\">link</th>\n<th
  style=\"text-align: left;\">purchased</th>\n<th style=\"text-align: left;\">purchased_by</th>\n<th
  style=\"text-align: left;\">date_added</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td
  style=\"text-align: right;\">1</td>\n<td style=\"text-align: left;\">pypeaday</td>\n<td
  style=\"text-align: left;\">A sweet item</td>\n<td style=\"text-align: left;\"><a
  href=\"http://www.mystore.store\">www.mystore.store</a></td>\n<td style=\"text-align:
  left;\">False</td>\n<td style=\"text-align: left;\">dad</td>\n<td style=\"text-align:
  left;\">2022-05-05 21:55:09</td>\n</tr>\n<tr>\n<td style=\"text-align: right;\">2</td>\n<td
  style=\"text-align: left;\">pypeaday</td>\n<td style=\"text-align: left;\">A bitter
  item</td>\n<td style=\"text-align: left;\"><a href=\"http://www.bitterstore.com\">www.bitterstore.com</a></td>\n<td
  style=\"text-align: left;\">True</td>\n<td style=\"text-align: left;\">Mrs. pypeaday</td>\n<td
  style=\"text-align: left;\">2022-05-06 06:55:54</td>\n</tr>\n</tbody>\n</table>\n<p>The
  table is simple enough... A unique key, the person who the wish belongs to, the
  item (or wish), a link to the item, whether it's been purchased or not and by whom,
  and the date it was added.</p>\n<p>To make this model with sqlalchemy we can make
  a <code>model.py</code> like so:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">database</span> <span class=\"kn\">import</span>
  <span class=\"n\">Base</span>\n<span class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.schema</span>
  <span class=\"kn\">import</span> <span class=\"n\">Column</span>\n<span class=\"kn\">from</span>
  <span class=\"nn\">sqlalchemy.types</span> <span class=\"kn\">import</span> <span
  class=\"n\">Boolean</span><span class=\"p\">,</span> <span class=\"n\">Integer</span><span
  class=\"p\">,</span> <span class=\"n\">String</span><span class=\"p\">,</span> <span
  class=\"n\">Text</span>\n\n\n<span class=\"k\">class</span> <span class=\"nc\">Wishes</span><span
  class=\"p\">(</span><span class=\"n\">Base</span><span class=\"p\">):</span>\n    <span
  class=\"n\">__tablename__</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;Wishes&quot;</span>\n
  \   <span class=\"nb\">id</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
  class=\"p\">(</span><span class=\"n\">Integer</span><span class=\"p\">,</span> <span
  class=\"n\">primary_key</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
  class=\"p\">,</span> <span class=\"n\">index</span><span class=\"o\">=</span><span
  class=\"kc\">True</span><span class=\"p\">)</span>\n    <span class=\"n\">person</span>
  <span class=\"o\">=</span> <span class=\"n\">Column</span><span class=\"p\">(</span><span
  class=\"n\">String</span><span class=\"p\">(</span><span class=\"mi\">20</span><span
  class=\"p\">))</span>\n    <span class=\"n\">item</span> <span class=\"o\">=</span>
  <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
  class=\"p\">())</span>\n    <span class=\"n\">link</span> <span class=\"o\">=</span>
  <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
  class=\"p\">())</span>\n    <span class=\"n\">purchased</span> <span class=\"o\">=</span>
  <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Boolean</span><span
  class=\"p\">())</span>\n    <span class=\"n\">purchased_by</span> <span class=\"o\">=</span>
  <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">String</span><span
  class=\"p\">(</span><span class=\"mi\">90</span><span class=\"p\">))</span>\n    <span
  class=\"n\">date_added</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
  class=\"p\">(</span><span class=\"n\">String</span><span class=\"p\">(</span><span
  class=\"mi\">15</span><span class=\"p\">))</span>\n</code></pre></div>\n<h2 id=\"schema\">Schema</h2>\n<p>One
  of the best things about FastAPI is trivial integration with pydantic.\nWe can define
  a schema to ensure any data posted is not missing anything!</p>\n<p>Make a <code>schema.py</code>
  with the following:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">pydantic</span> <span class=\"kn\">import</span>
  <span class=\"n\">BaseModel</span>\n<span class=\"kn\">import</span> <span class=\"nn\">time</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">typing</span> <span class=\"kn\">import</span>
  <span class=\"n\">Optional</span>\n\n\n<span class=\"k\">class</span> <span class=\"nc\">wish_schema</span><span
  class=\"p\">(</span><span class=\"n\">BaseModel</span><span class=\"p\">):</span>\n\n
  \   <span class=\"n\">person</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
  \   <span class=\"n\">item</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
  \   <span class=\"n\">link</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
  \   <span class=\"n\">purchased</span><span class=\"p\">:</span> <span class=\"nb\">bool</span>
  <span class=\"o\">=</span> <span class=\"kc\">False</span>\n    <span class=\"n\">purchased_by</span><span
  class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
  class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
  class=\"kc\">None</span>\n    <span class=\"n\">date_added</span><span class=\"p\">:</span>
  <span class=\"n\">Optional</span><span class=\"p\">[</span><span class=\"nb\">str</span><span
  class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">time</span><span
  class=\"o\">.</span><span class=\"n\">strftime</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span class=\"s2\">
  %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
  class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">())</span>\n\n
  \   <span class=\"k\">class</span> <span class=\"nc\">Config</span><span class=\"p\">:</span>\n
  \       <span class=\"n\">orm_mode</span> <span class=\"o\">=</span> <span class=\"kc\">True</span>\n\n\n<span
  class=\"k\">class</span> <span class=\"nc\">patch_schema</span><span class=\"p\">(</span><span
  class=\"n\">BaseModel</span><span class=\"p\">):</span>\n\n    <span class=\"n\">purchased</span><span
  class=\"p\">:</span> <span class=\"nb\">bool</span>\n    <span class=\"n\">purchased_by</span><span
  class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
  class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
  class=\"kc\">None</span>\n\n    <span class=\"k\">class</span> <span class=\"nc\">Config</span><span
  class=\"p\">:</span>\n        <span class=\"n\">orm_mode</span> <span class=\"o\">=</span>
  <span class=\"kc\">True</span>\n</code></pre></div>\n<p>I have 2 schemas - one for
  a <code>wish</code> which you'll see down below is used to validate any <code>post</code>
  requests.</p>\n<p>To simplify things for me I made another schema, <code>patch_schema</code>
  which I use for the route that updates the table (ie. marking an existing wish as
  purchased) </p>\n<h2 id=\"session\">Session</h2>\n<p>One of the last things we need
  is a Session</p>\n<p>So make a <code>session.py</code>...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"kn\">from</span> <span class=\"nn\">database</span> <span class=\"kn\">import</span>
  <span class=\"n\">SessionLocal</span><span class=\"p\">,</span> <span class=\"n\">engine</span>\n<span
  class=\"kn\">import</span> <span class=\"nn\">model</span>\n\n<span class=\"n\">model</span><span
  class=\"o\">.</span><span class=\"n\">Base</span><span class=\"o\">.</span><span
  class=\"n\">metadata</span><span class=\"o\">.</span><span class=\"n\">create_all</span><span
  class=\"p\">(</span><span class=\"n\">bind</span><span class=\"o\">=</span><span
  class=\"n\">engine</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span>
  <span class=\"nf\">create_get_session</span><span class=\"p\">():</span>\n    <span
  class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">db</span>
  <span class=\"o\">=</span> <span class=\"n\">SessionLocal</span><span class=\"p\">()</span>\n
  \       <span class=\"k\">yield</span> <span class=\"n\">db</span>\n    <span class=\"k\">finally</span><span
  class=\"p\">:</span>\n        <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">close</span><span class=\"p\">()</span>\n</code></pre></div>\n<p>Our
  routes will depend on this <code>create_get_session</code> function that will yield
  a <code>db</code> object through which we'll udpate our database</p>\n<h1 id=\"ok-just-do-it-already\">Ok
  just do it already!</h1>\n<p>So our <code>main.py</code> will have a few routes
  in it...</p>\n<p>What do we want to support?</p>\n<ol>\n<li>Getting all wishes</li>\n<li>Getting
  a specific wish</li>\n<li>Updating a specific wish</li>\n<li>Deleting a wish</li>\n</ol>\n<p>I
  think the script is fairly self explanatory but here's a few notes...</p>\n<ol>\n<li>We
  decorate each function with <code>@app.&lt;method&gt;</code> and define <code>response_model</code>
  as well as <code>status_code</code></li>\n<li>The functions are defined with <code>async</code>
  (this was my first exposure to this so I can't go in depth on it yet)</li>\n<li>The
  functions all take a <code>db</code> which is from <code>session.py</code> and that
  <code>db</code> depends on the <code>create_get_session</code> function</li>\n<li>If
  the db is being updtes then we type the object used for the update with the appropriate
  schema (either <code>wish_schema</code> or <code>patch_schema</code>)</li>\n</ol>\n<p>From
  there we're in true python-land where you can basically guess the methods on <code>db</code>
  and you'd probably be right... (like <code>query</code>, <code>upddate</code>, <code>delete</code>
  etc.)</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"kn\">from</span>
  <span class=\"nn\">fastapi</span> <span class=\"kn\">import</span> <span class=\"n\">FastAPI</span><span
  class=\"p\">,</span> <span class=\"n\">Depends</span><span class=\"p\">,</span>
  <span class=\"n\">HTTPException</span>\n<span class=\"kn\">from</span> <span class=\"nn\">sqlalchemy.orm</span>
  <span class=\"kn\">import</span> <span class=\"n\">Session</span>\n<span class=\"kn\">from</span>
  <span class=\"nn\">typing</span> <span class=\"kn\">import</span> <span class=\"n\">List</span>\n<span
  class=\"kn\">from</span> <span class=\"nn\">model</span> <span class=\"kn\">import</span>
  <span class=\"n\">Wishes</span>\n<span class=\"kn\">from</span> <span class=\"nn\">schema</span>
  <span class=\"kn\">import</span> <span class=\"n\">wish_schema</span><span class=\"p\">,</span>
  <span class=\"n\">patch_schema</span>\n<span class=\"kn\">from</span> <span class=\"nn\">session</span>
  <span class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
  class=\"n\">app</span> <span class=\"o\">=</span> <span class=\"n\">FastAPI</span><span
  class=\"p\">()</span>\n\n\n<span class=\"nd\">@app</span><span class=\"o\">.</span><span
  class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span
  class=\"p\">)</span>\n<span class=\"k\">def</span> <span class=\"nf\">read_root</span><span
  class=\"p\">():</span>\n    <span class=\"k\">return</span> <span class=\"p\">{</span><span
  class=\"s2\">&quot;message&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;server
  is up!&quot;</span><span class=\"p\">}</span>\n\n\n<span class=\"nd\">@app</span><span
  class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;/wishes&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
  class=\"o\">=</span><span class=\"n\">List</span><span class=\"p\">[</span><span
  class=\"n\">wish_schema</span><span class=\"p\">],</span> <span class=\"n\">status_code</span><span
  class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
  class=\"k\">async</span> <span class=\"k\">def</span> <span class=\"nf\">read_wishes</span><span
  class=\"p\">(</span><span class=\"n\">db</span><span class=\"p\">:</span> <span
  class=\"n\">Session</span> <span class=\"o\">=</span> <span class=\"n\">Depends</span><span
  class=\"p\">(</span><span class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n
  \   <span class=\"n\">wishes</span> <span class=\"o\">=</span> <span class=\"n\">db</span><span
  class=\"o\">.</span><span class=\"n\">query</span><span class=\"p\">(</span><span
  class=\"n\">Wishes</span><span class=\"p\">)</span><span class=\"o\">.</span><span
  class=\"n\">all</span><span class=\"p\">()</span>\n    <span class=\"k\">return</span>
  <span class=\"n\">wishes</span>\n\n\n<span class=\"nd\">@app</span><span class=\"o\">.</span><span
  class=\"n\">post</span><span class=\"p\">(</span><span class=\"s2\">&quot;/wishes&quot;</span><span
  class=\"p\">,</span> <span class=\"n\">response_model</span><span class=\"o\">=</span><span
  class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
  class=\"o\">=</span><span class=\"mi\">201</span><span class=\"p\">)</span>\n<span
  class=\"k\">async</span> <span class=\"k\">def</span> <span class=\"nf\">add_wish</span><span
  class=\"p\">(</span><span class=\"n\">wish</span><span class=\"p\">:</span> <span
  class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
  class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
  <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
  class=\"p\">)):</span>\n    <span class=\"n\">new_wish</span> <span class=\"o\">=</span>
  <span class=\"n\">Wishes</span><span class=\"p\">(</span>\n        <span class=\"n\">person</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">person</span><span class=\"p\">,</span>\n        <span class=\"n\">item</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">item</span><span class=\"p\">,</span>\n        <span class=\"n\">link</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">link</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">purchased</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased_by</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">purchased_by</span><span class=\"p\">,</span>\n        <span class=\"n\">date_added</span><span
  class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
  class=\"n\">date_added</span><span class=\"p\">,</span>\n    <span class=\"p\">)</span>\n
  \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">add</span><span
  class=\"p\">(</span><span class=\"n\">new_wish</span><span class=\"p\">)</span>\n
  \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">commit</span><span
  class=\"p\">()</span>\n\n    <span class=\"k\">return</span> <span class=\"n\">new_wish</span>\n\n\n<span
  class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">get</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
  class=\"o\">=</span><span class=\"n\">wish_schema</span><span class=\"p\">,</span>
  <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
  class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span>
  <span class=\"nf\">get_wish</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
  class=\"p\">:</span> <span class=\"nb\">int</span><span class=\"p\">,</span> <span
  class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
  <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
  class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n    <span class=\"n\">wish</span>
  <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
  class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">get</span><span
  class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">)</span>\n    <span
  class=\"k\">return</span> <span class=\"n\">wish</span>\n\n\n<span class=\"nd\">@app</span><span
  class=\"o\">.</span><span class=\"n\">patch</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span class=\"s2\">&quot;</span><span
  class=\"p\">,</span> <span class=\"n\">response_model</span><span class=\"o\">=</span><span
  class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
  class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
  class=\"k\">async</span> <span class=\"k\">def</span> <span class=\"nf\">update_wish</span><span
  class=\"p\">(</span>\n    <span class=\"nb\">id</span><span class=\"p\">:</span>
  <span class=\"nb\">int</span><span class=\"p\">,</span> <span class=\"n\">patch</span><span
  class=\"p\">:</span> <span class=\"n\">patch_schema</span><span class=\"p\">,</span>
  <span class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
  <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
  class=\"n\">create_get_session</span><span class=\"p\">)</span>\n<span class=\"p\">):</span>\n
  \   <span class=\"n\">db_wish</span> <span class=\"o\">=</span> <span class=\"n\">db</span><span
  class=\"o\">.</span><span class=\"n\">query</span><span class=\"p\">(</span><span
  class=\"n\">Wishes</span><span class=\"p\">)</span><span class=\"o\">.</span><span
  class=\"n\">get</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
  class=\"p\">)</span>\n    <span class=\"n\">db_wish</span><span class=\"o\">.</span><span
  class=\"n\">purchased</span> <span class=\"o\">=</span> <span class=\"n\">patch</span><span
  class=\"o\">.</span><span class=\"n\">purchased</span>\n    <span class=\"n\">db_wish</span><span
  class=\"o\">.</span><span class=\"n\">purchased_by</span> <span class=\"o\">=</span>
  <span class=\"n\">patch</span><span class=\"o\">.</span><span class=\"n\">purchased_by</span>\n
  \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">commit</span><span
  class=\"p\">()</span>\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">refresh</span><span class=\"p\">(</span><span class=\"n\">db_wish</span><span
  class=\"p\">)</span>\n\n    <span class=\"k\">return</span> <span class=\"n\">db_wish</span>\n\n\n<span
  class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">delete</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
  class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
  class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
  class=\"k\">async</span> <span class=\"k\">def</span> <span class=\"nf\">delete_wish</span><span
  class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">:</span> <span
  class=\"nb\">int</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
  class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
  <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
  class=\"p\">)):</span>\n    <span class=\"n\">db_wish</span> <span class=\"o\">=</span>
  <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">query</span><span
  class=\"p\">(</span><span class=\"n\">Wishes</span><span class=\"p\">)</span><span
  class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
  class=\"nb\">id</span><span class=\"p\">)</span>\n    <span class=\"k\">if</span>
  <span class=\"ow\">not</span> <span class=\"n\">db_wish</span><span class=\"p\">:</span>\n
  \       <span class=\"k\">raise</span> <span class=\"n\">HTTPException</span><span
  class=\"p\">(</span><span class=\"n\">status_code</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;404&quot;</span><span class=\"p\">,</span> <span class=\"n\">detail</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;Wish id does not exist&quot;</span><span
  class=\"p\">)</span>\n\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">delete</span><span class=\"p\">(</span><span class=\"n\">db_wish</span><span
  class=\"p\">)</span>\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
  class=\"n\">commit</span><span class=\"p\">()</span>\n\n    <span class=\"k\">return</span>
  <span class=\"kc\">None</span>\n</code></pre></div>\n<h1 id=\"my-code\">My Code</h1>\n<p>You
  can find my repo <a href=\"https://github.com/nicpayne713/wish-lists\">here</a>.</p>\n<p>I'll
  plan to update and maintain for as long as I use it</p>\n<div class='prevnext'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/dataframe-to-markdown'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Dataframe-To-Markdown</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/unpack-anywhere-with-star'>\n\n        <div
  class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n            <p
  class='prevnext-title'>Unpack-Anywhere-With-Star</p>\n        </div>\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M10.5 15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n
  \       </svg>\n    </a>\n  </div>"
jinja: false
long_description: Amazon has crossed the line with me just one too many times now
  so we are looking to drop them like every other Big Tech provider.... However, one
  key feature of Amazon that has been so useful for us is Lists... We can just maintain
  a list for each o
now: 2024-10-12 11:09:11.872381
path: pages/blog/wish-list-with-fastapi.md
published: true
slug: wish-list-with-fastapi
super_description: Amazon has crossed the line with me just one too many times now
  so we are looking to drop them like every other Big Tech provider.... However, one
  key feature of Amazon that has been so useful for us is Lists... We can just maintain
  a list for each of us and then family members can login anytime and check it out...
  So I need a nice gift list service but I don The internets had a few options but
  nothing looked/felt like I wanted to I decided to build my own. FastAPI for the
  win on this one... I f
tags:
- python
- blog
- tech
templateKey: blog-post
title: Wish-List-With-Fastapi
today: 2024-10-12
---

Amazon has crossed the line with me just one too many times now so we are looking to drop them like every other Big Tech provider....

However, one key feature of Amazon that has been so useful for us is Lists... We can just maintain a list for each of us and then family members can login anytime and check it out... 
This really alleviates any last minute gift idea stress right before a birthday or something.

So I need a nice gift list service but I don't want to be locked into one company (like a Target registry or something) and I'd like to host it myself

The internets had a few options but nothing looked/felt like I wanted to I decided to build my own.

# The Frontend

__I have no idea how to do front end so stay tuned__

# The Backend

FastAPI for the win on this one... I followed a few examples online and what I was able to build in just a few minutes is pretty impressive thanks to the design of FastAPI.

Some key features are:
1. Auto doc generation
2. Required typing (which makes #1 possible)
3. Built-in api testing in the browser
4. Easy integration with sqlalchemy
5. Development time so short you won't be done with your coffee before having something up and running!

## Database

Starting with a simple `database.py` we can create a sqlalchemy session with a base model with about 7 lines of code...

```python

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "sqlite:///wishes.sqlite3"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

## Model

For my wish list I needed just a simple table:

|   id | person   | item         | link         | purchased   | purchased_by   | date_added          |
|-----:|:---------|:-------------|:-------------|:------------|:---------------|:--------------------|
|    1 | pypeaday | A sweet item | www.mystore.store | False        | dad| 2022-05-05 21:55:09 |
|    2 | pypeaday   | A bitter item| www.bitterstore.com | True       |Mrs. pypeaday |  2022-05-06 06:55:54 |


The table is simple enough... A unique key, the person who the wish belongs to, the item (or wish), a link to the item, whether it's been purchased or not and by whom, and the date it was added.

To make this model with sqlalchemy we can make a `model.py` like so:

```python
from database import Base
from sqlalchemy.schema import Column
from sqlalchemy.types import Boolean, Integer, String, Text


class Wishes(Base):
    __tablename__ = "Wishes"
    id = Column(Integer, primary_key=True, index=True)
    person = Column(String(20))
    item = Column(Text())
    link = Column(Text())
    purchased = Column(Boolean())
    purchased_by = Column(String(90))
    date_added = Column(String(15))
```

## Schema

One of the best things about FastAPI is trivial integration with pydantic.
We can define a schema to ensure any data posted is not missing anything!

Make a `schema.py` with the following:

```python
from pydantic import BaseModel
import time
from typing import Optional


class wish_schema(BaseModel):

    person: str
    item: str
    link: str
    purchased: bool = False
    purchased_by: Optional[str] = None
    date_added: Optional[str] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    class Config:
        orm_mode = True


class patch_schema(BaseModel):

    purchased: bool
    purchased_by: Optional[str] = None

    class Config:
        orm_mode = True

```

I have 2 schemas - one for a `wish` which you'll see down below is used to validate any `post` requests.

To simplify things for me I made another schema, `patch_schema` which I use for the route that updates the table (ie. marking an existing wish as purchased) 

## Session

One of the last things we need is a Session

So make a `session.py`...

```python
from database import SessionLocal, engine
import model

model.Base.metadata.create_all(bind=engine)


def create_get_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
```

Our routes will depend on this `create_get_session` function that will yield a `db` object through which we'll udpate our database

# Ok just do it already!

So our `main.py` will have a few routes in it...

What do we want to support?

1. Getting all wishes
2. Getting a specific wish
3. Updating a specific wish
4. Deleting a wish

I think the script is fairly self explanatory but here's a few notes...

1. We decorate each function with `@app.<method>` and define `response_model` as well as `status_code`
2. The functions are defined with `async` (this was my first exposure to this so I can't go in depth on it yet)
3. The functions all take a `db` which is from `session.py` and that `db` depends on the `create_get_session` function
4. If the db is being updtes then we type the object used for the update with the appropriate schema (either `wish_schema` or `patch_schema`)

From there we're in true python-land where you can basically guess the methods on `db` and you'd probably be right... (like `query`, `upddate`, `delete` etc.)


```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from model import Wishes
from schema import wish_schema, patch_schema
from session import create_get_session

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "server is up!"}


@app.get("/wishes", response_model=List[wish_schema], status_code=200)
async def read_wishes(db: Session = Depends(create_get_session)):
    wishes = db.query(Wishes).all()
    return wishes


@app.post("/wishes", response_model=wish_schema, status_code=201)
async def add_wish(wish: wish_schema, db: Session = Depends(create_get_session)):
    new_wish = Wishes(
        person=wish.person,
        item=wish.item,
        link=wish.link,
        purchased=wish.purchased,
        purchased_by=wish.purchased_by,
        date_added=wish.date_added,
    )
    db.add(new_wish)
    db.commit()

    return new_wish


@app.get("/wishes/{id}", response_model=wish_schema, status_code=200)
async def get_wish(id: int, db: Session = Depends(create_get_session)):
    wish = db.query(Wishes).get(id)
    return wish


@app.patch("/wishes/{id}", response_model=wish_schema, status_code=200)
async def update_wish(
    id: int, patch: patch_schema, db: Session = Depends(create_get_session)
):
    db_wish = db.query(Wishes).get(id)
    db_wish.purchased = patch.purchased
    db_wish.purchased_by = patch.purchased_by
    db.commit()
    db.refresh(db_wish)

    return db_wish


@app.delete("/wishes/{id}", status_code=200)
async def delete_wish(id: int, db: Session = Depends(create_get_session)):
    db_wish = db.query(Wishes).get(id)
    if not db_wish:
        raise HTTPException(status_code="404", detail="Wish id does not exist")

    db.delete(db_wish)
    db.commit()

    return None

```

# My Code

You can find my repo [here](https://github.com/nicpayne713/wish-lists).

I'll plan to update and maintain for as long as I use it
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
    
    <a class='prev' href='/dataframe-to-markdown'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Dataframe-To-Markdown</p>
        </div>
    </a>
    
    <a class='next' href='/unpack-anywhere-with-star'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Unpack-Anywhere-With-Star</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>