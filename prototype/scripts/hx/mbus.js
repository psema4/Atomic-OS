var HxMBus = (function () {
    var channels = {
        "default": {
            subscriptions: {}
        }
    };

    return {
        publish: function (msg, args, scope, ch) {
            ch = (ch) ? ch : "default";

            if (! channels.hasOwnProperty(ch)) {
                throw new Error('PubSub.publish: "' + ch + '" is not a registered channel');
            }

            if (! channels[ch].subscriptions.hasOwnProperty(msg)) {
                throw new Error('PubSub.publish: "' + msg + '" is not a registered message');
            }

            args = (args) ? args : [];

            for (var i=0; i < channels[ch].subscriptions[msg].length; i++) {
                if (scope) {
                    channels[ch].subscriptions[msg][i].call(scope, args);
                } else {
                    channels[ch].subscriptions[msg][i](args); // scope is the subscribed module
                }
            }
        },

        subscribe: function (msg, fn, ch) {
            if (typeof fn !== 'function') {
                throw new Error('PubSub.subscribe: fn must be a function');
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

        unsubscribe: function (msg, fn, ch) {
            if (typeof fn !== 'function') {
                throw new Error('PubSub.unsubscribe: fn must be a function');
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
}) ( );
