---
date: 2025-05-26 09:08:08
templateKey: til
title: Pandas.DataFrame info always answers and is sometimes right
published: True
tags:
  - python
  - tech

---

# TIL

Today I learned that the `.info()` of a `pandas.DataFrame` will always
give you an answer, but it is wildly difficult to know how accurate it is, because it depends
on the underlying data types.
If everything is a NumPy Dtype, then the result you get is the amount of memory NumPy is using
under the hood, which is very accurate.
But as soon as you have something like a Python string in the data frame, now pandas will
tell you how much memory the NumPy data types are using, and it will give you some quick
estimate of how much memory space the Python string types are using because numpy is just storing 
a pointer to that data in memory, but this is far less
accurate because it doesn't actually know what the strings are.

## Memory Usage Deep or True

To get an honest answer about a DataFrame's memory usage, you need to pass `memory_usage='deep'` to the `.info()` method. 

```bash
# This is the default
In [50]: df.info(memory_usage=True)
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 10 entries, 0 to 9
Data columns (total 3 columns):
 #   Column  Non-Null Count  Dtype 
---  ------  --------------  ----- 
 0   s1      10 non-null     int64 
 1   s2      10 non-null     int64 
 2   s3      10 non-null     object
dtypes: int64(2), object(1)
memory usage: 372.0+ bytes
```

Notice that the memory usage has a `+` in it? You can force a deeper analysis by passing `memory_usage='deep'`

```bash
In [51]: df.info(memory_usage='deep')
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 10 entries, 0 to 9
Data columns (total 3 columns):
 #   Column  Non-Null Count  Dtype 
---  ------  --------------  ----- 
 0   s1      10 non-null     int64 
 1   s2      10 non-null     int64 
 2   s3      10 non-null     object
dtypes: int64(2), object(1)
memory usage: 792.0 bytes
```


