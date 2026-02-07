---
date: 2022-07-06 06:44:35
templateKey: blog-post
title: Self-hosted Docker registry with proxy pull through
published: False
tags:
  - homelab
  - zfs
  - tech

---

I decided that I want to self-host all my docker images for the purposes of
regularly rebuilding and security scanning. The first step is to set up a
registry, which coincidently enough you can do with a Docker container 😛!

Instructions for setting up the proxy are on the offidical docker docs [here](https://docs.docker.com/registry/recipes/mirror/)

# Deployment

I chose to deploy with Portainer because I already use it for monitoring all my
docker containers. I deploy most container with Ansible but use Portainer to
setup a few more adhoc or non-git driven applications.
