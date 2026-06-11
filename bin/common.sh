# Shared setup for bin/serve and bin/build. Sourced, not run directly.
#
# Does three things:
#   1. Puts a Ruby that can run the GitHub Pages stack on PATH (prefers 3.3).
#   2. Installs gems into vendor/bundle on first run.
#   3. Picks a _site destination — OUTSIDE the repo when it lives in a
#      cloud-synced folder, because OneDrive/Dropbox/iCloud/Drive race the build
#      tool and corrupt the output. Override with SWANK_SITE_DIR=/path.

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# --- Ruby -------------------------------------------------------------------
# `github-pages` pins Jekyll 3.x + liquid 4.0.4, which break on Ruby 4.x, so we
# prefer Homebrew's 3.3/3.2 keg if present. Falls back to whatever is on PATH.
if command -v brew >/dev/null 2>&1; then
  for _v in ruby@3.3 ruby@3.2 ruby; do
    _p="$(brew --prefix "$_v" 2>/dev/null || true)"
    if [ -n "$_p" ] && [ -x "$_p/bin/ruby" ]; then
      PATH="$_p/bin:$PATH"
      break
    fi
  done
fi
export PATH

if ! command -v bundle >/dev/null 2>&1; then
  echo "error: 'bundle' not found." >&2
  echo "       Install Ruby 3.3 (macOS: brew install ruby@3.3) and 'gem install bundler'." >&2
  exit 1
fi

# --- Gems -------------------------------------------------------------------
bundle config set --local path 'vendor/bundle' >/dev/null 2>&1 || true
if ! bundle check >/dev/null 2>&1; then
  echo "Installing gems into vendor/bundle (first run, ~1 min)…"
  bundle install
fi

# --- Build destination ------------------------------------------------------
case "$REPO_ROOT" in
  *CloudStorage*|*OneDrive*|*Dropbox*|*"Google Drive"*|*"Mobile Documents"*)
    SITE_DIR="${SWANK_SITE_DIR:-$HOME/.cache/swank-program/_site}"
    SITE_NOTE="repo is in a cloud-synced folder → building _site to $SITE_DIR (outside sync)"
    mkdir -p "$SITE_DIR"
    ;;
  *)
    SITE_DIR="${SWANK_SITE_DIR:-$REPO_ROOT/_site}"
    SITE_NOTE=""
    ;;
esac
export REPO_ROOT SITE_DIR SITE_NOTE
