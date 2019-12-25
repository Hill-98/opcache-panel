<?php
declare(strict_types=1);

define('PRELOAD_FILE', __DIR__ . '/preload.json');

if (!file_exists(PRELOAD_FILE)) {
    return;
}

$fileBatch = static function (string $path) {
    global $fileBatch;
    $files = array_diff(scandir($path), ['.', '..']);
    foreach ($files as $filename) {
        $_path = "$path/$filename";
        if (is_dir($_path)) {
            $fileBatch($_path);
            continue;
        }
        if (substr($_path, -4) === '.php') {
            @opcache_compile_file($_path);
        }
    }
};

$compileFile = static function (string $path) use ($fileBatch) {
    if (is_file($path)) {
        @opcache_compile_file($path);
    } else {
        $fileBatch($path);
    }
};

$json = file_get_contents(PRELOAD_FILE);
$preloadList = json_decode($json, true);
if (json_last_error() === JSON_ERROR_NONE) {
    if (isset($json['preCompile']) && is_array($json['preCompile'])) {
        foreach ($json['preCompile'] as $value) {
            $compileFile($value);
        }
    }
    if (isset($json['preInclude']) && is_array($json['preInclude'])) {
        foreach ($json['preInclude'] as $value) {
            @include $value;
        }
    }
}
