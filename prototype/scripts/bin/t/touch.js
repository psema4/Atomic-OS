module("touch");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.touch, "Command 'touch' exists");
});
