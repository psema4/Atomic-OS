// Derived from http://aymanh.com/9-javascript-tips-you-may-not-know

function HxAssertException(message) { this.message = message; }

HxAssertException.prototype.toString = function() {
    return 'HxAssertException: ' + this.message;
}

window.assert = function(exp, message, echoOnly) {
    if (! exp) {
        var exception = new HxAssertException(message);

        if (echoOnly) {
            console.warn(exception.toString());

        } else {
            throw exception;
        }
    }
}

window.assertNot = function(exp, message, echoOnly) {
    if (exp) {
        var exception = new HxAssertException(message);

        if (echoOnly) {
            console.warn(exception.toString());

        } else {
            throw exception;
        }
    }
}
