---
date: 2026-05-13 08:24:00
templateKey: blog-post
title: Panicking Led to Losing My Desktop
published: True
tags:
  - backup
  - tech
---

## False Sense of Security

I thought I had backups handled... can you imagine how the rest of this post is
going to go with that intro?

To be fair, I do have backups figured out on my NAS - simple ZFS +
sanoid/syncoid + replica pool + off-site backup with simple restore pathways.
However, my desktop has been another story entirely. My desktop OS didn't
support ZFS when I started checking it out, and I spent weeks thinking through
how I would backup my HOME directory and projects mostly. I landed on a
solution that I did validate once, but it fell off my radar and lo' and behold
that was problematic...

So that backup was based on restic for my home directory, but it was lazy. I
verified it one time but I had built it with ai, thought I understood the
restic repo part, and then promptly moved on with my life never buttoning it
all up. That home directory backup got too big for where I was going to end up
restoring it. My desktop system was installed on a 4 TB NVMe drive and due to
the circumstances spawning this blog post I was gonna have to drop to a 500 GB
boot drive with some extra disks as the storage layer. Overall it looked like:

- A 4 TB SSD that was going bad - old OS
- A 500 GB SSD, that was going to be my new operating system boot disk
- A 2 TB SSD that was originally going to be this external storage volume
  anyways but I never set it up because the version of Aurora I was running
  didn't have ZFS, I was married to the idea of using ZFS, so I never ended up
  taking advantage of the space. However it was moot to me because my boot drive
  was 4 TB, high quality drive, so I was "just sure" I didn't need it.
- AND a 4 TB rust disk as well, which was already a ZFS pool, left over from a
  previous desktop configuration, and admittedly I had forgotten it was even in the system.

## The Storm

If it wasn't clear the problem is that my super-nice high-speed 4TB NVMe drive
was going bad, like really bad. Eventually my OS stopped booting, it was even
difficult to live-boot from any other ISO due to, I think ultimately, that disk
causing such extreme latency in the start-up processes that they just failed.
So I quickly found myself with little-to-no access to my primary desktop's
data...

## Where It Went Wrong

What I did is I live booted into an Ubuntu server environment (which took blood
sweat and tears to successfully get into), mounted my home directory from the 4 TB SSD, and
tried to continue my restic backup to my NAS, like an idiot. But at the same
time I also tried to prune it by only backing up a few projects because I
was getting worried about time. This was the first primary mistake - trying to
muck with my backup script under duress.

Then over the course of the whole thing it ended up taking over a week to solve
this when it could've been 2-3 days. So say it with me kids - "Don't make
decisions under duress"

## Climbing Out

I downloaded opencode and had it help me write the right excludes syntax in my
restic backup script and got it back up going. That went ok but opencode agents
had no historical context for why anything was the way it was, and frankly an
agent would've been misled thinking the backup solution was much more solid
than it was due to how I documented it.

Agents also miss things... in my chat sessions it knew about the other 2
available disks on the desktop system, I could have done a fresh backup to the 4 TB
spinning rust disk no problem: install zfs, mount the pool, change target of
restic, run full... that would've been beautifully simple. But instead I
trimmed it down and backed not-everything up to the NAS over the network, and
to a different backup target nonetheless... SMH.

As I started to consider which OS I was going to go with next I failed to
install Pop_OS! or Ubuntu onto the new disc... Then I tried Omarchy and the
install script just looped. So, I reinstalled Aurora onto the new 500 GB disk
and then quickly realized I don't have Firefox tabs, my SSH keys are in that
restic backup, my ssh config, api keys in hidden files.... Everything is in
that restic backup... The backup that's too big to restore to my new boot drive.

But you know what I have? That 2 terabyte disk mounted just fine as a
ZFS dataset. And I could mount the 4 TB rust disk with zfs as well because this
version of Aurora has zfs working flawlessly!

## Hindsight

What I should've done is so simple... While in that ubuntu live environment I
should've just either updated restic to be a local backup to the 4 TB rust
disk, or rsync'd my home directory to it plain and simple... I got all in my
head about not backing up python venvs, node_modules, etc. that I didn't think
to just basically carbon copy it all to a healthy disk and then prune it later.
Then I could've synced everything back over that I needed to the new Desktop's
$HOME and then scheduled the rsync or restic again to that locally mounted disk.

## The Detail I Left Out

The keen reader might stop to think... why not just mount the old 4TB disk and
copy what you need to your new desktop? And that's a prudent question...
However, in order to get anything installed I had to physically remove the 4TB
SSD from the motherboard, which was basically a full PC tear-down. From there I
was able to at least boot in and out of iso's like you'd otherwise expect, and
I have a USB/NVMe adapter so I planned to mount the old drive and copy things over from
there... But sadly... it won't mount. it's dead-dead and it appears that
anything I didn't save in my days-long-panicked-state is just. gone.

I feel pretty stupid to have not taken advantage of the 2 available disks local
to the machine, to have naively copied stuff over and dealt with the
organization later once my OS was back up. I tried to be smart and efficient
and ended up wasting so much time and losing quite a lot of "stuff"... ideas,
blog posts that I never committed, etc.

## Current Status

So a few lessons...

1. untested backups are not backups
2. false backups might be worse than none, although I did at least save a few things so maybe the jury is out here
3. making decisions while stressed out will lead to missing obviously better pathways... slow down, talk it out

As for my current status - I'm working on [[desktop-setup-2026]] and recovering what I can from my haphazard'd rsyncs in the live ubuntu env I got into. I'm also setting up a new Linux laptop at work at the same time so maybe I'll hve some workflow changes to write about in the future. For now, it's nice to be forced to accept that not every idea was that important, the good stuff will come back around, and ultimately computers and shit are just things, they're not life.
