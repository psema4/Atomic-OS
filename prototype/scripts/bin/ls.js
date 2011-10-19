window.system = window.system || {};
system.bin = system.bin || {};

system.bin.ls = {
    exec: function(args) {
        var getPath = function(path) {
            if (path == '/') return system.fs;

            path = path.replace(/\/$/, '');

            var pathParts = path.split('/');

            if (pathParts.length > 1) {
                pathParts.shift();

                var fspath = "system.fs";
                var newpath = '';

                for (var i=0; i<pathParts.length; i++) {
                    newpath += '.tree.' + pathParts[i];
                }
            }

            fspath += newpath;
            var o = eval(fspath);

            return o ? o : false;
            
        };

        try {
            var path = (args instanceof Array) ? args.shift() : args;

            if (! path && system.env && system.env.cwd) path = system.env.cwd;

            console.log(path + ':');

            var fspath = getPath(path);
            if (fspath) {
                var results = fspath.listFiles();

                for (var i=0; i<results.length; i++) {
                    var result = results[i].path;
                    var file = results[i].file;

                    var postfix = (file) ? '/' : '';
                    console.log( '  ' + result );
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
