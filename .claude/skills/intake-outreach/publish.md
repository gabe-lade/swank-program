# intake-outreach: publish endgame

Runs only AFTER human approval of a candidate list. Output: a PR assigned
to Gabe. **You never merge it.**

## 1. Branch

1. `git status` — if the tree is dirty with unrelated changes, ask the user
   before proceeding.
2. `git checkout main && git pull`
3. `git checkout -b intake/YYYY-MM-DD-<mode>` (`-sweep` for bare mode).
   All wiring happens on this branch — the hook blocks commits on main, but
   branch-first is the rule regardless.

## 2. Wire and verify (worker–critic loop)

1. Agent tool → `yaml-wirer` with the approved list verbatim, the target
   file(s), and any human decisions on tags/UNVERIFIABLE items.
2. Agent tool → `wiring-critic` with the same approved list and the edited
   files. **Newsletter batches: tell the critic to apply its feed-diff
   addendum.**
3. Score < 90 and rounds < 3 → re-dispatch `yaml-wirer` with the critic
   report. (Wiring fixes are cheap; expect 1 round.)
4. Run `bin/check` yourself as final confirmation.

## 3. Publish gate (AskUserQuestion)

"Open PR now / commit to branch only / show me the full diff first."
Honor the answer.

## 4. PR

```
git add _data/ miscellany/ 2>/dev/null || git add _data/
git commit -m "Add N outreach items (newsletters: X, media: Y, ...)"
git push -u origin HEAD
gh pr create --reviewer gabe-lade --assignee gabe-lade \
  --title "Outreach intake YYYY-MM-DD" --body "<see below>"
```

(Note: `miscellany/` is gitignored — queue annotations stay local; the
`git add` of it will no-op. That's expected.)

PR body must contain:
- a table of added entries: title · file · date · topics · link;
- the final `bin/check` output;
- Tier-2 / Tier-UNKNOWN notes from the media criteria, if any;
- the "needs human browser check" list for UNVERIFIABLE items, if any;
- any new-topic question for Gabe (e.g., a standalone `data-center` slug);
- closing line: "Netlify preview below. @gabe-lade to review and merge."

## 5. Report

Give the user the PR URL and remind: merge (Gabe's) → GitHub Actions
deploys to the live site.
