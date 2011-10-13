wash.lib.echo = {
    exec: function(args) {
        try {
            console.log('wash: echo:');
            console.dir(args);

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
