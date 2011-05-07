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
    console.log(system.env.cwd);
}

function cd(node) {
    var retval = false;
    var cwd = parsePath(system.env.cwd);

    if (typeof(node) !== 'object') {
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

    var p = getPath(node);
    if (p) {
        system.log('cd set system.env.cwd');
        system.env.cwd = p;
        retval = true;
    }

    return retval;
}

function mkdir(name) {
    var node = parsePath(system.env.cwd);
    node.addChild({filename: name});
}

function fprint(node, data) {
    if (typeof(node) !== 'object') {
        node = parsePath(node);
    }

    if (data) return node.write(data);
}

function cat(node) {
    if (typeof(node) !== 'object') {
        node = parsePath(node);
    }

    console.log(node.read());
}

function open(node, mode) {
    mode = (mode) ? mode : 'r';
    if (typeof(node) !== 'object') {
        node = parsePath(node);
    }

    var msg = getPath(node) + ' opened for ';
    var m = node.open(mode);
    msg += F_MODES[''+m];
    console.log(msg);
}

function close(node) {
    if (typeof(node) !== 'object') {
        node = parsePath(node);
    }

    node.close();
}

function stat(node) {
    if (typeof(node) !== 'object') {
        node = parsePath(node);
    }

    if (! node) return false;

    console.log("         Filename: " + node.filename);
    console.log("         Filesize: " + node.data.length);
    console.log("             Mode: " + F_MODES[''+node.mode]);
    console.log("       # Children: " + node.children.length);

    var parentNode = node.getParent();
    if (parentNode) {
        var siblings = node.parent.children.length;
        siblings--;
        console.log("       # Siblings: " + siblings);
        console.log("  Parent Filename: " + parentNode.filename);
    }
}

function ls(node) {
    node = (node) ? node : parsePath(system.env.cwd);
    if (typeof(node) !== 'object') {
        node = parsePath(node);
    }

    console.log('listing for ' + getPath(node) + ":\n");

    var files = (node.children.length >= 0) ? node.lsChildren() : [];
    var output = '';

    var path = getPath(node);

    for (var file in files) {
        output += path + '/' + files[file].filename + "\n";
    }

    output = output.replace(/\n$/, '');
    return output;
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
