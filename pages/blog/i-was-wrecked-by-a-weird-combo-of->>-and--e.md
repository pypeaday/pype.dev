---
date: 2025-04-23 08:44:59
templateKey: blog-post
title: I was wrecked by a weird combo of >> and -e
published: True
tags:
  - linux
  - cli
  - tech

---

## TL;DR

If state matters then check it in the beginning or handle it on a failure... Let me explain

I ran into some trouble recently _almost_ losing some encrypted data... Now
this would be the second time I've had that happen, so I'm going to write a
little bit about it now that I figured it out

## The Stage

Here's the scenario - I use `ansible-vault` to keep some sensitive data in a
few public repos, and I keep the keys I use in Bitwarden Secrets Manager.

I use `just` as a command runner and have common `just encrypt` and `just
decrypt` recipes throughout many justfiles. It might look something like this

```bash

get-vault-key:
    bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'

encrypt:
    #!/bin/bash
    set +e
    just get-vault-key > key
    ansible-vault encrypt ./secret-file --vault-password-file key
    ansible-vault encrypt ./secret-file2 --vault-password-file key
    rm key

decrypt:
    #!/bin/bash
    set +e
    just get-vault-key > key
    ansible-vault decrypt ./secret-file --vault-password-file key
    ansible-vault decrypt ./secret-file2 --vault-password-file key
    rm key
```

## Spoiler

Above is a good example of the 2 recipes, but prior to this morning they looked like this

```bash

get-vault-key:
    bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'

# BAD EXAMPLES! DO NOT DO THIS

encrypt:
    set -e
    just get-vault-key >> key
    ansible-vault encrypt ./secret-file --vault-password-file key
    ansible-vault encrypt ./secret-file2 --vault-password-file key
    rm key

decrypt:
    set -e
    just get-vault-key >> key
    ansible-vault decrypt ./secret-file --vault-password-file key
    ansible-vault decrypt ./secret-file2 --vault-password-file key
    rm key
```

## Problem

So here's the story - in real life I started using distrobox when I ran into
this and I thought it was an issue with different versions of ansible installed
in distrobox and on my desktop. After a few more odd deployment workflows I
think I've determined that the real problem is that `>>` appends to a file (see
the issue yet?), but if my recipes fail (say I try to encrypt an already
encrypted file) then the command exits but what's left on my disk? `key` is
still there... and the next time I go to run a command I'll echo the real key
to the `key` file again and if I called `encrypt` when the first or more files
in the list were `decrypted` then they'll be encrypted not with my key, but
with my key repeated as many times as I ran a command with `just get-vault-key >> key`
before ever removing the key file!

```bash

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ cat secret-file
Danger, Will Robinson

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just encrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
Encryption successful

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ cat secret-file
$ANSIBLE_VAULT;1.1;AES256
39616332393662346639633030633766666336323939346138633238626239363733316431333737
6463663763366434376437303335643431663431326135300a636261663636336139323033316232
37666439383131393631333332353731633661396431633834326432363936613331623135666565
6364363039663933620a326563323931643632323031396664646363613636613562366166386439
63653661653037393538356461323239396630643338393231306163343964623866

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just decrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
Decryption successful

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ cat secret-file
Danger, Will Robinson
```

So as you can see, I have `secret-file` here, and I can encrypt and decrypt
just fine. But if I have that `>>` in the recipe, add a second file, and a
failure in a command - well then I'll start getting confused...

Follow along with the workflow of adding a file that I'll need encrypted

> Only secret-file is in the just recipe here - I add secret-file2 after

```bash
nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just decrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
ERROR! input is not vault encrypted data. /var/home/nic/projects/personal/pype.dev/secret-file is not a vault encrypted file for /var/home/nic/projects/personal/pype.dev/secret-file
error: Recipe `decrypt` failed with exit code 1

nic in pype.dev   main   ×2  ×3  ×8 via   v3.11.10(pype-dev)   (dev) 󰒄 
✗ echo "Good - secret-file is already decrypted! So lets add another file"
Good - secret-file is already decrypted! So lets add another file

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ echo "Foo Bar Bam Baz" > secret-file2                                    

nic in pype.dev   main   ×2  ×3  ×8 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ echo "Added secret-file2 to my Just recipes"
Added secret-file2 to my Just recipes

nic in pype.dev   main   ×2  ×3  ×8 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just encrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
Encryption successful
Encryption successful

nic in pype.dev   main   ×2  ×3  ×7 via   v3.11.10(pype-dev)   (dev) 󰒄 
❯ just decrypt
bws secret get $HOMELAB_BOT_VAULT_KEY_ID  | jq -r '.value'
ERROR! Decryption failed (no vault secrets were found that could decrypt) on /var/home/nic/projects/personal/pype.dev/secret-file for /var/home/nic/projects/personal/pype.dev/secret-file
error: Recipe `decrypt` failed with exit code 1

nic in pype.dev   main   ×2  ×3  ×8 via   v3.11.10(pype-dev)   (dev) 󰒄 
✗ echo "Oh no!"
```

So what happened?

Recall that my recipes originally had `set -e` at the top and used `>>` to cat
my secret to a file `key`. Well, when the fir| decryption recipe failed the
`key` file was left behind. Then when I went to encrypt both of my files the
recipe got the key again and made a keyfile like this:

```bash
secretKey
secretKey
```

The encryption recipe encrypted the files with this key, removed the key file,
and then the next decryption recipe failed because when it got the key and made
the file it looked like

```
secretKey
```

So the solution in the end is to remake the `key` file every time (`>` instead
of `>>`), or check if it exists, or handle the error when the recipe fails, or
just keep going (`set +e`)

## Fin

And that's how I lost some secrets in my homelab once, and how I almost lost a
second time if I hadn't noticed the `key` file in my file tree
