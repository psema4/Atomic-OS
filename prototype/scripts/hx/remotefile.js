/* remotefile.js
 *
 * ++[black[Atomic OS Class: HxRemoteFile]++
 */

var HxRemoteFile = HxFile.extend({
    init: function(opts) {
        this._super(opts);
        this.dev = system.fs.tree.dev.tree.net;

        this.read();

        // if the buffer is empty after reading from the server then the file likely doesn't exist.  create it on the server
        if (this.buffer == '') {
            this.dev.send(
                {
                    cmd:    'file',
                    subcmd: 'create',
                    path:   this.name
                },

                function(response) {
                    //FIXME: parsing the response is causing an unexpected token 'u' ??
                    //       it doesn't prevent creation so ignoring for now

                    //console.warn('>>' + response + '<<');
                    try {
                        var r = JSON.parse(r);
                        console.log('HxRemoteFile.init: remote file creation response:');
                        console.dir(r);
 
                    } catch(e) {
                        // console.log('HxRemoteFile.init: remote file creation: ERROR PARSING RESPONSE:');
                        // console.dir(e);
                    }
                }
            );
        }
    },

    read: function() {
        path = this.name;
        var self = this;

        fileAction = {
            cmd:    'file',
            subcmd: 'read',
            path:   path
        };

        this.dev.send(fileAction, function(response) {
            var r = JSON.parse(response);

            // fill buffer
            self.buffer = r.data;
        });

        return this.buffer || false;
    },

    write: function(buf) {
        this.buffer = buf;

        var path = this.name;

        fileAction = {
            cmd:    'file',
            subcmd: 'write',
            path:   path,
            buffer: buf
        };
       
        this.dev.send(fileAction, function(response) {
            var r = JSON.parse(response);
            console.dir(r);
        });

        return this;
    },
   
    append: function(buf) {
        this.buffer += buf;

        var path = this.name;
       
        fileAction = {
            cmd:    'file',
            subcmd: 'append',
            path:   path,
            buffer: buf
        };
       
        this.dev.send(fileAction, function(response) {
            var r = JSON.parse(response);
            console.dir(r);
        });

        return this;
    }
});

