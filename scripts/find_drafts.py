#!/usr/bin/env python3
"""Find and display draft posts from markata site."""

import frontmatter
import sys
from pathlib import Path


def find_drafts(pages_dir="pages"):
    """Find all markdown files with published: false in frontmatter."""
    drafts = []
    pages_path = Path(pages_dir)

    for md_file in pages_path.rglob("*.md"):
        try:
            post = frontmatter.load(str(md_file))
            published = post.get("published", True)

            # Handle string values
            if isinstance(published, str):
                published = published.lower() not in ["false", "no", "0"]

            if not published:
                title = post.get("title", "Untitled")
                drafts.append((str(md_file), title))
        except Exception:
            continue

    return drafts


def main():
    drafts = find_drafts()

    if not drafts:
        print("No drafts found", file=sys.stderr)
        sys.exit(0)

    # Output in format: path|title
    for path, title in drafts:
        print(f"{path}|{title}")


if __name__ == "__main__":
    main()
