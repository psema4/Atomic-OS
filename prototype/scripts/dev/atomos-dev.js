/* dev/net.js
 *
 * ++[black[Atomic OS Class: Network Device]++
 *
 * See Atomic-OS/prototype/net-example/netdevice.* for basic API examples in perl &amp; php
 * FIXME: Provide a PHP version, netdevice.php
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
 * &nbsp; &nbsp; &nbsp; &nbsp; subcmd: 'read',
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

    send: function(data, fn) {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: data,
            success: fn,
            error: this.error
        });
    },

    poll: function() {
        console.warn('HxNETDevice polling');

        var pollCommand = {
            cmd: 'time',
            data: ''
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

    error: function(xhr) {
        console.warn('HxNETDevice: Error: ' + xhr.statusText + ' [' + xhr.status + ']');
    }
});
