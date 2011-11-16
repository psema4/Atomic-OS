/* dev/net.js
 *
 * ++[black[Atomic OS Class: Network Device]++
 *
 * Requires socket.io server
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

if (! window.io) {
    console.warn('socket.io loading failed. faking support for network device')

    window.io = {
        connect: function() {}
    };
}

var HxNETDevice = HxDevice.extend({
    /* @constructor
     * @method init
     * Extends <a href="../classes/device.html">HxDevice</a>
     *
     * Represents a basic network device in Atomic OS
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this.url = opts.url || '';
        this.buffer = '';
        this._super(opts);
//        this.socket = io.connect('http://localhost:3734');
//        this.socket.on('notify', this.write);
    }//,

//    send: function(method, data) {
//      socket.emit(method, { data: data });
//    }
});
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
