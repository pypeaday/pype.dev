---
templateKey: til
tags: ['git', 'tech', 'til']
title: Git ammend to a commit 
date: 2022-03-04T00:00:00
published: True
cover: "media/git-ammend-no-edit.png"

---

After carefully staging only lines related to a specific change and comitting I suddenly realized I missed one... darn, what do I do?

Old me would have soft reset my branch to the previous commit and redone all my careful staging... what a PIA...

New me (credit: ThePrimeagen)...

```bash
# stage other changes I missed
git commit --amend --no-edit
```
