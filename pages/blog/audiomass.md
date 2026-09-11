---
date: 2025-08-10 14:17:43
templateKey: blog-post
title: AudioMass
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250810191909_cc0dc2d7.png"
tags:
  - sermons
  - tech

---

I edit our church's recorded sermons every week and upload them to our website.
It's very simple, and the editing is just cutting the audio file down on the
front and back sides of extra stuff picked up while the mic was on. I've been
doing this for a while using Davinci Resolve which is WAY too heavy for
trimming audio files but I'm loosely familiar with it and so I just have been
dealing with the pain of long start up, overly complicated organization, etc.
Well it's been buggy on Aurora for me and a few weeks ago I got sick of it
finally and tried KdenLive.... Now this is a great tool, but again I'm just
cutting up some audio files, why is this hard?

Double finally I just did some research and after a few minutes found
[audiomass](https://github.com/pkalogiros/AudioMass) which I immediately forked
and dockerized cause it's so simple and beautiful!

Now I have a little webapp to trim these files from - almost such that the tech
lead on Sunday could maybe do this instead of me!

![20250810191909_cc0dc2d7.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250810191909_cc0dc2d7.png)

You can check it out on [my github](https://github.com/pypeaday/audiomass)

  - clone
  - `docker compose up -d`
  - `http://localhost:5056` to begin trimming audio locally!
