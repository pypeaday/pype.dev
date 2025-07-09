---
date: 2025-06-24 20:55:42
templateKey: blog-post
title: Traefik and gRPC for Temporal at home
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250625023937_636de378.png"
tags:
  - homelab
  - tech
  - temporal
  - grpc
---

# Temporal Networking Woes

Someday I will potentially write up some stuff about [[temporal]] but for now
it's a workflow orchestrator that I'm interested in and I wanted to PoC it in
my homelab by replacing a simple cron job to build my blog with a temporal
workflow and activity. I was IMMEDIATELY thwarted by a networking error that
feels crazy to me but maybe won't be to others... so enjoy the problem and if
you're here from a Google search, I hope it's helpful.

Getting started with Temporal I wanted to have the server and associated
components on my server, but I expected to be running workflows and workers
on another computer. 

For most of my apps I slap some [[traefik]] labels on
and we're good to go. But I got a wild set of errors trying to run a worker on
my desktop and connect it to the temporal server on my server over https.... it
ended up being because I needed to setup a special protocol in traefik for the
reverse proxy to appropriately proxy the grpc call.

So I had a normal set of labels on my temporal container, went to run a worker
and got this nasty work of art

```
RuntimeError: Failed client connect: `get_system_info` call error after connection: Status { code: Internal, message: "protocol error: received message with invalid compression flag: 73 (valid flags are 0 and 1) while receiving response with status: 500 Internal Server Error", metadata: MetadataMap { headers: {"content-type": "text/plain; charset=utf-8", "content-length": "21", "date": "Wed, 25 Jun 2025 02:12:44 GMT"} }, source: None }
```

Thank God I had kind of seen this at work one other time in my life, and we
never fixed the issue there but I knew what it was... we had traefik acting as
a load balancer (as do I at home) and the traefik load balancer was "balancing
traffic using https"... no, I do not really know what I'm saying. But what I do
know is that in order for the Temporal Server and Worker to communicate,
traefik has to properly route the traffic for gRPC instead of https.

!!! warning ""
    I can't stress enough how little I know about the difference between https and grpc or why the load balancer cares... there's clearly something in the networking stack that is extremely relevant here

But the fix is NOT hard thankfully, and it's even on [traefik's website](https://doc.traefik.io/traefik/user-guides/grpc/#traefik-configuration) - the warning annotation there tells you what you need - which is one more traefik label...

```yaml
traefik.http.services.<my-service-name>.loadbalancer.server.scheme=h2c
```

So after setting the loadbalancer.server.scheme to `h2c` I could run my worker just fine!

![20250625021838_4d7104c2.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250625021838_4d7104c2.png)
