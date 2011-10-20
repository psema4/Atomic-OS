window.system = window.system || {};
system.bin = system.bin || {};

system.bin.ls = {
    exec: function(args) {
        // 'this' is the calling process

        var stdin  = (this.fd && this.fd.length > 0) ? this.fd[0] : false;
        var stdout = (this.fd && this.fd.length > 1) ? this.fd[1] : false;
        var stderr = (this.fd && this.fd.length > 2) ? this.fd[2] : false;

        try {
            var path = (args instanceof Array) ? args.shift() : args;
            if (! path && system.env && system.env.cwd) path = system.env.cwd;

            var output = path + ':' + "\n";

            var fspath = system.fs.getFolder(path);
            if (fspath) {
                var results = fspath.listFiles(); // pre-sorted by listFiles()

                for (var i=0; i<results.length; i++) {
                    var result = results[i].path;
                    var file = results[i].file;

                    var postfix = (file && file.tree) ? '/' : '';
                    output += '  ' + result + postfix + "\n";
                }

                output = output.replace(/\n$/, ''); // remove trailing newline

            } else {
                output = "folder not found";
            }

            if (stdout) {
                stdout.write(output);
            } else {
                console.log(output);
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
