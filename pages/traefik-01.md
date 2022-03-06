---
templateKey: blog-post
tags: ['blog', 'homelab']
title: Traefik-01
date: 2022-03-06T00:00:00
status: draft
cover: "/static/traefik-01.png"

---

# Traefik

If you don't know about [traefik](https://doc.traefik.io/traefik/) and you need a reverse-proxy then you might want to check it out.
I used to use nginx for my reverse proxy but the config was over my head, and once it was working I was afraid to touch it.
Traefik brings a lot to the table, my main uses are reverse proxy and ip whitelisting, but it's doing even more under the hood that I don't have a full-grasp of yet.
I like Traefik a lot because once I get some basic config up it's incredibly easy to add services into my homelab whether they run on my primary server or not.
This will not be exhaustive but I'll outline my simple setup process of traefik and how I add services whether they are in docker or not.

# Docker

In 2022 I'm still a docker fan-boy and I run my traefik instance in a docker container. 
This isn't necessary but I love the portability since my homelab is very dynamic at the moment.
And even if it wasn't I'd still want to keep traefik in docker because deployment and updating are just so flipping easy
