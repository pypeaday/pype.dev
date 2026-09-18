---
date: 2025-07-06 08:42:44
templateKey: blog-post
title: Testing a Postiz Change Locally (IT WORKS!)
published: True
tags:
  - postiz
  - tech
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706123320_cfd8330b.png"
---

## Setup

I am working on a pipeline at home to integrate my blog with social media a
little more. One of the things I want to do is automatically post
[[my-thoughts]] to [[nostr]]. [[postiz]] has nostr support that works just fine - login
with your [[nostr-hex-key]] and you're good to go to post notes to several of
the common relays. However for my testing I just wanted to post to a
[self-hosetd nostr relay](https://github.com/scsibug/nostr-rs-relay)
but there wasn't a way to override which relays were used. Well I submitted [this pr](https://github.com/gitroomhq/postiz-app/pull/824)
and hopefully it goes through. But before it did I was able to test the changes
by simply building the postiz image from my feature branch and deploying it at
home in leiu of the published image. It was super cool to see it work

## Build and Deploy

The build was easy after cloning the repo - I happened to already have `buildx` installed... it came with [aurora](https://docs.getaurora.dev/)

`docker buildx build --platform linux/amd64 -f Dockerfile.dev -t registry.example.com/gitroomhq/postiz-app:nostr-test .`

After building then I just update my compose file easy-peasy

```yaml
services:
  postiz:
    # updated the image to my own from my registry
    image: resitry.example.com/gitroomhq/postiz-app:latest
    container_name: postiz
    restart: always
    env_file: .env
#####################
### REST OF COMPOSE FILE FROM THEIR REPO
```

## Pics

To test this my methodlogy was: 0. spin up nostr relay

1. start postiz with my NOSTR_RELAY_OVERRIDES configuration for only my local relay
2. use an existing script to schedule a nostr post via the postiz REST API
3. use the UI to send the note to nostr
4. validate the note came through my relay

So step 1 - does my script to schedule via the REST API work?

```
postiz  | [0] 1|backend  | {
postiz  | [0] 1|backend  |   "type": "draft",
postiz  | [0] 1|backend  |   "shortLink": false,
postiz  | [0] 1|backend  |   "tags": [],
postiz  | [0] 1|backend  |   "posts": [
postiz  | [0] 1|backend  |     {
postiz  | [0] 1|backend  |       "integration": {
postiz  | [0] 1|backend  |         "id": "cmbgf5oko0001ra99r9vzv1fj"
postiz  | [0] 1|backend  |       },
postiz  | [0] 1|backend  |       "value": [
postiz  | [0] 1|backend  |         {
postiz  | [0] 1|backend  |           "content": "\nHere's a thought I had a while back:\n\n> matduggan.com/what-would-a-kubernetes-2-0-look-like/\n\nThis article was longer than I had time to really consume but a heading caught my eye that I wanted to agree with - the author says k8s 2.0 may consider HCL instead of YAML. And as a recent terraform / open-tofu adopter I gotta say I would be ALL FOR THIS\n\nHere's the original link for more context: https://matduggan.com/what-would-a-kubernetes-2-0-look-like/\n        \n\n# devops # tech #k8s #nostr #plebchain",
postiz  | [0] 1|backend  |           "image": []
postiz  | [0] 1|backend  |         }
postiz  | [0] 1|backend  |       ]
postiz  | [0] 1|backend  |     }
postiz  | [0] 1|backend  |   ],
postiz  | [0] 1|backend  |   "date": "2025-07-02T13:27:07.028Z"
postiz  | [0] 1|backend  | }
```

???+ success

    After the first step my local build looks to have not broken this part of the app!

Next was spinning up my own nostr relay - it's actually just `docker compose up`

```yaml
services:
  nostr-relay:
    image: nostr-rs-relay:latest
    container_name: nostr-relay
    ports:
      - "7000:8080"
    environment:
      TZ: America/Chicago
    volumes:
      - ./data:/usr/src/app/db
      - ./config.toml:/usr/src/app/config.toml
    restart: unless-stopped
```

Finally, can I send my note to my relay?

I hit post in the UI and then checked coracle...

Yes! Using [coracle.social](https://coracle.social) I can verify that my note went to my relay only

![20250706122123_47b06d96.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250706122123_47b06d96.png)

## Fin

So that was a fun way to get into postiz a little more and start to flesh out
what will be a testing-scenario for some pipelines I'm building at home
