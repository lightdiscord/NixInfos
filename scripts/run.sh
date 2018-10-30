#!/usr/bin/env nix-shell
#! nix-shell -i bash

set -e

TYPE=$1
BRANCH=$2

FILE=result/$TYPE/$BRANCH

nix-build scripts/$TYPE.nix -I channel=~/.nix-defexpr/channels/$BRANCH -o $FILE
cp -L $FILE $FILE.tmp
mv $FILE.tmp $FILE
sha256sum $FILE | cut -f1 -d' ' > $FILE.checksum

echo $BRANCH >> result/$TYPE/entries
