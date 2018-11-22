<?php
namespace Server;
use Core\Library\Model;
class Safe extends Model{
    //构造函数
    public function __construct(){
        parent::__construct();
        $this->path = DATA_PATH.'Backup';
    }
    //获取备份文件列表
    public function list(){
        $this->response($this->backupFiles());
    }
    //新增备份文件
    public function add(){
        $this->file = date("Ymdhis").'.sql';
        if($this->backup()){
            $this->response(['state'=>1,'message'=>'数据备份成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'数据备份失败！']);
        }
    }
    //还原数据
    public function set(){
        $this->file = $this->request('file');
        if($this->recover()){
            $this->response(['state'=>1,'message'=>'数据还原成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'数据还原失败！']);
        }
    }
    //删除备份数据文件
    public function del(){
        $backFile = $this->path.'/'.$this->request('file');
        chmod($backFile,0777);
        if(unlink($backFile)){
            $this->response(['state'=>1,'message'=>'数据删除成功！']);
        }
        else{
            $this->response(['state'=>0,'message'=>'数据删除失败！']);
        }
    }
}