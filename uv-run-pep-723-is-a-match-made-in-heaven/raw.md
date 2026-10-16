---
date: 2025-12-08 04:59:10
templateKey: blog-post
title: UV Run + PEP 723 Is A Match Made In Heaven
published: True
cover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png
tags:
  - series-if-you-want-it-make-it-so
  - tech
---

This post will be short but hopefully be a dense few paragraphs about how using
`uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/) is
life-changing.

## PEP 723

Python Enhancement Proposals (PEP) are the community's way of improving the
python language and ecosystem and PEP 723 is one of my favorites. It permits
adding python metadata right to your script which allows `python` to setup the
script's dependencies at runtime.

## UV

[[uv]] makes it even better with it's super fast resolution and environment
setup. I don't have any posts about uv yet, but here's the
[docs](https://docs.astral.sh/uv/getting-started/installation/), installing
`uv` is now apart of my dev-machine setup because I need it everywhere!

## The Magic

I'm experiencing the power of `uv run myscript.py` as I've integrated a python
script into my tmux workflow for managing sessions as well as groups of
git-worktrees to keep development-ideas contained, easy to find, and easy to
manage.

!!! warning "The Series"

    This post is in my "If You Want It Make It So" series because of the workspaces thing generally, not the dbztui example below, but for me - having 'uv run' as a pretty powerful Bash replacement makes my development workflow easier to build on and manage

My [workspaces docs](https://pypeaday.github.io/dotfiles/terminal/workspaces/)
explain the setup a bit, and that script is in my
[dotfiles](https://github.com/pypeaday/dotfiles/blob/main/workspaces/.local/bin/ws.py)

For a shorter example, here's an example that has regular `pip` style
dependencies, a `git+https` dependency, and is a tui - not just a top to bottom
script

!!! note "What is it?"

    This is my DBZTUI script - it uses a beta package from Waylon called
    ninesui and calls the dragonball-api to give you a handy way to explore the
    Dragon Ball Universe from the glorious comfort of your terminal

Copy this code into `dbztui.py`

!!! note "Execution"

    You can `chmod +x` this script with the shebang to tell your shell to use uv to run it or just `uv run dbztui.py` will also work just fine

```python
#!/usr/bin/env -S uv run --quiet --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "ninesui @ git+https://github.com/waylonwalker/ninesui.git",
#     "httpx",
#     "deep-translator",
# ]
# ///
from typing import Optional, List, TypeVar, ClassVar, Any, Dict
from pydantic import BaseModel, Field, HttpUrl
import httpx
from textual import log
from ninesui import CommandSet, Command, NinesUI
from functools import lru_cache
from deep_translator import GoogleTranslator
import json
import os

BASE_URL = "https://dragonball-api.com/api/"

# Translation cache file
CACHE_DIR = os.path.expanduser("~/.cache/dbztui")
CACHE_FILE = os.path.join(CACHE_DIR, "translation_cache.json")

# Create cache directory if it doesn't exist
os.makedirs(CACHE_DIR, exist_ok=True)

# Load translation cache from file
translation_cache: Dict[str, str] = {}
if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            translation_cache = json.load(f)
    except Exception as e:
        log(f"Error loading translation cache: {e}")

# Initialize translator
translator = GoogleTranslator(source='es', target='en')

T = TypeVar("T", bound="DBZResource")

@lru_cache(maxsize=1000)
def translate_text(text: str) -> str:
    """Translate text from Spanish to English with caching"""
    if not text or len(text) < 5:  # Don't translate very short texts
        return text

    # Check if translation is in cache
    if text in translation_cache:
        return translation_cache[text]

    try:
        # Translate text
        translated = translator.translate(text)

        # Save to cache
        translation_cache[text] = translated

        # Periodically save cache to file
        if len(translation_cache) % 10 == 0:  # Save every 10 new translations
            try:
                with open(CACHE_FILE, "w", encoding="utf-8") as f:
                    json.dump(translation_cache, f, ensure_ascii=False, indent=2)
            except Exception as e:
                log(f"Error saving translation cache: {e}")

        return translated
    except Exception as e:
        log(f"Translation error: {e}")
        return text  # Return original text if translation fails


class DBZResource(BaseModel):
    id: int

    nines_config: ClassVar[dict] = {"bindings": {}}

    @classmethod
    def fetch(cls, ctx=None):
        endpoint = cls.__name__.lower() + "s"

        client = httpx.Client()
        log(f"Fetching {endpoint}")

        if ctx:
            if hasattr(ctx, endpoint):
                result = []
                for url in getattr(ctx, endpoint):
                    res = client.get(str(url)).json()
                    result.append(cls(**res))
                return result

        url = f"{BASE_URL}{endpoint}"

        results: List[T] = []
        response = client.get(url)
        response.raise_for_status()
        data = response.json()

        # Handle pagination structure from Dragon Ball API
        if "items" in data:
            results.extend(cls(**item) for item in data.get("items", []))

            # Fetch all pages if needed
            while data.get("links", {}).get("next"):
                next_url = data["links"]["next"]
                response = client.get(next_url)
                response.raise_for_status()
                data = response.json()
                results.extend(cls(**item) for item in data.get("items", []))
        else:
            # Direct list of items
            results.extend(cls(**item) for item in data)

        return results

    def hover(self):
        return self

    def get_details(self):
        """Get detailed information about this resource"""
        client = httpx.Client()
        endpoint = self.__class__.__name__.lower() + "s"
        url = f"{BASE_URL}{endpoint}/{self.id}"
        response = client.get(url)
        response.raise_for_status()
        data = response.json()

        # Translate description if present
        if "description" in data and data["description"]:
            data["description"] = translate_text(data["description"])

        return self.__class__(**data)


class Character(DBZResource):
    name: str
    ki: str
    maxKi: str
    race: str
    gender: str
    description: str
    image: Optional[HttpUrl] = None
    affiliation: str
    deletedAt: Optional[str] = None

    def __init__(self, **data):
        # Translate description before initializing
        if "description" in data and data["description"]:
            data["description"] = translate_text(data["description"])
        super().__init__(**data)

    nines_config: ClassVar[dict] = {"bindings": {"t": "get_transformations"}}

    def get_transformations(self):
        """Get all transformations for this character"""
        client = httpx.Client()
        url = f"{BASE_URL}characters/{self.id}/transformations"
        try:
            response = client.get(url)
            response.raise_for_status()
            data = response.json()
            if "items" in data:
                return [Transformation(**item) for item in data.get("items", [])]
            return [Transformation(**item) for item in data]
        except Exception as e:
            log(f"Error fetching transformations: {e}")
            return []


class Transformation(DBZResource):
    name: str
    image: Optional[HttpUrl] = None
    ki: str
    characterId: int
    deletedAt: Optional[str] = None

    # Note: This is not a direct API endpoint, but accessed through character transformations


class Planet(DBZResource):
    name: str
    description: str
    image: Optional[HttpUrl] = None
    deletedAt: Optional[str] = None

    def __init__(self, **data):
        # Translate description before initializing
        if "description" in data and data["description"]:
            data["description"] = translate_text(data["description"])
        super().__init__(**data)


# Note: Saga and Episode models removed as they are not supported by the API


commands = CommandSet(
    [
        Command(
            name="character",
            aliases=["c"],
            model=Character,
            is_default=True,
        ),
        Command(
            name="planet",
            aliases=["p"],
            model=Planet,
        ),
        # Note: Transformation is not a direct API endpoint, but can be accessed through characters
    ]
)

metadata = {
    "title": "Dragon Ball Z Explorer",
    "subtitle": "Use :character or :planet to explore. Enter to drill in. Escape to go back/quit.",
}


if __name__ == "__main__":
    ui = NinesUI(metadata=metadata, commands=commands)
    try:
        ui.run()
    finally:
        # Save translation cache when exiting
        try:
            with open(CACHE_FILE, "w", encoding="utf-8") as f:
                json.dump(translation_cache, f, ensure_ascii=False, indent=2)
        except Exception as e:
            log(f"Error saving translation cache on exit: {e}")
```

![20251208111354_0ae058e5.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208111354_0ae058e5.png)

> See [[columns-env-var-for-nicer-screenshots]] about making terminal screenshots a bit nicer
