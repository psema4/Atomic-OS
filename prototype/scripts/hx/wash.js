var HxWash = HxProcess.extend({
    init: function(opts) {
        opts = opts || {};

        this._super(opts);

        var self  = this,
            stdin = this.fd[0].name;

        this.fd[0].bus.subscribe(stdin + ':ondata', this.onInput);
    },

    exec: function(command) {
        var args = command.match(' ') ? command.split(' ') : [command];

        try {
            var cmdName = args.shift(),
                basename = system.fs.basename(cmdName),
                cmdObj = eval( system.bin[basename] );

            cmdObj.exec(args);

        } catch(e) {
            console.warn("WASH Exception:");
            console.dir(e);
        }
    },

    onInput: function(args) {
        console.log('wash process received data on stdin');

//        this.exec( this.fd[0].read() );

        //FIXME: How do we set the scope to *this* wash instance
        //       (We don't want to reference system.wash)

        console.log('HxWash.onInput(): this:');
        console.dir(this); // this is an empty object

        var buf = system.wash.fd[0].read();
        system.wash.exec(buf);
    }
});

