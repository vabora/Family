<?php
session_start();
//运行调试开关[开发模式开启：On，上线模式关闭：Off]
ini_set('display_errors','On');
//PHP版本筛选
if (version_compare(PHP_VERSION, '7.0.0','<')) {
	header("Content-Type: text/html; charset=UTF-8");
    exit(':( PHP运行环境不能低于7.0.0');
}
use Core\App;
//定义根目录
define('ROOT_PATH',str_replace('Server/','',realpath('./').DIRECTORY_SEPARATOR));
//定义内核目录
define('CORE_PATH',ROOT_PATH.'Core/');
//定义应用目录
define('SERVER_PATH',ROOT_PATH.'Server/');
//定义数据目录
define('DATA_PATH',ROOT_PATH.'Data/');

//加载应用启动文件
require_once(CORE_PATH.'/App.php');
//运行程序
App::Run();