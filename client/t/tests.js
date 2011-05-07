test("truthiness", function() {
    ok(true, "true ok");
    ok(! false, "false ok");
});

test("virtual file system", function() {
    ok(cd(parsePath('/bin')), "cd'd to /bin");
});

test("window manager", function() {
    ok(system.tasks[1].createWindow({}), "create window");
});
