#!/bin/sh
set -eu
npm run build -- --base=/portafolio/
for project in scheduling-optimization live-trace-explorer; do
  mkdir -p "dist/work/$project"
  cp dist/index.html "dist/work/$project/index.html"
done
touch dist/.nojekyll
