# Opcache panel 
<a href="https://github.com/Hill-98/opcache-panel/blob/master/LICENSE"><img alt="MIT" src="https://img.shields.io/github/license/Hill-98/opcache-panel"></a>
<a href="https://packagist.org/packages/hill-98/opcache-panel"><img alt="PHP Version" src="https://img.shields.io/packagist/php-v/hill-98/opcache-panel"></a>
<a href="https://github.com/Hill-98/opcache-panel/releases"><img alt="Github Releases" src="https://img.shields.io/github/v/release/Hill-98/opcache-panel"></a>
<a href="https://github.com/Hill-98/opcache-panel/releases"><img alt="Github Releases Download" src="https://img.shields.io/github/downloads/Hill-98/opcache-panel/total"></a>

[English](https://github.com/Hill-98/opcache-panel/blob/master/README.md) | [中文](https://github.com/Hill-98/opcache-panel/blob/master/README_cn.md)

PHP Opcache 面板，可以帮助你更好的管理 Opcache，例如删除缓存和其他操作，

## 特征

* 漂亮和易用的响应式 UI
* 支持简单的密码身份验证
* 支持所有 `opcache_*` 函数
* 国际化

## 安装

要求: PHP 7.0 +, JSON, Zend Opcache 扩展

前往 [release](https://github.com/Hill-98/opcache-panel/releases) 页面并下载最新版本

## 配置
在开始配置之前，务必要把 `config.example.php` 重命名为 `config.php`

**`AUTH_PASSWORD`**

身份验证的密码，如果设置为空，则禁用身份验证。

## Opcache 预加载
**只支持 PHP 7.4 +**

* 编辑 `php.ini`, 更改 `opcache.preload` 值为 `preload.php` 路径。
* 以如下所示的格式创建 `preload.json`

```json
{
  "preCompile": [

  ],
  "preInclude": [

  ]
}
```
> `preCompile` 如果是目录，编译目录下所有的 PHP 文件。

* 重启 PHP 并检查 Opcache Preload 是否正常工作。

## 截图

![Preview 1](https://cdn.mivm.cn/github/opcache-panel/image/preview1.jpg)

![Preview 2](https://cdn.mivm.cn/github/opcache-panel/image/preview2.jpg)

![Preview 3](https://cdn.mivm.cn/github/opcache-panel/image/preview3.jpg)

## 浏览器支持

**不保证支持 IE 10 或更低版本**

任何支持 [Vue](https://github.com/vuejs/vue) 和 [buefy](https://github.com/buefy/buefy) 的浏览器
