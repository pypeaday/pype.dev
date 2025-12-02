---
date: 2025-06-13 20:58:00
templateKey: slashPage
title: Now
published: True
tags:
  - now
  - slash
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250614141616_0d1e39b0.png"
---

Started on [[2025-07-16-notes]] using this page for my "don't lose sight of the projects you're touching"

## Writing

- [[self-hosting-a-code-forge-with-forgejo]]

## Advent stuff

## Reflection Isaiah 8:17

!!! note "Isaiah 8:17"

    And I will wait for Yahweh,  who hides his face from the house of Jacob,  and I will await him.

`I will await him` -> this isn't "waiting" like being patient... The first
"wait" is, but the second "wait" isn't the same word. Seems like a few English
translations are pick something along the lines of patience rather than
expectation here...

I'm not an expert, but I do think `hope` is a better translation - part of that
influence is that it's the first day's reflection from this BP Advent Calendar
and this first week of Advent is about "Hope".

"Hoping" isn't just being patient - it's **expecting** what you are being
patient, it's longing for that thing to come, it's excited anticipation.

I'm in a short season of stress and waiting - but waiting for things that I
don't really want to happen, to happen... I pray in the Advent season Jesus will
keep my thoughts and hopes on him and not on the circumstances that are just as
imminent as His coming, albeit probably sooner.

## Reflection Psalm 39:7

!!! note "Psalm 39:7"

    And now, O Lord, for what do I wait?  My hope is for you.

## Dev

- pype.dev mirror works without `just` in the forgejo runner
  - GH Pages for my blog isn't right since it's path based routing, no need to keep up with GH pages then for deployment for my blog
  - [ ] Will eventually have forgejo/pype.dev -> build, sanitize, push to mirror -> then either cloudflare pick up from GH or cli deployment from forgejo runner
    - [x] forgejo builds and pushes markout
    - [ ] github pype.dev becomes target for mirror from forgejo
      - [ ] figure somethign out about the `main` on GH for pype.dev
    - [x] cloudflare stays the same for now
      - eventually deploy from forgejo or temporal, and have github repo just be a public archive of files
- [ ] need to clean up old repos like doomlab7/homelab-mono for example. I archived it but there's no point in keeping it around I think
- [x] need to setup dotfiles mirror too so GH can be public again

## Runescape

- [x] [Monkey Madness 1](https://oldschool.runescape.wiki/w/Monkey_Madness_I)
  - post on runelite plugins again
  - safespot the gorillas in the temple
    ![20251130112234_945c685a.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251130112234_945c685a.png)
    ![20251130122758_a8f58b1b.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251130122758_a8f58b1b.png)

## Hot

> NOTE: check the pages for updates to each project

- [[soonish]]

- [[should-data-models-be-fat]]

- ## Migrating my homelab stuff to a mono repo

  - [kanboard ticket for skm backup](https://kanboard.paynepride.com/?controller=TaskViewController&action=show&task_id=247&project_id=8)
  - [kanboard ticket for homelab mono migration](https://kanboard.paynepride.com/task/109)

- [[quadtask]]

  - just rebuild quadtask as a notifiq app

  - adding notification integration
  - QUE|ION: maybe quadtask should just support apprise... and soonish... maybe everything should just use apprise.
  - db clean up to get rid of my DDOS artifacts

- [[thoughts-to-nostr]]

## Auth

- [LLDAP github repo](https://github.com/lldap/lldap/blob/main/docs/install.md#with-docker)
- authelia?

## Warm

- [Digital Harbor](https://mydigitalharbor.com) is my long standing "thing"... I'm not sure what it'll turn into
- epub audiobooks for Amanda

- [[homelab-as-a-service]] -- product idea
- started [[autism-and-steadfast-faith]]

  - add repoflow post/writing in this same stream

- [[compose-stack-example-repo-x-package-manager]]

## Cold

Haven't forgotten about [[cronicle]]

I built a fun self-hosted weather app [[dad-can-i-wear-this]]
