require(["jquery", "jquery.alpha", "jquery.beta"], function($) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        // $('body').alpha().beta();
        $('body').append("<b>foo</b>");
    });
});
