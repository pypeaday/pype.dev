---
date: 2022-09-15 10:27:58
templateKey: til
title: Destroying Tmux sessions with fzf
status: published
tags:
  - cli
  - bash

---

I use Tmux and Vim for most of my workflow, but I end up with a lot of dangling
tmux sessions that dont' really need to persist... but killing them one at a
time is a pain so I wrote a little script-kitty nonsense to pipe multiple
choices from fzf into `tmux kill-session`

I defined a little function in my `.zshrc`
```bash 
destroy() { 
    tmux list-sessions -F '#{session_name}' | fzf -m | xargs -d $'\n' sh -c 'echo "killing $0"; tmux kill-session -t "$0"; for arg;do echo "killing $arg";tmux kill-session -t "$arg"; done'
}
bindkey -s '^d' 'destroy \n'
```

`tmux list-sessions -F '#{session_name}' ` prints all my active tmux sessions to the console with the format of just their name

```bash 
pype.dev   main   ×1 via   v3.8.11(pype.dev)  on  (us-east-1) proxy
❯ tmux list-sessions -F '#{session_name}'
session-01
session-02
session-03
...
```

Pipe that to `fzf -m` to allow multiple choices to be made using tab

Then the nasty bit in `xargs`... I echo `killing @0` and `killing $arg` because the `sh -c` passes the first tmux session name to `@0` (it's just what bash does) and then the rest get handled in the for loop.

Basically then I get an fzf list to choose multiple tmux sessions to destroy to clean up some RAM!
