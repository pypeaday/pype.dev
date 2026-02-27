---
date: 2025-06-17 09:52:17
templateKey: til
title: source_up for nested .envrc
published: True
tags:
  - homelab
  - tech
  - direnv
  - cli
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250617150127_baf832c3.png"
---

# TLDR

I have a use case for nesting directories with cascading .envrc files. and ran
into an issue where the parent environment was being reset by the child
environment. The fix is `source_up`

# Context

I manage some infrastructure at home with a folder like this:

```bash
.
├── homelab
│   ├── .envrc
│   └── stack1
│       ├── .envrc
```

I do this so that the "homelab-wide" terraform variables can be exported with
`TF_VAR_the_variable` in the `homelab/.envrc` and then the stack specific
variables in `stack1/.envrc` get exported like `TF_VAR_stack_specific_var`.

For example, my cloudflare account id is needed in every stack, but the
cloudflare zone id is different per stack - so instead of copying the account
id var to every stack (however the vars are managed), I can set it in a parent
.envrc and share it in nested stack directories

## Problem

```
# homelab/.envrc
#!/bin/bash
export VAR_FOO=BAR
```

So when I `cd homelab` I get

```
nic in /tmp/homelab   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET
⬢ [devbox] ❯ direnv allow
direnv: loading /tmp/homelab/.envrc
direnv: export +VAR_FOO

nic in /tmp/homelab   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET
⬢ [devbox] ❯ env | grep VAR
VAR_FOO=BAR

```

You can see `VAR_FOO` is set... but now I'll `cd stack1`

```
nic in /tmp/homelab   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET
⬢ [devbox] ❯ cd stack1
direnv: error /tmp/homelab/stack1/.envrc is blocked. Run `direnv allow` to approve its content

nic in /tmp/homelab/stack1   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET
⬢ [devbox] ❯ direnv allow
direnv: loading /tmp/homelab/stack1/.envrc
direnv: export +VAR_BAZ

nic in /tmp/homelab/stack1   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET
⬢ [devbox] ❯ env | grep VAR
VAR_BAZ=BAM

```

As you can see `VAR_FOO` was unset, and `VAR_BAZ` is set... so `homelab/.envrc` was blown away!

## Fix

Edit `stack1/.envrc` with a `source_up` command

```
# stack1/.envrc # NEW
#!/bin/bash
source_up  # source the parent environment
export VAR_BAZ=BAM

```

After the edit

```
nic in /tmp/homelab/stack1   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET
⬢ [devbox] ❯ vim .envrc
direnv: error /tmp/homelab/stack1/.envrc is blocked. Run `direnv allow` to approve its content

nic in /tmp/homelab/stack1   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET  took 5s
⬢ [devbox] ❯ direnv allow
direnv: loading /tmp/homelab/stack1/.envrc
direnv: loading /tmp/homelab/.envrc
direnv: export +VAR_BAZ +VAR_FOO

nic in /tmp/homelab/stack1   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET
⬢ [devbox] ❯ env | grep VAR
VAR_FOO=BAR
VAR_BAZ=BAM

```

Both vars are set!
