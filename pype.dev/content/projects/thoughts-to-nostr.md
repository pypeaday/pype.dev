---
date: 2025-07-08 08:30:35
templateKey: project
title: Thoughts To Nostr
published: False
tags:
  - projects
  - nostr
  - homelab
  - pipelines
---

I am trying to use [[temporal]] at home for running automated pipelines. It's
definitely overkill for my use case but this is America...

So my first project is a system that takes my [[thoughts]] and posts them to
[[nostr]] as I briefly discussed in [[testing-a-postiz-change-locally]].

I have temporal infrastructure setup in homelab-compose and then
homelab-temporal should probably be homelab-temporal-pipelines or something,
but it's the app code. I also have a repo homelab-social-media-pipelines -
which has been consolidated down into homelab-temporal. once that all works I
can destroy the homelab-social-media-pipelines repo

I am currently hitting a stupid python issue:

```
nic in homelab-temporal   main    ×2  ×4  ×7 via   v3.12.8(homelab-temporal)   (dev) 󰒄
⬢ [devbox] ❯ python -c "from homelab_temporal.postiz.postiz_client import PostizClient"
(homelab-temporal)
nic in homelab-temporal   main    ×2  ×4  ×7 via   v3.12.8(homelab-temporal)   (dev) 󰒄
⬢ [devbox] ❯ python scripts/postiz/simple_post.py
Traceback (most recent call last):
  File "/home/nic/projects/personal/homelab-temporal/scripts/postiz/simple_post.py", line 3, in <module>
    from homelab_temporal.postiz.postiz_client import PostizClient, process_for_nostr, process_for_x
ModuleNotFoundError: No module named 'homelab_temporal'
```

very dumb venv problem...

need to use `python -m` because the script is outside the project root? see [[2025-07-08-notes]] and the chatgpt notes for more on this but it works now

## TODOs

[] - destroy the homelab-social-media-pipelines repo
