---
date: 2025-09-02 17:09:34
templateKey: project
title: Event Details Updates via Notifications as a Service
published: False
tags:
  - projects
  - digital-harbor
---

The idea here might be something like a simple site where people plan events.
Events have managers and subscribers

Managers invite people to an event (or people sign up)
Managers update events

Subscribers subscribe to an event with notifiation preference.
  - they will configure/select how to be notified of the manager's update
  - I would use [[apprise]] for this 100%

## Requirements

1. apprise server
2. CMS with users and roles + a database
  - updates need to POST to apprise
3. notification infrastructure
  - SMS
  - email (requires domain to offer a real service)
    - maybe managers could bring their own email server?
    - no, just make it configurable - people setup the whole thing or they pay me
