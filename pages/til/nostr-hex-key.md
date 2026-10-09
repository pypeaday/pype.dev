---
date: 2025-07-02 08:43:32
templateKey: til
title: Nostr hex key
published: True
tags:
  - nostr
  - til
  - tech
cover: "https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20250703021602_a53c2983.png"
---

you can hexify your [[nostr]] key when you need to sometimes which I needed to for [[postiz]] (link with a thought I'm sure I have on postiz)

```python

# /// script
# requires-python = ">=3.8"
# dependencies = [
#     "bech32",
# ]
# ///
#
import os

import bech32

# Set your nsec... key to NOSTR_PRIVATE_KEY or bake it in...
nsec_key = os.environ.get("NOSTR_PRIVATE_KEY")


def decode_nsec(nsec_key):
    hrp, data = bech32.bech32_decode(nsec_key)
    if hrp != "nsec":
        raise ValueError("Not a valid nsec key")
    decoded = bech32.convertbits(data, 5, 8, False)
    return bytes(decoded).hex()


# Example usage
raw_hex = decode_nsec(nsec_key)
print(f"Raw hex private key: {raw_hex}")
```
