#!/usr/bin/env bash

# build system components
cat src/util/util.js > src/util.js
cat src/vfs/node.js > src/vfs.js
cat src/libwash/fs.js src/libwash/wash.js > src/libwash.js
cat src/system/env.js src/system/init.js > src/system.js
cat src/wm/cm.js src/wm/wm.js > src/wm.js

# put system together
cat src/util.js src/vfs.js src/libwash.js src/system.js src/wm.js > ./system-all.js

# minify
./jsmin.py < system-all.js > system-all-min.js
