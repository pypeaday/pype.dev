---
article_html: "<p>I often struggle to remember the correct way to do <code>and</code>
  type comparisons when working in pandas.</p>\n<p>I remember learning long long ago
  that <code>and</code> and <code>&amp;</code> are different, the former being lazy
  boolean evaluation whereas the latter is a bitwise operation.</p>\n<p><strong>I
  learned a lot from <a href=\"https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump\">this
  SO post</a></strong></p>\n<h2 id=\"lists\">Lists</h2>\n<p>Python <code>list</code>
  objects can contain unlike elements - ie. <code>[True, 'foo', 1, '1', [1,2,3]]</code>
  is a valid list with booleans, strings, integers, and another list.\nBecause of
  this, we can't use <code>&amp;</code> to compare two lists since they can't be combined
  in a consistent and meaningful way.</p>\n<p>However we can use <code>and</code>
  since it doesn't do bitwise operations, it just evaluates the boolean value of the
  list (basically if it's non-empty then <code>bool(my_list)</code> evaluates to <code>True</code>)</p>\n<p>Here's
  an example:</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">my_list</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
  class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;2&quot;</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">,</span>
  <span class=\"p\">[</span><span class=\"kc\">True</span><span class=\"p\">],</span>
  <span class=\"kc\">False</span><span class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"nb\">bool</span><span class=\"p\">(</span><span class=\"n\">my_list</span><span
  class=\"p\">)</span>\n<span class=\"kc\">True</span>\n</code></pre></div>\n<p>If
  we compare <code>my_list</code> with <code>another_list</code> using <code>and</code>
  then the comparision will go:</p>\n<div class=\"highlight\"><pre><span></span><code>if
  bool(my_list):\n    if bool(another_list):\n       &lt;operation&gt; \n    else:\n
  \      break\n</code></pre></div>\n<p>Let's see another example:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">another_list</span> <span class=\"o\">=</span>
  <span class=\"p\">[</span><span class=\"kc\">False</span><span class=\"p\">,</span>
  <span class=\"kc\">False</span><span class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">my_list</span> <span class=\"ow\">and</span> <span class=\"n\">another_list</span>\n<span
  class=\"p\">[</span><span class=\"kc\">False</span><span class=\"p\">,</span> <span
  class=\"kc\">False</span><span class=\"p\">]</span>\n</code></pre></div>\n<p><code>bool(my_list)</code>
  evaluated to <code>True</code>, and <code>bool(another_list)</code> <em>also</em>
  evaluated to <code>True</code> even though it's full of <code>False</code> values
  because the object is non-empty.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"k\">if</span> <span class=\"n\">my_list</span>
  <span class=\"ow\">and</span> <span class=\"n\">another_list</span><span class=\"p\">:</span>\n<span
  class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span
  class=\"n\">foo</span>\n</code></pre></div>\n<p>So using <code>and</code> in this
  case results in a <code>True</code> conditional, so the <code>print</code> statement
  is executed.</p>\n<p>Feels kind of counter-intuitive at first glance, to me anyways...</p>\n<p>However,
  we can't use <code>&amp;</code> because there isn't a meaningful to do bitwise operations
  over these two lists:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">my_list</span> <span class=\"o\">&amp;</span>
  <span class=\"n\">another_list</span>\n<span class=\"err\">╭───────────────────────────────</span>
  <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
  <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
  class=\"p\">)</span> <span class=\"err\">────────────────────────────────╮</span>\n<span
  class=\"err\">│</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
  class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
  class=\"mi\">19</span><span class=\"o\">-</span><span class=\"n\">a2a16cebb3da</span><span
  class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
  class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">cell</span>
  <span class=\"n\">line</span><span class=\"p\">:</span> <span class=\"mi\">1</span><span
  class=\"o\">&gt;</span>                                              <span class=\"err\">│</span>\n<span
  class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"ne\">TypeError</span><span class=\"p\">:</span> <span class=\"n\">unsupported</span>
  <span class=\"n\">operand</span> <span class=\"nb\">type</span><span class=\"p\">(</span><span
  class=\"n\">s</span><span class=\"p\">)</span> <span class=\"k\">for</span> <span
  class=\"o\">&amp;</span><span class=\"p\">:</span> <span class=\"s1\">&#39;list&#39;</span>
  <span class=\"ow\">and</span> <span class=\"s1\">&#39;list&#39;</span>\n</code></pre></div>\n<h2
  id=\"numpy\">Numpy</h2>\n<p><code>numpy</code> arrays are special and they have
  a lot of fancy vectorization utilities built-in which make them great and fast for
  mathematical operations but now our logical comparisons need to be handled with
  a different kind of care.</p>\n<p>First thing though - without some trickery they
  do not hold mixed data types like a <code>list</code> does (necessary, I think,
  for the vectorized optimization that numpy is built on top of)</p>\n<p>With that
  out of the way here's the main thing for this post, we can't just evaluate the <code>bool</code>
  of an array - numpy says no no no.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">arr</span> <span class=\"o\">=</span> <span
  class=\"n\">np</span><span class=\"o\">.</span><span class=\"n\">array</span><span
  class=\"p\">([</span><span class=\"s2\">&quot;1&quot;</span><span class=\"p\">,</span>
  <span class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"kc\">True</span><span
  class=\"p\">,</span> <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">arr</span>\n<span class=\"n\">array</span><span
  class=\"p\">([</span><span class=\"s1\">&#39;1&#39;</span><span class=\"p\">,</span>
  <span class=\"s1\">&#39;2&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;True&#39;</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;False&#39;</span><span class=\"p\">],</span>
  <span class=\"n\">dtype</span><span class=\"o\">=</span><span class=\"s1\">&#39;&lt;U21&#39;</span><span
  class=\"p\">)</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
  <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"nb\">bool</span><span
  class=\"p\">(</span><span class=\"n\">arr</span><span class=\"p\">)</span>\n<span
  class=\"err\">╭───────────────────────────────</span> <span class=\"n\">Traceback</span>
  <span class=\"p\">(</span><span class=\"n\">most</span> <span class=\"n\">recent</span>
  <span class=\"n\">call</span> <span class=\"n\">last</span><span class=\"p\">)</span>
  <span class=\"err\">────────────────────────────────╮</span>\n<span class=\"err\">│</span>
  <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span class=\"o\">-</span><span
  class=\"nb\">input</span><span class=\"o\">-</span><span class=\"mi\">25</span><span
  class=\"o\">-</span><span class=\"mf\">4e8</span><span class=\"n\">c5dd85b93</span><span
  class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
  class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">cell</span>
  <span class=\"n\">line</span><span class=\"p\">:</span> <span class=\"mi\">1</span><span
  class=\"o\">&gt;</span>                                              <span class=\"err\">│</span>\n<span
  class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
  <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
  <span class=\"n\">an</span> <span class=\"n\">array</span> <span class=\"k\">with</span>
  <span class=\"n\">more</span> <span class=\"n\">than</span> <span class=\"n\">one</span>
  <span class=\"n\">element</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
  class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
  class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
  class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">all</span><span class=\"p\">()</span>\n</code></pre></div>\n<blockquote>\n<p>This
  means that using <code>and</code> with <code>numpy</code> arrays doesn't really
  make sense because we probably care about the truth value of each element (bitwise),
  not the truth value of the array.</p>\n</blockquote>\n<p>Notice that when I print
  <code>arr</code> all the elements are a string - and the <code>dtype</code> is <code>&lt;U21</code>
  for all elements.</p>\n<p>This is not how I instantiated the array so be aware of
  that behavior with numpy.</p>\n<blockquote>\n<p><code>&lt;U21</code> is a dtype
  expressing the values are 'Little Endian', Unicode, 12 characters. See <a href=\"https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types\">here</a>
  for docs for docs</p>\n</blockquote>\n<p>So for logical comparisions we should look
  at the error message then...\nOur handy error message says to try <code>any</code>
  or <code>all</code></p>\n<p>Because the datatypes in this example are basically
  strings, using <code>arr.any()</code> will result in an error that I do not fully
  understand, but <code>any(arr)</code> and <code>all(arr)</code> work...</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span> <span
  class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"k\">if</span> <span class=\"n\">arr</span><span class=\"o\">.</span><span
  class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
  class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"err\">╭───────────────────────────────</span>
  <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
  <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
  class=\"p\">)</span> <span class=\"err\">────────────────────────────────╮</span>\n<span
  class=\"err\">│</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
  class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
  class=\"mi\">48</span><span class=\"o\">-</span><span class=\"mi\">25</span><span
  class=\"n\">ecac52db96</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
  class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
  class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
  <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
  class=\"err\">│</span>\n<span class=\"err\">│</span> <span class=\"o\">/</span><span
  class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
  class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
  class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
  class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
  class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
  class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
  class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
  class=\"n\">numpy</span><span class=\"o\">/</span><span class=\"n\">core</span><span
  class=\"o\">/</span><span class=\"n\">_methods</span><span class=\"o\">.</span><span
  class=\"n\">p</span> <span class=\"err\">│</span>\n<span class=\"err\">│</span>
  <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">57</span>
  <span class=\"ow\">in</span> <span class=\"n\">_any</span>                                                                                     <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>                                                                                                  <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">54</span>
  <span class=\"k\">def</span> <span class=\"nf\">_any</span><span class=\"p\">(</span><span
  class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
  class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
  class=\"n\">dtype</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
  class=\"p\">,</span> <span class=\"n\">out</span><span class=\"o\">=</span><span
  class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
  class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span> <span
  class=\"o\">*</span><span class=\"p\">,</span> <span class=\"n\">where</span><span
  class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">):</span>               <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">55</span>
  <span class=\"err\">│</span>   <span class=\"c1\"># Parsing keyword arguments is
  currently fairly slow, so avoid it for now              │</span>\n<span class=\"err\">│</span>
  \   <span class=\"mi\">56</span> <span class=\"err\">│</span>   <span class=\"k\">if</span>
  <span class=\"n\">where</span> <span class=\"ow\">is</span> <span class=\"kc\">True</span><span
  class=\"p\">:</span>                                                                      <span
  class=\"err\">│</span>\n<span class=\"err\">│</span> <span class=\"err\">❱</span>
  \ <span class=\"mi\">57</span> <span class=\"err\">│</span>   <span class=\"err\">│</span>
  \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
  class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
  class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span> <span
  class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
  class=\"p\">)</span>                                      <span class=\"err\">│</span>\n<span
  class=\"err\">│</span>    <span class=\"mi\">58</span> <span class=\"err\">│</span>
  \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
  class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
  class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span> <span
  class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
  class=\"p\">,</span> <span class=\"n\">where</span><span class=\"o\">=</span><span
  class=\"n\">where</span><span class=\"p\">)</span>                             <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">59</span>
  \                                                                                           <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">60</span>
  <span class=\"k\">def</span> <span class=\"nf\">_all</span><span class=\"p\">(</span><span
  class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
  class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
  class=\"n\">dtype</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
  class=\"p\">,</span> <span class=\"n\">out</span><span class=\"o\">=</span><span
  class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
  class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span> <span
  class=\"o\">*</span><span class=\"p\">,</span> <span class=\"n\">where</span><span
  class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">):</span>               <span
  class=\"err\">│</span>\n<span class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"n\">UFuncTypeError</span><span class=\"p\">:</span> <span class=\"n\">ufunc</span>
  <span class=\"s1\">&#39;logical_or&#39;</span> <span class=\"n\">did</span> <span
  class=\"ow\">not</span> <span class=\"n\">contain</span> <span class=\"n\">a</span>
  <span class=\"n\">loop</span> <span class=\"k\">with</span> <span class=\"n\">signature</span>
  <span class=\"n\">matching</span> <span class=\"n\">types</span> <span class=\"p\">(</span><span
  class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"o\">&lt;</span><span
  class=\"k\">class</span> <span class=\"err\">&#39;</span><span class=\"nc\">numpy</span><span
  class=\"o\">.</span><span class=\"n\">dtype</span><span class=\"p\">[</span><span
  class=\"n\">str_</span><span class=\"p\">]</span><span class=\"s1\">&#39;&gt;) -&gt;
  None</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span
  class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n\n<span class=\"err\">❯</span> <span class=\"k\">if</span>
  <span class=\"nb\">all</span><span class=\"p\">(</span><span class=\"n\">arr</span><span
  class=\"p\">):</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>     <span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span
  class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"k\">if</span> <span class=\"nb\">any</span><span class=\"p\">(</span><span
  class=\"n\">arr</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
  class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n</code></pre></div>\n<p>Let's
  change the example to just use integers and see what happens:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">arr2</span> <span class=\"o\">=</span>
  <span class=\"n\">np</span><span class=\"o\">.</span><span class=\"n\">array</span><span
  class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"kc\">True</span><span class=\"p\">,</span> <span class=\"kc\">False</span><span
  class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
  <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"n\">arr2</span>\n<span
  class=\"n\">array</span><span class=\"p\">([</span><span class=\"mi\">1</span><span
  class=\"p\">,</span> <span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"mi\">0</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"k\">if</span> <span class=\"n\">arr2</span><span class=\"o\">.</span><span
  class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
  class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"k\">if</span> <span class=\"n\">arr2</span><span
  class=\"o\">.</span><span class=\"n\">all</span><span class=\"p\">():</span>\n<span
  class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p>Ah,
  now some sanity...\nFirst, the booleans are stored as integers, which based on this
  discussion makes sense.\nNext we check if <code>any</code> values (this is a bitwise
  operation) are <code>True</code>, which we see they are so the conditional evaluates
  to <code>True</code>.\nHowver, if we check that <code>all</code> values are <code>True</code>
  we see they aren't, the last value is <code>False</code> or <code>0</code> so the
  conditional fails.</p>\n<p>This is a different way to evaluate logical conditions
  than with lists and it's because of the special nature of numpy arrays that allows
  them to be compared bitwise but on the flip side, there isn't a meaningful way to
  evaluate the <code>truth value</code> of an array.</p>\n<h2 id=\"pandas\">Pandas</h2>\n<p>Now
  for <code>pandas</code>, which under the hood is a lot of <code>numpy</code> but
  not fully. \n<code>pandas.Series</code> objects can hold mixed data types like lists,
  however to logically evaluate truth values we have to treat them like numpy arrays.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span> <span
  class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">s</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
  class=\"o\">.</span><span class=\"n\">Series</span><span class=\"p\">([</span><span
  class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span
  class=\"p\">,</span> <span class=\"kc\">True</span><span class=\"p\">,</span> <span
  class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">s</span>\n\n<span class=\"mi\">0</span>        <span class=\"mi\">1</span>\n<span
  class=\"mi\">1</span>      <span class=\"n\">foo</span>\n<span class=\"mi\">2</span>
  \    <span class=\"kc\">True</span>\n<span class=\"mi\">3</span>    <span class=\"kc\">False</span>\n<span
  class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n\n<span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"nb\">bool</span><span class=\"p\">(</span><span
  class=\"n\">s</span><span class=\"p\">)</span>\n<span class=\"err\">╭───────────────────────────────</span>
  <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
  <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
  class=\"p\">)</span> <span class=\"err\">────────────────────────────────╮</span>\n<span
  class=\"err\">│</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
  class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
  class=\"mi\">60</span><span class=\"o\">-</span><span class=\"mf\">68e48</span><span
  class=\"n\">e81da14</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
  class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
  class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
  <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
  class=\"err\">│</span>\n<span class=\"err\">│</span> <span class=\"o\">/</span><span
  class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
  class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
  class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
  class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
  class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
  class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
  class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
  class=\"n\">pandas</span><span class=\"o\">/</span><span class=\"n\">core</span><span
  class=\"o\">/</span><span class=\"n\">generic</span><span class=\"o\">.</span><span
  class=\"n\">p</span> <span class=\"err\">│</span>\n<span class=\"err\">│</span>
  <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">1527</span>
  <span class=\"ow\">in</span> <span class=\"n\">__nonzero__</span>                                                                            <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>                                                                                                  <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">1524</span>
  <span class=\"err\">│</span>                                                                                        <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">1525</span>
  <span class=\"err\">│</span>   <span class=\"nd\">@final</span>                                                                               <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">1526</span>
  <span class=\"err\">│</span>   <span class=\"k\">def</span> <span class=\"nf\">__nonzero__</span><span
  class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>                                                               <span
  class=\"err\">│</span>\n<span class=\"err\">│</span> <span class=\"err\">❱</span>
  \ <span class=\"mi\">1527</span> <span class=\"err\">│</span>   <span class=\"err\">│</span>
  \  <span class=\"k\">raise</span> <span class=\"ne\">ValueError</span><span class=\"p\">(</span>
  \                                                               <span class=\"err\">│</span>\n<span
  class=\"err\">│</span>    <span class=\"mi\">1528</span> <span class=\"err\">│</span>
  \  <span class=\"err\">│</span>   <span class=\"err\">│</span>   <span class=\"sa\">f</span><span
  class=\"s2\">&quot;The truth value of a </span><span class=\"si\">{</span><span
  class=\"nb\">type</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
  class=\"p\">)</span><span class=\"o\">.</span><span class=\"vm\">__name__</span><span
  class=\"si\">}</span><span class=\"s2\"> is ambiguous. &quot;</span>                 <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">1529</span>
  <span class=\"err\">│</span>   <span class=\"err\">│</span>   <span class=\"err\">│</span>
  \  <span class=\"s2\">&quot;Use a.empty, a.bool(), a.item(), a.any() or a.all().&quot;</span>
  \                      <span class=\"err\">│</span>\n<span class=\"err\">│</span>
  \   <span class=\"mi\">1530</span> <span class=\"err\">│</span>   <span class=\"err\">│</span>
  \  <span class=\"p\">)</span>                                                                                <span
  class=\"err\">│</span>\n<span class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
  <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
  <span class=\"n\">a</span> <span class=\"n\">Series</span> <span class=\"ow\">is</span>
  <span class=\"n\">ambiguous</span><span class=\"o\">.</span> <span class=\"n\">Use</span>
  <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">empty</span><span
  class=\"p\">,</span> <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">bool</span><span
  class=\"p\">(),</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">item</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
  class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
  class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">all</span><span class=\"p\">()</span><span class=\"o\">.</span>\n</code></pre></div>\n<p>Just
  like with numpy, we can't evaluate the truth value of the series in a meaningful
  way, but bitwise operations make perfect sense...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"err\">❯</span> <span class=\"k\">if</span> <span class=\"n\">s</span><span
  class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">():</span>\n<span
  class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span
  class=\"n\">foo</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
  <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"k\">if</span>
  <span class=\"n\">s</span><span class=\"o\">.</span><span class=\"n\">all</span><span
  class=\"p\">():</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>     <span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p><strong>I thought this was about <code>and</code>
  and <code>&amp;</code>...</strong></p>\n<p>Right, so recall that <code>and</code>
  is a lazy boolean evaluation (ie. it evaluates the 'truth value' an object) whereas
  <code>&amp;</code> does bitwise comparison.</p>\n<p>What we see then with <code>pandas</code>
  and <code>numpy</code> is that if we want to do logical comparisons, we need to
  do them bitwise, ie. use <code>&amp;</code>.</p>\n<p>Keep in mind though that the
  data types make a big deal - we can't use <code>&amp;</code> with strings  because
  the bitwise operation isn't supported, for strings we need to use the boolean evaluation.</p>\n<h2
  id=\"the-original-point\">The Original Point</h2>\n<p>My main use case for this
  is finding elements in a dataframe/series based on 2 or more columns aligning row
  values...</p>\n<p>Say I have a dataframe like this:\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">df</span>\n\n   <span class=\"n\">s</span>
  <span class=\"n\">s2</span>   <span class=\"n\">s3</span>\n<span class=\"mi\">0</span>
  \ <span class=\"mi\">1</span>  <span class=\"mi\">0</span>  <span class=\"n\">foo</span>\n<span
  class=\"mi\">1</span>  <span class=\"mi\">1</span>  <span class=\"n\">a</span>  <span
  class=\"n\">bar</span>\n<span class=\"mi\">2</span>  <span class=\"mi\">1</span>
  \ <span class=\"n\">b</span>  <span class=\"n\">baz</span>\n<span class=\"mi\">3</span>
  \ <span class=\"mi\">2</span>  <span class=\"n\">a</span>  <span class=\"n\">fee</span>\n<span
  class=\"mi\">4</span>  <span class=\"mi\">2</span>  <span class=\"mi\">0</span>
  \  <span class=\"n\">fi</span>\n</code></pre></div></p>\n<p>Example use case is
  I want to get the values in <code>s3</code> where <code>s</code> is 1 and <code>s2</code>
  is 'a'. ie. I'm just after <code>bar</code> for now...</p>\n<p>Up until now I've
  always just tried <code>df.s3[(df.s == 1) and (df.s2 == \"a\")]</code> the first
  time and every single time I've gotten this error that I just haven't ever fully
  understood:</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"ne\">ValueError</span><span
  class=\"p\">:</span> <span class=\"n\">The</span> <span class=\"n\">truth</span>
  <span class=\"n\">value</span> <span class=\"n\">of</span> <span class=\"n\">a</span>
  <span class=\"n\">Series</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
  class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
  class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">,</span> <span
  class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">bool</span><span
  class=\"p\">(),</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">item</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
  class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
  class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">all</span><span class=\"p\">()</span><span class=\"o\">.</span>\n</code></pre></div>\n<p>But
  after this deep dive I think I've grasped that <code>and</code> doesn't actually
  do what I want here, and in order to do the bitwise comparision I need to use <code>&amp;</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span> <span
  class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s3</span><span
  class=\"p\">[(</span><span class=\"n\">df</span><span class=\"o\">.</span><span
  class=\"n\">s</span> <span class=\"o\">==</span> <span class=\"mi\">1</span><span
  class=\"p\">)</span> <span class=\"o\">&amp;</span> <span class=\"p\">(</span><span
  class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s2</span> <span
  class=\"o\">==</span> <span class=\"s2\">&quot;a&quot;</span><span class=\"p\">)]</span>\n\n<span
  class=\"mi\">1</span>    <span class=\"n\">bar</span>\n<span class=\"n\">Name</span><span
  class=\"p\">:</span> <span class=\"n\">s3</span><span class=\"p\">,</span> <span
  class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n</code></pre></div>\n<h2
  id=\"end\">End</h2>\n<p>Hopefully this set of ramblings brings some clarity to <code>and</code>
  and <code>&amp;</code> and you can Google one less error in the future in your logical
  comparison workflows \U0001F604</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/typeddict'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Typeddict</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/file-length'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>File-Length</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/And-vs-ampersand.png
date: 2022-04-06
datetime: 2022-04-06 00:00:00+00:00
description: I often struggle to remember the correct way to do  I remember learning
  long long ago that  Python  However we can use  Here If we compare  Let bool(my_list)
  So
edit_link: https://github.com/edit/main/pages/blog/and-vs-&.md
html: "<p>I often struggle to remember the correct way to do <code>and</code> type
  comparisons when working in pandas.</p>\n<p>I remember learning long long ago that
  <code>and</code> and <code>&amp;</code> are different, the former being lazy boolean
  evaluation whereas the latter is a bitwise operation.</p>\n<p><strong>I learned
  a lot from <a href=\"https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump\">this
  SO post</a></strong></p>\n<h2 id=\"lists\">Lists</h2>\n<p>Python <code>list</code>
  objects can contain unlike elements - ie. <code>[True, 'foo', 1, '1', [1,2,3]]</code>
  is a valid list with booleans, strings, integers, and another list.\nBecause of
  this, we can't use <code>&amp;</code> to compare two lists since they can't be combined
  in a consistent and meaningful way.</p>\n<p>However we can use <code>and</code>
  since it doesn't do bitwise operations, it just evaluates the boolean value of the
  list (basically if it's non-empty then <code>bool(my_list)</code> evaluates to <code>True</code>)</p>\n<p>Here's
  an example:</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">my_list</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
  class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;2&quot;</span><span
  class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">,</span>
  <span class=\"p\">[</span><span class=\"kc\">True</span><span class=\"p\">],</span>
  <span class=\"kc\">False</span><span class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"nb\">bool</span><span class=\"p\">(</span><span class=\"n\">my_list</span><span
  class=\"p\">)</span>\n<span class=\"kc\">True</span>\n</code></pre></div>\n<p>If
  we compare <code>my_list</code> with <code>another_list</code> using <code>and</code>
  then the comparision will go:</p>\n<div class=\"highlight\"><pre><span></span><code>if
  bool(my_list):\n    if bool(another_list):\n       &lt;operation&gt; \n    else:\n
  \      break\n</code></pre></div>\n<p>Let's see another example:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">another_list</span> <span class=\"o\">=</span>
  <span class=\"p\">[</span><span class=\"kc\">False</span><span class=\"p\">,</span>
  <span class=\"kc\">False</span><span class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">my_list</span> <span class=\"ow\">and</span> <span class=\"n\">another_list</span>\n<span
  class=\"p\">[</span><span class=\"kc\">False</span><span class=\"p\">,</span> <span
  class=\"kc\">False</span><span class=\"p\">]</span>\n</code></pre></div>\n<p><code>bool(my_list)</code>
  evaluated to <code>True</code>, and <code>bool(another_list)</code> <em>also</em>
  evaluated to <code>True</code> even though it's full of <code>False</code> values
  because the object is non-empty.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"k\">if</span> <span class=\"n\">my_list</span>
  <span class=\"ow\">and</span> <span class=\"n\">another_list</span><span class=\"p\">:</span>\n<span
  class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span
  class=\"n\">foo</span>\n</code></pre></div>\n<p>So using <code>and</code> in this
  case results in a <code>True</code> conditional, so the <code>print</code> statement
  is executed.</p>\n<p>Feels kind of counter-intuitive at first glance, to me anyways...</p>\n<p>However,
  we can't use <code>&amp;</code> because there isn't a meaningful to do bitwise operations
  over these two lists:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">my_list</span> <span class=\"o\">&amp;</span>
  <span class=\"n\">another_list</span>\n<span class=\"err\">╭───────────────────────────────</span>
  <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
  <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
  class=\"p\">)</span> <span class=\"err\">────────────────────────────────╮</span>\n<span
  class=\"err\">│</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
  class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
  class=\"mi\">19</span><span class=\"o\">-</span><span class=\"n\">a2a16cebb3da</span><span
  class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
  class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">cell</span>
  <span class=\"n\">line</span><span class=\"p\">:</span> <span class=\"mi\">1</span><span
  class=\"o\">&gt;</span>                                              <span class=\"err\">│</span>\n<span
  class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"ne\">TypeError</span><span class=\"p\">:</span> <span class=\"n\">unsupported</span>
  <span class=\"n\">operand</span> <span class=\"nb\">type</span><span class=\"p\">(</span><span
  class=\"n\">s</span><span class=\"p\">)</span> <span class=\"k\">for</span> <span
  class=\"o\">&amp;</span><span class=\"p\">:</span> <span class=\"s1\">&#39;list&#39;</span>
  <span class=\"ow\">and</span> <span class=\"s1\">&#39;list&#39;</span>\n</code></pre></div>\n<h2
  id=\"numpy\">Numpy</h2>\n<p><code>numpy</code> arrays are special and they have
  a lot of fancy vectorization utilities built-in which make them great and fast for
  mathematical operations but now our logical comparisons need to be handled with
  a different kind of care.</p>\n<p>First thing though - without some trickery they
  do not hold mixed data types like a <code>list</code> does (necessary, I think,
  for the vectorized optimization that numpy is built on top of)</p>\n<p>With that
  out of the way here's the main thing for this post, we can't just evaluate the <code>bool</code>
  of an array - numpy says no no no.</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">arr</span> <span class=\"o\">=</span> <span
  class=\"n\">np</span><span class=\"o\">.</span><span class=\"n\">array</span><span
  class=\"p\">([</span><span class=\"s2\">&quot;1&quot;</span><span class=\"p\">,</span>
  <span class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"kc\">True</span><span
  class=\"p\">,</span> <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">arr</span>\n<span class=\"n\">array</span><span
  class=\"p\">([</span><span class=\"s1\">&#39;1&#39;</span><span class=\"p\">,</span>
  <span class=\"s1\">&#39;2&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;True&#39;</span><span
  class=\"p\">,</span> <span class=\"s1\">&#39;False&#39;</span><span class=\"p\">],</span>
  <span class=\"n\">dtype</span><span class=\"o\">=</span><span class=\"s1\">&#39;&lt;U21&#39;</span><span
  class=\"p\">)</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
  <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"nb\">bool</span><span
  class=\"p\">(</span><span class=\"n\">arr</span><span class=\"p\">)</span>\n<span
  class=\"err\">╭───────────────────────────────</span> <span class=\"n\">Traceback</span>
  <span class=\"p\">(</span><span class=\"n\">most</span> <span class=\"n\">recent</span>
  <span class=\"n\">call</span> <span class=\"n\">last</span><span class=\"p\">)</span>
  <span class=\"err\">────────────────────────────────╮</span>\n<span class=\"err\">│</span>
  <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span class=\"o\">-</span><span
  class=\"nb\">input</span><span class=\"o\">-</span><span class=\"mi\">25</span><span
  class=\"o\">-</span><span class=\"mf\">4e8</span><span class=\"n\">c5dd85b93</span><span
  class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
  class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">cell</span>
  <span class=\"n\">line</span><span class=\"p\">:</span> <span class=\"mi\">1</span><span
  class=\"o\">&gt;</span>                                              <span class=\"err\">│</span>\n<span
  class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
  <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
  <span class=\"n\">an</span> <span class=\"n\">array</span> <span class=\"k\">with</span>
  <span class=\"n\">more</span> <span class=\"n\">than</span> <span class=\"n\">one</span>
  <span class=\"n\">element</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
  class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
  class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
  class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">all</span><span class=\"p\">()</span>\n</code></pre></div>\n<blockquote>\n<p>This
  means that using <code>and</code> with <code>numpy</code> arrays doesn't really
  make sense because we probably care about the truth value of each element (bitwise),
  not the truth value of the array.</p>\n</blockquote>\n<p>Notice that when I print
  <code>arr</code> all the elements are a string - and the <code>dtype</code> is <code>&lt;U21</code>
  for all elements.</p>\n<p>This is not how I instantiated the array so be aware of
  that behavior with numpy.</p>\n<blockquote>\n<p><code>&lt;U21</code> is a dtype
  expressing the values are 'Little Endian', Unicode, 12 characters. See <a href=\"https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types\">here</a>
  for docs for docs</p>\n</blockquote>\n<p>So for logical comparisions we should look
  at the error message then...\nOur handy error message says to try <code>any</code>
  or <code>all</code></p>\n<p>Because the datatypes in this example are basically
  strings, using <code>arr.any()</code> will result in an error that I do not fully
  understand, but <code>any(arr)</code> and <code>all(arr)</code> work...</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span> <span
  class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"k\">if</span> <span class=\"n\">arr</span><span class=\"o\">.</span><span
  class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
  class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"err\">╭───────────────────────────────</span>
  <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
  <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
  class=\"p\">)</span> <span class=\"err\">────────────────────────────────╮</span>\n<span
  class=\"err\">│</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
  class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
  class=\"mi\">48</span><span class=\"o\">-</span><span class=\"mi\">25</span><span
  class=\"n\">ecac52db96</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
  class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
  class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
  <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
  class=\"err\">│</span>\n<span class=\"err\">│</span> <span class=\"o\">/</span><span
  class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
  class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
  class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
  class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
  class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
  class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
  class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
  class=\"n\">numpy</span><span class=\"o\">/</span><span class=\"n\">core</span><span
  class=\"o\">/</span><span class=\"n\">_methods</span><span class=\"o\">.</span><span
  class=\"n\">p</span> <span class=\"err\">│</span>\n<span class=\"err\">│</span>
  <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">57</span>
  <span class=\"ow\">in</span> <span class=\"n\">_any</span>                                                                                     <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>                                                                                                  <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">54</span>
  <span class=\"k\">def</span> <span class=\"nf\">_any</span><span class=\"p\">(</span><span
  class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
  class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
  class=\"n\">dtype</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
  class=\"p\">,</span> <span class=\"n\">out</span><span class=\"o\">=</span><span
  class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
  class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span> <span
  class=\"o\">*</span><span class=\"p\">,</span> <span class=\"n\">where</span><span
  class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">):</span>               <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">55</span>
  <span class=\"err\">│</span>   <span class=\"c1\"># Parsing keyword arguments is
  currently fairly slow, so avoid it for now              │</span>\n<span class=\"err\">│</span>
  \   <span class=\"mi\">56</span> <span class=\"err\">│</span>   <span class=\"k\">if</span>
  <span class=\"n\">where</span> <span class=\"ow\">is</span> <span class=\"kc\">True</span><span
  class=\"p\">:</span>                                                                      <span
  class=\"err\">│</span>\n<span class=\"err\">│</span> <span class=\"err\">❱</span>
  \ <span class=\"mi\">57</span> <span class=\"err\">│</span>   <span class=\"err\">│</span>
  \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
  class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
  class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span> <span
  class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
  class=\"p\">)</span>                                      <span class=\"err\">│</span>\n<span
  class=\"err\">│</span>    <span class=\"mi\">58</span> <span class=\"err\">│</span>
  \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
  class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
  class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span> <span
  class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
  class=\"p\">,</span> <span class=\"n\">where</span><span class=\"o\">=</span><span
  class=\"n\">where</span><span class=\"p\">)</span>                             <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">59</span>
  \                                                                                           <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">60</span>
  <span class=\"k\">def</span> <span class=\"nf\">_all</span><span class=\"p\">(</span><span
  class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
  class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
  class=\"n\">dtype</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
  class=\"p\">,</span> <span class=\"n\">out</span><span class=\"o\">=</span><span
  class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
  class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span> <span
  class=\"o\">*</span><span class=\"p\">,</span> <span class=\"n\">where</span><span
  class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">):</span>               <span
  class=\"err\">│</span>\n<span class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"n\">UFuncTypeError</span><span class=\"p\">:</span> <span class=\"n\">ufunc</span>
  <span class=\"s1\">&#39;logical_or&#39;</span> <span class=\"n\">did</span> <span
  class=\"ow\">not</span> <span class=\"n\">contain</span> <span class=\"n\">a</span>
  <span class=\"n\">loop</span> <span class=\"k\">with</span> <span class=\"n\">signature</span>
  <span class=\"n\">matching</span> <span class=\"n\">types</span> <span class=\"p\">(</span><span
  class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"o\">&lt;</span><span
  class=\"k\">class</span> <span class=\"err\">&#39;</span><span class=\"nc\">numpy</span><span
  class=\"o\">.</span><span class=\"n\">dtype</span><span class=\"p\">[</span><span
  class=\"n\">str_</span><span class=\"p\">]</span><span class=\"s1\">&#39;&gt;) -&gt;
  None</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span
  class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n\n<span class=\"err\">❯</span> <span class=\"k\">if</span>
  <span class=\"nb\">all</span><span class=\"p\">(</span><span class=\"n\">arr</span><span
  class=\"p\">):</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>     <span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span
  class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"k\">if</span> <span class=\"nb\">any</span><span class=\"p\">(</span><span
  class=\"n\">arr</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
  class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n</code></pre></div>\n<p>Let's
  change the example to just use integers and see what happens:</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">arr2</span> <span class=\"o\">=</span>
  <span class=\"n\">np</span><span class=\"o\">.</span><span class=\"n\">array</span><span
  class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"kc\">True</span><span class=\"p\">,</span> <span class=\"kc\">False</span><span
  class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
  <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"n\">arr2</span>\n<span
  class=\"n\">array</span><span class=\"p\">([</span><span class=\"mi\">1</span><span
  class=\"p\">,</span> <span class=\"mi\">1</span><span class=\"p\">,</span> <span
  class=\"mi\">0</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"k\">if</span> <span class=\"n\">arr2</span><span class=\"o\">.</span><span
  class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
  class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
  class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"k\">if</span> <span class=\"n\">arr2</span><span
  class=\"o\">.</span><span class=\"n\">all</span><span class=\"p\">():</span>\n<span
  class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n</code></pre></div>\n<p>Ah,
  now some sanity...\nFirst, the booleans are stored as integers, which based on this
  discussion makes sense.\nNext we check if <code>any</code> values (this is a bitwise
  operation) are <code>True</code>, which we see they are so the conditional evaluates
  to <code>True</code>.\nHowver, if we check that <code>all</code> values are <code>True</code>
  we see they aren't, the last value is <code>False</code> or <code>0</code> so the
  conditional fails.</p>\n<p>This is a different way to evaluate logical conditions
  than with lists and it's because of the special nature of numpy arrays that allows
  them to be compared bitwise but on the flip side, there isn't a meaningful way to
  evaluate the <code>truth value</code> of an array.</p>\n<h2 id=\"pandas\">Pandas</h2>\n<p>Now
  for <code>pandas</code>, which under the hood is a lot of <code>numpy</code> but
  not fully. \n<code>pandas.Series</code> objects can hold mixed data types like lists,
  however to logically evaluate truth values we have to treat them like numpy arrays.</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span> <span
  class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">s</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
  class=\"o\">.</span><span class=\"n\">Series</span><span class=\"p\">([</span><span
  class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span
  class=\"p\">,</span> <span class=\"kc\">True</span><span class=\"p\">,</span> <span
  class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">s</span>\n\n<span class=\"mi\">0</span>        <span class=\"mi\">1</span>\n<span
  class=\"mi\">1</span>      <span class=\"n\">foo</span>\n<span class=\"mi\">2</span>
  \    <span class=\"kc\">True</span>\n<span class=\"mi\">3</span>    <span class=\"kc\">False</span>\n<span
  class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n\n<span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"nb\">bool</span><span class=\"p\">(</span><span
  class=\"n\">s</span><span class=\"p\">)</span>\n<span class=\"err\">╭───────────────────────────────</span>
  <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
  <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
  class=\"p\">)</span> <span class=\"err\">────────────────────────────────╮</span>\n<span
  class=\"err\">│</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
  class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
  class=\"mi\">60</span><span class=\"o\">-</span><span class=\"mf\">68e48</span><span
  class=\"n\">e81da14</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
  class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
  class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
  <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
  class=\"err\">│</span>\n<span class=\"err\">│</span> <span class=\"o\">/</span><span
  class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
  class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
  class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
  class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
  class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
  class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
  class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
  class=\"n\">pandas</span><span class=\"o\">/</span><span class=\"n\">core</span><span
  class=\"o\">/</span><span class=\"n\">generic</span><span class=\"o\">.</span><span
  class=\"n\">p</span> <span class=\"err\">│</span>\n<span class=\"err\">│</span>
  <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">1527</span>
  <span class=\"ow\">in</span> <span class=\"n\">__nonzero__</span>                                                                            <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>                                                                                                  <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">1524</span>
  <span class=\"err\">│</span>                                                                                        <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">1525</span>
  <span class=\"err\">│</span>   <span class=\"nd\">@final</span>                                                                               <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">1526</span>
  <span class=\"err\">│</span>   <span class=\"k\">def</span> <span class=\"nf\">__nonzero__</span><span
  class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>                                                               <span
  class=\"err\">│</span>\n<span class=\"err\">│</span> <span class=\"err\">❱</span>
  \ <span class=\"mi\">1527</span> <span class=\"err\">│</span>   <span class=\"err\">│</span>
  \  <span class=\"k\">raise</span> <span class=\"ne\">ValueError</span><span class=\"p\">(</span>
  \                                                               <span class=\"err\">│</span>\n<span
  class=\"err\">│</span>    <span class=\"mi\">1528</span> <span class=\"err\">│</span>
  \  <span class=\"err\">│</span>   <span class=\"err\">│</span>   <span class=\"sa\">f</span><span
  class=\"s2\">&quot;The truth value of a </span><span class=\"si\">{</span><span
  class=\"nb\">type</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
  class=\"p\">)</span><span class=\"o\">.</span><span class=\"vm\">__name__</span><span
  class=\"si\">}</span><span class=\"s2\"> is ambiguous. &quot;</span>                 <span
  class=\"err\">│</span>\n<span class=\"err\">│</span>    <span class=\"mi\">1529</span>
  <span class=\"err\">│</span>   <span class=\"err\">│</span>   <span class=\"err\">│</span>
  \  <span class=\"s2\">&quot;Use a.empty, a.bool(), a.item(), a.any() or a.all().&quot;</span>
  \                      <span class=\"err\">│</span>\n<span class=\"err\">│</span>
  \   <span class=\"mi\">1530</span> <span class=\"err\">│</span>   <span class=\"err\">│</span>
  \  <span class=\"p\">)</span>                                                                                <span
  class=\"err\">│</span>\n<span class=\"err\">╰──────────────────────────────────────────────────────────────────────────────────────────────────╯</span>\n<span
  class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
  <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
  <span class=\"n\">a</span> <span class=\"n\">Series</span> <span class=\"ow\">is</span>
  <span class=\"n\">ambiguous</span><span class=\"o\">.</span> <span class=\"n\">Use</span>
  <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">empty</span><span
  class=\"p\">,</span> <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">bool</span><span
  class=\"p\">(),</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">item</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
  class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
  class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">all</span><span class=\"p\">()</span><span class=\"o\">.</span>\n</code></pre></div>\n<p>Just
  like with numpy, we can't evaluate the truth value of the series in a meaningful
  way, but bitwise operations make perfect sense...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"err\">❯</span> <span class=\"k\">if</span> <span class=\"n\">s</span><span
  class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">():</span>\n<span
  class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span
  class=\"n\">foo</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
  <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"k\">if</span>
  <span class=\"n\">s</span><span class=\"o\">.</span><span class=\"n\">all</span><span
  class=\"p\">():</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>     <span
  class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p><strong>I thought this was about <code>and</code>
  and <code>&amp;</code>...</strong></p>\n<p>Right, so recall that <code>and</code>
  is a lazy boolean evaluation (ie. it evaluates the 'truth value' an object) whereas
  <code>&amp;</code> does bitwise comparison.</p>\n<p>What we see then with <code>pandas</code>
  and <code>numpy</code> is that if we want to do logical comparisons, we need to
  do them bitwise, ie. use <code>&amp;</code>.</p>\n<p>Keep in mind though that the
  data types make a big deal - we can't use <code>&amp;</code> with strings  because
  the bitwise operation isn't supported, for strings we need to use the boolean evaluation.</p>\n<h2
  id=\"the-original-point\">The Original Point</h2>\n<p>My main use case for this
  is finding elements in a dataframe/series based on 2 or more columns aligning row
  values...</p>\n<p>Say I have a dataframe like this:\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
  \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">df</span>\n\n   <span class=\"n\">s</span>
  <span class=\"n\">s2</span>   <span class=\"n\">s3</span>\n<span class=\"mi\">0</span>
  \ <span class=\"mi\">1</span>  <span class=\"mi\">0</span>  <span class=\"n\">foo</span>\n<span
  class=\"mi\">1</span>  <span class=\"mi\">1</span>  <span class=\"n\">a</span>  <span
  class=\"n\">bar</span>\n<span class=\"mi\">2</span>  <span class=\"mi\">1</span>
  \ <span class=\"n\">b</span>  <span class=\"n\">baz</span>\n<span class=\"mi\">3</span>
  \ <span class=\"mi\">2</span>  <span class=\"n\">a</span>  <span class=\"n\">fee</span>\n<span
  class=\"mi\">4</span>  <span class=\"mi\">2</span>  <span class=\"mi\">0</span>
  \  <span class=\"n\">fi</span>\n</code></pre></div></p>\n<p>Example use case is
  I want to get the values in <code>s3</code> where <code>s</code> is 1 and <code>s2</code>
  is 'a'. ie. I'm just after <code>bar</code> for now...</p>\n<p>Up until now I've
  always just tried <code>df.s3[(df.s == 1) and (df.s2 == \"a\")]</code> the first
  time and every single time I've gotten this error that I just haven't ever fully
  understood:</p>\n<div class=\"highlight\"><pre><span></span><code><span class=\"ne\">ValueError</span><span
  class=\"p\">:</span> <span class=\"n\">The</span> <span class=\"n\">truth</span>
  <span class=\"n\">value</span> <span class=\"n\">of</span> <span class=\"n\">a</span>
  <span class=\"n\">Series</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
  class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
  class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">,</span> <span
  class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">bool</span><span
  class=\"p\">(),</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">item</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
  class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
  class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
  class=\"n\">all</span><span class=\"p\">()</span><span class=\"o\">.</span>\n</code></pre></div>\n<p>But
  after this deep dive I think I've grasped that <code>and</code> doesn't actually
  do what I want here, and in order to do the bitwise comparision I need to use <code>&amp;</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">sandbox</span> <span
  class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
  class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s3</span><span
  class=\"p\">[(</span><span class=\"n\">df</span><span class=\"o\">.</span><span
  class=\"n\">s</span> <span class=\"o\">==</span> <span class=\"mi\">1</span><span
  class=\"p\">)</span> <span class=\"o\">&amp;</span> <span class=\"p\">(</span><span
  class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s2</span> <span
  class=\"o\">==</span> <span class=\"s2\">&quot;a&quot;</span><span class=\"p\">)]</span>\n\n<span
  class=\"mi\">1</span>    <span class=\"n\">bar</span>\n<span class=\"n\">Name</span><span
  class=\"p\">:</span> <span class=\"n\">s3</span><span class=\"p\">,</span> <span
  class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n</code></pre></div>\n<h2
  id=\"end\">End</h2>\n<p>Hopefully this set of ramblings brings some clarity to <code>and</code>
  and <code>&amp;</code> and you can Google one less error in the future in your logical
  comparison workflows \U0001F604</p>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
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
  \   </style>\n\n    <a class='prev' href='/typeddict'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Typeddict</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/file-length'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>File-Length</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: 'I often struggle to remember the correct way to do  I remember
  learning long long ago that  Python  However we can use  Here If we compare  Let
  bool(my_list) So using  Feels kind of counter-intuitive at first glance, to me anyways...
  However, we can '
now: 2024-06-26 16:50:21.524196
path: pages/blog/and-vs-&.md
published: true
slug: and-vs
super_description: I often struggle to remember the correct way to do  I remember
  learning long long ago that  Python  However we can use  Here If we compare  Let
  bool(my_list) So using  Feels kind of counter-intuitive at first glance, to me anyways...
  However, we can numpy First thing though - without some trickery they do not hold
  mixed data types like a  With that out of the way here This means that using  Notice
  that when I print  This is not how I instantiated the array so be aware of that
  behavior with numpy
tags:
- python
- tech
templateKey: blog-post
title: And-vs-&
today: 2024-06-26
---

I often struggle to remember the correct way to do `and` type comparisons when working in pandas.

I remember learning long long ago that `and` and `&` are different, the former being lazy boolean evaluation whereas the latter is a bitwise operation.

__I learned a lot from [this SO post](https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump)__

## Lists 

Python `list` objects can contain unlike elements - ie. `[True, 'foo', 1, '1', [1,2,3]]` is a valid list with booleans, strings, integers, and another list.
Because of this, we can't use `&` to compare two lists since they can't be combined in a consistent and meaningful way.

However we can use `and` since it doesn't do bitwise operations, it just evaluates the boolean value of the list (basically if it's non-empty then `bool(my_list)` evaluates to `True`)

Here's an example:

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ my_list = [1, "2", "foo", [True], False]

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ bool(my_list)
True
```


If we compare `my_list` with `another_list` using `and` then the comparision will go:

```
if bool(my_list):
    if bool(another_list):
       <operation> 
    else:
       break
```

Let's see another example:

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ another_list = [False, False]

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ my_list and another_list
[False, False]
```


`bool(my_list)` evaluated to `True`, and `bool(another_list)` _also_ evaluated to `True` even though it's full of `False` values because the object is non-empty.


```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if my_list and another_list:
...:     print("foo")
foo
```

So using `and` in this case results in a `True` conditional, so the `print` statement is executed.

Feels kind of counter-intuitive at first glance, to me anyways...

However, we can't use `&` because there isn't a meaningful to do bitwise operations over these two lists:

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ my_list & another_list
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-19-a2a16cebb3da>:1 in <cell line: 1>                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
TypeError: unsupported operand type(s) for &: 'list' and 'list'

```

## Numpy

`numpy` arrays are special and they have a lot of fancy vectorization utilities built-in which make them great and fast for mathematical operations but now our logical comparisons need to be handled with a different kind of care.

First thing though - without some trickery they do not hold mixed data types like a `list` does (necessary, I think, for the vectorized optimization that numpy is built on top of)

With that out of the way here's the main thing for this post, we can't just evaluate the `bool` of an array - numpy says no no no.

```python

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ arr = np.array(["1", 2, True, False])

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ arr
array(['1', '2', 'True', 'False'], dtype='<U21')

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ bool(arr)
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-25-4e8c5dd85b93>:1 in <cell line: 1>                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()

```

> This means that using `and` with `numpy` arrays doesn't really make sense because we probably care about the truth value of each element (bitwise), not the truth value of the array.

Notice that when I print `arr` all the elements are a string - and the `dtype` is `<U21` for all elements.

This is not how I instantiated the array so be aware of that behavior with numpy.

> `<U21` is a dtype expressing the values are 'Little Endian', Unicode, 12 characters. See [here](https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types) for docs for docs

So for logical comparisions we should look at the error message then...
Our handy error message says to try `any` or `all`

Because the datatypes in this example are basically strings, using `arr.any()` will result in an error that I do not fully understand, but `any(arr)` and `all(arr)` work...

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if arr.any():
...:     print("foo")
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-48-25ecac52db96>:1 in <cell line: 1>                                              │
│ /home/u_paynen3/personal/sandbox/.venv/sandbox/lib/python3.8/site-packages/numpy/core/_methods.p │
│ y:57 in _any                                                                                     │
│                                                                                                  │
│    54 def _any(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True):               │
│    55 │   # Parsing keyword arguments is currently fairly slow, so avoid it for now              │
│    56 │   if where is True:                                                                      │
│ ❱  57 │   │   return umr_any(a, axis, dtype, out, keepdims)                                      │
│    58 │   return umr_any(a, axis, dtype, out, keepdims, where=where)                             │
│    59                                                                                            │
│    60 def _all(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True):               │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
UFuncTypeError: ufunc 'logical_or' did not contain a loop with signature matching types (None, <class 'numpy.dtype[str_]'>) -> None

sandbox NO VCS  via 3.8.11(sandbox) ipython

❯ if all(arr):
...:     print("foo")
foo

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if any(arr):
...:     print("foo")
foo
```

Let's change the example to just use integers and see what happens:

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ arr2 = np.array([1, True, False])

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ arr2
array([1, 1, 0])

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if arr2.any():
...:     print("foo")
foo

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if arr2.all():
...:     print("foo")

```

Ah, now some sanity...
First, the booleans are stored as integers, which based on this discussion makes sense.
Next we check if `any` values (this is a bitwise operation) are `True`, which we see they are so the conditional evaluates to `True`.
Howver, if we check that `all` values are `True` we see they aren't, the last value is `False` or `0` so the conditional fails.

This is a different way to evaluate logical conditions than with lists and it's because of the special nature of numpy arrays that allows them to be compared bitwise but on the flip side, there isn't a meaningful way to evaluate the `truth value` of an array.


## Pandas

Now for `pandas`, which under the hood is a lot of `numpy` but not fully. 
`pandas.Series` objects can hold mixed data types like lists, however to logically evaluate truth values we have to treat them like numpy arrays.

```python

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ s = pd.Series([1, "foo", True, False])

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ s

0        1
1      foo
2     True
3    False
dtype: object

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ bool(s)
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-60-68e48e81da14>:1 in <cell line: 1>                                              │
│ /home/u_paynen3/personal/sandbox/.venv/sandbox/lib/python3.8/site-packages/pandas/core/generic.p │
│ y:1527 in __nonzero__                                                                            │
│                                                                                                  │
│    1524 │                                                                                        │
│    1525 │   @final                                                                               │
│    1526 │   def __nonzero__(self):                                                               │
│ ❱  1527 │   │   raise ValueError(                                                                │
│    1528 │   │   │   f"The truth value of a {type(self).__name__} is ambiguous. "                 │
│    1529 │   │   │   "Use a.empty, a.bool(), a.item(), a.any() or a.all()."                       │
│    1530 │   │   )                                                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().

```

Just like with numpy, we can't evaluate the truth value of the series in a meaningful way, but bitwise operations make perfect sense...

```python

❯ if s.any():
...:     print("foo")
foo

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if s.all():
...:     print("foo")

```

__I thought this was about `and` and `&`...__

Right, so recall that `and` is a lazy boolean evaluation (ie. it evaluates the 'truth value' an object) whereas `&` does bitwise comparison.

What we see then with `pandas` and `numpy` is that if we want to do logical comparisons, we need to do them bitwise, ie. use `&`.

Keep in mind though that the data types make a big deal - we can't use `&` with strings  because the bitwise operation isn't supported, for strings we need to use the boolean evaluation.


## The Original Point

My main use case for this is finding elements in a dataframe/series based on 2 or more columns aligning row values...


Say I have a dataframe like this:
```python

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ df

   s s2   s3
0  1  0  foo
1  1  a  bar
2  1  b  baz
3  2  a  fee
4  2  0   fi
```

Example use case is I want to get the values in `s3` where `s` is 1 and `s2` is 'a'. ie. I'm just after `bar` for now...

Up until now I've always just tried `df.s3[(df.s == 1) and (df.s2 == "a")]` the first time and every single time I've gotten this error that I just haven't ever fully understood:

```python
ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().
```

But after this deep dive I think I've grasped that `and` doesn't actually do what I want here, and in order to do the bitwise comparision I need to use `&`

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ df.s3[(df.s == 1) & (df.s2 == "a")]

1    bar
Name: s3, dtype: object
```

## End

Hopefully this set of ramblings brings some clarity to `and` and `&` and you can Google one less error in the future in your logical comparison workflows 😄
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
    
    <a class='prev' href='/typeddict'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Typeddict</p>
        </div>
    </a>
    
    <a class='next' href='/file-length'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>File-Length</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>