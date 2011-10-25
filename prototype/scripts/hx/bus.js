/* bus.js
 *
 * ++[black[Atomic OS Class: HxBus] **Singleton**++
 *
 * Primary message bus
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxBus = (function () {
    var channels = {
        "default": {
            subscriptions: {}
        }
    };

    return {
        /* @method publish
         * Publish a message and execute all subscribed callback functions
         * @param {String} msg Message being published
         * @param {Array} args Arguments to pass to subscribed callbacks
         * @param {Object} scope Context to execute callback with
         * @param {String} ch Optional channel name !!default: 'default'!!
         */

        publish: function (msg, args, scope, ch) {
            ch = (ch) ? ch : "default";

            if (! channels.hasOwnProperty(ch)) {
                console.warn('system bus: publish: "' + ch + '" is not a registered channel');
                return;
            }

            if (! channels[ch].subscriptions.hasOwnProperty(msg)) {
                console.warn('system bus: publish: "' + msg + '" is not a registered message');
                return;
            }

            args = (args) ? args : [];

            for (var i=0; i < channels[ch].subscriptions[msg].length; i++) {
                if (scope) {
                    channels[ch].subscriptions[msg][i].call(scope, args);
                } else {
                    channels[ch].subscriptions[msg][i](args);
                }
            }
        },

        /* @method subscribe
         * Add a subscription
         * @param {String} msg Message to subscribe to
         * @param {Function} fn Function to callback when message is published
         * @param {String} ch Optional channel name !!default: 'default'!!
         */

        subscribe: function (msg, fn, ch) {
            if (typeof fn !== 'function') {
                throw new Error('system bus: subscribe: fn must be a function');
            }

            ch = (ch) ? ch : "default";

            if (! channels.hasOwnProperty(ch)) {
                channels[ch] = {
                    subscriptions: {}
                };
            };

            if (! channels[ch].subscriptions[msg]) {
                channels[ch].subscriptions[msg] = new Array();
            }

            channels[ch].subscriptions[msg].push(fn);
        },

        /* @method unsubscribe
         * Remove a subscription
         * @param {String} msg Subscribed message name
         * @param {Function} fn The callback that was subscribed
         * @param {String} ch Optional channel name !!default: 'default'!!
         */

        unsubscribe: function (msg, fn, ch) {
            if (typeof fn !== 'function') {
                throw new Error('system bus: unsubscribe: fn must be a function');
            }

            ch = (ch) ? ch : "default";

            for (var i=0; i < channels[ch].subscriptions[msg].length; i++) {
                if (channels[ch].subscriptions[msg][i] === fn) {
                    channels[ch].subscriptions[msg].splice(i, 1);
                    return;
                }
            }
        }
    }
})();
