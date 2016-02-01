#!/bin/bash -e
branch="$(git rev-parse --abbrev-ref HEAD)"
echo Update README TravisCI status to branch: "${branch}"
sed -i '' 's/branch=[^/]*)/branch='${branch}')/g' README.md
git add README.md
git commit -m "Update README TravisCI status to current branch."
git push origin ${branch}