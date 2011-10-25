module("commands");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.commands, "Command 'commands' exists");
});
