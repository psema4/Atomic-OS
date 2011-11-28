module("HxRemoteFile");
test("load", function() {
    var myFile = new HxRemoteFile();
    ok(myFile instanceof HxRemoteFile, "new HxRemoteFile");
});
