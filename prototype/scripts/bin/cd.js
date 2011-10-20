window.system = window.system || {};
system.bin = system.bin || {};

system.bin.cd = {
    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

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

            if (stdout) {
                stdout.write(system.env.cwd);
            } else {
                console.log(system.env.cwd);
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }

        return system.env.pwd;
    }
};
