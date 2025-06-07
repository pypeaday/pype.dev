---
date: 2024-12-15 15:41:36
templateKey: til
title: Add a healthcheck to your FastAPI app
published: True
tags:
  - python
  - homelab
  - tech

---

I'm building a few FastAPI apps to throw in docker and run on my homelab... I wanted to add healthchecks and here's a simple way to do it

Make sure to install `curl` in the dockerfile (near the top for effeciency)

```
# Install curl with minimal dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

```

Then I recommend making compose files even for single image deployments

```
services:
  app:
    build: .
    volumes:
      - type: bind
        source: .
        target: /app
    environment:
      - PYTHONPATH=/app
      - DOCKER_ENV=true
      - UV_VIRTUALENV=/opt/app-env
    user: "1000:1000"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s

```

Then finally you'll need a `/health` endpoint

```python

@app.get("/health", response_class=HTMLResponse)
async def health_check():
    """
    A health check endpoint that returns a status message.
    """
    return "<html><body><h1>Service is healthy</h1></body></html>"

```
