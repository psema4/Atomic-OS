window.system = window.system || {};
system.bin = system.bin || {};

system.bin.echo = {
    exec: function(args) {
        try {
            var message = (args instanceof Array) ? message = args.join(' ') : args;
            console.log(message);

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
