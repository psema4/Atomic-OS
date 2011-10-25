module("wallpaper");
test("load", function() {
    ok(system && system.bin, "System exists and has a bin");
    ok(system.bin.wallpaper, "Command 'wallpaper' exists");
});
