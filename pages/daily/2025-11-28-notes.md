---
date: 2025-11-28 04:58:06
templateKey: dailyNote
title: 2025-11-28 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-11-27-notes]]

## Dev

- doing some more dotfiles cleanup
- I want to have github dotfiles be a mirror of forgejo

  - forgejo build can strip out some of the extras, like `iron` and `fin` and then zensical docs can make my dots look nicer in public

- [x] TODO: with my forgejo ->GH pages pipeline the private stuff is still there so I need to pair it with the sanitization workflow

```yaml
# gh-pages.yml
name: Build and Push

on:
  workflow_dispatch:

  push:
    branches: [main]

jobs:
  build-push-pages:
    runs-on: docker
    steps:
      - uses: actions/checkout@v4

      - uses: https://git.paynepride.com/nic/homelab-mono/devops/ci/forgejo-actions/build-and-push-to-github-pages@main
        with:
          remove: "mirror-test"
          github_repo: pypeaday/homelab-mono-mirror
          ssh_private_key: ${{ secrets.SSH_PRIVATE_KEY_FORGEJO_MIRROR_BOT }}
```

I have a composite action now that I can use which supports removing directories from a repo before pushing to github, as well as building and deploying to GH pages

- struggling on my blog repo cause I'm over-optimizing... I don't need shared workflows for everything...
