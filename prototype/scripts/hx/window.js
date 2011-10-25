/* window.js
 *
 * ++[black[Atomic OS Class: HxWindow]++
 *
 * Mountable UI Window
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

var HxWindow = HxPanel.extend({
    /* @constructor
     * @method init
     * Extends <a href="panel.html">HxPanel</a>
     *
     * When attaching to an HxProcess, be sure to connect handlers to your STD* streams
     * @param {Object} opts Options dictionary
     */

    init: function(opts) {
        opts = opts || {};

        if (opts.defaultStyle) {
            opts.css = opts.css || {};
            opts.css.position = 'absolute';
            opts.css.backgroundColor = '#ccc';
            opts.css.border = '2px outset #eee';
        }

        this._super(opts);

        this.title = opts.title || 'Window ' + this.name;

        this.inputHandler  = opts.inputHandler  || function() {};
        this.outputHandler = opts.outputHandler || function() {};
        this.errorHandler  = opts.errorHandler  || function() {};

        var ui = "<div id='" + this.name + "-titlebar' class='titlebar'>" + this.title + "</div><div id='" + this.name + "-content'></div>";

        this.get().append(ui);
    },

    /* @method getTitlebar
     * Get a Zepto object for the DOM element representing this windows' titlebar
     * @returns {Object} Returns a jQuery-compatible container for the titlebar
     */

    getTitlebar: function() {
        return $('#' + this.name + '-titlebar');
    },

    /* @method getContent
     * Get a Zepto object for the DOM element representing this windows' main content area
     * @returns {Object} Returns a jQuery-compatible container for the content area
     */

    getContent: function() {
        return $('#' + this.name + '-content');
    }
});

