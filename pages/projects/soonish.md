---
date: 2025-09-13 06:01:24
templateKey: project
title: Soonish
published: False
tags:
  - projects
  - soonish
  - notifiq
---

> Note: this began in [[event-details-updates-via-notifications-as-a-service]] and is the first iteration of this idea

## Use Cases

- Event Details and updates
- IT ticketing system
- Volunteer reminder system

## Requirements

1. apprise server/library
2. CMS with users and roles + a database

- updates need to POST to apprise

3. notification backbone

- SMS
- email (requires domain to offer a real service)
  - maybe managers could bring their own email server?
  - no, just make it configurable - people setup the whole thing or they pay me

4. infra

- Temporal instead of webserver patterns may lead to easier scaling

## Drafting

- Been working in Windsurf with gpt-5 mostly on outlining the requirements for soonish
- My immediate goal is to have very detailed specs for the project to best utilize AI while building it without allowing the AI to drive any meaningful aspect of the development

## Ideas

- WorkOS for auth for B2B for soonish
- remind.notifiq.net/<url> as a usecase for soonish
  - configured reading times, so just get reminded at the next one
  - phase 2 of this idea might be grabbing the content of the url and sending the notification with some of that content

## Message Priority

- Events should have a priority of some kind so that business hours can be considered easily
- Should channels have similar types of preferences? I suppose I need to think about the different user flows
  - automated event makes critical ticket outside business hours - force update subscribers based on.... whatever they're subscribed with/desired channels
  - event update is critical - all subscribers need to know on their desired channels
  - those above 2 are the same
  - event update is not critical - do the signal to everyone but channels take into consideration that it's info only, so respect a business hours/quiet hours and notify during appropriate time.
