#!/usr/bin/env bash
# PostToolUse hook: after any Edit/Write to _data/*.yml, run bin/check.
#
# On validation failure, the check output goes to stderr with exit 2 so the
# errors are fed back to Claude as instructions to fix. The edit itself is
# not undone. Writes nothing to disk (OneDrive-safe), never builds Jekyll.
set -u

INPUT=$(cat)
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

if command -v jq >/dev/null 2>&1; then
  FILE_PATH=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty')
else
  FILE_PATH=$(printf '%s' "$INPUT" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))')
fi

# Only act on the outreach data files.
printf '%s' "$FILE_PATH" | grep -qE '_data/[^/]+\.yml$' || exit 0

OUTPUT=$(ruby "$PROJECT_DIR/bin/check" 2>&1)
STATUS=$?

if [ $STATUS -ne 0 ]; then
  {
    echo "bin/check failed after editing $FILE_PATH — fix these before continuing:"
    echo "$OUTPUT"
  } >&2
  exit 2
fi
exit 0
