<?php
declare(strict_types=1);

use OpcachePanel\Exception\NotFoundFile;

/**
 * @param int $code
 * @param string $error
 * @param array $detail
 */
function resultError(int $code, string $error, array $detail = [])
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
 * @param bool $throws
 * @return string
 * @throws NotFoundFile
 */
function isExists(string $path, bool $throws = true): string
{
    $realpath = realpath($path);
    $realpath = $realpath ?: '';
    if ($realpath === '' && $throws) {
        throw new NotFoundFile($path);
    }
    return $realpath;
}
