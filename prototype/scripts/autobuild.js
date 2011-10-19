#!/usr/bin/env node
/*
 * Based on run_dev_server.js from the Spludo Framework.
 * Copyright (c) 2009-2010 DracoBlue, http://dracoblue.net/
 *
 * Licensed under the terms of MIT License. For the full copyright and license
 * information, please see the LICENSE file in the root folder.
 *
 *      Source: https://raw.github.com/DracoBlue/spludo/master/build/run_dev_server.js
 * Explanation: http://dracoblue.net/dev/hot-reload-for-nodejs-servers-on-code-change/173/
 */

var fs = require("fs")
  , sys = require("sys")
  , util = require("util")
  , child_process = require('child_process');

autobuilder = {
    process: null,
    files: [],

    "start": function() {
        util.log('AUTO-BUILDER: watching files');
        this.watchFiles();
    },

    "build": function() {
        var that = this;

        this.process = child_process.spawn('./build');

        this.process.stdout.addListener('data', function (data) {
            process.stdout.write(data);
        });

        this.process.stderr.addListener('data', function (data) {
            sys.print(data);
        });

        this.process.addListener('exit', function (code) {
            var header = 'AUTO-BUILDER: ';
            var msg = 'build process finished';

            if (code != 0) {
                header += '[WARN] ';
                msg += ' with code ' + code;
            }

            util.log(header + msg);
            this.process = null;
        });
    },

    "watchFiles": function() {
        var that = this;

        child_process.exec('find . | grep "\.js$" | grep -v "atomos"', function(error, stdout, stderr) {
            var files = stdout.trim().split("\n");

            files.forEach(function(file) {
                that.files.push(file);
                fs.watchFile(file, {interval : 500}, function(curr, prev) {
                    if (curr.mtime.valueOf() != prev.mtime.valueOf() || curr.ctime.valueOf() != prev.ctime.valueOf()) {
                        util.log('AUTO-BUILDER: Rebuilding because of changed file at ' + file);
                        autobuilder.build();
                    }
                });
            });
        });
   },

    "unwatchFiles": function() {
        this.files.forEach(function(file) {
            fs.unwatchFile(file);
        });
        this.files = [];
    }
}

autobuilder.start();
