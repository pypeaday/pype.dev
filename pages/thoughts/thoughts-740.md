---
title: "💭 restic · Backups done right!"
date: 2025-07-08T11:53:41.846644
slug: thoughts-740
templateKey: thoughts
description: "Welp, I need to be backing up my desktop home directory, specifically a directory of docker volume data... I thought dup"
published: true
link: "https://restic.net/"
tags:
  - nas
  - homelab
  - backups
  - thoughts
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011085214_a53c2a9f.png"
---

<a href="https://restic.net/">
    <img
        src="https://shots.wayl.one/shot/?url=https://restic.net/&height=450&width=800&scaled_width=800&scaled_height=450&selectors="
        alt="shot of post - restic · Backups done right!"
        height=450
        width=800
    >
</a>

Here's my thought on <a href="https://restic.net/">restic · Backups done right!</a>

---

Welp, I need to be backing up my desktop home directory, specifically a directory of docker volume data... I thought duplicati made sense, but that mostly targets cloud-based backends, and rsync is great but I wasn't sure how i wanted to manage the job. 
Through a little AI chat I learned about restic and am working on a compose stack to run restic in a container to regularly backup my home directory via sftp to my NAS to then be swept up in my NAS backup workflow

---

!!! note
    This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com). It's a short note that I make about someone else's content online.  Learn more about the process [[ thoughts ]]
