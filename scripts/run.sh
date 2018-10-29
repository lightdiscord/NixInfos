#!/usr/bin/env nix-shell
#! nix-shell -i bash -p gzip

set -e

TYPE=$1
BRANCH=$2

FILE=result/$TYPE/$BRANCH

nix-build scripts/$TYPE.nix -I channel=~/.nix-defexpr/channels/$BRANCH -o $FILE
cat $FILE | gzip -9 > $FILE.gz
rm $FILE
sha256sum $FILE.gz | cut -f1 -d' ' > $FILE.checksum

echo $BRANCH > result/$TYPE/entries
