---
templateKey: til
tags: ['bash', 'linux']
title: Stow-Target
date: 2022-03-04T00:00:00
published: True
cover: "/static/stow-target.png"

---

Check out [stow](/stow) for a brief introduction to `stow`

What if I want to stow a package somewhere else?
Boom, that's where `-t` comes in...

Maybe I don't like having my `dotfiles` repo at `$HOME` and instead I want it in `~/git` or `~/personal` just to stay organized...
Well then I could have the same workflow except the `stow` command looks like this:

```bash
stow zsh -t ~/
#or
stow zsh -t $HOME
```
