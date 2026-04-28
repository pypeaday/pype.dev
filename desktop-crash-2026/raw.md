---
date: 2026-04-22 05:57:40
templateKey: note
title: Desktop Crash 2026
published: False
tags:
  - advent
  - note
---

## PC Crash

Desktop crashed days ago, apparently my primary drive has been going bad for a while and eventually it just died.

- live-booted to ubuntu server
- found restic backup script to NAS
- edited to be smaller, but did the backup to the NAS
- rsync'd docker volumes to BX500 SSD which is a zfs pool

- captured what I did on ghost at /home/nic/aurora-recovery-report.md and /home/nic/aurora-crash-disk-health-report.md

### PLAN

- [x] install ~ubunto~ Aurora on 500 GB Samsung
- [ ] create zfs dataset for projects /tank/volumes/projects
  - [ ] which disk?
- [ ] mount zfs dataset /tank/volumes/projects to /home/nic/projects
- [ ] zfs for home? probably not, keep home on ext4
- [ ] mount old home and sync directly
  - restoring old backups to 2TB disk, will selectively copy things over
- [x] jetkvm key rotation
  - I recovered the old id_rsa one but I'm going to simplify my ssh key usage, so sticking with my default key, updated this in the jetkvm /settings/advanced webui
- [x] restore restic backup to a temp location `/var/docker-storage-zfs/home-restore/`
  - [ ] figure out what to keep
    - .skm (or consolidate keys)
    - 
    - ???
- [x] install windsurf in an ubuntu distrobox
  - [x] `distroboc create UbuntuDev --image=ubuntu:22.04`
  - [x] https://windsurf.com/download/editor?os=linux
  - [x] manual install method from distrobox
  - [ ] restore .windsurf? it's super old...

### Services

- [x] speakr
  - took it, and all the "ai" stack off 'phantomlink'
  - it came back with all my data after shifting it around disks
- [ ] ollama
  - need to repull some models I guess
- [x] whisper_asr
  - up just fine, speakr using it for transcription
- [ ] open-webui
  - corrupted database, not sure what to do

### Outcome

This is going terribly... blog post coming on what I should've done. What's
actually happening is that I basically just lost everything on that desktop
except my homelab repo thank God... 


## Plans to build

- vibe code an observability thing that
  - runs a restore in a container
  - run some kind of setup in that container at least for my shell and neovim and things
- networking for babyblue-aurora -> aurora transition
- lament draft posts that are lost
- ssh keys... lost .skm directory, look if it's copied anywhere otherwise rotate keys and simplify
- workspace backup everynight... abuse git for this
  - or rsync to external drive, you have zfs on aurora now
- opencode to address neovim logs
- switch to zellij?
  - what would have to translate from tmux? probably quite a few keybindings


I've been drowning in anxiety and depression over tech and AI, work and requirements, and my desktop SSD catastrophically failing while I didn't have an up to date backup... projects, ssh keys, ideas... gone. And that's ok, life goes on, so here's my start of a hectic list of what I'm doing to setup my desktop again. This will turn into a small post, a sister-post to the one I need to write about how I should've recovered from my live boot environment
