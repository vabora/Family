<?php
session_start();
//PHP版本筛选
if (version_compare(PHP_VERSION, '7.0.0','<')) {
	header("Content-Type: text/html; charset=UTF-8");
    exit(':( PHP运行环境不能低于7.0.0');
}
$uri = $_SERVER['REQUEST_URI'];
if($uri!='/'){header('location:/');}
$_REQUEST['page'] = isset($_SESSION['user'])?'Index':'Login';
require_once('Page/Index.php');