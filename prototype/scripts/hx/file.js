var HxFile = HxStream.extend({
    init: function(opts) {
        this._super(opts);
        this.autoFlush = false;
    }
});
