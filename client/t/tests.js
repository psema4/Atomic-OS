module("core");
test("truthiness", function() {
    ok(true, "true ok");
    ok(! false, "false ok");
});

module("libwash / vfs");
test("pwd", function() {
    equal(pwd(), "/", "pwd should return root folder");
});

test("cd", function() {
    ok(cd(parsePath('/bin')), "cd'd to /bin");
});

test("ls", function() {
    deepEqual(ls(), ["/bin/foo", "/bin/bar", "/bin/baz"], "/bin has foo, bar, & baz"); 
});

test("mkdir", function() {
    ok(cd('/tmp'), "cd'd to /tmp");
    ok(mkdir('test') instanceof(Node), "mkdir /tmp/test should return a Node object");
});

test("open", function() {
    ok(cd('test'), "cd'd to /tmp/test");
    equal(open('myfile', 'w'), 'F_WRITE', "open /tmp/test/myfile for writing");
});

test("fprint", function() {
    equal(fprint('myfile', 'foo'), 3, 'write "foo" to /tmp/test/myfile');
});

test("close", function() {
    equal(close('myfile'), 1, "close /tmp/test/myfile");
});

test("cat", function() {
    equal(cat('myfile'), "foo", '/tmp/test/myfile contains "foo"');
});

test("initrc & cat", function() {
    initrc();
    equal(cat('/bin/foo/barbaz'), 'hello, world!', "initrc: create file, cat returns the contents");
});



module("window manager");
test("createWindow", function() {
    ok(system.tasks[1].createWindow({}), "create window");
});
