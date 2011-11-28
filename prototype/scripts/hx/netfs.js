/* netfs.js
 *
 * ++[black[Atomic OS Class: HxNETFS]++
 *
 * JavaScript tree structure to represent a remote filesystem
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxNETFS = HxJSFS.extend({
    /* @constructor
     * @method init
     * Extends <a href="jsfs.html">HxJSFS</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this.tree = opts.tree || {};
        this._super(opts);
    },

    /* @method addChildFolder
     * **Superclass Override**
     * Creates a named subfolder
     * @param {String} name Name of subfolder
     * @returns {Bool} True on success
     */

    addChildFolder: function(name) {
        this.tree[name] = new HxNETFS({});
        return (this.tree[name] instanceof HxNETFS);
    },

    /* @method addFile
     * **Superclass Override**
     * Create an empty HxRemoteFile
     * @param {String} name Name of file to create
     * @returns {Bool} True on success
     */

    addFile: function(name) {
        this.tree[name] = new HxRemoteFile({
            name: name
        });
        return (this.tree[name] instanceof HxRemoteFile);
    }
});
