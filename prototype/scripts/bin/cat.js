/* cat.js
 *
 * Atomic OS WASH command
 *
 * Echo file contents to stdout
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.cat.!!methodName!!
 * @constructor
 */

system.bin.cat = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Echo file contents to stdout\n\n  Usage: cat [filepath]";
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
            path = (path.match(/^\//)) ? path : system.env.cwd + '/' + path;

            var buf = system.fs.readFile(path);

            if (buf) {
                if (stdout) stdout.write(buf);

            } else {
                if (stdout) stdout.write('file "' +  path + '" not found');
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
