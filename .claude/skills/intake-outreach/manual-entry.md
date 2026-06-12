# intake-outreach: presentations & policy-briefs (manual entry)

These have no scout — content comes from the user or the queue.

Schema reminder (`bin/check` is authoritative):
- `presentations.yml`: `title`, `url`, `date` — **no `source` field**.
- `policy_briefs.yml`: `title`, `url`, `source`, `date`.

## Gather candidates, in this order

1. **From `$ARGUMENTS`** — a URL or pasted details.
2. **From the queue** — the matching section of
   `miscellany/outreach-to-add.md` (including its "Raw links" section).
3. **From the user** — ask conversationally to paste title/URL/date/etc.
   (free-form gathering is conversational; decisions use AskUserQuestion).

## Verify and complete

For each candidate, WebFetch the URL:
- confirm it is live and matches the claimed title;
- fill blank fields from the page (title, date, outlet for briefs);
- if the fetch is blocked, mark it UNVERIFIABLE for the human gate.

Never invent a field. A candidate with an unfillable required field goes
back to the user as a question, not into the YAML.

Propose topics per `.claude/references/topic-tagging.md`.

## Approve and publish

AskUserQuestion (`multiSelect: true`) listing each candidate with its
filled fields and tags. Then → `publish.md`.
