function HxPanel(opts) {
    var counter = 0;
    var toggleState = (opts && opts.toggled)  ? opts.toggled  : true;
    var name        = (opts && opts.name)     ? opts.name     : 'hxpanel' + counter++;
    var parentEl    = (opts && opts.parentEl) ? opts.parentEl : 'winroot';
    var mbus        = (opts && opts.mbus)     ? opts.mbus     : null;

    $('#' + parentEl).append('<div id="' + name + '" class="HxPanel">');

    var hxpanel = $('#' + name);
    if (opts && opts.class) { hxpanel.addClass(opts.class); }
    if (opts && opts.css)   { hxpanel.css(opts.css); }

    return {
        onmessage: function(args) {
            var msg = (args && args[0]) ? args[0] : '';
            console.log('DEFAULT-CHANNEL: "' + msg + '"');
        },

        publish: function(msg, args, scope, ch) {
            mbus.publish.apply(this, arguments);
        },

        subscribe: function(msg, fn, ch) {
            mbus.subscribe.apply(this, arguments);
        },

        unsubscribe: function(msg, fn, ch) {
            mbus.unsubscribe.apply(this, arguments);
        },

        setup: function() {
            mbus.subscribe("SYS_ALL", this.onmessage);
        },

        teardown: function() {
            mbus.unsubscribe("SYS_ALL", this.onmessage);
        },

        get: function() { return $('#' + name); },

        getName: function() { return name; },

        moveTo: function(x,y) { hxpanel.css({ top: y, left: x }); },

        toggle: function() {
            toggleState = (toggleState) ? false : true;

            $('#' + name).fadeToggle();

            return toggleState;
        }
    };
}

