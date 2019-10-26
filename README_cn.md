# Opcache panel

<a href="https://github.com/Hill-98/opcache-panel/blob/master/LICENSE"><img alt="MIT" src="https://img.shields.io/github/license/Hill-98/opcache-panel"></a>
<a href="https://packagist.org/packages/hill-98/opcache-panel"><img alt="PHP Version" src="https://img.shields.io/packagist/php-v/Hill-98/opcache-panel"></a>
<a href="https://github.com/Hill-98/opcache-panel/releases"><img alt="Github Releases" src="https://img.shields.io/github/v/release/Hill-98/opcache-panel"></a>
<a href="https://github.com/Hill-98/opcache-panel/releases"><img alt="Github Releases Download" src="https://img.shields.io/github/downloads/Hill-98/opcache-panel/total"></a>

PHP Opcache 面板，可以帮助你 更好的管理 Opcache，例如删除缓存和其他操作，

[English](https://github.com/Hill-98/opcache-panel/blob/master/README.md)

## 特征

- 漂亮和易用的响应式 UI
- 支持简单的密码身份验证
- 支持所有 `opcache_*` 函数
- 国际化

## 已知问题

由于 [jgthms/bulma#2644](https://github.com/jgthms/bulma/issues/2644) 导致语言切换的下拉菜单无法在 IE 支持工作

## 安装

要求: PHP 7.0 +, Zend Opcache 扩展

前往 [release](https://github.com/Hill-98/opcache-panel/releases) 页面并下载最新版本

## 配置
在开始配置之前，务必要把 `config.example.php` 重命名为 `config.php`

**AUTH_PASSWORD**

身份验证的密码，如果设置为空，则禁用身份验证。

## 浏览器支持

任何支持 [Vue](https://github.com/vuejs/vue) 和 [buefy](https://github.com/buefy/buefy) 的浏览器

不保证支持 IE 10 或更低版本

## Donate

如果这个项目对您有帮助，您可以考虑通过以下方式支持我。

Paypal: [https://paypal.me/mivm](https://paypal.me/mivm)

