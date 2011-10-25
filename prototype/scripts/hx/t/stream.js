module("HxStream");
test("load", function() {
    var myStream = new HxStream();
    ok(myStream instanceof HxStream, "new HxStream");
});

