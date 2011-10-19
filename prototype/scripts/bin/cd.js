window.system = window.system || {};
system.bin = system.bin || {};

system.bin.cd = {
    exec: function(args) {
        try {
            var path = (args instanceof Array) ? args.shift() : args;

            if (path == '-') {
                var tmp = system.env.pwd;
                system.env.pwd = system.env.cwd;
                system.env.cwd = tmp;

            } else {
                system.env.pwd = system.env.cwd || '/';
                system.env.cwd = path;
            }

            console.log(system.env.cwd);

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }

        return system.env.pwd;
    }
};
