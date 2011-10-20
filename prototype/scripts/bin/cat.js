window.system = window.system || {};
system.bin = system.bin || {};

system.bin.cat = {
    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var path = (args instanceof Array) ? args.shift() : args;
            var buf = system.fs.readFile(path);

            if (stdout) {
                stdout.write(buf);
            } else {
                console.log(buf);
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
