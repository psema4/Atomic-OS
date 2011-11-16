/* tcl.js
 *
 * ++[black[Atomic OS Class: HxTCL]++
 *
 * TCL Shell
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxTcl = HxProcess.extend({
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

        this.interpreter = new TclInterp();
    },

    /* @method exec
     * Executes a command
     * @param {String} command The command line to execute
     */

    exec: function(command) {
        var res;

        try {
            res = this.interpreter.eval(command);
//            system.proc.wash.fd[1].write(res.content);

        } catch(e) {
            console.warn("TCL Exception:");
            console.dir(e);
        }

        return res;
    },

    /* @method onInput
     * Callback to execute when data is placed on STDIN
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onInput: function(args) {
//        this.exec( this.fd[0].read() );

        //FIXME: 'this' is an empty object
        //
        //       How do we set the scope to the tcl instance
        //       (We don't want to reference system.proc.tcl...)

        var buf = system.proc.tcl.fd[0].read();
        system.proc.tcl.exec(buf);
    },

    /* @method onOutput
     * Callback to execute when data is written to STDOUT
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onOutput: function(args) {
        //FIXME: How do we set the scope to *this* tcl instance
        //       (...and want to route messages to linked processes)

        var buf = system.proc.tcl.fd[1].read();
        console.log(buf);
    },

    /* @method onError
     * Callback to execute when data is written to STDERR
     * @param {Mixed} args Arguments passed by <a href="bus.html">HxBus</a>.publish()
     */

    onError: function(args) {
        //FIXME: How do we set the scope to *this* tcl instance

        var buf = system.proc.tcl.fd[2].read();
        console.warn(buf);
    }
});

