---
date: 2025-12-26 05:08:54
templateKey: project
title: Notifiq
published: False
tags:
  - projects
  - notifiq
---

> Note: this began in [[event-details-updates-via-notifications-as-a-service]] and is the first iteration of this idea

## Projects

- [[soonish]]
- [[mindful]]

## Docs

- Consider the [Pushover Docs](https://support.pushover.net/i8-how-much-does-pushover-cost-is-there-a-subscription) for inspiration on notifiq docs as well

## Notes

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

## Frontends

- Use NiceGUI for a default events front end as a toy example to demonstrate notifiq use cases

- Use react for something like pager duty maybe - just to see what kind of things windsurf can do with it

## Competitors

- [zenduty](https://zenduty.com/pricing/)

## Progress

### November 22 2025

- added auto-sub of creator to event (visibility)
  - auto subscription_selector made for autosub:default
  - subscription_selector for event.tag == channel.tag as well
