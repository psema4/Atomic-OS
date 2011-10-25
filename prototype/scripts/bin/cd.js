/* cd.js
 *
 * Atomic OS WASH command
 *
 * Change Directory. Supports:
 *   ~ (home folder)
 *   - (last folder)
 *  .. (parent folder)
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.cd.!!methodName!!
 * @constructor
 */

system.bin.cd = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Change Directory\n\n  Usage: cd [path]\n\nNOTE: Supports  ~ (home folder), - (last folder), and .. (parent folder)";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to echo text to stdout: **this.fd[1].write('foobar');**
     */

    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var path = (args instanceof Array) ? args.shift() : args;
            var handled = false;

            // preprocess path, handle 
            if (path == '-') {               // swap current working directory with previous working directory
                var tmp = system.env.pwd;
                system.env.pwd = system.env.cwd;
                system.env.cwd = tmp;
                handled = true;

            } else if (path == '~') {
                system.env.pwd = system.env.cwd;
                system.env.cwd = system.env.home;
                handled = true;

            } else if (path.match(/\.\./)) { // path references parent container

                if (system.debug) console.warn('..: original path: ' + path);

                // start at the current working directory
                var tmppath = system.env.cwd;
                if (system.debug) console.warn('..: cwd: ' + tmppath);

                // while path references a parent directory transform the path to it's parent
                while (path.match(/\.\./)) {
                    path = path.replace(/\.\./, '');
                    var parts = tmppath.split('/');
                    parts.pop(); //FIXME: .. may not always be at beginning of path
                    tmppath = parts.join('/');
                }

                path = path.replace(/\/\//g, '/'); // if original path ends with a slash the transformed version may contain two in a row (eg ../../ => //)

                if (system.debug) {
                    console.warn('..: result: ' + tmppath);
                    console.warn('..: transformed path: ' + path);
                }

                path = (tmppath) ? (path == '/')                                        // if there was a result and path is the root
                                        ? tmppath                                       //    use the result
                                        : (path.match(/^\//)) ? tmppath + path          //    else if the path is absolute add it to our result
                                                              : tmppath + '/' + path    //                                 else use our result and make path absolute
                                 : '/';                                                 // else use the root folder
                ;

                path = path.replace(/\/$/, ''); // to be sure
                if (system.debug) console.warn('..: final path: ' + path);
            }

            // if preprocessing hasn't handled the request
            if (! handled) {
                if (! path.match(/^\//)) {              // convert relative paths to absolute
                    path = (system.env.cwd == '/') ? '/' + path : system.env.cwd + '/' + path;
                }

                if (system.fs.getFolder(path)) {        // confirm folder exists
                    system.env.pwd = system.env.cwd || '/';
                    system.env.cwd = path;

                    handled = true;
                }
            }

            // write result message to stdout
            var message = (handled) ? system.env.cwd : 'folder "' + path + '" not found';
            if (stdout) stdout.write(message);

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }

        return system.env.pwd;
    }
};
