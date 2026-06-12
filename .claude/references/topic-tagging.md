# Topic Tagging Guide

Slugs come from `_data/outreach_topics.yml` — the controlled vocabulary.
**Never invent a slug.** If nothing fits, escalate to the human (who
escalates to Gabe).

## Keyword → slug map

| Content about… | Slug |
|---|---|
| biofuels, ethanol, renewable diesel, RFS, LCFS, RINs | `biofuels` |
| property tax, levies, school funding, local government finance | `property-tax` |
| rural-urban change, the fringe, urbanization, demographics, migration | `rural-urban` |
| crops, farming, ag production, commodity prices, soybeans/corn | `agriculture` |
| water quality, nitrates, wells, drinking water, conservation | `water-environment` |
| energy siting, solar/wind, **data centers**, land use, zoning | `energy-land-use` |

## Heuristics

- Tag by **article substance**, not headline. 1–2 tags is typical; 3 max.
- Data-center content → `energy-land-use`, plus `rural-urban` when it's
  about community change, plus `water-environment` only when water use is a
  real theme of the piece. A standalone `data-center` slug is an open
  question for Gabe (see `miscellany/outreach-to-add.md`, "New topics?") —
  until he decides, use the mapping above.
- Soybean/commodity-price pieces driven by fuel policy get both
  `biofuels` and `agriculture`.
- Low confidence → propose tags and confirm with the human via
  AskUserQuestion; don't silently guess.
- Empty `topics: []` means the item is invisible to topic filters —
  only leave it empty if the human explicitly says so.
