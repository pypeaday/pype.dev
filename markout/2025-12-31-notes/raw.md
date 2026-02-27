---
date: 2025-12-31 04:34:20
templateKey: dailyNote
title: 2025-12-31 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-12-30-notes]]

## Ideas

- I want to start writing about some parenting concepts

  - discipline vs consequences vs punishment is one concept
  - love and the "greater will" for your child
    - goes hand-in-hand with something like "it's good for your child to suffer"

- [[reflection-john-7-37]]

## Dev

- fixed issue with dad-can-i-wear-this

  - the ollama_host was set to be the actual ollama url running on my desktop,
    which makes sense from the var name but is wrong. I have OLLAMA_HOST actually
    assumed to be open-webui's api endpiont, so the API spec is a touch different
    but I did this to use open-webui for agent customization and such
  - change host:11343 (ollama's host and port) to host:3002 (open-webui's host
    and port) and we're golden

- need to compare OpenAgents with <https://github.com/code-yeongyu/oh-my-opencode>
