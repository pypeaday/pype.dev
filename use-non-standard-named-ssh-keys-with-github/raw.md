---
date: 2023-01-03 08:34:50
templateKey: til
title: Use non-standard named ssh keys with github
published: True
tags:
  - linux
  - cli
  - tech

---

I was getting `(publickey denied)` when trying to push to GH using ssh. When I
tested the connection I saw that a bunch of keys in ``~/.ssh/ were being
attempted

```console
✗ ssh git@github.com -vv

...

debug1: Will attempt key: /home/nic/.ssh/id_rsa 
debug1: Will attempt key: /home/nic/.ssh/id_ecdsa 
debug1: Will attempt key: /home/nic/.ssh/id_ecdsa_sk 
debug1: Will attempt key: /home/nic/.ssh/id_ed25519 
debug1: Will attempt key: /home/nic/.ssh/id_ed25519_sk 
debug1: Will attempt key: /home/nic/.ssh/id_xmss 
debug1: Will attempt key: /home/nic/.ssh/id_dsa 

...

debug1: No more authentication methods to try.
git@github.com: Permission denied (publickey).

```

None of those were the key I setup with GH. So I added an entry
into `~/.ssh/config`:

```text
Host
github.com
User git
Port 22
Hostname github.com
IdentityFile ~/.ssh/my_custom_github_key
TCPKeepAlive yes
IdentitiesOnly yes 

```

