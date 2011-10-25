var HxDocWindow = HxWindow.extend({
    init: function(opts) {
        opts = opts || {};
        this._super(opts);

        var ui = "<div id='" + this.name + "-h-iframe'><iframe id='" + this.name + "-iframe' class='rounded' src='scripts/docs/index.html'></iframe></div>";
        this.getContent().append(ui);

        var self = this;

        var hIframe = $('#' + this.name + '-h-iframe').css({
            position: 'absolute',
            top: 35,
            left: 15,
            right: 0,
            bottom: 15
        });

        var iFrame = $('#' + this.name + '-iframe').css({
            width: '99%',
            height: '99%'
        });
    }
});

