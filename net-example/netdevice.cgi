#!/usr/bin/env perl

# Example only, NOT intended for production use
#
# Be sure to create a folder (called "hosted" or whatever you set $file_root to) and give the webserver write access to it!

use strict;
use CGI;
use JSON;
use Switch;

# define file storage area
my $file_root = './hosted';

# setup CGI, get CGI paramenters and setup JSON
my $q = new CGI;
my @params = $q->param;
my $json = JSON->new->allow_nonref;

# determine command
my $cmd = $q->param('cmd') || 'ping';
my $subcmd = $q->param('subcmd') || 'NOP';

my $result_text = '';
switch ($cmd) {
    case "ping" { $result_text = 'pong'; }

    case "time" { $result_text = localtime; }

    case "file" {
        my $path = $q->param('path') || 'NOP';
           $path =~ s/\.+//g; # strip relative paths
           $path =~ s/`//g;   # strip for `cmd`
           $path =~ s/;//g;   # strip for ; cmd
           $path =~ s/^\///g; # strip leading /

        if ($path ne 'NOP') {
            switch ($subcmd) {
                case "read" {
                    if ( -f "$file_root/$path" ) {
                        open(FILE, "< $file_root/$path") || die "Content-type: text/plain\n\nCAN'T READ $file_root/$path: $!";
                        my @file = <FILE>;
                        close FILE;
                        $result_text = join('', @file);
                    }
                }

                case "write" {
                    my $buf = $q->param('buffer');
                    $result_text = "fail";

                    if ( -f "$file_root/$path" ) {
                        open(FILE, "> $file_root/$path") || die "Content-type: text/plain\n\nCAN'T WRITE $file_root/$path: $!";
                        print FILE $buf;
                        close FILE;
                        $result_text = "ok";
                    }
                }

                case "append" {
                    my $buf = $q->param('buffer');
                    $result_text = "fail";

                    if ( -f "$file_root/$path" ) {
                        open(FILE, ">> $file_root/$path") || die "Content-type: text/plain\n\nCAN'T APPEND $file_root/$path: $!";
                        print FILE $buf;
                        close FILE;
                        $result_text = "ok";
                    }
                }

                case "create" {
                    `touch $file_root/$path`;
                    $result_text = ( -f "$file_root/$path" ) ? 'ok' : 'fail';
                }

                case "delete" {
                    `rm $file_root/$path`;
                    $result_text = ( -f "$file_root/$path" ) ? 'fail' : 'ok';
                }

                else {
                    $result_text = "unknown file command";
                }
            }
        }
    }

    else { $result_text = 'not supported' }
}

my %result = (
    cmd    => $cmd,
    subcmd => $subcmd,
    data   => $result_text,
);

# encode response as JSON and send it
my $response = $json->encode(\%result);
print qq[Content-type: application/json\n\n$response];
