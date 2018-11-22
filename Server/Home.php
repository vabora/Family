<?php
namespace Server;
use Core\Library\Model;
class Home extends Model{
    //构造函数
    public function __construct(){
        parent::__construct();
        $this->table = 'Member';
    }
    //获取成员列表
    public function list(){
        $this->response($this->records());
    }
}