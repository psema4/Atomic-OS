var HxWash = HxProcess.extend({
    init: function(opts) {
        opts = opts || {};

        this._super(opts);

        var self   = this,
            stdin  = this.fd[0].name,
            stdout = this.fd[1].name,
            stderr = this.fd[2].name;

        this.fd[0].bus.subscribe(stdin  + ':ondata', this.onInput);
        this.fd[1].bus.subscribe(stdout + ':ondata', this.onOutput);
        this.fd[2].bus.subscribe(stderr + ':ondata', this.onError);
    },

    exec: function(command) {
        var args = command.match(' ') ? command.split(' ') : [command];

        try {
            var cmdName = args.shift(),
                basename = system.fs.basename(cmdName),
                cmdObj = eval( system.bin[basename] );

            cmdObj.exec.call(this, args);

        } catch(e) {
            console.warn("WASH Exception:");
            console.dir(e);
        }
    },

    onInput: function(args) {
        console.log('wash process received data on stdin');

//        this.exec( this.fd[0].read() );

        //FIXME: 'this' is an empty object
        //
        //       How do we set the scope to wash instance
        //       (We don't want to reference system.wash...)

        var buf = system.wash.fd[0].read();
        system.wash.exec(buf);
    },

    onOutput: function(args) {
        console.log('wash process sent data on stdout');

        //FIXME: How do we set the scope to *this* wash instance
        //       (...and want to route messages to linked processes)

        var buf = system.wash.fd[1].read();
        console.log('output: ' + buf);
    },

    onError: function(args) {
        //FIXME: How do we set the scope to *this* wash instance

        var buf = system.wash.fd[2].read();
        console.log('error: ' + buf);
    }
});

