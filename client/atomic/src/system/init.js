function System() {
    this.version = 0.1;
    this.debug = false;
    this.env = new Env();
    this.vfs = new Node({ filename: '/' });
    this.tasks = new Array();

    this.log = function(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }

    this.init = function() {
        if (system) {
            system.log('system init');

            var vfs = system.vfs;

            var bin = vfs.addChild({ filename: 'bin' });
            var dev = vfs.addChild({ filename: 'dev' });
            vfs.addChild({ filename: 'etc' });
            vfs.addChild({ filename: 'home' });
            vfs.addChild({ filename: 'proc' });
            vfs.addChild({ filename: 'sbin' });
            vfs.addChild({ filename: 'tmp' });
            vfs.addChild({ filename: 'usr' });
            vfs.addChild({ filename: 'var' });

            bin.addChild({filename: 'foo'});
            bin.addChild({filename: 'bar'});
            bin.addChild({filename: 'baz'});
            bin.getChildByName('foo').addChild({filename: 'barbaz'});

            var devwash = dev.addChild({filename: 'wash'});
            var stdin = devwash.addChild({filename: 'stdin'});
            var stdout = devwash.addChild({filename: 'stdout'});

            system.tasks.push(new WASH());
            stdin.onread = function() {
                system.log('/dev/wash/stdin: onread called');
            }
            window.wash = system.tasks[0];

        } else {
            console.log("No system!");
        }
    }
}

var system = new System();
window.addEventListener("load", system.init);
