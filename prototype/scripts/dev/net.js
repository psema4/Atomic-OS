/* dev/net.js
 *
 * ++[black[Atomic OS Class: Network Device]++
 *
 * See Atomic-OS/prototype/net-example/netdevice.* for basic API examples in perl &amp; php
 *
 * &nbsp; cmd: 'file'
 * &nbsp; subcmd: one of 'read', 'write', 'append', 'create', 'delete'
 *
 * Example read:
 * &nbsp; &nbsp; fileActionObj = {
 * &nbsp; &nbsp; &nbsp; &nbsp; cmd: 'file',
 * &nbsp; &nbsp; &nbsp; &nbsp; subcmd: 'read',
 * &nbsp; &nbsp; &nbsp; &nbsp; path: '/test-file'
 * &nbsp; &nbsp; };
 *
 * Example write:
 * &nbsp; &nbsp; fileActionObj = {
 * &nbsp; &nbsp; &nbsp; &nbsp; cmd: 'file',
 * &nbsp; &nbsp; &nbsp; &nbsp; subcmd: 'write',
 * &nbsp; &nbsp; &nbsp; &nbsp; path: '/test-file',
 * &nbsp; &nbsp; &nbsp; &nbsp; buffer: 'Hello, World!'
 * &nbsp; &nbsp; };
 *
 * &nbsp; &nbsp; system.fs.tree.dev.tree.net.send(fileActionObj, function(response) {
 * &nbsp; &nbsp; &nbsp; &nbsp; // response is a json oject (text in .data)
 * &nbsp; &nbsp; &nbsp; &nbsp; console.dir(response);
 * &nbsp; &nbsp; });
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

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
        this.pollRate = opts.pollRate || 0;
        this.buffer = '';
        this._super(opts);

        var self = this;

        if (this.url != '' && this.pollRate > 999) { // throttle minimum 1 second between checks
            setTimeout(function(o) {
                o.poll();
            }, this.pollRate, this);
        }
    },

    /* @method send
     *
     * Send a request to the server-side component of netdevice
     *
     * @param {Object} data An action to run, including at least cmd.  File operations also require at least subcmd &amp; path properties (writes also require a buffer property)
     */

    send: function(data, fn) {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: data,
            success: fn,
            error: this.error
        });
    },

    /* @method poll
     * Periodically send a command to the server
     */
    poll: function() {
        console.warn('HxNETDevice polling');

        var pollCommand = {
            cmd: 'time'
        };

        this.send(pollCommand, function(data) {
            console.warn('HxNETDevice received: ' + data);
        });

        if (this.url != '' && this.pollRate > 999) { // throttle minimum 1 second between checks
            setTimeout(function(o) {
                o.poll();
            }, this.pollRate, this);
        }
    },

    /* @method error
     *
     * Handle server errors
     *
     * @param {XhrObj} the originating XML HTTP Request object
     */
    error: function(xhr) {
        console.warn('HxNETDevice: Error: ' + xhr.statusText + ' [' + xhr.status + ']');
    }
});
