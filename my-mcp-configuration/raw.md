---
date: 2025-04-27 05:29:54
templateKey: blog-post
title: My MCP Configuration
published: False
tags:
  - python
  - tech
  - tech

---

# My MCP

## The Tools

### Docker

### RAGDocs

### Sequential Thinking

### Git

### Not Tried Yet

https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite


## The Config

```json

{
  "mcpServers": {
    "docker-mcp": {
        "command": "uvx",
        "args": [
          "docker-mcp"
        ]
      },
    "ragdocs": {
      "command": "node",
      "args": [
        "/home/nic/projects/personal/quadtask/node_modules/@qpd-v/mcp-server-ragdocs/build/index.js"
      ],
      "env": {
        "QDRANT_URL": "http://babyblue-aurora:6333",
        "EMBEDDING_PROVIDER": "ollama",
        "OLLAMA_URL": "http://babyblue-aurora:11434"
      },
      "alwaysAllow": [
        "search_documentation",
        "list_sources",
        "test_ollama",
        "add_documentation"
      ],
      "disabled": false
    },
    "sequentialthinking": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "--name",
        "sequentialthinking",
        "mcp/sequentialthinking"
      ],
      "disabled": false,
      "alwaysAllow": [
        "sequentialthinking"
      ]
    },
    "git": {
      "command": "uvx",
      "args": [
        "mcp-server-git"
      ],
      "disabled": false,
      "alwaysAllow": [
        "git_status",
        "git_commit",
        "git_add",
        "git_log",
        "git_diff"
      ]
    }
  }
}
```

