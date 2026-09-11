---
date: 2023-03-09 06:48:38
templateKey: til
title: Convert Word Doc to PDF with Headless Libreoffice
published: True
tags:
  - linux
  - cli
  - tech
  - til
---

I've been using paperless-ngx to manage all my documents, but every once in a while I'll get a `.docx` file to deal with...

Turns out Libreoffice has a headless mode a `pdf` converter built-in!

```Bash
libreoffice --headless --convert-to pdf /path/to/file.docx --outdir /path/to/output/directory
```

> Note that `--outdir` is in fact a directory, not the path to a file
