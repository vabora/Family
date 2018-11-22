<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../Css/main.css">
    <!-- <script src="../Js/vue.js"></script>
    <script src="../Js/axios.js"></script>
    <script src="../Js/element-ui.js"></script> -->

    <script src="https://vuejs.org/js/vue.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script> 

    <title>思亲堂——家谱管理系统</title>
</head>
<body>
<?php
$page = $_REQUEST['page'];
require_once($page.'/index.html');
print("\r<script src=\"../Page/{$page}/index.js\"></script>\r");
?>
</body>
</html>
