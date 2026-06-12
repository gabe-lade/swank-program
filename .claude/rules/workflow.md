# Workflow Rules

These rules bind every agent and every skill in this repo. The skill files
reference them; do not duplicate them elsewhere.

## Git discipline (hook-enforced, but know them anyway)

1. **Branch first, always.** No commit, merge, or push on `main` — for any
   purpose, including exploration. Branch names: `intake/YYYY-MM-DD-<mode>`
   for outreach content, `<your-name>/<topic>` otherwise.
2. **Every branch lands via PR**:
   `gh pr create --reviewer gabe-lade --assignee gabe-lade`. Netlify renders
   a preview on the PR automatically.
3. **Never merge a PR.** Merging `main` deploys the live site; that is Gabe's
   call, always. Close your loop by reporting the PR URL.
4. **No force pushes.**
5. **Gabe-gated files** (hook blocks edits; get his sign-off first):
   `_config.yml`, `.github/workflows/*`, `netlify.toml`,
   `_data/outreach_topics.yml`, `.claude/settings.json`, layouts.

## Worker–critic protocol

- **Threshold: score ≥ 90. Max 3 rounds** per worker–critic pair per batch.
- Round flow: worker produces → critic scores with its deduction table →
  if < 90, re-dispatch the worker with the critic's full report appended.
- After 3 rounds below 90: STOP iterating. Present the best version to the
  human **with the remaining deductions listed**. Never silently ship a
  failing batch; never keep looping past 3.
- **Critics never create or edit files.** Workers never score themselves.
- **Hallucination is an auto-fail**: a claimed URL or fact the critic cannot
  trace to a real fetched page scores the batch to 0, regardless of other
  merits.
- **UNVERIFIABLE ≠ verified, UNVERIFIABLE ≠ rejected.** When a page can't be
  fetched (403, paywall, bot wall), the item is flagged for the human to
  check in a browser. Never guess either way.
- **Honest surfacing is not an error.** Deductions are for the worker's own
  mistakes — fabrication, misrepresenting a page, vouching for an item that
  fails a gate. An item the worker honestly surfaces and correctly flags for
  the human — a human-queued item that fails a gate, or an
  `UNVERIFIED-BY-WORKER` page — scores **−0 and routes to the human**; it
  never drags the batch below threshold.

## Human-in-the-loop checkpoints

Use AskUserQuestion (never act unilaterally) at:

1. **Candidate selection** — which scouted/queued items to wire in
   (multiSelect; batch 4 options per question, or fall back to a numbered
   text list above ~8 candidates). **Always show each item's URL** in the
   option (description, or the numbered line) so the human can click through
   to the source before deciding.
2. **Low-confidence topic tags** — when tagging is uncertain or queue tags
   were invalid.
3. **UNVERIFIABLE items** — "verify manually / include anyway / drop".
4. **Publish gate** — "open PR / commit to branch only / show diff first".
5. **New-topic escalation** — content that doesn't fit the six slugs: ask
   whether to use the nearest existing slug, and note the vocabulary
   question in the PR body for Gabe. Never edit `outreach_topics.yml`.

Free-form information gathering (e.g., "paste the presentation details") is
conversational; structured decisions use AskUserQuestion.

## Verification

- Run `bin/check` after every `_data/*.yml` edit (a PostToolUse hook also
  runs it — treat its stderr as instructions, not noise).
- If an Edit fails oddly, OneDrive may have locked the file mid-sync: retry
  once before investigating.
