---
templateKey: blog-post
tags: ['tech']
title: Tiddly-Wiki
date: 2022-03-05T00:00:00
published: True
cover: "media/tiddly-wiki.png"

---

[Tiddly Wiki](https://tiddlywiki.com/) is a great note taking utility for organizing non-linear notes.
I used it to replace my OneNote workflow and my only complaint is I don't have an easy way to access and edit my tiddlers (posts) if I'm not at home.

The tiddlywiki is just an `html` file with a ton of stuff above my head baked in. 
I have a barebones repo with some notes and a nice starter tiddly wiki init on [my github](https://github.com/nicpayne713/tiddlywiki-tutorial).
Usage is pretty basic... Just grab the `notebook/template.htlm` and save it to anywhere convenient on your computer.
I put mine on my NAS to have the security of backups since I don't keep my tidldlywiki in a git repo (I don't really want to look at the diff).

Taking notes in the tidlywiki is nice because it supports a format similar to Markdown although it is specific to tidlywiki. 
Tiddlers (each post in the wiki) can be tagged and linked together and it's really easy to send notes to someone by just exporting an html file and emailing it since it'll open up by default in a broswer with all the nice formatting already apart of it.
I was using it primarily for taking notes for a small group I lead and sending those notes each week.
The group benefited from nicely formatted notes and I benefited from a centralized place to keep them all that Microsoft didn't own!

Here's an example of the body of a tiddler with some tiddlywiki specific formatting:

```
! Static IPs on Linux

//Ubuntu 20//

Setting static IP on Ubuntu 20.04

# Navigate to /etc/netplan
# Open the yaml file (the name seems to be kind of random but it seems to starts with 00 or 05)
# Change the file as below with your desired settings
# Run `sudo netplan apply` to have changes reflected

    ```yaml
    network:
      version: 2
      ethernets:
        enp0s4:
          addresses: [192.168.1.{Static IP}/24]
          gateway4: 192.168.1.1
          nameservers:
            addresses: [8.8.4.4, 8.8.8.8]
    ```



<img src="https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/tiddlywiki-example.png" alt="tiddlywiki" title="A TiddlyWiki Example" />

```
The `#` create a numbered list, `//` creates an italicized heading, and `!` creates headings similar to Markdown's `#`. The differences aren't too bad to keep in mind and what renders out is totally depenent on the tidlywiki itself. 
My template has a nice nord feel to it, feel free to download from my github and try it out!

> I have moved away from my tiddlywiki workflow in favor of sites like this since I can git commit markdown files and build with [markata](https://markata.dev/) pretty easily (credit [waylon walker](www.waylonwalker.com))

> I still use tiddlywiki for tracking some todo items and questions --- I may have another solution in the future
