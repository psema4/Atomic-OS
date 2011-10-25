module("echo");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.echo, "Command 'echo' exists");
});
