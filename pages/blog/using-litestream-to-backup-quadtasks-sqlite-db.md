---
date: 2025-08-05 19:34:19
templateKey: blog-post
title: Using Litestream to Backup QuadTask's SQLite DB
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250807213328_4f4d18a2.png"
tags:
  - litestream
  - tech

---

# Litestream

This post will be a walkthrough of installing [[litestream]] in a docker container
that runs my FastAPI app in order to replicate the sqlite db in the data volume
currently hosted in Fly's volume manager to my MinIO instance. From there, on
my development machine I can use litestream to restore the prod database to my
dev environment to practice whatever I may need to practice with real
production data!

## Dockerfile

Installing litestream in the dockerfile is 2-3 lines of code - no sweat. Configuration file is further down the post.

```dockerfile
FROM python:3.11-slim
WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Install litestream
ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz
COPY etc/litestream.yml /etc/litestream.yml

# Install dependencies
COPY requirements.txt .
RUN uv pip install --no-cache -r requirements.txt

# Copy the rest of the application
COPY . .

# Install the app package in development mode
RUN uv pip install -e .

# Run the application
CMD ["docker-entrypoint.sh"]

```

## Litestream Configuration

Taking care to set `ENVIRONMENT` appropriately in each environment, the
litestream configuration gets that env var templated out to the path for the
litestream target. See [docs](https://litestream.io/reference/config/#variable-expansion)

```yaml
#/etc/litestream.yml
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

## Authentication

In your docker container you'll need to set `LITESTREAM_ACCESS_KEY_ID` and
`LITESTREAM_SECRET_ACCESS_KEY` which you setup in Minio - see
[[setup-remote-minio-s3-backend-target-for-litestream]]. I have these set as
secrets in my fly configuration, and locally in a .env file that gets sourced
with my compose stack

## Example Log from Dev

My fly dev machine has this log message showing the `ENVIRONMENT` var `dev` gets expanded into the config so the s3 path includes `quadtask-dev`

`replicating to: name="quadtask" type="s3" bucket="litestream" path="quadtask-dev" region="us-east-1" endpoint="s3.<redacted>.com" sync-interval=1s`

## Example Usage for Local Development

- [[using-litestream-to-restore-my-database-for-easy-development]]
