$(document).ready(function() {
    $('body').append('<div id="winroot"></div><div id="fileroot"></div>');

    window.system = window.system || {};
    if (! system.bus) system.bus = HxBus;

    system.panels = [];
    system.panels.push(new HxPanel({ mbus: HxBus }));
    system.panels.push(new HxPanel({
        mbus: HxBus,
        css: {
                   position: 'absolute',
                        top: 100,
                       left: 100,
                      right: 100,
                     bottom: 100,
                     border: '2px outset #eee',
            backgroundColor: '#ccc'
        }
    }));
    system.panels.push(new HxPanel({
        mbus: HxBus,
        css: {
                   position: 'absolute',
                        top: 50,
                       left: 250,
                      width: 400,
                     height: 200,
                     border: '2px outset #eee',
            backgroundColor: '#ccc'
        }
    }));

    var rootPanel = system.panels[0];
    rootPanel.subscribe("rollcall", function() { console.log('RollCall: panel0'); });
    system.panels[1].subscribe("rollcall", function() { console.log('RollCall: panel1'); });
    system.panels[2].subscribe("rollcall", function() { console.log('RollCall: panel2'); });

    rootPanel.publish("rollcall");

    console.log('stream tests');

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

    console.log('test group 1');
    new HxTest([
        "assert('read', '"  +          streams[0].read() +                 "', 'test 1');",
        "assert('read', '"  +          streams[1].read() +                 "', 'test 2');",
        "assert('write', '" +          streams[0].write('test 3').read() + "');",
        "assert('write', '" +          streams[1].write('test 4').read() + "');"
    ]).run();

    console.log('test group 2');
    new HxTest([
        "assertNotEqual('reread', '" + streams[0].read() +         "', 'test 3');",
        "assertNotEqual('reread', '" + streams[1].read() +         "', 'foo');"
    ]).run();

    console.log("jsfs tests");

    system.fs = new HxJSFS({
        name: '/',
        tree: {
            bin: new HxJSFS({
                name: '/bin',
                tree: {
                    cat: new HxFile({
                        name: '/bin/cat',
                        buffer: system.bin.cat.exec.toString()
                    }),

                    echo: new HxFile({
                        name: '/bin/echo',
                        buffer: system.bin.echo.exec.toString()
                    }),

                    ls: new HxFile({
                        name: '/bin/ls',
                        buffer: system.bin.ls.exec.toString()
                    }),

                    cd: new HxFile({
                        name: '/bin/cd',
                        buffer: system.bin.cd.exec.toString()
                    }),

                    pwd: new HxFile({
                        name: '/bin/pwd',
                        buffer: system.bin.pwd.exec.toString()
                    })
                }
            }),

            etc: new HxJSFS({
                name: '/etc',
                tree: {
                    motd: new HxFile({
                        name: '/etc/motd',
                        buffer: 'This is motd'
                    })
                }
            }),

            home: new HxJSFS({
                name: '/home',
                tree: {
                    test: new HxJSFS({
                        name: '/home/test',
                        tree: {
                            readme: new HxFile({
                                name: '/home/test/readme',
                                buffer: 'This is readme'
                            }),
                            work: new HxJSFS({
                                name: '/home/test/work',
                                tree: {
                                    notes: new HxFile({
                                        name: '/home/test/work/notes',
                                        buffer: 'These are some work notes'
                                    })
                                }
                            })
                        }
                    }),

                    scott: new HxJSFS({
                        name: '/home/scott',
                        tree: {
                            readme: new HxFile({
                                name: '/home/scott/readme',
                                buffer: 'This is my readme'
                            }),

                            data: new HxJSFS({
                                name: '/home/scott/data',
                                tree: {
                                    readme: new HxFile({
                                        name: '/home/scott/data/readme',
                                        buffer: "This is my data readme"
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    });

    var mntUsr = new HxJSFS({
        name: '/usr',
        tree: {
            local: new HxJSFS({
                name: '/usr/local',
                tree: {
                    readme: new HxFile({
                        name: '/usr/local/readme',
                        buffer: "This is the readme in /usr/local"
                    })
                }
            })
        }
    });

    system.fs.mount("/", mntUsr);

    var nodeName = 'motd';
    console.log('searching for node "' + nodeName + '"');
    var results = system.fs.find(nodeName);
    for (var i=0; i < results.length; i++) {
        console.log('  found: ' + results[i].path);
    }

    console.log('write test (with notification)');
    system.bus.subscribe('/etc/motd:ondata', function() {
        console.log('system: /etc/motd was modified');
    });
    system.fs.writeFile('/etc/motd', "This is the MOTD: We're close to a console now");

    system.env = {
        cwd: '/',
        pwd: '/'
    };

    system.wash = new HxWash();
    window.wash = system.wash.exec;

    wash('echo Going to cat the message of the day...');
    wash('cat /etc/motd');
});
