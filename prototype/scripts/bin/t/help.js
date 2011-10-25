module("help");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.help, "Command 'help' exists");
});
