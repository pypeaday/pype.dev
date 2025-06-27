---
date: 2025-06-20 06:55:31
templateKey: blog-post
title: Thinking In Diagrams
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622113224_3ca2c55d.png"
tags:
  - homelab
  - tech
  - dev-ops
  - planning
---

# Intro

Something I didn't appreciate earlier on in my career (and I'm only 8 as far as
the age of that career goes anyways) was thinking through problems with
diagrams... I've often approached a problem with code first, and immediately
started implementing a solution. There's nothing actually wrong with that especially when considering:

1. people think differently
2. some people think with their fingers
3. recognizing that the first thing you build should be thrown away should give you freedom to "just start"

Now with that said, let's chat about how awesome diagrams are though...

1. they put context in front of you without details
2. you can express many more components of a system in a consumable way when compared to code
3. diagrams help prioritize work and bubble up maybe unforseen dependencies
4. they force you to wireframe before getting lost in the details

## Wireframing

One of my biggest issue when I "just start coding" is not having a direction...
I can put a few place holders `def this:` `def that:` in a few python modules,
but without having every place holder in front of me it is hard to keep them
straight, know the order or dependencies, etc.

Diagrams aren't beholden to a text file or series of them, and you can fit much
more on your screen because you have all the X-Y available to you instead of
the height of your monitor times your formatted lined length (usually 120 for
me).

Diagrams also make it easy to spew out onto a page the different components you
need for a solution, without committing to an order (something that I cannot
express well in scripts)

## A Plan

Diagramming with purpose can get you to the place of having almost a
paint-by-number experience building your app/system/etc. Beecause you separate
the implemetation from the design and when you implement BASED on a design
rather than implement to DISCOVER a design you will be more efficient and in my
experience I've improved my ability to forsee issues that I wouldn't have seen,
or have historically missed, by putting the design down in front of me, the
details of any integrations, etc. before starting to "just code".

## Good Enough

A final note about diagrams for right now is that they're easy to leave as
"good enough". The point was to get a guide for solving a problem.

Diagrams don't have to be picture perfect, even for documentation's sake. They
can even remain somewhat unfinished (permitted you don't get yourself into a
bind of treating diagrams as docs that you didn't clean up)

Here's an example of what I mean - I'm working on a simple workflow to take my
[[thoughts]] and post them to [[nostr]]. I started with a diagram like this...

![20250622112223_f1838d9b.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112223_f1838d9b.png)

> In parallel I'm working on posting my blog to other social media - this small
> workflow is apart of a larger initiative I'm working on at home

AS you can see this diagram isn't super detailed or pretty. But what it does it
help me see the high level points of bringing my published thoughts to nostr as
posts.

After I have the simple steps, I've started diagramming out more details of each step:

![20250622112415_f18663e3.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250622112415_f18663e3.png)

The diagram is easy to put notes on, add some color to for problems not yet solved, etc.

And then with this diagram in front of me, it's easy to begin building
small-scoped components that will be assembled to my larger system, but without
the pressure of constructing every part of the system at once

# Fin

Diagrams help me break up a problem into manageable chunks so that I can put
the things I need later on the back-burner and can focus on one achievable
thing at a time.
