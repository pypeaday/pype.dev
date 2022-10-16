---
templateKey: blog-post
tags: ['git', 'tech']
title: Git-Worktrees-01
date: 2022-03-11T00:00:00
published: False
cover: "/static/git-worktrees-01.png"

---

## Git 

Hopefully if you write code you are using git, if not go learn the basics of `commit`, `pull`, `push`, and `pull request`/`merge request` like... right now.

Assuming you are at least familiar with git then you probably work the same way I have since I've been using it.

1. clone or initialize a repo
2. checkout a branch, `git checkout -b my-feature`
3. work on `my-feature` and when ready open a PR into `main`
4. `git pull main` then `git checkout -b another-feature`
5. etc...


What if you need to switch between branches for some reason? Often I'm jumping into projects with my co-workers left and right, and I'll have changes that I'm either working on or exploring for them.
When it's time to switch branches I think there's more elegant ways than this but I've always done this:

1. `stash` the current changes
2. checkout out the relevant branch 
3. helped out 
4. re-checkout my original branch
5. `pop` the `stash`

Now, that's not awful but I think `worktrees` will make this nicer for a few reasons!

## Worktrees

Worktrees are linked branches that have their own directories somewhere on your computer.
To checkout a branch you don't have to worry about stashing any changes, you just `cd` into the directory of that branch.

> The branch can be literally anywhere - it doesn't have to be in the repo folder


## Use Case

I've seen ThePrimeagean argue for worktrees for several reasons, see a YT video [here](https://www.youtube.com/watch?v=2uEqYw-N8uE)

I'm entirely in Python at the moment, or working with projects that dont' have that kind of requirement (ie. this website).
My reason for wanting worktrees is 3 fold.

### Files that could have been gitignored but ain't

I have a `.envrc` I put in every project, but it's not gitignored for reasons that aren't relevant right now...
If I switch branches I'll stash everything I have at the time, including my .envrc, but then if I forget to pop the stash and I move on and come back then my environment isn't active and I have to go find the stash, pop it, cd out, and then back in and honestly.... that sucks.
Worktrees will let me have the .envrc in every branch, and if I checkout or switch to a new one, my personal branch is unaffected.


### Symlinks

In my team's [Kedro](https://kedro.readthedocs.io/en/stable/01_introduction/01_introduction.html) workflow we keep a specific directory, the `conf` directory at a different spot than the Kedro team has in their templates (the why is outside the scope here).
The way I preserve every kedro utility for my own benefit is to symlink our `conf` to where the Kedro template expects it to be. 
But then everytime I stash changes I lose that symlink so I either just don't have it for the time being or I recreate it which is a hassle
Worktrees will let me have that present and persistent on all my branches at once.

### Foo

Because why not!? This workflow feels future-proof, and if my toolset changes down the line then having this worktree centric workflow might be helpful and I'm just prepping for that possibility!
