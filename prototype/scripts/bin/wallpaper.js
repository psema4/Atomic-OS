window.system = window.system || {};
system.bin = system.bin || {};

system.bin.wallpaper = {
    help: function() {
        return "Sets the desktop wallpaper\n\n  Usage: wallpaper\n\nThis command can currently only add/remove one graphic [css class=\"bg-tile\"]";
    },

    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            dObj   = system.fs.tree.mnt.tree.desktop;
            dName  = dObj.name;
            dEl = $('#' + dName);
            if (dEl.hasClass('bg-tile')) {
                dEl.removeClass('bg-tile');
            } else {
                dEl.addClass('bg-tile');
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
