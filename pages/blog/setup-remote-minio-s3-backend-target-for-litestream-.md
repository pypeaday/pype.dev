---
date: 2025-08-05 08:39:16
templateKey: blog-post
title: Setup Remote MinIO S3 Backend Target for Litestream 
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250805141839_ec0fa2fc.png"
tags:
  - litestream
  - tech

---

## Intro

I am starting to think through some patterns for replicating sqlite databases,
exploring them, standardizing on schemas/models I use across projects, etc...
Thanks to [Waylon](https://waylonwalker.com) I know about [[litestream]] and
finally I started playing with it. Their
[quickstart](https://litestream.io/getting-started/) is good, but it assumes
you'll run MinIO on the same machine you run litestream on.

I, however, have MinIO setup in my homelab with the api endpoint accessible via
DNS - `s3.mydomain.com`.

Before starting - I realize I left the credential aspect out - Litestream
explains how to setup API keys in MinIO for their application
[here](https://litestream.io/getting-started/#setting-up-minio)

Basically after generating the keys I set `LITESTREAM_ACCESS_KEY_ID` and `LITESTREAM_SECRET_ACCESS_KEY` as env vars

So let's see what happens and then get to [the fix]


```
⬢ [devbox] ❯ litestream replicate quadtask-prod.db s3://s3.example.com/litestream/qt.db    
2025/08/05 08:50:09 INFO litestream version=v0.3.13
2025/08/05 08:50:09 INFO initialized db path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
2025/08/05 08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com path=litestream/qt.db region="" endpoint=""
2025/08/05 08:50:10 INFO sync: new generation db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db generation=209692854ccd85d5 reason="no generation exists"
2025/08/05 08:50:10 ERROR monitor error db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 error="cannot lookup bucket region: InvalidAccessKeyId: The AWS Access Key Id you provided does not exist in our records.\n\tstatus code: 403, request id: ERHZD4RD61Y8ADMD, host id: dOjPn5j8Oa+mkwOqROXDvCdKNxzxG0B8JJOPtGXDZA7qKxwAWqaSXhGYzK2mkoJQV7hJhaoJcag="

```

So that `403` is pretty simple... my login is wrong... but wait...

`2025/08/05 08:50:09 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=s3.example.com path=litestream/qt.db region="" endpoint=""`

Notice this line - `endpoint=""`... so `s3://s3.example.com` was not the right replacement for `s3://mybkt.localhost:9000/target.db`. Also the inferred `bucket` is the entire `s3.example.com`... 

Oh! Well I didn't specify a bucket in the subdomain - I did it with a route on the URL... 

ok let's try `litestream replicate quadtask-prod.db s3://litestream.example.com/qt.db`

We got the same kind of error...

`2025/08/05 08:53:45 INFO replicating to name=s3 type=s3 sync-interval=1s bucket=litestream.example.com path=qt.db region="" endpoint=""`

This time the inferred bucket was `litestream.example.com`... ok that's consistent with above as well - so the endpoint is still wrong/null and the bucket inference is wrong...

Turns out for Litestream, and probably many other tools that use s3-compatible storage, that there's an inference problem if the configuration leans on the shorthand `s3://` - [see this GitHub issue](https://github.com/benbjohnson/litestream/issues/398) and [this one about localhost](https://github.com/benbjohnson/litestream/issues/219). There's a few options for using your own `s3.mydomain.example`.

## The Fix

If you're familiar with the `awscli` then maybe you've heard of a config option `AWS_S3_ENDPOINT_URL` which allows you to use the boto sdk with s3-compatibile resources while still using the `s3://` shorthand. Litestream has a way to set this configuration right on config:

```yaml
dbs:
  - path: /home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
    replicas:
      - type: s3
        bucket: litestream
        endpoint: s3.example.com  # <---- right here!
        skip-verify: true  # set to false if you have TLS and want more security
        # note you acn set these sensitive values as env vars per the Litestream Quickstart
        # access-key-id: <ACCESS-KEY-ID>
        # secret-access-key: <SECRET-ACCESS-KEY>
```

???+ danger "UPDATE"

    I added a `path` key to give the backups a folder basically on s3, so under "bucket: listream" I have "path: <my desired path>"

So with that config in place we can actually JUST `litestream replicate` from anywhere...

```bash
⬢ [devbox] ❯ litestream replicate                                                      
time=2025-08-05T08:56:11.353-05:00 level=INFO msg=litestream version=v0.3.13
time=2025-08-05T08:56:11.353-05:00 level=INFO msg="initialized db" path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db
time=2025-08-05T08:56:11.353-05:00 level=INFO msg="replicating to" name=s3 type=s3 sync-interval=1s bucket=litestream path="" region="" endpoint=s3.example.com
time=2025-08-05T08:56:12.399-05:00 level=INFO msg="write snapshot" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 position=209692854ccd85d5/00000000:4152
time=2025-08-05T08:56:12.489-05:00 level=INFO msg="snapshot written" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 position=209692854ccd85d5/00000000:4152 elapsed=89.994626ms sz=909437
time=2025-08-05T08:56:12.492-05:00 level=INFO msg="write wal segment" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 position=209692854ccd85d5/00000000:0
time=2025-08-05T08:56:12.510-05:00 level=INFO msg="wal segment written" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=s3 position=209692854ccd85d5/00000000:0 elapsed=17.572784ms sz=4152
```

!!! success "It works!"
    
    Notice that the endpoint is properly s3.example.com, and the bucket is litestream (the name of my taret bucket in MinIO)

> You can use a local config with `-c config.yaml` or something if you want to avoid the global `/etc/litestream.yml`

## What About Restore?

Should work just fine... Let's move the database on my host and see if I can use litestream to restore it

```
nic in quadtask/litestream   database-clean-up   ×21  ×2  ×9 via   v3.11.10(quadtask)   (dev) 󰒄 
⬢ [devbox] ❯ mv ./source/quadtask-prod.db ./source/quadtask-prod.db.backup                 

nic in quadtask/litestream   database-clean-up   ×21  ×2  ×9 via   v3.11.10(quadtask)   (dev) 󰒄 
⬢ [devbox] ❯ litestream restore ./source/quadtask-prod.db              
time=2025-08-05T09:06:25.826-05:00 level=INFO msg="restoring snapshot" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db.tmp
time=2025-08-05T09:06:25.843-05:00 level=INFO msg="restoring wal files" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0
time=2025-08-05T09:06:25.845-05:00 level=INFO msg="downloaded wal" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.103514ms
time=2025-08-05T09:06:25.856-05:00 level=INFO msg="applied wal" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=10.871034ms
time=2025-08-05T09:06:25.856-05:00 level=INFO msg="renaming database from temporary location" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod

```

The command `litestream restore <db path>` was confusing at first because I was trying to replicate to a new place, but couldn't get the config to line up. The general understanding here is DR I believe - so the configuration is relatively static and when you `restore` you are restoring a specific database, not just standing up a copy from a backup... 

!!! note "But would we setup a copy from a backup?"

    ie. restore to a different file?

Yes, but it's confusing - at least it was to me... it looks to me like litestream uses the path of a db as the identifier in the config, and you reference the config not by an object's name (if it has one) but by the `path`...

So the command is `litestream restore -o <output path> <db path>`. This makes sense in light of the fact that the configuration is relative to this host - so `<db path>` being the path of the source db whose backup you are restoring from to `<output path>` makes some amount of sense... if I wanted to replicate to another machine, then THAT machine would need `/etc/litestream.yaml` and if the filesystem hierarchy was different then an appropriate `path` for the "source" of the db to replicate back to.

```
⬢ [devbox] ❯ litestream restore -o /tmp/db ./source/quadtask-prod.db          
time=2025-08-05T09:09:04.784-05:00 level=INFO msg="restoring snapshot" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 path=/tmp/db.tmp
time=2025-08-05T09:09:04.797-05:00 level=INFO msg="restoring wal files" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index_min=0 index_max=0
time=2025-08-05T09:09:04.799-05:00 level=INFO msg="downloaded wal" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=2.128594ms
time=2025-08-05T09:09:04.800-05:00 level=INFO msg="applied wal" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod generation=209692854ccd85d5 index=0 elapsed=610.75µs
time=2025-08-05T09:09:04.800-05:00 level=INFO msg="renaming database from temporary location" db=/home/nic/projects/personal/quadtask/litestream/source/quadtask-prod.db replica=quadtask-prod

```

