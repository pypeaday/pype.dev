---
date: 2025-01-15 18:07:57
templateKey: til
title: Deployments are not StatefulSets
published: True
tags:
  - infrastructure
  - tech
  - k8s

---

I was debugging some ArgoCD stuff earlier today and I love using k9s to explore
my k8s resources.

The TLDR is that I put some bad env vars in the `global` values for my ArgoCD
pods, this caused the webUI to hang. An easy way to push things through is to
open k9s, view the Deployments, and edit the env vars there so the pods can be
in the right state to restart and pickup the changes (you've obviously fixed
the values file already right?)

Well the Notification Controller was the pod hanging, and I couldn't find it in
the Deployments view! This blew my mind... until I realized that it was a
Stateful Set.

So, this is not a comparison of the 2 - this is just a note to say that all I
had to do was find the StatefulSets in k9s and do the same workflow for editing
what I needed to edit to get the pods into workable state while working on the
values file...
