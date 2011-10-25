module("clear");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.clear, "Command 'clear' exists");
});
