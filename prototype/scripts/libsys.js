// system call library

system = system || {};

system.lib = {
    registerProcess: function(process) {
        console.warn("syslib: registering new process as " + process.name);

        var procfs = system.fs.getFolder('/proc');
        var folder = procfs.addChildFolder(process.name);

        if (folder) {
            folder.addFile('stdin', process.fd[0].name);
            folder.addFile('stdout', process.fd[1].name);
            folder.addFile('stderr', process.fd[2].name);

        } else {
            console.warn("process folder not found!");
        }
    }
};
