---
date: 2025-10-04 09:38:58
templateKey: blog-post
title: Sending SMS with SMTP
published: True
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20251004145127_fd0149da.png"
tags:
  - til
  - tech
---

I'm cooking something up over here that will include SMS message notifications
as a feature and I've been doing some reading on different providers...

Many specialize in bulk SMS messaging, like for campaigns and promotions. So
this pricing model doesn't work for me.

The providers that do quick single SMS messages are often $0.005 to $.04 cents
per message which isn't insanity but I'm not exactly backed by anyone...

Well today I learned that you can actually send SMS messages via SMTP! I
wouldn't bank on total reliability here but for testing and initial roll out of
what I want I think this will be perfect.

And because I'm just that kind of guy, here's some code you can `uv run
smtp2sms.py` and get yourself a handy little text. I'm going to build a simpler
module but you can get a `gmail` and `gmail app password` within about 10
minutes. [see here](https://support.google.com/mail/answer/185833?hl=en)

```python
# /// script
# requires-python = ">=3.10"
# dependencies = [
# ]
# ///
import os, smtplib
from email.mime.text import MIMEText

SMTP_APP_USER=os.environ.get("SMTP_APP_USER") # me@gmail.com
SMTP_APP_PASSWORD=os.environ.get("SMTP_APP_PASSWORD")
SMTP_SERVER=os.environ.get("SMTP_SERVER")  # smtp.gmail.ch

# NOTE: I haven't verified all the carrier domains - this was provided by ChatGPT

carriers = {
    "att": {
        "sms": "txt.att.net",
        "mms": "mms.att.net"
    },
    "tmobile": {
        "sms": "tmomail.net",
        "mms": "tmomail.net"
    },
    "verizon": {
        # "sms": "vtext.com", # not reliable
        "sms": "vzwpix.com",
        "mms": "vzwpix.com"
    },
    "sprint": {
        "sms": "messaging.sprintpcs.com",
        "mms": "pm.sprint.com"
    },
    "googlefi": {
        "sms": "msg.fi.google.com",
        "mms": "msg.fi.google.com"
    },
    "uscellular": {
        "sms": "email.uscc.net",
        "mms": "mms.uscc.net"
    },
    "boost": {
        "sms": "sms.myboostmobile.com",
        "mms": "myboostmobile.com"
    },
    "cricket": {
        "sms": "sms.cricketwireless.net",
        "mms": "mms.cricketwireless.net"
    },
    "metropcs": {
        "sms": "mymetropcs.com",
        "mms": "mymetropcs.com"
    },
    "virgin": {
        "sms": "vmobl.com",
        "mms": "vmobl.com"
    }
}
contacts = {
    "me": {"carrier": "verizon", "number": "1234567890"},
}
msg = MIMEText("Hello from a python script? What?!")
msg["From"] = SMTP_APP_USER

SEND_TO = "me"

# Complex for my future use cases - deal with it
msg["To"] = f"{contacts[SEND_TO]['number']}@{carriers[contacts[SEND_TO]['carrier']]['sms']}"

with smtplib.SMTP(SMTP_SERVER, 587) as email_handler:
    email_handler.starttls()
    email_handler.login(SMTP_APP_USER, SMTP_APP_PASSWORD)
    email_handler.sendmail(SMTP_APP_USER, [msg["To"]], msg.as_string())

```
