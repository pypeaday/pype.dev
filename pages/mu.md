---
templateKey: til
tags: ['python', 'git']
title: Mu
date: 2022-03-15T00:00:00
status: draft
cover: "/static/mu.png"

---

If you work with a template for several projects then you might sometimes need to do the same action across all repos.
A good example of this is updating a package in `requirements.txt` in every project, or refactoring a common module.
If you have several repos to do this across then it can be time consuming... enter `mu-repo`


## Mu

[mu-repo](https://fabioz.github.io/mu-repo/) is an awesome cli tool for working with multiple git repositories at the same time. 
There are several things you can do:

1. `mu status` will give you the `git status` of every registered repo (see below)
2. `mu sh` will let you execute system level commands in every repo
3. `mu stash` will stash all changes across all registered repos
4. There's literally a ton more but these are some handy ones


## Registration

`mu` tracks its own `groups`, and there is a default group when no particular one is active.
It's as simple as `mu register proj1 prog2 ...` to get repos registered

```bash 

❯ mu register proj1 proj2
Repository: proj1 registered
Repository: proj2 registered

❯ mu status

  proj1 : git status
    On branch main

    No commits yet

    Untracked files:
    (use "git add <file>..." to include in what will be committed)
    requirements.txt

    nothing added to commit but untracked files present (use "git add" to track)

  proj2 : git status
    On branch main

    No commits yet

    Changes to be committed:
    (use "git rm --cached <file>..." to unstage)
    new file:   requirements.txt


```

## Working with mu

As you can see above I have two projects each with a `requirements.txt` added but not committed yet.
Using `mu` I can stage this change across both repos at once.

```bash  

❯ mu add requirements.txt

  proj1 : git add requirements.txt

  proj2 : git add requirements.txt
```

Then as you might imagine, I can make the commit in each repo


```bash

❯ mu commit -m "Add requirements.txts"

  proj1 : git commit -m Add requirements.txts
    [main (root-commit) 18376d7] Add requirements.txts
    1 file changed, 1 insertion(+)
    create mode 100644 requirements.txt

  proj2 : git commit -m Add requirements.txts
    [main (root-commit) 18376d7] Add requirements.txts
    1 file changed, 1 insertion(+)
    create mode 100644 requirements.txt
```

## mu groups

The other thing I got a lot of use out of recently was `mu`'s groups.
At work I have about 40 repos cloned that are all based on the same kedro pipeline template.
Some of these projects have been deprecated.
I also have several more repos that are not kedro template - custom libraries or something.
`group` let me utilize `mu` across different groups of repos.

Say `proj2` is a deprecated project that I don't need to worry about making changes to anymore.
I don't just have to unregister it, instead I can make a group called "active" and register `proj1` in that group

```bash

❯ mu group add active --empty

~/personal
❯ mu group add deprecated --empty

~/personal
❯ mu group
  active
* deprecated

```


The `*` tells me which group is active. 
The `--empty` flag tells `mu` to not add all registered repos to that group.
If I don't want to use any groups then `mu group reset` will go back to the default group with all registered repos.

With groups I can register only the repos that I want to be working across in their own group and not worry about affecting other repos with my batch changes!

