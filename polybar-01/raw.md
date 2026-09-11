---
templateKey: blog-post
tags: ['linux', 'tech']
title: Polybar-01
date: 2022-04-01T00:00:00
published: True
#cover: "media/polybar-01.png"

---

[polybar](https://github.com/polybar/polybar) is an awesome and super customizable status bar for your desktop environment.

I use it with i3-gaps on Ubuntu for work and it makes my day just that much better to have a clean and elegant bar with the things in it that I care about.

The GitHub has all the instructions you'd need to install and get started with an example.

I want to make some notes about how I use polybar and customize it.

## Organization

First of all, I recently moved my polybar config out of one config file into a modular structure that keeps my config files small and easiser to edit.

You can find my config [here](https://github.com/nicpayne713/dotfiles/tree/main/polybar)

The apps or services you put into polybar are called `modules`.
I have moved all of my modules into their own config files and I source them with one centralized `include-modules.ini` config.

This separation also makes it easier for me to keep my home and work polybars as in sync as possible without duplicating a ton of config!

```bash
./polybar
├── colors.ini
├── config.ini
├── fonts.ini
├── home-modules.ini
├── include-modules.ini
├── launch.sh
├── modules
│   ├── aws.ini
│   ├── battery.ini
│   ├── bluetooth.ini
│   ├── cisco.ini
│   ├── cpu.ini
│   ├── date.ini
│   ├── eth.ini
│   ├── eth_work.ini
│   ├── i3.ini
│   ├── memory.ini
│   ├── nm-editor.ini
│   ├── powermenu.ini
│   ├── pulseaudio-control.ini
│   ├── pulseaudio.ini
│   ├── rofi.ini
│   ├── vpn.ini
│   └── wlan.ini
└── work-modules.ini

1 directory, 24 files
```

To break this down there are several configs to see:

1. `colors.ini` is what you'd expect - a set of defined colors like `foreground`, `underline`, etc.
2. `config.ini` is the general polybar config file where bars are defined. Currently in mine there is a `work` and `home` bar defined with the modules sourced in from the explicit config files.
3. `fonts.ini ` is like `colors.ini` -> you put fonts here. I recommend using a font patched with NerdFont so you get fancy icons! (I use JetBrains Mono)
4. `include-modules.ini` is where I list out all the config files in `modules/` so I can basically source just the `include-modules.ini` without explicitly sourcing every module's config in every polybar defintion.
5. `launch.sh` is a simple shell script to launch the polybar! You'll see mine takes multiple monitors into consideration which I manage via environment variables setup in my `.zshenv` file that is different for my work and home setups.
6. Finally there are `home-modules.ini` and `work-modules.ini` which is where, for each of my bars, I define which modules I want!

## Config

My `config.ini` file has 2 bar definitions in it - here's my home one:

```ini
include-file = $DOTFILES/polybar/include-modules.ini

[bar/home]
monitor = ${env:MONITOR:}
width = 100%
height = 25
radius = 8.0
fixed-center = true
bottom = false

background = ${colors.background}
foreground = ${colors.foreground}

include-file = $DOTFILES/polybar/fonts.ini
include-file = $DOTFILES/polybar/home-modules.ini
```

It should be easy to follow - I bring in the `include-modules`, set a few colors for the bar like `background` and `foreground` which are sourced by the `colors.ini`, and finally bring in my fonts and home modules via their config files!

It's super easy to then change one or two things in the appropriate places rather than combing through one massive config. This also makes it easy for me to seperate my work and home setups.


## Modules

There are several builtin modules, like `wlan` which gives your wifi status right there in polybar.

You can also make custom ones. 
A big-time custom one for me is an indicator of whether or not I have an active AWS token for working with the `aws` cli.

This is defined in` modules/aws.ini` and it looks like this:

```ini
[module/aws]
interval = 5.0
type = custom/script
exec = has_aws_token
click-left = $HOME/.local/bin/auto_get_aws_token
click-right = rm -rf ~/.aws/credentials
```

Every `5` seconds my `has_aws_token` script is ran.
That script looks like this:

```bash
#!/bin/bash
source auto_proxy
aws sts get-caller-identity &> /dev/null && echo "%{T5}%{F#00ff00}  %{F-}%{T-}"  ||( echo "%{T5}%{F#ff0000} %{F-}%{T-}" )
```

See how the script echos out a colored icon to indicate the status of my token -> that icon is displayed in the polybar so I have real-time (5 second latency) status of whether or not I can do things in my AWS environment.

In the module I also configured actions for `click-left` and `click-right` which are as straight forward as could be.

## My issues with i3


There's a few things to be considerate of if you use `i3` such as needing a workaround for a centered bar that __is not__ the full width of the monitor.
Polybar can look really nice by not taking up the full width of the bar which you can configure in `config.ini` with these options:

```ini
width = 90%
offset-x = 5%  # set to (100 - width) / 2
```

However due to an issue with polybar and i3 you need to also set `override-redirect = true`. 
BUT then you'll notice that the bar overlaps your i3 windows... ARGH! what do we do?

Quick work around is to set `gaps top` in your i3 config if you use i3-gaps... if not? well, idk... use gaps... lol

However this introduces another issue - which is then full screen windows will  have polybar sitting on top of them...

This isn't necessarily a deal breaker, but for me it's worth it to just have the bar go 100% width.


## FIN

There's a tiny intro to polybar and how I organize my config files so things are easy to edit and manage!
Feel free to grab mine and try it out!
