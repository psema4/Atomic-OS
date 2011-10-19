$(document).ready(function() {
    $('body').append('<div id="winroot"></div><div id="fileroot"></div>');

    window.system = window.system || {};
    if (! system.bus) system.bus = HxBus;

    // stream tests
    window.streams = [],

    console.log('creating example stdin stream (autoFlush: true)');
    streams.push(new HxStream({ name: 'stdin (test)', buffer: 'test 1' }));
    HxBus.subscribe(streams[0].name + ':ondata', function() {
        console.log('system: ' + streams[0].name + ' was modified');
    });

    console.log('creating example stdout stream (autoFlush: false)');
    streams.push(new HxStream({ name: 'stdout (test)', buffer: 'test 2', autoFlush: false }));
    HxBus.subscribe(streams[1].name + ':ondata', function() {
        console.log('system: ' + streams[1].name + ' was modified');
    });

    // build default filesystem
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

    // add a /usr
    var usrfs = new HxJSFS({
        name: '/usr',
        tree: {
            local: new HxJSFS({
                name: '/usr/local',
                tree: {
                    readme: new HxFile({
                        name: '/usr/local/readme',
                        buffer: "Lorem ipsum and all that jazz."
                    })
                }
            })
        }
    });

    system.fs.mount("/", usrfs);

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
    var nodeName = 'motd';
    console.log('searching for node "' + nodeName + '"');
    var results = system.fs.find(nodeName);
    for (var i=0; i < results.length; i++) {
        console.log('  found: ' + results[i].path);
    }

    // read/write fs test
    console.log('write test (with notification)');
    system.bus.subscribe('/etc/motd:ondata', function() {
        console.log('system: /etc/motd was modified');
    });
    system.fs.writeFile('/etc/motd', "This is the MOTD: We're close to a console now");

    // environment
    system.env = {
        cwd: '/',
        pwd: '/'
    };

    // command interpreter test
    system.wash = new HxWash();
    window.wash = system.wash.exec;

    wash('echo Going to cat the message of the day...');
    wash('cat /etc/motd');

    // add some panels
    var desktopfs = new HxPanel({
        name: '/mnt/desktop',
        css: {
            position: 'absolute',
                 top: 0,
                left: 0,
               right: 0,
              bottom: 0
        },

        tree: {
            panel1: new HxPanel({
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
    });

    system.fs.mount("/mnt", desktopfs);
    //FIXME: need to improve name support, see panel.js
});
