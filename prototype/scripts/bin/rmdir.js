window.system = window.system || {};
system.bin = system.bin || {};

system.bin.rmdir = {
    help: function() {
        return "Remove a directory\n\n  Usage: rmdir [folder name]\n\nNOTE: This command is currently limited to removing folders in the current directory";
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

            if (currentFolder) result = currentFolder.removeChildFolder(folder);

            var message = (result) ? "ok, removed " : "failed to remove ";
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
