---
date: 2025-11-13 05:48:15
templateKey: note
title: Homelabbing Realization - Configs and Git
published: False
tags:
  - homelab
  - note
---

## Realization

I'm back to brainstorming migrations away from Docker Compose to something that
solves multi-node networking and secrets but I don't want to go to k8s... so my
options are probably Docker Swarm or Nomad. As I wrestle mentally here I was
thinking about one of my issues with multi-node setup is that I still keep
everything out of one git repo, so if something gets managed remotely then I
get out of sync. Best example is dashy, Due to some constraint of wanting to be
as close to zero-day deployment-ready as possible, I think I overcomplicate
some of the simple stuff - like it's ok to just have to put a file on a server
for a container to start the first time... That doesn't mean ansible is a
requirement, in fact lately I've just leaned into just recipes. But even then,
I cornered myself into tracking my dashy config in git, so I'm hesitant to ever
update it in the browser cause I'll have to redownload the config, reconcile
the formatting differences in my repo (there's a reason for this that a linter
doesn't ssolve...), etc.... but in all of my brainstorming I just decided that
my dashy config doesn't have to live in git... it can just be on the zfs
storage, which is backed up, and configured via the app itself... the config
can simply be apart of the data and container lifecycle, it doesn't have to be
apart of the infra lifecycle.
