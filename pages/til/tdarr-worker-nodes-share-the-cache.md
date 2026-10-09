---
date: 2022-05-25 06:36:59
templateKey: til
title: Tdarr worker nodes share the cache!
published: False
tags:
  - homelab
  - tech
  - til

---

When working with tdarr remote nodes, they need to have access not only to the
same libraries but also the same transcode cache as the server otherwise the
transcodes will fail...

# Network Setup

To explain I'll give a brief overview of my home setup  

I have an old Dell PowerEdge R610 as my main server running a live server distribution of Ubuntu.
I use ZFS for my NAS file system, and most of my datasets are accesible over my home network.
I have a Tdarr server running in a docker container on the R610.

In my office I dailyi drive a gaming desktop with an Nvidia 2060 Super running Ubuntu as well.
On that desktop I am running a Tdarr node in a docker container. 
The container has access to the network folders with my media. 

# Initial Magic 

When I spun up  a tdarr node on my desktop, the tdarr server running on my R610 automatically registered the node, which was freaking amazing.
That magic though spoiled me and I thought that I didn't need to read the rest of the docs...

# Initial Fail 

I setup a transcode cache directory on the R610 locally and a separate transcode cache on my desktop that the remote tdarr node would use.
Having them separated led to 2 main issues:
1. Transcodes were not being migrated back to my library properly
2. I was running out of disk space on my desktop because tdarr wasn't deleting the completed cache files properly.

# The Fix

Make a transcode cache directory accessible on my network, and give access to that directory to the docker container running my remote tdarr node.



