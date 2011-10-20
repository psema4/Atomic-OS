var HxWindow = HxPanel.extend({
    init: function(opts) {
        opts = opts || {};

        if (opts.defaultStyle) {
            opts.css = opts.css || {};
            opts.css.position = 'absolute';
            opts.css.backgroundColor = '#ccc';
            opts.css.border = '2px outset #eee';
        }

        this._super(opts);

        this.title = opts.title || 'Window ' + this.name;

        this.inputHandler  = opts.inputHandler  || function() {};
        this.outputHandler = opts.outputHandler || function() {};
        this.errorHandler  = opts.errorHandler  || function() {};

        var ui = "<div id='" + this.name + "-titlebar' class='titlebar'>" + this.title + "</div><div id='" + this.name + "-content'></div>";

        this.get().append(ui);
    },

    getTitlebar: function() {
        return $('#' + this.name + '-titlebar');
    },

    getContent: function() {
        return $('#' + this.name + '-content');
    }
});

