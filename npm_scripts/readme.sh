#!/bin/bash -e

# Obtain the current working branch name in git
branch="$(git rev-parse --abbrev-ref HEAD)"
echo Update README TravisCI status to branch: "${branch}"

# Search and replace the branch name in the README's TravisCI status URL
sed -i '' 's/branch=[^/]*)/branch='${branch}')/g' README.md

# If README has changed, commit the change - otherwise exit script without error
git add README.md
git diff --quiet --exit-code --cached || git commit -m "Update README TravisCI status to current branch."

# Push the committed change to the branch
git push origin ${branch}
