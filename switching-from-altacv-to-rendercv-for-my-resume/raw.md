---
date: 2024-08-01 05:59:46
templateKey: blog-post
title: Switching from AltaCV to RenderCV for my Resume
published: False
tags:
  - python
  - python
  - tech

---

I was using a fun LaTex-based project for managing my resume called [AltaCV](https://github.com/liantze/AltaCV). I loved the customization and was familiar with Tek from school. However, I update my resume so infrequently that anytime I'd hop back to it I'd have to remember how to work with Tex and that was frustrating as I've lost touch with it over the years.

Scrolling GitHub treding repos I saw [RenderCV](https://github.com/sinaatalay/rendercv) which let's me just use YAML to write my resume and then it compiles to Tek through Python. There's a sister project to make your own using this very easly call [rendercv-pipeline](https://github.com/sinaatalay/rendercv-pipeline). I forked that repo and translated my tek resume to the YAML. The included theme is nice enough is YAML is much easier to maintain long-term.


My resume is behind a private GH repo but the example from rendercv-pipeline is [here on GitHub](https://github.com/sinaatalay/rendercv-pipeline/blob/main/John_Doe_CV.pdf)
