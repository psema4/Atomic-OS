window.system = window.system || {};
system.bin = system.bin || {};

system.bin.pwd = {
    exec: function(args) {
        try {
            console.log(system.env.cwd);

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
