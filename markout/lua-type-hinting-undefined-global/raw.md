---
date: 2025-07-11 06:08:39
templateKey: til
title: Lua type hinting - undefined global
published: True
tags:
  - lua
  - til
  - tech
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250711111623_6317d028.png"
---

I have tons of linting errors in my nvim config, partly because I use Lazyvim
plus a set of poorly written customizations that have traveled with me for a
while. I try to re-work things and right now I've been revisiting my developer
setup. Well the LSP rrors as I've gone through my neovim config are ticking me
off - and this was the biggest one "Undefined global: vim". I saw `vim.fn`
everywhere but the LSP hated it... turns out `vim` is a given global and you
can help your lsp with this:

```lua
---@diagnostic disable: undefined-global
-- vim is a global in Neovim Lua scripts
```

For example:

```lua

---@diagnostic disable: undefined-global
-- vim is a global in Neovim Lua scripts
return {
  "pypeaday",
  dir = vim.fn.stdpath("config") .. "/lua/pypeaday",
  config = function()
    local daily = require("pypeaday.daily")
    vim.api.nvim_create_user_command("DailyNote", daily.check_and_open_daily_note, {})
    vim.api.nvim_create_user_command("Daily", daily.check_and_open_daily_note, {})
    vim.api.nvim_create_user_command("BackLinks", daily.find_backlinks, {})
    vim.keymap.set("n", "<leader>dn", daily.check_and_open_daily_note, { desc = "Open daily note" })
    vim.keymap.set("n", "<leader>df", daily.find_daily_files, { desc = "Find daily files" })
    vim.keymap.set("n", "<leader>dl", daily.find_backlinks, { desc = "Find backlinks" })
  end,
}
```
