wash.lib.cat = {
    exec: function(args) {
        try {
            console.log('wash: cat:');
            console.log(files[0].read());

        } catch(e) {
            console.log('command exception:');
            console.dir(e);
        }
    }
};
