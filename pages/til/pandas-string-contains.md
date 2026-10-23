---
templateKey: til
tags: [ 'python', 'tech', 'til']
title: Pandas-String-Contains
date: 2022-05-02T00:00:00
published: True
#cover: "media/pandas-string-contains.png"
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011090430_a85d07d5.png"
---

# TL;DR 

`pandas.Series.str.contains` accepts regular expressions and this is turned on by __default__!

# Use case

We often need to filter pandas DataFrames based on several string values in a Series.

> Notice that sweet pyflyby import 😁!

```python
sandbox   main via 3.8.11(sandbox) ipython
❯ df = pd.DataFrame({"A": ["string1", "string2", "string3"]})
[PYFLYBY] import pandas as pd

sandbox   main via 3.8.11(sandbox) ipython
❯ df

         A
0  string1
1  string2
2  string3

sandbox   main via 3.8.11(sandbox) ipython
❯ df[df.A.str.contains('1') | df.A.str.contains('2')]

         A
0  string1
1  string2

```

And this isn't the worst thing in the world, especially for such a tiny example...

But what if we had dozens or more values to filter on?

Then it looks so much nicer to create an iterable of the values we want to filter on and join them with an apropriate regex operator (in this case `|` for _inclusive or_)

```python

sandbox   main via 3.8.11(sandbox) ipython
❯ vals = ["1", "2"]  # iterable with whatever is appropriate for your use case

sandbox   main via 3.8.11(sandbox) ipython
❯ df[df.A.str.contains("|".join(vals), regex=True)]

         A
0  string1
1  string2

```

# Fin

This is a super nice and concise way to do the kind of filtering my team does on a daily basis!
