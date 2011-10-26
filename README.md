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

Building the Atomic OS prototype is currently limited to Linux-like systems with bash. Having Node.js installed and available on your path is highly recommended. An alternative build system should soon be available for Windows platforms.

Documentation and unit tests will be built if the JSDog documentation engine is installed.  Assuming you have Node.js and NPM installed, then you can get JSDog by running:  npm install jsdog -g

To avoid having to run build (in the prototype/scripts folder) after editing source files, you can use the autobuild daemon.  It will rebuild the prototype anytime a javascript file is written to.

Minification is handled by uglify.js and installation is similar to JSDog: npm install uglifyjs -g

The most recent reference prototype should be available at http://psema4.github.com/Atomic-OS/

Support
=======

  - Main Site:      https://code.google.com/p/atomos/
  - Issue Tracker:  https://github.com/psema4/Atomic-OS/issues
  - Discussion:     https://lists.sourceforge.net/lists/listinfo/atomos-discuss
  - Developers:     https://lists.sourceforge.net/lists/listinfo/atomos-devel
