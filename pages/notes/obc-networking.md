---
date: 2026-05-16 12:26:46
templateKey: note
title: OBC Networking
published: False
tags:
  - olivet-bible-church
  - note
---

## network

Spectrum brings internet in via coax to their modem. The modem feeds the Eero
(acting as gateway, handing out 192.168.4.0/24). Downstream of the Eero is the
old Spectrum router still emitting an SSID on 192.168.1.0/24 — needs turning
off (requires Spectrum admin access).

## printer

The printer was originally self-assigned static IP 192.168.1.165. After
switching to Eero DHCP (192.168.4.0/24), it now gets 192.168.4.25. The admin
desktop has a static rule configured for it, but the port config on the desktop
still had the old 192.168.1.165 address — had to update it to point to
192.168.4.25. The port name is stuck as IP_192.168.1.165 (couldn't be changed).

The DHCP-assigned 192.168.4.25 is subject to change — need to iron that out.

### admin password reset

1. From the main menu, tap **Counter** → **Display Keyboard**
2. Enter: `stop, 0, 0, stop, 0, 1` via the on-display keypad
3. A password prompt appears — enter: `9272 9272 9272 9272` (9272 × 4)
4. Tap **End** (this is "OK")
5. From the new menu: `stop, 0` on the on-display keypad, then `C` on the keypad
6. This opens the admin password reset menu
7. Set new password to: `12345678`

> NOTE: I put a sticky note on the side of the printer with these instructions

### how to get to network settings

After the admin password reset, I navigated through the menus to find the
network settings and changed from static IP to **Auto (DHCP)**. Didn't write
down the exact path — next time I'm at the printer I need to document it.

## todo

- [ ] turn off "Olivet Bible Church" SSID on the old Spectrum router (requires admin portal access)
- [ ] wall-mount Eero 2 to extend range to kid's wing
- [ ] consider getting a 4th Eero for Fellowship Hall coverage
- [ ] set the printer to a DHCP reservation on the Eero so its IP doesn't change
- [ ] fix the shared password between OBC-Admin and OBC-Guest (currently the same)
- [ ] re-run the damaged ethernet cable from the networking closet to the sanctuary
  - once done, plug blue #4 into the switch, feeding Eero 3 at the tech bar
  - Eero 3 can then feed Switch 3 for the tech bar devices
  - **Eero 3 might be able to do this without a new run depending on strength of their back-haul**

## topology

![20260517133911_bfaa446e.png](https://cdn.statically.io/gh/pypeaday/images.pype.dev/main/blog-media/20260517133911_bfaa446e.png)
