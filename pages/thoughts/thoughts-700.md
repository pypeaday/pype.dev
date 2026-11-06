---
title: "💭 Cross Account AWS Security Group ID Reference"
date: 2025-06-16T20:56:57.041566
slug: thoughts-700
templateKey: thoughts
description: "I needed to update some ingress rules across several AWS accounts and ran into an issue when I had to reference a securi"
published: true
link: "https://stackoverflow.com/questions/12465978/can-aws-security-groups-on-one-aws-account-reference-security-groups-in-another"
tags:
  - aws
  - infrastructure
  - thoughts
cover: "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/20261011084908_0e5505c0.png"
---

<a href="https://stackoverflow.com/questions/12465978/can-aws-security-groups-on-one-aws-account-reference-security-groups-in-another">
    <img
        src="https://shots.wayl.one/shot/?url=https://stackoverflow.com/questions/12465978/can-aws-security-groups-on-one-aws-account-reference-security-groups-in-another&height=450&width=800&scaled_width=800&scaled_height=450&selectors="
        alt="shot of post - Cross Account AWS Security Group ID Reference"
        height=450
        width=800
    >
</a>

Here's my thought on <a href="https://stackoverflow.com/questions/12465978/can-aws-security-groups-on-one-aws-account-reference-security-groups-in-another">Cross Account AWS Security Group ID Reference</a>

---

I needed to update some ingress rules across several AWS accounts and ran into an issue when I had to reference a security group id in another account - turns out <accountid>/<securitygroupid> is the money maker

EDIT: this requires VPC Peering...

---

!!! note
    This is one of [[ my-thoughts ]]. I picked this up from [Waylon Walker](https://waylonwalker.com)(https://thoughts.waylonwalker.com). It's a short note that I make about someone else's content online.  Learn more about the process [[ thoughts ]]
