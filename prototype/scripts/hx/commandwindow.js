var HxCommandWindow = HxWindow.extend({
    init: function(opts) {
        opts = opts || {};
        this._super(opts);

        this.history = [];
        this.historyPtr = this.history.length;

        var output = "<textarea id='" + this.name + "-output' style='position: absolute; top: 30px; left: 0px; right: 0px; bottom: 32px;'>Welcome to WASH, the Web Application SHell\n</textarea>";

        var input = "<br><input id='" + this.name + "-input' type='text' style='position: absolute; height: 20px; bottom: 5px; left: 0px; right: 80px;' />" +
                    "<button id='" + this.name + "-btn' style='position: absolute; height: 20px; bottom: 5px; width: 60px; right: 10px;'>ENTER</button>";

        var ui = output + input;
        this.getContent().append(ui);

        var self = this;

        var btnExecute = $('#' + this.name + '-btn');
        btnExecute.click(function() {
            self.exec.call(self);
        });

        var txtInput = $('#' + this.name + '-input');
        txtInput.keyup(function(evt) {

            switch (evt.keyCode) {
                case 13: // ENTER key
                    $('#' + self.name + '-btn').trigger('click');
                    break;

                case 38: // UP key
                    if (self.historyPtr > 0) self.historyPtr--;
                    $('#' + self.name + '-input').val(self.history[self.historyPtr]);
                    break;

                case 40: // DOWN key
                    var cmdString = '';

                    if (self.historyPtr < self.history.length) {
                        self.historyPtr++;
                        cmdString = self.history[self.historyPtr];

                    } else {
                        cmdString = '';
                    }

                    $('#' + self.name + '-input').val(cmdString);
                    break;

                default:
//                    console.log(evt.keyCode);
            };
        });

        txtInput[0].focus();
    },

    exec: function(evt) {
        var input = $('#' + this.name + '-input');
        var cmdString = input.val();
        input.val('');

        this.history.push(cmdString);               // push onto command history
        system.wash.fd[1].write("\n" + cmdString);  // echo to stdout
        system.wash.fd[0].write(cmdString);         // write to stdin so global wash will execute it

        input[0].focus();
        this.historyPtr = this.history.length;
    }
});

