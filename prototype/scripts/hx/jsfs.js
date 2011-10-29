/* jsfs.js
 *
 * ++[black[Atomic OS Class: HxJSFS]++
 *
 * Tree structure to contain a temporary file system in JavaScript
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
     * Search tree for the specified property name
     * @param {String} property Property to search for
     * @returns {Array} a list of objects, containing the matched node and it's parent
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
     * Get the file path representation to a subnode
     * @param {String} nodeName Name of the node to search for (eg. an <a href="file.html">HxFile</a>'s name)
     * @returns {String} the file path to a subnode
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
     * Locate a file in this file system
     * @param {String} nodeName Name of the node to locate
     * @returns {Array} a list of file paths containing the passed node name
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
     * @param {String} path File path to process
     * @returns {String} the filename (endpoint of the file path)
     */

    basename: function(path) {
        return (path.match(/\//)) ? path.split('/').pop() : path;
    },

    /* @method listFiles
     * List all files and folders that are immediate children of this node
     * @returns {Array} a sorted list of files and subtrees
     */

    listFiles: function() {
        var acc = [];

        for (var child in this.tree) {
            var node = this.tree[child];
            acc.push({ path: child, file: node });
        }

        return acc.sort(function(a, b) {
            var path1 = a.path.toLowerCase(),
                path2 = b.path.toLowerCase();

            if (path1 < path2) return -1;
            if (path1 > path2) return 1;
            return 0;
        });
    },

    /* @method readFile
     * Read and return an <a href="file.html">HxFile</a>'s contents
     * @param {String} path Path to the file to read from
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
     * @param {String} path File path to node to be written to
     * @param {String} buf Contents to write to an HxFile
     * @param {Bool} append Append to file if true
     * @returns {Bool} true on success
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
     * @param {String} path Absolute path to the desired folder
     * @returns {HxJSFS} false if not found, otherwise an HxJSFS object (or subclass)
     */

    getFolder: function(path) {
            if (path == '/') return system.fs;
            path = path.replace(/\/$/, ''); // trim trailing slash if present

            var folderObj,
                fspath = 'system.fs', //FIXME: figure out path to 'this' for relatve paths
                newpath = '',
                pathParts = path.split('/');

            // create string representation of the javascript object we're going to want
            if (pathParts.length > 1) {
                pathParts.shift();

                for (var i=0; i<pathParts.length; i++) {
                    if (pathParts[i].match(/-/)) { // deal with GUID names
                        newpath += '.tree["' + pathParts[i] + '"]';

                    } else {
                        newpath += '.tree.' + pathParts[i]; // natural names
                    }
                }
            }
            fspath += newpath;

            // try to access and return it if successful
            try {
                folderObj = eval(fspath);

            } catch(e) {
                console.warn('HxJSFS.getFolder: js exception: ' + e);
                return false;
            }

            return folderObj ? folderObj : false;
    },

    /* @method mount
     * Attach an HxJSFS (or subclass) tree to a node
     * @param {String} path Path to mount the file system on
     * @param {HxJSFS} fs The HxJSFS file system to mount
     */

    mount: function(path, fs) {
        var subtreeName = this.basename(fs.name);
        var folder = this.getFolder(path);
        folder.tree[subtreeName] = fs;
    },

    /* @method addChildFolder
     * Creates a named subfolder
     * @param {String} name Name of subfolder
     * @returns {Mixed} subfolder on success, false on failure
     */

    addChildFolder: function(name) {
        this.tree[name] = new HxJSFS({});
        return (this.tree[name] instanceof HxJSFS) ? this.tree[name] : false;
    },

    /* @method removeChildFolder
     * Remove a named subfolder
     * @param {String} name Name of subfolder to delete
     * @returns {Bool} true on success
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
     * @param {String} buf Initial contents of the file
     * @returns {Mixed} file on success, false on failure
     */

    addFile: function(name, buf) {
        buf = buf || '';
        this.tree[name] = new HxFile({
            name: name,
            buffer: buf
        });
        return (this.tree[name] instanceof HxFile) ? this.tree[name] : false;
    },

    /* @method removeFile
     * Delete a named file
     * @param {String} name Name of file to delete
     * @returns {Bool} true on success
     */

    removeFile: function(name) {
        if (this.tree[name] && this.tree[name] instanceof HxFile) {
            delete(this.tree[name]);
            return (this.tree[name]) ? false : true;
        }
    }
});
