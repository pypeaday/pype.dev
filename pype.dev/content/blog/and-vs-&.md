---
templateKey: blog-post
tags: ['python', 'tech']
title: And-vs-&
date: 2022-04-06T00:00:00
published: True
cover: "media/And-vs-ampersand.png"

---

I often struggle to remember the correct way to do `and` type comparisons when working in pandas.

I remember learning long long ago that `and` and `&` are different, the former being lazy boolean evaluation whereas the latter is a bitwise operation.

__I learned a lot from [this SO post](https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump)__

## Lists 

Python `list` objects can contain unlike elements - ie. `[True, 'foo', 1, '1', [1,2,3]]` is a valid list with booleans, strings, integers, and another list.
Because of this, we can't use `&` to compare two lists since they can't be combined in a consistent and meaningful way.

However we can use `and` since it doesn't do bitwise operations, it just evaluates the boolean value of the list (basically if it's non-empty then `bool(my_list)` evaluates to `True`)

Here's an example:

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ my_list = [1, "2", "foo", [True], False]

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ bool(my_list)
True
```


If we compare `my_list` with `another_list` using `and` then the comparision will go:

```
if bool(my_list):
    if bool(another_list):
       <operation> 
    else:
       break
```

Let's see another example:

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ another_list = [False, False]

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ my_list and another_list
[False, False]
```


`bool(my_list)` evaluated to `True`, and `bool(another_list)` _also_ evaluated to `True` even though it's full of `False` values because the object is non-empty.


```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if my_list and another_list:
...:     print("foo")
foo
```

So using `and` in this case results in a `True` conditional, so the `print` statement is executed.

Feels kind of counter-intuitive at first glance, to me anyways...

However, we can't use `&` because there isn't a meaningful to do bitwise operations over these two lists:

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ my_list & another_list
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-19-a2a16cebb3da>:1 in <cell line: 1>                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
TypeError: unsupported operand type(s) for &: 'list' and 'list'

```

## Numpy

`numpy` arrays are special and they have a lot of fancy vectorization utilities built-in which make them great and fast for mathematical operations but now our logical comparisons need to be handled with a different kind of care.

First thing though - without some trickery they do not hold mixed data types like a `list` does (necessary, I think, for the vectorized optimization that numpy is built on top of)

With that out of the way here's the main thing for this post, we can't just evaluate the `bool` of an array - numpy says no no no.

```python

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ arr = np.array(["1", 2, True, False])

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ arr
array(['1', '2', 'True', 'False'], dtype='<U21')

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ bool(arr)
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-25-4e8c5dd85b93>:1 in <cell line: 1>                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()

```

> This means that using `and` with `numpy` arrays doesn't really make sense because we probably care about the truth value of each element (bitwise), not the truth value of the array.

Notice that when I print `arr` all the elements are a string - and the `dtype` is `<U21` for all elements.

This is not how I instantiated the array so be aware of that behavior with numpy.

> `<U21` is a dtype expressing the values are 'Little Endian', Unicode, 12 characters. See [here](https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types) for docs for docs

So for logical comparisions we should look at the error message then...
Our handy error message says to try `any` or `all`

Because the datatypes in this example are basically strings, using `arr.any()` will result in an error that I do not fully understand, but `any(arr)` and `all(arr)` work...

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if arr.any():
...:     print("foo")
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-48-25ecac52db96>:1 in <cell line: 1>                                              │
│ /home/u_paynen3/personal/sandbox/.venv/sandbox/lib/python3.8/site-packages/numpy/core/_methods.p │
│ y:57 in _any                                                                                     │
│                                                                                                  │
│    54 def _any(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True):               │
│    55 │   # Parsing keyword arguments is currently fairly slow, so avoid it for now              │
│    56 │   if where is True:                                                                      │
│ ❱  57 │   │   return umr_any(a, axis, dtype, out, keepdims)                                      │
│    58 │   return umr_any(a, axis, dtype, out, keepdims, where=where)                             │
│    59                                                                                            │
│    60 def _all(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True):               │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
UFuncTypeError: ufunc 'logical_or' did not contain a loop with signature matching types (None, <class 'numpy.dtype[str_]'>) -> None

sandbox NO VCS  via 3.8.11(sandbox) ipython

❯ if all(arr):
...:     print("foo")
foo

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if any(arr):
...:     print("foo")
foo
```

Let's change the example to just use integers and see what happens:

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ arr2 = np.array([1, True, False])

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ arr2
array([1, 1, 0])

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if arr2.any():
...:     print("foo")
foo

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if arr2.all():
...:     print("foo")

```

Ah, now some sanity...
First, the booleans are stored as integers, which based on this discussion makes sense.
Next we check if `any` values (this is a bitwise operation) are `True`, which we see they are so the conditional evaluates to `True`.
Howver, if we check that `all` values are `True` we see they aren't, the last value is `False` or `0` so the conditional fails.

This is a different way to evaluate logical conditions than with lists and it's because of the special nature of numpy arrays that allows them to be compared bitwise but on the flip side, there isn't a meaningful way to evaluate the `truth value` of an array.


## Pandas

Now for `pandas`, which under the hood is a lot of `numpy` but not fully. 
`pandas.Series` objects can hold mixed data types like lists, however to logically evaluate truth values we have to treat them like numpy arrays.

```python

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ s = pd.Series([1, "foo", True, False])

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ s

0        1
1      foo
2     True
3    False
dtype: object

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ bool(s)
╭─────────────────────────────── Traceback (most recent call last) ────────────────────────────────╮
│ <ipython-input-60-68e48e81da14>:1 in <cell line: 1>                                              │
│ /home/u_paynen3/personal/sandbox/.venv/sandbox/lib/python3.8/site-packages/pandas/core/generic.p │
│ y:1527 in __nonzero__                                                                            │
│                                                                                                  │
│    1524 │                                                                                        │
│    1525 │   @final                                                                               │
│    1526 │   def __nonzero__(self):                                                               │
│ ❱  1527 │   │   raise ValueError(                                                                │
│    1528 │   │   │   f"The truth value of a {type(self).__name__} is ambiguous. "                 │
│    1529 │   │   │   "Use a.empty, a.bool(), a.item(), a.any() or a.all()."                       │
│    1530 │   │   )                                                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────╯
ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().

```

Just like with numpy, we can't evaluate the truth value of the series in a meaningful way, but bitwise operations make perfect sense...

```python

❯ if s.any():
...:     print("foo")
foo

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ if s.all():
...:     print("foo")

```

__I thought this was about `and` and `&`...__

Right, so recall that `and` is a lazy boolean evaluation (ie. it evaluates the 'truth value' an object) whereas `&` does bitwise comparison.

What we see then with `pandas` and `numpy` is that if we want to do logical comparisons, we need to do them bitwise, ie. use `&`.

Keep in mind though that the data types make a big deal - we can't use `&` with strings  because the bitwise operation isn't supported, for strings we need to use the boolean evaluation.


## The Original Point

My main use case for this is finding elements in a dataframe/series based on 2 or more columns aligning row values...


Say I have a dataframe like this:
```python

sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ df

   s s2   s3
0  1  0  foo
1  1  a  bar
2  1  b  baz
3  2  a  fee
4  2  0   fi
```

Example use case is I want to get the values in `s3` where `s` is 1 and `s2` is 'a'. ie. I'm just after `bar` for now...

Up until now I've always just tried `df.s3[(df.s == 1) and (df.s2 == "a")]` the first time and every single time I've gotten this error that I just haven't ever fully understood:

```python
ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().
```

But after this deep dive I think I've grasped that `and` doesn't actually do what I want here, and in order to do the bitwise comparision I need to use `&`

```python
sandbox NO VCS  via 3.8.11(sandbox) ipython
❯ df.s3[(df.s == 1) & (df.s2 == "a")]

1    bar
Name: s3, dtype: object
```

## End

Hopefully this set of ramblings brings some clarity to `and` and `&` and you can Google one less error in the future in your logical comparison workflows 😄
