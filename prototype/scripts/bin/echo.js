window.system = window.system || {};
system.bin = system.bin || {};

system.bin.echo = {
    exec: function(args) {
        // 'this' is the calling process, eg:
        // console.log('process ' + this.name + ' executing);
        var stdin =  (this.fd) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var message = (args instanceof Array) ? message = args.join(' ') : args;
            if (stdout) stdout.write(message);

            // test stderr
            if (stderr) throw new Error('fake error');

        } catch(e) {
            if (stderr) {
                stderr.write('command exception: ' + e);

            } else {
                console.log('command exception:');
                console.dir(e);
            }
        }
    }
};
