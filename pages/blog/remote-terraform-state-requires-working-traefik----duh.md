---
date: 2026-03-23 08:12:25
templateKey: blog-post
title: Remote Terraform State Requires Working Traefik... DUH!
published: True
cover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260323133829_ea2e9c0a.png
tags:
  - traefik
  - tech
---

I'm working on some spring cleaning in my homelab and backed myself into a
hilarious corner yesterday. I use Open Tofu for any of my Terraform needs now,
and although I don't manage a ton with terraform, I do manage all my cloudflare
stuff with it. I decided I wanted to use my own minio instance as the s3 remote
state backend for my workspaces so I could rely on my typical NAS data
backup/retention workflow for the buckets in case anything went wrong, as
opposed to a local state file that I'm not taking a lot of precautions with.
Well during my Spring Cleaning I was working towards replacing ingress into my
home network with Cloudflare tunnels and in the midst of that update I took
down traefik, no matter a simple 'tofu apply' should get me right back to
working order...

```hcl
╷
│ Error: Error inspecting states in the "s3" backend:
│     operation error S3: ListObjectsV2, https response error StatusCode: 404, RequestID: , HostID: , api error NotFound: Not Found
```

Hilarious problem with thankfully an easy fix... downloading the state file
from Minio wasn't a big deal since the container was still running without
issue, and placing the state file in the folder to use as the local state
solution for the interim went totally smooth, but this highlights the set of
interdependencies I'm creating for myself and as I take the next few days/weeks
to do some spring cleaning I'm hoping I can separate out the external ingress
from internal with a bit more clear boundaries so that I never lock myself out
of a workflow I only execute on my LAN in the first place!
