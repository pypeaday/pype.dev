<?xml version="1.0" encoding="utf-8"?>
<!-- Browser reading view for Markata RSS/Atom feeds. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="/rss/channel/title | /atom:feed/atom:title"/> — Feed</title>
        <!-- Markata injects the site's palette, fontpack, theme controls and styles here. -->
        
<script><![CDATA[
  (function() {
    var root = document.documentElement;
    root.dataset.themeTextureScope = 'all';
    root.dataset.palette = 'pype';
    root.dataset.aesthetic = 'minimal';
    root.dataset.fontpack = 'plain';
    root.dataset.textSize = 'large';
  })();
]]></script>

<script><![CDATA[
  (function() {
    var root = document.documentElement;
    var fallbackSize = root.dataset.textSize || 'large';
    var allowed = { small: true, medium: true, large: true, 'x-large': true };
    var size = allowed[fallbackSize] ? fallbackSize : 'large';
    var allowVisitorSize = true;
    if (allowVisitorSize) {
      try {
        var stored = localStorage.getItem('text-size');
        if (stored && allowed[stored]) {
          size = stored;
        }
      } catch (_) {
        // ignore storage access failures
      }
    }
    root.dataset.textSize = size;
  })();
]]></script>
<script><![CDATA[
  (function() {
    var fallbackMode = 'dark';
    window.__markataThemeFallbackMode = fallbackMode;

    var mode = fallbackMode;
    var picked = '';
    var aesthetic = '';
    var fontpack = '';
    try {
      var stored = localStorage.getItem('color-mode') || localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        mode = stored;
      }
      
    } catch (_) {
      // ignore storage access failures
    }

    document.documentElement.dataset.theme = mode;
    document.documentElement.classList.toggle('dark', mode === 'dark');

    // Pin data-palette to the variant that matches the resolved mode so the
    // per-palette CSS block agrees with data-theme on first paint.
    var palettes = {
      light: 'pype\u002Dlight',
      dark: 'pype'
    };
    window.__markataThemeDefaults = palettes;
    
    if (picked === 'seasonal') picked = '';
    var modePalette = picked || (mode === 'dark' ? palettes.dark : palettes.light);
    if (modePalette) {
      document.documentElement.dataset.palette = modePalette;
    }
    if (aesthetic) {
      document.documentElement.dataset.aesthetic = aesthetic;
    }
    window.__markataPageFontpack = document.documentElement.dataset.fontpack || '';
    if (fontpack) {
      document.documentElement.dataset.fontpack = fontpack;
      
    }
  })();
]]></script>

<link rel="stylesheet" href="/css/variables.08e33724.css" />

<link rel="stylesheet" href="/css/palette.b4fc830d.css" />

<link rel="stylesheet" href="/css/main.ea997fca.css" />
<link rel="stylesheet" href="/css/components.d5d35a1b.css" />
<link rel="stylesheet" href="/css/text-size.a7cdb148.css" />

<link rel="stylesheet" href="/css/fonts.ce414e78.css" />



<link rel="stylesheet" href="/css/aesthetic.0ff75e5a.css" />


        <style>
          .feed-reader {
            --reader-width: 56rem;
            min-height: 100vh;
            color: var(--color-text, CanvasText);
            background: var(--color-background, Canvas);
            font-family: var(--font-body, ui-sans-serif, system-ui, sans-serif);
          }
          .reader-shell {
            width: min(calc(100% - 2rem), var(--reader-width));
            margin-inline: auto;
            padding-block: clamp(1rem, 3vw, 2.5rem) 5rem;
          }
          .reader-masthead {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding-bottom: .9rem;
            border-bottom: 1px solid var(--color-border, color-mix(in srgb, currentColor 20%, transparent));
            color: var(--color-text-muted, currentColor);
            font-family: var(--font-mono, ui-monospace, monospace);
            font-size: .72rem;
            letter-spacing: .1em;
            text-transform: uppercase;
          }
          .reader-brand { color: var(--color-text, currentColor); font-weight: 750; }
          .reader-subscribe {
            margin-block: 1.25rem clamp(2.5rem, 7vw, 5rem);
            padding: clamp(1rem, 3vw, 1.5rem);
            border: 1px solid var(--color-border, color-mix(in srgb, currentColor 20%, transparent));
            border-left: .3rem solid var(--color-primary, currentColor);
            border-radius: var(--radius-lg, 1rem);
            background: var(--color-surface, color-mix(in srgb, currentColor 4%, transparent));
          }
          .reader-subscribe p { margin: 0; line-height: 1.65; }
          .reader-subscribe p + p { margin-top: .45rem; color: var(--color-text-muted, currentColor); font-size: .92rem; }
          .reader-subscribe strong { color: var(--color-text, currentColor); }
          .reader-subscribe a { color: var(--color-link, var(--color-primary, currentColor)); text-underline-offset: .18em; }
          .reader-hero { position: relative; padding-bottom: 1.6rem; }
          .reader-index {
            margin: 0 0 .7rem;
            color: var(--color-primary, currentColor);
            font-family: var(--font-mono, ui-monospace, monospace);
            font-size: .74rem;
            font-weight: 700;
            letter-spacing: .13em;
            text-transform: uppercase;
          }
          .reader-hero h1 {
            max-width: 16ch;
            margin: 0;
            font-family: var(--font-heading, var(--font-body, serif));
            font-size: clamp(2.35rem, 7vw, 5.5rem);
            font-weight: 750;
            letter-spacing: -.055em;
            line-height: .98;
            text-wrap: balance;
          }
          .reader-description {
            max-width: 42rem;
            margin: 1rem 0 0;
            color: var(--color-text-muted, currentColor);
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 1.7;
          }
          .reader-meta {
            display: flex;
            flex-wrap: wrap;
            gap: .45rem 1rem;
            margin-top: 1.2rem;
            color: var(--color-text-muted, currentColor);
            font-family: var(--font-mono, ui-monospace, monospace);
            font-size: .72rem;
            letter-spacing: .025em;
          }
          .reader-list { margin: 0; padding: 0; list-style: none; counter-reset: feed-entry; }
          .reader-entry {
            display: grid;
            grid-template-columns: 3.6rem minmax(0, 1fr);
            gap: 1.1rem;
            padding: 1.5rem 0;
            border-top: 1px solid var(--color-border, color-mix(in srgb, currentColor 20%, transparent));
            counter-increment: feed-entry;
          }
          .reader-entry::before {
            content: counter(feed-entry, decimal-leading-zero);
            padding-top: .2rem;
            color: var(--color-primary, currentColor);
            font-family: var(--font-mono, ui-monospace, monospace);
            font-size: .75rem;
          }
          .reader-entry h2 {
            margin: 0;
            font-family: var(--font-heading, var(--font-body, serif));
            font-size: clamp(1.25rem, 3.2vw, 1.9rem);
            font-weight: 680;
            letter-spacing: -.025em;
            line-height: 1.18;
            text-wrap: balance;
          }
          .reader-entry h2 a { color: var(--color-text, currentColor); text-decoration: none; text-decoration-color: var(--color-primary, currentColor); text-underline-offset: .2em; }
          .reader-entry h2 a:hover { color: var(--color-link, var(--color-primary, currentColor)); text-decoration: underline; }
          .reader-entry time { display: block; margin-top: .65rem; color: var(--color-text-muted, currentColor); font-family: var(--font-mono, ui-monospace, monospace); font-size: .72rem; }
          .reader-entry p { max-width: 48rem; margin: .7rem 0 0; color: var(--color-text-muted, currentColor); line-height: 1.65; }
          .reader-footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--color-border, color-mix(in srgb, currentColor 20%, transparent)); color: var(--color-text-muted, currentColor); font-size: .8rem; }
          .reader-footer a { color: var(--color-link, var(--color-primary, currentColor)); }
          .reader-subscribe a:focus-visible, .reader-entry a:focus-visible, .reader-footer a:focus-visible { outline: 3px solid var(--color-primary, currentColor); outline-offset: 4px; border-radius: .15em; }
          @media (max-width: 34rem) {
            .reader-masthead { align-items: flex-start; flex-direction: column; gap: .35rem; }
            .reader-entry { grid-template-columns: 2rem minmax(0, 1fr); gap: .55rem; }
          }
          @media (prefers-reduced-motion: no-preference) {
            .reader-subscribe, .reader-hero, .reader-entry { animation: reader-arrive .45s ease both; }
            .reader-hero { animation-delay: .04s; }
            .reader-entry:nth-child(2) { animation-delay: .05s; }
            .reader-entry:nth-child(3) { animation-delay: .1s; }
            @keyframes reader-arrive { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          }
        </style>
      </head>
      <body class="feed-reader">
        <main class="reader-shell">
          <div class="reader-masthead">
            <span class="reader-brand">Markata · Reading view</span>
            <span><xsl:choose><xsl:when test="/atom:feed">Atom feed</xsl:when><xsl:otherwise>RSS feed</xsl:otherwise></xsl:choose> · <xsl:value-of select="count(/rss/channel/item | /atom:feed/atom:entry)"/> entries</span>
          </div>
          <aside class="reader-subscribe" aria-label="How to subscribe">
            <p><strong>This is a web feed.</strong> Copy this page’s address into your favorite feed reader to subscribe.</p>
            <p>Prefer to read here? Browse the latest entries below. <a href="https://aboutfeeds.com/">Learn about feeds</a></p>
          </aside>
          <header class="reader-hero">
            <p class="reader-index">The latest from this site</p>
            <h1><xsl:value-of select="/rss/channel/title | /atom:feed/atom:title"/></h1>
            <xsl:if test="/rss/channel/description | /atom:feed/atom:subtitle">
              <p class="reader-description"><xsl:value-of select="/rss/channel/description | /atom:feed/atom:subtitle"/></p>
            </xsl:if>
            <div class="reader-meta">
              <span><xsl:value-of select="count(/rss/channel/item | /atom:feed/atom:entry)"/> entries</span>
              <xsl:if test="/rss/channel/lastBuildDate | /atom:feed/atom:updated">
                <span>Updated <xsl:value-of select="/rss/channel/lastBuildDate | /atom:feed/atom:updated"/></span>
              </xsl:if>
              <xsl:if test="/atom:feed/atom:author/atom:name"><span>By <xsl:value-of select="/atom:feed/atom:author/atom:name"/></span></xsl:if>
            </div>
          </header>
          <ol class="reader-list">
            <xsl:choose>
              <xsl:when test="/rss/channel/item">
                <xsl:for-each select="/rss/channel/item">
                  <li class="reader-entry">
                    <div>
                      <h2><a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute><xsl:value-of select="title"/></a></h2>
                      <xsl:if test="pubDate"><time><xsl:attribute name="datetime"><xsl:value-of select="pubDate"/></xsl:attribute><xsl:value-of select="pubDate"/></time></xsl:if>
                      <xsl:if test="description"><p><xsl:value-of select="description"/></p></xsl:if>
                    </div>
                  </li>
                </xsl:for-each>
              </xsl:when>
              <xsl:otherwise>
                <xsl:for-each select="/atom:feed/atom:entry">
                  <li class="reader-entry">
                    <div>
                      <h2><a><xsl:attribute name="href"><xsl:value-of select="atom:link[@rel='alternate']/@href | atom:link[not(@rel)]/@href"/></xsl:attribute><xsl:value-of select="atom:title"/></a></h2>
                      <xsl:if test="atom:published"><time><xsl:attribute name="datetime"><xsl:value-of select="atom:published"/></xsl:attribute><xsl:value-of select="atom:published"/></time></xsl:if>
                      <xsl:if test="atom:summary"><p><xsl:value-of select="atom:summary"/></p></xsl:if>
                    </div>
                  </li>
                </xsl:for-each>
              </xsl:otherwise>
            </xsl:choose>
          </ol>
          <footer class="reader-footer">Feed content is also available as machine-readable XML. <a href="/">Return to the site</a>.</footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
