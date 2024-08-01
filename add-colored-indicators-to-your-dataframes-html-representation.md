---
article_html: "<p><a href=\"https://twitter.com/driscollis\">Mike Driscoll</a> recently
  tweeted about making\ncolored out with pandas DataFrames and I just had to try it
  for myself</p>\n<h1 id=\"use-case\">Use Case</h1>\n<p>First though... why?\nMy biggest
  use case is a monitoring pipeline of mine... The details aside, the\noutput of my
  pipeline is a dataframe where each row has information about a\nfailed pipeline
  that I need to go look into. I dump that result to a simle html\nfile that's hosted
  on an internal site and the file is updated every couple of\nhours. Adding some
  colored indicators automatically to the rows to help me\nassess severity of each
  record would be a handy way to quickly get an\nunderstanding the state of our pipelines.</p>\n<h1
  id=\"how\">How?</h1>\n<p>The docs for the <code>applymap</code> method state simply:</p>\n<div
  class=\"highlight\"><pre><span></span><code>Apply a CSS-styling function elementwise.\n\nUpdates
  the HTML representation with the result.\n</code></pre></div>\n<p>So we can write
  a function that returns <code>color: {color}</code> based on the dataframe\nvalues
  and when we drop that dataframe to html we'll have some simple css\nstyling applied
  automagically!</p>\n<p>By default the function will be applied to all columns of
  the dataframe, but\nthat's not useful if the columns are different types which is
  usually the case.\nLuckily there is a <code>subset</code> keyword to only apply
  to the columns you need!</p>\n<p>Consider my example</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"err\"></span>  <span class=\"n\">main</span>
  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">df</span> <span class=\"o\">=</span> <span
  class=\"n\">pd</span><span class=\"o\">.</span><span class=\"n\">read_csv</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;cars.csv&quot;</span><span class=\"p\">)</span>\n\n<span
  class=\"n\">sandbox</span> <span class=\"err\"></span>  <span class=\"n\">main</span>
  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"k\">def</span> <span class=\"nf\">mpg_color</span><span
  class=\"p\">(</span><span class=\"n\">val</span><span class=\"p\">:</span> <span
  class=\"nb\">float</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
  class=\"p\">:</span>     <span class=\"n\">color</span> <span class=\"o\">=</span>
  <span class=\"s2\">&quot;red&quot;</span> <span class=\"k\">if</span> <span class=\"n\">val</span>
  <span class=\"o\">&lt;</span> <span class=\"mi\">21</span> <span class=\"k\">else</span>
  <span class=\"s2\">&quot;green&quot;</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>
  \    <span class=\"k\">return</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;color:
  </span><span class=\"si\">{</span><span class=\"n\">color</span><span class=\"si\">}</span><span
  class=\"s2\">&quot;</span>\n\n<span class=\"n\">sandbox</span> <span class=\"err\"></span>
  \ <span class=\"n\">main</span> <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"n\">df</span><span
  class=\"o\">.</span><span class=\"n\">style</span><span class=\"o\">.</span><span
  class=\"n\">applymap</span><span class=\"p\">(</span><span class=\"n\">mpg_color</span><span
  class=\"p\">,</span> <span class=\"n\">subset</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;mpg&quot;</span><span class=\"p\">)</span><span class=\"o\">.</span><span
  class=\"n\">to_html</span><span class=\"p\">(</span><span class=\"s2\">&quot;color.html&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>I want to quickly see if the <code>mpg</code>
  is any good for the cars in the cars dataset\nand I'll define \"good\" as better
  than 21 mpg (not great I know but just for the\nsake of discussion...)</p>\n<p>The
  function returns an appropriate css string and after I <code>style.applymap</code>
  on just the <code>mpg</code> column we get this!</p>\n<style type=\"text/css\">\n#T_95e99_row0_col1,
  #T_95e99_row1_col1, #T_95e99_row2_col1, #T_95e99_row3_col1 {\n  color: green;\n}\n#T_95e99_row4_col1
  {\n  color: red;\n}\n</style>\n<table id=\"T_95e99\">\n  <thead>\n    <tr>\n      <th
  class=\"blank level0\" >&nbsp;</th>\n      <th id=\"T_95e99_level0_col0\" class=\"col_heading
  level0 col0\" >Unnamed: 0</th>\n      <th id=\"T_95e99_level0_col1\" class=\"col_heading
  level0 col1\" >mpg</th>\n      <th id=\"T_95e99_level0_col2\" class=\"col_heading
  level0 col2\" >cyl</th>\n      <th id=\"T_95e99_level0_col3\" class=\"col_heading
  level0 col3\" >disp</th>\n      <th id=\"T_95e99_level0_col4\" class=\"col_heading
  level0 col4\" >hp</th>\n      <th id=\"T_95e99_level0_col5\" class=\"col_heading
  level0 col5\" >drat</th>\n      <th id=\"T_95e99_level0_col6\" class=\"col_heading
  level0 col6\" >wt</th>\n      <th id=\"T_95e99_level0_col7\" class=\"col_heading
  level0 col7\" >qsec</th>\n      <th id=\"T_95e99_level0_col8\" class=\"col_heading
  level0 col8\" >vs</th>\n      <th id=\"T_95e99_level0_col9\" class=\"col_heading
  level0 col9\" >am</th>\n      <th id=\"T_95e99_level0_col10\" class=\"col_heading
  level0 col10\" >gear</th>\n      <th id=\"T_95e99_level0_col11\" class=\"col_heading
  level0 col11\" >carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th
  id=\"T_95e99_level0_row0\" class=\"row_heading level0 row0\" >0</th>\n      <td
  id=\"T_95e99_row0_col0\" class=\"data row0 col0\" >Mazda RX4</td>\n      <td id=\"T_95e99_row0_col1\"
  class=\"data row0 col1\" >21.000000</td>\n      <td id=\"T_95e99_row0_col2\" class=\"data
  row0 col2\" >6</td>\n      <td id=\"T_95e99_row0_col3\" class=\"data row0 col3\"
  >160.000000</td>\n      <td id=\"T_95e99_row0_col4\" class=\"data row0 col4\" >110</td>\n
  \     <td id=\"T_95e99_row0_col5\" class=\"data row0 col5\" >3.900000</td>\n      <td
  id=\"T_95e99_row0_col6\" class=\"data row0 col6\" >2.620000</td>\n      <td id=\"T_95e99_row0_col7\"
  class=\"data row0 col7\" >16.460000</td>\n      <td id=\"T_95e99_row0_col8\" class=\"data
  row0 col8\" >0</td>\n      <td id=\"T_95e99_row0_col9\" class=\"data row0 col9\"
  >1</td>\n      <td id=\"T_95e99_row0_col10\" class=\"data row0 col10\" >4</td>\n
  \     <td id=\"T_95e99_row0_col11\" class=\"data row0 col11\" >4</td>\n    </tr>\n
  \   <tr>\n      <th id=\"T_95e99_level0_row1\" class=\"row_heading level0 row1\"
  >1</th>\n      <td id=\"T_95e99_row1_col0\" class=\"data row1 col0\" >Mazda RX4
  Wag</td>\n      <td id=\"T_95e99_row1_col1\" class=\"data row1 col1\" >21.000000</td>\n
  \     <td id=\"T_95e99_row1_col2\" class=\"data row1 col2\" >6</td>\n      <td id=\"T_95e99_row1_col3\"
  class=\"data row1 col3\" >160.000000</td>\n      <td id=\"T_95e99_row1_col4\" class=\"data
  row1 col4\" >110</td>\n      <td id=\"T_95e99_row1_col5\" class=\"data row1 col5\"
  >3.900000</td>\n      <td id=\"T_95e99_row1_col6\" class=\"data row1 col6\" >2.875000</td>\n
  \     <td id=\"T_95e99_row1_col7\" class=\"data row1 col7\" >17.020000</td>\n      <td
  id=\"T_95e99_row1_col8\" class=\"data row1 col8\" >0</td>\n      <td id=\"T_95e99_row1_col9\"
  class=\"data row1 col9\" >1</td>\n      <td id=\"T_95e99_row1_col10\" class=\"data
  row1 col10\" >4</td>\n      <td id=\"T_95e99_row1_col11\" class=\"data row1 col11\"
  >4</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row2\" class=\"row_heading
  level0 row2\" >2</th>\n      <td id=\"T_95e99_row2_col0\" class=\"data row2 col0\"
  >Datsun 710</td>\n      <td id=\"T_95e99_row2_col1\" class=\"data row2 col1\" >22.800000</td>\n
  \     <td id=\"T_95e99_row2_col2\" class=\"data row2 col2\" >4</td>\n      <td id=\"T_95e99_row2_col3\"
  class=\"data row2 col3\" >108.000000</td>\n      <td id=\"T_95e99_row2_col4\" class=\"data
  row2 col4\" >93</td>\n      <td id=\"T_95e99_row2_col5\" class=\"data row2 col5\"
  >3.850000</td>\n      <td id=\"T_95e99_row2_col6\" class=\"data row2 col6\" >2.320000</td>\n
  \     <td id=\"T_95e99_row2_col7\" class=\"data row2 col7\" >18.610000</td>\n      <td
  id=\"T_95e99_row2_col8\" class=\"data row2 col8\" >1</td>\n      <td id=\"T_95e99_row2_col9\"
  class=\"data row2 col9\" >1</td>\n      <td id=\"T_95e99_row2_col10\" class=\"data
  row2 col10\" >4</td>\n      <td id=\"T_95e99_row2_col11\" class=\"data row2 col11\"
  >1</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row3\" class=\"row_heading
  level0 row3\" >3</th>\n      <td id=\"T_95e99_row3_col0\" class=\"data row3 col0\"
  >Hornet 4 Drive</td>\n      <td id=\"T_95e99_row3_col1\" class=\"data row3 col1\"
  >21.400000</td>\n      <td id=\"T_95e99_row3_col2\" class=\"data row3 col2\" >6</td>\n
  \     <td id=\"T_95e99_row3_col3\" class=\"data row3 col3\" >258.000000</td>\n      <td
  id=\"T_95e99_row3_col4\" class=\"data row3 col4\" >110</td>\n      <td id=\"T_95e99_row3_col5\"
  class=\"data row3 col5\" >3.080000</td>\n      <td id=\"T_95e99_row3_col6\" class=\"data
  row3 col6\" >3.215000</td>\n      <td id=\"T_95e99_row3_col7\" class=\"data row3
  col7\" >19.440000</td>\n      <td id=\"T_95e99_row3_col8\" class=\"data row3 col8\"
  >1</td>\n      <td id=\"T_95e99_row3_col9\" class=\"data row3 col9\" >0</td>\n      <td
  id=\"T_95e99_row3_col10\" class=\"data row3 col10\" >3</td>\n      <td id=\"T_95e99_row3_col11\"
  class=\"data row3 col11\" >1</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row4\"
  class=\"row_heading level0 row4\" >4</th>\n      <td id=\"T_95e99_row4_col0\" class=\"data
  row4 col0\" >Hornet Sportabout</td>\n      <td id=\"T_95e99_row4_col1\" class=\"data
  row4 col1\" >18.700000</td>\n      <td id=\"T_95e99_row4_col2\" class=\"data row4
  col2\" >8</td>\n      <td id=\"T_95e99_row4_col3\" class=\"data row4 col3\" >360.000000</td>\n
  \     <td id=\"T_95e99_row4_col4\" class=\"data row4 col4\" >175</td>\n      <td
  id=\"T_95e99_row4_col5\" class=\"data row4 col5\" >3.150000</td>\n      <td id=\"T_95e99_row4_col6\"
  class=\"data row4 col6\" >3.440000</td>\n      <td id=\"T_95e99_row4_col7\" class=\"data
  row4 col7\" >17.020000</td>\n      <td id=\"T_95e99_row4_col8\" class=\"data row4
  col8\" >0</td>\n      <td id=\"T_95e99_row4_col9\" class=\"data row4 col9\" >0</td>\n
  \     <td id=\"T_95e99_row4_col10\" class=\"data row4 col10\" >3</td>\n      <td
  id=\"T_95e99_row4_col11\" class=\"data row4 col11\" >2</td>\n    </tr>\n  </tbody>\n</table>\n<div
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
  \   </style>\n\n    <a class='prev' href='/reset-ssh-key-passphrase'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Reset SSH key passphrase</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/reindex-nextcloud-after-adding-data-via-cli'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Reindex Nextcloud After Adding Data via CLI</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: ''
date: 2022-06-04
datetime: 2022-06-04 00:00:00+00:00
description: First though... why? The docs for the  So we can write a function that
  returns  By default the function will be applied to all columns of the dataframe,
  but Con
edit_link: https://github.com/edit/main/pages/til/add-colored-indicators-to-your-dataframes-html-representation.md
html: "<p><a href=\"https://twitter.com/driscollis\">Mike Driscoll</a> recently tweeted
  about making\ncolored out with pandas DataFrames and I just had to try it for myself</p>\n<h1
  id=\"use-case\">Use Case</h1>\n<p>First though... why?\nMy biggest use case is a
  monitoring pipeline of mine... The details aside, the\noutput of my pipeline is
  a dataframe where each row has information about a\nfailed pipeline that I need
  to go look into. I dump that result to a simle html\nfile that's hosted on an internal
  site and the file is updated every couple of\nhours. Adding some colored indicators
  automatically to the rows to help me\nassess severity of each record would be a
  handy way to quickly get an\nunderstanding the state of our pipelines.</p>\n<h1
  id=\"how\">How?</h1>\n<p>The docs for the <code>applymap</code> method state simply:</p>\n<div
  class=\"highlight\"><pre><span></span><code>Apply a CSS-styling function elementwise.\n\nUpdates
  the HTML representation with the result.\n</code></pre></div>\n<p>So we can write
  a function that returns <code>color: {color}</code> based on the dataframe\nvalues
  and when we drop that dataframe to html we'll have some simple css\nstyling applied
  automagically!</p>\n<p>By default the function will be applied to all columns of
  the dataframe, but\nthat's not useful if the columns are different types which is
  usually the case.\nLuckily there is a <code>subset</code> keyword to only apply
  to the columns you need!</p>\n<p>Consider my example</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"err\"></span>  <span class=\"n\">main</span>
  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"n\">df</span> <span class=\"o\">=</span> <span
  class=\"n\">pd</span><span class=\"o\">.</span><span class=\"n\">read_csv</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;cars.csv&quot;</span><span class=\"p\">)</span>\n\n<span
  class=\"n\">sandbox</span> <span class=\"err\"></span>  <span class=\"n\">main</span>
  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
  class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"k\">def</span> <span class=\"nf\">mpg_color</span><span
  class=\"p\">(</span><span class=\"n\">val</span><span class=\"p\">:</span> <span
  class=\"nb\">float</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
  class=\"p\">:</span>     <span class=\"n\">color</span> <span class=\"o\">=</span>
  <span class=\"s2\">&quot;red&quot;</span> <span class=\"k\">if</span> <span class=\"n\">val</span>
  <span class=\"o\">&lt;</span> <span class=\"mi\">21</span> <span class=\"k\">else</span>
  <span class=\"s2\">&quot;green&quot;</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>
  \    <span class=\"k\">return</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;color:
  </span><span class=\"si\">{</span><span class=\"n\">color</span><span class=\"si\">}</span><span
  class=\"s2\">&quot;</span>\n\n<span class=\"n\">sandbox</span> <span class=\"err\"></span>
  \ <span class=\"n\">main</span> <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
  class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span> <span
  class=\"n\">ipython</span>\n<span class=\"err\">❯</span> <span class=\"n\">df</span><span
  class=\"o\">.</span><span class=\"n\">style</span><span class=\"o\">.</span><span
  class=\"n\">applymap</span><span class=\"p\">(</span><span class=\"n\">mpg_color</span><span
  class=\"p\">,</span> <span class=\"n\">subset</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;mpg&quot;</span><span class=\"p\">)</span><span class=\"o\">.</span><span
  class=\"n\">to_html</span><span class=\"p\">(</span><span class=\"s2\">&quot;color.html&quot;</span><span
  class=\"p\">)</span>\n</code></pre></div>\n<p>I want to quickly see if the <code>mpg</code>
  is any good for the cars in the cars dataset\nand I'll define \"good\" as better
  than 21 mpg (not great I know but just for the\nsake of discussion...)</p>\n<p>The
  function returns an appropriate css string and after I <code>style.applymap</code>
  on just the <code>mpg</code> column we get this!</p>\n<style type=\"text/css\">\n#T_95e99_row0_col1,
  #T_95e99_row1_col1, #T_95e99_row2_col1, #T_95e99_row3_col1 {\n  color: green;\n}\n#T_95e99_row4_col1
  {\n  color: red;\n}\n</style>\n<table id=\"T_95e99\">\n  <thead>\n    <tr>\n      <th
  class=\"blank level0\" >&nbsp;</th>\n      <th id=\"T_95e99_level0_col0\" class=\"col_heading
  level0 col0\" >Unnamed: 0</th>\n      <th id=\"T_95e99_level0_col1\" class=\"col_heading
  level0 col1\" >mpg</th>\n      <th id=\"T_95e99_level0_col2\" class=\"col_heading
  level0 col2\" >cyl</th>\n      <th id=\"T_95e99_level0_col3\" class=\"col_heading
  level0 col3\" >disp</th>\n      <th id=\"T_95e99_level0_col4\" class=\"col_heading
  level0 col4\" >hp</th>\n      <th id=\"T_95e99_level0_col5\" class=\"col_heading
  level0 col5\" >drat</th>\n      <th id=\"T_95e99_level0_col6\" class=\"col_heading
  level0 col6\" >wt</th>\n      <th id=\"T_95e99_level0_col7\" class=\"col_heading
  level0 col7\" >qsec</th>\n      <th id=\"T_95e99_level0_col8\" class=\"col_heading
  level0 col8\" >vs</th>\n      <th id=\"T_95e99_level0_col9\" class=\"col_heading
  level0 col9\" >am</th>\n      <th id=\"T_95e99_level0_col10\" class=\"col_heading
  level0 col10\" >gear</th>\n      <th id=\"T_95e99_level0_col11\" class=\"col_heading
  level0 col11\" >carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th
  id=\"T_95e99_level0_row0\" class=\"row_heading level0 row0\" >0</th>\n      <td
  id=\"T_95e99_row0_col0\" class=\"data row0 col0\" >Mazda RX4</td>\n      <td id=\"T_95e99_row0_col1\"
  class=\"data row0 col1\" >21.000000</td>\n      <td id=\"T_95e99_row0_col2\" class=\"data
  row0 col2\" >6</td>\n      <td id=\"T_95e99_row0_col3\" class=\"data row0 col3\"
  >160.000000</td>\n      <td id=\"T_95e99_row0_col4\" class=\"data row0 col4\" >110</td>\n
  \     <td id=\"T_95e99_row0_col5\" class=\"data row0 col5\" >3.900000</td>\n      <td
  id=\"T_95e99_row0_col6\" class=\"data row0 col6\" >2.620000</td>\n      <td id=\"T_95e99_row0_col7\"
  class=\"data row0 col7\" >16.460000</td>\n      <td id=\"T_95e99_row0_col8\" class=\"data
  row0 col8\" >0</td>\n      <td id=\"T_95e99_row0_col9\" class=\"data row0 col9\"
  >1</td>\n      <td id=\"T_95e99_row0_col10\" class=\"data row0 col10\" >4</td>\n
  \     <td id=\"T_95e99_row0_col11\" class=\"data row0 col11\" >4</td>\n    </tr>\n
  \   <tr>\n      <th id=\"T_95e99_level0_row1\" class=\"row_heading level0 row1\"
  >1</th>\n      <td id=\"T_95e99_row1_col0\" class=\"data row1 col0\" >Mazda RX4
  Wag</td>\n      <td id=\"T_95e99_row1_col1\" class=\"data row1 col1\" >21.000000</td>\n
  \     <td id=\"T_95e99_row1_col2\" class=\"data row1 col2\" >6</td>\n      <td id=\"T_95e99_row1_col3\"
  class=\"data row1 col3\" >160.000000</td>\n      <td id=\"T_95e99_row1_col4\" class=\"data
  row1 col4\" >110</td>\n      <td id=\"T_95e99_row1_col5\" class=\"data row1 col5\"
  >3.900000</td>\n      <td id=\"T_95e99_row1_col6\" class=\"data row1 col6\" >2.875000</td>\n
  \     <td id=\"T_95e99_row1_col7\" class=\"data row1 col7\" >17.020000</td>\n      <td
  id=\"T_95e99_row1_col8\" class=\"data row1 col8\" >0</td>\n      <td id=\"T_95e99_row1_col9\"
  class=\"data row1 col9\" >1</td>\n      <td id=\"T_95e99_row1_col10\" class=\"data
  row1 col10\" >4</td>\n      <td id=\"T_95e99_row1_col11\" class=\"data row1 col11\"
  >4</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row2\" class=\"row_heading
  level0 row2\" >2</th>\n      <td id=\"T_95e99_row2_col0\" class=\"data row2 col0\"
  >Datsun 710</td>\n      <td id=\"T_95e99_row2_col1\" class=\"data row2 col1\" >22.800000</td>\n
  \     <td id=\"T_95e99_row2_col2\" class=\"data row2 col2\" >4</td>\n      <td id=\"T_95e99_row2_col3\"
  class=\"data row2 col3\" >108.000000</td>\n      <td id=\"T_95e99_row2_col4\" class=\"data
  row2 col4\" >93</td>\n      <td id=\"T_95e99_row2_col5\" class=\"data row2 col5\"
  >3.850000</td>\n      <td id=\"T_95e99_row2_col6\" class=\"data row2 col6\" >2.320000</td>\n
  \     <td id=\"T_95e99_row2_col7\" class=\"data row2 col7\" >18.610000</td>\n      <td
  id=\"T_95e99_row2_col8\" class=\"data row2 col8\" >1</td>\n      <td id=\"T_95e99_row2_col9\"
  class=\"data row2 col9\" >1</td>\n      <td id=\"T_95e99_row2_col10\" class=\"data
  row2 col10\" >4</td>\n      <td id=\"T_95e99_row2_col11\" class=\"data row2 col11\"
  >1</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row3\" class=\"row_heading
  level0 row3\" >3</th>\n      <td id=\"T_95e99_row3_col0\" class=\"data row3 col0\"
  >Hornet 4 Drive</td>\n      <td id=\"T_95e99_row3_col1\" class=\"data row3 col1\"
  >21.400000</td>\n      <td id=\"T_95e99_row3_col2\" class=\"data row3 col2\" >6</td>\n
  \     <td id=\"T_95e99_row3_col3\" class=\"data row3 col3\" >258.000000</td>\n      <td
  id=\"T_95e99_row3_col4\" class=\"data row3 col4\" >110</td>\n      <td id=\"T_95e99_row3_col5\"
  class=\"data row3 col5\" >3.080000</td>\n      <td id=\"T_95e99_row3_col6\" class=\"data
  row3 col6\" >3.215000</td>\n      <td id=\"T_95e99_row3_col7\" class=\"data row3
  col7\" >19.440000</td>\n      <td id=\"T_95e99_row3_col8\" class=\"data row3 col8\"
  >1</td>\n      <td id=\"T_95e99_row3_col9\" class=\"data row3 col9\" >0</td>\n      <td
  id=\"T_95e99_row3_col10\" class=\"data row3 col10\" >3</td>\n      <td id=\"T_95e99_row3_col11\"
  class=\"data row3 col11\" >1</td>\n    </tr>\n    <tr>\n      <th id=\"T_95e99_level0_row4\"
  class=\"row_heading level0 row4\" >4</th>\n      <td id=\"T_95e99_row4_col0\" class=\"data
  row4 col0\" >Hornet Sportabout</td>\n      <td id=\"T_95e99_row4_col1\" class=\"data
  row4 col1\" >18.700000</td>\n      <td id=\"T_95e99_row4_col2\" class=\"data row4
  col2\" >8</td>\n      <td id=\"T_95e99_row4_col3\" class=\"data row4 col3\" >360.000000</td>\n
  \     <td id=\"T_95e99_row4_col4\" class=\"data row4 col4\" >175</td>\n      <td
  id=\"T_95e99_row4_col5\" class=\"data row4 col5\" >3.150000</td>\n      <td id=\"T_95e99_row4_col6\"
  class=\"data row4 col6\" >3.440000</td>\n      <td id=\"T_95e99_row4_col7\" class=\"data
  row4 col7\" >17.020000</td>\n      <td id=\"T_95e99_row4_col8\" class=\"data row4
  col8\" >0</td>\n      <td id=\"T_95e99_row4_col9\" class=\"data row4 col9\" >0</td>\n
  \     <td id=\"T_95e99_row4_col10\" class=\"data row4 col10\" >3</td>\n      <td
  id=\"T_95e99_row4_col11\" class=\"data row4 col11\" >2</td>\n    </tr>\n  </tbody>\n</table>\n<div
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
  \   </style>\n\n    <a class='prev' href='/reset-ssh-key-passphrase'>\n\n\n        <svg
  width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Reset SSH key passphrase</p>\n        </div>\n
  \   </a>\n\n    <a class='next' href='/reindex-nextcloud-after-adding-data-via-cli'>\n\n
  \       <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>next</p>\n
  \           <p class='prevnext-title'>Reindex Nextcloud After Adding Data via CLI</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: First though... why? The docs for the  So we can write a function
  that returns  By default the function will be applied to all columns of the dataframe,
  but Consider my example I want to quickly see if the  The function returns an appropriate
  css str
now: 2024-08-01 13:40:17.987542
path: pages/til/add-colored-indicators-to-your-dataframes-html-representation.md
published: true
slug: add-colored-indicators-to-your-dataframes-html-representation
super_description: 'First though... why? The docs for the  So we can write a function
  that returns  By default the function will be applied to all columns of the dataframe,
  but Consider my example I want to quickly see if the  The function returns an appropriate
  css string and after I '
tags:
- python
- data
- tech
templateKey: til
title: Add colored indicators to your dataframes html representation
today: 2024-08-01
---

[Mike Driscoll](https://twitter.com/driscollis) recently tweeted about making
colored out with pandas DataFrames and I just had to try it for myself

# Use Case

First though... why?
My biggest use case is a monitoring pipeline of mine... The details aside, the
output of my pipeline is a dataframe where each row has information about a
failed pipeline that I need to go look into. I dump that result to a simle html
file that's hosted on an internal site and the file is updated every couple of
hours. Adding some colored indicators automatically to the rows to help me
assess severity of each record would be a handy way to quickly get an
understanding the state of our pipelines.

# How?

The docs for the `applymap` method state simply:

```
Apply a CSS-styling function elementwise.

Updates the HTML representation with the result.

```

So we can write a function that returns `color: {color}` based on the dataframe
values and when we drop that dataframe to html we'll have some simple css
styling applied automagically!

By default the function will be applied to all columns of the dataframe, but
that's not useful if the columns are different types which is usually the case.
Luckily there is a `subset` keyword to only apply to the columns you need!

Consider my example

```python 
sandbox   main via 3.8.11(sandbox) ipython
❯ df = pd.read_csv("cars.csv")

sandbox   main via 3.8.11(sandbox) ipython
❯ def mpg_color(val: float):
...:     color = "red" if val < 21 else "green"
...:     return f"color: {color}"

sandbox   main via 3.8.11(sandbox) ipython
❯ df.style.applymap(mpg_color, subset="mpg").to_html("color.html")
```

I want to quickly see if the `mpg` is any good for the cars in the cars dataset
and I'll define "good" as better than 21 mpg (not great I know but just for the
sake of discussion...)

The function returns an appropriate css string and after I `style.applymap` on just the `mpg` column we get this!


<style type="text/css">
#T_95e99_row0_col1, #T_95e99_row1_col1, #T_95e99_row2_col1, #T_95e99_row3_col1 {
  color: green;
}
#T_95e99_row4_col1 {
  color: red;
}
</style>
<table id="T_95e99">
  <thead>
    <tr>
      <th class="blank level0" >&nbsp;</th>
      <th id="T_95e99_level0_col0" class="col_heading level0 col0" >Unnamed: 0</th>
      <th id="T_95e99_level0_col1" class="col_heading level0 col1" >mpg</th>
      <th id="T_95e99_level0_col2" class="col_heading level0 col2" >cyl</th>
      <th id="T_95e99_level0_col3" class="col_heading level0 col3" >disp</th>
      <th id="T_95e99_level0_col4" class="col_heading level0 col4" >hp</th>
      <th id="T_95e99_level0_col5" class="col_heading level0 col5" >drat</th>
      <th id="T_95e99_level0_col6" class="col_heading level0 col6" >wt</th>
      <th id="T_95e99_level0_col7" class="col_heading level0 col7" >qsec</th>
      <th id="T_95e99_level0_col8" class="col_heading level0 col8" >vs</th>
      <th id="T_95e99_level0_col9" class="col_heading level0 col9" >am</th>
      <th id="T_95e99_level0_col10" class="col_heading level0 col10" >gear</th>
      <th id="T_95e99_level0_col11" class="col_heading level0 col11" >carb</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_95e99_level0_row0" class="row_heading level0 row0" >0</th>
      <td id="T_95e99_row0_col0" class="data row0 col0" >Mazda RX4</td>
      <td id="T_95e99_row0_col1" class="data row0 col1" >21.000000</td>
      <td id="T_95e99_row0_col2" class="data row0 col2" >6</td>
      <td id="T_95e99_row0_col3" class="data row0 col3" >160.000000</td>
      <td id="T_95e99_row0_col4" class="data row0 col4" >110</td>
      <td id="T_95e99_row0_col5" class="data row0 col5" >3.900000</td>
      <td id="T_95e99_row0_col6" class="data row0 col6" >2.620000</td>
      <td id="T_95e99_row0_col7" class="data row0 col7" >16.460000</td>
      <td id="T_95e99_row0_col8" class="data row0 col8" >0</td>
      <td id="T_95e99_row0_col9" class="data row0 col9" >1</td>
      <td id="T_95e99_row0_col10" class="data row0 col10" >4</td>
      <td id="T_95e99_row0_col11" class="data row0 col11" >4</td>
    </tr>
    <tr>
      <th id="T_95e99_level0_row1" class="row_heading level0 row1" >1</th>
      <td id="T_95e99_row1_col0" class="data row1 col0" >Mazda RX4 Wag</td>
      <td id="T_95e99_row1_col1" class="data row1 col1" >21.000000</td>
      <td id="T_95e99_row1_col2" class="data row1 col2" >6</td>
      <td id="T_95e99_row1_col3" class="data row1 col3" >160.000000</td>
      <td id="T_95e99_row1_col4" class="data row1 col4" >110</td>
      <td id="T_95e99_row1_col5" class="data row1 col5" >3.900000</td>
      <td id="T_95e99_row1_col6" class="data row1 col6" >2.875000</td>
      <td id="T_95e99_row1_col7" class="data row1 col7" >17.020000</td>
      <td id="T_95e99_row1_col8" class="data row1 col8" >0</td>
      <td id="T_95e99_row1_col9" class="data row1 col9" >1</td>
      <td id="T_95e99_row1_col10" class="data row1 col10" >4</td>
      <td id="T_95e99_row1_col11" class="data row1 col11" >4</td>
    </tr>
    <tr>
      <th id="T_95e99_level0_row2" class="row_heading level0 row2" >2</th>
      <td id="T_95e99_row2_col0" class="data row2 col0" >Datsun 710</td>
      <td id="T_95e99_row2_col1" class="data row2 col1" >22.800000</td>
      <td id="T_95e99_row2_col2" class="data row2 col2" >4</td>
      <td id="T_95e99_row2_col3" class="data row2 col3" >108.000000</td>
      <td id="T_95e99_row2_col4" class="data row2 col4" >93</td>
      <td id="T_95e99_row2_col5" class="data row2 col5" >3.850000</td>
      <td id="T_95e99_row2_col6" class="data row2 col6" >2.320000</td>
      <td id="T_95e99_row2_col7" class="data row2 col7" >18.610000</td>
      <td id="T_95e99_row2_col8" class="data row2 col8" >1</td>
      <td id="T_95e99_row2_col9" class="data row2 col9" >1</td>
      <td id="T_95e99_row2_col10" class="data row2 col10" >4</td>
      <td id="T_95e99_row2_col11" class="data row2 col11" >1</td>
    </tr>
    <tr>
      <th id="T_95e99_level0_row3" class="row_heading level0 row3" >3</th>
      <td id="T_95e99_row3_col0" class="data row3 col0" >Hornet 4 Drive</td>
      <td id="T_95e99_row3_col1" class="data row3 col1" >21.400000</td>
      <td id="T_95e99_row3_col2" class="data row3 col2" >6</td>
      <td id="T_95e99_row3_col3" class="data row3 col3" >258.000000</td>
      <td id="T_95e99_row3_col4" class="data row3 col4" >110</td>
      <td id="T_95e99_row3_col5" class="data row3 col5" >3.080000</td>
      <td id="T_95e99_row3_col6" class="data row3 col6" >3.215000</td>
      <td id="T_95e99_row3_col7" class="data row3 col7" >19.440000</td>
      <td id="T_95e99_row3_col8" class="data row3 col8" >1</td>
      <td id="T_95e99_row3_col9" class="data row3 col9" >0</td>
      <td id="T_95e99_row3_col10" class="data row3 col10" >3</td>
      <td id="T_95e99_row3_col11" class="data row3 col11" >1</td>
    </tr>
    <tr>
      <th id="T_95e99_level0_row4" class="row_heading level0 row4" >4</th>
      <td id="T_95e99_row4_col0" class="data row4 col0" >Hornet Sportabout</td>
      <td id="T_95e99_row4_col1" class="data row4 col1" >18.700000</td>
      <td id="T_95e99_row4_col2" class="data row4 col2" >8</td>
      <td id="T_95e99_row4_col3" class="data row4 col3" >360.000000</td>
      <td id="T_95e99_row4_col4" class="data row4 col4" >175</td>
      <td id="T_95e99_row4_col5" class="data row4 col5" >3.150000</td>
      <td id="T_95e99_row4_col6" class="data row4 col6" >3.440000</td>
      <td id="T_95e99_row4_col7" class="data row4 col7" >17.020000</td>
      <td id="T_95e99_row4_col8" class="data row4 col8" >0</td>
      <td id="T_95e99_row4_col9" class="data row4 col9" >0</td>
      <td id="T_95e99_row4_col10" class="data row4 col10" >3</td>
      <td id="T_95e99_row4_col11" class="data row4 col11" >2</td>
    </tr>
  </tbody>
</table>
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
    
    <a class='prev' href='/reset-ssh-key-passphrase'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Reset SSH key passphrase</p>
        </div>
    </a>
    
    <a class='next' href='/reindex-nextcloud-after-adding-data-via-cli'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Reindex Nextcloud After Adding Data via CLI</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>