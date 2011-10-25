module("rmdir");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.rmdir, "Command 'rmdir' exists");
});
