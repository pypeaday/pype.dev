---
templateKey: til
tags: ['python', 'tech', 'til']
title: Dataframe-To-Markdown
date: 2022-05-07T00:00:00
published: True
cover: "media/dataframe-to-markdown.png"

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
