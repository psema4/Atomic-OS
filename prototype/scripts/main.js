require([  "jquery",
           "hx/mbus",
           "hx/panel1",
           "bin/interpreter",
           "bin/mycommand"
        ], function($) {

            $(function() {
                $('body').append("<b>foo</b>");

                // mbus check
                var panels = [];
                panels.push(new HxPanel({ }));

                window.rootPanel = panels[0];

                // wash check
                Interpreter.execute("MyCommand foo bar baz"); 
            });
});
