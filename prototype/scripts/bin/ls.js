window.system = window.system || {};
system.bin = system.bin || {};

system.bin.ls = {
    exec: function(args) {
        try {
            var path = (args instanceof Array) ? args.shift() : args;
            if (! path && system.env && system.env.cwd) path = system.env.cwd;

            console.log(path + ':');

            var fspath = system.fs.getFolder(path);
            if (fspath) {
                var results = fspath.listFiles(); // pre-sorted by listFiles()

                for (var i=0; i<results.length; i++) {
                    var result = results[i].path;
                    var file = results[i].file;

                    var postfix = (file && file.tree) ? '/' : '';
                    console.log( '  ' + result + postfix );
                }
            } else {
                console.warn("folder not found");
            }

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
