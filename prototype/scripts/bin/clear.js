window.system = window.system || {};
system.bin = system.bin || {};

system.bin.clear = {
    help: function() {
        return "Clear command console's output window\n\n  Usage: clear\n\nNote: the clear command is currently broken.  After running this command, the global wash stdout stream will no longer echo to the console window";
    },

    exec: function(args) {
        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            // specific to the global test console cmdWindow, see main.js
            // FIXME: the cls() method is broken, see commandwindow.js
            if (cmdWindow && cmdWindow.cls) cmdWindow.cls();

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
