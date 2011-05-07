var F_READ = 1,
    F_WRITE = 2,
    F_APPEND = 3;

var F_MODES = {
    1: 'F_READ',
    2: 'F_WRITE',
    3: 'F_APPEND'
};

function Node(opts) {
    this.children = [];
    this.index = -1;
    this.mode = F_READ;
    this.filename = '';
    this.data = '';

    for (var opt in opts) {
        this[opt] = opts[opt];
    }

    this.filename = (this.filename == '') ? 'node_' + this.index : this.filename;

    this.open = function(mode) {
        switch(mode) {
            case 'w':
                this.mode = F_WRITE;
                break;

            case 'a':
                this.mode = F_APPEND;
                break;

            case 'r':
            default:
                this.mode = F_READ;
        }
        if (this.onpen) this.onopen();
        return this.mode;
    }

    this.close = function() {
        if (this.onclose) this.onclose();
        return this.open();
    }

    this.read = function() {
        if (this.onread) this.onread();
        return this.data
    }

    this.write = function(data) {
        if (this.onwrite) this.onwrite();
        switch (this.mode) {
            case F_WRITE:
                this.data = data;
                break;

            case F_APPEND:
                this.data += data;
                break;

            default:
                return 0;
        }
        return this.data.length;
    }

    this.addChild = function(opts) {
        if (this.onaddchild) this.onaddchild();
        opts = (opts) ? opts : {};
        opts.index = this.children.length
        opts.parent = this;
        this.children[opts.index] = new Node(opts);
        return this.children[opts.index];
    }

    this.hasChild = function(name) {
        for (var child in this.children) {
            if (this.children[child].filename == name) {
                return true;
            }
        }
        return false;
    }

    this.hasParent = function() {
        return (this.parent) ? this.parent : false;
    }

    this.getParent = function() {
        return (this.parent) ? this.parent : false;
    }

    this.getChildByName = function(name) {
        for (var child in this.children) {
            if (this.children[child].filename == name) {
                return this.children[child];
            }
        }
    }

    this.lsChildren = function() {
        var filenames = [];
        for (var child in this.children) {
            filenames.push({index: this.children[child].index, filename: this.children[child].filename});
        }
        return filenames;
    }
}
