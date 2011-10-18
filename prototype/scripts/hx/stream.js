var HxStream = Class.extend({
    init: function(opts) {
        opts = opts                       || {};
        this.name = opts.name             || HxGUID.next();
        this.parentNode = opts.parentNode || false;
        this.bus = opts.bus               || HxBus;
        this.buffer = opts.buffer         || '';

        var self = this;
        this.bus.subscribe('rollcall', function() {
            console.log('stream "' + self.name + '" responding');
        });
    },

    read: function() {
        return this.buffer;
    },

    write: function(buf) {
        this.buffer = buf;
        this.bus.publish(this.name + '/ondata');
        return this;
    }
});

var HxStream2 = HxStream.extend({
    init: function(opts) {
        this._super(opts);
    },

    read: function() {
        return this._super();
    },

    write: function(buf) {
        return this._super(buf);
    }
});
