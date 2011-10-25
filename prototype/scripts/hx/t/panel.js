module("HxPanel");
test("load", function() {
    var myfs = new HxJSFS({
        name: '/',
        tree: {
            mnt: new HxJSFS({
                name: '/mnt',
                tree: {}
            })
        }
    });

    system.fs = myfs;

    var myPanel = new HxPanel({
        name: '/mnt/panel',
        tree: {}
    });

    myfs.mount("/mnt", myPanel);

    ok(myPanel instanceof HxPanel, "new HxPanel");
    ok(myfs.tree.mnt.tree.panel instanceof HxPanel, "mount HxPanel on /mnt/panel");
});
