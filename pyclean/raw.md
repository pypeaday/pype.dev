---
templateKey: til
tags: ['python', 'tech']
title: Pyclean
date: 2022-03-22T00:00:00
published: True
cover: "media/pyclean.png"

---

I like to keep my workspace clean and one thing that I don't personally love looking at is the `__pycache__` directory that pops up after running some code.
The `*.pyc` files that show up there are python bytecode and they are cached to make subsequent runs a tad faster. 
My stuff never really needs this bonus speed boost and so I came across a neat tool called `pyclean`!

## Pyclean

The easiest way (**in my opinion**) to run `pyclean` is to just use `pipx run`.

```bash
sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)  took 9s
❯ ls
abcmeta.py  __pycache__  python-print-align.py  system-monitor-psutils.py

sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)
❯ pipx run pyclean .
⚠️  pyclean is already on your PATH and installed at /usr/bin/pyclean. Downloading and running anyway.
Cleaning directory .
Total 1 files, 1 directories removed.

sandbox/src  🌱 main 🗑️  ×3🛤️  ×2via 🐍 v3.8.11 (sandbox)
❯ ls
abcmeta.py  python-print-align.py  system-monitor-psutils.py

```

## Why not bash?

You could accomplish something similar with `rm **/*.pyc` or `find -n '*.py?' -delete` but there's a chance you'll find something you don't love gone.
Also this won't help our poor Windows friends out there!
`pyclean` is fully python so it's OS independent.

## Credits!

[repo](https://github.com/bittner/pyclean)
