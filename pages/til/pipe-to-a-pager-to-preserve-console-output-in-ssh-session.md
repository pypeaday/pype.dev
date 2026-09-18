---
date: 2022-12-18 15:04:02
templateKey: til
title: Pipe to a pager to preserve console output in SSH session
published: True
tags:
  - linux
  - cli
  - til

---

I'm playing with my ansible playbook in a remote tmux session, and I'm no wiz
so I don't know the ins and outs, but I can't scroll up to get any console log
output that's not already visible on my screen. So I'm starting to end my
commands with ` | less` so I can page through the console output!

`ansible-playbook plays.yml -v --tags mytag | less`
