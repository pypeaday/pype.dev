#!/usr/bin/env python3
"""Pull a finished doc from sermons.paynepride.com into pages/faith/ as a draft.

Usage: just publish-sermon <doc-slug>
Auth: reads APP_PASSWORD from the homelab stack env (gitignored there).
"""
import json, re, sys, urllib.request, pathlib, datetime

APP = "https://sermons.paynepride.com"
STACK_ENV = pathlib.Path.home() / "projects/personal/homelab-mono/compose/ghost/sermon-prep/.env"
PAGES = pathlib.Path(__file__).resolve().parent.parent / "pages" / "faith"

slug = sys.argv[1] if len(sys.argv) > 1 else sys.exit("usage: publish-sermon <doc-slug>")
pw = re.search(r"APP_PASSWORD=(.+)", STACK_ENV.read_text()).group(1).strip()

req = urllib.request.Request(f"{APP}/api/login", method="POST",
    data=json.dumps({"password": pw}).encode(),
    headers={"content-type": "application/json"})
cookie = urllib.request.urlopen(req).headers["Set-Cookie"].split(";")[0]

req = urllib.request.Request(f"{APP}/api/docs/{slug}", headers={"cookie": cookie})
with urllib.request.urlopen(req) as r:
    if r.status != 200:
        sys.exit(f"doc {slug!r}: HTTP {r.status}")
    content = json.loads(r.read())["content"]

m = re.search(r"^#\s+(.+)$", content, re.M)
title = m.group(1).strip() if m else slug.replace("-", " ").title()
if m:
    content = (content[:m.start()] + content[m.end():]).strip()

out = PAGES / f"{re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')}.md"
if out.exists():
    sys.exit(f"{out} already exists — remove or rename it first")

out.write_text(f"""---
date: {datetime.datetime.now():%Y-%m-%d %H:%M:%S}
templateKey: blog-post
title: "{title.replace('"', '\\"')}"
published: False
tags:
  - faith
  - sermon
---

{content}
""")
print(f"wrote {out}")
print("draft — review, set published: True, then `just go-build`")
