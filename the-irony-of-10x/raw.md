---
date: 2026-03-26 06:00:50
templateKey: blog-post
title: The Irony of 10x
cover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260325120959_34c6a417.png
published: True
tags:
  - ai
  - tech
  - agents
  - personal
---

## Opener

Agentic coding has been an exciting change to me over the last couple of months
specifically. I've been using AI tools for a few years now but something really
shifted with Opus 4.5 as well as the tools/harnesses getting better and more
useful around the same time. I've been influenced by people like Simon Willison
and Steve Yegge who have been on the forefront of agentic coding and [vibe
engineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/) since the
dawn of ChatGPT and in my small circles of work I'm definitely on the bloodiest
bleeding edge of the adoption of these practices. Are they the future? I don't
know - I tried to maintain a skeptical posture but until the bubble pops it's
looking like this is at least a direction the future of my line of work is
going.

!!! danger ""

    The tough part is mixing the new world of agentic coding with
    developers on wildly different points in the spectrum of adoption and maturity.

Here's a short anecdote about what I mean...

In a new project that I'm on, I've refactored/reimplemented a lot of legacy
code, producing about 140k lines of code, configuration, and
docs in about 2 months. It's an insane amount of "product" and I've done it
entirely with agents. But I didn't do it with a handful of vanilla chat
sessions like "Hey Copilot, reimplement this API, no mistakes". I've been building
out my own process for using LLMs effectively. I have no actual idea besides my
own experience if what I'm building is useful, but it feels pretty good -
agents for planning, building, reviewing, testing, etc. My "harness" includes
specialized agents and opinionated development workflows
to try to ensure that code is never one-shotted into production.

The catch though is that I'm working with a handful of developers and they are not
early-adopters or aggressive experimenters with these new agentic tools. Most
of them are still in Steve Yegge's stage 2 or 3 of AI coding as he's outlined
[in this medium
article introducing
GasTown](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04). They
open a chat session, and say yes or no to Opus. I've been in-between stages
6 and 7 for a while now - managing multiple agentic sessions that themselves
run specialized subagents primarily for context management, although I don't
feel quite ready for full blown stage 8 (agents running agents running agents).
So this isn't me saying that I'm
"better" than the guys I'm working with, just the project we're on
together is now being touched by people on wildly different ends of the agentic
coding spectrum, and the project itself is an experiment to me of living in the "New World".

Finally the anecdote - I'm getting PRs from guys in stages 2 and 3,
thousands of lines of code and config, that I know they are not necessarily
experts in, but they're producing that code with fairly vanilla practices. How
do I verify it? I know my own prompts, I know what agents generated my code, I know
the direction and prodding I gave as they're building, but all
I know in a PR review from someone else is the diff - not how they tested it
(unless of course there's tests, and there must be, but tests are only as good
as the tests are...), not the steering they gave, not the manual UAT validation
they did, or even the full intent... And ultimately I own the code they merge
because chances are I outlast their contract with the team. It's kind of a
scary thing to review and accept... do I trust my
agentic practices to validate their work? Cause I certainly don't trust myself
to validate it perfectly.

!!! note "a note about contractors"

    I'm not implying anything about anyone who works contract, I think the facts is that contractors are typically dis-incentivized to really "own" something - an unfortunate consequence of the world.

## This is about me, not everyone

I want to make sure to reiterate the context of this post and my thoughts -
it's really about me. I'm not saying anything here is true for anyone else, I'm
not making predictions about tomorrow, and I'm not a prominent FOSS developer or a
high-profile ex-FAANG engineer. I'm not talking about every project under the sun.
I work at a big company, not a fast-paced startup. I work on internal tooling,
nothing that should even be seen outside our network. I'm also a self-taught
developer, not a trained software engineer.

As far as AI goes, lately I'm mostly all in on Github Copilot
CLI with a sprinkling of Opencode. I'm not using Claude Code or Codex which
seem to have their own communities around plugins and usage.

And since we're so focused on me right now, the important thing to keep as the
backdrop for this post is my temperament and make-up. I'm definitely made a
certain kind of way, not different than every single person necessarily, but
different enough, from enough people, to not blend in with the 9-5 guy who can
log out and not think about work until the morning (I'm not saying that's a
strength either, my boundary problems are for another time).

I feel an aggressive burden to solve problems and own those solutions, call it
white-knighting or a savior complex if you want, but I've got enough of a
reputation at Caterpillar now (and anywhere else I've worked) to become a go-to
person for more than I think is necessarily appropriate. And with that burden
I'll bring results - if a problem hooks into my brain it. will. be. solved. I
probably won't do the best most clean-code solution right out of the gate, but
I'll do whatever I can to find a solution.

## Who I was before agents

That is who I was before agents made code easy to produce. My first boss at
Caterpillar used the phrase "tenacious learner" to describe me in several
reviews. I kind of rejected the description because I basically refused to
believe that I was really any different, any harder of a worker, than my peers.

But with almost a decade of experience in the corporate world, and some adult
perspective on my life, I think it's accurate... I am a harder worker, to my
detriment sometimes, than a fair number of people I've worked with\*\*.

I'm not brilliant but I can focus for a long time in the right circumstances.
The gift of perseverance (or the curse of not being able to let something go,
depending on how you look at it) has led to blessing in my life in both reward
and skill.

!!! note "\*\*"

    There's nothing wrong with it either, Cat's somewhat noticed that work in my EOY reviews and I'm certainly not against "just doing your job".

And then AI came along and with another set of the right circumstances
catalyzed a new way to work.

## Leaning into "Agentic Engineering"

I jumped onto experimenting with AI coding tools as soon as they became
available, but mostly I just tried vibe coding rather than using tools for real
engineering work. I vibed up an API at one of my jobs that went into production
way too early, with far too little validation, and it was scary to support it
from then on out. I also did the meme, vibe-coded a TODO app, and threw that
puppy into the internet without locking down my API endpoints... That was
before agents were quite as useful as they can be
now, but that experience along with a handful of other stepping stones (like
learning some real actual fundamentals about security) began to
give me confidence in using the AI as a tool, like my IDE is a tool, for
producing **solutions** that take the form of code.

!!! note ""

    As one-shot apps got better and better, and as I learned about scoping work
    more appropriately for agentic tools my confidence in them grew.

There's quite a difference between "Claude make me a todo app, no mistakes" and
scoping out a solution in natural language, with some technical guardrails, and
having agents tackle the implementation methodically.

## What actually changed

What's actually changed for me is quite a lot... I haven't opened my IDE to
seriously write code for months now. I've oscillated between Opencode and
Copilot CLI, leaning moreso into Copilot since it's an approved tool at work
and as of mid-February is quite good. Mentally I'm approaching problems with a
little more thought on the front-end than before because prior to agents I
would think as I implemented. At the scale of work that I do, this was really
fine - working on CLI utilities to solve simple problems, developing an
iterative testing cycle for each problem that allowed me to move fast, and once
I found a groove I was cooking. But now I don't even need to find it, I open
Opencode or Copilot CLI with my Planner agent, describe what I want to happen and have
Opus or GPT scope out a plan for me. Usually there's some back and forth on
feature scoping, then I review a markdown file it produces, and once it looks
decent enough to me I say "go" and it goes.

That works a lot better than I even care to admit because at the same time as
I've been leaning harder into agents, I've been building my own harness of
sorts - not a replacement for Copilot CLI or a competitor to Opencode, but
moreso an opinionated workflow spine that I force agents into to give strict
gates to the SDLC (software development lifecycle).

!!! warning "Problem Solving Workflows"

    Plan and implement is fine for a lot of things, and I do think it's only getting better. My harness,
    mentioned a few times around here before, called Nexus, is a set of agents and
    rules that I want the code I'll be responsible for to go through before it
    lands in production. That cycle isn't too complex, and there's only about
    10,000 similar tools to Nexus on Github trending right now. I've thought about dropping my idea and picking up
    something more popular, like
    [superpowers](https://www.github.com/obra/superpowers) but at the moment I'm
    continuing to develop on and lean into my own idea here.

!!! note "Mini post on Nexus"

    I keep saying a blog post is coming, but the high level of Nexus is that it's a task
    tracker with a CLI that agents use to advance a ticket through a plan -> build
    -> test -> review -> verify -> merge lifecycle that is almost exactly how I
    would otherwise have solved a problem by hand. I think it needs work, I need to
    be harder on TDD methodlogies with agents, and work on verification gating a
    bit more (shoutout to [showboat](https://github.com/simonw/showboat) by Simon
    Willison) but overall it's a system of thinking that I already participate in
    so I'm doing my best to farm out specific parts of my workflow to agents rather
    than trying to one-shot enterprise problems and solutions.

!!! danger "Who's doing the thinking?"

    I've noticed that as I've developed Nexus out though, I lean on the agents for
    more and more of my own thinking, and am trusting my problem solving
    **process** moreso than my actual problem solving abilities.

## Hidden costs

The cost of this increase in speed is a lack of familiarity - and the fallout
of lack of familiarity is hard to express. There's also many facets to it.
For me, the first facet is that Nexus helps me move fast, but as I've leaned
into it for more and more of the planning, I'm less and less familiar with the
state of the code. I find myself asking my reviewer agents in fresh sessions
often to explain it to me, and thankfully they're usually consistent, but
nonetheless I'm still not intimately familiar with the code. And on Nexus it's
not a big deal, that's low stakes, it's just me and my workflow.

I'm using Nexus + Copilot at work and that feels like higher
stakes... I have my agents explain the status of our project and although they're
also somewhat consistent the thing that's scary is that other people are
working on that repo with me, and that's where another layer of complexity
manifests itself. If it's just me and my [[clankers]], let's go all day long,
rebuild, ask questions, etc... but I have other developers I rub shoulders with
now, and if they ask me a question what am I going to say? "Hold on, let me prompt
my agent for you" - it's LMGTFY on steroids. And the burden becomes if I
feel like I can own and support what those other developers push into the repo.

## Murky responsibility boundaries

Why do I own their work? Well for the third time, this post is pretty
self-centered and all about me, and my situation is that the other developers I
work with presently are all contractors. Their work agreement with Cat could
end at any second, for practically any reason. The incentive structure isn't
there for these guys who technically work for an agency... Their bonuses aren't
bigger (or even exist) if Cat performs well, there's no extra vacation days in
it for em (aye, contractors don't get vacation days anyways), and not that it's
a problem, moreso just the nature of the world we're in - but they're basically
mercenaries out to the highest bidder and I happen to know of **multiple times
where Cat lost a good person to a higher bidder**.

So this isn't really me trying to be negative about contractors at all, I'm
here for a pay-check as well but Cat at least gives me SOME incentive to work
hard with the goal of compensation regardless of how altruistic I feel in my
own circumstances.

!!! note "Incentive"

    Better ratings mean marginally better end-of-year salary increases, and I've received some other awards that certainly give me pause about jumping ship to another long-term place even when things can be crazy at Cat.

It's more than just the contrator-ownership dilema, I've dug myself quite a
hole over the last 8-10 years, gaining a reputation that I think many would
appreciate, but for me only lately increases the stress. I don't need to parrot
every accolade I've ever received, that's not the point, but to make the point
as clear as I can - I have a lot of respect from quite a few people at
Caterpillar. I'm blessed to have that reputation, and it's not like I haven't
worked hard for it - but people talk about me in a way so flattering I feel
like the main character in a fictional story sometimes.

In a fictional story I can check out the ending, hit up spark notes, or ask AI
how it ends... but there isn't an "end" in my real world scenario, there's only
tomorrow and I feel the pressure of not knowing what tomorrow holds now more
than ever.

!!! danger ""

    Being noticed is starting to feel more costly than rewarding...

## Financial irony

What's the cost? It's hard to get specific without writing a novel but here's
the TLDR - because I've been pretty good at what I do I've been able to do this
type of work outside my normal 9-5 responsibilities and with that extra work
has been some pretty great financial benefits. However with Cat changes,
responsibility increases, and now owning code that others (and their clankers)
write, the extra time I gained for myself is eaten-up and has been reclaimed by
the mega-corp... "Exceeding expectations" every year just meant the bar is
raised, the expectations are higher, the time-commitment requirement is higher,
and as I've had to meet the requirements of both the new world and the curse of
being noticed, I've lost the time for the extra work... For years I've realized
the benefit of my own skills and drive, but the irony of agents (and a handful
of other things) is that with the dramatic increase in expectations, not only
on me but on those I work with and therefore their output, I don't get to
realize the benefits of my own gifts anymore.

## Meaning and fatigue

I feel very torn because the work I've been called into with Cat is good, I
said in [[cat-autonomy-2-0]] that autonomy will save people's lives. I love
getting to participate in that mission, it's the primary reason I didn't jump
ship to try to maintain the levels, and type, of work I was doing before... But
in a few short months the mission is being drowned out by expectations and
requirements that are so high I'm losing the grip on my own life.

## Open questions

That leads me to questions that I can't answer, the question I ask daily now of
"What about tomorrow?". What will agents do for us tomorrow, what problems will
be solved, what bugs will I create (by agents of course because I've never
written a bug by hand in my whole life \s). If I stopped using agents would
people still be impressed? Would it even matter?

## Fin

I'm certainly not anti-AI, it's typing all my code. I'm not anti-collaboration,
although I do wish I could work alone with just my clanker-army to worry about.
I'm not sure what I am anymore though... AI has changed how I work, what I work
on, and who I work with... Everything has changed in such a short period of
time and like the ending of this post, it's pretty jarring.

!!! danger ""

    Death comes to us all - James Acaster.

Thanks for reading.
