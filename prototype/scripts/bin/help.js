window.system = window.system || {};
system.bin = system.bin || {};

system.bin.help = {
    help: function() {
        return "Simple help utility\n\n  Usage: help [command name]";
    },

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var cmd = args instanceof Array ? args[0] : 'help';

            if (system.bin[cmd]) {
                var message = 'Help not available for command "' + cmd + '"';

                if (system.bin[cmd].help) message = system.bin[cmd].help();
                if (stdout) stdout.write(message);
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
