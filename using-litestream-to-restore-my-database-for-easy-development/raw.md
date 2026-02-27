---
date: 2025-08-07 15:14:45
templateKey: blog-post
title: Using Litestream to Restore My Database for Easy Development
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250807213014_2a14556e.png"
tags:
  - litestream
  - tech
---

# Litestream

see [[using-litestream-to-backup-quadtasks-sqlite-db]] for how I setup litestream replication for [[quadtask]]

I have the entrypoint to my app container check if the sqlite database exists
or not - in production or with local volume mounts, it will and then we start
litestream replication and then the app like normal. But what's awesome about
this little trick I got from [this litestream
example](https://github.com/benbjohnson/litestream-docker-example/tree/main) is
I can docker compose up locally without the data directory volume mounted in,
and get a fresh copy of my production data right there locally to work with!

My entrypoint script now looks like:

```bash
#!/bin/bash

# Exit on error, undefined vars, and fail on pipe errors
set -euo pipefail
# Restore the database if it does not already exist.
if [ -f /app/data/quadtask.db ]; then
 echo "Database already exists, skipping restore"
else
 echo "No database found, restoring from replica if exists"
 litestream restore -v /app/data/quadtask.db
fi
# Run litestream with your app as the subprocess.
exec litestream replicate -exec "uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload --log-level debug"

```

## Appropriate and Safe Replication

The way to get prod data in automatically is to restore from the production
backup but I don't want to replicate to the production backup with my local
work, so it's not the best but I have a manual step that makes it pretty easy

I first `just sync-db`

```bash
# Sync production database locally
sync-db:
    fly ssh console -a quadtask -C 'cat /app/data/quadtask.db' > ./litestream/source/quadtask-prod.db
```

and this brings my database down to a folder I maintain locally.

I have litestream installed on my desktop obviously, and here's the relevant litestream configuration I use:

```yaml
dbs:
  - path: /home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replicas:
      - name: quadtask-prod
        type: s3
        bucket: litestream
        path: quadtask-local
        endpoint: s3.example.com
        skip-verify: false
        region: us-east-1
```

So on my desktop if I `litestream replicate` then basically I'm taking the
output of `just synd-db` and replicating to my litestream bucket to the
`quadtask-local` path.

Then I start up my app, it restores from that point and I'm working with fresh
prod data!

## How To Handle Environments?

I have this working for different environments too, with a little bit of
process but basically thanks to [litestream expanding env
vars](https://litestream.io/reference/config/#variable-expansion) in the config
we can do something like this:

```yaml
dbs:
  - path: /app/data/quadtask.db
    replicas:
      - name: quadtask
        type: s3
        bucket: litestream
        path: quadtask-${ENVIRONMENT}
        endpoint: s3.example.com
        skip-verify: false
        region: us-east-1
```

And so wherever I spin up quadtask: local, dev, or prod - the replication will
happen to and from a different path in my litestream bucket!

# Update

I updated the `docker-entrypoint.sh` of my quadtask container to look like this now:

```bash

# Restore the database if it does not already exist.
if [ -f /app/data/quadtask.db ]; then
 echo "Database already exists, skipping restore"
else
 echo "No database found, restoring from replica"
 ENVIRONMENT="prod" litestream restore -v /app/data/quadtask.db
fi
# Run litestream with your app as the subprocess.
exec litestream replicate -exec "uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload --log-level debug"

```

The `if` block checks if there's a db at the filepath it should be in in the continer - if it's not there is the little bit of magic to me right now...

My litestream config has a parameterized `ENVIRONMENT` variable in the db path,
so by overwritting it for just the `restore` command, I can very simply always
pull a fresh copy of the prod database into an ephemeral container to test
things against real data in a very convenient way
