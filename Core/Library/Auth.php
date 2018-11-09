<?php
namespace Core\Library;
use Core\Library\{Medoo,Config};
class Auth{
    protected $db = null; //数据库实例
    protected $table = null;//数据表
    //构造函数
    public function __construct(string $table){
        $this->db = new Medoo(Config::get('Database'));
        $this->table = $table;
    }
    //获取权限列表
    private function getAuth(){
        
    }
}