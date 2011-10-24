var HxDOMFS = HxJSFS.extend({
    init: function(opts) {
        this.tree = opts.tree || {};
        this._super(opts);
    },

    addChildFolder: function(name) {
        this.tree[name] = new HxDOMFS({});
        return (this.tree[name] instanceof HxDOMFS);
    },

    addFile: function(name) {
        $('#fileroot').append('<div class="domfile"></div>');
        this.tree[name] = new HxFile({
            name: name
        });
        return (this.tree[name] instanceof HxFile);
    }
});
