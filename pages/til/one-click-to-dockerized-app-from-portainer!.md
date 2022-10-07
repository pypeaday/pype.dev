---
date: 2022-05-24 07:15:55
templateKey: til
title: One click to dockerized app from Portainer!
published: False
tags:
  - homelab
  - homelab

---

I use portainer to monitor my docker applications at home. I like that it shows me which ports are mapped where for every container all in one view but every time I click on a port (assuming it'll take me to that application via LAN) it goes to 0.0.0.0:<port>... I thought the solution was to set the host ip in each of my docker apps but portainer makes it easy! Just set the Public IP for any given environment and portainer does the redirecting for you!
