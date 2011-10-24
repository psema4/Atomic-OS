window.system = window.system || {};
system.bin = system.bin || {};

system.bin.edit = {
    help: function() {
        return "Edit file in File Editor\n\n  Usage: edit [filepath]\n\nNOTE: This command is currently tied to the temporary File Editor window.";
    },

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var filepath = args[0];
            if (editWindow) {
                $('#' + editWindow.name + '-filename').val(filepath);
                editWindow.load(filepath);
            }

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
