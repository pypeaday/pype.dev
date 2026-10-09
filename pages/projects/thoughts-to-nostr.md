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

NOTE: everything is moving to homelab-mono

## Issue 01

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

## Resolution

need to use `python -m` because the script is outside the project root? see [[2025-07-08-notes]] and the chatgpt notes for more on this but it works now

## Thoughts Order

as of [[2025-07-11-notes]] I have the thoughts ordering correct - we post the oldest thoughts up to the newest ones. Now I want more intros for the notes so they don't get too repetitive

## TODOs

[x] - destroy the homelab-social-media-pipelines repo

[] - think about how to structure things more... monorepo in homelab-temporal might be hard to manage with AI tools due to context management... unsure though

[] - create workflow and activities for thoughts to nostr... revisit diagram to see what you need to build out in the temporal repo

[] - do something like this for github stars and then blog posts

---

I need to update my templates for nostr og images using this as fodder

```html
<!-- HTML Meta Tags -->
<title>Nostr Design</title>
<meta
  name="description"
  content="A comprehensive resource for designers and developers to build successful nostr products"
/>

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://nostrdesign.org" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Nostr Design" />
<meta
  property="og:description"
  content="A comprehensive resource for designers and developers to build successful nostr products"
/>
<meta
  property="og:image"
  content="https://nostrdesign.org/img/nostr-cover.jpg"
/>

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta property="twitter:domain" content="nostrdesign.org" />
<meta property="twitter:url" content="https://nostrdesign.org" />
<meta name="twitter:title" content="Nostr Design" />
<meta
  name="twitter:description"
  content="A comprehensive resource for designers and developers to build successful nostr products"
/>
<meta
  name="twitter:image"
  content="https://nostrdesign.org/img/nostr-cover.jpg"
/>
```

## Dockerizing

I think I wnt to dockerize my workers and workflows... build them out of the `homelab-temporal` repo but then run them in compose stacks... that can get stitched together better but for now that'll probably be a good target.
I have things to think about though... for example the blog builder needs my ssh keys, or an ssh key for a user... also git is a little mess up anyways

- temporal [link](https://temporal-ui.paynepride.com/namespaces/default/workflows/blog-build-ee488b69-6cdf-4819-bccd-df183cf8ec13/01981101-e48b-712a-96db-328ce720c13c/history)

## Temporal

I haev temporal workflows and stuff that all seem to work

on [[ 2025-08-08-notes ]] I had issues with my nostr relay being too public, so I shut it down, reconfigured postiz and stuff and got it workign again, more restricted and in-memory database
