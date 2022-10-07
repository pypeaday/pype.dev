---
templateKey: til
tags: ['python']
title: Deques
date: 2022-03-31T00:00:00
published: True
cover: "/static/deques.png"

---

I am working on a project to create a small system monitoring dashboard using the python `psutil` library.

The repo is [here](https://github.com/nicpayne713/not-netdata) (if you want actual system monitoring please use [netdata](https://www.netdata.cloud/)).

I'm using `streamlit` and `plotly` for the webserver, design, and plotting at the moment.

## My Use Case

I needed a way to refresh my plotly charts with a fixed window of time so that I'm able to just see relevant recent data instead of cramming all data for all time into one plot that's 500 pixels wide...

Checking the length of arrays or lists every time I get a new piece of data feels kind of dumb and I thought "python must have a way to do this"...

> "This" meaning, update values in a fixed length array without reallocating memory or recreating a copy of the list

## Deques

Enter the `deque`. 
It means "double ended queue" and is in general an `Iterable` that you can append values to either side or pop values from either side.

The init signature is straightforward enough and I'm sure there's more to them than I know yet but here's how I use it...

```python
from collections import deque

my_deque = deque([1,2,3])
```

This gives us `my_deque`, created from an iterable, with several familiar methods like `index`, `extend`, `append`, etc.
However there's some new ones too such as `appendleft` and `popleft`.

```python
my_deque.appendleft('a')
print(my_dequqe)
>>> deque(['a', 1, 2, 3])

my_deque.popleft()
>>> 'a'
print(my_deque)
>>> deque([1, 2, 3])
```

These are handy ways to manipulate the iterable that I needed for the arrays I plot with plotly!


__See my follow-up to this on using Deques with plotly and streamlit to create a quick "dashboard" with live streaming data!__

[follow-up](/plotly-and-streamlit)
