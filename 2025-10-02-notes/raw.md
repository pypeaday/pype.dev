---
date: 2025-10-02 06:28:55
templateKey: dailyNote
title: 2025-10-02 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-10-01-notes]]

## Random Thoughts

I was thinking it might be nice on my blog to have a couple facelifts:

- my daily notes always have the `yesterday: [...]` text in the description, which ain't pretty, so thinking about a nicer description or a thoughts-like template for dailyNotes maybe
- I also was thinking a nice cover image for daily notes would look good on the web, but would largely be yak-shaving... maybe 20 minutes of yak shaving never hurt anyone though

- I had a dope-y moment today... My vibe-coded weather app [[dad-can-i-wear-this]] uses ollama on the backend.... OR DOES IT!
  - seriously I feel so stupid... I made a model via open-webui to be specific for dad-can-i-wear-this but the python code just calls ollama so depending on my env variable I was either getting the hard-coded responses back or else ollama from a different default model (too much dev workflows to outline here for now)...
  - point is, I'm using open-webui as my LLM provider, and idk what it is but something had to click into place about where that fits with the doofy things I want to build at home
  - So [[dad-can-i-wear-this]] got another face lift
  - I should get this into forgejo and then I can deploy it like [[docker-compose-build-from-git-repo]] just for funsies
