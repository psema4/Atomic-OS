/* jsfs.js
 *
 * ++[black[Atomic OS Class: HxJSFS]++
 *
 * Tree structure to contain temporary filesystem in JavaScript
 *
 * Derived from https://gist.github.com/897565
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */


var HxJSFS = HxStream.extend({
    /* @constructor
     * @method init
     * Extends <a href="stream.html">HxStream</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this.tree = opts.tree || {};
        this._super(opts);
    },

    /* @method traverse
     * Crawls a tree, executing a callback on each node found
     * @param {Object} obj Object to crawl
     * @param {Function} fn Function to call on each node
     * @param {Object} parent Parent node
     */

    traverse: function(obj, fn, parent) {
        for (i in obj) {
            if (typeof(obj[i]) != 'function') fn.apply(this, [i, obj[i], parent]);

            if (obj[i] instanceof HxJSFS) {
                this.traverse(obj[i].tree, fn, i);
            }
        }
    },

    /* @method getNodeRecursive
     * Search a tree of objects looking for a particular property name
     * @param {String} property Property to search for
     * @returns {Array} Returns a list of objects, containing the matched node and it's parent
     */

    getNodeRecursive: function(property) {
        var acc = [];

        this.traverse(this.tree, function(key, value, parent) {
            if (key === property) {
                acc.push({ parent: parent, value: value });
            }
        });

        return acc;
    },

    /* @method getPath
     * Get the filepath representation of a node
     * @param {String} nodeName Name of the node to search for (eg. an HxFile filename)
     * @returns {String} Returns the filepath to a node
     */

    getPath: function(nodeName) {
        var path = '/' + nodeName;

        var matches = this.getNodeRecursive(nodeName);

        if (matches.length > 0) {
            var parentNode = matches[0].parent;
            if (parentNode) path = this.getPath(parentNode) + path;
        }

        return path;
    },

    /* @method find
     * Locate a file under this filesystem
     * @param {String} nodeName Name of the node to locate
     * @returns {Array} Returns a list of potentially matching filepaths
     */

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

    /* @method basename
     * @param {String} path Filepath to return basename
     * @returns {String} Strips the filename from a full filepath
     */

    basename: function(path) {
        if (path.match(/\//)) {
            return path.split('/').pop();
        } else {
            return path;
        }
    },

    /* @method listFiles
     * List all files and folders that are immediate children of this node
     * @returns {Array} Returns a sorted list of files and subtrees
     */

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

    /* @method readFile
     * Read and return an HxFile's contents
     * @param {String} path Filepath to node to be read
     * @returns {String} file contents
     */

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

    /* @method writeFile
     * @param {String} path Filepath to node to be written to
     * @param {String} buf Contents to write to an HxFile
     * @param {Bool} append Append to file if true
     * @returns {Bool} True on success
     */

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

    /* @method getFolder
     * @param {String} path Filepath to desired folder
     * @returns {HxJSFS} False if not found, otherwise a JSFS object (or subclass)
     */

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

    /* @method mount
     * Attach an HxJSFS (or subclass) tree to a node
     * @param {String} path Filepath to mount a filesystem onto
     * @param {HxJSFS} fs An instantiated filesystem to mount
     */

    mount: function(path, fs) {
        var subtreeName = this.basename(fs.name);
        var folder = this.getFolder(path);
        folder.tree[subtreeName] = fs;
    },

    /* @method addChildFolder
     * Creates a named subfolder
     * @param {String} name Name of subfolder
     * @returns {Bool} True on success
     */

    addChildFolder: function(name) {
        this.tree[name] = new HxJSFS({});
        return (this.tree[name] instanceof HxJSFS);
    },

    /* @method removeChildFolder
     * Remove a named subfolder
     * @param {String} name Name of subfolder to delete
     * @returns {Bool} True on success
     */

    removeChildFolder: function(name) {
        if (this.tree[name] && this.tree[name] instanceof HxJSFS) {
            delete(this.tree[name]);
            return (this.tree[name]) ? false : true;
        }
    },

    /* @method addFile
     * Create an empty HxFile
     * @param {String} name Name of file to create
     * @returns {Bool} True on success
     */

    addFile: function(name) {
        this.tree[name] = new HxFile({
            name: name
        });
        return (this.tree[name] instanceof HxFile);
    },

    /* @method removeFile
     * Delete a named file
     * @param {String} name Name of file to delete
     * @returns {Bool} True on success
     */

    removeFile: function(name) {
        if (this.tree[name] && this.tree[name] instanceof HxFile) {
            delete(this.tree[name]);
            return (this.tree[name]) ? false : true;
        }
    }
});
