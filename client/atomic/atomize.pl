#!/usr/bin/env perl

use strict;
use warnings;
use Template;

my $autobuild = 1;

my $input = './client.tmpl';
my $output = './static-client.html';

`./build-system.sh` if $autobuild;

my $title = 'Atomic OS';
my $css = read_file('./system.css');
my $js = read_file('./system-all-min.js');

my $config = {
    INCLUDE_PATH => './inc',
    INTERPOLATE  => 1,
    POST_CHOMP   => 1,
    EVAL_PERL    => 1,
    RELATIVE     => 1,
};

my $template = Template->new($config);

my $vars = {
    title  => $title,
    css  => $css,
    js  => $js,
};

$template->process($input, $vars, $output) || die $template->error();

#
sub read_file {
    my $filename = shift;

    if (-f $filename) {
        open(FH, "< $filename") || die($!);
        my @buf = <FH>;
        close FH;

        my $buf = join("\n", @buf);
        return $buf;

    } else {
        return '';
    }
}
