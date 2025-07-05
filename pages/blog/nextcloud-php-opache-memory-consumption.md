---
date: 2025-06-23 08:46:20
templateKey: blog-post
title: Nextcloud PHP Opache Memory Consumption
published: True
tags:
  - homelab
  - tech
  - nextcloud
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250623135539_6c7d6fa2.png"
---

# Intro

Today I was combing through Nextcloud, just taking a gander at the apps, updates, etc.

> The OPcache buffer is nearly full. To assure that all scripts can be hold in
> cache, it is recommended to apply "opcache.memory_consumption" to your PHP
> configuration with a value higher than "128"

So I know _nothing_ about `php` and I had no idea where to set this... Also I'm
running Nextcloud in a container so any updates will be blown away when the
container is removed (say next time I update Nextcloud)...

After a little duckduckgoing I came across [this reddit
post](https://www.reddit.com/r/NextCloud/comments/1gpxl5b/need_help_with_php_opcache_module_warning/)
where a guy had the same issue...

The long and short of it is that on _single instance nextcloud deployments_
this php memory consumption value can be too low for Nextcloud to keep up with
the demand... You can see in the message they just recommend upping the value.

So I had to think about how to persist the change and have it take effect now
ideally without affecting any users too much... So here's what I did - made the
change in 2 places:

## In the container

I exec'd into the container and used this handy `sed` command `sed -i
's/^opcache\.memory_consumption\s*=\s*128$/opcache.memory_consumption=256/'
/usr/local/etc/php/conf.d/opcache-recommended.ini` to update the value in the
running container - and I guess `php` maybe is loaded up dynamically or
something? but the warning did go away....

So how to persist this change when the filesystem is blown away when the
container is updated?

## In the config

I set the env var `PHP_OPCACHE_MEMORY_CONSUMPTION` in the `docker-compose.yml`
file to 256 and voila... the change should persist...
