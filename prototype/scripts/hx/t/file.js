module("HxFile");
test("load", function() {
    var myFile = new HxFile();
    ok(myFile instanceof HxFile, "new HxFile");
});
