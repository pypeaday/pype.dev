---
date: 2025-07-17 21:11:32
templateKey: note
title: Daily Notes Neovim Plugin
published: True
tags:
  - neovim
  - note
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717110106_fd6c5444.png"
---

# What?

Windsurf helped me whip up a neovim plugin for my daily notes workflows. It has
a few features that make my note taking workflow day-to-day a tiny bit more
fluid

!!! note "credit due"

    Honestly my zettlekasten and this daily notes stuff is only possible with the help of [Waylon Walker](https://waylonwalker.com)

## Context

I learned about the concept of a [zettlekasten]() recently and it really spoke
to me. I've sought for YEARS to have a nice note-taking workflow, where I never
think about _where_ to put something, it's searchable, portable to some degree,
and customizable... I've used OneNote and its derivatives, different
self-hosted container based note taking apps, raw markdown files scattered on
my file system, etc... I think I've finally landed on a solution which is
basically this blog + some tooling to achieve the things I want...

- [markata](https://markata.dev) is the build system, it's what lets me keep all my notes in markdown files, and build them into a cohesive searchable experience on the web
- [neovim](https://neovim.io) is my primary note taking environment - using tools like `marksman` I get the ability to "jump" to wiki-linked posts and grep content easily for searching
- [copier](https://copier.readthedocs.io) is used for generating note templates - whether it's a `til`, blog post, or starting my daily note page - copier makes it quick to stub out the file in the right place with the right tags and frontmatter for markata

## Usage

I'll explain the daily notes workflow here, the code is below...

There's basically just a couple things I wanted smoothed out in my note-taking as I am getting started here...

1. I need an immediate way to get to my daily notes page... I have started keeping a new note for each day and it's a chore to copy paste the old note, update the date, delete content, etc... instead `check_and_open_daily_note` checks the directory I keep my daily notes in `pages/daily` in my blog repo, checks the date for a note for today and either creates it from the copier template or opened it as my current buffer

> I could maybe improve this by making it global so that no matter what directory I'm in I could open the daily note with a keymap or lua function call instead of swapping tmux sessions and then opening the file

2. I need a way to link to _yesterday_'s notes so it's easy to "go to definition" on the wiki link which opens the file...
3. I wanted to track page linking... this is something core for me as I am building out my personal knowledge base, but I have key areas in my life where I want to see graphical links, or at least make it easy to trace thoughts I've had like clicking through wikipedia, so the `find_backlinks` function brings up a menu of all the pages that link to the one I'm in

I'm sure I'll add more functions as time goes on - it'd be ncie to open certain slash pages like [[now]] with a keymap... drop me a note at `nic@pype.dev` if you've got any great ideas!

## Code

My dotfiles are private at the moment for work reasons, and the plugin is in
there but here's the start of the code!

```lua

---@diagnostic disable: undefined-global
-- vim is a global in Neovim Lua scripts
local M = {}

function M.check_and_open_daily_note()
  local daily_dir = "pages/daily"
  local today = os.date("%Y-%m-%d")
  local pattern = string.format("%s/%s*-notes.md", daily_dir, today)
  -- Check if today's note exists
  local files = vim.fn.glob(pattern, false, true)

  if vim.tbl_isempty(files) then
    -- Create new note via copier
    os.execute("copier copy ~/dotfiles/copier/.copier_templates/daily .")

    -- Re-glob to get the new file (may need to wait a moment for creation)
    vim.wait(500, function()
      return not vim.tbl_isempty(vim.fn.glob(pattern, false, true))
    end, 10)

    files = vim.fn.glob(pattern, false, true)
  end

  -- Open the note (if multiple, just pick the first)
  if not vim.tbl_isempty(files) then
    vim.cmd("edit " .. files[1])
  else
    print("Failed to find or create today's note.")
  end
  vim.cmd("mode")
end

-- Find and copy a wikilink to the most recent previous daily note
function M.copy_previous_daily_wikilink()
  local daily_dir = "pages/daily"
  local today = os.date("%Y-%m-%d")

  -- Get all daily note files
  local pattern = string.format("%s/*-notes.md", daily_dir)
  local all_files = vim.fn.glob(pattern, false, true)

  if vim.tbl_isempty(all_files) then
    vim.notify("No daily notes found", vim.log.levels.WARN)
    return
  end

  -- Sort files by date (newest first)
  table.sort(all_files, function(a, b)
    -- Extract dates from filenames
    local date_a = a:match("/(%d%d%d%d%-%d%d%-%d%d)")
    local date_b = b:match("/(%d%d%d%d%-%d%d%-%d%d)")

    if not date_a or not date_b then
      return false
    end

    return date_a > date_b
  end)

  -- Find the most recent note before today
  local previous_note = nil
  for _, file in ipairs(all_files) do
    local date = file:match("/(%d%d%d%d%-%d%d%-%d%d)")
    if date and date < today then
      previous_note = file
      break
    end
  end

  if not previous_note then
    vim.notify("No previous daily notes found", vim.log.levels.WARN)
    return
  end

  -- Extract the slug (filename without extension)
  local filename = vim.fn.fnamemodify(previous_note, ":t")
  local slug = filename:match("(.+)%..+$") or filename

  -- Create wikilink format
  local wikilink = "[[ " .. slug .. " ]]"

  -- Copy to system clipboard
  vim.fn.setreg("+", wikilink)
  vim.notify("Copied previous daily note link: " .. wikilink, vim.log.levels.INFO)
end

function M.find_daily_files()
  require("telescope.builtin").find_files({
    cwd = "pages/daily",
    sorting_strategy = "ascending",
  })
end

function M.find_backlinks()
  local slug = vim.fn.expand("%:t:r")
  if slug == "" then
    print("Cannot find backlinks for a file without a name.")
    return
  end

  local pattern = string.format("\\[\\[[\\s]*%s[\\s]*\\]\\]", slug)
  require("telescope.builtin").live_grep({
    default_text = pattern,
    search_dirs = { "pages" },
    prompt_title = "Backlinks for [[" .. slug .. "]]",
    additional_args = { "--pcre2" },
  })
end

-- Create user command for copying previous daily note wikilink
vim.api.nvim_create_user_command("CopyPreviousDailyLink", M.copy_previous_daily_wikilink, {})

return M
```

---

## Update!

I added a feature to my new daily note generation that puts `yesterday: [[ <link to most recent day's notes> ]]` at the top of my new notes!

```lua

---@diagnostic disable: undefined-global
-- vim is a global in Neovim Lua scripts
local M = {}

function M.open_now_slash()
  local file = "pages/slash/now.md"
  -- TODO
  -- open this file
  vim.cmd("edit " .. file)
end

function M.check_and_open_daily_note()
  local daily_dir = "pages/daily"
  local today = os.date("%Y-%m-%d")
  local pattern = string.format("%s/%s*-notes.md", daily_dir, today)
  -- Check if today's note exists
  local files = vim.fn.glob(pattern, false, true)
  local did_create = false

  if vim.tbl_isempty(files) then
    -- Create new note via copier
    os.execute("copier copy ~/dotfiles/copier/.copier_templates/daily .")

    -- Re-glob to get the new file (may need to wait a moment for creation)
    vim.wait(500, function()
      return not vim.tbl_isempty(vim.fn.glob(pattern, false, true))
    end, 10)

    files = vim.fn.glob(pattern, false, true)
    did_create = true
  end

  -- Open the note (if multiple, just pick the first)
  if not vim.tbl_isempty(files) then
    vim.cmd("edit " .. files[1])
    -- If we just created the note, insert yesterday wikilink automatically
    if did_create then
      local get_previous_daily_slug = M._get_previous_daily_slug
      if get_previous_daily_slug then
        local prev_slug = get_previous_daily_slug()
        if prev_slug then
          local wikilink = "[[ " .. prev_slug .. " ]]"
          local bufnr = vim.api.nvim_get_current_buf()
          local lines = vim.api.nvim_buf_get_lines(bufnr, 0, -1, false)
          local replaced = false
          for i, line in ipairs(lines) do
            if line:match("^yesterday:%s*$") then
              lines[i] = "yesterday: " .. wikilink
              -- Ensure a blank line above and below the yesterday line
              local yidx = i
              -- Above
              if yidx == 1 or not (lines[yidx - 1] or ""):match("^%s*$") then
                table.insert(lines, yidx, "")
                yidx = yidx + 1
              end
              -- Below
              if yidx == #lines or not (lines[yidx + 1] or ""):match("^%s*$") then
                table.insert(lines, yidx + 1, "")
              end
              replaced = true
              break
            end
          end
          if not replaced then
            local insert_idx = math.min(11, #lines + 1)
            -- Insert blank line, yesterday line, then blank line
            table.insert(lines, insert_idx, "")
            table.insert(lines, insert_idx + 1, "yesterday: " .. wikilink)
            table.insert(lines, insert_idx + 2, "")
          end
          vim.api.nvim_buf_set_lines(bufnr, 0, -1, false, lines)
          vim.notify("Inserted yesterday link: " .. wikilink, vim.log.levels.INFO)
        end
      end
    end
  else
    print("Failed to find or create today's note.")
  end
  vim.cmd("mode")
end

-- Internal helper: get most recent previous daily note slug (not necessarily yesterday)
function M._get_previous_daily_slug()
  local daily_dir = "pages/daily"
  local today = os.date("%Y-%m-%d")

  -- Get all daily note files
  local pattern = string.format("%s/*-notes.md", daily_dir)
  local all_files = vim.fn.glob(pattern, false, true)

  if vim.tbl_isempty(all_files) then
    return nil
  end

  -- Sort files by date (newest first)
  table.sort(all_files, function(a, b)
    local date_a = a:match("/(%d%d%d%d%-%d%d%-%d%d)")
    local date_b = b:match("/(%d%d%d%d%-%d%d%-%d%d)")
    if not date_a or not date_b then
      return false
    end
    return date_a > date_b
  end)

  -- Find the most recent note before today
  local previous_note = nil
  for _, file in ipairs(all_files) do
    local date = file:match("/(%d%d%d%d%-%d%d%-%d%d)")
    if date and date < today then
      previous_note = file
      break
    end
  end

  if not previous_note then
    return nil
  end

  local filename = vim.fn.fnamemodify(previous_note, ":t")
  local slug = filename:match("(.+)%..+$") or filename
  return slug
end

-- Find and copy a wikilink to the most recent previous daily note
function M.copy_previous_daily_wikilink()
  local slug = M._get_previous_daily_slug()
  if not slug then
    vim.notify("No previous daily notes found", vim.log.levels.WARN)
    return
  end
  local wikilink = "[[ " .. slug .. " ]]"
  vim.fn.setreg("+", wikilink)
  vim.notify("Copied previous daily note link: " .. wikilink, vim.log.levels.INFO)
end

function M.find_daily_files()
  require("telescope.builtin").find_files({
    cwd = "pages/daily",
    sorting_strategy = "ascending",
  })
end

function M.find_backlinks()
  local slug = vim.fn.expand("%:t:r")
  if slug == "" then
    print("Cannot find backlinks for a file without a name.")
    return
  end

  local pattern = string.format("\\[\\[[\\s]*%s[\\s]*\\]\\]", slug)
  require("telescope.builtin").live_grep({
    default_text = pattern,
    search_dirs = { "pages" },
    prompt_title = "Backlinks for [[" .. slug .. "]]",
    additional_args = { "--pcre2" },
  })
end

-- Create user command for copying previous daily note wikilink
vim.api.nvim_create_user_command("CopyPreviousDailyLink", M.copy_previous_daily_wikilink, {})

return M
```
