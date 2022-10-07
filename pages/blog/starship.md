---
templateKey: blog-post
tags: ['linux']
title: Starship
date: 2022-03-25T00:00:00
status: published
cover: "/static/starship.png"

---

If you spend time in the terminal then you'll want it to look somewhat pleasing to the eye.
I used to ssh into servers with no customization, use `vi`  to edit a file or two, then get back to my regularly scheduled programming in VS C**e...

One of the first steps for me loving my terminal was a beautiful prompt... 

## Prompt

The default sh/bash/zsh prompts are... to put it lightly... garbage... I can't speak for other shells like fish simply because I do not use them but let me justify my trash talk.

Here's the default `sh` prompt...

![Alt Text](/images/sh-prompt.png)

Then switching to `zsh` you get something marginally better (plus tab completion!)

![Alt Text](/images/zsh-prompt.png)

But this still is super gross... there's nothing to indicate file types and no status information readily available (ie. `git status` etc.)

## Oh-My-Zsh!

Now there are several ways to make your prmompt nicer depending on your shell (terminal emulator plays a role too).
Now I use `zsh` and there's a great tool out there [oh-my-zsh](https://ohmyz.sh/) that brings a crazy amount of customization to the terminal experience.

I do not use `oh-my-zsh` for theming though and that's simply because of my other choices - I use `kitty` themes since I understood the implementation better.
Kitty themes though - do not give me a nice prompt.

The default prompt you get with `oh-my-zsh` themes isn't bad though (and you can pick from several default themes)...

![Alt Text](/images/zsh-oh-my-zsh-prompt.png)

Notice that you get some nice coloring and some default `git` status stuff, mainly the branch you are on.
There's plugins to show you more and that's all well and good, but again it's not my choice...

If I don't use this then what's my goto?

## Starship

[starship](https://starship.rs/) is a cross-shell prompt with nice default and super easy customizaton!

To get started click that link and follow the "Getting Started" button - it's incredibly fast to get up and running with sane defaults.

The default starship config is plenty nice but I got a little tired of emojis in my prompt and wanted to switch to icons instead...

To get started with your own customizaton you add a `starship.toml` file to `~/.config` 
My starship config is found [here](https://github.com/nicpayne713/dotfiles/blob/main/starship/.config/starship.toml).

>Note you need a font installed patched with nerdfonts - I use JetBrains Mono

Now I have a beautiful prompt with relevant information that's a dream to look at!

![Alt Text](/images/zsh-starship-prompt.png)

I have configured my starship to show me relevant `git status` options (stashes, untracked files, etc etc.)
I also have starship show me if I'm in a git repo, what branch I'm on, if I'm in a python project and if so what virtual environment is active.
I do some work in AWS at work and so I have starship show me if my `aws cli` is configured to the right region for whichever project I'm in!

There's a billion more options and after a few minutes of play it becomes really easy and intuitive to customize colors, icons, etc.



