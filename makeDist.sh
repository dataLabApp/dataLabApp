#!/bin/bash
# run this script ./makeDist.sh
# output appears in dist directory
# uses icon in build directory

./node_modules/.bin/electron-rebuild
 npm run dist

