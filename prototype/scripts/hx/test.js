var HxTest = function(plan) {
    this.plan = plan || [];
    this.assertCounter = 0;

    this.run = function() {
        for (var i=0; i < this.plan.length; i++) {
            this.plan[i] = this.plan[i].replace(/^assert/, 'this.assert');
            eval( this.plan[i] );
        }
    }

    this.assert = function(caption, value, expected) {
        var header = ++this.assertCounter + '/' + this.plan.length + ' ';
        header += !expected ? '[skip]' : (value == expected) ? '[pass]' : '[fail]';

        var msg = header + ' ' + caption + ': ' + value;
        msg += (header.match(/\[fail\]/)) ? ', expected: ' + expected : '';

        console.log(msg);
    };

    this.assertNotEqual = function(caption, value, expected) {
        var header = ++this.assertCounter + '/' + this.plan.length + ' ';
        header += !expected ? '[skip]' : (value != expected) ? '[pass]' : '[fail]';

        var msg = header + ' ' + caption + ': ' + value;
        msg += (header.match(/\[fail\]/)) ? ', expected: ' + expected : '';

        console.log(msg);
    };

    return this;
};
