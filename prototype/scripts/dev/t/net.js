module("HxClass");
test("load", function() {
    var myClass = new HxClass();
    ok(myClass instanceof HxClass, "new HxClass");
});

