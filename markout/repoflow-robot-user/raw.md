---
date: 2025-11-10 09:24:25
templateKey: blog-post
title: RepoFlow Robot User
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250812131651_8a5a13a9.png"
tags:
  - homelab
  - tech
---

I'm trying to lean into [repoFlow](https://repoflow.io) at home, and model some slightly better
patterns than open borders to artifacts across all my services. As I'm getting repoflow
going I see that I can make users in the console, but then I do have to invite
users to workspaces with a manually generate invite link.

The workspaces an abstraction layer, and in each workspace can be many kinds of
repositories. For my purposes I'll probably have 2 workspaces, even though 1
would almost certainly suffice.

There doesn't seem to be a way to add a user to a workspace from the admin
setting so for a while I was pretty confused why I couldn't add my robot user
to a docker repository in my main workspace...

After generating the invite link and accepting though then I see in the workspace settings a
simple click to give the robot user access to all repos (if you want)

![20251111122419_580b2ad4.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251111122419_580b2ad4.png)

![20251110162252_6c7b2fe9.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251110162252_6c7b2fe9.png)

`Can manage` allows the user to mutate tags (ie. push `latest` docker tags). If
the user only has `Can deploy` then they can only create new artifacts (ie. not
mutate any tags)
