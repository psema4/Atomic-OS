module("HxWash");
test("load", function() {
    var myWash = new HxWash();
    ok(myWash instanceof HxWash, "new HxWash");
});

