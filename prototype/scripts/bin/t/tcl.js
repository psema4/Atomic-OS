module("tcl");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.tcl, "Command 'tcl' exists");
});
