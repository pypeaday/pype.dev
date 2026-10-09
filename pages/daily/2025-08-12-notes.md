---
date: 2025-08-12 05:42:32
templateKey: dailyNote
title: 2025-08-12 Notes
published: True
tags:
  - daily-note

---

yesterday: [[ 2025-08-11-notes ]]

## Thoughts

- apprise needs to be the notification pillar...
  - quadtask should just use it
  - soonish
  - $HOME (brainstorm an easier codename here)

- with repoflow coming up, maybe forjeo is worth spinning up as well


## Wins

- sent 2 compassion letters this morning - had almost been 30 days since receiving Ebessa's.
- repoflow docker push works after Tomer pointed out a repo setting aside from public/private

```
  ✗ docker push repoflow.paynepride.com/foo/docker-local/audiomass:latest
  The push refers to repository [repoflow.paynepride.com/foo/docker-local/audiomass]
  5f70bf18a086: Pushed 
  92aaf4e79f64: Pushed 
  f91eb324f949: Pushed 
  416bbf08d03f: Pushed 
  097100c76c15: Pushed 
  latest: digest: sha256:7ec012b0d0ace30aa9cb5ccd718ab0416fbed367243b6c738a9f52f58bc64738 size: 1362

```

It also works with my registry if I force `/library/` namespace in my tags

```

nic in homelab-mono/python/test-repoflow-pypi   main   ×1  ×7  ×2 via   v3.12.8(test-repoflow-pypi)   (dev) 󰒄 
❯ docker tag registry.paynepride.com/audiomass:latest registry.paynepride.com/library/audiomass:latest         

nic in homelab-mono/python/test-repoflow-pypi   main   ×1  ×7  ×2 via   v3.12.8(test-repoflow-pypi)   (dev) 󰒄 
❯ docker push registry.paynepride.com/library/audiomass                                               
Using default tag: latest
The push refers to repository [registry.paynepride.com/library/audiomass]
5f70bf18a086: Mounted from dad-can-i-wear 
92aaf4e79f64: Mounted from audiomass 
f91eb324f949: Mounted from audiomass 
416bbf08d03f: Mounted from audiomass 
097100c76c15: Mounted from audiomass 
latest: digest: sha256:7ec012b0d0ace30aa9cb5ccd718ab0416fbed367243b6c738a9f52f58bc64738 size: 1362

nic in homelab-mono/python/test-repoflow-pypi   main   ×1  ×7  ×2 via   v3.12.8(test-repoflow-pypi)   (dev) 󰒄 
❯ docker pull repoflow.paynepride.com/foo/paynepride/audiomass:latest
latest: Pulling from foo/paynepride/audiomass
Digest: sha256:7ec012b0d0ace30aa9cb5ccd718ab0416fbed367243b6c738a9f52f58bc64738
Status: Downloaded newer image for repoflow.paynepride.com/foo/paynepride/audiomass:latest
repoflow.paynepride.com/foo/paynepride/audiomass:latest
```

- fixed the pull through dockerhub by removing my dockerhub credentials from repoflow remote repository configuration!
