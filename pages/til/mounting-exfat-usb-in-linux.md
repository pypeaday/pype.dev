---
date: 2022-07-31 07:38:43
templateKey: til
title: Mounting exFAT USB in Linux
status: draft
tags:
  - linux
  - homelab

---

# Steps

`sudo fdisk -l`

then look for the device and partition

get the Type column

mount

## Example

```

dumbledore in /media  NO PYTHON VENV SET 
❯ sudo fdisk -l

...

Device     Boot    Start      End  Sectors  Size Id Type
/dev/sdk1  *        2048 60371951 60369904 28.8G  7 HPFS/NTFS/exFAT
/dev/sdk2       60371952 60437487    65536   32M ef EFI (FAT-12/16/32)


dumbledore in /media  NO PYTHON VENV SET 
❯ sudo mount -t ntfs /dev/sdk1 /media/ventoy-usb -o uid=1000                       
NTFS signature is missing.
Failed to mount '/dev/sdk1': Invalid argument
The device '/dev/sdk1' doesn't seem to have a valid NTFS.
Maybe the wrong device is used? Or the whole disk instead of a
partition (e.g. /dev/sda, not /dev/sda1)? Or the other way around?

dumbledore in /media  NO PYTHON VENV SET 
✗ sudo mount -t exfat /dev/sdk1 /media/ventoy-usb -o uid=1000

```
