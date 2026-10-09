---
date: 2022-12-28 21:01:52
templateKey: blog-post
title: Modal Labs
published: False
tags:
  - python
  - cli
  - tech

---

Playing around with Modal Labs


One of the first things I tried was a regular cron job...

```python
@stub.function(
    schedule=modal.Period(minutes=59), secret=modal.Secret.from_name("my-dummy-secret")
)
def say_hi():
    now = time.ctime()
    secret = os.environ.get("dummy-secret")
    print(f"Hello {os.environ.get('USER', 'Rodney')} at {now}")
    print(f"{secret=}")

```

This can get deployed with `modal deploy --name <app name> <path to .py file with the stub and function defined in it> `

This function gets deployed as an app that I conveniently call `say_hi` (as far
as I can tell the app name can be anything - as I add functions to this same
app and deploy with the same name to get a new version)

Notice that this also is an example of giving access to a secret - defined in the Modal Labs dashboard

We can take a look at the apps running at [https://modal.com/apps](https://modal.com/apps)

I then added another function to experiment with custom container images and
saw then that Modal will just slap a new version on anything provisioned with
the same name (intuitive enough for sure) so when I add functions to my .py
script and run `modal deploy --name say_hi myscript.py` over and over, the app
called `say_hi` in the Modal apps dashboard just gets a new version

This means I can spin up several instances of functionally the same app but with different names/versions etc... 
Q: Maybe there's gitops or policy stuff builtin to app names then?

I needed to take down an app I deployed as a duplicate but you don't stop apps
by name, you stop them by an id... see below


```console

modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)
✗ modal app stop --help

 Usage: modal app stop [OPTIONS] APP_ID

 Stop an app.

╭─ Arguments ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ *    app_id      TEXT  [default: None] [required]                                                                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ --help          Show this message and exit.                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯


modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)
❯ modal app list
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ App ID                    ┃ Description         ┃ State    ┃ Creation time             ┃ Stop time                 ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ ap-lzy1AAuVy7POFkUcDKRxpQ │ print_info          │ deployed │ 2022-12-28 20:59:07-06:00 │                           │
│ ap-qYjE45dciqgT3C3CpNp3RL │ say_hi              │ deployed │ 2022-12-28 19:49:22-06:00 │                           │
│ ap-X7FYneUeYV5IKHcyirSb87 │ link-scraper        │ stopped  │ 2022-12-28 15:39:02-06:00 │ 2022-12-28 15:39:04-06:00 │
│ ap-UOXTUU4uSRx2UZypJOcAsk │ example-get-started │ stopped  │ 2022-12-28 15:17:47-06:00 │ 2022-12-28 15:17:49-06:00 │
└───────────────────────────┴─────────────────────┴──────────┴───────────────────────────┴───────────────────────────┘

modal-sandbox/modal_sandbox   main   ×1  ×9 via   v3.10.6(modal-sandbox)
❯ modal app stop ap-lzy1AAuVy7POFkUcDKRxpQ

```

# Git warning!

I ran `modal deploy ...` after comitting some stuff I wanted to try BUT I had
changes in my file I didn't want to deploy... some git safety would be nice for
deployment!

> git stash && modal deploy .. && git stash pop

Question for Modal team - in my modal sandbox repo at commit: 
```
aab6162 (HEAD -> main) HEAD@{1}: commit: print base version of my own image to prove it to me
 1 file changed, 2 insertions(+)

```

An environment variable, `BASE_VERSION` that I expect to be in my base image
was not available to the python function in my Modal app... hopefully the log
is still
[here](https://modal.com/logs/ap-qYjE45dciqgT3C3CpNp3RL?functionId=fu-rOt31ShRE1W1CQfuf02fsq&taskId=ta-dm8BfiblvFLwVIQyt75YC2&inputId=in-n64klEFrLtbcm2BiykJEvW) 


## GitHub Actions

I think it'd be easy to deploy from GH actions... just need an API Key...

# Deployment

Without gitops it's already ahrd to manage my versions... need to get that built in either to github or locally sooooon

Nomad?? :D
