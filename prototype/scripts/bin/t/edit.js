module("edit");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.edit, "Command 'edit' exists");
});
