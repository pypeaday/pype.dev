---
templateKey: til
tags: ['git']
title: Git-Bisect
date: 2022-05-03T00:00:00
published: False
cover: "/static/git-bisect.png"

---

I try to commit a lot, and I also try to write useful tests appropriate for the scope of work I'm focusing on, but sometimes I drop the ball...

Whether by laziness, ignorance, or accepted tech debt I don't always code perfectly and recently I was dozens of commits into a new feature before realizing I broke something along the way that none of my tests caught...

Before today I would've manually reviewed every commit to see if something obvious slipped by me (talk about a time suck 😩)

__There must be a better way__

# Bisect?

`git bisect` is the magic sauce for this exact problem...

You essentially create a range of commits to consider and let `git bisect` guide you through them in a manner akin to Newton's method for finding the root of a continuous function.

# How to do it?

Start with `git bisect start` and then choose the first `good` commit (ie. a commit you know the bug isn't present in)

```bash

sandbox   bisect-post   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect start

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good 655332b
bisect-post  HEAD         main         ORIG_HEAD
5b31e1e  -- [HEAD]    add successful print (52 seconds ago)
308247b  -- [HEAD^]   init another loop (77 seconds ago)
4555c59  -- [HEAD^^]  introduce bug (2 minutes ago)
9cf6d55  -- [HEAD~3]  add successful loop (3 minutes ago)
bcb41c3  -- [HEAD~4]  change x to 10 (4 minutes ago)
3c34aac  -- [HEAD~5]  init x to 1 (4 minutes ago)
12e53bd  -- [HEAD~6]  print cwd (4 minutes ago)
655332b  -- [HEAD~7]  add example.py (10 minutes ago)  # <- I want to start at this commit
59e0048  -- [HEAD~8]  gitignore (23 hours ago)
fb9e1fb  -- [HEAD~9]  add reqs (23 hours ago)

```

```bash

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad 5b31e1e
bisect-post                                                ORIG_HEAD
HEAD                                                       refs/bisect/good-655332b6c384934c2c00c3d4aba3011ccc1e5b57
main
5b31e1e  -- [HEAD]    add successful print (5 minutes ago)  # <- I start here with the "bad" commit
308247b  -- [HEAD^]   init another loop (6 minutes ago)
4555c59  -- [HEAD^^]  introduce bug (6 minutes ago)
9cf6d55  -- [HEAD~3]  add successful loop (7 minutes ago)
bcb41c3  -- [HEAD~4]  change x to 10 (8 minutes ago)
3c34aac  -- [HEAD~5]  init x to 1 (9 minutes ago)
12e53bd  -- [HEAD~6]  print cwd (9 minutes ago)
655332b  -- [HEAD~7]  add example.py (14 minutes ago)
59e0048  -- [HEAD~8]  gitignore (23 hours ago)
fb9e1fb  -- [HEAD~9]  add reqs (23 hours ago)

```

After starting bisect with a "good" start commit and a "bad" ending commit we can let git to it's thing!

Git checksout a commit somewhere about halfway between the good and bad commit so you can see if your bug is there or not.

```bash

sandbox   bisect-post (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad 5b31e1e
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[bcb41c3854e343eade85353683f2c1c4ddde4e04] change x to 10

sandbox   HEAD (bcb41c38) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯
```

In my example here I have a python script with some loops and print statements - they aren't really relevant, I just wanted an easy to follow git history.

So I check to see if the bug is present or not either by running/writing tests or replicating the bug somehow.

In this session commit `bcb41c38` is actually just fine, so I do `git bisect good`

```bash

sandbox   HEAD (bcb41c38) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good
Bisecting: 1 revision left to test after this (roughly 1 step)
[4555c5979268dff6c475365fdc5ce1d4a12bd820] introduce bug

```

And we see that git moves on to checkout another commit...

In this case the next commit is the one where I introduced a bug

`git bisect bad` then gives me:

```bash

sandbox   HEAD (4555c597) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[9cf6d55301560c51e2f55404d0d80b1f1e22a33d] add successful loop
```

At `4555c597` the script works as expected so one more `git bisect good` yields...

```bash
sandbox   HEAD (9cf6d553) (BISECTING)   ×1 via   v3.8.11(sandbox)  on  (us-east-1)
❯ git bisect good
4555c5979268dff6c475365fdc5ce1d4a12bd820 is the first bad commit
commit 4555c5979268dff6c475365fdc5ce1d4a12bd820
Author: ########################### 
Date:   Tue May 3 09:00:00 2022 -0500

    introduce bug

 example.py | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)


```

# What happened?

Git sliced up a range of commits based on me saying of the next one was good or bad and localized the commit that introduced a bug into my workflow!

I didn't have to manually review commits, click through logs, etc... I just let git checkout relevant commits and I ran whatever was appropriate for reproducing the bug to learn when it was comitted!

