from markata.hookspec import hook_impl, register_attr
from pydantic import BaseModel
import re
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from markata import Markata


class LinkPost(BaseModel):
    link: Optional[str] = None


@hook_impl()
@register_attr("post_models")
def post_model(markata: "Markata") -> None:
    markata.post_models.append(LinkPost)


def clean_title(title: str) -> str:
    # Remove parenthetical content that starts with a number
    title = re.sub(r"\(\d+[^)]*\)", "", title)
    # Trim whitespace
    title = title.strip()
    # Limit to 65 characters
    if len(title) > 65:
        title = title[:62] + "..."
    return title


def clean_description(text: str) -> str:
    # Remove markdown links
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    # Remove markdown formatting characters
    text = re.sub(r"[*_`#]", "", text)
    # Clean up any extra whitespace
    text = " ".join(text.split())
    return text


@hook_impl()
def load(markata: "Markata") -> None:
    import requests

    posts = requests.get(
        "https://thoughts.waylonwalker.com/posts/Nic/?page_size=9999999999"
    ).json()

    text_opacity_80 = "{.text-opacity-80}"
    for post in posts:
        cleaned_title = clean_title(post["title"])
        post["markata"] = markata
        post["title"] = "💭 " + cleaned_title.lstrip("💭 ")
        post["path"] = f"thoughts-{post['id']}.md"
        post["slug"] = f"thoughts-{post['id']}"
        post["templateKey"] = "thoughts"
        post["markata"] = markata
        post["description"] = clean_description(post["message"][:120])
        if post["link"] is None or post["link"] == "None":
            post["link"] = "https://pype.dev/" + post["slug"] + "/"
        post["tags"] = [tag.strip() for tag in post["tags"].split(",")] + ["thoughts"]
        post["content"] = f"""
<a href="{ post["link"] }">
    <img
        src="https://shots.wayl.one/shot/?url={ post["link"] }&height=450&width=800&scaled_width=800&scaled_height=450&selectors=""
        alt="shot of post - { post["title"] }"
        height=450
        width=800
    >
</a>

Here's my thought on <a href="{post["link"]}">{post["title"]}</a>

---

{post["message"]}

---

!!! note
     This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com). It's a short note that I make about someone else's
     content online.  Learn more about the process [[ thoughts ]]


---

{post["tags"]}
        """
        post["raw"] = post["content"]
        post["jinja"] = False
        post["published"] = True

    thoughts = markata.Posts.parse_obj(
        {"posts": posts},
    )
    markata.posts.extend(thoughts.posts)