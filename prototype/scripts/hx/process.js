/* process.js
 *
 * ++[black[Atomic OS Class: HxProcess]++
 *
 * A simple object to represent a "process"
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxProcess = HxClass.extend({
    /* @constructor
     * @method init
     * Extends <a href="class.html">HxClass</a>
     *
     * Creates three streams per process: STDIN, STDOUT, and STDERR
     * @param {Object} opts Options dictionary
     */
    init: function(opts) {
        opts = opts || {};
        this.name = opts.name || HxGUID.next();

        this._super(opts);

        // default file descriptors; TODO: processes should push file references or temporary files here
        this.fd = [
            new HxStream({}),
            new HxStream({}),
            new HxStream({})
        ];

        system.lib.registerProcess(this);
    }
});

