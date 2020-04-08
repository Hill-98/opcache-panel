<?php
declare(strict_types=1);

namespace OpcachePanel;

use OpcachePanel\Exception\NotFoundFile;

class Opcache
{
    /**
     * @param string $path
     * @param callable $callback
     */
    private static function fileBatch(string $path, callable $callback)
    {
        $scanPath = substr($path, -1) === '/' ? $path : "$path/";
        $paths = array_diff(scandir($scanPath), ['.', '..']);
        foreach ($paths as $value) {
            $fullPath = $scanPath.$value;
            if (is_dir($fullPath)) {
                self::fileBatch($fullPath, $callback);
                continue;
            }
            if (substr($fullPath, -4) === '.php') {
                $callback($fullPath);
            }
        }
    }

    /**
     * @param string $str
     * @return bool
     */
    private static function isGlobMatch(string $str): bool
    {
        $syntax = ['(?<!\\\\)\*', '(?<!\\\\)\?', '(?<!\\\\)\[.*(?<!\\\\)\]', ];
        foreach ($syntax as $value) {
            if (preg_match("/$value/", $str) !== 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param string $path
     * @return bool
     * @throws NotFoundFile
     */
    public static function compileFile(string $path): bool
    {
        $success = false;
        $isGlobMatch = self::isGlobMatch($path);
        if (!$isGlobMatch) {
            Helper::isExists($path);
        }
        if (substr($path, -1) === '/') {
            $paths = $isGlobMatch ? glob($path) : [$path];
            foreach ($paths as $value) {
                self::fileBatch($value, static function ($filePath) {
                    @opcache_compile_file($filePath);
                });
            }
        } else {
            $paths = $isGlobMatch ? glob($path) : [$path];
            foreach ($paths as $value) {
                if (@opcache_compile_file($value)) {
                    $success = true;
                }
            }
        }
        return $success;
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
     * @param string $path
     * @return bool
     */
    public static function invalidate(string $path): bool
    {
        return self::isScriptCached($path) ? opcache_invalidate($path, true) : false;
    }

    /**
     * @param string $path
     * @return bool
     */
    public static function invalidateDir(string $path): bool
    {
        $isGlobMatch = self::isGlobMatch($path);
        $status = self::getStatus();
        $scripts = $status['scripts'] ?? [];
        if (empty($scripts)) {
            return false;
        }
        foreach ($scripts as $item) {
            $fullPath = $item['full_path'] ?? '';
            if (empty($fullPath) || $fullPath === '$PRELOAD$') {
                continue;
            }
            $isMatch = $isGlobMatch ? fnmatch($path, $fullPath) : strpos($fullPath, $path) === 0 ;
            if ($isMatch) {
                self::invalidate($fullPath);
            }
        }
        return true;
    }

    /**
     * @param string $path
     * @return bool
     */
    public static function isScriptCached(string $path): bool
    {
        return opcache_is_script_cached($path);
    }

    /**
     * @return bool
     */
    public static function resetCache(): bool
    {
        return opcache_reset();
    }
}
