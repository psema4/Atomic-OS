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
        header += !expected ? '[SKIP]' : (value == expected) ? '[PASS]' : '[FAIL]';

        var msg = header + ' ' + caption + ': "' + value + '"';
        msg += (header.match(/\[FAIL\]/)) ? ', expected: "' + expected + '"' : '';

        console.log(msg);
    };

    this.assertNotEqual = function(caption, value, expected) {
        var header = ++this.assertCounter + '/' + this.plan.length + ' ';
        header += !expected ? '[SKIP]' : (value != expected) ? '[PASS]' : '[FAIL]';

        var msg = header + ' ' + caption + ': "' + value + '"';
        msg += (header.match(/\[FAIL\]/)) ? ', NOT expected: "' + expected + '"' : '';

        console.log(msg);
    };

    return this;
};
