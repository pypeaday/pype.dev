---
date: 2022-12-21 09:45:34
templateKey: til
title: suda.vim for sudo access to files
published: True
tags:
  - vim
  - linux
  - tech

---

I regularly need to edit system config files - take /etc/sanoid/sanoid.conf as
an example... I'll want to play with something but if I don't start Neovim as
root then I get in trouble making edits I can't save! So
[suda.vim](https://github.com/lambdalisue/suda.vim) gives me
`:SudaWrite` which let's me write that buffer with sudo privileges even though
I'm Neovim is running with my login user!
