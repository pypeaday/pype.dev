---
date: 2025-08-12 06:59:02
templateKey: blog-post
title: Proxy Pull Docker Images From Self-Hosted Container Registry Through Self-Hosted Repoflow
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250812131651_8a5a13a9.png"
tags:
  - homelab
  - tech
  - repoflow

---

This post is a short write-up of an issue I had while exploring [Reploflow](https://repoflow.io) - a
super solid artifactory-esq replacement for the homelab (and enterprise!). I've been playing with
it and have tried to setup a few artifact repos that I'm familiar with - docker
and pypi. 

## PyPi

This isn't a post about repoflow, but I had an issue with pypi and Tomer was
EXTREMELY responsive in helping to fix my issue and patch repoflow within a day
of me reporting the issue via email!

## Docker

For docker I have a few options I just wanted to see work - obviously
proxy pull from Dockerhub for ease, but also in the interim I'd like to proxy
pull from my original container registry to avoid having to update any homelab config just yet.
Now, obviously I'll have to update all my build pipelines to start using
repoflow, and my homelab configuration to reference the repoflow docker
repository rather than my existing registry. 

But there's something to bear in mind if maintaining that middle registry -
turns out a there's a default namespace in dockerhub `/library/` and repoflow
expects this standard across any docker registry, so it's pull paths fully
resolve to an incorrect tag if you don't take this into account in your
existing infrastructure.

TLDR: if you tag an image `myregistry/ubuntu:latest` and push it
then try to pull it back through repoflow then repoflow expects the image to be
`myregistry/library/ubuntu:latest`. I think repoflow should support
configurating the namespace/org for the images - but in the meantime I can
go find all my images and update my build scripts to add /library/ to my
tags... or while I'm doing that I can just push to repoflow directly... All in
all, nice little lesson on namespaces in docker repos and third-party tooling. 

