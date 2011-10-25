module("HxDOMFS");
test("load", function() {
    var myfs = new HxDOMFS({
        name: '/',
        tree: {}
    });
    ok(myfs instanceof HxDOMFS, "new HxDOMFS");
});

