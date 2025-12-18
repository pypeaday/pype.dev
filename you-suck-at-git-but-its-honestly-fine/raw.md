---
date: 2025-07-21 05:20:07
templateKey: blog-post
title: You suck at git - but it's honestly fine
published: True
tags:
  - git
  - tech
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250721135446_dc7a2ee4.png"
---

## Git is for everyone

I just started listening to [localfirst.fm podcast](https://www.localfirst.fm/)
podcast and would recommend it after 2 episodes. In the first episode, the
hosts discuss where the term `localfirst` comes from, what it means, and
examples of some localfirst, or semi-localfirst projects. One of them is `git`

- the de-facto standard by which developers share code today.

There's a reason it's the standard. I'm not arguing that it's perfect, and
there's new abstractions that may help people adopt usage like
[jujutsu](https://github.com/jj-vcs/jj), but ultimately `git` is a great tool,
and anyone can use it who works with text files (lookin at you book-writing
nerds)

But as I was enjoying the pod the co-host/guest said "and we all know the git user
experience isn't that great"

!!! danger "heavy sigh"

    Git isn't that hard - you probably just aren't that good at it

## It's OK

Don't hear me say that you suck at git like that's a bad thing... It's _totally
fine_ to not be a wizard. Many people can use git like 80-90% efficiently for
their own use cases. In fact, my usage of git doesn't fall into any perfectly
established patterns, and the decisions I make are not always the same (the
overplayed rebase vs merge-upstream argument... I do both, it doesn't matter,
squash your crap at the end anyways...)

So continue to collaborate - checkout your feature branches, pull in
`origin/main` after a PR, ask for help with a rebase for the 69th time if you
need to

!!! danger ""

    But quit your stupid annoying bitching

## Seriously

Honestly, I learned _about_ git 8 years ago when I started my first job as a
data scientist. I was told by another developer, Jokko,
that it was the standard for collaboration... only issue was that almost no one
in our division even used it. Or if they did it was at the end of a project,
after sharing code on share drives and OneDrive, at the very end we'd see `git
init`, `git add .`, `git commit -m "pushed to git"`, `git push`... literally 0
value, or at least no more value than
`my_project_final_FINAL_v2_project-over-now.zip`

It took me a few weeks of on-the-job git usage, practicing way over complicated
git flows and talking about git with the few people around me who knew it, for
me to become a go-to resource... I was and am honestly still annoyed about
it... It didn't take that long, or that much effort, to get pretty comfortable
with git. There's tons of UIs (with their own flaws), TUIs, and resources for
learning the few things that will make you stand out as a git wizard:

1. can you rebase onto a new root commit?
2. can you pull in changes from someone else's feature branch?
3. if you find yourself in `detached HEAD state` are you panicked?

Just make a directory, `git init`, and start shitting all over text files...
make branches, reconcile differences, just freaking practice for 10 minutes

## End

I was triggered I guess listening to this podcast episode... It's fine to not
be an expert, it's fine to just use the 3 or 4 commands you probably need (`git
checkout -b, rebase origin/main, merge feature/branch, push`), I am happy to
help people with git everyday - like I said above, I am somehow a go-to
resource for git in my workplace.... (heck, even one of my managers asks me to
squash all the commits on his feature branches for him before it's merged to
main... it's fine)

But the user experience isn't bad, so quit your bitching.

---

??? note "phone notes"

    hot take, if you complain about git then you don't it... and that's fine but
    shut up. I love git,I use it in a way that's productive for me, and when I hear
    people complain all they ever say is "git is hard" and "why is rebasing so
    hard?!?!"
    but they don't get it, and that's fine. you can use git inefficiently, as a
    requirement of your job, and not enjoy it. but don't bitch, because with 10
    minutes of practice you could gain some real fluency in rebasing
