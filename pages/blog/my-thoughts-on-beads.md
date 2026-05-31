---
date: 2026-03-03 05:00:47
templateKey: blog-post
title: My Thoughts on Beads
published: True
cover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260303115635_629b64a7.png
tags:
  - ai
  - tech
---

[Steve Yegge](https://en.wikipedia.org/wiki/Steve_Yegge) is a pretty well-known individual in the tech field, having been
around for a long time at some of the larger companies. He's making quite a
splash in the agentic coding world as well. I've appreciated Steve's posts and
projects lately and wanted to put some thoughts on one called
[beads](https://github.com/steveyegge/beads).

## Beads

Beads is an issue tracker with links - issues relate to and block each other,
but agents use beads to keep track of information and dependencies without
storing it in their context 100% of the time. It seems like a very popular and
useful tool - but I am not using it, and that's what I wanted to capture... why
not?

The answer for me is about **where** the organization layer is for the
developer. Beads exists in a single repo - it's a system-wide CLI but you 'bd
init' in a git repo, and beads uses the `.git/` folder, worktrees, [dolt](https://docs.dolthub.com/), and some
git hooks to operate within that git repo. Outside the repo, it takes another
tool to tie together all the beads databases you might have.

For me, I'm hardly "in" a git repo anymore. My workflow is that when I have
something to work on, I create a "workspace" ([self-defined concept](https://pypeaday.github.io/dotfiles/terminal/workspaces/#installation)) which is
just a folder on my filesystem where I check-out git worktrees from any of the
repos related to the work I'm doing. Sometimes it's 1 worktree from 6 repos,
sometimes it's 6 worktrees from 1 repo for parallel work...

So because I like to organize myself in this way, beads is already "out" for
me. That's the main reason - I don't have any real technical issues with beads
or any criticism, it just is designed for a workflow that is not how I work.

This is why I'm building [[nexus]], something I hope to be able to put out
there "soon". It won't be as general-purpose as beads, but my goal with it is
to be plug-and-play for any agentic harness (copilot cli, claude code,
opencode, etc.). It's a challenge thinking about it as a personal tool but also
as a tool to share someday, but agentic coding is making it possible to make
some cool shareable stuff and I'm excited for my own workflow-task-manager to
mature and at least become something useful to me (it already is, but building
the plane in the air makes it kind of hard to enjoy the plane).

### Credit

- banner image from ChatGPT
