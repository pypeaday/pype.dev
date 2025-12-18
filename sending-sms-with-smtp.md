---
content: "I'm cooking something up over here that will include SMS message notifications\nas
  a feature and I've been doing some reading on different providers...\n\nMany specialize
  in bulk SMS messaging, like for campaigns and promotions. So\nthis pricing model
  doesn't work for me.\n\nThe providers that do quick single SMS messages are often
  $0.005 to $.04 cents\nper message which isn't insanity but I'm not exactly backed
  by anyone...\n\nWell today I learned that you can actually send SMS messages via
  SMTP! I\nwouldn't bank on total reliability here but for testing and initial roll
  out of\nwhat I want I think this will be perfect.\n\nAnd because I'm just that kind
  of guy, here's some code you can `uv run\nsmtp2sms.py` and get yourself a handy
  little text. I'm going to build a simpler\nmodule but you can get a `gmail` and
  `gmail app password` within about 10\nminutes. [see here](https://support.google.com/mail/answer/185833?hl=en)\n\n```python\n#
  /// script\n# requires-python = \">=3.10\"\n# dependencies = [\n# ]\n# ///\nimport
  os, smtplib\nfrom email.mime.text import MIMEText\n\nSMTP_APP_USER=os.environ.get(\"SMTP_APP_USER\")
  # me@gmail.com\nSMTP_APP_PASSWORD=os.environ.get(\"SMTP_APP_PASSWORD\")\nSMTP_SERVER=os.environ.get(\"SMTP_SERVER\")
  \ # smtp.gmail.ch\n\n# NOTE: I haven't verified all the carrier domains - this was
  provided by ChatGPT\n\ncarriers = {\n    \"att\": {\n        \"sms\": \"txt.att.net\",\n
  \       \"mms\": \"mms.att.net\"\n    },\n    \"tmobile\": {\n        \"sms\": \"tmomail.net\",\n
  \       \"mms\": \"tmomail.net\"\n    },\n    \"verizon\": {\n        # \"sms\":
  \"vtext.com\", # not reliable\n        \"sms\": \"vzwpix.com\",\n        \"mms\":
  \"vzwpix.com\"\n    },\n    \"sprint\": {\n        \"sms\": \"messaging.sprintpcs.com\",\n
  \       \"mms\": \"pm.sprint.com\"\n    },\n    \"googlefi\": {\n        \"sms\":
  \"msg.fi.google.com\",\n        \"mms\": \"msg.fi.google.com\"\n    },\n    \"uscellular\":
  {\n        \"sms\": \"email.uscc.net\",\n        \"mms\": \"mms.uscc.net\"\n    },\n
  \   \"boost\": {\n        \"sms\": \"sms.myboostmobile.com\",\n        \"mms\":
  \"myboostmobile.com\"\n    },\n    \"cricket\": {\n        \"sms\": \"sms.cricketwireless.net\",\n
  \       \"mms\": \"mms.cricketwireless.net\"\n    },\n    \"metropcs\": {\n        \"sms\":
  \"mymetropcs.com\",\n        \"mms\": \"mymetropcs.com\"\n    },\n    \"virgin\":
  {\n        \"sms\": \"vmobl.com\",\n        \"mms\": \"vmobl.com\"\n    }\n}\ncontacts
  = {\n    \"me\": {\"carrier\": \"verizon\", \"number\": \"1234567890\"},\n}\nmsg
  = MIMEText(\"Hello from a python script? What?!\")\nmsg[\"From\"] = SMTP_APP_USER\n\nSEND_TO
  = \"me\"\n\n# Complex for my future use cases - deal with it\nmsg[\"To\"] = f\"{contacts[SEND_TO]['number']}@{carriers[contacts[SEND_TO]['carrier']]['sms']}\"\n\nwith
  smtplib.SMTP(SMTP_SERVER, 587) as email_handler:\n    email_handler.starttls()\n
  \   email_handler.login(SMTP_APP_USER, SMTP_APP_PASSWORD)\n    email_handler.sendmail(SMTP_APP_USER,
  [msg[\"To\"]], msg.as_string())\n\n```"
date: 2025-10-04
description: 'I&#x27;m cooking something up over here that will include SMS message
  notifications

  as a feature and I&#x27;ve been doing some reading on different providers...'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Sending SMS with
    SMTP</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I&#x27;m cooking something
    up over here that will include SMS message notifications\nas a feature and I&#x27;ve
    been doing some reading on different providers...\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Sending SMS with SMTP | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/sending-sms-with-smtp\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Sending SMS with SMTP | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I&#x27;m cooking something up over here that will include SMS message
    notifications\nas a feature and I&#x27;ve been doing some reading on different
    providers...\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"
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
    \           <span class=\"site-terminal__dir\">~/sending-sms-with-smtp</span>\n
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
    class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n        <div
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"
    alt=\"Sending SMS with SMTP cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Sending
    SMS with SMTP</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2025-10-04\">\n            October 04, 2025\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/til/\" class=\"inline-block bg-primary-light text-accent-cool
    text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80 transition-colors
    border border-accent-cool/20 hover-lift\">\n                #til\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I'm cooking something up over here
    that will include SMS message notifications\nas a feature and I've been doing
    some reading on different providers...</p>\n<p>Many specialize in bulk SMS messaging,
    like for campaigns and promotions. So\nthis pricing model doesn't work for me.</p>\n<p>The
    providers that do quick single SMS messages are often $0.005 to $.04 cents\nper
    message which isn't insanity but I'm not exactly backed by anyone...</p>\n<p>Well
    today I learned that you can actually send SMS messages via SMTP! I\nwouldn't
    bank on total reliability here but for testing and initial roll out of\nwhat I
    want I think this will be perfect.</p>\n<p>And because I'm just that kind of guy,
    here's some code you can <code>uv run smtp2sms.py</code> and get yourself a handy
    little text. I'm going to build a simpler\nmodule but you can get a <code>gmail</code>
    and <code>gmail app password</code> within about 10\nminutes. <a href=\"https://support.google.com/mail/answer/185833?hl=en\">see
    here</a></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># ///
    script</span>\n<span class=\"c1\"># requires-python = &quot;&gt;=3.10&quot;</span>\n<span
    class=\"c1\"># dependencies = [</span>\n<span class=\"c1\"># ]</span>\n<span class=\"c1\">#
    ///</span>\n<span class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">os</span><span
    class=\"o\">,</span><span class=\"w\"> </span><span class=\"nn\">smtplib</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">email.mime.text</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">MIMEText</span>\n\n<span
    class=\"n\">SMTP_APP_USER</span><span class=\"o\">=</span><span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">environ</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;SMTP_APP_USER&quot;</span><span
    class=\"p\">)</span> <span class=\"c1\"># me@gmail.com</span>\n<span class=\"n\">SMTP_APP_PASSWORD</span><span
    class=\"o\">=</span><span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">environ</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;SMTP_APP_PASSWORD&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">SMTP_SERVER</span><span class=\"o\">=</span><span
    class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;SMTP_SERVER&quot;</span><span class=\"p\">)</span>  <span class=\"c1\">#
    smtp.gmail.ch</span>\n\n<span class=\"c1\"># NOTE: I haven&#39;t verified all
    the carrier domains - this was provided by ChatGPT</span>\n\n<span class=\"n\">carriers</span>
    <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span class=\"s2\">&quot;att&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;txt.att.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mms.att.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;tmobile&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;tmomail.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;tmomail.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;verizon&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"c1\"># &quot;sms&quot;: &quot;vtext.com&quot;,
    # not reliable</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;vzwpix.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;vzwpix.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;sprint&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;messaging.sprintpcs.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;pm.sprint.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;googlefi&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;msg.fi.google.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;msg.fi.google.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;uscellular&quot;</span><span class=\"p\">:</span>
    <span class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;email.uscc.net&quot;</span><span
    class=\"p\">,</span>\n        <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;mms.uscc.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;boost&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;sms.myboostmobile.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;myboostmobile.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;cricket&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;sms.cricketwireless.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mms.cricketwireless.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;metropcs&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;mymetropcs.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mymetropcs.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;virgin&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;vmobl.com&quot;</span><span class=\"p\">,</span>\n        <span
    class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;vmobl.com&quot;</span>\n
    \   <span class=\"p\">}</span>\n<span class=\"p\">}</span>\n<span class=\"n\">contacts</span>
    <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span class=\"s2\">&quot;me&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span><span class=\"s2\">&quot;carrier&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;verizon&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;number&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;1234567890&quot;</span><span
    class=\"p\">},</span>\n<span class=\"p\">}</span>\n<span class=\"n\">msg</span>
    <span class=\"o\">=</span> <span class=\"n\">MIMEText</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Hello from a python script? What?!&quot;</span><span class=\"p\">)</span>\n<span
    class=\"n\">msg</span><span class=\"p\">[</span><span class=\"s2\">&quot;From&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">SMTP_APP_USER</span>\n\n<span
    class=\"n\">SEND_TO</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;me&quot;</span>\n\n<span
    class=\"c1\"># Complex for my future use cases - deal with it</span>\n<span class=\"n\">msg</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;To&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;</span><span
    class=\"si\">{</span><span class=\"n\">contacts</span><span class=\"p\">[</span><span
    class=\"n\">SEND_TO</span><span class=\"p\">][</span><span class=\"s1\">&#39;number&#39;</span><span
    class=\"p\">]</span><span class=\"si\">}</span><span class=\"s2\">@</span><span
    class=\"si\">{</span><span class=\"n\">carriers</span><span class=\"p\">[</span><span
    class=\"n\">contacts</span><span class=\"p\">[</span><span class=\"n\">SEND_TO</span><span
    class=\"p\">][</span><span class=\"s1\">&#39;carrier&#39;</span><span class=\"p\">]][</span><span
    class=\"s1\">&#39;sms&#39;</span><span class=\"p\">]</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n\n<span class=\"k\">with</span> <span class=\"n\">smtplib</span><span
    class=\"o\">.</span><span class=\"n\">SMTP</span><span class=\"p\">(</span><span
    class=\"n\">SMTP_SERVER</span><span class=\"p\">,</span> <span class=\"mi\">587</span><span
    class=\"p\">)</span> <span class=\"k\">as</span> <span class=\"n\">email_handler</span><span
    class=\"p\">:</span>\n    <span class=\"n\">email_handler</span><span class=\"o\">.</span><span
    class=\"n\">starttls</span><span class=\"p\">()</span>\n    <span class=\"n\">email_handler</span><span
    class=\"o\">.</span><span class=\"n\">login</span><span class=\"p\">(</span><span
    class=\"n\">SMTP_APP_USER</span><span class=\"p\">,</span> <span class=\"n\">SMTP_APP_PASSWORD</span><span
    class=\"p\">)</span>\n    <span class=\"n\">email_handler</span><span class=\"o\">.</span><span
    class=\"n\">sendmail</span><span class=\"p\">(</span><span class=\"n\">SMTP_APP_USER</span><span
    class=\"p\">,</span> <span class=\"p\">[</span><span class=\"n\">msg</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;To&quot;</span><span class=\"p\">]],</span>
    <span class=\"n\">msg</span><span class=\"o\">.</span><span class=\"n\">as_string</span><span
    class=\"p\">())</span>\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Sending SMS with SMTP</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"I&#x27;m cooking something up over here
    that will include SMS message notifications\nas a feature and I&#x27;ve been doing
    some reading on different providers...\" />\n <link href=\"/favicon.ico\" rel=\"icon\"
    type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Sending SMS with SMTP | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/sending-sms-with-smtp\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Sending SMS with SMTP | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I&#x27;m cooking something up over here that will include SMS message
    notifications\nas a feature and I&#x27;ve been doing some reading on different
    providers...\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"
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
    mb-4 post-title-large\">Sending SMS with SMTP</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-10-04\">\n            October
    04, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/til/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #til\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"
    alt=\"Sending SMS with SMTP cover image\">\n        </div>\n    </figure>\n\n
    \   <article class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n
    \   <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\"
    class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">Sending
    SMS with SMTP</h1>\n    <div class=\"flex items-center text-sm text-text-main/80
    mb-6\">\n        <time datetime=\"2025-10-04\">\n            October 04, 2025\n
    \       </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n            <a
    href=\"https://pype.dev//tags/til/\" class=\"inline-block bg-primary-light text-accent-cool
    text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80 transition-colors
    border border-accent-cool/20 hover-lift\">\n                #til\n            </a>\n
    \           <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <p>I'm cooking something up over here
    that will include SMS message notifications\nas a feature and I've been doing
    some reading on different providers...</p>\n<p>Many specialize in bulk SMS messaging,
    like for campaigns and promotions. So\nthis pricing model doesn't work for me.</p>\n<p>The
    providers that do quick single SMS messages are often $0.005 to $.04 cents\nper
    message which isn't insanity but I'm not exactly backed by anyone...</p>\n<p>Well
    today I learned that you can actually send SMS messages via SMTP! I\nwouldn't
    bank on total reliability here but for testing and initial roll out of\nwhat I
    want I think this will be perfect.</p>\n<p>And because I'm just that kind of guy,
    here's some code you can <code>uv run smtp2sms.py</code> and get yourself a handy
    little text. I'm going to build a simpler\nmodule but you can get a <code>gmail</code>
    and <code>gmail app password</code> within about 10\nminutes. <a href=\"https://support.google.com/mail/answer/185833?hl=en\">see
    here</a></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># ///
    script</span>\n<span class=\"c1\"># requires-python = &quot;&gt;=3.10&quot;</span>\n<span
    class=\"c1\"># dependencies = [</span>\n<span class=\"c1\"># ]</span>\n<span class=\"c1\">#
    ///</span>\n<span class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">os</span><span
    class=\"o\">,</span><span class=\"w\"> </span><span class=\"nn\">smtplib</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">email.mime.text</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">MIMEText</span>\n\n<span
    class=\"n\">SMTP_APP_USER</span><span class=\"o\">=</span><span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">environ</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;SMTP_APP_USER&quot;</span><span
    class=\"p\">)</span> <span class=\"c1\"># me@gmail.com</span>\n<span class=\"n\">SMTP_APP_PASSWORD</span><span
    class=\"o\">=</span><span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">environ</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;SMTP_APP_PASSWORD&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">SMTP_SERVER</span><span class=\"o\">=</span><span
    class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;SMTP_SERVER&quot;</span><span class=\"p\">)</span>  <span class=\"c1\">#
    smtp.gmail.ch</span>\n\n<span class=\"c1\"># NOTE: I haven&#39;t verified all
    the carrier domains - this was provided by ChatGPT</span>\n\n<span class=\"n\">carriers</span>
    <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span class=\"s2\">&quot;att&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;txt.att.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mms.att.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;tmobile&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;tmomail.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;tmomail.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;verizon&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"c1\"># &quot;sms&quot;: &quot;vtext.com&quot;,
    # not reliable</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;vzwpix.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;vzwpix.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;sprint&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;messaging.sprintpcs.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;pm.sprint.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;googlefi&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;msg.fi.google.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;msg.fi.google.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;uscellular&quot;</span><span class=\"p\">:</span>
    <span class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;email.uscc.net&quot;</span><span
    class=\"p\">,</span>\n        <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;mms.uscc.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;boost&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;sms.myboostmobile.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;myboostmobile.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;cricket&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;sms.cricketwireless.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mms.cricketwireless.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;metropcs&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;mymetropcs.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mymetropcs.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;virgin&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;vmobl.com&quot;</span><span class=\"p\">,</span>\n        <span
    class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;vmobl.com&quot;</span>\n
    \   <span class=\"p\">}</span>\n<span class=\"p\">}</span>\n<span class=\"n\">contacts</span>
    <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span class=\"s2\">&quot;me&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span><span class=\"s2\">&quot;carrier&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;verizon&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;number&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;1234567890&quot;</span><span
    class=\"p\">},</span>\n<span class=\"p\">}</span>\n<span class=\"n\">msg</span>
    <span class=\"o\">=</span> <span class=\"n\">MIMEText</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Hello from a python script? What?!&quot;</span><span class=\"p\">)</span>\n<span
    class=\"n\">msg</span><span class=\"p\">[</span><span class=\"s2\">&quot;From&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">SMTP_APP_USER</span>\n\n<span
    class=\"n\">SEND_TO</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;me&quot;</span>\n\n<span
    class=\"c1\"># Complex for my future use cases - deal with it</span>\n<span class=\"n\">msg</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;To&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;</span><span
    class=\"si\">{</span><span class=\"n\">contacts</span><span class=\"p\">[</span><span
    class=\"n\">SEND_TO</span><span class=\"p\">][</span><span class=\"s1\">&#39;number&#39;</span><span
    class=\"p\">]</span><span class=\"si\">}</span><span class=\"s2\">@</span><span
    class=\"si\">{</span><span class=\"n\">carriers</span><span class=\"p\">[</span><span
    class=\"n\">contacts</span><span class=\"p\">[</span><span class=\"n\">SEND_TO</span><span
    class=\"p\">][</span><span class=\"s1\">&#39;carrier&#39;</span><span class=\"p\">]][</span><span
    class=\"s1\">&#39;sms&#39;</span><span class=\"p\">]</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n\n<span class=\"k\">with</span> <span class=\"n\">smtplib</span><span
    class=\"o\">.</span><span class=\"n\">SMTP</span><span class=\"p\">(</span><span
    class=\"n\">SMTP_SERVER</span><span class=\"p\">,</span> <span class=\"mi\">587</span><span
    class=\"p\">)</span> <span class=\"k\">as</span> <span class=\"n\">email_handler</span><span
    class=\"p\">:</span>\n    <span class=\"n\">email_handler</span><span class=\"o\">.</span><span
    class=\"n\">starttls</span><span class=\"p\">()</span>\n    <span class=\"n\">email_handler</span><span
    class=\"o\">.</span><span class=\"n\">login</span><span class=\"p\">(</span><span
    class=\"n\">SMTP_APP_USER</span><span class=\"p\">,</span> <span class=\"n\">SMTP_APP_PASSWORD</span><span
    class=\"p\">)</span>\n    <span class=\"n\">email_handler</span><span class=\"o\">.</span><span
    class=\"n\">sendmail</span><span class=\"p\">(</span><span class=\"n\">SMTP_APP_USER</span><span
    class=\"p\">,</span> <span class=\"p\">[</span><span class=\"n\">msg</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;To&quot;</span><span class=\"p\">]],</span>
    <span class=\"n\">msg</span><span class=\"o\">.</span><span class=\"n\">as_string</span><span
    class=\"p\">())</span>\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>Sending
    SMS with SMTP</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width,
    initial-scale=1\" />\n<meta name=\"description\" content=\"I&#x27;m cooking something
    up over here that will include SMS message notifications\nas a feature and I&#x27;ve
    been doing some reading on different providers...\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"Sending SMS with SMTP | Nic Payne\" />\n<meta
    property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/sending-sms-with-smtp\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"Sending SMS with SMTP | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"I&#x27;m cooking something up over here that will include SMS message
    notifications\nas a feature and I&#x27;ve been doing some reading on different
    providers...\" />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"
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
    \           <span class=\"site-terminal__dir\">~/sending-sms-with-smtp</span>\n
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
    Content is handled by the password protection plugin -->\n    <p>I'm cooking something
    up over here that will include SMS message notifications\nas a feature and I've
    been doing some reading on different providers...</p>\n<p>Many specialize in bulk
    SMS messaging, like for campaigns and promotions. So\nthis pricing model doesn't
    work for me.</p>\n<p>The providers that do quick single SMS messages are often
    $0.005 to $.04 cents\nper message which isn't insanity but I'm not exactly backed
    by anyone...</p>\n<p>Well today I learned that you can actually send SMS messages
    via SMTP! I\nwouldn't bank on total reliability here but for testing and initial
    roll out of\nwhat I want I think this will be perfect.</p>\n<p>And because I'm
    just that kind of guy, here's some code you can <code>uv run smtp2sms.py</code>
    and get yourself a handy little text. I'm going to build a simpler\nmodule but
    you can get a <code>gmail</code> and <code>gmail app password</code> within about
    10\nminutes. <a href=\"https://support.google.com/mail/answer/185833?hl=en\">see
    here</a></p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button class='copy'
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"c1\"># ///
    script</span>\n<span class=\"c1\"># requires-python = &quot;&gt;=3.10&quot;</span>\n<span
    class=\"c1\"># dependencies = [</span>\n<span class=\"c1\"># ]</span>\n<span class=\"c1\">#
    ///</span>\n<span class=\"kn\">import</span><span class=\"w\"> </span><span class=\"nn\">os</span><span
    class=\"o\">,</span><span class=\"w\"> </span><span class=\"nn\">smtplib</span>\n<span
    class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">email.mime.text</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">MIMEText</span>\n\n<span
    class=\"n\">SMTP_APP_USER</span><span class=\"o\">=</span><span class=\"n\">os</span><span
    class=\"o\">.</span><span class=\"n\">environ</span><span class=\"o\">.</span><span
    class=\"n\">get</span><span class=\"p\">(</span><span class=\"s2\">&quot;SMTP_APP_USER&quot;</span><span
    class=\"p\">)</span> <span class=\"c1\"># me@gmail.com</span>\n<span class=\"n\">SMTP_APP_PASSWORD</span><span
    class=\"o\">=</span><span class=\"n\">os</span><span class=\"o\">.</span><span
    class=\"n\">environ</span><span class=\"o\">.</span><span class=\"n\">get</span><span
    class=\"p\">(</span><span class=\"s2\">&quot;SMTP_APP_PASSWORD&quot;</span><span
    class=\"p\">)</span>\n<span class=\"n\">SMTP_SERVER</span><span class=\"o\">=</span><span
    class=\"n\">os</span><span class=\"o\">.</span><span class=\"n\">environ</span><span
    class=\"o\">.</span><span class=\"n\">get</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;SMTP_SERVER&quot;</span><span class=\"p\">)</span>  <span class=\"c1\">#
    smtp.gmail.ch</span>\n\n<span class=\"c1\"># NOTE: I haven&#39;t verified all
    the carrier domains - this was provided by ChatGPT</span>\n\n<span class=\"n\">carriers</span>
    <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span class=\"s2\">&quot;att&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;txt.att.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mms.att.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;tmobile&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;tmomail.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;tmomail.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;verizon&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"c1\"># &quot;sms&quot;: &quot;vtext.com&quot;,
    # not reliable</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;vzwpix.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;vzwpix.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;sprint&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;messaging.sprintpcs.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;pm.sprint.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;googlefi&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;msg.fi.google.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;msg.fi.google.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;uscellular&quot;</span><span class=\"p\">:</span>
    <span class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;email.uscc.net&quot;</span><span
    class=\"p\">,</span>\n        <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;mms.uscc.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;boost&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;sms.myboostmobile.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;myboostmobile.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;cricket&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;sms.cricketwireless.net&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mms.cricketwireless.net&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;metropcs&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;mymetropcs.com&quot;</span><span class=\"p\">,</span>\n
    \       <span class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span
    class=\"s2\">&quot;mymetropcs.com&quot;</span>\n    <span class=\"p\">},</span>\n
    \   <span class=\"s2\">&quot;virgin&quot;</span><span class=\"p\">:</span> <span
    class=\"p\">{</span>\n        <span class=\"s2\">&quot;sms&quot;</span><span class=\"p\">:</span>
    <span class=\"s2\">&quot;vmobl.com&quot;</span><span class=\"p\">,</span>\n        <span
    class=\"s2\">&quot;mms&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;vmobl.com&quot;</span>\n
    \   <span class=\"p\">}</span>\n<span class=\"p\">}</span>\n<span class=\"n\">contacts</span>
    <span class=\"o\">=</span> <span class=\"p\">{</span>\n    <span class=\"s2\">&quot;me&quot;</span><span
    class=\"p\">:</span> <span class=\"p\">{</span><span class=\"s2\">&quot;carrier&quot;</span><span
    class=\"p\">:</span> <span class=\"s2\">&quot;verizon&quot;</span><span class=\"p\">,</span>
    <span class=\"s2\">&quot;number&quot;</span><span class=\"p\">:</span> <span class=\"s2\">&quot;1234567890&quot;</span><span
    class=\"p\">},</span>\n<span class=\"p\">}</span>\n<span class=\"n\">msg</span>
    <span class=\"o\">=</span> <span class=\"n\">MIMEText</span><span class=\"p\">(</span><span
    class=\"s2\">&quot;Hello from a python script? What?!&quot;</span><span class=\"p\">)</span>\n<span
    class=\"n\">msg</span><span class=\"p\">[</span><span class=\"s2\">&quot;From&quot;</span><span
    class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"n\">SMTP_APP_USER</span>\n\n<span
    class=\"n\">SEND_TO</span> <span class=\"o\">=</span> <span class=\"s2\">&quot;me&quot;</span>\n\n<span
    class=\"c1\"># Complex for my future use cases - deal with it</span>\n<span class=\"n\">msg</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;To&quot;</span><span class=\"p\">]</span>
    <span class=\"o\">=</span> <span class=\"sa\">f</span><span class=\"s2\">&quot;</span><span
    class=\"si\">{</span><span class=\"n\">contacts</span><span class=\"p\">[</span><span
    class=\"n\">SEND_TO</span><span class=\"p\">][</span><span class=\"s1\">&#39;number&#39;</span><span
    class=\"p\">]</span><span class=\"si\">}</span><span class=\"s2\">@</span><span
    class=\"si\">{</span><span class=\"n\">carriers</span><span class=\"p\">[</span><span
    class=\"n\">contacts</span><span class=\"p\">[</span><span class=\"n\">SEND_TO</span><span
    class=\"p\">][</span><span class=\"s1\">&#39;carrier&#39;</span><span class=\"p\">]][</span><span
    class=\"s1\">&#39;sms&#39;</span><span class=\"p\">]</span><span class=\"si\">}</span><span
    class=\"s2\">&quot;</span>\n\n<span class=\"k\">with</span> <span class=\"n\">smtplib</span><span
    class=\"o\">.</span><span class=\"n\">SMTP</span><span class=\"p\">(</span><span
    class=\"n\">SMTP_SERVER</span><span class=\"p\">,</span> <span class=\"mi\">587</span><span
    class=\"p\">)</span> <span class=\"k\">as</span> <span class=\"n\">email_handler</span><span
    class=\"p\">:</span>\n    <span class=\"n\">email_handler</span><span class=\"o\">.</span><span
    class=\"n\">starttls</span><span class=\"p\">()</span>\n    <span class=\"n\">email_handler</span><span
    class=\"o\">.</span><span class=\"n\">login</span><span class=\"p\">(</span><span
    class=\"n\">SMTP_APP_USER</span><span class=\"p\">,</span> <span class=\"n\">SMTP_APP_PASSWORD</span><span
    class=\"p\">)</span>\n    <span class=\"n\">email_handler</span><span class=\"o\">.</span><span
    class=\"n\">sendmail</span><span class=\"p\">(</span><span class=\"n\">SMTP_APP_USER</span><span
    class=\"p\">,</span> <span class=\"p\">[</span><span class=\"n\">msg</span><span
    class=\"p\">[</span><span class=\"s2\">&quot;To&quot;</span><span class=\"p\">]],</span>
    <span class=\"n\">msg</span><span class=\"o\">.</span><span class=\"n\">as_string</span><span
    class=\"p\">())</span>\n</pre></div>\n\n</pre>\n\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2025-10-04 09:38:58\ntemplateKey: blog-post\ntitle: Sending
    SMS with SMTP\npublished: True\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png\"\ntags:\n
    \ - til\n  - tech\n---\n\nI'm cooking something up over here that will include
    SMS message notifications\nas a feature and I've been doing some reading on different
    providers...\n\nMany specialize in bulk SMS messaging, like for campaigns and
    promotions. So\nthis pricing model doesn't work for me.\n\nThe providers that
    do quick single SMS messages are often $0.005 to $.04 cents\nper message which
    isn't insanity but I'm not exactly backed by anyone...\n\nWell today I learned
    that you can actually send SMS messages via SMTP! I\nwouldn't bank on total reliability
    here but for testing and initial roll out of\nwhat I want I think this will be
    perfect.\n\nAnd because I'm just that kind of guy, here's some code you can `uv
    run\nsmtp2sms.py` and get yourself a handy little text. I'm going to build a simpler\nmodule
    but you can get a `gmail` and `gmail app password` within about 10\nminutes. [see
    here](https://support.google.com/mail/answer/185833?hl=en)\n\n```python\n# ///
    script\n# requires-python = \">=3.10\"\n# dependencies = [\n# ]\n# ///\nimport
    os, smtplib\nfrom email.mime.text import MIMEText\n\nSMTP_APP_USER=os.environ.get(\"SMTP_APP_USER\")
    # me@gmail.com\nSMTP_APP_PASSWORD=os.environ.get(\"SMTP_APP_PASSWORD\")\nSMTP_SERVER=os.environ.get(\"SMTP_SERVER\")
    \ # smtp.gmail.ch\n\n# NOTE: I haven't verified all the carrier domains - this
    was provided by ChatGPT\n\ncarriers = {\n    \"att\": {\n        \"sms\": \"txt.att.net\",\n
    \       \"mms\": \"mms.att.net\"\n    },\n    \"tmobile\": {\n        \"sms\":
    \"tmomail.net\",\n        \"mms\": \"tmomail.net\"\n    },\n    \"verizon\": {\n
    \       # \"sms\": \"vtext.com\", # not reliable\n        \"sms\": \"vzwpix.com\",\n
    \       \"mms\": \"vzwpix.com\"\n    },\n    \"sprint\": {\n        \"sms\": \"messaging.sprintpcs.com\",\n
    \       \"mms\": \"pm.sprint.com\"\n    },\n    \"googlefi\": {\n        \"sms\":
    \"msg.fi.google.com\",\n        \"mms\": \"msg.fi.google.com\"\n    },\n    \"uscellular\":
    {\n        \"sms\": \"email.uscc.net\",\n        \"mms\": \"mms.uscc.net\"\n    },\n
    \   \"boost\": {\n        \"sms\": \"sms.myboostmobile.com\",\n        \"mms\":
    \"myboostmobile.com\"\n    },\n    \"cricket\": {\n        \"sms\": \"sms.cricketwireless.net\",\n
    \       \"mms\": \"mms.cricketwireless.net\"\n    },\n    \"metropcs\": {\n        \"sms\":
    \"mymetropcs.com\",\n        \"mms\": \"mymetropcs.com\"\n    },\n    \"virgin\":
    {\n        \"sms\": \"vmobl.com\",\n        \"mms\": \"vmobl.com\"\n    }\n}\ncontacts
    = {\n    \"me\": {\"carrier\": \"verizon\", \"number\": \"1234567890\"},\n}\nmsg
    = MIMEText(\"Hello from a python script? What?!\")\nmsg[\"From\"] = SMTP_APP_USER\n\nSEND_TO
    = \"me\"\n\n# Complex for my future use cases - deal with it\nmsg[\"To\"] = f\"{contacts[SEND_TO]['number']}@{carriers[contacts[SEND_TO]['carrier']]['sms']}\"\n\nwith
    smtplib.SMTP(SMTP_SERVER, 587) as email_handler:\n    email_handler.starttls()\n
    \   email_handler.login(SMTP_APP_USER, SMTP_APP_PASSWORD)\n    email_handler.sendmail(SMTP_APP_USER,
    [msg[\"To\"]], msg.as_string())\n\n```\n"
published: true
slug: sending-sms-with-smtp
title: Sending SMS with SMTP


---

I'm cooking something up over here that will include SMS message notifications
as a feature and I've been doing some reading on different providers...

Many specialize in bulk SMS messaging, like for campaigns and promotions. So
this pricing model doesn't work for me.

The providers that do quick single SMS messages are often $0.005 to $.04 cents
per message which isn't insanity but I'm not exactly backed by anyone...

Well today I learned that you can actually send SMS messages via SMTP! I
wouldn't bank on total reliability here but for testing and initial roll out of
what I want I think this will be perfect.

And because I'm just that kind of guy, here's some code you can `uv run
smtp2sms.py` and get yourself a handy little text. I'm going to build a simpler
module but you can get a `gmail` and `gmail app password` within about 10
minutes. [see here](https://support.google.com/mail/answer/185833?hl=en)

```python
# /// script
# requires-python = ">=3.10"
# dependencies = [
# ]
# ///
import os, smtplib
from email.mime.text import MIMEText

SMTP_APP_USER=os.environ.get("SMTP_APP_USER") # me@gmail.com
SMTP_APP_PASSWORD=os.environ.get("SMTP_APP_PASSWORD")
SMTP_SERVER=os.environ.get("SMTP_SERVER")  # smtp.gmail.ch

# NOTE: I haven't verified all the carrier domains - this was provided by ChatGPT

carriers = {
    "att": {
        "sms": "txt.att.net",
        "mms": "mms.att.net"
    },
    "tmobile": {
        "sms": "tmomail.net",
        "mms": "tmomail.net"
    },
    "verizon": {
        # "sms": "vtext.com", # not reliable
        "sms": "vzwpix.com",
        "mms": "vzwpix.com"
    },
    "sprint": {
        "sms": "messaging.sprintpcs.com",
        "mms": "pm.sprint.com"
    },
    "googlefi": {
        "sms": "msg.fi.google.com",
        "mms": "msg.fi.google.com"
    },
    "uscellular": {
        "sms": "email.uscc.net",
        "mms": "mms.uscc.net"
    },
    "boost": {
        "sms": "sms.myboostmobile.com",
        "mms": "myboostmobile.com"
    },
    "cricket": {
        "sms": "sms.cricketwireless.net",
        "mms": "mms.cricketwireless.net"
    },
    "metropcs": {
        "sms": "mymetropcs.com",
        "mms": "mymetropcs.com"
    },
    "virgin": {
        "sms": "vmobl.com",
        "mms": "vmobl.com"
    }
}
contacts = {
    "me": {"carrier": "verizon", "number": "1234567890"},
}
msg = MIMEText("Hello from a python script? What?!")
msg["From"] = SMTP_APP_USER

SEND_TO = "me"

# Complex for my future use cases - deal with it
msg["To"] = f"{contacts[SEND_TO]['number']}@{carriers[contacts[SEND_TO]['carrier']]['sms']}"

with smtplib.SMTP(SMTP_SERVER, 587) as email_handler:
    email_handler.starttls()
    email_handler.login(SMTP_APP_USER, SMTP_APP_PASSWORD)
    email_handler.sendmail(SMTP_APP_USER, [msg["To"]], msg.as_string())

```