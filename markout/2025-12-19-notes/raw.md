---
date: 2025-12-19 08:03:54
templateKey: dailyNote
title: 2025-12-19 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-12-18-notes]]

## TODO

- santa tracker in home assistant
  - [github repo](https://github.com/chrisefrost/HomeAssistant-Santa-Tracker)
- Consider the [Pushover Docs](https://support.pushover.net/i8-how-much-does-pushover-cost-is-there-a-subscription) for inspiration on notifiq docs as well

Progress on notifiq today in the ways of adding more notification channel
providers. Also working on user onboarding docs - there are many perspectives
to consider.

Opencode absolutely nailing my cloudflare-terraform stuff today, these modules
are getting clean and I'll plan to blog about it once it's done.

- it got stuck with worker proxy stuff, understandable since it requires cloudflare domain knowledge
- josh's site redirects still, it isn't his url so I still need to fix that

- put together a [santa tracker](https://git.paynepride.com/nic/santa-tracker) today

## BUGS

- repoflow bug... when my library is set to private, I can login and push from forgejo with my bot account. if I make the library public, then the push fails from forgejo with 401
