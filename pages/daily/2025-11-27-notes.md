---
date: 2025-11-27 05:26:59
templateKey: dailyNote
title: 2025-11-27 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-11-26-notes]]

## Big Changes

- Got my workspaces script in working order

```bash
❯ COLUMNS=80 ws --help

 Usage: ws.py [OPTIONS] COMMAND [ARGS]...

 Manage git workspaces and worktrees

╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --install-completion          Install completion for the current shell.      │
│ --show-completion             Show completion for the current shell, to copy │
│                               it or customize the installation.              │
│ --help                        Show this message and exit.                    │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Commands ───────────────────────────────────────────────────────────────────╮
│ create   Create a new workspace.                                             │
│ add      Add a worktree to a workspace (allows multiple branches from same   │
│          repo).                                                              │
│ list     List all workspaces and their worktrees.                            │
│ close    Close a workspace and remove all its worktrees.                     │
│ status   Show git status for all workspaces (end-of-day summary).            │
│ git      Open lazygit - in current repo or pick from workspace worktrees.    │
│ open     Open a workspace or repository in tmux session (replacement for     │
│          'ta').                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯

```

- It's not quite configurable yet
- This will allow an easy way to setup workspaces that contain repos with relevant feature branches checked out - even multiple branches per repo if necessary
- Also migrated my tmux attach workflow to `ws open` which creates or attaches to a relevant tmux session

> kudos to [Waylon's thought on COLUMNS](https://waylonwalker.com/columns-env-var/)
