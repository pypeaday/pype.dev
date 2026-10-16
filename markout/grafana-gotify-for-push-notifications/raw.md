---
date: 2025-04-07 10:12:51
templateKey: til
title: Grafana + Gotify for push notifications
published: True
tags:
  - infrastructure
  - homelab
  - tech
  - til

---

It's easy to configure push notifications through Gotify from Grafana by setting up a generic `Webhook` Alerting Contact Point...

The parameters are:

* HTTP Method: POST
* URL: http://<gotify url>/message
* Authentication is done with an app token generated from Gotify, and you put it in `Authorization Header: Credentials` in the Grafana configuration 

[See image](https://dropper.wayl.one/api/file/610b4efb-b4c4-4930-ac63-499d501ba3c3.png)
