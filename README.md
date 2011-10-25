Atomic OS README
================

(C)2005-2011 Scott Elcomb

Some Rights Reserved


Legal
=====

Atomic OS itself is licensed under the LGPLv3 license.  For details, please see the LICENSE file.

Some dependencies may be licensed under another license.  Please see their respective source files in the script/vendor/ directory

Summary
=======

Atomic OS is a "live" OS-like environment and SPA library/template for web app development.

At it's core, Atomic OS aims to provide to web developers features that desktop dev's take for granted: basic operating system features like a command interpreter and filesystem.

Included in Atomic OS is a simple scriptable command shell and basic desktop environment, giving developers absolute runtime access to their RIA & SPA applications.

Atomic OS hopes to help ameliorate dependence on the cloud by allowing app data to be stored within the microsystem itself, using a storage strategy established by TiddlyWiki.

Because Atomic OS is simply an html file, it is instantly a template, infinitely reusable and extremely easy to distribute.

Building the Prototype
======================

Currently building is limited to Linux-like systems with bash and node.js

Node.js requires the JsDog documentation engine, which should be installed globally with:  npm install jsdog -g

To avoid the necessity of calling the scripts/build bash script after every edit, you can use scripts/autobuild if node.js is on your path.  It will run the build script whenever a javascript file is written to

The most recent reference prototype should be found at http://psema4.github.com/Atomic-OS/

Support
=======

  - Main Site:      https://code.google.com/p/atomos/
  - Issue Tracker:  https://github.com/psema4/Atomic-OS/issues
  - Discussion:     https://lists.sourceforge.net/lists/listinfo/atomos-discuss
  - Developers:     https://lists.sourceforge.net/lists/listinfo/atomos-devel
