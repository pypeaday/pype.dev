---
templateKey: til
tags: ['python', 'tech']
title: Psutil-01
date: 2022-03-16T00:00:00
published: True
cover: "media/psutil-01.png"

---

[Mike Driscoll](https://twitter.com/driscollis) has been posting some awesome posts about `psutil` lately.
I'm interested in making my own system monitoring dashboard now using this library.
I don't expect it to compete with Netdata or Glances but it'll just be for fun to see how Python can solve this problem!

__Repo coming soon__

## Example code:
Here's a short snippit to get used/available/total RAM and disk space (on partitions that you probably care about)
```python

import psutil
import socket

print(f"System Memory used: {psutil.virtual_memory().used // (1024 ** 3)} GB")
print(f"System Memory available: {psutil.virtual_memory().available // (1024 ** 3)} GB")
print(f"System Memory total: {psutil.virtual_memory().total // (1024 ** 3)} GB")


print(f"Hostname: {socket.gethostname()}")

partitions = psutil.disk_partitions()

for part in partitions:
    mnt = part.mountpoint
    if "snap" in mnt or "boot" in mnt:
        continue
    disk = psutil.disk_usage(mnt)
    print(f"Usage at {mnt} on {part.device}: {disk.used // (1024 ** 3)} GB")
    print(f"Free at {mnt} on {part.device}: {disk.free // (1024 ** 3)}GB")
    print(f"Total at {mnt} on {part.device}: {disk.total // (1024 ** 3)}GB")
```

> Bonus Ipython tip! Save this to a script called my_script.py and in Ipython you can %run -m my_script to run it!

```bash
project ↪ main v3.8.11 ipython
❯ %run -m system-monitor-psutils
System Memory used: 25 GB
System Memory available: 5 GB
System Memory total: 31 GB
Hostname: ryzen-3600x
Usage at / on /dev/nvme1n1p2: 81 GB
Free at / on /dev/nvme1n1p2: 351 GB
Total at / on /dev/nvme1n1p2: 456 GB
```
