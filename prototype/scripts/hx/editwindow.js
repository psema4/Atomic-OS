var HxEditWindow = HxWindow.extend({
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

        var output = "<div id='" + this.name + "-h-editor'><textarea id='" + this.name + "-editor' class='rounded'></textarea></div>" +
                     "<span id='" + this.name + "-status' class='statusbar rounded'></span>";

        var input = "<span style='position: absolute; top: 37px; left: 215px; font-size: 14px; font-family: verdana;'>Filename:</span><div id='" + this.name + "-h-filename'><input id='" + this.name + "-filename' type='text' /></div>" +
                    "<button id='" + this.name + "-btnnew'  class='ui-btn' style='position: absolute; top: 35px; left: 10px;'>NEW</button>" +
                    "<button id='" + this.name + "-btnload' class='ui-btn disabled' style='position: absolute; top: 35px; left: 80px;'>LOAD</button>" + 
                    "<button id='" + this.name + "-btnsave' class='ui-btn disabled' style='position: absolute; top: 35px; left: 150px;'>SAVE</button>";

        var ui = output + input;
        this.getContent().append(ui);

        var self = this;

        var hEditor = $('#' + this.name + '-h-editor').css({
            position: 'absolute',
            top: 65,
            left: 2,
            right: 0,
            bottom: 32
        });
        var txtEditor = $('#' + this.name + '-editor').css({
            width: '99%',
            height: '99%'
        });

        var btnNew = $('#' + this.name + '-btnnew');
        btnNew.click(function() {
            $('#' + self.name + '-filename').val('');
            $('#' + self.name + '-editor').val('');
            $('#' + self.name + '-btnload').addClass('disabled');
            $('#' + self.name + '-btnsave').addClass('disabled');
            self.notify('File buffer cleared.');
        });

        var btnLoad = $('#' + this.name + '-btnload');
        btnLoad.click(function() {
            self.load();
        });

        var btnSave = $('#' + this.name + '-btnsave');
        btnSave.click(function() {
            self.save();
        });

        var hFilename = $('#' + this.name + '-h-filename');
        hFilename.css({
            position: 'absolute',
            height: 20,
            top: 35,
            left: 290,
            right: 5
        });

        var txtFilename = $('#' + this.name + '-filename');
        txtFilename.css({
            width: '99%'
        }).addClass('rounded');

        txtFilename.keyup(function(evt) {
            if (this.value.length > 0) {
                $('#' + self.name + '-btnload').removeClass('disabled');
                $('#' + self.name + '-btnsave').removeClass('disabled');
            } else {
                $('#' + self.name + '-btnload').addClass('disabled');
                $('#' + self.name + '-btnsave').addClass('disabled');
            }

            switch (evt.keyCode) {
                case 13: // ENTER key
                    if (! $('#' + self.name + '-btnsave').hasClass('disabled')) {
                        $('#' + self.name + '-btnload').trigger('click');
                        $('#' + self.name + '-editor').focus();
                    }
                    break;

                case 38: // UP key
                    if (self.historyPtr > 0) self.historyPtr--;
                    $('#' + self.name + '-filename').val(self.history[self.historyPtr]);
                    break;

                case 40: // DOWN key
                    var cmdString = '';

                    if (self.historyPtr < self.history.length) {
                        self.historyPtr++;
                        cmdString = self.history[self.historyPtr];

                    } else {
                        cmdString = '';
                    }

                    $('#' + self.name + '-filename').val(cmdString);
                    break;

                default:
//                    console.log(evt.keyCode);
            };
        });
    },

    load: function() {
        var input = $('#' + this.name + '-filename');
        var filename = input.val();

        this.history.push(filename);
        var buf = system.fs.readFile(filename);

        if (buf) {
            $('#' + this.name + '-editor').val(buf);
            $('#' + this.name + '-btnsave').removeClass('disabled');
            input[0].focus();
            this.historyPtr = this.history.length;
            this.notify('File "' + filename + '" loaded.');

        } else {
            this.notify('File "' + filename + '" not found.');
        }


    },

    save: function() {
        var input = $('#' + this.name + '-filename');
        var filename = input.val();

        var buf = $('#' + this.name + '-editor').val();
        system.fs.writeFile(filename, buf);

        var verify = system.fs.readFile(filename);
        if (buf == verify) {
            this.notify('File "' + filename + '" saved.');
        }
    },

    cls: function() {
        $('#' + this.name + '-editor').val('');
    },

    notify: function(msg) {
        var statusbar = $('#' + this.name + '-status');
        statusbar.html(msg);

        setTimeout(function() {
            statusbar.html('');
        }, 2000);
    }
});

