// Derived in part from http://www.godlikemouse.com/2008/09/04/javascript-command-pattern/
wash = {
    lib: {},

    exec: function(command) {
        var args = command.split(" ");
 
        try {
            var cmdname = args.shift();
            var obj = eval(cmdname);
            obj.exec(args);

        } catch(e) {
            console.log('wash exception:');
            console.dir(e);
        }
    }
};
