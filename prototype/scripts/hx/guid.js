/* guid.js
 *
 * ++[black[Atomic OS Class: HxGUID] **Singleton**++
 *
 * Simple GUID generator based on http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 *
 * @author Scott Elcomb <psema4@gmail.com (http://www.psema4.com)
 * @version 2.0.0
 */

// FIXME: no validation
window.HxGUID = (function() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    return {
        /* @method next
         * Generates a GUID. **WARNING:** Does not check if ID already in use
         * @returns {String} GUID
         */

        next: function() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
    }
})();
