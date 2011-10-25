/* panel.js
 *
 * ++[black[Atomic OS Class: HxPanel++]
 *
 * HxJSFS-based, mountable UI widget
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxPanel = HxJSFS.extend({
    /* @constructor
     * @method init
     * Extends <a href="jsfs.html">HxJSFS</a>
     *
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        this._super(opts);

        this.toggleState = (opts && opts.toggled)  ? opts.toggled  : true;
        this.name        = (opts && opts.name)     ? opts.name     : HxGUID.next();
        this.parentEl    = (opts && opts.parentEl) ? opts.parentEl : 'winroot';
        this.bus         = (opts && opts.bus)      ? opts.bus      : HxBus;
        this.mountPoint  = (opts && opts.mount)    ? opts.mount    : null;

        //FIXME: convert this nodes name to something the DOM can use
        if (this.name.match(/\//)) {
            this.name = system.fs.basename(this.name); 
        }

        var html = '<div id="' + this.name + '" class="ui-panel"></div>';

//        console.warn('attaching panel ' + this.name + ' to ' + this.parentEl);

        $('#' + this.parentEl).append(html);
        this.hxpanel = $('#' + this.name);

        if (opts && opts.className) { this.hxpanel.addClass(opts.className); }
        if (opts && opts.css)   { this.hxpanel.css(opts.css); }

        if (this.mountPoint) {
            system.fs.mount(this.mountPoint, this);
        }
    },

    /* @method get
     * Get a Zepto object for this panels' DOM element
     * @returns {Object} Returns the jQuery-compatible container for this panel
     */

    get: function() {
        return this.hxpanel
    },

    /* @method getName
     * Get the name for this panel
     * @returns {String} DOM element ID
     */

    getName: function() {
        return this.name;
    },

    /* @method moveTo
     * Move this panel to a new location on the screen
     * @param {Integer} x The left co-ordinate to position the panel at
     * @param {Integer} y The top co-ordinate to position the panel at
     */

    moveTo: function(x,y) {
        this.hxpanel.css({ top: y, left: x });
    },

    /* @method resizeTo
     * Resize this panel (using CSS right/bottom rules, not width/height)
     * @param {Integer} x2 The right co-oridinate for this panel
     * @param {Integer} y2 The bottom co-ordinate for this panel
     */

    resizeTo: function(x2,y2) {
        this.hxpanel.css({ right: x2, bottom: y2 });
    },

    /* @method toggle
     * Show or hide this panel
     * @returns {Bool} Returns the toggled state of this panel
     */

    toggle: function() {
        toggleState = (toggleState) ? false : true;
        this.hxpanel.fadeToggle();

        return toggleState;
    }
});

