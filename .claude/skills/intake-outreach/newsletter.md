# intake-outreach: newsletter mode

Wire Substack posts from `https://gelade1.substack.com` into
`_data/newsletters.yml`.

## With a target (title or URL)

1. If a URL: WebFetch it directly. If a title: fetch the feed (step 2) and
   find the matching post; if not in the feed window, try the archive API.
2. Confirm the post is not already in `newsletters.yml` (canonical URL
   match). If it is, tell the user and stop.
3. Continue at step 4 below with this single candidate.

## Without a target (diff mode)

1. WebFetch `https://gelade1.substack.com/feed` (RSS: title, link, pubDate).
   **Limitation: RSS returns only the ~20 most recent posts.**
2. For deeper backfill, also fetch
   `https://gelade1.substack.com/sitemap.xml` and, if needed,
   `https://gelade1.substack.com/api/v1/archive?sort=new&offset=0&limit=50`
   (paginate by `offset`; this endpoint is undocumented — if it fails, fall
   back to RSS-only and tell the human the diff covers only the last ~20
   posts).
3. Normalize all URLs to canonical `https://gelade1.substack.com/p/<slug>`
   (strip query strings) and diff against `newsletters.yml` **and** the
   queue file `miscellany/outreach-to-add.md` (queued items are candidates
   too — merge, don't duplicate).
4. For each missing post: WebFetch the post page; convert pubDate →
   `"Month YYYY"`; propose topics per `.claude/references/topic-tagging.md`.
   Note tag confidence.
5. Present candidates via AskUserQuestion (`multiSelect: true`): option
   label = post title (truncated), description = date · proposed tags.
   Batch 4 per question. Follow-up question only for low-confidence tags.
6. Hand the approved list to `publish.md`. The wiring-critic must be told
   this is a **newsletter batch** so it applies its feed-diff addendum.
