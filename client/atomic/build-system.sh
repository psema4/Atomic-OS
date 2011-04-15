#!/usr/bin/env bash

cat src/*.js > ./system-all.js

./jsmin.py < system-all.js > system-all-min.js
