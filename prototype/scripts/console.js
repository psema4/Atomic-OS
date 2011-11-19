// firebug-compatible dummy console for browsers without one
// api derived from http://getfirebug.com/wiki/index.php/Console_API
if (typeof window.console == 'undefined') {
    window.console = {
        _buf: [],
        _max: 1000,

        //non-standard, renders internal buffer to specified dom element
        render: function(domTarget, newline) { // domTarget should be an ID (not selector)
            var buf = '';
            newline = newline || "\n";

            for (var i=0; i<this._buf.length; i++) {
                buf += this._buf[i] + newline;
            }

            var elTarget = document.getElementById(domTarget);
            var elTagName = elTarget.tagName;
            var method;

            switch (elTagName.toLowerCase()) {
                case 'textarea':
                case 'input':
                    method = 'value';
                    break;

                case 'div':
                case 'p':
                default:
                    method = 'innerHTML';
            }

            elTarget[method] = buf;
        },

        log: function() {
            var objects = arguments;

            for (var i=0; i<objects.length; i++) {
                this._buf.push(objects[i].toString());
            }

            if (this._buf.length > this._max) this._buf.shift();
        },

        debug: function() {
            var objects = arguments;
            this.log(objects);
        },

        info: function() {
            var objects = arguments;
            this.log(objects);
        },

        warn: function() {
            var objects = arguments;
            this.log(objects);
        },

        error: function() {
            var objects = arguments;
            this.log(objects);
        },

        assert: function() {
            var expression = arguments.shift();
            var objects = arguments;
        },

        clear: function() {
            this._buf = [];
        },

        dir: function(obj) {
            this.log(typeof obj);

            for (var p in obj) {
                this.log(p + ': ' + obj[p]);
            }
        },

        dirxml: function(node) {
        },

        trace: function() {
        },

        group: function() {
            var objects = arguments;
        },

        groupCollapsed: function() {
            var objects = arguments;
        },

        groupEnd: function() {
        },

        time: function(name) {
        },

        timeEnd: function(name) {
        },

        profile: function(title) { // title optional
        },

        profileEnd: function() {
        },

        count: function(title) { // title optional
        },

        exception: function() {
            var errobj = arguments.shift();
            var objects = arguments;
        },

        table: function(data, columns) { // columns optional
        } 
    };
}
