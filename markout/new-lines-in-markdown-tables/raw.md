---
date: 2022-11-25 13:35:05
templateKey: til
title: New lines in Markdown tables
published: True
tags:
  - vim
  - webdev
  - tech
  - til

---

I wanted to break down some long lines in a Markdown table cell to make it look
nicer on my blog but \n didn't do anything for me... turns out <br/> is the
magic sauce

| *Column 1* | *Column 2* |
| --- | --- |
| Key | Doggo ipsum many pats. Borkdrive borking doggo doing me a frighten doggorino, noodle horse heckin. what a nice floof. Pupper borking doggo you are doing me a frighten, much ruin diet. |
| --- | --- |


| *Column 1* | *Column 2* |
| --- | --- |
| Key | Doggo ipsum many pats. <br/> Borkdrive borking doggo doing me a frighten doggorino, noodle horse heckin. <br/> what a nice floof. <br/> Pupper borking doggo you are doing me a frighten, much ruin diet. |
| --- | --- |
