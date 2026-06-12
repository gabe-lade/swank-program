# Swank Program Website

Jekyll 3.10 site for the C. William Swank Program in Rural-Urban Policy
(Prof. Gabriel Lade, OSU AEDE). Served by GitHub Pages at
`gabe-lade.github.io/swank-program`. Merging `main` deploys the live site via
`.github/workflows/deploy.yml`. Netlify renders a preview on every PR.

## Governance — non-negotiable

- **Never commit or push to `main`.** All work — content, code, config, even
  exploration — happens on a new branch (`intake/…` for outreach content,
  `your-name/…` otherwise).
- **Every branch lands via a PR with Gabe (`gabe-lade`) assigned as reviewer.**
  Use `gh pr create --reviewer gabe-lade --assignee gabe-lade`. Only Gabe
  merges to `main`. Never merge a PR yourself.
- **Risky/important moves need Gabe's explicit sign-off before the PR is even
  opened**: `_config.yml`, `.github/workflows/*`, `netlify.toml`,
  `_data/outreach_topics.yml` (topic vocabulary), layouts, deletion of content.
  Hooks block edits to these files; that block is a feature, not an obstacle.
- **Human in the loop**: never wire content, commit, or open a PR without
  explicit approval via AskUserQuestion. Never invent titles, URLs, dates,
  sources, or topic slugs — every item must trace to a real, fetched source.

## Data model

All content is data-driven YAML in `_data/` (newest first, preserve the
header comments in each file):

| File | Shown under | Required fields |
|------|-------------|-----------------|
| `newsletters.yml`   | Newsletter (Substack) | `title`, `url`, `date` |
| `presentations.yml` | Presentations         | `title`, `url`, `date` |
| `policy_briefs.yml` | Policy Briefs         | `title`, `url`, `source`, `date` |
| `media.yml`         | Recent Media          | `title`, `url`, `source`, `date` |
| `publications.yml`  | Research              | manual edits only |
| `people.yml`        | People                | manual edits only |

- `date` is a display string: `"Month YYYY"` (e.g. `"March 2026"`).
- `topics` are slugs from `_data/outreach_topics.yml` (currently: `biofuels`,
  `property-tax`, `rural-urban`, `agriculture`, `water-environment`,
  `energy-land-use`). New slugs are Gabe's call — never add one inline.
- Gabe's Substack: `https://gelade1.substack.com`.

## Commands

- `bin/check` — validate `_data/*.yml` (fields + topic slugs). Run after
  every data edit; a PostToolUse hook also runs it automatically.
- `bin/serve` / `bin/build` — local dev. The repo lives in OneDrive, so
  `_site` builds to `~/.cache/swank-program/_site` (handled by `bin/common.sh`;
  do not look for `_site` in the repo).
- If an Edit fails oddly, OneDrive may have briefly locked the file — retry
  once before investigating.

## Outreach intake

- `/intake-outreach` is the pipeline for newsletters, media coverage,
  presentations, and policy briefs. Worker → critic (score ≥ 90, max 3
  rounds) → human approval → branch → wire → verify → PR.
- The local-only intake queue is `miscellany/outreach-to-add.md` (gitignored).
  Check it whenever doing outreach intake.

## Rules

@.claude/rules/workflow.md
@.claude/rules/data-formats.md
