---
date: 2023-01-16 13:15:53
templateKey: til
title: FFMPEG 10-bit videos to 8-bit
published: True
tags:
  - cli
  - homelab
  - tech
  - til
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011090044_9cb91174.png"
---

`ffmpeg -i input.mp4 -map 0 -c:v libx264 -vf format=yuv420p -c:a copy output.mp4`
