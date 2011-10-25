module("HxGUID");
test("load", function() {
    ok(window.HxGUID && HxGUID.hasOwnProperty("next"), "HxGUID singleton exists");
});
