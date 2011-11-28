$(document).ready(function() {
    console.log('System starting... this is main');
    $('body').append('<div id="winroot"></div><div id="fileroot"></div>');


    console.log('Setting up environment');
    system.env = {
        home:'/home/guest',
        cwd: '/home/guest',
        pwd: '/',
        mobile: (navigator.userAgent.match(/mobile/i) ||
                 navigator.userAgent.match(/fennec/i)) ? true : false
    };


    console.log('Loading init process (wash)'); // FIXME: Create an init process
    system.proc.wash = new HxWash();
    window.wash = function(args) { system.proc.wash.exec.call(system.proc.wash, args); };

    //-- application code should be loaded by init into process; the following
    //-- are leftovers from early testing and act as proof of concept

    // mount netfs test
    console.log('Creating netfs');
    var netfs = new HxNETFS({
        name: '/mnt/remote',
        tree: {}
    });

    system.fs.mount("/mnt", netfs);
    var msg = (system.fs.tree.mnt.tree.remote instanceof HxNETFS) ? '[ OK ]' : '[FAIL]';
    console.log('Mount netfs ' + msg);

    // mount dom test (convert to HxProcess)

    console.log('Creating domfs');
    var domfs = new HxDOMFS({
        name: '/mnt/dom',
        tree: {}
    });

    // populate from existing divs
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
    var msg = (system.fs.tree.mnt.tree.dom instanceof HxJSFS) ? '[ OK ]' : '[FAIL]';
    console.log('Mount domfs ' + msg);

    // desktop test (convert to HxProcess)

    console.log('Creating desktop');
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
    msg = (system.fs.tree.mnt.tree.desktop instanceof HxJSFS) ? '[ OK ]' : '[FAIL]';
    console.log('Mount desktop ' + msg);

    $('#desktop').append('<div class="taskbar"></div>');


    // prevent global wash from flushing stdout on read so we can mirror it to the command window's output
    console.log('Sharing global stdout')
    system.proc.wash.fd[1].autoFlush = false;


    console.log('Creating UI');
    // window test - this needs to break out into a webtty process and have it's own HxWASH interpreter
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
            system.proc.wash.fd[0].write(buf);
        },

        outputHandler: function() {
            var buf = system.proc.wash.fd[1].read() + "\n";
            var output = $('#' + cmdWindow.name + '-output');
            output.append(buf);
            output[0].scrollTop = output[0].scrollHeight;
        },

        errorHandler: function() {
        }
    });

    // tie global wash's stdout to cmdWindow output
    var stdout = system.proc.wash.fd[1];
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

    console.log('Starting tcl');
    system.proc.tcl = new HxTcl();
    window.tcl = function(args) { return system.proc.tcl.exec.call(system.proc.tcl, args); };


    console.log('Startup complete.');
    wash("cat /mnt/dom/motd");
});
