<?php

# Example only, NOT intended for production use
#
# Be sure to create a folder (called "hosted" or whatever you set $file_root to) and give the webserver write access to it!

$self_file = __FILE__;
$file_root = str_replace(basename($self_file), '' , $self_file) . 'hosted';

$cmd = $_REQUEST['cmd'];
$subcmd = $_REQUEST['subcmd'];

$result_text = '';
switch ($cmd) {
    case "ping":
        $result_text = 'pong';
        break;

    case "time":
        $result_text = date(DATE_RFC822);
        break;

    case "file":
        $path = $_REQUEST['path'];
        $path = preg_replace('/\.+/', '', $path);
        $path = preg_replace('/`/',   '', $path);
        $path = preg_replace('/;/',   '', $path);
        $path = preg_replace('/^\//', '', $path);

        $hosted_path = "$file_root/$path";
        $hosted_size = filesize($hosted_path);

        switch($subcmd) {
            case "read":
                $fh = fopen("$hosted_path", "r");
                $result_text = fread($fh, $hosted_size);
                fclose($fh);
                break;

            case "write":
                $buf = $_REQUEST['buffer'];
                $result_text = 'fail';
                $fh = fopen($hosted_path, "w") or die("CAN'T WRITE $hosted_path");
                fwrite($fh, $buf);
                fclose($fh);
                $result_text = 'ok';
                break;

            case "append":
                $buf = $_REQUEST['buffer'];
                $result_text = 'fail';
                $fh = fopen($hosted_path, "a") or die("CAN'T APPEND $hosted_path");
                fwrite($fh, $buf);
                fclose($fh);
                $result_text = 'ok';
                break;

            case "create":
                $result_text = 'fail';
                $fh = fopen($hosted_path, "x");
                if ($fh) {
                    fclose($fh);
                    $result_text = 'ok';
                }
                break;

            case "delete":
                $result_text = 'fail';
                if (unlink($hosted_path)) {
                    $result_text = 'ok';
                }
                break;
        }

        break;
}

$result = array(
    'cmd'    => $cmd,
    'subcmd' => $subcmd,
    'data'   => $result_text,
    'hosted_path' => $hosted_path
);

$response = json_encode($result);
echo $response
?>
