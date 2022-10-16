---
date: 2022-06-04 06:12:33
templateKey: til
title: Add colored indicators to your dataframes html representation
published: True
tags:
  - python
  - data
  - tech

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


