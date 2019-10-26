<?php
declare(strict_types=1);

namespace OpcachePanel;

use Exception;

require __DIR__ . '/vendor/autoload.php';

header(NO_CACHE_HEADER);
if (!defined('OPP_DEBUG') || OPP_DEBUG !== true) {
    $auth = new Auth();
    $auth->logout();
    if ($auth->isNeedAuth()) {
        $auth->checkPassword();
        $auth->isAuth();
    }
}

if (!extension_loaded('Zend OPcache')) {
    echo 'Zend OPcache extension is not loaded.';
    exit;
}

if (@opcache_get_configuration() === false) {
    echo '<p>opcache_get_configuration () function error, check <a href="https://www.php.net/manual/opcache.configuration.php#ini.opcache.restrict-api">opcache.restrict_api</a> configuration items.</p>';
    exit;
}

$opcache = new Opcache();

$method = strtoupper($_SERVER['REQUEST_METHOD']);
if ($method === 'GET' || $method === 'HEAD') {
    require APP_DIR . '/html/main.php';
} elseif ($method === 'POST') {
    if (!empty($_POST)) {
        require APP_DIR . '/html/main.php';
        exit();
    }
    try {
        $json = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
    } catch (\JsonException $e) {
        resultError(400, 'POST body not is JSON');
    }
    $action = $json['action'] ?? 'action';
    if (empty($action)) {
        resultError(400, '"action" key can not empty');
    }
    if (!method_exists($opcache, $action)) {
        resultError(400, '"action" value error');
    }
    $needParam = [
        'compileFile' => 'string|array',
        'invalidate' => 'string|array',
        'invalidateDir' => 'string|array',
        'isScriptCached' => 'string'
    ];
    $result = false;
    if (array_key_exists($action, $needParam)) {
        $param = $json['param'] ?? '';
        if (empty($param)) {
            resultError(400, '"param" key can not empty');
        }
        $paramTypes = explode('|', $needParam[$action]);
        $isType = false;
        foreach ($paramTypes as $value) {
            if (call_user_func("is_$value", $param)) {
                $isType = true;
                break;
            }
        }
        if (!$isType) {
            resultError(400, '"param" value type error, only accept these types: ' . implode(', ', $paramTypes));
        }
        if (!is_array($param)) {
            $param = [$param];
        }
        foreach ($param as $value) {
            if (empty($value)) {
                continue;
            }
            try {
                $result = $opcache->$action($value);
                if (!$result) {
                    break;
                }
            } catch (Exception $e) {
                resultError(500, $e->getMessage());
            }

        }
    } else {
        $result = $opcache->$action();
    }
    header(MIME_JSON);
    $_result = $result;
    if (is_bool($result)) {
        $_result = ['success' => $result];
    } elseif (!is_array($result)) {
        $_result = ['data' => $result];
    }
    echo json_encode($_result);
} else {
    http_response_code(405);
}
