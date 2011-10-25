/* help.js
 *
 * Atomic OS WASH command
 *
 * Simple help utility
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.help.!!methodName!!
 * @constructor
 */

system.bin.help = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Simple help utility\n\n  Usage: help [command name]";
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

        try {
            var cmd = args instanceof Array ? args[0] : 'help';

            if (system.bin[cmd]) {
                var message = 'Help not available for command "' + cmd + '"';

                if (system.bin[cmd].help) message = system.bin[cmd].help();
                if (stdout) stdout.write(message);
            }

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
