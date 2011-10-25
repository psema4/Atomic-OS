/* touch.js
 *
 * Atomic OS WASH command
 *
 * Create empty file
 *
 * This command is currently limited to creating files in the current directory
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.touch.!!methodName!!
 * @constructor
 */

system.bin.touch = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Create empty file\n\n  Usage: touch [file name]\n\nNOTE: This command is currently limited to creating files in the current directory";
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
            var result = false;
            var filename = (args instanceof Array) ? args.shift() : args;
            var folder = system.env.cwd;

            if (filename.match(/^\//)) {
                folder = filename;
                filename = system.fs.basename(folder);
            }

            var currentFolder = system.fs.getFolder(folder);
            if (currentFolder) result = currentFolder.addFile(filename);

            var message = (result) ? "ok, created " : "failed to create ";
            if (stdout) stdout.write(message + 'file "' + filename + '"');

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
