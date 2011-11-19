module("HxDevice");
test("load", function() {
    var myDevice = new HxDevice();
    ok(myDevice instanceof HxDevice, "new HxDevice");
});

