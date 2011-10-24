window.system = window.system || {};
system.bin = system.bin || {};

system.bin.touch = {
    help: function() {
        return "Create empty file\n\n  Usage: touch [file name]\n\nNOTE: This command is currently limited to creating files in the current directory";
    },

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var result = false;
            var filename = (args instanceof Array) ? args.shift() : args;
            var folder = system.env.cwd;

            if (filename.match(/^\//)) {
                folder = filename;
                filename = system.fs.basename(folder);
            }

            var currentFolder = system.fs.getFolder(folder);
            if (currentFolder) result = currentFolder.addFile(filename);

            var message = (result) ? "ok, created " : "failed to create ";
            if (stdout) stdout.write(message + 'file "' + filename + '"');

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
