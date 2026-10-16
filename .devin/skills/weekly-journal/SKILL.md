---
name: weekly-journal
description: Scaffold and populate weekly men's group journal entries for Olivet Baptist Church — creates pages/notes/olivet-mens-group-{year}-week-{num}.md with scripture blocks, reading checklist, and journal prompts. Can fetch verse text from the Free Use Bible API (BSB).
---

# Weekly Journal Skill

Scaffold and populate weekly men's group journal entries for Olivet Baptist Church.

## Template Location

Reference `pages/notes/olivet-mens-group-2026-week-34.md` for the canonical template structure.

## When Creating a New Week

1. Ask the user for:
   - Week number
   - Date range (Mon–Sun)
   - Meeting day
   - Memory verse reference
   - 5 daily reading passages

2. Generate the file at `pages/notes/olivet-mens-group-{year}-week-{num}.md`

3. Use this frontmatter:
```yaml
---
date: {meeting date} 06:00:00
templateKey: note
title: Men's Group - Week {num}
published: True
tags:
  - olivet
  - faith
  - mens-group
---
```

4. Fill in headers only:
   - Week number and date range
   - Meeting day
   - Memory verse reference (text left empty for user)
   - Reading checklist (unchecked)
   - `## Day N — <passage>` headings containing only the `??? quote` blocks (left as `<paste text here>`)
   - A single `## Weekly Journal` section after the readings with the four `###` prompts once (Stands out, Means, For me, Prayer) — NOT repeated per day
   - Use `#### Day N — <passage>` subheadings inside a prompt only if the user has notes for that specific reading
   - Leave Prayer Requests and Meeting Notes sections empty

## Fetching Bible Verses

When the user asks to pull scripture for a passage, fetch from the Free Use Bible API.

**Base URL:** `https://bible.helloao.org/api`

**Default translation:** BSB (Berean Standard Bible)

**Endpoint for chapter text:**
```
GET https://bible.helloao.org/api/BSB/{BOOK_CODE}/{CHAPTER}.simple.json
```

Book codes: GEN, EXO, LEV, NUM, DEU, JOS, JDG, RUT, 1SA, 2SA, 1KI, 2KI, 1CH, 2CH, EZR, NEH, EST, JOB, PSA, PRO, ECC, SOS, ISA, JER, LAM, EZK, DAN, HOS, JOE, AMO, OBA, JON, MIC, NAM, HAB, ZEP, HAG, ZEC, MAL, MAT, MRK, LUK, JHN, ACT, ROM, 1CO, 2CO, GAL, EPH, PHP, COL, 1TH, 2TH, 1TI, 2TI, TIT, PHM, HEB, JAS, 1PE, 2PE, 1JN, 2JN, 3JN, JUD, REV

**Example:**
```bash
curl -s "https://bible.helloao.org/api/BSB/JHN/3.simple.json"
```

Parse the JSON response. Each verse is in `chapter.content[]` where `type === "verse"`. Extract `number` and `text` fields.

**Output format for scripture blocks:**
```markdown
??? quote "Reference"

    1 Verse text one.
    2 Verse text two.
    3 Verse text three.
```

## Notes

- The `::18` suffix on some readings (e.g., `Luke 17:11-37::18`) appears to be a typo — use the base reference without it
- For copyrighted translations (CSB, NIV, ESV), note they are not available on free APIs and suggest the user pull from their Bible app
