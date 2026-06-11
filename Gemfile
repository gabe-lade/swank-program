source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-feed"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"

# Local-dev only. GitHub Pages builds via the jekyll-build-pages action and
# ignores this Gemfile, but `github-pages` pins Jekyll 3.x, which needs these
# libraries that Ruby 3.4+/4.0 dropped from the default gem set. Required to run
# `bundle exec jekyll serve` locally on a modern Ruby.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
gem "webrick"
