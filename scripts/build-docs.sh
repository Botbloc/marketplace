#!/bin/bash
set -e  # exit if any command fails

# Remove old docs
rm -rf docs

# Build project (Next.js, etc.)
npm run build

# Move export folder to docs
mv out docs

# Required for GitHub Pages
touch docs/.nojekyll

# Add 404 fallback
cp docs/index.html docs/404.html

echo "✅ Docs ready in ./docs"
