module("cd");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.cd, "Command 'cd' exists");
});
