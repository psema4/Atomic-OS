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
});
