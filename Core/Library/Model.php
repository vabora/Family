<?php
namespace Core\Library;
use Core\Library\{Medoo,Config};
class Model{
    protected $db = null;//数据库实例
    protected $table = null;//数据表
    protected $fields = []; //数据字段
    protected $where = []; //筛选条件
    protected $data = []; //数据信息
    protected $column = "*"; //数据列名
    //构造函数
    protected function __construct(){
        $this->db = new Medoo(Config::get('Database'));
    }
    //获取数据
    protected function request(string $key){
        try{
            if(!isset($_REQUEST[$key])){
                die(json_encode(['state'=>0,'message'=>'系统获取数据失败，请重试！']));
            }
            return json_decode($_REQUEST[$key],true);
        }
        catch(Exception $e){
            die(json_encode(['state'=>0,'message'=>$e->getMessage()]));
        }
        
    }
    //输出数据
    protected function response($data){
        try{
            echo json_encode($data);
        }
        catch(Exception $e){
            var_dump($e);
        }
        
    }
    //数据列表
    protected function _list(){
        return $this->db->select($this->table,'*');
    }
    //查询数据
    protected function _query(){
        return $this->db->select($this->table,$this->column,$this->where);
    }
    //添加数据
    protected function _insert(){
        $data = $this->data;
        if(count($data)<1){return -1;}
        $keys = array_keys($data);
        sort($this->fields);
        sort($keys);
        if($this->fields!=$keys){return -1;}
        $this->db->insert($this->table,$data);
        return $this->db->id();
    }
    //删除数据
    protected function _delete(){
        $result = $this->db->delete($this->table,$this->where);
        return $result->rowCount();
    }
    //更新数据
    protected function _update(){
        $data = $this->data;
        if(count($data)<1){return -1;}
        $result = $this->db->update($this->table,$data,$this->where);
        return $result->rowCount();
    }
    //数据库信息
    protected function _info(){
        return $this->db->info();
    }
}