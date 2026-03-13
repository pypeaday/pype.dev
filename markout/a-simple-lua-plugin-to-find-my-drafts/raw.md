---
date: 2025-08-10 20:56:33
templateKey: blog-post
title: A Simple Lua Plugin To Find My Drafts
published: True
tags:
  - neovim
  - tech
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020346_53647cd9.png"
---

I used windsurf to write [[daily-notes-neovim-plugin]] for navigating my daily notes in neovim.

For a while now I've wanted a way to see my blog drafts... and tonight finally got the massive courage to prompt gpt-5 to build it for me...

## Screenshot


![20250811020234_e0c02600.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250811020234_e0c02600.png)

## Code

```lua
---@diagnostic disable: undefined-global
-- Blogging plugin: find draft blog posts under `pages/`
-- Draft = YAML front matter contains `published: false` (case-insensitive)

local M = {}

-- Read file and return YAML front matter block as string, or nil
local function read_front_matter(path)
  local fh = io.open(path, "r")
  if not fh then
    return nil
  end
  local content = fh:read("*a")
  fh:close()
  if not content then
    return nil
  end

  -- Front matter starts with --- on first line and ends with --- on its own line
  -- Support optional CRLF
  local start_s, start_e = content:find("^%-%-%-%s*\r?\n")
  if not start_e then
    return nil
  end
  local fm_end_s, fm_end_e = content:find("\n%-%-%-%s*\r?\n", start_e + 1)
  if not fm_end_s then
    return nil
  end
  -- Extract between the fence lines (exclude the starting and ending --- lines)
  local front_matter = content:sub(start_e + 1, fm_end_s)
  return front_matter
end

-- Determine if a file is a draft by inspecting front matter for published: false
function M._is_draft(path)
  local fm = read_front_matter(path)
  if not fm then
    return false
  end
  -- Find a line starting with `published:` and capture the value
  -- Trim comments and quotes, compare case-insensitively
  local value = fm:match("[Pp][Uu][Bb][Ll][Ii][Ss][Hh][Ee][Dd]%s*:%s*([^\n\r]+)")
  if not value then
    return false
  end
  -- strip inline comments starting with # and surrounding quotes/space
  value = value:gsub("#.*$", "")
  value = value:gsub('"', ""):gsub("'", "")
  value = value:gsub("^%s+", ""):gsub("%s+$", "")
  local v = value:lower()
  if v == "false" or v == "no" or v == "0" then
    return true
  end
  return false
end

-- Telescope picker for draft posts
function M.find_drafts()
  local ok_pickers, pickers = pcall(require, "telescope.pickers")
  if not ok_pickers then
    vim.notify("telescope.nvim not available", vim.log.levels.ERROR)
    return
  end
  local finders = require("telescope.finders")
  local previewers = require("telescope.previewers")
  local conf = require("telescope.config").values
  local actions = require("telescope.actions")
  local action_state = require("telescope.actions.state")

  -- Collect markdown files under pages/
  local files = vim.fn.glob("pages/**/*.md", false, true)
  local drafts = {}
  for _, f in ipairs(files) do
    if M._is_draft(f) then
      table.insert(drafts, f)
    end
  end

  if #drafts == 0 then
    vim.notify("No draft blog posts found in pages/", vim.log.levels.INFO)
    return
  end

  -- Simple, version-agnostic entry maker
  local function entry_maker_fn(line)
    return {
      value = line,
      ordinal = line,
      display = vim.fn.fnamemodify(line, ":~:.") or line,
      path = line,
    }
  end

  -- Use Telescope builtin find_files with a custom command that lists only drafts.
  -- This guarantees previews and matches the style of other file pickers.
  local tmpfile = vim.fn.tempname()
  local ok_write, err = pcall(function()
    local fh = assert(io.open(tmpfile, "w"))
    for _, f in ipairs(drafts) do
      fh:write(f .. "\n")
    end
    fh:close()
  end)
  if not ok_write then
    vim.notify("Failed to prepare drafts list: " .. tostring(err), vim.log.levels.ERROR)
    return
  end

  local builtin = require("telescope.builtin")
  builtin.find_files({
    prompt_title = "Draft Blog Posts",
    -- cat the tmp list so Telescope treats it like find output
    find_command = { "bash", "-lc", string.format('cat %q', tmpfile) },
    attach_mappings = function(prompt_bufnr, map)
      local actions = require("telescope.actions")
      actions.close:enhance({
        post = function()
          os.remove(tmpfile)
        end,
      })
      return true
    end,
  })
end

-- Expose a user command similar to daily plugin style
vim.api.nvim_create_user_command("BlogDrafts", function()
  M.find_drafts()
end, {})

return M


```


