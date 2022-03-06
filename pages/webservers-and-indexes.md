---
templateKey: blog-post
tags: ['homelab']
title: Webservers-And-Indexes
date: 2022-03-06T00:00:00
status: draft
cover: "/static/webservers-and-indexes.png"

---

I host a lot of services in my homelab, but they're mostly dockerized applications so I have never had to care much about how content gets served up.
Today I had several little concepts click into place regarding webservers, and it was a similar experience to when I started homelabing and didn't know what a "server" was in the first place.

# Servers

A "server" can have a lot of different meanings but specifically in my world it was a physical server, like my PowerEdge R610 which acts as my main "home server".
But then on my server, I have other servers... Jellyfin is my main media server - but that's obviously not a hardware thing, that's software. 
This is certainly not a groundbreaking thing but it was a tiny piece to the puzzle that I was missing... that "server" is highly contextual.

# Webservers 

Something that confused the heck out of me when I first started down the road of having a server was what a webserver even was...
I always thought the "webserver" was just "a server that hosts a website"... and yes, that's true, but also it wasn't true in how I understood "server".
It turns out that across my 40-odd dockerized services I have at home that I must have about 40-odd web servers running, each docker container is spinning up its own!

So something I have wanted to do for a long time is put my theology notes online for my small group to access whenever they might want... it doesn't need to be fancy or anything.
My issue was not knowing what to even Google. I tried "How to serve up static html" but that kind of search is for people who know what a "static" site is - I am not one of those people.
I kept running across nginx and apache things, wordpress and other website building tools, etc.
In fact I only recently learned that JavaScript assets cann still be considered static so I am a complete baby in the web-dev space.

What I really wanted was just a simple landing page with a link to each of my "posts" which are in the form of a single html file each that I can easily export from my tiddlywiki (I have a post about tiddlywiki [here](/tiddly-wiki))

The first win `python -m http.server` right in the directory I kept my html files in and that got me what I wanted functionally. 
But then I wanted just a hair more organization...
I started looking for a way to dynamically generate an index for a directory of html files but again the verbiage of that Google search just wasn't helping me - I didn't want anything complicated and I knew that what I wanted had to be easy...

# The Index 

Luckily I randomly came across a SO that mentioned a Linux utility called `tree` which does exactly what I wanted!

See my TIL on `tree` [here]('/tree')

So now it goes like this:

* Take notes on X in my tiddlywiki
* Export that tiddler to a html file 
* Put that html file into a `notes` folder in my github repo for small group notes 
* Use `tree` to generate an `index.html` of each of those files in the `notes` directory
* Use `python -m http.server` to start a web server that lands me at the `index.html` and now I can click through to any post!

It's not fancy but it's functional... 
This site/blog is built with markdown and [markata](https://www.markata.dev) and I wanted way more functionality in my tech notes.
But for this simple use case I learned a ton about _how_ content gets served up on a webpage and my small group benefits from the easy access as well!


