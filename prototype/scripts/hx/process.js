var HxProcess = HxClass.extend({
    init: function(opts) {
        opts = opts || {};
        this.name = opts.name || HxGUID.next();

        this._super(opts);

        this.fd = [
            new HxStream({}),
            new HxStream({}),
            new HxStream({})
        ];
    }
});

