---
date: 2025-07-27 06:38:30
templateKey: dailyNote
title: 2025-07-27 Notes
published: True
tags:
  - daily-note

---

## File explorer

- I've lost a lot of my terminal workflow since picking up more work in kubernetes and terraform, mostly because of the work patterns of those around me and the slight differences between my dev machines... but I've dealt with it for too long. The first step to recovering some of my speed with file management specifically is to get a terminal file manager figured out.
- `finder` is the WORST file explorer on the planet and I use a Mac daily so it has to end
- superfile looks nice, but I could immediately even get "go bacK" to work with their vim keybindings, so I'm out
- trying yazi now...
  - theme done with "flavors": https://github.com/yazi-rs/flavors
  - I cloned that to `~/.config/yazi/flavors/` and then was able to just use their few canned ones easily in `~/.config/yazi/theme.toml`

!!! danger "config oddness"

    I tried to setup showing hidden files in the config file but it didn't seem to work... but just hitting `.` in the tui showed my hidden files just fine

## Why?

- right now I'm trying to move all my homelab stuff to a mono-repo, so terminal file management makes that easier
  - I think I have to take down each compose stack to move it from
  `.../homelab-compose` to `.../homelab-mono/<something else>` which is
  annoying because I don't have a way to take all the compose stacks down and
  up yet... could make a simple custom config for it? ugh...

## Others

- Also I wanted to think about a way to backup my `~/.skm` directory since I'm
using [skm]() for my ssh keys, then I can restore from the back on a new laptop
and have all my keys ready to go
  - [kanboard ticket](https://kanboard.paynepride.com/?controller=TaskViewController&action=show&task_id=247&project_id=8)

- started transitioning quadtask over to fully AI driven dev - curious if I can have windsurf actually generate feature ideas or not

## Wins

- I forgot how magicaly ssh + tmux is... I wrote this in my daily notes BUFFER on my desktop from this repurposed laptop in my living room... so amazing
