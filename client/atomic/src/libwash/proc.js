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

function ProcScanner(rate) {
    this.rate = (rate) ? rate : 30000;
    this.timer;

    this.scan = function() {
        var procs = ps();
        var folder = parsePath('/proc');

        procs.forEach(function(val, idx, arr) {
            var procPath = '/proc/' + idx;

            if (folder.hasChild(idx)) {
                // update

            } else {
                // create
                system.log('procScan(): ' + procPath + ' not found, creating');

                var filemode, charCount = 0;

                if (touch(procPath)) filemode = open(procPath, 'w');

                if (filemode == F_MODES[F_WRITE])
                    charCount = fprint(procPath, 'Class: ' + val + "\n")

                else
                    system.log('file not writable');

                system.log('wrote: ' + charCount + ' characters');
            }
        });

        system.scanner.timer = setTimeout(system.scanner.scan, system.scanner.rate);
    };

    this.stop = function() {
        system.scanner.timer = clearTimeout(system.scanner.timer);
    };
}
