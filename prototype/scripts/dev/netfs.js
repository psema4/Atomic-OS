/* dev/netfs.js
 *
 * ++[black[Atomic OS Class: Network Filesystem Device]++
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxNETFSDevice = HxNETDevice.extend({
    /* @constructor
     * @method init
     * Extends <a href="net.html">HxNETFSDevice</a>
     *
     * Represents a network device for access to a hosted filesystem in Atomic OS
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this._super(opts);
    }
});
