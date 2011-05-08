function ps() {
    var procs = new Array();

    system.tasks.forEach(function(val, idx, arr) {
        procs.push(val.__proto__.constructor.name);
    });

    if (system.debug) {
        system.log('ps running:');
        procs.forEach(function(val, idx, arr) {
            system.log('  [' + idx + '] ' + val);
        });
    }

    return procs;
}
