$(document).ready(function() {
    $('body').append('<div id="winroot"></div><div id="fileroot"></div>');


    // system setup (use system.js to configure)
    window.system = window.system || {};
    if (! system.bus) system.bus = HxBus;


    // environment setup
    system.env = {
        cwd: '/',
        pwd: '/'
    };


    // command interpreter setup (init process will load here instead of wash)
    system.wash = new HxWash();
    window.wash = system.wash.exec;


    // create filesystem
    system.fs = new HxJSFS({
        name: '/',
        tree: {
            etc: new HxJSFS({
                name: '/etc',
                tree: {
                    motd: new HxFile({
                        name: '/etc/motd',
                        buffer: 'Welcome to Atomic OS 2'
                    })
                }
            }),

            home: new HxJSFS({
                name: '/home',
                tree: {
                    guest: new HxJSFS({
                        name: '/home/guest',
                        tree: {
                            readme: new HxFile({
                                name: '/home/guest/readme',
                                buffer: 'Lorem ipsum and all that jazz.'
                            }),

                            data: new HxJSFS({
                                name: '/home/guest/data',
                                tree: {
                                    readme: new HxFile({
                                        name: '/home/guest/data/settings',
                                        buffer: "# Sample config"
                                    })
                                }
                            })
                        }
                    })
                }
            }),

            mnt: new HxJSFS({
                name: '/mnt',
                tree: {}
            })
        }
    });


    // build /bin from command objects
    var binfs = new HxJSFS({
        name: '/bin',
        tree: {}
    });

    for (var cmd in system.bin) {
        binfs.tree[cmd] = new HxFile({
            name: '/bin/' + cmd,
            buffer: system.bin[cmd].exec.toString()
        });
    }

    system.fs.mount("/", binfs);


    // fs search test
    var nodeName = 'readme';
    console.log('searching for node "' + nodeName + '"');
    var results = system.fs.find(nodeName);
    for (var i=0; i < results.length; i++) {
        console.log('  found: ' + results[i].path);
    }


    // fs read/write test
    console.log('write test (with notification)');
    system.bus.subscribe('/etc/motd:ondata', function(len) {
        console.log('system: /etc/motd was modified (buffer size: ' + len +')');
    });
    system.fs.writeFile('/etc/motd', "This is the MOTD: We're close to a console now");


    // command interpreter tests
    wash('echo [NOTE] Going to cat the message of the day...');
    wash('cat /etc/motd');
    wash('echo [NOTE] FS root:');
    wash('ls');
    wash('echo [NOTE] Change to home directory');
    wash('cd /home/guest');
    wash('ls');


    // add a desktop mount and attach panels
    //FIXME: need to improve name support, see panel.js

    var desktopfs = new HxPanel({
        name: '/mnt/desktop',
        css: {
            position: 'absolute',
                 top: 0,
                left: 0,
               right: 0,
              bottom: 0
        },

        tree: {}
    });

    system.fs.mount("/mnt", desktopfs);

    var panels = {
        panel1: new HxPanel({
            parentEl: 'desktop', // basename for /mnt/desktop (see FIXME note)
            css: {
                   position: 'absolute',
                        top: 100,
                       left: 100,
                      right: 100,
                     bottom: 100,
                     border: '2px outset #eee',
            backgroundColor: '#ccc'
            }
        }),

        panel2: new HxPanel({
            parentEl: 'desktop', // basename for /mnt/desktop (see FIXME note)
            css: {
                   position: 'absolute',
                        top: 50,
                       left: 250,
                      width: 400,
                     height: 200,
                     border: '2px outset #eee',
            backgroundColor: '#ccc'
            }
        })
    }

    system.fs.tree.mnt.tree = panels;
});
