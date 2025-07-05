---
templateKey: til
tags: ['homelab', 'tech', 'til']
title: Xrdp-Authentication-Required-To-Create-Managed-Color-Device
date: 2022-07-18T00:00:00
published: True
cover: "media/xrdp-authentication-required-to-create-managed-color-device.png"

---

I just need to RDP into an Ubuntu box via Remmina and everytime I login I have
to authenticate to create a color managed device... which I don't even know
what that is!


To fix it?

`vim /etc/polkit-1/localauthority.conf.d/02-allow-colord.conf`

```
polkit.addRule(function(action, subject) {
 if ((action.id == "org.freedesktop.color-manager.create-device" ||
 action.id == "org.freedesktop.color-manager.create-profile" ||
 action.id == "org.freedesktop.color-manager.delete-device" ||
 action.id == "org.freedesktop.color-manager.delete-profile" ||
 action.id == "org.freedesktop.color-manager.modify-device" ||
 action.id == "org.freedesktop.color-manager.modify-profile") &&
 subject.isInGroup("{users}")) {
 return polkit.Result.YES;
 }
 });
```

Give'r the `:x`, logout, and you're good to go
