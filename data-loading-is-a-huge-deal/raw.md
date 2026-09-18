---
date: 2026-04-08 07:40:14
templateKey: blog-post
title: Data Loading is a Huge Deal
published: True
tags:
  - forge
  - rada
  - kedro
  - tech
---

I've been thinking about the work I am doing and have to do in my role at Cat,
in Cat Autonomy, building Forge (see [[forge-ahead]]). I feel like I have
little revelations almost every day now, not that it means I'm writing
something amazing and producing it really fast but there's just a whole suite
of problems that different technologies solve at different levels and the more
I become aware of the problems that exist, the more the existence of some
solutions makes sense.

!!! note "The Problem Perspective"

    I don't know if this is a real thinking technique or if I'm onto something
    novel(doubt) but I think a lot in terms of problems - "what problem needs
    solving?" and that's how I've come to prioritize my work, it's only been very
    recently that I've realized I do this and I think I should highlight it's very
    important to document the problem, otherwise every day you might try to solve a
    different problem but be working on the same code

!!! note "Problem Space"

    Kedro solves a lot of these problems, so when making rada in Reman the problem
    space was already more contained and narrow, Forge's problem-space is much more
    vast

The one problem I'm really fixated on right now is data loading, the problem I
need to solve is accessing data from a wide-variety of scripts/tools, without a
framework or standard method/library of accessing data in the first place. I've
seen lots of projects on GitHub claim to make data loading easier and I didn't
quite understand what problem they were solving... one example to name is [Data
Load Tool](https://dlthub.com/). I've seen similar ones I don't have the name
for right now that claim to make it easy/fast to load data from s3, or ways to
make s3 and a database both abstract in the user-experience for loading data.
But I hadn't really understood why these tools existed. I have a lot of
experience with [Kedro](https://dlthub.com/) and their
[DataCatalog](https://docs.kedro.org/en/latest/catalog-data/introduction/)
which provides a python object over a set of yamlfiles that makes it pretty
simple to load and save data in a way that isolates I/O from the business
logic. But what I didn't realize at the time how powerful that catalog was, the
power of standard patterns and shared libraries. Now that I don't have it
available to me, I'm quite aware of the absence.

In my new role something I'm realizing is that for all the developers my team
now supports, there isn't a canonical way to access data. When I was in Reman
and working with kedro, the DataCatalog was the access pattern and so when I
was developing a platform I never really had to think about it - it was an
established pattern that I treated as a constraint and then built processes
around it. I've been battling some mental block for weeks on Forge because of
the lack of that canonical pattern, and as I've talked with other engineers it
seems like the baseline assumption is that data is just available on a
filesystem, but everyone's code loads data in different ways. On my small Reman
team, with common patterns to build on, it was easy to make things cloud-native
or shim in some devops to improve people's lives. But when everyone's doing
their own thing, and everyone's "own thing" is very much built-on some rigid tribal
patterns then it's hard to really move fast cause everyone isn't already moving
in the same direction.

That made me realize that the first problem Forge needed to solve was in
providing a way for engineers to have filesystem-native data access in the
Cloud, where we are S3-first in our storage philosophy. I didn't need to figure
out a way for everyone to name a dataset, define the dataset in the first
place, and give a nice `my_dataset.load` that worked in python, bash, cpp, and
who knows what else.... I reframed the problem from "how do engineers load up
the data" to "how do engineers have access to the data". The requirements of
the Cat Autonomy group was pretty simple: POSIX-compliant storage.

My pathway to solving this problem is initially underway, I can't imagine it'll
be too difficult to setup for FSx instances for teams and give them an api to
run a Batch Job with the FSx mounted. From there, their code can load data from
`/mnt/fsx/<whatever>` just like they otherwise could be doing locally. Or maybe
FSx will let us setup mounts to very flexible mount points and their local
scripts will "just work" :shrugs:. I don't know the exact shape, but after
realizing the loading data is a big deal, I'm thankful I have a narrower
problem to solve first.

!!! note "S3 Files"

    Literally yesterday, AWS launched "S3 Files" offering an NFS filesystem service over buckets. I'm not sure if NFS is going to be a viable filesystem protocol for all of our use cases, but looks like we're not the only people who need the filesystem access patterns over S3.

!!! warning "A Future Problem - Canonical Reference"

    Another high-value thing Forge needs to solve is "what is data". The data
    formats we have are not super simple, it's not just a set of SQL tables. We
    have files that relate to each other based on hard-filepath patterns, and those
    patterns are full of tribal knowledge and distributed processes. So a simple
    question like "How do I use forge to access my data" is hard. In Reman a data
    scientist would ask "how do I use rada to access my data?" and the answer is
    "We use Kedro, and Kedro solved that problem for us via the Catalog" but
    without Kedro, without 100% being in python (devs are also in embedded systems,
    cpp code, and more), without even consistent practices in the existing "how do
    I access my data" workflows, it's really impossible to systemetize and codify
    it. It is my next challenge to tackle though...
