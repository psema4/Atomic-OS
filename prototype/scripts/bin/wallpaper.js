/* wallpaper.js
 *
 * Atomic OS WASH command
 *
 * Sets the desktop wallpaper
 *
 * This command can currently only add/remove one graphic [css class="bg-tile"]
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

window.system = window.system || {};
system.bin = system.bin || {};

/* Dummy constructor
 *
 * Access programmatically via system.bin.wallpaper.!!methodName!!
 * @constructor
 */

system.bin.wallpaper = {
    /* @method help
     * @returns {string} Returns a simple string synopsis for this command
     *
     * Simple synopsis on this command, used by the <a href="help.html">help command</a>
     */

    help: function() {
        return "Sets the desktop wallpaper\n\n  Usage: wallpaper\n\nThis command can currently only add/remove one graphic [css class=\"bg-tile\"]";
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
            dObj   = system.fs.tree.mnt.tree.desktop;
            dName  = dObj.name;
            dEl = $('#' + dName);
            if (dEl.hasClass('bg-tile')) {
                dEl.removeClass('bg-tile');
            } else {
                dEl.addClass('bg-tile');
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
