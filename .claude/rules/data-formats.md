# Canonical Data Formats (`_data/*.yml`)

`bin/check` is the schema authority. This file covers what it can't check:
style, normalization, and insertion rules.

## Entry formats (copy these exactly)

```yaml
# newsletters.yml / presentations.yml  (no `source` field)
- title: "The Rural-Urban Fringe Is Growing"
  url: "https://gelade1.substack.com/p/the-rural-urban-fringe-is-growing"
  date: "January 2026"
  topics: [rural-urban]

# media.yml / policy_briefs.yml  (require `source` = outlet name)
- title: "Data Centers Bring Money and Pushback"
  url: "https://spectrumnews1.com/oh/toledo/news/2026/02/19/data-centers-bring-money-and-pushback"
  source: "Spectrum News 1"
  date: "February 2026"
  topics: [energy-land-use, rural-urban]
```

## Rules

- **Newest first.** Insert new entries at the top (below the header
  comments), ordered by date among themselves. Never reorder, reword, or
  delete existing entries; never touch the header comments.
- **Quote** `title`, `url`, `source`, `date`. Topics are an unquoted,
  **comma-separated flow array** of valid slugs: `[biofuels, agriculture]`.
- **Dates** are display strings, `"Month YYYY"` (e.g. `"March 2026"`).
  Normalize anything else: `Mar 10, 2026` → `"March 2026"`;
  ISO `2026-03-10` → `"March 2026"`.
- **Blank line** between entries, matching the existing files.

## Normalization traps (especially from `miscellany/outreach-to-add.md`)

- **Semicolon arrays**: `[energy-land-use; rural-urban]` parses as ONE
  invalid slug. Convert to `[energy-land-use, rural-urban]`.
- **URLs**: strip tracking params (`utm_*`, `fbclid`, `ref`, `r`) and
  fragments. Substack canonical form is `https://gelade1.substack.com/p/<slug>`
  (no query string).
- **Curly quotes in titles** are fine (keep what the source published), but
  the YAML quoting must stay double-quoted.

## Dedup keys

- Same `url` as an existing entry → duplicate.
- Same normalized `(title, source)` → duplicate (likely syndication; see
  `media-inclusion-criteria.md`).
