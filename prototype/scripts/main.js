$(document).ready(function() {
    $('body').append('<div id="winroot"></div><div id="fileroot"></div>');

    window.panels = [];
    panels.push(new HxPanel({ mbus: HxBus }));
    panels.push(new HxPanel({
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
    panels.push(new HxPanel({
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

    var rootPanel = panels[0];
    rootPanel.subscribe("rollcall", function() { console.log('RollCall: panel0'); });
    panels[1].subscribe("rollcall", function() { console.log('RollCall: panel1'); });
    panels[2].subscribe("rollcall", function() { console.log('RollCall: panel2'); });

    rootPanel.publish("rollcall");

    window.files = [];
    files.push(new HxFile({
        name: 'test-sh',
        data: 'Hello, World!'
    }));

    files[0].append(' [ ok ]');

    wash.exec("wash.lib.cat test-sh");

    window.streams = [],

    streams.push(new HxStream({  buffer: 'test1' }));
    HxBus.subscribe(streams[0].name + '/ondata', function() {
        console.log(streams[0].name + ': stdin has data');
    });

    streams.push(new HxStream2({ buffer: 'test2' }));
    HxBus.subscribe(streams[1].name + '/ondata', function() {
        console.log(streams[1].name + ': stdout has data');
    });

    console.log('test group 1');
    new HxTest([
        "assert('read', '"  +          streams[0].read() +                 "', 'test1');",
        "assert('read', '"  +          streams[1].read() +                 "', 'test2');",
        "assert('write', '" +          streams[0].write('test 4').read() + "');",
        "assert('write', '" +          streams[1].write('test 5').read() + "');"
    ]).run();

    console.log('test group 2');
    new HxTest([
        "assertNotEqual('reread', '" + streams[0].read() +                 "', 'test 6');",
        "assertNotEqual('reread', '" + streams[1].read() +                 "', 'test 7');"
    ]).run();
});
