---
date: 2025-07-16 09:12:26
templateKey: blog-post
title: Using restic to backup my home directory
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250716145216_a3234af9.png"
tags:
  - homelab
  - tech
---

# Intro

I need to backup my personal $HOME to my NAS cause there's a lot in there, and
mostly my git projects with .env files all over. Plus some docker data

## Why Not ZFS?

GREAT QUESTION! It's because I struggled getting all the syncoid/sanoid
requirements installed on my Aurora OS.... I like the immutable desktop trend,
but I don't understand rpm-ostree enough to properly get all the lower level
kernel stuff setup in a way I trust. So because I don't have ZFS at $HOME
what's a boy to do?

`rsync` would probably work fine especially if I [[rsync-like-a-pro]] but I figured I could cobble together some other tech and broaden my horizons...

## Enter restic

Apparently [restic](https://restic.net/) has been around for a while, and you can run it in a container... awesome that's all I needed to hear...

## How?

I'll use a docker compose stack for this... typically I think running `restic`
right on the host is the way to go, but on my desktop I float between my host
and distroboxes and to keep things as simple as possible, even though less
efficient, I want to manage everything through containers as my homelab gets
built out and eventually I'll have a more full-featured ecosystem.

## The Value

You can find code below and an example repo that more or less is what I use for my desktop backup but that's primarily what I was after.... backing up the data on my desktop to my NAS in a way that:

1. I wouldn't have to "remember" how I was doing it

- I accomplish this by having good git repo organization and README files that explain my own usage patterns

2. Tracked snapshots

- I need some kind of snapshotting - `zfs` has spoiled me, and turns out `restic` has some amount of support for it

3. Running in docker would be ideal for now so that I don't need to worry about installing specific binaries across machine while I build out my patterns

With this setup I get to backup my $HOME to my NAS which contains 1. docker
volume info for all the AI workloads I run on my desktop and 2. all my
sensitive info in my git repos is at least backed up in a way that I can
recover `.env` files with relative ease...

# Code

Check out the [Example GH
Repo](https://github.com/pypeaday/docker-compose-restic) but I'll drop key file
contents here for a quick read if you're interested in some of the setup... but
the blog post mostly ends here

## The Files

We have a `docker-compose.yml` of course

```yaml
services:
  backup:
    image: restic/restic:latest
    network_mode: host
    container_name: restic_backup
    hostname: restic-backup-runner
    env_file:
      - .env
    environment:
      # The location of the backup repository inside the container
      - RESTIC_REPOSITORY=/target
      # The location of the password file inside the container
      - RESTIC_PASSWORD_FILE=/password
    volumes:
      # --- Source and Config Mounts ---
      - "${BACKUP_SOURCE}:/source:ro"
      - "${RESTIC_PASSWORD_FILE}:/password:ro"
      - "./backup-and-prune.sh:/usr/local/bin/backup-and-prune:ro"

      # --- Persistent Data Mounts ---
      - "./.ssh:/root/.ssh:rw"
      - "./.cache:/root/.cache:rw"

    # Set the default entrypoint to our new script. This will be executed when
    # the container starts, unless overridden.
    entrypoint: ["/usr/local/bin/backup-and-prune"]
```

Your `.env` file will need to look like this

```bash
``# HOST related variables
# The source directory to back up (absolute path)
BACKUP_SOURCE=/home/nic

# --- Restic Configuration ---
# The file containing the restic repository password (absolute path on host)
HOST_RESTIC_PASSWORD_FILE=/home/nic/projects/personal/homelab-mono/dataops/docker/.restic-password
# The SSH private key to use for connecting to the NAS (absolute path on host)
# It's recommended to use a dedicated key for this purpose.
SSH_PRIVATE_KEY_FILE=/home/nic/.skm/ghost/id_rsa

# Container Env Vars
# the container makes the sftp connection using my credentials, but nonetheless the container needs them, so this isn't envrc stuff

# --- SFTP/SSH Connection Details for the NAS ---
SFTP_USER=nic
SFTP_HOST=ghost
# The path on the NAS where the restic repository will be stored
SFTP_PATH=/tank/encrypted/nas/nic-home/

# --- Restic Configuration ---

RESTIC_REPOSITORY=/target
RESTIC_PASSWORD_FILE=/password
```

And then the backup script that the container will execute is something like this:

```bash

#!/bin/sh
set -e # Exit immediately if a command exits with a non-zero status.

# Construct the repository path from environment variables passed by docker-compose
REPO="sftp:${SFTP_USER}@${SFTP_HOST}:${SFTP_PATH}"

# 1. Run the backup
# -----------------
echo "--- Starting backup for ${BACKUP_SOURCE} ---"
restic backup /source --verbose -r "${REPO}"
echo "--- Backup complete ---"

# 2. Clean up old snapshots according to the policy
# --------------------------------------------------
echo "--- Pruning old snapshots ---
(Policy: keep last 7 daily, 4 weekly, 6 monthly)"
restic forget \
    --prune \
    --keep-daily 7 \
    --keep-weekly 4 \
    --keep-monthly 6 \
    -r "${REPO}"

echo "--- Backup and prune process finished successfully ---"
```

## Systemd

Finally there's a systemd unit and timer file in there so you can setup a systemd service for the backup

### service

```bash

[Unit]
Description=Run Restic backup to NAS using Docker Compose
# We are running this as a user service, so we assume that the system-level
# docker.service is already running.
After=network-online.target

[Service]
Type=oneshot
# Set the working directory to where your docker-compose.yml and .env file are located
WorkingDirectory=/home/user/nas-backup/docker

# The command to execute. We use the full path to docker-compose for reliability.
# You may need to adjust this path if 'docker compose' is installed elsewhere.
ExecStart=/usr/bin/docker compose run --rm backup

[Install]
WantedBy=default.target
```

### timer

```bash

[Unit]
Description=Run Restic backup job daily

[Timer]
# Run daily at 2:00 AM
OnCalendar=daily
# Or uncomment for a specific time:
# OnCalendar=*-*-* 02:00:00

# Run the backup immediately if the last scheduled run was missed (e.g., if the computer was off)
Persistent=true

[Install]
WantedBy=timers.target
```
