---
date: 2022-05-17 14:03:27
templateKey: til
title: Filepath Completion in Neovim
tags:
  - vim

---


I've had `Plug 'hrsh7th/cmp-path'` in my plugins for ever but didn't notice
until recently that I wasn't getting any filepath completion in vim!

## Fix?

Turns out I need to not be a dope and configure nvim-cmp to actually use it...


```lua
local cmp = require'cmp'

cmp.setup({
    -- removed rest of setup - see the rest in my dotfiles
  sources = cmp.config.sources({
    { name = 'path' },  -- This needs to be here!
    })
})
```

[my dotfiles](https://github.com/nicpayne713/dotfiles)
