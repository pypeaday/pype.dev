---
date: 2025-07-17 07:38:09
templateKey: til
title: Add yourself to www-data to view your Nextcloud data on the filesystem
published: True
tags:
  - nextcloud
  - til
  - tech
---

I am working on using [[gotify-cli-for-notifying-me-of-nextcloud-uploads]] and
I'll start by running the gotify cli as my user so I'll need to be able to see
the directory in the filesystem that Nextcloud stores the data in.

That folder on disk is owned by `www-data` (see [[nextcloud-permissions-with-zfs-and-ansible-nas]]

Turns out it's my computer and I can do what I want so I just add myself to the
`www-data` group instead of running the `gotify cli` as `root`

# Bonus

You can remove users from groups with `gpasswd -d username groupname`
