---
date: 2026-04-26 07:09:48
templateKey: jira
title: Desktop Setup 2026
published: False
tags:
  - pc
  - jira
  - doing
---

## Overview

after [[desktop-crash-2026]] I need to set new things up, I'll track work here

## Services

- [ ] NEED TO SETUP DOCKER WAIT FOR ZFS
- [ ] speakr
  - took it, and all the "ai" stack off 'phantomlink'
  - it came back with all my data after shifting it around disks
  - [x] need to reverify this after zfs dataset move
- [x] ollama
  - lazydocker + `E` to pop a shell
  - [x] validate model migration from boot disk volumes path to zfs
- [x] whisper_asr
  - up just fine, speakr using it for transcription
- [x] open-webui
  - corrupted database, not sure what to do
  - new instance... just lose what I had
  - [ ] dad-can-i-wear-this model
- [x] remove /var/docker-storage-zfs/volumes/ after ollama migration

## SSH

Need to update my new ssh config and handles keys. I'll use this as an
opportunity to not proliferate tons of keys on my machine. I was making new
keys per user per client machine per target machine... I think I'll just go
back to ssh'ing as myself and only generate keys per client. ie. from my
desktop I'll only need 1 key except in the case of some of my boxes where I
setup a different user, so maybe I'll be cleaning up the users on some things
as well

- [x] forgejo
- [ ] pihole (I dont think this is around anymore, it's the .3 in my old ssh config)
- [ ] pihole-vpn (is this still around?)
- [ ] opnsense
  - update admin from dumbledore to nic?
- [ ] ghost
- [ ] ghost-vault
- [ ] router (same config as opnsense, probably dont' need both)
- [ ] pi3 (this is the real pihole I think)
- [ ] rootpi3 (config for root user... why not just sudo su when I login?)
- [ ] miix
- [x] jetkvm

## Data

- see [[dataops]]

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
