---
date: 2022-05-28 13:29:28
templateKey: til
title: arr client config
published: True
tags:
  - homelab
  - tech
  - til

---

TIL that when setting up download clients for
radarr/sonarr/lidarr/readarr/bazarr/prowlarr that you can utilize internal DNS
and instead of hardcoding an IP address of your download client server, can use
just the CNAME record (ie. instead of 172.10.14.13 I can use
transmission.mydomain.com... notice the lact of http(s)://... adding that won't
allow the connection to work/

Furthermore, you can use internal DNS to lookup the domain, not the subdomain,
and expose the port, like `mydomain.com:7878` for sonarr. This was simpler to
maintain because I don't change which ports an application exposes or utilizes
hardly ever, plus I don't need to maintain CNAME records for every service!
