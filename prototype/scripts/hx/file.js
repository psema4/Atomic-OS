function HxFile(opts) {
    var name        = (opts && opts.name)       ? opts.name       : HxGUID.next();
    var parentFile  = (opts && opts.parentFile) ? opts.parentFile : 'fileroot';
    var mbus        = (opts && opts.mbus)       ? opts.mbus       : null;

    $('#' + parentFile).append('<div id="' + name + '" class="HxFile">');
    var hxfile = $('#' + name);

    if (opts && opts.data) { hxfile.html(opts.data); }

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

        read: function() { return hxfile.html(); },

        write: function(buf) { hxfile.html(buf); },

        append: function(buf) { var content = this.read() + buf; hxfile.html(content); }
    };
}

