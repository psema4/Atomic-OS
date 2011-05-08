function initrc() {
    var filename = '/bin/foo/barbaz';
    var msg = 'hello, world!';

    stat(filename);
    open(filename, 'w');
    fprint(filename, msg);
    close(filename);
}

function readme() {
/*
    pwd         print system.env.cwd
    cd          change system.env.cwd
    mkdir       create a folder
    fprint      print to file
    cat         print file
    open        change file mode
    close       make file read only (default open mode)
    stat        print file info
    ls          list files
    getPath     determine path from heirarchy
    parsePath   find file node using a path string
*/
}

function pwd() {
    return system.env.cwd;
}

function cd(node) {
    var retval = false;
    var cwd = parsePath(system.env.cwd);

    if (typeof(node) === 'string') {
        if (node.match(/^\//)) {
            system.log('cd to absolute path');
            node = parsePath(node);

        } else if (node.match(/^\.\./)) {
            system.log('cd to parent folder, relative to cwd');
            var parentNode = cwd.hasParent();
            node = (parentNode) ? parentNode : cwd;

        } else {
            system.log('cd to folder, relative to cwd');
            var name = node;
            node = (cwd.hasChild(name)) ? cwd.getChildByName(name) : cwd;
        }
    }

    if (! node) return false;
    if (! node instanceof(Node)) return false;

    var p = getPath(node);
    if (p) {
        system.log('cd set system.env.cwd');
        system.env.cwd = p;
        retval = system.env.cwd;
    }

    return retval;
}

function mkdir(path) {
    var name = path;

    if (name.match('/')) {
        path = name.match(/(.*)\/(.*)$/)[1];
        name = name.match(/(.*)\/(.*)$/)[2];

    } else {
        path = system.env.cwd;
    }

    system.log('mkdir "' + name + '" in ' + path);

    var node = parsePath(path);
    var fh = node.addChild({filename: name});

    return (fh instanceof Node) ? fh : false;
}

function fprint(node, data) {
    if (! node) return false;
    if (typeof(node) === 'string') node = parsePath(node);
    if (! node instanceof(Node)) return false;
system.log('node found, writing data: ' + data);
    if (data) return node.write(data);
}

function cat(node) {
    if (! node) return false;
    if (typeof(node) === 'string') node = parsePath(node);
    if (! node instanceof(Node)) return false;

    system.log(node.read());
    return node.read();
}

function touch(path) {
    var name = path;

    if (name.match('/')) {
        path = name.match(/(.*)\/(.*)$/)[1];
        name = name.match(/(.*)\/(.*)$/)[2];

    } else {
        path = system.env.cwd;
    }

    system.log('touching "' + name + '" in ' + path);

    var node = parsePath(path);
    var fh = node.addChild({filename: name});

    return (fh instanceof Node) ? fh : false;
}

function open(node, mode) {
    if (! node) return false;
    if (typeof(node) === 'string') node = parsePath(node); 
    if (! node instanceof(Node)) return false;
    mode = (mode) ? mode : 'r';

    var p = getPath(node);
    system.log('open ' + p + ' for ' + mode);
    var msg = p + ' opened for ';
    var m = node.open(mode);
    msg += F_MODES[''+m];
    system.log(msg);
    return F_MODES[''+m];
}

function close(node) {
    if (! node) return false;
    if (typeof(node) === 'string') node = parsePath(node);
    if (! node instanceof(Node)) return false;

    return node.close();
}

function stat(node) {
    if (! node) return false;
    if (typeof(node) === 'string') node = parsePath(node);
    if (! node instanceof(Node)) return false;

    system.log("         Filename: " + node.filename);
    system.log("         Filesize: " + node.data.length);
    system.log("             Mode: " + F_MODES[''+node.mode]);
    system.log("       # Children: " + node.children.length);

    var parentNode = node.getParent();
    if (parentNode) {
        var siblings = node.parent.children.length;
        siblings--;
        system.log("       # Siblings: " + siblings);
        system.log("  Parent Filename: " + parentNode.filename);
    }
}

function ls(node) {
    node = (node) ? node : parsePath(system.env.cwd);
    if (! node) return false;
    if (typeof(node) === 'string') node = parsePath(node);
    if (! node instanceof(Node)) return false;

    system.log('listing for ' + getPath(node) + ":\n");

    var files = (node.children.length >= 0) ? node.lsChildren() : [];
    var output = '';

    var path = getPath(node);

    for (var file in files) {
        output += path + '/' + files[file].filename + "\n";
    }

    output = output.replace(/\n$/, '');
    //return output;
    return output.split("\n");
}

function getPath(node, path) {
    path = (path) ? path : '';
    if (! node) return false;

    path = (node.hasParent())
        ? path = node.filename + '/' + path
        : path = node.filename + path; // vfs root

    if (node && node.hasParent()) {
        var parentNode = node.getParent();
        path = getPath(parentNode, path);
    }

    return (node) ? path.replace(/\/$/,'') : false;
}

function parsePath(path) {
    if (path == '/') return system.vfs;

    var parts = path.split(/\//);
    parts.shift();
    var index = 0;
    var node = system.vfs;
    var found = 0;

    for (var i=0; i < parts.length; i++) {
        if (node.hasChild(parts[i])) {
            node = node.getChildByName(parts[i]);
            found++;
        }
    }

    return (found == parts.length) ? node : false;
}
