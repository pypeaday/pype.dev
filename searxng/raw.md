---
date: 2025-05-25 08:33:10
templateKey: til
title: SearXNG
published: True
tags:
  - homelab
  - tech

---


I heard about [SearXNG](https://searxng.org) on a couple podcasts and saw it trending on GitHub
several times before I finally decided to stand it up. 
I used it transparently when trying out [khoj](https://khoj.dev/), a self-hosted AI LLM agent
playground kind of a thing, but I've also been messing around with [Open-WebUI](https://openwebui.com) to
have a self-hosted ChatGPT-like experience. 
I don't know if SearchXNG used to be harder to set up, but it was pretty simple with a Docker Compose up
and a couple configuration options given my personal homelab setup. Using it feels
very nice. 

```yaml
services:
  redis:
    container_name: redis
    image: docker.io/valkey/valkey:8-alpine
    command: valkey-server --save 30 1 --loglevel warning
    restart: unless-stopped
    volumes:
      - ./data/redis:/data
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"

  searxng:
    container_name: searxng
    image: docker.io/searxng/searxng:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - ./data/searxng:/etc/searxng:rw
    env_file: .env
    environment:
      # - SEARXNG_BASE_URL=https://${SEARXNG_HOSTNAME:-localhost}/
      - UWSGI_WORKERS=${SEARXNG_UWSGI_WORKERS:-4}
      - UWSGI_THREADS=${SEARXNG_UWSGI_THREADS:-4}
    logging:
      driver: "json-file"
      options:
        max-size: "1m"
        max-file: "1"
```

I love the self-hosted aspect. I love not seeing any ads on my search
results. I did a few searches where I know what results to expect and
it did okay. 
It is good right now at filtering out garbage in my results. 

![SearXNG](https://dropper.wayl.one/api/file/4ff5953c-bc8d-4978-8509-b43582460a0b.png)

So I look forward to tweaking it and using it as a search
backend with open web UI. Next on my list is having enough resources to run
Ollama and a stable diffusion generator at the same time and have image
generation working through open web UI.

