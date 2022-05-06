---
templateKey: blog-post
tags: ['python', 'homelab']
title: self-hosted-media
date: 2022-03-24T00:00:00
status: published
cover: "/static/self-hosted-media.png"

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


