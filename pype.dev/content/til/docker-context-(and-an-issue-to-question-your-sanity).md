---
date: 2024-12-19 05:59:30
templateKey: til
title: docker context (and an issue to question your sanity)
published: True
tags:
  - python
  - terminal
  - tech
  - til

---

docker contexts are great, would recommend putting them in your prompt though (via starship or something else)... here's why

I like to manage my containers remotely - I have a nice development setup on my desktop and I try to keep my server as bare-bones as possible. For a while I've been using ansible which makes it easy to manage configuration etc on other machines. But I recently learned about docker contexts and I'm planning to scale down my homelab management to just docker-compose stacks rather than a bunch of super complicated ansible playbooks

So, setting up a context is easy - it's basically an ssh connection to another machine!

`docker context create koober --docker "host=ssh://nic@koober"`

`koober` is one of my dev machines and my `~/.ssh/config` is setup such that I can `ssh nic@koober`, this makes the context work really seamlessly.

So there's the `default` context (the machine you're on) and now I have `koober`

To use it you run `docker context use koober`

And then to check we can `ls` the contexts

```
docker context ls
NAME       DESCRIPTION                               DOCKER ENDPOINT               ERROR
default    Current DOCKER_HOST based configuration   unix:///var/run/docker.sock   
koober *                                             ssh://nic@koober
```

> Notice the * - that indicates that's our current context.

## Trouble

Now here's where things get hairy... you've gotta be super-aware of what context you're using. I have an indicator in my starship prompt that shows the current context, but since I'm new to using them I kind of didn't notice it until I ran into this issue...

I'm working on a python application in docker but was not able to execute the entrypoint even though I KNEW the file was there... let's take a look

### Example

Here's a minimal hello world applycation in docker to illustrate the issue

```python
# main.py
print("hello world")
```

```Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Run the main.py script as the container's main process
CMD ["python", "main.py"]
```

```yaml
services:
  hello-world:
    build: .
    volumes:
      - .:/app
```

Notice volume mounting in my project directory `.` to `/app` as a common practice to develop inside the container

Here's where I started to question my sanity...

```bash
✗ docker compose up                                            
[+] Running 1/0
 ✔ Container docker-context-example-hello-world-1  Created                                                                                                                                                                                                                                                              0.0s 
Attaching to hello-world-1
hello-world-1  | python: can't open file '/app/main.py': [Errno 2] No such file or directory
hello-world-1 exited with code 2
```

`python can't open file`? hmm... Let's take a look at the image

First let's make sure we get the image name right

```bash
✗ docker container ls -a              
CONTAINER ID   IMAGE                                           COMMAND                  CREATED          STATUS                       PORTS                                                                                  NAMES
3d7285fc39e2   docker-context-example-hello-world              "python main.py"         10 minutes ago   Exited (2) 44 seconds ago                                                                                           docker-context-example-hello-world-1
```

Now we can `docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world`

```bash
❯ docker run --rm -it --entrypoint /bin/bash --name debug docker-context-example-hello-world  
root@ee46d0e22de8:/app# python main.py
Hello, World!
root@ee46d0e22de8:/app# 
```

WHAT THE HECK??

## What happened...

What happened turns out to be pretty simple once we realize I'm using contexts...

`koboer` is a remote context, the `docker run` and `docker compose up` commands are interacting with the docker socket on that machine.

So if I compose up the stack notice that there's a volume bind mount in there - well those do _not_ work with contexts (or at least I'm not aware of hose to make it work) and so the `/app` directory was getting blown away essentially with an empty overlay...

But when running with just `docker run` with no volume mount, the code was copied in during the build and is right where we expect it...

### Let's prove it

```bash
❯ docker run --rm -it --entrypoint /bin/bash --name debug -v .:/app docker-context-example-hello-world
root@903f591c0384:/app# python main.py
python: can't open file '/app/main.py': [Errno 2] No such file or directory
root@903f591c0384:/app# 
```
```
Adding a `-v .:/app` to match the compose file, we get the same error...
```

If we switch to the default context we are back up and running as expected

```bash
✗ docker context use default
default
Current context is now "default"

nic in /tmp/docker-context-example  via   v3.13.0  (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET 
❯ docker compose up         
[+] Running 1/0
 ✔ Container docker-context-example-hello-world-1  Created                                                                                                                                                                                                                                                              0.0s 
Attaching to hello-world-1
hello-world-1  | Hello, World!
hello-world-1 exited with code 0

nic in /tmp/docker-context-example  via   v3.13.0  (dev) 󰒄 󱔎 NO PYTHON ENVIORNMENT SET 
❯ docker run --rm -it --entrypoint /bin/bash --name debug -v .:/app docker-context-example-hello-world
root@4045b6aa8883:/app# python main.py
Hello, World!
root@4045b6aa8883:/app# 
```

Successful runs on both accounts with the volume mount

## TLDR

Context is king
