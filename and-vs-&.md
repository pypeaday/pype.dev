---
content: "I often struggle to remember the correct way to do `and` type comparisons
  when working in pandas.\n\nI remember learning long long ago that `and` and `&`
  are different, the former being lazy boolean evaluation whereas the latter is a
  bitwise operation.\n\n__I learned a lot from [this SO post](https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump)__\n\n##
  Lists \n\nPython `list` objects can contain unlike elements - ie. `[True, 'foo',
  1, '1', [1,2,3]]` is a valid list with booleans, strings, integers, and another
  list.\nBecause of this, we can't use `&` to compare two lists since they can't be
  combined in a consistent and meaningful way.\n\nHowever we can use `and` since it
  doesn't do bitwise operations, it just evaluates the boolean value of the list (basically
  if it's non-empty then `bool(my_list)` evaluates to `True`)\n\nHere's an example:\n\n```python\nsandbox
  NO VCS  via 3.8.11(sandbox) ipython\n\u276F my_list = [1, \"2\", \"foo\", [True],
  False]\n\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F bool(my_list)\nTrue\n```\n\n\nIf
  we compare `my_list` with `another_list` using `and` then the comparision will go:\n\n```\nif
  bool(my_list):\n    if bool(another_list):\n       <operation> \n    else:\n       break\n```\n\nLet's
  see another example:\n\n```python\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F
  another_list = [False, False]\n\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F
  my_list and another_list\n[False, False]\n```\n\n\n`bool(my_list)` evaluated to
  `True`, and `bool(another_list)` _also_ evaluated to `True` even though it's full
  of `False` values because the object is non-empty.\n\n\n```python\nsandbox NO VCS
  \ via 3.8.11(sandbox) ipython\n\u276F if my_list and another_list:\n...:     print(\"foo\")\nfoo\n```\n\nSo
  using `and` in this case results in a `True` conditional, so the `print` statement
  is executed.\n\nFeels kind of counter-intuitive at first glance, to me anyways...\n\nHowever,
  we can't use `&` because there isn't a meaningful to do bitwise operations over
  these two lists:\n\n```python\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F
  my_list & another_list\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  Traceback (most recent call last) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\n\u2502
  <ipython-input-19-a2a16cebb3da>:1 in <cell line: 1>                                              \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\nTypeError:
  unsupported operand type(s) for &: 'list' and 'list'\n\n```\n\n## Numpy\n\n`numpy`
  arrays are special and they have a lot of fancy vectorization utilities built-in
  which make them great and fast for mathematical operations but now our logical comparisons
  need to be handled with a different kind of care.\n\nFirst thing though - without
  some trickery they do not hold mixed data types like a `list` does (necessary, I
  think, for the vectorized optimization that numpy is built on top of)\n\nWith that
  out of the way here's the main thing for this post, we can't just evaluate the `bool`
  of an array - numpy says no no no.\n\n```python\n\nsandbox NO VCS  via 3.8.11(sandbox)
  ipython\n\u276F arr = np.array([\"1\", 2, True, False])\n\nsandbox NO VCS  via 3.8.11(sandbox)
  ipython\n\u276F arr\narray(['1', '2', 'True', 'False'], dtype='<U21')\n\nsandbox
  NO VCS  via 3.8.11(sandbox) ipython\n\u276F bool(arr)\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  Traceback (most recent call last) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\n\u2502
  <ipython-input-25-4e8c5dd85b93>:1 in <cell line: 1>                                              \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\nValueError:
  The truth value of an array with more than one element is ambiguous. Use a.any()
  or a.all()\n\n```\n\n> This means that using `and` with `numpy` arrays doesn't really
  make sense because we probably care about the truth value of each element (bitwise),
  not the truth value of the array.\n\nNotice that when I print `arr` all the elements
  are a string - and the `dtype` is `<U21` for all elements.\n\nThis is not how I
  instantiated the array so be aware of that behavior with numpy.\n\n> `<U21` is a
  dtype expressing the values are 'Little Endian', Unicode, 12 characters. See [here](https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types)
  for docs for docs\n\nSo for logical comparisions we should look at the error message
  then...\nOur handy error message says to try `any` or `all`\n\nBecause the datatypes
  in this example are basically strings, using `arr.any()` will result in an error
  that I do not fully understand, but `any(arr)` and `all(arr)` work...\n\n```python\nsandbox
  NO VCS  via 3.8.11(sandbox) ipython\n\u276F if arr.any():\n...:     print(\"foo\")\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  Traceback (most recent call last) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\n\u2502
  <ipython-input-48-25ecac52db96>:1 in <cell line: 1>                                              \u2502\n\u2502
  /home/u_paynen3/personal/sandbox/.venv/sandbox/lib/python3.8/site-packages/numpy/core/_methods.p
  \u2502\n\u2502 y:57 in _any                                                                                     \u2502\n\u2502
  \                                                                                                 \u2502\n\u2502
  \   54 def _any(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True):
  \              \u2502\n\u2502    55 \u2502   # Parsing keyword arguments is currently
  fairly slow, so avoid it for now              \u2502\n\u2502    56 \u2502   if where
  is True:                                                                      \u2502\n\u2502
  \u2771  57 \u2502   \u2502   return umr_any(a, axis, dtype, out, keepdims)                                      \u2502\n\u2502
  \   58 \u2502   return umr_any(a, axis, dtype, out, keepdims, where=where)                             \u2502\n\u2502
  \   59                                                                                            \u2502\n\u2502
  \   60 def _all(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True):
  \              \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\nUFuncTypeError:
  ufunc 'logical_or' did not contain a loop with signature matching types (None, <class
  'numpy.dtype[str_]'>) -> None\n\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\n\u276F
  if all(arr):\n...:     print(\"foo\")\nfoo\n\nsandbox NO VCS  via 3.8.11(sandbox)
  ipython\n\u276F if any(arr):\n...:     print(\"foo\")\nfoo\n```\n\nLet's change
  the example to just use integers and see what happens:\n\n```python\nsandbox NO
  VCS  via 3.8.11(sandbox) ipython\n\u276F arr2 = np.array([1, True, False])\n\nsandbox
  NO VCS  via 3.8.11(sandbox) ipython\n\u276F arr2\narray([1, 1, 0])\n\nsandbox NO
  VCS  via 3.8.11(sandbox) ipython\n\u276F if arr2.any():\n...:     print(\"foo\")\nfoo\n\nsandbox
  NO VCS  via 3.8.11(sandbox) ipython\n\u276F if arr2.all():\n...:     print(\"foo\")\n\n```\n\nAh,
  now some sanity...\nFirst, the booleans are stored as integers, which based on this
  discussion makes sense.\nNext we check if `any` values (this is a bitwise operation)
  are `True`, which we see they are so the conditional evaluates to `True`.\nHowver,
  if we check that `all` values are `True` we see they aren't, the last value is `False`
  or `0` so the conditional fails.\n\nThis is a different way to evaluate logical
  conditions than with lists and it's because of the special nature of numpy arrays
  that allows them to be compared bitwise but on the flip side, there isn't a meaningful
  way to evaluate the `truth value` of an array.\n\n\n## Pandas\n\nNow for `pandas`,
  which under the hood is a lot of `numpy` but not fully. \n`pandas.Series` objects
  can hold mixed data types like lists, however to logically evaluate truth values
  we have to treat them like numpy arrays.\n\n```python\n\nsandbox NO VCS  via 3.8.11(sandbox)
  ipython\n\u276F s = pd.Series([1, \"foo\", True, False])\n\nsandbox NO VCS  via
  3.8.11(sandbox) ipython\n\u276F s\n\n0        1\n1      foo\n2     True\n3    False\ndtype:
  object\n\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F bool(s)\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  Traceback (most recent call last) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\n\u2502
  <ipython-input-60-68e48e81da14>:1 in <cell line: 1>                                              \u2502\n\u2502
  /home/u_paynen3/personal/sandbox/.venv/sandbox/lib/python3.8/site-packages/pandas/core/generic.p
  \u2502\n\u2502 y:1527 in __nonzero__                                                                            \u2502\n\u2502
  \                                                                                                 \u2502\n\u2502
  \   1524 \u2502                                                                                        \u2502\n\u2502
  \   1525 \u2502   @final                                                                               \u2502\n\u2502
  \   1526 \u2502   def __nonzero__(self):                                                               \u2502\n\u2502
  \u2771  1527 \u2502   \u2502   raise ValueError(                                                                \u2502\n\u2502
  \   1528 \u2502   \u2502   \u2502   f\"The truth value of a {type(self).__name__}
  is ambiguous. \"                 \u2502\n\u2502    1529 \u2502   \u2502   \u2502
  \  \"Use a.empty, a.bool(), a.item(), a.any() or a.all().\"                       \u2502\n\u2502
  \   1530 \u2502   \u2502   )                                                                                \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\nValueError:
  The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any()
  or a.all().\n\n```\n\nJust like with numpy, we can't evaluate the truth value of
  the series in a meaningful way, but bitwise operations make perfect sense...\n\n```python\n\n\u276F
  if s.any():\n...:     print(\"foo\")\nfoo\n\nsandbox NO VCS  via 3.8.11(sandbox)
  ipython\n\u276F if s.all():\n...:     print(\"foo\")\n\n```\n\n__I thought this
  was about `and` and `&`...__\n\nRight, so recall that `and` is a lazy boolean evaluation
  (ie. it evaluates the 'truth value' an object) whereas `&` does bitwise comparison.\n\nWhat
  we see then with `pandas` and `numpy` is that if we want to do logical comparisons,
  we need to do them bitwise, ie. use `&`.\n\nKeep in mind though that the data types
  make a big deal - we can't use `&` with strings  because the bitwise operation isn't
  supported, for strings we need to use the boolean evaluation.\n\n\n## The Original
  Point\n\nMy main use case for this is finding elements in a dataframe/series based
  on 2 or more columns aligning row values...\n\n\nSay I have a dataframe like this:\n```python\n\nsandbox
  NO VCS  via 3.8.11(sandbox) ipython\n\u276F df\n\n   s s2   s3\n0  1  0  foo\n1
  \ 1  a  bar\n2  1  b  baz\n3  2  a  fee\n4  2  0   fi\n```\n\nExample use case is
  I want to get the values in `s3` where `s` is 1 and `s2` is 'a'. ie. I'm just after
  `bar` for now...\n\nUp until now I've always just tried `df.s3[(df.s == 1) and (df.s2
  == \"a\")]` the first time and every single time I've gotten this error that I just
  haven't ever fully understood:\n\n```python\nValueError: The truth value of a Series
  is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().\n```\n\nBut after
  this deep dive I think I've grasped that `and` doesn't actually do what I want here,
  and in order to do the bitwise comparision I need to use `&`\n\n```python\nsandbox
  NO VCS  via 3.8.11(sandbox) ipython\n\u276F df.s3[(df.s == 1) & (df.s2 == \"a\")]\n\n1
  \   bar\nName: s3, dtype: object\n```\n\n## End\n\nHopefully this set of ramblings
  brings some clarity to `and` and `&` and you can Google one less error in the future
  in your logical comparison workflows \U0001F604"
date: 2022-04-06
description: I often struggle to remember the correct way to do `and` type comparisons
  when working in pandas. I remember learning long long ago that `and` and `&amp;`
  are d
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>And-vs-&</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I often struggle to remember the correct
    way to do `and` type comparisons when working in pandas. I remember learning long
    long ago that `and` and `&amp;` are d\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"And-vs-& | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/and-vs\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"And-vs-&
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I often struggle
    to remember the correct way to do `and` type comparisons when working in pandas.
    I remember learning long long ago that `and` and `&amp;` are d\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"terminal-page\">\n
    \   <main class=\"terminal-page__main\">\n        <div class=\"terminal-page__content\">\n<header
    class=\"site-terminal\">\n\n    <div class=\"site-terminal__bar\">\n        <div
    class=\"site-terminal__lights\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n
    \       <div class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/and-vs</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header>    <div class=\"post-terminal__search\">\n<div
    id='didyoumean'>\n    <div class=\"mb-0\">\n        <!-- <label for=\"search\"
    class=\"block text-sm font-medium mb-2\">Search for a page</label> -->\n        <input
    type=\"text\" id=\"search\"\n               class=\"w-full p-2 border rounded-md
    bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/'
    Search for a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
    gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
    class='grid gap-4'>\n        <!-- Results will be populated here -->\n    </ul>\n</div>\n<script
    type='module'>\n// All available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
    filter=config.didyoumean_filter, sort='True')|tojson;\n    // fetch pages from
    config.output_dir / didyoumean.json\n\n    const pages = await fetch('/didyoumean.json').then(response
    => response.json());\n    const populate_search_input = false\n    const search_hotkey
    = \"/\"\n\n// Get current path from URL, removing leading/trailing slashes\n    if
    (populate_search_input) {\n        const currentPath = window.location.pathname.replace(/^\\/|\\/$/g,
    '');\n        document.getElementById('search').value = currentPath;\n    }\n\n//
    Search across all fields in an object\n    function searchObject(needle, obj)
    {\n        needle = needle.toLowerCase();\n        let score = 0;\n\n    // Helper
    to search a single field\n        const searchField = (value) => {\n            if
    (!value) return 0;\n            value = String(value).toLowerCase();\n\n            //
    Exact matches\n            if (value === needle) return 15;\n\n            //
    Word boundary matches (complete words)\n            if (value.match(new RegExp(`\\\\b${needle}\\\\b`)))
    return 10;\n\n            // Contains full search term\n            if (value.includes(needle))
    return 8;\n\n            // Most parts match (for multi-word searches)\n            const
    needleParts = needle.split(/\\W+/).filter(p => p.length > 2);\n            const
    valueParts = value.split(/\\W+/).filter(p => p.length > 2);\n\n            if
    (needleParts.length === 0) return 0;\n\n            let matchCount = 0;\n            for
    (const part of needleParts) {\n                for (const valuePart of valueParts)
    {\n                    if (valuePart.includes(part) || part.includes(valuePart))
    {\n                        matchCount++;\n                        break;\n                    }\n
    \               }\n            }\n\n            // Only count if most parts match\n
    \           const matchRatio = matchCount / needleParts.length;\n            if
    (matchRatio >= 0.75) {\n                return matchRatio * 6;\n            }\n\n
    \           return 0;\n        };\n\n    // Search each field with different weights\n
    \       const slugScore = searchField(obj.slug) * 3;  // Slug is most important\n
    \       const titleScore = searchField(obj.title) * 2;  // Title is next\n        const
    descScore = searchField(obj.description) * 1;  // Description\n        const tagScore
    = (obj.tags || []).reduce((sum, tag) => sum + searchField(tag), 0);  // Tags\n\n
    \       score = slugScore + titleScore + descScore + tagScore;\n\n    // Path
    segment matches for slug (only if we have some other match)\n        if (score
    > 0 && obj.slug) {\n            const inputParts = needle.split('/').filter(p
    => p.length > 0);\n            const slugParts = obj.slug.toLowerCase().split('/');\n\n
    \           // Bonus for matching path structure\n            for (let i = 0;
    i < inputParts.length && i < slugParts.length; i++) {\n                if (slugParts[i].includes(inputParts[i]))
    {\n                    score += 5;  // Matching segments in order is valuable\n
    \               }\n            }\n        }\n\n        return score;\n    }\n\n//
    Find similar pages\n    function findSimilar(input) {\n        if (!input || input.length
    < 2) return [];\n        const normalizedInput = input.toLowerCase().trim();\n\n
    \   // Score each page\n        const scored = pages.map(page => ({\n            ...page,\n
    \           score: searchObject(normalizedInput, page)\n        }));\n\n    //
    Sort by score (higher is better) and take top matches\n        return scored\n
    \           .sort((a, b) => b.score - a.score)\n            .slice(0, 12)  //
    Show more results in the grid\n            .filter(item => item.score > 15); //
    Only show strong matches\n    }\n\n// Update results in the DOM\n    function
    updateResults(results) {\n        const resultsDiv = document.getElementById('didyoumean_results');\n\n
    \       if (results.length === 0) {\n            resultsDiv.innerHTML = '<p class=\"text-gray-500
    col-span-full text-center py-8\">No similar pages found.</p>';\n            return;\n
    \       }\n\n        const html = results.map(page => `\n        <li class=\"p-4
    bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow first:mt-4\">\n
    \           <a href=\"/${page.slug}\" class=\"block\">\n                <h3 class=\"text-lg
    font-semibold text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300
    mb-2\">\n                    ${page.title || page.slug}\n                </h3>\n
    \               ${page.description ? `\n            <p class=\"text-sm text-gray-600
    dark:text-gray-300 mb-3 line-clamp-2\">\n            ${page.description}\n            </p>\n
    \           ` : ''}\n                <div class=\"flex flex-wrap gap-2 text-xs
    text-gray-500 dark:text-gray-400\">\n                </div>\n                ${page.tags
    && page.tags.length > 0 ? `\n            <div class=\"mt-3 flex flex-wrap gap-2\">\n
    \           ${page.tags.map(tag => `\n                            <span class=\"px-2
    py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs\">\n                                ${tag}\n
    \                           </span>\n                        `).join('')}\n            </div>\n
    \           ` : ''}\n            </a>\n        </li>\n    `).join('');\n\n        resultsDiv.innerHTML
    = html;\n    }\n\n// Set up hotkey for search if configured\n    if (search_hotkey)
    {\n        document.addEventListener('keydown', (e) => {\n            // Don't
    trigger if user is typing in an input or textarea\n            if (e.target.tagName
    === 'INPUT' || e.target.tagName === 'TEXTAREA') {\n                return;\n            }\n\n
    \           // Check if the pressed key matches the hotkey\n            if (e.key
    === search_hotkey) {\n                e.preventDefault();  // Prevent the '/'
    from being typed\n                const searchInput = document.getElementById('search');\n
    \               searchInput.focus();\n                searchInput.select();  //
    Select any existing text\n            }\n        });\n    }\n\n// Set up search
    input handler with debounce\n    let debounceTimeout;\n    const searchInput =
    document.getElementById('search');\n    searchInput.addEventListener('input',
    (e) => {\n        clearTimeout(debounceTimeout);\n        debounceTimeout = setTimeout(()
    => {\n            const results = findSimilar(e.target.value);\n            updateResults(results);\n
    \       }, 100);\n    });\n\n// Initial search with current path\n    if (populate_search_input)
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    </div>\n<section
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">And-vs-&</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-06\">\n            April
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I often struggle to remember the correct
    way to do <code>and</code> type comparisons when working in pandas.</p>\n<p>I
    remember learning long long ago that <code>and</code> and <code>&amp;</code> are
    different, the former being lazy boolean evaluation whereas the latter is a bitwise
    operation.</p>\n<p><strong>I learned a lot from <a href=\"https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump\">this
    SO post</a></strong></p>\n<h2 id=\"lists\">Lists <a class=\"header-anchor\" href=\"#lists\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Python <code>list</code>
    objects can contain unlike elements - ie. <code>[True, 'foo', 1, '1', [1,2,3]]</code>
    is a valid list with booleans, strings, integers, and another list.\nBecause of
    this, we can't use <code>&amp;</code> to compare two lists since they can't be
    combined in a consistent and meaningful way.</p>\n<p>However we can use <code>and</code>
    since it doesn't do bitwise operations, it just evaluates the boolean value of
    the list (basically if it's non-empty then <code>bool(my_list)</code> evaluates
    to <code>True</code>)</p>\n<p>Here's an example:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">my_list</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;2&quot;</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">,</span>
    <span class=\"p\">[</span><span class=\"kc\">True</span><span class=\"p\">],</span>
    <span class=\"kc\">False</span><span class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"nb\">bool</span><span class=\"p\">(</span><span class=\"n\">my_list</span><span
    class=\"p\">)</span>\n<span class=\"kc\">True</span>\n</pre></div>\n\n</pre>\n\n<p>If
    we compare <code>my_list</code> with <code>another_list</code> using <code>and</code>
    then the comparision will go:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>if bool(my_list):\n    if
    bool(another_list):\n       &lt;operation&gt; \n    else:\n       break\n</pre></div>\n\n</pre>\n\n<p>Let's
    see another example:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">another_list</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"kc\">False</span><span
    class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
    <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
    class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span>
    <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span> <span class=\"n\">my_list</span>
    <span class=\"ow\">and</span> <span class=\"n\">another_list</span>\n<span class=\"p\">[</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"kc\">False</span><span
    class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<p><code>bool(my_list)</code>
    evaluated to <code>True</code>, and <code>bool(another_list)</code> <em>also</em>
    evaluated to <code>True</code> even though it's full of <code>False</code> values
    because the object is non-empty.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">my_list</span> <span class=\"ow\">and</span>
    <span class=\"n\">another_list</span><span class=\"p\">:</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n</pre></div>\n\n</pre>\n\n<p>So
    using <code>and</code> in this case results in a <code>True</code> conditional,
    so the <code>print</code> statement is executed.</p>\n<p>Feels kind of counter-intuitive
    at first glance, to me anyways...</p>\n<p>However, we can't use <code>&amp;</code>
    because there isn't a meaningful to do bitwise operations over these two lists:</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">my_list</span> <span class=\"o\">&amp;</span> <span class=\"n\">another_list</span>\n<span
    class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">19</span><span class=\"o\">-</span><span class=\"n\">a2a16cebb3da</span><span
    class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
    class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">cell</span>
    <span class=\"n\">line</span><span class=\"p\">:</span> <span class=\"mi\">1</span><span
    class=\"o\">&gt;</span>                                              <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">TypeError</span><span class=\"p\">:</span> <span class=\"n\">unsupported</span>
    <span class=\"n\">operand</span> <span class=\"nb\">type</span><span class=\"p\">(</span><span
    class=\"n\">s</span><span class=\"p\">)</span> <span class=\"k\">for</span> <span
    class=\"o\">&amp;</span><span class=\"p\">:</span> <span class=\"s1\">&#39;list&#39;</span>
    <span class=\"ow\">and</span> <span class=\"s1\">&#39;list&#39;</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"numpy\">Numpy <a class=\"header-anchor\" href=\"#numpy\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>numpy</code> arrays
    are special and they have a lot of fancy vectorization utilities built-in which
    make them great and fast for mathematical operations but now our logical comparisons
    need to be handled with a different kind of care.</p>\n<p>First thing though -
    without some trickery they do not hold mixed data types like a <code>list</code>
    does (necessary, I think, for the vectorized optimization that numpy is built
    on top of)</p>\n<p>With that out of the way here's the main thing for this post,
    we can't just evaluate the <code>bool</code> of an array - numpy says no no no.</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span
    class=\"o\">.</span><span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"s2\">&quot;1&quot;</span><span class=\"p\">,</span> <span class=\"mi\">2</span><span
    class=\"p\">,</span> <span class=\"kc\">True</span><span class=\"p\">,</span>
    <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr</span>\n<span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"s1\">&#39;1&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;2&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;True&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;False&#39;</span><span class=\"p\">],</span> <span class=\"n\">dtype</span><span
    class=\"o\">=</span><span class=\"s1\">&#39;&lt;U21&#39;</span><span class=\"p\">)</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"nb\">bool</span><span class=\"p\">(</span><span
    class=\"n\">arr</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">25</span><span class=\"o\">-</span><span class=\"mf\">4e8</span><span
    class=\"n\">c5dd85b93</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
    <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
    <span class=\"n\">an</span> <span class=\"n\">array</span> <span class=\"k\">with</span>
    <span class=\"n\">more</span> <span class=\"n\">than</span> <span class=\"n\">one</span>
    <span class=\"n\">element</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
    class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
    class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<blockquote>\n<p>This
    means that using <code>and</code> with <code>numpy</code> arrays doesn't really
    make sense because we probably care about the truth value of each element (bitwise),
    not the truth value of the array.</p>\n</blockquote>\n<p>Notice that when I print
    <code>arr</code> all the elements are a string - and the <code>dtype</code> is
    <code>&lt;U21</code> for all elements.</p>\n<p>This is not how I instantiated
    the array so be aware of that behavior with numpy.</p>\n<blockquote>\n<p><code>&lt;U21</code>
    is a dtype expressing the values are 'Little Endian', Unicode, 12 characters.
    See <a href=\"https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types\">here</a>
    for docs for docs</p>\n</blockquote>\n<p>So for logical comparisions we should
    look at the error message then...\nOur handy error message says to try <code>any</code>
    or <code>all</code></p>\n<p>Because the datatypes in this example are basically
    strings, using <code>arr.any()</code> will result in an error that I do not fully
    understand, but <code>any(arr)</code> and <code>all(arr)</code> work...</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">arr</span><span class=\"o\">.</span><span
    class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">48</span><span class=\"o\">-</span><span class=\"mi\">25</span><span
    class=\"n\">ecac52db96</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"o\">/</span><span
    class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
    class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
    class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
    class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
    class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
    class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
    class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
    class=\"n\">numpy</span><span class=\"o\">/</span><span class=\"n\">core</span><span
    class=\"o\">/</span><span class=\"n\">_methods</span><span class=\"o\">.</span><span
    class=\"n\">p</span> <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">57</span>
    <span class=\"ow\">in</span> <span class=\"n\">_any</span>                                                                                     <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>                                                                                                  <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">54</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">_any</span><span
    class=\"p\">(</span><span class=\"n\">a</span><span class=\"p\">,</span> <span
    class=\"n\">axis</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"o\">=</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">out</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
    class=\"n\">keepdims</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"o\">*</span><span class=\"p\">,</span> <span
    class=\"n\">where</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">):</span>               <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    \   <span class=\"mi\">55</span> <span class=\"err\">\u2502</span>   <span class=\"c1\">#
    Parsing keyword arguments is currently fairly slow, so avoid it for now              \u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">56</span> <span class=\"err\">\u2502</span>
    \  <span class=\"k\">if</span> <span class=\"n\">where</span> <span class=\"ow\">is</span>
    <span class=\"kc\">True</span><span class=\"p\">:</span>                                                                      <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"err\">\u2771</span>
    \ <span class=\"mi\">57</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
    class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span>
    <span class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
    class=\"p\">)</span>                                      <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">58</span> <span class=\"err\">\u2502</span>
    \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
    class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span>
    <span class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
    class=\"p\">,</span> <span class=\"n\">where</span><span class=\"o\">=</span><span
    class=\"n\">where</span><span class=\"p\">)</span>                             <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">59</span>
    \                                                                                           <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">60</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">_all</span><span
    class=\"p\">(</span><span class=\"n\">a</span><span class=\"p\">,</span> <span
    class=\"n\">axis</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"o\">=</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">out</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
    class=\"n\">keepdims</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"o\">*</span><span class=\"p\">,</span> <span
    class=\"n\">where</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">):</span>               <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"n\">UFuncTypeError</span><span class=\"p\">:</span> <span class=\"n\">ufunc</span>
    <span class=\"s1\">&#39;logical_or&#39;</span> <span class=\"n\">did</span> <span
    class=\"ow\">not</span> <span class=\"n\">contain</span> <span class=\"n\">a</span>
    <span class=\"n\">loop</span> <span class=\"k\">with</span> <span class=\"n\">signature</span>
    <span class=\"n\">matching</span> <span class=\"n\">types</span> <span class=\"p\">(</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"o\">&lt;</span><span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"err\">&#39;</span><span
    class=\"nc\">numpy</span><span class=\"o\">.</span><span class=\"n\">dtype</span><span
    class=\"p\">[</span><span class=\"n\">str_</span><span class=\"p\">]</span><span
    class=\"s1\">&#39;&gt;) -&gt; None</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"nb\">all</span><span class=\"p\">(</span><span
    class=\"n\">arr</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"k\">if</span> <span class=\"nb\">any</span><span
    class=\"p\">(</span><span class=\"n\">arr</span><span class=\"p\">):</span>\n<span
    class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span
    class=\"n\">foo</span>\n</pre></div>\n\n</pre>\n\n<p>Let's change the example
    to just use integers and see what happens:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr2</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span
    class=\"o\">.</span><span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"kc\">True</span><span
    class=\"p\">,</span> <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"n\">arr2</span>\n<span class=\"n\">array</span><span
    class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">0</span><span
    class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
    <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
    class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span>
    <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span> <span class=\"k\">if</span>
    <span class=\"n\">arr2</span><span class=\"o\">.</span><span class=\"n\">any</span><span
    class=\"p\">():</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>
    \    <span class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">arr2</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>Ah,
    now some sanity...\nFirst, the booleans are stored as integers, which based on
    this discussion makes sense.\nNext we check if <code>any</code> values (this is
    a bitwise operation) are <code>True</code>, which we see they are so the conditional
    evaluates to <code>True</code>.\nHowver, if we check that <code>all</code> values
    are <code>True</code> we see they aren't, the last value is <code>False</code>
    or <code>0</code> so the conditional fails.</p>\n<p>This is a different way to
    evaluate logical conditions than with lists and it's because of the special nature
    of numpy arrays that allows them to be compared bitwise but on the flip side,
    there isn't a meaningful way to evaluate the <code>truth value</code> of an array.</p>\n<h2
    id=\"pandas\">Pandas <a class=\"header-anchor\" href=\"#pandas\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now for <code>pandas</code>,
    which under the hood is a lot of <code>numpy</code> but not fully.\n<code>pandas.Series</code>
    objects can hold mixed data types like lists, however to logically evaluate truth
    values we have to treat them like numpy arrays.</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">s</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
    class=\"o\">.</span><span class=\"n\">Series</span><span class=\"p\">([</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span
    class=\"p\">,</span> <span class=\"kc\">True</span><span class=\"p\">,</span>
    <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">s</span>\n\n<span class=\"mi\">0</span>        <span class=\"mi\">1</span>\n<span
    class=\"mi\">1</span>      <span class=\"n\">foo</span>\n<span class=\"mi\">2</span>
    \    <span class=\"kc\">True</span>\n<span class=\"mi\">3</span>    <span class=\"kc\">False</span>\n<span
    class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"nb\">bool</span><span class=\"p\">(</span><span
    class=\"n\">s</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">60</span><span class=\"o\">-</span><span class=\"mf\">68e48</span><span
    class=\"n\">e81da14</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"o\">/</span><span
    class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
    class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
    class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
    class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
    class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
    class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
    class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
    class=\"n\">pandas</span><span class=\"o\">/</span><span class=\"n\">core</span><span
    class=\"o\">/</span><span class=\"n\">generic</span><span class=\"o\">.</span><span
    class=\"n\">p</span> <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">1527</span>
    <span class=\"ow\">in</span> <span class=\"n\">__nonzero__</span>                                                                            <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>                                                                                                  <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1524</span>
    <span class=\"err\">\u2502</span>                                                                                        <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1525</span>
    <span class=\"err\">\u2502</span>   <span class=\"nd\">@final</span>                                                                               <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1526</span>
    <span class=\"err\">\u2502</span>   <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"nf\">__nonzero__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>                                                               <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"err\">\u2771</span>
    \ <span class=\"mi\">1527</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"k\">raise</span> <span class=\"ne\">ValueError</span><span class=\"p\">(</span>
    \                                                               <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">1528</span> <span class=\"err\">\u2502</span>
    \  <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>   <span
    class=\"sa\">f</span><span class=\"s2\">&quot;The truth value of a </span><span
    class=\"si\">{</span><span class=\"nb\">type</span><span class=\"p\">(</span><span
    class=\"bp\">self</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"vm\">__name__</span><span class=\"si\">}</span><span class=\"s2\"> is
    ambiguous. &quot;</span>                 <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">1529</span> <span class=\"err\">\u2502</span>
    \  <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>   <span
    class=\"s2\">&quot;Use a.empty, a.bool(), a.item(), a.any() or a.all().&quot;</span>
    \                      <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    \   <span class=\"mi\">1530</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"p\">)</span>                                                                                <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
    <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
    <span class=\"n\">a</span> <span class=\"n\">Series</span> <span class=\"ow\">is</span>
    <span class=\"n\">ambiguous</span><span class=\"o\">.</span> <span class=\"n\">Use</span>
    <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">empty</span><span
    class=\"p\">,</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">bool</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">item</span><span class=\"p\">(),</span>
    <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">any</span><span
    class=\"p\">()</span> <span class=\"ow\">or</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">all</span><span class=\"p\">()</span><span
    class=\"o\">.</span>\n</pre></div>\n\n</pre>\n\n<p>Just like with numpy, we can't
    evaluate the truth value of the series in a meaningful way, but bitwise operations
    make perfect sense...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">s</span><span class=\"o\">.</span><span
    class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"k\">if</span> <span class=\"n\">s</span><span
    class=\"o\">.</span><span class=\"n\">all</span><span class=\"p\">():</span>\n<span
    class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><strong>I
    thought this was about <code>and</code> and <code>&amp;</code>...</strong></p>\n<p>Right,
    so recall that <code>and</code> is a lazy boolean evaluation (ie. it evaluates
    the 'truth value' an object) whereas <code>&amp;</code> does bitwise comparison.</p>\n<p>What
    we see then with <code>pandas</code> and <code>numpy</code> is that if we want
    to do logical comparisons, we need to do them bitwise, ie. use <code>&amp;</code>.</p>\n<p>Keep
    in mind though that the data types make a big deal - we can't use <code>&amp;</code>
    with strings  because the bitwise operation isn't supported, for strings we need
    to use the boolean evaluation.</p>\n<h2 id=\"the-original-point\">The Original
    Point <a class=\"header-anchor\" href=\"#the-original-point\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My main use case for
    this is finding elements in a dataframe/series based on 2 or more columns aligning
    row values...</p>\n<p>Say I have a dataframe like this:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span>\n\n   <span class=\"n\">s</span> <span class=\"n\">s2</span>
    \  <span class=\"n\">s3</span>\n<span class=\"mi\">0</span>  <span class=\"mi\">1</span>
    \ <span class=\"mi\">0</span>  <span class=\"n\">foo</span>\n<span class=\"mi\">1</span>
    \ <span class=\"mi\">1</span>  <span class=\"n\">a</span>  <span class=\"n\">bar</span>\n<span
    class=\"mi\">2</span>  <span class=\"mi\">1</span>  <span class=\"n\">b</span>
    \ <span class=\"n\">baz</span>\n<span class=\"mi\">3</span>  <span class=\"mi\">2</span>
    \ <span class=\"n\">a</span>  <span class=\"n\">fee</span>\n<span class=\"mi\">4</span>
    \ <span class=\"mi\">2</span>  <span class=\"mi\">0</span>   <span class=\"n\">fi</span>\n</pre></div>\n\n</pre>\n\n<p>Example
    use case is I want to get the values in <code>s3</code> where <code>s</code> is
    1 and <code>s2</code> is 'a'. ie. I'm just after <code>bar</code> for now...</p>\n<p>Up
    until now I've always just tried <code>df.s3[(df.s == 1) and (df.s2 == &quot;a&quot;)]</code>
    the first time and every single time I've gotten this error that I just haven't
    ever fully understood:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ne\">ValueError</span><span
    class=\"p\">:</span> <span class=\"n\">The</span> <span class=\"n\">truth</span>
    <span class=\"n\">value</span> <span class=\"n\">of</span> <span class=\"n\">a</span>
    <span class=\"n\">Series</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
    class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">,</span> <span
    class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">bool</span><span
    class=\"p\">(),</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">item</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
    class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">()</span><span class=\"o\">.</span>\n</pre></div>\n\n</pre>\n\n<p>But
    after this deep dive I think I've grasped that <code>and</code> doesn't actually
    do what I want here, and in order to do the bitwise comparision I need to use
    <code>&amp;</code></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s3</span><span
    class=\"p\">[(</span><span class=\"n\">df</span><span class=\"o\">.</span><span
    class=\"n\">s</span> <span class=\"o\">==</span> <span class=\"mi\">1</span><span
    class=\"p\">)</span> <span class=\"o\">&amp;</span> <span class=\"p\">(</span><span
    class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s2</span> <span
    class=\"o\">==</span> <span class=\"s2\">&quot;a&quot;</span><span class=\"p\">)]</span>\n\n<span
    class=\"mi\">1</span>    <span class=\"n\">bar</span>\n<span class=\"n\">Name</span><span
    class=\"p\">:</span> <span class=\"n\">s3</span><span class=\"p\">,</span> <span
    class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"end\">End <a class=\"header-anchor\" href=\"#end\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Hopefully this set of
    ramblings brings some clarity to <code>and</code> and <code>&amp;</code> and you
    can Google one less error in the future in your logical comparison workflows \U0001F604</p>\n\n
    \       </section>\n    </article>\n</section>        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>And-vs-&</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I often struggle to remember the correct
    way to do `and` type comparisons when working in pandas. I remember learning long
    long ago that `and` and `&amp;` are d\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"And-vs-& | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/and-vs\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"And-vs-&
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I often struggle
    to remember the correct way to do `and` type comparisons when working in pandas.
    I remember learning long long ago that `and` and `&amp;` are d\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<article style=\"text-align:
    center;\">\n    <style>\n        section {\n            font-size: 200%;\n        }\n\n\n
    \       .edit {\n            display: none;\n        }\n    </style>\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">And-vs-&</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-06\">\n            April
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">And-vs-&</h1>\n    <div class=\"flex items-center text-sm
    text-text-main/80 mb-6\">\n        <time datetime=\"2022-04-06\">\n            April
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I often struggle to remember the correct
    way to do <code>and</code> type comparisons when working in pandas.</p>\n<p>I
    remember learning long long ago that <code>and</code> and <code>&amp;</code> are
    different, the former being lazy boolean evaluation whereas the latter is a bitwise
    operation.</p>\n<p><strong>I learned a lot from <a href=\"https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump\">this
    SO post</a></strong></p>\n<h2 id=\"lists\">Lists <a class=\"header-anchor\" href=\"#lists\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Python <code>list</code>
    objects can contain unlike elements - ie. <code>[True, 'foo', 1, '1', [1,2,3]]</code>
    is a valid list with booleans, strings, integers, and another list.\nBecause of
    this, we can't use <code>&amp;</code> to compare two lists since they can't be
    combined in a consistent and meaningful way.</p>\n<p>However we can use <code>and</code>
    since it doesn't do bitwise operations, it just evaluates the boolean value of
    the list (basically if it's non-empty then <code>bool(my_list)</code> evaluates
    to <code>True</code>)</p>\n<p>Here's an example:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">my_list</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;2&quot;</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">,</span>
    <span class=\"p\">[</span><span class=\"kc\">True</span><span class=\"p\">],</span>
    <span class=\"kc\">False</span><span class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"nb\">bool</span><span class=\"p\">(</span><span class=\"n\">my_list</span><span
    class=\"p\">)</span>\n<span class=\"kc\">True</span>\n</pre></div>\n\n</pre>\n\n<p>If
    we compare <code>my_list</code> with <code>another_list</code> using <code>and</code>
    then the comparision will go:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>if bool(my_list):\n    if
    bool(another_list):\n       &lt;operation&gt; \n    else:\n       break\n</pre></div>\n\n</pre>\n\n<p>Let's
    see another example:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">another_list</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"kc\">False</span><span
    class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
    <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
    class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span>
    <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span> <span class=\"n\">my_list</span>
    <span class=\"ow\">and</span> <span class=\"n\">another_list</span>\n<span class=\"p\">[</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"kc\">False</span><span
    class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<p><code>bool(my_list)</code>
    evaluated to <code>True</code>, and <code>bool(another_list)</code> <em>also</em>
    evaluated to <code>True</code> even though it's full of <code>False</code> values
    because the object is non-empty.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">my_list</span> <span class=\"ow\">and</span>
    <span class=\"n\">another_list</span><span class=\"p\">:</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n</pre></div>\n\n</pre>\n\n<p>So
    using <code>and</code> in this case results in a <code>True</code> conditional,
    so the <code>print</code> statement is executed.</p>\n<p>Feels kind of counter-intuitive
    at first glance, to me anyways...</p>\n<p>However, we can't use <code>&amp;</code>
    because there isn't a meaningful to do bitwise operations over these two lists:</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">my_list</span> <span class=\"o\">&amp;</span> <span class=\"n\">another_list</span>\n<span
    class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">19</span><span class=\"o\">-</span><span class=\"n\">a2a16cebb3da</span><span
    class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
    class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">cell</span>
    <span class=\"n\">line</span><span class=\"p\">:</span> <span class=\"mi\">1</span><span
    class=\"o\">&gt;</span>                                              <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">TypeError</span><span class=\"p\">:</span> <span class=\"n\">unsupported</span>
    <span class=\"n\">operand</span> <span class=\"nb\">type</span><span class=\"p\">(</span><span
    class=\"n\">s</span><span class=\"p\">)</span> <span class=\"k\">for</span> <span
    class=\"o\">&amp;</span><span class=\"p\">:</span> <span class=\"s1\">&#39;list&#39;</span>
    <span class=\"ow\">and</span> <span class=\"s1\">&#39;list&#39;</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"numpy\">Numpy <a class=\"header-anchor\" href=\"#numpy\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>numpy</code> arrays
    are special and they have a lot of fancy vectorization utilities built-in which
    make them great and fast for mathematical operations but now our logical comparisons
    need to be handled with a different kind of care.</p>\n<p>First thing though -
    without some trickery they do not hold mixed data types like a <code>list</code>
    does (necessary, I think, for the vectorized optimization that numpy is built
    on top of)</p>\n<p>With that out of the way here's the main thing for this post,
    we can't just evaluate the <code>bool</code> of an array - numpy says no no no.</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span
    class=\"o\">.</span><span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"s2\">&quot;1&quot;</span><span class=\"p\">,</span> <span class=\"mi\">2</span><span
    class=\"p\">,</span> <span class=\"kc\">True</span><span class=\"p\">,</span>
    <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr</span>\n<span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"s1\">&#39;1&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;2&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;True&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;False&#39;</span><span class=\"p\">],</span> <span class=\"n\">dtype</span><span
    class=\"o\">=</span><span class=\"s1\">&#39;&lt;U21&#39;</span><span class=\"p\">)</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"nb\">bool</span><span class=\"p\">(</span><span
    class=\"n\">arr</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">25</span><span class=\"o\">-</span><span class=\"mf\">4e8</span><span
    class=\"n\">c5dd85b93</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
    <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
    <span class=\"n\">an</span> <span class=\"n\">array</span> <span class=\"k\">with</span>
    <span class=\"n\">more</span> <span class=\"n\">than</span> <span class=\"n\">one</span>
    <span class=\"n\">element</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
    class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
    class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<blockquote>\n<p>This
    means that using <code>and</code> with <code>numpy</code> arrays doesn't really
    make sense because we probably care about the truth value of each element (bitwise),
    not the truth value of the array.</p>\n</blockquote>\n<p>Notice that when I print
    <code>arr</code> all the elements are a string - and the <code>dtype</code> is
    <code>&lt;U21</code> for all elements.</p>\n<p>This is not how I instantiated
    the array so be aware of that behavior with numpy.</p>\n<blockquote>\n<p><code>&lt;U21</code>
    is a dtype expressing the values are 'Little Endian', Unicode, 12 characters.
    See <a href=\"https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types\">here</a>
    for docs for docs</p>\n</blockquote>\n<p>So for logical comparisions we should
    look at the error message then...\nOur handy error message says to try <code>any</code>
    or <code>all</code></p>\n<p>Because the datatypes in this example are basically
    strings, using <code>arr.any()</code> will result in an error that I do not fully
    understand, but <code>any(arr)</code> and <code>all(arr)</code> work...</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">arr</span><span class=\"o\">.</span><span
    class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">48</span><span class=\"o\">-</span><span class=\"mi\">25</span><span
    class=\"n\">ecac52db96</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"o\">/</span><span
    class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
    class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
    class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
    class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
    class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
    class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
    class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
    class=\"n\">numpy</span><span class=\"o\">/</span><span class=\"n\">core</span><span
    class=\"o\">/</span><span class=\"n\">_methods</span><span class=\"o\">.</span><span
    class=\"n\">p</span> <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">57</span>
    <span class=\"ow\">in</span> <span class=\"n\">_any</span>                                                                                     <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>                                                                                                  <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">54</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">_any</span><span
    class=\"p\">(</span><span class=\"n\">a</span><span class=\"p\">,</span> <span
    class=\"n\">axis</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"o\">=</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">out</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
    class=\"n\">keepdims</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"o\">*</span><span class=\"p\">,</span> <span
    class=\"n\">where</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">):</span>               <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    \   <span class=\"mi\">55</span> <span class=\"err\">\u2502</span>   <span class=\"c1\">#
    Parsing keyword arguments is currently fairly slow, so avoid it for now              \u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">56</span> <span class=\"err\">\u2502</span>
    \  <span class=\"k\">if</span> <span class=\"n\">where</span> <span class=\"ow\">is</span>
    <span class=\"kc\">True</span><span class=\"p\">:</span>                                                                      <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"err\">\u2771</span>
    \ <span class=\"mi\">57</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
    class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span>
    <span class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
    class=\"p\">)</span>                                      <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">58</span> <span class=\"err\">\u2502</span>
    \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
    class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span>
    <span class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
    class=\"p\">,</span> <span class=\"n\">where</span><span class=\"o\">=</span><span
    class=\"n\">where</span><span class=\"p\">)</span>                             <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">59</span>
    \                                                                                           <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">60</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">_all</span><span
    class=\"p\">(</span><span class=\"n\">a</span><span class=\"p\">,</span> <span
    class=\"n\">axis</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"o\">=</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">out</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
    class=\"n\">keepdims</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"o\">*</span><span class=\"p\">,</span> <span
    class=\"n\">where</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">):</span>               <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"n\">UFuncTypeError</span><span class=\"p\">:</span> <span class=\"n\">ufunc</span>
    <span class=\"s1\">&#39;logical_or&#39;</span> <span class=\"n\">did</span> <span
    class=\"ow\">not</span> <span class=\"n\">contain</span> <span class=\"n\">a</span>
    <span class=\"n\">loop</span> <span class=\"k\">with</span> <span class=\"n\">signature</span>
    <span class=\"n\">matching</span> <span class=\"n\">types</span> <span class=\"p\">(</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"o\">&lt;</span><span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"err\">&#39;</span><span
    class=\"nc\">numpy</span><span class=\"o\">.</span><span class=\"n\">dtype</span><span
    class=\"p\">[</span><span class=\"n\">str_</span><span class=\"p\">]</span><span
    class=\"s1\">&#39;&gt;) -&gt; None</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"nb\">all</span><span class=\"p\">(</span><span
    class=\"n\">arr</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"k\">if</span> <span class=\"nb\">any</span><span
    class=\"p\">(</span><span class=\"n\">arr</span><span class=\"p\">):</span>\n<span
    class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span
    class=\"n\">foo</span>\n</pre></div>\n\n</pre>\n\n<p>Let's change the example
    to just use integers and see what happens:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr2</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span
    class=\"o\">.</span><span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"kc\">True</span><span
    class=\"p\">,</span> <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"n\">arr2</span>\n<span class=\"n\">array</span><span
    class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">0</span><span
    class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
    <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
    class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span>
    <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span> <span class=\"k\">if</span>
    <span class=\"n\">arr2</span><span class=\"o\">.</span><span class=\"n\">any</span><span
    class=\"p\">():</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>
    \    <span class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">arr2</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>Ah,
    now some sanity...\nFirst, the booleans are stored as integers, which based on
    this discussion makes sense.\nNext we check if <code>any</code> values (this is
    a bitwise operation) are <code>True</code>, which we see they are so the conditional
    evaluates to <code>True</code>.\nHowver, if we check that <code>all</code> values
    are <code>True</code> we see they aren't, the last value is <code>False</code>
    or <code>0</code> so the conditional fails.</p>\n<p>This is a different way to
    evaluate logical conditions than with lists and it's because of the special nature
    of numpy arrays that allows them to be compared bitwise but on the flip side,
    there isn't a meaningful way to evaluate the <code>truth value</code> of an array.</p>\n<h2
    id=\"pandas\">Pandas <a class=\"header-anchor\" href=\"#pandas\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now for <code>pandas</code>,
    which under the hood is a lot of <code>numpy</code> but not fully.\n<code>pandas.Series</code>
    objects can hold mixed data types like lists, however to logically evaluate truth
    values we have to treat them like numpy arrays.</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">s</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
    class=\"o\">.</span><span class=\"n\">Series</span><span class=\"p\">([</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span
    class=\"p\">,</span> <span class=\"kc\">True</span><span class=\"p\">,</span>
    <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">s</span>\n\n<span class=\"mi\">0</span>        <span class=\"mi\">1</span>\n<span
    class=\"mi\">1</span>      <span class=\"n\">foo</span>\n<span class=\"mi\">2</span>
    \    <span class=\"kc\">True</span>\n<span class=\"mi\">3</span>    <span class=\"kc\">False</span>\n<span
    class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"nb\">bool</span><span class=\"p\">(</span><span
    class=\"n\">s</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">60</span><span class=\"o\">-</span><span class=\"mf\">68e48</span><span
    class=\"n\">e81da14</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"o\">/</span><span
    class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
    class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
    class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
    class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
    class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
    class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
    class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
    class=\"n\">pandas</span><span class=\"o\">/</span><span class=\"n\">core</span><span
    class=\"o\">/</span><span class=\"n\">generic</span><span class=\"o\">.</span><span
    class=\"n\">p</span> <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">1527</span>
    <span class=\"ow\">in</span> <span class=\"n\">__nonzero__</span>                                                                            <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>                                                                                                  <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1524</span>
    <span class=\"err\">\u2502</span>                                                                                        <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1525</span>
    <span class=\"err\">\u2502</span>   <span class=\"nd\">@final</span>                                                                               <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1526</span>
    <span class=\"err\">\u2502</span>   <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"nf\">__nonzero__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>                                                               <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"err\">\u2771</span>
    \ <span class=\"mi\">1527</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"k\">raise</span> <span class=\"ne\">ValueError</span><span class=\"p\">(</span>
    \                                                               <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">1528</span> <span class=\"err\">\u2502</span>
    \  <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>   <span
    class=\"sa\">f</span><span class=\"s2\">&quot;The truth value of a </span><span
    class=\"si\">{</span><span class=\"nb\">type</span><span class=\"p\">(</span><span
    class=\"bp\">self</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"vm\">__name__</span><span class=\"si\">}</span><span class=\"s2\"> is
    ambiguous. &quot;</span>                 <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">1529</span> <span class=\"err\">\u2502</span>
    \  <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>   <span
    class=\"s2\">&quot;Use a.empty, a.bool(), a.item(), a.any() or a.all().&quot;</span>
    \                      <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    \   <span class=\"mi\">1530</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"p\">)</span>                                                                                <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
    <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
    <span class=\"n\">a</span> <span class=\"n\">Series</span> <span class=\"ow\">is</span>
    <span class=\"n\">ambiguous</span><span class=\"o\">.</span> <span class=\"n\">Use</span>
    <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">empty</span><span
    class=\"p\">,</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">bool</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">item</span><span class=\"p\">(),</span>
    <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">any</span><span
    class=\"p\">()</span> <span class=\"ow\">or</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">all</span><span class=\"p\">()</span><span
    class=\"o\">.</span>\n</pre></div>\n\n</pre>\n\n<p>Just like with numpy, we can't
    evaluate the truth value of the series in a meaningful way, but bitwise operations
    make perfect sense...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">s</span><span class=\"o\">.</span><span
    class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"k\">if</span> <span class=\"n\">s</span><span
    class=\"o\">.</span><span class=\"n\">all</span><span class=\"p\">():</span>\n<span
    class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><strong>I
    thought this was about <code>and</code> and <code>&amp;</code>...</strong></p>\n<p>Right,
    so recall that <code>and</code> is a lazy boolean evaluation (ie. it evaluates
    the 'truth value' an object) whereas <code>&amp;</code> does bitwise comparison.</p>\n<p>What
    we see then with <code>pandas</code> and <code>numpy</code> is that if we want
    to do logical comparisons, we need to do them bitwise, ie. use <code>&amp;</code>.</p>\n<p>Keep
    in mind though that the data types make a big deal - we can't use <code>&amp;</code>
    with strings  because the bitwise operation isn't supported, for strings we need
    to use the boolean evaluation.</p>\n<h2 id=\"the-original-point\">The Original
    Point <a class=\"header-anchor\" href=\"#the-original-point\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My main use case for
    this is finding elements in a dataframe/series based on 2 or more columns aligning
    row values...</p>\n<p>Say I have a dataframe like this:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span>\n\n   <span class=\"n\">s</span> <span class=\"n\">s2</span>
    \  <span class=\"n\">s3</span>\n<span class=\"mi\">0</span>  <span class=\"mi\">1</span>
    \ <span class=\"mi\">0</span>  <span class=\"n\">foo</span>\n<span class=\"mi\">1</span>
    \ <span class=\"mi\">1</span>  <span class=\"n\">a</span>  <span class=\"n\">bar</span>\n<span
    class=\"mi\">2</span>  <span class=\"mi\">1</span>  <span class=\"n\">b</span>
    \ <span class=\"n\">baz</span>\n<span class=\"mi\">3</span>  <span class=\"mi\">2</span>
    \ <span class=\"n\">a</span>  <span class=\"n\">fee</span>\n<span class=\"mi\">4</span>
    \ <span class=\"mi\">2</span>  <span class=\"mi\">0</span>   <span class=\"n\">fi</span>\n</pre></div>\n\n</pre>\n\n<p>Example
    use case is I want to get the values in <code>s3</code> where <code>s</code> is
    1 and <code>s2</code> is 'a'. ie. I'm just after <code>bar</code> for now...</p>\n<p>Up
    until now I've always just tried <code>df.s3[(df.s == 1) and (df.s2 == &quot;a&quot;)]</code>
    the first time and every single time I've gotten this error that I just haven't
    ever fully understood:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ne\">ValueError</span><span
    class=\"p\">:</span> <span class=\"n\">The</span> <span class=\"n\">truth</span>
    <span class=\"n\">value</span> <span class=\"n\">of</span> <span class=\"n\">a</span>
    <span class=\"n\">Series</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
    class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">,</span> <span
    class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">bool</span><span
    class=\"p\">(),</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">item</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
    class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">()</span><span class=\"o\">.</span>\n</pre></div>\n\n</pre>\n\n<p>But
    after this deep dive I think I've grasped that <code>and</code> doesn't actually
    do what I want here, and in order to do the bitwise comparision I need to use
    <code>&amp;</code></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s3</span><span
    class=\"p\">[(</span><span class=\"n\">df</span><span class=\"o\">.</span><span
    class=\"n\">s</span> <span class=\"o\">==</span> <span class=\"mi\">1</span><span
    class=\"p\">)</span> <span class=\"o\">&amp;</span> <span class=\"p\">(</span><span
    class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s2</span> <span
    class=\"o\">==</span> <span class=\"s2\">&quot;a&quot;</span><span class=\"p\">)]</span>\n\n<span
    class=\"mi\">1</span>    <span class=\"n\">bar</span>\n<span class=\"n\">Name</span><span
    class=\"p\">:</span> <span class=\"n\">s3</span><span class=\"p\">,</span> <span
    class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"end\">End <a class=\"header-anchor\" href=\"#end\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Hopefully this set of
    ramblings brings some clarity to <code>and</code> and <code>&amp;</code> and you
    can Google one less error in the future in your logical comparison workflows \U0001F604</p>\n\n
    \       </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>And-vs-&</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I often struggle to remember the correct
    way to do `and` type comparisons when working in pandas. I remember learning long
    long ago that `and` and `&amp;` are d\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"And-vs-& | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/and-vs\" />\n<meta name=\"twitter:card\"
    content=\"summary_large_image\">\n<meta name=\"twitter:title\" content=\"And-vs-&
    | Nic Payne\" />\n<meta name=\"twitter:description\" content=\"I often struggle
    to remember the correct way to do `and` type comparisons when working in pandas.
    I remember learning long long ago that `and` and `&amp;` are d\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"terminal-page\">\n
    \   <main class=\"terminal-page__main\">\n        <div class=\"terminal-page__content\">\n<header
    class=\"site-terminal\">\n\n    <div class=\"site-terminal__bar\">\n        <div
    class=\"site-terminal__lights\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n
    \       <div class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/and-vs</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header><div id='didyoumean'>\n    <div
    class=\"mb-0\">\n        <!-- <label for=\"search\" class=\"block text-sm font-medium
    mb-2\">Search for a page</label> -->\n        <input type=\"text\" id=\"search\"\n
    \              class=\"w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800
    focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/' Search for
    a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
    gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
    class='grid gap-4'>\n        <!-- Results will be populated here -->\n    </ul>\n</div>\n<script
    type='module'>\n// All available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
    filter=config.didyoumean_filter, sort='True')|tojson;\n    // fetch pages from
    config.output_dir / didyoumean.json\n\n    const pages = await fetch('/didyoumean.json').then(response
    => response.json());\n    const populate_search_input = false\n    const search_hotkey
    = \"/\"\n\n// Get current path from URL, removing leading/trailing slashes\n    if
    (populate_search_input) {\n        const currentPath = window.location.pathname.replace(/^\\/|\\/$/g,
    '');\n        document.getElementById('search').value = currentPath;\n    }\n\n//
    Search across all fields in an object\n    function searchObject(needle, obj)
    {\n        needle = needle.toLowerCase();\n        let score = 0;\n\n    // Helper
    to search a single field\n        const searchField = (value) => {\n            if
    (!value) return 0;\n            value = String(value).toLowerCase();\n\n            //
    Exact matches\n            if (value === needle) return 15;\n\n            //
    Word boundary matches (complete words)\n            if (value.match(new RegExp(`\\\\b${needle}\\\\b`)))
    return 10;\n\n            // Contains full search term\n            if (value.includes(needle))
    return 8;\n\n            // Most parts match (for multi-word searches)\n            const
    needleParts = needle.split(/\\W+/).filter(p => p.length > 2);\n            const
    valueParts = value.split(/\\W+/).filter(p => p.length > 2);\n\n            if
    (needleParts.length === 0) return 0;\n\n            let matchCount = 0;\n            for
    (const part of needleParts) {\n                for (const valuePart of valueParts)
    {\n                    if (valuePart.includes(part) || part.includes(valuePart))
    {\n                        matchCount++;\n                        break;\n                    }\n
    \               }\n            }\n\n            // Only count if most parts match\n
    \           const matchRatio = matchCount / needleParts.length;\n            if
    (matchRatio >= 0.75) {\n                return matchRatio * 6;\n            }\n\n
    \           return 0;\n        };\n\n    // Search each field with different weights\n
    \       const slugScore = searchField(obj.slug) * 3;  // Slug is most important\n
    \       const titleScore = searchField(obj.title) * 2;  // Title is next\n        const
    descScore = searchField(obj.description) * 1;  // Description\n        const tagScore
    = (obj.tags || []).reduce((sum, tag) => sum + searchField(tag), 0);  // Tags\n\n
    \       score = slugScore + titleScore + descScore + tagScore;\n\n    // Path
    segment matches for slug (only if we have some other match)\n        if (score
    > 0 && obj.slug) {\n            const inputParts = needle.split('/').filter(p
    => p.length > 0);\n            const slugParts = obj.slug.toLowerCase().split('/');\n\n
    \           // Bonus for matching path structure\n            for (let i = 0;
    i < inputParts.length && i < slugParts.length; i++) {\n                if (slugParts[i].includes(inputParts[i]))
    {\n                    score += 5;  // Matching segments in order is valuable\n
    \               }\n            }\n        }\n\n        return score;\n    }\n\n//
    Find similar pages\n    function findSimilar(input) {\n        if (!input || input.length
    < 2) return [];\n        const normalizedInput = input.toLowerCase().trim();\n\n
    \   // Score each page\n        const scored = pages.map(page => ({\n            ...page,\n
    \           score: searchObject(normalizedInput, page)\n        }));\n\n    //
    Sort by score (higher is better) and take top matches\n        return scored\n
    \           .sort((a, b) => b.score - a.score)\n            .slice(0, 12)  //
    Show more results in the grid\n            .filter(item => item.score > 15); //
    Only show strong matches\n    }\n\n// Update results in the DOM\n    function
    updateResults(results) {\n        const resultsDiv = document.getElementById('didyoumean_results');\n\n
    \       if (results.length === 0) {\n            resultsDiv.innerHTML = '<p class=\"text-gray-500
    col-span-full text-center py-8\">No similar pages found.</p>';\n            return;\n
    \       }\n\n        const html = results.map(page => `\n        <li class=\"p-4
    bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow first:mt-4\">\n
    \           <a href=\"/${page.slug}\" class=\"block\">\n                <h3 class=\"text-lg
    font-semibold text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300
    mb-2\">\n                    ${page.title || page.slug}\n                </h3>\n
    \               ${page.description ? `\n            <p class=\"text-sm text-gray-600
    dark:text-gray-300 mb-3 line-clamp-2\">\n            ${page.description}\n            </p>\n
    \           ` : ''}\n                <div class=\"flex flex-wrap gap-2 text-xs
    text-gray-500 dark:text-gray-400\">\n                </div>\n                ${page.tags
    && page.tags.length > 0 ? `\n            <div class=\"mt-3 flex flex-wrap gap-2\">\n
    \           ${page.tags.map(tag => `\n                            <span class=\"px-2
    py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs\">\n                                ${tag}\n
    \                           </span>\n                        `).join('')}\n            </div>\n
    \           ` : ''}\n            </a>\n        </li>\n    `).join('');\n\n        resultsDiv.innerHTML
    = html;\n    }\n\n// Set up hotkey for search if configured\n    if (search_hotkey)
    {\n        document.addEventListener('keydown', (e) => {\n            // Don't
    trigger if user is typing in an input or textarea\n            if (e.target.tagName
    === 'INPUT' || e.target.tagName === 'TEXTAREA') {\n                return;\n            }\n\n
    \           // Check if the pressed key matches the hotkey\n            if (e.key
    === search_hotkey) {\n                e.preventDefault();  // Prevent the '/'
    from being typed\n                const searchInput = document.getElementById('search');\n
    \               searchInput.focus();\n                searchInput.select();  //
    Select any existing text\n            }\n        });\n    }\n\n// Set up search
    input handler with debounce\n    let debounceTimeout;\n    const searchInput =
    document.getElementById('search');\n    searchInput.addEventListener('input',
    (e) => {\n        clearTimeout(debounceTimeout);\n        debounceTimeout = setTimeout(()
    => {\n            const results = findSimilar(e.target.value);\n            updateResults(results);\n
    \       }, 100);\n    });\n\n// Initial search with current path\n    if (populate_search_input)
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    <!--
    Content is handled by the password protection plugin -->\n    <p>I often struggle
    to remember the correct way to do <code>and</code> type comparisons when working
    in pandas.</p>\n<p>I remember learning long long ago that <code>and</code> and
    <code>&amp;</code> are different, the former being lazy boolean evaluation whereas
    the latter is a bitwise operation.</p>\n<p><strong>I learned a lot from <a href=\"https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump\">this
    SO post</a></strong></p>\n<h2 id=\"lists\">Lists <a class=\"header-anchor\" href=\"#lists\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Python <code>list</code>
    objects can contain unlike elements - ie. <code>[True, 'foo', 1, '1', [1,2,3]]</code>
    is a valid list with booleans, strings, integers, and another list.\nBecause of
    this, we can't use <code>&amp;</code> to compare two lists since they can't be
    combined in a consistent and meaningful way.</p>\n<p>However we can use <code>and</code>
    since it doesn't do bitwise operations, it just evaluates the boolean value of
    the list (basically if it's non-empty then <code>bool(my_list)</code> evaluates
    to <code>True</code>)</p>\n<p>Here's an example:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">my_list</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;2&quot;</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">,</span>
    <span class=\"p\">[</span><span class=\"kc\">True</span><span class=\"p\">],</span>
    <span class=\"kc\">False</span><span class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"nb\">bool</span><span class=\"p\">(</span><span class=\"n\">my_list</span><span
    class=\"p\">)</span>\n<span class=\"kc\">True</span>\n</pre></div>\n\n</pre>\n\n<p>If
    we compare <code>my_list</code> with <code>another_list</code> using <code>and</code>
    then the comparision will go:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span>if bool(my_list):\n    if
    bool(another_list):\n       &lt;operation&gt; \n    else:\n       break\n</pre></div>\n\n</pre>\n\n<p>Let's
    see another example:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">another_list</span> <span class=\"o\">=</span> <span class=\"p\">[</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"kc\">False</span><span
    class=\"p\">]</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
    <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
    class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span>
    <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span> <span class=\"n\">my_list</span>
    <span class=\"ow\">and</span> <span class=\"n\">another_list</span>\n<span class=\"p\">[</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"kc\">False</span><span
    class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<p><code>bool(my_list)</code>
    evaluated to <code>True</code>, and <code>bool(another_list)</code> <em>also</em>
    evaluated to <code>True</code> even though it's full of <code>False</code> values
    because the object is non-empty.</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">my_list</span> <span class=\"ow\">and</span>
    <span class=\"n\">another_list</span><span class=\"p\">:</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n</pre></div>\n\n</pre>\n\n<p>So
    using <code>and</code> in this case results in a <code>True</code> conditional,
    so the <code>print</code> statement is executed.</p>\n<p>Feels kind of counter-intuitive
    at first glance, to me anyways...</p>\n<p>However, we can't use <code>&amp;</code>
    because there isn't a meaningful to do bitwise operations over these two lists:</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">my_list</span> <span class=\"o\">&amp;</span> <span class=\"n\">another_list</span>\n<span
    class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">19</span><span class=\"o\">-</span><span class=\"n\">a2a16cebb3da</span><span
    class=\"o\">&gt;</span><span class=\"p\">:</span><span class=\"mi\">1</span> <span
    class=\"ow\">in</span> <span class=\"o\">&lt;</span><span class=\"n\">cell</span>
    <span class=\"n\">line</span><span class=\"p\">:</span> <span class=\"mi\">1</span><span
    class=\"o\">&gt;</span>                                              <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">TypeError</span><span class=\"p\">:</span> <span class=\"n\">unsupported</span>
    <span class=\"n\">operand</span> <span class=\"nb\">type</span><span class=\"p\">(</span><span
    class=\"n\">s</span><span class=\"p\">)</span> <span class=\"k\">for</span> <span
    class=\"o\">&amp;</span><span class=\"p\">:</span> <span class=\"s1\">&#39;list&#39;</span>
    <span class=\"ow\">and</span> <span class=\"s1\">&#39;list&#39;</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"numpy\">Numpy <a class=\"header-anchor\" href=\"#numpy\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>numpy</code> arrays
    are special and they have a lot of fancy vectorization utilities built-in which
    make them great and fast for mathematical operations but now our logical comparisons
    need to be handled with a different kind of care.</p>\n<p>First thing though -
    without some trickery they do not hold mixed data types like a <code>list</code>
    does (necessary, I think, for the vectorized optimization that numpy is built
    on top of)</p>\n<p>With that out of the way here's the main thing for this post,
    we can't just evaluate the <code>bool</code> of an array - numpy says no no no.</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span
    class=\"o\">.</span><span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"s2\">&quot;1&quot;</span><span class=\"p\">,</span> <span class=\"mi\">2</span><span
    class=\"p\">,</span> <span class=\"kc\">True</span><span class=\"p\">,</span>
    <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr</span>\n<span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"s1\">&#39;1&#39;</span><span class=\"p\">,</span> <span class=\"s1\">&#39;2&#39;</span><span
    class=\"p\">,</span> <span class=\"s1\">&#39;True&#39;</span><span class=\"p\">,</span>
    <span class=\"s1\">&#39;False&#39;</span><span class=\"p\">],</span> <span class=\"n\">dtype</span><span
    class=\"o\">=</span><span class=\"s1\">&#39;&lt;U21&#39;</span><span class=\"p\">)</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"nb\">bool</span><span class=\"p\">(</span><span
    class=\"n\">arr</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">25</span><span class=\"o\">-</span><span class=\"mf\">4e8</span><span
    class=\"n\">c5dd85b93</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
    <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
    <span class=\"n\">an</span> <span class=\"n\">array</span> <span class=\"k\">with</span>
    <span class=\"n\">more</span> <span class=\"n\">than</span> <span class=\"n\">one</span>
    <span class=\"n\">element</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
    class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
    class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<blockquote>\n<p>This
    means that using <code>and</code> with <code>numpy</code> arrays doesn't really
    make sense because we probably care about the truth value of each element (bitwise),
    not the truth value of the array.</p>\n</blockquote>\n<p>Notice that when I print
    <code>arr</code> all the elements are a string - and the <code>dtype</code> is
    <code>&lt;U21</code> for all elements.</p>\n<p>This is not how I instantiated
    the array so be aware of that behavior with numpy.</p>\n<blockquote>\n<p><code>&lt;U21</code>
    is a dtype expressing the values are 'Little Endian', Unicode, 12 characters.
    See <a href=\"https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types\">here</a>
    for docs for docs</p>\n</blockquote>\n<p>So for logical comparisions we should
    look at the error message then...\nOur handy error message says to try <code>any</code>
    or <code>all</code></p>\n<p>Because the datatypes in this example are basically
    strings, using <code>arr.any()</code> will result in an error that I do not fully
    understand, but <code>any(arr)</code> and <code>all(arr)</code> work...</p>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">arr</span><span class=\"o\">.</span><span
    class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">48</span><span class=\"o\">-</span><span class=\"mi\">25</span><span
    class=\"n\">ecac52db96</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"o\">/</span><span
    class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
    class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
    class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
    class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
    class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
    class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
    class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
    class=\"n\">numpy</span><span class=\"o\">/</span><span class=\"n\">core</span><span
    class=\"o\">/</span><span class=\"n\">_methods</span><span class=\"o\">.</span><span
    class=\"n\">p</span> <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">57</span>
    <span class=\"ow\">in</span> <span class=\"n\">_any</span>                                                                                     <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>                                                                                                  <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">54</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">_any</span><span
    class=\"p\">(</span><span class=\"n\">a</span><span class=\"p\">,</span> <span
    class=\"n\">axis</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"o\">=</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">out</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
    class=\"n\">keepdims</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"o\">*</span><span class=\"p\">,</span> <span
    class=\"n\">where</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">):</span>               <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    \   <span class=\"mi\">55</span> <span class=\"err\">\u2502</span>   <span class=\"c1\">#
    Parsing keyword arguments is currently fairly slow, so avoid it for now              \u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">56</span> <span class=\"err\">\u2502</span>
    \  <span class=\"k\">if</span> <span class=\"n\">where</span> <span class=\"ow\">is</span>
    <span class=\"kc\">True</span><span class=\"p\">:</span>                                                                      <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"err\">\u2771</span>
    \ <span class=\"mi\">57</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
    class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span>
    <span class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
    class=\"p\">)</span>                                      <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">58</span> <span class=\"err\">\u2502</span>
    \  <span class=\"k\">return</span> <span class=\"n\">umr_any</span><span class=\"p\">(</span><span
    class=\"n\">a</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"p\">,</span>
    <span class=\"n\">out</span><span class=\"p\">,</span> <span class=\"n\">keepdims</span><span
    class=\"p\">,</span> <span class=\"n\">where</span><span class=\"o\">=</span><span
    class=\"n\">where</span><span class=\"p\">)</span>                             <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">59</span>
    \                                                                                           <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">60</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">_all</span><span
    class=\"p\">(</span><span class=\"n\">a</span><span class=\"p\">,</span> <span
    class=\"n\">axis</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">,</span> <span class=\"n\">dtype</span><span class=\"o\">=</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"n\">out</span><span
    class=\"o\">=</span><span class=\"kc\">None</span><span class=\"p\">,</span> <span
    class=\"n\">keepdims</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"o\">*</span><span class=\"p\">,</span> <span
    class=\"n\">where</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">):</span>               <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"n\">UFuncTypeError</span><span class=\"p\">:</span> <span class=\"n\">ufunc</span>
    <span class=\"s1\">&#39;logical_or&#39;</span> <span class=\"n\">did</span> <span
    class=\"ow\">not</span> <span class=\"n\">contain</span> <span class=\"n\">a</span>
    <span class=\"n\">loop</span> <span class=\"k\">with</span> <span class=\"n\">signature</span>
    <span class=\"n\">matching</span> <span class=\"n\">types</span> <span class=\"p\">(</span><span
    class=\"kc\">None</span><span class=\"p\">,</span> <span class=\"o\">&lt;</span><span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"err\">&#39;</span><span
    class=\"nc\">numpy</span><span class=\"o\">.</span><span class=\"n\">dtype</span><span
    class=\"p\">[</span><span class=\"n\">str_</span><span class=\"p\">]</span><span
    class=\"s1\">&#39;&gt;) -&gt; None</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"nb\">all</span><span class=\"p\">(</span><span
    class=\"n\">arr</span><span class=\"p\">):</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"k\">if</span> <span class=\"nb\">any</span><span
    class=\"p\">(</span><span class=\"n\">arr</span><span class=\"p\">):</span>\n<span
    class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span
    class=\"n\">foo</span>\n</pre></div>\n\n</pre>\n\n<p>Let's change the example
    to just use integers and see what happens:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">arr2</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span
    class=\"o\">.</span><span class=\"n\">array</span><span class=\"p\">([</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"kc\">True</span><span
    class=\"p\">,</span> <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"n\">arr2</span>\n<span class=\"n\">array</span><span
    class=\"p\">([</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">0</span><span
    class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span> <span class=\"n\">NO</span>
    <span class=\"n\">VCS</span>  <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span
    class=\"p\">(</span><span class=\"n\">sandbox</span><span class=\"p\">)</span>
    <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span> <span class=\"k\">if</span>
    <span class=\"n\">arr2</span><span class=\"o\">.</span><span class=\"n\">any</span><span
    class=\"p\">():</span>\n<span class=\"o\">...</span><span class=\"p\">:</span>
    \    <span class=\"nb\">print</span><span class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">arr2</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p>Ah,
    now some sanity...\nFirst, the booleans are stored as integers, which based on
    this discussion makes sense.\nNext we check if <code>any</code> values (this is
    a bitwise operation) are <code>True</code>, which we see they are so the conditional
    evaluates to <code>True</code>.\nHowver, if we check that <code>all</code> values
    are <code>True</code> we see they aren't, the last value is <code>False</code>
    or <code>0</code> so the conditional fails.</p>\n<p>This is a different way to
    evaluate logical conditions than with lists and it's because of the special nature
    of numpy arrays that allows them to be compared bitwise but on the flip side,
    there isn't a meaningful way to evaluate the <code>truth value</code> of an array.</p>\n<h2
    id=\"pandas\">Pandas <a class=\"header-anchor\" href=\"#pandas\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Now for <code>pandas</code>,
    which under the hood is a lot of <code>numpy</code> but not fully.\n<code>pandas.Series</code>
    objects can hold mixed data types like lists, however to logically evaluate truth
    values we have to treat them like numpy arrays.</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">s</span> <span class=\"o\">=</span> <span class=\"n\">pd</span><span
    class=\"o\">.</span><span class=\"n\">Series</span><span class=\"p\">([</span><span
    class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"s2\">&quot;foo&quot;</span><span
    class=\"p\">,</span> <span class=\"kc\">True</span><span class=\"p\">,</span>
    <span class=\"kc\">False</span><span class=\"p\">])</span>\n\n<span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">s</span>\n\n<span class=\"mi\">0</span>        <span class=\"mi\">1</span>\n<span
    class=\"mi\">1</span>      <span class=\"n\">foo</span>\n<span class=\"mi\">2</span>
    \    <span class=\"kc\">True</span>\n<span class=\"mi\">3</span>    <span class=\"kc\">False</span>\n<span
    class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"nb\">bool</span><span class=\"p\">(</span><span
    class=\"n\">s</span><span class=\"p\">)</span>\n<span class=\"err\">\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>
    <span class=\"n\">Traceback</span> <span class=\"p\">(</span><span class=\"n\">most</span>
    <span class=\"n\">recent</span> <span class=\"n\">call</span> <span class=\"n\">last</span><span
    class=\"p\">)</span> <span class=\"err\">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E</span>\n<span
    class=\"err\">\u2502</span> <span class=\"o\">&lt;</span><span class=\"n\">ipython</span><span
    class=\"o\">-</span><span class=\"nb\">input</span><span class=\"o\">-</span><span
    class=\"mi\">60</span><span class=\"o\">-</span><span class=\"mf\">68e48</span><span
    class=\"n\">e81da14</span><span class=\"o\">&gt;</span><span class=\"p\">:</span><span
    class=\"mi\">1</span> <span class=\"ow\">in</span> <span class=\"o\">&lt;</span><span
    class=\"n\">cell</span> <span class=\"n\">line</span><span class=\"p\">:</span>
    <span class=\"mi\">1</span><span class=\"o\">&gt;</span>                                              <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"o\">/</span><span
    class=\"n\">home</span><span class=\"o\">/</span><span class=\"n\">u_paynen3</span><span
    class=\"o\">/</span><span class=\"n\">personal</span><span class=\"o\">/</span><span
    class=\"n\">sandbox</span><span class=\"o\">/.</span><span class=\"n\">venv</span><span
    class=\"o\">/</span><span class=\"n\">sandbox</span><span class=\"o\">/</span><span
    class=\"n\">lib</span><span class=\"o\">/</span><span class=\"n\">python3</span><span
    class=\"mf\">.8</span><span class=\"o\">/</span><span class=\"n\">site</span><span
    class=\"o\">-</span><span class=\"n\">packages</span><span class=\"o\">/</span><span
    class=\"n\">pandas</span><span class=\"o\">/</span><span class=\"n\">core</span><span
    class=\"o\">/</span><span class=\"n\">generic</span><span class=\"o\">.</span><span
    class=\"n\">p</span> <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    <span class=\"n\">y</span><span class=\"p\">:</span><span class=\"mi\">1527</span>
    <span class=\"ow\">in</span> <span class=\"n\">__nonzero__</span>                                                                            <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>                                                                                                  <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1524</span>
    <span class=\"err\">\u2502</span>                                                                                        <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1525</span>
    <span class=\"err\">\u2502</span>   <span class=\"nd\">@final</span>                                                                               <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>    <span class=\"mi\">1526</span>
    <span class=\"err\">\u2502</span>   <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"nf\">__nonzero__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>                                                               <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span> <span class=\"err\">\u2771</span>
    \ <span class=\"mi\">1527</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"k\">raise</span> <span class=\"ne\">ValueError</span><span class=\"p\">(</span>
    \                                                               <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">1528</span> <span class=\"err\">\u2502</span>
    \  <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>   <span
    class=\"sa\">f</span><span class=\"s2\">&quot;The truth value of a </span><span
    class=\"si\">{</span><span class=\"nb\">type</span><span class=\"p\">(</span><span
    class=\"bp\">self</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"vm\">__name__</span><span class=\"si\">}</span><span class=\"s2\"> is
    ambiguous. &quot;</span>                 <span class=\"err\">\u2502</span>\n<span
    class=\"err\">\u2502</span>    <span class=\"mi\">1529</span> <span class=\"err\">\u2502</span>
    \  <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>   <span
    class=\"s2\">&quot;Use a.empty, a.bool(), a.item(), a.any() or a.all().&quot;</span>
    \                      <span class=\"err\">\u2502</span>\n<span class=\"err\">\u2502</span>
    \   <span class=\"mi\">1530</span> <span class=\"err\">\u2502</span>   <span class=\"err\">\u2502</span>
    \  <span class=\"p\">)</span>                                                                                <span
    class=\"err\">\u2502</span>\n<span class=\"err\">\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F</span>\n<span
    class=\"ne\">ValueError</span><span class=\"p\">:</span> <span class=\"n\">The</span>
    <span class=\"n\">truth</span> <span class=\"n\">value</span> <span class=\"n\">of</span>
    <span class=\"n\">a</span> <span class=\"n\">Series</span> <span class=\"ow\">is</span>
    <span class=\"n\">ambiguous</span><span class=\"o\">.</span> <span class=\"n\">Use</span>
    <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">empty</span><span
    class=\"p\">,</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">bool</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">item</span><span class=\"p\">(),</span>
    <span class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">any</span><span
    class=\"p\">()</span> <span class=\"ow\">or</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">all</span><span class=\"p\">()</span><span
    class=\"o\">.</span>\n</pre></div>\n\n</pre>\n\n<p>Just like with numpy, we can't
    evaluate the truth value of the series in a meaningful way, but bitwise operations
    make perfect sense...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"err\">\u276F</span>
    <span class=\"k\">if</span> <span class=\"n\">s</span><span class=\"o\">.</span><span
    class=\"n\">any</span><span class=\"p\">():</span>\n<span class=\"o\">...</span><span
    class=\"p\">:</span>     <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n<span class=\"n\">foo</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"n\">NO</span> <span class=\"n\">VCS</span>
    \ <span class=\"n\">via</span> <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span
    class=\"n\">sandbox</span><span class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"k\">if</span> <span class=\"n\">s</span><span
    class=\"o\">.</span><span class=\"n\">all</span><span class=\"p\">():</span>\n<span
    class=\"o\">...</span><span class=\"p\">:</span>     <span class=\"nb\">print</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;foo&quot;</span><span class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><strong>I
    thought this was about <code>and</code> and <code>&amp;</code>...</strong></p>\n<p>Right,
    so recall that <code>and</code> is a lazy boolean evaluation (ie. it evaluates
    the 'truth value' an object) whereas <code>&amp;</code> does bitwise comparison.</p>\n<p>What
    we see then with <code>pandas</code> and <code>numpy</code> is that if we want
    to do logical comparisons, we need to do them bitwise, ie. use <code>&amp;</code>.</p>\n<p>Keep
    in mind though that the data types make a big deal - we can't use <code>&amp;</code>
    with strings  because the bitwise operation isn't supported, for strings we need
    to use the boolean evaluation.</p>\n<h2 id=\"the-original-point\">The Original
    Point <a class=\"header-anchor\" href=\"#the-original-point\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>My main use case for
    this is finding elements in a dataframe/series based on 2 or more columns aligning
    row values...</p>\n<p>Say I have a dataframe like this:</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span>\n\n   <span class=\"n\">s</span> <span class=\"n\">s2</span>
    \  <span class=\"n\">s3</span>\n<span class=\"mi\">0</span>  <span class=\"mi\">1</span>
    \ <span class=\"mi\">0</span>  <span class=\"n\">foo</span>\n<span class=\"mi\">1</span>
    \ <span class=\"mi\">1</span>  <span class=\"n\">a</span>  <span class=\"n\">bar</span>\n<span
    class=\"mi\">2</span>  <span class=\"mi\">1</span>  <span class=\"n\">b</span>
    \ <span class=\"n\">baz</span>\n<span class=\"mi\">3</span>  <span class=\"mi\">2</span>
    \ <span class=\"n\">a</span>  <span class=\"n\">fee</span>\n<span class=\"mi\">4</span>
    \ <span class=\"mi\">2</span>  <span class=\"mi\">0</span>   <span class=\"n\">fi</span>\n</pre></div>\n\n</pre>\n\n<p>Example
    use case is I want to get the values in <code>s3</code> where <code>s</code> is
    1 and <code>s2</code> is 'a'. ie. I'm just after <code>bar</code> for now...</p>\n<p>Up
    until now I've always just tried <code>df.s3[(df.s == 1) and (df.s2 == &quot;a&quot;)]</code>
    the first time and every single time I've gotten this error that I just haven't
    ever fully understood:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ne\">ValueError</span><span
    class=\"p\">:</span> <span class=\"n\">The</span> <span class=\"n\">truth</span>
    <span class=\"n\">value</span> <span class=\"n\">of</span> <span class=\"n\">a</span>
    <span class=\"n\">Series</span> <span class=\"ow\">is</span> <span class=\"n\">ambiguous</span><span
    class=\"o\">.</span> <span class=\"n\">Use</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">empty</span><span class=\"p\">,</span> <span
    class=\"n\">a</span><span class=\"o\">.</span><span class=\"n\">bool</span><span
    class=\"p\">(),</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">item</span><span class=\"p\">(),</span> <span class=\"n\">a</span><span
    class=\"o\">.</span><span class=\"n\">any</span><span class=\"p\">()</span> <span
    class=\"ow\">or</span> <span class=\"n\">a</span><span class=\"o\">.</span><span
    class=\"n\">all</span><span class=\"p\">()</span><span class=\"o\">.</span>\n</pre></div>\n\n</pre>\n\n<p>But
    after this deep dive I think I've grasped that <code>and</code> doesn't actually
    do what I want here, and in order to do the bitwise comparision I need to use
    <code>&amp;</code></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"n\">NO</span> <span class=\"n\">VCS</span>  <span class=\"n\">via</span>
    <span class=\"mf\">3.8.11</span><span class=\"p\">(</span><span class=\"n\">sandbox</span><span
    class=\"p\">)</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s3</span><span
    class=\"p\">[(</span><span class=\"n\">df</span><span class=\"o\">.</span><span
    class=\"n\">s</span> <span class=\"o\">==</span> <span class=\"mi\">1</span><span
    class=\"p\">)</span> <span class=\"o\">&amp;</span> <span class=\"p\">(</span><span
    class=\"n\">df</span><span class=\"o\">.</span><span class=\"n\">s2</span> <span
    class=\"o\">==</span> <span class=\"s2\">&quot;a&quot;</span><span class=\"p\">)]</span>\n\n<span
    class=\"mi\">1</span>    <span class=\"n\">bar</span>\n<span class=\"n\">Name</span><span
    class=\"p\">:</span> <span class=\"n\">s3</span><span class=\"p\">,</span> <span
    class=\"n\">dtype</span><span class=\"p\">:</span> <span class=\"nb\">object</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"end\">End <a class=\"header-anchor\" href=\"#end\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Hopefully this set of
    ramblings brings some clarity to <code>and</code> and <code>&amp;</code> and you
    can Google one less error in the future in your logical comparison workflows \U0001F604</p>\n\n
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['python', 'tech']\ntitle: And-vs-&\ndate:
    2022-04-06T00:00:00\npublished: True\n#cover: \"media/And-vs-ampersand.png\"\n\n---\n\nI
    often struggle to remember the correct way to do `and` type comparisons when working
    in pandas.\n\nI remember learning long long ago that `and` and `&` are different,
    the former being lazy boolean evaluation whereas the latter is a bitwise operation.\n\n__I
    learned a lot from [this SO post](https://stackoverflow.com/questions/22646463/and-boolean-vs-bitwise-why-difference-in-behavior-with-lists-vs-nump)__\n\n##
    Lists \n\nPython `list` objects can contain unlike elements - ie. `[True, 'foo',
    1, '1', [1,2,3]]` is a valid list with booleans, strings, integers, and another
    list.\nBecause of this, we can't use `&` to compare two lists since they can't
    be combined in a consistent and meaningful way.\n\nHowever we can use `and` since
    it doesn't do bitwise operations, it just evaluates the boolean value of the list
    (basically if it's non-empty then `bool(my_list)` evaluates to `True`)\n\nHere's
    an example:\n\n```python\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F
    my_list = [1, \"2\", \"foo\", [True], False]\n\nsandbox NO VCS  via 3.8.11(sandbox)
    ipython\n\u276F bool(my_list)\nTrue\n```\n\n\nIf we compare `my_list` with `another_list`
    using `and` then the comparision will go:\n\n```\nif bool(my_list):\n    if bool(another_list):\n
    \      <operation> \n    else:\n       break\n```\n\nLet's see another example:\n\n```python\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F another_list = [False, False]\n\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F my_list and another_list\n[False,
    False]\n```\n\n\n`bool(my_list)` evaluated to `True`, and `bool(another_list)`
    _also_ evaluated to `True` even though it's full of `False` values because the
    object is non-empty.\n\n\n```python\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F
    if my_list and another_list:\n...:     print(\"foo\")\nfoo\n```\n\nSo using `and`
    in this case results in a `True` conditional, so the `print` statement is executed.\n\nFeels
    kind of counter-intuitive at first glance, to me anyways...\n\nHowever, we can't
    use `&` because there isn't a meaningful to do bitwise operations over these two
    lists:\n\n```python\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F my_list
    & another_list\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    Traceback (most recent call last) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\n\u2502
    <ipython-input-19-a2a16cebb3da>:1 in <cell line: 1>                                              \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\nTypeError:
    unsupported operand type(s) for &: 'list' and 'list'\n\n```\n\n## Numpy\n\n`numpy`
    arrays are special and they have a lot of fancy vectorization utilities built-in
    which make them great and fast for mathematical operations but now our logical
    comparisons need to be handled with a different kind of care.\n\nFirst thing though
    - without some trickery they do not hold mixed data types like a `list` does (necessary,
    I think, for the vectorized optimization that numpy is built on top of)\n\nWith
    that out of the way here's the main thing for this post, we can't just evaluate
    the `bool` of an array - numpy says no no no.\n\n```python\n\nsandbox NO VCS  via
    3.8.11(sandbox) ipython\n\u276F arr = np.array([\"1\", 2, True, False])\n\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F arr\narray(['1', '2', 'True', 'False'],
    dtype='<U21')\n\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F bool(arr)\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    Traceback (most recent call last) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\n\u2502
    <ipython-input-25-4e8c5dd85b93>:1 in <cell line: 1>                                              \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\nValueError:
    The truth value of an array with more than one element is ambiguous. Use a.any()
    or a.all()\n\n```\n\n> This means that using `and` with `numpy` arrays doesn't
    really make sense because we probably care about the truth value of each element
    (bitwise), not the truth value of the array.\n\nNotice that when I print `arr`
    all the elements are a string - and the `dtype` is `<U21` for all elements.\n\nThis
    is not how I instantiated the array so be aware of that behavior with numpy.\n\n>
    `<U21` is a dtype expressing the values are 'Little Endian', Unicode, 12 characters.
    See [here](https://numpy.org/doc/stable/reference/arrays.dtypes.html#specifying-and-constructing-data-types)
    for docs for docs\n\nSo for logical comparisions we should look at the error message
    then...\nOur handy error message says to try `any` or `all`\n\nBecause the datatypes
    in this example are basically strings, using `arr.any()` will result in an error
    that I do not fully understand, but `any(arr)` and `all(arr)` work...\n\n```python\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F if arr.any():\n...:     print(\"foo\")\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    Traceback (most recent call last) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\n\u2502
    <ipython-input-48-25ecac52db96>:1 in <cell line: 1>                                              \u2502\n\u2502
    /home/u_paynen3/personal/sandbox/.venv/sandbox/lib/python3.8/site-packages/numpy/core/_methods.p
    \u2502\n\u2502 y:57 in _any                                                                                     \u2502\n\u2502
    \                                                                                                 \u2502\n\u2502
    \   54 def _any(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True):
    \              \u2502\n\u2502    55 \u2502   # Parsing keyword arguments is currently
    fairly slow, so avoid it for now              \u2502\n\u2502    56 \u2502   if
    where is True:                                                                      \u2502\n\u2502
    \u2771  57 \u2502   \u2502   return umr_any(a, axis, dtype, out, keepdims)                                      \u2502\n\u2502
    \   58 \u2502   return umr_any(a, axis, dtype, out, keepdims, where=where)                             \u2502\n\u2502
    \   59                                                                                            \u2502\n\u2502
    \   60 def _all(a, axis=None, dtype=None, out=None, keepdims=False, *, where=True):
    \              \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\nUFuncTypeError:
    ufunc 'logical_or' did not contain a loop with signature matching types (None,
    <class 'numpy.dtype[str_]'>) -> None\n\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\n\u276F
    if all(arr):\n...:     print(\"foo\")\nfoo\n\nsandbox NO VCS  via 3.8.11(sandbox)
    ipython\n\u276F if any(arr):\n...:     print(\"foo\")\nfoo\n```\n\nLet's change
    the example to just use integers and see what happens:\n\n```python\nsandbox NO
    VCS  via 3.8.11(sandbox) ipython\n\u276F arr2 = np.array([1, True, False])\n\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F arr2\narray([1, 1, 0])\n\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F if arr2.any():\n...:     print(\"foo\")\nfoo\n\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F if arr2.all():\n...:     print(\"foo\")\n\n```\n\nAh,
    now some sanity...\nFirst, the booleans are stored as integers, which based on
    this discussion makes sense.\nNext we check if `any` values (this is a bitwise
    operation) are `True`, which we see they are so the conditional evaluates to `True`.\nHowver,
    if we check that `all` values are `True` we see they aren't, the last value is
    `False` or `0` so the conditional fails.\n\nThis is a different way to evaluate
    logical conditions than with lists and it's because of the special nature of numpy
    arrays that allows them to be compared bitwise but on the flip side, there isn't
    a meaningful way to evaluate the `truth value` of an array.\n\n\n## Pandas\n\nNow
    for `pandas`, which under the hood is a lot of `numpy` but not fully. \n`pandas.Series`
    objects can hold mixed data types like lists, however to logically evaluate truth
    values we have to treat them like numpy arrays.\n\n```python\n\nsandbox NO VCS
    \ via 3.8.11(sandbox) ipython\n\u276F s = pd.Series([1, \"foo\", True, False])\n\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F s\n\n0        1\n1      foo\n2     True\n3
    \   False\ndtype: object\n\nsandbox NO VCS  via 3.8.11(sandbox) ipython\n\u276F
    bool(s)\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    Traceback (most recent call last) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\n\u2502
    <ipython-input-60-68e48e81da14>:1 in <cell line: 1>                                              \u2502\n\u2502
    /home/u_paynen3/personal/sandbox/.venv/sandbox/lib/python3.8/site-packages/pandas/core/generic.p
    \u2502\n\u2502 y:1527 in __nonzero__                                                                            \u2502\n\u2502
    \                                                                                                 \u2502\n\u2502
    \   1524 \u2502                                                                                        \u2502\n\u2502
    \   1525 \u2502   @final                                                                               \u2502\n\u2502
    \   1526 \u2502   def __nonzero__(self):                                                               \u2502\n\u2502
    \u2771  1527 \u2502   \u2502   raise ValueError(                                                                \u2502\n\u2502
    \   1528 \u2502   \u2502   \u2502   f\"The truth value of a {type(self).__name__}
    is ambiguous. \"                 \u2502\n\u2502    1529 \u2502   \u2502   \u2502
    \  \"Use a.empty, a.bool(), a.item(), a.any() or a.all().\"                       \u2502\n\u2502
    \   1530 \u2502   \u2502   )                                                                                \u2502\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\nValueError:
    The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any()
    or a.all().\n\n```\n\nJust like with numpy, we can't evaluate the truth value
    of the series in a meaningful way, but bitwise operations make perfect sense...\n\n```python\n\n\u276F
    if s.any():\n...:     print(\"foo\")\nfoo\n\nsandbox NO VCS  via 3.8.11(sandbox)
    ipython\n\u276F if s.all():\n...:     print(\"foo\")\n\n```\n\n__I thought this
    was about `and` and `&`...__\n\nRight, so recall that `and` is a lazy boolean
    evaluation (ie. it evaluates the 'truth value' an object) whereas `&` does bitwise
    comparison.\n\nWhat we see then with `pandas` and `numpy` is that if we want to
    do logical comparisons, we need to do them bitwise, ie. use `&`.\n\nKeep in mind
    though that the data types make a big deal - we can't use `&` with strings  because
    the bitwise operation isn't supported, for strings we need to use the boolean
    evaluation.\n\n\n## The Original Point\n\nMy main use case for this is finding
    elements in a dataframe/series based on 2 or more columns aligning row values...\n\n\nSay
    I have a dataframe like this:\n```python\n\nsandbox NO VCS  via 3.8.11(sandbox)
    ipython\n\u276F df\n\n   s s2   s3\n0  1  0  foo\n1  1  a  bar\n2  1  b  baz\n3
    \ 2  a  fee\n4  2  0   fi\n```\n\nExample use case is I want to get the values
    in `s3` where `s` is 1 and `s2` is 'a'. ie. I'm just after `bar` for now...\n\nUp
    until now I've always just tried `df.s3[(df.s == 1) and (df.s2 == \"a\")]` the
    first time and every single time I've gotten this error that I just haven't ever
    fully understood:\n\n```python\nValueError: The truth value of a Series is ambiguous.
    Use a.empty, a.bool(), a.item(), a.any() or a.all().\n```\n\nBut after this deep
    dive I think I've grasped that `and` doesn't actually do what I want here, and
    in order to do the bitwise comparision I need to use `&`\n\n```python\nsandbox
    NO VCS  via 3.8.11(sandbox) ipython\n\u276F df.s3[(df.s == 1) & (df.s2 == \"a\")]\n\n1
    \   bar\nName: s3, dtype: object\n```\n\n## End\n\nHopefully this set of ramblings
    brings some clarity to `and` and `&` and you can Google one less error in the
    future in your logical comparison workflows \U0001F604\n"
published: true
slug: and-vs
title: And-vs-&


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