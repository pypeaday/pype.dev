---
templateKey: blog-post
tags: ['blog', 'homelab']
title: Recovering OPNSense
date: 2024-11-06T00:00:00
published: True
cover: "media/Recovering-OPNSense.png"

---

I woke up to faulty internet and after some troubleshooting it turns out the
root zfs dataset that OPNSense boots from got corrupted...

> PRO-TIP - Auto backup your OPNSense config to Google Drive, git, or
> nextcloud... But if you won't then at least back up your OPNSense config
> somewhere everytime you update it.


It's too much to recount every issue, so here's a bullet list what worked.


1. On a fresh drive install OPNSense
2. Plug in the old drive through a USB enclosure - now I'm not sure what would
happen if you plugged it in along with the new drive and then booted up.
Because both drives will have a zfs pool `zroot` and the boot dataset is
automounted at `/zroot/ROOT/default`. My old `zroot` pool was `SUSPENDED` so it
didn't automount
3. Because the old `zoot/ROOT/default` was corrupted I did this to mount it RO:
`zpool import -d <path to zfs partition - /dev/stuff> -N zroot zrootrecovery`

> -d is the zfs flag to import the pool by disk id, -N it to not mount any of
> the datasets (we need to change mountpoints) and the `zroot zrootrecovery`
> imports the `zroot` pool with a new name

4. Change the mountpoints for all the `zrootrecovery` datasets to somewhere
like `/mnt/zrootrecovery`
5. Depending on the mount point you set you'll find a `config` directory around
`/mnt/zrootrecovery/ROOT/default/config` - copy the file you want to another
machine via scp or whatever
6. Go to OPNSense webui and recover from that config!

All in all this process took me around 8 hours but I did run into about ever
issue under the sun (several bad disks in the mix, a laptop that wouldn't live
boot into a BSD system, etc.)
