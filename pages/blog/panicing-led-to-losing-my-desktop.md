---
date: 2026-04-24 19:24:00
templateKey: blog-post
title: Panicing Led to Losing My Desktop
published: False
tags:
  - backup
  - tech

---

Okay, I need to take a verbal note about what I did and what I should have done in trying to recover my desktop environment.
So I had a backup based on restic for my home directory, but it was really lazy and I never really learned it.
and that home directory got too big for where I was going to end up restoring it to.
So my current  system was on a 4 terabyte drive and I was gonna have to drop to a 500 gig with a 2 terabyte external attached storage.
Now the makeup of my desktop was a 4 terabyte SSD that was going bad.
A 500 gig SSD, that was going to be my new operating system boot disk, a 2 terabyte disk that I never started using as storage but wanted to and then forgot about.
But then the kicker is a 4 terabyte rust disk as well, which was a ZFS pool.
And so what I did is I live booted into an Ubuntu server environment, mounted my home directory from the 4 terabyte SSD, and tried to continue my rustic backup to my NAS, like an idiot.
But then I also tried to prune it by only backing up like a few projects because I was getting worried about time.
But then over the course of the whole thing, it's taken me now, you know, over a week to solve this.
So this has just been a ridiculous waste.
So I downloaded open code and had it help me write the right excludes and stuff, just write in my RESTIC backup script and got it back up going.
And now I have failed to install POP or Ubuntu onto the new disc, but I reinstalled Aurora onto the new 500 gig disk and realized I don't have Firefox tabs.
My SSH keys are in that Restic backup.
Everything is in that rustic backup.
But you know what I have is I have that 2 terabyte disk mounted just fine as a ZFS dataset.
And what I should have done was just our synced everything from the 4 terabyte SSD in my home directory to the 2 terabyte disk.
which I had already formatted as a ZFS data, as a Z pool with data sets.
So I could have made a data set for my home directory right then and there and could have just R synced everything.
attached it here in the new Aurora instance, Arcing to everything back over, kind of done a little switcheroo with the direction of the back up there, or just flushed it and started the new one, and I'd be up and running.
And anyway, I guess would also conclude the discussion of what I should have done, which is that.
I should, and oh, and a detail I left out is after the Ubuntu live desktop environment,
and before the Aurora install is I removed the 4 terabyte disk from the motherboard, which was like a full PC tear down.
And that had to happen because I wasn't really able to boot anywhere, because that 4 terabyte disk had some bad blocks that were inhibiting the boot process.
With everything I was loading as it was like trying to, you know, do disk discovery or whatever, I think anyway, that disk was holding everything up.
When I finally got it to Aurora, I didn't have the old one to just mount an R sync two, and I just feel so ridiculous that I had that 2 terabyte and the 4 terabyte disk that I completely have failed to even utilize in this whole situation, the spinning rust, to have uses a backup target.
All local, didn't even have to go to my house at all, didn't have to use the network at all.
Yeah, just feel so stupid about it.


