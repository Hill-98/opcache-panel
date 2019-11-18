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
    <link rel="icon" href="assets/favicon.png">
    <link href="assets/css/app.css?v=<?= OPP_VERSION ?>" rel="preload" as="style">
    <link href="assets/js/app.js?v=<?= OPP_VERSION ?>" rel="modulepreload" as="script">
    <link href="assets/css/app.css?v=<?= OPP_VERSION ?>" rel="stylesheet">
</head>
<body>
<noscript>
    <strong>
        We're sorry but Opcache Panel doesn't work properly without JavaScript enabled. Please enable it to continue.
    </strong>
</noscript>
<div id="app"></div>
<script type="module" src="assets/js/app.js?v=<?= OPP_VERSION ?>"></script>
<script>
    !function () {
        var e = document, t = e.createElement("script");
        if (!("noModule" in t) && "onbeforeload" in t) {
            var n = !1;
            e.addEventListener("beforeload", function (e) {
                if (e.target === t) n = !0; else if (!e.target.hasAttribute("nomodule") || !n) return;
                e.preventDefault()
            }, !0), t.type = "module", t.src = ".", e.head.appendChild(t), t.remove()
        }
    }();
</script>
<script src="assets/js/app-legacy.js?v=<?= OPP_VERSION ?>" nomodule></script>
</body>
</html>
