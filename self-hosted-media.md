---
article_html: "<p>Self-hosting 1 or several media servers is another common homelab
  use-case.\nGetting content for your media servers is up to you, but I'll show a
  few ways here to get content somewhat easily!</p>\n<p><strong>YouTube Disclaimer
  at Bottom</strong></p>\n<h2 id=\"you-get\">you-get</h2>\n<p><code>you-get</code>
  is a nice cli for grabbing media content off the web. </p>\n<h3 id=\"installation\">Installation</h3>\n<p><code>pip
  install you-get</code> or use ad-hoc with <code>pipx run you-get &lt;url&gt;</code></p>\n<h3
  id=\"usage\">Usage</h3>\n<p>For example if I wanted to catch up on ancient Chinese
  military tactics I may go for <code>The Art of War</code> off the Internet Archive...</p>\n<div
  class=\"highlight\"><pre><span></span><code>sandbox<span class=\"w\">  </span>\U0001F331<span
  class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1️<span class=\"w\">
  \ </span>×3\U0001F6E4️<span class=\"w\">  </span>×6via<span class=\"w\"> </span>\U0001F40D<span
  class=\"w\"> </span>v3.8.11<span class=\"w\"> </span><span class=\"o\">(</span>sandbox<span
  class=\"o\">)</span><span class=\"w\">  </span>took<span class=\"w\"> </span>15s\n❯<span
  class=\"w\"> </span>you-get<span class=\"w\"> </span>https://archive.org/details/art_of_war_librivox<span
  class=\"w\"> </span>-i\nSite:<span class=\"w\">       </span>Archive.org\nTitle:<span
  class=\"w\">      </span>The<span class=\"w\"> </span>Art<span class=\"w\"> </span>of<span
  class=\"w\"> </span>War<span class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span
  class=\"w\"> </span>Tzu<span class=\"w\"> </span>:<span class=\"w\"> </span>Free<span
  class=\"w\"> </span>Download,<span class=\"w\"> </span>Borrow,<span class=\"w\">
  </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span class=\"w\">
  </span>Internet<span class=\"w\"> </span>Archive\nType:<span class=\"w\">       </span>MP3<span
  class=\"w\"> </span><span class=\"o\">(</span>audio/mpeg<span class=\"o\">)</span>\nSize:<span
  class=\"w\">       </span><span class=\"m\">3</span>.87<span class=\"w\"> </span>MiB<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">4055167</span><span
  class=\"w\"> </span>Bytes<span class=\"o\">)</span>\n</code></pre></div>\n<p>the
  <code>-i</code> is showing me the info of what would be downloaded without the flag
  (it's like a dry run)</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\">
  </span>\U0001F5D1️<span class=\"w\">  </span>×3\U0001F6E4️<span class=\"w\">  </span>×6via<span
  class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
  </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n❯<span class=\"w\">
  </span>you-get<span class=\"w\"> </span>https://archive.org/details/art_of_war_librivox\nSite:<span
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
  </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span class=\"w\">
  </span>Internet<span class=\"w\"> </span>Archi.mp3<span class=\"w\"> </span>...\n<span
  class=\"w\"> </span><span class=\"m\">100</span>%<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"w\">  </span><span class=\"m\">3</span>.9/<span
  class=\"w\">  </span><span class=\"m\">3</span>.9MB<span class=\"o\">)</span><span
  class=\"w\"> </span>├████████████████████████████████████████████████████████████┤<span
  class=\"o\">[</span><span class=\"m\">1</span>/1<span class=\"o\">]</span><span
  class=\"w\">  </span><span class=\"m\">917</span><span class=\"w\"> </span>kB/s\n</code></pre></div>\n<p>Now
  I can toss that mp3 onto my <code>booksonic</code> server and study for world domination
  while I do the dishes!</p>\n<h2 id=\"pytube\">pytube</h2>\n<p><code>pytube</code>
  is a python implementation of a <a href=\"##YouTube\">youtube downloader </a> that
  works at the command line or in python!</p>\n<h3 id=\"installation_1\">Installation</h3>\n<p><a
  href=\"https://pytube.io/en/latest/\">docs</a></p>\n<p><code>pip install pytube</code></p>\n<h3
  id=\"usage_1\">Usage</h3>\n<p><code>pytube</code> has a lot of functionality, but
  a quick one would be the <code>--list</code> so you can see what qualities are available</p>\n<div
  class=\"highlight\"><pre><span></span><code>sandbox<span class=\"w\">   </span>main<span
  class=\"w\"> </span>️<span class=\"w\">  </span>×3️<span class=\"w\">  </span>×7via<span
  class=\"w\">  </span>v3.8.11<span class=\"w\"> </span><span class=\"o\">(</span>sandbox<span
  class=\"o\">)</span><span class=\"w\">  </span>took<span class=\"w\"> </span>2m49s\n❯<span
  class=\"w\"> </span>pytube<span class=\"w\"> </span>https://www.youtube.com/watch<span
  class=\"se\">\\?</span>v<span class=\"se\">\\=</span>LDU_Txk06tM<span class=\"w\">
  \ </span>--list\nLoading<span class=\"w\"> </span>video...\n&lt;Stream:<span class=\"w\">
  </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;17&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/3gpp&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;8fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;mp4v.20.3&quot;</span><span class=\"w\"> </span><span class=\"nv\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;18&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.42001E&quot;</span><span class=\"w\"> </span><span class=\"nv\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;22&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.64001F&quot;</span><span class=\"w\"> </span><span class=\"nv\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;313&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;401&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;271&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;400&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;137&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.640028&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;248&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;399&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;av01.0.08M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;136&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;247&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;398&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.05M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;135&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;244&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;397&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;av01.0.04M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;134&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401e&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;243&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;396&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.01M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;133&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.4d4015&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;242&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;395&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;160&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d400c&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;278&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;394&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;139&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;audio/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">abr</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;48kbps&quot;</span><span class=\"w\">
  </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.5&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span><span class=\"w\"> </span><span class=\"nv\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
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
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n</code></pre></div>\n<p><code>pytube
  &lt;url&gt; --itag &lt;&gt;</code> will download the specific <code>itag</code>
  from the list.</p>\n<p>Notice that some <code>itags</code> are videos and others
  audio - so you can download just the music of a YT video.</p>\n<p><code>pytube</code>
  also works in python...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"err\">↪</span> <span class=\"n\">main</span>
  <span class=\"n\">v3</span><span class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"kn\">from</span> <span class=\"nn\">pytube</span>
  <span class=\"kn\">import</span> <span class=\"n\">YouTube</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"err\">↪</span> <span class=\"n\">main</span> <span class=\"n\">v3</span><span
  class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"p\">[</span><span class=\"n\">x</span> <span class=\"k\">for</span>
  <span class=\"n\">x</span> <span class=\"ow\">in</span> <span class=\"n\">YouTube</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;https://www.youtube.com/watch?v=LDU_Txk06tM&quot;</span><span
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
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;401&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.12M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;271&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
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
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;399&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.08M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;136&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;247&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;398&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.05M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;135&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;244&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;397&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.04M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;134&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401e&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;243&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;396&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.01M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;133&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d4015&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;242&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;395&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;160&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d400c&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;278&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;394&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;139&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;audio/mp4&quot;</span> <span class=\"n\">abr</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;48kbps&quot;</span> <span class=\"n\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.5&quot;</span> <span class=\"n\">progressive</span><span
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
  class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;250&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span>
  <span class=\"n\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;70kbps&quot;</span>
  <span class=\"n\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;opus&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;251&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;160kbps&quot;</span> <span class=\"n\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span>\n<span
  class=\"p\">]</span>\n</code></pre></div>\n<h2 id=\"youtube-frontends\">YouTube
  Frontends</h2>\n<p>There's 2 really good options for self-hosting a YT front-end...</p>\n<p><a
  href=\"https://github.com/bbilly1/tubearchivist\">Tube Archivist</a></p>\n<p><a
  href=\"https://github.com/Tzahi12345/YoutubeDL-Material\">YouTubeDL-Material</a></p>\n<p>They
  have their pros and cons.\nYou can also build yourself with the above utilities
  and use Plex or Jellyfin to serve up videos...</p>\n<p><strong>Your self-hosting
  journey is up to you!</strong></p>\n<h2 id=\"youtube\">YouTube</h2>\n<p>Downloading
  YouTube videos is a bit of a sore topic... Mainly you don't to hurt creators who
  rely on YT ad revenue for their livlihood.</p>\n<p>Then again, maybe you're a vigilante
  who knows that YT also monetizes videos for their <em>own</em> gain and that the
  creators don't see that money either!</p>\n<p>The solution is pretty easy and is
  2-fold...</p>\n<ol>\n<li>Download YT videos</li>\n<li>Personally support the content
  creators you follow via paypall, patreon, or whatever else they might have set-up....
  even a buck or two a month is more than they'd get from your ad revenue explicitly
  plus it all goes to them!</li>\n</ol>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
  \   :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/starship'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Starship</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/truenas-and-wireguard'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Truenas-And-Wireguard</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
cover: /static/self-hosted-media.png
date: 2022-03-24
datetime: 2022-03-24 00:00:00+00:00
description: Self-hosting 1 or several media servers is another common homelab use-case.
  you-get pip install you-get For example if I wanted to catch up on ancient Chinese
  m
edit_link: https://github.com/edit/main/pages/blog/self-hosted-media.md
html: "<p>Self-hosting 1 or several media servers is another common homelab use-case.\nGetting
  content for your media servers is up to you, but I'll show a few ways here to get
  content somewhat easily!</p>\n<p><strong>YouTube Disclaimer at Bottom</strong></p>\n<h2
  id=\"you-get\">you-get</h2>\n<p><code>you-get</code> is a nice cli for grabbing
  media content off the web. </p>\n<h3 id=\"installation\">Installation</h3>\n<p><code>pip
  install you-get</code> or use ad-hoc with <code>pipx run you-get &lt;url&gt;</code></p>\n<h3
  id=\"usage\">Usage</h3>\n<p>For example if I wanted to catch up on ancient Chinese
  military tactics I may go for <code>The Art of War</code> off the Internet Archive...</p>\n<div
  class=\"highlight\"><pre><span></span><code>sandbox<span class=\"w\">  </span>\U0001F331<span
  class=\"w\"> </span>main<span class=\"w\"> </span>\U0001F5D1️<span class=\"w\">
  \ </span>×3\U0001F6E4️<span class=\"w\">  </span>×6via<span class=\"w\"> </span>\U0001F40D<span
  class=\"w\"> </span>v3.8.11<span class=\"w\"> </span><span class=\"o\">(</span>sandbox<span
  class=\"o\">)</span><span class=\"w\">  </span>took<span class=\"w\"> </span>15s\n❯<span
  class=\"w\"> </span>you-get<span class=\"w\"> </span>https://archive.org/details/art_of_war_librivox<span
  class=\"w\"> </span>-i\nSite:<span class=\"w\">       </span>Archive.org\nTitle:<span
  class=\"w\">      </span>The<span class=\"w\"> </span>Art<span class=\"w\"> </span>of<span
  class=\"w\"> </span>War<span class=\"w\"> </span>:<span class=\"w\"> </span>Sun<span
  class=\"w\"> </span>Tzu<span class=\"w\"> </span>:<span class=\"w\"> </span>Free<span
  class=\"w\"> </span>Download,<span class=\"w\"> </span>Borrow,<span class=\"w\">
  </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span class=\"w\">
  </span>Internet<span class=\"w\"> </span>Archive\nType:<span class=\"w\">       </span>MP3<span
  class=\"w\"> </span><span class=\"o\">(</span>audio/mpeg<span class=\"o\">)</span>\nSize:<span
  class=\"w\">       </span><span class=\"m\">3</span>.87<span class=\"w\"> </span>MiB<span
  class=\"w\"> </span><span class=\"o\">(</span><span class=\"m\">4055167</span><span
  class=\"w\"> </span>Bytes<span class=\"o\">)</span>\n</code></pre></div>\n<p>the
  <code>-i</code> is showing me the info of what would be downloaded without the flag
  (it's like a dry run)</p>\n<div class=\"highlight\"><pre><span></span><code>sandbox<span
  class=\"w\">  </span>\U0001F331<span class=\"w\"> </span>main<span class=\"w\">
  </span>\U0001F5D1️<span class=\"w\">  </span>×3\U0001F6E4️<span class=\"w\">  </span>×6via<span
  class=\"w\"> </span>\U0001F40D<span class=\"w\"> </span>v3.8.11<span class=\"w\">
  </span><span class=\"o\">(</span>sandbox<span class=\"o\">)</span>\n❯<span class=\"w\">
  </span>you-get<span class=\"w\"> </span>https://archive.org/details/art_of_war_librivox\nSite:<span
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
  </span>and<span class=\"w\"> </span>Streaming<span class=\"w\"> </span>:<span class=\"w\">
  </span>Internet<span class=\"w\"> </span>Archi.mp3<span class=\"w\"> </span>...\n<span
  class=\"w\"> </span><span class=\"m\">100</span>%<span class=\"w\"> </span><span
  class=\"o\">(</span><span class=\"w\">  </span><span class=\"m\">3</span>.9/<span
  class=\"w\">  </span><span class=\"m\">3</span>.9MB<span class=\"o\">)</span><span
  class=\"w\"> </span>├████████████████████████████████████████████████████████████┤<span
  class=\"o\">[</span><span class=\"m\">1</span>/1<span class=\"o\">]</span><span
  class=\"w\">  </span><span class=\"m\">917</span><span class=\"w\"> </span>kB/s\n</code></pre></div>\n<p>Now
  I can toss that mp3 onto my <code>booksonic</code> server and study for world domination
  while I do the dishes!</p>\n<h2 id=\"pytube\">pytube</h2>\n<p><code>pytube</code>
  is a python implementation of a <a href=\"##YouTube\">youtube downloader </a> that
  works at the command line or in python!</p>\n<h3 id=\"installation_1\">Installation</h3>\n<p><a
  href=\"https://pytube.io/en/latest/\">docs</a></p>\n<p><code>pip install pytube</code></p>\n<h3
  id=\"usage_1\">Usage</h3>\n<p><code>pytube</code> has a lot of functionality, but
  a quick one would be the <code>--list</code> so you can see what qualities are available</p>\n<div
  class=\"highlight\"><pre><span></span><code>sandbox<span class=\"w\">   </span>main<span
  class=\"w\"> </span>️<span class=\"w\">  </span>×3️<span class=\"w\">  </span>×7via<span
  class=\"w\">  </span>v3.8.11<span class=\"w\"> </span><span class=\"o\">(</span>sandbox<span
  class=\"o\">)</span><span class=\"w\">  </span>took<span class=\"w\"> </span>2m49s\n❯<span
  class=\"w\"> </span>pytube<span class=\"w\"> </span>https://www.youtube.com/watch<span
  class=\"se\">\\?</span>v<span class=\"se\">\\=</span>LDU_Txk06tM<span class=\"w\">
  \ </span>--list\nLoading<span class=\"w\"> </span>video...\n&lt;Stream:<span class=\"w\">
  </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;17&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/3gpp&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;8fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;mp4v.20.3&quot;</span><span class=\"w\"> </span><span class=\"nv\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;18&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.42001E&quot;</span><span class=\"w\"> </span><span class=\"nv\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;22&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.64001F&quot;</span><span class=\"w\"> </span><span class=\"nv\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.2&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;True&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;313&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;401&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;271&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;400&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.12M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;137&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.640028&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;248&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;399&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;av01.0.08M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;136&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;247&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;398&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.05M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;135&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.4d401f&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;244&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;397&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;av01.0.04M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;134&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401e&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;243&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;396&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.01M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;133&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;avc1.4d4015&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;242&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;395&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;160&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d400c&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;278&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span><span class=\"w\"> </span><span class=\"nv\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span class=\"w\">
  </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span><span class=\"w\"> </span><span class=\"nv\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span class=\"w\">
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span
  class=\"w\"> </span><span class=\"nv\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;394&quot;</span><span class=\"w\"> </span><span class=\"nv\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span><span class=\"w\">
  </span><span class=\"nv\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span><span class=\"w\"> </span><span class=\"nv\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span><span class=\"w\">
  </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span>&gt;\n&lt;Stream:<span class=\"w\"> </span><span
  class=\"nv\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;139&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;audio/mp4&quot;</span><span class=\"w\"> </span><span class=\"nv\">abr</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;48kbps&quot;</span><span class=\"w\">
  </span><span class=\"nv\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.5&quot;</span><span
  class=\"w\"> </span><span class=\"nv\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span><span class=\"w\"> </span><span class=\"nv\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n&lt;Stream:<span
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
  </span><span class=\"nv\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span>&gt;\n</code></pre></div>\n<p><code>pytube
  &lt;url&gt; --itag &lt;&gt;</code> will download the specific <code>itag</code>
  from the list.</p>\n<p>Notice that some <code>itags</code> are videos and others
  audio - so you can download just the music of a YT video.</p>\n<p><code>pytube</code>
  also works in python...</p>\n<div class=\"highlight\"><pre><span></span><code><span
  class=\"n\">sandbox</span> <span class=\"err\">↪</span> <span class=\"n\">main</span>
  <span class=\"n\">v3</span><span class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span
  class=\"err\">❯</span> <span class=\"kn\">from</span> <span class=\"nn\">pytube</span>
  <span class=\"kn\">import</span> <span class=\"n\">YouTube</span>\n\n<span class=\"n\">sandbox</span>
  <span class=\"err\">↪</span> <span class=\"n\">main</span> <span class=\"n\">v3</span><span
  class=\"mf\">.8.11</span> <span class=\"n\">ipython</span>\n<span class=\"err\">❯</span>
  <span class=\"p\">[</span><span class=\"n\">x</span> <span class=\"k\">for</span>
  <span class=\"n\">x</span> <span class=\"ow\">in</span> <span class=\"n\">YouTube</span><span
  class=\"p\">(</span><span class=\"s2\">&quot;https://www.youtube.com/watch?v=LDU_Txk06tM&quot;</span><span
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
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;401&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;2160p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.12M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;271&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;1440p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span
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
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;399&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;1080p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.08M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;136&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;247&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;720p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;398&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;720p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.05M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;135&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401f&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;244&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;480p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;397&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;480p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.04M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;134&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d401e&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;243&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;360p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;396&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;360p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.01M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;133&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d4015&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;242&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;240p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;395&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;240p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;160&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span> <span class=\"n\">res</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;avc1.4d400c&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span
  class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span
  class=\"p\">:</span> <span class=\"n\">itag</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;278&quot;</span> <span class=\"n\">mime_type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video/webm&quot;</span> <span class=\"n\">res</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;144p&quot;</span> <span class=\"n\">fps</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;30fps&quot;</span> <span class=\"n\">vcodec</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;vp9&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;video&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;394&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video/mp4&quot;</span>
  <span class=\"n\">res</span><span class=\"o\">=</span><span class=\"s2\">&quot;144p&quot;</span>
  <span class=\"n\">fps</span><span class=\"o\">=</span><span class=\"s2\">&quot;30fps&quot;</span>
  <span class=\"n\">vcodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;av01.0.00M.08&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;video&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;139&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;audio/mp4&quot;</span> <span class=\"n\">abr</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;48kbps&quot;</span> <span class=\"n\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;mp4a.40.5&quot;</span> <span class=\"n\">progressive</span><span
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
  class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span class=\"o\">=</span><span
  class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span><span class=\"p\">,</span>\n
  \   <span class=\"o\">&lt;</span><span class=\"n\">Stream</span><span class=\"p\">:</span>
  <span class=\"n\">itag</span><span class=\"o\">=</span><span class=\"s2\">&quot;250&quot;</span>
  <span class=\"n\">mime_type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span>
  <span class=\"n\">abr</span><span class=\"o\">=</span><span class=\"s2\">&quot;70kbps&quot;</span>
  <span class=\"n\">acodec</span><span class=\"o\">=</span><span class=\"s2\">&quot;opus&quot;</span>
  <span class=\"n\">progressive</span><span class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span>
  <span class=\"nb\">type</span><span class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span
  class=\"o\">&gt;</span><span class=\"p\">,</span>\n    <span class=\"o\">&lt;</span><span
  class=\"n\">Stream</span><span class=\"p\">:</span> <span class=\"n\">itag</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;251&quot;</span> <span class=\"n\">mime_type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;audio/webm&quot;</span> <span class=\"n\">abr</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;160kbps&quot;</span> <span class=\"n\">acodec</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;opus&quot;</span> <span class=\"n\">progressive</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;False&quot;</span> <span class=\"nb\">type</span><span
  class=\"o\">=</span><span class=\"s2\">&quot;audio&quot;</span><span class=\"o\">&gt;</span>\n<span
  class=\"p\">]</span>\n</code></pre></div>\n<h2 id=\"youtube-frontends\">YouTube
  Frontends</h2>\n<p>There's 2 really good options for self-hosting a YT front-end...</p>\n<p><a
  href=\"https://github.com/bbilly1/tubearchivist\">Tube Archivist</a></p>\n<p><a
  href=\"https://github.com/Tzahi12345/YoutubeDL-Material\">YouTubeDL-Material</a></p>\n<p>They
  have their pros and cons.\nYou can also build yourself with the above utilities
  and use Plex or Jellyfin to serve up videos...</p>\n<p><strong>Your self-hosting
  journey is up to you!</strong></p>\n<h2 id=\"youtube\">YouTube</h2>\n<p>Downloading
  YouTube videos is a bit of a sore topic... Mainly you don't to hurt creators who
  rely on YT ad revenue for their livlihood.</p>\n<p>Then again, maybe you're a vigilante
  who knows that YT also monetizes videos for their <em>own</em> gain and that the
  creators don't see that money either!</p>\n<p>The solution is pretty easy and is
  2-fold...</p>\n<ol>\n<li>Download YT videos</li>\n<li>Personally support the content
  creators you follow via paypall, patreon, or whatever else they might have set-up....
  even a buck or two a month is more than they'd get from your ad revenue explicitly
  plus it all goes to them!</li>\n</ol>\n<div class='prevnext'>\n\n    <style type='text/css'>\n\n
  \   :root {\n      --prevnext-color-text: #d8ebe6;\n      --prevnext-color-angle:
  #83dcc8cc;\n      --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"light\"]
  {\n      --prevnext-color-text: #1f2022;\n      --prevnext-color-angle: #ffeb00;\n
  \     --prevnext-subtitle-brightness: 3;\n    }\n    [data-theme=\"dark\"] {\n      --prevnext-color-text:
  #d8ebe6;\n      --prevnext-color-angle: #83dcc8cc;\n      --prevnext-subtitle-brightness:
  3;\n    }\n    .prevnext {\n      display: flex;\n      flex-direction: row;\n      justify-content:
  space-around;\n      align-items: flex-start;\n    }\n    .prevnext a {\n      display:
  flex;\n      align-items: center;\n      width: 100%;\n      text-decoration: none;\n
  \   }\n    a.next {\n      justify-content: flex-end;\n    }\n    .prevnext a:hover
  {\n      background: #00000006;\n    }\n    .prevnext-subtitle {\n      color: var(--prevnext-color-text);\n
  \     filter: brightness(var(--prevnext-subtitle-brightness));\n      font-size:
  .8rem;\n    }\n    .prevnext-title {\n      color: var(--prevnext-color-text);\n
  \     font-size: 1rem;\n    }\n    .prevnext-text {\n      max-width: 30vw;\n    }\n
  \   </style>\n\n    <a class='prev' href='/starship'>\n\n\n        <svg width=\"50px\"
  height=\"50px\" viewbox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n
  \           <path d=\"M13.5 8.25L9.75 12L13.5 15.75\" stroke=\"var(--prevnext-color-angle)\"
  stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> </path>\n
  \       </svg>\n        <div class='prevnext-text'>\n            <p class='prevnext-subtitle'>prev</p>\n
  \           <p class='prevnext-title'>Starship</p>\n        </div>\n    </a>\n\n
  \   <a class='next' href='/truenas-and-wireguard'>\n\n        <div class='prevnext-text'>\n
  \           <p class='prevnext-subtitle'>next</p>\n            <p class='prevnext-title'>Truenas-And-Wireguard</p>\n
  \       </div>\n        <svg width=\"50px\" height=\"50px\" viewbox=\"0 0 24 24\"
  fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M10.5
  15.75L14.25 12L10.5 8.25\" stroke=\"var(--prevnext-color-angle)\" stroke-width=\"1.5\"
  stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n        </svg>\n    </a>\n
  \ </div>"
jinja: false
long_description: Self-hosting 1 or several media servers is another common homelab
  use-case. you-get pip install you-get For example if I wanted to catch up on ancient
  Chinese military tactics I may go for  the  Now I can toss that mp3 onto my  pytube
  pip install pyt
now: 2024-10-12 11:09:11.872422
path: pages/blog/self-hosted-media.md
published: true
slug: self-hosted-media
super_description: Self-hosting 1 or several media servers is another common homelab
  use-case. you-get pip install you-get For example if I wanted to catch up on ancient
  Chinese military tactics I may go for  the  Now I can toss that mp3 onto my  pytube
  pip install pytube pytube pytube <url> --itag <> Notice that some  pytube There
  They have their pros and cons. Downloading YouTube videos is a bit of a sore topic...
  Mainly you don Then again, maybe you The solution is pretty easy and is 2-fold...
  Download YT video
tags:
- python
- homelab
- tech
templateKey: blog-post
title: self-hosted-media
today: 2024-10-12
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
<div class='prevnext'>

    <style type='text/css'>

    :root {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="light"] {
      --prevnext-color-text: #1f2022;
      --prevnext-color-angle: #ffeb00;
      --prevnext-subtitle-brightness: 3;
    }
    [data-theme="dark"] {
      --prevnext-color-text: #d8ebe6;
      --prevnext-color-angle: #83dcc8cc;
      --prevnext-subtitle-brightness: 3;
    }
    .prevnext {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }
    .prevnext a {
      display: flex;
      align-items: center;
      width: 100%;
      text-decoration: none;
    }
    a.next {
      justify-content: flex-end;
    }
    .prevnext a:hover {
      background: #00000006;
    }
    .prevnext-subtitle {
      color: var(--prevnext-color-text);
      filter: brightness(var(--prevnext-subtitle-brightness));
      font-size: .8rem;
    }
    .prevnext-title {
      color: var(--prevnext-color-text);
      font-size: 1rem;
    }
    .prevnext-text {
      max-width: 30vw;
    }
    </style>
    
    <a class='prev' href='/starship'>
    

        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 8.25L9.75 12L13.5 15.75" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> </path>
        </svg>
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>prev</p>
            <p class='prevnext-title'>Starship</p>
        </div>
    </a>
    
    <a class='next' href='/truenas-and-wireguard'>
    
        <div class='prevnext-text'>
            <p class='prevnext-subtitle'>next</p>
            <p class='prevnext-title'>Truenas-And-Wireguard</p>
        </div>
        <svg width="50px" height="50px" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 15.75L14.25 12L10.5 8.25" stroke="var(--prevnext-color-angle)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
  </div>