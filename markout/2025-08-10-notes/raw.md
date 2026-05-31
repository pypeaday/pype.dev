---
date: 2025-08-10 05:52:42
templateKey: dailyNote
title: 2025-08-10 Notes
published: True
tags:
  - daily-note

---

yesterday: [[ 2025-08-09-notes ]]

## New

- trying out [https://github.com/matda59/ChoresRewards](ChoresRewards). It looks obviously vibe-coded, could re-vibe it myself if it looks great... Needing a way at home to help track and reward chores for both myself and the kids now
  - it's ok... have to put the pin code in everypage refresh which is super annoying
  - rewrite in fastapi with easier auth mechanisms would be nice

## Issues

- repoflow pypi
  - can't pip install from repoflow with remote repo configured for pypi with public access
  - emailed tomer
  - have gone back and forth several times - very responsive guy... makes me even more exicted for the project
  - Tomer has been very helpful - we iterated async today and got the pypi issue resolved

- repoflow dockerhub
  - unfortunately have issues with remote repos for dockerhub and my self-hosted container registry... 
  - sent tomer another email

- traefik logs dahsboard
  - tried to spin it up but it's confusing
  - otel and file logs... do i need both?
  - traefik config failing to be parsed when I add the otel config

## Wins:

- updated my [[daily-notes-neovim-plugin#Update]] plugin to auto-add "yesterday: " at the top of my new notes with the most previous day's wikilink pasted in there
- started a blogging plugin with shortcut to bring up all my drafts
  - [[a-simple-lua-plugin-to-find-my-drafts]]
- printer got all clogged up the other day - this glow in the dark filament is
challenging sometimes... after much toil this morning I was able to pull it all
the way out of the extruder mechanism and get Rob's print going in boring white
for now

- [[quadtask]] is deployed from my desktop now
  - litestream backup working beautifully

- stood up [[audiomass]] and it's gonna save me anywhere from 10-60 minutes every Sunday!
