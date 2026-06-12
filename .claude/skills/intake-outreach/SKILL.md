---
name: intake-outreach
description: Intake pipeline for Swank Program outreach content. Subcommands - newsletter (Substack diff/wire), media (web search for coverage), presentations, policy-briefs (manual entry), or bare for a full parallel sweep. Worker-critic verified, human-approved, ships as a PR assigned to Gabe with a Netlify preview.
argument-hint: "[newsletter|media|presentations|policy-briefs] [title, url, or topic]"
---

# intake-outreach

Pipeline for wiring outreach content into the website's `_data/*.yml` files.
Binding rules: `.claude/rules/workflow.md` (git discipline, worker–critic
protocol, human checkpoints) and `.claude/rules/data-formats.md`.

## Parse arguments

`$ARGUMENTS`: first token selects the mode; the remainder is the target.

| First token | Mode | Detail file (read it, follow it) |
|---|---|---|
| `newsletter` | Substack diff/wire | `newsletter.md` |
| `media` | Web search for coverage | `media.md` |
| `presentations` | Manual entry | `manual-entry.md` |
| `policy-briefs` | Manual entry | `manual-entry.md` |
| *(none)* | Full sweep | "Bare mode" below |
| a `substack.com` URL | newsletter mode, that URL as target | `newsletter.md` |
| anything else | Ask the user which mode they meant | — |

All detail files live in this directory. Every mode ends with `publish.md`.

## Shared protocol (every mode)

```
scout/gather → critic (score ≥ 90, max 3 rounds)
  → HUMAN APPROVAL (AskUserQuestion, multiSelect)
  → publish.md: branch → yaml-wirer → wiring-critic → bin/check → PR to Gabe
```

- Run worker→critic loops with the Agent tool: dispatch the worker, pass its
  output verbatim to the critic, read the critic's `Final: <N>` score. If
  < 90 and rounds < 3, re-dispatch the worker with the critic's full report
  appended. Track the round count yourself.
- After 3 rounds below 90: stop. Present the best version to the human with
  the remaining deductions listed. The human decides.
- **Never skip the human gate.** No YAML edit, commit, or PR without
  explicit approval. The publish gate question comes before any git action.
- AskUserQuestion caps at 4 options per question: batch candidates 4 per
  question; above ~8 candidates, list them numbered in text and ask for
  numbers instead.

## Bare mode (full sweep)

Run the independent legs in parallel, then converge on ONE approval and ONE
PR:

1. **Same turn, in parallel**: dispatch the `search-media` agent (full-sweep
   brief per `media.md`), AND inline-fetch the Substack feed + diff per
   `newsletter.md` steps 2–4, AND read `miscellany/outreach-to-add.md` for
   queued manual items.
2. Run the search-media-critic loop on the media candidates (per `media.md`).
3. Consolidate everything into per-category AskUserQuestion approvals
   (newsletters, media, presentations, policy briefs — only categories with
   candidates).
4. One branch `intake/YYYY-MM-DD-sweep`, one yaml-wirer dispatch covering
   all files, one wiring-critic pass (with the newsletter addendum), one PR
   titled `Outreach intake YYYY-MM-DD` — per `publish.md`.

## Human checkpoint inventory

Defined in `rules/workflow.md` §Human-in-the-loop; the five gates are:
candidate selection · low-confidence tags · UNVERIFIABLE items · publish
gate · new-topic escalation (never edit `outreach_topics.yml`; put the
question in the PR body for Gabe).
