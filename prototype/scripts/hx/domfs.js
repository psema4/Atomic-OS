/* domfs.js
 *
 * ++[black[Atomic OS Class: HxDOMFS]++
 *
 * JavaScript tree structure to represent a filesystem in the DOM
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxDOMFS = HxJSFS.extend({
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
        this.tree[name] = new HxDOMFS({});
        return (this.tree[name] instanceof HxDOMFS);
    },

    /* @method addFile
     * **Superclass Override**
     * Create an empty HxFile
     * @param {String} name Name of file to create
     * @returns {Bool} True on success
     */

    addFile: function(name) {
        $('#fileroot').append('<div class="domfile"></div>');
        this.tree[name] = new HxFile({
            name: name
        });
        return (this.tree[name] instanceof HxFile);
    }
});
