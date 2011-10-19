window.system = window.system || {};
system.bin = system.bin || {};

system.bin.cat = {
    exec: function(args) {
        try {
            var path = (args instanceof Array) ? args.shift() : args;
            console.log(system.fs.readFile(path));

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};