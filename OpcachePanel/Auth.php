<?php
declare(strict_types=1);

namespace OpcachePanel;

class Auth
{
    private $sessionName = 'OPP_SESSION';

    public function __construct()
    {
        if (isset($_COOKIE[$this->sessionName])) {
            session_start([
                'name' => $this->sessionName
            ]);
        }
    }

    public function checkPassword()
    {
        if (!isset($_POST['password']) || $this->_isAuth()) {
            return;
        }
        $password = $_POST['password'];
        if ($password === AUTH_PASSWORD) {
            $cookie_lifetime = 0;
            if (isset($_POST['remember']) && $_POST['remember'] === 'yes') {
                $cookie_lifetime = 60*60*24*30;
            }
            session_set_cookie_params($cookie_lifetime);
            session_start([
                'name' => $this->sessionName
            ]);
            $_SESSION['isAuth'] = true;
        } else {
            define('OPP_NOT_CHECK', true);
        }
    }

    /**
     * @return bool
     */
    private function _isAuth(): bool
    {
        return session_status() === PHP_SESSION_ACTIVE && isset($_SESSION['isAuth']) && $_SESSION['isAuth'] === true;
    }

    public function isAuth()
    {
        if ($this->_isAuth()) {
            return;
        }
        if (empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
            require __DIR__ . '/html/auth.php';
        } else {
            resultError(401, 'Unauthorized');
        }
        exit(401);
    }

    /**
     * @return bool
     */
    public function isNeedAuth(): bool
    {
        return defined('AUTH_PASSWORD') && !empty(AUTH_PASSWORD);
    }

    public function logout()
    {
        if (isset($_POST['logout']) && $_POST['logout'] === 'yes' && session_status() === PHP_SESSION_ACTIVE) {
            $_SESSION = [];
            if (ini_get('session.use_cookies')) {
                setcookie(session_name(), '', time() - 42000);
            }
            session_destroy();
        }
    }
}
