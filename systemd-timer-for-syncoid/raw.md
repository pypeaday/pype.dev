---
date: 2022-12-21 11:38:27
templateKey: blog-post
title: Systemd timer for syncoid
published: True
tags:
  - zfs
  - homelab
  - tech

---

I have a bash script called `syncoid-job` which boils down to a barebones - 

```bash
#!/bin/bash

syncoid --no-sync-snap --sendoptions=w --no-privilege-elevation $SYNOIC_USER@$SERVER:tank/encrypted/nas tank/encrypted/nas
```

I want to run this script hourly but as my user (notice the no-privilege-elevation flag)

First - create a systemd unit file at `/etc/systemd/system/syncoid-replication.service`

```bash
[Unit]
Description=ZFS Replication With Syncoid

[Service]
Type=oneshot
ExecStart=/$HOME/dotfiles/syncoid-job
User=$USER
Group=$GROUP

[Install]
WantedBy=multi-user.target

```

Then we save the unit file, enable the service, and then start it

```console
systemctl enable syncoid-replication.service
systemctl start syncoid-replication.service

```

> Note this will run that script... so be ready for syncoid to do its thing

Now for the timer... We create `/etc/systemd/system/syncoid-replication.timer`

```bash
[Unit]
Description=Run syncoid-replication every hour

[Timer]
OnCalendar=hourly

[Install]
WantedBy=timers.target

```

Hit it with a `systemctl enable syncoid-replication.timer` and you're in business!
