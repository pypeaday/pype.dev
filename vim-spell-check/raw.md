---
templateKey: til
tags: ['vim', 'tech', 'til']
title: Vim-Spell-Check
date: 2022-04-01T00:00:00
published: True
cover: "media/vim-spell-check.png"

---

__Did you know you can spell check in Vim?!__


<!DOCTYPE html>
<html>
   <head>
      <title>Vim Spell check</title>
   </head>

   <body>
      <h3>Without...</h3>
      <p>Here is a missspelled word.</p>

      <h3>With!</h3>
      <p>Here is a <u>missspelled</u> word.</p>

   </body>
</html>

## What is this magic???

`set: spell spelllang=en_us`


## Custom words?

Sometimes there's things that are words to you but not the default spell checker...

Common example: package names!

`plotly`, `streamlit`, `psutil`, etc etc...


You can easily add these to your vim config by hitting `zw` ontop of the word!
