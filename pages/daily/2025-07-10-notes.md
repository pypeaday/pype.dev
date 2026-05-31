---
date: 2025-07-10 06:54:26
templateKey: dailyNote
title: 2025-07-10 Notes
published: True
tags:
  - daily-note
---

[[2025-07-09-notes]] from yesterday

I have temporal stuff kind of going with postiz in a windsurf session working on [[thoughts-to-nostr]]

Been cleaning up my zshrc and tmux stuff... will be touching other dotfiles as well

I could make links to those 3 things... zshrc, tmux, and my dotfiles

---

I explored some rust replacements for common things - and I've been using them
loosely but trying to get some nice aliases into my zshrc

I worked with windsurf and added this to just get started

```bash
# Rust-based utility replacements
# File listing with eza (modern ls replacement, fork of exa)
if command -v eza &> /dev/null
then
    alias ls='eza'
    alias ll='eza -la'
    alias lt='eza -T --level=2'             # Tree view, 2 levels deep
    alias ltt='eza -T --level=3'            # Tree view, 3 levels deep
    alias lttt='eza -T'                     # Full tree view
    alias lg='eza -la --git'                # List with git status
    alias lm='eza -la --sort=modified'      # Sort by modified date
    alias lsize='eza -la --sort=size'       # Sort by size
fi

# Disk usage with dust (du replacement)
if command -v dust &> /dev/null
then
    alias du='dust'
    alias du1='dust -d 1'                   # Show only 1 level deep
    alias du2='dust -d 2'                   # Show 2 levels deep
    alias duh='dust -h'                     # Human readable
    alias dus='dust -s'                     # Sort by size
fi

# Directory tree with broot (interactive tree)
if command -v broot &> /dev/null
then
    alias br='broot'
    alias brs='broot --sizes'               # Show with sizes
    alias brh='broot --hidden'              # Show hidden files
fi

# Disk space with duf (df replacement)
if command -v duf &> /dev/null
then
    alias df='duf'
    alias dfa='duf -all'                    # Show all devices
fi

# Process viewer with procs (ps replacement)
if command -v procs &> /dev/null
then
    alias ps='procs'
    alias pst='procs --tree'                # Show process tree
    alias psc='procs --watch'               # Watch processes (like top)
fi

# Find with fd (find replacement)
if command -v fd &> /dev/null
then
    alias find='fd'
    alias fh='fd --hidden'                  # Include hidden files
    alias ft='fd --type f --exec-batch ls -la'  # Find files and show details
fi
```

## Wins

- rush tool exploration
- tried zoxide - it's overkill for me
