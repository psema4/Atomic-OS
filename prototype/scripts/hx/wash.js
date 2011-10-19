var HxWash = HxClass.extend({
    init: function(opts) {
        opts = opts || {};

        this._super(opts);
    },

    exec: function(command) {
        var args = (command.match(' ')) ? command.split(' ') : [command];

        try {
            var cmdName = args.shift();
            var basename = system.fs.basename(cmdName);
            var cmdObj = eval(system.bin[basename]);
            cmdObj.exec(args);

        } catch(e) {
            console.warn("WASH Exception:");
            console.dir(e);
        }
    }
});

