# intake-outreach: media mode

Find and wire media coverage into `_data/media.yml`, via the
search-media / search-media-critic worker–critic loop.

## 1. Build the search brief

- **Target given** (paper title, topic, or keyword): queries for that target
  plus name queries ("Gabriel Lade" + target).
- **No target (full sweep)**: every paper title in `_data/publications.yml`
  + all six topic labels from `_data/outreach_topics.yml` + name queries,
  bounded "since `<date of newest media.yml entry>`".

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
from the fetched page).

## 3. Human approval

- **VERIFIED items**: AskUserQuestion, `multiSelect: true` — label = title,
  description = source · date · tags · tier. Batch 4 per question.
- **UNVERIFIABLE items**: separate question — "verify manually in your
  browser / include anyway / drop" per item.
- **Excluded list**: show as text below the questions so the human can
  rescue a wrongly excluded item.
- Tier-2 and Tier-UNKNOWN items: mention the tier in the option description;
  Tier notes carry into the PR body.

## 4. Publish

Approved list → `publish.md`.
