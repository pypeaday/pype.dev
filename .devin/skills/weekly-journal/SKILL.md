---
name: weekly-journal
description: Scaffold and populate weekly men's group journal entries for Olivet Baptist Church — creates pages/notes/olivet-mens-group-{year}-week-{num}.md with scripture blocks, reading checklist, per-day Reflection sections, and a weekly HEAR journal. Fetches verse text from the ESV API (key in ~/dotfiles/private/.esv.key), falling back to the Free Use Bible API (BSB). Also handles restructure-the-template requests for the men's group page format.
---

# Weekly Journal Skill

Scaffold and populate weekly men's group journal entries for Olivet Baptist Church.

## Template

The spec below is authoritative — NOT any week file on disk. Week files drift and collect the user's journal notes. If the newest week file differs from this spec, follow the spec and tell the user about the difference.

```markdown
---
date: {meeting Friday} 06:00:00
templateKey: note
title: Men's Group - Week {N}
published: True
tags:
  - olivet
  - faith
  - mens-group
---

# Week {N} — {Month D} – {D, YYYY}   (Sunday–Saturday range)

### Meeting: Friday, {Month D}

### Memory Verse: {reference}

!!! scripture "{reference}"

    {v}. {memory verse text}

## Readings

- [ ] Day 1: {passage}
- [ ] Day 2: {passage}
- [ ] Day 3: {passage}
- [ ] Day 4: {passage}
- [ ] Day 5: {passage}

---

## Day 1 — {passage}

??? scripture "{Book Chapter}"

    {numbered verses}

### Reflection

## Day 2 — {passage}

(...same shape: scripture block(s) per chapter, then `### Reflection`)

## HEAR Journal

### Highlight

### Explain

### Apply

### Respond

---

## Prayer Requests

- [ ] <name> — <request>

### Answered / Updates

- <follow-ups from previous weeks>

## Meeting Notes

<what the group discussed, insights from others>

_{ESV attribution line — only when ESV text was used; see Fetching Bible Verses}_
```

## When Creating a New Week

1. Get from the user ONLY what can't be inferred:
   - The 5 daily reading passages
   - Memory verse reference
   Then infer everything else from the newest `pages/notes/olivet-mens-group-{year}-week-*.md`:
   - Week number = previous week + 1
   - Date range = previous range + 7 days. Weeks run **Sunday–Saturday** (e.g. "October 25 – 31, 2026")
   - Meeting = the Friday inside that range; frontmatter `date:` = that Friday at 06:00:00

2. Generate the file at `pages/notes/olivet-mens-group-{year}-week-{num}.md`

3. Fill the page in completely per the Template above:
   - Memory verse: full text in a `!!! scripture` block
   - Every `## Day N` gets the passage's verses in `??? scripture` blocks (one block per chapter or sub-range)
   - Leave `### Reflection`, the four HEAR prompts, Prayer Requests, and Meeting Notes EMPTY — those are the user's to write
   - NEVER 4-space-indent journal text outside scripture blocks — top-level indents render as code blocks; verses quoted under `###` sections go at column 0 (numbered lists preserve verse numbers)
   - If ESV text was used, append the attribution line at the bottom of the page

## Changing an Existing Week

Restructure in place — NEVER regenerate a week file that already exists. The user writes in these pages between meetings.

Before editing:
- `git status --short <file>` + `git log --oneline -- <file>` for committed user edits
- `git diff <file>` for uncommitted edits — git only knows what was committed, so a clean diff does NOT prove the file is untouched
- `ls ~/.local/state/nvim/swap/ | grep <basename>` for a live editor session (see the nvim-swap gotcha in `~/.config/devin/docs/ENVIRONMENT.md`)

When restructuring:
- Carry text the user wrote under old headings into the matching new sections before deleting the old headings
- Verify with `git diff <file> | grep '^-'` that only old headings and boilerplate were removed
- If an editor still has the file open, warn the user: unsaved buffer text exists only in that process's memory — have them `:e` reload before saving over your edits

## Fetching Bible Verses

Fetch and embed every passage — the user shouldn't have to paste scripture.

### Preferred: ESV

The user's translation is ESV, via `https://api.esv.org/v3/passage/text/`. Key: `$ESV_API_KEY`, else `~/dotfiles/private/.esv.key` (gitignored — never echo it). Send the token via a curl `--config -` stdin header so it never appears in argv:

```bash
curl -sSf -G "https://api.esv.org/v3/passage/text/" \
  --config - \
  --data-urlencode "q={reference}" \
  --data-urlencode "include-verse-numbers=true" \
  --data-urlencode "include-headings=false" \
  --data-urlencode "include-footnotes=false" \
  --data-urlencode "include-passage-references=false" <<'EOF'
header = "Authorization: Token KEY_HERE"
EOF
```

- Accepts aliases, verse ranges, whole chapters, and multi-chapter refs in one query (`q=1 Thessalonians 3-5`). `;`-separated refs are NOT supported — split `Acts 18:18-28; 19` into two queries.
- Verses come back bracketed (`[58] text…`) inside `passages[0]` — renumber to the `N. text` block format below.
- **ESV is copyrighted and week pages are published**: append this line once at the bottom of any page containing ESV text:
  `Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.`
- The user's nvim has `:Bible <ref>` (`<leader>bi`) for their own one-off inserts — it emits a blockquote with attribution, not the `??? scripture` block format.

### Fallback: BSB

Use only when no ESV key is available (public domain — no attribution needed).

```
GET https://bible.helloao.org/api/BSB/{BOOK_CODE}/{CHAPTER}.simple.json
```

Book codes: GEN, EXO, LEV, NUM, DEU, JOS, JDG, RUT, 1SA, 2SA, 1KI, 2KI, 1CH, 2CH, EZR, NEH, EST, JOB, PSA, PRO, ECC, SOS, ISA, JER, LAM, EZK, DAN, HOS, JOE, AMO, OBA, JON, MIC, NAM, HAB, ZEP, HAG, ZEC, MAL, MAT, MRK, LUK, JHN, ACT, ROM, 1CO, 2CO, GAL, EPH, PHP, COL, 1TH, 2TH, 1TI, 2TI, TIT, PHM, HEB, JAS, 1PE, 2PE, 1JN, 2JN, 3JN, JUD, REV

Parse `chapter.content[]` items where `type === "verse"`; extract `number` and `text`.
- The API returns whole chapters only — for a range like `Acts 18:18-28` or a single memory verse, filter verses by `number`.
- Poetry verses contain `\n` inside `text` — replace each with `\n    ` so continuation lines stay inside the indented block.

**Output format for scripture blocks:**
```markdown
??? scripture "Reference"

    1. Verse text one.
    2. Verse text two.
    3. Verse text three.
```

Use `!!! scripture` for the memory verse block at the top of the page.

## Notes

- The `::18` suffix on some readings (e.g., `Luke 17:11-37::18`) appears to be a typo — use the base reference without it
