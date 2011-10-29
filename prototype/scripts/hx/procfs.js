/* procfs.js
 *
 * ++[black[Atomic OS Class: HxPROCFS]++
 *
 * JavaScript tree structure to represent processes in a filesystem
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxPROCFS = HxJSFS.extend({
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
     * @returns {Mixed} Folder on success, false on failure
     */

    addChildFolder: function(name) {
        this.tree[name] = new HxPROCFS({});
        return (this.tree[name] instanceof HxPROCFS) ? this.tree[name] : false;
    }
});
