# Swank Program in Rural-Urban Policy — website

Source for the [C. William Swank Program in Rural-Urban Policy](https://gabe-lade.github.io/swank-program/)
website. A [Jekyll](https://jekyllrb.com/) site served by GitHub Pages.

## Tech stack

- **Jekyll 3.10** via the `github-pages` gem — the exact stack GitHub Pages builds with.
- **Data-driven:** pages render from YAML in `_data/`; layouts in `_layouts/`, shared
  partials in `_includes/`, styles in `assets/css/style.css`.
- **No JS framework.** The outreach topic filter is one dependency-free script
  (`assets/js/outreach-filter.js`).

## Local development

### Prerequisites

- **Ruby 3.x** (3.3 recommended — matches the Pages stack). macOS: `brew install ruby@3.3`.
  The `github-pages` gem does **not** run on Ruby 4.x.
- **Bundler:** `gem install bundler` (ships with Homebrew Ruby).

> **Clone outside cloud-synced folders.** OneDrive / Dropbox / iCloud / Google Drive
> race the build tool and corrupt the generated `_site/`. A plain local clone
> (e.g. `~/code/swank-program`) avoids this. If your clone *must* live inside a
> synced folder, the helper scripts detect it and build `_site` to
> `~/.cache/swank-program/_site` instead — set `SWANK_SITE_DIR` to override.

### Commands

```bash
bin/serve     # install gems (first run), build, serve with live reload
bin/build     # one-shot production-parity build
bin/check     # validate the outreach data files — run before opening a PR
```

`bin/serve` opens at <http://127.0.0.1:4000/swank-program/>; edits to pages, data,
and CSS reload automatically. Gems install into `vendor/bundle/` (gitignored) — nothing
is installed system-wide.

## Content workflow

**Never commit to `main`.** Work on a branch and open a pull request — every PR builds
an automatic preview for review.

```bash
git switch -c your-name/short-description
# …edit…
bin/check && bin/serve      # validate, then review locally
git add -p && git commit
git push -u origin HEAD      # then open a PR
```

### Adding outreach items

Each outreach item is one YAML entry under `_data/`:

| File | Shown under | Required fields |
|------|-------------|-----------------|
| `newsletters.yml`   | Newsletter (Substack) | `title`, `url`, `date`, `topics` |
| `presentations.yml` | Presentations         | `title`, `url`, `date`, `topics` |
| `policy_briefs.yml` | Policy Briefs         | `title`, `url`, `source`, `date`, `topics` |
| `media.yml`         | Recent Media          | `title`, `url`, `source`, `date`, `topics` |

- `date` is a display string: **`Month YYYY`** (e.g. `March 2026`). List newest first.
- `topics` are slugs from the controlled vocabulary in `_data/outreach_topics.yml`:
  `biofuels`, `property-tax`, `rural-urban`, `agriculture`, `water-environment`,
  `energy-land-use`. Adding a topic means editing that file — agree on it first.
- **Never invent** titles, URLs, dates, or sources; every item must trace to a real
  source. `bin/check` catches missing fields and unknown topic slugs.

## Project structure

```
_config.yml        site configuration
_data/             content: people, publications, newsletters, media, topics…
_includes/         shared partials (nav, footer, outreach-filter)
_layouts/          default + page layouts
assets/            css, js, images, data-insights widgets
outreach/          per-type outreach pages (newsletter, presentations, …)
index.html *.md    top-level pages
bin/               dev helper scripts (not published)
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with the
`jekyll-build-pages` action and deploys to GitHub Pages. That action uses its own
`github-pages` gem and **ignores the local `Gemfile`**, which exists only for local
development.
