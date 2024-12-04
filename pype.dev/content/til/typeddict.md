---
templateKey: til
tags: ['til', 'python', 'tech']
title: Typeddict
date: 2022-04-15T00:00:00
published: True
cover: "media/typeddict.png"

---

Type hinting has helped me write code almost as much, if not more, than unit testing.

One thing I love is that with complete type hinting you get a lot more out of your LSP.
Typing dictionaries can be tricky and I recently learned about `TypedDict` to do exactly what I needed!


## The Problem

It might not be straight up obvious what the problem is, especially if you don't utilize tools like `mypy` or `flake8` in your development.

My handy-dandy `nvim-lsp` gives me a lot of feedback when I'm coding and it's immensely helpful.

So with the LSP giving me constant feedback here's the issue:

```python
from typing import Dict, List, Union

my_dict: Dict[str, Union[List[str], str]] = {
    "key_1": "val_1",
    "key_2": ["ls_1", "ls_2"],
}

my_dict["key_2"].pop()
```

With the above script you'll get an annoying warning about using `pop` on `key_2`.


![Alt text](/media/typed-dict-warning.png "dict-warning")


## The Solution

Maybe you can stomach getting yelled at by your LSP but I like complete silence if at all possible.

`TypedDict`  was the saving grace.

```python
from typing import TypedDict

MyDict = TypedDict("MyDict", {"key_1": str, "key_2": List[str]})

my_typed_dict: MyDict = {
    "key_1": "val_1",
    "key_2": ["ls_1", "ls_2"],
}


my_typed_dict["key_2"].pop()
```

![Alt text](/media/typed-dict.png "typeddict")

> I was able to import TypedDict from typing, mypy_extensions, and typing_extensions

With `TypedDict` you define your custom type, match the first argument to `TypedDict` with the name of the variable (idk why), then type hint each key you expect in the dict!
It's super easy and I think puts you into a position of being extremely explicit with your dictionary variables. 
This isn't always desired or appropriate but in most of my use cases it is.

## RTFM

There's other implementation of `TypedDict` and while writing this I saw that most of the docs define a `class` for the type like this:

```python
from typing import TypedDict
class MyDict(TypedDict):
    key_1: str
    key_2: List[str]

my_dict : MyDict = {'key_1': 'val_1', 'key_2': ["ls_1", "ls_2"]}

```

[pep docs](https://peps.python.org/pep-0589/)

[mypy docs](https://mypy.readthedocs.io/en/latest/more_types.html#typeddict)
