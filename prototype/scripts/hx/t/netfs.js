module("HxNETFS");
test("load", function() {
    var myfs = new HxNETFS({
        name: '/',
        tree: {}
    });
    ok(myfs instanceof HxNETFS, "new HxNETFS");
});

