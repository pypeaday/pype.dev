---
date: 2026-10-06 21:30:00
templateKey: blog-post
title: "The Faulted Disk: harbor Replacement Writeup"
published: True
authors:
  - nic
  - id: devin
    details: drafted this writeup from the ZFS diagnostic output
tags:
  - homelab
  - zfs
  - tech
  - backup
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011083927_2ce2aea1.png"
---

The sequel to [panicking-led-to-losing-my-desktop](/panicking-led-to-losing-my-desktop) — this time the monitoring actually caught the disk dying, and nothing was lost.

## What happened

`harbor` is my replica pool — a 10.9T mirror (2x 12TB) that receives syncoid snapshots from `tank`. One side of the mirror, a Seagate Exos `ST12000NM0127` (serial `ZJV4QFLB`, `/dev/sdb`), went **FAULTED** with 14 read + 22 checksum errors.

``` text
mirror-0                              DEGRADED     0     0     0
  ata-ST12000VN0008-2PH103_ZTM0NFDW  ONLINE       0     0     0
  ata-ST12000NM0127_ZJV4QFLB         FAULTED     14     0    22  too many errors
```

The IronWolf mirror side carried the pool — `No known data errors`. ZFS redundancy did exactly its job.

## The difference from last time

Last failure: no monitoring, found out by accident months later, desktop died.

This failure: SigNoz + node-exporter's ZFS collector → `node_zfs_zpool_state{state="degraded"}` → alert rule → Gotify → my phone. The gotify notification fired *before* I knew anything was wrong.

## Diagnosis

Before `zpool clear` or replace — check SMART. `smartctl-exporter` already scrapes all disks into SigNoz, so I didn't even need sudo:

- `Reallocated_Sector_Ct` raw = **3024** and counting
- `Offline_Uncorrectable` value/worst still 100 but raw errors climbing
- SMART overall: still PASS (SMART's overall bit is conservative until threshold)

3k+ remapped sectors is a platter going bad — not a cable blip. Verdict: replace, don't clear.

## The swap (the annoying part)

Hot-plug is never as smooth as it should be:

1. `zpool offline harbor <old>` to stop writes to the dead drive — actually skipped; drive fell off the bus on its own
2. New IronWolf `ZTN1CQ07` in hand → plugged into ghost's SATA → **didn't enumerate**
3. Forced rescan (`echo "- - -" | sudo tee /sys/class/scsi_host/host*/scan`) → nothing
4. Moved it to the *old drive's port* → nothing
5. Sabrent USB dock on aurora → dock enumerated as `0B` device, no disk behind it → reseated + replugged → **drive spun up and appeared**: `/dev/sdd`, 10.9T, old ZFS partition table on it (used drive — `part1`/`part9` layout)
6. Back to ghost, direct SATA → enumerated as `sdb`

Lesson: "spins up but doesn't enumerate" on direct SATA + dock-shows-0B = seating/power problem, not DOA. The drive was fine all along.

## The replace

``` bash
sudo zpool replace harbor \
  ata-ST12000NM0127_ZJV4QFLB \
  ata-ST12000VN0008-2PH103_ZTN1CQ07
```

Resilver: **8.80T in 18h38m, 0 errors** (~154M/s). Pool stayed online and usable the whole time.

One gotcha: after resilver, `zpool status` showed `errors: 1 data errors` — but `zpool status -v` showed an **empty error list**. The corrupted data was already repaired; the counter was just stale. `sudo zpool clear harbor` → clean.

## The monitoring that made this possible

Wired during this session (all now in SigNoz):

- `node_zfs_zpool_state` — pool health (node-exporter zfs collector)
- `smartctl-exporter` — SMART attributes incl. reallocated sectors (the early-death signal)
- `zfs-metrics.sh` textfile bridge — sanoid `--monitor-*` exit codes, zpool error counters, scrub ages, resilver %, syncoid last-success
- Alert rules → Gotify → phone

The replication alerting even proved itself live: syncoid failed twice during the resilver window and I got paged on both. Turned out to be send-time contention — self-healed once resilver finished — but the notification path works end to end.

## Remaining homework

- Buy the replacement spare (the shelf's empty now)
- `10Fold` datasets are garbage + have zero snapshots — destroy
- Every scheduled job emits `cron_last_success_epoch` now — if a job dies silently again, I'll know

Same failure as April, opposite outcome. Redundancy did the protection; monitoring did the *detection*. You need both.

---

*Co-authored with Devin, who ran the monitoring stack, the SMART diagnosis, and the alerting loop.*
