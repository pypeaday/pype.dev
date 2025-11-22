---
date: 2025-06-03 21:08:50
templateKey: blog-post
title: Backups interrupted by full disk usage
published: True
tags:
  - homelab
  - tech

---


I just got a message from HCIO that my primary backup script is late... This
happens every now and then but I decided to check on it... Quickly `ssh` in and
I notice it takes a long time to connect, but nothing errors out... I've been
in the game long enough to think this kind of latency is often disk IO. After
waiting a bit and haulting the zshrc sourcing, I hit a `sudo dust / -H` and bam...
There's a container logfile that's about 80GB sitting in `/var`...

```
  75G   │ │ │ │   ┌── 57409a7f8d3168b368e0230babd08ec2e20aabb288806aa13652db1e653a0eee-json.log
  75G   │ │ │ │ ┌─┴ 57409a7f8d3168b368e0230babd08ec2e20aabb288806aa13652db1e653a0eee           
  76G   │ │ │ ├─┴ containers                                                                   
  83G   │ │ ├─┴ docker                                                                         
  85G   │ ├─┴ lib                                                                              
  90G   ├─┴ var                                                                                
 117G ┌─┴ /
```

Easy enough to remove, but I need to setup some alerts on disk usage, and
identify the container to limit the log file size

!!! info "Useful Notifications"

    I use healthchecks.io to monitor several scripts. You can self-host it but
    I use the hosted service since he has simple Signal integration


