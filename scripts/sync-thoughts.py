#!/usr/bin/env python
# scripts/sync-thoughts.py
"""Sync thoughts from the web to local markdown files."""
import datetime
import re
import textwrap
from pathlib import Path

import requests


def clean_title(title: str) -> str:
    """Cleans the title of a post."""
    # Remove parenthetical content that starts with a number
    title = re.sub(r"\(\d+[^)]*\)", "", title)
    # Trim whitespace
    title = title.strip()
    # Limit to 65 characters
    if len(title) > 65:
        title = title[:62] + "..."
    return title


def clean_description(text: str) -> str:
    """Cleans the description text."""
    # Remove markdown links
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    # Remove markdown formatting characters
    text = re.sub(r"[*_`#]", "", text)
    # Clean up any extra whitespace
    text = " ".join(text.split())
    return text


def sync_thoughts():
    """Fetches thoughts and saves them as markdown files."""
    output_dir = Path("pype.dev/content/thoughts")
    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        response = requests.get(
            # TODOL limit for now
            "https://thoughts.waylonwalker.com/posts/Nic/?page_size=5",
            # "https://thoughts.waylonwalker.com/posts/Nic/?page_size=9999999999",
            timeout=10,
        )
        response.raise_for_status()
        posts = response.json()
    except requests.RequestException as e:
        print(f"Error fetching thoughts: {e}")
        return

    for post in posts:
        post_id = post["id"]
        slug = f"thoughts-{post_id}"
        filepath = output_dir / f"{slug}.md"
        cleaned_title = clean_title(post["title"])
        title = "💭 " + cleaned_title.lstrip("💭 ")
        description = clean_description(post["message"][:120])
        link = post.get("link")
        if not link or link == "None":
            link = f"https://pype.dev/{slug}/"

        tags = [
            tag.strip() for tag in post.get("tags", "").split(",") if tag.strip()
        ] + ["thoughts"]

        date = datetime.datetime.now().isoformat()

        content_body = textwrap.dedent(
            f"""
        <a href="{link}">
            <img
                src="https://shots.wayl.one/shot/?url={link}&height=450&width=800&scaled_width=800&scaled_height=450&selectors="
                alt="shot of post - {title}"
                height=450
                width=800
            >
        </a>

        Here's my thought on <a href="{link}">{title}</a>

        ---

        {post["message"]}

        ---

        ???+ note "This is one of [[my-thoughts]]"
            I picked this up from [Waylon Walker](https://waylonwalker.com) who made [thoughts](https://thoughts.waylonwalker.com). It's a short note that I make about someone else's content online.  Learn more about [[thoughts]]
        """
        )

        frontmatter = textwrap.dedent(
            f"""
        ---
        title: "{title.replace('"', '\\"')}"
        slug: "{slug}"
        date: "{date}"
        tags: {tags}
        description: "{description.replace('"', '\\"')}"
        link: "{link}"
        published: true
        ---
        """
        )

        full_content = frontmatter.strip() + "\n\n" + content_body.strip()

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(full_content)
        print(f"Saved thought: {filepath}")


if __name__ == "__main__":
    sync_thoughts()
