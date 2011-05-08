//---------------------------------------------------------
// Atomic OS Client: QUnit tests
//---------------------------------------------------------
module("core");
test("truth", function() {
    ok(true, "true ok");
    ok(! false, "false ok");
});

test("system tasks", function() {
    if (system.tasks.length == 0) system.init();
    deepEqual(ps(), ["WASH","WindowManager","ProcScanner"], "task list from ps");
});


//---------------------------------------------------------
module("libwash / vfs");
test("basic folder ops", function() {
    strictEqual(pwd(), "/", "starting in root folder");

    strictEqual(cd('/bin'), "/bin", "cd /bin (absolute cd)");
    deepEqual(ls(), ["/bin/foo", "/bin/bar", "/bin/baz"], "/bin populated correctly?"); 

    strictEqual(cd('foo'), "/bin/foo", "cd foo (relative cd)");
    deepEqual(ls(), ["/bin/foo/barbaz"], "/bin/foo populated correctly?");

    strictEqual(cd('/tmp'), "/tmp", "cd /tmp");

    var vfs_tmp_test = mkdir('test');
    ok(vfs_tmp_test instanceof(Node), "mkdir /tmp/test returned a Node object?");
    strictEqual(vfs_tmp_test.filename, "test", '/tmp/test filename === "test"');
});

test("basic file ops", function() {
    strictEqual(cd('/tmp/test'), "/tmp/test", "cd /tmp/test");

    var vfs_tmp_test_myfile = touch('myfile');
    ok(vfs_tmp_test_myfile instanceof(Node), "touch myfile");

    strictEqual(open('/tmp/test/myfile', 'w'), 'F_WRITE', "open /tmp/test/myfile for writing");
    strictEqual(fprint('/tmp/test/myfile', 'foo'), 3, 'write 3 chars to /tmp/test/myfile');
    strictEqual(close('/tmp/test/myfile'), F_READ, "close /tmp/test/myfile");

    strictEqual(cat('/tmp/test/myfile'), "foo", '/tmp/test/myfile contents === "foo"');
});

test("system tasks", function() {
    deepEqual(ls('/proc'), ["/proc/0", "/proc/1", "/proc/2"], "ls /proc");
    strictEqual(cat('/proc/0/pid') + ':' + cat('/proc/0/class'), "0:WASH", "WASH is pid 0");
    strictEqual(cat('/proc/1/pid') + ':' + cat('/proc/1/class'), "1:WindowManager", "WindowManager is pid 1");
    strictEqual(cat('/proc/2/pid') + ':' + cat('/proc/2/class'), "2:ProcScanner", "ProcScanner is pid 2");
});

test("initrc", function() {
    initrc();
    strictEqual(cat('/bin/foo/barbaz'), 'hello, world!', "initrc created a hello, world file?");
});


//---------------------------------------------------------
module("window manager");

test("createWindow", function() {
    ok(system.tasks[1].createWindow({}), "create window");
});
