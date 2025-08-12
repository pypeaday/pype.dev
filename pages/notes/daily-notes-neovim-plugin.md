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

see the [gist](https://gist.github.com/pypeaday/38192f6db4d77c7c3be2b9213e14db6c)

