# intake-outreach: media mode

Find and wire media coverage into `_data/media.yml`, via the
search-media / search-media-critic worker–critic loop.

## 1. Build the search brief

The remainder of `$ARGUMENTS` (after `media`) is the target/scope:

- **`papers`**: scope the sweep to the paper titles in
  `_data/publications.yml` + name queries.
- **`newsletters`**: scope the sweep to the post titles and topics in
  `_data/newsletters.yml` + name queries — coverage that picks up or
  discusses Lade's newsletter analyses (often adapted into op-eds/columns).
- **A specific paper title, topic, or keyword**: queries for that target
  plus name queries ("Gabriel Lade" + target).
- **No target (full sweep)**: name queries + all six topic labels from
  `_data/outreach_topics.yml` + every paper title in `_data/publications.yml`
  + every post title/topic in `_data/newsletters.yml`, bounded "since
  `<date of newest media.yml entry>`".

Include in the brief: the current contents of `_data/media.yml` (dedup) and
the path `.claude/rules/media-inclusion-criteria.md`.

## 2. Worker–critic loop (constants from rules/workflow.md)

1. Agent tool → `search-media` with the brief.
2. Agent tool → `search-media-critic` with the worker's candidate list
   passed verbatim.
3. Score < 90 and rounds < 3 → re-dispatch `search-media` with the critic's
   full report appended. Max 3 rounds; then proceed with the best version
   and surface the remaining deductions to the human.

Don't forget: also check `miscellany/outreach-to-add.md` for queued media
items — they join the candidate pool (the critic verifies them like any
other candidate; queue entries often have blank `source` fields to fill
from the fetched page). Tag queued items `origin: queue` (scout finds are
`origin: scout`) when handing the pool to the critic: a queue item that
fails a gate is the human's call, so the critic routes it to the human at
−0 rather than scoring the batch down.

## 3. Human approval

- **VERIFIED items**: AskUserQuestion, `multiSelect: true` — label = title,
  description = source · date · tags · tier · **the full URL** (so the human
  can click through to the page before choosing). Batch 4 per question.
- **UNVERIFIABLE items**: separate question — "verify manually in your
  browser / include anyway / drop" per item.
- **Excluded list**: show as text below the questions so the human can
  rescue a wrongly excluded item.
- Tier-2 and Tier-UNKNOWN items: mention the tier in the option description;
  Tier notes carry into the PR body.

## 4. Publish

Approved list → `publish.md`.
