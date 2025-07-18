---
date: 2025-07-14 08:40:32
templateKey: blog-post
title: Python editable installs and nested scripts
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250715134251_a04fcb91.png"
tags:
  - python
  - tech
---

# Intro

I have been working towards a standard structure for all my python projects -
and I mean much more than just `uv init` or something along those lines. But
one of the things that got me recently was starting to keep a `scripts/` folder
that ran code based on what was in `src/` or `app/` (I'm working on that...)
being installed in the virtual environment... so I'd `uv pip install -e .` or
`uv pip install -e src` (kind of depends on the structure) and then in
`scripts/foo.py` I'd have `from my_cool_code.module import thing`....

Running scripts has never been a problem... but I've always kept them in the
root of the repo OR _inside_ `app` or `src` in a _nested_ directory...

So here's where I learned a little something about `python my_script.py` vs
`python -m my_script`

## Example

I setup a short example repo to illustrate the problem

[link to repo](https://github.com/pypeaday/python-e-example)

The repo structure is very simple...

```
python-e-example
  ├── foo.py
  ├── pyproject.toml
  ├── src
  │   ├── module.py
  ├── README.md
  └── scripts
      └── bar.py
```

`scripts/bar.py` and `foo.py` are the same code:

```python
from src.module import my_func

my_func()
```

and then `src/module.py`:

```python
def my_func():
    print("it worked!")
```

The rest of the structure is from `uv init` basically, then `uv venv` will make
your virtual environment, and `uv pip install -e .` will install the library in
editable mode.

### So what's the problem?

Let's run `foo.py`

```bash
nic in python-e-example   main   ×7 via   v3.13.1(python-e-example)   (dev) 󰒄
⬢ [devbox] ❯ python foo.py
it worked!
```

Nice! It works just like we'd expect...

What about `python scripts/bar.py`?

```bash
nic in python-e-example   main   ×7 via   v3.13.1(python-e-example)   (dev) 󰒄
⬢ [devbox] ❯ python scripts/bar.py
Traceback (most recent call last):
  File "/tmp/python-e-example/scripts/bar.py", line 8, in <module>
    from src.module import my_func
ModuleNotFoundError: No module named 'src'
```

!!! danger "Come again for big fudge..."

### Ok let's stay calm and troubleshoot

What if we open a `python` shell...

```bash
Python 3.13.1 (main, Dec 19 2024, 14:32:25) [Clang 18.1.8 ] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from src.module import my_func
>>> my_func()
it worked!
```

ok... as expected it worked, and we've learned nothing...

!!! warning "implicit behavior"

    We didn't learn anything from the example but something is present that we
    don't see... `python foo.py` implicitly adds the path to the script to
    `sys.path` and so the `src` library is in the same directory as the script
    `foo.py` so the library is on `sys.path`.... take note of this

## The Problem

Turns out `uv pip install .` and `uv pip install -e .` are _actually_ different

![20250705005214_a83dd563.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250705005214_a83dd563.png)

The editable install adds a `.pth` file into `site-packages` which acts as a
shell hook.

```txt
# .venv/lib/python3.13/site-packages/__editable__.python_e_example-0.1.0.pth

/tmp/python-e-example/src
```

So when `python` runs a script, the location of the script is
implicitly added to `sys.path` as noted above.
The `python` process invoked by `python
foo.py` has `$PWD` on `sys.path` which is `/tmp/python-e-example` in
the example but `python scripts/bar.py` has `/tmp/python-e-example/scripts`
on `sys.path`... which means that `/tmp/python-e-example` is NOT on `sys.path`
in the process that's running `scripts/bar.py` and so the `src` folder won't be
searched by python because the `.pth` file points to a directory that's no on
the path!

## The Solution

We can instead of running the script "as a script" we can tell python to
execute it as as a module with `python -m scripts.bar`. This is syntatically
similar to `python path/to/script.py` but instead tells the python interpreter
to execute the script as a module so the path is replaced by import syntax.

!!! note "This works for foo.py too"

```bash
⬢ [devbox] ✗ python -m foo
it worked!

⬢ [devbox] ❯ python -m scripts.bar
it worked!

```

## ChatGPT

It's noteworthy that jipity was helpful in exploring these issues I was running into

[link to convo](https://chatgpt.com/c/686d2a05-5b54-800f-8b84-1638c1b96840)
