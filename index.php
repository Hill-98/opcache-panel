<?php
declare(strict_types=1);

namespace OpcachePanel;

use OpcachePanel\Exception\ApiException;

require __DIR__ . '/vendor/autoload.php';

header(NO_CACHE_HEADER);

if (!extension_loaded('Zend OPcache')) {
    echo 'Zend OPcache extension is not loaded.';
    exit;
}
if (@opcache_get_configuration() === false) {
    echo '<p>opcache_get_configuration () function error, check <a href="https://www.php.net/manual/opcache.configuration.php#ini.opcache.restrict-api">opcache.restrict_api</a> configuration items.</p>';
    exit;
}

if (file_exists(CONFIG_FILE)) {
    @opcache_invalidate(CONFIG_FILE);
    require CONFIG_FILE;
}

if (!defined('OPP_DEBUG') || OPP_DEBUG !== true) {
    $auth = new Auth();
    $auth->logout();
    if ($auth->isNeedAuth()) {
        $auth->login();
        $auth->isAuth();
    }
}

$method = strtoupper($_SERVER['REQUEST_METHOD']);
if ($method === 'GET' || $method === 'HEAD') {
    require APP_DIR.'/html/main.php';
} elseif ($method === 'POST') {
    foreach (AUTH_POST_KEY as $value) {
        if (array_key_exists($value, $_POST)) {
            require APP_DIR.'/html/main.php';
            exit();
        }
    }
    $postData = json_decode(file_get_contents('php://input'), true, 512);
    if (json_last_error() !== JSON_ERROR_NONE) {
        Helper::errorResult(400, 'POST body not is JSON');
    }
    try {
        $result = API::Run($postData);
        header(MIME_JSON);
        echo $result;
    } catch (ApiException $e) {
        Helper::errorResult($e->getCode(), $e->getMessage());
    }
} else {
    http_response_code(405);
}
