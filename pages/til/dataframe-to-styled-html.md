---
templateKey: til
tags: ['python']
title: Dataframe-To-Styled-Html
date: 2022-05-07T00:00:00
status: draft
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

<table border="1" class="dataframe table table-bordered table-dark">\n  <thead>\n    <tr style="text-align: right;">\n      <th>Unnamed: 0</th>\n      <th>mpg</th>\n      <th>cyl</th>\n      <th>disp</th>\n      <th>hp</th>\n      <th>drat</th>\n      <th>wt</th>\n      <th>qsec</th>\n      <th>vs</th>\n      <th>am</th>\n      <th>gear</th>\n      <th>carb</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Mazda RX4</td>\n      <td>21.0</td>\n      <td>6</td>\n      <td>160.0</td>\n      <td>110</td>\n      <td>3.90</td>\n      <td>2.620</td>\n      <td>16.46</td>\n      <td>0</td>\n      <td>1</td>\n      <td>4</td>\n      <td>4</td>\n    </tr>\n    <tr>\n      <td>Mazda RX4 Wag</td>\n      <td>21.0</td>\n      <td>6</td>\n      <td>160.0</td>\n      <td>110</td>\n      <td>3.90</td>\n      <td>2.875</td>\n      <td>17.02</td>\n      <td>0</td>\n      <td>1</td>\n      <td>4</td>\n      <td>4</td>\n    </tr>\n    <tr>\n      <td>Datsun 710</td>\n      <td>22.8</td>\n      <td>4</td>\n      <td>108.0</td>\n      <td>93</td>\n      <td>3.85</td>\n      <td>2.320</td>\n      <td>18.61</td>\n      <td>1</td>\n      <td>1</td>\n      <td>4</td>\n      <td>1</td>\n    </tr>\n    <tr>\n      <td>Hornet 4 Drive</td>\n      <td>21.4</td>\n      <td>6</td>\n      <td>258.0</td>\n      <td>110</td>\n      <td>3.08</td>\n      <td>3.215</td>\n      <td>19.44</td>\n      <td>1</td>\n      <td>0</td>\n      <td>3</td>\n      <td>1</td>\n    </tr>\n    <tr>\n      <td>Hornet Sportabout</td>\n      <td>18.7</td>\n      <td>8</td>\n      <td>360.0</td>\n      <td>175</td>\n      <td>3.15</td>\n      <td>3.440</td>\n      <td>17.02</td>\n      <td>0</td>\n      <td>0</td>\n      <td>3</td>\n      <td>2</td>\n    </tr>\n  </tbody>\n</table>


# You try it!

Crack open ipython and make a dataframe, then `df.to_html(classes=["table table-bordered table-dark"])`, copy the output (minus the quote marks ipython uses to denote the string type) that into `my-file.html`, open that up in a browser and be amazed!

> For added effeciency try using pyperclip to copy the output right to your clipboard!

`pip install pyperclip` and then `pyperclip.copy(df.to_html(classes=["table table-bordered table-dark"]))`
