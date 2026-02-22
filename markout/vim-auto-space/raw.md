---
templateKey: til
tags: ['vim', 'tech', 'til']
title: Vim-Auto-Space
date: 2022-03-04T00:00:00
published: True
#cover: "media/vim-auto-space.png"

---

I ran into an issue where I had some copy-pasta markdown tables in a docstring but the generator I used to make the table gave me tabs instead of spaces in odd places which caused `black` to throw a fit.
Instead of manually changing all tabs to spaes, or trying some goofy `:%s/<magic tab character>/<%20 maybe?>/g` I learned that Vim has my back...

```
:retab
```
