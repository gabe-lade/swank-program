#!/usr/bin/env bash
# PreToolUse guard for the Swank Program website.
#
# Two jobs:
#   1. Edit/Write — block changes to deploy-critical / Gabe-gated files.
#   2. Bash       — enforce git discipline: no commits/pushes/merges on main,
#                   no force pushes, no merging PRs (only Gabe merges).
#
# Exit 0 = allow. Exit 2 = block; stderr is shown to Claude as the reason.
set -u

INPUT=$(cat)
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

if command -v jq >/dev/null 2>&1; then
  TOOL_NAME=$(printf '%s' "$INPUT" | jq -r '.tool_name // empty')
  FILE_PATH=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty')
  COMMAND=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty')
else
  TOOL_NAME=$(printf '%s' "$INPUT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_name",""))')
  FILE_PATH=$(printf '%s' "$INPUT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))')
  COMMAND=$(printf '%s' "$INPUT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))')
fi

block() {
  echo "BLOCKED: $1" >&2
  exit 2
}

# --- File guard (Edit / Write) ------------------------------------------
if [ "$TOOL_NAME" = "Edit" ] || [ "$TOOL_NAME" = "Write" ]; then
  [ -z "$FILE_PATH" ] && exit 0

  PROTECTED_PATTERNS=(
    '\.claude/settings\.json$'
    '\.github/workflows/'
    'netlify\.toml$'
    '_config\.yml$'
    '_data/outreach_topics\.yml$'
    'CNAME$'
  )
  for pattern in "${PROTECTED_PATTERNS[@]}"; do
    if printf '%s' "$FILE_PATH" | grep -qE "$pattern"; then
      block "'$FILE_PATH' is Gabe-gated (deploy config or topic vocabulary). \
Get Gabe's explicit sign-off, then the user can edit it manually or lift this guard."
    fi
  done
  exit 0
fi

# --- Git guard (Bash) ----------------------------------------------------
if [ "$TOOL_NAME" = "Bash" ]; then
  [ -z "$COMMAND" ] && exit 0

  # Never push to main/master, never force-push, never merge PRs (Gabe merges).
  if printf '%s' "$COMMAND" | grep -qE 'git push[^|;&]*\b(main|master)\b'; then
    block "pushing to main/master is not allowed. Push your branch and open a PR for Gabe."
  fi
  if printf '%s' "$COMMAND" | grep -qE 'git push[^|;&]*(--force|-f\b)'; then
    block "force-pushing is not allowed on this repo."
  fi
  if printf '%s' "$COMMAND" | grep -qE 'gh pr merge'; then
    block "merging PRs is Gabe's call. Assign gabe-lade as reviewer and stop there."
  fi

  # No commits/merges while sitting on main.
  if printf '%s' "$COMMAND" | grep -qE 'git (commit|merge|push)\b'; then
    CURRENT_BRANCH=$(git -C "$PROJECT_DIR" branch --show-current 2>/dev/null || echo "")
    if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
      block "you are on '$CURRENT_BRANCH'. Create a branch first \
(intake/YYYY-MM-DD-topic for outreach content, your-name/topic otherwise)."
    fi
  fi
  exit 0
fi

exit 0
