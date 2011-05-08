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

                var procDir = mkdir(procPath);
                if (! procDir) {
                    system.log('procScan(): ' + procPath + ' mkdir failed, aborting scan');
                    return false;
                }

                var procClassPath = procPath + '/class';
                var procPIDPath = procPath + '/pid';

                if (touch(procClassPath)) filemode = open(procClassPath, 'w');
                if (filemode == F_MODES[F_WRITE]) 
                    charCount = fprint(procClassPath, val);
                else
                    system.log('class file not writable');
                system.log('wrote ' + charCount + ' characters to class file');

                if (touch(procPIDPath)) filemode = open(procPIDPath, 'w');
                if (filemode == F_MODES[F_WRITE]) 
                    charCount = fprint(procPIDPath, idx+'');
                else
                    system.log('pid file not writable');
                system.log('wrote ' + charCount + ' characters to pid file');
            }
        });

        system.scanner.timer = setTimeout(system.scanner.scan, system.scanner.rate);
    };

    this.stop = function() {
        system.scanner.timer = clearTimeout(system.scanner.timer);
    };
}
