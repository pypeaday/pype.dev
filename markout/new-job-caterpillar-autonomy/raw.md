---
date: 2026-01-26 10:24:54
templateKey: blog-post
title: New Job - Caterpillar Autonomy
published: True
tags:
  - work
  - tech
cover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260127122925_a8326330.png
---

In [[im-back-from-the-dead]] I mentioned my new role that started this year -
it's a return to Caterpillar Autonomy. I built some data pipelines and
junior-grade infrastructure 5 years ago but left over burn-out at the prospect of
a job with smaller scoped work and more technical guidance. That was a good
move, and in God's sovereignty he's brought me back. Now I'm looking at code,
thankfully not that I wrote, but that the guy after me wrote - it accomplished
a job, like my original work did, but also like what I built back then -
there's better ways today. The amount of things in front of me is absolutely
daunting, and the people on the team have been seeded with a very high opinion
of me... I don't know how much is valid and how much is hype, but I'm gonna try
to live up to it.

One way I'm striving to do that is to maximize my efficiency with the AI coding
tools available to me. We have Github Copilot and I've picked up a lot over the
course of the last few years (and especially more recently) in using agents,
planning out work, documenting plans for agents to follow, splitting up work
via worktrees, etc. I feel pretty good about where I'm going and someday I
might even release Nexus. Nexus is serving as my second-brain at work, the hub
where I collaborate with my fleet of agents on the work that must get done.
Details to come on this, but the thing that matters is that in ironing out
workflow I've moved from prompt + chat to really managing a long-lived stream
of work. AI has been changing the world, and there's been developer hype for
years now. But "make me a cool app, no mistakes" isn't going to cut it. Even
"make an app but generate a plan first" isn't going to cut it... Developers
have to adopt a higher level role, a systems-oriented and architecture-driven
worldview must become primary in order to keep up. Code-gen and syntax writing
are not what developers were **ever** paid to do, although many believed so.
Our jobs have been to solve problems and deliver code that solves the problem.
The code is cheap now, but solving problems still is a human task.

In the Autonomy group - there's problems all up and down the stack. My focus is
on infrastructure and developer operations - it's become my bread and butter
over the last several years. I'm excited to help the team grow, and I'm excited
to grow personally/technically as I lean into the agentic workflow to produce
code that I'm actually proud of, that has my name on the commit, and that
solves real problems.

## Example - Local Development

One of the first things I'm tackling is a developer-pain-point of working on
their laptop. I've been in this space for years, mostly with python programmer
who are writing data science code. They don't know about virtual environments,
checking $PATH, assuming bad state in their terminal session, how to configure
VS Code, etc. Often they just want to write some scripts and somehow test it.
The solution I see most often is for devs to write code in JupyterLab/Notebooks
in AWS or some environment close to their data - this is fine I guess, but it's
not developing good pipelines, and it's tedious as hell. In my last job I
helped set developers up with workflows that allowed them to run their IDE of
choice locally (getting all the goodies of syntax highlighting, LSP, etc) and a
CLI that took their code and ran it in the cloud, right next to data, in the
same way that prod runs. It was a hit. After that I introduced some tools to
help them manage python environments - we had strict templating requirements in
our projects, so making tools to automate those things wasn't too hard - it's
much easier than trying to make something flexible for every use case. The
opinions made the automation and tooling easy to make and distribute.

Well I'm up against a similar task now, but oh so much worse... Larger team,
larger environment sprawl, larger infrastructure mismanagement, the whole
gambit. And I'm here for it... Here's the first problem I'm addressing - local
development for Airflow DAGs that run in an Airflow deployment on Kubernetes.
The deployment itself is a little odd, Airflow is an orchestrator, all the
pipelines run in external AWS Batch jobs - so a DAG hits the Batch API to run
the code. The design there is actually nice, but how are devs testing code?

Oh that's easy... they SSH into the prod server, which is a 5 year old desktop
THAT I BUILT WITH A CO-WORKER BEFORE I WAS IN AUTONOMY THE FIRST TIME... hold
on, WHAT!? Yes, it's true.. so they SSH into the prod server, run some bash
scripts in their userspace that setup airflow and a few db utilities in a
docker compose stack, authenticate with AWS themselves from that server, and
then they run DAGs against real data to test it... I am beyond shook.

Here's what I've put together - a bootstrap process (I like `just` + PEP 723
python scripts as opposed to bash, but to each their own, and bash of course
has its place) that spins up a [kind](https://kind.sigs.k8s.io/) cluster on
their laptop, the process pulls some private images and loads them into the
kind cluster, it installs airflow from a helm chart (the same helm chart we'll
use in dev and prod... no more docker compose over here, kubectl over there),
and everything just. comes. up. No SSH into ancient server, no touching cloud
infra (they get MinIO and a DB container to emulate S3 and RDS in our AWS
accounts), no sweat on testing DAGs. They stage some data in MinIO (`just open
minio` handles the port-forward and opens the browser), then `just open
airflow` (their DAGs are hot-reloaded via hostPath mounting), and they can run
DAGs locally until they're satisfied with the results.

It's taken me about a week of split-focused effort (I mentioned Nexus and I've
been co-building and dogfooding that at the same time) but I'm proud of that
local setup now. I am a bit shocked they've dealt with a brittle, hacky, often
broken development workflow for the last 4 years or so, but that development I
suppose.

## The Point

This post wasn't meant to be me glazing myself for awesome local development
practices, I am simply excited about this new chapter. I love solving problems,
and I love owning those solutions. There's a whole mess of things to address,
my mind is buzzing, and I feel like God has blessed me with renewed passion
(again see [[im-back-from-the-dead]]). I've given up some pay and some freedom
to take this role, but I think it'll pay dividends.

Life happens to all of us - this role change affected a lot for me, it's been
hard to digest some of those changes, but the work is good, the development is
fun, the new world of using agents to fly through things you're fluent in is
exciting, and I'm here to help a team that desperately needs it to improve
their lives and the work we do for Cat Autonomy.

I'm still pissed at Caterpillar Executives for RTO ruining parts of my life,
but in God's sovereignty their idiocy has led to non-trivial blessing, so I can
say "Praise the Lord"
