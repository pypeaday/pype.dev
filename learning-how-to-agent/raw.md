---
date: 2026-02-03 05:50:33
templateKey: blog-post
title: Learning How To Agent
published: True
cover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203122549_4aa1f66d.png
tags:
  - genai
  - tech
---

## Introduction & Background

I've been using AI tools for codegen for a few years now, but not super
heavily. I either use the in-line copilot stuff, which is like LSP on
seteroids, or I have gone all the way to the other side of full on vibecoding
with Windsurf. That's been fun enough, but not super fulfilling and at the end
of that I either have a simple webapp that does what I want but I don't
understand, or else a half-broken thing I tried to understand but couldn't
prompt in the right direction.

!!! note "One Caveat"

    My one caveat with Windsurf, which is a full IDE that I don't have a lot of comfortable navigation in due to all the Cascade keybindings clobbaring my own keymaps - is that with a HEAVY spec, it's done will with the Claude models at implementing a real idea I have. It's closer to vibe-engineering than vibe-coding, but that's my only instance, the rest of my Windsurf usage is "make me a cool app - no mistakes"

This year it feels like some tools exploded and
I mentioned this in [[new-job-caterpillar-autonomy]]. I've been using
[opencode](https://opencode.ai) a lot over the last few weeks and have iterated
many times already on a system of work that I'm trying to lean into for
improving my efficiency.

## The Problem Space

My desire for a great Developer Experience is years old now, shout out to
ThePrimeagen for his [FEM
course](https://frontendmasters.com/courses/developer-productivity-v2/) and
[Waylon Walker](https://waylonwalker.com) for being a constant source of
encouragement to be the best developer I can be. I sometimes (often) get
tunnel-visioned on developer-productivity initiatives and lose the forest
through the trees when ironing out a workflow - generally to find out I way
over complicated the solution OR worse, started solving a problem I don't even
have.

## First Attempt: Local Progress Tracker

Well that's where I've been for a few weeks... I'm building Nexus, my
second-brain at work to collaborate with agents on the truckload of stuff I'm
expected to get done. For a while now I've had a "working-notes" repo, which is
basically a blog, built with markata and navigated via markdown-lsp, where I do
like what I do here - take daily notes, track projects and status, and it gets
built into a nice little website I can reference with my boss.

Now that we have copilot in full-swing, I'm trying to integrate agents a bit
more. Opencode has made this so nice - so many tools and modes of interaction,
highly customizable interface but also an amazing default experience... So I
was trying to lean into using agents and subagents for more work I started down
the path of building out a progress tracker. I started with a simple "skill"
that told the agent to put some info into a sqlite file, and even create the
file and schema based on the work. This worked fine, but was specific to each
repo (and actually each worktree I was in) and it was hard for me to get
visibility into all the work my fleet of agents was doing. Now that's actually
problem 1 - I don't have a fleet of agents, I had some terminal sessions going
with opencode, but I got it in my head that I was going to have an army of
Claude's on my computer, constantly and autonomously knocking out tickets and I
needed to know who was doing what, where, when, and why..

## Nexus V1 & V2: The Over-Engineering Phase

So, I dropped the local "progress tracker" and jumped into a huge FastAPI
project that I called Nexus. It was a python cli + api, with a server for
centralized management. It presented a kanban board, had policy gates on
"plans" being approved before work could start on an Epic (and therefore any
child tickets). It has worktree tracking and automation, etc. It had a lot...
it didn't all work, and it was hard to build the autonomous system... I wanted
agentic feedback loops where `voidshaper` and I made epic plans for Epics (see the pun?) and then once the Plan was approved `star-commander` comes on the scene and makes tickets or checks tickets, depending on what's already ready to go it farmed out the work to `starsmith` (and variants for complexity) to build and then automatically calls in `recon-officer` and `qa-engineer` and at the end of it `gatekeeper` came in and
approved or denied the changes. If denied - automatically start the loop again,
tracking the work in Nexus, if approved - rebase and merge the branch, clean up
the worktree, update the ticket, close it, and get working on the next thing
that opens up. Ticket dependencies were in there, tracking stale agent
sessions, clever routing of tasks to smaller models where appropriate.... you
can see that I went too far too fast too hard.

![20260203124603_d5948740.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260203124603_d5948740.png)

Nexus went through 2 or 3 iterations of this feature set. I was building it with several constraints in mind - specifically at work. 1. rate-limiting on large models (so not just using opus for everything), 2. good stewardship (not burning down cities for docstrings - farm out that work to haiku or a -mini model), 3. Copilot support - even though I like to use opencode, I wanted to supper copilot cli and in vscode as a means to share this with my coworkers who were mostly using vscode, 4. agent sessions were dying so I needed some kind of liveness probe for manual intervention in sessions where maybe the vpn died and the agent lost network... stuff like this was on my mind - but you know what wasn't? actually doing some work... I was solving problems I don't have, but were fun to think about.

## The Reality Check

So, what are my problems? I boiled them down to a few things...

1. I want to manage my workstreams in workspaces - folders on my computer where I put git worktrees
2. I want varying levels of ai automation in my workflows... some things could be handled by an agent fully autonmously, but most things I'm at least paired up, reviewing diffs still, doing research while working, etc.
3. In those varying levels of automation, I wanted the same amount of task tracking to a centralized location

And after 2 weeks of ADHD-driven hyper focus, and many iterations on Nexus,
then Nexus V2.... what happened is that Nexus V2 died, and we say long live
Nexus V3!

## Nexus V3: The Pragmatic Pivot

Nexus V3 is the same idea, but different approach... I'm leaning into opencode
tooling specifically, dropping my care to support copilot given the lack of
features. I'm using a few opencode [plugins](https://opencode.ai/docs/plugins/)
([opencode-notify](https://github.com/kdcokenny/opencode-notify) and
[opencode-background-agents](https://github.com/kdcokenny/opencode-background-agents)
and a few [commands](https://opencode.ai/docs/commands/). Instead of building
my own tracker, I'm using [kanboard](https://kanboard.org/) because it's
basically a feature-complete agile/sprint/kanban board that I use at home, has
a simple plugin ecosystem for light customization, and solves practically every
status-tracking problem I tried to build from the ground up initially - ticket
dependencies/linkages, actions to change ticket colors for a simple intuitive
UI based on state, easy columns and tagging configuration, a simple API and
there's even an [mcp server](https://github.com/bivex/kanboard-mcp).

So, I've given up on the full automation for now, although
[opencode-pilot](https://github.com/athal7/opencode-pilot) looks VERY PROMISING
for this in the future. Today though, through some simple commands to give to
agents for updating kanboard, I manually put them in worktrees, and they get to
work - the tracking and human-in-the-loop model is going well for the work I
need done.

## Lessons Learned

I learned and relearned plenty of lessons on this over the last 2 weeks... Data
models matter more than almost anything, well-defined workflows are required if
you want agents to help you iterate, and not everything has to be a product...
That last one's personal, but every time I have an idea I **think** is good,
I'm sure it'll be something to share, but a good lesson for me is to just build
the things I need for me, and **eventually** maybe it can be cleaned up to
share, but when I start building something with anyone other than **me** in
mind, I'm in for a long hard journey

## Current State & Future

So what's the summary? I don't think I know how to agent super well yet - but
I'm trying to get better to stay on the forefront of my co-workers who I see
using AI in simple and sometimes scary ways

!!! danger "Copilot x sudo"

    Do not give copilot `sudo` on your CI server and say "fix my problem"... are you retarded???

I am not going hardcore with [ralph
wiggum](https://awesomeclaude.ai/ralph-wiggum) or
[gastown](https://github.com/steveyegge/gastown) - although those inspired
Nexus v1 and v2, but I am dialing in my agentic workflow with some simple
specialized agents, farming out work to subagents for context management,
planning ahead of time to put appropriate context in a ticket, and getting
close to having agents check out tickets, make worktrees, and do simple work by
themselves (this was working in Nexus V2 but only intermittenly).

Someday I'll open-source Nexus and share the configuration and workflow, for
now it's private as I'm actually using it to build out what I want rather than
trying to recreate gastown with a cool space theme.
