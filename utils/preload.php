<?php
declare(strict_types=1);

define('PRELOAD_FILE', __DIR__ . '/../preload.json');

$fileBatch = static function (string $path) {
    global $fileBatch;
    $files = array_diff(scandir($path), ['.', '..']);
    foreach ($files as $filename) {
        $_path = "$path/$filename";
        if (is_dir($_path)) {
            $fileBatch($_path);
            continue;
        }
        if (substr($_path, -4) !== '.php') {
            continue;
        }
        @opcache_compile_file($_path);
    }
};

$compileFile = static function (string $path) use ($fileBatch) {
    $realpath = realpath($path);
    if (!$realpath) {
        return;
    }
    if (is_file($realpath)) {
        @opcache_compile_file($realpath);
        return;
    }
    if (is_dir($realpath)) {
        $fileBatch($realpath);
    }
};

if (file_exists(PRELOAD_FILE)) {
    $json = file_get_contents(PRELOAD_FILE);
    $preloadList = json_decode($json, true);
    if (json_last_error() === JSON_ERROR_NONE && preg_match('/^\[[\s\S]*]$/', $json) === 1) {
        foreach ($preloadList as $value) {
            $compileFile($value);
        }
    }
}
