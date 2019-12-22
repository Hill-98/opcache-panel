<?php
declare(strict_types=1);

namespace OpcachePanel;

use OpcachePanel\Exception\NotFoundFile;

class Helper
{
    /**
     * @param int $code
     * @param string $error
     * @param array $detail
     */
    public static function errorResult(int $code, string $error, array $detail = [])
    {
        header(MIME_JSON);
        $result = [
            'error' => $error,
        ];
        if (!empty($detail)) {
            $result['detail'] = $detail;
        }
        http_response_code($code);
        echo json_encode($result) . PHP_EOL;
        exit($code);
    }

    /**
     * @param string $path
     * @param bool $throw
     * @return string
     * @throws NotFoundFile
     */
    public static function isExists(string $path, bool $throw = true): string
    {
        $realpath = realpath($path);
        $realpath = $realpath ?: '';
        if ($realpath === '' && $throw) {
            throw new NotFoundFile($path);
        }
        return $realpath;
    }
}
