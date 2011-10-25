/* clear.js
 *
 * Atomic OS WASH command
 *
 * Clear command console's output window
 *
 * The clear command is currently broken.  After running this command, the global wash stdout stream will no longer echo to the console window
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.clear.!!methodName!!
 * @constructor
 */

system.bin.clear = {
    help: function() {
        return "Clear command console's output window\n\n  Usage: clear\n\nNote: the clear command is currently broken.  After running this command, the global wash stdout stream will no longer echo to the console window";
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
            // specific to the global test console cmdWindow, see main.js
            // FIXME: the cls() method is broken, see commandwindow.js
            if (cmdWindow && cmdWindow.cls) cmdWindow.cls();

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
