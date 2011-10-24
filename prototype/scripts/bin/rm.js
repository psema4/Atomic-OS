window.system = window.system || {};
system.bin = system.bin || {};

system.bin.rm = {
    help: function() {
        return "Remove a file\n\n  Usage: rm [filename]\n\nNOTE: This command is currently limited to removing files in the current directory";
    },

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var result = false;
            var filename = (args instanceof Array) ? args.shift() : args;
            var currentFolder = system.fs.getFolder(system.env.cwd);

            if (currentFolder) result = currentFolder.removeFile(filename);

            var message = (result) ? "ok, removed " : "failed to remove ";
            if (stdout) stdout.write(message + filename);

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
