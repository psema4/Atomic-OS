module("HxJSFS");
test("load", function() {
    var myfs = new HxJSFS({
        name: '/',
        tree: {}
    });
    ok(myfs instanceof HxJSFS, "new HxJSFS");
});
