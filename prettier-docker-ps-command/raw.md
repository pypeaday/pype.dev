---
date: 2025-12-29 05:33:05
templateKey: til
title: Prettier Docker 'ps' Command
published: True
tags:
  - docker
  - til
  - tech
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251229122405_5a24f168.png"
---

The `docker ps` command is very useful, but I hate reading the output. Turns
out, you can make it prettier:

`docker ps`

> --format "table" is implied with the command.

```

❯ docker ps --format "table" | grep can
9b716a7d1ab0   postgres:17                                               "docker-entrypoint.s…"   13 hours ago    Up 13 hours (healthy)            0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp                                                cannalyzer-db-1
f7708ea0c112   adminer                                                   "entrypoint.sh docke…"   13 hours ago    Up 13 hours                      0.0.0.0:8081->8080/tcp, [::]:8081->8080/tcp                                                cannalyzer-adminer-1
93cd67719ed4   frontend:latest                                           "/docker-entrypoint.…"   13 hours ago    Up 13 hours                      0.0.0.0:5173->80/tcp, [::]:5173->80/tcp                                                    cannalyzer-frontend-1
f517625fca98   traefik:3.0                                               "/entrypoint.sh --pr…"   13 hours ago    Up 13 hours                      0.0.0.0:80->80/tcp, [::]:80->80/tcp, 0.0.0.0:8090->8080/tcp, [::]:8090->8080/tcp           cannalyzer-proxy-1
f4daa036216e   schickling/mailcatcher                                    "sh -c 'mailcatcher …"   13 hours ago    Up 13 hours                      0.0.0.0:1025->1025/tcp, [::]:1025->1025/tcp, 0.0.0.0:1080->1080/tcp, [::]:1080->1080/tcp   cannalyzer-mailcatcher-1
```

But you can pass a template string to the `--format` option, like so:

`docker ps --format "table {{.Names}}"`

```

✗ docker ps --format "table {{.Names}}" | grep can
cannalyzer-db-1
cannalyzer-adminer-1
cannalyzer-frontend-1
cannalyzer-proxy-1
cannalyzer-mailcatcher-1
```

`docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"`

```

❯ docker ps --format "table {{.Names}}\t{{.Ports}}" | grep can
cannalyzer-db-1             0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp
cannalyzer-adminer-1        0.0.0.0:8081->8080/tcp, [::]:8081->8080/tcp
cannalyzer-frontend-1       0.0.0.0:5173->80/tcp, [::]:5173->80/tcp
cannalyzer-proxy-1          0.0.0.0:80->80/tcp, [::]:80->80/tcp, 0.0.0.0:8090->8080/tcp, [::]:8090->8080/tcp
cannalyzer-mailcatcher-1    0.0.0.0:1025->1025/tcp, [::]:1025->1025/tcp, 0.0.0.0:1080->1080/tcp, [::]:1080->1080/tcp
```

## Picture

I noticed my template isn't folding the codeblocks in a way that actually makes this post look like I'm lying!

![20251229122717_67e76a67.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251229122717_67e76a67.png)
