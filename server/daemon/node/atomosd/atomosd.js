#!/usr/bin/env node

var server_port = 5551;
var server_version = "Atomic OS Daemon/0.0.1 (Linux/Node.js)";
var enableBasicAuth = false; // EXPIREMENTAL

var sys = require("sys");
var fs = require("fs");
var ws = require("/usr/local/lib/node/websocket-server/server.js");
var base64_decode = require('base64').decode;
var formidable = require('formidable');
var util = require('util');

var wash = require("./libwash-server.js"); // EXPIREMENTAL

var mysql_Client = require("mysql").Client;
var db = new mysql_Client();

    db.user = 'your-mysql-user';
    db.password = 'your-mysql-pass';
    db.connect();
    db.query('USE atomosd');

cTypes = {
    'txt':      'text/plain',
    'html':     'text/html',
    'htm':      'text/html',
    'js':       'text/javascript',
    'css':      'text/css',
    'gif':      'image/gif',
    'jpg':      'image/jpeg',
    'jpeg':     'image/jpeg',
    'png':      'image/png',
    'ico':      'image/x-icon',
    'ogg':      'audio/ogg'
}

// ---------------------------------------------------
// UTILITY
function log(data) {
    sys.log("\033[0;32m"+data+"\033[0m");
}

// ---------------------------------------------------
// SERVER
var server = ws.createServer({ debug: false });

// .........................
// SERVER - HTTP
server.addListener("request", function(req, res) {
    var useBasicAuth = (enableBasicAuth) ? enableBasicAuth : false;
    var user = '';
    var contentType = 'text/plain';
    var content = "";

    // clean up url and set content type
    req.url = req.url.replace(/\.\./, "");
    req.url = req.url.replace(/\/$/, "/index.html");
    if (req.url.match(/\.(.*)$/)) contentType = cTypes[req.url.match(/\.(.*)$/)[1]];
    if (useBasicAuth && req.url == '/index.html') useBasicAuth = false;

    // check for basic auth
    var authenticated = false;
    if ('authorization' in req.headers) {
        var authRaw = (req.headers.authorization) ? req.headers.authorization : '';
        if (authRaw.match(/Basic /)) authRaw = authRaw.match(/Basic (.*)/)[1]; // chromium only?
        var auth64 = base64_decode(authRaw);
        user = auth64.split(':')[0];
        var pass = auth64.split(':')[1];
        if (user == 'psema4' && pass == "psema4") authenticated = true;
    };

    if (! authenticated && useBasicAuth) {
        log('invalid auth headers for ' + req.url);
        res.writeHead(401, {
            "Server": server_version,
            "WWW-Authenticate": 'Basic Realm="Local"'
        });
        res.end();
    }

    if ((! enableBasicAuth) || (useBasicAuth && authenticated)) {
    fs.readFile('./www' + req.url, function(err, data) {
        if (err) {
            var logMessage = 'Error: (';
            if (user != '') logMessage += user + '@';
            logMessage += req.connection.remoteAddress + ') ' + err;
            log(logMessage);
            content = '<html><head><title>Server Error</title></head><body><h1>Server Error</h1><p>Status: Internal Server Error</p>';
            content += '<p>Request URL: ' + req.url + '</p>';
            content += '<p>Error details: ' + err + '<p>';
            content += '</body></html>';
            res.writeHead(500, {
                "Server": server_version,
                "Content-Type": "text/html",
                "Content-Length": content.length
            });
          
        } else {
            var logMessage = "Serving (";
            if (user != '') logMessage += user + '@';
            logMessage += req.connection.remoteAddress + ') ' + req.url;
            log(logMessage);

            // cache everything for 1 hour by default
            var cacheControl = 'max-age=3600, must-revalidate';
            if (contentType == 'audio/ogg') { // Music files cached for 1 week
                cacheControl = 'max-age=604800, must-revalidate';
            }

            content = data;
            res.writeHead(200, {
                "Server": server_version,
                "Cache-Control": cacheControl, 
                "Content-Type": contentType,
                "Content-Length": content.length
            });
        }

        res.write(content);
        res.end();
    });
    }
});

// .........................
// SERVER - Websockets
server.addListener("connection", function(conn) {
    log(conn.id + ": Connected");

    conn.addListener("readyStateChange", function(readyState) { log("stateChanged: " + readyState); });
    conn.addListener("open", function() { log(conn.id + ": onOpen"); });

    conn.addListener("close", function() {
        var conn = this;
        log(conn.id + ": closed, deleting");
    });
 
    conn.addListener("message", function(message) {
        var response = {
            code: 0,
            data: ''
        };

        var command = JSON.parse(message);
        response.name = command.name;
        response.client = conn.id;

        log(conn.id + ': ' + command.name);

        switch(command.name) {
            case "echo":
                response.code = 1;
                response.data = command.data;
                break;

            case "time":
                response.code = 1;
                var d = new Date();
                response.data = d.getTime();
                break;

            case "clients":
                response.code = 1;
                response.data = server.manager.length;
                break;

            case "getid":
                response.code = 1;
                response.data = conn.id;
                break;

            case "ping":
                response.code = 1;
                response.data = 'Pong';
                break;

            default:
                if (command.name in wash) {
                    response.code = 1;
                    response.data = wash[command.name]('foobar');

                } else {
                    response.code = 0;
                    response.data = 'command not found';
                }
        }

        // respond to conn
        server.send(conn.id, JSON.stringify(response));
    });
});


// ---------------------------------------------------
// MAIN
server.listen(server_port);

var logMessage = server_version + " started at localhost:" + server_port;

if (enableBasicAuth) logMessage += ' with Basic Auth support';

log(logMessage);
