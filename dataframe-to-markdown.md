---
article_html: "<h1 id=\"pandas\">Pandas</h1>\n<p><code>pandas.DataFrame</code>s are
  pretty sweet data structures in Python.</p>\n<p>I do a lot of work with tabular
  data and one thing I have incorporated into some of that work is automatic data
  summary reports by throwing the first few, or several relevant, rows of a dataframe
  at a point in a pipeline into a markdown file.</p>\n<p>Pandas has a method on DataFrames
  that makes this 100% trivial!</p>\n<h1 id=\"the-method\">The Method</h1>\n<p>Say
  we have a dataframe, <code>df</code>... then it's literally just: <code>df.to_markdown()</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"err\">❯</span> <span class=\"n\">df</span><span
  class=\"o\">.</span><span class=\"n\">head</span><span class=\"p\">()</span>\n\n
  \         <span class=\"n\">Unnamed</span><span class=\"p\">:</span> <span class=\"mi\">0</span>
  \  <span class=\"n\">mpg</span>  <span class=\"n\">cyl</span>   <span class=\"n\">disp</span>
  \  <span class=\"n\">hp</span>  <span class=\"n\">drat</span>     <span class=\"n\">wt</span>
  \  <span class=\"n\">qsec</span>  <span class=\"n\">vs</span>  <span class=\"n\">am</span>
  \ <span class=\"n\">gear</span>  <span class=\"n\">carb</span>\n<span class=\"mi\">0</span>
  \         <span class=\"n\">Mazda</span> <span class=\"n\">RX4</span>  <span class=\"mf\">21.0</span>
  \   <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>  <span class=\"mi\">110</span>
  \ <span class=\"mf\">3.90</span>  <span class=\"mf\">2.620</span>  <span class=\"mf\">16.46</span>
  \  <span class=\"mi\">0</span>   <span class=\"mi\">1</span>     <span class=\"mi\">4</span>
  \    <span class=\"mi\">4</span>\n<span class=\"mi\">1</span>      <span class=\"n\">Mazda</span>
  <span class=\"n\">RX4</span> <span class=\"n\">Wag</span>  <span class=\"mf\">21.0</span>
  \   <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>  <span class=\"mi\">110</span>
  \ <span class=\"mf\">3.90</span>  <span class=\"mf\">2.875</span>  <span class=\"mf\">17.02</span>
  \  <span class=\"mi\">0</span>   <span class=\"mi\">1</span>     <span class=\"mi\">4</span>
  \    <span class=\"mi\">4</span>\n<span class=\"mi\">2</span>         <span class=\"n\">Datsun</span>
  <span class=\"mi\">710</span>  <span class=\"mf\">22.8</span>    <span class=\"mi\">4</span>
  \ <span class=\"mf\">108.0</span>   <span class=\"mi\">93</span>  <span class=\"mf\">3.85</span>
  \ <span class=\"mf\">2.320</span>  <span class=\"mf\">18.61</span>   <span class=\"mi\">1</span>
  \  <span class=\"mi\">1</span>     <span class=\"mi\">4</span>     <span class=\"mi\">1</span>\n<span
  class=\"mi\">3</span>     <span class=\"n\">Hornet</span> <span class=\"mi\">4</span>
  <span class=\"n\">Drive</span>  <span class=\"mf\">21.4</span>    <span class=\"mi\">6</span>
  \ <span class=\"mf\">258.0</span>  <span class=\"mi\">110</span>  <span class=\"mf\">3.08</span>
  \ <span class=\"mf\">3.215</span>  <span class=\"mf\">19.44</span>   <span class=\"mi\">1</span>
  \  <span class=\"mi\">0</span>     <span class=\"mi\">3</span>     <span class=\"mi\">1</span>\n<span
  class=\"mi\">4</span>  <span class=\"n\">Hornet</span> <span class=\"n\">Sportabout</span>
  \ <span class=\"mf\">18.7</span>    <span class=\"mi\">8</span>  <span class=\"mf\">360.0</span>
  \ <span class=\"mi\">175</span>  <span class=\"mf\">3.15</span>  <span class=\"mf\">3.440</span>
  \ <span class=\"mf\">17.02</span>   <span class=\"mi\">0</span>   <span class=\"mi\">0</span>
  \    <span class=\"mi\">3</span>     <span class=\"mi\">2</span>\n</code></pre></div>\n<p>In
  ipython I can call the method and get a markdown table back as a string</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">mental</span><span
  class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
  class=\"n\">lake</span> <span class=\"err\"></span>  <span class=\"n\">new</span><span
  class=\"o\">-</span><span class=\"n\">posts</span> <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">mental</span><span
  class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
  class=\"n\">lake</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">df</span><span class=\"o\">.</span><span
  class=\"n\">head</span><span class=\"p\">()</span><span class=\"o\">.</span><span
  class=\"n\">to_markdown</span><span class=\"p\">()</span>\n<span class=\"s1\">&#39;|
  \   | Unnamed: 0        |   mpg |   cyl |   disp |   hp |   drat |    wt |   qsec
  |   vs |   am |   gear |   carb |</span><span class=\"se\">\\n</span><span class=\"s1\">|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  0 | Mazda RX4         |  21   |     6
  |    160 |  110 |   3.9  | 2.62  |  16.46 |    0 |    1 |      4 |      4 |</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  1 | Mazda RX4 Wag     |  21   |     6
  |    160 |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  2 | Datsun 710        |  22.8 |     4
  |    108 |   93 |   3.85 | 2.32  |  18.61 |    1 |    1 |      4 |      1 |</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  3 | Hornet 4 Drive    |  21.4 |     6
  |    258 |  110 |   3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  4 | Hornet Sportabout |  18.7 |     8
  |    360 |  175 |   3.15 | 3.44  |  17.02 |    0 |    0 |      3 |      2 |&#39;</span>\n</code></pre></div>\n<p>You
  can drop that string into a markdown file and using any reader that supports the
  rendering you'll have a nicely formated table of example data in whatever report
  you're making!</p>\n<h1 id=\"bonus-method\">Bonus method</h1>\n<p>Just like markdown,
  you can export a dataframe to html with <code>df.to_html()</code> and use that if
  it's more appropriate for your use case:</p>\n<div class=\"highlight\"><pre><span></span><code>&#39;&lt;table
  border=&quot;1&quot; class=&quot;dataframe&quot;&gt;\\n  &lt;thead&gt;\\n    &lt;tr
  style=&quot;text-align: right;&quot;&gt;\\n      &lt;th&gt;&lt;/th&gt;\\n      &lt;th&gt;Unnamed:
  0&lt;/th&gt;\\n      &lt;th&gt;mpg&lt;/th&gt;\\n      &lt;th&gt;cyl&lt;/th&gt;\\n
  \     &lt;th&gt;disp&lt;/th&gt;\\n      &lt;th&gt;hp&lt;/th&gt;\\n      &lt;th&gt;drat&lt;/th&gt;\\n
  \     &lt;th&gt;wt&lt;/th&gt;\\n      &lt;th&gt;qsec&lt;/th&gt;\\n      &lt;th&gt;vs&lt;/th&gt;\\n
  \     &lt;th&gt;am&lt;/th&gt;\\n      &lt;th&gt;gear&lt;/th&gt;\\n      &lt;th&gt;carb&lt;/th&gt;\\n
  \   &lt;/tr&gt;\\n  &lt;/thead&gt;\\n  &lt;tbody&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;0&lt;/th&gt;\\n
  \     &lt;td&gt;Mazda RX4&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
  \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
  \     &lt;td&gt;2.620&lt;/td&gt;\\n      &lt;td&gt;16.46&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
  \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;1&lt;/th&gt;\\n      &lt;td&gt;Mazda
  RX4 Wag&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
  \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
  \     &lt;td&gt;2.875&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
  \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;2&lt;/th&gt;\\n      &lt;td&gt;Datsun
  710&lt;/td&gt;\\n      &lt;td&gt;22.8&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
  \     &lt;td&gt;108.0&lt;/td&gt;\\n      &lt;td&gt;93&lt;/td&gt;\\n      &lt;td&gt;3.85&lt;/td&gt;\\n
  \     &lt;td&gt;2.320&lt;/td&gt;\\n      &lt;td&gt;18.61&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
  \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;3&lt;/th&gt;\\n      &lt;td&gt;Hornet
  4 Drive&lt;/td&gt;\\n      &lt;td&gt;21.4&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
  \     &lt;td&gt;258.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.08&lt;/td&gt;\\n
  \     &lt;td&gt;3.215&lt;/td&gt;\\n      &lt;td&gt;19.44&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
  \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;4&lt;/th&gt;\\n      &lt;td&gt;Hornet
  Sportabout&lt;/td&gt;\\n      &lt;td&gt;18.7&lt;/td&gt;\\n      &lt;td&gt;8&lt;/td&gt;\\n
  \     &lt;td&gt;360.0&lt;/td&gt;\\n      &lt;td&gt;175&lt;/td&gt;\\n      &lt;td&gt;3.15&lt;/td&gt;\\n
  \     &lt;td&gt;3.440&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
  \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;2&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n  &lt;/tbody&gt;\\n&lt;/table&gt;&#39;\n</code></pre></div>\n<p>My
  blog will render that html into a nice table! (After removing new line characters)</p>\n<table
  border=\"1\" class=\"dataframe\">  <thead>    <tr style=\"text-align: right;\">
  \     <th>Unnamed: 0</th>      <th>mpg</th>      <th>cyl</th>      <th>disp</th>
  \     <th>hp</th>      <th>drat</th>      <th>wt</th>      <th>qsec</th>      <th>vs</th>
  \     <th>am</th>      <th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>
  \   <tr>      <td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
  \     <td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>      <td>0</td>
  \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Mazda
  RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>      <td>110</td>
  \     <td>3.90</td>      <td>2.875</td>      <td>17.02</td>      <td>0</td>      <td>1</td>
  \     <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Datsun 710</td>      <td>22.8</td>
  \     <td>4</td>      <td>108.0</td>      <td>93</td>      <td>3.85</td>      <td>2.320</td>
  \     <td>18.61</td>      <td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>
  \   </tr>    <tr>      <td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>
  \     <td>258.0</td>      <td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>
  \     <td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>
  \     <td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>      <td>360.0</td>
  \     <td>175</td>      <td>3.15</td>      <td>3.440</td>      <td>17.02</td>      <td>0</td>
  \     <td>0</td>      <td>3</td>      <td>2</td>    </tr>  </tbody></table>\n<div
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
  \       </div>\n    </a>\n\n    <a class='next' href='/wish-list-with-fastapi'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Wish-List-With-Fastapi</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
cover: /static/dataframe-to-markdown.png
date: 2022-05-07
datetime: 2022-05-07 00:00:00+00:00
description: pandas.DataFrame I do a lot of work with tabular data and one thing I
  have incorporated into some of that work is automatic data summary reports by throwing
  the
edit_link: https://github.com/edit/main/pages/til/dataframe-to-markdown.md
html: "<h1 id=\"pandas\">Pandas</h1>\n<p><code>pandas.DataFrame</code>s are pretty
  sweet data structures in Python.</p>\n<p>I do a lot of work with tabular data and
  one thing I have incorporated into some of that work is automatic data summary reports
  by throwing the first few, or several relevant, rows of a dataframe at a point in
  a pipeline into a markdown file.</p>\n<p>Pandas has a method on DataFrames that
  makes this 100% trivial!</p>\n<h1 id=\"the-method\">The Method</h1>\n<p>Say we have
  a dataframe, <code>df</code>... then it's literally just: <code>df.to_markdown()</code></p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"err\">❯</span> <span class=\"n\">df</span><span
  class=\"o\">.</span><span class=\"n\">head</span><span class=\"p\">()</span>\n\n
  \         <span class=\"n\">Unnamed</span><span class=\"p\">:</span> <span class=\"mi\">0</span>
  \  <span class=\"n\">mpg</span>  <span class=\"n\">cyl</span>   <span class=\"n\">disp</span>
  \  <span class=\"n\">hp</span>  <span class=\"n\">drat</span>     <span class=\"n\">wt</span>
  \  <span class=\"n\">qsec</span>  <span class=\"n\">vs</span>  <span class=\"n\">am</span>
  \ <span class=\"n\">gear</span>  <span class=\"n\">carb</span>\n<span class=\"mi\">0</span>
  \         <span class=\"n\">Mazda</span> <span class=\"n\">RX4</span>  <span class=\"mf\">21.0</span>
  \   <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>  <span class=\"mi\">110</span>
  \ <span class=\"mf\">3.90</span>  <span class=\"mf\">2.620</span>  <span class=\"mf\">16.46</span>
  \  <span class=\"mi\">0</span>   <span class=\"mi\">1</span>     <span class=\"mi\">4</span>
  \    <span class=\"mi\">4</span>\n<span class=\"mi\">1</span>      <span class=\"n\">Mazda</span>
  <span class=\"n\">RX4</span> <span class=\"n\">Wag</span>  <span class=\"mf\">21.0</span>
  \   <span class=\"mi\">6</span>  <span class=\"mf\">160.0</span>  <span class=\"mi\">110</span>
  \ <span class=\"mf\">3.90</span>  <span class=\"mf\">2.875</span>  <span class=\"mf\">17.02</span>
  \  <span class=\"mi\">0</span>   <span class=\"mi\">1</span>     <span class=\"mi\">4</span>
  \    <span class=\"mi\">4</span>\n<span class=\"mi\">2</span>         <span class=\"n\">Datsun</span>
  <span class=\"mi\">710</span>  <span class=\"mf\">22.8</span>    <span class=\"mi\">4</span>
  \ <span class=\"mf\">108.0</span>   <span class=\"mi\">93</span>  <span class=\"mf\">3.85</span>
  \ <span class=\"mf\">2.320</span>  <span class=\"mf\">18.61</span>   <span class=\"mi\">1</span>
  \  <span class=\"mi\">1</span>     <span class=\"mi\">4</span>     <span class=\"mi\">1</span>\n<span
  class=\"mi\">3</span>     <span class=\"n\">Hornet</span> <span class=\"mi\">4</span>
  <span class=\"n\">Drive</span>  <span class=\"mf\">21.4</span>    <span class=\"mi\">6</span>
  \ <span class=\"mf\">258.0</span>  <span class=\"mi\">110</span>  <span class=\"mf\">3.08</span>
  \ <span class=\"mf\">3.215</span>  <span class=\"mf\">19.44</span>   <span class=\"mi\">1</span>
  \  <span class=\"mi\">0</span>     <span class=\"mi\">3</span>     <span class=\"mi\">1</span>\n<span
  class=\"mi\">4</span>  <span class=\"n\">Hornet</span> <span class=\"n\">Sportabout</span>
  \ <span class=\"mf\">18.7</span>    <span class=\"mi\">8</span>  <span class=\"mf\">360.0</span>
  \ <span class=\"mi\">175</span>  <span class=\"mf\">3.15</span>  <span class=\"mf\">3.440</span>
  \ <span class=\"mf\">17.02</span>   <span class=\"mi\">0</span>   <span class=\"mi\">0</span>
  \    <span class=\"mi\">3</span>     <span class=\"mi\">2</span>\n</code></pre></div>\n<p>In
  ipython I can call the method and get a markdown table back as a string</p>\n<div
  class=\"highlight\"><pre><span></span><code><span class=\"n\">mental</span><span
  class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
  class=\"n\">lake</span> <span class=\"err\"></span>  <span class=\"n\">new</span><span
  class=\"o\">-</span><span class=\"n\">posts</span> <span class=\"n\">via</span>
  <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">mental</span><span
  class=\"o\">-</span><span class=\"n\">data</span><span class=\"o\">-</span><span
  class=\"n\">lake</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">df</span><span class=\"o\">.</span><span
  class=\"n\">head</span><span class=\"p\">()</span><span class=\"o\">.</span><span
  class=\"n\">to_markdown</span><span class=\"p\">()</span>\n<span class=\"s1\">&#39;|
  \   | Unnamed: 0        |   mpg |   cyl |   disp |   hp |   drat |    wt |   qsec
  |   vs |   am |   gear |   carb |</span><span class=\"se\">\\n</span><span class=\"s1\">|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  0 | Mazda RX4         |  21   |     6
  |    160 |  110 |   3.9  | 2.62  |  16.46 |    0 |    1 |      4 |      4 |</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  1 | Mazda RX4 Wag     |  21   |     6
  |    160 |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  2 | Datsun 710        |  22.8 |     4
  |    108 |   93 |   3.85 | 2.32  |  18.61 |    1 |    1 |      4 |      1 |</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  3 | Hornet 4 Drive    |  21.4 |     6
  |    258 |  110 |   3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |</span><span
  class=\"se\">\\n</span><span class=\"s1\">|  4 | Hornet Sportabout |  18.7 |     8
  |    360 |  175 |   3.15 | 3.44  |  17.02 |    0 |    0 |      3 |      2 |&#39;</span>\n</code></pre></div>\n<p>You
  can drop that string into a markdown file and using any reader that supports the
  rendering you'll have a nicely formated table of example data in whatever report
  you're making!</p>\n<h1 id=\"bonus-method\">Bonus method</h1>\n<p>Just like markdown,
  you can export a dataframe to html with <code>df.to_html()</code> and use that if
  it's more appropriate for your use case:</p>\n<div class=\"highlight\"><pre><span></span><code>&#39;&lt;table
  border=&quot;1&quot; class=&quot;dataframe&quot;&gt;\\n  &lt;thead&gt;\\n    &lt;tr
  style=&quot;text-align: right;&quot;&gt;\\n      &lt;th&gt;&lt;/th&gt;\\n      &lt;th&gt;Unnamed:
  0&lt;/th&gt;\\n      &lt;th&gt;mpg&lt;/th&gt;\\n      &lt;th&gt;cyl&lt;/th&gt;\\n
  \     &lt;th&gt;disp&lt;/th&gt;\\n      &lt;th&gt;hp&lt;/th&gt;\\n      &lt;th&gt;drat&lt;/th&gt;\\n
  \     &lt;th&gt;wt&lt;/th&gt;\\n      &lt;th&gt;qsec&lt;/th&gt;\\n      &lt;th&gt;vs&lt;/th&gt;\\n
  \     &lt;th&gt;am&lt;/th&gt;\\n      &lt;th&gt;gear&lt;/th&gt;\\n      &lt;th&gt;carb&lt;/th&gt;\\n
  \   &lt;/tr&gt;\\n  &lt;/thead&gt;\\n  &lt;tbody&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;0&lt;/th&gt;\\n
  \     &lt;td&gt;Mazda RX4&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
  \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
  \     &lt;td&gt;2.620&lt;/td&gt;\\n      &lt;td&gt;16.46&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
  \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;1&lt;/th&gt;\\n      &lt;td&gt;Mazda
  RX4 Wag&lt;/td&gt;\\n      &lt;td&gt;21.0&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
  \     &lt;td&gt;160.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.90&lt;/td&gt;\\n
  \     &lt;td&gt;2.875&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
  \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;2&lt;/th&gt;\\n      &lt;td&gt;Datsun
  710&lt;/td&gt;\\n      &lt;td&gt;22.8&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n
  \     &lt;td&gt;108.0&lt;/td&gt;\\n      &lt;td&gt;93&lt;/td&gt;\\n      &lt;td&gt;3.85&lt;/td&gt;\\n
  \     &lt;td&gt;2.320&lt;/td&gt;\\n      &lt;td&gt;18.61&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
  \     &lt;td&gt;1&lt;/td&gt;\\n      &lt;td&gt;4&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;3&lt;/th&gt;\\n      &lt;td&gt;Hornet
  4 Drive&lt;/td&gt;\\n      &lt;td&gt;21.4&lt;/td&gt;\\n      &lt;td&gt;6&lt;/td&gt;\\n
  \     &lt;td&gt;258.0&lt;/td&gt;\\n      &lt;td&gt;110&lt;/td&gt;\\n      &lt;td&gt;3.08&lt;/td&gt;\\n
  \     &lt;td&gt;3.215&lt;/td&gt;\\n      &lt;td&gt;19.44&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
  \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;1&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n    &lt;tr&gt;\\n      &lt;th&gt;4&lt;/th&gt;\\n      &lt;td&gt;Hornet
  Sportabout&lt;/td&gt;\\n      &lt;td&gt;18.7&lt;/td&gt;\\n      &lt;td&gt;8&lt;/td&gt;\\n
  \     &lt;td&gt;360.0&lt;/td&gt;\\n      &lt;td&gt;175&lt;/td&gt;\\n      &lt;td&gt;3.15&lt;/td&gt;\\n
  \     &lt;td&gt;3.440&lt;/td&gt;\\n      &lt;td&gt;17.02&lt;/td&gt;\\n      &lt;td&gt;0&lt;/td&gt;\\n
  \     &lt;td&gt;0&lt;/td&gt;\\n      &lt;td&gt;3&lt;/td&gt;\\n      &lt;td&gt;2&lt;/td&gt;\\n
  \   &lt;/tr&gt;\\n  &lt;/tbody&gt;\\n&lt;/table&gt;&#39;\n</code></pre></div>\n<p>My
  blog will render that html into a nice table! (After removing new line characters)</p>\n<table
  border=\"1\" class=\"dataframe\">  <thead>    <tr style=\"text-align: right;\">
  \     <th>Unnamed: 0</th>      <th>mpg</th>      <th>cyl</th>      <th>disp</th>
  \     <th>hp</th>      <th>drat</th>      <th>wt</th>      <th>qsec</th>      <th>vs</th>
  \     <th>am</th>      <th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>
  \   <tr>      <td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
  \     <td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>      <td>0</td>
  \     <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Mazda
  RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>      <td>110</td>
  \     <td>3.90</td>      <td>2.875</td>      <td>17.02</td>      <td>0</td>      <td>1</td>
  \     <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Datsun 710</td>      <td>22.8</td>
  \     <td>4</td>      <td>108.0</td>      <td>93</td>      <td>3.85</td>      <td>2.320</td>
  \     <td>18.61</td>      <td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>
  \   </tr>    <tr>      <td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>
  \     <td>258.0</td>      <td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>
  \     <td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>
  \     <td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>      <td>360.0</td>
  \     <td>175</td>      <td>3.15</td>      <td>3.440</td>      <td>17.02</td>      <td>0</td>
  \     <td>0</td>      <td>3</td>      <td>2</td>    </tr>  </tbody></table>\n<div
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
  \       </div>\n    </a>\n\n    <a class='next' href='/wish-list-with-fastapi'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Wish-List-With-Fastapi</p>\n        </div>\n
  \       <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\"
  xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5 15.75L14.25 12L10.5
  8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\" stroke-linecap=\"round\"
  stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n  </div>"
jinja: false
long_description: pandas.DataFrame I do a lot of work with tabular data and one thing
  I have incorporated into some of that work is automatic data summary reports by
  throwing the first few, or several relevant, rows of a dataframe at a point in a
  pipeline into a markd
now: 2024-01-05 14:15:22.253901
path: pages/til/dataframe-to-markdown.md
published: true
slug: dataframe-to-markdown
super_description: pandas.DataFrame I do a lot of work with tabular data and one thing
  I have incorporated into some of that work is automatic data summary reports by
  throwing the first few, or several relevant, rows of a dataframe at a point in a
  pipeline into a markdown file. Pandas has a method on DataFrames that makes this
  100% trivial Say we have a dataframe,  In ipython I can call the method and get
  a markdown table back as a string You can drop that string into a markdown file
  and using any reader that supp
tags:
- python
- tech
templateKey: til
title: Dataframe-To-Markdown
today: 2024-01-05
---

# Pandas

`pandas.DataFrame`s are pretty sweet data structures in Python.

I do a lot of work with tabular data and one thing I have incorporated into some of that work is automatic data summary reports by throwing the first few, or several relevant, rows of a dataframe at a point in a pipeline into a markdown file.

Pandas has a method on DataFrames that makes this 100% trivial!

# The Method

Say we have a dataframe, `df`... then it's literally just: `df.to_markdown()`

```python
❯ df.head()

          Unnamed: 0   mpg  cyl   disp   hp  drat     wt   qsec  vs  am  gear  carb
0          Mazda RX4  21.0    6  160.0  110  3.90  2.620  16.46   0   1     4     4
1      Mazda RX4 Wag  21.0    6  160.0  110  3.90  2.875  17.02   0   1     4     4
2         Datsun 710  22.8    4  108.0   93  3.85  2.320  18.61   1   1     4     1
3     Hornet 4 Drive  21.4    6  258.0  110  3.08  3.215  19.44   1   0     3     1
4  Hornet Sportabout  18.7    8  360.0  175  3.15  3.440  17.02   0   0     3     2

```

In ipython I can call the method and get a markdown table back as a string

```python

mental-data-lake   new-posts via 3.8.11(mental-data-lake) ipython
❯ df.head().to_markdown()
'|    | Unnamed: 0        |   mpg |   cyl |   disp |   hp |   drat |    wt |   qsec |   vs |   am |   gear |   carb |\n|---:|:------------------|------:|------:|-------:|-----:|-------:|------:|-------:|-----:|-----:|-------:|-------:|\n|  0 | Mazda RX4         |  21   |     6 |    160 |  110 |   3.9  | 2.62  |  16.46 |    0 |    1 |      4 |      4 |\n|  1 | Mazda RX4 Wag     |  21   |     6 |    160 |  110 |   3.9  | 2.875 |  17.02 |    0 |    1 |      4 |      4 |\n|  2 | Datsun 710        |  22.8 |     4 |    108 |   93 |   3.85 | 2.32  |  18.61 |    1 |    1 |      4 |      1 |\n|  3 | Hornet 4 Drive    |  21.4 |     6 |    258 |  110 |   3.08 | 3.215 |  19.44 |    1 |    0 |      3 |      1 |\n|  4 | Hornet Sportabout |  18.7 |     8 |    360 |  175 |   3.15 | 3.44  |  17.02 |    0 |    0 |      3 |      2 |'

```

You can drop that string into a markdown file and using any reader that supports the rendering you'll have a nicely formated table of example data in whatever report you're making!

# Bonus method

Just like markdown, you can export a dataframe to html with `df.to_html()` and use that if it's more appropriate for your use case:

```text

'<table border="1" class="dataframe">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Unnamed: 0</th>\n      <th>mpg</th>\n      <th>cyl</th>\n      <th>disp</th>\n      <th>hp</th>\n      <th>drat</th>\n      <th>wt</th>\n      <th>qsec</th>\n      <th>vs</th>\n      <th>am</th>\n      <th>gear</th>\n      <th>carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0</th>\n      <td>Mazda RX4</td>\n      <td>21.0</td>\n      <td>6</td>\n      <td>160.0</td>\n      <td>110</td>\n      <td>3.90</td>\n      <td>2.620</td>\n      <td>16.46</td>\n      <td>0</td>\n      <td>1</td>\n      <td>4</td>\n      <td>4</td>\n    </tr>\n    <tr>\n      <th>1</th>\n      <td>Mazda RX4 Wag</td>\n      <td>21.0</td>\n      <td>6</td>\n      <td>160.0</td>\n      <td>110</td>\n      <td>3.90</td>\n      <td>2.875</td>\n      <td>17.02</td>\n      <td>0</td>\n      <td>1</td>\n      <td>4</td>\n      <td>4</td>\n    </tr>\n    <tr>\n      <th>2</th>\n      <td>Datsun 710</td>\n      <td>22.8</td>\n      <td>4</td>\n      <td>108.0</td>\n      <td>93</td>\n      <td>3.85</td>\n      <td>2.320</td>\n      <td>18.61</td>\n      <td>1</td>\n      <td>1</td>\n      <td>4</td>\n      <td>1</td>\n    </tr>\n    <tr>\n      <th>3</th>\n      <td>Hornet 4 Drive</td>\n      <td>21.4</td>\n      <td>6</td>\n      <td>258.0</td>\n      <td>110</td>\n      <td>3.08</td>\n      <td>3.215</td>\n      <td>19.44</td>\n      <td>1</td>\n      <td>0</td>\n      <td>3</td>\n      <td>1</td>\n    </tr>\n    <tr>\n      <th>4</th>\n      <td>Hornet Sportabout</td>\n      <td>18.7</td>\n      <td>8</td>\n      <td>360.0</td>\n      <td>175</td>\n      <td>3.15</td>\n      <td>3.440</td>\n      <td>17.02</td>\n      <td>0</td>\n      <td>0</td>\n      <td>3</td>\n      <td>2</td>\n    </tr>\n  </tbody>\n</table>'

```

My blog will render that html into a nice table! (After removing new line characters)

<table border="1" class="dataframe">  <thead>    <tr style="text-align: right;">      <th>Unnamed: 0</th>      <th>mpg</th>      <th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>      <th>wt</th>      <th>qsec</th>      <th>vs</th>      <th>am</th>      <th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>    <tr>      <td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>      <td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>      <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>      <td>110</td>      <td>3.90</td>      <td>2.875</td>      <td>17.02</td>      <td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>      <td>Datsun 710</td>      <td>22.8</td>      <td>4</td>      <td>108.0</td>      <td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>      <td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>      <td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>      <td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>      <td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>      <td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>      <td>360.0</td>      <td>175</td>      <td>3.15</td>      <td>3.440</td>      <td>17.02</td>      <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>    </tr>  </tbody></table>
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
    
    <a class='next' href='/wish-list-with-fastapi'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Wish-List-With-Fastapi</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>