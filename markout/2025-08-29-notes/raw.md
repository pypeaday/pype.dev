---
date: 2025-08-29 08:56:49
templateKey: dailyNote
title: 2025-08-29 Notes
published: True
tags:
  - daily-note

---

yesterday: [[ 2025-08-28-notes ]]

## Homelab

- started chatting with jipity about some automation... I have so many ideas that circle my head and I have a hard time implementing anything for fear of committing halfway to something... 
- I think I can take baby steps to mitigate that issue and one way is to automate the first thing that annoys me - zfs dataset creation for new apps. I assume that I want a new zfs dataset if I'm going to provision something into my homelab so that means
  - dataset creation on the appropriate node
  - permissions
  - updates to `zfs-ops` (eventually dataops in homelab-mono) for the backup to be added explicitly (or removed if I'm removing one - for example some old VM datasets I no longer need)

- I also mind-dumped after starting the convo with jipity, using speakr to get a short summary of a brain dump is pretty awesome especially considering the purely local self-hosted nature. Here's the summary of a pretty concentrated 6 minute monologue on things I'm thinking about:
  - Summary is imperfect - but again, for self-hosted hardware and getting purely private LLM-assisted brainstorming is really cool. However, I do plan on sinking some thought into the big boys (claude or jippity) as I very slowly begin construction

Key Issues Discussed

    Platform and service idea for consulting
    Product as an opinionated home lab targeting small teams or on-prem setups with Docker Swarm + ZFS
    Focus on privacy, data ownership, compute ownership while providing cloud options (AWS)
    Hardware recommendations part of services
    Use AWS resources when possible but self-hosting is also viable option
    Tail scale for business networking and network ACLs provided by the vendor

Key Decisions Made

    Deploy servers using Docker Swarm + ZFS with an opinionated approach to data management, backups, application deployment monitoring.
    Cloud options include Terraform set up in AWS (and possibly Azure later)
    Use U-Corps as a base for containers on top of Ubuntu distro box; consider KeyCloak or Aphalia for authentication
    DNS and public services will be handled with NameCheap and Cloudflare using Terraform, not picking each other’s features.
    CERT management is Let’s Encrypt
    Observability through Harbor telemetry data gathering
