window.system = window.system || {};
system.bin = system.bin || {};

system.bin.mkdir = {
    help: function() {
        return "Make directory\n\n  Usage: mkdir [folder name]\n\nNOTE: This command is currently limited to creating folders in the current directory";
    },

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var result = false;
            var folder = (args instanceof Array) ? args.shift() : args;
            var currentFolder = system.fs.getFolder(system.env.cwd);

            if (currentFolder) result = currentFolder.addChildFolder(folder);

            var message = (result) ? "ok, created " : "failed to create ";
            if (stdout) stdout.write(message + folder);

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
