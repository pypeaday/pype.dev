---
date: 2022-05-19 14:22:58
templateKey: til
title: Subset a list based on values in another list with itertools.compress
published: False
tags:
  - python
  - python

---

I have list [True, False, False, True] and another list [1, 2, 3, 4] and a use case where I want to filter list 2 based on list 1 to remove values that line up with the element False in list 1.... so the outcome will be [1, 4]. list(compress(list2, list1)) will do it. As long as you can create a mask for the filter than itertool.compress will be your friend!
