<?php
declare(strict_types=1);

namespace OpcachePanel;

use Exception;
use OpcachePanel\Exception\NotFoundFile;

class Opcache
{
    /**
     * @param string $path
     * @param string $function
     * @param mixed $param
     */
    private static function fileBatch(string $path, string $function, ...$param)
    {
        if (!function_exists($function)) {
            return;
        }
        $files = array_diff(scandir($path), ['.', '..']);
        foreach ($files as $filename) {
            $_path = "$path/$filename";
            if (is_dir($_path)) {
                self::fileBatch($_path, $function, ...$param);
                continue;
            }

            if (substr($_path, -4) !== '.php') {
                continue;
            }

            $_param = array_merge([$_path], $param);
            try {
                $function(...$_param);
            } catch (Exception $e) {
            }
        }
    }

    /**
     * @param string $path
     * @return bool
     * @throws NotFoundFile
     */
    public static function compileFile(string $path): bool
    {
        $realpath = isExists($path);
        if (is_file($realpath)) {
            return @opcache_compile_file($realpath);
        }

        if (is_dir($realpath)) {
            self::fileBatch($realpath, 'opcache_compile_file');
            return true;
        }
        return false;
    }

    /**
     * @return array
     */
    public static function getConfiguration(): array
    {
        return opcache_get_configuration();
    }

    /**
     * @return array
     */
    public static function getStatus(): array
    {
        return opcache_get_status();
    }

    /**
     * @return array
     */
    public static function getInfo(): array
    {
        return [
            'configuration' => self::getConfiguration(),
            'status' => self::getStatus()
        ];
    }

    /**
     * @param string $file
     * @return bool
     * @throws NotFoundFile
     */
    public static function invalidate(string $file): bool
    {
        $filename = isExists($file, false);
        return opcache_invalidate($filename, true);
    }

    /**
     * @param string $path
     * @return bool
     * @throws NotFoundFile
     */
    public static function invalidateDir(string $path): bool
    {
        $realpath = isExists($path);
        if (is_file($realpath)) {
            return self::invalidate($realpath);
        }
        if (is_dir($realpath)) {
            self::fileBatch($realpath, 'opcache_invalidate', true);
            return true;
        }
        return false;
    }

    /**
     * @param string $file
     * @return bool
     * @throws NotFoundFile
     */
    public static function isScriptCached(string $file): bool
    {
        $filename = isExists($file);
        return opcache_is_script_cached($filename);
    }

    /**
     * @return bool
     */
    public static function resetCache(): bool
    {
        return opcache_reset();
    }
}
