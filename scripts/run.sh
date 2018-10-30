#!/usr/bin/env bash

set -e

TYPE=$1
BRANCH=$2

FILE=result/$TYPE/$BRANCH

nix-build -I channel=~/.nix-defexpr/channels/$BRANCH -o $FILE ./scripts/$TYPE.nix
cp -L $FILE $FILE.tmp
mv $FILE.tmp $FILE
sha256sum $FILE | cut -f1 -d' ' > $FILE.checksum

echo $BRANCH >> result/$TYPE/entries
