// derived from https://gist.github.com/897565

var HxJSFS = HxStream.extend({
    init: function(opts) {
        this.tree = opts.tree || {};
        this._super(opts);
    },

    traverse: function(obj, func, parent) {
        for (i in obj) {
            if (typeof(obj[i]) != 'function') func.apply(this, [i, obj[i], parent]);

            if (obj[i] instanceof HxJSFS) {
                this.traverse(obj[i].tree, func, i);
            }
        }
    },

    getNodeRecursive: function(property) {
        var acc = [];

        this.traverse(this.tree, function(key, value, parent) {
            if (key === property) {
                acc.push({ parent: parent, value: value });
            }
        });

        return acc;
    },

    getPath: function(nodeName) {
        var path = '/' + nodeName;

        var matches = this.getNodeRecursive(nodeName);

        if (matches.length > 0) {
            var parentNode = matches[0].parent;
            if (parentNode) path = this.getPath(parentNode) + path;
        }

        return path;
    },

    find: function(nodeName) {
        var acc = [];
        var matches = this.getNodeRecursive(nodeName);

        for (var m in matches) {
            var parentNode = matches[m].parent;
            var path = this.getPath(parentNode) + '/' + nodeName;
            acc.push({ path: path, file: matches[m].value });
        }

        return acc;
    },

    basename: function(path) {
        if (path.match(/\//)) {
            return path.split('/').pop();
        } else {
            return path;
        }
    },

    listFiles: function() {
        var acc = [];

        for (var child in this.tree) {
            var node = this.tree[child];
            acc.push({ path: child, file: node });
        }

        return acc.sort(function(a, b) {
            var path1 = a.path.toLowerCase(), path2 = b.path.toLowerCase();
            if (path1 < path2) return -1;
            if (path1 > path2) return 1;
            return 0;
        });
    },

    readFile: function(path) {
        var nodeName = this.basename(path);
        var candidates = this.find(nodeName);

        for (var i=0; i < candidates.length; i++) {
            if (candidates[i].path == path) {
                return candidates[i].file.read();
            }
        }

        console.warn('file "' + path + '" not found');
        return false;
    },

    writeFile: function(path, buf, append) {
        var nodeName = this.basename(path);
        var candidates = this.find(nodeName);

        for (var i=0; i < candidates.length; i++) {
            if (candidates[i].path == path) {
                if (append) {
                    candidates[i].file.append(buf);
                } else {
                    candidates[i].file.write(buf);

                    try {
                        // update system.bin if necessary
                        if (path.match(/^\/bin\//)) {
                            // FIXME: after saving updated command, running again causes exception SyntaxError: Unexpected token (
                            var warning = 'saving to /bin not currently supported, but trying anyway...';
                            system.wash.fd[1].write(warning);

                            var binpath = 'system' + path.replace(/\//g, '.');
                            var binobj = eval(binpath); // get the exectable object
                            binobj.exec = eval(buf);    // evaluate text to create function object and assign it
                        }
                    } catch(e) {
                        system.wash.fd[1].write("sorry, it didn't work");
                    }
                }
                return true;
            }
        }

        return false;
    },

    getFolder: function(path) {
            if (path == '/') return system.fs;

            path = path.replace(/\/$/, ''); // trim trailing slash

            var fspath = 'system.fs',
                newpath = '',
                pathParts = path.split('/');

            // create a js path
            if (pathParts.length > 1) {
                pathParts.shift();

                for (var i=0; i<pathParts.length; i++) {
                    newpath += '.tree.' + pathParts[i];
                }
            }
            fspath += newpath;

            try {
                var o = eval(fspath);
                return o ? o : false;

            } catch(e) {
                console.warn('fs exception: fs object does not exist');
                return false;
            }
    },

    mount: function(path, fs) {
        var subtreeName = this.basename(fs.name);
        var folder = this.getFolder(path);
        folder.tree[subtreeName] = fs;
    },

    addChildFolder: function(name) {
        this.tree[name] = new HxJSFS({});
        return (this.tree[name] instanceof HxJSFS);
    },

    removeChildFolder: function(name) {
        if (this.tree[name] && this.tree[name] instanceof HxJSFS) {
            delete(this.tree[name]);
            return (this.tree[name]) ? false : true;
        }
    },

    addFile: function(name) {
        this.tree[name] = new HxFile({
            name: name
        });
        return (this.tree[name] instanceof HxFile);
    },

    removeFile: function(name) {
        if (this.tree[name] && this.tree[name] instanceof HxFile) {
            delete(this.tree[name]);
            return (this.tree[name]) ? false : true;
        }
    }
});
