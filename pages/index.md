---
date: 2022-09-01 1:00:00
title: Welcome to my mental data lake!
# Don't put this page in a feed
published: False
tags:
  - homepage
  - meta
---

<head>
    <meta name="generator" content="HTML Tidy for HTML5 for Linux version 5.2.0" />
    <title>Welcome!</title>
</head>

!!! index-welcome ""

    I write about things I find find interesting in tech and theology

    Let's connect: 🌱  My [littlelink](https://pypeaday.github.io/littlelink/) is the place to find the places to find me 🤓

## Some of my favorite pages

{% for post in markata.map('post', sort='date', filter='post.get("published", False)==True and date<=today and "homepage" in post.get("tags", [])', reverse=False) %}
!!! note "[{{ post['title'] }}]({{ post['slug'] }})"

    {{post['description']}}... _[read more]({{ post['slug'] }})_

{% endfor %}

## Recent posts

{% for post in markata.map('post', sort='date', filter='post.get("published", False)==True and date<=today', reverse=True)[:4] %}
!!! note "[{{ post['title'] }}]({{ post['slug'] }})"

    {{post['description']}}... _[read more]({{ post['slug'] }})_

{% endfor %}

## Feeds

TODO: The clickable part of these a tags is TINY - need to talk with Waylon about why

- <a href="/all"></a> All posts
- <a href="/archive"></a> Published sorted by new
- <a href="/bible-project"></a> Bible Project
