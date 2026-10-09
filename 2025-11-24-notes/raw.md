---
date: 2025-11-24 05:15:33
templateKey: dailyNote
title: 2025-11-24 Notes
published: True
tags:
  - daily-note
---

yesterday: [[2025-11-23-notes]]

## Development

- EOY is a good time to revisit the dots

  - I have several old neovim plugins I've tried that can go
  - TIL I have `<leader>cs` to bring up a symbol outline, totally forgot about it

- reminder: zensical for homelab-mono docs and dotfiles docs

### Soonish

Temporal is great... idk what my issue is but maybe something about async
sqlite is finicky cause I'm having some kind of race condition that I can not
localize... but temporal makes it easy for me to retry the things I need to...
here's what I mean:

```python
details = None
while details is None:
    details = await workflow.execute_activity(
        get_event_details,
        event_id,
        start_to_close_timeout=timedelta(seconds=30),
        retry_policy=RetryPolicy(
        backoff_coefficient=2.0,
        maximum_attempts=5,
        initial_interval=timedelta(seconds=1),
        maximum_interval=timedelta(seconds=2)
        )
    )
```

At the beginning of my Workflow.run I need some details from a record in a
database. I **know** that record exists because this workflow gets ran by the
function that makes the record and I see it in the backend.... but sometimes
this query was coming back `None`... Temporal makes doing this simple `while`
loop super easy with builtin retry logic

NOTE: I'm not sure yet if I need to handle the otherwise infinite loop
possibility...
