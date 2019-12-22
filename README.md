# Opcache panel

<a href="https://github.com/Hill-98/opcache-panel/blob/master/LICENSE"><img alt="MIT" src="https://img.shields.io/github/license/Hill-98/opcache-panel"></a>
<a href="https://packagist.org/packages/hill-98/opcache-panel"><img alt="PHP Version" src="https://img.shields.io/packagist/php-v/hill-98/opcache-panel"></a>
<a href="https://github.com/Hill-98/opcache-panel/releases"><img alt="Github Releases" src="https://img.shields.io/github/v/release/Hill-98/opcache-panel"></a>
<a href="https://github.com/Hill-98/opcache-panel/releases"><img alt="Github Releases Download" src="https://img.shields.io/github/downloads/Hill-98/opcache-panel/total"></a>

PHP opcache panel, can help you better manage opcache, for example, delete the cache and other operations.

[中文](https://github.com/Hill-98/opcache-panel/blob/master/README_cn.md)

## Feature

- Beautiful and easy to use responsive UI
- Support for simple password authentication
- Support for all `opcache_*` functions
- i18n

## Install

Request: PHP 7.0 +, Zend Opcache Extension

Go to the [release](https://github.com/Hill-98/opcache-panel/releases) page and download the latest version

## Configuration
Before you begin configuring, must take `config.example.php` rename `config.php`

**AUTH_PASSWORD**

Authentication password, if set to empty, disable authentication.

## Opcache Preload
**PHP 7.4 + Only**

* Edit PHP.ini, change the `opcache.preload` value to `preload.php` path.
* Create preload.json in the format as shown below
```json
{
  "preCompile": [
    // If is directory, compile all the PHP files in the catalog.
  ],
  "preInclude": [

  ]
}
```
* Restart PHP and check that Opcache preload is working properly

## Screenshots

![Preview 1](https://cdn.mivm.cn/image/opcache-panel/preview1.jpg)

![Preview 2](https://cdn.mivm.cn/image/opcache-panel/preview2.jpg)

![Preview 3](https://cdn.mivm.cn/image/opcache-panel/preview3.jpg)

## Browser support

Any browser that supports [Vue](https://github.com/vuejs/vue) and [buefy](https://github.com/buefy/buefy)

Not guaranteed to support IE10 or lower version

## Donate

If this project help you, you can consider supporting me in the following manner.

![AliPay](https://cdn.mivm.cn/image/qrcode/AliPay.png)

![WeChat](https://cdn.mivm.cn/image/qrcode/WeChatPay.png)

Paypal: [https://paypal.me/mivm](https://paypal.me/mivm)
