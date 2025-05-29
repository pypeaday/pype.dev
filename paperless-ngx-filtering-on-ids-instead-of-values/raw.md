---
date: 2022-08-09 08:28:51
templateKey: til
title: Paperless-NGX filtering on IDs instead of values
published: True
tags:
  - homelab
  - tech

---

To filter for saved views from the admin console you have to use the `id` of
the tag you are using to filter on...

Ex: filtering for tags "Inbox" doesn't work, but for tag 18 does (the id fo the
Inbox tag). I can find that ID by clicking on the tag and looking at the url
bar
