<?php
require __DIR__ . '/../isInclude.php';
$lang = 'en';
if (!empty($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    $languages = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
    $lang = $languages[0];
}
?>
<!doctype html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= TITLE ?></title>
    <link href="assets/js/app.js?v=<?= OPP_VERSION ?>" rel="preload" as="script">
    <link href="assets/js/chunk-vendors.js?v=<?= OPP_VERSION ?>" rel="preload" as="script">
    <link href="assets/css/chunk-vendors.css?v=<?= OPP_VERSION ?>" rel="stylesheet">
</head>
<body>
<noscript>
    <strong>We're sorry but Opcache Panel doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>
<div id="app"></div>
<script src="assets/js/chunk-vendors.js?v=<?= OPP_VERSION ?>"></script>
<script src="assets/js/app.js?v=<?= OPP_VERSION ?>"></script>
</body>
</html>
