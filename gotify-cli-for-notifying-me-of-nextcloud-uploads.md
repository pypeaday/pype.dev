---
content: "# The Ask\n\nI was looking for a way to get notified from nextcloud when
  files were uploaded\nto a certain directory. This is because the upload is very
  spotty due to the\nphysical environment of where the nextcloud client is, and once
  a file shows up\nI have a job to do. So I was hoping nextcloud had an easy way to
  say \"if file\nshows up in X folder, notify me\" but I can't find it...\n\n## Solution
  2\n\nSince I already use gotify and they provide a [DOPE\nCLI](https://github.com/gotify/cli)
  we can write a little bash script to work\nat the filesystem level rather than the
  nextcloud level.\n\n## Permissions\n\nWe'll need to make sure the user running this
  script has all the right read\npermissions... In my exact case the file upload happens
  in a group folder,\nwhich is easily found on the filesystem in the Nextcloud volume
  at\n`.../data/__groupfolders/{id}/{rest of path}`. This was owned by `www-data`
  on\nthe host, see\n[[add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem]]
  if\nyou want but a simple `usermod -aG www-data <me>` does the trick.\n\n## The
  Script\n\nWith a little AI magic to spruce up the messaging, the script basically
  looks like this:\n\n```bash\n#!/bin/bash\n\n# Script to monitor sermon directory
  using gotify watch\n# Used with a systemd service or standalone\n# Can run in local
  or remote (SSH) mode\n\n# Configuration\n\n# Target directory to monitor\nDIR_PATH=\"/path/to/watch\"\n\n#
  Mode: Set to \"ssh\" or \"local\"\n# If ssh, will connect to SSH_HOST as SSH_USER
  to monitor the directory\n# If local, will monitor the directory directly on this
  machine\nMODE=\"ssh\"\n\n# Remote SSH settings (only used if MODE=\"ssh\")\nSSH_USER=\"youruser\"\nSSH_HOST=\"yourserver\"\n\n#
  Log settings\nLOG_DIR=\"$HOME/.local/state/sermon-monitor\"\nLOG_FILE=\"$LOG_DIR/sermon-monitor.log\"\nMAX_LOG_SIZE_KB=1024
  # 1MB max log size\n\n# Create log directory if it doesn't exist\nmkdir -p \"$LOG_DIR\"
  2>/dev/null\n\n# Create or truncate log file if it's too large\nif [ -f \"$LOG_FILE\"
  ] && [ $(stat -c%s \"$LOG_FILE\" 2>/dev/null || echo 0) -gt $((MAX_LOG_SIZE_KB *
  1024)) ]; then\n  # Keep the last 20 lines when rotating\n  tail -n 20 \"$LOG_FILE\"
  >\"${LOG_FILE}.tmp\" 2>/dev/null && mv \"${LOG_FILE}.tmp\" \"$LOG_FILE\" 2>/dev/null\n
  \ echo \"$(date '+%Y-%m-%d %H:%M:%S') - Log file rotated due to size limit\" >>\"$LOG_FILE\"\nfi\n\n#
  Ensure log file exists\ntouch \"$LOG_FILE\" 2>/dev/null\n\n# Log function\nlog()
  {\n  echo \"$(date '+%Y-%m-%d %H:%M:%S') - $1\" | tee -a \"$LOG_FILE\"\n}\n\n# Create
  a temp file to store the previous state\nTEMP_DIR=\"/tmp/gotify-watcher\"\nPREV_STATE_FILE=\"$TEMP_DIR/previous_state.txt\"\nmkdir
  -p \"$TEMP_DIR\" 2>/dev/null || true\n\n# Function to get directory listing based
  on mode\nget_directory_listing() {\n  if [ \"$MODE\" = \"ssh\" ]; then\n    # Remote
  mode - use SSH\n    ssh $SSH_USER@$SSH_HOST \"ls -la '$DIR_PATH' | grep -v '^\\.\\.$'
  | grep -v '^\\.$'\" ||\n      echo \"Error: Failed to connect to $SSH_HOST\"\n  else\n
  \   # Local mode - direct access\n    if [ -d \"$DIR_PATH\" ]; then\n      ls -la
  \"$DIR_PATH\" | grep -v '^\\.\\.$' | grep -v '^\\.$'\n    else\n      echo \"Error:
  Directory $DIR_PATH does not exist locally\"\n    fi\n  fi\n}\n\n# Removed unused
  function - was leftover from previous version\n\n# Display startup message based
  on mode\nif [ \"$MODE\" = \"ssh\" ]; then\n  log \"Starting sermon file monitor
  for $SSH_USER@$SSH_HOST:$DIR_PATH (SSH mode)\"\nelse\n  log \"Starting sermon file
  monitor for $DIR_PATH (local mode)\"\nfi\n\n# Run initial check to establish baseline\nCURRENT_LISTING=$(get_directory_listing)\necho
  \"$CURRENT_LISTING\" >\"$PREV_STATE_FILE\"\nlog \"Initial state captured. Watching
  for changes.\"\n\n# Monitor continuously\nwhile true; do\n  # Sleep for 30 seconds
  between checks\n  sleep 30\n\n  # Get current listing\n  CURRENT_LISTING=$(get_directory_listing)\n\n
  \ # Find new files by comparing with previous state\n  NEW_FILES=$(diff --new-line-format=\"%L\"
  --old-line-format=\"\" --unchanged-line-format=\"\" \\\n    \"$PREV_STATE_FILE\"
  <(echo \"$CURRENT_LISTING\") | grep -v \"^total\" | grep -v \"^drwx\")\n\n  # If
  new files found, notify\n  if [ -n \"$NEW_FILES\" ]; then\n    # Filter out directories
  and system entries, keep only regular files\n    FILE_ENTRIES=$(echo \"$NEW_FILES\"
  | grep -v \"^d\" | grep -v \"^total\" | grep -v \"^\\.$\" | grep -v \"^\\.\\.\")\n\n
  \   # Count how many actual files (non-empty lines)\n    NEW_COUNT=$(echo \"$FILE_ENTRIES\"
  | grep -v \"^$\" | wc -l)\n\n    # Only proceed if we have actual files\n    if
  [ \"$NEW_COUNT\" -gt 0 ]; then\n      # Create notification message\n      if [
  \"$NEW_COUNT\" -eq 1 ]; then\n        TITLE=\"New File Added\"\n        # Extract
  filename from listing line\n        FILENAME=$(echo \"$FILE_ENTRIES\" | awk '{print
  $NF}')\n        MESSAGE=\"New file detected: $FILENAME\"\n      else\n        TITLE=\"New
  Files Added\"\n        # Format filenames only for readability\n        FILELIST=$(echo
  \"$FILE_ENTRIES\" | awk '{print $NF}' | sort)\n        MESSAGE=\"$NEW_COUNT new
  files detected:\\n$FILELIST\"\n      fi\n\n      # Send notification\n      gotify
  push --title \"$TITLE\" \"$MESSAGE\"\n      log \"Notification sent for new files:
  $NEW_COUNT\"\n    fi\n\n    # Update previous state\n    echo \"$CURRENT_LISTING\"
  >\"$PREV_STATE_FILE\"\n  fi\ndone\n\n# If we get here, gotify watch has exited\nlog
  \"gotify watch exited unexpectedly\"\nexit 1\n\n```\n\n### Credentials\n\nAs noted
  in the gotify repo - you can put the relevant credentials in a\n`./cli.json` which
  is what I did since this is in a big repo of mine and that's\nwhere the script executes
  from\n\n```json\n{\n  \"token\": \"yourToken\",\n  \"url\": \"https://gotify.example.com\",\n
  \ \"defaultPriority\": 6\n}\n```"
date: 2025-07-16
description: 'The Ask I was looking for a way to get notified from nextcloud when
  files were uploaded

  to a certain directory. This is because the upload is very spotty due to'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>gotify cli for notifying
    me of nextcloud uploads</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"The Ask I was looking for a way to get notified from nextcloud when
    files were uploaded\nto a certain directory. This is because the upload is very
    spotty due to\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"gotify cli for notifying me of nextcloud uploads
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/gotify-cli-for-notifying-me-of-nextcloud-uploads\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"gotify cli for notifying me of nextcloud uploads | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"The Ask I was looking for a way to get
    notified from nextcloud when files were uploaded\nto a certain directory. This
    is because the upload is very spotty due to\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"
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
    \           <span class=\"site-terminal__dir\">~/gotify-cli-for-notifying-me-of-nextcloud-uploads</span>\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"
    alt=\"gotify cli for notifying me of nextcloud uploads cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">gotify
    cli for notifying me of nextcloud uploads</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-16\">\n            July
    16, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/nextcloud/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #nextcloud\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/notifications/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #notifications\n            </a>\n            <a
    href=\"https://pype.dev//tags/nextcloud/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #nextcloud\n
    \           </a>\n            <a href=\"https://pype.dev//tags/gotify/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #gotify\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h1 id=\"the-ask\">The Ask <a class=\"header-anchor\"
    href=\"#the-ask\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I was looking for a
    way to get notified from nextcloud when files were uploaded\nto a certain directory.
    This is because the upload is very spotty due to the\nphysical environment of
    where the nextcloud client is, and once a file shows up\nI have a job to do. So
    I was hoping nextcloud had an easy way to say &quot;if file\nshows up in X folder,
    notify me&quot; but I can't find it...</p>\n<h2 id=\"solution-2\">Solution 2 <a
    class=\"header-anchor\" href=\"#solution-2\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Since I already use
    gotify and they provide a <a href=\"https://github.com/gotify/cli\">DOPE\nCLI</a>
    we can write a little bash script to work\nat the filesystem level rather than
    the nextcloud level.</p>\n<h2 id=\"permissions\">Permissions <a class=\"header-anchor\"
    href=\"#permissions\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>We'll need to make sure
    the user running this script has all the right read\npermissions... In my exact
    case the file upload happens in a group folder,\nwhich is easily found on the
    filesystem in the Nextcloud volume at\n<code>.../data/__groupfolders/{id}/{rest
    of path}</code>. This was owned by <code>www-data</code> on\nthe host, see\n<a
    class=\"wikilink\" href=\"/add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem\">add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem</a>
    if\nyou want but a simple <code>usermod -aG www-data &lt;me&gt;</code> does the
    trick.</p>\n<h2 id=\"the-script\">The Script <a class=\"header-anchor\" href=\"#the-script\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>With a little AI magic
    to spruce up the messaging, the script basically looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n\n<span
    class=\"c1\"># Script to monitor sermon directory using gotify watch</span>\n<span
    class=\"c1\"># Used with a systemd service or standalone</span>\n<span class=\"c1\">#
    Can run in local or remote (SSH) mode</span>\n\n<span class=\"c1\"># Configuration</span>\n\n<span
    class=\"c1\"># Target directory to monitor</span>\n<span class=\"nv\">DIR_PATH</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;/path/to/watch&quot;</span>\n\n<span
    class=\"c1\"># Mode: Set to &quot;ssh&quot; or &quot;local&quot;</span>\n<span
    class=\"c1\"># If ssh, will connect to SSH_HOST as SSH_USER to monitor the directory</span>\n<span
    class=\"c1\"># If local, will monitor the directory directly on this machine</span>\n<span
    class=\"nv\">MODE</span><span class=\"o\">=</span><span class=\"s2\">&quot;ssh&quot;</span>\n\n<span
    class=\"c1\"># Remote SSH settings (only used if MODE=&quot;ssh&quot;)</span>\n<span
    class=\"nv\">SSH_USER</span><span class=\"o\">=</span><span class=\"s2\">&quot;youruser&quot;</span>\n<span
    class=\"nv\">SSH_HOST</span><span class=\"o\">=</span><span class=\"s2\">&quot;yourserver&quot;</span>\n\n<span
    class=\"c1\"># Log settings</span>\n<span class=\"nv\">LOG_DIR</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$HOME</span><span class=\"s2\">/.local/state/sermon-monitor&quot;</span>\n<span
    class=\"nv\">LOG_FILE</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_DIR</span><span class=\"s2\">/sermon-monitor.log&quot;</span>\n<span
    class=\"nv\">MAX_LOG_SIZE_KB</span><span class=\"o\">=</span><span class=\"m\">1024</span><span
    class=\"w\"> </span><span class=\"c1\"># 1MB max log size</span>\n\n<span class=\"c1\">#
    Create log directory if it doesn&#39;t exist</span>\nmkdir<span class=\"w\"> </span>-p<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_DIR</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null\n\n<span
    class=\"c1\"># Create or truncate log file if it&#39;s too large</span>\n<span
    class=\"k\">if</span><span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span>-f<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">&amp;&amp;</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"k\">$(</span>stat<span class=\"w\"> </span>-c%s<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null<span class=\"w\">
    </span><span class=\"o\">||</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"k\">)</span><span
    class=\"w\"> </span>-gt<span class=\"w\"> </span><span class=\"k\">$((</span><span
    class=\"nv\">MAX_LOG_SIZE_KB</span><span class=\"w\"> </span><span class=\"o\">*</span><span
    class=\"w\"> </span><span class=\"m\">1024</span><span class=\"k\">))</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">then</span>\n<span class=\"w\">  </span><span
    class=\"c1\"># Keep the last 20 lines when rotating</span>\n<span class=\"w\">
    \ </span>tail<span class=\"w\"> </span>-n<span class=\"w\"> </span><span class=\"m\">20</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>&gt;<span class=\"s2\">&quot;</span><span
    class=\"si\">${</span><span class=\"nv\">LOG_FILE</span><span class=\"si\">}</span><span
    class=\"s2\">.tmp&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null<span
    class=\"w\"> </span><span class=\"o\">&amp;&amp;</span><span class=\"w\"> </span>mv<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"si\">${</span><span
    class=\"nv\">LOG_FILE</span><span class=\"si\">}</span><span class=\"s2\">.tmp&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null\n<span
    class=\"w\">  </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span>date<span class=\"w\"> </span><span
    class=\"s1\">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class=\"k\">)</span><span
    class=\"s2\"> - Log file rotated due to size limit&quot;</span><span class=\"w\">
    </span>&gt;&gt;<span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span>\n<span class=\"k\">fi</span>\n\n<span class=\"c1\">#
    Ensure log file exists</span>\ntouch<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"m\">2</span>&gt;/dev/null\n\n<span class=\"c1\"># Log function</span>\nlog<span
    class=\"o\">()</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span>date<span class=\"w\"> </span><span
    class=\"s1\">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class=\"k\">)</span><span
    class=\"s2\"> - </span><span class=\"nv\">$1</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>tee<span
    class=\"w\"> </span>-a<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span>\n<span class=\"o\">}</span>\n\n<span
    class=\"c1\"># Create a temp file to store the previous state</span>\n<span class=\"nv\">TEMP_DIR</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;/tmp/gotify-watcher&quot;</span>\n<span
    class=\"nv\">PREV_STATE_FILE</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TEMP_DIR</span><span class=\"s2\">/previous_state.txt&quot;</span>\nmkdir<span
    class=\"w\"> </span>-p<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TEMP_DIR</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"m\">2</span>&gt;/dev/null<span class=\"w\"> </span><span
    class=\"o\">||</span><span class=\"w\"> </span><span class=\"nb\">true</span>\n\n<span
    class=\"c1\"># Function to get directory listing based on mode</span>\nget_directory_listing<span
    class=\"o\">()</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$MODE</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;ssh&quot;</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">then</span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Remote mode - use SSH</span>\n<span class=\"w\">    </span>ssh<span
    class=\"w\"> </span><span class=\"nv\">$SSH_USER</span>@<span class=\"nv\">$SSH_HOST</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;ls -la &#39;</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\">&#39; | grep -v &#39;^\\.\\.</span>$<span class=\"s2\">&#39; | grep
    -v &#39;^\\.</span>$<span class=\"s2\">&#39;&quot;</span><span class=\"w\"> </span><span
    class=\"o\">||</span>\n<span class=\"w\">      </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Error: Failed to connect to </span><span
    class=\"nv\">$SSH_HOST</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"k\">else</span>\n<span class=\"w\">    </span><span class=\"c1\">#
    Local mode - direct access</span>\n<span class=\"w\">    </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">      </span>ls<span class=\"w\"> </span>-la<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span
    class=\"w\"> </span>-v<span class=\"w\"> </span><span class=\"s1\">&#39;^\\.\\.$&#39;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span
    class=\"w\"> </span>-v<span class=\"w\"> </span><span class=\"s1\">&#39;^\\.$&#39;</span>\n<span
    class=\"w\">    </span><span class=\"k\">else</span>\n<span class=\"w\">      </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Error:
    Directory </span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\"> does not
    exist locally&quot;</span>\n<span class=\"w\">    </span><span class=\"k\">fi</span>\n<span
    class=\"w\">  </span><span class=\"k\">fi</span>\n<span class=\"o\">}</span>\n\n<span
    class=\"c1\"># Removed unused function - was leftover from previous version</span>\n\n<span
    class=\"c1\"># Display startup message based on mode</span>\n<span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$MODE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;ssh&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">  </span>log<span class=\"w\"> </span><span class=\"s2\">&quot;Starting
    sermon file monitor for </span><span class=\"nv\">$SSH_USER</span><span class=\"s2\">@</span><span
    class=\"nv\">$SSH_HOST</span><span class=\"s2\">:</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\"> (SSH mode)&quot;</span>\n<span class=\"k\">else</span>\n<span class=\"w\">
    \ </span>log<span class=\"w\"> </span><span class=\"s2\">&quot;Starting sermon
    file monitor for </span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\">
    (local mode)&quot;</span>\n<span class=\"k\">fi</span>\n\n<span class=\"c1\">#
    Run initial check to establish baseline</span>\n<span class=\"nv\">CURRENT_LISTING</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>get_directory_listing<span class=\"k\">)</span>\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$CURRENT_LISTING</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span>&gt;<span class=\"s2\">&quot;</span><span class=\"nv\">$PREV_STATE_FILE</span><span
    class=\"s2\">&quot;</span>\nlog<span class=\"w\"> </span><span class=\"s2\">&quot;Initial
    state captured. Watching for changes.&quot;</span>\n\n<span class=\"c1\"># Monitor
    continuously</span>\n<span class=\"k\">while</span><span class=\"w\"> </span>true<span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">do</span>\n<span
    class=\"w\">  </span><span class=\"c1\"># Sleep for 30 seconds between checks</span>\n<span
    class=\"w\">  </span>sleep<span class=\"w\"> </span><span class=\"m\">30</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\"># Get current listing</span>\n<span class=\"w\">
    \ </span><span class=\"nv\">CURRENT_LISTING</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>get_directory_listing<span class=\"k\">)</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\"># Find new files by comparing with previous
    state</span>\n<span class=\"w\">  </span><span class=\"nv\">NEW_FILES</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>diff<span class=\"w\"> </span>--new-line-format<span
    class=\"o\">=</span><span class=\"s2\">&quot;%L&quot;</span><span class=\"w\">
    </span>--old-line-format<span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span>--unchanged-line-format<span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$PREV_STATE_FILE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>&lt;<span class=\"o\">(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$CURRENT_LISTING</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span
    class=\"w\"> </span><span class=\"s2\">&quot;^total&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^drwx&quot;</span><span
    class=\"o\">)</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># If new
    files found, notify</span>\n<span class=\"w\">  </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span>-n<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_FILES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Filter out directories and system
    entries, keep only regular files</span>\n<span class=\"w\">    </span><span class=\"nv\">FILE_ENTRIES</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_FILES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^d&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^total&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^\\.</span>$<span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^\\.\\.&quot;</span><span
    class=\"k\">)</span>\n\n<span class=\"w\">    </span><span class=\"c1\"># Count
    how many actual files (non-empty lines)</span>\n<span class=\"w\">    </span><span
    class=\"nv\">NEW_COUNT</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$FILE_ENTRIES</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^</span>$<span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>wc<span
    class=\"w\"> </span>-l<span class=\"k\">)</span>\n\n<span class=\"w\">    </span><span
    class=\"c1\"># Only proceed if we have actual files</span>\n<span class=\"w\">
    \   </span><span class=\"k\">if</span><span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_COUNT</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>-gt<span class=\"w\"> </span><span
    class=\"m\">0</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># Create notification message</span>\n<span
    class=\"w\">      </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$NEW_COUNT</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span>-eq<span class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\">
    </span><span class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\">
    </span><span class=\"k\">then</span>\n<span class=\"w\">        </span><span class=\"nv\">TITLE</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;New File Added&quot;</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># Extract filename from listing
    line</span>\n<span class=\"w\">        </span><span class=\"nv\">FILENAME</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$FILE_ENTRIES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>awk<span class=\"w\"> </span><span class=\"s1\">&#39;{print
    $NF}&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">        </span><span
    class=\"nv\">MESSAGE</span><span class=\"o\">=</span><span class=\"s2\">&quot;New
    file detected: </span><span class=\"nv\">$FILENAME</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">      </span><span class=\"k\">else</span>\n<span class=\"w\">        </span><span
    class=\"nv\">TITLE</span><span class=\"o\">=</span><span class=\"s2\">&quot;New
    Files Added&quot;</span>\n<span class=\"w\">        </span><span class=\"c1\">#
    Format filenames only for readability</span>\n<span class=\"w\">        </span><span
    class=\"nv\">FILELIST</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$FILE_ENTRIES</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>awk<span class=\"w\">
    </span><span class=\"s1\">&#39;{print $NF}&#39;</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>sort<span class=\"k\">)</span>\n<span
    class=\"w\">        </span><span class=\"nv\">MESSAGE</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$NEW_COUNT</span><span class=\"s2\">
    new files detected:\\n</span><span class=\"nv\">$FILELIST</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">      </span><span class=\"k\">fi</span>\n\n<span class=\"w\">      </span><span
    class=\"c1\"># Send notification</span>\n<span class=\"w\">      </span>gotify<span
    class=\"w\"> </span>push<span class=\"w\"> </span>--title<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$MESSAGE</span><span
    class=\"s2\">&quot;</span>\n<span class=\"w\">      </span>log<span class=\"w\">
    </span><span class=\"s2\">&quot;Notification sent for new files: </span><span
    class=\"nv\">$NEW_COUNT</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \   </span><span class=\"k\">fi</span>\n\n<span class=\"w\">    </span><span class=\"c1\">#
    Update previous state</span>\n<span class=\"w\">    </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$CURRENT_LISTING</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>&gt;<span class=\"s2\">&quot;</span><span
    class=\"nv\">$PREV_STATE_FILE</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"k\">fi</span>\n<span class=\"k\">done</span>\n\n<span class=\"c1\">#
    If we get here, gotify watch has exited</span>\nlog<span class=\"w\"> </span><span
    class=\"s2\">&quot;gotify watch exited unexpectedly&quot;</span>\n<span class=\"nb\">exit</span><span
    class=\"w\"> </span><span class=\"m\">1</span>\n</pre></div>\n\n</pre>\n\n<h3>Credentials</h3>\n<p>As
    noted in the gotify repo - you can put the relevant credentials in a\n<code>./cli.json</code>
    which is what I did since this is in a big repo of mine and that's\nwhere the
    script executes from</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;token&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;yourToken&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;url&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;https://gotify.example.com&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">  </span><span class=\"nt\">&quot;defaultPriority&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">6</span>\n<span
    class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>
    \       </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>gotify cli for notifying
    me of nextcloud uploads</title>\n<meta charset=\"UTF-8\" />\n<meta name=\"viewport\"
    content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"The Ask I was looking for a way to get notified from nextcloud when
    files were uploaded\nto a certain directory. This is because the upload is very
    spotty due to\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"gotify cli for notifying me of nextcloud uploads
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/gotify-cli-for-notifying-me-of-nextcloud-uploads\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"gotify cli for notifying me of nextcloud uploads | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"The Ask I was looking for a way to get
    notified from nextcloud when files were uploaded\nto a certain directory. This
    is because the upload is very spotty due to\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"
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
    mb-4 post-title-large\">gotify cli for notifying me of nextcloud uploads</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2025-07-16\">\n            July 16, 2025\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/nextcloud/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #nextcloud\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/notifications/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #notifications\n            </a>\n            <a
    href=\"https://pype.dev//tags/nextcloud/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #nextcloud\n
    \           </a>\n            <a href=\"https://pype.dev//tags/gotify/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #gotify\n
    \           </a>\n    </div>\n</section></article>\n     </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"
    alt=\"gotify cli for notifying me of nextcloud uploads cover image\">\n        </div>\n
    \   </figure>\n\n    <article class=\"post-terminal__article\">\n<section class=\"post-header
    mb-8\">\n    <h1 id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight:
    800;\" class=\"text-6xl md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">gotify
    cli for notifying me of nextcloud uploads</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2025-07-16\">\n            July
    16, 2025\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/nextcloud/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #nextcloud\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/notifications/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #notifications\n            </a>\n            <a
    href=\"https://pype.dev//tags/nextcloud/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #nextcloud\n
    \           </a>\n            <a href=\"https://pype.dev//tags/gotify/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #gotify\n
    \           </a>\n    </div>\n</section>        <section class=\"post-terminal__body
    prose dark:prose-invert\">\n            <h1 id=\"the-ask\">The Ask <a class=\"header-anchor\"
    href=\"#the-ask\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I was looking for a
    way to get notified from nextcloud when files were uploaded\nto a certain directory.
    This is because the upload is very spotty due to the\nphysical environment of
    where the nextcloud client is, and once a file shows up\nI have a job to do. So
    I was hoping nextcloud had an easy way to say &quot;if file\nshows up in X folder,
    notify me&quot; but I can't find it...</p>\n<h2 id=\"solution-2\">Solution 2 <a
    class=\"header-anchor\" href=\"#solution-2\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Since I already use
    gotify and they provide a <a href=\"https://github.com/gotify/cli\">DOPE\nCLI</a>
    we can write a little bash script to work\nat the filesystem level rather than
    the nextcloud level.</p>\n<h2 id=\"permissions\">Permissions <a class=\"header-anchor\"
    href=\"#permissions\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>We'll need to make sure
    the user running this script has all the right read\npermissions... In my exact
    case the file upload happens in a group folder,\nwhich is easily found on the
    filesystem in the Nextcloud volume at\n<code>.../data/__groupfolders/{id}/{rest
    of path}</code>. This was owned by <code>www-data</code> on\nthe host, see\n<a
    class=\"wikilink\" href=\"/add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem\">add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem</a>
    if\nyou want but a simple <code>usermod -aG www-data &lt;me&gt;</code> does the
    trick.</p>\n<h2 id=\"the-script\">The Script <a class=\"header-anchor\" href=\"#the-script\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>With a little AI magic
    to spruce up the messaging, the script basically looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n\n<span
    class=\"c1\"># Script to monitor sermon directory using gotify watch</span>\n<span
    class=\"c1\"># Used with a systemd service or standalone</span>\n<span class=\"c1\">#
    Can run in local or remote (SSH) mode</span>\n\n<span class=\"c1\"># Configuration</span>\n\n<span
    class=\"c1\"># Target directory to monitor</span>\n<span class=\"nv\">DIR_PATH</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;/path/to/watch&quot;</span>\n\n<span
    class=\"c1\"># Mode: Set to &quot;ssh&quot; or &quot;local&quot;</span>\n<span
    class=\"c1\"># If ssh, will connect to SSH_HOST as SSH_USER to monitor the directory</span>\n<span
    class=\"c1\"># If local, will monitor the directory directly on this machine</span>\n<span
    class=\"nv\">MODE</span><span class=\"o\">=</span><span class=\"s2\">&quot;ssh&quot;</span>\n\n<span
    class=\"c1\"># Remote SSH settings (only used if MODE=&quot;ssh&quot;)</span>\n<span
    class=\"nv\">SSH_USER</span><span class=\"o\">=</span><span class=\"s2\">&quot;youruser&quot;</span>\n<span
    class=\"nv\">SSH_HOST</span><span class=\"o\">=</span><span class=\"s2\">&quot;yourserver&quot;</span>\n\n<span
    class=\"c1\"># Log settings</span>\n<span class=\"nv\">LOG_DIR</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$HOME</span><span class=\"s2\">/.local/state/sermon-monitor&quot;</span>\n<span
    class=\"nv\">LOG_FILE</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_DIR</span><span class=\"s2\">/sermon-monitor.log&quot;</span>\n<span
    class=\"nv\">MAX_LOG_SIZE_KB</span><span class=\"o\">=</span><span class=\"m\">1024</span><span
    class=\"w\"> </span><span class=\"c1\"># 1MB max log size</span>\n\n<span class=\"c1\">#
    Create log directory if it doesn&#39;t exist</span>\nmkdir<span class=\"w\"> </span>-p<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_DIR</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null\n\n<span
    class=\"c1\"># Create or truncate log file if it&#39;s too large</span>\n<span
    class=\"k\">if</span><span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span>-f<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">&amp;&amp;</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"k\">$(</span>stat<span class=\"w\"> </span>-c%s<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null<span class=\"w\">
    </span><span class=\"o\">||</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"k\">)</span><span
    class=\"w\"> </span>-gt<span class=\"w\"> </span><span class=\"k\">$((</span><span
    class=\"nv\">MAX_LOG_SIZE_KB</span><span class=\"w\"> </span><span class=\"o\">*</span><span
    class=\"w\"> </span><span class=\"m\">1024</span><span class=\"k\">))</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">then</span>\n<span class=\"w\">  </span><span
    class=\"c1\"># Keep the last 20 lines when rotating</span>\n<span class=\"w\">
    \ </span>tail<span class=\"w\"> </span>-n<span class=\"w\"> </span><span class=\"m\">20</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>&gt;<span class=\"s2\">&quot;</span><span
    class=\"si\">${</span><span class=\"nv\">LOG_FILE</span><span class=\"si\">}</span><span
    class=\"s2\">.tmp&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null<span
    class=\"w\"> </span><span class=\"o\">&amp;&amp;</span><span class=\"w\"> </span>mv<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"si\">${</span><span
    class=\"nv\">LOG_FILE</span><span class=\"si\">}</span><span class=\"s2\">.tmp&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null\n<span
    class=\"w\">  </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span>date<span class=\"w\"> </span><span
    class=\"s1\">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class=\"k\">)</span><span
    class=\"s2\"> - Log file rotated due to size limit&quot;</span><span class=\"w\">
    </span>&gt;&gt;<span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span>\n<span class=\"k\">fi</span>\n\n<span class=\"c1\">#
    Ensure log file exists</span>\ntouch<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"m\">2</span>&gt;/dev/null\n\n<span class=\"c1\"># Log function</span>\nlog<span
    class=\"o\">()</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span>date<span class=\"w\"> </span><span
    class=\"s1\">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class=\"k\">)</span><span
    class=\"s2\"> - </span><span class=\"nv\">$1</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>tee<span
    class=\"w\"> </span>-a<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span>\n<span class=\"o\">}</span>\n\n<span
    class=\"c1\"># Create a temp file to store the previous state</span>\n<span class=\"nv\">TEMP_DIR</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;/tmp/gotify-watcher&quot;</span>\n<span
    class=\"nv\">PREV_STATE_FILE</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TEMP_DIR</span><span class=\"s2\">/previous_state.txt&quot;</span>\nmkdir<span
    class=\"w\"> </span>-p<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TEMP_DIR</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"m\">2</span>&gt;/dev/null<span class=\"w\"> </span><span
    class=\"o\">||</span><span class=\"w\"> </span><span class=\"nb\">true</span>\n\n<span
    class=\"c1\"># Function to get directory listing based on mode</span>\nget_directory_listing<span
    class=\"o\">()</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$MODE</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;ssh&quot;</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">then</span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Remote mode - use SSH</span>\n<span class=\"w\">    </span>ssh<span
    class=\"w\"> </span><span class=\"nv\">$SSH_USER</span>@<span class=\"nv\">$SSH_HOST</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;ls -la &#39;</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\">&#39; | grep -v &#39;^\\.\\.</span>$<span class=\"s2\">&#39; | grep
    -v &#39;^\\.</span>$<span class=\"s2\">&#39;&quot;</span><span class=\"w\"> </span><span
    class=\"o\">||</span>\n<span class=\"w\">      </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Error: Failed to connect to </span><span
    class=\"nv\">$SSH_HOST</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"k\">else</span>\n<span class=\"w\">    </span><span class=\"c1\">#
    Local mode - direct access</span>\n<span class=\"w\">    </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">      </span>ls<span class=\"w\"> </span>-la<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span
    class=\"w\"> </span>-v<span class=\"w\"> </span><span class=\"s1\">&#39;^\\.\\.$&#39;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span
    class=\"w\"> </span>-v<span class=\"w\"> </span><span class=\"s1\">&#39;^\\.$&#39;</span>\n<span
    class=\"w\">    </span><span class=\"k\">else</span>\n<span class=\"w\">      </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Error:
    Directory </span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\"> does not
    exist locally&quot;</span>\n<span class=\"w\">    </span><span class=\"k\">fi</span>\n<span
    class=\"w\">  </span><span class=\"k\">fi</span>\n<span class=\"o\">}</span>\n\n<span
    class=\"c1\"># Removed unused function - was leftover from previous version</span>\n\n<span
    class=\"c1\"># Display startup message based on mode</span>\n<span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$MODE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;ssh&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">  </span>log<span class=\"w\"> </span><span class=\"s2\">&quot;Starting
    sermon file monitor for </span><span class=\"nv\">$SSH_USER</span><span class=\"s2\">@</span><span
    class=\"nv\">$SSH_HOST</span><span class=\"s2\">:</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\"> (SSH mode)&quot;</span>\n<span class=\"k\">else</span>\n<span class=\"w\">
    \ </span>log<span class=\"w\"> </span><span class=\"s2\">&quot;Starting sermon
    file monitor for </span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\">
    (local mode)&quot;</span>\n<span class=\"k\">fi</span>\n\n<span class=\"c1\">#
    Run initial check to establish baseline</span>\n<span class=\"nv\">CURRENT_LISTING</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>get_directory_listing<span class=\"k\">)</span>\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$CURRENT_LISTING</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span>&gt;<span class=\"s2\">&quot;</span><span class=\"nv\">$PREV_STATE_FILE</span><span
    class=\"s2\">&quot;</span>\nlog<span class=\"w\"> </span><span class=\"s2\">&quot;Initial
    state captured. Watching for changes.&quot;</span>\n\n<span class=\"c1\"># Monitor
    continuously</span>\n<span class=\"k\">while</span><span class=\"w\"> </span>true<span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">do</span>\n<span
    class=\"w\">  </span><span class=\"c1\"># Sleep for 30 seconds between checks</span>\n<span
    class=\"w\">  </span>sleep<span class=\"w\"> </span><span class=\"m\">30</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\"># Get current listing</span>\n<span class=\"w\">
    \ </span><span class=\"nv\">CURRENT_LISTING</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>get_directory_listing<span class=\"k\">)</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\"># Find new files by comparing with previous
    state</span>\n<span class=\"w\">  </span><span class=\"nv\">NEW_FILES</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>diff<span class=\"w\"> </span>--new-line-format<span
    class=\"o\">=</span><span class=\"s2\">&quot;%L&quot;</span><span class=\"w\">
    </span>--old-line-format<span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span>--unchanged-line-format<span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$PREV_STATE_FILE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>&lt;<span class=\"o\">(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$CURRENT_LISTING</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span
    class=\"w\"> </span><span class=\"s2\">&quot;^total&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^drwx&quot;</span><span
    class=\"o\">)</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># If new
    files found, notify</span>\n<span class=\"w\">  </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span>-n<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_FILES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Filter out directories and system
    entries, keep only regular files</span>\n<span class=\"w\">    </span><span class=\"nv\">FILE_ENTRIES</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_FILES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^d&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^total&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^\\.</span>$<span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^\\.\\.&quot;</span><span
    class=\"k\">)</span>\n\n<span class=\"w\">    </span><span class=\"c1\"># Count
    how many actual files (non-empty lines)</span>\n<span class=\"w\">    </span><span
    class=\"nv\">NEW_COUNT</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$FILE_ENTRIES</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^</span>$<span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>wc<span
    class=\"w\"> </span>-l<span class=\"k\">)</span>\n\n<span class=\"w\">    </span><span
    class=\"c1\"># Only proceed if we have actual files</span>\n<span class=\"w\">
    \   </span><span class=\"k\">if</span><span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_COUNT</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>-gt<span class=\"w\"> </span><span
    class=\"m\">0</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># Create notification message</span>\n<span
    class=\"w\">      </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$NEW_COUNT</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span>-eq<span class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\">
    </span><span class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\">
    </span><span class=\"k\">then</span>\n<span class=\"w\">        </span><span class=\"nv\">TITLE</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;New File Added&quot;</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># Extract filename from listing
    line</span>\n<span class=\"w\">        </span><span class=\"nv\">FILENAME</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$FILE_ENTRIES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>awk<span class=\"w\"> </span><span class=\"s1\">&#39;{print
    $NF}&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">        </span><span
    class=\"nv\">MESSAGE</span><span class=\"o\">=</span><span class=\"s2\">&quot;New
    file detected: </span><span class=\"nv\">$FILENAME</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">      </span><span class=\"k\">else</span>\n<span class=\"w\">        </span><span
    class=\"nv\">TITLE</span><span class=\"o\">=</span><span class=\"s2\">&quot;New
    Files Added&quot;</span>\n<span class=\"w\">        </span><span class=\"c1\">#
    Format filenames only for readability</span>\n<span class=\"w\">        </span><span
    class=\"nv\">FILELIST</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$FILE_ENTRIES</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>awk<span class=\"w\">
    </span><span class=\"s1\">&#39;{print $NF}&#39;</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>sort<span class=\"k\">)</span>\n<span
    class=\"w\">        </span><span class=\"nv\">MESSAGE</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$NEW_COUNT</span><span class=\"s2\">
    new files detected:\\n</span><span class=\"nv\">$FILELIST</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">      </span><span class=\"k\">fi</span>\n\n<span class=\"w\">      </span><span
    class=\"c1\"># Send notification</span>\n<span class=\"w\">      </span>gotify<span
    class=\"w\"> </span>push<span class=\"w\"> </span>--title<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$MESSAGE</span><span
    class=\"s2\">&quot;</span>\n<span class=\"w\">      </span>log<span class=\"w\">
    </span><span class=\"s2\">&quot;Notification sent for new files: </span><span
    class=\"nv\">$NEW_COUNT</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \   </span><span class=\"k\">fi</span>\n\n<span class=\"w\">    </span><span class=\"c1\">#
    Update previous state</span>\n<span class=\"w\">    </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$CURRENT_LISTING</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>&gt;<span class=\"s2\">&quot;</span><span
    class=\"nv\">$PREV_STATE_FILE</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"k\">fi</span>\n<span class=\"k\">done</span>\n\n<span class=\"c1\">#
    If we get here, gotify watch has exited</span>\nlog<span class=\"w\"> </span><span
    class=\"s2\">&quot;gotify watch exited unexpectedly&quot;</span>\n<span class=\"nb\">exit</span><span
    class=\"w\"> </span><span class=\"m\">1</span>\n</pre></div>\n\n</pre>\n\n<h3>Credentials</h3>\n<p>As
    noted in the gotify repo - you can put the relevant credentials in a\n<code>./cli.json</code>
    which is what I did since this is in a big repo of mine and that's\nwhere the
    script executes from</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;token&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;yourToken&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;url&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;https://gotify.example.com&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">  </span><span class=\"nt\">&quot;defaultPriority&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">6</span>\n<span
    class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n\n        </section>\n    </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>gotify
    cli for notifying me of nextcloud uploads</title>\n<meta charset=\"UTF-8\" />\n<meta
    name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<meta name=\"description\"
    content=\"The Ask I was looking for a way to get notified from nextcloud when
    files were uploaded\nto a certain directory. This is because the upload is very
    spotty due to\" />\n <link href=\"/favicon.ico\" rel=\"icon\" type=\"image/png\"
    />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\"
    href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"gotify cli for notifying me of nextcloud uploads
    | Nic Payne\" />\n<meta property=\"og:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/gotify-cli-for-notifying-me-of-nextcloud-uploads\"
    />\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"gotify cli for notifying me of nextcloud uploads | Nic Payne\" />\n<meta
    name=\"twitter:description\" content=\"The Ask I was looking for a way to get
    notified from nextcloud when files were uploaded\nto a certain directory. This
    is because the upload is very spotty due to\" />\n<meta name=\"twitter:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"
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
    \           <span class=\"site-terminal__dir\">~/gotify-cli-for-notifying-me-of-nextcloud-uploads</span>\n
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
    Content is handled by the password protection plugin -->\n    <h1 id=\"the-ask\">The
    Ask <a class=\"header-anchor\" href=\"#the-ask\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h1>\n<p>I was looking for a
    way to get notified from nextcloud when files were uploaded\nto a certain directory.
    This is because the upload is very spotty due to the\nphysical environment of
    where the nextcloud client is, and once a file shows up\nI have a job to do. So
    I was hoping nextcloud had an easy way to say &quot;if file\nshows up in X folder,
    notify me&quot; but I can't find it...</p>\n<h2 id=\"solution-2\">Solution 2 <a
    class=\"header-anchor\" href=\"#solution-2\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Since I already use
    gotify and they provide a <a href=\"https://github.com/gotify/cli\">DOPE\nCLI</a>
    we can write a little bash script to work\nat the filesystem level rather than
    the nextcloud level.</p>\n<h2 id=\"permissions\">Permissions <a class=\"header-anchor\"
    href=\"#permissions\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>We'll need to make sure
    the user running this script has all the right read\npermissions... In my exact
    case the file upload happens in a group folder,\nwhich is easily found on the
    filesystem in the Nextcloud volume at\n<code>.../data/__groupfolders/{id}/{rest
    of path}</code>. This was owned by <code>www-data</code> on\nthe host, see\n<a
    class=\"wikilink\" href=\"/add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem\">add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem</a>
    if\nyou want but a simple <code>usermod -aG www-data &lt;me&gt;</code> does the
    trick.</p>\n<h2 id=\"the-script\">The Script <a class=\"header-anchor\" href=\"#the-script\"><svg
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>With a little AI magic
    to spruce up the messaging, the script basically looks like this:</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"ch\">#!/bin/bash</span>\n\n<span
    class=\"c1\"># Script to monitor sermon directory using gotify watch</span>\n<span
    class=\"c1\"># Used with a systemd service or standalone</span>\n<span class=\"c1\">#
    Can run in local or remote (SSH) mode</span>\n\n<span class=\"c1\"># Configuration</span>\n\n<span
    class=\"c1\"># Target directory to monitor</span>\n<span class=\"nv\">DIR_PATH</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;/path/to/watch&quot;</span>\n\n<span
    class=\"c1\"># Mode: Set to &quot;ssh&quot; or &quot;local&quot;</span>\n<span
    class=\"c1\"># If ssh, will connect to SSH_HOST as SSH_USER to monitor the directory</span>\n<span
    class=\"c1\"># If local, will monitor the directory directly on this machine</span>\n<span
    class=\"nv\">MODE</span><span class=\"o\">=</span><span class=\"s2\">&quot;ssh&quot;</span>\n\n<span
    class=\"c1\"># Remote SSH settings (only used if MODE=&quot;ssh&quot;)</span>\n<span
    class=\"nv\">SSH_USER</span><span class=\"o\">=</span><span class=\"s2\">&quot;youruser&quot;</span>\n<span
    class=\"nv\">SSH_HOST</span><span class=\"o\">=</span><span class=\"s2\">&quot;yourserver&quot;</span>\n\n<span
    class=\"c1\"># Log settings</span>\n<span class=\"nv\">LOG_DIR</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$HOME</span><span class=\"s2\">/.local/state/sermon-monitor&quot;</span>\n<span
    class=\"nv\">LOG_FILE</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_DIR</span><span class=\"s2\">/sermon-monitor.log&quot;</span>\n<span
    class=\"nv\">MAX_LOG_SIZE_KB</span><span class=\"o\">=</span><span class=\"m\">1024</span><span
    class=\"w\"> </span><span class=\"c1\"># 1MB max log size</span>\n\n<span class=\"c1\">#
    Create log directory if it doesn&#39;t exist</span>\nmkdir<span class=\"w\"> </span>-p<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_DIR</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null\n\n<span
    class=\"c1\"># Create or truncate log file if it&#39;s too large</span>\n<span
    class=\"k\">if</span><span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span>-f<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"o\">]</span><span class=\"w\"> </span><span class=\"o\">&amp;&amp;</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"k\">$(</span>stat<span class=\"w\"> </span>-c%s<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null<span class=\"w\">
    </span><span class=\"o\">||</span><span class=\"w\"> </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"m\">0</span><span class=\"k\">)</span><span
    class=\"w\"> </span>-gt<span class=\"w\"> </span><span class=\"k\">$((</span><span
    class=\"nv\">MAX_LOG_SIZE_KB</span><span class=\"w\"> </span><span class=\"o\">*</span><span
    class=\"w\"> </span><span class=\"m\">1024</span><span class=\"k\">))</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">then</span>\n<span class=\"w\">  </span><span
    class=\"c1\"># Keep the last 20 lines when rotating</span>\n<span class=\"w\">
    \ </span>tail<span class=\"w\"> </span>-n<span class=\"w\"> </span><span class=\"m\">20</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>&gt;<span class=\"s2\">&quot;</span><span
    class=\"si\">${</span><span class=\"nv\">LOG_FILE</span><span class=\"si\">}</span><span
    class=\"s2\">.tmp&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null<span
    class=\"w\"> </span><span class=\"o\">&amp;&amp;</span><span class=\"w\"> </span>mv<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"si\">${</span><span
    class=\"nv\">LOG_FILE</span><span class=\"si\">}</span><span class=\"s2\">.tmp&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"m\">2</span>&gt;/dev/null\n<span
    class=\"w\">  </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span>date<span class=\"w\"> </span><span
    class=\"s1\">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class=\"k\">)</span><span
    class=\"s2\"> - Log file rotated due to size limit&quot;</span><span class=\"w\">
    </span>&gt;&gt;<span class=\"s2\">&quot;</span><span class=\"nv\">$LOG_FILE</span><span
    class=\"s2\">&quot;</span>\n<span class=\"k\">fi</span>\n\n<span class=\"c1\">#
    Ensure log file exists</span>\ntouch<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"m\">2</span>&gt;/dev/null\n\n<span class=\"c1\"># Log function</span>\nlog<span
    class=\"o\">()</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"nb\">echo</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"k\">$(</span>date<span class=\"w\"> </span><span
    class=\"s1\">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class=\"k\">)</span><span
    class=\"s2\"> - </span><span class=\"nv\">$1</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>tee<span
    class=\"w\"> </span>-a<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$LOG_FILE</span><span class=\"s2\">&quot;</span>\n<span class=\"o\">}</span>\n\n<span
    class=\"c1\"># Create a temp file to store the previous state</span>\n<span class=\"nv\">TEMP_DIR</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;/tmp/gotify-watcher&quot;</span>\n<span
    class=\"nv\">PREV_STATE_FILE</span><span class=\"o\">=</span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TEMP_DIR</span><span class=\"s2\">/previous_state.txt&quot;</span>\nmkdir<span
    class=\"w\"> </span>-p<span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$TEMP_DIR</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"m\">2</span>&gt;/dev/null<span class=\"w\"> </span><span
    class=\"o\">||</span><span class=\"w\"> </span><span class=\"nb\">true</span>\n\n<span
    class=\"c1\"># Function to get directory listing based on mode</span>\nget_directory_listing<span
    class=\"o\">()</span><span class=\"w\"> </span><span class=\"o\">{</span>\n<span
    class=\"w\">  </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$MODE</span><span class=\"s2\">&quot;</span><span class=\"w\"> </span><span
    class=\"o\">=</span><span class=\"w\"> </span><span class=\"s2\">&quot;ssh&quot;</span><span
    class=\"w\"> </span><span class=\"o\">]</span><span class=\"p\">;</span><span
    class=\"w\"> </span><span class=\"k\">then</span>\n<span class=\"w\">    </span><span
    class=\"c1\"># Remote mode - use SSH</span>\n<span class=\"w\">    </span>ssh<span
    class=\"w\"> </span><span class=\"nv\">$SSH_USER</span>@<span class=\"nv\">$SSH_HOST</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;ls -la &#39;</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\">&#39; | grep -v &#39;^\\.\\.</span>$<span class=\"s2\">&#39; | grep
    -v &#39;^\\.</span>$<span class=\"s2\">&#39;&quot;</span><span class=\"w\"> </span><span
    class=\"o\">||</span>\n<span class=\"w\">      </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;Error: Failed to connect to </span><span
    class=\"nv\">$SSH_HOST</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"k\">else</span>\n<span class=\"w\">    </span><span class=\"c1\">#
    Local mode - direct access</span>\n<span class=\"w\">    </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span>-d<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">      </span>ls<span class=\"w\"> </span>-la<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span
    class=\"w\"> </span>-v<span class=\"w\"> </span><span class=\"s1\">&#39;^\\.\\.$&#39;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span
    class=\"w\"> </span>-v<span class=\"w\"> </span><span class=\"s1\">&#39;^\\.$&#39;</span>\n<span
    class=\"w\">    </span><span class=\"k\">else</span>\n<span class=\"w\">      </span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;Error:
    Directory </span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\"> does not
    exist locally&quot;</span>\n<span class=\"w\">    </span><span class=\"k\">fi</span>\n<span
    class=\"w\">  </span><span class=\"k\">fi</span>\n<span class=\"o\">}</span>\n\n<span
    class=\"c1\"># Removed unused function - was leftover from previous version</span>\n\n<span
    class=\"c1\"># Display startup message based on mode</span>\n<span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$MODE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"o\">=</span><span class=\"w\"> </span><span
    class=\"s2\">&quot;ssh&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">  </span>log<span class=\"w\"> </span><span class=\"s2\">&quot;Starting
    sermon file monitor for </span><span class=\"nv\">$SSH_USER</span><span class=\"s2\">@</span><span
    class=\"nv\">$SSH_HOST</span><span class=\"s2\">:</span><span class=\"nv\">$DIR_PATH</span><span
    class=\"s2\"> (SSH mode)&quot;</span>\n<span class=\"k\">else</span>\n<span class=\"w\">
    \ </span>log<span class=\"w\"> </span><span class=\"s2\">&quot;Starting sermon
    file monitor for </span><span class=\"nv\">$DIR_PATH</span><span class=\"s2\">
    (local mode)&quot;</span>\n<span class=\"k\">fi</span>\n\n<span class=\"c1\">#
    Run initial check to establish baseline</span>\n<span class=\"nv\">CURRENT_LISTING</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>get_directory_listing<span class=\"k\">)</span>\n<span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$CURRENT_LISTING</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span>&gt;<span class=\"s2\">&quot;</span><span class=\"nv\">$PREV_STATE_FILE</span><span
    class=\"s2\">&quot;</span>\nlog<span class=\"w\"> </span><span class=\"s2\">&quot;Initial
    state captured. Watching for changes.&quot;</span>\n\n<span class=\"c1\"># Monitor
    continuously</span>\n<span class=\"k\">while</span><span class=\"w\"> </span>true<span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">do</span>\n<span
    class=\"w\">  </span><span class=\"c1\"># Sleep for 30 seconds between checks</span>\n<span
    class=\"w\">  </span>sleep<span class=\"w\"> </span><span class=\"m\">30</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\"># Get current listing</span>\n<span class=\"w\">
    \ </span><span class=\"nv\">CURRENT_LISTING</span><span class=\"o\">=</span><span
    class=\"k\">$(</span>get_directory_listing<span class=\"k\">)</span>\n\n<span
    class=\"w\">  </span><span class=\"c1\"># Find new files by comparing with previous
    state</span>\n<span class=\"w\">  </span><span class=\"nv\">NEW_FILES</span><span
    class=\"o\">=</span><span class=\"k\">$(</span>diff<span class=\"w\"> </span>--new-line-format<span
    class=\"o\">=</span><span class=\"s2\">&quot;%L&quot;</span><span class=\"w\">
    </span>--old-line-format<span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span>--unchanged-line-format<span class=\"o\">=</span><span class=\"s2\">&quot;&quot;</span><span
    class=\"w\"> </span><span class=\"se\">\\</span>\n<span class=\"w\">    </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$PREV_STATE_FILE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span>&lt;<span class=\"o\">(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$CURRENT_LISTING</span><span
    class=\"s2\">&quot;</span><span class=\"k\">)</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span
    class=\"w\"> </span><span class=\"s2\">&quot;^total&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^drwx&quot;</span><span
    class=\"o\">)</span>\n\n<span class=\"w\">  </span><span class=\"c1\"># If new
    files found, notify</span>\n<span class=\"w\">  </span><span class=\"k\">if</span><span
    class=\"w\"> </span><span class=\"o\">[</span><span class=\"w\"> </span>-n<span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_FILES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">    </span><span class=\"c1\"># Filter out directories and system
    entries, keep only regular files</span>\n<span class=\"w\">    </span><span class=\"nv\">FILE_ENTRIES</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_FILES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^d&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^total&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>grep<span class=\"w\"> </span>-v<span class=\"w\"> </span><span
    class=\"s2\">&quot;^\\.</span>$<span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^\\.\\.&quot;</span><span
    class=\"k\">)</span>\n\n<span class=\"w\">    </span><span class=\"c1\"># Count
    how many actual files (non-empty lines)</span>\n<span class=\"w\">    </span><span
    class=\"nv\">NEW_COUNT</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$FILE_ENTRIES</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>grep<span class=\"w\">
    </span>-v<span class=\"w\"> </span><span class=\"s2\">&quot;^</span>$<span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"p\">|</span><span class=\"w\"> </span>wc<span
    class=\"w\"> </span>-l<span class=\"k\">)</span>\n\n<span class=\"w\">    </span><span
    class=\"c1\"># Only proceed if we have actual files</span>\n<span class=\"w\">
    \   </span><span class=\"k\">if</span><span class=\"w\"> </span><span class=\"o\">[</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$NEW_COUNT</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>-gt<span class=\"w\"> </span><span
    class=\"m\">0</span><span class=\"w\"> </span><span class=\"o\">]</span><span
    class=\"p\">;</span><span class=\"w\"> </span><span class=\"k\">then</span>\n<span
    class=\"w\">      </span><span class=\"c1\"># Create notification message</span>\n<span
    class=\"w\">      </span><span class=\"k\">if</span><span class=\"w\"> </span><span
    class=\"o\">[</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$NEW_COUNT</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span>-eq<span class=\"w\"> </span><span class=\"m\">1</span><span class=\"w\">
    </span><span class=\"o\">]</span><span class=\"p\">;</span><span class=\"w\">
    </span><span class=\"k\">then</span>\n<span class=\"w\">        </span><span class=\"nv\">TITLE</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;New File Added&quot;</span>\n<span
    class=\"w\">        </span><span class=\"c1\"># Extract filename from listing
    line</span>\n<span class=\"w\">        </span><span class=\"nv\">FILENAME</span><span
    class=\"o\">=</span><span class=\"k\">$(</span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$FILE_ENTRIES</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span><span class=\"p\">|</span><span
    class=\"w\"> </span>awk<span class=\"w\"> </span><span class=\"s1\">&#39;{print
    $NF}&#39;</span><span class=\"k\">)</span>\n<span class=\"w\">        </span><span
    class=\"nv\">MESSAGE</span><span class=\"o\">=</span><span class=\"s2\">&quot;New
    file detected: </span><span class=\"nv\">$FILENAME</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">      </span><span class=\"k\">else</span>\n<span class=\"w\">        </span><span
    class=\"nv\">TITLE</span><span class=\"o\">=</span><span class=\"s2\">&quot;New
    Files Added&quot;</span>\n<span class=\"w\">        </span><span class=\"c1\">#
    Format filenames only for readability</span>\n<span class=\"w\">        </span><span
    class=\"nv\">FILELIST</span><span class=\"o\">=</span><span class=\"k\">$(</span><span
    class=\"nb\">echo</span><span class=\"w\"> </span><span class=\"s2\">&quot;</span><span
    class=\"nv\">$FILE_ENTRIES</span><span class=\"s2\">&quot;</span><span class=\"w\">
    </span><span class=\"p\">|</span><span class=\"w\"> </span>awk<span class=\"w\">
    </span><span class=\"s1\">&#39;{print $NF}&#39;</span><span class=\"w\"> </span><span
    class=\"p\">|</span><span class=\"w\"> </span>sort<span class=\"k\">)</span>\n<span
    class=\"w\">        </span><span class=\"nv\">MESSAGE</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$NEW_COUNT</span><span class=\"s2\">
    new files detected:\\n</span><span class=\"nv\">$FILELIST</span><span class=\"s2\">&quot;</span>\n<span
    class=\"w\">      </span><span class=\"k\">fi</span>\n\n<span class=\"w\">      </span><span
    class=\"c1\"># Send notification</span>\n<span class=\"w\">      </span>gotify<span
    class=\"w\"> </span>push<span class=\"w\"> </span>--title<span class=\"w\"> </span><span
    class=\"s2\">&quot;</span><span class=\"nv\">$TITLE</span><span class=\"s2\">&quot;</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$MESSAGE</span><span
    class=\"s2\">&quot;</span>\n<span class=\"w\">      </span>log<span class=\"w\">
    </span><span class=\"s2\">&quot;Notification sent for new files: </span><span
    class=\"nv\">$NEW_COUNT</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \   </span><span class=\"k\">fi</span>\n\n<span class=\"w\">    </span><span class=\"c1\">#
    Update previous state</span>\n<span class=\"w\">    </span><span class=\"nb\">echo</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;</span><span class=\"nv\">$CURRENT_LISTING</span><span
    class=\"s2\">&quot;</span><span class=\"w\"> </span>&gt;<span class=\"s2\">&quot;</span><span
    class=\"nv\">$PREV_STATE_FILE</span><span class=\"s2\">&quot;</span>\n<span class=\"w\">
    \ </span><span class=\"k\">fi</span>\n<span class=\"k\">done</span>\n\n<span class=\"c1\">#
    If we get here, gotify watch has exited</span>\nlog<span class=\"w\"> </span><span
    class=\"s2\">&quot;gotify watch exited unexpectedly&quot;</span>\n<span class=\"nb\">exit</span><span
    class=\"w\"> </span><span class=\"m\">1</span>\n</pre></div>\n\n</pre>\n\n<h3>Credentials</h3>\n<p>As
    noted in the gotify repo - you can put the relevant credentials in a\n<code>./cli.json</code>
    which is what I did since this is in a big repo of mine and that's\nwhere the
    script executes from</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"p\">{</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;token&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;yourToken&quot;</span><span class=\"p\">,</span>\n<span
    class=\"w\">  </span><span class=\"nt\">&quot;url&quot;</span><span class=\"p\">:</span><span
    class=\"w\"> </span><span class=\"s2\">&quot;https://gotify.example.com&quot;</span><span
    class=\"p\">,</span>\n<span class=\"w\">  </span><span class=\"nt\">&quot;defaultPriority&quot;</span><span
    class=\"p\">:</span><span class=\"w\"> </span><span class=\"mi\">6</span>\n<span
    class=\"p\">}</span>\n</pre></div>\n\n</pre>\n\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ndate: 2025-07-16 20:33:25\ntemplateKey: blog-post\ntitle: gotify cli
    for notifying me of nextcloud uploads\npublished: True\ntags:\n  - nextcloud\n
    \ - tech\n  - notifications\n  - nextcloud\n  - gotify\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250717135448_f247e916.png\"\n---\n\n#
    The Ask\n\nI was looking for a way to get notified from nextcloud when files were
    uploaded\nto a certain directory. This is because the upload is very spotty due
    to the\nphysical environment of where the nextcloud client is, and once a file
    shows up\nI have a job to do. So I was hoping nextcloud had an easy way to say
    \"if file\nshows up in X folder, notify me\" but I can't find it...\n\n## Solution
    2\n\nSince I already use gotify and they provide a [DOPE\nCLI](https://github.com/gotify/cli)
    we can write a little bash script to work\nat the filesystem level rather than
    the nextcloud level.\n\n## Permissions\n\nWe'll need to make sure the user running
    this script has all the right read\npermissions... In my exact case the file upload
    happens in a group folder,\nwhich is easily found on the filesystem in the Nextcloud
    volume at\n`.../data/__groupfolders/{id}/{rest of path}`. This was owned by `www-data`
    on\nthe host, see\n[[add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem]]
    if\nyou want but a simple `usermod -aG www-data <me>` does the trick.\n\n## The
    Script\n\nWith a little AI magic to spruce up the messaging, the script basically
    looks like this:\n\n```bash\n#!/bin/bash\n\n# Script to monitor sermon directory
    using gotify watch\n# Used with a systemd service or standalone\n# Can run in
    local or remote (SSH) mode\n\n# Configuration\n\n# Target directory to monitor\nDIR_PATH=\"/path/to/watch\"\n\n#
    Mode: Set to \"ssh\" or \"local\"\n# If ssh, will connect to SSH_HOST as SSH_USER
    to monitor the directory\n# If local, will monitor the directory directly on this
    machine\nMODE=\"ssh\"\n\n# Remote SSH settings (only used if MODE=\"ssh\")\nSSH_USER=\"youruser\"\nSSH_HOST=\"yourserver\"\n\n#
    Log settings\nLOG_DIR=\"$HOME/.local/state/sermon-monitor\"\nLOG_FILE=\"$LOG_DIR/sermon-monitor.log\"\nMAX_LOG_SIZE_KB=1024
    # 1MB max log size\n\n# Create log directory if it doesn't exist\nmkdir -p \"$LOG_DIR\"
    2>/dev/null\n\n# Create or truncate log file if it's too large\nif [ -f \"$LOG_FILE\"
    ] && [ $(stat -c%s \"$LOG_FILE\" 2>/dev/null || echo 0) -gt $((MAX_LOG_SIZE_KB
    * 1024)) ]; then\n  # Keep the last 20 lines when rotating\n  tail -n 20 \"$LOG_FILE\"
    >\"${LOG_FILE}.tmp\" 2>/dev/null && mv \"${LOG_FILE}.tmp\" \"$LOG_FILE\" 2>/dev/null\n
    \ echo \"$(date '+%Y-%m-%d %H:%M:%S') - Log file rotated due to size limit\" >>\"$LOG_FILE\"\nfi\n\n#
    Ensure log file exists\ntouch \"$LOG_FILE\" 2>/dev/null\n\n# Log function\nlog()
    {\n  echo \"$(date '+%Y-%m-%d %H:%M:%S') - $1\" | tee -a \"$LOG_FILE\"\n}\n\n#
    Create a temp file to store the previous state\nTEMP_DIR=\"/tmp/gotify-watcher\"\nPREV_STATE_FILE=\"$TEMP_DIR/previous_state.txt\"\nmkdir
    -p \"$TEMP_DIR\" 2>/dev/null || true\n\n# Function to get directory listing based
    on mode\nget_directory_listing() {\n  if [ \"$MODE\" = \"ssh\" ]; then\n    #
    Remote mode - use SSH\n    ssh $SSH_USER@$SSH_HOST \"ls -la '$DIR_PATH' | grep
    -v '^\\.\\.$' | grep -v '^\\.$'\" ||\n      echo \"Error: Failed to connect to
    $SSH_HOST\"\n  else\n    # Local mode - direct access\n    if [ -d \"$DIR_PATH\"
    ]; then\n      ls -la \"$DIR_PATH\" | grep -v '^\\.\\.$' | grep -v '^\\.$'\n    else\n
    \     echo \"Error: Directory $DIR_PATH does not exist locally\"\n    fi\n  fi\n}\n\n#
    Removed unused function - was leftover from previous version\n\n# Display startup
    message based on mode\nif [ \"$MODE\" = \"ssh\" ]; then\n  log \"Starting sermon
    file monitor for $SSH_USER@$SSH_HOST:$DIR_PATH (SSH mode)\"\nelse\n  log \"Starting
    sermon file monitor for $DIR_PATH (local mode)\"\nfi\n\n# Run initial check to
    establish baseline\nCURRENT_LISTING=$(get_directory_listing)\necho \"$CURRENT_LISTING\"
    >\"$PREV_STATE_FILE\"\nlog \"Initial state captured. Watching for changes.\"\n\n#
    Monitor continuously\nwhile true; do\n  # Sleep for 30 seconds between checks\n
    \ sleep 30\n\n  # Get current listing\n  CURRENT_LISTING=$(get_directory_listing)\n\n
    \ # Find new files by comparing with previous state\n  NEW_FILES=$(diff --new-line-format=\"%L\"
    --old-line-format=\"\" --unchanged-line-format=\"\" \\\n    \"$PREV_STATE_FILE\"
    <(echo \"$CURRENT_LISTING\") | grep -v \"^total\" | grep -v \"^drwx\")\n\n  #
    If new files found, notify\n  if [ -n \"$NEW_FILES\" ]; then\n    # Filter out
    directories and system entries, keep only regular files\n    FILE_ENTRIES=$(echo
    \"$NEW_FILES\" | grep -v \"^d\" | grep -v \"^total\" | grep -v \"^\\.$\" | grep
    -v \"^\\.\\.\")\n\n    # Count how many actual files (non-empty lines)\n    NEW_COUNT=$(echo
    \"$FILE_ENTRIES\" | grep -v \"^$\" | wc -l)\n\n    # Only proceed if we have actual
    files\n    if [ \"$NEW_COUNT\" -gt 0 ]; then\n      # Create notification message\n
    \     if [ \"$NEW_COUNT\" -eq 1 ]; then\n        TITLE=\"New File Added\"\n        #
    Extract filename from listing line\n        FILENAME=$(echo \"$FILE_ENTRIES\"
    | awk '{print $NF}')\n        MESSAGE=\"New file detected: $FILENAME\"\n      else\n
    \       TITLE=\"New Files Added\"\n        # Format filenames only for readability\n
    \       FILELIST=$(echo \"$FILE_ENTRIES\" | awk '{print $NF}' | sort)\n        MESSAGE=\"$NEW_COUNT
    new files detected:\\n$FILELIST\"\n      fi\n\n      # Send notification\n      gotify
    push --title \"$TITLE\" \"$MESSAGE\"\n      log \"Notification sent for new files:
    $NEW_COUNT\"\n    fi\n\n    # Update previous state\n    echo \"$CURRENT_LISTING\"
    >\"$PREV_STATE_FILE\"\n  fi\ndone\n\n# If we get here, gotify watch has exited\nlog
    \"gotify watch exited unexpectedly\"\nexit 1\n\n```\n\n### Credentials\n\nAs noted
    in the gotify repo - you can put the relevant credentials in a\n`./cli.json` which
    is what I did since this is in a big repo of mine and that's\nwhere the script
    executes from\n\n```json\n{\n  \"token\": \"yourToken\",\n  \"url\": \"https://gotify.example.com\",\n
    \ \"defaultPriority\": 6\n}\n```\n"
published: true
slug: gotify-cli-for-notifying-me-of-nextcloud-uploads
title: gotify cli for notifying me of nextcloud uploads


---

# The Ask

I was looking for a way to get notified from nextcloud when files were uploaded
to a certain directory. This is because the upload is very spotty due to the
physical environment of where the nextcloud client is, and once a file shows up
I have a job to do. So I was hoping nextcloud had an easy way to say "if file
shows up in X folder, notify me" but I can't find it...

## Solution 2

Since I already use gotify and they provide a [DOPE
CLI](https://github.com/gotify/cli) we can write a little bash script to work
at the filesystem level rather than the nextcloud level.

## Permissions

We'll need to make sure the user running this script has all the right read
permissions... In my exact case the file upload happens in a group folder,
which is easily found on the filesystem in the Nextcloud volume at
`.../data/__groupfolders/{id}/{rest of path}`. This was owned by `www-data` on
the host, see
[[add-yourself-to-www-data-to-view-your-nextcloud-data-on-the-filesystem]] if
you want but a simple `usermod -aG www-data <me>` does the trick.

## The Script

With a little AI magic to spruce up the messaging, the script basically looks like this:

```bash
#!/bin/bash

# Script to monitor sermon directory using gotify watch
# Used with a systemd service or standalone
# Can run in local or remote (SSH) mode

# Configuration

# Target directory to monitor
DIR_PATH="/path/to/watch"

# Mode: Set to "ssh" or "local"
# If ssh, will connect to SSH_HOST as SSH_USER to monitor the directory
# If local, will monitor the directory directly on this machine
MODE="ssh"

# Remote SSH settings (only used if MODE="ssh")
SSH_USER="youruser"
SSH_HOST="yourserver"

# Log settings
LOG_DIR="$HOME/.local/state/sermon-monitor"
LOG_FILE="$LOG_DIR/sermon-monitor.log"
MAX_LOG_SIZE_KB=1024 # 1MB max log size

# Create log directory if it doesn't exist
mkdir -p "$LOG_DIR" 2>/dev/null

# Create or truncate log file if it's too large
if [ -f "$LOG_FILE" ] && [ $(stat -c%s "$LOG_FILE" 2>/dev/null || echo 0) -gt $((MAX_LOG_SIZE_KB * 1024)) ]; then
  # Keep the last 20 lines when rotating
  tail -n 20 "$LOG_FILE" >"${LOG_FILE}.tmp" 2>/dev/null && mv "${LOG_FILE}.tmp" "$LOG_FILE" 2>/dev/null
  echo "$(date '+%Y-%m-%d %H:%M:%S') - Log file rotated due to size limit" >>"$LOG_FILE"
fi

# Ensure log file exists
touch "$LOG_FILE" 2>/dev/null

# Log function
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Create a temp file to store the previous state
TEMP_DIR="/tmp/gotify-watcher"
PREV_STATE_FILE="$TEMP_DIR/previous_state.txt"
mkdir -p "$TEMP_DIR" 2>/dev/null || true

# Function to get directory listing based on mode
get_directory_listing() {
  if [ "$MODE" = "ssh" ]; then
    # Remote mode - use SSH
    ssh $SSH_USER@$SSH_HOST "ls -la '$DIR_PATH' | grep -v '^\.\.$' | grep -v '^\.$'" ||
      echo "Error: Failed to connect to $SSH_HOST"
  else
    # Local mode - direct access
    if [ -d "$DIR_PATH" ]; then
      ls -la "$DIR_PATH" | grep -v '^\.\.$' | grep -v '^\.$'
    else
      echo "Error: Directory $DIR_PATH does not exist locally"
    fi
  fi
}

# Removed unused function - was leftover from previous version

# Display startup message based on mode
if [ "$MODE" = "ssh" ]; then
  log "Starting sermon file monitor for $SSH_USER@$SSH_HOST:$DIR_PATH (SSH mode)"
else
  log "Starting sermon file monitor for $DIR_PATH (local mode)"
fi

# Run initial check to establish baseline
CURRENT_LISTING=$(get_directory_listing)
echo "$CURRENT_LISTING" >"$PREV_STATE_FILE"
log "Initial state captured. Watching for changes."

# Monitor continuously
while true; do
  # Sleep for 30 seconds between checks
  sleep 30

  # Get current listing
  CURRENT_LISTING=$(get_directory_listing)

  # Find new files by comparing with previous state
  NEW_FILES=$(diff --new-line-format="%L" --old-line-format="" --unchanged-line-format="" \
    "$PREV_STATE_FILE" <(echo "$CURRENT_LISTING") | grep -v "^total" | grep -v "^drwx")

  # If new files found, notify
  if [ -n "$NEW_FILES" ]; then
    # Filter out directories and system entries, keep only regular files
    FILE_ENTRIES=$(echo "$NEW_FILES" | grep -v "^d" | grep -v "^total" | grep -v "^\.$" | grep -v "^\.\.")

    # Count how many actual files (non-empty lines)
    NEW_COUNT=$(echo "$FILE_ENTRIES" | grep -v "^$" | wc -l)

    # Only proceed if we have actual files
    if [ "$NEW_COUNT" -gt 0 ]; then
      # Create notification message
      if [ "$NEW_COUNT" -eq 1 ]; then
        TITLE="New File Added"
        # Extract filename from listing line
        FILENAME=$(echo "$FILE_ENTRIES" | awk '{print $NF}')
        MESSAGE="New file detected: $FILENAME"
      else
        TITLE="New Files Added"
        # Format filenames only for readability
        FILELIST=$(echo "$FILE_ENTRIES" | awk '{print $NF}' | sort)
        MESSAGE="$NEW_COUNT new files detected:\n$FILELIST"
      fi

      # Send notification
      gotify push --title "$TITLE" "$MESSAGE"
      log "Notification sent for new files: $NEW_COUNT"
    fi

    # Update previous state
    echo "$CURRENT_LISTING" >"$PREV_STATE_FILE"
  fi
done

# If we get here, gotify watch has exited
log "gotify watch exited unexpectedly"
exit 1

```

### Credentials

As noted in the gotify repo - you can put the relevant credentials in a
`./cli.json` which is what I did since this is in a big repo of mine and that's
where the script executes from

```json
{
  "token": "yourToken",
  "url": "https://gotify.example.com",
  "defaultPriority": 6
}
```