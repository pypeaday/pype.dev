---
date: 2025-12-06 06:24:51
templateKey: blog-post
title: GitHub Stopped Me From Messing With The Bots
published: True
tags:
  - llm
  - tech
---

After some cheeky
[[small-steps-towards-handling-malicious-traffic-on-static-sites]] it turns out
GH has been blocking me from publishing my site because the fodder I put in
there for the bots was recognized as actual secrets by their scanning...

![20251206122602_8b1635bf.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251206122602_8b1635bf.png)

I had to tell github that each of these secrets in the commits was fine...
after all, they're good bait

[Github
Docs](https://docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push)
