var HxPanel = HxJSFS.extend({
    init: function(opts) {
        this._super(opts);

        this.toggleState = (opts && opts.toggled)  ? opts.toggled  : true;
        this.name        = (opts && opts.name)     ? opts.name     : HxGUID.next();
        this.parentEl    = (opts && opts.parentEl) ? opts.parentEl : 'winroot';
        this.bus         = (opts && opts.bus)      ? opts.bus      : HxBus;
        this.mountPoint  = (opts && opts.mount)    ? opts.mount    : null;

        //FIXME: convert this nodes name to something the DOM can use
        if (this.name.match(/\//)) {
            this.name = system.fs.basename(this.name); 
        }

        var html = '<div id="' + this.name + '" class="ui-panel"></div>';

//        console.warn('attaching panel ' + this.name + ' to ' + this.parentEl);

        $('#' + this.parentEl).append(html);
        this.hxpanel = $('#' + this.name);

        if (opts && opts.className) { this.hxpanel.addClass(opts.className); }
        if (opts && opts.css)   { this.hxpanel.css(opts.css); }

        if (this.mountPoint) {
            system.fs.mount(this.mountPoint, this);
        }
    },

    get: function() { return this.hxpanel },

    getName: function() { return this.name; },

    moveTo: function(x,y) { this.hxpanel.css({ top: y, left: x }); },

    resizeTo: function(x2,y2) { this.hxpanel.css({ right: x2, bottom: y2 }); },

    toggle: function() {
        toggleState = (toggleState) ? false : true;
        this.hxpanel.fadeToggle();

        return toggleState;
    }
});

