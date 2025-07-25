---
content: "---\n\nSync thoughts from the web to local markdown files.\n\n---\n\n!!!
  function\n    <h2 id=\"clean_title\" class=\"admonition-title\" style=\"margin:
  0; padding: .5rem 1rem;\">clean_title <em class=\"small\">function</em></h2>\n\n
  \   Cleans the title of a post.\n\n???+ source \"clean_title <em class='small'>source</em>\"\n
  \   ```python\n    def clean_title(title: str) -> str:\n        \"\"\"Cleans the
  title of a post.\"\"\"\n        # Remove parenthetical content that starts with
  a number\n        title = re.sub(r\"\\(\\d+[^)]*\\)\", \"\", title)\n        # Trim
  whitespace\n        title = title.strip()\n        # Limit to 65 characters\n        if
  len(title) > 65:\n            title = title[:62] + \"...\"\n        return title\n
  \   ```\n!!! function\n    <h2 id=\"clean_description\" class=\"admonition-title\"
  style=\"margin: 0; padding: .5rem 1rem;\">clean_description <em class=\"small\">function</em></h2>\n\n
  \   Cleans the description text.\n\n???+ source \"clean_description <em class='small'>source</em>\"\n
  \   ```python\n    def clean_description(text: str) -> str:\n        \"\"\"Cleans
  the description text.\"\"\"\n        # Remove markdown links\n        text = re.sub(r\"\\[([^\\]]+)\\]\\([^)]+\\)\",
  r\"\\1\", text)\n        # Remove markdown formatting characters\n        text =
  re.sub(r\"[*_`#]\", \"\", text)\n        # Clean up any extra whitespace\n        text
  = \" \".join(text.split())\n        return text\n    ```\n!!! function\n    <h2
  id=\"sync_thoughts\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
  1rem;\">sync_thoughts <em class=\"small\">function</em></h2>\n\n    Fetches thoughts
  and saves them as markdown files.\n\n???+ source \"sync_thoughts <em class='small'>source</em>\"\n
  \   ```python\n    def sync_thoughts():\n        \"\"\"Fetches thoughts and saves
  them as markdown files.\"\"\"\n        output_dir = Path(\"pype.dev/content/thoughts\")\n
  \       output_dir.mkdir(parents=True, exist_ok=True)\n\n        try:\n            response
  = requests.get(\n                # TODOL limit for now\n                \"https://thoughts.waylonwalker.com/posts/Nic/?page_size=5\",\n
  \               # \"https://thoughts.waylonwalker.com/posts/Nic/?page_size=9999999999\",\n
  \               timeout=10,\n            )\n            response.raise_for_status()\n
  \           posts = response.json()\n        except requests.RequestException as
  e:\n            print(f\"Error fetching thoughts: {e}\")\n            return\n\n
  \       for post in posts:\n            post_id = post[\"id\"]\n            slug
  = f\"thoughts-{post_id}\"\n            filepath = output_dir / f\"{slug}.md\"\n
  \           cleaned_title = clean_title(post[\"title\"])\n            title = \"\U0001F4AD
  \" + cleaned_title.lstrip(\"\U0001F4AD \")\n            description = clean_description(post[\"message\"][:120])\n
  \           link = post.get(\"link\")\n            if not link or link == \"None\":\n
  \               link = f\"https://pype.dev/{slug}/\"\n\n            tags = [\n                tag.strip()
  for tag in post.get(\"tags\", \"\").split(\",\") if tag.strip()\n            ] +
  [\"thoughts\"]\n\n            date = datetime.datetime.now().isoformat()\n\n            content_body
  = textwrap.dedent(\n                f\"\"\"\n            <a href=\"{link}\">\n                <img\n
  \                   src=\"https://shots.wayl.one/shot/?url={link}&height=450&width=800&scaled_width=800&scaled_height=450&selectors=\"\n
  \                   alt=\"shot of post - {title}\"\n                    height=450\n
  \                   width=800\n                >\n            </a>\n\n            Here's
  my thought on <a href=\"{link}\">{title}</a>\n\n            ---\n\n            {post[\"message\"]}\n\n
  \           ---\n\n            ???+ note \"This is one of [[my-thoughts]]\"\n                I
  picked this up from [Waylon Walker](https://waylonwalker.com) who made [thoughts](https://thoughts.waylonwalker.com).
  It's a short note that I make about someone else's content online.  Learn more about
  [[thoughts]]\n            \"\"\"\n            )\n\n            frontmatter = textwrap.dedent(\n
  \               f\"\"\"\n            ---\n            title: \"{title.replace('\"',
  '\\\\\"')}\"\n            slug: \"{slug}\"\n            date: \"{date}\"\n            tags:
  {tags}\n            templateKey: \"thoughts\"\n            description: \"{description.replace('\"',
  '\\\\\"')}\"\n            link: \"{link}\"\n            published: true\n            ---\n
  \           \"\"\"\n            )\n\n            full_content = frontmatter.strip()
  + \"\\n\\n\" + content_body.strip()\n\n            with open(filepath, \"w\", encoding=\"utf-8\")
  as f:\n                f.write(full_content)\n            print(f\"Saved thought:
  {filepath}\")\n    ```"
date: 2025-07-25
description: "Sync thoughts from the web to local markdown files. !!! function\n    &lt;h2
  id=&quot;clean_title&quot; class=&quot;admonition-title&quot; style=&quot;margin:
  0;"
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>sync-thoughts.py</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Sync thoughts from the web to local markdown
    files. !!! function\n    &lt;h2 id=&quot;clean_title&quot; class=&quot;admonition-title&quot;
    style=&quot;margin: 0;\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"sync-thoughts.py
    | Nic Payne\" />\n<meta property=\"og:description\" content=\"Sync thoughts from
    the web to local markdown files. !!! function\n    &lt;h2 id=&quot;clean_title&quot;
    class=&quot;admonition-title&quot; style=&quot;margin: 0;\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devscripts/sync-thoughts\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"sync-thoughts.py | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Sync thoughts from the web to local markdown files. !!! function\n    &lt;h2
    id=&quot;clean_title&quot; class=&quot;admonition-title&quot; style=&quot;margin:
    0;\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class='flex
    flex-row w-full min-h-screen bg-pattern-gradient text-text-main'>\n    <main class=\"flex-grow
    fade-in overflow-visible\">\n        <div class='container flex-grow p-2 sm:p-6
    mx-auto bg-content-blend overflow-visible'>\n<header class='py-4'>\n\n    <nav
    class='flex flex-wrap justify-center sm:justify-start items-center'>\n        <a
    class=\"nav-link accent-glow\"\n            href='/'>Home</a>\n        <a class=\"nav-link
    accent-glow\"\n            href='https://github.com/pypeaday/pype.dev'>GitHub</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='https://mydigitalharbor.com/pypeaday'>DigitalHarbor</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/slash'>Start Here</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/my-thoughts'>My
    Thoughts</a>\n    </nav>\n\n    <!-- <div>\n        <label id=\"theme-switch\"
    class=\"theme-switch\" for=\"checkbox-theme\" title=\"light/dark mode toggle\">\n
    \           <input type=\"checkbox\" id=\"checkbox-theme\" />\n            <div
    class=\"slider round\"></div>\n        </label>\n    </div> -->\n</header><div
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script><style>\n
    \   /* Ultra-aggressive title styling override */\n    #title, h1#title, .post-header
    h1, h1.gradient-text {\n        font-size: 3.75rem !important; /* ~text-7xl */\n
    \       font-weight: 800 !important;\n        line-height: 1.1 !important;\n        letter-spacing:
    -0.025em !important;\n    }\n    \n    @media (min-width: 768px) {\n        #title,
    h1#title, .post-header h1, h1.gradient-text {\n            font-size: 4.5rem !important;
    /* Even larger than text-7xl */\n        }\n    }\n    \n    /* Floating cover
    image above article */\n    .cover-floating-container {\n        position: relative;\n
    \       width: 100%;\n        margin: 2.5rem auto 0; /* Space from search bar
    */\n        z-index: 20;\n    }\n    \n    /* True boundary-breaking cover image
    */\n    .boundary-break-container {\n        position: relative;\n        width:
    calc(100% + 3rem); /* Extend 1.5rem on each side beyond article */\n        left:
    -1.5rem; /* Pull left edge 1.5rem beyond container */\n        height: 380px;
    /* Reduced from 450px for smaller image */\n        overflow: visible;\n        z-index:
    20;\n    }\n    \n    /* Glow effect that extends beyond image */\n    .boundary-break-glow
    {\n        position: absolute;\n        top: -2rem;\n        left: -2rem;\n        right:
    -2rem;\n        bottom: -1rem;\n        background: linear-gradient(45deg, \n
    \           rgba(211, 124, 95, 0.7),  /* accent-warm */\n            rgba(96,
    138, 159, 0.7),  /* accent-cool */\n            rgba(106, 138, 130, 0.7)  /* accent-green
    */\n        );\n        filter: blur(2.5rem);\n        border-radius: 1rem;\n
    \       opacity: 0.8;\n        z-index: 10;\n        animation: boundary-break-pulse
    4s infinite alternate;\n    }\n    \n    @keyframes boundary-break-pulse {\n        0%
    { opacity: 0.7; filter: blur(2rem); }\n        100% { opacity: 0.9; filter: blur(3rem);
    }\n    }\n    \n    /* Image styling */\n    .boundary-break-image {\n        position:
    relative;\n        width: 100%;\n        height: 100%;\n        object-fit: cover;\n
    \       border-radius: 0.75rem;\n        border: 0.5rem solid white;\n        box-shadow:
    0 2rem 4rem -1rem rgba(0,0,0,0.8), 0 0 2.5rem 0.25rem rgba(0,0,0,0.5);\n        transform:
    scale(1.05);\n        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44,
    1),\n                    box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n
    \       z-index: 20;\n    }\n    \n    /* Hover effect */\n    .boundary-break-image:hover
    {\n        transform: scale(1.08) translateY(-0.5rem);\n        box-shadow: 0
    2.5rem 4.5rem -1rem rgba(0,0,0,0.85), 0 0 3rem 0.25rem rgba(0,0,0,0.6);\n    }\n
    \   \n    /* Article container styling */\n    .post-container {\n        margin-top:
    -3.5rem; /* Reduced overlap for breathing room */\n        padding-top: 5rem;
    /* Adjusted padding to maintain proper spacing */\n        position: relative;\n
    \       z-index: 10;\n    }\n    \n    /* Responsive adjustments */\n    @media
    (max-width: 768px) {\n        .boundary-break-container {\n            width:
    calc(100% + 2rem);\n            left: -1rem;\n            height: auto; /* Auto
    height to prevent cropping */\n            max-height: 350px; /* Maximum height
    constraint */\n        }\n        \n        .boundary-break-glow {\n            top:
    -1.5rem;\n            left: -1.5rem;\n            right: -1.5rem;\n            bottom:
    -0.75rem;\n        }\n        \n        .boundary-break-image {\n            height:
    auto; /* Let height be determined by aspect ratio */\n            max-height:
    350px;\n            object-fit: contain; /* Show entire image without cropping
    */\n            transform: scale(1.02); /* Slightly reduced scale for mobile */\n
    \       }\n        \n        .post-container {\n            margin-top: -5rem;\n
    \           padding-top: 6rem;\n        }\n    }\n    \n    /* Small mobile devices
    */\n    @media (max-width: 480px) {\n        .boundary-break-container {\n            height:
    auto;\n            max-height: 280px;\n        }\n        \n        .boundary-break-image
    {\n            max-height: 280px;\n            border-width: 0.25rem;\n        }\n
    \   }\n</style>\n\n\n<article class='w-full pattern-card glow-card p-4 md:p-6
    post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size:
    4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold
    gradient-text mb-4 post-title-large\">sync-thoughts.py</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-25\">\n
    \           July 25, 2025\n        </time>\n    </div>\n</section>    <section
    class=\"article-content prose dark:prose-invert lg:prose-xl mx-auto mt-8\">\n
    \       <hr />\n<p>Sync thoughts from the web to local markdown files.</p>\n<hr
    />\n<div class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"clean_title\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
    1rem;\">clean_title <em class=\"small\">function</em></h2>\n<p>Cleans the title
    of a post.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">clean_title <em class='small'>source</em></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">clean_title</span><span class=\"p\">(</span><span
    class=\"n\">title</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Cleans
    the title of a post.&quot;&quot;&quot;</span>\n    <span class=\"c1\"># Remove
    parenthetical content that starts with a number</span>\n    <span class=\"n\">title</span>
    <span class=\"o\">=</span> <span class=\"n\">re</span><span class=\"o\">.</span><span
    class=\"n\">sub</span><span class=\"p\">(</span><span class=\"sa\">r</span><span
    class=\"s2\">&quot;\\(\\d+[^)]*\\)&quot;</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot;&quot;</span><span class=\"p\">,</span> <span class=\"n\">title</span><span
    class=\"p\">)</span>\n    <span class=\"c1\"># Trim whitespace</span>\n    <span
    class=\"n\">title</span> <span class=\"o\">=</span> <span class=\"n\">title</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \   <span class=\"c1\"># Limit to 65 characters</span>\n    <span class=\"k\">if</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">title</span><span
    class=\"p\">)</span> <span class=\"o\">&gt;</span> <span class=\"mi\">65</span><span
    class=\"p\">:</span>\n        <span class=\"n\">title</span> <span class=\"o\">=</span>
    <span class=\"n\">title</span><span class=\"p\">[:</span><span class=\"mi\">62</span><span
    class=\"p\">]</span> <span class=\"o\">+</span> <span class=\"s2\">&quot;...&quot;</span>\n
    \   <span class=\"k\">return</span> <span class=\"n\">title</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"clean_description\" class=\"admonition-title\" style=\"margin: 0; padding:
    .5rem 1rem;\">clean_description <em class=\"small\">function</em></h2>\n<p>Cleans
    the description text.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">clean_description <em class='small'>source</em></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">clean_description</span><span class=\"p\">(</span><span
    class=\"n\">text</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Cleans
    the description text.&quot;&quot;&quot;</span>\n    <span class=\"c1\"># Remove
    markdown links</span>\n    <span class=\"n\">text</span> <span class=\"o\">=</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">sub</span><span
    class=\"p\">(</span><span class=\"sa\">r</span><span class=\"s2\">&quot;\\[([^\\]]+)\\]\\([^)]+\\)&quot;</span><span
    class=\"p\">,</span> <span class=\"sa\">r</span><span class=\"s2\">&quot;\\1&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">text</span><span class=\"p\">)</span>\n
    \   <span class=\"c1\"># Remove markdown formatting characters</span>\n    <span
    class=\"n\">text</span> <span class=\"o\">=</span> <span class=\"n\">re</span><span
    class=\"o\">.</span><span class=\"n\">sub</span><span class=\"p\">(</span><span
    class=\"sa\">r</span><span class=\"s2\">&quot;[*_`#]&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;&quot;</span><span class=\"p\">,</span> <span class=\"n\">text</span><span
    class=\"p\">)</span>\n    <span class=\"c1\"># Clean up any extra whitespace</span>\n
    \   <span class=\"n\">text</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;
    &quot;</span><span class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">text</span><span class=\"o\">.</span><span class=\"n\">split</span><span
    class=\"p\">())</span>\n    <span class=\"k\">return</span> <span class=\"n\">text</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"sync_thoughts\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
    1rem;\">sync_thoughts <em class=\"small\">function</em></h2>\n<p>Fetches thoughts
    and saves them as markdown files.</p>\n</div>\n<div class=\"admonition source
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">sync_thoughts
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">sync_thoughts</span><span class=\"p\">():</span>\n<span
    class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Fetches thoughts and
    saves them as markdown files.&quot;&quot;&quot;</span>\n    <span class=\"n\">output_dir</span>
    <span class=\"o\">=</span> <span class=\"n\">Path</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;pype.dev/content/thoughts&quot;</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">output_dir</span><span class=\"o\">.</span><span class=\"n\">mkdir</span><span
    class=\"p\">(</span><span class=\"n\">parents</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span> <span class=\"n\">exist_ok</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">)</span>\n\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">response</span>
    <span class=\"o\">=</span> <span class=\"n\">requests</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span>\n            <span class=\"c1\">#
    TODOL limit for now</span>\n            <span class=\"s2\">&quot;https://thoughts.waylonwalker.com/posts/Nic/?page_size=5&quot;</span><span
    class=\"p\">,</span>\n            <span class=\"c1\"># &quot;https://thoughts.waylonwalker.com/posts/Nic/?page_size=9999999999&quot;,</span>\n
    \           <span class=\"n\">timeout</span><span class=\"o\">=</span><span class=\"mi\">10</span><span
    class=\"p\">,</span>\n        <span class=\"p\">)</span>\n        <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">posts</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">except</span> <span class=\"n\">requests</span><span class=\"o\">.</span><span
    class=\"n\">RequestException</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n        <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Error fetching thoughts: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n        <span class=\"k\">return</span>\n\n
    \   <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">posts</span><span class=\"p\">:</span>\n        <span class=\"n\">post_id</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;id&quot;</span><span class=\"p\">]</span>\n        <span class=\"n\">slug</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;thoughts-</span><span
    class=\"si\">{</span><span class=\"n\">post_id</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n        <span class=\"n\">filepath</span> <span class=\"o\">=</span>
    <span class=\"n\">output_dir</span> <span class=\"o\">/</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">slug</span><span
    class=\"si\">}</span><span class=\"s2\">.md&quot;</span>\n        <span class=\"n\">cleaned_title</span>
    <span class=\"o\">=</span> <span class=\"n\">clean_title</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">[</span><span class=\"s2\">&quot;title&quot;</span><span
    class=\"p\">])</span>\n        <span class=\"n\">title</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;\U0001F4AD &quot;</span> <span class=\"o\">+</span> <span
    class=\"n\">cleaned_title</span><span class=\"o\">.</span><span class=\"n\">lstrip</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;\U0001F4AD &quot;</span><span class=\"p\">)</span>\n
    \       <span class=\"n\">description</span> <span class=\"o\">=</span> <span
    class=\"n\">clean_description</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">][:</span><span
    class=\"mi\">120</span><span class=\"p\">])</span>\n        <span class=\"n\">link</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;link&quot;</span><span
    class=\"p\">)</span>\n        <span class=\"k\">if</span> <span class=\"ow\">not</span>
    <span class=\"n\">link</span> <span class=\"ow\">or</span> <span class=\"n\">link</span>
    <span class=\"o\">==</span> <span class=\"s2\">&quot;None&quot;</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">link</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;https://pype.dev/</span><span class=\"si\">{</span><span class=\"n\">slug</span><span
    class=\"si\">}</span><span class=\"s2\">/&quot;</span>\n\n        <span class=\"n\">tags</span>
    <span class=\"o\">=</span> <span class=\"p\">[</span>\n            <span class=\"n\">tag</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>
    <span class=\"k\">for</span> <span class=\"n\">tag</span> <span class=\"ow\">in</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;tags&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;&quot;</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">split</span><span class=\"p\">(</span><span class=\"s2\">&quot;,&quot;</span><span
    class=\"p\">)</span> <span class=\"k\">if</span> <span class=\"n\">tag</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \       <span class=\"p\">]</span> <span class=\"o\">+</span> <span class=\"p\">[</span><span
    class=\"s2\">&quot;thoughts&quot;</span><span class=\"p\">]</span>\n\n        <span
    class=\"n\">date</span> <span class=\"o\">=</span> <span class=\"n\">datetime</span><span
    class=\"o\">.</span><span class=\"n\">datetime</span><span class=\"o\">.</span><span
    class=\"n\">now</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"n\">isoformat</span><span class=\"p\">()</span>\n\n        <span class=\"n\">content_body</span>
    <span class=\"o\">=</span> <span class=\"n\">textwrap</span><span class=\"o\">.</span><span
    class=\"n\">dedent</span><span class=\"p\">(</span>\n            <span class=\"sa\">f</span><span
    class=\"s2\">&quot;&quot;&quot;</span>\n<span class=\"s2\">        &lt;a href=&quot;</span><span
    class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;&gt;</span>\n<span class=\"s2\">            &lt;img</span>\n<span
    class=\"s2\">                src=&quot;https://shots.wayl.one/shot/?url=</span><span
    class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&amp;height=450&amp;width=800&amp;scaled_width=800&amp;scaled_height=450&amp;selectors=&quot;</span>\n<span
    class=\"s2\">                alt=&quot;shot of post - </span><span class=\"si\">{</span><span
    class=\"n\">title</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span
    class=\"s2\">                height=450</span>\n<span class=\"s2\">                width=800</span>\n<span
    class=\"s2\">            &gt;</span>\n<span class=\"s2\">        &lt;/a&gt;</span>\n\n<span
    class=\"s2\">        Here&#39;s my thought on &lt;a href=&quot;</span><span class=\"si\">{</span><span
    class=\"n\">link</span><span class=\"si\">}</span><span class=\"s2\">&quot;&gt;</span><span
    class=\"si\">{</span><span class=\"n\">title</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/a&gt;</span>\n\n<span class=\"s2\">        ---</span>\n\n<span
    class=\"s2\">        </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">]</span><span
    class=\"si\">}</span>\n\n<span class=\"s2\">        ---</span>\n\n<span class=\"s2\">
    \       ???+ note &quot;This is one of [[my-thoughts]]&quot;</span>\n<span class=\"s2\">
    \           I picked this up from [Waylon Walker](https://waylonwalker.com) who
    made [thoughts](https://thoughts.waylonwalker.com). It&#39;s a short note that
    I make about someone else&#39;s content online.  Learn more about [[thoughts]]</span>\n<span
    class=\"s2\">        &quot;&quot;&quot;</span>\n        <span class=\"p\">)</span>\n\n
    \       <span class=\"n\">frontmatter</span> <span class=\"o\">=</span> <span
    class=\"n\">textwrap</span><span class=\"o\">.</span><span class=\"n\">dedent</span><span
    class=\"p\">(</span>\n            <span class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span
    class=\"s2\">        ---</span>\n<span class=\"s2\">        title: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">title</span><span class=\"o\">.</span><span
    class=\"n\">replace</span><span class=\"p\">(</span><span class=\"s1\">&#39;&quot;&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;</span><span
    class=\"se\">\\\\</span><span class=\"s1\">&quot;&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span class=\"s2\">        slug:
    &quot;</span><span class=\"si\">{</span><span class=\"n\">slug</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        date: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">date</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        tags: </span><span class=\"si\">{</span><span
    class=\"n\">tags</span><span class=\"si\">}</span>\n<span class=\"s2\">        templateKey:
    &quot;thoughts&quot;</span>\n<span class=\"s2\">        description: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">description</span><span class=\"o\">.</span><span
    class=\"n\">replace</span><span class=\"p\">(</span><span class=\"s1\">&#39;&quot;&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;</span><span
    class=\"se\">\\\\</span><span class=\"s1\">&quot;&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span class=\"s2\">        link:
    &quot;</span><span class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        published: true</span>\n<span
    class=\"s2\">        ---</span>\n<span class=\"s2\">        &quot;&quot;&quot;</span>\n
    \       <span class=\"p\">)</span>\n\n        <span class=\"n\">full_content</span>
    <span class=\"o\">=</span> <span class=\"n\">frontmatter</span><span class=\"o\">.</span><span
    class=\"n\">strip</span><span class=\"p\">()</span> <span class=\"o\">+</span>
    <span class=\"s2\">&quot;</span><span class=\"se\">\\n\\n</span><span class=\"s2\">&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">content_body</span><span class=\"o\">.</span><span
    class=\"n\">strip</span><span class=\"p\">()</span>\n\n        <span class=\"k\">with</span>
    <span class=\"nb\">open</span><span class=\"p\">(</span><span class=\"n\">filepath</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">encoding</span><span class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span
    class=\"p\">)</span> <span class=\"k\">as</span> <span class=\"n\">f</span><span
    class=\"p\">:</span>\n            <span class=\"n\">f</span><span class=\"o\">.</span><span
    class=\"n\">write</span><span class=\"p\">(</span><span class=\"n\">full_content</span><span
    class=\"p\">)</span>\n        <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Saved thought: </span><span class=\"si\">{</span><span
    class=\"n\">filepath</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n\n    </section>\n</article>
    \       </div>\n    </main>\n\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>sync-thoughts.py</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Sync thoughts from the web to local markdown
    files. !!! function\n    &lt;h2 id=&quot;clean_title&quot; class=&quot;admonition-title&quot;
    style=&quot;margin: 0;\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"sync-thoughts.py
    | Nic Payne\" />\n<meta property=\"og:description\" content=\"Sync thoughts from
    the web to local markdown files. !!! function\n    &lt;h2 id=&quot;clean_title&quot;
    class=&quot;admonition-title&quot; style=&quot;margin: 0;\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devscripts/sync-thoughts\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"sync-thoughts.py | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Sync thoughts from the web to local markdown files. !!! function\n    &lt;h2
    id=&quot;clean_title&quot; class=&quot;admonition-title&quot; style=&quot;margin:
    0;\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    mb-4 post-title-large\">sync-thoughts.py</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-25\">\n            July
    25, 2025\n        </time>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<style>\n    /* Ultra-aggressive title styling override */\n    #title,
    h1#title, .post-header h1, h1.gradient-text {\n        font-size: 3.75rem !important;
    /* ~text-7xl */\n        font-weight: 800 !important;\n        line-height: 1.1
    !important;\n        letter-spacing: -0.025em !important;\n    }\n    \n    @media
    (min-width: 768px) {\n        #title, h1#title, .post-header h1, h1.gradient-text
    {\n            font-size: 4.5rem !important; /* Even larger than text-7xl */\n
    \       }\n    }\n    \n    /* Floating cover image above article */\n    .cover-floating-container
    {\n        position: relative;\n        width: 100%;\n        margin: 2.5rem auto
    0; /* Space from search bar */\n        z-index: 20;\n    }\n    \n    /* True
    boundary-breaking cover image */\n    .boundary-break-container {\n        position:
    relative;\n        width: calc(100% + 3rem); /* Extend 1.5rem on each side beyond
    article */\n        left: -1.5rem; /* Pull left edge 1.5rem beyond container */\n
    \       height: 380px; /* Reduced from 450px for smaller image */\n        overflow:
    visible;\n        z-index: 20;\n    }\n    \n    /* Glow effect that extends beyond
    image */\n    .boundary-break-glow {\n        position: absolute;\n        top:
    -2rem;\n        left: -2rem;\n        right: -2rem;\n        bottom: -1rem;\n
    \       background: linear-gradient(45deg, \n            rgba(211, 124, 95, 0.7),
    \ /* accent-warm */\n            rgba(96, 138, 159, 0.7),  /* accent-cool */\n
    \           rgba(106, 138, 130, 0.7)  /* accent-green */\n        );\n        filter:
    blur(2.5rem);\n        border-radius: 1rem;\n        opacity: 0.8;\n        z-index:
    10;\n        animation: boundary-break-pulse 4s infinite alternate;\n    }\n    \n
    \   @keyframes boundary-break-pulse {\n        0% { opacity: 0.7; filter: blur(2rem);
    }\n        100% { opacity: 0.9; filter: blur(3rem); }\n    }\n    \n    /* Image
    styling */\n    .boundary-break-image {\n        position: relative;\n        width:
    100%;\n        height: 100%;\n        object-fit: cover;\n        border-radius:
    0.75rem;\n        border: 0.5rem solid white;\n        box-shadow: 0 2rem 4rem
    -1rem rgba(0,0,0,0.8), 0 0 2.5rem 0.25rem rgba(0,0,0,0.5);\n        transform:
    scale(1.05);\n        transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44,
    1),\n                    box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);\n
    \       z-index: 20;\n    }\n    \n    /* Hover effect */\n    .boundary-break-image:hover
    {\n        transform: scale(1.08) translateY(-0.5rem);\n        box-shadow: 0
    2.5rem 4.5rem -1rem rgba(0,0,0,0.85), 0 0 3rem 0.25rem rgba(0,0,0,0.6);\n    }\n
    \   \n    /* Article container styling */\n    .post-container {\n        margin-top:
    -3.5rem; /* Reduced overlap for breathing room */\n        padding-top: 5rem;
    /* Adjusted padding to maintain proper spacing */\n        position: relative;\n
    \       z-index: 10;\n    }\n    \n    /* Responsive adjustments */\n    @media
    (max-width: 768px) {\n        .boundary-break-container {\n            width:
    calc(100% + 2rem);\n            left: -1rem;\n            height: auto; /* Auto
    height to prevent cropping */\n            max-height: 350px; /* Maximum height
    constraint */\n        }\n        \n        .boundary-break-glow {\n            top:
    -1.5rem;\n            left: -1.5rem;\n            right: -1.5rem;\n            bottom:
    -0.75rem;\n        }\n        \n        .boundary-break-image {\n            height:
    auto; /* Let height be determined by aspect ratio */\n            max-height:
    350px;\n            object-fit: contain; /* Show entire image without cropping
    */\n            transform: scale(1.02); /* Slightly reduced scale for mobile */\n
    \       }\n        \n        .post-container {\n            margin-top: -5rem;\n
    \           padding-top: 6rem;\n        }\n    }\n    \n    /* Small mobile devices
    */\n    @media (max-width: 480px) {\n        .boundary-break-container {\n            height:
    auto;\n            max-height: 280px;\n        }\n        \n        .boundary-break-image
    {\n            max-height: 280px;\n            border-width: 0.25rem;\n        }\n
    \   }\n</style>\n\n\n<article class='w-full pattern-card glow-card p-4 md:p-6
    post-container'>\n<section class=\"post-header mb-8\">\n    <h1 id=\"title\" style=\"font-size:
    4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl md:text-7xl font-extrabold
    gradient-text mb-4 post-title-large\">sync-thoughts.py</h1>\n    <div class=\"flex
    items-center text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-25\">\n
    \           July 25, 2025\n        </time>\n    </div>\n</section>    <section
    class=\"article-content prose dark:prose-invert lg:prose-xl mx-auto mt-8\">\n
    \       <hr />\n<p>Sync thoughts from the web to local markdown files.</p>\n<hr
    />\n<div class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"clean_title\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
    1rem;\">clean_title <em class=\"small\">function</em></h2>\n<p>Cleans the title
    of a post.</p>\n</div>\n<div class=\"admonition source is-collapsible collapsible-open\">\n<p
    class=\"admonition-title\">clean_title <em class='small'>source</em></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">clean_title</span><span class=\"p\">(</span><span
    class=\"n\">title</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Cleans
    the title of a post.&quot;&quot;&quot;</span>\n    <span class=\"c1\"># Remove
    parenthetical content that starts with a number</span>\n    <span class=\"n\">title</span>
    <span class=\"o\">=</span> <span class=\"n\">re</span><span class=\"o\">.</span><span
    class=\"n\">sub</span><span class=\"p\">(</span><span class=\"sa\">r</span><span
    class=\"s2\">&quot;\\(\\d+[^)]*\\)&quot;</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot;&quot;</span><span class=\"p\">,</span> <span class=\"n\">title</span><span
    class=\"p\">)</span>\n    <span class=\"c1\"># Trim whitespace</span>\n    <span
    class=\"n\">title</span> <span class=\"o\">=</span> <span class=\"n\">title</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \   <span class=\"c1\"># Limit to 65 characters</span>\n    <span class=\"k\">if</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">title</span><span
    class=\"p\">)</span> <span class=\"o\">&gt;</span> <span class=\"mi\">65</span><span
    class=\"p\">:</span>\n        <span class=\"n\">title</span> <span class=\"o\">=</span>
    <span class=\"n\">title</span><span class=\"p\">[:</span><span class=\"mi\">62</span><span
    class=\"p\">]</span> <span class=\"o\">+</span> <span class=\"s2\">&quot;...&quot;</span>\n
    \   <span class=\"k\">return</span> <span class=\"n\">title</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"clean_description\" class=\"admonition-title\" style=\"margin: 0; padding:
    .5rem 1rem;\">clean_description <em class=\"small\">function</em></h2>\n<p>Cleans
    the description text.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">clean_description <em class='small'>source</em></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">clean_description</span><span class=\"p\">(</span><span
    class=\"n\">text</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Cleans
    the description text.&quot;&quot;&quot;</span>\n    <span class=\"c1\"># Remove
    markdown links</span>\n    <span class=\"n\">text</span> <span class=\"o\">=</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">sub</span><span
    class=\"p\">(</span><span class=\"sa\">r</span><span class=\"s2\">&quot;\\[([^\\]]+)\\]\\([^)]+\\)&quot;</span><span
    class=\"p\">,</span> <span class=\"sa\">r</span><span class=\"s2\">&quot;\\1&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">text</span><span class=\"p\">)</span>\n
    \   <span class=\"c1\"># Remove markdown formatting characters</span>\n    <span
    class=\"n\">text</span> <span class=\"o\">=</span> <span class=\"n\">re</span><span
    class=\"o\">.</span><span class=\"n\">sub</span><span class=\"p\">(</span><span
    class=\"sa\">r</span><span class=\"s2\">&quot;[*_`#]&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;&quot;</span><span class=\"p\">,</span> <span class=\"n\">text</span><span
    class=\"p\">)</span>\n    <span class=\"c1\"># Clean up any extra whitespace</span>\n
    \   <span class=\"n\">text</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;
    &quot;</span><span class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">text</span><span class=\"o\">.</span><span class=\"n\">split</span><span
    class=\"p\">())</span>\n    <span class=\"k\">return</span> <span class=\"n\">text</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"sync_thoughts\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
    1rem;\">sync_thoughts <em class=\"small\">function</em></h2>\n<p>Fetches thoughts
    and saves them as markdown files.</p>\n</div>\n<div class=\"admonition source
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">sync_thoughts
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">sync_thoughts</span><span class=\"p\">():</span>\n<span
    class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Fetches thoughts and
    saves them as markdown files.&quot;&quot;&quot;</span>\n    <span class=\"n\">output_dir</span>
    <span class=\"o\">=</span> <span class=\"n\">Path</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;pype.dev/content/thoughts&quot;</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">output_dir</span><span class=\"o\">.</span><span class=\"n\">mkdir</span><span
    class=\"p\">(</span><span class=\"n\">parents</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span> <span class=\"n\">exist_ok</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">)</span>\n\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">response</span>
    <span class=\"o\">=</span> <span class=\"n\">requests</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span>\n            <span class=\"c1\">#
    TODOL limit for now</span>\n            <span class=\"s2\">&quot;https://thoughts.waylonwalker.com/posts/Nic/?page_size=5&quot;</span><span
    class=\"p\">,</span>\n            <span class=\"c1\"># &quot;https://thoughts.waylonwalker.com/posts/Nic/?page_size=9999999999&quot;,</span>\n
    \           <span class=\"n\">timeout</span><span class=\"o\">=</span><span class=\"mi\">10</span><span
    class=\"p\">,</span>\n        <span class=\"p\">)</span>\n        <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">posts</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">except</span> <span class=\"n\">requests</span><span class=\"o\">.</span><span
    class=\"n\">RequestException</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n        <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Error fetching thoughts: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n        <span class=\"k\">return</span>\n\n
    \   <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">posts</span><span class=\"p\">:</span>\n        <span class=\"n\">post_id</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;id&quot;</span><span class=\"p\">]</span>\n        <span class=\"n\">slug</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;thoughts-</span><span
    class=\"si\">{</span><span class=\"n\">post_id</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n        <span class=\"n\">filepath</span> <span class=\"o\">=</span>
    <span class=\"n\">output_dir</span> <span class=\"o\">/</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">slug</span><span
    class=\"si\">}</span><span class=\"s2\">.md&quot;</span>\n        <span class=\"n\">cleaned_title</span>
    <span class=\"o\">=</span> <span class=\"n\">clean_title</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">[</span><span class=\"s2\">&quot;title&quot;</span><span
    class=\"p\">])</span>\n        <span class=\"n\">title</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;\U0001F4AD &quot;</span> <span class=\"o\">+</span> <span
    class=\"n\">cleaned_title</span><span class=\"o\">.</span><span class=\"n\">lstrip</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;\U0001F4AD &quot;</span><span class=\"p\">)</span>\n
    \       <span class=\"n\">description</span> <span class=\"o\">=</span> <span
    class=\"n\">clean_description</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">][:</span><span
    class=\"mi\">120</span><span class=\"p\">])</span>\n        <span class=\"n\">link</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;link&quot;</span><span
    class=\"p\">)</span>\n        <span class=\"k\">if</span> <span class=\"ow\">not</span>
    <span class=\"n\">link</span> <span class=\"ow\">or</span> <span class=\"n\">link</span>
    <span class=\"o\">==</span> <span class=\"s2\">&quot;None&quot;</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">link</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;https://pype.dev/</span><span class=\"si\">{</span><span class=\"n\">slug</span><span
    class=\"si\">}</span><span class=\"s2\">/&quot;</span>\n\n        <span class=\"n\">tags</span>
    <span class=\"o\">=</span> <span class=\"p\">[</span>\n            <span class=\"n\">tag</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>
    <span class=\"k\">for</span> <span class=\"n\">tag</span> <span class=\"ow\">in</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;tags&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;&quot;</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">split</span><span class=\"p\">(</span><span class=\"s2\">&quot;,&quot;</span><span
    class=\"p\">)</span> <span class=\"k\">if</span> <span class=\"n\">tag</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \       <span class=\"p\">]</span> <span class=\"o\">+</span> <span class=\"p\">[</span><span
    class=\"s2\">&quot;thoughts&quot;</span><span class=\"p\">]</span>\n\n        <span
    class=\"n\">date</span> <span class=\"o\">=</span> <span class=\"n\">datetime</span><span
    class=\"o\">.</span><span class=\"n\">datetime</span><span class=\"o\">.</span><span
    class=\"n\">now</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"n\">isoformat</span><span class=\"p\">()</span>\n\n        <span class=\"n\">content_body</span>
    <span class=\"o\">=</span> <span class=\"n\">textwrap</span><span class=\"o\">.</span><span
    class=\"n\">dedent</span><span class=\"p\">(</span>\n            <span class=\"sa\">f</span><span
    class=\"s2\">&quot;&quot;&quot;</span>\n<span class=\"s2\">        &lt;a href=&quot;</span><span
    class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;&gt;</span>\n<span class=\"s2\">            &lt;img</span>\n<span
    class=\"s2\">                src=&quot;https://shots.wayl.one/shot/?url=</span><span
    class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&amp;height=450&amp;width=800&amp;scaled_width=800&amp;scaled_height=450&amp;selectors=&quot;</span>\n<span
    class=\"s2\">                alt=&quot;shot of post - </span><span class=\"si\">{</span><span
    class=\"n\">title</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span
    class=\"s2\">                height=450</span>\n<span class=\"s2\">                width=800</span>\n<span
    class=\"s2\">            &gt;</span>\n<span class=\"s2\">        &lt;/a&gt;</span>\n\n<span
    class=\"s2\">        Here&#39;s my thought on &lt;a href=&quot;</span><span class=\"si\">{</span><span
    class=\"n\">link</span><span class=\"si\">}</span><span class=\"s2\">&quot;&gt;</span><span
    class=\"si\">{</span><span class=\"n\">title</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/a&gt;</span>\n\n<span class=\"s2\">        ---</span>\n\n<span
    class=\"s2\">        </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">]</span><span
    class=\"si\">}</span>\n\n<span class=\"s2\">        ---</span>\n\n<span class=\"s2\">
    \       ???+ note &quot;This is one of [[my-thoughts]]&quot;</span>\n<span class=\"s2\">
    \           I picked this up from [Waylon Walker](https://waylonwalker.com) who
    made [thoughts](https://thoughts.waylonwalker.com). It&#39;s a short note that
    I make about someone else&#39;s content online.  Learn more about [[thoughts]]</span>\n<span
    class=\"s2\">        &quot;&quot;&quot;</span>\n        <span class=\"p\">)</span>\n\n
    \       <span class=\"n\">frontmatter</span> <span class=\"o\">=</span> <span
    class=\"n\">textwrap</span><span class=\"o\">.</span><span class=\"n\">dedent</span><span
    class=\"p\">(</span>\n            <span class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span
    class=\"s2\">        ---</span>\n<span class=\"s2\">        title: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">title</span><span class=\"o\">.</span><span
    class=\"n\">replace</span><span class=\"p\">(</span><span class=\"s1\">&#39;&quot;&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;</span><span
    class=\"se\">\\\\</span><span class=\"s1\">&quot;&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span class=\"s2\">        slug:
    &quot;</span><span class=\"si\">{</span><span class=\"n\">slug</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        date: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">date</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        tags: </span><span class=\"si\">{</span><span
    class=\"n\">tags</span><span class=\"si\">}</span>\n<span class=\"s2\">        templateKey:
    &quot;thoughts&quot;</span>\n<span class=\"s2\">        description: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">description</span><span class=\"o\">.</span><span
    class=\"n\">replace</span><span class=\"p\">(</span><span class=\"s1\">&#39;&quot;&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;</span><span
    class=\"se\">\\\\</span><span class=\"s1\">&quot;&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span class=\"s2\">        link:
    &quot;</span><span class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        published: true</span>\n<span
    class=\"s2\">        ---</span>\n<span class=\"s2\">        &quot;&quot;&quot;</span>\n
    \       <span class=\"p\">)</span>\n\n        <span class=\"n\">full_content</span>
    <span class=\"o\">=</span> <span class=\"n\">frontmatter</span><span class=\"o\">.</span><span
    class=\"n\">strip</span><span class=\"p\">()</span> <span class=\"o\">+</span>
    <span class=\"s2\">&quot;</span><span class=\"se\">\\n\\n</span><span class=\"s2\">&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">content_body</span><span class=\"o\">.</span><span
    class=\"n\">strip</span><span class=\"p\">()</span>\n\n        <span class=\"k\">with</span>
    <span class=\"nb\">open</span><span class=\"p\">(</span><span class=\"n\">filepath</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">encoding</span><span class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span
    class=\"p\">)</span> <span class=\"k\">as</span> <span class=\"n\">f</span><span
    class=\"p\">:</span>\n            <span class=\"n\">f</span><span class=\"o\">.</span><span
    class=\"n\">write</span><span class=\"p\">(</span><span class=\"n\">full_content</span><span
    class=\"p\">)</span>\n        <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Saved thought: </span><span class=\"si\">{</span><span
    class=\"n\">filepath</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n\n    </section>\n</article>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>sync-thoughts.py</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Sync thoughts from the web to local markdown
    files. !!! function\n    &lt;h2 id=&quot;clean_title&quot; class=&quot;admonition-title&quot;
    style=&quot;margin: 0;\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<script src=\"/theme.js\"></script>\n<script
    src=\"/image-modal.js\"></script>\n\n<!-- Open Graph and Twitter Card meta tags
    -->\n<!-- Regular post meta tags -->\n<meta property=\"og:title\" content=\"sync-thoughts.py
    | Nic Payne\" />\n<meta property=\"og:description\" content=\"Sync thoughts from
    the web to local markdown files. !!! function\n    &lt;h2 id=&quot;clean_title&quot;
    class=&quot;admonition-title&quot; style=&quot;margin: 0;\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.devscripts/sync-thoughts\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"sync-thoughts.py | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Sync thoughts from the web to local markdown files. !!! function\n    &lt;h2
    id=&quot;clean_title&quot; class=&quot;admonition-title&quot; style=&quot;margin:
    0;\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png\"
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
    \       </style>\n    </head>\n    <body class=\"font-sans\">\n<div class='flex
    flex-row w-full min-h-screen bg-pattern-gradient text-text-main'>\n    <main class=\"flex-grow
    fade-in overflow-visible\">\n        <div class='container flex-grow p-2 sm:p-6
    mx-auto bg-content-blend overflow-visible'>\n<header class='py-4'>\n\n    <nav
    class='flex flex-wrap justify-center sm:justify-start items-center'>\n        <a
    class=\"nav-link accent-glow\"\n            href='/'>Home</a>\n        <a class=\"nav-link
    accent-glow\"\n            href='https://github.com/pypeaday/pype.dev'>GitHub</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='https://mydigitalharbor.com/pypeaday'>DigitalHarbor</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/slash'>Start Here</a>\n
    \       <a class=\"nav-link accent-glow\"\n            href='/my-thoughts'>My
    Thoughts</a>\n    </nav>\n\n    <!-- <div>\n        <label id=\"theme-switch\"
    class=\"theme-switch\" for=\"checkbox-theme\" title=\"light/dark mode toggle\">\n
    \           <input type=\"checkbox\" id=\"checkbox-theme\" />\n            <div
    class=\"slider round\"></div>\n        </label>\n    </div> -->\n</header><div
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
    {\n        updateResults(findSimilar(currentPath));\n    }\n</script>    <!--
    Content is handled by the password protection plugin -->\n    <hr />\n<p>Sync
    thoughts from the web to local markdown files.</p>\n<hr />\n<div class=\"admonition
    function\">\n<p class=\"admonition-title\">Function</p>\n<h2 id=\"clean_title\"
    class=\"admonition-title\" style=\"margin: 0; padding: .5rem 1rem;\">clean_title
    <em class=\"small\">function</em></h2>\n<p>Cleans the title of a post.</p>\n</div>\n<div
    class=\"admonition source is-collapsible collapsible-open\">\n<p class=\"admonition-title\">clean_title
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">clean_title</span><span class=\"p\">(</span><span
    class=\"n\">title</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Cleans
    the title of a post.&quot;&quot;&quot;</span>\n    <span class=\"c1\"># Remove
    parenthetical content that starts with a number</span>\n    <span class=\"n\">title</span>
    <span class=\"o\">=</span> <span class=\"n\">re</span><span class=\"o\">.</span><span
    class=\"n\">sub</span><span class=\"p\">(</span><span class=\"sa\">r</span><span
    class=\"s2\">&quot;\\(\\d+[^)]*\\)&quot;</span><span class=\"p\">,</span> <span
    class=\"s2\">&quot;&quot;</span><span class=\"p\">,</span> <span class=\"n\">title</span><span
    class=\"p\">)</span>\n    <span class=\"c1\"># Trim whitespace</span>\n    <span
    class=\"n\">title</span> <span class=\"o\">=</span> <span class=\"n\">title</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \   <span class=\"c1\"># Limit to 65 characters</span>\n    <span class=\"k\">if</span>
    <span class=\"nb\">len</span><span class=\"p\">(</span><span class=\"n\">title</span><span
    class=\"p\">)</span> <span class=\"o\">&gt;</span> <span class=\"mi\">65</span><span
    class=\"p\">:</span>\n        <span class=\"n\">title</span> <span class=\"o\">=</span>
    <span class=\"n\">title</span><span class=\"p\">[:</span><span class=\"mi\">62</span><span
    class=\"p\">]</span> <span class=\"o\">+</span> <span class=\"s2\">&quot;...&quot;</span>\n
    \   <span class=\"k\">return</span> <span class=\"n\">title</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"clean_description\" class=\"admonition-title\" style=\"margin: 0; padding:
    .5rem 1rem;\">clean_description <em class=\"small\">function</em></h2>\n<p>Cleans
    the description text.</p>\n</div>\n<div class=\"admonition source is-collapsible
    collapsible-open\">\n<p class=\"admonition-title\">clean_description <em class='small'>source</em></p>\n<pre
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">clean_description</span><span class=\"p\">(</span><span
    class=\"n\">text</span><span class=\"p\">:</span> <span class=\"nb\">str</span><span
    class=\"p\">)</span> <span class=\"o\">-&gt;</span> <span class=\"nb\">str</span><span
    class=\"p\">:</span>\n<span class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Cleans
    the description text.&quot;&quot;&quot;</span>\n    <span class=\"c1\"># Remove
    markdown links</span>\n    <span class=\"n\">text</span> <span class=\"o\">=</span>
    <span class=\"n\">re</span><span class=\"o\">.</span><span class=\"n\">sub</span><span
    class=\"p\">(</span><span class=\"sa\">r</span><span class=\"s2\">&quot;\\[([^\\]]+)\\]\\([^)]+\\)&quot;</span><span
    class=\"p\">,</span> <span class=\"sa\">r</span><span class=\"s2\">&quot;\\1&quot;</span><span
    class=\"p\">,</span> <span class=\"n\">text</span><span class=\"p\">)</span>\n
    \   <span class=\"c1\"># Remove markdown formatting characters</span>\n    <span
    class=\"n\">text</span> <span class=\"o\">=</span> <span class=\"n\">re</span><span
    class=\"o\">.</span><span class=\"n\">sub</span><span class=\"p\">(</span><span
    class=\"sa\">r</span><span class=\"s2\">&quot;[*_`#]&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;&quot;</span><span class=\"p\">,</span> <span class=\"n\">text</span><span
    class=\"p\">)</span>\n    <span class=\"c1\"># Clean up any extra whitespace</span>\n
    \   <span class=\"n\">text</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;
    &quot;</span><span class=\"o\">.</span><span class=\"n\">join</span><span class=\"p\">(</span><span
    class=\"n\">text</span><span class=\"o\">.</span><span class=\"n\">split</span><span
    class=\"p\">())</span>\n    <span class=\"k\">return</span> <span class=\"n\">text</span>\n</pre></div>\n\n</pre>\n\n</div>\n<div
    class=\"admonition function\">\n<p class=\"admonition-title\">Function</p>\n<h2
    id=\"sync_thoughts\" class=\"admonition-title\" style=\"margin: 0; padding: .5rem
    1rem;\">sync_thoughts <em class=\"small\">function</em></h2>\n<p>Fetches thoughts
    and saves them as markdown files.</p>\n</div>\n<div class=\"admonition source
    is-collapsible collapsible-open\">\n<p class=\"admonition-title\">sync_thoughts
    <em class='small'>source</em></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"k\">def</span><span
    class=\"w\"> </span><span class=\"nf\">sync_thoughts</span><span class=\"p\">():</span>\n<span
    class=\"w\">    </span><span class=\"sd\">&quot;&quot;&quot;Fetches thoughts and
    saves them as markdown files.&quot;&quot;&quot;</span>\n    <span class=\"n\">output_dir</span>
    <span class=\"o\">=</span> <span class=\"n\">Path</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;pype.dev/content/thoughts&quot;</span><span class=\"p\">)</span>\n
    \   <span class=\"n\">output_dir</span><span class=\"o\">.</span><span class=\"n\">mkdir</span><span
    class=\"p\">(</span><span class=\"n\">parents</span><span class=\"o\">=</span><span
    class=\"kc\">True</span><span class=\"p\">,</span> <span class=\"n\">exist_ok</span><span
    class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">)</span>\n\n
    \   <span class=\"k\">try</span><span class=\"p\">:</span>\n        <span class=\"n\">response</span>
    <span class=\"o\">=</span> <span class=\"n\">requests</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span>\n            <span class=\"c1\">#
    TODOL limit for now</span>\n            <span class=\"s2\">&quot;https://thoughts.waylonwalker.com/posts/Nic/?page_size=5&quot;</span><span
    class=\"p\">,</span>\n            <span class=\"c1\"># &quot;https://thoughts.waylonwalker.com/posts/Nic/?page_size=9999999999&quot;,</span>\n
    \           <span class=\"n\">timeout</span><span class=\"o\">=</span><span class=\"mi\">10</span><span
    class=\"p\">,</span>\n        <span class=\"p\">)</span>\n        <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">raise_for_status</span><span class=\"p\">()</span>\n
    \       <span class=\"n\">posts</span> <span class=\"o\">=</span> <span class=\"n\">response</span><span
    class=\"o\">.</span><span class=\"n\">json</span><span class=\"p\">()</span>\n
    \   <span class=\"k\">except</span> <span class=\"n\">requests</span><span class=\"o\">.</span><span
    class=\"n\">RequestException</span> <span class=\"k\">as</span> <span class=\"n\">e</span><span
    class=\"p\">:</span>\n        <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Error fetching thoughts: </span><span
    class=\"si\">{</span><span class=\"n\">e</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span><span class=\"p\">)</span>\n        <span class=\"k\">return</span>\n\n
    \   <span class=\"k\">for</span> <span class=\"n\">post</span> <span class=\"ow\">in</span>
    <span class=\"n\">posts</span><span class=\"p\">:</span>\n        <span class=\"n\">post_id</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"p\">[</span><span
    class=\"s2\">&quot;id&quot;</span><span class=\"p\">]</span>\n        <span class=\"n\">slug</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;thoughts-</span><span
    class=\"si\">{</span><span class=\"n\">post_id</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n        <span class=\"n\">filepath</span> <span class=\"o\">=</span>
    <span class=\"n\">output_dir</span> <span class=\"o\">/</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;</span><span class=\"si\">{</span><span class=\"n\">slug</span><span
    class=\"si\">}</span><span class=\"s2\">.md&quot;</span>\n        <span class=\"n\">cleaned_title</span>
    <span class=\"o\">=</span> <span class=\"n\">clean_title</span><span class=\"p\">(</span><span
    class=\"n\">post</span><span class=\"p\">[</span><span class=\"s2\">&quot;title&quot;</span><span
    class=\"p\">])</span>\n        <span class=\"n\">title</span> <span class=\"o\">=</span>
    <span class=\"s2\">&quot;\U0001F4AD &quot;</span> <span class=\"o\">+</span> <span
    class=\"n\">cleaned_title</span><span class=\"o\">.</span><span class=\"n\">lstrip</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;\U0001F4AD &quot;</span><span class=\"p\">)</span>\n
    \       <span class=\"n\">description</span> <span class=\"o\">=</span> <span
    class=\"n\">clean_description</span><span class=\"p\">(</span><span class=\"n\">post</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">][:</span><span
    class=\"mi\">120</span><span class=\"p\">])</span>\n        <span class=\"n\">link</span>
    <span class=\"o\">=</span> <span class=\"n\">post</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;link&quot;</span><span
    class=\"p\">)</span>\n        <span class=\"k\">if</span> <span class=\"ow\">not</span>
    <span class=\"n\">link</span> <span class=\"ow\">or</span> <span class=\"n\">link</span>
    <span class=\"o\">==</span> <span class=\"s2\">&quot;None&quot;</span><span class=\"p\">:</span>\n
    \           <span class=\"n\">link</span> <span class=\"o\">=</span> <span class=\"sa\">f</span><span
    class=\"s2\">&quot;https://pype.dev/</span><span class=\"si\">{</span><span class=\"n\">slug</span><span
    class=\"si\">}</span><span class=\"s2\">/&quot;</span>\n\n        <span class=\"n\">tags</span>
    <span class=\"o\">=</span> <span class=\"p\">[</span>\n            <span class=\"n\">tag</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>
    <span class=\"k\">for</span> <span class=\"n\">tag</span> <span class=\"ow\">in</span>
    <span class=\"n\">post</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;tags&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;&quot;</span><span class=\"p\">)</span><span class=\"o\">.</span><span
    class=\"n\">split</span><span class=\"p\">(</span><span class=\"s2\">&quot;,&quot;</span><span
    class=\"p\">)</span> <span class=\"k\">if</span> <span class=\"n\">tag</span><span
    class=\"o\">.</span><span class=\"n\">strip</span><span class=\"p\">()</span>\n
    \       <span class=\"p\">]</span> <span class=\"o\">+</span> <span class=\"p\">[</span><span
    class=\"s2\">&quot;thoughts&quot;</span><span class=\"p\">]</span>\n\n        <span
    class=\"n\">date</span> <span class=\"o\">=</span> <span class=\"n\">datetime</span><span
    class=\"o\">.</span><span class=\"n\">datetime</span><span class=\"o\">.</span><span
    class=\"n\">now</span><span class=\"p\">()</span><span class=\"o\">.</span><span
    class=\"n\">isoformat</span><span class=\"p\">()</span>\n\n        <span class=\"n\">content_body</span>
    <span class=\"o\">=</span> <span class=\"n\">textwrap</span><span class=\"o\">.</span><span
    class=\"n\">dedent</span><span class=\"p\">(</span>\n            <span class=\"sa\">f</span><span
    class=\"s2\">&quot;&quot;&quot;</span>\n<span class=\"s2\">        &lt;a href=&quot;</span><span
    class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;&gt;</span>\n<span class=\"s2\">            &lt;img</span>\n<span
    class=\"s2\">                src=&quot;https://shots.wayl.one/shot/?url=</span><span
    class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&amp;height=450&amp;width=800&amp;scaled_width=800&amp;scaled_height=450&amp;selectors=&quot;</span>\n<span
    class=\"s2\">                alt=&quot;shot of post - </span><span class=\"si\">{</span><span
    class=\"n\">title</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span
    class=\"s2\">                height=450</span>\n<span class=\"s2\">                width=800</span>\n<span
    class=\"s2\">            &gt;</span>\n<span class=\"s2\">        &lt;/a&gt;</span>\n\n<span
    class=\"s2\">        Here&#39;s my thought on &lt;a href=&quot;</span><span class=\"si\">{</span><span
    class=\"n\">link</span><span class=\"si\">}</span><span class=\"s2\">&quot;&gt;</span><span
    class=\"si\">{</span><span class=\"n\">title</span><span class=\"si\">}</span><span
    class=\"s2\">&lt;/a&gt;</span>\n\n<span class=\"s2\">        ---</span>\n\n<span
    class=\"s2\">        </span><span class=\"si\">{</span><span class=\"n\">post</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;message&quot;</span><span class=\"p\">]</span><span
    class=\"si\">}</span>\n\n<span class=\"s2\">        ---</span>\n\n<span class=\"s2\">
    \       ???+ note &quot;This is one of [[my-thoughts]]&quot;</span>\n<span class=\"s2\">
    \           I picked this up from [Waylon Walker](https://waylonwalker.com) who
    made [thoughts](https://thoughts.waylonwalker.com). It&#39;s a short note that
    I make about someone else&#39;s content online.  Learn more about [[thoughts]]</span>\n<span
    class=\"s2\">        &quot;&quot;&quot;</span>\n        <span class=\"p\">)</span>\n\n
    \       <span class=\"n\">frontmatter</span> <span class=\"o\">=</span> <span
    class=\"n\">textwrap</span><span class=\"o\">.</span><span class=\"n\">dedent</span><span
    class=\"p\">(</span>\n            <span class=\"sa\">f</span><span class=\"s2\">&quot;&quot;&quot;</span>\n<span
    class=\"s2\">        ---</span>\n<span class=\"s2\">        title: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">title</span><span class=\"o\">.</span><span
    class=\"n\">replace</span><span class=\"p\">(</span><span class=\"s1\">&#39;&quot;&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;</span><span
    class=\"se\">\\\\</span><span class=\"s1\">&quot;&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span class=\"s2\">        slug:
    &quot;</span><span class=\"si\">{</span><span class=\"n\">slug</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        date: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">date</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        tags: </span><span class=\"si\">{</span><span
    class=\"n\">tags</span><span class=\"si\">}</span>\n<span class=\"s2\">        templateKey:
    &quot;thoughts&quot;</span>\n<span class=\"s2\">        description: &quot;</span><span
    class=\"si\">{</span><span class=\"n\">description</span><span class=\"o\">.</span><span
    class=\"n\">replace</span><span class=\"p\">(</span><span class=\"s1\">&#39;&quot;&#39;</span><span
    class=\"p\">,</span><span class=\"w\"> </span><span class=\"s1\">&#39;</span><span
    class=\"se\">\\\\</span><span class=\"s1\">&quot;&#39;</span><span class=\"p\">)</span><span
    class=\"si\">}</span><span class=\"s2\">&quot;</span>\n<span class=\"s2\">        link:
    &quot;</span><span class=\"si\">{</span><span class=\"n\">link</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n<span class=\"s2\">        published: true</span>\n<span
    class=\"s2\">        ---</span>\n<span class=\"s2\">        &quot;&quot;&quot;</span>\n
    \       <span class=\"p\">)</span>\n\n        <span class=\"n\">full_content</span>
    <span class=\"o\">=</span> <span class=\"n\">frontmatter</span><span class=\"o\">.</span><span
    class=\"n\">strip</span><span class=\"p\">()</span> <span class=\"o\">+</span>
    <span class=\"s2\">&quot;</span><span class=\"se\">\\n\\n</span><span class=\"s2\">&quot;</span>
    <span class=\"o\">+</span> <span class=\"n\">content_body</span><span class=\"o\">.</span><span
    class=\"n\">strip</span><span class=\"p\">()</span>\n\n        <span class=\"k\">with</span>
    <span class=\"nb\">open</span><span class=\"p\">(</span><span class=\"n\">filepath</span><span
    class=\"p\">,</span> <span class=\"s2\">&quot;w&quot;</span><span class=\"p\">,</span>
    <span class=\"n\">encoding</span><span class=\"o\">=</span><span class=\"s2\">&quot;utf-8&quot;</span><span
    class=\"p\">)</span> <span class=\"k\">as</span> <span class=\"n\">f</span><span
    class=\"p\">:</span>\n            <span class=\"n\">f</span><span class=\"o\">.</span><span
    class=\"n\">write</span><span class=\"p\">(</span><span class=\"n\">full_content</span><span
    class=\"p\">)</span>\n        <span class=\"nb\">print</span><span class=\"p\">(</span><span
    class=\"sa\">f</span><span class=\"s2\">&quot;Saved thought: </span><span class=\"si\">{</span><span
    class=\"n\">filepath</span><span class=\"si\">}</span><span class=\"s2\">&quot;</span><span
    class=\"p\">)</span>\n</pre></div>\n\n</pre>\n\n</div>\n\n        </div>\n    </main>\n\n</div>\n
    \    </body>\n</html>"
  raw.md: ''
published: false
slug: scripts/sync-thoughts
title: sync-thoughts.py


---

---

Sync thoughts from the web to local markdown files.

---

!!! function
    <h2 id="clean_title" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">clean_title <em class="small">function</em></h2>

    Cleans the title of a post.

???+ source "clean_title <em class='small'>source</em>"
    ```python
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
    ```
!!! function
    <h2 id="clean_description" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">clean_description <em class="small">function</em></h2>

    Cleans the description text.

???+ source "clean_description <em class='small'>source</em>"
    ```python
    def clean_description(text: str) -> str:
        """Cleans the description text."""
        # Remove markdown links
        text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
        # Remove markdown formatting characters
        text = re.sub(r"[*_`#]", "", text)
        # Clean up any extra whitespace
        text = " ".join(text.split())
        return text
    ```
!!! function
    <h2 id="sync_thoughts" class="admonition-title" style="margin: 0; padding: .5rem 1rem;">sync_thoughts <em class="small">function</em></h2>

    Fetches thoughts and saves them as markdown files.

???+ source "sync_thoughts <em class='small'>source</em>"
    ```python
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
            templateKey: "thoughts"
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
    ```