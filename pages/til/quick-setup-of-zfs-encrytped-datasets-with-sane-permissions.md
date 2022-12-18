---
date: 2022-10-06 19:58:01
templateKey: til
title: Quick setup of ZFS encrytped datasets with sane permissions
published: True
tags:
  - zfs
  - homelab
  - tech
---

Assuming you have a pool called `tank`...

And assuming you have an encrypted dataset (See [Jim Saltar's short intro](https://arstechnica.com/gadgets/2021/06/a-quick-start-guide-to-openzfs-native-encryption/))

1. Create a group for permissions - in my case I have one called `home`
2. Then if there's anything in `/tank/encrypted` his it with `chgrp -R home /tank/encrypted` to give the `home` group ownership
3. Next we need to make sure that the members of `home` can do the writing... so `chmod 775 -R /tank/encrypted` will do the trick
4. Finally we want to make sure that all data created inside our dataset has the same set of permissions with `chmod g+s /tank/encrypted` and `chmod g+w /tank/encrypted`

