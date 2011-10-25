module("HxProcess");
test("load", function() {
    var myProcess = new HxProcess();
    ok(myProcess instanceof HxProcess, "new HxProcess");
});

