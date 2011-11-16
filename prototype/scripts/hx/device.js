/* device.js
 *
 * ++[black[Atomic OS Class: HxDevice]++
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxDevice = HxStream.extend({
    /* @constructor
     * @method init
     * Extends <a href="stream.html">HxStream</a>
     *
     * Represents an input and/or output device in an Atomic OS system
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this._super(opts);
    }
});
