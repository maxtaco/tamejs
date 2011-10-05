#!/bin/sh

IN=/tmp/meetup.tjs
OUT=/tmp/meetup.js

wget -O - https://raw.github.com/maxtaco/tamejs/master/meetup.js > $IN  
tamejs $IN 
node $OUT $1
