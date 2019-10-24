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
    private function fileBatch(string $path, string $function, ...$param)
    {
        if (!function_exists($function)) {
            return;
        }
        $files = array_diff(scandir($path), ['.', '..']);
        foreach ($files as $file) {
            $_param = array_merge([$file], $param);
            if (is_dir($file)) {
                $this->fileBatch($file, $function, ...$param);
                continue;
            }
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
    public function compileFile(string $path): bool
    {
        $realpath = isExists($path);
        if (is_file($realpath)) {
            return @opcache_compile_file($realpath);
        }

        if (is_dir($realpath)) {
            $this->fileBatch($realpath, 'opcache_compile_file');
            return true;
        }
        return false;
    }

    /**
     * @return array
     */
    public function getConfiguration(): array
    {
        return opcache_get_configuration();
    }

    /**
     * @return array
     */
    public function getStatus(): array
    {
        return opcache_get_status();
    }

    /**
     * @return array
     */
    public function getInfo(): array
    {
        return [
            'configuration' => $this->getConfiguration(),
            'status' => $this->getStatus()
        ];
    }

    /**
     * @param string $file
     * @return bool
     * @throws NotFoundFile
     */
    public function invalidate(string $file): bool
    {
        $filename = isExists($file, false);
        return opcache_invalidate($filename, true);
    }

    /**
     * @param string $path
     * @return bool
     * @throws NotFoundFile
     */
    public function invalidateDir(string $path): bool
    {
        $realpath = isExists($path);
        if (is_file($realpath)) {
            return $this->invalidate($realpath);
        }
        if (is_dir($realpath)) {
            $this->fileBatch($realpath, 'opcache_invalidate', true);
            return true;
        }
        return false;
    }

    /**
     * @param string $file
     * @return bool
     * @throws NotFoundFile
     */
    public function isScriptCached(string $file): bool
    {
        $filename = isExists($file);
        return opcache_is_script_cached($filename);
    }

    /**
     * @return bool
     */
    public function resetCache(): bool
    {
        return opcache_reset();
    }
}
