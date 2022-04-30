---
templateKey: til
tags: ['python']
title: Unpack-Anywhere-With-Star
date: 2022-04-24T00:00:00
status: published
cover: "/static/unpack-anywhere-with-star.png"

---


Unpacking iterables in python with `*` is a pretty handy trick for writing code that is just a tiny bit more pythonic than not.

```python
arr: Tuple[Union[int, str]] = (1, 2, 3, 'a', 'b', 'c')


print(arr)
>>> (1, 2, 3, 'a', 'b', 'c')

# the * unpacks the tuple into the individual elements
print(*arr)
>>> 1, 2, 3, 'a', 'b', 'c'

x, y, z, *alphas = arr

# x = 1, y = 2, z = 3
# alphas = [ 'a', 'b', 'c' ]

```

But [@Ned Batchelder](https://twitter.com/nedbat) showed me via Twitter than you can arbitrarily unpack arguments based on position - it doesn't have to be done at the beginning or the end!

```python
x, y, *mixed, alpha = arr

# x = 1, y = 2
# mixed = [3, 'a', 'b']
# alpha = 'c'
```

I'm not entirely sure when I'll need this but it definitley shows me another example of how flexible python is!

