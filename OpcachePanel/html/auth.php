<?php
require __DIR__ . '/../isInclude.php';
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= TITLE ?> - Auth</title>
    <style>
        #main {
            text-align: center;
        }
        form div {
            margin: 8px;
        }
        button {
            font-size: 1rem;
        }
    </style>
</head>
<body>
<div id="main">
    <h1><?= TITLE ?></h1>
    <form action="./index.php" method="post">
        <div>
            <label for="password">Password</label>
            <input id="password" name="password" type="password">
        </div>
        <div>
            <label for="remember">Remember</label>
            <input id="remember" name="remember" type="checkbox" value="yes">
        </div>
        <button>Login</button>
    </form>
    <?php
    if (defined('OPP_NOT_CHECK') && OPP_NOT_CHECK) {
        echo '<p style="color: red">You do not authenticated</p>';
    }
    ?>
</div>
</body>
</html>
