#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
mkdir $DIR/../node_modules
ln -s $DIR/../ $DIR/../node_modules/tamejs
node $DIR/harness.js
rm $DIR/../node_modules/tamejs
