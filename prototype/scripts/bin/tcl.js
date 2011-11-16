/* tcl.js
 *
 * Atomic OS WASH command
 *
 * Run a tcl command
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.tcl.!!methodName!!
 * @constructor
 */
system.bin.tcl = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */
    help: function() {
        return "Run a tcl command and print the result \n\n  Usage: tcl [string]";
    },

    /* @method exec
     * @param {Array} args A list of arguments the command was called with
     * Executes command with args. The calling HxProcess is available as **this** and it's first 3 file descriptors are stdin, stdout, and stderr respectively.
     * For example, to tcl text to stdout: **this.fd[1].write('foobar');**
     */
    exec: function(args) {
        var debug = false;
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var message = (args instanceof Array) ? message = args.join(' ') : args;
            var filename = '', result;

            if (message.match(/^< /)) {
                filename = message.replace(/^< /, '');
                var buf = system.fs.readFile(filename);
                result = tcl(buf);

            } else {
                result = tcl(message);
            }

            if (result && result.content) stdout.write(result.content);

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }

    }
};
