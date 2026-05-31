---
date: 2025-10-08 10:21:01
templateKey: til
title: Use Jellyfin Tags For Content Moderation
published: True
tags:
  - jellyfin
  - til
  - tech
---

Jellyfin brings in ratings and allows you to set custom ratings for shows,
which is nice for things like "block anything worse than TV-14 for my kid's
account". But what if my firend's kids can watch shows I don't want my kids
watching? Turns out tags exist and are great!

## Tag the content

First is to actually tag the content - in the UI it's simple.

1. Login with admin
2. Manage Metadata
3. Click the content you want to tag and find the `Tags` section
4. Add your tag... for example `blocked:girls`

## Filter on the account

1. Go to `Dashboard` -> `Users` -> `Library Access` -> `Parental Control` -> `Block items with tags`
