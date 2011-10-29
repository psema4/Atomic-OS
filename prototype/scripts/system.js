window.system = {
    debug: true,

    // wash commands
    bin: system.bin || {},

    // message bus
    bus: (system.bus) ? system.bus : (HxBus) ? HxBus : {},

    // wash environment
    env: {},

    // root file system
    fs: new HxJSFS({
        name: '/',
        tree: {

            bin: new HxJSFS({
                name: '/bin',
                tree: {}
            }),

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

            lib: new HxJSFS({
                name: '/lib',
                tree: {}
            }),

            mnt: new HxJSFS({
                name: '/mnt',
                tree: {}
            }),

            proc: new HxPROCFS({
                name: '/proc',
                tree: {}
            })
        }
    }),

    // system library
    lib: system.lib || {},

    // process container
    proc: {}
};


// copy shell commands into file system
for (var cmd in system.bin) {
    system.fs.tree.bin.tree[cmd] = new HxFile({
        name: '/bin/' + cmd,
        buffer: system.bin[cmd].exec.toString()
    });
}
