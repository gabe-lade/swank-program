# Swank Program website — working guide

Jekyll site for the C. William Swank Program in Rural-Urban Policy (OSU),
deployed to **production GitHub Pages directly from `main`** (no staging).
Live: https://gabe-lade.github.io/swank-program/ · `baseurl: /swank-program`.

The current design is considered **done and approved**. Routine updates are
data-file edits only — they must not change layout, CSS, or markup. Follow the
recipes below; anything beyond them (new page types, design changes) should be
proposed to Gabe first.

## How the site is put together

- **One stylesheet**: `assets/css/style.css`. Every redesigned page's styles
  are scoped under a wrapper class so generic class names never collide:
  `.home` (index) · `.data-tools` (/data/) · `.outreach-hub` (/outreach/) ·
  `.list-page` (4 outreach sub-pages) · `.people-page` · `.research-page` ·
  `.insight-page` (data-insight layout). Add new rules **inside the right
  scope**, never as bare global selectors.
- **Fonts** load once in `_layouts/default.html` (Source Serif 4, Public Sans,
  IBM Plex Mono, Inter). Accent red is `#BB0000` (`--accent`, per-scope).
- **Layouts**: `default` (shell: nav, footer, head) and `data-insight`
  (the four interactive-map pages, fully front-matter-driven).
- **Nav/footer**: `_includes/nav.html`, `_includes/footer.html` — shared by
  every page; never paste header/footer markup into a page.
- All list-style content lives in `_data/*.yml` and is **hand-ordered newest
  first**; "latest" anywhere on the site = the first entry. There are no
  Jekyll collections.

## Recipes (routine updates — data files only)

**Add a newsletter post** → prepend to `_data/newsletters.yml`:
`title` (title-case), `url`, `date` ("Month YYYY"), `topics` (slugs from
`_data/outreach_topics.yml`). Homepage "Latest outreach", the outreach hub
card, and /outreach/newsletter/ all update automatically.

**Add media / presentation / policy fact / op-ed** → prepend to
`_data/media.yml` (has `source`), `_data/presentations.yml`,
`_data/policy_facts.yml` (has `summary`), or `_data/other_policy_writings.yml`.
Same field pattern; same automatic propagation. Policy briefs go in
`_data/policy_briefs.yml` (currently empty; the page shows a "summer 2026"
note until it has entries).

**Add a publication** → `_data/publications.yml` under `working:` or
`published:` with `title, authors, year, topic, venue, paper` and optional
`code`. The topic-filter chips on /research/ are built from the distinct
`topic` values. Author bolding is automatic for "G. Lade" / "Lade, G.".

**Add or edit a person** → `_data/people.yml` under `faculty / students /
affiliates / advisory_board`. `photo` and `website` are optional — advisory
members without a photo automatically get a monogram avatar (do NOT point at
`placeholder.svg`). Photos live in `assets/images/people/`.

**Add a data tool** → append to `_data/tools.yml` with the full field set
(see file header). The homepage band shows only the **first four** entries
(`limit: 4`); /data/ shows all, with the `featured: true` entry in the banner.
`topics` must match the /data/ filter chips exactly (Housing, Land use,
Agriculture, Taxes, Urbanization). Thumbnail: 800×450 JPG in
`assets/images/tools/` — screenshot the tool's live map/dashboard.

**Add a data-insight page** → new `data-insights/{slug}.md` with
`layout: data-insight` and front matter only (no body). Copy an existing page
(e.g. `ohio-tax-explainer.md`) as the template: `eyebrow, topic, title,
subtitle, updated, authors, stats (optional), stats_note, intro,
blocks [heading | para | labelledBullets | map], use_cite, citation,
download (optional), related (optional), sources, correction (optional)`.
Map blocks reference the embed HTML under `assets/data-insights/{slug}/`;
add `frame_id` + `autoresize: true` if the embed should size to its content.
Also add the page to the nav dropdown in `_includes/nav.html` and, if it's a
tool, to `_data/tools.yml`.

## Hard rules

- **Never edit `assets/data-insights/**`** — the interactive map/dashboard
  asset HTML is generated elsewhere and is content, not site code.
- **No Liquid tags inside HTML comments.** Jekyll parses `{% %}` even in
  `<!-- -->` (a literal `{% else %}` in a comment once broke the production
  build). Use `{% comment %}` blocks or plain prose.
- **Topics are a controlled vocabulary** — slugs from
  `_data/outreach_topics.yml`. Adding a new topic there adds it site-wide.
- **Card grids**: use `minmax(min(Npx, 100%), 1fr)` for any new grid so it
  can't overflow narrow phones.
- **Dark backgrounds**: the global `h1–h4 { color: … }` rule beats inherited
  card colors — set heading colors explicitly on dark bands.
- Don't reword computed stats, source notes, or citations on insight pages
  without Gabe's sign-off.

## Verifying changes (local `jekyll` does NOT run here)

Local builds are broken (system Ruby 2.6 vs `github-pages`' `ffi ≥ 3.0`
requirement) — do not spend time on `bundle exec jekyll serve`. Instead:

1. Validate YAML: `ruby -ryaml -e 'YAML.load_file("_data/FILE.yml")'`.
2. Strict-parse Liquid across all templates (gem `liquid` 4.0.4 is installed
   for the user account; stub `include/seo/feed_meta` tags).
3. For visual changes, render the affected fragment against the real
   stylesheet and screenshot with headless Chrome (window width ≥ 500 — it
   clamps below that).
4. Push to `main`, then **watch the "Deploy Jekyll site to Pages" action**.
   If the build step passes but deploy fails with "Deployment failed, try
   again later", it's a transient GitHub error — `gh run rerun <id> --failed`.
5. Spot-check the live page after deploy (hard-refresh for CSS changes).
