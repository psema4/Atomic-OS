var HxStream = HxClass.extend({
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

    read: function() {
        var buf = this.buffer;
        if (this.autoFlush) this.flush();
        return buf;
    },

    write: function(buf) {
        this.buffer = buf;
        this.bus.publish(this.name + ':ondata', this.buffer.length);
        return this;
    },

    append: function(buf) {
        this.buffer += buf;
        this.bus.publish(this.name + ':ondata', this.buffer.length);
        return this;
    },

    flush: function() {
        this.buffer = '';
    }
});
