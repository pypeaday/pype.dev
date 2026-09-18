---
content: "This post will be short but hopefully be a dense few paragraphs about how
  using\n`uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/) is\nlife-changing.\n\n##
  PEP 723\n\nPython Enhancement Proposals (PEP) are the community's way of improving
  the\npython language and ecosystem and PEP 723 is one of my favorites. It permits\nadding
  python metadata right to your script which allows `python` to setup the\nscript's
  dependencies at runtime.\n\n## UV\n\n[[uv]] makes it even better with it's super
  fast resolution and environment\nsetup. I don't have any posts about uv yet, but
  here's the\n[docs](https://docs.astral.sh/uv/getting-started/installation/), installing\n`uv`
  is now apart of my dev-machine setup because I need it everywhere!\n\n## The Magic\n\nI'm
  experiencing the power of `uv run myscript.py` as I've integrated a python\nscript
  into my tmux workflow for managing sessions as well as groups of\ngit-worktrees
  to keep development-ideas contained, easy to find, and easy to\nmanage.\n\n!!! warning
  \"The Series\"\n\n    This post is in my \"If You Want It Make It So\" series because
  of the workspaces thing generally, not the dbztui example below, but for me - having
  'uv run' as a pretty powerful Bash replacement makes my development workflow easier
  to build on and manage\n\nMy [workspaces docs](https://pypeaday.github.io/dotfiles/terminal/workspaces/)\nexplain
  the setup a bit, and that script is in my\n[dotfiles](https://github.com/pypeaday/dotfiles/blob/main/workspaces/.local/bin/ws.py)\n\nFor
  a shorter example, here's an example that has regular `pip` style\ndependencies,
  a `git+https` dependency, and is a tui - not just a top to bottom\nscript\n\n!!!
  note \"What is it?\"\n\n    This is my DBZTUI script - it uses a beta package from
  Waylon called\n    ninesui and calls the dragonball-api to give you a handy way
  to explore the\n    Dragon Ball Universe from the glorious comfort of your terminal\n\nCopy
  this code into `dbztui.py`\n\n!!! note \"Execution\"\n\n    You can `chmod +x` this
  script with the shebang to tell your shell to use uv to run it or just `uv run dbztui.py`
  will also work just fine\n\n```python\n#!/usr/bin/env -S uv run --quiet --script\n#
  /// script\n# requires-python = \">=3.10\"\n# dependencies = [\n#     \"ninesui
  @ git+https://github.com/waylonwalker/ninesui.git\",\n#     \"httpx\",\n#     \"deep-translator\",\n#
  ]\n# ///\nfrom typing import Optional, List, TypeVar, ClassVar, Any, Dict\nfrom
  pydantic import BaseModel, Field, HttpUrl\nimport httpx\nfrom textual import log\nfrom
  ninesui import CommandSet, Command, NinesUI\nfrom functools import lru_cache\nfrom
  deep_translator import GoogleTranslator\nimport json\nimport os\n\nBASE_URL = \"https://dragonball-api.com/api/\"\n\n#
  Translation cache file\nCACHE_DIR = os.path.expanduser(\"~/.cache/dbztui\")\nCACHE_FILE
  = os.path.join(CACHE_DIR, \"translation_cache.json\")\n\n# Create cache directory
  if it doesn't exist\nos.makedirs(CACHE_DIR, exist_ok=True)\n\n# Load translation
  cache from file\ntranslation_cache: Dict[str, str] = {}\nif os.path.exists(CACHE_FILE):\n
  \   try:\n        with open(CACHE_FILE, \"r\", encoding=\"utf-8\") as f:\n            translation_cache
  = json.load(f)\n    except Exception as e:\n        log(f\"Error loading translation
  cache: {e}\")\n\n# Initialize translator\ntranslator = GoogleTranslator(source='es',
  target='en')\n\nT = TypeVar(\"T\", bound=\"DBZResource\")\n\n@lru_cache(maxsize=1000)\ndef
  translate_text(text: str) -> str:\n    \"\"\"Translate text from Spanish to English
  with caching\"\"\"\n    if not text or len(text) < 5:  # Don't translate very short
  texts\n        return text\n\n    # Check if translation is in cache\n    if text
  in translation_cache:\n        return translation_cache[text]\n\n    try:\n        #
  Translate text\n        translated = translator.translate(text)\n\n        # Save
  to cache\n        translation_cache[text] = translated\n\n        # Periodically
  save cache to file\n        if len(translation_cache) % 10 == 0:  # Save every 10
  new translations\n            try:\n                with open(CACHE_FILE, \"w\",
  encoding=\"utf-8\") as f:\n                    json.dump(translation_cache, f, ensure_ascii=False,
  indent=2)\n            except Exception as e:\n                log(f\"Error saving
  translation cache: {e}\")\n\n        return translated\n    except Exception as
  e:\n        log(f\"Translation error: {e}\")\n        return text  # Return original
  text if translation fails\n\n\nclass DBZResource(BaseModel):\n    id: int\n\n    nines_config:
  ClassVar[dict] = {\"bindings\": {}}\n\n    @classmethod\n    def fetch(cls, ctx=None):\n
  \       endpoint = cls.__name__.lower() + \"s\"\n\n        client = httpx.Client()\n
  \       log(f\"Fetching {endpoint}\")\n\n        if ctx:\n            if hasattr(ctx,
  endpoint):\n                result = []\n                for url in getattr(ctx,
  endpoint):\n                    res = client.get(str(url)).json()\n                    result.append(cls(**res))\n
  \               return result\n\n        url = f\"{BASE_URL}{endpoint}\"\n\n        results:
  List[T] = []\n        response = client.get(url)\n        response.raise_for_status()\n
  \       data = response.json()\n\n        # Handle pagination structure from Dragon
  Ball API\n        if \"items\" in data:\n            results.extend(cls(**item)
  for item in data.get(\"items\", []))\n\n            # Fetch all pages if needed\n
  \           while data.get(\"links\", {}).get(\"next\"):\n                next_url
  = data[\"links\"][\"next\"]\n                response = client.get(next_url)\n                response.raise_for_status()\n
  \               data = response.json()\n                results.extend(cls(**item)
  for item in data.get(\"items\", []))\n        else:\n            # Direct list of
  items\n            results.extend(cls(**item) for item in data)\n\n        return
  results\n\n    def hover(self):\n        return self\n\n    def get_details(self):\n
  \       \"\"\"Get detailed information about this resource\"\"\"\n        client
  = httpx.Client()\n        endpoint = self.__class__.__name__.lower() + \"s\"\n        url
  = f\"{BASE_URL}{endpoint}/{self.id}\"\n        response = client.get(url)\n        response.raise_for_status()\n
  \       data = response.json()\n\n        # Translate description if present\n        if
  \"description\" in data and data[\"description\"]:\n            data[\"description\"]
  = translate_text(data[\"description\"])\n\n        return self.__class__(**data)\n\n\nclass
  Character(DBZResource):\n    name: str\n    ki: str\n    maxKi: str\n    race: str\n
  \   gender: str\n    description: str\n    image: Optional[HttpUrl] = None\n    affiliation:
  str\n    deletedAt: Optional[str] = None\n\n    def __init__(self, **data):\n        #
  Translate description before initializing\n        if \"description\" in data and
  data[\"description\"]:\n            data[\"description\"] = translate_text(data[\"description\"])\n
  \       super().__init__(**data)\n\n    nines_config: ClassVar[dict] = {\"bindings\":
  {\"t\": \"get_transformations\"}}\n\n    def get_transformations(self):\n        \"\"\"Get
  all transformations for this character\"\"\"\n        client = httpx.Client()\n
  \       url = f\"{BASE_URL}characters/{self.id}/transformations\"\n        try:\n
  \           response = client.get(url)\n            response.raise_for_status()\n
  \           data = response.json()\n            if \"items\" in data:\n                return
  [Transformation(**item) for item in data.get(\"items\", [])]\n            return
  [Transformation(**item) for item in data]\n        except Exception as e:\n            log(f\"Error
  fetching transformations: {e}\")\n            return []\n\n\nclass Transformation(DBZResource):\n
  \   name: str\n    image: Optional[HttpUrl] = None\n    ki: str\n    characterId:
  int\n    deletedAt: Optional[str] = None\n\n    # Note: This is not a direct API
  endpoint, but accessed through character transformations\n\n\nclass Planet(DBZResource):\n
  \   name: str\n    description: str\n    image: Optional[HttpUrl] = None\n    deletedAt:
  Optional[str] = None\n\n    def __init__(self, **data):\n        # Translate description
  before initializing\n        if \"description\" in data and data[\"description\"]:\n
  \           data[\"description\"] = translate_text(data[\"description\"])\n        super().__init__(**data)\n\n\n#
  Note: Saga and Episode models removed as they are not supported by the API\n\n\ncommands
  = CommandSet(\n    [\n        Command(\n            name=\"character\",\n            aliases=[\"c\"],\n
  \           model=Character,\n            is_default=True,\n        ),\n        Command(\n
  \           name=\"planet\",\n            aliases=[\"p\"],\n            model=Planet,\n
  \       ),\n        # Note: Transformation is not a direct API endpoint, but can
  be accessed through characters\n    ]\n)\n\nmetadata = {\n    \"title\": \"Dragon
  Ball Z Explorer\",\n    \"subtitle\": \"Use :character or :planet to explore. Enter
  to drill in. Escape to go back/quit.\",\n}\n\n\nif __name__ == \"__main__\":\n    ui
  = NinesUI(metadata=metadata, commands=commands)\n    try:\n        ui.run()\n    finally:\n
  \       # Save translation cache when exiting\n        try:\n            with open(CACHE_FILE,
  \"w\", encoding=\"utf-8\") as f:\n                json.dump(translation_cache, f,
  ensure_ascii=False, indent=2)\n        except Exception as e:\n            log(f\"Error
  saving translation cache on exit: {e}\")\n```\n\n![20251208111354_0ae058e5.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208111354_0ae058e5.png)\n\n>
  See [[columns-env-var-for-nicer-screenshots]] about making terminal screenshots
  a bit nicer"
date: 2025-12-08
description: 'This post will be short but hopefully be a dense few paragraphs about
  how using

  `uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/) is

  life-'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>UV Run + PEP 723
    Is A Match Made In Heaven</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"This post will be short but hopefully be a dense few paragraphs about
    how using\n`uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/)
    is\nlife-\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"UV Run + PEP 723 Is A Match Made In Heaven | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/uv-run-pep-723-is-a-match-made-in-heaven\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"UV Run + PEP 723 Is A Match Made In Heaven | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"This post will be short but hopefully be a dense few paragraphs about
    how using\n`uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/)
    is\nlife-\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"terminal-page\">\n
    \   <main class=\"terminal-page__main\">\n        <div class=\"terminal-page__content\">\n<header
    class=\"site-terminal\">\n\n    <div class=\"site-terminal__bar\">\n        <div
    class=\"site-terminal__lights\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n
    \       <div class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/uv-run-pep-723-is-a-match-made-in-heaven</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <div class=\"post-terminal__search\">\n<div id='didyoumean'>\n    <div class=\"mb-0\">\n
    \       <!-- <label for=\"search\" class=\"block text-sm font-medium mb-2\">Search
    for a page</label> -->\n        <input type=\"text\" id=\"search\"\n               class=\"w-full
    px-4 py-2 bg-transparent border-b-2 border-terminal-border text-terminal-text
    placeholder-terminal-text/40 focus:outline-none focus:border-terminal-accent transition-colors\"\n
    \              placeholder=\"'/' search...\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\"
    class=\"grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
    class='grid gap-4'>\n        <!-- Results will be populated here -->\n    </ul>\n</div>\n<script
    type='module'>\n// All available pages from Markata\n    // const pages =  markata.map(\"{'slug':slug,'title':title,'description':description,'tags':tags}\",
    filter=config.didyoumean_filter, sort='True')|tojson;\n    // fetch pages from
    config.output_dir / didyoumean.json\n\n    const pages = await fetch('/didyoumean.json').then(response
    => response.json());\n    const populate_search_input = false\n    const search_hotkey
    = \"/\"\n\n// Get current path from URL, removing leading/trailing slashes\n    if
    (populate_search_input) {\n        const currentPath = window.location.pathname.replace(/^\\/|\\/$/g,
    '');\n        document.getElementById('search').value = currentPath;\n    }\n\n//
    Search across all fields in an object\n    function searchObject(needle, obj)
    {\n        needle = needle.toLowerCase();\n        let score = 0;\n\n    // Helper
    to search a single field\n        const searchField = (value) => {\n            if
    (!value) return 0;\n            value = String(value).toLowerCase();\n\n            //
    Exact matches\n            if (value === needle) return 15;\n\n            //
    Word boundary matches (complete words)\n            if (value.match(new RegExp(`\\\\b${needle}\\\\b`)))
    return 10;\n\n            // Contains full search term\n            if (value.includes(needle))
    return 8;\n\n            // Most parts match (for multi-word searches)\n            const
    needleParts = needle.split(/\\W+/).filter(p => p.length > 2);\n            const
    valueParts = value.split(/\\W+/).filter(p => p.length > 2);\n\n            if
    (needleParts.length === 0) return 0;\n\n            let matchCount = 0;\n            for
    (const part of needleParts) {\n                for (const valuePart of valueParts)
    {\n                    if (valuePart.includes(part) || part.includes(valuePart))
    {\n                        matchCount++;\n                        break;\n                    }\n
    \               }\n            }\n\n            // Only count if most parts match\n
    \           const matchRatio = matchCount / needleParts.length;\n            if
    (matchRatio >= 0.75) {\n                return matchRatio * 6;\n            }\n\n
    \           return 0;\n        };\n\n    // Search each field with different weights\n
    \       const slugScore = searchField(obj.slug) * 3;  // Slug is most important\n
    \       const titleScore = searchField(obj.title) * 2;  // Title is next\n        const
    descScore = searchField(obj.description) * 1;  // Description\n        const tagScore
    = (obj.tags || []).reduce((sum, tag) => sum + searchField(tag), 0);  // Tags\n\n
    \       score = slugScore + titleScore + descScore + tagScore;\n\n    // Path
    segment matches for slug (only if we have some other match)\n        if (score
    > 0 && obj.slug) {\n            const inputParts = needle.split('/').filter(p
    => p.length > 0);\n            const slugParts = obj.slug.toLowerCase().split('/');\n\n
    \           // Bonus for matching path structure\n            for (let i = 0;
    i < inputParts.length && i < slugParts.length; i++) {\n                if (slugParts[i].includes(inputParts[i]))
    {\n                    score += 5;  // Matching segments in order is valuable\n
    \               }\n            }\n        }\n\n        return score;\n    }\n\n//
    Find similar pages\n    function findSimilar(input) {\n        if (!input || input.length
    < 2) return [];\n        const normalizedInput = input.toLowerCase().trim();\n\n
    \   // Score each page\n        const scored = pages.map(page => ({\n            ...page,\n
    \           score: searchObject(normalizedInput, page)\n        }));\n\n    //
    Sort by score (higher is better) and take top matches\n        return scored\n
    \           .sort((a, b) => b.score - a.score)\n            .slice(0, 12)  //
    Show more results in the grid\n            .filter(item => item.score > 15); //
    Only show strong matches\n    }\n\n// Update results in the DOM\n    function
    updateResults(results) {\n        const resultsDiv = document.getElementById('didyoumean_results');\n\n
    \       if (results.length === 0) {\n            resultsDiv.innerHTML = '<p class=\"text-gray-500
    col-span-full text-center py-8\">No similar pages found.</p>';\n            return;\n
    \       }\n\n        const html = results.map(page => `\n        <li class=\"p-4
    bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow first:mt-4\">\n
    \           <a href=\"/${page.slug}\" class=\"block\">\n                <h3 class=\"text-lg
    font-semibold text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300
    mb-2\">\n                    ${page.title || page.slug}\n                </h3>\n
    \               ${page.description ? `\n            <p class=\"text-sm text-gray-600
    dark:text-gray-300 mb-3 line-clamp-2\">\n            ${page.description}\n            </p>\n
    \           ` : ''}\n                <div class=\"flex flex-wrap gap-2 text-xs
    text-gray-500 dark:text-gray-400\">\n                </div>\n                ${page.tags
    && page.tags.length > 0 ? `\n            <div class=\"mt-3 flex flex-wrap gap-2\">\n
    \           ${page.tags.map(tag => `\n                            <span class=\"px-2
    py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs\">\n                                ${tag}\n
    \                           </span>\n                        `).join('')}\n            </div>\n
    \           ` : ''}\n            </a>\n        </li>\n    `).join('');\n\n        resultsDiv.innerHTML
    = html;\n    }\n\n// Set up hotkey for search if configured\n    if (search_hotkey)
    {\n        document.addEventListener('keydown', (e) => {\n            // Don't
    trigger if user is typing in an input or textarea\n            if (e.target.tagName
    === 'INPUT' || e.target.tagName === 'TEXTAREA') {\n                return;\n            }\n\n
    \           // Check if the pressed key matches the hotkey\n            if (e.key
    === search_hotkey) {\n                e.preventDefault();  // Prevent the '/'
    from being typed\n                const searchInput = document.getElementById('search');\n
    \               searchInput.focus();\n                searchInput.select();  //
    Select any existing text\n            }\n        });\n    }\n\n// Set up search
    input handler with debounce\n    let debounceTimeout;\n    const searchInput =
    document.getElementById('search');\n    searchInput.addEventListener('input',
    (e) => {\n        clearTimeout(debounceTimeout);\n        debounceTimeout = setTimeout(()
    => {\n            const results = findSimilar(e.target.value);\n            updateResults(results);\n
    \       }, 100);\n    });\n\n// Initial search with current path\n    if (populate_search_input)
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    </div>\n<section
    class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n        <div
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\"
    alt=\"UV Run + PEP 723 Is A Match Made In Heaven cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">UV
    Run + PEP 723 Is A Match Made In Heaven</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-12-08\">\n            December
    08, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/series-if-you-want-it-make-it-so/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #series-if-you-want-it-make-it-so\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>This post will be short but hopefully
    be a dense few paragraphs about how using\n<code>uv run foo.py</code> along with
    <a href=\"https://peps.python.org/pep-0723/\">PEP 723</a> is\nlife-changing.</p>\n<h2
    id=\"pep-723\">PEP 723 <a class=\"header-anchor\" href=\"#pep-723\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Python Enhancement Proposals
    (PEP) are the community's way of improving the\npython language and ecosystem
    and PEP 723 is one of my favorites. It permits\nadding python metadata right to
    your script which allows <code>python</code> to setup the\nscript's dependencies
    at runtime.</p>\n<h2 id=\"uv\">UV <a class=\"header-anchor\" href=\"#uv\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a class=\"wikilink\"
    href=\"/uv\">uv</a> makes it even better with it's super fast resolution and environment\nsetup.
    I don't have any posts about uv yet, but here's the\n<a href=\"https://docs.astral.sh/uv/getting-started/installation/\">docs</a>,
    installing\n<code>uv</code> is now apart of my dev-machine setup because I need
    it everywhere!</p>\n<h2 id=\"the-magic\">The Magic <a class=\"header-anchor\"
    href=\"#the-magic\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
    focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm experiencing the
    power of <code>uv run myscript.py</code> as I've integrated a python\nscript into
    my tmux workflow for managing sessions as well as groups of\ngit-worktrees to
    keep development-ideas contained, easy to find, and easy to\nmanage.</p>\n<div
    class=\"admonition warning\">\n<p class=\"admonition-title\">The Series</p>\n<p>This
    post is in my &quot;If You Want It Make It So&quot; series because of the workspaces
    thing generally, not the dbztui example below, but for me - having 'uv run' as
    a pretty powerful Bash replacement makes my development workflow easier to build
    on and manage</p>\n</div>\n<p>My <a href=\"https://pypeaday.github.io/dotfiles/terminal/workspaces/\">workspaces
    docs</a>\nexplain the setup a bit, and that script is in my\n<a href=\"https://github.com/pypeaday/dotfiles/blob/main/workspaces/.local/bin/ws.py\">dotfiles</a></p>\n<p>For
    a shorter example, here's an example that has regular <code>pip</code> style\ndependencies,
    a <code>git+https</code> dependency, and is a tui - not just a top to bottom\nscript</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">What is it?</p>\n<p>This
    is my DBZTUI script - it uses a beta package from Waylon called\nninesui and calls
    the dragonball-api to give you a handy way to explore the\nDragon Ball Universe
    from the glorious comfort of your terminal</p>\n</div>\n<p>Copy this code into
    <code>dbztui.py</code></p>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">Execution</p>\n<p>You
    can <code>chmod +x</code> this script with the shebang to tell your shell to use
    uv to run it or just <code>uv run dbztui.py</code> will also work just fine</p>\n</div>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/usr/bin/env
    -S uv run --quiet --script</span>\n<span class=\"c1\"># /// script</span>\n<span
    class=\"c1\"># requires-python = &quot;&gt;=3.10&quot;</span>\n<span class=\"c1\">#
    dependencies = [</span>\n<span class=\"c1\">#     &quot;ninesui @ git+https://github.com/waylonwalker/ninesui.git&quot;,</span>\n<span
    class=\"c1\">#     &quot;httpx&quot;,</span>\n<span class=\"c1\">#     &quot;deep-translator&quot;,</span>\n<span
    class=\"c1\"># ]</span>\n<span class=\"c1\"># ///</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Optional</span><span class=\"p\">,</span>
    <span class=\"n\">List</span><span class=\"p\">,</span> <span class=\"n\">TypeVar</span><span
    class=\"p\">,</span> <span class=\"n\">ClassVar</span><span class=\"p\">,</span>
    <span class=\"n\">Any</span><span class=\"p\">,</span> <span class=\"n\">Dict</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">pydantic</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">BaseModel</span><span
    class=\"p\">,</span> <span class=\"n\">Field</span><span class=\"p\">,</span>
    <span class=\"n\">HttpUrl</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">httpx</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">textual</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">log</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">ninesui</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">CommandSet</span><span class=\"p\">,</span> <span class=\"n\">Command</span><span
    class=\"p\">,</span> <span class=\"n\">NinesUI</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">functools</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">lru_cache</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">deep_translator</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">GoogleTranslator</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">json</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">os</span>\n\n<span
    class=\"n\">BASE_URL</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;https://dragonball-api.com/api/&quot;</span>\n\n<span
    class=\"c1\"># Translation cache file</span>\n<span class=\"n\">CACHE_DIR</span>
    <span class=\"o\">=</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">expanduser</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;~/.cache/dbztui&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">CACHE_FILE</span> <span class=\"o\">=</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">path</span><span
    class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">CACHE_DIR</span><span class=\"p\">,</span> <span class=\"s2\">&quot;translation_cache.json&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Create cache directory if it doesn&#39;t
    exist</span>\n<span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">makedirs</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_DIR</span><span class=\"p\">,</span>
    <span class=\"n\">exist_ok</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Load translation cache from file</span>\n<span
    class=\"n\">translation_cache</span><span class=\"p\">:</span> <span class=\"n\">Dict</span><span
    class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"p\">{}</span>\n<span class=\"k\">if</span> <span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">path</span><span class=\"o\">.</span><span
    class=\"n\">exists</span><span class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span
    class=\"p\">):</span>\n    <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \       <span class=\"k\">with</span> <span class=\"nb\">open</span><span class=\"p\">(</span><span
    class=\"n\">CACHE_FILE</span><span class=\"p\">,</span> <span class=\"s2\">&quot;r&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span> <span class=\"k\">as</span>
    <span class=\"n\">f</span><span class=\"p\">:</span>\n            <span class=\"n\">translation_cache</span>
    <span class=\"o\">=</span> <span class=\"n\">json</span><span class=\"o\">.</span><span
    class=\"n\">load</span><span class=\"p\">(</span><span class=\"n\">f</span><span
    class=\"p\">)</span>\n    <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \       <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error loading translation cache: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Initialize translator</span>\n<span
    class=\"n\">translator</span> <span class=\"o\">=</span> <span class=\"n\">GoogleTranslator</span><span
    class=\"p\">(</span><span class=\"n\">source</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;es&#39;</span><span class=\"p\">,</span> <span class=\"n\">target</span><span
    class=\"o\">=</span><span class=\"s1\">&#39;en&#39;</span><span class=\"p\">)</span>\n\n<span
    class=\"n\">T</span> <span class=\"o\">=</span> <span class=\"n\">TypeVar</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;T&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">bound</span><span class=\"o\">=</span><span class=\"s2\">&quot;DBZResource&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"nd\">@lru_cache</span><span class=\"p\">(</span><span
    class=\"n\">maxsize</span><span class=\"o\">=</span><span class=\"mi\">1000</span><span
    class=\"p\">)</span>\n<span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">translate_text</span><span class=\"p\">(</span><span class=\"n\">text</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">)</span> <span
    class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Translate text from
    Spanish to English with caching&quot;&quot;&quot;</span>\n    <span class=\"k\">if</span>
    <span class=\"ow\">not</span> <span class=\"n\">text</span> <span class=\"ow\">or</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">text</span><span
    class=\"p\">)</span> <span class=\"o\">&lt;</span> <span class=\"mi\">5</span><span
    class=\"p\">:</span>  <span class=\"c1\"># Don&#39;t translate very short texts</span>\n
    \       <span class=\"k\">return</span> <span class=\"n\">text</span>\n\n    <span
    class=\"c1\"># Check if translation is in cache</span>\n    <span class=\"k\">if</span>
    <span class=\"n\">text</span> <span class=\"ow\">in</span> <span class=\"n\">translation_cache</span><span
    class=\"p\">:</span>\n        <span class=\"k\">return</span> <span class=\"n\">translation_cache</span><span
    class=\"p\">[</span><span class=\"n\">text</span><span class=\"p\">]</span>\n\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"c1\">#
    Translate text</span>\n        <span class=\"n\">translated</span> <span class=\"o\">=</span>
    <span class=\"n\">translator</span><span class=\"o\">.</span><span class=\"n\">translate</span><span
    class=\"p\">(</span><span class=\"n\">text</span><span class=\"p\">)</span>\n\n
    \       <span class=\"c1\"># Save to cache</span>\n        <span class=\"n\">translation_cache</span><span
    class=\"p\">[</span><span class=\"n\">text</span><span class=\"p\">]</span> <span
    class=\"o\">=</span> <span class=\"n\">translated</span>\n\n        <span class=\"c1\">#
    Periodically save cache to file</span>\n        <span class=\"k\">if</span> <span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">translation_cache</span><span
    class=\"p\">)</span> <span class=\"o\">%</span> <span class=\"mi\">10</span> <span
    class=\"o\">==</span> <span class=\"mi\">0</span><span class=\"p\">:</span>  <span
    class=\"c1\"># Save every 10 new translations</span>\n            <span class=\"k\">try</span><span
    class=\"p\">:</span>\n                <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span> <span class=\"n\">encoding</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span>
    <span class=\"k\">as</span> <span class=\"n\">f</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">json</span><span class=\"o\">.</span><span
    class=\"n\">dump</span><span class=\"p\">(</span><span class=\"n\">translation_cache</span><span
    class=\"p\">,</span> <span class=\"n\">f</span><span class=\"p\">,</span> <span
    class=\"n\">ensure_ascii</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"n\">indent</span><span class=\"o\">=</span><span
    class=\"mi\">2</span><span class=\"p\">)</span>\n            <span class=\"k\">except</span>
    <span class=\"ne\">Exception</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n                <span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Error saving translation cache:
    </span><span class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n\n        <span class=\"k\">return</span>
    <span class=\"n\">translated</span>\n    <span class=\"k\">except</span> <span
    class=\"ne\">Exception</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n        <span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Translation error: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n        <span class=\"k\">return</span>
    <span class=\"n\">text</span>  <span class=\"c1\"># Return original text if translation
    fails</span>\n\n\n<span class=\"k\">class</span><span class=\"w\"> </span><span
    class=\"nc\">DBZResource</span><span class=\"p\">(</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n    <span class=\"nb\">id</span><span class=\"p\">:</span>
    <span class=\"nb\">int</span>\n\n    <span class=\"n\">nines_config</span><span
    class=\"p\">:</span> <span class=\"n\">ClassVar</span><span class=\"p\">[</span><span
    class=\"nb\">dict</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;bindings&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{}}</span>\n\n    <span class=\"nd\">@classmethod</span>\n
    \   <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">fetch</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">,</span> <span
    class=\"n\">ctx</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">):</span>\n        <span class=\"n\">endpoint</span> <span class=\"o\">=</span>
    <span class=\"bp\">cls</span><span class=\"o\">.</span><span class=\"vm\">__name__</span><span
    class=\"o\">.</span><span class=\"n\">lower</span><span class=\"p\">()</span>
    <span class=\"o\">+</span> <span class=\"s2\">&quot;s&quot;</span>\n\n        <span
    class=\"n\">client</span> <span class=\"o\">=</span> <span class=\"n\">httpx</span><span
    class=\"o\">.</span><span class=\"n\">Client</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Fetching </span><span class=\"si\">{</span><span class=\"n\">endpoint</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n\n
    \       <span class=\"k\">if</span> <span class=\"n\">ctx</span><span class=\"p\">:</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">ctx</span><span class=\"p\">,</span> <span
    class=\"n\">endpoint</span><span class=\"p\">):</span>\n                <span
    class=\"n\">result</span> <span class=\"o\">=</span> <span class=\"p\">[]</span>\n
    \               <span class=\"k\">for</span> <span class=\"n\">url</span> <span
    class=\"ow\">in</span> <span class=\"nb\">getattr</span><span class=\"p\">(</span><span
    class=\"n\">ctx</span><span class=\"p\">,</span> <span class=\"n\">endpoint</span><span
    class=\"p\">):</span>\n                    <span class=\"n\">res</span> <span
    class=\"o\">=</span> <span class=\"n\">client</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"nb\">str</span><span
    class=\"p\">(</span><span class=\"n\">url</span><span class=\"p\">))</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \                   <span class=\"n\">result</span><span class=\"o\">.</span><span
    class=\"n\">append</span><span class=\"p\">(</span><span class=\"bp\">cls</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">res</span><span
    class=\"p\">))</span>\n                <span class=\"k\">return</span> <span class=\"n\">result</span>\n\n
    \       <span class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}{</span><span class=\"n\">endpoint</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n\n        <span class=\"n\">results</span><span class=\"p\">:</span>
    <span class=\"n\">List</span><span class=\"p\">[</span><span class=\"n\">T</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"p\">[]</span>\n
    \       <span class=\"n\">response</span> <span class=\"o\">=</span> <span class=\"n\">client</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"n\">url</span><span class=\"p\">)</span>\n        <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n\n
    \       <span class=\"c1\"># Handle pagination structure from Dragon Ball API</span>\n
    \       <span class=\"k\">if</span> <span class=\"s2\">&quot;items&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">results</span><span class=\"o\">.</span><span class=\"n\">extend</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">(</span><span
    class=\"o\">**</span><span class=\"n\">item</span><span class=\"p\">)</span> <span
    class=\"k\">for</span> <span class=\"n\">item</span> <span class=\"ow\">in</span>
    <span class=\"n\">data</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;items&quot;</span><span class=\"p\">,</span>
    <span class=\"p\">[]))</span>\n\n            <span class=\"c1\"># Fetch all pages
    if needed</span>\n            <span class=\"k\">while</span> <span class=\"n\">data</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;links&quot;</span><span class=\"p\">,</span> <span class=\"p\">{})</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;next&quot;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">next_url</span> <span class=\"o\">=</span> <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;links&quot;</span><span class=\"p\">][</span><span
    class=\"s2\">&quot;next&quot;</span><span class=\"p\">]</span>\n                <span
    class=\"n\">response</span> <span class=\"o\">=</span> <span class=\"n\">client</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"n\">next_url</span><span class=\"p\">)</span>\n                <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \               <span class=\"n\">data</span> <span class=\"o\">=</span> <span
    class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">json</span><span
    class=\"p\">()</span>\n                <span class=\"n\">results</span><span class=\"o\">.</span><span
    class=\"n\">extend</span><span class=\"p\">(</span><span class=\"bp\">cls</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">item</span><span
    class=\"p\">)</span> <span class=\"k\">for</span> <span class=\"n\">item</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;items&quot;</span><span
    class=\"p\">,</span> <span class=\"p\">[]))</span>\n        <span class=\"k\">else</span><span
    class=\"p\">:</span>\n            <span class=\"c1\"># Direct list of items</span>\n
    \           <span class=\"n\">results</span><span class=\"o\">.</span><span class=\"n\">extend</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">(</span><span
    class=\"o\">**</span><span class=\"n\">item</span><span class=\"p\">)</span> <span
    class=\"k\">for</span> <span class=\"n\">item</span> <span class=\"ow\">in</span>
    <span class=\"n\">data</span><span class=\"p\">)</span>\n\n        <span class=\"k\">return</span>
    <span class=\"n\">results</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"nf\">hover</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>\n        <span class=\"k\">return</span> <span class=\"bp\">self</span>\n\n
    \   <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">get_details</span><span
    class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>\n<span
    class=\"w\">        </span><span class=\"sd\">&quot;&quot;&quot;Get detailed information
    about this resource&quot;&quot;&quot;</span>\n        <span class=\"n\">client</span>
    <span class=\"o\">=</span> <span class=\"n\">httpx</span><span class=\"o\">.</span><span
    class=\"n\">Client</span><span class=\"p\">()</span>\n        <span class=\"n\">endpoint</span>
    <span class=\"o\">=</span> <span class=\"bp\">self</span><span class=\"o\">.</span><span
    class=\"vm\">__class__</span><span class=\"o\">.</span><span class=\"vm\">__name__</span><span
    class=\"o\">.</span><span class=\"n\">lower</span><span class=\"p\">()</span>
    <span class=\"o\">+</span> <span class=\"s2\">&quot;s&quot;</span>\n        <span
    class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}{</span><span class=\"n\">endpoint</span><span class=\"si\">}</span><span
    class=\"s2\">/</span><span class=\"si\">{</span><span class=\"bp\">self</span><span
    class=\"o\">.</span><span class=\"n\">id</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n        <span class=\"n\">response</span> <span class=\"o\">=</span>
    <span class=\"n\">client</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"n\">url</span><span class=\"p\">)</span>\n        <span
    class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">raise_for_status</span><span
    class=\"p\">()</span>\n        <span class=\"n\">data</span> <span class=\"o\">=</span>
    <span class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">json</span><span
    class=\"p\">()</span>\n\n        <span class=\"c1\"># Translate description if
    present</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n\n
    \       <span class=\"k\">return</span> <span class=\"bp\">self</span><span class=\"o\">.</span><span
    class=\"vm\">__class__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">Character</span><span class=\"p\">(</span><span
    class=\"n\">DBZResource</span><span class=\"p\">):</span>\n    <span class=\"n\">name</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">ki</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">maxKi</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">race</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">gender</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">description</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">image</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"n\">HttpUrl</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"kc\">None</span>\n    <span class=\"n\">affiliation</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">,</span> <span class=\"o\">**</span><span class=\"n\">data</span><span
    class=\"p\">):</span>\n        <span class=\"c1\"># Translate description before
    initializing</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n
    \       <span class=\"nb\">super</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n    <span class=\"n\">nines_config</span><span
    class=\"p\">:</span> <span class=\"n\">ClassVar</span><span class=\"p\">[</span><span
    class=\"nb\">dict</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;bindings&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span><span class=\"s2\">&quot;t&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;get_transformations&quot;</span><span
    class=\"p\">}}</span>\n\n    <span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">get_transformations</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>\n<span class=\"w\">        </span><span class=\"sd\">&quot;&quot;&quot;Get
    all transformations for this character&quot;&quot;&quot;</span>\n        <span
    class=\"n\">client</span> <span class=\"o\">=</span> <span class=\"n\">httpx</span><span
    class=\"o\">.</span><span class=\"n\">Client</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}</span><span class=\"s2\">characters/</span><span class=\"si\">{</span><span
    class=\"bp\">self</span><span class=\"o\">.</span><span class=\"n\">id</span><span
    class=\"si\">}</span><span class=\"s2\">/transformations&quot;</span>\n        <span
    class=\"k\">try</span><span class=\"p\">:</span>\n            <span class=\"n\">response</span>
    <span class=\"o\">=</span> <span class=\"n\">client</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"n\">url</span><span
    class=\"p\">)</span>\n            <span class=\"n\">response</span><span class=\"o\">.</span><span
    class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n            <span
    class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \           <span class=\"k\">if</span> <span class=\"s2\">&quot;items&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">:</span>\n
    \               <span class=\"k\">return</span> <span class=\"p\">[</span><span
    class=\"n\">Transformation</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">item</span><span class=\"p\">)</span> <span class=\"k\">for</span>
    <span class=\"n\">item</span> <span class=\"ow\">in</span> <span class=\"n\">data</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;items&quot;</span><span class=\"p\">,</span> <span class=\"p\">[])]</span>\n
    \           <span class=\"k\">return</span> <span class=\"p\">[</span><span class=\"n\">Transformation</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">item</span><span
    class=\"p\">)</span> <span class=\"k\">for</span> <span class=\"n\">item</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">]</span>\n
    \       <span class=\"k\">except</span> <span class=\"ne\">Exception</span> <span
    class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n            <span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error fetching transformations: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n            <span class=\"k\">return</span> <span class=\"p\">[]</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Transformation</span><span
    class=\"p\">(</span><span class=\"n\">DBZResource</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">name</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">image</span><span class=\"p\">:</span> <span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"n\">HttpUrl</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n    <span class=\"n\">ki</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">characterId</span><span
    class=\"p\">:</span> <span class=\"nb\">int</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"c1\"># Note: This is not a direct
    API endpoint, but accessed through character transformations</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Planet</span><span
    class=\"p\">(</span><span class=\"n\">DBZResource</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">name</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">description</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">image</span><span class=\"p\">:</span> <span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"n\">HttpUrl</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">,</span> <span class=\"o\">**</span><span class=\"n\">data</span><span
    class=\"p\">):</span>\n        <span class=\"c1\"># Translate description before
    initializing</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n
    \       <span class=\"nb\">super</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n\n<span class=\"c1\"># Note:
    Saga and Episode models removed as they are not supported by the API</span>\n\n\n<span
    class=\"n\">commands</span> <span class=\"o\">=</span> <span class=\"n\">CommandSet</span><span
    class=\"p\">(</span>\n    <span class=\"p\">[</span>\n        <span class=\"n\">Command</span><span
    class=\"p\">(</span>\n            <span class=\"n\">name</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;character&quot;</span><span class=\"p\">,</span>\n            <span
    class=\"n\">aliases</span><span class=\"o\">=</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;c&quot;</span><span class=\"p\">],</span>\n            <span
    class=\"n\">model</span><span class=\"o\">=</span><span class=\"n\">Character</span><span
    class=\"p\">,</span>\n            <span class=\"n\">is_default</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"p\">),</span>\n
    \       <span class=\"n\">Command</span><span class=\"p\">(</span>\n            <span
    class=\"n\">name</span><span class=\"o\">=</span><span class=\"s2\">&quot;planet&quot;</span><span
    class=\"p\">,</span>\n            <span class=\"n\">aliases</span><span class=\"o\">=</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;p&quot;</span><span class=\"p\">],</span>\n
    \           <span class=\"n\">model</span><span class=\"o\">=</span><span class=\"n\">Planet</span><span
    class=\"p\">,</span>\n        <span class=\"p\">),</span>\n        <span class=\"c1\">#
    Note: Transformation is not a direct API endpoint, but can be accessed through
    characters</span>\n    <span class=\"p\">]</span>\n<span class=\"p\">)</span>\n\n<span
    class=\"n\">metadata</span> <span class=\"o\">=</span> <span class=\"p\">{</span>\n
    \   <span class=\"s2\">&quot;title&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;Dragon Ball Z Explorer&quot;</span><span class=\"p\">,</span>\n
    \   <span class=\"s2\">&quot;subtitle&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;Use :character or :planet to explore. Enter to drill in. Escape
    to go back/quit.&quot;</span><span class=\"p\">,</span>\n<span class=\"p\">}</span>\n\n\n<span
    class=\"k\">if</span> <span class=\"vm\">__name__</span> <span class=\"o\">==</span>
    <span class=\"s2\">&quot;__main__&quot;</span><span class=\"p\">:</span>\n    <span
    class=\"n\">ui</span> <span class=\"o\">=</span> <span class=\"n\">NinesUI</span><span
    class=\"p\">(</span><span class=\"n\">metadata</span><span class=\"o\">=</span><span
    class=\"n\">metadata</span><span class=\"p\">,</span> <span class=\"n\">commands</span><span
    class=\"o\">=</span><span class=\"n\">commands</span><span class=\"p\">)</span>\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">ui</span><span
    class=\"o\">.</span><span class=\"n\">run</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">finally</span><span class=\"p\">:</span>\n        <span
    class=\"c1\"># Save translation cache when exiting</span>\n        <span class=\"k\">try</span><span
    class=\"p\">:</span>\n            <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span> <span class=\"n\">encoding</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span>
    <span class=\"k\">as</span> <span class=\"n\">f</span><span class=\"p\">:</span>\n
    \               <span class=\"n\">json</span><span class=\"o\">.</span><span class=\"n\">dump</span><span
    class=\"p\">(</span><span class=\"n\">translation_cache</span><span class=\"p\">,</span>
    <span class=\"n\">f</span><span class=\"p\">,</span> <span class=\"n\">ensure_ascii</span><span
    class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span>
    <span class=\"n\">indent</span><span class=\"o\">=</span><span class=\"mi\">2</span><span
    class=\"p\">)</span>\n        <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error saving translation cache on exit: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208111354_0ae058e5.png\"
    alt=\"20251208111354_0ae058e5.png\" /></p>\n<blockquote>\n<p>See <a class=\"wikilink\"
    href=\"/columns-env-var-for-nicer-screenshots\">columns-env-var-for-nicer-screenshots</a>
    about making terminal screenshots a bit nicer</p>\n</blockquote>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>UV Run + PEP 723 Is
    A Match Made In Heaven</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"This post will be short but hopefully be a dense few paragraphs about
    how using\n`uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/)
    is\nlife-\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"UV Run + PEP 723 Is A Match Made In Heaven | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/uv-run-pep-723-is-a-match-made-in-heaven\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"UV Run + PEP 723 Is A Match Made In Heaven | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"This post will be short but hopefully be a dense few paragraphs about
    how using\n`uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/)
    is\nlife-\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<article style=\"text-align:
    center;\">\n    <style>\n        section {\n            font-size: 200%;\n        }\n\n\n
    \       .edit {\n            display: none;\n        }\n    </style>\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">UV Run + PEP 723 Is A Match Made In Heaven</h1>\n    <div
    class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-12-08\">\n
    \           December 08, 2025\n        </time>\n    </div>\n    <div class=\"flex
    flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/series-if-you-want-it-make-it-so/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #series-if-you-want-it-make-it-so\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\"
    alt=\"UV Run + PEP 723 Is A Match Made In Heaven cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">UV
    Run + PEP 723 Is A Match Made In Heaven</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-12-08\">\n            December
    08, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/series-if-you-want-it-make-it-so/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #series-if-you-want-it-make-it-so\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>This post will be short but hopefully
    be a dense few paragraphs about how using\n<code>uv run foo.py</code> along with
    <a href=\"https://peps.python.org/pep-0723/\">PEP 723</a> is\nlife-changing.</p>\n<h2
    id=\"pep-723\">PEP 723 <a class=\"header-anchor\" href=\"#pep-723\"><svg class=\"heading-permalink\"
    aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\" height=\"1em\"
    viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Python Enhancement Proposals
    (PEP) are the community's way of improving the\npython language and ecosystem
    and PEP 723 is one of my favorites. It permits\nadding python metadata right to
    your script which allows <code>python</code> to setup the\nscript's dependencies
    at runtime.</p>\n<h2 id=\"uv\">UV <a class=\"header-anchor\" href=\"#uv\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a class=\"wikilink\"
    href=\"/uv\">uv</a> makes it even better with it's super fast resolution and environment\nsetup.
    I don't have any posts about uv yet, but here's the\n<a href=\"https://docs.astral.sh/uv/getting-started/installation/\">docs</a>,
    installing\n<code>uv</code> is now apart of my dev-machine setup because I need
    it everywhere!</p>\n<h2 id=\"the-magic\">The Magic <a class=\"header-anchor\"
    href=\"#the-magic\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
    focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm experiencing the
    power of <code>uv run myscript.py</code> as I've integrated a python\nscript into
    my tmux workflow for managing sessions as well as groups of\ngit-worktrees to
    keep development-ideas contained, easy to find, and easy to\nmanage.</p>\n<div
    class=\"admonition warning\">\n<p class=\"admonition-title\">The Series</p>\n<p>This
    post is in my &quot;If You Want It Make It So&quot; series because of the workspaces
    thing generally, not the dbztui example below, but for me - having 'uv run' as
    a pretty powerful Bash replacement makes my development workflow easier to build
    on and manage</p>\n</div>\n<p>My <a href=\"https://pypeaday.github.io/dotfiles/terminal/workspaces/\">workspaces
    docs</a>\nexplain the setup a bit, and that script is in my\n<a href=\"https://github.com/pypeaday/dotfiles/blob/main/workspaces/.local/bin/ws.py\">dotfiles</a></p>\n<p>For
    a shorter example, here's an example that has regular <code>pip</code> style\ndependencies,
    a <code>git+https</code> dependency, and is a tui - not just a top to bottom\nscript</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">What is it?</p>\n<p>This
    is my DBZTUI script - it uses a beta package from Waylon called\nninesui and calls
    the dragonball-api to give you a handy way to explore the\nDragon Ball Universe
    from the glorious comfort of your terminal</p>\n</div>\n<p>Copy this code into
    <code>dbztui.py</code></p>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">Execution</p>\n<p>You
    can <code>chmod +x</code> this script with the shebang to tell your shell to use
    uv to run it or just <code>uv run dbztui.py</code> will also work just fine</p>\n</div>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/usr/bin/env
    -S uv run --quiet --script</span>\n<span class=\"c1\"># /// script</span>\n<span
    class=\"c1\"># requires-python = &quot;&gt;=3.10&quot;</span>\n<span class=\"c1\">#
    dependencies = [</span>\n<span class=\"c1\">#     &quot;ninesui @ git+https://github.com/waylonwalker/ninesui.git&quot;,</span>\n<span
    class=\"c1\">#     &quot;httpx&quot;,</span>\n<span class=\"c1\">#     &quot;deep-translator&quot;,</span>\n<span
    class=\"c1\"># ]</span>\n<span class=\"c1\"># ///</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Optional</span><span class=\"p\">,</span>
    <span class=\"n\">List</span><span class=\"p\">,</span> <span class=\"n\">TypeVar</span><span
    class=\"p\">,</span> <span class=\"n\">ClassVar</span><span class=\"p\">,</span>
    <span class=\"n\">Any</span><span class=\"p\">,</span> <span class=\"n\">Dict</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">pydantic</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">BaseModel</span><span
    class=\"p\">,</span> <span class=\"n\">Field</span><span class=\"p\">,</span>
    <span class=\"n\">HttpUrl</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">httpx</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">textual</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">log</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">ninesui</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">CommandSet</span><span class=\"p\">,</span> <span class=\"n\">Command</span><span
    class=\"p\">,</span> <span class=\"n\">NinesUI</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">functools</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">lru_cache</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">deep_translator</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">GoogleTranslator</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">json</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">os</span>\n\n<span
    class=\"n\">BASE_URL</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;https://dragonball-api.com/api/&quot;</span>\n\n<span
    class=\"c1\"># Translation cache file</span>\n<span class=\"n\">CACHE_DIR</span>
    <span class=\"o\">=</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">expanduser</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;~/.cache/dbztui&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">CACHE_FILE</span> <span class=\"o\">=</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">path</span><span
    class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">CACHE_DIR</span><span class=\"p\">,</span> <span class=\"s2\">&quot;translation_cache.json&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Create cache directory if it doesn&#39;t
    exist</span>\n<span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">makedirs</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_DIR</span><span class=\"p\">,</span>
    <span class=\"n\">exist_ok</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Load translation cache from file</span>\n<span
    class=\"n\">translation_cache</span><span class=\"p\">:</span> <span class=\"n\">Dict</span><span
    class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"p\">{}</span>\n<span class=\"k\">if</span> <span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">path</span><span class=\"o\">.</span><span
    class=\"n\">exists</span><span class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span
    class=\"p\">):</span>\n    <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \       <span class=\"k\">with</span> <span class=\"nb\">open</span><span class=\"p\">(</span><span
    class=\"n\">CACHE_FILE</span><span class=\"p\">,</span> <span class=\"s2\">&quot;r&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span> <span class=\"k\">as</span>
    <span class=\"n\">f</span><span class=\"p\">:</span>\n            <span class=\"n\">translation_cache</span>
    <span class=\"o\">=</span> <span class=\"n\">json</span><span class=\"o\">.</span><span
    class=\"n\">load</span><span class=\"p\">(</span><span class=\"n\">f</span><span
    class=\"p\">)</span>\n    <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \       <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error loading translation cache: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Initialize translator</span>\n<span
    class=\"n\">translator</span> <span class=\"o\">=</span> <span class=\"n\">GoogleTranslator</span><span
    class=\"p\">(</span><span class=\"n\">source</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;es&#39;</span><span class=\"p\">,</span> <span class=\"n\">target</span><span
    class=\"o\">=</span><span class=\"s1\">&#39;en&#39;</span><span class=\"p\">)</span>\n\n<span
    class=\"n\">T</span> <span class=\"o\">=</span> <span class=\"n\">TypeVar</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;T&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">bound</span><span class=\"o\">=</span><span class=\"s2\">&quot;DBZResource&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"nd\">@lru_cache</span><span class=\"p\">(</span><span
    class=\"n\">maxsize</span><span class=\"o\">=</span><span class=\"mi\">1000</span><span
    class=\"p\">)</span>\n<span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">translate_text</span><span class=\"p\">(</span><span class=\"n\">text</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">)</span> <span
    class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Translate text from
    Spanish to English with caching&quot;&quot;&quot;</span>\n    <span class=\"k\">if</span>
    <span class=\"ow\">not</span> <span class=\"n\">text</span> <span class=\"ow\">or</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">text</span><span
    class=\"p\">)</span> <span class=\"o\">&lt;</span> <span class=\"mi\">5</span><span
    class=\"p\">:</span>  <span class=\"c1\"># Don&#39;t translate very short texts</span>\n
    \       <span class=\"k\">return</span> <span class=\"n\">text</span>\n\n    <span
    class=\"c1\"># Check if translation is in cache</span>\n    <span class=\"k\">if</span>
    <span class=\"n\">text</span> <span class=\"ow\">in</span> <span class=\"n\">translation_cache</span><span
    class=\"p\">:</span>\n        <span class=\"k\">return</span> <span class=\"n\">translation_cache</span><span
    class=\"p\">[</span><span class=\"n\">text</span><span class=\"p\">]</span>\n\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"c1\">#
    Translate text</span>\n        <span class=\"n\">translated</span> <span class=\"o\">=</span>
    <span class=\"n\">translator</span><span class=\"o\">.</span><span class=\"n\">translate</span><span
    class=\"p\">(</span><span class=\"n\">text</span><span class=\"p\">)</span>\n\n
    \       <span class=\"c1\"># Save to cache</span>\n        <span class=\"n\">translation_cache</span><span
    class=\"p\">[</span><span class=\"n\">text</span><span class=\"p\">]</span> <span
    class=\"o\">=</span> <span class=\"n\">translated</span>\n\n        <span class=\"c1\">#
    Periodically save cache to file</span>\n        <span class=\"k\">if</span> <span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">translation_cache</span><span
    class=\"p\">)</span> <span class=\"o\">%</span> <span class=\"mi\">10</span> <span
    class=\"o\">==</span> <span class=\"mi\">0</span><span class=\"p\">:</span>  <span
    class=\"c1\"># Save every 10 new translations</span>\n            <span class=\"k\">try</span><span
    class=\"p\">:</span>\n                <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span> <span class=\"n\">encoding</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span>
    <span class=\"k\">as</span> <span class=\"n\">f</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">json</span><span class=\"o\">.</span><span
    class=\"n\">dump</span><span class=\"p\">(</span><span class=\"n\">translation_cache</span><span
    class=\"p\">,</span> <span class=\"n\">f</span><span class=\"p\">,</span> <span
    class=\"n\">ensure_ascii</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"n\">indent</span><span class=\"o\">=</span><span
    class=\"mi\">2</span><span class=\"p\">)</span>\n            <span class=\"k\">except</span>
    <span class=\"ne\">Exception</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n                <span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Error saving translation cache:
    </span><span class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n\n        <span class=\"k\">return</span>
    <span class=\"n\">translated</span>\n    <span class=\"k\">except</span> <span
    class=\"ne\">Exception</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n        <span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Translation error: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n        <span class=\"k\">return</span>
    <span class=\"n\">text</span>  <span class=\"c1\"># Return original text if translation
    fails</span>\n\n\n<span class=\"k\">class</span><span class=\"w\"> </span><span
    class=\"nc\">DBZResource</span><span class=\"p\">(</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n    <span class=\"nb\">id</span><span class=\"p\">:</span>
    <span class=\"nb\">int</span>\n\n    <span class=\"n\">nines_config</span><span
    class=\"p\">:</span> <span class=\"n\">ClassVar</span><span class=\"p\">[</span><span
    class=\"nb\">dict</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;bindings&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{}}</span>\n\n    <span class=\"nd\">@classmethod</span>\n
    \   <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">fetch</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">,</span> <span
    class=\"n\">ctx</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">):</span>\n        <span class=\"n\">endpoint</span> <span class=\"o\">=</span>
    <span class=\"bp\">cls</span><span class=\"o\">.</span><span class=\"vm\">__name__</span><span
    class=\"o\">.</span><span class=\"n\">lower</span><span class=\"p\">()</span>
    <span class=\"o\">+</span> <span class=\"s2\">&quot;s&quot;</span>\n\n        <span
    class=\"n\">client</span> <span class=\"o\">=</span> <span class=\"n\">httpx</span><span
    class=\"o\">.</span><span class=\"n\">Client</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Fetching </span><span class=\"si\">{</span><span class=\"n\">endpoint</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n\n
    \       <span class=\"k\">if</span> <span class=\"n\">ctx</span><span class=\"p\">:</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">ctx</span><span class=\"p\">,</span> <span
    class=\"n\">endpoint</span><span class=\"p\">):</span>\n                <span
    class=\"n\">result</span> <span class=\"o\">=</span> <span class=\"p\">[]</span>\n
    \               <span class=\"k\">for</span> <span class=\"n\">url</span> <span
    class=\"ow\">in</span> <span class=\"nb\">getattr</span><span class=\"p\">(</span><span
    class=\"n\">ctx</span><span class=\"p\">,</span> <span class=\"n\">endpoint</span><span
    class=\"p\">):</span>\n                    <span class=\"n\">res</span> <span
    class=\"o\">=</span> <span class=\"n\">client</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"nb\">str</span><span
    class=\"p\">(</span><span class=\"n\">url</span><span class=\"p\">))</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \                   <span class=\"n\">result</span><span class=\"o\">.</span><span
    class=\"n\">append</span><span class=\"p\">(</span><span class=\"bp\">cls</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">res</span><span
    class=\"p\">))</span>\n                <span class=\"k\">return</span> <span class=\"n\">result</span>\n\n
    \       <span class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}{</span><span class=\"n\">endpoint</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n\n        <span class=\"n\">results</span><span class=\"p\">:</span>
    <span class=\"n\">List</span><span class=\"p\">[</span><span class=\"n\">T</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"p\">[]</span>\n
    \       <span class=\"n\">response</span> <span class=\"o\">=</span> <span class=\"n\">client</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"n\">url</span><span class=\"p\">)</span>\n        <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n\n
    \       <span class=\"c1\"># Handle pagination structure from Dragon Ball API</span>\n
    \       <span class=\"k\">if</span> <span class=\"s2\">&quot;items&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">results</span><span class=\"o\">.</span><span class=\"n\">extend</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">(</span><span
    class=\"o\">**</span><span class=\"n\">item</span><span class=\"p\">)</span> <span
    class=\"k\">for</span> <span class=\"n\">item</span> <span class=\"ow\">in</span>
    <span class=\"n\">data</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;items&quot;</span><span class=\"p\">,</span>
    <span class=\"p\">[]))</span>\n\n            <span class=\"c1\"># Fetch all pages
    if needed</span>\n            <span class=\"k\">while</span> <span class=\"n\">data</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;links&quot;</span><span class=\"p\">,</span> <span class=\"p\">{})</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;next&quot;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">next_url</span> <span class=\"o\">=</span> <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;links&quot;</span><span class=\"p\">][</span><span
    class=\"s2\">&quot;next&quot;</span><span class=\"p\">]</span>\n                <span
    class=\"n\">response</span> <span class=\"o\">=</span> <span class=\"n\">client</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"n\">next_url</span><span class=\"p\">)</span>\n                <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \               <span class=\"n\">data</span> <span class=\"o\">=</span> <span
    class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">json</span><span
    class=\"p\">()</span>\n                <span class=\"n\">results</span><span class=\"o\">.</span><span
    class=\"n\">extend</span><span class=\"p\">(</span><span class=\"bp\">cls</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">item</span><span
    class=\"p\">)</span> <span class=\"k\">for</span> <span class=\"n\">item</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;items&quot;</span><span
    class=\"p\">,</span> <span class=\"p\">[]))</span>\n        <span class=\"k\">else</span><span
    class=\"p\">:</span>\n            <span class=\"c1\"># Direct list of items</span>\n
    \           <span class=\"n\">results</span><span class=\"o\">.</span><span class=\"n\">extend</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">(</span><span
    class=\"o\">**</span><span class=\"n\">item</span><span class=\"p\">)</span> <span
    class=\"k\">for</span> <span class=\"n\">item</span> <span class=\"ow\">in</span>
    <span class=\"n\">data</span><span class=\"p\">)</span>\n\n        <span class=\"k\">return</span>
    <span class=\"n\">results</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"nf\">hover</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>\n        <span class=\"k\">return</span> <span class=\"bp\">self</span>\n\n
    \   <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">get_details</span><span
    class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>\n<span
    class=\"w\">        </span><span class=\"sd\">&quot;&quot;&quot;Get detailed information
    about this resource&quot;&quot;&quot;</span>\n        <span class=\"n\">client</span>
    <span class=\"o\">=</span> <span class=\"n\">httpx</span><span class=\"o\">.</span><span
    class=\"n\">Client</span><span class=\"p\">()</span>\n        <span class=\"n\">endpoint</span>
    <span class=\"o\">=</span> <span class=\"bp\">self</span><span class=\"o\">.</span><span
    class=\"vm\">__class__</span><span class=\"o\">.</span><span class=\"vm\">__name__</span><span
    class=\"o\">.</span><span class=\"n\">lower</span><span class=\"p\">()</span>
    <span class=\"o\">+</span> <span class=\"s2\">&quot;s&quot;</span>\n        <span
    class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}{</span><span class=\"n\">endpoint</span><span class=\"si\">}</span><span
    class=\"s2\">/</span><span class=\"si\">{</span><span class=\"bp\">self</span><span
    class=\"o\">.</span><span class=\"n\">id</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n        <span class=\"n\">response</span> <span class=\"o\">=</span>
    <span class=\"n\">client</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"n\">url</span><span class=\"p\">)</span>\n        <span
    class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">raise_for_status</span><span
    class=\"p\">()</span>\n        <span class=\"n\">data</span> <span class=\"o\">=</span>
    <span class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">json</span><span
    class=\"p\">()</span>\n\n        <span class=\"c1\"># Translate description if
    present</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n\n
    \       <span class=\"k\">return</span> <span class=\"bp\">self</span><span class=\"o\">.</span><span
    class=\"vm\">__class__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">Character</span><span class=\"p\">(</span><span
    class=\"n\">DBZResource</span><span class=\"p\">):</span>\n    <span class=\"n\">name</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">ki</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">maxKi</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">race</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">gender</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">description</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">image</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"n\">HttpUrl</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"kc\">None</span>\n    <span class=\"n\">affiliation</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">,</span> <span class=\"o\">**</span><span class=\"n\">data</span><span
    class=\"p\">):</span>\n        <span class=\"c1\"># Translate description before
    initializing</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n
    \       <span class=\"nb\">super</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n    <span class=\"n\">nines_config</span><span
    class=\"p\">:</span> <span class=\"n\">ClassVar</span><span class=\"p\">[</span><span
    class=\"nb\">dict</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;bindings&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span><span class=\"s2\">&quot;t&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;get_transformations&quot;</span><span
    class=\"p\">}}</span>\n\n    <span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">get_transformations</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>\n<span class=\"w\">        </span><span class=\"sd\">&quot;&quot;&quot;Get
    all transformations for this character&quot;&quot;&quot;</span>\n        <span
    class=\"n\">client</span> <span class=\"o\">=</span> <span class=\"n\">httpx</span><span
    class=\"o\">.</span><span class=\"n\">Client</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}</span><span class=\"s2\">characters/</span><span class=\"si\">{</span><span
    class=\"bp\">self</span><span class=\"o\">.</span><span class=\"n\">id</span><span
    class=\"si\">}</span><span class=\"s2\">/transformations&quot;</span>\n        <span
    class=\"k\">try</span><span class=\"p\">:</span>\n            <span class=\"n\">response</span>
    <span class=\"o\">=</span> <span class=\"n\">client</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"n\">url</span><span
    class=\"p\">)</span>\n            <span class=\"n\">response</span><span class=\"o\">.</span><span
    class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n            <span
    class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \           <span class=\"k\">if</span> <span class=\"s2\">&quot;items&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">:</span>\n
    \               <span class=\"k\">return</span> <span class=\"p\">[</span><span
    class=\"n\">Transformation</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">item</span><span class=\"p\">)</span> <span class=\"k\">for</span>
    <span class=\"n\">item</span> <span class=\"ow\">in</span> <span class=\"n\">data</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;items&quot;</span><span class=\"p\">,</span> <span class=\"p\">[])]</span>\n
    \           <span class=\"k\">return</span> <span class=\"p\">[</span><span class=\"n\">Transformation</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">item</span><span
    class=\"p\">)</span> <span class=\"k\">for</span> <span class=\"n\">item</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">]</span>\n
    \       <span class=\"k\">except</span> <span class=\"ne\">Exception</span> <span
    class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n            <span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error fetching transformations: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n            <span class=\"k\">return</span> <span class=\"p\">[]</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Transformation</span><span
    class=\"p\">(</span><span class=\"n\">DBZResource</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">name</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">image</span><span class=\"p\">:</span> <span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"n\">HttpUrl</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n    <span class=\"n\">ki</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">characterId</span><span
    class=\"p\">:</span> <span class=\"nb\">int</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"c1\"># Note: This is not a direct
    API endpoint, but accessed through character transformations</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Planet</span><span
    class=\"p\">(</span><span class=\"n\">DBZResource</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">name</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">description</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">image</span><span class=\"p\">:</span> <span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"n\">HttpUrl</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">,</span> <span class=\"o\">**</span><span class=\"n\">data</span><span
    class=\"p\">):</span>\n        <span class=\"c1\"># Translate description before
    initializing</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n
    \       <span class=\"nb\">super</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n\n<span class=\"c1\"># Note:
    Saga and Episode models removed as they are not supported by the API</span>\n\n\n<span
    class=\"n\">commands</span> <span class=\"o\">=</span> <span class=\"n\">CommandSet</span><span
    class=\"p\">(</span>\n    <span class=\"p\">[</span>\n        <span class=\"n\">Command</span><span
    class=\"p\">(</span>\n            <span class=\"n\">name</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;character&quot;</span><span class=\"p\">,</span>\n            <span
    class=\"n\">aliases</span><span class=\"o\">=</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;c&quot;</span><span class=\"p\">],</span>\n            <span
    class=\"n\">model</span><span class=\"o\">=</span><span class=\"n\">Character</span><span
    class=\"p\">,</span>\n            <span class=\"n\">is_default</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"p\">),</span>\n
    \       <span class=\"n\">Command</span><span class=\"p\">(</span>\n            <span
    class=\"n\">name</span><span class=\"o\">=</span><span class=\"s2\">&quot;planet&quot;</span><span
    class=\"p\">,</span>\n            <span class=\"n\">aliases</span><span class=\"o\">=</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;p&quot;</span><span class=\"p\">],</span>\n
    \           <span class=\"n\">model</span><span class=\"o\">=</span><span class=\"n\">Planet</span><span
    class=\"p\">,</span>\n        <span class=\"p\">),</span>\n        <span class=\"c1\">#
    Note: Transformation is not a direct API endpoint, but can be accessed through
    characters</span>\n    <span class=\"p\">]</span>\n<span class=\"p\">)</span>\n\n<span
    class=\"n\">metadata</span> <span class=\"o\">=</span> <span class=\"p\">{</span>\n
    \   <span class=\"s2\">&quot;title&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;Dragon Ball Z Explorer&quot;</span><span class=\"p\">,</span>\n
    \   <span class=\"s2\">&quot;subtitle&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;Use :character or :planet to explore. Enter to drill in. Escape
    to go back/quit.&quot;</span><span class=\"p\">,</span>\n<span class=\"p\">}</span>\n\n\n<span
    class=\"k\">if</span> <span class=\"vm\">__name__</span> <span class=\"o\">==</span>
    <span class=\"s2\">&quot;__main__&quot;</span><span class=\"p\">:</span>\n    <span
    class=\"n\">ui</span> <span class=\"o\">=</span> <span class=\"n\">NinesUI</span><span
    class=\"p\">(</span><span class=\"n\">metadata</span><span class=\"o\">=</span><span
    class=\"n\">metadata</span><span class=\"p\">,</span> <span class=\"n\">commands</span><span
    class=\"o\">=</span><span class=\"n\">commands</span><span class=\"p\">)</span>\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">ui</span><span
    class=\"o\">.</span><span class=\"n\">run</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">finally</span><span class=\"p\">:</span>\n        <span
    class=\"c1\"># Save translation cache when exiting</span>\n        <span class=\"k\">try</span><span
    class=\"p\">:</span>\n            <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span> <span class=\"n\">encoding</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span>
    <span class=\"k\">as</span> <span class=\"n\">f</span><span class=\"p\">:</span>\n
    \               <span class=\"n\">json</span><span class=\"o\">.</span><span class=\"n\">dump</span><span
    class=\"p\">(</span><span class=\"n\">translation_cache</span><span class=\"p\">,</span>
    <span class=\"n\">f</span><span class=\"p\">,</span> <span class=\"n\">ensure_ascii</span><span
    class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span>
    <span class=\"n\">indent</span><span class=\"o\">=</span><span class=\"mi\">2</span><span
    class=\"p\">)</span>\n        <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error saving translation cache on exit: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208111354_0ae058e5.png\"
    alt=\"20251208111354_0ae058e5.png\" /></p>\n<blockquote>\n<p>See <a class=\"wikilink\"
    href=\"/columns-env-var-for-nicer-screenshots\">columns-env-var-for-nicer-screenshots</a>
    about making terminal screenshots a bit nicer</p>\n</blockquote>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>UV Run
    + PEP 723 Is A Match Made In Heaven</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"This post will be short but hopefully be a dense few paragraphs about
    how using\n`uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/)
    is\nlife-\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\" />\n<link
    rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"UV Run + PEP 723 Is A Match Made In Heaven | Nic
    Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/uv-run-pep-723-is-a-match-made-in-heaven\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"UV Run + PEP 723 Is A Match Made In Heaven | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"This post will be short but hopefully be a dense few paragraphs about
    how using\n`uv run foo.py` along with [PEP 723](https://peps.python.org/pep-0723/)
    is\nlife-\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\"
    />\n<!-- Common Twitter meta tags -->\n<meta name=\"twitter:creator\" content=\"@pypeaday\">\n<meta
    name=\"twitter:site\" content=\"@pypeaday\">\n\n\n        <meta property=\"og:author_email\"
    content=\"nic@pype.dev\" />\n\n        <script>\n            document.addEventListener(\"DOMContentLoaded\",
    () => {\n                const collapsibleElements = document.querySelectorAll('.is-collapsible');\n
    \               collapsibleElements.forEach(el => {\n                    const
    summary = el.querySelector('.admonition-title');\n                    if (summary)
    {\n                        summary.style.cursor = 'pointer';\n                        summary.addEventListener('click',
    () => {\n                            el.classList.toggle('collapsible-open');\n
    \                       });\n                    }\n                });\n            });\n
    \       </script>\n\n        <style>\n\n            .admonition.source {\n                padding-bottom:
    0;\n            }\n            .admonition.source pre.wrapper {\n                margin:
    0;\n                padding: 0;\n            }\n            .is-collapsible {\n
    \               overflow: hidden;\n                transition: max-height 0.3s
    ease;\n            }\n            .is-collapsible:not(.collapsible-open) {\n                max-height:
    0;\n                padding-bottom: 2.5rem;\n            }\n            .admonition-title
    {\n                font-weight: bold;\n                margin-bottom: 8px;\n            }\n
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class=\"terminal-page\">\n
    \   <main class=\"terminal-page__main\">\n        <div class=\"terminal-page__content\">\n<header
    class=\"site-terminal\">\n\n    <div class=\"site-terminal__bar\">\n        <div
    class=\"site-terminal__lights\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n
    \       <div class=\"site-terminal__path\">\n            <span class=\"site-terminal__prompt\">nic@pype</span>\n
    \           <span class=\"site-terminal__dir\">~/uv-run-pep-723-is-a-match-made-in-heaven</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>This
    post will be short but hopefully be a dense few paragraphs about how using\n<code>uv
    run foo.py</code> along with <a href=\"https://peps.python.org/pep-0723/\">PEP
    723</a> is\nlife-changing.</p>\n<h2 id=\"pep-723\">PEP 723 <a class=\"header-anchor\"
    href=\"#pep-723\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
    focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Python Enhancement Proposals
    (PEP) are the community's way of improving the\npython language and ecosystem
    and PEP 723 is one of my favorites. It permits\nadding python metadata right to
    your script which allows <code>python</code> to setup the\nscript's dependencies
    at runtime.</p>\n<h2 id=\"uv\">UV <a class=\"header-anchor\" href=\"#uv\"><svg
    class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\" focusable=\"false\"
    height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><a class=\"wikilink\"
    href=\"/uv\">uv</a> makes it even better with it's super fast resolution and environment\nsetup.
    I don't have any posts about uv yet, but here's the\n<a href=\"https://docs.astral.sh/uv/getting-started/installation/\">docs</a>,
    installing\n<code>uv</code> is now apart of my dev-machine setup because I need
    it everywhere!</p>\n<h2 id=\"the-magic\">The Magic <a class=\"header-anchor\"
    href=\"#the-magic\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
    focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path
    d=\"M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992
    5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242
    6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>I'm experiencing the
    power of <code>uv run myscript.py</code> as I've integrated a python\nscript into
    my tmux workflow for managing sessions as well as groups of\ngit-worktrees to
    keep development-ideas contained, easy to find, and easy to\nmanage.</p>\n<div
    class=\"admonition warning\">\n<p class=\"admonition-title\">The Series</p>\n<p>This
    post is in my &quot;If You Want It Make It So&quot; series because of the workspaces
    thing generally, not the dbztui example below, but for me - having 'uv run' as
    a pretty powerful Bash replacement makes my development workflow easier to build
    on and manage</p>\n</div>\n<p>My <a href=\"https://pypeaday.github.io/dotfiles/terminal/workspaces/\">workspaces
    docs</a>\nexplain the setup a bit, and that script is in my\n<a href=\"https://github.com/pypeaday/dotfiles/blob/main/workspaces/.local/bin/ws.py\">dotfiles</a></p>\n<p>For
    a shorter example, here's an example that has regular <code>pip</code> style\ndependencies,
    a <code>git+https</code> dependency, and is a tui - not just a top to bottom\nscript</p>\n<div
    class=\"admonition note\">\n<p class=\"admonition-title\">What is it?</p>\n<p>This
    is my DBZTUI script - it uses a beta package from Waylon called\nninesui and calls
    the dragonball-api to give you a handy way to explore the\nDragon Ball Universe
    from the glorious comfort of your terminal</p>\n</div>\n<p>Copy this code into
    <code>dbztui.py</code></p>\n<div class=\"admonition note\">\n<p class=\"admonition-title\">Execution</p>\n<p>You
    can <code>chmod +x</code> this script with the shebang to tell your shell to use
    uv to run it or just <code>uv run dbztui.py</code> will also work just fine</p>\n</div>\n<pre
    class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy' title='copy
    code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
    version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
    x=\"0px\" y=\"0px\" viewBox=\"0 0 115.77 122.88\" style=\"enable-background:new
    0 0 115.77 122.88\" xml:space=\"preserve\"><style type=\"text/css\">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path
    class=\"st0\" d=\"M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02
    v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02
    c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1
    c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7
    h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z
    M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65
    v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z
    M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01
    c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02
    v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z\"/></g></svg></button>\n</div>\n
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/usr/bin/env
    -S uv run --quiet --script</span>\n<span class=\"c1\"># /// script</span>\n<span
    class=\"c1\"># requires-python = &quot;&gt;=3.10&quot;</span>\n<span class=\"c1\">#
    dependencies = [</span>\n<span class=\"c1\">#     &quot;ninesui @ git+https://github.com/waylonwalker/ninesui.git&quot;,</span>\n<span
    class=\"c1\">#     &quot;httpx&quot;,</span>\n<span class=\"c1\">#     &quot;deep-translator&quot;,</span>\n<span
    class=\"c1\"># ]</span>\n<span class=\"c1\"># ///</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Optional</span><span class=\"p\">,</span>
    <span class=\"n\">List</span><span class=\"p\">,</span> <span class=\"n\">TypeVar</span><span
    class=\"p\">,</span> <span class=\"n\">ClassVar</span><span class=\"p\">,</span>
    <span class=\"n\">Any</span><span class=\"p\">,</span> <span class=\"n\">Dict</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">pydantic</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">BaseModel</span><span
    class=\"p\">,</span> <span class=\"n\">Field</span><span class=\"p\">,</span>
    <span class=\"n\">HttpUrl</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">httpx</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">textual</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">log</span>\n<span class=\"kn\">from</span><span class=\"w\">
    </span><span class=\"nn\">ninesui</span><span class=\"w\"> </span><span class=\"kn\">import</span>
    <span class=\"n\">CommandSet</span><span class=\"p\">,</span> <span class=\"n\">Command</span><span
    class=\"p\">,</span> <span class=\"n\">NinesUI</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">functools</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">lru_cache</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">deep_translator</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">GoogleTranslator</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">json</span>\n<span
    class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">os</span>\n\n<span
    class=\"n\">BASE_URL</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;https://dragonball-api.com/api/&quot;</span>\n\n<span
    class=\"c1\"># Translation cache file</span>\n<span class=\"n\">CACHE_DIR</span>
    <span class=\"o\">=</span> <span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">path</span><span class=\"o\">.</span><span class=\"n\">expanduser</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;~/.cache/dbztui&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">CACHE_FILE</span> <span class=\"o\">=</span>
    <span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">path</span><span
    class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">CACHE_DIR</span><span class=\"p\">,</span> <span class=\"s2\">&quot;translation_cache.json&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Create cache directory if it doesn&#39;t
    exist</span>\n<span class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">makedirs</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_DIR</span><span class=\"p\">,</span>
    <span class=\"n\">exist_ok</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Load translation cache from file</span>\n<span
    class=\"n\">translation_cache</span><span class=\"p\">:</span> <span class=\"n\">Dict</span><span
    class=\"p\">[</span><span class=\"nb\">str</span><span class=\"p\">,</span> <span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"p\">{}</span>\n<span class=\"k\">if</span> <span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">path</span><span class=\"o\">.</span><span
    class=\"n\">exists</span><span class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span
    class=\"p\">):</span>\n    <span class=\"k\">try</span><span class=\"p\">:</span>\n
    \       <span class=\"k\">with</span> <span class=\"nb\">open</span><span class=\"p\">(</span><span
    class=\"n\">CACHE_FILE</span><span class=\"p\">,</span> <span class=\"s2\">&quot;r&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">encoding</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span> <span class=\"k\">as</span>
    <span class=\"n\">f</span><span class=\"p\">:</span>\n            <span class=\"n\">translation_cache</span>
    <span class=\"o\">=</span> <span class=\"n\">json</span><span class=\"o\">.</span><span
    class=\"n\">load</span><span class=\"p\">(</span><span class=\"n\">f</span><span
    class=\"p\">)</span>\n    <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \       <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error loading translation cache: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"c1\"># Initialize translator</span>\n<span
    class=\"n\">translator</span> <span class=\"o\">=</span> <span class=\"n\">GoogleTranslator</span><span
    class=\"p\">(</span><span class=\"n\">source</span><span class=\"o\">=</span><span
    class=\"s1\">&#39;es&#39;</span><span class=\"p\">,</span> <span class=\"n\">target</span><span
    class=\"o\">=</span><span class=\"s1\">&#39;en&#39;</span><span class=\"p\">)</span>\n\n<span
    class=\"n\">T</span> <span class=\"o\">=</span> <span class=\"n\">TypeVar</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;T&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">bound</span><span class=\"o\">=</span><span class=\"s2\">&quot;DBZResource&quot;</span><span
    class=\"p\">)</span>\n\n<span class=\"nd\">@lru_cache</span><span class=\"p\">(</span><span
    class=\"n\">maxsize</span><span class=\"o\">=</span><span class=\"mi\">1000</span><span
    class=\"p\">)</span>\n<span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">translate_text</span><span class=\"p\">(</span><span class=\"n\">text</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span><span class=\"p\">)</span> <span
    class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span class=\"p\">:</span>\n<span
    class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Translate text from
    Spanish to English with caching&quot;&quot;&quot;</span>\n    <span class=\"k\">if</span>
    <span class=\"ow\">not</span> <span class=\"n\">text</span> <span class=\"ow\">or</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">text</span><span
    class=\"p\">)</span> <span class=\"o\">&lt;</span> <span class=\"mi\">5</span><span
    class=\"p\">:</span>  <span class=\"c1\"># Don&#39;t translate very short texts</span>\n
    \       <span class=\"k\">return</span> <span class=\"n\">text</span>\n\n    <span
    class=\"c1\"># Check if translation is in cache</span>\n    <span class=\"k\">if</span>
    <span class=\"n\">text</span> <span class=\"ow\">in</span> <span class=\"n\">translation_cache</span><span
    class=\"p\">:</span>\n        <span class=\"k\">return</span> <span class=\"n\">translation_cache</span><span
    class=\"p\">[</span><span class=\"n\">text</span><span class=\"p\">]</span>\n\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"c1\">#
    Translate text</span>\n        <span class=\"n\">translated</span> <span class=\"o\">=</span>
    <span class=\"n\">translator</span><span class=\"o\">.</span><span class=\"n\">translate</span><span
    class=\"p\">(</span><span class=\"n\">text</span><span class=\"p\">)</span>\n\n
    \       <span class=\"c1\"># Save to cache</span>\n        <span class=\"n\">translation_cache</span><span
    class=\"p\">[</span><span class=\"n\">text</span><span class=\"p\">]</span> <span
    class=\"o\">=</span> <span class=\"n\">translated</span>\n\n        <span class=\"c1\">#
    Periodically save cache to file</span>\n        <span class=\"k\">if</span> <span
    class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">translation_cache</span><span
    class=\"p\">)</span> <span class=\"o\">%</span> <span class=\"mi\">10</span> <span
    class=\"o\">==</span> <span class=\"mi\">0</span><span class=\"p\">:</span>  <span
    class=\"c1\"># Save every 10 new translations</span>\n            <span class=\"k\">try</span><span
    class=\"p\">:</span>\n                <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span> <span class=\"n\">encoding</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span>
    <span class=\"k\">as</span> <span class=\"n\">f</span><span class=\"p\">:</span>\n
    \                   <span class=\"n\">json</span><span class=\"o\">.</span><span
    class=\"n\">dump</span><span class=\"p\">(</span><span class=\"n\">translation_cache</span><span
    class=\"p\">,</span> <span class=\"n\">f</span><span class=\"p\">,</span> <span
    class=\"n\">ensure_ascii</span><span class=\"o\">=</span><span class=\"kc\">False</span><span
    class=\"p\">,</span> <span class=\"n\">indent</span><span class=\"o\">=</span><span
    class=\"mi\">2</span><span class=\"p\">)</span>\n            <span class=\"k\">except</span>
    <span class=\"ne\">Exception</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n                <span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Error saving translation cache:
    </span><span class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n\n        <span class=\"k\">return</span>
    <span class=\"n\">translated</span>\n    <span class=\"k\">except</span> <span
    class=\"ne\">Exception</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n        <span class=\"n\">log</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Translation error: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n        <span class=\"k\">return</span>
    <span class=\"n\">text</span>  <span class=\"c1\"># Return original text if translation
    fails</span>\n\n\n<span class=\"k\">class</span><span class=\"w\"> </span><span
    class=\"nc\">DBZResource</span><span class=\"p\">(</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n    <span class=\"nb\">id</span><span class=\"p\">:</span>
    <span class=\"nb\">int</span>\n\n    <span class=\"n\">nines_config</span><span
    class=\"p\">:</span> <span class=\"n\">ClassVar</span><span class=\"p\">[</span><span
    class=\"nb\">dict</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;bindings&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{}}</span>\n\n    <span class=\"nd\">@classmethod</span>\n
    \   <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">fetch</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">,</span> <span
    class=\"n\">ctx</span><span class=\"o\">=</span><span class=\"kc\">None</span><span
    class=\"p\">):</span>\n        <span class=\"n\">endpoint</span> <span class=\"o\">=</span>
    <span class=\"bp\">cls</span><span class=\"o\">.</span><span class=\"vm\">__name__</span><span
    class=\"o\">.</span><span class=\"n\">lower</span><span class=\"p\">()</span>
    <span class=\"o\">+</span> <span class=\"s2\">&quot;s&quot;</span>\n\n        <span
    class=\"n\">client</span> <span class=\"o\">=</span> <span class=\"n\">httpx</span><span
    class=\"o\">.</span><span class=\"n\">Client</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Fetching </span><span class=\"si\">{</span><span class=\"n\">endpoint</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span><span class=\"p\">)</span>\n\n
    \       <span class=\"k\">if</span> <span class=\"n\">ctx</span><span class=\"p\">:</span>\n
    \           <span class=\"k\">if</span> <span class=\"nb\">hasattr</span><span
    class=\"p\">(</span><span class=\"n\">ctx</span><span class=\"p\">,</span> <span
    class=\"n\">endpoint</span><span class=\"p\">):</span>\n                <span
    class=\"n\">result</span> <span class=\"o\">=</span> <span class=\"p\">[]</span>\n
    \               <span class=\"k\">for</span> <span class=\"n\">url</span> <span
    class=\"ow\">in</span> <span class=\"nb\">getattr</span><span class=\"p\">(</span><span
    class=\"n\">ctx</span><span class=\"p\">,</span> <span class=\"n\">endpoint</span><span
    class=\"p\">):</span>\n                    <span class=\"n\">res</span> <span
    class=\"o\">=</span> <span class=\"n\">client</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"nb\">str</span><span
    class=\"p\">(</span><span class=\"n\">url</span><span class=\"p\">))</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \                   <span class=\"n\">result</span><span class=\"o\">.</span><span
    class=\"n\">append</span><span class=\"p\">(</span><span class=\"bp\">cls</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">res</span><span
    class=\"p\">))</span>\n                <span class=\"k\">return</span> <span class=\"n\">result</span>\n\n
    \       <span class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}{</span><span class=\"n\">endpoint</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n\n        <span class=\"n\">results</span><span class=\"p\">:</span>
    <span class=\"n\">List</span><span class=\"p\">[</span><span class=\"n\">T</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"p\">[]</span>\n
    \       <span class=\"n\">response</span> <span class=\"o\">=</span> <span class=\"n\">client</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"n\">url</span><span class=\"p\">)</span>\n        <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n\n
    \       <span class=\"c1\"># Handle pagination structure from Dragon Ball API</span>\n
    \       <span class=\"k\">if</span> <span class=\"s2\">&quot;items&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">results</span><span class=\"o\">.</span><span class=\"n\">extend</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">(</span><span
    class=\"o\">**</span><span class=\"n\">item</span><span class=\"p\">)</span> <span
    class=\"k\">for</span> <span class=\"n\">item</span> <span class=\"ow\">in</span>
    <span class=\"n\">data</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;items&quot;</span><span class=\"p\">,</span>
    <span class=\"p\">[]))</span>\n\n            <span class=\"c1\"># Fetch all pages
    if needed</span>\n            <span class=\"k\">while</span> <span class=\"n\">data</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;links&quot;</span><span class=\"p\">,</span> <span class=\"p\">{})</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;next&quot;</span><span class=\"p\">):</span>\n                <span
    class=\"n\">next_url</span> <span class=\"o\">=</span> <span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;links&quot;</span><span class=\"p\">][</span><span
    class=\"s2\">&quot;next&quot;</span><span class=\"p\">]</span>\n                <span
    class=\"n\">response</span> <span class=\"o\">=</span> <span class=\"n\">client</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"n\">next_url</span><span class=\"p\">)</span>\n                <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \               <span class=\"n\">data</span> <span class=\"o\">=</span> <span
    class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">json</span><span
    class=\"p\">()</span>\n                <span class=\"n\">results</span><span class=\"o\">.</span><span
    class=\"n\">extend</span><span class=\"p\">(</span><span class=\"bp\">cls</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">item</span><span
    class=\"p\">)</span> <span class=\"k\">for</span> <span class=\"n\">item</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;items&quot;</span><span
    class=\"p\">,</span> <span class=\"p\">[]))</span>\n        <span class=\"k\">else</span><span
    class=\"p\">:</span>\n            <span class=\"c1\"># Direct list of items</span>\n
    \           <span class=\"n\">results</span><span class=\"o\">.</span><span class=\"n\">extend</span><span
    class=\"p\">(</span><span class=\"bp\">cls</span><span class=\"p\">(</span><span
    class=\"o\">**</span><span class=\"n\">item</span><span class=\"p\">)</span> <span
    class=\"k\">for</span> <span class=\"n\">item</span> <span class=\"ow\">in</span>
    <span class=\"n\">data</span><span class=\"p\">)</span>\n\n        <span class=\"k\">return</span>
    <span class=\"n\">results</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"nf\">hover</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>\n        <span class=\"k\">return</span> <span class=\"bp\">self</span>\n\n
    \   <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">get_details</span><span
    class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>\n<span
    class=\"w\">        </span><span class=\"sd\">&quot;&quot;&quot;Get detailed information
    about this resource&quot;&quot;&quot;</span>\n        <span class=\"n\">client</span>
    <span class=\"o\">=</span> <span class=\"n\">httpx</span><span class=\"o\">.</span><span
    class=\"n\">Client</span><span class=\"p\">()</span>\n        <span class=\"n\">endpoint</span>
    <span class=\"o\">=</span> <span class=\"bp\">self</span><span class=\"o\">.</span><span
    class=\"vm\">__class__</span><span class=\"o\">.</span><span class=\"vm\">__name__</span><span
    class=\"o\">.</span><span class=\"n\">lower</span><span class=\"p\">()</span>
    <span class=\"o\">+</span> <span class=\"s2\">&quot;s&quot;</span>\n        <span
    class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}{</span><span class=\"n\">endpoint</span><span class=\"si\">}</span><span
    class=\"s2\">/</span><span class=\"si\">{</span><span class=\"bp\">self</span><span
    class=\"o\">.</span><span class=\"n\">id</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n        <span class=\"n\">response</span> <span class=\"o\">=</span>
    <span class=\"n\">client</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"n\">url</span><span class=\"p\">)</span>\n        <span
    class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">raise_for_status</span><span
    class=\"p\">()</span>\n        <span class=\"n\">data</span> <span class=\"o\">=</span>
    <span class=\"n\">response</span><span class=\"o\">.</span><span class=\"n\">json</span><span
    class=\"p\">()</span>\n\n        <span class=\"c1\"># Translate description if
    present</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n\n
    \       <span class=\"k\">return</span> <span class=\"bp\">self</span><span class=\"o\">.</span><span
    class=\"vm\">__class__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">Character</span><span class=\"p\">(</span><span
    class=\"n\">DBZResource</span><span class=\"p\">):</span>\n    <span class=\"n\">name</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">ki</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">maxKi</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">race</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">gender</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">description</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">image</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"n\">HttpUrl</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"kc\">None</span>\n    <span class=\"n\">affiliation</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">,</span> <span class=\"o\">**</span><span class=\"n\">data</span><span
    class=\"p\">):</span>\n        <span class=\"c1\"># Translate description before
    initializing</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n
    \       <span class=\"nb\">super</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n    <span class=\"n\">nines_config</span><span
    class=\"p\">:</span> <span class=\"n\">ClassVar</span><span class=\"p\">[</span><span
    class=\"nb\">dict</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;bindings&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span><span class=\"s2\">&quot;t&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;get_transformations&quot;</span><span
    class=\"p\">}}</span>\n\n    <span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">get_transformations</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">):</span>\n<span class=\"w\">        </span><span class=\"sd\">&quot;&quot;&quot;Get
    all transformations for this character&quot;&quot;&quot;</span>\n        <span
    class=\"n\">client</span> <span class=\"o\">=</span> <span class=\"n\">httpx</span><span
    class=\"o\">.</span><span class=\"n\">Client</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">url</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">BASE_URL</span><span
    class=\"si\">}</span><span class=\"s2\">characters/</span><span class=\"si\">{</span><span
    class=\"bp\">self</span><span class=\"o\">.</span><span class=\"n\">id</span><span
    class=\"si\">}</span><span class=\"s2\">/transformations&quot;</span>\n        <span
    class=\"k\">try</span><span class=\"p\">:</span>\n            <span class=\"n\">response</span>
    <span class=\"o\">=</span> <span class=\"n\">client</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"n\">url</span><span
    class=\"p\">)</span>\n            <span class=\"n\">response</span><span class=\"o\">.</span><span
    class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n            <span
    class=\"n\">data</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \           <span class=\"k\">if</span> <span class=\"s2\">&quot;items&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">:</span>\n
    \               <span class=\"k\">return</span> <span class=\"p\">[</span><span
    class=\"n\">Transformation</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">item</span><span class=\"p\">)</span> <span class=\"k\">for</span>
    <span class=\"n\">item</span> <span class=\"ow\">in</span> <span class=\"n\">data</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;items&quot;</span><span class=\"p\">,</span> <span class=\"p\">[])]</span>\n
    \           <span class=\"k\">return</span> <span class=\"p\">[</span><span class=\"n\">Transformation</span><span
    class=\"p\">(</span><span class=\"o\">**</span><span class=\"n\">item</span><span
    class=\"p\">)</span> <span class=\"k\">for</span> <span class=\"n\">item</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span><span class=\"p\">]</span>\n
    \       <span class=\"k\">except</span> <span class=\"ne\">Exception</span> <span
    class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n            <span
    class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error fetching transformations: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n            <span class=\"k\">return</span> <span class=\"p\">[]</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Transformation</span><span
    class=\"p\">(</span><span class=\"n\">DBZResource</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">name</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">image</span><span class=\"p\">:</span> <span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"n\">HttpUrl</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n    <span class=\"n\">ki</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">characterId</span><span
    class=\"p\">:</span> <span class=\"nb\">int</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"c1\"># Note: This is not a direct
    API endpoint, but accessed through character transformations</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Planet</span><span
    class=\"p\">(</span><span class=\"n\">DBZResource</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">name</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">description</span><span class=\"p\">:</span> <span class=\"nb\">str</span>\n
    \   <span class=\"n\">image</span><span class=\"p\">:</span> <span class=\"n\">Optional</span><span
    class=\"p\">[</span><span class=\"n\">HttpUrl</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"kc\">None</span>\n    <span class=\"n\">deletedAt</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">def</span><span class=\"w\">
    </span><span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span
    class=\"p\">,</span> <span class=\"o\">**</span><span class=\"n\">data</span><span
    class=\"p\">):</span>\n        <span class=\"c1\"># Translate description before
    initializing</span>\n        <span class=\"k\">if</span> <span class=\"s2\">&quot;description&quot;</span>
    <span class=\"ow\">in</span> <span class=\"n\">data</span> <span class=\"ow\">and</span>
    <span class=\"n\">data</span><span class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span
    class=\"p\">]:</span>\n            <span class=\"n\">data</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;description&quot;</span><span class=\"p\">]</span> <span class=\"o\">=</span>
    <span class=\"n\">translate_text</span><span class=\"p\">(</span><span class=\"n\">data</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;description&quot;</span><span class=\"p\">])</span>\n
    \       <span class=\"nb\">super</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"o\">**</span><span
    class=\"n\">data</span><span class=\"p\">)</span>\n\n\n<span class=\"c1\"># Note:
    Saga and Episode models removed as they are not supported by the API</span>\n\n\n<span
    class=\"n\">commands</span> <span class=\"o\">=</span> <span class=\"n\">CommandSet</span><span
    class=\"p\">(</span>\n    <span class=\"p\">[</span>\n        <span class=\"n\">Command</span><span
    class=\"p\">(</span>\n            <span class=\"n\">name</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;character&quot;</span><span class=\"p\">,</span>\n            <span
    class=\"n\">aliases</span><span class=\"o\">=</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;c&quot;</span><span class=\"p\">],</span>\n            <span
    class=\"n\">model</span><span class=\"o\">=</span><span class=\"n\">Character</span><span
    class=\"p\">,</span>\n            <span class=\"n\">is_default</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span>\n        <span class=\"p\">),</span>\n
    \       <span class=\"n\">Command</span><span class=\"p\">(</span>\n            <span
    class=\"n\">name</span><span class=\"o\">=</span><span class=\"s2\">&quot;planet&quot;</span><span
    class=\"p\">,</span>\n            <span class=\"n\">aliases</span><span class=\"o\">=</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;p&quot;</span><span class=\"p\">],</span>\n
    \           <span class=\"n\">model</span><span class=\"o\">=</span><span class=\"n\">Planet</span><span
    class=\"p\">,</span>\n        <span class=\"p\">),</span>\n        <span class=\"c1\">#
    Note: Transformation is not a direct API endpoint, but can be accessed through
    characters</span>\n    <span class=\"p\">]</span>\n<span class=\"p\">)</span>\n\n<span
    class=\"n\">metadata</span> <span class=\"o\">=</span> <span class=\"p\">{</span>\n
    \   <span class=\"s2\">&quot;title&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;Dragon Ball Z Explorer&quot;</span><span class=\"p\">,</span>\n
    \   <span class=\"s2\">&quot;subtitle&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;Use :character or :planet to explore. Enter to drill in. Escape
    to go back/quit.&quot;</span><span class=\"p\">,</span>\n<span class=\"p\">}</span>\n\n\n<span
    class=\"k\">if</span> <span class=\"vm\">__name__</span> <span class=\"o\">==</span>
    <span class=\"s2\">&quot;__main__&quot;</span><span class=\"p\">:</span>\n    <span
    class=\"n\">ui</span> <span class=\"o\">=</span> <span class=\"n\">NinesUI</span><span
    class=\"p\">(</span><span class=\"n\">metadata</span><span class=\"o\">=</span><span
    class=\"n\">metadata</span><span class=\"p\">,</span> <span class=\"n\">commands</span><span
    class=\"o\">=</span><span class=\"n\">commands</span><span class=\"p\">)</span>\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">ui</span><span
    class=\"o\">.</span><span class=\"n\">run</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">finally</span><span class=\"p\">:</span>\n        <span
    class=\"c1\"># Save translation cache when exiting</span>\n        <span class=\"k\">try</span><span
    class=\"p\">:</span>\n            <span class=\"k\">with</span> <span class=\"nb\">open</span><span
    class=\"p\">(</span><span class=\"n\">CACHE_FILE</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span> <span class=\"n\">encoding</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span class=\"p\">)</span>
    <span class=\"k\">as</span> <span class=\"n\">f</span><span class=\"p\">:</span>\n
    \               <span class=\"n\">json</span><span class=\"o\">.</span><span class=\"n\">dump</span><span
    class=\"p\">(</span><span class=\"n\">translation_cache</span><span class=\"p\">,</span>
    <span class=\"n\">f</span><span class=\"p\">,</span> <span class=\"n\">ensure_ascii</span><span
    class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span>
    <span class=\"n\">indent</span><span class=\"o\">=</span><span class=\"mi\">2</span><span
    class=\"p\">)</span>\n        <span class=\"k\">except</span> <span class=\"ne\">Exception</span>
    <span class=\"k\">as</span> <span class=\"n\">e</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">log</span><span class=\"p\">(</span><span class=\"sa\">f</span><span
    class=\"s2\">&quot;Error saving translation cache on exit: </span><span class=\"si\">{</span><span
    class=\"n\">e</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n<p><img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208111354_0ae058e5.png\"
    alt=\"20251208111354_0ae058e5.png\" /></p>\n<blockquote>\n<p>See <a class=\"wikilink\"
    href=\"/columns-env-var-for-nicer-screenshots\">columns-env-var-for-nicer-screenshots</a>
    about making terminal screenshots a bit nicer</p>\n</blockquote>\n\n        </div>\n
    \   </main>\n</div>\n     </body>\n</html>"
  raw.md: "---\ndate: 2025-12-08 04:59:10\ntemplateKey: blog-post\ntitle: UV Run +
    PEP 723 Is A Match Made In Heaven\npublished: True\ncover: https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208112719_1ea01b09.png\ntags:\n
    \ - series-if-you-want-it-make-it-so\n  - tech\n---\n\nThis post will be short
    but hopefully be a dense few paragraphs about how using\n`uv run foo.py` along
    with [PEP 723](https://peps.python.org/pep-0723/) is\nlife-changing.\n\n## PEP
    723\n\nPython Enhancement Proposals (PEP) are the community's way of improving
    the\npython language and ecosystem and PEP 723 is one of my favorites. It permits\nadding
    python metadata right to your script which allows `python` to setup the\nscript's
    dependencies at runtime.\n\n## UV\n\n[[uv]] makes it even better with it's super
    fast resolution and environment\nsetup. I don't have any posts about uv yet, but
    here's the\n[docs](https://docs.astral.sh/uv/getting-started/installation/), installing\n`uv`
    is now apart of my dev-machine setup because I need it everywhere!\n\n## The Magic\n\nI'm
    experiencing the power of `uv run myscript.py` as I've integrated a python\nscript
    into my tmux workflow for managing sessions as well as groups of\ngit-worktrees
    to keep development-ideas contained, easy to find, and easy to\nmanage.\n\n!!!
    warning \"The Series\"\n\n    This post is in my \"If You Want It Make It So\"
    series because of the workspaces thing generally, not the dbztui example below,
    but for me - having 'uv run' as a pretty powerful Bash replacement makes my development
    workflow easier to build on and manage\n\nMy [workspaces docs](https://pypeaday.github.io/dotfiles/terminal/workspaces/)\nexplain
    the setup a bit, and that script is in my\n[dotfiles](https://github.com/pypeaday/dotfiles/blob/main/workspaces/.local/bin/ws.py)\n\nFor
    a shorter example, here's an example that has regular `pip` style\ndependencies,
    a `git+https` dependency, and is a tui - not just a top to bottom\nscript\n\n!!!
    note \"What is it?\"\n\n    This is my DBZTUI script - it uses a beta package
    from Waylon called\n    ninesui and calls the dragonball-api to give you a handy
    way to explore the\n    Dragon Ball Universe from the glorious comfort of your
    terminal\n\nCopy this code into `dbztui.py`\n\n!!! note \"Execution\"\n\n    You
    can `chmod +x` this script with the shebang to tell your shell to use uv to run
    it or just `uv run dbztui.py` will also work just fine\n\n```python\n#!/usr/bin/env
    -S uv run --quiet --script\n# /// script\n# requires-python = \">=3.10\"\n# dependencies
    = [\n#     \"ninesui @ git+https://github.com/waylonwalker/ninesui.git\",\n#     \"httpx\",\n#
    \    \"deep-translator\",\n# ]\n# ///\nfrom typing import Optional, List, TypeVar,
    ClassVar, Any, Dict\nfrom pydantic import BaseModel, Field, HttpUrl\nimport httpx\nfrom
    textual import log\nfrom ninesui import CommandSet, Command, NinesUI\nfrom functools
    import lru_cache\nfrom deep_translator import GoogleTranslator\nimport json\nimport
    os\n\nBASE_URL = \"https://dragonball-api.com/api/\"\n\n# Translation cache file\nCACHE_DIR
    = os.path.expanduser(\"~/.cache/dbztui\")\nCACHE_FILE = os.path.join(CACHE_DIR,
    \"translation_cache.json\")\n\n# Create cache directory if it doesn't exist\nos.makedirs(CACHE_DIR,
    exist_ok=True)\n\n# Load translation cache from file\ntranslation_cache: Dict[str,
    str] = {}\nif os.path.exists(CACHE_FILE):\n    try:\n        with open(CACHE_FILE,
    \"r\", encoding=\"utf-8\") as f:\n            translation_cache = json.load(f)\n
    \   except Exception as e:\n        log(f\"Error loading translation cache: {e}\")\n\n#
    Initialize translator\ntranslator = GoogleTranslator(source='es', target='en')\n\nT
    = TypeVar(\"T\", bound=\"DBZResource\")\n\n@lru_cache(maxsize=1000)\ndef translate_text(text:
    str) -> str:\n    \"\"\"Translate text from Spanish to English with caching\"\"\"\n
    \   if not text or len(text) < 5:  # Don't translate very short texts\n        return
    text\n\n    # Check if translation is in cache\n    if text in translation_cache:\n
    \       return translation_cache[text]\n\n    try:\n        # Translate text\n
    \       translated = translator.translate(text)\n\n        # Save to cache\n        translation_cache[text]
    = translated\n\n        # Periodically save cache to file\n        if len(translation_cache)
    % 10 == 0:  # Save every 10 new translations\n            try:\n                with
    open(CACHE_FILE, \"w\", encoding=\"utf-8\") as f:\n                    json.dump(translation_cache,
    f, ensure_ascii=False, indent=2)\n            except Exception as e:\n                log(f\"Error
    saving translation cache: {e}\")\n\n        return translated\n    except Exception
    as e:\n        log(f\"Translation error: {e}\")\n        return text  # Return
    original text if translation fails\n\n\nclass DBZResource(BaseModel):\n    id:
    int\n\n    nines_config: ClassVar[dict] = {\"bindings\": {}}\n\n    @classmethod\n
    \   def fetch(cls, ctx=None):\n        endpoint = cls.__name__.lower() + \"s\"\n\n
    \       client = httpx.Client()\n        log(f\"Fetching {endpoint}\")\n\n        if
    ctx:\n            if hasattr(ctx, endpoint):\n                result = []\n                for
    url in getattr(ctx, endpoint):\n                    res = client.get(str(url)).json()\n
    \                   result.append(cls(**res))\n                return result\n\n
    \       url = f\"{BASE_URL}{endpoint}\"\n\n        results: List[T] = []\n        response
    = client.get(url)\n        response.raise_for_status()\n        data = response.json()\n\n
    \       # Handle pagination structure from Dragon Ball API\n        if \"items\"
    in data:\n            results.extend(cls(**item) for item in data.get(\"items\",
    []))\n\n            # Fetch all pages if needed\n            while data.get(\"links\",
    {}).get(\"next\"):\n                next_url = data[\"links\"][\"next\"]\n                response
    = client.get(next_url)\n                response.raise_for_status()\n                data
    = response.json()\n                results.extend(cls(**item) for item in data.get(\"items\",
    []))\n        else:\n            # Direct list of items\n            results.extend(cls(**item)
    for item in data)\n\n        return results\n\n    def hover(self):\n        return
    self\n\n    def get_details(self):\n        \"\"\"Get detailed information about
    this resource\"\"\"\n        client = httpx.Client()\n        endpoint = self.__class__.__name__.lower()
    + \"s\"\n        url = f\"{BASE_URL}{endpoint}/{self.id}\"\n        response =
    client.get(url)\n        response.raise_for_status()\n        data = response.json()\n\n
    \       # Translate description if present\n        if \"description\" in data
    and data[\"description\"]:\n            data[\"description\"] = translate_text(data[\"description\"])\n\n
    \       return self.__class__(**data)\n\n\nclass Character(DBZResource):\n    name:
    str\n    ki: str\n    maxKi: str\n    race: str\n    gender: str\n    description:
    str\n    image: Optional[HttpUrl] = None\n    affiliation: str\n    deletedAt:
    Optional[str] = None\n\n    def __init__(self, **data):\n        # Translate description
    before initializing\n        if \"description\" in data and data[\"description\"]:\n
    \           data[\"description\"] = translate_text(data[\"description\"])\n        super().__init__(**data)\n\n
    \   nines_config: ClassVar[dict] = {\"bindings\": {\"t\": \"get_transformations\"}}\n\n
    \   def get_transformations(self):\n        \"\"\"Get all transformations for
    this character\"\"\"\n        client = httpx.Client()\n        url = f\"{BASE_URL}characters/{self.id}/transformations\"\n
    \       try:\n            response = client.get(url)\n            response.raise_for_status()\n
    \           data = response.json()\n            if \"items\" in data:\n                return
    [Transformation(**item) for item in data.get(\"items\", [])]\n            return
    [Transformation(**item) for item in data]\n        except Exception as e:\n            log(f\"Error
    fetching transformations: {e}\")\n            return []\n\n\nclass Transformation(DBZResource):\n
    \   name: str\n    image: Optional[HttpUrl] = None\n    ki: str\n    characterId:
    int\n    deletedAt: Optional[str] = None\n\n    # Note: This is not a direct API
    endpoint, but accessed through character transformations\n\n\nclass Planet(DBZResource):\n
    \   name: str\n    description: str\n    image: Optional[HttpUrl] = None\n    deletedAt:
    Optional[str] = None\n\n    def __init__(self, **data):\n        # Translate description
    before initializing\n        if \"description\" in data and data[\"description\"]:\n
    \           data[\"description\"] = translate_text(data[\"description\"])\n        super().__init__(**data)\n\n\n#
    Note: Saga and Episode models removed as they are not supported by the API\n\n\ncommands
    = CommandSet(\n    [\n        Command(\n            name=\"character\",\n            aliases=[\"c\"],\n
    \           model=Character,\n            is_default=True,\n        ),\n        Command(\n
    \           name=\"planet\",\n            aliases=[\"p\"],\n            model=Planet,\n
    \       ),\n        # Note: Transformation is not a direct API endpoint, but can
    be accessed through characters\n    ]\n)\n\nmetadata = {\n    \"title\": \"Dragon
    Ball Z Explorer\",\n    \"subtitle\": \"Use :character or :planet to explore.
    Enter to drill in. Escape to go back/quit.\",\n}\n\n\nif __name__ == \"__main__\":\n
    \   ui = NinesUI(metadata=metadata, commands=commands)\n    try:\n        ui.run()\n
    \   finally:\n        # Save translation cache when exiting\n        try:\n            with
    open(CACHE_FILE, \"w\", encoding=\"utf-8\") as f:\n                json.dump(translation_cache,
    f, ensure_ascii=False, indent=2)\n        except Exception as e:\n            log(f\"Error
    saving translation cache on exit: {e}\")\n```\n\n![20251208111354_0ae058e5.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251208111354_0ae058e5.png)\n\n>
    See [[columns-env-var-for-nicer-screenshots]] about making terminal screenshots
    a bit nicer\n"
published: true
slug: uv-run-pep-723-is-a-match-made-in-heaven
title: UV Run + PEP 723 Is A Match Made In Heaven


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