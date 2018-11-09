<?php
namespace Core;
use Core\Library\Config;
class App
{
    //缓存类地图
    static public $Maps = array();
    //应用运行函数
    static public function Run(){
        //初始化配置信息
        Config::init(ROOT_PATH.'Data/Config');
        if(defined('MODULE')||!defined('ACTION')){
            //var_dump($_REQUEST);
            //获取Module
            $Module = implode('\\',array('\\Server',$_REQUEST['module']));
            //获取操作方法
            $Action = $_REQUEST['action'];
            //创建应用实例
            $App = new $Module();
            //调用应用实例方法
            if(method_exists($App,$Action)){
                $App->$Action();
            }
            else{
                die(':( 系统运行错误！操作方法：[Function '.$Action.'()]未定义。');
            }  
        }
        
    }
    /**
     * Loader 类加载器
     * @param string $class 类路径名称
     * @return bool or include class file
     */
    static public function Loader(string $class){
        if(!array_key_exists($class,self::$Maps)){
            $file = str_replace('\\','/',ROOT_PATH.$class.'.php');
            if(is_file($file)){
                require_once($file);//载入类文件
                self::$Maps[$class] = $file;
            }
            else{
                die(':( 系统运行错误！控制器类：[Class '.$class.'{}]未定义。');
            }
        }
        else{return true;}
    }
}
//调用类注册函数
spl_autoload_extensions('.php');
spl_autoload_register(__NAMESPACE__.'\App::Loader',true,true);