---
date: 2024-12-06 07:25:59
templateKey: til
title: hostnamectl to easily change hostname
published: True
tags:
  - linux
  - terminal
  - homelab
  - cli
---

hostnamectl is apparently a linux utility for easily changing your hostname in a variety of ways

```bash

❯ hostnamectl --help
hostnamectl [OPTIONS...] COMMAND ...

Query or change system hostname.

Commands:
  status                 Show current hostname settings
  hostname [NAME]        Get/set system hostname
  icon-name [NAME]       Get/set icon name for host
  chassis [NAME]         Get/set chassis type for host
  deployment [NAME]      Get/set deployment environment for host
  location [NAME]        Get/set location for host

Options:
  -h --help              Show this help
     --version           Show package version
     --no-ask-password   Do not prompt for password
  -H --host=[USER@]HOST  Operate on remote host
  -M --machine=CONTAINER Operate on local container
     --transient         Only set transient hostname
     --static            Only set static hostname
     --pretty            Only set pretty hostname
     --json=pretty|short|off
                         Generate JSON output

See the hostnamectl(1) man page for details.
```

I learned there's transient and static hostnames, so that's cool...

The thing I needed was `hostnamectl --static hostname babyblue-aurora`

pretty sweet tool
