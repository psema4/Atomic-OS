var HxCommandWindow = HxWindow.extend({
    init: function(opts) {
        opts = opts || {};
        this._super(opts);

        this.history = [];
        this.historyPtr = this.history.length;

// note: text inputs and textareas positioned with top,left,right,bottom work fine in webkit, but won't show correctly in Firefox
//       (eg. per docs: <https://developer.mozilla.org/en/CSS/position>)
//
//       fixed by enclosing in div's, positioning those and then expanding the text inputs/areas using %-based widths/heights
//       see <http://snook.ca/archives/html_and_css/absolute-position-textarea> for more info

        var output = "<div id='" + this.name + "-h-output'><textarea id='" + this.name + "-output' class='rounded'>Welcome to WASH, the Web Application SHell\n</textarea></div>";

        var input = "<span id='" + this.name + "-prompt'>" + system.env.cwd + " $ </span>" + 
                    "<div id='" + this.name + "-h-input'><input id='" + this.name + "-input' type='text' /></div>" +
                    "<button id='" + this.name + "-btn'>ENTER</button>";

        var ui = output + input;
        this.getContent().append(ui);

        var self = this;

        var hOutput = $('#' + this.name + '-h-output');
        var txtOutput = $('#' + this.name + '-output');
        hOutput.css({
            display: 'block',
            position: 'absolute',
            top: '30px',
            left: '2px',
            right: '2px',
            bottom: '32px'
        });
        txtOutput.css({
            width: '99%',
            height: '99%',
            color: '#888',
            fontFamily: 'Courier',
            fontSize: '15px'
        });

        var promptLabel = $('#' + this.name + '-prompt');
        promptLabel.css({
            display: 'inline-block',
            position: 'absolute',
            bottom: '5px',
            left: '0px',
            width: '20%',
            textAlign: 'right',
            overflow: 'hidden',
            backgroundColor: '#fff',
            height: '20px',
            border: '0px solid #000'
        });
        promptLabel.click(function() {
            $('#' + self.name + '-input').focus();
        });

        var btnExecute = $('#' + this.name + '-btn');
        btnExecute.css({
            position: 'absolute',
            bottom: '4px',
            right: '10px'
        }).addClass('ui-btn disabled');

        btnExecute.click(function() {
            self.exec.call(self);
        });

        var hInput = $('#' + this.name + '-h-input');
        var txtInput = $('#' + this.name + '-input');
        hInput.css({
            position: 'absolute',
            height: 20,
            bottom: 5,
            left: '20%',
            right: 80,
            margin: 0,
            padding: 0
        });
        txtInput.css({
            width: '99%',
            height: 18,
            outline: 'none',
            border: '0px solid #000',
            margin: '0px',
            paddingLeft: '0.25em'
        });

        txtInput.keyup(function(evt) {
            //if ($('#' + self.name + '-btn').hasClass('disabled')) {
            //$('#' + self.name + '-btn').removeClass('disabled')
            //$('#' + self.name + '-btn').addClass('disabled')

            if (this.value.length > 0) {
                $('#' + self.name + '-btn').removeClass('disabled')
            } else {
                $('#' + self.name + '-btn').addClass('disabled')
            }

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
        system.wash.fd[1].write("\n" + system.env.cwd + "$ " + cmdString);  // echo to stdout
        system.wash.fd[0].write(cmdString);         // write to stdin so global wash will execute it

        input[0].focus();
        this.historyPtr = this.history.length;

        var promptStr = system.env.cwd + ' $';
        $('#' + this.name + '-prompt').html(promptStr);
    },

    cls: function() {
        $('#' + this.name + '-output').val('');     //FIXME after clearing, all output stops... why?
    }
});

