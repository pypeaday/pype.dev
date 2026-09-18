---
date: 2025-08-02 13:01:58
templateKey: blog-post
title: Docker Volume Mounts Link to an Inode
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250803130345_60fa743c.png"
tags:
  - docker
  - compose
  - tech

---

docker bind mounts are specified as filepaths - this is very intuitive. I want
/path/to/directory on my host to be shared with /another/path/foo in a
container. But what if /path/to/directory on the host is moved?

This is a situation I have found myself in at home and it turns out that I'm
actually in almost zero trouble thankfully...

TLDR - I have a bunch of compose stacks in
/home/projects/homelab-compose/<host>/<application> and I want to move them to
/home/projects/homelap-mono/compose/<host>/<application>

I don't want to take down all my stacks to do this because I don't yet have a
convenient way to do it - but can I just `mv .../homelab-compose
.../homelab-mono/compose` and be done with it?

The issue is that some of my stacks use local volume mounts - ie. there is a
data volume on the host in
/home/projects/homelab-compose/<host><application>/docker-data for some of the
applications... can I just move everything and docker is nonethewiser?

Turns out the answer is mostly `yes` with some caveats to keep in mind..

Let's start with why it works and then show an example...

## Why

This works because of how docker interprets the bind mount location initially
and with how `mv` is different from `cp`. When you speicify a volume mount for
docker, the engine determines which [[inode]] contains the metadata for the
filesystem object referenced by the original volume path `/path/to/directory`.
I think about this like a string path is a pointer to a lower level identifier
closer to the filesystem - if that pointer changes it doesn't affect the
pre-existing inode or data. So docker uses the inode that `/path/to/directory`
points to when the container starts up.

The slight convenience in my case is that `mv` maintains the existing inode and
so the new filepath is irrelevant to that existing container that was spun up
with a now-non-existent host filepath.

So if you can imagine then - I spun up several containers in
`///homelab-compose/...` with many stacks - and I want to just move all the
config files to new repo... thankfully, I actually can *just `mv`* everything
and because the `inode` locations dont' change, the stacks are fine!

!!! warning "caveat"

    Is the next issue apparent? What happens to those files whose volume mount configurations specify .../homelab-compose/...? Well, if the stacks are brought down and back up then docker will create that filepath on the host and a new inode reference will be had by all... so that's a problem easily mitigated by some string replacement!

!!! note "another note"


    Perhaps just don't keep data next to your configuration either... In most of my stacks I have a determined docker volume that's backed up etc. on my hosts and that's what I'm moving towards on my desktop, but as of right now I've put myself in an odd situation via not participating in a proper thinking exercise when standing up all these stacks on my desktop

## Example

Finally let's just see it in action quickly...

I have a directory `/tmp/foo/source` with a compose file in it.

```
❯ tree source       
source
└── docker-compose.yml
```

That file is simple:

```yaml
services:
  app:
    image: nginx
    ports:
      - "8070:80"
    volumes:
      - /tmp/foo/source:/usr/share/nginx/html
```

Now I can spin that container up, exec in, drop a file in `/usr/share/nginx/html` and we'll see it in `/tmp/foo/source` as expected...

```bash
nic in /tmp/foo   (dev)
❯ docker exec source-app-1 touch /usr/share/nginx/html/file.txt

nic in /tmp/foo   (dev)
❯ tree source                                                       
source
├── docker-compose.yml
└── file.txt

1 directory, 2 files

```

Now let's `mv` the `source` directory somewhere else and see what happens

```
nic in /tmp/foo   (dev)
❯ mv source target 

nic in /tmp/foo   (dev)
❯ tree target 
target
└── source
    ├── docker-compose.yml
    └── file.txt

2 directories, 2 files

```

OK everything is there - now let's drop another file in the container - remember the compose file still has the host path as `/tmp/foo/source`, not `/tmp/foo/target/source`.

```
nic in /tmp/foo   (dev)
❯ docker exec source-app-1 touch /usr/share/nginx/html/another-file.txt

nic in /tmp/foo   (dev)
❯ tree target                                                          
target
└── source
    ├── another-file.txt  # BAM! New file still here...
    ├── docker-compose.yml
    └── file.txt

2 directories, 3 files
```
## Few Things
1. `cp` as noted before, creates new `inodes` and so if I were to have `cp -r`
   that `source` directory to `target` then the container would've dropped
er exec source-app-1 touch /usr/share/nginx/html/another-file.txc in /tmp/foo   (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET t
`another-file.txt` to `/tmp/source` and we'd be in a pretty confusing state

2. Let me stress again the importance of managing your docker volumes in a sane
   way... I have on any of my hosts a `/path/to/docker/data` which is backed up
in a way that makes sense for the host (usually zfs + sanoid, otherwise restic
backup TO a remote zfs dataset - see
[[using-restic-to-backup-my-home-directory#Intro]])
