---
date: 2025-07-03 08:42:31
templateKey: blog-post
title: MCPHub with Windsurf
published: True
tags:
  - mcp
  - tech
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703135326_d2ffc9b9.png"
---

I came across [mcphub](https://github.com/samanhappy/mcphub) today and got the motivation to try it out... I use AI
tools like Windsurf and Roo across multiple devices and it'd be awesome to have
a simple mcp config - ie. a centralized hub to serve all my mcp servers and BAM
enter this github project. It was easy to spin up in docker, and then according
to Windsurf's docs
[here](https://docs.windsurf.com/windsurf/cascade/mcp#mcp-config-json) the
setup is just naming a server and passing a serverUrl

```json
{
  "mcpServers": {
    "hub": {
      "serverUrl": "http://localhost:3000/sse"
    }
  }
}
```

![20250703134426_2c9dfa01.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703134426_2c9dfa01.png)

???+ warning

    The sse endpoint stuff is getting deprecated eventually - I didn't want to
    spend any time right now trying to get the newer things to work... future
    me/you will solve that problem

## Setup

I ran this in compose with this file

```yaml
services:
  mcphub:
    image: samanhappy/mcphub
    ports:
      - "3000:3000"
    volumes:
      - ./mcp_settings.json:/app/mcp_settings.json
      - ./data:/app/data
  qdrant:
    image: qdrant/qdrant
    container_name: qdrant
    restart: unless-stopped
    ports:
      - "6333:6333"
    deploy:
      resources:
        limits:
          memory: "500m"
```

And at present the `mcp_settings.json` file looks like this mostly:

```json
{
  "mcpServers": {
    "docker-mcp": {
      "command": "uvx",
      "args": ["docker-mcp"]
    },
    "ragdocs": {
      "command": "node",
      "args": [
        "./node_modules/@qpd-v/mcp-server-ragdocs/build/index.js"
      ],
      "env": {
        "QDRANT_URL": "http://localhost:6333",
        "EMBEDDING_PROVIDER": "ollama",
        "OLLAMA_URL": "http://localhost:11434"
      },
      "alwaysAllow": [
        "search_documentation",
        "list_sources",
        "test_ollama",
        "add_documentation"
      ],
      "disabled": false
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  },
  "users": [
    {
      "username": "admin",
      "password": redacted,
      "isAdmin": true
    }
  ]
}


```

???+ note

    I assume here you have ollama running for ragdocs (in my screenshot you see I actually don't right now anyways)

`docker compose up` and we're cooking at <http://localhost:3000>
