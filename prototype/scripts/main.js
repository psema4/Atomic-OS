$(document).ready(function() {
    $('body').append('<div id="winroot"></div><div id="fileroot"></div>');

    // system setup (use system.js to configure)
    window.system = window.system || {};
    if (! system.bus) system.bus = HxBus;


    // environment setup
    system.env = {
        home:'/home/guest',
        cwd: '/home/guest',
        pwd: '/',
        mobile: (navigator.userAgent.match(/mobile/i) ||
                 navigator.userAgent.match(/fennec/i)) ? true : false
    };


    // command interpreter setup (init process will load here instead of wash)
    system.wash = new HxWash();
    window.wash = function(args) { system.wash.exec.call(system.wash, args); };


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


    // build /mnt/dom from dom objects
    var domfs = new HxDOMFS({
        name: '/mnt/dom',
        tree: {}
    });

    var divList = $('.domfile');
    
    for (var div=0; div < divList.length; div++) {
        var name = '/mnt/dom/';
        var id = divList[div].id;
            id = '/' + id.replace(/-/g, '/'); // make filepath
        var basename = system.fs.basename(id);

        if (id) {
            name = id;
        } else {
            name += div;
        }

        domfs.tree[basename] = new HxFile({
            name: name,
            buffer: divList[div].textContent
        });
    }

    system.fs.mount("/mnt", domfs);


    // add a desktop mount and attach panels
    //FIXME: need to improve name support, see panel.js

    var desktopfs = new HxPanel({
        name: '/mnt/desktop',
        css: {
               position: 'absolute',
                    top: 0,
                   left: 0,
                  right: 0,
                 bottom: 0,
                 border: '0px solid #000',
        backgroundColor: 'rgba(127,192,127,0.9)',
           borderRadius: '0px',
        mozBorderRadius: '0px'
        },

        tree: {}
    });

    system.fs.mount("/mnt", desktopfs);

    $('#desktop').append('<div class="taskbar"></div>');


    // prevent global wash from flushing stdout on read so we can mirror it to the command window's output
    system.wash.fd[1].autoFlush = false;

    // window test - this needs to break out into a webtty process which should contain it's on HxWASH interpreter
    var left = '1%',
        width = '48%';

    if (system.env.mobile) {
        left = '1%';
        width = '98%';
    }

    window.cmdWindow = new HxCommandWindow({
        parentEl: 'desktop',
        mount: '/mnt/desktop',
        title: 'Command Console',
        defaultStyle: false, // use system chrome [absolute positioning, gray background & outset border: see HxWindow.init()]
        css: { top: '40px', left: left, width: width, bottom: '3%', position: 'absolute', backgroundColor: '#fff', border: '2px outset #ddd' },

        inputHandler: function(buf) {
            system.wash.fd[0].write(buf);
        },

        outputHandler: function() {
            var buf = system.wash.fd[1].read() + "\n";
            var output = $('#' + cmdWindow.name + '-output');
            output.append(buf);
            output[0].scrollTop = output[0].scrollHeight;
        },

        errorHandler: function() {
        }
    });

    // tie global wash's stdout to cmdWindow output
    var stdout = system.wash.fd[1];
    stdout.bus.subscribe(stdout.name + ':ondata', cmdWindow.outputHandler);

    // add a taskbutton
    $('.taskbar').append('<button id="cmdwin-taskbtn" class="ui-btn-pressed">Console</button>');
    $('#cmdwin-taskbtn').click(function() {
        $('#' + cmdWindow.name).toggle('hide');
        this.className = (this.className.match(/ui-btn-pressed/)) ? 'ui-btn' : 'ui-btn-pressed';
    });

    var right = left; // mirror cmdWindow left position
    window.editWindow = new HxEditWindow({
        parentEl: 'desktop',
        mount: '/mnt/desktop',
        title: 'File Editor',
        defaultStyle: true,
        css: { top: '40px', right: right, width: width, bottom: '3%' },

        intputHandler: function(buf) {
        },

        outputHandler: function() {
        },

        errorHandler: function() {
        }
    });

    // add a taskbutton
    $('.taskbar').append('<button id="editwin-taskbtn" class="ui-btn-pressed">Editor</button>');
    $('#editwin-taskbtn').click(function() {
        $('#' + editWindow.name).toggle('hide');
        this.className = (this.className.match(/ui-btn-pressed/)) ? 'ui-btn' : 'ui-btn-pressed';
    });

    window.docWindow = new HxDocWindow({
        parentEl: 'desktop',
        mount: '/mnt/desktop',
        title: 'Documentation',
        defaultStyle: true,
        css: {
            top: 40,
            left: 0,
            right: 0,
            bottom: '3%'
        }
    });

    // add a taskbutton
    $('.taskbar').append('<button id="docwin-taskbtn" class="ui-btn-pressed">Docs</button>');
    $('#docwin-taskbtn').click(function() {
        $('#' + docWindow.name).toggle('hide');
        this.className = (this.className.match(/ui-btn-pressed/)) ? 'ui-btn' : 'ui-btn-pressed';
    });

    $('#editwin-taskbtn')[0].click();
    $('#docwin-taskbtn')[0].click();

    wash("cat /mnt/dom/motd");
});
