---
date: 2024-12-14 11:27:15
templateKey: til
title: Jellyfin container updates for HWE + AMD
published: True
tags:
  - containers
  - linux
  - tech

---

I use LSIO Jelyfin container for the easy addon they provide for AMD GPUs but I couldn't get trickplay to work with HWE... 

There was almost NOTHING on the internet about the error, and all the threads were about BSD systems...

Thankfully someone posted [on the formum here](https://forum.jellyfin.org/t-jellyfin-amd-docker) but the only answer was to literally upgrade stuff in the container...

Someday maybe I'll build off of LSIO to add this, but until then I shell'd in and homelab'd the hell out of it

> THIS IS INSIDE THE CONTAINER - I use Portianer to make it easy

```

apt update && apt install -y curl gpg

mkdir -p /etc/apt/keyrings

curl -fsSL https://repo.radeon.com/rocm/rocm.gpg.key | gpg --dearmor -o /etc/apt/keyrings/rocm.gpg

cat <<EOF | tee /etc/apt/sources.list.d/rocm.sources

Types: deb

URIs: https://repo.radeon.com/rocm/apt/latest

Suites: ubuntu

Components: main

Architectures: amd64

Signed-By: /etc/apt/keyrings/rocm.gpg

EOF

apt update && apt install -y rocm-opencl-runtime
```
