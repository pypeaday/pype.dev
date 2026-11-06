#!/usr/bin/env python3
"""Sync thoughts from thoughts.waylonwalker.com into pages/thoughts/*.md.

Replaces the python-markata build_thoughts plugin (which injected posts
in-memory at build time) — markata-go needs real files on disk.

Usage: uv run --script scripts/sync-thoughts.py
"""
# /// script
# requires-python = ">=3.10"
# ///

import json
import re
import urllib.request
from pathlib import Path

OUT_DIR = Path("pages/thoughts")


def clean_title(title: str) -> str:
    title = re.sub(r"\(\d+[^)]*\)", "", title)
    title = title.strip()
    if len(title) > 65:
        title = title[:62] + "..."
    return title


def clean_description(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[*_`#]", "", text)
    return " ".join(text.split())


def post_markdown(post: dict) -> str:
    link = post.get("link") or f"https://pype.dev/thoughts-{post['id']}/"
    tags = [t.strip() for t in (post.get("tags") or "").split(",") if t.strip()]
    tags.append("thoughts")
    tags_yaml = "\n".join(f"  - {json.dumps(t, ensure_ascii=False)}" for t in tags)
    title = "💭 " + clean_title(post["title"]).lstrip("💭 ")
    description = clean_description(post["message"][:120])

    # ensure_ascii=False: YAML forbids \uXXXX surrogate escapes, so keep the
    # emoji literal; json.dumps still quotes/escapes everything else safely.
    frontmatter = f"""---
title: {json.dumps(title, ensure_ascii=False)}
date: {post['date']}
slug: thoughts-{post['id']}
templateKey: thoughts
description: {json.dumps(description, ensure_ascii=False)}
published: true
link: {json.dumps(link, ensure_ascii=False)}
tags:
{tags_yaml}
---
"""
    body = f"""
<a href="{link}">
    <img
        src="https://shots.wayl.one/shot/?url={link}&height=450&width=800&scaled_width=800&scaled_height=450&selectors="
        alt="shot of post - {post['title']}"
        height=450
        width=800
    >
</a>

Here's my thought on <a href="{link}">{post['title']}</a>

---

{post['message']}

---

!!! note
    This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com). It's a short note that I make about someone else's content online.  Learn more about the process [[ thoughts ]]
"""
    return frontmatter + body


def main() -> None:
    url = "https://thoughts.waylonwalker.com/posts/Nic/?page_size=9999999999"
    try:
        with urllib.request.urlopen(url, timeout=30) as resp:
            posts = json.load(resp)
    except Exception as e:
        # committed files in pages/thoughts/ are the last-known-good state —
        # a flaky API shouldn't fail the whole deploy
        if list(OUT_DIR.glob("*.md")):
            print(f"warning: thoughts fetch failed ({e}); using existing files")
            return
        raise

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    written = 0
    for post in posts:
        if not post.get("published") or not post.get("public"):
            continue
        path = OUT_DIR / f"thoughts-{post['id']}.md"
        if path.exists():
            continue
        path.write_text(post_markdown(post))
        written += 1

    print(f"synced {written} new thoughts ({len(posts)} fetched, {len(list(OUT_DIR.glob('*.md')))} on disk)")


if __name__ == "__main__":
    main()
