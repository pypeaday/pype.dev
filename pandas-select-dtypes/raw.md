---
templateKey: til
tags: ['python', 'tech']
title: Pandas-Select-Dtypes
date: 2022-03-05T00:00:00
published: True
cover: "media/pandas-select-dtypes.png"

---

On my team we often have to change data types of columns in a `pandas.DataFrame` for a variety of reasons.
The main one is it tends to be an artifact of EDA whereby a file is read in via `pandas` but the data types are somewhat wonky (ie. dates show up as strings, or a column that *should* be a integer comes in as float, etc.).
The best solution I think is to leverage the `dtypes` keyword argument in which `pd.read_X` method is used. 
However there is another way which is to coerce the data types at runtime instead of loadtime.

A handy way to do this is by using `pandas.DataFrame.select_dtypes`...

Here is an example of finding columns read in as `datetime64` and the developer would prefer to use pandas datetimes.

```python
df = pd.read_csv("./file-with-confusing-dtypes.csv")
for c in df.columns:
    if df[c].dtype == "datetime64":
        df[c] = pd.to_datetime(df.c)

```

Here is the difference in code flow between `select_dtypes` and manually finding the `datetype64` columns:

```python
df = pd.read_csv("./file-with-confusing-dtypes.csv")
for c in df.select_dtypes('datetime64'):
    df[c] = pd.to_datetime(df.c)

```


The difference isn't huge but it's the little steps in leveling up that turn script-kitty scripts into clean looking functions.
