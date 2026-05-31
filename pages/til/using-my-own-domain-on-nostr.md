---
date: 2025-01-24 06:28:19
templateKey: til
title: Using my own domain on nostr
published: True
tags:
  - nostr
  - til

---

After generating a keypair on a nostr app (I started with primal) I copied my
public key to `/.well-known/nostr.json` and put that at the root of my site at
`https://pype.dev`.

The file looks like this:

```json

{
  “names”: {
    “nic”: “npub1q3fsec2vcv99v80ga72dlv90qwkqmuxqcr6mdyumcmpkgudlhrespyurfj”
  }
}
```
So now I can use `nic@pype.dev` as on nostr because the client will verify the
pubkey associated with my profile with my domain!

> big upgrade from <whatever>@primal.net
