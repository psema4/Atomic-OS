/* wash.js
 *
 * ++[black[Atomic OS Class: HxWASH]++
 *
 * WASH (Web Application SHell)
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxWash = HxProcess.extend({
    /* @constructor
     * @method init
     * Extends <a href="process.html">HxProcess</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        opts = opts || {};

        this._super(opts);

        var self   = this,
            stdin  = this.fd[0].name,
            stdout = this.fd[1].name,
            stderr = this.fd[2].name;

        this.fd[0].bus.subscribe(stdin  + ':ondata', this.onInput);
        this.fd[1].bus.subscribe(stdout + ':ondata', this.onOutput);
        this.fd[2].bus.subscribe(stderr + ':ondata', this.onError);
    },

    /* @method exec
     * Executes a command
     * @param {String} command The command line to execute
     */

    exec: function(command) {
        var args = command.match(' ') ? command.split(' ') : command;

        try {
            var cmdName = args instanceof Array ? args.shift() : command
                basename = system.fs.basename(cmdName),
                cmdObj = null;

            if (system.bin[basename]) {
                cmdObj = eval( system.bin[basename] );

            } else {
                var notFound = 'command not found';

                this.fd[1].write(notFound);
                console.warn(notFound);
            }

            if (cmdObj) cmdObj.exec.call(this, args);

        } catch(e) {
            console.warn("WASH Exception:");
            console.dir(e);
        }
    },

    /* @method onInput
     * Callback to execute when data is placed on STDIN
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onInput: function(args) {
//        this.exec( this.fd[0].read() );

        //FIXME: 'this' is an empty object
        //
        //       How do we set the scope to wash instance
        //       (We don't want to reference system.wash...)

        var buf = system.wash.fd[0].read();
        system.wash.exec(buf);
    },

    /* @method onOutput
     * Callback to execute when data is written to STDOUT
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onOutput: function(args) {
        //FIXME: How do we set the scope to *this* wash instance
        //       (...and want to route messages to linked processes)

        var buf = system.wash.fd[1].read();
        console.log(buf);
    },

    /* @method onError
     * Callback to execute when data is written to STDERR
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onError: function(args) {
        //FIXME: How do we set the scope to *this* wash instance

        var buf = system.wash.fd[2].read();
        console.warn(buf);
    }
});

