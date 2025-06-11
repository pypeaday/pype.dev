---
date: 2022-05-17 14:03:27
templateKey: til
title: Filepath Completion in Neovim
published: True
tags:
  - vim
  - tech
  - til

---


I've had `Plug 'hrsh7th/cmp-path'` in my plugins for ever but didn't notice
until recently that I wasn't getting any filepath completion in vim!

__Fuller setup instructions below the TLDR__

# TL;DR

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

# My Setup

For the sake of completeness here is how I currently (May 2022) configure completion in Neovim usin `nvim-cmp`

## Plugins

I keep all my plugins in `plugins.vim`

```vim
call plug#begin(s:plug_dir)
Plug 'neovim/nvim-lspconfig'
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
Plug 'hrsh7th/cmp-cmdline'
Plug 'hrsh7th/nvim-cmp'

" For ultisnips users.
<!-- " Plug 'SirVer/ultisnips' -->
<!-- " Plug 'quangnguyen30192/cmp-nvim-ultisnips' -->

call plug#end()

```

## Vim Settings

My vim settings are also kept in their own file, `settings.vim`

```vim

set completeopt=menu,menuone,noselect

```

## nvim-cmp configuration

I have a `cmp.lua` file that gets sourced in `init.lua` (file structure explained below) for configuring cmp.

```lua

  -- Setup nvim-cmp.
local cmp = require'cmp'

cmp.setup({
  snippet = {
    -- REQUIRED - you must specify a snippet engine
    expand = function(args)
      -- For `ultisnips` user.
      vim.fn["UltiSnips#Anon"](args.body)
    end,
  },
  window = {
      completion = cmp.config.window.bordered(),
  },
  mapping = {
    ['<Down>'] = cmp.mapping.select_next_item({ behavior = cmp.SelectBehavior.Select }),
    ['<Up>'] = cmp.mapping.select_prev_item({ behavior = cmp.SelectBehavior.Select }),
    ['<C-d>'] = cmp.mapping.scroll_docs(-4),
    ['<C-f>'] = cmp.mapping.scroll_docs(4),
    ['<C-Space>'] = cmp.mapping.complete(),
    ['<C-e>'] = cmp.mapping.close(),
    ['<Tab>'] = cmp.mapping(cmp.mapping.select_next_item(), { 'i', 's' }),
    ['<CR>'] = cmp.mapping.confirm({
      behavior = cmp.ConfirmBehavior.Replace,
      select = true,
    })
  },
  sources = cmp.config.sources({
    { name = 'nvim_lsp' },
    { name = 'ultisnips' },
    { name = 'buffer' },
    { name = 'path' },
    { name = 'tmux' },
    })
})

```


The `sources` section is what was key for this post...

# Piecing it together!

My `init.vim` sources plugins and then settings and then finally calls `init.lua`.
`init.lua` sources my `cmp.lua` file and BANG! auto-completion.

## More sources

hrsh7th's wiki for `nvim-cmp` is [here](https://github.com/hrsh7th/nvim-cmp/wiki/List-of-sources) and has example configs as well as a list of sources...

__Don't forget to configure and not just install!__

[my dotfiles](https://github.com/nicpayne713/dotfiles)
