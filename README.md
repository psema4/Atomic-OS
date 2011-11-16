Atomic OS README
================

(C)2005-2011 Scott Elcomb

Some Rights Reserved


Legal
=====

Version 2 of Atomic OS is licensed under the MIT license.  For details, please see the LICENSE file.

Source files in the vendor directory may be distributed under another license.

Some source files may contain attribution in comments for portions of code or ideas and should include a url to said inspiration.


Summary
=======

Atomic OS is a "live" OS-like environment and SPA library/template for web app development.

At it's core, Atomic OS aims to provide to web developers features that desktop dev's take for granted: basic operating system features like a command interpreter and filesystem.

Included in Atomic OS is a simple scriptable command shell and basic desktop environment, giving developers absolute runtime access to their RIA & SPA applications.

Atomic OS hopes to help ameliorate dependence on the cloud by allowing app data to be stored within the microsystem itself, using a storage strategy established by TiddlyWiki.

Because Atomic OS is simply an html file, it is instantly a template, infinitely reusable and extremely easy to distribute.


Building the Prototype
======================

Note: These build methods will be replaced by a common Node.js build system


Windows
-------

Open a dos box and cd into the scripts directory:

    cd c:\devel\Atomic-OS\prototype\scripts

After editing source files you must rebuild atomos.js by running buildall.bat

With the above path you can now view your build by visiting:

    file:///C:/devel/Atomic-OS/prototype/index.html

NOTE: Atomic-OS is not known to work in any version of Internet Explorer.

Documentation, unit tests and minification are not currently generated when building under Windows.

Linux
-----
The basic build process is the same as for Windows. Run script/buildall in a Bash compatible shell.

Install Node.js and the Node Package Manager (NPM) for additional features:

* The autobuild daemon in the scripts folder will rebuild Atomic OS for you every time a source file is saved
* Documentation and unit tests will be built if the environment variable DOCS is set and JSDog is available.  You can install JSDog with:  npm install jsdog -g
* Minification is handled by uglify.js:  npm install uglify-js -g

Support
=======

  - Reference
    Implementation: http://psema4.github.com/Atomic-OS/

  - Main Site:      https://code.google.com/p/atomos/
  - Issue Tracker:  https://github.com/psema4/Atomic-OS/issues

  - Discussion:     https://lists.sourceforge.net/lists/listinfo/atomos-discuss
  - Developers:     https://lists.sourceforge.net/lists/listinfo/atomos-devel
