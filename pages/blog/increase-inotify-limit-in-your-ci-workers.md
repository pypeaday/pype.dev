---
date: 2025-12-30 06:11:49
templateKey: blog-post
title: Increase inotify limit in your CI workers
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251230122402_ba2531c3.png"
tags:
  - forgejo
  - tech
---

Today I tripped over a CI failure that I had to think about for a while.

I build [zensical](https://github.com/zensical/zensical) static sites in CI on
my Forgejo instance. These builds had been working fine, then suddenly started
failing with no code changes. Naturally, I assumed something upstream broke —
maybe a new uv release, maybe zensical.

- I pinned versions.
- I tested older versions.
- Same failure every time.

That ruled out regressions and pushed me toward the environment.

I pulled the runner and worker images locally and built the sites just fine...
But that doesn't perfectly emulate the CI setup - my forgejo runner relies on
docker-in-docker and so we aren't **just** running a container on a host, we have
this middle layer to consider... I wasn't sure how to really test this out
locally so I succomed to AI and here's where Jipity got me in about 5
minutes...

## The failure

The builds blew up with:

```
thread 'zrx/monitor' panicked at .../zensical-watch/src/agent/monitor.rs:154:49:
called `Result::unwrap()` on an `Err` value:
Error { kind: Io(Os { code: 24, message: "Too many open files" }) }

```

At first glance it means nothing to me but Jipity says this screams ulimit.

So following the AI overlords I checked:

`ulimit -n` was already very high

`/proc/sys/fs/inotify/max_user_watches` was also very high

`PID limits` were not constrained

Everything looked fine according to Jipity.

Yet the panic persisted.

## The real culprit

The actual limit being hit was:

`/proc/sys/fs/inotify/max_user_instances`

In my Forgejo runner container, it was set to 128.

That turns out to be far too low for zensical.

Here's what ChatGPT said:

> Even during a normal zensical build, the tool spins up its watch subsystem,
> which creates many inotify instances. Once it crosses the kernel limit,
> inotify_init() fails with EMFILE, and the process panics because the error is
> unwrapped.

## The fix

Raising the inotify instance limit fixed it immediately:

```
echo 1024 > /proc/sys/fs/inotify/max_user_instances
RUST_BACKTRACE=full uvx zensical build --clean
```

After that, the build succeeded consistently.
