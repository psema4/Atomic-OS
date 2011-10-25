module("HxBus");
test("load", function() {
    ok(window.HxBus, "HxBus singleton exists");
    if (system) {
        if (! system.bus) system.bus = window.HxBus;
    }
    ok(system && system.bus, "System exists and has a bus");
});
