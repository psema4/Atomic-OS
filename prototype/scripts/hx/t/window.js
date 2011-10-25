module("HxWindow");
test("load", function() {
    var myWindow = new HxWindow();
    ok(myWindow instanceof HxWindow, "new HxWindow");
});

