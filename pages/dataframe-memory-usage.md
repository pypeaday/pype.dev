---
templateKey: til
tags: ['python']
title: Dataframe-Memory-Usage
date: 2022-03-07T00:00:00
status: draft
cover: "/static/dataframe-memory-usage.png"

---


I have often wanted to dive into memory usage for pandas DataFrames when it comes to cloud deployment.
If I have a python process running on a server at home I can use `glances` or a number of other tools to diagnose a memory issue...
However at work I normally deploy dockerized processes on AWS Batch and it's much more challenging to get info on the dockerized process without more AWS integration that my team isn't quite ready for.
So TIL that I can get some of the info I want from pandas directly!

# DataFrame.info()

I didn't realize that `df.info()` was able to give me more info than just dtypes and some summary stats...
There is a kwarg `memory_usage` that can configure what you need to get back, so `df.memory_usage="deep"` will give you how much RAM any given DataFrame is using!
Amazing tool for finding issues with joins or renegade source data files.

```python
df = pd.read_csv("cars.csv")

df.info(memory_usage="deep")
```

![Alt text](/images/df-memory-usage.png "DF memory")
