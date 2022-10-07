---
templateKey: til
tags: ['python']
title: Dataframe-To-Styled-Html
date: 2022-05-07T00:00:00
published: False
cover: "/static/dataframe-to-styled-html.png"

---

I wrote up a little on exporting DataFrames to markdown and html [here](/dataframe-to-markdown)

But I've been playing with a web app for with lists and while I'm toying around I learned you can actually give your tables some style with some simple css classes! 

# To HTML

Reminder that if you have a dataframe, `df`, you can `df.to_html()` to get an HTML table of your dataframe.

Well you can pass some `classes` to make it look super nice!

# Classes and CSS

I don't know anything really about CSS so I won't pretend otherwise, but as I was learning about bootstrap that's where I stumbled upon this...

There are several classes you can pass but I found really good luck with `table-bordered` and `table-dark` for my use case

`df.to_html(classes=["table table-bordered table-dark"])`

<table border="1" class="dataframe table table-bordered table-dark">  <thead>
<tr style="text-align: right;">      <th>Unnamed: 0</th>      <th>mpg</th>
<th>cyl</th>      <th>disp</th>      <th>hp</th>      <th>drat</th>
<th>wt</th>      <th>qsec</th>      <th>vs</th>      <th>am</th>
<th>gear</th>      <th>carb</th>    </tr>  </thead>  <tbody>    <tr>
<td>Mazda RX4</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
<td>110</td>      <td>3.90</td>      <td>2.620</td>      <td>16.46</td>
<td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
<td>Mazda RX4 Wag</td>      <td>21.0</td>      <td>6</td>      <td>160.0</td>
<td>110</td>      <td>3.90</td>      <td>2.875</td>      <td>17.02</td>
<td>0</td>      <td>1</td>      <td>4</td>      <td>4</td>    </tr>    <tr>
<td>Datsun 710</td>      <td>22.8</td>      <td>4</td>      <td>108.0</td>
<td>93</td>      <td>3.85</td>      <td>2.320</td>      <td>18.61</td>
<td>1</td>      <td>1</td>      <td>4</td>      <td>1</td>    </tr>    <tr>
<td>Hornet 4 Drive</td>      <td>21.4</td>      <td>6</td>      <td>258.0</td>
<td>110</td>      <td>3.08</td>      <td>3.215</td>      <td>19.44</td>
<td>1</td>      <td>0</td>      <td>3</td>      <td>1</td>    </tr>    <tr>
<td>Hornet Sportabout</td>      <td>18.7</td>      <td>8</td>
<td>360.0</td>      <td>175</td>      <td>3.15</td>      <td>3.440</td>
<td>17.02</td>      <td>0</td>      <td>0</td>      <td>3</td>      <td>2</td>
</tr>  </tbody></table>


# You try it!

Crack open ipython and make a dataframe, then `df.to_html(classes=["table table-bordered table-dark"])`, copy the output (minus the quote marks ipython uses to denote the string type) that into `my-file.html`, open that up in a browser and be amazed!

> For added effeciency try using pyperclip to copy the output right to your clipboard!

`pip install pyperclip` and then `pyperclip.copy(df.to_html(classes=["table table-bordered table-dark"]))`
