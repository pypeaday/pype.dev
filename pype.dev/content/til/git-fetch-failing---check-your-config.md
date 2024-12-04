---
date: 2024-04-18 08:32:33
templateKey: til
title: Git fetch failing - check your config
published: True
tags:
  - cli
  - data
  - tech

---

I started deploying a website to Cloudflare on a branch called `pages`. Similar to one of the GH Pages deployment patterns. But when my CI was pushing the branch I couldn't see it locally...

`git fetch -a` wasn't pulling any new branches, and `git branch -a` was only showing my development and main branches at the remote... so what gives?

I checked my git config, and to this moment I have no idea how this happened but check out my fetch config:
```
git config --get remote.origin.fetch
+refs/tags/*:refs/tags/*
```

So to fix this:

```
git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
```

Now `git fetch -a` works again
```
> git fetch -a

From github.com:DigitalHarbor7/DigitalHarbor
   357a28a..969b027  develop    -> origin/develop
   c052ac9..6d40210  main       -> origin/main
 * [new branch]      pages      -> origin/pages
```

