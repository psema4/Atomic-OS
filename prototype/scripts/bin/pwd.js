window.system = window.system || {};
system.bin = system.bin || {};

system.bin.pwd = {
    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            if (stdout) {
                stdout.write(system.env.cwd);
            } else {
                console.log(system.env.cwd);
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
