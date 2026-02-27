---
date: 2025-11-25 20:21:13
templateKey: dailyNote
title: 2025-11-25 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-11-24-notes]]

- Started learning git-worktrees today
- Talked with Waylon quite a bit about extending the shared `ta` workflow with worktrees now
- For me I think ~/projects/{work, personal}
  - my-repo-one (bare)
  - my-repo-one-wt-main
  - my-repo-one-wt-feature-1
- desired flows

  - starting work on a ticket:
    - make workspace for ticket-123 in ~/work/ticket-123.workspace
    - checkout feature branch of my-repo into ~/work/ticket-123.workspace/my-repo-feature-123
  - ending the day
    - look for dirty branches and page through diffs/commits
  - closing ticket
    - check for PRs
      - because you could haev 3 branches, 3 PRs, checked out in one workspace for the same repo

- Also want to update dotfiles so that I clone it to ~/personal and then `stow` with an appropriate target
