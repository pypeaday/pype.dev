---
date: 2025-12-30 05:33:02
templateKey: dailyNote
title: 2025-12-30 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-12-27-notes]]

## Dev

- taking a look at the zensical docs builds broken in my homelab

  - I pulled the forgejo runner image to build locally - but that image isn't used for building, just orchestrating the CI runs
  - so I docker pull ghcr.io/catthehacker/ubuntu:act-latest

    - installed just
    - cloned repo
    - just build-site works... wtf...

  !!! note "TLDR"

      The build was failing because Linux only allowed 128 inotify instances, and zensical starts its file-watcher even during a normal build. The watcher creates more than 128 inotify instances, hits the kernel limit, gets EMFILE (Too many open files), and then panics due to an unwrap().
      This had nothing to do with:
      ulimit -n (already high)
      max_user_watches (already high)
      PID limits
      Raising:
      /proc/sys/fs/inotify/max_user_instances
      fixed it immediately.
      In short: CI environment had a low inotify instance limit, and zensical’s watcher is not CI-safe.

- [[increase-inotify-limit-in-your-ci-workers]]

- Also got my blog build and push to GH much closer to my shared devops one...
  - using just in ci now, so the nostr well-known gets in there via just recipe
  - need to configure markout vs site for markata vs zensical repos
    - pype.dev
    - homelab-mono(-mirror)
    - dotfiles
    - DigitalHarbor? (this would imply I'm bringing in these custom things built with npm/astro/etc... probably out of scope)
