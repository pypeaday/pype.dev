---
date: 2025-11-11 05:02:37
templateKey: blog-post
title: Speakr For Recording and Transcribing at Home
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251006105246_8accdc76.png"
tags:
  - speakr
  - tech
---

I have been using Whisper-WebUI for several months in my homelab to record and
transcribe myself thinking out loud. It's been great. Then I came across
[speakr](https://github.com/murtaza-nasir/speakr) which is like that but more
feature rich in what I wanted out of the WebUI. Specifically I get a nicer UI
with transcriptions, a chat window, built-in summarization, and diarization
support (WebUI has this too but it's a little nicer in Speakr in my opinion).

## Pic

![20250824120404_da722d66.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250824120404_da722d66.png)

The UI is a little busy but handy for what I'm after in the mornings or when
I'm trying to mind-dump somewhere I can conveniently explore later.

## Speaker Identification

Requires HuggingFace Token to pull the models that perform [Speaker
diarisation](https://en.wikipedia.org/wiki/Speaker_diarisation) - ie.
identifying different speakers

Here's an example from an episode of Hybrid Cloud Show.

![20250826124040_48c8d2ce.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250826124040_48c8d2ce.png)
