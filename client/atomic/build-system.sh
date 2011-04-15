#!/usr/bin/env bash

# build system components
cat src/vfs/node.js > src/vfs.js
cat src/libwash/fs.js src/libwash/wash.js > src/libwash.js
cat src/system/env.js src/system/init.js > src/system.js

# put system together
cat src/*.js > ./system-all.js

# minify
./jsmin.py < system-all.js > system-all-min.js
