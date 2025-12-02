<?xml version="1.0" encoding="utf-8"?>
<!--

# Pretty Feed

Styles an RSS/Atom feed, making it friendly for humans viewers, and adds a link
to aboutfeeds.com for new user onboarding. See it in action:

   https://interconnected.org/home/feed


## How to use

1. Download this XML stylesheet from the following URL and host it on your own
   domain (this is a limitation of XSL in browsers):

   https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl

2. Include the XSL at the top of the RSS/Atom feed, like:

```
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/PATH-TO-YOUR-STYLES/pretty-feed-v3.xsl" type="text/xsl"?>
```

3. Serve the feed with the following HTTP headers:

```
Content-Type: application/xml; charset=utf-8  # not application/rss+xml
x-content-type-options: nosniff
```

(These headers are required to style feeds for users with Safari on iOS/Mac.)



## Limitations

- Styling the feed *prevents* the browser from automatically opening a
  newsreader application. This is a trade off, but it's a benefit to new users
  who won't have a newsreader installed, and they are saved from seeing or
  downloaded obscure XML content. For existing newsreader users, they will know
  to copy-and-paste the feed URL, and they get the benefit of an in-browser feed
  preview.
- Feed styling, for all browsers, is only available to site owners who control
  their own platform. The need to add both XML and HTTP headers makes this a
  limited solution.


## Credits

pretty-feed is based on work by lepture.com:

   https://lepture.com/en/2019/rss-style-with-xsl

This current version is maintained by aboutfeeds.com:

   https://github.com/genmon/aboutfeeds


## Feedback

This file is in BETA. Please test and contribute to the discussion:

     https://github.com/genmon/aboutfeeds/issues/8

-->
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang='en'>  
    <head>
<title>My mental data-lake</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="My thoughts and streams of consciousness organized into barely coherent posts about things" />
 <link href="/favicon.ico" rel="icon" type="image/png" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/post.css" />
<link rel="stylesheet" href="/app.css" />
<link rel="stylesheet" href="/patterns.css" />
<link rel="stylesheet" href="/title-override.css" />
<link rel="stylesheet" href="/terminal-ui.css" />
<script src="/theme.js"></script>
<script src="/image-modal.js"></script>

<!-- Open Graph and Twitter Card meta tags -->
<!-- Regular post meta tags -->
<meta property="og:title" content="Pype.dev | Nic Payne" />
<meta property="og:image" content="https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png" />
<meta property="og:url" content="https://pype.dev/" />
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Pype.dev | Nic Payne" />
<meta name="twitter:image" content="https://cdn.statically.io/gh/pypeaday/pype.dev/main/pages/media/og-02.png" />
<!-- Common Twitter meta tags -->
<meta name="twitter:creator" content="@pypeaday">
<meta name="twitter:site" content="@pypeaday">


        <meta property="og:author_email" content="nic@pype.dev" />

    </head>
    <body>
<header class="site-terminal">

    <div class="site-terminal__bar">
        <div class="site-terminal__lights" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="site-terminal__path">
            <span class="site-terminal__prompt">nic@pype</span>
            <span class="site-terminal__dir">~/feed</span>
        </div>
        <div class="site-terminal__meta">infra · automation · writing</div>
    </div>

    <nav class="site-terminal__links" aria-label="Primary">
        <a class="site-terminal__link" href="/">Home</a>
        <a class="site-terminal__link" href="https://github.com/pypeaday/pype.dev">GitHub</a>
        <a class="site-terminal__link" href="https://mydigitalharbor.com/pypeaday">DigitalHarbor</a>
        <a class="site-terminal__link" href="/slash">Start Here</a>
        <a class="site-terminal__link" href="/my-thoughts">My Thoughts</a>
    </nav>

    <div class="site-terminal__status">
        <span>role: developer // infra</span>
        <span>favorite tools: tmux · kubectl · nix · ansible</span>
    </div>
</header><main>
    <div class="container">
        <header>
        <h1><xsl:value-of select="/urlset/title"/></h1>
        <p><xsl:value-of select="/urlset/description"/></p>
        <a class="head_link" target="_blank">
            <xsl:attribute name="href">
            <xsl:value-of select="/urlset/link"/>
            </xsl:attribute>
            Visit Website &#x2192;
        </a>
        </header>
        <section class="recent">
        <h2>The Items</h2>
        <ul>
        <xsl:for-each select="sm:urlset/sm:url">
<li class='my-6 list-none'>
    <a class='w-full text-white no-underline rounded bg-neutral-800 shadow-lgc shadow-neutral-900 hover:bg-neutral-700'
        href="{sm:loc}">
        <h2 class='mx-4 mt-1 text-3xl font-bold'>
            <xsl:value-of select="sm:title" />
        </h2>
        <p class='mx-4 text-neutral-200'>
            <xsl:value-of select="sm:description" />
        </p>
        <time class='mx-4 text-neutral-600'>
            <xsl:value-of select="sm:lastmod" />
        </time>
    </a>
</li>        </xsl:for-each>
        </ul>
        </section>
    </div>

</main>
            <footer style='margin-top: 20rem;'>© 2025</footer>

    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>