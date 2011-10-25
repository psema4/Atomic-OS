module("pwd");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.pwd, "Command 'pwd' exists");
});
