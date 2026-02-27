---
content: "Self-hosting 1 or several media servers is another common homelab use-case.\nGetting
  content for your media servers is up to you, but I'll show a few ways here to get
  content somewhat easily!\n\n__YouTube Disclaimer at Bottom__\n\n\n## you-get\n\n`you-get`
  is a nice cli for grabbing media content off the web. \n\n### Installation\n\n`pip
  install you-get` or use ad-hoc with `pipx run you-get <url>`\n\n\n### Usage\n\nFor
  example if I wanted to catch up on ancient Chinese military tactics I may go for
  `The Art of War` off the Internet Archive...\n\n```bash\nsandbox  \U0001F331 main
  \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F  \xD76via \U0001F40D v3.8.11 (sandbox)  took
  15s\n\u276F you-get https://archive.org/details/art_of_war_librivox -i\nSite:       Archive.org\nTitle:
  \     The Art of War : Sun Tzu : Free Download, Borrow, and Streaming : Internet
  Archive\nType:       MP3 (audio/mpeg)\nSize:       3.87 MiB (4055167 Bytes)\n\n```\n\nthe
  `-i` is showing me the info of what would be downloaded without the flag (it's like
  a dry run)\n\n```bash\nsandbox  \U0001F331 main \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F
  \ \xD76via \U0001F40D v3.8.11 (sandbox)\n\u276F you-get https://archive.org/details/art_of_war_librivox\nSite:
  \      Archive.org\nTitle:      The Art of War : Sun Tzu : Free Download, Borrow,
  and Streaming : Internet Archive\nType:       MP3 (audio/mpeg)\nSize:       3.87
  MiB (4055167 Bytes)\n\nDownloading The Art of War : Sun Tzu : Free Download, Borrow,
  and Streaming : Internet Archi.mp3 ...\n 100% (  3.9/  3.9MB) \u251C\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2524[1/1]
  \ 917 kB/s\n\n```\n\nNow I can toss that mp3 onto my `booksonic` server and study
  for world domination while I do the dishes!\n\n\n## pytube\n\n`pytube` is a python
  implementation of a [youtube downloader ](##YouTube) that works at the command line
  or in python!\n\n### Installation\n\n[docs](https://pytube.io/en/latest/)\n\n`pip
  install pytube`\n\n\n### Usage\n\n`pytube` has a lot of functionality, but a quick
  one would be the `--list` so you can see what qualities are available\n\n```bash\nsandbox
  \  main \uFE0F  \xD73\uFE0F  \xD77via  v3.8.11 (sandbox)  took 2m49s\n\u276F pytube
  https://www.youtube.com/watch\\?v\\=LDU_Txk06tM  --list\nLoading video...\n<Stream:
  itag=\"17\" mime_type=\"video/3gpp\" res=\"144p\" fps=\"8fps\" vcodec=\"mp4v.20.3\"
  acodec=\"mp4a.40.2\" progressive=\"True\" type=\"video\">\n<Stream: itag=\"18\"
  mime_type=\"video/mp4\" res=\"360p\" fps=\"30fps\" vcodec=\"avc1.42001E\" acodec=\"mp4a.40.2\"
  progressive=\"True\" type=\"video\">\n<Stream: itag=\"22\" mime_type=\"video/mp4\"
  res=\"720p\" fps=\"30fps\" vcodec=\"avc1.64001F\" acodec=\"mp4a.40.2\" progressive=\"True\"
  type=\"video\">\n<Stream: itag=\"313\" mime_type=\"video/webm\" res=\"2160p\" fps=\"30fps\"
  vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream: itag=\"401\" mime_type=\"video/mp4\"
  res=\"2160p\" fps=\"30fps\" vcodec=\"av01.0.12M.08\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"271\" mime_type=\"video/webm\" res=\"1440p\" fps=\"30fps\" vcodec=\"vp9\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"400\" mime_type=\"video/mp4\"
  res=\"1440p\" fps=\"30fps\" vcodec=\"av01.0.12M.08\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"137\" mime_type=\"video/mp4\" res=\"1080p\" fps=\"30fps\" vcodec=\"avc1.640028\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"248\" mime_type=\"video/webm\"
  res=\"1080p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"399\" mime_type=\"video/mp4\" res=\"1080p\" fps=\"30fps\" vcodec=\"av01.0.08M.08\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"136\" mime_type=\"video/mp4\"
  res=\"720p\" fps=\"30fps\" vcodec=\"avc1.4d401f\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"247\" mime_type=\"video/webm\" res=\"720p\" fps=\"30fps\" vcodec=\"vp9\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"398\" mime_type=\"video/mp4\"
  res=\"720p\" fps=\"30fps\" vcodec=\"av01.0.05M.08\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"135\" mime_type=\"video/mp4\" res=\"480p\" fps=\"30fps\" vcodec=\"avc1.4d401f\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"244\" mime_type=\"video/webm\"
  res=\"480p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"397\" mime_type=\"video/mp4\" res=\"480p\" fps=\"30fps\" vcodec=\"av01.0.04M.08\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"134\" mime_type=\"video/mp4\"
  res=\"360p\" fps=\"30fps\" vcodec=\"avc1.4d401e\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"243\" mime_type=\"video/webm\" res=\"360p\" fps=\"30fps\" vcodec=\"vp9\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"396\" mime_type=\"video/mp4\"
  res=\"360p\" fps=\"30fps\" vcodec=\"av01.0.01M.08\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"133\" mime_type=\"video/mp4\" res=\"240p\" fps=\"30fps\" vcodec=\"avc1.4d4015\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"242\" mime_type=\"video/webm\"
  res=\"240p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"395\" mime_type=\"video/mp4\" res=\"240p\" fps=\"30fps\" vcodec=\"av01.0.00M.08\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"160\" mime_type=\"video/mp4\"
  res=\"144p\" fps=\"30fps\" vcodec=\"avc1.4d400c\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"278\" mime_type=\"video/webm\" res=\"144p\" fps=\"30fps\" vcodec=\"vp9\"
  progressive=\"False\" type=\"video\">\n<Stream: itag=\"394\" mime_type=\"video/mp4\"
  res=\"144p\" fps=\"30fps\" vcodec=\"av01.0.00M.08\" progressive=\"False\" type=\"video\">\n<Stream:
  itag=\"139\" mime_type=\"audio/mp4\" abr=\"48kbps\" acodec=\"mp4a.40.5\" progressive=\"False\"
  type=\"audio\">\n<Stream: itag=\"140\" mime_type=\"audio/mp4\" abr=\"128kbps\" acodec=\"mp4a.40.2\"
  progressive=\"False\" type=\"audio\">\n<Stream: itag=\"249\" mime_type=\"audio/webm\"
  abr=\"50kbps\" acodec=\"opus\" progressive=\"False\" type=\"audio\">\n<Stream: itag=\"250\"
  mime_type=\"audio/webm\" abr=\"70kbps\" acodec=\"opus\" progressive=\"False\" type=\"audio\">\n<Stream:
  itag=\"251\" mime_type=\"audio/webm\" abr=\"160kbps\" acodec=\"opus\" progressive=\"False\"
  type=\"audio\">\n\n```\n\n`pytube <url> --itag <>` will download the specific `itag`
  from the list.\n\nNotice that some `itags` are videos and others audio - so you
  can download just the music of a YT video.\n\n\n`pytube` also works in python...\n\n```python\nsandbox
  \u21AA main v3.8.11 ipython\n\u276F from pytube import YouTube\n\nsandbox \u21AA
  main v3.8.11 ipython\n\u276F [x for x in YouTube(\"https://www.youtube.com/watch?v=LDU_Txk06tM\").streams]\n\n[\n
  \   <Stream: itag=\"17\" mime_type=\"video/3gpp\" res=\"144p\" fps=\"8fps\" vcodec=\"mp4v.20.3\"
  acodec=\"mp4a.40.2\" progressive=\"True\" type=\"video\">,\n    <Stream: itag=\"18\"
  mime_type=\"video/mp4\" res=\"360p\" fps=\"30fps\" vcodec=\"avc1.42001E\" acodec=\"mp4a.40.2\"
  progressive=\"True\" type=\"video\">,\n    <Stream: itag=\"22\" mime_type=\"video/mp4\"
  res=\"720p\" fps=\"30fps\" vcodec=\"avc1.64001F\" acodec=\"mp4a.40.2\" progressive=\"True\"
  type=\"video\">,\n    <Stream: itag=\"313\" mime_type=\"video/webm\" res=\"2160p\"
  fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n    <Stream:
  itag=\"401\" mime_type=\"video/mp4\" res=\"2160p\" fps=\"30fps\" vcodec=\"av01.0.12M.08\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"271\" mime_type=\"video/webm\"
  res=\"1440p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"400\" mime_type=\"video/mp4\" res=\"1440p\" fps=\"30fps\" vcodec=\"av01.0.12M.08\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"137\" mime_type=\"video/mp4\"
  res=\"1080p\" fps=\"30fps\" vcodec=\"avc1.640028\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"248\" mime_type=\"video/webm\" res=\"1080p\" fps=\"30fps\" vcodec=\"vp9\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"399\" mime_type=\"video/mp4\"
  res=\"1080p\" fps=\"30fps\" vcodec=\"av01.0.08M.08\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"136\" mime_type=\"video/mp4\" res=\"720p\" fps=\"30fps\" vcodec=\"avc1.4d401f\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"247\" mime_type=\"video/webm\"
  res=\"720p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"398\" mime_type=\"video/mp4\" res=\"720p\" fps=\"30fps\" vcodec=\"av01.0.05M.08\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"135\" mime_type=\"video/mp4\"
  res=\"480p\" fps=\"30fps\" vcodec=\"avc1.4d401f\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"244\" mime_type=\"video/webm\" res=\"480p\" fps=\"30fps\" vcodec=\"vp9\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"397\" mime_type=\"video/mp4\"
  res=\"480p\" fps=\"30fps\" vcodec=\"av01.0.04M.08\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"134\" mime_type=\"video/mp4\" res=\"360p\" fps=\"30fps\" vcodec=\"avc1.4d401e\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"243\" mime_type=\"video/webm\"
  res=\"360p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"396\" mime_type=\"video/mp4\" res=\"360p\" fps=\"30fps\" vcodec=\"av01.0.01M.08\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"133\" mime_type=\"video/mp4\"
  res=\"240p\" fps=\"30fps\" vcodec=\"avc1.4d4015\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"242\" mime_type=\"video/webm\" res=\"240p\" fps=\"30fps\" vcodec=\"vp9\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"395\" mime_type=\"video/mp4\"
  res=\"240p\" fps=\"30fps\" vcodec=\"av01.0.00M.08\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"160\" mime_type=\"video/mp4\" res=\"144p\" fps=\"30fps\" vcodec=\"avc1.4d400c\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"278\" mime_type=\"video/webm\"
  res=\"144p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n
  \   <Stream: itag=\"394\" mime_type=\"video/mp4\" res=\"144p\" fps=\"30fps\" vcodec=\"av01.0.00M.08\"
  progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"139\" mime_type=\"audio/mp4\"
  abr=\"48kbps\" acodec=\"mp4a.40.5\" progressive=\"False\" type=\"audio\">,\n    <Stream:
  itag=\"140\" mime_type=\"audio/mp4\" abr=\"128kbps\" acodec=\"mp4a.40.2\" progressive=\"False\"
  type=\"audio\">,\n    <Stream: itag=\"249\" mime_type=\"audio/webm\" abr=\"50kbps\"
  acodec=\"opus\" progressive=\"False\" type=\"audio\">,\n    <Stream: itag=\"250\"
  mime_type=\"audio/webm\" abr=\"70kbps\" acodec=\"opus\" progressive=\"False\" type=\"audio\">,\n
  \   <Stream: itag=\"251\" mime_type=\"audio/webm\" abr=\"160kbps\" acodec=\"opus\"
  progressive=\"False\" type=\"audio\">\n]\n\n\n```\n\n## YouTube Frontends\n\nThere's
  2 really good options for self-hosting a YT front-end...\n\n[Tube Archivist](https://github.com/bbilly1/tubearchivist)\n\n[YouTubeDL-Material](https://github.com/Tzahi12345/YoutubeDL-Material)\n\nThey
  have their pros and cons.\nYou can also build yourself with the above utilities
  and use Plex or Jellyfin to serve up videos...\n\n__Your self-hosting journey is
  up to you!__\n\n\n## YouTube\n\nDownloading YouTube videos is a bit of a sore topic...
  Mainly you don't to hurt creators who rely on YT ad revenue for their livlihood.\n\nThen
  again, maybe you're a vigilante who knows that YT also monetizes videos for their
  _own_ gain and that the creators don't see that money either!\n\nThe solution is
  pretty easy and is 2-fold...\n\n1. Download YT videos\n2. Personally support the
  content creators you follow via paypall, patreon, or whatever else they might have
  set-up.... even a buck or two a month is more than they'd get from your ad revenue
  explicitly plus it all goes to them!"
date: 2022-03-24
description: 'Self-hosting 1 or several media servers is another common homelab use-case.

  Getting content for your media servers is up to you, but I&#x27;ll show a few ways
  h'
html:
  index: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>self-hosted-media</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Self-hosting 1 or several media servers
    is another common homelab use-case.\nGetting content for your media servers is
    up to you, but I&#x27;ll show a few ways h\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"self-hosted-media | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/self-hosted-media\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"self-hosted-media | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Self-hosting 1 or several media servers is another common homelab use-case.\nGetting
    content for your media servers is up to you, but I&#x27;ll show a few ways h\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"
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
    \           <span class=\"site-terminal__dir\">~/self-hosted-media</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
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
    class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"
    alt=\"self-hosted-media cover image\">\n        </div>\n    </figure>\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">self-hosted-media</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-03-24\">\n            March 24, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #python\n            </a>\n            <a href=\"https://pype.dev//tags/homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #homelab\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/series-homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #series-homelab\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>Self-hosting
    1 or several media servers is another common homelab use-case.\nGetting content
    for your media servers is up to you, but I'll show a few ways here to get content
    somewhat easily!</p>\n<p><strong>YouTube Disclaimer at Bottom</strong></p>\n<h2
    id=\"you-get\">you-get <a class=\"header-anchor\" href=\"#you-get\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>you-get</code>
    is a nice cli for grabbing media content off the web.</p>\n<h3>Installation</h3>\n<p><code>pip
    install you-get</code> or use ad-hoc with <code>pipx run you-get &lt;url&gt;</code></p>\n<h3>Usage</h3>\n<p>For
    example if I wanted to catch up on ancient Chinese military tactics I may go for
    <code>The Art of War</code> off the Internet Archive...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD76via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>15s\n\u276F<span class=\"w\"> </span>you-get<span
    class=\"w\"> </span>https://archive.org/details/art_of_war_librivox<span class=\"w\">
    </span>-i\nSite:<span class=\"w\">       </span>Archive.org\nTitle:<span class=\"w\">
    \     </span>The<span class=\"w\"> </span>Art<span class=\"w\"> </span>of<span
    class=\"w\"> </span>War<span class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span
    class=\"w\"> </span>Tzu<span class=\"w\"> </span>:<span class=\"w\"> </span>Free<span
    class=\"w\"> </span>Download,<span class=\"w\"> </span>Borrow,<span class=\"w\">
    </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span
    class=\"w\"> </span>Internet<span class=\"w\"> </span>Archive\nType:<span class=\"w\">
    \      </span>MP3<span class=\"w\"> </span><span class=\"o\">(</span>audio/mpeg<span
    class=\"o\">)</span>\nSize:<span class=\"w\">       </span><span class=\"m\">3</span>.87<span
    class=\"w\"> </span>MiB<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4055167</span><span class=\"w\"> </span>Bytes<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>the
    <code>-i</code> is showing me the info of what would be downloaded without the
    flag (it's like a dry run)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD76via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>you-get<span class=\"w\"> </span>https://archive.org/details/art_of_war_librivox\nSite:<span
    class=\"w\">       </span>Archive.org\nTitle:<span class=\"w\">      </span>The<span
    class=\"w\"> </span>Art<span class=\"w\"> </span>of<span class=\"w\"> </span>War<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span class=\"w\"> </span>Tzu<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Free<span class=\"w\"> </span>Download,<span
    class=\"w\"> </span>Borrow,<span class=\"w\"> </span>and<span class=\"w\"> </span>Streaming<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Internet<span class=\"w\"> </span>Archive\nType:<span
    class=\"w\">       </span>MP3<span class=\"w\"> </span><span class=\"o\">(</span>audio/mpeg<span
    class=\"o\">)</span>\nSize:<span class=\"w\">       </span><span class=\"m\">3</span>.87<span
    class=\"w\"> </span>MiB<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4055167</span><span class=\"w\"> </span>Bytes<span class=\"o\">)</span>\n\nDownloading<span
    class=\"w\"> </span>The<span class=\"w\"> </span>Art<span class=\"w\"> </span>of<span
    class=\"w\"> </span>War<span class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span
    class=\"w\"> </span>Tzu<span class=\"w\"> </span>:<span class=\"w\"> </span>Free<span
    class=\"w\"> </span>Download,<span class=\"w\"> </span>Borrow,<span class=\"w\">
    </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span
    class=\"w\"> </span>Internet<span class=\"w\"> </span>Archi.mp3<span class=\"w\">
    </span>...\n<span class=\"w\"> </span><span class=\"m\">100</span>%<span class=\"w\">
    </span><span class=\"o\">(</span><span class=\"w\">  </span><span class=\"m\">3</span>.9/<span
    class=\"w\">  </span><span class=\"m\">3</span>.9MB<span class=\"o\">)</span><span
    class=\"w\"> </span>\u251C\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2524<span
    class=\"o\">[</span><span class=\"m\">1</span>/1<span class=\"o\">]</span><span
    class=\"w\">  </span><span class=\"m\">917</span><span class=\"w\"> </span>kB/s\n</pre></div>\n\n</pre>\n\n<p>Now
    I can toss that mp3 onto my <code>booksonic</code> server and study for world
    domination while I do the dishes!</p>\n<h2 id=\"pytube\">pytube <a class=\"header-anchor\"
    href=\"#pytube\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>pytube</code>
    is a python implementation of a <a href=\"##YouTube\">youtube downloader </a>
    that works at the command line or in python!</p>\n<h3>Installation</h3>\n<p><a
    href=\"https://pytube.io/en/latest/\">docs</a></p>\n<p><code>pip install pytube</code></p>\n<h3>Usage</h3>\n<p><code>pytube</code>
    has a lot of functionality, but a quick one would be the <code>--list</code> so
    you can see what qualities are available</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \  </span>main<span class=\"w\"> </span>\uFE0F<span class=\"w\">  </span>\xD73\uFE0F<span
    class=\"w\">  </span>\xD77via<span class=\"w\">  </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>2m49s\n\u276F<span class=\"w\"> </span>pytube<span
    class=\"w\"> </span>https://www.youtube.com/watch<span class=\"se\">\\?</span>v<span
    class=\"se\">\\=</span>LDU_Txk06tM<span class=\"w\">  </span>--list\nLoading<span
    class=\"w\"> </span>video...\n&lt;Stream:<span class=\"w\"> </span><span class=\"nv\">itag</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;17&quot;</span><span class=\"w\">
    </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/3gpp&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span><span class=\"w\"> </span><span class=\"nv\">fps</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;8fps&quot;</span><span class=\"w\">
    </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4v.20.3&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;18&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.42001E&quot;</span><span class=\"w\">
    </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;True&quot;</span><span class=\"w\"> </span><span class=\"nv\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;22&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.64001F&quot;</span><span class=\"w\">
    </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;True&quot;</span><span class=\"w\"> </span><span class=\"nv\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;313&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;401&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;271&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;400&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;137&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.640028&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;248&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;399&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.08M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;136&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;247&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;398&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.05M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;135&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;244&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;397&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.04M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;134&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401e&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;243&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;396&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.01M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;133&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d4015&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;242&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;395&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;160&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d400c&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;278&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;394&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;139&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;48kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.5&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;140&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;128kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;249&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;50kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;250&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;70kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;251&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;160kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n</pre></div>\n\n</pre>\n\n<p><code>pytube
    &lt;url&gt; --itag &lt;&gt;</code> will download the specific <code>itag</code>
    from the list.</p>\n<p>Notice that some <code>itags</code> are videos and others
    audio - so you can download just the music of a YT video.</p>\n<p><code>pytube</code>
    also works in python...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"err\">\u21AA</span> <span class=\"n\">main</span> <span class=\"n\">v3</span><span
    class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">pytube</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">YouTube</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"err\">\u21AA</span> <span class=\"n\">main</span>
    <span class=\"n\">v3</span><span class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"p\">[</span><span class=\"n\">x</span>
    <span class=\"k\">for</span> <span class=\"n\">x</span> <span class=\"ow\">in</span>
    <span class=\"n\">YouTube</span><span class=\"p\">(</span><span class=\"s2\">&quot;https://www.youtube.com/watch?v=LDU_Txk06tM&quot;</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">streams</span><span
    class=\"p\">]</span>\n\n<span class=\"p\">[</span>\n    <span class=\"o\">&lt;</span><span
    class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;17&quot;</span> <span class=\"n\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/3gpp&quot;</span> <span class=\"n\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;8fps&quot;</span> <span class=\"n\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4v.20.3&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;18&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.42001E&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;22&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.64001F&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;313&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;2160p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;401&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;2160p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;271&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1440p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;400&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1440p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;137&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.640028&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;248&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;399&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.08M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;136&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;247&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;398&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.05M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;135&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;244&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;397&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.04M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;134&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401e&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;243&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;396&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.01M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;133&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d4015&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;242&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;395&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;160&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d400c&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;278&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;394&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;139&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/mp4&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;48kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.5&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;140&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/mp4&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;128kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;249&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;50kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;250&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;70kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;251&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;160kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span>\n<span
    class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"youtube-frontends\">YouTube
    Frontends <a class=\"header-anchor\" href=\"#youtube-frontends\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's 2 really good
    options for self-hosting a YT front-end...</p>\n<p><a href=\"https://github.com/bbilly1/tubearchivist\">Tube
    Archivist</a></p>\n<p><a href=\"https://github.com/Tzahi12345/YoutubeDL-Material\">YouTubeDL-Material</a></p>\n<p>They
    have their pros and cons.\nYou can also build yourself with the above utilities
    and use Plex or Jellyfin to serve up videos...</p>\n<p><strong>Your self-hosting
    journey is up to you!</strong></p>\n<h2 id=\"youtube\">YouTube <a class=\"header-anchor\"
    href=\"#youtube\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Downloading YouTube
    videos is a bit of a sore topic... Mainly you don't to hurt creators who rely
    on YT ad revenue for their livlihood.</p>\n<p>Then again, maybe you're a vigilante
    who knows that YT also monetizes videos for their <em>own</em> gain and that the
    creators don't see that money either!</p>\n<p>The solution is pretty easy and
    is 2-fold...</p>\n<ol>\n<li>Download YT videos</li>\n<li>Personally support the
    content creators you follow via paypall, patreon, or whatever else they might
    have set-up.... even a buck or two a month is more than they'd get from your ad
    revenue explicitly plus it all goes to them!</li>\n</ol>\n\n        </section>\n
    \   </article>\n</section>        </div>\n    </main>\n</div>\n     </body>\n</html>"
  og: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>self-hosted-media</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Self-hosting 1 or several media servers
    is another common homelab use-case.\nGetting content for your media servers is
    up to you, but I&#x27;ll show a few ways h\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"self-hosted-media | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/self-hosted-media\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"self-hosted-media | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Self-hosting 1 or several media servers is another common homelab use-case.\nGetting
    content for your media servers is up to you, but I&#x27;ll show a few ways h\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"
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
    mb-4 post-title-large\">self-hosted-media</h1>\n    <div class=\"flex items-center
    text-sm text-text-main/80 mb-6\">\n        <time datetime=\"2022-03-24\">\n            March
    24, 2022\n        </time>\n    </div>\n    <div class=\"flex flex-wrap gap-2\">\n
    \           <a href=\"https://pype.dev//tags/python/\" class=\"inline-block bg-primary-light
    text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #python\n
    \           </a>\n            <a href=\"https://pype.dev//tags/homelab/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #homelab\n
    \           </a>\n            <a href=\"https://pype.dev//tags/tech/\" class=\"inline-block
    bg-primary-light text-accent-cool text-xs font-medium px-3 py-1 rounded-full hover:bg-primary-light/80
    transition-colors border border-accent-cool/20 hover-lift\">\n                #tech\n
    \           </a>\n            <a href=\"https://pype.dev//tags/series-homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #series-homelab\n            </a>\n    </div>\n</section></article>\n
    \    </body>\n</html>"
  partial: "<section class=\"post-terminal   \">\n    <figure class=\"post-terminal__media\">\n
    \       <div class=\"post-terminal__media-frame\">\n            <img src=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"
    alt=\"self-hosted-media cover image\">\n        </div>\n    </figure>\n\n    <article
    class=\"post-terminal__article\">\n<section class=\"post-header mb-8\">\n    <h1
    id=\"title\" style=\"font-size: 4rem; line-height: 1.1; font-weight: 800;\" class=\"text-6xl
    md:text-7xl font-extrabold gradient-text mb-4 post-title-large\">self-hosted-media</h1>\n
    \   <div class=\"flex items-center text-sm text-text-main/80 mb-6\">\n        <time
    datetime=\"2022-03-24\">\n            March 24, 2022\n        </time>\n    </div>\n
    \   <div class=\"flex flex-wrap gap-2\">\n            <a href=\"https://pype.dev//tags/python/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #python\n            </a>\n            <a href=\"https://pype.dev//tags/homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #homelab\n            </a>\n            <a href=\"https://pype.dev//tags/tech/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #tech\n            </a>\n            <a href=\"https://pype.dev//tags/series-homelab/\"
    class=\"inline-block bg-primary-light text-accent-cool text-xs font-medium px-3
    py-1 rounded-full hover:bg-primary-light/80 transition-colors border border-accent-cool/20
    hover-lift\">\n                #series-homelab\n            </a>\n    </div>\n</section>
    \       <section class=\"post-terminal__body prose dark:prose-invert\">\n            <p>Self-hosting
    1 or several media servers is another common homelab use-case.\nGetting content
    for your media servers is up to you, but I'll show a few ways here to get content
    somewhat easily!</p>\n<p><strong>YouTube Disclaimer at Bottom</strong></p>\n<h2
    id=\"you-get\">you-get <a class=\"header-anchor\" href=\"#you-get\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>you-get</code>
    is a nice cli for grabbing media content off the web.</p>\n<h3>Installation</h3>\n<p><code>pip
    install you-get</code> or use ad-hoc with <code>pipx run you-get &lt;url&gt;</code></p>\n<h3>Usage</h3>\n<p>For
    example if I wanted to catch up on ancient Chinese military tactics I may go for
    <code>The Art of War</code> off the Internet Archive...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD76via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>15s\n\u276F<span class=\"w\"> </span>you-get<span
    class=\"w\"> </span>https://archive.org/details/art_of_war_librivox<span class=\"w\">
    </span>-i\nSite:<span class=\"w\">       </span>Archive.org\nTitle:<span class=\"w\">
    \     </span>The<span class=\"w\"> </span>Art<span class=\"w\"> </span>of<span
    class=\"w\"> </span>War<span class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span
    class=\"w\"> </span>Tzu<span class=\"w\"> </span>:<span class=\"w\"> </span>Free<span
    class=\"w\"> </span>Download,<span class=\"w\"> </span>Borrow,<span class=\"w\">
    </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span
    class=\"w\"> </span>Internet<span class=\"w\"> </span>Archive\nType:<span class=\"w\">
    \      </span>MP3<span class=\"w\"> </span><span class=\"o\">(</span>audio/mpeg<span
    class=\"o\">)</span>\nSize:<span class=\"w\">       </span><span class=\"m\">3</span>.87<span
    class=\"w\"> </span>MiB<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4055167</span><span class=\"w\"> </span>Bytes<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>the
    <code>-i</code> is showing me the info of what would be downloaded without the
    flag (it's like a dry run)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD76via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>you-get<span class=\"w\"> </span>https://archive.org/details/art_of_war_librivox\nSite:<span
    class=\"w\">       </span>Archive.org\nTitle:<span class=\"w\">      </span>The<span
    class=\"w\"> </span>Art<span class=\"w\"> </span>of<span class=\"w\"> </span>War<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span class=\"w\"> </span>Tzu<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Free<span class=\"w\"> </span>Download,<span
    class=\"w\"> </span>Borrow,<span class=\"w\"> </span>and<span class=\"w\"> </span>Streaming<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Internet<span class=\"w\"> </span>Archive\nType:<span
    class=\"w\">       </span>MP3<span class=\"w\"> </span><span class=\"o\">(</span>audio/mpeg<span
    class=\"o\">)</span>\nSize:<span class=\"w\">       </span><span class=\"m\">3</span>.87<span
    class=\"w\"> </span>MiB<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4055167</span><span class=\"w\"> </span>Bytes<span class=\"o\">)</span>\n\nDownloading<span
    class=\"w\"> </span>The<span class=\"w\"> </span>Art<span class=\"w\"> </span>of<span
    class=\"w\"> </span>War<span class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span
    class=\"w\"> </span>Tzu<span class=\"w\"> </span>:<span class=\"w\"> </span>Free<span
    class=\"w\"> </span>Download,<span class=\"w\"> </span>Borrow,<span class=\"w\">
    </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span
    class=\"w\"> </span>Internet<span class=\"w\"> </span>Archi.mp3<span class=\"w\">
    </span>...\n<span class=\"w\"> </span><span class=\"m\">100</span>%<span class=\"w\">
    </span><span class=\"o\">(</span><span class=\"w\">  </span><span class=\"m\">3</span>.9/<span
    class=\"w\">  </span><span class=\"m\">3</span>.9MB<span class=\"o\">)</span><span
    class=\"w\"> </span>\u251C\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2524<span
    class=\"o\">[</span><span class=\"m\">1</span>/1<span class=\"o\">]</span><span
    class=\"w\">  </span><span class=\"m\">917</span><span class=\"w\"> </span>kB/s\n</pre></div>\n\n</pre>\n\n<p>Now
    I can toss that mp3 onto my <code>booksonic</code> server and study for world
    domination while I do the dishes!</p>\n<h2 id=\"pytube\">pytube <a class=\"header-anchor\"
    href=\"#pytube\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>pytube</code>
    is a python implementation of a <a href=\"##YouTube\">youtube downloader </a>
    that works at the command line or in python!</p>\n<h3>Installation</h3>\n<p><a
    href=\"https://pytube.io/en/latest/\">docs</a></p>\n<p><code>pip install pytube</code></p>\n<h3>Usage</h3>\n<p><code>pytube</code>
    has a lot of functionality, but a quick one would be the <code>--list</code> so
    you can see what qualities are available</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \  </span>main<span class=\"w\"> </span>\uFE0F<span class=\"w\">  </span>\xD73\uFE0F<span
    class=\"w\">  </span>\xD77via<span class=\"w\">  </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>2m49s\n\u276F<span class=\"w\"> </span>pytube<span
    class=\"w\"> </span>https://www.youtube.com/watch<span class=\"se\">\\?</span>v<span
    class=\"se\">\\=</span>LDU_Txk06tM<span class=\"w\">  </span>--list\nLoading<span
    class=\"w\"> </span>video...\n&lt;Stream:<span class=\"w\"> </span><span class=\"nv\">itag</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;17&quot;</span><span class=\"w\">
    </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/3gpp&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span><span class=\"w\"> </span><span class=\"nv\">fps</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;8fps&quot;</span><span class=\"w\">
    </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4v.20.3&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;18&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.42001E&quot;</span><span class=\"w\">
    </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;True&quot;</span><span class=\"w\"> </span><span class=\"nv\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;22&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.64001F&quot;</span><span class=\"w\">
    </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;True&quot;</span><span class=\"w\"> </span><span class=\"nv\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;313&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;401&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;271&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;400&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;137&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.640028&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;248&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;399&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.08M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;136&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;247&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;398&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.05M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;135&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;244&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;397&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.04M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;134&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401e&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;243&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;396&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.01M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;133&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d4015&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;242&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;395&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;160&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d400c&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;278&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;394&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;139&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;48kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.5&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;140&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;128kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;249&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;50kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;250&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;70kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;251&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;160kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n</pre></div>\n\n</pre>\n\n<p><code>pytube
    &lt;url&gt; --itag &lt;&gt;</code> will download the specific <code>itag</code>
    from the list.</p>\n<p>Notice that some <code>itags</code> are videos and others
    audio - so you can download just the music of a YT video.</p>\n<p><code>pytube</code>
    also works in python...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"err\">\u21AA</span> <span class=\"n\">main</span> <span class=\"n\">v3</span><span
    class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">pytube</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">YouTube</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"err\">\u21AA</span> <span class=\"n\">main</span>
    <span class=\"n\">v3</span><span class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"p\">[</span><span class=\"n\">x</span>
    <span class=\"k\">for</span> <span class=\"n\">x</span> <span class=\"ow\">in</span>
    <span class=\"n\">YouTube</span><span class=\"p\">(</span><span class=\"s2\">&quot;https://www.youtube.com/watch?v=LDU_Txk06tM&quot;</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">streams</span><span
    class=\"p\">]</span>\n\n<span class=\"p\">[</span>\n    <span class=\"o\">&lt;</span><span
    class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;17&quot;</span> <span class=\"n\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/3gpp&quot;</span> <span class=\"n\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;8fps&quot;</span> <span class=\"n\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4v.20.3&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;18&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.42001E&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;22&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.64001F&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;313&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;2160p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;401&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;2160p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;271&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1440p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;400&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1440p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;137&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.640028&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;248&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;399&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.08M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;136&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;247&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;398&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.05M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;135&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;244&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;397&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.04M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;134&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401e&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;243&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;396&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.01M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;133&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d4015&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;242&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;395&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;160&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d400c&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;278&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;394&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;139&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/mp4&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;48kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.5&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;140&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/mp4&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;128kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;249&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;50kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;250&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;70kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;251&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;160kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span>\n<span
    class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"youtube-frontends\">YouTube
    Frontends <a class=\"header-anchor\" href=\"#youtube-frontends\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's 2 really good
    options for self-hosting a YT front-end...</p>\n<p><a href=\"https://github.com/bbilly1/tubearchivist\">Tube
    Archivist</a></p>\n<p><a href=\"https://github.com/Tzahi12345/YoutubeDL-Material\">YouTubeDL-Material</a></p>\n<p>They
    have their pros and cons.\nYou can also build yourself with the above utilities
    and use Plex or Jellyfin to serve up videos...</p>\n<p><strong>Your self-hosting
    journey is up to you!</strong></p>\n<h2 id=\"youtube\">YouTube <a class=\"header-anchor\"
    href=\"#youtube\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Downloading YouTube
    videos is a bit of a sore topic... Mainly you don't to hurt creators who rely
    on YT ad revenue for their livlihood.</p>\n<p>Then again, maybe you're a vigilante
    who knows that YT also monetizes videos for their <em>own</em> gain and that the
    creators don't see that money either!</p>\n<p>The solution is pretty easy and
    is 2-fold...</p>\n<ol>\n<li>Download YT videos</li>\n<li>Personally support the
    content creators you follow via paypall, patreon, or whatever else they might
    have set-up.... even a buck or two a month is more than they'd get from your ad
    revenue explicitly plus it all goes to them!</li>\n</ol>\n\n        </section>\n
    \   </article>\n</section>"
  protected-post: "<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n<title>self-hosted-media</title>\n<meta
    charset=\"UTF-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"
    />\n<meta name=\"description\" content=\"Self-hosting 1 or several media servers
    is another common homelab use-case.\nGetting content for your media servers is
    up to you, but I&#x27;ll show a few ways h\" />\n <link href=\"/favicon.ico\"
    rel=\"icon\" type=\"image/png\" />\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link
    rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap\"
    rel=\"stylesheet\">\n\n<link rel=\"stylesheet\" href=\"/post.css\" />\n<link rel=\"stylesheet\"
    href=\"/app.css\" />\n<link rel=\"stylesheet\" href=\"/patterns.css\" />\n<link
    rel=\"stylesheet\" href=\"/title-override.css\" />\n<link rel=\"stylesheet\" href=\"/terminal-ui.css\"
    />\n<script src=\"/theme.js\"></script>\n<script src=\"/image-modal.js\"></script>\n\n<!--
    Open Graph and Twitter Card meta tags -->\n<!-- Regular post meta tags -->\n<meta
    property=\"og:title\" content=\"self-hosted-media | Nic Payne\" />\n<meta property=\"og:image\"
    content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"
    />\n<meta property=\"og:url\" content=\"https://pype.dev/self-hosted-media\" />\n<meta
    name=\"twitter:card\" content=\"summary_large_image\">\n<meta name=\"twitter:title\"
    content=\"self-hosted-media | Nic Payne\" />\n<meta name=\"twitter:description\"
    content=\"Self-hosting 1 or several media servers is another common homelab use-case.\nGetting
    content for your media servers is up to you, but I&#x27;ll show a few ways h\"
    />\n<meta name=\"twitter:image\" content=\"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"
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
    \           <span class=\"site-terminal__dir\">~/self-hosted-media</span>\n        </div>\n
    \       <div class=\"site-terminal__meta\">infra \xB7 automation \xB7 writing</div>\n
    \   </div>\n\n    <nav class=\"site-terminal__links\" aria-label=\"Primary\">\n
    \       <a class=\"site-terminal__link\" href=\"/\">Home</a>\n        <a class=\"site-terminal__link\"
    href=\"/slash\">Start Here</a>\n        <a class=\"site-terminal__link\" href=\"/my-thoughts\">My
    Thoughts</a>\n        <a class=\"site-terminal__link\" href=\"https://github.com/pypeaday/pype.dev\">GitHub</a>\n
    \       <a class=\"site-terminal__link\" href=\"https://mydigitalharbor.com/pypeaday\">DigitalHarbor</a>\n
    \   </nav>\n\n    <div class=\"site-terminal__status\">\n        <span>role: Disciple
    \xB7 Husband \xB7 Father \xB7 Developer</span>\n        <!-- <span>favorite tools:
    nvim \xB7 tmux \xB7 k9s \xB7 nix \xB7 ansible</span> -->\n    </div>\n</header>
    \   <!-- Content is handled by the password protection plugin -->\n    <p>Self-hosting
    1 or several media servers is another common homelab use-case.\nGetting content
    for your media servers is up to you, but I'll show a few ways here to get content
    somewhat easily!</p>\n<p><strong>YouTube Disclaimer at Bottom</strong></p>\n<h2
    id=\"you-get\">you-get <a class=\"header-anchor\" href=\"#you-get\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>you-get</code>
    is a nice cli for grabbing media content off the web.</p>\n<h3>Installation</h3>\n<p><code>pip
    install you-get</code> or use ad-hoc with <code>pipx run you-get &lt;url&gt;</code></p>\n<h3>Usage</h3>\n<p>For
    example if I wanted to catch up on ancient Chinese military tactics I may go for
    <code>The Art of War</code> off the Internet Archive...</p>\n<pre class='wrapper'>\n\n<div
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD76via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>15s\n\u276F<span class=\"w\"> </span>you-get<span
    class=\"w\"> </span>https://archive.org/details/art_of_war_librivox<span class=\"w\">
    </span>-i\nSite:<span class=\"w\">       </span>Archive.org\nTitle:<span class=\"w\">
    \     </span>The<span class=\"w\"> </span>Art<span class=\"w\"> </span>of<span
    class=\"w\"> </span>War<span class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span
    class=\"w\"> </span>Tzu<span class=\"w\"> </span>:<span class=\"w\"> </span>Free<span
    class=\"w\"> </span>Download,<span class=\"w\"> </span>Borrow,<span class=\"w\">
    </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span
    class=\"w\"> </span>Internet<span class=\"w\"> </span>Archive\nType:<span class=\"w\">
    \      </span>MP3<span class=\"w\"> </span><span class=\"o\">(</span>audio/mpeg<span
    class=\"o\">)</span>\nSize:<span class=\"w\">       </span><span class=\"m\">3</span>.87<span
    class=\"w\"> </span>MiB<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4055167</span><span class=\"w\"> </span>Bytes<span class=\"o\">)</span>\n</pre></div>\n\n</pre>\n\n<p>the
    <code>-i</code> is showing me the info of what would be downloaded without the
    flag (it's like a dry run)</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \ </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1\uFE0F<span
    class=\"w\">  </span>\xD73\U0001F6E4\uFE0F<span class=\"w\">  </span>\xD76via<span
    class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n\u276F<span
    class=\"w\"> </span>you-get<span class=\"w\"> </span>https://archive.org/details/art_of_war_librivox\nSite:<span
    class=\"w\">       </span>Archive.org\nTitle:<span class=\"w\">      </span>The<span
    class=\"w\"> </span>Art<span class=\"w\"> </span>of<span class=\"w\"> </span>War<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span class=\"w\"> </span>Tzu<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Free<span class=\"w\"> </span>Download,<span
    class=\"w\"> </span>Borrow,<span class=\"w\"> </span>and<span class=\"w\"> </span>Streaming<span
    class=\"w\"> </span>:<span class=\"w\"> </span>Internet<span class=\"w\"> </span>Archive\nType:<span
    class=\"w\">       </span>MP3<span class=\"w\"> </span><span class=\"o\">(</span>audio/mpeg<span
    class=\"o\">)</span>\nSize:<span class=\"w\">       </span><span class=\"m\">3</span>.87<span
    class=\"w\"> </span>MiB<span class=\"w\"> </span><span class=\"o\">(</span><span
    class=\"m\">4055167</span><span class=\"w\"> </span>Bytes<span class=\"o\">)</span>\n\nDownloading<span
    class=\"w\"> </span>The<span class=\"w\"> </span>Art<span class=\"w\"> </span>of<span
    class=\"w\"> </span>War<span class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span
    class=\"w\"> </span>Tzu<span class=\"w\"> </span>:<span class=\"w\"> </span>Free<span
    class=\"w\"> </span>Download,<span class=\"w\"> </span>Borrow,<span class=\"w\">
    </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span
    class=\"w\"> </span>Internet<span class=\"w\"> </span>Archi.mp3<span class=\"w\">
    </span>...\n<span class=\"w\"> </span><span class=\"m\">100</span>%<span class=\"w\">
    </span><span class=\"o\">(</span><span class=\"w\">  </span><span class=\"m\">3</span>.9/<span
    class=\"w\">  </span><span class=\"m\">3</span>.9MB<span class=\"o\">)</span><span
    class=\"w\"> </span>\u251C\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2524<span
    class=\"o\">[</span><span class=\"m\">1</span>/1<span class=\"o\">]</span><span
    class=\"w\">  </span><span class=\"m\">917</span><span class=\"w\"> </span>kB/s\n</pre></div>\n\n</pre>\n\n<p>Now
    I can toss that mp3 onto my <code>booksonic</code> server and study for world
    domination while I do the dishes!</p>\n<h2 id=\"pytube\">pytube <a class=\"header-anchor\"
    href=\"#pytube\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p><code>pytube</code>
    is a python implementation of a <a href=\"##YouTube\">youtube downloader </a>
    that works at the command line or in python!</p>\n<h3>Installation</h3>\n<p><a
    href=\"https://pytube.io/en/latest/\">docs</a></p>\n<p><code>pip install pytube</code></p>\n<h3>Usage</h3>\n<p><code>pytube</code>
    has a lot of functionality, but a quick one would be the <code>--list</code> so
    you can see what qualities are available</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span>sandbox<span class=\"w\">
    \  </span>main<span class=\"w\"> </span>\uFE0F<span class=\"w\">  </span>\xD73\uFE0F<span
    class=\"w\">  </span>\xD77via<span class=\"w\">  </span>v3.8.11<span class=\"w\">
    </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span><span class=\"w\">
    \ </span>took<span class=\"w\"> </span>2m49s\n\u276F<span class=\"w\"> </span>pytube<span
    class=\"w\"> </span>https://www.youtube.com/watch<span class=\"se\">\\?</span>v<span
    class=\"se\">\\=</span>LDU_Txk06tM<span class=\"w\">  </span>--list\nLoading<span
    class=\"w\"> </span>video...\n&lt;Stream:<span class=\"w\"> </span><span class=\"nv\">itag</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;17&quot;</span><span class=\"w\">
    </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/3gpp&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span><span class=\"w\"> </span><span class=\"nv\">fps</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;8fps&quot;</span><span class=\"w\">
    </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4v.20.3&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;18&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.42001E&quot;</span><span class=\"w\">
    </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;True&quot;</span><span class=\"w\"> </span><span class=\"nv\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;22&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.64001F&quot;</span><span class=\"w\">
    </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;True&quot;</span><span class=\"w\"> </span><span class=\"nv\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;313&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;401&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;271&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;400&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;137&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.640028&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;248&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;399&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.08M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;136&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;247&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;398&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.05M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;135&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;244&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;397&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.04M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;134&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401e&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;243&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;396&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.01M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;133&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d4015&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;242&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;395&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;160&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d400c&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;278&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
    </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
    class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;394&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
    </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;139&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;48kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.5&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;140&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/mp4&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;128kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;249&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;50kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;250&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;70kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
    class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;251&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span><span class=\"w\">
    </span><span class=\"nv\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;160kbps&quot;</span><span
    class=\"w\"> </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
    </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n</pre></div>\n\n</pre>\n\n<p><code>pytube
    &lt;url&gt; --itag &lt;&gt;</code> will download the specific <code>itag</code>
    from the list.</p>\n<p>Notice that some <code>itags</code> are videos and others
    audio - so you can download just the music of a YT video.</p>\n<p><code>pytube</code>
    also works in python...</p>\n<pre class='wrapper'>\n\n<div class='copy-wrapper'>\n\n<button
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
    \       \n<div class=\"highlight\"><pre><span></span><span class=\"n\">sandbox</span>
    <span class=\"err\">\u21AA</span> <span class=\"n\">main</span> <span class=\"n\">v3</span><span
    class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span class=\"err\">\u276F</span>
    <span class=\"kn\">from</span><span class=\"w\"> </span><span class=\"nn\">pytube</span><span
    class=\"w\"> </span><span class=\"kn\">import</span> <span class=\"n\">YouTube</span>\n\n<span
    class=\"n\">sandbox</span> <span class=\"err\">\u21AA</span> <span class=\"n\">main</span>
    <span class=\"n\">v3</span><span class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span
    class=\"err\">\u276F</span> <span class=\"p\">[</span><span class=\"n\">x</span>
    <span class=\"k\">for</span> <span class=\"n\">x</span> <span class=\"ow\">in</span>
    <span class=\"n\">YouTube</span><span class=\"p\">(</span><span class=\"s2\">&quot;https://www.youtube.com/watch?v=LDU_Txk06tM&quot;</span><span
    class=\"p\">)</span><span class=\"o\">.</span><span class=\"n\">streams</span><span
    class=\"p\">]</span>\n\n<span class=\"p\">[</span>\n    <span class=\"o\">&lt;</span><span
    class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;17&quot;</span> <span class=\"n\">mime_type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video/3gpp&quot;</span> <span class=\"n\">res</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;8fps&quot;</span> <span class=\"n\">vcodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4v.20.3&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;18&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.42001E&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;22&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.64001F&quot;</span> <span class=\"n\">acodec</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;313&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;2160p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;401&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;2160p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;271&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1440p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;400&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1440p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.12M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;137&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.640028&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;248&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;399&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;1080p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.08M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;136&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;247&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;398&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.05M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;135&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;244&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;397&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.04M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;134&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d401e&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;243&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;396&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.01M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;133&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d4015&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;242&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;395&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;160&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;avc1.4d400c&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;278&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;394&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;av01.0.00M.08&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;139&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/mp4&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;48kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.5&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;140&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/mp4&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;128kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;mp4a.40.2&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;249&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;50kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;250&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;70kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span
    class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
    class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;251&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;160kbps&quot;</span> <span class=\"n\">acodec</span><span class=\"o\">=</span><span
    class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
    class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span>\n<span
    class=\"p\">]</span>\n</pre></div>\n\n</pre>\n\n<h2 id=\"youtube-frontends\">YouTube
    Frontends <a class=\"header-anchor\" href=\"#youtube-frontends\"><svg class=\"heading-permalink\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>There's 2 really good
    options for self-hosting a YT front-end...</p>\n<p><a href=\"https://github.com/bbilly1/tubearchivist\">Tube
    Archivist</a></p>\n<p><a href=\"https://github.com/Tzahi12345/YoutubeDL-Material\">YouTubeDL-Material</a></p>\n<p>They
    have their pros and cons.\nYou can also build yourself with the above utilities
    and use Plex or Jellyfin to serve up videos...</p>\n<p><strong>Your self-hosting
    journey is up to you!</strong></p>\n<h2 id=\"youtube\">YouTube <a class=\"header-anchor\"
    href=\"#youtube\"><svg class=\"heading-permalink\" aria-hidden=\"true\" fill=\"currentColor\"
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
    1.563 1 1 0 0 0 1.602-1.198z\"></path></svg></a></h2>\n<p>Downloading YouTube
    videos is a bit of a sore topic... Mainly you don't to hurt creators who rely
    on YT ad revenue for their livlihood.</p>\n<p>Then again, maybe you're a vigilante
    who knows that YT also monetizes videos for their <em>own</em> gain and that the
    creators don't see that money either!</p>\n<p>The solution is pretty easy and
    is 2-fold...</p>\n<ol>\n<li>Download YT videos</li>\n<li>Personally support the
    content creators you follow via paypall, patreon, or whatever else they might
    have set-up.... even a buck or two a month is more than they'd get from your ad
    revenue explicitly plus it all goes to them!</li>\n</ol>\n\n        </div>\n    </main>\n</div>\n
    \    </body>\n</html>"
  raw.md: "---\ntemplateKey: blog-post\ntitle: self-hosted-media\ndate: 2022-03-24T00:00:00\npublished:
    True\ncover: \"https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250618111543_54b9eac0.png\"\ntags:
    \n  - python\n  - homelab\n  - tech\n  - series-homelab\n\n\n---\n\nSelf-hosting
    1 or several media servers is another common homelab use-case.\nGetting content
    for your media servers is up to you, but I'll show a few ways here to get content
    somewhat easily!\n\n__YouTube Disclaimer at Bottom__\n\n\n## you-get\n\n`you-get`
    is a nice cli for grabbing media content off the web. \n\n### Installation\n\n`pip
    install you-get` or use ad-hoc with `pipx run you-get <url>`\n\n\n### Usage\n\nFor
    example if I wanted to catch up on ancient Chinese military tactics I may go for
    `The Art of War` off the Internet Archive...\n\n```bash\nsandbox  \U0001F331 main
    \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F  \xD76via \U0001F40D v3.8.11 (sandbox)
    \ took 15s\n\u276F you-get https://archive.org/details/art_of_war_librivox -i\nSite:
    \      Archive.org\nTitle:      The Art of War : Sun Tzu : Free Download, Borrow,
    and Streaming : Internet Archive\nType:       MP3 (audio/mpeg)\nSize:       3.87
    MiB (4055167 Bytes)\n\n```\n\nthe `-i` is showing me the info of what would be
    downloaded without the flag (it's like a dry run)\n\n```bash\nsandbox  \U0001F331
    main \U0001F5D1\uFE0F  \xD73\U0001F6E4\uFE0F  \xD76via \U0001F40D v3.8.11 (sandbox)\n\u276F
    you-get https://archive.org/details/art_of_war_librivox\nSite:       Archive.org\nTitle:
    \     The Art of War : Sun Tzu : Free Download, Borrow, and Streaming : Internet
    Archive\nType:       MP3 (audio/mpeg)\nSize:       3.87 MiB (4055167 Bytes)\n\nDownloading
    The Art of War : Sun Tzu : Free Download, Borrow, and Streaming : Internet Archi.mp3
    ...\n 100% (  3.9/  3.9MB) \u251C\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2524[1/1]
    \ 917 kB/s\n\n```\n\nNow I can toss that mp3 onto my `booksonic` server and study
    for world domination while I do the dishes!\n\n\n## pytube\n\n`pytube` is a python
    implementation of a [youtube downloader ](##YouTube) that works at the command
    line or in python!\n\n### Installation\n\n[docs](https://pytube.io/en/latest/)\n\n`pip
    install pytube`\n\n\n### Usage\n\n`pytube` has a lot of functionality, but a quick
    one would be the `--list` so you can see what qualities are available\n\n```bash\nsandbox
    \  main \uFE0F  \xD73\uFE0F  \xD77via  v3.8.11 (sandbox)  took 2m49s\n\u276F pytube
    https://www.youtube.com/watch\\?v\\=LDU_Txk06tM  --list\nLoading video...\n<Stream:
    itag=\"17\" mime_type=\"video/3gpp\" res=\"144p\" fps=\"8fps\" vcodec=\"mp4v.20.3\"
    acodec=\"mp4a.40.2\" progressive=\"True\" type=\"video\">\n<Stream: itag=\"18\"
    mime_type=\"video/mp4\" res=\"360p\" fps=\"30fps\" vcodec=\"avc1.42001E\" acodec=\"mp4a.40.2\"
    progressive=\"True\" type=\"video\">\n<Stream: itag=\"22\" mime_type=\"video/mp4\"
    res=\"720p\" fps=\"30fps\" vcodec=\"avc1.64001F\" acodec=\"mp4a.40.2\" progressive=\"True\"
    type=\"video\">\n<Stream: itag=\"313\" mime_type=\"video/webm\" res=\"2160p\"
    fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream: itag=\"401\"
    mime_type=\"video/mp4\" res=\"2160p\" fps=\"30fps\" vcodec=\"av01.0.12M.08\" progressive=\"False\"
    type=\"video\">\n<Stream: itag=\"271\" mime_type=\"video/webm\" res=\"1440p\"
    fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream: itag=\"400\"
    mime_type=\"video/mp4\" res=\"1440p\" fps=\"30fps\" vcodec=\"av01.0.12M.08\" progressive=\"False\"
    type=\"video\">\n<Stream: itag=\"137\" mime_type=\"video/mp4\" res=\"1080p\" fps=\"30fps\"
    vcodec=\"avc1.640028\" progressive=\"False\" type=\"video\">\n<Stream: itag=\"248\"
    mime_type=\"video/webm\" res=\"1080p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\"
    type=\"video\">\n<Stream: itag=\"399\" mime_type=\"video/mp4\" res=\"1080p\" fps=\"30fps\"
    vcodec=\"av01.0.08M.08\" progressive=\"False\" type=\"video\">\n<Stream: itag=\"136\"
    mime_type=\"video/mp4\" res=\"720p\" fps=\"30fps\" vcodec=\"avc1.4d401f\" progressive=\"False\"
    type=\"video\">\n<Stream: itag=\"247\" mime_type=\"video/webm\" res=\"720p\" fps=\"30fps\"
    vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream: itag=\"398\" mime_type=\"video/mp4\"
    res=\"720p\" fps=\"30fps\" vcodec=\"av01.0.05M.08\" progressive=\"False\" type=\"video\">\n<Stream:
    itag=\"135\" mime_type=\"video/mp4\" res=\"480p\" fps=\"30fps\" vcodec=\"avc1.4d401f\"
    progressive=\"False\" type=\"video\">\n<Stream: itag=\"244\" mime_type=\"video/webm\"
    res=\"480p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream:
    itag=\"397\" mime_type=\"video/mp4\" res=\"480p\" fps=\"30fps\" vcodec=\"av01.0.04M.08\"
    progressive=\"False\" type=\"video\">\n<Stream: itag=\"134\" mime_type=\"video/mp4\"
    res=\"360p\" fps=\"30fps\" vcodec=\"avc1.4d401e\" progressive=\"False\" type=\"video\">\n<Stream:
    itag=\"243\" mime_type=\"video/webm\" res=\"360p\" fps=\"30fps\" vcodec=\"vp9\"
    progressive=\"False\" type=\"video\">\n<Stream: itag=\"396\" mime_type=\"video/mp4\"
    res=\"360p\" fps=\"30fps\" vcodec=\"av01.0.01M.08\" progressive=\"False\" type=\"video\">\n<Stream:
    itag=\"133\" mime_type=\"video/mp4\" res=\"240p\" fps=\"30fps\" vcodec=\"avc1.4d4015\"
    progressive=\"False\" type=\"video\">\n<Stream: itag=\"242\" mime_type=\"video/webm\"
    res=\"240p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">\n<Stream:
    itag=\"395\" mime_type=\"video/mp4\" res=\"240p\" fps=\"30fps\" vcodec=\"av01.0.00M.08\"
    progressive=\"False\" type=\"video\">\n<Stream: itag=\"160\" mime_type=\"video/mp4\"
    res=\"144p\" fps=\"30fps\" vcodec=\"avc1.4d400c\" progressive=\"False\" type=\"video\">\n<Stream:
    itag=\"278\" mime_type=\"video/webm\" res=\"144p\" fps=\"30fps\" vcodec=\"vp9\"
    progressive=\"False\" type=\"video\">\n<Stream: itag=\"394\" mime_type=\"video/mp4\"
    res=\"144p\" fps=\"30fps\" vcodec=\"av01.0.00M.08\" progressive=\"False\" type=\"video\">\n<Stream:
    itag=\"139\" mime_type=\"audio/mp4\" abr=\"48kbps\" acodec=\"mp4a.40.5\" progressive=\"False\"
    type=\"audio\">\n<Stream: itag=\"140\" mime_type=\"audio/mp4\" abr=\"128kbps\"
    acodec=\"mp4a.40.2\" progressive=\"False\" type=\"audio\">\n<Stream: itag=\"249\"
    mime_type=\"audio/webm\" abr=\"50kbps\" acodec=\"opus\" progressive=\"False\"
    type=\"audio\">\n<Stream: itag=\"250\" mime_type=\"audio/webm\" abr=\"70kbps\"
    acodec=\"opus\" progressive=\"False\" type=\"audio\">\n<Stream: itag=\"251\" mime_type=\"audio/webm\"
    abr=\"160kbps\" acodec=\"opus\" progressive=\"False\" type=\"audio\">\n\n```\n\n`pytube
    <url> --itag <>` will download the specific `itag` from the list.\n\nNotice that
    some `itags` are videos and others audio - so you can download just the music
    of a YT video.\n\n\n`pytube` also works in python...\n\n```python\nsandbox \u21AA
    main v3.8.11 ipython\n\u276F from pytube import YouTube\n\nsandbox \u21AA main
    v3.8.11 ipython\n\u276F [x for x in YouTube(\"https://www.youtube.com/watch?v=LDU_Txk06tM\").streams]\n\n[\n
    \   <Stream: itag=\"17\" mime_type=\"video/3gpp\" res=\"144p\" fps=\"8fps\" vcodec=\"mp4v.20.3\"
    acodec=\"mp4a.40.2\" progressive=\"True\" type=\"video\">,\n    <Stream: itag=\"18\"
    mime_type=\"video/mp4\" res=\"360p\" fps=\"30fps\" vcodec=\"avc1.42001E\" acodec=\"mp4a.40.2\"
    progressive=\"True\" type=\"video\">,\n    <Stream: itag=\"22\" mime_type=\"video/mp4\"
    res=\"720p\" fps=\"30fps\" vcodec=\"avc1.64001F\" acodec=\"mp4a.40.2\" progressive=\"True\"
    type=\"video\">,\n    <Stream: itag=\"313\" mime_type=\"video/webm\" res=\"2160p\"
    fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n    <Stream:
    itag=\"401\" mime_type=\"video/mp4\" res=\"2160p\" fps=\"30fps\" vcodec=\"av01.0.12M.08\"
    progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"271\" mime_type=\"video/webm\"
    res=\"1440p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n
    \   <Stream: itag=\"400\" mime_type=\"video/mp4\" res=\"1440p\" fps=\"30fps\"
    vcodec=\"av01.0.12M.08\" progressive=\"False\" type=\"video\">,\n    <Stream:
    itag=\"137\" mime_type=\"video/mp4\" res=\"1080p\" fps=\"30fps\" vcodec=\"avc1.640028\"
    progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"248\" mime_type=\"video/webm\"
    res=\"1080p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n
    \   <Stream: itag=\"399\" mime_type=\"video/mp4\" res=\"1080p\" fps=\"30fps\"
    vcodec=\"av01.0.08M.08\" progressive=\"False\" type=\"video\">,\n    <Stream:
    itag=\"136\" mime_type=\"video/mp4\" res=\"720p\" fps=\"30fps\" vcodec=\"avc1.4d401f\"
    progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"247\" mime_type=\"video/webm\"
    res=\"720p\" fps=\"30fps\" vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n
    \   <Stream: itag=\"398\" mime_type=\"video/mp4\" res=\"720p\" fps=\"30fps\" vcodec=\"av01.0.05M.08\"
    progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"135\" mime_type=\"video/mp4\"
    res=\"480p\" fps=\"30fps\" vcodec=\"avc1.4d401f\" progressive=\"False\" type=\"video\">,\n
    \   <Stream: itag=\"244\" mime_type=\"video/webm\" res=\"480p\" fps=\"30fps\"
    vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"397\"
    mime_type=\"video/mp4\" res=\"480p\" fps=\"30fps\" vcodec=\"av01.0.04M.08\" progressive=\"False\"
    type=\"video\">,\n    <Stream: itag=\"134\" mime_type=\"video/mp4\" res=\"360p\"
    fps=\"30fps\" vcodec=\"avc1.4d401e\" progressive=\"False\" type=\"video\">,\n
    \   <Stream: itag=\"243\" mime_type=\"video/webm\" res=\"360p\" fps=\"30fps\"
    vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"396\"
    mime_type=\"video/mp4\" res=\"360p\" fps=\"30fps\" vcodec=\"av01.0.01M.08\" progressive=\"False\"
    type=\"video\">,\n    <Stream: itag=\"133\" mime_type=\"video/mp4\" res=\"240p\"
    fps=\"30fps\" vcodec=\"avc1.4d4015\" progressive=\"False\" type=\"video\">,\n
    \   <Stream: itag=\"242\" mime_type=\"video/webm\" res=\"240p\" fps=\"30fps\"
    vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"395\"
    mime_type=\"video/mp4\" res=\"240p\" fps=\"30fps\" vcodec=\"av01.0.00M.08\" progressive=\"False\"
    type=\"video\">,\n    <Stream: itag=\"160\" mime_type=\"video/mp4\" res=\"144p\"
    fps=\"30fps\" vcodec=\"avc1.4d400c\" progressive=\"False\" type=\"video\">,\n
    \   <Stream: itag=\"278\" mime_type=\"video/webm\" res=\"144p\" fps=\"30fps\"
    vcodec=\"vp9\" progressive=\"False\" type=\"video\">,\n    <Stream: itag=\"394\"
    mime_type=\"video/mp4\" res=\"144p\" fps=\"30fps\" vcodec=\"av01.0.00M.08\" progressive=\"False\"
    type=\"video\">,\n    <Stream: itag=\"139\" mime_type=\"audio/mp4\" abr=\"48kbps\"
    acodec=\"mp4a.40.5\" progressive=\"False\" type=\"audio\">,\n    <Stream: itag=\"140\"
    mime_type=\"audio/mp4\" abr=\"128kbps\" acodec=\"mp4a.40.2\" progressive=\"False\"
    type=\"audio\">,\n    <Stream: itag=\"249\" mime_type=\"audio/webm\" abr=\"50kbps\"
    acodec=\"opus\" progressive=\"False\" type=\"audio\">,\n    <Stream: itag=\"250\"
    mime_type=\"audio/webm\" abr=\"70kbps\" acodec=\"opus\" progressive=\"False\"
    type=\"audio\">,\n    <Stream: itag=\"251\" mime_type=\"audio/webm\" abr=\"160kbps\"
    acodec=\"opus\" progressive=\"False\" type=\"audio\">\n]\n\n\n```\n\n## YouTube
    Frontends\n\nThere's 2 really good options for self-hosting a YT front-end...\n\n[Tube
    Archivist](https://github.com/bbilly1/tubearchivist)\n\n[YouTubeDL-Material](https://github.com/Tzahi12345/YoutubeDL-Material)\n\nThey
    have their pros and cons.\nYou can also build yourself with the above utilities
    and use Plex or Jellyfin to serve up videos...\n\n__Your self-hosting journey
    is up to you!__\n\n\n## YouTube\n\nDownloading YouTube videos is a bit of a sore
    topic... Mainly you don't to hurt creators who rely on YT ad revenue for their
    livlihood.\n\nThen again, maybe you're a vigilante who knows that YT also monetizes
    videos for their _own_ gain and that the creators don't see that money either!\n\nThe
    solution is pretty easy and is 2-fold...\n\n1. Download YT videos\n2. Personally
    support the content creators you follow via paypall, patreon, or whatever else
    they might have set-up.... even a buck or two a month is more than they'd get
    from your ad revenue explicitly plus it all goes to them!\n"
published: true
slug: self-hosted-media
title: self-hosted-media


---

Self-hosting 1 or several media servers is another common homelab use-case.
Getting content for your media servers is up to you, but I'll show a few ways here to get content somewhat easily!

__YouTube Disclaimer at Bottom__


## you-get

`you-get` is a nice cli for grabbing media content off the web. 

### Installation

`pip install you-get` or use ad-hoc with `pipx run you-get <url>`


### Usage

For example if I wanted to catch up on ancient Chinese military tactics I may go for `The Art of War` off the Internet Archive...

```bash
sandbox  🌱 main 🗑️  ×3🛤️  ×6via 🐍 v3.8.11 (sandbox)  took 15s
❯ you-get https://archive.org/details/art_of_war_librivox -i
Site:       Archive.org
Title:      The Art of War : Sun Tzu : Free Download, Borrow, and Streaming : Internet Archive
Type:       MP3 (audio/mpeg)
Size:       3.87 MiB (4055167 Bytes)

```

the `-i` is showing me the info of what would be downloaded without the flag (it's like a dry run)

```bash
sandbox  🌱 main 🗑️  ×3🛤️  ×6via 🐍 v3.8.11 (sandbox)
❯ you-get https://archive.org/details/art_of_war_librivox
Site:       Archive.org
Title:      The Art of War : Sun Tzu : Free Download, Borrow, and Streaming : Internet Archive
Type:       MP3 (audio/mpeg)
Size:       3.87 MiB (4055167 Bytes)

Downloading The Art of War : Sun Tzu : Free Download, Borrow, and Streaming : Internet Archi.mp3 ...
 100% (  3.9/  3.9MB) ├████████████████████████████████████████████████████████████┤[1/1]  917 kB/s

```

Now I can toss that mp3 onto my `booksonic` server and study for world domination while I do the dishes!


## pytube

`pytube` is a python implementation of a [youtube downloader ](##YouTube) that works at the command line or in python!

### Installation

[docs](https://pytube.io/en/latest/)

`pip install pytube`


### Usage

`pytube` has a lot of functionality, but a quick one would be the `--list` so you can see what qualities are available

```bash
sandbox   main ️  ×3️  ×7via  v3.8.11 (sandbox)  took 2m49s
❯ pytube https://www.youtube.com/watch\?v\=LDU_Txk06tM  --list
Loading video...
<Stream: itag="17" mime_type="video/3gpp" res="144p" fps="8fps" vcodec="mp4v.20.3" acodec="mp4a.40.2" progressive="True" type="video">
<Stream: itag="18" mime_type="video/mp4" res="360p" fps="30fps" vcodec="avc1.42001E" acodec="mp4a.40.2" progressive="True" type="video">
<Stream: itag="22" mime_type="video/mp4" res="720p" fps="30fps" vcodec="avc1.64001F" acodec="mp4a.40.2" progressive="True" type="video">
<Stream: itag="313" mime_type="video/webm" res="2160p" fps="30fps" vcodec="vp9" progressive="False" type="video">
<Stream: itag="401" mime_type="video/mp4" res="2160p" fps="30fps" vcodec="av01.0.12M.08" progressive="False" type="video">
<Stream: itag="271" mime_type="video/webm" res="1440p" fps="30fps" vcodec="vp9" progressive="False" type="video">
<Stream: itag="400" mime_type="video/mp4" res="1440p" fps="30fps" vcodec="av01.0.12M.08" progressive="False" type="video">
<Stream: itag="137" mime_type="video/mp4" res="1080p" fps="30fps" vcodec="avc1.640028" progressive="False" type="video">
<Stream: itag="248" mime_type="video/webm" res="1080p" fps="30fps" vcodec="vp9" progressive="False" type="video">
<Stream: itag="399" mime_type="video/mp4" res="1080p" fps="30fps" vcodec="av01.0.08M.08" progressive="False" type="video">
<Stream: itag="136" mime_type="video/mp4" res="720p" fps="30fps" vcodec="avc1.4d401f" progressive="False" type="video">
<Stream: itag="247" mime_type="video/webm" res="720p" fps="30fps" vcodec="vp9" progressive="False" type="video">
<Stream: itag="398" mime_type="video/mp4" res="720p" fps="30fps" vcodec="av01.0.05M.08" progressive="False" type="video">
<Stream: itag="135" mime_type="video/mp4" res="480p" fps="30fps" vcodec="avc1.4d401f" progressive="False" type="video">
<Stream: itag="244" mime_type="video/webm" res="480p" fps="30fps" vcodec="vp9" progressive="False" type="video">
<Stream: itag="397" mime_type="video/mp4" res="480p" fps="30fps" vcodec="av01.0.04M.08" progressive="False" type="video">
<Stream: itag="134" mime_type="video/mp4" res="360p" fps="30fps" vcodec="avc1.4d401e" progressive="False" type="video">
<Stream: itag="243" mime_type="video/webm" res="360p" fps="30fps" vcodec="vp9" progressive="False" type="video">
<Stream: itag="396" mime_type="video/mp4" res="360p" fps="30fps" vcodec="av01.0.01M.08" progressive="False" type="video">
<Stream: itag="133" mime_type="video/mp4" res="240p" fps="30fps" vcodec="avc1.4d4015" progressive="False" type="video">
<Stream: itag="242" mime_type="video/webm" res="240p" fps="30fps" vcodec="vp9" progressive="False" type="video">
<Stream: itag="395" mime_type="video/mp4" res="240p" fps="30fps" vcodec="av01.0.00M.08" progressive="False" type="video">
<Stream: itag="160" mime_type="video/mp4" res="144p" fps="30fps" vcodec="avc1.4d400c" progressive="False" type="video">
<Stream: itag="278" mime_type="video/webm" res="144p" fps="30fps" vcodec="vp9" progressive="False" type="video">
<Stream: itag="394" mime_type="video/mp4" res="144p" fps="30fps" vcodec="av01.0.00M.08" progressive="False" type="video">
<Stream: itag="139" mime_type="audio/mp4" abr="48kbps" acodec="mp4a.40.5" progressive="False" type="audio">
<Stream: itag="140" mime_type="audio/mp4" abr="128kbps" acodec="mp4a.40.2" progressive="False" type="audio">
<Stream: itag="249" mime_type="audio/webm" abr="50kbps" acodec="opus" progressive="False" type="audio">
<Stream: itag="250" mime_type="audio/webm" abr="70kbps" acodec="opus" progressive="False" type="audio">
<Stream: itag="251" mime_type="audio/webm" abr="160kbps" acodec="opus" progressive="False" type="audio">

```

`pytube <url> --itag <>` will download the specific `itag` from the list.

Notice that some `itags` are videos and others audio - so you can download just the music of a YT video.


`pytube` also works in python...

```python
sandbox ↪ main v3.8.11 ipython
❯ from pytube import YouTube

sandbox ↪ main v3.8.11 ipython
❯ [x for x in YouTube("https://www.youtube.com/watch?v=LDU_Txk06tM").streams]

[
    <Stream: itag="17" mime_type="video/3gpp" res="144p" fps="8fps" vcodec="mp4v.20.3" acodec="mp4a.40.2" progressive="True" type="video">,
    <Stream: itag="18" mime_type="video/mp4" res="360p" fps="30fps" vcodec="avc1.42001E" acodec="mp4a.40.2" progressive="True" type="video">,
    <Stream: itag="22" mime_type="video/mp4" res="720p" fps="30fps" vcodec="avc1.64001F" acodec="mp4a.40.2" progressive="True" type="video">,
    <Stream: itag="313" mime_type="video/webm" res="2160p" fps="30fps" vcodec="vp9" progressive="False" type="video">,
    <Stream: itag="401" mime_type="video/mp4" res="2160p" fps="30fps" vcodec="av01.0.12M.08" progressive="False" type="video">,
    <Stream: itag="271" mime_type="video/webm" res="1440p" fps="30fps" vcodec="vp9" progressive="False" type="video">,
    <Stream: itag="400" mime_type="video/mp4" res="1440p" fps="30fps" vcodec="av01.0.12M.08" progressive="False" type="video">,
    <Stream: itag="137" mime_type="video/mp4" res="1080p" fps="30fps" vcodec="avc1.640028" progressive="False" type="video">,
    <Stream: itag="248" mime_type="video/webm" res="1080p" fps="30fps" vcodec="vp9" progressive="False" type="video">,
    <Stream: itag="399" mime_type="video/mp4" res="1080p" fps="30fps" vcodec="av01.0.08M.08" progressive="False" type="video">,
    <Stream: itag="136" mime_type="video/mp4" res="720p" fps="30fps" vcodec="avc1.4d401f" progressive="False" type="video">,
    <Stream: itag="247" mime_type="video/webm" res="720p" fps="30fps" vcodec="vp9" progressive="False" type="video">,
    <Stream: itag="398" mime_type="video/mp4" res="720p" fps="30fps" vcodec="av01.0.05M.08" progressive="False" type="video">,
    <Stream: itag="135" mime_type="video/mp4" res="480p" fps="30fps" vcodec="avc1.4d401f" progressive="False" type="video">,
    <Stream: itag="244" mime_type="video/webm" res="480p" fps="30fps" vcodec="vp9" progressive="False" type="video">,
    <Stream: itag="397" mime_type="video/mp4" res="480p" fps="30fps" vcodec="av01.0.04M.08" progressive="False" type="video">,
    <Stream: itag="134" mime_type="video/mp4" res="360p" fps="30fps" vcodec="avc1.4d401e" progressive="False" type="video">,
    <Stream: itag="243" mime_type="video/webm" res="360p" fps="30fps" vcodec="vp9" progressive="False" type="video">,
    <Stream: itag="396" mime_type="video/mp4" res="360p" fps="30fps" vcodec="av01.0.01M.08" progressive="False" type="video">,
    <Stream: itag="133" mime_type="video/mp4" res="240p" fps="30fps" vcodec="avc1.4d4015" progressive="False" type="video">,
    <Stream: itag="242" mime_type="video/webm" res="240p" fps="30fps" vcodec="vp9" progressive="False" type="video">,
    <Stream: itag="395" mime_type="video/mp4" res="240p" fps="30fps" vcodec="av01.0.00M.08" progressive="False" type="video">,
    <Stream: itag="160" mime_type="video/mp4" res="144p" fps="30fps" vcodec="avc1.4d400c" progressive="False" type="video">,
    <Stream: itag="278" mime_type="video/webm" res="144p" fps="30fps" vcodec="vp9" progressive="False" type="video">,
    <Stream: itag="394" mime_type="video/mp4" res="144p" fps="30fps" vcodec="av01.0.00M.08" progressive="False" type="video">,
    <Stream: itag="139" mime_type="audio/mp4" abr="48kbps" acodec="mp4a.40.5" progressive="False" type="audio">,
    <Stream: itag="140" mime_type="audio/mp4" abr="128kbps" acodec="mp4a.40.2" progressive="False" type="audio">,
    <Stream: itag="249" mime_type="audio/webm" abr="50kbps" acodec="opus" progressive="False" type="audio">,
    <Stream: itag="250" mime_type="audio/webm" abr="70kbps" acodec="opus" progressive="False" type="audio">,
    <Stream: itag="251" mime_type="audio/webm" abr="160kbps" acodec="opus" progressive="False" type="audio">
]


```

## YouTube Frontends

There's 2 really good options for self-hosting a YT front-end...

[Tube Archivist](https://github.com/bbilly1/tubearchivist)

[YouTubeDL-Material](https://github.com/Tzahi12345/YoutubeDL-Material)

They have their pros and cons.
You can also build yourself with the above utilities and use Plex or Jellyfin to serve up videos...

__Your self-hosting journey is up to you!__


## YouTube

Downloading YouTube videos is a bit of a sore topic... Mainly you don't to hurt creators who rely on YT ad revenue for their livlihood.

Then again, maybe you're a vigilante who knows that YT also monetizes videos for their _own_ gain and that the creators don't see that money either!

The solution is pretty easy and is 2-fold...

1. Download YT videos
2. Personally support the content creators you follow via paypall, patreon, or whatever else they might have set-up.... even a buck or two a month is more than they'd get from your ad revenue explicitly plus it all goes to them!