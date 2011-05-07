module("core");
test("truthiness", function() {
    ok(true, "true ok");
    ok(! false, "false ok");
});

test("system tasks", function() {
    if (system.tasks.length == 2) {
        ok(true, "wash & wm tasks installed");

    } else {
        system.init();
        ok(system.tasks.length == 2, "start wash & wm");
    }
    
});

module("libwash / vfs");
test("basic folder ops", function() {
    strictEqual(pwd(), "/", "pwd should return root folder");

    strictEqual(cd('/bin'), "/bin", "cd'd to /bin");

    deepEqual(ls(), ["/bin/foo", "/bin/bar", "/bin/baz"], "/bin has foo, bar, & baz"); 

    strictEqual(cd('/tmp'), "/tmp", "cd'd to /tmp");

    var vfs_tmp_test = mkdir('test');
    ok(vfs_tmp_test instanceof(Node), "mkdir /tmp/test should return a Node object");
    strictEqual(vfs_tmp_test.filename, "test", '/tmp/test has filename === "test"');
});

test("basic file ops", function() {
    strictEqual(cd('/tmp/test'), "/tmp/test", "cd'd to /tmp/test");

    var vfs_tmp_test_myfile = touch('myfile');
    ok(vfs_tmp_test_myfile instanceof(Node), "touch myfile");

    strictEqual(open('/tmp/test/myfile', 'w'), 'F_WRITE', "open /tmp/test/myfile for writing");
    strictEqual(fprint('/tmp/test/myfile', 'foo'), 3, 'write "foo" to /tmp/test/myfile');
    strictEqual(close('/tmp/test/myfile'), 1, "close /tmp/test/myfile");

    strictEqual(cat('/tmp/test/myfile'), "foo", '/tmp/test/myfile contains "foo"');
});

test("initrc", function() {
    initrc();
    strictEqual(cat('/bin/foo/barbaz'), 'hello, world!', "initrc created text file");
});



module("window manager");
test("createWindow", function() {
    ok(system.tasks[1].createWindow({}), "create window");
});
