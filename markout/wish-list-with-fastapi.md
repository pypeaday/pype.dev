---
content: "Amazon has crossed the line with me just one too many times now so we are
  looking to drop them like every other Big Tech provider....\n\nHowever, one key
  feature of Amazon that has been so useful for us is Lists... We can just maintain
  a list for each of us and then family members can login anytime and check it out...
  \nThis really alleviates any last minute gift idea stress right before a birthday
  or something.\n\nSo I need a nice gift list service but I don't want to be locked
  into one company (like a Target registry or something) and I'd like to host it myself\n\nThe
  internets had a few options but nothing looked/felt like I wanted to I decided to
  build my own.\n\n# The Frontend\n\n__I have no idea how to do front end so stay
  tuned__\n\n# The Backend\n\nFastAPI for the win on this one... I followed a few
  examples online and what I was able to build in just a few minutes is pretty impressive
  thanks to the design of FastAPI.\n\nSome key features are:\n1. Auto doc generation\n2.
  Required typing (which makes #1 possible)\n3. Built-in api testing in the browser\n4.
  Easy integration with sqlalchemy\n5. Development time so short you won't be done
  with your coffee before having something up and running!\n\n## Database\n\nStarting
  with a simple `database.py` we can create a sqlalchemy session with a base model
  with about 7 lines of code...\n\n```python\n\nfrom sqlalchemy import create_engine\nfrom
  sqlalchemy.ext.declarative import declarative_base\nfrom sqlalchemy.orm import sessionmaker\n\n\nSQLALCHEMY_DATABASE_URL
  = \"sqlite:///wishes.sqlite3\"\nengine = create_engine(SQLALCHEMY_DATABASE_URL)\nSessionLocal
  = sessionmaker(autocommit=False, autoflush=False, bind=engine)\nBase = declarative_base()\n```\n\n##
  Model\n\nFor my wish list I needed just a simple table:\n\n|   id | person   | item
  \        | link         | purchased   | purchased_by   | date_added          |\n|-----:|:---------|:-------------|:-------------|:------------|:---------------|:--------------------|\n|
  \   1 | pypeaday | A sweet item | www.mystore.store | False        | dad| 2022-05-05
  21:55:09 |\n|    2 | pypeaday   | A bitter item| www.bitterstore.com | True       |Mrs.
  pypeaday |  2022-05-06 06:55:54 |\n\n\nThe table is simple enough... A unique key,
  the person who the wish belongs to, the item (or wish), a link to the item, whether
  it's been purchased or not and by whom, and the date it was added.\n\nTo make this
  model with sqlalchemy we can make a `model.py` like so:\n\n```python\nfrom database
  import Base\nfrom sqlalchemy.schema import Column\nfrom sqlalchemy.types import
  Boolean, Integer, String, Text\n\n\nclass Wishes(Base):\n    __tablename__ = \"Wishes\"\n
  \   id = Column(Integer, primary_key=True, index=True)\n    person = Column(String(20))\n
  \   item = Column(Text())\n    link = Column(Text())\n    purchased = Column(Boolean())\n
  \   purchased_by = Column(String(90))\n    date_added = Column(String(15))\n```\n\n##
  Schema\n\nOne of the best things about FastAPI is trivial integration with pydantic.\nWe
  can define a schema to ensure any data posted is not missing anything!\n\nMake a
  `schema.py` with the following:\n\n```python\nfrom pydantic import BaseModel\nimport
  time\nfrom typing import Optional\n\n\nclass wish_schema(BaseModel):\n\n    person:
  str\n    item: str\n    link: str\n    purchased: bool = False\n    purchased_by:
  Optional[str] = None\n    date_added: Optional[str] = time.strftime(\"%Y-%m-%d %H:%M:%S\",
  time.localtime())\n\n    class Config:\n        orm_mode = True\n\n\nclass patch_schema(BaseModel):\n\n
  \   purchased: bool\n    purchased_by: Optional[str] = None\n\n    class Config:\n
  \       orm_mode = True\n\n```\n\nI have 2 schemas - one for a `wish` which you'll
  see down below is used to validate any `post` requests.\n\nTo simplify things for
  me I made another schema, `patch_schema` which I use for the route that updates
  the table (ie. marking an existing wish as purchased) \n\n## Session\n\nOne of the
  last things we need is a Session\n\nSo make a `session.py`...\n\n```python\nfrom
  database import SessionLocal, engine\nimport model\n\nmodel.Base.metadata.create_all(bind=engine)\n\n\ndef
  create_get_session():\n    try:\n        db = SessionLocal()\n        yield db\n
  \   finally:\n        db.close()\n```\n\nOur routes will depend on this `create_get_session`
  function that will yield a `db` object through which we'll udpate our database\n\n#
  Ok just do it already!\n\nSo our `main.py` will have a few routes in it...\n\nWhat
  do we want to support?\n\n1. Getting all wishes\n2. Getting a specific wish\n3.
  Updating a specific wish\n4. Deleting a wish\n\nI think the script is fairly self
  explanatory but here's a few notes...\n\n1. We decorate each function with `@app.<method>`
  and define `response_model` as well as `status_code`\n2. The functions are defined
  with `async` (this was my first exposure to this so I can't go in depth on it yet)\n3.
  The functions all take a `db` which is from `session.py` and that `db` depends on
  the `create_get_session` function\n4. If the db is being updtes then we type the
  object used for the update with the appropriate schema (either `wish_schema` or
  `patch_schema`)\n\nFrom there we're in true python-land where you can basically
  guess the methods on `db` and you'd probably be right... (like `query`, `upddate`,
  `delete` etc.)\n\n\n```python\nfrom fastapi import FastAPI, Depends, HTTPException\nfrom
  sqlalchemy.orm import Session\nfrom typing import List\nfrom model import Wishes\nfrom
  schema import wish_schema, patch_schema\nfrom session import create_get_session\n\napp
  = FastAPI()\n\n\n@app.get(\"/\")\ndef read_root():\n    return {\"message\": \"server
  is up!\"}\n\n\n@app.get(\"/wishes\", response_model=List[wish_schema], status_code=200)\nasync
  def read_wishes(db: Session = Depends(create_get_session)):\n    wishes = db.query(Wishes).all()\n
  \   return wishes\n\n\n@app.post(\"/wishes\", response_model=wish_schema, status_code=201)\nasync
  def add_wish(wish: wish_schema, db: Session = Depends(create_get_session)):\n    new_wish
  = Wishes(\n        person=wish.person,\n        item=wish.item,\n        link=wish.link,\n
  \       purchased=wish.purchased,\n        purchased_by=wish.purchased_by,\n        date_added=wish.date_added,\n
  \   )\n    db.add(new_wish)\n    db.commit()\n\n    return new_wish\n\n\n@app.get(\"/wishes/{id}\",
  response_model=wish_schema, status_code=200)\nasync def get_wish(id: int, db: Session
  = Depends(create_get_session)):\n    wish = db.query(Wishes).get(id)\n    return
  wish\n\n\n@app.patch(\"/wishes/{id}\", response_model=wish_schema, status_code=200)\nasync
  def update_wish(\n    id: int, patch: patch_schema, db: Session = Depends(create_get_session)\n):\n
  \   db_wish = db.query(Wishes).get(id)\n    db_wish.purchased = patch.purchased\n
  \   db_wish.purchased_by = patch.purchased_by\n    db.commit()\n    db.refresh(db_wish)\n\n
  \   return db_wish\n\n\n@app.delete(\"/wishes/{id}\", status_code=200)\nasync def
  delete_wish(id: int, db: Session = Depends(create_get_session)):\n    db_wish =
  db.query(Wishes).get(id)\n    if not db_wish:\n        raise HTTPException(status_code=\"404\",
  detail=\"Wish id does not exist\")\n\n    db.delete(db_wish)\n    db.commit()\n\n
  \   return None\n\n```\n\n# My Code\n\nYou can find my repo [here](https://github.com/nicpayne713/wish-lists).\n\nI'll
  plan to update and maintain for as long as I use it"
date: 2022-05-06
description: Amazon has crossed the line with me just one too many times now so we
  are looking to drop them like every other Big Tech provider.... However, one key
  feature o
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Wish-List-With-Fastapi</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Amazon has crossed the line with me just
    one too many times now so we are looking to drop them like every other Big Tech
    provider.... However, one key feature o\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Wish-List-With-Fastapi | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/wish-list-with-fastapi\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Wish-List-With-Fastapi | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Amazon has crossed the line with me just one too many times now so we
    are looking to drop them like every other Big Tech provider.... However, one key
    feature o\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/wish-list-with-fastapi</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header>    <div class=\"post-terminal__search\">\n<div
    id='didyoumean'>\n    <div class=\"mb-0\">\n        <!-- <label for=\"search\"
    class=\"block text-sm font-medium mb-2\">Search for a page</label> -->\n        <input
    type=\"text\" id=\"search\"\n               class=\"w-full p-2 border rounded-md
    bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/'
    Search for a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
    gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
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
    class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Wish-List-With-Fastapi</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-06\">\n            May
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/blog/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #blog\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>Amazon has crossed the line with me
    just one too many times now so we are looking to drop them like every other Big
    Tech provider....</p>\n<p>However, one key feature of Amazon that has been so
    useful for us is Lists... We can just maintain a list for each of us and then
    family members can login anytime and check it out...\nThis really alleviates any
    last minute gift idea stress right before a birthday or something.</p>\n<p>So
    I need a nice gift list service but I don't want to be locked into one company
    (like a Target registry or something) and I'd like to host it myself</p>\n<p>The
    internets had a few options but nothing looked/felt like I wanted to I decided
    to build my own.</p>\n<h1 id=\"the-frontend\">The Frontend <a class=\"header-anchor\"
    href=\"#the-frontend\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>I have no idea
    how to do front end so stay tuned</strong></p>\n<h1 id=\"the-backend\">The Backend
    <a class=\"header-anchor\" href=\"#the-backend\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>FastAPI for the win
    on this one... I followed a few examples online and what I was able to build in
    just a few minutes is pretty impressive thanks to the design of FastAPI.</p>\n<p>Some
    key features are:</p>\n<ol>\n<li>Auto doc generation</li>\n<li>Required typing
    (which makes #1 possible)</li>\n<li>Built-in api testing in the browser</li>\n<li>Easy
    integration with sqlalchemy</li>\n<li>Development time so short you won't be done
    with your coffee before having something up and running!</li>\n</ol>\n<h2 id=\"database\">Database
    <a class=\"header-anchor\" href=\"#database\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Starting with a simple
    <code>database.py</code> we can create a sqlalchemy session with a base model
    with about 7 lines of code...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">create_engine</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy.ext.declarative</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">declarative_base</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">sessionmaker</span>\n\n\n<span
    class=\"n\">SQLALCHEMY_DATABASE_URL</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;sqlite:///wishes.sqlite3&quot;</span>\n<span
    class=\"n\">engine</span> <span class=\"o\">=</span> <span class=\"n\">create_engine</span><span
    class=\"p\">(</span><span class=\"n\">SQLALCHEMY_DATABASE_URL</span><span class=\"p\">)</span>\n<span
    class=\"n\">SessionLocal</span> <span class=\"o\">=</span> <span class=\"n\">sessionmaker</span><span
    class=\"p\">(</span><span class=\"n\">autocommit</span><span class=\"o\">=</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"n\">autoflush</span><span
    class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span>
    <span class=\"n\">bind</span><span class=\"o\">=</span><span class=\"n\">engine</span><span
    class=\"p\">)</span>\n<span class=\"n\">Base</span> <span class=\"o\">=</span>
    <span class=\"n\">declarative_base</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"model\">Model <a class=\"header-anchor\" href=\"#model\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>For my wish list I needed
    just a simple table:</p>\n<table>\n<thead>\n<tr>\n<th style=\"text-align:right\">id</th>\n<th
    style=\"text-align:left\">person</th>\n<th style=\"text-align:left\">item</th>\n<th
    style=\"text-align:left\">link</th>\n<th style=\"text-align:left\">purchased</th>\n<th
    style=\"text-align:left\">purchased_by</th>\n<th style=\"text-align:left\">date_added</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td
    style=\"text-align:right\">1</td>\n<td style=\"text-align:left\">pypeaday</td>\n<td
    style=\"text-align:left\">A sweet item</td>\n<td style=\"text-align:left\">www.mystore.store</td>\n<td
    style=\"text-align:left\">False</td>\n<td style=\"text-align:left\">dad</td>\n<td
    style=\"text-align:left\">2022-05-05 21:55:09</td>\n</tr>\n<tr>\n<td style=\"text-align:right\">2</td>\n<td
    style=\"text-align:left\">pypeaday</td>\n<td style=\"text-align:left\">A bitter
    item</td>\n<td style=\"text-align:left\"><a href=\"http://www.bitterstore.com\">www.bitterstore.com</a></td>\n<td
    style=\"text-align:left\">True</td>\n<td style=\"text-align:left\">Mrs. pypeaday</td>\n<td
    style=\"text-align:left\">2022-05-06 06:55:54</td>\n</tr>\n</tbody>\n</table>\n<p>The
    table is simple enough... A unique key, the person who the wish belongs to, the
    item (or wish), a link to the item, whether it's been purchased or not and by
    whom, and the date it was added.</p>\n<p>To make this model with sqlalchemy we
    can make a <code>model.py</code> like so:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">database</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Base</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy.schema</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">Column</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.types</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Boolean</span><span
    class=\"p\">,</span> <span class=\"n\">Integer</span><span class=\"p\">,</span>
    <span class=\"n\">String</span><span class=\"p\">,</span> <span class=\"n\">Text</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Wishes</span><span
    class=\"p\">(</span><span class=\"n\">Base</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">__tablename__</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;Wishes&quot;</span>\n
    \   <span class=\"nb\">id</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
    class=\"p\">(</span><span class=\"n\">Integer</span><span class=\"p\">,</span>
    <span class=\"n\">primary_key</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">,</span> <span class=\"n\">index</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">)</span>\n    <span class=\"n\">person</span>
    <span class=\"o\">=</span> <span class=\"n\">Column</span><span class=\"p\">(</span><span
    class=\"n\">String</span><span class=\"p\">(</span><span class=\"mi\">20</span><span
    class=\"p\">))</span>\n    <span class=\"n\">item</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
    class=\"p\">())</span>\n    <span class=\"n\">link</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
    class=\"p\">())</span>\n    <span class=\"n\">purchased</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Boolean</span><span
    class=\"p\">())</span>\n    <span class=\"n\">purchased_by</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">String</span><span
    class=\"p\">(</span><span class=\"mi\">90</span><span class=\"p\">))</span>\n
    \   <span class=\"n\">date_added</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
    class=\"p\">(</span><span class=\"n\">String</span><span class=\"p\">(</span><span
    class=\"mi\">15</span><span class=\"p\">))</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"schema\">Schema <a class=\"header-anchor\" href=\"#schema\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the best things
    about FastAPI is trivial integration with pydantic.\nWe can define a schema to
    ensure any data posted is not missing anything!</p>\n<p>Make a <code>schema.py</code>
    with the following:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">pydantic</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">BaseModel</span>\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">time</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Optional</span>\n\n\n<span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">wish_schema</span><span class=\"p\">(</span><span
    class=\"n\">BaseModel</span><span class=\"p\">):</span>\n\n    <span class=\"n\">person</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">item</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">link</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">purchased</span><span
    class=\"p\">:</span> <span class=\"nb\">bool</span> <span class=\"o\">=</span>
    <span class=\"kc\">False</span>\n    <span class=\"n\">purchased_by</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n    <span class=\"n\">date_added</span><span class=\"p\">:</span>
    <span class=\"n\">Optional</span><span class=\"p\">[</span><span class=\"nb\">str</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">strftime</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span class=\"s2\">
    %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">())</span>\n\n
    \   <span class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Config</span><span
    class=\"p\">:</span>\n        <span class=\"n\">orm_mode</span> <span class=\"o\">=</span>
    <span class=\"kc\">True</span>\n\n\n<span class=\"k\">class</span><span class=\"w\">
    </span><span class=\"nc\">patch_schema</span><span class=\"p\">(</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n\n    <span class=\"n\">purchased</span><span class=\"p\">:</span>
    <span class=\"nb\">bool</span>\n    <span class=\"n\">purchased_by</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">class</span><span class=\"w\">
    </span><span class=\"nc\">Config</span><span class=\"p\">:</span>\n        <span
    class=\"n\">orm_mode</span> <span class=\"o\">=</span> <span class=\"kc\">True</span>\n</pre></div>\n\n</pre>\n\n<p>I
    have 2 schemas - one for a <code>wish</code> which you'll see down below is used
    to validate any <code>post</code> requests.</p>\n<p>To simplify things for me
    I made another schema, <code>patch_schema</code> which I use for the route that
    updates the table (ie. marking an existing wish as purchased)</p>\n<h2 id=\"session\">Session
    <a class=\"header-anchor\" href=\"#session\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the last things
    we need is a Session</p>\n<p>So make a <code>session.py</code>...</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">database</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">SessionLocal</span><span class=\"p\">,</span>
    <span class=\"n\">engine</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">model</span>\n\n<span class=\"n\">model</span><span
    class=\"o\">.</span><span class=\"n\">Base</span><span class=\"o\">.</span><span
    class=\"n\">metadata</span><span class=\"o\">.</span><span class=\"n\">create_all</span><span
    class=\"p\">(</span><span class=\"n\">bind</span><span class=\"o\">=</span><span
    class=\"n\">engine</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">create_get_session</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">db</span>
    <span class=\"o\">=</span> <span class=\"n\">SessionLocal</span><span class=\"p\">()</span>\n
    \       <span class=\"k\">yield</span> <span class=\"n\">db</span>\n    <span
    class=\"k\">finally</span><span class=\"p\">:</span>\n        <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">close</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<p>Our
    routes will depend on this <code>create_get_session</code> function that will
    yield a <code>db</code> object through which we'll udpate our database</p>\n<h1
    id=\"ok-just-do-it-already\">Ok just do it already! <a class=\"header-anchor\"
    href=\"#ok-just-do-it-already\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>So our <code>main.py</code>
    will have a few routes in it...</p>\n<p>What do we want to support?</p>\n<ol>\n<li>Getting
    all wishes</li>\n<li>Getting a specific wish</li>\n<li>Updating a specific wish</li>\n<li>Deleting
    a wish</li>\n</ol>\n<p>I think the script is fairly self explanatory but here's
    a few notes...</p>\n<ol>\n<li>We decorate each function with <code>@app.&lt;method&gt;</code>
    and define <code>response_model</code> as well as <code>status_code</code></li>\n<li>The
    functions are defined with <code>async</code> (this was my first exposure to this
    so I can't go in depth on it yet)</li>\n<li>The functions all take a <code>db</code>
    which is from <code>session.py</code> and that <code>db</code> depends on the
    <code>create_get_session</code> function</li>\n<li>If the db is being updtes then
    we type the object used for the update with the appropriate schema (either <code>wish_schema</code>
    or <code>patch_schema</code>)</li>\n</ol>\n<p>From there we're in true python-land
    where you can basically guess the methods on <code>db</code> and you'd probably
    be right... (like <code>query</code>, <code>upddate</code>, <code>delete</code>
    etc.)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">FastAPI</span><span class=\"p\">,</span>
    <span class=\"n\">Depends</span><span class=\"p\">,</span> <span class=\"n\">HTTPException</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Session</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">typing</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">List</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">model</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Wishes</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">schema</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">wish_schema</span><span
    class=\"p\">,</span> <span class=\"n\">patch_schema</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">session</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
    class=\"n\">app</span> <span class=\"o\">=</span> <span class=\"n\">FastAPI</span><span
    class=\"p\">()</span>\n\n\n<span class=\"nd\">@app</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span
    class=\"p\">)</span>\n<span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">read_root</span><span class=\"p\">():</span>\n    <span class=\"k\">return</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;server is up!&quot;</span><span class=\"p\">}</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">response_model</span><span class=\"o\">=</span><span class=\"n\">List</span><span
    class=\"p\">[</span><span class=\"n\">wish_schema</span><span class=\"p\">],</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">read_wishes</span><span class=\"p\">(</span><span
    class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
    <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
    class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n    <span class=\"n\">wishes</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">all</span><span
    class=\"p\">()</span>\n    <span class=\"k\">return</span> <span class=\"n\">wishes</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">post</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">response_model</span><span class=\"o\">=</span><span class=\"n\">wish_schema</span><span
    class=\"p\">,</span> <span class=\"n\">status_code</span><span class=\"o\">=</span><span
    class=\"mi\">201</span><span class=\"p\">)</span>\n<span class=\"k\">async</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">add_wish</span><span
    class=\"p\">(</span><span class=\"n\">wish</span><span class=\"p\">:</span> <span
    class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">)):</span>\n    <span class=\"n\">new_wish</span> <span class=\"o\">=</span>
    <span class=\"n\">Wishes</span><span class=\"p\">(</span>\n        <span class=\"n\">person</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">person</span><span class=\"p\">,</span>\n        <span class=\"n\">item</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">item</span><span class=\"p\">,</span>\n        <span class=\"n\">link</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">link</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased_by</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased_by</span><span class=\"p\">,</span>\n        <span class=\"n\">date_added</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">date_added</span><span class=\"p\">,</span>\n    <span class=\"p\">)</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">add</span><span
    class=\"p\">(</span><span class=\"n\">new_wish</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">commit</span><span
    class=\"p\">()</span>\n\n    <span class=\"k\">return</span> <span class=\"n\">new_wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
    class=\"o\">=</span><span class=\"n\">wish_schema</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">get_wish</span><span class=\"p\">(</span><span
    class=\"nb\">id</span><span class=\"p\">:</span> <span class=\"nb\">int</span><span
    class=\"p\">,</span> <span class=\"n\">db</span><span class=\"p\">:</span> <span
    class=\"n\">Session</span> <span class=\"o\">=</span> <span class=\"n\">Depends</span><span
    class=\"p\">(</span><span class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n
    \   <span class=\"n\">wish</span> <span class=\"o\">=</span> <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">query</span><span class=\"p\">(</span><span
    class=\"n\">Wishes</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
    class=\"p\">)</span>\n    <span class=\"k\">return</span> <span class=\"n\">wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">patch</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
    class=\"o\">=</span><span class=\"n\">wish_schema</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">update_wish</span><span class=\"p\">(</span>\n
    \   <span class=\"nb\">id</span><span class=\"p\">:</span> <span class=\"nb\">int</span><span
    class=\"p\">,</span> <span class=\"n\">patch</span><span class=\"p\">:</span>
    <span class=\"n\">patch_schema</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">)</span>\n<span class=\"p\">):</span>\n    <span class=\"n\">db_wish</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">)</span>\n    <span
    class=\"n\">db_wish</span><span class=\"o\">.</span><span class=\"n\">purchased</span>
    <span class=\"o\">=</span> <span class=\"n\">patch</span><span class=\"o\">.</span><span
    class=\"n\">purchased</span>\n    <span class=\"n\">db_wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased_by</span> <span class=\"o\">=</span> <span class=\"n\">patch</span><span
    class=\"o\">.</span><span class=\"n\">purchased_by</span>\n    <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">commit</span><span class=\"p\">()</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">refresh</span><span
    class=\"p\">(</span><span class=\"n\">db_wish</span><span class=\"p\">)</span>\n\n
    \   <span class=\"k\">return</span> <span class=\"n\">db_wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">delete</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
    class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
    class=\"k\">async</span> <span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">delete_wish</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
    class=\"p\">:</span> <span class=\"nb\">int</span><span class=\"p\">,</span> <span
    class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
    <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
    class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n    <span class=\"n\">db_wish</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">)</span>\n    <span
    class=\"k\">if</span> <span class=\"ow\">not</span> <span class=\"n\">db_wish</span><span
    class=\"p\">:</span>\n        <span class=\"k\">raise</span> <span class=\"n\">HTTPException</span><span
    class=\"p\">(</span><span class=\"n\">status_code</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;404&quot;</span><span class=\"p\">,</span> <span class=\"n\">detail</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;Wish id does not exist&quot;</span><span
    class=\"p\">)</span>\n\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">delete</span><span class=\"p\">(</span><span class=\"n\">db_wish</span><span
    class=\"p\">)</span>\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">commit</span><span class=\"p\">()</span>\n\n    <span class=\"k\">return</span>
    <span class=\"kc\">None</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"my-code\">My
    Code <a class=\"header-anchor\" href=\"#my-code\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>You can find my repo
    <a href=\"https://github.com/nicpayne713/wish-lists\">here</a>.</p>\n<p>I'll plan
    to update and maintain for as long as I use it</p>\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Wish-List-With-Fastapi</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Amazon has crossed the line with me just
    one too many times now so we are looking to drop them like every other Big Tech
    provider.... However, one key feature o\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Wish-List-With-Fastapi | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/wish-list-with-fastapi\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Wish-List-With-Fastapi | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Amazon has crossed the line with me just one too many times now so we
    are looking to drop them like every other Big Tech provider.... However, one key
    feature o\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">Wish-List-With-Fastapi</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-06\">\n            May
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/blog/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #blog\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n\n    <article class=\"post-terminal__article\">\n<section
    class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height:
    1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text
    mb-4 post-title-large\">Wish-List-With-Fastapi</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-05-06\">\n            May
    06, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/blog/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #blog\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>Amazon has crossed the line with me
    just one too many times now so we are looking to drop them like every other Big
    Tech provider....</p>\n<p>However, one key feature of Amazon that has been so
    useful for us is Lists... We can just maintain a list for each of us and then
    family members can login anytime and check it out...\nThis really alleviates any
    last minute gift idea stress right before a birthday or something.</p>\n<p>So
    I need a nice gift list service but I don't want to be locked into one company
    (like a Target registry or something) and I'd like to host it myself</p>\n<p>The
    internets had a few options but nothing looked/felt like I wanted to I decided
    to build my own.</p>\n<h1 id=\"the-frontend\">The Frontend <a class=\"header-anchor\"
    href=\"#the-frontend\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>I have no idea
    how to do front end so stay tuned</strong></p>\n<h1 id=\"the-backend\">The Backend
    <a class=\"header-anchor\" href=\"#the-backend\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>FastAPI for the win
    on this one... I followed a few examples online and what I was able to build in
    just a few minutes is pretty impressive thanks to the design of FastAPI.</p>\n<p>Some
    key features are:</p>\n<ol>\n<li>Auto doc generation</li>\n<li>Required typing
    (which makes #1 possible)</li>\n<li>Built-in api testing in the browser</li>\n<li>Easy
    integration with sqlalchemy</li>\n<li>Development time so short you won't be done
    with your coffee before having something up and running!</li>\n</ol>\n<h2 id=\"database\">Database
    <a class=\"header-anchor\" href=\"#database\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Starting with a simple
    <code>database.py</code> we can create a sqlalchemy session with a base model
    with about 7 lines of code...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">create_engine</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy.ext.declarative</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">declarative_base</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">sessionmaker</span>\n\n\n<span
    class=\"n\">SQLALCHEMY_DATABASE_URL</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;sqlite:///wishes.sqlite3&quot;</span>\n<span
    class=\"n\">engine</span> <span class=\"o\">=</span> <span class=\"n\">create_engine</span><span
    class=\"p\">(</span><span class=\"n\">SQLALCHEMY_DATABASE_URL</span><span class=\"p\">)</span>\n<span
    class=\"n\">SessionLocal</span> <span class=\"o\">=</span> <span class=\"n\">sessionmaker</span><span
    class=\"p\">(</span><span class=\"n\">autocommit</span><span class=\"o\">=</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"n\">autoflush</span><span
    class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span>
    <span class=\"n\">bind</span><span class=\"o\">=</span><span class=\"n\">engine</span><span
    class=\"p\">)</span>\n<span class=\"n\">Base</span> <span class=\"o\">=</span>
    <span class=\"n\">declarative_base</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"model\">Model <a class=\"header-anchor\" href=\"#model\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>For my wish list I needed
    just a simple table:</p>\n<table>\n<thead>\n<tr>\n<th style=\"text-align:right\">id</th>\n<th
    style=\"text-align:left\">person</th>\n<th style=\"text-align:left\">item</th>\n<th
    style=\"text-align:left\">link</th>\n<th style=\"text-align:left\">purchased</th>\n<th
    style=\"text-align:left\">purchased_by</th>\n<th style=\"text-align:left\">date_added</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td
    style=\"text-align:right\">1</td>\n<td style=\"text-align:left\">pypeaday</td>\n<td
    style=\"text-align:left\">A sweet item</td>\n<td style=\"text-align:left\">www.mystore.store</td>\n<td
    style=\"text-align:left\">False</td>\n<td style=\"text-align:left\">dad</td>\n<td
    style=\"text-align:left\">2022-05-05 21:55:09</td>\n</tr>\n<tr>\n<td style=\"text-align:right\">2</td>\n<td
    style=\"text-align:left\">pypeaday</td>\n<td style=\"text-align:left\">A bitter
    item</td>\n<td style=\"text-align:left\"><a href=\"http://www.bitterstore.com\">www.bitterstore.com</a></td>\n<td
    style=\"text-align:left\">True</td>\n<td style=\"text-align:left\">Mrs. pypeaday</td>\n<td
    style=\"text-align:left\">2022-05-06 06:55:54</td>\n</tr>\n</tbody>\n</table>\n<p>The
    table is simple enough... A unique key, the person who the wish belongs to, the
    item (or wish), a link to the item, whether it's been purchased or not and by
    whom, and the date it was added.</p>\n<p>To make this model with sqlalchemy we
    can make a <code>model.py</code> like so:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">database</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Base</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy.schema</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">Column</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.types</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Boolean</span><span
    class=\"p\">,</span> <span class=\"n\">Integer</span><span class=\"p\">,</span>
    <span class=\"n\">String</span><span class=\"p\">,</span> <span class=\"n\">Text</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Wishes</span><span
    class=\"p\">(</span><span class=\"n\">Base</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">__tablename__</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;Wishes&quot;</span>\n
    \   <span class=\"nb\">id</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
    class=\"p\">(</span><span class=\"n\">Integer</span><span class=\"p\">,</span>
    <span class=\"n\">primary_key</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">,</span> <span class=\"n\">index</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">)</span>\n    <span class=\"n\">person</span>
    <span class=\"o\">=</span> <span class=\"n\">Column</span><span class=\"p\">(</span><span
    class=\"n\">String</span><span class=\"p\">(</span><span class=\"mi\">20</span><span
    class=\"p\">))</span>\n    <span class=\"n\">item</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
    class=\"p\">())</span>\n    <span class=\"n\">link</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
    class=\"p\">())</span>\n    <span class=\"n\">purchased</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Boolean</span><span
    class=\"p\">())</span>\n    <span class=\"n\">purchased_by</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">String</span><span
    class=\"p\">(</span><span class=\"mi\">90</span><span class=\"p\">))</span>\n
    \   <span class=\"n\">date_added</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
    class=\"p\">(</span><span class=\"n\">String</span><span class=\"p\">(</span><span
    class=\"mi\">15</span><span class=\"p\">))</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"schema\">Schema <a class=\"header-anchor\" href=\"#schema\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the best things
    about FastAPI is trivial integration with pydantic.\nWe can define a schema to
    ensure any data posted is not missing anything!</p>\n<p>Make a <code>schema.py</code>
    with the following:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">pydantic</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">BaseModel</span>\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">time</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Optional</span>\n\n\n<span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">wish_schema</span><span class=\"p\">(</span><span
    class=\"n\">BaseModel</span><span class=\"p\">):</span>\n\n    <span class=\"n\">person</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">item</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">link</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">purchased</span><span
    class=\"p\">:</span> <span class=\"nb\">bool</span> <span class=\"o\">=</span>
    <span class=\"kc\">False</span>\n    <span class=\"n\">purchased_by</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n    <span class=\"n\">date_added</span><span class=\"p\">:</span>
    <span class=\"n\">Optional</span><span class=\"p\">[</span><span class=\"nb\">str</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">strftime</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span class=\"s2\">
    %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">())</span>\n\n
    \   <span class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Config</span><span
    class=\"p\">:</span>\n        <span class=\"n\">orm_mode</span> <span class=\"o\">=</span>
    <span class=\"kc\">True</span>\n\n\n<span class=\"k\">class</span><span class=\"w\">
    </span><span class=\"nc\">patch_schema</span><span class=\"p\">(</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n\n    <span class=\"n\">purchased</span><span class=\"p\">:</span>
    <span class=\"nb\">bool</span>\n    <span class=\"n\">purchased_by</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">class</span><span class=\"w\">
    </span><span class=\"nc\">Config</span><span class=\"p\">:</span>\n        <span
    class=\"n\">orm_mode</span> <span class=\"o\">=</span> <span class=\"kc\">True</span>\n</pre></div>\n\n</pre>\n\n<p>I
    have 2 schemas - one for a <code>wish</code> which you'll see down below is used
    to validate any <code>post</code> requests.</p>\n<p>To simplify things for me
    I made another schema, <code>patch_schema</code> which I use for the route that
    updates the table (ie. marking an existing wish as purchased)</p>\n<h2 id=\"session\">Session
    <a class=\"header-anchor\" href=\"#session\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the last things
    we need is a Session</p>\n<p>So make a <code>session.py</code>...</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">database</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">SessionLocal</span><span class=\"p\">,</span>
    <span class=\"n\">engine</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">model</span>\n\n<span class=\"n\">model</span><span
    class=\"o\">.</span><span class=\"n\">Base</span><span class=\"o\">.</span><span
    class=\"n\">metadata</span><span class=\"o\">.</span><span class=\"n\">create_all</span><span
    class=\"p\">(</span><span class=\"n\">bind</span><span class=\"o\">=</span><span
    class=\"n\">engine</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">create_get_session</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">db</span>
    <span class=\"o\">=</span> <span class=\"n\">SessionLocal</span><span class=\"p\">()</span>\n
    \       <span class=\"k\">yield</span> <span class=\"n\">db</span>\n    <span
    class=\"k\">finally</span><span class=\"p\">:</span>\n        <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">close</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<p>Our
    routes will depend on this <code>create_get_session</code> function that will
    yield a <code>db</code> object through which we'll udpate our database</p>\n<h1
    id=\"ok-just-do-it-already\">Ok just do it already! <a class=\"header-anchor\"
    href=\"#ok-just-do-it-already\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>So our <code>main.py</code>
    will have a few routes in it...</p>\n<p>What do we want to support?</p>\n<ol>\n<li>Getting
    all wishes</li>\n<li>Getting a specific wish</li>\n<li>Updating a specific wish</li>\n<li>Deleting
    a wish</li>\n</ol>\n<p>I think the script is fairly self explanatory but here's
    a few notes...</p>\n<ol>\n<li>We decorate each function with <code>@app.&lt;method&gt;</code>
    and define <code>response_model</code> as well as <code>status_code</code></li>\n<li>The
    functions are defined with <code>async</code> (this was my first exposure to this
    so I can't go in depth on it yet)</li>\n<li>The functions all take a <code>db</code>
    which is from <code>session.py</code> and that <code>db</code> depends on the
    <code>create_get_session</code> function</li>\n<li>If the db is being updtes then
    we type the object used for the update with the appropriate schema (either <code>wish_schema</code>
    or <code>patch_schema</code>)</li>\n</ol>\n<p>From there we're in true python-land
    where you can basically guess the methods on <code>db</code> and you'd probably
    be right... (like <code>query</code>, <code>upddate</code>, <code>delete</code>
    etc.)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">FastAPI</span><span class=\"p\">,</span>
    <span class=\"n\">Depends</span><span class=\"p\">,</span> <span class=\"n\">HTTPException</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Session</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">typing</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">List</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">model</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Wishes</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">schema</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">wish_schema</span><span
    class=\"p\">,</span> <span class=\"n\">patch_schema</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">session</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
    class=\"n\">app</span> <span class=\"o\">=</span> <span class=\"n\">FastAPI</span><span
    class=\"p\">()</span>\n\n\n<span class=\"nd\">@app</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span
    class=\"p\">)</span>\n<span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">read_root</span><span class=\"p\">():</span>\n    <span class=\"k\">return</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;server is up!&quot;</span><span class=\"p\">}</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">response_model</span><span class=\"o\">=</span><span class=\"n\">List</span><span
    class=\"p\">[</span><span class=\"n\">wish_schema</span><span class=\"p\">],</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">read_wishes</span><span class=\"p\">(</span><span
    class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
    <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
    class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n    <span class=\"n\">wishes</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">all</span><span
    class=\"p\">()</span>\n    <span class=\"k\">return</span> <span class=\"n\">wishes</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">post</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">response_model</span><span class=\"o\">=</span><span class=\"n\">wish_schema</span><span
    class=\"p\">,</span> <span class=\"n\">status_code</span><span class=\"o\">=</span><span
    class=\"mi\">201</span><span class=\"p\">)</span>\n<span class=\"k\">async</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">add_wish</span><span
    class=\"p\">(</span><span class=\"n\">wish</span><span class=\"p\">:</span> <span
    class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">)):</span>\n    <span class=\"n\">new_wish</span> <span class=\"o\">=</span>
    <span class=\"n\">Wishes</span><span class=\"p\">(</span>\n        <span class=\"n\">person</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">person</span><span class=\"p\">,</span>\n        <span class=\"n\">item</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">item</span><span class=\"p\">,</span>\n        <span class=\"n\">link</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">link</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased_by</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased_by</span><span class=\"p\">,</span>\n        <span class=\"n\">date_added</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">date_added</span><span class=\"p\">,</span>\n    <span class=\"p\">)</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">add</span><span
    class=\"p\">(</span><span class=\"n\">new_wish</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">commit</span><span
    class=\"p\">()</span>\n\n    <span class=\"k\">return</span> <span class=\"n\">new_wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
    class=\"o\">=</span><span class=\"n\">wish_schema</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">get_wish</span><span class=\"p\">(</span><span
    class=\"nb\">id</span><span class=\"p\">:</span> <span class=\"nb\">int</span><span
    class=\"p\">,</span> <span class=\"n\">db</span><span class=\"p\">:</span> <span
    class=\"n\">Session</span> <span class=\"o\">=</span> <span class=\"n\">Depends</span><span
    class=\"p\">(</span><span class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n
    \   <span class=\"n\">wish</span> <span class=\"o\">=</span> <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">query</span><span class=\"p\">(</span><span
    class=\"n\">Wishes</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
    class=\"p\">)</span>\n    <span class=\"k\">return</span> <span class=\"n\">wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">patch</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
    class=\"o\">=</span><span class=\"n\">wish_schema</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">update_wish</span><span class=\"p\">(</span>\n
    \   <span class=\"nb\">id</span><span class=\"p\">:</span> <span class=\"nb\">int</span><span
    class=\"p\">,</span> <span class=\"n\">patch</span><span class=\"p\">:</span>
    <span class=\"n\">patch_schema</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">)</span>\n<span class=\"p\">):</span>\n    <span class=\"n\">db_wish</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">)</span>\n    <span
    class=\"n\">db_wish</span><span class=\"o\">.</span><span class=\"n\">purchased</span>
    <span class=\"o\">=</span> <span class=\"n\">patch</span><span class=\"o\">.</span><span
    class=\"n\">purchased</span>\n    <span class=\"n\">db_wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased_by</span> <span class=\"o\">=</span> <span class=\"n\">patch</span><span
    class=\"o\">.</span><span class=\"n\">purchased_by</span>\n    <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">commit</span><span class=\"p\">()</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">refresh</span><span
    class=\"p\">(</span><span class=\"n\">db_wish</span><span class=\"p\">)</span>\n\n
    \   <span class=\"k\">return</span> <span class=\"n\">db_wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">delete</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
    class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
    class=\"k\">async</span> <span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">delete_wish</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
    class=\"p\">:</span> <span class=\"nb\">int</span><span class=\"p\">,</span> <span
    class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
    <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
    class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n    <span class=\"n\">db_wish</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">)</span>\n    <span
    class=\"k\">if</span> <span class=\"ow\">not</span> <span class=\"n\">db_wish</span><span
    class=\"p\">:</span>\n        <span class=\"k\">raise</span> <span class=\"n\">HTTPException</span><span
    class=\"p\">(</span><span class=\"n\">status_code</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;404&quot;</span><span class=\"p\">,</span> <span class=\"n\">detail</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;Wish id does not exist&quot;</span><span
    class=\"p\">)</span>\n\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">delete</span><span class=\"p\">(</span><span class=\"n\">db_wish</span><span
    class=\"p\">)</span>\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">commit</span><span class=\"p\">()</span>\n\n    <span class=\"k\">return</span>
    <span class=\"kc\">None</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"my-code\">My
    Code <a class=\"header-anchor\" href=\"#my-code\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>You can find my repo
    <a href=\"https://github.com/nicpayne713/wish-lists\">here</a>.</p>\n<p>I'll plan
    to update and maintain for as long as I use it</p>\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Wish-List-With-Fastapi</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Amazon has crossed the line with me just
    one too many times now so we are looking to drop them like every other Big Tech
    provider.... However, one key feature o\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Wish-List-With-Fastapi | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/wish-list-with-fastapi\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Wish-List-With-Fastapi | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Amazon has crossed the line with me just one too many times now so we
    are looking to drop them like every other Big Tech provider.... However, one key
    feature o\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \           <span class=\"site-terminal__dir\">~/wish-list-with-fastapi</span>\n
    \       </div>\n        <div class=\"site-terminal__meta\">infra \xB7 automation
    \xB7 writing</div>\n    </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n        <a class=\"site-terminal__link\"
    href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n    </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role:
    developer // infra</span>\n        <span>favorite tools: tmux \xB7 kubectl \xB7
    nix \xB7 ansible</span>\n    </div>\n</header><div id='didyoumean'>\n    <div
    class=\"mb-0\">\n        <!-- <label for=\"search\" class=\"block text-sm font-medium
    mb-2\">Search for a page</label> -->\n        <input type=\"text\" id=\"search\"\n
    \              class=\"w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800
    focus:ring-2 focus:ring-pink-500\"\n               placeholder=\"'/' Search for
    a page\">\n    </div>\n\n    <!-- <div id=\"didyoumean_results\" class=\"grid
    gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3\"> -->\n    <ul id=\"didyoumean_results\"
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    <!--
    Content is handled by the password protection plugin -->\n    <p>Amazon has crossed
    the line with me just one too many times now so we are looking to drop them like
    every other Big Tech provider....</p>\n<p>However, one key feature of Amazon that
    has been so useful for us is Lists... We can just maintain a list for each of
    us and then family members can login anytime and check it out...\nThis really
    alleviates any last minute gift idea stress right before a birthday or something.</p>\n<p>So
    I need a nice gift list service but I don't want to be locked into one company
    (like a Target registry or something) and I'd like to host it myself</p>\n<p>The
    internets had a few options but nothing looked/felt like I wanted to I decided
    to build my own.</p>\n<h1 id=\"the-frontend\">The Frontend <a class=\"header-anchor\"
    href=\"#the-frontend\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p><strong>I have no idea
    how to do front end so stay tuned</strong></p>\n<h1 id=\"the-backend\">The Backend
    <a class=\"header-anchor\" href=\"#the-backend\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>FastAPI for the win
    on this one... I followed a few examples online and what I was able to build in
    just a few minutes is pretty impressive thanks to the design of FastAPI.</p>\n<p>Some
    key features are:</p>\n<ol>\n<li>Auto doc generation</li>\n<li>Required typing
    (which makes #1 possible)</li>\n<li>Built-in api testing in the browser</li>\n<li>Easy
    integration with sqlalchemy</li>\n<li>Development time so short you won't be done
    with your coffee before having something up and running!</li>\n</ol>\n<h2 id=\"database\">Database
    <a class=\"header-anchor\" href=\"#database\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Starting with a simple
    <code>database.py</code> we can create a sqlalchemy session with a base model
    with about 7 lines of code...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">create_engine</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy.ext.declarative</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">declarative_base</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">sessionmaker</span>\n\n\n<span
    class=\"n\">SQLALCHEMY_DATABASE_URL</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;sqlite:///wishes.sqlite3&quot;</span>\n<span
    class=\"n\">engine</span> <span class=\"o\">=</span> <span class=\"n\">create_engine</span><span
    class=\"p\">(</span><span class=\"n\">SQLALCHEMY_DATABASE_URL</span><span class=\"p\">)</span>\n<span
    class=\"n\">SessionLocal</span> <span class=\"o\">=</span> <span class=\"n\">sessionmaker</span><span
    class=\"p\">(</span><span class=\"n\">autocommit</span><span class=\"o\">=</span><span
    class=\"kc\">False</span><span class=\"p\">,</span> <span class=\"n\">autoflush</span><span
    class=\"o\">=</span><span class=\"kc\">False</span><span class=\"p\">,</span>
    <span class=\"n\">bind</span><span class=\"o\">=</span><span class=\"n\">engine</span><span
    class=\"p\">)</span>\n<span class=\"n\">Base</span> <span class=\"o\">=</span>
    <span class=\"n\">declarative_base</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"model\">Model <a class=\"header-anchor\" href=\"#model\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>For my wish list I needed
    just a simple table:</p>\n<table>\n<thead>\n<tr>\n<th style=\"text-align:right\">id</th>\n<th
    style=\"text-align:left\">person</th>\n<th style=\"text-align:left\">item</th>\n<th
    style=\"text-align:left\">link</th>\n<th style=\"text-align:left\">purchased</th>\n<th
    style=\"text-align:left\">purchased_by</th>\n<th style=\"text-align:left\">date_added</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td
    style=\"text-align:right\">1</td>\n<td style=\"text-align:left\">pypeaday</td>\n<td
    style=\"text-align:left\">A sweet item</td>\n<td style=\"text-align:left\">www.mystore.store</td>\n<td
    style=\"text-align:left\">False</td>\n<td style=\"text-align:left\">dad</td>\n<td
    style=\"text-align:left\">2022-05-05 21:55:09</td>\n</tr>\n<tr>\n<td style=\"text-align:right\">2</td>\n<td
    style=\"text-align:left\">pypeaday</td>\n<td style=\"text-align:left\">A bitter
    item</td>\n<td style=\"text-align:left\"><a href=\"http://www.bitterstore.com\">www.bitterstore.com</a></td>\n<td
    style=\"text-align:left\">True</td>\n<td style=\"text-align:left\">Mrs. pypeaday</td>\n<td
    style=\"text-align:left\">2022-05-06 06:55:54</td>\n</tr>\n</tbody>\n</table>\n<p>The
    table is simple enough... A unique key, the person who the wish belongs to, the
    item (or wish), a link to the item, whether it's been purchased or not and by
    whom, and the date it was added.</p>\n<p>To make this model with sqlalchemy we
    can make a <code>model.py</code> like so:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">database</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Base</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">sqlalchemy.schema</span><span class=\"w\">
    </span><span class=\"kn\">import</span> <span class=\"n\">Column</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.types</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Boolean</span><span
    class=\"p\">,</span> <span class=\"n\">Integer</span><span class=\"p\">,</span>
    <span class=\"n\">String</span><span class=\"p\">,</span> <span class=\"n\">Text</span>\n\n\n<span
    class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Wishes</span><span
    class=\"p\">(</span><span class=\"n\">Base</span><span class=\"p\">):</span>\n
    \   <span class=\"n\">__tablename__</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;Wishes&quot;</span>\n
    \   <span class=\"nb\">id</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
    class=\"p\">(</span><span class=\"n\">Integer</span><span class=\"p\">,</span>
    <span class=\"n\">primary_key</span><span class=\"o\">=</span><span class=\"kc\">True</span><span
    class=\"p\">,</span> <span class=\"n\">index</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">)</span>\n    <span class=\"n\">person</span>
    <span class=\"o\">=</span> <span class=\"n\">Column</span><span class=\"p\">(</span><span
    class=\"n\">String</span><span class=\"p\">(</span><span class=\"mi\">20</span><span
    class=\"p\">))</span>\n    <span class=\"n\">item</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
    class=\"p\">())</span>\n    <span class=\"n\">link</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Text</span><span
    class=\"p\">())</span>\n    <span class=\"n\">purchased</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">Boolean</span><span
    class=\"p\">())</span>\n    <span class=\"n\">purchased_by</span> <span class=\"o\">=</span>
    <span class=\"n\">Column</span><span class=\"p\">(</span><span class=\"n\">String</span><span
    class=\"p\">(</span><span class=\"mi\">90</span><span class=\"p\">))</span>\n
    \   <span class=\"n\">date_added</span> <span class=\"o\">=</span> <span class=\"n\">Column</span><span
    class=\"p\">(</span><span class=\"n\">String</span><span class=\"p\">(</span><span
    class=\"mi\">15</span><span class=\"p\">))</span>\n</pre></div>\n\n</pre>\n\n<h2
    id=\"schema\">Schema <a class=\"header-anchor\" href=\"#schema\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the best things
    about FastAPI is trivial integration with pydantic.\nWe can define a schema to
    ensure any data posted is not missing anything!</p>\n<p>Make a <code>schema.py</code>
    with the following:</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
    class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">pydantic</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">BaseModel</span>\n<span class=\"kn\">import</span><span
    class=\"w\"> </span><span class=\"nn\">time</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">typing</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">Optional</span>\n\n\n<span class=\"k\">class</span><span
    class=\"w\"> </span><span class=\"nc\">wish_schema</span><span class=\"p\">(</span><span
    class=\"n\">BaseModel</span><span class=\"p\">):</span>\n\n    <span class=\"n\">person</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">item</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">link</span><span
    class=\"p\">:</span> <span class=\"nb\">str</span>\n    <span class=\"n\">purchased</span><span
    class=\"p\">:</span> <span class=\"nb\">bool</span> <span class=\"o\">=</span>
    <span class=\"kc\">False</span>\n    <span class=\"n\">purchased_by</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n    <span class=\"n\">date_added</span><span class=\"p\">:</span>
    <span class=\"n\">Optional</span><span class=\"p\">[</span><span class=\"nb\">str</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">strftime</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;%Y-%m-</span><span class=\"si\">%d</span><span class=\"s2\">
    %H:%M:%S&quot;</span><span class=\"p\">,</span> <span class=\"n\">time</span><span
    class=\"o\">.</span><span class=\"n\">localtime</span><span class=\"p\">())</span>\n\n
    \   <span class=\"k\">class</span><span class=\"w\"> </span><span class=\"nc\">Config</span><span
    class=\"p\">:</span>\n        <span class=\"n\">orm_mode</span> <span class=\"o\">=</span>
    <span class=\"kc\">True</span>\n\n\n<span class=\"k\">class</span><span class=\"w\">
    </span><span class=\"nc\">patch_schema</span><span class=\"p\">(</span><span class=\"n\">BaseModel</span><span
    class=\"p\">):</span>\n\n    <span class=\"n\">purchased</span><span class=\"p\">:</span>
    <span class=\"nb\">bool</span>\n    <span class=\"n\">purchased_by</span><span
    class=\"p\">:</span> <span class=\"n\">Optional</span><span class=\"p\">[</span><span
    class=\"nb\">str</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span
    class=\"kc\">None</span>\n\n    <span class=\"k\">class</span><span class=\"w\">
    </span><span class=\"nc\">Config</span><span class=\"p\">:</span>\n        <span
    class=\"n\">orm_mode</span> <span class=\"o\">=</span> <span class=\"kc\">True</span>\n</pre></div>\n\n</pre>\n\n<p>I
    have 2 schemas - one for a <code>wish</code> which you'll see down below is used
    to validate any <code>post</code> requests.</p>\n<p>To simplify things for me
    I made another schema, <code>patch_schema</code> which I use for the route that
    updates the table (ie. marking an existing wish as purchased)</p>\n<h2 id=\"session\">Session
    <a class=\"header-anchor\" href=\"#session\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>One of the last things
    we need is a Session</p>\n<p>So make a <code>session.py</code>...</p>\n<pre class='wrapper'>\n\n<div
    class='copy-wrapper'>\n\n<button class='copy' title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">database</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">SessionLocal</span><span class=\"p\">,</span>
    <span class=\"n\">engine</span>\n<span class=\"kn\">import</span><span class=\"w\">
    </span><span class=\"nn\">model</span>\n\n<span class=\"n\">model</span><span
    class=\"o\">.</span><span class=\"n\">Base</span><span class=\"o\">.</span><span
    class=\"n\">metadata</span><span class=\"o\">.</span><span class=\"n\">create_all</span><span
    class=\"p\">(</span><span class=\"n\">bind</span><span class=\"o\">=</span><span
    class=\"n\">engine</span><span class=\"p\">)</span>\n\n\n<span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">create_get_session</span><span class=\"p\">():</span>\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">db</span>
    <span class=\"o\">=</span> <span class=\"n\">SessionLocal</span><span class=\"p\">()</span>\n
    \       <span class=\"k\">yield</span> <span class=\"n\">db</span>\n    <span
    class=\"k\">finally</span><span class=\"p\">:</span>\n        <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">close</span><span class=\"p\">()</span>\n</pre></div>\n\n</pre>\n\n<p>Our
    routes will depend on this <code>create_get_session</code> function that will
    yield a <code>db</code> object through which we'll udpate our database</p>\n<h1
    id=\"ok-just-do-it-already\">Ok just do it already! <a class=\"header-anchor\"
    href=\"#ok-just-do-it-already\"><svg class=\"heading-permalink\" aria-hidden=\"true\"
    fill=\"currentColor\" focusable=\"false\" height=\"1em\" viewBox=\"0 0 24 24\"
    width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.199 13.599a5.99
    5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0
    0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003
    6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985
    3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005
    3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201
    13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995
    2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0
    0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836
    19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997
    0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>So our <code>main.py</code>
    will have a few routes in it...</p>\n<p>What do we want to support?</p>\n<ol>\n<li>Getting
    all wishes</li>\n<li>Getting a specific wish</li>\n<li>Updating a specific wish</li>\n<li>Deleting
    a wish</li>\n</ol>\n<p>I think the script is fairly self explanatory but here's
    a few notes...</p>\n<ol>\n<li>We decorate each function with <code>@app.&lt;method&gt;</code>
    and define <code>response_model</code> as well as <code>status_code</code></li>\n<li>The
    functions are defined with <code>async</code> (this was my first exposure to this
    so I can't go in depth on it yet)</li>\n<li>The functions all take a <code>db</code>
    which is from <code>session.py</code> and that <code>db</code> depends on the
    <code>create_get_session</code> function</li>\n<li>If the db is being updtes then
    we type the object used for the update with the appropriate schema (either <code>wish_schema</code>
    or <code>patch_schema</code>)</li>\n</ol>\n<p>From there we're in true python-land
    where you can basically guess the methods on <code>db</code> and you'd probably
    be right... (like <code>query</code>, <code>upddate</code>, <code>delete</code>
    etc.)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
    title='copy code to clipboard' onclick=\"navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('pre').textContent)\"><svg
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">fastapi</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">FastAPI</span><span class=\"p\">,</span>
    <span class=\"n\">Depends</span><span class=\"p\">,</span> <span class=\"n\">HTTPException</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">sqlalchemy.orm</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Session</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">typing</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">List</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">model</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">Wishes</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">schema</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">wish_schema</span><span
    class=\"p\">,</span> <span class=\"n\">patch_schema</span>\n<span class=\"kn\">from</span><span
    class=\"w\"> </span><span class=\"nn\">session</span><span class=\"w\"> </span><span
    class=\"kn\">import</span> <span class=\"n\">create_get_session</span>\n\n<span
    class=\"n\">app</span> <span class=\"o\">=</span> <span class=\"n\">FastAPI</span><span
    class=\"p\">()</span>\n\n\n<span class=\"nd\">@app</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;/&quot;</span><span
    class=\"p\">)</span>\n<span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">read_root</span><span class=\"p\">():</span>\n    <span class=\"k\">return</span>
    <span class=\"p\">{</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;server is up!&quot;</span><span class=\"p\">}</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">response_model</span><span class=\"o\">=</span><span class=\"n\">List</span><span
    class=\"p\">[</span><span class=\"n\">wish_schema</span><span class=\"p\">],</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">read_wishes</span><span class=\"p\">(</span><span
    class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
    <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
    class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n    <span class=\"n\">wishes</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">all</span><span
    class=\"p\">()</span>\n    <span class=\"k\">return</span> <span class=\"n\">wishes</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">post</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">response_model</span><span class=\"o\">=</span><span class=\"n\">wish_schema</span><span
    class=\"p\">,</span> <span class=\"n\">status_code</span><span class=\"o\">=</span><span
    class=\"mi\">201</span><span class=\"p\">)</span>\n<span class=\"k\">async</span>
    <span class=\"k\">def</span><span class=\"w\"> </span><span class=\"nf\">add_wish</span><span
    class=\"p\">(</span><span class=\"n\">wish</span><span class=\"p\">:</span> <span
    class=\"n\">wish_schema</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">)):</span>\n    <span class=\"n\">new_wish</span> <span class=\"o\">=</span>
    <span class=\"n\">Wishes</span><span class=\"p\">(</span>\n        <span class=\"n\">person</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">person</span><span class=\"p\">,</span>\n        <span class=\"n\">item</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">item</span><span class=\"p\">,</span>\n        <span class=\"n\">link</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">link</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased</span><span class=\"p\">,</span>\n        <span class=\"n\">purchased_by</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased_by</span><span class=\"p\">,</span>\n        <span class=\"n\">date_added</span><span
    class=\"o\">=</span><span class=\"n\">wish</span><span class=\"o\">.</span><span
    class=\"n\">date_added</span><span class=\"p\">,</span>\n    <span class=\"p\">)</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">add</span><span
    class=\"p\">(</span><span class=\"n\">new_wish</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">commit</span><span
    class=\"p\">()</span>\n\n    <span class=\"k\">return</span> <span class=\"n\">new_wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
    class=\"o\">=</span><span class=\"n\">wish_schema</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">get_wish</span><span class=\"p\">(</span><span
    class=\"nb\">id</span><span class=\"p\">:</span> <span class=\"nb\">int</span><span
    class=\"p\">,</span> <span class=\"n\">db</span><span class=\"p\">:</span> <span
    class=\"n\">Session</span> <span class=\"o\">=</span> <span class=\"n\">Depends</span><span
    class=\"p\">(</span><span class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n
    \   <span class=\"n\">wish</span> <span class=\"o\">=</span> <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">query</span><span class=\"p\">(</span><span
    class=\"n\">Wishes</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
    class=\"p\">)</span>\n    <span class=\"k\">return</span> <span class=\"n\">wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">patch</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">response_model</span><span
    class=\"o\">=</span><span class=\"n\">wish_schema</span><span class=\"p\">,</span>
    <span class=\"n\">status_code</span><span class=\"o\">=</span><span class=\"mi\">200</span><span
    class=\"p\">)</span>\n<span class=\"k\">async</span> <span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">update_wish</span><span class=\"p\">(</span>\n
    \   <span class=\"nb\">id</span><span class=\"p\">:</span> <span class=\"nb\">int</span><span
    class=\"p\">,</span> <span class=\"n\">patch</span><span class=\"p\">:</span>
    <span class=\"n\">patch_schema</span><span class=\"p\">,</span> <span class=\"n\">db</span><span
    class=\"p\">:</span> <span class=\"n\">Session</span> <span class=\"o\">=</span>
    <span class=\"n\">Depends</span><span class=\"p\">(</span><span class=\"n\">create_get_session</span><span
    class=\"p\">)</span>\n<span class=\"p\">):</span>\n    <span class=\"n\">db_wish</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">)</span>\n    <span
    class=\"n\">db_wish</span><span class=\"o\">.</span><span class=\"n\">purchased</span>
    <span class=\"o\">=</span> <span class=\"n\">patch</span><span class=\"o\">.</span><span
    class=\"n\">purchased</span>\n    <span class=\"n\">db_wish</span><span class=\"o\">.</span><span
    class=\"n\">purchased_by</span> <span class=\"o\">=</span> <span class=\"n\">patch</span><span
    class=\"o\">.</span><span class=\"n\">purchased_by</span>\n    <span class=\"n\">db</span><span
    class=\"o\">.</span><span class=\"n\">commit</span><span class=\"p\">()</span>\n
    \   <span class=\"n\">db</span><span class=\"o\">.</span><span class=\"n\">refresh</span><span
    class=\"p\">(</span><span class=\"n\">db_wish</span><span class=\"p\">)</span>\n\n
    \   <span class=\"k\">return</span> <span class=\"n\">db_wish</span>\n\n\n<span
    class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">delete</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;/wishes/</span><span class=\"si\">{id}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">,</span> <span class=\"n\">status_code</span><span
    class=\"o\">=</span><span class=\"mi\">200</span><span class=\"p\">)</span>\n<span
    class=\"k\">async</span> <span class=\"k\">def</span><span class=\"w\"> </span><span
    class=\"nf\">delete_wish</span><span class=\"p\">(</span><span class=\"nb\">id</span><span
    class=\"p\">:</span> <span class=\"nb\">int</span><span class=\"p\">,</span> <span
    class=\"n\">db</span><span class=\"p\">:</span> <span class=\"n\">Session</span>
    <span class=\"o\">=</span> <span class=\"n\">Depends</span><span class=\"p\">(</span><span
    class=\"n\">create_get_session</span><span class=\"p\">)):</span>\n    <span class=\"n\">db_wish</span>
    <span class=\"o\">=</span> <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">query</span><span class=\"p\">(</span><span class=\"n\">Wishes</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"nb\">id</span><span class=\"p\">)</span>\n    <span
    class=\"k\">if</span> <span class=\"ow\">not</span> <span class=\"n\">db_wish</span><span
    class=\"p\">:</span>\n        <span class=\"k\">raise</span> <span class=\"n\">HTTPException</span><span
    class=\"p\">(</span><span class=\"n\">status_code</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;404&quot;</span><span class=\"p\">,</span> <span class=\"n\">detail</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;Wish id does not exist&quot;</span><span
    class=\"p\">)</span>\n\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">delete</span><span class=\"p\">(</span><span class=\"n\">db_wish</span><span
    class=\"p\">)</span>\n    <span class=\"n\">db</span><span class=\"o\">.</span><span
    class=\"n\">commit</span><span class=\"p\">()</span>\n\n    <span class=\"k\">return</span>
    <span class=\"kc\">None</span>\n</pre></div>\n\n</pre>\n\n<h1 id=\"my-code\">My
    Code <a class=\"header-anchor\" href=\"#my-code\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>You can find my repo
    <a href=\"https://github.com/nicpayne713/wish-lists\">here</a>.</p>\n<p>I'll plan
    to update and maintain for as long as I use it</p>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntags: ['python', 'blog', 'tech']\ntitle: Wish-List-With-Fastapi\ndate:
    2022-05-06T00:00:00\npublished: True\n#cover: \"media/wish-list-with-fastapi.png\"\n\n---\n\nAmazon
    has crossed the line with me just one too many times now so we are looking to
    drop them like every other Big Tech provider....\n\nHowever, one key feature of
    Amazon that has been so useful for us is Lists... We can just maintain a list
    for each of us and then family members can login anytime and check it out... \nThis
    really alleviates any last minute gift idea stress right before a birthday or
    something.\n\nSo I need a nice gift list service but I don't want to be locked
    into one company (like a Target registry or something) and I'd like to host it
    myself\n\nThe internets had a few options but nothing looked/felt like I wanted
    to I decided to build my own.\n\n# The Frontend\n\n__I have no idea how to do
    front end so stay tuned__\n\n# The Backend\n\nFastAPI for the win on this one...
    I followed a few examples online and what I was able to build in just a few minutes
    is pretty impressive thanks to the design of FastAPI.\n\nSome key features are:\n1.
    Auto doc generation\n2. Required typing (which makes #1 possible)\n3. Built-in
    api testing in the browser\n4. Easy integration with sqlalchemy\n5. Development
    time so short you won't be done with your coffee before having something up and
    running!\n\n## Database\n\nStarting with a simple `database.py` we can create
    a sqlalchemy session with a base model with about 7 lines of code...\n\n```python\n\nfrom
    sqlalchemy import create_engine\nfrom sqlalchemy.ext.declarative import declarative_base\nfrom
    sqlalchemy.orm import sessionmaker\n\n\nSQLALCHEMY_DATABASE_URL = \"sqlite:///wishes.sqlite3\"\nengine
    = create_engine(SQLALCHEMY_DATABASE_URL)\nSessionLocal = sessionmaker(autocommit=False,
    autoflush=False, bind=engine)\nBase = declarative_base()\n```\n\n## Model\n\nFor
    my wish list I needed just a simple table:\n\n|   id | person   | item         |
    link         | purchased   | purchased_by   | date_added          |\n|-----:|:---------|:-------------|:-------------|:------------|:---------------|:--------------------|\n|
    \   1 | pypeaday | A sweet item | www.mystore.store | False        | dad| 2022-05-05
    21:55:09 |\n|    2 | pypeaday   | A bitter item| www.bitterstore.com | True       |Mrs.
    pypeaday |  2022-05-06 06:55:54 |\n\n\nThe table is simple enough... A unique
    key, the person who the wish belongs to, the item (or wish), a link to the item,
    whether it's been purchased or not and by whom, and the date it was added.\n\nTo
    make this model with sqlalchemy we can make a `model.py` like so:\n\n```python\nfrom
    database import Base\nfrom sqlalchemy.schema import Column\nfrom sqlalchemy.types
    import Boolean, Integer, String, Text\n\n\nclass Wishes(Base):\n    __tablename__
    = \"Wishes\"\n    id = Column(Integer, primary_key=True, index=True)\n    person
    = Column(String(20))\n    item = Column(Text())\n    link = Column(Text())\n    purchased
    = Column(Boolean())\n    purchased_by = Column(String(90))\n    date_added = Column(String(15))\n```\n\n##
    Schema\n\nOne of the best things about FastAPI is trivial integration with pydantic.\nWe
    can define a schema to ensure any data posted is not missing anything!\n\nMake
    a `schema.py` with the following:\n\n```python\nfrom pydantic import BaseModel\nimport
    time\nfrom typing import Optional\n\n\nclass wish_schema(BaseModel):\n\n    person:
    str\n    item: str\n    link: str\n    purchased: bool = False\n    purchased_by:
    Optional[str] = None\n    date_added: Optional[str] = time.strftime(\"%Y-%m-%d
    %H:%M:%S\", time.localtime())\n\n    class Config:\n        orm_mode = True\n\n\nclass
    patch_schema(BaseModel):\n\n    purchased: bool\n    purchased_by: Optional[str]
    = None\n\n    class Config:\n        orm_mode = True\n\n```\n\nI have 2 schemas
    - one for a `wish` which you'll see down below is used to validate any `post`
    requests.\n\nTo simplify things for me I made another schema, `patch_schema` which
    I use for the route that updates the table (ie. marking an existing wish as purchased)
    \n\n## Session\n\nOne of the last things we need is a Session\n\nSo make a `session.py`...\n\n```python\nfrom
    database import SessionLocal, engine\nimport model\n\nmodel.Base.metadata.create_all(bind=engine)\n\n\ndef
    create_get_session():\n    try:\n        db = SessionLocal()\n        yield db\n
    \   finally:\n        db.close()\n```\n\nOur routes will depend on this `create_get_session`
    function that will yield a `db` object through which we'll udpate our database\n\n#
    Ok just do it already!\n\nSo our `main.py` will have a few routes in it...\n\nWhat
    do we want to support?\n\n1. Getting all wishes\n2. Getting a specific wish\n3.
    Updating a specific wish\n4. Deleting a wish\n\nI think the script is fairly self
    explanatory but here's a few notes...\n\n1. We decorate each function with `@app.<method>`
    and define `response_model` as well as `status_code`\n2. The functions are defined
    with `async` (this was my first exposure to this so I can't go in depth on it
    yet)\n3. The functions all take a `db` which is from `session.py` and that `db`
    depends on the `create_get_session` function\n4. If the db is being updtes then
    we type the object used for the update with the appropriate schema (either `wish_schema`
    or `patch_schema`)\n\nFrom there we're in true python-land where you can basically
    guess the methods on `db` and you'd probably be right... (like `query`, `upddate`,
    `delete` etc.)\n\n\n```python\nfrom fastapi import FastAPI, Depends, HTTPException\nfrom
    sqlalchemy.orm import Session\nfrom typing import List\nfrom model import Wishes\nfrom
    schema import wish_schema, patch_schema\nfrom session import create_get_session\n\napp
    = FastAPI()\n\n\n@app.get(\"/\")\ndef read_root():\n    return {\"message\": \"server
    is up!\"}\n\n\n@app.get(\"/wishes\", response_model=List[wish_schema], status_code=200)\nasync
    def read_wishes(db: Session = Depends(create_get_session)):\n    wishes = db.query(Wishes).all()\n
    \   return wishes\n\n\n@app.post(\"/wishes\", response_model=wish_schema, status_code=201)\nasync
    def add_wish(wish: wish_schema, db: Session = Depends(create_get_session)):\n
    \   new_wish = Wishes(\n        person=wish.person,\n        item=wish.item,\n
    \       link=wish.link,\n        purchased=wish.purchased,\n        purchased_by=wish.purchased_by,\n
    \       date_added=wish.date_added,\n    )\n    db.add(new_wish)\n    db.commit()\n\n
    \   return new_wish\n\n\n@app.get(\"/wishes/{id}\", response_model=wish_schema,
    status_code=200)\nasync def get_wish(id: int, db: Session = Depends(create_get_session)):\n
    \   wish = db.query(Wishes).get(id)\n    return wish\n\n\n@app.patch(\"/wishes/{id}\",
    response_model=wish_schema, status_code=200)\nasync def update_wish(\n    id:
    int, patch: patch_schema, db: Session = Depends(create_get_session)\n):\n    db_wish
    = db.query(Wishes).get(id)\n    db_wish.purchased = patch.purchased\n    db_wish.purchased_by
    = patch.purchased_by\n    db.commit()\n    db.refresh(db_wish)\n\n    return db_wish\n\n\n@app.delete(\"/wishes/{id}\",
    status_code=200)\nasync def delete_wish(id: int, db: Session = Depends(create_get_session)):\n
    \   db_wish = db.query(Wishes).get(id)\n    if not db_wish:\n        raise HTTPException(status_code=\"404\",
    detail=\"Wish id does not exist\")\n\n    db.delete(db_wish)\n    db.commit()\n\n
    \   return None\n\n```\n\n# My Code\n\nYou can find my repo [here](https://github.com/nicpayne713/wish-lists).\n\nI'll
    plan to update and maintain for as long as I use it\n"
published: true
slug: wish-list-with-fastapi
title: Wish-List-With-Fastapi


---

Amazon has crossed the line with me just one too many times now so we are looking to drop them like every other Big Tech provider....

However, one key feature of Amazon that has been so useful for us is Lists... We can just maintain a list for each of us and then family members can login anytime and check it out... 
This really alleviates any last minute gift idea stress right before a birthday or something.

So I need a nice gift list service but I don't want to be locked into one company (like a Target registry or something) and I'd like to host it myself

The internets had a few options but nothing looked/felt like I wanted to I decided to build my own.

# The Frontend

__I have no idea how to do front end so stay tuned__

# The Backend

FastAPI for the win on this one... I followed a few examples online and what I was able to build in just a few minutes is pretty impressive thanks to the design of FastAPI.

Some key features are:
1. Auto doc generation
2. Required typing (which makes #1 possible)
3. Built-in api testing in the browser
4. Easy integration with sqlalchemy
5. Development time so short you won't be done with your coffee before having something up and running!

## Database

Starting with a simple `database.py` we can create a sqlalchemy session with a base model with about 7 lines of code...

```python

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "sqlite:///wishes.sqlite3"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

## Model

For my wish list I needed just a simple table:

|   id | person   | item         | link         | purchased   | purchased_by   | date_added          |
|-----:|:---------|:-------------|:-------------|:------------|:---------------|:--------------------|
|    1 | pypeaday | A sweet item | www.mystore.store | False        | dad| 2022-05-05 21:55:09 |
|    2 | pypeaday   | A bitter item| www.bitterstore.com | True       |Mrs. pypeaday |  2022-05-06 06:55:54 |


The table is simple enough... A unique key, the person who the wish belongs to, the item (or wish), a link to the item, whether it's been purchased or not and by whom, and the date it was added.

To make this model with sqlalchemy we can make a `model.py` like so:

```python
from database import Base
from sqlalchemy.schema import Column
from sqlalchemy.types import Boolean, Integer, String, Text


class Wishes(Base):
    __tablename__ = "Wishes"
    id = Column(Integer, primary_key=True, index=True)
    person = Column(String(20))
    item = Column(Text())
    link = Column(Text())
    purchased = Column(Boolean())
    purchased_by = Column(String(90))
    date_added = Column(String(15))
```

## Schema

One of the best things about FastAPI is trivial integration with pydantic.
We can define a schema to ensure any data posted is not missing anything!

Make a `schema.py` with the following:

```python
from pydantic import BaseModel
import time
from typing import Optional


class wish_schema(BaseModel):

    person: str
    item: str
    link: str
    purchased: bool = False
    purchased_by: Optional[str] = None
    date_added: Optional[str] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    class Config:
        orm_mode = True


class patch_schema(BaseModel):

    purchased: bool
    purchased_by: Optional[str] = None

    class Config:
        orm_mode = True

```

I have 2 schemas - one for a `wish` which you'll see down below is used to validate any `post` requests.

To simplify things for me I made another schema, `patch_schema` which I use for the route that updates the table (ie. marking an existing wish as purchased) 

## Session

One of the last things we need is a Session

So make a `session.py`...

```python
from database import SessionLocal, engine
import model

model.Base.metadata.create_all(bind=engine)


def create_get_session():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
```

Our routes will depend on this `create_get_session` function that will yield a `db` object through which we'll udpate our database

# Ok just do it already!

So our `main.py` will have a few routes in it...

What do we want to support?

1. Getting all wishes
2. Getting a specific wish
3. Updating a specific wish
4. Deleting a wish

I think the script is fairly self explanatory but here's a few notes...

1. We decorate each function with `@app.<method>` and define `response_model` as well as `status_code`
2. The functions are defined with `async` (this was my first exposure to this so I can't go in depth on it yet)
3. The functions all take a `db` which is from `session.py` and that `db` depends on the `create_get_session` function
4. If the db is being updtes then we type the object used for the update with the appropriate schema (either `wish_schema` or `patch_schema`)

From there we're in true python-land where you can basically guess the methods on `db` and you'd probably be right... (like `query`, `upddate`, `delete` etc.)


```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from model import Wishes
from schema import wish_schema, patch_schema
from session import create_get_session

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "server is up!"}


@app.get("/wishes", response_model=List[wish_schema], status_code=200)
async def read_wishes(db: Session = Depends(create_get_session)):
    wishes = db.query(Wishes).all()
    return wishes


@app.post("/wishes", response_model=wish_schema, status_code=201)
async def add_wish(wish: wish_schema, db: Session = Depends(create_get_session)):
    new_wish = Wishes(
        person=wish.person,
        item=wish.item,
        link=wish.link,
        purchased=wish.purchased,
        purchased_by=wish.purchased_by,
        date_added=wish.date_added,
    )
    db.add(new_wish)
    db.commit()

    return new_wish


@app.get("/wishes/{id}", response_model=wish_schema, status_code=200)
async def get_wish(id: int, db: Session = Depends(create_get_session)):
    wish = db.query(Wishes).get(id)
    return wish


@app.patch("/wishes/{id}", response_model=wish_schema, status_code=200)
async def update_wish(
    id: int, patch: patch_schema, db: Session = Depends(create_get_session)
):
    db_wish = db.query(Wishes).get(id)
    db_wish.purchased = patch.purchased
    db_wish.purchased_by = patch.purchased_by
    db.commit()
    db.refresh(db_wish)

    return db_wish


@app.delete("/wishes/{id}", status_code=200)
async def delete_wish(id: int, db: Session = Depends(create_get_session)):
    db_wish = db.query(Wishes).get(id)
    if not db_wish:
        raise HTTPException(status_code="404", detail="Wish id does not exist")

    db.delete(db_wish)
    db.commit()

    return None

```

# My Code

You can find my repo [here](https://github.com/nicpayne713/wish-lists).

I'll plan to update and maintain for as long as I use it