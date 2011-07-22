//require(["jquery", "jquery.alpha", "jquery.beta"], function($) {
require(["jquery", "hx/mbus", "hx/panel1", "bin/interpreter", "bin/mycommand"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        // $('body').alpha().beta();
        $('body').append("<b>foo</b>");
        var panels = [];
        panels.push(new HxPanel({ }));

        window.rootPanel = panels[0];

       Interpreter.execute("MyCommand foo bar baz"); 
    });
});
