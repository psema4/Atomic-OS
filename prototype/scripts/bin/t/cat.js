module("cat");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.cat, "Command 'cat' exists");
});
