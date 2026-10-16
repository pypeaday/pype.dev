---
date: 2025-11-21 16:51:33
templateKey: dailyNote
title: 2025-11-21 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-11-19-notes]]

- My blog now has the potential to have audio file served up with it!
  - using [dropper](https://dropper.wayl.one) for now
  - [markata plugin](https://github.com/pypeaday/pype.dev/blob/main/plugins/md_video.py)

As of today that script looks like...

```python
"""md_video plugin"""

from markata.hookspec import hook_impl
import pydantic
import re
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from markata import Markata

MARKATA_PLUGIN_NAME = "md_video"
MARKATA_PLUGIN_PACKAGE_NAME = "md-video"


class MdVideoConfig(pydantic.BaseModel):
    video_extensions: list[str] = [".mp4", ".avi", ".webm"]
    audio_extensions: list[str] = [".mp3", ".wav", ".ogg", ".m4a"]
    output_format: str = "mp4"


class Config(pydantic.BaseModel):
    md_video: MdVideoConfig = MdVideoConfig()


@hook_impl
def config_model(markata: "Markata") -> None:
    markata.config_models.append(Config)


def convert_media_tags(markata: "Markata", post) -> str:
    """Convert Markdown image tags with video extensions to video tags."""
    image_pattern = re.compile(r"!\[(.*?)\]\((.*?)(\.\w+)\)")

    md_video_conversions = []

    def replace_image_with_video(match):
        alt_text, src, ext = match.groups()
        if ext.lower() in markata.config.md_video.video_extensions:
            md_video_conversions.append(
                f"* [[ {post.slug} ]] -> [{src}{ext}]({src}{ext})"
            )
            return f'<video autoplay loop muted playsinline controls><source src="{src}{ext}" type="video/{ext[1:]}">Your browser does not support the video tag.</video>'
        elif ext.lower() in markata.config.md_video.audio_extensions:
            md_video_conversions.append(
                f"* [[ {post.slug} ]] -> [{src}{ext}]({src}{ext})"
            )
            return f'<audio controls><source src="{src}{ext}" type="audio/{ext[1:]}">Your browser does not support the audio tag.</audio>'
        return match.group(0)

    return md_video_conversions, image_pattern.sub(
        replace_image_with_video, post.content
    )


@hook_impl
def pre_render(markata: "Markata") -> None:
    with markata.cache as cache:
        for post in markata.filter("not skip"):
            content_key = markata.make_hash("md_video_content", post.content)
            content = cache.get(content_key)

            if content is None:
                md_video_conversions, post.content = convert_media_tags(markata, post)
                cache.set(content_key, post.content)
                continue
            else:
                post.content = content


```
