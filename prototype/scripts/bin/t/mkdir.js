module("mkdir");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.mkdir, "Command 'mkdir' exists");
});
