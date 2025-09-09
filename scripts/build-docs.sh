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

echo "✅ Docs ready in ./docs"
