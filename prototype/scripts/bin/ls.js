/* ls.js
 *
 * Atomic OS WASH command
 *
 * List files
 *
 * Without a path, lists the current working directory
 * With -l, lists files in a single column
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.ls.!!methodName!!
 * @constructor
 */

system.bin.ls = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "List files\n\n  Usage: ls [-l] [path]\n\nWithout a path, lists the current working directory.\nWith -l, lists files in a single column.";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        var formatStr = function(str, len) {
            var result = str;
            while (result.length < len) {
                result += " ";
            }
            return result;
        };

        try {

            var displayType = 'wide',
                path = system.env.cwd;

            if (args instanceof Array) {
                path = args.shift();

                if (path.match(/^-l/)) {
                    displayType = 'single';
                    path = args.shift();
                    if (! path) path = system.env.cwd;
                }
            }

            var output = path + ':' + "\n";
            if (displayType == 'wide') output += "\n";

            var fspath = system.fs.getFolder(path);
            if (fspath) {
                var results = fspath.listFiles(); // pre-sorted by listFiles()

                // figure out the longest entry
                var len = 0;
                for (var i=0; i<results.length; i++) {
                    if (results[i].path.length > len) len = results[i].path.length;
                };

                var lineLength = 0;
                for (var i=0; i<results.length; i++) {
                    var result = results[i].path;
                    var file = results[i].file;

                    var postfix = (file && file.tree) ? '/' : '';

                    switch(displayType) {
                        case 'single':
                            output += '  ' + result + postfix + "\n";
                            break;

                        case 'wide':
                        default:
                            var segment = formatStr(result + postfix, len+1) + "  ";
                            if (lineLength > 60) {
                                output += "\n";
                                lineLength = 0;
                            }
                            lineLength += segment.length;
                            output += segment;
                    }
                }

                output = output.replace(/\n$/, ''); // remove trailing newline

            } else {
                output = "folder not found";
            }

            if (stdout) {
                stdout.write(output);
            } else {
                console.log(output);
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
