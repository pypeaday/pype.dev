---
date: 2023-01-12 05:51:25
templateKey: til
title: i3-Like keyboard mapping in Pop_OS
published: True
tags:
  - linux
  - linux
  - tech

---

I was introduced to tiling window managers through i3, which I use heavily on
one of my machines. I have switched to Pop_OS! at home though, which has a
tiling window mode but the keybindings are not what I'm used to for i3. I
wanted to at least navigate workspaces how I'm used to doing (cause I set
workspace 3 for communication apps, 1 for my terminal, etc...)

Here's how I set keybindings for:

* `<Super> + <number>` sends me to that numbered workspace
* `<Shift> + <Super> + <number>` moves the window I'm focused on to workspace `number`

```bash
#!/bin/bash
gsettings set org.gnome.mutter dynamic-workspaces false 
gsettings set org.gnome.desktop.wm.preferences num-workspaces 8 
gsettings set org.gnome.shell.keybindings switch-to-application-1 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-2 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-3 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-4 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-5 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-6 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-7 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-8 [] 
gsettings set org.gnome.shell.keybindings switch-to-application-9 [] 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-1 "['<Super>1']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-2 "['<Super>2']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-3 "['<Super>3']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-4 "['<Super>4']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-5 "['<Super>5']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-6 "['<Super>6']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-7 "['<Super>7']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-8 "['<Super>8']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-9 "['<Super>9']" 
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-10 "['<Super>0']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-1 "['<Super><Shift>1']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-2 "['<Super><Shift>2']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-3 "['<Super><Shift>3']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-4 "['<Super><Shift>4']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-5 "['<Super><Shift>5']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-6 "['<Super><Shift>6']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-7 "['<Super><Shift>7']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-8 "['<Super><Shift>8']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-9 "['<Super><Shift>9']" 
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-10 "['<Super><Shift>0']"
```
