module("ls");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.ls, "Command 'ls' exists");
});
