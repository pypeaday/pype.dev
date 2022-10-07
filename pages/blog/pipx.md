---
templateKey: blog-post
tags: ['til', 'python']
title: Pipx
date: 2022-04-22T00:00:00
published: True
cover: "/static/pipx.png"

---


`pipx` is a tool I've been using to solve a few problems of mine...

1. pinning formatting tools like `black`, `flake8`, `isort`, etc. to the same version for all my projects
2. keeping virtual environments clean of things like `cookiecutter`
3. python utilities I want system wide but not in the global environment, like `visidata`

## What is it?

`pip` itself is just a package manager like `homebrew`, `apt`, etc. But it is tied to a python environment.
If you aren't using a virtual environment then `pip` will operate inside the global installation of python.

Operating within that environment has burned me several times and now I have a strict virtual environment usage policy.

But there are still things I don't want to have to put in every virtual environment - enter `pipx`

## What's it do?

When you `pipx install {package}` a stand alone virtual environment gets created (by default in `~/.local/pipx/venvs`).
THen you can install extra dependencies with `pipx inject {package} {dependency}`

> ex. After `pipx install visidata` in order to open Excel files you need to `pipx inject visidata xlrd`

In the example with `visidata`, I can then use it anywhere, in any project, without re-installing with `pip` in every env.

Also for the formatting tools - I configure vim to run the `pipx` versions of them on save - this way I don't have to put them in every project's virtual environment!

## What about pip?

So obviously you can't `pipx` everything, nor do you want to. 
I see it as a safe and better alternative to global package installation.

How can you then be sure that you never `pip install` into the global env?

Add `require-virtualenv = True` to your `pip.conf` and you're good to go!

With that set, if you try to `pip install pandas` into the global env you'll get a message like this:


```bash

~ on  (us-east-1)  NO PYTHON VENV SET
❯ pip install pandas
ERROR: Could not find an activated virtualenv (required).


```

## End

1. Disable your system `pip` to keep your base python safe
2. Use `pipx` for tools you want available everywhere or don't have to need in a virtual environment!
