---
date: 2026-05-07 06:33:03
templateKey: jira
title: DataOps
published: False
tags:
  - dataops
  - jira
  - doing
---

old: [[using-restic-to-backup-my-home-directory]]

NOTE: zfs-ops is now in my forgejo instance. ghost, ghost-vault, and my desktop clone from forgejo
NOTE: zfs-ops and homelab-mono/dataops are separate, they could be combined

## Things to Backup

- Desktop
  - projects + workspaces
    sans .venv and other stuff
  - home directory
- Server
  - zfs datasets in tank (nas, docker, etc.)

## Aurora (Desktop) Disk Layout

| Device               | Size   | Pool                                     | Datasets                            | Mounts                                  | Role                                |
| -------------------- | ------ | ---------------------------------------- | ----------------------------------- | --------------------------------------- | ----------------------------------- |
| Samsung 970 EVO NVMe | 500 GB | —                                        | —                                   | `/`, `/home`, `/boot`                   | Boot + OS                           |
| Samsung 870 EVO SATA | 1 TB   | —                                        | —                                   | —                                       | VMs / scratch / future              |
| Crucial BX500 SATA   | 2 TB   | `docker-storage-zfs` 🡒 `orbit` (planned) | `volumes/`, `projects/`             | `/var/docker-storage-zfs`, `~/projects` | Primary — Docker volumes + projects |
| Seagate IronWolf HDD | 4 TB   | `depot`                                  | `sanoid/`, `restic/`, `nvme-rsync/` | —                                       | Backup target                       |

## How

- Desktop
  - Will use 2TB disk, renaming docker-storage-zfs to orbin for kicks, I knew I'd regret naming it docker-storage-zfs anyways from [[desktop-crash-2026]]
  - `projects`
    - zfs dataset mounted to ~/projects
    - [ ] will need to ignore it in the $HOME backup solution
  - `docker-volumes` will just be named `volumes`
    - mounted to `/var/docker-storage-zfs/`, might change mountpoint, only relevant to my compose files
  - `$HOME` directory is NOT zfs
    - rsync to a zfs dataset on an external SSD, same one that projects is on but the difference is that projects is mounted from there and the home directory is just backed up to it.
    - from there backup to NAS just like projects... so no matter what we'll go from the 2 or 4 TB disk in my desktop to ghost:/tank/... and then tank replicates to to the harbor zpool, and that's all local in my house across 2 machines (desktop and NAS, NAS has tank and harbor)
  - Local backup to 4TB disk on device, pool will be `depot` and I can setup `depot` -> `tank` if I find it relevant...
    - the redundancy to my NAS would give me only redundancy, maybe for off-site set something up from `depot` -> `ghost-vault:/tank`
    - [ ] ?? $HOME
    - [ ] ?? projects
    - [ ] ??docker volumes
      - specific volumes maybe?
- Server
  - tank -> harbor is local redundancy
  - sanoid sends configured zfs datasets from tank -> ghost-vault

## TODOs

- [x] rename `docker-storage-zfs` to `orbit`
- [x] create `projects` zfs dataset in `orbit`
- [ ] setup zfs dataset for home directory backup on `orbit`
- [x] set mountpoint for projects
- [x] set mountpoint for docker volumes dataset
- [x] restart the ai stack containers after validating compose file volume path is correct
  - the ".../volume/" part will probably be wrong
  - just kept the mountpoint as /var/docker-storage-zfs/_for orbit/volumes/_
- [ ] setup appropriate backup (rsync, restic, etc.) for home directory to `orbit`'s backup dataset
- [ ] setup sanoid snapshot schedule in zfs-ops
- [ ] setup syncoid script/systemd for `orbit` to `depot`
- [ ] recover the rest of my projects from emergency or home-restore
- [ ] remove orbit/emergency
- [ ] remove orgit/home-restore
- [ ] remove orbit/volumes/mcphub
- [ ] remove orbit/volumes/tdarr maybe?
