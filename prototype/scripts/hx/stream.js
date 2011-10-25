/* stream.js
 *
 * ++[black[Atomic OS Class: HxStream]++
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxStream = HxClass.extend({
    /* @constructor
     * @method init
     * Extends <a href="class.html">HxClass</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        opts = opts                          || {};
        this.name = opts.name                || HxGUID.next();
        this.bus = opts.bus                  || HxBus;
        this.buffer = opts.buffer            || '';
        this.autoFlush = 'autoFlush' in opts ? opts.autoFlush : true;

        var self = this;
        this.bus.subscribe('rollcall', function() {
            console.log('stream "' + self.name + '" responding');
        });
    },

    /* @method read
     * Read and return the internal buffer.  If this stream objects' autoFlush property is set to true, internal buffer will be flushed once read.
     * @returns {String} Internal buffer
     */

    read: function() {
        var buf = this.buffer;
        if (this.autoFlush) this.flush();
        return buf;
    },

    /* @method write
     * Write characters to internal buffer, overwriting any previous contents
     * @param {String} buf Text contents to store in internal buffer
     * @returns {HxStream} Returns this stream object
     */

    write: function(buf) {
        this.buffer = buf;
        this.bus.publish(this.name + ':ondata', this.buffer.length);
        return this;
    },

    /* @method append
     * Write characters to internal buffer, appending to any previous contents
     * @param {String} buf Text contents to append to internal buffer
     * @returns {HxStream} Returns this stream object
     */

    append: function(buf) {
        this.buffer += buf;
        this.bus.publish(this.name + ':ondata', this.buffer.length);
        return this;
    },

    /* @method flush
     * Empties the internal buffer
     */

    flush: function() {
        this.buffer = '';
    }
});
