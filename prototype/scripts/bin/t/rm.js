module("rm");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.rm, "Command 'rm' exists");
});
