/* file.js
 *
 * ++[black[Atomic OS Class: HxFile]++
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxFile = HxStream.extend({
    /* @constructor
     * @method init
     * Extends <a href="stream.html">HxStream</a>
     *
     * By default, autoFlush is false for a file. Otherwise the contents would be lost after reading.
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this._super(opts);
        this.autoFlush = false;
    }
});
